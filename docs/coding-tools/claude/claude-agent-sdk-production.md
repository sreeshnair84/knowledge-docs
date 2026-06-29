---
title: Claude Agent SDK — Production Guide
---

# Claude Agent SDK — Production Guide

Production-grade patterns for building agentic systems with the Claude Agent SDK — multi-agent orchestration, durable state, cost controls, observability, and deployment.

---

## Core Architecture

The Agent SDK wraps the Messages API with agent lifecycle management: tool execution, memory persistence, sub-agent spawning, and session continuity.

### SDK vs Raw API

| Capability | Raw Messages API | Agent SDK |
|-----------|-----------------|-----------|
| Tool execution | Manual loop | Built-in |
| Sub-agents | Manual spawn | `agent.spawn()` |
| Session persistence | Manual | Automatic |
| Memory | You manage | Managed store |
| Retries | Manual | Configurable |
| Credit accounting | Shared | Separate pool |

---

## Setup

### Python

```bash
pip install claude-agent-sdk
```

```python
from claude_agent_sdk import Agent, Tool, Session

agent = Agent(
    model="claude-sonnet-4-6",
    tools=[search_tool, db_tool],
    system="You are a senior data analyst. Be precise and cite sources.",
    max_tokens=8192
)
```

### TypeScript

```bash
npm install @anthropic-ai/agent-sdk
```

```typescript
import { Agent, Tool } from "@anthropic-ai/agent-sdk";

const agent = new Agent({
  model: "claude-sonnet-4-6",
  tools: [searchTool, dbTool],
  system: "You are a senior data analyst. Be precise and cite sources.",
  maxTokens: 8192,
});
```

---

## Session Lifecycle

### Ephemeral Sessions

```python
# Single task, no persistence
result = await agent.run("Analyze the Q2 revenue data and identify the top 3 anomalies")
print(result.text)
```

### Persistent Sessions

```python
# Create a session (stored in backend)
session = await agent.create_session(
    session_id="user-123-analysis-456",
    metadata={"user_id": "123", "task": "quarterly-review"}
)

# Continue across requests (e.g. from HTTP endpoints)
session = await agent.load_session("user-123-analysis-456")
result = await session.continue_("Now compare with Q1")
```

### Conversation Log as Source of Truth

The SDK stores conversation history externally (Postgres or Redis). Never rely on in-memory state for multi-turn sessions:

```python
# Export session log for audit/replay
log = await session.export_log()
for turn in log.turns:
    print(f"{turn.role}: {turn.content[:100]}")
```

---

## Tool Definition

```python
from claude_agent_sdk import Tool, tool

@tool(
    description="Query the analytics database. Use for revenue, user, and event data.",
    returns="JSON array of query results"
)
async def query_analytics(
    sql: str,
    database: str = "production"
) -> list[dict]:
    """
    sql: The SQL query to execute. Must be read-only (SELECT only).
    database: Target database — 'production' or 'staging'.
    """
    async with db_pool.acquire() as conn:
        rows = await conn.fetch(sql)
        return [dict(r) for r in rows]
```

### Tool Security Boundaries

```python
@tool(description="Read file contents from the project directory")
async def read_file(path: str) -> str:
    # Enforce path sandboxing
    base = Path("/var/projects/sandbox")
    target = (base / path).resolve()
    if not str(target).startswith(str(base)):
        raise ValueError(f"Path traversal attempt blocked: {path}")
    return target.read_text()
```

---

## Multi-Agent Patterns

### Fan-Out Pattern

Distribute work across parallel sub-agents:

```python
async def analyze_regions(regions: list[str]) -> dict:
    # Spawn one agent per region in parallel
    tasks = [
        agent.spawn(
            f"Analyze sales performance for region: {region}",
            context={"region": region, "quarter": "Q2-2026"}
        )
        for region in regions
    ]

    results = await asyncio.gather(*tasks)
    return {
        region: result.text
        for region, result in zip(regions, results)
    }
```

### Sequential DAG Pattern

Chain agents where each depends on the previous:

```python
async def research_pipeline(topic: str) -> str:
    # Stage 1: Research
    research = await agent.run(f"Research {topic}: find key facts, data, and sources")

    # Stage 2: Analysis (receives research output as context)
    analysis = await agent.run(
        f"Analyze this research and identify gaps:\n{research.text}"
    )

    # Stage 3: Report writing
    report = await agent.run(
        f"Write an executive summary based on:\n"
        f"Research: {research.text}\n"
        f"Analysis: {analysis.text}"
    )
    return report.text
```

### Adversarial Verification Pattern

Use a critic agent to validate another agent's output:

```python
async def verified_analysis(data: str) -> str:
    # Primary agent produces analysis
    primary = await analyst_agent.run(f"Analyze this data: {data}")

    # Critic agent challenges it
    critique = await critic_agent.run(
        f"Critically review this analysis. Find flaws, unsupported claims, "
        f"and missing considerations:\n{primary.text}"
    )

    # Synthesizer resolves conflicts
    final = await synthesizer_agent.run(
        f"Given the analysis and critique, produce the most accurate conclusion:\n"
        f"Analysis: {primary.text}\n"
        f"Critique: {critique.text}"
    )
    return final.text
```

### Tournament Evaluation Pattern

When you need the best answer from multiple approaches:

```python
async def tournament_solve(problem: str, n_candidates: int = 3) -> str:
    # Generate N candidate solutions in parallel
    candidates = await asyncio.gather(*[
        solver_agent.run(problem) for _ in range(n_candidates)
    ])

    # Judge selects the best
    judge_prompt = "Select the best solution and explain why:\n\n" + "\n\n---\n\n".join(
        f"Candidate {i+1}:\n{c.text}" for i, c in enumerate(candidates)
    )
    verdict = await judge_agent.run(judge_prompt)
    return verdict.text
```

---

## Durable State

### Postgres State Store

```python
from claude_agent_sdk.stores import PostgresStateStore

store = PostgresStateStore(
    dsn="postgresql://user:pass@host/db",
    table_prefix="agent_"  # creates agent_sessions, agent_memory tables
)

agent = Agent(
    model="claude-sonnet-4-6",
    state_store=store,
    tools=[...]
)
```

### Redis for High-Throughput

```python
from claude_agent_sdk.stores import RedisStateStore

store = RedisStateStore(
    url="redis://localhost:6379",
    ttl_seconds=3600,  # Session expires after 1 hour of inactivity
    prefix="agent:"
)
```

### External Memory (Vector Store)

```python
from claude_agent_sdk import MemoryProvider

class PgVectorMemory(MemoryProvider):
    async def store(self, key: str, content: str, metadata: dict):
        embedding = await embed(content)
        await db.execute(
            "INSERT INTO agent_memory (key, content, embedding, metadata) VALUES ($1,$2,$3,$4)",
            key, content, embedding, metadata
        )

    async def retrieve(self, query: str, top_k: int = 5) -> list[str]:
        query_embedding = await embed(query)
        rows = await db.fetch(
            "SELECT content FROM agent_memory ORDER BY embedding <=> $1 LIMIT $2",
            query_embedding, top_k
        )
        return [r["content"] for r in rows]

agent = Agent(model="claude-sonnet-4-6", memory=PgVectorMemory())
```

---

## Cost Controls

### Per-Task Budgets

```python
agent = Agent(
    model="claude-sonnet-4-6",
    cost_limit=CostLimit(
        max_tokens_per_task=50_000,
        max_cost_usd=0.50,          # Hard stop at $0.50
        on_limit="raise"            # or "truncate" or "warn"
    )
)
```

### Per-User Rate Limiting

```python
from claude_agent_sdk import RateLimiter

limiter = RateLimiter(
    backend="redis://localhost:6379",
    limits={
        "per_user_per_minute": 10,
        "per_user_per_day_tokens": 500_000,
        "per_user_per_day_usd": 5.00
    }
)

@app.post("/analyze")
async def analyze(request: AnalyzeRequest, user: User = Depends(get_user)):
    async with limiter.check(user.id):
        result = await agent.run(request.prompt)
    return result
```

### Per-Tenant Hard Caps (SaaS)

```python
from claude_agent_sdk.billing import TenantBudget

budget = TenantBudget(store=postgres_store)

async def run_for_tenant(tenant_id: str, prompt: str):
    remaining = await budget.get_remaining(tenant_id)
    if remaining.usd < 0.01:
        raise QuotaExceededError(f"Tenant {tenant_id} has exhausted monthly budget")

    result = await agent.run(prompt)
    await budget.deduct(tenant_id, result.usage.cost_usd)
    return result
```

---

## Managed Agents

The Managed Agents layer (built on top of Agent SDK) adds:

- **Dreaming Pass**: Periodic background tasks where agents proactively surface insights
- **Rubric Grading**: Automated quality scoring using a judge model
- **Scheduler**: Cron-style triggering of agent runs

```python
from claude_agent_sdk.managed import ManagedAgent, Rubric

agent = ManagedAgent(
    name="market-analyst",
    model="claude-opus-4-6",
    schedule="0 8 * * MON-FRI",  # 8am weekdays
    rubric=Rubric(
        criteria=[
            "Contains at least 3 specific data points",
            "Includes actionable recommendations",
            "Cites sources or acknowledges uncertainty"
        ],
        min_score=0.8
    )
)
```

---

## Ultra Code (Parallel Sub-Agent Spawning)

For large coding tasks, spawn sub-agents per file or module:

```python
async def ultra_refactor(repo_path: str, target_pattern: str) -> dict:
    # Discover files matching pattern
    files = glob.glob(f"{repo_path}/{target_pattern}", recursive=True)

    # Spawn one refactoring agent per file (parallel)
    async def refactor_file(path: str):
        code = Path(path).read_text()
        result = await agent.spawn(
            f"Refactor this code to use async/await throughout:\n\n{code}",
            output_schema={"refactored_code": "string", "changes_summary": "string"}
        )
        Path(path).write_text(result.output["refactored_code"])
        return {"file": path, "summary": result.output["changes_summary"]}

    results = await asyncio.gather(*[refactor_file(f) for f in files])
    return {"files_changed": len(results), "details": results}
```

---

## Observability

### Structured Logging

```python
import structlog

log = structlog.get_logger()

agent = Agent(
    model="claude-sonnet-4-6",
    on_event=lambda event: log.info(
        "agent_event",
        event_type=event.type,
        session_id=event.session_id,
        tokens_used=event.usage.total_tokens if event.usage else None,
        tool_name=event.tool_name if hasattr(event, "tool_name") else None
    )
)
```

### OpenTelemetry Integration

```python
from opentelemetry import trace
from claude_agent_sdk.telemetry import OtelInstrumentation

OtelInstrumentation.configure(
    tracer_provider=trace.get_tracer_provider(),
    capture_prompts=False,  # Don't log prompts (may contain PII)
    capture_responses=False
)
```

### Key Metrics to Track

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| `task_completion_rate` | % of tasks finishing without error | < 95% |
| `avg_tokens_per_task` | Token efficiency | > 3x baseline |
| `tool_error_rate` | % of tool calls failing | > 5% |
| `p95_latency_ms` | 95th percentile task duration | > 30s |
| `cost_per_task_usd` | Mean cost per agent run | > budget target |

---

## Failure Recovery

### Retry with Exponential Backoff

```python
agent = Agent(
    model="claude-sonnet-4-6",
    retry_config=RetryConfig(
        max_attempts=3,
        backoff_base=2.0,
        retryable_errors=[RateLimitError, ServiceUnavailableError],
        on_retry=lambda attempt, error: log.warning("Retrying", attempt=attempt)
    )
)
```

### Circuit Breaker

```python
from claude_agent_sdk import CircuitBreaker

breaker = CircuitBreaker(
    failure_threshold=5,      # Open after 5 consecutive failures
    recovery_timeout=60,      # Try again after 60s
    half_open_max_calls=2     # Allow 2 test calls in half-open state
)

async def safe_run(prompt: str):
    async with breaker:
        return await agent.run(prompt)
```

### Partial Result Recovery

```python
async def chunked_analysis(documents: list[str]) -> list[str]:
    results = []
    checkpoint_key = "analysis_checkpoint"

    # Resume from last checkpoint
    start_idx = await state_store.get(checkpoint_key, default=0)

    for i, doc in enumerate(documents[start_idx:], start=start_idx):
        try:
            result = await agent.run(f"Analyze: {doc}")
            results.append(result.text)
            await state_store.set(checkpoint_key, i + 1)
        except Exception as e:
            log.error("Analysis failed", index=i, error=str(e))
            results.append(f"[ERROR at index {i}: {e}]")

    return results
```

---

## Production Deployment Checklist

### Before Launch

- [ ] Pin model to specific version (`claude-sonnet-4-6`, not `claude-sonnet-latest`)
- [ ] Set `max_tokens_per_task` budget to prevent runaway costs
- [ ] Configure durable state store (Postgres/Redis) — not in-memory
- [ ] Enable structured logging with session IDs
- [ ] Implement per-user and per-tenant rate limiting
- [ ] Sandbox tool access (no unrestricted shell, file system, or network)
- [ ] Add circuit breaker for downstream services
- [ ] Set up cost alerting at 80% and 100% of budget

### Monitoring

- [ ] Track `task_completion_rate`, `cost_per_task`, `p95_latency`
- [ ] Alert on error rate spikes > 5%
- [ ] Export daily usage CSV for billing reconciliation
- [ ] Set up PagerDuty/Slack alerts for circuit breaker trips

### Security

- [ ] Never log full prompts or responses (may contain PII)
- [ ] Audit all tool invocations with user ID + timestamp
- [ ] Validate all tool inputs before execution
- [ ] Rotate `ANTHROPIC_API_KEY` on a 90-day schedule
- [ ] Store API keys in a secrets manager (Vault, AWS Secrets Manager)
