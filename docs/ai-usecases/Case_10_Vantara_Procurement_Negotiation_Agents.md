---
title: "The Spot-Rate Market Nobody Could Watch Fast Enough"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_10_Vantara_Procurement_Negotiation_Agents.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
last_reviewed: 2026-07-10
covers_version: "N/A"
---

#### **AGENTIC AI IN THE ENTERPRISE** 

# **The Spot-Rate Market Nobody Could Watch Fast Enough** 

Building an Agentic Procurement Negotiation Platform Inside a Global Logistics Carrier 

A transcript-style account following Adaeze Nwachukwu, Enterprise AI Architect at Vantara Global Logistics, as she builds an agentic negotiation platform bounded to price and volume only — and catches, one clause at a time, exactly how a permanent boundary can almost be breached by accident before it is ever breached on purpose. 

#### **CAST OF CHARACTERS** 

#### **Adaeze Nwachukwu** 

Enterprise AI Architect, Procurement Systems (EA) — our protagonist 

#### **Piers Whitfield** 

Chief Procurement Officer (CPO) — sponsor 

#### **Dmitri Volkov** 

Lead AI Engineer, Negotiation Systems 

#### **Fatima Rasheed** 

Head of Vendor Risk & Contracts 

#### **Callum Ng** 

VP, Freight & Carrier Sourcing 

**Beatrix Solheim** 

Internal Audit Lead 

#### **INCUBATION** → **PITCH / APPROVE** → **DESIGN** → **BUILD** → **OPERATE** → **REVIEW** 

Vantara Global Logistics | Agentic Procurement Negotiation Platform | 2027 

## **STAGE 1 — THE SPOT-RATE MARKET NOBODY COULD WATCH FAST ENOUGH** 

_A volatile freight market makes the business case for speed — and the risk case for guardrails, in the same breath | Week 1 | Monday, 4 January 2027_ 

#### _09:00 | Monday 4 January 2027 | Piers Whitfield’s office_ 

#### **Informal Strategy Discussion — Attendees: Piers Whitfield (CPO), Adaeze Nwachukwu (EA)** 

### **Piers Whitfield — Chief Procurement Officer** 

Adaeze, spot freight rates on our top forty lanes move meaningfully within a single trading day, sometimes within hours during a capacity crunch, and our sourcing team can’t realistically monitor and renegotiate forty lanes simultaneously against a shifting market. I want an agentic system that can run continuous, concurrent negotiations with our carrier and vendor panel and lock in rates the moment they clear our target thresholds, without a human having to be watching every lane every minute. 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

That’s a real problem and a legitimate use of agentic AI for the price-discovery and negotiation-tactics part of this. But I want to name the two risks that come baked into ‘autonomous negotiation’ as a category before we scope anything, because they’re structurally different from most agentic AI risk I’ve dealt with. First: a negotiating agent can be deliberately manipulated by a sophisticated counterparty — vendors talk to each other, and a vendor who figures out our agent’s negotiating pattern can exploit it in ways a human negotiator using judgment and variability wouldn’t be as exploitable to. Second: price is only one term in a contract, and I’m not comfortable with an agent autonomously agreeing to liability, indemnification, or exclusivity language just because the price cleared threshold. 

### **Piers Whitfield — Chief Procurement Officer** 

Fair on both counts. I was mainly thinking price and volume commitments within pre-set bands — I wasn’t picturing it rewriting our master service agreements. 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

Then let’s make that boundary explicit and permanent in the design, not just today’s framing — autonomous authority strictly on price and volume within pre-approved bands, against standard, legally pre-cleared contract templates only. Any deviation from the standard template, any term outside price and volume, any vendor request that looks like it’s probing for a pattern rather than negotiating in good faith — escalates to a human, every time. 

#### _14:00 | Wednesday 6 January 2027 | Vendor Risk & Contracts floor_ 

#### **Discovery Interview — Attendees: Adaeze Nwachukwu (EA), Fatima Rasheed (Head of Vendor Risk & Contracts)** 

### **Fatima Rasheed — Head of Vendor Risk & Contracts** 

I want to flag a manipulation vector that’s specific to this domain and easy to underestimate: information leakage across concurrent negotiations. If the same agent, or agents sharing any pricing logic, are negotiating with Carrier A and Carrier B on the same lane at the same time, and a savvy counterparty can infer anything about our reservation price or our negotiating pattern from how we behaved with a different carrier, that’s a material commercial harm, and it’s a much subtler failure than a single bad deal. 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

That’s a sharper version of a problem I’ve seen in a different shape before — in Northline’s customer service agents, information sharing across contexts had to be deliberately scoped and allow-listed rather than left as ambient shared context. Here the stakes are commercial rather than privacy, but the design principle is the same: negotiations with different counterparties need to be architecturally isolated from each other, not just prompted to behave as if they were. I’ll need to design that as a hard isolation boundary, not a policy instruction to the agent. 

### **Fatima Rasheed — Head of Vendor Risk & Contracts** 

Agreed, and I want one more standing requirement: any negotiation, at any time, that shows a pattern suggestive of counterparty manipulation — unusual probing questions, rapid re-quoting designed to trigger a reveal, anything that looks like it’s testing the agent rather than negotiating a deal — needs an independent escalation authority that can freeze that specific negotiation immediately, without going through me or Piers first. Speed of freeze matters here the same way it mattered for Harborstone’s fraud freeze. 

#### u **EMAIL** 

**From:** Adaeze Nwachukwu (Enterprise AI Architect) 

**To:** Beatrix Solheim (Internal Audit Lead) 

**Subject:** Early Flag: Agentic Negotiation Platform — Spend-Ceiling and Audit Trail Requirements Needed Before Design Freeze 

Beatrix, scoping an agentic negotiation platform restricted to price/volume authority within pre-approved bands, against pre-cleared contract templates only, with anomalous-pattern freeze authority sitting independently with Vendor Risk. Before I freeze the design, I need your team’s requirements on spend-ceiling controls — both per-negotiation and aggregate concurrent exposure across all live negotiations — and on what audit trail granularity you’ll need to reconstruct any single negotiation’s full reasoning after the fact. I’d rather build this in from day one than retrofit it after an audit finding. Can we set a working session this week? Adaeze 

#### I **ARTIFACT: AIA-2027-002** 

### **Architecture Intake Assessment — Agentic Procurement Negotiation Platform** 

_Draft v0.1 | Vantara Global Logistics_ 

#### **BUSINESS PROBLEM STATEMENT** 

Spot freight rates on 40 top lanes move materially within a trading day; sourcing team cannot continuously monitor and renegotiate all lanes concurrently against a shifting market, resulting in missed favorable-rate windows and reactive rather than proactive sourcing. 

#### **PROPOSED SCOPE** 

Agentic platform runs continuous, concurrent negotiations against pre-approved price/volume bands and pre-cleared standard contract templates only. Permanently excluded: any autonomous agreement on liability, indemnification, exclusivity, or any non-price/volume term; any deviation from standard template language. 

#### **KEY RISK FLAGGED AT INTAKE** 

Counterparty manipulation of negotiating pattern; cross-negotiation information leakage between concurrently-run counterparties; aggregate concurrent spend exposure across simultaneous negotiations. 

#### **NEXT STEPS** 

Vendor Risk anomaly-detection and independent freeze-authority design; Internal Audit spend-ceiling and audit-trail granularity requirements; Legal pre-clearance of standard template variants eligible for autonomous use. 

### **STAGE OUTCOMES** 

- I Autonomy boundary set at intake: price and volume within pre-approved bands against pre-cleared templates only, all other terms permanently excluded from autonomous authority 

- I Cross-negotiation information isolation identified as a distinct, commercially-material risk requiring hard architectural separation, not policy instruction 

- I Independent freeze authority for anomalous/manipulation-pattern negotiations proposed at intake, modeled on the Harborstone fraud-freeze mechanism 

## **STAGE 2 — THE BOARD ASKS WHO GETS TO PULL THE PLUG** 

_Escalation authority becomes the center of the approval debate, not negotiation tactics | Week 4 | Thursday, 28 January 2027_ 

#### _10:00 | Thursday 28 January 2027 | Vantara HQ, ARB Chamber_ 

#### **Architecture Review Board Session — Attendees: Adaeze (EA), Piers (CPO), Fatima (Vendor Risk), Beatrix (Internal Audit), Callum (Freight Sourcing)** 

### **ARB Chair (Deputy CFO) — —** 

Ms. Nwachukwu, the projected savings from continuous rate optimization are substantial, and I don’t doubt the technical design. My question is about authority: if this system commits Vantara to a $2 million annual freight contract at 2 AM while every relevant human is asleep, who is accountable for that commitment, and what stops a bad one from happening before anyone notices? 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

Three separate controls answer that, and I want to walk through them as layers rather than one mechanism, because no single control here is sufficient alone. First, hard spend ceilings — per-negotiation and aggregate concurrent exposure — set by Finance and Procurement leadership, not engineering, enforced architecturally so the system cannot commit above them regardless of what the negotiation logic proposes. Second, every autonomous commitment is against a pre-cleared standard template only — there’s no version of this where novel contract language gets agreed to without a human. Third, and this is the piece Fatima’s team designed, independent freeze authority that can halt any specific negotiation immediately on anomaly detection, without needing to route through me or Piers. 

### **Fatima Rasheed — Head of Vendor Risk & Contracts** 

I’d add: accountability for an autonomous commitment within all three of those controls sits with Procurement leadership who set the bands and approved the templates, the same as it would if a junior buyer made that commitment within their delegated authority — this isn’t a novel accountability question, it’s the same delegated-authority framework Vantara already uses for human buyers, applied to a system operating within an equivalently bounded mandate. 

### **Callum Ng — VP, Freight & Carrier Sourcing** 

I want to add an operational safeguard on top of the governance ones: I want a standing daily reconciliation review, human-led, of every commitment the system made in the prior 24 hours, regardless of whether anything looked anomalous — not because I distrust the controls, but because a review cadence that only triggers on detected anomalies will systematically miss the anomaly type nobody thought to detect for yet. 

### **Beatrix Solheim — Internal Audit Lead** 

I support approval on the condition that the audit trail granularity I specified with Adaeze last week — full reasoning trace per negotiation, retrievable and reconstructable individually — is a go-live gate, not a nice-to-have added later. 

**EA'S INTERNAL THOUGHT** 

_The Deputy CFO’s 2 AM question was the right one to lead with, and I’m glad it came first rather than getting buried under negotiation-tactics questions. It forced the room to focus on exactly the layered-control architecture that actually matters here — hard ceilings, template restriction, independent freeze authority, and now Callum’s daily reconciliation on top. None of these controls is exotic on its own. The design discipline is in making sure they’re genuinely independent of each other, so a single point of failure in one doesn’t compromise the whole stack._ 

#### I **ARTIFACT: ADR-2027-006** 

### **Architecture Decision Record — Agentic Procurement Negotiation Platform** 

_Approved v1.0 | Vantara Global Logistics_ 

#### **DECISION** 

Approved to Design/Build. Autonomous authority strictly on price/volume within Finance/Procurement-set bands, against pre-cleared standard templates only. All non-price/volume terms, and any template deviation, permanently require human negotiation. 

#### **RATIONALE** 

Layered control architecture (hard spend ceilings, template restriction, independent freeze authority, daily human reconciliation) addresses commitment-risk without relying on any single control as sufficient alone; mirrors existing delegated-authority accountability framework used for human buyers. 

#### **CONDITIONS** 

Full per-negotiation audit trail reconstructable individually, mandatory go-live gate. Daily human-led reconciliation review of all prior-24-hour commitments regardless of anomaly flags. Cross-negotiation information isolation independently verified before go-live. 

#### **APPROVED BY** 

ARB Panel, Piers Whitfield (CPO), Fatima Rasheed (Vendor Risk), Beatrix Solheim (Internal Audit) 

### **STAGE OUTCOMES** 

- I Approval organized around a layered-control architecture rather than any single mechanism, explicitly designed so no one control’s failure compromises the whole system 

- I Accountability for autonomous commitments mapped onto Vantara’s existing delegated-authority framework rather than treated as a novel governance question 

- I Daily human reconciliation review adopted specifically to catch anomaly types the detection system hasn’t been built to recognize yet, not as redundant to anomaly detection 

## **STAGE 3 — THE CARRIER THAT WAS LEARNING OUR PATTERN** 

_Red-teaming the negotiation agent against a sophisticated, adversarial counterparty | Weeks 6–12 | February–March 2027_ 

#### _11:00 | Tuesday 2 March 2027 | Negotiation Systems Engineering lab_ 

#### **Red-Team Exercise Review — Attendees: Adaeze (EA), Dmitri Volkov (Lead AI Eng), Fatima (Vendor Risk)** 

### **Dmitri Volkov — Lead AI Engineer, Negotiation Systems** 

We ran the adversarial red-team Fatima’s team designed — a simulated sophisticated counterparty deliberately probing for our agent’s negotiating pattern across repeated interactions. The result confirms the concern from intake: after roughly fifteen to twenty simulated negotiation rounds on the same lane, the adversarial counterparty model was able to infer our agent’s concession pattern with enough accuracy to consistently extract terms close to our ceiling rather than our target, without ever appearing to behave adversarially in any single interaction. 

### **Fatima Rasheed — Head of Vendor Risk & Contracts** 

That’s exactly the risk shape I was worried about — individually, none of those fifteen or twenty rounds would trigger an anomaly flag, because no single interaction looks like manipulation. It’s only visible in aggregate, across many rounds, the same way Harborstone’s fraud cluster only showed up in aggregate even though every individual claim was clean. 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

So the fix can’t be purely reactive anomaly detection on individual negotiations — we need deliberate negotiating-pattern variability built into the agent itself, the same way a skilled human negotiator naturally varies tactics rather than running an identical script every time, plus a standing analysis layer that looks specifically for counterparties whose extracted terms are trending toward our ceiling over a rolling window of interactions, which is a different signal than any single-negotiation anomaly check. 

### **Dmitri Volkov — Lead AI Engineer, Negotiation Systems** 

I can build both. Pattern variability is a legitimate negotiation-strategy improvement on its own merits, not just a security patch — real negotiators vary tactics partly because predictability is a genuine commercial weakness, independent of any adversarial framing. 

#### **EA'S INTERNAL THOUGHT** 

_This finding is the clearest validation yet of Fatima’s cross-negotiation and pattern-manipulation concerns from intake — and it came from deliberately, adversarially trying to break the system before launch rather than discovering it live, the same discipline that caught Harborstone’s claims-cluster vulnerability and Ironclad’s corrupted-supplier-data injection risk before go-live in both of those programmes. I want to keep resisting the temptation to treat a clean red-team result as sufficient reassurance — the value here came specifically from the exercise being hard enough to find something._ 

I **ARTIFACT: SEC-RT-2027-011** 

### **Adversarial Red-Team Exercise Report — Negotiation Pattern Exploitation** 

_Vantara Global Logistics Vendor Risk_ 

#### **FINDING** 

Simulated sophisticated counterparty inferred agent negotiating pattern after 15–20 rounds on a single lane, extracting terms near ceiling rather than target, with no single round triggering existing anomaly detection. 

#### **REMEDIATION — PATTERN VARIABILITY** 

Deliberate tactical variability built into negotiation strategy generation, framed as both a security mitigation and an independently legitimate negotiation-quality improvement. 

#### **REMEDIATION — ROLLING-WINDOW ANALYSIS** 

New standing detection layer analyzing extracted-terms trend per counterparty over a rolling interaction window, distinct from and complementary to single-negotiation anomaly detection. 

#### **RE-TEST RESULT** 

Repeat adversarial exercise post-remediation shows no consistent pattern-exploitation advantage over 40+ simulated rounds; rolling-window analysis flagged the simulated adversarial counterparty by round 22. 

### **STAGE OUTCOMES** 

- I Adversarial red-teaming confirmed the intake-stage manipulation concern with a concrete, quantified exploitation pattern before any live exposure 

- I Remediation combined a genuine negotiation-quality improvement (tactical variability) with a new detection capability (rolling-window trend analysis), rather than relying on detection alone 

- I "Individually clean, aggregately suspicious" reaffirmed as a cross-domain manipulation pattern requiring rolling or aggregate analysis layers, not just per-instance checks 

## **STAGE 4 — THE TEMPLATE THAT WASN’T QUITE STANDARD** 

_A near-miss on the hard boundary between price and contract terms | Weeks 14–20 | April–May 2027_ 

#### _15:00 | Wednesday 21 April 2027 | Negotiation Systems Engineering lab_ 

#### **Build Review — Attendees: Adaeze (EA), Dmitri (Lead AI Eng), Fatima (Vendor Risk)** 

### **Fatima Rasheed — Head of Vendor Risk & Contracts** 

Reviewing this week’s completed test negotiations, I found one that concerns me. The agent autonomously agreed to a rate with Carrier Meridian Freight on the Rotterdam–Singapore lane, correctly within the price band and against what the system logged as the standard template. But when I pulled the actual finalized document, Carrier Meridian had inserted a modified force majeure clause during the exchange — broader than our standard language — and the agent accepted it as part of the same document without flagging it as a template deviation. 

### **Dmitri Volkov — Lead AI Engineer, Negotiation Systems** 

That’s a real gap, not a theoretical one — our template-match check was comparing document structure and the price/volume fields, but wasn’t doing clause-level semantic comparison against the pre-cleared reference language for every non-price clause. A structurally-standard-looking document with modified boilerplate slipped through a check that was really only verifying the parts we were actively looking at. 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

This is precisely the boundary violation we built the whole permanent-exclusion rule at intake specifically to prevent, and it almost got through on a technicality of how ‘standard template’ was operationally defined rather than through any negotiation-strategy failure. I want a hard fix, not a tuned threshold: clause-level semantic diff against the pre-cleared reference text for every clause in the document, not just price/volume fields, with any detected deviation — however minor it looks — automatically routing the entire document to Legal, no exceptions, before any commitment is finalized. 

### **Fatima Rasheed — Head of Vendor Risk & Contracts** 

Agreed, and I want this incident, even though it was caught in testing rather than live, documented and escalated to the ARB as a near-miss on a core permanent boundary — not just fixed quietly in the next build sprint. The board approved this system specifically on the strength of that boundary holding. 

#### **EA'S INTERNAL THOUGHT** 

_This is uncomfortably close to the exact failure the intake conversation with Piers was designed to prevent — not a negotiation-tactics failure, but the contract-term boundary being breached through an operational gap in how ‘standard template’ got implemented. It’s a genuine relief this surfaced in testing and not in a live commitment, and I don’t want the relief to soften how seriously this gets treated. Fatima is right that this needs to go to the ARB as a near-miss, not get quietly patched — the whole point of a permanent boundary is that the organization needs to trust it held, and that trust requires transparency about the near-misses, not just the successes._ 

I **ARTIFACT: GOV-2027-009** 

### **Contract-Term Boundary Near-Miss Remediation Record** 

_Vantara Global Logistics_ 

#### **NEAR-MISS SUMMARY** 

Test negotiation autonomously finalized with a modified force-majeure clause not detected by structural/field-level template matching; caught in pre-launch testing, no live commitment affected. 

#### **ROOT CAUSE** 

Template-conformance check validated document structure and price/volume fields but did not perform clause-level semantic comparison against pre-cleared reference text for non-price clauses. 

#### **REMEDIATION** 

Clause-level semantic diff implemented against pre-cleared reference text for every clause in any document prior to autonomous finalization; any detected deviation, regardless of materiality assessment by the system, routes the full document to Legal with autonomous finalization blocked. 

#### **DISCLOSURE** 

Escalated to ARB as a near-miss on the core permanent contract-term boundary approved at Pitch/Approve, per Vendor Risk requirement for transparency on boundary-adjacent findings regardless of live impact. 

### **STAGE OUTCOMES** 

- I A near-miss on the core permanent price/volume-only boundary was caught in pre-launch testing through routine review rather than live exposure 

- I Root cause traced to an operational gap in template-conformance checking, not a negotiation-strategy or intent failure, prompting a structural rather than tuned fix 

- I Near-miss formally escalated to the ARB for transparency rather than quietly resolved, reinforcing organizational trust in the permanent boundary’s integrity 

## **STAGE 5 — THE FREEZE THAT CAUGHT A REAL PROBING PATTERN** 

_The independent freeze authority gets used for the first time, on a live counterparty | Months 3–9 | August 2027–February 2028_ 

Go-live occurs 2 August 2027 across the top 40 spot-rate lanes. Continuous negotiation coverage replaces periodic manual renegotiation, with average time-to-favorable-rate-lock falling from 6–12 hours of active monitoring to under 20 minutes from threshold-clearing to lock. Aggregate freight spend on covered lanes falls 7.4% in the first two quarters versus the prior-year comparable period, within unchanged service-level requirements. 

#### _11:00 | Tuesday 16 November 2027 | Vendor Risk & Contracts floor_ 

#### **Freeze Incident Review — Attendees: Adaeze (EA), Fatima (Vendor Risk), Callum (Freight Sourcing)** 

### **Fatima Rasheed — Head of Vendor Risk & Contracts** 

I invoked the independent freeze authority Sunday evening on all active negotiations with a mid-sized carrier on our Southeast Asia lanes. The rolling-window pattern-trend analysis from the Design-stage remediation flagged that carrier’s extracted terms trending toward our ceiling over eleven consecutive interactions across three different lanes — exactly the aggregate signal the Design-stage red-team was built to catch, but this time on a live counterparty rather than a simulation. 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

Walk me through what the freeze did mechanically and what happened to that carrier’s in-flight negotiations. 

### **Fatima Rasheed — Head of Vendor Risk & Contracts** 

All active and new negotiations with that carrier immediately routed to human sourcing review instead of autonomous handling, effective within about two minutes of my authorization. Callum’s team is now handling that relationship manually while we investigate whether this reflects deliberate pattern-probing or simply a skilled human negotiator on their side who happens to be effective — those look different at the tail but similar in this aggregate signal, and I don’t want to conclude bad faith prematurely. 

### **Callum Ng — VP, Freight & Carrier Sourcing** 

From my side, negotiating with them manually this week, I don’t see obvious signs of deliberate system-probing — they read as a genuinely strong commercial negotiator, full stop. Which is itself a useful finding: the rolling-window signal doesn’t distinguish ‘exploiting our agent’s pattern’ from ‘being consistently better at negotiating than our target band assumed,’ and both warrant the same immediate response even though only one is adversarial. 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

That’s an important distinction for the record, and I don’t think it changes whether the freeze was the right call — it does. Either way, our target bands on those lanes may need recalibrating against a genuinely tougher counterparty, and either way, having a human handle that relationship while we figure out which explanation is correct was exactly the right response. 

I **ARTIFACT: OPS-2027-Q4** 

### **Agentic Procurement Negotiation Platform — Quarterly Operating Review** 

_Q4 2027_ 

#### **COMMERCIAL PERFORMANCE** 

Time-to-favorable-rate-lock: 6–12 hrs monitoring baseline to under 20 min. Aggregate covered-lane freight spend down 7.4% YoY, service levels unchanged. 

#### **GOVERNANCE** 

One independent freeze invocation (Southeast Asia carrier, rolling-window pattern trend), resolved within 2 minutes of authorization, carrier relationship transitioned to manual review pending root-cause determination. 

#### **BOUNDARY INTEGRITY** 

Zero autonomous commitments outside price/volume authority since the Build-stage clause-level-diff remediation. Zero template-deviation documents autonomously finalized. 

#### **AUDIT** 

Full per-negotiation reasoning trace successfully reconstructed for 100% of sampled negotiations in Internal Audit’s quarterly spot-check. 

### **STAGE OUTCOMES** 

- I Independent freeze authority successfully invoked for the first time in production, halting a suspicious aggregate pattern within two minutes with no ambiguity about authorization 

- I Investigation distinguished between adversarial manipulation and a genuinely skilled counterparty, finding the correct operational response was identical either way while the underlying explanation still mattered for target-band recalibration 

- I Post-Build clause-level diff remediation held with zero autonomous finalizations outside the permanent contract-term boundary across the full quarter 

## **STAGE 6 — THE PROPOSAL TO EXPAND BEYOND STANDARD TEMPLATES** 

_A strong first year brings a request to widen the boundary that almost broke once already | Month 13 | September 2028_ 

#### _14:00 | Tuesday 12 September 2028 | Vantara HQ, Executive Board Room_ 

#### **Annual Programme Review — Attendees: Adaeze (EA), Piers (CPO), Fatima (Vendor Risk), Beatrix (Internal Audit)** 

### **Piers Whitfield — Chief Procurement Officer** 

Freight spend down over seven percent with unchanged service levels, one freeze incident handled cleanly, zero boundary breaches since the near-miss fix. I want to propose expanding autonomous authority to include one additional, tightly-scoped non-price term: automatic acceptance of minor delivery-window flexibility clauses within a pre-approved range, since those come up constantly and always route to Callum’s team for what’s usually a rubber-stamp approval. 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

I want to take this proposal seriously on its own terms rather than reflexively defending the existing boundary, because it’s a materially narrower ask than what we declined at intake — a specific, bounded, low-consequence clause type, not general contract-term authority. But I want to apply the same test we used for Palisade’s demand-response subsystem: does this specific clause type clear an independent bar for autonomous authority, on its own risk profile, rather than inheriting trust from the platform’s strong track record on price and volume. 

### **Fatima Rasheed — Head of Vendor Risk & Contracts** 

I’d want to see the actual historical rubber-stamp rate on delivery-window clauses specifically, and whether the ‘usually a rubber-stamp’ pattern holds evenly across carriers or whether some carriers use delivery-window requests as a wedge for something else, the way Carrier Meridian used a force-majeure clause as a wedge inside what looked like a standard template. 

### **Beatrix Solheim — Internal Audit Lead** 

And I’d want a dedicated red-team exercise on this specific clause type before any expansion, the same discipline Adaeze’s team applied to the original negotiation-pattern risk — not assumed safe because it seems minor. 

### **Adaeze Nwachukwu — Enterprise AI Architect** 

Agreed on both. I’m open to this expansion in principle — it’s a reasonable, well-bounded next step, not scope creep — but it needs its own evidence base, its own red-team exercise, and its own clause-level semantic-diff enforcement identical to what we built for the template-boundary near-miss, before it goes anywhere near production. 

I **ARTIFACT: RDREC-2028-013** 

### **Annual Programme Governance Decision** 

_September 2028_ **DECISION** 

Agentic Procurement Negotiation Platform confirmed as steady-state production. Proposed expansion to autonomous delivery-window flexibility clause acceptance authorised to proceed to dedicated validation — historical pattern analysis by carrier, dedicated red-team exercise, clause-level enforcement build — required before any ADR amendment; expansion not yet approved. 

#### **RATIONALE** 

Consistent with programme-wide principle that any autonomy expansion requires independent risk-profile validation for the specific new authority, not inference from adjacent-authority track record; reinforced by the Build-stage template-boundary near-miss. 

#### **APPROVED BY** 

Piers Whitfield (CPO), Fatima Rasheed (Vendor Risk), Beatrix Solheim (Internal Audit) 

### **STAGE OUTCOMES** 

- I A narrow, well-reasoned autonomy-expansion proposal was engaged seriously on its merits rather than reflexively declined, while still requiring independent validation before approval 

- I "Does this specific authority clear its own bar" reapplied consistently to a genuinely different kind of request than the ones declined in other case studies, showing the principle generalizes rather than being a one-time ruling 

- I The Build-stage near-miss directly informed the conditions placed on any future contract-term expansion, demonstrating institutional memory carrying forward into governance decisions 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2027-002)|Incubation|CPO, Vendor Risk, Internal Audit|
|Architecture Decision Record (ADR-2027-006)|Pitch / Approve|ARB, Vendor Risk, Internal Audit|
|Adversarial Red-Team Exercise Report<br>(SEC-RT-2027-011)|Design|Vendor Risk, AI Engineering|
|Contract-Term Boundary Near-Miss Remediation<br>Record (GOV-2027-009)|Build|Vendor Risk, AI Engineering, Legal|
|Quarterly Operating Review (OPS-2027-Q4)|Operate|Vendor Risk, Freight Sourcing,<br>Internal Audit|
|Annual Programme Governance Decision<br>(RDREC-2028-013)|Review|CPO, Vendor Risk, Internal Audit|

_“A negotiating agent that never makes a bad deal isn’t actually the goal — a human negotiator makes imperfect calls too. The goal was a system that only ever had the authority to make the kind of mistake we could absorb, and that told us immediately the one time something tried to find the edges of that authority on purpose.”_
