---
title: "AI Protocols"
date_created: 2026-07-04
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["ai-protocols", "mcp", "a2a", "auth", "emerging-protocols"]
---

# AI Protocols

Reference for the full enterprise agent protocol stack — MCP, A2A, authentication/identity, and the emerging protocol landscape.

---

## Protocol Landscape (July 2026)

| Protocol | Layer | Status | Governance | Key Fact |
|---|---|---|---|---|
| **MCP** | Agent ↔ Tool | Stateless RC (Jul 2026) | Linux Foundation AAIF | 10,000+ servers; 110M SDK downloads/mo |
| **A2A** | Agent ↔ Agent | v1.0 stable (Apr 2026) | Linux Foundation | 150+ orgs; GA in Copilot Studio, Bedrock, Foundry |
| **OAuth 2.1** | Identity layer | RFC stable | IETF | Foundation for all agent auth |
| **SPIFFE/SPIRE** | Workload identity | CNCF graduated | CNCF | Short-lived X.509 SVIDs; no static secrets |
| **AG-UI** | Agent ↔ UI | GA | CopilotKit / Linux Foundation | SSE-based real-time agent UI streaming |
| **ANP** | Agent ↔ Agent (P2P) | IETF draft | IETF / DIF | DID-based decentralized peer-to-peer agent mesh |
| **AP2** | Agent → Payment | GA | Google-led | Cryptographic payment mandates; 60+ partners |
| **ACP** | Agent ↔ Agent (legacy) | Merged into A2A (Aug 2025) | Linux Foundation | IBM BeeAI origin; REST-first; migration path documented |
| **NLIP** | Language interop | Ecma draft | Ecma TC56 | Natural language negotiation across AI vendors |
| **UCP** | B2A Commerce | Draft | Community | Agentic vendor discovery and commerce flows |

---

## The Core Protocol Stack

```
┌──────────────────────────────────────────────────────────┐
│                     Enterprise Agent                      │
└───────────────┬──────────────────────┬────────────────────┘
                │ MCP                  │ A2A
    (agent ↔ tools/data)       (agent ↔ agent)
                ▼                      ▼
┌──────────────────────┐  ┌────────────────────────────────┐
│  Tools / APIs / DBs  │  │  Other Agents (any vendor)      │
│  MCP Servers         │  │  Agent Cards + Tasks            │
└──────────────────────┘  └────────────────────────────────┘

Authentication layer (underlies all traffic):
  Agent acting on behalf of user  →  OAuth 2.1 + 3LO
  Service-to-service, no user     →  SPIFFE/SPIRE (SVIDs + mTLS)
  Delegation chain                →  RFC 8693 Token Exchange (OBO)
```

---

## Decision Framework — Which Protocol?

| I need to… | Protocol |
|---|---|
| Connect an agent to an API, database, or file system | **MCP** |
| Call a tool deterministically from within an agent | **MCP** |
| Delegate a task to another agent (same or different vendor) | **A2A** |
| Discover what another agent can do | **A2A** — Agent Card at `/.well-known/agent.json` |
| Expose this agent's capabilities to peer agents | Implement an **A2A server** |
| Authenticate an agent acting on behalf of a human | **OAuth 2.1 / 3LO** |
| Authenticate service-to-service with no user present | **SPIFFE/SPIRE** |
| Pass authorization through a multi-agent delegation chain | **RFC 8693 Token Exchange (OBO)** |
| Stream real-time events from an agent to a UI | **AG-UI** (SSE) |
| Enable an agent to submit a payment | **AP2** / x402 |
| Build a decentralized peer-to-peer agent mesh | **ANP** (DID-based) |

---

## Sections

### [MCP — Model Context Protocol](./mcp/index.md)

The standard interface for all agent-to-tool calls. Covers protocol architecture, OAuth 2.1 security mandates (2026 RC), enterprise governance, and the AIDLC testing harness.

### [A2A — Agent-to-Agent Protocol](./a2a/index.md)

Linux Foundation v1.0 stable protocol for agent task delegation, capability discovery, and multi-vendor agent collaboration. Covers primitives, security model, enterprise governance, and FinOps.

### [Authentication & Identity](./auth/index.md)

The full agent auth stack: OAuth 2.1, OIDC, Three-Legged OAuth (3LO), On-Behalf-Of (OBO), SPIFFE/SPIRE workload identity. Includes the Microsoft Entra 3LO series (4 volumes), enterprise platform comparison, and marketplace connector patterns.

### [Emerging Protocols](./standards/emerging-protocols-overview.md)

Nine protocols beyond MCP and A2A — ACP, ANP, AG-UI, A2UI, UCP, AP2, NLIP, LMOS, UTCP — with architecture, security, governance, and migration guidance.

### [Protocol Standards](./standards/index.md)

Protocol governance frameworks, sector-specific adoption patterns (banking, healthcare, government), protocol evolution history, and metadata/header specifications.
