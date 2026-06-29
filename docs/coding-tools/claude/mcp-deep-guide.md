---
title: MCP Deep Guide — Server Development & Integration
---

# MCP Deep Guide — Server Development & Integration

Model Context Protocol (MCP) in depth — protocol architecture, the three primitives, building custom servers, security patterns, enterprise provisioning, and integration with Claude Code.

---

## Protocol Overview

MCP is an open standard (by Anthropic, published November 2024) that defines how AI models communicate with external systems. It uses a client-server model with a well-defined JSON-RPC 2.0 API.

```
Claude / Claude Code (MCP Client)
         │
         │  JSON-RPC 2.0 over stdio or SSE
         │
    MCP Server
         ├── Tools     (actions Claude can invoke)
         ├── Resources (data Claude can read)
         └── Prompts   (reusable prompt templates)
```

### Why MCP vs Custom Tool Use?

| | Custom Tool Use | MCP |
|-|-----------------|-----|
| Integration | Per-application wiring | Reusable across any MCP client |
| Discovery | Static tool list | Dynamic at runtime |
| Ecosystem | You build everything | 10,000+ public servers available |
| Standard | None | Open protocol, multiple implementations |
| Enterprise | Per-org config | Okta provisioning, central management |

---

## The Three Primitives

### 1. Tools — Actions

Things Claude can *do*. Tools are called by Claude and return results.

```json
{
  "name": "create_ticket",
  "description": "Create a new Jira ticket. Use when the user asks to file a bug, track a task, or log an issue.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "title": {"type": "string", "description": "Brief, descriptive title"},
      "description": {"type": "string", "description": "Full issue description"},
      "priority": {"type": "string", "enum": ["low", "medium", "high", "critical"]},
      "project_key": {"type": "string", "description": "Jira project key, e.g. 'ENG'"}
    },
    "required": ["title", "description", "project_key"]
  }
}
```

**Key tool design rules:**
- Description must explain *when* to use it, not just what it does
- Parameters should have clear `description` fields — Claude uses these to fill values
- Return structured JSON so Claude can reason over the result
- Mark tools as idempotent if they are (allows safe retry)

### 2. Resources — Data

Data sources Claude can *read*. Resources are URI-addressable and returned as content.

```json
{
  "uri": "postgres://analytics/users",
  "name": "User Analytics",
  "description": "Live user count and retention metrics from the analytics database",
  "mimeType": "application/json"
}
```

Resource types:
- `text/plain` — plain text content
- `application/json` — structured data
- `text/html` — HTML documents
- `image/*` — images (returned as base64)

### 3. Prompts — Templates

Reusable prompt templates with arguments. Exposed to users via `/mcp__<server>__<name>`:

```json
{
  "name": "code_review",
  "description": "Run a structured code review",
  "arguments": [
    {
      "name": "language",
      "description": "Programming language",
      "required": true
    },
    {
      "name": "focus",
      "description": "Review focus: security, performance, or style",
      "required": false
    }
  ]
}
```

Invoked in Claude Code as: `/mcp__github__code_review`

---

## Building a Custom MCP Server

### Python (FastMCP)

```bash
pip install fastmcp
```

```python
from fastmcp import FastMCP

mcp = FastMCP("my-company-tools")

@mcp.tool()
async def get_employee_info(employee_id: str) -> dict:
    """
    Retrieve employee information from HR system.
    Use when asked about team members, reporting structure, or org chart.
    """
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://hr.company.internal/api/employees/{employee_id}",
            headers={"Authorization": f"Bearer {HR_API_TOKEN}"}
        )
        return response.json()

@mcp.resource("hr://org-chart")
async def org_chart() -> str:
    """Current organisational chart as JSON"""
    data = await fetch_org_chart()
    return json.dumps(data)

@mcp.prompt()
async def onboarding_checklist(role: str, start_date: str) -> str:
    """Generate an onboarding checklist for a new employee"""
    return f"""
    Create a detailed 30-60-90 day onboarding plan for a new {role} starting on {start_date}.
    Include: tools access, key meetings, learning resources, and 90-day success criteria.
    """

if __name__ == "__main__":
    mcp.run()
```

### TypeScript (Official SDK)

```bash
npm install @modelcontextprotocol/sdk
```

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
  { name: "my-company-tools", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "query_database",
      description: "Run a read-only SQL query against the analytics database",
      inputSchema: {
        type: "object",
        properties: {
          sql: { type: "string", description: "SQL SELECT query" }
        },
        required: ["sql"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "query_database") {
    const { sql } = request.params.arguments as { sql: string };
    const rows = await db.query(sql);
    return { content: [{ type: "text", text: JSON.stringify(rows) }] };
  }
  throw new Error(`Unknown tool: ${request.params.name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

---

## Transport Options

### stdio (Default — Local)

Best for Claude Code integrations where the server runs as a local process:

```json
{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["-m", "my_mcp_server"],
      "env": {"DATABASE_URL": "${DATABASE_URL}"}
    }
  }
}
```

### SSE (Server-Sent Events — Remote)

For remote servers accessible over HTTP:

```json
{
  "mcpServers": {
    "remote-server": {
      "url": "https://mcp.company.internal/sse",
      "headers": {
        "Authorization": "Bearer ${MCP_TOKEN}"
      }
    }
  }
}
```

---

## Security Patterns

### Authentication

```python
from fastmcp import FastMCP, Context

mcp = FastMCP("secure-tools")

@mcp.tool()
async def sensitive_operation(data: str, ctx: Context) -> dict:
    # Validate caller identity from context
    caller = ctx.client_info
    if not await is_authorized(caller.user_id, "sensitive_operation"):
        raise PermissionError(f"User {caller.user_id} not authorized for sensitive_operation")

    return await perform_operation(data)
```

### Capability Scoping

Only expose what each context needs:

```python
def create_server(user_role: str) -> FastMCP:
    mcp = FastMCP("company-tools")

    # Everyone gets read access
    mcp.add_tool(get_employee_info)
    mcp.add_tool(search_knowledge_base)

    # Engineers get code tools
    if user_role in ("engineer", "senior_engineer", "staff_engineer"):
        mcp.add_tool(query_database)
        mcp.add_tool(run_sql_query)

    # Admins only
    if user_role == "admin":
        mcp.add_tool(create_user)
        mcp.add_tool(modify_permissions)

    return mcp
```

### Input Validation and Sandboxing

```python
@mcp.tool()
async def run_code(code: str, language: str) -> str:
    """Execute code in a sandboxed environment"""
    # Validate language is allowed
    ALLOWED_LANGUAGES = {"python", "javascript", "bash"}
    if language not in ALLOWED_LANGUAGES:
        raise ValueError(f"Language {language!r} not allowed. Use: {ALLOWED_LANGUAGES}")

    # Validate code length
    if len(code) > 10_000:
        raise ValueError("Code exceeds 10,000 character limit")

    # Execute in Docker sandbox
    result = await docker_sandbox.run(
        image=f"sandbox-{language}:latest",
        code=code,
        timeout_seconds=30,
        memory_mb=256,
        network_enabled=False  # No network access in sandbox
    )
    return result.stdout
```

### Rate Limiting per Tool

```python
from fastmcp.middleware import RateLimiter

mcp = FastMCP("rate-limited-tools")
mcp.add_middleware(RateLimiter(
    limits={
        "search": "100/minute",
        "write_database": "10/minute",
        "run_code": "20/hour"
    }
))
```

---

## Tool Design Patterns

### Idempotency

Mark safe-to-retry tools clearly:

```python
@mcp.tool(idempotent=True)  # Safe to retry on failure
async def get_user_profile(user_id: str) -> dict:
    return await db.fetch_user(user_id)

@mcp.tool(idempotent=False)  # NOT safe to retry — may charge user
async def process_payment(amount_cents: int, card_token: str) -> dict:
    return await payment_gateway.charge(amount_cents, card_token)
```

### Structured Error Returns

Return errors as structured data so Claude can reason about them:

```python
@mcp.tool()
async def create_order(items: list[dict]) -> dict:
    try:
        order = await order_service.create(items)
        return {"success": True, "order_id": order.id, "total": order.total}
    except InsufficientInventoryError as e:
        return {
            "success": False,
            "error_type": "insufficient_inventory",
            "message": str(e),
            "out_of_stock_items": e.items
        }
    except PaymentDeclinedError as e:
        return {
            "success": False,
            "error_type": "payment_declined",
            "message": "Payment was declined",
            "retry_allowed": False
        }
```

### Tool Result Caching

```python
import functools
from datetime import timedelta

@mcp.tool()
@cache(ttl=timedelta(minutes=5))  # Cache for 5 minutes
async def get_current_exchange_rates(base_currency: str) -> dict:
    return await forex_api.get_rates(base_currency)
```

---

## Popular MCP Servers

### Development

| Server | Install | Provides |
|--------|---------|---------|
| `@modelcontextprotocol/server-github` | `npx` | GitHub repos, PRs, issues |
| `@modelcontextprotocol/server-filesystem` | `npx` | Local file system access |
| `@modelcontextprotocol/server-git` | `npx` | Git operations |
| `mcp-server-docker` | `pip` | Docker container management |

### Data & Databases

| Server | Install | Provides |
|--------|---------|---------|
| `@modelcontextprotocol/server-postgres` | `npx` | PostgreSQL queries |
| `@modelcontextprotocol/server-sqlite` | `npx` | SQLite |
| `mcp-server-bigquery` | `pip` | BigQuery |
| `mcp-server-snowflake` | `pip` | Snowflake |

### Productivity

| Server | Install | Provides |
|--------|---------|---------|
| `@modelcontextprotocol/server-slack` | `npx` | Slack messages, channels |
| `mcp-server-jira` | `pip` | Jira tickets |
| `mcp-server-notion` | `npx` | Notion databases |
| `mcp-server-google-drive` | `npx` | Google Drive files |

---

## Testing MCP Servers

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector python -m my_mcp_server
```

Opens a browser-based UI to:
- List all tools, resources, and prompts
- Call tools manually with test inputs
- Inspect responses

### Unit Tests

```python
import pytest
from fastmcp.testing import MCPTestClient

@pytest.fixture
def client():
    return MCPTestClient(mcp_server)

async def test_get_employee_info(client):
    result = await client.call_tool("get_employee_info", {"employee_id": "E001"})
    assert result["name"] == "Alice Smith"
    assert result["department"] == "Engineering"

async def test_invalid_employee_raises_error(client):
    result = await client.call_tool("get_employee_info", {"employee_id": "INVALID"})
    assert result["success"] == False
    assert "not found" in result["message"]
```

### Integration Testing with Claude

```python
async def test_tool_used_correctly():
    """Verify Claude selects and uses the tool appropriately"""
    client = anthropic.Anthropic()
    tools = await mcp_server.list_tools()

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=tools,
        messages=[{"role": "user", "content": "What department does employee E001 work in?"}]
    )

    # Verify Claude called the right tool
    tool_call = next(b for b in response.content if b.type == "tool_use")
    assert tool_call.name == "get_employee_info"
    assert tool_call.input["employee_id"] == "E001"
```

---

## Enterprise MCP Administration

### Okta Provisioning (June 2026+)

```yaml
# Okta MCP App Assignment (managed by IT/Security team)
mcp_app_configuration:
  org_id: "company.okta.com"
  groups:
    - name: "engineering"
      servers: ["github", "postgres", "docker"]
      scopes:
        github: ["repo:read", "pr:write", "issue:write"]
        postgres: ["readonly"]

    - name: "sales"
      servers: ["salesforce", "slack"]
      scopes:
        salesforce: ["opportunities:read", "contacts:read"]

    - name: "it-admins"
      servers: ["github", "postgres", "jira", "slack", "okta-mgmt"]
      scopes: "*"  # Full access
```

### Audit Logging

```python
@mcp.middleware
async def audit_middleware(request, next_handler):
    start = time.time()
    result = await next_handler(request)
    duration_ms = (time.time() - start) * 1000

    audit_log.info(
        "mcp_tool_call",
        tool=request.tool_name,
        user_id=request.context.user_id,
        session_id=request.context.session_id,
        duration_ms=round(duration_ms),
        success=result.get("success", True),
        timestamp=datetime.utcnow().isoformat()
    )
    return result
```

---

## Debugging MCP Connections in Claude Code

```bash
# Check which MCP servers are connected
/mcp

# View MCP server logs (in another terminal)
tail -f ~/.claude/logs/mcp-*.log

# Test a specific server
npx @modelcontextprotocol/inspector <server-command>

# Enable verbose MCP logging
CLAUDE_MCP_DEBUG=1 claude
```

Common issues:
- **Server not appearing**: Check `command` path in settings.json is absolute or on PATH
- **Tool calls failing**: Check server logs for exceptions; verify env vars are set
- **Auth errors**: Ensure API tokens in `env` section of settings.json are current
- **Slow responses**: Check if server is making slow network calls; add caching
