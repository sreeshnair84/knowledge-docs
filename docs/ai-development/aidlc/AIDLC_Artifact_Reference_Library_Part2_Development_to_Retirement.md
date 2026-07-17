---
title: "AIDLC Lifecycle Artifacts: Development Through Retirement"
date_created: 2026-07-10
status: current
source_type: pdf-converted
source_file: "AIDLC_Artifact_Reference_Library.pdf"
doc_type: multi-part-series
tags: ["ai-development", "software-engineering", "aidlc", "enterprise-architecture", "mlops"]
last_reviewed: 2026-07-17
covers_version: "N/A"
series_name: "AIDLC Artifact Reference Library"
series_part: 2
series_total: 4
series_index: "ai-development/aidlc/AIDLC_Artifact_Reference_Library"
---

# AIDLC Lifecycle Artifacts: Development Through Retirement

Continues from [Part 1: Discovery Through Model Design](./AIDLC_Artifact_Reference_Library_Part1_Discovery_to_Model_Design.md).

Live templates for AIDLC Phases 5–8 — development and training, evaluation and red-teaming, deployment and MLOps, and monitor/audit/retire — plus the cross-lifecycle Enterprise Architecture artifacts that the EA team and AI Governance Council maintain continuously alongside every phase.

## Development & Training

Build, fine-tune, and train the AI system with full traceability and developer accountability

**INPUTS TO THIS PHASE**

**OUTPUTS FROM THIS PHASE**

→ Architecture Decision Records (ADR-001) → Experiment Tracking Record (ETR-001)

→ Constitutional AI Policy (CAP-001)

→ Data Sheet (DS-001)

→ Compliance Obligation Matrix (COM-001)

→ Training Run Log (TRL-001)

- → Bias Mitigation Report (BMR-001)

- → AI-Generated Code Audit Log (CAL-001)

→ Model Registry Entry (MRE-001)

### Experiment Tracking Record

Owner: Lead Data Scientist   |   Phase: Phase 5: Development

|**Run**<br>**ID**|**Model Name**|**Config Description**|**AUC-**<br>**ROC**|**Gini**|**KS**<br>**Stat**|**Bias**<br>**Delta**|**Notes**|
|---|---|---|---|---|---|---|---|
|EXP-0<br>01|XGB-Baseline-v<br>0.1|Baseline XGBoost,<br>bureau data only|0.79|0.58|0.38|N/A|Baseline established.<br>Bureau-only<br>insufficient for<br>thin-file.|
|EXP-0<br>08|XGB-AltData-v0<br>.3|+ Utility + Rental data<br>added|0.83|0.66|0.44|18.2pp<br>age gap|Significant<br>improvement. Bias<br>still present.|
|EXP-0<br>14|XGB-FairConstr<br>-v0.6|+ Fairness constraint<br>(exponentiated gradient)|0.82|0.64|0.43|3.1pp<br>age gap|Bias reduced. Minor<br>perf sacrifice<br>acceptable.|
|EXP-0<br>19|XGB-SMOTE-v<br>0.8|+ SMOTE oversampling<br>for young applicants|0.83|0.65|0.43|1.8pp<br>age gap|Target threshold<br>achieved. Calibration<br>check needed.|
|EXP-0<br>23|XGB-Final-v1.0|+ Calibrated thresholds<br>per segment|0.83|0.65|0.43|1.8pp<br>age gap|SELECTED. All<br>targets met.<br>Proceeding to Phase<br>6.|
|**Experiment Tra**|**cking Platform**|*MLflow — Azure ML*<br>*Azure Blob. Reprodu*|*workspa*<br>*cibility: r*|*ce. All e*<br>*andom s*|*xperiment*<br>*eeds fixe*|*s versioned*<br>*d; data vers*|*. Run artifacts stored in*<br>*ion pinned via DVC tag v1.0.*|
|**Selected Model**|**Run**|*EXP-023 — XGB-Fi*<br>*CreditRisk-XGB-v1.0*|*nal-v1.0.*<br>*stage: S*|*Register*<br>*taging.*|*ed in MLf*|*low Model R*|*egistry as*|

**CAL-001**

### AI-Generated Code Audit Log

Owner: Tech Lead + All Engineers   |   Phase: Phase 5: Development

|**Date**|**File / Lines**|**AI Tool**|**Description**|**Reviewer**|**Status**|**Review Notes**|
|---|---|---|---|---|---|---|
|2026-04-<br>08|feature_enginee<br>ring.py (lines<br>142–210)|GitHub<br>Copilot|Utility payment<br>aggregation<br>pipeline<br>(12-month<br>rolling statistics)|David Lee<br>(ML Eng)|APPROVE<br>D|Minor: column naming<br>inconsistency fixed. Logic<br>verified against Data Sheet<br>DS-001. No hallucinated<br>column names.|
|2026-04-<br>11|xgb_trainer.py<br>(lines 45–89)|Amazon<br>Q Develo<br>per|XGBoost<br>hyperparameter<br>tuning loop with<br>cross-validation|Sarah<br>Wong (ML<br>Eng)|APPROVE<br>D|Logic correct. Added explicit<br>random_state for<br>reproducibility (AI missed<br>this). Verified against<br>EXP-019 config.|
|2026-04-<br>14|adverse_action_<br>prompt.py (lines<br>1–156)|GitHub<br>Copilot|LLM prompt<br>template for<br>adverse action<br>notice<br>generation|Raj Patel<br>(ML Eng)|APPROVE<br>D WITH C<br>HANGES|AI generated<br>plausible-looking but<br>non-FCA-compliant reason<br>codes. Legal reviewed and<br>corrected 3 reason code<br>templates. CRITICAL fix.|
|2026-04-<br>17|fairness_monito<br>r.py (lines 1–98)|Amazon<br>Q Develo<br>per|SHAP-based<br>demographic<br>parity<br>monitoring<br>pipeline|David Lee<br>(ML Eng)|APPROVE<br>D|Logic verified against BB-001<br>bias baseline methodology.<br>Protected attribute handling<br>confirmed correct.|
|**AWS AI-DLC M**|**andate Compliance**|*All eng*<br>*AI-gen*<br>*LLM pr*|*ineers have review*<br>*erated code commi*<br>*ompt templates req*|*ed and under*<br>*tted without u*<br>*uire legal rev*|*stood every li*<br>*nderstanding*<br>*iew — not jus*|*ne of AI-generated code. No*<br>*verification sign-off. Critical finding:*<br>*t technical review.*|

**PHASE**

**6**

## Evaluation & Red-Teaming

**AI Governance Council Deployment Authorisation**

Rigorously validate against safety, fairness, performance, and Constitutional AI requirements

**INPUTS TO THIS PHASE**

- → Model Registry Entry (MRE-001)

- → Constitutional AI Policy (CAP-001)

- → Model Card Draft (MCD-001)

- → Bias Baseline Report (BB-001)

**OUTPUTS FROM THIS PHASE**

- → Red Team Report (RTR-001)

- → Fairness Evaluation Report (FER-001)

- → Performance Benchmark Report (PBR-001)

- → Constitutional Compliance Audit (CCA-001)

- → Final Model Card (MCF-001)

- → Security Penetration Test (SPT-001)

**OUTPUT**

**RTR-001**

### Red Team Report

Owner: Security Architect + Ethics Lead   |   Phase: Phase 6: Evaluation

> **Red Team Conducted** *14–18 April 2026*

> **Red Team Lead** *Marcus Thompson, Security Architect*

> **Team Composition** *2 internal security engineers, 1 external AI red-team specialist (NCC Group), 1 fairness researcher (external)*

> **Scope** *XGBoost scorer, LLM adverse action generator, API endpoints, data pipeline*

|**ID**|**Attack Vector**|**Method**|**Finding**|**Sever**<br>**ity**|**Remediation**|**Status**|
|---|---|---|---|---|---|---|
|RT-<br>01|Adversarial<br>Credit<br>Application|Submit<br>crafted<br>application<br>designed to<br>game scoring<br>model|XGBoost model<br>accepted application<br>with 73%<br>confidence (above<br>threshold). Model<br>not robust to feature<br>manipulation.|HIGH|Feature consistency<br>validation layer added<br>before scoring.<br>Anomaly detection on<br>application feature<br>patterns.|Resolve<br>d|
|RT-<br>02|Prompt Injection<br>(LLM<br>Component)|Inject<br>instruction in<br>applicant nam<br>e/address<br>fields|LLM successfully<br>rejected 9/10<br>injection attempts. 1<br>case caused role<br>confusion ("ignore<br>previous<br>instructions").|MEDI<br>UM|Lakera Guard prompt<br>injection scanner<br>added. Input<br>sanitisation<br>strengthened. System<br>prompt hardened.|Resolve<br>d|
|RT-<br>03|Demographic<br>Attribute<br>Inference|Probe API<br>responses to<br>infer<br>protected<br>attribute<br>decisions|SHAP values in API<br>response revealed<br>postcode-correlated<br>scores potentially<br>inferring ethnicity.|HIGH|Postcode SHAP<br>values removed from<br>API response.<br>Internal only.<br>Aggregate statistics<br>only in adverse action<br>notice.|Resolve<br>d|

|RT-<br>04|Adverse Action<br>Hallucination|Query LLM<br>for rejection<br>reasons not<br>supported by<br>SHAP values|LLM generated<br>plausible-sounding<br>but factually<br>incorrect reason<br>codes in 3/50 test<br>cases (6%).|HIGH|SHAP verification<br>gate: LLM reasons<br>validated against<br>top-5 SHAP features<br>before delivery.<br>Human review if<br>mismatch.|Resolve<br>d|
|---|---|---|---|---|---|---|
|RT-<br>05|Model<br>Extraction|Reverse-engi<br>neer model<br>logic via<br>high-volume<br>API queries|Insufficient data to<br>reconstruct model in<br>10,000 queries.<br>Rate limiting<br>effective.|LOW|Rate limiting<br>confirmed effective.<br>Anomaly detection on<br>unusual query<br>patterns.|Accepte<br>d|
|**Red Team Verdict**||*CONDITIO*<br>*Medium/Lo*<br>*confirmed r*<br>*constitution*|*NAL PASS — All HIGH*<br>*w findings resolved or*<br>*emediation adequate.*<br>*al compliance audit.*|*severity*<br>*accepted*<br>*Deployme*|*findings resolved before*<br>*with monitoring. Externa*<br>*nt may proceed subject*|*this report.*<br>*l red team specialist*<br>*to CCA-001*|

**OUTPUT Fairness Evaluation Report** Owner: Ethics & Fairness Lead (External Auditor)   |   Phase: Phase 6: Evaluation

**FER-001**

||**Metric**|**Protected**<br>**Groups**|**Baseline**<br>**Value**|**AI Model**<br>**Value**|**Thresh**<br>**old**|**Result**|
|---|---|---|---|---|---|---|
||Demographic<br>Parity —<br>Approval Rate|Age: 18–25 vs<br>35–45|+18.2pp<br>(baseline)|+1.6pp (AI<br>model)|2.0pp|PASS|
||Demographic<br>Parity —<br>Approval Rate|Postcode<br>Quintile 1 vs 5|+24.1pp<br>(baseline)|+1.9pp (AI<br>model)|2.0pp|PASS|
||Equalized Odds<br>— FNR|Age: 18–25|+2.3×<br>(baseline)|+1.15× (AI<br>model)|1.2×|PASS|
||Equalized Odds<br>— FNR|Postcode Q1|+1.8×<br>(baseline)|+1.18× (AI<br>model)|1.2×|PASS|
||Individual<br>Fairness|Counterfactual<br>gender swap|N/A (not<br>tested in<br>legacy)|0.4% decision<br>change rate<br>on gender|<1%|PASS|
||Calibration|Age 18–25<br>(worst group)|Brier 0.19<br>(baseline)|Brier 0.14 (AI<br>model)|<0.15|PASS|
||Adverse Action<br>Parity|Protected vs<br>non-protected|N/A|Reason code<br>distribution<br>parity: p=0.31<br>(not<br>significant)|p>0.05|PASS|
|**External Auditor**||*Algorithmic Jus*|*tice Institute (A*|*JI) — Independe*|*nt External*|*Fairness Audit*|
|**Audit Conclusion**||*AI Model PASS*<br>*legacy scoreca*<br>*recommended.*|*ES all fairness*<br>*rd. Ongoing m*|*thresholds. Repr*<br>*onitoring mandato*|*esents sub*<br>*ry. Annual i*|*stantial improvement over*<br>*ndependent audit*|

**Auditor Sign-off**

*Dr. Yetunde Adeyemi (AJI), 22 April 2026*

**OUTPUT**

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
|**Constitutional Compliance Rate**|*100% (8/8 princi*|*ples PASS)*||
|**Overall Audit Conclusion**|*APPROVED FO*<br>*Phase 8 artifacts*|*R DEPLOYMENT — Subject to production m*<br>|*onitoring as specified in*|

**PHASE**

**7**

## Deployment & MLOps

**AI Governance Council Final Deployment Approval**

Deploy with full operational governance, safety controls and human oversight mechanisms active

**INPUTS TO THIS PHASE**

→ Final Model Card (MCF-001)

- → Red Team Report (RTR-001)

→ Constitutional Compliance Audit (CCA-001)

- → Governance Approval (from Phase 6)

**OUTPUTS FROM THIS PHASE**

→ Deployment Runbook (DRB-001)

→ Incident Response Plan (IRP-001)

- → Audit Log Configuration (ALC-001)

- → User Disclosure Documentation (UDD-001)

- → Runtime Monitoring Dashboard Spec (RMD-001)

**OUTPUT**

**DRB-001**

### Deployment Runbook

Owner: MLOps Engineer + DevOps   |   Phase: Phase 7: Deployment

|**Model**|||*CreditRisk-XGB-v1.0 + Adverse*|*Action-GPT-v1.0*|||
|---|---|---|---|---|---|---|
|**Deploym**|**ent Strategy**||*Blue/Green Deployment with 5*|*% Canary for 72 h*|*ours before full*|*traffic*|
|**Target E**|**nvironment**||*Azure Kubernetes Service (AK*|*S) — prod-credit-*|*scoring-cluster*||
|**Deploym**|**ent Owner**||*Priya Patel, MLOps Engineer*||||
||**Step**|**Phase**|**Action**|**Owner**|**Type**|**SLA**|
||PRE-<br>01|Pre-flight|Verify model artifacts match signed<br>registry entry (SHA-256 hash check)|MLOps<br>Engineer|MANUAL|<5 min|
||PRE-<br>02|Pre-flight|Confirm all runtime guardrails active:<br>Lakera Guard, Presidio, Azure<br>Content Safety|Security<br>Engineer|AUTOMA<br>TED|<2 min|
||PRE-<br>03|Pre-flight|Verify audit log stream connected to<br>Splunk SIEM|MLOps<br>Engineer|AUTOMA<br>TED|<1 min|
||DEP-<br>01|Deploy|Deploy to blue/green canary (5%<br>traffic). Monitor error rate, latency,<br>SHAP stability for 72h.|MLOps<br>Engineer|AUTOMA<br>TED|72 hours|
||DEP-<br>02|Deploy|If canary metrics stable: promote to<br>100% traffic. Zero downtime switch.|MLOps<br>Engineer|AUTOMA<br>TED|<5 min|
||POST<br>-01|Post-deplo<br>y|Run post-deployment validation<br>suite: 50 test applications, expected<br>outputs|QA Engineer|AUTOMA<br>TED|<15 min|
||POST<br>-02|Post-deplo<br>y|Activate Phase 8 monitoring: drift<br>alerts, bias alerts, cost dashboard|MLOps<br>Engineer|AUTOMA<br>TED|<5 min|
||ROLL<br>-01|Rollback<br>(if needed)|Revert to previous model version.<br>Route 100% traffic to stable version.<br>Alert AI Governance Council.|MLOps<br>Engineer|SEMI-AUT<br>O|<3 min|

**OUTPUT**

**IRP-001**

### AI Incident Response Plan

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

**UDD-001**

### User Disclosure Documentation

Owner: Legal + Product Manager   |   Phase: Phase 7: Deployment

|**Customer-Facing Disclosure**<br>**(approved text)**|*Your credit application is assessed using an automated AI system that analyses your*<br>*financial history and alternative data to make a credit decision. You have the right to*<br>*request human review of any automated decision. Please contact us at*<br>*[appeals@bank.com] or call [0800-XXX-XXXX] to exercise this right.*|
|---|---|
|**Adverse Action Notice Template**|*We have been unable to approve your credit application at this time. The primary*<br>*reasons for this decision are: [SHAP Reason Code 1: e.g., "Insufficient credit history*<br>*over the past 24 months"]. [SHAP Reason Code 2]. [SHAP Reason Code 3]. This*<br>*decision was made by an AI system. You have the right to request a human review.*<br>*Reference: [Decision ID: DEC-XXXXXXX].*|
|**Internal Deployer Disclosure**|*This AI system (CreditRisk-XGB-v1.0) is classified as HIGH RISK under the EU AI Act.*<br>*Human oversight is mandatory for all decisions below 70% confidence. The system may*<br>*not be used outside of UK retail lending applications. Bias monitoring reports are*<br>*produced monthly and reviewed by the AI Governance Council.*|
|**Right to Explanation Implementation**|*Every rejected applicant receives: (1) Top 3 SHAP-grounded reason codes in plain*<br>*English. (2) Written appeal right with 30-day response SLA. (3) Alternative product*<br>*suggestions where appropriate.*|

> **AI Act Article 13 Compliance** *Instructions for deployers provided. System purpose, accuracy, limitations, human oversight requirements, and data sources documented. Legal review: COMPLIANT (Patel & Morrison, 2 May 2026).*

## Monitor, Audit & Retire

**Quarterly Governance Review + Annual Compliance Certification** Maintain ongoing trustworthiness through continuous monitoring, audits, and disciplined retirement

**INPUTS TO THIS PHASE**

**OUTPUTS FROM THIS PHASE**

→ Runtime monitoring data → Monthly Monitoring Report (MMR-001) → Deployment Runbook (DRB-001) → Drift Alert Log (DAL-001)

- → Audit Log Configuration (ALC-001) → Quarterly Audit Report (QAR-001)

- → Compliance Obligation Matrix (COM-001)

- → Regulatory Change Log (RCL-001)

→ Model Sunset Plan (MSP-001)

**OUTPUT**

### Monthly Monitoring Report

Owner: MLOps Engineer + Ethics Lead   |   Phase: Phase 8: Monitor

> **Report Period** *May 2026 (Month 1 post-deployment)*

> **Report Prepared By** *Priya Patel (MLOps) + Dr. Amara Diallo (Ethics)*

> **Overall Status** *GREEN — All metrics within thresholds*

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
|**Actions Required**|*WATCH on demographic parit*<br>*frequency for protected group*|*y delta (1.7pp,*<br>*approval rates.*|*threshold 2.0pp). Increase monitoring*<br>*No model changes required at this time.*|
|**Next Review Date**|*4 June 2026*|||

|**OUTPUT**|**MSP-001**|
|---|---|
|**Model Sunset Plan**<br>Owner: AI Governance Council|P|hase: Phase 8: Retire|
|**Model to Retire**|*CreditRisk-XGB-v1.0 (example: when replaced by v2.0)*|
|**Planned Sunset Date**|*To be determined — triggered by: (1) Model drift breach; (2) Regulatory change*<br>*requiring new architecture; (3) Successor model Phase 6 approval*|
|**Sunset Triggers**|*AUC-ROC decline below 0.79 for 2 consecutive months; Demographic parity delta*<br>*exceeds 2.0pp; Successor model CreditRisk-XGB-v2.0 approved*|
|**Data Retention Post-Sunset**|*Training data: retained 5 years per DS-001. Inference logs: retained 7 years (FCA*<br>*requirement). Model artifacts: archived in MLflow, not deleted — required for regulatory*<br>*enquiry response.*|
|**Lineage Preservation**|*OpenLineage graphs retained indefinitely. All data-to-model-to-decision lineage*<br>*preserved for audit trail. Accessible via Atlan data catalog.*|
|**Customer Impact Management**|*All in-flight applications processed before sunset. No customer disruption. Transition to*<br>*successor model tested in shadow mode for 30 days minimum.*|
|**Regulatory Notification**|*FCA notified of system retirement 60 days in advance. EU AI Act post-market*<br>*surveillance report filed at retirement.*|

## Enterprise Architecture Artifacts

**Continuous — AI Governance Council**

Cross-lifecycle artifacts maintained by the EA team and AI Governance Council

**INPUTS TO THIS PHASE**

→ All AIDLC Phase Artifacts

→ Business Strategy

→ Regulatory Frameworks (NIST AI RMF, EU AI Act, ISO 42001)

**OUTPUTS FROM THIS PHASE**

→ AI System Inventory (ASI-001)

→ AI Capability Map (ACM-001)

→ Agent Action Boundary Register (AABR-001)

→ AI Architecture Decision Record EA (EADR-001)

→ Data Lineage Map (DLM-001)

**EA ARTIFACT**

**ASI-001**

### AI System Inventory

Owner: AI Compliance Lead   |   Phase: Cross-Phase

|**Use Case ID**|**System Name**|**Risk Tier**|**AIDLC Phase**|**Business Owner**|**Regulations**|**Platform**|
|---|---|---|---|---|---|---|
|AUC-2026-FIN-<br>047|Credit Risk AI Scoring<br>Model|T2 — HIGH<br>RISK|Phase 7<br>(Production)|Sarah Chen (VP<br>Credit Risk)|EU AI Act, FCA, UK<br>GDPR|Azure ML + AKS|
|AUC-2026-OPS<br>-012|Customer Service<br>Copilot|T3 —<br>Limited Risk|Phase 7<br>(Production)|Lena Hoffmann (VP<br>Ops)|EU AI Act Art. 50|Azure OpenAI|
|AUC-2026-MKT<br>-008|Campaign Targeting<br>Model|T4 —<br>Minimal<br>Risk|Phase 5<br>(Development)|Ahmed Al-Rashid<br>(CMO)|GDPR profiling<br>consent|AWS SageMaker|
|AUC-2026-HR-0<br>03|CV Screening Assistant|T2 — HIGH<br>RISK|Phase 2<br>(Feasibility —<br>HOLD)|Maria Santos<br>(CHRO)|EU AI Act Annex III<br>Cat.1|TBD|
|AUC-2026-SEC<br>-019|Fraud Detection Engine|T2 — HIGH<br>RISK|Phase 8 (Monitor)|John Kim (CISO)|EU AI Act,<br>PCI-DSS, FCA|GCP Vertex AI|

> **Last Updated** *8 May 2026*

> **Next Review** *8 June 2026 (monthly update cycle)*

> **Maintained In** *Collibra AI Data Catalog — accessible to all AI Governance Council members and EA team*

**EA ARTIFACT**

**AABR-001**

### Agent Action Boundary Register

Owner: AI Architect + Security Architect   |   Phase: Cross-Phase

**Purpose**

*Defines the permitted tools, API endpoints, data namespaces, and action types for each deployed AI agent. Source of truth for runtime Zero Trust access control.*

**Enforcement**

*HashiCorp Vault + OPA (Open Policy Agent) — agent presents signed manifest; Vault validates permissions; OPA enforces at every tool call*

|**Agent ID**|**System Name**|**Permitted Actions**|**Trust Level / HITL**|**Hard Boundaries**|**Business**<br>**Owner**|
|---|---|---|---|---|---|
|AGT-FIN-00<br>1|CreditRisk-XGB<br>-v1.0|READ: bureau-api, utility-api,<br>temenos-api; WRITE:<br>decision-log-stream; DENIED: all<br>other endpoints|ATF Level 1 — All<br>decisions require core<br>banking confirmation|None above £5,000<br>credit limit|James<br>Hartley<br>(CRO)|
|AGT-OPS-0<br>01|CSCopilot-v2.1|READ: crm-api, kb-search-api;<br>WRITE: ticket-api (create only);<br>DENIED: payment-api,<br>account-modify-api|ATF Level 3 — Refunds<br>>£100 require HITL|No payment<br>initiation; No<br>account modification|Lena<br>Hoffmann (VP<br>Ops)|
|AGT-IT-001|InfraAgent-v1.0|READ: cloudwatch, github-api;<br>WRITE: github-api (PR only);<br>DENIED: production deploy, IAM<br>changes|ATF Level 2 — All code<br>changes require human<br>PR approval|No direct production<br>deploys; No IAM<br>changes|Marcus<br>Thompson|

**EA ARTIFACT**

**DLM-001**

### Data Lineage Map

Owner: Data Architect   |   Phase: Cross-Phase (Updated each Phase)

|**Lineage Tracking Platform**|*OpenLineage + Apache Atlas + Atlan Data Catalog*|
|---|---|
|**Lineage Scope**|*End-to-end: Source data*→*Ingestion*→*Feature engineering*→*Training*→*Model*|
||*artifact*→*Inference*→*Decision log*→*Audit trail*|

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
|**EU AI Act Compliance**|*Full lineage f*<br>*and machine*<br>*Authority on*|*rom Article 10 (data*<br>*-readable via Open*<br>*request.*|*governance) through*<br>*Lineage API. Accessi*|*Article 12 (logging) documented*<br>*ble to National Competent*|

