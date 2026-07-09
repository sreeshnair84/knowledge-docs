---
title: "Module 10 — Enterprise Governance"
date: 2026-07-09
---

# Module 10 — Enterprise Governance

Enterprise governance is the invisible infrastructure that determines whether your architecture decisions actually get funded, approved, and implemented — or die in a committee room. This module teaches you to navigate that infrastructure with confidence.

---

## Why Enterprise Governance Exists

### The Problem Governance Solves

Before formal governance, large enterprises learned painful lessons:

- **Technology sprawl**: 47 different project management tools. 12 CRM systems. 6 data warehouses doing the same job.
- **Duplicate investments**: Two business units spending $3M each on identical data analytics platforms, discovered only when the CFO asked why the company was paying two vendors for the same capability.
- **Conflicting standards**: The retail division chose Oracle Cloud, corporate IT standardized on SAP, and the logistics team built on AWS. Integration costs exceeded original build costs within 18 months.
- **Accountability gaps**: A major security breach occurred because nobody owned the decision about which cloud provider stored customer PII. Everyone assumed someone else had reviewed it.

!!! note "The Core Insight"
    Governance is not about slowing things down. It is a **system of decision rights, accountability, and oversight** that prevents the enterprise from inadvertently destroying value through uncoordinated decisions.

### What Good Governance Looks Like

Good governance has four characteristics:

| Characteristic | Description | Observable Signal |
|---|---|---|
| **Clear decision rights** | Every significant decision has exactly one owner | You can name the person or body that approved each major choice |
| **Proportional process** | High-risk decisions get more scrutiny; low-risk decisions move fast | A $10K SaaS tool does not need Investment Committee approval |
| **Separation of concerns** | Financial, architectural, risk, and ethical concerns reviewed by appropriate experts | You are not asking accountants to evaluate encryption algorithms |
| **Feedback loops** | Decisions are tracked; outcomes inform future decisions | Post-implementation reviews feed back into standards |

### What Bad Governance Looks Like

!!! warning "Governance Anti-Pattern Warning"
    Bad governance is common. Recognizing it early lets you work around it or help fix it.

- **Death by committee**: A proposal goes to 8 different bodies over 14 months and returns with 200 conflicting comments. No one is accountable for a decision.
- **Governance theater**: The committee meets, nods along, rubber-stamps everything, and serves no real oversight function.
- **Shadow IT**: Business units bypass governance entirely because the process takes too long. The enterprise discovers 300 unmanaged SaaS applications during a security audit.
- **Governance vacuum**: Nobody has defined who approves what, so every proposal bounces endlessly between executives until momentum dies.

---

## Architecture Review Board (ARB)

### What It Is

The Architecture Review Board is the primary governance body for technology architecture decisions. It exists to ensure new solutions align with enterprise architecture standards, avoid creating technical debt, and integrate properly with existing systems.

!!! note "ARB Is Not a Veto Body"
    The ARB's job is to ensure architectural soundness and standards compliance — not to block projects. A well-functioning ARB helps teams find better solutions, not just approve or reject.

### Who Sits on the ARB

| Role | Responsibility | Voting |
|---|---|---|
| Chief Architect / Enterprise Architect | Chair; overall architectural alignment | Yes |
| Domain Architects (Cloud, Data, Security, Integration) | Technical depth in their domains | Yes |
| Infrastructure Lead | Operational feasibility | Yes |
| CISO or Security Architect | Security standards compliance | Yes |
| CTO Representative | Strategic alignment | Advisory |
| Business Architecture Lead | Business capability alignment | Advisory |
| Project/Program Sponsor | Presenter (non-voting) | No |

### What the ARB Reviews

The ARB reviews technology decisions above defined complexity or risk thresholds. Typical triggers include:

- Any solution involving a **new technology vendor** not on the approved vendor list
- Any solution involving **new data stores** or changes to master data
- Any solution requiring **system integration** with 3+ existing platforms
- Any cloud deployment above the agreed **spend threshold** (often $250K/year)
- Any introduction of a **new architectural pattern** not in the standard
- Any **AI/ML system** that makes automated decisions affecting customers or employees
- Any solution handling **regulated data** (PII, PCI, HIPAA, financial records)

### Decision Cadence

Most ARBs meet bi-weekly or monthly. Emergency reviews can be called for urgent decisions. A typical cadence:

```
Bi-weekly standing meeting (90 minutes):
  - 3 submissions per meeting maximum
  - 25 minutes per submission: 15 min presentation, 10 min Q&A
  - Decision issued within 5 business days of meeting
  - Conditional approvals resolved within 30 days or submission lapses
```

### Decision Types

| Decision | Meaning | What Happens Next |
|---|---|---|
| **Approve** | Submission meets all standards | Project proceeds; decision logged in architecture register |
| **Conditional Approval** | Minor gaps; specific conditions must be met | Sponsor documents remediation; follows up within agreed timeframe |
| **Defer** | Incomplete submission; needs more information | Sponsor revises and resubmits at next meeting |
| **Reject** | Proposal conflicts with enterprise standards or strategy | Sponsor must address fundamental concerns before resubmission |

!!! tip "Conditional Approvals Are Common"
    Most first-time submissions receive conditional approvals rather than outright approval. This is normal. The conditions are usually specific, actionable, and achievable. Do not treat a conditional approval as a failure.

### How to Prepare an ARB Submission

Work through this checklist before submitting:

**ARB Submission Checklist**

- [ ] Executive summary (one page maximum)
- [ ] Business context and problem statement
- [ ] Solution overview including architecture diagram (C4 Level 2 minimum)
- [ ] Technology choices with rationale (why this vendor/pattern over alternatives)
- [ ] Integration points with existing systems (list all APIs, data flows, dependencies)
- [ ] Data classification for all data the solution handles
- [ ] Security controls summary (authentication, authorization, encryption at rest/in transit)
- [ ] Non-functional requirements (availability, performance, scalability targets)
- [ ] Compliance requirements addressed (GDPR, SOX, HIPAA, PCI as applicable)
- [ ] Vendor assessment (new vendor? Include security questionnaire results, financial viability)
- [ ] Operational model (who runs this in production? On-call? Monitoring?)
- [ ] Disaster recovery and business continuity approach
- [ ] Technical debt and decommission plan (what does this replace?)
- [ ] Estimated total cost of ownership (3-year)
- [ ] Dependencies on other projects or infrastructure
- [ ] Risks and mitigations
- [ ] Alternatives considered and why rejected

### What Gets Rejected and Why

| Rejection Reason | Common Scenario |
|---|---|
| **Vendor not approved** | Team chose a niche vendor without going through vendor assessment |
| **Standards conflict** | Solution uses a deprecated integration pattern or unsupported database type |
| **Missing security review** | CISO has not seen the submission before the ARB meeting |
| **Incomplete integration design** | No detail on how the system connects to the enterprise data platform |
| **No data classification** | Team has not identified what data the system stores or processes |
| **No DR plan** | Critical system with no documented recovery approach |
| **Scope creep from approved design** | Project scope has expanded significantly from a previously approved design |

### Sample ARB Agenda

```
ARCHITECTURE REVIEW BOARD — AGENDA
Date: [Date]
Chair: [Chief Architect]
Location: [Room / Video Link]

09:00 — Standing items (10 min)
  - Previous decisions log review
  - Outstanding conditional approvals status
  - Emerging architectural risks

09:10 — Submission 1: Customer Data Platform Replacement (25 min)
  - Presenter: [Project Architect]
  - Submission package distributed 5 days prior

09:35 — Submission 2: AI Recommendation Engine for E-commerce (25 min)
  - Presenter: [Lead Data Scientist + Solution Architect]
  - Submission package distributed 5 days prior

10:00 — Submission 3: Cloud Migration — Phase 2 (25 min)
  - Presenter: [Cloud Architecture Lead]
  - Submission package distributed 5 days prior

10:25 — Standards update: API gateway policy revision (10 min)

10:35 — Adjourn
```

### ARB Submission Template

```markdown
## ARB Submission — [Project Name]

**Submission Date:** [Date]
**Project Sponsor:** [Name, Title]
**Lead Architect:** [Name]
**Target ARB Date:** [Date]
**Estimated Spend:** [Amount over 3 years]

### 1. Executive Summary
[One paragraph: what this is, why it is needed, what it replaces or adds]

### 2. Problem Statement
[Business problem being solved; current state pain points]

### 3. Proposed Solution
[Description of the solution; key technology choices]

### 4. Architecture Diagram
[Attach C4 Level 2 or equivalent]

### 5. Integration Map
| System | Integration Type | Data Exchanged | Direction |
|--------|-----------------|----------------|-----------|
| [System A] | REST API | [Data] | Inbound |

### 6. Data Classification
| Data Element | Classification | Stored? | Transmitted? |
|---|---|---|---|
| Customer name | PII | Yes | Yes |

### 7. Security Controls Summary
- Authentication: [e.g., OAuth 2.0 with enterprise IdP]
- Authorization: [e.g., RBAC with AD groups]
- Encryption at rest: [e.g., AES-256]
- Encryption in transit: [e.g., TLS 1.3]
- Vulnerability scanning: [e.g., integrated with Snyk, scans on every PR]

### 8. Non-Functional Requirements
| Requirement | Target | Current Baseline |
|---|---|---|
| Availability | 99.9% | N/A (new) |
| Response time (p95) | < 200ms | N/A |
| RTO | 4 hours | N/A |
| RPO | 1 hour | N/A |

### 9. Vendor Assessment
[New vendor? Summary of vendor assessment results]

### 10. Alternatives Considered
| Option | Why Rejected |
|---|---|
| [Option A] | [Reason] |

### 11. Risks and Mitigations
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| [Risk] | Medium | High | [Mitigation] |

### 12. ARB Questions / Known Concerns
[Any areas where you anticipate questions; proactively surface concerns]
```

---

## Investment Committee

### What It Is

The Investment Committee (IC) governs financial decisions for technology and change investments. Where the ARB asks "is this the right architecture?", the IC asks "is this a sound financial investment?"

!!! note "IC vs ARB: Key Distinction"
    The ARB reviews architectural quality. The IC reviews financial justification, business case, and return on investment. A proposal can have excellent architecture and a poor business case — or vice versa. Both reviews are needed for most major investments.

### Membership

| Role | Responsibility |
|---|---|
| CFO or Finance Director | Financial stewardship, budget authority |
| CIO or CTO | Technology strategy alignment |
| Business Unit Sponsors | Demand validation and benefit ownership |
| Chief Procurement Officer | Vendor commercial terms |
| Program Management Office Lead | Delivery confidence assessment |
| Risk Officer | Financial and operational risk |

### Dollar Thresholds (Typical)

| Investment Level | Threshold | Approval Body |
|---|---|---|
| Operational | < $100K | Department head |
| Tactical | $100K – $500K | CIO / VP Technology |
| Strategic | $500K – $2M | Investment Committee |
| Transformational | $2M+ | IC + Board approval |

!!! warning "Thresholds Vary"
    These thresholds are representative. Every enterprise sets its own. Know your organization's financial authority matrix before building your business case.

### What the IC Looks For

The IC scrutinizes five dimensions:

1. **Strategic alignment**: Does this investment serve the stated corporate strategy for the year?
2. **Financial return**: What is the NPV, IRR, payback period? Are the assumptions defensible?
3. **Delivery confidence**: Can this team actually deliver? What is the track record?
4. **Total cost of ownership**: Does the business case include all costs — licenses, implementation, training, ongoing operations, and decommissioning of replaced systems?
5. **Risk-adjusted return**: How does the return change if the project is 20% over budget? 6 months late?

### How to Present to the IC

```
IC Presentation Structure (20 minutes):

Slide 1: Problem and opportunity (2 min)
  - What is broken or missing? What is the financial impact today?

Slide 2: Proposed investment (2 min)
  - What are we asking to fund? High-level solution summary.

Slide 3: Business case (5 min)
  - Benefits: quantified, named benefit owners, realization timeline
  - Costs: full TCO breakdown, year by year
  - NPV / IRR / payback period
  - Sensitivity analysis (what if key assumptions are 30% wrong?)

Slide 4: Delivery approach (3 min)
  - Who delivers this? What is the timeline?
  - What are the key milestones and decision gates?

Slide 5: Risks (3 min)
  - Top 3-5 risks with financial impact and mitigation

Slide 6: Alternatives (2 min)
  - What did we consider? Why is this the best option?

Slide 7: Ask (3 min)
  - What are we requesting? By when? What happens if delayed?
```

---

## Technology Council

### What It Is

The Technology Council is a strategic body that sets technology direction for the enterprise. It operates above the project level — it does not approve individual projects, but it determines which technologies the enterprise standardizes on, which it is evaluating, and which it is retiring.

### Membership

Typically senior: CTO chair, Chief Architect, domain CTO/VPs from major business units, CISO, Chief Data Officer.

### Cadence and Outputs

The Technology Council typically meets quarterly. Its outputs govern everything that flows through the ARB and IC:

| Output | Description |
|---|---|
| **Approved technology standards** | List of approved platforms, patterns, and vendors for each domain |
| **Technology radar** | Adopted / Trial / Assess / Hold classifications for emerging technologies |
| **Portfolio health assessment** | View of the current technology estate — modern vs. aging vs. end-of-life |
| **Strategic investment priorities** | Which technology capabilities the enterprise is investing in this year |
| **Emerging technology evaluations** | Structured pilots for technologies under assessment (e.g., generative AI, quantum) |

!!! tip "EA Feeds the Technology Council"
    As an EA, you are a primary contributor to the Technology Council. You maintain the technology radar, track portfolio health, and bring emerging technology assessments. Building a trusted relationship with the council chair is one of the most valuable things you can do.

---

## Risk Committee

### How Technology Risks Surface

Technology risks enter enterprise risk management through multiple channels: the ARB raises architecture risks, security reviews surface vulnerability risks, incidents generate operational risks, and the CISO's team maintains the cyber risk register.

The Risk Committee governs the enterprise risk register, sets risk appetite, and escalates material risks to the board.

### Technology Risk Taxonomy

| Risk Category | Examples | Key Controls |
|---|---|---|
| **Operational** | System outages, data loss, process failures | DR/BCP plans, SLA monitoring, incident management |
| **Cyber** | Ransomware, data breach, phishing, insider threat | SIEM, vulnerability management, access controls, training |
| **Vendor** | Vendor insolvency, SLA breach, concentration risk | Vendor due diligence, contract protections, multi-vendor strategy |
| **Data** | Regulatory breach, data quality failure, loss of data sovereignty | Data classification, DLP, retention policies, data quality controls |
| **AI** | Biased model output, unexplainable decisions, training data poisoning | Model governance, bias testing, human oversight, explainability requirements |

### How to Write a Risk Submission

When you identify a technology risk that needs to be elevated to the Risk Committee:

```markdown
## Technology Risk Submission

**Risk ID:** TECH-[YYYY]-[NNN]
**Submitted by:** [Name, Role]
**Date:** [Date]
**Risk Category:** [Operational / Cyber / Vendor / Data / AI]

### Risk Statement
[One sentence: "There is a risk that [event] occurs, resulting in [consequence]"]

### Risk Description
[2-3 paragraphs explaining the risk in detail]

### Likelihood Assessment
[ ] Rare (< 5% probability in 12 months)
[ ] Unlikely (5-25%)
[ ] Possible (25-50%)
[ ] Likely (50-75%)
[ ] Almost certain (> 75%)

### Impact Assessment
[ ] Negligible  [ ] Minor  [ ] Moderate  [ ] Major  [ ] Catastrophic

### Current Controls
[What controls exist today that reduce this risk?]

### Risk Rating (Inherent): [High / Medium / Low]
### Risk Rating (Residual with current controls): [High / Medium / Low]

### Recommended Treatment
[ ] Accept  [ ] Mitigate  [ ] Transfer (insure)  [ ] Avoid

### Proposed Mitigations (if Mitigate selected)
| Action | Owner | Due Date | Expected Risk Reduction |
|---|---|---|---|

### Escalation Trigger
[What event or threshold should cause this risk to be escalated immediately?]
```

---

## Security Review

### The CISO Organization's Role

The Chief Information Security Officer and their team are responsible for defining and enforcing security standards across all technology. The CISO organization is not just an approver — it is a collaborative partner in designing secure solutions.

Security review is not optional. For any solution handling regulated data, internet-facing services, or customer data, security review is a prerequisite for ARB approval.

### When Security Review Is Triggered

| Trigger | Example |
|---|---|
| New internet-facing application | Customer portal, API exposed to partners |
| New data store handling regulated data | PII database, payment records |
| Third-party vendor access to internal systems | SaaS integration, outsourced support |
| Significant change to authentication or access control | Moving to SSO, changing RBAC model |
| AI system processing personal data | Recommendation engine, chatbot with user history |
| Cloud service above defined spend or data sensitivity | Any IaaS/PaaS/SaaS above tier 2 data classification |

### What Security Reviewers Look For

**Data Classification**
- Is all data the system stores or transmits correctly classified?
- Are controls appropriate for the classification level?

**Access Controls**
- Principle of least privilege enforced?
- Multi-factor authentication required for privileged access?
- Service accounts use dedicated credentials, not shared?
- Access reviews scheduled?

**Encryption**
- Data at rest encrypted with approved algorithm (AES-256 minimum)?
- Data in transit encrypted (TLS 1.3 preferred, TLS 1.2 minimum)?
- Key management through enterprise key vault?

**Vulnerability Management**
- Dependency scanning integrated into CI/CD pipeline?
- Container scanning for container-based deployments?
- Penetration test scheduled before go-live for high-risk systems?
- Patch management process defined?

**Logging and Monitoring**
- Security events logged to SIEM?
- Retention period meets policy requirements?
- Alerting configured for critical events?

**Incident Response**
- Security incident response plan documented?
- System owner identified for incident notification?

### Pre-Socialization Strategy

!!! tip "Do Not Surprise the CISO Team"
    The fastest path through security review is to engage the security architecture team early — before you have finalized your design. A 30-minute conversation with a security architect at the start of design will prevent weeks of rework after a security review surfaces issues.

Pre-socialization steps:
1. Schedule a **preliminary security conversation** during the design phase
2. Share your **data flow diagram** and data classification before formal submission
3. Ask: "What are your biggest concerns with this type of solution?" and address them in your design
4. Confirm which **security standards** apply to your specific scenario
5. Submit a **draft security questionnaire** for informal feedback before formal review

---

## Responsible AI Board / AI Ethics Committee

### What It Is and Why It Emerged

The Responsible AI Board (sometimes called AI Ethics Committee, AI Governance Committee, or AI Risk Council) is a governance body that began appearing in large enterprises from 2022-2023. It exists because AI systems create risks that traditional governance bodies are not equipped to assess:

- Algorithmic bias that produces discriminatory outcomes
- Automated decisions affecting people's lives without human review
- Use of personal data in model training without consent
- Opaque model behavior that cannot be explained to regulators
- Reputational risk from AI failures

### Membership

| Role | Perspective |
|---|---|
| Chief AI Officer / Head of AI | AI strategy and capability |
| Chief Data Officer | Data governance and ethics |
| Chief Risk Officer | Enterprise risk alignment |
| Legal / Chief Privacy Officer | Regulatory compliance |
| HR / People Officer | Employee impact, fairness |
| Business Ethics Officer | Corporate values alignment |
| External Ethics Advisor | Independent perspective |

### What the Responsible AI Board Reviews

The board reviews AI use cases, not just AI systems. Every significant AI use case should pass through this governance:

| Review Area | Questions Asked |
|---|---|
| **Use case legitimacy** | Is there a legitimate business purpose? Is AI the appropriate tool? |
| **Model selection** | Is the model appropriate for the task? Are there less intrusive alternatives? |
| **Data usage** | What training data was used? Was consent obtained? Is it representative? |
| **Bias assessment** | Has the model been tested for bias across protected groups? What are the results? |
| **Human oversight** | Are humans in the loop for high-stakes decisions? Can a human override the model? |
| **Explainability** | Can the model's decisions be explained to affected individuals? To regulators? |
| **Data minimization** | Does the model use only the data necessary for the task? |
| **Monitoring** | Is there ongoing monitoring for model drift and bias? |
| **Right of appeal** | Can individuals affected by AI decisions seek review? |

### Responsible AI Checklist

Before presenting an AI use case to the Responsible AI Board, work through this checklist:

**Use Case Definition**
- [ ] Clear articulation of the AI's purpose and the decision it supports or makes
- [ ] Defined scope of automated decisions vs. human-reviewed decisions
- [ ] Documentation of the business case for AI vs. non-AI approaches

**Data Governance**
- [ ] Training data sources documented and approved
- [ ] Data lineage traceable for all training inputs
- [ ] Consent or legitimate interest basis documented for personal data
- [ ] Training data bias assessment completed (demographic representation analysis)
- [ ] Data retention and deletion policy for training data defined

**Model Governance**
- [ ] Model card completed (model purpose, architecture, training approach, known limitations)
- [ ] Performance metrics defined and measured across demographic groups
- [ ] Fairness metrics defined and measured (equal opportunity, demographic parity as appropriate)
- [ ] Model explainability approach documented (SHAP values, LIME, feature importance)
- [ ] Model versioning and reproducibility approach

**Human Oversight**
- [ ] Human-in-the-loop design documented for high-stakes decisions
- [ ] Override mechanism designed and tested
- [ ] Escalation path for edge cases and low-confidence predictions
- [ ] Training for human reviewers completed

**Monitoring and Governance**
- [ ] Model performance monitoring implemented (accuracy, drift, bias metrics)
- [ ] Incident response plan for model failures
- [ ] Regular review cadence defined (quarterly model audits recommended)
- [ ] Feedback loop from business outcomes to model team

**Regulatory and Compliance**
- [ ] Applicable AI regulations assessed (EU AI Act, NIST AI RMF, sector-specific rules)
- [ ] High-risk classification assessment (EU AI Act Article 6 if applicable)
- [ ] Regulatory disclosure obligations documented
- [ ] Privacy impact assessment completed if personal data involved

---

## Executive Steering Committee

### What It Is

The Executive Steering Committee (ESC) provides strategic oversight for a major program or portfolio of programs. Unlike the ARB (technical focus) and IC (financial focus), the ESC focuses on strategic value realization, issue escalation, and organizational alignment.

### Membership

| Role | Responsibility |
|---|---|
| Executive Sponsor (CEO, COO, or Business Unit ELT) | Accountable for program outcomes |
| CIO / CTO | Technology delivery |
| CFO Representative | Financial oversight |
| Business Unit Leaders | Benefit ownership |
| Change Management Lead | Organizational readiness |
| Program Director | Program status reporting |

### The ESC's Role

The ESC does three things:

1. **Strategic oversight**: Ensuring the program continues to serve its original strategic purpose as the business context evolves
2. **Issue escalation**: Receiving and resolving issues that program-level governance cannot resolve — typically resource conflicts, scope disputes, and organizational resistance
3. **Benefit tracking**: Holding benefit owners accountable for realizing the business case

### Steering Committee Agenda Template

```
EXECUTIVE STEERING COMMITTEE — AGENDA
Program: [Program Name]
Date: [Date]
Executive Sponsor: [Name]
Frequency: [Monthly / Quarterly]

1. Approval of previous minutes (5 min)

2. Program health dashboard (10 min)
   - Overall RAG status (Red / Amber / Green)
   - Schedule: % complete vs. plan, key milestones achieved
   - Budget: spend to date vs. plan, forecast to completion
   - Risk summary: top 3 active risks

3. Key decisions required from ESC (15 min)
   [List each decision separately with options and recommendation]
   Decision 1: [Topic] — Recommendation: [Option]
   Decision 2: [Topic] — Recommendation: [Option]

4. Issues requiring ESC escalation (10 min)
   Issue 1: [Description, impact, proposed resolution]
   Issue 2: [Description, impact, proposed resolution]

5. Benefits realization update (10 min)
   - Planned benefits this period: [List]
   - Benefits realized: [List]
   - Variance and explanation

6. Upcoming milestones (5 min)
   - Next 30 days: [Milestones]
   - Next 90 days: [Milestones]

7. Any other business (5 min)

Next meeting: [Date]
```

---

## Portfolio Governance

### Technology Portfolio Review

Portfolio governance moves the conversation from individual projects to the overall technology estate. The question shifts from "should we approve this project?" to "does our current portfolio of systems and investments serve our strategy?"

A technology portfolio review examines:

- **Current estate**: What systems exist? What technology generation? What business capabilities do they serve?
- **Investment distribution**: Are we spending on the right things? (Run vs. Grow vs. Transform budget allocation)
- **Redundancy**: Are multiple systems serving overlapping capabilities?
- **Risk profile**: How much of our estate is on end-of-life technology? What is our exposure?
- **Strategic fit**: Does the portfolio align with the 3-year business strategy?

### Quarterly Portfolio Review Cadence

```
Q1 — Portfolio Health Assessment
  EA team produces technology heat map:
  - Green: modern, well-maintained, strategically aligned
  - Amber: aging, technical debt accumulating, or misaligned
  - Red: end-of-life technology, high risk, or deprecated

Q2 — Investment Alignment Review
  Compare portfolio investment plan to strategic priorities:
  - Are we funding the capabilities that matter most?
  - Are maintenance costs on legacy crowding out strategic investment?

Q3 — Portfolio Rationalization Decisions
  Based on health assessment and investment review:
  - Decisions to consolidate redundant systems
  - End-of-life remediation plans for red-rated systems
  - New capability investments for strategic gaps

Q4 — Annual Planning Input
  Portfolio review findings feed into next year's budget process:
  - Technology debt budget requirements
  - Strategic investment proposals for IC submission
```

### EA's Contribution to Portfolio Governance

Enterprise Architects maintain the authoritative view of the technology portfolio. Your contributions:

- **Application portfolio register**: Complete inventory of applications with technical metadata (technology stack, age, business capability, criticality, owner)
- **Architecture heat map**: Visual representation of portfolio health
- **Dependency maps**: Which applications depend on which platforms — critical for understanding the blast radius of changes
- **Rationalization recommendations**: Data-driven proposals for consolidation, migration, or decommission
- **Technology debt quantification**: Estimated cost and risk of deferred technology decisions

---

## Decision Rights

### RACI Matrix for Technology Governance

Decision rights define who can do what. The RACI model — **R**esponsible, **A**ccountable, **C**onsulted, **I**nformed — is the standard tool.

| Decision | EA | ARB | IC | Tech Council | Risk Cttee | ESC | CISO | RAI Board |
|---|---|---|---|---|---|---|---|---|
| **Approve technology standards** | R | A | I | C | I | I | C | I |
| **Approve architecture for major project** | R | A | I | C | C | I | C | C |
| **Approve investment > $2M** | C | C | A | I | C | R | I | I |
| **Approve investment $500K–$2M** | C | C | A | I | C | I | I | I |
| **Approve investment < $500K** | C | I | I | I | I | I | I | I |
| **Add vendor to approved list** | C | A | I | C | C | I | C | I |
| **Approve AI use case** | C | C | I | C | C | I | C | A |
| **Classify technology risk** | C | C | I | I | A | I | C | I |
| **Decommission system** | R | A | C | I | I | C | I | I |
| **Approve exception to standard** | C | A | I | I | C | I | C | I |

### Escalation Paths

Knowing the escalation path prevents proposals from getting stuck:

```
Level 1 — Project team can decide
  (no governance trigger)

Level 2 — Domain Architect approves
  (minor variation within existing approved architecture)

Level 3 — ARB approval required
  (new vendor, new pattern, integration, regulated data)

Level 4 — ARB + IC approval required
  (> $500K investment)

Level 5 — ARB + IC + ESC alignment required
  (> $2M, strategic program, cross-BU impact)

Level 6 — Board notification / approval
  (> $10M, major transformation, M&A technology integration)
```

!!! tip "Sequence Matters"
    Always get ARB approval before IC approval. The IC will ask "has architecture reviewed this?" If the answer is no, the IC will defer. Sequencing saves weeks.

---

## Governance Anti-Patterns

### Anti-Pattern 1: Death by Committee

**What it looks like**: A proposal requires approval from 8 separate bodies. Each body meets monthly. The process takes 14 months. By the time approval is granted, the market opportunity has passed or the technology has changed.

**Root cause**: Governance has grown organically without design. Every risk event spawned a new committee. No one has ever asked whether the committees are necessary.

**How to address it**: Map all governance bodies and decision rights. Identify overlapping mandates. Propose a consolidation. Many enterprises have successfully merged ARB + Security Review into a single integrated review.

---

### Anti-Pattern 2: Governance Theater

**What it looks like**: The ARB meets, presentations are given, questions are asked, and everything is approved. No submission has ever been rejected. The committee exists but provides no real oversight.

**Root cause**: Governance bodies without the courage or mandate to say no. Often the committee membership includes too many sponsors and not enough independent technical reviewers.

**How to address it**: Introduce binding standards that committee members are required to enforce. Publish decision statistics (approval rate, conditional approval rate, average conditions per submission). Bring in independent technical reviewers with no stake in individual projects.

---

### Anti-Pattern 3: Shadow IT

**What it looks like**: Business units procure SaaS tools on corporate credit cards, bypass IT, and build data pipelines that are invisible to the enterprise. A security audit discovers 300+ unmanaged applications.

**Root cause**: Governance is too slow. Business units wait 6 months for IT approval and solve their own problems instead.

**How to address it**: Introduce a fast-track governance pathway for low-risk SaaS tools (< 4 weeks, self-service assessment). Make the legitimate path faster than the shadow path.

---

### Anti-Pattern 4: Governance Vacuum

**What it looks like**: No one can say who is responsible for a decision. Proposals bounce between executives for months. Important decisions are made informally in hallway conversations with no documentation.

**Root cause**: The organization has never established clear decision rights. Or the documented decision rights are out of date and no one trusts them.

**How to address it**: Publish a decision rights register. For every significant decision type, name the accountable body. Review and update annually.

---

### Anti-Pattern 5: Retrospective Governance

**What it looks like**: The architecture review happens after the vendor is selected and the contract is signed. The IC reviews an investment after the team has already been hired. Governance becomes a rubber stamp because it is too late to change anything.

**Root cause**: Project teams treat governance as a compliance box to check at the end of planning, not a collaborative process during design.

**How to address it**: Embed governance gates into the project delivery framework. Gate 1 (early design) triggers ARB pre-engagement. Gate 2 (vendor selection) triggers formal ARB. Gate 3 (funding approval) triggers IC.

---

### Anti-Pattern 6: HiPPO Governance

**What it looks like**: The Highest Paid Person's Opinion overrides all governance decisions. A senior executive personally champions a vendor, and the ARB approves a submission that clearly conflicts with enterprise standards.

**Root cause**: Governance bodies lack independence. Members feel unable to challenge executive preferences.

**How to address it**: Establish explicit terms of reference that give governance bodies the authority to challenge any submission regardless of seniority of sponsor. Document decisions and rationale. Ensure the CTO or Chief Architect has explicit backing to uphold standards.

---

### Anti-Pattern 7: Standards Without Governance

**What it looks like**: The enterprise has published 200-page architectural standards that no one reads and no one enforces. Projects deviate freely.

**Root cause**: Standards were written without a governance mechanism to enforce them.

**How to address it**: For every standard, define the governance trigger. "Any solution using a new integration pattern must be reviewed by the ARB" creates a linkage between standards and governance.

---

### Anti-Pattern 8: Governance Without Architecture

**What it looks like**: A governance process exists but the reviewers have no shared architectural framework. Different ARB members have different opinions because there are no documented standards to refer to.

**Root cause**: Governance was established before architecture practice matured.

**How to address it**: Build the reference architecture, technology standards, and architectural principles first. Governance enforces what architecture defines.

---

## How to Navigate Governance as an EA

### Build Relationships Before You Need Approvals

The single most effective governance strategy is to have relationships with the key decision-makers before you need their signature on anything.

Practical steps:
- **Attend ARB meetings as an observer** in your first 90 days. Understand what the board cares about.
- **Have coffee with the CISO's architecture team** before your first security review. Understand their top concerns.
- **Meet the CFO's Chief of Staff** before your first IC submission. Learn what the IC has rejected recently and why.
- **Connect with the Risk Officer** to understand the current risk register and how technology risk is viewed.

!!! tip "Governance Is a People Problem"
    Every governance body is made up of people with professional incentives, concerns, and mental models. Understanding those humans is more valuable than memorizing the governance process.

### Pre-Socializing Proposals

Pre-socialization means sharing your proposal informally with key decision-makers before the formal meeting. It prevents surprise, surfaces objections early (when you can still address them), and builds support.

Pre-socialization sequence for a typical major project:

```
Week -8: Brief the Chief Architect informally
  Goal: Confirm architectural direction before detailed design

Week -6: Share draft with CISO architecture team
  Goal: Identify security concerns early; incorporate into design

Week -4: Share ARB submission draft with ARB Chair
  Goal: Confirm completeness; surface any likely objections

Week -3: Brief the business sponsor on IC requirements
  Goal: Ensure business case is prepared correctly

Week -2: ARB submission distributed to members
  Goal: Members read before meeting; not seeing it cold

Week 0: ARB meeting; formal submission presented

Week +1: If conditional approval — address conditions promptly

Week +2: Brief IC Chair / Finance team on business case
  Goal: Pre-socialize financial assumptions; address concerns

Week +3: IC submission distributed to members

Week +5: IC meeting; investment approved

Timeline from initial brief to IC approval: ~3 months
```

### Handling Governance Objections

When a governance body raises an objection, resist the urge to defend immediately. Instead:

1. **Listen fully** — understand the exact concern before responding
2. **Acknowledge the validity** — most objections reflect legitimate concerns
3. **Distinguish clarification needs from substantive issues** — some objections dissolve when you provide more information; others require design changes
4. **Commit to specifics** — if you cannot resolve the objection in the meeting, commit to a specific response by a specific date
5. **Follow up in writing** — document your response; give the reviewer something they can file as evidence the concern was addressed

!!! warning "The Worst Response to a Governance Objection"
    Going around the governance body to an executive who will pressure them to approve. This destroys your credibility with the governance body and creates enemies you will need in the future.

### Sequencing Approvals Correctly

The most common timing mistake is running governance processes in the wrong order:

| Wrong Order | Why It Fails |
|---|---|
| IC before ARB | IC will ask for ARB sign-off; you are sent back |
| Security review after ARB | ARB wants security sign-off; you are deferred |
| Vendor selected before ARB | ARB cannot approve; vendor is already contracted |
| Procurement before IC | Finance will not pay; contract is stranded |

**Correct sequence for a major project:**

1. Engage security team informally (design phase)
2. ARB pre-engagement with Chief Architect
3. Security review formal submission
4. ARB formal submission (includes security sign-off)
5. ARB approval (conditional or full)
6. Address any ARB conditions
7. IC submission (includes ARB approval)
8. IC approval
9. Procurement and contracting
10. ESC kickoff (for strategic programs)

---

## Governance Templates Reference

### Investment Committee Submission Checklist

- [ ] Executive summary (one page)
- [ ] Strategic alignment: which strategic objective does this investment serve?
- [ ] Problem statement: quantified current-state cost or missed opportunity
- [ ] Solution description: what are we funding?
- [ ] Business case
  - [ ] Benefits quantified (hard: cost savings, revenue; soft: productivity, risk reduction)
  - [ ] Named benefit owners who are committing to realization
  - [ ] Benefit realization timeline (when does each benefit accrue?)
  - [ ] Full cost breakdown: one-time and recurring
  - [ ] NPV calculation (5-year horizon minimum)
  - [ ] IRR and payback period
  - [ ] Sensitivity analysis (10%, 20%, 30% variance scenarios)
- [ ] Delivery approach: who delivers? In-house or vendor? What is the track record?
- [ ] Timeline: key milestones and go-live date
- [ ] ARB approval confirmation (reference ARB decision ID)
- [ ] Dependencies: what must be true for this investment to succeed?
- [ ] Top 5 risks with financial impact and mitigation
- [ ] Alternatives considered and comparison
- [ ] Recommended approval and funding profile

---

### RACI for Technology Governance — Quick Reference

```
TECHNOLOGY GOVERNANCE DECISION RIGHTS

DECISIONS                      | EA  | ARB | IC  | TC  | RC  | ESC | CISO | RAI
-------------------------------|-----|-----|-----|-----|-----|-----|------|----
Approve tech standards         |  R  |  A  |  I  |  C  |  I  |  I  |  C   |  I
Approve architecture (major)   |  R  |  A  |  I  |  C  |  C  |  I  |  C   |  C
Approve investment > $2M       |  C  |  C  |  A  |  I  |  C  |  R  |  I   |  I
Approve investment $500K–$2M   |  C  |  C  |  A  |  I  |  C  |  I  |  I   |  I
Add vendor to approved list    |  C  |  A  |  I  |  C  |  C  |  I  |  C   |  I
Approve AI use case            |  C  |  C  |  I  |  C  |  C  |  I  |  C   |  A
Approve exception to standard  |  C  |  A  |  I  |  I  |  C  |  I  |  C   |  I
Decommission system            |  R  |  A  |  C  |  I  |  I  |  C  |  I   |  I

Key: R=Responsible  A=Accountable  C=Consulted  I=Informed
TC=Technology Council  RC=Risk Committee  RAI=Responsible AI Board
```

---

## Realistic Scenario: AI Chatbot Governance Journey

### The Proposal

**Organization**: MegaRetail Corp, a major omnichannel retailer with 40,000 employees and $8B in revenue.

**Proposed investment**: An AI-powered customer service chatbot that handles tier-1 customer enquiries (order status, returns, product questions) autonomously, escalating to human agents when needed. Estimated investment: $3.2M over 3 years. Expected to handle 40% of contact centre volume, reducing headcount costs by $4.2M over 3 years.

---

### Week 1–4: Internal Architecture Work

The lead architect and an EA from the Customer Experience domain begin design. They identify immediately that:

- The chatbot will process customer PII (order history, account details)
- It will integrate with 6 existing systems (OMS, CRM, product catalogue, returns platform, loyalty platform, identity service)
- It involves a new AI vendor (Conversational AI vendor not on approved list)
- It will make automated decisions about return eligibility

**EA action**: Flags this as requiring ARB, IC, Security, CISO, and Responsible AI Board review. Begins stakeholder mapping.

---

### Week 5: CISO Pre-Engagement

The architect schedules a 45-minute session with the Security Architecture team. Key findings:

- PII data means a formal Privacy Impact Assessment is required
- The AI vendor will need to pass a security questionnaire (Cloud Security Alliance CCM)
- Encryption requirements for data in transit to the AI inference endpoint need clarification
- Logging requirements for customer interactions have legal retention implications

**Challenge**: The AI vendor's security questionnaire reveals they store training interaction data in a region outside the company's data residency policy.

**Resolution**: The architect negotiates a contractual amendment with the vendor requiring European data residency for EU customers. This takes 3 weeks.

**Lesson**: Data residency issues are common with AI vendors. Discover them before the contract is signed, not after.

---

### Week 8: Responsible AI Board Pre-Engagement

The Chief Data Scientist and EA meet with the AI Ethics officer. Key concerns raised:

- The chatbot will make automated decisions about return eligibility. Are there appeal mechanisms?
- Has the AI vendor disclosed training data sources? Is there a risk of bias in the model?
- Customer interaction data: is it being used to improve the model? What are the consent implications?
- How will the chatbot handle vulnerable customers (distressed, elderly, those with accessibility needs)?

**Challenge**: The vendor's standard model card does not include bias assessment results.

**Resolution**: The architect requires the vendor to commission an independent bias assessment. The team designs an escalation path for distressed customers (detected via sentiment analysis) to bypass automated handling entirely.

**Lesson**: Responsible AI requirements need to be in vendor contracts. Retrofitting them after contract signature is expensive.

---

### Week 11: ARB Submission

The team submits to the ARB. The submission includes:

- C4 Level 2 architecture diagram
- Integration map (6 systems)
- Data classification (Customer PII — Restricted)
- Security controls summary (CISO pre-engagement documented)
- Bias assessment results (received from vendor Week 10)
- Responsible AI pre-engagement summary

**ARB decision**: **Conditional Approval**

Conditions:
1. Data residency contractual amendment must be executed before go-live (evidence required)
2. Penetration test must be completed before production launch
3. API gateway rate limiting must be implemented on all 6 integration points
4. Logging to enterprise SIEM must be confirmed as implemented

**Timeline to address**: 6 weeks

**Challenge**: Condition 3 (API gateway rate limiting) requires infrastructure work that was not in the project plan, adding 3 weeks to the delivery schedule.

**Resolution**: The program manager updates the plan. The business sponsor accepts the timeline extension to maintain standards compliance.

---

### Week 14: IC Submission

With ARB conditional approval in hand (conditions tracked; most completed or in progress), the team submits to the IC.

**Business case summary:**
- Investment: $3.2M over 3 years
- Benefits: $4.2M cost reduction + $600K in customer satisfaction improvements (NPS-linked revenue)
- NPV (5 year): $2.1M
- Payback period: 28 months

**IC challenge**: The Finance Director questions whether the headcount reduction is a real saving or "paper savings" (headcount moved not reduced).

**Resolution**: The HR director and Contact Centre VP commit to specific headcount reduction targets (not redeployment) as a formal benefit commitment. This is documented in the IC minutes and tracked quarterly.

**IC decision**: **Approved**, with quarterly benefits tracking required and ESC oversight given the $3.2M investment.

**Timeline from ARB submission to IC approval**: 5 weeks

---

### Week 16: Executive Steering Committee Kickoff

The ESC is constituted with the Chief Customer Officer as executive sponsor. First meeting establishes:

- Quarterly benefits reporting cadence
- Escalation path for integration delays (Contact Centre VP)
- 90-day decision point: if pilot results are below target accuracy (85% containment rate), ESC to decide on expand / pause / stop

---

### Week 40: Go-Live

The chatbot launches. Key governance checkpoints cleared:

- [ ] ARB conditions all evidenced and signed off
- [ ] Security penetration test completed (2 medium-severity findings remediated)
- [ ] Privacy Impact Assessment completed and filed
- [ ] Data residency contract amendment executed
- [ ] SIEM logging confirmed
- [ ] Responsible AI monitoring dashboard live
- [ ] Human escalation paths tested
- [ ] ESC informed

**Final timeline from first architecture session to go-live: 40 weeks (~10 months)**

**Commentary**: A complex AI project with PII data, 6 integrations, and a new vendor taking 10 months to clear full governance is reasonable. Poor governance navigation (wrong sequencing, surprised committees, missed pre-engagement) could have added 6–12 months.

---

## 5 Teaching Lenses

### Lens 1: Beginner

Governance feels intimidating when you first encounter it. Start with one mental model: **every governance body answers one question**.

- ARB asks: "Is this architecture sound?"
- IC asks: "Is this investment justified?"
- Risk Committee asks: "What could go wrong?"
- CISO asks: "Is this secure?"
- Responsible AI Board asks: "Is this AI ethical?"

Walk into any governance meeting knowing which question that body is trying to answer, and you will know what to prepare.

---

### Lens 2: Enterprise

Large enterprises have complex governance because they have complex systems, large financial stakes, and many stakeholders with legitimate competing interests. Governance is how large organizations make decisions without requiring the CEO to approve every choice.

The EA's job in this context is to ensure that governance serves strategy — not bureaucracy for its own sake. When governance slows things down unnecessarily, the EA should be the person proposing how to improve it.

---

### Lens 3: Architecture

Architecture governance has a specific function: ensuring that individual project decisions accumulate into a coherent enterprise architecture rather than a sprawling mess of incompatible components. Every ARB submission is an opportunity to enforce the target state architecture and move the portfolio in the right direction.

When an ARB rejects a non-compliant submission, it is doing architecture work as much as governance work.

---

### Lens 4: Executive

Executives see governance as a tool for accountability and value realization. When an executive sponsor stands up in an IC and commits to specific benefit targets, they are creating accountability. Governance bodies are how the organization holds leaders accountable for the promises they make when seeking investment.

The EA who understands this frames proposals in terms of strategic value and accountability — not technical specifications.

---

### Lens 5: Consultant

External consultants need to learn client governance structures within the first two weeks of an engagement. The governance map tells you:

- Who makes decisions (and whose opinion matters)
- What the timelines will be (and how to set client expectations accordingly)
- Where the political fault lines are (which bodies conflict with each other)
- How to accelerate delivery (by knowing which governance steps to initiate in parallel)

Experienced consultants build governance navigation into their project plans from day one.

---

## Common Mistakes

### 1. Submitting to the ARB Without Pre-Engagement

Walking into the ARB meeting cold — without having spoken to the Chair, security team, or any members beforehand — is the most common mistake. It results in deferred submissions and wasted cycles.

### 2. Treating Security Review as an Afterthought

Submitting an ARB package without CISO review is the fastest way to get deferred. Security review should begin during design, not after it.

### 3. Confusing the ARB and IC Roles

Presenting financial ROI data to the ARB or architecture diagrams to the IC. Each body has a specific question to answer. Align your content to that question.

### 4. Underestimating Benefits in the IC Submission

IC members are skeptical of benefit claims. Business cases that claim benefits without named owners and committed timelines are dismissed as "hockey stick projections."

### 5. Going Around Governance to Senior Sponsors

Bypassing a governance body by getting a senior executive to override the decision. This destroys your credibility with the governance body and rarely produces a durable outcome.

### 6. Ignoring the Responsible AI Dimension

Submitting an AI proposal to the ARB and IC without engaging the Responsible AI Board (or equivalent). Increasingly, this results in delayed approvals as more enterprises require RAI sign-off.

### 7. Wrong Sequencing

Getting IC approval before ARB. The IC will defer to ARB. Getting security review after ARB. ARB will defer to security. Know the sequence and run it correctly.

### 8. Presenting to Governance Without a Recommendation

Walking into an ARB or IC without a clear recommendation. Governance bodies make better decisions when the presenter has a clear view and can defend it.

### 9. Treating Conditional Approval as Rejection

Conditional approval is the normal outcome for a first submission. Architects who treat it as failure and escalate are misunderstanding how governance works.

### 10. Not Maintaining the Conditions Register

Receiving a conditional approval and then failing to track and close the conditions. Six months later, the conditions are still open, and the project is in limbo.

---

## Mastery Checklist

Use this checklist to assess your governance competency as an enterprise architect.

### Foundational Understanding
- [ ] I can explain the difference between the ARB, IC, Technology Council, and Risk Committee to a non-technical business stakeholder
- [ ] I know the dollar approval thresholds for my organization's governance bodies
- [ ] I can describe the four ARB decision types and what each means for a project
- [ ] I understand why governance sequence matters and can state the correct sequence for a major investment

### Preparation and Process
- [ ] I can prepare a complete ARB submission from scratch using the checklist in this module
- [ ] I can write a business case for an IC submission, including NPV, IRR, and sensitivity analysis
- [ ] I can complete a Responsible AI checklist for an AI use case
- [ ] I can write a technology risk submission for the Risk Committee

### Relationships and Navigation
- [ ] I have a working relationship with the ARB chair and can have informal conversations about submissions in progress
- [ ] I know the CISO's top 3 security concerns for my organization's current technology portfolio
- [ ] I can name the members of the Investment Committee and understand each member's primary concerns
- [ ] I have attended at least one ARB meeting as an observer and understand how decisions are actually made in that room

### Pre-Socialization
- [ ] I habitually pre-socialize major submissions with key stakeholders before formal submission
- [ ] I can identify likely objections to a proposal before submitting and address them proactively
- [ ] I know how to handle a governance objection constructively without becoming defensive

### Advanced Practice
- [ ] I can design a governance pathway for a complex AI investment, identifying every body that needs to review it and the correct sequence
- [ ] I can identify at least 3 governance anti-patterns and explain how to address each
- [ ] I can maintain a conditions register and drive ARB conditional approvals to closure
- [ ] I can prepare a Steering Committee agenda and RAG status report for an executive audience
- [ ] I can contribute to portfolio rationalization discussions with quantified data about portfolio health
- [ ] I can identify when governance is creating unnecessary drag and propose improvements to the process

---

!!! note "Module Summary"
    Enterprise governance is a system of decision rights and oversight that exists to prevent technology sprawl, duplicate investments, and accountability gaps. As an enterprise architect, you work with — not around — governance. The architects who deliver the most value are those who navigate governance efficiently: building relationships before they need approvals, pre-socializing proposals, sequencing reviews correctly, and treating governance bodies as collaborative partners rather than obstacles.

    The complete governance journey for a major AI investment at a large enterprise takes 6–12 months when done well. It takes longer when done poorly. The time you invest in understanding and navigating governance is returned many times over in projects that get funded, approved, and delivered.

<!-- AUTO-DOCS-START -->
<!-- AUTO-DOCS-END -->
