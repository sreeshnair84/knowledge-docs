---
title: "Vol 7 — Enterprise Building Blocks Architecture"
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["building-blocks", "abb", "sbb", "platform-engineering", "ai-building-blocks", "agentic-ai", "togaf"]
doc_type: handbook-volume
series_name: Enterprise Strategy & Business Architecture Handbook
series_part: 7
series_total: 10
series_index: ./index.md
---

# Vol 7 — Enterprise Building Blocks Architecture

> **Covers:** The complete enterprise building block taxonomy from TOGAF ABB/SBB theory through business, application, AI, platform engineering, and agentic AI building blocks — including selection decision matrices and catalog design patterns for enterprise architects building reusable capability foundations.

---

## Part 1 — The Building Block Concept

### 1.1 Why Building Blocks?

The most persistent problem in enterprise architecture is *not* that organizations lack good ideas. It is that they rebuild the same capabilities over and over — every business unit builds its own identity service, every product team constructs its own notification system, every AI team stands up its own vector database.

The consequence is:
- **Duplication of cost:** The same infrastructure investment made 5, 10, or 20 times
- **Inconsistency of quality:** Each rebuild produces a different quality level; some are good, most are not
- **Security fragmentation:** Each bespoke implementation has different (and usually different) security posture
- **Integration complexity:** 20 different notification services require 20 different integration patterns
- **Maintenance drag:** Every duplicate must be independently maintained, patched, and evolved

**Building blocks** solve this by defining a catalog of reusable, well-governed, composable capability units that all teams consume rather than rebuild. The result is a platform organization where the enterprise gains leverage from every investment.

### 1.2 TOGAF Building Blocks Concept

TOGAF 10 defines two types of building blocks:

**Architecture Building Block (ABB):**
- Defines a *capability* without specifying a specific implementation
- Technology-agnostic; describes what is needed, not how it is built
- Example: "Identity Provider" — the capability to authenticate users and issue tokens
- Defined during Architecture Definition (ADM Phases B–D)

**Solution Building Block (SBB):**
- A *specific implementation* of an ABB
- Names a product, service, or system that delivers the capability
- Example: "Microsoft Entra ID" — the specific identity provider selected
- Defined during Opportunities & Solutions (ADM Phase E) and Implementation Planning (Phase F)

**Building Block Hierarchy:**

```
ENTERPRISE LEVEL (Portfolio)
└── Domain ABB  (e.g., "Identity & Access Management")
    └── Capability ABB  (e.g., "Authentication Service")
        └── SBB  (e.g., "Microsoft Entra ID B2C")
            └── Configuration  (e.g., "MFA policy, token lifetime, RBAC roles")
```

### 1.3 Building Block Quality Criteria

A well-designed building block must satisfy:

| Criterion | Definition |
|-----------|------------|
| **Reusable** | Can be used by more than one consumer without modification |
| **Replaceable** | Can be swapped for a different implementation with bounded impact |
| **Self-contained** | Has clear interfaces; dependencies are explicit |
| **Well-governed** | Has a named owner, SLA, versioning policy |
| **Discoverable** | Catalogued; consumers can find and evaluate it |
| **Composable** | Can be combined with other building blocks |
| **Testable** | Can be independently verified against its specification |

### 1.4 The Building Block Catalog

A building block catalog is a governed registry of all ABBs and SBBs in the enterprise. Minimum catalog entry:

```yaml
building_block:
  id: "BB-IDENT-001"
  name: "Identity Provider"
  type: "ABB"
  domain: "Security"
  layer: "Application"
  purpose: "Authenticate users and issue tokens for resource access"
  sbbs:
    - name: "Microsoft Entra ID"
      version: "2.0"
      status: "preferred"
      sla: "99.9%"
    - name: "AWS Cognito"
      version: "latest"
      status: "approved-for-aws-only"
  owner: "Identity Platform Team"
  governance: "ARB approval required for new SBB selection"
  consumers: ["Customer Portal", "Employee Apps", "Partner APIs"]
  standards: ["OAuth 2.0", "OIDC", "SAML 2.0"]
```

---

## Part 2 — Business Building Blocks

### 2.1 Customer Management Domain

**Business Capability: Customer Data Management**

| Building Block | Purpose | Typical Implementation | Cloud-Native Option |
|----------------|---------|----------------------|---------------------|
| **Customer Profile Store** | Single source of truth for customer identity and attributes | MDM platform (Informatica, SAP MDG) | Salesforce CDP, AWS Entity Resolution |
| **Customer Data Platform (CDP)** | Unified real-time customer profile for activation | Segment, mParticle, Adobe Real-Time CDP | Salesforce Data Cloud |
| **Customer Interaction History** | Complete record of all touchpoints | CRM activity log | Salesforce Service Cloud, Dynamics 365 |
| **Customer Consent Manager** | Privacy preference and consent recording | OneTrust, TrustArc | Salesforce Privacy Center |

**Business Capability: CRM (Customer Relationship Management)**

| Building Block | Purpose | Enterprise Examples |
|----------------|---------|---------------------|
| **Sales Force Automation** | Lead, opportunity, pipeline management | Salesforce Sales Cloud, Dynamics 365 Sales |
| **Account & Contact Management** | Business relationship hierarchy | CRM core module |
| **Activity Tracking** | Calls, emails, meetings, tasks | CRM + calendar integration |
| **Forecasting Engine** | Revenue prediction and quota management | Salesforce Forecasting, Clari |

**Business Capability: Journey Orchestration**

| Building Block | Purpose | Enterprise Examples |
|----------------|---------|---------------------|
| **Journey Designer** | Visual mapping of customer journeys | Salesforce Journey Builder, Adobe Journey Optimizer |
| **Real-Time Trigger Engine** | Event-based journey activation | Braze, Iterable, Klaviyo |
| **Personalisation Engine** | Content and offer selection per customer | Adobe Target, Dynamic Yield |
| **Channel Orchestrator** | Cross-channel coordination (email, push, SMS, web) | Braze, MoEngage |

---

### 2.2 Product Management Domain

| Building Block | Purpose | Enterprise Examples |
|----------------|---------|---------------------|
| **Product Catalogue** | Master record of all products, variants, and attributes | SAP Ariba, Akeneo PIM, Salsify |
| **Pricing Engine** | Dynamic pricing rules, promotions, discounting | SAP CPQ, Zuora, Chargebee |
| **Product Configurator** | Rules-based product configuration (CPQ) | Salesforce CPQ, Oracle CPQ |
| **Product Information Management (PIM)** | Enrich and distribute product data to channels | Akeneo, Syndigo |
| **Catalogue Distribution** | Multi-channel product data publishing | Salsify, Feedonomics |

### 2.3 Order Management Domain

| Building Block | Purpose | Enterprise Examples |
|----------------|---------|---------------------|
| **Order Capture** | Accept and validate orders from all channels | OMS core, Salesforce OMS |
| **Order Orchestration** | Route, split, and sequence fulfilment | IBM Sterling, Manhattan OMS |
| **Inventory Visibility** | Real-time stock levels across locations | Manhattan, Blue Yonder |
| **Fulfilment Engine** | Pick, pack, ship logic | WMS integration, ShipBob |
| **Returns Management** | RMA, refund, restock workflow | Loop Returns, Returnly |

### 2.4 Finance Domain

| Building Block | Purpose | Enterprise Examples |
|----------------|---------|---------------------|
| **General Ledger (GL)** | Double-entry accounting, chart of accounts | SAP S/4HANA, Oracle ERP Cloud |
| **Accounts Payable (AP)** | Supplier invoice processing and payment | Coupa, SAP Ariba |
| **Accounts Receivable (AR)** | Customer invoicing, collections, cash application | HighRadius, Oracle AR |
| **Treasury Management** | Cash positioning, liquidity, FX | Kyriba, FIS Quantum |
| **Financial Consolidation** | Multi-entity, multi-currency consolidation | OneStream, SAP BPC, Hyperion |
| **Tax Engine** | Tax calculation, compliance, filing | Vertex, Avalara |
| **Financial Close** | Period-end orchestration, reconciliation | BlackLine, Trintech |

### 2.5 HR Domain

| Building Block | Purpose | Enterprise Examples |
|----------------|---------|---------------------|
| **HRIS / HCM Core** | Employee data, org structure, positions | Workday, SAP SuccessFactors, Oracle HCM |
| **Talent Acquisition** | Requisitions, ATS, interviewing, offer | Workday Recruiting, Greenhouse, Lever |
| **Learning Management (LMS)** | Course delivery, completion tracking | Cornerstone, LinkedIn Learning, Degreed |
| **Performance Management** | Goals, reviews, feedback, calibration | Workday, SAP, Culture Amp |
| **Compensation & Benefits** | Pay structures, equity, benefits admin | Workday, Mercer Darwin |
| **Workforce Planning** | Headcount forecasting, skills gap | Workday Adaptive, Anaplan |
| **Payroll Engine** | Pay calculation, compliance, filing | ADP, Ceridian Dayforce, Paylocity |

### 2.6 Procurement Domain

| Building Block | Purpose | Enterprise Examples |
|----------------|---------|---------------------|
| **Sourcing & RFx** | Supplier evaluation and selection | Coupa, Jaggaer, SAP Ariba |
| **Contract Management** | Contract lifecycle, obligations, renewals | Icertis, Agiloft |
| **Supplier Portal** | Supplier self-service onboarding and communication | SAP Ariba Supplier Lifecycle |
| **Purchase Order Management** | PO creation, approval, tracking | ERP core + Coupa |
| **Invoice Processing** | 3-way match, AI invoice extraction | Basware, Hypatos, Tipalti |
| **Spend Analytics** | Category spend analysis, savings tracking | Coupa Analytics, Spend HQ |

### 2.7 Supply Chain Domain

| Building Block | Purpose | Enterprise Examples |
|----------------|---------|---------------------|
| **Demand Planning** | Statistical forecasting + AI enrichment | Blue Yonder, o9 Solutions, Kinaxis |
| **Supply Planning** | Supply vs. demand balancing, MPS/MRP | SAP IBP, Blue Yonder |
| **Inventory Management** | Stock positioning, reorder points, safety stock | Manhattan, Oracle WMS |
| **Transportation Management (TMS)** | Carrier selection, routing, freight audit | Oracle TMS, MercuryGate |
| **Warehouse Management (WMS)** | Putaway, picking, packing, shipping | Manhattan, Blue Yonder, SAP EWM |
| **Trade Compliance** | Export controls, sanctions screening, customs | Amber Road, Oracle GTM |

### 2.8 Risk & Compliance Domain

| Building Block | Purpose | Enterprise Examples |
|----------------|---------|---------------------|
| **GRC Platform** | Policy, risk, control management | ServiceNow GRC, MetricStream, Archer |
| **Risk Register** | Risk inventory, likelihood/impact scoring | GRC platform module |
| **Internal Audit Management** | Audit planning, fieldwork, findings | TeamMate, AuditBoard |
| **Regulatory Change Management** | Monitor, assess, implement regulatory changes | Thomson Reuters Regulatory Intelligence |
| **Compliance Training** | Mandatory training delivery and tracking | Navex, EthicsPoint |
| **Third-Party Risk Management** | Vendor risk assessment and monitoring | Prevalent, ProcessUnity, OneTrust |

---

## Part 3 — Application Building Blocks

### 3.1 API Management

**ABB: API Gateway**

Purpose: Manage north-south traffic (external client to internal service). Provides authentication, rate limiting, request routing, transformation, and analytics for API consumption.

| SBB Option | Best For | Managed / Self-Hosted |
|------------|----------|----------------------|
| **Kong Gateway** | Multi-cloud, open source flexibility | Both |
| **AWS API Gateway** | AWS-native, serverless | Managed |
| **Azure API Management** | Microsoft ecosystem | Managed |
| **Apigee (Google Cloud)** | Enterprise API management at scale | Managed |
| **MuleSoft Anypoint** | Enterprise integration + API management | Both |
| **Tyk** | Open source, GDPR-focused | Both |

**Key Design Decisions:**
- Plugin architecture vs. monolithic gateway
- Rate limiting strategy: per-user, per-tenant, per-endpoint
- Authentication: JWT validation, OAuth, mTLS
- Caching: response caching at gateway vs. service level
- Observability: request tracing, metrics, error tracking

**ABB: Service Mesh (East-West Traffic)**

Purpose: Manage service-to-service communication within the cluster. Provides mutual TLS, load balancing, circuit breaking, retries, and observability without changing application code.

| SBB Option | Ecosystem | Notes |
|------------|-----------|-------|
| **Istio** | Kubernetes | Most feature-rich; higher complexity |
| **Linkerd** | Kubernetes | Lightweight; simpler operations |
| **AWS App Mesh** | AWS | ECS and EKS native |
| **Consul Connect** | Multi-platform | Works beyond Kubernetes |

### 3.2 Messaging & Eventing

**ABB: Event Bus / Message Broker**

Purpose: Asynchronous communication between services. Decouples producers from consumers. Enables event-driven architecture.

| SBB Option | Throughput | Use Case |
|------------|-----------|---------|
| **Apache Kafka** | Very high (millions/sec) | Event streaming, audit logs, data pipelines |
| **AWS EventBridge** | High | AWS event routing, SaaS integration |
| **Azure Service Bus** | High | Enterprise messaging, dead-letter queues |
| **Google Pub/Sub** | Very high | GCP-native, global distribution |
| **RabbitMQ** | Medium | Traditional message queuing, task queues |
| **AWS SQS + SNS** | High | Serverless messaging, fan-out patterns |

**Event-Driven Architecture Pattern:**
```
Producer Service → Event Bus → Consumer Service A
                            → Consumer Service B
                            → Audit Log
                            → Analytics Pipeline
```

### 3.3 Identity & Access Management

**ABB: Identity Provider (IdP)**

Purpose: Authenticate users (and services) and issue tokens that other services trust.

| Capability | Enterprise Standard | Notes |
|-----------|--------------------|----|
| **Human Authentication** | Microsoft Entra ID, Okta | MFA, SSO, Conditional Access |
| **Workforce SSO** | SAML 2.0, OIDC | Federated identity |
| **Customer Identity (CIAM)** | Auth0, Entra B2C, Cognito | Customer-facing login |
| **Service-to-Service (M2M)** | OAuth 2.0 Client Credentials | No human in the loop |
| **AI Agent Identity** | OAuth 2.0 + custom claims | Emerging: AI agent identity |

**ABB: Secret Manager**

Purpose: Store and rotate credentials, API keys, certificates, and secrets. Prevents secrets from appearing in code or config files.

| SBB | Ecosystem | Key Features |
|-----|-----------|-------------|
| **HashiCorp Vault** | Multi-cloud | Dynamic secrets, lease management |
| **AWS Secrets Manager** | AWS | Auto-rotation, cross-region replication |
| **Azure Key Vault** | Azure | Certificates, keys, secrets, HSM |
| **Google Secret Manager** | GCP | IAM-integrated, versioned |

### 3.4 Developer Experience

**ABB: Developer Portal**

Purpose: Self-service access to APIs, documentation, SDK downloads, usage analytics, and onboarding. The "shop window" for internal and external API consumers.

| SBB Option | Primary Use |
|------------|------------|
| **Backstage (Spotify, open source)** | Internal developer portal; service catalog |
| **Apigee Developer Portal** | External API marketplace |
| **Kong Developer Portal** | Self-hosted API consumer portal |
| **readme.io** | Documentation + API reference |
| **Stoplight** | API design + documentation |

**ABB: Configuration Service**

Purpose: Centralized, dynamic application configuration. Enables feature flags, environment-specific config, and runtime config changes without redeployment.

| SBB | Key Feature |
|-----|------------|
| **LaunchDarkly** | Feature flags, A/B testing, progressive rollout |
| **AWS AppConfig** | AWS-native dynamic config |
| **Azure App Configuration** | Azure-native, Key Vault integration |
| **HashiCorp Consul KV** | Config store alongside service mesh |

### 3.5 Observability Platform

**ABB: Observability Stack (Metrics + Logs + Traces)**

Three pillars of observability:

| Pillar | What It Answers | Enterprise SBB |
|--------|----------------|----------------|
| **Metrics** | "Is the system healthy? What is the rate/error/duration?" | Prometheus + Grafana, Datadog |
| **Logs** | "What happened exactly? What was the error message?" | ELK Stack, Splunk, Datadog Logs |
| **Traces** | "Where did the latency go? Which service is the bottleneck?" | Jaeger, Zipkin, Datadog APM, AWS X-Ray |

**Unified Observability Platforms:**

| Platform | Strength | Enterprise Use |
|----------|---------|---------------|
| **Datadog** | Full stack; easy setup; strong AI operations | Most popular enterprise choice |
| **Splunk** | Log analytics at scale; security use cases | Large enterprise, regulated industries |
| **Dynatrace** | AI-powered; auto-discovery; SAP integration | Large enterprise, complexity |
| **New Relic** | Developer-friendly; broad language support | Mid-market to enterprise |
| **OpenTelemetry** | Vendor-neutral instrumentation standard | Foundation for all above |

---

## Part 4 — AI Building Blocks

### 4.1 AI Building Block Overview

The AI layer of enterprise architecture requires a dedicated building block taxonomy. These building blocks form the **AI Platform** — the shared infrastructure that enables AI delivery across the enterprise.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         AI PLATFORM LAYERS                          │
├────────────────────────────────────────────────────────────────────-┤
│  GOVERNANCE LAYER      │ Safety/Guardrails │ Evaluation Pipeline    │
├────────────────────────────────────────────────────────────────────-┤
│  INTELLIGENCE LAYER    │ LLM Gateway │ Model Registry │ Prompt Reg  │
├────────────────────────────────────────────────────────────────────-┤
│  KNOWLEDGE LAYER       │ Vector DB │ Graph DB │ Knowledge Base       │
├────────────────────────────────────────────────────────────────────-┤
│  MEMORY LAYER          │ Short-term │ Long-term │ Episodic │ Semantic│
├────────────────────────────────────────────────────────────────────-┤
│  DATA LAYER            │ Feature Store │ Training Pipeline │ Dataset │
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 LLM Gateway

**Purpose:** The LLM Gateway is the entry point for all LLM calls in the enterprise. It provides:
- **Model routing:** Direct traffic to the appropriate model (capability, cost, latency)
- **Rate limiting:** Per-user, per-team, per-application throttling
- **Cost control:** Real-time spend tracking and budget enforcement
- **Caching:** Semantic response caching to reduce redundant calls
- **Observability:** Prompt/response logging, latency tracking, token counting
- **Safety:** Input/output filtering before reaching the model

**SBB Options:**

| Solution | Deployment | Key Features |
|----------|-----------|-------------|
| **LiteLLM** | Self-hosted | Unified API for 100+ models; cost tracking |
| **Kong AI Gateway** | Enterprise | Rate limiting, semantic caching, plugin ecosystem |
| **AWS Bedrock** | AWS-managed | Model diversity; enterprise compliance |
| **Azure AI Gateway (APIM)** | Azure-managed | Native Azure integration |
| **Portkey.ai** | SaaS + self-host | Guardrails, caching, routing |
| **Martian** | SaaS | Intelligent model routing based on task |

**Key Design Decisions:**

| Decision | Options |
|----------|---------|
| **Model routing logic** | Round-robin, capability-based, cost-optimized, latency-optimized |
| **Caching strategy** | Exact-match, semantic similarity, TTL |
| **Cost allocation** | Per-call tagging, team budgets, chargeback |
| **PII handling** | Strip PII before logging, tokenize, encrypt |
| **Fallback models** | Primary → secondary → tertiary for resilience |

### 4.3 Prompt Registry

**Purpose:** Version-controlled, governed storage for prompts. Enables prompt reuse, A/B testing, rollback, and audit.

**Key Capabilities:**
- Prompt versioning (semantic versioning: major.minor.patch)
- Variable templating (inject dynamic context into prompt templates)
- Environment promotion (dev → staging → production)
- A/B testing (route % of calls to alternate prompt versions)
- Audit trail (who changed what prompt, when, why)
- Performance metadata (which version had best eval scores)

**Prompt Registry Schema:**
```yaml
prompt:
  id: "fraud-detection-v2.1.3"
  name: "Transaction Fraud Analysis"
  template: |
    You are a fraud detection analyst. Analyze the following transaction:
    {transaction_data}
    Assess the fraud risk on a scale of 0-10 and explain your reasoning.
  variables: ["transaction_data"]
  model_preference: "claude-3-5-sonnet"
  version: "2.1.3"
  status: "production"
  owner: "Fraud Detection Team"
  eval_score: 0.87
  last_updated: "2026-07-10"
  tags: ["fraud", "transaction", "risk"]
```

### 4.4 Agent Runtime

**Purpose:** Hosted execution environment for AI agents. Manages agent lifecycle: initialization, execution, suspension (for human-in-the-loop), resumption, and termination.

**Key Capabilities:**
- Agent lifecycle management (start/stop/pause/resume)
- Tool execution environment (sandboxed code execution, API calls)
- Memory management (load/save agent state between turns)
- Human-in-the-loop (HITL) orchestration
- Error handling and retry logic
- Observability (trace every step, tool call, decision)

**SBB Options:**

| Solution | Deployment | Key Features |
|----------|-----------|-------------|
| **AWS Bedrock AgentCore** | AWS-managed | Native AWS integration; multi-agent; HITL |
| **Azure AI Agent Service** | Azure-managed | Foundry integration; enterprise auth |
| **LangGraph Cloud** | SaaS + self-host | Graph-based agent orchestration |
| **Temporal** | Self-hosted | Durable execution; workflow + agent hybrid |
| **Prefect** | SaaS + self-host | Pipeline orchestration with agent capabilities |
| **Claude Agent SDK** | Self-hosted | Anthropic-native; subagent spawning |

### 4.5 Memory Store

**Purpose:** Persistent storage for agent memory across conversations, sessions, and time. Enables agents to learn, personalize, and maintain continuity.

**Memory Types:**

| Type | Description | Storage Technology |
|------|-------------|-------------------|
| **Episodic** | Specific past interactions ("What did we discuss last Tuesday?") | Vector DB with metadata |
| **Semantic** | Facts and knowledge ("The customer's preferred currency is EUR") | Vector DB or KV store |
| **Procedural** | How to do tasks ("For this customer, always cc their assistant") | Rules engine or vector |
| **Working** | Active context within current conversation | In-memory / context window |

**SBB Options:**

| Solution | Best For |
|----------|---------|
| **Redis** | Low-latency working memory, session state |
| **Pinecone** | Semantic long-term memory at scale |
| **Weaviate** | Hybrid semantic + metadata memory |
| **AWS MemoryDB** | Durable Redis at enterprise scale |
| **Mem0** | Purpose-built AI memory management |
| **Zep** | Long-term memory with temporal reasoning |

### 4.6 Knowledge Base (RAG Infrastructure)

**Purpose:** The knowledge infrastructure that enables AI to retrieve enterprise-specific information at query time, grounding model responses in factual, current, proprietary data.

**Knowledge Base Architecture:**

```
Documents/Data Sources
        ↓
  Document Processor
  (chunking, cleaning)
        ↓
  Embedding Model
  (text → vector)
        ↓
  Vector Store ←──────── Query Vector
  (similarity search) ──────────────→ Retrieved Chunks
        +                                    +
  Metadata Store ←──── Metadata Filter → Context Window → LLM
  (structured fields)
```

**Vector Store Options:**

| Solution | Scale | Deployment | Key Feature |
|----------|-------|-----------|------------|
| **Pinecone** | Very large | SaaS | Managed; fast query |
| **Weaviate** | Large | Self-hosted / SaaS | Hybrid search; GraphQL |
| **Qdrant** | Large | Self-hosted / SaaS | High-performance; Rust |
| **Chroma** | Small-medium | Self-hosted | Developer-friendly |
| **pgvector (Postgres)** | Medium | Self-hosted | SQL + vector together |
| **OpenSearch with k-NN** | Large | AWS managed | Text + vector unified |
| **Azure AI Search** | Large | Azure managed | Hybrid search; Azure native |

**Knowledge Base Design Decisions:**

| Decision | Options | Guidance |
|----------|---------|---------|
| **Chunking strategy** | Fixed size, semantic, document-level | Semantic chunking reduces context fragmentation |
| **Embedding model** | OpenAI ada-002, Cohere Embed, local models | Match embedding model at index and query time |
| **Retrieval strategy** | Semantic only, hybrid (semantic + keyword), graph | Hybrid outperforms semantic-only for enterprise data |
| **Reranking** | Cohere Rerank, cross-encoders | Reranking improves precision; adds latency |
| **Update strategy** | Full re-index vs. incremental | Incremental for large, frequently changing corpora |

### 4.7 Evaluation Pipeline

**Purpose:** Automated assessment of AI system quality — measuring whether outputs meet accuracy, safety, helpfulness, and compliance standards before and after deployment.

**Evaluation Dimensions:**

| Dimension | What It Measures | Example Metrics |
|-----------|-----------------|----------------|
| **Faithfulness** | Does the output accurately reflect the source? | Faithfulness score (0-1) |
| **Relevance** | Is the output relevant to the question? | Semantic similarity |
| **Completeness** | Does the output address all aspects? | Coverage score |
| **Safety** | Does the output violate safety policies? | Refusal rate, harmful content rate |
| **Hallucination** | Does the output fabricate information? | Grounded vs. hallucinated claim ratio |
| **Latency** | How fast is the response? | P50, P95, P99 latency |
| **Cost** | How much does each call cost? | Tokens per query, $ per 1K queries |

**Evaluation Frameworks:**

| Framework | Key Capability |
|-----------|---------------|
| **RAGAS** | RAG-specific evaluation (context precision, recall, faithfulness) |
| **LangSmith** | Trace-based evaluation; human feedback loops |
| **TruLens** | Open-source LLM evaluation |
| **Promptfoo** | Red-teaming and automated testing |
| **AWS Bedrock Evaluation** | Managed evaluation for Bedrock models |
| **Braintrust** | Evaluation + dataset management |

### 4.8 Safety & Guardrails

**Purpose:** Input and output filtering to prevent misuse, policy violations, harmful content, PII leakage, and prompt injection.

**Guardrail Types:**

| Guardrail | Input/Output | What It Blocks |
|-----------|-------------|----------------|
| **PII Detector** | Both | Credit cards, SSNs, email addresses in prompts/responses |
| **Prompt Injection Detector** | Input | Attempts to override system instructions |
| **Jailbreak Detector** | Input | Attempts to bypass safety measures |
| **Topic Filter** | Both | Off-topic, competitor mentions, sensitive categories |
| **Toxicity Filter** | Both | Harmful, offensive, or threatening content |
| **Hallucination Detector** | Output | Claims not grounded in provided context |
| **Compliance Filter** | Output | Regulated industries: financial advice, medical diagnosis disclaimers |

**SBB Options:**

| Solution | Deployment | Strength |
|----------|-----------|---------|
| **AWS Bedrock Guardrails** | Managed | Integrated with Bedrock; easy setup |
| **Azure Content Safety** | Managed | Microsoft; multilingual |
| **Lakera Guard** | SaaS | Prompt injection specialist |
| **Llama Guard** | Self-hosted | Meta open-source; customizable |
| **NeMo Guardrails** | Self-hosted | NVIDIA; conversational guardrails |
| **Presidio (Microsoft)** | Self-hosted | PII detection and anonymization |

### 4.9 Model Registry

**Purpose:** Version-controlled catalog of all ML and AI models in the enterprise — including training metadata, evaluation results, lineage, and deployment history.

**Model Registry Entry:**

```yaml
model:
  id: "fraud-xgb-v4.2"
  name: "Transaction Fraud Classifier"
  type: "classification"
  framework: "XGBoost"
  version: "4.2"
  status: "production"
  deployed_to: ["us-east-1-prod", "eu-west-1-prod"]
  training_data: "transactions_2024_q4"
  eval_metrics:
    precision: 0.94
    recall: 0.91
    f1: 0.925
    auc: 0.97
  bias_assessment: "passed_2026_01_15"
  explainability: "SHAP values available"
  owner: "Fraud Detection Team"
  approved_by: "Model Risk Committee"
  approval_date: "2026-01-20"
  next_review: "2026-07-20"
```

**SBB Options:**

| Solution | Ecosystem | Key Feature |
|----------|-----------|------------|
| **MLflow** | Open source | Experiment tracking + model registry |
| **AWS SageMaker Model Registry** | AWS | Native model approval workflow |
| **Azure ML Model Registry** | Azure | Integrated with Azure ML |
| **Vertex AI Model Registry** | GCP | GCP-native |
| **Weights & Biases** | SaaS | Experiment tracking + lineage |
| **Hugging Face Hub** | SaaS/self-host | Foundation model registry |

### 4.10 Feature Store

**Purpose:** Central store of ML features — engineered variables derived from raw data that ML models use for training and inference. Ensures consistency between training-time and inference-time features (avoiding training-serving skew).

**Feature Store Architecture:**

```
Raw Data Sources
      ↓
Feature Engineering Pipeline
      ↓
┌────────────────────────────┐
│         Feature Store      │
│  ┌──────────┐ ┌─────────┐ │
│  │ Offline  │ │ Online  │ │
│  │ (batch)  │ │ (real-  │ │
│  │ S3, Hive │ │ time)   │ │
│  │          │ │ Redis   │ │
│  └──────────┘ └─────────┘ │
└────────────────────────────┘
      ↓               ↓
Training          Inference
```

**SBB Options:**

| Solution | Deployment | Notes |
|----------|-----------|-------|
| **Feast** | Open source | Multi-cloud; flexible |
| **Tecton** | SaaS | Managed; strong MLOps integration |
| **AWS SageMaker Feature Store** | AWS | Managed; integrated pipeline |
| **Vertex AI Feature Store** | GCP | Managed; BigQuery integration |
| **Databricks Feature Store** | Databricks | Unified analytics + ML |

### 4.11 Training Pipeline

**Purpose:** Automated, repeatable process for training, evaluating, and registering ML models. Part of the MLOps toolkit.

**Pipeline Stages:**
```
Data Validation → Feature Engineering → Model Training →
Model Evaluation → Bias Assessment → Model Registration →
Deployment Approval → Production Deployment → Monitoring
```

**Training Pipeline SBB Options:**

| Solution | Strength |
|----------|---------|
| **Kubeflow Pipelines** | Kubernetes-native; open source |
| **AWS SageMaker Pipelines** | AWS-managed MLOps |
| **Azure ML Pipelines** | Azure-integrated |
| **Vertex AI Pipelines** | GCP-native; Kubeflow compatible |
| **Databricks MLflow + Jobs** | Data engineering + ML unified |
| **Metaflow (Netflix)** | Data scientist-friendly |

---

## Part 5 — Platform Engineering Building Blocks

### 5.1 Internal Developer Platform (IDP)

**Purpose:** The IDP is the self-service layer that enables product teams to deploy, operate, and observe their services without needing to understand the underlying infrastructure. It reduces cognitive load, enforces standards, and accelerates delivery.

**IDP Components:**

| Component | Purpose | Enterprise Examples |
|-----------|---------|---------------------|
| **Developer Portal** | Service catalog, documentation, onboarding | Backstage (Spotify) |
| **Golden Paths** | Pre-built, opinionated templates for new services | GitHub template repos, scaffolding tools |
| **Environment Provisioning** | Self-service dev/test/staging environment creation | Terraform + Atlantis, Crossplane |
| **CI/CD Orchestration** | Automated build, test, and deploy pipelines | GitHub Actions, GitLab CI, Tekton |
| **Secret Injection** | Automatic secrets delivery to workloads | Vault Agent, External Secrets Operator |
| **Observability Integration** | Auto-instrumentation and dashboard provisioning | Datadog, Grafana Tempo |

**IDP Maturity Levels:**

| Level | Capability |
|-------|-----------|
| **Level 0** | Wikis and runbooks; manual processes |
| **Level 1** | Shared CI/CD pipelines; basic templates |
| **Level 2** | Self-service environment provisioning; portal |
| **Level 3** | Policy-as-code enforcement; golden paths |
| **Level 4** | AI-assisted platform engineering; self-healing |

### 5.2 CI/CD Platform

**Purpose:** Automated pipeline from code commit to production deployment.

**Pipeline Stages:**
```
Commit → Build → Unit Test → Static Analysis →
Container Build → Integration Test → Security Scan →
Staging Deploy → Acceptance Test → Production Deploy → Monitor
```

**SBB Options:**

| Solution | Best For |
|----------|---------|
| **GitHub Actions** | GitHub-hosted repos; broad ecosystem |
| **GitLab CI/CD** | GitLab-native; self-hosted option |
| **Jenkins** | Legacy; highly customizable |
| **Tekton** | Kubernetes-native pipelines |
| **AWS CodePipeline** | AWS-native |
| **Azure DevOps Pipelines** | Microsoft ecosystem |
| **Argo CD** | GitOps-based continuous delivery |

### 5.3 Container Platform

**Purpose:** Runtime environment for containerized applications. Manages scheduling, networking, storage, and health of containers at scale.

| SBB | Deployment | Notes |
|-----|-----------|-------|
| **AWS EKS** | AWS managed Kubernetes | Broadest enterprise adoption on AWS |
| **Azure AKS** | Azure managed Kubernetes | Deep Azure AD integration |
| **GKE Autopilot** | GCP managed Kubernetes | Serverless Kubernetes |
| **Red Hat OpenShift** | Self-hosted / cloud | Enterprise Kubernetes; RBAC strong |
| **Rancher** | Multi-cluster management | Fleet management across clusters |

### 5.4 Infrastructure Platform (IaC)

**Purpose:** Define and provision cloud infrastructure through code, enabling version control, repeatability, and compliance.

| Solution | Strength | When to Use |
|----------|---------|------------|
| **Terraform** | Multi-cloud; large ecosystem | Default enterprise choice |
| **Pulumi** | Infrastructure as real code (Python/TS/Go) | Developer-preferred teams |
| **AWS CDK** | AWS-native; constructs model | AWS-only organizations |
| **Bicep / ARM** | Azure-native | Azure-only organizations |
| **Crossplane** | Kubernetes-native infrastructure | Platform teams on Kubernetes |
| **Ansible** | Configuration management | OS-level, not cloud resource level |

**Landing Zone Pattern:**
```
Enterprise Landing Zone
├── Management Account
│   ├── Security Controls
│   ├── Logging Aggregation
│   └── Identity Governance
├── Shared Services Account
│   ├── DNS
│   ├── Networking (Transit Gateway)
│   └── Shared Platform Services
└── Workload Accounts
    ├── Dev Account
    ├── Staging Account
    └── Production Account
```

---

## Part 6 — Agentic AI Building Blocks

### 6.1 Agent Harness

**Purpose:** The execution environment that hosts, monitors, and manages AI agents. The harness provides the scaffolding that an agent runs within — handling tool registration, conversation management, error recovery, and telemetry.

**Key Harness Capabilities:**
- System prompt management and injection
- Tool/function registration and invocation
- Token budget management
- Turn-by-turn conversation tracking
- Error handling: retry, fallback, abort
- Telemetry: input/output logging, tool call traces

**SBB Options:**

| Solution | Language | Notes |
|----------|---------|-------|
| **Claude Agent SDK** | Python/TypeScript | Anthropic-native; subagent spawning |
| **LangChain / LangGraph** | Python | Broad ecosystem; graph-based |
| **AutoGen (Microsoft)** | Python | Multi-agent conversations |
| **CrewAI** | Python | Role-based multi-agent |
| **Semantic Kernel** | C#/Python | Microsoft; enterprise-focused |

### 6.2 Tool Registry (MCP Server Catalog)

**Purpose:** A governed catalog of tools available to AI agents, built on the Model Context Protocol (MCP). Enables agents to discover, select, and invoke tools with consistent authorization and observability.

**MCP Tool Registry Entry:**
```yaml
tool:
  id: "crm-get-customer-profile"
  name: "Get Customer Profile"
  server: "salesforce-mcp-server"
  description: "Retrieve complete customer profile including history and preferences"
  input_schema:
    type: object
    properties:
      customer_id:
        type: string
        description: "CRM customer identifier"
    required: ["customer_id"]
  authorization:
    required_scopes: ["crm:read"]
    data_classification: "confidential"
  rate_limit: "100/minute"
  owner: "CRM Platform Team"
  sla: "99.9%"
  tags: ["crm", "customer", "read"]
```

### 6.3 Agent Gateway

**Purpose:** Routing and load balancing layer for multi-agent architectures. Routes requests to the appropriate agent based on capability, availability, and load.

**Key Capabilities:**
- Capability-based routing (route to agent with required skill)
- Load balancing across agent instances
- Circuit breaking (stop routing to degraded agents)
- Agent discovery (dynamic registration of new agents)
- Cross-agent authorization (agent A can invoke agent B only with permission)
- Audit logging of all agent-to-agent calls

**Agent Gateway Pattern:**
```
Client / Orchestrator
         ↓
   Agent Gateway
   ├── Routing Registry: {capability → agent}
   ├── Authorization Engine: {requester × target × action → allow/deny}
   ├── Load Balancer: round-robin / capability-weighted
   └── Circuit Breaker: {agent health → routing decision}
         ↓
   Agent A    Agent B    Agent C
```

### 6.4 Context Engine

**Purpose:** Manages the information that flows into an agent's context window — assembling the right system instructions, memory, tool results, and conversation history for each agent invocation.

**Context Assembly Process:**
```
1. System Prompt: Role definition, constraints, persona
2. Memory Retrieval: Relevant past interactions (semantic search)
3. Knowledge Retrieval: Relevant documents (RAG)
4. Tool Results: Results from previous tool calls in this session
5. Conversation History: Recent turns (within budget)
6. Current Message: User or orchestrator instruction
```

**Context Budget Management:**

| Priority | Content | Allocation |
|----------|---------|-----------|
| 1 (Highest) | System prompt | Fixed (~500-2000 tokens) |
| 2 | Current message | Fixed (variable) |
| 3 | Critical memory | ~10-20% of remaining |
| 4 | Tool results | As needed |
| 5 | Conversation history | Remaining budget |
| 6 (Lowest) | Retrieved knowledge | Fill remaining |

### 6.5 Skill Registry

**Purpose:** A library of reusable agent capabilities — pre-built, tested, and governed skills that agents can acquire to perform common tasks.

**Skill Definition:**
```yaml
skill:
  id: "summarize-document"
  name: "Document Summarizer"
  version: "1.2.0"
  description: "Summarize documents up to 100,000 tokens into structured insights"
  input: ["document_text", "summary_length", "output_format"]
  output: ["executive_summary", "key_points", "recommended_actions"]
  prompt_template_id: "summarize-v1.2"
  tools_required: []
  avg_latency_ms: 3200
  avg_cost_tokens: 4500
  eval_score: 0.91
  tags: ["summarization", "documents", "analysis"]
```

---

## Part 7 — Building Block Selection Decision Matrix

### 7.1 Decision Criteria

When selecting between competing SBBs for the same ABB, apply the following decision criteria:

| Criterion | Weight | What to Assess |
|-----------|--------|----------------|
| **Strategic fit** | 25% | Does it align with enterprise cloud strategy? |
| **Functional coverage** | 25% | Does it meet the capability requirements? |
| **Enterprise readiness** | 20% | Security, compliance, SLA, support |
| **Total cost of ownership** | 15% | License, ops, migration, training |
| **Ecosystem integration** | 10% | Does it connect to existing tools? |
| **Talent availability** | 5% | Can we hire/train for this? |

### 7.2 AI Building Block Selection Guide

| Use Case | Recommended ABB Combination |
|----------|----------------------------|
| **Simple chatbot** | LLM Gateway + Safety Guardrails + Knowledge Base |
| **Enterprise RAG** | LLM Gateway + Knowledge Base + Evaluation Pipeline + Safety |
| **AI agent (task automation)** | Agent Runtime + Tool Registry + Memory Store + LLM Gateway |
| **Multi-agent orchestration** | Agent Gateway + Agent Runtime × N + Context Engine + Memory |
| **ML model serving** | Model Registry + Feature Store + Training Pipeline + Evaluation |
| **LLMOps at scale** | Prompt Registry + Model Registry + Evaluation + Observability |

### 7.3 Build vs. Buy vs. Configure Decision Tree

```
START: New AI capability needed
           ↓
Is this a commodity capability?
(messaging, identity, storage)
     YES → Buy SaaS / use cloud-managed service
     NO  ↓
Is there a mature open source option?
     YES → Evaluate OSS; consider managed distribution
     NO  ↓
Is this a differentiated capability for the enterprise?
     YES → Build (invest in proprietary advantage)
     NO  → Partner (system integrator or specialized vendor)
```

---

*Volume 7 of 10 — Enterprise Strategy & Business Architecture Handbook*
