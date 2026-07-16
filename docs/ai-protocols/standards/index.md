---
title: "Protocol Standards & Governance"
date_created: 2026-07-05
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["ai-protocols", "protocol", "governance", "standards", "compliance"]
---

# Protocol Standards & Governance

Governance frameworks, compliance mappings, sector-specific adoption patterns, and protocol evolution history for the enterprise agent stack.

---

## Protocol Convergence Landscape (July 2026)

| Protocol | Layer | Status | Notes |
|---|---|---|---|
| **MCP** | Agent ↔ Tool | Stateless RC (Jul 2026) | Dominant; all major AI platforms; 10,000+ servers |
| **A2A** | Agent ↔ Agent | v1.0 stable (Apr 2026) | 150+ orgs; GA in Copilot Studio, Bedrock, Foundry |
| **ACP** | Agent ↔ Agent (legacy) | Merged into A2A (Aug 2025) | IBM BeeAI/Linux Foundation; migration path documented |
| **ANP** | Agent ↔ Agent (P2P) | IETF draft | DID-based; decentralized mesh topology |
| **x402** | Agent → Micropayment | Production | HTTP 402-based; used in AgentCore Payments |
| **AP2** | Agent → Enterprise payment | GA | Google-led; 60+ partners; cryptographic mandate signing |
| **AG-UI** | Agent ↔ UI | GA | SSE-based; CopilotKit; real-time agent UI streaming |
| **A2UI** | Agent ↔ UI (declarative) | GA | Google declarative widget JSON; v0.9 |
| **NLIP** | Language interop | Ecma draft | Natural language negotiation; Ecma TC56 |
| **LMOS** | Agent orchestration OS | Eclipse Foundation | Microkernel model; capability graph routing |
| **UTCP** | Tool calling (alt) | Stalled | Alternative to MCP; adoption challenges documented |

---

## Governance Bodies

| Body | Protocols Governed | Notes |
|---|---|---|
| Linux Foundation AAIF | MCP, A2A, ACP (merged) | Primary governance for enterprise agent interoperability |
| IETF | OAuth 2.1, SPIFFE/SPIRE, ANP (track) | RFCs for auth standards and workload identity |
| CNCF | SPIFFE/SPIRE | Graduated project; Kubernetes-native workload identity |
| Ecma TC56 | NLIP | Natural language interoperability standard |
| Eclipse Foundation | LMOS | Open-source agent orchestration framework |
| Google (open) | AP2, A2UI | Payment mandates and declarative UI protocol |

---

## Guides

- [AI Protocols & Standards — Service Industry Guide 2026](./AI_Protocols_Standards_Service_Industry_Guide_2026.md) — Sector-specific adoption requirements and implementation patterns for banking, healthcare, government, insurance, and manufacturing; compliance matrix against DORA, HIPAA, PCI-DSS, EU AI Act

- [Protocol Evolution History](./existing-protocol-evolution-agentic-ai.md) — How MCP and A2A evolved from 2024 to 2026; the ACP-into-A2A merger (August 2025); protocol consolidation timeline; decision criteria history; legacy migration guidance

- [Agent Protocol Metadata & Headers](./agent-protocol-metadata-headers.md) — Agent Card JSON schemas, `traceparent` distributed tracing headers, `Mcp-Method` / `Mcp-Name` routing headers, protocol versioning fields, and cross-vendor interoperability metadata

---

## See Also

- [MCP — Model Context Protocol](../mcp/index.md) — deep-dive on the agent↔tool protocol
- [A2A — Agent-to-Agent Protocol](../a2a/index.md) — deep-dive on the agent↔agent protocol
- [Emerging Protocols Overview](./emerging-protocols-overview.md) — nine protocols beyond MCP and A2A
- [Agent Interoperability & Orchestration](../../enterprise-architecture/ai-architecture/agent-interoperability-orchestration.md) — full multi-protocol governance and orchestration guide
