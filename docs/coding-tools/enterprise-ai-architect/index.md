---
title: "Enterprise AI Architect"
date_created: 2026-07-07
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["coding-tools", "enterprise-ai-architect"]
---

# Enterprise AI Architect

Architectural decision-making, governance, strategy, and **production operations** for AI systems at enterprise scale. This section is the **architectural decision layer** — it tells you *what* to choose and *why*, then links to the implementation detail sections for the *how*. The section now covers the full lifecycle: design, deployment, production reliability, observability, and governance.

:::info Section scope
    This section owns architecture decisions, patterns, governance frameworks, and skills assessment. Implementation details live in the specialist sections linked in the **Key Resources** below. No duplication — just cross-links.

---

## Guides in This Section

### 🎓 **Foundations**
Zero-to-mastery guide for architects new to enterprise AI. Covers the full landscape: model selection, build-vs-buy, integration patterns, token economics, security, and observability.

**→ [Read: Foundations](enterprise-ai-architect-foundations.md)**

### 📊 **Architecture Patterns**
Canonical reference for 15 enterprise AI patterns — RAG, agentic RAG, multi-agent orchestration, AI gateway, guardrail pipeline, LLM-as-judge evaluation harness, and more.

**→ [Read: Architecture Patterns](enterprise-ai-architecture-patterns.md)**

### ✅ **Governance & Compliance**
Regulatory landscape (EU AI Act, NIST AI RMF, ISO 42001, GDPR, HIPAA, SR 11-7), RAI framework, operating model, bias testing, stress testing, and vendor assessment.

**→ [Read: Governance & Compliance](enterprise-ai-governance-compliance.md)**

### 🏆 **Skills Assessment & CCA-F**
Competency model, self-assessment checklist, learning paths, 20+ EA-level scenario questions, and 30-point architecture review checklist. Includes CCA-F certification alignment.

**→ [Read: Skills Assessment](enterprise-ai-skills-assessment.md)**

### 🔒 **Agentic AI Security & Identity**
OWASP Top 10 for Agentic Applications 2026 (ASI01–ASI10), SPIFFE/SPIRE agent identity stack, IETF AIMS, bounded autonomy decision-rights framework, rogue agent defenses, and a regulated-enterprise reference architecture.

**→ [Read: Security & Identity](agentic-ai-security-identity.md)**

### 🔄 **Agent Interoperability & Orchestration**
MCP + A2A two-layer protocol stack, Agent Cards, enterprise agent registries, multi-agent governance, agentic payments (AP2/x402), OTel GenAI observability, and the orchestrator-vs-mesh decision guide.

**→ [Read: Interoperability & Orchestration](agent-interoperability-orchestration.md)**

### 📝 **Machine-Readable EA**
EA's shift from static docs to runtime agent context: policy-as-code (OPA/Cedar), EA repository via MCP, request-level governance, SLM-first as an EA standard, sovereignty drivers, and the migration roadmap.

**→ [Read: Machine-Readable EA](machine-readable-ea.md)**

### 🛡️ **Security Architecture & Guardrails**
18-threat catalog with prevent/detect/mitigate/recover controls, the 14-layer guardrail map (deterministic + probabilistic), and how Google, Microsoft, AWS, Salesforce, JPMorgan, and top consultancies implement production-grade agentic AI security.

**→ [Read: Security Architecture & Guardrails](agentic-ai-security-guardrails.md)**

### 📈 **Reliability, Observability & Governance Lifecycle**
End-to-end production lifecycle: 4 failure classes, 8 anti-patterns, graceful degradation ladder, OTel GenAI observability, 5 signal types, 5-dashboard set, 5-registry governance spine, and how Google, Microsoft, AWS, and McKinsey/Accenture/Deloitte run agentic AI at scale.

**→ [Read: Reliability & Observability](agentic-ai-reliability-observability-governance.md)**

### 🤖 **AI Harness Architecture & Orchestration**
The deterministic shell around the model: 24-component runtime catalog, 8-plane logical architecture, end-to-end task lifecycle, trust boundaries TB1–TB8, 14 orchestration patterns compared, and how AWS/Azure/Google/Anthropic/Temporal implement the harness in production.

**→ [Read: AI Harness & Orchestration](ai-harness-architecture-orchestration.md)**

### ↔️ **MCP & A2A Protocol Deep Dive**
The 2026-07-28 MCP revision (stateless core, Extensions, Tasks, MCP Apps), registry-of-record and trust tiers, MCP-specific attack surfaces, A2A v1.x Signed Agent Cards and federation, the MCP-vs-A2A decision table, and the 6-stage enterprise protocol adoption lifecycle.

**→ [Read: MCP & A2A Deep Dive](mcp-a2a-protocol-deep-dive.md)**

### 🧠 **Agent Memory & Planning Architecture**
7-type memory taxonomy with store mapping, the extract-consolidate-retrieve pipeline (Mem0/Zep/Letta/AgentCore compared), end-to-end memory lifecycle with GDPR erasure cascade, memory security, and plans as versioned first-class artifacts with governance gates.

**→ [Read: Memory & Planning Architecture](agent-memory-planning-architecture.md)**

### 🌐 **Communication, Identity & AI Gateway**
Agent communication mechanism catalog with delivery semantics (idempotency keys, sagas, pivot points), the cryptographic identity chain and delegation gap, the RBAC→ABAC→ReBAC→capability composite authorization model, and the AI gateway responsibility matrix.

**→ [Read: Communication, Identity & Gateway](agent-communication-identity-gateway.md)**

### 🏙️ **Reference Architectures & Checklists**
Architecture deltas for 10 industry domains (banking, healthcare, insurance, retail, manufacturing…), the platform-engineering operating model, the July 2026 framework comparison (AgentCore vs ADK vs LangGraph vs SK vs Claude Code…), maturity model L1–L5, review checklists, and the 4-quarter migration roadmap.

**→ [Read: Reference Architectures](enterprise-agent-reference-architectures.md)**

---

## Key Resources in Other Sections

| Topic | Location |
|-------|----------|
| MCP primitives, building MCP servers, enterprise provisioning | [MCP Deep Guide](../claude/mcp-deep-guide.md) |
| Claude on AWS Bedrock, Vertex AI, Microsoft Foundry (formerly Azure AI Foundry) | [Enterprise Deployment](../claude/claude-enterprise-2026.md) |
| Claude Agent SDK — multi-agent code, durable state, observability | [Agent SDK Production](../claude/claude-agent-sdk-production.md) |
| Claude model pricing, capability matrix, selection guide | [Models 2026](../claude/claude-models-2026.md) |
| Constitutional AI, four-tier priority, harm categories | [Constitutional AI & Safety](../claude/constitutional-ai-safety-2026.md) |
| GitHub Copilot Business/Enterprise, AI Credits, MCP servers | [GitHub Copilot](../github-copilot/index.md) |
| Enterprise Architecture strategy, frameworks, ARB | [Enterprise Architecture](../../enterprise-architecture/index.md) |
| AI agent evaluation framework and AIDLC | [AI Development](../../ai-development/index.md) |
| AI cost modeling and cloud cost comparison | [AI Economics](../../ai-economics/index.md) |
| Knowledge engineering, RAG, vector stores | [Knowledge & RAG](../../knowledge-engineering/knowledge/index.md) |

---

## Quick Decision Reference

:::tip Not sure where to start?
    - **New to AI architecture** → Start with [Foundations](enterprise-ai-architect-foundations.md), sections 1–5
    - **Designing a specific system** → Go to [Architecture Patterns](enterprise-ai-architecture-patterns.md) and use the pattern selection guide
    - **Audit/compliance question** → [Governance & Compliance](enterprise-ai-governance-compliance.md)
    - **Preparing for CCA-F or an architecture review** → [Skills Assessment](enterprise-ai-skills-assessment.md)
    - **Securing agent deployments (OWASP, identity, SPIFFE)** → [Agentic AI Security & Identity](agentic-ai-security-identity.md)
    - **Full threat catalog (18 threats), guardrail layers (14 layers), how tech giants implement** → [Security Architecture & Guardrails](agentic-ai-security-guardrails.md)
    - **MCP/A2A protocols, registries, multi-agent governance** → [Agent Interoperability & Orchestration](agent-interoperability-orchestration.md)
    - **Policy-as-code, EA-as-context, SLM-first strategy** → [Machine-Readable EA](machine-readable-ea.md)
    - **Production reliability, observability dashboards, SLOs, governance registries** → [Reliability, Observability & Governance](agentic-ai-reliability-observability-governance.md)
    - **Avoiding retry storms, context overflow, hallucination cascades (anti-patterns)** → [Reliability, Observability & Governance §1b](agentic-ai-reliability-observability-governance.md#1b-the-8-reliability-anti-patterns-to-eliminate-first)
    - **Designing the agent loop, choosing an orchestration pattern, task lifecycle** → [AI Harness & Orchestration](ai-harness-architecture-orchestration.md)
    - **MCP 2026-07-28 migration, A2A federation, protocol adoption roadmap** → [MCP & A2A Deep Dive](mcp-a2a-protocol-deep-dive.md)
    - **Memory stores, GDPR erasure, compaction, plan governance** → [Memory & Planning Architecture](agent-memory-planning-architecture.md)
    - **Agent identity chain, token doctrine, authorization composite, AI gateway design** → [Communication, Identity & Gateway](agent-communication-identity-gateway.md)
    - **Industry reference architectures, framework selection, maturity model, migration roadmap** → [Reference Architectures & Checklists](enterprise-agent-reference-architectures.md)

---

## At a Glance: Model Landscape (2026)

| Model | Pricing (in/out per MTok) | Best for |
|-------|--------------------------|----------|
| Claude Fable 5 | $10 / $50 | Complex reasoning, multi-step agents, high-stakes decisions |
| Claude Sonnet 5 | $2 / $10 (intro through Aug 31, 2026; $3 / $15 from Sept 1, 2026) | Balanced capability/cost, most enterprise workloads |
| Claude Opus 4.8 | $5 / $25 (Fast mode $10 / $50, research preview) | Extended thinking, research, adversarial robustness |
| Claude Sonnet 4.6 | $3 / $15 | Existing integrations, stable baseline (currently costs more than Sonnet 5 intro pricing) |
| Claude Haiku 4.5 | Low cost | High-volume routing, classification, simple extraction |
| GitHub Copilot Business | $19/user/month | Team-level code generation, IDE integration |
| GitHub Copilot Enterprise | $39/user/month | Org knowledge base, AI Credits pooling, custom MCP |

:::note Copilot billing
    GitHub Copilot moved to AI Credits usage-based billing on June 1, 2026 — seat prices include pooled monthly credits, with $0.01/credit overage (2× promotional credits through Aug 2026).

---

## Platform Availability

Claude is available across all major enterprise cloud platforms:

- **AWS Bedrock** — Native integration, VPC endpoints, IAM auth, Guardrails
- **Claude Platform on AWS** — Anthropic-operated, AWS Marketplace/CCU billing, same-day API parity
- **Google Vertex AI** — Anthropic models on Vertex, VPC-SC, Cloud Audit Logs
- **Microsoft Foundry** — Claude via Azure Marketplace, Entra ID auth, Azure Monitor
- **Anthropic API direct** — Highest feature velocity, direct SLA, Batch API

MCP: 10,000+ public MCP servers, ~110M monthly SDK downloads; governed by the Linux Foundation's Agentic AI Foundation since Dec 2025. Stateless 2026 RC specification, Extensions and Tasks features. For agent-to-agent interoperability, MCP is paired with A2A v1.0 (Linux Foundation, April 2026, 150+ organizations).
