---
title: "Part 10 — Enterprise AI Service Catalog"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
tags: ["service-catalog", "ai-services", "inference-service", "embedding-service", "agent-runtime", "finops", "sla"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 10 — Enterprise AI Service Catalog

> **Report Context:** Part 10 of the [Enterprise AI Research Report](./index). A complete enterprise AI service catalog — every AI platform service with consumers, SLAs, ownership, APIs, and chargeback model.

---

## Purpose of the AI Service Catalog

The Enterprise AI Service Catalog is the **definitive list of AI platform capabilities available for consumption** by product teams, business units, and external partners. It defines:

- **What** each service does
- **Who** can consume it
- **How** to access it (APIs, SDKs, self-service portals)
- **What quality** is guaranteed (SLAs, SLOs)
- **Who owns** it (service owner, support contacts)
- **What it costs** (pricing, chargeback model)

The catalog is managed by the AI Platform team, published in the enterprise developer portal, and updated quarterly (or when new services are added or retired).

---

## Service Catalog Overview

```
AI Service Catalog
│
├── Foundation Services
│   ├── 01 Inference Service
│   ├── 02 Embedding Service
│   ├── 03 Fine-Tuning Service
│   └── 04 Model Registry
│
├── Knowledge & Context Services
│   ├── 05 Knowledge Service (RAG-as-a-Service)
│   ├── 06 Vector Database Service
│   ├── 07 Context Service
│   └── 08 Document Processing Service
│
├── Agent Services
│   ├── 09 Agent Runtime Service
│   ├── 10 Memory Service
│   ├── 11 Tool Registry & MCP Service
│   └── 12 Workflow Orchestration Service
│
├── Governance & Safety Services
│   ├── 13 Guardrail Service
│   ├── 14 Content Moderation Service
│   ├── 15 Evaluation Service
│   └── 16 Policy Engine Service
│
├── Identity & Security Services
│   ├── 17 AI Identity Service
│   ├── 18 Prompt Service (versioned management)
│   └── 19 Secrets & Credential Service
│
└── Observability & FinOps Services
    ├── 20 Logging & Tracing Service
    ├── 21 AI Observability Service
    └── 22 AI FinOps Service
```

---

## Service Definitions

### 01 — Inference Service

**Description:** Managed LLM inference API that provides access to approved foundation models with enterprise-grade reliability, security, and cost management.

**What It Provides**
- Single API endpoint for all approved LLMs (routing abstraction)
- Model aliasing: `enterprise/chat-standard` → routes to best available model
- Automatic fallback routing if primary model is unavailable
- Token counting and budget enforcement
- Rate limiting per team/use case
- Request logging and audit trail

**Consumers**
- AI Engineers building chat, copilot, and generation features
- AgentOps Engineers deploying agents
- ML Engineers integrating LLMs into ML pipelines

**API Pattern**
```
POST /v1/inference/completions
Authorization: Bearer {team-api-key}
X-Use-Case-ID: UC-2026-0234
X-Budget-Code: TEAM-FINANCE-AI

{
  "model": "enterprise/chat-standard",
  "messages": [...],
  "max_tokens": 2000,
  "temperature": 0.1
}
```

**SLA**

| Metric | Standard Tier | Premium Tier |
|--------|--------------|--------------|
| Availability | 99.5% | 99.9% |
| p50 latency (first token) | <500ms | <200ms |
| p95 latency (first token) | <2s | <800ms |
| p99 latency (first token) | <5s | <2s |
| Max tokens/request | 128K | 1M |
| Throughput | 100 RPM | 1000 RPM |

**Ownership**
- Service Owner: AI Platform Engineering Lead
- Support: platform-ai@enterprise.com | #ai-platform Slack
- On-call: AI Platform On-call rotation

**Pricing & Chargeback**
- Input tokens: $0.002 per 1K tokens (blended, varies by underlying model)
- Output tokens: $0.008 per 1K tokens (blended)
- Charged to team cost centre monthly

**Cloud Mapping**

| Enterprise Abstraction | AWS | Azure | GCP |
|-----------------------|-----|-------|-----|
| Inference Service | Bedrock Runtime + API Gateway | Azure OpenAI + APIM | Vertex AI + API Gateway |

---

### 02 — Embedding Service

**Description:** API for converting text, documents, and data into vector embeddings using enterprise-approved embedding models.

**What It Provides**
- Text → vector embedding (single string and batch)
- Document → vector embedding with chunking
- Multimodal embedding (text + image, where supported)
- Embedding model versioning (ensures consistency within an index)
- Batch embedding for large-scale indexing jobs

**Consumers**
- Knowledge Engineers building document indexes
- AI Engineers building semantic search features
- Data Scientists building semantic similarity applications

**API Pattern**
```
POST /v1/embeddings
{
  "input": ["text to embed", "another text"],
  "model": "enterprise/embedding-standard",
  "dimensions": 1536
}
```

**SLA**

| Metric | Value |
|--------|-------|
| Availability | 99.5% |
| p95 latency (single string) | <200ms |
| Batch throughput | 10,000 strings/minute |
| Max string length | 8,192 tokens |
| Batch size | 2,048 strings per request |

**Pricing**
- $0.0001 per 1K tokens embedded
- Batch jobs: 50% discount (processed asynchronously)

---

### 03 — Fine-Tuning Service

**Description:** Managed fine-tuning pipeline to adapt approved base models to enterprise-specific domains, style, or tasks.

**What It Provides**
- PEFT/LoRA fine-tuning on approved base models
- Fine-tuning job management (queue, monitor, cancel)
- Training data validation (format, size, PII check)
- Evaluation on enterprise benchmark before deployment
- Fine-tuned model registry entry on completion

**Consumers**
- ML Engineers and AI Engineers with specific domain adaptation needs
- Requires approval from AI Governance Board for production use of fine-tuned models

**SLA**
- Job start SLA: <30 minutes after submission
- Fine-tuning job duration: 2–72 hours depending on dataset size
- Fine-tuned model deployment: within 24 hours of evaluation pass

**Pricing**
- GPU compute: $2.50 per A100 GPU-hour (internal rate)
- Storage for training data: $0.023/GB/month

---

### 04 — Model Registry

**Description:** Central registry of all AI models approved for enterprise use — foundation models, fine-tuned models, specialist models, and embedding models.

**What It Provides**
- Model catalog: approved models with metadata, capabilities, constraints
- Model versioning and lineage tracking
- Model card storage (vendor + enterprise supplemented)
- Model approval status (pending, approved, deprecated, retired)
- Model usage analytics

**Consumers**
- AI Architects selecting models for new use cases
- AI Governance Officers tracking the model portfolio
- AI Platform Engineers configuring model routing

**API Pattern**
```
GET /v1/models
GET /v1/models/{model-id}
GET /v1/models/{model-id}/card
GET /v1/models?capability=coding&status=approved
```

**SLA**
- Read availability: 99.9%
- Registry update (new model registration): within 1 business day of approval

---

### 05 — Knowledge Service (RAG-as-a-Service)

**Description:** Managed retrieval-augmented generation service. Teams provide a collection of approved documents; the Knowledge Service handles ingestion, embedding, indexing, retrieval, and integration with the Inference Service.

**What It Provides**
- End-to-end RAG pipeline: upload documents → get retrieval-augmented answers
- Configurable chunking strategies (semantic, fixed-size, hierarchical)
- Hybrid retrieval (dense + sparse + re-ranking)
- Citation and source attribution in responses
- Access-controlled retrieval (users only retrieve from permitted sources)
- Knowledge base versioning

**Consumers**
- Product teams building Q&A features on enterprise documents
- Business units wanting to expose policies/procedures to employees
- Customer service teams building product knowledge assistants

**API Pattern**
```
# Knowledge base management
POST /v1/knowledge-bases                    # Create knowledge base
POST /v1/knowledge-bases/{id}/documents     # Ingest documents
GET  /v1/knowledge-bases/{id}/documents     # List documents

# Retrieval (used directly or via Inference Service integration)
POST /v1/knowledge-bases/{id}/retrieve      # Retrieve relevant chunks
POST /v1/knowledge-bases/{id}/query         # RAG query (retrieve + generate)
```

**SLA**

| Metric | Value |
|--------|-------|
| Query availability | 99.5% |
| p95 query latency (retrieve + generate) | <3s |
| Document ingestion latency | <60s per document |
| Max knowledge base size | 10M documents |
| Max document size | 100MB |

**Pricing**
- Storage: $0.25/GB/month (includes vector index)
- Queries: $0.005 per query (includes retrieval + generation)
- Ingestion: $0.001 per document

---

### 06 — Vector Database Service

**Description:** Managed vector database providing scalable, low-latency approximate nearest-neighbour (ANN) search for AI applications.

**What It Provides**
- Managed vector index (HNSW, IVF, ScaNN options)
- Metadata filtering alongside vector search
- Namespace-based multi-tenancy
- RBAC on namespaces
- Batch upsert and real-time upsert
- Automatic index optimisation

**Consumers**
- Knowledge Engineers building custom retrieval systems
- AI Engineers building semantic search, recommendation systems
- ML Engineers building embedding-based classification

**API Pattern**
```
POST /v1/vector/upsert       # Insert/update vectors
POST /v1/vector/query        # ANN search
DELETE /v1/vector/delete     # Delete vectors
GET  /v1/vector/stats        # Index statistics
```

**SLA**

| Metric | Value |
|--------|-------|
| Write availability | 99.5% |
| Query availability | 99.9% |
| p95 query latency (<1M vectors) | <50ms |
| p95 query latency (<100M vectors) | <100ms |
| Max vectors per namespace | 1 billion |
| Max vector dimensions | 4096 |

**Cloud Mapping**

| Enterprise Service | AWS | Azure | GCP |
|-------------------|-----|-------|-----|
| Vector DB Service | OpenSearch Serverless / Pinecone | Azure AI Search | Vertex AI Vector Search |

---

### 07 — Context Service

**Description:** Manages context assembly for AI requests — selecting, prioritising, compressing, and formatting context to fit within model context windows efficiently.

**What It Provides**
- Dynamic context assembly (select most relevant context from multiple sources)
- Context compression (summarise long contexts to reduce tokens)
- Context prioritisation (rank context by relevance and recency)
- Conversation history management (store, retrieve, summarise)
- Token budget management (ensure total context fits window with headroom)

**Consumers**
- AI Engineers building long-context or multi-turn applications
- AgentOps Engineers managing agent context across long task horizons

---

### 08 — Document Processing Service

**Description:** Extracts structured data and text from unstructured documents (PDF, DOCX, images, HTML, spreadsheets) for use in AI pipelines.

**What It Provides**
- Text extraction (OCR for scanned documents, direct parsing for digital)
- Layout analysis (tables, headers, sections, footnotes)
- Metadata extraction (author, date, document type, version)
- PII detection and redaction
- Entity extraction (names, dates, amounts, product codes)
- Document classification (categorise by type, topic, department)

**SLA**
- Synchronous extraction (< 50 pages): <10s p95
- Asynchronous extraction (50–1000 pages): <5 minutes p95

**Pricing**
- $0.01 per page processed

---

### 09 — Agent Runtime Service

**Description:** Managed execution environment for AI agents — providing compute, tool access, memory integration, lifecycle management, and observability.

**What It Provides**
- Agent execution containers (isolated, sandboxed)
- Tool call routing and rate limiting
- Agent health monitoring (loop detection, runaway prevention)
- HITL escalation queue integration
- Agent session management (start, pause, resume, terminate)
- Multi-agent orchestration support (spawn sub-agents, aggregate results)
- Audit log for every agent action

**Consumers**
- AgentOps Engineers deploying autonomous agents
- AI Engineers integrating agent capabilities into products

**SLA**

| Metric | Value |
|--------|-------|
| Agent start time | <5s |
| Maximum concurrent agents | Quota-based per team |
| Task execution timeout | Configurable (max 24h) |
| Tool call latency overhead | <50ms |
| Emergency shutdown latency | <2s |

**Pricing**
- $0.05 per agent-minute (compute + orchestration)
- Tool calls: pass-through cost of underlying API

---

### 10 — Memory Service

**Description:** Persistent memory storage for AI agents and conversational AI — enabling recall across sessions, learning from interactions, and maintaining user/task context over time.

**What It Provides**

| Memory Type | Description | Storage Backend |
|-------------|-------------|----------------|
| **Working Memory** | Current session context | In-memory (Redis) |
| **Episodic Memory** | Past interaction history | Vector DB + structured store |
| **Semantic Memory** | Learned facts about entities (users, accounts, products) | Knowledge Graph + Vector DB |
| **Procedural Memory** | Learned task patterns and workflows | Document store |

- Memory read/write APIs
- Memory expiry and retention management
- Privacy controls: user-controlled memory deletion
- Access control: agents can only read their own memories + permitted shared memories

**API Pattern**
```
POST /v1/memory/{agent-id}/write     # Store a memory
GET  /v1/memory/{agent-id}/recall    # Retrieve relevant memories
DELETE /v1/memory/{user-id}          # User privacy deletion
```

**Pricing**
- Episodic/Semantic memory: $0.15/GB/month (includes vector index)
- Working memory: included in Agent Runtime Service

---

### 11 — Tool Registry & MCP Service

**Description:** Central registry of approved tools and MCP (Model Context Protocol) servers that agents and AI features are permitted to use.

**What It Provides**
- Tool catalog: approved tools with schemas, rate limits, permissions
- MCP server hosting and routing
- Tool approval workflow integration
- Tool usage analytics and cost tracking
- Tool health monitoring
- Tool versioning and deprecation management

**Consumers**
- AI Engineers registering new tools for agent use
- AgentOps Engineers configuring agent tool access
- AI Security Engineers auditing tool permissions

**API Pattern**
```
GET  /v1/tools                           # Browse tool catalog
GET  /v1/tools/{tool-id}                 # Tool definition (OpenAPI/MCP schema)
POST /v1/tools/{tool-id}/invoke          # Direct tool invocation (for testing)
GET  /v1/mcp-servers                     # Available MCP servers
```

---

### 12 — Workflow Orchestration Service

**Description:** Long-running, durable workflow execution for multi-step AI processes — ensuring reliability, state persistence, and human handoff in complex AI workflows.

**What It Provides**
- Durable workflow execution (survives infrastructure failures)
- State management across multi-step processes
- Timer and schedule-based triggers
- HITL approval gates
- Compensating transaction support (saga pattern for rollback)
- Workflow visualisation and monitoring

**Technology Mapping**

| Enterprise Service | AWS | Azure | GCP |
|-------------------|-----|-------|-----|
| Workflow Orchestration | Step Functions / Temporal | Logic Apps / Durable Functions | Workflows / Cloud Run Jobs |

---

### 13 — Guardrail Service

**Description:** Real-time safety and compliance layer that sits between AI inputs/outputs and the underlying model — detecting and blocking harmful, non-compliant, or policy-violating content.

**What It Provides**

| Guardrail Type | Description |
|---------------|-------------|
| **PII Detection** | Identify and optionally redact personal data in inputs and outputs |
| **Toxicity Detection** | Block harmful, offensive, or discriminatory content |
| **Prompt Injection Detection** | Identify and block adversarial prompt injection attempts |
| **Topic Restriction** | Block responses on prohibited topics (e.g., competitors, legal advice) |
| **Output Validation** | Validate AI output format, length, and content against schema |
| **Regulatory Filter** | Apply financial, medical, or legal disclaimers; block unlicensed advice |
| **Confidentiality Filter** | Block leakage of trade secrets, internal data, or restricted information |

**API Integration**
```
# Typically invoked as middleware in the inference pipeline

POST /v1/guardrails/check/input     # Check request before sending to LLM
POST /v1/guardrails/check/output    # Check LLM response before returning to user
```

**SLA**
- p95 latency: <50ms (must not add significant latency to inference path)
- Availability: 99.9% (blocking service; unavailability blocks all AI)

**Pricing**
- Included in Inference Service cost (no separate charge)

---

### 14 — Content Moderation Service

**Description:** Asynchronous content review service for AI-generated content that needs human review or automated classification before use (e.g., marketing content, customer communications).

**What It Provides**
- Automated moderation: classify content by risk level
- Human review queue: route flagged content to human moderators
- Confidence scores and explanation for moderation decisions
- Moderation audit trail
- Appeals workflow

**SLA**
- Automated moderation: <200ms
- Human review queue: <4 hours (business hours)

---

### 15 — Evaluation Service

**Description:** Automated evaluation pipeline for measuring AI system quality — running benchmark tests, tracking quality over time, and detecting regressions.

**What It Provides**
- Evaluation test suite management (create, version, run)
- Metric library (accuracy, faithfulness, relevance, coherence, safety, bias)
- LLM-as-judge evaluation (using a designated judge model to evaluate AI outputs)
- Regression detection (alert when quality drops vs. baseline)
- Evaluation reports and dashboards
- Human annotation queue integration

**API Pattern**
```
POST /v1/evaluations                        # Create evaluation run
GET  /v1/evaluations/{eval-id}              # Get results
POST /v1/evaluations/suites                 # Create test suite
GET  /v1/evaluations/suites/{id}/history    # Historical quality trend
```

**SLA**
- Evaluation run start: <60s
- Standard eval run (100 test cases): <10 minutes
- Large eval run (1000 test cases): <90 minutes

**Pricing**
- $0.001 per evaluation case
- LLM-as-judge: billed as Inference Service usage

---

### 16 — Policy Engine Service

**Description:** Runtime policy enforcement service that applies enterprise AI policies to agent actions, tool calls, and data access requests — ensuring all AI behaviour complies with defined policies.

**What It Provides**
- Policy as code (OPA-based): define policies in Rego
- Real-time policy evaluation for agent action requests
- Policy versioning and audit trail
- Policy testing environment (simulate policy decisions before deployment)
- Policy violation alerting and logging

**Use Cases**
- Prevent agent from accessing data outside user's authorisation scope
- Enforce spending limits on autonomous agents
- Block tool calls that violate compliance policies
- Require HITL approval for high-risk agent actions

**SLA**
- Policy evaluation latency: <20ms p99 (must not bottleneck agent execution)
- Availability: 99.99% (if unavailable, configured fail-open or fail-closed per policy)

---

### 17 — AI Identity Service

**Description:** Identity and authorisation service for AI agents — issuing workload identities, managing credentials, and enforcing least-privilege access for AI components.

**What It Provides**
- Agent identity issuance (SPIFFE/SPIRE workload identities)
- OAuth 2.0 tokens for agent API access
- Credential rotation automation
- Service-to-service authentication for MCP and A2A
- Identity audit trail

**Standards Supported:** SPIFFE, OIDC, OAuth 2.0, mTLS

---

### 18 — Prompt Service

**Description:** Versioned prompt management service — the authoritative registry for all approved system prompts, with versioning, A/B testing, and deployment management.

**What It Provides**
- Prompt Registry: store, version, and retrieve system prompts
- Prompt deployment: link prompt versions to feature/model versions
- A/B testing: route traffic between prompt versions; measure quality metrics
- Hot-swap: update prompts without redeployment of application code
- Prompt audit trail: who changed what, when, why

**API Pattern**
```
GET  /v1/prompts/{prompt-id}/active         # Get currently active prompt version
GET  /v1/prompts/{prompt-id}/{version}      # Get specific version
POST /v1/prompts/{prompt-id}/deploy         # Deploy a version to production
POST /v1/prompts/{prompt-id}/ab-test        # Configure A/B test
```

---

### 19 — Secrets & Credential Service

**Description:** Secure storage and rotation of secrets used by AI systems — API keys, connection strings, fine-tuned model credentials.

**What It Provides**
- Encrypted secrets storage (HSM-backed)
- Automatic secret rotation
- Just-in-time secret injection (secrets never stored in code or config files)
- Secret access audit trail
- Break-glass emergency access procedure

**Technology Mapping**

| Enterprise Service | AWS | Azure | GCP |
|-------------------|-----|-------|-----|
| Secrets Service | AWS Secrets Manager | Azure Key Vault | Secret Manager |

---

### 20 — Logging & Tracing Service

**Description:** Centralised collection and storage of all AI system logs and distributed traces — enabling debugging, audit, compliance, and root cause analysis.

**What It Provides**
- Structured logging for all AI API calls
- Distributed tracing across multi-step AI workflows (OpenTelemetry)
- Prompt/response logging (with PII masking by default)
- Tool call logging for agents
- Log retention management (configurable; default 90 days)
- Log-based alerting

**Compliance Note:** In regulated industries (finance, healthcare), AI logs may be subject to 7-year retention requirements. Configure extended retention for affected use cases.

---

### 21 — AI Observability Service

**Description:** Real-time dashboard and analytics for AI system health, quality, cost, and business impact.

**What It Provides**

| Dashboard | Metrics |
|-----------|---------|
| **Model Health** | Availability, latency, error rate, token throughput |
| **Quality** | Evaluation scores, hallucination rate, user feedback |
| **Cost** | Token spend by team/feature/model, trend vs. budget |
| **Agent Health** | Task completion, human handoff rate, tool error rate |
| **Knowledge Health** | Retrieval hit rate, knowledge coverage, freshness |
| **Business** | Use case KPIs, ROI dashboard, adoption metrics |
| **Drift** | Model drift, prompt drift, knowledge drift, data drift |

**SLA**
- Dashboard data freshness: <5 minutes
- Alerting latency: <2 minutes from event to alert

**Technology Mapping**

| Enterprise Service | AWS | Azure | GCP |
|-------------------|-----|-------|-----|
| AI Observability | CloudWatch + Bedrock Metrics | Azure Monitor + AI Foundry | Cloud Monitoring + Vertex |
| Supplementary | Arize Phoenix / Langfuse | Arize Phoenix / Langfuse | Arize Phoenix / Langfuse |

---

### 22 — AI FinOps Service

**Description:** Cost visibility, allocation, optimisation, and chargeback management for all enterprise AI expenditure.

**What It Provides**
- Real-time cost dashboards by team, use case, model, and feature
- Budget alerts and enforcement (soft warn / hard limit per team)
- Cost attribution (chargeback reports per cost centre)
- Optimisation recommendations (model routing, caching, batch vs. real-time)
- Month-end chargeback report generation
- Show-back (visibility without actual charge) for teams onboarding to AI

**Pricing Optimisation Capabilities**
| Optimisation | Typical Saving |
|-------------|---------------|
| Semantic caching (avoid duplicate LLM calls) | 10–40% |
| Model routing (use smaller model when sufficient) | 20–50% |
| Prompt compression (reduce input tokens) | 10–30% |
| Batch inference (async jobs, off-peak) | 30–60% |
| Right-sizing (avoid over-specified models) | 15–40% |
| Context length management | 10–25% |

---

## Service Tier Summary

| Service | Tier | Availability | p95 Latency | Chargeback Model |
|---------|------|-------------|-------------|-----------------|
| Inference (Standard) | Standard | 99.5% | <2s first token | Per 1K tokens |
| Inference (Premium) | Premium | 99.9% | <800ms first token | Per 1K tokens (+50%) |
| Embedding | Standard | 99.5% | <200ms | Per 1K tokens |
| RAG Query | Standard | 99.5% | <3s | Per query |
| Vector DB | Standard | 99.9% | <100ms | Per GB stored + per query |
| Agent Runtime | Standard | 99.5% | <5s start | Per agent-minute |
| Guardrails | Critical | 99.9% | <50ms | Included in Inference |
| Policy Engine | Critical | 99.99% | <20ms | Included in Agent Runtime |
| Evaluation | Batch | Best effort | <90m per 1K cases | Per eval case |
| Observability | Standard | 99.5% | <5m data freshness | Included in platform |

---

## Service Catalog Governance

### Service Lifecycle
```
[Proposal] → [Design Review] → [Security Review] → [Pilot] → [GA] → [Deprecated] → [Retired]
```

### Adding a New Service
1. Service owner submits Service Design Document (SDD) to AI Platform ARB
2. AI Platform ARB reviews: duplication check, architecture fit, security, cost
3. Security review (CISO approval for services handling sensitive data)
4. Pilot with 2–3 consumer teams; collect feedback
5. General Availability (GA) launch with documentation and support SLA
6. Service registered in Developer Portal and Service Catalog

### Service Deprecation
- 6-month notice period minimum for consumer teams
- Migration guide provided for replacement service
- Extended support available (on request, may be chargeable)

---

## Developer Portal

All services are documented in the Enterprise AI Developer Portal, which provides:
- Service catalog with live availability status
- API documentation (OpenAPI spec for each service)
- Getting-started guides and code samples (Python, TypeScript, Java)
- Cost calculator (estimate spend before committing)
- Self-service API key provisioning
- Support ticket integration

---

## Related Resources

- [Part 7 — AI Platform Operating Model](./index#part-7) — Platform team ownership of these services
- [Part 9 — AI Operating Processes](./part-09-operating-processes) — Service onboarding and change processes
- [Part 16 — AI Financial Operating Model](./index#part-16) — FinOps and chargeback details
- [Part 14 — AI Observability](./index#part-14) — Observability service in depth
- [AI Platform Factory Runbook](../agentic-systems/platform/ai-platform-factory-runbook-v2) — Platform implementation guide
- [Enterprise AI Gateway](../cloud-platforms/ai-gateway/Enterprise_AI_Gateway) — AI Gateway as the front door to these services
