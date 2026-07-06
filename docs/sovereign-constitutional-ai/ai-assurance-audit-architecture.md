---
title: AI Assurance & Audit Architecture
---

# AI Assurance & Audit Architecture (Deliverables 10 & 11)

**Audience:** AI Risk Officers, Internal Audit, External Auditors, AI Governance Leads, Regulators  
**Purpose:** Design the AI assurance framework (three lines of defense), AI audit ledger architecture, explainability requirements, and constitutional traceability systems.  
**Related:** [AI Governance Operating Model](ai-governance-operating-model.md) · [AI Risk Taxonomy](ai-risk-taxonomy.md) · [Policy-as-Code Framework](policy-as-code-framework.md)

!!! info "Current as of July 2026"
    The EU AI Act requires documented conformity assessments and post-market monitoring for High-Risk AI systems. ISO 42001:2023 requires an AI management system audit. NIST AI RMF's MEASURE and MANAGE functions define the operational assurance activities. This document designs the architecture to satisfy all three.

---

## 1. AI Assurance Framework (Deliverable 10)

### 1.1 What Is AI Assurance?

AI assurance is the **structured process of building justified confidence** that an AI system behaves as intended, within its constitutional constraints, in compliance with applicable regulations, and safely across its operational lifecycle.

Assurance is distinct from testing: testing verifies specific behaviors at a point in time; assurance provides continuous evidence that the system remains trustworthy across its operational lifetime.

**The assurance evidence hierarchy:**

```
ASSURANCE EVIDENCE HIERARCHY

Level 4: Independent Certification
   External auditor certifies AI system against ISO 42001,
   EU AI Act conformity assessment, or sector standard

Level 3: Independent Audit
   Internal audit or external auditor reviews evidence
   against governance standards; issues formal opinion

Level 2: Operational Evidence
   Continuous production monitoring: fairness metrics,
   constitutional compliance rates, drift indicators,
   incident logs, kill switch test results

Level 1: Design-Time Evidence
   Model cards, AI Impact Assessments, architecture records,
   constitution documents, training data audits, ARB approvals
```

### 1.2 Three Lines of Defense

```
THREE LINES OF DEFENSE FOR AI

┌─────────────────────────────────────────────────────────┐
│  FIRST LINE: AI Platform & Business Units               │
│  Owns: Day-to-day AI risk management                    │
│  Activities: Model monitoring, constitutional compliance, │
│              incident response, fairness monitoring,     │
│              agent operations                           │
│  Outputs: Operational metrics, incident reports         │
└─────────────────────────────────────────────────────────┘
              │ reports to
              ▼
┌─────────────────────────────────────────────────────────┐
│  SECOND LINE: RAIO + Risk & Compliance Office           │
│  Owns: AI risk oversight and governance standards       │
│  Activities: Policy development, RAI standards,         │
│              risk register management, exception review, │
│              regulatory compliance monitoring           │
│  Outputs: Risk assessments, policy exceptions, reports  │
└─────────────────────────────────────────────────────────┘
              │ reports to
              ▼
┌─────────────────────────────────────────────────────────┐
│  THIRD LINE: Internal Audit (+ External Auditor)        │
│  Owns: Independent assurance of AI governance           │
│  Activities: Annual AI audit, certification support,    │
│              regulatory examination support,            │
│              board-level assurance opinion              │
│  Outputs: Audit report, management letter, board opinion│
└─────────────────────────────────────────────────────────┘
              │ reports to
              ▼
        Board Audit Committee
```

### 1.3 Assurance Framework Components

| Component | Purpose | Frequency | Owner |
|---|---|---|---|
| **AI Impact Assessment** | Pre-deployment risk and benefit analysis | Before each significant deployment | RAIO |
| **Model Card** | Documented model performance, limitations, intended use | Each model version | ML team + RAIO |
| **AI FactSheet / System Card** | System-level documentation (model + deployment context) | Each system deployment | Solution Architect + RAIO |
| **Fairness Evaluation Report** | Statistical fairness across demographic groups | Monthly (automated) + Quarterly (human) | RAI Engineering |
| **Constitutional Compliance Report** | Compliance rate of model outputs with constitution | Weekly | RAI Engineering |
| **Adversarial Robustness Test** | Red-team results for known attack patterns | Quarterly | AI Security |
| **Operational AI Audit** | End-to-end review of AI system and governance | Annually (internal), Bi-annually (external) | Internal Audit |
| **Conformity Assessment** | EU AI Act or ISO 42001 certification | As required by regulation | External Auditor |

---

## 2. AI Audit Ledger Architecture (Deliverable 11)

### 2.1 The AI Audit Ledger

The AI audit ledger is an **immutable, tamper-evident record** of every consequential AI decision — providing the evidence chain required by regulators, courts, and governance bodies.

```
AI AUDIT LEDGER — DECISION RECORD STRUCTURE

Each decision record contains:

┌────────────────────────────────────────────────────────┐
│  DECISION RECORD                                        │
├────────────────────────────────────────────────────────┤
│  1. DECISION HEADER                                     │
│     record_id: UUID (immutable)                         │
│     timestamp: ISO-8601 + timezone                      │
│     session_id: correlation to user session             │
│     model_id: model version that generated output       │
│     constitution_version: constitution in effect        │
│     system_version: agent/system version                │
├────────────────────────────────────────────────────────┤
│  2. REASONING TRACE                                     │
│     chain_of_thought: model's reasoning (if captured)   │
│     retrieved_documents: RAG sources with relevance     │
│     tool_calls: ordered list of tool invocations        │
│     constitutional_checks: principles evaluated         │
│     policy_decisions: OPA/Cedar policy evaluation log   │
├────────────────────────────────────────────────────────┤
│  3. MEMORY ACCESS LOG                                   │
│     memories_read: IDs + content hashes accessed        │
│     memories_written: new memory entries created        │
│     memory_retention_class: data classification         │
├────────────────────────────────────────────────────────┤
│  4. TOOL CALL LOG                                       │
│     For each tool call:                                 │
│     - tool_id, tool_version                             │
│     - input_hash (not raw input for privacy)            │
│     - output_hash                                       │
│     - authorization_check_result                        │
│     - execution_sandbox_id                              │
├────────────────────────────────────────────────────────┤
│  5. OUTCOME & OVERSIGHT                                 │
│     final_output_hash: hash of response                 │
│     human_override: bool + override_id if applicable   │
│     escalation_triggered: bool + escalation_reason      │
│     constitutional_flags: list of violated principles   │
│     approval_required: bool + approval_id               │
│     approval_granted_by: human identity (hashed)        │
├────────────────────────────────────────────────────────┤
│  6. INTEGRITY                                           │
│     previous_record_hash: chained hash (tamper evident) │
│     record_hash: hash of this record                    │
│     signature: cryptographic signature (HSM-backed)     │
└────────────────────────────────────────────────────────┘
```

### 2.2 Audit Ledger Implementation

```
AUDIT LEDGER ARCHITECTURE

Agent Runtime
    │
    │ Publishes decision events (async, non-blocking)
    ▼
Event Stream (Kafka / Azure Event Hub / Kinesis)
    │
    │ Consumer (audit-logger service)
    ▼
Audit Writer
    │ Computes chained hash; signs with HSM
    ▼
Immutable Storage
    ├── WORM (Write Once Read Many) object store
    │   [AWS S3 Object Lock / Azure Immutable Blob]
    ├── Append-only database (PostgreSQL + triggers)
    └── Blockchain anchor (quarterly batch hash to chain)
          [for external audit verification]
    │
    ▼
Audit Query API (read-only)
    ├── Regulatory query endpoint (authenticated, rate-limited)
    ├── Internal audit portal (RAIO, Risk Office)
    └── Compliance reporting (automated report generation)
```

### 2.3 Audit Ledger Retention Policy

| AI System Tier | Minimum retention | Regulatory driver |
|---|---|---|
| **SL4 / Tier 1 Critical** | 10 years | EU AI Act Art. 12; SR 11-7 |
| **SL3 / Tier 2 Significant** | 7 years | GDPR; DORA; MiFID II |
| **SL2 / Tier 3 Standard** | 3 years | Internal policy |
| **SL1 / Tier 4 Minimal** | 1 year | Internal policy |

---

## 3. Explainability Architecture

### 3.1 Explainability Requirements by Stakeholder

| Stakeholder | Required explanation type | Format | Timing |
|---|---|---|---|
| **Individual user** | Why did the AI make this decision? | Plain language, < 200 words | On request, within 30 days |
| **Regulator** | How does this model work? What are its limitations? | Technical + non-technical (model card) | Before deployment + on examination |
| **Court / legal** | Reconstruct the specific decision chain | Audit ledger + full reasoning trace | On order |
| **Board / audit** | How well is AI performing across the portfolio? | Dashboard + summary metrics | Quarterly |
| **Internal audit** | Can we verify the AI acted within its governance? | Full audit ledger access | Annual |

### 3.2 Local Explainability (Decision-Level)

**SHAP (SHapley Additive exPlanations):** Assigns each input feature a contribution score for a specific prediction. Most widely adopted for tabular models (credit, risk).

```python
# SHAP explanation for a loan decision
import shap

explainer = shap.TreeExplainer(credit_model)
shap_values = explainer.shap_values(applicant_features)

# Human-readable explanation
shap.plots.waterfall(shap_values[applicant_idx])
# Output: "Income (+0.32 probability), Credit history (-0.15),
#          Employment status (+0.08), ..."
```

**LIME (Local Interpretable Model-agnostic Explanations):** Fits a simple interpretable model locally around a specific prediction. More flexible than SHAP for non-tabular data.

**Chain-of-thought logging:** For LLM-based agents, the model's internal reasoning trace is itself an explanation. Logging the chain-of-thought provides decision-level explainability without post-hoc approximation.

### 3.3 Global Explainability (Model-Level)

Global explanations describe overall model behavior:
- **Feature importance** — which inputs most influence predictions overall
- **Partial dependence plots** — how each feature affects output across its range
- **Model cards** — documented intended use, performance, limitations, biases
- **Behavioral testing** — CheckList-style test suite covering model capabilities and failure modes

### 3.4 Constitutional Traceability

**Constitutional traceability** answers: for a given output, which constitutional principles were evaluated, which were triggered, and what action resulted?

```yaml
# Constitutional traceability record (per decision)
constitutional_trace:
  decision_id: "DEC-2026-07-06-001234"
  principles_evaluated:
    - principle_id: P1
      principle: "Never expose customer PII"
      triggered: false
      evidence: "No PII detected in output"
    - principle_id: P3
      principle: "Never recommend unsuitable products"
      triggered: true
      action: BLOCKED
      evidence: "Suitability score 0.23 < threshold 0.7"
  escalation_triggered: false
  final_disposition: BLOCKED
  constitutional_classifier_version: "v2.3.1"
```

This record is stored in the audit ledger and links every blocked or modified output back to the specific constitutional principle that caused the intervention.

---

## 4. AI Certification Models

### 4.1 ISO 42001:2023 Certification

ISO 42001 is the international standard for AI Management Systems (AIMS). It specifies requirements for establishing, implementing, maintaining, and continually improving an AI management system.

**Key clauses for assurance:**

| Clause | Requirement | Evidence required |
|---|---|---|
| 6.1 | Risk and opportunity assessment | AI risk register; risk assessment methodology |
| 8.4 | AI system impact assessment | AI Impact Assessment documents |
| 9.1 | Performance monitoring | Monitoring metrics; fairness reports |
| 9.2 | Internal audit | Audit reports; audit schedule |
| 9.3 | Management review | Management review minutes |
| 10.2 | Nonconformity and corrective action | Incident log; corrective action records |

**Certification process:** Gap assessment → remediation → Stage 1 audit (documentation review) → Stage 2 audit (operational evidence) → Certification → Surveillance audits (annual).

### 4.2 EU AI Act Conformity Assessment

For High-Risk AI systems (EU AI Act Annex III), conformity assessment requires:

1. **Technical documentation** — system architecture, training data, performance metrics, risk management system, human oversight measures, security measures
2. **Quality management system** — documented processes aligned to ISO 42001 or equivalent
3. **Registration** — in EU database before deployment (Art. 49-50)
4. **Post-market monitoring** — ongoing monitoring with incident reporting (Art. 72)
5. **Third-party audit** — for AI systems used in biometric identification, critical infrastructure, or high-impact employment decisions

---

## 5. Architect's Checklist

- [ ] **AU1** — Three lines of defense defined and operational for all Tier 1/2 AI systems
- [ ] **AU2** — AI audit ledger deployed: immutable, chained, cryptographically signed
- [ ] **AU3** — Audit ledger retention policy implemented per tier and regulatory requirement
- [ ] **AU4** — Local explainability (SHAP/LIME or CoT logging) for all consequential decisions
- [ ] **AU5** — Model cards published for all production AI systems
- [ ] **AU6** — Constitutional traceability record generated and stored for every decision
- [ ] **AU7** — Regulatory query API available to authorized regulators on request
- [ ] **AU8** — Internal audit schedule established; annual audit completed
- [ ] **AU9** — ISO 42001 certification plan in place for Tier 1 systems
- [ ] **AU10** — EU AI Act conformity assessment completed for all High-Risk AI systems in EU

---

## Sources

- [ISO 42001:2023 — AI Management Systems](https://www.iso.org/standard/81230.html)
- [EU AI Act — Technical Documentation (Art. 11, Annex IV)](https://eur-lex.europa.eu) (2024)
- [NIST AI RMF — MEASURE & MANAGE Functions](https://airc.nist.gov/RMF) (2023)
- [Lundberg, S. & Lee, S. — A Unified Approach to SHAP Values](https://arxiv.org/abs/1705.07874) (2017)
- [Ribeiro, M. et al. — "Why Should I Trust You?": LIME](https://arxiv.org/abs/1602.04938) (2016)
- [IBM AI FactSheets](https://aifs360.res.ibm.com/) (2021)
