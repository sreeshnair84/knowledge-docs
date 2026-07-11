---
title: "Module 7 — Proposal Writing"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-07-proposal-writing"]
doc_type: multi-part-series
series_name: EA Masterclass
series_part: 7
series_total: 15
series_index: ../index.md
---

# Module 7 — Proposal Writing

Consulting-quality enterprise architecture proposals win investment, earn trust, and guide transformation. This module teaches you to write proposals that executives read, approve, and act on — not documents that gather dust.

---

## What Distinguishes Great Proposals

Most proposals fail before they are read. The executive scans the first page, finds no clear recommendation, and puts it aside. Great proposals are different in four fundamental ways.

### The Pyramid Principle

Barbara Minto's Pyramid Principle, developed at McKinsey, is the single most important structural concept in consulting communication.

!!! note "The Core Idea"
    Start with the conclusion. Support it with grouped arguments. Back each argument with data. Never make the reader guess where you are going.

A conventional report buries the recommendation at the end after pages of analysis. This forces the reader to hold ambiguity in their head while reading. Executives have limited patience for this. The Pyramid Principle inverts the structure:

```
CONCLUSION (Lead with this)
    │
    ├── Supporting Argument 1
    │       ├── Data Point A
    │       └── Data Point B
    │
    ├── Supporting Argument 2
    │       ├── Data Point C
    │       └── Data Point D
    │
    └── Supporting Argument 3
            ├── Data Point E
            └── Data Point F
```

Apply this at every level: the proposal opens with the recommendation, each section opens with its key point, each paragraph opens with its topic sentence. The reader can stop at any level of depth and still understand your position.

### Visual Hierarchy

A well-formatted proposal guides the eye through information in order of importance.

| Element | Purpose | Guidance |
| --- | --- | --- |
| Section headers | Navigation and signposting | Descriptive, not generic ("Legacy Integration Doubles Risk" not "Current State") |
| Lead sentences | Carry the argument | Bold or pull-quote for executives skimming |
| Tables | Compare options or show structured data | Max 5–6 columns; always include a "Recommendation" column |
| Diagrams | Architecture, timelines, flows | One clear title; label every component; no orphan boxes |
| Callout boxes | Highlight critical decisions | Use sparingly — three per proposal maximum |

### Credibility Signals

Executives evaluate the author as much as the content. Credibility signals include:

- **Named frameworks** — TOGAF, Zachman, MECE, Strangler Fig. Show you know the field.
- **Quantified statements** — "Incidents increased 34% year-over-year" not "incidents are increasing."
- **Acknowledged trade-offs** — proposals that admit limitations are trusted more than those that don't.
- **External benchmarks** — Gartner, Forrester, peer organisation data. You are not making this up alone.
- **Risk register** — demonstrates analytical rigour, not just enthusiasm.

### The Story Arc

A great proposal follows a narrative arc the reader can feel.

```
PROBLEM (sharp, quantified)
    ↓
WHY NOW (burning platform or strategic window)
    ↓
RECOMMENDATION (specific, bounded)
    ↓
HOW (credible phased plan)
    ↓
CALL TO ACTION (what you need the reader to decide today)
```

Every section should advance this arc. If a section does not move the story forward, cut it or collapse it into an appendix.

---

## 11-Section Proposal Architecture

### 1. Executive Summary

The executive summary is the only section guaranteed to be read. It must stand alone as a complete argument.

**Three Questions the Executive Summary Must Answer**

1. What is the problem and why does it matter to this organisation right now?
2. What do you recommend and why is it the right answer?
3. What will it cost, how long will it take, and what is the return?

**Pyramid Principle Applied**

Open with the recommendation, not the problem. The reader should know your answer by the end of the first sentence.

!!! tip "Executive Summary Template"
    **Paragraph 1 — Recommendation:** [Organisation] should [specific action] to [business outcome]. This proposal recommends a [N]-phase programme delivering [key benefits] over [timeframe] at an estimated investment of [range].

    **Paragraph 2 — Problem:** [Organisation]'s current [capability/system/process] cannot support [strategic goal]. Specifically, [quantified pain point], [quantified pain point], and [quantified pain point] are limiting [business metric].

    **Paragraph 3 — Solution:** The recommended approach [brief description] addresses these constraints by [mechanism]. Phase 1 delivers [quick win] within [timeframe], establishing momentum for subsequent phases.

    **Paragraph 4 — Investment and Return:** The programme requires [investment range] over [timeframe]. Benefits include [leading benefit], [second benefit], and [third benefit], with a projected ROI of [X]% at [timeframe]. Risk of inaction is [cost or consequence].

    **Paragraph 5 — Decision Required:** We request approval to [specific action] by [date] to [reason for urgency].

**Design Note:** Keep the executive summary to one page (two pages maximum for complex programmes). Use a summary table at the top of the page if the document is over 30 pages.

---

### 2. Architecture Vision

The architecture vision answers: where are we going, and why does this direction align with business strategy?

**North Star Statement**

Every architecture vision needs a one-sentence North Star that a non-technical executive can quote. It bridges technology and business.

!!! note "North Star Formula"
    By [year], [Organisation] will operate a [adjective] [capability] that enables [business outcome], supported by [architectural characteristic] and [architectural characteristic].

    Example: "By 2027, Acme will operate a real-time, API-first data platform that enables same-day product personalisation, supported by event-driven architecture and zero-trust security."

**Target-State Diagram**

Include a single target-state architecture diagram. Guidelines:

- Show capability layers (presentation, application, integration, data, infrastructure)
- Label every component with a technology or product name (or "TBD")
- Use colour to distinguish existing, new, and decommissioned components
- Include a legend — never assume the reader knows your notation

**Guiding Principles**

List 5–8 architecture guiding principles. Format each as a statement + rationale + implication.

| Principle | Rationale | Implication |
| --- | --- | --- |
| API-first design | Enables composability and future channel flexibility | All new capabilities must expose REST or GraphQL APIs before internal UI |
| Cloud-native by default | Reduces operational overhead; improves scalability | No new on-premises deployments; lift-and-shift only as migration step |
| Data as a product | Enables self-service analytics and AI use cases | Each domain owns and publishes a data product with defined SLOs |
| Security by design | Regulatory compliance; zero-trust perimeter | Security review gates at design, not deployment |
| Buy before build | Accelerates delivery; reduces maintenance burden | Internal build only when no vendor meets 70% of requirements |

**Link to Business Strategy**

Explicitly map each guiding principle or architectural characteristic to a strategic initiative. Use a traceability table if the organisation has a published strategy document.

---

### 3. Current-State Assessment

The current-state assessment builds the burning platform. It must be factual, quantified, and ruthless.

**Quantified Pain Points**

Do not describe problems in general terms. Every pain point should have a number attached.

!!! warning "Weak vs. Strong"
    **Weak:** "The current system is slow and difficult to maintain."

    **Strong:** "The order management system averages 4.2-second response times at peak load (target: <500ms), generating 340 support tickets per month and contributing to an estimated $1.2M annual revenue loss from cart abandonment."

**Architecture Debt Mapped to Business Risk**

Create a debt-to-risk mapping table. This forces the reader to see technical debt as a business concern, not an IT housekeeping matter.

| Architecture Debt Item | Age | Business Risk | Risk Level | Annual Cost of Inaction |
| --- | --- | --- | --- | --- |
| Monolithic order platform | 11 years | Cannot scale during peak periods | High | $1.2M revenue loss |
| Manual ETL pipelines | 6 years | Reporting lag >24 hours; data errors | High | $400K analyst rework |
| Unsupported middleware | 4 years | Vendor support ends Q3 2025 | Critical | Compliance exposure |
| Siloed customer data | 8 years | Cannot deliver personalisation | Medium | Competitive disadvantage |

**Maturity Assessment**

Use a capability maturity model (CMM or CMMI-inspired) to show current state across architecture dimensions.

| Capability Domain | Current Level | Target Level | Gap |
| --- | --- | --- | --- |
| Data Management | 1 — Initial | 3 — Defined | 2 levels |
| Integration Architecture | 2 — Managed | 4 — Quantitatively Managed | 2 levels |
| Security Architecture | 2 — Managed | 4 — Quantitatively Managed | 2 levels |
| Cloud Adoption | 1 — Initial | 3 — Defined | 2 levels |
| DevOps Practices | 2 — Managed | 3 — Defined | 1 level |

**Current-State Architecture Diagram**

Show what exists today — warts and all. Label point-to-point integrations, data silos, and legacy components. This diagram is often more persuasive than any prose because it makes complexity visible.

---

### 4. Future-State Architecture

The future-state section must be specific enough to be credible and flexible enough to survive first contact with reality.

**Recommended Target Architecture**

Describe the recommended architecture in terms of capabilities, not just technologies. Lead with what the architecture enables, then explain how.

**Architecture Layers**

Structure the description by architectural layer:

| Layer | Current State | Future State | Key Technologies |
| --- | --- | --- | --- |
| Presentation | Monolithic web app | Micro-frontend, headless | React, Next.js, CDN |
| Application | Monolith + scattered microservices | Domain-aligned microservices | Java/Spring, Node.js |
| Integration | Point-to-point, batch ETL | Event-driven, API gateway | Kafka, Kong, AsyncAPI |
| Data | Siloed operational DBs + data warehouse | Data lakehouse + domain data products | Databricks, dbt, Delta Lake |
| Infrastructure | On-premises + ad-hoc cloud | Cloud-native, IaC, multi-region | AWS, Terraform, Kubernetes |
| Security | Perimeter-based | Zero-trust, SIEM, secrets management | Vault, Okta, Wiz |

**Key Design Decisions**

For each major design decision, document the decision, the alternatives considered, and the rationale. This is the architectural decision record (ADR) expressed in proposal form.

!!! note "Design Decision Format"
    **Decision:** [What was decided]
    **Alternatives Considered:** [Option A], [Option B], [chosen option]
    **Rationale:** [Why the chosen option was selected]
    **Trade-offs Accepted:** [What you gave up and why that is acceptable]

**Trade-offs Acknowledged**

!!! warning "Always Acknowledge Trade-offs"
    Proposals that present recommendations as having no downsides destroy credibility. Every architecture has trade-offs. Name them explicitly and explain why you accept them.

Example trade-off acknowledgements:

- "Event-driven architecture introduces eventual consistency. We accept this trade-off because strong consistency is not a business requirement for the affected workflows, and the scalability benefits outweigh the complexity cost."
- "The recommended vendor has higher per-seat cost than the incumbent. We accept this because the total cost of ownership over five years is 23% lower when operational costs are included."

---

### 5. Technology Recommendations

Technology recommendations are the section most likely to be perceived as vendor-biased. Structure them to demonstrate objectivity.

**How to Recommend Without Seeming Vendor-Biased**

- Always evaluate at least three options
- Publish your evaluation criteria before you publish your scores
- Weight the criteria according to the client's stated priorities, not your preferences
- Separate "recommended for this context" from "industry-leading overall"
- Disclose any existing vendor relationships

**Evaluation Criteria**

Define criteria in four categories:

| Category | Example Criteria |
| --- | --- |
| Functional fit | Covers required features; API completeness; integration capability |
| Non-functional fit | Performance at required scale; security certifications; availability SLA |
| Commercial | Total cost of ownership; licensing model; vendor financial stability |
| Delivery | Maturity of implementation ecosystem; skills availability; client reference sites |

**Evaluation Scorecard Template**

| Criterion | Weight | Vendor A | Vendor B | Vendor C |
| --- | --- | --- | --- | --- |
| Functional coverage | 25% | 4/5 | 5/5 | 3/5 |
| Scalability | 20% | 5/5 | 4/5 | 4/5 |
| Security certifications | 15% | 5/5 | 5/5 | 3/5 |
| TCO (3-year) | 20% | 3/5 | 4/5 | 5/5 |
| Implementation ecosystem | 10% | 4/5 | 3/5 | 2/5 |
| Vendor stability | 10% | 5/5 | 4/5 | 3/5 |
| **Weighted Score** | | **4.2** | **4.25** | **3.4** |

**Build vs. Buy Decision Framework**

| Build When | Buy When |
| --- | --- |
| The capability is a true differentiator | A vendor solution meets 70%+ of requirements |
| No vendor solution covers the requirement | Build would duplicate commodity capability |
| Vendor lock-in risk outweighs build cost | Time-to-market is a priority |
| Existing team has clear expertise | Ongoing vendor support reduces risk |

---

### 6. Migration Strategy

Migration is where proposals win or lose executive trust. A credible migration strategy shows you have thought beyond the design.

**Phased Approach**

Never recommend big-bang migration. Phase the work to deliver value incrementally and reduce risk.

| Phase | Scope | Duration | Key Deliverables |
| --- | --- | --- | --- |
| Phase 0 — Foundation | Governance, tooling, skills uplift | 8 weeks | Architecture runbook, CI/CD pipeline, cloud landing zone |
| Phase 1 — Quick Wins | [Specific bounded scope] | 12 weeks | [Named deliverable], [named deliverable] |
| Phase 2 — Core Migration | [Priority domains] | 6 months | [Named deliverables] |
| Phase 3 — Scale and Optimise | Remaining scope + optimisation | 6 months | [Named deliverables] |

**Migration Patterns**

Recommend the right pattern for each workload. Do not apply one pattern universally.

| Pattern | When to Use | Risk | Speed |
| --- | --- | --- | --- |
| Strangler Fig | Incrementally replace monolith functionality | Low | Slow |
| Parallel Run | Run old and new systems simultaneously for validation | Medium | Medium |
| Lift-and-Shift | Move to cloud infrastructure without refactoring | Low | Fast |
| Re-platform | Move to cloud with limited optimisation | Medium | Medium |
| Re-architect | Redesign for cloud-native; maximum benefit | High | Slow |

**Data Migration**

Data migration deserves its own sub-section. Address:

- Data profiling and quality assessment (before migration begins)
- Schema mapping and transformation rules
- Cutover strategy (full load vs. change data capture)
- Reconciliation and validation approach
- Rollback criteria

!!! warning "Data Migration Anti-Patterns"
    Do not migrate dirty data. Migrating data without profiling and cleansing it first simply moves the problem to the new system at higher cost. Build data quality gates into the migration plan, not as an afterthought.

**Integration During Transition**

During migration, both old and new systems are live. The transition integration architecture needs its own diagram showing:

- What connects to old systems
- What connects to new systems
- The anti-corruption layer or integration hub mediating between them
- When each connection is decommissioned

---

### 7. Governance

Poor governance sinks well-designed programmes. Address it explicitly.

**Programme Governance Structure**

| Body | Membership | Meeting Cadence | Authority |
| --- | --- | --- | --- |
| Steering Committee | C-suite sponsor, programme director, EA lead | Monthly | Budget approval; programme go/no-go |
| Programme Board | Workstream leads, delivery director, PMO | Fortnightly | Issue escalation; dependency management |
| Architecture Review Board | EA lead, domain architects, security lead | Weekly during delivery | Design approval; standards compliance |
| Delivery Teams | Squad leads, developers, platform engineers | Daily (standups) | Sprint execution |

**Decision Rights Matrix (RACI)**

| Decision | Business Sponsor | EA Lead | Programme Director | Domain Architect |
| --- | --- | --- | --- | --- |
| Architecture principles | A | R | C | C |
| Technology selection | C | R | C | A |
| Budget changes >10% | A | C | R | I |
| Scope changes | A | C | R | I |
| Go-live approval | A | C | R | C |

R = Responsible, A = Accountable, C = Consulted, I = Informed

**Architecture Governance During Implementation**

Establish these architecture governance touchpoints in the delivery process:

1. **Architecture Inception Review** — before a workstream begins, validate design against principles
2. **Solution Design Review** — before development begins, validate detailed design
3. **Pre-Production Architecture Sign-off** — validate that what was built matches what was designed
4. **Post-Implementation Review** — capture architectural lessons learned

!!! tip "Governance Failure Mode"
    The most common governance failure is a well-designed governance model that nobody follows. Include a brief section on governance adoption — how will you ensure the ARB reviews actually happen? Who is empowered to stop work that has not received sign-off?

---

### 8. Implementation Roadmap

The roadmap translates strategy into a time-bound plan that executives can hold the team accountable to.

**Multi-Year Visualisation**

Use a swimlane Gantt or roadmap format. Group by workstream or capability, not by team. Show:

- Phase boundaries
- Major milestones and go-live dates
- Dependencies between workstreams
- Key governance checkpoints

**Milestones**

Every milestone must be:

- Named specifically ("Order platform microservices go-live" not "Phase 2 complete")
- Dated
- Assigned to a named owner
- Linked to a business benefit realisation event

**Quick Wins in Phase 1**

Phase 1 must deliver something visible and valuable within 90 days. Quick wins serve two purposes: they build stakeholder confidence and they prove the team can deliver.

!!! tip "Choosing Quick Wins"
    Select Phase 1 deliverables that: (1) deliver genuine business value, (2) are technically de-risked, (3) demonstrate the target architecture in miniature, and (4) create reusable foundations for later phases. Avoid "quick wins" that are only visible to IT.

| Quick Win | Business Value | Delivery Time | Architecture Value |
| --- | --- | --- | --- |
| Self-service reporting portal | Reduces analyst time by 40% | Week 8 | Proves data product pattern |
| API gateway implementation | Enables three new integrations | Week 10 | Establishes integration backbone |
| Cloud landing zone | Enables all subsequent cloud workloads | Week 6 | Foundation for all later phases |

---

### 9. Risk Register

A risk register demonstrates analytical rigour. Never submit a proposal without one.

**Risk Register Format**

| Risk ID | Description | Probability | Impact | Mitigation | Owner | Residual Risk |
|---|---|---|---|---|---|---|
| R01 | [Description] | H/M/L | H/M/L | [Action] | [Role] | H/M/L |

Use a 3x3 probability-impact matrix. Calculate inherent risk (before mitigation) and residual risk (after mitigation).

**Top 5 Risks Every Proposal Must Address**

These risks appear in virtually every large enterprise programme. If you have not addressed them, your risk register is incomplete.

| Risk | Why It Must Be Addressed |
| --- | --- |
| Scope creep | The #1 cause of programme overruns; needs formal change control |
| Key person dependency | Loss of one architect or sponsor can stall the programme |
| Integration complexity underestimated | Legacy integration is always harder than estimated; needs contingency |
| Business change adoption | Technology delivery without adoption realises no benefit |
| Vendor delivery risk | External dependencies need contractual protections and alternatives |

!!! warning "Risk Register Anti-Pattern"
    Do not list risks without mitigations, owners, and residual risk levels. A list of risks with no mitigations is not a risk register — it is a list of worries. Every risk must have a named owner and a specific mitigation action.

---

### 10. Benefits and KPIs

Benefits are the reason the programme exists. Make them concrete, measurable, and owned.

**Benefit Summary Table**

| Benefit | Type | Quantification | Timeframe | Owner |
| --- | --- | --- | --- | --- |
| Reduced operational cost | Financial | $2.1M annually | Year 2 onwards | COO |
| Faster time-to-market | Strategic | 40% reduction in feature delivery cycle | Year 1 | CPO |
| Improved customer NPS | Customer | +15 NPS points | Year 2 | CMO |
| Reduced incidents | Quality | 60% reduction in P1/P2 incidents | Year 1 | CTO |
| Regulatory compliance | Risk | Zero compliance findings vs. current 4 per audit | Year 1 | CRO |

**KPI Dashboard**

Distinguish leading indicators (predict future performance) from lagging indicators (confirm past performance).

| KPI | Type | Baseline | Target | Measurement Method | Frequency |
| --- | --- | --- | --- | --- | --- |
| Deployment frequency | Leading | Monthly | Daily | DORA metrics | Weekly |
| API adoption rate | Leading | 0% | 80% of integrations | API gateway analytics | Monthly |
| Mean time to recovery | Leading | 4 hours | <30 minutes | Incident management system | Monthly |
| Revenue from new digital channels | Lagging | $0 | $5M | Finance system | Quarterly |
| Customer satisfaction (CSAT) | Lagging | 3.2/5 | 4.2/5 | Survey platform | Quarterly |
| Total cost of ownership | Lagging | $8.4M/year | $6.3M/year | Finance system | Annually |

!!! tip "Benefits Realisation Planning"
    Assign a named executive as benefit owner for each benefit. Without ownership, benefits evaporate. Include a benefits realisation review schedule: at 6 months, 12 months, and 24 months post-go-live.

---

### 11. Executive Recommendations

The final section closes the loop. Return to the Pyramid Principle: restate the recommendation clearly and tell the reader exactly what to do next.

**Clear Call to Action**

Do not end a proposal with a summary. End it with a decision request.

!!! note "Call to Action Template"
    We recommend [Organisation] approves this programme and authorises [specific action] by [date]. Delay beyond [date] will [specific consequence — cost, timeline slip, or missed strategic window].

    The programme team is prepared to begin Phase 0 activities on [date], subject to the following approvals being in place:

    1. [Specific approval 1]
    2. [Specific approval 2]
    3. [Budget release for Phase 1: $X]

**Decision Options**

Give the executive a bounded set of options. Never present a binary yes/no unless there is genuinely no alternative. Options give the executive agency while keeping them within a reasonable solution space.

| Option | Description | Implication |
| --- | --- | --- |
| Option A — Approve as Proposed | Full programme approved at recommended investment | Maximum benefit realisation; lowest unit cost |
| Option B — Phase 1 Only | Approve Phase 1 with review before committing to later phases | Reduced initial risk; higher total cost; delayed benefits |
| Option C — Defer 6 Months | Programme postponed pending [specific condition] | Increases cost of inaction by approximately $X; delays competitive advantage |

**Next Steps**

Close with a specific, dated action list.

| Action | Owner | Date |
| --- | --- | --- |
| Steering committee approval of this proposal | [Executive Sponsor] | [Date] |
| Programme director appointment | HR / [Sponsor] | [Date] |
| Vendor briefing (shortlisted vendors) | EA Lead | [Date] |
| Phase 0 kick-off | Programme Director | [Date] |

---

## Proposal Writing Craft

### Opening Paragraph Technique

The opening paragraph of each major section sets the reader's expectations for everything that follows. Use the Hook / Context / Recommendation structure.

```
HOOK:      One sentence that captures the essential tension or opportunity.
CONTEXT:   One or two sentences that ground the hook in the organisation's situation.
RECOMMENDATION: One sentence that states what this section recommends or concludes.
```

Example:

> **Hook:** Every day without a unified data platform, Acme's pricing team makes decisions with information that is 36 hours old.
> **Context:** The current batch ETL architecture was designed in 2014 for a business one-third its current size; it cannot support the real-time pricing capability the CFO committed to the board in Q1.
> **Recommendation:** This section recommends replacing the ETL pipeline with an event-driven data lakehouse, enabling sub-hour data freshness by end of Phase 1.

### Active vs. Passive Voice

Consulting proposals use active voice. Passive voice obscures accountability and weakens recommendations.

| Passive (Avoid) | Active (Use) |
| --- | --- |
| "It is recommended that..." | "We recommend..." |
| "The system was found to be..." | "The current system cannot..." |
| "Approval is required by..." | "The Steering Committee must approve..." |
| "Benefits will be realised when..." | "The business will achieve [benefit] when..." |
| "Risks have been identified..." | "We identified three critical risks..." |

### Data Visualisation Guidance

| Visualisation Type | When to Use | Avoid When |
| --- | --- | --- |
| Bar chart | Comparing discrete categories | More than 8 categories |
| Line chart | Showing trends over time | Showing a single point in time |
| Heat map (risk matrix) | Risk probability vs. impact | Few risks (a table is cleaner) |
| Architecture diagram | Showing component relationships | The diagram has more than 20 components (split it) |
| Swimlane Gantt | Multi-workstream roadmap | Single workstream (use a simple timeline) |
| Radar chart | Maturity assessment across multiple dimensions | Precise numerical comparison needed |

### Executive Callout Boxes

Use callout boxes for three purposes only:

1. **Critical risk** — something that must be decided before the programme can proceed
2. **Key insight** — a counterintuitive finding that reframes the problem
3. **Decision required** — a specific choice the executive must make

!!! warning "Callout Box Discipline"
    Callout boxes lose impact when overused. Limit yourself to three per proposal. If everything is highlighted, nothing is highlighted.

### Length Guidance Per Section

| Section | Recommended Length | Notes |
| --- | --- | --- |
| Executive Summary | 1–2 pages | Must stand alone |
| Architecture Vision | 3–5 pages | Include North Star diagram |
| Current-State Assessment | 4–6 pages | Data-heavy; include architecture diagram |
| Future-State Architecture | 5–8 pages | Include target-state diagram |
| Technology Recommendations | 3–5 pages | Include evaluation scorecard |
| Migration Strategy | 4–6 pages | Include migration diagram |
| Governance | 2–3 pages | Tables preferred over prose |
| Implementation Roadmap | 2–4 pages | Visual roadmap essential |
| Risk Register | 2–3 pages | Table format |
| Benefits and KPIs | 2–3 pages | Tables preferred |
| Executive Recommendations | 1–2 pages | Crisp; action-oriented |
| **Total** | **33–53 pages** | Appendices additional |

---

## Mini Worked Example — AI-Powered Document Processing Platform

This condensed worked example shows the narrative arc of a complete proposal. Each section is abbreviated to its essential content.

### Background

Meridian Insurance processes 40,000 claims documents per month. Currently, 24 full-time employees manually classify, extract, and route these documents. Average processing time is 3.8 days per claim. Industry leaders process equivalent volumes in under 4 hours.

---

### Executive Summary (Worked)

Meridian should invest $3.2M over 18 months to deploy an AI-powered document processing platform, reducing claims processing time from 3.8 days to under 6 hours and freeing 18 FTE for higher-value advisory work.

The current manual process cannot scale to support Meridian's 2026 target of doubling commercial lines volume without doubling headcount. The proposed platform uses large language models for document classification and entity extraction, combined with a human-in-the-loop review workflow for edge cases. Phase 1 (personal lines, 6 months) delivers break-even in month 14. Phase 2 (commercial lines, months 7–12) extends to the full portfolio. Phase 3 (continuous improvement, months 13–18) adds predictive analytics and vendor API integrations.

At full deployment, the platform is projected to save $4.8M annually against an annualised operating cost of $640K, delivering a 5-year NPV of $18.4M at a 10% discount rate.

We request Steering Committee approval by 15 August to enable a 1 September programme start. Delay beyond September pushes go-live past the annual peak processing period in Q1 2026.

---

### Problem Statement (Worked)

Three quantified pain points drive urgency:

1. **Capacity constraint:** At current manual throughput, accommodating the projected 2026 volume increase requires hiring 16 additional claims processors at a fully-loaded cost of $1.6M per year.
2. **Cycle time:** 3.8-day average processing time drives customer dissatisfaction (NPS: 28 vs. industry benchmark of 52) and increases fraud exposure during the lag window.
3. **Error rate:** Manual classification errors run at 4.2%, triggering rework that costs an estimated $380K annually in staff time.

The cost of inaction over three years is $6.2M (incremental headcount plus rework cost plus lost NPS-correlated revenue), compared to a programme investment of $3.2M.

---

### Recommendation (Worked)

Deploy a three-layer AI document processing platform:

**Layer 1 — Intelligent Ingestion:** Multi-channel document intake (email, portal, API, scan) normalised to a common document object model. Technology: AWS Textract + custom pre-processing pipeline.

**Layer 2 — AI Classification and Extraction:** Fine-tuned LLM for document type classification (12 categories) and entity extraction (policy number, claimant, incident date, damage description). Technology: Azure OpenAI Service (GPT-4o fine-tuned on 200K historical claims documents). Confidence scoring routes low-confidence extractions to human review.

**Layer 3 — Workflow Orchestration:** Rules-based routing to downstream claims systems with audit trail and SLA monitoring. Technology: Temporal.io for workflow orchestration; existing Guidewire ClaimCenter as system of record.

!!! note "Build vs. Buy Decision"
    General-purpose document processing vendors (Hyperscience, Instabase) were evaluated. Neither meets Meridian's requirement for fine-tuned domain accuracy on Lloyd's-market commercial claims forms, which use non-standard field layouts. The recommended hybrid approach (vendor OCR + proprietary fine-tuning) achieves 97.3% extraction accuracy vs. 91.2% for out-of-the-box vendor solutions, exceeding the 95% accuracy threshold required for straight-through processing.

---

### Investment Ask (Worked)

| Cost Category | Phase 1 | Phase 2 | Phase 3 | Total |
| --- | --- | --- | --- | --- |
| Platform build (internal + vendor) | $820K | $680K | $420K | $1.92M |
| Data and model training | $280K | $140K | $60K | $480K |
| Integration and testing | $200K | $180K | $80K | $460K |
| Change management and training | $120K | $80K | $60K | $260K |
| Contingency (10%) | $142K | $108K | $62K | $312K |
| **Phase Total** | **$1.56M** | **$1.19M** | **$0.68M** | **$3.43M** |

**Decision required:** Approve Phase 1 budget release of $1.56M and programme director appointment by 15 August.

---

## 25-Point Proposal Quality Checklist

Run through this checklist before submitting any proposal. No exceptions.

### Structure and Clarity

- [ ] 1. Executive summary can be read in isolation and communicates the recommendation, problem, solution, investment, and call to action
- [ ] 2. Every section opens with its key point (Pyramid Principle applied at section level)
- [ ] 3. Every paragraph opens with its topic sentence
- [ ] 4. The story arc (problem → why now → recommendation → how → call to action) is visible to a reader skimming headings only
- [ ] 5. Section headings are descriptive (carry meaning), not generic ("Current Architecture Increases Risk" not "Current State")

### Evidence and Credibility

- [ ] 6. Every pain point is quantified with a number and a source
- [ ] 7. Technology recommendations include an evaluation scorecard with weighted criteria
- [ ] 8. At least one external benchmark or industry data point is included
- [ ] 9. Trade-offs of the recommended approach are explicitly acknowledged
- [ ] 10. Build vs. buy rationale is documented for each major component

### Architecture Content

- [ ] 11. Current-state architecture diagram is included and labelled
- [ ] 12. Target-state architecture diagram is included and labelled
- [ ] 13. Architecture guiding principles are listed with rationale and implications
- [ ] 14. Key architectural decisions are documented in ADR-style format
- [ ] 15. Migration patterns are specified per workload (not one-size-fits-all)

### Risk and Governance

- [ ] 16. Risk register is complete (all five mandatory risks addressed)
- [ ] 17. Every risk has a probability, impact, mitigation, owner, and residual risk rating
- [ ] 18. Governance structure includes Steering Committee, ARB, and delivery team levels
- [ ] 19. Decision rights (RACI) are documented for at least the five most consequential decisions
- [ ] 20. Architecture governance touchpoints in the delivery process are defined

### Benefits and Financials

- [ ] 21. Benefits are quantified, time-bound, and assigned to named executive owners
- [ ] 22. KPI dashboard distinguishes leading from lagging indicators
- [ ] 23. Investment summary includes contingency and is broken down by phase
- [ ] 24. Cost of inaction is calculated (makes the status quo a visible choice)

### Finalisation

- [ ] 25. A colleague (ideally a non-technical one) has read the executive summary and can accurately describe the recommendation and why it matters

---

## 5 Teaching Lenses

Understanding this module through multiple lenses builds deeper competence.

### Beginner Lens

If you are writing your first enterprise proposal, focus on three things only:

1. **Start with the answer.** Write the executive summary last but put it first. Know what you are recommending before you write anything else.
2. **Quantify everything.** Replace every adjective with a number. "Slow" becomes "4.2-second response time." "Expensive" becomes "$1.2M annual cost."
3. **Tell a story.** Problem → recommendation → plan → call to action. This sequence should be visible even to someone who only reads headings.

### Enterprise Lens

In large organisations, proposals face political as well as analytical scrutiny. Every stakeholder reading your proposal has a position to defend, a budget to protect, or a relationship to manage.

- **Socialise before you submit.** The best proposals have no surprises in the executive meeting because every stakeholder has been briefed individually beforehand.
- **Name your assumptions explicitly.** Assumptions that are implicit become arguments; assumptions that are explicit become parameters.
- **Manage the review process.** Know who reviews the proposal, in what order, and what each reviewer cares about. Tailor callout boxes and emphasis accordingly.

### Architecture Lens

The architecture content of the proposal must survive scrutiny from technical peers as well as executives. Common technical credibility failures:

- Architecture diagrams that are conceptually correct but impossible to implement as drawn
- Technology recommendations that ignore integration complexity
- Migration strategies that assume data is clean and well-documented (it never is)
- Security and compliance requirements mentioned once and never integrated into the architecture

The architecture review board will ask: "Does this design actually work?" Your proposal must answer yes before they ask.

### Executive Lens

Executives read proposals under time pressure, with incomplete context, and divided attention. Design for this reality.

- The executive summary must work as a standalone document
- Diagrams must be interpretable without reading surrounding text
- Financial tables must show ROI clearly without requiring a calculator
- Recommendations must be unambiguous — "We recommend Option A" not "Option A may be worth considering"

The executive's question is always: "Why should I approve this over the other things competing for this budget?" Answer that question, and your proposal succeeds.

### Consultant Lens

As a consultant, your proposal is simultaneously a client deliverable and a business development asset. It must demonstrate not only that the recommendation is sound but that your firm has the capability to deliver it.

- **Demonstrate methodology.** The structured approach shows you have done this before.
- **Reference similar engagements.** "We applied this pattern at a comparable financial services client, reducing processing time by 67% in Phase 1."
- **Be honest about what you do not know.** Consultants who claim certainty about unknown variables are less trusted than those who surface assumptions clearly.
- **Make the next step obvious.** Every proposal should end with a natural entry point for the next phase of engagement.

---

## Common Mistakes in Proposal Writing

### Mistake 1: Burying the Recommendation

The proposal spends 40 pages on analysis and puts the recommendation on page 41. The executive stops reading at page 3. Apply the Pyramid Principle: recommendation first, always.

### Mistake 2: Describing Problems Without Quantifying Them

"The current system is unreliable" tells the executive nothing. "The current system experiences 14 hours of unplanned downtime per month, costing $340K in lost productivity" creates urgency. Numbers are non-negotiable.

### Mistake 3: Technology Proposals That Read as Technology Proposals

A proposal that focuses on technology ("we will migrate to microservices using Kubernetes") without connecting to business outcomes ("enabling independent scaling of the checkout service to handle 10x peak load without the $400K annual over-provisioning cost") will not resonate with business executives.

### Mistake 4: Ignoring Trade-offs

A proposal that presents a recommendation as having no downsides signals either inexperience or advocacy. Naming trade-offs honestly ("event-driven architecture introduces operational complexity that requires a 6-week DevOps upskilling programme") builds far more credibility than pretending none exist.

### Mistake 5: Vague Migration Plans

"We will migrate the systems in phases" is not a migration strategy. A migration strategy specifies which systems move in which order, using which migration pattern, with which data migration approach, and with which rollback plan. The migration section is where proposals most often fail detailed scrutiny.

### Mistake 6: Risk Registers Without Mitigations

A risk register that lists 15 risks with severity ratings but no mitigations, owners, or residual risk levels is a liability list, not a risk management plan. Every risk must have a specific mitigation action and a named human being responsible for it.

### Mistake 7: Benefits That Cannot Be Measured

"Improved agility" and "better decision-making" are not benefits — they are aspirations. Benefits must be measurable, time-bound, and assigned to an executive who will be held accountable. If you cannot define the measurement method, the benefit is not real enough to include.

### Mistake 8: Proposing Without Socialising

Proposals that arrive cold in a Steering Committee meeting almost never get approved in that meeting. The executive sponsor has unanswered questions; other stakeholders feel blindsided; someone raises an objection that derails the discussion. Socialise the recommendation with every key stakeholder before the formal review meeting. The meeting should ratify a decision that has already been made informally.

### Mistake 9: Using Passive Voice Throughout

"It is recommended," "it was determined," "approval is sought" — passive voice creates distance and obscures accountability. Use active voice: "We recommend," "we determined," "the Steering Committee must approve." Active voice is more persuasive and more professional.

### Mistake 10: Ignoring the Cost of Inaction

Proposals that only argue for the programme fail to make the status quo visible as a choice. The executive must understand that doing nothing is also a decision, with a cost. Calculate the cost of inaction explicitly and put it in the executive summary.

---

## Mastery Checklist

Use this checklist to assess your proposal writing capability. Honest self-assessment against these items reveals your development priorities.

### Structural Mastery

- [ ] 1. I consistently apply the Pyramid Principle — conclusion first at every level of the document
- [ ] 2. I can write an executive summary that stands alone as a complete argument in two pages or less
- [ ] 3. Every section in my proposals opens with its key point, not background or context
- [ ] 4. I can construct a narrative arc that a reader can follow from headings alone
- [ ] 5. I use active voice by default and correct passive voice in review

### Analytical Mastery

- [ ] 6. I quantify every pain point — I never use adjectives where a number exists
- [ ] 7. I calculate the cost of inaction and include it in the executive summary
- [ ] 8. I document architectural decisions in ADR format with alternatives and rationale
- [ ] 9. I acknowledge trade-offs explicitly for every major recommendation
- [ ] 10. I produce evaluation scorecards with weighted criteria before naming a technology recommendation

### Architecture Content Mastery

- [ ] 11. I can produce current-state and target-state architecture diagrams that are both conceptually clear and technically implementable
- [ ] 12. I can map architecture debt to business risk in a way that non-technical executives find compelling
- [ ] 13. I can specify migration patterns per workload and explain the rationale for each choice
- [ ] 14. I design governance structures that include decision rights, not just reporting lines
- [ ] 15. I integrate security, compliance, and non-functional requirements throughout the architecture content, not in a single isolated section

### Stakeholder and Communication Mastery

- [ ] 16. I socialise proposals with key stakeholders before formal review meetings
- [ ] 17. I tailor emphasis and callout boxes to the concerns of specific executive readers
- [ ] 18. I can explain my recommendation in one sentence to a non-technical executive
- [ ] 19. I close every proposal with an unambiguous call to action and a specific deadline
- [ ] 20. I have received formal feedback on a proposal from an executive sponsor and incorporated it into my practice

---

!!! note "Module Summary"
    Great enterprise proposals are won in the structure, not the content. Apply the Pyramid Principle relentlessly. Quantify everything. Acknowledge trade-offs. Make the recommendation unmistakable and the call to action unavoidable. A technically brilliant recommendation buried in a poorly structured document will lose to a good recommendation clearly told. Master the craft of proposal writing and your architecture recommendations will be heard.

<!-- AUTO-DOCS-START -->
<!-- AUTO-DOCS-END -->
