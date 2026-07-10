---
title: "AI Governance Operating Model"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["sovereign-constitutional-ai"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# AI Governance Operating Model (Deliverable 8)

**Audience:** Chief AI Officers, Enterprise Architects, CROs, Board Members, Legal and Compliance Leaders  
**Purpose:** Design the complete AI governance operating model — from board accountability through to agent operations — including governance functions, RACI, policy lifecycle, and board reporting.  
**Related:** [RAI Operating Model](rai-operating-model.md) · [AI Risk Taxonomy](ai-risk-taxonomy.md) · [AI Assurance & Audit Architecture](ai-assurance-audit-architecture.md) · [Enterprise AI Governance & Compliance](../enterprise-architecture/ai-architecture/enterprise-ai-governance-compliance.md)

> **See also:** For governance at the application/agentic UI layer, see [Agentic UI Governance](../agentic-ui/governance.md). For data and knowledge system governance, see [Governance & Responsible AI for Knowledge Systems](../knowledge-engineering/industry-practices/governance-rai.md). For strategic transformation and governance, see [AI-First Enterprise Volume 4](../enterprise-architecture/transformation/index.md).

:::info Current as of July 2026
    The EU AI Act (fully in force 2026) and ISO 42001:2023 both mandate documented AI governance structures with named accountabilities. Organizations without formal AI governance structures are now non-compliant in EU-regulated markets. This document designs the full operating model; for regulatory deep-dive see [Enterprise AI Governance & Compliance](../enterprise-architecture/ai-architecture/enterprise-ai-governance-compliance.md).

---

## 1. Governance Layers

The AI governance operating model spans six layers, from board fiduciary accountability down to day-to-day agent operations:

```
AI GOVERNANCE OPERATING MODEL — 6 LAYERS

┌──────────────────────────────────────────────────────────────┐
│  LAYER 1: BOARD GOVERNANCE                                    │
│  Ultimate fiduciary accountability for AI risk and strategy  │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Board Risk Committee | Board Audit Committee            │ │
│  │ Receives: Quarterly AI risk briefing                    │ │
│  │ Approves: AI risk appetite statement                    │ │
│  │ Oversees: AI incidents (material)                       │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  LAYER 2: AI GOVERNANCE COUNCIL                              │
│  Cross-functional strategic governance body                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Chair: CEO or CAIO                                      │ │
│  │ Members: CISO, CRO, CLO, CFO, CTO, CDO, Head of RAI   │ │
│  │ Sets: AI strategy, risk appetite, major policy          │ │
│  │ Approves: Tier 1 & 2 AI deployments                    │ │
│  │ Cadence: Monthly                                        │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  LAYER 3: RISK & COMPLIANCE OFFICE                           │
│  Regulatory compliance, risk management, audit liaison        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Chief Risk Officer (CRO)                                │ │
│  │ AI Risk Manager (dedicated)                             │ │
│  │ Compliance Officer (AI regulations)                     │ │
│  │ Owns: AI risk register, regulatory mapping              │ │
│  │ Cadence: Continuous + weekly triage                     │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  LAYER 4: RESPONSIBLE AI OFFICE (RAIO)                       │
│  RAI standards, constitution governance, bias monitoring      │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Head of RAI / Chief AI Ethics Officer                   │ │
│  │ RAI Policy Team | RAI Engineering | RAI Assurance       │ │
│  │ RAI Champions (embedded in business units)              │ │
│  │ Owns: AI constitutions, model cards, fairness           │ │
│  │ Cadence: Weekly operational + monthly governance        │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  LAYER 5: AI PLATFORM TEAM                                   │
│  Technical implementation and AI infrastructure governance    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Principal AI Architect                                  │ │
│  │ AI Platform Engineering | MLOps | AI Security           │ │
│  │ Data Engineering | Model Ops                            │ │
│  │ Owns: AI landing zone, model registry, eval pipelines   │ │
│  │ Cadence: Daily operations                               │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│  LAYER 6: AGENT OPERATIONS                                   │
│  Runtime management and control of deployed AI agents        │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Agent Operations Team (24x7)                            │ │
│  │ On-call engineers | Agent monitors | Kill-switch ops    │ │
│  │ Owns: Agent health, incident response, kill switches    │ │
│  │ Cadence: Continuous 24x7                                │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. Governance Functions

### 2.1 Policy Management

**Policy lifecycle** for AI governance:

```
POLICY LIFECYCLE

Trigger               Draft              Review
(regulation,    ──▶  (Policy Team) ──▶  (Legal, Risk,
 incident,                               Compliance,
 strategic need)                         RAI, CISO)
                                              │
Deploy                Approve               │
(via policy-  ◀──   (AI Governance  ◀──────┘
 as-code)             Council)
     │
     ▼
Monitor + Measure     Exception Handling
(compliance rate, ──▶ (ad-hoc review,
 violation log)        policy update if
                        pattern emerges)
```

**Policy taxonomy:**

| Policy type | Scope | Owner | Review frequency |
|---|---|---|---|
| **AI Risk Appetite Statement** | All AI | Board Risk Committee | Annual |
| **AI Acceptable Use Policy** | All staff | RAIO + Legal | Annual |
| **AI Development Standards** | Development teams | AI Platform + RAIO | Semi-annual |
| **Agent Autonomy Policy** | All agents | RAIO + CISO | Quarterly |
| **Data Sovereignty Policy** | All AI data | CDO + Legal | Annual |
| **Model Risk Policy** | All models | CRO + AI Platform | Annual |
| **AI Procurement Policy** | Vendor AI | Legal + CRO | Annual |
| **Incident Response Policy** | Operations | CISO + AI Platform | Semi-annual |

### 2.2 Model Approval Process

All AI models must pass through a governance-gated approval pipeline before production deployment:

```
MODEL APPROVAL PIPELINE

Stage 1: Model Registration
   Submit to Model Registry with:
   - Model Card (performance, limitations, intended use)
   - Training data provenance
   - Fairness evaluation results
   - Security review (adversarial robustness)

Stage 2: Risk Tier Classification
   Tier 1 (Critical): High autonomy + high-stakes decisions
   Tier 2 (Significant): Moderate autonomy or high-stakes decisions
   Tier 3 (Standard): Low autonomy or low-stakes decisions
   Tier 4 (Minimal): Advisory or informational only

Stage 3: Risk-Tiered Review
   Tier 1: Full AI Governance Council + external audit
   Tier 2: RAIO + CRO + Platform team
   Tier 3: RAIO + Platform team
   Tier 4: RAI Champion + Platform team

Stage 4: AI Impact Assessment Sign-off
   RAIO Head approval for Tier 1/2
   RAI Champion approval for Tier 3/4

Stage 5: Deployment Authorization
   Signed deployment authorization with:
   - Named accountable owner
   - Approved autonomy level
   - Monitoring requirements
   - Review schedule
   - Kill switch contact
```

### 2.3 Agent Approval Process

Agents require additional approval beyond model approval due to their autonomous, multi-step, tool-using nature:

```
AGENT APPROVAL ADDITIONAL REQUIREMENTS

Beyond model approval, agents must demonstrate:

┌─ Constitution compliance
│   Agent constitution reviewed and approved by RAIO
│   Constitutional classifier deployed and tested

├─ Tool inventory reviewed
│   All tools/MCP servers inventoried
│   Tool risk profile assessed
│   Least-privilege tool access confirmed

├─ Autonomy level set and enforced
│   Autonomy level declared (L0–L5)
│   Policy engine enforces declared level
│   Escalation paths tested

├─ Kill switch operational
│   Per-agent kill switch tested (< 5 min reachability)
│   On-call procedure documented
│   Escalation chain verified

└─ Memory and state governance
    Memory retention policy applied
    PII handling in agent memory reviewed
    Cross-session data governance confirmed
```

### 2.4 Exception Management

When an AI system needs to operate outside its approved parameters:

| Exception type | Process | Approval level | Max duration |
|---|---|---|---|
| **Minor exception** (parameter tuning) | Documented in exception log | RAIO + Platform Lead | 30 days |
| **Standard exception** (new tool, expanded data) | Exception request form + review | RAIO + CRO | 90 days |
| **Major exception** (autonomy level increase) | Full risk assessment | AI Governance Council | 180 days |
| **Emergency exception** (incident response) | Verbal + documented post-hoc | CISO + RAIO | 24 hours + formal review |

### 2.5 Risk Acceptance

When residual risk cannot be eliminated:

```
RISK ACCEPTANCE PROCESS

Residual risk identified by AI Platform or RAIO
    │
    ▼
Risk quantification
   (Probability × Impact × Reversibility score)
    │
    ▼
Mitigation options evaluated
   (reduce probability / reduce impact / transfer / avoid)
    │
    ▼
Risk acceptance recommendation drafted by CRO
    │
    ▼
Acceptance signed by appropriate level:
   Score 1-6:   Platform Lead + RAI Champion
   Score 7-12:  RAIO Head + CRO
   Score 13-20: AI Governance Council
   Score 21-25: Board Risk Committee
    │
    ▼
Accepted risk added to AI Risk Register with:
   Owner | Review date | Mitigation plan | Residual score
```

### 2.6 Compliance Monitoring

| Activity | Frequency | Tool | Output |
|---|---|---|---|
| Constitutional violation monitoring | Real-time | Policy engine alerts | Violation dashboard |
| Fairness metric monitoring | Daily | Fairness monitoring pipeline | Drift alert |
| Model performance monitoring | Continuous | MLOps platform | Degradation alert |
| Regulatory change monitoring | Weekly | Regulatory intelligence subscription | Policy impact assessment |
| External audit | Annual (Tier 1), Bi-annual (Tier 2) | External auditors | Audit report |
| Regulatory examination | As requested by regulator | Multi-team response | Examination findings |

---

## 3. AI Review Board

The AI Review Board (ARB-AI) is the technical governance body that reviews AI architectures, models, and agent deployments before they enter production.

### 3.1 ARB-AI Composition

| Role | Responsibility |
|---|---|
| **Principal AI Architect** (Chair) | Technical architecture authority |
| **AI Security Architect** | Security and threat model review |
| **RAI Champion** | RAI and constitutional compliance |
| **Data Architect** | Data governance and sovereignty review |
| **CRO Representative** | Risk scoring and appetite alignment |
| **Domain Expert** (rotating) | Business / domain-specific review |

### 3.2 Three-Stage ARB-AI Review

```
ARB-AI REVIEW STAGES

Stage 1: Architecture Review (Design Phase)
   Inputs: Architecture Decision Records, system design
   Focus: Architectural soundness, scalability, sovereignty
   Output: Architecture approval or redesign required
   SLA: 5 business days

Stage 2: Pre-Production Review (Before deployment)
   Inputs: Model card, fairness report, security review,
           AI impact assessment, constitution
   Focus: Compliance with approved architecture + RAI standards
   Output: Deployment authorization or remediation required
   SLA: 3 business days

Stage 3: Post-Production Review (90 days after deployment)
   Inputs: Production metrics, incident log, drift report
   Focus: Actual vs. expected behavior, emerging risks
   Output: Continue / modify / decommission recommendation
   SLA: 5 business days
```

---

## 4. RACI Matrix

| Activity | Board | AI Gov Council | CRO | RAIO | Platform | Agent Ops |
|---|---|---|---|---|---|---|
| AI risk appetite | A | C | R | C | I | I |
| AI constitution | I | A | C | R | C | I |
| Model approval (T1) | I | A | C | R | R | I |
| Model approval (T2/3) | I | I | C | A | R | I |
| Agent approval | I | I | C | A | R | I |
| Fairness monitoring | I | I | I | A | R | I |
| Kill switch (incident) | I | I | C | C | C | R, A |
| Risk acceptance (T1) | A | R | R | C | I | I |
| External audit | A | R | C | C | C | I |
| Policy lifecycle | I | A | C | R | C | I |
| Regulatory response | I | A | R | C | C | I |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*

---

## 5. Policy Lifecycle

### 5.1 Policy-as-Code Pipeline

AI governance policies are not just documents — they must be executable:

```
POLICY-AS-CODE LIFECYCLE

1. Policy authored in natural language (RAIO)
        │
        ▼
2. Policy translated to Rego/Cedar (Platform team)
   reviewed and approved by RAIO + CISO
        │
        ▼
3. Policy tested in simulation environment
   (edge cases, adversarial inputs)
        │
        ▼
4. Policy deployed to policy engine (OPA/Cedar)
   in shadow mode (log-only, no enforcement)
        │
        ▼
5. Shadow mode monitoring (2 weeks minimum)
   false positive rate < 0.5% before enforcement
        │
        ▼
6. Enforcement mode activated
   (violations blocked, not just logged)
        │
        ▼
7. Continuous monitoring + anomaly detection
        │
        ▼
8. Policy review at scheduled cadence
   or triggered by incident/regulatory change
```

See [Policy-as-Code Framework](policy-as-code-framework.md) for implementation details.

---

## 6. Governance Cadence

| Meeting | Frequency | Participants | Agenda |
|---|---|---|---|
| Agent Operations Standup | Daily | Agent Ops, Platform on-call | Health, alerts, incidents |
| AI Platform Review | Weekly | Platform, RAI Champions | Deployments, drift, exceptions |
| RAI Governance Review | Monthly | RAIO, CRO, Legal | Policy, fairness, audit readiness |
| AI Governance Council | Monthly | C-suite + RAIO + CRO | Strategy, major approvals, risk |
| Board AI Briefing | Quarterly | Board Risk Committee, CEO, CAIO | Executive risk view, KPIs |
| Annual AI Audit | Annual | External auditors, RAIO, CRO | Comprehensive compliance audit |

---

## 7. AI Board Reporting Framework (Deliverable 17)

### 7.1 Quarterly Board AI Briefing Pack

**Section 1: AI Risk Dashboard (1 page)**

```
AI RISK DASHBOARD — Q[X] [YEAR]

Risk Appetite Status:        ██████░░░░  60% utilized
Active AI Systems:           [N] total | [T1] Tier 1 | [T2] Tier 2 | [T3] Tier 3
Constitutional Violations:   [N] this quarter | trend: ↓ vs last quarter
Fairness Threshold Breaches: [N] this quarter | [N] remediated
Open Risk Exceptions:        [N] | Tier 1: [N] | Tier 2: [N]
Material Incidents:          [N] | [1-line description if any]
Regulatory Examinations:     [pending/completed]
```

**Section 2: Strategic AI Update (1-2 pages)**
- AI portfolio summary: systems by category and tier
- Value delivered: cost savings, revenue impact, productivity
- Major deployments this quarter
- Sovereign AI infrastructure status
- Regulatory landscape changes impacting the organization

**Section 3: Risk Deep-Dives (2-3 pages)**
- Top 3 AI risks: description, current mitigation, residual rating
- Emerging risk horizon (next quarter)
- External AI incident context (industry incidents, regulatory signals)

**Section 4: Governance Health (1 page)**
- Model approval pipeline: throughput, average review time
- RAI training completion rate
- Audit readiness score (vs. ISO 42001, EU AI Act)
- Exception log summary

### 7.2 Board-Level KPIs

| KPI | Definition | Target | Current |
|---|---|---|---|
| AI Risk Exposure Score | Weighted average risk rating across portfolio | < 12 (moderate) | — |
| Constitutional Compliance Rate | % of interactions with no constitutional violations | > 99.9% | — |
| Fairness Threshold Compliance | % of systems meeting all fairness thresholds | 100% | — |
| Model Approval Cycle Time | Days from submission to decision (Tier 1) | < 15 days | — |
| Kill Switch Drill Success | % of quarterly kill switch drills completed within SLA | 100% | — |
| RAI Training Completion | % of AI-involved staff with current training | > 95% | — |
| External Audit Score | Score on most recent independent audit (100-point scale) | > 80 | — |

---

## 8. Best Practices

- **Embed governance in the delivery pipeline** — approval gates in CI/CD prevent governance from being bypassed under delivery pressure.
- **Make the board conversation strategic** — boards don't need model metrics; they need risk exposure, regulatory status, and strategic AI health.
- **Tier your governance overhead** — applying Tier 1 rigor to every AI system makes governance unworkable. Risk-tiered governance is the only scalable model.
- **Connect constitution to policy code** — every constitutional principle must map to a measurable, executable policy rule or it is not operational governance.
- **Govern agents differently from models** — agents have tool access, autonomy, and long-horizon behavior that require additional governance controls beyond model governance alone.

## 8. Antipatterns

- **Governance on paper only**: Documented governance with no operational implementation. Common in organizations that created governance in response to regulatory pressure but didn't fund implementation.
- **Single layer governance**: Reviewing models at deployment but no constitutional alignment, no production monitoring, and no kill switch testing.
- **Governance without teeth**: AI Governance Council that reviews but cannot block deployments. Governance authority must include approval/rejection power.
- **Board reporting as technology update**: Board-level AI reporting that covers model architectures rather than risk, value, and strategic health.

---

## Sources

- [ISO 42001:2023 — AI Management System](https://www.iso.org/standard/81230.html)
- [EU AI Act — Governance Requirements (Art. 9, 14, 17)](https://eur-lex.europa.eu) (2024)
- [NIST AI RMF — GOVERN Function](https://airc.nist.gov/RMF) (2023)
- [Microsoft Responsible AI — Governance Model](https://www.microsoft.com/en-us/ai/responsible-ai) (2022)
- [Bank of England / PRA — AI Governance Expectations](https://www.bankofengland.co.uk) (2025)
- [EBA — AI Model Risk Management Guidelines](https://www.eba.europa.eu) (2025)
