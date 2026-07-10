---
title: "AI Solution Lifecycle Deliverables"
date_created: 2026-07-07
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["enterprise-architecture", "process"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# AI Solution Lifecycle Deliverables by Role

**Audience:** Enterprise Architects, Solution Architects, Security Architects, RAI/Governance Leads, Data Architects, Platform/MLOps Architects, Distinguished/Principal Architects, Delivery Leaders  
**Purpose:** Comprehensive catalog of deliverables expected from each architect role at every lifecycle stage — from incubation through retirement — illustrated across three use cases: Banking Loan Underwriting, Healthcare Prior Authorization, and Government Citizen Benefits.  
**Related:** [AI-First to AI-Native Journey](../transformation/ai-first-to-ai-native.md) · [AI Governance Operating Model](../../sovereign-constitutional-ai/ai-governance-operating-model.md) · [Constitutional AI Engineering](../../sovereign-constitutional-ai/constitutional-ai-engineering.md) · [Enterprise AI Governance & Compliance](../../enterprise-architecture/ai-architecture/enterprise-ai-governance-compliance.md)

:::info Current as of July 2026
    This catalog aligns with EU AI Act (High-Risk AI system lifecycle requirements, Art. 9–17), ISO 42001:2023, and enterprise architecture frameworks (TOGAF 10, Zachman). Deliverable names match the TOGAF Architecture Development Method (ADM) where applicable.

---

## 1. Lifecycle Stages

```
AI SOLUTION LIFECYCLE

┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ STAGE 1      │  │ STAGE 2      │  │ STAGE 3      │  │ STAGE 4      │  │ STAGE 5      │
│ INCUBATION   │  │ RFP / VENDOR │  │ DESIGN &     │  │ OPERATE &    │  │ RETIRE /     │
│              │  │ SELECTION    │  │ BUILD        │  │ SCALE        │  │ DECOMMISSION │
│              │  │              │  │              │  │              │  │              │
│ Is this AI   │  │ Which vendor │  │ Build it     │  │ Run it       │  │ End of life  │
│ initiative   │  │ / platform / │  │ right        │  │ safely       │  │ responsibly  │
│ worth doing? │  │ model?       │  │              │  │              │  │              │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
    Weeks 1–4        Weeks 5–12       Months 3–9         Months 9–60+      As needed
```

---

## 2. Roles and Audiences

| Role | Primary function | Key audience |
|---|---|---|
| **Enterprise Architect (EA)** | Strategic alignment, cross-domain architecture, ARB | C-suite, Board, Programme Steering |
| **Security Architect (SA)** | Threat model, security architecture, guardrails | CISO, Risk Committee, Compliance |
| **RAI / Governance Lead** | AI constitution, fairness, ethics, RAI compliance | RAIO, Board, Regulators, Audit |
| **Solution Architect** | Functional design, technical integration, delivery | Product Owner, Dev Teams, Operations |
| **Distinguished / Principal Architect** | Technical vision, ADRs, design authority | CTO, Architecture Board, Dev Leadership |
| **Data Architect** | Data contracts, lineage, residency, governance | CDO, Data Governance, Regulators |
| **Platform / MLOps Architect** | AI platform, CI/CD for models, eval gates, cost | Platform Engineering, FinOps, Site Reliability |

---

## 3. Master Deliverables Matrix

| Deliverable | Owner | Stage 1 | Stage 2 | Stage 3 | Stage 4 | Stage 5 |
|---|---|---|---|---|---|---|
| AI Strategy Brief | EA | ✅ Create | — | — | 📋 Review | — |
| AI Opportunity Assessment | EA | ✅ Create | — | — | 📋 Review | — |
| AI Safety Level Classification | EA + RAI | ✅ Create | 📋 Update | 📋 Confirm | 📋 Monitor | 📋 Final |
| ARB Submission | EA | Draft | — | ✅ Submit | 📋 Post-deploy | 📋 Decommission |
| Architecture Decision Records | DA / Principal | — | ✅ Create | ✅ Maintain | 📋 Review | 📋 Final |
| AI Reference Architecture | EA + DA | Concept | — | ✅ Final | — | — |
| Threat Model | SA | Preliminary | ✅ Full | ✅ Updated | 📋 Annual refresh | 📋 Close |
| Security RFP Requirements | SA | — | ✅ Create | — | — | — |
| Security Architecture Doc | SA | — | — | ✅ Create | 📋 Review | 📋 Close |
| AI Impact Assessment | RAI | ✅ Preliminary | ✅ Full | ✅ Final | 📋 Annual | ✅ Retirement |
| AI Constitution | RAI | — | RAI criteria | ✅ Create | 📋 Monitor | ✅ Archive |
| Model Card | RAI + MLOps | — | — | ✅ Create | 📋 Maintain | ✅ Archive |
| Fairness Evaluation Report | RAI | — | — | ✅ Pre-deploy | 📋 Monthly | ✅ Final |
| Bias Monitoring Playbook | RAI | — | — | ✅ Create | 📋 Execute | 📋 Close |
| RAI Ethics Audit Report | RAI | — | — | — | 📋 Annual | ✅ Final |
| Feasibility Study | Solution Arch | ✅ Create | — | — | — | — |
| Vendor Comparison | Solution Arch | — | ✅ Create | — | — | — |
| Solution Design Document | Solution Arch | — | — | ✅ Create | 📋 Review | — |
| Production Runbook | Solution Arch | — | — | ✅ Create | 📋 Maintain | 📋 Close |
| Data Landscape Assessment | Data Arch | ✅ Create | — | — | — | — |
| Data Contract + Lineage | Data Arch | — | RFP reqs | ✅ Create | 📋 Maintain | 📋 Archive |
| Data Residency Audit | Data Arch | — | — | ✅ Create | 📋 Annual | ✅ Final |
| Data Deletion / Purge Plan | Data Arch | — | — | — | — | ✅ Create & Execute |
| AI Landing Zone Design | MLOps | — | — | ✅ Create | 📋 Maintain | — |
| CI/CD for Models | MLOps | — | — | ✅ Create | 📋 Maintain | 📋 Decommission |
| Eval Gate Framework | MLOps | — | — | ✅ Create | 📋 Maintain | 📋 Archive |
| Model Drift Pipeline | MLOps | — | — | ✅ Create | 📋 Operate | 📋 Decommission |
| Cost Governance Model | MLOps + EA | — | — | ✅ Create | 📋 Monthly | 📋 Final |
| Decommission Plan | EA + All | — | — | — | Plan | ✅ Execute |

---

## 4. Role Deep-Dives

### 4.1 Enterprise Architect

=== "Incubation"

    **AI Strategy Brief** — 1–2 page executive brief answering: why this AI initiative, strategic alignment, expected value, key risks.

    ```
    AI STRATEGY BRIEF — TEMPLATE STUB

    Initiative:    [Name]
    Date:          [Date]
    Author:        [EA Name]
    Status:        Draft | Approved

    1. Strategic Context
       Why now? What business problem does this AI initiative address?
       How does it align to [Organisation]'s AI strategy?

    2. Expected Value
       Quantified: [cost reduction / revenue uplift / risk reduction]
       Timeline: [when value realised]

    3. AI Safety Level (preliminary)
       Classification: SL1 / SL2 / SL3 / SL4
       Rationale: [key factors driving classification]

    4. Key Risks (top 3)
       [Risk 1]: [mitigation]
       [Risk 2]: [mitigation]
       [Risk 3]: [mitigation]

    5. Recommendation
       Proceed to RFP / Design Spike / Further Analysis
    ```

    **AI Opportunity Assessment** — structured assessment of feasibility, value, and strategic fit.

    **Audience:** CEO, CAIO, Programme Steering Committee.

=== "RFP / Vendor"

    **RFP Architecture Evaluation Criteria** — scoring criteria for evaluating vendor AI platforms against enterprise architecture standards:

    | Criterion | Weight | Scoring guide |
    |---|---|---|
    | Sovereign AI capability | 20% | Can it run on sovereign infra? Air-gappable? |
    | Constitutional / guardrail support | 15% | Native policy engine? MCP support? |
    | Model governance | 15% | Model registry, versioning, audit? |
    | Integration maturity | 20% | Enterprise patterns, API standards |
    | Security certifications | 15% | ISO 27001, SOC 2, EU certification? |
    | Pricing / FinOps | 15% | Cost transparency, scaling model |

=== "Design & Build"

    **Reference Architecture** — full architecture diagram with annotated layers: governance, orchestration, model, data, and infrastructure. Must pass ARB review.

    **ARB Submission** — standard ARB package: architecture overview, decision log, risk register, dependency map, RAI alignment, regulatory compliance statement.

    **Audience:** Architecture Review Board, RAIO, CRO.

=== "Operate & Scale"

    **Post-Implementation Review** — 90 days after launch: actual vs. expected performance, incidents, governance findings, recommendations.

    **AI System Performance Dashboard** — quarterly review: model performance, fairness metrics, cost, incidents.

=== "Retire"

    **Decommission Architecture Review** — validates that retirement is safe: data deletion plan confirmed, dependencies mapped, regulatory retention met, knowledge transferred.

---

### 4.2 Security Architect

=== "Incubation"

    **Preliminary Threat Model** — identifies attack surface, key threat actors, and critical risks at concept stage. Informs AI Safety Level classification.

    ```
    PRELIMINARY THREAT MODEL — STUB

    System: [AI System Name]
    Stage: Incubation
    Date: [Date]

    Asset inventory (preliminary):
    - Model weights: [location, sensitivity]
    - Training data: [classification, residency]
    - API endpoints: [external? authenticated?]
    - Agent tool access: [what tools? what scope?]

    Top threat actors:
    1. External attacker (prompt injection, model exfiltration)
    2. Malicious insider (training data poisoning)
    3. Third-party vendor (supply chain)

    Critical risks (top 3):
    1. [Risk]: [likelihood] × [impact]
    2. [Risk]: [likelihood] × [impact]
    3. [Risk]: [likelihood] × [impact]

    Recommended security classification: [HIGH / MEDIUM / LOW]
    ```

=== "RFP / Vendor"

    **Security RFP Requirements** — mandatory security criteria for vendor evaluation:

    ```
    SECURITY RFP REQUIREMENTS

    Mandatory (vendor must demonstrate):
    □ SOC 2 Type II (or equivalent) — provide report
    □ ISO 27001 certification — provide certificate
    □ Penetration test results — last 12 months
    □ Data residency controls — documented and audited
    □ Customer-managed encryption keys (BYOK)
    □ Audit log access — customer retains, vendor cannot delete
    □ Kill switch / service termination — contractual guarantee
    □ Vulnerability disclosure program

    Preferred:
    □ EU AI Act conformity assessment
    □ OWASP LLM Top 10 self-assessment
    □ Bug bounty program
    □ Zero-trust architecture
    ```

=== "Design & Build"

    **Security Architecture Document** — full threat model, guardrail architecture, identity and access model, network controls, incident response.

    **Guardrail Specification** — documents all guardrail layers: constitutional classifier parameters, OPA/Cedar policies, tool sandbox configuration, input/output filters.

=== "Operate & Scale"

    **Security Monitoring Dashboard** — tracks: prompt injection attempts, anomalous agent behavior, authentication failures, policy violations, kill switch tests.

    **Penetration Test Scope** — quarterly: scoped to AI-specific attack vectors (OWASP LLM Top 10, prompt injection, model exfiltration).

=== "Retire"

    **Secure Wipe Plan** — documents secure deletion of model weights, training data, inference logs. Certificates of destruction for regulated data.

---

### 4.3 RAI / Governance Lead

=== "Incubation"

    **AI Impact Assessment v0 (preliminary)** — early-stage assessment of potential harms and benefits. Informs go/no-go decision.

    ```
    AI IMPACT ASSESSMENT — PRELIMINARY (STAGE 1)

    System: [Name] | Date: [Date] | Author: [RAI Champion]
    Assessment stage: PRELIMINARY

    1. Purpose and scope
       What the AI system does; who is affected; scale.

    2. EU AI Act classification (preliminary)
       □ Prohibited (do not proceed)
       □ High-risk (Annex III): [which category]
       □ Limited risk (transparency obligations)
       □ Minimal risk

    3. Affected groups
       Primary users: [description]
       Affected third parties: [description]
       Vulnerable groups at risk: [description]

    4. Key potential harms
       - [Harm 1]: [probability] × [severity]
       - [Harm 2]: [probability] × [severity]

    5. Key potential benefits
       - [Benefit 1]: [for whom]

    6. Preliminary fairness risks
       Protected characteristics at risk: [list]

    7. Recommendation
       □ Proceed with full assessment in RFP stage
       □ Redesign before proceeding
       □ Do not proceed (prohibited / unacceptable risk)
    ```

=== "RFP / Vendor"

    **RAI Evaluation Criteria for RFP** — RAI-specific vendor scoring:

    | Criterion | Weight | Scoring guide |
    |---|---|---|
    | Constitutional / RAI capabilities | 25% | Built-in constitutional AI, fairness tools |
    | Explainability support | 20% | SHAP/LIME APIs, model cards |
    | Fairness evaluation tooling | 20% | AIF360 integration, bias reports |
    | Privacy-preserving techniques | 15% | Differential privacy, federated learning |
    | Audit trail and compliance | 20% | Immutable logging, regulatory reporting |

=== "Design & Build"

    **AI Constitution** — ratified constitutional document for the system. See [Constitutional AI Engineering](../../sovereign-constitutional-ai/constitutional-ai-engineering.md) for templates.

    **Model Card** — system-level documentation: intended use, performance metrics, fairness evaluation results, known limitations, recommended uses and misuses.

    **Bias Monitoring Playbook** — defines metrics, thresholds, alert escalation, and remediation for each fairness metric in production.

=== "Operate & Scale"

    **Monthly Fairness Report** — automated + human-reviewed; includes demographic parity, equalized odds, individual fairness checks, trend analysis.

    **Annual Ethics Audit** — comprehensive review of constitutional compliance, fairness performance, incident history, and governance adherence.

=== "Retire"

    **Responsible Retirement Checklist** — ensures ethical retirement: data deleted with dignity (no continued processing of personal data), affected users notified, regulatory obligations met, lessons learned documented for future systems.

---

### 4.4 Solution Architect

=== "Incubation"

    **Feasibility Study** — technical feasibility assessment: can we build this? What are the technical risks? What dependencies exist?

=== "RFP / Vendor"

    **Vendor Functional Comparison** — side-by-side comparison of vendor capabilities against functional requirements. Includes PoC results if conducted.

=== "Design & Build"

    **Solution Design Document (SDD)** — full technical design: component architecture, integration design, data flow, API contracts, infrastructure design, test strategy.

=== "Operate & Scale"

    **Production Runbook** — step-by-step operational procedures: startup, shutdown, incident response, escalation, common failure scenarios and resolutions.

    **Capacity Review** — quarterly: usage trends, performance headroom, scaling recommendations, cost optimization.

=== "Retire"

    **Handover to Decommission Pack** — for each component: what it does, dependencies, data it holds, shutdown procedure, contacts.

---

### 4.5 Distinguished / Principal Architect

=== "Incubation"

    **Technical Vision** — 3-5 page technical narrative: what the future state should look like and why it is the right technical direction. Not a design document — a vision.

=== "RFP / Vendor"

    **Architecture Decision Records (ADRs)** — key architectural decisions with rationale and alternatives considered:

    ```
    ARCHITECTURE DECISION RECORD

    ADR-001: Model hosting strategy
    Status: Accepted | Date: [Date]

    Context:
    We need to host [model type] for [use case].
    Options: (a) API-first, (b) sovereign cloud hosted, (c) on-prem

    Decision:
    Sovereign cloud (Option b) using [provider]

    Rationale:
    - Data residency: EU citizen data must remain in EU jurisdiction
    - Cost: On-prem CapEx not justified at current scale
    - Compliance: EU AI Act requires audit trail retained in-jurisdiction
    - Fallback: Option (c) available if sovereignty requirements increase

    Consequences:
    Positive: Regulatory compliance; lower CapEx
    Negative: Dependency on sovereign cloud provider
    Mitigation: Contractual sovereignty guarantees; annual sovereign review
    ```

=== "Design & Build"

    **Design Authority Review** — gatekeeper review of the Solution Design Document: technical correctness, pattern alignment, risk coverage, security review adequacy.

=== "Operate & Scale"

    **Post-Implementation Review** — 90-day and annual reviews: what did we learn? What would we do differently? What patterns should be adopted or retired?

=== "Retire"

    **Innovation Brief** — captures lessons learned as patterns for future systems. What worked, what didn't, what should become a standard pattern.

---

### 4.6 Data Architect

=== "Incubation"

    **Data Landscape Assessment** — maps: what data does this system need? Where does it live? What is its classification? What are the sovereignty requirements?

=== "RFP / Vendor"

    **Data RFP Requirements** — data-specific vendor criteria: data residency guarantees, data lineage support, data portability, PII handling, retention controls.

=== "Design & Build"

    **Data Contract** — formal specification of data flowing into and out of the AI system: schema, classification, SLA, lineage, owner, residency.

    ```yaml
    data_contract:
      id: "DC-LOAN-UNDERWRITE-001"
      system: "Loan Underwriting Agent"
      version: "1.0.0"

      inputs:
        - name: "applicant_profile"
          classification: "PERSONAL_FINANCIAL"
          residency: "EU"
          schema_ref: "schemas/applicant_v2.json"
          pii_fields: ["name", "dob", "national_id", "address"]
          purpose: "credit_assessment"
          retention_days: 2555  # 7 years (SR 11-7)

      outputs:
        - name: "credit_decision"
          classification: "PERSONAL_FINANCIAL"
          residency: "EU"
          includes_explanation: true
          shap_required: true  # SR 11-7 + EU AI Act

      lineage:
        source: "core_banking.applicants"
        transformations: ["pii_masking", "feature_engineering"]
        model_version_at_decision: "tracked_in_model_registry"
    ```

    **Data Lineage Design** — end-to-end lineage from source system to AI training data to model to decision output.

=== "Operate & Scale"

    **Data Quality SLA Dashboard** — monitors: data freshness, schema compliance, PII leakage alerts, lineage breaks.

    **Annual Data Residency Audit** — verifies all AI data remains within required jurisdictions; generates evidence for regulatory inspection.

=== "Retire"

    **Data Deletion / Purge Plan** — specifies: which data to delete, in what order, by when, with what verification. Generates certificates of deletion for regulated data classes.

---

### 4.7 Platform / MLOps Architect

=== "Incubation"

    **Platform Readiness Assessment** — does the existing AI platform support this initiative? What gaps need to be addressed?

=== "RFP / Vendor"

    **MLOps Platform RFP Requirements** — MLOps-specific vendor criteria: model registry, CI/CD for models, eval gate framework, drift detection, cost controls.

=== "Design & Build"

    **AI Landing Zone Design** — sovereign AI landing zone covering: model registry, eval pipeline, inference infrastructure, governance integrations (policy engine, audit ledger, constitution registry).

    **Eval Gate Framework** — defines automated evaluation gates that models must pass before promotion to each environment:

    ```yaml
    eval_gates:
      staging_to_production:
        - name: "Fairness gate"
          metric: "demographic_parity_gap"
          threshold: 0.05
          action_on_fail: BLOCK
        - name: "Performance gate"
          metric: "task_accuracy"
          threshold: 0.90
          action_on_fail: BLOCK
        - name: "Constitutional gate"
          metric: "constitutional_violation_rate"
          threshold: 0.001
          action_on_fail: BLOCK
        - name: "Latency gate"
          metric: "p99_latency_ms"
          threshold: 2000
          action_on_fail: WARN
    ```

=== "Operate & Scale"

    **Model Drift + Retraining Pipeline** — monitors PSI (Population Stability Index), prediction drift, data drift; triggers automated retraining or alerts.

    **AI FinOps Dashboard** — tracks: cost per inference, cost per model version, cost trend, optimization opportunities.

=== "Retire"

    **Model Archival Plan** — secure archival of model weights, training data, eval results with defined retention periods. Ensures regulatory reconstruction capability.

---

## 5. Use Case Walk-throughs

### 5.1 Banking: AI Loan Underwriting Agent

**Context:** EU Tier-1 bank deploying an autonomous loan underwriting agent. High-Risk under EU AI Act (Annex III §5b). Subject to SR 11-7, DORA, MiFID II suitability. Sterling case study reference.

**Key regulatory constraints:**
- EU AI Act Art. 13: Transparency (must disclose AI involvement)
- EU AI Act Art. 14: Human oversight (adverse decisions require human review)
- GDPR Art. 22: No fully automated adverse credit decisions without opt-out
- SR 11-7: Model documentation; independent validation; ongoing monitoring
- DORA: Operational resilience; incident reporting within 4 hours

**Stage swimlane (selected roles):**

| Stage | EA | SA | RAI Lead | Data Architect | MLOps |
|---|---|---|---|---|---|
| **Incubation** | AI Strategy Brief; AI Safety Level: SL3 | Preliminary threat model | AI Impact Assessment v0: HIGH-RISK | Data landscape assessment | Platform readiness |
| **RFP** | Vendor arch criteria (sovereign infra mandatory) | Security RFP (DORA resilience; BYOK) | RAI RFP criteria (SHAP mandatory; AIF360) | Data residency: EU-only | MLOps RFP (drift detection; model registry) |
| **Design & Build** | Reference arch (sovereign EU cloud); ARB | Threat model; Cedar agent capabilities | Banking AI Constitution; model card; fairness spec | Data contract (7yr retention; SHAP fields) | Eval gates (demographic parity gate; SR 11-7 docs) |
| **Operate** | Post-impl review (90d) | Security monitoring; quarterly pentest | Monthly fairness report; annual ethics audit | Data quality SLA; annual residency audit | Drift pipeline; FinOps dashboard |
| **Retire** | Decommission arch review | Secure wipe plan | Responsible retirement checklist | Data deletion + SR 11-7 proof of retention | Model archival (7yr regulatory) |

**Sample RAI Impact Assessment stub (banking):**

```
AI IMPACT ASSESSMENT — BANKING LOAN UNDERWRITING AGENT

System: Loan Underwriting Agent v1.0
Date: 2026-07-06
Assessor: [RAI Champion Name]
Status: APPROVED — conditional

EU AI Act Classification: HIGH-RISK (Annex III, §5b — credit scoring)

Affected individuals:
- Primary: Retail loan applicants (EU residents)
- Scale: ~50,000 applications/year
- Vulnerable groups: Low-income applicants; first-time borrowers

Key harms identified:
H1: Discriminatory credit denial (probability: Medium; impact: High)
    Mitigation: Demographic parity gate; monthly fairness audit
H2: Unexplainable adverse decision (probability: Low; impact: High)
    Mitigation: SHAP mandatory; plain-language explanation within 30 days
H3: Data residency breach (probability: Low; impact: Critical)
    Mitigation: EU-sovereign deployment; annual residency audit

Autonomy level: L1 (ASSISTED) — AI recommends; human signs off
Human oversight: Mandatory for all adverse decisions (GDPR Art. 22)

Constitutional basis: BANK-CONST-001 v1.0
Key constitutional rules applied:
- BP1: Fair lending checks before any credit decision
- BP3: Dual authorization for transactions > threshold
- BP5: Human review required for all adverse decisions

Approved by: Head of RAI — [Date]
Next review: 12 months or on significant model update
```

---

### 5.2 Healthcare: Prior Authorization Agent

**Context:** Large hospital network deploying an AI prior authorization agent. FDA SaMD considerations; HIPAA mandatory; HITL required for all clinical decisions. Cascadia case study reference.

**Key regulatory constraints:**
- HIPAA: Patient data protection; minimum necessary standard
- FDA SaMD: If making/assisting clinical decisions, may require clearance
- EU MDR: If used in EU hospitals
- Joint Commission: Clinical AI oversight standards

**Stage swimlane:**

| Stage | EA | RAI Lead | Data Architect | Solution Architect |
|---|---|---|---|---|
| **Incubation** | AI Strategy Brief; SL3 (clinical) | AI Impact Assessment: HIGH + FDA SaMD check | PHI landscape assessment | Clinical workflow feasibility |
| **RFP** | Architecture criteria (HIPAA BAA mandatory) | RAI criteria (clinical evidence base; bias by demographic) | PHI data contract requirements | Clinical integration requirements (EHR APIs) |
| **Design & Build** | Healthcare AI reference arch | Healthcare AI Constitution; clinician override design; bias spec by demographic | PHI data contract (de-identification; IRB) | Clinical workflow SDD; HITL design |
| **Operate** | Post-impl (90d clinical audit) | Monthly equity report (demographic disparity); annual ethics audit | PHI residency monitoring; consent audit | Clinical runbook; escalation to clinician |
| **Retire** | Decommission (patient care continuity) | Retirement assessment (patient data dignity) | PHI deletion (HIPAA right of access preserved) | Clinical handover protocol |

**Sample AI Constitution excerpt (Healthcare):**

```yaml
# Enforced constitutional rule for prior auth agent
prohibited_actions:
  - id: HP1
    rule: "Never approve/deny prior authorization without validated evidence base"
    enforcement: BLOCK
    evidence_threshold: "level_2_or_above"  # Oxford CEBM levels

  - id: HP3
    rule: "Never override clinician's documented decision"
    enforcement: BLOCK

required_behaviors:
  - id: HR4
    rule: "Always provide clinician override capability with mandatory rationale field"

escalation_rules:
  - trigger: "Payer policy outside standard clinical guidelines"
    action: ESCALATE_TO_SENIOR_CLINICIAN
  - trigger: "Patient demographic outside training data distribution"
    action: ALERT_CLINICIAN_AND_LOG
```

---

### 5.3 Government: Citizen Benefits Navigation Agent

**Context:** National government deploying an AI agent to guide citizens through benefits eligibility. Sovereign infrastructure mandatory. StateDHS case study reference.

**Key regulatory constraints:**
- EU AI Act Art. 14: Human oversight mandatory (benefits determination is High-Risk Annex III §1)
- GDPR: Citizen data protected; right to human review of automated decisions
- Data sovereignty: Citizen data must remain on sovereign national infrastructure
- Administrative law: AI decisions must be contestable through formal legal process

**Stage swimlane:**

| Stage | EA | SA | RAI Lead | Data Architect |
|---|---|---|---|---|
| **Incubation** | AI Strategy Brief; sovereign infra mandatory; SL3 | Threat model (citizen targeting attack surface) | AI Impact Assessment: HIGH-RISK (Annex III §1); democratic governance assessment | Data sovereignty assessment (citizen data classification) |
| **RFP** | Sovereign infra requirements (air-gappable); on-prem preferred | Security requirements (sovereign data center; government security standards) | Democratic governance criteria; AI Bill of Rights compliance | Sovereign residency mandatory; citizen data never leaves national infra |
| **Design & Build** | Government sovereign AI reference arch; ARB submission to government architecture board | Government security architecture (national security standards) | Government AI Constitution; Algorithmic Impact Assessment (public) | Citizen data contract (sovereign; GDPR; right to deletion) |
| **Operate** | Quarterly parliamentary report (AI in government register) | Annual security audit (government standards) | Monthly equity report; annual democratic AI audit; public AI register update | Annual citizen data residency certification |
| **Retire** | Decommission with parliamentary notification | Secure deletion (government classification) | Responsible retirement (citizen communication; right to human-only service preserved) | Citizen data deletion (GDPR Art. 17; certificate of deletion) |

---

## 6. Architect's Checklist

- [ ] **DL1** — Every AI initiative has named architect owners for all 7 roles
- [ ] **DL2** — AI Safety Level classified and documented in model registry before Stage 2
- [ ] **DL3** — AI Impact Assessment completed at Incubation (preliminary) and Design (full)
- [ ] **DL4** — ARB submission includes: RAI sign-off, security sign-off, data residency confirmation
- [ ] **DL5** — AI Constitution ratified and deployed to policy engine before production
- [ ] **DL6** — Model card published before any user-facing deployment
- [ ] **DL7** — Data contract and lineage documented and signed off by Data Architect
- [ ] **DL8** — Eval gate framework in CI/CD; deployment blocked if gates fail
- [ ] **DL9** — Decommission plan exists from Day 1 of Design stage (not an afterthought)
- [ ] **DL10** — Use-case-specific regulatory checklist completed per sector
