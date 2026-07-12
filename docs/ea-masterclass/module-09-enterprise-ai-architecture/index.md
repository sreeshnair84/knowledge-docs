---
title: "Module 9 — Enterprise AI Architecture"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-09-enterprise-ai-architecture"]
doc_type: multi-part-series
series_name: EA Masterclass
series_part: 9
series_total: 15
series_index: ../index.md
---

# Module 9 — Enterprise AI Architecture

!!! note "Module Overview"
    Enterprise AI Architecture is not about building AI features — it is about designing the platforms, pipelines, governance systems, and operational models that allow an organisation to deploy and scale AI safely and cost-effectively across many teams and use cases. This module gives you the full stack view.

---

## What Enterprise AI Architecture Is

Most teams encounter AI architecture the same way they first encounter cloud architecture: by doing it wrong for long enough that the costs become impossible to ignore. A single ChatGPT integration is not an AI architecture. It becomes one the moment a second team wants to build something different on top of the same models, the same data, and the same budget.

Enterprise AI Architecture encompasses:

| Concern | What it means in practice |
| --- | --- |
| **Platform** | Shared infrastructure for model access, prompt management, evaluation, and guardrails |
| **Data pipelines** | Ingestion, transformation, embedding, and freshness for AI consumption |
| **Model lifecycle** | Selection, fine-tuning, evaluation, versioning, deprecation |
| **Governance** | Policy enforcement, audit trails, responsible AI controls |
| **Observability** | Monitoring latency, accuracy, cost, and drift in production |
| **Cost management** | FinOps practices adapted for token-based and GPU-based spending |

!!! tip "The critical shift"
    Feature teams optimise for shipping. Platform teams optimise for leverage. Enterprise AI Architecture is fundamentally a platform discipline. If you are designing it, you are building infrastructure that others will build on — and that changes every design trade-off.

### Why This Is Different From Building AI Features

Building an AI feature is a **point solution**: one model, one data source, one team, one cost centre. Enterprise AI Architecture is a **system of systems** concern:

- Multiple foundation models with different cost, latency, and capability profiles
- Multiple teams with conflicting governance requirements
- Data that is shared, regulated, freshness-sensitive, and expensive to move
- Costs that aggregate non-linearly across teams and use cases
- Security threats that are novel and not covered by traditional AppSec playbooks

---

## Enterprise AI Architecture Stack

The following diagram shows the canonical layering of an enterprise AI architecture. Security and Governance cut across every layer — they are not a separate layer but a cross-cutting concern embedded in each one.

```
┌─────────────────────────────────────────────────────────────────┐
│                     BUSINESS STRATEGY                           │
│          AI investment thesis · use-case prioritisation         │
│          build vs. buy vs. partner · risk appetite              │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────┐
│                       AI STRATEGY                               │
│        AI operating model · centre of excellence (CoE)          │
│        talent strategy · responsible AI policy                  │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────┐
│                  BUSINESS CAPABILITIES                          │
│    Customer experience · Operations · Risk · Product · Finance  │
│    Each capability owns use cases mapped to AI solutions        │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────┐
│               AI APPLICATION LAYER                              │
│  ┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Orchestration  │  │    Agents    │  │   UIs / APIs     │   │
│  │  (workflow      │  │  (autonomous │  │  (chat, voice,   │   │
│  │   pipelines)    │  │   task exec) │  │   embedded, CLI) │   │
│  └─────────────────┘  └──────────────┘  └──────────────────┘   │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────┐
│                 AI PLATFORM LAYER                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  ┌────────┐  │
│  │ Model Serving│  │Prompt Mgmt   │  │ Eval /   │  │Guard-  │  │
│  │ Gateway /    │  │Versioning /  │  │ Testing  │  │rails   │  │
│  │ Router       │  │A/B testing   │  │ Harness  │  │        │  │
│  └──────────────┘  └──────────────┘  └──────────┘  └────────┘  │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────┐
│                      DATA LAYER                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │ Feature      │  │  Vector DBs  │  │  Data Pipelines      │   │
│  │ Stores       │  │  (RAG index) │  │  (ETL / streaming)   │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────┐
│                      MODEL LAYER                                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Foundation  │  │  Fine-tuned  │  │  Embedding           │   │
│  │  Models      │  │  Models      │  │  Models              │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────┐
│                  INFRASTRUCTURE LAYER                           │
│       GPU clusters · cloud compute · networking · storage       │
│       MLOps tooling · CI/CD · container orchestration           │
└─────────────────────────────────────────────────────────────────┘

  ╔═══════════════════════════════════════════════════════════════╗
  ║              SECURITY & GOVERNANCE (cross-cutting)            ║
  ║  IAM · data classification · audit logs · policy enforcement  ║
  ║  responsible AI controls · compliance · cost allocation       ║
  ╚═══════════════════════════════════════════════════════════════╝
```

!!! warning "Anti-pattern: Skipping the platform layer"
    Most organisations skip directly from the application layer to infrastructure. The AI Platform Layer — model gateway, prompt management, eval harness, guardrails — is the piece that creates shared leverage. Without it, every team reinvents the same wheel at different quality levels, compliance controls are impossible to enforce consistently, and costs cannot be attributed accurately.

---

## AI Platforms

### Model Serving Options

The first platform decision is where models run and how you access them.

| Option | Examples | Best for | Trade-offs |
| --- | --- | --- | --- |
| **Managed API** | Azure OpenAI, Anthropic API, AWS Bedrock | Most enterprises | No GPU ops; data leaves your perimeter; cost scales with tokens |
| **Cloud ML Platform** | Google Vertex AI, Azure ML, AWS SageMaker | Teams needing fine-tuning + serving | More control; more operational overhead |
| **Self-hosted (cloud)** | vLLM on EC2/AKS, TGI on GKE | Cost-sensitive at high volume | GPU expertise required; no managed updates |
| **On-premises** | vLLM on bare metal, Ollama for dev | Regulated industries, data sovereignty | Highest CapEx; slowest to scale |

### Model Gateway / Router

A model gateway is the single ingress point for all AI calls in the enterprise. It provides:

- **Routing**: send requests to the right model based on cost, latency, or capability
- **Rate limiting**: prevent runaway spend by team or application
- **Logging**: capture every request and response for audit and evaluation
- **Secrets management**: one place to rotate API keys
- **Cost attribution**: tag every call with team, project, use-case

Popular implementations: LiteLLM (open source), Azure API Management with APIM policies, AWS API Gateway + Lambda router, custom FastAPI proxy.

### Prompt Management

!!! tip "Prompts are code"
    Prompts should live in version control, go through review, be tested before deployment, and be rolled back when they break. A prompt management system enforces this discipline at scale.

Key capabilities to look for:

- Version control with diff and rollback
- A/B testing with statistical significance testing
- Environment promotion (dev → staging → prod)
- Variable injection and template rendering
- Latency and cost tracking per prompt version

### Orchestration Frameworks

| Framework | Language | Best for |
| --- | --- | --- |
| **LangChain** | Python, JS | General-purpose chains and agents; large ecosystem |
| **LlamaIndex** | Python | RAG-heavy applications; strong data connectors |
| **Semantic Kernel** | Python, C#, Java | Microsoft ecosystem; enterprise .NET shops |
| **LangGraph** | Python | Stateful, graph-based agent workflows |
| **AutoGen** | Python | Multi-agent conversations; Microsoft research |
| **CrewAI** | Python | Role-based multi-agent orchestration |

!!! warning "Orchestration framework lock-in"
    Each framework has different abstractions for memory, tools, and state. Migrating between them is expensive. Evaluate carefully before committing — or keep your business logic in pure Python and treat the framework as a thin wrapper.

### Evaluation Frameworks

Evaluation is the most underfunded part of enterprise AI architecture. Without it, you are flying blind on quality.

- **Ragas** — RAG evaluation: faithfulness, answer relevance, context recall
- **DeepEval** — unit-test style LLM evals with custom metrics
- **LangSmith** — tracing + evaluation integrated with LangChain
- **Promptfoo** — prompt testing and red-teaming
- **Azure AI Evaluation SDK** — Microsoft ecosystem evals

### Guardrails

Guardrails enforce safety and quality constraints at the platform layer so application teams do not have to implement them individually.

- **Input guardrails**: block prompt injection, PII in prompts, off-topic requests
- **Output guardrails**: block hallucinated citations, toxic content, confidential data leakage
- **Tools**: NeMo Guardrails (NVIDIA), Guardrails AI, Azure Content Safety, AWS Bedrock Guardrails

### Managed vs. Self-Hosted Trade-offs

| Dimension | Managed API | Self-hosted |
| --- | --- | --- |
| **Time to value** | Hours | Weeks to months |
| **Operational overhead** | Low | High (GPU, autoscaling, updates) |
| **Data control** | Data sent to third party | Data stays in your environment |
| **Cost at scale** | Can become expensive | Lower variable cost at high volume |
| **Model selection** | Limited to provider's catalogue | Any open-weight model |
| **Fine-tuning** | Limited or managed | Full control |
| **Compliance** | Depends on provider certifications | You own the compliance posture |

---

## Agent Platforms

### Enterprise Agent Platform Requirements

Agents are the highest-leverage and highest-risk pattern in enterprise AI. An enterprise agent platform must provide:

1. **Tool registry** — a catalogued, versioned, access-controlled registry of tools agents can use
2. **Execution sandbox** — isolated, auditable environments for agent task execution
3. **State management** — durable storage for long-running agent sessions
4. **Human-in-the-loop gates** — configurable approval checkpoints before irreversible actions
5. **Observability** — full trace of every decision, tool call, and reasoning step
6. **Cost controls** — budget limits per agent run, per session, per team

### Agent Lifecycle

```
  DEFINE          DEPLOY          OPERATE          RETIRE
  ──────          ──────          ───────          ──────
  Goal            Register        Monitor           Version
  definition  →   with tool   →   traces        →   deprecation
  Tool            registry        Cost alerts       Migration
  specification   Access          Quality eval      plan
  Persona /       controls        Human review      Audit
  system          Sandbox         queue             archive
  prompt          config
```

### Multi-Agent Orchestration Patterns

**Supervisor pattern**: One orchestrator agent decomposes tasks and delegates to specialist sub-agents. The supervisor maintains overall goal state.

**Pipeline pattern**: Agents are chained sequentially. Output of agent N is input to agent N+1. Good for document processing workflows.

**Parallel fan-out**: A dispatcher sends the same task to multiple agents in parallel, then an aggregator merges results. Good for research and synthesis tasks.

**Market/auction pattern**: Tasks are broadcast to a pool of agents; agents bid based on capability and availability. Complex to implement; useful for heterogeneous agent pools.

### MCP / Tool Ecosystem

The **Model Context Protocol (MCP)** is an open standard (Anthropic, 2024) for connecting AI agents to external tools and data sources. It provides a standardised interface so agents can call tools without custom integration code per tool.

Enterprise implications:

- MCP servers can wrap internal APIs, databases, and services
- Access control is enforced at the MCP server level
- Tool call logs are the primary audit surface for agentic AI
- MCP reduces the integration tax when switching orchestration frameworks

### A2A Protocol

**Agent-to-Agent (A2A)** protocol (Google, 2025) enables agents built on different frameworks to communicate using a common message format. In multi-vendor enterprise environments, A2A allows:

- Cross-vendor agent collaboration (e.g. a LangGraph agent calling a Semantic Kernel agent)
- Capability discovery between agents
- Standardised task delegation and status reporting

### Agent Observability Requirements

!!! warning "Agents fail silently and expensively"
    An agent that enters a reasoning loop, calls a tool repeatedly, or silently produces wrong output can burn significant budget before anyone notices. Observability is not optional for agentic AI.

You must trace:

- Every LLM call: input tokens, output tokens, latency, model version
- Every tool call: name, inputs, outputs, duration, success/failure
- Reasoning steps (chain-of-thought) where available
- State transitions and goal progress
- Human-in-the-loop interactions and decisions
- Total cost per task and per session

---

## Knowledge Platforms

### Vector Database Comparison

| Database | Hosting | Scale | Key strengths | Weaknesses |
| --- | --- | --- | --- | --- |
| **Pinecone** | Managed SaaS | Up to billions | Easiest ops; fast filtered search | Vendor lock-in; cost at scale |
| **Weaviate** | Self-hosted / Cloud | Up to hundreds of millions | Hybrid search; GraphQL API; open source | More ops complexity |
| **pgvector** | Self-hosted (Postgres) | Up to tens of millions | Already in Postgres stack; no new infra | Performance limits at large scale |
| **Azure AI Search** | Managed (Azure) | Enterprise scale | Integrated Azure RBAC; hybrid search; semantic ranking | Azure-specific |
| **Qdrant** | Self-hosted / Cloud | Up to hundreds of millions | High performance; filtering; open source | Smaller ecosystem |
| **Chroma** | Self-hosted | Small to medium | Developer-friendly; easy local dev | Not production-grade at scale |

### RAG Architecture Patterns

**Naive RAG**: Query → embed → vector search → top-k chunks → LLM. Works for simple cases; fails on complex queries and low-quality documents.

**Advanced RAG**:

- Query transformation (HyDE, query expansion, step-back prompting)
- Hybrid retrieval (vector + BM25 keyword)
- Re-ranking (cross-encoder models)
- Contextual compression (reduce noise before sending to LLM)

**Modular RAG**: Mix and match retrieval strategies, re-rankers, and fusion algorithms per use case. Higher complexity, higher quality ceiling.

**Agentic RAG**: An agent decides when to retrieve, what to retrieve, and whether retrieved context is sufficient. Can issue multiple retrieval calls and synthesise across them.

### Document Processing Pipeline

```
  Raw documents (PDF, DOCX, HTML, email, web)
         │
         ▼
  [Extraction layer]
  Text extraction · OCR for scanned docs · table parsing
         │
         ▼
  [Cleaning layer]
  Deduplication · PII detection · format normalisation
         │
         ▼
  [Chunking layer]
  Sentence splitting · semantic chunking · sliding window
  Chunk size and overlap tuned per document type
         │
         ▼
  [Enrichment layer]
  Metadata tagging · entity extraction · classification
         │
         ▼
  [Embedding layer]
  Embedding model · batch processing · versioning
         │
         ▼
  [Index layer]
  Upsert to vector DB · BM25 index update · metadata index
         │
         ▼
  [Freshness management]
  Change detection · incremental re-indexing · TTL policies
```

### Knowledge Freshness Management

!!! warning "Stale retrieval is a silent accuracy killer"
    A RAG system that retrieves outdated policy documents, superseded product specifications, or revoked regulatory guidance will confidently produce wrong answers. Freshness is a first-class architectural concern.

Strategies:

- **Event-driven re-indexing**: trigger re-embedding when source documents change (webhooks, file watchers, change data capture)
- **TTL-based refresh**: force re-ingestion of documents older than N days
- **Metadata filtering**: expose document date metadata to retrieval so the LLM can reason about currency
- **Confidence decay**: reduce retrieval score of older documents when recency is important to the query type

---

## Data Architecture for AI

### Feature Stores

Feature stores solve the training-serving skew problem: the features used during model training are exactly the same features served at inference time.

| Component | Purpose |
| --- | --- |
| **Offline store** | Historical feature values for training (data warehouse, Delta Lake) |
| **Online store** | Low-latency feature serving at inference (Redis, DynamoDB, Bigtable) |
| **Feature registry** | Catalogue of defined features with owners and lineage |
| **Materialisation** | Pipeline that computes features and writes to both stores |

Enterprise feature store options: Feast (open source), Tecton (managed), Databricks Feature Store, SageMaker Feature Store.

### Data Lineage

Every data asset consumed by an AI model must have a traceable lineage from source to model input. This is a compliance requirement in regulated industries and a debugging requirement everywhere else.

Tools: Apache Atlas, OpenLineage (standard), Alation, DataHub (LinkedIn, open source), Microsoft Purview.

### Data Contracts

A data contract is a formal agreement between a data producer and data consumer that specifies:

- Schema and data types
- Freshness SLAs
- Null rates and value distributions
- Breaking-change notification process
- Ownership and escalation contacts

AI systems are brittle consumers of data. A schema change that a human analyst catches in seconds can silently corrupt an AI pipeline for days. Data contracts are the early-warning system.

### AI-Specific Data Governance

Beyond standard data governance, AI introduces:

- **Training data provenance**: which data was used to train or fine-tune each model version
- **Consent and rights management**: for models trained on user-generated content
- **Bias auditing**: regular statistical checks for representation issues in training data
- **Deletion propagation**: if a user exercises right-to-erasure, can you retrain or at least verify the model does not memorise their data?

### Synthetic Data Considerations

Synthetic data is increasingly used to augment training sets, generate evaluation datasets, and protect privacy. Enterprise architecture considerations:

!!! tip "Synthetic data is not free of risk"
    Synthetic data generated by a model can inherit that model's biases. Validate synthetic datasets against real-world distributions before using them for training or evaluation.

- Use synthetic data for evaluation harnesses where labelling real data is expensive
- Apply differential privacy techniques when generating synthetic data from sensitive sources
- Track synthetic data provenance separately from real data in the feature registry

---

## Cloud Strategy for AI

### Cloud Provider Comparison

| Dimension | Azure OpenAI / Azure AI | AWS Bedrock | Google Vertex AI |
| --- | --- | --- | --- |
| **Foundation models** | GPT-4o, o-series, DALL-E, Phi | Claude, Titan, Llama, Mistral, Stability | Gemini family, Imagen, open models |
| **Enterprise integrations** | Active Directory, Teams, Power Platform | IAM, S3, Lambda, existing AWS estate | BigQuery, Workspace, Apigee |
| **Compliance certifications** | HIPAA, SOC 2, ISO 27001, FedRAMP | HIPAA, SOC 2, ISO 27001, FedRAMP | HIPAA, SOC 2, ISO 27001, FedRAMP |
| **Data residency options** | Regional deployments; EU data boundary | Regions globally; Bedrock data policies | Regions globally; EU sovereign cloud |
| **Fine-tuning** | Azure OpenAI fine-tuning | Bedrock fine-tuning (selected models) | Supervised tuning, RLHF via Vertex |
| **MLOps integration** | Azure ML | SageMaker | Vertex AI Pipelines |
| **Pricing model** | PTUs (provisioned) + pay-per-token | Pay-per-token; no provisioned capacity | Pay-per-token; A3 TPU instances |

### Multi-Cloud Rationale

Most enterprises do not choose multi-cloud for AI — they end up with it because:

- Different models are available on different providers (Claude on Bedrock, GPT-4o on Azure)
- Existing workloads are on different clouds and data gravity drives AI placement
- Negotiated enterprise agreements with multiple providers
- Risk diversification against provider outages or pricing changes

Architectural implication: your model gateway must be cloud-provider-agnostic. Abstract behind a common interface so application teams do not know or care which provider serves a given request.

### On-Premises for Regulated Industries

Financial services, healthcare, defence, and government often cannot send data to managed cloud APIs due to:

- Regulatory requirements (data must not leave specific jurisdictions)
- Contractual restrictions (customer data cannot be processed by third parties)
- Classification levels (OFFICIAL-SENSITIVE and above)

On-premises AI architecture requires:

- GPU infrastructure procurement and lifecycle management
- Open-weight model selection (Llama, Mistral, Qwen, Phi)
- vLLM, TGI, or TensorRT-LLM for serving
- Internal model registry and deployment pipeline
- MLSecOps practices for model supply chain security

!!! note "Data residency ≠ security"
    Data residency means data does not leave a geographic boundary. It does not mean data is secure. You still need encryption, access controls, and audit logging. These are separate concerns.

---

## Security for AI

### AI-Specific Threats

Traditional security threats still apply. AI introduces a new threat surface on top:

| Threat | Description | Enterprise impact |
| --- | --- | --- |
| **Prompt injection** | Attacker embeds instructions in data that the model obeys | Agent performs unintended actions; data exfiltration |
| **Indirect prompt injection** | Malicious instructions hidden in documents, emails, or web pages the agent retrieves | Particularly dangerous for agentic AI with tool access |
| **Model extraction** | Repeated querying to reconstruct model weights or training data | IP theft; privacy breach |
| **Data poisoning** | Corrupting training or fine-tuning data to introduce backdoors | Subtle, hard-to-detect model compromise |
| **Jailbreaking** | Bypassing safety instructions to produce harmful output | Reputational risk; compliance violation |
| **Sensitive data exfiltration** | Model trained on or given access to PII/confidential data leaks it | Regulatory breach; customer trust |
| **Supply chain attacks** | Compromised model weights, compromised orchestration library | Backdoor in production AI system |

### OWASP Top 10 for LLMs Applied to Enterprise

The OWASP Top 10 for Large Language Model Applications (2025) provides a structured threat taxonomy. Enterprise-relevant applications:

1. **LLM01 Prompt Injection** — enforce strict input/output validation; use guardrails; log all inputs
2. **LLM02 Sensitive Information Disclosure** — classify data before sending to models; apply output filtering
3. **LLM03 Supply Chain** — verify model provenance; pin framework versions; scan dependencies
4. **LLM04 Data and Model Poisoning** — validate training data; monitor model behaviour drift
5. **LLM05 Improper Output Handling** — never execute LLM output as code without sandboxing
6. **LLM06 Excessive Agency** — minimise tool permissions; require human approval for destructive actions
7. **LLM07 System Prompt Leakage** — treat system prompts as secrets; test for leakage
8. **LLM08 Vector and Embedding Weaknesses** — validate retrieval quality; monitor for retrieval poisoning
9. **LLM09 Misinformation** — implement grounding checks; require citations; evaluate factuality
10. **LLM10 Unbounded Consumption** — set rate limits, token budgets, and cost alerts at the gateway

### Agentic AI Security Controls

!!! warning "Agents with tool access are a new attack surface"
    An agent that can call APIs, read files, send emails, or execute code is a potential insider threat vector. Treat every tool call as a privileged operation.

Required controls for enterprise agents:

- **Least privilege tool access**: agents only have access to the specific tools required for their task
- **Input sanitisation**: strip or escape content from external sources before it enters the agent's context
- **Output validation**: validate tool call arguments before execution, not just after
- **Confirmation gates**: require human approval before irreversible actions (delete, send, publish, transfer)
- **Execution sandboxing**: code execution tools run in isolated containers with network restrictions
- **Session limits**: cap maximum tool calls, tokens, and wall-clock time per agent session
- **Audit logging**: immutable log of every agent action, tool call, and decision

---

## Responsible AI Architecture

### Explainability Requirements by Use Case

| Use case | Explainability requirement | Architecture implication |
| --- | --- | --- |
| **Customer-facing recommendation** | Low — "why did I see this?" UX | Log top retrieval context; surface to UI |
| **Credit/loan decision** | High — regulatory (adverse action notice) | Avoid opaque LLM decisions; use interpretable models; LLM only for summarisation |
| **Medical diagnosis support** | Very high — clinician accountability | LLM as evidence summariser only; human decision required; full citation |
| **HR screening** | High — bias/discrimination risk | Audit for demographic parity; human review required |
| **Fraud detection** | Medium — investigator accountability | Provide evidence bundle; LLM narrative optional |
| **Internal knowledge search** | Low | Citation of retrieved source sufficient |

### Audit Trail Architecture

An AI audit trail must capture:

```
  For every AI interaction:
  ├── Request
  │   ├── Timestamp (UTC, immutable)
  │   ├── User / service identity
  │   ├── Application and version
  │   ├── Input (prompt, documents, parameters)
  │   └── Model and version requested
  ├── Retrieval (if RAG)
  │   ├── Query embedding hash
  │   ├── Retrieved chunk IDs and scores
  │   └── Retrieval latency
  ├── Inference
  │   ├── Model actually used (may differ from requested)
  │   ├── Input token count
  │   ├── Output token count
  │   ├── Latency
  │   └── Cost
  └── Response
      ├── Output text (or hash if too large)
      ├── Guardrail decisions (pass/block/modify)
      └── Human review decision (if applicable)
```

Audit logs must be:

- **Immutable** — written to append-only storage (S3 Object Lock, Azure Immutable Blob)
- **Retained** — per regulatory schedule (often 7+ years for financial services)
- **Searchable** — indexed by user, application, time range, and model
- **Tamper-evident** — hash chaining or log integrity verification

### Human-in-the-Loop Patterns

| Pattern | Trigger | Use case |
| --- | --- | --- |
| **Always-on review** | Every output reviewed before use | High-risk decisions; early deployment phase |
| **Confidence-gated** | Review triggered when model confidence below threshold | Classification tasks with confidence scores |
| **Exception-based** | Review triggered when output flagged by guardrails | Scale-efficient; guardrails must be reliable |
| **Spot-check** | Random sample reviewed | Quality monitoring; compliance sampling |
| **User-initiated** | End user requests review | Low-risk applications; user agency |
| **Pre-execution gate** | Human approves before agent takes action | Agentic AI with irreversible tool access |

### Model Cards

A model card documents the properties, intended uses, limitations, and evaluation results of a model. Enterprise model cards should include:

- Model name, version, and provider
- Intended use cases and out-of-scope uses
- Training data description (where known)
- Evaluation results across relevant dimensions
- Known limitations and failure modes
- Bias and fairness evaluation results
- Contact and ownership information
- Review and approval sign-off

Maintain model cards in a model registry alongside the deployed model artefact.

---

## FinOps for AI

### Token Cost Management

Token costs are the primary variable cost driver for managed API usage. The unit economics:

- **Input tokens**: typically cheaper; driven by prompt length, system prompts, retrieved context
- **Output tokens**: typically more expensive; driven by response verbosity
- **Cached tokens**: prompt caching reduces cost for repeated prefixes (Anthropic, Google, and others support this)
- **Embedding tokens**: lower cost; volume can be very high for large knowledge bases

!!! tip "Prompt caching is the highest-leverage cost lever"
    For applications with long, stable system prompts (instructions, personas, policy documents), prompt caching can reduce costs by 50–90% on the cached portion. Model it explicitly in your FinOps projections.

### Cost-Per-Use-Case Allocation

Tag every AI API call at the gateway level with:

- **Team** (cost centre)
- **Application** (system of record)
- **Use case** (specific capability or feature)
- **Environment** (production / staging / development)

This enables reporting such as:

| Use case | Monthly token cost | Cost per transaction | Volume | Trend |
| --- | --- | --- | --- | --- |
| Customer support chatbot | $12,400 | $0.04 | 310,000 conversations | +8% MoM |
| Contract analysis | $8,200 | $1.64 | 5,000 documents | -2% MoM |
| Code review assistant | $3,100 | $0.02 | 155,000 reviews | +22% MoM |

### Optimisation Levers

| Lever | Typical saving | Complexity |
| --- | --- | --- |
| **Prompt caching** | 50–90% on cached tokens | Low |
| **Model downsizing** (use smaller model where quality permits) | 60–90% cost reduction | Medium — requires eval to validate |
| **Response length control** | 20–40% | Low |
| **Batching** (offline workloads) | 50% (batch pricing) | Low for offline tasks |
| **Retrieval precision** (send fewer, better chunks) | 15–30% | Medium |
| **Semantic caching** (cache similar queries) | 20–60% depending on query distribution | Medium |
| **Fine-tuned smaller model** | 80–95% vs. frontier model | High — requires training pipeline |

### Reporting to Business Stakeholders

Business stakeholders do not think in tokens. Translate costs into business terms:

- Cost per customer conversation (not cost per 1,000 tokens)
- Cost per document processed
- Cost per code review completed
- AI cost as a percentage of revenue or gross margin
- Unit economics trajectory as volume scales

---

## Observability

### Monitoring Dimensions

A complete AI observability strategy covers five dimensions:

| Dimension | Metrics | Alerting threshold example |
| --- | --- | --- |
| **Latency** | P50, P95, P99 end-to-end; time to first token; LLM latency vs. app latency | P95 > 8s |
| **Accuracy / quality** | LLM-as-judge scores; human eval sampling; task-specific metrics | Mean quality score < 3.8/5 |
| **Cost** | Token spend per hour; cost per transaction; spend vs. budget | Daily spend > 110% of forecast |
| **Usage** | Request volume; active users; feature adoption | Sudden 5× spike |
| **Drift** | Input distribution shift; output quality degradation over time; retrieval recall | Quality drop > 10% week-on-week |

### Continuous Evaluation in Production

Production evaluation is different from pre-deployment evaluation. You are not testing whether the model can answer correctly — you are testing whether it continues to answer correctly over time, on real user queries.

Approaches:

- **LLM-as-judge**: route a sample of production completions to a more capable model for quality scoring
- **Human sampling**: route 1–5% of completions to human reviewers
- **Golden set monitoring**: maintain a fixed set of representative queries with known correct answers; run them against production daily
- **User feedback integration**: thumbs up/down, corrections, and escalations as weak quality signals

### Alerting on Quality Degradation

!!! warning "Quality can degrade without any system alert"
    A model provider quietly changing behaviour, a retrieval index becoming stale, or a prompt that worked for one use case breaking another — none of these trigger infrastructure alerts. Quality alerts are your last line of defence.

Alert on:

- LLM-as-judge mean score dropping below threshold
- Guardrail block rate spiking (suggests input distribution shift or adversarial activity)
- Human escalation rate increasing
- Retrieval recall dropping on golden query set
- Output length distribution shifting significantly (often indicates prompt regression)

---

## Reference Architecture: Financial Services

The following reference architecture shows a complete enterprise AI architecture for a mid-large financial services firm. Technology choices are illustrative of common patterns, not prescriptive.

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │                 BUSINESS CAPABILITIES                               │
  │  Retail Banking │ Wealth Mgmt │ Risk & Compliance │ Operations      │
  └────────────────────────────┬────────────────────────────────────────┘
                               │
  ┌────────────────────────────▼────────────────────────────────────────┐
  │                    APPLICATION LAYER                                │
  │                                                                     │
  │  ┌───────────────┐  ┌────────────────┐  ┌───────────────────────┐  │
  │  │ Customer Chat │  │  Analyst Agent │  │  Doc Processing API   │  │
  │  │ (Teams / Web) │  │ (Wealth Mgmt)  │  │  (Contract review,    │  │
  │  │               │  │                │  │   Regulatory filing)  │  │
  │  └───────┬───────┘  └───────┬────────┘  └───────────┬───────────┘  │
  └──────────┼──────────────────┼───────────────────────┼──────────────┘
             │                  │                        │
  ┌──────────▼──────────────────▼───────────────────────▼──────────────┐
  │                    AI PLATFORM LAYER                                │
  │                                                                     │
  │  ┌─────────────────────────────────────────────────────────────┐   │
  │  │  Model Gateway (LiteLLM + Azure APIM)                       │   │
  │  │  · Routes to Azure OpenAI (GPT-4o) and Anthropic (Claude)   │   │
  │  │  · Rate limits per app; cost tagging; audit logging         │   │
  │  │  · Failover between providers                               │   │
  │  └─────────────────────────────────────────────────────────────┘   │
  │                                                                     │
  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  ┌───────────┐  │
  │  │ Prompt Mgmt  │  │   Eval       │  │Guardrails│  │ Observ-   │  │
  │  │ (Langfuse)   │  │  Harness     │  │(Azure    │  │ ability   │  │
  │  │              │  │  (DeepEval + │  │ Content  │  │(Langfuse+ │  │
  │  │              │  │   Ragas)     │  │ Safety + │  │ Datadog)  │  │
  │  │              │  │              │  │ custom)  │  │           │  │
  │  └──────────────┘  └──────────────┘  └──────────┘  └───────────┘  │
  └─────────────────────────────────────────────────────────────────────┘
             │
  ┌──────────▼──────────────────────────────────────────────────────────┐
  │                      DATA LAYER                                     │
  │                                                                     │
  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
  │  │  Knowledge Base  │  │  Feature Store   │  │  Data Pipeline   │  │
  │  │  Azure AI Search │  │  (Tecton + Redis)│  │  (Azure Data     │  │
  │  │  + pgvector      │  │                  │  │   Factory +      │  │
  │  │  Hybrid search   │  │  Customer risk   │  │   Event Hub)     │  │
  │  │  Regulatory docs │  │  profile features│  │                  │  │
  │  │  Product docs    │  │  Transaction     │  │  Nightly refresh │  │
  │  └──────────────────┘  │  history         │  │  Event-driven    │  │
  │                        └──────────────────┘  │  re-indexing     │  │
  │                                              └──────────────────┘  │
  └─────────────────────────────────────────────────────────────────────┘
             │
  ┌──────────▼──────────────────────────────────────────────────────────┐
  │                  INFRASTRUCTURE LAYER                               │
  │  Azure OpenAI Service (GPT-4o, Ada-002 embeddings)                 │
  │  Azure Kubernetes Service (orchestration services, LiteLLM)        │
  │  Azure Blob Storage + ADLS Gen2 (document store, audit logs)       │
  │  Azure Key Vault (secrets), Entra ID (identity)                    │
  └─────────────────────────────────────────────────────────────────────┘

  ╔═════════════════════════════════════════════════════════════════════╗
  ║                  GOVERNANCE & COMPLIANCE                            ║
  ║  Microsoft Purview (data lineage) · Azure Policy (guardrails)      ║
  ║  Entra ID Conditional Access · Immutable audit log (Blob Lock)     ║
  ║  Responsible AI review board · Quarterly model card updates        ║
  ║  DORA compliance controls · FCA Consumer Duty alignment            ║
  ╚═════════════════════════════════════════════════════════════════════╝
```

---

## Architecture Decision Records

### ADR-001: Managed Model API vs. Self-Hosted

**Status**: Accepted

**Context**: The organisation needs to provide foundation model access to 12 product teams with varying use cases, data sensitivity levels, and volume profiles.

**Decision**: Use managed model APIs (Azure OpenAI as primary, Anthropic API as secondary) for all use cases except those involving OFFICIAL-SENSITIVE data, which will use a self-hosted Llama deployment on dedicated Azure VMs.

**Rationale**:

- Managed APIs reach production in days vs. months for self-hosted GPU infrastructure
- Azure OpenAI provides data processing agreements compatible with our regulatory requirements for CONFIDENTIAL-minus data
- Self-hosted is reserved for the <15% of use cases with the highest data classification
- A model gateway abstracts the difference so application teams are unaffected if the decision changes

**Consequences**:

- Token costs are variable and must be forecast and monitored carefully
- Model updates are controlled by the provider; we accept this risk in exchange for ops simplicity
- Self-hosted path will require GPU procurement (6–12 week lead time)
- Revisit if monthly token spend exceeds £150k; at that point TCO may favour self-hosted

---

### ADR-002: Vector Database Selection

**Status**: Accepted

**Context**: Multiple teams need vector search for RAG applications. Evaluating Pinecone, Weaviate, Azure AI Search, and pgvector.

**Decision**: Use **Azure AI Search** as the primary vector store for production use cases. Use **pgvector** for teams with existing PostgreSQL infrastructure and low-scale requirements. Use **Chroma** for local development only.

**Rationale**:

- Azure AI Search integrates with our existing Azure estate, Entra ID RBAC, and Purview data governance
- Hybrid search (vector + BM25) is a first-class feature, avoiding the need for a separate keyword search system
- pgvector meets requirements for teams at <10M document scale without new infrastructure
- Pinecone was ruled out on data residency grounds (US-hosted by default)

**Consequences**:

- Teams cannot self-select a vector database without architecture review approval
- Migration from pgvector to Azure AI Search is a defined upgrade path as teams scale
- Index schema changes require re-embedding, which has cost implications

---

### ADR-003: Agent Orchestration Framework

**Status**: Accepted

**Context**: Three teams are building agent systems simultaneously, using LangChain, Semantic Kernel, and custom Python respectively. Divergence is creating integration and support complexity.

**Decision**: Standardise on **LangGraph** for complex stateful agent workflows. Teams may use lightweight custom implementations for simple chains. Semantic Kernel is permitted for .NET teams.

**Rationale**:

- LangGraph's graph-based state machine model maps naturally to our compliance requirements (explicit state, auditable transitions)
- First-class support for human-in-the-loop interrupts is essential for our financial services context
- LangGraph integrates with LangSmith for observability without additional tooling
- Semantic Kernel carve-out avoids forcing .NET teams to adopt Python infrastructure

**Consequences**:

- Teams using plain LangChain must migrate to LangGraph; 8-week migration window
- LangGraph adds abstraction complexity; simpler use cases may be over-engineered
- Framework lock-in risk; mitigated by keeping business logic in plain Python, using LangGraph only for orchestration

---

### ADR-004: Evaluation Approach

**Status**: Accepted

**Context**: Teams are deploying AI features without a consistent quality gate. Several incidents of regression have occurred post-deployment.

**Decision**: All AI features must pass an automated evaluation gate before deployment. Evaluation uses **DeepEval** for unit tests and **Ragas** for RAG quality. An LLM-as-judge (GPT-4o) provides continuous production quality scoring on 5% of live traffic. Human evaluation required for high-risk use cases.

**Rationale**:

- Automated eval gates catch regressions before production; LLM-as-judge catches drift in production
- Separating pre-deployment (DeepEval/Ragas) from continuous (LLM-as-judge) gives defence in depth
- Standardising tooling reduces the overhead of maintaining multiple eval frameworks

**Consequences**:

- Teams must invest in eval dataset creation; AI Platform team will provide tooling and templates
- LLM-as-judge adds ~£800/month in API costs at current volume; this is budgeted centrally
- Human eval panel requires resourcing; scoped to 5 high-risk use cases initially

---

### ADR-005: AI Governance Tooling

**Status**: Accepted

**Context**: Responsible AI policy requires audit trails, model cards, bias testing, and human review queues. These are currently managed ad hoc per team.

**Decision**: Implement **Microsoft Purview** for data lineage and classification, **Langfuse** for AI observability and audit logging, and a custom **Model Registry** (Azure ML Model Registry + internal metadata) for model cards and approval workflows. Human review queue built on Azure Logic Apps.

**Rationale**:

- Purview is already licensed and integrates with Azure estate; avoiding new vendor for data governance
- Langfuse provides self-hosted option meeting our data classification requirements for audit logs
- Azure ML Model Registry provides the storage and versioning substrate; we layer metadata and approval workflow on top
- Logic Apps for review queue leverages existing workflow capability; avoids new tooling

**Consequences**:

- Langfuse self-hosted instance requires operations resourcing (2 sprints to set up, ongoing maintenance)
- Custom model registry metadata layer adds development work; estimated 6 weeks
- All teams must register models before production deployment; enforced via deployment pipeline gate

---

## Five Teaching Lenses

### Beginner Lens

Start here: **the reason enterprises need an AI architecture (not just AI features) is the same reason they needed a cloud architecture in 2012.** When one team does something, you can figure it out as you go. When fifty teams do it simultaneously, the inconsistency becomes the problem.

The most important thing a beginner can learn about enterprise AI architecture is the concept of the **platform layer**. Before you build more features, build the thing that makes building features safe, consistent, and measurable. That is the model gateway, the eval harness, and the guardrails. Everything else is built on top of that.

### Enterprise Lens

Enterprise AI architecture is primarily an **organisational and governance problem** that happens to involve technology. The hardest parts are not the technical components — it is getting agreement on who owns the platform, who pays for shared infrastructure, how decisions get made when teams disagree, and what "responsible AI" means in a context where every use case has different risk.

The AI Platform team is a new kind of team that does not exist in most organisations. Creating it, funding it, and giving it the authority to set standards is the real architectural work.

### Architecture Lens

The key architectural insight is that **the AI platform layer creates leverage**. Every investment in the model gateway, eval framework, and guardrails pays dividends across every application team that builds on it. The failure mode is treating AI architecture as a per-project concern rather than a shared infrastructure concern.

Design for pluggability: abstract the model provider, the vector store, and the orchestration framework behind stable interfaces. The specific technologies will change faster than your application logic should.

### Executive Lens

Enterprise AI architecture is a **strategic capability, not a project**. You are building the platform that will underpin your AI-enabled business capabilities for the next five to ten years. The return on investment compounds: the more use cases deployed on a shared, well-governed platform, the lower the marginal cost and risk of each new one.

The risks of under-investing in AI architecture are concrete: ungoverned AI creates regulatory exposure; unmonitored AI creates silent quality failures; unattributed AI costs create budget surprises. The risks of over-engineering are also real: analysis paralysis while competitors ship.

The right frame: build the minimum viable platform that lets teams ship safely, with a clear roadmap to add sophistication as volume and complexity grow.

### Consultant Lens

When you assess an organisation's enterprise AI architecture maturity, look for five signals:

1. **Is there a model gateway?** If every team has their own API key, there is no enterprise AI architecture.
2. **Is there a standard eval process?** If teams cannot tell you their model's quality metrics, they are flying blind.
3. **Can costs be attributed by use case?** If the AI spend is a single line item, FinOps is immature.
4. **Is there an audit trail?** If you asked the CISO where every AI call goes, could they answer?
5. **Is responsible AI policy operationalised or aspirational?** A PDF in a SharePoint is not a governance control.

Score these five: 0–1 is foundational maturity; 2–3 is developing; 4–5 is established. Your first engagement should always move the lowest-scoring dimension one level up.

---

## Eight Common Mistakes in Enterprise AI Architecture

!!! warning "Mistake 1: Building a monolith of AI features with no platform layer"
    Each team builds its own integration to the model API, its own prompt management, its own logging. The result is inconsistent governance, duplicated cost, and no ability to enforce standards. Fix: build the model gateway and eval harness before your third AI use case, not after your thirtieth.

!!! warning "Mistake 2: Treating prompts as runtime configuration, not code"
    Prompts are changed in production without review, testing, or rollback capability. Quality regressions are discovered by users, not tests. Fix: version control prompts, gate changes through eval, promote through environments.

!!! warning "Mistake 3: No evaluation harness before going to production"
    Teams ship AI features with no automated quality gate. The first indication of a problem is a user complaint or an incident. Fix: require a passing eval suite as a deployment gate, even if the suite starts small.

!!! warning "Mistake 4: Underestimating data architecture work"
    Teams assume RAG is "plug in a vector database." In practice, document extraction, chunking strategy, metadata design, and freshness management are each 2–4 week workstreams. Fix: budget data architecture work explicitly and tackle it in parallel with model selection.

!!! warning "Mistake 5: Ignoring agentic AI security controls"
    Agents are given broad tool access without sandboxing, human approval gates, or execution limits. A misbehaving agent can take expensive, irreversible actions before anyone notices. Fix: apply least-privilege, require human approval for destructive actions, set hard execution limits.

!!! warning "Mistake 6: Cost attribution as an afterthought"
    AI costs are paid from a central budget with no attribution to teams or use cases. When costs grow, no one knows where they came from or which use cases are inefficient. Fix: tag every API call at the gateway with team, application, and use case from day one.

!!! warning "Mistake 7: Confusing responsible AI policy with responsible AI architecture"
    An AI ethics policy exists as a document. No one has implemented the audit trails, bias testing, or human review queues that would operationalise it. Fix: every policy requirement must map to a specific architectural control — if there is no architectural implementation, the policy is aspirational only.

!!! warning "Mistake 8: Locking application logic into the orchestration framework"
    Business rules, domain logic, and data transformations are written inside LangChain chains or LangGraph nodes. When the framework is upgraded or replaced, all of it must be rewritten. Fix: keep business logic in plain Python functions; use the framework only as an orchestration wrapper.

---

## Mastery Checklist

Use this checklist to assess readiness for enterprise AI architecture responsibilities.

**Foundations**

- [ ] Can explain the difference between building an AI feature and building an AI platform, and why the distinction matters
- [ ] Can draw the enterprise AI architecture stack from memory, including the cross-cutting concerns
- [ ] Can describe the role and required capabilities of a model gateway

**AI Platforms**

- [ ] Can evaluate managed API vs. self-hosted trade-offs for a given set of requirements
- [ ] Can design a prompt management system with version control, environment promotion, and rollback
- [ ] Can select and configure an appropriate orchestration framework for a given use case
- [ ] Can design a pre-deployment evaluation pipeline using automated metrics

**Agent Platforms**

- [ ] Can articulate enterprise agent platform requirements beyond basic orchestration
- [ ] Can design a multi-agent architecture using at least two orchestration patterns
- [ ] Can specify security controls for an agent with sensitive tool access
- [ ] Can describe what an agent observability trace must capture

**Knowledge Platforms**

- [ ] Can compare vector database options on the dimensions that matter for an enterprise procurement decision
- [ ] Can design a RAG pipeline including chunking, enrichment, retrieval, and re-ranking
- [ ] Can design a knowledge freshness management strategy for a high-change document corpus

**Data Architecture**

- [ ] Can explain the purpose of a feature store and when it is needed
- [ ] Can specify data lineage requirements for a regulated AI system
- [ ] Can describe what a data contract is and why AI systems need them

**Cloud and Infrastructure**

- [ ] Can compare Azure OpenAI, AWS Bedrock, and Google Vertex AI for a given enterprise scenario
- [ ] Can articulate when on-premises AI deployment is required and what it entails

**Security, Governance, and FinOps**

- [ ] Can list and explain the OWASP Top 10 for LLMs in the context of an enterprise deployment
- [ ] Can design an AI audit trail architecture that meets regulatory requirements
- [ ] Can explain at least five cost optimisation levers for token-based AI spend
- [ ] Can design an AI observability strategy covering all five monitoring dimensions
- [ ] Can write an Architecture Decision Record for an AI architecture decision

---

!!! note "Next Module"
    Module 10 covers **AI Operating Models and the AI Centre of Excellence** — how to structure the team, governance, and ways of working that bring enterprise AI architecture to life inside an organisation.

---

## Reference Material

The canonical reference pages for the topics covered in this module live in the **Enterprise Architecture** section:

- [Enterprise AI Architecture Reference](../../enterprise-architecture/ai-architecture/index.md) — architecture patterns, agent reference architectures, governance frameworks
- [Enterprise AI Architecture Patterns](../../enterprise-architecture/ai-architecture/enterprise-ai-architecture-patterns.md)
- [Enterprise Agent Reference Architectures](../../enterprise-architecture/ai-architecture/enterprise-agent-reference-architectures.md)
- [AI Governance & Compliance](../../enterprise-architecture/ai-architecture/enterprise-ai-governance-compliance.md)
- [Machine-Readable EA](../../enterprise-architecture/ai-architecture/machine-readable-ea.md)