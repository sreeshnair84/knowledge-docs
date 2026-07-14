---
title: "Part 7 — AI Platform Operating Model"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
tags: ["ai-platform", "platform-engineering", "self-service-ai", "agent-platform", "inference-platform", "developer-experience"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 7 — AI Platform Operating Model

> **Report Context:** Part 7 of the [Enterprise AI Research Report](./index). Authoritative guides are in the **Agentic Systems / Platform** and **Cloud Platforms** sections — this page orients you across the full AI platform landscape.

---

## What Is an AI Platform?

An enterprise AI platform is the **shared infrastructure layer** that enables every team in the organisation to build, deploy, operate, and govern AI capabilities without reinventing core components. It is analogous to the cloud platform (shared compute, networking, storage) but purpose-built for AI workloads.

A mature AI platform provides:
- **Self-service access** to AI capabilities via APIs and developer portals
- **Shared infrastructure** (inference, embedding, vector stores, memory)
- **Governance guardrails** baked in (guardrails, policy enforcement, audit logging)
- **Observability** across all AI usage enterprise-wide
- **Cost management** with metered consumption and chargeback

---

## Platform Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                 DEVELOPER EXPERIENCE LAYER               │
│         Developer Portal · SDKs · Self-Service APIs      │
├───────────────┬────────────────┬────────────────────────┤
│  APPLICATION  │   GOVERNANCE   │    OBSERVABILITY        │
│  SERVICES     │   SERVICES     │    SERVICES             │
│               │                │                         │
│ Agent Runtime │ Guardrail Svc  │ Logging & Tracing       │
│ Workflow Orch │ Policy Engine  │ AI Observability        │
│ Memory Svc    │ Evaluation Svc │ AI FinOps               │
│ Tool Registry │ Content Mod    │                         │
├───────────────┴────────────────┴────────────────────────┤
│                  KNOWLEDGE LAYER                          │
│  Knowledge Service · Vector DB · Context Svc · Doc Proc  │
├──────────────────────────────────────────────────────────┤
│                  FOUNDATION LAYER                         │
│  Inference Service · Embedding Service · Model Registry  │
├──────────────────────────────────────────────────────────┤
│                  SECURITY LAYER                           │
│   AI Identity · Secrets Service · Prompt Service         │
├──────────────────────────────────────────────────────────┤
│                  INFRASTRUCTURE LAYER                     │
│  GPU Cluster · Cloud AI Services · Fine-Tuning Service   │
└──────────────────────────────────────────────────────────┘
```

For the full service specification of each layer, see [Part 10 — AI Service Catalog](./part-10-service-catalog).

---

## Platform Team Operating Model

### Team Structure

```
Head of AI Platform Engineering
    │
    ├── Foundation Platform Squad
    │     Inference service, model routing, GPU management, model registry
    │
    ├── Knowledge Platform Squad
    │     RAG service, vector DB, document processing, context service
    │
    ├── Agent Platform Squad
    │     Agent runtime, memory service, tool registry, workflow orchestration
    │
    ├── Governance & Security Squad
    │     Guardrails, policy engine, content moderation, AI identity
    │
    ├── Observability & FinOps Squad
    │     Logging, tracing, AI observability dashboards, cost management
    │
    └── Developer Experience Squad
          Developer portal, SDKs, documentation, onboarding support
```

### Platform Team Responsibilities

| Responsibility | Description |
|---------------|-------------|
| **Build & operate shared services** | Own every service in the [Service Catalog](./part-10-service-catalog) |
| **Define standards** | API design, security standards, observability requirements |
| **Enable self-service** | Developer portal, self-service provisioning, documentation |
| **Enforce governance** | Guardrails, policy engine, audit logging built into platform |
| **Manage costs** | FinOps tooling, cost attribution, optimisation recommendations |
| **Drive adoption** | Onboarding programmes, developer advocacy, inner-source community |
| **Vendor management** | LLM providers, vector DB vendors, inference hardware |

---

## Internal AI Platform vs External Cloud AI Services

| Decision | Use Internal Platform | Use External Cloud AI Services Directly |
|----------|----------------------|-----------------------------------------|
| **Governance control needed** | High | Standard cloud controls sufficient |
| **Multi-cloud / model portability** | Required | Single cloud acceptable |
| **Cost optimisation** | Centrally managed | Per-team responsibility |
| **Custom guardrails** | Enterprise-specific requirements | Standard moderation sufficient |
| **Team size** | >10 AI teams | <5 AI teams |
| **Build vs buy** | Build shared platform (scale economics) | Buy as-a-service (speed) |

**Recommendation:** Enterprises with >10 AI teams benefit from an internal platform layer. Below that threshold, direct cloud AI services + lightweight governance tooling is more cost-effective.

---

## Platform Maturity Levels

| Level | Platform Capability | Self-Service? | Governance Coverage |
|-------|--------------------|--------------|--------------------|
| **L1 — Ad Hoc** | Direct LLM API access per team; no shared platform | No | Manual |
| **L2 — Shared Gateway** | AI gateway providing rate limiting, logging, cost tracking | Partial | API key + audit log |
| **L3 — Managed Services** | Inference, embedding, RAG as managed services | Yes (API) | Guardrails + policy |
| **L4 — Full Platform** | All services in the catalog; developer portal; self-service | Yes (portal) | Full automated governance |
| **L5 — AI-Native Platform** | Platform is the AI operating fabric; constitutional governance | Native | Constitutional |

---

## Key Design Principles

1. **Self-service over gated requests** — any team should be able to provision AI capability without raising a ticket
2. **Governance by design** — guardrails, logging, and policy enforcement are automatic, not optional
3. **Abstraction over lock-in** — the platform abstracts the underlying LLM vendor; swap vendors without changing consumer APIs
4. **Metered consumption** — every API call is attributed to a team and use case for cost visibility
5. **Developer experience first** — if developers don't love using the platform, they'll work around it

---

## Cloud Mapping

| Enterprise Platform Component | AWS | Azure | GCP |
|------------------------------|-----|-------|-----|
| AI Gateway / Inference | Bedrock + API Gateway | Azure OpenAI + APIM | Vertex AI + API Gateway |
| Agent Runtime | Bedrock AgentCore | Azure AI Foundry | Vertex AI Agents |
| Vector Database | OpenSearch / Pinecone | Azure AI Search | Vertex AI Vector Search |
| Knowledge Service | Bedrock Knowledge Bases | Azure AI Search + Azure OpenAI | Vertex AI RAG Engine |
| Workflow Orchestration | Step Functions / Temporal | Logic Apps | Cloud Workflows |
| Observability | CloudWatch + X-Ray | Azure Monitor | Cloud Trace + Monitoring |
| AI FinOps | Cost Explorer + Bedrock metrics | Azure Cost Management | Cloud Billing + Vertex metrics |
| Guardrails | Bedrock Guardrails | Azure Content Safety | Vertex AI Safety |
| Identity (agents) | IAM Roles / Cognito | Entra ID Managed Identity | Service Accounts / Workload Identity |

---

## Authoritative Guides

| Guide | What It Covers |
|-------|---------------|
| [Agentic Platform Overview](../agentic-systems/platform/index) | Platform services, team structure |
| [Multi-Tenant Agent Platform Architecture](../agentic-systems/platform/MultiTenantAgentPlatform_Architecture) | Architecture for multi-tenant AI |
| [AI Platform Factory Runbook](../agentic-systems/platform/ai-platform-factory-runbook-v2) | Implementation runbook |
| [Enterprise PromptOps](../agentic-systems/platform/Enterprise_PromptOps_AWS_AgentCore_2026) | Prompt platform deep dive |
| [Enterprise AI Gateway](../cloud-platforms/ai-gateway/Enterprise_AI_Gateway) | AI gateway design and operation |
| [AI MSF Requirements Runbook](../agentic-systems/platform/ai-msf-requirements-runbook) | Microsoft AI platform requirements |
| [AWS Strands AgentCore](../cloud-platforms/aws/agentcore_strands_deep_research_report) | AWS-specific platform implementation |

---

## Related Parts

- [Part 2](./part-02-operating-models) — Operating model for the platform team
- [Part 10](./part-10-service-catalog) — Full service catalog with SLAs and APIs
- [Part 11](./part-11-devsecops) — DevSecOps for the platform itself
- [Part 14](./part-14-observability) — Platform observability
