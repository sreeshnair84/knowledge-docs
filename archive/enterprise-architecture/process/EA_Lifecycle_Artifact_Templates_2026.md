---
title: "EA Lifecycle Artifact Templates"
date_created: 2026-07-10
status: archived
source_type: converted-pdf
source_file: "EA_Lifecycle_Artifact_Templates_2026.pdf"
doc_type: guide
tags: ["enterprise-architecture", "ai-development"]
last_reviewed: 2026-07-17
covers_version: "N/A"
supersededBy: "ai-development/aidlc/AIDLC_Artifact_Reference_Library"
---

> **Archived 2026-07-17.** Every TOGAF ADM phase and artifact template in this library (Preliminary through EA Cross-Cutting) has been merged into the [AIDLC Artifact Reference Library](/knowledge-docs/ai-development/aidlc/AIDLC_Artifact_Reference_Library), under its new "Enterprise Architecture (TOGAF ADM) Artifact Templates" section — the two libraries were already explicitly cross-referenced as companion documents. Kept for reference only; not linked from the sidebar.
# EA Lifecycle Artifact Templates

#### TOGAF 10 ADM · All Phases · AI-First Extensions

Every artifact shown as a live template with field definitions and example content

Companion to: AIDLC Enterprise Framework 2025 · EA Impact of AIDLC 2026 · AIDLC Artifact Reference Library 2026

## HOW TO USE THESE TEMPLATES

|**Blue italic text**|*Example field values filled in for a fictional "GlobalBank AI Transformation Programme*<br>*2026". Replace with your actual data.*|
|---|---|
|**Field labels**|Every label is mandatory unless marked [OPTIONAL]. Mandatory fields require approval<br>before phase advancement.|
|**AI Extension fields**|Fields marked!are AI-First extensions added to TOGAF 10. These are NOT in standard<br>TOGAF 10 but are required for AIDLC-integrated EA.|
|**Artifact IDs**|Prefix format: EA-[Phase]-[Type]-[NNN]. E.g. EA-B-HATB-001 = Business Architecture,<br>Human-AI Task Boundary, first instance.|
|**Linked artifacts**|Each artifact shows upstream inputs (←) and downstream outputs (→) to trace lineage<br>through the ADM cycle.|

###### *TOGAF 10 COMPLIANCE: All standard TOGAF 10 artifacts are included at their minimum viable form. AI-First*

***extension fields (*** ! ***) are additive — they do not replace standard TOGAF artifacts. Organisations pursuing ISO/IEC 42001 or EU AI Act compliance should use AI-First fields as mandatory.***

### TOGAF ADM Preliminary Phase

ARTIFACTS: EAFC-001 · AGP-001 · ESR-001

The Preliminary phase establishes the EA framework, governance model, and AI governance principles before any architecture work begins. In AI-first enterprises, this phase must produce a Constitutional AI commitment and establish the AI Governance Council as an EA stakeholder.

**EA GOVERNANCE EAFC-001**

#### EA Framework Charter

Owner: Chief Architect / CIO   |   ADM Phase: PRE   |   TOGAF 10 + AI-First Extension

||**CHARTER SCOPE & AUTHORITY**|
|---|---|
|**Organisation**|*GlobalBank plc — Digital & Technology Division*|
|**EA Framework Adopted**|*TOGAF 10 (The Open Group Architecture Standard, 10th Edition, 2022)*|
|**Charter Version / Status**|*v2.1 — Approved 15 January 2026*|
|**EA Programme Scope**|*Enterprise-wide: all business units, all technology investments >£500K, all AI systems (any*<br>*cost)*|
|**EA Authority**|*Architecture Review Board (ARB) has binding authority over all technology architecture*<br>*decisions. No AI system may be deployed without ARB sign-off at AIDLC Phase 6.*|
|**Chief Architect**|*Dr. Priya Mehta, Group Chief Architect (Board-level authority)*|
|**Review Cycle**|*Annual framework review; quarterly AI governance review; immediate review on regulatory*<br>*change*|
||!**AI-FIRST EXTENSIONS**|
|!**AI Governance Council**|*Established as permanent EA stakeholder body. Composition: CRO, CPO, CISO, Chief*<br>*Data Officer, Chief Architect, External AI Ethics Advisor. Quorum: 4 of 6 required for AI*<br>*system approval.*|
|!**Constitutional AI Commitment**|*GlobalBank commits to AIDLC governance for all AI systems. Constitutional AI Policy is a*<br>*mandatory output of Phase 4 (Model Design). No AI system proceeds to development*<br>*without an approved CAP.*|
|!**AIDLC Integration**|*TOGAF ADM phases B, C, D incorporate AIDLC Phase Gates as mandatory Architecture*<br>*Compliance milestones. See ACC-001 for the compliance checklist.*|
|!**Regulatory Alignment**|*EA framework explicitly aligned with: EU AI Act (all risk tiers), NIST AI RMF*<br>*(Govern-Map-Measure-Manage), ISO/IEC 42001, FCA operational resilience*<br>*requirements.*|

**EA GOVERNANCE**

**AGP-001**

#### AI Governance Principles

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

#### EA Stakeholder Register

Owner: Chief Architect   |   ADM Phase: PRE   |   TOGAF 10 + AI-First Extension

|**Stakeholder**<br>**Group**|**Members**|**Intere**<br>**st**|**Influe**<br>**nce**|**EA Role**|**Engagement**<br>**Points**|
|---|---|---|---|---|---|
|AI Governance<br>Council|CRO, CPO, CISO,<br>CDA, Chief<br>Architect, Ethics<br>Advisor|High|High|Approve AI system<br>deployments; review<br>CAP; set AGP|Monthly governance<br>review; Phase 4 & 6<br>gates|
|Architecture<br>Review Board<br>(ARB)|Chief Architect,<br>Domain Architects,<br>Security Architect,<br>Data Architect|High|High|Approve all<br>architecture decisions;<br>review ADRs|Phase gate reviews;<br>emergency sessions<br>for P0 incidents|

|Business Unit<br>Owners|VPs per domain<br>(Credit,<br>Operations,<br>Marketing, HR,<br>Security)|High|Mediu<br>m|Sponsor AI use cases;<br>approve business<br>architecture|Phase A discovery;<br>Phase B capability<br>mapping|
|---|---|---|---|---|---|
|Data<br>Governance<br>Board|Chief Data Officer,<br>Domain Data<br>Owners, DPO|High|High|Approve data strategy;<br>sign off Data Sheet<br>and PIA|Phase C1 data<br>architecture reviews|
|!Model Risk<br>Management|Chief Risk Officer,<br>Model Risk<br>Managers|High|High|Assess and sign off<br>high-risk AI model<br>deployments|Phase 6 evaluation<br>sign-off; Phase 8<br>quarterly audit|
|!External<br>Regulators|FCA, ICO, EU AI<br>Act National<br>Authority|High|Low<br>(can in<br>fluenc<br>e)|Regulatory<br>compliance;<br>supervisory<br>examination|Annual regulatory<br>reporting; incident<br>notification <72h|
|Technology<br>Teams|Engineering,<br>DevOps, MLOps,<br>Data Engineering|Mediu<br>m|High|Implement<br>architecture; operate<br>AI systems|All phases; primary<br>AIDLC delivery|
|!Affected|Retail and|High|Low (c|Fairness,|FRIA consultation;|
|Customers|corporate banking<br>customers||onsult<br>ed)|transparency, right to<br>explanation|user testing; appeal<br>channel|

### TOGAF ADM Architecture Vision Phase A

ARTIFACTS: SAW-001 · ACA-001 · AVD-001

###### PHASE OUTPUT

###### SAW-001

#### Statement of Architecture Work

Owner: Chief Architect   |   ADM Phase: A   |   TOGAF 10 + AI-First Extension

###### WORK DEFINITION

|**Architecture Work Title**|*GlobalBank AI Transformation Programme — Phase 1: Core Banking AI Integration*|
|---|---|
|**Sponsoring Executive**|*Marcus Chen, Chief Operating Officer*|
|**Architecture Work Description**|*Design and govern the enterprise architecture for integrating AI systems into core banking*<br>*operations: credit risk scoring, customer service automation, fraud detection.*<br>*Encompasses 5 AI use cases (see ACA-001), full AIDLC lifecycle governance, and*<br>*technology platform modernisation to support AI at scale.*|
|**Scope**|*IN SCOPE: UK Retail Banking division, core banking AI systems, data architecture for AI,*<br>*MLOps platform, agent architecture. OUT OF SCOPE: International operations (Year 2),*<br>*mortgage AI (separate programme), investment banking (separate governance).*|
|**Constraints**|*1. EU AI Act compliance required for all credit, HR and fraud systems. 2. FCA operational*<br>*resilience rules apply. 3. Core banking system (Temenos) cannot be replaced in this*<br>*programme. 4. Maximum cloud budget: £2.8M/year.*|
|**Assumptions**|*Alternative data partners (utility, rent) contracts will be signed by Q2 2026. Azure ML*<br>*platform will remain enterprise standard for ML workloads. LLM provider contracts*<br>*available under existing Microsoft EA.*|
|**Deliverables**|*Architecture Vision (AVD-001), Business Architecture (Phase B), Data Architecture (Phase*<br>*C1), Application Architecture (Phase C2), Technology Architecture (Phase D), Migration*<br>*Plan (Phase F), Governance Framework (Phase G)*|
|**Timeline**|*Phase A-D: Q1 2026 (12 weeks). Phase E-F: Q2 2026 (8 weeks). Phase G onwards:*<br>*ongoing.*|
|**Approved By**|*Dr. Priya Mehta (Chief Architect) · Marcus Chen (COO) · AI Governance Council — 22*<br>*January 2026*|

! **AI EXTENSION AI Capability Assessment** Owner: Chief Architect + AI Lead   |   ADM Phase: A   |   TOGAF 10 + AI-First Extension

**ACA-001**

! ***AI-First Extension: This artifact is not in standard TOGAF 10. It provides the AI capability inventory and maturity baseline that drives all subsequent AI-impacted architecture decisions.***

|**AI Use Case**|**EU AI Act**<br>**Tier**|**AIDLC Phase**|**Model Type**|**Strategic**<br>**Status**|**Priorit**<br>**y**|**Compliance**<br>**Requirements**|
|---|---|---|---|---|---|---|
|Credit Risk AI|T2 — HIGH|Phase 2|XGBoost +|Foundational —|Priority|FRIA required; FCA|
|Scoring|RISK|(Feasibility)|LLM|must deliver|1|regulated|

|Customer<br>Service Copilot|T3 —<br>LIMITED<br>RISK|Phase 7<br>(Production)|GPT-4o<br>RAG|Already live —<br>extend scope|Priority<br>2|EU AI Act Art. 50<br>transparency|
|---|---|---|---|---|---|---|
|Fraud Detection<br>AI|T2 — HIGH<br>RISK|Phase 8<br>(Monitor)|Ensemble +<br>LSTM|Mature —<br>governance<br>uplift|Priority<br>1|PCI-DSS; FCA SYSC<br>23|
|CV Screening<br>Assistant|T2 — HIGH<br>RISK|Phase 2<br>(HOLD)|LLM +<br>Embedding|On hold — FRIA<br>first|Priority<br>3|EU AI Act Annex III<br>Cat.1|
|Campaign<br>Targeting AI|T4 —<br>MINIMAL<br>RISK|Phase 5 (Dev)|XGBoost|Progressing<br>normally|Priority<br>4|GDPR profiling<br>consent|
|Developer<br>Copilot (GitHub<br>Copilot)|T4 —<br>MINIMAL<br>RISK|Phase 7 (Prod)|Codex/GPT-<br>4o|Shadow AI —<br>register &<br>govern|Priority<br>3|AIDLC-Lite track|
|!**AI Maturity Baseline**||*McKinsey AI Matur*<br>*Production MLOps*<br>*end 2026.*|*ity Level 2 of 5*<br>*immature. Gov*|*(Developing). Proo*<br>*ernance framewor*|*f-of-conce*<br>*k nascent.*|*pt capability exists.*<br>*Target: Level 3 (Scaling) by*|
|!**Shadow AI Exposure**||*27 unregistered AI*<br>*various ChatGPT i*<br>*within 30 days.*|*tools identified*<br>*ntegrations). Al*|*in SaaS survey (G*<br>*l to be assessed an*|*itHub Copi*<br>*d register*|*lot, Grammarly, Otter.ai,*<br>*ed in AI System Inventory*|
|!**Architecture Readine**|**ss**|*Data architecture:*<br>*enterprise platform*<br>*LOW (no zero trust*|*MEDIUM (data*<br>*). Application:*<br>*). Governance:*|*lake exists, lineage*<br>*MEDIUM (microser*<br>*LOW (nascent).*|*immature*<br>*vices parti*|*). MLOps: LOW (no*<br>*ally adopted). Security:*|

**PHASE OUTPUT AVD-001 Architecture Vision Document** Owner: Chief Architect   |   ADM Phase: A   |   TOGAF 10 + AI-First Extension

|**Vision Statement**|*By end 2026, GlobalBank will operate a trusted, explainable, and regulatorily compliant AI*<br>*capability that delivers £7.3M+ annual value from credit risk automation, reduces manual*<br>*review by 35%, and serves as a model for responsible AI in UK financial services.*|
|---|---|
|**Target Architecture Descriptor**|*AI-First Enterprise Architecture: 7-layer reference stack (L1 GPU Infrastructure*→*L7*<br>*Business & Governance), AIDLC lifecycle for all AI systems, Data Mesh for AI data*<br>*products, Zero Trust for AI agents, TOGAF 10 ADM as the governance backbone.*|
|**Key Architecture Principles**|*1. Architecture before AI (no AI before the foundation is ready). 2. Data as first-class*<br>*product. 3. Explainability by design. 4. Zero Trust at every layer. 5. Governance*<br>*proportionate to risk. 6. Open standards over vendor lock-in.*|
|**Business Outcomes**|*60-second credit decisions (vs 72 hours), <5% false rejection rate (vs 12%), 100% adverse*<br>*action explanation coverage, £7.3M ROI Year 1, ISO/IEC 42001 certification Q4 2026.*|
|**Architecture Risks**|*1. Legacy Temenos integration complexity (HIGH). 2. EU AI Act compliance timeline*<br>*(HIGH). 3. Alternative data vendor contracts (MEDIUM). 4. MLOps talent gap (MEDIUM).*<br>*5. Shadow AI exposure (LOW-MEDIUM).*|
|**ARB Approved**|*5 February 2026 — Architecture Review Board unanimous approval*|

### TOGAF ADM Business Architecture Phase B

ARTIFACTS: ACM-001 · HATB-001 · AOM-001 · WIA-001

###### ! **AI EXTENSION**

**ACM-001**

#### AI Capability Map

Owner: Enterprise Architect + Business Analysts   |   ADM Phase: B   |   TOGAF 10 + AI-First Extension

! ***AI-First Extension: Extends the standard TOGAF Business Capability Map to include AI capabilities, their risk classification, AIDLC status, and Human-AI task boundary designation.***

|**Business**<br>**Capability**|**Domain**|**AI System**|**Risk Tier**|**Human-AI Boundary**|**AIDLC**<br>**Status**|**Target Date**|
|---|---|---|---|---|---|---|
|Credit Decision|Retail<br>Banking|Credit Risk AI<br>Scoring|T2 HIGH<br>RISK|AI-Primary with HITL for<br><70% confidence cases|Phase 2|Phase 4 Q2<br>2026|
|Adverse Action<br>Explanation|Retail<br>Banking|LLM Adverse<br>Action Generator|T2 HIGH<br>RISK|AI-Primary<br>(SHAP-grounded);<br>human review on appeal|Phase 2|Phase 7 Q3<br>2026|
|Customer<br>Enquiry<br>Resolution|Operations|Customer Service<br>Copilot|T3<br>LIMITED|AI-Augmented; human<br>escalation for complex<br>cases|Phase 7<br>(LIVE)|Scope<br>extension Q2<br>2026|
|Fraud<br>Transaction<br>Detection|Security|Fraud Detection<br>Ensemble|T2 HIGH<br>RISK|AI-Primary; all alerts to<br>human analyst|Phase 8<br>(LIVE)|Governance<br>uplift Q2 2026|
|Candidate CV<br>Screening|HR|CV Screening<br>Assistant|T2 HIGH<br>RISK|AI-Recommend ONLY;<br>human decides|Phase 2<br>(HOLD)|Subject to<br>FRIA outcome|
|Marketing<br>Segmentation|Marketing|Campaign<br>Targeting AI|T4<br>MINIMAL|AI-Primary; no individual<br>impact|Phase 5|Phase 7 Q3<br>2026|
|Developer Code<br>Assistance|IT/Engineeri<br>ng|GitHub Copilot<br>(registered)|T4<br>MINIMAL|AI-Augmented;<br>developer reviews all<br>output|Phase 7<br>(LIVE)|Registered;<br>AIDLC-Lite|
|Architecture<br>Documentation|EA|EA AI Assistant<br>(proposed)|T4<br>MINIMAL|AI-Augmented; architect<br>validates|Phase 1|Proposed for<br>Q3 2026|

! **AI EXTENSION**

**HATB-001**

#### Human-AI Task Boundary Map

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

#### ! **AI EXTENSION AI Operating Model** Owner: Business Architect + HR   |   ADM Phase: B   |   TOGAF 10 + AI-First Extension

**AOM-001**

|**Organisational**<br>**Unit**|**Type**|**Responsibilities**|**Operating**<br>**Cadence**|**Accountable**<br>**Owner**|
|---|---|---|---|---|
|AI Governance<br>Council|Cross-functional<br>steering body|Set AI policy; approve high-risk<br>deployments; review AGPs; manage<br>regulatory relationships|Monthly<br>meetings +<br>emergency<br>sessions|James Hartley<br>(CRO, Chair)|
|Architecture<br>Review Board|EA governance<br>body|Approve AI architecture decisions;<br>enforce standards; review ADRs;<br>conduct compliance assessments|Bi-weekly + ad<br>hoc gate<br>reviews|Dr. Priya Mehta<br>(Chief Architect,<br>Chair)|
|AI Centre of|Central AI|Deliver AIDLC; operate MLOps|Permanent|Dr. Nina Kowalski|
|Excellence<br>(CoE)|delivery team|platform; publish AI standards;<br>coach business teams|team of 12<br>FTE|(Head of AI CoE)|
|Domain AI<br>Squads|Embedded AI<br>teams in<br>business units|Execute AI use cases within domain;<br>own business data products;<br>operate production AI systems|Permanent;<br>2–4 FTE per<br>domain|Domain VPs + AI<br>CoE matrix<br>reporting|

|Model Risk<br>Management|Risk oversight<br>function|Independent model validation;<br>approve TIER 2 models; conduct<br>ongoing model governance audits|Ad hoc (per<br>model) +<br>quarterly<br>review|CRO direct report|
|---|---|---|---|---|
|Ethics &<br>Fairness<br>Function|Independent<br>advisory<br>function|Conduct FRIAs; lead fairness<br>evaluations; advise on AGP<br>implementation; manage external<br>ethics board|Per-use-case<br>+ ongoing<br>monitoring|Dr. Amara Diallo<br>(Ethics Lead)|
|MLOps Platform<br>Team|Platform<br>engineering<br>function|Operate MLflow, Azure ML, LLM<br>Gateway, vector database,<br>monitoring stack for all AI systems|24/7<br>production<br>support +<br>continuous<br>improvement|Priya Patel<br>(MLOps Lead)|

### TOGAF ADM Data Architecture Phase C1

ARTIFACTS: DAB-001 · DM-001 · VDA-001 · FLS-001

**PHASE OUTPUT DAB-001 Data Architecture Blueprint** Owner: Data Architect   |   ADM Phase: C1   |   TOGAF 10 + AI-First Extension

|**Data Architecture Pattern**|*Data Lakehouse (Apache Iceberg on Azure Data Lake Gen2) + Data Mesh domain*<br>*ownership + Feature Store for ML serving consistency*|
|---|---|
|**Primary Platform**|*Azure Data Lake Gen2 (storage) + Azure Databricks (Iceberg/Delta) + dbt*<br>*(transformations) + Azure Event Hubs (streaming)*|
|**Data Domains**|*6 domains: Credit & Risk, Customer, Operations, Marketing, HR, Enterprise (shared*<br>*reference data). Each domain owns its AI training data and RAG knowledge base.*|
|**AI Data Products**|*Each domain publishes: (1) Training datasets (DVC-versioned, quality-certified). (2)*<br>*Feature Store features (Feast). (3) RAG knowledge base (domain-specific vector*<br>*namespace in Weaviate).*|
|!**Lineage Standard**|*OpenLineage (Apache Airflow + dbt plugins). All data transformations emit lineage events.*<br>*Lineage graph stored in Apache Atlas. Queryable via Atlan data catalog. EU AI Act Article*<br>*10 evidence package auto-generated.*|
|!**Quality Gates**|*Data products must achieve quality score*≥*90% (completeness, accuracy, freshness,*<br>*consistency) before certification for AI training use. Quality scores published in Atlan*<br>*catalog.*|
|!**PII Handling**|*All PII fields tagged in Atlan. PII masking enforced at Feature Store and RAG retrieval*<br>*layers via Microsoft Presidio. No PII may flow into LLM prompts unmasked.*|
|!**Freshness SLAs**|*Training data refresh: weekly. Feature Store: 15-minute maximum lag. RAG knowledge*<br>*bases: 4-hour maximum lag. Inference logs: real-time. Monitoring dashboards: 5-minute*<br>*lag.*|

! **AI EXTENSION DM-001**

#### Data Mesh Domain Design

Owner: Data Architect + Domain Architects   |   ADM Phase: C1   |   TOGAF 10 + AI-First Extension

|**Domain**|**Key Data Assets**|**Business**<br>**Owner / Data**<br>**Owner**|**AI Data Products**<br>**Published**|**Storage**<br>**Location**|**Quality**<br>**Status**|
|---|---|---|---|---|---|
|Credit &<br>Risk|Credit Applications,<br>Scoring History,<br>Default Records,<br>Alternative Data<br>(Utility/Rent)|Sarah Chen /<br>Dr. Nina<br>Kowalski|CreditRisk-XGB<br>v1.0 training set;<br>Adverse Action<br>RAG knowledge<br>base; Credit<br>features in Feast|S3://credit-doma<br>in/ + Feast:credi<br>t-features + We<br>aviate:credit-kb|98.7%<br>completeness;<br>lineage 100%<br>coverage|
|Customer|CRM records,<br>Interaction History,<br>Segment Data,<br>Consent Records|Lena Hoffmann<br>/ Domain Data<br>Owner|CSCopilot RAG<br>knowledge base;<br>Customer segment<br>features|S3://customer-d<br>omain/ + Weavi<br>ate:customer-kb|97.2%; GDPR<br>consent<br>tracking<br>automated|

|Operation<br>s|Ticket Data,<br>Process Logs, SLA<br>Records, Agent<br>Interaction Logs|Ops VP /<br>Domain Data<br>Owner|Operations<br>knowledge base for<br>Copilot; Process<br>optimisation<br>features|S3://ops-domain<br>/ + Weaviate:op<br>s-kb|94.1%;<br>freshness SLA<br>2h|
|---|---|---|---|---|---|
|Security|Transaction Logs,<br>Fraud Labels,<br>Anomaly Patterns,<br>Network Logs|John Kim /<br>Domain Data<br>Owner|FraudDet-ENS v3.1<br>training; real-time<br>feature feed|S3://security-do<br>main/ + Feast:fr<br>aud-features<br>(real-time)|99.3%; p99<br>freshness<br><5min (critical)|
|Marketing|Campaign Data,<br>Response Rates,<br>Channel Attribution,<br>Consent|Marketing VP /<br>Domain Data<br>Owner|Campaign Targeting<br>AI training set;<br>segment propensity<br>features|S3://marketing-d<br>omain/ + Feast:<br>mkt-features|95.8%; GDPR<br>consent flag<br>mandatory|
|HR|Job Postings, CV<br>Pool (anonymised),<br>Assessment Data,<br>Outcome Labels|Maria Santos /<br>Domain Data<br>Owner|CV Screening AI<br>(ON HOLD — FRIA<br>pending); Workforce<br>planning features|S3://hr-domain/<br>(restricted<br>access)|RESTRICTED<br>; FRIA must<br>complete<br>before AI use|

###### ! **AI EXTENSION**

**VDA-001**

#### Vector Database Architecture

Owner: Data Architect + AI Architect   |   ADM Phase: C1   |   TOGAF 10 + AI-First Extension

|**Platform Selected**|*Weaviate (self-hosted on AKS) — selected over Pinecone (lock-in risk) and Azure AI*<br>*Search (limited OSS portability). See ADR: EA-C1-VDA-001.*|
|---|---|
|**Embedding Models**|*text-embedding-3-large (OpenAI) for knowledge bases; domain-specific fine-tuned*<br>*E5-large for credit/regulatory content. All models versioned in MLflow.*|
|**Namespace Architecture**|*One Weaviate namespace per domain-use-case: credit-kb, customer-kb, ops-kb,*<br>*regulatory-kb (shared), code-kb (IT). Namespace isolation enforces data product*<br>*boundaries.*|
|!**Access Control**|*Weaviate API key per consuming service. Agent access requires scoped API key*<br>*registered in HashiCorp Vault. No cross-namespace access without ARB approval.*|
|!**Freshness SLA**|*credit-kb:*≤*4 hours. regulatory-kb:*≤*1 hour (regulatory changes are time-sensitive). All*<br>*others:*≤*8 hours. Freshness monitored in Datadog; breach triggers P2 alert.*|
|!**Embedding Drift Monitoring**|*Weekly cosine similarity baseline check across namespaces. >10% average cosine drift*<br>*triggers embedding model review and potential re-embedding. Monitored via Arize AI.*|
|!**GDPR Deletion Capability**|*Weaviate supports object-level deletion by UUID. DPO-triggered PII deletion workflows*<br>*documented and tested. 72-hour deletion SLA from subject access request.*|
|!**EU AI Act Evidencing**|*Embedding model versions stored in MLflow with training data provenance. Namespace*<br>*contents versioned with DVC. Full lineage from source document to vector queryable via*<br>*OpenLineage.*|

### TOGAF ADM Application Architecture Phase C2

ARTIFACTS: LLMG-001 · AOB-001 · CSD-001 · ASAP-001

###### ! **AI EXTENSION**

**LLMG-001**

#### LLM Gateway Architecture

Owner: AI Architect + Security Architect   |   ADM Phase: C2   |   TOGAF 10 + AI-First Extension

! ***AI-First Extension: The LLM Gateway is the mandatory control plane for ALL LLM API calls within GlobalBank. No LLM call may bypass the gateway. This is the application-layer equivalent of the network security perimeter for AI traffic.***

|**Platform**|*Kong AI Gateway (enterprise licence) — deployed on AKS in GlobalBank's Azure*<br>*subscription*|
|---|---|
|**Model Routing**|*LiteLLM abstraction layer behind Kong. Routes to: Azure OpenAI (primary), Anthropic*<br>*Claude via Bedrock (secondary), Llama 3 (self-hosted, sensitive data). Failover automatic.*|
|!**Mandatory Controls**|*Every LLM call through gateway must pass: (1) Prompt injection detection (Lakera Guard*<br>*API). (2) PII masking (Presidio). (3) Content safety filter (Azure AI Content Safety). (4)*<br>*Token budget enforcement. (5) Audit log write.*|
|!**Rate Limiting**|*Per-service rate limits: Credit scoring LLM = 500 RPM. Customer Copilot = 2000 RPM.*<br>*Developer Copilot = 5000 RPM. Burst: 2× sustained for 60s. Exceeding burst*→*429 +*<br>*alert.*|
|!**Audit Logging**|*100% of LLM requests logged to Splunk: service ID, model, token count, latency, safety*<br>*score, redacted prompt summary. PII-free log. Immutable append-only. Retained 7 years*<br>*(FCA).*|
|!**Cost Attribution**|*Every LLM call tagged with: cost-centre, use-case-ID, model-version, environment. FinOps*<br>*dashboard in Azure Cost Management. Weekly cost report to business owners.*|
|!**Response Caching**|*Semantic caching enabled for deterministic queries (e.g., regulatory Q&A;). Cache TTL = 4*<br>*hours. Cache hit rate target >30% to reduce costs. Privacy: cached responses never*<br>*contain PII.*|

###### ! **AI EXTENSION**

**AOB-001**

#### Agent Orchestration Blueprint

Owner: AI Architect   |   ADM Phase: C2   |   TOGAF 10 + AI-First Extension

|**Orchestration Framework**|*LangGraph (primary for stateful multi-step agents) + LangChain (for RAG chains).*<br>*AutoGen reserved for experimental multi-agent workflows pending governance maturity.*|
|---|---|
|**Integration Protocol**|*Model Context Protocol (MCP) as the standard for agent-to-enterprise-service integration.*<br>*All enterprise APIs exposed via MCP servers to agents. No direct REST calls from agents.*|
|!**Agent Identity Model**|*Each agent has a dedicated service identity in Azure Managed Identity. Agent identity is*<br>*SEPARATE from human IAM. Agent credentials are short-lived (15-min TTL). Stored in*<br>*HashiCorp Vault.*|
|!**Action Boundaries**|*Agent action boundaries defined in Agent Action Boundary Register (AABR-001-EA).*<br>*Enforced at runtime by OPA (Open Policy Agent) sidecar on each agent pod. Violations*<br>*logged and alerted.*|

|!**ATF Trust Levels**|*Agents are assigned ATF trust levels 0–4 by the AI Governance Council. Promotion*<br>*requires: demonstrated accuracy over evaluation period, security audit, clean operational*<br>*history, explicit stakeholder approval.*|
|---|---|
|!**Memory Architecture**|*Working memory: in-context (per session, ephemeral). Episodic memory: Redis (session*<br>*history, 24h TTL). Semantic memory: Weaviate vector store (persistent,*<br>*access-controlled). No unlimited persistent memory.*|
|!**Circuit Breakers**|*All agents wrapped with Resilience4j circuit breaker. If error rate >5% in 60s window*→<br>*circuit opens, agent paused, P1 alert. Prevents runaway agent cascades.*|

###### ! **AI EXTENSION**

**ASAP-001**

#### Agent-Safe API Design Pattern

Owner: Solution Architect   |   ADM Phase: C2   |   TOGAF 10 + AI-First Extension

|**Design**<br>**Requirement**|**Standard**|**Example Implementation**|
|---|---|---|
|Idempotency|All state-changing endpoints<br>MUST be idempotent (safe to<br>retry). Idempotency key in<br>header.|POST /decisions: X-Idempotency-Key: {uuid}<br>prevents duplicate credit decisions on agent retry|
|Semantic<br>Versioning in<br>Metadata|API version communicated in<br>response metadata, not just<br>URL. Allows agents to<br>self-discover deprecation.|Response header: X-API-Version: 2.3.1,<br>X-API-Deprecation-Date: 2027-01-01|
|Action<br>Documentation|Every state-changing endpoint<br>documents: action type<br>(reversible/irreversible), scope<br>of impact, human approval<br>requirement.|POST /decisions: {"reversible": false, "scope":<br>"customer-credit-file", "hitl_required": true}|
|Burst Rate Limits|Agent-specific rate limits<br>documented in API spec.<br>Differentiated from human user<br>limits. Exponential backoff<br>required.|Agent client: burst 500 RPM sustained 200 RPM.<br>Retry-After header provided on 429.|
|Webhook<br>Callbacks|Long-running operations return<br>202 + callback URL. Agents<br>register webhook endpoint. No<br>synchronous waiting.|POST /model-retraining→202 {callbackUrl:<br>"/retrain-status/{job-id}"}|
|Dry-Run Mode|Irreversible operations support<br>?dryRun=true parameter for<br>agent testing without side<br>effects.|DELETE /model-version?dryRun=true→returns<br>what would happen, no deletion|
|Audit Trail in<br>Response|Every state-changing response<br>includes audit trail ID for<br>traceability from agent action to<br>business outcome.|Response: {"auditId": "AUD-2026-FIN-048371",<br>"agentId": "AGT-OPS-001"}|

**TOGAF ADM Phase D**

### Technology Architecture

ARTIFACTS: AIB-001 · MPD-001 · ZTA-001 · FAOD-001

###### PHASE OUTPUT

#### AI Infrastructure Blueprint

Owner: Technology Architect + MLOps Lead   |   ADM Phase: D   |   TOGAF 10 + AI-First Extension

|**Component**|**Platform**|**Purpose**|**Scale Design**|**Governance Notes**|
|---|---|---|---|---|
|GPU<br>Compute<br>(Training)|Azure NC-series<br>(A100 80GB) —<br>on-demand|Model training,<br>fine-tuning,<br>large-scale batch<br>inference|Spot instances for<br>training; reserved<br>for inference|FinOps:<br>per-use-case cost<br>tagging; weekly<br>budget review|
|GPU<br>Compute<br>(Inference)|Azure NP-series (i<br>nference-optimise<br>d)|Real-time model<br>serving via KServe|Autoscaling 2–20<br>replicas; HPA on<br>GPU util|p99 latency SLA<br><200ms for credit<br>scoring|
|Inference<br>Serving|KServe on AKS<br>(v0.13)|Serve XGBoost,<br>PyTorch, ONNX<br>models|Canary<br>deployments;<br>shadow mode; A/B<br>traffic splitting|Model version<br>rollback <3min|
|Model<br>Registry|MLflow (Azure ML<br>workspace)|Versioned model<br>artifacts, metrics,<br>lineage, deployment<br>history|Git-like versioning;<br>SHA-256 model<br>hash verification|EU AI Act Art.11<br>technical<br>documentation<br>auto-generated|
|Feature Store|Feast (self-hosted<br>on AKS + Redis +<br>Azure SQL)|Real-time and batch<br>feature serving;<br>training-serving<br>consistency|Redis for online<br>serving (<5ms);<br>Parquet for offline<br>training|Training-serving<br>skew monitoring via<br>Arize AI|
|Vector<br>Database|Weaviate (AKS,<br>3-node cluster)|Semantic search,<br>RAG retrieval,<br>embedding storage|Horizontal scaling;<br>namespace-level<br>ACL|4-hour freshness<br>SLA; embedding drift<br>monitoring|
|LLM Gateway|Kong AI Gateway<br>(AKS)|Centralised LLM<br>traffic control,<br>safety, audit|Active-active HA;<br>99.9% SLA|Zero single-point-of-f<br>ailure; circuit breaker|
|Observability|Datadog (APM +<br>ML monitoring) +<br>Arize AI (model<br>monitoring) +<br>Splunk (SIEM)|Full-stack<br>observability: infra,<br>application, ML<br>model behaviour,<br>security events|15-second metric<br>resolution; 1-year<br>retention|PagerDuty<br>integration;<br>escalation to on-call<br>MLOps|
|CI/CD /<br>MLOps<br>Pipeline|Azure DevOps +<br>GitHub Actions +<br>MLflow + dbt|Automated model<br>training, validation,<br>deployment; data<br>pipeline<br>orchestration|4-eyes principle:<br>automated gate +<br>human approval at<br>Phase 6|Full pipeline<br>execution <2 hours<br>for standard models|

! **AI EXTENSION**

**ZTA-001**

#### Zero Trust AI Security Architecture

Owner: Security Architect   |   ADM Phase: D   |   TOGAF 10 + AI-First Extension

! ***AI-First Extension: Traditional Zero Trust assumes human identity. This document extends ZTA to cover AI agent identity, agentic action boundaries, model supply chain security, and AI-specific threat mitigations.***

|**ZTA Principle**<br>**for AI**|**Implementation Detail**|**Technology Controls**|
|---|---|---|
|Never Trust<br>Agent Identity|Each agent has a unique, short-lived<br>(15-min TTL) managed identity. No<br>agent inherits human user permissions.<br>Agent identity re-verified at every tool<br>call, not just session initiation.|Azure Managed Identity + HashiCorp Vault<br>dynamic secrets + OPA policy engine|
|Least-Privilege<br>Action<br>Boundaries|Agents granted minimum tool access for<br>defined task only. Tool access scoped to<br>session, not persistent. Privilege<br>escalation auto-triggers human review +<br>P1 alert.|OPA sidecar enforcement + Agent Action<br>Boundary Register (AABR-001-EA) as policy<br>source|
|Assume Breach<br>at Agent Layer|Security design assumes any agent can<br>be compromised via prompt injection or<br>jailbreak. Circuit breakers limit blast<br>radius. All agent actions reversible<br>where possible.|Lakera Guard + Azure Content Safety +<br>Resilience4j circuit breakers + dead-letter<br>queues|
|Model Supply<br>Chain<br>Verification|All model artifacts verified against<br>SHA-256 hash in MLflow before<br>deployment. SBOM (Software Bill of<br>Materials) maintained for all model<br>dependencies. Third-party models<br>undergo TPRM assessment.|Sigstore model signing + MLflow hash<br>verification + Snyk dependency scanning +<br>TPRM vendor questionnaire|
|Zero Trust Data<br>Access|RAG retrieval respects data namespace<br>ACLs. Agents cannot access data<br>outside their registered namespace. PII<br>masking applied before any LLM<br>processing.|Weaviate namespace ACLs + Presidio PII<br>masking + Azure AD Conditional Access for<br>data layer|
|Continuous<br>Verification|Security posture of deployed agents<br>re-assessed quarterly. Anomaly<br>detection on agent behaviour patterns<br>flags deviation from baseline.|Splunk UBA (User and Entity Behaviour<br>Analytics) extended to cover agent identities;<br>quarterly security audit|
|Audit<br>Immutability|All agent actions logged to immutable,<br>tamper-evident audit log (WORM<br>storage). Log integrity verified via<br>cryptographic hash chain. Accessible to<br>FCA on request.|Azure Blob WORM storage + SHA-256 hash<br>chain + Splunk SIEM; 7-year retention|

**TOGAF ADM Phase EF**

### Opportunities & Migration

ARTIFACTS: AUP-001 · ARTA-001 · ARM-001

! **AI EXTENSION**

#### AI Use Case Portfolio & Sequencing Plan

Owner: Chief Architect + AI CoE Lead   |   ADM Phase: EF   |   TOGAF 10 + AI-First Extension

|**AI Use Case**|**Business**<br>**Value**|**Strategi**<br>**c Fit**|**Risk Tier**|**Est.**<br>**Duration**|**Current**<br>**Status**|**Next**<br>**Milestone**|**Target**<br>**Live**|**Key Constraints**|
|---|---|---|---|---|---|---|---|---|
|Credit Risk AI<br>Scoring|£7.3M p.a.|HIGH|T2 HIGH|14<br>months|ARB<br>Approved<br>Q4 2025|Q1 2026<br>Phase 3|Q3 2026<br>Phase 7|Foundation use case;<br>FRIA complete;<br>external audit booked|
|Fraud<br>Detection<br>Governance<br>Uplift|£2.1M<br>(risk<br>reduction)|HIGH|T2 HIGH|3 months|Production<br>already —<br>governance<br>gap|Q1 2026<br>Governance<br>Audit|Q2 2026<br>Complete|Existing system;<br>compliance uplift only;<br>fast track|
|Customer<br>Service<br>Copilot<br>Expansion|£1.4M incr<br>emental|MEDIU<br>M|T3<br>LIMITED|6 months|Live v2.1 —<br>expand to<br>more<br>channels|Q2 2026<br>Scope<br>Extension|Q3 2026<br>Full deploy<br>ment|Low risk; accelerated<br>AIDLC track|
|Campaign<br>Targeting AI|£0.9M p.a.|MEDIU<br>M|T4<br>MINIMAL|9 months<br>(in<br>progress)|Phase 5 De<br>velopment|Already in<br>progress|Q3 2026<br>Phase 7|AIDLC-Lite track;<br>consent management<br>focus|
|Developer<br>Copilot<br>(GitHub<br>Copilot)|Productivit<br>y — unme<br>asured|MEDIU<br>M|T4<br>MINIMAL|1 month<br>(register<br>only)|Shadow AI<br>— in use|Immediate<br>registration|Done —<br>ongoing<br>monitoring|Register in ASI-001;<br>code audit policy;<br>AIDLC-Lite|
|CV Screening<br>Assistant|£0.6M<br>(efficiency)|LOW|T2 HIGH|18+<br>months|ON HOLD<br>— FRIA<br>required|FRIA Q2<br>2026|Subject to<br>FRIA|EU AI Act Annex III;<br>highest scrutiny; FRIA<br>outcome gating|
|**Sequencing Rationale**|Risk-adjusted sequencing: (1) High business value + compliance foundation first (Credit Risk). (2) Production gap-fills second (Fraud governance). (3) Low-risk progressions third. (4) High-scrutiny on hold until governance matures.|
|---|---|
|**Architecture Dependencies**|Credit Risk AI (Phase 7) is the REFERENCE IMPLEMENTATION. MLOps platform, LLM Gateway, vector database, and monitoring stack must be operational before any subsequent AI system can reach Phase 7.|

###### ! **AI EXTENSION**

#### AI-Readiness Transition Architecture

Owner: Chief Architect + Solution Architects   |   ADM Phase: EF   |   TOGAF 10 + AI-First Extension

|**Architecture State**|**Data Architecture**|**MLOps / LLMOps**|**Application Architecture**|**Agent Architecture**|**Security Architecture**|**Governance**|**AI Maturity Level**|
|---|---|---|---|---|---|---|---|
|Baseline (Q1 2026)|Data Lake (unstructured, no lineage)|No MLOps; manual training+deploy|LLM calls via direct API (no gateway)|No agent infrastructure|Perimeter only; no ZTA|Ad hoc; no ARB process|L1 (Initial) — McKinsey AI Maturity|
|Transition 1 (Q2 2026)|Lakehouse + DVC versioning; 2 domains on Mesh; OpenLineage installed|MLflow model registry; Azure ML pipelines; Feast MVP|Kong LLM Gateway live; Lakera Guard + Presidio active|LangGraph framework standard; OPA agent policy MVP|Agent identity registry; HashiCorp Vault deployed|ARB gates for AI systems; AGP published|L2 (Developing)|
|Transition 2 (Q3 2026)|Full Data Mesh (6 domains); Weaviate production; Feature Store certified|Full LLMOps monitoring: Arize AI, hallucination detection, drift alerts|RAG pipelines production-grade; MCP standard adopted for new APIs|3 production agents; ATF trust levels active; circuit breakers live|Zero Trust for agents fully implemented; MAESTRO threat model done|ISO/IEC 42001 gap assessment; EU AI Act compliance audit|L3 (Scaling)|
|Target State (Q4 2026)|Enterprise AI Data Catalog (Atlan); automated lineage; all AI data products quality-certified|Autonomous retraining MVP; unified MLOps+LLMOps platform|Agent mesh production; full MCP integration; semantic caching|Agentic workflows in production across 3 business domains|Full MAESTRO controls; quarterly zero trust review|ISO/IEC 42001 certified; EU AI Act high-risk documented|L4 (Optimising)|

**TOGAF ADM Phase G**

### Implementation Governance

ARTIFACTS: ACC-001 · ASRF-001 · ARB-001

**PHASE OUTPUT**

**ACC-001**

#### Architecture Compliance Checklist

Owner: Architecture Review Board   |   ADM Phase: G   |   TOGAF 10 + AI-First Extension

***PURPOSE: Every AI system must complete this checklist before the ARB grants Architecture Compliance Certificate (ACC). This checklist integrates TOGAF Phase G governance with AIDLC Phase 6 (Evaluation) gate requirements.***

|**Compliance**<br>**Artefact**|**AIDLC**<br>**Phase**|**Requirement**|**Evidence Provided**|**Status**|
|---|---|---|---|---|
|Use Case Charter<br>(AUC-001)|AIDLC<br>Phase 1|AI use case formally<br>defined with business<br>value hypothesis, risk<br>flags, and sponsor<br>sign-off|AUC-2026-FIN-047 v1.2 —<br>Approved 19 Feb 2026|PASS|
|Risk Classification<br>(RCS-001)|AIDLC<br>Phase 1|EU AI Act risk tier<br>assigned; governance<br>intensity set|RCS-001 — T2 HIGH RISK<br>— 22 Feb 2026|PASS|
|Feasibility Report<br>(FR-001)|AIDLC<br>Phase 2|Technical and<br>organisational feasibility<br>confirmed|FR-001 v1.0 — 5 March<br>2026|PASS|
|FRIA Completed<br>(FRIA-001)|AIDLC<br>Phase 2|Fundamental Rights<br>Impact Assessment<br>completed for T2<br>systems|FRIA-001 — Signed CRO +<br>Ethics Lead 10 Mar 2026|PASS|
|Architecture<br>Decision Records<br>(ADR)|AIDLC<br>Phase 4|All key architecture<br>decisions documented<br>with options and<br>rationale|ADR-2026-FIN-047-001 —<br>ARB Approved 2 Apr 2026|PASS|
|Constitutional AI<br>Policy (CAP)|AIDLC<br>Phase 4|Constitutional AI Policy<br>approved by AI<br>Governance Council|CAP-001 v1.0 — AI Gov<br>Council 5 Apr 2026|PASS|
|Red Team Report<br>(RTR-001)|AIDLC<br>Phase 6|All HIGH severity<br>findings resolved;<br>MEDIUM findings<br>remediated or accepted|RTR-001 — All HIGH<br>resolved 22 Apr 2026|PASS|
|Fairness Evaluation<br>(FER-001)|AIDLC<br>Phase 6|All fairness metrics<br>within thresholds;<br>external audit completed<br>for T2|FER-001 — AJI External<br>Audit 22 Apr 2026|PASS|
|Constitutional Compliance Audit (CCA)|AIDLC Phase 6|All 8 Constitutional AI Principles assessed and PASS|CCA-001 — 100% compliance 25 Apr 2026|PASS|
|AI System Inventory Registration|EA Cross-cutting|System registered in ASI-001 with complete metadata|ASI-001 — AUC-2026-FIN-047 registered|PASS|
|Agent Action Boundary Register|EA Cross-cutting|Agent boundaries documented for any agentic components|AABR-001-EA — Non-agent system; N/A|N/A|
|Data Lineage Map (DLM-001)|AIDLC Phase 3|End-to-end data lineage documented and accessible via Atlan|DLM-001 — All 7 nodes documented|PASS|
|Deployment Runbook (DRB-001)|AIDLC Phase 7|Blue/green deployment plan with rollback procedures documented|DRB-001 — MLOps Lead sign-off 30 Apr 2026|PASS|
|User Disclosure Documentation|AIDLC Phase 7|Customer-facing AI disclosure text legal-reviewed and approved|UDD-001 — Legal sign-off 2 May 2026|PASS|

|**ARB Decision**|ARCHITECTURE COMPLIANCE CERTIFICATE GRANTED — CreditRisk-XGB-v1.0. Authorised for deployment. Approval: Dr. Priya Mehta (Chief Architect), James Hartley (CRO), AI Governance Council — 5 May 2026.|
|---|---|
|**Conditions of Certificate**|1. Monthly Monitoring Reports (MMR-001) reviewed by ARB quarterly. 2. Annual external fairness audit maintained. 3. Any material model change requires new ACC application.|

#### ! **AI EXTENSION AI System Registration Form** Owner: Business Owner + AI CoE   |   ADM Phase: G   |   TOGAF 10 + AI-First Extension

|**ASRF-001**|
|---|

|**System ID (assigned by AI CoE)**|*AUC-2026-FIN-047*|
|---|---|
|**System Name**|*Credit Risk AI Scoring Model*|
|**Business Owner**|*Sarah Chen, VP Credit Risk, Retail Banking Division*|
|**Technical Owner**|*Dr. Nina Kowalski, Head of AI CoE*|
|**System Description**|*ML-based credit scoring model (XGBoost) with LLM adverse action notice generator*<br>*(GPT-4o fine-tuned). Used for automated credit decisions on UK retail lending applications*<br>*(50,000/month).*|
|**AI Category**|*ML Classification (primary) + Generative AI (adverse action narrative)*|
|**EU AI Act Risk Tier**|*TIER 2 — HIGH RISK (Annex III, Category 5b: creditworthiness assessment)*|
|**Regulated By**|*FCA, PRA, ICO, EU AI Act National Competent Authority*|
|**Personal Data Processed**|*YES — Applicant financial history, utility payment history, rent history. Processing basis:*<br>*Art. 6(1)(b) GDPR (contractual necessity).*|
|**Third-Party AI Components**|*Equifax Credit Bureau API, GPT-4o (Azure OpenAI), Lakera Guard, Microsoft Presidio*|
|**Deployment Environment**|*Production — Azure Kubernetes Service (AKS), UK South region*|
|**Date Registered**|*5 May 2026*|

**ACC Certificate Number**

*ACC-2026-FIN-047-001 (Architecture Compliance Certificate granted 5 May 2026)*

**TOGAF ADM Phase H**

### Architecture Change Mgmt

ARTIFACTS: ACR-001 · APR-001 · AIM-001

###### PHASE OUTPUT

###### ACR-001

#### Architecture Change Request

Owner: Requestor + Architecture Review Board   |   ADM Phase: H   |   TOGAF 10 + AI-First Extension

|**Change Request ID**|*ACR-2026-FIN-047-002*|
|---|---|
|**Date Submitted**|*15 June 2026*|
|**Requestor**|*Dr. Nina Kowalski, Head of AI CoE*|
|**System Affected**|*CreditRisk-XGB-v1.0 (AUC-2026-FIN-047)*|
|**Change Title**|*Integrate Real-Time Rental Bureau Data (Experian API) — Model Retraining*|
|**Change Description**|*Add Experian Rental Bureau as a new alternative data source for credit scoring. Requires:*<br>*(1) New data pipeline (rental-bureau-pipeline). (2) Feature engineering for 6 new rental*<br>*features. (3) Model retraining with new features. (4) Fairness re-evaluation (new data*<br>*source may affect demographic groups). (5) Red team re-assessment of new data pipeline.*|
|**Change Classification**|*SIGNIFICANT — New data source changes model behaviour and requires Phase 5-6*<br>*re-run for new features. Does NOT require full Phase 1-4 restart.*|
|!**AIDLC Impact Assessment**|*Phases required: Phase 3 (Data Sheet update for rental data)*→*Phase 5 (Retrain with*<br>*new features)*→*Phase 6 (Fairness re-evaluation, bias re-assessment)*→*Phase 7*<br>*(Re-deployment runbook). Estimated: 6 weeks.*|
|!**Regulatory Notification**<br>**Required**|*NO — change is additive, does not alter the fundamental model architecture or purpose.*<br>*Legal review confirms no new regulatory obligations.*|
|**Architecture Risk Assessment**|*LOW-MEDIUM: (1) New data source may reveal unexpected bias (mitigated: mandatory*<br>*re-run of FER-001). (2) Vendor reliability of Experian Rental Bureau API (mitigated:*<br>*fallback to bureau-only scoring if API down).*|
|**ARB Decision**|*APPROVED with conditions: (1) FER-001 re-run must show no degradation in fairness*<br>*metrics. (2) Rental data DPA signed before data ingestion. (3) Updated Data Sheet signed*<br>*by Data Governance Board. — ARB 22 June 2026*|

! **AI EXTENSION APR-001**

#### AI Portfolio Review Report

Owner: Chief Architect + AI CoE Lead   |   ADM Phase: H   |   TOGAF 10 + AI-First Extension

! ***AI-First Extension: Quarterly review of the full AI system portfolio. Aggregates monitoring data from all deployed systems, identifies patterns and risks, and makes portfolio-level architectural recommendations.***

> **Review Period** *Q2 2026 (April–June 2026)*

> **Portfolio Status** *5 systems in production, 1 in development (Campaign Targeting), 1 on hold (CV Screening)*

|**System**|**Tier**|**Status**|**RAG**|**Model Performance**|**Fairness Status**|**Incidents**|**Action Required**|
|---|---|---|---|---|---|---|---|
|CreditRisk-XGB-v1.0|T2|Production|GREEN|0.827 AUC (↓0.3% from baseline; within threshold)|1.7pp (threshold: 2.0pp) — WATCH|0 P0, 0 P1, 1 P2 resolved|Rental data integration approved (ACR-002); no immediate action|
|CSCopilot-v2.1|T3|Production|GREEN|4.3/5 CSAT (↑0.2 from Q1)|N/A (non-credit; no parity requirement)|0 P0, 0 P1, 2 P3 resolved|Expand to mobile channel Q3; backlog prioritised|
|FraudDet-ENS-v3.1|T2|Production|AMBER|AUROC 0.94 (stable); TPR 91% (↓2% from Q1)|N/A (anomaly detection)|1 P1 (false positive spike wk 4; resolved) — learning point|Investigate TPR degradation; retraining evaluation in progress|
|DevCopilot (GitHub Copilot)|T4|Production|GREEN|Developer satisfaction 4.6/5; code review escalations: 3/month|N/A|0 incidents|AIDLC-Lite compliance verified; shadow AI register clean|
|CampaignTarget-v0.3|T4|Development|N/A|In Phase 5 development; no production metrics|N/A|N/A|Phase 6 evaluation scheduled Q3; consent management integration on track|
|CVScreening (HOLD)|T2|On Hold|N/A|Not deployed; FRIA in progress|N/A|N/A|FRIA expected Q3 2026; proceed only if FRIA clears|

|**Portfolio-Level Risks**|1. Fraud Detection TPR degradation (AMBER) — prioritise retraining evaluation. 2. Credit Risk bias delta approaching threshold (WATCH) — increase monitoring frequency.|
|---|---|
|**Architecture Recommendations**|1. Fraud Detection model retraining approved — execute Phase 5 re-run by end Q3. 2. Strengthen fairness monitoring alerting: reduce bias delta alert threshold from 2.0pp to 1.8pp across all T2 systems.|
|**Next Portfolio Review**|Q3 2026 — 15 September 2026|

### TOGAF ADM EA Cross-Cutting Artifacts Phase EA

ARTIFACTS: EADR-001 · AABR-EA-001 · ASI-EA-001 · RAIMP-001

**EA CROSS-CUTTING EA Architecture Decision Record (AI-First)** Owner: Architecture Review Board   |   ADM Phase: EA   |   TOGAF 10 + AI-First Extension

**EADR-001**

***PURPOSE: Documents enterprise-level architecture decisions that affect multiple AI systems or the AI platform itself. Distinct from AIDLC Phase 4 ADRs (which are use-case-specific). EA ADRs are binding on all teams and permanent record.***

|**EA ADR ID**|*EADR-2026-PLAT-003*|
|---|---|
|**Title**|*LLM Provider Strategy: Multi-Provider via LiteLLM Router — Mandatory Standard*|
|**Status**|*ACCEPTED — Architecture Review Board — 15 March 2026*|
|**Decision Makers**|*Dr. Priya Mehta (Chief Architect), AI Governance Council, Technology Leadership*|
|**Context**|*GlobalBank has three AI systems consuming LLM APIs from three different providers*<br>*(Azure OpenAI, Anthropic, self-hosted Llama 3). Without standardisation, each team*<br>*manages its own client library, rate limiting, cost tracking, safety filtering, and audit logging.*<br>*This creates governance gaps, duplicated effort, and single-provider dependency risk.*|
|**Decision**|*ALL LLM API calls from GlobalBank systems MUST be routed through the Kong AI*<br>*Gateway with LiteLLM abstraction layer. Direct LLM provider API calls are prohibited.*<br>*Providers: Azure OpenAI (primary), Anthropic Claude (secondary via Bedrock), Llama 3*<br>*(self-hosted, sensitive data). Failover automated by LiteLLM.*|
|**Options Considered**|*(A) Multi-provider via LiteLLM gateway (SELECTED). (B) Azure OpenAI only (rejected:*<br>*vendor lock-in risk). (C) Self-hosted LLMs only (rejected: capability gap). (D) Each team*<br>*manages own clients (rejected: governance impossible).*|
|**Consequences (Positive)**|*Single governance point for LLM traffic. Unified audit log. Cost attribution. Safety filtering*<br>*standardised. Provider switch without code changes. 30-40% cost reduction via semantic*<br>*caching.*|
|**Consequences (Negative)**|*Gateway becomes single point of failure (mitigated: active-active HA). Migration effort for 3*<br>*existing systems (estimated: 2 sprints each). LiteLLM abstraction adds ~5ms latency*<br>*(acceptable).*|
|**Compliance Link**|*EU AI Act Article 12 (logging); NIST AI RMF GOVERN-1.7 (documentation); GlobalBank*<br>*AGP-6 (security); AGP-7 (accountability)*|
|**Review Date**|Reviewed annually or when major provider change occurs|

**EA CROSS-CUTTING**

**AABR-EA-001**

#### Enterprise Agent Action Boundary Register

Owner: AI Architect + Security Architect   |   ADM Phase: EA   |   TOGAF 10 + AI-First Extension

> **Register Purpose** Single source of truth for all AI agent action boundaries. Enforced at runtime by OPA sidecar. Updated when agents are deployed or their scope changes. Reviewed quarterly by ARB.

> **Enforcement Mechanism** OPA (Open Policy Agent) reads AABR as policy source. Agent presents signed manifest with claimed identity. OPA validates identity + requested action against AABR before execution.

|**Agent ID**|**System**|**Framework**|**Permitted Actions**|**Denied Actions**|**ATF Level / HITL**|**Hard Boundaries**|**Owner**|
|---|---|---|---|---|---|---|---|
|AGT-FIN-001|CreditRisk-XGB-v1.0|Scorer (non-agent)|bureau-api:READ, utility-api:READ, temenos-api:READ, decision-log:WRITE|ALL payment APIs, account-modify-api, customer-data-api:WRITE|ATF 1 — All decisions confirmed by core banking|None — non-agent|CRO|
|AGT-OPS-001|CSCopilot-v2.1|LangGraph stateful|crm-api:READ, kb-search:READ, ticket-api:CREATE-ONLY, order-api:READ|payment-api:ALL, account-modify-api:ALL, pii-export:ALL|ATF 3 — Notify human; refunds >£100 need HITL|No payment; no account mod; no PII export|VP Operations|
|AGT-IT-001|InfraAgent-v1.0|AutoGen sub-agent|cloudwatch:READ, github-api:PR-CREATE-ONLY, slack-api:POST|production-deploy:ALL, iam:ALL, secrets:ALL, db:WRITE|ATF 2 — All code changes need human PR approval|No prod deploys; no IAM; no secret access|CISO|
|AGT-DATA-001|DataQualityAgent-v1.0|LangChain single-agent|data-catalog:READ, quality-metrics:READ, atlan-api:TAG-WRITE|training-data:WRITE, feature-store:WRITE, s3:DELETE|ATF 2 — Quality remediations >Tier2 need approval|No training data modification; no feature deletion|Chief Data Officer|

**EA CROSS-CUTTING**

**RAIMP-001**

#### Responsible AI Maturity Programme

Owner: AI Governance Council   |   ADM Phase: EA   |   TOGAF 10 + AI-First Extension

|**Maturity Level**|**Characteristics**|**Remaining Gaps**|**GlobalBank**<br>**Timeline**|
|---|---|---|---|
|L1 — Initial|Ad hoc AI deployments; no governance;<br>reactive to incidents|Shadow AI; no bias<br>testing; no HITL; no<br>audit trail; regulatory<br>non-compliant|No programme in<br>place|
|L2 —<br>Developing|AIDLC framework adopted; AI<br>Governance Council established; AGPs<br>published; first ARB gate process|Some systems lack full<br>compliance; MLOps<br>immature; data lineage<br>partial; no zero trust|Q1 2026 —<br>GlobalBank<br>baseline|
|L3 — Scaling<br>(TARGET 2026)|Full AIDLC for all T2 systems; LLM<br>Gateway live; Data Mesh 6 domains;<br>MLOps+LLMOps unified platform; ZTA<br>for agents; ISO/IEC 42001 gap closed|Some T3/T4 systems<br>still on AIDLC-Lite;<br>autonomous retraining<br>not yet live|Q4 2026 —<br>Target state|
|L4 —<br>Optimising|Continuous governance monitoring;<br>autonomous retraining; AI portfolio<br>optimisation; proactive regulatory<br>engagement; industry-leading<br>transparency reporting|Constant vigilance<br>required; risk of<br>complacency|2027 target|

|L5 — Leading|Industry benchmark; external thought leadership; contributing to standards bodies (The Open Group, NIST, EU AI Act implementation); open-sourcing governance tooling|Resource-intensive to maintain|2028+ aspiration|

|**Current Maturity Level (May 2026)**|L2 transitioning to L3. AI Governance Council operational. AIDLC in use for 3 production systems. MLOps platform MVP live. Data Mesh 2 of 6 domains. Zero Trust scoped but not deployed.|
|---|---|
|**Target by Dec 2026**|L3 — Scaling. ISO/IEC 42001 certified. EU AI Act high-risk documentation complete. All 6 Data Mesh domains live. Full ZTA deployed. LLM Gateway enforced enterprise-wide.|
|**KPIs**|% AI systems with full AIDLC coverage (target 100% T2); Bias delta all T2 systems <2pp; HITL trigger rate within designed range; Governance cost as % of AI programme (target <15%)|

## ARTIFACT CROSS-REFERENCE BY ADM PHASE

|**ADM Phase**|**Artifact Templates in This Library**|
|---|---|
|PRE — Preliminary|EAFC-001 EA Framework Charter, AGP-001 AI Governance Principles, ESR-001<br>Stakeholder Register|
|A — Architecture Vision|SAW-001 Statement of Architecture Work, ACA-001 AI Capability Assessment,<br>AVD-001 Architecture Vision|
|B — Business<br>Architecture|ACM-001 AI Capability Map, HATB-001 Human-AI Task Boundary Map,<br>AOM-001 AI Operating Model, WIA-001 Workforce Impact Analysis|
|C1 — Data Architecture|DAB-001 Data Architecture Blueprint, DM-001 Data Mesh Domain Design,<br>VDA-001 Vector DB Architecture, FLS-001 Feature Store Lineage Spec|
|C2 — Application<br>Architecture|LLMG-001 LLM Gateway Architecture, AOB-001 Agent Orchestration Blueprint,<br>CSD-001 Copilot Stack Design, ASAP-001 Agent-Safe API Pattern|
|D — Technology<br>Architecture|AIB-001 AI Infrastructure Blueprint, MPD-001 MLOps Platform Design, ZTA-001<br>Zero Trust AI Architecture, FAOD-001 FinOps for AI Design|
|E/F — Opportunities &<br>Migration|AUP-001 AI Use Case Portfolio, ARTA-001 AI-Readiness Transition Architecture,<br>ARM-001 Architecture Roadmap|
|G — Implementation<br>Governance|ACC-001 Architecture Compliance Checklist, ASRF-001 AI System Registration<br>Form, ARB-001 ARB Decision Log|
|H — Change<br>Management|ACR-001 Architecture Change Request, APR-001 AI Portfolio Review Report,<br>AIM-001 Architecture Impact Model|
|EA — Cross-Cutting|EADR-001 EA Architecture Decision Record, AABR-EA-001 Agent Boundary<br>Register, ASI-EA-001 AI System Inventory, RAIMP-001 RAI Maturity Programme|

***LIBRARY SCOPE: 30+ EA lifecycle artifact templates across all TOGAF 10 ADM phases with AI-First extensions. Standard TOGAF artifacts are extended with*** ! ***AI-First fields covering: AI governance, Constitutional AI policy, Human-AI task boundaries, agent orchestration, zero trust for AI, and regulatory compliance. All templates shown with example content for the "GlobalBank AI Transformation Programme 2026." Replace blue italic values with your organisation's actual content.***