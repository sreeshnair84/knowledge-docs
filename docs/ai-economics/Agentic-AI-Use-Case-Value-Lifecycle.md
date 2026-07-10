---
title: "A Worked Use Case: End-to-End Value Realization"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Agentic-AI-Use-Case-Value-Lifecycle.pdf"
doc_type: guide
tags: ["ai-economics", "enterprise-ai"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

###### **AGENTIC AI VALUE LIFECYCLE** 

# **A Worked Use Case: End-to-End Value Realization** 

Property & Casualty Claims — From Opportunity Identification to Realized, Measured Value 

##### **Companion document to: "AI Value Creators for Agentic AI and Beyond"** 

This document walks a single, realistic agentic AI use case through the complete enterprise value lifecycle — from baseline diagnosis through business case, pilot, scale, and measured value realization — showing exactly how the dollars are calculated at each stage, not just the end-state ROI headline. 

**Methodology note:** figures are an illustrative composite model for a mid-size national P&C carrier (~480,000 claims/year), built from publicly reported industry benchmark ranges (claims automation cost reduction, cycle-time, and leakage studies from McKinsey, Deloitte, Gartner, and carrier investor disclosures). It is not a specific company's actual financials. Use the methodology to replace every input with your own organization's baseline data. 

July 2026 

## **1. Executive Summary** 

A national P&C carrier deploys a multi-agent claims system — FNOL intake, coverage verification, damage estimation, fraud screening, and settlement recommendation agents, orchestrated with human-in-the-loop checkpoints — across its auto and property claims lines. The program is scoped, funded, and measured using the same value lifecycle every AI investment in this report should follow: **Discover** → **Business Case** → **Pilot & Build** → **Scale** → **Sustain & Optimize** → **Measure & Reinvest.** 

The value is not one number — it is a bridge of three distinct, separately-verifiable value streams (efficiency, loss-cost leakage, and retention), realized against a ramp schedule that mirrors how the capability is actually rolled out claim-line by claim-line, region by region. Section 6 shows the full calculation; Section 8 shows the year-by-year financial model; Section 9 stress-tests it. 

## **2. Use Case Overview** 

**ClaimsPilot:** an orchestrated agent system spanning First Notice of Loss (FNOL) intake through settlement recommendation, for auto physical damage and residential property claims, with liability/bodily injury claims receiving agent-assisted research and drafting only (no autonomous settlement authority). 

### **In Scope / Out of Scope** 

|**In scope**|**Out of scope (Phase 1)**|
|---|---|
|Auto physical damage & auto glass claims|Commercial lines claims|
|Residential property (water, wind, fire) claims|Catastrophe / CAT-event surge claims|
|Coverage verification & policy interpretation|Litigated / attorney-represented claims|
|Damage estimation (agent-drafted, human-approved above<br>$5K)|Total-loss valuation disputes|
|Fraud / SIU referral scoring|Reinsurance treaty claims|
|Settlement recommendation & payment initiation (STP tier<br>only)|Bodily injury settlement authority|

### **Claim Mix (Baseline)** 

|**Claim type**|**% of volume**|**Complexity**|**Phase 1 treatment**|
|---|---|---|---|
|Auto physical damage / glass|65%|Low–medium|STP + agent-augmented|
|Property (water, wind, fire)|20%|Medium|Agent-augmented|
|Liability / bodily injury|15%|High|Agent-assisted (human-led)|

## **3. End-to-End Value Lifecycle** 

Every stage exists to answer one question before money or scope moves forward: is there more value to capture than it costs to capture it, and can we prove it before we scale it? 

#### **Stage 1 — Discover · Weeks 1–8** 

Baseline the current-state value stream: cost per claim, cycle time, leakage rate, CSAT, adjuster capacity, by claim type and region. Build the AI Opportunity Matrix (Section 5 of the companion Deliverables Pack) to rank sub-processes by value potential x feasibility. 

##### **GATE CRITERIA** 

Gate: baseline metrics signed off by Finance and Claims Ops; top 3 opportunities selected. 

#### **Stage 2 — Business Case & Design · Weeks 6–14 (overlaps Discover)** 

Build the value bridge and 3-year financial model (Section 6–8 below). Define target architecture (orchestrator + specialist agents + human-in-loop console). Define STP eligibility rules and confidence thresholds with Legal, Compliance, and the Model Risk function. 

##### **GATE CRITERIA** 

Gate: Investment Committee approves Year 1 funding against a defined ramp and kill criteria. 

#### **Stage 3 — Pilot & Build · Months 3–6** 

Build the orchestration layer and the two highest-feasibility agents (FNOL triage, auto glass/small-PD settlement). Launch in 2 regions on auto glass and small physical-damage claims only, with 100% human audit of agent decisions for the first 30 days, stepping down to statistical sampling. 

##### **GATE CRITERIA** 

Gate: STP rate, accuracy, and override rate hit pilot thresholds (see Section 7) before wider release. 

#### **Stage 4 — Scale · Months 6–24** 

Extend to property claims and additional regions (Month 6–15), then national auto and liability augmentation (Month 15–24). Each wave repeats the pilot gate at smaller scale before full release. 

##### **GATE CRITERIA** 

Gate: unit economics (Section 10) hold or improve at each wave; no adverse regulatory or fair-claims-handling findings. 

#### **Stage 5 — Sustain & Optimize · Month 24+** 

Continuous learning loop: settlement outcomes, litigation results, and SIU findings feed back into agent training data and fraud pattern libraries (see Enterprise Cognitive Architecture, Deliverables Pack Section 6). Governance council reviews model drift and override-rate trends quarterly. 

##### **GATE CRITERIA** 

Gate: ongoing — value scorecard (Section 9, Deliverables Pack) reviewed quarterly by the Claims AI CoE. 

#### **Stage 6 — Measure & Reinvest · Ongoing, quarterly** 

Actual realized value (not projected) is measured against the baseline using the same formulas from Section 6, and the delta between plan and actual determines the next wave's funding. 

##### **GATE CRITERIA** 

Gate: realized value within 15% of plan to maintain funding pace; below that triggers a re-baseline. 

## **4. Architecture Snapshot** 

Full reference architecture is in the companion Deliverables Pack (Sections 5–6). In brief: a claims orchestrator agent routes each FNOL to specialist agents — Coverage, Estimation, Fraud/SIU, and Settlement — which call existing systems of record (policy admin, weather/telematics data, repair-cost estimators, sanctions screening, payment rails) as tools. A human-in-loop console handles every claim the confidence router does not clear for straight-through processing, and every action is logged to an immutable audit trail for regulatory examination. 

##### **WHY THIS MATTERS FOR THE VALUE CALCULATION** 

The architecture determines which claims can be STP (cheapest), which are agent-augmented (medium cost reduction), and which remain human-led (smallest reduction). That mix — not model accuracy in isolation — is what drives the blended cost-per-claim figure in Section 6. 

## **5. Baseline vs. Target State** 

_Figure 1. Core value-lever metrics, today vs. steady-state target (Year 3)._ 

|**Metric**|**Baseline (today)**|**Target (Yr 3 steady state)**|**Change**|
|---|---|---|---|
|Annual claims volume|480,000|480,000|held flat for<br>comparison|
|Straight-through processing (STP) rate|8%|42%|+34 pts|
|Agent-augmented rate|0%|40%|new tier|
|Human-led rate|92%|18%|-74 pts|
|Avg. cost per claim (LAE)|$625|$431|-31%|
|Avg. cycle time, FNOL→settlement|13.4 days|8.3 days|-38%|
|Leakage (% of indemnity paid)|4.2%|2.6%|-38% relative|
|Claims CSAT|71%|79%|+8 pts|
|Adjuster FTE (attrition-managed)|1,100|830|-25%, no layoffs|

## **6. Value Calculation Methodology** 

Three independent value streams are calculated separately, using different data sources, so each can be audited on its own terms rather than blended into one unverifiable number. 

### **6.1 Loss Adjustment Expense (LAE) — efficiency value** 

##### **FORMULA** 

− (Baseline cost/claim Target cost/claim) × Annual claim volume − = ($625 $431) × 480,000 = **$93,120,000 / year** 

Target cost/claim is itself a weighted blend: STP claims cost roughly $8–15 fully loaded (compute, orchestration, payment processing); agent-augmented claims cost about 45% of a fully human-handled claim; human-led complex claims see only a modest ~12% reduction from agent-assisted drafting and research. Section 10 shows this blend explicitly. 

### **6.2 Leakage reduction — loss-cost value** 

##### **FORMULA** 

− (Baseline leakage % Target leakage %) × Total annual indemnity paid − = (4.2% 2.6%) × $1.92B = **$30,720,000 / year** 

Leakage — overpayment from missed coverage exclusions, inconsistent reserving, and undetected fraud — is measured via periodic claims audits (a standard carrier practice) both before and after deployment. Agentic consistency checks and fraud-pattern scoring are the primary drivers of the reduction; this line should be the most defensible in front of an actuarial audience because it ties directly to paid-loss data. 

### **6.3 Retention value — margin-adjusted, lower-confidence** 

##### **FORMULA** 

Claimant households × churn-reduction (pts) × avg. premium × underwriting margin contribution = 350,000 × 2.5% × $1,450 × 25% 

= **$3,171,875 / year** 

This is the softest line in the model. It assumes faster, more transparent claims handling measurably reduces non-renewal among claimants (a well-documented industry pattern — claims are widely cited as the "moment of truth" for retention) and applies a conservative 25% margin-contribution haircut to the retained premium, rather than counting the full premium as value. **Recommendation: track this quarter-over-quarter against an actual retention cohort rather than relying on the estimate past Year 1.** 

### **6.4 Value Bridge** 

_Figure 2. Steady-state annual value by driver._ 

## **7. Pilot Success Thresholds (Gate to Scale)** 

|**Metric**|**Pilot threshold**|**Rationale**|
|---|---|---|
|STP accuracy (claims closed with no human<br>touch)|≥97% error-free on audit sample|below this, cost of rework exceeds<br>savings|
|Human override rate|< 12% of augmented-tier claims|high override signals the agent isn't<br>trusted or isn't ready|
|Cycle time (pilot cohort)|≥30% reduction vs. baseline|must show a step-change, not marginal<br>gain|
|Fraud/SIU referral precision|≥45% hit rate (vs. 34% baseline)|false positives burn adjuster trust and<br>time|
|Complaint / regulatory inquiry rate|no increase vs. baseline|hard stop if this moves the wrong way|

## **8. Three-Year Financial Model** 

_Figure 3. Value realized vs. cost, by year, with cumulative net value._ 

|**Year**|**Ramp**|**Gross value**|**Run cost**|**One-time cost**|**Net value**|**Cumulative net**|
|---|---|---|---|---|---|---|
|Year 1|20%|$25.4M|$1.5M|$10.3M|$13.6M|$13.6M|
|Year 2|65%|$82.6M|$4.9M|$2.1M|$75.5M|$89.1M|
|Year 3|100%|$127.0M|$7.6M|—|$119.4M|$208.5M|

### **8.1 Cost Basis** 

|**Cost item**|**Type**|**Amount**|
|---|---|---|
|Agent orchestration platform & integration build|One-time (Yr 1)|$8.5M|
|Change management & adjuster training|One-time (Yr 1)|$1.8M|
|Scale-out build (property line, new regions)|One-time (Yr 2)|$2.1M|
|Inference, orchestration compute & platform run cost|Recurring (steady state)|$6.5M / yr|
|Human-in-loop QA & decision auditing|Recurring (steady state)|$1.1M / yr|

### **8.2 Returns Summary** 

|**3-year**<br>**cumulative**<br>**net value**<br>$209M|**3-year ROI**<br>**multiple**<br>7.9x|**NPV @ 10%**<br>**discount**<br>$164M|**Payback**<br>**(pilot cohort**<br>**go-live)**<br>~5 months|
|---|---|---|---|

Payback is calculated on the pilot cohort specifically (auto glass + small physical-damage claims, the fastest-automating slice), not the whole portfolio: $10.3M in Year-1 one-time investment is offset by roughly $1.99M/month of net operating value once the pilot is live, for a payback of about 5 months from go-live — materially faster than the 12-month mark often assumed for enterprise AI initiatives, because the pilot deliberately targets the highest-feasibility, highest-volume slice first (see the Opportunity Matrix, Deliverables Pack Section 5). 

## **9. Sensitivity: Bear / Base / Bull** 

The single biggest driver of variance is automation depth reached at steady state (STP + augmented mix), not the unit-cost assumptions per tier. The table below flexes total steady-state value while holding run costs roughly fixed (governance and platform costs don't scale down much even if adoption is slower). 

|**Scenario**|**Steady-state annual value**|**3-yr cumulative net**|**3-yr ROI**|**Driver**|
|---|---|---|---|---|
|Bear case|$76M|$115M|4.3x|STP stalls at ~25%; adjuster<br>adoption resistance|
|Base case|$127M|$209M|7.9x|plan-of-record assumptions (this<br>document)|
|Bull case|$171M|$291M|11.0x|STP extends to simple liability<br>claims by Yr 3|

##### **WHY BEAR CASE STILL RETURNS 4.3x** 

Even at 60% of planned value capture, the ROI stays strongly positive because most of the cost base is one-time build cost incurred regardless of adoption depth. The real risk in agentic claims programs is rarely negative ROI — it's slower-than-planned ramp delaying when the value shows up, which matters for cash flow and executive patience, not for whether the investment eventually pays off. 

## **10. Unit Economics Behind the Blend** 

|**Handling tier**|**% of claims (target)**|**Fully loaded cost/claim**|**vs. baseline human**<br>**cost**|
|---|---|---|---|
|Straight-through (STP)|42%|$8 – $15|-98%|
|Agent-augmented (human approves)|40%|~$345 (est.)|-45%|
|Human-led, agent-assisted research|18%|~$550 (est.)|-12%|
|Blended average|100%|$431|-31%|

Marginal cost of one additional agent-handled claim: **~$4.10** (inference + orchestration compute only, at scale). Marginal cost of one additional human-handled claim: **~$580** (loaded adjuster time). This ~140x marginal-cost gap is why STP-eligibility expansion is the highest-leverage lever in the entire model — it is worth more effort to safely move one more claim type into the STP tier than to marginally improve any individual agent's accuracy on claims it already handles. 

## **11. Key Assumptions & Caveats** 

• All figures are an illustrative composite for a mid-size national P&C carrier (~480K claims/yr, ~$1.92B annual paid losses) — replace every input with your own baseline before using this for a real investment decision. 

• Claims volume and total indemnity are held flat across the 3-year model to isolate the AI-attributable value from book growth or rate changes; in practice, layer your own growth/rate assumptions on top. 

• Target cost-per-claim and cycle-time reductions are within the range reported across public claims-automation benchmark studies, not a guarantee — actual results depend heavily on core system integration complexity and data quality. 

• Retention/soft value (Section 6.3) is the least certain line and is deliberately margin-haircut; treat it as directional, not a committed number, until you have a real cohort to measure against. 

• Run costs assume a mature agent orchestration platform is already selected; a build-vs-buy platform decision materially changes the Year 1 one-time cost line. 

• The adjuster FTE reduction (1,100 → 830) is modeled as attrition-managed over 24 months, not layoffs — a workforce-reduction approach changes both the economics and the change-management risk profile substantially. 

• Regulatory posture assumed: claims decisions above defined value/complexity thresholds always retain human sign-off; state-by-state unfair claims practices regulations were not individually modeled and must be reviewed by Compliance before scaling STP eligibility. 

##### **HOW TO USE THIS DOCUMENT** 

Treat Sections 6, 8, and 10 as a spreadsheet template, not a forecast: swap in your organization's actual baseline cost/claim, volume, indemnity, and leakage figures, keep the same formulas, and you will get a defensible business case built the same way this one was — auditable line by line, with the soft-value assumptions clearly separated from the hard, actuarially-verifiable ones. 

###### **AGENTIC AI VALUE LIFECYCLE** 

# **A Worked Use Case: End-to-End Value Realization** 

Property & Casualty Claims — From Opportunity Identification to Realized, Measured Value 

##### **Companion document to: "AI Value Creators for Agentic AI and Beyond"** 

This document walks a single, realistic agentic AI use case through the complete enterprise value lifecycle — from baseline diagnosis through business case, pilot, scale, and measured value realization — showing exactly how the dollars are calculated at each stage, not just the end-state ROI headline. 

**Methodology note:** figures are an illustrative composite model for a mid-size national P&C carrier (~480,000 claims/year), built from publicly reported industry benchmark ranges (claims automation cost reduction, cycle-time, and leakage studies from McKinsey, Deloitte, Gartner, and carrier investor disclosures). It is not a specific company's actual financials. Use the methodology to replace every input with your own organization's baseline data. 

July 2026 

## **1. Executive Summary** 

A national P&C carrier deploys a multi-agent claims system — FNOL intake, coverage verification, damage estimation, fraud screening, and settlement recommendation agents, orchestrated with human-in-the-loop checkpoints — across its auto and property claims lines. The program is scoped, funded, and measured using the same value lifecycle every AI investment in this report should follow: **Discover** → **Business Case** → **Pilot & Build** → **Scale** → **Sustain & Optimize** → **Measure & Reinvest.** 

The value is not one number — it is a bridge of three distinct, separately-verifiable value streams (efficiency, loss-cost leakage, and retention), realized against a ramp schedule that mirrors how the capability is actually rolled out claim-line by claim-line, region by region. Section 6 shows the full calculation; Section 8 shows the year-by-year financial model; Section 9 stress-tests it. 

## **2. Use Case Overview** 

**ClaimsPilot:** an orchestrated agent system spanning First Notice of Loss (FNOL) intake through settlement recommendation, for auto physical damage and residential property claims, with liability/bodily injury claims receiving agent-assisted research and drafting only (no autonomous settlement authority). 

### **In Scope / Out of Scope** 

|**In scope**|**Out of scope (Phase 1)**|
|---|---|
|Auto physical damage & auto glass claims|Commercial lines claims|
|Residential property (water, wind, fire) claims|Catastrophe / CAT-event surge claims|
|Coverage verification & policy interpretation|Litigated / attorney-represented claims|
|Damage estimation (agent-drafted, human-approved above<br>$5K)|Total-loss valuation disputes|
|Fraud / SIU referral scoring|Reinsurance treaty claims|
|Settlement recommendation & payment initiation (STP tier<br>only)|Bodily injury settlement authority|

### **Claim Mix (Baseline)** 

|**Claim type**|**% of volume**|**Complexity**|**Phase 1 treatment**|
|---|---|---|---|
|Auto physical damage / glass|65%|Low–medium|STP + agent-augmented|
|Property (water, wind, fire)|20%|Medium|Agent-augmented|
|Liability / bodily injury|15%|High|Agent-assisted (human-led)|

Page 1 of 10 

## **3. End-to-End Value Lifecycle** 

Every stage exists to answer one question before money or scope moves forward: is there more value to capture than it costs to capture it, and can we prove it before we scale it? 

#### **Stage 1 — Discover · Weeks 1–8** 

Baseline the current-state value stream: cost per claim, cycle time, leakage rate, CSAT, adjuster capacity, by claim type and region. Build the AI Opportunity Matrix (Section 5 of the companion Deliverables Pack) to rank sub-processes by value potential x feasibility. 

##### **GATE CRITERIA** 

Gate: baseline metrics signed off by Finance and Claims Ops; top 3 opportunities selected. 

#### **Stage 2 — Business Case & Design · Weeks 6–14 (overlaps Discover)** 

Build the value bridge and 3-year financial model (Section 6–8 below). Define target architecture (orchestrator + specialist agents + human-in-loop console). Define STP eligibility rules and confidence thresholds with Legal, Compliance, and the Model Risk function. 

##### **GATE CRITERIA** 

Gate: Investment Committee approves Year 1 funding against a defined ramp and kill criteria. 

#### **Stage 3 — Pilot & Build · Months 3–6** 

Build the orchestration layer and the two highest-feasibility agents (FNOL triage, auto glass/small-PD settlement). Launch in 2 regions on auto glass and small physical-damage claims only, with 100% human audit of agent decisions for the first 30 days, stepping down to statistical sampling. 

##### **GATE CRITERIA** 

Gate: STP rate, accuracy, and override rate hit pilot thresholds (see Section 7) before wider release. 

#### **Stage 4 — Scale · Months 6–24** 

Extend to property claims and additional regions (Month 6–15), then national auto and liability augmentation (Month 15–24). Each wave repeats the pilot gate at smaller scale before full release. 

##### **GATE CRITERIA** 

Gate: unit economics (Section 10) hold or improve at each wave; no adverse regulatory or fair-claims-handling findings. 

Page 2 of 10 

#### **Stage 5 — Sustain & Optimize · Month 24+** 

Continuous learning loop: settlement outcomes, litigation results, and SIU findings feed back into agent training data and fraud pattern libraries (see Enterprise Cognitive Architecture, Deliverables Pack Section 6). Governance council reviews model drift and override-rate trends quarterly. 

##### **GATE CRITERIA** 

Gate: ongoing — value scorecard (Section 9, Deliverables Pack) reviewed quarterly by the Claims AI CoE. 

#### **Stage 6 — Measure & Reinvest · Ongoing, quarterly** 

Actual realized value (not projected) is measured against the baseline using the same formulas from Section 6, and the delta between plan and actual determines the next wave's funding. 

##### **GATE CRITERIA** 

Gate: realized value within 15% of plan to maintain funding pace; below that triggers a re-baseline. 

Page 3 of 10 

## **4. Architecture Snapshot** 

Full reference architecture is in the companion Deliverables Pack (Sections 5–6). In brief: a claims orchestrator agent routes each FNOL to specialist agents — Coverage, Estimation, Fraud/SIU, and Settlement — which call existing systems of record (policy admin, weather/telematics data, repair-cost estimators, sanctions screening, payment rails) as tools. A human-in-loop console handles every claim the confidence router does not clear for straight-through processing, and every action is logged to an immutable audit trail for regulatory examination. 

##### **WHY THIS MATTERS FOR THE VALUE CALCULATION** 

The architecture determines which claims can be STP (cheapest), which are agent-augmented (medium cost reduction), and which remain human-led (smallest reduction). That mix — not model accuracy in isolation — is what drives the blended cost-per-claim figure in Section 6. 

## **5. Baseline vs. Target State** 

_Figure 1. Core value-lever metrics, today vs. steady-state target (Year 3)._ 

|**Metric**|**Baseline (today)**|**Target (Yr 3 steady state)**|**Change**|
|---|---|---|---|
|Annual claims volume|480,000|480,000|held flat for<br>comparison|
|Straight-through processing (STP) rate|8%|42%|+34 pts|
|Agent-augmented rate|0%|40%|new tier|
|Human-led rate|92%|18%|-74 pts|
|Avg. cost per claim (LAE)|$625|$431|-31%|
|Avg. cycle time, FNOL→settlement|13.4 days|8.3 days|-38%|
|Leakage (% of indemnity paid)|4.2%|2.6%|-38% relative|
|Claims CSAT|71%|79%|+8 pts|
|Adjuster FTE (attrition-managed)|1,100|830|-25%, no layoffs|

Page 4 of 10 

## **6. Value Calculation Methodology** 

Three independent value streams are calculated separately, using different data sources, so each can be audited on its own terms rather than blended into one unverifiable number. 

### **6.1 Loss Adjustment Expense (LAE) — efficiency value** 

##### **FORMULA** 

− (Baseline cost/claim Target cost/claim) × Annual claim volume − = ($625 $431) × 480,000 = **$93,120,000 / year** 

Target cost/claim is itself a weighted blend: STP claims cost roughly $8–15 fully loaded (compute, orchestration, payment processing); agent-augmented claims cost about 45% of a fully human-handled claim; human-led complex claims see only a modest ~12% reduction from agent-assisted drafting and research. Section 10 shows this blend explicitly. 

### **6.2 Leakage reduction — loss-cost value** 

##### **FORMULA** 

− (Baseline leakage % Target leakage %) × Total annual indemnity paid − = (4.2% 2.6%) × $1.92B = **$30,720,000 / year** 

Leakage — overpayment from missed coverage exclusions, inconsistent reserving, and undetected fraud — is measured via periodic claims audits (a standard carrier practice) both before and after deployment. Agentic consistency checks and fraud-pattern scoring are the primary drivers of the reduction; this line should be the most defensible in front of an actuarial audience because it ties directly to paid-loss data. 

### **6.3 Retention value — margin-adjusted, lower-confidence** 

##### **FORMULA** 

Claimant households × churn-reduction (pts) × avg. premium × underwriting margin contribution = 350,000 × 2.5% × $1,450 × 25% = **$3,171,875 / year** 

This is the softest line in the model. It assumes faster, more transparent claims handling measurably reduces non-renewal among claimants (a well-documented industry pattern — claims are widely cited as the "moment of truth" for retention) and applies a conservative 25% margin-contribution haircut to the retained premium, rather than counting the full premium as value. **Recommendation: track this quarter-over-quarter against an actual retention cohort rather than relying on the estimate past Year 1.** 

### **6.4 Value Bridge** 

Page 5 of 10 

_Figure 2. Steady-state annual value by driver._ 

Page 6 of 10 

## **7. Pilot Success Thresholds (Gate to Scale)** 

|**Metric**|**Pilot threshold**|**Rationale**|
|---|---|---|
|STP accuracy (claims closed with no human<br>touch)|≥97% error-free on audit sample|below this, cost of rework exceeds<br>savings|
|Human override rate|< 12% of augmented-tier claims|high override signals the agent isn't<br>trusted or isn't ready|
|Cycle time (pilot cohort)|≥30% reduction vs. baseline|must show a step-change, not marginal<br>gain|
|Fraud/SIU referral precision|≥45% hit rate (vs. 34% baseline)|false positives burn adjuster trust and<br>time|
|Complaint / regulatory inquiry rate|no increase vs. baseline|hard stop if this moves the wrong way|

## **8. Three-Year Financial Model** 

_Figure 3. Value realized vs. cost, by year, with cumulative net value._ 

|**Year**|**Ramp**|**Gross value**|**Run cost**|**One-time cost**|**Net value**|**Cumulative net**|
|---|---|---|---|---|---|---|
|Year 1|20%|$25.4M|$1.5M|$10.3M|$13.6M|$13.6M|
|Year 2|65%|$82.6M|$4.9M|$2.1M|$75.5M|$89.1M|
|Year 3|100%|$127.0M|$7.6M|—|$119.4M|$208.5M|

### **8.1 Cost Basis** 

Page 7 of 10 

|**Cost item**|**Type**|**Amount**|
|---|---|---|
|Agent orchestration platform & integration build|One-time (Yr 1)|$8.5M|
|Change management & adjuster training|One-time (Yr 1)|$1.8M|
|Scale-out build (property line, new regions)|One-time (Yr 2)|$2.1M|
|Inference, orchestration compute & platform run cost|Recurring (steady state)|$6.5M / yr|
|Human-in-loop QA & decision auditing|Recurring (steady state)|$1.1M / yr|

### **8.2 Returns Summary** 

|**3-year**<br>**cumulative**<br>**net value**<br>$209M|**3-year ROI**<br>**multiple**<br>7.9x|**NPV @ 10%**<br>**discount**<br>$164M|**Payback**<br>**(pilot cohort**<br>**go-live)**<br>~5 months|
|---|---|---|---|

Payback is calculated on the pilot cohort specifically (auto glass + small physical-damage claims, the fastest-automating slice), not the whole portfolio: $10.3M in Year-1 one-time investment is offset by roughly $1.99M/month of net operating value once the pilot is live, for a payback of about 5 months from go-live — materially faster than the 12-month mark often assumed for enterprise AI initiatives, because the pilot deliberately targets the highest-feasibility, highest-volume slice first (see the Opportunity Matrix, Deliverables Pack Section 5). 

Page 8 of 10 

## **9. Sensitivity: Bear / Base / Bull** 

The single biggest driver of variance is automation depth reached at steady state (STP + augmented mix), not the unit-cost assumptions per tier. The table below flexes total steady-state value while holding run costs roughly fixed (governance and platform costs don't scale down much even if adoption is slower). 

|**Scenario**|**Steady-state annual value**|**3-yr cumulative net**|**3-yr ROI**|**Driver**|
|---|---|---|---|---|
|Bear case|$76M|$115M|4.3x|STP stalls at ~25%; adjuster<br>adoption resistance|
|Base case|$127M|$209M|7.9x|plan-of-record assumptions (this<br>document)|
|Bull case|$171M|$291M|11.0x|STP extends to simple liability<br>claims by Yr 3|

##### **WHY BEAR CASE STILL RETURNS 4.3x** 

Even at 60% of planned value capture, the ROI stays strongly positive because most of the cost base is one-time build cost incurred regardless of adoption depth. The real risk in agentic claims programs is rarely negative ROI — it's slower-than-planned ramp delaying when the value shows up, which matters for cash flow and executive patience, not for whether the investment eventually pays off. 

## **10. Unit Economics Behind the Blend** 

|**Handling tier**|**% of claims (target)**|**Fully loaded cost/claim**|**vs. baseline human**<br>**cost**|
|---|---|---|---|
|Straight-through (STP)|42%|$8 – $15|-98%|
|Agent-augmented (human approves)|40%|~$345 (est.)|-45%|
|Human-led, agent-assisted research|18%|~$550 (est.)|-12%|
|Blended average|100%|$431|-31%|

Marginal cost of one additional agent-handled claim: **~$4.10** (inference + orchestration compute only, at scale). Marginal cost of one additional human-handled claim: **~$580** (loaded adjuster time). This ~140x marginal-cost gap is why STP-eligibility expansion is the highest-leverage lever in the entire model — it is worth more effort to safely move one more claim type into the STP tier than to marginally improve any individual agent's accuracy on claims it already handles. 

Page 9 of 10 

## **11. Key Assumptions & Caveats** 

• All figures are an illustrative composite for a mid-size national P&C carrier (~480K claims/yr, ~$1.92B annual paid losses) — replace every input with your own baseline before using this for a real investment decision. 

• Claims volume and total indemnity are held flat across the 3-year model to isolate the AI-attributable value from book growth or rate changes; in practice, layer your own growth/rate assumptions on top. 

• Target cost-per-claim and cycle-time reductions are within the range reported across public claims-automation benchmark studies, not a guarantee — actual results depend heavily on core system integration complexity and data quality. 

• Retention/soft value (Section 6.3) is the least certain line and is deliberately margin-haircut; treat it as directional, not a committed number, until you have a real cohort to measure against. 

• Run costs assume a mature agent orchestration platform is already selected; a build-vs-buy platform decision materially changes the Year 1 one-time cost line. 

• The adjuster FTE reduction (1,100 → 830) is modeled as attrition-managed over 24 months, not layoffs — a workforce-reduction approach changes both the economics and the change-management risk profile substantially. 

• Regulatory posture assumed: claims decisions above defined value/complexity thresholds always retain human sign-off; state-by-state unfair claims practices regulations were not individually modeled and must be reviewed by Compliance before scaling STP eligibility. 

##### **HOW TO USE THIS DOCUMENT** 

Treat Sections 6, 8, and 10 as a spreadsheet template, not a forecast: swap in your organization's actual baseline cost/claim, volume, indemnity, and leakage figures, keep the same formulas, and you will get a defensible business case built the same way this one was — auditable line by line, with the soft-value assumptions clearly separated from the hard, actuarially-verifiable ones. 

Page 10 of 10
