---
title: "AI Protocols & Standards"
date_created: 2026-07-05
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ai-protocols", "protocol"]
---

# AI Protocols & Standards

> **Current as of July 2026.** The two protocols that form the enterprise agent stack — MCP and A2A — are now both stable and under Linux Foundation governance. This page provides a quick primer; the PDF below covers sector-specific standards.

---

## The Two-Layer Agent Protocol Stack

```
  ┌─────────────────────────────────────────────────────────────┐
  │                      Enterprise Agent                        │
  └──────────────┬──────────────────────┬───────────────────────┘
                 │ MCP                  │ A2A
     (agent ↔ tools/data)       (agent ↔ agent)
                 ▼                      ▼
  ┌──────────────────────┐  ┌──────────────────────────────────┐
  │  Tools / APIs / DBs  │  │  Other Agents (any vendor)       │
  │  MCP Servers         │  │  A2A Agent Cards + Tasks         │
  └──────────────────────┘  └──────────────────────────────────┘
```

---

## MCP — Model Context Protocol

| Attribute | Detail |
|---|---|
| **Governance** | Linux Foundation Agentic AI Foundation (AAIF), since Dec 9, 2025 |
| **Spec status** | 2026-07-28 stateless Release Candidate; final publishes July 28, 2026 |
| **Adoption** | 10,000+ public servers; ~110M monthly SDK downloads |
| **Auth** | OAuth 2.1 + PKCE + RFC 9207 + RFC 8707 (mandatory in 2026 RC) |
| **Key primitives** | Tools (executable), Resources (read-only data), Prompts (templates), Sampling |
| **2026 additions** | Extensions framework, Tasks (promoted), MCP Apps, authorization hardening |

**When to use MCP:** any agent-to-tool integration — connecting an agent to a database, API, file system, or business application. MCP is the standard interface for all tool calls.

For the deep-dive implementation guide, see [MCP Deep Guide](../mcp/index.md) and [MCP Deep Research 2026](../mcp/MCP_Deep_Research_2026.md).

---

## A2A — Agent-to-Agent Protocol

| Attribute | Detail |
|---|---|
| **Governance** | Linux Foundation (Agent2Agent Project), since June 2025 |
| **Spec status** | v1.0 stable (April 2026) |
| **Adoption** | 150+ supporting organizations; GA in Copilot Studio, Microsoft Foundry, Bedrock AgentCore |
| **Key primitives** | Agent Card (capability declaration), Task (unit of work), Artifact (task output), Message (streaming/clarification) |
| **Auth** | OAuth 2.1 declared in Agent Card; per-task scoped delegation tokens |

**When to use A2A:** when one agent needs to delegate a task to another agent — regardless of vendor. A2A handles discovery (via Agent Cards), task handoff, status tracking, and result delivery.

### MCP vs A2A — Quick Decision

| Question | Answer | Use |
|---|---|---|
| Agent calling an API, database, or tool? | Tool integration | **MCP** |
| Agent delegating a task to another agent? | Agent collaboration | **A2A** |
| Agent discovering what another agent can do? | Capability discovery | **A2A** (Agent Card at `/.well-known/agent.json`) |
| Agent exposing a capability to other agents? | Service provider | Implement A2A server |
| Agent consuming a new data source? | Data integration | **MCP** (new Resource) |

---

## Protocol Convergence Landscape (July 2026)

| Protocol | Layer | Status | Notes |
|---|---|---|---|
| MCP | Agent ↔ Tool | Stateless RC | Dominant; all major AI platforms support it |
| A2A | Agent ↔ Agent | v1.0 stable | 150+ orgs; GA in major platforms |
| ACP | Agent ↔ Agent (alt) | Draft | BeeAI / Linux Foundation; convergence with A2A ongoing |
| x402 | Agent → Micropayment | Production | HTTP 402-based; used in AgentCore Payments |
| AP2 | Agent → Enterprise payment | GA | Google-led; 60+ partners; cryptographic mandate signing |

For the full orchestration governance guide, see [Agent Interoperability & Orchestration](../../coding-tools/enterprise-ai-architect/agent-interoperability-orchestration.md).

---

## PDFs

<details>
<summary>AI Protocols &amp; Standards — Service Industry Guide 2026</summary>
<iframe src="AI_Protocols_Standards_Service_Industry_Guide_2026.pdf" width="100%" height="800px" frameborder="0"></iframe>
<p><a href="AI_Protocols_Standards_Service_Industry_Guide_2026.pdf" target="_blank">Open in new tab ↗</a></p>
</details>
