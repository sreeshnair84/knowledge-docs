---
title: "Part 15 — Enterprise Architecture Mapping"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
source_file: ""
tags: ["enterprise-architecture", "togaf", "capability-map", "value-stream", "business-architecture", "reference-architecture"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 15 — Enterprise Architecture Mapping

> **Report Context:** Part 15 of the [Enterprise AI Research Report](./index). Authoritative guides are in the **Enterprise Architecture** section — this page provides the TOGAF-aligned AI capability map and links to the detailed architecture guides.

---

## AI in the Four Architecture Domains (TOGAF ADM)

The TOGAF Architecture Development Method (ADM) structures enterprise architecture across four domains. AI permeates all four:

---

### Business Architecture

**How AI changes the business architecture:**

| Business Capability | Without AI | With AI |
|--------------------|-----------|---------|
| Customer Service | Human agents; IVR | AI copilots, autonomous service agents |
| Risk & Compliance | Manual reviews; rule-based | AI risk scoring; automated monitoring |
| Sales & Marketing | Human-led outreach | AI-personalised; agent-managed campaigns |
| Finance & Accounting | Manual reconciliation | Autonomous agents; AI audit |
| HR & Talent | Manual screening | AI screening, coaching, workforce planning |
| Operations | Rule-based automation | Agentic process automation |
| Strategy & Planning | Human analysis | AI-augmented strategy; scenario modelling |

**Value Stream Mapping with AI:**
AI adds value at three points in any value stream:
1. **Intelligence** — better decisions (AI provides insights, recommendations)
2. **Automation** — faster execution (AI executes tasks autonomously)
3. **Personalisation** — better outcomes per customer/employee (AI tailors)

**Primary guide:** [AI Value Stream Mapping](../enterprise-architecture/ai-architecture/AI-Value-Stream-Mapping)

---

### Application Architecture

**AI-Native Application Patterns:**

| Pattern | Description | Example |
|---------|-------------|---------|
| **AI Copilot** | AI embedded in existing UI to assist human | Coding assistant, drafting assistant |
| **AI Gateway** | AI-powered processing layer between systems | Document classification before routing |
| **Autonomous Agent** | Replaces a human workflow step | Invoice approval agent, scheduling agent |
| **Multi-Agent System** | Orchestrated agents for complex workflows | Research → analysis → recommendation workflow |
| **AI-Enhanced API** | Existing API response enriched with AI | Search results re-ranked by semantic relevance |
| **Conversational Interface** | Natural language replaces structured UI | Chatbot replacing form-based portal |

**Application Architecture Principles for AI:**
- AI capability exposed as platform services (not embedded in each application)
- Applications consume AI via the [AI Service Catalog](./part-10-service-catalog)
- AI integration through event-driven architecture where possible (async, resilient)
- AI components independently deployable and rollback-capable

**Primary guide:** [Enterprise Agent Reference Architectures](../enterprise-architecture/ai-architecture/enterprise-agent-reference-architectures)

---

### Information Architecture

**AI-Specific Information Architecture:**

```
┌──────────────────────────────────────────────────────┐
│            AI INFORMATION ARCHITECTURE                │
├──────────────┬────────────────────────────────────────┤
│ LAYER        │ COMPONENTS                             │
├──────────────┼────────────────────────────────────────┤
│ Knowledge    │ Document stores, knowledge graphs,     │
│ Layer        │ ontologies, curated corpora            │
├──────────────┼────────────────────────────────────────┤
│ Vector Layer │ Embedding stores, semantic indexes,    │
│              │ multimodal indexes                     │
├──────────────┼────────────────────────────────────────┤
│ Context      │ Conversation history, session state,   │
│ Layer        │ user profiles, agent working memory    │
├──────────────┼────────────────────────────────────────┤
│ Feature      │ Computed features for ML models,       │
│ Layer        │ feature store                          │
├──────────────┼────────────────────────────────────────┤
│ Data         │ Source systems, data lake, data        │
│ Foundation   │ warehouse, streaming data              │
└──────────────┴────────────────────────────────────────┘
```

**Key information governance questions AI forces:**
- Who owns the AI training data? (and its quality, bias, privacy)
- How do we version the knowledge base? (reproducibility for audit)
- What is the authoritative source for a given domain? (RAG grounding integrity)
- How do we govern AI-generated data? (is it enterprise data? can it feed back into training?)

**Primary guide:** [Data Architecture for AI Report](../knowledge-engineering/data/Data_Architecture_for_AI_Report)

---

### Technology Architecture

**AI Technology Reference Architecture:**

```
┌───────────────────────────────────────────────────────────┐
│              ENTERPRISE AI TECHNOLOGY ARCHITECTURE         │
├────────────────────────────────────────────────────────────┤
│  PRESENTATION  │ Web / Mobile / API / Conversational UI    │
├────────────────────────────────────────────────────────────┤
│  APPLICATION   │ AI Features · Agent Applications          │
│                │ Copilots · Autonomous Workflows           │
├────────────────────────────────────────────────────────────┤
│  AI PLATFORM   │ Inference · Embedding · RAG               │
│                │ Agent Runtime · Memory · Tool Registry    │
│                │ Guardrails · Policy · Observability        │
├────────────────────────────────────────────────────────────┤
│  DATA          │ Knowledge Bases · Vector DBs · Data Lake   │
│                │ Feature Store · Streaming                  │
├────────────────────────────────────────────────────────────┤
│  COMPUTE       │ GPU Clusters · Serverless · Containers     │
│  & CLOUD       │ Multi-cloud (AWS + Azure + GCP)            │
└────────────────────────────────────────────────────────────┘
```

**Primary guide:** [Enterprise AI Architect Foundations](../enterprise-architecture/ai-architecture/enterprise-ai-architect-foundations)

---

### Security Architecture

See [Part 13](./part-13-security-model) for the complete AI security model.

**TOGAF security principles applied to AI:**
- Security by design (not bolted on): guardrails, identity, and policy baked into the AI platform
- Principle of least privilege: agents, models, and users access only what they need
- Defence in depth: multiple security controls at each architecture layer
- Secure by default: new AI services inherit security controls automatically

**Primary guide:** [Agentic AI Security Identity](../enterprise-architecture/ai-architecture/agentic-ai-security-identity)

---

### Integration Architecture

**AI Integration Patterns:**

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| **API Integration** | AI feature exposed/consumed via REST/gRPC | Standard synchronous AI features |
| **Event-Driven** | AI trigger on event; result delivered async | Async document processing, monitoring |
| **MCP (Model Context Protocol)** | Tool integration for AI agents | Agent-to-tool connections |
| **A2A (Agent-to-Agent)** | Agent delegating to sub-agents | Multi-agent orchestration |
| **Streaming** | Real-time AI inference with token streaming | Chat interfaces, live generation |
| **Batch** | Scheduled AI processing of data volumes | Bulk document processing, analysis |

**Primary guide:** [MCP & A2A Protocol Deep Dive](../enterprise-architecture/ai-architecture/mcp-a2a-protocol-deep-dive)

---

## AI Capability Map

The AI capability map organises enterprise AI capabilities into five levels:

```
Level 5 — AI-Native Operations
    Autonomous decision-making, constitutional AI, sovereign AI infrastructure

Level 4 — Agentic Capabilities
    Multi-agent orchestration, long-horizon task execution, digital workforce

Level 3 — GenAI Capabilities
    Text generation, code generation, conversation, document intelligence

Level 2 — ML Capabilities
    Prediction, classification, anomaly detection, personalisation, optimisation

Level 1 — AI Platform Foundation
    Inference, embedding, evaluation, observability, governance, security
```

Each level builds on the one below. Enterprises must build Level 1 before pursuing Level 5.

**Primary guide:** [AI Transformation Consultant Toolkit](../enterprise-architecture/specialization/AI_Transformation_Consultant_Toolkit_2026)

---

## TOGAF Concepts Applied to AI

| TOGAF Concept | AI Application |
|---------------|---------------|
| **Architecture Vision** | AI strategy: why AI? what capabilities? what outcomes? |
| **Business Architecture** | AI-enabled value streams, AI capabilities by domain |
| **Information Architecture** | Knowledge architecture, data for AI, vector layer |
| **Application Architecture** | AI application patterns, agent architectures |
| **Technology Architecture** | AI platform, infrastructure, cloud mapping |
| **Opportunities & Solutions** | AI use case portfolio, prioritisation |
| **Migration Planning** | AI transformation roadmap (see Part 17) |
| **Implementation Governance** | AI ARB, delivery governance, quality gates |
| **Architecture Change Management** | AI architecture evolution as capability matures |

---

## Authoritative Guides

| Guide | What It Covers |
|-------|---------------|
| [TOGAF10 APEX AI Platform (NexaBank)](../enterprise-architecture/framework/TOGAF10_APEX_AI_Platform_NexaBank) | TOGAF-aligned AI platform architecture |
| [Enterprise AI Architect Foundations](../enterprise-architecture/ai-architecture/enterprise-ai-architect-foundations) | All four architecture domains |
| [Enterprise Agent Reference Architectures](../enterprise-architecture/ai-architecture/enterprise-agent-reference-architectures) | Application architecture patterns |
| [AI Value Stream Mapping](../enterprise-architecture/ai-architecture/AI-Value-Stream-Mapping) | Business architecture |
| [Machine-Readable EA](../enterprise-architecture/ai-architecture/machine-readable-ea) | Integration architecture |
| [ARB Volume 3: Knowledge Management & Capability Mapping](../enterprise-architecture/architectural-review-board/Volume3_Knowledge_Management_Capability_Mapping) | Capability maps |

---

## Related Parts

- [Part 1](./part-01-evolution) — How architecture evolves at each stage
- [Part 7](./part-07-platform-operating-model) — Technology architecture (AI platform layer)
- [Part 13](./part-13-security-model) — Security architecture
- [Part 17](./part-17-transformation-roadmap) — Roadmap from current to target architecture state
