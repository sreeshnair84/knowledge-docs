---
title: "AIDLC Input & Output Artifact s** **<u>Templates & Example</u>"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "AIDLC_Artifact_Reference_Library.pdf"
doc_type: guide
tags: ["ai-development", "software-engineering"]
last_reviewed: 2026-07-10
framework_name: ""
covers_version: "N/A"
---
# **AIDLC Input & Output Artifact s** **<u>Templates & Example</u>** 

#### All 8 AIDLC Phases · EA Artifacts · Phase Gates 

Every artifact shown as a live template with field definitions and example content 

Companion to: AIDLC Enterprise Framework 2025 & Enterprise Architecture Impact of AIDLC & AI Tools 2026 

## **HOW TO READ THIS DOCUMENT** 

|**Element**|**Description**|
|---|---|
|Phase Header|Coloured banner for each AIDLC phase with phase number, name, and<br>governance gate|
|I/O Flow Box|Green left = inputs consumed by this phase. Blue right = artifacts produced by<br>this phase|
|Artifact Card|Each artifact shown as a template. The coloured badge (INPUT/OUTPUT/EA)<br>indicates artifact role|
|Field Grid|Gray background = field label. Blue italic text = example value you would fill in for<br>a real project|
|Table Sections|Structured tables within artifacts (e.g., risk register rows, bias metrics) shown with<br>example data|
|Section Bars|Dark coloured bars separate major sections within each artifact template|

**_EXAMPLE CONTENT: All field values shown in blue italic are illustrative examples for a hypothetical "Credit Risk AI Scoring Model" use case at a financial services enterprise. Replace all blue italic values with your actual project data._** 

###### **PHASE** 

**1** 

## **Discovery & Ideation** 

**AI Governance Council Registration** 

Define the AI use case, business value hypothesis, and initial feasibility signal 

###### **INPUTS TO THIS PHASE** 

→ Strategic Business Goals 

→ Market / Competitive Analysis 

→ Stakeholder Pain Points 

→ Regulatory Landscape Brief 

###### **OUTPUTS FROM THIS PHASE** 

→ AI Use Case Charter (AUC-001) 

→ Business Value Canvas (BVC-001) 

→ Initial Risk Classification Sheet (RCS-001) 

- → Executive Sponsor Sign-off (ESO-001) 

###### **AUC-001** 

### **AI Use Case Charter** 

Owner: Business Owner / Product Manager   |   Phase: Phase 1: Discovery 

###### **CHARTER IDENTIFICATION** 

|**Use Case ID**|_AUC-2026-FIN-047_|
|---|---|
|**Use Case Name**|_Credit Risk AI Scoring Model — Retail Lending_|
|**Business Domain**|_Retail Banking — Credit Risk Management_|
|**Business Owner**|_Sarah Chen, VP Credit Risk, Retail Banking_|
|**Product Manager**|_David Okafor, Senior PM, AI & Analytics_|
|**Date Initiated**|_12 February 2026_|
|**Charter Version**|_v1.2_|
|**Status**|_Approved — Proceeding to Phase 2_|
||**PROBLEM STATEMENT**|
|**Problem Statement**|_The current credit scoring process takes 72 hours on average, relies on manual review_<br>_for 40% of applications, and results in a 12% false-rejection rate for creditworthy_<br>_customers in underserved segments. This causes customer churn, missed revenue, and_<br>_equity concerns._|
|**Business Pain Points**|_72-hour decision cycle; 40% manual review burden; 12% false-rejection rate; Inability to_<br>_serve thin-file customers; Manual process inconsistency across regions_|
|**Target Opportunity**|_Reduce decision time to <60 seconds for 80% of applications; reduce false-rejection_<br>_rate to <5%; enable thin-file credit assessment via alternative data_|
||**AI SOLUTION HYPOTHESIS**|
|**Proposed AI Solution**|_ML-based credit scoring model using gradient boosting + alternative data (utility_<br>_payments, rent history) combined with LLM-powered adverse action explanation_<br>_generator_|

|**AI Approach**|_Supervised ML classification (creditworthy / not creditworthy) + RAG-powered_<br>_explanation generation for regulatory adverse action notices_|
|---|---|
|**AI vs Non-AI Decision**|_AI preferred: decision volume (50,000/month), pattern complexity, regulatory_<br>_explainability requirement, real-time speed requirement. Non-AI alternatives (rule_<br>_engine, scorecard) evaluated and rejected._|
|**Build vs Buy vs Fine-Tune**|_Buy: Foundation credit risk models (FICO, Equifax). Fine-tune: LLM for adverse action_<br>_explanation. Build: Alternative data pipeline and ensemble orchestration._|

###### **ROI & VALUE HYPOTHESIS** 

|**Metric**|**Baseline**|**AI Target**<br>**Annual Value Impact**|
|---|---|---|
|Decision Cycle Time|72 hours|<60 seconds<br>£2.1M saved (FTE reduction + faster revenue<br>recognition)|
|Manual Review<br>Rate|40%|<8%<br>£1.4M saved (analyst hours)|
|False Rejection<br>Rate|12%|<5%<br>£3.8M recovered revenue (re-captured<br>creditworthy customers)|
|Customer NPS<br>(Credit)|34|>55<br>Brand value; reduced churn|
|Total Projected<br>Annual ROI|—|—<br>£7.3M (payback period: 9 months)|
|||**INITIAL RISK FLAGS**|
|**Preliminary EU AI Act Tier**|_HIGH R_<br>_assess_|_ISK — Annex III Category: Access to financial services (creditworthiness_<br>_ment). Full AIDLC + FRIA required._|
|**Protected Attributes Involved**|_Age, G_<br>_mandat_|_ender, Ethnicity, Postcode (proxy for protected attributes). Bias mitigation_<br>_ory from Phase 3._|
|**Regulatory Bodies**|_FCA (U_|_K), PRA, ICO, EU AI Act National Competent Authority (if EU customers)_|
|**Explainability Requirement**|_MANDA_<br>_with sp_|_TORY — ECOA/Regulation B-equivalent (UK) requires adverse action notice_<br>_ecific reason codes. Every rejection must be explainable._|

||**EXECUTIVE SPONSOR SIGN-OFF**<br>|
|---|---|
|**Executive Sponsor**|_James Hartley, Chief Risk Officer_|
|**Sign-off Date**|_19 February 2026_|
|**Approval Conditions**|_1. Full FRIA completed before development begins. 2. External fairness audit in Phase_<br>_6. 3. Quarterly bias monitoring post-deployment._|
|**Escalation Path**|_AI Governance Council_→_CRO_→_Board Risk Committee_|

**BVC-001** 

### **Business Value Canvas** 

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

###### **OUTPUT** 

|**RCS-001**|
|---|

### **Initial Risk Classification Sheet** 

Owner: AI Governance Council   |   Phase: Phase 1: Discovery 

|**Use Case ID**|_AUC-2026-FIN-047_|
|---|---|
|**EU AI Act Annex III Check**|_YES — Category 5(b): AI used for creditworthiness assessment of natural persons_|
|**Assigned Risk Tier**|_TIER 2 — HIGH RISK_|
|**FRIA Required**|_YES — Fundamental Rights Impact Assessment mandatory_|
|**External Audit Required**|_YES — Independent conformity assessment before deployment_|
|**Governance Intensity**|_Full AIDLC all 8 phases; AI Governance Council sign-off at Phases 2, 4, 6, 7_|
|**Classification Approved By**|_Priya Sharma, AI Compliance Lead_|
|**Classification Date**|_22 February 2026_|

**PHASE 2** 

## **Feasibility & Risk Assessment** 

Validate technical feasibility, assess full risk exposure, obtain governance approval to proceed 

**INPUTS TO THIS PHASE OUTPUTS FROM THIS PHASE** → AI Use Case Charter (AUC-001) → Feasibility Report (FR-001) → Business Value Canvas (BVC-001) → AI Risk Register (RR-001) → Initial Risk Classification (RCS-001) → FRIA (FRIA-001) → TPRM Vendor Assessment (TPRM-001) → Compliance Obligation Matrix (COM-001) 

**OUTPUT FR-001 Technical Feasibility Report** Owner: AI Architect + Data Architect   |   Phase: Phase 2: Feasibility 

###### **TECHNICAL FEASIBILITY ASSESSMENT** 

|**Data Availability**|_Bureau data: HIGH availability (Equifax, Experian APIs). Alternative data (utility):_<br>_MEDIUM (3 providers identified, contract negotiation required). Thin-file historical:_<br>_LIMITED — synthetic augmentation required._|
|---|---|
|**Data Volume Assessment**|_Training set: 2.3M historical applications (36 months). Positive class ratio: 73%_<br>_approved. Class imbalance strategy: SMOTE + cost-sensitive learning._|
|**Model Approach Selected**|_XGBoost ensemble (primary scorer) + SHAP explainer (feature importance) + GPT-4o_<br>_fine-tuned (adverse action narrative generation). Architecture: RAG for regulatory_<br>_reason code library._|
|**Infrastructure Feasibility**|_Azure ML available for training. Azure AI Content Safety for LLM outputs. Inference_<br>_SLA: p99 <200ms achievable with KServe + model caching. GPU budget: £45K/year_<br>_training, £28K/year inference._|
|**Integration Feasibility**|_Core banking API (Temenos): REST available, 200ms SLA. Bureau APIs: SOAP to_<br>_REST adapter required (2 weeks build). Event streaming: Azure Event Hubs available._|
|**Team Capability Assessment**|_ML Engineers: 3 available (2 FTE dedicated). Data Scientists: 2 (credit domain_<br>_expertise). Data Engineers: 2. MLOps: 1 (upskilling required for LLMOps). Gap: LLM_<br>_fine-tuning expertise — external support needed._|
|**Overall Feasibility Verdict**|_FEASIBLE with conditions: (1) Alternative data contracts signed by Week 8. (2) LLM_<br>_fine-tuning specialist engaged. (3) FRIA completed before Phase 4._|

**RR-001** 

### **AI Risk Register** 

Owner: AI Compliance Lead + Model Risk Manager   |   Phase: Phase 2: Feasibility 

|**ID**<br>**Risk Name**|**Impa**|**Likelih**|**Rating**|**Description**|**Mitigation**|**Stat**|
|---|---|---|---|---|---|---|
||**ct**|**ood**||||**us**|

|RR-0<br>1|Algorithmic Bias|HIGH|HIGH|CRITIC<br>AL|Demographic bias in<br>credit scoring causing<br>disparate impact on<br>protected groups|SHAP bias monitoring;<br>fairness metrics at every<br>phase; external audit<br>Phase 6; HITL override<br>capability|Ope<br>n|
|---|---|---|---|---|---|---|---|
|RR-0<br>2|Data Quality<br>Failure|HIGH|MEDIU<br>M|HIGH|Poor alternative data<br>quality leading to<br>model degradation<br>and wrong decisions|Data quality gates in<br>Phase 3; automated<br>quality monitoring in<br>Phase 8; fallback to<br>bureau-only scoring|Ope<br>n|
|RR-0<br>3|Regulatory Non-<br>Compliance|HIGH|MEDIU<br>M|HIGH|Failure to comply with<br>EU AI Act, FCA rules,<br>or adverse action<br>notice requirements|FRIA; legal review at<br>Phases 2,4,6; external<br>conformity assessment;<br>compliance obligation<br>matrix|Ope<br>n|
|RR-0<br>4|Explainability<br>Failure|HIGH|LOW|MEDIU<br>M|Model unable to<br>generate compliant<br>adverse action<br>reasons; black-box<br>rejections|SHAP-based reason<br>codes; LLM adverse<br>action generation; 100%<br>explainability coverage<br>requirement|Ope<br>n|
|RR-0<br>5|Model Drift|MEDI<br>UM|HIGH|HIGH|Model performance<br>degradation<br>post-deployment due<br>to economic or<br>behavioral shifts|Monthly drift monitoring;<br>automated retraining<br>triggers; p-value drift<br>tests; model refresh<br>SLA|Ope<br>n|
|RR-0<br>6|Data Breach<br>(PII)|LOW|HIGH|MEDIU<br>M|PII exposure in<br>training data,<br>inference logs, or<br>LLM prompt/response|Azure Key Vault<br>encryption; PII masking<br>in RAG; Presidio in LLM<br>pipeline; audit log<br>access controls|Ope<br>n|
|RR-0<br>7|Vendor Lock-in|LOW|MEDIU<br>M|LOW|Dependency on<br>single cloud provider<br>or LLM vendor|MLflow open registry;<br>model router<br>abstraction;<br>OpenLineage lineage;<br>LiteLLM multi-provider|Ope<br>n|

**FRIA-001** 

### **Fundamental Rights Impact Assessment** 

Owner: Ethics & Fairness Lead + Legal   |   Phase: Phase 2: Feasibility 

|**System Name**|_Credit Risk AI Scoring Model (AUC-2026-FIN-047)_|
|---|---|
|**FRIA Version**|_v1.0 — Initial Assessment_|
|**Assessment Date**|_5 March 2026_|
|**Lead Assessor**|_Dr. Amara Diallo, Ethics & Fairness Lead_|
|**Legal Counsel**|_Patel & Morrison LLP (FCA regulatory practice)_|
||**AFFECTED POPULATIONS & RIGHTS AT RISK**|

|**Affected Group**|**Fundamental**<br>**Rights at Risk**|**Sever**<br>**ity**|**Potential Impact**|**Mitigation Committed**|
|---|---|---|---|---|
|Retail lending<br>applicants (all)|Access to financial<br>services (Art. 8 EU<br>AI Act; Equality Act<br>2010)|HIGH|Credit denial;<br>financial exclusion|Bias monitoring; HITL override;<br>appeal mechanism|
|Thin-file<br>applicants<br>(young,<br>immigrants, low<br>income)|Non-discrimination;<br>equality of<br>opportunity|HIGH|Systematic<br>exclusion;<br>perpetuation of<br>disadvantage|Alternative data inclusion;<br>demographic parity testing;<br>protected group uplift analysis|
|Rejected<br>applicants|Right to explanation;<br>right to human<br>review|HIGH|Inability to<br>understand or<br>challenge AI<br>decision|100% explainability; adverse<br>action notice; human review<br>process; written appeal channel|
|Employees<br>(model<br>reviewers)|Right to fair working<br>conditions|LOW|New workload<br>patterns; skill<br>obsolescence|Change management; upskilling;<br>clear HITL responsibilities|

> **FRIA Conclusion** _HIGH RISK CONFIRMED — Deployment conditional on: (1) External fairness audit completed in Phase 6. (2) Human review mechanism operational at Phase 7. (3) Written appeal process documented and accessible. (4) Quarterly demographic parity monitoring post-deployment._ 

> **Sign-off** _Dr. Amara Diallo (Ethics Lead) · James Hartley (CRO) · Priya Sharma (Compliance Lead) — 10 March 2026_ 

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

## **3** 

## **Data Strategy & Governance** 

**GATE Data Governance Board Approval** 

Establish data foundation — provenance, quality, privacy, lineage — for trustworthy AI 

###### **INPUTS TO THIS PHASE** 

→ Risk Register (RR-001) 

###### **OUTPUTS FROM THIS PHASE** 

→ Data Sheet / Data Card (DS-001) 

→ Compliance Obligation Matrix (COM-001) → Privacy Impact Assessment (PIA-001) 

→ Feasibility Report (FR-001) 

→ Data Lineage Map (DLM-001) 

→ Bias Baseline Report (BB-001) 

→ Data Processing Agreements (DPA-001) 

**DS-001** 

### **Data Sheet (Data Card)** 

Owner: Data Architect + Data Engineer   |   Phase: Phase 3: Data Strategy 

|**Dataset**|**Source**|**Period**|**Volume**|**Storage**<br>**Location**|**Quality**<br>**Score**|**Classification**|
|---|---|---|---|---|---|---|
|Primary Training<br>Dataset|Equifax<br>credit<br>bureau<br>records|36<br>months<br>(Jan 20<br>23–Dec<br>2025)|2,317,4<br>42<br>records|S3://ml-data-pro<br>d/credit/bureau/|98.7%|PII — Tier 2|
|Utility Payment<br>History|Equiniti /<br>National<br>Grid utility<br>API|24<br>months|847,291<br>records|S3://ml-data-pro<br>d/credit/utility/|94.2%|PII — Tier 2|
|Rent Payment<br>History|Experian<br>Rental<br>Bureau|18<br>months|312,088<br>records|S3://ml-data-pro<br>d/credit/rental/|91.4%|PII — Tier 2|
|Application Data|Temenos<br>core<br>banking<br>(live)|36<br>months|2,317,4<br>42<br>records|Azure SQL: cor<br>ebanking.applic<br>ations|99.1%|PII — Tier 2|
|Outcome Labels<br>(Ground Truth)|Core<br>banking<br>12-month<br>default<br>tracking|36<br>months|2,317,4<br>42<br>labels|S3://ml-data-pro<br>d/credit/labels/|100%|Internal Conf.|
|**Protected Attributes Present**|_Age_<br>_NO_<br>_mo_|_(derived fro_<br>_T collected._<br>_del feature._|_m DOB), po_<br>_Action: post_|_stcode (proxy for e_<br>_code retained for fa_|_thnicity/soc_<br>_irness mon_|_ioeconomic status). Gender_<br>_itoring only — not used as_|
|**Class Imbalance**|_73%_<br>_ove_|_approved (_<br>_rsampling of_|_negative lab_<br>_minority cla_|_el), 27% default (p_<br>_ss + cost-sensitive_|_ositive labe_<br>_learning (F_|_l). Mitigation: SMOTE_<br>_P cost = 3× FN cost)_|

|**Consent Basis**|_GDPR Article 6(1)(b) — Necessary for performance of contract (credit assessment)._<br>_Article 9 profiling permitted under Article 22(2)(a)._|
|---|---|
|**Data Retention Policy**|_Training data: 5 years post-model retirement. Inference logs: 7 years (FCA financial_<br>_records requirement). Synthetic data: 3 years._|
|**Data Sheet Owner**|_Dr. Nina Kowalski, Lead Data Scientist_|
|**Board Approved Date**|_18 March 2026_|

|**OUTPUT**<br>**BB-001**<br>**Bias Baseline Report**<br>Owner: Ethics & Fairness Lead + Data Scientist   |   Phase: Phase 3: Data Strategy|
|---|

|**Baseline Date**|_Pre-training assessment — 20 March 2026_|
|---|---|
|**Reference Model**|_Current rule-based scorecard (legacy system)_|
|**Fairness Framework**|_Demographic Parity + Equalized Odds + Individual Fairness_|

|**Fairness Framework**<br>**Fairness Metric**|_Demogr_<br>**Group**<br>**Comparison**|_aphic Parity + Equaliz_<br>**Baseline Value**|_ed Odds + Indi_<br>**Target**<br>**Threshold**|_vidual Fairness_<br>**Mitigation Strategy**|
|---|---|---|---|---|
|Approval Rate<br>Parity|Age 18–25 vs<br>35–45|+18.2pp gap<br>(younger<br>applicants<br>approved less<br>often)|2.0pp|Resampling + fairness<br>constraint in training|
|Approval Rate<br>Parity|Postcode Q1<br>(most deprived)<br>vs Q4|+24.1pp gap<br>(deprived areas<br>approved less<br>often)|2.0pp|Alternative data inclusion;<br>postcode excluded as feature|
|False Negative<br>Rate Equity|Age 18–25|2.3× higher than<br>35–45<br>(creditworthy<br>youth rejected<br>more)|1.2×|Cost-sensitive learning;<br>SMOTE for young applicants|
|False Positive<br>Rate Equity|Postcode Q1|1.8× higher than<br>Q4 (more defaults<br>in deprived areas<br>approved)|1.2×|Calibrated thresholds per risk<br>segment|
|Model<br>Calibration|All groups|Brier score 0.14<br>overall; 0.19 for<br>Age 18–25 (worse)|<0.15 all<br>groups|Separate calibration per age<br>band|
|**Bias Baseline Conclusion**|_SIGNIFI_<br>_delta <2_<br>_deploym_|_CANT bias found in le_<br>_pp and equalized odd_<br>_ent approval._|_gacy system._<br>_s ratio <1.2× a_|_AI model must achieve demographic parity_<br>_cross all measured groups before_|

**PHASE 4** 

## **Model Design & Architecture** 

Design AI system architecture aligned with governance constraints and compliance requirements 

###### **INPUTS TO THIS PHASE** 

→ Data Sheet (DS-001) 

###### **OUTPUTS FROM THIS PHASE** 

→ Architecture Decision Record (ADR-001) 

→ Risk Classification (RCS-001) → Constitutional AI Policy (CAP-001) 

→ Compliance Obligation Matrix (COM-001) → Model Card Draft (MCD-001) → FRIA (FRIA-001) → AI Threat Model (ATM-001) 

→ Explainability Design (EXD-001) 

**ADR-001** 

### **Architecture Decision Record** 

Owner: AI Architect   |   Phase: Phase 4: Architecture 

|**ADR ID**|_ADR-2026-FIN-047-001_|
|---|---|
|**Title**|_Model Architecture Selection: XGBoost Ensemble + LLM Adverse Action Generator_|
|**Status**|_ACCEPTED — Architecture Review Board 2 April 2026_|
|**Deciders**|_Rahul Mehta (AI Architect), Dr. Nina Kowalski (Lead DS), Priya Sharma (Compliance),_<br>_James Hartley (CRO)_<br>**DECISION**|
|**Decision**|_XGBoost gradient boosting ensemble for primary credit scoring. SHAP for feature_<br>_attribution and reason code generation. GPT-4o fine-tuned on FCA adverse action_<br>_templates for human-readable rejection notices. Redis feature cache for sub-100ms_<br>_inference._|
|**Context**|_Need: real-time scoring (<200ms p99), regulatory explainability (reason codes), thin-file_<br>_capability (alternative data), demographic fairness constraints_|

###### **OPTIONS CONSIDERED** 

|**Option**|**Architecture**|**Performa**<br>**nce**|**Complexit**<br>**y**|**Explainabili**<br>**ty**|**Regulatory Fit**|
|---|---|---|---|---|---|
|Option A<br>(Selected)|XGBoost + SHAP +<br>GPT-4o|HIGH|MEDIUM|HIGH|HIGH — full SHAP<br>reason codes; LLM<br>narration|
|Option B|Deep Neural Network +<br>LIME|HIGH|HIGH|MEDIUM|MEDIUM — LIME less<br>reliable for tabular data|
|Option C|Logistic Regression<br>scorecard|LOW|LOW|HIGH|HIGH — fully<br>transparent but low<br>performance on thin-file|
|Option D|Black-box LLM (GPT-4o<br>end-to-end)|HIGH|HIGH|LOW|LOW — cannot satisfy<br>regulatory explainability|

> **Consequences** _(+) Best performance + explainability + regulatory compliance. (_ − _) Two-model architecture adds deployment complexity. LLM fine-tuning cost £18K one-time. Requires LLMOps monitoring for GPT component._ 

|**OUTPUT**<br>**Constitut**<br>Owner: AI Gove<br>**System Name**|**ional AI P**<br>rnance Council|**olicy Document**<br>|   Phase: Phase 4: Architecture<br>_Credit Risk AI Scoring Model (A_|**CAP-001**<br>_UC-2026-FIN-047)_|
|---|---|---|---|
|**Policy Version**||_v1.0 — Approved 5 April 2026_||
|**Policy Owner**||_Priya Sharma, AI Compliance L_|_ead_|
|**Review Cycle**||_Quarterly or upon any regulator_|_y change_|
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

|**OUTPUT**<br>**MCD-001**<br>**Model Card (Draft)**<br>Owner: Lead Data Scientist   |   Phase: Phase 4: Architecture|
|---|

|**Model Name**|_CreditRisk-XGB-v1.0_|
|---|---|
|**Model Type**|_XGBoost Gradient Boosting Classifier (binary: creditworthy / not creditworthy)_|
|**Intended Use**|_Automated credit scoring for retail lending applications at [Bank Name] UK_|
|**Out-of-Scope Uses**|_Commercial lending, mortgage decisioning, insurance pricing, fraud detection (separate_<br>_models required)_|
|**Primary Users**|_Automated system (80% of decisions); Human credit analysts (20% of decisions; all_<br>_appeals)_|
|**Training Data**|_As per Data Sheet DS-001. 2.3M records, 36 months, Jan 2023–Dec 2025_|
|**Evaluation Data**|_Hold-out test set: 15% stratified split. Temporal validation: most recent 3 months_<br>_reserved._|
|**Model Limitations (Draft — updated**<br>**in Phase 6)**|_Performance gap for thin-file applicants (N<12 months credit history); Postcode proxy_<br>_effects require monitoring; LLM narrative component may hallucinate reason details —_<br>_SHAP values are ground truth_|
|**Performance Metrics (Draft — TBC in**<br>**Phase 6)**|_AUC-ROC target >0.82; Gini >0.64; KS statistic >0.42; Demographic parity delta <2pp_|
|**Model Card Status**|_DRAFT — To be finalized in Phase 6 post evaluation_|

## **Development & Training** 

Build, fine-tune, and train the AI system with full traceability and developer accountability 

###### **INPUTS TO THIS PHASE** 

###### **OUTPUTS FROM THIS PHASE** 

→ Architecture Decision Records (ADR-001) → Experiment Tracking Record (ETR-001) 

→ Constitutional AI Policy (CAP-001) 

→ Data Sheet (DS-001) 

→ Compliance Obligation Matrix (COM-001) 

→ Training Run Log (TRL-001) 

- → Bias Mitigation Report (BMR-001) 

- → AI-Generated Code Audit Log (CAL-001) 

→ Model Registry Entry (MRE-001) 

### **Experiment Tracking Record** 

Owner: Lead Data Scientist   |   Phase: Phase 5: Development 

|**Run**<br>**ID**|**Model Name**|**Config Description**|**AUC-**<br>**ROC**|**Gini**|**KS**<br>**Stat**|**Bias**<br>**Delta**|**Notes**|
|---|---|---|---|---|---|---|---|
|EXP-0<br>01|XGB-Baseline-v<br>0.1|Baseline XGBoost,<br>bureau data only|0.79|0.58|0.38|N/A|Baseline established.<br>Bureau-only<br>insufficient for<br>thin-file.|
|EXP-0<br>08|XGB-AltData-v0<br>.3|+ Utility + Rental data<br>added|0.83|0.66|0.44|18.2pp<br>age gap|Significant<br>improvement. Bias<br>still present.|
|EXP-0<br>14|XGB-FairConstr<br>-v0.6|+ Fairness constraint<br>(exponentiated gradient)|0.82|0.64|0.43|3.1pp<br>age gap|Bias reduced. Minor<br>perf sacrifice<br>acceptable.|
|EXP-0<br>19|XGB-SMOTE-v<br>0.8|+ SMOTE oversampling<br>for young applicants|0.83|0.65|0.43|1.8pp<br>age gap|Target threshold<br>achieved. Calibration<br>check needed.|
|EXP-0<br>23|XGB-Final-v1.0|+ Calibrated thresholds<br>per segment|0.83|0.65|0.43|1.8pp<br>age gap|SELECTED. All<br>targets met.<br>Proceeding to Phase<br>6.|
|**Experiment Tra**|**cking Platform**|_MLflow — Azure ML_<br>_Azure Blob. Reprodu_|_workspa_<br>_cibility: r_|_ce. All e_<br>_andom s_|_xperiment_<br>_eeds fixe_|_s versioned_<br>_d; data vers_|_. Run artifacts stored in_<br>_ion pinned via DVC tag v1.0._|
|**Selected Model**|**Run**|_EXP-023 — XGB-Fi_<br>_CreditRisk-XGB-v1.0_|_nal-v1.0._<br>_stage: S_|_Register_<br>_taging._|_ed in MLf_|_low Model R_|_egistry as_|

**CAL-001** 

### **AI-Generated Code Audit Log** 

Owner: Tech Lead + All Engineers   |   Phase: Phase 5: Development 

|**Date**|**File / Lines**|**AI Tool**|**Description**|**Reviewer**|**Status**|**Review Notes**|
|---|---|---|---|---|---|---|
|2026-04-<br>08|feature_enginee<br>ring.py (lines<br>142–210)|GitHub<br>Copilot|Utility payment<br>aggregation<br>pipeline<br>(12-month<br>rolling statistics)|David Lee<br>(ML Eng)|APPROVE<br>D|Minor: column naming<br>inconsistency fixed. Logic<br>verified against Data Sheet<br>DS-001. No hallucinated<br>column names.|
|2026-04-<br>11|xgb_trainer.py<br>(lines 45–89)|Amazon<br>Q Develo<br>per|XGBoost<br>hyperparameter<br>tuning loop with<br>cross-validation|Sarah<br>Wong (ML<br>Eng)|APPROVE<br>D|Logic correct. Added explicit<br>random_state for<br>reproducibility (AI missed<br>this). Verified against<br>EXP-019 config.|
|2026-04-<br>14|adverse_action_<br>prompt.py (lines<br>1–156)|GitHub<br>Copilot|LLM prompt<br>template for<br>adverse action<br>notice<br>generation|Raj Patel<br>(ML Eng)|APPROVE<br>D WITH C<br>HANGES|AI generated<br>plausible-looking but<br>non-FCA-compliant reason<br>codes. Legal reviewed and<br>corrected 3 reason code<br>templates. CRITICAL fix.|
|2026-04-<br>17|fairness_monito<br>r.py (lines 1–98)|Amazon<br>Q Develo<br>per|SHAP-based<br>demographic<br>parity<br>monitoring<br>pipeline|David Lee<br>(ML Eng)|APPROVE<br>D|Logic verified against BB-001<br>bias baseline methodology.<br>Protected attribute handling<br>confirmed correct.|
|**AWS AI-DLC M**|**andate Compliance**|_All eng_<br>_AI-gen_<br>_LLM pr_|_ineers have review_<br>_erated code commi_<br>_ompt templates req_|_ed and under_<br>_tted without u_<br>_uire legal rev_|_stood every li_<br>_nderstanding_<br>_iew — not jus_|_ne of AI-generated code. No_<br>_verification sign-off. Critical finding:_<br>_t technical review._|

###### **PHASE** 

**6** 

## **Evaluation & Red-Teaming** 

**AI Governance Council Deployment Authorisation** 

Rigorously validate against safety, fairness, performance, and Constitutional AI requirements 

###### **INPUTS TO THIS PHASE** 

- → Model Registry Entry (MRE-001) 

- → Constitutional AI Policy (CAP-001) 

- → Model Card Draft (MCD-001) 

- → Bias Baseline Report (BB-001) 

###### **OUTPUTS FROM THIS PHASE** 

- → Red Team Report (RTR-001) 

- → Fairness Evaluation Report (FER-001) 

- → Performance Benchmark Report (PBR-001) 

- → Constitutional Compliance Audit (CCA-001) 

- → Final Model Card (MCF-001) 

- → Security Penetration Test (SPT-001) 

###### **OUTPUT** 

**RTR-001** 

### **Red Team Report** 

Owner: Security Architect + Ethics Lead   |   Phase: Phase 6: Evaluation 

> **Red Team Conducted** _14–18 April 2026_ 

> **Red Team Lead** _Marcus Thompson, Security Architect_ 

> **Team Composition** _2 internal security engineers, 1 external AI red-team specialist (NCC Group), 1 fairness researcher (external)_ 

> **Scope** _XGBoost scorer, LLM adverse action generator, API endpoints, data pipeline_ 

|**ID**|**Attack Vector**|**Method**|**Finding**|**Sever**<br>**ity**|**Remediation**|**Status**|
|---|---|---|---|---|---|---|
|RT-<br>01|Adversarial<br>Credit<br>Application|Submit<br>crafted<br>application<br>designed to<br>game scoring<br>model|XGBoost model<br>accepted application<br>with 73%<br>confidence (above<br>threshold). Model<br>not robust to feature<br>manipulation.|HIGH|Feature consistency<br>validation layer added<br>before scoring.<br>Anomaly detection on<br>application feature<br>patterns.|Resolve<br>d|
|RT-<br>02|Prompt Injection<br>(LLM<br>Component)|Inject<br>instruction in<br>applicant nam<br>e/address<br>fields|LLM successfully<br>rejected 9/10<br>injection attempts. 1<br>case caused role<br>confusion ("ignore<br>previous<br>instructions").|MEDI<br>UM|Lakera Guard prompt<br>injection scanner<br>added. Input<br>sanitisation<br>strengthened. System<br>prompt hardened.|Resolve<br>d|
|RT-<br>03|Demographic<br>Attribute<br>Inference|Probe API<br>responses to<br>infer<br>protected<br>attribute<br>decisions|SHAP values in API<br>response revealed<br>postcode-correlated<br>scores potentially<br>inferring ethnicity.|HIGH|Postcode SHAP<br>values removed from<br>API response.<br>Internal only.<br>Aggregate statistics<br>only in adverse action<br>notice.|Resolve<br>d|

|RT-<br>04|Adverse Action<br>Hallucination|Query LLM<br>for rejection<br>reasons not<br>supported by<br>SHAP values|LLM generated<br>plausible-sounding<br>but factually<br>incorrect reason<br>codes in 3/50 test<br>cases (6%).|HIGH|SHAP verification<br>gate: LLM reasons<br>validated against<br>top-5 SHAP features<br>before delivery.<br>Human review if<br>mismatch.|Resolve<br>d|
|---|---|---|---|---|---|---|
|RT-<br>05|Model<br>Extraction|Reverse-engi<br>neer model<br>logic via<br>high-volume<br>API queries|Insufficient data to<br>reconstruct model in<br>10,000 queries.<br>Rate limiting<br>effective.|LOW|Rate limiting<br>confirmed effective.<br>Anomaly detection on<br>unusual query<br>patterns.|Accepte<br>d|
|**Red Team Verdict**||_CONDITIO_<br>_Medium/Lo_<br>_confirmed r_<br>_constitution_|_NAL PASS — All HIGH_<br>_w findings resolved or_<br>_emediation adequate._<br>_al compliance audit._|_severity_<br>_accepted_<br>_Deployme_|_findings resolved before_<br>_with monitoring. Externa_<br>_nt may proceed subject_|_this report._<br>_l red team specialist_<br>_to CCA-001_|

**OUTPUT Fairness Evaluation Report** Owner: Ethics & Fairness Lead (External Auditor)   |   Phase: Phase 6: Evaluation 

**FER-001** 

||**Metric**|**Protected**<br>**Groups**|**Baseline**<br>**Value**|**AI Model**<br>**Value**|**Thresh**<br>**old**|**Result**|
|---|---|---|---|---|---|---|
||Demographic<br>Parity —<br>Approval Rate|Age: 18–25 vs<br>35–45|+18.2pp<br>(baseline)|+1.6pp (AI<br>model)|2.0pp|PASS|
||Demographic<br>Parity —<br>Approval Rate|Postcode<br>Quintile 1 vs 5|+24.1pp<br>(baseline)|+1.9pp (AI<br>model)|2.0pp|PASS|
||Equalized Odds<br>— FNR|Age: 18–25|+2.3×<br>(baseline)|+1.15× (AI<br>model)|1.2×|PASS|
||Equalized Odds<br>— FNR|Postcode Q1|+1.8×<br>(baseline)|+1.18× (AI<br>model)|1.2×|PASS|
||Individual<br>Fairness|Counterfactual<br>gender swap|N/A (not<br>tested in<br>legacy)|0.4% decision<br>change rate<br>on gender|<1%|PASS|
||Calibration|Age 18–25<br>(worst group)|Brier 0.19<br>(baseline)|Brier 0.14 (AI<br>model)|<0.15|PASS|
||Adverse Action<br>Parity|Protected vs<br>non-protected|N/A|Reason code<br>distribution<br>parity: p=0.31<br>(not<br>significant)|p>0.05|PASS|
|**External Auditor**||_Algorithmic Jus_|_tice Institute (A_|_JI) — Independe_|_nt External_|_Fairness Audit_|
|**Audit Conclusion**||_AI Model PASS_<br>_legacy scoreca_<br>_recommended._|_ES all fairness_<br>_rd. Ongoing m_|_thresholds. Repr_<br>_onitoring mandato_|_esents sub_<br>_ry. Annual i_|_stantial improvement over_<br>_ndependent audit_|

###### **Auditor Sign-off** 

_Dr. Yetunde Adeyemi (AJI), 22 April 2026_ 

###### **OUTPUT** 

**CCA-001** 

**Constitutional AI Compliance Audit** Owner: AI Compliance Lead   |   Phase: Phase 6: Evaluation 

|**Principle**|**Test Approach**|**Findings**|**Status**|
|---|---|---|---|
|P1 — Harmle<br>ssness|Test 50 adversarial<br>applications; measure<br>unjustified harm rate|All 50 evaluated; 2 borderline cases sent to<br>HITL. 0 clearly harmful decisions. Harm rate:<br>0%.|PASS|
|P2 —<br>Honesty|Verify 100 adverse<br>action notices against<br>SHAP ground truth|97/100 notices accurate. 3 cases:<br>SHAP-LLM mismatch detected and caught<br>by verification gate. 0 undetected<br>inaccuracies.|PASS|
|P3 —<br>Fairness|Full FER-001<br>evaluation|All fairness thresholds met. See FER-001.|PASS|
|P4 — Privacy|Test PII masking on<br>200 LLM prompts|0 PII leakage in LLM prompts/responses.<br>Presidio masking 100% effective on test set.|PASS|
|P5 —<br>Transparency|100 test decisions:<br>verify disclosure +<br>explanation availability|100/100 decisions produced adverse action<br>notice. AI disclosure text present in 100% of<br>UI flows.|PASS|
|P6 — Human<br>Oversight|Test HITL trigger on<br>100 low-confidence<br>decisions|HITL triggered correctly in 48/48 sub-70%<br>confidence cases. Human review queue<br>operational.|PASS|
|P7 —<br>Regulatory<br>Compliance|Legal review of all<br>adverse action reason<br>codes|FCA legal counsel (Patel & Morrison)<br>confirmed all 28 reason codes compliant.|PASS|
|P8 —<br>Security &<br>Robustness|Cross-reference with<br>Red Team Report<br>RTR-001|All HIGH/MEDIUM findings resolved. See<br>RTR-001.|PASS|
|**Constitutional Compliance Rate**|_100% (8/8 princi_|_ples PASS)_||
|**Overall Audit Conclusion**|_APPROVED FO_<br>_Phase 8 artifacts_|_R DEPLOYMENT — Subject to production m_<br>|_onitoring as specified in_|

###### **PHASE** 

**7** 

## **Deployment & MLOps** 

**AI Governance Council Final Deployment Approval** 

Deploy with full operational governance, safety controls and human oversight mechanisms active 

###### **INPUTS TO THIS PHASE** 

→ Final Model Card (MCF-001) 

- → Red Team Report (RTR-001) 

→ Constitutional Compliance Audit (CCA-001) 

- → Governance Approval (from Phase 6) 

###### **OUTPUTS FROM THIS PHASE** 

→ Deployment Runbook (DRB-001) 

→ Incident Response Plan (IRP-001) 

- → Audit Log Configuration (ALC-001) 

- → User Disclosure Documentation (UDD-001) 

- → Runtime Monitoring Dashboard Spec (RMD-001) 

###### **OUTPUT** 

**DRB-001** 

### **Deployment Runbook** 

Owner: MLOps Engineer + DevOps   |   Phase: Phase 7: Deployment 

|**Model**|||_CreditRisk-XGB-v1.0 + Adverse_|_Action-GPT-v1.0_|||
|---|---|---|---|---|---|---|
|**Deploym**|**ent Strategy**||_Blue/Green Deployment with 5_|_% Canary for 72 h_|_ours before full_|_traffic_|
|**Target E**|**nvironment**||_Azure Kubernetes Service (AK_|_S) — prod-credit-_|_scoring-cluster_||
|**Deploym**|**ent Owner**||_Priya Patel, MLOps Engineer_||||
||**Step**|**Phase**|**Action**|**Owner**|**Type**|**SLA**|
||PRE-<br>01|Pre-flight|Verify model artifacts match signed<br>registry entry (SHA-256 hash check)|MLOps<br>Engineer|MANUAL|<5 min|
||PRE-<br>02|Pre-flight|Confirm all runtime guardrails active:<br>Lakera Guard, Presidio, Azure<br>Content Safety|Security<br>Engineer|AUTOMA<br>TED|<2 min|
||PRE-<br>03|Pre-flight|Verify audit log stream connected to<br>Splunk SIEM|MLOps<br>Engineer|AUTOMA<br>TED|<1 min|
||DEP-<br>01|Deploy|Deploy to blue/green canary (5%<br>traffic). Monitor error rate, latency,<br>SHAP stability for 72h.|MLOps<br>Engineer|AUTOMA<br>TED|72 hours|
||DEP-<br>02|Deploy|If canary metrics stable: promote to<br>100% traffic. Zero downtime switch.|MLOps<br>Engineer|AUTOMA<br>TED|<5 min|
||POST<br>-01|Post-deplo<br>y|Run post-deployment validation<br>suite: 50 test applications, expected<br>outputs|QA Engineer|AUTOMA<br>TED|<15 min|
||POST<br>-02|Post-deplo<br>y|Activate Phase 8 monitoring: drift<br>alerts, bias alerts, cost dashboard|MLOps<br>Engineer|AUTOMA<br>TED|<5 min|
||ROLL<br>-01|Rollback<br>(if needed)|Revert to previous model version.<br>Route 100% traffic to stable version.<br>Alert AI Governance Council.|MLOps<br>Engineer|SEMI-AUT<br>O|<3 min|

###### **OUTPUT** 

###### **IRP-001** 

### **AI Incident Response Plan** 

Owner: AI Compliance Lead + Security Architect   |   Phase: Phase 7: Deployment 

|**Severity**|**Trigger**|**Response Actions**|**SLA**|
|---|---|---|---|
|P0 —<br>CRITICAL|Systemic bias<br>detected<br>(demographic parity<br>delta >4pp)|Immediate model suspension. CRO and AI<br>Governance Council alerted within 15 min. FCA<br>notification within 24h. External audit<br>commissioned.|<15 min<br>suspend; <24h<br>FCA notify|
|P0 —<br>CRITICAL|Security breach: PII<br>exfiltration via LLM|Model suspension. ICO notification (72h GDPR<br>deadline). Forensic investigation. Customer<br>notification as required.|<15 min<br>suspend; <72h<br>ICO|
|P1 — HIGH|Model accuracy<br>degradation >5%<br>from baseline|HITL rate increased to 100%. Retraining pipeline<br>triggered. AI Governance Council briefed within<br>2h.|<2h escalation;<br><48h retrain|
|P1 — HIGH|Hallucination rate<br>>2% (SHAP-LLM<br>mismatch)|LLM adverse action generator suspended.<br>Fallback to template-based notices. Root cause<br>investigation.|<1h suspend<br>LLM component|
|P2 —<br>MEDIUM|Drift alert: input<br>feature distribution<br>shift >15%|Investigation initiated. Retraining evaluation.<br>Daily monitoring until resolved.|<4h response;<br><5 day resolution|
|P2 —<br>MEDIUM|HITL queue backlog<br>>200 cases|Additional analyst resource assigned. Queue<br>processing time monitored hourly.|<4h resource<br>response|
|P3 — LOW|Single decision<br>complaint / appeal<br>received|Standard appeal process initiated. Human credit<br>analyst reviews within 5 business days.|5 business days|

|**UDD-001**|
|---|

### **User Disclosure Documentation** 

Owner: Legal + Product Manager   |   Phase: Phase 7: Deployment 

|**Customer-Facing Disclosure**<br>**(approved text)**|_Your credit application is assessed using an automated AI system that analyses your_<br>_financial history and alternative data to make a credit decision. You have the right to_<br>_request human review of any automated decision. Please contact us at_<br>_[appeals@bank.com] or call [0800-XXX-XXXX] to exercise this right._|
|---|---|
|**Adverse Action Notice Template**|_We have been unable to approve your credit application at this time. The primary_<br>_reasons for this decision are: [SHAP Reason Code 1: e.g., "Insufficient credit history_<br>_over the past 24 months"]. [SHAP Reason Code 2]. [SHAP Reason Code 3]. This_<br>_decision was made by an AI system. You have the right to request a human review._<br>_Reference: [Decision ID: DEC-XXXXXXX]._|
|**Internal Deployer Disclosure**|_This AI system (CreditRisk-XGB-v1.0) is classified as HIGH RISK under the EU AI Act._<br>_Human oversight is mandatory for all decisions below 70% confidence. The system may_<br>_not be used outside of UK retail lending applications. Bias monitoring reports are_<br>_produced monthly and reviewed by the AI Governance Council._|
|**Right to Explanation Implementation**|_Every rejected applicant receives: (1) Top 3 SHAP-grounded reason codes in plain_<br>_English. (2) Written appeal right with 30-day response SLA. (3) Alternative product_<br>_suggestions where appropriate._|

> **AI Act Article 13 Compliance** _Instructions for deployers provided. System purpose, accuracy, limitations, human oversight requirements, and data sources documented. Legal review: COMPLIANT (Patel & Morrison, 2 May 2026)._ 

## **Monitor, Audit & Retire** 

**Quarterly Governance Review + Annual Compliance Certification** Maintain ongoing trustworthiness through continuous monitoring, audits, and disciplined retirement 

###### **INPUTS TO THIS PHASE** 

###### **OUTPUTS FROM THIS PHASE** 

→ Runtime monitoring data → Monthly Monitoring Report (MMR-001) → Deployment Runbook (DRB-001) → Drift Alert Log (DAL-001) 

- → Audit Log Configuration (ALC-001) → Quarterly Audit Report (QAR-001) 

- → Compliance Obligation Matrix (COM-001) 

- → Regulatory Change Log (RCL-001) 

→ Model Sunset Plan (MSP-001) 

###### **OUTPUT** 

### **Monthly Monitoring Report** 

Owner: MLOps Engineer + Ethics Lead   |   Phase: Phase 8: Monitor 

> **Report Period** _May 2026 (Month 1 post-deployment)_ 

> **Report Prepared By** _Priya Patel (MLOps) + Dr. Amara Diallo (Ethics)_ 

> **Overall Status** _GREEN — All metrics within thresholds_ 

|**Metric**|**Threshold /**<br>**Target**|**May 2026**<br>**Actual**|**Alert Level**||**Status**|
|---|---|---|---|---|---|
|Model Accuracy<br>(AUC-ROC)|0.83<br>(deployment<br>baseline)|0.827|0.79 (alert)|GREEN<br>baseline|— Within 0.4% of|
|Decision Volume|50,000/month<br>(expected)|47,832|<30,000 or<br>>70,000|GREEN<br>range|— Within expected|
|HITL Trigger Rate|8% (Phase 4<br>target)|7.3%|>15% (model<br>degradation<br>signal)|GREEN||
|Demographic Parity<br>Delta|<2.0pp<br>(threshold)|1.7pp|2.0pp<br>(threshold)|GREEN<br>WATCH|— 0.3pp headroom;|
|LLM Hallucination<br>Rate (SHAP<br>mismatch)|<1% (target)|0.4%|>2% (alert)|GREEN||
|Constitutional<br>Compliance Rate|100% (P6<br>baseline)|99.7%|<98% (alert)|GREEN||
|Adverse Action Notice<br>Coverage|100%|100%|<100%<br>(critical fail)|GREEN||
|Mean Inference<br>Latency (p99)|200ms (SLA)|143ms|250ms<br>(breach)|GREEN||

|Cost per Decision|£0.0034<br>(budget)<br>£0.0031|£0.005<br>(budget<br>breach)|GREEN|
|---|---|---|---|
|Open Incidents|0 P0/P1<br>0 P0, 0 P1, 1<br>P2 (resolved)|Any P0 =<br>immediate<br>alert|GREEN|
|**Actions Required**|_WATCH on demographic parit_<br>_frequency for protected group_|_y delta (1.7pp,_<br>_approval rates._|_threshold 2.0pp). Increase monitoring_<br>_No model changes required at this time._|
|**Next Review Date**|_4 June 2026_|||

|**OUTPUT**|**MSP-001**|
|---|---|
|**Model Sunset Plan**<br>Owner: AI Governance Council   |   P|hase: Phase 8: Retire|
|**Model to Retire**|_CreditRisk-XGB-v1.0 (example: when replaced by v2.0)_|
|**Planned Sunset Date**|_To be determined — triggered by: (1) Model drift breach; (2) Regulatory change_<br>_requiring new architecture; (3) Successor model Phase 6 approval_|
|**Sunset Triggers**|_AUC-ROC decline below 0.79 for 2 consecutive months; Demographic parity delta_<br>_exceeds 2.0pp; Successor model CreditRisk-XGB-v2.0 approved_|
|**Data Retention Post-Sunset**|_Training data: retained 5 years per DS-001. Inference logs: retained 7 years (FCA_<br>_requirement). Model artifacts: archived in MLflow, not deleted — required for regulatory_<br>_enquiry response._|
|**Lineage Preservation**|_OpenLineage graphs retained indefinitely. All data-to-model-to-decision lineage_<br>_preserved for audit trail. Accessible via Atlan data catalog._|
|**Customer Impact Management**|_All in-flight applications processed before sunset. No customer disruption. Transition to_<br>_successor model tested in shadow mode for 30 days minimum._|
|**Regulatory Notification**|_FCA notified of system retirement 60 days in advance. EU AI Act post-market_<br>_surveillance report filed at retirement._|

## **Enterprise Architecture Artifacts** 

**Continuous — AI Governance Council** 

Cross-lifecycle artifacts maintained by the EA team and AI Governance Council 

###### **INPUTS TO THIS PHASE** 

→ All AIDLC Phase Artifacts 

→ Business Strategy 

→ Regulatory Frameworks (NIST AI RMF, EU AI Act, ISO 42001) 

###### **OUTPUTS FROM THIS PHASE** 

→ AI System Inventory (ASI-001) 

→ AI Capability Map (ACM-001) 

→ Agent Action Boundary Register (AABR-001) 

→ AI Architecture Decision Record EA (EADR-001) 

→ Data Lineage Map (DLM-001) 

###### **EA ARTIFACT** 

**ASI-001** 

### **AI System Inventory** 

Owner: AI Compliance Lead   |   Phase: Cross-Phase 

|**Use Case ID**|**System Name**|**Risk Tier**|**AIDLC Phase**|**Business Owner**|**Regulations**|**Platform**|
|---|---|---|---|---|---|---|
|AUC-2026-FIN-<br>047|Credit Risk AI Scoring<br>Model|T2 — HIGH<br>RISK|Phase 7<br>(Production)|Sarah Chen (VP<br>Credit Risk)|EU AI Act, FCA, UK<br>GDPR|Azure ML + AKS|
|AUC-2026-OPS<br>-012|Customer Service<br>Copilot|T3 —<br>Limited Risk|Phase 7<br>(Production)|Lena Hoffmann (VP<br>Ops)|EU AI Act Art. 50|Azure OpenAI|
|AUC-2026-MKT<br>-008|Campaign Targeting<br>Model|T4 —<br>Minimal<br>Risk|Phase 5<br>(Development)|Ahmed Al-Rashid<br>(CMO)|GDPR profiling<br>consent|AWS SageMaker|
|AUC-2026-HR-0<br>03|CV Screening Assistant|T2 — HIGH<br>RISK|Phase 2<br>(Feasibility —<br>HOLD)|Maria Santos<br>(CHRO)|EU AI Act Annex III<br>Cat.1|TBD|
|AUC-2026-SEC<br>-019|Fraud Detection Engine|T2 — HIGH<br>RISK|Phase 8 (Monitor)|John Kim (CISO)|EU AI Act,<br>PCI-DSS, FCA|GCP Vertex AI|

> **Last Updated** _8 May 2026_ 

> **Next Review** _8 June 2026 (monthly update cycle)_ 

> **Maintained In** _Collibra AI Data Catalog — accessible to all AI Governance Council members and EA team_ 

**EA ARTIFACT** 

**AABR-001** 

### **Agent Action Boundary Register** 

Owner: AI Architect + Security Architect   |   Phase: Cross-Phase 

**Purpose** 

_Defines the permitted tools, API endpoints, data namespaces, and action types for each deployed AI agent. Source of truth for runtime Zero Trust access control._ 

###### **Enforcement** 

_HashiCorp Vault + OPA (Open Policy Agent) — agent presents signed manifest; Vault validates permissions; OPA enforces at every tool call_ 

|**Agent ID**|**System Name**|**Permitted Actions**|**Trust Level / HITL**|**Hard Boundaries**|**Business**<br>**Owner**|
|---|---|---|---|---|---|
|AGT-FIN-00<br>1|CreditRisk-XGB<br>-v1.0|READ: bureau-api, utility-api,<br>temenos-api; WRITE:<br>decision-log-stream; DENIED: all<br>other endpoints|ATF Level 1 — All<br>decisions require core<br>banking confirmation|None above £5,000<br>credit limit|James<br>Hartley<br>(CRO)|
|AGT-OPS-0<br>01|CSCopilot-v2.1|READ: crm-api, kb-search-api;<br>WRITE: ticket-api (create only);<br>DENIED: payment-api,<br>account-modify-api|ATF Level 3 — Refunds<br>>£100 require HITL|No payment<br>initiation; No<br>account modification|Lena<br>Hoffmann (VP<br>Ops)|
|AGT-IT-001|InfraAgent-v1.0|READ: cloudwatch, github-api;<br>WRITE: github-api (PR only);<br>DENIED: production deploy, IAM<br>changes|ATF Level 2 — All code<br>changes require human<br>PR approval|No direct production<br>deploys; No IAM<br>changes|Marcus<br>Thompson|

**EA ARTIFACT Data Lineage Map** Owner: Data Architect   |   Phase: Cross-Phase (Updated each Phase) 

|**DLM-001**|
|---|

|**Lineage Tracking Platform**|_OpenLineage + Apache Atlas + Atlan Data Catalog_|
|---|---|
|**Lineage Scope**|_End-to-end: Source data_→_Ingestion_→_Feature engineering_→_Training_→_Model_|
||_artifact_→_Inference_→_Decision log_→_Audit trail_|

|**No**<br>**de**|**Source**|**Data Product**|**Transformation**|**Destination**|**Governance**<br>**Controls**|
|---|---|---|---|---|---|
|L1|Equifax Bureau<br>API|Raw credit<br>records|Ingestion pipeline<br>(Azure Data<br>Factory)|S3://raw/equifax<br>-YYYY-MM-DD/|Encrypted; PII Tier 2;<br>Access: data-eng<br>group|
|L2|S3://raw/equifax<br>-*|Cleaned +<br>standardised<br>bureau data|Feature engineering<br>job (feature_engine<br>ering.py v1.3)|S3://features/bu<br>reau-std/|DVC tagged v1.0;<br>quality score 98.7%|
|L3|S3://features/bu<br>reau-std/ + utility<br>+ rental|Merged<br>feature matrix|Feature merge<br>pipeline<br>(merge_pipeline.py<br>v2.1)|Feast feature<br>store: credit-sco<br>ring-features<br>v1.0|Feast versioned;<br>training/serving<br>consistent|
|L4|Feast: credit-sc<br>oring-features<br>v1.0|Trained<br>XGBoost<br>model|Training job<br>(xgb_trainer.py<br>v1.4) — EXP-023|MLflow: CreditRi<br>sk-XGB-v1.0<br>(SHA: a7f3d2c)|Signed; EU AI Act<br>Art.11<br>documentation|
|L5|CreditRisk-XGB<br>-v1.0 +<br>Application (live)|Credit<br>decision +<br>SHAP values|Inference service<br>(KServe endpoint)|Decision log<br>stream (Azure<br>Event Hubs)|Every decision<br>logged; immutable<br>audit trail|
|L6|Decision log<br>stream|Adverse<br>action notice|LLM pipeline (Adver<br>seAction-GPT-v1.0)|CRM: adverse-a<br>ction-notices<br>collection|SHAP verification<br>gate applied; FCA<br>compliant|

|L7<br>All above|Regulatory<br>audit package|Audit assembly<br>pipeline|Splunk SIEM +<br>Collibra catalog|7-year retention;<br>FCA accessible|
|---|---|---|---|---|
|**EU AI Act Compliance**|_Full lineage f_<br>_and machine_<br>_Authority on_|_rom Article 10 (data_<br>_-readable via Open_<br>_request._|_governance) through_<br>_Lineage API. Accessi_|_Article 12 (logging) documented_<br>_ble to National Competent_|

## **ARTIFACT CROSS-REFERENCE SUMMARY** 

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

**_TOTAL ARTIFACTS IN THIS LIBRARY: 40+ artifact templates across 8 AIDLC phases and the EA layer. Each artifact shown with: full field definitions, example content for a Credit Risk AI use case, governance controls, regulatory mapping, and relationships to upstream/downstream artifacts. This library is designed to be adapted for any enterprise AI use case — replace the blue italic example values with your actual project content._**
