---
title: "AIDLC Lifecycle Artifacts: Discovery Through Model Design"
date_created: 2026-07-10
status: current
source_type: pdf-converted
source_file: "AIDLC_Artifact_Reference_Library.pdf"
doc_type: multi-part-series
tags: ["ai-development", "software-engineering", "aidlc", "enterprise-architecture"]
last_reviewed: 2026-07-17
covers_version: "N/A"
series_name: "AIDLC Artifact Reference Library"
series_part: 1
series_total: 4
series_index: "ai-development/aidlc/AIDLC_Artifact_Reference_Library"
---

# AIDLC Lifecycle Artifacts: Discovery Through Model Design

Continues from the [AIDLC Artifact Reference Library series index](./AIDLC_Artifact_Reference_Library.md).

Live templates for AIDLC Phases 1–4 — the discovery, feasibility, data governance, and architecture stages that precede any model training — with field definitions and example content for every artifact.

> **Audience:** Enterprise Architects, AI Delivery Leads, Program Managers, Governance Teams
> **Coverage:** AIDLC Phases 1–4 · Template Field Definitions
> **As of:** 2026

## HOW TO READ THIS DOCUMENT

|**Element**|**Description**|
|---|---|
|Phase Header|Coloured banner for each AIDLC phase with phase number, name, and<br>governance gate|
|I/O Flow Box|Green left = inputs consumed by this phase. Blue right = artifacts produced by<br>this phase|
|Artifact Card|Each artifact shown as a template. The coloured badge (INPUT/OUTPUT/EA)<br>indicates artifact role|
|Field Grid|Gray background = field label. Blue italic text = example value you would fill in for<br>a real project|
|Table Sections|Structured tables within artifacts (e.g., risk register rows, bias metrics) shown with<br>example data|
|Section Bars|Dark coloured bars separate major sections within each artifact template|

***EXAMPLE CONTENT: All field values shown in blue italic are illustrative examples for a hypothetical "Credit Risk AI Scoring Model" use case at a financial services enterprise. Replace all blue italic values with your actual project data.***

**PHASE**

**1**

## Discovery & Ideation

**AI Governance Council Registration**

Define the AI use case, business value hypothesis, and initial feasibility signal

**INPUTS TO THIS PHASE**

→ Strategic Business Goals

→ Market / Competitive Analysis

→ Stakeholder Pain Points

→ Regulatory Landscape Brief

**OUTPUTS FROM THIS PHASE**

→ AI Use Case Charter (AUC-001)

→ Business Value Canvas (BVC-001)

→ Initial Risk Classification Sheet (RCS-001)

- → Executive Sponsor Sign-off (ESO-001)

**AUC-001**

### AI Use Case Charter

Owner: Business Owner / Product Manager   |   Phase: Phase 1: Discovery

**CHARTER IDENTIFICATION**

|**Use Case ID**|*AUC-2026-FIN-047*|
|---|---|
|**Use Case Name**|*Credit Risk AI Scoring Model — Retail Lending*|
|**Business Domain**|*Retail Banking — Credit Risk Management*|
|**Business Owner**|*Sarah Chen, VP Credit Risk, Retail Banking*|
|**Product Manager**|*David Okafor, Senior PM, AI & Analytics*|
|**Date Initiated**|*12 February 2026*|
|**Charter Version**|*v1.2*|
|**Status**|*Approved — Proceeding to Phase 2*|
||**PROBLEM STATEMENT**|
|**Problem Statement**|*The current credit scoring process takes 72 hours on average, relies on manual review*<br>*for 40% of applications, and results in a 12% false-rejection rate for creditworthy*<br>*customers in underserved segments. This causes customer churn, missed revenue, and*<br>*equity concerns.*|
|**Business Pain Points**|*72-hour decision cycle; 40% manual review burden; 12% false-rejection rate; Inability to*<br>*serve thin-file customers; Manual process inconsistency across regions*|
|**Target Opportunity**|*Reduce decision time to <60 seconds for 80% of applications; reduce false-rejection*<br>*rate to <5%; enable thin-file credit assessment via alternative data*|
||**AI SOLUTION HYPOTHESIS**|
|**Proposed AI Solution**|*ML-based credit scoring model using gradient boosting + alternative data (utility*<br>*payments, rent history) combined with LLM-powered adverse action explanation*<br>*generator*|

|**AI Approach**|*Supervised ML classification (creditworthy / not creditworthy) + RAG-powered*<br>*explanation generation for regulatory adverse action notices*|
|---|---|
|**AI vs Non-AI Decision**|*AI preferred: decision volume (50,000/month), pattern complexity, regulatory*<br>*explainability requirement, real-time speed requirement. Non-AI alternatives (rule*<br>*engine, scorecard) evaluated and rejected.*|
|**Build vs Buy vs Fine-Tune**|*Buy: Foundation credit risk models (FICO, Equifax). Fine-tune: LLM for adverse action*<br>*explanation. Build: Alternative data pipeline and ensemble orchestration.*|

**ROI & VALUE HYPOTHESIS**

|**Metric**|**Baseline**|**AI Target**<br>**Annual Value Impact**|
|---|---|---|
|Decision Cycle Time|72 hours|<60 seconds<br>£2.1M saved (FTE reduction + faster revenue<br>recognition)|
|Manual Review<br>Rate|40%|<8%<br>£1.4M saved (analyst hours)|
|False Rejection<br>Rate|12%|<5%<br>£3.8M recovered revenue (re-captured<br>creditworthy customers)|
|Customer NPS<br>(Credit)|34|>55<br>Brand value; reduced churn|
|Total Projected<br>Annual ROI|—|—<br>£7.3M (payback period: 9 months)|
|||**INITIAL RISK FLAGS**|
|**Preliminary EU AI Act Tier**|*HIGH R*<br>*assess*|*ISK — Annex III Category: Access to financial services (creditworthiness*<br>*ment). Full AIDLC + FRIA required.*|
|**Protected Attributes Involved**|*Age, G*<br>*mandat*|*ender, Ethnicity, Postcode (proxy for protected attributes). Bias mitigation*<br>*ory from Phase 3.*|
|**Regulatory Bodies**|*FCA (U*|*K), PRA, ICO, EU AI Act National Competent Authority (if EU customers)*|
|**Explainability Requirement**|*MANDA*<br>*with sp*|*TORY — ECOA/Regulation B-equivalent (UK) requires adverse action notice*<br>*ecific reason codes. Every rejection must be explainable.*|

||**EXECUTIVE SPONSOR SIGN-OFF**<br>|
|---|---|
|**Executive Sponsor**|*James Hartley, Chief Risk Officer*|
|**Sign-off Date**|*19 February 2026*|
|**Approval Conditions**|*1. Full FRIA completed before development begins. 2. External fairness audit in Phase*<br>*6. 3. Quarterly bias monitoring post-deployment.*|
|**Escalation Path**|*AI Governance Council*→*CRO*→*Board Risk Committee*|

**BVC-001**

### Business Value Canvas

Owner: Product Manager   |   Phase: Phase 1: Discovery

|**Canvas Dimension**|**Example Content**|
|---|---|
|AI System|Credit Risk AI Scoring Model (AUC-2026-FIN-047)|
|Customer Segments<br>Served|Retail banking applicants: prime, near-prime, thin-file, underserved|
|Value Propositions|60-second credit decisions; fair thin-file assessment; consistent explainable<br>outcomes; 24/7 availability|
|Key Activities|Alternative data ingestion, real-time scoring, adverse action generation, bias<br>monitoring|
|Key Resources|Credit data (bureau + alternative), GPU inference cluster, model team,<br>compliance expertise|
|Key Partners|Equifax/Experian (bureau data), Utility data providers, FCA regulatory counsel|
|Revenue Streams|Net interest income on approved loans, reduced cost of risk (fewer defaults), fee<br>income|
|Cost Structure|Model development (£420K), annual MLOps (£180K), compliance (£95K), data<br>licensing (£240K)|
|Success Metrics|Decision time <60s (80% of apps); false rejection <5%; bias delta <2%;<br>Explainability coverage 100%|
|Failure Risks|Regulatory rejection (FRIA outcome); bias discovery post-deployment; data<br>quality failure; model drift|

**OUTPUT**

**RCS-001**

### Initial Risk Classification Sheet

Owner: AI Governance Council   |   Phase: Phase 1: Discovery

|**Use Case ID**|*AUC-2026-FIN-047*|
|---|---|
|**EU AI Act Annex III Check**|*YES — Category 5(b): AI used for creditworthiness assessment of natural persons*|
|**Assigned Risk Tier**|*TIER 2 — HIGH RISK*|
|**FRIA Required**|*YES — Fundamental Rights Impact Assessment mandatory*|
|**External Audit Required**|*YES — Independent conformity assessment before deployment*|
|**Governance Intensity**|*Full AIDLC all 8 phases; AI Governance Council sign-off at Phases 2, 4, 6, 7*|
|**Classification Approved By**|*Priya Sharma, AI Compliance Lead*|
|**Classification Date**|*22 February 2026*|

**PHASE 2**

## Feasibility & Risk Assessment

Validate technical feasibility, assess full risk exposure, obtain governance approval to proceed

**INPUTS TO THIS PHASE**

→ AI Use Case Charter (AUC-001)

→ Business Value Canvas (BVC-001)

→ Initial Risk Classification (RCS-001)

**OUTPUTS FROM THIS PHASE**

→ Feasibility Report (FR-001)

→ AI Risk Register (RR-001)

→ FRIA (FRIA-001)

→ TPRM Vendor Assessment (TPRM-001)

→ Compliance Obligation Matrix (COM-001)

**OUTPUT FR-001 Technical Feasibility Report** Owner: AI Architect + Data Architect   |   Phase: Phase 2: Feasibility

**TECHNICAL FEASIBILITY ASSESSMENT**

|**Data Availability**|*Bureau data: HIGH availability (Equifax, Experian APIs). Alternative data (utility):*<br>*MEDIUM (3 providers identified, contract negotiation required). Thin-file historical:*<br>*LIMITED — synthetic augmentation required.*|
|---|---|
|**Data Volume Assessment**|*Training set: 2.3M historical applications (36 months). Positive class ratio: 73%*<br>*approved. Class imbalance strategy: SMOTE + cost-sensitive learning.*|
|**Model Approach Selected**|*XGBoost ensemble (primary scorer) + SHAP explainer (feature importance) + GPT-4o*<br>*fine-tuned (adverse action narrative generation). Architecture: RAG for regulatory*<br>*reason code library.*|
|**Infrastructure Feasibility**|*Azure ML available for training. Azure AI Content Safety for LLM outputs. Inference*<br>*SLA: p99 <200ms achievable with KServe + model caching. GPU budget: £45K/year*<br>*training, £28K/year inference.*|
|**Integration Feasibility**|*Core banking API (Temenos): REST available, 200ms SLA. Bureau APIs: SOAP to*<br>*REST adapter required (2 weeks build). Event streaming: Azure Event Hubs available.*|
|**Team Capability Assessment**|*ML Engineers: 3 available (2 FTE dedicated). Data Scientists: 2 (credit domain*<br>*expertise). Data Engineers: 2. MLOps: 1 (upskilling required for LLMOps). Gap: LLM*<br>*fine-tuning expertise — external support needed.*|
|**Overall Feasibility Verdict**|*FEASIBLE with conditions: (1) Alternative data contracts signed by Week 8. (2) LLM*<br>*fine-tuning specialist engaged. (3) FRIA completed before Phase 4.*|

**RR-001**

### AI Risk Register

Owner: AI Compliance Lead + Model Risk Manager   |   Phase: Phase 2: Feasibility

|**ID**|**Risk Name**|**Impact**|**Likelihood**|**Rating**|**Description**|**Mitigation**|**Status**|
|---|---|---|---|---|---|---|---|
|RR-01|Algorithmic Bias|HIGH|HIGH|CRITICAL|Demographic bias in credit scoring causing disparate impact on protected groups|SHAP bias monitoring; fairness metrics at every phase; external audit Phase 6; HITL override capability|Open|
|RR-02|Data Quality Failure|HIGH|MEDIUM|HIGH|Poor alternative data quality leading to model degradation and wrong decisions|Data quality gates in Phase 3; automated quality monitoring in Phase 8; fallback to bureau-only scoring|Open|
|RR-03|Regulatory Non-Compliance|HIGH|MEDIUM|HIGH|Failure to comply with EU AI Act, FCA rules, or adverse action notice requirements|FRIA; legal review at Phases 2,4,6; external conformity assessment; compliance obligation matrix|Open|
|RR-04|Explainability Failure|HIGH|LOW|MEDIUM|Model unable to generate compliant adverse action reasons; black-box rejections|SHAP-based reason codes; LLM adverse action generation; 100% explainability coverage requirement|Open|
|RR-05|Model Drift|MEDIUM|HIGH|HIGH|Model performance degradation post-deployment due to economic or behavioral shifts|Monthly drift monitoring; automated retraining triggers; p-value drift tests; model refresh SLA|Open|
|RR-06|Data Breach (PII)|LOW|HIGH|MEDIUM|PII exposure in training data, inference logs, or LLM prompt/response|Azure Key Vault encryption; PII masking in RAG; Presidio in LLM pipeline; audit log access controls|Open|
|RR-07|Vendor Lock-in|LOW|MEDIUM|LOW|Dependency on single cloud provider or LLM vendor|MLflow open registry; model router abstraction; OpenLineage lineage; LiteLLM multi-provider|Open|

**FRIA-001**

### Fundamental Rights Impact Assessment

Owner: Ethics & Fairness Lead + Legal   |   Phase: Phase 2: Feasibility

|**System Name**|*Credit Risk AI Scoring Model (AUC-2026-FIN-047)*|
|---|---|
|**FRIA Version**|*v1.0 — Initial Assessment*|
|**Assessment Date**|*5 March 2026*|
|**Lead Assessor**|*Dr. Amara Diallo, Ethics & Fairness Lead*|
|**Legal Counsel**|*Patel & Morrison LLP (FCA regulatory practice)*|
||**AFFECTED POPULATIONS & RIGHTS AT RISK**|

|**Affected Group**|**Fundamental**<br>**Rights at Risk**|**Sever**<br>**ity**|**Potential Impact**|**Mitigation Committed**|
|---|---|---|---|---|
|Retail lending<br>applicants (all)|Access to financial<br>services (Art. 8 EU<br>AI Act; Equality Act<br>2010)|HIGH|Credit denial;<br>financial exclusion|Bias monitoring; HITL override;<br>appeal mechanism|
|Thin-file<br>applicants<br>(young,<br>immigrants, low<br>income)|Non-discrimination;<br>equality of<br>opportunity|HIGH|Systematic<br>exclusion;<br>perpetuation of<br>disadvantage|Alternative data inclusion;<br>demographic parity testing;<br>protected group uplift analysis|
|Rejected<br>applicants|Right to explanation;<br>right to human<br>review|HIGH|Inability to<br>understand or<br>challenge AI<br>decision|100% explainability; adverse<br>action notice; human review<br>process; written appeal channel|
|Employees<br>(model<br>reviewers)|Right to fair working<br>conditions|LOW|New workload<br>patterns; skill<br>obsolescence|Change management; upskilling;<br>clear HITL responsibilities|

> **FRIA Conclusion** *HIGH RISK CONFIRMED — Deployment conditional on: (1) External fairness audit completed in Phase 6. (2) Human review mechanism operational at Phase 7. (3) Written appeal process documented and accessible. (4) Quarterly demographic parity monitoring post-deployment.*

> **Sign-off** *Dr. Amara Diallo (Ethics Lead) · James Hartley (CRO) · Priya Sharma (Compliance Lead) — 10 March 2026*

**OUTPUT Compliance Obligation Matrix** Owner: AI Compliance Lead + Legal   |   Phase: Phase 2: Feasibility

**COM-001**

|**Regulation / Article**|**Obligation**|**AIDLC Phase &**<br>**Artifact**|**Priority**|
|---|---|---|---|
|EU AI Act Art. 9|Risk Management System<br>throughout lifecycle|ALL phases —<br>documented in Risk<br>Register RR-001|CRITICA<br>L|
|EU AI Act Art. 10|Data governance: quality,<br>representativeness,<br>bias-free training data|Phase 3 — Data Sheet<br>DS-001 + Bias Baseline<br>BB-001|CRITICA<br>L|
|EU AI Act Art. 11|Technical documentation<br>(Architecture, Model Card,<br>Test Results)|Phases 4–6 —<br>ADR-001, MCF-001,<br>RTP-001|CRITICA<br>L|
|EU AI Act Art. 12|Automatic logging /<br>record-keeping|Phase 7 — ALC-001<br>Audit Log Configuration|CRITICA<br>L|
|EU AI Act Art. 13|Transparency & information<br>to deployers|Phase 7 — UDD-001<br>User Disclosure<br>Documentation|HIGH|
|EU AI Act Art. 14|Human oversight measures|Phases 4,7 — HITL<br>design; IRP-001|CRITICA<br>L|

|EU AI Act Art. 15|Accuracy, robustness,<br>cybersecurity|Phase 6 — PBR-001,<br>SPT-001|CRITICA<br>L|
|---|---|---|---|
|UK Equality Act 2010|Non-discrimination across<br>protected characteristics|Phases 3,6,8 —<br>BB-001, FER-001,<br>MMR-001|CRITICA<br>L|
|UK GDPR / DPA 2018|Data subject rights,<br>processing lawful basis, PIA|Phase 3 — PIA-001|CRITICA<br>L|
|FCA SYSC 23<br>(Operational Resilience)|AI system resilience and<br>recovery capabilities|Phase 7 — IRP-001,<br>Deployment Runbook|HIGH|
|ECOA Adverse Action<br>(equivalent)|Reason codes for credit<br>denial (regulatory adverse<br>action notice)|Phases 4–7 —<br>Explainability design +<br>UDD-001|CRITICA<br>L|

**PHASE 3**

## Data Strategy & Governance

**GATE Data Governance Board Approval**

Establish data foundation — provenance, quality, privacy, lineage — for trustworthy AI

**INPUTS TO THIS PHASE**

→ Risk Register (RR-001)

**OUTPUTS FROM THIS PHASE**

→ Data Sheet / Data Card (DS-001)

→ Compliance Obligation Matrix (COM-001) → Privacy Impact Assessment (PIA-001)

→ Feasibility Report (FR-001)

→ Data Lineage Map (DLM-001)

→ Bias Baseline Report (BB-001)

→ Data Processing Agreements (DPA-001)

**DS-001**

### Data Sheet (Data Card)

Owner: Data Architect + Data Engineer   |   Phase: Phase 3: Data Strategy

|**Dataset**|**Source**|**Period**|**Volume**|**Storage**<br>**Location**|**Quality**<br>**Score**|**Classification**|
|---|---|---|---|---|---|---|
|Primary Training<br>Dataset|Equifax<br>credit<br>bureau<br>records|36<br>months<br>(Jan 20<br>23–Dec<br>2025)|2,317,4<br>42<br>records|S3://ml-data-pro<br>d/credit/bureau/|98.7%|PII — Tier 2|
|Utility Payment<br>History|Equiniti /<br>National<br>Grid utility<br>API|24<br>months|847,291<br>records|S3://ml-data-pro<br>d/credit/utility/|94.2%|PII — Tier 2|
|Rent Payment<br>History|Experian<br>Rental<br>Bureau|18<br>months|312,088<br>records|S3://ml-data-pro<br>d/credit/rental/|91.4%|PII — Tier 2|
|Application Data|Temenos<br>core<br>banking<br>(live)|36<br>months|2,317,4<br>42<br>records|Azure SQL: cor<br>ebanking.applic<br>ations|99.1%|PII — Tier 2|
|Outcome Labels<br>(Ground Truth)|Core<br>banking<br>12-month<br>default<br>tracking|36<br>months|2,317,4<br>42<br>labels|S3://ml-data-pro<br>d/credit/labels/|100%|Internal Conf.|
|**Protected Attributes Present**|*Age*<br>*NO*<br>*mo*|*(derived fro*<br>*T collected.*<br>*del feature.*|*m DOB), po*<br>*Action: post*|*stcode (proxy for e*<br>*code retained for fa*|*thnicity/soc*<br>*irness mon*|*ioeconomic status). Gender*<br>*itoring only — not used as*|
|**Class Imbalance**|*73%*<br>*ove*|*approved (*<br>*rsampling of*|*negative lab*<br>*minority cla*|*el), 27% default (p*<br>*ss + cost-sensitive*|*ositive labe*<br>*learning (F*|*l). Mitigation: SMOTE*<br>*P cost = 3× FN cost)*|

|**Consent Basis**|*GDPR Article 6(1)(b) — Necessary for performance of contract (credit assessment).*<br>*Article 9 profiling permitted under Article 22(2)(a).*|
|---|---|
|**Data Retention Policy**|*Training data: 5 years post-model retirement. Inference logs: 7 years (FCA financial*<br>*records requirement). Synthetic data: 3 years.*|
|**Data Sheet Owner**|*Dr. Nina Kowalski, Lead Data Scientist*|
|**Board Approved Date**|*18 March 2026*|

**OUTPUT**

**BB-001**

### Bias Baseline Report

Owner: Ethics & Fairness Lead + Data Scientist   |   Phase: Phase 3: Data Strategy

|**Baseline Date**|*Pre-training assessment — 20 March 2026*|
|---|---|
|**Reference Model**|*Current rule-based scorecard (legacy system)*|
|**Fairness Framework**|*Demographic Parity + Equalized Odds + Individual Fairness*|

|**Fairness Framework**<br>**Fairness Metric**|*Demogr*<br>**Group**<br>**Comparison**|*aphic Parity + Equaliz*<br>**Baseline Value**|*ed Odds + Indi*<br>**Target**<br>**Threshold**|*vidual Fairness*<br>**Mitigation Strategy**|
|---|---|---|---|---|
|Approval Rate<br>Parity|Age 18–25 vs<br>35–45|+18.2pp gap<br>(younger<br>applicants<br>approved less<br>often)|2.0pp|Resampling + fairness<br>constraint in training|
|Approval Rate<br>Parity|Postcode Q1<br>(most deprived)<br>vs Q4|+24.1pp gap<br>(deprived areas<br>approved less<br>often)|2.0pp|Alternative data inclusion;<br>postcode excluded as feature|
|False Negative<br>Rate Equity|Age 18–25|2.3× higher than<br>35–45<br>(creditworthy<br>youth rejected<br>more)|1.2×|Cost-sensitive learning;<br>SMOTE for young applicants|
|False Positive<br>Rate Equity|Postcode Q1|1.8× higher than<br>Q4 (more defaults<br>in deprived areas<br>approved)|1.2×|Calibrated thresholds per risk<br>segment|
|Model<br>Calibration|All groups|Brier score 0.14<br>overall; 0.19 for<br>Age 18–25 (worse)|<0.15 all<br>groups|Separate calibration per age<br>band|
|**Bias Baseline Conclusion**|*SIGNIFI*<br>*delta <2*<br>*deploym*|*CANT bias found in le*<br>*pp and equalized odd*<br>*ent approval.*|*gacy system.*<br>*s ratio <1.2× a*|*AI model must achieve demographic parity*<br>*cross all measured groups before*|

**PHASE 4**

## Model Design & Architecture

Design AI system architecture aligned with governance constraints and compliance requirements

**INPUTS TO THIS PHASE**

→ Data Sheet (DS-001)

**OUTPUTS FROM THIS PHASE**

→ Architecture Decision Record (ADR-001)

→ Risk Classification (RCS-001) → Constitutional AI Policy (CAP-001)

→ Compliance Obligation Matrix (COM-001) → Model Card Draft (MCD-001) → FRIA (FRIA-001) → AI Threat Model (ATM-001)

→ Explainability Design (EXD-001)

**ADR-001**

### Architecture Decision Record

Owner: AI Architect   |   Phase: Phase 4: Architecture

|**ADR ID**|*ADR-2026-FIN-047-001*|
|---|---|
|**Title**|*Model Architecture Selection: XGBoost Ensemble + LLM Adverse Action Generator*|
|**Status**|*ACCEPTED — Architecture Review Board 2 April 2026*|
|**Deciders**|*Rahul Mehta (AI Architect), Dr. Nina Kowalski (Lead DS), Priya Sharma (Compliance),*<br>*James Hartley (CRO)*<br>**DECISION**|
|**Decision**|*XGBoost gradient boosting ensemble for primary credit scoring. SHAP for feature*<br>*attribution and reason code generation. GPT-4o fine-tuned on FCA adverse action*<br>*templates for human-readable rejection notices. Redis feature cache for sub-100ms*<br>*inference.*|
|**Context**|*Need: real-time scoring (<200ms p99), regulatory explainability (reason codes), thin-file*<br>*capability (alternative data), demographic fairness constraints*|

**OPTIONS CONSIDERED**

|**Option**|**Architecture**|**Performa**<br>**nce**|**Complexit**<br>**y**|**Explainabili**<br>**ty**|**Regulatory Fit**|
|---|---|---|---|---|---|
|Option A<br>(Selected)|XGBoost + SHAP +<br>GPT-4o|HIGH|MEDIUM|HIGH|HIGH — full SHAP<br>reason codes; LLM<br>narration|
|Option B|Deep Neural Network +<br>LIME|HIGH|HIGH|MEDIUM|MEDIUM — LIME less<br>reliable for tabular data|
|Option C|Logistic Regression<br>scorecard|LOW|LOW|HIGH|HIGH — fully<br>transparent but low<br>performance on thin-file|
|Option D|Black-box LLM (GPT-4o<br>end-to-end)|HIGH|HIGH|LOW|LOW — cannot satisfy<br>regulatory explainability|

> **Consequences** *(+) Best performance + explainability + regulatory compliance. (* − *) Two-model architecture adds deployment complexity. LLM fine-tuning cost £18K one-time. Requires LLMOps monitoring for GPT component.*

**OUTPUT**

**CAP-001**

### Constitutional AI Policy Document

Owner: AI Governance Council   |   Phase: Phase 4: Architecture

|**Field**|**Value**|
|---|---|
|**System Name**|*Credit Risk AI Scoring Model (AUC-2026-FIN-047)*|
|**Policy Version**|*v1.0 — Approved 5 April 2026*|
|**Policy Owner**|*Priya Sharma, AI Compliance Lead*|
|**Review Cycle**|*Quarterly or upon any regulatory change*|
|**#**|**Principle**|**Policy Statement**|**Implementation Controls**|
|P<br>1|Harmlessn<br>ess|This system must not generate credit<br>decisions that cause unjustified financial<br>harm. All decisions must be backed by<br>explainable, auditable evidence. No<br>output may be used to discriminate<br>against protected groups.|Demographic parity monitoring; HITL<br>override; adverse action audit trail|
|P<br>2|Honesty|The system must not fabricate or<br>embellish adverse action reasons. All<br>reason codes must be traceable to<br>actual model feature contributions<br>(SHAP values). Uncertainty in<br>predictions must be communicated to<br>human reviewers.|SHAP attribution verification; confidence<br>score thresholds; human review triggers<br>below 70% confidence|
|P<br>3|Fairness|The system must achieve demographic<br>parity delta <2pp and equalized odds<br>ratio <1.2× across age bands and<br>postcode deprivation quintiles. Any<br>detected bias triggers automatic review<br>and potential model suspension.|Continuous fairness monitoring in Phase 8;<br>automated bias alert at >1.5× delta; quarterly<br>external audit|
|P<br>4|Privacy|PII must be masked before LLM<br>processing. No applicant PII may appear<br>in LLM prompts or responses. All<br>inference logs must be encrypted. Data<br>retained only within policy limits.|Presidio PII masker in LLM pipeline;<br>encrypted audit logs; automated retention<br>enforcement|
|P<br>5|Transpare<br>ncy|Every applicant receiving a credit<br>decision must receive a clear<br>explanation. The system must never<br>deny knowing it is AI. Human review<br>must be offered to every rejected<br>applicant.|100% adverse action notice generation;<br>"AI-powered" disclosure; appeal mechanism<br>in UI|

|P<br>6|Human<br>Oversight|All decisions below 70% confidence<br>must be flagged for human review. All<br>appeals trigger human review. CRO has<br>authority to suspend the system at any<br>time. No autonomous credit limit<br>changes above £5,000.|HITL workflow in core banking; confidence<br>threshold monitoring; CRO kill switch; action<br>boundary register|
|---|---|---|---|
|P<br>7|Regulatory<br>Complianc<br>e|The system must comply with EU AI Act,<br>UK Equality Act, UK GDPR, FCA SYSC<br>23, and ECOA-equivalent adverse<br>action requirements at all times.<br>Regulatory changes trigger immediate<br>compliance review.|Automated regulatory change scanning;<br>compliance obligation matrix; quarterly legal<br>review|
|P<br>8|Security &<br>Robustnes<br>s|The system must resist prompt injection<br>in the LLM component. The XGBoost<br>model must maintain performance under<br>distributional shift. Adversarial credit<br>applications must not destabilize<br>scoring.|Input validation; prompt injection scanner;<br>drift monitoring; adversarial robustness<br>testing in Phase 6|

**OUTPUT**

**MCD-001**

### Model Card (Draft)

Owner: Lead Data Scientist   |   Phase: Phase 4: Architecture

|**Model Name**|*CreditRisk-XGB-v1.0*|
|---|---|
|**Model Type**|*XGBoost Gradient Boosting Classifier (binary: creditworthy / not creditworthy)*|
|**Intended Use**|*Automated credit scoring for retail lending applications at [Bank Name] UK*|
|**Out-of-Scope Uses**|*Commercial lending, mortgage decisioning, insurance pricing, fraud detection (separate*<br>*models required)*|
|**Primary Users**|*Automated system (80% of decisions); Human credit analysts (20% of decisions; all*<br>*appeals)*|
|**Training Data**|*As per Data Sheet DS-001. 2.3M records, 36 months, Jan 2023–Dec 2025*|
|**Evaluation Data**|*Hold-out test set: 15% stratified split. Temporal validation: most recent 3 months*<br>*reserved.*|
|**Model Limitations (Draft — updated**<br>**in Phase 6)**|*Performance gap for thin-file applicants (N<12 months credit history); Postcode proxy*<br>*effects require monitoring; LLM narrative component may hallucinate reason details —*<br>*SHAP values are ground truth*|
|**Performance Metrics (Draft — TBC in**<br>**Phase 6)**|*AUC-ROC target >0.82; Gini >0.64; KS statistic >0.42; Demographic parity delta <2pp*|
|**Model Card Status**|*DRAFT — To be finalized in Phase 6 post evaluation*|
