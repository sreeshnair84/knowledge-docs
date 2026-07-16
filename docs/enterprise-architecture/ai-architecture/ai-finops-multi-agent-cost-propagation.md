---
title: "Multi-Agent Cost Propagation — How Costs Accumulate Across Distributed AI Workflows"
date: 2026-07-14
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
covers_version: "as of July 2026"
doc_type: guide
source_type: native-md
source_file: ""
tags: ["ai-finops", "multi-agent", "cost-propagation", "agent-cost", "orchestration", "mcp", "a2a", "planner", "supervisor", "worker"]
---

# Multi-Agent Cost Propagation

> **Current as of July 2026.** Token costs are not linear in multi-agent systems. A single user request fans out through planners, supervisors, workers, MCP servers, remote agents, evaluators, and observability pipelines. Understanding cost propagation is prerequisite to controlling it.

**Related guides (read first):**
- [AI FinOps — Cost Management and Token Economics](./AI-FinOps-Cost-Management-Guide.md) — the five FinOps pillars
- [AI Tokenomics](../../ai-economics/ai-tokenomics-guide.md) — token mechanics and cost arithmetic

---

## The Cost Amplification Problem

A user sends one request. The agentic system sends dozens.

```
USER REQUEST (1 call, ~500 input tokens)
  │
  ▼  PLANNER  (~2,000 tokens: parse intent → decompose → generate task list)
  │
  ├──▶  SUPERVISOR  (~1,500 tokens: allocate tasks → coordinate workers)
  │         │
  │         ├──▶  WORKER A  (~3,000 tokens: retrieve context → reason → act)
  │         │        │──▶  MCP: document-store  (~200 tokens overhead)
  │         │        │──▶  MCP: code-executor   (~400 tokens overhead)
  │         │        └──▶  MCP: search          (~300 tokens overhead)
  │         │
  │         ├──▶  WORKER B  (~3,000 tokens: retrieve context → reason → act)
  │         │        └──▶  A2A: remote-agent    (~800 tokens: A2A envelope + response)
  │         │
  │         └──▶  WORKER C  (~2,500 tokens: synthesize outputs)
  │
  ├──▶  EVALUATOR / JUDGE  (~1,800 tokens: assess output quality)
  │
  ├──▶  GUARDRAILS  (~600 tokens: safety + policy check)
  │
  ├──▶  OBSERVABILITY  (telemetry tokens: spans, traces → storage)
  │
  └──▶  RESPONSE TO USER  (~800 output tokens)

TOTAL: ~17,900 tokens billed for one user request
vs. a naive single-model estimate: ~1,300 tokens
Cost amplification factor: ~13.8×
```

This amplification is structural — not a failure mode. Every orchestration layer is doing real work. The risk is that **no one has modelled it**, so budget estimates are off by an order of magnitude.

---

## The Cost Propagation Layers

### Layer 1 — Planning Overhead

The planner converts an ambiguous user goal into a concrete task list. Cost components:

| Component | Token Profile | Notes |
|---|---|---|
| Intent parsing | 200–500 input | Usually a short user request |
| Context injection | 1,000–5,000 input | System prompt + tools + history |
| Task decomposition | 500–2,000 output | More complex goals = more tokens |
| Re-planning on failure | Full cost × retry_count | Re-planning is an invisible cost multiplier |

**Measured overhead:** Planner cost is typically **8–20% of total workflow cost** in 3–5 step agentic workflows.

```python
# Cost model for a planning call
def planning_cost(
    user_request_tokens: int,
    system_prompt_tokens: int,
    tool_schema_tokens: int,
    history_tokens: int,
    plan_output_tokens: int,
    model_input_price: float,  # per 1K tokens
    model_output_price: float,
) -> float:
    input_tokens = (
        user_request_tokens
        + system_prompt_tokens
        + tool_schema_tokens
        + history_tokens
    )
    output_tokens = plan_output_tokens
    return (
        input_tokens / 1000 * model_input_price
        + output_tokens / 1000 * model_output_price
    )
```

### Layer 2 — Supervisor Overhead

The supervisor allocates tasks to workers, monitors progress, and handles re-routing on failure.

| Pattern | Cost Structure |
|---|---|
| **Static allocation** (predefined worker roles) | Low: 1 supervisor call per workflow |
| **Dynamic allocation** (supervisor reasons about worker selection) | Medium: 1–3 calls per worker spawn |
| **Reactive re-planning** (supervisor replans on worker failure) | High: unpredictable tail cost |
| **Consensus supervision** (multiple supervisors vote) | Very High: N × supervisor_cost |

**Design principle:** Supervisors that reason dynamically are more capable but more expensive. Use static allocation patterns for cost-critical workflows, dynamic only when task variance is high.

### Layer 3 — Worker Agent Costs

Worker costs accumulate from three sources:

```
Worker Total Cost = Context Cost + Reasoning Cost + Tool Execution Cost

Context Cost = (system_prompt + task_brief + history + retrieved_docs) × input_price
Reasoning Cost = output_tokens × output_price
Tool Execution Cost = Σ(MCP/API call overhead per tool)
```

**The context window tax:** Every worker carries its own copy of its system prompt, tool schemas, and any injected context. In a 5-worker workflow, if each worker has a 4,000-token system prompt, that's 20,000 tokens in system prompt costs alone — before any reasoning.

**Mitigation:** Use a shared context broker that serves context on demand (lazy loading), so workers only receive the context they actually need for their assigned task.

### Layer 4 — MCP Server Overhead

Each MCP tool call adds a cost layer that most token budgets miss:

| MCP Cost Component | Token Estimate | Notes |
|---|---|---|
| Tool schema injection (per registered tool) | 100–500 tokens | Injected as input tokens every call |
| Tool call format (function call XML/JSON) | 20–80 tokens | Claude XML tags add overhead |
| Tool result verbosity | 100–5,000 tokens | Unfiltered tool results can be enormous |
| Error message + retry | Full call cost × retries | Tool errors spawn additional LLM calls |

**Real-world example:** An agent with 8 registered MCP tools, each with a 300-token schema, pays ~2,400 tokens in schema overhead on every single LLM call — regardless of which tools it actually uses.

**Fix:** Lazy tool loading — inject only tools relevant to the current step. A planning step doesn't need code-execution tools; a code-generation step doesn't need compliance-check tools.

```python
def get_tools_for_step(step_type: str) -> list[dict]:
    """Return only tools relevant to this step — reduces schema overhead 60-80%."""
    TOOL_REGISTRY = {
        "research": ["search", "document_reader", "web_fetch"],
        "generate": ["code_writer", "template_engine"],
        "validate": ["linter", "test_runner", "compliance_check"],
        "communicate": ["email", "slack", "ticketing"],
    }
    return [TOOLS[name] for name in TOOL_REGISTRY.get(step_type, [])]
```

### Layer 5 — A2A Communication Overhead

Agent-to-Agent (A2A) calls add a distinct cost envelope:

```
A2A Call Cost = Outbound message + Remote agent processing + Response envelope

Outbound message:
  - Task description and context: 200–2,000 tokens
  - Agent Card authentication overhead: 50–200 tokens
  - Structured task envelope (JSON): 100–300 tokens

Remote agent processing:
  - Full inference cost at remote agent (billed to caller or remote)
  - Context duplication if the remote agent re-fetches context

Response envelope:
  - Structured result: 100–1,000 tokens
  - Provenance metadata (tracing): 20–100 tokens
```

**Cross-cloud amplification:** A2A calls to agents on different cloud providers may add network transit costs on top of inference costs. AWS Bedrock → Azure AI Studio A2A calls traverse internet egress on at least one side.

**Multi-hop amplification:** If Worker A calls Remote Agent B which calls Remote Agent C, costs multiply:

```
Total A2A cost = Hop_1_cost + (Hop_1 overhead × Hop_2_cost) + ...

With 3 hops, costs can be 3–5× the single-agent estimate if no
cost propagation tracking is in place.
```

### Layer 6 — Evaluation and Judge Models

Production agentic systems run evaluations in-line (not just offline):

| Evaluation Type | When | Cost Profile |
|---|---|---|
| Output quality judge | After each worker output | 1,000–3,000 tokens per eval call |
| Safety guardrail | Before/after tool execution | 200–500 tokens (specialized safety model) |
| Plan coherence check | After planning | 500–1,500 tokens |
| Final result validation | Before returning to user | 1,000–2,000 tokens |

**Critical insight:** Judge models must be at least as capable as the model being judged (frontier-tier judges grading frontier-tier outputs). This means evaluation costs can approach or exceed generation costs. A system that validates every worker output with a frontier judge may double its inference bill.

**Cost-efficient evaluation:**
- Use smaller judges for simple binary checks (pass/fail)
- Reserve frontier judges for high-stakes decisions
- Run evaluations asynchronously and in batch where latency allows (50% cost reduction)
- Cache evaluation results for deterministic outputs

### Layer 7 — Observability and Storage

The observability layer itself has a token-like cost structure:

| Component | Cost Driver | Monthly Estimate |
|---|---|---|
| OpenTelemetry span ingestion | Per-span pricing in managed OTEL backends | $50–500/M spans |
| Trace storage | Data retention × span volume | $0.02–0.10/GB/month |
| LLM call logging (prompts + responses) | Full content logging is expensive at scale | $100–1,000+/TB/month |
| Vector embedding of traces (for anomaly detection) | Embedding cost | $0.0001/1K tokens |
| Dashboard query compute | Per-query cost in managed analytics | Variable |

**Sampling strategy:** Full trace logging of every LLM call is financially viable only at small scale. At enterprise scale, implement tail-based sampling (log 100% of error cases, 1–5% of successful cases) combined with metric aggregation for cost metrics.

---

## Full Workflow Cost Model

### The Propagation Formula

```
Workflow Total Cost =
    Planning_cost
  + Σ(Supervisor_calls × Supervisor_call_cost)
  + Σ(Worker_i × Worker_i_cost)
  + Σ(MCP_calls × MCP_overhead_cost)
  + Σ(A2A_calls × A2A_envelope_cost)
  + Σ(Eval_calls × Eval_call_cost)
  + Guardrail_cost
  + Observability_cost
  + Storage_cost

Where Worker_i_cost = Context_i + Reasoning_i + Σ(Tool_results_i)
```

### Reference Example: 5-Step Research Workflow

A multi-agent research workflow (user asks for a competitive analysis report):

| Layer | Calls | Input Tokens | Output Tokens | Cost @ $3/1M in + $15/1M out |
|---|---|---|---|---|
| Planner | 1 | 4,200 | 800 | $0.025 |
| Supervisor | 3 | 2,500 | 400 | $0.013 |
| Worker: Web Research | 1 | 8,500 | 1,200 | $0.043 |
| Worker: Document Analysis | 1 | 12,000 | 1,500 | $0.058 |
| Worker: Synthesis | 1 | 6,000 | 3,000 | $0.063 |
| MCP: search (×8 calls) | 8 | 3,200 | 0 | $0.010 |
| MCP: doc-reader (×5 calls) | 5 | 2,000 | 0 | $0.006 |
| Evaluator | 2 | 5,500 | 600 | $0.026 |
| Guardrails | 2 | 1,200 | 200 | $0.007 |
| **Total** | **24** | **45,100** | **7,700** | **$0.251** |

Single-agent naive estimate for same task: ~$0.04 (user request → one LLM call → response)  
**Amplification factor: 6.3×**

---

## Hidden Costs

### 1. Re-Planning Tax

Every time a worker fails, the supervisor or planner re-plans. Re-planning cost = full planner + supervisor cost × retry_count.

In unreliable environments (flaky external APIs, ambiguous tasks), re-planning can account for **20–40% of total workflow cost**.

**Control:** Circuit breakers on workers with fixed retry budgets. After 2 failures, return partial results rather than re-plan.

### 2. Context Duplication

When workers are spawned independently, each re-fetches or re-receives context. If 5 workers each receive the same 5,000-token context block, that's 25,000 tokens of pure duplication.

**Control:** Context broker pattern — serve context from a shared cache; workers request only what they need.

### 3. Tool Schema Inflation

Registering all tools with all agents at all times. At 300 tokens/tool × 10 tools × 24 LLM calls in a workflow = 72,000 tokens of pure schema overhead.

**Control:** Lazy tool loading (see Layer 4 above).

### 4. Reasoning Token Inflation

Extended thinking / chain-of-thought is valuable but expensive. If every agent in a 5-worker chain uses extended thinking (Claude), thinking token costs compound:

```
5 workers × 5,000 thinking tokens × $0.015/1K = $0.375 in thinking alone
(on top of all other costs)
```

**Control:** Reserve extended thinking for the planner and evaluator; use standard reasoning for routine worker tasks.

### 5. Verbose Tool Results

MCP tools that return full API responses, unformatted database dumps, or entire documents into agent context are a major hidden cost. A tool that returns a 10,000-token JSON object when only 200 tokens were needed wastes 9,800 tokens.

**Control:** MCP middleware layer that truncates tool results to essential content before injection into the agent context. Target: < 1,000 tokens per tool result for routine calls.

---

## Cost Propagation Governance

### Budget Envelope Architecture

Every cost-generating component should have its own budget envelope, enforced at the gateway layer:

```
Enterprise AI Budget
├── Workflow Budget (per workflow type)
│   ├── Planning Budget (max tokens for planning phase)
│   ├── Worker Budget Pool (distributed across workers)
│   │   ├── Worker A Budget (hard cap per session)
│   │   ├── Worker B Budget
│   │   └── Worker C Budget
│   ├── MCP Budget (per tool call limit)
│   ├── A2A Budget (per external agent call)
│   └── Evaluation Budget (per eval call)
└── Emergency Reserve (for critical retries)
```

### Cost Propagation Tags

Every API call in the workflow must carry cost propagation metadata:

```python
# Metadata attached to every LLM call in the workflow
cost_tags = {
    "workflow_id": "wf-comp-analysis-7823",
    "workflow_type": "competitive_analysis",
    "layer": "worker",           # planner | supervisor | worker | evaluator | guardrail
    "agent_id": "worker-research-a",
    "parent_agent": "supervisor-main",
    "step": "web_research",
    "call_sequence": 7,           # which call in this workflow
    "budget_envelope": "wf-7823-worker-a",
    "tenant_id": "tenant-corp-xyz",
    "team": "strategy",
    "project": "q3-competitive",
    "initiated_by": "user-j.smith@corp.com",
}
```

This enables post-workflow cost attribution to every layer of the propagation chain.

### Early Stopping

When cumulative workflow cost exceeds a threshold, implement early stopping rather than completing the workflow:

```python
class WorkflowCostController:
    def __init__(self, budget_usd: float):
        self.budget = budget_usd
        self.spent = 0.0

    def record_cost(self, cost: float, layer: str) -> None:
        self.spent += cost
        if self.spent > self.budget * 0.8:
            logger.warning(f"Workflow at 80% budget. Spent: ${self.spent:.4f}")
        if self.spent > self.budget:
            raise WorkflowBudgetExceeded(
                f"Workflow exceeded budget of ${self.budget:.2f}. "
                f"Spent: ${self.spent:.4f} at layer={layer}. "
                "Returning partial results."
            )
```

### Workflow Cost Anomaly Detection

Instrument every workflow to emit cost metrics, then detect anomalies:

```python
# OpenTelemetry metrics for cost anomaly detection
from opentelemetry import metrics

meter = metrics.get_meter("ai.workflow.cost")

workflow_cost_histogram = meter.create_histogram(
    "ai.workflow.total_cost_usd",
    description="Total cost in USD per workflow execution",
    unit="USD",
)

cost_amplification_gauge = meter.create_observable_gauge(
    "ai.workflow.amplification_factor",
    description="Ratio of actual to single-LLM-call estimated cost",
)
```

Alert thresholds (directional):
- **Warning:** actual cost > 3× estimated cost for workflow type
- **Critical:** actual cost > 10× estimated cost, or cost growth rate > 50%/minute (runaway agent)
- **Emergency shutdown:** actual cost > workflow hard budget ceiling

---

## Optimization Levers by Layer

| Layer | Primary Lever | Expected Savings |
|---|---|---|
| Planner | Cache planning outputs for similar requests | 40–60% of planning cost |
| Supervisor | Static vs dynamic allocation based on task type | 30–50% of supervisor cost |
| Workers | Lazy context loading; context broker | 40–70% of context cost |
| MCP | Lazy tool loading; result truncation middleware | 50–80% of tool schema overhead |
| A2A | Prefer local agents; cache A2A responses | 30–60% of A2A cost |
| Evaluator | Async + batch evaluation; smaller judges for binary checks | 40–60% of eval cost |
| Observability | Tail-based sampling; metric aggregation | 70–90% of observability cost |

---

## See Also

| Guide | What it covers |
|---|---|
| [AI FinOps — Cost Management](./AI-FinOps-Cost-Management-Guide.md) | Five FinOps pillars, visibility, allocation, caching |
| [AI FinOps — Budget Governance](ai-finops-budget-governance.md) | Per-agent/tenant budgets, approval workflows, circuit breakers |
| [AI FinOps — Chargeback & Attribution](ai-finops-chargeback-attribution.md) | Tagging taxonomy, showback/chargeback models |
| [AI FinOps — RAG, MCP & A2A Economics](ai-finops-rag-mcp-a2a-economics.md) | Cost optimization for retrieval and interop layers |
| [AI Tokenomics](../../ai-economics/ai-tokenomics-guide.md) | Token mechanics and cost arithmetic foundations |
| [Token Management & AI Cost Architecture](../../ai-economics/AI_Cost_Implementation_Guide_2026.md) | Routing, caching, gateway implementation |
