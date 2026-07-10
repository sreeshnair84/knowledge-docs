---
title: "Worked Example: 20 Deliverables, One Use Case"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "AI-Value-Creator-Deliverables-Pack.pdf"
doc_type: guide
tags: ["ai-economics", "enterprise-ai"]
last_reviewed: 2026-07-10
covers_version: "N/A"
last_reviewed: 2026-07-10
---

##### **AI VALUE CREATOR DELIVERABLES PACK** 

# **Worked Example: 20 Deliverables, One Use Case** 

How Each Reference Deliverable Actually Looks — Property & Casualty Claims 

#### **Companion document to: "AI Value Creators for Agentic AI and Beyond" and the Use Case Value Lifecycle report** 

The original research prompt calls for 20 consulting-grade artifacts. Rather than show each as an abstract template, this pack fills every one out for the same worked use case — the agentic claims program from the companion Value Lifecycle document — so you can see exactly what a completed version looks like in practice, and reuse the structure for your own initiatives. 

**How to use this pack:** each deliverable is self-contained. Enterprise Architecture and platform teams will use Deliverables 1, 5, 6, 7, 9 most; Finance and the Investment Committee will use 2, 8, 15, 17; the Chief AI Officer and transformation leads will use 4, 12, 14, 16, 20. 

## **Contents** 

|1. AI Value Creation Reference Model|11. AI Capability Maturity Model|
|---|---|
|2. Enterprise AI Value Map|12. AI Transformation Roadmap|
|3. AI Business Capability Map|13. Executive Decision Framework|
|4. AI Operating Model Blueprint|14. AI Organization Design Blueprint|
|5. Agentic Enterprise Reference Architecture|15. AI Portfolio Framework|
|6. AI Platform Reference Architecture|16. AI Governance Model|
|7. Enterprise Cognitive Architecture|17. AI Economics Model|
|8. AI Investment Framework|18. AI Value Scorecard|
|9. AI Opportunity Matrix|19. AI Strategy Playbook|
|10. AI Value Heatmap|20. Enterprise Architect & Chief AI Officer Playbooks|

#### **DELIVERABLE 1 · AI Value Creation Reference Model** 

_The layered model connecting raw data to enterprise outcome — used to explain to executives where value is actually created, not just where AI is deployed._ 

|**Layer**|**Claims-specific content**|**Value KPI**|
|---|---|---|
|Enterprise outcome|Combined ratio, policyholder retention, premium growth|Combined ratio (pts), NPS,<br>retained premium $|
|Value layer|Cost per claim, cycle time, leakage, CSAT|$ savings by driver (see Value<br>Bridge)|
|Orchestration layer|Confidence routing across STP / augmented / human<br>tiers|STP rate, override rate, routing<br>accuracy|
|Agent capability layer|FNOL, Coverage, Estimation, Fraud/SIU, Settlement,<br>Subrogation agents|Task success rate, agent<br>accuracy|
|Data & context layer|Policy, telematics, weather, claim history, fraud pattern<br>library|Data completeness %, context<br>reuse rate|

#### **READING THE MODEL** 

Value compounds top-down: better context data raises agent accuracy, which raises the safe STP rate, which is what actually moves cost, cycle time, and leakage — the enterprise outcome layer only moves because the layers below it do. 

#### **DELIVERABLE 2 · Enterprise AI Value Map** 

_Maps the value stream stage-by-stage against the value levers AI touches and the annual dollar impact at each stage — used to sequence investment._ 

|**Value stream stage**|**Value levers touched**|**Annual $ impact (steady state)**|
|---|---|---|
|FNOL intake|Cycle time, CSAT|included in LAE savings|
|Triage & routing|Cost/claim, cycle time|included in LAE savings|
|Coverage verification|Cost/claim, leakage (miscoverage<br>errors)|included in leakage savings|
|Damage estimation|Cost/claim, cycle time, leakage|$93M (LAE, blended)|
|Fraud / SIU screening|Leakage|$31M|
|Settlement & payment|Cost/claim, cycle time, CSAT|included in LAE + retention|
|Post-close (subrogation, audit)|Leakage (recovery)|upside not yet modeled — Phase 2|
|Customer relationship|Retention|$3.2M|

#### **DELIVERABLE 3 · AI Business Capability Map** 

_Rates each business capability in the claims function on current AI maturity and value potential — the input to the Opportunity Matrix (Deliverable 9)._ 

|**Capability**|**AI maturity today**|**Value potential**|**Priority**|
|---|---|---|---|
|Claims intake / FNOL|Piloted|High|**HIGH**|
|Coverage verification|Piloted|High|**HIGH**|
|Damage assessment (auto)|Scaling|High|**HIGH**|
|Damage assessment (property)|Piloted|Medium-High|**MED**|
|Fraud / SIU detection|Piloted|High|**HIGH**|
|Reserve setting|Ad hoc|Medium|**MED**|
|Settlement negotiation (simple)|Piloted|High|**HIGH**|
|Bodily injury negotiation|Ad hoc|Medium (high value, low feasibility)|**LOW**|
|Subrogation identification|Ad hoc|Medium|**MED**|
|Litigation support|Not started|Medium|**LOW**|
|Customer communication|Scaling|Medium|**MED**|

#### **DELIVERABLE 4 · AI Operating Model Blueprint** 

_Defines who owns what across the federated model of central Claims AI CoE + embedded human-agent operating pods._ 

|**Role**|**Reports to**|**Responsibility**|
|---|---|---|
|Chief AI Officer (program sponsor)|CEO / COO|Enterprise AI strategy, funding gates, board<br>reporting|
|Claims AI Product Owner|Chief AI Officer|Roadmap, prioritization, value tracking for the<br>claims program|
|Agent Factory Lead|Claims AI Product Owner|Builds & maintains the specialist agents, evals,<br>prompt/tooling|
|Claims AI Risk & Compliance Officer|Chief Risk Officer (dotted:<br>CAIO)|Model risk sign-off, regulatory review,<br>fair-claims-handling audits|
|Regional Claims Ops Director|Chief Claims Officer|Runs the human-agent pods; owns adoption &<br>override-rate targets|
|Agent Trainers / Eval Engineers|Agent Factory Lead|Curate training data, run evals, tune confidence<br>thresholds|
|Claims AI QA Auditors|Claims AI Risk & Compliance<br>Officer|Sample-audit STP and augmented-tier<br>decisions|

#### **DESIGN PRINCIPLE** 

The CoE builds and governs the agents; Claims Ops owns adoption and outcomes. Splitting "build" from "run" ownership is what prevents the common failure mode of a central team optimizing for agent accuracy while nobody owns whether adjusters actually trust and use the system. 

#### **DELIVERABLE 5 · Agentic Enterprise Reference Architecture** 

_Shows how claims flow through the orchestrator, specialist agents, tool calls, and the human-in-loop / audit safety net._ 

Every specialist agent is stateless with respect to authority — it drafts, scores, or recommends, but only the orchestrator's confidence router (calibrated against the thresholds in Deliverable 13) decides whether a claim proceeds straight-through, goes to a human co-signer, or escalates fully to an adjuster. 

#### **DELIVERABLE 6 · AI Platform Reference Architecture** 

_The technical stack underneath the agent architecture — what an EA or platform team actually has to build, buy, or integrate._ 

Most carriers buy the model layer and orchestration framework, and build the integration and governance layers themselves — the data layer is almost always the long pole, since claims data lakes and telematics feeds are rarely clean or unified at program start. 

#### **DELIVERABLE 7 · Enterprise Cognitive Architecture** 

_How the organization's institutional claims knowledge is captured, structured, and fed back into the agents over time._ 

|**Memory component**|**What it stores**|**Feedback loop owner**|
|---|---|---|
|Case history graph|Every claim's full lifecycle, decisions, and outcomes,<br>linked by policyholder/peril|Agent Factory Lead|
|Adjuster decision precedent KB|Senior adjuster reasoning on edge cases, captured<br>during pilot audits|Claims Ops Director|
|Fraud pattern library|Confirmed SIU findings, evolving fraud typologies by<br>region|SIU / Fraud Agent owner|
|Regulatory rule base|State-by-state unfair claims practices rules, coverage<br>interpretation precedent|Risk & Compliance Officer|
|Litigation outcome feed|Settled vs. litigated bodily-injury outcomes, used to<br>calibrate reserve accuracy|Claims AI Risk Officer|

#### **DELIVERABLE 8 · AI Investment Framework** 

_Stage-gated funding — money is released in tranches tied to evidence, not committed up front for the full 3-year program._ 

|**Gate**|**Funding released**|**Decision criteria to pass gate**|
|---|---|---|
|Discover→Business Case|~$0.3M (analysis only)|Baseline signed off; top 3 opportunities ranked|
|Business Case→Pilot|$8.5M build + $1.8M change mgmt|Investment Committee approves Year 1 case &<br>kill criteria|
|Pilot→Scale|$2.1M scale-out build|Pilot thresholds met (Use Case doc, Section 7)|
|Scale→Sustain (run-rate)|$7.6M / yr recurring|Unit economics hold; no adverse regulatory<br>findings|

#### **DELIVERABLE 9 · AI Opportunity Matrix** 

_Plots every claims sub-process by value potential vs. feasibility — the direct input to sequencing (Deliverable 12)._ 

_Sequencing rule used: prioritize the top-right quadrant first regardless of theoretical value elsewhere — feasibility gaps compound, so a smaller sure win beats a larger uncertain one._ 

#### **DELIVERABLE 10 · AI Value Heatmap** 

_Cross-tabs claim type against value lever to show where the dollars concentrate — used to defend why auto glass and PD were sequenced first._ 

Bodily injury scores lowest on cost/claim and cycle-time capture (agents assist but don't settle), but highest on leakage — which is why the fraud/SIU agent is deployed across all claim types from day one, even though full automation of BI claims themselves is out of scope. 

#### **DELIVERABLE 11 · AI Capability Maturity Model** 

_Five maturity levels used consistently across every capability so progress can be tracked on a common scale._ 

|**Level**<br>**Definition**||
|---|---|
|1 — Ad hoc<br>Manual process; AI use|d informally or not at all|
|2 — Piloted<br>Agent deployed in a con|trolled pilot, human-audited at high sample rates|
|3 — Scaling<br>Agent live in production|across multiple regions/lines, sampled audit|
|4 — Optimized<br>Agent performance acti|vely tuned against a value scorecard; feedback loop live|
|5 — Autonomous<br>Agent operates within g|overned authority limits with minimal human review|
|**Capability**|**Current level**|
|Claims intake / FNOL triage|Level 3 — Scaling|
|Auto physical damage estimation|Level 3 — Scaling|
|Property damage estimation|Level 2 — Piloted|
|Fraud / SIU scoring|Level 3 — Scaling|
|Settlement recommendation (STP tier)|Level 4 — Optimized|
|Bodily injury negotiation support|Level 1 — Ad hoc|
|Subrogation identification|Level 1 — Ad hoc|

#### **DELIVERABLE 12 · AI Transformation Roadmap** 

_The 36-month phased rollout, tied to the funding gates in Deliverable 8._ 

|**Milestone**|**Target month**|**Owner**|
|---|---|---|
|Baseline signed off; business case approved|M3|Claims AI Product Owner|
|Pilot live: auto glass + small PD, 2 regions|M6|Agent Factory Lead|
|Property line added; national auto rollout begins|M15|Regional Claims Ops Directors|
|Liability augmentation live; full national scale|M24|Claims AI Product Owner|
|Continuous optimization loop fully operational|M36|Claims AI CoE|

#### **DELIVERABLE 13 · Executive Decision Framework** 

_The actual routing rules the orchestrator applies — this is what "agent confidence" cashes out to operationally._ 

|**Condition**|**Routing decision**|
|---|---|
|Claim value < $5,000 AND agent confidence > 92% AND no prior<br>fraud flag|Straight-through: auto-settle, no human touch|
|Claim value $5,000–$50,000 AND agent confidence > 80%|Agent-drafted estimate/settlement; adjuster co-signs|
|Fraud/SIU score above threshold|Route to SIU regardless of claim value|
|Bodily injury or litigation flag present|Human-led; agents provide research & drafting support<br>only|
|Agent confidence below threshold for its tier, any claim|Escalate to next tier up (never auto-approve on low<br>confidence)|

#### **DELIVERABLE 14 · AI Organization Design Blueprint** 

_How the claims workforce actually changes shape — headcount, new roles, and the reskilling path, not just net FTE change._ 

||**Today**|**Year 3 (steady state)**|
|---|---|---|
|Claims adjuster FTE|1,100|830|
|Supervisors|150|130|
|Agent Trainers / Eval Engineers (new)|0|24|
|Claims AI QA Auditors (new)|0|18|
|Complex-claims specialists (redeployed)|n/a|+90 (from simple-claims handling)|

#### **REDEPLOYMENT PATH, NOT JUST REDUCTION** 

The FTE reduction is managed entirely through attrition over 24 months (typical adjuster attrition runs 12-15%/year). Adjusters freed from simple, high-volume claims are the pipeline for the new QA auditor and complex-claims specialist roles — the reskilling path is built into the roadmap, not left to chance. 

#### **DELIVERABLE 15 · AI Portfolio Framework** 

_All active AI initiatives in the claims division, ranked and risk-rated the same way — prevents the program from being judged on one flagship use case alone._ 

|**Initiative**|**Stage**|**Est. annual value**|**Risk**|
|---|---|---|---|
|FNOL triage agent|Scaling|included in LAE savings|Low|
|Auto glass / small-PD STP agent|Optimized|~$38M (largest single contributor)|Low|
|Property estimation agent|Piloted|~$22M|Medium|
|Fraud / SIU scoring agent|Scaling|$31M|Medium|
|Subrogation identification agent|Not started|~$6M (Phase 2 estimate)|Medium|
|Customer status chat agent|Scaling|CSAT contribution, not separately<br>valued|Low|

#### **DELIVERABLE 16 · AI Governance Model** 

_Who reviews what, how often — the answer to "who would catch it if this went wrong."_ 

|**Governance layer**|**Cadence**|**Owner**|**Scope**|
|---|---|---|---|
|Model Risk Committee|Monthly|Chief Risk Officer|Model performance, drift,<br>override-rate trends|
|Claims AI Ethics Review|Quarterly|Claims AI Risk Officer|Fair-claims-handling, disparate<br>impact testing|
|Regulatory compliance review|Quarterly + ad<br>hoc|Compliance / Legal|State DOI rules, STP eligibility<br>expansion sign-off|
|Human-in-loop escalation policy|Continuous|Regional Ops Directors|Real-time override and escalation<br>handling|
|Decision audit sampling|Weekly|Claims AI QA Auditors|Statistical sample of STP &<br>augmented-tier decisions|

#### **DELIVERABLE 17 · AI Economics Model** 

_The unit economics that make the LAE savings line in the Value Lifecycle document defensible line-by-line._ 

|**Handling tier**|**% of claims**|**Fully loaded cost/claim**|**vs. baseline**|
|---|---|---|---|
|Straight-through (STP)|42%|$8 – $15|-98%|
|Agent-augmented|40%|~$345|-45%|
|Human-led, agent-assisted|18%|~$550|-12%|
|Blended average|100%|$431|-31%|

#### **MARGINAL COST** 

One additional agent-handled claim: ~$4.10. One additional human-handled claim: ~$580. This ~140x gap is the single number that most influences the business case. 

#### **DELIVERABLE 18 · AI Value Scorecard** 

_A mockup of the actual quarterly scorecard the CoE reviews — illustrative Q3 of Year 2, mid-scale._ 

|**Metric**|**Target (Q3 Yr2)**|**Actual**|**Status**|
|---|---|---|---|
|STP rate|35%|33%|**TRACKING**— 2pts behind|
|Blended cost/claim|$470|$462|**AHEAD**of plan|
|Cycle time (avg, days)|9.5|9.8|**TRACKING**|
|Leakage (% indemnity)|3.1%|3.3%|**TRACKING**|
|Claims CSAT|76%|77%|**AHEAD**of plan|
|Human override rate (augmented tier)|<12%|10.4%|**AHEAD**of plan|
|Value realized vs. plan (cumulative)|$82.6M|$79.1M|**TRACKING**— 96% of plan|

#### **DELIVERABLE 19 · AI Strategy Playbook** 

_The operating principles the claims AI program is actually run against — short enough to fit on one page and be enforced._ 

• **Augment before automate.** Every capability passes through an agent-assisted, human-approved stage before it earns STP authority — trust is earned claim-type by claim-type, not granted programmatically. 

• **Human-in-loop for adverse decisions.** Any outcome that denies, reduces, or delays payment beyond a defined threshold always retains a human decision-maker. 

• **Fail-safe to human.** Below-threshold confidence always escalates up a tier — the system never resolves uncertainty by taking more autonomous action. 

• **Measure leakage and cost together.** Cost-per-claim reduction that increases leakage is not a win; both move on the same scorecard, every quarter. 

• **Fund by wave, not by year.** Capital releases at each gate against evidence from the prior wave, not on a fixed annual budget cycle. 

• **Redeploy before you reduce.** Workforce transitions follow attrition and reskilling paths defined before the program starts, not after volume drops. 

#### **DELIVERABLE 20 · Enterprise Architect & Chief AI Officer Playbooks** 

_Two short, role-specific checklists for the two executives who most need to act on this pack._ 

### **Enterprise Architect Playbook** 

[ ] Register every agent as a first-class capability in the EA capability map — not as a feature of an existing application. 

[ ] Require every agent to declare its tool/system access list and authority limits before it enters the landing zone. 

[ ] Route all agent-to-core-system integration through the standard API/event-bus layer — no direct database writes from an agent. 

[ ] Version and test agent behavior changes the way you would a system release — including regression tests against the eval set. 

### **Chief AI Officer Playbook** 

[ ] Fund in stage-gated tranches (Deliverable 8) — never approve the full 3-year number in one sitting. 

[ ] Report the value bridge (three separate lines: efficiency, leakage, retention), not one blended ROI figure, to the board. 

[ ] Hold Model Risk and Claims Ops jointly accountable for the override-rate metric — it is the earliest warning sign of either an under-trusted or an over-trusted agent. 

[ ] Re-baseline the business case if realized value tracks below 85% of plan for two consecutive quarters, rather than letting the gap silently widen. 

#### **CLOSING NOTE** 

Every deliverable in this pack traces back to the same underlying numbers in the companion Value Lifecycle document. That traceability — not the templates themselves — is what makes a deliverables pack useful in front of Finance, Risk, and the Board. 

##### **AI VALUE CREATOR DELIVERABLES PACK** 

# **Worked Example: 20 Deliverables, One Use Case** 

How Each Reference Deliverable Actually Looks — Property & Casualty Claims 

#### **Companion document to: "AI Value Creators for Agentic AI and Beyond" and the Use Case Value Lifecycle report** 

The original research prompt calls for 20 consulting-grade artifacts. Rather than show each as an abstract template, this pack fills every one out for the same worked use case — the agentic claims program from the companion Value Lifecycle document — so you can see exactly what a completed version looks like in practice, and reuse the structure for your own initiatives. 

**How to use this pack:** each deliverable is self-contained. Enterprise Architecture and platform teams will use Deliverables 1, 5, 6, 7, 9 most; Finance and the Investment Committee will use 2, 8, 15, 17; the Chief AI Officer and transformation leads will use 4, 12, 14, 16, 20. 

## **Contents** 

|1. AI Value Creation Reference Model|11. AI Capability Maturity Model|
|---|---|
|2. Enterprise AI Value Map|12. AI Transformation Roadmap|
|3. AI Business Capability Map|13. Executive Decision Framework|
|4. AI Operating Model Blueprint|14. AI Organization Design Blueprint|
|5. Agentic Enterprise Reference Architecture|15. AI Portfolio Framework|
|6. AI Platform Reference Architecture|16. AI Governance Model|
|7. Enterprise Cognitive Architecture|17. AI Economics Model|
|8. AI Investment Framework|18. AI Value Scorecard|
|9. AI Opportunity Matrix|19. AI Strategy Playbook|
|10. AI Value Heatmap|20. Enterprise Architect & Chief AI Officer Playbooks|

Page 1 of 21 

#### **DELIVERABLE 1 · AI Value Creation Reference Model** 

_The layered model connecting raw data to enterprise outcome — used to explain to executives where value is actually created, not just where AI is deployed._ 

|**Layer**|**Claims-specific content**|**Value KPI**|
|---|---|---|
|Enterprise outcome|Combined ratio, policyholder retention, premium growth|Combined ratio (pts), NPS,<br>retained premium $|
|Value layer|Cost per claim, cycle time, leakage, CSAT|$ savings by driver (see Value<br>Bridge)|
|Orchestration layer|Confidence routing across STP / augmented / human<br>tiers|STP rate, override rate, routing<br>accuracy|
|Agent capability layer|FNOL, Coverage, Estimation, Fraud/SIU, Settlement,<br>Subrogation agents|Task success rate, agent<br>accuracy|
|Data & context layer|Policy, telematics, weather, claim history, fraud pattern<br>library|Data completeness %, context<br>reuse rate|

#### **READING THE MODEL** 

Value compounds top-down: better context data raises agent accuracy, which raises the safe STP rate, which is what actually moves cost, cycle time, and leakage — the enterprise outcome layer only moves because the layers below it do. 

Page 2 of 21 

#### **DELIVERABLE 2 · Enterprise AI Value Map** 

_Maps the value stream stage-by-stage against the value levers AI touches and the annual dollar impact at each stage — used to sequence investment._ 

|**Value stream stage**|**Value levers touched**|**Annual $ impact (steady state)**|
|---|---|---|
|FNOL intake|Cycle time, CSAT|included in LAE savings|
|Triage & routing|Cost/claim, cycle time|included in LAE savings|
|Coverage verification|Cost/claim, leakage (miscoverage<br>errors)|included in leakage savings|
|Damage estimation|Cost/claim, cycle time, leakage|$93M (LAE, blended)|
|Fraud / SIU screening|Leakage|$31M|
|Settlement & payment|Cost/claim, cycle time, CSAT|included in LAE + retention|
|Post-close (subrogation, audit)|Leakage (recovery)|upside not yet modeled — Phase 2|
|Customer relationship|Retention|$3.2M|

Page 3 of 21 

#### **DELIVERABLE 3 · AI Business Capability Map** 

_Rates each business capability in the claims function on current AI maturity and value potential — the input to the Opportunity Matrix (Deliverable 9)._ 

|**Capability**|**AI maturity today**|**Value potential**|**Priority**|
|---|---|---|---|
|Claims intake / FNOL|Piloted|High|**HIGH**|
|Coverage verification|Piloted|High|**HIGH**|
|Damage assessment (auto)|Scaling|High|**HIGH**|
|Damage assessment (property)|Piloted|Medium-High|**MED**|
|Fraud / SIU detection|Piloted|High|**HIGH**|
|Reserve setting|Ad hoc|Medium|**MED**|
|Settlement negotiation (simple)|Piloted|High|**HIGH**|
|Bodily injury negotiation|Ad hoc|Medium (high value, low feasibility)|**LOW**|
|Subrogation identification|Ad hoc|Medium|**MED**|
|Litigation support|Not started|Medium|**LOW**|
|Customer communication|Scaling|Medium|**MED**|

Page 4 of 21 

#### **DELIVERABLE 4 · AI Operating Model Blueprint** 

_Defines who owns what across the federated model of central Claims AI CoE + embedded human-agent operating pods._ 

|**Role**|**Reports to**|**Responsibility**|
|---|---|---|
|Chief AI Officer (program sponsor)|CEO / COO|Enterprise AI strategy, funding gates, board<br>reporting|
|Claims AI Product Owner|Chief AI Officer|Roadmap, prioritization, value tracking for the<br>claims program|
|Agent Factory Lead|Claims AI Product Owner|Builds & maintains the specialist agents, evals,<br>prompt/tooling|
|Claims AI Risk & Compliance Officer|Chief Risk Officer (dotted:<br>CAIO)|Model risk sign-off, regulatory review,<br>fair-claims-handling audits|
|Regional Claims Ops Director|Chief Claims Officer|Runs the human-agent pods; owns adoption &<br>override-rate targets|
|Agent Trainers / Eval Engineers|Agent Factory Lead|Curate training data, run evals, tune confidence<br>thresholds|
|Claims AI QA Auditors|Claims AI Risk & Compliance<br>Officer|Sample-audit STP and augmented-tier<br>decisions|

#### **DESIGN PRINCIPLE** 

The CoE builds and governs the agents; Claims Ops owns adoption and outcomes. Splitting "build" from "run" ownership is what prevents the common failure mode of a central team optimizing for agent accuracy while nobody owns whether adjusters actually trust and use the system. 

Page 5 of 21 

#### **DELIVERABLE 5 · Agentic Enterprise Reference Architecture** 

_Shows how claims flow through the orchestrator, specialist agents, tool calls, and the human-in-loop / audit safety net._ 

Every specialist agent is stateless with respect to authority — it drafts, scores, or recommends, but only the orchestrator's confidence router (calibrated against the thresholds in Deliverable 13) decides whether a claim proceeds straight-through, goes to a human co-signer, or escalates fully to an adjuster. 

Page 6 of 21 

#### **DELIVERABLE 6 · AI Platform Reference Architecture** 

_The technical stack underneath the agent architecture — what an EA or platform team actually has to build, buy, or integrate._ 

Most carriers buy the model layer and orchestration framework, and build the integration and governance layers themselves — the data layer is almost always the long pole, since claims data lakes and telematics feeds are rarely clean or unified at program start. 

Page 7 of 21 

#### **DELIVERABLE 7 · Enterprise Cognitive Architecture** 

_How the organization's institutional claims knowledge is captured, structured, and fed back into the agents over time._ 

|**Memory component**|**What it stores**|**Feedback loop owner**|
|---|---|---|
|Case history graph|Every claim's full lifecycle, decisions, and outcomes,<br>linked by policyholder/peril|Agent Factory Lead|
|Adjuster decision precedent KB|Senior adjuster reasoning on edge cases, captured<br>during pilot audits|Claims Ops Director|
|Fraud pattern library|Confirmed SIU findings, evolving fraud typologies by<br>region|SIU / Fraud Agent owner|
|Regulatory rule base|State-by-state unfair claims practices rules, coverage<br>interpretation precedent|Risk & Compliance Officer|
|Litigation outcome feed|Settled vs. litigated bodily-injury outcomes, used to<br>calibrate reserve accuracy|Claims AI Risk Officer|

Page 8 of 21 

#### **DELIVERABLE 8 · AI Investment Framework** 

_Stage-gated funding — money is released in tranches tied to evidence, not committed up front for the full 3-year program._ 

|**Gate**|**Funding released**|**Decision criteria to pass gate**|
|---|---|---|
|Discover→Business Case|~$0.3M (analysis only)|Baseline signed off; top 3 opportunities ranked|
|Business Case→Pilot|$8.5M build + $1.8M change mgmt|Investment Committee approves Year 1 case &<br>kill criteria|
|Pilot→Scale|$2.1M scale-out build|Pilot thresholds met (Use Case doc, Section 7)|
|Scale→Sustain (run-rate)|$7.6M / yr recurring|Unit economics hold; no adverse regulatory<br>findings|

Page 9 of 21 

#### **DELIVERABLE 9 · AI Opportunity Matrix** 

_Plots every claims sub-process by value potential vs. feasibility — the direct input to sequencing (Deliverable 12)._ 

_Sequencing rule used: prioritize the top-right quadrant first regardless of theoretical value elsewhere — feasibility gaps compound, so a smaller sure win beats a larger uncertain one._ 

Page 10 of 21 

#### **DELIVERABLE 10 · AI Value Heatmap** 

_Cross-tabs claim type against value lever to show where the dollars concentrate — used to defend why auto glass and PD were sequenced first._ 

Bodily injury scores lowest on cost/claim and cycle-time capture (agents assist but don't settle), but highest on leakage — which is why the fraud/SIU agent is deployed across all claim types from day one, even though full automation of BI claims themselves is out of scope. 

Page 11 of 21 

#### **DELIVERABLE 11 · AI Capability Maturity Model** 

_Five maturity levels used consistently across every capability so progress can be tracked on a common scale._ 

|**Level**<br>**Definition**||
|---|---|
|1 — Ad hoc<br>Manual process; AI use|d informally or not at all|
|2 — Piloted<br>Agent deployed in a con|trolled pilot, human-audited at high sample rates|
|3 — Scaling<br>Agent live in production|across multiple regions/lines, sampled audit|
|4 — Optimized<br>Agent performance acti|vely tuned against a value scorecard; feedback loop live|
|5 — Autonomous<br>Agent operates within g|overned authority limits with minimal human review|
|**Capability**|**Current level**|
|Claims intake / FNOL triage|Level 3 — Scaling|
|Auto physical damage estimation|Level 3 — Scaling|
|Property damage estimation|Level 2 — Piloted|
|Fraud / SIU scoring|Level 3 — Scaling|
|Settlement recommendation (STP tier)|Level 4 — Optimized|
|Bodily injury negotiation support|Level 1 — Ad hoc|
|Subrogation identification|Level 1 — Ad hoc|

Page 12 of 21 

#### **DELIVERABLE 12 · AI Transformation Roadmap** 

_The 36-month phased rollout, tied to the funding gates in Deliverable 8._ 

|**Milestone**|**Target month**|**Owner**|
|---|---|---|
|Baseline signed off; business case approved|M3|Claims AI Product Owner|
|Pilot live: auto glass + small PD, 2 regions|M6|Agent Factory Lead|
|Property line added; national auto rollout begins|M15|Regional Claims Ops Directors|
|Liability augmentation live; full national scale|M24|Claims AI Product Owner|
|Continuous optimization loop fully operational|M36|Claims AI CoE|

Page 13 of 21 

#### **DELIVERABLE 13 · Executive Decision Framework** 

_The actual routing rules the orchestrator applies — this is what "agent confidence" cashes out to operationally._ 

|**Condition**|**Routing decision**|
|---|---|
|Claim value < $5,000 AND agent confidence > 92% AND no prior<br>fraud flag|Straight-through: auto-settle, no human touch|
|Claim value $5,000–$50,000 AND agent confidence > 80%|Agent-drafted estimate/settlement; adjuster co-signs|
|Fraud/SIU score above threshold|Route to SIU regardless of claim value|
|Bodily injury or litigation flag present|Human-led; agents provide research & drafting support<br>only|
|Agent confidence below threshold for its tier, any claim|Escalate to next tier up (never auto-approve on low<br>confidence)|

Page 14 of 21 

#### **DELIVERABLE 14 · AI Organization Design Blueprint** 

_How the claims workforce actually changes shape — headcount, new roles, and the reskilling path, not just net FTE change._ 

||**Today**|**Year 3 (steady state)**|
|---|---|---|
|Claims adjuster FTE|1,100|830|
|Supervisors|150|130|
|Agent Trainers / Eval Engineers (new)|0|24|
|Claims AI QA Auditors (new)|0|18|
|Complex-claims specialists (redeployed)|n/a|+90 (from simple-claims handling)|

#### **REDEPLOYMENT PATH, NOT JUST REDUCTION** 

The FTE reduction is managed entirely through attrition over 24 months (typical adjuster attrition runs 12-15%/year). Adjusters freed from simple, high-volume claims are the pipeline for the new QA auditor and complex-claims specialist roles — the reskilling path is built into the roadmap, not left to chance. 

Page 15 of 21 

#### **DELIVERABLE 15 · AI Portfolio Framework** 

_All active AI initiatives in the claims division, ranked and risk-rated the same way — prevents the program from being judged on one flagship use case alone._ 

|**Initiative**|**Stage**|**Est. annual value**|**Risk**|
|---|---|---|---|
|FNOL triage agent|Scaling|included in LAE savings|Low|
|Auto glass / small-PD STP agent|Optimized|~$38M (largest single contributor)|Low|
|Property estimation agent|Piloted|~$22M|Medium|
|Fraud / SIU scoring agent|Scaling|$31M|Medium|
|Subrogation identification agent|Not started|~$6M (Phase 2 estimate)|Medium|
|Customer status chat agent|Scaling|CSAT contribution, not separately<br>valued|Low|

Page 16 of 21 

#### **DELIVERABLE 16 · AI Governance Model** 

_Who reviews what, how often — the answer to "who would catch it if this went wrong."_ 

|**Governance layer**|**Cadence**|**Owner**|**Scope**|
|---|---|---|---|
|Model Risk Committee|Monthly|Chief Risk Officer|Model performance, drift,<br>override-rate trends|
|Claims AI Ethics Review|Quarterly|Claims AI Risk Officer|Fair-claims-handling, disparate<br>impact testing|
|Regulatory compliance review|Quarterly + ad<br>hoc|Compliance / Legal|State DOI rules, STP eligibility<br>expansion sign-off|
|Human-in-loop escalation policy|Continuous|Regional Ops Directors|Real-time override and escalation<br>handling|
|Decision audit sampling|Weekly|Claims AI QA Auditors|Statistical sample of STP &<br>augmented-tier decisions|

Page 17 of 21 

#### **DELIVERABLE 17 · AI Economics Model** 

_The unit economics that make the LAE savings line in the Value Lifecycle document defensible line-by-line._ 

|**Handling tier**|**% of claims**|**Fully loaded cost/claim**|**vs. baseline**|
|---|---|---|---|
|Straight-through (STP)|42%|$8 – $15|-98%|
|Agent-augmented|40%|~$345|-45%|
|Human-led, agent-assisted|18%|~$550|-12%|
|Blended average|100%|$431|-31%|

#### **MARGINAL COST** 

One additional agent-handled claim: ~$4.10. One additional human-handled claim: ~$580. This ~140x gap is the single number that most influences the business case. 

Page 18 of 21 

#### **DELIVERABLE 18 · AI Value Scorecard** 

_A mockup of the actual quarterly scorecard the CoE reviews — illustrative Q3 of Year 2, mid-scale._ 

|**Metric**|**Target (Q3 Yr2)**|**Actual**|**Status**|
|---|---|---|---|
|STP rate|35%|33%|**TRACKING**— 2pts behind|
|Blended cost/claim|$470|$462|**AHEAD**of plan|
|Cycle time (avg, days)|9.5|9.8|**TRACKING**|
|Leakage (% indemnity)|3.1%|3.3%|**TRACKING**|
|Claims CSAT|76%|77%|**AHEAD**of plan|
|Human override rate (augmented tier)|<12%|10.4%|**AHEAD**of plan|
|Value realized vs. plan (cumulative)|$82.6M|$79.1M|**TRACKING**— 96% of plan|

Page 19 of 21 

#### **DELIVERABLE 19 · AI Strategy Playbook** 

_The operating principles the claims AI program is actually run against — short enough to fit on one page and be enforced._ 

- **Augment before automate.** Every capability passes through an agent-assisted, human-approved stage before it 

- earns STP authority — trust is earned claim-type by claim-type, not granted programmatically. 

• **Human-in-loop for adverse decisions.** Any outcome that denies, reduces, or delays payment beyond a defined threshold always retains a human decision-maker. 

• **Fail-safe to human.** Below-threshold confidence always escalates up a tier — the system never resolves uncertainty by taking more autonomous action. 

• **Measure leakage and cost together.** Cost-per-claim reduction that increases leakage is not a win; both move on the same scorecard, every quarter. 

• **Fund by wave, not by year.** Capital releases at each gate against evidence from the prior wave, not on a fixed annual budget cycle. 

- **Redeploy before you reduce.** Workforce transitions follow attrition and reskilling paths defined before the program 

- starts, not after volume drops. 

Page 20 of 21 

#### **DELIVERABLE 20 · Enterprise Architect & Chief AI Officer Playbooks** 

_Two short, role-specific checklists for the two executives who most need to act on this pack._ 

### **Enterprise Architect Playbook** 

[ ] Register every agent as a first-class capability in the EA capability map — not as a feature of an existing application. 

[ ] Require every agent to declare its tool/system access list and authority limits before it enters the landing zone. 

[ ] Route all agent-to-core-system integration through the standard API/event-bus layer — no direct database writes from an agent. 

[ ] Version and test agent behavior changes the way you would a system release — including regression tests against the eval set. 

### **Chief AI Officer Playbook** 

[ ] Fund in stage-gated tranches (Deliverable 8) — never approve the full 3-year number in one sitting. 

[ ] Report the value bridge (three separate lines: efficiency, leakage, retention), not one blended ROI figure, to the board. 

[ ] Hold Model Risk and Claims Ops jointly accountable for the override-rate metric — it is the earliest warning sign of either an under-trusted or an over-trusted agent. 

[ ] Re-baseline the business case if realized value tracks below 85% of plan for two consecutive quarters, rather than letting the gap silently widen. 

#### **CLOSING NOTE** 

Every deliverable in this pack traces back to the same underlying numbers in the companion Value Lifecycle document. That traceability — not the templates themselves — is what makes a deliverables pack useful in front of Finance, Risk, and the Board. 

Page 21 of 21
