---
title: "Vol 3 — Portfolio Management & Enterprise Governance"
date: 2026-07-15
date_created: 2026-07-15
last_reviewed: 2026-07-15
status: current
source_type: native-md
source_file: ""
tags: ["portfolio-management", "PMO", "program-management", "investment-planning", "enterprise-governance", "OKR", "benefits-realization"]
doc_type: handbook-volume
series_name: Enterprise Strategy & Business Architecture Handbook
series_part: 3
series_total: 5
---

# Vol 3 — Portfolio Management & Enterprise Governance

> **Covers:** The full portfolio management lifecycle — from initiative identification through benefits realization — plus enterprise governance models, decision rights, and steering structures. Written for PMO leads, Program Managers, CFOs, and Enterprise Architects who must translate strategy into governed delivery.

---

## Part 1 — Portfolio Management Fundamentals

### 1.1 What Is Portfolio Management?

**Portfolio Management** is the centralized management of an organization's strategic investments — initiatives, programs, and projects — to maximize collective value delivered against strategic objectives.

Portfolio management asks: *"Are we doing the right things?"*
Program management asks: *"Are we doing things right?"*
Project management asks: *"Are we doing things well?"*

```
PORTFOLIO HIERARCHY

ENTERPRISE PORTFOLIO (All strategic investments)
    │
    ├── PORTFOLIO A: Digital Transformation
    │       ├── Program 1: Cloud Migration
    │       │       ├── Project 1.1: Core Banking Lift-and-Shift
    │       │       ├── Project 1.2: Data Migration
    │       │       └── Project 1.3: Network Redesign
    │       │
    │       └── Program 2: Digital Customer Experience
    │               ├── Project 2.1: Mobile App Redesign
    │               └── Project 2.2: API Layer
    │
    └── PORTFOLIO B: AI & Analytics
            ├── Program 1: AI Credit Engine
            └── Program 2: AI Customer Service
```

### 1.2 Portfolio Management vs. Project Management (PMI)

| Dimension | Portfolio | Program | Project |
|-----------|-----------|---------|---------|
| **Focus** | Strategic value and alignment | Benefits realization | Deliverables |
| **Question** | Are we doing the right things? | Are we doing things right? | Are we doing things well? |
| **Horizon** | Multi-year, ongoing | 1–5 years | 3–18 months |
| **Success metric** | Strategic objectives achieved | Benefits delivered | On time, on budget, in scope |
| **Change handling** | Actively reallocates across investments | Manages changes within scope | Resists scope change |
| **Governance** | Portfolio Review Board | Program Steering Committee | Project Sponsor |
| **PMI Standard** | Standard for Portfolio Management | Standard for Program Management | PMBOK |

### 1.3 Portfolio Categories (Run / Grow / Transform)

**The Three-Bucket Model** is the most common enterprise portfolio classification:

```
PORTFOLIO BUCKETS

RUN (Keep the lights on)
├── Mandatory: Regulatory, compliance, security, audit
├── Maintenance: Technical debt, system patches, support
└── Operations: Infrastructure, licenses, SaaS subscriptions
Typical investment: 40–60% of IT budget

GROW (Enhance existing capabilities)
├── Customer experience improvements
├── Process optimization and automation
├── Incremental product enhancements
└── Analytics and reporting upgrades
Typical investment: 25–35% of IT budget

TRANSFORM (Build the future)
├── New business models
├── Cloud migration and modernization
├── AI platform and capabilities
└── New digital products
Typical investment: 15–25% of IT budget
```

**Portfolio Rebalancing:**
Most large enterprises are over-invested in RUN and under-invested in TRANSFORM. Mature portfolio governance actively shifts the ratio toward growth and transformation over time.

---

## Part 2 — Investment Planning and Business Case

### 2.1 Investment Planning Process

**Investment Planning** is the annual cycle of identifying, evaluating, prioritizing, and funding strategic initiatives.

**Investment Planning Calendar:**

```
INVESTMENT PLANNING CALENDAR

Q3 (July–September): DEMAND GATHERING
│ Business units submit investment proposals
│ EA assesses technical feasibility
│ Finance validates financial assumptions
│
Q3-Q4 (September–October): EVALUATION & SCORING
│ Each proposal scored against strategic criteria
│ Dependencies analyzed
│ Portfolio balance assessed (Run/Grow/Transform)
│
Q4 (October–November): PRIORITIZATION
│ Portfolio Review Board debates trade-offs
│ Resources matched to prioritized initiatives
│ Low-priority items deferred or rejected
│
Q4 (November–December): APPROVAL & BUDGET
│ Executive sign-off on approved portfolio
│ Budget committed for approved work
│ Remaining items return to backlog
│
Q1 (January–March): MOBILIZATION
│ Programs and projects initiated
│ Governance cadence established
│ Baseline metrics set for benefits tracking
```

### 2.2 Business Case Structure

A **Business Case** is the documented justification for an investment — the formal argument that a proposed initiative will deliver value that exceeds its costs and risks.

**The Five Cases Model (HM Treasury, UK Green Book):**

```
THE FIVE CASES MODEL

1. STRATEGIC CASE
   Does this initiative align with our strategy and solve a real problem?
   • Problem statement
   • Strategic fit (link to objectives/themes)
   • Options considered
   • Recommended option and rationale

2. ECONOMIC CASE
   Is this the best use of money, even accounting for risk?
   • Cost-Benefit Analysis (CBA)
   • Net Present Value (NPV)
   • Internal Rate of Return (IRR)
   • Payback period
   • Risk-adjusted scenarios

3. COMMERCIAL CASE
   Is the procurement approach sound?
   • Build vs. Buy vs. Partner analysis
   • Vendor selection approach
   • Commercial risks and mitigations

4. FINANCIAL CASE
   Is it affordable and does it fit within budgeting constraints?
   • CapEx / OpEx breakdown
   • Funding source
   • Cash flow profile
   • Impact on run costs

5. MANAGEMENT CASE
   Can we actually deliver this?
   • Delivery approach
   • Governance structure
   • Risks and dependencies
   • Benefits realization plan
```

### 2.3 Financial Analysis for Business Cases

**Net Present Value (NPV):**
The sum of all discounted future cash flows minus initial investment.
- NPV > 0: Initiative creates value
- NPV < 0: Initiative destroys value

```
NPV Formula:
NPV = -Initial Investment + Σ [Cash Flow_t / (1 + Discount Rate)^t]

Example:
Initial Investment: $2M
Annual benefit: $800K for 5 years
Discount rate: 10%

NPV = -$2M + ($800K/1.1) + ($800K/1.21) + ($800K/1.33) + ($800K/1.46) + ($800K/1.61)
    = -$2M + $727K + $661K + $601K + $547K + $497K
    = -$2M + $3.03M
    = $1.03M  (NPV positive → recommend approval)
```

**Return on Investment (ROI):**
```
ROI = (Net Benefit / Total Cost) × 100
    = (($800K × 5) - $2M) / $2M × 100
    = $2M / $2M × 100
    = 100% ROI over 5 years
```

**Payback Period:**
```
Payback Period = Initial Investment / Annual Cash Flow
              = $2M / $800K
              = 2.5 years
```

### 2.4 Prioritization Models

**Weighted Scoring Model:**

Score each initiative against weighted criteria:

| Criterion | Weight | Initiative A | Initiative B | Initiative C |
|-----------|--------|-------------|-------------|-------------|
| Strategic alignment | 30% | 9 | 7 | 5 |
| Financial return (NPV) | 25% | 8 | 9 | 6 |
| Delivery risk | 20% | 7 | 5 | 8 |
| Customer impact | 15% | 9 | 6 | 7 |
| Time to value | 10% | 6 | 8 | 9 |
| **Weighted Score** | **100%** | **8.05** | **6.95** | **6.35** |

**MoSCoW Prioritization:**
- **Must Have**: Non-negotiable; initiative fails without it
- **Should Have**: High value but not critical to launch
- **Could Have**: Nice to have, if capacity allows
- **Won't Have**: Explicitly deferred to future

**Cost of Delay (CoD) / WSJF:**
Weighted Shortest Job First (WSJF) is SAFe's prioritization formula:
```
WSJF = Cost of Delay / Job Duration
Cost of Delay = User-Business Value + Time Criticality + Risk Reduction / Opportunity Enablement
```

---

## Part 3 — Program Management

### 3.1 Program Definition and Purpose

A **Program** is a group of related projects managed in a coordinated way to obtain benefits and control not available from managing them individually. Programs have defined lifecycles, explicit benefit realization plans, and dedicated governance.

**When to Use a Program (vs. a Project):**

Use a Program when:
- Multiple workstreams must be coordinated to achieve a shared outcome
- Benefits emerge from the combination of workstreams, not individual projects
- The scope will evolve over time as understanding improves
- Organization change management is a significant component
- Duration exceeds 18–24 months

### 3.2 Program Governance Structure

```
PROGRAM GOVERNANCE STRUCTURE

PROGRAM STEERING COMMITTEE (PSC)
│ Composition: Sponsor (Chair), Business Owner, IT Lead, Finance, HR
│ Cadence: Monthly
│ Decisions: Scope changes >$100K, milestone approval, escalations
│
├── PROGRAM MANAGEMENT OFFICE (PMO)
│   │ Composition: Program Manager, BA Lead, Change Manager
│   │ Cadence: Weekly reporting
│   │ Role: Coordination, reporting, risk management, assurance
│   │
│   ├── PROJECT TEAM A (Cloud Migration)
│   │   Project Manager + Squad
│   │
│   ├── PROJECT TEAM B (Data Migration)
│   │   Project Manager + Squad
│   │
│   └── PROJECT TEAM C (Digital Experience)
│       Product Owner + Squad
│
└── CHANGE MANAGEMENT TEAM
    Dedicated change manager + communications lead
```

### 3.3 Benefits Realization

**Benefits Realization Management (BRM)** is the practice of defining, tracking, and confirming that the benefits committed to in the business case are actually achieved after the program delivers.

**Benefits Realization Plan Structure:**

| Benefit | Measure | Baseline | Target | Realization Date | Owner |
|---------|---------|---------|--------|-----------------|-------|
| Reduced loan processing time | Days per application | 14 days | 2 hours | Q4 2027 | Head of Lending |
| Improved customer satisfaction | NPS Score | 32 | 55 | Q2 2027 | CX Director |
| Cost reduction | $ per loan processed | $180 | $45 | Q4 2027 | CFO |
| Digital adoption | % apps via digital channel | 20% | 80% | Q3 2027 | Digital Director |

**Benefits Types:**

| Type | Description | Measurement |
|------|-------------|------------|
| **Financial** | Direct cash savings or revenue | $ savings, ROI, NPV |
| **Efficiency** | Process speed or quality improvement | Time, error rate, FTE hours |
| **Customer** | Improved customer outcomes | NPS, CSAT, retention |
| **Risk** | Reduced exposure or improved compliance | Risk score, incidents |
| **Strategic** | Positioning for future advantage | Market share, capability maturity |

---

## Part 4 — PMO Models and Transformation Office

### 4.1 PMO Types

| PMO Type | Role | Authority | Best For |
|----------|------|-----------|---------|
| **Supportive PMO** | Templates, training, tools | Low — advisory only | Organizations with mature delivery teams |
| **Controlling PMO** | Standards, governance, audit | Medium — compliance required | Regulated, risk-aware organizations |
| **Directive PMO** | Runs projects directly | High — owns delivery | Centralized delivery, consistent approaches |
| **Strategic PMO** | Portfolio governance, strategy execution | Very High — investment decisions | Strategy execution offices, C-suite |

### 4.2 Enterprise Portfolio Management Office (EPMO)

The **Enterprise PMO (EPMO)** operates at the corporate level to:
- Govern the enterprise portfolio (all strategic investments)
- Coordinate cross-program dependencies
- Maintain the strategic roadmap
- Track benefits realization
- Report portfolio health to the Board and C-Suite

**EPMO Cadence:**

| Forum | Frequency | Participants | Agenda |
|-------|-----------|-------------|--------|
| Portfolio Review Board | Monthly | C-Suite, EPMO | Portfolio health, investment decisions |
| Program Status Reviews | Bi-weekly | Program Managers, EPMO | RAG status, risks, escalations |
| Benefits Review | Quarterly | Business owners, Finance | Benefits tracking vs. plan |
| Strategic Planning | Annual | Board, CEO, C-Suite | Portfolio refresh, investment allocation |

### 4.3 Transformation Office

A **Transformation Office** (or Chief Transformation Officer function) is a senior leadership structure specifically designed to lead large-scale enterprise transformation programs — digital, AI, or operating model change.

**Transformation Office vs. PMO:**

| Dimension | PMO | Transformation Office |
|-----------|-----|-----------------------|
| **Focus** | Project/program delivery | Enterprise-wide change |
| **Scope** | Individual programs | Cross-enterprise transformation |
| **Authority** | Governance, standards | Direct executive leadership |
| **Horizon** | Duration of programs | 3–5 year transformation |
| **Mandate** | Delivery excellence | Change outcomes + culture shift |

---

## Part 5 — Agile Portfolio Management

### 5.1 Lean Portfolio Management (SAFe)

**Lean Portfolio Management (LPM)** is the SAFe approach to connecting strategy to execution through value streams, decentralized funding, and continuous prioritization.

**LPM Three Core Competencies:**

```
LEAN PORTFOLIO MANAGEMENT

1. STRATEGY & INVESTMENT FUNDING
   ├── Portfolio Vision: Strategic objectives for each portfolio
   ├── Portfolio Canvas: Vision, key measures, strategic themes
   ├── Lean Budget Guardrails: Spending parameters per value stream
   └── Portfolio Backlog: Epics awaiting prioritization

2. AGILE PORTFOLIO OPERATIONS
   ├── Coordinating Value Streams: Dependencies, integration
   ├── Tracking Portfolio Flow: Throughput, WIP limits
   └── Realizing PI Objectives: ART-level delivery metrics

3. LEAN GOVERNANCE
   ├── Forecasting and Budgeting: Rolling-wave financial planning
   ├── Measuring Portfolio Performance: OKRs, KPIs
   ├── Coordinating Continuous Compliance: Regulatory guardrails
   └── Agile Contracts: Milestone-based, outcome-focused
```

### 5.2 SAFe Portfolio Hierarchy

```
SAFE PORTFOLIO HIERARCHY

STRATEGY
    │
    ▼
PORTFOLIO (Business outcome hypothesis)
    │
    ▼
EPIC (Large capability hypothesis, 2–6 months)
    │
    ├── FEATURE (Tangible customer benefit, per PI cycle)
    │       │
    │       ├── USER STORY (Implementable requirement, per sprint)
    │       │       │
    │       │       └── TASK (Technical task, hours)
    │       │
    │       └── ENABLER STORY (Technical enabler)
    │
    └── ENABLER EPIC (Technical infrastructure epic)
```

### 5.3 Epic vs. Feature vs. Story

| Concept | Definition | Duration | Owner |
|---------|-----------|---------|-------|
| **Portfolio Epic** | Large cross-ART capability initiative | 3–6+ months | Business Owner + EA |
| **Feature** | User-visible functionality delivered in one PI | 8–12 weeks | Product Manager |
| **User Story** | Small, deliverable increment of value | 1–2 weeks | Product Owner |
| **Task** | Technical work item | Hours–days | Engineer |
| **Spike** | Research or exploration activity | 1–5 days | Engineer |
| **Enabler** | Technical work enabling future features | Varies | System Architect |

### 5.4 Funding Models: Project vs. Product

**Traditional Project Funding:**
```
TRADITIONAL (Project-based)
Project approved → Budget allocated for project duration → Project closes → Team dispersed
Problem: Stops and starts, knowledge lost, slow to respond to change
```

**Modern Product Funding:**
```
MODERN (Product/Value Stream-based)
Value Stream funded annually → Stable team owns end-to-end → Continuous delivery
Benefit: Stable teams, faster delivery, retained knowledge, aligned to strategy
```

**Lean Budget Guardrails (SAFe):**
- 20–30% discretionary spend within ART (no central approval needed)
- 30–50% requiring LPM review for re-allocation
- 50%+ requiring Portfolio Review Board decision

---

## Part 6 — Enterprise Governance

### 6.1 What Is Enterprise Governance?

**Enterprise Governance** is the system of accountability, decision rights, processes, and oversight that ensures the organization acts in accordance with its stated values, legal obligations, risk appetite, and strategic objectives.

Governance answers: *"How do we make decisions, who is accountable, and how do we ensure those decisions are sound?"*

**Governance Pyramid:**

```
GOVERNANCE PYRAMID

BOARD LEVEL
"Are we doing the right things?"
(Fiduciary, strategic, compliance)

C-SUITE LEVEL
"Are we achieving our strategic objectives?"
(Portfolio, investment, risk)

ARCHITECTURE LEVEL
"Are our technology decisions sound?"
(Standards, patterns, ARB)

PROGRAM LEVEL
"Are we delivering programs effectively?"
(Scope, schedule, budget, risk)

PROJECT LEVEL
"Are we executing projects correctly?"
(Task completion, quality, reporting)
```

### 6.2 Decision Rights Framework (RACI Extended)

**RACI** is the standard for defining who is responsible for what:

| Letter | Role | Description |
|--------|------|-------------|
| **R** | Responsible | The person who does the work. One R per task. |
| **A** | Accountable | The person ultimately answerable. Signs off. One A per task. |
| **C** | Consulted | Subject matter experts who provide input. Two-way communication. |
| **I** | Informed | Stakeholders kept up to date. One-way communication. |

**Extended versions:**
- **RACI-VS**: Adds Verifier (checks quality) and Signatory (legal sign-off)
- **DACI**: Driver, Approver, Contributor, Informed — used in consulting and product teams

**Decision Rights Framework:**

| Decision Category | Who Decides | Who Approves | Who Advises |
|------------------|-------------|-------------|------------|
| Strategic investment > $5M | CEO + Board | Board | CFO, CTO, EPMO |
| Strategic investment $1–5M | C-Suite | CEO | Portfolio Review Board |
| Technology platform selection | CTO | CEO | EA, CISO, COO |
| Architecture standards | Chief Architect | CTO | ARB |
| Vendor contracts > $1M | CPO | CFO | Legal, IT |
| Hire (senior leader) | CHRO | CEO | Business sponsor |

### 6.3 Governance Forums and Committees

**Architecture Review Board (ARB):**
Reviews technology and architecture decisions against enterprise standards.
- Participants: Chief Architect, Domain Architects, CTO
- Cadence: Bi-weekly or monthly
- Decisions: Approve, reject, or condition architecture proposals

**Portfolio Review Board (PRB):**
Governs the enterprise investment portfolio.
- Participants: CEO, CFO, CTO, Business Unit Leaders, EPMO
- Cadence: Monthly
- Decisions: Approve investments, reallocate resources, retire programs

**Risk Committee:**
Oversees enterprise risk, including technology and AI risk.
- Participants: CRO, CISO, CFO, Legal, COO
- Cadence: Monthly
- Decisions: Risk tolerance, risk remediation plans

**AI Governance Board:**
Oversight of AI use, responsible AI, and AI risk.
- Participants: AI CoE Lead, CISO, Legal, Compliance, Business Owners
- Cadence: Monthly
- Decisions: AI use case approval, model governance, AI incident response

**Steering Committee (Program-level):**
Governs individual programs and major projects.
- Participants: Executive Sponsor, Business Owner, IT Lead, PMO
- Cadence: Monthly
- Decisions: Scope changes, major risks, milestone approval

### 6.4 Governance Models: Centralized vs. Federated

| Model | Description | Advantage | Disadvantage |
|-------|-------------|-----------|-------------|
| **Centralized** | All decisions approved by central governance body | Consistency, standards | Bottleneck, slow, frustrating |
| **Federated** | Central standards with local decision-making | Speed, business agility | Potential inconsistency |
| **Anarchic** | No central governance; all decisions local | Maximum speed | Technology sprawl, no standards |
| **Governed Federation** | Clear guardrails + local autonomy within rails | Best of both | Requires mature culture |

**Modern Best Practice (2026): Governed Federation**
- Enterprise publishes hard standards (security, data, API design)
- Business units choose how to implement within those standards
- ARB reviews decisions above a defined threshold
- Teams self-serve below the threshold using pre-approved patterns

### 6.5 Technology Governance

**Technology Governance** is the subset of enterprise governance that oversees technology investment, architecture decisions, vendor management, and technical standards.

**Key Technology Governance Policies:**

| Policy Area | What It Governs |
|-------------|----------------|
| **Architecture Standards** | Approved patterns, platforms, and integration approaches |
| **Technology Radar** | Adopt / Trial / Assess / Hold status per technology |
| **Vendor Governance** | Approved vendor list, single/multi-vendor rules, concentration risk |
| **Open Source** | Approved licenses, contribution policy, vulnerability scanning |
| **API Standards** | Design guidelines, versioning, security, documentation |
| **Data Governance** | Data ownership, quality standards, access controls |
| **Security Baseline** | Minimum security controls for all systems |

---

## Part 7 — AI Governance (Deep Dive)

### 7.1 Why AI Governance Is Different

Traditional IT governance is insufficient for AI because:

1. **Non-deterministic outputs** — Same input, different output each time
2. **Explainability gap** — Black-box models cannot explain decisions (critical for credit, healthcare)
3. **Bias risk** — Models trained on historical data perpetuate historical bias
4. **Drift** — Model performance degrades over time as world changes
5. **Adversarial risk** — Models can be manipulated with adversarial inputs
6. **Agentic autonomy** — AI agents can take real-world actions; errors have real consequences
7. **Regulatory exposure** — EU AI Act, FDA AI/ML, banking AI regulations impose obligations

### 7.2 AI Governance Framework

```
AI GOVERNANCE FRAMEWORK

STRATEGIC GOVERNANCE
├── AI Strategy alignment with enterprise strategy
├── AI use case portfolio review and approval
├── AI investment governance (build/buy/partner decisions)
└── AI performance against strategic objectives

RISK & COMPLIANCE GOVERNANCE
├── AI Risk Assessment (per model)
├── Model Risk Management
├── Regulatory compliance (EU AI Act, sector-specific)
├── Third-party AI governance (vendor AI)
└── AI audit and assurance

OPERATIONAL GOVERNANCE
├── MLOps / LLMOps / AgentOps standards
├── Model lifecycle management
├── Data governance for AI (training data quality, lineage)
├── Prompt governance (for LLM/GenAI)
└── Incident response for AI failures

ETHICS & RESPONSIBLE AI
├── Fairness and bias assessment
├── Explainability standards
├── Human-in-the-loop requirements
├── Transparency and disclosure
└── Privacy and data rights
```

### 7.3 AI Risk Register

Every AI use case should maintain a risk register:

| Risk Category | Risk | Likelihood | Impact | Mitigation |
|--------------|------|-----------|--------|-----------|
| **Accuracy** | Model misclassifies credit risk | Medium | High | Threshold review, human escalation |
| **Bias** | Model discriminates by race in lending | Low | Very High | Bias testing, protected class monitoring |
| **Security** | Prompt injection attack on customer-facing agent | Medium | High | Input filtering, output validation |
| **Compliance** | EU AI Act Article 6 high-risk classification | High | High | Conformity assessment, documentation |
| **Drift** | Model accuracy degrades over 6 months | High | Medium | Monthly drift monitoring, retraining trigger |
| **Hallucination** | Agent provides incorrect medical advice | Medium | Very High | Grounding, fact-checking, HITL |

### 7.4 AI Governance Maturity

| Level | Name | Characteristics |
|-------|------|----------------|
| 1 | **Ad Hoc** | No AI governance; teams do what they want |
| 2 | **Developing** | Some policies exist; inconsistently followed |
| 3 | **Defined** | AI governance framework; risk register; approval process |
| 4 | **Managed** | AI governance quantitatively tracked; compliance monitored |
| 5 | **Optimizing** | Continuous AI governance improvement; industry-leading responsible AI |

---

## Part 8 — Portfolio Reporting and Metrics

### 8.1 Portfolio Health Dashboard

```
PORTFOLIO HEALTH DASHBOARD — Key Indicators

OVERALL PORTFOLIO STATUS: AMBER ⚠️

INVESTMENT BREAKDOWN:        STRATEGIC ALIGNMENT:
Run:       52% ($52M)        Strong: 62% of initiatives
Grow:      30% ($30M)        Moderate: 28%
Transform: 18% ($18M)        Weak: 10% ← ACTION NEEDED

PORTFOLIO RAG STATUS:         BENEFITS REALIZATION:
🟢 Green: 14 initiatives (47%) On track: 65%
🟡 Amber: 11 initiatives (37%) At risk: 25%
🔴 Red:    5 initiatives (17%) Behind: 10%

TOP RISKS:                    DEPENDENCIES AT RISK:
1. Cloud migration 3-month delay → 3 downstream programs affected
2. AI talent shortage → 4 AI initiatives understaffed
3. Regulatory change → 2 compliance programs need rescoping
```

### 8.2 Key Portfolio Metrics

| Metric | Definition | Formula | Target |
|--------|-----------|---------|--------|
| **Portfolio ROI** | Return across all investments | (Total Benefits − Total Cost) / Total Cost | > 150% |
| **Strategic Alignment Score** | % of portfolio aligned to strategy | Aligned Initiatives / Total × 100 | > 80% |
| **Benefits Realization Rate** | % of planned benefits actually achieved | Realized Benefits / Planned Benefits × 100 | > 75% |
| **Portfolio Velocity** | Rate of value delivery | Benefits delivered per quarter | Improving trend |
| **Time to Value** | Average time from approval to first value | Approval date to first benefit measurement | Decreasing trend |
| **Initiative Success Rate** | % completing on time, on budget, on scope | Successful / Total completed × 100 | > 70% |

---

## Part 9 — Enterprise Deliverables: Portfolio & Governance

### 9.1 Key Deliverables by Role

| Role | Key Deliverables | Consumed By |
|------|----------------|------------|
| **EPMO** | Portfolio dashboard, investment register, benefits report | CEO, Board, Finance |
| **Program Manager** | Program charter, status report, risk register, benefits plan | PSC, EPMO |
| **Project Manager** | Project plan, RAID log, status report | Program Manager, PSC |
| **Business Analyst** | Business case, requirements, process maps | Program Manager, Architects |
| **Enterprise Architect** | Architecture review, capability map, roadmap | ARB, CTO, Program Managers |

### 9.2 RAID Log (Risks, Assumptions, Issues, Dependencies)

**RAID Log** is the fundamental tracking artifact for every program and project:

| Field | Description | Example |
|-------|-------------|---------|
| **Risk** | Potential future problem | "AWS capacity unavailable in target region" |
| **Assumption** | Believed to be true without full verification | "Business resources available 50% for UAT" |
| **Issue** | Current problem requiring action | "Data migration tool failing on legacy formats" |
| **Dependency** | External requirement for success | "Core banking vendor API must be ready by Q2" |

Each item should have: Owner, Likelihood/Impact (for risks), Status, Mitigation/Action, Date Due.

---

*→ Continue to [Vol 4 — Consulting Frameworks & Industry Strategy](./vol4-consulting-frameworks-industry)*

*← Return to [Handbook Index](./index)*
