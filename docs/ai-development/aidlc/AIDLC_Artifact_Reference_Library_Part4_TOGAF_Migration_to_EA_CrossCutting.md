---
title: "TOGAF ADM Artifact Templates: Migration Through EA Cross-Cutting"
date_created: 2026-07-10
status: current
source_type: pdf-converted
source_file: "AIDLC_Artifact_Reference_Library.pdf"
doc_type: multi-part-series
tags: ["ai-development", "enterprise-architecture", "togaf", "aidlc"]
last_reviewed: 2026-07-17
covers_version: "N/A"
series_name: "AIDLC Artifact Reference Library"
series_part: 4
series_total: 4
series_index: "ai-development/aidlc/AIDLC_Artifact_Reference_Library"
---

# TOGAF ADM Artifact Templates: Migration Through EA Cross-Cutting

Continues from [Part 3: Foundation Through Technology](./AIDLC_Artifact_Reference_Library_Part3_TOGAF_Foundation_to_Technology.md).

Covers the remaining TOGAF 10 ADM phases — Opportunities & Migration (E/F), Implementation Governance (G), and Architecture Change Management (H) — plus the EA Cross-Cutting artifacts maintained across all phases, and closes with the two cross-reference summary tables covering the full artifact library (both the AIDLC-phase templates in Parts 1–2 and the TOGAF ADM-phase templates in Parts 3–4).

## TOGAF ADM Opportunities & Migration Phase E/F

ARTIFACTS: AUP-001 · ARTA-001 · ARM-001

! **AI EXTENSION**

### AI Use Case Portfolio & Sequencing Plan

Owner: Chief Architect + AI CoE Lead   |   ADM Phase: EF   |   TOGAF 10 + AI-First Extension

|**AI Use Case**|**Business Value**|**Strategic Fit**|**Risk Tier**|**Est. Duration**|**Current Status**|**Next Milestone**|**Target Live**|**Key Constraints**|
|---|---|---|---|---|---|---|---|---|
|Credit Risk AI Scoring|£7.3M p.a.|HIGH|T2 HIGH|14 months|ARB Approved Q4 2025|Q1 2026 Phase 3|Q3 2026 Phase 7|Foundation use case; FRIA complete; external audit booked|
|Fraud Detection Governance Uplift|£2.1M (risk reduction)|HIGH|T2 HIGH|3 months|Production already — governance gap|Q1 2026 Governance Audit|Q2 2026 Complete|Existing system; compliance uplift only; fast track|
|Customer Service Copilot Expansion|£1.4M incremental|MEDIUM|T3 LIMITED|6 months|Live v2.1 — expand to more channels|Q2 2026 Scope Extension|Q3 2026 Full deployment|Low risk; accelerated AIDLC track|
|Campaign Targeting AI|£0.9M p.a.|MEDIUM|T4 MINIMAL|9 months (in progress)|Phase 5 Development|Already in progress|Q3 2026 Phase 7|AIDLC-Lite track; consent management focus|
|Developer Copilot (GitHub Copilot)|Productivity — unmeasured|MEDIUM|T4 MINIMAL|1 month (register only)|Shadow AI — in use|Immediate registration|Done — ongoing monitoring|Register in ASI-001; code audit policy; AIDLC-Lite|
|CV Screening Assistant|£0.6M (efficiency)|LOW|T2 HIGH|18+ months|ON HOLD — FRIA required|FRIA Q2 2026|Subject to FRIA|EU AI Act Annex III; highest scrutiny; FRIA outcome gating|

|**Sequencing Rationale**|Risk-adjusted sequencing: (1) High business value + compliance foundation first (Credit Risk). (2) Production gap-fills second (Fraud governance). (3) Low-risk progressions third. (4) High-scrutiny on hold until governance matures.|
|---|---|
|**Architecture Dependencies**|Credit Risk AI (Phase 7) is the REFERENCE IMPLEMENTATION. MLOps platform, LLM Gateway, vector database, and monitoring stack must be operational before any subsequent AI system can reach Phase 7.|

**! AI EXTENSION**

### AI-Readiness Transition Architecture

Owner: Chief Architect + Solution Architects   |   ADM Phase: EF   |   TOGAF 10 + AI-First Extension

|**Architecture State**|**Data Architecture**|**MLOps / LLMOps**|**Application Architecture**|**Agent Architecture**|**Security Architecture**|**Governance**|**AI Maturity Level**|
|---|---|---|---|---|---|---|---|
|Baseline (Q1 2026)|Data Lake (unstructured, no lineage)|No MLOps; manual training+deploy|LLM calls via direct API (no gateway)|No agent infrastructure|Perimeter only; no ZTA|Ad hoc; no ARB process|L1 (Initial) — McKinsey AI Maturity|
|Transition 1 (Q2 2026)|Lakehouse + DVC versioning; 2 domains on Mesh; OpenLineage installed|MLflow model registry; Azure ML pipelines; Feast MVP|Kong LLM Gateway live; Lakera Guard + Presidio active|LangGraph framework standard; OPA agent policy MVP|Agent identity registry; HashiCorp Vault deployed|ARB gates for AI systems; AGP published|L2 (Developing)|
|Transition 2 (Q3 2026)|Full Data Mesh (6 domains); Weaviate production; Feature Store certified|Full LLMOps monitoring: Arize AI, hallucination detection, drift alerts|RAG pipelines production-grade; MCP standard adopted for new APIs|3 production agents; ATF trust levels active; circuit breakers live|Zero Trust for agents fully implemented; MAESTRO threat model done|ISO/IEC 42001 gap assessment; EU AI Act compliance audit|L3 (Scaling)|
|Target State (Q4 2026)|Enterprise AI Data Catalog (Atlan); automated lineage; all AI data products quality-certified|Autonomous retraining MVP; unified MLOps+LLMOps platform|Agent mesh production; full MCP integration; semantic caching|Agentic workflows in production across 3 business domains|Full MAESTRO controls; quarterly zero trust review|ISO/IEC 42001 certified; EU AI Act high-risk documented|L4 (Optimising)|

## TOGAF ADM Implementation Governance Phase G

ARTIFACTS: ACC-001 · ASRF-001 · ARB-001

**PHASE OUTPUT**

**ACC-001**

### Architecture Compliance Checklist

Owner: Architecture Review Board   |   ADM Phase: G   |   TOGAF 10 + AI-First Extension

***PURPOSE: Every AI system must complete this checklist before the ARB grants Architecture Compliance Certificate (ACC). This checklist integrates TOGAF Phase G governance with AIDLC Phase 6 (Evaluation) gate requirements.***

|**Compliance Artefact**|**AIDLC Phase**|**Requirement**|**Evidence Provided**|**Status**|
|---|---|---|---|---|
|Use Case Charter (AUC-001)|AIDLC Phase 1|AI use case formally defined with business value hypothesis, risk flags, and sponsor sign-off|AUC-2026-FIN-047 v1.2 — Approved 19 Feb 2026|PASS|
|Risk Classification (RCS-001)|AIDLC Phase 1|EU AI Act risk tier assigned; governance intensity set|RCS-001 — T2 HIGH RISK — 22 Feb 2026|PASS|
|Feasibility Report (FR-001)|AIDLC Phase 2|Technical and organisational feasibility confirmed|FR-001 v1.0 — 5 March 2026|PASS|
|FRIA Completed (FRIA-001)|AIDLC Phase 2|Fundamental Rights Impact Assessment completed for T2 systems|FRIA-001 — Signed CRO + Ethics Lead 10 Mar 2026|PASS|
|Architecture Decision Records (ADR)|AIDLC Phase 4|All key architecture decisions documented with options and rationale|ADR-2026-FIN-047-001 — ARB Approved 2 Apr 2026|PASS|
|Constitutional AI Policy (CAP)|AIDLC Phase 4|Constitutional AI Policy approved by AI Governance Council|CAP-001 v1.0 — AI Gov Council 5 Apr 2026|PASS|
|Red Team Report (RTR-001)|AIDLC Phase 6|All HIGH severity findings resolved; MEDIUM findings remediated or accepted|RTR-001 — All HIGH resolved 22 Apr 2026|PASS|
|Fairness Evaluation (FER-001)|AIDLC Phase 6|All fairness metrics within thresholds; external audit completed for T2|FER-001 — AJI External Audit 22 Apr 2026|PASS|
|Constitutional Compliance Audit (CCA)|AIDLC Phase 6|All 8 Constitutional AI Principles assessed and PASS|CCA-001 — 100% compliance 25 Apr 2026|PASS|
|AI System Inventory Registration|EA Cross-cutting|System registered in ASI-001 with complete metadata|ASI-001 — AUC-2026-FIN-047 registered|PASS|
|Agent Action Boundary Register|EA Cross-cutting|Agent boundaries documented for any agentic components|AABR-001-EA — Non-agent system; N/A|N/A|
|Data Lineage Map (DLM-001)|AIDLC Phase 3|End-to-end data lineage documented and accessible via Atlan|DLM-001 — All 7 nodes documented|PASS|
|Deployment Runbook (DRB-001)|AIDLC Phase 7|Blue/green deployment plan with rollback procedures documented|DRB-001 — MLOps Lead sign-off 30 Apr 2026|PASS|
|User Disclosure Documentation|AIDLC Phase 7|Customer-facing AI disclosure text legal-reviewed and approved|UDD-001 — Legal sign-off 2 May 2026|PASS|

|**ARB Decision**|ARCHITECTURE COMPLIANCE CERTIFICATE GRANTED — CreditRisk-XGB-v1.0. Authorised for deployment. Approval: Dr. Priya Mehta (Chief Architect), James Hartley (CRO), AI Governance Council — 5 May 2026.|
|---|---|
|**Conditions of Certificate**|1. Monthly Monitoring Reports (MMR-001) reviewed by ARB quarterly. 2. Annual external fairness audit maintained. 3. Any material model change requires new ACC application.|

### ! AI Extension: AI System Registration Form

Owner: Business Owner + AI CoE   |   ADM Phase: G   |   TOGAF 10 + AI-First Extension

**ASRF-001**

|**System ID (assigned by AI CoE)**|*AUC-2026-FIN-047*|
|---|---|
|**System Name**|*Credit Risk AI Scoring Model*|
|**Business Owner**|*Sarah Chen, VP Credit Risk, Retail Banking Division*|
|**Technical Owner**|*Dr. Nina Kowalski, Head of AI CoE*|
|**System Description**|*ML-based credit scoring model (XGBoost) with LLM adverse action notice generator (GPT-4o fine-tuned). Used for automated credit decisions on UK retail lending applications (50,000/month).*|
|**AI Category**|*ML Classification (primary) + Generative AI (adverse action narrative)*|
|**EU AI Act Risk Tier**|*TIER 2 — HIGH RISK (Annex III, Category 5b: creditworthiness assessment)*|
|**Regulated By**|*FCA, PRA, ICO, EU AI Act National Competent Authority*|
|**Personal Data Processed**|*YES — Applicant financial history, utility payment history, rent history. Processing basis: Art. 6(1)(b) GDPR (contractual necessity).*|
|**Third-Party AI Components**|*Equifax Credit Bureau API, GPT-4o (Azure OpenAI), Lakera Guard, Microsoft Presidio*|
|**Deployment Environment**|*Production — Azure Kubernetes Service (AKS), UK South region*|
|**Date Registered**|*5 May 2026*|

**ACC Certificate Number**

*ACC-2026-FIN-047-001 (Architecture Compliance Certificate granted 5 May 2026)*

## TOGAF ADM Architecture Change Management Phase H

ARTIFACTS: ACR-001 · APR-001 · AIM-001

**PHASE OUTPUT**

**ACR-001**

### Architecture Change Request

Owner: Requestor + Architecture Review Board   |   ADM Phase: H   |   TOGAF 10 + AI-First Extension

|**Change Request ID**|*ACR-2026-FIN-047-002*|
|---|---|
|**Date Submitted**|*15 June 2026*|
|**Requestor**|*Dr. Nina Kowalski, Head of AI CoE*|
|**System Affected**|*CreditRisk-XGB-v1.0 (AUC-2026-FIN-047)*|
|**Change Title**|*Integrate Real-Time Rental Bureau Data (Experian API) — Model Retraining*|
|**Change Description**|*Add Experian Rental Bureau as a new alternative data source for credit scoring. Requires: (1) New data pipeline (rental-bureau-pipeline). (2) Feature engineering for 6 new rental features. (3) Model retraining with new features. (4) Fairness re-evaluation (new data source may affect demographic groups). (5) Red team re-assessment of new data pipeline.*|
|**Change Classification**|*SIGNIFICANT — New data source changes model behaviour and requires Phase 5-6 re-run for new features. Does NOT require full Phase 1-4 restart.*|
|!**AIDLC Impact Assessment**|*Phases required: Phase 3 (Data Sheet update for rental data) → Phase 5 (Retrain with new features) → Phase 6 (Fairness re-evaluation, bias re-assessment) → Phase 7 (Re-deployment runbook). Estimated: 6 weeks.*|
|!**Regulatory Notification Required**|*NO — change is additive, does not alter the fundamental model architecture or purpose. Legal review confirms no new regulatory obligations.*|
|**Architecture Risk Assessment**|*LOW-MEDIUM: (1) New data source may reveal unexpected bias (mitigated: mandatory re-run of FER-001). (2) Vendor reliability of Experian Rental Bureau API (mitigated: fallback to bureau-only scoring if API down).*|
|**ARB Decision**|*APPROVED with conditions: (1) FER-001 re-run must show no degradation in fairness metrics. (2) Rental data DPA signed before data ingestion. (3) Updated Data Sheet signed by Data Governance Board. — ARB 22 June 2026*|

! **AI EXTENSION APR-001**

### AI Portfolio Review Report

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

## TOGAF ADM EA Cross-Cutting Artifacts

ARTIFACTS: EADR-001 · AABR-EA-001 · ASI-EA-001 · RAIMP-001

**EA CROSS-CUTTING EA Architecture Decision Record (AI-First)** Owner: Architecture Review Board   |   ADM Phase: EA   |   TOGAF 10 + AI-First Extension

**EADR-001**

***PURPOSE: Documents enterprise-level architecture decisions that affect multiple AI systems or the AI platform itself. Distinct from AIDLC Phase 4 ADRs (which are use-case-specific). EA ADRs are binding on all teams and permanent record.***

|**EA ADR ID**|*EADR-2026-PLAT-003*|
|---|---|
|**Title**|*LLM Provider Strategy: Multi-Provider via LiteLLM Router — Mandatory Standard*|
|**Status**|*ACCEPTED — Architecture Review Board — 15 March 2026*|
|**Decision Makers**|*Dr. Priya Mehta (Chief Architect), AI Governance Council, Technology Leadership*|
|**Context**|*GlobalBank has three AI systems consuming LLM APIs from three different providers (Azure OpenAI, Anthropic, self-hosted Llama 3). Without standardisation, each team manages its own client library, rate limiting, cost tracking, safety filtering, and audit logging. This creates governance gaps, duplicated effort, and single-provider dependency risk.*|
|**Decision**|*ALL LLM API calls from GlobalBank systems MUST be routed through the Kong AI Gateway with LiteLLM abstraction layer. Direct LLM provider API calls are prohibited. Providers: Azure OpenAI (primary), Anthropic Claude (secondary via Bedrock), Llama 3 (self-hosted, sensitive data). Failover automated by LiteLLM.*|
|**Options Considered**|*(A) Multi-provider via LiteLLM gateway (SELECTED). (B) Azure OpenAI only (rejected: vendor lock-in risk). (C) Self-hosted LLMs only (rejected: capability gap). (D) Each team manages own clients (rejected: governance impossible).*|
|**Consequences (Positive)**|*Single governance point for LLM traffic. Unified audit log. Cost attribution. Safety filtering standardised. Provider switch without code changes. 30-40% cost reduction via semantic caching.*|
|**Consequences (Negative)**|*Gateway becomes single point of failure (mitigated: active-active HA). Migration effort for 3 existing systems (estimated: 2 sprints each). LiteLLM abstraction adds ~5ms latency (acceptable).*|
|**Compliance Link**|*EU AI Act Article 12 (logging); NIST AI RMF GOVERN-1.7 (documentation); GlobalBank AGP-6 (security); AGP-7 (accountability)*|
|**Review Date**|Reviewed annually or when major provider change occurs|

**EA CROSS-CUTTING**

**AABR-EA-001**

### Enterprise Agent Action Boundary Register

Owner: AI Architect + Security Architect   |   ADM Phase: EA   |   TOGAF 10 + AI-First Extension

> **Register Purpose** Single source of truth for all AI agent action boundaries. Enforced at runtime by OPA sidecar. Updated when agents are deployed or their scope changes. Reviewed quarterly by ARB.

> **Enforcement Mechanism** OPA (Open Policy Agent) reads AABR as policy source. Agent presents signed manifest with claimed identity. OPA validates identity + requested action against AABR before execution.

*Note: this is the enterprise-wide, cross-system register maintained by EA; it supersets the single-system Agent Action Boundary Register (AABR-001) shown under Enterprise Architecture Artifacts above.*

|**Agent ID**|**System**|**Framework**|**Permitted Actions**|**Denied Actions**|**ATF Level / HITL**|**Hard Boundaries**|**Owner**|
|---|---|---|---|---|---|---|---|
|AGT-FIN-001|CreditRisk-XGB-v1.0|Scorer (non-agent)|bureau-api:READ, utility-api:READ, temenos-api:READ, decision-log:WRITE|ALL payment APIs, account-modify-api, customer-data-api:WRITE|ATF 1 — All decisions confirmed by core banking|None — non-agent|CRO|
|AGT-OPS-001|CSCopilot-v2.1|LangGraph stateful|crm-api:READ, kb-search:READ, ticket-api:CREATE-ONLY, order-api:READ|payment-api:ALL, account-modify-api:ALL, pii-export:ALL|ATF 3 — Notify human; refunds >£100 need HITL|No payment; no account mod; no PII export|VP Operations|
|AGT-IT-001|InfraAgent-v1.0|AutoGen sub-agent|cloudwatch:READ, github-api:PR-CREATE-ONLY, slack-api:POST|production-deploy:ALL, iam:ALL, secrets:ALL, db:WRITE|ATF 2 — All code changes need human PR approval|No prod deploys; no IAM; no secret access|CISO|
|AGT-DATA-001|DataQualityAgent-v1.0|LangChain single-agent|data-catalog:READ, quality-metrics:READ, atlan-api:TAG-WRITE|training-data:WRITE, feature-store:WRITE, s3:DELETE|ATF 2 — Quality remediations >Tier2 need approval|No training data modification; no feature deletion|Chief Data Officer|

**EA CROSS-CUTTING**

**RAIMP-001**

### Responsible AI Maturity Programme

Owner: AI Governance Council   |   ADM Phase: EA   |   TOGAF 10 + AI-First Extension

|**Maturity Level**|**Characteristics**|**Remaining Gaps**|**GlobalBank Timeline**|
|---|---|---|---|
|L1 — Initial|Ad hoc AI deployments; no governance; reactive to incidents|Shadow AI; no bias testing; no HITL; no audit trail; regulatory non-compliant|No programme in place|
|L2 — Developing|AIDLC framework adopted; AI Governance Council established; AGPs published; first ARB gate process|Some systems lack full compliance; MLOps immature; data lineage partial; no zero trust|Q1 2026 — GlobalBank baseline|
|L3 — Scaling (TARGET 2026)|Full AIDLC for all T2 systems; LLM Gateway live; Data Mesh 6 domains; MLOps+LLMOps unified platform; ZTA for agents; ISO/IEC 42001 gap closed|Some T3/T4 systems still on AIDLC-Lite; autonomous retraining not yet live|Q4 2026 — Target state|
|L4 — Optimising|Continuous governance monitoring; autonomous retraining; AI portfolio optimisation; proactive regulatory engagement; industry-leading transparency reporting|Constant vigilance required; risk of complacency|2027 target|
|L5 — Leading|Industry benchmark; external thought leadership; contributing to standards bodies (The Open Group, NIST, EU AI Act implementation); open-sourcing governance tooling|Resource-intensive to maintain|2028+ aspiration|

|**Current Maturity Level (May 2026)**|L2 transitioning to L3. AI Governance Council operational. AIDLC in use for 3 production systems. MLOps platform MVP live. Data Mesh 2 of 6 domains. Zero Trust scoped but not deployed.|
|---|---|
|**Target by Dec 2026**|L3 — Scaling. ISO/IEC 42001 certified. EU AI Act high-risk documentation complete. All 6 Data Mesh domains live. Full ZTA deployed. LLM Gateway enforced enterprise-wide.|
|**KPIs**|% AI systems with full AIDLC coverage (target 100% T2); Bias delta all T2 systems <2pp; HITL trigger rate within designed range; Governance cost as % of AI programme (target <15%)|

## Artifact Cross-Reference by ADM Phase

|**ADM Phase**|**Artifact Templates in This Library**|
|---|---|
|PRE — Preliminary|EAFC-001 EA Framework Charter, AGP-001 AI Governance Principles, ESR-001 Stakeholder Register|
|A — Architecture Vision|SAW-001 Statement of Architecture Work, ACA-001 AI Capability Assessment, AVD-001 Architecture Vision|
|B — Business Architecture|ACM-001 AI Capability Map, HATB-001 Human-AI Task Boundary Map, AOM-001 AI Operating Model, WIA-001 Workforce Impact Analysis|
|C1 — Data Architecture|DAB-001 Data Architecture Blueprint, DM-001 Data Mesh Domain Design, VDA-001 Vector DB Architecture, FLS-001 Feature Store Lineage Spec|
|C2 — Application Architecture|LLMG-001 LLM Gateway Architecture, AOB-001 Agent Orchestration Blueprint, CSD-001 Copilot Stack Design, ASAP-001 Agent-Safe API Pattern|
|D — Technology Architecture|AIB-001 AI Infrastructure Blueprint, MPD-001 MLOps Platform Design, ZTA-001 Zero Trust AI Architecture, FAOD-001 FinOps for AI Design|
|E/F — Opportunities & Migration|AUP-001 AI Use Case Portfolio, ARTA-001 AI-Readiness Transition Architecture, ARM-001 Architecture Roadmap|
|G — Implementation Governance|ACC-001 Architecture Compliance Checklist, ASRF-001 AI System Registration Form, ARB-001 ARB Decision Log|
|H — Change Management|ACR-001 Architecture Change Request, APR-001 AI Portfolio Review Report, AIM-001 Architecture Impact Model|
|EA — Cross-Cutting|EADR-001 EA Architecture Decision Record, AABR-EA-001 Agent Boundary Register, ASI-EA-001 AI System Inventory, RAIMP-001 RAI Maturity Programme|

***LIBRARY SCOPE: 30+ EA lifecycle artifact templates across all TOGAF 10 ADM phases with AI-First extensions. Standard TOGAF artifacts are extended with*** ! ***AI-First fields covering: AI governance, Constitutional AI policy, Human-AI task boundaries, agent orchestration, zero trust for AI, and regulatory compliance. All templates shown with example content for the "GlobalBank AI Transformation Programme 2026." Replace blue italic values with your organisation's actual content.***

## ARTIFACT CROSS-REFERENCE SUMMARY

|**AIDLC Phase**|**Key Inputs**|**Key Output Artifacts**|
|---|---|---|
|Phase 1:<br>Discovery|AUC-001 Use Case Charter|BVC-001 Business Value Canvas, RCS-001 Risk<br>Classification, ESO-001 Sponsor Sign-off|
|Phase 2:<br>Feasibility|AUC-001, BVC-001,<br>RCS-001|FR-001 Feasibility Report, RR-001 Risk Register,<br>FRIA-001, TPRM-001, COM-001|
|Phase 3: Data<br>Strategy|RR-001, COM-001, FR-001|DS-001 Data Sheet, PIA-001, DLM-001 (init), BB-001<br>Bias Baseline, DPA-001|
|Phase 4:<br>Architecture|DS-001, RCS-001,<br>COM-001, FRIA-001|ADR-001 Architecture Decisions, CAP-001 Constitutional<br>AI Policy, MCD-001 Model Card (Draft), ATM-001 Threat<br>Model, EXD-001 Explainability Design|
|Phase 5:<br>Development|ADR-001, CAP-001,<br>DS-001, COM-001|ETR-001 Experiment Tracking, TRL-001 Training Logs,<br>BMR-001 Bias Mitigation, CAL-001 Code Audit, MRE-001<br>Model Registry|
|Phase 6:<br>Evaluation|MRE-001, CAP-001,<br>MCD-001, BB-001|RTR-001 Red Team Report, FER-001 Fairness Eval,<br>PBR-001 Performance Benchmark, CCA-001<br>Constitutional Audit, MCF-001 Final Model Card,<br>SPT-001 Security Test|
|Phase 7:<br>Deployment|MCF-001, RTR-001,<br>CCA-001, Governance<br>Approval|DRB-001 Deployment Runbook, IRP-001 Incident<br>Response, ALC-001 Audit Log Config, UDD-001 User<br>Disclosure, RMD-001 Monitoring Dashboard|
|Phase 8:<br>Monitor & Retire|Runtime data, DRB-001,<br>ALC-001, COM-001|MMR-001 Monthly Report, DAL-001 Drift Alert Log,<br>QAR-001 Quarterly Audit, RCL-001 Regulatory Change<br>Log, MSP-001 Sunset Plan|
|EA<br>(Cross-Phase)|All phase artifacts +<br>Business Strategy +<br>Regulatory Frameworks|ASI-001 AI System Inventory, ACM-001 AI Capability<br>Map, AABR-001 Agent Boundary Register, EADR-001<br>EA Architecture Decisions, DLM-001 Data Lineage Map<br>(full)|

***TOTAL ARTIFACTS IN THIS LIBRARY: 40+ artifact templates across 8 AIDLC phases and the EA layer. Each artifact shown with: full field definitions, example content for a Credit Risk AI use case, governance controls, regulatory mapping, and relationships to upstream/downstream artifacts. This library is designed to be adapted for any enterprise AI use case — replace the blue italic example values with your actual project content.***