---
title: "EA Artifacts & Metrics — Real-World Examples"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["interview-prep"]
doc_type: interview-questions
target_role: EA Artifacts & Metrics — Real-World Examples
---

# EA Artifacts & Metrics — Real-World Examples

All examples use **NexaBank**, a fictional tier-2 UK retail bank with 3,200 employees undergoing an AI transformation programme. These are the actual documents an Enterprise Architect would produce — not blank templates, but realistically populated artefacts.

This page provides worked examples for the deliverables defined in [Section 11 — Key Deliverables & Artifacts](Enterprise_Architect_in_the_Age_of_AI.md#11-key-deliverables--artifacts) and metric calculations for [Section 13 — Metrics & KPIs](Enterprise_Architect_in_the_Age_of_AI.md#13-metrics--kpis).

---

## Quick Reference

| # | Artifact / Metric | Jump to |
| --- | --- | --- |
| A1 | AI Reference Architecture | [→](#1-ai-reference-architecture) |
| A2 | Agent Topology Diagram | [→](#2-agent-topology-diagram) |
| A3 | AI Decision Register | [→](#3-ai-decision-register) |
| A4 | Data Flow Diagram | [→](#4-data-flow-diagram-for-ai-systems) |
| A5 | LLM Selection Criteria Matrix | [→](#5-llm-selection-criteria-matrix) |
| A6 | Prompt Engineering Standards | [→](#6-prompt-engineering-standards) |
| A7 | Agent Design Patterns Library | [→](#7-agent-design-patterns-library) |
| A8 | AI Security Architecture Standards | [→](#8-ai-security-architecture-standards) |
| A9 | AI Architecture Review Process | [→](#9-ai-architecture-review-process) |
| A10 | Model Risk Assessment | [→](#10-model-risk-assessment) |
| A11 | AI Incident Response Playbook | [→](#11-ai-incident-response-playbook) |
| A12 | AI Vendor Assessment Framework | [→](#12-ai-vendor-assessment-framework) |
| A13 | AI Capability Roadmap | [→](#13-ai-capability-roadmap) |
| A14 | Technical Debt Register | [→](#14-technical-debt-register-for-legacy-ai) |
| A15 | LLMOps Maturity Roadmap | [→](#15-llmops-maturity-roadmap) |
| M1 | Agent Reliability Rate | [→](#1-agent-reliability-rate) |
| M2 | AI System Availability | [→](#2-ai-system-availability) |
| M3 | Prompt Drift Index | [→](#3-prompt-drift-index) |
| M4 | RAG Retrieval Precision | [→](#4-rag-retrieval-precision) |
| M5 | AI Use Case Review Cycle Time | [→](#5-ai-use-case-review-cycle-time) |
| M6 | Shadow AI Incidents | [→](#6-shadow-ai-incidents) |
| M7 | Model Risk Coverage | [→](#7-model-risk-coverage) |
| M8 | Compliance Audit Pass Rate | [→](#8-compliance-audit-pass-rate) |
| M9 | Automation ROI | [→](#9-automation-roi) |
| M10 | Developer Velocity Lift | [→](#10-developer-velocity-lift) |
| M11 | AI-Assisted Decision Quality | [→](#11-ai-assisted-decision-quality) |
| M12 | Cost per AI Transaction | [→](#12-cost-per-ai-transaction) |

---

## Part 1 — Key Deliverables & Artifacts

### 1. AI Reference Architecture

The canonical blueprint every NexaBank AI system must conform to. It defines the mandatory layers, components, and integration points. Teams must deviate only through a formal ARB exception.

```
┌─────────────────────────────────────────────────────────┐
│                   CONSUMER LAYER                        │
│  Web / Mobile Apps  ──►  API Gateway                   │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│              AI ORCHESTRATION LAYER                     │
│  Agent Orchestrator  ──►  Planner / Router              │
│        │                        │                       │
│   Memory Manager         Intent Classifier              │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│              FOUNDATION SERVICES                        │
│  LLM Inference (Claude)  │  RAG Pipeline  │  Embeddings │
└──────────┬───────────────┴───────┬─────────┴────────────┘
           │                       │
┌──────────▼───────────────────────▼────────────────────┐
│                    DATA LAYER                          │
│    Vector Store  │  Knowledge Graph  │  Document Store │
└───────────────────────────────────────────────────────┘
           │
┌──────────▼────────────────────────────────────────────┐
│               GOVERNANCE LAYER (cross-cutting)        │
│    Guardrail Service  │  Audit Logger  │  Model Monitor│
└───────────────────────────────────────────────────────┘
```

**Mandatory standards for all NexaBank AI systems:**

| Standard | Requirement |
| --- | --- |
| Guardrail routing | All LLM responses must pass through the Guardrail Service before reaching consumers |
| PII handling | Customer PII must be tokenised before entering any AI context window |
| Audit logging | Every AI decision must produce an immutable audit log entry within 200 ms |
| Data residency | All inference and data storage must remain within UK/EU regions |
| Model approval | No model may enter production without a completed Model Risk Assessment |

---

### 2. Agent Topology Diagram

**Use Case: NexaBank Customer Service Agent**

Shows all agents, their tools, memory systems, and human touchpoints.

```
  Customer
     │  query
     ▼
Front-end Chat Widget
     │  HTTPS
     ▼
Orchestrator Agent ◄──── Session Memory (5-turn window)
     │
     ▼
Intent Classifier
  ├── balance query ──► Account Balance Tool ──► Core Banking API
  ├── complaint     ──► Complaint Logger Tool ──► CRM System
  └── doc request   ──► Doc Retrieval Tool   ──► Vector Store

Orchestrator ──► Guardrail Service
             ──► Audit Logger

Orchestrator ──[confidence < 0.7]──► Human Agent Queue
                                           │  approved response
                                           └──────────────────► Orchestrator
```

**Key design choices:**

- Human escalation triggers when intent confidence < 0.7 **or** PII is detected in a sensitive context
- Session memory is bounded to 5 turns to control token cost (≈ £0.004/session)
- All tool calls are logged to Audit Logger before results return to the orchestrator
- The Human Agent Queue has a 4-hour SLA; after 8 hours the task is auto-cancelled and flagged

---

### 3. AI Decision Register

Tracks every automated decision, the model responsible, its risk tier, whether human review is required, and when it was last assessed.

| ID | System | Decision Type | Model | Risk Tier | Automated | Human Review Required | Approval Owner | Last Reviewed |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ADR-001 | Credit Scoring Agent | Credit limit recommendation | XGBoost + Claude Sonnet | High | Partial | Yes — final by human credit officer | Chief Risk Officer | 2026-06-15 |
| ADR-002 | Customer Service Bot | Account balance query | Claude Haiku | Low | Yes | No | Head of Channels | 2026-05-01 |
| ADR-003 | Fraud Detection | Transaction block | Proprietary ML + rules engine | Critical | Yes — block only | Yes — post-hoc within 4 h | Head of Fraud | 2026-06-20 |
| ADR-004 | Document Summariser | Mortgage document summary | Claude Sonnet | Medium | Yes | No — audited monthly | Head of Mortgages | 2026-04-10 |
| ADR-005 | Regulatory Reporting Agent | SAR draft generation | Claude Opus | High | Partial | Yes — MLRO must approve before filing | MLRO | 2026-06-01 |
| ADR-006 | HR Chatbot | Leave balance query | Claude Haiku | Low | Yes | No | Head of HR | 2026-03-15 |

---

### 4. Data Flow Diagram for AI Systems

**NexaBank Mortgage Document Summariser — Data Flow**

Traces how a mortgage pack enters the system, how PII is protected, and how the final response reaches the broker.

```
Mortgage Broker
      │ Upload mortgage pack (PDF)
      ▼
API Gateway
      │
      ▼
Tokenisation Service ── replaces names, NI numbers, account refs with opaque tokens
      │ tokenised document
      ▼
RAG Pipeline ── chunk (512 tokens, 50-token overlap) + embed
      │ chunk IDs
      ▼
Vector Store ── persists embeddings

      ─ ─ ─  query path  ─ ─ ─

Mortgage Broker
      │ "Summarise key risks"
      ▼
API Gateway ──► Vector Store (semantic search → top-5 chunks)
      │ relevant chunks (tokenised)
      ▼
LLM (Claude Sonnet) ── receives tokenised context + system prompt
      │ draft summary (tokenised)
      ▼
Guardrail Service ── checks for PII leakage, hallucination markers
      │ approved (or blocked with reason code)
      ▼
Tokenisation Service ── de-tokenises for authorised recipient only
      │
      ▼
Audit Logger ── records: broker_id, doc_id, summary_hash, timestamp, guardrail_result
      │
      ▼
Mortgage Broker ← summary response
```

---

### 5. LLM Selection Criteria Matrix

**NexaBank LLM Evaluation — Q2 2026**

Scores are 1–10; weighted score = sum(score × weight).

| Criterion | Weight | Claude Sonnet 4.6 | GPT-4o | Gemini 1.5 Pro | Llama 3.1 70B (self-hosted) |
| --- | --- | --- | --- | --- | --- |
| Instruction following accuracy | 20% | 9 | 8 | 8 | 7 |
| UK financial regulatory alignment (FCA) | 20% | 8 | 7 | 7 | 6 |
| Data residency — UK/EU | 15% | 8 | 6 | 7 | 10 |
| Latency — p95 < 3 s streaming | 15% | 9 | 8 | 7 | 6 |
| Cost per 1M input tokens | 15% | 8 | 6 | 7 | 9 |
| Context window size | 10% | 9 | 9 | 10 | 7 |
| Tool/function calling quality | 5% | 9 | 8 | 7 | 6 |
| Enterprise support SLA | 5% | 8 | 8 | 7 | N/A |
| **Weighted Score** | **100%** | **8.65** | **7.35** | **7.45** | **7.40** |
| **Decision** | | **SELECTED** | Reserve | Reserve | Air-gap only |

**Recommendation:** Claude Sonnet 4.6 selected as the primary model for all customer-facing and regulatory workflows, based on superior instruction following and FCA compliance posture. Llama 3.1 70B is reserved exclusively for air-gapped environments (offline fraud model inference) where data sovereignty prohibits cloud API calls.

---

### 6. Prompt Engineering Standards

**NexaBank Prompt Engineering Standard v1.3 — Effective 2026-03-01**

#### 6.1 Version Control

All production prompts are stored in the `nexabank/ai-prompts` Git repository under `prompts/<system>/<version>/system_prompt.txt`. Versioning follows semver:

| Change type | Version bump | Approval required |
| --- | --- | --- |
| Wording tweak with no behavioural change | PATCH (1.0.0 → 1.0.1) | AI Engineering Lead |
| New instruction or tool added | MINOR (1.0.x → 1.1.0) | AI Engineering Lead + QA sign-off |
| Risk tier change or major behaviour change | MAJOR (1.x.x → 2.0.0) | Architecture Review Board |

#### 6.2 Promotion Gates

All prompts must pass these gates before production deployment:

| Gate | Requirement | Owner |
| --- | --- | --- |
| G1 — Baseline | ≥ 95% pass rate on golden dataset (500 curated test cases) | AI Engineering |
| G2 — Adversarial | Pass red-team prompt injection battery (50 cases, 0 critical failures) | AI Security |
| G3 — Bias & Fairness | No demographic disparity > 3% across protected characteristics | AI Ethics |
| G4 — Regression | No degradation vs. previous version score on benchmark suite | QA Lead |
| G5 — ARB Sign-off | Required for MAJOR version bumps only; written approval from ARB Chair | Enterprise Architect |

#### 6.3 Governance Rules

- Prompts **must not** contain hardcoded customer data, credentials, or internal system hostnames
- All prompts must include a `<system_context>` block declaring: tool name, version, data classification level, and PII handling instructions
- Changes that alter the risk tier of a decision require a new Model Risk Assessment before the prompt is promoted

---

### 7. Agent Design Patterns Library

#### Pattern Card 1 — Retrieval-Augmented Generation (RAG)

| Field | Detail |
| --- | --- |
| Pattern | Retrieval-Augmented Generation |
| Use Case at NexaBank | Answer policy and compliance questions from 10,000-page FCA-regulated policy corpus |
| When to Use | When the LLM needs grounding in proprietary, recent, or regulated documents not in its training data |
| Core Components | Embedding Service → Vector Store → LLM with injected context chunks |
| Key Tuning Decision | Chunk size: 512 tokens, 50-token overlap (tuned to FCA policy document section structure) |
| NexaBank-specific rule | Raw customer data **must not** enter the context window without tokenisation; tokenise before embedding |
| Anti-pattern | Do not rely on the LLM's parametric knowledge for regulatory facts — always retrieve and cite the source chunk |

#### Pattern Card 2 — Hierarchical Multi-Agent Orchestration

| Field | Detail |
| --- | --- |
| Pattern | Hierarchical Multi-Agent Orchestration |
| Use Case at NexaBank | Mortgage application processing: 10 sub-tasks delegated across 4 specialist agents |
| When to Use | When a single business task decomposes into parallel, specialist sub-tasks that require different tools or data |
| Core Components | Orchestrator Agent → Specialist Agents (Document, Valuation, Credit, Compliance) |
| Key Design Decision | Orchestrator passes state via structured JSON; specialist agents do not call each other directly |
| NexaBank-specific rule | All inter-agent messages must be routed through the orchestrator to maintain a single audit trail |
| Anti-pattern | Do not allow agents to call each other directly — this creates audit blind spots and makes debugging impossible |

#### Pattern Card 3 — Human-in-the-Loop Approval Gate

| Field | Detail |
| --- | --- |
| Pattern | Human-in-the-Loop (HITL) Approval Gate |
| Use Case at NexaBank | Regulatory filing (SAR submission) — MLRO must approve every AI-drafted Suspicious Activity Report |
| When to Use | High-risk decisions; confidence below threshold; regulatory mandate; financial or legal consequence |
| Core Components | Agent output → Approval Queue (UI) → Reviewer decision → Approved/Rejected signal → Agent resumes or halts |
| Timeout Behaviour | 4 hours: escalate to senior approver. 8 hours: auto-cancel task, log event, notify business owner |
| NexaBank-specific rule | Agent execution **must not** resume on timeout without explicit human confirmation |
| Anti-pattern | Do not use HITL as a rubber stamp — if reviewers approve > 98% without reading, the risk tier may be too high |

---

### 8. AI Security Architecture Standards

**NexaBank — AI Security Controls by Risk Tier**

| Control | Tier 1 — Low | Tier 2 — Medium | Tier 3 — High / Critical |
| --- | --- | --- | --- |
| **Example systems** | HR chatbot, FAQ bot | Document summariser, code reviewer | Credit scoring, fraud detection, regulatory filings |
| **Authentication** | OAuth 2.0 + RBAC | OAuth 2.0 + RBAC + MFA | OAuth 2.0 + RBAC + MFA + PAM for privileged operations |
| **PII in context window** | Permitted with tokenisation | Permitted with tokenisation + field-level encryption | Prohibited — PII referenced by opaque token only |
| **Audit logging** | Summary logs; 90-day retention | Full input/output logs; 1-year retention | Immutable full I/O logs; 7-year retention (FCA requirement) |
| **Guardrail service** | Output scan only | Input + output scan | Input + output + inter-agent message scan |
| **Human review** | Not required | Monthly sampling of 5% of outputs | Per-decision sign-off or post-hoc review within 4 h |
| **Penetration testing** | Annual | Semi-annual | Quarterly + on every major model change |
| **Incident response SLA** | 48 h detection → resolution | 24 h detection → containment | 1 h detection → containment |

---

### 9. AI Architecture Review Process

**NexaBank — AI Use Case Review Stage Gates**

| Stage | Name | Key Activities | Required Artefacts | Reviewers | Exit Criteria |
| --- | --- | --- | --- | --- | --- |
| S0 | Intake | Business sponsor submits use case brief | Use Case Brief (1-page standard template) | Business Sponsor | Brief accepted by Head of AI COE |
| S1 | Feasibility | EA + AI Engineering assess technical fit; assign risk tier | Feasibility Assessment, Risk Tier Assignment form | EA, AI Security Lead | Risk tier confirmed; data sources and owners identified |
| S2 | Architecture Design | EA produces solution design; DFD produced; ADR entries created | Solution Architecture Doc, Data Flow Diagram, ADR | EA, Data Architect, Security Architect | Architecture approved by ARB (majority vote) |
| S3 | Build & Test | Engineering builds; AI QA validates all 5 prompt engineering gates | Test reports, Bias/Fairness results, Red-team results | AI Engineering, QA Lead, AI Ethics | All gates G1–G5 passed; no critical security findings |
| S4 | Production Launch | EA certifies go-live; monitoring dashboards configured in staging | Go-Live Certificate, Operations Runbook, Alert Config | EA, Head of AI COE, SRE | Monitoring alerts verified end-to-end in staging environment |
| S5 | Periodic Review | Quarterly architecture and risk health check | Architecture Review Report, Updated Risk Assessment | EA, Model Risk Team | No high-severity open findings; MRA refreshed if model updated |

---

### 10. Model Risk Assessment

**Credit Scoring Agent v2.1 — Model Risk Assessment**

| Field | Value |
| --- | --- |
| System Name | Credit Scoring Agent |
| Version | 2.1 |
| Risk Tier | High (Tier 3) |
| Assessment Date | 2026-06-10 |
| Assessor | Jane Cho, AI Risk Analyst |
| ARB Approval | Approved 2026-06-18 |
| Next Review Due | 2026-12-10 |

**Purpose:** Generates credit limit recommendations (£500 – £25,000) for personal loan applications. A human credit officer makes the final decision; the model output is advisory.

| Risk Dimension | Rating | Finding | Mitigant |
| --- | --- | --- | --- |
| Model accuracy | Medium | 94.2% precision on holdout set; 3.1% false-negative rate on borderline band (£3k–£5k) | Monthly retraining on latest 6 months of data; human review mandatory for borderline band |
| Data quality | Medium | 2.3% missing income fields in training data — imputed | Imputation pipeline documented; missing-field flag surfaced in model output metadata |
| Fairness / bias | Low | Gender disparity: 0.8% difference in approval rate (within FCA 3% threshold) | Quarterly fairness audit; results published to Chief Risk Officer |
| Explainability | High | LLM reasoning chain not fully auditable by current tooling | SHAP scores from XGBoost layer provided to credit officers for each recommendation |
| Regulatory compliance | Medium | Consumer Duty Act requires plain-English rationale for every decline decision | Claude Sonnet generates human-readable rationale from XGBoost SHAP output — reviewed by Legal |
| Model drift | Medium | Performance degrades measurably after 90 days without retraining (observed in v1.8 incident) | Automated monthly retraining trigger; PDI > 0.08 triggers immediate freeze and review |

**Overall Risk Rating: MEDIUM — Approved for production with conditions**

Conditions: (1) Human-in-the-loop is mandatory for all decisions; (2) Monthly fairness audit results must be reviewed by CRO; (3) Model must be retrained within 30 days of any material change to credit policy.

---

### 11. AI Incident Response Playbook

**IRP-AI-003 — Hallucination in Customer-Facing Output**

| Step | Action | Owner | Timeframe |
| --- | --- | --- | --- |
| 1. Detect | Guardrail service flags a response with hallucination score > 0.8 — **or** a customer complaint explicitly references incorrect information from the AI | Guardrail service (automated) / Customer Operations | Immediate |
| 2. Contain | Disable the affected AI response pathway; route affected use case to human agents via fallback rule in the API gateway | AI Ops On-call | < 15 minutes |
| 3. Assess | Retrieve audit logs for affected sessions; determine scope (isolated single-user event vs. systemic across multiple sessions) | AI Risk Analyst | < 1 hour |
| 4. Notify | If systemic (> 10 customers affected): notify Head of AI COE, Legal, and Compliance in writing with session IDs and affected content | AI Ops Lead | < 2 hours |
| 5. Root Cause | Identify trigger: prompt regression? Context poisoning via injected document? Underlying model update? Guardrail gap? | AI Engineering | < 24 hours |
| 6. Remediate | Apply fix (prompt patch, new guardrail rule, or model rollback); re-run all 5 test gates before re-enabling | AI Engineering + QA | < 48 hours |
| 7. Post-Incident Review | Write incident report (5W1H format); update Risk Register; brief ARB if prompt MAJOR version was bumped; close customer complaints | EA + AI Risk | < 5 business days |

**FCA Escalation Trigger:** Involve Regulatory Affairs within 2 hours if any hallucination: (a) caused customer financial loss; (b) related to regulated financial advice (credit, insurance, investment); or (c) affected more than 100 customers.

---

### 12. AI Vendor Assessment Framework

**NexaBank — LLM & AI Platform Vendor Scorecard Q2 2026**

Scores are 1–10; weighted score = sum(score × weight).

| Dimension | Weight | Anthropic (Claude) | OpenAI (GPT-4o) | Google (Gemini) | AWS Bedrock | Azure OpenAI |
| --- | --- | --- | --- | --- | --- | --- |
| UK/EU data residency | 25% | 8 | 6 | 7 | 9 | 9 |
| Security certifications (ISO 27001, SOC 2, CSA STAR) | 20% | 9 | 9 | 8 | 9 | 9 |
| FCA/PRA regulatory alignment posture | 20% | 8 | 7 | 7 | 8 | 8 |
| Contractual data handling (no training on customer data) | 20% | 9 | 8 | 8 | 9 | 9 |
| Model performance on NexaBank internal benchmark | 10% | 9 | 8 | 7 | 7 | 8 |
| Enterprise support SLA and tier | 5% | 8 | 8 | 7 | 9 | 9 |
| **Weighted Score** | **100%** | **8.60** | **7.50** | **7.40** | **8.80** | **8.80** |
| **Decision** | | **Primary LLM** | Fallback LLM | Reserve | **Primary platform** | Fallback platform |

**Notes:** AWS Bedrock and Azure OpenAI score highest on data residency and enterprise SLA because they provide contractually guaranteed UK region processing. Anthropic selected as primary LLM despite slightly lower platform scores due to superior model performance and instruction-following quality on NexaBank's benchmark.

---

### 13. AI Capability Roadmap

**NexaBank AI Capability Roadmap — 2026–2028**

| Capability | 12 months — Q4 2026 | 24 months — Q4 2027 | 36 months — Q4 2028 | Owner |
| --- | --- | --- | --- | --- |
| Customer Service AI | Production: balance, complaints, FAQs (live) | Expand: loan status, dispute handling, product comparisons | Proactive: outbound financial health nudges at customer consent | Head of Channels |
| Document Intelligence | Mortgage pack summarisation (MVP in production) | Automated doc classification + structured data extraction | Straight-through processing for standard mortgage cases | Head of Mortgages |
| Credit AI | Human-in-loop recommendations (live, Tier 3) | Automated decisions for loans < £5k; HITL for larger | Full automated credit journey with real-time explainability | Chief Risk Officer |
| Regulatory AI | SAR draft generation (pilot — MLRO approval required) | FCA regulatory filing assistant (transaction reporting) | Automated regulatory reporting with cryptographic sign-off | MLRO |
| Developer Productivity | GitHub Copilot Enterprise deployed to 3 teams | AI-assisted code review + SAST integration | AI-native SDLC with automated test generation and PR triage | CTO |
| LLMOps Platform | Centralised prompt registry; basic monitoring dashboards | Model performance dashboards; automated drift alerts | Self-healing prompt pipelines; AI FinOps cost attribution | Head of AI COE |
| AI Governance | ARB process operational; risk tier framework in use | Policy-as-code guardrails; automated compliance checks | Continuous governance; AI audit trail exposed to FCA API | Enterprise Architect |

---

### 14. Technical Debt Register for Legacy AI

**NexaBank — Legacy AI / ML / RPA Technical Debt Register**

| ID | System | Technology | Age | Core Problem | Business Impact | Migration Priority | Target State | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TD-001 | RPA-Mortgage-001 | Blue Prism (v6) | 7 years | No audit trail; brittle to UI changes in source app; no error recovery | **High** — 40% of mortgage ops volume routes through this bot | **P1** — Migrate by Q2 2027 | AI agent with structured Core Banking API integration | Head of Mortgages |
| TD-002 | ML-FraudV1 | Scikit-learn SVM | 5 years | No explainability; training data pre-dates GDPR; model drift detected Q1 2026 | **Critical** — blocks FCA Consumer Duty compliance | **P1** — Replace by Q4 2026 | XGBoost + LLM rationale layer (in progress) | Head of Fraud |
| TD-003 | RPA-Collections-003 | AutomationAnywhere (v11) | 4 years | Hardcoded business logic; duplicates features now available natively in CRM | **Medium** — manual workaround available | **P2** — Decommission by Q3 2027 | CRM native automation (Salesforce Flow) | Head of Collections |
| TD-004 | ML-CustomerChurn | Unversioned Python/R | 6 years | No MLOps pipeline; manually rerun monthly; unknown data lineage | **Medium** — marketing campaigns depend on output | **P2** — Modernise by Q1 2027 | MLflow + automated monthly retraining | Head of Marketing |
| TD-005 | RPA-Finance-Reconcile | Blue Prism (v5) | 3 years | Dependent on spreadsheet format that changes quarterly requiring manual patching | **Low** — finance team patches each quarter | **P3** — Refactor by Q4 2027 | ERP native API + lightweight Python script | CFO Office |

---

### 15. LLMOps Maturity Roadmap

**NexaBank — LLMOps Maturity Progression**

| Stage | Name | Characteristics | Key Milestones to Reach This Stage | NexaBank Status |
| --- | --- | --- | --- | --- |
| 1 | Ad-Hoc | Individual developers use LLM APIs directly with personal accounts; prompts hardcoded in application code; no logging; no governance | — | **Completed** (was Q1 2025) |
| 2 | Managed | Central prompt registry operational; shared API keys retired; basic logging enabled; team-level usage guidelines published | Prompt registry live; audit logging enabled; API key rotation policy enforced; usage reporting to Head of AI COE | **Current** (Q3 2026) |
| 3 | Standardised | ARB review process enforced for all AI use cases; Model Risk Assessments completed; CI/CD pipeline for prompt changes; performance dashboards in place | All 5 prompt test gates enforced in CI; monthly model drift reports; ARB gate mandatory before production | **Target** Q2 2027 |
| 4 | Governed | Policy-as-code guardrails; automated compliance checks; AI FinOps cost attribution by business unit; shadow AI detection tooling | Real-time cost dashboards per BU; automated FCA reporting; shadow AI monitoring tooling deployed | **Target** Q4 2027 |
| 5 | Optimised | Self-optimising prompts tested against golden datasets; continuous feedback loops from production outcomes; cost per AI transaction < £0.002 | AI evaluates and proposes prompt improvements; cost below target; zero high-severity governance findings for 2 consecutive quarters | **Target** Q4 2028 |

---

## Part 2 — Metrics & KPI Calculations

All metrics use NexaBank Q2 2026 data (April – June 2026) unless stated otherwise.

---

### 1. Agent Reliability Rate

**What it measures:** The percentage of agent task attempts that complete successfully without an unhandled error or an unexpected escalation to a human agent.

**Formula:**

```
Agent Reliability Rate = (Successful Completions / Total Task Attempts) × 100
```

**NexaBank Q2 2026 — Customer Service Agent:**

| Metric | Value |
| --- | --- |
| Total task attempts | 48,320 |
| Tasks completed successfully | 46,150 |
| Tasks that errored (unhandled exception) | 820 |
| Tasks unexpectedly escalated to human (confidence < 0.7) | 1,350 |

**Calculation:**

```
Successful = 48,320 − 820 − 1,350 = 46,150
Agent Reliability Rate = (46,150 / 48,320) × 100 = 95.5%
```

**Interpretation:**

| Rating | Threshold |
| --- | --- |
| Target — Tier 2 system | ≥ 97% |
| Target — Tier 1 system | ≥ 99% |
| NexaBank Q2 result | 95.5% — **BELOW TARGET** |

Root cause: 820 errors traced to Core Banking API timeouts during peak hours (8–9 am). Action: circuit breaker pattern to be implemented in Q3, expected to recover 1.5–2 percentage points.

---

### 2. AI System Availability

**What it measures:** Uptime of a production AI service against its SLA target, measured per system and rolled up to a portfolio average.

**Formula:**

```
Availability = (Total Minutes − Downtime Minutes) / Total Minutes × 100

Downtime = Planned maintenance + Unplanned outages
```

**NexaBank Q2 2026 — Customer Service Agent:**

| Metric | Value |
| --- | --- |
| Total minutes in quarter (91 days) | 130,960 |
| Planned maintenance windows | 240 minutes |
| Unplanned downtime (2 incidents) | 85 minutes |
| SLA target | 99.5% |

**Calculation:**

```
Available minutes = 130,960 − 240 − 85 = 130,635
Availability = (130,635 / 130,960) × 100 = 99.75%
```

**Interpretation:**

| Rating | Threshold |
|---|---|
| SLA target | 99.5% |
| NexaBank Q2 result | 99.75% — **MEETS TARGET** |

Remaining unplanned downtime budget before SLA breach: 215 − 85 = 130 minutes for the quarter. The two incidents were a Redis cache failure (40 min) and a Kubernetes node eviction (45 min); both have been addressed by adding a hot-standby cache node.

---

### 3. Prompt Drift Index

**What it measures:** How much AI system behaviour drifts over time — particularly as underlying models update. Drift is measured as the divergence between current model outputs and a fixed golden output baseline.

**Formula:**

```
Prompt Drift Index (PDI) = 1 − mean(cosine_similarity(current_outputs, golden_outputs))

Where:
  golden_outputs = embeddings of 500 curated responses from the validated baseline model version
  current_outputs = embeddings of responses to the same 500 prompts from the current model
  PDI = 0 → identical behaviour; PDI = 1 → completely different behaviour
  Alert threshold: PDI > 0.08 triggers an immediate architecture review
```

**NexaBank — Mortgage Document Summariser, June 2026:**

| Metric | Value |
| --- | --- |
| Baseline model | Claude Sonnet 4.5 (January 2026) |
| Current model | Claude Sonnet 4.6 (June 2026) |
| Golden dataset size | 500 prompt/response pairs |
| Mean cosine similarity across 500 pairs | 0.93 |

**Calculation:**

```
PDI = 1 − 0.93 = 0.07
```

**Interpretation:**

| Rating | Threshold |
| --- | --- |
| Alert threshold | PDI > 0.08 |
| NexaBank June 2026 | PDI = 0.07 — **BELOW THRESHOLD** (no action required) |

However, 12 specific prompts showed individual cosine similarity < 0.85 (high localised drift). These 12 prompts were pulled for manual review by the AI QA team before Claude Sonnet 4.6 was promoted to production. 10 passed manual review; 2 prompts were patched (PATCH version bump) before the model was approved.

---

### 4. RAG Retrieval Precision

**What it measures:** The proportion of retrieved context chunks that are genuinely relevant to the query. Low precision means the LLM receives irrelevant context, wasting tokens and increasing hallucination risk.

**Formula:**

```
RAG Retrieval Precision = (Relevant Chunks Retrieved / Total Chunks Retrieved) × 100

Relevance assessed by:
  Option A: Human labellers on a random sample
  Option B: LLM-as-judge scoring each chunk against the query on a 1–5 scale (≥ 3 = relevant)
```

**NexaBank Q2 2026 — Policy FAQ Agent:**

| Metric | Value |
| --- | --- |
| Evaluation set size | 200 representative queries |
| Chunks retrieved per query (top-k) | 5 |
| Total chunks evaluated | 1,000 |
| Chunks rated relevant (score ≥ 3 by Claude Opus judge) | 840 |
| Chunks rated irrelevant | 160 |

**Calculation:**

```
RAG Retrieval Precision = (840 / 1,000) × 100 = 84.0%
```

**Interpretation:**

| Rating | Threshold |
|---|---|
| Target | ≥ 85% |
| NexaBank Q2 result | 84.0% — **SLIGHTLY BELOW TARGET** |

Primary cause: dense-only embedding retrieval struggles with exact regulatory clause references (e.g. "Section 4.2(a) of the Consumer Duty Act"). Hybrid retrieval (BM25 + dense embeddings) is being tested in staging and is expected to raise precision to 90%+.

---

### 5. AI Use Case Review Cycle Time

**What it measures:** The average number of calendar days from when a business team submits an AI use case at Stage S0 (Intake) to the point the ARB issues a decision at Stage S2.

**Formula:**

```
Cycle Time = mean(S2_decision_date − S0_submission_date) across all cases in the period
```

**NexaBank Q2 2026 — 14 cases reviewed (sample of 5 shown):**

| Use Case | Submitted | ARB Decision | Days |
| --- | --- | --- | --- |
| HR Leave Bot | 2026-04-03 | 2026-04-17 | 14 |
| Fraud Alert Summariser | 2026-04-08 | 2026-04-30 | 22 |
| Mortgage Rate FAQs | 2026-04-15 | 2026-05-06 | 21 |
| Collections Reminder Agent | 2026-04-22 | 2026-05-09 | 17 |
| SAR Draft Generator | 2026-05-01 | 2026-05-28 | 27 |
| (9 further cases) | — | — | avg 16 |

**Calculation:**

```
Full Q2 mean (14 cases) = 18.7 calendar days ≈ 13.4 business days
```

**Interpretation:**

| Rating | Threshold |
|---|---|
| Target | ≤ 15 business days (3 weeks calendar) |
| NexaBank Q2 result | 18.7 calendar days — **MEETS TARGET** |

The SAR Draft Generator case (27 days) was an outlier due to MLRO availability during a regulatory audit period. Excluding that case, the mean was 16.4 calendar days. The ARB chair has flagged MLRO availability as a systemic bottleneck for high-risk cases.

---

### 6. Shadow AI Incidents

**What it measures:** The count of unapproved AI tools, models, or API integrations detected in use across the organisation in a given quarter. Detected via network/DLP scanning, expense audits, GitHub secret scanning, and staff self-disclosure.

**Formula:**

```
Shadow AI Count = number of distinct unapproved AI tool instances detected in the period

This is a count metric — lower is better; target is zero (practically: < 2 per quarter by Q4 2026)
```

**NexaBank Q2 2026:**

| # | Tool Detected | How Found | Team | Action Taken |
| --- | --- | --- | --- | --- |
| 1 | ChatGPT Enterprise (personal account, 4 users) | Expense audit flagged subscription | Retail Banking Analytics | Blocked; team migrated to approved NexaBank Claude environment |
| 2 | Cursor AI IDE (unlicensed, 2 developers) | GitHub Copilot usage audit identified non-standard editor | Software Engineering | Replaced with approved GitHub Copilot Enterprise |
| 3 | Perplexity Pro (3 users) | DLP network scan detected Perplexity API calls from internal IPs | Legal | Reviewed — approved as low-risk research tool and added to approved list |

**Calculation:**

```
Shadow AI Incidents Q2 2026 = 3
```

**Interpretation:**

| Period | Count | Trend |
| --- | --- | --- |
| Q1 2026 baseline | 7 | — |
| Q2 2026 | 3 | −57% quarter-on-quarter |
| Target by Q4 2026 | < 2 | On track |

The decline is attributed to the AI tool awareness programme launched in March 2026 and the introduction of a fast-track approval process (< 5 business days for Tier 1 tools), which reduces the incentive to bypass governance.

---

### 7. Model Risk Coverage

**What it measures:** The percentage of AI models currently running in production that have a completed, current Model Risk Assessment on file.

**Formula:**

```
Model Risk Coverage = (Models with Current MRA / Total Production AI Models) × 100

"Current" = MRA completed within the last 12 months,
            OR within 30 days of a major underlying model version change
```

**NexaBank Q2 2026:**

| Category | Count |
| --- | --- |
| Total AI models in production | 18 |
| Models with a current MRA | 14 |
| Models with expired MRA (> 12 months old) | 3 |
| Models with no MRA on file | 1 |

**Calculation:**

```
Model Risk Coverage = (14 / 18) × 100 = 77.8%
```

**Interpretation:**

| Rating | Threshold |
| --- | --- |
| Target (FCA expectation under SR 11-7) | 100% by Q4 2026 |
| NexaBank Q2 result | 77.8% — **BELOW TARGET** |

The 4 uncovered models are all from the Technical Debt Register (TD-001 through TD-004 — legacy RPA and ML systems). MRA completion for all 4 is scheduled for Q3 2026, alongside their migration planning exercises.

---

### 8. Compliance Audit Pass Rate

**What it measures:** The percentage of audit control items that passed during a formal AI system compliance audit, assessed against NexaBank's internal AI standards (and optionally against ISO 42001 or NIST AI RMF).

**Formula:**

```
Compliance Audit Pass Rate = (Passed Audit Items / Total Audit Items Assessed) × 100
```

**NexaBank — Credit Scoring Agent External ISO 42001 Audit, June 2026:**

| Result | Count |
| --- | --- |
| Total control items assessed | 47 |
| Controls passed | 41 |
| Controls with minor findings (low severity) | 4 |
| Controls with major findings (high severity) | 2 |

**Calculation:**

```
Overall Pass Rate       = (41 / 47) × 100 = 87.2%
Pass + minor findings   = (45 / 47) × 100 = 95.7%
Major control failures  = 2 / 47           = 4.3%
```

**Interpretation:**

| Rating | Threshold |
| --- | --- |
| Target — major controls | 100% pass |
| Target — overall | ≥ 90% |
| NexaBank June 2026 | 87.2% — **BELOW TARGET** (2 major findings) |

The two major findings: (1) Explainability documentation for credit decisions was incomplete — SHAP scores were generated but not persisted in the audit log; (2) Model retraining logs were not retained for the FCA-required 7 years. Both were remediated within 30 days and a follow-up audit confirmed closure.

---

### 9. Automation ROI

**What it measures:** The net financial return on AI automation investment, expressed as a percentage of the total cost deployed.

**Formula:**

```
Automation ROI = ((Value Saved − Total Cost) / Total Cost) × 100

Value Saved = (Hours saved × blended hourly rate) + (Error reduction × cost per error)
Total Cost  = Infrastructure + API fees + Tooling licences + Engineering time
```

**NexaBank Q2 2026 — Customer Service Agent:**

| Item | Value |
| --- | --- |
| Total queries handled without human intervention | 41,200 |
| Average human handling time per query | 8 minutes |
| Hours saved by automation | 41,200 × 8 ÷ 60 = **5,493 hours** |
| Blended customer service agent hourly rate | £28/hour |
| Value from time saved | 5,493 × £28 = **£153,813** |
| Fewer rework errors (320 errors × £45 cost each) | **£14,400** |
| **Total Value Saved** | **£168,213** |
| Azure + Anthropic API infrastructure | £28,400 |
| Engineering and maintenance cost | £18,000 |
| Tooling licences (monitoring, logging) | £4,200 |
| **Total Cost** | **£50,600** |

**Calculation:**

```
Automation ROI = ((£168,213 − £50,600) / £50,600) × 100
              = (£117,613 / £50,600) × 100
              = 232.4%
```

**Interpretation:**

| Rating | Threshold |
| --- | --- |
| Year 1 target | 150% ROI |
| NexaBank Q2 result | 232.4% — **EXCEEDS TARGET** |
| Payback period | ~5 weeks |

Excludes intangible benefits: 24/7 availability (no shift premiums), consistent quality across all interactions, and a 4-point increase in customer satisfaction score (CSAT) attributed to faster response times.

---

### 10. Developer Velocity Lift

**What it measures:** The percentage increase in engineering throughput (story points delivered per sprint) attributable to AI-assisted development tools.

**Formula:**

```
Developer Velocity Lift = ((Post-AI Velocity − Pre-AI Velocity) / Pre-AI Velocity) × 100

Velocity = average story points delivered per 2-week sprint per developer
```

**NexaBank — 3 teams, 38 developers:**

| Period | Duration | Avg Story Points / Dev / Sprint |
| --- | --- | --- |
| Pre-AI baseline | Sept 2025 – Feb 2026 (6 months) | 42 |
| Post-AI adoption | Mar 2026 – May 2026 (3 months) | 54 |

**Calculation:**

```
Velocity Lift = ((54 − 42) / 42) × 100
             = (12 / 42) × 100
             = 28.6%
```

**Interpretation:**

| Rating | Threshold |
| --- | --- |
| Target (within 6 months of adoption) | ≥ 20% |
| NexaBank result | 28.6% — **EXCEEDS TARGET** |

Caveat: story point inflation is a known risk — teams may unconsciously inflate estimates after AI adoption. NexaBank controls for this with mandatory story point calibration workshops each quarter and cross-team benchmarking. The 28.6% figure has been validated against lines-of-code and PR merge rate trends, which show consistent directional alignment.

---

### 11. AI-Assisted Decision Quality

**What it measures:** The proportion of decisions made with AI assistance that achieved the expected business outcome, assessed retrospectively after sufficient time has elapsed to observe the outcome.

**Formula:**

```
AI-Assisted Decision Quality = (Correct AI-Assisted Decisions / Total AI-Assisted Decisions Assessed) × 100

"Correct" = defined per system in the Model Risk Assessment
  e.g. for credit: loan did not default within the risk model's expected horizon
  e.g. for document summary: summary was accurate (verified by human QA sampling)
```

**NexaBank — Credit Scoring Agent, Q4 2025 cohort reviewed at 6-month mark (Q2 2026):**

| Metric | Value |
| --- | --- |
| Total AI-assisted credit decisions in Q4 2025 | 3,840 |
| Decisions assessed at 6-month outcome window | 3,840 (100%) |
| Decisions where outcome matched model expectation | 3,648 |
| Unexpected outcomes (default, dispute, or identified model error) | 192 |

**Calculation:**

```
AI-Assisted Decision Quality = (3,648 / 3,840) × 100 = 95.0%
```

**Interpretation:**

| Rating | Threshold |
| --- | --- |
| Target (aligned with human credit officer benchmark) | ≥ 95% |
| Human credit officer baseline | 94.7% |
| NexaBank Q2 result | 95.0% — **MEETS TARGET** and outperforms human baseline |

The 192 unexpected outcomes (5%) are reviewed by the Model Risk team each quarter. Analysis showed no systematic bias; the cases were concentrated in the borderline credit band (£3k–£5k), confirming the decision to require human review for that band.

---

### 12. Cost per AI Transaction

**What it measures:** The total cost incurred per single AI-processed transaction or interaction. Used for FinOps tracking, budget forecasting, and optimisation decisions.

**Formula:**

```
Cost per AI Transaction = (Monthly Infrastructure + Monthly API Fees + Monthly Tooling) / Monthly AI Transactions

Include: compute, storage, egress, API token costs, prorated tooling and licence fees
```

**NexaBank — Customer Service Agent, June 2026:**

| Cost Component | Monthly Cost |
| --- | --- |
| Azure AKS compute (inference pods) | £8,200 |
| Anthropic API — Claude Haiku (2.1B tokens processed) | £6,300 |
| Azure AI Search — vector retrieval | £1,100 |
| Monitoring and observability tooling (prorated) | £800 |
| **Total Monthly Cost** | **£16,400** |
| **Total Monthly Transactions** | **16,450** |

**Calculation:**

```
Cost per AI Transaction = £16,400 / 16,450 = £0.997 ≈ £1.00 per transaction
```

**Interpretation:**

| Rating | Threshold |
| --- | --- |
| Target cost per transaction | ≤ £1.20 |
| Human handling cost per equivalent query | £6.80 |
| NexaBank June 2026 | £1.00 — **MEETS TARGET** |
| Cost reduction vs. human | 85% |

Token cost is the most controllable variable. Routing lower-intent queries (balance checks, opening hours) to Claude Haiku instead of Sonnet reduces API cost by 60% for those queries — a routing optimisation already deployed in June 2026. Next target: reduce to £0.75 per transaction by Q4 2026 through prompt compression and caching of common query patterns.
