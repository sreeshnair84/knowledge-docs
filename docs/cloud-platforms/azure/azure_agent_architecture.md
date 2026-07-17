---
title: 'Azure AI Agent Architecture — Production Grade'
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: converted-html
source_file: 'azure_agent_architecture.html'
doc_type: guide
tags: [azure, cloud, agent-architecture, reference-architecture]
covers_version: "2026"
---

# Azure AI Agent Architecture — Production Grade

AZURE AI ENTERPRISE ARCHITECTURE · PRODUCTION GRADE 

## AI Agent System Design

Phased delivery roadmap · Azure-native services · RAI-compliant

⚠️

// DESIGN REVIEW — ISSUES FOUND IN ORIGINAL

▶Model Router & Knowledge Base marked "?" — must be decided before prod

▶Auth scattered across layers — no unified Microsoft Entra ID plane

▶No Azure service bindings — components are abstract, not deployable

▶HIL placement is ambiguous — not wired to approval workflow

▶No circuit breaker / retry policy per layer

▶Worker Registry YAML format undefined (Ph1 label suggests deferred)

▶Feedback loop shown but not operationalized into MLOps pipeline

▶No VNet / private endpoint topology — security gap for enterprise

▶Eval Agent Plan disconnected from CI/CD pipeline

▶No SLA budget defined per hop in agent chain

Phase 1 · Foundation (Wks 1–8)

Phase 2 · Intelligence & Scale (Wks 9–16)

Phase 3 · Enterprise & Governance (Wks 17–24)

Cross-cutting (All Phases)

⬛ CROSS-CUTTING — ALL PHASES

Microsoft Entra ID

Azure Monitor + App Insights

Azure Key Vault

Azure Policy

Private Endpoints + VNet

AI Content Safety

GitHub Actions CI/CD

Defender for Cloud

PHASE 1

Foundation — Orchestrate & Secure

Weeks 1–8 · MVP

▶ Goal: Single-agent loop running in prod. Auth, basic memory, guardrails, observability baseline.

🧠 ORCHESTRATION LAYER

Prompt + Hosted Agent Azure Container Apps

Stateless orchestration host. Semantic Kernel or LangChain. Auto-scales 0→N. Revision-based deployments for zero-downtime rollout.

stateless KEDA-scaled managed identity

Short-Term Memory Azure Cache for Redis

Single-session context window. TTL = session lifetime (default 30 min). JSON serialized. Per-session key isolation.

TTL-evicted per-session

HIL — Human in the Loop Azure Logic Apps

Approval gates for high-risk actions. Logic Apps Standard with approval email + Teams card. Timeout = 4h → auto-escalate or reject.

async-gate timeout-policy

🔐 GATEWAY & IDENTITY

AI Gateway Azure APIM

Single ingress for all LLM calls. Rate limiting, token quota, retry policies, semantic caching. Backends: Azure OpenAI (primary) + fallback.

rate-limit token-quota semantic-cache

Unified Auth Microsoft Entra ID

Managed Identity for all service-to-service. OAuth2 / OIDC for user-facing APIs. Service Principals for workers. No secrets in code — all via Key Vault refs.

managed-identity RBAC

LLM Endpoint Azure OpenAI Service

GPT-4o as primary model. PTU (Provisioned Throughput) for latency SLA. APIM handles retry + circuit breaker on 429/503.

PTU circuit-breaker

🛡️ GUARDRAILS (BASELINE)

Content Safety Azure AI Content Safety

Input + output screening. Hate, violence, self-harm, sexual categories. Severity thresholds configured per deployment env. Block or warn modes.

input-screen output-screen

Observability Baseline App Insights + Log Analytics

Distributed tracing (W3C TraceContext). Token usage per request, latency per hop, error rates. Alert rules on P95 > 5s, error rate > 2%.

W3C-trace alerts

PHASE 2

Intelligence & Scale — Multi-Agent + RAG

Weeks 9–16 · Scale

▶ Goal: Worker registry live, model routing decided, long-term memory + RAG, multi-agent execution.

⚡ MULTI-AGENT EXECUTION

Worker Capability Registry Azure Service Bus + ACR

YAML contract schema v1 (name, version, inputs, outputs, SLA, auth-scope). Published to ACR OCI artifacts. Discovery via Service Bus topic. Semantic versioning enforced.

YAML-contract semver OCI-artifact

Externally Hosted Workers Azure Container Apps Jobs

Command-driven (NOT chat). Each worker: stateless, independently versioned, KEDA scaled. HOW layer — receives structured command payload, returns typed result.

command-driven stateless typed-I/O

MCP Tool Layer Azure Functions (Isolated)

MCP-compliant tool wrappers. Each tool = 1 Function App. Input/output schema validated via JSON Schema. 30s exec timeout; long-running tasks → Durable Functions.

MCP-spec schema-validated durable

🗄️ MEMORY & KNOWLEDGE

Long-Term Memory Azure Cosmos DB (NoSQL)

Multi-session persistent store. Per-user + per-agent namespacing. TTL = 90 days default. Cosmos change feed triggers indexing to AI Search.

multi-session change-feed

Knowledge Base (RAG) Azure AI Search + OpenAI Embeddings

Hybrid search (vector + BM25 keyword). text-embedding-3-large at 3072 dims. Semantic reranking enabled. Index refresh via ADF pipeline on doc change.

hybrid-search semantic-rank ADF-refresh

🔀 MODEL ROUTING (RESOLVED)

Model Router APIM Policy + Named Values

Routes by: task_type (reasoning→o1, chat→gpt-4o, summarize→gpt-4o-mini), token budget, latency SLA, PTU availability. Fallback chain: PTU → Pay-as-you-go → secondary region.

task-routing PTU-first region-failover

Plan State & Replanning Azure Cosmos DB + Redis

Orchestrator persists plan DAG to Cosmos (durable). Active execution state in Redis (fast). Retry policy: 3 attempts with exponential backoff. Fallback = HIL escalation.

DAG-plan retry-policy HIL-fallback

PHASE 3

Enterprise & Governance — RAI, MLOps, Resilience

Weeks 17–24 · Enterprise

▶ Goal: Full RAI traceability, feedback-driven retraining, chaos tested, multi-tenant, compliance-ready.

🔍 RAI & TRACEABILITY

AI Traceability — Decision Azure AI Foundry Tracing

Full lineage: prompt → plan → tool calls → model → output. OpenTelemetry spans with semantic conventions. Immutable audit log to Log Analytics. Linked to compliance reports.

OTel-spans immutable-log lineage

AI Traceability — Action Azure AI Foundry + Prompt Shields

Per-worker action logging with explainability scores. Prompt injection detection (Prompt Shields). Groundedness check on RAG outputs. Confidence thresholds trigger review queue.

prompt-shields groundedness confidence-gate

Explainability (RAI) Azure Responsible AI Dashboard

Fairness, reliability, privacy metrics dashboards. Error analysis on agent decisions. Automated red-teaming via PyRIT. Monthly RAI scorecard to stakeholders.

fairness red-team scorecard

🔄 MLOps & FEEDBACK LOOP

Feedback Learning Azure ML + Azure AI Foundry

User signals (thumbs, corrections, escalations) → Event Hub → Azure ML dataset. Fine-tuning pipeline on weekly cadence. A/B evaluation via Prompt Flow eval runs before promotion.

Event-Hub fine-tune A/B-eval

Eval Agent Framework Azure ML Prompt Flow

Automated golden-set evaluation in CI pipeline. LLM-as-judge + deterministic metrics (F1, BLEU, groundedness). Gate: no promotion if eval score drops > 5%. Results published to ADO dashboard.

CI-gate LLM-judge ADO-dashboard

🏗️ ENTERPRISE RESILIENCE

Multi-Region Active-Active Azure Traffic Manager + ACA

Primary: East US 2, Secondary: West Europe. Traffic Manager with health probes. Cosmos DB multi-write regions. AOAI deployments mirrored. RTO < 5min, RPO = 0.

active-active RTO<5min RPO=0

Network Isolation Private Endpoints + Azure Firewall

All PaaS services via Private Endpoints. Egress via Azure Firewall with FQDN allow-lists. No public internet access from agent workloads. NSG + UDR applied.

private-endpoint zero-trust NSG+UDR

Chaos Engineering Azure Chaos Studio

Monthly fault injection: AOAI throttling, Redis outage, ACA pod eviction. Validate circuit breakers and fallback paths. Chaos hypotheses tracked in ADO. Results feed SLA reviews.

fault-inject circuit-breaker monthly-run

Production Request Flow

User / System

API call + JWT

→

APIM (AI Gateway)

Auth · Rate limit · Cache

→

Content Safety

Input screening

→

Orchestrator (ACA)

Intent · Plan · State

↓ orchestrator dispatches to workers

Worker Registry

Capability lookup

→

Model Router

Route by task type

→

Worker (ACA Jobs)

Execute command

→

Azure OpenAI / Tool

Inference / API call

↓ results aggregated, logged, returned

RAI Traceability

Lineage + audit

→

Content Safety

Output screening

→

Feedback Capture

Event Hub → ML

→

User / System

Typed response

🛡 GUARDRAILS — APPLIED AT EVERY BOUNDARY

Input Content Safety

Prompt Shields (injection)

Schema Validation (I/O)

Token Budget Enforcement

Groundedness Check

Output Content Safety

RAI Confidence Threshold

HIL Escalation Gate

Worker Contract Properties (Each Worker Must Satisfy)

◻Stateless — no local state between invocations

⬆Horizontally scalable — KEDA or ACA autoscale

📦Independently deployable — separate ACA revision

🏷Semantically versioned — registry contract enforced

🔐Auth via Managed Identity — no credentials in image

📋Typed I/O schema — JSON Schema in registry YAML

⏱SLA declared — timeout + latency budget in contract

📊OTel instrumented — spans emitted per invocation

SLA Budget Per Hop

APIM GATEWAY P95

<50ms

Auth + routing overhead

CONTENT SAFETY P95

<200ms

Input + output screen

ORCHESTRATOR P95

<500ms

Plan + dispatch (excl. LLM)

LLM INFERENCE P95

<8s

PTU deployment, streaming

WORKER EXEC P95

<30s

Durable for longer tasks

E2E AGENT TURN P95

<15s

Single-hop, streaming UX

AVAILABILITY TARGET

99.9%

Multi-region active-active

HIL ESCALATION RTO

<4h

Timeout → auto-reject

Azure AI Agent Architecture · Production Grade · 3-Phase Delivery · April 2026  
Azure OpenAI · APIM · Container Apps · Cosmos DB · AI Search · Entra ID · AI Foundry · Monitor 
