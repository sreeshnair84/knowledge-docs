---
title: "Part 5 — Agentic AI Delivery Lifecycle (ADLC)"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
tags: ["adlc", "agent-lifecycle", "agentops", "mcp", "a2a", "multi-agent", "safety-testing"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 5 — Agentic AI Delivery Lifecycle (ADLC)

> **Report Context:** Part 5 of the [Enterprise AI Research Report](./index). Authoritative guides are in the **AI Development / AIDLC** and **Agentic Systems** sections — this page orients you and compares ADLC with adjacent lifecycle frameworks.

---

## ADLC at a Glance

```
Agent Discovery → Goal Definition → Task Modelling
    ↓ Reasoning Strategy → Planning
    ↓ Memory Design → Tool Design → MCP Configuration → A2A Interfaces
    ↓ Workflow Design → Human Approval Design → Delegation Patterns
    ↓ Multi-Agent Collaboration Design
    ↓ Policy Engine → Identity → Authorisation
    ↓ Knowledge Sources
    ↓ Evaluation → Simulation → Safety Testing
    ↓ Deployment → Runtime → Operations
    ↓ Versioning → Lifecycle Management → Retirement
```

---

## ADLC vs Adjacent Lifecycles

| Dimension | SDLC | MLOps | LLMOps | ADLC |
|-----------|------|-------|--------|------|
| **Primary artifact** | Source code | Trained model | Prompt + LLM | Agent (model + prompt + tools + memory + identity) |
| **Version unit** | Code commit | Model version | Prompt + model version | Agent compound version |
| **Testing paradigm** | Unit / integration tests | Accuracy benchmarks | Evaluation suites | Simulation, adversarial, safety, HITL |
| **Deployment pattern** | Rolling, blue/green | Shadow, canary | Canary, A/B | Canary with emergency shutdown |
| **Failure mode** | Defects, crashes | Drift, degradation | Hallucination, injection | Runaway actions, goal misalignment, loop |
| **Monitoring focus** | Uptime, error rate | Model drift | Quality metrics, cost | Task completion, HITL rate, tool error |
| **Human role** | Reviewer / approver | Retrainer | Prompt tuner | Overseer / policy setter |
| **Governance artifact** | Code review, change ticket | Model card, bias report | Prompt log, eval report | Agent charter, action audit log |
| **Retirement trigger** | End of requirement | Model deprecated | Model deprecated / performance | Goal achieved, better agent, safety concern |

---

## Phase Detail

### Agent Discovery & Goal Definition
Identify automation opportunities where an agent adds value over a rule-based or GenAI-only approach. Define the agent's primary goal (the outcome it is designed to achieve), sub-goals, and explicit non-goals (what it must never do). An **Agent Charter** (template in [Part 9](./part-09-operating-processes#agent-charter-template)) formalises this.

### Task Modelling
Decompose the agent's goal into a task graph — the sequence and branching of steps the agent will execute. Identify decision points, tool call patterns, and human approval gates.

### Reasoning Strategy
Choose the agent's reasoning architecture:
- **ReAct** (Reason + Act): interleaved reasoning and tool use — most common for single-agent tasks
- **Chain-of-Thought + Tools**: extended reasoning before acting — suits complex multi-step analysis
- **Plan-and-Execute**: plan the full task graph upfront, then execute — suits structured workflows
- **Multi-Agent Delegation**: orchestrator agents that delegate to specialist sub-agents

### Memory Design
Define what the agent remembers across steps and sessions. See [AI Memory Agent Innovations Report](../agentic-systems/memory/AI_Memory_Agent_Innovations_Research_Report) for architecture patterns covering working, episodic, semantic, and procedural memory.

### Tool & MCP Design
Define the agent's tool set (APIs, database queries, code execution, web search) and configure MCP servers for each tool. Apply least-privilege: grant only the permissions necessary for the stated goal. See [MCP Deep Research 2026](../ai-protocols/mcp/MCP_Deep_Research_2026).

### Safety Testing
Before production, every agent must pass:
- **Goal alignment test**: does the agent achieve its stated goals and avoid non-goals?
- **Prompt injection test**: can adversarial input hijack the agent?
- **Loop detection test**: does the agent detect and exit infinite loops?
- **Tool abuse test**: can the agent be induced to misuse permitted tools?
- **Privilege escalation test**: can the agent access resources outside its authorised scope?

See [AI Red Teaming Guide](../ai-security-governance/security/AI-Red-Teaming-Guide) for methodology.

---

## Authoritative Guides

| Guide | What It Covers |
|-------|---------------|
| [Agile in the Age of Agentic AI](../ai-development/aidlc/Agile_in_the_Age_of_Agentic_AI_2026) | ADLC vs SDLC vs MLOps; agile for agent delivery |
| [Enterprise Agentic AI Architecture Playbook](../enterprise-architecture/process/Enterprise_Agentic_AI_Architecture_Playbook_2026) | Agent design, task modelling, reasoning strategy |
| [AgentOps Production Guide](../enterprise-architecture/ai-architecture/AgentOps-Production-Guide) | Deployment, runtime, versioning, operations |
| [Agent Testing, Monitoring & Evaluation](../ai-development/testing/Agent_Testing_Monitoring_Evaluation) | Simulation, safety testing, evaluation |
| [AI Memory Agent Innovations Report](../agentic-systems/memory/AI_Memory_Agent_Innovations_Research_Report) | Memory design patterns |
| [MCP Deep Research 2026](../ai-protocols/mcp/MCP_Deep_Research_2026) | MCP protocol and tool design |
| [Agentic Platform Best Practices](../agentic-systems/platform/agentic_platform_bestpractices) | Platform-level patterns |
| [Agent Skills Complete Playbook](../agentic-systems/skill/Agent_Skills_Complete_Playbook_2026) | Skill design and reuse |

---

## Related Parts

- [Part 3](./part-03-ai-delivery-lifecycle) — Parent lifecycle that ADLC extends
- [Part 4](./part-04-genai-delivery) — GenAI foundation that agents build on
- [Part 6](./part-06-governance) — Agent governance and approval processes
- [Part 9](./part-09-operating-processes) — Agent Approval and Agent Rollback processes
