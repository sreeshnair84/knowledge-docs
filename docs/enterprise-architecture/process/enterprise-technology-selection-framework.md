---
title: "Enterprise Technology Selection & Decision Framework"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["enterprise-architecture", "technology-selection", "decision-framework", "governance", "arb"]
doc_type: guide
framework_name: Enterprise Technology Selection & Decision Framework
covers_version: "as of 2026-07-10"
---

# Enterprise Technology Selection & Decision Framework

**Audience:** Enterprise architects, architecture review boards (ARBs), platform engineering leads, CTO/CIO advisors, technology procurement teams, and engineering leadership.

**Purpose:** A vendor-neutral, repeatable framework for evaluating, comparing, selecting, governing, and retiring technologies across the enterprise AI, cloud, platform engineering, security, data, DevOps, and application landscape.

**What this guide covers:** Decision philosophy, classification taxonomy, evaluation criteria, scoring methodologies, buy/build/partner framework, lifecycle management, PoC standards, risk assessment, vendor evaluation, TCO modelling, ARB process, ADR templates, anti-patterns, and reference models for different organisation types.

**Related:** [ARB Governance](../architectural-review-board/index.md) | [Technology Investment Fundamentals](../../ea-masterclass/module-04-technology-investment/index.md) | [AI Solution Lifecycle](ai-solution-lifecycle-deliverables.md) | [Multi-Model AI Strategy](../ai-architecture/enterprise-multi-model-ai-strategy.md)

---

## Table of Contents

1. [Technology Decision Philosophy](#1-technology-decision-philosophy)
2. [Technology Classification Framework](#2-technology-classification-framework)
3. [Enterprise Decision Criteria](#3-enterprise-decision-criteria)
4. [Weighted Decision Matrix Methods](#4-weighted-decision-matrix-methods)
5. [Buy vs Build vs Extend vs Partner](#5-buy-vs-build-vs-extend-vs-partner)
6. [Architecture Fitness Assessment](#6-architecture-fitness-assessment)
7. [Technology Lifecycle Management](#7-technology-lifecycle-management)
8. [Proof of Concept Framework](#8-proof-of-concept-framework)
9. [Enterprise Standards and Exceptions](#9-enterprise-standards-and-exceptions)
10. [Technology Rationalization](#10-technology-rationalization)
11. [Risk Assessment Framework](#11-risk-assessment-framework)
12. [Vendor Evaluation Framework](#12-vendor-evaluation-framework)
13. [Total Cost of Ownership](#13-total-cost-of-ownership)
14. [Organisational Readiness](#14-organisational-readiness)
15. [ARB Decision Process](#15-arb-decision-process)
16. [Decision Documentation — ADRs](#16-decision-documentation--architecture-decision-records)
17. [Measuring Success After Selection](#17-measuring-success-after-selection)
18. [Common Decision Anti-Patterns](#18-common-decision-anti-patterns)
19. [Reference Models by Organisation Type](#19-reference-models-by-organisation-type)
20. [Templates and Checklists](#20-templates-and-checklists)

---

## 1. Technology Decision Philosophy

### 1.1 Core Principles

Enterprise technology selection should be governed by a set of explicit principles that prevent arbitrary, politically driven, or fad-driven decisions.

| Principle | Description | Anti-pattern it prevents |
|---|---|---|
| **Business-first** | Technology is selected to solve a business problem, not because it is new or interesting | Technology-first architecture |
| **Capability-driven** | Select for the capability required, not the feature list offered | Feature checklist bias |
| **Strategic alignment** | Technology must fit or accelerate the enterprise's 3–5 year strategy | Tactical decisions that contradict strategy |
| **Platform thinking** | Prefer one platform that solves a class of problems over many tools that each solve one problem | Tool sprawl |
| **Standardisation over optimisation** | Enterprise-wide standards beat team-level best-of-breed | Local optimisation / global dysfunction |
| **Total cost awareness** | Evaluate TCO over 3–5 years, not acquisition cost alone | Licence-first procurement |
| **Simplicity bias** | A simpler solution that covers 90% of use cases beats a complex one that covers 100% | Accidental complexity |
| **Maintainability first** | Code/platform you can maintain in 5 years beats the best solution you cannot sustain | Operational debt |
| **Technology optionality** | Preserve the ability to switch or extend without rewriting everything | Premature lock-in |
| **Evidence over advocacy** | Decisions are backed by benchmarks, references, and PoCs — not vendor decks | Marketing influence |

### 1.2 Strategic Platform vs Best-of-Breed

The eternal tension in enterprise technology:

| Dimension | Strategic Platform | Best-of-Breed |
|---|---|---|
| **Integration overhead** | Low (same vendor/ecosystem) | High (every tool is a separate integration) |
| **Operational complexity** | Low (one team, one contract, one upgrade cycle) | High (multiple vendors, multiple upgrade cycles) |
| **Capability ceiling** | Limited by platform roadmap | High (pick the best at each layer) |
| **Vendor dependency** | High | Distributed |
| **Total support cost** | Lower | Higher |
| **Innovation speed** | Slower (wait for platform roadmap) | Faster (adopt best new tool immediately) |
| **Migration cost when wrong** | Very high | Lower per tool (but compounding) |

**Recommendation:** Default to strategic platform. Deviate only when a specific best-of-breed capability is (a) measurably better, (b) cannot be solved by the platform, and (c) the integration cost is justified by the gain.

### 1.3 The Technology Optionality Principle

Build systems so you can change the underlying technology without rewriting business logic:

```
WRONG (zero optionality):
Application code → Vendor-specific SDK calls → Vendor APIs

RIGHT (technology optionality):
Application code → Internal abstraction → Adapters → Vendor APIs
                                         ↓
                                   Swap adapter = swap vendor
```

Optionality has a cost (abstraction overhead). Pay it only for decisions where switching is likely within 3 years or where the downside of lock-in is severe.

---

## 2. Technology Classification Framework

### 2.1 Technology Taxonomy

Different categories of technology warrant different levels of evaluation rigour.

| Category | Definition | Example | Evaluation Rigour |
|---|---|---|---|
| **Strategic Platform** | Foundational enterprise capability; affects every team; multi-year commitment | Cloud platform, identity provider, AI platform | Maximum — ARB full review |
| **Core Enterprise Service** | Shared service consumed by most teams; standardised | ITSM, CMDB, log aggregation, secrets management | High — ARB review + security |
| **Shared Engineering Platform** | Developer platform used across engineering | CI/CD, artifact registry, IaC tooling, API gateway | High — Architecture forum |
| **Departmental Tool** | Used by one department or team; limited blast radius | Team-specific analytics, departmental workflow tool | Medium — Team architect review |
| **Productivity Tool** | Individual productivity; minimal integration | IDE extensions, documentation tools | Low — Self-service with guardrails |
| **Experimental Technology** | Unproven; active research phase; not production | New AI model family, novel database paradigm | Sandboxed PoC only |
| **Emerging Technology** | Proven in industry but not yet in enterprise | Post-quantum cryptography, confidential computing | Technology radar assessment |
| **Commodity Technology** | Undifferentiated; widely adopted; low risk | S3-compatible storage, Markdown, HTTP | Approve by policy; no review |
| **Differentiating Capability** | Provides competitive advantage; proprietary logic | Proprietary AI model fine-tunes, custom DSP | Build, protect; evaluate build-vs-buy carefully |

### 2.2 Evaluation Rigour by Category

```
EVALUATION EFFORT
│
│  Strategic Platform ────────────────────────── Maximum
│  Core Enterprise Service ─────────────────── High
│  Shared Engineering Platform ────────────── High
│  Departmental Tool ───────────────────────── Medium
│  Productivity Tool ───────────────────────── Low
│  Experimental / Emerging ─────────────────── PoC-gated
│  Commodity ────────────────────────────────── Policy-approved
│
└────────────────────────────────────────────── STANDARDISATION PRESSURE
     Low                                            High
     (many tools OK)                        (one standard required)
```

---

## 3. Enterprise Decision Criteria

### 3.1 The Evaluation Dimensions

Every technology decision should be assessed across five dimensions. Weight each dimension based on organisation context (see [Section 4](#4-weighted-decision-matrix-methods)).

#### Business Dimension

| Criterion | Description | How to Measure |
|---|---|---|
| **Strategic alignment** | Does this advance our 3-year strategy? | Map to strategic objectives (1–5 scale) |
| **Business value** | What problem does it solve? What is the value of that solution? | Quantified benefit: revenue, cost, risk, speed |
| **Time to value** | How quickly will we realise benefit after investment? | Weeks from start to first production value |
| **User adoption likelihood** | Will our users actually use this? | Similar tool adoption history; user research |
| **Customer impact** | Does it improve outcomes for end customers? | NPS, support ticket reduction, feature parity |
| **Competitive advantage** | Does it differentiate us from competitors? | Market analysis; competitor adoption state |

#### Technical Dimension

| Criterion | Description | How to Measure |
|---|---|---|
| **Architecture fit** | Does it fit our reference architecture? | Architecture fitness assessment (Section 6) |
| **Scalability** | Does it handle 10×–100× current load? | Load test results; vendor published limits |
| **Reliability** | What is the vendor SLA? What is our actual measured uptime? | SLA + historical uptime data |
| **Extensibility** | Can we customise or extend without forking? | Plugin/API/SDK maturity |
| **API maturity** | Is the API stable, versioned, and well-documented? | API changelog history; version policy |
| **Integration capability** | How difficult is it to integrate with existing systems? | Number of native integrations; webhook/event support |
| **Performance** | Does it meet our latency and throughput requirements? | Benchmark on representative workloads |
| **Interoperability** | Does it use open standards? | Standards compliance (OpenAPI, OAuth2, OTEL, etc.) |
| **Standards compliance** | Certifications and compliance (ISO, SOC 2, FIPS) | Current certification list from vendor |

#### Operational Dimension

| Criterion | Description | How to Measure |
|---|---|---|
| **Operational complexity** | How hard is it to operate day-to-day? | Hours/week of platform team effort |
| **Automation support** | Can infrastructure and config be automated? | IaC support; GitOps compatibility |
| **Upgrade model** | How painful are version upgrades? | Upgrade frequency; breaking change history |
| **Supportability** | Do we have internal expertise to support it? | Skill survey; external support availability |
| **Monitoring** | Does it emit standard telemetry (metrics, logs, traces)? | OTEL compatibility; built-in dashboards |
| **Documentation quality** | Is the documentation sufficient for our team? | Read and rate: completeness, accuracy, examples |
| **Skill availability** | How easy is it to hire or train for this technology? | LinkedIn job market; certification availability |

#### Financial Dimension

| Criterion | Description | How to Measure |
|---|---|---|
| **Total cost of ownership** | Full 3–5 year cost (see Section 13) | TCO model output |
| **Licensing model** | Predictable vs unpredictable? Per-seat, per-use, enterprise? | Model the cost at 2× and 5× scale |
| **Infrastructure costs** | Compute, storage, networking requirements | Cloud cost estimate at target scale |
| **Implementation costs** | Professional services, internal engineering time | Scope + rate × duration |
| **Training investment** | Cost to skill up the team | Courses, certifications, time-to-competency |
| **Exit costs** | Cost to migrate away if the decision is wrong | Data migration, re-implementation, retraining |

#### Security and Compliance Dimension

| Criterion | Description | How to Measure |
|---|---|---|
| **Security posture** | Is the vendor's security posture strong? | Security assessment, pen test results, CVE history |
| **Identity integration** | Integrates with enterprise IdP (Entra ID, Okta, etc.)? | SAML, OIDC, SCIM support |
| **Compliance certifications** | SOC 2 Type II, ISO 27001, HIPAA, PCI-DSS, FedRAMP? | Vendor compliance documentation |
| **Auditability** | Does it produce audit-quality logs? | Log completeness; SIEM integration |
| **Data residency** | Where does data reside? Can it be restricted to a region? | Regional deployment options |
| **Encryption** | Data encrypted at rest and in transit? Encryption key management? | Encryption documentation; BYOK support |
| **Secrets management** | How are API keys and secrets managed? | Vault integration; no plaintext secrets |

#### Organisational Dimension

| Criterion | Description | How to Measure |
|---|---|---|
| **Existing skills** | Do we have people who know this today? | Skill inventory |
| **Learning curve** | How long to productive competency? | Median time to first production contribution |
| **Internal champions** | Are there internal advocates for this technology? | Team survey |
| **Community adoption** | Is this widely adopted in our industry? | CNCF adopters, Thoughtworks Radar, Stack Overflow survey |
| **Change management impact** | How disruptive is the adoption? | Teams affected; workflow change depth |

---

## 4. Weighted Decision Matrix Methods

### 4.1 Choosing the Right Method

| Method | Best For | Complexity | Output |
|---|---|---|---|
| **Weighted scoring matrix** | Most enterprise decisions; structured comparison of 2–5 options | Low-Medium | Numeric score per option |
| **MoSCoW prioritisation** | Feature or requirement prioritisation before evaluation | Low | Must/Should/Could/Won't classification |
| **Pairwise comparison (AHP)** | Many options with unclear relative weight; when team disagrees on priorities | High | Prioritised weight set |
| **Kepner-Tregoe** | High-stakes decisions with serious downside risk; decisions with many must-have criteria | Medium-High | Go/No-go per option, then weighted scoring |
| **Decision tree** | Sequential decisions with dependencies; binary/branching decisions | Medium | Conditional recommendation tree |
| **Utility scoring** | Decisions involving uncertainty and probability | High | Expected utility per option |

### 4.2 Weighted Scoring Matrix — The Default Method

Use for most technology decisions involving 2–5 competing options.

**Step 1: Define criteria and weights**

Weights should reflect what matters most for THIS decision in THIS organisation at THIS time. Weights should sum to 100.

| Criterion Group | Weight (example) | Notes |
|---|---|---|
| Business value | 25 | Higher for strategic platforms |
| Technical fit | 25 | Higher for infrastructure decisions |
| Security & compliance | 20 | Higher for regulated industries |
| Total cost of ownership | 15 | Higher for budget-constrained orgs |
| Operational complexity | 10 | Higher if ops team is small |
| Vendor risk | 5 | Higher for single-source dependencies |

**Step 2: Score each option on each criterion (1–5 scale)**

| Criterion | Weight | Option A | Option B | Option C |
|---|---|---|---|---|
| Strategic alignment | 10 | 4 (40) | 3 (30) | 5 (50) |
| Business value | 15 | 5 (75) | 4 (60) | 3 (45) |
| Architecture fit | 15 | 4 (60) | 5 (75) | 3 (45) |
| Security posture | 10 | 5 (50) | 4 (40) | 3 (30) |
| TCO (5yr) | 15 | 3 (45) | 4 (60) | 5 (75) |
| Operational complexity | 10 | 4 (40) | 3 (30) | 4 (40) |
| Skill availability | 10 | 5 (50) | 3 (30) | 2 (20) |
| Vendor stability | 15 | 4 (60) | 5 (75) | 2 (30) |
| **TOTAL** | **100** | **420** | **400** | **335** |

**Step 3: Sensitivity analysis**

Vary weights by ±10% for the top three criteria. If the ranking changes, the decision is sensitive to those weights — have an explicit conversation about them with stakeholders.

**Step 4: Must-have gate**

Before the matrix, define hard requirements (must-haves). Any option failing a must-have is eliminated regardless of score.

Common must-haves: SOC 2 Type II, data residency in EU, no per-seat > $X, native SSO.

### 4.3 Pairwise Comparison (for Setting Weights)

When stakeholders disagree on weights, use pairwise comparison to derive consensus weights through the Analytic Hierarchy Process:

```
Compare each criterion pair:
- Business value vs Technical fit: Business value moderately more important → 3
- Business value vs Security: About equal → 1
- Technical fit vs Security: Technical fit slightly more → 2
... (compare all pairs)

Normalise the pairwise matrix to derive consistent weights.
```

Tools: AHP-OS (open-source), Super Decisions, Excel AHP template.

### 4.4 Kepner-Tregoe (for High-Stakes Decisions)

Used when the cost of a wrong decision is very high. Process:

1. **Define objectives:** MUSTS (non-negotiable) and WANTS (scored)
2. **Screen options against MUSTS:** Eliminate any option that fails any MUST
3. **Score remaining options against WANTS**
4. **Assess adverse consequences:** For each viable option, what could go wrong?
5. **Make balanced choice:** Best WANTS score with lowest adverse consequence risk

---

## 5. Buy vs Build vs Extend vs Partner

### 5.1 Decision Tree

```
NEW CAPABILITY NEEDED
         │
         ▼
    Does a commodity or
    open-source solution
    exist that covers ≥80%?
         │
    ┌────┴────┐
   YES       NO
    │         │
    ▼         ▼
  ADOPT     Is this a
  (OSS /    differentiating
  commodity) capability that
             creates IP?
                │
           ┌────┴────┐
          YES        NO
           │          │
           ▼          ▼
         BUILD     Does a commercial
         (internal  SaaS/product
          R&D)      solve it?
                      │
                 ┌────┴────┐
                YES        NO
                 │          │
                 ▼          ▼
               BUY        Is the gap
               (SaaS/    fillable by
               product)  extending an
                         existing system?
                               │
                          ┌────┴────┐
                         YES        NO
                          │          │
                          ▼          ▼
                        EXTEND    PARTNER
                        (plugin,   (SI, ISV,
                         API ext,   strategic
                         config)    partner)
```

### 5.2 Options Compared

| Dimension | Buy (SaaS/Product) | Build | Extend | Open Source | Partner |
|---|---|---|---|---|---|
| **Time to value** | Fast | Slow | Medium | Medium | Medium |
| **Initial cost** | Medium | High (engineering) | Low-Medium | Low | Variable |
| **Long-term cost** | Predictable (licence) | Low (maintenance) | Low | Low | High (ongoing) |
| **Flexibility** | Low (vendor roadmap) | Maximum | Medium | High | Vendor-dependent |
| **IP ownership** | None | Full | Partial | None (contribution) | Shared |
| **Vendor risk** | High | None | Medium | Community risk | Partner risk |
| **Maintenance burden** | Low | High | Medium | Medium | Low |
| **Customisation ceiling** | Hard limit | None | Moderate | Full (fork) | Moderate |
| **Skill requirement** | User skills | Engineering depth | Integration skills | OSS skills | Partner management |

### 5.3 When to Build

Build only when:
- The capability is a core differentiator and constitutes IP
- No commercial or open-source alternative achieves ≥70% fit
- You have the engineering capacity AND intend to maintain it long-term
- The build cost over 3 years is less than the buy + integration cost

**Anti-pattern:** Building because the team thinks it will be fun or believes they can do better than the market. That is almost never true for commodity capabilities.

### 5.4 When Open Source Is the Right Answer

Open source is frequently the best answer for infrastructure and platform components:

| Use case | Why OSS wins |
|---|---|
| Container orchestration | Kubernetes is the standard; no commercial alternative matches ecosystem |
| Observability pipeline | OpenTelemetry; vendor-neutral; avoids telemetry lock-in |
| Self-hosted AI models | Data control; no per-token cost; compliance for sensitive data |
| Developer tooling | Community-maintained; broad plugin ecosystem |
| Integration middleware | Apache Kafka, Flink; more extensible than commercial alternatives |

**OSS risk factors to evaluate:** Project health (commit velocity, number of maintainers), foundation backing (CNCF, Apache, Linux Foundation), commercial support availability, security CVE response time.

---

## 6. Architecture Fitness Assessment

### 6.1 Beyond Feature Comparison

Feature checklists compare what a technology can do. Architecture fitness assesses whether it fits how your enterprise operates. A technology that scores 9/10 on features but 3/10 on fitness will cost 10× more to integrate and operate.

### 6.2 Fitness Dimensions

| Dimension | Assessment Question | Evidence Needed |
|---|---|---|
| **EA alignment** | Does it fit our target architecture (cloud-native, event-driven, API-first)? | Architecture diagram of integration |
| **Cloud strategy fit** | Compatible with our cloud platform strategy (AWS / Azure / GCP)? | Deployment options; managed service availability |
| **Data architecture fit** | How does it handle data flows, schemas, lineage? | Data flow diagram; schema compatibility |
| **Security architecture fit** | Integrates with our security controls (IdP, SIEM, secrets vault, WAF)? | Security integration diagram |
| **Platform engineering fit** | Deployable via our IaC and CI/CD pipelines? | Terraform provider; Helm chart; GitOps support |
| **Integration architecture** | Uses our integration patterns (event bus, API, CDC)? | Integration connector inventory |
| **Event-driven compatibility** | Can it publish and consume events? | Kafka / Event Bridge / SNS connector |
| **API-first readiness** | Does it expose everything via API? Or is the GUI the only interface? | API coverage matrix |
| **Automation readiness** | Can it be fully automated? Or does it require manual steps? | CLI/API completeness |
| **AI readiness** | Can AI agents interact with it via APIs or MCP? | API coverage; MCP connector availability |
| **Observability standard** | Does it emit OpenTelemetry-compatible telemetry? | OTel native; OTEL contrib; custom |

### 6.3 Fitness Scoring

For each dimension: 1 = blocking (cannot integrate without major rework) / 3 = partial fit (workarounds needed) / 5 = native fit (works with existing patterns).

Sum scores. Products below 60% of maximum require architectural exception approval.

### 6.4 Integration Complexity Estimate

Before committing, estimate the integration work:

```
INTEGRATION COMPLEXITY MODEL

Simple (1–3 weeks):
  - REST API available; authentication via API key or OAuth2
  - Standard data format (JSON/YAML)
  - No custom network configuration needed

Medium (1–2 months):
  - Custom authentication (SAML, complex OAuth2 flows)
  - Requires middleware (API gateway config, event bus wiring)
  - Schema mapping required
  - 1–3 custom integrations to existing systems

Complex (3–6 months):
  - On-premise deployment; network peering required
  - Custom network topology (VPN, private link)
  - Migration of existing data
  - Multiple system integrations with complex event flows
  - Custom security controls needed

Strategic (6–18 months):
  - Platform-level adoption affecting multiple teams
  - Data migration at scale
  - Organisational change management required
  - Multiple dependent system changes
```

---

## 7. Technology Lifecycle Management

### 7.1 Lifecycle Stages

```
EVALUATE → PILOT → LIMITED ADOPTION → ENTERPRISE STANDARD → MAINTENANCE → SUNSET → RETIRED
```

| Stage | Description | Who Can Use | Entry Criteria | Exit Criteria |
|---|---|---|---|---|
| **Evaluate** | Research, PoC, market assessment | Platform team, selected engineers | Technology identified as candidate | PoC complete; decision to advance or reject |
| **Pilot** | Production pilot with limited scope | 1–2 volunteer teams | PoC success; ARB approval to pilot | Pilot success criteria met; wider adoption recommended |
| **Limited Adoption** | Available to all teams; not yet mandatory | Any team (opt-in) | Pilot success; ARB approval; runbook published | Sufficient adoption; operational maturity demonstrated |
| **Enterprise Standard** | Preferred solution for this category; new projects use this | All teams | ARB standard designation; training available | Better alternative emerges; technology shows critical weakness |
| **Maintenance** | Existing use maintained; no new adoption recommended | Existing users only | Standard replaced by better solution | All dependent systems migrated |
| **Sunset** | Scheduled retirement; no new integrations | Existing users only | Retirement date set; migration path available | 90-day notice sent to all consumers |
| **Retired** | Fully decommissioned | No one | All migrations complete | Removed from registry; historical record retained |

### 7.2 Technology Radar (Adopt / Trial / Assess / Hold)

Inspired by the Thoughtworks Technology Radar format:

| Zone | Meaning | Action |
|---|---|---|
| **Adopt** | We use this in production; proven value; recommended as default | Use it for new projects; invest in skills |
| **Trial** | Worth pursuing; explore with intent to adopt; controlled risk | Use on a project; gather data; re-assess in 6 months |
| **Assess** | Worth knowing about; not yet ready to trial | Sandbox exploration; monitor; reassess in 12 months |
| **Hold** | Proceed with caution; do not start new use; existing use only | No new projects; plan migration for existing use |

Conduct radar updates quarterly. Publish to all engineering teams.

### 7.3 Deprecation Checklist

When retiring a technology:

- [ ] Identify all teams using the technology (from service registry / CMDB)
- [ ] Communicate 6-month advance notice via architecture forum and team leads
- [ ] Publish migration guide to successor technology
- [ ] Offer migration support (platform team office hours, migration scripts)
- [ ] Set hard retirement date (minimum 90 days after notification)
- [ ] Update registry status to Sunset then Retired
- [ ] Automate blocking of new deployments after sunset date
- [ ] Retain audit records per retention policy

---

## 8. Proof of Concept Framework

### 8.1 The PoC Problem

PoCs that succeed on technical dimensions are often promoted to production without proper validation. This creates two failure modes:
1. **Technical PoC ≠ production system:** PoC code becomes production code with all its shortcuts
2. **PoC ≠ enterprise context:** PoC runs in ideal conditions; production has different data, scale, and operational constraints

The PoC framework prevents both by requiring explicit validation gates before promotion.

### 8.2 PoC Scope Definition

Before starting a PoC, document:

```yaml
# PoC Charter Template
poc_name: "LLM Platform Evaluation — Q3 2026"
problem_statement: |
  We need an AI inference platform for 3 production use cases.
  Current state: multiple teams using different providers, no central governance.
  
evaluation_options:
  - name: "Option A"
    description: "Commercial managed service"
  - name: "Option B"  
    description: "Self-hosted open-source"

success_criteria:
  technical:
    - "Latency P95 < 2s for standard requests under 500 concurrent users"
    - "99.9% uptime demonstrated over 2-week sustained load"
    - "Integration with Entra ID SSO verified"
    - "All audit logs available in SIEM within 30 minutes"
  business:
    - "3 use cases implemented end-to-end"
    - "Developer experience rated ≥4/5 by pilot team"
  security:
    - "Penetration test completed; no critical findings"
    - "Data residency confirmed in EU region"
  operational:
    - "Deploy via existing Terraform modules"
    - "Alerts integrated into PagerDuty"
    - "Runbook documented and reviewed"
  cost:
    - "5-year TCO modelled; within budget envelope"

exit_criteria:
  promote: "All success criteria met"
  iterate: "≥80% met; gaps have clear remediation plan"
  reject: "<80% met; or any critical finding"
  
constraints:
  duration: "6 weeks"
  team: "2 platform engineers + 1 security engineer"
  budget: "$20,000 (infrastructure + licences)"
  data: "Synthetic data only; no production data in PoC"
```

### 8.3 PoC Validation Dimensions

| Dimension | What to Validate | Who Validates |
|---|---|---|
| **Technical** | Core functionality, integration with enterprise systems, performance at target scale | Platform team |
| **Security** | Authentication, authorisation, data handling, vulnerability assessment | Security architect |
| **Operational** | Deployment automation, monitoring, alerting, runbook | SRE / Platform ops |
| **Business** | Solves the stated problem; users can complete target workflows | Product owner + pilot users |
| **Cost** | Infrastructure cost at scale; licence cost at scale; TCO validated | Finance + platform team |
| **Compliance** | Data residency, audit logging, compliance certifications verified | Compliance / legal |

### 8.4 Preventing PoC Creep

PoC creep is when a PoC accumulates users, production data, and dependencies before formal approval.

Controls:
- PoC environments are isolated from production networks by default
- PoC data policies: synthetic or anonymised data only
- PoC has a hard expiry date (maximum 8 weeks); extensions require ARB approval
- Any PoC system receiving production data triggers automatic security review
- Go/No-Go gate is mandatory before any production traffic

---

## 9. Enterprise Standards and Exceptions

### 9.1 Standards Hierarchy

```
MUST USE (Mandatory Standard)
│ Enterprise-wide; no exceptions without ARB waiver
│ Example: Entra ID for identity; approved cloud regions only
│
SHOULD USE (Preferred Standard)
│ Default choice for new projects; deviation requires justification
│ Example: PostgreSQL for relational databases; Kafka for event streaming
│
MAY USE (Approved Alternatives)
│ Permitted but not preferred; team has justified the deviation
│ Example: MySQL for small-scale teams migrating from existing MySQL
│
DO NOT USE (Restricted)
│ Blocked by policy; security, legal, or compliance reason
│ Example: End-of-life versions; products failing security audit
│
EVALUATE ONLY (Experimental)
│ Not production-approved; sandbox/PoC only
│ Example: New AI models not yet through security review
```

### 9.2 Exception Process

When a team needs to deviate from a mandatory or preferred standard:

1. **Submit exception request** (see ADR template, Section 16)
2. **State the business justification** — why the standard doesn't fit
3. **State the risk acknowledgment** — what risks does this deviation create?
4. **State the exit plan** — how will you re-align with the standard within 18 months?
5. **ARB reviews** within 2 business days for blocking issues; 2 weeks for planned deviations
6. **Exception is time-limited** (12–18 months maximum); reassessed at renewal

### 9.3 Standards Registry

Maintain a living standards registry accessible to all engineers:

| Category | Standard | Status | Since | Next Review |
|---|---|---|---|---|
| Identity | Microsoft Entra ID | Mandatory | 2024-01 | 2027-01 |
| Secrets management | HashiCorp Vault | Mandatory | 2023-06 | 2026-06 |
| Observability | OpenTelemetry + Datadog | Preferred | 2025-03 | 2026-12 |
| Container orchestration | Kubernetes (EKS/AKS/GKE) | Mandatory | 2022-09 | 2027-09 |
| AI model access | Internal AI Gateway (LiteLLM) | Mandatory | 2026-01 | 2027-01 |
| Event streaming | Apache Kafka (MSK/Confluent) | Preferred | 2024-04 | 2026-12 |
| Relational database | PostgreSQL (RDS / Azure Flexible) | Preferred | 2023-01 | 2026-12 |
| Programming language | Python / TypeScript / Go | Preferred | 2024-01 | 2027-01 |

---

## 10. Technology Rationalization

### 10.1 The Platform Sprawl Problem

Without active rationalization, enterprises accumulate:
- Multiple tools solving identical problems (tool sprawl)
- Overlapping platforms from department-level acquisition
- Zombie licenses for unused SaaS tools
- Duplicate data stores with conflicting records

The FinOps Foundation estimates 30–40% of enterprise SaaS spend is on underutilised or redundant tools.

### 10.2 Rationalization Process

**Step 1: Inventory**

Create a complete technology inventory:
- Query CMDB, IT asset management, finance (license payments)
- Query cloud accounts (all running resources)
- Survey teams for shadow IT (tools used but not centrally tracked)

**Step 2: Capability Mapping**

Map each tool to the capability it provides:

```
CAPABILITY: "Workflow automation"
├── Tool A (Marketing) — $24K/year
├── Tool B (Sales) — $36K/year  
├── Tool C (Ops) — $18K/year — same vendor as Tool B, different contract
└── Tool D (Platform) — $0 (open-source, self-hosted)

→ 4 tools solving the same capability → rationalize to 1 or 2
```

**Step 3: Functional Overlap Analysis**

| Tool | Primary Capability | Secondary Capabilities | Unique Features | Users | Cost/year |
|---|---|---|---|---|---|
| Tool A | Workflow automation | Notifications, integrations | Custom AI step | 50 | $24K |
| Tool B | Workflow automation | Approval workflows | None | 120 | $36K |
| Tool C | Workflow automation | Scheduling | SFTP connector | 30 | $18K |

Winner: Tool B covers most users; negotiate enterprise licence; migrate Tool A and C users.

**Step 4: Consolidation Plan**

| Quarter | Action |
|---|---|
| Q1 | Notify Tool A and C users; document migration path |
| Q2 | Migrate Tool A users to Tool B |
| Q3 | Migrate Tool C users to Tool B |
| Q4 | Cancel Tool A and C licences |

### 10.3 Rationalisation Triggers

- Annual licence renewal approaching (review before auto-renewing)
- New enterprise capability added (does this replace an existing tool?)
- Team merger or reorganisation
- Annual technology audit
- Budget pressure (rationalize to cut spend)

### 10.4 Technical Debt Assessment

Not all technical debt is worth paying. Use this model:

```
DEBT QUADRANT

                HIGH BUSINESS IMPACT
                         │
     Tackle now ─────────┼───────── Schedule to tackle
     (blocking           │          (important, plan it)
      growth or          │
      causing            │
      incidents)         │
─────────────────────────┼────────────────────────────
                         │
     Leave it ───────────┼───────── Document and monitor
     (low value,         │          (risk is real but
      high cost          │           not urgent today)
      to fix)            │
                         │
                LOW BUSINESS IMPACT

        HIGH RISK                          LOW RISK
```

---

## 11. Risk Assessment Framework

### 11.1 Technology Risk Dimensions

| Risk Category | Specific Risks | Assessment Questions |
|---|---|---|
| **Vendor / product maturity** | Immature product; unstable APIs; frequent breaking changes | How many production deployments at comparable scale? |
| **Vendor financial stability** | Vendor acquired, pivoted, or shut down | Revenue trajectory; VC funding status; profitable? |
| **Product roadmap** | Roadmap doesn't align with our needs; key features won't be built | Is our use case on the roadmap? What's the release cadence? |
| **Community health** (OSS) | Abandoned project; security issues not patched | GitHub commit frequency; issue response time; number of maintainers |
| **OSS sustainability** | Key maintainer leaves; foundation withdraws support | Is it under a reputable foundation (CNCF, Apache)? Commercial backer? |
| **Lock-in risk** | Proprietary formats; data export limitations; switching cost | Can we export all data in standard formats? What is the migration cost? |
| **Operational risk** | Complex operations; frequent incidents; high MTTR | Reference customer operational complexity; incident history |
| **Skills risk** | Niche skill set; hard to hire; high consultant dependency | Market for talent; availability of training; certification path |
| **Regulatory / compliance risk** | Non-compliant with regulations; unclear compliance stance | Required certifications present? Data residency options? |
| **Security risk** | Poor security track record; unpatched CVEs; supply chain | CVE response time; security bug bounty program; SBOM available? |

### 11.2 Risk Scoring Model

Score each risk category: 1 = Low / 2 = Medium / 3 = High

| Risk | Likelihood (1–3) | Impact (1–3) | Risk Score (L × I) | Mitigation |
|---|---|---|---|---|
| Vendor financial stability | 1 | 3 | 3 | |
| Lock-in risk | 2 | 3 | 6 | Abstraction layer; data export testing |
| Skills availability | 3 | 2 | 6 | Training plan; external support contract |
| Security posture | 1 | 3 | 3 | Annual security review |
| Roadmap alignment | 2 | 2 | 4 | Vendor roadmap in contract |
| **Total** | | | **22 / 45** | |

Risk thresholds: 0–15 = Low / 16–30 = Medium / 31–45 = High. High-risk technologies require ARB risk acceptance before adoption.

### 11.3 Open Source Sustainability Checklist

Before adopting an open-source project:

- [ ] GitHub stars > 1,000 (or domain equivalent maturity signal)
- [ ] Active commits within last 30 days
- [ ] Multiple active maintainers (not single-person project)
- [ ] Issues responded to within 2 weeks on average
- [ ] Security CVEs responded to within 30 days historically
- [ ] Backed by foundation (CNCF, Apache, Linux Foundation) or commercial company
- [ ] Commercial support available if needed
- [ ] Licence is compatible with enterprise use (Apache 2.0, MIT, BSD preferred; verify GPL implications)
- [ ] SBOM (Software Bill of Materials) available or generatable

---

## 12. Vendor Evaluation Framework

### 12.1 Evaluating the Vendor, Not Just the Product

A great product from a troubled vendor is a high-risk investment. Evaluate the vendor as a long-term business partner.

### 12.2 Vendor Assessment Dimensions

**Financial health:**
- Revenue trajectory: growing or declining?
- Profitability: can they fund their roadmap without additional fundraising?
- Funding status: VC-backed vs. bootstrapped vs. public? (Each has different risk profiles)
- Customer concentration: if their top 3 customers leave, do they survive?

Indicators: Annual reports, Crunchbase funding data, Glassdoor trends (warning sign if dropping), customer reference calls.

**Product roadmap:**
- Does their roadmap align with our 3-year needs?
- What has their roadmap delivery track record been?
- Do they prioritise enterprise needs or consumer/SMB features?

Verify: Ask for the last 3 roadmap presentations and compare to what shipped.

**Enterprise support:**
- SLA for P1 issues (4-hour response or next-day?)
- Dedicated customer success manager at our account tier?
- Escalation path for critical issues?
- Support hours (24/7 or business hours only)?

Test before committing: Submit a non-trivial support ticket during evaluation. Evaluate response quality and time.

**Customer references:**
- Can they provide 3 reference customers at similar size and industry?
- Can you talk directly to the reference customers' architects (not just their marketing contacts)?
- What are the reference customers' biggest operational pain points?

**Ecosystem and partner network:**
- Is there a healthy partner / ISV ecosystem?
- Are there multiple system integrators who can help us implement?
- Does the vendor depend on us to build all integrations ourselves?

**Innovation velocity:**
- Feature release cadence: monthly, quarterly?
- Do they have R&D investment proportional to their revenue?
- Are they leading or following in their category?

**Acquisition risk:**
- Is the vendor likely acquisition target?
- If acquired, what happens to our contract and roadmap?
- Are there contract clauses protecting against material feature removal post-acquisition?

**Contract flexibility:**
- Month-to-month vs. multi-year only?
- Can you reduce seats if your usage drops?
- Is there a data export guarantee in the contract?
- Exit assistance clause?

### 12.3 Vendor Scorecard

| Dimension | Weight | Score (1–5) | Weighted |
|---|---|---|---|
| Financial health | 20 | | |
| Product fit | 25 | | |
| Enterprise support quality | 15 | | |
| Roadmap alignment | 15 | | |
| Ecosystem maturity | 10 | | |
| Contract terms | 10 | | |
| Reference customer quality | 5 | | |
| **Total** | **100** | | |

Interpret: 400+ = Strong vendor; 300–399 = Acceptable; <300 = Proceed with caution.

---

## 13. Total Cost of Ownership

### 13.1 Why Acquisition Cost Is Misleading

Organisations routinely undercount the cost of technology by 3–5× because they count only the licence or subscription fee.

The TCO iceberg:

```
VISIBLE (what procurement sees):
  Licence / subscription fee
  ─────────────────────────────── WATERLINE ──────

HIDDEN (what architects must surface):
  Integration development (one-time)
  Migration from existing system
  Training and onboarding
  Internal engineering to operate
  Infrastructure (compute, storage, network)
  Professional services / consulting
  Compliance audit cost
  Customisation maintenance
  Upgrade engineering
  Exit / migration cost (amortised)
  Productivity loss during transition
  Security review and tooling
```

### 13.2 TCO Model Structure

| Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | Total |
|---|---|---|---|---|---|---|
| **Acquisition / Licence** | | | | | | |
| Subscription fee (base) | | | | | | |
| Enterprise add-ons / modules | | | | | | |
| **Infrastructure** | | | | | | |
| Compute (cloud / on-prem) | | | | | | |
| Storage | | | | | | |
| Network egress | | | | | | |
| **Implementation (one-time)** | | | | | | |
| Internal engineering | | | | | | |
| Professional services | | | | | | |
| Data migration | | | | | | |
| **Operations (recurring)** | | | | | | |
| Platform team (FTE fraction) | | | | | | |
| Monitoring / tooling | | | | | | |
| Support contract | | | | | | |
| **Training** | | | | | | |
| Initial training | | | | | | |
| Ongoing / new hire | | | | | | |
| **Compliance** | | | | | | |
| Security reviews | | | | | | |
| Audit support | | | | | | |
| **Upgrade / Maintenance** | | | | | | |
| Major version upgrades (est.) | | | | | | |
| Customisation maintenance | | | | | | |
| **Exit Provision (amortised)** | | | | | | |
| Migration cost if wrong (1/5) | | | | | | |
| **TOTAL** | | | | | | |

### 13.3 Hidden Costs Frequently Missed

| Hidden Cost | Typical Miss Reason | How to Capture |
|---|---|---|
| Integration maintenance | "We'll do it once and it'll work" | Estimate 15–20% of initial integration cost annually |
| Upgrade engineering | "Upgrades are free" | Budget 2–4 engineer-weeks per major version |
| Training new hires | "The team already knows it" | $3–10K per new engineer for certification + ramp time |
| Productivity loss during transition | "We'll migrate on a weekend" | 10–30% productivity reduction for 2–6 weeks |
| Compliance cost increase | "We're already compliant" | New tool = new evidence to collect in audits |
| Shadow licensing | "We only need 10 seats" | Usage always grows; model at 2× current estimate |

---

## 14. Organisational Readiness

### 14.1 Technology Without Readiness Fails

Even the right technology selection fails without organisational readiness. Assess readiness before committing.

| Dimension | Questions to Assess | Readiness Indicators |
|---|---|---|
| **Skills** | Do we have people who can operate this today? | ≥2 engineers with demonstrated expertise |
| **Team structure** | Is there a team accountable for this platform? | Named owner; clear on-call responsibility |
| **Operating model** | How will we support this in production? | Runbook exists; escalation path defined |
| **Governance maturity** | Do we have processes to govern this at scale? | Policy exists; enforcement mechanism |
| **Change readiness** | Are teams willing to change their current workflow? | Change champions identified; pilot team enthusiastic |
| **Executive sponsorship** | Is there a senior sponsor with budget authority? | Named executive sponsor committed |
| **Adoption capacity** | How many technology changes are teams absorbing right now? | Technology change backlog assessment |

### 14.2 Readiness Scoring

Score each dimension: 1 = Not ready / 3 = Partial readiness / 5 = Fully ready.

Total < 20: High risk of adoption failure; address gaps before proceeding.
Total 20–28: Moderate readiness; proceed with change management plan.
Total > 28: Ready; proceed with standard governance.

### 14.3 Skill Gap Closure Strategies

| Gap Level | Closure Strategy | Timeline |
|---|---|---|
| **Zero internal expertise** | Hire specialist; engage SI partner; vendor training programme | 3–6 months to functional competency |
| **Basic familiarity, no depth** | Structured training; hands-on PoC; pair with vendor PS | 1–3 months |
| **One expert, no redundancy** | Train second engineer; document institutional knowledge | 1 month |
| **Team skilled, management gap** | Architecture training; ARB education; exec briefing | 2–4 weeks |

---

## 15. ARB Decision Process

See [Architectural Review Board](../architectural-review-board/index.md) for the full ARB operating model.

### 15.1 Submission Requirements

All technology decisions above the departmental tool level require an ARB submission:

**Minimum required artefacts:**
- Problem statement (what capability gap does this address?)
- Options considered (minimum 3, or justify why fewer)
- Weighted decision matrix completed
- Architecture fitness assessment
- Security review (or security review waiver for low-risk tools)
- TCO model (5-year)
- Risk assessment
- Recommended decision with rationale

**Optional but recommended:**
- PoC results
- Reference architecture diagram
- Migration plan from current state

### 15.2 Decision Gates

| Gate | Trigger | Decision | Timeline |
|---|---|---|---|
| **Pre-PoC gate** | Request to PoC a candidate technology | Approve / reject PoC scope and budget | 1 week |
| **Post-PoC gate** | PoC complete; team wants to proceed | Approve for pilot / reject / more data needed | 2 weeks |
| **Standard designation gate** | Team wants enterprise-wide standard | Approve as Preferred / Mandatory / reject | 4 weeks |
| **Exception gate** | Deviation from existing standard | Approve time-limited exception / reject | 2 business days (blocking) / 2 weeks (planned) |
| **Sunset gate** | Technology being retired | Approve retirement date and migration plan | 2 weeks |

### 15.3 Stakeholder Roles in the Decision

| Role | Responsibility | Decision Authority |
|---|---|---|
| **Submitting team** | Prepare submission; present to ARB | Propose; implement |
| **Enterprise architect** | Assess strategic fit; provide guidance before submission | Review; advise |
| **Security architect** | Security risk assessment | Approve / reject on security grounds |
| **Platform team** | Assess operational fit; deployment feasibility | Advise on operations |
| **Finance** | Validate TCO model; budget availability | Approve financial commitment |
| **Legal / compliance** | Review contracts, licences, data handling | Approve / reject on legal grounds |
| **ARB chair** | Facilitate decision; resolve tie-breakers | Final decision authority |

---

## 16. Decision Documentation — Architecture Decision Records

### 16.1 Why ADRs Matter

Architecture Decision Records capture: what was decided, why, what options were rejected, and what consequences to expect. Without ADRs:
- Future teams re-litigate decisions that were already made
- Context for a decision is lost when team members leave
- Post-mortems can't distinguish wrong decisions from right decisions badly implemented

### 16.2 ADR Template — Standard Decision

```markdown
# ADR-NNNN: [Short title of the decision]

**Date:** YYYY-MM-DD  
**Status:** [Draft | Proposed | Accepted | Superseded | Deprecated]  
**Supersedes:** [ADR-XXXX if this replaces a prior decision]  
**Superseded by:** [ADR-YYYY if this has been superseded]

---

## Context

[2–3 paragraphs describing the situation that created the need for a decision.
What problem are we solving? What constraints exist? What triggered this decision now?]

## Decision Drivers

- [Key factor 1 that influenced this decision]
- [Key factor 2]
- [Key factor 3]

## Options Considered

### Option 1: [Name]
- Description: [What is this option?]
- Pros: [...]
- Cons: [...]
- Estimated TCO (5yr): $[X]

### Option 2: [Name]
- Description:
- Pros:
- Cons:
- Estimated TCO (5yr): $[X]

### Option 3: [Name]
- Description:
- Pros:
- Cons:
- Estimated TCO (5yr): $[X]

## Evaluation

[Paste or link to the weighted decision matrix. Summarise the key scoring differences.]

| Criterion | Weight | Option 1 | Option 2 | Option 3 |
|---|---|---|---|---|
| [Criterion] | [W] | [Score] | [Score] | [Score] |
| **Total** | **100** | **[X]** | **[X]** | **[X]** |

## Decision

We select **Option [N]: [Name]**.

**Rationale:** [3–5 sentences explaining why this option wins. Reference the scoring,
but also explain any qualitative factors the matrix doesn't capture.]

## Consequences

**Positive:**
- [Expected positive outcome 1]
- [Expected positive outcome 2]

**Negative / Trade-offs accepted:**
- [Trade-off 1 we accept]
- [Risk 1 we accept]

**Risks and mitigations:**
| Risk | Mitigation |
|---|---|
| [Risk] | [Mitigation] |

## Review Date

This decision should be revisited by: [DATE — typically 12–24 months]

**Success metrics:**
- [How will we know this was the right decision?]
- [Metric 1]
- [Metric 2]

## Approvals

| Role | Name | Date |
|---|---|---|
| ARB Chair | | |
| Security Architect | | |
| Enterprise Architect | | |
```

### 16.3 Lightweight ADR — For Departmental Tools

For lower-risk, lower-scope decisions:

```markdown
# ADR-NNNN: [Tool selection for X]

**Date:** YYYY-MM-DD | **Status:** Accepted | **Owner:** [Team]

**Problem:** [1–2 sentences]

**Options considered:** [Option A], [Option B], [Option C]

**Decision:** [Option X] because [2–3 sentence rationale].

**Trade-off accepted:** [What we give up by not choosing the other options]

**Review by:** [DATE]
```

---

## 17. Measuring Success After Selection

### 17.1 Success Metrics Framework

Define success metrics at decision time — not after deployment.

| Metric Category | Example KPIs | Target | Measurement Method |
|---|---|---|---|
| **Adoption** | % of target teams actively using the technology | 80% within 6 months | Platform telemetry / user survey |
| **User satisfaction** | Developer experience score | ≥4/5 | Quarterly survey |
| **Platform stability** | Uptime / availability | ≥99.9% | Monitoring dashboard |
| **Operational efficiency** | Incidents per month; MTTR | Baseline → 20% improvement | Incident tracking |
| **Cost outcomes** | Actual TCO vs. projected | Within 20% of model | Finance report |
| **Productivity impact** | Feature delivery velocity before/after | 10–20% improvement | DORA metrics |
| **Security posture** | Security findings in quarterly scan | Zero criticals | Security scan results |
| **Business outcomes** | Business KPI the technology was meant to move | Defined per use case | Business reporting |

### 17.2 Post-Implementation Review Schedule

| Timing | Review Focus | Output |
|---|---|---|
| **30 days post-launch** | Technical issues; onboarding friction | Issue list; quick fixes |
| **90 days post-launch** | Adoption progress; cost tracking vs. model | Go/continue decision |
| **6 months post-launch** | User satisfaction; stability; cost vs. model | Decision validation |
| **12 months post-launch** | Full success metric assessment; lessons learned | ADR updated with outcomes |
| **Annually thereafter** | Technology radar reassessment; still right choice? | Adopt/Trial/Assess/Hold |

---

## 18. Common Decision Anti-Patterns

### 18.1 The Fourteen Anti-Patterns

| Anti-Pattern | Description | Detection Signal | Countermeasure |
|---|---|---|---|
| **Feature checklist bias** | Selecting the tool with the longest feature list, not the best fit | RFP built from feature marketing materials | Evaluate against your specific use cases only |
| **Vendor marketing influence** | Decision driven by sales relationship, not evaluation | Architecture team hasn't tested the product | Require PoC with own data; bar vendor from ARB |
| **Shiny object syndrome** | Adopting new technology because it's exciting, not because it solves a problem | No problem statement exists | Require problem statement before evaluation starts |
| **Executive preference** | Senior leader mandates technology without evidence | "The CTO tried it at his last company" | Require same ARB process regardless of seniority |
| **PoC ≠ production** | PoC success treated as production validation | PoC went to production without Go/No-Go gate | Mandatory Go/No-Go gate; isolated PoC environments |
| **Ignoring operational cost** | Licence is cheap; operation is expensive | Only licence cost in the business case | Require TCO model covering operations |
| **Over-customisation** | Product is bent to fit existing workflow instead of adopting product's intended use | >20% of features are custom-built on top of the product | Adopt product's workflow; if impossible, reconsider the product |
| **Tool duplication** | Same capability covered by 3 different tools | Capability map shows overlap | Annual capability rationalization |
| **Ignoring exit strategy** | No plan for what happens when this technology is wrong | No data export validation; no migration cost estimate | Require exit cost in TCO; test data export during PoC |
| **Technology-first architecture** | Architecture designed around a technology's features, not the business problem | "We're a Kafka shop" as a reason for using Kafka | Business-first problem statement required |
| **Popularity ≠ fit** | "Everyone uses it" as justification | Cited evidence is blog posts and job postings | Require fit assessment; industry adoption ≠ your use case fit |
| **Pilot success ≠ scale readiness** | Successful pilot treated as evidence of enterprise-scale readiness | Pilot had 5 users; enterprise has 5,000 | Require load testing at enterprise scale before standard designation |
| **Recency bias** | New tools preferred because they are new | Evaluation team has no institutional memory | Include lifecycle risk assessment for young products |
| **Sunk cost fallacy** | Continuing with a failing technology because of past investment | "We've already spent $500K on this" | Decision is about future cost, not past cost; be willing to cut losses |

---

## 19. Reference Models by Organisation Type

### 19.1 Startup (< 50 engineers)

**Priority order:** Speed to value → Cost → Operational simplicity → Standards.

**Approach:**
- Minimise custom infrastructure; use managed SaaS for everything possible
- Resist premature standardisation; let patterns emerge from 2–3 real use cases
- Use high-trust vendors with monthly contracts (no 3-year lock-in)
- Document decisions in lightweight ADRs; don't build a full ARB yet
- Key risk: tool sprawl as teams move fast; quarterly rationalization checkpoint

**Key criteria weighting:** Business value 35% / Cost 25% / Time to value 25% / Operational complexity 15%

### 19.2 Mid-Size Enterprise (50–500 engineers)

**Priority order:** Strategic alignment → Operational efficiency → Cost → Standardisation.

**Approach:**
- Establish an ARB (2-week review cycle, not heavyweight)
- Define Preferred standards for top 5–7 capability categories
- Start technology radar (quarterly)
- Begin TCO modelling for decisions > $100K/year
- Key risk: inconsistent standards as different teams make different choices

**Key criteria weighting:** Business value 25% / Technical fit 25% / TCO 20% / Operations 15% / Risk 15%

### 19.3 Global Enterprise (500+ engineers)

**Priority order:** Strategic alignment → Security/compliance → Standardisation → Operational at scale.

**Approach:**
- Full ARB with designated roles; 2–4 week review cycle
- Mandatory standards for strategic platforms
- Quarterly technology radar; annual rationalization
- Full TCO model for all decisions > $50K/year
- Key risk: standards enforcement; innovation vs. standardisation tension

**Key criteria weighting:** Technical fit 20% / Security 25% / TCO 20% / Business value 20% / Operations 15%

### 19.4 Highly Regulated Organisation (Bank, Insurance, Healthcare)

**Priority order:** Compliance → Security → Operational control → Standards → Business value.

**Approach:**
- Compliance gate before any evaluation starts
- Data residency non-negotiable; vendor DPA mandatory
- Security assessment required for all technologies (not just critical)
- Regulatory approval required for AI and data systems
- Longer evaluation cycles (8–16 weeks) justified by compliance review

**Key criteria weighting:** Security/compliance 35% / Risk 20% / Technical fit 20% / Business value 15% / TCO 10%

### 19.5 Government Agency

**Priority order:** Sovereignty → Security → Compliance → Operational → Cost.

**Approach:**
- National security classification may restrict vendor set
- FedRAMP (US) / NCSC (UK) / BSI (Germany) certification required
- Procurement framework constraints (G-Cloud, GSA Schedule, etc.)
- Long evaluation cycles; public procurement rules
- Open-source preferred for transparency and audit requirements

**Key criteria weighting:** Security 30% / Compliance 30% / Risk 20% / Technical fit 15% / Cost 5%

### 19.6 Healthcare Provider

**Priority order:** Patient safety → HIPAA/clinical compliance → Security → Clinical fit → Cost.

**Approach:**
- Clinical workflow impact assessment required for any patient-facing technology
- HIPAA BAA required for all PHI-touching systems
- Medical device classification review if AI touches clinical decisions
- Clinician satisfaction is a first-class evaluation criterion
- Change management is expensive; prioritise stability

**Key criteria weighting:** Compliance/safety 30% / Clinical fit 25% / Security 20% / Risk 15% / TCO 10%

### 19.7 Financial Institution

**Priority order:** Regulatory compliance → Risk management → Security → Operational resilience → Cost.

**Approach:**
- MAS TRM / EBA ICT guidelines / OCC model risk management
- Model risk management process for any AI/ML system
- Third-party risk management programme for all vendors
- Operational resilience: recovery time objectives for all systems
- Exit and portability requirements in all vendor contracts

**Key criteria weighting:** Compliance/risk 35% / Security 25% / Technical fit 20% / Resilience 15% / Cost 5%

### 19.8 Manufacturing Organisation

**Priority order:** Operational continuity → Integration with OT systems → Security → Cost → Innovation.

**Approach:**
- OT/IT boundary must be explicitly addressed in any deployment
- Industrial protocol support (MQTT, OPC-UA, Modbus) required where applicable
- Edge deployment capability critical for factory floor
- Long-lived systems: 10+ year operational requirements drive vendor stability priority
- Safety systems: functional safety standards (IEC 61508, ISO 13849)

**Key criteria weighting:** Operational fit 30% / Integration 25% / Security 20% / Risk/stability 15% / Cost 10%

---

## 20. Templates and Checklists

### 20.1 Technology Evaluation Scorecard (Master Template)

```
TECHNOLOGY EVALUATION SCORECARD
================================
Technology being evaluated: _______________
Evaluation date: _______________
Evaluating team: _______________
Competing options: _______________

MUST-HAVE GATE (eliminate before scoring):
[ ] Data residency requirement met
[ ] Required compliance certification present
[ ] Licence compatible with enterprise use
[ ] Within budget envelope
[ ] Integration with enterprise IdP confirmed

WEIGHTED SCORING:
                      Weight  Opt A  Opt B  Opt C
Business value:         ___    ___    ___    ___
Strategic alignment:    ___    ___    ___    ___
Technical fit:          ___    ___    ___    ___
Security posture:       ___    ___    ___    ___
TCO (5yr):              ___    ___    ___    ___
Operational complexity: ___    ___    ___    ___
Vendor stability:       ___    ___    ___    ___
Skills/adoption:        ___    ___    ___    ___
TOTAL:                  100    ___    ___    ___

RISK SUMMARY:
Option A key risk: _______________
Option B key risk: _______________
Option C key risk: _______________

RECOMMENDATION: _______________
RATIONALE: _______________
REVIEWER: _______________ DATE: _______________
```

### 20.2 Buy vs Build Decision Checklist

- [ ] Is a commercial or open-source solution available that covers ≥80% of use case?
- [ ] Is this a differentiating capability that constitutes IP?
- [ ] Do we have engineering capacity AND intention to maintain long-term?
- [ ] Is the 3-year build cost less than buy + integration cost?
- [ ] Have we considered extending an existing platform rather than buying or building?
- [ ] Is there a strategic partner who can deliver this better/faster?

### 20.3 ARB Submission Checklist

Before submitting for ARB review:
- [ ] Problem statement documented
- [ ] Minimum 3 options evaluated (or fewer options justified)
- [ ] Weighted decision matrix completed
- [ ] Architecture fitness assessment completed
- [ ] TCO model completed (5-year)
- [ ] Risk assessment completed
- [ ] Security review completed (or waiver requested with justification)
- [ ] Recommended option stated with rationale
- [ ] PoC results attached (if applicable)

### 20.4 Technology Retirement Checklist

- [ ] All consuming teams identified
- [ ] 90+ day advance notice sent
- [ ] Migration guide published
- [ ] Successor technology documented
- [ ] Migration support offered (office hours, scripts)
- [ ] Hard retirement date set
- [ ] Automated block on new deployments configured for retirement date
- [ ] Registry status updated to Sunset → Retired
- [ ] Audit records retained per retention policy
- [ ] Cost tracking updated to remove sunset licences

---

## Glossary

| Term | Definition |
|---|---|
| **ADR** | Architecture Decision Record — documented record of a technology decision and its rationale |
| **AHP** | Analytic Hierarchy Process — pairwise comparison method for deriving objective weights |
| **ARB** | Architecture Review Board — governance body for technology decisions |
| **Best-of-breed** | Strategy of selecting the best individual tool for each capability, regardless of vendor |
| **CMDB** | Configuration Management Database — inventory of all enterprise IT assets |
| **FinOps** | Financial Operations — practice of managing cloud and technology spend |
| **MoSCoW** | Must have / Should have / Could have / Won't have — requirements prioritisation method |
| **OSS** | Open Source Software |
| **Platform thinking** | Preference for one platform that solves a class of problems over many single-problem tools |
| **PoC** | Proof of Concept — bounded evaluation of a technology in a controlled environment |
| **Shadow IT** | Technology used by teams without central IT knowledge or approval |
| **Technology optionality** | Architectural design that makes it possible to swap underlying technology without rewriting business logic |
| **Technology radar** | Visual map of technologies by adoption recommendation (Adopt/Trial/Assess/Hold) |
| **TCO** | Total Cost of Ownership — full cost of a technology decision over its useful life |
| **TOGAF** | The Open Group Architecture Framework — enterprise architecture methodology |
| **Tool sprawl** | Proliferation of tools across an organisation with overlapping or duplicate capabilities |
| **Vendor lock-in** | Dependency on a specific vendor that makes switching costly or disruptive |
| **Weighted scoring matrix** | Decision method that scores options on multiple criteria with assigned importance weights |

---

## Further Reading

**Standards and Frameworks**
- [TOGAF 10 — ADM and Technology Architecture](https://www.opengroup.org/togaf)
- [NIST AI RMF 1.0](https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf)
- [ISO/IEC 25010 — Software Quality](https://www.iso.org/standard/35733.html)
- [Thoughtworks Technology Radar](https://www.thoughtworks.com/radar)

**Decision Methods**
- Kepner and Tregoe, *The Rational Manager* — structured decision analysis
- Saaty, *The Analytic Hierarchy Process* — pairwise comparison method
- Ulwick, *Jobs to be Done: Theory to Practice* — capability-driven evaluation

**Enterprise Architecture Practice**
- [Gartner Magic Quadrant and Critical Capabilities](https://www.gartner.com/en/methodologies/magic-quadrant) — market context (supplement, not replace, internal evaluation)
- [FinOps Foundation Framework](https://www.finops.org/framework/)
- [CNCF Landscape](https://landscape.cncf.io) — cloud-native technology inventory

**Internal Cross-References**
- [Architectural Review Board Operating Model](../architectural-review-board/index.md)
- [Technology Investment Fundamentals](../../ea-masterclass/module-04-technology-investment/index.md)
- [AI Solution Lifecycle Deliverables](ai-solution-lifecycle-deliverables.md)
- [Enterprise Multi-Model AI Strategy](../ai-architecture/enterprise-multi-model-ai-strategy.md)
- [Enterprise AI Governance & Compliance](../ai-architecture/enterprise-ai-governance-compliance.md)
