---
title: "Case Study: National Tax Authority — AI Risk-Based Audit Intelligence"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-13-case-studies"]
doc_type: narrative-case-study
industry: government
protagonist_role: "Enterprise Architecture Lead"
core_tension: "Legacy government systems blocking citizen service modernization"
---
## Cast of Characters

*(Refer to the organisation background and key stakeholders described in this case study.)*


## Overview

| Attribute | Detail |
|-----------|--------|
| Organisation | National Tax Authority (NTA) |
| Sector | Government / Public Administration |
| Scale | 40 million tax returns per year, 18,000 staff |
| Engagement type | Enterprise Architecture advisory + solution delivery oversight |
| Duration | 26 months (8 months procurement + 18 months delivery) |
| Investment | $7.4 million (AIA — AI architecture and implementation) |
| EA team size | 4 (EA Lead, Data Architect, Solution Architect, Change Lead) |

---

## Step 1 — Understand the Business Context

The National Tax Authority processes 40 million individual, corporate, trust, and GST returns annually. Its compliance division employs 2,400 staff dedicated to audit selection, investigation, and case management. The authority's legislative mandate requires it to close the annual "tax gap" — the difference between tax legally owed and tax actually collected — which the Treasury estimated at $2.1 billion per year.

The strategic problem was not volume. The NTA processed returns efficiently. The problem was precision: the authority was auditing the wrong returns.

!!! info "The Compliance Paradox"
    Only 22% of audited returns resulted in a material adjustment. That means 78 out of every 100 audit resources were expended on compliant taxpayers — a civic harm (compliance burden on law-abiding citizens) as well as a fiscal one ($420M annual spend with poor return on enforcement effort).

The trigger for the engagement was a Treasury-commissioned review that found the NTA's compliance ROI had declined for five consecutive years despite stable headcount. The Commissioner of Taxation commissioned an EA-led review to determine whether modern data and AI capabilities could change the economics of tax compliance.

---

## Step 2 — Document the Current State

### Current-State Architecture Summary

The NTA's technology environment had accumulated over three decades of investment across three separate legislative domains, each with its own IT system and governance model.

| System | Domain | Age | Records | Integration |
|--------|--------|-----|---------|-------------|
| ReturnLink | Income tax (individuals + corporates) | Built 1994, extended 2008 | 40M returns/year | No real-time API; batch extract nightly |
| VATIS | Value-Added Tax (VAT/GST) | Built 2001 | 6.2M registered entities | Separate identity model; no TFN linkage |
| CustomsNet | Customs and import/export duty | Built 1998 (acquired system) | 400K traders | Different taxpayer identifier (ABN subset) |
| AuditCase | Audit case management | Built 2011 | Active cases only | Manual data entry from all three sources |

The cross-system linkage gap was the single most significant architectural problem. A corporate taxpayer operating across income, GST, and customs had three separate records with no automated way to identify them as a single entity.

### Current-State Risk Scoring Engine

The risk scoring engine — known internally as IRIS (Integrated Risk Identification System) — was implemented in 1998. It operated as a set of 847 Boolean rules. Examples:

```
IF (net_income / gross_income) < 0.04 AND industry_code IN ('construction', 'hospitality')
   THEN risk_score += 15

IF (deductions_total / income_total) > 0.85
   THEN risk_score += 22

IF (gst_reported_sales - income_tax_reported_sales) > $50,000
   THEN risk_score += 18  -- Note: requires manual cross-system check; not automated
```

!!! warning "The 1998 Problem"
    The last substantive review of the ruleset was in 2003. Many rules referenced industry thresholds and deduction benchmarks that had not been updated for inflation or structural changes in the economy (e.g., gig economy income, cryptocurrency capital gains, digital services VAT). Rules designed for a 1998 economy were filtering a 2024 taxpayer population.

### Current-State Process Flow

```
Tax Return Lodged
       ↓
IRIS Rules Engine (overnight batch)
       ↓
Risk Score Assigned (0–100)
       ↓
Audit Queue Generated (top 2% by score)
       ↓
District Office Manual Review
       ↓
Audit Officer Selects Cases (judgment-based)
       ↓
Audit Conducted
       ↓
Outcome Recorded in AuditCase (manual entry)
       ↓
No feedback loop to IRIS rules
```

The absence of a feedback loop was critical. IRIS never learned which cases resulted in adjustments and which did not. Audit outcomes existed in AuditCase but were never used to validate or refine the risk scoring ruleset.

---

## Step 3 — Identify the Strategic Opportunity

EA analysis identified four compounding problems creating the 22% precision rate:

1. **Stale rules** — IRIS rules were not calibrated to current income patterns, deduction norms, or industry benchmarks.
2. **No cross-system intelligence** — Income, VAT, and customs signals were never combined into a single risk view.
3. **No learning loop** — Audit outcomes were never fed back to improve scoring.
4. **Human queue override** — Audit officers frequently bypassed the queue based on local knowledge or workload, destroying any signal the queue had.

The strategic opportunity was to replace a static, rule-based risk filter with a continuously learning ML model that:

- Ingested signals from all three tax systems
- Incorporated third-party data (property registry, ASIC company filings, ABS industry benchmarks)
- Explained its decisions in plain language (regulatory requirement)
- Learned from audit outcomes on a quarterly retraining cycle

---

## Step 4 — Define the Future-State Architecture

### Target Architecture Components

```
┌─────────────────────────────────────────────────────────┐
│                  TAXPAYER DATA FABRIC                    │
│  ReturnLink ──┐                                         │
│  VATIS ───────┼──► Entity Resolution Engine             │
│  CustomsNet ──┘    (Golden Taxpayer Record)             │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              ML RISK SCORING PLATFORM                    │
│  Feature Engineering → Model Training → Score Output    │
│  Explainability Layer (SHAP values → plain English)     │
│  Quarterly Retraining Pipeline                          │
└─────────────────────────────────────────────────────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
┌─────────────────────┐   ┌──────────────────────────┐
│  CASE MANAGEMENT    │   │  TAXPAYER ENQUIRY        │
│  INTEGRATION        │   │  AI ASSISTANT            │
│  (AuditCase Next)   │   │  (FAQ + case status)     │
└─────────────────────┘   └──────────────────────────┘
```

### Explainability Requirement

A non-negotiable architectural constraint: if a taxpayer was selected for audit on the basis of AI-generated risk scores, they had a statutory right (under Administrative Decisions legislation) to understand why. The architecture therefore required an explainability layer that converted SHAP (SHapley Additive exPlanations) values into human-readable audit selection notices.

!!! example "Explainability Output Example"
    **AI Risk Selection Notice to Taxpayer:**
    
    Your 2023-24 income tax return was selected for review. The primary factors considered were:
    
    - Your reported business income was 34% lower than the average for businesses of similar size and industry (hospitality, metro area).
    - Your claimed vehicle deductions were in the top 2% of claimants in your income bracket.
    - A discrepancy was identified between your reported GST sales and income tax sales figures.
    
    This notice is provided in accordance with your rights under the Taxpayer Charter.

### Sovereign Data Residency

All components — ML training infrastructure, model artefacts, data fabric, case management — were required to operate on-shore within the country's borders. Cloud hyperscaler deployments required contractual data residency clauses and architectural evidence that data never transited offshore.

---

## Step 5 — Assess Constraints and Risks

### Government-Specific Constraints

| Constraint | Impact | Mitigation |
|-----------|--------|-----------|
| Public tender required (procurement regulations) | 8-month procurement cycle added to total timeline | Engaged market via pre-RFT briefing to accelerate vendor readiness |
| Parliamentary ICT Committee review | Architecture decisions subject to committee scrutiny and potential disallowance | Prepared plain-language architecture briefing; briefed committee secretariat early |
| Privacy Commissioner consultation | Formal privacy impact assessment required; Commissioner could block or impose conditions | Engaged Privacy Commissioner as a partner in the design process (see Lesson 2) |
| Union consultation (CPSU) | 600 audit officer positions potentially affected; union sought no-forced-redundancy guarantee | Established joint working group; agreed to natural attrition pathway |
| Responsible AI Framework | Government policy required Responsible AI review for any AI system used in regulatory decisions | Completed framework self-assessment; appointed independent AI ethics reviewer |

### Risk Register (Top 5)

| Risk | Likelihood | Impact | Owner |
|------|-----------|--------|-------|
| Data quality in VATIS insufficient for cross-system linkage | High | High | Data Architect |
| Privacy Commissioner imposes restrictions on third-party data use | Medium | High | EA Lead |
| Procurement extends beyond 8 months, compressing delivery | Medium | High | Programme Manager |
| ML model exhibits bias against specific taxpayer demographics | Low | Critical | AI Ethics Reviewer |
| Audit officers resist AI-generated queues (workaround culture) | High | Medium | Change Lead |

---

## Step 6 — Develop the Investment Case

### Cost Summary

| Category | Year 1 | Year 2 | Total |
|----------|--------|--------|-------|
| Data fabric and entity resolution | $1.2M | $0.4M | $1.6M |
| ML platform (build + licences) | $1.8M | $0.6M | $2.4M |
| Case management integration | $0.9M | $0.3M | $1.2M |
| Taxpayer enquiry AI assistant | $0.5M | $0.2M | $0.7M |
| Change management and training | $0.6M | $0.4M | $1.0M |
| Governance and compliance | $0.3M | $0.2M | $0.5M |
| **Total** | **$5.3M** | **$2.1M** | **$7.4M** |

Note: procurement phase costs ($0.8M internal staff time) are excluded from the above as they were absorbed by existing operational budgets.

### Benefit Case

| Benefit | Year 1 | Year 2 | Year 3 | Basis |
|---------|--------|--------|--------|-------|
| Additional tax recovered (higher precision audits) | $180M | $190M | $200M | Audit precision 22% → 75%; average adjustment value $84,000 |
| Audit staff efficiency (natural attrition, 600 → 0 net reduction over 3 years) | $8M | $22M | $32M | Average fully-loaded cost $53,000/FTE |
| Taxpayer enquiry cost reduction (AI handles 40% of inbound calls) | $6M | $8M | $10M | Call centre handle cost reduction |
| **Total Benefits** | **$194M** | **$220M** | **$242M** |  |

**Payback period:** < 30 days of Year 1 benefit recovery (investment recovered in first quarter of operation).

**BCR (3-year):** 88:1

---

## Step 7 — Navigate Governance

### Parliamentary ICT Committee

The Parliamentary ICT Committee had oversight of major government technology investments above $5M. Key preparation steps:

- Developed a two-page plain-English summary of the architecture for non-technical committee members
- Briefed the committee chair and deputy chair individually before the formal hearing
- Prepared responses to likely opposition questions about job losses and AI bias
- Secured a supportive statement from the Treasury Secretary on the tax gap problem

The committee approved the investment with one condition: an independent post-implementation review at 18 months.

### Privacy Commissioner Consultation

The Privacy Commissioner's office was engaged at Step 3 — before the investment case was finalised. This was a deliberate strategy (see Lesson 2). The formal Privacy Impact Assessment (PIA) ran in parallel with procurement, not after it. The Commissioner imposed three conditions:

1. Third-party data use (property registry, ASIC filings) limited to specific purposes stated in the PIA
2. AI explainability notices must be reviewed by the Commissioner before the system goes live
3. Annual independent privacy audit for the first three years of operation

All three conditions were accommodated in the architecture and budget.

### Responsible AI Framework Compliance

The Government's Responsible AI Framework required formal self-assessment against six principles. The NTA's AI Risk Scoring Platform was classified as a **Tier 1 High-Risk** system (AI making decisions with significant impact on individuals' rights and obligations).

| Principle | Assessment | Architecture Response |
|-----------|-----------|----------------------|
| Transparency | Partial (model is complex) | Explainability layer; audit selection notices |
| Fairness | Requires testing | Demographic bias testing in UAT; ongoing monitoring |
| Privacy | Conditions imposed | PIA conditions fully incorporated |
| Security | Met | On-shore data residency; data classification |
| Human oversight | Required | Human review mandatory for all audit decisions |
| Accountability | Met | Named AI Ethics Reviewer; escalation pathway |

---

## Step 8 — Design the Delivery Roadmap

### Phase Structure

```
Phase 0 — Procurement (Months 1–8)
  ├── RFT published (Month 1)
  ├── Market briefing (Month 2)
  ├── Responses evaluated (Months 4–6)
  └── Contract awarded (Month 8)

Phase 1 — Foundation (Months 9–14)
  ├── Data fabric deployment
  ├── Entity resolution (Income + VAT linkage)
  └── ML platform infrastructure

Phase 2 — Intelligence (Months 15–20)
  ├── ML model training (v1)
  ├── Explainability layer
  └── AuditCase integration

Phase 3 — Channels (Months 21–26)
  ├── Customs linkage (CustomsNet)
  ├── Taxpayer enquiry AI assistant
  └── Live rollout + monitoring
```

### Delivery Model

The NTA did not have internal ML engineering capability. The delivery model used a prime vendor (a domestic data and AI consulting firm, awarded via public tender) with the NTA retaining:

- Architecture governance (EA team in role)
- Data ownership and access controls
- Business acceptance testing
- Post-go-live model monitoring

---

## Step 9 — Manage Stakeholder Expectations

### Union Consultation Strategy

The Community and Public Sector Union (CPSU) represented the 2,400 audit officers whose roles were impacted. The EA Lead and Change Lead briefed the CPSU before the investment case was published, not after.

Key commitments made to the union:
- No forced redundancies. Headcount reduction (from 2,400 to 1,800) would occur over 3 years through natural attrition only.
- Audit officers would be retrained as "AI-assisted case reviewers" — human review remained mandatory for all audit decisions.
- A joint NTA-CPSU working group would monitor implementation and flag concerns.

The CPSU moved from opposition to conditional support following these commitments.

### Audit Officer Change Management

The risk of audit officers bypassing the AI queue (as they had bypassed the IRIS queue) was addressed through:

- Involving senior audit officers in model validation — they reviewed the model's selection rationale for 200 test cases and rated it against their own judgment
- Publishing precision improvement metrics monthly so officers could see the model outperforming their queue
- Making queue override a managed exception requiring documentation (not a silent bypass)

---

## Step 10 — Execute and Monitor

### Delivery Execution

The prime vendor delivered Phase 1 on schedule. Phase 2 encountered a significant data quality issue in VATIS (see Lesson 5) that required a 6-week remediation sprint. Phase 3 was delivered 4 weeks late.

Overall project: delivered within budget; delivered 6 weeks late against original schedule (excluding procurement phase).

### Go-Live Metrics (Month 1 Post-Go-Live)

| Metric | Target | Actual |
|--------|--------|--------|
| System availability | 99.5% | 99.8% |
| Risk score processing time (per return) | < 2 seconds | 0.8 seconds |
| Explainability notice generation time | < 30 seconds | 18 seconds |
| Audit officer adoption of AI queue | 70% | 74% |
| Privacy Commissioner notice review completed | Before go-live | Completed (Month 25) |

---

## Step 11 — Evaluate Realised Value

### Year 1 Outcomes (12 months post go-live)

| KPI | Target | Actual | Variance |
|-----|--------|--------|----------|
| Audit precision rate | 75% | 67% | -8 pp |
| Additional tax recovered | $180M | $156M | -$24M |
| Audit case throughput (per officer) | +35% | +28% | -7 pp |
| Taxpayer enquiry AI deflection rate | 40% | 44% | +4 pp |
| Staff reduction (attrition) | 150 FTE Year 1 | 134 FTE | On track |

!!! warning "Target Miss — Audit Precision"
    The audit precision target of 75% was not met. Achieved precision was 67%. The root cause was data quality in the VATIS (VAT) system, which provided unreliable cross-system linkage signals. The ML model's cross-system features (income vs. GST sales comparison) were the most predictive features in the model but had a 14% error rate due to VATIS data entry inconsistencies.
    
    A VATIS data quality remediation programme was initiated in Year 2.

!!! warning "Target Miss — Revenue Recovery"
    The $180M Year 1 revenue target was not met; $156M was recovered. The primary cause was the procurement delay compressing the effective implementation period — the system went live in Month 9 (of a 12-month Year 1 performance window), leaving only 3 months of full-year audit activity under the new system.
    
    Year 2 trajectory is on track for $185M.

### Year 2 Projection

With VATIS data quality remediated and a full year of operation, Year 2 projections are:
- Audit precision: 73% (approaching the 75% target)
- Revenue recovery: $185M
- Staff efficiency: on track for 1,800 FTE by end of Year 3

---

## Step 12 — Capture Lessons Learned

### Lesson 1 — Procurement Process Reality

> "Build the procurement timeline into the architecture plan, not around it."

The 8-month procurement cycle was not a surprise — it was the known regulatory requirement. But the delivery roadmap was initially planned as if procurement could run in parallel with early phases. In practice, no vendor could mobilise until contract award.

**Implication:** In government programmes, a public tender cycle of 6–12 months is a fixed constraint. EA plans must treat procurement as Phase 0 and account for it in the benefits case. The NTA's Year 1 revenue shortfall was a direct consequence of underestimating this impact on the performance measurement window.

---

### Lesson 2 — The Privacy Commissioner as Partner, Not Adversary

Initial stakeholder analysis classified the Privacy Commissioner's office as a "gating risk" — an external party that could block or delay the programme. This framing led to a proposed strategy of submitting the Privacy Impact Assessment after the investment case was approved, to avoid early exposure.

The EA Lead challenged this strategy. The alternative approach — engaging the Privacy Commissioner at architecture design stage — produced three benefits:
1. The Commissioner's team identified a data minimisation improvement that strengthened the architecture.
2. Conditions imposed were designed into the architecture rather than retrofitted.
3. The Commissioner became a public supporter of the programme's responsible approach, which neutralised media criticism about AI in tax enforcement.

**Implication:** Regulatory bodies with oversight functions are almost always better engaged early as design partners. The cost of early engagement is always less than the cost of late-stage conditions imposed under deadline pressure.

---

### Lesson 3 — Union Communication Strategy

The CPSU's initial position was active opposition. The approach that shifted them to conditional support was:
- Engaging before the programme was public (no surprises)
- Distinguishing between "roles changing" and "jobs lost" — the natural attrition pathway was credible
- Creating genuine participation (the joint working group had real standing, not symbolic standing)
- Committing to human review in the final decision loop — AI augments the officer, not replaces the function

**Implication:** In government AI programmes, frontline worker unions are legitimate stakeholders with significant influence. Treating them as implementation obstacles rather than consultation partners reliably produces industrial action or parliamentary pressure that derails programmes.

---

### Lesson 4 — Government Responsible AI Requirements Add Time and Cost

The Responsible AI Framework compliance process was more demanding than initially estimated. A Tier 1 High-Risk classification required:
- Independent AI ethics review ($120K cost, 10-week timeline)
- Demographic bias testing across 12 protected attributes
- Human-in-the-loop requirement that constrained automation ambitions

These requirements are non-negotiable in government. Future programme budgets should provision 8–12% of ML platform costs for responsible AI compliance activities.

---

### Lesson 5 — Data Quality in Legacy Government Systems

The VATIS data quality issue was identified during discovery but assessed as "medium risk" and not prioritised for remediation before ML model development began. This was a mistake. The data quality gap in VATIS affected the model's most predictive features and was the primary cause of the precision shortfall.

**A practical rule from this engagement:** In government ML programmes, the ML model's accuracy ceiling is determined by the quality of the weakest source system. The VATIS data quality remediation should have been Phase 0 alongside procurement — not discovered during model validation in Phase 2.

---

## Summary

!!! success "Programme Outcome"
    Despite missing both the precision and revenue targets in Year 1, the NTA's AI Risk-Based Audit Intelligence programme delivered a fundamentally transformed compliance capability. Year 1 additional revenue of $156M against a $7.4M investment represents a 21:1 return. The programme established a reusable data fabric and ML platform infrastructure that the NTA is now extending to GST compliance and import duty risk scoring.
    
    The architecture decisions that will be debated for years: the choice of on-shore deployment (limited cloud-native ML tooling) and the human-review mandate (capped automation potential) were both correct given the government regulatory context. They were not concessions to risk-aversion; they were requirements of the operating environment.

| Programme Metric | Value |
|-----------------|-------|
| Total investment | $7.4M |
| Year 1 benefit | $156M |
| Year 1 ROI | 21:1 |
| Audit precision improvement | 22% → 67% |
| Staff on natural attrition pathway | 600 FTE over 3 years |
| Taxpayer enquiries deflected by AI | 44% |
| Programme status | Delivered (6 weeks late, within budget) |
