---
title: "Case Study: Automotive Manufacturer — AI Predictive Maintenance"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ea-masterclass", "module-13-case-studies"]
doc_type: narrative-case-study
industry: manufacturing
protagonist_role: "Enterprise Architecture Lead"
core_tension: "Manual production processes creating quality and efficiency gaps"
---
## Cast of Characters

*(Refer to the organisation background and key stakeholders described in this case study.)*


# Case Study: Automotive Manufacturer — AI Predictive Maintenance

!!! abstract "Case Summary"
    A global automotive parts manufacturer with **15 plants and $6B in annual revenue** was losing **$120M per year** to unplanned downtime. The enterprise architecture team proposed an AI-powered predictive maintenance platform built on industrial IoT, computer vision, and machine learning anomaly detection. After 2.5 years of implementation, the program delivered **6.1% downtime reduction** against an 8% target — a partial miss with clear, documented reasons.

---

## 1. Organization Background

The company is a Tier 1 automotive parts supplier operating 15 manufacturing plants across North America, Europe, and Southeast Asia. Its products — powertrain components, chassis assemblies, and braking systems — are supplied directly to seven global OEMs. The business operates on just-in-time delivery contracts with penalty clauses: a missed shipment triggers financial penalties averaging $2.1M per incident.

The manufacturing environment is capital-intensive and technically complex. The plant fleet spans equipment from 14 different decades of investment, including:

- **CNC machining centers** (high-precision, vibration-sensitive)
- **Hydraulic press lines** (scheduled overhaul cycles averaging 18 months)
- **Robotic welding cells** (vision-guided, high mean time between failures but catastrophic when they fail)
- **Conveyor and material handling systems** (distributed, difficult to instrument)

The organization employs approximately 22,000 people, of which roughly 3,100 are maintenance technicians and industrial engineers. Each plant operates under a separate OT (Operational Technology) team with its own tools, processes, and institutional knowledge. There is no common maintenance management platform across plants.

---

## 2. Business Problem (Quantified)

Unplanned downtime was the single largest controllable cost driver in the business. The CFO's office had tracked the problem for three years before the EA engagement began.

| Metric | Value |
| --- | --- |
| Annual unplanned downtime rate | 8.0% of available production hours |
| Annual cost of unplanned downtime | $120M |
| Average cost per incident | $340,000 |
| Annual downtime incidents | ~353 |
| Delivery penalty triggers per year | 41 incidents |
| Cost of delivery penalties annually | $86M (subset of $120M) |
| Reactive maintenance labor cost premium | $18M vs. planned maintenance baseline |

!!! warning "The Compounding Problem"
    Unplanned downtime does not scale linearly. When a critical press line fails mid-shift, the downstream assembly cells stop producing. One press failure at Plant 7 in 2023 triggered a cascade that idled three downstream lines for 11 hours — a $4.2M single-incident loss. The $120M annual figure understates true economic impact because it excludes OEM relationship damage and the cost of expedited logistics to recover shipments.

The CEO had set a formal KPI: reduce unplanned downtime to below 4% within three years. The Operations VP had tried two previous initiatives — a CMMS upgrade in 2021 and a vendor-led IoT pilot at one plant in 2022 — both of which failed to scale. The EA team was brought in after the third year of missed targets.

---

## 3. AI Opportunity Identification

The EA team conducted a six-week assessment across three plants before proposing a solution. The opportunity identification process used three analytical lenses:

**Lens 1: Failure Pattern Analysis**

Maintenance records from the three assessed plants (Paper records were digitized for this exercise — itself a signal of the data problem) showed that 71% of unplanned failures had observable precursor signals in the 48–96 hours before failure: abnormal vibration, temperature drift, pressure variance, or increased motor current draw. These signals were present in SCADA historian data but were never acted upon because no one was monitoring them systematically.

**Lens 2: Technology Readiness**

Industrial IoT sensor costs had dropped significantly. Vibration, temperature, and current sensors with wireless connectivity were available at $80–$220 per sensor point. ML anomaly detection had reached production maturity at comparable manufacturers. Computer vision for visual inspection of rotating equipment had proven ROI in comparable industries.

**Lens 3: Competitive Benchmarking**

Three direct competitors had implemented predictive maintenance programs. The EA team obtained (via public disclosures and industry analyst reports) performance data suggesting competitors were operating at 4.5–5.5% unplanned downtime rates. The gap represented a structural cost disadvantage.

The identified AI opportunity: **ML-based anomaly detection per equipment class**, combined with **computer vision for visual anomaly detection** and a **maintenance scheduling optimizer** to convert anomaly alerts into actionable work orders before failure occurred.

---

## 4. Current-State Architecture Assessment

The current-state architecture review revealed a fragmented and siloed landscape.

```
CURRENT STATE — Plant Architecture (replicated x15, each different)
=================================================================

  [Plant Floor]         [OT Network]           [IT Network]
  ┌──────────┐         ┌──────────────┐        ┌──────────────┐
  │ PLC/SCADA│─────────│ Historian     │        │ ERP (SAP)    │
  │ (Siemens │         │ (OSIsoft PI  │        │              │
  │  ABB,    │         │  or custom)  │        │ CMMS         │
  │  Fanuc,  │         └──────┬───────┘        │ (Maximo or   │
  │  Allen   │                │                │  SAP PM)     │
  │  Bradley)│         ┌──────▼───────┐        └──────────────┘
  └──────────┘         │ Local        │
                       │ Engineer     │        NO CONNECTION
  [Equipment]          │ Workstation  │        between OT
  47 different         │ (manual      │        Historian and
  equipment brands     │  monitoring) │        cross-plant
  across 15 plants     └──────────────┘        analytics

  PROBLEMS:
  - Each plant: different historian, different data schema
  - No cross-plant data aggregation
  - SCADA data never leaves OT network (air-gap policy)
  - Maintenance decisions: tribal knowledge + paper checklists
  - No ML, no alerting, no trend analysis at scale
```

| Architecture Dimension | Current State | Gap |
| --- | --- | --- |
| Data collection | Per-plant SCADA historians, isolated | No aggregation or cross-plant visibility |
| Data schemas | 47 equipment brands × 15 plants = non-standard | No common equipment ontology |
| Analytics capability | Manual spot-checks by plant engineers | No automated anomaly detection |
| Maintenance workflow | Paper/CMMS work orders, reactive | No predictive work order generation |
| OT/IT integration | Air-gapped (security policy) | Requires purpose-built bridge |
| Cross-plant benchmarking | Zero — does not exist | No common performance baseline |

!!! danger "OT Security Reality"
    The air-gap between OT and IT networks was not a legacy oversight — it was a deliberate security policy enforced by the OT security team and mandated by cyber insurance requirements. Any solution that violated this air-gap would be rejected. This became the central architecture constraint.

---

## 5. Future-State Architecture Design

The proposed future state introduced a four-layer architecture that preserved the OT/IT air-gap while enabling cross-plant ML.

```
FUTURE STATE — AI Predictive Maintenance Platform
=================================================

  LAYER 1: EDGE (Plant OT Network — air-gapped)
  ┌─────────────────────────────────────────────────┐
  │  [IoT Sensors]──[Edge Gateway]──[Data Diode]    │
  │  Vibration,        Local          One-way        │
  │  Temp, Current,    buffering,     data export    │
  │  Vision cameras    preprocessing  (hardware)     │
  └─────────────────────────────────────────────────┘
                              │ (one-way, no return path)
  LAYER 2: COLLECTION (DMZ)   ▼
  ┌─────────────────────────────────────────────────┐
  │  Azure IoT Hub (per-region)                     │
  │  Data normalization → common equipment schema   │
  │  Raw telemetry storage (Azure Data Lake Gen2)   │
  └─────────────────────────────────────────────────┘
                              │
  LAYER 3: AI/ML PLATFORM     ▼
  ┌─────────────────────────────────────────────────┐
  │  Azure ML Workspace                             │
  │  ┌─────────────┐  ┌─────────────┐              │
  │  │ Per-Equipment│  │ Computer    │              │
  │  │ Anomaly      │  │ Vision      │              │
  │  │ Detection    │  │ Models      │              │
  │  │ Models (47   │  │ (weld cell  │              │
  │  │ equipment    │  │  inspection)│              │
  │  │ types)       │  └─────────────┘              │
  │  └─────────────┘                                │
  │  Maintenance Scheduling Optimizer               │
  │  Cross-Plant Benchmarking Engine                │
  └─────────────────────────────────────────────────┘
                              │
  LAYER 4: APPLICATIONS       ▼
  ┌─────────────────────────────────────────────────┐
  │  Technician Mobile App (iOS/Android)            │
  │  Plant Manager Dashboard (Power BI)             │
  │  CMMS Integration (SAP PM work order auto-gen)  │
  │  Executive Cross-Plant Benchmark Dashboard      │
  └─────────────────────────────────────────────────┘
```

!!! info "The Data Diode Solution"
    The OT security team's core objection was bidirectional network connectivity. The solution was hardware data diodes — one-way network devices that physically cannot transmit data in reverse. Data flows from OT historian to the DMZ collection layer; no return path exists at the hardware level. This satisfied the cyber insurance requirement and unblocked the program by four months.

**Key architectural decisions:**

- **Edge-first buffering:** Each plant edge gateway buffers 72 hours of telemetry locally to handle connectivity interruptions without data loss.
- **Equipment ontology:** A common data schema was designed for all 47 equipment brands, with plant-specific adapters translating SCADA tag names to the canonical schema.
- **Model-per-equipment-type strategy:** Rather than a single anomaly detection model, the team trained separate models for each equipment class. This added complexity but improved accuracy significantly — a hydraulic press has fundamentally different failure signatures than a CNC spindle.
- **Human-in-the-loop:** The system generates maintenance alerts, not work orders. A technician reviews each alert before a work order is created. This was a deliberate choice to build trust during rollout and prevent alert fatigue.

---

## 6. Investment Justification

### Cost Summary

| Category | Investment |
| --- | --- |
| IoT sensor hardware (15 plants) | $2.8M |
| Edge gateway infrastructure | $0.9M |
| Azure cloud platform (3-year) | $1.4M |
| ML model development | $1.7M |
| Systems integration (CMMS, SAP) | $0.8M |
| Change management and training | $0.6M |
| Project management and governance | $1.0M |
| **Total Program Investment** | **$9.2M** |

### Benefit Projection (5-Year)

| Benefit Category | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 | Total |
| --- | --- | --- | --- | --- | --- | --- |
| Downtime reduction (8% → 4%) | $8M | $15M | $15M | $15M | $14M | $67M |
| Delivery penalty avoidance | $6M | $9M | $9M | $9M | $8M | $41M |
| Reactive maintenance labor reduction | $2M | $4M | $4M | $4M | $4M | $18M |
| **Total Benefits** | **$16M** | **$28M** | **$28M** | **$28M** | **$26M** | **$126M** |

- **ROI:** 1,270% over 5 years
- **Payback period:** 18 months
- **NPV (8% discount rate):** $87M

!!! note "CFO Scrutiny"
    The CFO challenged the Year 1 benefit figure as too low. The EA team held firm: $8M in Year 1 reflects partial plant rollout (5 of 15 plants) and model training periods. Overstating Year 1 to make payback look shorter would have been technically dishonest. The 18-month payback was calculated from first production deployment, not program start.

---

## 7. Executive Proposal

The program was presented to the Executive Committee after the six-week assessment. Three significant challenges emerged.

**Challenge 1: CTO — "Why not just buy a vendor solution?"**

Three vendors (Uptake, C3.ai, and Aspentech) were evaluated. Each quoted $3–5M per year in licensing fees, totaling $15–25M over five years — significantly more than the custom build. More importantly, none could accommodate the specific combination of 47 equipment brands with proprietary SCADA tag schemas without expensive customization that would have rivaled the custom build cost anyway. The EA team's response included a detailed build-vs-buy analysis. Decision: build on Azure ML with vendor sensors.

**Challenge 2: COO — "Our union agreements require consultation before deploying monitoring technology"**

This was the most significant executive challenge. The COO flagged that collective bargaining agreements at nine of fifteen plants explicitly required shop steward consultation before deploying new monitoring technology. The EA team had not identified this in the initial assessment — an acknowledged gap. The program plan was revised to include a three-month union consultation phase before any plant deployment. Shop stewards were brought into the design process; the final agreement included explicit language that the system monitors machines, not people, and that maintenance job levels would not be reduced as a result of the program.

**Challenge 3: VP Operations — "We've tried this twice. What's different?"**

The two previous initiatives had failed for identifiable reasons: the 2021 CMMS upgrade addressed workflow but not data, and the 2022 IoT pilot used a single-plant, single-vendor approach that couldn't scale. The EA team presented a specific failure analysis of both initiatives and mapped how the current proposal addressed each failure mode. This direct acknowledgment of prior failures — rather than ignoring them — was the persuasive element that secured Operations sponsorship.

---

## 8. Implementation Roadmap

```
IMPLEMENTATION PHASES — 30 MONTHS
==================================

  Phase 0: Foundation (Months 1–3)
  ┌──────────────────────────────────────────────────┐
  │ - Union consultation across 9 unionized plants   │
  │ - OT security architecture review and approval   │
  │ - Equipment ontology design (47 equipment types) │
  │ - Azure IoT Hub + Data Lake provisioning         │
  │ - Edge gateway vendor selection and procurement  │
  └──────────────────────────────────────────────────┘
                        │
  Phase 1: Pilot (Months 4–9)
  ┌──────────────────────────────────────────────────┐
  │ - Deploy at 2 pilot plants (Plants 3 and 8)      │
  │ - Instrument 40% of critical equipment           │
  │ - Train initial anomaly detection models         │
  │ - Technician mobile app beta                     │
  │ - Validate data diode architecture               │
  └──────────────────────────────────────────────────┘
                        │
  Phase 2: Expansion (Months 10–21)
  ┌──────────────────────────────────────────────────┐
  │ - Roll out to 10 additional plants               │
  │ - Full equipment instrumentation                 │
  │ - Computer vision deployment (weld cells)        │
  │ - SAP PM integration for work order auto-gen     │
  │ - Cross-plant benchmarking dashboard live        │
  └──────────────────────────────────────────────────┘
                        │
  Phase 3: Optimize (Months 22–30)
  ┌──────────────────────────────────────────────────┐
  │ - Remaining 3 plants (assess instrumentability)  │
  │ - Maintenance scheduling optimizer v2            │
  │ - Model retraining pipeline (automated)          │
  │ - Cross-plant knowledge sharing platform         │
  └──────────────────────────────────────────────────┘
```

Union consultation added three months to Phase 0 (originally planned as one month). This delay was the correct call — attempting to deploy without union agreement would have created labor relations risk far exceeding the cost of the delay.

---

## 9. Governance Setup

| Governance Body | Membership | Cadence | Authority |
| --- | --- | --- | --- |
| Program Steering Committee | CFO, CTO, COO, VP Operations | Monthly | Budget approval, risk escalation |
| OT Security Review Board | CISO, OT Security Lead, Plant Engineering Leads | Bi-weekly (Phase 0–1), Monthly thereafter | OT architecture approval |
| Union Liaison Committee | HR VP, 3 Shop Steward Representatives, Program Manager | Monthly | Consultation compliance |
| Plant Deployment Readiness Gate | Plant Manager, OT Team Lead, EA Lead | Per-plant | Go/no-go for each plant deployment |
| ML Model Governance | Data Science Lead, Quality Engineering | Monthly | Model performance review, retraining decisions |

!!! warning "OT Security Was the Critical Path"
    The OT Security Review Board became the longest critical path item in Phase 0. The board required formal penetration testing of the data diode configuration before approving any live connectivity. Procuring the penetration testing firm, executing the test, remediating one finding (a configuration gap in the edge gateway firewall rules), and obtaining sign-off took 11 weeks. Future programs should budget 12–16 weeks for OT security review.

**Risk register highlights:**

| Risk | Likelihood | Impact | Mitigation |
| --- | --- | --- | --- |
| Equipment too old to instrument | Medium | High | Phase 3 assessment gate to evaluate feasibility |
| Data quality insufficient for ML | High | High | Data quality scoring before model training begins |
| Union resistance | Medium | Critical | Dedicated consultation process; no monitoring without agreement |
| OT network connectivity | High | High | Hardware data diode architecture |
| Sensor failure rates | Low | Medium | Redundant sensor placement on critical equipment |

---

## 10. Realized Business Value

!!! success "What Was Achieved"
    - Unplanned downtime reduced from **8.0% to 6.1%** (target: 4.0%)
    - **$42M in documented downtime cost avoidance** over the first 24 months post-deployment
    - **23 delivery penalty events avoided** in the deployment year
    - Reactive maintenance labor premium reduced by $11M
    - Cross-plant benchmarking identified Plant 4 as best-in-class; three practices adopted by other plants

!!! failure "Where Targets Were Missed — and Why"

    **Target: 8% → 4% downtime. Actual: 8% → 6.1%**

    Two specific causes explain 100% of the gap:

    **Cause 1: Two plants (Plants 2 and 11) could not be instrumented.**
    Plants 2 and 11 contain equipment manufactured between 1987 and 1994. The PLCs on this equipment do not expose OPC-UA interfaces — they use proprietary serial protocols that the edge gateway cannot read without custom protocol translators that would have cost $1.8M and added 14 months. The program steering committee made a correct decision to defer these plants to a future capital refresh cycle rather than extend the program budget. These two plants account for 14% of total production capacity and their downtime rate remains at 8%.

    **Cause 2: Data quality in four plants was insufficient for model training.**
    Plants 5, 6, 9, and 13 had SCADA historians that had been reconfigured multiple times without consistent tag naming. The data quality score (a metric developed during Phase 0) came back at 38–51% on a scale where 75% was the minimum for reliable ML training. Additional data cleansing was performed, but the resulting models for these plants had 40% higher false positive rates than the pilot plants. High false positive rates led to alert fatigue; technicians in these plants dismissed alerts at a rate of 67% vs. 12% in the pilot plants.

| Plant Group | Downtime Before | Downtime After | Notes |
| --- | --- | --- | --- |
| Pilot plants (2) | 8.1% | 3.8% | Exceeded target |
| Good data plants (7) | 7.9% | 4.9% | Met target |
| Poor data quality plants (4) | 8.2% | 7.1% | Partial improvement |
| Non-instrumented plants (2) | 8.0% | 8.0% | No change |
| **All plants combined** | **8.0%** | **6.1%** | **Missed target** |

---

## 11. Lessons Learned

### Lesson 1: OT/IT Security Is an Architecture Constraint, Not a Project Risk

The air-gap requirement was known from day one but the EA team initially treated it as a risk to be mitigated rather than a first-class architecture constraint. Framing it correctly from the start — designing the data diode approach before any other architecture decision — would have saved four weeks of rework when the OT Security Review Board rejected the initial connectivity proposal. In future industrial IoT programs: start with OT security architecture, not data architecture.

### Lesson 2: Union Relations Cannot Be Compressed

The initial plan allocated one month for union consultation. The actual requirement was three months of structured dialogue, documentation, and formal agreement review. The shop stewards' concerns were legitimate and substantive — the collective bargaining language about monitoring technology was written in the 1990s and required careful interpretation. Attempting to compress this process would have triggered a formal labor grievance and potentially halted the entire program. Industrial EA programs must budget for union consultation as a non-negotiable timeline item.

### Lesson 3: Data Quality Must Be Assessed Before Architecture Is Designed

The EA team assessed three plants during the opportunity identification phase. These three plants happened to have relatively good data quality. The four plants with poor data quality were only assessed during Phase 1 deployment, by which point the architecture and ML approach were already locked. A systematic data quality assessment of all 15 plants during Phase 0 would have allowed the team to design different approaches for poor-quality plants — or to set realistic expectations with the steering committee earlier.

### Lesson 4: Per-Equipment-Type ML Models Are Correct but Operationally Demanding

The decision to train separate models for each of the 47 equipment types was the right technical choice — a single model would have had unacceptable accuracy. However, 47 models require 47 retraining pipelines, 47 performance monitoring dashboards, and 47 sets of feature engineering logic. The MLOps overhead was underestimated by approximately $0.6M. Future programs should explicitly budget MLOps infrastructure as a first-class cost category, not treat it as part of "platform operations."

### Lesson 5: Human-in-the-Loop Is Not a Compromise — It Is a Feature

The decision to require technician review before auto-generating a work order was questioned mid-program by the Operations VP, who wanted full automation to reduce labor cost. The team pushed back: in the pilot plants, technician review caught 8% of alerts as false positives that would have triggered unnecessary maintenance work. More importantly, the review process built technician trust in the system. By month 12, technicians at pilot plants were proactively checking the dashboard before starting shifts — behavior that would not have emerged if the system had bypassed them. Automation can be increased once trust is established; you cannot rebuild trust once it is broken.

---

## 12. Key Takeaways for Enterprise Architects

!!! tip "For Architects Designing Industrial AI Programs"

**1. OT/IT convergence is an architecture problem before it is a data problem.**
The industrial IoT data you want lives in the OT network. Getting it to the IT network — securely, reliably, and with organizational buy-in from OT teams who have different priorities than IT teams — is the hardest part of the program. Solve this first.

**2. Equipment heterogeneity is the norm in industrial environments.**
47 equipment brands is not unusual for a manufacturer of this scale. Design your data collection and normalization layer to handle this heterogeneity explicitly. A common equipment ontology is a prerequisite, not an afterthought.

**3. Quantify the data quality problem before committing to an ML target.**
Data quality in operational technology environments is frequently poor in ways that are not visible until you try to train models. Build a formal data quality assessment into Phase 0 and make target commitments conditional on assessed data quality.

**4. The organizational constraints (union, OT security, plant autonomy) are not obstacles to the program — they are the program.**
The technical work in this case study was the easier half. The union consultation, OT security architecture, and 15 separate plant readiness processes each required more time and stakeholder skill than any of the ML engineering work. Enterprise architects who focus on the technology and treat governance as overhead will fail in industrial AI programs.

**5. Set honest targets and explain partial misses transparently.**
The program missed its headline target. The EA team documented why — in detail, with plant-level data — and presented that analysis to the steering committee at the 24-month mark without minimizing it. This transparency maintained executive credibility for the next phase of the program, which has since been approved with a focus on the four data-quality plants.

**6. Payback period math should be conservative.**
The 18-month payback was calculated on 8% → 4% downtime improvement. Actual payback, given the 6.1% result, is approximately 26 months. Both are acceptable business cases. The lesson: build downside scenarios into the investment model and present them. Executives who are surprised by a partial miss are more damaging than a well-understood partial miss from the start.
