---
title: "Module 12 — AI Consulting Engagement"
date: 2026-07-09
---

# Module 12: AI Consulting Engagement

## What a Consulting Engagement Is

When a Fortune 500 company hires McKinsey, BCG, Accenture, or Deloitte to help with an AI transformation, they are not buying technology. They are buying a structured process for reaching a decision, and a set of frameworks, tools, and expertise to accelerate that process. Understanding what that structured process looks like — from the first client conversation to the post-implementation review — is what this module teaches.

### External Consulting vs. Internal EA: Similarities and Differences

| Dimension | External Consulting | Internal EA |
|-----------|--------------------|-----------| 
| Primary client relationship | Engagement partner and project sponsor | CIO, business unit leads, executive team |
| Accountability | Contractual deliverables and milestones | Internal governance and performance review |
| Knowledge of client context | Built during discovery | Pre-existing and deep |
| Objectivity | High — external, independent | Lower — internal politics apply |
| Access to benchmarks | Broad — cross-industry data | Narrow — internal and public data |
| Speed to engagement | Fast for strategy; slow for implementation | Slow for strategy; deep for implementation |
| Cost to client | High and visible | Hidden in headcount |
| Risk of capture | Low — exits at engagement end | High — ongoing relationship affects advice |

The best internal Enterprise Architects learn from the consulting disciplines and apply them internally. The structured discovery process, the investment justification methodology, and the governance models that the top firms use are transferable to internal programs — and most internal EA teams do not use them rigorously enough.

### Types of Consulting Engagements

**Strategy engagements** deliver a recommendation — where to invest, which platforms to adopt, how to structure the AI program. They are typically 8–16 weeks, heavily analytical, and culminate in an executive presentation and roadmap. They do not implement anything.

**Assessment engagements** evaluate the current state against a framework or benchmark. They produce a scored gap analysis and a set of prioritised recommendations. Duration: 4–12 weeks.

**Implementation engagements** deliver a working system or capability. They are longer (6 months to 3 years), involve delivery teams, and are measured on go-live and adoption metrics.

**Managed services engagements** provide ongoing operations of a platform or function. They are measured on SLAs and continuous improvement.

!!! info "The Engagement Type Determines the Deliverable"
    Never confuse a strategy engagement with an implementation commitment. A strategy engagement delivers a recommendation; it does not guarantee that the recommendation will be implemented or succeed. This distinction matters enormously for managing client expectations from day one.

### Engagement Economics

Understanding how consulting is priced matters for the client relationship. Common pricing models:

| Model | Description | Client Risk | Consultant Risk |
|-------|-------------|-------------|-----------------|
| Time and materials (T&M) | Client pays for hours worked at an agreed rate | Open-ended cost exposure | Low — billed for all work |
| Fixed price | Agreed price for a defined scope | Cost certainty; scope risk | High — cost overruns come from margin |
| Milestone-based | Payments tied to defined deliverables | Medium — tied to outcomes | Medium — must deliver milestones |
| Outcome-based | Payment tied to a business result | Low — pay on value | High — requires measurable outcomes |

Most AI strategy engagements are priced as fixed price or milestone-based. Most implementation engagements are T&M with a not-to-exceed cap. Outcome-based pricing is rare but growing in AI engagements where the business case is clear enough to define a measurable target.

!!! tip "Why Enterprises Hire Consultants Even When They Have Internal Teams"
    The four real reasons: (1) Validation — the internal team already knows what to do but needs external credibility to get it funded. (2) Capacity — internal teams are fully committed and cannot add a major analysis. (3) Expertise — the specific skill (e.g., AI model governance) does not exist internally. (4) Independence — a recommendation that comes with a big-firm name carries weight in an investment committee that an internal memo cannot match.

---

## Phase 1: Client Discovery

Discovery is where most consulting engagements are won or lost — not in the proposal, but in the first 2–4 weeks of actual engagement work.

### The Kickoff Meeting

The kickoff meeting sets the tone for the entire engagement. It is not an orientation session. It is a trust-building event.

**Kickoff meeting agenda (2 hours):**

1. **Introductions and role clarity** (20 min) — who is on the consulting team, who is on the client team, and what each person's role is
2. **Engagement objectives and scope** (20 min) — restating what was agreed in the proposal, confirming it still reflects the client's needs
3. **Stakeholder landscape** (30 min) — client walks the consulting team through the key stakeholders, their positions, and any known political dynamics
4. **Discovery plan and interview schedule** (20 min) — confirm who will be interviewed, in what order, and what the schedule is
5. **Working norms** (15 min) — how the teams will communicate, document sharing, escalation paths, weekly check-in cadence
6. **Immediate risks** (15 min) — any known risks to the engagement that should be surfaced now

**What to avoid in the kickoff meeting:**
- Presenting a pre-formed hypothesis about what the problem is — you have not yet done the work
- Describing your methodology in detail — clients hired you for the output, not the process
- Allowing the conversation to be dominated by one powerful stakeholder who will skew your discovery

### Stakeholder Mapping

Every consulting engagement involves a web of stakeholders with different interests, different amounts of power, and different relationships with each other.

```
STAKEHOLDER MAP TEMPLATE
════════════════════════════════════════════════════════════

  POWER
  HIGH │                    │
       │  MANAGE CLOSELY    │  COLLABORATE ACTIVELY
       │  (keep satisfied;  │  (engage deeply; these
       │  not actively       │  are your decision-
       │  engaged in day-   │  makers and champions)
       │  to-day work)      │
       │                    │
       ├────────────────────┼────────────────────────
       │                    │
       │  MONITOR           │  KEEP INFORMED
       │  (awareness only;  │  (active engagement
       │  low power and     │  but not key decision-
       │  low interest)     │  makers)
       │                    │
  LOW  └────────────────────┴──────────────────────── INTEREST
                           LOW                        HIGH
```

**Key stakeholder roles in every AI consulting engagement:**

| Role | Description | How to Engage |
|------|-------------|---------------|
| Sponsor | Funds the engagement; owns the outcome | Weekly briefing; no surprises; decision gateway for scope changes |
| Champion | Internal ally who facilitated the engagement; helps you navigate | Daily or near-daily; ask them who to talk to and who to avoid |
| Economic Buyer | May differ from the sponsor; controls the budget | Ensure they understand ROI; involve in investment justification |
| Users | The people whose work will change as a result | Understand their concerns; involve in design; manage change resistance |
| Blockers | Internal skeptics who can slow or stop the engagement | Identify early; understand their concern; either address or neutralise |
| Technical Validators | Internal architects or engineers who will validate your technical findings | Build technical credibility early; invite their challenge |

### Discovery Interview Guide

Use this guide for every senior discovery interview. Adapt based on the interviewee's role.

**Opening (5 minutes)**

> "Thank you for making time for this. We are here to understand the current state from your perspective, not to present any conclusions — we are in listening mode. Everything you share will be treated confidentially within the engagement team, and attributed only at the theme level, never personally. There are no wrong answers. Can we start with your role and what you are responsible for?"

**Core Discovery Questions (20 questions)**

*Business context and strategy:*
1. What are the two or three most important business outcomes your organisation needs to achieve in the next 12 months?
2. What does success look like for your function in three years that it does not look like today?
3. Where do you feel the most competitive pressure right now?
4. What strategic decisions are being made in the next 6–12 months that will affect your technology and data needs?

*Current state and pain points:*
5. Walk me through the most important process in your function. Where are the biggest friction points?
6. What data or information do you need to do your job that you cannot reliably get today?
7. What would you automate if you could? What is stopping you?
8. Where are you doing manual work today that you believe should be automated?

*AI and technology readiness:*
9. What AI or automation capabilities are already in use in your area, formally or informally?
10. Where have you tried AI or automation and it did not work? What happened?
11. How would you characterise the quality of the data your team works with?
12. Who owns the data your team depends on, and how easy is it to get access?

*People and change:*
13. How would you characterise the appetite for change in your team?
14. What skills does your team have today that will be most important in an AI-enabled future? What skills will they need that they do not currently have?
15. What previous technology programs have succeeded here and why? Which have failed?

*Investment and governance:*
16. How are technology investment decisions made in your organisation?
17. What investment would you make if you had unlimited budget?
18. What investment would you make with a $5M budget and a 12-month timeline?
19. Who are the key decision-makers for technology investment beyond your own authority?
20. What would cause you to stop or reverse a major technology investment?

**Closing (5 minutes)**

> "Is there anything I should have asked that I did not? Is there anyone else you think we should speak with? What would make this engagement most valuable from your perspective?"

### What Clients Don't Say Directly

Experienced consultants learn to listen for what is not being said:

- **The person who talks about everything except one topic** — that topic is usually the most important one. Ask about it directly.
- **The executive who is unusually enthusiastic** — there may be a personal agenda tied to the outcome of the engagement.
- **The "we tried this before" mention** — always ask to understand the previous attempt in detail. The failure mode is almost always relevant to the current engagement.
- **Vague answers about data quality** — "our data is pretty good" almost always means "our data has serious problems we have not yet quantified."
- **References to people who are no longer in role** — political dynamics around those departures often affect current decision-making.

### Discovery Output

By the end of the discovery phase, you should have produced:

1. **Stakeholder map** — power/interest grid with notes on each stakeholder's position and key concerns
2. **Key themes** — 5–8 thematic findings from the interviews, each supported by multiple data points
3. **Hypothesis list** — 3–5 hypotheses about what the recommendation will be, each flagged as confirmed, unconfirmed, or refuted
4. **Interview summary** — a confidential document capturing the key points from each interview, with attribution removed
5. **Risk register (early draft)** — initial list of risks to the engagement and to the ultimate recommendation

---

## Phase 2: Current-State Assessment

The current-state assessment is a structured, scored evaluation of the organisation's current capabilities against a defined framework. It produces a baseline that the roadmap and business case will reference.

### Enterprise Architecture Assessment Framework

```
CURRENT-STATE ASSESSMENT FRAMEWORK
════════════════════════════════════════════════════════════════

  DOMAIN              ASSESSMENT DIMENSIONS          SCORE (1-5)
  ──────────────────────────────────────────────────────────────
  Application         Strategic fit                    ___
  Portfolio           Technical health                 ___
                      Integration complexity           ___
                      Vendor risk                      ___

  Data                Quality and completeness         ___
                      Availability and accessibility   ___
                      Governance and ownership         ___
                      AI readiness                     ___

  AI Capability       Current AI in production         ___
                      MLOps maturity                   ___
                      Model governance                 ___
                      Responsible AI practices         ___

  People & Skills     AI literacy (business)           ___
                      AI engineering capability        ___
                      Data science capability          ___
                      Change management capacity       ___

  Governance          Investment decision-making       ___
                      Architecture governance          ___
                      Data governance                  ___
                      AI governance                    ___

  Infrastructure      Cloud maturity                   ___
                      Integration platform             ___
                      Security posture                 ___
                      Observability                    ___
  ──────────────────────────────────────────────────────────────
  SCORING: 1 = Absent  2 = Initial  3 = Developing  4 = Managed  5 = Optimising
```

### Application Portfolio Assessment

The application portfolio assessment answers: which applications are strategic, which are legacy burdens, and which AI use cases are these applications capable of supporting?

**Application classification model:**

| Quadrant | Strategic Value | Technical Health | Action |
|----------|----------------|-----------------|--------|
| Invest | High | High | Prioritise AI enablement |
| Migrate | High | Low | Modernise to enable AI use cases |
| Contain | Low | High | Maintain; do not extend |
| Retire | Low | Low | Decommission; migrate data |

For each application in scope, capture: name, business owner, primary business function, estimated user count, technology platform and age, integration count, annual cost, and strategic classification.

### Data Assessment

AI programs live or die on data quality. The data assessment is the most critical component of the current-state assessment.

**Data Assessment Checklist:**

- [ ] What data exists in the organisation, where does it live, and who owns it?
- [ ] What percentage of data assets have a documented data owner?
- [ ] What is the measured or estimated data quality score for key data domains?
- [ ] How accessible is data for AI model training? Is there a data catalogue?
- [ ] What data governance policies exist, and are they enforced?
- [ ] What is the current data residency and regulatory situation?
- [ ] Are there data sharing agreements with external parties that affect AI use?
- [ ] What percentage of data is structured vs. unstructured?
- [ ] What is the data freshness profile for key data assets?
- [ ] Have any data privacy or compliance issues been identified in the past 24 months?

!!! warning "The Data Quality Reality Check"
    In over 90% of enterprise AI assessments, the initial data quality self-assessment from the client is significantly more optimistic than what is found during technical assessment. Build a "data quality discount" into your timeline and effort estimates. When a client says their data is "good," assume it will require 2–3 months of remediation before it can support model training.

### AI Capability Assessment

| Capability | Assessment Questions | Maturity Indicators |
|------------|---------------------|---------------------|
| AI in production | How many AI models are currently in production? | 0 = none; 3 = 1–5 models; 5 = 10+ models with monitoring |
| MLOps | How are models deployed, monitored, and retrained? | 1 = manual; 3 = partial automation; 5 = full CI/CD pipeline |
| Model governance | How are AI models approved before go-live? | 1 = no process; 3 = informal review; 5 = formal governance board |
| Responsible AI | What guardrails exist for fairness, bias, explainability? | 1 = none; 3 = policy only; 5 = enforced technical controls |

---

## Phase 3: Business Capability Assessment

The business capability assessment moves from IT to business. It maps the organisation's business capabilities and identifies where AI can drive the most value.

### Building the Business Capability Map

A business capability map shows what the organisation does, abstracted from how it does it or who does it. It is the foundation for identifying AI opportunities because AI operates at the capability level, not the application level.

```
EXAMPLE: TELECOM BUSINESS CAPABILITY MAP (Level 1)
════════════════════════════════════════════════════

  ┌─────────────────┬─────────────────┬──────────────────┐
  │   CUSTOMER      │   NETWORK       │   PRODUCT        │
  │   MANAGEMENT    │   OPERATIONS    │   MANAGEMENT     │
  ├─────────────────┼─────────────────┼──────────────────┤
  │   SALES &       │   FIELD         │   PARTNER        │
  │   MARKETING     │   OPERATIONS    │   MANAGEMENT     │
  ├─────────────────┼─────────────────┼──────────────────┤
  │   FINANCIAL     │   HUMAN         │   ENTERPRISE     │
  │   MANAGEMENT    │   RESOURCES     │   RISK           │
  └─────────────────┴─────────────────┴──────────────────┘

  ENABLING CAPABILITIES:
  Data & Analytics | Technology & Infrastructure | Legal & Compliance
```

### Capability Heat Mapping

Once the capability map is built, heat map it by two dimensions: strategic importance (how critical is this capability to competitive advantage?) and current performance (how well does the organisation perform this capability today?).

```
CAPABILITY HEAT MAP
═════════════════════════════════════════════════════

  STRATEGIC
  IMPORTANCE
  HIGH  │ Network Ops   │ Customer Mgmt │
        │ (underperform)│ (high value + │
        │ ← URGENT AI   │  underperform)│
        │   PRIORITY    │ ← HIGHEST     │
        │               │   PRIORITY    │
        ├───────────────┼───────────────┤
        │ Financial Mgmt│ Field Ops     │
        │ (strong today)│ (performing   │
        │ ← MAINTAIN    │  adequately)  │
        │               │ ← MONITOR     │
  LOW   └───────────────┴───────────────┴──────────
                    LOW                   HIGH
                        CURRENT PERFORMANCE
```

Capabilities in the top-left quadrant — high strategic importance, low current performance — are the primary targets for AI investment.

---

## Phase 4: AI Opportunity Identification

### The AI Opportunity Funnel

```
AI OPPORTUNITY FUNNEL
══════════════════════════════════════════════

  ┌───────────────────────────────────────────┐
  │         IDEATION WORKSHOP                 │
  │         (~50–100 raw ideas)               │
  └─────────────────┬─────────────────────────┘
                    │ Rapid feasibility filter
                    ▼
  ┌───────────────────────────────────────────┐
  │         LONG LIST                         │
  │         (~20–30 use cases)                │
  └─────────────────┬─────────────────────────┘
                    │ Value × complexity scoring
                    ▼
  ┌───────────────────────────────────────────┐
  │         SHORT LIST                        │
  │         (~8–12 use cases)                 │
  └─────────────────┬─────────────────────────┘
                    │ Detailed assessment
                    ▼
  ┌───────────────────────────────────────────┐
  │         PRIORITISED INITIATIVES           │
  │         (3–5 initiatives for roadmap)     │
  └─────────────────┬─────────────────────────┘
                    │ Pilot selection
                    ▼
  ┌───────────────────────────────────────────┐
  │         PILOT USE CASE                    │
  │         (1 use case to prove value)       │
  └───────────────────────────────────────────┘
```

### Use Case Ideation Workshop Design

**Duration:** 1 full day (6–7 hours)

**Participants:** 15–25 people — a mix of business leaders, operations staff, technology leaders, and data practitioners. Include people closest to the actual work, not just senior leaders.

**Morning session (3 hours): problem-first ideation**

Open with a 30-minute brief on the business challenges identified in discovery. Do not mention AI yet. Then break into groups of 4–5 and ask: "What are the most repetitive, expensive, or error-prone activities in your area?" Capture responses on sticky notes. Group by theme. Identify the top 10 problems across the organisation.

**Midday session (1 hour): AI literacy baseline**

Provide a 30-minute overview of what AI can and cannot do, with examples from the same industry. Keep it concrete. Follow with 30 minutes of Q&A. The purpose is to give participants a realistic sense of what is achievable before the afternoon.

**Afternoon session (3 hours): solution ideation**

Return to the top 10 problems. For each problem, ask: "Could AI help here? How?" Capture ideas in a structured format: problem, proposed AI approach, expected benefit, expected complexity. Do not filter or critique during ideation — every idea goes on the board.

Close with a structured dot-voting exercise: each participant gets 5 votes to allocate across the use cases. The distribution reveals the group's instincts about priority.

### AI Use Case Feasibility Checklist

For each candidate use case, assess against these five dimensions. Score each 1–5.

| Dimension | Questions to Ask | Score |
|-----------|-----------------|-------|
| Data availability | Is there sufficient historical data? Is it accessible? Is it labelled? | 1–5 |
| Business outcome clarity | Is the target outcome specific and measurable? Is there a clear KPI? | 1–5 |
| Measurability | Can we measure the impact of the AI system vs. the current state? | 1–5 |
| Organisational readiness | Will the team adopt the output? Is there a change management plan? | 1–5 |
| Regulatory exposure | Are there AI-specific regulatory requirements for this use case? | 1–5 |

A use case scoring above 20 out of 25 is a strong candidate. Below 12 indicates a use case that needs significant pre-work before it can be piloted.

### Rapid Value Assessment: 20 Use Cases in One Day

When you have 20 candidate use cases and need to prioritise them quickly, use this rapid value assessment protocol:

**Morning (4 hours):** Two-person consulting teams each take 5 use cases. For each use case, they spend 45 minutes: 20 minutes with a business owner estimating the business value, 15 minutes with a data or technology owner estimating the implementation complexity, and 10 minutes documenting the result.

**Afternoon (3 hours):** All teams reconvene. Each team presents their 5 use cases in 10 minutes each. The full group then calibrates scores for consistency — a "5 for complexity" should mean the same thing across all use cases.

**Output:** A scoring matrix with all 20 use cases plotted on a value vs. complexity vs. risk grid, annotated with the key assumptions behind each score.

### Selecting the Pilot Use Case

The pilot use case should not be the highest-value use case. It should be the use case most likely to succeed and most likely to build confidence in the AI program. Selection criteria:

- Moderate complexity (not the hardest thing to do)
- Clear, measurable business outcome that can be demonstrated in 90 days
- A committed business owner who will champion adoption
- Data that is available and reasonably clean
- Low regulatory risk (do not pilot in a regulated domain if an unregulated option exists)
- High visibility — the organisation will see and believe the result

---

## Phase 5: Proposal Preparation

### How Consulting Proposals Are Structured

A consulting proposal is not an academic paper. It is a sales document and a legal contract simultaneously. It must persuade the client that you understand their problem better than anyone else, and it must define the terms of engagement precisely enough to avoid disputes.

**Consulting proposal structure:**

1. **Executive summary** (1 page) — the recommendation, the engagement approach, the investment, and the expected outcome
2. **Client context and problem statement** (1–2 pages) — demonstrating that you listened and understood during the sales process
3. **Our approach** (2–3 pages) — phased engagement plan with deliverables per phase
4. **Team and credentials** (1–2 pages) — the specific people who will do the work, with relevant experience
5. **Investment** (1 page) — the fee, the payment schedule, and what is included / excluded
6. **Terms and conditions** — legal terms, IP ownership, confidentiality, limitation of liability

!!! warning "The Scope Definition Imperative"
    The most expensive mistakes in consulting engagements arise from ambiguous scope. Define what is included and, more importantly, what is explicitly excluded. "AI use case prioritisation" should be defined: how many use cases, at what level of detail, for which business domains. Ambiguity in the proposal becomes a dispute during the engagement.

### The Statement of Work

The Statement of Work (SoW) is the legally binding definition of the engagement scope. Key components:

- **Engagement objective**: One sentence defining the goal
- **In scope**: Specific activities the consulting team will perform
- **Out of scope**: Explicit list of what is not included
- **Deliverables**: Specific documents, outputs, or presentations the consulting team will produce, each with a format and delivery date
- **Client responsibilities**: What the client must provide (data access, stakeholder time, review cycles)
- **Assumptions**: What the consulting team is assuming to be true — if an assumption is wrong, scope or cost may need to change
- **Timeline**: Start date, end date, and key milestone dates
- **Commercial terms**: Fee, payment schedule, rate card for out-of-scope work

### Effort Estimation

Effort estimation in consulting follows a structured decomposition:

1. List every deliverable
2. Estimate the number of days of work per deliverable, per seniority level
3. Apply a contingency factor (typically 15–20% for strategy engagements)
4. Convert to fees at the rate card for each seniority level
5. Add reimbursable expenses (travel, accommodation, tools)

**Common estimation errors:**
- Underestimating client review and revision cycles (typically 30–40% of total effort)
- Ignoring the time required to prepare, facilitate, and document workshops
- Not accounting for internal coordination within the consulting team
- Assuming client data and stakeholder access will be immediate and complete

---

## Phase 6: Investment Justification

### Building the Investment Justification with the Client

The most important principle in building the investment justification is: **the client owns the numbers.**

If the consulting team builds the business case without client input and presents it as fact, two things happen: (1) the client does not believe it, because the assumptions came from outsiders; and (2) when the investment committee challenges the numbers, the business sponsor cannot defend them.

The right approach is collaborative: the consulting team provides the framework and the process; the client provides the numbers and validates the assumptions. The output is a business case the client can defend because they built it.

### The "Client Owns the Numbers" Principle in Practice

**Facilitated business case workshop (4 hours):**

- Hour 1: Review the use cases in scope and confirm which ones are included in the business case
- Hour 2: For each use case, the business owner estimates the benefit (with the consulting team providing benchmark ranges to calibrate)
- Hour 3: For each use case, the technology team estimates the implementation cost (with the consulting team providing benchmark ranges)
- Hour 4: Assemble the full investment model; review sensitivities; confirm the client is comfortable with the numbers

After the workshop, the consulting team builds the financial model and returns it to the client for review and sign-off. The final business case is theirs.

### Sensitivity Analysis

Every investment justification should include a sensitivity analysis showing the three scenarios:

```
SENSITIVITY ANALYSIS — AI NETWORK OPERATIONS PLATFORM
═══════════════════════════════════════════════════════════════

  METRIC            CONSERVATIVE    BASE CASE    OPTIMISTIC
  ──────────────────────────────────────────────────────────
  Adoption rate     40%             60%          80%
  Incident auto-
  resolution rate   45%             62%          75%
  Annual savings    $8.2M           $14.1M       $19.8M
  Implementation
  cost              $26M            $22M         $19M
  Net 3-year
  benefit           $(-1.4M)        $20.3M       $40.4M
  Payback period    No payback      2.1 years    1.4 years
  ──────────────────────────────────────────────────────────
  RECOMMENDATION: Proceed if adoption ≥ 50% and auto-resolution ≥ 55%.
  Both are achievable based on comparable implementations.
```

The sensitivity analysis does three things: it demonstrates analytical rigour, it gives the investment committee a way to stress-test the recommendation, and it shows the client where the key risks to the business case are.

---

## Phase 7: Executive Presentation

### The Consulting Deck Structure

The standard structure for a consulting recommendation presentation:

1. **Situation** — where the organisation is today (confirmed from discovery)
2. **Complication** — the tension or challenge that makes action necessary
3. **Hypothesis confirmed** — what we set out to learn and what we found
4. **Findings** — the 3–5 key findings from assessment and discovery
5. **Recommendation** — the specific recommended investment and approach
6. **Investment summary** — cost, benefit, payback
7. **Roadmap** — the high-level program structure and timeline
8. **Risks and mitigations** — top 3–5 risks with specific mitigations
9. **Next steps** — what the client needs to decide and by when

### Handling the "We Already Knew This" Objection

This is the most common objection to a consulting recommendation and the most dangerous. If the client feels the engagement has told them nothing new, they will question the value and may refuse to pay.

**How to anticipate this:** During discovery, ask clients explicitly: "What do you already know? What do you need us to confirm or challenge?" This sets up the framing — the engagement is not about discovering the unknown, it is about validating the known and providing the rigour and structure to act on it.

**How to respond in the meeting:** "You are right — the best consulting engagements confirm what your best people already suspected. What we have added is the quantification, the competitive context, the prioritisation framework, and the business case that gives you the credibility to act on what you knew. The value is not the insight — it is the ability to act."

### Leaving the Room with a Decision

Every executive presentation should close with a specific ask and a decision. Avoid vague closings like "we welcome your thoughts" or "please let us know how you would like to proceed." Instead:

> "We are recommending Option A: a 14-month AI Network Operations program with a total investment of $24M and an expected net benefit of $41M over three years. We are asking the steering committee to approve the program today so that we can begin procurement next week and maintain the Q1 start date. Are there any remaining questions before we call for the decision?"

---

## Phase 8: Roadmap Creation

### 90-Day, 1-Year, 3-Year Roadmap Structure

```
AI PROGRAM ROADMAP — INDICATIVE STRUCTURE
═════════════════════════════════════════════════════════════════════

  HORIZON          FOCUS                   KEY MILESTONES
  ─────────────────────────────────────────────────────────────────
  0–90 Days        Foundation and Quick    • Governance structure stood up
  (Now)            Wins                    • Data platform foundation in place
                                           • Pilot use case in production
                                           • First measurable business result

  91–365 Days      Scale and Embed         • 3–5 use cases in production
  (Year 1)                                 • AI Centre of Excellence active
                                           • MLOps pipeline operational
                                           • Benefits tracking mechanism live

  Years 2–3        Expand and Optimise     • 10+ use cases in production
  (Horizon 2)                              • AI literacy program complete
                                           • Autonomous AI capabilities active
                                           • Full benefits realisation
  ─────────────────────────────────────────────────────────────────
```

### Quick Wins: What to Prioritise in the First 90 Days

Quick wins serve a critical organisational function: they prove that AI works in this specific context, for these specific people, with this organisation's actual data. They build the internal credibility that sustains the larger program.

Quick win criteria:
- Visible to a broad audience (ideally the executive team)
- Delivers a measurable result within 90 days
- Does not require major infrastructure changes
- Uses data that already exists and is accessible
- Has a committed business owner who will communicate the result

### Dependency Mapping

Every roadmap initiative has dependencies. Map them explicitly:

| Initiative | Depends On | Enables |
|------------|-----------|---------|
| AI network operations pilot | Data platform foundation, MLOps pipeline | Scale to additional network domains |
| Customer AI assistant | Unified customer data view, API gateway | Personalisation engine |
| Predictive maintenance | IoT sensor data integration | Autonomous maintenance scheduling |

Dependencies that are not mapped become program failures that "nobody could have predicted."

---

## Phase 9: Implementation Governance

### Transition from Strategy to Delivery

The transition from a strategy engagement to implementation is where many AI programs stall. The strategy team has recommended a program and departed. The implementation team has arrived but does not fully understand the rationale behind the decisions. The business sponsor is now being asked to own something they did not build.

**Transition best practices:**
- Produce a detailed "program brief" — a document that captures the full context of the strategy engagement for the implementation team
- Run a transition workshop where strategy team members brief the implementation team directly
- Confirm that the business sponsor is still in role and committed (leadership changes are the number one risk during transition)
- Validate that the business case assumptions are still valid (market conditions or internal factors may have changed)

### Program Governance Setup

Every AI program of material size needs a governance structure:

```
PROGRAM GOVERNANCE STRUCTURE
══════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────┐
  │            STEERING COMMITTEE                    │
  │   (Executive sponsor, CIO, business leads)       │
  │   Cadence: Monthly                               │
  │   Decisions: Investment, scope, escalations      │
  └────────────────────┬─────────────────────────────┘
                       │
  ┌────────────────────▼─────────────────────────────┐
  │             PROGRAM BOARD                        │
  │   (Program director, EA lead, delivery leads)    │
  │   Cadence: Fortnightly                           │
  │   Decisions: Delivery priorities, risks, issues  │
  └────────────────────┬─────────────────────────────┘
                       │
  ┌────────────────────▼─────────────────────────────┐
  │            WORKSTREAM TEAMS                      │
  │   (Data, platform, use case, change mgmt)        │
  │   Cadence: Weekly                                │
  │   Decisions: Day-to-day delivery                 │
  └──────────────────────────────────────────────────┘
```

---

## Phase 10: Benefits Tracking

### Establishing the Benefits Baseline

Benefits tracking requires a baseline. Before any implementation work begins, measure the current state of every metric that the AI program is expected to improve.

**Benefits Tracking Register Template:**

| Benefit | KPI | Baseline Value | Target Value | Measurement Method | Owner | Target Date |
|---------|-----|---------------|-------------|-------------------|-------|-------------|
| Reduced incident resolution time | Mean time to resolve | 45 min | 4 min | ITSM system auto-report | NOC Lead | Q2 Y1 |
| Reduced incident volume | Incidents per month | 192,000 | 75,000 | Network management platform | NOC Lead | Q4 Y1 |
| Reduced operations cost | Cost per incident | $180 | $28 | Finance monthly report | CFO office | Q4 Y1 |
| Improved customer satisfaction | NPS (network) | 31 | 45 | Quarterly NPS survey | CCO office | Q4 Y2 |

Every entry in the benefits register must have: a specific KPI (not "improve customer satisfaction" but "NPS from 31 to 45"), a measurement method that produces a number, and a named owner who is accountable for tracking it.

### What to Do When Benefits Are Not Materialising

When benefits fall short at the 6-month review, three diagnoses are common:

**Diagnosis 1: Adoption is lower than assumed.** The AI system is working, but people are not using it. Response: investigate change management — was training adequate? Is there a workflow integration problem? Is there management resistance?

**Diagnosis 2: Data quality is worse than assumed.** The model performs poorly because the training data or production data was not as clean as the discovery assessment indicated. Response: data remediation sprint; retraining cycle.

**Diagnosis 3: The benefit assumption was wrong.** The AI system is working and being used, but the business impact is lower than modelled. Response: revisit the assumption, adjust the forecast, communicate proactively to the steering committee — never hide a shortfall.

---

## Phase 11: Lessons Learned

### The Retrospective Structure

A lessons learned retrospective is not a blame session. It is a structured process for extracting institutional knowledge from a completed engagement or program phase.

**Retrospective agenda (3 hours):**

1. **What went well** (45 min) — specific things that worked, with the reason they worked
2. **What did not go well** (45 min) — specific things that did not work, with root cause analysis
3. **What we would do differently** (45 min) — specific changes to practice, process, or approach
4. **Key lessons for future engagements** (45 min) — distilled into 5–10 actionable statements

### What Makes a Useful Lesson vs. a Generic One

**Generic (useless):** "We should communicate better with stakeholders."

**Specific (useful):** "In AI assessment engagements, the data quality discovery consistently reveals worse conditions than initial client self-assessment indicates. Future engagements should build a two-week data quality assessment sprint into the current-state phase as standard, before committing to the use case business cases."

The test for a useful lesson: can someone who was not on this engagement read this lesson and change their behaviour on the next engagement? Generic lessons fail this test.

---

## End-to-End Example: The TelcoCo AI Network Operations Engagement

### The Scenario

**Client:** TelcoCo — a mid-tier telecom operator with 8 million subscribers, 24,000 employees, and revenues of $4.2B. Their network operations centre handles 2.3 million network incidents annually.

**Engagement:** 16-week AI strategy engagement to assess AI readiness and recommend an AI-powered network operations platform.

**Consulting team:** 6 people — engagement partner, delivery director, two senior consultants, one data scientist, one change management specialist.

---

### Phase 1: Discovery (Weeks 1–3)

**Who was in the room:**

Kickoff meeting attended by: CINO (Chief Infrastructure and Networks Officer), CIO, CTO, Head of Network Operations, Head of Data and Analytics, Head of IT Architecture, two engineering leads, and the consulting engagement partner.

**Political dynamics surfaced:**

- The Head of Network Operations is skeptical — they ran a similar program in 2021 that failed when the AI vendor could not integrate with the legacy OSS/BSS
- The CTO is enthusiastic — they have been advocating for AI investment for two years
- The CIO is neutral — they want to see a clear business case before committing

**Discovery findings:**

The consulting team conducted 22 interviews over three weeks. Key themes:

1. **The scale of manual work is significant** — 85% of incidents are initially handled manually, despite the fact that 40% are known recurring issues with documented resolution procedures
2. **The data landscape is fragmented** — network telemetry data sits in four separate systems that do not talk to each other; there is no unified incident history
3. **The 2021 program failed for three specific reasons** — inadequate data integration, a vendor who underestimated the OSS/BSS complexity, and a go-live date that was not adjusted when scope expanded
4. **There is strong appetite at the working level** — field technicians and NOC analysts are frustrated by repetitive manual work and are enthusiastic about AI assistance

---

### Phase 2: Current-State Assessment (Weeks 2–4, overlapping with Discovery)

**Assessment scores:**

| Domain | Score | Key Finding |
|--------|-------|------------|
| Application portfolio | 2.8/5 | Legacy OSS/BSS is technically sound but poorly integrated; no AI-ready APIs |
| Data | 2.1/5 | Fragmented telemetry data; no unified incident history; data quality issues in 3 of 4 systems |
| AI capability | 1.4/5 | No AI in production in network operations; one ML proof of concept in billing (never deployed) |
| People and skills | 2.6/5 | Strong network engineering; very limited data science or MLOps capability |
| Governance | 3.1/5 | Good IT governance framework; no AI-specific governance |
| Infrastructure | 3.4/5 | Recent cloud migration to AWS; good foundational infrastructure |

**Key finding:** TelcoCo is at an early stage of AI readiness, but has the infrastructure and organisational commitment to move forward. The primary barriers are data fragmentation and the absence of AI engineering capability.

---

### Phase 3: Business Capability Assessment (Week 3)

The consulting team facilitated a 4-hour capability mapping workshop with 12 business and technology leaders. They identified 24 level-2 capabilities in scope.

The heat map revealed three clusters of high-priority AI opportunity:

- **Network incident management** — high strategic importance, poor current performance (manual processes, slow resolution)
- **Predictive network maintenance** — high strategic importance, poor current performance (reactive maintenance model)
- **Customer churn prediction** — high strategic importance, moderate performance (basic rule-based churn models in use)

---

### Phase 4: AI Opportunity Identification (Week 4)

**Ideation workshop:** The team facilitated a full-day workshop with 22 participants. They generated 67 AI ideas. After rapid feasibility filtering, the long list contained 24 use cases.

**Scoring results (top 5):**

| Use Case | Value Score | Feasibility Score | Priority |
|----------|------------|------------------|---------|
| Automated incident classification and routing | 4.8 | 4.1 | 1 |
| Predictive fault detection | 4.6 | 3.2 | 2 |
| AI-assisted incident resolution | 4.3 | 3.8 | 3 |
| Customer churn prediction | 3.9 | 4.4 | 4 |
| Network capacity planning AI | 3.7 | 2.8 | 5 |

**Pilot selected:** Automated incident classification and routing — the highest-priority use case with a feasibility score indicating it can be delivered in 90 days using existing data, even before data integration is complete.

---

### Phase 5–6: Proposal and Investment Justification (Weeks 5–8)

The consulting team facilitated a 4-hour investment justification workshop with the CFO, CINO, and Head of Data and Analytics. The client team provided the benefit estimates; the consulting team provided industry benchmarks to calibrate.

**Agreed business case (base case):**

| Year | Investment | Cumulative Savings | Net |
|------|-----------|-------------------|-----|
| Y1 | $12M | $4.1M | $(7.9M) |
| Y2 | $8M | $18.6M | $10.6M |
| Y3 | $2M | $38.2M | $36.2M |

Payback: 2.1 years. 3-year net benefit: $36.2M on a $22M investment. ROI: 165%.

---

### Phase 7: Executive Presentation (Week 9)

The consulting team presented to a steering committee of 12, including the CEO, CFO, CIO, CINO, and CTO.

**Challenges in the room:**

- The CFO challenged the 60% incident auto-resolution assumption: "That seems high. Our current automation tools only resolve 8%."
- The Head of Network Operations raised the 2021 failure again: "How is this different from what we tried before?"

**How they were handled:**

CFO objection: The consulting team showed the sensitivity analysis. "If auto-resolution lands at 40% rather than 60%, the ROI drops from 165% to 82% — still above your 25% hurdle rate. The 40% figure is the floor seen in comparable implementations."

2021 failure objection: "You are right to raise this. After analysing the 2021 program in detail, we identified three specific causes of failure that this proposal directly addresses. First, the 2021 data integration was attempted before the data foundation was in place — our proposal sequences data foundation as Phase 1. Second, the vendor had no OSS/BSS integration experience — we have identified three vendors with TelcoCo-equivalent implementations. Third, the go-live date was fixed and not adjusted when scope expanded — our proposal uses a modular delivery model where scope can flex without affecting the timeline."

**Outcome:** The steering committee approved the program to proceed to detailed planning and vendor selection.

---

### Phases 8–11: Roadmap, Governance, Benefits Tracking, and Lessons Learned

**Program structure confirmed:**

- Phase 1 (months 1–3): Data foundation, governance setup, pilot use case deployment
- Phase 2 (months 4–9): Use cases 2 and 3 in production; benefits tracking established
- Phase 3 (months 10–14): Use cases 4 and 5; MLOps platform; Centre of Excellence operational

**Benefits baseline established** before any implementation work began. Monthly benefits reporting to steering committee confirmed as part of the governance framework.

**Lessons learned (6-month retrospective):**

1. Data quality discovery in network operations consistently reveals fragmentation across telemetry systems — build 4 weeks of data discovery specifically for OSS/BSS environments into all future network AI assessments
2. The NOC analyst community is the most valuable source of quick-win use cases — involve them in ideation workshops, not just managers
3. The "2021 failure" objection required significantly more preparation than anticipated — in future, when a client has a previous failure in the target domain, commission a brief root-cause analysis before the recommendation presentation

---

## Consulting Toolkit

### Tool 1: Discovery Interview Guide

See the full 20-question guide in Phase 1 of this module. Print and adapt before each engagement.

### Tool 2: Stakeholder Map Template

Use the power/interest grid in Phase 1. For each stakeholder, record:
- Name and role
- Power level (1–5) and interest level (1–5)
- Current position on the engagement (Champion / Neutral / Skeptic / Blocker)
- Key concern
- Engagement approach and owner

### Tool 3: AI Opportunity Scoring Matrix

| Use Case | Strategic Value (1–5) | Ease of Implementation (1–5) | Data Readiness (1–5) | Org Readiness (1–5) | Regulatory Risk (1–5 inverse) | Total Score |
|----------|----------------------|-----------------------------|--------------------|-------------------|------------------------------|-------------|
| [Use case 1] | | | | | | |
| [Use case 2] | | | | | | |
| [Use case 3] | | | | | | |

Rank use cases by total score. The highest-scoring feasible use cases proceed to the short list.

### Tool 4: Current-State Assessment Checklist

Use the full 24-dimension scoring framework in Phase 2. Complete with both consulting team assessment and client self-assessment scores, then compare. Gaps between the two are often the most revealing findings.

### Tool 5: Benefits Tracking Register Template

Use the register format defined in Phase 10. Populate the baseline column before implementation begins. Review monthly at the program board; quarterly at the steering committee.

---

## Five Teaching Lenses

### Lens 1: The Consultant Who Delivered What Was Asked, Not What Was Needed

*A consulting team was engaged to assess AI readiness and prioritise use cases. After 12 weeks of rigorous work, they delivered a beautifully formatted report with 18 use cases ranked by a scoring model. The client accepted the deliverable and paid the invoice. Six months later, nothing had been implemented. The consulting team had answered the question they were asked — "which use cases?" — but had not answered the question the client actually needed — "how do we start?" The engagement lacked a clear call to action: a specific pilot, a specific investment ask, a specific owner.*

**Lesson:** Deliver what was asked and what was needed. They are not always the same thing.

### Lens 2: The Analysis Paralysis Engagement

*A major bank engaged a consulting firm for an AI strategy. The discovery phase ran for six weeks instead of four. The assessment took eight weeks instead of four. By week 16, the consulting team was still collecting data. The bank's steering committee lost patience. They cancelled the engagement and asked a smaller firm to deliver a recommendation in four weeks. The smaller firm did — it was less thorough, but it was actionable.*

**Lesson:** Perfect is the enemy of done in consulting. A good recommendation delivered on time beats a perfect one delivered late. Set a discovery deadline and hold to it.

### Lens 3: The Recommendation That Could Not Be Implemented

*A consulting team recommended a sophisticated AI platform that required a team of 12 data scientists, 6 ML engineers, and a dedicated MLOps function. The client had 2 data scientists and no ML engineers. The recommendation was technically correct. It was also impossible to implement without three years of hiring. The consulting team had focused entirely on what the right solution was and not at all on whether the client had the capacity to deliver it.*

**Lesson:** Recommendations must be matched to the organisation's realistic delivery capacity. The best solution is the best solution the client can actually implement.

### Lens 4: The Discovery That Found the Real Problem

*A telecom engaged a consulting team to recommend an AI-powered customer service platform. During discovery, the consulting team noticed something: every interviewee mentioned a problem with customer data. It was fragmented, inconsistent, and unreliable. The customer service AI they had been asked to design would fail because the data it needed to personalise interactions did not exist in usable form. The consulting team re-scoped the engagement — with client approval — to recommend a Customer Data Platform first, then the AI service layer. It was not what the client asked for. It was what they needed.*

**Lesson:** Discovery is not just about confirming the brief. It is about finding the real problem, which is sometimes different from the stated problem.

### Lens 5: The Benefits That Never Got Tracked

*An AI program went live on time and on budget. The launch event was attended by the CEO. Twelve months later, the CFO asked: "What did we get for our $22M?" Nobody knew. The benefits tracking register had been agreed in the proposal but never set up during implementation. There was no baseline, no measurement mechanism, and no owner. The program team believed it had been successful. They could not prove it.*

**Lesson:** Benefits tracking is not a post-implementation activity. It is agreed before implementation begins, baselined before go-live, and monitored continuously. If you cannot measure it, you cannot claim it.

---

## Common Mistakes in AI Consulting Engagements

| Mistake | Why It Fails | The Better Approach |
|---------|-------------|---------------------|
| Not understanding client politics early | Political blockers can kill an engagement that has technical merit | Map stakeholders in week 1; identify blockers and develop a specific engagement plan |
| Delivering what was asked, not what was needed | Clients pay for value, not compliance | Ask "what decision do you need to make?" not just "what deliverable do you want?" |
| Analysis paralysis — too much discovery, not enough recommendation | Clients lose patience and confidence | Set a discovery boundary at week 4; commit to a recommendation structure by week 8 |
| Recommendations that cannot be implemented | Technically correct but practically useless | Every recommendation must include a delivery model matched to client capacity |
| No benefits tracking agreed upfront | Cannot demonstrate program value | Benefits register, baseline, and owner must be agreed before implementation begins |
| Ignoring the previous failure | The wound does not heal by itself | Surface and diagnose every previous failure in the domain; show specifically how this program is different |
| Building the business case without the client | The client cannot defend numbers they did not build | Use facilitated workshops; the client provides the numbers; you provide the framework |
| Assuming data is ready | The most consistent discovery in AI engagements | Build data quality assessment into every engagement scope; never assume |

---

## Mastery Checklist

You have mastered Module 12 when you can:

- [ ] Design and run a 2-hour consulting kickoff meeting that builds trust and surfaces political dynamics
- [ ] Conduct a 45-minute discovery interview using the 20-question guide, adapting it to the interviewee's role
- [ ] Build a power/interest stakeholder map for an engagement with 15 or more stakeholders and develop a specific engagement plan for each quadrant
- [ ] Facilitate a full-day AI opportunity ideation workshop with 20 or more participants
- [ ] Complete a 24-dimension current-state assessment and produce a scored Current State Report
- [ ] Score 20 AI use cases in one day using the rapid value assessment protocol
- [ ] Facilitate a 4-hour investment justification workshop and produce a business case the client owns and can defend
- [ ] Structure a consulting recommendation presentation using the 9-element deck structure
- [ ] Handle the "we already knew this" objection and the "we tried this before" objection without becoming defensive
- [ ] Design a 90-day / 1-year / 3-year roadmap with explicit dependencies and quick wins
- [ ] Set up a benefits tracking register with baseline, target, measurement method, and owner for every material benefit
- [ ] Facilitate a retrospective and extract 5–10 specific, actionable lessons (not generic ones)

!!! info "Capstone: The Complete Engagement Simulation"
    The final assessment for this module is a complete engagement simulation. You will receive a brief for a fictional enterprise AI consulting engagement. You will produce: a discovery interview guide adapted to the client context, a current-state assessment, an AI opportunity scoring matrix, an investment justification, a 10-slide recommendation deck, and a benefits tracking register. Peer reviewers will evaluate each deliverable against the frameworks in this module.

<!-- AUTO-DOCS-START -->
<!-- AUTO-DOCS-END -->
