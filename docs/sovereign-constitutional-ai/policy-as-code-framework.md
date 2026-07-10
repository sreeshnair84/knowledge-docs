---
title: "Policy-as-Code Framework"
date_created: 2026-07-07
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["sovereign-constitutional-ai"]
---

# Policy-as-Code Framework (Deliverables 12 & 15)

**Audience:** Principal AI Architects, Security Architects, AI Governance Leads, Platform Engineers  
**Purpose:** Design the complete policy-as-code framework for AI governance — OPA/Rego, Cedar, OpenFGA, and PBAC — including the constitution-to-code pipeline and the Responsible AI Control Library.  
**Related:** [Constitutional AI Engineering](constitutional-ai-engineering.md) · [Constitutional Agent Architecture](constitutional-agent-architecture.md) · [Policy & Authorization](../ai-security-governance/policy/index.md) · [Machine-Readable EA](../coding-tools/enterprise-ai-architect/machine-readable-ea.md)

:::info Current as of July 2026
    This document extends the OPA/Cedar coverage in [Policy & Authorization](../ai-security-governance/policy/index.md) and [Machine-Readable EA](../coding-tools/enterprise-ai-architect/machine-readable-ea.md) with the **constitutional policy engineering** layer — transforming high-level AI constitutional principles into executable runtime policies. For foundational OPA/Cedar syntax and patterns, see those documents.

---

## 1. Policy Engine Comparison

| Engine | Policy language | Paradigm | Strengths | AI governance use case |
|---|---|---|---|---|
| **OPA (Open Policy Agent)** | Rego | General-purpose; unified policy | Kubernetes-native; broad ecosystem; HTTP API | Authorization decisions; input/output filtering; compliance checks |
| **Cedar** | Cedar | Fine-grained; entity-based; fast | AWS-native; explicitly safe (formally verified); easy reasoning | Agent capability controls; resource access; action authorization |
| **OpenFGA** | JSON tuples | Relationship-based (Zanzibar) | Google-inspired; great for social graphs and delegated access | Agent delegation chains; multi-principal access; trust hierarchies |
| **Casbin** | Model + policy files | RBAC/ABAC/PBAC | Simple to deploy; multi-language SDK | Basic RBAC for agent tool access |

**Recommended combination for enterprise constitutional AI:**
- **Cedar** for agent capability authorization (what agents can do and to what resources)
- **OPA** for complex compliance checks (multi-condition, cross-system)
- **OpenFGA** for delegation chains (orchestrator → worker → tool authorization)

---

## 2. Constitution-to-Code Pipeline (Deliverable 12)

The pipeline transforms high-level constitutional principles into executable runtime policy.

```
CONSTITUTION-TO-CODE PIPELINE

Step 1: Constitutional Principle (human-readable)
   "Agents must never expose customer PII to unauthorized parties"

        │
        ▼

Step 2: Policy Specification (structured natural language)
   Trigger:    Any agent output
   Condition:  Contains PII AND recipient is not PII-authorized
   Action:     BLOCK output + LOG constitutional violation P1
   Evidence:   Record PII-type detected, recipient authorization status

        │
        ▼

Step 3: Policy Rule (Rego / Cedar)

   # OPA Rego implementation
   package ai.constitutional

   deny[reason] {
     input.action == "output"
     pii_detected := detect_pii(input.content)
     pii_detected != []
     not authorized_for_pii(input.recipient_id)
     reason := sprintf("Constitutional violation P1: PII (%v) to unauthorized recipient",
                       [pii_detected])
   }

        │
        ▼

Step 4: Runtime Enforcement (Policy Decision Point)
   Agent output → Policy Engine → ALLOW / DENY
   Decision logged to Audit Registry

        │
        ▼

Step 5: Audit Evidence
   {
     "decision_id": "DEC-2026-07-06-001",
     "constitutional_principle": "P1",
     "trigger": "pii_in_output",
     "action": "BLOCKED",
     "evidence": {"pii_types": ["email", "phone"], "recipient_auth": false}
   }
```

### 2.1 Banking Constitution → Policy Examples

```rego
# BANK-CONST-001 → OPA Rego
package bank.constitution

# Principle BP1: Never approve credit without fair lending checks
deny[reason] {
  input.action == "credit_approval"
  not fair_lending_check_complete(input.application_id)
  reason := "BP1: Fair lending check not completed"
}

# Principle BP2: Never recommend unsuitable products (MiFID II)
deny[reason] {
  input.action == "investment_recommendation"
  suitability_score := calculate_suitability(
    input.product_id,
    input.customer_profile_id
  )
  suitability_score < data.thresholds.suitability_minimum
  reason := sprintf("BP2: Product suitability score %.2f below threshold %.2f",
                    [suitability_score, data.thresholds.suitability_minimum])
}

# Principle BP5: Never make final adverse credit decision without human review
deny[reason] {
  input.action == "adverse_credit_decision"
  input.final == true
  not human_review_completed(input.application_id)
  reason := "BP5: Final adverse decision requires human review (GDPR Art. 22)"
}
```

```cedar
// Cedar: Agent capability control for banking
permit(
  principal == Agent::"loan-underwriting-agent",
  action == Action::"query_credit_bureau",
  resource == CreditBureau::"equifax-eu"
)
when {
  principal.autonomy_level <= 2 &&
  resource.region == principal.approved_regions &&
  context.purpose == "credit_assessment"
};

forbid(
  principal is Agent,
  action == Action::"send_external_email",
  resource is ExternalSystem
)
unless {
  principal.email_authorized == true &&
  context.recipient in principal.approved_recipients
};
```

### 2.2 Healthcare Constitution → Policy Examples

```rego
# HEALTH-CONST-001 → OPA Rego
package health.constitution

# Principle HP1: Never recommend treatment without validated evidence base
deny[reason] {
  input.action == "treatment_recommendation"
  evidence_level := get_evidence_level(input.treatment_id, input.condition_id)
  evidence_level < data.thresholds.minimum_evidence_level
  reason := sprintf("HP1: Treatment evidence level %d below minimum %d",
                    [evidence_level, data.thresholds.minimum_evidence_level])
}

# Principle HP4: Never train on patient data without de-identification + IRB
deny[reason] {
  input.action == "model_training"
  not input.dataset.deidentified
  reason := "HP4: Patient data must be de-identified before use in training"
}

deny[reason] {
  input.action == "model_training"
  input.dataset.contains_patient_data
  not irb_approved(input.dataset.id)
  reason := "HP4: IRB approval required for patient data use in training"
}
```

### 2.3 Government Constitution → Policy Examples

```rego
# GOV-CONST-001 → OPA Rego
package government.constitution

# Principle GP1: No final decisions on citizen rights without human review
deny[reason] {
  input.action == "benefit_determination"
  input.final == true
  not human_review_completed(input.case_id)
  reason := "GP1: Citizen rights decisions require human review (EU AI Act Art. 14)"
}

# Principle GP5: Citizen data must remain on sovereign infrastructure
deny[reason] {
  input.action == "data_transfer"
  input.data_classification == "citizen_data"
  not is_sovereign_destination(input.destination)
  reason := "GP5: Citizen data may only be transferred to sovereign infrastructure"
}
```

---

## 3. OpenFGA for Agent Delegation Chains

OpenFGA (Relationship-Based Access Control) models the delegation chains that govern multi-agent authorization:

```
AGENT DELEGATION CHAIN

Human User
   │ delegates
   ▼
Orchestrator Agent (granted: orchestrator_permission)
   │ can grant to
   ▼
Worker Agent A (granted: worker_a_permission ⊆ orchestrator_permission)
   │ can request from
   ▼
Tool / Resource (checks: is Worker Agent A authorized?)

OpenFGA tuple representation:
user:orchestrator-agent#can_delegate → worker-agent-a
user:worker-agent-a#can_access → tool:credit-bureau-api
user:human-user#can_authorize → orchestrator-agent
```

```json
// OpenFGA authorization model for agent delegation
{
  "type_definitions": [
    {
      "type": "Agent",
      "relations": {
        "orchestrator": {"this": {}},
        "worker": {"this": {}},
        "can_delegate": {
          "union": {
            "child": [
              {"this": {}},
              {"computedUserset": {"relation": "orchestrator"}}
            ]
          }
        }
      }
    },
    {
      "type": "Tool",
      "relations": {
        "can_access": {
          "union": {
            "child": [
              {"this": {}},
              {"tupleToUserset": {
                "tupleset": {"relation": "authorized_agent"},
                "computedUserset": {"relation": "can_delegate"}
              }}
            ]
          }
        }
      }
    }
  ]
}
```

---

## 4. PBAC — Policy-Based Access Control for AI

Policy-Based Access Control (PBAC) goes beyond role-based and attribute-based control to express complex, dynamic conditions as first-class policies. For AI governance, PBAC enables:

- **Context-sensitive authorization**: same agent, different autonomy level at different times of day or market conditions
- **Constitutional conditions**: authorization contingent on constitutional compliance status
- **Risk-adaptive authorization**: higher-risk actions require higher-trust principal or lower-risk context

```yaml
# PBAC policy example: adaptive authorization
policy:
  id: "POL-AGENT-CREDIT-001"
  name: "Credit Decision Authorization"
  
  statements:
    - effect: ALLOW
      principal:
        type: Agent
        attribute: autonomy_level
        operator: lte
        value: 2
      action: "credit_decision"
      resource:
        type: LoanApplication
        attribute: amount
        operator: lte
        value: 50000
      conditions:
        - constitutional_compliance_rate: ">= 0.99"
        - fair_lending_check: "COMPLETED"
        - market_hours: "true"
    
    - effect: ALLOW
      principal:
        type: Agent
        attribute: autonomy_level
        operator: lte
        value: 1
      action: "credit_decision"
      resource:
        type: LoanApplication
        attribute: amount
        operator: gt
        value: 50000
      conditions:
        - human_reviewer: "ASSIGNED"
        - dual_authorization: "REQUIRED"
```

---

## 5. Responsible AI Control Library (Deliverable 15)

The RAI Control Library is a catalogued set of reusable policy controls — the "control reference" for building constitutional policy stacks.

### 5.1 Core Control Catalog

| Control ID | Category | Name | Policy engine | Enforcement |
|---|---|---|---|---|
| **RAI-001** | Privacy | PII detection and blocking | OPA | Block output if PII detected for unauthorized recipient |
| **RAI-002** | Privacy | Data residency enforcement | Cedar | Block data transfer to non-sovereign destination |
| **RAI-003** | Fairness | Demographic parity gate | OPA | Block batch decision if demographic parity gap > threshold |
| **RAI-004** | Transparency | AI identity disclosure | OPA | Require AI disclosure in all user-facing outputs |
| **RAI-005** | Safety | Irreversibility gate | Cedar | Require human approval for irreversible actions |
| **RAI-006** | Safety | Kill switch enforcement | System | All agents reachable and stoppable |
| **RAI-007** | Accountability | Decision logging | System | All decisions logged to audit registry |
| **RAI-008** | Accountability | Human escalation | OPA | Block final decisions on protected categories without human review |
| **RAI-009** | Autonomy | Autonomy level enforcement | Cedar | Deny actions outside declared autonomy level |
| **RAI-010** | Constitutional | Constitutional classifier | Model | Block outputs violating constitutional principles |
| **RAI-011** | Security | Prompt injection detection | System | Block suspected injection attempts |
| **RAI-012** | Sovereignty | Sovereign infra enforcement | Cedar | All Tier 1 workloads on sovereign infrastructure only |
| **RAI-013** | Regulatory | GDPR Art. 22 gate | OPA | Block fully automated decisions on protected individuals without opt-out |
| **RAI-014** | Regulatory | SR 11-7 documentation | System | Generate model documentation on deployment |
| **RAI-015** | Constitutional | Constitutional traceability | System | Log constitutional evaluation for every consequential decision |

### 5.2 Control Implementation Template

```rego
# RAI Control Library — Control Template
# Control ID: RAI-003 — Demographic Parity Gate
# Category: Fairness
# Description: Blocks batch credit decisions if demographic parity gap exceeds threshold

package rai.fairness.demographic_parity

import future.keywords.if

# Configuration (loaded from policy data)
threshold := data.rai_controls.RAI003.threshold  # default: 0.05

deny[reason] if {
  input.action == "batch_credit_decision"
  gap := abs(
    input.metrics.approval_rate_group_a - input.metrics.approval_rate_group_b
  )
  gap > threshold
  reason := sprintf(
    "RAI-003: Demographic parity gap %.3f exceeds threshold %.3f. Block batch.",
    [gap, threshold]
  )
}

# Helper
abs(x) := x if x >= 0
abs(x) := -x if x < 0
```

---

## 6. Policy Deployment Architecture

```
POLICY DEPLOYMENT PIPELINE

Constitution update committed (RAIO approval)
    │
    ▼
CI/CD pipeline:
   ├── Policy syntax validation (opa test / cedar analyze)
   ├── Unit tests (constitutional edge cases)
   ├── Performance test (< 5ms p99 decision latency)
   └── Security scan (policy injection risk)
    │
    ▼
Shadow deployment (log-only, 2 weeks)
   Monitor: false-positive rate; decision latency
    │
    ▼
Canary deployment (10% of traffic)
    │
    ▼
Full deployment (100%)
    │
    ▼
Policy monitoring dashboard
   - Decision volume by policy
   - Block rate by control
   - False positive rate (human appeal outcomes)
   - Latency (p50, p95, p99)
```

---

## Sources

- [OPA — Open Policy Agent](https://www.openpolicyagent.org) (2026)
- [Cedar Policy Language](https://www.cedarpolicy.com) (Amazon, 2023)
- [OpenFGA — Fine-Grained Authorization](https://openfga.dev) (2023)
- [NIST SP 800-162 — ABAC Guide](https://csrc.nist.gov/publications/detail/sp/800-162/final) (2014)
- [Policy & Authorization](../ai-security-governance/policy/index.md) (this repo, 2026)
- [Machine-Readable EA](../coding-tools/enterprise-ai-architect/machine-readable-ea.md) (this repo, 2026)
