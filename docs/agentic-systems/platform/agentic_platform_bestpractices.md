---
title: "Enterprise Agentic Platform Best Practices"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
source_type: converted-pdf
covers_version: "N/A"
doc_type: guide
---
**ENTERPRISE AGENTIC PLATFORM — Best Practices, Antipatterns & Implementation Guide**
*Strands Agents · AgentCore · MCP · ADFS/FT Rights · Multitenancy · Langfuse*
| Document Type | Best Practices & Antipatterns Guide |
| --- | --- |
| Companion To | Enterprise Agentic Platform Architecture v1.0 |
| Version | 1.0 — Based on Research to March 2026 |
| Classification | INTERNAL — RESTRICTED |
| Coverage | Strands Agents SDK, AgentCore GA, MCP, ADFS, Multitenancy, Langfuse |
# **Table of Contents**

# **1. Executive Summary & Research Findings**

This document consolidates research-backed best practices and antipatterns for implementing the Enterprise Agentic Platform. It covers five major capability layers: Strands Agents SDK (open-sourced by AWS in May 2025, 14M+ downloads), Amazon Bedrock AgentCore (GA October 2025), MCP tool integration, ADFS/FT Rights authentication propagation, and Langfuse observability. It also introduces the multitenancy model specific to a financial-services use case where multiple business divisions or external clients share platform infrastructure.

Key research findings that affect the architecture design:
- AgentCore reached General Availability in October 2025 with full VPC, PrivateLink, CloudFormation support — moving from the preview architecture assumed in the companion document to production-grade infrastructure.
- AgentCore Identity now natively supports Microsoft Entra ID (ADFS/Azure AD) as an identity provider, enabling direct IDP integration for agent authentication without custom BFF token bridging.
- AgentCore Gateway now includes built-in multitenancy interceptors, fine-grained tool access control, and identity propagation — this significantly changes how FT rights can be enforced.
- Strands Agents SDK ships with native OpenTelemetry (OTEL) support (via pip install strands-agents[otel]) and integrates directly with Langfuse via OTEL export, enabling zero-code-change observability.
- AgentCore Runtime provides microVM-level session isolation (Firecracker), meaning each user session gets dedicated CPU, memory, and filesystem — this is the correct multitenancy model for financial services.
- Strands Agent SOPs (Standard Operating Procedures) provide a natural-language workflow specification format that can encode FT rights requirements directly into agent behaviour contracts.

# **2. Strands Agents SDK — Best Practices & Antipatterns**

## **2.1 Core Design Principles**

:::note

Strands Agents is a model-driven SDK where the LLM does the planning — not the developer. The correct mental model is: define model + tools + prompt, then trust the model to reason about what to call and when. Fighting this model-driven approach by over-constraining the agent loop leads to brittle systems.

:::

### **2.1.1 Agent Initialisation**

:::tip[✅ Best Practice]

Define agents using the three-component pattern: model provider (Bedrock Claude), a focused system prompt, and a bounded set of tools. Prefer small, highly-focused agents over large agents with many tools. An agent with 20+ tools is a smell — use sub-agents instead.

:::

:::danger[❌ Antipattern]

Passing every available tool to a single agent. Strands documentation explicitly notes that models cannot accurately select from very large toolsets (6000+ tools example). Use semantic tool retrieval (the retrieve tool with knowledge base) to dynamically surface relevant tools, or decompose into specialist agents.

:::

```python
# ✅  CORRECT: Focused agent with bounded toolset from strands import Agent from strands.models import BedrockModel customer_agent = Agent( model=BedrockModel(model_id="anthropic.claude-sonnet-4-20250514"), system_prompt=CUSTOMER_AGENT_SOP,   # see Section 2.3 for SOPs tools=[get_customer_profile, get_account_summary, get_recent_transactions], # bounded FT scope: only CUST_VIEW tools ) # ❌  WRONG: Mega-agent with all tools god_agent = Agent( model=..., tools=[*customer_tools, *trading_tools, *reporting_tools, *admin_tools], # model cannot reason correctly over 40+ tools )
```

### **2.1.2 Context Window Management**

:::tip[✅ Best Practice]

Implement a ConversationManager to control history growth. For long-running financial workflows, use a sliding window (keep last N turns) plus a structured summary of earlier context. Store summaries in DynamoDB, not in the LLM context window.

:::

:::danger[❌ Antipattern]

Accumulating the full conversation history indefinitely. In multi-step financial agent workflows (e.g., trade analysis), the context window can overflow after 10-20 turns, causing silent truncation and loss of earlier FT context claims. Strands' ConversationManager's reduce_context hook must be implemented.

:::

```python
# ✅  CORRECT: Custom ConversationManager with FT-aware summarisation from strands.agent.conversation_manager import ConversationManager class BankConversationManager(ConversationManager): def __init__(self, max_turns=15, dynamo_table=None): self.max_turns = max_turns self.dynamo = dynamo_table def apply_management(self, messages): # Keep last max_turns, summarise older turns if len(messages) > self.max_turns: summary = self._summarise(messages[:-self.max_turns]) self.dynamo.put_item(Item={'session_id': ..., 'summary': summary}) return messages[-self.max_turns:] return messages def reduce_context(self, messages): # Called when token limit exceeded — hard-trim to last 8 turns return messages[-8:]
```

### **2.1.3 Error Handling & Resilience**

:::tip[✅ Best Practice]

Wrap all agent invocations in retry logic with exponential backoff. Set explicit max_iterations on the agent loop. Define a graceful fallback that returns a structured error response to the calling API rather than propagating exceptions.

:::

:::danger[❌ Antipattern]

Relying on the agent to self-terminate gracefully. Without max_iterations limits, runaway agents can loop indefinitely on ambiguous tasks — consuming tokens and budget. Strands does not enforce a loop limit by default; the application code must.

:::

```python
# ✅  CORRECT: Bounded agent invocation with budget guard import asyncio from strands import Agent async def invoke_agent_safely(agent: Agent, prompt: str, max_tokens: int = 8000) -> dict: try: response = await asyncio.wait_for( agent.invoke_async(prompt, max_iterations=15), timeout=90.0  # hard wall-clock timeout ) if response.token_count > max_tokens: raise BudgetExceededError(f'Agent used {response.token_count} tokens') return response except asyncio.TimeoutError: return {'error': 'AGENT_TIMEOUT', 'retryable': True} except Exception as e: log_to_langfuse(span_id=..., error=str(e)) return {'error': 'AGENT_FAILURE', 'message': str(e)}
```

## **2.2 Multi-Agent Patterns**

:::note

Strands supports four multi-agent collaboration patterns: Agents-as-Tools (hierarchical), Swarms (peer mesh), Graphs (deterministic topology via GraphBuilder), and Workflows (pipeline/DAG). Choose the pattern based on your dependency structure and risk profile.

:::

### **2.2.1 Pattern Selection Guide**

| Pattern | Description | Best For (Bank Context) | Watch Out For |
| --- | --- | --- | --- |
| Agents-as-Tools | Supervisor calls specialist agents as tools | FT-scoped delegation; supervisor enforces rights before delegating | Latency in deep hierarchies; each hop adds 200-500ms |
| Swarm / Mesh | Agents communicate peer-to-peer via agent_graph | Parallel research, redundancy, consensus for ambiguous decisions | Hard to enforce FT rights across peer calls; audit trail complexity |
| GraphBuilder (DAG) | Typed handoffs, deterministic topology | Regulated workflows (trade approval chains, compliance checks) | Requires upfront workflow design; less flexible than ReAct |
| Workflow Pipeline | Sequential stages: plan → execute → synthesise | ReWOO for complex multi-step financial analysis | No dynamic replanning; brittle if intermediate steps fail |

:::tip[✅ Best Practice]

For the bank's agentic platform, use Agents-as-Tools (supervisor-worker) for most workflows. The supervisor agent enforces FT rights before delegating to specialist agents. Use GraphBuilder for regulated workflows (trade submission, compliance sign-off) where deterministic step ordering is required.

:::

:::danger[❌ Antipattern]

Using Swarm pattern for actions that modify state (write operations). In a Swarm, agents communicate asynchronously and there is no coordinator to prevent duplicate writes or conflicting state mutations. Swarms are appropriate for read-heavy research tasks, not for workflows that submit transactions.

:::

### **2.2.2 Supervisor Agent FT Enforcement Pattern**

```python
# ✅  CORRECT: Supervisor checks FT rights before delegating from strands import Agent, tool @tool def delegate_to_portfolio_agent(task: str, user_ft_rights: list) -> str: """Delegate portfolio analysis to specialist agent. Requires FT:PORTFOLIO_READ in user_ft_rights. """ if "FT:PORTFOLIO_READ" not in user_ft_rights: return "ACCESS_DENIED: FT:PORTFOLIO_READ required for portfolio operations" # Only create sub-agent if FT check passes portfolio_agent = Agent(model=..., tools=portfolio_tools) return portfolio_agent(task) # Supervisor receives enriched context from API gateway supervisor = Agent( model=..., tools=[delegate_to_portfolio_agent, delegate_to_customer_agent], system_prompt=f'User FT rights: {ft_rights_from_jwt}. Check rights before delegation.' )
```

## **2.3 Strands Agent SOPs (Standard Operating Procedures)**

:::note

Strands Agent SOPs, released as open source in late 2025, allow agent workflows to be defined in structured natural-language markdown with RFC 2119 constraints (MUST, SHOULD, MAY). For a regulated bank, SOPs can encode compliance requirements and FT rights checks directly into the agent's instruction set.

:::

:::tip[✅ Best Practice]

Use Agent SOPs as the system_prompt for each specialist agent. Include explicit FT rights requirements in the SOP's preconditions section. This creates a human-readable, auditable specification of what the agent is permitted to do — critical for regulatory review.

:::

:::danger[❌ Antipattern]

Embedding business rules, FT requirements, and compliance constraints in ad-hoc natural language system prompts that are scattered across codebase and not version-controlled. SOPs provide a standardised, parameterisable format that can be reviewed by compliance teams without reading Python code.

:::

```python
# ✅  CORRECT: SOP as system prompt (stored in version-controlled markdown) PORTFOLIO_AGENT_SOP = ''' # Portfolio Analysis Agent SOP ## Preconditions - The calling user MUST have FT:PORTFOLIO_READ in their ft_rights claim - The agent MUST NOT access customer PII unless FT:SENSITIVE_DATA is also present - The agent MUST log all data access actions to the audit span ## Steps 1. MUST validate the portfolio_id belongs to the authenticated customer 2. SHOULD retrieve the current holdings using the get_portfolio tool 3. MAY calculate derived metrics (P&L, risk score) using the analytics tool 4. MUST NOT expose raw account numbers in the final response ## Postconditions - The response MUST include a data_accessed_at timestamp - All tool calls MUST be traceable in Langfuse with ft_context metadata ''' portfolio_agent = Agent(model=..., tools=[...], system_prompt=PORTFOLIO_AGENT_SOP)
```

## **2.4 Strands AgentOps — Observability**

:::note

Strands Agents ships with native OpenTelemetry (OTEL) instrumentation. Installing strands-agents[otel] enables automatic span export without code changes. The bank's self-hosted Langfuse instance accepts OTEL/OTLP spans directly, creating a zero-code observability pipeline from agent execution to Langfuse dashboards.

:::

### **2.4.1 OTEL Integration with Langfuse**

:::tip[✅ Best Practice]

Configure Strands' OTEL exporter to target the self-hosted Langfuse OTLP endpoint within the VPC. This ensures all agent traces, including FT rights context in span metadata, remain within the EU AWS environment. Use the @observe() decorator from the Langfuse SDK to add bank-specific attributes (ft_rights, tenant_id, session_id).

:::

| # requirements.txt strands-agents[otel] langfuse # ── Environment variables (set via AWS Secrets Manager / ECS Task Definition) ── # OTEL_EXPORTER_OTLP_ENDPOINT=http://langfuse-internal.vpc:4318/api/public/otel # OTEL_EXPORTER_OTLP_HEADERS=Authorization=Basic <base64(pk:sk)> # OTEL_SERVICE_NAME=agentic-platform-{env} # OTEL_TRACES_SAMPLER=always_on # ── Agent code — no changes required for basic tracing ── from strands import Agent from langfuse.decorators import observe, langfuse_context @observe(name='supervisor_agent_invoke') async def invoke_supervisor(user_prompt: str, enriched_ctx: dict): # Add bank-specific span attributes langfuse_context.update_current_observation( metadata={ 'ft_rights': enriched_ctx.get('ft_rights', []), 'tenant_id': enriched_ctx.get('tenant_id'), 'session_id': enriched_ctx.get('session_id'), 'user_upn':  enriched_ctx.get('upn'),  # pseudonymised in Langfuse } ) return await supervisor_agent.invoke_async(user_prompt) |
| --- |

:::danger[❌ Antipattern]

Logging raw PII (customer names, account numbers, UPNs) into Langfuse trace metadata. GDPR Art.25 requires privacy by design. Use Langfuse's field masking configuration and pseudonymise UPNs before trace ingestion. Set data retention policies (90 days for full traces, 1 year for aggregates).

:::

### **2.4.2 Key Metrics to Instrument**

| Metric | Strands Instrumentation Point | Bank-Specific Alert |
| --- | --- | --- |
| Metric | Strands Instrumentation Point | Bank-Specific Alert |
| Agent loop iterations | agent.metrics.iteration_count | Alert if > 12 iterations (runaway agent risk) |
| Total token usage per session | agent.metrics.total_tokens | Alert if > 50k tokens (budget governance) |
| Tool call latency (p99) | OTEL span duration on tool calls | Alert if MCP tool > 5s (circuit breaker candidate) |
| FT rights denial rate | Custom span attribute: ft_check_result | Alert if > 0.5% (misconfiguration indicator) |
| Agent timeout rate | Error span type: AGENT_TIMEOUT | Alert if > 0.1% in any 5-minute window |
| Conversation manager reduce_context events | Custom counter in ConversationManager | Alert if > 5% of sessions hit context limit |
| Sub-agent delegation depth | Custom span attribute: delegation_depth | Alert if depth > 3 (latency and cost risk) |

## **2.5 Strands Skills (Pre-built Tools)**

:::note

The strands-agents-tools package provides 20+ pre-built tools including file operations, shell integration, memory (Mem0, Bedrock Knowledge Bases, MongoDB), web infrastructure (Tavily, Exa), HTTP client, and browser automation. For a bank, the dynamic MCP client tool must NEVER be enabled in production — it allows agents to connect to arbitrary external MCP servers at runtime.

:::

:::tip[✅ Best Practice]

Use strands_tools pre-built tools only for non-sensitive capabilities (calculator, current_time, HTTP GET to internal APIs). For all bank data access, implement custom @tool functions that include FT rights validation. Register tools per-agent based on the agent's FT scope.

:::

:::danger[❌ Antipattern]

Enabling the Dynamic MCP Client tool (strands_tools.mcp) in production. The Dynamic MCP Client allows the agent to connect to ANY external MCP server specified in the prompt. In a financial services context, this creates a prompt injection vector where malicious input could direct the agent to exfiltrate data to attacker-controlled MCP servers.

:::

| Tool | Usage Recommendation |
| --- | --- |
| Strands Pre-built Tool | Bank Usage Recommendation |
| calculator | Safe — use for financial calculations |
| current_time | Safe — date/time context for transactions |
| http_request | Use only with allowlist of internal API endpoints |
| file_read / file_write | Prohibited — use S3-backed document MCP instead |
| shell | Prohibited — never enable in production agents |
| browser | Use only via AgentCore Browser Tool (isolated microVM) |
| python_repl | Prohibited — use AgentCore Code Interpreter instead |
| mcp (Dynamic MCP Client) | PROHIBITED — allows arbitrary external server connection |
| memory (Mem0/Knowledge Bases) | Approved — use with tenant-scoped namespaces |
| retrieve | Approved — use with FT-scoped OpenSearch indices |

# **3. Amazon Bedrock AgentCore — Best Practices**

## **3.1 AgentCore Runtime — Session Isolation**

:::note

AgentCore Runtime GA (October 2025) uses Firecracker microVMs to provide complete CPU, memory, and filesystem isolation per session. Each session runs in a dedicated microVM that is completely sanitised after termination. This is the correct isolation model for a multi-tenant financial services platform.

:::

:::tip[✅ Best Practice]

Map one AgentCore Runtime session to one user's conversation context. Use the user's sub claim from the enriched JWT as the actor_id and generate a unique runtimeSessionId per conversation. Store the session_id → user mapping in DynamoDB with TTL, as AgentCore does not enforce session-to-user mappings itself.

:::

:::danger[❌ Antipattern]

Reusing a single AgentCore Runtime session across multiple users to save cold-start latency. Even though session state is accessible within a session, cross-user session reuse can leak conversation state. The microVM isolation only works if session IDs are kept per-user.

:::

```python
# ✅  CORRECT: Per-user session management (BFF layer) import boto3, hashlib, time def get_or_create_session(user_sub: str, conversation_id: str) -> str: '''Map user + conversation to an AgentCore session ID.' # Deterministic session ID from user + conversation (no DB lookup needed) session_id = hashlib.sha256( f"{user_sub}:{conversation_id}".encode() ).hexdigest()[:32] # Record session-user mapping in DynamoDB for audit trail dynamo.put_item( TableName='agent-sessions', Item={ 'session_id': session_id, 'user_sub': user_sub, 'created_at': int(time.time()), 'ttl': int(time.time()) + 1800  # 30 min session TTL }, ConditionExpression='attribute_not_exists(session_id)' ) return session_id
```

## **3.2 AgentCore Gateway — FT Rights with Interceptors**

:::note

AgentCore Gateway (GA October 2025) supports Lambda-based request interceptors that can enforce fine-grained access control, implement multitenancy, and propagate user identity to downstream MCP tools. This is the correct place to enforce FT rights in the AgentCore deployment model.

:::

:::tip[✅ Best Practice]

Implement an AgentCore Gateway interceptor that extracts the enriched context JWT from the request, validates the FT rights claim, and either forwards the tool call (with identity-propagated headers) or returns a 403 with a structured error code. The interceptor runs before the MCP server receives the call.

:::

```python
# ✅  CORRECT: AgentCore Gateway interceptor for FT rights enforcement import json, jwt, boto3 from functools import lru_cache # Tool → required FT rights mapping TOOL_FT_MAP = { 'get_customer_profile':   ['FT:CUST_VIEW'], 'get_portfolio':          ['FT:CUST_VIEW', 'FT:PORTFOLIO_READ'], 'submit_trade_order':     ['FT:CUST_VIEW', 'FT:TRADE_SUBMIT'], 'export_report':          ['FT:REPORT_EXPORT'], } @lru_cache(maxsize=1024) def get_jwks() -> dict: # Cached JWKS from BFF — refreshed by background job return secrets_manager.get_secret_value(SecretId='bff-jwks')['SecretString'] def lambda_handler(event, context): tool_name = event.get('toolName') auth_header = event.get('headers', {}).get('X-Enriched-Context', '') # Validate enriched context token try: claims = jwt.decode(auth_header, get_jwks(), algorithms=['RS256']) ft_rights = claims.get('ft_rights', []) except jwt.ExpiredSignatureError: return {'action': 'DENY', 'statusCode': 401, 'message': 'TOKEN_EXPIRED'} # Check FT rights for the requested tool required = TOOL_FT_MAP.get(tool_name, []) if not all(ft in ft_rights for ft in required): missing = [ft for ft in required if ft not in ft_rights] return { 'action': 'DENY', 'statusCode': 403, 'message': f'MISSING_FT_RIGHTS: {missing}', 'auditContext': {'user': claims['upn'], 'tool': tool_name} } # Enrich forwarded request with user identity return { 'action': 'ALLOW', 'additionalHeaders': { 'X-User-UPN': claims['upn'], 'X-Tenant-ID': claims.get('tenant_id', 'default'), 'X-FT-Rights': ','.join(ft_rights), } }
```

## **3.3 AgentCore Identity — ADFS Integration**

:::tip[✅ Best Practice]

Use AgentCore Identity's native Microsoft Entra ID / ADFS integration to handle agent-level token validation. AgentCore Identity supports bearer token forwarding from OIDC providers, meaning the enriched context JWT issued by the BFF can be validated directly at the AgentCore layer without a separate JWKS fetch per call.

:::

:::danger[❌ Antipattern]

Implementing a custom token validation middleware inside the agent code. Token validation logic inside the agent loop creates a maintenance burden and security risk if the validation library has vulnerabilities. Delegate token validation to the AgentCore Identity layer or the API Gateway authoriser.

:::

## **3.4 AgentCore Memory — Tenant-Scoped Design**

:::tip[✅ Best Practice]

Scope all AgentCore Memory operations using the actor_id (derived from the user's sub claim) and namespace (derived from tenant_id). This prevents cross-tenant memory contamination. For long-term memory, apply FT rights filtering — a user with FT:PORTFOLIO_READ should only retrieve portfolio-related memories.

:::

:::danger[❌ Antipattern]

Storing sensitive financial data (account balances, positions, PII) in AgentCore Memory as raw text. Memory stores should contain only sanitised summaries. Use field-level encryption (KMS) for any memory items that contain regulated data. Implement a memory TTL aligned with data retention policies.

:::

```python
# ✅  CORRECT: FT-scoped, tenant-aware memory storage from bedrock_agentcore import AgentCoreMemory memory_client = AgentCoreMemory() async def store_interaction_summary(user_sub: str, tenant_id: str, ft_rights: list, summary: str): # Namespace isolates memory per tenant namespace = f'tenant:{tenant_id}:user:{user_sub}' # Only store summary, never raw financial data sanitised = sanitise_pii(summary)  # remove names, account numbers await memory_client.store( actor_id=user_sub, namespace=namespace, content=sanitised, metadata={ 'ft_rights_at_store': ft_rights,   # for retrieval filtering 'tenant_id': tenant_id, 'stored_at': datetime.utcnow().isoformat() } )
```

# **4. Multitenancy Design**

:::note

In the bank context, multitenancy has two meanings: (a) multiple business divisions sharing the platform (internal multitenancy — e.g., Retail Banking vs. Wealth Management), and (b) potentially serving external clients via APIs (external multitenancy). The isolation requirements and threat model differ.

:::

## **4.1 Multitenancy Isolation Model**

| Layer | Internal Multitenancy | External Multitenancy |
| --- | --- | --- |
| Layer | Internal Multitenancy | External Multitenancy |
| AgentCore Runtime | Shared runtime; session isolation per microVM | Separate runtime per tenant; no shared infrastructure |
| AgentCore Memory | Namespace-scoped: tenant:{div}:user:{sub} | Separate memory store per external tenant |
| MCP Servers | Shared; FT rights restrict data access | Separate MCP instances or strict tenant_id row filtering |
| Langfuse Traces | Tenant_id tag on all traces; project-level access control | Separate Langfuse projects per external tenant |
| DynamoDB (context) | Partition key includes tenant_id | Separate table or separate AWS account |
| LLM Model Access | Shared Bedrock model endpoint | Shared Bedrock model endpoint (model is stateless) |
| Agent SOPs | Shared SOPs parameterised by tenant policy | Tenant-specific SOPs with tenant-specific rules |
| IAM / Roles | Single IAM role per agent type | Separate IAM role per external tenant (IAM boundary) |

## **4.2 Tenant Context Propagation**

:::tip[✅ Best Practice]

Add a tenant_id claim to the enriched context JWT at the BFF layer. The tenant_id should be derived from the user's AD OU (organizational unit) or a separate tenant registry. Pass tenant_id in all downstream calls as a header (X-Tenant-ID) and include it in all DynamoDB partition keys, memory namespaces, Langfuse trace metadata, and MCP tool invocations.

:::

:::danger[❌ Antipattern]

Inferring tenant from the user's email domain or UPN suffix. Email domains can be shared across tenants or spoofed. Always derive tenant_id from a trusted, verified attribute in the ADFS token (e.g., the AD OU or a custom ADFS claim attribute) and validate it at the BFF layer.

:::

## **4.3 Cross-Tenant Data Leakage Prevention**

:::warning

The most critical multitenancy risk for a bank is cross-tenant data leakage via the LLM context. If a supervisor agent's context window contains data from Tenant A (e.g., a customer name from a previous tool call), and the session is improperly reused for Tenant B, the model may surface Tenant A's data in Tenant B's response. The AgentCore microVM isolation per session is the primary mitigation, but the application tier must also enforce tenant scoping.

:::

:::tip[✅ Best Practice]

Implement a TenantContextMiddleware that: (1) extracts tenant_id from the enriched JWT, (2) injects tenant_id into every tool call parameter at the agent layer, (3) validates that tool results belong to the expected tenant before returning them to the agent, and (4) logs any cross-tenant data access attempt as a CRITICAL security event.

:::

:::danger[❌ Antipattern]

Relying solely on MCP server-side row-level filtering for tenant isolation. If the MCP server has a bug in its filtering logic, the agent may receive cross-tenant data. Defence in depth requires tenant validation at both the agent input (tool parameter injection) and the agent output (result validation) layers.

:::

## **4.4 Tenant-Specific Rate Limiting and Cost Governance**

:::tip[✅ Best Practice]

Implement per-tenant token budgets using a Redis-backed counter. Each tenant should have a configurable daily LLM token budget. When a tenant approaches their budget, degrade gracefully (disable complex multi-step agents, switch to lighter models) rather than hard-blocking, which creates a poor user experience.

:::

```python
# ✅  CORRECT: Per-tenant token budget enforcement import redis class TenantBudgetGuard: def __init__(self, redis_client, budgets: dict): self.redis = redis_client self.budgets = budgets  # {tenant_id: daily_token_limit} async def check_and_deduct(self, tenant_id: str, estimated_tokens: int) -> str: key = f'token_budget:{tenant_id}:{date.today().isoformat()}' current = int(self.redis.get(key) or 0) budget = self.budgets.get(tenant_id, 100000) usage_pct = current / budget if usage_pct > 1.0: return 'BLOCKED' elif usage_pct > 0.85: return 'DEGRADED'  # switch to lighter model self.redis.incrby(key, estimated_tokens) self.redis.expire(key, 86400)  # 24h TTL return 'ALLOWED'
```

# **5. MCP Security — Best Practices & Antipatterns**

## **5.1 MCP Server Design**

:::tip[✅ Best Practice]

Design MCP tools with the principle of least privilege: each tool schema should expose only the minimum parameters needed. Avoid free-text fields in tool parameters that could be exploited for prompt injection (e.g., instead of query: string, use predefined enum values where possible). Validate all input parameters server-side against a whitelist.

:::

:::danger[❌ Antipattern]

Implementing MCP tools that accept and execute raw SQL or shell commands constructed from user input. Even if the agent is trusted, the LLM can be manipulated via prompt injection in tool results to construct malicious queries. Always use parameterised queries and never pass LLM-generated strings directly to SQL or shell commands.

:::

## **5.2 MCP Server Versioning and Compatibility**

:::tip[✅ Best Practice]

Version all MCP server tool schemas using semantic versioning (e.g., customer-mcp/v2.1). Use the AgentCore Gateway's tool selection feature to route specific agent versions to compatible MCP server versions. Maintain backward-compatible schema changes (additive only) and deprecate, not remove, old tool signatures.

:::

:::danger[❌ Antipattern]

Breaking MCP tool schema changes in place (renaming fields, changing types, removing parameters). When an agent is mid-execution and a tool schema changes, the agent's planned tool call will fail, creating difficult-to-debug errors. MCP tools must be treated as public API contracts with proper versioning discipline.

:::

## **5.3 MCP Tool Call Idempotency**

:::tip[✅ Best Practice]

All state-mutating MCP tools (e.g., submit_trade_order, update_customer_record) must be idempotent via a client-provided idempotency key. The agent should include a call_id (derived from the session_id + tool_name + timestamp) in every mutating tool call. The MCP server must return the same result for duplicate calls within a 24-hour window.

:::

:::danger[❌ Antipattern]

Allowing agents to retry failed mutating tool calls without idempotency keys. If a trade submission tool call times out and the agent retries, without idempotency enforcement the trade may be submitted twice. This is a critical financial risk — all write operations must be idempotent.

:::

## **5.4 Tool Result Validation**

:::tip[✅ Best Practice]

Validate MCP tool results before returning them to the agent. Check that the returned data belongs to the requesting tenant (tenant_id match), that numeric fields are within plausible ranges, and that PII fields are appropriately masked. Log any validation failures as security events.

:::

:::danger[❌ Antipattern]

Passing raw database query results directly to the agent context without sanitisation. Database results may contain fields the LLM should not see (internal flags, system fields, cross-tenant data due to missing WHERE clause). Always apply a response schema filter that extracts only the declared output fields.

:::

# **6. ADFS / FT Rights — Known Issues & Solutions**

## **6.1 Known Issue: ADFS 2019 Resource Parameter**

:::warning

ADFS 2019 (sts.danskebank.com) requires the 'resource' parameter in the token request to return AD group claims. If the resource parameter is omitted, a token is issued but group claims are absent. This is a commonly reported issue causing silent authorisation failures where users appear authenticated but have no AD groups.

:::

:::tip[✅ Best Practice]

Always include the resource parameter in all ADFS 2019 token requests. The resource value must exactly match the Service Application name registered in Cloud2 / AD. Validate group claim presence in the BFF token enrichment step and fail fast with a descriptive error if groups are empty.

:::

```python
# ✅  CORRECT: ADFS 2019 token request with resource parameter import httpx async def get_system_token(client_id: str, client_secret: str, resource: str) -> dict: '''Obtain ADFS 2019 system token with AD group claims. resource: Must match the Service Application name in Cloud2. e.g., 'gtat.dhcli' or your service's registered name. ''' async with httpx.AsyncClient() as client: response = await client.post( 'https://sts.danskebank.com/adfs/oauth2/token', data={ 'grant_type': 'client_credentials', 'client_id': client_id, 'client_secret': client_secret, 'resource': resource,  # CRITICAL: omitting causes missing group claims } ) token_data = response.json() # Validate group claims are present import jwt as pyjwt claims = pyjwt.decode(token_data['access_token'], options={'verify_signature': False}) if not claims.get('groups'): raise ValueError('ADFS token missing group claims — verify resource parameter') return token_data
```

## **6.2 Known Issue: FT Rights Staleness (Mid-Session Revocation)**

:::warning

FT rights are resolved at login time and embedded in the session token. If a bank administrator revokes a user's FT rights mid-session (e.g., after detecting suspicious activity), the user retains access until session expiry (up to 1 hour). This is a regulatory risk.

:::

:::tip[✅ Best Practice]

Implement a real-time FT revocation webhook. When the FT Service revokes rights, it publishes to an SNS topic. The BFF subscribes and immediately invalidates the affected session in Redis (delete the session key). The next agent call will fail JWT validation and redirect to re-authentication.

:::

```python
# ✅  CORRECT: FT revocation webhook handler (Lambda, triggered by SNS) import boto3, json redis_client = boto3.client('elasticache')  # Use redis-py in actual implementation def lambda_handler(event, context): for record in event['Records']: message = json.loads(record['Sns']['Message']) user_sub = message['user_sub'] revoked_fts = message['revoked_rights'] # Find all active sessions for this user (pattern scan — careful with Redis) session_keys = redis_client.scan(match=f'session:*:{user_sub}:*', count=100) for session_key in session_keys: session_data = json.loads(redis_client.get(session_key)) current_fts = session_data.get('ft_rights', []) # Remove revoked rights and force refresh updated_fts = [ft for ft in current_fts if ft not in revoked_fts] if len(updated_fts) < len(current_fts): # FT rights changed — force session termination redis_client.delete(session_key) # Force re-authentication on next request log_security_event('FT_REVOCATION', user_sub, revoked_fts)
```

## **6.3 Known Issue: JWKS Cache Poisoning**

:::warning

If an attacker can manipulate the JWKS refresh endpoint (via DNS poisoning or BGP hijacking of the ADFS endpoint), they could inject a fake public key, allowing forged tokens to be validated. This is a low-probability but high-impact attack.

:::

:::tip[✅ Best Practice]

Implement JWKS certificate pinning for the ADFS endpoint. Cache the expected certificate thumbprints in Secrets Manager and validate them on every JWKS refresh. Additionally, use DNSSEC-validated resolution for the ADFS hostname and route JWKS refresh traffic through AWS PrivateLink where possible (ADFS 2019 internal endpoint).

:::

## **6.4 Known Issue: JWT Claim Namespace Collisions**

:::warning

When the BFF adds custom claims (ft_rights, enriched_at, tenant_id) to the JWT, there is a risk of collision with standard OIDC claims if the claim names are not namespaced. Future OIDC specs or ADFS updates could introduce claims with the same names, causing validation errors.

:::

:::tip[✅ Best Practice]

Namespace all custom BFF-injected claims with a bank-specific prefix. Use a URI-style namespace for production: https://bank.eu/claims/ft_rights instead of ft_rights. Validate the namespace in all downstream claim extraction code.

:::

```python
# ✅  CORRECT: Namespaced custom JWT claims CLAIM_NAMESPACE = 'https://bank.eu/claims/' bff_claims = { f'{CLAIM_NAMESPACE}ft_rights':    ft_rights_list, f'{CLAIM_NAMESPACE}tenant_id':    tenant_id, f'{CLAIM_NAMESPACE}enriched_at':  datetime.utcnow().isoformat(), f'{CLAIM_NAMESPACE}enriched_by':  'bff-v2.3.1', f'{CLAIM_NAMESPACE}session_id':   session_id, } # Extraction in downstream services def get_ft_rights(claims: dict) -> list: return claims.get(f'{CLAIM_NAMESPACE}ft_rights', [])
```

# **7. Langfuse Observability — Best Practices**

## **7.1 Strands + Langfuse Native Integration**

:::note

Strands Agents and Langfuse have a first-party integration acknowledged in the Strands open-source announcement (Langfuse is an official contributor to the Strands project). The integration works via OTEL: Strands emits OTEL spans, which are forwarded to Langfuse's OTLP endpoint. No custom instrumentation is required for basic tracing.

:::

:::tip[✅ Best Practice]

Deploy Langfuse with its own dedicated RDS PostgreSQL (Multi-AZ) and S3 bucket within the VPC. Configure a daily S3 export of trace archives to meet MiFID II 7-year retention requirements. Apply S3 Object Lock (Compliance mode) to the archive bucket to prevent deletion even by administrators.

:::

## **7.2 Evaluation Pipeline**

:::tip[✅ Best Practice]

Build an automated evaluation pipeline using Langfuse Datasets + Evaluators. Create a golden dataset for each agent type (customer agent, portfolio agent, compliance agent) that includes examples of: (1) correct FT boundary enforcement, (2) correct data scoping per tenant, (3) correct handling of FT denial. Run evaluations on every deployment and block promotion if accuracy drops below threshold.

:::

:::danger[❌ Antipattern]

Evaluating only LLM output quality (correctness, helpfulness) without evaluating security properties (FT rights enforcement, tenant isolation). An agent that gives correct financial advice but returns data for the wrong tenant is a production incident, not just a quality issue.

:::

## **7.3 PII Protection in Traces**

:::tip[✅ Best Practice]

Configure Langfuse's field masking to redact specific fields before trace storage. Mask account numbers (16-digit sequences), national IDs, email addresses, and phone numbers in all span inputs and outputs. Use the MaskingFunction in Langfuse's configuration to apply regex-based redaction at ingestion time.

:::

| Data Type | Langfuse Masking Approach |
| --- | --- |
| Data Type | Langfuse Masking Approach |
| Account numbers (IBAN/BBAN) | Regex: [A-Z]{2}[0-9]{2}[A-Z0-9]{4,30} → IBAN-REDACTED |
| Customer UPN / email | Pseudonymise: SHA256(upn)[:8] → shown as user_abc12345 |
| Customer full name | Partial: 'John D.' format or full redaction |
| Social Security / National ID | Full redaction |
| Trade amounts > EUR 100k | Redact in trace, preserve in separate audit log |
| Credentials / tokens in headers | Full redaction — never log Authorization headers |

# **8. Architecture Issues Found & Resolutions**

:::note

Based on the companion architecture document v1.0 and current research (March 2026), the following issues have been identified and resolved.

:::

## **Issue #1: BFF as Trust Root without Rotation Automation**

:::warning

The original architecture designated the BFF as the trust root that signs enriched context tokens. However, the BFF signing key rotation was listed as a quarterly manual process. Any compromise of the BFF signing key gives an attacker the ability to issue arbitrary tokens with any FT rights.

:::

Store the BFF RS256 signing key as a KMS Asymmetric Key (RSA_4096) — never as a stored secret. Use KMS Sign API for token signing; the private key never leaves KMS.
Set KMS automatic key rotation every 90 days. After rotation, update the JWKS endpoint with the new public key alongside the old key (for in-flight token validation during rotation window).
Add a CloudWatch alarm that triggers if the KMS key is accessed from outside the BFF service's IAM role or VPC endpoint.

```python
# ✅  CORRECT: KMS-backed JWT signing import boto3, base64 from cryptography.hazmat.primitives import hashes kms = boto3.client('kms', region_name='eu-west-1') KEY_ID = 'arn:aws:kms:eu-west-1:123456789:key/bff-signing-key' def sign_jwt_payload(payload_b64: str, header_b64: str) -> str: signing_input = f'{header_b64}.{payload_b64}'.encode() response = kms.sign( KeyId=KEY_ID, Message=signing_input, MessageType='RAW', SigningAlgorithm='RSASSA_PKCS1_V1_5_SHA_256' ) sig = base64.urlsafe_b64encode(response['Signature']).rstrip(b'=').decode() return f'{header_b64}.{payload_b64}.{sig}'
```

## **Issue #2: Redis Session Cache — Single Point of Failure**

:::warning

ElastiCache Redis was identified as a critical dependency for authentication. If Redis becomes unavailable, all authenticated sessions fail validation and users are logged out. No fallback was defined in the original architecture.

:::

Deploy ElastiCache Redis with Multi-AZ and automatic failover. Configure a 60-second connection timeout and circuit breaker pattern.
Implement a short-lived in-memory fallback: the BFF stores the last validated session in memory (LRU cache, TTL = 60 seconds, max 1000 entries) to serve during Redis reconnection.
Add a Redis health check to the BFF's readiness probe. If Redis is down for > 30 seconds, mark the BFF pod as not-ready, allowing the load balancer to drain it.

## **Issue #3: AgentCore Runtime VPC Connectivity (Preview vs. GA)**

:::warning

The original architecture was designed against AgentCore in preview (July 2025), which only supported Public and not VPC-only network configuration. As of the GA release (October 2025), VPC connectivity and PrivateLink are fully supported and should be used.

:::

Deploy AgentCore Runtime in VPC-only mode. Create a VPC endpoint for the AgentCore service and configure security groups to allow inbound from the API Gateway subnet only.
Use PrivateLink for all AgentCore service calls (Runtime, Memory, Gateway, Identity, Observability). This ensures no agent invocation traffic traverses the internet.
Update CloudFormation/CDK templates to use the AgentCore GA resource types (now available in CloudFormation, which was not available in preview).

## **Issue #4: MCP Server Lambda Cold Start Latency**

:::warning

Lambda-based MCP servers can experience 500ms–3s cold start latency for infrequently invoked tools. In a multi-step agent workflow, a cold start on a critical tool (e.g., get_customer_profile) can push total agent latency to > 15 seconds, exceeding acceptable UX thresholds.

:::

Deploy customer-mcp and portfolio-mcp (the most frequently called tools) on ECS Fargate with a minimum of 1 running task (no cold start). Use Lambda only for low-frequency tools.
For Lambda MCP servers that must remain Lambda, enable Provisioned Concurrency for the Lambda function. Set it to minimum 5 concurrent executions for production.
Implement a tool warmup Lambda that pings all MCP Lambda servers every 10 minutes to prevent cold starts during off-peak hours.

## **Issue #5: Strands Agent Loop — No Governance on Cost**

:::warning

Strands' model-driven agent loop has no built-in token budget governance. An agent handling a complex query can consume 50,000+ tokens in a single session without any limit, leading to unexpected cloud spend in a multi-tenant environment.

:::

Implement the TenantBudgetGuard pattern described in Section 4.4. Apply daily and per-session token budgets per tenant and per agent type.
Use the Strands callback_handler to monitor token usage in real time. If the current session approaches the per-session budget, inject a system message instructing the agent to summarise and conclude.
Create a Langfuse alert on per-tenant token usage. Integrate with a cost anomaly detection Lambda that triggers a PagerDuty alert if any tenant's hourly spend exceeds 3x the rolling 7-day average.

## **Issue #6: Strands Tools Batch Execution Without Tenant Context**

:::warning

The Strands Batch Tool (from strands_tools) allows an agent to call multiple tools in parallel. If tool calls do not carry tenant context, parallel calls from agents serving multiple tenants in the same session could mix responses.

:::

Avoid using the generic strands_tools.batch tool. Instead, implement a bank-specific batch wrapper that injects tenant_id and ft_rights into every parallel tool call before dispatch.
All custom @tool functions must extract tenant_id from the thread-local context (set at agent invocation time) rather than relying on the caller to pass it. This prevents tenant context from being accidentally dropped in batch calls.

# **9. Security Antipatterns — Comprehensive List**

### **Authentication & Token Management Antipatterns**

:::danger[❌ Antipattern]

Storing ADFS ClientSecret in environment variables or ECS task definitions. Rotate via Secrets Manager and inject at runtime via the ECS Secrets integration. Never log or print client secrets.

:::

:::danger[❌ Antipattern]

Trusting JWTs that claim to be from the BFF without validating the kid (Key ID) header against the known BFF JWKS. Validate both signature AND kid to prevent algorithm confusion attacks.

:::

:::danger[❌ Antipattern]

Setting JWT expiry to > 1 hour. Session tokens for financial operations should expire in 1 hour maximum. Long-lived tokens increase the blast radius of a token compromise.

:::

:::danger[❌ Antipattern]

Using symmetric (HS256) signing for the enriched context JWT. Use RS256 (asymmetric). HS256 requires sharing the secret key with all validating services — a credential sprawl risk.

:::

### **Agent & LLM Security Antipatterns**

:::danger[❌ Antipattern]

Forwarding raw user input directly to the LLM without sanitisation. For a financial services agent, always validate that user input does not contain prompt injection attempts (e.g., 'Ignore previous instructions and...') using Bedrock Guardrails.

:::

:::danger[❌ Antipattern]

Allowing agents to call external URLs directly. All HTTP calls from agents must go through an allowlisted HTTP proxy within the VPC. Agents should never be able to exfiltrate data to arbitrary external endpoints.

:::

:::danger[❌ Antipattern]

Logging complete LLM prompts and responses to CloudWatch Logs without PII masking. CloudWatch Logs retention is typically shorter than Langfuse retention, creating inconsistent audit trails. Route all LLM trace data through Langfuse with PII masking.

:::

:::danger[❌ Antipattern]

Using the same Bedrock model endpoint for all agent types without inference parameters differentiation. Set lower temperature (0.0–0.1) for tool selection steps, higher temperature (0.3–0.7) for text generation steps. This reduces hallucination risk in financial data retrieval.

:::

### **MCP & Tool Antipatterns**

:::danger[❌ Antipattern]

Implementing MCP tools that perform joins across tenant data at the database layer. All database queries in MCP tools must include a WHERE tenant_id = ? clause as the first filter predicate, before any other business logic.

:::

:::danger[❌ Antipattern]

Using tool names that reveal internal system architecture (e.g., rds_execute_query, lambda_invoke_data_function). Tool names are visible in LLM prompts and in traces. Use business-domain names (get_customer_portfolio) that do not reveal infrastructure details.

:::

:::danger[❌ Antipattern]

Returning error details from MCP tools that include stack traces, database query strings, or internal IP addresses. All errors must be mapped to standardised error codes (TOOL_UNAVAILABLE, DATA_NOT_FOUND, ACCESS_DENIED) before being returned to the agent.

:::

# **10. Implementation Roadmap**

| Priority | Item | Section Ref | Effort |
| --- | --- | --- | --- |
| Priority | Item | Section Ref | Effort |
| P0 — Critical | Migrate BFF signing to KMS Asymmetric Key | Issue #1 | 2 days |
| P0 — Critical | Deploy AgentCore Runtime in VPC-only mode | Issue #3 | 3 days |
| P0 — Critical | Implement AgentCore Gateway FT interceptor | Sec 3.2 | 3 days |
| P0 — Critical | Disable Dynamic MCP Client tool in all agents | Sec 2.5 | 1 day |
| P0 — Critical | Add ADFS 2019 resource parameter validation | Issue #6.1 | 1 day |
| P1 — High | Implement FT revocation SNS webhook | Issue #6.2 | 4 days |
| P1 — High | Deploy Strands OTEL → Langfuse pipeline | Sec 2.4.1 | 2 days |
| P1 — High | Implement TenantBudgetGuard for LLM spend | Sec 4.4 | 3 days |
| P1 — High | Add Redis multi-AZ with in-memory fallback | Issue #2 | 2 days |
| P1 — High | Migrate high-frequency MCP tools to ECS Fargate | Issue #4 | 5 days |
| P2 — Medium | Write Agent SOPs for all specialist agents | Sec 2.3 | 1 week |
| P2 — Medium | Implement Langfuse evaluation pipeline | Sec 7.2 | 1 week |
| P2 — Medium | Namespace all custom JWT claims | Issue #6.4 | 1 day |
| P2 — Medium | Add per-tenant token budget Langfuse alerts | Issue #5 | 2 days |
| P2 — Medium | Implement AgentCore Memory tenant namespacing | Sec 3.4 | 3 days |
| P3 — Normal | Implement JWKS certificate pinning | Issue #6.3 | 3 days |
| P3 — Normal | Build Langfuse golden dataset evaluations | Sec 7.2 | 2 weeks |
| P3 — Normal | Add MCP tool idempotency keys | Sec 5.3 | 1 week |
| P3 — Normal | Implement GraphBuilder for trade workflows | Sec 2.2.1 | 2 weeks |
| P3 — Normal | Deploy Strands Labs AI Functions for edge cases | Sec 2 notes | TBD |

# **Appendix A: Decision Matrix — Strands vs. AgentCore Native vs. Hybrid**

| Scenario | Recommended Approach | Rationale |
| --- | --- | --- |
| Scenario | Recommended Approach | Rationale |
| Simple single-step agent (data lookup + response) | Strands Agent + AgentCore Runtime | Minimal overhead; Strands handles loop; AgentCore provides session isolation |
| Multi-step financial workflow with compliance gates | Strands GraphBuilder + AgentCore Runtime | Deterministic step ordering required; audit trail via typed handoffs |
| High-volume, low-latency tool calls (< 200ms) | Direct Lambda integration via AgentCore Gateway | Avoid full agent loop overhead for deterministic lookups |
| Long-running analysis (> 30 min) | Strands Agent + AgentCore Runtime async mode | AgentCore supports up to 8-hour execution windows |
| Multi-tenant SaaS platform | Separate AgentCore Runtimes per tenant | Stronger isolation; independent scaling; separate cost attribution |
| Agent with > 20 tools | Strands Agent with semantic tool retrieval + sub-agents | Model-driven tool selection degrades above ~20 tools |
| Regulated trading operations | GraphBuilder workflow + human-in-the-loop step | Deterministic ordering + approval gate before trade execution |
| Observability and debugging | Strands OTEL → Langfuse self-hosted | GDPR-compliant; traces stay in EU VPC; best-in-class LLM-specific UI |

# **Appendix B: Strands Agents Feature Reference (March 2026)**

| Feature | Status / Notes |
| --- | --- |
| Feature | Status / Notes |
| Amazon Bedrock model provider | GA — default model; supports Claude 3.5, Nova, etc. |
| Anthropic API direct | GA — contributed by Anthropic |
| Meta Llama API | GA — contributed by Meta |
| OpenAI / LiteLLM | GA — via LiteLLM wrapper |
| Agents-as-Tools (supervisor) | GA — recommended pattern for bank |
| Swarm / mesh (agent_graph) | GA — use cautiously for write operations |
| GraphBuilder (DAG workflows) | GA — recommended for regulated workflows |
| Native MCP client | GA — use static, pre-configured servers only |
| OpenTelemetry (strands-agents[otel]) | GA — native OTEL export |
| Langfuse integration via OTEL | GA — zero code change required |
| Agent SOPs | GA (open-sourced late 2025) |
| Bidirectional streaming (BidiAgent) | Experimental — not for production bank use |
| AI Functions (runtime code gen) | Experimental (Strands Labs) — not for production |
| Strands Robots (VLA) | Experimental (Strands Labs) — not applicable |
| AgentCore BedrockAgentCoreApp wrapper | GA — use for production deployment |
| ConversationManager custom | GA — implement for all production agents |
