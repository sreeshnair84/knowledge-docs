---
title: "A2A — Agent-to-Agent Protocol"
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["ai-protocols", "a2a", "agent-to-agent"]
---

# A2A — Agent-to-Agent Protocol

The open standard for agent collaboration across vendor boundaries — enabling task delegation, capability discovery, and multi-agent orchestration.

> **Governance:** Linux Foundation (Agent2Agent Project, since June 2025) · **Status:** v1.0 stable (April 2026) · **Adoption:** 150+ organizations; GA in Microsoft Copilot Studio, Microsoft Foundry, Amazon Bedrock AgentCore

---

## What A2A Does

MCP connects agents to tools. A2A connects agents to other agents. When an agent needs to delegate work to a peer — possibly from a different vendor — A2A handles the full lifecycle:

1. **Discovery** — Caller fetches `/.well-known/agent.json` (the Agent Card) to learn the remote agent's capabilities, accepted task types, and auth requirements.
2. **Task Submission** — Caller creates a Task with a structured message; the remote agent executes asynchronously.
3. **Status Tracking** — Caller polls or subscribes via SSE to track lifecycle state: `submitted → working → completed | failed | cancelled`.
4. **Result Delivery** — Completed tasks return Artifacts — structured outputs with MIME types and metadata.
5. **Clarification** — Remote agents can stream Messages back during execution to request input or provide interim updates without marking the task complete.

---

## Core Primitives

| Primitive | Description |
|---|---|
| **Agent Card** | JSON document at `/.well-known/agent.json` — declares identity, capabilities, supported task schemas, and auth requirements |
| **Task** | Unit of work: contains the input message, a unique ID, and a lifecycle state machine |
| **Artifact** | Structured task output — file, JSON payload, or text — with MIME type and provenance metadata |
| **Message** | Streaming communication channel for clarifications, progress updates, and interim results |

---

## Request Flow

```
Caller Agent
    │ 1. GET  /.well-known/agent.json    → Agent Card (capabilities, auth scheme)
    │ 2. POST /tasks                     → Task created (id, message, state: submitted)
    │ 3. GET  /tasks/{id}                → Poll task status
    │    or subscribe to SSE stream      → Real-time state + Message events
    ▼
Remote Agent
    │ Executes task; may invoke MCP tool calls internally
    │ Returns Artifacts on completion
    ▼
Caller Agent receives Artifact result
```

---

## Security Model

A2A declares auth requirements in the Agent Card and uses OAuth 2.1 for token-based access:

| Security Layer | Mechanism |
|---|---|
| Authentication | OAuth 2.1; scheme and scopes declared in the Agent Card |
| Authorization | Per-task scoped delegation tokens (least-privilege per invocation) |
| Agent Card integrity | Cryptographic signature + revocation endpoint (v1.x Signed Agent Cards) |
| Delegation depth | Bounded in the Agent Card; agents cannot silently re-delegate beyond authorized depth |
| Workload identity (internal) | SPIFFE/SPIRE X.509 SVIDs + mTLS; no static secrets |
| Audit trail | Centralized audit graphs; every task carries `traceparent` for distributed tracing |

---

## A2A vs MCP

| Scenario | Protocol |
|---|---|
| Agent calls an API, database, file system, or tool | **MCP** |
| Agent delegates a task to another agent | **A2A** |
| Agent discovers what a peer agent can do | **A2A** — Agent Card |
| Agent exposes capabilities to other agents | Implement an **A2A server** |
| Agent consumes a new data source | **MCP** — new Resource |
| Agent submits a payment mandate | **AP2** (A2A extension) |

---

## Protocol Versions

| Version | Date | Key Changes |
|---|---|---|
| v0.2 (Google preview) | Apr 2025 | Initial public release; basic Task + Agent Card primitives |
| v1.0 stable | Apr 2026 | Multi-tenancy; Signed Agent Cards; streaming SSE standardized |
| v1.x (point releases) | Ongoing | AP2 payment extension; LMOS interop; ANP convergence work |

IBM's ACP (Agent Communication Protocol) was merged into A2A in August 2025, consolidating the REST-first agentic communication track under the Linux Foundation. See [Protocol Evolution History](../standards/existing-protocol-evolution-agentic-ai.md) for the full consolidation timeline and ACP migration guidance.

---

## Deep-Dive Guides

- [MCP & A2A Protocol Deep Dive](../../enterprise-architecture/ai-architecture/mcp-a2a-protocol-deep-dive.md) — Architecture comparison, 2026-07-28 MCP revision, A2A v1.x Signed Agent Cards, trust tiers, enterprise adoption lifecycle
- [A2A Enterprise Security & Governance](../../enterprise-architecture/ai-architecture/a2a-enterprise-security-governance-guide.md) — Multi-agent threat model (rogue agents, byzantine behavior, lateral movement), bounded delegation, centralized audit graphs, kill-switch architecture, RBAC/ABAC/ReBAC authorization patterns
- [Agent Interoperability & Orchestration](../../enterprise-architecture/ai-architecture/agent-interoperability-orchestration.md) — Full protocol convergence landscape, ACP merger, AP2 payment extension, multi-cloud A2A federation patterns
- [A2A FinOps & Economics](../../enterprise-architecture/ai-architecture/ai-finops-rag-mcp-a2a-economics.md) — Token economics for multi-agent systems, cost attribution across A2A delegation chains, ROI analysis

---

## Related

- [MCP — Model Context Protocol](../mcp/index.md) — the complementary protocol for agent-to-tool calls
- [Authentication & Identity](../auth/index.md) — OAuth 2.1, SPIFFE, OBO — the identity layer that underlies A2A
- [Emerging Protocols](../standards/emerging-protocols-overview.md) — ANP (decentralized mesh), AP2 (payment mandates), AG-UI (UI streaming)
