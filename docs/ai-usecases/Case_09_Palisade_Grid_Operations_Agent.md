---
title: "The Storm That Took Ninety Minutes to Diagnose"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_09_Palisade_Grid_Operations_Agent.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
last_reviewed: 2026-07-10
covers_version: "N/A"
---

#### **AGENTIC AI IN THE ENTERPRISE** 

# **The Storm That Took Ninety Minutes to Diagnose** 

Building an Agentic Grid Operations Assistant Inside a Safety-Critical Utility 

A transcript-style account following Marcus Odutayo, Enterprise AI Architect at Palisade Electric & Gas, as he builds an agentic assistant for real-time fault correlation and switching proposals — permanently excluding autonomous execution, and discovering that even a read-only security boundary can leak. 

#### **CAST OF CHARACTERS** 

#### **Marcus Odutayo** 

Enterprise AI Architect, Grid Systems (EA) — our protagonist 

#### **Diane Kowalczyk** 

VP, Grid Operations & Reliability (sponsor) 

#### **Sung-min Park** 

Chief System Operator, Control Room 

#### **Rebecca Voight** 

Lead AI Engineer, Grid Automation 

#### **Andre Fontenot** 

NERC Compliance & Reliability Standards Officer 

**Layla Haddad** 

OT Cybersecurity Lead 

#### **INCUBATION** → **PITCH / APPROVE** → **DESIGN** → **BUILD** → **OPERATE** → **REVIEW** 

Palisade Electric & Gas | Agentic Grid Operations Assistant | 2027 

## **STAGE 1 — THE STORM THAT TOOK NINETY MINUTES TO DIAGNOSE** 

_A near-miss cascading outage makes the case, and makes the boundaries obvious | Week 1 | Monday, 8 February 2027_ 

#### _08:30 | Monday 8 February 2027 | Diane Kowalczyk’s office_ 

#### **Informal Strategy Discussion — Attendees: Diane Kowalczyk (VP Grid Ops), Marcus Odutayo (EA)** 

### **Diane Kowalczyk — VP, Grid Operations & Reliability** 

Marcus, the ice storm three weeks ago took our control room operators ninety minutes to fully diagnose — seven simultaneous line faults across two substations, and correlating which faults were causing which downstream voltage anomalies took longer than it should have with the SCADA tools we have today. We came within one contingency of a cascading outage into the neighboring balancing authority. I want an agentic assistant that can correlate telemetry across the grid in real time and propose switching actions faster than a human can manually cross-reference it. 

### **Marcus Odutayo — Enterprise AI Architect** 

I can build the correlation and proposal layer — that’s a strong, well-bounded use of agentic AI. What I want to be unambiguous about before we scope anything further is that this system will never execute a switching action itself. Every proposal terminates at a human operator’s hand on the control, full stop, indefinitely, regardless of how good the proposal engine gets. Grid switching errors don’t fail gracefully — a wrong action can cascade into a blackout affecting people who have nothing to do with this system, on a timescale of seconds, not the reversible-error timescales we’re used to in most agentic AI work. 

### **Diane Kowalczyk — VP, Grid Operations & Reliability** 

Agreed completely — I wasn’t picturing autonomous execution. I want it faster diagnosis and faster proposal generation, with Sung-min’s operators still making every actual call. 

### **Marcus Odutayo — Enterprise AI Architect** 

Good. I want that as a permanent architectural boundary in the design record, not just today’s intent — the kind of thing that doesn’t get quietly relaxed eighteen months from now because the proposal accuracy looks good in hindsight. 

#### _13:30 | Wednesday 10 February 2027 | Control Room_ 

#### **Discovery Interview — Attendees: Marcus Odutayo (EA), Sung-min Park (Chief System Operator)** 

### **Sung-min Park — Chief System Operator** 

I want to push on something before this gets scoped as purely a speed problem. Ninety minutes wasn’t only a diagnosis-speed issue — part of it was that the fault pattern that day was genuinely novel, a combination we hadn’t drilled for. An agentic system trained mostly on historical fault patterns could easily be confidently wrong on a truly novel combination, and confident-and-wrong is more dangerous in this control room than slow-and-uncertain. 

### **Marcus Odutayo — Enterprise AI Architect** 

That’s the right instinct, and it maps to something I’ve had to design around before — systems tend to be quietly worse exactly in the low-data, high-novelty cases, because that’s where they have the least to go on, while often expressing the same confident tone regardless. For this system, I want every proposal to carry an explicit, calibrated novelty or confidence signal grounded in how similar the current fault pattern actually 

is to the historical training distribution — not a generic confidence score, a specific ‘how much precedent exists for this exact situation’ signal, surfaced directly to the operator. 

### **Sung-min Park — Chief System Operator** 

And I want the underlying grid-legality checking — whether a proposed switching sequence actually respects N-1 contingency rules and doesn’t violate thermal or voltage limits — to stay on our existing deterministic contingency-analysis engine, not something the language layer reasons about itself. That engine is validated and NERC-auditable. I don’t want a generative layer freelancing physics. 

### **Marcus Odutayo — Enterprise AI Architect** 

Understood — the agent orchestrates and explains, the existing deterministic contingency-analysis engine remains the sole authority on whether a proposed action is grid-legal. That mirrors the design pattern I used at Ironclad and at Skyline: the agent layer sits on top of a validated deterministic engine, it never replaces its judgment. 

#### u **EMAIL** 

**From:** Marcus Odutayo (Enterprise AI Architect) **To:** Layla Haddad (OT Cybersecurity Lead) 

**Subject:** Early Flag: Agentic Grid Operations Assistant — OT Network Boundary Needs Definition Before Design 

Layla, scoping an agentic assistant for real-time fault correlation and switching-proposal generation, execution authority remaining permanently with human operators. Before I go further, I need your team’s constraints on how this system can read SCADA/OT telemetry without creating a new attack surface into the operational technology network — I’m assuming a strict one-way, read-only data diode pattern out of OT into the agent’s environment, with the agent’s outputs surfaced only inside the existing IT-side operator workstation, never writing back into OT directly under any circumstance. Can we align on the network architecture before I let engineering start building? Marcus 

#### I **ARTIFACT: AIA-2027-014** 

### **Architecture Intake Assessment — Agentic Grid Operations Assistant** 

_Draft v0.1 | Palisade Electric & Gas_ 

#### **BUSINESS PROBLEM STATEMENT** 

Multi-fault storm events require manual cross-referencing of SCADA telemetry across substations; near-miss cascading-outage incident (Feb 2027) took 90 minutes to fully diagnose, one contingency margin from cascading beyond the balancing authority boundary. 

#### **PROPOSED SCOPE** 

Agentic assistant correlates real-time telemetry across substations, proposes switching action sequences with calibrated novelty/confidence signal, and requests validation from the existing deterministic contingency-analysis engine. Permanently excluded: autonomous execution of any switching action; any write access from the agent into the OT/SCADA network. 

#### **KEY RISK FLAGGED AT INTAKE** 

Confident-but-wrong proposals on novel, undrilled fault combinations; OT network attack-surface expansion via agent telemetry access. 

#### **NEXT STEPS** 

OT Cybersecurity network architecture review (read-only diode pattern); NERC Reliability Standards applicability review; Control Room operator workflow design session. 

### **STAGE OUTCOMES** 

- I Autonomous execution permanently excluded from scope at intake, framed as an architectural boundary rather than a current-phase limitation 

- I Existing deterministic contingency-analysis engine confirmed as sole authority on grid-legality, with the agent layer restricted to orchestration and explanation 

- I Read-only OT network access pattern proposed before any build work began, treating cybersecurity boundary design as a day-one constraint 

## **STAGE 2 — THE NERC QUESTION NOBODY WANTED TO ASK FIRST** 

_Reliability compliance turns out to reshape the entire proposal-explanation format | Week 5 | Thursday, 11 March 2027_ 

#### _10:00 | Thursday 11 March 2027 | Palisade E&G;, Reliability Governance Chamber_ 

#### **Architecture Review Board Session — Attendees: Marcus (EA), Diane (VP Grid Ops), Sung-min (Chief Operator), Andre (NERC Compliance), Layla (OT Security)** 

### **Andre Fontenot — NERC Compliance & Reliability Standards Officer** 

Before I’ll support this going to build, I need to understand how a system-generated switching proposal that an operator acts on gets documented for NERC reliability-standard compliance and post-event review. If a real incident occurs and an operator executed a switching sequence this system proposed, our reliability filing needs to show exactly what the system knew, what it didn’t know, and why the operator judged the action sound — not just ‘the AI suggested it and the operator clicked yes.’ 

### **Marcus Odutayo — Enterprise AI Architect** 

That requirement reshapes the proposal format itself, and I’d rather build it that way from the start than retrofit it after an incident. Every proposal will carry a structured, auditable reasoning trace — which telemetry drove the fault correlation, which historical precedent (if any) the pattern matches, the contingency-analysis engine’s validation result, and the novelty signal Sung-min asked for — logged and attached to the operator’s decision, not a narrative summary that reads well but can’t be independently audited line by line. 

### **Andre Fontenot — NERC Compliance & Reliability Standards Officer** 

Structured, not narrative — that matches what I need. I also want operator override or rejection of a proposal logged with equal rigor to acceptance, because reliability post-mortems need to see both what was proposed and what a qualified operator chose to do differently, and why, if they noted a reason. 

### **Sung-min Park — Chief System Operator** 

That also directly serves my earlier concern about novel fault patterns — if operators start overriding proposals in a particular pattern, that’s a signal the system is weak in a specific fault-type category, and I want that visible operationally, not just for compliance. 

### **Layla Haddad — OT Cybersecurity Lead** 

I’ll confirm the read-only diode architecture Marcus proposed is sound and testable — I want it independently penetration-tested before go-live, treating the agent’s environment as a hostile-adjacent zone to the OT network even though it’s read-only, because a compromised read path can still be a reconnaissance vector for a separate attack. 

**EA'S INTERNAL THOUGHT** 

_Andre’s question was uncomfortable in the moment — it would have been easy to treat NERC documentation as a downstream paperwork concern to solve after the technical design was locked. But it fundamentally changed the shape of the proposal-explanation architecture, in a good way: the structured reasoning trace requirement is a stronger design than anything I would have arrived at purely from the control-room usability angle. Compliance requirements, taken seriously early, keep functioning as a forcing function toward better engineering, not just toward paperwork — the same pattern I saw with Ironclad’s safety review driving the structured-trace requirement there._ 

#### I **ARTIFACT: ADR-2027-031** 

### **Architecture Decision Record — Agentic Grid Operations Assistant** 

_Approved v1.0 | Palisade Electric & Gas_ 

#### **DECISION** 

Approved to Design/Build. Proposal-generation and telemetry-correlation only; autonomous execution permanently excluded. Structured, auditable reasoning trace mandatory on every proposal, logged with equal rigor for accepted and overridden proposals. 

#### **RATIONALE** 

NERC reliability-standard post-event documentation requires independently auditable basis for any operator-executed switching action informed by the system; narrative-only explanation insufficient for compliance filing standard. 

#### **CONDITIONS** 

Independent penetration test of read-only OT data diode prior to go-live; contingency-analysis engine remains sole grid-legality authority; override-pattern monitoring by fault-type category as standing operational requirement. 

#### **APPROVED BY** 

ARB Panel, Diane Kowalczyk (VP Grid Ops), Andre Fontenot (NERC Compliance), Layla Haddad (OT Security) 

### **STAGE OUTCOMES** 

- I NERC compliance documentation requirement reshaped the proposal architecture into a structured, auditable reasoning trace rather than narrative explanation 

- I Override logging mandated with equal rigor to acceptance logging, extending compliance auditability to operator judgment as well as system output 

- I Independent penetration testing of the read-only OT data diode made a go-live gate rather than a best-effort security review 

## **STAGE 3 — TWO TIERS, ONE HARD LINE** 

_Designing autonomy tiers for a domain where one of the tiers can never move | Weeks 7–12 | March–April 2027_ 

#### _11:00 | Tuesday 30 March 2027 | Grid Automation Engineering lab_ 

#### **Design Working Session — Attendees: Marcus (EA), Rebecca Voight (Lead AI Eng), Sung-min (Chief Operator)** 

### **Rebecca Voight — Lead AI Engineer, Grid Automation** 

I want to propose splitting this into two genuinely different subsystems rather than one system with an autonomy dial, because the risk profiles aren’t on the same axis at all. Transmission-level switching — substations, high-voltage lines, anything that touches N-1 contingency margins — stays exactly where we scoped it: propose-only, permanent human execution, no exceptions. But we also have residential demand-response — asking enrolled smart thermostats to pre-cool before a peak event — which is a fundamentally lower-stakes, individually-reversible action operating on a completely different risk surface. 

### **Marcus Odutayo — Enterprise AI Architect** 

I want to be precise about why that split is legitimate rather than scope creep back toward autonomy, because I’ve seen this exact reasoning misused before — at Ironclad, and implicitly at Skyline. The test isn’t ‘this other thing seems lower stakes so it can inherit more autonomy from the same system.’ It’s whether demand-response participation, on its own, independent merits, clears a bar for autonomous action: individually reversible, financially and physically bounded per action, no cascading failure mode, and enrolled customers who’ve explicitly consented to automated participation. If it clears that bar independently, it can have graduated autonomy. If it only clears the bar because it’s riding alongside the transmission system’s credibility, that’s exactly the mistake to avoid. 

### **Sung-min Park — Chief System Operator** 

Demand-response clears it on its own merits as far as I’m concerned — it’s architecturally almost a different system, just sharing telemetry infrastructure. I’d treat them as two products under one programme, not one product with two modes. 

### **Rebecca Voight — Lead AI Engineer, Grid Automation** 

Agreed — I’ll build them as genuinely separate services with separate autonomy governance, sharing only the underlying telemetry ingestion layer, so there’s no code path where a confidence signal from one bleeds into authorization for the other. 

#### **EA'S INTERNAL THOUGHT** 

_This is the cleanest articulation I’ve managed yet of a principle I’ve been circling since Ironclad and Skyline: success or lower risk in one domain doesn’t transfer autonomy to an adjacent domain, even when they share a name, a sponsor, and an engineering team. The discipline isn’t refusing to ever grant more autonomy — demand-response genuinely earns graduated autonomy on its own terms. The discipline is making sure every grant of autonomy is argued on that specific action’s own risk profile, and never inherited by proximity to something else that already earned trust._ 

I **ARTIFACT: SAD-2027-022** 

### **Solution Architecture Document — Agentic Grid Operations Assistant** 

_v1.0 | Palisade Electric & Gas_ 

#### **SUBSYSTEM A — TRANSMISSION SWITCHING ADVISORY** 

Propose-only, permanent. Structured reasoning trace + novelty/confidence signal per proposal. Contingency-analysis engine is sole grid-legality authority. Read-only OT data diode, penetration-tested. 

#### **SUBSYSTEM B — RESIDENTIAL DEMAND-RESPONSE ORCHESTRATION** 

Graduated autonomy for enrolled, consented participants only. Tier 1 (propose, human dispatcher confirms aggregate event); Tier 2 (autonomous dispatch within pre-approved per-event load-shed ceiling, individually reversible, financially bounded). Independently governed; no shared authorization pathway with Subsystem A. 

#### **SHARED INFRASTRUCTURE** 

Telemetry ingestion layer only. No shared confidence-scoring, authorization, or execution code paths between subsystems. 

### **STAGE OUTCOMES** 

- I Two subsystems with independently justified, non-transferable autonomy profiles designed under one programme rather than one system with a shared autonomy dial 

- I "Autonomy must be earned on the specific action’s own risk profile, never inherited by proximity" articulated as an explicit, reusable architectural principle 

- I Shared infrastructure limited to telemetry ingestion, with no code path allowing authorization logic to bleed between the transmission and demand-response subsystems 

## **STAGE 4 — THE PENETRATION TEST FOUND SOMETHING** 

_A read-only data diode turns out not to be as one-way as its name suggests | Weeks 16–22 | May–June 2027_ 

#### _09:00 | Monday 7 June 2027 | OT Cybersecurity lab_ 

#### **Penetration Test Findings Review — Attendees: Marcus (EA), Layla (OT Security), Rebecca (Lead AI Eng)** 

### **Layla Haddad — OT Cybersecurity Lead** 

The independent penetration test found a real issue, and I’m glad we gated go-live on it. The data diode is genuinely one-way at the network layer — no packets flow from IT back into OT. But the telemetry polling schedule the agent uses to request data updates is itself a signal channel: an attacker who compromised the IT-side agent environment could manipulate the timing and pattern of polling requests in a way that, over time, could be read by something monitoring the OT side as a crude covert channel. It’s a low-bandwidth, sophisticated attack path, but it exists. 

### **Rebecca Voight — Lead AI Engineer, Grid Automation** 

That’s a genuinely subtle finding — I wouldn’t have thought to test for a timing-based covert channel through a read-only polling interface. We can fix it by moving from agent-initiated polling to a fixed-interval, fixed-pattern OT-side push instead — the OT side pushes telemetry out on an unvarying schedule regardless of what the agent requests, which eliminates the agent’s ability to influence the timing signal at all. 

### **Marcus Odutayo — Enterprise AI Architect** 

I want to note this for the broader programme record, not just this fix: ‘read-only’ is a necessary but not sufficient security property when the read pattern itself can carry information. This is the same category of lesson as the prompt-injection provenance work at Meridian — the naive security boundary was correct as far as it went, and still needed a second, less obvious layer once someone specifically tried to break it. Layla, I want this documented as a standing red-team pattern for any future agent that touches OT telemetry, not filed as a one-off finding on this project. 

#### **EA'S INTERNAL THOUGHT** 

_I approved the read-only diode pattern at intake feeling confident it was the right, conservative boundary — and it was the right boundary, but confidence in a security architecture’s soundness and confidence that it’s been adequately red-teamed are not the same thing, and I need to keep separating those two kinds of confidence in my own head. The fix here is straightforward once found. The value was entirely in insisting on independent, adversarial testing rather than accepting my own design review as sufficient._ 

#### I **ARTIFACT: OT-SEC-2027-004** 

### **OT Network Boundary Remediation Record** 

_Palisade Electric & Gas OT Cybersecurity_ 

#### **FINDING** 

Agent-initiated telemetry polling pattern constitutes a low-bandwidth covert-channel risk through an otherwise correctly one-way data diode. 

**REMEDIATION** 

Polling architecture replaced with fixed-interval, fixed-pattern OT-side push; agent has no mechanism to influence telemetry timing or request pattern. 

#### **RE-TEST RESULT** 

Independent re-test confirms covert-channel path closed; diode architecture approved for go-live. 

#### **STANDING REQUIREMENT** 

Timing-channel red-team analysis added as a mandatory test category for any future agentic system with OT telemetry access, beyond standard directional data-flow verification. 

### **STAGE OUTCOMES** 

- I Independent penetration testing caught a covert-channel risk that internal design review, however careful, had not anticipated 

- I "Read-only is necessary but not sufficient" formalized as a standing security principle for OT-adjacent agentic systems 

- I Timing-channel analysis added permanently to the test requirements for any future system touching OT telemetry 

## **STAGE 5 — THE NOVELTY SIGNAL DOES ITS JOB DURING A REAL EVENT** 

_The design holds under an actual multi-fault event, not a drill | Months 3–9 | September 2027–March 2028_ 

Go-live for Subsystem A (Transmission Switching Advisory) occurs 1 September 2027; Subsystem B (Demand-Response) follows 15 October 2027 after separate, independent validation. Average multi-fault diagnosis time falls from a baseline of 45–90 minutes to under 12 minutes in the first two quarters. Demand-response autonomous dispatch handles 61% of peak-shaving events within pre-approved load-shed ceilings. 

#### _02:15 | Saturday 22 January 2028 | Control Room, overnight ice event_ 

#### **Live Multi-Fault Event — Attendees: Sung-min (Chief Operator), overnight operations shift** 

### **Sung-min Park — Chief System Operator** 

[Post-event report, reviewed with Marcus the following Monday] We had five simultaneous line faults across two substations at 2:15 AM — a genuinely novel combination, similar in shape to the February 2027 event but not identical. The system correctly flagged low precedent confidence on three of the five proposed switching actions, explicitly stating limited historical basis, and the overnight operator on duty treated those three with proportionally more scrutiny — cross-checking manually against the contingency-analysis engine’s output directly rather than accepting the proposal’s framing. Full diagnosis and safe switching sequence completed in fourteen minutes. 

#### _10:00 | Monday 24 January 2028 | Control Room_ 

#### **Post-Event Review — Attendees: Marcus (EA), Sung-min (Chief Operator), Andre (NERC Compliance)** 

### **Marcus Odutayo — Enterprise AI Architect** 

Fourteen minutes versus the ninety minutes that started this whole programme, on an event that was, if anything, slightly more complex than the original. But I want to focus on the part that actually validates the design intent rather than just the speed number: the novelty signal did exactly what it was built for — it didn’t just produce a fast answer, it told the operator specifically where to be more skeptical, and the operator used that signal as intended rather than treating every proposal with uniform trust. 

### **Andre Fontenot — NERC Compliance & Reliability Standards Officer** 

The structured reasoning trace and the operator’s documented additional scrutiny on the three low-confidence proposals gives us a genuinely strong reliability filing for this event — exactly the kind of ‘what the system knew, what it didn’t know, what the operator did about it’ record I asked for at approval. This is the first live event that’s tested that requirement end to end, and it held. 

### **Sung-min Park — Chief System Operator** 

I’d also flag, for the record, that this is the first time an overnight shift — not our most experienced day-shift operators — handled an event of this complexity this cleanly. The novelty signal seems to be doing some of the calibration work that used to depend heavily on individual operator experience. 

#### I **ARTIFACT: OPS-2028-Q1** 

### **Agentic Grid Operations Assistant — Quarterly Operating Review** 

_Q1 2028_ 

#### **DIAGNOSIS PERFORMANCE** 

Average multi-fault diagnosis time: 45–90 min baseline to under 12 min average, 14 min on the January 22 novel five-fault event. 

#### **DEMAND-RESPONSE PERFORMANCE** 

Autonomous dispatch handled 61% of peak-shaving events within pre-approved ceilings; zero ceiling breaches; zero customer complaints attributable to dispatch errors. 

#### **SAFETY & COMPLIANCE** 

Zero autonomous transmission-switching actions (by design, permanent restriction holding). Structured reasoning trace validated end-to-end in live novel-event conditions; NERC reliability filing for Jan 22 event assessed as strong by Compliance. 

#### **OT SECURITY** 

Zero anomalous telemetry-channel activity since covert-channel remediation; quarterly independent audit continuing per standing requirement. 

### **STAGE OUTCOMES** 

- I Novel five-fault live event resolved in 14 minutes versus a 45–90 minute historical baseline, validating the core business case under real, not drilled, conditions 

- I Novelty/confidence signal demonstrated its intended function — calibrating operator scrutiny rather than just producing a fast answer — during a genuine novel-pattern event 

- I Structured reasoning trace requirement validated end-to-end for the first time in a live NERC-reportable event, confirming the Pitch-stage compliance design held under real conditions 

## **STAGE 6 — THE PRESSURE TO CLOSE THE LOOP** 

_A strong year of data brings the execution question back — and the line holds again | Month 14 | November 2028_ 

#### _14:00 | Thursday 9 November 2028 | Palisade E&G;, Reliability Governance Chamber_ 

#### **Annual Programme Review — Attendees: Marcus (EA), Diane (VP Grid Ops), Sung-min (Chief Operator), Andre (NERC Compliance)** 

### **Diane Kowalczyk — VP, Grid Operations & Reliability** 

Fourteen months, diagnosis time down roughly eighty-five percent, zero switching errors, one live event that validated the whole design under real pressure. I want to raise the execution question one more time — not full autonomy, but for a narrow category of clearly-legal, contingency-engine-validated, low-consequence switching actions during confirmed high-novelty-confidence events, could the system execute with an operator able to abort within a short confirmation window, rather than requiring the operator to actively initiate every action? 

### **Marcus Odutayo — Enterprise AI Architect** 

I understand the instinct — a confirmation-window model sounds like a reasonable middle ground, and it’s a genuinely different proposal than the blanket autonomy we’d have rejected outright. But I want to walk through why I still don’t think it’s the right move, using the reasoning we’ve held to since the intake conversation: a confirmation-window default-to-execute model changes the operator’s cognitive posture from ‘actively deciding to act’ to ‘actively deciding to intervene,’ and those are not symmetric — intervention under time pressure is exactly where automation bias does its damage, especially at 2 AM on an overnight shift, which is precisely when Sung-min’s team told us these events tend to happen. 

### **Sung-min Park — Chief System Operator** 

I’ll back that from the operator side. The January event worked specifically because the operator was actively evaluating each proposal, including scrutinizing the low-confidence ones harder. A default-to-execute model with an abort window would have changed what that operator was doing at 2 AM from ‘evaluate, then act’ to ‘watch and catch mistakes,’ which is a fundamentally harder cognitive task, not an easier one, and it’s the task most likely to fail exactly when someone is fatigued. 

### **Andre Fontenot — NERC Compliance & Reliability Standards Officer** 

I’d also note the reliability filing implications shift materially — ‘the operator actively executed a system-proposed action’ and ‘the operator failed to abort a system-initiated action in time’ are very different postures for a post-event compliance review, even if the outcome in a given case is identical. 

### **Diane Kowalczyk — VP, Grid Operations & Reliability** 

That’s a more precise objection than I was expecting, and I find it convincing. I’d rather keep the strong track record we have than trade a real cognitive-posture risk for a marginal speed gain we haven’t clearly demonstrated we need — fourteen minutes on a five-fault novel event is already well within safe operating margins. 

I **ARTIFACT: RDREC-2028-021** 

### **Annual Programme Governance Decision** 

_November 2028_ **DECISION** 

Agentic Grid Operations Assistant (Subsystems A & B) confirmed as steady-state production. Proposed confirmation-window default-to-execute model for Subsystem A declined; permanent propose-only, active-initiation execution model reaffirmed without exception. 

#### **RATIONALE** 

Default-to-execute with abort window materially changes operator cognitive posture from active decision to passive intervention, elevating automation-bias risk specifically under the fatigue and time-pressure conditions where high-novelty events concentrate; no demonstrated operational need outweighs this risk given current performance margins. 

#### **APPROVED BY** 

Diane Kowalczyk (VP Grid Ops), Sung-min Park (Chief System Operator), Andre Fontenot (NERC Compliance) 

### **STAGE OUTCOMES** 

- I A more sophisticated execution-autonomy proposal — confirmation-window default-to-execute, not blanket autonomy — was raised on strong data and still declined on cognitive-posture grounds 

- I "Active decision versus passive intervention" articulated as a distinct risk axis from prediction accuracy, directly informing the reaffirmed permanent boundary 

- I Demand-response graduated autonomy continued independently on its own validated track record, with no scope bleed from the transmission-side decision 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2027-014)|Incubation|VP Grid Ops, Chief Operator, OT<br>Security|
|Architecture Decision Record (ADR-2027-031)|Pitch / Approve|ARB, NERC Compliance, OT Security|
|Solution Architecture Document (SAD-2027-022)|Design|AI Engineering, Chief Operator|
|OT Network Boundary Remediation Record<br>(OT-SEC-2027-004)|Build|OT Cybersecurity, AI Engineering|
|Quarterly Operating Review (OPS-2028-Q1)|Operate|Chief Operator, NERC Compliance|
|Annual Programme Governance Decision<br>(RDREC-2028-021)|Review|VP Grid Ops, Chief Operator, NERC<br>Compliance|

_“Every grid failure I’ve ever read a post-mortem on started with someone reasonably confident they understood what was happening. The job was never to make the system more confident. It was to make sure the humans in that control room stayed exactly as alert at 2 AM on the good nights as they were the night the diagnosis took ninety minutes.”_
