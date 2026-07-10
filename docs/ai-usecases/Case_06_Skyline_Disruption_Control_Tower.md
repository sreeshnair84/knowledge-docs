---
title: "Options, Not Recommendations"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_06_Skyline_Disruption_Control_Tower.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

#### **AGENTIC AI IN THE ENTERPRISE** 

# **Options, Not Recommendations** 

Building an Agentic Disruption Control Tower Inside a Global Airline 

A transcript-style account following Sofia Marchetti, Enterprise AI Architect at Skyline Continental Airlines, as she builds a cross-domain agentic orchestration layer over an existing crew-legality solver — and designs against automation-following bias in the exact moment a controller has the least time to notice it. 

#### **CAST OF CHARACTERS** 

#### **Sofia Marchetti** 

Enterprise AI Architect, Operations Systems (EA) — our protagonist 

#### **Derek Wallace** 

VP Operations Control Centre (OCC) — sponsor 

#### **Captain Lena Brandt** 

Flight Operations Director 

#### **Miguel Fuentes** 

Lead Agentic Systems Engineer 

#### **Grace Odeh** 

Head of Crew Scheduling 

#### **Ahmet Yildiz** 

Head of Customer Recovery 

#### **Dr. Pauline Lacroix** 

Regulatory & Safety Compliance Lead 

#### **INCUBATION** → **PITCH / APPROVE** → **DESIGN** → **BUILD** → **OPERATE** → **REVIEW** 

Skyline Continental Airlines | Agentic Disruption Control Tower | 2026 

## **STAGE 1 — THE STORM THAT CASCADED FOR THREE DAYS** 

_Finding the actual decision bottleneck inside an irregular-ops meltdown | Week 1 | Tuesday, 2 June 2026_ 

#### _08:00 | Tuesday 2 June 2026 | Derek Wallace’s office, Operations Control Centre_ 

#### **Informal Strategy Discussion — Attendees: Derek Wallace (VP OCC), Sofia Marchetti (EA)** 

### **Derek Wallace — VP Operations Control Centre** 

Sofia, the Denver storm system three weeks ago cascaded into a three-day disruption — ourselves and connecting carriers, over 400 cancelled flights, crew running out of duty hours faster than we could reposition them, and customer recovery so far behind that people were re-booking themselves on competitor airlines from the gate. I want an AI system in the control centre that can think through these cascades faster than a room full of exhausted planners at 3am. 

### **Sofia Marchetti — Enterprise AI Architect** 

I believe that’s achievable, and I also want to be upfront that irregular operations is one of the highest-stakes domains for autonomous action I could be asked to work in — a bad automated decision here doesn’t just cost money, it can put crew legality, passenger safety connections, and even aircraft routing at risk. Before I scope any autonomy, I want to understand exactly where your planners’ decision-making actually breaks down during a cascade. Is it lack of information, too much information, or genuinely not enough time to compute the options? 

### **Derek Wallace — VP Operations Control Centre** 

Grace and Captain Brandt would know that better than me — talk to them, and talk to Ahmet on the customer recovery side too. It’s not one bottleneck, it’s several colliding at once. 

#### _13:00 | Thursday 4 June 2026 | Operations Control Centre floor_ 

#### **Discovery Interview — Attendees: Sofia Marchetti (EA), Captain Lena Brandt (Flight Ops Director), Grace Odeh (Crew Scheduling)** 

### **Captain Lena Brandt — Flight Operations Director** 

During the Denver event, the fundamental problem was combinatorial. A single major disruption creates hundreds of downstream crew-legality and aircraft-routing constraints simultaneously, and every candidate recovery plan — delay this flight, swap that aircraft, reposition that crew — has ripple effects on dozens of other flights. Our planners are good, but manually evaluating even a handful of candidate recovery plans against all those constraints takes time we don’t have. 

### **Sofia Marchetti — Enterprise AI Architect** 

So this sounds less like a natural-language reasoning problem and more like a constraint-satisfaction and optimisation problem, with a conversational or agentic layer on top to make the options explainable and actionable for your planners quickly. That’s an important distinction — I don’t want to build a large language model trying to reason its way through crew legality rules from scratch when a deterministic constraint solver already exists for exactly this kind of problem in the industry. 

### **Grace Odeh — Head of Crew Scheduling** 

We actually do have an optimisation engine for crew legality — it’s been in use for years for routine scheduling. The gap during a cascade event isn’t the solver itself, it’s that feeding it the right scenario fast enough, interpreting its output correctly under time pressure, and coordinating across flight ops, crew 

scheduling, and customer recovery simultaneously is where humans are the bottleneck. Right now that coordination happens over phone calls and a shared spreadsheet. 

### **Sofia Marchetti — Enterprise AI Architect** 

That reframes the whole opportunity. This isn’t ‘replace the crew-legality solver with an AI.’ It’s ‘build an agentic orchestration layer that rapidly generates candidate scenarios for the existing solver, interprets and compares the solver’s outputs across multiple domains — crew, aircraft, customer impact — and presents ranked, explainable recovery options to human decision-makers fast.’ The solver stays deterministic and authoritative for legality; the agent’s job is speed and synthesis, not legal judgment. 

### **Captain Lena Brandt — Flight Operations Director** 

I want to be direct about where I will not accept autonomous action, regardless of how good this gets: the actual decision to execute a recovery plan — cancel this flight, reposition that crew, delay that departure — must always be made and authorised by a certified operations controller. Always. This is a regulatory and safety line, not a preference. 

### **Sofia Marchetti — Enterprise AI Architect** 

Understood, and I want that written into the scope from day one, the same way I’ve drawn similar lines in other high-stakes agentic systems: the agent proposes ranked, explainable options fast. A certified human controller decides and executes. No exception, no confidence-threshold override. 

#### I **ARTIFACT: AIA-2026-052** 

### **Architecture Intake Assessment — Agentic Disruption Control Tower** 

_Draft v0.2 | Skyline Continental Airlines_ 

#### **BUSINESS PROBLEM STATEMENT** 

Major disruption events (weather, mechanical, ATC) create combinatorial cascades across crew legality, aircraft routing, and customer impact that existing deterministic optimisation tools can solve individually, but manual cross-domain coordination and scenario generation under time pressure is the actual bottleneck — not solver capability. 

#### **STRATEGIC ALIGNMENT** 

Operational resilience objective: reduce disruption recovery time 40%. Regulatory constraint: zero change to crew legality or safety decision authority — remains exclusively with certified operations controllers. 

#### **LANDSCAPE FINDINGS** 

Existing crew-legality optimisation solver is mature and authoritative; the gap is scenario generation speed and cross-domain synthesis, currently done manually via phone coordination and shared spreadsheets during live events. 

#### **BUILD / BUY / REUSE ASSESSMENT** 

Option A: Replace existing solver with an end-to-end LLM-based reasoning system — REJECTED at intake; deterministic legality logic should not be delegated to a probabilistic model. 

Option B: Agentic orchestration layer generating and comparing candidate scenarios via the existing solver, synthesising ranked explainable options across domains, human controller retains all execution authority — Effort: MED-HIGH, Risk: MED, Speed: MED 

Option C: Faster manual tooling only, no AI — Effort: LOW, Risk: LOW, Speed: HIGH, Value: LOW 

#### **RECOMMENDATION** 

Option B — orchestration and synthesis layer on top of the existing authoritative solver, never replacing its deterministic legality logic. 

### **STAGE OUTCOMES** 

- I Root cause identified as coordination and scenario-generation speed, not solver capability — existing deterministic crew-legality optimisation engine remains authoritative 

- I Clear architectural separation established: agent for speed and synthesis, deterministic solver for legal/safety-critical calculation, human controller for execution decisions 

- I Permanent human execution authority boundary set at Incubation, framed as a regulatory and safety line, not a temporary trust threshold 

- I Cross-domain coordination (crew, aircraft, customer recovery) identified as the core synthesis challenge for the agentic layer 

## **STAGE 2 — RANKED OPTIONS, NOT RECOMMENDATIONS** 

_Approving how an agent should frame choices to people who must decide fast | Week 5 | Friday, 3 July 2026_ 

#### _10:00 | Friday 3 July 2026 | Skyline HQ, Operations Board Room_ 

#### **Architecture Review Board (ARB) — Attendees: Sofia (EA), Derek (VP OCC), Captain Brandt (Flight Ops), Grace (Crew), Ahmet (Customer Recovery), Dr. Lacroix (Regulatory)** 

### **Dr. Pauline Lacroix — Regulatory & Safety Compliance Lead** 

I want to understand precisely how options get presented to a controller under time pressure. If the system presents a single ‘recommended’ option prominently with several ‘alternatives’ shown less prominently, that’s a design that nudges toward automation-following behaviour even without technically removing human authority. I’ve seen that pattern cause problems in other safety-critical automation contexts. 

### **Sofia Marchetti — Enterprise AI Architect** 

That’s an important design concern and I want to address it directly rather than downplay it. My plan is to present multiple ranked candidate options with equal visual prominence — ranked by a stated, visible criterion such as total passenger disruption minutes or crew cost, not by an opaque single ‘best choice’ score — and to require the controller to actively review the comparison before selecting, rather than a one-click accept on a pre-highlighted top option. I want the interface to feel like a comparison tool, not a recommendation to rubber-stamp. 

### **Ahmet Yildiz — Head of Customer Recovery** 

From my side — the options need to include a real customer-impact estimate, not just operational cost. A recovery plan that’s cheapest for crew and aircraft routing but strands three hundred connecting passengers overnight without hotel accommodation triggers a completely different cost category for us, in compensation and reputation, that the operational metrics alone won’t capture. 

### **Sofia Marchetti — Enterprise AI Architect** 

Agreed, and I want customer-impact estimation built as a first-class ranking dimension alongside operational cost and crew legality feasibility, not an afterthought bolted onto an operations-only optimisation. That means your team needs to be involved in defining what ‘customer impact’ should actually weigh — connection risk, overnight stranding, compensation exposure — as part of Design, not have it guessed at by engineering. 

### **Grace Odeh — Head of Crew Scheduling** 

What happens if the underlying solver can’t find any legally compliant option within a reasonable time — a truly severe cascade? 

### **Sofia Marchetti — Enterprise AI Architect** 

That’s an important failure mode to design for explicitly rather than let surface as a confusing timeout. If the solver can’t produce a compliant scenario within a defined time budget, the system reports that clearly — ‘no automatically-generated compliant option found within X seconds’ — and falls back to presenting the best partial analysis it has, flagged as incomplete, rather than either hanging silently or presenting something that looks complete but isn’t. 

I **ARTIFACT: ADR-2026-038** 

### **Architecture Decision Record — Agentic Disruption Control Tower** 

_Issued 3 July 2026_ 

#### **DECISION** 

Approve Option B — agentic orchestration and synthesis layer over the existing crew-legality solver, presenting multiple ranked candidate recovery options across operational, crew, and customer-impact dimensions. Certified operations controllers retain exclusive execution authority. 

#### **CONDITIONS** 

[SAFETY-001] Multiple options presented with equal visual prominence, ranked by stated visible criteria, not a single pre-highlighted ‘recommendation’ — designed to avoid automation-following bias 

[CUSTOMER-001] Customer-impact estimation (connection risk, stranding, compensation exposure) built as a first-class ranking dimension, defined jointly with Customer Recovery, not an operations-only afterthought [OPS-001] Explicit, visible failure-mode reporting when the solver cannot find a compliant option within the defined time budget — no silent timeout, no misleadingly complete-looking partial result 

[REG-001] Human controller execution authority remains absolute; no confidence-threshold exception ever introduced 

#### **ARB CHAIR SIGN-OFF** 

Derek Wallace (VP Operations Control Centre) — DATE: 03/07/2026 

### **STAGE OUTCOMES** 

- I Equal-prominence, multi-option ranked presentation approved specifically to avoid automation-following bias in a safety-critical human decision context 

- I Customer-impact estimation elevated to a first-class ranking dimension alongside operational and crew-legality cost, co-defined with Customer Recovery 

- I Explicit failure-mode reporting designed for solver time-outs, avoiding both silent failure and misleadingly complete partial output 

- I Human execution authority reaffirmed as absolute and permanent, framed by Regulatory & Safety as a design principle rather than a trust-earning milestone 

## **STAGE 3 — THE RANKING THAT QUIETLY FAVOURED ONE AIRPORT** 

_Finding a hidden bias in how "customer impact" got computed | Weeks 6–13 | July–September 2026_ 

#### _09:30 | Wednesday 12 August 2026 | Agentic Systems Lab_ 

#### **Design Working Session — Attendees: Sofia (EA), Miguel Fuentes (Lead Agentic Systems Engineer), Ahmet (Customer Recovery)** 

### **Miguel Fuentes — Lead Agentic Systems Engineer** 

First version of the customer-impact scoring model is running against historical disruption scenarios for calibration. One pattern jumped out during review: the model is systematically ranking recovery options that strand passengers at our Denver hub as less costly than equivalent stranding at smaller regional airports, even when the raw passenger counts are similar. 

### **Sofia Marchetti — Enterprise AI Architect** 

Walk me through why — is that a genuine cost difference, or an artifact of the training data? 

### **Miguel Fuentes — Lead Agentic Systems Engineer** 

It’s partially genuine — Denver has more hotel inventory and rebooking options nearby, so stranding cost there is legitimately somewhat lower in the historical data. But when I dug in further, some of the effect is an artifact: Denver is our largest hub and appears far more often in the historical training scenarios, so the model has more confident, better-calibrated estimates there, and I think it’s implicitly treating that confidence as if it reflects lower actual cost, not just better data coverage. 

### **Ahmet Yildiz — Head of Customer Recovery** 

That would be a real problem operationally — if the system systematically under-estimates stranding cost at smaller stations just because we have less historical data there, it will consistently steer recovery plans toward stranding passengers at exactly the stations where we’re least equipped to handle it well. 

### **Sofia Marchetti — Enterprise AI Architect** 

This is a data-coverage bias masquerading as a cost signal, and it’s a pattern worth generalising, not just fixing locally — wherever an agentic system’s output quality correlates with how much historical data exists for a given case, that correlation can silently bias downstream decisions toward the well-covered cases looking artificially better. I want two things: first, the customer-impact model needs to explicitly separate its estimate from its confidence in that estimate, and low-confidence, thin-data stations should carry a documented uncertainty penalty in the ranking, not be treated as equivalent to well-covered stations. Second, I want this checked across every dimension the system ranks on, not just customer impact — if crew-cost or aircraft-routing estimates have similar hub-versus-station data coverage imbalances, we need to find that before launch, not after a controller makes a bad call based on a confidently-wrong number for a small station. 

**EA'S INTERNAL THOUGHT** 

_This is a subtler version of a pattern I keep encountering across every agentic system I’ve built: a model can produce a confident, well-calibrated-looking number that is actually an artifact of data availability rather than the underlying reality it claims to measure. In fraud investigation it showed up as a hallucinated count; in the research assistant it showed up as claim-strength amplification; here it shows up as a hub-versus-station data coverage bias. The common thread is that fluency and confidence are not evidence of accuracy, and every agentic system I design from now on needs an explicit check for exactly this failure shape, tailored to its own domain._ 

#### I **ARTIFACT: SAD-2026-047** 

### **Solution Architecture Document (Extract) — Agentic Disruption Control Tower** 

_v1.0 | Approved 20 September 2026_ 

#### **SECTION 3: CROSS-DOMAIN RANKING ARCHITECTURE** 

Candidate recovery scenarios ranked across three co-equal dimensions: crew-legality feasibility (deterministic solver output), operational cost, customer impact (connection risk, stranding, compensation exposure). Each dimension estimate carries an explicit, separately-computed confidence/data-coverage indicator. 

#### **SECTION 4: DATA-COVERAGE BIAS MITIGATION** 

Station/scenario-level historical data volume tracked per ranking dimension. Estimates for low-coverage stations or scenario types carry a documented uncertainty penalty in ranking presentation, rather than being displayed with equivalent confidence to well-covered cases. Applied audit found similar, smaller coverage imbalances in aircraft-routing cost estimates for less-frequently-disrupted fleet types; same mitigation applied. 

#### **SECTION 5: FAILURE-MODE REPORTING** 

Explicit ‘no compliant option found within time budget’ reporting with best-available partial analysis, flagged incomplete, per ADR-2026-038 OPS-001. 

### **STAGE OUTCOMES** 

- I Data-coverage bias discovered in customer-impact scoring — smaller stations appeared artificially lower-cost due to thinner historical data, not genuinely lower stranding cost 

- I General principle reinforced across the whole programme portfolio: model confidence can reflect data availability rather than ground truth, requiring explicit separation and disclosure 

- I Uncertainty-penalty mechanism built into ranking presentation for low-data-coverage cases across all three ranking dimensions 

- I Audit extended proactively to check for similar coverage imbalances in crew and aircraft-routing dimensions, finding and fixing a second, smaller instance 

## **STAGE 4 — THE FIRST REAL STORM** 

_Watching the system perform under genuine time pressure for the first time | Months 4–8 | October 2026–January 2027_ 

#### _23:00 | Saturday 6 December 2026 | Operations Control Centre floor_ 

#### **Live Shadow-Mode Incident — Attendees: Sofia (EA, remote), Miguel (Lead Engineer, remote), Duty Controller Team** 

_A rapidly-developing ice storm forces ground stops at three major hub airports simultaneously. The disruption control tower is running in shadow mode — generating and ranking options in parallel with human planners, not yet authorised for controller use — during a genuine live event for the first time._ 

### **Miguel Fuentes — Lead Agentic Systems Engineer** 

System generated its first full three-hub cascade scenario set in fifty-eight seconds. Duty controllers are working the same scenario manually in parallel, as planned for this shadow-mode comparison. 

### **Sofia Marchetti — Enterprise AI Architect** 

How does the system’s option set compare to what the human team independently arrives at? 

### **Miguel Fuentes — Lead Agentic Systems Engineer** 

Broadly aligned on the top-ranked option, which is reassuring. But the human team included one strong candidate scenario — preemptively repositioning two specific aircraft to a fourth, unaffected hub — that the agent’s scenario generation didn’t surface at all in the top ten options. 

### **Sofia Marchetti — Enterprise AI Architect** 

That’s the finding I want to understand before this ever goes live for real controller use. Was that a legitimate option the agent should have found and didn’t, or was it something the deterministic solver would have rejected on legality grounds that the human planners hadn’t yet checked? 

_The following week, Miguel’s team traces the gap._ 

### **Miguel Fuentes — Lead Agentic Systems Engineer** 

Traced it. The agent’s scenario generator was seeded primarily from historical disruption patterns — which hub combinations have needed rebalancing in past events. A four-hub simultaneous disruption of this specific geography was rare enough in the historical data that the preemptive-repositioning pattern wasn’t well represented, so the generator under-explored that branch of the option space, even though the underlying solver would have confirmed it as fully legal and available. 

### **Sofia Marchetti — Enterprise AI Architect** 

So the generation step, not the evaluation step, has a coverage gap — similar shape to the data-coverage bias we found in Design, but in the scenario-generation stage rather than the ranking-estimation stage. I want scenario generation to include a systematic, rules-based sweep of structurally available options — like preemptive repositioning to any unaffected hub within range — as a floor, in addition to the pattern-matched historical generation, so genuinely available options aren’t missed just because they’re historically rare. 

#### I **ARTIFACT: GUARD-2027-002** 

### **Scenario Generation Completeness Standard** 

_v1.0 | Disruption Control Tower_ 

**FINDING** 

Historical-pattern-based scenario generation under-explores structurally available but historically rare option types, even when the deterministic solver would confirm them as legal and feasible. 

#### **REQUIREMENT** 

Scenario generation combines historical-pattern-based candidate generation with a systematic rules-based sweep of structurally available options (e.g., any unaffected hub within operational range for preemptive repositioning), ensuring rare-but-valid options are not excluded solely due to historical infrequency. 

#### **OWNER** 

AI/Agentic Systems Engineering (Miguel Fuentes), validated against every shadow-mode live event before go-live authorisation. 

### **STAGE OUTCOMES** 

- I First live shadow-mode test against a genuine major disruption surfaced a scenario-generation coverage gap missed by earlier synthetic testing 

- I Root cause traced to historical-pattern-based generation under-exploring structurally valid but historically rare option types 

- I Systematic rules-based generation sweep added as a floor alongside pattern-based generation, addressing the gap at its source 

- I Shadow-mode live-event validation established as a required pre-go-live gate, not a formality — caught a real gap that synthetic evaluation had not 

## **STAGE 5 — THE FIRST CONTROLLER-AUTHORISED DECISION** 

_Going live, and watching the ranked-options design choice prove itself | Months 9–13 | February–June 2027_ 

The Disruption Control Tower receives controller-facing go-live authorisation on 15 February 2027, following successful shadow-mode validation against six live events including the December ice storm scenario. It is used for the first time in an actual controller-authorised decision during a mechanical-issue-driven disruption at the Chicago hub on 3 March 2027. 

#### _10:00 | Monday 5 April 2027 | Operations Control Centre floor_ 

#### **Post-Incident Review — Attendees: Sofia (EA), Derek (VP OCC), Duty Controller who handled the 3 March event** 

### **Derek Wallace — VP Operations Control Centre** 

Walk me through how the tool actually performed in the controller’s hands, not just the metrics. 

### **Duty Controller — Operations Controller** 

It generated four ranked options in under a minute, each with the crew-legality, cost, and customer-impact numbers laid out side by side, including two options I hadn’t considered yet. I want to be honest — my first instinct was to just take the top-ranked one, because it was clearly labelled highest-ranked and I was under time pressure. 

### **Sofia Marchetti — Enterprise AI Architect** 

That’s exactly the automation-following instinct Dr. Lacroix flagged at the ARB, and I appreciate you being candid about it rather than just reporting a clean success story. What made you actually compare the options instead of accepting the top one? 

### **Duty Controller — Operations Controller** 

The interface genuinely doesn’t make it a one-click accept — I had to actively review the comparison table before the execution button activated, which is a small friction, but it was enough to make me actually look. When I did, I noticed the top-ranked option had a low-confidence flag on its customer-impact number because it involved a smaller station with thin historical data, exactly the pattern you all found in design testing. I ended up choosing the second-ranked option instead, because I trusted its numbers more, even though it was nominally ranked lower on the primary cost metric. 

### **Sofia Marchetti — Enterprise AI Architect** 

That’s the system working exactly as intended — not by being infallible, but by giving you enough transparent, honestly-caveated information to make a better judgment call than either a black-box ‘best answer’ or no tool at all would have given you. I want this specific example documented and used in controller training going forward, because it demonstrates precisely why we insisted on equal-prominence ranking and visible confidence flags instead of a single recommendation. 

I **ARTIFACT: OPS-2027-Q2B** 

### **Disruption Control Tower — Quarterly Operating Review** 

_Q2 2027_ 

**PERFORMANCE** 

Scenario generation time: under 90 seconds for complex multi-hub cascades (from an estimated 20–40 minutes of manual coordination previously). Recovery decision time from disruption detection to controller-authorised execution: reduced 44%, against a 40% target. 

#### **DESIGN VALIDATION** 

Documented controller case (3 March 2027 Chicago event) demonstrated the equal-prominence, confidence-flagged ranking design successfully counteracting an initial automation-following instinct — controller selected a lower-ranked-but-higher-confidence option after reviewing the comparison. 

#### **SAFETY** 

Zero incidents of controller execution authority being bypassed or reduced. All decisions remain human-authorised per REG-001. 

#### **COVERAGE** 

Data-coverage confidence flagging active across all three ranking dimensions; scenario generation completeness sweep (GUARD-2027-002) validated against 6 live shadow-mode and 4 live production events with zero missed structurally-valid options identified in post-event review. 

### **STAGE OUTCOMES** 

- I Recovery decision time reduced 44%, exceeding the 40% target, in first full operating quarter 

- I A real controller case demonstrated the equal-prominence ranking design successfully counteracting automation-following instinct under genuine time pressure 

- I Confidence-flagging mechanism from Design stage directly influenced a real operational decision, validating the fix in production, not just in testing 

- I Zero incidents of controller execution authority being bypassed; human decision boundary held throughout first operating quarter 

## **STAGE 6 — WHAT NOT TO AUTOMATE NEXT** 

_Annual review — resisting pressure to extend the system’s authority | Month 14 | August 2027_ 

#### _14:00 | Thursday 12 August 2027 | Skyline HQ, Operations Board Room_ 

#### **Annual Programme Review — Attendees: Sofia (EA), Derek (VP OCC), Captain Brandt (Flight Ops), Dr. Lacroix (Regulatory)** 

### **Derek Wallace — VP Operations Control Centre** 

A 44% decision-time reduction with zero safety incidents in the first two operating quarters is a strong result. I’ve had a board-level conversation about whether, for the lowest-severity disruption tier — single-flight delays under two hours, no crew legality risk — the system could execute automatically without waiting for controller sign-off, purely to free up controller capacity for the genuinely complex cascades. 

### **Captain Lena Brandt — Flight Operations Director** 

I understand the operational logic, and I want to think about it seriously rather than reflexively reject it — but I want to be careful about how ‘low severity’ gets defined and by whom. A single-flight delay that looks low-severity in isolation can still have second-order crew duty-hour or connecting-passenger effects that aren’t obvious without the same cross-domain analysis we require for major cascades. 

### **Sofia Marchetti — Enterprise AI Architect** 

That’s exactly the caution I’d bring too, and it echoes a boundary decision I’ve had to make in other high-stakes agentic programmes: success in one risk tier doesn’t automatically transfer authorisation to a different tier, even a nominally lower-risk one, without its own dedicated risk assessment. I’d want any autonomous-execution proposal, even for ‘simple’ cases, to go through a full fresh Incubation-to-Approve cycle with Dr. Lacroix’s team and Captain Brandt’s operational sign-off — not a scope expansion added onto this ADR’s existing approval. 

### **Dr. Pauline Lacroix — Regulatory & Safety Compliance Lead** 

Agreed, and I’d add that I want to see at least a full year of production data across a wider range of disruption types before that conversation even formally starts — two quarters, however strong, is an early result, not yet a track record. 

### **Derek Wallace — VP Operations Control Centre** 

Understood. I’ll take that framing back to the board: strong early results, no change to execution authority, any future proposal gets its own full governance cycle, not a fast-track. 

#### I **ARTIFACT: RDREC-2027-006** 

### **Annual Programme Governance Decision** 

_August 2027_ 

#### **DECISION** 

Disruption Control Tower confirmed as steady-state production for decision-support scenario generation and ranking. Autonomous execution for any disruption tier, including low-severity cases, explicitly NOT approved; any future proposal requires an independent, full Incubation-to-Approve governance cycle with Flight Operations and Regulatory & Safety sign-off, gated on a minimum of one full year of production track record. 

#### **RATIONALE** 

Even nominally low-severity disruption decisions can carry non-obvious second-order crew and passenger effects; risk-tier success does not transfer authorisation across tiers without independent evaluation. 

#### **APPROVED BY** 

Derek Wallace (VP OCC), Captain Lena Brandt (Flight Operations), Dr. Pauline Lacroix (Regulatory & Safety) 

### **STAGE OUTCOMES** 

- I Board-level pressure to extend autonomous execution, even to nominally low-severity cases, declined pending a full year of production track record and independent governance review 

- I Principle reaffirmed across the programme: risk-tier success does not transfer authorisation to a different tier automatically 

- I Human execution authority boundary sustained fourteen months into the programme despite strong performance results creating organisational pressure to relax it 

- I Programme closes its first operating year having reduced recovery decision time by 44% while holding every safety and authority boundary set at Incubation 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2026-052)|Incubation|VP OCC, Flight Ops, Crew Sched|
|Architecture Decision Record (ADR-2026-038)|Pitch / Approve|ARB, Regulatory, Customer Recovery|
|Solution Architecture Document (SAD-2026-047)|Design|Agentic Systems Eng, Customer<br>Recovery|
|Scenario Generation Completeness Standard<br>(GUARD-2027-002)|Build|AI/Agentic Systems Engineering|
|Quarterly Operating Review (OPS-2027-Q2B)|Operate|VP OCC, Duty Controllers|
|Annual Programme Governance Decision<br>(RDREC-2027-006)|Review|VP OCC, Flight Ops, Regulatory|

_“The system that gives a controller better options faster is valuable. The system that quietly makes it easier for a tired controller to stop comparing options is dangerous — and they can look identical from a dashboard.”_
