---
title: "TOGAF ADM Artifact Templates: Foundation Through Technology"
date_created: 2026-07-10
status: current
source_type: pdf-converted
source_file: "AIDLC_Artifact_Reference_Library.pdf"
doc_type: multi-part-series
tags: ["ai-development", "enterprise-architecture", "togaf", "aidlc"]
last_reviewed: 2026-07-17
covers_version: "N/A"
series_name: "AIDLC Artifact Reference Library"
series_part: 3
series_total: 4
series_index: "ai-development/aidlc/AIDLC_Artifact_Reference_Library"
---

# TOGAF ADM Artifact Templates: Foundation Through Technology

Continues from [Part 2: Development Through Retirement](./AIDLC_Artifact_Reference_Library_Part2_Development_to_Retirement.md).

*Templates from the companion "EA Lifecycle Artifact Templates" library, merged in here and since archived. Where [Part 1](./AIDLC_Artifact_Reference_Library_Part1_Discovery_to_Model_Design.md) and [Part 2](./AIDLC_Artifact_Reference_Library_Part2_Development_to_Retirement.md) organise artifacts around the 8 AIDLC delivery-lifecycle phases, this part and [Part 4](./AIDLC_Artifact_Reference_Library_Part4_TOGAF_Migration_to_EA_CrossCutting.md) organise artifacts around the TOGAF 10 ADM (Architecture Development Method) phases, showing the enterprise-architecture governance artifacts an EA team maintains around an AIDLC delivery. Both sets of templates trace to the same illustrative example — a Credit Risk AI Scoring Model — shown here for a fictional "GlobalBank plc" as the EA-programme sponsor (Parts 1–2 use the same use case without naming the bank). This part covers the Preliminary Phase through Technology Architecture (Phase D); [Part 4](./AIDLC_Artifact_Reference_Library_Part4_TOGAF_Migration_to_EA_CrossCutting.md) covers Migration through EA Cross-Cutting artifacts.*

|**Element**|**Description**|
|---|---|
|Blue italic text|Example field values filled in for the fictional "GlobalBank AI Transformation Programme 2026". Replace with your actual data.|
|Field labels|Every label is mandatory unless marked [OPTIONAL]. Mandatory fields require approval before phase advancement.|
|AI Extension fields|Fields marked ! are AI-First extensions added to TOGAF 10. These are NOT in standard TOGAF 10 but are required for AIDLC-integrated EA.|
|Artifact IDs|Prefix format: EA-[Phase]-[Type]-[NNN]. E.g. EA-B-HATB-001 = Business Architecture, Human-AI Task Boundary, first instance.|
|Linked artifacts|Each artifact shows upstream inputs (←) and downstream outputs (→) to trace lineage through the ADM cycle.|

*TOGAF 10 COMPLIANCE: All standard TOGAF 10 artifacts are included at their minimum viable form. AI-First extension fields (!) are additive — they do not replace standard TOGAF artifacts. Organisations pursuing ISO/IEC 42001 or EU AI Act compliance should use AI-First fields as mandatory.*

## TOGAF ADM Preliminary Phase

ARTIFACTS: EAFC-001 · AGP-001 · ESR-001

The Preliminary phase establishes the EA framework, governance model, and AI governance principles before any architecture work begins. In AI-first enterprises, this phase must produce a Constitutional AI commitment and establish the AI Governance Council as an EA stakeholder.

**EA GOVERNANCE EAFC-001**

### EA Framework Charter

Owner: Chief Architect / CIO   |   ADM Phase: PRE   |   TOGAF 10 + AI-First Extension

||**CHARTER SCOPE & AUTHORITY**|
|---|---|
|**Organisation**|*GlobalBank plc — Digital & Technology Division*|
|**EA Framework Adopted**|*TOGAF 10 (The Open Group Architecture Standard, 10th Edition, 2022)*|
|**Charter Version / Status**|*v2.1 — Approved 15 January 2026*|
|**EA Programme Scope**|*Enterprise-wide: all business units, all technology investments >£500K, all AI systems (any cost)*|
|**EA Authority**|*Architecture Review Board (ARB) has binding authority over all technology architecture decisions. No AI system may be deployed without ARB sign-off at AIDLC Phase 6.*|
|**Chief Architect**|*Dr. Priya Mehta, Group Chief Architect (Board-level authority)*|
|**Review Cycle**|*Annual framework review; quarterly AI governance review; immediate review on regulatory change*|
||!**AI-FIRST EXTENSIONS**|
|!**AI Governance Council**|*Established as permanent EA stakeholder body. Composition: CRO, CPO, CISO, Chief Data Officer, Chief Architect, External AI Ethics Advisor. Quorum: 4 of 6 required for AI system approval.*|
|!**Constitutional AI Commitment**|*GlobalBank commits to AIDLC governance for all AI systems. Constitutional AI Policy is a mandatory output of Phase 4 (Model Design). No AI system proceeds to development without an approved CAP.*|
|!**AIDLC Integration**|*TOGAF ADM phases B, C, D incorporate AIDLC Phase Gates as mandatory Architecture Compliance milestones. See ACC-001 for the compliance checklist.*|
|!**Regulatory Alignment**|*EA framework explicitly aligned with: EU AI Act (all risk tiers), NIST AI RMF (Govern-Map-Measure-Manage), ISO/IEC 42001, FCA operational resilience requirements.*|

**EA GOVERNANCE**

**AGP-001**

### AI Governance Principles

Owner: AI Governance Council   |   ADM Phase: PRE   |   TOGAF 10 + AI-First Extension

|**#**|**Principle**|**Statement**|**Implementation Mechanism**|
|---|---|---|---|
|AGP-1|Human Primacy|AI systems augment human judgment; they do not replace it for consequential decisions. Human override capability is mandatory in all TIER 1–2 AI systems.|HITL controls documented in AIDLC Phase 4; HITL trigger rates monitored Phase 8|
|AGP-2|Explainability by Design|Explainability is an architecture constraint, not a post-hoc addition. Every AI system must explain its outputs in terms meaningful to affected stakeholders.|Explainability approach selected in Phase 4 ADR; tested in Phase 6 red-teaming|
|AGP-3|Fairness & Non-Discrimination|AI systems must not perpetuate or amplify discrimination against legally protected groups. Bias assessment is mandatory before and after training.|Bias Baseline in Phase 3; Fairness Evaluation in Phase 6; ongoing monitoring Phase 8|
|AGP-4|Privacy by Design|Personal data used in AI must be processed lawfully, fairly, and with purpose limitation. PII must be masked before LLM processing.|Privacy Impact Assessment Phase 3; data minimisation in Data Sheet; PII masking in deployment|
|AGP-5|Transparency|Individuals affected by AI decisions must be informed that AI was used, understand the decision basis, and have a clear path to challenge.|User Disclosure Documentation Phase 7; adverse action notices; appeal mechanisms|
|AGP-6|Security & Robustness|AI systems must be designed to resist adversarial attack, distributional shift, and prompt injection. Security is assessed by the red team in Phase 6.|AI Threat Model Phase 4; Red Team Report Phase 6; Zero Trust enforcement Phase 7|
|AGP-7|Accountability|A named individual owns every deployed AI system. Ownership includes governance compliance, performance monitoring, and incident response.|AI System Inventory records owner; owner signs off Phase 7 deployment runbook|
|AGP-8|Proportionality|AI governance intensity scales with risk tier. TIER 4 (minimal risk) follows lightweight AIDLC; TIER 1 (unacceptable risk) is prohibited.|Risk Classification (RCS-001) determines AIDLC governance track at Phase 1|

**EA GOVERNANCE**

**ESR-001**

### EA Stakeholder Register

Owner: Chief Architect   |   ADM Phase: PRE   |   TOGAF 10 + AI-First Extension

|**Stakeholder Group**|**Members**|**Interest**|**Influence**|**EA Role**|**Engagement Points**|
|---|---|---|---|---|---|
|AI Governance Council|CRO, CPO, CISO, CDA, Chief Architect, Ethics Advisor|High|High|Approve AI system deployments; review CAP; set AGP|Monthly governance review; Phase 4 & 6 gates|
|Architecture Review Board (ARB)|Chief Architect, Domain Architects, Security Architect, Data Architect|High|High|Approve all architecture decisions; review ADRs|Phase gate reviews; emergency sessions for P0 incidents|
|Business Unit Owners|VPs per domain (Credit, Operations, Marketing, HR, Security)|High|Medium|Sponsor AI use cases; approve business architecture|Phase A discovery; Phase B capability mapping|
|Data Governance Board|Chief Data Officer, Domain Data Owners, DPO|High|High|Approve data strategy; sign off Data Sheet and PIA|Phase C1 data architecture reviews|
|!Model Risk Management|Chief Risk Officer, Model Risk Managers|High|High|Assess and sign off high-risk AI model deployments|Phase 6 evaluation sign-off; Phase 8 quarterly audit|
|!External Regulators|FCA, ICO, EU AI Act National Authority|High|Low (can influence)|Regulatory compliance; supervisory examination|Annual regulatory reporting; incident notification <72h|
|Technology Teams|Engineering, DevOps, MLOps, Data Engineering|Medium|High|Implement architecture; operate AI systems|All phases; primary AIDLC delivery|
|!Affected Customers|Retail and corporate banking customers|High|Low (consulted)|Fairness, transparency, right to explanation|FRIA consultation; user testing; appeal channel|

## TOGAF ADM Architecture Vision Phase A

ARTIFACTS: SAW-001 · ACA-001 · AVD-001

**PHASE OUTPUT**

**SAW-001**

### Statement of Architecture Work

Owner: Chief Architect   |   ADM Phase: A   |   TOGAF 10 + AI-First Extension

**WORK DEFINITION**

|**Architecture Work Title**|*GlobalBank AI Transformation Programme — Phase 1: Core Banking AI Integration*|
|---|---|
|**Sponsoring Executive**|*Marcus Chen, Chief Operating Officer*|
|**Architecture Work Description**|*Design and govern the enterprise architecture for integrating AI systems into core banking operations: credit risk scoring, customer service automation, fraud detection. Encompasses 5 AI use cases (see ACA-001), full AIDLC lifecycle governance, and technology platform modernisation to support AI at scale.*|
|**Scope**|*IN SCOPE: UK Retail Banking division, core banking AI systems, data architecture for AI, MLOps platform, agent architecture. OUT OF SCOPE: International operations (Year 2), mortgage AI (separate programme), investment banking (separate governance).*|
|**Constraints**|*1. EU AI Act compliance required for all credit, HR and fraud systems. 2. FCA operational resilience rules apply. 3. Core banking system (Temenos) cannot be replaced in this programme. 4. Maximum cloud budget: £2.8M/year.*|
|**Assumptions**|*Alternative data partners (utility, rent) contracts will be signed by Q2 2026. Azure ML platform will remain enterprise standard for ML workloads. LLM provider contracts available under existing Microsoft EA.*|
|**Deliverables**|*Architecture Vision (AVD-001), Business Architecture (Phase B), Data Architecture (Phase C1), Application Architecture (Phase C2), Technology Architecture (Phase D), Migration Plan (Phase F), Governance Framework (Phase G)*|
|**Timeline**|*Phase A-D: Q1 2026 (12 weeks). Phase E-F: Q2 2026 (8 weeks). Phase G onwards: ongoing.*|
|**Approved By**|*Dr. Priya Mehta (Chief Architect) · Marcus Chen (COO) · AI Governance Council — 22 January 2026*|

! **AI EXTENSION AI Capability Assessment** Owner: Chief Architect + AI Lead   |   ADM Phase: A   |   TOGAF 10 + AI-First Extension

**ACA-001**

! ***AI-First Extension: This artifact is not in standard TOGAF 10. It provides the AI capability inventory and maturity baseline that drives all subsequent AI-impacted architecture decisions.***

|**AI Use Case**|**EU AI Act Tier**|**AIDLC Phase**|**Model Type**|**Strategic Status**|**Priority**|**Compliance Requirements**|
|---|---|---|---|---|---|---|
|Credit Risk AI Scoring|T2 — HIGH RISK|Phase 2 (Feasibility)|XGBoost + LLM|Foundational — must deliver|Priority 1|FRIA required; FCA regulated|
|Customer Service Copilot|T3 — LIMITED RISK|Phase 7 (Production)|GPT-4o RAG|Already live — extend scope|Priority 2|EU AI Act Art. 50 transparency|
|Fraud Detection AI|T2 — HIGH RISK|Phase 8 (Monitor)|Ensemble + LSTM|Mature — governance uplift|Priority 1|PCI-DSS; FCA SYSC 23|
|CV Screening Assistant|T2 — HIGH RISK|Phase 2 (HOLD)|LLM + Embedding|On hold — FRIA first|Priority 3|EU AI Act Annex III Cat.1|
|Campaign Targeting AI|T4 — MINIMAL RISK|Phase 5 (Dev)|XGBoost|Progressing normally|Priority 4|GDPR profiling consent|
|Developer Copilot (GitHub Copilot)|T4 — MINIMAL RISK|Phase 7 (Prod)|Codex/GPT-4o|Shadow AI — register & govern|Priority 3|AIDLC-Lite track|
|!**AI Maturity Baseline**|*McKinsey AI Maturity Level 2 of 5 (Developing). Proof-of-concept capability exists. Production MLOps immature. Governance framework nascent. Target: Level 3 (Scaling) by end 2026.*||||||
|!**Shadow AI Exposure**|*27 unregistered AI tools identified in SaaS survey (GitHub Copilot, Grammarly, Otter.ai, various ChatGPT integrations). All to be assessed and registered in AI System Inventory within 30 days.*||||||
|!**Architecture Readiness**|*Data architecture: MEDIUM (data lake exists, lineage immature). Application: MEDIUM (microservices partially adopted). MLOps: LOW (no enterprise platform). Governance: LOW (nascent). Security: LOW (no zero trust).*||||||

**PHASE OUTPUT AVD-001 Architecture Vision Document** Owner: Chief Architect   |   ADM Phase: A   |   TOGAF 10 + AI-First Extension

|**Vision Statement**|*By end 2026, GlobalBank will operate a trusted, explainable, and regulatorily compliant AI capability that delivers £7.3M+ annual value from credit risk automation, reduces manual review by 35%, and serves as a model for responsible AI in UK financial services.*|
|---|---|
|**Target Architecture Descriptor**|*AI-First Enterprise Architecture: 7-layer reference stack (L1 GPU Infrastructure → L7 Business & Governance), AIDLC lifecycle for all AI systems, Data Mesh for AI data products, Zero Trust for AI agents, TOGAF 10 ADM as the governance backbone.*|
|**Key Architecture Principles**|*1. Architecture before AI (no AI before the foundation is ready). 2. Data as first-class product. 3. Explainability by design. 4. Zero Trust at every layer. 5. Governance proportionate to risk. 6. Open standards over vendor lock-in.*|
|**Business Outcomes**|*60-second credit decisions (vs 72 hours), <5% false rejection rate (vs 12%), 100% adverse action explanation coverage, £7.3M ROI Year 1, ISO/IEC 42001 certification Q4 2026.*|
|**Architecture Risks**|*1. Legacy Temenos integration complexity (HIGH). 2. EU AI Act compliance timeline (HIGH). 3. Alternative data vendor contracts (MEDIUM). 4. MLOps talent gap (MEDIUM). 5. Shadow AI exposure (LOW-MEDIUM).*|
|**ARB Approved**|*5 February 2026 — Architecture Review Board unanimous approval*|

## TOGAF ADM Business Architecture Phase B

ARTIFACTS: ACM-001 · HATB-001 · AOM-001 · WIA-001

**! AI EXTENSION**

**ACM-001**

### AI Capability Map

Owner: Enterprise Architect + Business Analysts   |   ADM Phase: B   |   TOGAF 10 + AI-First Extension

! ***AI-First Extension: Extends the standard TOGAF Business Capability Map to include AI capabilities, their risk classification, AIDLC status, and Human-AI task boundary designation.***

|**Business Capability**|**Domain**|**AI System**|**Risk Tier**|**Human-AI Boundary**|**AIDLC Status**|**Target Date**|
|---|---|---|---|---|---|---|
|Credit Decision|Retail Banking|Credit Risk AI Scoring|T2 HIGH RISK|AI-Primary with HITL for <70% confidence cases|Phase 2|Phase 4 Q2 2026|
|Adverse Action Explanation|Retail Banking|LLM Adverse Action Generator|T2 HIGH RISK|AI-Primary (SHAP-grounded); human review on appeal|Phase 2|Phase 7 Q3 2026|
|Customer Enquiry Resolution|Operations|Customer Service Copilot|T3 LIMITED|AI-Augmented; human escalation for complex cases|Phase 7 (LIVE)|Scope extension Q2 2026|
|Fraud Transaction Detection|Security|Fraud Detection Ensemble|T2 HIGH RISK|AI-Primary; all alerts to human analyst|Phase 8 (LIVE)|Governance uplift Q2 2026|
|Candidate CV Screening|HR|CV Screening Assistant|T2 HIGH RISK|AI-Recommend ONLY; human decides|Phase 2 (HOLD)|Subject to FRIA outcome|
|Marketing Segmentation|Marketing|Campaign Targeting AI|T4 MINIMAL|AI-Primary; no individual impact|Phase 5|Phase 7 Q3 2026|
|Developer Code Assistance|IT/Engineering|GitHub Copilot (registered)|T4 MINIMAL|AI-Augmented; developer reviews all output|Phase 7 (LIVE)|Registered; AIDLC-Lite|
|Architecture Documentation|EA|EA AI Assistant (proposed)|T4 MINIMAL|AI-Augmented; architect validates|Phase 1|Proposed for Q3 2026|

! **AI EXTENSION**

**HATB-001**

### Human-AI Task Boundary Map

Owner: Business Architect + Ethics Lead   |   ADM Phase: B   |   TOGAF 10 + AI-First Extension

! ***AI-First Extension: Documents the precise boundary between human and AI decision authority for every AI-impacted business process. Mandatory for all TIER 1–2 systems. This artifact is reviewed by the AI Governance Council and forms the basis for HITL design in AIDLC Phase 4.***

|**Process Step**|**Human-Only Tasks**|**AI-Only Tasks**|**HITL Trigger & Human Decision Role**|**SLA**|
|---|---|---|---|---|
|Credit Application Intake|Capture applicant data; verify identity|AI validates data completeness and identity (automated)|Human if identity verification fails (manual override required)|Instant / 5 min|
|Initial Credit Score|N/A (fully automated for T4 decisions)|AI scores application (XGBoost model); assigns confidence|Human review for ALL applications <70% confidence (~8% of volume)|<60 seconds / 4 hours (HITL)|
|Adverse Action Notice|N/A|AI generates SHAP-grounded rejection notice (LLM)|Human verifies reason codes before delivery if flagged by SHAP-LLM mismatch check|2 min / 30 min (if flag)|
|Customer Appeal|Receive appeal; notify AI Governance Council|AI provides case summary and supporting SHAP evidence|Human credit analyst makes FINAL determination on ALL appeals|5 business days|
|Bias Alert Response|Receive alert from monitoring system; notify CRO|AI produces demographic parity report automatically|Human (Ethics Lead + CRO) decides remediation action|24 hours|
|Model Retirement Decision|N/A|AI drift monitoring flags retirement trigger threshold|Human (ARB + AI Governance Council) approves retirement timeline|30-day process|

|**HITL Design Principles**|1. Every consequential AI decision has a human escalation path. 2. Confidence thresholds are set conservatively (err toward HITL). 3. HITL queue capacity is resourced before deployment. 4. HITL effectiveness is monitored monthly.|
|---|---|
|**Approval Authority**|HATB-001 approved by: Dr. Amara Diallo (Ethics Lead), James Hartley (CRO), AI Governance Council — 1 March 2026.|

### ! AI Extension: AI Operating Model

Owner: Business Architect + HR   |   ADM Phase: B   |   TOGAF 10 + AI-First Extension

**AOM-001**

|**Organisational Unit**|**Type**|**Responsibilities**|**Operating Cadence**|**Accountable Owner**|
|---|---|---|---|---|
|AI Governance Council|Cross-functional steering body|Set AI policy; approve high-risk deployments; review AGPs; manage regulatory relationships|Monthly meetings + emergency sessions|James Hartley (CRO, Chair)|
|Architecture Review Board|EA governance body|Approve AI architecture decisions; enforce standards; review ADRs; conduct compliance assessments|Bi-weekly + ad hoc gate reviews|Dr. Priya Mehta (Chief Architect, Chair)|
|AI Centre of Excellence (CoE)|Central AI delivery team|Deliver AIDLC; operate MLOps platform; publish AI standards; coach business teams|Permanent team of 12 FTE|Dr. Nina Kowalski (Head of AI CoE)|
|Domain AI Squads|Embedded AI teams in business units|Execute AI use cases within domain; own business data products; operate production AI systems|Permanent; 2–4 FTE per domain|Domain VPs + AI CoE matrix reporting|
|Model Risk Management|Risk oversight function|Independent model validation; approve TIER 2 models; conduct ongoing model governance audits|Ad hoc (per model) + quarterly review|CRO direct report|
|Ethics & Fairness Function|Independent advisory function|Conduct FRIAs; lead fairness evaluations; advise on AGP implementation; manage external ethics board|Per-use-case + ongoing monitoring|Dr. Amara Diallo (Ethics Lead)|
|MLOps Platform Team|Platform engineering function|Operate MLflow, Azure ML, LLM Gateway, vector database, monitoring stack for all AI systems|24/7 production support + continuous improvement|Priya Patel (MLOps Lead)|

## TOGAF ADM Data Architecture Phase C1

ARTIFACTS: DAB-001 · DM-001 · VDA-001 · FLS-001

**PHASE OUTPUT DAB-001 Data Architecture Blueprint** Owner: Data Architect   |   ADM Phase: C1   |   TOGAF 10 + AI-First Extension

|**Data Architecture Pattern**|*Data Lakehouse (Apache Iceberg on Azure Data Lake Gen2) + Data Mesh domain ownership + Feature Store for ML serving consistency*|
|---|---|
|**Primary Platform**|*Azure Data Lake Gen2 (storage) + Azure Databricks (Iceberg/Delta) + dbt (transformations) + Azure Event Hubs (streaming)*|
|**Data Domains**|*6 domains: Credit & Risk, Customer, Operations, Marketing, HR, Enterprise (shared reference data). Each domain owns its AI training data and RAG knowledge base.*|
|**AI Data Products**|*Each domain publishes: (1) Training datasets (DVC-versioned, quality-certified). (2) Feature Store features (Feast). (3) RAG knowledge base (domain-specific vector namespace in Weaviate).*|
|!**Lineage Standard**|*OpenLineage (Apache Airflow + dbt plugins). All data transformations emit lineage events. Lineage graph stored in Apache Atlas. Queryable via Atlan data catalog. EU AI Act Article 10 evidence package auto-generated.*|
|!**Quality Gates**|*Data products must achieve quality score ≥90% (completeness, accuracy, freshness, consistency) before certification for AI training use. Quality scores published in Atlan catalog.*|
|!**PII Handling**|*All PII fields tagged in Atlan. PII masking enforced at Feature Store and RAG retrieval layers via Microsoft Presidio. No PII may flow into LLM prompts unmasked.*|
|!**Freshness SLAs**|*Training data refresh: weekly. Feature Store: 15-minute maximum lag. RAG knowledge bases: 4-hour maximum lag. Inference logs: real-time. Monitoring dashboards: 5-minute lag.*|

! **AI EXTENSION DM-001**

### Data Mesh Domain Design

Owner: Data Architect + Domain Architects   |   ADM Phase: C1   |   TOGAF 10 + AI-First Extension

|**Domain**|**Key Data Assets**|**Business Owner / Data Owner**|**AI Data Products Published**|**Storage Location**|**Quality Status**|
|---|---|---|---|---|---|
|Credit & Risk|Credit Applications, Scoring History, Default Records, Alternative Data (Utility/Rent)|Sarah Chen / Dr. Nina Kowalski|CreditRisk-XGB v1.0 training set; Adverse Action RAG knowledge base; Credit features in Feast|S3://credit-domain/ + Feast:credit-features + Weaviate:credit-kb|98.7% completeness; lineage 100% coverage|
|Customer|CRM records, Interaction History, Segment Data, Consent Records|Lena Hoffmann / Domain Data Owner|CSCopilot RAG knowledge base; Customer segment features|S3://customer-domain/ + Weaviate:customer-kb|97.2%; GDPR consent tracking automated|
|Operations|Ticket Data, Process Logs, SLA Records, Agent Interaction Logs|Ops VP / Domain Data Owner|Operations knowledge base for Copilot; Process optimisation features|S3://ops-domain/ + Weaviate:ops-kb|94.1%; freshness SLA 2h|
|Security|Transaction Logs, Fraud Labels, Anomaly Patterns, Network Logs|John Kim / Domain Data Owner|FraudDet-ENS v3.1 training; real-time feature feed|S3://security-domain/ + Feast:fraud-features (real-time)|99.3%; p99 freshness <5min (critical)|
|Marketing|Campaign Data, Response Rates, Channel Attribution, Consent|Marketing VP / Domain Data Owner|Campaign Targeting AI training set; segment propensity features|S3://marketing-domain/ + Feast:mkt-features|95.8%; GDPR consent flag mandatory|
|HR|Job Postings, CV Pool (anonymised), Assessment Data, Outcome Labels|Maria Santos / Domain Data Owner|CV Screening AI (ON HOLD — FRIA pending); Workforce planning features|S3://hr-domain/ (restricted access)|RESTRICTED; FRIA must complete before AI use|

**! AI EXTENSION**

**VDA-001**

### Vector Database Architecture

Owner: Data Architect + AI Architect   |   ADM Phase: C1   |   TOGAF 10 + AI-First Extension

|**Platform Selected**|*Weaviate (self-hosted on AKS) — selected over Pinecone (lock-in risk) and Azure AI Search (limited OSS portability). See ADR: EA-C1-VDA-001.*|
|---|---|
|**Embedding Models**|*text-embedding-3-large (OpenAI) for knowledge bases; domain-specific fine-tuned E5-large for credit/regulatory content. All models versioned in MLflow.*|
|**Namespace Architecture**|*One Weaviate namespace per domain-use-case: credit-kb, customer-kb, ops-kb, regulatory-kb (shared), code-kb (IT). Namespace isolation enforces data product boundaries.*|
|!**Access Control**|*Weaviate API key per consuming service. Agent access requires scoped API key registered in HashiCorp Vault. No cross-namespace access without ARB approval.*|
|!**Freshness SLA**|*credit-kb: ≤4 hours. regulatory-kb: ≤1 hour (regulatory changes are time-sensitive). All others: ≤8 hours. Freshness monitored in Datadog; breach triggers P2 alert.*|
|!**Embedding Drift Monitoring**|*Weekly cosine similarity baseline check across namespaces. >10% average cosine drift triggers embedding model review and potential re-embedding. Monitored via Arize AI.*|
|!**GDPR Deletion Capability**|*Weaviate supports object-level deletion by UUID. DPO-triggered PII deletion workflows documented and tested. 72-hour deletion SLA from subject access request.*|
|!**EU AI Act Evidencing**|*Embedding model versions stored in MLflow with training data provenance. Namespace contents versioned with DVC. Full lineage from source document to vector queryable via OpenLineage.*|

## TOGAF ADM Application Architecture Phase C2

ARTIFACTS: LLMG-001 · AOB-001 · CSD-001 · ASAP-001

**! AI EXTENSION**

**LLMG-001**

### LLM Gateway Architecture

Owner: AI Architect + Security Architect   |   ADM Phase: C2   |   TOGAF 10 + AI-First Extension

! ***AI-First Extension: The LLM Gateway is the mandatory control plane for ALL LLM API calls within GlobalBank. No LLM call may bypass the gateway. This is the application-layer equivalent of the network security perimeter for AI traffic.***

|**Platform**|*Kong AI Gateway (enterprise licence) — deployed on AKS in GlobalBank's Azure subscription*|
|---|---|
|**Model Routing**|*LiteLLM abstraction layer behind Kong. Routes to: Azure OpenAI (primary), Anthropic Claude via Bedrock (secondary), Llama 3 (self-hosted, sensitive data). Failover automatic.*|
|!**Mandatory Controls**|*Every LLM call through gateway must pass: (1) Prompt injection detection (Lakera Guard API). (2) PII masking (Presidio). (3) Content safety filter (Azure AI Content Safety). (4) Token budget enforcement. (5) Audit log write.*|
|!**Rate Limiting**|*Per-service rate limits: Credit scoring LLM = 500 RPM. Customer Copilot = 2000 RPM. Developer Copilot = 5000 RPM. Burst: 2× sustained for 60s. Exceeding burst → 429 + alert.*|
|!**Audit Logging**|*100% of LLM requests logged to Splunk: service ID, model, token count, latency, safety score, redacted prompt summary. PII-free log. Immutable append-only. Retained 7 years (FCA).*|
|!**Cost Attribution**|*Every LLM call tagged with: cost-centre, use-case-ID, model-version, environment. FinOps dashboard in Azure Cost Management. Weekly cost report to business owners.*|
|!**Response Caching**|*Semantic caching enabled for deterministic queries (e.g., regulatory Q&A). Cache TTL = 4 hours. Cache hit rate target >30% to reduce costs. Privacy: cached responses never contain PII.*|

**! AI EXTENSION**

**AOB-001**

### Agent Orchestration Blueprint

Owner: AI Architect   |   ADM Phase: C2   |   TOGAF 10 + AI-First Extension

|**Orchestration Framework**|*LangGraph (primary for stateful multi-step agents) + LangChain (for RAG chains). AutoGen reserved for experimental multi-agent workflows pending governance maturity.*|
|---|---|
|**Integration Protocol**|*Model Context Protocol (MCP) as the standard for agent-to-enterprise-service integration. All enterprise APIs exposed via MCP servers to agents. No direct REST calls from agents.*|
|!**Agent Identity Model**|*Each agent has a dedicated service identity in Azure Managed Identity. Agent identity is SEPARATE from human IAM. Agent credentials are short-lived (15-min TTL). Stored in HashiCorp Vault.*|
|!**Action Boundaries**|*Agent action boundaries defined in Agent Action Boundary Register (AABR-001-EA). Enforced at runtime by OPA (Open Policy Agent) sidecar on each agent pod. Violations logged and alerted.*|
|!**ATF Trust Levels**|*Agents are assigned ATF trust levels 0–4 by the AI Governance Council. Promotion requires: demonstrated accuracy over evaluation period, security audit, clean operational history, explicit stakeholder approval.*|
|!**Memory Architecture**|*Working memory: in-context (per session, ephemeral). Episodic memory: Redis (session history, 24h TTL). Semantic memory: Weaviate vector store (persistent, access-controlled). No unlimited persistent memory.*|
|!**Circuit Breakers**|*All agents wrapped with Resilience4j circuit breaker. If error rate >5% in 60s window → circuit opens, agent paused, P1 alert. Prevents runaway agent cascades.*|

**! AI EXTENSION**

**ASAP-001**

### Agent-Safe API Design Pattern

Owner: Solution Architect   |   ADM Phase: C2   |   TOGAF 10 + AI-First Extension

|**Design Requirement**|**Standard**|**Example Implementation**|
|---|---|---|
|Idempotency|All state-changing endpoints MUST be idempotent (safe to retry). Idempotency key in header.|POST /decisions: X-Idempotency-Key: {uuid} prevents duplicate credit decisions on agent retry|
|Semantic Versioning in Metadata|API version communicated in response metadata, not just URL. Allows agents to self-discover deprecation.|Response header: X-API-Version: 2.3.1, X-API-Deprecation-Date: 2027-01-01|
|Action Documentation|Every state-changing endpoint documents: action type (reversible/irreversible), scope of impact, human approval requirement.|POST /decisions: {"reversible": false, "scope": "customer-credit-file", "hitl_required": true}|
|Burst Rate Limits|Agent-specific rate limits documented in API spec. Differentiated from human user limits. Exponential backoff required.|Agent client: burst 500 RPM sustained 200 RPM. Retry-After header provided on 429.|
|Webhook Callbacks|Long-running operations return 202 + callback URL. Agents register webhook endpoint. No synchronous waiting.|POST /model-retraining → 202 {callbackUrl: "/retrain-status/{job-id}"}|
|Dry-Run Mode|Irreversible operations support ?dryRun=true parameter for agent testing without side effects.|DELETE /model-version?dryRun=true → returns what would happen, no deletion|
|Audit Trail in Response|Every state-changing response includes audit trail ID for traceability from agent action to business outcome.|Response: {"auditId": "AUD-2026-FIN-048371", "agentId": "AGT-OPS-001"}|

## TOGAF ADM Technology Architecture Phase D

ARTIFACTS: AIB-001 · MPD-001 · ZTA-001 · FAOD-001

**PHASE OUTPUT**

### AI Infrastructure Blueprint

Owner: Technology Architect + MLOps Lead   |   ADM Phase: D   |   TOGAF 10 + AI-First Extension

|**Component**|**Platform**|**Purpose**|**Scale Design**|**Governance Notes**|
|---|---|---|---|---|
|GPU Compute (Training)|Azure NC-series (A100 80GB) — on-demand|Model training, fine-tuning, large-scale batch inference|Spot instances for training; reserved for inference|FinOps: per-use-case cost tagging; weekly budget review|
|GPU Compute (Inference)|Azure NP-series (inference-optimised)|Real-time model serving via KServe|Autoscaling 2–20 replicas; HPA on GPU util|p99 latency SLA <200ms for credit scoring|
|Inference Serving|KServe on AKS (v0.13)|Serve XGBoost, PyTorch, ONNX models|Canary deployments; shadow mode; A/B traffic splitting|Model version rollback <3min|
|Model Registry|MLflow (Azure ML workspace)|Versioned model artifacts, metrics, lineage, deployment history|Git-like versioning; SHA-256 model hash verification|EU AI Act Art.11 technical documentation auto-generated|
|Feature Store|Feast (self-hosted on AKS + Redis + Azure SQL)|Real-time and batch feature serving; training-serving consistency|Redis for online serving (<5ms); Parquet for offline training|Training-serving skew monitoring via Arize AI|
|Vector Database|Weaviate (AKS, 3-node cluster)|Semantic search, RAG retrieval, embedding storage|Horizontal scaling; namespace-level ACL|4-hour freshness SLA; embedding drift monitoring|
|LLM Gateway|Kong AI Gateway (AKS)|Centralised LLM traffic control, safety, audit|Active-active HA; 99.9% SLA|Zero single-point-of-failure; circuit breaker|
|Observability|Datadog (APM + ML monitoring) + Arize AI (model monitoring) + Splunk (SIEM)|Full-stack observability: infra, application, ML model behaviour, security events|15-second metric resolution; 1-year retention|PagerDuty integration; escalation to on-call MLOps|
|CI/CD / MLOps Pipeline|Azure DevOps + GitHub Actions + MLflow + dbt|Automated model training, validation, deployment; data pipeline orchestration|4-eyes principle: automated gate + human approval at Phase 6|Full pipeline execution <2 hours for standard models|

! **AI EXTENSION**

**ZTA-001**

### Zero Trust AI Security Architecture

Owner: Security Architect   |   ADM Phase: D   |   TOGAF 10 + AI-First Extension

! ***AI-First Extension: Traditional Zero Trust assumes human identity. This document extends ZTA to cover AI agent identity, agentic action boundaries, model supply chain security, and AI-specific threat mitigations.***

|**ZTA Principle for AI**|**Implementation Detail**|**Technology Controls**|
|---|---|---|
|Never Trust Agent Identity|Each agent has a unique, short-lived (15-min TTL) managed identity. No agent inherits human user permissions. Agent identity re-verified at every tool call, not just session initiation.|Azure Managed Identity + HashiCorp Vault dynamic secrets + OPA policy engine|
|Least-Privilege Action Boundaries|Agents granted minimum tool access for defined task only. Tool access scoped to session, not persistent. Privilege escalation auto-triggers human review + P1 alert.|OPA sidecar enforcement + Agent Action Boundary Register (AABR-001-EA) as policy source|
|Assume Breach at Agent Layer|Security design assumes any agent can be compromised via prompt injection or jailbreak. Circuit breakers limit blast radius. All agent actions reversible where possible.|Lakera Guard + Azure Content Safety + Resilience4j circuit breakers + dead-letter queues|
|Model Supply Chain Verification|All model artifacts verified against SHA-256 hash in MLflow before deployment. SBOM (Software Bill of Materials) maintained for all model dependencies. Third-party models undergo TPRM assessment.|Sigstore model signing + MLflow hash verification + Snyk dependency scanning + TPRM vendor questionnaire|
|Zero Trust Data Access|RAG retrieval respects data namespace ACLs. Agents cannot access data outside their registered namespace. PII masking applied before any LLM processing.|Weaviate namespace ACLs + Presidio PII masking + Azure AD Conditional Access for data layer|
|Continuous Verification|Security posture of deployed agents re-assessed quarterly. Anomaly detection on agent behaviour patterns flags deviation from baseline.|Splunk UBA (User and Entity Behaviour Analytics) extended to cover agent identities; quarterly security audit|
|Audit Immutability|All agent actions logged to immutable, tamper-evident audit log (WORM storage). Log integrity verified via cryptographic hash chain. Accessible to FCA on request.|Azure Blob WORM storage + SHA-256 hash chain + Splunk SIEM; 7-year retention|
