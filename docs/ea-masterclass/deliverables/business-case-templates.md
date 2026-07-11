---
title: "Business Case Templates (1–6)"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "deliverables"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# Business Case Templates (Templates 1–6)

[← Back to Deliverables Overview](index.md)

---

## Template 1 — Enterprise Architecture Handbook (Structure)

The EA Handbook is the definitive reference document for the EA function. It defines how architecture is done in the organisation — the principles, methods, standards, and governance processes that all architects follow. This template provides the complete chapter structure with purpose statements and typical contents for each chapter.

!!! info "When to Use This"
    Use this structure when establishing an EA function, refreshing an existing one, or onboarding new architects. Build the handbook progressively — start with the chapters most relevant to current priorities and add others over time.

### Chapter Structure

---

#### Chapter 1 — Introduction and Purpose

**Purpose**: Establishes why the EA function exists and how to use the handbook.

**Typical Contents**:

- Mission and vision of the EA function
- Scope: what EA covers and what it does not
- How the handbook is maintained and versioned
- Primary audiences (architects, developers, executives, vendors)
- Quick-start guide for new readers

---

#### Chapter 2 — Enterprise Context

**Purpose**: Describes the organisation the architecture serves — its strategy, structure, and operating environment.

**Typical Contents**:

- Organisational mission and strategic priorities (current planning cycle)
- Business capability map (top two levels)
- Key business processes and value streams
- Regulatory and compliance context
- Key strategic programmes in flight

---

#### Chapter 3 — Architecture Principles

**Purpose**: Defines the non-negotiable rules that guide all architecture decisions.

**Typical Contents**:

- Format for stating a principle (Name / Statement / Rationale / Implications)
- Business principles (e.g., "Architecture decisions are driven by business outcomes")
- Technology principles (e.g., "Prefer cloud-native, standards-based solutions")
- Data principles (e.g., "Data is a shared enterprise asset")
- Security principles (e.g., "Security is built in, not bolted on")
- AI principles (e.g., "AI decisions are explainable and auditable")

**Example Principle Table**:

| # | Principle | Statement | Rationale | Implications |
| --- | ----------- | ----------- | ----------- | -------------- |
| P1 | Business Outcome First | All architecture decisions are justified by a business outcome | Technology without business value is waste | Architects must quantify value before proposing solutions |
| P2 | Cloud-Native by Default | New workloads are deployed on cloud infrastructure unless a specific exception is approved | Cost, agility, and scalability advantages of cloud | Exceptions require ARB approval; legacy exceptions are time-bound |
| P3 | API-First Integration | Systems expose capabilities via APIs; direct database integration is prohibited | Decoupling reduces brittleness; APIs enable reuse | All new systems must publish an API contract at design time |

---

#### Chapter 4 — Architecture Methods and Frameworks

**Purpose**: Defines how the EA team works — the methods and frameworks used for architecture development.

**Typical Contents**:

- Adopted frameworks (e.g., TOGAF ADM, Zachman, custom hybrid)
- Architecture development process (phases, inputs, outputs)
- Architecture viewpoints used by the organisation (business, data, application, technology)
- Modelling standards (notation: ArchiMate, UML, C4, Mermaid)
- Architecture artefact types and when each is used

---

#### Chapter 5 — Domain Architectures

**Purpose**: Documents the target architecture for each major domain. This is the largest chapter and is typically subdivided.

**Sub-chapters**:

- 5.1 Business Architecture (capability model, operating model, process standards)
- 5.2 Data Architecture (data domains, data governance, master data, analytics platform)
- 5.3 Application Architecture (portfolio, integration patterns, API standards, SaaS guidelines)
- 5.4 Technology Architecture (cloud strategy, infrastructure standards, networking, hosting)
- 5.5 Security Architecture (zero trust model, IAM standards, threat model)
- 5.6 AI Architecture (AI platform, ML pipeline standards, model governance, GenAI patterns)

---

#### Chapter 6 — Architecture Governance

**Purpose**: Defines how architecture decisions are made, reviewed, and enforced.

**Typical Contents**:

- Architecture governance model (ARB charter, membership, decision authority)
- Decision-making process (proposal, review, approval, record)
- Architecture decision record (ADR) format and process
- Exceptions management process
- Compliance and assurance approach

---

#### Chapter 7 — Standards and Reference Architectures

**Purpose**: Provides approved standards and reusable reference architectures.

**Typical Contents**:

- Technology standards register (approved tools, platforms, languages, versions)
- Reference architectures (microservices, event-driven, data mesh, AI/ML pipeline)
- Integration patterns catalogue
- Security baseline standards
- Cloud landing zone design

---

#### Chapter 8 — EA Tooling and Repositories

**Purpose**: Describes the tools the EA team uses and where architecture artefacts are stored.

**Typical Contents**:

- Architecture repository (e.g., LeanIX, Sparx EA, Confluence)
- Modelling tools and standards
- Portfolio management tool
- Document management and version control
- Access and contribution guidelines

---

#### Chapter 9 — Roles and Responsibilities

**Purpose**: Defines who does what in enterprise architecture.

**Typical Contents**:

- EA team structure and reporting lines
- Role definitions (Chief EA, Principal EA, Senior EA, Domain Architect, Solution Architect)
- RACI for key EA activities
- Engagement model (how project teams engage with EA)
- Architecture community of practice

---

#### Chapter 10 — Appendices

**Purpose**: Reference materials and supporting documents.

**Typical Contents**:

- Acronym glossary
- Technology lifecycle register (current, strategic, retire)
- Architecture assessment scoring criteria
- Key contacts
- Document history and version control

---

## Template 2 — Enterprise Proposal Playbook

This playbook defines the end-to-end process for producing an enterprise technology proposal. Follow each stage in sequence.

!!! note "What Makes a Good Proposal Process"
    A proposal that is rushed, undiscovered, or unreviewed fails not because the idea was bad — but because the process was bad. This playbook is designed to make the process rigorous without making it bureaucratic.

### Stage 1: Initial Brief

**Trigger**: Request received (from executive, programme, or self-initiated opportunity).

**Key Activities**:

- Clarify the ask: what decision does this proposal need to support?
- Identify the primary audience and their decision-making criteria
- Agree the deadline and format requirements
- Assign a proposal lead and supporting team

**Participants**: Proposal lead, commissioning stakeholder, EA manager

**Time estimate**: 1–2 days

**Output**: Proposal brief (one page) containing: question to answer, audience, deadline, format, and resources allocated

---

### Stage 2: Discovery

**Trigger**: Proposal brief approved.

**Key Activities**:

- Conduct stakeholder interviews (minimum three, using Discovery Questionnaire Library)
- Review existing documentation (strategy, architecture, financials, previous proposals)
- Assess the current-state problem or opportunity with evidence
- Identify constraints (budget, timeline, regulatory, organisational)

**Participants**: Proposal lead, business stakeholders, subject matter experts

**Time estimate**: 3–10 days (depending on complexity)

**Output**:

- Discovery notes (structured by category)
- Problem statement (draft, one paragraph)
- Initial list of solution options

---

### Stage 3: Options Development

**Trigger**: Discovery complete and problem clearly defined.

**Key Activities**:

- Generate a minimum of three options (including a "do nothing" option)
- For each option, assess: cost, benefit, risk, feasibility, and timeline
- Select a recommended option and document the rationale
- Validate the recommendation with a trusted colleague or mentor before writing

**Participants**: Proposal lead, technical SMEs, finance partner (for cost modelling)

**Time estimate**: 2–5 days

**Output**: Options comparison table with recommendation

---

### Stage 4: Drafting

**Trigger**: Recommendation agreed internally.

**Key Activities**:

- Draft all sections using the Executive Business Case Template (Template 4)
- Write the executive summary last
- Use the Proposal Writing Handbook (Template 5) for quality guidance
- Apply the 25-point self-review checklist before sharing

**Participants**: Proposal lead (primary author), supporting contributors for specific sections

**Time estimate**: 3–7 days

**Output**: Complete proposal draft

---

### Stage 5: Internal Review

**Trigger**: First draft complete.

**Key Activities**:

- Peer review using the peer review checklist (Template 14)
- Technical review by relevant SMEs
- Financial review (validate all numbers)
- Legal / compliance review if required

**Participants**: EA lead, peer reviewer, finance, legal (as required)

**Time estimate**: 2–3 days

**Output**: Reviewed draft with tracked comments

---

### Stage 6: Stakeholder Preview

**Trigger**: Internal review complete and comments incorporated.

**Key Activities**:

- Share draft with key stakeholder(s) before formal submission
- Gather informal feedback (especially on framing, tone, and ask)
- Revise based on feedback

**Participants**: Proposal lead, primary sponsor, one or two key reviewers

**Time estimate**: 2–3 days

**Output**: Pre-approved draft

---

### Stage 7: Final Production and Submission

**Trigger**: Stakeholder preview complete.

**Key Activities**:

- Apply final formatting and document standards
- Apply final pre-submission checklist (Template 14)
- Submit via agreed channel (email, portal, document management system)
- Confirm receipt with the decision-making body

**Participants**: Proposal lead

**Time estimate**: 1 day

**Output**: Submitted proposal

---

### Stage 8: Presentation and Q&A

**Trigger**: Proposal accepted for review by decision-making body.

**Key Activities**:

- Prepare a verbal summary (10 minutes maximum)
- Anticipate and prepare for likely objections
- Deliver presentation and handle Q&A
- Follow up with any outstanding questions in writing within 24 hours

**Participants**: Proposal lead, supporting SMEs as needed

**Time estimate**: 1–2 days preparation

**Output**: Decision (approved / rejected / deferred / revised and resubmit)

---

### Proposal Stages Summary

| Stage | Key Output | Participants | Est. Duration |
| ------- | ------------ | -------------- | --------------- |
| 1. Brief | Proposal brief | Lead + sponsor | 1–2 days |
| 2. Discovery | Discovery notes + problem statement | Lead + stakeholders | 3–10 days |
| 3. Options | Options comparison + recommendation | Lead + SMEs + finance | 2–5 days |
| 4. Drafting | Complete proposal draft | Lead + contributors | 3–7 days |
| 5. Internal review | Reviewed draft | Lead + peers + finance | 2–3 days |
| 6. Stakeholder preview | Pre-approved draft | Lead + sponsor | 2–3 days |
| 7. Submission | Submitted proposal | Lead | 1 day |
| 8. Presentation | Decision | Lead + SMEs | 1–2 days prep |

---

## Template 3 — AI Technology Investment Guide

Use this guide when evaluating AI technology options — whether selecting a platform, evaluating a vendor, or deciding between build and buy.

### Section 1: Evaluation Criteria

Rate each option against the following criteria. Each criterion is rated 1–5 (1 = very poor fit, 5 = excellent fit).

| Criterion | Weight | Description |
| ----------- | -------- | ------------- |
| Strategic alignment | 20% | How well does this option align to the organisation's AI strategy and business priorities? |
| Functional fit | 20% | Does the solution address the defined use case requirements? |
| Data compatibility | 15% | Can the solution work with the organisation's existing data assets and infrastructure? |
| Integration capability | 10% | How well does it integrate with existing systems via APIs, events, or standard connectors? |
| Security and compliance | 15% | Does it meet the organisation's security standards and relevant regulatory requirements? |
| Vendor maturity and support | 10% | How established is the vendor, and what level of support do they provide? |
| Total cost of ownership | 10% | What is the 5-year total cost, including licensing, implementation, and operations? |

**Total weighted score formula**:

```
Score = Σ (Criterion Rating × Weight)
Maximum possible score = 5.00
```

---

### Section 2: Vendor Scoring Matrix

| Criterion | Weight | Vendor A Score | Vendor A Weighted | Vendor B Score | Vendor B Weighted | Vendor C Score | Vendor C Weighted |
| ----------- | -------- | ---------------- | ------------------- | ---------------- | ------------------- | ---------------- | ------------------- |
| Strategic alignment | 20% | [1–5] | | [1–5] | | [1–5] | |
| Functional fit | 20% | [1–5] | | [1–5] | | [1–5] | |
| Data compatibility | 15% | [1–5] | | [1–5] | | [1–5] | |
| Integration capability | 10% | [1–5] | | [1–5] | | [1–5] | |
| Security and compliance | 15% | [1–5] | | [1–5] | | [1–5] | |
| Vendor maturity | 10% | [1–5] | | [1–5] | | [1–5] | |
| Total cost of ownership | 10% | [1–5] | | [1–5] | | [1–5] | |
| **Total** | **100%** | | **[Score]** | | **[Score]** | | **[Score]** |

---

### Section 3: Build vs. Buy Decision Framework

Use this framework when the organisation is deciding between building a custom AI solution and purchasing a commercial product.

| Factor | Build | Buy |
| -------- | ------- | ----- |
| **Differentiation** | High: the capability is a source of competitive advantage | Low: the capability is a commodity or table stakes |
| **Customisation need** | The required functionality cannot be achieved with commercial products | Commercial products can meet 80%+ of requirements |
| **Data sensitivity** | Extremely sensitive data that cannot leave the organisation's infrastructure | Data can be processed in a vendor's environment with appropriate controls |
| **Time to value** | Organisation can tolerate 12+ months to production | Organisation needs production capability within 3–6 months |
| **Internal capability** | Strong internal AI/ML engineering capability exists | Limited internal AI/ML engineering capability |
| **Budget type** | CapEx available; OpEx constrained | OpEx model preferred; CapEx constrained |
| **Ongoing cost** | Can sustain an internal team for maintenance and improvement | Prefers to transfer maintenance risk to a vendor |

!!! tip "The 80/20 Build-Buy Rule"
    If a commercial product covers 80% of the requirements, buy it and accept the 20% gap or configure around it. Building custom AI solutions is 3–5x more expensive and time-consuming than most organisations estimate. Build only when differentiation genuinely requires it.

---

### Section 4: AI Vendor Due Diligence Questions

Ask these questions of every AI vendor before making an investment decision:

**Model and Technology**

1. What foundation models or algorithms underpin the product, and how are they updated?
2. How is model performance measured, and what are the current benchmark scores for our use case?
3. What happens when the model produces incorrect or harmful outputs?
4. Can the model be fine-tuned on our data, and if so, who owns the fine-tuned weights?

**Data and Privacy**

1. Where is our data processed and stored — in what regions and jurisdictions?
2. Is our data used to train or improve the vendor's shared models?
3. What data is retained after a session, and for how long?
4. How does the vendor comply with GDPR and applicable data protection regulations?

**Security**

1. What security certifications does the product hold (SOC 2, ISO 27001, etc.)?
2. How is access controlled, and does the product support our IAM standards?
3. What is the vendor's penetration testing and vulnerability disclosure process?

**Commercial**

1. What is the pricing model, and how does cost scale with usage?
2. What is included in the base license, and what requires additional purchase?
3. What are the contract exit provisions, and how do we extract our data on termination?
4. What SLAs apply to availability, and what are the remedies for breach?

---

## Template 4 — Executive Business Case Template

!!! note "Instructions"
    Complete all 11 sections. Write in plain language — avoid technical jargon in any section that a non-technical executive will read. The executive summary should be written last, after all other sections are complete.

---

### Executive Summary

**[One page maximum. Write this section last. Summarise: the strategic opportunity, the proposed solution, the investment required, the expected return, and the recommended next step. A busy executive reading only this section should be able to make an informed decision.]**

---

### Section 1 — Strategic Context

**1.1 Organisational Strategy**

[Describe the 2–3 strategic priorities of the organisation that are relevant to this proposal. Cite the strategy document or planning cycle. 1–2 paragraphs.]

**1.2 Strategic Alignment**

[Explain specifically how this proposal advances one or more of those strategic priorities. Be direct — "this proposal supports Priority X by doing Y." 1 paragraph.]

**1.3 External Drivers**

[Describe the external factors (market, competitive, regulatory, technological) that create urgency or opportunity. 1–2 paragraphs.]

---

### Section 2 — Current State and Problem

**2.1 Current State Description**

[Describe the current situation objectively. What systems, processes, or capabilities are in place today? Use data where possible. 1–2 paragraphs.]

**2.2 Problem Statement**

[State the problem clearly and specifically. What is failing, missing, or at risk? What is the measurable business impact of the current state? 1 paragraph.]

**2.3 Consequences of Inaction**

[What happens if this proposal is not approved? Quantify where possible: financial cost, customer impact, regulatory risk, competitive consequence. 1 paragraph.]

!!! warning "Common Mistake"
    Many proposals describe the problem vaguely and then leap to the solution. Executives approve investments when they understand the pain, not just the promise. Spend real effort on Section 2.

---

### Section 3 — Proposed Solution

**3.1 Solution Overview**

[Describe the proposed solution in plain language. What will it do? What capability will the organisation have that it does not have today? 1–2 paragraphs.]

**3.2 Solution Components**

[List the key components: technology, process change, people, data. For each, provide a one-line description.]

| Component | Description | Responsibility |
| ----------- | ------------- | ---------------- |
| [Technology platform] | [What it is and what it does] | [Vendor / internal team] |
| [Process change] | [What changes and for whom] | [Business unit] |
| [Data requirements] | [What data is needed and where it comes from] | [Data team] |
| [People and skills] | [What new roles or training are required] | [HR / L&D] |

**3.3 Target State**

[Describe the future state — what will be true once this solution is implemented? 1 paragraph.]

---

### Section 4 — Options Considered

[Present minimum two alternatives to the proposed solution, including a "do nothing" option. For each, provide a brief description and explanation of why it was not recommended.]

| Option | Description | Reason Not Recommended |
|--------|-------------|------------------------|
| Option A: Do nothing | Maintain current state | [Cost of inaction; competitive risk] |
| Option B: [Alternative] | [Brief description] | [Reason rejected] |
| Option C: Recommended | [Brief description] | **Recommended** |

---

### Section 5 — Financial Summary

**5.1 Investment Required**

| Cost Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | Total |
| --------------- | -------- | -------- | -------- | -------- | -------- | ------- |
| Software / licensing | | | | | | |
| Implementation | | | | | | |
| Infrastructure | | | | | | |
| Internal resource | | | | | | |
| Change management | | | | | | |
| Contingency (15%) | | | | | | |
| **Total** | | | | | | |

**5.2 Expected Benefits**

| Benefit Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | Total |
| ------------------ | -------- | -------- | -------- | -------- | -------- | ------- |
| Revenue increase | | | | | | |
| Cost reduction | | | | | | |
| Cost avoidance | | | | | | |
| Productivity gain | | | | | | |
| **Total** | | | | | | |

**5.3 Return Metrics**

| Metric | Value |
| -------- | ------- |
| Net Present Value (NPV) | |
| Internal Rate of Return (IRR) | |
| Payback period | |
| 5-year net benefit | |

---

### Section 6 — Benefits Realisation Plan

[Define how and when benefits will be measured and realised.]

| Benefit | Measure | Baseline | Target | Realisation Date | Owner |
| --------- | --------- | --------- | -------- | ----------------- | ------- |
| [Benefit 1] | [KPI] | [Current value] | [Target value] | [Quarter/Year] | [Role] |
| [Benefit 2] | [KPI] | [Current value] | [Target value] | [Quarter/Year] | [Role] |

---

### Section 7 — Delivery Approach

**7.1 Delivery Phasing**

| Phase | Scope | Duration | Investment | Key Milestone |
| ------- | ------- | ---------- | ------------ | --------------- |
| Phase 1 — Foundation | [Scope] | [Duration] | [$] | [Milestone] |
| Phase 2 — Scaling | [Scope] | [Duration] | [$] | [Milestone] |
| Phase 3 — Optimisation | [Scope] | [Duration] | [$] | [Milestone] |

**7.2 Key Dependencies**

[List the top 5 dependencies: things that must be true or in place for this programme to succeed.]

1. [Dependency 1]
2. [Dependency 2]
3. [Dependency 3]
4. [Dependency 4]
5. [Dependency 5]

---

### Section 8 — Risk Assessment

| Risk | Likelihood (H/M/L) | Impact (H/M/L) | Mitigation |
| ------ | ------------------- | ---------------- | ------------ |
| [Risk 1] | | | |
| [Risk 2] | | | |
| [Risk 3] | | | |
| [Risk 4] | | | |
| [Risk 5] | | | |

---

### Section 9 — Governance and Accountability

| Role | Individual | Responsibility |
| ------ | ----------- | ---------------- |
| Executive Sponsor | [Name / Title] | Overall accountability for the programme |
| Business Owner | [Name / Title] | Business outcome ownership |
| Programme Lead | [Name / Title] | Day-to-day delivery |
| Architecture Lead | [Name / Title] | Architecture integrity |
| Finance Lead | [Name / Title] | Financial tracking |

---

### Section 10 — Assumptions and Constraints

**Assumptions** (things believed to be true that have not been confirmed):

1. [Assumption 1]
2. [Assumption 2]
3. [Assumption 3]

**Constraints** (fixed boundaries within which the programme must operate):

1. [Constraint 1 — e.g., budget cap]
2. [Constraint 2 — e.g., regulatory deadline]
3. [Constraint 3 — e.g., resource availability]

---

### Section 11 — Recommendation and Next Steps

**Recommendation**: [State the recommendation clearly in one sentence.]

**Approval sought**: [Specify exactly what approval is being requested and from whom.]

**Immediate next steps** (if approved):

| Action | Owner | Due Date |
| -------- | ------- | ---------- |
| [Action 1] | [Owner] | [Date] |
| [Action 2] | [Owner] | [Date] |
| [Action 3] | [Owner] | [Date] |

---

## Template 5 — Proposal Writing Handbook

### The Proposal Writing Process

#### Phase 1 — Pre-Writing (Discovery)

Before writing a single word, ensure you can answer:

- What decision does this proposal need to unlock?
- Who is the primary reader, and what do they care most about?
- What does the reader need to believe to say yes?
- What objections will they have, and how will you address them?
- What evidence do you have that is credible to this audience?

!!! warning "The Most Common Proposal Mistake"
    Starting to write before completing discovery. A proposal written without adequate discovery cannot answer the question "so what?" — and executives will notice.

#### Phase 2 — Structuring

Structure the proposal before drafting any content. Write the section headings and one-sentence summaries of what each section will argue. Review the structure with a colleague before drafting. A well-structured proposal writes itself; a poorly structured one requires multiple painful rewrites.

**The Structure Test**: Can you narrate the proposal structure verbally in 2 minutes, with the logic flowing clearly from section to section? If not, the structure needs more work.

#### Phase 3 — Drafting

- Write the body sections first; write the executive summary last.
- Use active voice and direct language. Say "we recommend" not "it is recommended."
- Every claim must be supported by evidence, a cited source, or an explicit assumption.
- Use tables and visuals where they communicate information more clearly than prose.
- Target 10–15 pages for a standard proposal; 20–25 pages maximum for a major investment.

#### Phase 4 — Self-Review

Apply the 25-point self-review checklist (below) before sharing.

#### Phase 5 — Peer Review

Share with a peer reviewer using the peer review checklist (Template 14). Brief the reviewer on the audience and the key decision before they read.

#### Phase 6 — Stakeholder Preview

Share with the primary sponsor before formal submission. Their informal feedback on framing, tone, and the ask is invaluable before the proposal goes to a formal decision body.

#### Phase 7 — Final Production

Apply the final pre-submission checklist. Format for the target audience — executive proposals should look polished, have a clear visual hierarchy, and be easy to navigate.

---

### 25-Point Proposal Self-Review Checklist

**Strategic Framing**

- [ ] 1. The executive summary can be read and acted on without reading the rest of the document
- [ ] 2. The proposal answers "So what?" explicitly — the business consequence is quantified
- [ ] 3. The proposal answers "Who cares?" — key stakeholders and their interests are addressed
- [ ] 4. The proposal answers "What do we do?" — the recommendation is specific and unambiguous
- [ ] 5. The proposal explicitly links to at least one named strategic priority

**Problem Definition**

- [ ] 6. The current-state problem is described with evidence, not opinion
- [ ] 7. The cost of inaction is quantified or credibly estimated
- [ ] 8. The problem statement is one paragraph and could be read aloud without confusion
- [ ] 9. At least one real stakeholder has validated that the problem description is accurate

**Solution**

- [ ] 10. The proposed solution is described in plain language a non-technical executive can follow
- [ ] 11. At least two alternatives have been considered and their rejection is explained
- [ ] 12. The target state is described — what will be true when implementation is complete?

**Financial**

- [ ] 13. All costs are itemised; no single line is more than 30% of the total without explanation
- [ ] 14. All benefits are categorised (revenue / cost reduction / cost avoidance / productivity)
- [ ] 15. NPV, IRR, and payback period are stated and the calculation assumptions are visible
- [ ] 16. A contingency is included and its percentage is stated

**Risk**

- [ ] 17. At least five risks are identified; each has a likelihood, impact, and mitigation
- [ ] 18. The most likely objection from the decision-making body is addressed in the document

**Governance**

- [ ] 19. The executive sponsor is named and has confirmed their support
- [ ] 20. Clear accountability is established for delivery and benefits realisation

**Writing Quality**

- [ ] 21. Active voice is used throughout; passive constructions have been removed
- [ ] 22. Technical jargon has been removed or defined in the text
- [ ] 23. No section exceeds three pages; no single paragraph exceeds 150 words
- [ ] 24. All tables and figures have titles; all claims have supporting evidence or cited assumptions
- [ ] 25. The document has been read aloud once — all awkward sentences have been revised

---

## Template 6 — Enterprise AI Strategy Playbook

### Stage 1 — Define the AI Vision

**Objective**: Establish a clear, board-approved statement of what AI will mean for this organisation.

**Key Questions**:

- What business outcomes do we expect AI to enable over the next 3–5 years?
- Which aspects of AI are most important to us: efficiency, growth, customer experience, or risk management?
- What kind of AI company do we aspire to be — a fast follower, an innovation leader, or a selective adopter?

**Vision Statement Format**:

> [Organisation name] will use AI to [business outcome] for [primary beneficiaries], becoming [competitive position] in [time horizon].

**Output**: One-paragraph AI vision statement, approved by the executive committee.

---

### Stage 2 — Assess Current AI Maturity

Apply the AI Maturity Model across five dimensions:

| Dimension | What to Assess | Rating (1–5) |
| ----------- | --------------- | -------------- |
| Strategy | Is there a defined AI strategy aligned to business goals? | |
| Data | Are the right data assets available, accessible, and governed? | |
| Technology | Is the technology platform capable of supporting AI at scale? | |
| Talent | Does the organisation have the AI skills it needs, now and in the future? | |
| Governance | Are there processes for approving, monitoring, and retiring AI solutions? | |

**Rating Scale**:

- **1 — Ad hoc**: No defined approach; AI used opportunistically if at all
- **2 — Defined**: Approach defined but inconsistently applied
- **3 — Managed**: Defined, consistently applied, and measured
- **4 — Optimised**: Consistently applied and continuously improved
- **5 — Leading**: Industry-leading; practices adopted by others

**Output**: Maturity heatmap with narrative explaining each rating and the top three constraints.

---

### Stage 3 — Identify and Prioritise Use Cases

**Step 1 — Generate the longlist**: Run cross-functional workshops to identify AI use cases across the organisation. Target at least 20 use cases across different functions and value chain stages.

**Step 2 — Score each use case** using the following criteria:

| Criterion | Weight | Description |
| ----------- | -------- | ------------- |
| Strategic value | 30% | How directly does this use case advance a strategic priority? |
| Financial impact | 25% | What is the estimated 3-year net financial benefit? |
| Feasibility | 20% | How achievable is this given current data, technology, and skills? |
| Speed to value | 15% | How quickly can a working solution be in production? |
| Risk | 10% | What are the ethical, regulatory, or reputational risks? (Lower risk = higher score) |

**Step 3 — Prioritise**: Plot the top candidates on a 2×2 matrix (Value on y-axis, Feasibility on x-axis). Programmes in the top-right quadrant are the priority.

**Output**: Prioritised use case list with scores and a 2×2 prioritisation chart.

---

### Stage 4 — Design the Operating Model

Define how AI will actually operate in the organisation:

| Operating Model Element | Decision |
| ------------------------ | ---------- |
| Centralised or federated? | [Centralised AI COE / Federated teams / Hybrid] |
| Build or buy? | [Build custom / Buy commercial / Hybrid] |
| Talent model | [Hire / Train / Partner / Augment] |
| Governance model | [Who approves, monitors, retires AI solutions?] |
| Funding model | [Central / Business unit / Shared / Project-based] |

**Output**: Operating model design document (2–3 pages).

---

### Stage 5 — Plan the Technology Platform

Define the AI platform architecture:

| Layer | Decision |
| ------- | ---------- |
| Foundation models | [Which LLMs / models to adopt as standard, and on what basis] |
| MLOps platform | [Platform for training, deploying, and monitoring models] |
| Data platform | [Data lake, feature store, vector store] |
| Integration | [API gateway, MCP servers, event bus] |
| Security and access | [IAM, data masking, audit logging] |
| Development environment | [IDE, prompt management, experimentation tools] |

**Output**: AI platform architecture diagram and platform decision record.

---

### Stage 6 — Establish Governance

Define the governance framework for AI:

| Governance Element | Detail |
| ------------------- | -------- |
| AI principles | [The organisation's responsible AI principles — typically 5–8] |
| Use case review process | [How new AI use cases are assessed before implementation] |
| Model risk management | [How models are tested, approved, and monitored for drift] |
| Data ethics review | [How data sourcing and use is reviewed for ethical risk] |
| Incident response | [What happens when an AI system causes harm or error] |
| Regulatory compliance | [How the organisation tracks and responds to AI regulation] |

**Output**: AI Governance Playbook (Template 9) completed for this organisation.

---

### AI Strategy Playbook Summary Table

| Stage | Key Output | Primary Owner | Typical Duration |
| ------- | ------------ | --------------- | ----------------- |
| 1. Vision | AI vision statement | CTO / CDO | 2–4 weeks |
| 2. Maturity | Maturity assessment | EA Lead | 3–6 weeks |
| 3. Use cases | Prioritised use case list | EA + Business | 4–8 weeks |
| 4. Operating model | Operating model design | CTO / CDO + HR | 4–6 weeks |
| 5. Platform | Platform architecture | EA + Engineering | 4–8 weeks |
| 6. Governance | AI governance playbook | CISO + CDO + Legal | 4–6 weeks |
| **Total** | **Enterprise AI Strategy** | **CTO / CDO** | **4–6 months** |
