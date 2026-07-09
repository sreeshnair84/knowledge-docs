---
title: "Agentic UI & Applications"
date_created: 2026-07-07
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["agentic-ui"]
---

# Agentic UI & Applications

**Audience:** Enterprise Architects, Principal AI Architects, AI Platform Teams, CTO Organizations, AI Centers of Excellence, UX Leads, and DevOps Engineers building enterprise-grade agentic applications.  
**Purpose:** Definitive reference for designing, selecting, and deploying agentic user-interface protocols, standards, frameworks, and production architectures through 2027.  
**Related:** [AI Protocols Overview](../ai-protocols/index.md) · [MCP Deep Research 2026](../ai-protocols/mcp/MCP_Deep_Research_2026.md) · [Agent Interoperability & Orchestration](../coding-tools/enterprise-ai-architect/agent-interoperability-orchestration.md) · [Enterprise AI Architecture Patterns](../coding-tools/enterprise-ai-architect/enterprise-ai-architecture-patterns.md)

:::info Research Program: Current as of July 2026
    This section covers the Agentic UI & Applications knowledge domain. Protocol versions covered: AG-UI (open standard, production), A2UI v0.9 (Google, experimental), NLWeb (Microsoft open project), MCP Apps (production), OpenAI Apps SDK. Backend integrations current to July 2026 include LangGraph, CrewAI, Microsoft Agent Framework 1.0, Google ADK, AWS Bedrock AgentCore, Mastra, PydanticAI, Agno, LlamaIndex, AG2. CopilotKit raised $27M to make AG-UI the enterprise standard for in-app AI agents.

---

## Mission

The Agentic UI & Applications section equips enterprise technical leadership with the complete knowledge base required to move beyond chat-based AI interfaces and into production-grade agentic applications. The scope spans the full technology stack — from emerging UI protocol standards (AG-UI, A2UI, NLWeb) through enterprise reference architectures, deployment topologies, security models, and governance frameworks — enabling organizations to design and operate AI experiences that support streaming intermediate work, generative UI, human-in-the-loop approval gates, multi-agent composition, and ambient computing patterns.

Chat interfaces are no longer sufficient. Enterprise agents must display partial results in real time, propose dynamic UI surfaces tailored to task context, pause for human approval at defined trust boundaries, coordinate across multiple specialized sub-agents, and maintain coherent state across sessions, tabs, and devices. This section covers the protocols, architectures, and operational patterns that make all of this possible at enterprise scale.

---

## Domain Map

```text
AGENTIC UI & APPLICATIONS — 20 PAGES

Cluster 1   Foundations & Evolution (3 pages)
            │
            ├─ evolution-human-ai-interfaces.md          [THIS BATCH]
            │    ├─ Timeline: GUI → Chat → Copilot → Agentic → Generative UI → Ambient
            │    ├─ Why chat is insufficient (12+ limitations)
            │    ├─ Human-agent collaboration models (HITL/HOTL/HOOL/Ambient/Shared Cognition)
            │    ├─ AI-first UX principles (12 principles)
            │    └─ UX anti-patterns inherited from chatbot era (15+)
            │
            ├─ agentic-ux-design-principles.md           [planned]
            │    ├─ 12 AI-first UX principles — detailed implementation
            │    ├─ Streaming UI component pattern library
            │    ├─ Progress disclosure design patterns
            │    └─ Accessibility & cognitive-load standards for agentic UX
            │
            └─ human-agent-collaboration-models.md       [planned]
                 ├─ HITL / HOTL / HOOL / Shared Cognition / Invisible AI
                 ├─ Decision matrices for collaboration model selection
                 └─ Regulatory requirements per model per industry

Cluster 2   Protocol Standards (5 pages)
            │
            ├─ agui-standards-landscape.md               [THIS BATCH]
            │    ├─ AG-UI protocol: full event taxonomy, transport, state sync
            │    ├─ A2UI v0.9: declarative generative UI specification
            │    ├─ MCP Apps: tool + UI bundle architecture
            │    ├─ NLWeb: conversational web standard (Microsoft open project)
            │    ├─ OpenAI Apps SDK: JSON-RPC 2.0, card UI model
            │    ├─ Microsoft Agent Framework 1.0: AG-UI integration
            │    └─ Framework comparison matrix (15 frameworks)
            │
            ├─ agui-protocol-implementation.md           [planned]
            │    ├─ AG-UI server implementation patterns (Python, TypeScript, Java)
            │    ├─ Conformance test suite
            │    └─ Debugging, mocking, and load testing AG-UI streams
            │
            ├─ a2ui-declarative-ui-spec.md               [planned]
            │    ├─ Full A2UI JSON schema reference
            │    ├─ Widget catalog: text, form, table, chart, card, carousel, action
            │    └─ Migration path from React Server Components to A2UI
            │
            ├─ mcp-apps-architecture.md                  [planned]
            │    ├─ MCP Apps deep dive: approval flows, UI resource bundles
            │    ├─ Centralized MCP registry design
            │    └─ Tool governance and sandboxing
            │
            └─ nlweb-conversational-web.md               [planned]
                 ├─ NLWeb deployment guide (Python reference implementation)
                 ├─ Cloudflare AutoRAG integration
                 └─ Enterprise governance for publicly queryable content

Cluster 3   Reference Architecture (3 pages)
            │
            ├─ enterprise-reference-architecture.md      [THIS BATCH]
            │    ├─ 17-layer reference architecture (full component detail)
            │    ├─ Trust boundary diagram (TB1–TB8)
            │    ├─ Technology mapping table (17 layers × 3-5 OSS + commercial)
            │    ├─ Request journey: step-by-step trace through all 17 layers
            │    ├─ Kubernetes reference deployment (namespaces, services, ingress)
            │    ├─ Multi-region architecture variant
            │    └─ Edge deployment variant
            │
            ├─ agentic-app-deployment-patterns.md        [planned]
            │    ├─ GitOps workflows for agent deployments
            │    ├─ Canary / blue-green / shadow deployments for agents
            │    └─ Agent versioning and rollback strategies
            │
            └─ multi-agent-ui-orchestration.md           [planned]
                 ├─ Nested agent composition with AG-UI scoped state
                 ├─ Shared workspace patterns (multiple agents, one UI)
                 └─ Conflict resolution for concurrent agent state writes

Cluster 4   Platform & Integration (5 pages)
            │
            ├─ copilotkit-enterprise-guide.md            [planned]
            │    ├─ CopilotKit packages: react-ui, react-core, runtime, mcp-apps-middleware
            │    ├─ Enterprise setup, auth, and multi-tenant configuration
            │    └─ AG-UI bidirectional state sync: agent ↔ UI ↔ app
            │
            ├─ microsoft-agent-framework-guide.md        [planned]
            │    ├─ Agent Framework 1.0 (Python + .NET)
            │    ├─ HttpAgent endpoint with SSE streaming
            │    └─ Azure deployment: App Service, Container Apps, AKS, Functions
            │
            ├─ langchain-langgraph-ui-integration.md     [planned]
            │    ├─ LangGraph + AG-UI event streaming integration
            │    └─ Streaming intermediate steps to frontend
            │
            ├─ google-adk-a2ui-integration.md            [planned]
            │    ├─ Google ADK + A2UI declarative rendering
            │    └─ A2UI widget rendering across web/mobile/desktop
            │
            └─ aws-bedrock-agentcore-ui.md               [planned]
                 ├─ Bedrock AgentCore infrastructure-level AG-UI support
                 └─ AWS Strands + AG-UI frontend integration

Cluster 5   Operations & Governance (4 pages)
            │
            ├─ agentic-ui-security-trust.md              [planned]
            │    ├─ Trust boundaries in agentic UI (TB1–TB8 mapped to OWASP ASI)
            │    ├─ Tool approval sandboxing and content security policy
            │    └─ Agent impersonation, confused deputy, and UI injection attacks
            │
            ├─ hitl-interrupt-patterns.md                [planned]
            │    ├─ Pause / Approve / Edit / Retry / Escalate — full implementation
            │    ├─ Approval workflow SLA patterns (timeout, fallback, audit)
            │    └─ Regulatory requirements for HITL per domain (banking, healthcare, gov)
            │
            ├─ agentic-ui-observability.md               [planned]
            │    ├─ OTel traces for AG-UI events (span schema)
            │    ├─ UI quality metrics (time-to-first-token, approval rates, abandonment)
            │    └─ Evaluation pipeline for agentic UX quality
            │
            └─ agentic-ui-maturity-model.md              [planned]
                 ├─ 5-level maturity model: Chat → Copilot → Agentic → Generative UI → Autonomous
                 └─ Roadmap templates for organizations at each maturity level
```

---

## Navigate by Role

| Your Role | Start Here | Then Go To |
|---|---|---|
| **Enterprise Architect** | [Evolution of Human-AI Interfaces](evolution-human-ai-interfaces.md) | [Enterprise Reference Architecture](enterprise-reference-architecture.md) → [AGUI Standards & Ecosystem](agui-standards-landscape.md) |
| **Principal AI Architect** | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) | [Enterprise Reference Architecture](enterprise-reference-architecture.md) → [Evolution of Human-AI Interfaces](evolution-human-ai-interfaces.md) |
| **AI Platform Lead** | [Enterprise Reference Architecture](enterprise-reference-architecture.md) | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §2 AG-UI → §4 MCP Apps |
| **Security Architect** | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §14 Identity + §8 Guardrails | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §2.9 Security Model |
| **UX Lead** | [Evolution of Human-AI Interfaces](evolution-human-ai-interfaces.md) | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §3 A2UI Deep Dive |
| **DevOps Engineer** | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §7 Kubernetes Topology | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §7 Microsoft Agent Framework |

---

## Deliverables Index

| # | Deliverable | Where to Find It |
|---|---|---|
| 1 | Agentic UI Evolution Timeline (12 eras) | [Evolution of Human-AI Interfaces](evolution-human-ai-interfaces.md) §1 |
| 2 | Why Chat is Insufficient — 12-Point Analysis | [Evolution of Human-AI Interfaces](evolution-human-ai-interfaces.md) §2 |
| 3 | Human-Agent Collaboration Models (5 models) | [Evolution of Human-AI Interfaces](evolution-human-ai-interfaces.md) §3 |
| 4 | AI-First UX Principles (12 principles) | [Evolution of Human-AI Interfaces](evolution-human-ai-interfaces.md) §4 |
| 5 | UX Anti-patterns from Chatbot Era (15+) | [Evolution of Human-AI Interfaces](evolution-human-ai-interfaces.md) §5 |
| 6 | Protocol Layer Stack Diagram | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §1 |
| 7 | AG-UI Event Taxonomy (17 event types) | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §2.1 |
| 8 | AG-UI State Synchronization Model | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §2.3 |
| 9 | AG-UI Generative UI Modes | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §2.5 |
| 10 | AG-UI Minimal Server Implementation | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §2.10 |
| 11 | A2UI JSON Schema Reference | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §3.2 |
| 12 | MCP Apps Architecture Pattern | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §4 |
| 13 | NLWeb vs RAG vs AI Search Comparison | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §5.4 |
| 14 | Framework Comparison Matrix (15 frameworks) | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §8 |
| 15 | Protocol/Framework Selection Decision Tree | [AGUI Standards & Ecosystem Landscape](agui-standards-landscape.md) §9 |
| 16 | 17-Layer Reference Architecture (full) | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §2 |
| 17 | Trust Boundary Diagram (TB1–TB8) | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §4 |
| 18 | Technology Mapping Table (17 layers) | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §5 |
| 19 | Request Journey — Step-by-Step Trace | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §6 |
| 20 | Kubernetes Reference Deployment | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §7 |
| 21 | Multi-Region Architecture Variant | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §8 |
| 22 | Edge Deployment Variant | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §9 |
| 23 | Anti-Pattern Catalog (51+ patterns) | [Enterprise Reference Architecture](enterprise-reference-architecture.md) §2 per-layer |

---

## Protocol Layer Map

```text
AGENTIC UI PROTOCOL STACK — July 2026

┌─────────────────────────────────────────────────────────────────┐
│  LAYER 5 — USER INTERFACE                                       │
│  Web (React/Vue/Angular) · Mobile (React Native / Flutter)     │
│  Desktop (Electron / Tauri) · Voice · IDE Plugins              │
│  Microsoft Teams / Slack / Salesforce integrations             │
│  CopilotKit · Terminal clients · Custom enterprise shells      │
└────────────────────────────┬────────────────────────────────────┘
                             │  AG-UI Protocol
                             │  Server→Client: HTTP+SSE event stream
                             │  Client→Server: HTTP POST actions
┌────────────────────────────▼────────────────────────────────────┐
│  LAYER 4 — AGENT-to-UI TRANSPORT (AG-UI)                       │
│  Event types: TEXT_MESSAGE_* · TOOL_CALL_* · STATE_*          │
│              STEP_* · RUN_* · CUSTOM · RAW                     │
│  State sync: event-sourced diffs (STATE_DELTA + STATE_SNAPSHOT)│
│  Generative UI: static typed components + declarative JSON     │
│  HITL: pause / approve / edit / retry / escalate              │
│  Composition: nested agents with scoped state                  │
└────────────────────────────┬────────────────────────────────────┘
                             │  A2UI Payload (carried inside AG-UI stream)
                             │  JSON UI surface definitions
┌────────────────────────────▼────────────────────────────────────┐
│  LAYER 3 — UI SURFACE DEFINITION (A2UI v0.9)                   │
│  Declarative JSON → native rendering: web / mobile / desktop   │
│  Widget types: text · form · table · chart · card · carousel   │
│  Framework-agnostic · No arbitrary code execution              │
│  Schema validation enforced at render time                     │
│  "AG-UI is the postal service; A2UI is the letter inside"      │
└─────────────────────┬────────────────────────────────────────────┘
                      │
       ┌──────────────┼────────────────┬─────────────────┐
       │              │                │                  │
┌──────▼──────┐ ┌─────▼──────┐ ┌──────▼─────┐ ┌─────────▼──────┐
│ MCP         │ │ A2A        │ │ NLWeb      │ │ MCP Apps       │
│(agent↔tool) │ │(agent↔     │ │(agent↔web) │ │(tool + UI      │
│ Tool routing│ │ agent)     │ │Schema.org/ │ │ bundle)        │
│ Auth / authz│ │Task deleg. │ │RSS+vector  │ │Tool exec +     │
│ Rate limit  │ │Agent Cards │ │=MCP server │ │UI component    │
└─────────────┘ └────────────┘ └────────────┘ └────────────────┘

ORACLE OPEN AGENT SPEC (three-layer model)
  Layer A: Oracle Open Agent Spec  — defines WHAT runs (agent capabilities)
  Layer B: AG-UI                   — defines HOW transport & interaction streams
  Layer C: A2UI                    — defines WHAT the UI surface looks like

KEY PROTOCOL RELATIONSHIPS
  AG-UI   complements (does not replace) MCP and A2A
  A2UI    payload travels inside the AG-UI CUSTOM event stream
  NLWeb   every instance is also an MCP server — web content discoverable by agents
  MCP Apps = MCP servers that expose tools WITH bundled UI resource components
  OpenAI Apps SDK later standardized as part of MCP Apps specification
```

---

## What This Section Does NOT Duplicate

:::note Scope Boundaries
    The following content lives in other sections. This section cross-references these resources but does not reproduce their core content.

- **MCP protocol deep dive** (transport, tool lifecycle, server implementation, registry) → [MCP Deep Research 2026](../ai-protocols/mcp/MCP_Deep_Research_2026.md)
- **A2A protocol** (agent-to-agent communication, orchestration patterns, Agent Cards) → [Agent Interoperability & Orchestration](../coding-tools/enterprise-ai-architect/agent-interoperability-orchestration.md)
- **HITL gate patterns** (approval workflow design for agentic safety guardrails) → [Enterprise AI Architecture Patterns](../coding-tools/enterprise-ai-architect/enterprise-ai-architecture-patterns.md) §8
- **Agent memory architecture** (working, episodic, semantic, procedural, long-term) → [Agent Memory & Planning Architecture](../coding-tools/enterprise-ai-architect/agent-memory-planning-architecture.md)
- **OWASP ASI01–ASI10** (agentic AI security taxonomy and mitigations) → [Agentic AI Security & Identity](../coding-tools/enterprise-ai-architect/agentic-ai-security-identity.md)
- **14-layer guardrails framework** (input validation, output filtering, classifiers) → [Security Architecture & Guardrails](../coding-tools/enterprise-ai-architect/agentic-ai-security-guardrails.md)
- **EU AI Act / NIST AI RMF / ISO 42001** (compliance, audit, governance lifecycle) → [Enterprise AI Governance & Compliance](../coding-tools/enterprise-ai-architect/enterprise-ai-governance-compliance.md)
- **OTel GenAI semantic conventions** (trace schema, evaluation pipeline) → [Reliability, Observability & Governance](../coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance.md)
- **Entra 3LO / OBO flows** (agent identity, delegation, token exchange) → [Entra 3LO Implementation Guide](../ai-protocols/auth/entra-3lo-agent-auth-implementation.md)
- **AI Gateway** (Kong rate limiting, routing, token management, cost control) → [Kong AI Gateway Guide](../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md)
