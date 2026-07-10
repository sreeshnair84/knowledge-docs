---
title: "Enterprise Architecture** **<u>Lifecycle Artifacts</u>"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "EA_Lifecycle_Artifact_Templates_2026.pdf"
doc_type: guide
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

##### **ARTIFACT TEMPLATE LIBRARY** 

# **Enterprise Architecture** **<u>Lifecycle Artifacts</u>** 

#### TOGAF 10 ADM · All Phases · AI-First Extensions 

Every artifact shown as a live template with field definitions and example content 

Companion to: AIDLC Enterprise Framework 2025 · EA Impact of AIDLC 2026 · AIDLC Artifact Reference Library 2026 

## **HOW TO USE THESE TEMPLATES** 

|**Blue italic text**|_Example field values filled in for a fictional "GlobalBank AI Transformation Programme_<br>_2026". Replace with your actual data._|
|---|---|
|**Field labels**|Every label is mandatory unless marked [OPTIONAL]. Mandatory fields require approval<br>before phase advancement.|
|**AI Extension fields**|Fields marked!are AI-First extensions added to TOGAF 10. These are NOT in standard<br>TOGAF 10 but are required for AIDLC-integrated EA.|
|**Artifact IDs**|Prefix format: EA-[Phase]-[Type]-[NNN]. E.g. EA-B-HATB-001 = Business Architecture,<br>Human-AI Task Boundary, first instance.|
|**Linked artifacts**|Each artifact shows upstream inputs (←) and downstream outputs (→) to trace lineage<br>through the ADM cycle.|

###### **_TOGAF 10 COMPLIANCE: All standard TOGAF 10 artifacts are included at their minimum viable form. AI-First_** 

**_extension fields (_** ! **_) are additive — they do not replace standard TOGAF artifacts. Organisations pursuing ISO/IEC 42001 or EU AI Act compliance should use AI-First fields as mandatory._** 

### **Phase PRETOGAF ADM**<sup>**Preliminary**</sup> 

ARTIFACTS: EAFC-001 · AGP-001 · ESR-001 

The Preliminary phase establishes the EA framework, governance model, and AI governance principles before any architecture work begins. In AI-first enterprises, this phase must produce a Constitutional AI commitment and establish the AI Governance Council as an EA stakeholder. 

|**EA GOVERNANCE**|**EAFC-001**|
|---|---|
|**EA Framework Charter**<br>||
|Owner: Chief Architect / CIO   |   ADM P|ase: PRE   |   TOGAF 10 + AI-First Extension|
||**CHARTER SCOPE & AUTHORITY**|
|**Organisation**|_GlobalBank plc — Digital & Technology Division_|
|**EA Framework Adopted**|_TOGAF 10 (The Open Group Architecture Standard, 10th Edition, 2022)_|
|**Charter Version / Status**|_v2.1 — Approved 15 January 2026_|
|**EA Programme Scope**|_Enterprise-wide: all business units, all technology investments >£500K, all AI systems (any_<br>_cost)_|
|**EA Authority**|_Architecture Review Board (ARB) has binding authority over all technology architecture_<br>_decisions. No AI system may be deployed without ARB sign-off at AIDLC Phase 6._|
|**Chief Architect**|_Dr. Priya Mehta, Group Chief Architect (Board-level authority)_|
|**Review Cycle**|_Annual framework review; quarterly AI governance review; immediate review on regulatory_<br>_change_|
||!**AI-FIRST EXTENSIONS**|
|!**AI Governance Council**|_Established as permanent EA stakeholder body. Composition: CRO, CPO, CISO, Chief_<br>_Data Officer, Chief Architect, External AI Ethics Advisor. Quorum: 4 of 6 required for AI_<br>_system approval._|
|!**Constitutional AI Commitment**|_GlobalBank commits to AIDLC governance for all AI systems. Constitutional AI Policy is a_<br>_mandatory output of Phase 4 (Model Design). No AI system proceeds to development_<br>_without an approved CAP._|
|!**AIDLC Integration**|_TOGAF ADM phases B, C, D incorporate AIDLC Phase Gates as mandatory Architecture_<br>_Compliance milestones. See ACC-001 for the compliance checklist._|
|!**Regulatory Alignment**|_EA framework explicitly aligned with: EU AI Act (all risk tiers), NIST AI RMF_<br>_(Govern-Map-Measure-Manage), ISO/IEC 42001, FCA operational resilience_<br>_requirements._|

**EA GOVERNANCE** 

**AGP-001** Owner: AI Governance Council   |   ADM Phase: PRE   |   TOGAF 10 + AI-First Extension **# Principle Statement Implementation Mechanism** 

#### **AI Governance Principles** 

Owner: AI Governance Council   |   ADM Phase: PRE   |   TOGAF 10 + AI-First Extension 

|A<br>G<br>P-<br>1|Human<br>Primacy|AI systems augment human judgment;<br>they do not replace it for consequential<br>decisions. Human override capability is<br>mandatory in all TIER 1–2 AI systems.|HITL controls documented in AIDLC Phase<br>4; HITL trigger rates monitored Phase 8|
|---|---|---|---|
|A<br>G<br>P-<br>2|Explainabil<br>ity by<br>Design|Explainability is an architecture<br>constraint, not a post-hoc addition. Every<br>AI system must explain its outputs in<br>terms meaningful to affected<br>stakeholders.|Explainability approach selected in Phase 4<br>ADR; tested in Phase 6 red-teaming|
|A<br>G<br>P-<br>3|Fairness &<br>Non-Discri<br>mination|AI systems must not perpetuate or<br>amplify discrimination against legally<br>protected groups. Bias assessment is<br>mandatory before and after training.|Bias Baseline in Phase 3; Fairness<br>Evaluation in Phase 6; ongoing monitoring<br>Phase 8|
|A<br>G<br>P-<br>4|Privacy by<br>Design|Personal data used in AI must be<br>processed lawfully, fairly, and with<br>purpose limitation. PII must be masked<br>before LLM processing.|Privacy Impact Assessment Phase 3; data<br>minimisation in Data Sheet; PII masking in<br>deployment|
|A|Transpare|Individuals affected by AI decisions must|User Disclosure Documentation Phase 7;|
|G<br>P-<br>5|ncy|be informed that AI was used,<br>understand the decision basis, and have<br>a clear path to challenge.|adverse action notices; appeal mechanisms|
|A|Security &|AI systems must be designed to resist|AI Threat Model Phase 4; Red Team|
|G<br>P-<br>6|Robustnes<br>s|adversarial attack, distributional shift, and<br>prompt injection. Security is assessed by<br>the red team in Phase 6.|Report Phase 6; Zero Trust enforcement<br>Phase 7|
|A<br>G<br>P-<br>7|Accountab<br>ility|A named individual owns every deployed<br>AI system. Ownership includes<br>governance compliance, performance<br>monitoring, and incident response.|AI System Inventory records owner; owner<br>signs off Phase 7 deployment runbook|
|A<br>G<br>P-<br>8|Proportion<br>ality|AI governance intensity scales with risk<br>tier. TIER 4 (minimal risk) follows<br>lightweight AIDLC; TIER 1 (unacceptable<br>risk) is prohibited.|Risk Classification (RCS-001) determines<br>AIDLC governance track at Phase 1|

**EA GOVERNANCE** 

**ESR-001** 

#### **EA Stakeholder Register** 

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

### **TOGAF ADM Architecture Vision Phase A** 

ARTIFACTS: SAW-001 · ACA-001 · AVD-001 

###### **PHASE OUTPUT** 

###### **SAW-001** 

#### **Statement of Architecture Work** 

Owner: Chief Architect   |   ADM Phase: A   |   TOGAF 10 + AI-First Extension 

###### **WORK DEFINITION** 

|**Architecture Work Title**|_GlobalBank AI Transformation Programme — Phase 1: Core Banking AI Integration_|
|---|---|
|**Sponsoring Executive**|_Marcus Chen, Chief Operating Officer_|
|**Architecture Work Description**|_Design and govern the enterprise architecture for integrating AI systems into core banking_<br>_operations: credit risk scoring, customer service automation, fraud detection._<br>_Encompasses 5 AI use cases (see ACA-001), full AIDLC lifecycle governance, and_<br>_technology platform modernisation to support AI at scale._|
|**Scope**|_IN SCOPE: UK Retail Banking division, core banking AI systems, data architecture for AI,_<br>_MLOps platform, agent architecture. OUT OF SCOPE: International operations (Year 2),_<br>_mortgage AI (separate programme), investment banking (separate governance)._|
|**Constraints**|_1. EU AI Act compliance required for all credit, HR and fraud systems. 2. FCA operational_<br>_resilience rules apply. 3. Core banking system (Temenos) cannot be replaced in this_<br>_programme. 4. Maximum cloud budget: £2.8M/year._|
|**Assumptions**|_Alternative data partners (utility, rent) contracts will be signed by Q2 2026. Azure ML_<br>_platform will remain enterprise standard for ML workloads. LLM provider contracts_<br>_available under existing Microsoft EA._|
|**Deliverables**|_Architecture Vision (AVD-001), Business Architecture (Phase B), Data Architecture (Phase_<br>_C1), Application Architecture (Phase C2), Technology Architecture (Phase D), Migration_<br>_Plan (Phase F), Governance Framework (Phase G)_|
|**Timeline**|_Phase A-D: Q1 2026 (12 weeks). Phase E-F: Q2 2026 (8 weeks). Phase G onwards:_<br>_ongoing._|
|**Approved By**|_Dr. Priya Mehta (Chief Architect) · Marcus Chen (COO) · AI Governance Council — 22_<br>_January 2026_|

! **AI EXTENSION AI Capability Assessment** Owner: Chief Architect + AI Lead   |   ADM Phase: A   |   TOGAF 10 + AI-First Extension 

**ACA-001** 

! **_AI-First Extension: This artifact is not in standard TOGAF 10. It provides the AI capability inventory and maturity baseline that drives all subsequent AI-impacted architecture decisions._** 

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
|!**AI Maturity Baseline**||_McKinsey AI Matur_<br>_Production MLOps_<br>_end 2026._|_ity Level 2 of 5_<br>_immature. Gov_|_(Developing). Proo_<br>_ernance framewor_|_f-of-conce_<br>_k nascent._|_pt capability exists._<br>_Target: Level 3 (Scaling) by_|
|!**Shadow AI Exposure**||_27 unregistered AI_<br>_various ChatGPT i_<br>_within 30 days._|_tools identified_<br>_ntegrations). Al_|_in SaaS survey (G_<br>_l to be assessed an_|_itHub Copi_<br>_d register_|_lot, Grammarly, Otter.ai,_<br>_ed in AI System Inventory_|
|!**Architecture Readine**|**ss**|_Data architecture:_<br>_enterprise platform_<br>_LOW (no zero trust_|_MEDIUM (data_<br>_). Application:_<br>_). Governance:_|_lake exists, lineage_<br>_MEDIUM (microser_<br>_LOW (nascent)._|_immature_<br>_vices parti_|_). MLOps: LOW (no_<br>_ally adopted). Security:_|

|**PHASE OUTPUT**<br>**Architecture Vision Do**<br>Owner: Chief Architect   |   ADM Phas|**AVD-001**<br>**cument**<br>e: A   |   TOGAF 10 + AI-First Extension|
|---|---|
|**Vision Statement**|_By end 2026, GlobalBank will operate a trusted, explainable, and regulatorily compliant AI_<br>_capability that delivers £7.3M+ annual value from credit risk automation, reduces manual_<br>_review by 35%, and serves as a model for responsible AI in UK financial services._|
|**Target Architecture Descriptor**|_AI-First Enterprise Architecture: 7-layer reference stack (L1 GPU Infrastructure_→_L7_<br>_Business & Governance), AIDLC lifecycle for all AI systems, Data Mesh for AI data_<br>_products, Zero Trust for AI agents, TOGAF 10 ADM as the governance backbone._|
|**Key Architecture Principles**|_1. Architecture before AI (no AI before the foundation is ready). 2. Data as first-class_<br>_product. 3. Explainability by design. 4. Zero Trust at every layer. 5. Governance_<br>_proportionate to risk. 6. Open standards over vendor lock-in._|
|**Business Outcomes**|_60-second credit decisions (vs 72 hours), <5% false rejection rate (vs 12%), 100% adverse_<br>_action explanation coverage, £7.3M ROI Year 1, ISO/IEC 42001 certification Q4 2026._|
|**Architecture Risks**|_1. Legacy Temenos integration complexity (HIGH). 2. EU AI Act compliance timeline_<br>_(HIGH). 3. Alternative data vendor contracts (MEDIUM). 4. MLOps talent gap (MEDIUM)._<br>_5. Shadow AI exposure (LOW-MEDIUM)._|
|**ARB Approved**|_5 February 2026 — Architecture Review Board unanimous approval_|

### **TOGAF ADM Business Architecture Phase B** 

ARTIFACTS: ACM-001 · HATB-001 · AOM-001 · WIA-001 

###### ! **AI EXTENSION** 

**ACM-001** 

#### **AI Capability Map** 

Owner: Enterprise Architect + Business Analysts   |   ADM Phase: B   |   TOGAF 10 + AI-First Extension 

! **_AI-First Extension: Extends the standard TOGAF Business Capability Map to include AI capabilities, their risk classification, AIDLC status, and Human-AI task boundary designation._** 

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

#### **Human-AI Task Boundary Map** 

Owner: Business Architect + Ethics Lead   |   ADM Phase: B   |   TOGAF 10 + AI-First Extension 

! **_AI-First Extension: Documents the precise boundary between human and AI decision authority for every AI-impacted business process. Mandatory for all TIER 1–2 systems. This artifact is reviewed by the AI Governance Council and forms the basis for HITL design in AIDLC Phase 4._** 

**Process Step Human-Only AI-Only Tasks HITL Trigger & Human Role Decision Tasks SLA** 

|Credit<br>Application<br>Intake|Capture<br>applicant data;<br>verify identity|AI validates data<br>completeness and<br>identity (automated)|Human if identity verification<br>fails (manual override required)|Instant /<br>5 min|
|---|---|---|---|---|
|Initial Credit|N/A (fully|AI scores|Human review for ALL|<60|
|Score|automated for<br>T4 decisions)|application<br>(XGBoost model);<br>assigns confidence|applications <70% confidence<br>(~8% of volume)|seconds<br>/ 4 hours<br>(HITL)|
|Adverse Action|N/A|AI generates|Human verifies reason codes|2 min /|
|Notice||SHAP-grounded<br>rejection notice<br>(LLM)|before delivery if flagged by<br>SHAP-LLM mismatch check|30 min (if<br>flag)|
|Customer<br>Appeal|Receive appeal;<br>notify AI<br>Governance<br>Council|AI provides case<br>summary and<br>supporting SHAP<br>evidence|Human credit analyst makes<br>FINAL determination on ALL<br>appeals|5<br>business<br>days|
|Bias Alert<br>Response|Receive alert<br>from monitoring<br>system; notify<br>CRO|AI produces<br>demographic parity<br>report automatically|Human (Ethics Lead + CRO)<br>decides remediation action|24 hours|
|Model<br>Retirement<br>Decision|N/A|AI drift monitoring<br>flags retirement<br>trigger threshold|Human (ARB + AI Governance<br>Council) approves retirement<br>timeline|30-day<br>process|
|**HITL Design Principles**|1. Every co<br>are set con<br>deploymen|nsequential AI decisio<br>servatively (err toward<br>t. 4. HITL effectiveness|n has a human escalation path. 2.<br>HITL). 3. HITL queue capacity is<br>is monitored monthly.|Confidence thresholds<br>resourced before|
|**Approval Authority**|HATB-001<br>Governanc|approved by: Dr. Amar<br>e Council — 1 March 2|a Diallo (Ethics Lead), James Ha<br>026.|rtley (CRO), AI|

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

### **TOGAF ADM Data Architecture Phase C1** 

ARTIFACTS: DAB-001 · DM-001 · VDA-001 · FLS-001 

**PHASE OUTPUT DAB-001 Data Architecture Blueprint** Owner: Data Architect   |   ADM Phase: C1   |   TOGAF 10 + AI-First Extension 

|**Data Architecture Pattern**|_Data Lakehouse (Apache Iceberg on Azure Data Lake Gen2) + Data Mesh domain_<br>_ownership + Feature Store for ML serving consistency_|
|---|---|
|**Primary Platform**|_Azure Data Lake Gen2 (storage) + Azure Databricks (Iceberg/Delta) + dbt_<br>_(transformations) + Azure Event Hubs (streaming)_|
|**Data Domains**|_6 domains: Credit & Risk, Customer, Operations, Marketing, HR, Enterprise (shared_<br>_reference data). Each domain owns its AI training data and RAG knowledge base._|
|**AI Data Products**|_Each domain publishes: (1) Training datasets (DVC-versioned, quality-certified). (2)_<br>_Feature Store features (Feast). (3) RAG knowledge base (domain-specific vector_<br>_namespace in Weaviate)._|
|!**Lineage Standard**|_OpenLineage (Apache Airflow + dbt plugins). All data transformations emit lineage events._<br>_Lineage graph stored in Apache Atlas. Queryable via Atlan data catalog. EU AI Act Article_<br>_10 evidence package auto-generated._|
|!**Quality Gates**|_Data products must achieve quality score_≥_90% (completeness, accuracy, freshness,_<br>_consistency) before certification for AI training use. Quality scores published in Atlan_<br>_catalog._|
|!**PII Handling**|_All PII fields tagged in Atlan. PII masking enforced at Feature Store and RAG retrieval_<br>_layers via Microsoft Presidio. No PII may flow into LLM prompts unmasked._|
|!**Freshness SLAs**|_Training data refresh: weekly. Feature Store: 15-minute maximum lag. RAG knowledge_<br>_bases: 4-hour maximum lag. Inference logs: real-time. Monitoring dashboards: 5-minute_<br>_lag._|

! **AI EXTENSION DM-001** 

#### **Data Mesh Domain Design** 

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

#### **Vector Database Architecture** 

Owner: Data Architect + AI Architect   |   ADM Phase: C1   |   TOGAF 10 + AI-First Extension 

|**Platform Selected**|_Weaviate (self-hosted on AKS) — selected over Pinecone (lock-in risk) and Azure AI_<br>_Search (limited OSS portability). See ADR: EA-C1-VDA-001._|
|---|---|
|**Embedding Models**|_text-embedding-3-large (OpenAI) for knowledge bases; domain-specific fine-tuned_<br>_E5-large for credit/regulatory content. All models versioned in MLflow._|
|**Namespace Architecture**|_One Weaviate namespace per domain-use-case: credit-kb, customer-kb, ops-kb,_<br>_regulatory-kb (shared), code-kb (IT). Namespace isolation enforces data product_<br>_boundaries._|
|!**Access Control**|_Weaviate API key per consuming service. Agent access requires scoped API key_<br>_registered in HashiCorp Vault. No cross-namespace access without ARB approval._|
|!**Freshness SLA**|_credit-kb:_≤_4 hours. regulatory-kb:_≤_1 hour (regulatory changes are time-sensitive). All_<br>_others:_≤_8 hours. Freshness monitored in Datadog; breach triggers P2 alert._|
|!**Embedding Drift Monitoring**|_Weekly cosine similarity baseline check across namespaces. >10% average cosine drift_<br>_triggers embedding model review and potential re-embedding. Monitored via Arize AI._|
|!**GDPR Deletion Capability**|_Weaviate supports object-level deletion by UUID. DPO-triggered PII deletion workflows_<br>_documented and tested. 72-hour deletion SLA from subject access request._|
|!**EU AI Act Evidencing**|_Embedding model versions stored in MLflow with training data provenance. Namespace_<br>_contents versioned with DVC. Full lineage from source document to vector queryable via_<br>_OpenLineage._|

### **TOGAF ADM Application Architecture Phase C2** 

ARTIFACTS: LLMG-001 · AOB-001 · CSD-001 · ASAP-001 

###### ! **AI EXTENSION** 

**LLMG-001** 

#### **LLM Gateway Architecture** 

Owner: AI Architect + Security Architect   |   ADM Phase: C2   |   TOGAF 10 + AI-First Extension 

! **_AI-First Extension: The LLM Gateway is the mandatory control plane for ALL LLM API calls within GlobalBank. No LLM call may bypass the gateway. This is the application-layer equivalent of the network security perimeter for AI traffic._** 

|**Platform**|_Kong AI Gateway (enterprise licence) — deployed on AKS in GlobalBank's Azure_<br>_subscription_|
|---|---|
|**Model Routing**|_LiteLLM abstraction layer behind Kong. Routes to: Azure OpenAI (primary), Anthropic_<br>_Claude via Bedrock (secondary), Llama 3 (self-hosted, sensitive data). Failover automatic._|
|!**Mandatory Controls**|_Every LLM call through gateway must pass: (1) Prompt injection detection (Lakera Guard_<br>_API). (2) PII masking (Presidio). (3) Content safety filter (Azure AI Content Safety). (4)_<br>_Token budget enforcement. (5) Audit log write._|
|!**Rate Limiting**|_Per-service rate limits: Credit scoring LLM = 500 RPM. Customer Copilot = 2000 RPM._<br>_Developer Copilot = 5000 RPM. Burst: 2× sustained for 60s. Exceeding burst_→_429 +_<br>_alert._|
|!**Audit Logging**|_100% of LLM requests logged to Splunk: service ID, model, token count, latency, safety_<br>_score, redacted prompt summary. PII-free log. Immutable append-only. Retained 7 years_<br>_(FCA)._|
|!**Cost Attribution**|_Every LLM call tagged with: cost-centre, use-case-ID, model-version, environment. FinOps_<br>_dashboard in Azure Cost Management. Weekly cost report to business owners._|
|!**Response Caching**|_Semantic caching enabled for deterministic queries (e.g., regulatory Q&A;). Cache TTL = 4_<br>_hours. Cache hit rate target >30% to reduce costs. Privacy: cached responses never_<br>_contain PII._|

###### ! **AI EXTENSION** 

**AOB-001** 

#### **Agent Orchestration Blueprint** 

Owner: AI Architect   |   ADM Phase: C2   |   TOGAF 10 + AI-First Extension 

|**Orchestration Framework**|_LangGraph (primary for stateful multi-step agents) + LangChain (for RAG chains)._<br>_AutoGen reserved for experimental multi-agent workflows pending governance maturity._|
|---|---|
|**Integration Protocol**|_Model Context Protocol (MCP) as the standard for agent-to-enterprise-service integration._<br>_All enterprise APIs exposed via MCP servers to agents. No direct REST calls from agents._|
|!**Agent Identity Model**|_Each agent has a dedicated service identity in Azure Managed Identity. Agent identity is_<br>_SEPARATE from human IAM. Agent credentials are short-lived (15-min TTL). Stored in_<br>_HashiCorp Vault._|
|!**Action Boundaries**|_Agent action boundaries defined in Agent Action Boundary Register (AABR-001-EA)._<br>_Enforced at runtime by OPA (Open Policy Agent) sidecar on each agent pod. Violations_<br>_logged and alerted._|

|!**ATF Trust Levels**|_Agents are assigned ATF trust levels 0–4 by the AI Governance Council. Promotion_<br>_requires: demonstrated accuracy over evaluation period, security audit, clean operational_<br>_history, explicit stakeholder approval._|
|---|---|
|!**Memory Architecture**|_Working memory: in-context (per session, ephemeral). Episodic memory: Redis (session_<br>_history, 24h TTL). Semantic memory: Weaviate vector store (persistent,_<br>_access-controlled). No unlimited persistent memory._|
|!**Circuit Breakers**|_All agents wrapped with Resilience4j circuit breaker. If error rate >5% in 60s window_→<br>_circuit opens, agent paused, P1 alert. Prevents runaway agent cascades._|

###### ! **AI EXTENSION** 

**ASAP-001** 

#### **Agent-Safe API Design Pattern** 

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

### **Technology Architecture** 

ARTIFACTS: AIB-001 · MPD-001 · ZTA-001 · FAOD-001 

###### **PHASE OUTPUT** 

#### **AI Infrastructure Blueprint** 

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

#### **Zero Trust AI Security Architecture** 

Owner: Security Architect   |   ADM Phase: D   |   TOGAF 10 + AI-First Extension 

! **_AI-First Extension: Traditional Zero Trust assumes human identity. This document extends ZTA to cover AI agent identity, agentic action boundaries, model supply chain security, and AI-specific threat mitigations._** 

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

### **Opportunities & Migration** 

ARTIFACTS: AUP-001 · ARTA-001 · ARM-001 

! **AI EXTENSION** 

#### **AI Use Case Portfolio & Sequencing Plan** 

Owner: Chief Architect + AI CoE Lead   |   ADM Phase: EF   |   TOGAF 10 + AI-First Extension 

|**AI Use Case**|**Business**<br>**Value**|**Strategi**<br>**c Fit**|**Risk Tier**|**Est.**<br>**Duration**|**Current**<br>**Status**|**Next**<br>**Milestone**|**Target**<br>**Live**|**Key Constraints**|
|---|---|---|---|---|---|---|---|---|
|Credit Risk AI<br>Scoring|£7.3M p.a.|HIGH|T2 HIGH|14<br>months|ARB<br>Approved<br>Q4 2025|Q1 2026<br>Phase 3|Q3 2026<br>Phase 7|Foundation use case;<br>FRIA complete;<br>external audit booked|
|Fraud<br>Detection<br>Governance<br>Uplift|£2.1M<br>(risk<br>reduction)|HIGH|T2 HIGH|3 months|Production<br>already —<br>governance<br>gap|Q1 2026<br>Governance<br>Audit|Q2 2026<br>Complete|Existing system;<br>compliance uplift only;<br>fast track|
|Customer<br>Service<br>Copilot<br>Expansion|£1.4M incr<br>emental|MEDIU<br>M|T3<br>LIMITED|6 months|Live v2.1 —<br>expand to<br>more<br>channels|Q2 2026<br>Scope<br>Extension|Q3 2026<br>Full deploy<br>ment|Low risk; accelerated<br>AIDLC track|
|Campaign<br>Targeting AI|£0.9M p.a.|MEDIU<br>M|T4<br>MINIMAL|9 months<br>(in<br>progress)|Phase 5 De<br>velopment|Already in<br>progress|Q3 2026<br>Phase 7|AIDLC-Lite track;<br>consent management<br>focus|
|Developer<br>Copilot<br>(GitHub<br>Copilot)|Productivit<br>y — unme<br>asured|MEDIU<br>M|T4<br>MINIMAL|1 month<br>(register<br>only)|Shadow AI<br>— in use|Immediate<br>registration|Done —<br>ongoing<br>monitoring|Register in ASI-001;<br>code audit policy;<br>AIDLC-Lite|
|CV Screening<br>Assistant|£0.6M<br>(efficiency)|LOW|T2 HIGH|18+<br>months|ON HOLD<br>— FRIA<br>required|FRIA Q2<br>2026|Subject to<br>FRIA|EU AI Act Annex III;<br>highest scrutiny; FRIA<br>outcome gating|
|**Sequencing**|**Rationale**||Risk-adjusted<br>Risk). (2) Pro<br>(4) High-scrut|sequencing:<br>duction gap-f<br>iny on hold u|(1) High busine<br>ills second (Fra<br>ntil governance|ss value + co<br>ud governance<br>matures.|mpliance foun<br>). (3) Low-risk|dation first (Credit<br>progressions third.|
|**Architecture**|**Dependencies**||Credit Risk AI<br>Gateway, vec<br>subsequent A|(Phase 7) is<br>tor database<br>I system can|the REFEREN<br>, and monitoring<br>reach Phase 7.|CE IMPLEMEN<br>stack must be<br>|TATION. ML<br>operational|Ops platform, LLM<br>before any|

###### ! **AI EXTENSION** 

#### **AI-Readiness Transition Architecture** 

Owner: Chief Architect + Solution Architects   |   ADM Phase: EF   |   TOGAF 10 + AI-First Extension 

|**Architectur**|**Data**|**MLOps /**|**Application**|**Agent Arch**|**Security Ar**|**Governanc**|**AI Ma**|
|---|---|---|---|---|---|---|---|
|**e State**|**Architecture**|**LLMOps**|**Architecture**|**itecture**|**chitecture**|**e**|**turity**|
||||||||**Level**|

|Baseline<br>(Q1 2026)|Data Lake<br>(unstructured,<br>no lineage)|No MLOps;<br>manual trainin<br>g+deploy|LLM calls via<br>direct API (no<br>gateway)|No agent inf<br>rastructure|Perimeter<br>only; no<br>ZTA|Ad hoc; no<br>ARB<br>process|L1 (In<br>itial)<br>— Mc<br>Kinse<br>y AI<br>Matur<br>ity|
|---|---|---|---|---|---|---|---|
|Transition 1<br>(Q2 2026)|Lakehouse +<br>DVC<br>versioning; 2<br>domains on<br>Mesh;<br>OpenLineage<br>installed|MLflow model<br>registry; Azure<br>ML pipelines;<br>Feast MVP|Kong LLM<br>Gateway live;<br>Lakera Guard<br>+ Presidio<br>active|LangGraph<br>framework<br>standard;<br>OPA agent<br>policy MVP|Agent<br>identity<br>registry;<br>HashiCorp<br>Vault<br>deployed|ARB gates<br>for AI<br>systems;<br>AGP<br>published|L2 (D<br>evelo<br>ping)|
|Transition 2<br>(Q3 2026)|Full Data<br>Mesh (6<br>domains);<br>Weaviate<br>production;<br>Feature Store<br>certified|Full LLMOps<br>monitoring:<br>Arize AI,<br>hallucination<br>detection, drift<br>alerts|RAG pipelines<br>production-gra<br>de; MCP<br>standard<br>adopted for<br>new APIs|3 production<br>agents; ATF<br>trust levels<br>active;<br>circuit<br>breakers<br>live|Zero Trust<br>for agents<br>fully implem<br>ented;<br>MAESTRO<br>threat model<br>done|ISO/IEC<br>42001 gap a<br>ssessment;<br>EU AI Act<br>compliance<br>audit|L3 (S<br>caling<br>)|
|Target State<br>(Q4 2026)|Enterprise AI<br>Data Catalog<br>(Atlan);<br>automated<br>lineage; all AI<br>data products<br>quality-certifie<br>d|Autonomous<br>retraining<br>MVP; unified<br>MLOps+LLMO<br>ps platform|Agent mesh<br>production; full<br>MCP<br>integration;<br>semantic<br>caching|Agentic<br>workflows in<br>production<br>across 3<br>business<br>domains|Full<br>MAESTRO<br>controls;<br>quarterly<br>zero trust<br>review|ISO/IEC<br>42001<br>certified; EU<br>AI Act<br>high-risk<br>documented|L4 (O<br>ptimis<br>ing)|

**TOGAF ADM Phase G** 

### **Implementation Governance** 

ARTIFACTS: ACC-001 · ASRF-001 · ARB-001 

**PHASE OUTPUT** 

**ACC-001** 

#### **Architecture Compliance Checklist** 

Owner: Architecture Review Board   |   ADM Phase: G   |   TOGAF 10 + AI-First Extension 

**_PURPOSE: Every AI system must complete this checklist before the ARB grants Architecture Compliance Certificate (ACC). This checklist integrates TOGAF Phase G governance with AIDLC Phase 6 (Evaluation) gate requirements._** 

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
|Constitutional|AIDLC|All 8 Constitutional AI|CCA-001 — 100%|PASS|
|Compliance Audit<br>(CCA)|Phase 6|Principles assessed and<br>PASS|compliance 25 Apr 2026||

|AI System Inventory<br>Registration|EA Cross-c<br>utting|System registered in<br>ASI-001 with complete<br>metadata|ASI-001 —<br>AUC-2026-FIN-047<br>registered|PASS|
|---|---|---|---|---|
|Agent Action<br>Boundary Register|EA Cross-c<br>utting|Agent boundaries<br>documented for any<br>agentic components|AABR-001-EA — Non-agent<br>system; N/A|N/A|
|Data Lineage Map<br>(DLM-001)|AIDLC<br>Phase 3|End-to-end data lineage<br>documented and<br>accessible via Atlan|DLM-001 — All 7 nodes<br>documented|PASS|
|Deployment<br>Runbook (DRB-001)|AIDLC<br>Phase 7|Blue/green deployment<br>plan with rollback<br>procedures documented|DRB-001 — MLOps Lead<br>sign-off 30 Apr 2026|PASS|
|User Disclosure<br>Documentation|AIDLC<br>Phase 7|Customer-facing AI<br>disclosure text<br>legal-reviewed and<br>approved|UDD-001 — Legal sign-off 2<br>May 2026|PASS|
|**ARB Decision**|ARCHITEC<br>Authorised<br>(CRO), AI|TURE COMPLIANCE CE<br>for deployment. Approval:<br>Governance Council — 5 M|RTIFICATE GRANTED — Cre<br>Dr. Priya Mehta (Chief Archite<br>ay 2026.|ditRisk-XGB-v1.0.<br>ct), James Hartley|
|**Conditions of Certificate**|1. Monthly<br>fairness au|Monitoring Reports (MMR-<br>dit maintained. 3. Any mat|001) reviewed by ARB quarter<br>erial model change requires ne|ly. 2. Annual external<br>w ACC application.|

#### ! **AI EXTENSION AI System Registration Form** Owner: Business Owner + AI CoE   |   ADM Phase: G   |   TOGAF 10 + AI-First Extension 

|**ASRF-001**|
|---|

|**System ID (assigned by AI CoE)**|_AUC-2026-FIN-047_|
|---|---|
|**System Name**|_Credit Risk AI Scoring Model_|
|**Business Owner**|_Sarah Chen, VP Credit Risk, Retail Banking Division_|
|**Technical Owner**|_Dr. Nina Kowalski, Head of AI CoE_|
|**System Description**|_ML-based credit scoring model (XGBoost) with LLM adverse action notice generator_<br>_(GPT-4o fine-tuned). Used for automated credit decisions on UK retail lending applications_<br>_(50,000/month)._|
|**AI Category**|_ML Classification (primary) + Generative AI (adverse action narrative)_|
|**EU AI Act Risk Tier**|_TIER 2 — HIGH RISK (Annex III, Category 5b: creditworthiness assessment)_|
|**Regulated By**|_FCA, PRA, ICO, EU AI Act National Competent Authority_|
|**Personal Data Processed**|_YES — Applicant financial history, utility payment history, rent history. Processing basis:_<br>_Art. 6(1)(b) GDPR (contractual necessity)._|
|**Third-Party AI Components**|_Equifax Credit Bureau API, GPT-4o (Azure OpenAI), Lakera Guard, Microsoft Presidio_|
|**Deployment Environment**|_Production — Azure Kubernetes Service (AKS), UK South region_|
|**Date Registered**|_5 May 2026_|

**ACC Certificate Number** 

_ACC-2026-FIN-047-001 (Architecture Compliance Certificate granted 5 May 2026)_ 

**TOGAF ADM Phase H** 

### **Architecture Change Mgmt** 

ARTIFACTS: ACR-001 · APR-001 · AIM-001 

###### **PHASE OUTPUT** 

###### **ACR-001** 

#### **Architecture Change Request** 

Owner: Requestor + Architecture Review Board   |   ADM Phase: H   |   TOGAF 10 + AI-First Extension 

|**Change Request ID**|_ACR-2026-FIN-047-002_|
|---|---|
|**Date Submitted**|_15 June 2026_|
|**Requestor**|_Dr. Nina Kowalski, Head of AI CoE_|
|**System Affected**|_CreditRisk-XGB-v1.0 (AUC-2026-FIN-047)_|
|**Change Title**|_Integrate Real-Time Rental Bureau Data (Experian API) — Model Retraining_|
|**Change Description**|_Add Experian Rental Bureau as a new alternative data source for credit scoring. Requires:_<br>_(1) New data pipeline (rental-bureau-pipeline). (2) Feature engineering for 6 new rental_<br>_features. (3) Model retraining with new features. (4) Fairness re-evaluation (new data_<br>_source may affect demographic groups). (5) Red team re-assessment of new data pipeline._|
|**Change Classification**|_SIGNIFICANT — New data source changes model behaviour and requires Phase 5-6_<br>_re-run for new features. Does NOT require full Phase 1-4 restart._|
|!**AIDLC Impact Assessment**|_Phases required: Phase 3 (Data Sheet update for rental data)_→_Phase 5 (Retrain with_<br>_new features)_→_Phase 6 (Fairness re-evaluation, bias re-assessment)_→_Phase 7_<br>_(Re-deployment runbook). Estimated: 6 weeks._|
|!**Regulatory Notification**<br>**Required**|_NO — change is additive, does not alter the fundamental model architecture or purpose._<br>_Legal review confirms no new regulatory obligations._|
|**Architecture Risk Assessment**|_LOW-MEDIUM: (1) New data source may reveal unexpected bias (mitigated: mandatory_<br>_re-run of FER-001). (2) Vendor reliability of Experian Rental Bureau API (mitigated:_<br>_fallback to bureau-only scoring if API down)._|
|**ARB Decision**|_APPROVED with conditions: (1) FER-001 re-run must show no degradation in fairness_<br>_metrics. (2) Rental data DPA signed before data ingestion. (3) Updated Data Sheet signed_<br>_by Data Governance Board. — ARB 22 June 2026_|

! **AI EXTENSION APR-001** 

#### **AI Portfolio Review Report** 

Owner: Chief Architect + AI CoE Lead   |   ADM Phase: H   |   TOGAF 10 + AI-First Extension 

! **_AI-First Extension: Quarterly review of the full AI system portfolio. Aggregates monitoring data from all deployed systems, identifies patterns and risks, and makes portfolio-level architectural recommendations._** 

> **Review Period** _Q2 2026 (April–June 2026)_ 

> **Portfolio Status** _5 systems in production, 1 in development (Campaign Targeting), 1 on hold (CV Screening)_ **System Ti Status RA Model Fairness Incidents Action Required er G Performance Status** 

|CreditRisk-XGB<br>-v1.0|T2|Production|GR<br>EE<br>N|0.827 AUC (↓0.3%<br>from baseline;<br>within threshold)|1.7pp<br>(threshold:<br>2.0pp) —<br>WATCH|0 P0, 0 P1, 1 P2<br>resolved|Rental data<br>integration approved<br>(ACR-002); no<br>immediate action|
|---|---|---|---|---|---|---|---|
|CSCopilot-v2.1|T3|Production|GR<br>EE<br>N|4.3/5 CSAT (↑0.2<br>from Q1)|N/A<br>(non-credit;<br>no parity<br>requirement)|0 P0, 0 P1, 2 P3<br>resolved|Expand to mobile<br>channel Q3; backlog<br>prioritised|
|FraudDet-ENS-<br>v3.1|T2|Production|AM<br>BE<br>R|AUROC 0.94<br>(stable); TPR 91%<br>(↓2% from Q1)|N/A (anomaly<br>detection)|1 P1 (false positive<br>spike wk 4;<br>resolved) —<br>learning point|Investigate TPR<br>degradation;<br>retraining evaluation<br>in progress|
|DevCopilot<br>(GitHub Copilot)|T4|Production|GR<br>EE<br>N|Developer<br>satisfaction 4.6/5;<br>code review<br>escalations:<br>3/month|N/A|0 incidents|AIDLC-Lite<br>compliance verified;<br>shadow AI register<br>clean|
|CampaignTarge<br>t-v0.3|T4|Developm<br>ent|N/A|In Phase 5<br>development; no<br>production metrics|N/A|N/A|Phase 6 evaluation<br>scheduled Q3;<br>consent management<br>integration on track|
|CVScreening<br>(HOLD)|T2|On Hold|N/A|Not deployed;<br>FRIA in progress|N/A|N/A|FRIA expected Q3<br>2026; proceed only if<br>FRIA clears|
|**Portfolio-Level Risk**|**s**||1. Fraud<br>bias delt|Det TPR degradation<br>a approaching thresh|(AMBER) — pri<br>old (WATCH) —|oritise retraining eval<br>increase monitoring|uation. 2. Credit Risk<br>frequency.|
|**Architecture Recom**|**mend**|**ations**|1. Fraud<br>Strength<br>1.8pp ac|Detection model retr<br>en fairness monitorin<br>ross all T2 systems.|aining approved<br>g alerting: reduce|— execute Phase 5 r<br>bias delta alert thre|e-run by end Q3. 2.<br>shold from 2.0pp to|
|**Next Portfolio Revie**|**w**||Q3 2026|— 15 September 20|26|||

### **TOGAF ADM EA Cross-Cutting Artifacts Phase EA** 

ARTIFACTS: EADR-001 · AABR-EA-001 · ASI-EA-001 · RAIMP-001 

**EA CROSS-CUTTING EA Architecture Decision Record (AI-First)** Owner: Architecture Review Board   |   ADM Phase: EA   |   TOGAF 10 + AI-First Extension 

**EADR-001** 

**_PURPOSE: Documents enterprise-level architecture decisions that affect multiple AI systems or the AI platform itself. Distinct from AIDLC Phase 4 ADRs (which are use-case-specific). EA ADRs are binding on all teams and permanent record._** 

|**EA ADR ID**|_EADR-2026-PLAT-003_|
|---|---|
|**Title**|_LLM Provider Strategy: Multi-Provider via LiteLLM Router — Mandatory Standard_|
|**Status**|_ACCEPTED — Architecture Review Board — 15 March 2026_|
|**Decision Makers**|_Dr. Priya Mehta (Chief Architect), AI Governance Council, Technology Leadership_|
|**Context**|_GlobalBank has three AI systems consuming LLM APIs from three different providers_<br>_(Azure OpenAI, Anthropic, self-hosted Llama 3). Without standardisation, each team_<br>_manages its own client library, rate limiting, cost tracking, safety filtering, and audit logging._<br>_This creates governance gaps, duplicated effort, and single-provider dependency risk._|
|**Decision**|_ALL LLM API calls from GlobalBank systems MUST be routed through the Kong AI_<br>_Gateway with LiteLLM abstraction layer. Direct LLM provider API calls are prohibited._<br>_Providers: Azure OpenAI (primary), Anthropic Claude (secondary via Bedrock), Llama 3_<br>_(self-hosted, sensitive data). Failover automated by LiteLLM._|
|**Options Considered**|_(A) Multi-provider via LiteLLM gateway (SELECTED). (B) Azure OpenAI only (rejected:_<br>_vendor lock-in risk). (C) Self-hosted LLMs only (rejected: capability gap). (D) Each team_<br>_manages own clients (rejected: governance impossible)._|
|**Consequences (Positive)**|_Single governance point for LLM traffic. Unified audit log. Cost attribution. Safety filtering_<br>_standardised. Provider switch without code changes. 30-40% cost reduction via semantic_<br>_caching._|
|**Consequences (Negative)**|_Gateway becomes single point of failure (mitigated: active-active HA). Migration effort for 3_<br>_existing systems (estimated: 2 sprints each). LiteLLM abstraction adds ~5ms latency_<br>_(acceptable)._|
|**Compliance Link**|_EU AI Act Article 12 (logging); NIST AI RMF GOVERN-1.7 (documentation); GlobalBank_<br>_AGP-6 (security); AGP-7 (accountability)_|
|**Review Date**|Reviewed annually or when major provider change occurs|

**EA CROSS-CUTTING** 

**AABR-EA-001** 

#### **Enterprise Agent Action Boundary Register** 

Owner: AI Architect + Security Architect   |   ADM Phase: EA   |   TOGAF 10 + AI-First Extension 

> **Register Purpose** Single source of truth for all AI agent action boundaries. Enforced at runtime by OPA sidecar. Updated when agents are deployed or their scope changes. Reviewed quarterly by ARB. 

> **Enforcement Mechanism** OPA (Open Policy Agent) reads AABR as policy source. Agent presents signed manifest with claimed identity. OPA validates identity + requested action against AABR before execution. 

|**Agent ID**|**System**|**Framewor**<br>**k**|**Permitted Actions**|**Denied Actions**|**ATF Level /**<br>**HITL**|**Hard**<br>**Boundaries**|**Owner**|
|---|---|---|---|---|---|---|---|
|AGT-FIN-<br>001|CreditRisk-<br>XGB-v1.0|Scorer (no<br>n-agent)|bureau-api:READ,<br>utility-api:READ,<br>temenos-api:READ,<br>decision-log:WRITE|ALL payment<br>APIs, account-mo<br>dify-api, customer-<br>data-api:WRITE|ATF 1 — All<br>decisions<br>confirmed by<br>core banking|None —<br>non-agent|CRO|
|AGT-OPS-<br>001|CSCopilot-v<br>2.1|LangGrap<br>h stateful|crm-api:READ,<br>kb-search:READ, tic<br>ket-api:CREATE-O<br>NLY,<br>order-api:READ|payment-api:ALL,<br>account-modify-ap<br>i:ALL,<br>pii-export:ALL|ATF 3 —<br>Notify human;<br>refunds >£100<br>need HITL|No payment; no<br>account mod;<br>no PII export|VP<br>Operations|
|AGT-IT-00<br>1|InfraAgent-v<br>1.0|AutoGen<br>sub-agent|cloudwatch:READ,<br>github-api:PR-CRE<br>ATE-ONLY,<br>slack-api:POST|production-deploy:<br>ALL, iam:ALL,<br>secrets:ALL,<br>db:WRITE|ATF 2 — All<br>code changes<br>need human<br>PR approval|No prod<br>deploys; no<br>IAM; no secret<br>access|CISO|
|AGT-DAT<br>A-001|DataQuality<br>Agent-v1.0|LangChain<br>single-age<br>nt|data-catalog:READ,<br>quality-metrics:REA<br>D, atlan-api:TAG-W<br>RITE|training-data:WRIT<br>E, feature-store:W<br>RITE, s3:DELETE|ATF 2 —<br>Quality<br>remediations<br>>Tier2 need<br>approval|No training data<br>modification; no<br>feature deletion|Chief Data<br>Officer|

**EA CROSS-CUTTING** 

**RAIMP-001** 

#### **Responsible AI Maturity Programme** 

Owner: AI Governance Council   |   ADM Phase: EA   |   TOGAF 10 + AI-First Extension 

|**Maturity Level**|**Characteristics**|**Remaining Gaps**|**GlobalBank**<br>**Timeline**|
|---|---|---|---|
|L1 — Initial|Ad hoc AI deployments; no governance;<br>reactive to incidents|Shadow AI; no bias<br>testing; no HITL; no<br>audit trail; regulatory<br>non-compliant|No programme in<br>place|
|L2 —<br>Developing|AIDLC framework adopted; AI<br>Governance Council established; AGPs<br>published; first ARB gate process|Some systems lack full<br>compliance; MLOps<br>immature; data lineage<br>partial; no zero trust|Q1 2026 —<br>GlobalBank<br>baseline|
|L3 — Scaling<br>(TARGET 2026)|Full AIDLC for all T2 systems; LLM<br>Gateway live; Data Mesh 6 domains;<br>MLOps+LLMOps unified platform; ZTA<br>for agents; ISO/IEC 42001 gap closed|Some T3/T4 systems<br>still on AIDLC-Lite;<br>autonomous retraining<br>not yet live|Q4 2026 —<br>Target state|
|L4 —<br>Optimising|Continuous governance monitoring;<br>autonomous retraining; AI portfolio<br>optimisation; proactive regulatory<br>engagement; industry-leading<br>transparency reporting|Constant vigilance<br>required; risk of<br>complacency|2027 target|

|L5 — Leading<br>Industry benchmark; external thought<br>leadership; contributing to standards<br>bodies (The Open Group, NIST, EU AI<br>Act implementation); open-sourcing<br>governance tooling<br>Resource-intensive to<br>maintain<br>2028+ aspiration|
|---|
|**Current Maturity Level (May 2026)**<br>L2 transitioning to L3. AI Governance Council operational. AIDLC in use for 3 production<br>systems. MLOps platform MVP live. Data Mesh 2 of 6 domains. Zero Trust scoped but not<br>deployed.|
|**Target by Dec 2026**<br>L3 — Scaling. ISO/IEC 42001 certified. EU AI Act high-risk documentation complete. All 6<br>Data Mesh domains live. Full ZTA deployed. LLM Gateway enforced enterprise-wide.|
|**KPIs**<br>% AI systems with full AIDLC coverage (target 100% T2); Bias delta all T2 systems <2pp;<br>HITL trigger rate within designed range; Governance cost as % of AI programme (target<br><15%)|

## **ARTIFACT CROSS-REFERENCE BY ADM PHASE** 

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

**_LIBRARY SCOPE: 30+ EA lifecycle artifact templates across all TOGAF 10 ADM phases with AI-First extensions. Standard TOGAF artifacts are extended with_** ! **_AI-First fields covering: AI governance, Constitutional AI policy, Human-AI task boundaries, agent orchestration, zero trust for AI, and regulatory compliance. All templates shown with example content for the "GlobalBank AI Transformation Programme 2026." Replace blue italic values with your organisation's actual content._**
