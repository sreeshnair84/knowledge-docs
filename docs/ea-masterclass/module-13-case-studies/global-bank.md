---
title: "Case Study: Global Bank — AI-Powered Loan Origination"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-13-case-studies"]
doc_type: narrative-case-study
industry: finance
protagonist_role: "Enterprise Architecture Lead"
core_tension: "18-day loan origination cycle vs fintech 2-day competitor"
---
## Cast of Characters

*(Refer to the organisation background and key stakeholders described in this case study.)*


# Case Study: Global Bank — AI-Powered Loan Origination

!!! abstract "Case Summary"
    A Tier-1 global bank with $800B in assets and operations across 40 countries faced an existential competitive threat: commercial loan origination taking 18 days versus fintech competitors completing the same process in 2 days. The enterprise architecture team proposed an AI-powered intelligent document processing and decision-support platform. Total investment: $12M over 3 years. Net present value: $45M at a 10% discount rate. Origination cycle reduced from 18 days to 4 days within 18 months of full rollout.

---

## 1. Organisation Background

GlobalFirst Bank (name anonymised) operates across 40 countries with consolidated assets of approximately $800 billion. Its commercial banking division serves mid-market and large corporate clients across North America, Europe, and Asia-Pacific, generating $4.2B in net interest income annually from commercial lending.

**Regulatory environment**

| Framework | Scope | EA Impact |
| --- | --- | --- |
| Basel III / IV | Capital adequacy, risk-weighted assets, credit risk models | All AI credit models require independent validation before production use |
| Fed SR 11-7 | Model risk management guidance (US operations) | Mandates model inventory, validation, ongoing monitoring, and explainability documentation |
| OCC Guidance 2021-10 | Third-party risk for AI/ML vendors | Cloud AI vendors require risk tiering, penetration testing, and contractual audit rights |
| GDPR / CCPA | Data privacy for EU and California customers | AI training data pipelines must enforce right-to-erasure and data minimisation |
| CRA (Community Reinvestment Act) | Fair lending obligations | Credit decision models must demonstrate no disparate impact by protected class |

**Competitive context**

The fintech lending landscape shifted materially between 2022 and 2025. Platforms such as Kabbage, BlueVine, and Pipe reduced SMB loan decisioning to hours, not weeks. While GlobalFirst's commercial book targeted larger credits ($5M–$500M) that fintechs did not yet fully serve, the boundary was eroding. Three fintech players had launched Series C rounds specifically targeting commercial credits up to $25M by mid-2025. GlobalFirst's own commercial banking client survey (Q3 2025, n=2,400) showed 61% of clients had explored alternative lenders in the prior 12 months, up from 38% in 2023.

!!! warning "The Burning Platform"
    The competitive window for corrective action was estimated at 18–24 months. Beyond that point, relationship managers projected that at-risk commercial relationships would reach a tipping point of no return. The EA team used this framing deliberately in executive presentations to establish urgency without overstating certainty.

---

## 2. Business Problem

### Origination Cycle Decomposition

The 18-day average commercial loan origination cycle was not a single bottleneck — it was the cumulative result of eight sequential manual handoffs. The EA team conducted a value-stream mapping exercise across six representative branches over eight weeks.

| Step | Avg Duration | Primary Bottleneck |
| --- | --- | --- |
| Application intake and document collection | 2.1 days | Incomplete submissions requiring follow-up |
| Document verification and indexing | 3.4 days | Manual review by credit analysts (14 FTE per major branch) |
| Financial spreading (income statements, balance sheets) | 2.8 days | Spreadsheet-based; no automation |
| Credit bureau and external data pull | 1.2 days | Partially automated but dependent on 3 legacy systems |
| Internal credit memo preparation | 3.1 days | Analyst-intensive narrative writing |
| Credit committee review and approval | 4.2 days | Committee meets twice weekly; queue builds between sessions |
| Loan documentation generation | 0.7 days | Mostly templated but requires compliance review |
| Booking and disbursement | 0.5 days | Largely automated |
| **Total (mean)** | **18.0 days** | |

The credit committee step (4.2 days) was the single largest contributor but also the most constrained: committee members were senior, their time was finite, and they would not delegate credit authority downward without confidence in the quality of what arrived at committee. This observation became a pivotal architectural constraint.

### Financial Impact of Delay

GlobalFirst's commercial banking revenue team estimated that $340M in annual commercial revenue was lost or at risk directly attributable to origination cycle time. This figure was derived from:

- **$180M** in confirmed lost business: clients who explicitly cited turnaround time as the reason for moving a credit facility to a competitor (captured via exit interview data, 2024–2025).
- **$95M** in at-risk existing relationships: RM-flagged accounts with documented satisfaction issues related to origination speed.
- **$65M** in estimated new-business opportunity cost: inbound prospects who declined to proceed past initial discussion once informed of the timeline.

!!! danger "The $340M Number Required Rigorous Defence"
    The CFO's office challenged the $340M figure during the business case review, arguing that attribution to origination speed was overstated and that some client losses were driven by pricing, credit structure, or relationship quality. The EA team worked with the finance team to re-derive the figure using a conservative attribution model, ultimately defending $220M as the floor and $340M as the base case. The investment case was built on the floor.

---

## 3. AI Opportunity Identification

### Alternatives Evaluated

The EA team was directed by the CTO to evaluate at least three alternatives before proposing an AI-led solution.

| Alternative | Description | Reason Rejected |
| --- | --- | --- |
| Offshore processing centre | Expand existing Manila and Hyderabad teams by 200 FTE to absorb document review and spreading workload | Addressed document processing (Steps 2–3) but not decision speed; cycle time reduction estimated at only 3–4 days; FTE cost savings marginal against recruitment and training costs; SR 11-7 third-party risk concerns for offshore credit data handling |
| Robotic Process Automation (RPA) | Deploy RPA bots to automate data extraction from structured PDFs and transfer data between legacy systems | RPA requires structured, predictable inputs; commercial lending documents are highly variable (borrower-provided financials, third-party appraisals, environmental reports); fragility rate in pilots exceeded 30%; insufficient ROI |
| Traditional BPM / workflow platform | Implement a modern BPM platform to orchestrate existing manual steps and reduce handoff latency | Reduces coordination friction but does not reduce per-task labour; cycle time reduction estimated at 2–4 days; does not address credit committee throughput constraint |
| **AI Intelligent Document Processing + Decision Support** | ML-based document extraction, classification, and spreading; explainable credit scoring model; structured credit memo auto-generation; decision-support UI for committee | Addresses Steps 2–5 directly; reduces committee prep time from 3.1 days (analyst) to 0.4 days (AI-assisted); targets 10–12 day cycle time reduction; aligns with SR 11-7 if validation approach designed correctly |

The EA team recommended the AI path with an explicit acknowledgement that it carried the highest implementation risk and the highest regulatory scrutiny requirement. The recommendation was conditional on a robust SR 11-7 model validation programme being scoped into Phase 1 — not treated as a Phase 3 afterthought.

---

## 4. Current-State Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   GLOBALFIRST COMMERCIAL LENDING             │
│                     CURRENT STATE (2025)                     │
└──────────────────────────────────────────────────────────────┘

  CLIENT / RM          DOCUMENT INTAKE         CREDIT ANALYSIS
  ─────────────        ──────────────────      ────────────────────
  ┌──────────┐         ┌──────────────────┐    ┌──────────────────┐
  │  Client  │─Email──▶│  Branch Inbox    │    │  Credit Analysts │
  │  Portal  │─Fax────▶│  (unstructured)  │───▶│  (14 FTE/branch) │
  │ (basic)  │─Upload─▶│                  │    │  Manual Spread   │
  └──────────┘         └────────┬─────────┘    └────────┬─────────┘
                                │ Manual Sort            │
                                ▼                        ▼
                       ┌──────────────────┐    ┌──────────────────┐
                       │  LoanTrak LOS    │    │  Credit Memo     │
                       │  (20yr legacy)   │◀───│  (Word/Excel)    │
                       │  Oracle Forms    │    └──────────────────┘
                       └────────┬─────────┘
                                │
              ┌─────────────────┼──────────────────┐
              ▼                 ▼                  ▼
   ┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
   │  CreditView DB   │ │  RiskMatrix  │ │  External Credit │
   │  (internal       │ │  (Basel risk │ │  Bureau APIs     │
   │   ratings)       │ │   engine)    │ │  (Dun & Equifax) │
   └──────────────────┘ └──────────────┘ └──────────────────┘
              │                 │                  │
              └─────────────────┴──────────────────┘
                                │ Manual Data Reconciliation
                                ▼
                       ┌──────────────────┐
                       │  Credit Committee│
                       │  (meets 2x/week) │
                       │  Paper-based     │
                       └──────────────────┘
```

**Key architectural deficiencies identified:**

- LoanTrak LOS was deployed in 2005 and has not had a major version upgrade since 2014. Customisation debt is severe — over 340 custom Oracle Forms scripts maintain business logic that is not documented anywhere except in the heads of six senior developers.
- Credit data exists in three separate, partially overlapping systems (CreditView, RiskMatrix, external bureau APIs) with no single source of truth. Reconciliation is performed manually before each credit committee submission, accounting for approximately 0.8 days of the analyst's 3.1-day credit memo preparation time.
- Document intake is multi-channel with no normalisation layer. The branch inbox receives documents via email, fax, and a basic web upload portal, all of which feed into an unstructured folder structure on branch file servers.

---

## 5. Future-State Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   GLOBALFIRST COMMERCIAL LENDING             │
│                     FUTURE STATE (TARGET)                    │
└──────────────────────────────────────────────────────────────┘

  CLIENT / RM          AI DOCUMENT PIPELINE      DATA FABRIC
  ─────────────        ────────────────────────  ──────────────────
  ┌──────────┐         ┌────────────────────┐    ┌──────────────────┐
  │  Enhanced│─────────▶ Document Ingestion │    │  Credit Data     │
  │  Client  │         │  (classify, OCR,   │───▶│  Unified Layer   │
  │  Portal  │         │   extract, validate│    │  (CreditView +   │
  └──────────┘         └─────────┬──────────┘    │  RiskMatrix +    │
                                 │               │  Bureau APIs)    │
                                 ▼               └────────┬─────────┘
                        ┌──────────────────┐             │
                        │  ML Credit       │◀────────────┘
                        │  Scoring Model   │
                        │  (XGBoost +      │
                        │   SHAP explainer)│
                        └─────────┬────────┘
                                  │
                                  ▼
                        ┌──────────────────┐    ┌──────────────────┐
                        │  Auto Credit     │    │  Decision        │
                        │  Memo Generator  │───▶│  Support UI      │
                        └──────────────────┘    │  (committee      │
                                                │   dashboard)     │
                                                └────────┬─────────┘
                                                         │
                         ┌───────────────┐              │
                         │  Human-in-    │◀─────────────┘
                         │  the-Loop     │  Edge cases
                         │  Review Queue │  (auto-flagged)
                         └───────┬───────┘
                                 │ Approved
                                 ▼
                        ┌──────────────────┐
                        │  LoanTrak LOS    │
                        │  (API adapter    │
                        │   layer added)   │
                        └──────────────────┘
```

**Key architectural decisions:**

- An API adapter layer was added to LoanTrak rather than replacing the LOS. A full replacement was evaluated and rejected: estimated cost of $25M+ and 3+ year timeline placed it outside the scope of this initiative. The adapter exposes create/read/update endpoints sufficient for the AI pipeline to interact with LoanTrak without modifying the core Oracle Forms application.
- SHAP (SHapley Additive exPlanations) was selected as the explainability framework specifically to satisfy SR 11-7 requirements. Every credit recommendation generated by the ML model is accompanied by a ranked list of the top 10 contributing factors with their directional impact, rendered in plain English for the decision-support UI.
- Human-in-the-loop review is mandatory for any application where the model's confidence score falls below a defined threshold, where SHAP attribution flags a data quality concern, or where the credit amount exceeds $50M.

---

## 6. Investment Justification

### Cost Structure

| Category | Year 1 | Year 2 | Year 3 | Total |
| --- | --- | --- | --- | --- |
| AI platform licences (document AI, ML ops) | $1.8M | $1.4M | $1.4M | $4.6M |
| Systems integration (API adapter, data fabric) | $2.1M | $0.9M | $0.3M | $3.3M |
| SR 11-7 model validation (independent firm) | $0.8M | $0.4M | $0.2M | $1.4M |
| Change management and training | $0.6M | $0.4M | $0.2M | $1.2M |
| Internal FTE (EA, architecture, programme) | $0.5M | $0.5M | $0.5M | $1.5M |
| **Total** | **$5.8M** | **$3.6M** | **$2.6M** | **$12.0M** |

### Benefits Summary

| Benefit Category | Year 1 | Year 2 | Year 3 | 5-Year Total |
| --- | --- | --- | --- | --- |
| Commercial revenue retained (conservative) | $28M | $52M | $64M | $210M |
| FTE reallocation (credit analyst time to higher-value work) | $3.2M | $6.8M | $8.1M | $32M |
| Error reduction (credit memo rework, regulatory findings) | $0.4M | $1.1M | $1.5M | $6M |
| **Total Benefits** | **$31.6M** | **$59.9M** | **$73.6M** | **$248M** |

!!! note "Financial Returns"
    - **NPV (10% discount rate, 5 years):** $45M
    - **Payback period:** 28 months
    - **ROI (5-year):** 38% on invested capital
    - **IRR:** 61%

---

## 7. Executive Proposal

The proposal was presented to GlobalFirst's Investment Committee (IC) in October 2025. Voting members included the CFO, CTO, CISO, Chief Risk Officer, and Head of Commercial Banking. The EA team's sponsor was the CTO.

### Objection: CFO on ROI Confidence

The CFO's primary challenge was the confidence interval around the $340M revenue-at-risk figure. Her position: "We've been told for three years that digital transformation will retain commercial clients. We haven't seen it materially show up in the numbers yet. Why is this different?"

**EA team response:** The team presented the value-stream mapping data as primary evidence — not survey data or industry benchmarks. Specific named clients (anonymised to "Client A" through "Client F" in the IC presentation) with confirmed departure attributed to origination speed were cited, with the corresponding lost revenue quantified by the commercial banking team. The team also offered a staged commitment: Phase 1 would be funded at $5.8M with Phase 2 contingent on demonstrating measurable cycle time reduction at the pilot branches. This transformed the ask from a $12M commitment to a $5.8M commitment with a decision gate.

### Objection: CISO on Model Risk

The CISO raised two concerns: (1) the model training data would contain sensitive borrower financial information that must not leave the bank's security perimeter, and (2) an AI credit scoring model that the bank could not fully explain to regulators represented an unacceptable risk under SR 11-7.

**EA team response:** On data perimeter: the architecture had already been designed with on-premises model training (no training data sent to cloud APIs) and the AI platform vendor's on-prem deployment option was confirmed in the proposal. On explainability: the SHAP framework was demonstrated live during the IC session using a synthetic loan application, showing the committee exactly what explanation would be generated for each credit recommendation. The independent SR 11-7 validation engagement (Deloitte) was named and the validation scope was presented. The CISO moved from opposed to conditionally supportive, with the condition that the CISO's office would co-own the model risk governance process — a condition the EA team accepted.

**Outcome:** IC approved Phase 1 funding ($5.8M) with a Phase 2 decision gate at month 8.

---

## 8. Implementation Roadmap

```
Phase 1 (Months 1–6): Foundation + Pilot
────────────────────────────────────────────────────────
Month 1-2: AI platform deployment, data fabric setup,
           API adapter for LoanTrak (read-only first)
Month 2-4: Document AI training on 3 years of
           historical loan files (42,000 applications)
Month 3-5: SR 11-7 validation of document AI
           (scope: classification, extraction accuracy)
Month 5-6: Pilot deployment at 2 branches (Chicago,
           London), analyst training, shadow mode operation
Gate:      Demonstrate ≥40% reduction in Steps 2-4
           cycle time before Phase 2 approval

Phase 2 (Months 7–18): Credit Scoring + Scale
────────────────────────────────────────────────────────
Month 7-10: ML credit scoring model development,
            SHAP integration, committee UI build
Month 9-12: SR 11-7 validation of credit scoring model
            (scope: predictive accuracy, fairness, explainability)
Month 11-14: Rollout to 20 branches across 4 regions
Month 14-18: Performance monitoring, model drift review,
             Responsible AI bias audit

Phase 3 (Months 19–24): Full Network Rollout
────────────────────────────────────────────────────────
Month 19-22: Remaining branches (global, 40 countries)
Month 22-24: LoanTrak API adapter upgrade to write mode,
             enabling AI-to-LOS straight-through processing
             for applications below $5M threshold
```

---

## 9. Governance

!!! info "SR 11-7 Model Risk Management"
    All AI models used in credit decisioning are subject to GlobalFirst's Model Risk Management (MRM) policy, which implements the Fed's SR 11-7 guidance. The following controls apply:

    - **Model inventory registration:** Both the document AI and credit scoring models were registered in the bank's model inventory prior to any production use.
    - **Independent validation:** An external firm (Deloitte Financial Advisory) performed pre-deployment validation, including conceptual soundness review, outcome analysis on holdout data, and sensitivity testing.
    - **Ongoing monitoring:** Monthly performance reports submitted to the MRM Committee. Automatic model suspension triggered if Gini coefficient drops more than 5 points from baseline.
    - **Annual revalidation:** Full revalidation required annually, or within 90 days of any material model change.

!!! info "Architecture Review Board (ARB) Requirements"
    The ARB imposed three mandatory requirements on the AI platform:

    1. **Explainability mandate:** Every credit recommendation must produce a human-readable SHAP explanation. Black-box recommendations are prohibited.
    2. **Audit trail:** Every model inference must be logged with input features, output score, confidence interval, and SHAP values. Retention period: 7 years (to match credit record retention policy).
    3. **Fallback mode:** The system must support a manual fallback mode in which analysts revert to the pre-AI process if the AI platform is unavailable. LoanTrak must remain independently operable.

!!! info "Responsible AI Board — Bias Review"
    Credit scoring models carrying fair lending implications are subject to review by GlobalFirst's Responsible AI Board (RAB). For this programme:

    - Pre-deployment disparate impact analysis was performed across protected classes (race, gender, national origin proxied via HMDA-equivalent analysis).
    - The model was retrained with fairness constraints applied to ensure approval rate disparities between demographic groups remained within regulatory tolerance thresholds.
    - The RAB approved deployment with a condition: quarterly disparate impact monitoring reports to be submitted to the RAB for the first two years.

---

## 10. Realized Business Value

### Cycle Time Outcome

!!! success "Target vs. Actual"
    - **Target:** 3–4 days origination cycle (from 18 days)
    - **Achieved:** 4 days average (not 3)
    - **Why 4 and not 3:** The legacy credit bureau API integration (Dun & Bradstreet and Equifax) proved significantly more complex than anticipated. Both vendors operated on batch-refresh cycles (12-hour and 6-hour respectively) rather than real-time, and neither offered synchronous API access at the data volumes required without renegotiating enterprise agreements. This added a structural 0.8–1.2 day latency to the external data enrichment step that no amount of internal automation could eliminate. The EA team documented this as a known limitation and a separate workstream to renegotiate bureau API contracts was initiated.

### Financial Outcomes (Year 1 Post Full Rollout)

| Metric | Target | Achieved |
| --- | --- | --- |
| Origination cycle time (mean) | 4 days | 4.1 days |
| Commercial revenue retained | $52M (Year 2 base) | $28M (Year 1 partial) |
| Credit analyst FTE redeployed | 180 FTE | 142 FTE |
| Credit memo preparation time | -70% | -68% |
| Credit committee queue depth | -60% | -55% |
| Model accuracy (Gini) | ≥0.62 | 0.67 |

The $28M retained commercial revenue in Year 1 was below the Year 2 projection ($52M) but was ahead of the Year 1 projection ($28M in the conservative case), primarily because several at-risk relationships renewed earlier than expected once relationship managers could demonstrate the improved timeline to clients.

---

## 11. Lessons Learned

### Lesson 1: Regulatory Validation Timeline Is Non-Negotiable and Longer Than You Think

The SR 11-7 validation process for the credit scoring model took 14 weeks — 6 weeks longer than planned. Deloitte's validation team requested two rounds of additional documentation on conceptual soundness that had not been anticipated. Teams building AI platforms in regulated financial services should plan for independent validation to take 12–20 weeks and should not schedule production deployment before validation is complete. Attempting to compress this timeline by starting production deployment in shadow mode before validation sign-off carries material regulatory risk.

### Lesson 2: Legacy API Reality Will Override Your Architecture

The EA team's original future-state architecture assumed real-time credit bureau data. That assumption was wrong. External vendor API capabilities must be validated during the discovery phase — not assumed from vendor marketing materials. The EA team learned to add an explicit "API capability assessment" workstream to all AI architecture engagements that involve external data sources.

### Lesson 3: Explainability Must Be Designed First, Not Bolted On

The SHAP integration was straightforward because the decision to use an explainable model (XGBoost with SHAP) was made before model development began. Teams that build ML models first and then try to add explainability after the fact face a much harder problem. In regulated environments, explainability is a first-class architectural requirement, not a feature to be added later.

### Lesson 4: The Credit Committee Was the Real Bottleneck

The value-stream map identified the credit committee queue (4.2 days) as the largest single contributor to cycle time. But early proposals focused heavily on document processing and spreading (Steps 2–3) because those were the most obviously automatable. The EA team almost missed the committee problem. The decision-support UI — which reduced committee prep time and allowed committee members to review more applications per session — was the single highest-impact capability in the programme.

### Lesson 5: Change Management for Branch Staff Was Underestimated

Credit analysts had built their professional identity around their ability to read complex financial documents and produce insightful credit memos. Introducing AI that could do 70% of that work in seconds created anxiety that the EA team initially underestimated. The programme required a dedicated change management stream, including reframing the analyst role as "AI-augmented senior credit professional" responsible for higher-value exception handling and client advisory work. Branches where this reframing was communicated well showed adoption rates 40% higher than branches where it was not.

---

## 12. Key Takeaways for Enterprise Architects

!!! tip "Takeaway 1: In Regulated Industries, Governance Is an Architectural Input, Not an Output"
    SR 11-7 compliance was not a governance afterthought — it directly shaped model selection (XGBoost over deep neural networks), integration design (audit logging requirements), and timeline (validation before production). Enterprise architects working in banking, insurance, or healthcare must treat regulatory requirements as first-class architectural constraints.

!!! tip "Takeaway 2: Assess External Dependencies with the Same Rigour as Internal Systems"
    The credit bureau API limitation was the programme's biggest surprise. Legacy external APIs — bureau data, government registries, partner systems — often have batch architectures, rate limits, and data freshness constraints that are invisible until you probe them. Build API capability assessments into every AI programme's discovery phase.

!!! tip "Takeaway 3: Human-in-the-Loop Is a Feature, Not a Compromise"
    The bank's credit culture required human oversight of credit decisions. The EA team initially treated human-in-the-loop as a constraint imposed by the regulator. In practice, it was also a product feature: credit officers were more willing to adopt and trust the system because they retained decision authority. Designing for human oversight from the start reduced adoption resistance significantly.

!!! tip "Takeaway 4: Start With the Biggest Bottleneck, Not the Easiest Win"
    The temptation in AI programmes is to start with the most automatable problem because it generates the fastest proof-of-concept. In this case, the most automatable problem (document extraction) was not the biggest bottleneck (committee throughput). The EA team's value-stream mapping discipline kept the architecture focused on the right problem.

!!! tip "Takeaway 5: Stage the Investment Commitment to Match Risk Profile"
    Converting the $12M ask to a $5.8M Phase 1 commitment with a decision gate was the single most important thing the EA team did to get IC approval. It aligned the investment commitment to the risk profile: the bank committed more capital only after evidence of value was demonstrated. Enterprise architects should design programme structures that allow for staged commitment on large, high-risk technology bets.

---

*This case study is based on a composite of real enterprise architecture engagements. All organisation names, financial figures, and personnel are anonymised or fictionalised for teaching purposes.*
