---
title: "Deliverable Templates 7–10: Governance & Decision Frameworks"
date_created: 2026-07-09
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "deliverables"]
---

# Deliverable Templates 7–10: Governance & Decision Frameworks

These four templates are copy-paste-ready for enterprise architecture governance engagements. Each template includes instructional notes in `<!-- comments -->` or admonition blocks — remove those before client delivery.

---

## Template 7 — Technology Investment Decision Framework

!!! info "When to Use"
    Use this template at investment review gates: annual planning, ad-hoc business cases, portfolio rationalisation. The scoring model forces explicit trade-offs across five dimensions and produces a defensible, auditable recommendation.

### 7.1 Evaluation Dimensions and Weights

| Dimension | Weight | Rationale |
|---|---|---|
| Strategic Fit | 25% | Alignment to enterprise strategy, architecture principles, and roadmap |
| Financial Return | 25% | Expected ROI, NPV, payback period, and cost avoidance |
| Risk | 20% | Technical, vendor, security, regulatory, and execution risk |
| Feasibility | 15% | Technical maturity, team capability, integration complexity |
| Urgency | 15% | Regulatory deadline, competitive threat, or operational pain |

### 7.2 Scoring Rubric (0–4 Scale)

#### Strategic Fit (Weight: 25%)

| Score | Criteria |
|---|---|
| 4 | Directly enables a Tier-1 strategic objective; aligns with target architecture; referenced in the 3-year roadmap |
| 3 | Supports a strategic objective indirectly; consistent with architecture principles; no conflicts with roadmap |
| 2 | Neutral — no strategic conflict but no measurable strategic contribution |
| 1 | Minor misalignment with one or more architecture principles; requires exception |
| 0 | Contradicts strategic direction or would require significant architecture debt |

#### Financial Return (Weight: 25%)

| Score | Criteria |
|---|---|
| 4 | NPV > $5M or ROI > 150% within 3 years; strong quantified benefits with high confidence |
| 3 | NPV $1M–$5M or ROI 75%–150%; benefits quantified with moderate confidence |
| 2 | NPV $0–$1M or ROI 25%–75%; benefits partially quantified or reliant on soft savings |
| 1 | Breakeven or marginal positive return; primarily cost-avoidance or compliance |
| 0 | Negative NPV; no quantifiable financial benefit; pure cost centre |

#### Risk (Weight: 20%)

!!! warning "Scoring Direction"
    Risk is an **inverse** dimension. Score 4 = lowest risk. Score 0 = highest risk.

| Score | Criteria |
|---|---|
| 4 | Proven technology; well-understood implementation; low vendor concentration; no regulatory exposure |
| 3 | Mature technology; minor integration complexity; stable vendor; manageable compliance requirements |
| 2 | Emerging technology or complex integration; moderate vendor risk; some regulatory uncertainty |
| 1 | Unproven technology at scale; significant integration risk; single-vendor dependency; active regulatory scrutiny |
| 0 | Experimental technology; high integration complexity; vendor viability concerns; high regulatory exposure |

#### Feasibility (Weight: 15%)

| Score | Criteria |
|---|---|
| 4 | Existing team skills; clear implementation path; available capacity; proven delivery model |
| 3 | Minor skill gaps addressable with training; delivery approach clear; capacity manageable |
| 2 | Moderate skill gaps requiring hiring or contracting; delivery approach partially defined |
| 1 | Significant capability gaps; delivery approach unclear; capacity severely constrained |
| 0 | No internal capability; no clear implementation path; dependent on unavailable partners |

#### Urgency (Weight: 15%)

| Score | Criteria |
|---|---|
| 4 | Regulatory deadline within 6 months OR active operational failure threatening revenue/compliance |
| 3 | Competitive disadvantage already materialising OR deadline within 12 months |
| 2 | Emerging competitive threat OR deadline 12–24 months out |
| 1 | Opportunity horizon 2–3 years; no immediate consequence of deferral |
| 0 | No time pressure; investment can be deferred indefinitely without consequence |

### 7.3 Weighted Score Aggregation Formula

```
Weighted Score = (Strategic Fit Score × 0.25)
              + (Financial Return Score × 0.25)
              + (Risk Score × 0.20)
              + (Feasibility Score × 0.15)
              + (Urgency Score × 0.15)

Maximum Possible Score = 4.0
```

### 7.4 Decision Thresholds

| Weighted Score | Recommendation | Action |
|---|---|---|
| > 3.0 | **Recommend** | Proceed to business case approval; include in investment plan |
| 2.0 – 3.0 | **Conditional** | Address identified gaps before approval; re-score at next gate |
| < 2.0 | **Decline** | Do not fund; document rationale; revisit in next planning cycle |

### 7.5 Worked Example: Scoring Three Investments Side by Side

**Context:** A financial services firm is evaluating three proposals at Q3 investment review.

- **Investment A:** Cloud Data Platform Migration
- **Investment B:** Generative AI Customer Service Chatbot
- **Investment C:** Legacy ERP Upgrade

#### Raw Scores

| Dimension | Weight | Investment A | Investment B | Investment C |
|---|---|---|---|---|
| Strategic Fit | 25% | 4 | 3 | 2 |
| Financial Return | 25% | 3 | 2 | 2 |
| Risk | 20% | 3 | 1 | 3 |
| Feasibility | 15% | 3 | 2 | 3 |
| Urgency | 15% | 2 | 2 | 4 |

#### Weighted Scores

| Dimension | Weight | A Weighted | B Weighted | C Weighted |
|---|---|---|---|---|
| Strategic Fit | 25% | 1.00 | 0.75 | 0.50 |
| Financial Return | 25% | 0.75 | 0.50 | 0.50 |
| Risk | 20% | 0.60 | 0.20 | 0.60 |
| Feasibility | 15% | 0.45 | 0.30 | 0.45 |
| Urgency | 15% | 0.30 | 0.30 | 0.60 |
| **Total** | **100%** | **3.10** | **2.05** | **2.65** |

#### Decisions

| Investment | Score | Decision | Notes |
|---|---|---|---|
| A — Cloud Data Platform | 3.10 | Recommend | Strong strategic alignment and financial return; proceed to full business case |
| B — Gen AI Chatbot | 2.05 | Conditional | Risk score is low; require proof-of-concept and risk mitigation plan before approval |
| C — ERP Upgrade | 2.65 | Conditional | Urgency is driven by vendor end-of-support; require vendor roadmap confirmation |

---

## Template 8 — Architecture Review Board Guide

!!! info "When to Use"
    Establish or mature an ARB with this guide. Use the charter to define authority. Use the ADR template to document every decision. Adapt membership and cadence to your organisation's size.

### 8.1 ARB Charter Template

**Architecture Review Board Charter**
Version: [X.X] | Effective Date: [DD MMM YYYY] | Owner: [Chief Architect / CTO]

#### Purpose

The Architecture Review Board (ARB) exists to ensure technology decisions align with enterprise architecture principles, the target-state architecture, and strategic investment priorities. The ARB provides governance, not gatekeeping — its mandate is to enable good decisions, not to block delivery.

#### Scope

The ARB has authority over:

- All technology investments above [$ threshold, e.g. $500K]
- New platform, infrastructure, or integration pattern introductions
- Deviations from approved architecture standards
- Retirement or decommissioning of Tier-1 systems
- Vendor selections where the technology category is not on the approved vendor register

The ARB does not govern:

- Within-standard technology selections below threshold
- Configuration changes within approved platforms
- Feature development within existing approved architectures

#### Membership

| Role | Title | Voting? | Quorum Required? |
|---|---|---|---|
| Chair | Chief Architect | Yes | Yes |
| Deputy Chair | Domain Architect Lead | Yes | No |
| Infrastructure Domain | Head of Infrastructure | Yes | Yes |
| Security Domain | CISO or delegate | Yes | Yes |
| Data Domain | Chief Data Officer or delegate | Yes | No |
| Application Domain | Head of Application Architecture | Yes | Yes |
| Business Representative | Senior Business Analyst Lead | Advisory | No |
| Finance Representative | Finance Business Partner | Advisory | No |

**Quorum:** Chair + at least 3 voting members.

#### Authority

| Decision Type | ARB Authority |
|---|---|
| Standard Approval | Final decision; no escalation required |
| Conditional Approval | ARB sets conditions; sponsor must confirm resolution |
| Escalation to Executive | ARB recommendation only; CTO/CIO makes final call for investments > $5M |
| Emergency Approval | Chair + 2 voting members; ratified at next full ARB |

#### Cadence

- **Standard ARB:** Fortnightly, 60 minutes
- **Architecture Working Group (AWG):** Weekly, 30 minutes (pre-screening before ARB)
- **Emergency ARB:** Within 5 business days of request

### 8.2 ARB Membership Roles and Responsibilities

| Role | Key Responsibilities | Time Commitment |
|---|---|---|
| Chair | Set agenda; facilitate decisions; own ARB charter; report to CTO | 4 hrs/fortnight |
| Domain Architect (each) | Review submissions in domain; prepare domain-specific questions; vote | 3 hrs/fortnight |
| Business Representative | Validate business case alignment; flag business risk | 1.5 hrs/fortnight |
| Finance Representative | Validate financial assumptions; flag budget conflicts | 1.5 hrs/fortnight |
| Submission Sponsor | Present proposal; respond to questions; implement conditions | As required |
| AWG Coordinator | Run pre-screening; notify sponsors of readiness status | 2 hrs/week |

### 8.3 Decision-Making Process (ASCII Flowchart)

```
Sponsor identifies need for ARB review
              |
              v
     Submit to AWG Coordinator
              |
              v
   AWG Pre-Screening (weekly)
              |
    +--------------------+
    |                    |
 INCOMPLETE           COMPLETE
    |                    |
    v                    v
Return to Sponsor    Schedule on ARB Agenda
with gap list        (next available slot)
                          |
                          v
              ARB Session (60 min)
                          |
                   +------+------+
                   |             |
             APPROVED        NOT APPROVED
                   |             |
          +--------+        +----+-------+
          |        |        |            |
       FULL    COND'L    DECLINE     ESCALATE
          |        |        |            |
          v        v        v            v
      Issue     Issue    Issue ADR   Forward to
      ADR       ADR      (Decline)   CTO/CIO
      (Approved) with               with ARB
                conditions          recommendation
                   |
                   v
              Sponsor resolves
              conditions within
              agreed timeframe
                   |
                   v
              Chair confirms
              resolution → Full ADR issued
```

### 8.4 Submission Requirements Checklist

Submissions must include all items below. Incomplete submissions will be returned.

- [ ] 1. Executive Summary (1 page maximum)
- [ ] 2. Problem Statement and Business Driver
- [ ] 3. Proposed Solution Description
- [ ] 4. Strategic Alignment mapping (reference specific strategic objectives)
- [ ] 5. Investment Decision Framework scorecard (Template 7, completed)
- [ ] 6. Current-state architecture diagram (relevant scope)
- [ ] 7. Target-state architecture diagram (proposed)
- [ ] 8. Integration architecture and impacted systems list
- [ ] 9. Data flow diagram (if personal data or regulated data is involved)
- [ ] 10. Security and compliance assessment (completed by CISO team)
- [ ] 11. Vendor assessment (if new vendor; include financial due diligence)
- [ ] 12. Technology radar positioning (Adopt / Trial / Assess / Hold)
- [ ] 13. Total Cost of Ownership model (5-year; use Template 10)
- [ ] 14. Non-functional requirements (availability, performance, scalability targets)
- [ ] 15. Proposed Architecture Decision Record (draft ADR for ARB to ratify)

### 8.5 Sample ARB Agenda (60-Minute Session)

```
ARCHITECTURE REVIEW BOARD — AGENDA
Date:     [DD MMM YYYY]
Chair:    [Name]
Location: [Room / Video link]
Quorum:   [Confirm at meeting open]

00:00 – 00:05   Welcome and Quorum Confirmation
00:05 – 00:10   Minutes and Actions from Previous ARB
00:10 – 00:40   Submission Reviews (max 3 submissions × 10 min each)
                  [10:00] Submission 1: [Title] — Sponsor: [Name]
                  [10:10] Submission 2: [Title] — Sponsor: [Name]
                  [10:20] Submission 3: [Title] — Sponsor: [Name]
00:40 – 00:50   Architecture Patterns Update / Standing Items
                  - Technology radar updates
                  - Open ADR tracking
                  - Principle exceptions in flight
00:50 – 00:55   Upcoming Submissions Preview
00:55 – 01:00   Actions Summary and Close

Note: Each submission slot = 5 min presentation + 5 min Q&A + decision.
      Complex submissions may be allocated a 20-min double slot — confirm with Chair.
```

### 8.6 Architecture Decision Record (ADR) Template

```markdown
# ADR-[NNN]: [Short Descriptive Title]

**Status:** [Proposed | Under Review | Approved | Conditionally Approved |
             Declined | Superseded by ADR-NNN]
**Date:** [DD MMM YYYY]
**ARB Session:** [DD MMM YYYY]
**Sponsor:** [Name, Title]
**Domain:** [Infrastructure | Application | Data | Security | Integration]
**Review Cycle:** [Date of next scheduled review, or "No scheduled review"]

---

## Context

[Describe the situation and forces at play. What is the problem? Why is a
decision needed now? What constraints exist? What have we already tried or
considered informally? 2–4 paragraphs.]

## Decision

[State the decision clearly and unambiguously. Start with "We will..." or
"The ARB has decided to...". Be specific about what is approved and what is
not. If conditional, list all conditions.]

**Conditions (if Conditional Approval):**
1. [Condition 1 — owner — due date]
2. [Condition 2 — owner — due date]

## Consequences

### Positive
- [Expected benefit 1]
- [Expected benefit 2]

### Negative / Trade-offs
- [Known downside or trade-off 1]
- [Known downside or trade-off 2]

### Risks
- [Risk 1 — mitigation]
- [Risk 2 — mitigation]

## Alternatives Considered

| Alternative | Why Rejected |
|---|---|
| [Option A] | [Reason] |
| [Option B] | [Reason] |
| [Option C] | [Reason] |

## Related Documents
- Business Case: [Link]
- Investment Scorecard: [Link]
- Architecture Diagrams: [Link]

## Revision History

| Version | Date | Author | Change |
|---|---|---|---|
| 1.0 | [DD MMM YYYY] | [Name] | Initial |
```

### 8.7 Decision Types and Escalation Paths

| Decision Type | Trigger | Process | Escalation |
|---|---|---|---|
| Standard Approval | New technology in scope | Full ARB review | None — ARB is final |
| Emergency Approval | Production risk; regulatory deadline < 5 days | Chair + 2 members via email/call | Ratified at next ARB |
| Architecture Principle Exception | Proposal violates a published principle | Full ARB review; exception register updated | CTO if unanimous ARB concern |
| Investment > $5M | Any ARB-reviewed investment above threshold | ARB recommendation issued | CTO/CIO Investment Committee |
| Vendor Exception | Vendor not on approved register | ARB + Procurement + Legal review | CPO if strategic implications |
| Cross-Domain Conflict | Two domains in disagreement | AWG mediation first; then ARB | CTO if ARB cannot resolve |

---

## Template 9 — AI Governance Playbook

!!! info "When to Use"
    Apply this playbook to any enterprise AI initiative. Use it from intake through deployment and ongoing monitoring. Adapt the Responsible AI Board submission template to your governance structure (could be an AI CoE, Ethics Board, or Risk Committee).

### 9.1 Responsible AI Principles Statement Template

**[Organisation Name] Responsible AI Principles**
Version: [X.X] | Approved by: [Board / Executive] | Date: [DD MMM YYYY]

---

**Principle 1 — Human Oversight**
We design AI systems so that humans remain accountable for consequential decisions. Where AI informs or assists a decision, we maintain clear human review points and override mechanisms. AI systems do not make final decisions in matters affecting individual rights, employment, credit, or safety without human confirmation.

**Principle 2 — Fairness and Non-Discrimination**
We test AI systems for bias across protected characteristics before deployment and on an ongoing basis. We do not use AI in ways that create or amplify discriminatory outcomes. We document known limitations and communicate them to users and decision-makers.

**Principle 3 — Transparency and Explainability**
We can explain, at an appropriate level of detail, how our AI systems reach their outputs. We provide users with meaningful information about when they are interacting with or being assessed by an AI system. We do not deploy black-box models in high-stakes contexts without explainability controls.

**Principle 4 — Privacy and Data Stewardship**
We use only the minimum data necessary for each AI use case. We apply privacy-by-design principles. We do not use personal data for AI training without appropriate legal basis and individual notification. We implement data retention and deletion controls in all AI pipelines.

**Principle 5 — Security and Robustness**
We test AI systems for adversarial vulnerabilities, distribution shift, and failure modes before deployment. We implement monitoring to detect model drift and unexpected outputs. We maintain incident response plans specific to AI system failures.

**Principle 6 — Accountability and Governance**
Every AI system has a named business owner and technical owner who are accountable for its behaviour. We maintain an AI system register. We review all AI systems against these principles at intake, before deployment, and annually thereafter.

---

### 9.2 AI Use Case Intake Form

Complete this form before commencing any AI project. Submit to the AI CoE or Responsible AI Board for review.

```
AI USE CASE INTAKE FORM
Submission Date: _______________   Reference: AI-[YYYY]-[NNN]

SECTION A: BASIC INFORMATION
Use Case Name: _________________________________________________
Business Owner: ________________________________________________
Technical Owner: _______________________________________________
Business Unit: _________________________________________________
Proposed Go-Live: ______________________________________________
Estimated Budget: ______________________________________________

SECTION B: USE CASE DESCRIPTION
1. What problem is this AI system solving?
   ________________________________________________________________
   ________________________________________________________________

2. What is the primary AI technique? (select all that apply)
   [ ] Machine Learning — Classification
   [ ] Machine Learning — Regression / Forecasting
   [ ] Large Language Model / Generative AI
   [ ] Computer Vision
   [ ] Natural Language Processing
   [ ] Optimisation / Reinforcement Learning
   [ ] Rules-based / Expert System
   [ ] Other: ______________________

3. Describe the AI system's inputs (data types, sources):
   ________________________________________________________________

4. Describe the AI system's outputs (what decisions/actions result):
   ________________________________________________________________

5. Who or what acts on the AI output?
   [ ] Human reviews and decides    [ ] System acts automatically
   [ ] Hybrid (describe): ___________________________________

SECTION C: RISK AND ETHICS ASSESSMENT
6. Does this use case make or inform decisions affecting individuals?
   [ ] Yes — employment  [ ] Yes — credit/financial  [ ] Yes — healthcare
   [ ] Yes — legal/compliance  [ ] Yes — safety  [ ] No

7. Does the use case involve personal data?
   [ ] Yes (complete Data Ethics Review, Section 9.4)  [ ] No

8. Does the use case involve any of the following? (check all that apply)
   [ ] Automated scoring or ranking of people
   [ ] Facial recognition or biometric data
   [ ] Monitoring of employee behaviour
   [ ] Customer profiling for differential treatment
   [ ] Content generation presented as human-authored
   [ ] Autonomous decision-making in safety-critical systems

9. Identify the top 3 risks:
   Risk 1: ___________________________________________________
   Risk 2: ___________________________________________________
   Risk 3: ___________________________________________________

SECTION D: SIGN-OFFS
Business Owner Signature: _________________  Date: ____________
Technical Owner Signature: ________________  Date: ____________
AI CoE Reviewer: _________________________  Date: ____________
Responsible AI Board Decision: ____________  Date: ____________
```

### 9.3 Model Risk Management Checklist (SR 11-7 Aligned)

!!! note "Regulatory Reference"
    SR 11-7 is the Federal Reserve / OCC supervisory guidance on model risk management (2011, updated 2021). Apply this checklist for all models used in regulated financial decisions. Adapt for other regulated industries.

**Model Development and Documentation**

- [ ] 1. Model purpose and intended use are documented
- [ ] 2. Theoretical basis and assumptions are documented and peer-reviewed
- [ ] 3. Data sources, data quality assessments, and data lineage are documented
- [ ] 4. Feature selection rationale is documented
- [ ] 5. Model selection rationale (why this algorithm) is documented
- [ ] 6. Training/validation/test split methodology is documented
- [ ] 7. Performance metrics and thresholds are defined before training
- [ ] 8. Benchmark or challenger model comparison is completed

**Model Validation**

- [ ] 9. Independent validation performed by team not involved in development
- [ ] 10. Conceptual soundness review completed
- [ ] 11. Out-of-sample and out-of-time testing completed
- [ ] 12. Sensitivity analysis to input assumptions completed
- [ ] 13. Stress testing under adverse scenarios completed
- [ ] 14. Fairness and bias testing completed across relevant population segments
- [ ] 15. Explainability assessment completed (for models in scope)

**Implementation and Controls**

- [ ] 16. Model implementation review confirms code matches specification
- [ ] 17. User access controls and audit trail implemented
- [ ] 18. Override and exception handling procedures documented
- [ ] 19. Model inventory record created and submitted to Model Risk team
- [ ] 20. Ongoing monitoring plan defined and approved (see Section 9.5)

### 9.4 Data Ethics Review Checklist

- [ ] 1. Legal basis for data processing is identified (e.g., consent, legitimate interest, legal obligation)
- [ ] 2. Data minimisation applied — only data necessary for the purpose is used
- [ ] 3. Data provenance is documented (origin, collection method, any third-party sources)
- [ ] 4. Data quality assessment completed (completeness, accuracy, timeliness, consistency)
- [ ] 5. Sensitive data categories identified (race, religion, health, political opinion, etc.)
- [ ] 6. Privacy Impact Assessment (PIA) completed if personal data is used
- [ ] 7. Data retention policy defined and automated where possible
- [ ] 8. Training data does not include data obtained without appropriate consent
- [ ] 9. Individuals whose data is used have been notified (or exemption documented)
- [ ] 10. Right to erasure process defined if personal data is in training set
- [ ] 11. Cross-border data transfer compliance confirmed (e.g., GDPR adequacy, SCCs)
- [ ] 12. Third-party data sharing agreements in place if data is shared externally

### 9.5 AI Ongoing Monitoring Requirements

| What to Monitor | Metric | Frequency | Owner | Alert Threshold |
|---|---|---|---|---|
| Model performance (classification) | Accuracy, F1, AUC | Weekly | ML Engineer | >5% degradation vs. baseline |
| Model performance (regression) | RMSE, MAE | Weekly | ML Engineer | >10% degradation vs. baseline |
| Input data distribution | PSI (Population Stability Index) | Monthly | Data Engineer | PSI > 0.2 |
| Prediction distribution | Output distribution shift | Monthly | ML Engineer | >15% shift in output histogram |
| Fairness metrics | Demographic parity, equalised odds | Monthly | RAI Lead | Any protected group gap widens > 2pp |
| Data pipeline health | Null rates, schema violations | Daily | Data Engineer | Any schema violation; null rate > 5% |
| User override rate | % of AI recommendations overridden | Monthly | Business Owner | >30% sustained override rate |
| Model uptime / latency | P95 response time, availability | Continuous | Platform Ops | Latency > SLA; availability < 99.5% |
| Incident log | Count and severity of AI-related incidents | Weekly | RAI Lead | Any Severity 1; 3+ Severity 2 in a month |
| Annual model refresh | Full retraining and re-validation | Annual | ML Engineer | Scheduled — not threshold-based |

### 9.6 Responsible AI Board Submission Template

```markdown
# Responsible AI Board Submission

**Reference:** AI-[YYYY]-[NNN]
**Submission Date:** [DD MMM YYYY]
**Session:** [DD MMM YYYY]
**Use Case Name:** [Name]
**Business Owner:** [Name, Title]

## Executive Summary
[2–3 sentences: what the AI system does, what decision it informs,
and the key risk findings.]

## Use Case Description
[Expand from Intake Form Section B. Describe data inputs, model type,
outputs, and how outputs flow into business processes.]

## Risk Assessment Summary

| Risk Category | Rating | Key Finding |
|---|---|---|
| Bias / Fairness | High / Medium / Low | [Summary] |
| Privacy | High / Medium / Low | [Summary] |
| Explainability | High / Medium / Low | [Summary] |
| Security / Adversarial | High / Medium / Low | [Summary] |
| Regulatory Compliance | High / Medium / Low | [Summary] |
| Operational | High / Medium / Low | [Summary] |

## Mitigations Proposed
[For each High and Medium risk, describe the specific mitigation.]

## Monitoring Plan
[Reference Section 9.5. Confirm which metrics, frequency, and owner.]

## Recommendation from AI CoE
[ ] Approve for deployment
[ ] Approve with conditions (listed below)
[ ] Return for further assessment
[ ] Decline

**Conditions:** [If applicable]

## Board Decision
[ ] Approved  [ ] Approved with conditions  [ ] Declined
**Decision rationale:** ________________________________________
**Signed:** _________________________ Date: ___________________
```

### 9.7 AI Incident Response Playbook

| Severity | Definition | Response Time | Incident Commander |
|---|---|---|---|
| Severity 1 | Harm to individuals; regulatory breach; major financial loss; system unavailable | Immediate — 15 min to acknowledge; 4 hrs to resolve or contain | CISO + CTO + CDO |
| Severity 2 | Model producing significantly incorrect outputs at scale; data breach risk; fairness violation discovered in production | 2-hour acknowledgement; 24-hour response plan | AI CoE Lead + Business Owner |
| Severity 3 | Performance degradation within acceptable bounds; minor data quality issue; low-impact anomaly | Next business day acknowledgement; 5-day resolution | ML Engineer + Data Engineer |

#### Severity 1 — Immediate Response Steps

1. **Contain (0–15 min):** Suspend AI system output; revert to manual process or last known good state.
2. **Notify (15–60 min):** Alert CISO, CTO, CDO, Legal, Compliance, and Communications.
3. **Assess (1–4 hrs):** Determine scope — how many individuals affected, what data involved, what outputs were acted upon.
4. **Regulatory notification (4–72 hrs):** If personal data breach, notify DPA within 72 hours. If financial regulatory impact, notify regulator per applicable rules.
5. **Root cause analysis (24–72 hrs):** Identify failure mode; document in incident register.
6. **Remediation plan (72 hrs):** Define fix, test, and re-deployment plan; present to Responsible AI Board.
7. **Post-incident review (5–10 business days):** Lessons learned; principle review; controls update.

---

## Template 10 — Financial Modeling Guide for Architects

!!! info "When to Use"
    Use this guide when preparing or reviewing a business case. You are not expected to be an accountant — your role is to produce credible financial models that Finance can validate, not audit-quality final numbers.

### 10.1 5-Year TCO Model Template

Copy this table into Excel or Google Sheets. Replace `$0` placeholders with actual estimates. All values in $000s unless noted.

| Cost Category | Notes | Y0 (Setup) | Y1 | Y2 | Y3 | Y4 | Y5 | 5-Yr Total |
|---|---|---|---|---|---|---|---|---|---|
| **Licensing / Subscription** | | | | | | | | |
| Software licences | Annual SaaS fees, per-user or enterprise | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| Platform fees | Cloud platform consumption (compute, storage, network) | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| API and data feeds | Third-party APIs, market data, reference data | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| **Infrastructure** | | | | | | | | |
| Compute | VMs, containers, serverless — baseline + peak | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| Storage | Block, object, archive | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| Network | Ingress/egress, CDN, connectivity | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| DR / backup | Standby environments, backup storage | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| **Implementation** | | | | | | | | |
| Internal labour | FTEs dedicated to project (cost, not charge-out) | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| External consulting | SI, specialist, programme management | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| Data migration | Extract, transform, load, validation, cutover | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| Integration build | API development, middleware, testing | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| **People** | | | | | | | | |
| Permanent headcount | Ongoing roles required to operate solution | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| Contractor / contingent | Ongoing contract roles | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| **Training** | | | | | | | | |
| Initial training | All users; admin training; internal delivery setup | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| Ongoing training | New joiners; refresher; version updates | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| **Support** | | | | | | | | |
| Vendor support | Premium/standard support tier | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| Internal service desk | Proportion of service desk costs | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| **Maintenance** | | | | | | | | |
| Upgrade and patching | Version upgrades, security patches | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| Technical debt remediation | Estimated ongoing cleanup | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| **TOTAL COST** | | **$0** | **$0** | **$0** | **$0** | **$0** | **$0** | **$0** |
| **TOTAL BENEFIT** | | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| **NET CASH FLOW** | | $0 | $0 | $0 | $0 | $0 | $0 | $0 |
| **CUMULATIVE CASH FLOW** | | $0 | $0 | $0 | $0 | $0 | $0 | $0 |

!!! tip "Populating the Model"
    - Y0 is the implementation year. Include all one-time costs here.
    - Apply an annual cost escalation assumption (typically 3–5%) to people and support costs from Y1 onward.
    - Apply a volume growth assumption to infrastructure and licensing where applicable.
    - Benefits should be entered as positive values in the TOTAL BENEFIT row. Net Cash Flow = Benefit − Cost.

### 10.2 NPV Calculator Instructions

**Step 1 — Define the discount rate (r)**

Use your organisation's hurdle rate (often 8–12% for technology investments). If unsure, ask Finance — they publish this for investment appraisals.

**Step 2 — Set the time horizon (T)**

Standard is 5 years. Use 7 years for major infrastructure investments with long useful life.

**Step 3 — Apply the NPV formula**

```
NPV = Σ [Benefit_t / (1 + r)^t] - Initial Investment

Where:
  t         = year (0, 1, 2, ... T)
  Benefit_t = net cash flow in year t (Benefit minus Operating Cost in that year)
  r         = discount rate (e.g., 0.10 for 10%)
  Σ         = sum across all years 1 to T
  Initial Investment = all Y0 costs (upfront, before benefits materialise)
```

**Step 4 — Interpret the result**

| NPV Result | Interpretation |
|---|---|
| NPV > 0 | Investment creates value at the chosen discount rate; proceed |
| NPV = 0 | Investment returns exactly the hurdle rate; borderline |
| NPV < 0 | Investment destroys value at the chosen discount rate; requires justification |

**Step 5 — Calculate payback period**

Payback Period = the year in which Cumulative Cash Flow first turns positive. Read directly from the TCO model table.

### 10.3 Sensitivity Analysis Template

Use this to test how sensitive the NPV is to changes in key assumptions. Populate the base case NPV, then recalculate under each scenario.

**Base Case NPV: $___________M | Discount Rate: ___% | Horizon: ___ years**

| Variable | Change | NPV ($M) | NPV Change vs. Base | Payback (yrs) |
|---|---|---|---|---|
| Base Case | — | $0 | — | 0 |
| Implementation Cost | +20% | $0 | $0 | 0 |
| Implementation Cost | -20% | $0 | $0 | 0 |
| Benefits | +30% | $0 | $0 | 0 |
| Benefits | -30% | $0 | $0 | 0 |
| Both Cost +20% and Benefits -30% | Pessimistic | $0 | $0 | 0 |
| Discount Rate | +3pp | $0 | $0 | 0 |
| Discount Rate | -3pp | $0 | $0 | 0 |

!!! tip "Reading the Sensitivity Table"
    The row that produces the largest NPV change identifies your most critical assumption. Direct risk management effort there. If the pessimistic combined scenario still returns a positive NPV, the investment is robust.

### 10.4 Scenario Analysis Template

| Scenario | Description | Cost Assumption | Benefit Assumption | Probability | NPV ($M) | Expected NPV ($M) |
|---|---|---|---|---|---|---|
| Best Case | Accelerated adoption; favourable vendor pricing; productivity gains exceed targets | Base -15% | Base +30% | 20% | $0 | $0 |
| Base Case | On-plan delivery; benefits as modelled | Base | Base | 60% | $0 | $0 |
| Worst Case | Delayed delivery; cost overrun; slower adoption | Base +25% | Base -30% | 20% | $0 | $0 |
| **Probability-Weighted NPV** | | | | **100%** | | **$0** |

```
Probability-Weighted NPV = (Best NPV × 0.20) + (Base NPV × 0.60) + (Worst NPV × 0.20)
```

### 10.5 Key Financial Benchmarks Reference Table

!!! warning "Reference Only"
    These are indicative industry benchmarks. Actual results vary by organisation size, sector, and implementation quality. Always validate against your organisation's actual cost base.

| Investment Type | Typical ROI Range | Typical Payback | Typical NPV (5-yr, $5–20M investment) |
|---|---|---|---|
| Cloud Migration (lift-and-shift) | 40–80% | 2–3 years | 1–3× investment |
| Cloud Migration (re-architecture) | 80–150% | 2–4 years | 1.5–4× investment |
| ERP Implementation | 25–70% | 3–5 years | 0.5–2× investment |
| Data Platform / Data Warehouse | 60–120% | 2–4 years | 1–3× investment |
| AI / ML Use Case (production) | 100–300% | 1–3 years | 2–6× investment |
| API / Integration Platform | 50–120% | 2–3 years | 1–3× investment |
| Zero-Trust Security Program | -10–40% (cost avoidance) | 3–5 years | Often negative NPV; justified by risk reduction |
| DevOps / Platform Engineering | 80–200% | 1–3 years | 2–5× investment |
| Robotic Process Automation | 100–400% | 1–2 years | 3–8× investment (narrow scope) |
| Legacy Decommissioning | 30–80% (cost avoidance) | 2–4 years | Positive if deferred cost is large |

---

!!! success "Usage Guidance"
    All templates in this document are designed to be copied directly into client deliverables. Remove instructional admonition blocks before delivery. Replace all `[bracketed placeholders]` with actual content. Template 7 scoring models and Template 10 TCO tables work best in spreadsheet format — the markdown tables here serve as the structural reference.
