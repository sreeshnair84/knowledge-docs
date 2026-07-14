---
title: "Case Study: Energy Utility — AI Predictive Maintenance for Grid Infrastructure"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-13-case-studies"]
doc_type: narrative-case-study
industry: energy-utilities
protagonist_role: "Enterprise Architecture Lead"
core_tension: "Reactive maintenance cycles generating compounding outage costs against a 40-year-old asset monitoring baseline"
---

## Cast of Characters

*(Refer to the organisation background and key stakeholders described in this case study.)*


# Case Study: Energy Utility — AI Predictive Maintenance for Grid Infrastructure

---

## 1. Organisation Background

GridCore Energy is a vertically integrated electricity utility operating across generation, transmission, and distribution. It owns and operates 18,000 kilometres of high-voltage transmission infrastructure serving a population of 8.4 million across three regional service territories.

| Dimension | Detail |
| --- | --- |
| Transmission Network | 18,000 km of HV lines |
| Grid Assets | 42,000 monitored assets (transformers, switchgear, circuit breakers, protection relays) |
| Annual Revenue | $4.1B |
| Employees | ~14,200 |
| Regulatory Environment | National energy regulator, five-year regulatory price control periods |
| Asset Age Profile | 38% of transmission assets exceed 30 years in service |

GridCore Energy operates under a regulatory framework that ties revenue allowances to reliability metrics. Unplanned outages reduce allowed revenue through automatic penalty clauses in the current regulatory settlement. The organisation's CTO had flagged the ageing asset base as a strategic risk in two consecutive five-year regulatory submissions, but capital investment had been prioritised towards generation renewables transition rather than transmission monitoring infrastructure.

The result was a maintenance operation that was both expensive and reactive: $340M per year in maintenance expenditure, a field workforce of 2,200 technicians, and a scheduling system that had not been materially upgraded since the 1990s.

---

## 2. Business Problem

!!! danger "Outage Economics: $782M Total Annual Impact"
    GridCore's 340 annual unplanned outages cost $2.3M each in direct remediation costs and regulatory penalties. Alongside $340M in schedule-inefficient preventive maintenance, the total annual impact of the current maintenance model exceeds $780M.

**Outage Quantification:**

- 340 unplanned outages per year
- Average direct cost per outage: $2.3M (remediation labour, emergency contractor mobilisation, replacement equipment, regulatory fines)
- Total annual direct outage cost: **$782M**
- Regulatory penalty exposure: embedded in the $2.3M average — approximately $0.8M per outage in automatic revenue deductions
- Customer satisfaction impact: 34-point decline in residential satisfaction score over four years, attributable primarily to unplanned supply interruptions

**Why the Maintenance Model Was Failing — Root Causes:**

- **Calendar-driven scheduling with no condition intelligence.** Maintenance windows were assigned based on fixed intervals (annual, biennial, or triennial depending on asset class) with no real-time condition data to adjust frequency. Healthy assets were serviced when they did not need it; degrading assets were sometimes missed between cycles.
- **Sensor data existed but was not acted on.** GridCore had installed basic SCADA sensors on approximately 31,000 of its 42,000 assets as part of a 2014 infrastructure programme. The data was logged but not analysed for predictive signals — the NOC reviewed it reactively when threshold alarms fired, by which point degradation had typically already progressed to a near-failure state.
- **No cross-asset correlation.** Equipment failures in transmission infrastructure rarely occur in isolation. A degrading transformer creates increased load stress on adjacent switchgear, which accelerates its own degradation. The existing monitoring approach treated each asset independently; no system correlated behaviour across asset clusters.
- **Workforce scheduling was decoupled from asset risk.** Field crews were dispatched on pre-planned routes with no dynamic reprioritisation based on emerging risk signals. A technician might complete a low-priority inspection on a healthy transformer while a circuit breaker two kilometres away was showing early signs of contact degradation.

---

## 3. AI Opportunity Identification

The EA team was engaged following a board-level request for a technology response to a regulatory notice. The regulator had formally flagged GridCore's reliability trend as a concern and signalled that the next regulatory settlement (due in 18 months) would tighten outage penalty clauses unless a credible improvement programme was presented.

The team began with a structured opportunity identification exercise: mapping the outage lifecycle from first sensor signal to field resolution, identifying every step where information was available but not acted on.

**Alternative approaches considered:**

| Approach | Description | Reason Not Selected |
| --- | --- | --- |
| Increased inspection frequency | Reduce calendar intervals from annual to semi-annual for high-risk assets | Would increase maintenance cost by ~$80M/year with no improvement in early detection; addresses symptoms not cause |
| SCADA platform replacement | Replace existing SCADA infrastructure with modern vendor platform | $220M capital cost, 4-year implementation; doesn't address analytical capability gap |
| Outsource maintenance scheduling | Third-party managed service for maintenance optimisation | Vendor dependency, regulatory compliance risk with third-party field decision-making |
| **AI predictive maintenance platform** | **ML-based health scoring across all 42,000 assets with dynamic dispatch** | **Selected: lowest capital, fastest time to value, preserves operational control** |

The AI predictive maintenance option was selected because it could be layered on top of existing SCADA infrastructure without replacing it, deliver measurable value within 12 months through pilot deployment on highest-risk asset classes, and provide the regulatory-ready audit trail that the regulator's notice had implicitly demanded.

---

## 4. Current-State Architecture

GridCore's existing monitoring and maintenance architecture at the start of the engagement:

```
CURRENT STATE — MONITORING AND MAINTENANCE ARCHITECTURE

┌─────────────────────────────────────────────────────────────────┐
│                   FIELD ASSETS (42,000)                         │
│   Transformers │ Switchgear │ Circuit Breakers │ Relays         │
│   ~31,000 with SCADA sensors │ ~11,000 unmonitored             │
└───────────────────────────┬─────────────────────────────────────┘
                            │ SCADA telemetry (15-min polling)
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│               LEGACY SCADA PLATFORM (2014)                      │
│   · Threshold-based alerting only                               │
│   · 72-hour data retention in active memory                     │
│   · Historical data archived to tape (not queryable)            │
│   · 47 alarm categories, ~12,000 alarms/month                  │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Manual review
                            ▼
┌──────────────────────────────────────┐
│         NETWORK OPERATIONS           │
│         CENTRE (NOC)                 │
│   · Reactive alarm review            │
│   · No ML / pattern analysis         │
│   · Manual escalation to field       │
└───────────────┬──────────────────────┘
                │ Work order creation
                ▼
┌──────────────────────────────────────┐
│      ENTERPRISE ASSET MANAGEMENT     │
│      SYSTEM (EAM — SAP PM)           │
│   · Maintenance schedules (manual)   │
│   · Work order tracking              │
│   · No integration with SCADA        │
└──────────────────────────────────────┘
```

**Architecture deficiencies identified:**

1. **No historical telemetry access.** Taping archiving meant that machine learning training data was unavailable without a multi-month data recovery programme.
2. **No EAM-SCADA integration.** Maintenance schedules in SAP PM were entirely disconnected from sensor readings — a critical gap for dynamic reprioritisation.
3. **Unmonitored asset population.** 11,000 assets had no sensor connectivity at all, representing approximately 26% of the total estate.
4. **Alert noise ratio.** 12,000 alarms per month of which field teams estimated fewer than 6% required urgent action — a noise-to-signal ratio that had caused chronic alert fatigue in the NOC.

---

## 5. Future-State Architecture

The target architecture introduced a three-tier AI platform:

```
FUTURE STATE — AI PREDICTIVE MAINTENANCE PLATFORM

TIER 1: EDGE PROCESSING
┌──────────────────────────────────────────────────────────────────┐
│              FIELD ASSETS (42,000 → 42,000 by Year 2)           │
│   Original SCADA sensors │ New IoT sensors (11,000 assets)       │
│   Vibration │ Temperature │ Partial discharge │ Oil DGA          │
│   Measurement interval: 1–5 min (vs. legacy 15-min polling)      │
└──────────────────────────┬───────────────────────────────────────┘
                           │ Raw telemetry streams
                           ▼
┌──────────────────────────────────────────────────────────────────┐
│              EDGE COMPUTE NODES (24 substations)                 │
│   · Local ML inference (equipment health score, 0–100)           │
│   · Anomaly pre-processing (reduces uplink bandwidth ~85%)       │
│   · 7-day local data buffer (connectivity resilience)            │
│   · OT/IT boundary enforcement (air-gap capable)                 │
└──────────────────────────┬───────────────────────────────────────┘
                           │ Health scores + anomaly events
                           ▼
TIER 2: CENTRALISED AI PLATFORM
┌──────────────────────────────────────────────────────────────────┐
│              AI PREDICTIVE MAINTENANCE PLATFORM                  │
│   ┌─────────────────────┐   ┌──────────────────────────────┐    │
│   │  Data Lake (Azure)  │   │  ML Platform (Azure ML)      │    │
│   │  · 5-year telemetry │   │  · Equipment health models   │    │
│   │  · Maintenance logs │   │  · Failure prediction (RUL)  │    │
│   │  · Incident records │   │  · Cross-asset correlation   │    │
│   │  · Weather overlays │   │  · Seasonal adjustment       │    │
│   └──────────┬──────────┘   └──────────────┬───────────────┘    │
│              │                             │                      │
│              └──────────────┬──────────────┘                      │
│                             ▼                                     │
│              ┌─────────────────────────────┐                     │
│              │  MAINTENANCE PRIORITY ENGINE │                     │
│              │  · Risk-ranked work queue   │                     │
│              │  · Crew dispatch optimiser  │                     │
│              │  · Regulatory audit trail   │                     │
│              └──────────────┬──────────────┘                     │
└─────────────────────────────┼────────────────────────────────────┘
                              │ Prioritised maintenance actions
                              ▼
TIER 3: OPERATIONAL INTEGRATION
┌──────────────────────────────────────────────────────────────────┐
│         SAP PM INTEGRATION (BIDIRECTIONAL)                       │
│   · AI-generated work orders → SAP PM                           │
│   · Completion records and outcomes → ML training feedback loop  │
│   · Scheduled maintenance automatically adjusted by health score │
└──────────────────────────────────────────────────────────────────┘
```

**Key architectural decisions and their rationale:**

| Decision | Option Selected | Alternative Rejected | Reason |
| --- | --- | --- | --- |
| Edge vs. cloud-only inference | Edge compute at 24 substations | Central cloud inference only | OT/IT boundary requirements; 4G connectivity not guaranteed at all sites; latency requirements for local safety systems |
| Sensor retrofit approach | Phased by asset criticality and age | Full estate simultaneous rollout | Risk management; early learnings from Phase 1 high-risk assets improved Phase 2 sensor placement |
| ML platform | Azure Machine Learning | On-premises ML cluster | Existing Azure agreement; elasticity for model retraining; no new data centre investment |
| EAM integration | Bidirectional SAP PM API | One-way export only | Feedback loop from completion records was essential for model accuracy improvement |

**Architecture risks flagged at design stage:**

- **OT/IT connectivity**: 8 substations in remote areas had intermittent 4G coverage — addressed by 7-day edge buffer and satellite backup specification
- **Data quality**: Historical SCADA data archived on tape required 14-week extraction programme before ML training could begin; this was the single largest schedule risk
- **Change management**: Field technicians' trust in AI-generated priority rankings would be critical for adoption; the design included a "challenge" mechanism allowing technicians to override and log the reason, feeding back to model improvement

---

## 6. Investment Justification

**Total Programme Investment: $11M over 3 years**

| Cost Category | Year 1 | Year 2 | Year 3 | Total |
| --- | --- | --- | --- | --- |
| Edge compute hardware (24 substations) | $1.8M | $0.2M | $0.1M | $2.1M |
| IoT sensor retrofit (11,000 assets, phased) | $1.2M | $1.5M | $0.5M | $3.2M |
| AI platform build (Azure ML + data lake) | $1.4M | $0.6M | $0.3M | $2.3M |
| SAP PM integration | $0.7M | $0.2M | — | $0.9M |
| Historical data extraction (tape archive) | $0.5M | — | — | $0.5M |
| Programme management and change management | $0.7M | $0.9M | $0.4M | $2.0M |
| **Total** | **$6.3M** | **$3.4M** | **$1.3M** | **$11.0M** |

**Benefit Case:**

| Benefit | Year 1 | Year 2 | Year 3 | Basis |
| --- | --- | --- | --- | --- |
| Outage reduction (68% target, phased) | 45 fewer outages × $2.3M | 115 fewer outages × $2.3M | 231 fewer outages × $2.3M | Phased: 15%/34%/68% reduction as ML model matures |
| Outage reduction value | $103.5M | $264.5M | $531.3M | |
| Maintenance cost efficiency (22% target) | $25.0M | $48.0M | $74.8M | Reduction in unnecessary scheduled maintenance |
| **Total Annual Benefit** | **$128.5M** | **$312.5M** | **$606.1M** | |

**NPV, IRR, and Payback:**

| Metric | Value | Assumption |
| --- | --- | --- |
| 3-year NPV (8% discount rate) | $812M | Benefits phased conservatively; Year 1 benefit recognised at 50% given partial deployment |
| Payback period | **26 months** | Net cumulative positive cash flow achieved midway through Year 3 |
| 3-year ROI | **7,275%** | Net benefit $800M on $11M investment |
| IRR | >100% | Project IRR exceeds standard hurdle rates at all sensitivity scenarios |

!!! note "Assumption Transparency"
    The investment committee required the team to present a "bear case" sensitivity analysis. In the bear case (40% outage reduction, 12% maintenance saving, 6-month programme delay), payback extended to 34 months and 3-year NPV reduced to $380M — still strongly positive. The bear case passed the regulatory submission test, which required positive NPV under pessimistic assumptions.

---

## 7. Executive Proposal

The proposal was presented to GridCore's Executive Committee in a 90-minute session. Three weeks earlier, the team had run a 4-hour working session with the Chief Network Officer and Head of Maintenance to validate the financial model assumptions — a deliberate sequencing decision that meant the programme sponsor arrived at the Executive Committee prepared to defend the numbers.

**The proposal structure:**

1. Regulatory context and urgency (5 minutes): The regulatory notice was placed first, establishing external pressure as the strategic context for the discussion. The EA lead opened with the regulator's exact language about tightening penalties — not the team's paraphrase of it.

2. Root cause analysis (10 minutes): The team presented the maintenance architecture diagnostic. The key slide was a heat map of the 42,000 assets, colour-coded by outage incidence in the past three years, overlaid with sensor coverage. It made visible, for the first time, that the 22% of assets with no monitoring accounted for 51% of outages.

3. The solution architecture (15 minutes): Presented at a non-technical level — the Executive Committee was not asked to approve an architecture, they were asked to approve an outcome. The three-tier diagram was shown briefly; the substantive discussion was on the deployment phasing and risk mitigation approach.

4. Financial model walkthrough (20 minutes): The CFO drove this section with direct questions. The model's explicit assumption transparency (every number was footnoted with its basis) was noted positively. The CFO's final question — "What's the worst case where we spend $11M and don't get enough benefit to justify it?" — was answered with the bear case scenario that had been prepared specifically in anticipation of this question.

5. Regulatory submission alignment (10 minutes): The legal counsel for regulatory affairs confirmed that the programme, if executed as described, would provide sufficient evidence for the planned regulatory submission.

**The key objection and how it was resolved:**

The CTO challenged the 68% outage reduction target as optimistic, citing a similar programme at a European peer utility that had achieved only 40% reduction after three years. The EA team's response was structured:
- Acknowledge the comparable: the European case was a real data point that had been reviewed
- Identify the difference: the European programme had not included the EAM bidirectional integration or the technician feedback loop — both of which were load-bearing for model improvement
- Present the bear case: even at 40%, the investment was strongly justified

The programme was approved at the requested $11M with a requirement for a 6-month progress review tied to Phase 1 deployment metrics.

---

## 8. Implementation Roadmap

```
PHASE 1 (Months 1–9): High-Risk Asset Pilot
─────────────────────────────────────────────
Month 1–3:  Historical data extraction from tape archive
            Edge compute installation at 6 highest-traffic substations
            Baseline health scoring model deployment (rule-based, pre-ML)

Month 4–6:  IoT sensor retrofit — top 3,000 highest-risk assets
            Initial ML model training on extracted historical data
            NOC workflow redesign and technician training

Month 7–9:  Live AI health scoring for 3,000 assets
            Dynamic dispatch pilot with 3 field crews
            Phase 1 value measurement: outage incidents, dispatch efficiency

Phase 1 Gate Criteria: ≥15% reduction in outages on monitored assets
                       Technician adoption rate ≥70% (override rate <30%)

─────────────────────────────────────────────
PHASE 2 (Months 10–18): Full Transmission Rollout
─────────────────────────────────────────────
Month 10–13: Edge compute expansion to all 24 substations
             IoT sensor retrofit — next 6,000 assets
             ML model improvement cycle (Phase 1 feedback integration)
             SAP PM bidirectional integration deployment

Month 14–18: Full EAM integration live
             Maintenance scheduling shift from calendar to risk-driven
             Automated work order generation for 70% of maintenance actions
             Full NOC transition to AI-assisted prioritisation

─────────────────────────────────────────────
PHASE 3 (Months 19–30): Optimisation and Scale
─────────────────────────────────────────────
Month 19–24: IoT sensor retrofit — final 2,000 assets (completing 11,000)
             Cross-asset correlation model deployment
             Weather and grid-load overlay integration

Month 25–30: Full predictive capability across 42,000-asset estate
             Regulatory reporting integration
             Model refresh cadence established (quarterly retraining)
```

**Critical path dependencies:**
- Historical data extraction (Months 1–3) is the programme's longest lead-time item and must start on Day 1
- NOC workflow redesign must be completed before live AI scoring goes live — a technology deployment without operational readiness would risk alert fatigue from a new system on top of the existing problem
- Technician feedback loop integration with SAP PM (bidirectional) was a Phase 2 dependency but had Phase 1 design requirements — the API specification needed to be complete by Month 3

---

## 9. Governance Framework

**Regulatory governance was the non-negotiable foundation.** The regulator's notice had introduced an implicit requirement for an explainable, auditable maintenance decision process — if GridCore's AI system made a maintenance decision that preceded or followed an outage, the regulator needed to be able to reconstruct the decision rationale.

The governance framework was designed around this requirement:

| Governance Requirement | Design Response |
| --- | --- |
| Explainability of AI maintenance priority | Health score model includes feature attribution (SHAP values) stored per decision |
| Audit trail for work order generation | Every AI-generated work order records the triggering health score, the contributing features, and the confidence interval |
| Human override capability | Technicians can override AI priority with mandatory reason code; overrides and outcomes feed back to model retraining |
| Model change management | All model updates require EA team sign-off and 14-day parallel running before production deployment |
| Regulatory reporting | Quarterly availability of full decision audit trail to regulator on request |

**Internal governance bodies:**

- **Programme Steering Committee**: Chaired by the Chief Network Officer. Monthly. Reviews deployment progress, field adoption metrics, and outage data.
- **AI Model Governance Board**: Chaired by the Head of Data Science. Bi-monthly. Reviews model performance, approves model updates, monitors for drift.
- **Architecture Review Board**: Two formal reviews — at Phase 1 close and Phase 2 close — confirming that deployed architecture matches approved design.

**A note on responsible AI in infrastructure contexts:**

AI systems that influence physical safety infrastructure carry a higher burden of proof than most enterprise AI applications. The governance framework explicitly addressed three failure modes:

1. **False confidence in a healthy asset**: A model that incorrectly predicts low failure risk on a degrading asset could delay inspection beyond the point of safe operation. Mitigation: all assets with health scores below 60 (on a 0–100 scale) receive a mandatory human review before scheduled maintenance deferral is approved.
2. **Alert fatigue from false positives**: If the model generates too many high-priority alerts, field teams will start ignoring them — recreating the original problem in AI form. Mitigation: alert precision target of ≥75% was set as a Phase 1 gate criterion.
3. **Model drift as asset age distribution shifts**: As new assets are added and old ones retired, the training data distribution changes. Mitigation: quarterly model retraining cycles with drift monitoring between cycles.

---

## 10. Realized Business Value

**Outcomes measured at Month 30 against programme targets:**

| Metric | Target | Achieved | Variance |
| --- | --- | --- | --- |
| Unplanned outage reduction | 68% | **63%** | -5pp — within acceptable range |
| Maintenance cost per asset (annual) | -22% | **-19%** | -3pp — slightly below target |
| Alert precision (AI-generated alerts) | ≥75% | **81%** | +6pp — above target |
| Technician adoption rate | ≥70% override-free | **76%** | +6pp — above target |
| Programme investment | $11.0M | **$11.3M** | +$0.3M — within contingency |
| Payback period | 26 months | **28 months** | +2 months — within bear case range |

**Outage reduction breakdown by asset class:**

- Transformers: 71% reduction (highest gain — model trained on richest historical dataset)
- Circuit breakers: 68% reduction (strong signal from vibration sensor data)
- Switchgear: 58% reduction (more variable — complex interaction with ambient temperature)
- Protection relays: 41% reduction (limited sensor coverage completed only in Phase 3; ongoing improvement expected)

**The most important unreported outcome**: The regulatory submission was accepted. The regulator acknowledged the predictive maintenance programme as a credible plan and agreed to review penalty clause tightening at the mid-settlement review rather than the start of the next settlement. This was worth an estimated $120–180M in protected revenue over the settlement period — a benefit that was not explicitly modelled in the original investment case but that the CFO cited as the programme's single most significant financial outcome.

**Where targets were missed and why:**

- The 63% outage reduction (vs. 68% target) was attributable almost entirely to protection relays, where the sensor retrofit was completed later than planned and training data for this asset class was thinner than estimated. The team expects relay performance to converge to target level by Month 36.
- The 2-month payback delay resulted from a 6-week delay in Phase 2 SAP PM integration — a data migration scope increase discovered in month 14 — that pushed full EAM-AI integration live to Month 22 rather than Month 18.

---

## 11. Lessons Learned

**1. The data extraction programme is the programme.**

The 14-week historical data extraction from tape archive was underestimated at scoping stage. The team had budgeted 8 weeks and $500K. The extraction took 18 weeks and consumed $680K due to tape format inconsistencies from three generations of SCADA systems. Every week of delay in data extraction was a week of delay in ML model training, which was a week of delay in accurate health scoring. Future programmes in asset-intensive industries should treat the historical data programme as a parallel pre-workstream, not a Phase 1 activity.

**2. OT/IT boundary design cannot be retrofitted.**

The governance boundary between operational technology (OT — the SCADA and sensor systems) and information technology (IT — the cloud AI platform) required more careful design than initially scoped. The edge compute tier that was included in the architecture for latency and bandwidth reasons turned out to be equally essential for OT/IT boundary management — it provided a controlled interface point that satisfied the operations engineering team's security requirements. Teams designing AI for industrial infrastructure should include the OT security team in architecture design from Week 1, not as a late-stage reviewer.

**3. Technician trust is a deployment variable, not a training outcome.**

The initial programme plan allocated two days of classroom training for field technicians before go-live. Field adoption at Month 3 was 41% — well below the 70% target. An emergency qualitative study found that technicians did not distrust the technology; they distrusted the process. They had no way to challenge a priority ranking they disagreed with. The "challenge" mechanism — allowing technicians to override with a logged reason — was added in Month 4. By Month 6, adoption had risen to 68%. The lesson: in operational contexts, the ability to override and be heard is not a concession to change resistance; it is a design requirement for durable adoption.

**4. Cross-asset correlation was the hardest model to build and the most valuable.**

The single-asset health scoring models deployed in Phase 1 were straightforward to train and deploy. The cross-asset correlation model — which identifies degradation cascades across asset clusters — was technically more complex (graph neural network architecture rather than tabular ML) and took 4 additional months to reach production accuracy. But it delivered disproportionate value: 23% of the total outage reduction was attributable to cascade predictions that the single-asset models would not have surfaced. Teams should budget both the additional development time and the additional expertise (graph ML is a specialist capability) for correlation modelling from the outset.

**5. Regulatory relationships determine what "success" means.**

The programme achieved slightly below its outage reduction target (63% vs. 68%) and slightly above its budget ($11.3M vs. $11.0M). Under most internal ROI frameworks, this would be classified as a near-miss. But the regulator evaluated it as a programme that delivered on its commitments, protecting the organisation from penalty clause tightening worth an estimated $120–180M. The lesson for EA practitioners: in regulated industries, the investment case must include the regulatory relationship outcome as an explicit benefit, not an implicit assumption. Had the team modelled this, the programme's financial case would have been even stronger — and the 5pp outage shortfall would not have been characterised as a miss.

---

## 12. Key Takeaways for Enterprise Architects

**1. In asset-intensive industries, data history is the primary constraint on AI timeline — not model complexity.**

ML models for equipment health are not technically exotic. The challenge is always data: historical maintenance records, failure events, and sensor readings with sufficient history to train reliable failure prediction models. EA teams in manufacturing, utilities, and logistics should assess data depth and accessibility as the first feasibility filter, before assessing technology options.

**2. Edge compute is not a cost optimisation — it is an architecture requirement in OT environments.**

AI architectures designed for cloud-native enterprise applications do not translate directly to operational technology environments. Connectivity unreliability, OT/IT security boundaries, and the need for local inference under network partition conditions make edge compute a functional requirement, not an optional cost reduction. Architects moving from enterprise IT into industrial AI must reframe their platform assumptions.

**3. The human-in-the-loop design pattern is non-negotiable for safety-relevant AI.**

Any AI system that influences decisions affecting physical safety or regulatory compliance must include a well-designed human review mechanism. This is not about limiting AI capability — it is about creating the accountability structure that makes high-stakes AI deployable in regulated contexts. The override-and-log mechanism in this case was the difference between 41% and 76% field adoption.

**4. Regulatory submissions are architectural requirements documents.**

In regulated industries, the regulator's framework defines what the AI system must be able to explain and audit. The explainability and audit trail requirements in this programme were not designed in as engineering nice-to-haves — they were derived directly from the regulatory notice. EA teams in regulated industries should extract AI governance requirements from regulatory documents before finalising architecture, not afterwards.

**5. The investment case for operational AI must model the regulatory relationship, not just the operational metrics.**

The most significant financial outcome of this programme — the regulatory settlement protection — was not in the original investment case. This was an omission. EA teams presenting AI investment cases in regulated environments should explicitly model the value of regulatory relationship improvement, not just operational KPIs.

---

*This case study is a Module 13 learning artefact for the Enterprise Architecture Masterclass. Names, financials, and details are illustrative. All figures are intended as learning-context estimates; verify current market rates before using in live engagement models.*
