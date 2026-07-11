---
title: "Module 3 — Enterprise Proposal Lifecycle"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-03-proposal-lifecycle"]
doc_type: multi-part-series
series_name: EA Masterclass
series_part: 3
series_total: 15
series_index: ../index.md
---

# Module 3 — Enterprise Proposal Lifecycle

## What This Module Covers

This module teaches the full lifecycle of an enterprise proposal from first principles. If you have spent your career as a technical architect designing systems, reviewing code, or sitting in architecture review boards, but have never owned a proposal end-to-end, this module is for you.

By the end you will understand what proposals are, why they exist, what distinguishes success from failure, and exactly what an Enterprise Architect (EA) contributes at every stage — from the moment an opportunity surfaces to the point where promised benefits are tracked in production.

---

## What an Enterprise Proposal Is

### Three Types You Will Encounter

!!! note "Know Which Type You Are Writing"
    Confusing these three types is one of the most common early mistakes. Each has a different audience, different acceptance criteria, and a different definition of "done."

**1. Internal Business Case**

An internal business case is written by people inside the organisation to justify spending internal budget. The audience is typically a Finance Committee, an Investment Board, or an executive sponsor. The document argues that a particular initiative deserves funding over competing uses of capital.

- Audience: internal decision-makers
- Currency: business value, NPV, payback period
- Outcome: budget approval or rejection
- EA role: technology feasibility, architecture fit, risk identification

**2. External Vendor Proposal**

An external vendor proposal is written by a supplier in response to a customer's procurement process. The vendor is competing against other vendors. The document argues that the vendor's product or service is the best answer to the customer's stated need.

- Audience: the customer's evaluation team
- Currency: capability match, price, risk profile, references
- Outcome: vendor selection or elimination
- EA role (as customer): writing the technical requirements; as vendor: framing the architecture story

**3. Consulting Engagement Proposal**

A consulting proposal is a specific subtype where a professional services firm proposes a body of work — discovery, design, implementation, or some combination — to a client. It is different from a product vendor proposal because the deliverable is people and intellectual output, not software licences.

- Audience: the client's procurement and sponsoring executive
- Currency: methodology credibility, team quality, price, references
- Outcome: Statement of Work and contract
- EA role: scoping the technical work, estimating effort, defining architecture deliverables

### Why Proposals Exist

Proposals exist because organisations cannot make large, irreversible spending decisions on the basis of conversation alone. A proposal creates a shared artefact that:

- Forces the requester to articulate the problem clearly
- Creates a record of what was promised
- Provides a basis for contract terms
- Enables comparison across options
- Establishes accountability for outcomes

### What Makes Proposals Succeed or Fail

!!! warning "The Number One Failure Mode"
    Most proposals fail not because the technical content is wrong but because the proposal does not clearly connect the solution to a problem that the decision-maker cares about. Architects write excellent technology narratives that no executive reads.

**Success factors:**

| Factor | What It Looks Like |
| --- | --- |
| Problem clarity | The problem is stated in business terms, not technical terms |
| Stakeholder alignment | Key stakeholders have shaped the proposal, not just reviewed it |
| Evidence base | Claims are supported by data, benchmarks, or references |
| Credible cost estimate | Numbers have been sized, not guessed |
| Clear ask | The proposal makes a specific, bounded request |
| Risk honesty | Risks are named, not buried |
| Compelling narrative | A human being can read it and understand it in 10 minutes |

**Failure factors:**

| Factor | What It Looks Like |
| --- | --- |
| Technology-first framing | Leads with architecture before establishing the business problem |
| Assumed context | Assumes the reader knows the current-state pain |
| Passive voice everywhere | Makes it impossible to identify who is accountable |
| Cost underestimation | Numbers chosen to get approval, not to reflect reality |
| Missing risk section | Treats risk as embarrassing rather than informative |
| No recommended option | Presents three options with no recommendation, forcing the executive to make a technical judgment |

---

## The Full Proposal Lifecycle

The diagram below shows the complete sequence. Each stage is explained in depth in the sections that follow.

```
  ┌─────────────────────────────────────────────────────────────────┐
  │                    ENTERPRISE PROPOSAL LIFECYCLE                │
  └─────────────────────────────────────────────────────────────────┘

  [1] Opportunity         [2] RFI          [3] RFP / RFQ
   Identification    ──►  Issuance    ──►  Issuance & Evaluation
                          & Evaluation
                                               │
                                               ▼
  [6] Discovery      ◄──  [5] Pre-Sales  ◄──  [4] Vendor
   Phase                  & Engagement        Shortlisting

       │
       ▼
  [7] Architecture    ──►  [8] Cost      ──►  [9] Technology
   Workshops               Estimation         Selection

                                               │
                                               ▼
  [12] Proposal      ◄──  [11] Business  ◄──  [10] Risk
   Writing                Case Dev.           Assessment

       │
       ▼
  [13] Architecture   ──►  [14] Executive  ──►  [15] Negotiation
   Review (ARB)             Approval

                                               │
                                               ▼
  [17] Benefits       ◄──  [16] Implementation
   Realization             Planning
```

---

## Stage 1: Opportunity Identification

### How Opportunities Surface

Opportunities do not arrive neatly packaged. In most organisations they surface through one of five channels:

1. **Strategic planning cycles** — annual or quarterly planning processes that identify capability gaps against the target operating model
2. **Problem escalation** — a recurring operational pain that has reached a threshold (costs too much, risks too much, frustrates customers enough)
3. **Regulatory or compliance trigger** — a new regulation with a compliance deadline forces action
4. **Technology end-of-life** — a vendor announces end-of-support; a system becomes unmaintainable
5. **External stimulus** — a competitor launches a capability; a client demands an integration; M&A activity requires system consolidation

### Who Identifies Them

!!! tip "EA as Opportunity Radar"
    Enterprise Architects who are embedded in strategic conversations — not locked in ivory-tower architecture work — hear about opportunities months before they become formal requests. This lead time is enormously valuable.

| Source | Typical Identifier |
| --- | --- |
| Strategic planning | Chief Strategy Officer, CIO, Business Unit head |
| Problem escalation | Operations lead, IT Service Manager |
| Regulatory trigger | Chief Risk Officer, Legal, Compliance |
| Technology EOL | Infrastructure lead, Vendor Account Manager |
| External stimulus | CEO, Sales lead, Business Development |

### EA's Role at This Stage

- Maintain a technology radar that flags EOL risks before they become crises
- Participate in architecture governance so you know what is stressed
- Build relationships with business leads so they call you before calling procurement
- Document the opportunity in one page: problem statement, affected stakeholder groups, estimated scale, urgency

---

## Stage 2: RFI — Request for Information

### What an RFI Is

An RFI (Request for Information) is a structured questionnaire sent to the market — or to a specific set of known vendors — before a formal procurement. Its purpose is to gather market intelligence, not to select a vendor.

RFIs are appropriate when:

- You do not know what solutions exist in the market
- You need to assess vendor capability before writing a technically sound RFP
- You want to understand pricing models before estimating budget
- The problem is novel enough that you are not sure how vendors would solve it

### When NOT to Issue an RFI

!!! warning "RFI as Theatre"
    Some organisations issue RFIs when they have already chosen a vendor. This wastes vendor time, damages your organisation's market reputation, and teaches vendors to give you generic answers. Only issue an RFI when you genuinely do not know the answer.

Do not issue an RFI if you already know the solution space and have enough information to write a well-scoped RFP.

### How to Write an RFI

**RFI Template — Inline**

```markdown
# REQUEST FOR INFORMATION
Organisation: [Name]
Reference:    RFI-[YYYY]-[NNN]
Issue Date:   [Date]
Response Due: [Date]  (allow at least 3 weeks)
Contact:      [Name, email, phone]

## 1. Purpose and Background
[2–3 paragraphs: who we are, what problem we are investigating,
why we are going to market now. Be honest about maturity of
your thinking — "we are at early exploration stage" is fine.]

## 2. Scope of Interest
[Describe the capability area. Do not over-specify — that is
what the RFP is for. Focus on the problem, not the solution.]

## 3. Questions

### Section A — Company & Product
A1. Describe your company: size, ownership, headquarters,
    financial stability (provide last 2 years' revenue if private).
A2. Describe the product or service relevant to this RFI.
    When was it first released? What is the current version?
A3. How many enterprise customers (>5,000 employees) use this
    product in production today?
A4. Provide three reference customers in our sector willing to speak.

### Section B — Capability
B1. How does your solution address [problem area]?
    Provide a capability overview (max 2 pages).
B2. What integrations with [list your key systems] are
    available out of the box?
B3. What is your approach to data residency and sovereignty?
B4. Describe your security certifications (ISO 27001, SOC 2, etc.).
B5. How does your solution handle [specific technical concern]?

### Section C — Implementation & Support
C1. Describe a typical implementation journey: phases, duration,
    required customer resources.
C2. What does ongoing support look like? SLA tiers, support channels,
    dedicated CSM?
C3. What training is available for our technical team?

### Section D — Commercial
D1. Describe your pricing model (do not provide specific pricing —
    save that for RFP stage).
D2. Are there constraints on multi-year commitment terms?
D3. Do you partner with system integrators? Which ones are
    certified for this product?

### Section E — Roadmap
E1. What is your 12-month product roadmap (high level)?
E2. How do customer requirements feed into your roadmap?
E3. What is your policy on backward compatibility?

## 4. Format Requirements
- Maximum 20 pages (excluding appendices and product brochures)
- Use our question numbering exactly
- Electronic submission to [email] by [date/time/timezone]

## 5. Process
This RFI does not commit [Organisation] to any procurement
action. Responses will be reviewed and may result in an RFP
being issued. Vendors are not reimbursed for RFI costs.
```

### How to Evaluate RFI Responses

Create a simple scoring matrix. Evaluate on:

| Criterion | Weight | Notes |
| --- | --- | --- |
| Capability match | 30% | Does the vendor actually solve the problem? |
| Enterprise maturity | 20% | Reference customers, support model, SLAs |
| Integration readiness | 20% | Pre-built connectors for your stack |
| Security posture | 15% | Certifications, data residency |
| Commercial fit | 15% | Pricing model aligns with your budget model |

Shortlist 3–5 vendors for the RFP stage. Document why non-shortlisted vendors were excluded — you may be asked to justify this.

---

## Stage 3: RFP — Request for Proposal

### Anatomy of an RFP

An RFP is a formal procurement document that invites competitive bids. Unlike an RFI, an RFP results in a vendor selection.

A well-structured enterprise RFP contains:

```
1. Executive Summary & Context
   - Organisation background
   - Problem statement (business terms)
   - Objectives and success criteria

2. Scope of Work
   - In scope (explicit list)
   - Out of scope (explicit list)
   - Assumptions and constraints

3. Technical Requirements
   - Functional requirements (numbered, MUST/SHOULD/MAY)
   - Non-functional requirements (performance, security, availability)
   - Integration requirements
   - Data requirements

4. Architecture Standards & Constraints
   ← This is where EA contributes most heavily

5. Evaluation Criteria
   - Weights and scoring methodology
   - Mandatory vs. desirable requirements

6. Proposal Format Requirements
   - Section structure vendors must follow
   - Page limits

7. Commercial Terms
   - Pricing template (vendors complete it)
   - Contract terms (MSA, SLA expectations)
   - Payment milestones

8. Process
   - Q&A dates and process
   - Submission deadline
   - Selection timeline
   - Contact rules (who vendors may contact)

9. Appendices
   - Current-state architecture diagrams
   - Data volumes and growth rates
   - Integration inventory
```

### How EA Contributes to the RFP

!!! note "EA's Primary RFP Contribution"
    The technical requirements section and the architecture standards section are where EA adds the most value. A procurement team can write the commercial sections; only EA can write technically defensible requirements.

**Technical Requirements Writing:**

Use MUST / SHOULD / MAY (RFC 2119 style):

```markdown
NFR-001 [MUST] The solution must support 99.9% availability
        measured over a rolling 30-day window excluding
        agreed maintenance windows.

NFR-002 [MUST] The solution must encrypt all data at rest
        using AES-256 and in transit using TLS 1.2 or above.

NFR-003 [SHOULD] The solution should support horizontal
        auto-scaling in response to load.

NFR-004 [MAY] The solution may expose a GraphQL API in
        addition to the mandatory REST API.
```

**Architecture Standards Section:**

Document your organisation's non-negotiable architecture standards that any vendor must comply with:

- Approved cloud platforms (e.g., "Azure-first; AWS approved; GCP requires waiver")
- Identity and access management (e.g., "Must integrate with Azure AD via OIDC/SAML")
- Logging and observability (e.g., "Must emit OpenTelemetry-compatible traces")
- Data classification standards
- Network topology constraints
- BCDR requirements

### How to Evaluate Vendor Proposals

Establish a cross-functional evaluation panel — at minimum: EA, a business lead, procurement, security, and a subject-matter expert. Score independently before convening. Use a structured scorecard:

| Requirement Area | Weight | Vendor A | Vendor B | Vendor C |
| --- | --- | --- | --- | --- |
| Functional fit | 25% | 8/10 | 7/10 | 9/10 |
| Technical architecture | 20% | 9/10 | 6/10 | 8/10 |
| Security & compliance | 20% | 9/10 | 8/10 | 7/10 |
| Implementation approach | 15% | 7/10 | 9/10 | 7/10 |
| Commercial | 15% | 6/10 | 8/10 | 7/10 |
| References | 5% | 9/10 | 7/10 | 8/10 |
| **Weighted Total** | | **7.95** | **7.35** | **7.85** |

Always document the scoring rationale — not just the numbers.

---

## Stage 4: RFQ — Request for Quotation

### When RFQ Is Used

An RFQ is used when the solution is already well-defined and the primary differentiator is price. It is appropriate for:

- Commodity products where specifications are clear (hardware, licences for known software)
- Renewals where the scope is identical to the previous contract
- Low-complexity purchases below certain procurement thresholds

### Difference from RFP

| Dimension | RFP | RFQ |
| --- | --- | --- |
| Solution definition | Open — vendors propose their approach | Closed — you specify exactly what you want |
| Primary differentiator | Capability, methodology, fit | Price |
| Evaluation complexity | High | Low |
| Vendor response effort | High (weeks) | Low (days) |
| Appropriate when | Solution is not fully defined | Solution is fully defined |

!!! tip "EA Caution on RFQs"
    Issuing an RFQ when the solution is not actually well-defined is a common mistake. It produces responses that are not comparable, forces vendors to make assumptions, and results in contract disputes later. If you are not certain exactly what you need, use an RFP.

---

## Stage 5: Pre-Sales and Vendor Engagement

### What Happens in Pre-Sales

After shortlisting vendors from the RFI/RFP process, you enter a period of deeper engagement before final selection. This typically includes:

- **Product demonstrations** — vendors show the product against your specific use cases
- **Proof of Concept (PoC)** — vendors build a working example using your data or your environment
- **Deep-dive technical sessions** — architecture review, security review, integration deep-dive
- **Reference calls** — conversations with existing customers
- **Commercial negotiation preview** — understanding the commercial model in detail

### PoC Design

!!! warning "PoC Without Success Criteria Is Waste"
    A PoC that has no predefined success criteria will be judged subjectively. The vendor who demos best will win, not the vendor whose product works best for you. Always define success criteria before the PoC begins.

A good PoC design document contains:

```markdown
## PoC Objectives
[What specific questions does this PoC answer?]

## In-Scope Scenarios
Scenario 1: [Description, expected input, expected output,
             acceptance criterion]
Scenario 2: ...

## Out-of-Scope
[Be explicit. Vendors will expand scope if you let them.]

## Duration
Start: [date]  End: [date]  Review: [date]

## Environment
[Whose environment? Vendor sandbox / your dev / hybrid?
 What test data will be used?]

## Success Criteria
| Criterion | Measurement Method | Pass Threshold |
|---|---|---|
| Performance | Load test: 500 concurrent users | p95 < 2 seconds |
| Data accuracy | Compare output to golden dataset | > 99.5% match |
| Integration | Connect to [System X] in under 2 hours | Binary pass/fail |

## Scoring
[How will PoC results feed into overall evaluation scoring?]
```

### Vendor Lock-In Traps

!!! warning "Lock-In Is a Risk, Not a Conspiracy"
    Vendor lock-in is not necessarily malicious — it is often a byproduct of deep integration. But it must be identified and priced into your decision.

Common lock-in vectors:

| Vector | Example | Mitigation |
| --- | --- | --- |
| Proprietary data format | Data stored in vendor-specific schema | Require open export formats; test export during PoC |
| API dependency | 200 integrations built on vendor's private API | Prefer open standards (REST, GraphQL, gRPC) |
| Skill lock-in | Only vendor-certified staff can operate the system | Require knowledge transfer; insist on open documentation |
| Contract lock-in | Auto-renewing 3-year contracts with steep exit penalties | Negotiate exit rights; cap termination fees |
| Ecosystem lock-in | Marketplace add-ons only from same vendor | Evaluate marketplace breadth and open integration |

### Reference Checks

Never skip reference checks. Prepare a structured set of questions:

1. What problem were you solving when you selected this vendor?
2. Did the implementation go as scoped? If not, what changed?
3. How does the product perform at your current scale?
4. How responsive is the vendor support team?
5. Would you select this vendor again? Why or why not?
6. What do you wish you had known before you started?

---

## Stage 6: Discovery Phase

### What Discovery Is

The discovery phase is a structured period of investigation that occurs after a vendor or approach is selected in principle but before detailed solution design begins. Its purpose is to understand the current state deeply enough to design the future state accurately.

!!! note "Discovery vs. Requirements Gathering"
    Requirements gathering is the process of documenting what the system must do. Discovery is broader: it surfaces pain points, uncovers hidden dependencies, identifies stakeholder conflicts, and validates that the problem framing from Stage 1 is still accurate.

### Workshop Design

Structure discovery workshops carefully:

```
Week 1: Stakeholder Interviews (individual, 60 min each)
Week 2: Current-State Process Workshops (2 hrs, cross-functional)
Week 3: Pain Point Prioritisation (half-day, key stakeholders)
Week 4: Future-State Visioning (full day, decision-makers + EA)
Week 5: Discovery Readout (2 hrs, sponsor + project board)
```

Keep workshops to 8 people or fewer. Above that threshold, dominant voices crowd out quieter stakeholders and the output loses nuance.

### Discovery Interview Guide — 15 Questions

The following questions are designed for one-on-one 60-minute stakeholder interviews. Adapt the language for technical vs. business audiences.

```markdown
## Discovery Interview Guide

**Preparation**
- Send questions 48 hours in advance
- Record with permission
- Have a note-taker separate from the interviewer
- Start by explaining how responses will be used

**Opening (5 min)**
0. Can you describe your role and how it relates to
   [the initiative]?

**Current State (20 min)**
1. Walk me through a typical [process] from start to finish.
   What does a good day look like?

2. Where does that process break down most often?
   Can you give me a specific recent example?

3. What workarounds has your team invented because the
   existing systems or processes don't support you?

4. What data do you need that you cannot currently get,
   or cannot get quickly enough?

5. How do you measure success in your area today?
   What metrics do you own?

**Pain Points (15 min)**
6. If you could fix one thing about the current system
   or process tomorrow, what would it be?

7. What is the most expensive mistake or failure you
   have seen in this area in the last 12 months?
   What caused it?

8. Which other teams or systems do you depend on
   that you feel are constraints on your effectiveness?

9. Are there compliance, regulatory, or audit requirements
   that the current system handles poorly?

**Future State (10 min)**
10. If the project succeeds perfectly, what does your
    day look like in 18 months' time?

11. What would tell you the project has succeeded?
    What would you measure?

12. What are you most worried about in this change?

**Stakeholder & Politics (5 min)**
13. Who else should I speak to that I may have missed?

14. Who has the most to gain from this change?
    Who has the most to lose?

15. Is there anything I haven't asked that you think
    I need to know?

**Closing (5 min)**
- Thank them
- Confirm how findings will be shared
- Ask if they are willing to review the discovery readout
```

### Current-State Documentation

Produce these artefacts from discovery:

1. **Current-state process maps** — swimlane diagrams for each key process
2. **System inventory** — every system touched by the process, with owner and integration type
3. **Data flow diagram** — where data originates, transforms, and lands
4. **Pain point register** — structured list of problems, owner, frequency, estimated cost
5. **Stakeholder map** — who cares about this, their stance (supportive/neutral/resistant), their influence

### Pain Point Mapping

Organise pain points by dimension:

| Dimension | Example Pain Points |
| --- | --- |
| Speed | "Report takes 4 days; business needs it same day" |
| Accuracy | "Data in System A contradicts System B — manual reconciliation weekly" |
| Cost | "20 FTE doing manual data entry that should be automated" |
| Risk | "Single person knows how to run the month-end close; no documentation" |
| Compliance | "We cannot produce the regulator's required audit trail" |
| Experience | "Customers call us because the portal fails 30% of the time" |

---

## Stage 7: Architecture Workshops

### Facilitating Mixed Business/Technical Audiences

Architecture workshops that include both business and technical participants are notoriously difficult. Business stakeholders disengage from technical depth; technical stakeholders disengage from business context. The EA must hold both.

!!! tip "The One-Page Architecture"
    Before any architecture workshop, produce a one-page diagram showing only what matters to the business audience. Leave the technical detail for the follow-on technical session. Never show a 40-box architecture diagram to a business stakeholder.

**Workshop structure that works:**

```
Hour 1: Business context (business lead presents — EA facilitates)
  - What are we trying to achieve?
  - What does success look like?
  - What constraints are non-negotiable?

Hour 2: Current state (EA presents — business validates)
  - Here is what we understand the current state to be
  - Here is where the pain lives in the architecture
  - Correct us where we have it wrong

Hour 3: Options (EA presents — mixed group evaluates)
  - Option A: [name] — here is the trade-off
  - Option B: [name] — here is the trade-off
  - Option C: [name] — here is the trade-off
  - Which trade-offs can we live with?

Hour 4: Decisions and actions
  - Record decisions with rationale
  - Record open questions with owner and due date
  - Confirm next steps
```

### Capturing Decisions

Use a structured Architecture Decision Record (ADR) for every significant decision made in a workshop:

```markdown
## ADR-[NNN]: [Decision Title]

**Date:** [Date]
**Status:** Accepted | Proposed | Deprecated | Superseded

**Context**
[What situation led to this decision? What forces were at play?]

**Decision**
[What was decided, stated clearly.]

**Rationale**
[Why this option over the alternatives? What evidence
 or principles drove the choice?]

**Consequences**
Positive: [What becomes easier or better?]
Negative: [What becomes harder or worse?]
Risks:    [What could go wrong with this decision?]

**Alternatives Considered**
- [Alternative 1] — rejected because [reason]
- [Alternative 2] — rejected because [reason]

**Reviewed by**
[Names and roles of people who validated this decision]
```

---

## Stage 8: Cost Estimation

### Components of a Technology Cost Estimate

A complete cost estimate covers:

| Category | Examples |
| --- | --- |
| Software licences | Perpetual licences, SaaS subscriptions, usage-based fees |
| Infrastructure | Cloud compute, storage, networking, DR environment |
| Implementation | Vendor professional services, SI fees, internal staff cost |
| Integration | Development effort for each integration point |
| Data migration | Extract, transform, cleanse, load, validation effort |
| Testing | Test environment, test tool licences, testing effort |
| Training | Content development, delivery, lost productivity |
| Change management | Communications, coaching, process redesign |
| Ongoing operations | Support costs, patching, monitoring, licence renewals |
| Contingency | See below |

### Estimation Approaches

**Analogous Estimation**

Uses cost data from similar past projects. Fast but rough. Appropriate for early-stage sizing when you need a number for budget conversations.

- Accuracy: typically ±50% at this stage
- Input needed: a comparable past project and its actual cost
- Risk: projects feel more similar than they are

**Parametric Estimation**

Derives cost from measurable parameters (e.g., number of integration points × average cost per integration). More accurate than analogous if your parameters are well-calibrated.

- Accuracy: typically ±30%
- Input needed: historical cost data for each parameter type
- Risk: parameters may not be independent of each other

**Bottom-Up Estimation**

Breaks the work into atomic tasks, estimates each task, and rolls up. Most accurate but most time-consuming. Requires a detailed scope.

- Accuracy: typically ±10–20%
- Input needed: detailed scope, skilled estimators
- Risk: unknown unknowns are not in the breakdown

### Contingency

!!! warning "Never Present an Estimate Without Contingency"
    An estimate without contingency is not an estimate — it is an aspiration. Every technology project encounters the unexpected. Presenting a no-contingency number and then asking for more money later destroys credibility.

Contingency guidelines by stage and complexity:

| Project Stage | Low Complexity | Medium Complexity | High Complexity |
| --- | --- | --- | --- |
| Concept (pre-discovery) | 40% | 60% | 80%+ |
| Post-discovery | 25% | 35% | 50% |
| Post-design | 15% | 20% | 30% |
| Post-build start | 10% | 15% | 20% |

---

## Stage 9: Technology Selection

### Build / Buy / Partner / Rent Matrix

Before evaluating specific products, establish the make-or-buy posture:

| Option | Definition | Best When | Avoid When |
| --- | --- | --- | --- |
| Build | Internal development of custom software | Capability is a competitive differentiator; no market solution fits | Commodity capability; limited engineering capacity |
| Buy | Purchase commercial off-the-shelf (COTS) software | Mature market; capability is not differentiating | Heavy customisation will be needed (kills the value of COTS) |
| Partner | Co-development or white-labelling with a third party | You need speed and some differentiating capability | Partner's roadmap is not aligned with yours |
| Rent | SaaS / PaaS subscription | Standard capability; you want to avoid infrastructure ops | Data sovereignty concerns; deep integration requirements |

### Evaluation Scoring Template

```markdown
## Technology Evaluation: [Capability Area]
## Evaluation Date: [Date]
## Evaluators: [Names and roles]

### Evaluation Criteria and Weights

| Criterion                  | Weight |
|----------------------------|--------|
| Functional fit             | 25%    |
| Technical architecture fit | 20%    |
| Security & compliance      | 15%    |
| Vendor stability           | 10%    |
| Implementation risk        | 10%    |
| TCO (3-year)               | 10%    |
| Scalability                | 5%     |
| Ecosystem / community      | 5%     |

### Scoring (1=Poor, 5=Excellent)

| Criterion              | Weight | Option A | Option B | Option C |
|------------------------|--------|----------|----------|----------|
| Functional fit         | 25%    |          |          |          |
| Technical arch fit     | 20%    |          |          |          |
| Security & compliance  | 15%    |          |          |          |
| Vendor stability       | 10%    |          |          |          |
| Implementation risk    | 10%    |          |          |          |
| TCO (3-year)           | 10%    |          |          |          |
| Scalability            | 5%     |          |          |          |
| Ecosystem / community  | 5%     |          |          |          |
| **Weighted Total**     | 100%   |          |          |          |

### Recommendation
[Selected option and rationale — connect back to business objectives]
```

### TCO Comparison

Total Cost of Ownership must be calculated over at least 3 years, ideally 5:

```
TCO = Acquisition cost
    + Implementation cost
    + Integration cost
    + Annual licence / subscription (× years)
    + Annual support and maintenance
    + Annual infrastructure
    + Periodic upgrade cost
    + Decommission / exit cost
    - Avoided costs (systems replaced, FTE reduction, etc.)
```

---

## Stage 10: Risk Assessment

### Risk Matrix Format

Every risk is assessed on two dimensions:

```
         IMPACT
         Low    Medium    High    Critical
L    │   Low    │  Low   │ Medium │  High  │
i High│         │        │        │        │
k    ├──────────┼────────┼────────┼────────┤
e    │   Low    │Medium  │  High  │Critical│
l Med│          │        │        │        │
i    ├──────────┼────────┼────────┼────────┤
h    │  Very   │  Low   │  Low   │ Medium │
o Low│  Low    │        │        │        │
o    └──────────┴────────┴────────┴────────┘
d
```

### Risk Register Template

```markdown
## Risk Register: [Project Name]
## Version: [x.x]  Last Updated: [Date]

| ID    | Risk Description          | Category   | Probability | Impact   | Rating   | Owner     | Mitigation                         | Contingency                      | Status |
|-------|---------------------------|------------|-------------|----------|----------|-----------|------------------------------------|----------------------------------|--------|
| R-001 | Key vendor goes insolvent | Commercial | Low         | Critical | High     | Procurement | Escrow source code; multi-vendor strategy | Activate escrow; emergency re-platform plan | Open |
| R-002 | Data migration quality    | Technical  | Medium      | High     | High     | Data Lead | Data profiling in discovery; dry runs | Manual correction sprint; phased go-live | Open |
| R-003 | Business change fatigue   | People     | High        | Medium   | High     | PM / OCM  | Phased rollout; dedicated change mgmt | Delay non-critical phases | Open |
```

**Risk categories to always check:**

- Technical: integration failure, performance, scalability, security vulnerability
- Commercial: vendor financial stability, contract terms, cost overrun
- Delivery: scope creep, resource availability, dependency on third parties
- People: change resistance, skill gaps, key person dependency
- Regulatory: compliance deadline, data protection, industry regulation
- Strategic: business priority change, executive sponsor departure

---

## Stage 11: Business Case Development

The business case is the formal document that combines the cost estimate, risk assessment, benefit projection, and option analysis into a single investment request.

!!! note "See Module 6"
    Business case development is covered in depth in **Module 6 — Business Case and Benefits Realisation**. This module focuses on the proposal lifecycle; Module 6 goes deep on financial modelling, NPV, payback period, and writing a compelling investment narrative.

At this stage in the lifecycle, the EA's job is to ensure that the architecture work feeds the business case correctly:

- Cost estimates from Stage 8 flow into the financial model
- Technology selection rationale from Stage 9 justifies the recommended option
- Risk register from Stage 10 populates the risk section
- Architecture diagrams illustrate the solution

---

## Stage 12: Proposal Writing

Proposal writing is the skill of translating everything produced in Stages 1–11 into a coherent, persuasive document that a non-technical executive can read in 15 minutes and a technical evaluator can scrutinise over several hours.

!!! note "See Module 7"
    Proposal writing is covered in depth in **Module 7 — Writing Winning Proposals**. That module covers document structure, executive summary technique, narrative arc, and how to handle objections in writing.

Key principles from the EA's perspective:

1. **Lead with the problem, not the solution.** The first section must state the business problem clearly enough that any reader recognises it.
2. **Architecture diagrams must be explainable in one sentence.** If you cannot label the diagram and explain it in one sentence, it is too complex for the proposal.
3. **Every number must be traceable.** If your cost estimate says £4.2M, the reader should be able to ask "where does the £4.2M come from?" and you should have a breakdown.
4. **Name the recommended option.** Executives do not want three options with no recommendation. Give a recommendation and defend it.

---

## Stage 13: Architecture Review Board (ARB)

### What the ARB Does

The ARB (also called Architecture Review Board, Architecture Review Committee, or Design Authority depending on your organisation) is a governance body that reviews significant technology decisions to ensure they conform to enterprise architecture standards.

In the context of a proposal, the ARB review is the gate between "proposal approved by the business" and "approved to proceed into delivery."

### How to Prepare for an ARB Review

Preparation determines outcome. Start 4 weeks before the ARB date:

```
Week -4: Identify the ARB members and their known concerns
         Review the ARB terms of reference and standards
         Confirm what artefacts the ARB requires

Week -3: Prepare draft artefacts (architecture diagram, ADRs,
         non-functional requirements mapping, risk register)
         Share with a friendly ARB member for informal feedback

Week -2: Incorporate feedback
         Prepare for likely objections (see below)
         Brief your executive sponsor on the ARB process

Week -1: Distribute artefacts to ARB per their required notice period
         Confirm the meeting logistics
         Prepare a 10-minute presentation (not 45 minutes)

ARB Day: Present for 10 minutes, leave 50 minutes for questions
         Have subject matter experts in the room (security, data, infra)
         Never defend — explain. "That's a good challenge. Here's the trade-off..."
```

### Common ARB Objections and How to Respond

| Objection | What It Really Means | Response Strategy |
| --- | --- | --- |
| "This doesn't align with our cloud strategy" | You are proposing something on the wrong cloud | Show the alignment; if misaligned, show the waiver path |
| "How does this affect our data platform?" | Concern about data duplication or inconsistency | Show the data flow; explain the integration pattern |
| "The NFRs are not specific enough" | They want measurable targets, not platitudes | Come with specific numbers: "99.9% availability = 8.7 hours downtime per year" |
| "We already have a capability that does this" | Concerned about portfolio duplication | Acknowledge it; show why this is different or explain the migration path |
| "The risk register is thin" | They don't trust a short risk register | Add depth: "Here are 12 risks we identified and why we rate them as we do" |
| "Who maintains this post go-live?" | No visible operations model | Present the target operating model explicitly |

### When ARB Rejects or Defers

A rejection is not a failure if you learn from it. Common reasons for rejection:

- Incomplete artefacts (preventable — follow their checklist)
- Unresolved security concern (preventable — loop in security team early)
- Missing alternative analysis (preventable — always bring Option A vs. B)
- No executive sponsor visible (fixable — get your sponsor in the room)

If deferred, get specific written conditions for re-submission. Verbal conditions drift.

---

## Stage 14: Executive Approval

### Decision Rights Matrix

Before you book the executive approval meeting, understand who has the authority to approve:

```markdown
## Decision Rights Matrix Example

| Decision Type          | Approval Authority        | Threshold     |
|------------------------|---------------------------|---------------|
| Technology selection   | CTO                       | Any           |
| Capital spend < £500K  | Divisional Director       | < £500K       |
| Capital spend < £2M    | CIO                       | £500K–£2M     |
| Capital spend > £2M    | Investment Committee      | > £2M         |
| Data processor change  | DPO + Legal               | Any           |
| Cloud residency change | CTO + CISO                | Any           |
| New vendor contract    | Procurement + Legal + CTO | > £100K       |
```

Understanding this matrix prevents the common mistake of getting approval from someone who turns out not to have the authority to give it.

### What Executives Look For

Executives review proposals differently from architects. They are looking for:

1. **Is the problem real?** Does this match what I hear from the business?
2. **Is the cost credible?** Does this number feel right for the scope?
3. **Who is accountable?** Is there a named owner for delivery?
4. **What is the downside?** What happens if this goes wrong?
5. **What is the alternative?** What happens if we do nothing?
6. **Do I trust the people presenting this?** Have they delivered before?

!!! tip "The Two-Minute Rule"
    Prepare a two-minute verbal summary that you can deliver if the executive's assistant tells you "You have five minutes, not thirty." It should cover: the problem, the recommended solution, the cost, the biggest risk, and what you need approved today.

---

## Stage 15: Negotiation

### Commercial Basics

EA's are often excluded from commercial negotiation. This is a mistake. Architecture decisions have commercial implications, and commercial decisions have architecture implications. Insist on being in the room, or at minimum being consulted on every technical commercial term.

Key commercial terms with architecture implications:

| Term | Architecture Concern |
| --- | --- |
| Licence model (per user / per transaction / unlimited) | Affects cost at scale; model your growth |
| Data volume pricing | At what point does your data volume break the pricing tier? |
| SLA and credits | Are the SLA metrics the right ones? Credits are rarely the right incentive |
| Source code escrow | Required for any custom-developed or heavily customised software |
| Audit rights | Can you audit the vendor's security and operations? |
| Exit rights and data portability | What format does your data come back in when you leave? |
| Intellectual property | Who owns customisations you pay to have built? |

### Vendor Negotiation Tactics (and Counter-Tactics)

| Vendor Tactic | What Is Happening | Counter |
| --- | --- | --- |
| "This price is only valid until Friday" | Artificial urgency to prevent competitive comparison | "We will extend our RFP process if needed. The deadline is ours, not yours." |
| "Our reference customer list is confidential" | Hiding weak references | "References are a mandatory RFP criterion. No references = disqualification." |
| "The integration is straightforward" | Underestimating integration to win the deal | "We need that in writing in the SOW with a fixed-price commitment." |
| "We can customise that" | Yes, for an uncapped professional services engagement | "Define 'customise' in the contract. Time and materials or fixed price?" |
| "Our roadmap will solve that" | Selling vapourware | "We require that capability to be generally available before contract signature." |

### What Is Negotiable

Almost everything is negotiable with the right leverage. Common areas:

- Licence fees (especially first-year discount for early commitment)
- Implementation fees (especially if you can offer referenceable case study)
- Contract term (shorter terms favour you if you are uncertain)
- Payment milestones (align payments to delivery milestones, not calendar dates)
- SLA credits (push for service credits meaningful relative to contract value)
- Price cap on renewals (year-on-year price increases must be capped)

---

## Stage 16: Implementation Planning

### Transition to Delivery

The proposal process ends and the delivery process begins at contract signature. But the transition is where things most often go wrong. Common problems:

- The delivery team did not read the proposal and makes different assumptions
- The delivery governance is different from the proposal governance
- Lessons from discovery are not carried forward into design

### Governance Setup

Establish governance before the first delivery sprint begins:

```markdown
## Project Governance Model

**Sponsoring Executive:** [Name, Role]
  - Accountable for business outcomes
  - Chairs Steering Committee
  - Escalation endpoint for delivery team

**Steering Committee:** [monthly]
  - Executive Sponsor + Business Lead + CTO/CIO
  - Receives: RAG status, financial actuals vs. plan, risk log
  - Decides: scope changes above threshold, budget movements

**Project Board:** [fortnightly]
  - PM + EA + Business Lead + Vendor Lead
  - Receives: milestone status, issue log, change requests
  - Decides: scope changes within threshold, resource allocation

**Technical Design Authority:** [weekly]
  - EA + Lead Architect + Security + Data
  - Receives: design proposals, ADRs
  - Decides: architecture decisions, standards waivers
```

### What EA Carries Forward into Delivery

- Architecture Decision Records (maintain through delivery)
- Non-functional requirements (must be tested, not just documented)
- Risk register (hand over to PM; review monthly)
- Integration inventory (becomes the integration design document)
- Discovery interview findings (feed into acceptance testing)

---

## Stage 17: Benefits Realisation

### Tracking Promised Benefits

Benefits realisation is the stage most often skipped. The proposal promised benefits; those benefits must be tracked to confirm they were delivered.

!!! warning "The Credibility Gap"
    If your organisation's proposals promise benefits that are never measured, executives stop believing the numbers. This makes future proposals harder to approve. Benefits realisation is not optional — it is how EA builds institutional credibility.

### Benefits Register Format

```markdown
## Benefits Register: [Project Name]

| ID    | Benefit Description          | Category   | Metric              | Baseline | Target   | Owner        | Measurement Date | Actual | Status |
|-------|------------------------------|------------|---------------------|----------|----------|--------------|------------------|--------|--------|
| B-001 | Reduce claims processing time| Efficiency | Avg days per claim  | 14 days  | 5 days   | Ops Director | Month 3 post-live |        | Pending|
| B-002 | Reduce manual FTE            | Cost       | FTE count (ops)     | 45 FTE   | 30 FTE   | HR / Ops     | Month 6 post-live |        | Pending|
| B-003 | Improve customer CSAT        | Experience | CSAT score          | 62%      | 75%      | CX Lead      | Month 6 post-live |        | Pending|
| B-004 | Regulatory audit pass rate   | Compliance | Audit findings      | 12/year  | 0/year   | Risk Officer | Month 12         |        | Pending|
```

### Post-Implementation Review

Conduct a structured post-implementation review 3–6 months after go-live:

1. **Benefits assessment** — compare actuals to benefits register
2. **Cost reconciliation** — compare actual spend to proposal estimate
3. **Quality assessment** — NFRs: are they being met in production?
4. **Lessons learned** — what would you do differently?
5. **Risks that materialised** — review which risks actually occurred; calibrate future estimates
6. **Vendor performance** — was the vendor's implementation as promised?

---

## End-to-End Scenario: Global Insurance Company Claims Modernisation

### Context

A global insurance company with operations in 14 countries is running a 20-year-old mainframe-based claims processing system. The system processes 2 million claims per year. It is reaching end-of-support, cannot integrate with modern fraud detection tools, and is preventing the business from offering self-service claims via mobile. The company has engaged an EA practice to lead the modernisation programme.

### Stage 1: Opportunity Identification

The CTO identified the opportunity through the annual technology roadmap review. The mainframe vendor announced end-of-extended-support in 36 months. The business simultaneously raised a strategic objective to launch a mobile claims app within 18 months — an objective blocked by the current system's API limitations. The EA team documented the opportunity in a one-page brief and secured a mandate from the CTO to proceed to market.

**What went right:** The EA team connected the technical EOL risk to the business strategic objective, making the case for urgency.

### Stage 2: RFI

The EA team issued an RFI to 11 vendors across three categories: core claims platforms, cloud-native insurtech startups, and system integrators offering managed migration. Twelve weeks later, 9 responded.

**What went wrong:** The RFI asked vendors to describe their integration with the company's document management system. Three vendors gave generic answers. Post-evaluation, the team discovered this was because the question was ambiguous — "integration" could mean API, file transfer, or native connector. The lesson: be specific in RFI questions.

**Resolution:** A clarification email was sent mid-RFI period, and vendors were given an extra week to amend responses.

### Stage 3: RFP

Based on RFI evaluation, four vendors were shortlisted for the RFP. The EA team wrote a 60-page RFP with:

- 142 functional requirements
- 38 non-functional requirements
- Full architecture standards appendix
- A data model appendix describing the existing claims data schema

**What went right:** Including the data model appendix produced significantly better responses. Vendors could propose specific migration approaches rather than generic statements.

**What went wrong:** The evaluation panel included 9 people — too large. Scoring meetings became debates rather than evaluations. Recommendation: keep the evaluation panel to 5 people; use a wider group for input but a small group for scoring.

### Stage 4: RFQ

Not used in this engagement — the solution was not sufficiently defined for an RFQ.

### Stage 5: Pre-Sales and PoC

Two vendors were invited to run parallel PoCs over 6 weeks. Success criteria were defined upfront: process a sample batch of 10,000 historical claims with documented accuracy > 99.5%; demonstrate the mobile API within 4 hours of setup.

**What went wrong:** One vendor's PoC team was significantly more senior than their implementation team. This was only discovered during reference calls — a reference customer warned that "the people who demo are not the people who deliver." The team added a team continuity clause to the contract: named individuals for the first 12 months of the project.

### Stage 6: Discovery

Six weeks of structured discovery across 4 countries. 34 stakeholder interviews. Six process workshops. Three technical deep-dives.

**Key finding:** A parallel claims system existed in the German subsidiary that was not captured in the initial inventory. It handled 150,000 claims per year and had been built locally to handle German regulatory requirements. This fundamentally changed the integration scope.

**What went wrong:** The discovery interview guide was not translated — German interviews were conducted in English, which produced shallower responses from non-native English speakers. Subsequent interviews were conducted in German with a translator, revealing the hidden system.

**Lesson:** Discovery must be culturally as well as technically thorough in multi-geography programmes.

### Stage 7: Architecture Workshops

Four architecture workshops were run across the discovery period. The most valuable was a half-day session with the claims operations director and the lead architect. The business stakeholder challenged the proposed event-driven architecture: "What happens to a claim if the messaging system is down?"

This challenge led to the team adopting a saga pattern with local persistence — a more resilient design than the original proposal. **Business stakeholders asking "what if" questions often surface architectural weaknesses that purely technical workshops miss.**

### Stage 8: Cost Estimation

Bottom-up estimation produced a total programme cost of £38M over 3 years, with 30% contingency (£11.4M) giving a total of £49.4M. The CFO challenged the contingency as excessive.

**The team's response:** The team presented the risk register and explained that the contingency corresponded to identified risks with measurable impact. They offered to reduce contingency to 20% if three specific risks were accepted by the business as "accepted risks" rather than mitigated risks. The CFO accepted this, and the contingency was set at 25% (£9.5M) with explicit risk acceptance documented.

**Lesson:** Contingency must be defensible. Attach contingency to named risks.

### Stage 9: Technology Selection

The evaluation scoring template produced a clear winner — a tier-1 claims platform vendor. However, the second-highest-scoring option (a cloud-native insurtech startup) scored higher on scalability and integration ease, but lower on vendor stability (Series B funding, 4 years old).

The team recommended the established vendor with a formal risk acceptance on the lower scalability score, noting that the current claims volume did not require the higher-scoring option's scalability capabilities within the 5-year planning horizon.

### Stage 10: Risk Assessment

The risk register contained 34 risks at peak. The top three by rating:

1. **Data quality risk** (High probability, Critical impact): 20-year-old mainframe data had inconsistent encoding, missing fields, and business rules embedded in COBOL that were not documented. Mitigation: 3-month data profiling sprint before migration design.
2. **Regulatory approval delay** (Medium probability, High impact): Regulatory notification was required in 7 countries. Approval timelines were unknown. Mitigation: engage regulatory affairs team immediately; build 8-week buffer into the plan.
3. **Change fatigue** (High probability, Medium impact): This was the third major system change in 4 years in the claims division. Mitigation: invest in change management; sequence rollout with quieter operational periods.

### Stage 11–12: Business Case and Proposal

The business case projected a 5-year NPV of £22M (post-implementation costs). The single-page executive summary stated the decision simply: "Our current claims system reaches end-of-support in 28 months. If we proceed now, we avoid £12M in EOL risk costs, deliver the mobile claims capability 14 months faster than the alternative approach, and achieve a positive NPV in year 3. We are requesting £49.4M in capital budget. We recommend Option B."

### Stage 13: ARB

The ARB raised two objections:

1. The proposed event-driven messaging layer was not on the approved middleware list.
2. The data residency approach for the German subsidiary required a standards waiver for cross-border data flows.

**Resolution:** Objection 1 was resolved by demonstrating that the approved middleware could not meet the NFR for throughput (500 events/second peak); a standards waiver was approved. Objection 2 required 3 weeks of additional work with the DPO and Legal team to document the cross-border transfer mechanism under SCCs.

**Lesson:** Security and data privacy concerns should be pre-socialised with the DPO before ARB, not discovered at ARB.

### Stage 14: Executive Approval

The Investment Committee approved the programme at the third meeting attempt. The first two meetings were cancelled due to scheduling conflicts. The EA team used the delay productively — they conducted additional reference calls and refined the vendor shortlist commercial analysis.

### Stage 15: Negotiation

Key negotiated terms:

- 18% reduction in Year 1 licence fee in exchange for a published case study
- Fixed-price implementation for the first phase (migration planning and design)
- Price cap of CPI+2% on annual licence renewals
- Team continuity clause: named individuals for 12 months
- Exit clause: data export in open format (CSV/Parquet) within 30 days of notice

### Stage 16: Implementation Planning

The programme was structured into four phases over 36 months. Governance was established before the first sprint began. The EA produced a "transition pack" summarising every key discovery finding, architecture decision, and risk item for the delivery team's handover session.

**What went wrong:** The delivery PM was not involved in the proposal process. They received the transition pack but had not been through the discovery process and questioned several assumptions. Three weeks of re-validation work were needed.

**Lesson:** Involve the delivery lead in the last 4 weeks of the proposal process, before handover.

### Stage 17: Benefits Realisation

At Month 6 post-go-live (Phase 1: Germany pilot):

| Benefit | Target | Actual | Status |
| --- | --- | --- | --- |
| Claims processing time | 9 days → 4 days | 9 days → 5.5 days | Partially achieved |
| Fraud detection rate | 2.1% → 4.0% | 2.1% → 3.6% | Partially achieved |
| Manual processing FTE | 12 FTE → 7 FTE | 12 FTE → 9 FTE | Delayed — HR process |
| System availability | 94% → 99.5% | 99.7% | Exceeded |

The shortfalls on claims processing time and fraud detection were tracked to a data quality issue discovered during migration — the 20-year-old data had lower completeness than the profiling sprint estimated. A remediation sprint was planned for Month 9.

---

## Proposal Lifecycle Checklist

Use this checklist to track progress through every stage. Each item maps to a specific stage.

```markdown
## Enterprise Proposal Lifecycle Checklist

### Stage 1: Opportunity Identification
- [ ] Problem statement documented in business terms
- [ ] Affected stakeholder groups identified
- [ ] Urgency and strategic alignment assessed
- [ ] Initial sizing (T-shirt) completed
- [ ] Executive sponsor identified

### Stage 2: RFI
- [ ] RFI decision rationale documented (why RFI vs. direct to RFP)
- [ ] Target vendor list compiled and approved by procurement
- [ ] RFI questions reviewed by EA, business lead, and procurement
- [ ] RFI issued with adequate response time (minimum 3 weeks)
- [ ] Evaluation scoring matrix prepared before responses arrive
- [ ] Responses scored and shortlist documented with rationale

### Stage 3: RFP
- [ ] RFP scope defined (in-scope and out-of-scope explicit)
- [ ] Functional requirements numbered and tagged MUST/SHOULD/MAY
- [ ] Non-functional requirements numbered and measurable
- [ ] Architecture standards appendix included
- [ ] Data appendix included (volumes, schema overview)
- [ ] Evaluation criteria and weights published in RFP
- [ ] Proposal format requirements specified
- [ ] Commercial pricing template provided
- [ ] Q&A process and contact rules documented
- [ ] Cross-functional evaluation panel (≤5 scorers) established
- [ ] Independent scoring completed before panel convening
- [ ] Scoring rationale documented

### Stage 4: RFQ (if applicable)
- [ ] Confirmed that solution is sufficiently defined for RFQ
- [ ] Specifications documented in sufficient detail for price comparison

### Stage 5: Pre-Sales and PoC
- [ ] PoC objectives documented
- [ ] PoC success criteria defined before PoC begins
- [ ] PoC environment agreed (vendor sandbox / customer dev)
- [ ] Test data identified and approved for use
- [ ] Vendor lock-in analysis completed
- [ ] Reference checks completed with structured questions
- [ ] Team continuity expectations documented

### Stage 6: Discovery
- [ ] Discovery workplan approved by sponsor
- [ ] Stakeholder interview list approved
- [ ] Interview guide prepared and reviewed
- [ ] Current-state process maps produced
- [ ] System inventory completed
- [ ] Data flow diagram produced
- [ ] Pain point register compiled and prioritised
- [ ] Discovery readout presented to sponsor
- [ ] Hidden systems / shadow IT documented

### Stage 7: Architecture Workshops
- [ ] Workshop plan approved (objectives, attendees, dates)
- [ ] One-page architecture diagram prepared for business audience
- [ ] Options prepared with trade-offs (minimum 2 options)
- [ ] Architecture Decision Records (ADRs) written for each decision
- [ ] Open questions list maintained with owners

### Stage 8: Cost Estimation
- [ ] Estimation approach documented (analogous / parametric / bottom-up)
- [ ] All cost categories covered (licence, implementation, integration, migration, training, ops)
- [ ] Contingency rate justified and documented
- [ ] Estimate reviewed by Finance
- [ ] Sensitivity analysis completed (best / base / worst)

### Stage 9: Technology Selection
- [ ] Build/Buy/Partner/Rent analysis completed
- [ ] Evaluation scoring template completed for all options
- [ ] TCO calculated over minimum 3 years
- [ ] Recommended option stated with clear rationale
- [ ] Dissenting views documented

### Stage 10: Risk Assessment
- [ ] Risk register created with all categories covered
- [ ] Each risk: probability, impact, rating, owner, mitigation, contingency
- [ ] Top 10 risks briefed to sponsor
- [ ] Risk register version-controlled

### Stage 11: Business Case
- [ ] Financial model completed (NPV, payback, IRR)
- [ ] Benefits quantified and attributed to owners
- [ ] Cost estimate integrated
- [ ] "Do nothing" scenario costed
- [ ] Sensitivity analysis included
- [ ] See Module 6 for full checklist

### Stage 12: Proposal Writing
- [ ] Executive summary: one page, problem-first
- [ ] Recommended option stated clearly
- [ ] All numbers traceable to source data
- [ ] Architecture diagrams explained in plain language
- [ ] Reviewed by sponsor before submission
- [ ] See Module 7 for full checklist

### Stage 13: ARB
- [ ] ARB artefacts checklist obtained from ARB secretariat
- [ ] Draft artefacts shared with friendly ARB member in advance
- [ ] Security team pre-briefed
- [ ] DPO pre-briefed on data-related decisions
- [ ] Artefacts distributed with required notice period
- [ ] Presentation prepared (≤10 minutes)
- [ ] Subject matter experts confirmed for the meeting
- [ ] All ARB conditions documented in writing post-meeting

### Stage 14: Executive Approval
- [ ] Decision rights matrix confirmed
- [ ] Correct approval authority identified
- [ ] Two-minute verbal summary prepared
- [ ] Sponsor briefed before the approval meeting
- [ ] Approval documented in writing

### Stage 15: Negotiation
- [ ] EA involved in commercial negotiations
- [ ] Architecture-critical commercial terms reviewed by EA
- [ ] Lock-in terms negotiated (exit rights, data portability)
- [ ] Team continuity clause included
- [ ] Price escalation caps agreed
- [ ] SLA credits reviewed for meaningfulness

### Stage 16: Implementation Planning
- [ ] Governance model documented before first sprint
- [ ] Delivery lead onboarded to proposal context
- [ ] Transition pack produced and reviewed by delivery team
- [ ] Architecture Decision Records handed over
- [ ] Non-functional requirements assigned to test plan
- [ ] Risk register handed to PM

### Stage 17: Benefits Realisation
- [ ] Benefits register completed before go-live
- [ ] Baseline measurements taken pre-go-live
- [ ] Measurement owners confirmed
- [ ] Benefits review dates scheduled (3m, 6m, 12m post go-live)
- [ ] Post-implementation review conducted and findings documented
```

---

## Five Teaching Lenses

### Lens 1: Beginner

If you are new to proposals, the most important insight is this: a proposal is a conversation made permanent. Everything in the lifecycle — the RFI, the workshops, the risk register, the business case — is preparation for a conversation with a decision-maker who will say yes or no. Your job is to make that conversation as easy as possible. That means knowing the problem better than anyone else, knowing the options and trade-offs, knowing the risks you are accepting, and being able to explain all of it in plain language.

Start by mastering Stages 6 (Discovery) and 7 (Architecture Workshops). These are the stages where EA creates the most value and where the quality of everything downstream is determined.

### Lens 2: Enterprise

In large enterprises, the proposal lifecycle is rarely linear. You will have parallel workstreams, multiple decision gates, and governance processes that interleave. The critical skill is orchestration: knowing which stage each workstream is in, what dependencies exist between them, and which decisions are blocking others.

Enterprise proposals also involve procurement, legal, finance, and security — each with their own processes and timelines. EA must be the connective tissue, not the isolated expert.

### Lens 3: Architecture

From an architecture perspective, the proposal lifecycle is a series of progressive constraint-setting exercises. Each stage narrows the solution space:

```
Opportunity identified → problem is a constraint
RFP written         → requirements are constraints
Discovery complete  → current-state realities are constraints
Architecture workshop → design decisions are constraints
Technology selected   → implementation pattern is a constraint
ARB approved         → standards compliance is a constraint
```

Your job as EA is to ensure that the constraints that accumulate are the right ones — that you are narrowing the solution space intentionally, not accidentally.

### Lens 4: Executive

Executives see the proposal lifecycle as a risk management process. They are approving budget for an uncertain outcome. Your proposal must answer three questions:

1. Is the problem worth solving? (Is the pain real and quantified?)
2. Is this the right solution? (Did we look at alternatives?)
3. Can we deliver it? (Do we have a credible delivery plan?)

Everything else — the architecture diagrams, the technical requirements, the ARB process — is evidence in support of those three answers.

### Lens 5: Consultant

For external consultants proposing services (rather than products), the proposal lifecycle has an additional dimension: you are selling trust. The client cannot evaluate your deliverable before they buy it. They are evaluating your methodology, your team, and your track record as proxies for quality.

This means discovery (Stage 6) is not just a technical exercise — it is a trust-building exercise. Showing that you understood the client's problem better than their own teams did is the strongest proposal differentiator.

---

## Common Mistakes at Each Stage

The following mistakes are drawn from real engagement experience. At least one of these will occur in any large proposal — knowing them in advance is the only defence.

| Stage | Common Mistake | Why It Happens | How to Prevent |
| --- | --- | --- | --- |
| Opportunity ID | Framing the problem as a technology problem | EA's natural instinct | Force a "so what for the business?" test on every problem statement |
| RFI | Issuing an RFI when you already know the answer | Procurement compliance theatre | Be honest internally; if you know the answer, document why and proceed to RFP |
| RFI | Asking vague questions | Written by committee | Single editor with a review cycle; test each question: "What would a bad answer to this look like?" |
| RFP | Writing requirements as solutions ("must use Kubernetes") | Architecture bias | Requirements must describe the need, not the solution |
| RFP | Evaluation panel too large | Desire to be inclusive | Cap at 5 scorers; use wider group for input |
| RFQ | Using RFQ when scope is not well-defined | Impatience with RFP process | Checklist: "Can I define exactly what I want to buy?" If no, use RFP |
| Pre-Sales | Not defining PoC success criteria upfront | Trusting the vendor to "show us what it can do" | Written PoC success criteria signed by both parties before PoC begins |
| Pre-Sales | Demo team ≠ delivery team | Not asking | Ask vendor to name the implementation team; call their references about implementation quality |
| Discovery | Interviewing only people who support the project | Natural political gravity | Explicitly include sceptics; they give the most valuable information |
| Discovery | Missing shadow IT and workarounds | People don't volunteer information about unofficial systems | Specifically ask about workarounds in the interview guide |
| Architecture workshops | Architecture diagrams too complex for business audience | Showing your work | Prepare two versions: one for business, one for technical |
| Cost estimation | No contingency | Pressure to present a low number | Attach contingency to specific named risks; make it defensible |
| Technology selection | Selection driven by vendor relationship, not evaluation | Pre-existing preferences | Blind scoring before panel convening; document rationale |
| Risk assessment | Risk register written, then forgotten | Risk as compliance checkbox | Risk register is a live document; review at every steering committee |
| ARB | Discovering security concern at ARB | Not pre-briefing the security team | Brief security and DPO 4 weeks before ARB |
| ARB | Presenting for 45 minutes with 15 minutes for questions | Over-preparing the presentation | 10 minutes presentation, 50 minutes questions is the right ratio |
| Executive approval | Wrong approval authority | Not understanding the decision rights matrix | Map the decision rights matrix before scheduling the approval meeting |
| Negotiation | EA excluded from commercial negotiations | "That's procurement's job" | Architecture-critical commercial terms require EA involvement |
| Implementation | Delivery team not reading the proposal | Silos between proposal and delivery | Conduct a formal handover session; delivery lead reads transition pack |
| Benefits realisation | Benefits never measured | "We'll do that later" | Benefits register and measurement plan must be completed before go-live |

---

## Mastery Checklist

You have mastered the enterprise proposal lifecycle when you can answer yes to all 20 items below.

```markdown
## Proposal Lifecycle Mastery Checklist

Architecture and Problem Framing
- [ ] 1. I can write a problem statement in business terms without using
         technical jargon, and test it by asking a non-technical
         colleague if it resonates.

- [ ] 2. I can identify which of the three proposal types applies
         to a given situation and explain the difference to a
         colleague in under 2 minutes.

- [ ] 3. I can design a discovery interview guide tailored to the
         specific problem and audience, and conduct the interview
         without the questions feeling scripted.

- [ ] 4. I can produce a one-page architecture diagram that a
         non-technical executive can understand without a glossary.

- [ ] 5. I can facilitate a mixed business/technical workshop and
         keep both audiences engaged for 4 hours.

Procurement and Vendor Management
- [ ] 6. I can distinguish when an RFI is needed versus when to
         proceed directly to RFP.

- [ ] 7. I can write a technical requirements section (functional
         and non-functional) that is specific enough for vendors
         to respond precisely.

- [ ] 8. I can design a PoC with written success criteria before
         the PoC begins and evaluate the results objectively.

- [ ] 9. I can identify the top 5 vendor lock-in risks for a given
         technology category and propose contractual mitigations.

- [ ] 10. I can conduct a structured vendor reference call and
          extract the information that does not appear in the
          reference's prepared remarks.

Estimation and Risk
- [ ] 11. I can produce a cost estimate using each of the three
          estimation approaches and explain when each is appropriate.

- [ ] 12. I can defend a contingency figure by naming the specific
          risks it covers and their estimated probability and impact.

- [ ] 13. I can produce a risk register with 20+ risks, all with
          named owners and specific mitigations, and present the
          top 5 to a non-technical executive in 10 minutes.

Governance and Approval
- [ ] 14. I can prepare an ARB submission package, anticipate the
          top 5 objections, and respond to each without becoming
          defensive.

- [ ] 15. I can map the decision rights for a technology investment
          in my organisation and identify the correct approval
          authority before scheduling the approval meeting.

- [ ] 16. I can identify which commercial terms in a vendor contract
          have architecture implications and explain the risk of
          each to a procurement lead.

Communication and Influence
- [ ] 17. I can write a one-page executive summary that states the
          problem, recommends an option, states the cost, and names
          the biggest risk — in under 400 words.

- [ ] 18. I can deliver a two-minute verbal summary of a £10M+
          proposal to an executive who has not read the document.

Delivery and Benefits
- [ ] 19. I can produce a handover transition pack that a delivery
          team lead with no prior context can read and understand
          the proposal history, decisions, risks, and open questions.

- [ ] 20. I can design a benefits register with measurable targets,
          baseline measurements, named owners, and measurement dates,
          and explain why benefits realisation matters to the
          credibility of future proposals.
```

---

## Module Summary

The enterprise proposal lifecycle is not a procurement process. It is a structured method for converting an uncertain opportunity into a funded, governed, accountable programme of work.

As an Enterprise Architect, you are not a passenger in this process. You are the person who defines the problem technically, writes the requirements, designs the evaluation, facilitates the workshops, assesses the risks, and ensures the approved solution is the right one. No other role does all of that. No other role has to.

The lifecycle is long and demanding. Proposals of significant scale take 4–9 months from opportunity identification to contract signature. The work is iterative — you will revisit earlier stages as you learn more. The politics are real — stakeholders have interests, and those interests are not always aligned with the best technical outcome.

But when you get it right — when the proposal is well-grounded, the vendor is well-selected, the risks are honestly stated, the cost is credibly estimated, and the benefits are eventually realised — you will have done something that very few architects in your career cohort have done.

You will have taken an uncertain business problem and turned it into a working system.

---

*Module 3 of the EA Masterclass series. Continues in Module 4 — Architecture Patterns for Modern Enterprise Systems.*
