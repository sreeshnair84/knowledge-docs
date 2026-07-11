---
title: "Case Study"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "08_energy.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# **Case Study** 

Cascadia Power & Light — Substation Predictive Maintenance & Grid Operations Advisory Platform 

Confidential Internal Engagement Documentation 

Engagement Period: April 2025 – February 2026 

|1. Executive Summary|
|---|
|2. Client Background|
|3. Business Problem|
|4. Constraints|

|4. Constraints<br>5. Discovery Transcript|
|---|
|5.1 Kickoff—Week 1|
|5.2 Substation Engineering Shadowing—Week 3|
|5.3 GOC Operator Shadowing—Week 4|
|5.4 Capability Mapping and ROI—Week 5|
|6. Architecture Workshops|
|6.1 IT/OT Boundary Architecture|
|6.2 AI/Platform Architecture—Whiteboard Session, Week 9|
|6.3 Edge & Data Architecture|
|6.4 Integration & API Strategy|
|7. Technical Debates|
|7.1 Prioritization Under Budget Constraint—Which Substations Get Full Instrumentation First?|
|7.2 Should the Advisory Copilot Ever Auto-Notify Field Crews?|
|7.3 Evaluation Strategy Debate|
|8. Executive Reviews|
|8.1 External NERC CIP Compliance Assessment—Week 22|
|8.2 VP Grid Operations Review—Week 28|
|8.3 Post-Incident Executive Review—Week 33 (see Section 14)|
|9. Final Architecture|
|10. Delivery Roadmap|
|11. Risks|
|12. Governance Model|
|13. Production Rollout|
|14. Production Incident—Month 7|
|14.1 Incident Summary|
|14.2 Incident Response Transcript|
|14.3 Remediation|
|15. Lessons Learned|
|16. Enterprise Architecture Artifacts|
|17. Architecture Decision Records (ADRs)|
|18. AI Evaluation Strategy|
|19. Operational Runbook|
|20. Future Roadmap|

# **1. Executive Summary** 

Cascadia Power & Light (CPL), a regional electric utility serving 1.1 million customers across a mixed urban-rural territory, engaged an Enterprise AI Architecture team to build a predictive maintenance and grid operations advisory platform for its transmission and distribution substation fleet. The mandate: reduce unplanned substation equipment failures, which had contributed to two significant customer-facing outages in the prior eighteen months, without introducing any AI-driven authority over the operational technology (OT) systems — SCADA (Supervisory Control and Data Acquisition) and protective relay systems — that directly control grid equipment. 

The ten-month engagement produced an edge-deployed condition-monitoring and predictive-maintenance platform analyzing transformer and switchgear sensor data, and an operations-advisory copilot assisting grid operators with situational awareness during abnormal conditions — architected under a strict, non-negotiable IT/OT boundary consistent with NERC CIP (North American Electric Reliability Corporation Critical Infrastructure Protection) standards, with the AI platform confined entirely to the IT side, reading OT data through a one-way data diode and never issuing any command back into the OT environment. 

A significant near-miss occurred in Month 7: the operations-advisory copilot, during a complex switchingsequence planning exercise following a transformer fault, generated a recommended restoration sequence that, while eventually flagged as suboptimal by the on-shift operator before any action was taken, revealed that the copilot’s advisory output could under specific conditions conflict with a protective relay’s programmed safety logic in a way that wasn’t obvious from the copilot’s presentation of the recommendation. No equipment was operated based on the flawed recommendation — CPL’s existing switching-order review and protective-device-coordination verification process caught the conflict before any physical action — but the incident triggered a fundamental redesign of how the advisory copilot represented protective-system constraints in its recommendations. 

Key outcomes: - Unplanned substation equipment failures reduced by 27% on monitored assets over eight months of production operation - Grid operator situational-awareness copilot reduced abnormal-condition assessment time by an average of 35% during non-routine events - One material near-miss (Month 7) involving a recommendation that conflicted with protective relay logic, caught by existing human verification process before any equipment operation, triggering advisory-output redesign - Zero instances of the AI platform issuing any command, directly or indirectly, into the OT/SCADA environment — the air-gap architecture held throughout the engagement 

# **2. Client Background** 

Cascadia Power & Light operates 44 transmission and distribution substations across a service territory spanning dense urban load centers and sparser rural distribution networks, with aging infrastructure at a meaningful share of substations — several transformers and switchgear assets were approaching or past their originally rated service life, a known risk CPL’s asset management team had been managing conservatively but reactively. 

CPL’s VP of Grid Operations, Marcus Delgado, and Chief Information Security Officer, Dr. Patricia Nwosu (whose role included oversight of NERC CIP compliance, a regulatory framework with real enforcement teeth including significant financial penalties for violations), co-sponsored the engagement. CPL’s Grid Operations Center (GOC) is staffed 24/7 by NERC-certified system operators whose authority over switching operations is itself tightly regulated and auditable, independent of any AI system. 

# **3. Business Problem** 

**Reactive maintenance.** CPL’s substation maintenance program was primarily time-based (scheduled intervals) and reactive (responding to alarms or failures) rather than condition-based. Discovery found CPL had sensor data — dissolved gas analysis for transformers, partial discharge monitoring for switchgear — being collected but not systematically analyzed for early-warning patterns, similar in spirit to the aviation engagement’s fragmentedtelemetry problem but with materially different regulatory and OT-boundary constraints given the electric grid’s critical-infrastructure status. 

**Operator situational awareness during abnormal conditions.** When a fault or abnormal condition occurred, grid operators in the GOC needed to rapidly assess the situation — which protective devices had operated, what the likely fault location and cause were, what switching sequence would safely restore service — under time pressure and, during major events, high cognitive load managing multiple simultaneous abnormal conditions. This assessment currently relied entirely on operator training and experience plus static, printed switching procedures, without any dynamic decision-support tooling. 

# **4. Constraints** 

1. **NERC CIP compliance and IT/OT separation.** This was the most consequential constraint of the engagement. NERC CIP standards, with real regulatory enforcement and financial penalty exposure, require strict security controls around Bulk Electric System cyber assets. CISO Nwosu’s non-negotiable position, established in Week 1 and never relaxed: the AI platform would have **read-only** access to OT data via a unidirectional data diode, with **zero** capability, direct or indirect, to write any command, configuration, or signal back into the OT/SCADA environment. 

2. **Protective system authority.** Protective relay systems — the automated equipment that detects faults and trips breakers to protect equipment and personnel — operate on their own independently engineered, safety-certified logic. No AI system’s output could be positioned as authoritative over, or a substitute for understanding, protective-system behavior; the Month 7 incident (Section 14) is directly about a gap in this principle’s practical implementation. 

3. **NERC-certified operator authority.** All switching operations require execution by a NERC-certified system operator following approved switching procedures — a regulatory requirement independent of this engagement, meaning the advisory copilot could inform but never replace or bypass this certified-operatorauthority model. 

4. **Air-gapped/limited-connectivity OT environments.** Several of CPL’s more rural substations had limited or no reliable connectivity back to centralized IT systems, requiring the edge condition-monitoring architecture to function with intermittent connectivity, similar in spirit to the aviation and manufacturing engagements’ edge-resilience requirements but layered on top of the much stricter unidirectional data-flow constraint. 

5. **Asset data quality and legacy instrumentation variance.** CPL’s substation fleet included equipment from multiple vendors and multiple decades, with inconsistent sensor instrumentation — some transformers had modern continuous dissolved-gas-analysis monitoring, others had only periodic manual oil sampling, a data-quality variance the predictive-maintenance model had to be designed around rather than assume uniform. 

6. **Budget and asset-criticality prioritization.** CPL’s board approved a budget sufficient for full sensor and monitoring coverage at roughly 60% of the substation fleet in year one, requiring an explicit, risk-based prioritization of which substations received full instrumentation first. 

# **5. Discovery Transcript** 

## **5.1 Kickoff — Week 1** 

_Present: Marcus Delgado (VP Grid Operations), Dr. Patricia Nwosu (CISO/NERC CIP oversight), GOC Operations Manager (Janet Okonkwo), the Enterprise AI Architect (EAA)._ 

**Nwosu:** I want to establish the boundary condition before anything else. This platform reads OT data. It never writes to OT. Not through a supposedly-secure API, not through a human-in-the-loop approval workflow that still terminates in an automated write, not through any pathway. If your architecture proposal at any point includes the AI platform issuing a command into the SCADA environment, that proposal is rejected before we discuss anything else about it. 

**EAA:** Understood, and I want to confirm I’m designing to that boundary as an absolute architectural constraint, not a strong preference to be traded off against convenience later. I’d propose a unidirectional data diode as the physical/architectural enforcement mechanism — not just a network policy or firewall rule that could theoretically be misconfigured or bypassed, but hardware-enforced one-way data flow from OT to IT. That gives you a boundary that’s verifiable independent of trusting our application-layer code to behave correctly. 

**Nwosu:** That’s the right instinct. I’ll want that verified by our own NERC CIP compliance team and, likely, by an external assessor before this goes anywhere near a real substation’s OT network. 

**Delgado:** Given that boundary, I want to be clear about where I think the actual value is: predictive maintenance on the equipment condition side, and better information for my operators during abnormal events. I am not interested in — and frankly wouldn’t trust, even if it were technically proposed — any kind of autonomous switching or fault response. My operators are certified professionals; this needs to make them better-informed, not attempt to replace their judgment. 

**Okonkwo (GOC Operations Manager):** I’ll add the practical operator perspective. During a major event, my operators are already managing significant cognitive load — multiple alarms, coordinating with field crews, communicating with the public utility commission if it’s a significant enough event. Anything this system gives them needs to reduce that load, not add another thing they have to independently verify is trustworthy under time pressure. 

**EAA:** That’s a critical framing, and it’s a different shape of risk than the boundary Dr. Nwosu just established — that’s about output _quality and trustworthiness_ under time pressure, not about system _authority_ . I want to hold both as first-class design constraints: absolute IT/OT separation on the authority question, and a design discipline around cognitive load and trustworthy presentation on the advisory-quality question. I’ll say directly, because I think it matters given what we’ll discuss later in this engagement: getting the second one right is genuinely harder and more subtle than the first, precisely because there’s no simple hardware-enforced boundary that guarantees it. 

## **5.2 Substation Engineering Shadowing — Week 3** 

**Senior Substation Engineer (Robert Nguyen):** [reviewing historical failure data] This transformer failure eighteen months ago — in hindsight, the dissolved gas analysis showed a slowly rising acetylene trend for months before failure. Classic sign of arcing. Nobody was systematically looking at the trend, because it lived in a vendor portal separate from our maintenance scheduling system, and periodic manual review didn’t catch the slow trend against normal sample-to-sample noise. 

**EAA:** How would a systematic monitoring system need to behave differently from what an engineer manually reviewing periodic samples does today? 

**Nguyen:** It would need to catch a slow trend across many samples, not just flag any single sample that’s outside a threshold — a single elevated reading might be noise, but a consistent upward trend over months is a different signal entirely, and that’s exactly the pattern that’s hard for a person to catch by eye across a spreadsheet of hundreds of assets. 

This session directly shaped the predictive-maintenance model’s emphasis on **trend-based, not thresholdbased, anomaly detection** (Section 6.2) — a design choice distinct from a simpler alerting system, motivated by this specific historical failure’s root-cause pattern. 

## **5.3 GOC Operator Shadowing — Week 4** 

**System Operator (Diane Fischer), during a training simulation of a transformer fault scenario:** When something like this happens for real, I need to quickly understand: what protective devices operated, is the fault cleared, what’s still energized, what’s de-energized, and what’s the safe sequence to restore service to unaffected customers while maintenance addresses the fault. Right now that’s me and a paper switching procedure book, cross-referencing a one-line diagram, under real time pressure if it’s an actual event affecting customers. 

**EAA:** If a decision-support tool suggested a restoration sequence, how would you personally verify it’s actually safe before acting on it? 

**Fischer:** I’d check it against the protective device coordination study for that specific substation — which devices are supposed to operate in what order, what the current state of each device actually is — and I would never execute a switching sequence without that verification, tool-suggested or not. That’s not optional, that’s how I was trained and how I’d want to keep operating regardless of what tooling exists. 

This existing verification discipline — checking any proposed switching sequence against the protective device coordination study before execution — is the control that proved decisive in the Month 7 incident, described in Section 14. 

## **5.4 Capability Mapping and ROI — Week 5** 

|**Capability**|**Current State**|**AI Opportunity**|**Impact**|**Feasibility**|
|---|---|---|---|---|
|Transformer/switchgear<br>condition monitoring|Periodic manual<br>review, siloed vendor<br>portals|Trend-based predictive<br>maintenance, unified<br>across asset fleet|Very High|Medium|
|Abnormal-event<br>situational awareness|Manual, paper-<br>procedure-based|Operations-advisory<br>copilot (informational<br>only)|High|Medium|
|Switching sequence<br>execution|NERC-certified human<br>operator|Explicitly, permanently<br>out of scope for<br>automation|N/A|N/A|
|Load forecasting|Existing separate<br>function|Out of scope — mature<br>function, different team|Low|N/A|
|Vegetation<br>management / physical<br>asset inspection|Manual/drone-assisted,<br>separate program|Deferred — different<br>data modality, separate<br>scoping needed|Medium|Low (this engagement)|

# **6. Architecture Workshops** 

## **6.1 IT/OT Boundary Architecture** 

This is the section that received the most sustained architectural attention of the entire engagement, reflecting its centrality to CPL’s risk tolerance. 

**Security Architect (Raj Mehta):** Walk through the physical and logical architecture of the data diode boundary. 

**EAA:** [presenting architecture diagram] OT-side sensor data — dissolved gas analysis, partial discharge monitoring, protective relay event logs — is collected by OT-resident historian systems, entirely within CPL’s existing NERC CIP-governed OT security perimeter, unchanged by this engagement. A hardware unidirectional data diode sits at the boundary, physically permitting data flow only from OT to IT — there is no physical pathway for a signal to travel the other direction, which is a fundamentally different and stronger guarantee than a firewall rule permitting only certain traffic directions, since a firewall rule is a configuration that could be changed or misconfigured, while the diode’s unidirectionality is a physical property of the hardware. 

**Mehta:** And the IT-side platform never needs any pathway back into OT for any function? 

**EAA:** Correct, by design, for every capability in this engagement’s scope. The predictive-maintenance model runs entirely IT-side, generating maintenance recommendations that a human engineer reviews and, if warranted, translates into a work order in CPL’s existing maintenance-management system — itself an IT-side system, with any actual physical maintenance action taken by a human field technician, using CPL’s existing work-order and safety-tagging procedures, entirely independent of anything this platform does. The operations-advisory copilot, similarly, only ever produces informational output for a GOC operator’s own judgment — it has no pathway to execute or transmit anything into the OT environment. 

**Nwosu:** I want this validated by an external NERC CIP compliance assessor before any pilot deployment touches real substation data, not just internally reviewed. 

**EAA:** Agreed, and I’d recommend building that external assessment into the delivery roadmap as a hard gate, not a parallel-track nice-to-have. 

## **6.2 AI/Platform Architecture — Whiteboard Session, Week 9** 

**Platform Architect (Sam Ito):** Walk through the predictive-maintenance model’s design, given the Nguyen shadowing finding about trend detection. 

**EAA:** [at whiteboard] Sensor data flows through the data diode into an IT-side time-series data platform. Given the instrumentation variance across CPL’s fleet (Section 4) — some assets have continuous monitoring, others periodic manual sampling — the model architecture explicitly handles both data density regimes rather than assuming uniform continuous data. For trend detection specifically, per Nguyen’s finding, the model uses a change-point and trend-slope detection approach across each asset’s own historical baseline, rather than a fixed population-wide threshold — because what’s an abnormal trend for one transformer’s baseline chemistry might be normal variance for a different unit, and a fixed threshold would miss the slow-trend pattern that caused the historical failure Nguyen described. 

**Ito:** For the operations-advisory copilot — walk through what happens during an actual fault event. 

**EAA:** Protective relay event data (which devices operated, timestamps, sequence) flows through the data diode as it’s generated. The advisory copilot correlates this against the substation’s one-line diagram and historical faultpattern data to generate a situational-awareness summary — what appears to have happened, what’s likely still energized versus de-energized, and, if requested by the operator, a _candidate_ restoration sequence for the operator’s own review. I want to be precise about the word “candidate” here — the copilot’s output is explicitly framed and formatted as a starting point for the operator’s own verification process, never as a validated, readyto-execute plan, which is directly relevant to what we’ll discuss in Section 14. 

**Okonkwo:** How does the copilot know what’s “likely still energized” — is it reasoning about the electrical topology itself, or just pattern-matching against historical similar events? 

**EAA:** Both, in a specific combination I want to be transparent about because I think it’s exactly the source of the Month 7 gap. It uses a structured, deterministic topology model of the substation’s one-line diagram — which is more like the deterministic rules-engine approach from other regulated engagements, computing what’s 

electrically de-energized given known breaker states — combined with an LLM-based reasoning layer that drafts the natural-language situational summary and candidate restoration narrative. The deterministic topology computation should be the ground truth for “what’s energized,” with the LLM layer only responsible for presentation and candidate-sequencing suggestions, not for the underlying electrical-state determination itself. 

## **6.3 Edge & Data Architecture** 

- IT-side time-series data platform, ingesting sensor and protective-relay-event data via the unidirectional data diode from each substation’s OT-resident historian 

- Trend-based anomaly detection model (change-point/trend-slope, per-asset baseline) rather than fixedthreshold alerting 

- Deterministic electrical-topology computation engine, maintaining each substation’s one-line diagram and current known breaker/switch states as structured, queryable data — the ground-truth source for the advisory copilot’s “what’s energized” determinations 

- LLM-based Operations-Advisory Agent, consuming the topology engine’s deterministic output plus historical fault-pattern data, producing situational summaries and candidate restoration sequences for operator review — never positioned as validated or execution-ready 

## **6.4 Integration & API Strategy** 

- MCP server exposing the topology engine and historical fault-pattern database as tools consumed by the Operations-Advisory Agent, with the topology engine’s electrical-state output treated as authoritative and never overridden or second-guessed by the LLM layer’s own reasoning 

- Integration with CPL’s existing maintenance-management system for predictive-maintenance-driven workorder creation — human-reviewed and human-initiated, not automated work-order generation 

- No integration pathway, direct or transitive, into SCADA or protective relay configuration systems — a constraint verified through the external NERC CIP assessment (Section 6.1) 

# **7. Technical Debates** 

## **7.1 Prioritization Under Budget Constraint — Which Substations Get Full Instrumentation First?** 

**Delgado (Week 12):** Given the 60%-of-fleet budget constraint from discovery, how do we decide which substations get full sensor coverage in year one? 

**EAA:** I’d propose a risk-based prioritization combining three factors: asset age/condition (per Nguyen’s team’s existing, though underutilized, condition-assessment data), customer-criticality (substations serving hospitals, emergency services, or large customer populations weighted higher), and existing instrumentation gaps (substations currently relying on infrequent manual sampling get more relative benefit from continuous monitoring than substations that already have decent instrumentation). I’d resist a purely reactive prioritization based on which substations have failed most recently, since that’s backward-looking and your own Nguyen shadowing finding suggests the current failure-detection process has real blind spots that could mean the highestrisk assets aren’t the ones that have failed most visibly yet. 

**Delgado:** That’s a more defensible framework than what my team was probably going to propose informally, which likely would have leaned more heavily on recent-failure history. I want Nguyen’s engineering team to coown this prioritization scoring, not have it be an outside consultant’s model imposed on their domain expertise. 

**EAA:** Agreed, and I’d recommend that regardless of how good our proposed framework is — the actual riskweighting judgments should be owned by the people with deep institutional knowledge of this specific fleet, with our role being to help structure and operationalize that judgment into a repeatable process, not to substitute our own external judgment for theirs. 

## **7.2 Should the Advisory Copilot Ever Auto-Notify Field Crews?** 

**Okonkwo (Week 16):** Once the copilot identifies a likely fault location, could it directly notify the relevant field crew dispatch system, saving the operator a manual step? 

**EAA:** I’d resist automating that specific step, and I want to explain the reasoning given it might seem like a lowrisk convenience. Field crew dispatch decisions during an active fault event need to account for information the copilot doesn’t have full visibility into — crew safety status, other concurrent events competing for the same crews, site-specific hazards a system operator might know about from other channels. I’d keep dispatch decisions as an explicit operator action, informed by the copilot’s situational summary, rather than any form of automated trigger — this is consistent with the broader principle Marcus established in Week 1 about the copilot informing rather than acting. 

**Okonkwo:** That’s consistent with how I’d want it to work regardless of the AI question — dispatch decisions during an active event are exactly the kind of judgment call that shouldn’t be delegated to any automated trigger. 

## **7.3 Evaluation Strategy Debate** 

**Nguyen:** For the predictive-maintenance model, how do we validate it’s actually catching the kind of slow-trend pattern that caused our historical failure, not just performing well on easy, obvious cases? 

**EAA:** I’d propose a specific retrospective validation: run the model against CPL’s full historical sensor data leading up to every known past equipment failure, checking whether it would have flagged the developing condition with meaningful lead time before the actual failure — the Nguyen historical case specifically, plus every other documented failure in CPL’s records. This directly tests the trend-detection capability against real, knownoutcome cases rather than a synthetic or held-out-sample-only validation that might not capture the slow-trend pattern’s specific difficulty. 

**Nguyen:** I want to be personally involved in reviewing those retrospective results, not just see a summary accuracy number — I want to understand specifically which historical failures it would and wouldn’t have caught, and why. 

**EAA:** That’s exactly the right level of engagement for this validation, and I’d build the retrospective analysis to support that case-by-case review, not just aggregate metrics. 

# **8. Executive Reviews** 

## **8.1 External NERC CIP Compliance Assessment — Week 22** 

**External Assessor (independent firm engaged by Nwosu’s office):** I’ve reviewed the data diode architecture and the platform’s integration boundary. My finding: the unidirectional hardware boundary is sound and meets NERC CIP separation requirements as designed. I have one recommendation, not a finding of deficiency: I’d want documented, auditable evidence of the diode’s continued unidirectional operation over time, not just a point-intime architectural review, given how much regulatory weight rests on this boundary holding. 

**EAA:** That’s a reasonable ask and one I’d recommend adopting regardless — I’d propose periodic (quarterly) physical/technical re-verification of the diode’s unidirectional behavior, documented and retained as part of CPL’s NERC CIP compliance evidence, not a one-time assessment we treat as permanently sufficient. 

**Nwosu:** Approved, and I want that written into the operational runbook as a standing compliance requirement, not left to institutional memory. 

## **8.2 VP Grid Operations Review — Week 28** 

**Delgado:** Retrospective validation results on the predictive-maintenance model — would it have caught Nguyen’s historical failure case? 

**EAA:** Yes — run against the historical sensor data, the model’s trend-detection would have flagged the developing condition approximately four months before the actual failure, which would have provided a meaningful window for planned intervention rather than the reactive emergency response that actually occurred. I want to be appropriately calibrated about this, though: this is one validated historical case, not proof the model catches every possible failure mode — we’re continuing the broader retrospective validation across all of CPL’s historical failure records, and I’d recommend continued caution about over-generalizing from this one strong result until that fuller validation is complete. 

**Delgado:** That calibration is appreciated — I’ve seen vendors oversell a single good demo case before. 

## **8.3 Post-Incident Executive Review — Week 33 (see Section 14)** 

**Nwosu:** I want to confirm first, unambiguously: did the IT/OT boundary hold? Was there any pathway by which the flawed recommendation could have resulted in an actual OT-side action? 

**EAA:** Unambiguously, yes, the boundary held — this incident never involved any pathway into OT; the advisory copilot’s output remained purely informational, and the flaw was in the _quality and presentation_ of that informational output, not in any breach of the authority boundary Dr. Nwosu established in Week 1. I want to be precise about that distinction because I think it matters both for how we characterize the incident and for what the actual fix needs to address. 

**Delgado:** So this is entirely about the “cognitive load and trustworthy presentation” risk category from Week 1, not the “system authority” category. 

**EAA:** Correct, and I’d say this incident is a fairly direct validation of your instinct in Week 1 that the second risk category would prove genuinely harder to get right than the first — the hardware-enforced boundary worked exactly as designed; the harder, softer problem of ensuring an operator can quickly and correctly understand a recommendation’s relationship to protective-system constraints is where the actual gap was. 

# **9. Final Architecture** 

- **Unidirectional Data Diode** : hardware-enforced, physically one-way OT-to-IT data flow, externally NERC CIP-assessed, with standing quarterly re-verification requirement 

- **Trend-Based Predictive Maintenance Model** : per-asset-baseline change-point/trend-slope detection across transformer and switchgear condition data, handling both continuous and periodic-sampling data density regimes, human-reviewed before any maintenance work order is created 

- **Deterministic Electrical Topology Engine** : structured, queryable ground-truth representation of each substation’s one-line diagram and current known breaker/switch states 

- **Operations-Advisory Agent** : LLM-based situational-summary and candidate-restoration-sequence generation, strictly informational, consuming the topology engine’s deterministic output as ground truth, redesigned post-incident (Section 14.3) to explicitly surface protective-device-coordination constraints alongside any candidate sequence 

- Risk-based, engineering-co-owned prioritization framework for phased sensor-coverage rollout across the substation fleet 

- No integration pathway, direct or transitive, into SCADA, protective relay configuration, or any OT command surface 

# **10. Delivery Roadmap** 

|**Phase**|**Duration**|**Scope**|
|---|---|---|
|Discovery & IT/OT Boundary Design|Months 1–2|Discovery, data diode architecture design|
|External NERC CIP Assessment|Month 5|Independent compliance validation gate|
|Predictive Maintenance Model Build|Months 2–6|Trend-detection model, retrospective<br>validation|
|Topology Engine & Advisory Agent Build|Months 4–7 (overlapped)|Deterministic topology engine, advisory<br>copilot|
|Phase 1 Substation Rollout (highest-<br>priority tier)|Months 6–8|~25 substations, per risk-based<br>prioritization|
|Incident & Remediation|Month 7|Protective-relay-conflict near-miss,<br>advisory redesign|
|Phase 2 Rollout|Months 8–10|Remaining Phase 1 budget-scoped<br>substations|

# **11. Risks** 

|**Risk**|**Likelihood**|**Impact**|**Mitigation**|**Owner**|
|---|---|---|---|---|
|IT/OT boundary<br>compromise|Very Low|Very High (regulatory,<br>safety)|Hardware<br>unidirectional diode,<br>external NERC CIP<br>assessment, quarterly<br>re-verification|CISO / NERC CIP<br>Compliance|
|Advisory copilot<br>recommendation<br>conflicting with<br>protective-system logic|Medium (realized —<br>Section 14)|High|Redesigned output<br>explicitly surfacing<br>protective-device-<br>coordination<br>constraints; existing<br>mandatory operator<br>verification process as<br>independent backstop|Grid Operations|
|Predictive maintenance<br>model missing a<br>developing failure<br>(false negative)|Low-Medium (ongoing<br>validation)|High|Retrospective historical<br>validation, continued as<br>an ongoing practice not<br>a one-time exercise|Substation Engineering|
|Instrumentation-<br>coverage gap (40% of<br>fleet unmonitored in<br>year one)|Medium|Medium|Risk-based prioritization<br>framework, explicit<br>board-level<br>acknowledgment of<br>coverage gap|VP Grid Operations|
|Operator over-reliance<br>on advisory copilot<br>under time pressure|Medium|High|Output design explicitly<br>framed as<br>candidate/informational;<br>training emphasizing<br>mandatory independent<br>verification|GOC Operations<br>Manager|

# **12. Governance Model** 

- **Absolute IT/OT authority separation** : non-negotiable, externally assessed, quarterly re-verified — the single most consequential and consistently maintained governance principle of the engagement **NERC-certified operator authority preserved** : no AI output may bypass or be positioned as a substitute for certified-operator switching-execution authority **Standing external compliance assessment cadence** : annual external NERC CIP re-assessment of the platform’s boundary architecture, in addition to the quarterly technical diode re-verification **Post-incident advisory-output governance addition** : mandatory explicit surfacing of protective-devicecoordination constraints in any candidate restoration-sequence output, reviewed and approved by Substation Engineering before the redesigned output format’s production deployment 

# **13. Production Rollout** 

Phase 1 rollout (Month 6) covered approximately 25 substations selected via the risk-based prioritization framework (Section 7.1), with the predictive-maintenance model operating in a monitored, human-reviewed mode from the start — no maintenance work order was ever automatically generated without engineering review, consistent with the architecture’s design. The Month 7 incident occurred during this Phase 1 period, during a genuine (not simulated) transformer fault event. 

# **14. Production Incident — Month 7** 

## **14.1 Incident Summary** 

During a real transformer fault at one of the Phase 1 substations, the on-shift system operator used the Operations-Advisory Agent to help assess the situation and requested a candidate restoration sequence. The agent’s topology-engine-grounded assessment of “what’s de-energized” was correct. However, the LLM-based candidate-restoration-sequence narrative proposed a switching order that, while it would have correctly restored service to unaffected customers from a pure electrical-topology standpoint, did not account for a specific protective-device-coordination requirement at that substation — a timing/sequencing constraint arising from how that substation’s specific protective relay settings were configured, information that existed in CPL’s protective device coordination study but was not represented in the topology engine’s data model (which tracked breaker states and electrical connectivity, not protective-relay timing/coordination logic). 

Per the discipline Fischer described in discovery (Section 5.3), the on-shift operator checked the candidate sequence against the substation’s protective device coordination study before taking any action, as standard practice independent of this AI platform — and identified the conflict before any switching operation was executed. No equipment was operated based on the flawed recommendation. 

## **14.2 Incident Response Transcript** 

**Delgado (emergency session, within 6 hours):** Walk me through exactly what the topology engine knew and didn’t know. 

**EAA:** The topology engine correctly modeled electrical connectivity and current breaker states — that data was accurate and the “what’s de-energized” assessment was correct. What it didn’t model was protective-device coordination logic — the engineered timing and sequencing relationships between protective relays at that specific substation, which exist in a separate engineering document (the protective device coordination study) that wasn’t part of the topology engine’s data model. The LLM layer, generating the candidate restoration sequence, had no grounding in that coordination logic and effectively proposed a sequence that was electrically valid but not protective-system-safe. 

**Okonkwo:** This is exactly the scenario Diane Fischer described in discovery as the reason she’d always independently verify — I want that on the record as validation that the existing operator discipline is what actually protected us here, not the AI system. 

**EAA:** I’d affirm that directly and want it clearly documented that way, both because it’s true and because I don’t want this incident’s resolution to understate the importance of that independent human verification discipline going forward. The fix needs to close the specific data-modeling gap — bringing protective device coordination logic into the topology engine’s ground-truth data model, not just improve LLM prompting — but the fix should be understood as strengthening the informational quality of what operators verify against, not as removing the need for that verification. 

**Nwosu:** I want to understand if this reveals anything about the IT/OT boundary itself, or if it’s contained to the advisory-quality issue we discussed in Week 33’s framing. 

**EAA:** Fully contained to the advisory-quality issue — this never touched or came close to touching the OT boundary. I want to be precise that this is a real and serious finding about output quality and completeness of the underlying data model, and I don’t want to understate it, but it’s a categorically different kind of issue than a boundary compromise would be. 

**Delgado:** I’m pausing the advisory copilot’s restoration-sequence-suggestion capability — the situationalawareness summary capability can continue, that wasn’t implicated — until the protective-device-coordination data gap is closed and independently reviewed by Substation Engineering. 

## **14.3 Remediation** 

The topology engine’s data model was extended to incorporate protective device coordination study data as structured, queryable ground truth, alongside the existing electrical-connectivity and breaker-state data — meaning any future candidate restoration sequence is checked against both electrical topology and protectivecoordination constraints before being presented, with any sequence that would violate a coordination constraint 

flagged explicitly and prominently, not silently omitted or buried in prose. Substation Engineering (Nguyen’s team) reviewed and approved the redesigned data model and output format before the restoration-sequencesuggestion capability resumed, and the review explicitly checked the new design against the same historical faultevent data used in the Section 8.2 retrospective validation, extended to specifically test for protectivecoordination-conflict scenarios. 

# **15. Lessons Learned** 

1. **A deterministic “ground truth” data model is only as trustworthy as its completeness — modeling electrical topology accurately while omitting a related but distinct engineering domain (protective device coordination) created a gap that looked, from the system’s own internal logic, like a fully grounded recommendation.** This reinforced a principle from other regulated engagements — deterministic backstops are valuable precisely because they’re verifiable and complete, but “deterministic” doesn’t automatically mean “complete,” and the completeness of what’s modeled needs the same rigorous scrutiny as the correctness of what is modeled. 

2. **The IT/OT boundary and the advisory-output-quality risk are genuinely different risk categories requiring genuinely different mitigations, and conflating them would have been a mistake in both directions.** Treating this incident as evidence the hardware boundary was somehow insufficient would have been an incorrect diagnosis pointing to unnecessary and ineffective additional boundary controls; conversely, treating the existing hardware boundary’s soundness as reason to be less rigorous about advisory-output quality would have missed the actual gap. Keeping these as explicitly separate governance and engineering workstreams, as established from Week 1, made the correct diagnosis and fix faster and clearer. 

3. **A well-trained, disciplined human operator following an existing verification practice — one that predated and was independent of this AI platform — was the actual safeguard that prevented harm, consistent with a pattern seen across multiple engagements in different regulated domains.** The postmortem was explicit and unambiguous in crediting Fischer’s discovery-session-described discipline and Okonkwo’s insistence on preserving it, rather than any property of the AI system itself, as the reason this remained a near-miss. This reinforced CPL’s decision, made in Week 1 and never revisited, to treat operator verification as a permanent, non-negotiable feature of the system’s use, not a training-wheel measure to be relaxed as trust in the AI system grew. 

# **16. Enterprise Architecture Artifacts** 

- **Capability Map** : predictive maintenance and operations-advisory value chains with AI-opportunity overlay (Section 5.4) 

- **IT/OT Boundary Architecture Specification** , including the external NERC CIP assessment findings and the quarterly re-verification protocol 

- **Risk-Based Substation Prioritization Framework** , co-owned with Substation Engineering, documenting the scoring methodology for phased sensor-coverage rollout 

- **Topology Engine Data Model Specification** , including the post-incident extension incorporating protective device coordination data as a documented example of deliberate ground-truth-completeness review 

# **17. Architecture Decision Records (ADRs)** 

**ADR-001: Absolute unidirectional IT/OT data-flow boundary via hardware data diode; zero pathway, direct or transitive, for AI-platform output to reach OT/SCADA/protective-relay systems.** Status: Accepted, foundational, non-negotiable per CISO mandate. Externally validated by independent NERC CIP assessment. 

**ADR-002: Trend-based (per-asset-baseline change-point/slope) anomaly detection for predictive maintenance, rather than fixed-threshold alerting.** Status: Accepted. See Section 6.2, directly responsive to the Nguyen historical-failure shadowing finding. 

**ADR-003: Deterministic electrical topology engine as authoritative ground truth for “what’s energized” determinations; LLM layer restricted to presentation and candidate-sequencing suggestions, never overriding topology-engine output.** Status: Accepted; found incomplete post-incident (protective-coordination data gap), remediated in ADR-006. 

**ADR-004: Field crew dispatch remains an explicit human operator action; no automated dispatch triggering from any AI-generated situational assessment.** Status: Accepted. See Section 7.2. 

**ADR-005: Risk-based, Substation-Engineering-co-owned prioritization framework for phased sensorcoverage rollout under the year-one budget constraint.** Status: Accepted. See Section 7.1. 

**ADR-006 (post-incident): Topology engine’s ground-truth data model extended to incorporate protective device coordination study data; any candidate restoration sequence checked against both electrical topology and protective-coordination constraints, with violations explicitly and prominently flagged.** Status: Accepted, emergency remediation, independently reviewed and approved by Substation Engineering before capability resumption. 

**ADR-007 (compliance governance): Quarterly technical re-verification of data diode unidirectional operation, retained as standing NERC CIP compliance evidence.** Status: Accepted, per external assessor recommendation (Section 8.1). 

# **18. AI Evaluation Strategy** 

- **Predictive maintenance retrospective validation** : model run against full historical sensor data preceding every documented past equipment failure, checked case-by-case (not just aggregate accuracy) for lead-timeto-flag, with Substation Engineering directly reviewing results per Nguyen’s Week 20 requirement **Trend-detection sensitivity** : specifically validated against slow-developing-trend patterns (the historical failure-mode class identified in discovery), distinct from and in addition to sudden-anomaly detection performance 

- **Topology engine completeness review** (post-incident addition): standing requirement to review the ground-truth data model’s completeness against relevant engineering domains (electrical topology, protective coordination, and any future domain added) whenever the advisory agent’s capability scope expands, not just its accuracy within the currently modeled domains **Advisory output clarity testing** : post-incident addition — structured review, involving GOC operators, of whether candidate-sequence output clearly and prominently surfaces any flagged constraint conflicts, not just whether the underlying data model correctly detects them 

# **19. Operational Runbook** 

- **Quarterly data diode re-verification procedure** : standing NERC CIP compliance requirement, documented and evidence-retained per ADR-007 

- **Predictive maintenance alert-to-work-order procedure** : defined human-engineering-review step before any work order is created from a model-flagged condition, preserving human decision authority throughout **Abnormal-event advisory copilot usage protocol** : explicit operator training material emphasizing the mandatory independent verification discipline (per Fischer’s Section 5.3 practice), reinforced specifically in light of the Month 7 incident, not weakened by the incident’s remediation 

- **Annual external NERC CIP re-assessment** : standing requirement, building on the Week 22 initial assessment, for the full boundary architecture 

# **20. Future Roadmap** 

1. **Phase 2/3 sensor-coverage expansion** toward the remaining substation fleet, contingent on continued budget approval and informed by Phase 1’s actual observed failure-prevention value as it accumulates evidence for the board. 

2. **Vegetation management / physical asset inspection integration** (deferred in discovery, Section 5.4), requiring a materially different data modality (imagery/drone data) and a separate scoping and discovery process — explicitly not assumed to inherit this engagement’s architecture without fresh evaluation. 

3. **Expansion of the topology engine’s ground-truth data model** to additional engineering domains beyond electrical topology and protective coordination (e.g., thermal loading constraints), pursued deliberately and incrementally given the Month 7 lesson about the risk of an incomplete-but-confidentseeming ground-truth model. 

4. **Cross-utility reference architecture sharing** : CPL’s participation in a regional utility mutual-assistance consortium has generated interest from peer utilities in the IT/OT boundary architecture pattern — CPL and the engagement team have discussed, but not committed to, presenting this as a sanitized reference architecture at an industry forum, contingent on legal and competitive-sensitivity review.
