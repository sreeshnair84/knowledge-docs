# Ruflo & Multi-Agent Orchestration Frameworks
## The Complete End-to-End Guide: Architecture, Evals, Governance, and Big Wins

> **What is Ruflo?** Ruflo (formerly Claude Flow) is an open-source multi-agent orchestration platform built on top of Claude Code and OpenAI Codex. It transforms a single-agent session into a coordinated swarm of ~100 specialized AI agents, connected by shared memory, intelligent routing, and self-learning workflows. As of 2026 it has crossed 56,000+ GitHub stars.

---

## Table of Contents

1. [The Landscape: Frameworks at a Glance](#1-the-landscape)
2. [Ruflo Deep-Dive: Core Architecture](#2-ruflo-deep-dive)
3. [SPARC Methodology](#3-sparc-methodology)
4. [Best Practices](#4-best-practices)
5. [Anti-Patterns](#5-anti-patterns)
6. [Big Wins](#6-big-wins)
7. [Evaluation (Evals) Framework](#7-evaluation-evals-framework)
8. [Governance Framework](#8-governance-framework)
9. [How to Build One End-to-End](#9-how-to-build-one-end-to-end)
10. [Tooling Ecosystem](#10-tooling-ecosystem)
11. [Quick Reference Cheatsheet](#11-quick-reference-cheatsheet)

---

## 1. The Landscape

### 1.1 Why Multi-Agent Orchestration?

A single LLM agent is bounded by three hard constraints: a limited context window, sequential reasoning, and no ability to parallelize. Complex real-world tasks — large codebase refactors, multi-phase research pipelines, enterprise workflow automation — overwhelm any single agent.

Multi-agent orchestration breaks work into parallel workstreams, each handled by a specialized agent. The framework coordinates handoffs, manages shared state, and synthesizes results. By March 2026, **57% of organizations** have AI agents running in production (up from 51% in 2025).

### 1.2 Framework Comparison Matrix

| Framework | Orchestration Model | State Persistence | Model Support | Learning Curve | Best For |
|---|---|---|---|---|---|
| **Ruflo** | Swarm / Hive-Mind (Queen + Workers) | AgentDB: vector + knowledge graph | Claude, GPT, Gemini, Local | Medium | Complex coding, multi-phase development |
| **LangGraph** | Directed graph (nodes + edges) | Built-in checkpointing, time-travel | Model-agnostic | Steep | Production stateful workflows, human-in-loop |
| **CrewAI** | Role-based "crew" / teams | Task outputs passed sequentially | Model-agnostic | Lowest | Business process automation, rapid prototyping |
| **AutoGen / AG2** | Conversational GroupChat | Conversation history (in-memory) | Model-agnostic | Medium | Research, quality-sensitive offline workflows |
| **Google ADK** | Hierarchical agent tree | Session state, pluggable backends | Gemini-optimized | Medium | Google Cloud / Vertex AI integration |
| **OpenAI Agents SDK** | Explicit handoffs | Context variables (ephemeral) | OpenAI only | Low | OpenAI-native deployments |
| **OpenAgents** | Network / peer-based | Persistent agent networks | Multi-framework | Medium | Open interoperability (MCP + A2A protocols) |

**Key differentiators:**
- LangGraph → most control and production maturity
- CrewAI → fastest time-to-value (~35 lines for a minimal agent)
- AutoGen → best for iterative dialogue and debate-style reasoning (but expensive: 4 agents × 5 rounds = 20 LLM calls minimum)
- Ruflo → uniquely positioned for AI-native software development with persistent self-learning memory

---

## 2. Ruflo Deep-Dive

### 2.1 History

Ruflo started as **Claude Flow**, an experimental project by rUv focused on agentic workflows for Claude. It was later rewritten in Rust as Ruflo, adding persistent memory, MCP bridging, and federation support. The `claude-flow` npm package is a legacy alias; both resolve to the same unified codebase.

### 2.2 Core Architecture

```
┌─────────────────────────────────────────────────────┐
│                   QUEEN AGENT                       │
│  (Goal decomposition · Task routing · Synthesis)    │
└──────────────────┬──────────────────────────────────┘
                   │ Hierarchical Delegation
       ┌───────────┼───────────┐
       ▼           ▼           ▼
  [Worker]    [Worker]    [Worker]   ← Specialized agents
  Coder       Tester      Reviewer     (60+ built-in types)
       │           │           │
       └───────────┼───────────┘
                   ▼
        ┌──────────────────────┐
        │      AgentDB v3      │
        │  Vector (HNSW index) │
        │  Knowledge Graph     │
        │  Pattern Memory      │
        │  Shared State        │
        └──────────────────────┘
```

**The 5 pillars of Ruflo architecture:**

1. **Multi-Agent Orchestration at Scale** — Deploy and coordinate ~100 specialized AI agents working in parallel. A Queen agent decomposes goals, assigns workstreams to Workers, and synthesizes results.

2. **Swarm-Based Collaboration** — Agents operate in structured "swarms" with hierarchical coordination, consensus mechanisms, and shared objectives. Topology options: `mesh`, `hierarchical`, `ring`, `star`.

3. **Self-Learning and Adaptive Routing** — Learns from past executions via reinforcement learning (9 algorithms including Decision Transformer, Q-Learning, Actor-Critic). Dynamically routes tasks to the most effective agents using pattern recognition. Execution results are stored and used for future optimization.

4. **Persistent Memory and Knowledge Graphs** — AgentDB v3 combines vector search (HNSW, 150x–12,500x faster retrieval), shared memory, and knowledge graphs to retain context across sessions. New controllers: `HierarchicalMemory`, `MemoryConsolidation`, `SemanticRouter`, `MutationGuard` (cryptographic proof-verified writes), `AttestationLog`.

5. **Intelligent Cost and Performance Optimization** — Multi-tier routing (WASM + LLMs) reduces latency and cuts API costs by up to ~75%. Supports failover across Claude, GPT, Gemini, and local models.

### 2.3 Installation Paths

**Path A — Lightweight (workflow structuring only, no MCP server):**
```bash
npx ruflo@latest init --sparc
# Adds slash commands and agent definitions
# Memory/swarm tools NOT callable from Claude
```
Use when: Teams want SPARC workflow structure without full MCP infrastructure.

**Path B — Full (MCP server + hooks + memory + swarm):**
```bash
npx ruflo@latest init --sparc --mcp
# Registers the Ruflo MCP server
# Enables memory_store, swarm_init, agent_spawn, etc.
```
Use when: You want the full loop with persistent memory and swarm coordination in the background.

### 2.4 Key CLI Commands

```bash
# Memory
npx ruflo memory store --key "auth-pattern" --value "JWT with refresh tokens" --namespace patterns
npx ruflo memory search --query "authentication best practices" --limit 5

# Agent management
claude-flow agent use coder "implement user authentication"
claude-flow agent list
claude-flow agent metrics <agent-id> --period 1h

# Swarm
claude-flow swarm "build REST API" --agents coder,tester,reviewer
claude-flow hive-mind spawn "build microservices" --topology hierarchical
claude-flow swarm "optimize performance" --coordinator adaptive-coordinator

# Benchmarking
swarm-bench run "Build REST API" --strategy development --max-agents 6
swarm-bench hive-mind "Design architecture" --max-workers 8

# Migration from Claude Flow
npx claude-flow migrate
```

---

## 3. SPARC Methodology

SPARC is Ruflo's structured test-driven development methodology. It transforms ad-hoc agentic coding into a disciplined, phase-gated pipeline. The acronym stands for:

```
S — Specification     Define clear, testable requirements before any implementation
P — Pseudocode        Capture algorithm logic in language-agnostic pseudocode
A — Architecture      Design system structure, interfaces, and data flows
R — Refinement        Iterative improvement through testing and code review
C — Completion        Final integration, full test coverage, and delivery
```

**Why SPARC matters:** Without a methodology, agents "go off the rails" — they start coding before requirements are clear, skip architecture decisions, and produce untestable outputs. SPARC enforces structure: define the specification before writing code, validate pseudocode before implementation, confirm architecture before building, refine through testing, complete with full coverage.

**Running SPARC:**
```bash
# Full SPARC TDD workflow
claude-flow sparc tdd "implement payment system" \
  --agents specification,pseudocode,architecture,refinement

# Individual SPARC stages
claude-flow sparc run dev "build OAuth integration"

# Deploy a SPARC-specialized swarm
npx claude-flow swarm init sparc-team \
  --agents "specification,pseudocode,architecture,sparc-coder,tester" \
  --topology hierarchical

# Automate the full SPARC pipeline
npx claude-flow workflow create \
  --name "sparc-pipeline" \
  --template "sparc-tdd" \
  --auto-advance \
  --memory-persist
```

Each stage feeds into the next. The Queen agent coordinates handoffs between stage-specialized workers. Results from each stage are stored in AgentDB and retrieved by the next agent, maintaining full context continuity across the pipeline.

---

## 4. Best Practices

### 4.1 Architecture

- **Decompose tasks before spawning agents.** Define the work breakdown structure at the Queen level before spinning up workers. Agents with unclear scope waste tokens and produce inconsistent results.
- **Use hierarchical topology for complex tasks, mesh for collaborative tasks.** Hierarchical gives the Queen clear authority; mesh enables peer-to-peer consensus for creative or research workstreams.
- **Design agents with single responsibilities.** A "coder + tester + reviewer" monolith agent is harder to route, harder to evaluate, and harder to replace than three separate specialized agents.
- **Store patterns, not just outputs.** Use `memory store` to capture reusable patterns (authentication flows, error handling strategies). AgentDB's HNSW index makes these retrievable at 150x the speed of naive vector lookup.
- **Use SPARC for all feature work.** It prevents scope creep, ensures testability, and creates a natural audit trail for governance.

### 4.2 Memory and Context

- **Namespace your memory keys.** Use prefixes like `patterns:`, `decisions:`, `context:` to prevent key collisions across agents and sessions.
- **Consolidate memory regularly.** Use `MemoryConsolidation` to compact and de-duplicate stored knowledge after long sessions. Unchecked memory growth degrades retrieval quality.
- **Use semantic search over exact key lookup.** The SemanticRouter selects agents and retrieves knowledge based on meaning, not string matching. Leverage this for dynamic task routing.
- **Set memory TTLs for ephemeral state.** Not all state should persist across sessions. Route ephemeral working state to in-session storage; persist only generalized patterns.

### 4.3 Evaluation

- **Define acceptance criteria before the first eval run.** Collaborate with governance stakeholders on metric thresholds (factual accuracy, faithfulness, task success rate) before deployment, not after.
- **Start small.** Build an evaluation dataset of 50–100 samples. Run it manually a few times to calibrate expectations before automating.
- **Evaluate trajectories, not just final outputs.** For agents, the path matters: did it choose the right tools? Recover gracefully from errors? Complete objectives efficiently? A correct final answer via a broken path is still a broken agent.
- **Use LLM-as-a-judge for quality dimensions at scale.** Human review of every response doesn't scale. Use model judges for safety, correctness, relevance, and groundedness — and flag edge cases for human review.
- **Integrate evals into CI/CD.** Every model version change, prompt change, or tool change should trigger a regression eval run. Track metrics over time; regressions are invisible without baselines.

### 4.4 Governance

- **Build observability from day one, not as an afterthought.** Treat traces, evaluations, and governance guardrails as foundational architectural requirements. Retrofitting observability to a production agent system is expensive and incomplete.
- **Use OpenTelemetry (OTel) for vendor-neutral tracing.** OTel is now table stakes. Emit traces once and choose any compatible backend without re-instrumenting.
- **Define policies centrally, enforce them locally.** Avoid ad hoc guardrails that don't roll up to centralized standards. A unified AI control plane ensures consistency across agent frameworks, cloud providers, and platforms.
- **Implement human-in-the-loop gates at high-risk action boundaries.** Not every agent action needs human approval — that defeats the purpose of automation. But irreversible, high-impact actions (production deploys, financial transactions, data deletions) should require human sign-off.
- **Create audit trails for every eval run.** Record which model version was evaluated, which dataset was used, what scores were achieved, and whether thresholds were met. These records accumulate into the compliance evidence that governance teams need.

---

## 5. Anti-Patterns

### 5.1 Agent Design Anti-Patterns

| Anti-Pattern | Description | Fix |
|---|---|---|
| **The Monolith Agent** | One agent tries to do everything: plan, code, test, review, deploy | Split into specialized agents with single responsibilities |
| **Agent Sprawl** | Spawning 50 agents for a task that needs 5 | Right-size your swarm; start small and scale up based on benchmark data |
| **Context Window Stuffing** | Passing the entire codebase into every agent's context | Use AgentDB semantic search to retrieve only relevant context chunks |
| **Stateless Design** | No persistent memory between sessions; agents re-learn the same patterns repeatedly | Use AgentDB with pattern storage and namespace your keys |
| **Tool Overloading** | Giving every agent access to every tool | Follow principle of least privilege — each agent gets only the tools it needs |
| **Skipping SPARC** | Jumping straight to code without specification or architecture phases | Enforce SPARC methodology for all non-trivial features |

### 5.2 Orchestration Anti-Patterns

| Anti-Pattern | Description | Fix |
|---|---|---|
| **Infinite Loops** | Agents stuck in retry loops without circuit breakers | Set max retry limits; implement circuit breakers at the orchestrator level |
| **Cascade Failure** | One failed agent blocks the entire swarm | Design for partial success; isolate failures, allow swarm to continue with degraded capability |
| **Gossip Storms** | In mesh topology, agents broadcast updates to all peers on every state change | Use event-driven updates with delta-only broadcasts and debounce intervals |
| **Token Burn** | Running multi-agent debates on simple tasks; 4-agent × 5-round = 20 LLM calls for a question that needs 1 | Match orchestration complexity to task complexity; single agent for simple tasks |
| **Provider Lock-in** | Tightly coupling agent logic to one LLM provider | Use model-agnostic abstractions; configure failover across providers |

### 5.3 Evaluation Anti-Patterns

| Anti-Pattern | Description | Fix |
|---|---|---|
| **Launch-Day Evals Only** | Running evals once before deployment, never again | Embed evals into CI/CD; treat evaluation as an ongoing process |
| **Output-Only Evaluation** | Judging only the final answer, ignoring the trajectory | Evaluate the full execution graph: tool choices, error recovery, efficiency |
| **Static Eval Datasets** | Using the same 50 examples forever | Continuously feed production interactions back into eval datasets |
| **Missing Baselines** | No historical metric tracking; regressions are invisible | Store all eval results with timestamps, model versions, and dataset versions |
| **The Eval Theater** | Running evals to satisfy governance, not to improve the system | Define acceptance thresholds with governance teams upfront; block deployment on failures |

### 5.4 Governance Anti-Patterns

| Anti-Pattern | Description | Fix |
|---|---|---|
| **The Static Guardrail Problem** | Certify a system once as "responsible," assume behavior stays aligned | Implement continuous runtime monitoring; agents evolve with model updates |
| **Fragmented Guardrails** | Ad hoc safety rules scattered across teams with no central standard | Unified policy framework via a single AI control plane |
| **Observability as an Afterthought** | Add logging and tracing after a production incident | Build OTel-first tracing into agent architecture from day one |
| **No Human Escalation Path** | Fully autonomous agents with no mechanism to involve humans | Define escalation thresholds that trigger human review for high-risk decisions |
| **Audit Trail Gaps** | Agents take actions with no record of why | Every tool invocation, decision branch, and state transition should be traceable |

---

## 6. Big Wins

These are the highest-ROI outcomes teams achieve by implementing Ruflo and well-architected multi-agent systems.

### 6.1 Engineering Velocity

**Large codebase refactoring at scale.** Ruflo's parallel agent architecture makes it practical to refactor a 200,000-line codebase in a single coordinated session. The Queen agent decomposes the refactor into file-level workstreams, assigns worker agents to each, and synthesizes results into a coherent diff that maintains consistency across the entire change set. What takes a human team weeks takes hours.

**Parallel feature development.** Multiple features can be developed simultaneously by different agent teams, with a shared memory layer preventing conflicts. Agent-enforced SPARC means every feature arrives with a spec, pseudocode, architecture decision record, and test coverage.

### 6.2 Cost Reduction

**API cost reduction of up to ~75%.** Ruflo's multi-tier routing (WASM + LLMs) uses lightweight local models for routing decisions and simple tasks, reserving expensive LLM calls for work that actually requires them. Intelligent caching via AgentDB prevents re-generating knowledge that already exists in the pattern store.

**Avoiding platform premiums.** Organizations using dedicated agent frameworks (vs. managed AI platforms) report 55% lower per-agent costs. Open-source frameworks give you the primitives; you control the infrastructure.

### 6.3 Quality and Reliability

**SPARC-enforced quality gates.** Every feature that goes through the full SPARC pipeline arrives with a specification, architecture decision, and passing tests. This dramatically reduces production defects compared to ad-hoc agentic coding.

**Self-learning improvement.** The 9 reinforcement learning algorithms in AgentDB mean the swarm gets better at routing, agent selection, and task decomposition over time. Success patterns are stored and used to initialize future runs.

**Fault-tolerant consensus.** Swarm-based coordination with consensus mechanisms means individual agent failures don't collapse the whole task. The swarm continues with degraded capacity and the Queen reassigns failed workstreams.

### 6.4 Governance and Compliance

**Systematic audit trails.** Every swarm run creates a record: agents involved, decisions made, tools invoked, outputs produced. This audit trail is the evidence that compliance and risk teams need — and it's generated automatically, not manually.

**MutationGuard with cryptographic proof.** AgentDB v3's `MutationGuard` provides cryptographically verified writes — every state mutation has an immutable attestation log. This is critical for regulated industries where data integrity must be provable.

---

## 7. Evaluation (Evals) Framework

### 7.1 Eval Taxonomy

Well-designed agent evals operate across three layers:

```
Layer 1: Output Quality
  ├── Factual Accuracy        — Are stated facts correct?
  ├── Faithfulness            — Is the output grounded in context (no hallucination)?
  ├── Relevance               — Does the output address the task?
  └── Safety                 — No harmful, toxic, or policy-violating content

Layer 2: Trajectory Quality
  ├── Tool Selection          — Did the agent pick the right tools?
  ├── Tool Arguments          — Were tools called with correct parameters?
  ├── Error Recovery          — Did the agent recover gracefully from failures?
  ├── Efficiency              — Was the goal achieved with minimal unnecessary steps?
  └── Routing Accuracy        — Did the orchestrator send tasks to the right agents?

Layer 3: Business Alignment
  ├── Task Success Rate       — Did the agent achieve the assigned goal?
  ├── Latency                 — Does it meet SLA requirements?
  ├── Cost per Task           — Is the token spend within acceptable bounds?
  └── Human Override Rate     — How often do humans need to correct or reject outputs?
```

### 7.2 Eval Types

**Offline Evaluation (pre-deployment)**
- Fixed dataset of representative test cases (start with 50–100, grow over time)
- Run against every model version change, prompt change, tool change
- Block deployment if acceptance thresholds are not met
- Tools: DeepEval, Inspect.AI, OpenAI Evals, PromptFoo, MLflow Evaluation

**Online Evaluation (production monitoring)**
- Lightweight continuous monitoring on sampled production traffic
- LLM-as-a-judge for quality dimensions at scale
- Route flagged outputs to human reviewers for ground truth labeling
- Feed labeled production data back into offline eval datasets
- Tools: Arize AI, LangSmith, Confident AI, Maxim

**Red-Teaming and Adversarial Evals**
- Prompt injection attacks (especially critical for tool-use agents)
- Goal drift and policy violation detection
- Multi-agent collusion scenarios
- Boundary and edge-case stress testing
- Tools: AGENTSAFE scenario banks, Conscium virtual simulations

### 7.3 LLM-as-a-Judge Implementation

```python
# Example: LLM judge for factual accuracy
judge_prompt = """
You are an expert evaluator. Given a task, a reference answer, and an agent's response,
rate the factual accuracy of the agent's response on a scale of 0-10.

Task: {task}
Reference Answer: {reference}
Agent Response: {response}

Respond ONLY with a JSON object:
{
  "score": <0-10>,
  "reasoning": "<brief explanation>",
  "pass": <true if score >= 7>
}
"""

# Evaluate at scale without human review of every response
# Route low-confidence cases (e.g., score 5-7) to human review queue
```

### 7.4 Eval Metrics Thresholds (Starter Template)

| Metric | Minimum Acceptable | Target | Block Deployment Below |
|---|---|---|---|
| Factual Accuracy | 0.80 | 0.90 | 0.75 |
| Faithfulness (RAG) | 0.85 | 0.95 | 0.80 |
| Task Success Rate | 0.75 | 0.90 | 0.70 |
| Routing Accuracy | 0.85 | 0.95 | 0.80 |
| Safety (no violations) | 1.00 | 1.00 | 0.99 |
| Latency P95 (seconds) | < 30 | < 15 | > 60 |

*Thresholds must be defined collaboratively with governance stakeholders before the first eval run.*

### 7.5 CI/CD Integration

```yaml
# .github/workflows/agent-eval.yml
name: Agent Evaluation Gate

on:
  pull_request:
    paths:
      - 'agents/**'
      - 'prompts/**'
      - 'tools/**'

jobs:
  evaluate:
    runs-on: ubuntu-latest
    steps:
      - name: Run offline eval suite
        run: |
          npx ruflo eval run \
            --dataset evals/baseline-100.jsonl \
            --model claude-sonnet-4-20250514 \
            --thresholds evals/thresholds.json \
            --output evals/results/$(date +%Y%m%d-%H%M%S).json

      - name: Check thresholds
        run: npx ruflo eval check --results evals/results/*.json --fail-on-regression
```

---

## 8. Governance Framework

### 8.1 The AGENTSAFE Model

A practical governance framework for agentic systems covers three layers:

**Design-time controls:**
- Define agent roles, tool access, and data permissions explicitly
- Apply principle of least privilege — each agent has only the access it needs
- Document all tool interfaces and their potential side effects
- Require SPARC methodology for feature development (built-in design audit trail)

**Runtime controls:**
- Semantic telemetry on every agent action (OTel-first)
- Dynamic authorization — re-verify permissions before high-impact actions
- Anomaly detection — alert when agent behavior deviates from expected patterns
- Interruptibility — human override must be possible at any point in the agentic loop
- `AttestationLog` for cryptographically immutable audit records (AgentDB v3)

**Audit controls:**
- Pre-deployment scenario bank: security, privacy, fairness, systemic safety
- Post-deployment continuous eval with production data feedback loop
- Regular red-team exercises for prompt injection and policy violation scenarios
- Formal bias audits on a scheduled basis

### 8.2 Human-in-the-Loop Spectrum

```
FULL AUTOMATION          SUPERVISED          HUMAN-IN-LOOP       HUMAN-ON-LOOP
─────────────────────────────────────────────────────────────────────────────────
Agent acts freely.   Human reviews      Human approves       Human monitors;
No human checks.     outputs, can        before each          intervenes only
                      correct before      high-impact action.  in emergencies.
                      delivery.
↓                    ↓                  ↓                    ↓
Highest Risk         Good for           Required for         Best for high-
Lowest Overhead      content tasks      irreversible         frequency, low-
                                        actions              risk tasks
```

**Practical guidance:** Define which action categories require which level of oversight. Map this to your risk taxonomy before deployment.

### 8.3 Observability Stack

```
Agent Execution
     │
     ▼ (OTel traces)
Telemetry Pipeline
     │
     ├── Tool invocations
     ├── Decision branches
     ├── State mutations
     └── Error events
     │
     ▼
Observability Backend (Arize, LangSmith, Datadog)
     │
     ├── Real-time dashboards
     ├── Anomaly alerts
     ├── Eval scoring
     └── Audit log export
     │
     ▼
Governance Control Plane
     │
     ├── Policy enforcement
     ├── Human review queue
     ├── Compliance reporting
     └── Risk escalation
```

### 8.4 Policy-as-Code

Translate governance policies into executable rules using structured DSLs or code. Rather than relying on manual prompt authoring to enforce policies, generate executable checks from policy prose. This closes the gap between a written policy and actual system behavior.

```python
# Example: Policy rule — no PII in agent outputs to external tools
@policy_rule(id="pii-001", severity="HIGH")
def no_pii_in_external_calls(tool_call: ToolCall) -> PolicyResult:
    """Prevent PII from being sent to external tools."""
    if tool_call.destination == "external" and contains_pii(tool_call.arguments):
        return PolicyResult.BLOCK(
            reason="PII detected in external tool call",
            escalate_to_human=True
        )
    return PolicyResult.ALLOW

# Rules are automatically enforced at the language-to-action boundary
# Violations are logged to AttestationLog with full trace context
```

---

## 9. How to Build One End-to-End

This section walks through building a production-ready Ruflo-based multi-agent system with evals and governance from scratch.

### Step 1: Define the Problem Scope

Before touching any code:
- What is the primary task the system must accomplish?
- What are the sub-tasks that can be parallelized?
- Which sub-tasks require specialized knowledge or tools?
- What are the failure modes and their business impact?
- What governance requirements apply (compliance, PII, audit trail)?

**Output:** A written problem scope document. This becomes input to the Specification phase of SPARC.

### Step 2: Design the Agent Topology

```
Decision tree:
  Is the task sequential or parallelizable?
    → Sequential: consider a single well-prompted agent + LangGraph
    → Parallelizable: multi-agent swarm is justified

  How many distinct specializations are needed?
    → 1-3: simple pipeline with LangGraph or CrewAI
    → 4-10: CrewAI crew or Ruflo with defined agent roles
    → 10+: Ruflo hive-mind with Queen + Workers

  Does the task require learning from past executions?
    → Yes: Ruflo with AgentDB persistent memory
    → No: stateless CrewAI or AutoGen may suffice
```

**For most engineering automation tasks: Ruflo with hierarchical topology.**

### Step 3: Initialize Ruflo

```bash
# Install
npm install -g ruflo@latest

# Full initialization (recommended)
npx ruflo@latest init --sparc --mcp

# Verify MCP server registration
npx ruflo status

# Configure your LLM providers
npx ruflo config set --provider anthropic --api-key $ANTHROPIC_API_KEY
npx ruflo config set --provider openai --api-key $OPENAI_API_KEY  # optional failover
```

### Step 4: Define Your Agents

```yaml
# agents/config.yaml
agents:
  - name: queen
    role: orchestrator
    tools: [task_decomposition, agent_spawn, memory_store, synthesis]
    model: claude-sonnet-4-20250514

  - name: spec-agent
    role: specification
    tools: [memory_store, memory_search, web_search]
    model: claude-sonnet-4-20250514

  - name: coder
    role: implementation
    tools: [code_write, code_read, memory_search, bash_execute]
    model: claude-sonnet-4-20250514

  - name: tester
    role: quality_assurance
    tools: [code_read, test_run, memory_store]
    model: claude-sonnet-4-20250514

  - name: reviewer
    role: code_review
    tools: [code_read, memory_search, annotation]
    model: claude-sonnet-4-20250514

  - name: security-agent
    role: security_audit
    tools: [code_read, vuln_scan, memory_search]
    model: claude-sonnet-4-20250514
```

### Step 5: Build the SPARC Pipeline

```bash
# Initialize the SPARC swarm
npx claude-flow swarm init sparc-team \
  --agents "specification,pseudocode,architecture,sparc-coder,tester" \
  --topology hierarchical

# Create an automated pipeline
npx claude-flow workflow create \
  --name "feature-pipeline" \
  --template "sparc-tdd" \
  --auto-advance \
  --memory-persist

# Run a feature through the full SPARC pipeline
claude-flow sparc tdd "implement JWT authentication with refresh tokens" \
  --agents specification,pseudocode,architecture,refinement
```

### Step 6: Set Up Persistent Memory

```bash
# Store foundational patterns before running complex tasks
npx ruflo memory store \
  --key "patterns:auth" \
  --value "JWT with refresh tokens, bcrypt for password hashing, RBAC for authorization" \
  --namespace patterns

npx ruflo memory store \
  --key "patterns:error-handling" \
  --value "Structured error types, retry with exponential backoff, circuit breaker pattern" \
  --namespace patterns

npx ruflo memory store \
  --key "decisions:api-style" \
  --value "RESTful with OpenAPI 3.1 spec, versioned endpoints, pagination with cursors" \
  --namespace decisions
```

### Step 7: Implement the Eval Suite

```bash
# Create eval dataset directory
mkdir -p evals/datasets evals/results

# Define your eval cases (evals/datasets/baseline.jsonl)
# Each line: {"task": "...", "expected": "...", "context": "..."}

# Run offline evals
npx ruflo eval run \
  --dataset evals/datasets/baseline.jsonl \
  --agents all \
  --output evals/results/$(date +%Y%m%d).json

# Check results against thresholds
npx ruflo eval check \
  --results evals/results/latest.json \
  --thresholds evals/thresholds.json
```

### Step 8: Configure Governance and Observability

```bash
# Set up OTel tracing
export OTEL_EXPORTER_OTLP_ENDPOINT="https://your-observability-backend"
export OTEL_SERVICE_NAME="ruflo-agent-swarm"

# Configure policy rules
npx ruflo policy add --rule "no-pii-external" --severity HIGH
npx ruflo policy add --rule "human-approval-required" --actions "deploy,delete" --severity CRITICAL

# Enable attestation logging
npx ruflo config set --attestation-log enabled
npx ruflo config set --audit-trail enabled

# Set human-in-loop gates
npx ruflo hitl configure \
  --require-approval-for "production_deploy,database_write,external_api" \
  --escalation-email "team@yourcompany.com"
```

### Step 9: Integrate with CI/CD

```yaml
# .github/workflows/ruflo-pipeline.yml
name: Ruflo Agent Pipeline

on: [push, pull_request]

jobs:
  sparc-eval:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Ruflo
        run: npm install -g ruflo@latest

      - name: Run eval suite
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          npx ruflo eval run \
            --dataset evals/datasets/baseline.jsonl \
            --thresholds evals/thresholds.json \
            --fail-on-regression \
            --output evals/results/ci-$(date +%Y%m%d-%H%M%S).json

      - name: Upload eval results
        uses: actions/upload-artifact@v4
        with:
          name: eval-results
          path: evals/results/
```

### Step 10: Monitor in Production

```bash
# Real-time performance report
claude-flow performance report --components agents --format detailed

# Benchmark your swarm on representative tasks
swarm-bench run "Build REST API" --strategy development --max-agents 6

# Monitor memory health
npx ruflo memory stats --namespace patterns

# Review attestation log (governance audit)
npx ruflo attestation log --since "2026-01-01" --export compliance-report.json
```

---

## 10. Tooling Ecosystem

### Evaluation Tools

| Tool | Best For |
|---|---|
| **DeepEval** | Comprehensive LLM eval with 14+ built-in metrics |
| **Inspect.AI** | System-level agent evaluation (UK AI Safety Institute) |
| **MLflow Evaluation** | Trajectory-based scoring, built-in judges, CI/CD integration |
| **LangSmith** | LangGraph observability, eval, and debugging |
| **Arize AI** | Production monitoring, continuous eval, anomaly detection |
| **Confident AI** | Eval-first platform: test, monitor, improve across full lifecycle |
| **PromptFoo** | Scripted assessments, regression testing, red-teaming |
| **RAGAS** | RAG-specific metrics: faithfulness, context relevance, answer relevancy |

### Observability Tools

| Tool | Best For |
|---|---|
| **OpenTelemetry** | Vendor-neutral tracing foundation (use this for all agent traces) |
| **LangSmith** | LangChain/LangGraph native observability |
| **Arize AI** | Production AI observability and eval platform |
| **Atlan** | Metadata-driven enterprise context plane for agent governance |

### Governance Tools

| Tool | Best For |
|---|---|
| **NeMo Guardrails** | Runtime safety layer, developer-authored DSL rules |
| **Guardrails AI** | Input/output guardrails across model providers |
| **AGENTSAFE** | Full governance framework: design, runtime, audit controls |
| **Conscium** | Virtual simulations for unsafe behavior detection |

---

## 11. Quick Reference Cheatsheet

```
RUFLO CHEATSHEET
════════════════════════════════════════════════════════════════

INSTALL
  npx ruflo@latest                          # latest version
  npx ruflo@latest init --sparc --mcp       # full init with MCP

SWARM
  claude-flow hive-mind spawn "task" --topology hierarchical
  claude-flow swarm "task" --agents coder,tester,reviewer
  claude-flow agent list / metrics <id> / hierarchy

SPARC
  claude-flow sparc tdd "feature" --agents specification,...
  claude-flow sparc run dev "feature"

MEMORY
  npx ruflo memory store --key "k" --value "v" --namespace ns
  npx ruflo memory search --query "..." --limit 5

BENCHMARK
  swarm-bench run "task" --strategy development --max-agents 6
  swarm-bench hive-mind "task" --max-workers 8

EVAL
  npx ruflo eval run --dataset evals/baseline.jsonl
  npx ruflo eval check --results latest.json --thresholds t.json

GOVERNANCE
  npx ruflo policy add --rule "no-pii-external" --severity HIGH
  npx ruflo attestation log --since "2026-01-01"
  npx ruflo hitl configure --require-approval-for "deploy,delete"

════════════════════════════════════════════════════════════════
FRAMEWORKS AT A GLANCE

  Ruflo          → Coding/dev automation, persistent learning, 75% cost cut
  LangGraph      → Production stateful workflows, human-in-loop, highest control
  CrewAI         → Business process, role-based, fastest to prototype
  AutoGen        → Research, conversational multi-agent debates
  Google ADK     → Google Cloud / Vertex AI, A2A interoperability
  OpenAgents     → Cross-framework agent networks, open protocols

════════════════════════════════════════════════════════════════
TOP ANTI-PATTERNS TO AVOID

  ✗ Monolith agents (split by responsibility)
  ✗ Token burn on simple tasks (match complexity to task)
  ✗ No baselines (always track metrics over time)
  ✗ Launch-day evals only (embed evals in CI/CD)
  ✗ Observability as afterthought (OTel from day one)
  ✗ Static guardrails (continuous runtime monitoring)
  ✗ Provider lock-in (model-agnostic abstractions)
  ✗ Skipping SPARC (structure before code)

════════════════════════════════════════════════════════════════
EVAL LAYER QUICK MAP

  Layer 1 (Output):     Accuracy, Faithfulness, Relevance, Safety
  Layer 2 (Trajectory): Tool selection, Error recovery, Efficiency
  Layer 3 (Business):   Task success rate, Latency, Cost, Override rate

════════════════════════════════════════════════════════════════
```

---

## References and Further Reading

- **Ruflo GitHub:** github.com/ruvnet/ruflo
- **Ruflo Wiki:** github.com/ruvnet/ruflo/wiki
- **SPARC Methodology:** github.com/ruvnet/ruflo/wiki/SPARC-Methodology
- **AGENTSAFE Framework:** arxiv.org/pdf/2512.03180
- **Evaluation-Driven Development:** arxiv.org/pdf/2411.13768
- **LLM Agent Evaluation Survey:** arxiv.org/pdf/2507.21504
- **Agentic AI Governance (IMDA):** imda.gov.sg/mgf-for-agentic-ai
- **Trace-Based Assurance Framework:** arxiv.org/pdf/2603.18096
- **Brookings: How to Evaluate Agentic AI:** brookings.edu/articles/how-can-we-best-evaluate-agentic-ai
- **WEF: AI Agents in Action:** World Economic Forum, AI Agents Evaluation and Governance

---

*Guide current as of May 2026. The agentic AI landscape evolves rapidly — check ruflo's GitHub releases and each framework's changelog for the latest updates.*
