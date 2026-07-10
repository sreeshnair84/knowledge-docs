---
title: "Claude Agent SDK — Production Reference"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["coding-tools", "claude"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# Claude Agent SDK — Production Reference

Zero-to-mastery guide for building production multi-agent systems with the Claude Agent SDK. Covers architecture decisions, every major pattern, cost controls, observability, guardrails, and responsible AI considerations.

:::note Naming history
    The Claude Agent SDK was renamed from "Claude Code SDK" in September 2025. All package names and imports in this guide reflect the current name.

---

## 1. Overview

### What the Agent SDK Is

The Claude Agent SDK is a library that runs **in your own process** and provides a structured runtime for multi-turn, tool-using, multi-agent applications built on top of the Claude Messages API. It handles the agentic loop (calling tools, processing results, continuing the conversation), session persistence, subagent spawning, and lifecycle management — without you writing that scaffolding manually.

The SDK is distinct from the raw Messages API (which you manage entirely) and from Managed Agents (a hosted REST API product where Anthropic runs the sandbox). For a model pricing reference, see [Claude Models 2026](claude-models-2026.md). For enterprise cloud deployment across AWS/GCP/Azure, see [Claude Enterprise Deployment 2026](claude-enterprise-2026.md). For MCP server development and the MCP protocol deep-dive, see [MCP Deep Guide](mcp-deep-guide.md).

### Agent SDK vs Managed Agents — Decision Matrix

| Criterion | Agent SDK | Managed Agents |
|-----------|-----------|----------------|
| **Where it runs** | Your infrastructure | Anthropic-hosted sandbox |
| **Integration style** | Python/TypeScript library | REST API calls |
| **Data residency** | Stays in your environment | Processed in Anthropic's sandbox |
| **Customisation** | Full control over tools, prompts, storage | Fixed runtime, tool allowlist |
| **Session storage** | Your Postgres/Redis | Managed automatically |
| **Billing** | Token-based (Messages API pricing) | Agent SDK credits (see §19) |
| **Network isolation** | VPC/private — no outbound required | Public HTTPS to Anthropic endpoints |
| **Best for** | Complex custom workflows, data-sensitive tasks | Rapid prototyping, light integration |

**Choose Agent SDK when:**
- Your data must not leave your infrastructure
- You need custom tools, custom state stores, or custom cost controls
- You are building multi-tenant SaaS with per-customer billing isolation
- You need circuit breakers, custom retry logic, or partial-result recovery

**Choose Managed Agents when:**
- You want zero infrastructure overhead
- You are prototyping or building internal tools with standard capability sets
- You are integrating Claude into a product that already uses Anthropic's REST APIs

### SDK vs Raw Messages API

| Capability | Raw Messages API | Agent SDK |
|------------|-----------------|-----------|
| Tool execution loop | You write it | Built-in |
| Subagent spawning | Manual | `agent.spawn_subagent()` |
| Session persistence | You manage | Automatic |
| Memory | You implement | Managed provider interface |
| Retry / backoff | You implement | Configurable `RetryConfig` |
| Cost / token budgets | You track | Built-in `CostLimit` |
| HITL checkpoints | You implement | Built-in `HumanCheckpoint` |
| MCP client | You wire up | Built-in MCP transport |

---

## 2. Installation & Setup

### Prerequisites

- Python 3.10+ (Agent SDK uses `asyncio`, `typing.TypeAlias`, and `match` statements)
- Node.js 18+ for TypeScript (uses native `fetch`, `ReadableStream`)
- `ANTHROPIC_API_KEY` set in your environment

=== "Python"

    ```bash
    pip install claude-agent-sdk
    ```

    Pin to a specific version in production:

    ```bash
    pip install "claude-agent-sdk==0.8.1"
    ```

=== "TypeScript"

    ```bash
    npm install @anthropic-ai/claude-agent-sdk
    ```

    ```bash
    # or with yarn/pnpm
    yarn add @anthropic-ai/claude-agent-sdk
    pnpm add @anthropic-ai/claude-agent-sdk
    ```

### Environment Configuration

=== "Python"

    ```python
    import os
    from claude_agent_sdk import Agent

    # The SDK reads ANTHROPIC_API_KEY automatically
    # Never hardcode keys — use a secrets manager or environment injection
    assert os.environ.get("ANTHROPIC_API_KEY"), "ANTHROPIC_API_KEY must be set"

    agent = Agent(
        model="claude-sonnet-4-6",
        system="You are a senior data analyst. Be precise and cite sources.",
        max_tokens=8192,
    )
    ```

=== "TypeScript"

    ```typescript
    import { Agent } from "@anthropic-ai/claude-agent-sdk";

    // SDK reads process.env.ANTHROPIC_API_KEY automatically
    const agent = new Agent({
      model: "claude-sonnet-4-6",
      system: "You are a senior data analyst. Be precise and cite sources.",
      maxTokens: 8192,
    });
    ```

:::danger Never hardcode API keys
    Store `ANTHROPIC_API_KEY` in AWS Secrets Manager, HashiCorp Vault, or a `.env` file excluded from version control. Rotate on a 90-day schedule. Audit access logs for unexpected usage.

---

## 3. Core Concepts

### Agent

An `Agent` is a configured instance that wraps a Claude model with a system prompt, a tool set, and runtime policies (retry, cost limits, checkpoints). Agents are long-lived objects — create one per role or responsibility, not one per request.

### Session

A `Session` is a stateful conversation thread. Sessions persist context (message history, tool results, memory) across multiple turns and HTTP requests. Sessions have IDs you control; they can be resumed from any process instance as long as they share the same state store.

### Tool

A `Tool` is a callable function the agent can invoke during its reasoning loop. Tools are the agent's interface to the outside world — databases, APIs, file systems, external services. The SDK handles the serialisation/deserialisation and result injection automatically.

### Subagent

A subagent is a child agent spawned by a parent. Subagents run in isolated context windows and can use their own tool sets and models. Results are aggregated back to the parent. Subagents enable fan-out parallelism and responsibility separation.

### Skill

A skill is a reusable capability described in a `SKILL.md` file placed in `.claude/skills/`. The SDK auto-discovers skill files at startup. The model reads skill descriptions and invokes them by name when appropriate — no manual wiring required.

---

## 4. Quick Start

=== "Python"

    ```python
    import asyncio
    from claude_agent_sdk import Agent, tool

    @tool(description="Look up a product's current price. Use when asked about pricing.")
    async def get_price(product_id: str) -> dict:
        # Replace with your real data source
        prices = {"SKU-001": 29.99, "SKU-002": 49.99, "SKU-003": 9.99}
        price = prices.get(product_id)
        if price is None:
            return {"error": f"Product {product_id} not found"}
        return {"product_id": product_id, "price_usd": price, "currency": "USD"}

    agent = Agent(
        model="claude-sonnet-4-6",
        tools=[get_price],
        system="You are a helpful product pricing assistant.",
        max_tokens=4096,
    )

    async def main():
        result = await agent.run("What is the price of SKU-001 and SKU-003?")
        print(result.text)

    asyncio.run(main())
    ```

=== "TypeScript"

    ```typescript
    import \{ Agent, tool } from "@anthropic-ai/claude-agent-sdk";

    const getPrice = tool(\{
      name: "get_price",
      description: "Look up a product's current price. Use when asked about pricing.",
      parameters: \{
        type: "object",
        properties: \{
          productId: \{ type: "string", description: "The product SKU" },
        },
        required: ["productId"],
      },
      execute: async (\{ productId }: \{ productId: string }) => \{
        const prices: Record<string, number> = \{
          "SKU-001": 29.99,
          "SKU-002": 49.99,
          "SKU-003": 9.99,
        };
        const price = prices[productId];
        if (price === undefined) \{
          return \{ error: `Product $\{productId} not found` };
        }
        return \{ productId, priceUsd: price, currency: "USD" };
      },
    });

    const agent = new Agent(\{
      model: "claude-sonnet-4-6",
      tools: [getPrice],
      system: "You are a helpful product pricing assistant.",
      maxTokens: 4096,
    });

    const result = await agent.run("What is the price of SKU-001 and SKU-003?");
    console.log(result.text);
    ```

---

## 5. Tool Use

### Custom Tool Definition

=== "Python"

    ```python
    from claude_agent_sdk import tool
    from pathlib import Path

    @tool(
        description=(
            "Query the analytics database. Use for revenue, user counts, and "
            "event data. Accepts read-only SQL SELECT queries only."
        )
    )
    async def query_analytics(
        sql: str,
        database: str = "production",
    ) -> list[dict]:
        """
        sql: A SQL SELECT statement. Must not modify data.
        database: Target database — 'production' or 'staging'.
        """
        if not sql.strip().upper().startswith("SELECT"):
            raise ValueError("Only SELECT queries are permitted")
        async with db_pool.acquire() as conn:
            rows = await conn.fetch(sql)
            return [dict(r) for r in rows]
    ```

=== "TypeScript"

    ```typescript
    import \{ tool } from "@anthropic-ai/claude-agent-sdk";

    const queryAnalytics = tool(\{
      name: "query_analytics",
      description:
        "Query the analytics database. Use for revenue, user counts, and event data. "
        + "Accepts read-only SQL SELECT queries only.",
      parameters: \{
        type: "object",
        properties: \{
          sql: \{ type: "string", description: "A SQL SELECT statement" },
          database: \{
            type: "string",
            enum: ["production", "staging"],
            description: "Target database",
            default: "production",
          },
        },
        required: ["sql"],
      },
      execute: async (\{ sql, database = "production" }) => \{
        if (!sql.trim().toUpperCase().startsWith("SELECT")) \{
          throw new Error("Only SELECT queries are permitted");
        }
        return await db.query(sql, database);
      },
    });
    ```

### Tool Security Boundaries

Always sandbox tool access. Path traversal, SQL injection, and command injection are the most common attack vectors against agentic systems.

```python
from pathlib import Path

@tool(description="Read file contents from the project sandbox directory")
async def read_file(path: str) -> str:
    base = Path("/var/projects/sandbox").resolve()
    target = (base / path).resolve()
    if not str(target).startswith(str(base)):
        raise ValueError(f"Path traversal attempt blocked: \{path!r}")
    if not target.is_file():
        raise FileNotFoundError(f"File not found: \{path!r}")
    return target.read_text(encoding="utf-8")


@tool(description="Execute a shell command in the project sandbox")
async def run_command(command: str) -> dict:
    BLOCKED_PATTERNS = ["rm -rf", "sudo", "curl", "wget", "> /dev/sd", "mkfs"]
    for pattern in BLOCKED_PATTERNS:
        if pattern in command:
            raise ValueError(f"Blocked command pattern: \{pattern!r}")
    proc = await asyncio.create_subprocess_shell(
        command,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        cwd="/var/projects/sandbox",
        env=\{"PATH": "/usr/bin:/bin"},  # Minimal environment
    )
    stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=30.0)
    return \{
        "exit_code": proc.returncode,
        "stdout": stdout.decode()[:10_000],  # Truncate to 10K chars
        "stderr": stderr.decode()[:2_000],
    }
```

### Built-In Tools

The Agent SDK ships with eight built-in tools you can enable by name:

| Built-in Tool | Description | Governance Note |
|---------------|-------------|-----------------|
| `file_editor` | Read, write, edit files | Require HITL for writes outside sandbox |
| `bash` | Execute shell commands | Block network access; apply allow-list |
| `web_search` | Search the web | Log queries; apply content filtering |
| `web_fetch` | Fetch a URL | Block internal IP ranges; rate-limit |
| `human_checkpoint` | Pause for human approval | Use for all irreversible actions |
| `spawn_subagent` | Create a child agent | Set concurrency limits |
| `session_manager` | Load/save session state | Requires configured state store |
| `mcp_client` | Connect to MCP servers | Apply per-server allow-lists |

```python
from claude_agent_sdk import Agent, BuiltinTools

agent = Agent(
    model="claude-sonnet-4-6",
    builtin_tools=[
        BuiltinTools.WEB_SEARCH,
        BuiltinTools.WEB_FETCH,
        BuiltinTools.FILE_EDITOR,
    ],
    system="You are a research assistant. Search the web and synthesize findings.",
)
```

### Human-in-the-Loop Checkpoints

HITL checkpoints are built into the SDK and pause agent execution pending human approval. Use them for any action that is irreversible, high-cost, or externally visible.

```python
from claude_agent_sdk import Agent, HumanCheckpoint, CheckpointResult

agent = Agent(
    model="claude-sonnet-4-6",
    tools=[deploy_tool, send_email_tool, delete_records_tool],
    checkpoints=[
        HumanCheckpoint(
            trigger="before_tool_call",
            tool_names=["deploy_tool", "delete_records_tool"],
            prompt_template=(
                "Agent wants to call `\{tool_name}` with arguments:\n"
                "```json\n{arguments}\n```\n"
                "Approve? (yes/no/modify)"
            ),
            timeout_seconds=300,   # 5-minute approval window
            on_timeout="reject",   # Reject if no response
        ),
        HumanCheckpoint(
            trigger="before_tool_call",
            tool_names=["send_email_tool"],
            prompt_template="Agent wants to send an email to \{to}. Preview:\n\{body}\nApprove?",
            timeout_seconds=120,
        ),
    ],
)

async def run_with_approval(prompt: str, approver_channel):
    async def approval_handler(checkpoint_event):
        # Send the approval request to a Slack channel, UI, or webhook
        await approver_channel.send(checkpoint_event.prompt)
        response = await approver_channel.wait_for_response(
            timeout=checkpoint_event.timeout_seconds
        )
        if response.text.lower() == "yes":
            return CheckpointResult.APPROVE
        elif response.text.lower().startswith("modify"):
            return CheckpointResult.modify(response.modified_args)
        return CheckpointResult.REJECT

    result = await agent.run(prompt, checkpoint_handler=approval_handler)
    return result
```

:::warning HITL is not optional for production
    Any agent action that modifies external state — sending emails, writing to databases, calling payment APIs, deploying code — must have a HITL checkpoint or be designed to be fully reversible. Document which actions are covered and which are not in your system design.

---

## 6. Multi-Agent Patterns

### Fan-Out Parallelism (Map-Reduce)

Distribute independent work across concurrent subagents, then aggregate results.

```python
import asyncio
from claude_agent_sdk import Agent

# Specialised analyst agent (uses cheaper model for sub-tasks)
analyst = Agent(
    model="claude-haiku-4-5",  # Cost-efficient for parallel sub-tasks
    tools=[query_analytics, format_report],
    system="You are a regional sales analyst. Analyse the data provided and return structured JSON.",
    max_tokens=2048,
)

# Orchestrating agent
orchestrator = Agent(
    model="claude-sonnet-4-6",
    system="You synthesise regional reports into executive summaries.",
    max_tokens=8192,
)

async def analyse_all_regions(regions: list[str], quarter: str) -> str:
    # MAP: spawn one subagent per region in parallel
    tasks = [
        analyst.run(
            f"Analyse sales performance for region '\{region}' in \{quarter}. "
            "Return JSON with: total_revenue, growth_pct, top_3_products, anomalies."
        )
        for region in regions
    ]

    # Collect with bounded concurrency to avoid rate limits
    semaphore = asyncio.Semaphore(5)  # Max 5 concurrent API calls

    async def bounded_run(task):
        async with semaphore:
            return await task

    regional_results = await asyncio.gather(*[bounded_run(t) for t in tasks])

    # REDUCE: orchestrator synthesises
    summary_prompt = (
        f"Synthesise these \{len(regions)} regional reports for \{quarter} into a "
        "CEO-level executive summary with key insights and recommended actions:\n\n"
        + "\n\n---\n\n".join(
            f"**\{region}**:\n\{result.text}"
            for region, result in zip(regions, regional_results)
        )
    )
    summary = await orchestrator.run(summary_prompt)
    return summary.text


# Usage
regions = ["APAC", "EMEA", "AMER-North", "AMER-South", "MEA"]
report = asyncio.run(analyse_all_regions(regions, "Q2-2026"))
```

### DAG Orchestration

When tasks have dependencies, model them as a directed acyclic graph (DAG). Each stage consumes outputs from prior stages.

```python
import asyncio
from claude_agent_sdk import Agent
from dataclasses import dataclass

@dataclass
class PipelineResult:
    research: str
    critique: str
    recommendations: str
    final_report: str

# Each agent is specialised for its stage
research_agent = Agent(
    model="claude-sonnet-4-6",
    tools=[web_search, web_fetch, read_file],
    system="You are a researcher. Find facts, cite sources, and summarise findings.",
)
critique_agent = Agent(
    model="claude-sonnet-4-6",
    system="You are a critical reviewer. Identify gaps, biases, and unsupported claims.",
)
strategy_agent = Agent(
    model="claude-sonnet-4-6",
    system="You are a strategy consultant. Turn research and critique into actionable recommendations.",
)
writer_agent = Agent(
    model="claude-fable",  # Creative, polished prose
    system="You are a technical writer. Produce clear, compelling executive reports.",
)

async def research_pipeline(topic: str) -> PipelineResult:
    # Stage 1 — Research (no dependencies)
    research_result = await research_agent.run(
        f"Research '\{topic}': gather key facts, statistics, and primary sources."
    )

    # Stage 2 — Critique (depends on Stage 1)
    critique_result = await critique_agent.run(
        f"Critically review this research on '\{topic}':\n\n\{research_result.text}\n\n"
        "Identify: gaps, unsupported claims, alternative interpretations, missing data."
    )

    # Stage 3 — Recommendations (depends on Stages 1 + 2, can run after Stage 2)
    recommendations_result = await strategy_agent.run(
        f"Topic: \{topic}\n\nResearch:\n\{research_result.text}\n\n"
        f"Critique:\n\{critique_result.text}\n\n"
        "Produce 5 specific, evidence-backed strategic recommendations."
    )

    # Stage 4 — Final report (depends on all prior stages)
    final_result = await writer_agent.run(
        f"Write an executive report on '\{topic}' incorporating:\n\n"
        f"Research: \{research_result.text}\n\n"
        f"Critique: \{critique_result.text}\n\n"
        f"Recommendations: \{recommendations_result.text}\n\n"
        "Format: executive summary (200 words), findings, analysis, recommendations, next steps."
    )

    return PipelineResult(
        research=research_result.text,
        critique=critique_result.text,
        recommendations=recommendations_result.text,
        final_report=final_result.text,
    )
```

### Adversarial Verification (Red Team + Blue Team)

Use a critic agent to challenge the primary agent's output. A synthesiser resolves conflicts and produces the most accurate result. This pattern is especially valuable for financial analysis, security assessments, and medical information.

```python
from claude_agent_sdk import Agent

analyst_agent = Agent(
    model="claude-sonnet-4-6",
    tools=[query_analytics, read_file],
    system=(
        "You are a senior financial analyst. Produce rigorous analysis backed by data. "
        "State confidence levels and acknowledge uncertainty."
    ),
)

critic_agent = Agent(
    model="claude-sonnet-4-6",
    system=(
        "You are an adversarial reviewer (red team). Your job is to find flaws: "
        "unsupported claims, logical errors, missing considerations, cherry-picked data, "
        "and alternative interpretations that contradict the analysis. Be thorough."
    ),
)

synthesiser_agent = Agent(
    model="claude-sonnet-4-6",
    system=(
        "You are an impartial arbitrator. Given an analysis and a critique, "
        "produce the most accurate, balanced, and well-supported conclusion. "
        "Acknowledge genuine uncertainty rather than false confidence."
    ),
)

async def verified_analysis(data: str, question: str) -> dict:
    # Blue team: primary analysis
    primary = await analyst_agent.run(
        f"Question: \{question}\n\nData:\n\{data}\n\nProvide detailed analysis."
    )

    # Red team: adversarial critique
    critique = await critic_agent.run(
        f"Question: \{question}\n\n"
        f"Analysis to challenge:\n\{primary.text}\n\n"
        "Find every flaw, gap, and alternative interpretation."
    )

    # Synthesis: arbitrated conclusion
    final = await synthesiser_agent.run(
        f"Question: \{question}\n\n"
        f"Original analysis:\n\{primary.text}\n\n"
        f"Adversarial critique:\n\{critique.text}\n\n"
        "Produce the most accurate conclusion, incorporating valid critiques."
    )

    return \{
        "analysis": primary.text,
        "critique": critique.text,
        "verified_conclusion": final.text,
        "confidence": "high" if "significant flaw" not in critique.text.lower() else "medium",
    }
```

### Tournament Evaluation

Generate N candidate solutions in parallel, then use a judge to select the best. Effective for code generation, document drafting, and algorithm design.

```python
import asyncio
from claude_agent_sdk import Agent

solver_agent = Agent(
    model="claude-sonnet-4-6",
    tools=[write_code, run_tests],
    system="You are an expert software engineer. Solve the given problem.",
)

judge_agent = Agent(
    model="claude-sonnet-4-6",
    tools=[run_tests, analyse_code],
    system=(
        "You are a code reviewer and judge. Evaluate candidate solutions on: "
        "correctness, performance, readability, edge-case handling, and maintainability. "
        "Select the best and explain your reasoning."
    ),
)

async def tournament_solve(problem: str, n_candidates: int = 3) -> dict:
    # Generate N candidates in parallel with a different seed prompt each time
    seed_variants = [
        f"\{problem}\n\nApproach this from the angle of: \{approach}"
        for approach in [
            "optimising for performance",
            "optimising for readability and maintainability",
            "minimising code complexity",
        ][:n_candidates]
    ]

    candidates = await asyncio.gather(*[
        solver_agent.run(variant) for variant in seed_variants
    ])

    # Build evaluation prompt
    evaluation_prompt = (
        f"Problem:\n\{problem}\n\n"
        "Evaluate these candidate solutions and select the best:\n\n"
        + "\n\n---\n\n".join(
            f"### Candidate \{i + 1}\n\{c.text}"
            for i, c in enumerate(candidates)
        )
        + "\n\nProvide: winner (1/2/3), detailed reasoning, and any improvements."
    )

    verdict = await judge_agent.run(evaluation_prompt)

    return \{
        "candidates": [c.text for c in candidates],
        "verdict": verdict.text,
        "token_cost": sum(c.usage.total_tokens for c in candidates) + verdict.usage.total_tokens,
    }
```

---

## 7. Skills

### What Are Skills

Skills are reusable, model-discoverable capabilities described in Markdown files. The SDK auto-discovers all `SKILL.md` files in the `.claude/skills/` directory at agent startup. The model reads skill descriptions and invokes them by name when the task calls for it — no explicit tool call wiring required.

Skills are best for higher-level workflows that combine multiple tools, or for domain expertise the agent should apply automatically.

### Directory Structure

```
.claude/
  skills/
    data-analysis.md
    report-writer.md
    security-reviewer.md
    onboarding.md
```

### Creating a SKILL.md

```markdown
# Skill: Data Analysis

## Description
Perform quantitative analysis on tabular data: descriptive statistics,
trend detection, outlier identification, and correlation analysis.

## When to invoke
- User asks to "analyse data", "find trends", or "generate a report"
- User provides a CSV, database table name, or query result
- User asks about patterns, anomalies, or relationships in data

## Capabilities
- Descriptive statistics (mean, median, std dev, percentiles)
- Correlation and regression analysis
- Outlier detection (IQR and z-score methods)
- Time-series trend analysis
- Export results as JSON or formatted Markdown tables

## Tools used
- `query_analytics` — fetch data from the database
- `run_python` — execute analysis code
- `write_file` — save results to disk

## Output format
Return a structured report with:
1. Executive summary (3 sentences max)
2. Key findings (bullet list)
3. Supporting statistics (table)
4. Recommended next steps

## Example invocation
"Analyse sales data for Q2-2026 and identify the top 5 anomalies."
```

### Model Invocation

```python
from claude_agent_sdk import Agent, load_skills

# Auto-discover skills from .claude/skills/
skills = load_skills(skills_dir=".claude/skills")

agent = Agent(
    model="claude-sonnet-4-6",
    tools=[query_analytics, run_python, write_file],
    skills=skills,
    system=(
        "You are a senior data analyst. Use your available skills when appropriate. "
        "Always invoke the Data Analysis skill for any quantitative analysis task."
    ),
)

# Agent will automatically invoke the 'data-analysis' skill
result = await agent.run(
    "Look at our Q2 revenue data and tell me if there are any anomalies."
)
```

---

## 8. Sessions

### Persistent Context

Sessions maintain conversation history, tool results, and agent memory across multiple HTTP requests or process restarts. Without a durable state store, context is lost when the process exits.

=== "Python (Postgres)"

    ```python
    from claude_agent_sdk import Agent
    from claude_agent_sdk.stores import PostgresStateStore

    store = PostgresStateStore(
        dsn="postgresql://user:pass@host/db",
        table_prefix="agent_",  # Creates: agent_sessions, agent_memory
    )

    agent = Agent(
        model="claude-sonnet-4-6",
        tools=[query_analytics, write_report],
        state_store=store,
    )
    ```

=== "Python (Redis)"

    ```python
    from claude_agent_sdk.stores import RedisStateStore

    store = RedisStateStore(
        url="redis://localhost:6379",
        ttl_seconds=86400,  # Sessions expire after 24h of inactivity
        prefix="agent:",
    )
    ```

=== "TypeScript (Postgres)"

    ```typescript
    import \{ Agent } from "@anthropic-ai/claude-agent-sdk";
    import \{ PostgresStateStore } from "@anthropic-ai/claude-agent-sdk/stores";

    const store = new PostgresStateStore(\{
      connectionString: process.env.DATABASE_URL!,
      tablePrefix: "agent_",
    });

    const agent = new Agent(\{
      model: "claude-sonnet-4-6",
      tools: [queryAnalytics, writeReport],
      stateStore: store,
    });
    ```

### Session Management Across Requests

```python
import fastapi
from claude_agent_sdk import Agent

app = fastapi.FastAPI()

@app.post("/chat/\{session_id}")
async def chat(session_id: str, body: ChatRequest, user: User = Depends(get_user)):
    # Load existing session (creates new if not found)
    session = await agent.load_session(
        session_id=f"user-\{user.id}-\{session_id}",
        metadata=\{"user_id": user.id, "created_by": user.email},
    )

    result = await session.continue_(body.message)

    return \{
        "response": result.text,
        "session_id": session_id,
        "turn_count": session.turn_count,
        "tokens_used": result.usage.total_tokens,
    }

@app.delete("/chat/\{session_id}")
async def delete_session(session_id: str, user: User = Depends(get_user)):
    await agent.delete_session(f"user-\{user.id}-\{session_id}")
    return \{"deleted": True}

@app.get("/chat/\{session_id}/history")
async def get_history(session_id: str, user: User = Depends(get_user)):
    session = await agent.load_session(f"user-\{user.id}-\{session_id}")
    log = await session.export_log()
    # Audit log — strip tool results if they contain PII
    return \{
        "turns": [
            \{"role": t.role, "preview": t.content[:200], "timestamp": t.timestamp}
            for t in log.turns
        ]
    }
```

### Session Isolation

```python
# Each tenant gets isolated sessions — no cross-tenant data leakage
async def run_for_tenant(tenant_id: str, user_id: str, prompt: str):
    session_id = f"tenant:\{tenant_id}:user:\{user_id}"
    session = await agent.load_session(
        session_id=session_id,
        metadata=\{"tenant_id": tenant_id, "user_id": user_id},
    )
    return await session.continue_(prompt)
```

---

## 9. Subagents

### Delegation

Spawn a subagent when you need a specialised capability, isolated context, or a different model without polluting the parent's conversation history.

```python
from claude_agent_sdk import Agent

orchestrator = Agent(
    model="claude-sonnet-4-6",
    system="You coordinate specialised agents to complete complex tasks.",
)

async def generate_and_review_code(requirement: str) -> dict:
    # Delegate code generation to a subagent with coding tools
    code_result = await orchestrator.spawn_subagent(
        task=f"Write Python code to: \{requirement}",
        model="claude-sonnet-4-6",
        tools=[write_file, run_tests, read_file],
        system="You are an expert Python developer. Write clean, tested code.",
        max_tokens=4096,
    )

    # Delegate security review to a separate subagent
    security_result = await orchestrator.spawn_subagent(
        task=(
            f"Perform a security review of this Python code:\n\n\{code_result.text}\n\n"
            "Look for: injection flaws, hardcoded secrets, insecure deserialization, "
            "path traversal, and missing input validation."
        ),
        model="claude-sonnet-4-6",
        tools=[analyse_code],
        system="You are an application security engineer specialising in Python.",
        max_tokens=2048,
    )

    return \{
        "code": code_result.text,
        "security_review": security_result.text,
        "total_tokens": code_result.usage.total_tokens + security_result.usage.total_tokens,
    }
```

### Context Isolation

Subagents do not inherit the parent's conversation history. Pass only the context the subagent needs — this reduces token costs and prevents information leakage between tasks.

```python
async def process_documents(documents: list[dict]) -> list[dict]:
    """
    Each document gets its own subagent with isolated context.
    No cross-contamination of sensitive information between documents.
    """
    async def process_one(doc: dict) -> dict:
        result = await orchestrator.spawn_subagent(
            task=f"Summarise this document in 3 bullet points:\n\n\{doc['content']}",
            model="claude-haiku-4-5",  # Cheapest model for simple summarisation
            max_tokens=512,
            # Context is only this document — not the full document set
        )
        return \{"doc_id": doc["id"], "summary": result.text}

    # Process up to 10 documents concurrently
    semaphore = asyncio.Semaphore(10)

    async def bounded(doc):
        async with semaphore:
            return await process_one(doc)

    return await asyncio.gather(*[bounded(d) for d in documents])
```

### Result Aggregation

```python
from claude_agent_sdk import Agent
from pydantic import BaseModel

class RegionReport(BaseModel):
    region: str
    revenue_usd: float
    growth_pct: float
    top_product: str
    risk_flags: list[str]

async def aggregate_reports(regions: list[str]) -> dict:
    # Spawn subagents with structured output schemas
    tasks = [
        orchestrator.spawn_subagent(
            task=f"Analyse Q2-2026 data for region: \{region}",
            model="claude-haiku-4-5",
            output_schema=RegionReport,
        )
        for region in regions
    ]
    results = await asyncio.gather(*tasks)

    reports = [r.output for r in results]  # Each r.output is a validated RegionReport

    # Sort by revenue, flag high-risk regions
    sorted_reports = sorted(reports, key=lambda r: r.revenue_usd, reverse=True)
    high_risk = [r for r in reports if r.risk_flags]

    return \{
        "top_region": sorted_reports[0].region,
        "total_revenue": sum(r.revenue_usd for r in reports),
        "high_risk_regions": [r.region for r in high_risk],
        "reports": [r.dict() for r in sorted_reports],
    }
```

---

## 10. Production Patterns

### Circuit Breaker

Prevent cascade failures when a downstream service is degraded. The circuit breaker opens after N consecutive failures and allows limited recovery probes.

```python
from claude_agent_sdk import CircuitBreaker, CircuitOpenError
import structlog

log = structlog.get_logger()

breaker = CircuitBreaker(
    failure_threshold=5,      # Open after 5 consecutive failures
    recovery_timeout=60,      # Probe again after 60 seconds
    half_open_max_calls=2,    # Allow 2 test calls in half-open state
    on_state_change=lambda prev, curr: log.warning(
        "circuit_breaker_state_change",
        previous=prev,
        current=curr,
    ),
)

async def safe_agent_run(prompt: str) -> str:
    try:
        async with breaker:
            result = await agent.run(prompt)
            return result.text
    except CircuitOpenError:
        log.error("circuit_open_fallback_triggered")
        return "Service temporarily unavailable. Please try again in a few minutes."
```

### Retry with Exponential Backoff

```python
from claude_agent_sdk import Agent, RetryConfig, RateLimitError, ServiceUnavailableError

agent = Agent(
    model="claude-sonnet-4-6",
    tools=[query_analytics],
    retry_config=RetryConfig(
        max_attempts=4,
        backoff_base=2.0,          # 2s, 4s, 8s delays
        backoff_jitter=0.5,         # ±50% jitter prevents thundering herd
        retryable_errors=[RateLimitError, ServiceUnavailableError],
        on_retry=lambda attempt, error: log.warning(
            "agent_retry",
            attempt=attempt,
            error=type(error).__name__,
        ),
    ),
)
```

### Partial Result Recovery

For long-running batch jobs, checkpoint progress so the job can be resumed after a failure without reprocessing completed items.

```python
async def chunked_analysis(documents: list[dict], checkpoint_key: str) -> list[dict]:
    results = []

    # Resume from last saved checkpoint
    start_idx = await state_store.get(checkpoint_key, default=0)
    if start_idx > 0:
        log.info("resuming_from_checkpoint", index=start_idx)
        results = await state_store.get(f"\{checkpoint_key}_results", default=[])

    for i, doc in enumerate(documents[start_idx:], start=start_idx):
        try:
            result = await analyst_agent.run(f"Analyse document: \{doc['content']}")
            results.append(\{"doc_id": doc["id"], "analysis": result.text})

            # Checkpoint after every successful item
            await state_store.set(checkpoint_key, i + 1)
            await state_store.set(f"\{checkpoint_key}_results", results)

        except Exception as e:
            log.error("analysis_failed", doc_id=doc["id"], index=i, error=str(e))
            results.append(\{"doc_id": doc["id"], "error": str(e), "analysis": None})

    # Clean up checkpoint on successful completion
    await state_store.delete(checkpoint_key)
    await state_store.delete(f"\{checkpoint_key}_results")
    return results
```

### Rate Limit Handling

Anthropic enforces per-minute and per-day rate limits at the API level. Handle them gracefully.

```python
from claude_agent_sdk import RateLimiter

# Per-user limits enforced in your application layer
limiter = RateLimiter(
    backend="redis://localhost:6379",
    limits=\{
        "per_user_per_minute_requests": 10,
        "per_user_per_day_tokens": 500_000,
        "per_user_per_day_usd": 5.00,
    },
)

@app.post("/analyze")
async def analyze_endpoint(req: AnalyzeRequest, user: User = Depends(get_user)):
    try:
        async with limiter.check(user.id):
            result = await agent.run(req.prompt)
    except limiter.LimitExceededError as e:
        raise HTTPException(
            status_code=429,
            detail=\{
                "error": "rate_limit_exceeded",
                "message": str(e),
                "retry_after_seconds": e.retry_after,
            },
        )
    return \{"response": result.text, "tokens_used": result.usage.total_tokens}
```

---

## 11. Token Optimization

### Prompt Compression

Reduce system prompt size without losing fidelity. Large prompts waste tokens on every turn.

```python
# Bad — verbose, repetitive, padded with filler text
system_prompt_bad = """
You are an extremely helpful AI assistant named Claude who works for our company.
You should always be polite, respectful, and professional in all your interactions.
Your job is to help users with their questions about our products and services.
You should never say anything inappropriate or offensive...
(300 more words of filler)
"""

# Good — dense, precise, role-aware
system_prompt_good = """
Role: Senior product analyst for Acme Corp.
Capabilities: Revenue analysis, churn prediction, cohort analysis.
Constraints: Read-only database access. Do not speculate without data.
Output: Structured JSON + narrative summary. Cite specific metrics.
Tone: Direct, technical, concise.
"""
```

### Caching with `cache_control`

Use prompt caching to avoid reprocessing identical large context blocks on every API call. Cache read cost is 10% of base input cost; cache write is 25%.

```python
import anthropic

client = anthropic.Anthropic()

# Large, stable context (e.g., a policy document, schema, or codebase)
STABLE_CONTEXT = Path("company-policy.txt").read_text()

def run_with_cache(user_question: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2048,
        system=[
            {
                "type": "text",
                "text": STABLE_CONTEXT,
                "cache_control": {"type": "ephemeral"},  # Cache this block
            },
            {
                "type": "text",
                "text": "You are a policy analyst. Answer questions based on the policy document above.",
            },
        ],
        messages=[{"role": "user", "content": user_question}],
    )
    return response.content[0].text
```

:::tip Cache savings in practice
    A 100K-token policy document costs ~$0.30 to process per call at Sonnet pricing. With caching, the first call costs ~$0.25 (cache write) and all subsequent calls cost ~$0.03 (cache read). Break-even is 2 calls; after that you save ~90% on input tokens.

### Output Token Limits

Set `max_tokens` to the minimum needed for the task. Agents often generate verbose output by default.

```python
# Match max_tokens to the task
agents = {
    "classifier": Agent(model="claude-haiku-4-5", max_tokens=64),    # Label only
    "summariser": Agent(model="claude-haiku-4-5", max_tokens=512),   # Short summary
    "analyst":    Agent(model="claude-sonnet-4-6", max_tokens=2048), # Full analysis
    "writer":     Agent(model="claude-fable", max_tokens=8192),       # Long-form content
}
```

### Batch Processing

For non-latency-sensitive workloads, use the Messages Batch API to process many items at up to 50% lower cost.

```python
import anthropic

client = anthropic.Anthropic()

def batch_classify(texts: list[str]) -> list[str]:
    requests = [
        anthropic.types.message_create_params.MessageCreateParamsNonStreaming(
            custom_id=f"item-{i}",
            params={
                "model": "claude-haiku-4-5",
                "max_tokens": 16,
                "messages": [
                    {"role": "user", "content": f"Classify sentiment (positive/negative/neutral): {text}"}
                ],
            },
        )
        for i, text in enumerate(texts)
    ]

    batch = client.messages.batches.create(requests=requests)

    # Poll for completion (or use webhook)
    while batch.processing_status != "ended":
        import time; time.sleep(10)
        batch = client.messages.batches.retrieve(batch.id)

    results = []
    for result in client.messages.batches.results(batch.id):
        if result.result.type == "succeeded":
            results.append(result.result.message.content[0].text.strip())
        else:
            results.append("error")
    return results
```

---

## 12. Cost Optimization

### Model Selection Matrix

Match model to task complexity. Over-specifying the model is the single largest source of unnecessary cost in production agentic systems.

| Task Type | Recommended Model | Rationale |
|-----------|-------------------|-----------|
| Classification, routing, short extraction | `claude-haiku-4-5` | Sub-100ms, minimal reasoning required |
| Summarisation (< 10K tokens) | `claude-haiku-4-5` | Fast, accurate, cost-efficient |
| Code generation (< 500 lines) | `claude-sonnet-4-6` | Strong coding, good speed |
| Multi-step reasoning, analysis | `claude-sonnet-4-6` | Best value for complex tasks |
| Creative writing, narrative | `claude-fable` | Optimised for fluency and style |
| Long-horizon coding, complex research | `claude-opus-4-6` | Maximum capability, use sparingly |

See [Claude Models 2026](claude-models-2026.md) for pricing details.

### Token Counting Before Dispatch

Count tokens before sending to catch budget overruns before they incur cost.

```python
import anthropic

client = anthropic.Anthropic()

def count_tokens(model: str, messages: list[dict], system: str = "") -> int:
    response = client.messages.count_tokens(
        model=model,
        system=system,
        messages=messages,
    )
    return response.input_tokens

async def budget_guarded_run(prompt: str, max_input_tokens: int = 10_000):
    messages = [{"role": "user", "content": prompt}]
    token_count = count_tokens("claude-sonnet-4-6", messages)

    if token_count > max_input_tokens:
        raise ValueError(
            f"Input too large: {token_count} tokens exceeds budget of {max_input_tokens}. "
            f"Compress the prompt or split into smaller tasks."
        )

    return await agent.run(prompt)
```

### Budget Guards

```python
from claude_agent_sdk import Agent, CostLimit

# Hard budget per task
agent = Agent(
    model="claude-sonnet-4-6",
    cost_limit=CostLimit(
        max_tokens_per_task=50_000,
        max_cost_usd=0.75,        # Hard stop at $0.75 per task
        on_limit="raise",          # Options: "raise", "truncate", "warn"
    ),
)

# Per-tenant monthly budget (SaaS pattern)
from claude_agent_sdk.billing import TenantBudget

tenant_budgets = TenantBudget(store=postgres_store)

async def run_for_tenant(tenant_id: str, prompt: str):
    remaining = await tenant_budgets.get_remaining(tenant_id)
    if remaining.usd < 0.01:
        raise QuotaExceededError(f"Tenant {tenant_id} budget exhausted for this period")

    result = await agent.run(prompt)
    await tenant_budgets.deduct(tenant_id, result.usage.cost_usd)
    return result
```

### Dynamic Model Routing

Route simple tasks to cheaper models automatically.

```python
from claude_agent_sdk import Agent

haiku_agent  = Agent(model="claude-haiku-4-5",  max_tokens=512)
sonnet_agent = Agent(model="claude-sonnet-4-6", max_tokens=4096)
opus_agent   = Agent(model="claude-opus-4-6",   max_tokens=8192)

async def route_and_run(prompt: str, task_complexity: str = "auto") -> str:
    if task_complexity == "auto":
        # Quick complexity estimate via token count and keyword heuristics
        token_count = count_tokens("claude-haiku-4-5", [{"role": "user", "content": prompt}])
        keywords = {"analyse", "compare", "synthesise", "strategy", "architecture"}
        has_complex_keywords = any(kw in prompt.lower() for kw in keywords)

        if token_count < 500 and not has_complex_keywords:
            task_complexity = "simple"
        elif token_count < 5000:
            task_complexity = "medium"
        else:
            task_complexity = "complex"

    agent_map = {"simple": haiku_agent, "medium": sonnet_agent, "complex": opus_agent}
    selected_agent = agent_map[task_complexity]
    result = await selected_agent.run(prompt)

    log.info("model_routing", complexity=task_complexity, model=selected_agent.model,
             tokens=result.usage.total_tokens, cost_usd=result.usage.cost_usd)
    return result.text
```

---

## 13. Guardrails & Safety

### Input Validation Before Dispatch

Never pass raw user input directly to an agent. Validate length, content, and intent first.

```python
import re
from claude_agent_sdk.exceptions import InvalidInputError

MAX_PROMPT_CHARS = 20_000
BLOCKED_PATTERNS = [
    r"ignore previous instructions",
    r"disregard your system prompt",
    r"you are now (?:in |)developer mode",
    r"jailbreak",
    r"DAN mode",
]

def validate_input(user_input: str) -> str:
    if not user_input or not user_input.strip():
        raise InvalidInputError("Input cannot be empty")

    if len(user_input) > MAX_PROMPT_CHARS:
        raise InvalidInputError(f"Input exceeds {MAX_PROMPT_CHARS} character limit")

    for pattern in BLOCKED_PATTERNS:
        if re.search(pattern, user_input, re.IGNORECASE):
            raise InvalidInputError("Input contains a disallowed pattern")

    return user_input.strip()

@app.post("/run")
async def run_endpoint(req: RunRequest, user: User = Depends(get_user)):
    try:
        clean_input = validate_input(req.prompt)
    except InvalidInputError as e:
        log.warning("input_validation_failed", user_id=user.id, reason=str(e))
        raise HTTPException(status_code=400, detail=str(e))

    result = await agent.run(clean_input)
    return {"response": result.text}
```

### Output Validation and Sanitisation

Validate agent output before exposing it to downstream systems or users.

```python
import json
from pydantic import BaseModel, ValidationError

class AnalysisOutput(BaseModel):
    summary: str
    key_findings: list[str]
    confidence: float  # 0.0 to 1.0
    data_sources: list[str]

async def validated_analysis(prompt: str) -> AnalysisOutput:
    result = await agent.run(
        f"{prompt}\n\nReturn your response as valid JSON matching this schema: "
        f"{AnalysisOutput.schema_json()}"
    )

    # Strip markdown code fences if present
    text = result.text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\n?", "", text).rstrip("` ")

    try:
        data = json.loads(text)
        return AnalysisOutput(**data)
    except (json.JSONDecodeError, ValidationError) as e:
        log.error("output_validation_failed", error=str(e), raw=result.text[:500])
        raise ValueError(f"Agent produced invalid output: \{e}")
```

### Refusal Detection and Graceful Degradation

```python
REFUSAL_INDICATORS = [
    "i'm not able to",
    "i cannot",
    "i don't have access",
    "as an ai, i",
    "i'm unable to provide",
    "i can't assist with",
]

def is_refusal(response_text: str) -> bool:
    lower = response_text.lower()
    return any(indicator in lower for indicator in REFUSAL_INDICATORS)

async def run_with_fallback(prompt: str) -> str:
    result = await primary_agent.run(prompt)

    if is_refusal(result.text):
        log.warning("agent_refusal_detected", prompt_preview=prompt[:200])
        # Try with a reframed prompt
        reframed = await reframing_agent.run(
            f"The following request was declined. Reframe it to be more acceptable "
            f"while preserving the core intent:\n\n\{prompt}"
        )
        result = await primary_agent.run(reframed.text)

        if is_refusal(result.text):
            # Graceful degradation — surface to human
            return (
                "This request requires human review. "
                "A team member will follow up within 1 business day."
            )

    return result.text
```

---

## 14. Observability

### Structured Logging

```python
import structlog
from claude_agent_sdk import Agent

log = structlog.get_logger()

def make_event_handler(session_id: str, user_id: str):
    def handler(event):
        log.info(
            "agent_event",
            event_type=event.type,
            session_id=session_id,
            user_id=user_id,
            model=event.model if hasattr(event, "model") else None,
            tool_name=event.tool_name if hasattr(event, "tool_name") else None,
            input_tokens=event.usage.input_tokens if event.usage else None,
            output_tokens=event.usage.output_tokens if event.usage else None,
            cost_usd=event.usage.cost_usd if event.usage else None,
        )
    return handler

agent = Agent(
    model="claude-sonnet-4-6",
    on_event=make_event_handler(session_id="sess-001", user_id="user-42"),
)
```

### Token Usage Tracking

```python
from dataclasses import dataclass, field
from collections import defaultdict

@dataclass
class UsageAccumulator:
    input_tokens: int = 0
    output_tokens: int = 0
    cache_read_tokens: int = 0
    cache_write_tokens: int = 0
    cost_usd: float = 0.0
    call_count: int = 0

usage_by_tenant: dict[str, UsageAccumulator] = defaultdict(UsageAccumulator)

def track_usage(tenant_id: str, usage):
    acc = usage_by_tenant[tenant_id]
    acc.input_tokens    += usage.input_tokens
    acc.output_tokens   += usage.output_tokens
    acc.cache_read_tokens  += getattr(usage, "cache_read_tokens", 0)
    acc.cache_write_tokens += getattr(usage, "cache_write_tokens", 0)
    acc.cost_usd        += usage.cost_usd
    acc.call_count      += 1

# Daily billing reconciliation
async def export_daily_usage():
    for tenant_id, acc in usage_by_tenant.items():
        await billing_db.upsert(\{
            "date": date.today().isoformat(),
            "tenant_id": tenant_id,
            "input_tokens": acc.input_tokens,
            "output_tokens": acc.output_tokens,
            "cost_usd": round(acc.cost_usd, 6),
            "call_count": acc.call_count,
        })
```

### Distributed Tracing (W3C Trace Context)

Propagate W3C Trace Context (`traceparent`, `tracestate`) through agent chains so spans appear correctly in your APM tool (Datadog, Jaeger, Honeycomb).

```python
from opentelemetry import trace
from opentelemetry.propagate import inject, extract
from claude_agent_sdk.telemetry import OtelInstrumentation

tracer = trace.get_tracer("agent-sdk")

OtelInstrumentation.configure(
    tracer_provider=trace.get_tracer_provider(),
    capture_prompts=False,    # Avoid PII in traces
    capture_responses=False,  # Avoid sensitive output in traces
)

async def traced_agent_run(prompt: str, carrier: dict | None = None) -> str:
    """
    carrier: dict containing 'traceparent' and 'tracestate' headers
             from the upstream request (HTTP or event message).
    """
    ctx = extract(carrier or {})

    with tracer.start_as_current_span("agent.run", context=ctx) as span:
        span.set_attribute("agent.model", agent.model)
        span.set_attribute("agent.prompt_length", len(prompt))

        result = await agent.run(prompt)

        span.set_attribute("agent.input_tokens", result.usage.input_tokens)
        span.set_attribute("agent.output_tokens", result.usage.output_tokens)
        span.set_attribute("agent.cost_usd", result.usage.cost_usd)

        return result.text
```

### Key Metrics to Track

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| `task_completion_rate` | % tasks finishing without error | < 95% |
| `avg_tokens_per_task` | Token efficiency over time | > 3× baseline |
| `tool_error_rate` | % tool calls returning errors | > 5% |
| `p95_latency_ms` | 95th percentile end-to-end latency | > 30,000 ms |
| `cost_per_task_usd` | Mean agent task cost | > budget target |
| `circuit_breaker_trips` | Circuit breaker state changes | Any in 1 hour |
| `refusal_rate` | % responses that are refusals | > 2% |
| `checkpoint_rejection_rate` | % HITL checkpoints rejected | > 10% |

---

## 15. Best Practices

1. **Pin model versions** — use `claude-sonnet-4-6` not `claude-sonnet-latest`. Model updates can change behaviour and break evals. Update intentionally after testing.

2. **Set `max_tokens` tightly** — agents default to verbose output. Set `max_tokens` to the minimum the task requires. This both controls cost and forces conciseness.

3. **Use Haiku for sub-tasks** — the majority of subagent work (classification, extraction, short summarisation) does not require Sonnet or Opus. Default subagents to Haiku unless the task demands it.

4. **Always validate tool inputs** — the model is a probabilistic system. Tool arguments must be validated (type, range, allowlist) before execution, especially for database writes and file operations.

5. **Implement HITL for irreversible actions** — any action that cannot be undone (sending emails, charging payments, deleting records, deploying code) must have a human checkpoint or be designed to be reversible with a compensating transaction.

6. **Use durable state stores in production** — in-memory sessions die with the process. Use Postgres or Redis for all sessions that span more than one request.

7. **Separate agent roles** — a single agent with 20 tools and a 2,000-token system prompt performs worse than three specialised agents with 5 tools each. Scope each agent to one responsibility.

8. **Cap parallel subagent concurrency** — spawning 50 subagents simultaneously will hit rate limits and cause cascading failures. Use `asyncio.Semaphore` to bound concurrency to 5–10 concurrent API calls.

9. **Log tool invocations with user attribution** — every tool call must be logged with: user ID, session ID, tool name, input arguments (redact PII), timestamp, and success/failure. This is your audit trail.

10. **Test with adversarial inputs** — inject prompt injection attempts, malformed tool arguments, and extremely long inputs into your test suite. The agent should handle all of them gracefully without crashing or leaking data.

11. **Implement budget guards before dispatch** — count tokens before sending and reject or split prompts that exceed your input token budget. This prevents surprise API costs from oversized inputs.

12. **Use structured outputs for downstream processing** — when another system consumes agent output, require JSON with a validated schema rather than free text. This prevents brittle string parsing and makes failures explicit.

---

## 16. Antipatterns

1. **Running everything through Opus** — the most common cost mistake. Opus costs 5× Sonnet and should only be used for tasks that genuinely require its capabilities. Use the model selection matrix in §12.

2. **Omitting token/cost budgets** — an agent with no budget guard can run 1M tokens on a single malformed request. Always set `CostLimit` with a `max_cost_usd` hard cap.

3. **Using in-memory sessions for multi-turn interactions** — any session that spans an HTTP request or a process restart will lose context. This causes confusing user experiences and inconsistent agent behaviour.

4. **Giving agents unrestricted bash/file access** — an agent with full shell access will eventually delete something important, exfiltrate data, or be exploited via prompt injection. Always sandbox tool access.

5. **Not implementing circuit breakers** — without a circuit breaker, a degraded downstream service causes every agent request to time out for minutes, consuming thread pool capacity and accumulating cost on retries.

6. **Spawning unlimited concurrent subagents** — parallel fan-out without a concurrency limit will exhaust your API rate limit quota, triggering 429 errors that retry endlessly and amplify the problem.

7. **Not logging tool invocations** — without tool-level audit logs you cannot diagnose production incidents, demonstrate compliance, or answer "what did the agent do with user X's data?"

8. **Not validating agent output before acting on it** — agents occasionally hallucinate JSON keys, omit required fields, or produce malformed output. Validate with Pydantic before passing output to databases or APIs.

9. **Agents with no max_iterations limit** — a tool that always returns an error will cause the agent to loop indefinitely. Always set a maximum iteration count (e.g., `max_tool_calls=20`).

10. **Passing raw user input directly to the agent** — prompt injection is real. User input must be validated for length, content policy violations, and injection patterns before reaching the agent.

11. **Hardcoding API keys in source code** — even in "internal" repositories. Use environment variables, secrets managers, or CI secret injection. Rotate on a 90-day schedule.

12. **Blending multiple unrelated responsibilities in one agent** — an agent responsible for research, writing, database operations, and email sending has no meaningful tool boundaries. When something goes wrong, it is impossible to attribute or isolate the failure.

---

## 17. Testing

### Unit Testing Agents

```python
import pytest
from claude_agent_sdk.testing import MockAgent, MockToolCall

@pytest.fixture
def mock_agent():
    return MockAgent(
        model="claude-sonnet-4-6",
        responses=[
            MockToolCall(tool="query_analytics", arguments={"sql": "SELECT count(*) FROM users"}),
            "Based on the data, there are 42,317 active users.",
        ],
    )

async def test_user_count_query(mock_agent):
    result = await mock_agent.run("How many active users do we have?")

    assert "42,317" in result.text
    assert mock_agent.tool_calls[0].tool == "query_analytics"
    assert "SELECT" in mock_agent.tool_calls[0].arguments["sql"].upper()

async def test_input_too_long_raises(mock_agent):
    with pytest.raises(ValueError, match="character limit"):
        await run_with_validation("x" * 25_000)
```

### Evaluation Harness

Run a fixed set of test cases and measure pass rate, token cost, and latency. Run this in CI against every model upgrade.

```python
from dataclasses import dataclass
from claude_agent_sdk import Agent
import time

@dataclass
class EvalCase:
    prompt: str
    expected_contains: list[str]       # Strings the response must contain
    expected_tool_calls: list[str]     # Tool names that must be invoked
    max_tokens_allowed: int = 5000
    max_latency_ms: int = 30_000

EVAL_SUITE = [
    EvalCase(
        prompt="How many users signed up last week?",
        expected_contains=["users", "signed up"],
        expected_tool_calls=["query_analytics"],
        max_tokens_allowed=2000,
    ),
    EvalCase(
        prompt="Summarise the Q2 revenue trends",
        expected_contains=["Q2", "revenue"],
        expected_tool_calls=["query_analytics", "format_report"],
        max_tokens_allowed=4000,
    ),
]

async def run_eval_suite(agent: Agent) -> dict:
    passed = 0
    results = []

    for case in EVAL_SUITE:
        start = time.monotonic()
        result = await agent.run(case.prompt)
        latency_ms = (time.monotonic() - start) * 1000

        content_ok  = all(term in result.text for term in case.expected_contains)
        tools_ok    = all(t in result.tool_names_called for t in case.expected_tool_calls)
        tokens_ok   = result.usage.total_tokens <= case.max_tokens_allowed
        latency_ok  = latency_ms <= case.max_latency_ms

        passed_case = content_ok and tools_ok and tokens_ok and latency_ok
        if passed_case:
            passed += 1

        results.append({
            "prompt": case.prompt[:80],
            "passed": passed_case,
            "content_ok": content_ok,
            "tools_ok": tools_ok,
            "tokens": result.usage.total_tokens,
            "latency_ms": round(latency_ms),
            "cost_usd": result.usage.cost_usd,
        })

    return {
        "pass_rate": passed / len(EVAL_SUITE),
        "total_cases": len(EVAL_SUITE),
        "total_cost_usd": sum(r["cost_usd"] for r in results),
        "results": results,
    }
```

### Stress Testing

```python
import asyncio, statistics, time
from claude_agent_sdk import Agent

async def stress_test(agent: Agent, n_concurrent: int = 20, n_total: int = 100):
    semaphore = asyncio.Semaphore(n_concurrent)
    latencies = []
    errors = []

    async def single_run(i: int):
        async with semaphore:
            start = time.monotonic()
            try:
                result = await agent.run(f"Quick analysis task #{i}: count rows in users table")
                latencies.append((time.monotonic() - start) * 1000)
                return result
            except Exception as e:
                errors.append({"index": i, "error": str(e)})

    tasks = [single_run(i) for i in range(n_total)]
    await asyncio.gather(*tasks)

    return {
        "total_requests": n_total,
        "error_count": len(errors),
        "error_rate_pct": len(errors) / n_total * 100,
        "p50_latency_ms": statistics.median(latencies),
        "p95_latency_ms": statistics.quantiles(latencies, n=20)[18],
        "p99_latency_ms": statistics.quantiles(latencies, n=100)[98],
        "errors": errors[:10],  # First 10 errors for diagnosis
    }
```

---

## 18. Managed Agents API

### SDK vs Managed Agents: When to Switch

Managed Agents is a hosted REST product where Anthropic runs the agent sandbox. You call it via HTTP and receive results without managing any infrastructure.

**Switch from Agent SDK to Managed Agents when:**
- You need zero-infrastructure deployment for a lightweight tool
- You are building a product integration that just needs Claude to act in a sandboxed environment
- Your data is not sensitive and does not need to stay on your infrastructure
- You are prototyping and want to defer infrastructure decisions

**Stay on Agent SDK when:**
- Data residency or network isolation is required
- You need custom state stores, billing, or rate limiting
- Your agent orchestration logic is complex (multi-tenant, multi-agent DAGs)
- You need cost attribution at the per-tenant or per-user level

### Managed Agents REST API Overview

```python
import httpx

MANAGED_AGENTS_BASE = "https://api.anthropic.com/v1/agents"
HEADERS = {
    "x-api-key": os.environ["ANTHROPIC_API_KEY"],
    "anthropic-version": "2025-11-25",
    "content-type": "application/json",
}

async def run_managed_agent(task: str, tools: list[str]) -> dict:
    async with httpx.AsyncClient() as client:
        # Create an agent run
        resp = await client.post(
            f"{MANAGED_AGENTS_BASE}/runs",
            headers=HEADERS,
            json={
                "model": "claude-sonnet-4-6",
                "task": task,
                "tools": tools,           # Tool allowlist (managed sandbox)
                "max_iterations": 20,
            },
        )
        resp.raise_for_status()
        run = resp.json()

        # Poll until complete
        while run["status"] in ("queued", "running"):
            await asyncio.sleep(2)
            poll = await client.get(
                f"{MANAGED_AGENTS_BASE}/runs/{run['id']}",
                headers=HEADERS,
            )
            run = poll.json()

        return {
            "status": run["status"],
            "result": run.get("result"),
            "usage": run.get("usage"),
        }
```

For enterprise cloud deployment (AWS Bedrock, GCP Vertex AI, Azure AI Foundry), see [Claude Enterprise Deployment 2026](claude-enterprise-2026.md).

---

## 19. Agent SDK Credits Billing

From **June 15, 2026**, Agent SDK usage is included in Claude.ai subscription plans via a monthly credit allocation. Credits are consumed per SDK agent run, distinct from direct API token billing.

| Plan | Monthly Credits | Approx. Agent Runs |
|------|-----------------|--------------------|
| Pro | $20/month | ~100–400 typical tasks |
| Max 5× | $100/month | ~500–2,000 typical tasks |
| Max 20× | $200/month | ~1,000–4,000 typical tasks |

:::note Credits vs API billing
    Credits apply when using the Agent SDK through Claude.ai. Direct API usage (raw Messages API) is billed at standard token rates regardless of subscription plan. If you are building a SaaS product that bills your own customers for agent usage, use the API directly with your API key, not subscription credits.

**Credit consumption factors:**
- Model selected (Haiku < Sonnet < Fable < Opus)
- Total tokens per run (input + output + cache operations)
- Number of tool calls per run
- Subagent spawning (each subagent run consumes separate credits)

**Credit optimisation:**
- Use Haiku for high-volume, simple subagent tasks
- Enable prompt caching for repeated stable context blocks
- Set `max_tokens` to the minimum required for each task type
- Batch non-latency-sensitive operations using the Messages Batch API

---

## Quick Reference: Production Deployment Checklist

### Before Launch

- [ ] Pin model to specific version (e.g., `claude-sonnet-4-6`, not `claude-sonnet-latest`)
- [ ] Set `CostLimit` with `max_cost_usd` hard cap on every agent
- [ ] Configure durable state store (Postgres or Redis) — never in-memory for production
- [ ] Enable structured logging with session IDs and user attribution on every event
- [ ] Implement per-user and per-tenant rate limiting at the application layer
- [ ] Sandbox all tool access — no unrestricted shell, file system, or network
- [ ] Add HITL checkpoints for every irreversible action
- [ ] Deploy circuit breaker for all downstream service dependencies
- [ ] Set up cost alerting at 80% and 100% of monthly budget
- [ ] Complete eval harness with ≥ 20 test cases; pass rate ≥ 95% required to ship

### Monitoring

- [ ] Alert on `task_completion_rate` < 95%
- [ ] Alert on `tool_error_rate` > 5%
- [ ] Alert on `p95_latency_ms` > 30,000
- [ ] Alert on circuit breaker state changes
- [ ] Export daily usage CSV for billing reconciliation
- [ ] PagerDuty/Slack alert on circuit breaker trips

### Security and Compliance

- [ ] Never log raw prompts or responses (may contain PII)
- [ ] Audit log every tool invocation: user ID, tool name, arguments (redacted), timestamp
- [ ] Validate all tool inputs before execution
- [ ] Rotate `ANTHROPIC_API_KEY` on a 90-day schedule
- [ ] Store API keys in secrets manager — never in source code or environment files committed to git
- [ ] Review agent tool access scope quarterly; remove unused tools
