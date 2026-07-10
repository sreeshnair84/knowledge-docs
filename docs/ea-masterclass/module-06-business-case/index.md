---
title: "Module 6 — Business Case Development"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-06-business-case"]
---

# Module 6 — Business Case Development

!!! note "Module Overview"
    This is the most critical module in the EA Masterclass. A well-crafted business case is what separates architectures that get funded from architectures that get shelved. By the end of this module you will be able to write a complete, investment-ready business case from scratch — one that survives CFO scrutiny, earns board approval, and sets realistic expectations for delivery.

---

## What a Business Case Is

A business case is a **structured argument for investment**. It is not a project plan. It is not a requirements document. It is not a proof of concept write-up. It is a document that answers four fundamental questions:

| Question | What It Tests |
|----------|---------------|
| **Why this?** | Is this the right solution to the right problem? |
| **Why now?** | What is the cost of delay or inaction? |
| **Why this much?** | Is the investment proportionate to the return? |
| **Why us?** | Does this organisation have the capability to succeed? |

Every sentence in a business case should serve one of those four questions. If a sentence does not, cut it.

### How a Business Case Differs from Related Documents

| Document | Primary Purpose | Primary Audience |
|----------|-----------------|-----------------|
| **Business Case** | Justify the investment decision | Executives, board, investment committee |
| **Feasibility Study** | Determine whether the solution is achievable | Project sponsors, technical leads |
| **Project Charter** | Authorise the project once approved | Project manager, delivery team |
| **Proposal / RFP Response** | Win a contract or vendor selection | Procurement, evaluation panel |
| **Strategy Paper** | Set direction without a specific ask | Senior leadership |

A feasibility study answers "can we do it?" A business case answers "should we fund it and why?" These are sequential — a feasibility study often feeds a business case, but they are distinct artefacts with distinct purposes.

### Who Writes, Reviews, and Approves

```
                    ┌─────────────────────┐
                    │  Investment Committee│  ← Approves
                    │  / Board            │
                    └──────────┬──────────┘
                               │ reviews
                    ┌──────────▼──────────┐
                    │  CFO / CTO / COO    │  ← Challenges
                    └──────────┬──────────┘
                               │ reviews
                    ┌──────────▼──────────┐
                    │  Business Sponsor   │  ← Owns
                    └──────────┬──────────┘
                               │ commissions
                    ┌──────────▼──────────┐
                    │  Enterprise Architect│  ← Writes
                    │  + Finance Partner  │
                    └─────────────────────┘
```

!!! warning "Who Owns the Business Case"
    The **business sponsor** owns the business case — not the architect, not IT, not the vendor. The architect writes much of it in collaboration with the sponsor and a finance business partner. If IT "owns" the business case it will be perceived as a technology wish-list and will be challenged or rejected.

---

## The 11-Section Business Case Structure

The structure below is the standard used across most large enterprises and government bodies. Some organisations collapse or rename sections, but all 11 elements must appear somewhere in a fundable business case.

---

### Section 1 — Executive Summary

The executive summary is the most important section. Most approvers read only this section and skim the rest. If the executive summary does not make the case, the case will not be approved.

Apply the **Pyramid Principle**: lead with the answer, support with evidence. Do not build up to a conclusion — state the conclusion first, then justify it.

**The three questions your executive summary must answer:**

1. What is the problem and why does it matter right now?
2. What are you recommending, and what are the alternatives considered?
3. What does the organisation get in return for the investment?

**Target length: one page, never more than two.**

#### Executive Summary Template

```markdown
## Executive Summary

[ORGANISATION NAME] faces [CORE PROBLEM] which is costing the business approximately
$[ANNUAL COST] per year in [lost revenue / operational waste / compliance exposure /
customer churn]. If unaddressed, this cost is projected to grow to $[PROJECTED COST]
by [YEAR] due to [DRIVER].

Following analysis of three options — [OPTION A], [OPTION B], and the recommended
[OPTION C] — this business case recommends [RECOMMENDED OPTION] at a total investment
of $[AMOUNT] over [PERIOD].

The recommended option delivers:
- $[BENEFIT 1 AMOUNT] in [benefit type] over [period]
- $[BENEFIT 2 AMOUNT] in [benefit type] over [period]
- [INTANGIBLE BENEFIT] enabling [strategic outcome]

The combined three-year return is $[TOTAL BENEFIT], yielding a net benefit of
$[NET BENEFIT], a payback period of [N] months, and an ROI of [X]%.

A decision is required by [DATE] to achieve [MILESTONE] by [DATE].

**Investment requested: $[AMOUNT] [CapEx/OpEx/Hybrid]**
**Approval authority required: [ROLE / COMMITTEE]**
```

!!! tip "Pyramid Principle in Practice"
    Write your executive summary last. Once you have completed the full business case, you will know exactly what the most important insight is. Lead with that insight — not with background or context. Context belongs in Section 2.

---

### Section 2 — Problem Statement and Current State

This section establishes the burning platform. It quantifies the pain in business terms — not technology terms — and makes the cost of inaction undeniable.

#### How to Quantify Pain in Business Terms

| Pain Category | How to Measure | Example Metric |
|--------------|----------------|----------------|
| **Revenue impact** | Lost sales, missed opportunities | $2.4M annual revenue at risk from customer churn |
| **Cost inefficiency** | Manual effort, rework, waste | 14,000 person-hours per year on manual reconciliation |
| **Risk exposure** | Regulatory fines, breach probability | $5M maximum regulatory fine under current non-compliance |
| **Customer experience** | NPS, complaints, churn rate | 23% of support calls relate to this problem |
| **Speed / agility** | Cycle time, time-to-market | 47-day average time to onboard a new enterprise customer |

#### Current State Assessment Methods

- **Process walk-throughs**: shadow the business team doing the work
- **Data analysis**: extract metrics from existing systems (volumes, error rates, cycle times)
- **Benchmarking**: compare metrics against industry peers
- **Interview series**: structured interviews across business units affected
- **Value stream mapping**: visualise where waste accumulates

#### Cost of Inaction

Always calculate and state the cost of doing nothing. This is the most powerful part of the problem statement.

```markdown
### Cost of Inaction

Delaying this investment by 12 months results in:

| Cost Category         | Year 1 Impact |
|-----------------------|--------------|
| Continued manual cost | $1.8M        |
| Projected fraud loss  | $3.2M        |
| Regulatory exposure   | $0.5M        |
| Customer churn cost   | $1.1M        |
| **Total cost of delay** | **$6.6M**  |

The recommended investment of $4.2M therefore pays back in under 8 months
when measured against the cost of a single year's inaction.
```

!!! warning "Common Pitfall: Defining the Solution Before the Problem"
    The single most common mistake in business cases is jumping to the solution in Section 2. Statements like "We need to implement a new fraud detection platform because our current platform cannot handle real-time scoring" define the solution before establishing the problem. Write Section 2 entirely in business language. The solution appears in Section 5 onwards.

---

### Section 3 — Business Drivers

Business drivers explain *why this is the right moment* to invest. They connect the problem to forces the organisation cannot ignore.

#### The Five Driver Categories

**1. Strategic Alignment**

Show how the investment directly enables the stated corporate strategy. Quote the strategy document. Be specific — do not say "this supports our digital transformation"; say "this directly enables Goal 3 of the FY26 Strategy: reduce operational cost ratio from 62% to 54% by FY28."

**2. Regulatory Mandates**

If there is a regulatory deadline, name the regulation, the deadline, and the penalty. Regulators have more persuasive power than architects.

| Regulation | Requirement | Deadline | Non-compliance Penalty |
|------------|-------------|----------|----------------------|
| PCI DSS v4.0 | Real-time transaction monitoring | March 2025 | Up to $100K/month |
| APRA CPS 234 | Information security capability | Ongoing | Remediation orders |
| AML/CTF Act | Transaction threshold monitoring | June 2025 | Criminal liability |

**3. Competitive Pressure**

Reference what competitors are doing. Name the capability gap. Where possible cite publicly available information (annual reports, analyst research, press releases).

**4. Customer Demand**

Cite customer research, NPS data, support ticket analysis, or direct customer feedback that confirms the problem is costing customer loyalty.

**5. Operational Necessity**

Systems end-of-life, vendor support withdrawal, scalability ceiling, or technical debt accumulation that will eventually force action at higher cost.

!!! tip "Frame Drivers as Facts, Not Opinions"
    Every business driver must be supported by a reference: a regulatory document, a strategy paper, a market report, or an internal data extract. Unsupported claims invite challenge. Supported claims are very hard to dismiss.

---

### Section 4 — Future State Vision

This section describes what the business looks like *after* the investment succeeds. It is written in business outcomes, not technology features.

#### Business Outcomes vs. Technology Features

| Wrong (Technology Features) | Right (Business Outcomes) |
|-----------------------------|--------------------------|
| Deploy a real-time ML scoring engine | Fraud detected in under 200ms, stopping 94% of fraudulent transactions before settlement |
| Implement API-based integration layer | New banking products launched in 6 weeks instead of 9 months |
| Migrate to cloud-native architecture | Processing capacity scales automatically during peak periods with no manual intervention |
| Deploy MDM solution | A single customer record trusted by all business units, eliminating reconciliation |

#### How to Describe the Future State Without Over-Engineering

Structure the future state around three horizons:

```markdown
### Future State Vision

**Horizon 1 — Foundation (Months 1–6)**
The organisation has [CAPABILITY X] in place. Business teams can [DO THING Y]
without requiring [MANUAL STEP Z]. The cost of [PROCESS] falls from $X to $Y.

**Horizon 2 — Value Realisation (Months 7–18)**
With the foundation in place, the business can [EXPAND TO NEW MARKETS / SERVE
MORE CUSTOMERS / REDUCE HEADCOUNT IN AREA X]. Revenue from [SEGMENT] grows
by [AMOUNT] as [FRICTION] is removed.

**Horizon 3 — Strategic Position (Months 19–36)**
[ORGANISATION] is recognised as [INDUSTRY POSITION]. The platform enables
[CAPABILITY] that competitors cannot match without [TIME/COST] of investment.
```

!!! note "Keep Technology Out of This Section"
    Executives approve outcomes, not architectures. Save the technology design for appendices or a separate architecture document. The future state vision should be readable by the CFO with no technology background.

---

### Section 5 — Options Analysis

Every credible business case presents at least three options. Presenting only the recommended solution is not an analysis — it is a proposal, and it will be treated with more scepticism.

#### The Three Minimum Options

| Option | Also Known As | Purpose in the Analysis |
|--------|--------------|-------------------------|
| **Do Nothing** | Status Quo | Baseline; establishes cost of inaction |
| **Minimum Viable** | Tactical Fix / Point Solution | Lower cost, lower benefit; the "cheap" alternative |
| **Recommended** | Strategic / Full Solution | Optimal balance of cost, benefit, risk, and strategic fit |

You may add a fourth option (e.g. "Enhanced / Premium") if there is a genuine decision to be made about scope or ambition.

#### How to Evaluate Options

Score each option across five dimensions. Use a consistent scale (e.g. 1–5) and document the rationale for each score.

| Evaluation Dimension | Do Nothing | Minimum Viable | Recommended |
|---------------------|-----------|---------------|-------------|
| **Total Cost (3yr)** | $6.6M (inaction cost) | $1.8M | $4.2M |
| **Total Benefit (3yr)** | $0 | $2.1M | $9.8M |
| **Net Benefit (3yr)** | -$6.6M | $0.3M | $5.6M |
| **Strategic Fit** | 1/5 | 2/5 | 5/5 |
| **Risk Level** | High | Medium | Low-Medium |
| **Time to Value** | N/A | 4 months | 14 months |
| **Scalability** | None | Limited | Full |

#### Why "Do Nothing" Is Essential

"Do nothing" forces the organisation to confront the cost of inaction as a concrete number. It also frames the investment as a *choice* rather than a *cost*. Decision-makers who might reject a $4.2M investment rarely reject it when the alternative is a documented $6.6M cost of doing nothing.

!!! tip "Make Option 2 Genuinely Viable"
    The minimum viable option must be a real option that a reasonable person could choose. If it looks like a strawman designed to fail, the entire analysis loses credibility. Option 2 should have genuine merits — just not as good as Option 3 on the dimensions that matter most.

---

### Section 6 — Cost Analysis

Cost analysis must be complete, honest, and independently verifiable. The CFO's team will rebuild your numbers — if they find omissions, the entire business case loses credibility.

#### Total Cost of Ownership (TCO) Framework

Break costs into categories and show year-by-year for 3–5 years.

| Cost Category | Description | Examples |
|--------------|-------------|---------|
| **Software Licences** | Vendor licences, SaaS subscriptions | Platform licence, API calls, data feeds |
| **Infrastructure** | Compute, storage, networking | Cloud hosting, data centre, networking |
| **Implementation** | Professional services, internal staff | SI partner fees, internal project team |
| **Internal Labour** | FTE time during project | PM, BA, architect, test, change management |
| **Training & Change** | Learning, adoption, communications | Training design, delivery, change agents |
| **Migration** | Data migration, integration build | ETL development, data cleansing |
| **Run & Operate** | Ongoing operational costs | Support staff, monitoring, patching |
| **Contingency** | Risk buffer | Typically 15–20% of project cost |

#### Year-by-Year Projection Template

```markdown
### 3-Year Cost Profile

| Cost Item                  | Year 0 (Setup) | Year 1  | Year 2  | Year 3  | Total   |
|----------------------------|---------------|---------|---------|---------|---------|
| Software Licences          | $200K         | $400K   | $420K   | $441K   | $1,461K |
| Cloud Infrastructure       | $50K          | $300K   | $315K   | $331K   | $996K   |
| Implementation (SI)        | $800K         | $200K   | —       | —       | $1,000K |
| Internal Labour (project)  | $350K         | $150K   | —       | —       | $500K   |
| Training & Change Mgmt     | $80K          | $40K    | —       | —       | $120K   |
| Data Migration             | $150K         | —       | —       | —       | $150K   |
| Ongoing Operations (FTE)   | —             | $180K   | $180K   | $180K   | $540K   |
| Contingency (15%)          | $243K         | —       | —       | —       | $243K   |
| **Total**                  | **$1,873K**   | **$1,270K** | **$915K** | **$952K** | **$5,010K** |

*Note: Year 0 costs are one-time. Years 1–3 reflect ongoing run costs plus staged
implementation activities. All costs are in FY26 dollars.*
```

#### One-Time vs. Recurring Costs

Always separate these clearly. One-time costs are typically capitalised (CapEx); recurring costs are typically expensed (OpEx). This distinction matters for how the investment appears on the balance sheet and P&L.

| Type | Examples | Accounting Treatment |
|------|----------|---------------------|
| **One-time** | Software purchase, implementation, migration, hardware | CapEx (depreciated) |
| **Recurring** | SaaS subscriptions, support, operations staff, cloud run cost | OpEx (expensed) |

#### Handling Uncertainty

!!! warning "Never Present a Single-Point Cost Estimate"
    Every cost estimate carries uncertainty. Present a range, state your assumptions, and show what happens if key assumptions are wrong. A business case with a single-point estimate signals either overconfidence or inexperience.

Use a three-point estimate for uncertain items:

```
Optimistic: $3.6M  (assuming no scope changes, vendor pricing as quoted)
Most Likely: $4.2M (baseline estimate with 15% contingency)
Pessimistic: $5.4M (assuming 2-month delay and one major integration rework)
```

---

### Section 7 — Benefit Analysis

Benefits are the heart of the business case. They must be credible, traceable, and owned.

#### Tangible Benefits: The $Amount + Assumption Model

Every tangible benefit line must include: the dollar amount, the calculation method, and the key assumptions.

| Benefit | Year 1 | Year 2 | Year 3 | Total | Calculation Basis |
|---------|--------|--------|--------|-------|------------------|
| Fraud loss reduction | $1.2M | $2.4M | $2.8M | $6.4M | 35% reduction in fraud rate × $8M annual fraud loss |
| FTE reduction (ops) | $0.3M | $0.6M | $0.6M | $1.5M | 3 FTE redeployed × $100K fully-loaded cost |
| Investigation efficiency | $0.1M | $0.3M | $0.4M | $0.8M | 40% reduction in investigation time × 4 FTE × $100K |
| False positive reduction | $0.1M | $0.2M | $0.3M | $0.6M | 60% false positive reduction × $500K current processing cost |
| **Total Tangible** | **$1.7M** | **$3.5M** | **$4.1M** | **$9.3M** | |

#### Intangible Benefits: Proxy Measures

Intangible benefits must not be hand-waved. Each one needs a proxy measure that connects the intangible to a business outcome.

| Intangible Benefit | Proxy Measure | How It Will Be Tracked |
|-------------------|--------------|------------------------|
| Improved customer trust | NPS score in affected segment | Monthly NPS survey, baseline vs. post-implementation |
| Regulatory confidence | Number of regulatory findings | Annual regulatory audit score |
| Staff morale | Attrition rate in operations team | HR exit data, quarterly pulse survey |
| Competitive positioning | Win rate in enterprise segment | CRM opportunity data |

#### Benefit Phasing

Benefits do not arrive on day one of go-live. Model when they actually land.

```markdown
### Benefit Realisation Timeline

Month 1–6:   0% benefits — implementation in progress
Month 7–9:   20% benefits — pilot phase, limited transaction volume
Month 10–12: 60% benefits — full deployment, bedding in
Year 2:      85% benefits — optimisation complete
Year 3+:     100% benefits — steady state
```

#### Benefit Owners

Every benefit must have a named owner who commits to delivering it. Without a benefit owner, benefits are aspirations.

| Benefit | Owner | Commitment |
|---------|-------|------------|
| Fraud loss reduction | Chief Risk Officer | Signed benefit realisation plan |
| FTE redeployment | COO | Headcount plan approved |
| Customer NPS improvement | Chief Customer Officer | NPS target in scorecard |

!!! warning "The Benefit Ownership Gap"
    Business cases fail post-approval when no one is accountable for realising the benefits. Insist on named benefit owners and include benefit realisation reviews in the project governance plan.

---

### Section 8 — Risk Analysis

A risk analysis that only lists implementation risks is incomplete. You must cover three risk dimensions.

#### Dimension 1 — Investment Risks (Risks of Doing This)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Vendor fails to deliver on time | Medium | High | Contractual milestones with penalties; fixed-price contract |
| Internal team capacity insufficient | High | Medium | Resource plan confirmed before approval; backfill budget included |
| Data quality issues delay migration | Medium | High | Data assessment sprint in Phase 0; $150K contingency allocated |
| Scope creep inflates cost | High | Medium | Change control board; baseline locked post-discovery |
| User adoption fails | Low | High | Change management budget included; executive sponsor active |

#### Dimension 2 — Business Risks (Risks to the Business If We Proceed)

| Risk | Description | Mitigation |
|------|-------------|-----------|
| Operational disruption | Migration causes downtime during peak period | Migration scheduled for low-volume window; rollback plan documented |
| Third-party dependency | Critical API from external vendor | SLA agreed; fallback to batch processing available |
| Regulatory scrutiny | New system must be validated by regulator | Engage regulator in design phase; regulatory review milestone in plan |

#### Dimension 3 — Risk of Doing Nothing

This is often omitted and is arguably the most important risk section.

| Risk of Inaction | Current Probability | Financial Exposure |
|-----------------|--------------------|--------------------|
| Regulatory enforcement action | Medium | $5M fine + remediation cost |
| Fraud losses continue to grow | High | $1M additional per year |
| Competitor advantage widens | High | Estimated 8% market share risk over 3 years |
| Vendor end-of-life forces emergency replacement | High | 3× cost of planned replacement |

!!! note "Risk Appetite"
    If your organisation has a published risk appetite statement, reference it here. Show how the investment risk profile sits within appetite and how the risk of inaction breaches it.

---

### Section 9 — Financial Summary

The financial summary consolidates costs and benefits into standard financial metrics that the CFO and investment committee will use to compare this investment against others in the portfolio.

#### Core Financial Metrics

**Return on Investment (ROI)**

```
ROI = (Total Net Benefit / Total Investment) × 100

Example:
  Total 3-year benefit:   $9.3M
  Total 3-year cost:      $5.0M
  Net benefit:            $4.3M
  ROI:                    86%
```

**Payback Period**

```
Payback Period = Investment / Annual Net Benefit

Example:
  Total investment (Year 0 + Year 1): $3.1M
  Net benefit in Year 1:              $0.4M  (benefit minus ongoing cost)
  Net benefit in Year 2:              $2.6M
  Cumulative benefit exceeds cost:    ~Month 20
  Payback Period:                     20 months
```

**Net Present Value (NPV)**

NPV discounts future cash flows to today's dollars, accounting for the time value of money. Use your organisation's hurdle rate (typically 8–12%).

```
NPV = Σ (Cash Flow_t / (1 + r)^t) - Initial Investment

Where r = discount rate (e.g. 10%) and t = year

Year 0:   -$1.873M  (investment)
Year 1:   $0.430M net / (1.10)^1 = $0.391M
Year 2:   $2.585M net / (1.10)^2 = $2.136M
Year 3:   $3.148M net / (1.10)^3 = $2.364M

NPV = $0.391M + $2.136M + $2.364M - $1.873M = $3.018M
```

A positive NPV means the investment creates value in today's dollars.

#### Sensitivity Analysis

Show what happens to NPV if key assumptions change. This demonstrates that you have stress-tested your numbers and increases confidence in the analysis.

| Scenario | Assumption Change | NPV | Payback |
|----------|------------------|-----|---------|
| **Base Case** | As modelled | $3.0M | 20 months |
| **Pessimistic** | Benefits 25% lower, costs 15% higher | $0.4M | 32 months |
| **Optimistic** | Benefits 15% higher, costs as modelled | $4.8M | 16 months |
| **Cost Overrun Only** | Costs 30% higher, benefits as modelled | $1.8M | 26 months |
| **Benefit Shortfall Only** | Benefits 40% lower, costs as modelled | -$0.3M | Never | 

!!! warning "Flag the Break-Even Point"
    In the pessimistic scenario above, the NPV is still positive. In the benefit shortfall scenario, it is slightly negative. Use this to identify the break-even point: "Benefits can fall up to 38% from base case before this investment destroys value. We consider this scenario unlikely because [REASON]."

---

### Section 10 — Recommendation and Roadmap

This section must contain a clear, unambiguous recommendation. Business cases that "present options for the committee to consider" are weak. Your job is to make a recommendation and justify it.

#### Making the Recommendation

```markdown
## Recommendation

This business case recommends **Option 3: Full AI-Powered Fraud Detection Platform**
at a total investment of $4.2M over 18 months.

This recommendation is made on the basis that:

1. Option 3 is the only option that fully addresses the regulatory deadline of
   March 2025 while delivering strategic capability for future product development.

2. The 86% ROI and 20-month payback period place this investment in the top quartile
   of technology investments assessed by the investment committee in FY25.

3. The risk of inaction ($6.6M cost of delay per year) is significantly higher than
   the investment risk ($4.2M with 20-month payback).

4. Option 2 (minimum viable) does not meet the regulatory threshold and would
   require replacement within 24 months, resulting in higher total cost.
```

#### High-Level Phased Roadmap

| Phase | Timeframe | Key Activities | Exit Criteria |
|-------|-----------|---------------|--------------|
| **Phase 0: Discovery** | Months 1–2 | Data assessment, architecture design, vendor selection | Architecture sign-off, vendor contracted |
| **Phase 1: Foundation** | Months 3–8 | Core platform build, data pipeline, model training | Model achieving >90% detection accuracy in test |
| **Phase 2: Pilot** | Months 9–11 | Limited live deployment, 20% transaction volume | <0.5% false positive rate confirmed |
| **Phase 3: Full Rollout** | Months 12–15 | 100% transaction volume, decommission legacy | Zero outages in 30-day stability window |
| **Phase 4: Optimise** | Months 16–18 | Model tuning, feature expansion, reporting | Benefits realisation review completed |

#### Decision Required

Always state explicitly what decision is being requested and by when.

```markdown
### Decision Required

**The investment committee is asked to:**

1. Approve Option 3 at a budget of $4.2M (split: $3.1M CapEx, $1.1M OpEx Year 1)
2. Authorise the Chief Risk Officer as Executive Sponsor
3. Confirm vendor selection authority to the programme steering committee

**Decision required by: [DATE]**

A decision after this date risks missing the March 2025 regulatory deadline,
exposing the organisation to potential enforcement action.
```

---

### Section 11 — Investment Request

The final section makes the exact funding ask, states the funding mechanism, and identifies the approval authority.

```markdown
## Investment Request

### Funding Summary

| Category | Amount | Type | Notes |
|----------|--------|------|-------|
| Software & Licences | $1,461K | CapEx | Depreciated over 5 years |
| Implementation | $1,500K | CapEx | Capitalised as intangible asset |
| Infrastructure (setup) | $50K | CapEx | Hardware/cloud setup |
| Contingency | $243K | CapEx | 15% of capital cost |
| **Total Capital Request** | **$3,254K** | **CapEx** | |
| | | | |
| Cloud Run Cost (Year 1) | $300K | OpEx | |
| Operations FTE (Year 1) | $180K | OpEx | |
| Licences ongoing (Year 1) | $400K | OpEx | |
| **Total Year 1 OpEx** | **$880K** | **OpEx** | |
| | | | |
| **Total Year 1 Investment** | **$4,134K** | | |

### Funding Mechanism

The CapEx component will be sourced from the [CAPEX POOL / STRATEGIC INVESTMENT FUND].
The OpEx component will be funded from [BUSINESS UNIT COST CENTRE] from FY26 budget.

### Approval Authority

Per the Delegated Financial Authority Policy:
- Amounts >$1M CapEx require Investment Committee approval
- Executive Sponsor: [NAME, ROLE]
- Finance delegate: [NAME, ROLE]

### Next Steps Upon Approval

1. Programme Director appointed within 5 business days
2. Vendor contract executed within 20 business days
3. Phase 0 kick-off within 30 business days
4. First steering committee review at end of Phase 0
```

---

## Full Copy-Paste Business Case Template

Use this template as your starting framework. Replace all `[PLACEHOLDER]` text with your content.

```markdown
# Business Case: [PROJECT NAME]

**Version:** 1.0 DRAFT / FINAL
**Date:** [DATE]
**Author:** [NAME, ROLE]
**Business Sponsor:** [NAME, ROLE]
**Status:** [DRAFT FOR REVIEW / SUBMITTED FOR APPROVAL]

---

## Executive Summary

[ORGANISATION] faces [PROBLEM] which costs approximately $[AMOUNT] per year.
If unaddressed, this will grow to $[AMOUNT] by [YEAR] due to [DRIVER].

Following analysis of [N] options, this business case recommends [OPTION]
at a total investment of $[AMOUNT] over [PERIOD].

Key returns:
- $[AMOUNT]: [BENEFIT 1] over [PERIOD]
- $[AMOUNT]: [BENEFIT 2] over [PERIOD]
- [INTANGIBLE BENEFIT]

3-year net benefit: $[AMOUNT] | Payback: [N] months | ROI: [X]%

**Investment requested: $[AMOUNT] [CapEx/OpEx/Hybrid]**
**Decision required by: [DATE]**

---

## 1. Problem Statement and Current State

### The Problem
[Describe the problem in business terms. What is broken, slow, risky, or costly?]

### Current State Assessment
[Describe how you assessed the current state: interviews, data analysis, benchmarks]

### Quantified Pain
| Pain Area | Current Metric | Business Impact |
|-----------|---------------|----------------|
| [AREA 1]  | [METRIC]      | $[AMOUNT]/year |
| [AREA 2]  | [METRIC]      | $[AMOUNT]/year |
| [AREA 3]  | [METRIC]      | [RISK EXPOSURE] |

### Cost of Inaction
Delaying this investment by 12 months costs the organisation $[AMOUNT] in
[CATEGORY] and increases [RISK TYPE] exposure by [AMOUNT].

---

## 2. Business Drivers

### Strategic Alignment
[Quote specific strategic goals this investment enables. Reference the source document.]

### Regulatory / Compliance
[Name the regulation, the requirement, the deadline, and the penalty for non-compliance.]

### Competitive Pressure
[Describe what competitors are doing and the resulting capability gap.]

### Customer Demand
[Cite customer research or data that confirms the problem matters to customers.]

### Operational Necessity
[Describe any system end-of-life, scalability ceiling, or technical debt forcing action.]

---

## 3. Future State Vision

### Business Outcomes After Investment
[Describe what the business looks like after success. Use business language, not technology.]

### Horizon View
**Horizon 1 (Months 1–[N]):** [CAPABILITY / OUTCOME]
**Horizon 2 (Months [N]–[N]):** [CAPABILITY / OUTCOME]
**Horizon 3 (Months [N]–[N]):** [CAPABILITY / OUTCOME]

---

## 4. Options Analysis

### Option 1 — Do Nothing (Status Quo)
[Describe what happens if no action is taken. Include the ongoing cost.]

### Option 2 — Minimum Viable ([SHORT NAME])
[Describe the minimum viable option: what it does, what it does not do, cost, benefit.]

### Option 3 — Recommended ([SHORT NAME])
[Describe the recommended option in full.]

### Options Comparison

| Dimension            | Option 1 | Option 2 | Option 3 |
|----------------------|----------|----------|----------|
| 3-year net benefit   | $[X]     | $[X]     | $[X]     |
| Strategic fit (1–5)  | [X]      | [X]      | [X]      |
| Risk level           | [X]      | [X]      | [X]      |
| Time to value        | N/A      | [X] mo   | [X] mo   |

**Recommended: Option 3** because [CONCISE REASON].

---

## 5. Cost Analysis

### TCO by Category (3-Year)

| Cost Item              | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|-----------------------|--------|--------|--------|--------|-------|
| Software Licences     | $[X]   | $[X]   | $[X]   | $[X]   | $[X]  |
| Infrastructure        | $[X]   | $[X]   | $[X]   | $[X]   | $[X]  |
| Implementation        | $[X]   | $[X]   | —      | —      | $[X]  |
| Internal Labour       | $[X]   | $[X]   | —      | —      | $[X]  |
| Training & Change     | $[X]   | $[X]   | —      | —      | $[X]  |
| Operations (ongoing)  | —      | $[X]   | $[X]   | $[X]   | $[X]  |
| Contingency ([X]%)    | $[X]   | —      | —      | —      | $[X]  |
| **Total**             | **$[X]** | **$[X]** | **$[X]** | **$[X]** | **$[X]** |

*Key assumptions: [LIST ASSUMPTIONS]*
*Cost range: Optimistic $[X] / Most Likely $[X] / Pessimistic $[X]*

---

## 6. Benefit Analysis

### Tangible Benefits

| Benefit               | Year 1 | Year 2 | Year 3 | Total | Basis |
|----------------------|--------|--------|--------|-------|-------|
| [BENEFIT 1]          | $[X]   | $[X]   | $[X]   | $[X]  | [HOW CALCULATED] |
| [BENEFIT 2]          | $[X]   | $[X]   | $[X]   | $[X]  | [HOW CALCULATED] |
| **Total**            | **$[X]** | **$[X]** | **$[X]** | **$[X]** | |

### Intangible Benefits

| Benefit | Proxy Measure | Tracking Method |
|---------|--------------|----------------|
| [BENEFIT] | [METRIC] | [METHOD] |

### Benefit Owners

| Benefit | Owner | Commitment |
|---------|-------|-----------|
| [BENEFIT] | [NAME, ROLE] | [SIGNED PLAN / SCORECARD TARGET] |

---

## 7. Risk Analysis

### Investment Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| [RISK] | [H/M/L] | [H/M/L] | [MITIGATION] |

### Risk of Inaction

| Risk | Probability | Exposure |
|------|------------|---------|
| [RISK] | [H/M/L] | $[X] |

---

## 8. Financial Summary

| Metric | Value |
|--------|-------|
| Total 3-year investment | $[X] |
| Total 3-year benefit | $[X] |
| Net benefit | $[X] |
| ROI | [X]% |
| Payback period | [X] months |
| NPV (at [X]% discount rate) | $[X] |

*Sensitivity: Benefits can fall [X]% before NPV turns negative.*

---

## 9. Recommendation

This business case recommends **[OPTION NAME]** at a total investment of **$[AMOUNT]**.

[2–3 sentences explaining why this is the right choice.]

[State clearly what the committee is being asked to approve.]

**Decision required by [DATE]** to achieve [MILESTONE] by [DATE].

---

## 10. Investment Request

| Category | Amount | Type |
|----------|--------|------|
| [CATEGORY] | $[X] | CapEx |
| [CATEGORY] | $[X] | OpEx |
| **Total Year 1** | **$[X]** | |

**Approval authority required:** [ROLE / COMMITTEE]
**Executive Sponsor:** [NAME, ROLE]
```

---

## Worked Example — AI Fraud Detection Platform at MidWest Bank

This section works through a complete, realistic business case for a mid-size regional bank seeking to replace its legacy fraud detection system with an AI-powered real-time platform.

---

### Context

**Organisation:** MidWest Community Bank (fictitious)
**Revenue:** $480M annual revenue, 620,000 customer accounts
**Problem:** Legacy rule-based fraud detection system built in 2011. False positive rate of 38%. Unable to process real-time card transactions. Regulatory finding from FDIC audit requires remediation by Q1 2025.

---

### Executive Summary (Worked)

MidWest Community Bank's legacy fraud detection system is causing $8.2M in annual losses: $6.1M in undetected fraud and $2.1M in operational cost from manual investigation of false positives. The system cannot support real-time card transaction scoring, placing the bank outside FDIC regulatory guidelines and exposing it to enforcement action.

Following analysis of three options, this business case recommends implementation of an AI-powered fraud detection platform (FraudShield AI, or equivalent) at a total investment of **$4.2M** over 18 months.

The recommended option delivers:
- **$6.4M** in fraud loss reduction over 3 years (35% reduction in fraud rate)
- **$2.1M** in operational savings from reduced false positives and FTE redeployment
- **$1.3M** in avoided regulatory costs
- Full compliance with FDIC real-time monitoring requirements by March 2025

**3-year financial summary:**

| Metric | Value |
|--------|-------|
| Total investment (3yr) | $5.0M |
| Total benefit (3yr) | $9.8M |
| Net benefit | $4.8M |
| ROI | 96% |
| Payback period | 20 months |
| NPV (at 10%) | $3.2M |

**Investment requested: $4.2M (Year 1) — $3.1M CapEx / $1.1M OpEx**
**Approval authority: Board Investment Committee**
**Decision required by: 15 August 2024** to meet March 2025 regulatory deadline.

---

### Problem Statement (Worked)

#### Quantified Pain

| Pain Area | Current Metric | Annual Business Impact |
|-----------|---------------|----------------------|
| Undetected fraud | 65% detection rate | $6.1M fraud losses |
| False positive rate | 38% of flagged transactions | $2.1M investigation cost (14 FTE) |
| Manual review volume | 4,200 cases/month | 14,000 person-hours/year |
| Card transaction speed | Batch processing (T+4 hours) | Cannot block fraud before settlement |
| Regulatory non-compliance | FDIC finding issued Feb 2024 | Enforcement action risk |

#### Cost of Inaction

| Cost of Delay (12 months) | Amount |
|--------------------------|--------|
| Continued fraud losses | $6.1M |
| Investigation operations | $2.1M |
| Regulatory enforcement risk | $0.5M |
| Emergency replacement premium | $1.8M (estimated) |
| **Total cost of 12-month delay** | **$10.5M** |

---

### Business Drivers (Worked)

**Strategic Alignment:** The FY25–27 Bank Strategy explicitly targets "reducing fraud loss ratio from 1.27% to 0.65% of card transaction volume by FY27" (Strategic Goal 4). This investment directly enables that target.

**Regulatory Mandate:** FDIC Examination Finding #2024-047 (February 2024) requires MidWest Bank to implement real-time transaction monitoring capability by 31 March 2025. Non-compliance carries risk of a Consent Order, potential civil money penalty up to $1M, and reputational exposure.

**Competitive Pressure:** Regional bank peer analysis (Federal Reserve H.8 data, Q4 2023) shows 7 of 10 comparable institutions have already deployed AI-based fraud scoring. MidWest's fraud loss ratio of 1.27% compares to a peer median of 0.71%.

**Customer Demand:** Customer satisfaction survey (Q1 2024, n=2,400) shows 31% of customers who experienced a false positive declined transaction reported reduced trust in the bank. NPS among this segment is -14 vs. +28 for customers with no false positive experience.

---

### Options Analysis (Worked)

| Dimension | Option 1: Do Nothing | Option 2: Rules Enhancement | Option 3: AI Platform (Recommended) |
|-----------|---------------------|---------------------------|--------------------------------------|
| 3-yr benefit | $0 | $3.1M | $9.8M |
| 3-yr cost | $10.5M (inaction) | $1.4M | $5.0M |
| Net benefit | -$10.5M | $1.7M | $4.8M |
| FDIC compliance | No | Partial | Yes — full |
| Real-time scoring | No | No | Yes |
| Strategic fit | 1/5 | 2/5 | 5/5 |
| Scalability | None | 2 years max | 10+ years |
| Time to value | N/A | 4 months | 14 months |
| Risk level | Very High | Medium | Low-Medium |

**Option 2 rejected because:** Rules enhancement does not support real-time scoring and therefore does not satisfy the FDIC finding. It would require replacement within 24 months, resulting in higher total cost than Option 3.

---

### Cost Analysis (Worked)

| Cost Item | Year 0 | Year 1 | Year 2 | Year 3 | Total |
|-----------|--------|--------|--------|--------|-------|
| FraudShield AI Licence | $200K | $420K | $441K | $463K | $1,524K |
| Cloud Infrastructure (AWS) | $60K | $312K | $328K | $344K | $1,044K |
| Implementation (SI Partner) | $820K | $180K | — | — | $1,000K |
| Internal Project Team | $340K | $160K | — | — | $500K |
| Data Migration & Integration | $160K | — | — | — | $160K |
| Training & Change Management | $90K | $40K | — | — | $130K |
| Fraud Ops Team (ongoing) | — | $180K | $180K | $180K | $540K |
| Contingency (15% of CapEx) | $243K | — | — | — | $243K |
| **Total** | **$1,913K** | **$1,292K** | **$949K** | **$987K** | **$5,141K** |

*Three-point estimate: Optimistic $4.1M / Most Likely $5.1M / Pessimistic $6.4M*

*Key assumptions: AWS pricing based on 2,400 transactions/second peak load; FraudShield pricing per vendor quote dated June 2024; SI estimate based on comparable implementation at First Regional Bank (12 months, 4 SI FTE).*

---

### Benefit Analysis (Worked)

#### Tangible Benefits

| Benefit | Year 1 | Year 2 | Year 3 | Total | Calculation |
|---------|--------|--------|--------|-------|-------------|
| Fraud loss reduction | $1.2M | $2.4M | $2.8M | $6.4M | 35% detection improvement × $8M fraud loss base; phased from Month 10 |
| False positive cost reduction | $0.3M | $0.6M | $0.6M | $1.5M | 60% false positive reduction × $2.1M ops cost; phased from Month 10 |
| FTE redeployment | $0.2M | $0.4M | $0.4M | $1.0M | 4 FTE × $100K fully-loaded; redeployed to growth activities |
| Avoided regulatory cost | $0.5M | $0.3M | — | $0.8M | Estimated remediation programme avoided; regulatory counsel estimate |
| Chargeback reduction | $0.05M | $0.1M | $0.15M | $0.3M | 15% reduction in chargebacks × $300K annual chargeback cost |
| **Total** | **$2.25M** | **$3.8M** | **$3.95M** | **$10.0M** | |

#### Intangible Benefits

| Benefit | Proxy Measure | Baseline | Target |
|---------|--------------|---------|--------|
| Customer trust | NPS, fraud-affected segment | -14 | +10 |
| Regulatory confidence | FDIC examination findings | 1 open finding | 0 findings |
| Staff satisfaction | Attrition, fraud ops team | 28% annual attrition | <15% |
| Analytics capability | New fraud product features | 0 deployable models | 5+ models |

#### Benefit Realisation Timeline

| Period | Benefit % | Rationale |
|--------|----------|-----------|
| Month 1–9 | 0% | Implementation and pilot |
| Month 10–12 | 40% | Partial deployment, 40% transaction volume |
| Year 2 | 85% | Full deployment, model tuning |
| Year 3+ | 100% | Steady state |

---

### Risk Register (Worked)

| ID | Risk | Likelihood | Impact | Score | Mitigation |
|----|------|-----------|--------|-------|-----------|
| R01 | FraudShield model underperforms (<85% detection rate) | Low | High | Medium | Contractual accuracy SLA; 3-month parallel run before cutover |
| R02 | Internal team capacity gap | High | Medium | High | Dedicated project team approved; backfill for 2 FTE in operations |
| R03 | Data quality issues delay model training | Medium | High | High | 6-week data assessment sprint in Phase 0; $160K migration budget |
| R04 | FDIC deadline missed due to delay | Medium | Very High | High | Phase 0 starts within 30 days of approval; fortnightly steering review |
| R05 | Cloud cost overrun | Low | Medium | Low | Cost alerts at 80% of budget; monthly FinOps review |
| R06 | False positive rate increases during transition | Medium | Medium | Medium | Parallel run — legacy and new system running simultaneously for 90 days |
| R07 | Key staff leave during project | Low | Medium | Low | Retention incentives for 4 key SMEs during project period |

**Risk of Inaction (Top 3):**

| Risk | Probability | Financial Exposure |
|------|------------|-------------------|
| FDIC Consent Order | Medium | $1M+ civil penalty + mandatory remediation |
| Fraud losses grow 15% YoY | High | Additional $0.9M loss per year |
| Emergency replacement (post-enforcement) | High | 3× cost ($12M+) under time pressure |

---

### Financial Summary (Worked)

| Metric | Value | Notes |
|--------|-------|-------|
| Total 3-year investment | $5.1M | Including Year 0 setup |
| Total 3-year benefit | $10.0M | Tangible benefits only |
| Net 3-year benefit | $4.9M | |
| ROI | 96% | |
| Payback period | 20 months | From project start |
| NPV (10% discount rate) | $3.2M | Positive; investment creates value |
| Break-even (sensitivity) | Benefits fall 48% | NPV = $0 at 52% of base case benefits |

#### Sensitivity Table

| Scenario | Benefit Assumption | Cost Assumption | NPV | Payback |
|----------|------------------|----------------|-----|---------|
| Base Case | 100% | 100% | $3.2M | 20 months |
| Benefits -25% | 75% | 100% | $1.4M | 26 months |
| Costs +20% | 100% | 120% | $2.2M | 23 months |
| Pessimistic | 75% | 120% | $0.4M | 32 months |
| Break-even | 52% | 100% | ~$0 | 48 months |

The investment remains NPV-positive under all scenarios except extreme benefit shortfall (>48% below base case). The project team considers this scenario unlikely given contractual detection rate SLAs with the vendor.

---

### Recommendation (Worked)

This business case recommends **Option 3: FraudShield AI Platform** at a total investment of **$4.2M in Year 1** ($3.1M CapEx, $1.1M OpEx).

This recommendation is made because:
1. It is the only option that achieves full FDIC compliance by the March 2025 deadline.
2. The 96% ROI and 20-month payback represent strong value relative to the investment committee's 30-month payback threshold.
3. The risk of inaction ($10.5M cost of 12-month delay) is 2.5× the investment.
4. The platform positions the bank to develop new fraud-based analytics products, supporting Strategic Goal 6 (product innovation).

**The Board Investment Committee is asked to:**
1. Approve Option 3 at $4.2M Year 1 (CapEx $3.1M / OpEx $1.1M)
2. Designate the Chief Risk Officer as Executive Sponsor
3. Authorise the Programme Director to begin vendor contract negotiation

**Decision required by 15 August 2024** — any later risks missing the 31 March 2025 FDIC deadline.

---

## Teaching Lenses

### Beginner Lens

If this is your first business case, focus on three things: (1) quantify the problem before you mention the solution, (2) always present at least three options, and (3) name a benefit owner for every dollar of claimed benefit. These three practices will put your business case ahead of 80% of what investment committees see.

Start with the problem statement. Interview the people doing the work. Extract the numbers from the systems. The numbers do the persuading — your job is to find and present them honestly.

### Enterprise Lens

In large organisations, business cases must navigate multiple approval gates: project governance board, architecture review board, investment committee, and sometimes an executive leadership team. Each audience wants a slightly different cut of the same information. Design your business case with a modular structure so you can extract the one-page executive summary for the board, the financial model for the CFO, and the risk register for the CRO without rewriting the document.

In enterprise contexts, the political dynamics around who "owns" the business case matter enormously. If IT owns it, it is perceived as a technology spend. If Finance co-owns it, it is perceived as a business investment. Always ensure the business sponsor's name is on the cover.

### Architecture Lens

As an enterprise architect, your specific contribution to the business case is the options analysis and the future state architecture sketch. You are uniquely positioned to know which options are technically credible, which are tactical dead-ends, and which create strategic optionality for future capabilities.

Do not hide your architectural reasoning behind vague statements like "this solution is more scalable." Name the architectural decisions: "Option 3 is recommended because its event-driven architecture supports real-time scoring at 2,400 TPS without replatforming, while Option 2's polling architecture caps at 400 TPS and would require replacement within 18 months."

Specific architectural claims are far more persuasive than general ones.

### Executive Lens

Executives reading business cases are pattern-matching against investments they have seen succeed and fail. The patterns they are suspicious of: benefit estimates with no named owner, costs that appear to have omitted the run cost, risks that are listed but not mitigated, and recommendations that do not include a clear "do nothing" option.

The most effective business cases for executive audiences are the shortest ones that answer all four questions (why this / why now / why this much / why us) in the first two pages. Everything after that is supporting evidence that should be readable in any order.

### Consultant Lens

When writing a business case as an external consultant or adviser, you face a credibility challenge: the organisation's own people will wonder if you are recommending the option that generates the most consulting fees. Counter this by being the most rigorous analyst in the room. Model the do-nothing option. Stress-test your own benefit assumptions. Flag the risks most likely to derail the project. Consultants who identify problems they will be paid to solve lose credibility. Consultants who identify problems they will not personally benefit from solving earn it.

---

## Common Mistakes

!!! warning "Mistake 1 — Defining the Solution Before the Problem"
    Writing "we need to implement [TECHNOLOGY X]" in the problem statement. The problem statement must be written entirely in business language. Technology appears in Section 5.

!!! warning "Mistake 2 — Omitting the Do-Nothing Option"
    Presenting only the recommended option and one alternative. Without the do-nothing option, decision-makers cannot assess the cost of inaction. The do-nothing option often does more persuasion work than the recommendation itself.

!!! warning "Mistake 3 — Unowned Benefits"
    Claiming $9M in benefits without a named business leader who has committed to delivering them. An investment committee will ask: "Who is accountable for delivering this $9M?" If there is no answer, the benefits will be heavily discounted.

!!! warning "Mistake 4 — Single-Point Cost Estimates"
    Presenting costs without a range or stated assumptions. Every major cost item carries uncertainty. Presenting a range with documented assumptions signals analytical rigor; presenting a single point signals false precision.

!!! warning "Mistake 5 — Technology-Language Future State"
    Describing the future state as "a microservices-based API layer deployed on Kubernetes with a real-time Kafka event bus" rather than "new products launched in 6 weeks instead of 9 months." Executives approve business outcomes, not technology designs.

!!! warning "Mistake 6 — Missing the Cost of Operations"
    Including the implementation cost but omitting the ongoing run cost (staff, licences, infrastructure). A business case that shows a low implementation cost but hides a high ongoing cost will be discovered and discredited.

!!! warning "Mistake 7 — Padding Benefits, Trimming Costs"
    Over-estimating benefits while presenting a best-case cost scenario. Investment committees have seen this pattern thousands of times. Model your costs at the 80th percentile (slightly pessimistic) and your benefits at the 50th percentile (most likely). If the case still works, it is robust.

!!! warning "Mistake 8 — No Sensitivity Analysis"
    Presenting financial metrics without showing what happens if assumptions change. A business case with no sensitivity analysis signals that the author has not tested their own assumptions.

!!! warning "Mistake 9 — Burying the Recommendation"
    Writing fifteen pages of analysis before stating the recommendation. Apply the Pyramid Principle: lead with the recommendation. Decision-makers are busy and will appreciate knowing the conclusion before reading the evidence.

!!! warning "Mistake 10 — No Clear Decision Request"
    Ending the business case with "we hope the committee will consider this investment" rather than a specific ask. State exactly what you are asking the committee to approve, to what dollar value, and by what date.

!!! warning "Mistake 11 — Ignoring the Risk of Inaction"
    Covering investment risks thoroughly while treating "do nothing" as a safe option. Doing nothing is almost always a choice with costs and risks. Make those costs explicit and specific.

!!! warning "Mistake 12 — Omitting the Approval Timeline"
    Failing to state when a decision is needed and why. Without a deadline and a reason for the deadline, approval can drift for months. "A decision is needed by X to achieve Y by Z" creates urgency and accountability.

---

## Reflection Questions

1. **The Four Questions Test:** Take a business case you have written or seen. Can you identify which sentences answer "Why this?", "Why now?", "Why this much?", and "Why us?"? Are there sections that do not answer any of the four? What would you cut?

2. **The Do-Nothing Challenge:** What is the true cost of inaction for the last major initiative in your organisation? Was it modelled explicitly in the business case? If not, how did its absence affect the quality of the investment decision?

3. **Benefit Ownership:** Think of a technology project that delivered less value than promised. Was there a named benefit owner for each claimed benefit? What did the absence of benefit ownership enable?

4. **The Executive Summary Test:** Hand your executive summary to someone outside the project — a peer in a different department, or a friend outside the industry. Can they tell you the problem, the recommendation, the investment, and the return in under two minutes? If not, what clarity is missing?

5. **Sensitivity Stress-Test:** In your financial model, what is the single assumption that, if wrong, most endangers the positive NPV? Have you named it, quantified the impact, and explained why you believe it is the most likely outcome? If the NPV depends on an assumption you cannot defend, what does that tell you?

---

## Mastery Checklist

Work through this checklist before submitting any business case for review or approval.

- [ ] **Executive summary is one page or less and answers all four core questions**
- [ ] **Problem statement uses no technology language**
- [ ] **Every pain point in the problem statement has a dollar amount or a measurable metric**
- [ ] **Cost of inaction is explicitly calculated and stated**
- [ ] **All business drivers are supported by a referenced source (not an unsupported assertion)**
- [ ] **Future state is described in business outcomes, not technology features**
- [ ] **At least three options are presented, including do-nothing**
- [ ] **Do-nothing option includes the ongoing cost of inaction, not just $0**
- [ ] **Total cost of ownership includes all five years of run cost, not just implementation**
- [ ] **Costs are presented as a range (optimistic / most likely / pessimistic) with stated assumptions**
- [ ] **One-time costs are separated from recurring costs, with correct CapEx/OpEx classification**
- [ ] **Every tangible benefit line includes the dollar amount, the calculation method, and the key assumption**
- [ ] **Intangible benefits each have a proxy measure and a tracking method**
- [ ] **Every benefit has a named owner who has committed to delivering it**
- [ ] **Benefits are phased to reflect realistic realisation timing (not day-one go-live)**
- [ ] **Risk register covers investment risks, business risks, and risks of inaction**
- [ ] **Financial summary includes ROI, payback period, and NPV**
- [ ] **Sensitivity analysis shows break-even point and names the most dangerous assumption**
- [ ] **Recommendation is stated clearly on page one, not buried in the conclusion**
- [ ] **Investment request states the exact amount, the funding mechanism, the approval authority, and the decision date**

!!! tip "A Well-Crafted Business Case Is a Strategic Asset"
    A business case that survives rigorous challenge and earns approval does more than fund a project — it establishes the architect's credibility as a strategic partner to the business. Every sentence that quantifies a problem, every benefit with a named owner, and every risk that is acknowledged rather than hidden contributes to that credibility. Write the business case you would want to receive if you were the CFO.
