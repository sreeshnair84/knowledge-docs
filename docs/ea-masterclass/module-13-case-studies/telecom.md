---
title: "Case Study: Telecom Operator — AI Customer Retention Platform"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-13-case-studies"]
doc_type: narrative-case-study
industry: telecommunications
protagonist_role: "Enterprise Architecture Lead"
core_tension: "Network complexity growth outpacing human operational capacity"
---
## Cast of Characters

*(Refer to the organisation background and key stakeholders described in this case study.)*


# Case Study: Telecom Operator — AI Customer Retention Platform

---

## 1. Organisation Background

TelecomCo is a tier-1 telecommunications operator serving 45 million customers across consumer, small business, and enterprise segments. Annual revenue is $18B, with approximately 72% from recurring subscription services (mobile, broadband, TV bundles) and the remainder from equipment, enterprise contracts, and wholesale.

| Dimension | Detail |
| --- | --- |
| Total Customers | 45M |
| Annual Revenue | $18B |
| Customer Segments | Consumer (68%), SMB (19%), Enterprise (13%) |
| Geographic Footprint | National + EU operations (11 countries) |
| Growth History | 4 major mergers over 12 years |
| Employee Count | ~62,000 |

TelecomCo's customer base is its primary asset. Subscription revenue depends on keeping customers on contract, growing their spend over time, and minimising the cost of acquisition for replacement customers. The merger history, however, left the organisation with severely fragmented customer data infrastructure — a problem that compounded churn risk without anyone fully quantifying it until the AI programme surfaced the scale of the issue.

---

## 2. Business Problem

!!! danger "Churn Performance Gap: $680M Annual Revenue at Risk"
    TelecomCo's monthly churn rate of 2.8% is 47% higher than the industry average of 1.9%. At current customer acquisition cost ($340 per consumer subscriber), replacing churned customers costs substantially more than retaining them.

**Churn Quantification:**

- 2.8% monthly churn = 1.26M customers leaving annually
- Average revenue per user (ARPU): $38/month consumer, $210/month SMB
- Weighted blended ARPU for churning customers: $45/month
- Annualised lost recurring revenue: **$680M**
- Customer acquisition cost to replace: **$428M** (at $340 CAC × 1.26M)
- Combined annual cost of churn: **$1.1B**

**Why Churn Was High — Root Causes:**

- **12 siloed CRM systems** from four mergers. No single customer record existed. A customer with mobile, broadband, and TV services from merged entities existed in three separate CRMs with no linkage. Retention teams could not see the full customer relationship.
- **No single customer view** meant that retention offers were made without knowing total customer value, risk of leaving, or existing commitments. Offers were frequently made to low-risk customers while genuinely high-risk customers received no contact.
- **Reactive retention only** — the retention team operated a reactive queue. Customers who called to cancel were offered retention deals. There was no proactive outreach model. By the time a customer initiated a cancellation call, research showed that 67% had already mentally committed to leaving.
- **No churn prediction capability** — retention decisions were based on call agent intuition and basic contract-end triggers. No machine learning model existed. Contract renewal reminders were sent 30 days before expiry regardless of customer risk profile.

---

## 3. AI Opportunity

!!! tip "Proactive Retention: The Industry Shift"
    The telecommunications industry has a well-established body of evidence that proactive AI-driven retention outperforms reactive retention by 3–5x on cost-per-save. TelecomCo was operating an approach that was industry standard in 2012.

The EA team identified four compounding AI opportunities:

1. **Unified Customer Data Platform (CDP)** — consolidating 12 CRM systems into a single customer profile, enabling every downstream model and interaction to operate on a complete view of the customer.
2. **Daily Churn Prediction ML Model** — scoring every customer daily on churn probability, incorporating usage signals, billing patterns, service quality events, competitive pricing exposure, and demographic data.
3. **Next-Best-Action (NBA) Recommendation Engine** — given a customer's churn risk, recommending the optimal retention intervention from a catalogue of offers, outreach channels, and agent scripts. This goes beyond churn prevention to include upsell and cross-sell actions for low-risk customers.
4. **Proactive Outreach Automation** — for high-risk segments, triggering automated outreach (personalised SMS, email, or call scheduling) before the customer initiates a cancellation. This requires careful GDPR consent management for EU operations.

---

## 4. Current-State Architecture

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  CRM Alpha   │ │  CRM Beta    │ │  CRM Gamma   │ │  CRM Delta   │
│ (Merger '14) │ │ (Merger '17) │ │ (Merger '20) │ │ (Merger '22) │
└──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘
       │                │                │                │
       └──── No integration between systems ─────────────┘
                        │
                        │  (Manual monthly extract — 4 of 12 CRMs only)
                        ▼
            ┌───────────────────────┐
            │  Legacy DW (partial)  │
            │  Incomplete customer  │
            │  records; no linkage  │
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐    ┌──────────────────────────┐
            │  Retention Queue      │    │  Contract Expiry          │
            │  (Reactive only)      │    │  Reminder System          │
            │  ~8,000 calls/day     │    │  (30-day fixed trigger)   │
            └───────────┬───────────┘    └──────────────────────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  Agent Script: Manual │
            │  intuition + standard │
            │  offer catalogue      │
            └───────────────────────┘
```

**Key Absence:** No churn prediction. No customer lifetime value model. No NBA engine. Retention was entirely a cost centre with no analytical infrastructure.

---

## 5. Future-State Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                 12 CRM Systems (maintained in parallel              │
│                 during transition; decommission in Yr 3)            │
└───────────────────────────┬─────────────────────────────────────────┘
                            │  Real-time & batch ingest
┌───────────────────────────▼─────────────────────────────────────────┐
│              Unified Customer Data Platform (CDP)                   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Identity Resolution Layer                                   │   │
│  │  (probabilistic matching across 12 CRM schemas)              │   │
│  └────────────────────────────────────────────────────────────┬─┘   │
│  ┌────────────────────────────────────────────────────────────▼─┐   │
│  │  Golden Customer Record                                      │   │
│  │  Services │ Usage │ Billing │ NPS │ Service Events │ Value  │   │
│  └────────────────────────────────────────────────────────────┬─┘   │
│  ┌──────────────────────┐   ┌──────────────────────────────────▼─┐  │
│  │  GDPR Consent Store  │   │  Real-time Event Stream (Kafka)    │  │
│  │  (EU customers)      │   │  Usage drops │ Service failures    │  │
│  └──────────────────────┘   │  Billing disputes │ Port requests  │  │
│                             └────────────────────────────────────┘  │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│              AI & Analytics Layer                                   │
│  ┌──────────────────────────────────┐  ┌───────────────────────────┐│
│  │  Churn Prediction Model          │  │  Customer Lifetime Value  ││
│  │  (daily score, 0–100)            │  │  Model (segment × tenure) ││
│  │  XGBoost + SHAP explainability   │  │                           ││
│  │  Fairness constraints applied    │  └───────────────────────────┘│
│  └──────────────────┬───────────────┘                               │
│                     │                                               │
│  ┌──────────────────▼───────────────────────────────────────────┐   │
│  │  Next-Best-Action Recommendation Engine                      │   │
│  │  Contextual bandit (Vowpal Wabbit)                           │   │
│  │  Inputs: churn score │ CLV │ offer catalogue │ channel pref  │   │
│  │  Outputs: ranked action set with predicted retention lift    │   │
│  └──────────────────┬───────────────────────────────────────────┘   │
└─────────────────────┼───────────────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────────────┐
│              Execution Layer                                        │
│  ┌───────────────────────┐  ┌────────────────────┐  ┌────────────┐  │
│  │  Agent Desktop        │  │  Proactive          │  │  Consent   │  │
│  │  AI-assisted          │  │  Outreach           │  │  Gate      │  │
│  │  retention workflow   │  │  Automation         │  │  (EU)      │  │
│  │  Recommended offers   │  │  SMS │ Email │      │  │            │  │
│  │  displayed in-context │  │  Call scheduling    │  │            │  │
│  └───────────────────────┘  └────────────────────┘  └────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

!!! note "GDPR Consent Architecture"
    For TelecomCo's EU operations (11 countries), proactive outreach — any contact not in direct response to a customer action — requires explicit marketing consent under GDPR Article 6. A dedicated consent management workstream was required, separate from the AI platform build. Customers without marketing consent receive proactive outreach only through the existing service communication channel (billing notices), not through the retention automation pipeline.

---

## 6. Investment Justification

### Financial Model

| Category | Amount | Notes |
| --- | --- | --- |
| Total Investment | $11.3M | Over 24 months |
| CDP Build (including identity resolution) | $4.2M | Dominant cost — underestimated at scoping |
| AI Model Development | $2.8M | Churn model + NBA engine |
| GDPR Consent Workstream | $1.1M | Originally not in scope |
| Integration & Agent Desktop | $1.8M | CRM integrations × 12 |
| Change Management & Training | $1.4M | ~2,500 retention agents |

### Benefit Case

| Metric | Value | Basis |
| --- | --- | --- |
| Target Churn Reduction | 2.8% → 1.9% monthly | Industry benchmark parity |
| Customers Retained Annually | ~405,000 | Δ churn × 45M base |
| Revenue Retained (ARPU × 12) | $219M/yr at steady state | |
| 5-Year NPV | $245M | At 9.1% WACC |
| Payback Period | 14 months | Post full deployment |
| IRR | 68% | |

!!! note "NPV Sensitivity"
    The NPV is sensitive to the rate at which the NBA model generates upsell revenue alongside pure retention. At zero upsell contribution, NPV is $178M. The $245M figure assumes the NBA model generates 15% of its value from cross-sell and upsell actions rather than pure churn prevention — a conservative assumption based on comparable deployments.

---

## 7. Executive Proposal

The EA team structured the executive proposal around three arguments:

**Argument 1 — The Burning Platform:** TelecomCo's churn rate is not a performance fluctuation; it is a structural gap created by the merger history. The 12 siloed CRMs mean that every customer interaction is performed blind. The AI platform does not solve a new problem — it solves a problem that was created by previous strategy decisions and has been accumulating cost for years.

**Argument 2 — Competitive Positioning:** Two of TelecomCo's three major competitors had deployed comparable churn prediction platforms within the prior 18 months. The industry was moving, and TelecomCo's reactive-only retention model was increasingly an outlier. Proactive AI retention was shifting from competitive advantage to table stakes.

**Argument 3 — The NBA Multiplier:** The churn model was presented as the entry point, but the NBA engine was the long-term value driver. An engine that could recommend the optimal action for every customer interaction — not just churn risk — had value across sales, service, and upsell motions that extended well beyond the retention use case.

**Phased Approval Requested:** Phase 1 (CDP + churn model, $5.8M, 12 months) with Phase 2 (NBA + proactive outreach, $5.5M, months 13–24) contingent on Phase 1 demonstrating a measurable reduction in voluntary churn among targeted segments.

---

## 8. Implementation Roadmap

| Phase | Duration | Key Activities | Investment | Exit Criteria |
| --- | --- | --- | --- | --- |
| 0 — Discovery | Months 1–2 | CRM schema mapping, GDPR consent audit, data quality baseline, AI ethics risk assessment | $0.4M | Consent gap report; identity resolution feasibility confirmed |
| 1A — CDP Foundation | Months 3–10 | Identity resolution layer build, golden record pipeline, 4 priority CRM integrations | $3.1M | Single customer view available for 80% of base |
| 1B — Churn Model | Months 6–12 | Model training on CDP data, SHAP explainability, fairness review, agent desktop integration | $1.5M | Churn model live; AUC > 0.82 on holdout |
| 2A — GDPR Workstream | Months 8–14 | Consent management platform, EU customer consent collection campaign, legal sign-off | $1.1M | Consent store live; proactive outreach legally cleared in all 11 EU markets |
| 2B — NBA Engine | Months 13–20 | Contextual bandit training, offer catalogue integration, A/B test framework | $1.8M | NBA model live; lift test positive vs. churn model alone |
| 2C — Proactive Automation | Months 18–24 | Outreach automation pipeline, channel orchestration, reporting dashboard | $1.4M | Automated outreach running at scale; churn KPI tracked weekly |

!!! warning "AI Ethics Review: 6-Month Delay"
    During Phase 1B model development, the fairness review identified that the initial churn model had a 23% higher false-positive rate for customers aged 65+. High false-positive predictions meant elderly customers were being offered retention deals they did not need — a cost inefficiency — while potentially masking lower-risk customers who did need attention. The model was retrained with explicit fairness constraints (demographic parity within ±5% across age bands). This process took 6 months and delayed Phase 2A by 4 months. The decision to fix this properly, rather than deploy the unconstrained model, proved to be commercially and reputationally correct.

---

## 9. Governance

### AI Ethics Committee

An AI Ethics Committee was established prior to model deployment, with membership spanning Legal, Compliance, Customer Experience, and the EA team. This was not a post-hoc review body — it was integrated into the development gate process.

| Gate | Trigger | Ethics Committee Role |
| --- | --- | --- |
| Model staging approval | Before any model deployed to staging environment | Review fairness metrics, explainability report, consent compliance |
| Model production approval | Before live customer interactions | Final sign-off; any dissenting vote escalates to CTO |
| Quarterly model review | Every 90 days post-deployment | Drift, fairness metric monitoring, incident review |
| New action catalogue addition | Before adding new offer type to NBA engine | Assess for potential manipulation or demographic targeting risk |

### GDPR Governance

| Control | Mechanism |
| --- | --- |
| Consent check | Real-time query of consent store before any proactive outreach trigger |
| Consent withdrawal | 24-hour propagation to suppress outreach; logged with timestamp |
| Data minimisation | Churn model trained on behavioural signals only — no sensitive attributes as direct features |
| Right to explanation | SHAP values stored per customer prediction; available to customer on request |
| EU data residency | All EU customer data processed and stored within EU Azure regions |

### Decision Rights

| Decision | Owner | Escalation |
| --- | --- | --- |
| Retention offer catalogue | VP Customer Experience | CMO for offers >15% revenue impact |
| NBA action eligibility for a segment | NBA Product Owner + Legal | Ethics Committee if demographic concern raised |
| Proactive outreach campaign launch | Retention Ops Lead | GDPR Compliance if EU customers included |
| Model retrain and deploy | ML Engineering Lead | Ethics Committee for any fairness metric change >5% |

---

## 10. Realized Value (Honest Assessment)

!!! success "Overall Programme: Exceeded Revenue Target Despite Missing Churn Rate Target"
    TelecomCo's programme is a case where the realized financial value exceeded the original business case, but through a different mechanism than forecast. The NBA model generated significant upsell revenue that was not modelled in the original proposal.

!!! info "Churn Rate: Near Miss, Not a Failure"
    The churn rate of 2.1% missed the 1.9% target but represents a 25% improvement from 2.8% — a material and commercially significant outcome.

| Metric | Target | Realized | Gap / Surplus | Primary Cause |
| --- | --- | --- | --- | --- |
| Monthly Churn Rate | 2.8% → 1.9% | 2.8% → 2.1% | −0.2pp shortfall | CDP took 18 months not 12; proactive outreach delayed |
| Revenue Retained | $219M/yr | $312M/yr | +$93M surplus | NBA model upsell exceeded original estimate |
| 5-Year NPV | $245M | $318M | +$73M surplus | Upsell contribution from NBA model |
| CDP Build Time | 12 months | 18 months | +6 months | Identity resolution complexity underestimated |
| EU Consent Opt-In Rate | 55% | 41% | −14pp shortfall | Consent campaign less effective than modelled |
| Agent Adoption (desktop tool) | 85% | 91% | +6pp surplus | Strong change management; clear agent benefit |
| AI Ethics Review Duration | 2 months | 8 months | +6 months | Fairness issue required full model retrain |

**Honest Assessment:** The programme delivered more financial value than projected, but not via the mechanism the business case described. The churn model achieved good results; the NBA model exceeded all expectations by identifying upsell opportunities that the original scope did not explicitly target. The GDPR consent opt-in rate of 41% means that for EU operations, 59% of customers cannot be contacted proactively — a structural constraint on the programme's ceiling in those markets.

---

## 11. Lessons Learned

!!! example "Lesson 1: CDP Build Complexity Is Consistently Underestimated"
    Identity resolution across 12 CRM systems proved substantially harder than the initial technical assessment suggested. Each CRM had different customer identifiers, different approaches to duplicate handling, and different data quality characteristics. The probabilistic matching algorithm required six iterations before achieving acceptable precision and recall. The 18-month actual build time versus 12-month estimate was not a team performance failure — it was a scoping failure. Future programmes should add 40–50% contingency to CDP build timelines when crossing more than three legacy system boundaries.

!!! example "Lesson 2: AI Ethics Review Is a Competitive Advantage, Not a Compliance Tax"
    The decision to fix the age-related fairness issue in the churn model — rather than deploy the unconstrained version — delayed the programme by 6 months. In retrospect, it was one of the best decisions made. The constrained model slightly underperforms on raw AUC but performs better on a balanced cohort basis. More importantly, when a competitor's retention AI was publicly criticised for discriminatory offer patterns 8 months after TelecomCo's deployment, TelecomCo's documented ethics review process became a PR and regulatory asset. The Ethics Committee process is now cited in regulatory submissions and customer-facing responsible AI statements.

!!! example "Lesson 3: The NBA Model Was More Valuable Than the Churn Model"
    The original proposal was framed around churn prediction as the primary value driver, with the NBA engine as a secondary execution layer. In practice, the NBA engine's ability to identify and act on upsell and cross-sell opportunities for non-churning customers generated more incremental revenue than pure churn prevention. The $93M surplus over the original revenue target came almost entirely from NBA-driven upsell. Future proposals should model the full NBA value spectrum from the outset, not just the retention use case, because the investment justification is substantially stronger when the full action catalogue is in scope.

!!! example "Lesson 4: GDPR Consent Management Required a Dedicated Workstream, Not a Feature"
    The initial programme plan treated GDPR consent management as a feature of the CDP build — a checkbox in the data model. It is not a feature; it is a programme within a programme. Designing the consent collection campaign, running it across 11 EU markets with different national implementations of GDPR, securing legal sign-off in each jurisdiction, and building the real-time consent check into the outreach pipeline required a dedicated team, a dedicated budget, and dedicated legal resource for 6 months. Any AI programme touching EU personal data should scope consent management as a first-class workstream with its own budget line and timeline.

!!! example "Lesson 5: Proactive Retention Requires a Different Org Model, Not Just Different Technology"
    TelecomCo's retention team was structured, measured, and incentivised around reactive queue management — calls handled per hour, offer acceptance rate, save rate on cancellation calls. Proactive retention requires a fundamentally different operating model: campaign management, outreach scheduling, A/B test design, and measurement against cohort-level churn outcomes rather than call-level save rates. The technology deployment was smoother than anticipated; the operating model change took 14 months and required restructuring team KPIs, retraining ~2,500 agents, and creating a new Campaign Analytics function that did not previously exist. Technology is the easy part; the operating model is the hard part.

---

## 12. Key Takeaways

| # | Takeaway |
| --- | --- |
| 1 | A unified customer data platform is the prerequisite for all downstream AI use cases — and its build complexity scales non-linearly with the number of legacy systems being consolidated. |
| 2 | Churn prediction is a powerful entry point, but the NBA engine is the long-term value driver; proposals should model the full action catalogue from the start. |
| 3 | AI ethics review, when integrated into the development gate process rather than added at the end, improves model quality and creates reputational and regulatory assets. |
| 4 | GDPR consent management for proactive outreach is a programme within a programme — scope it as such from day one. |
| 5 | A 41% EU consent opt-in rate is a structural ceiling on proactive outreach in those markets; the programme must model the constrained EU scenario as the base case, not as a risk scenario. |
| 6 | Proactive retention requires an operating model change, not just a technology change — KPIs, team structure, and skills must be redesigned alongside the platform. |
| 7 | Financial value can exceed the business case while operational targets are missed — tracking both financial outcomes and leading operational indicators prevents misleading programme assessments. |

!!! quote "Chief Customer Officer Reflection"
    "We came in expecting to fix churn. We ended up building the intelligence layer for our entire customer relationship. The churn model told us who was at risk. The NBA engine told us what every customer needed. That second capability was worth more than the first — we just did not know it when we wrote the business case."

---

*This case study is a Module 13 learning artefact for the Enterprise Architecture Masterclass. Names, financials, and details are illustrative.*
