---
title: "Evidence Verifiability, Not Convenience"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_07_Harborstone_Claims_Processing_Agents.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
last_reviewed: 2026-07-10
covers_version: "N/A"
---

#### **AGENTIC AI IN THE ENTERPRISE** 

# **Evidence Verifiability, Not Convenience** 

Building an Agentic Autonomous Claims Settlement System Inside a Mutual Insurer 

A transcript-style account following Deshawn Carter, Enterprise AI Architect at Harborstone Mutual Insurance, as he builds an autonomous claims settlement system gated on evidence verifiability rather than claim size — and discovers that a fraud-resistance fix and a fairness gap can come from the very same design decision. 

#### **CAST OF CHARACTERS** 

#### **Deshawn Carter** 

Enterprise AI Architect, Claims Systems (EA) — our protagonist 

#### **Miriam Katz** 

Chief Claims Officer (CCO) — sponsor 

#### **Oscar Lindqvist** 

Head of Special Investigations Unit (SIU) — fraud 

#### **Beatriz Nunes** 

Lead AI Engineer, Claims Automation 

**Harold Ashby Ines Duarte** General Counsel Head of Actuarial & Fair Practices 

#### **INCUBATION** → **PITCH / APPROVE** → **DESIGN** → **BUILD** → **OPERATE** → **REVIEW** 

Harborstone Mutual Insurance | Agentic Claims Processing System | 2026 

## **STAGE 1 — THE CLAIM THAT SAT FOR THREE WEEKS** 

_Distinguishing straightforward claims from the ones that only look straightforward | Week 1 | Monday, 6 July 2026_ 

#### _09:00 | Monday 6 July 2026 | Miriam Katz’s office_ 

#### **Informal Strategy Discussion — Attendees: Miriam Katz (CCO), Deshawn Carter (EA)** 

### **Miriam Katz — Chief Claims Officer** 

Deshawn, average claims cycle time is nineteen days, and customer satisfaction on claims is our lowest-scoring category by a wide margin. Roughly sixty percent of our auto and home claims are genuinely simple — clear coverage, straightforward damage, no red flags — yet they sit in the same queue as complex disputed claims and take almost as long. I want an agentic AI system that can resolve the simple ones fast and free up adjusters for the complex ones. 

### **Deshawn Carter — Enterprise AI Architect** 

That’s a reasonable goal, and the key design question I’ll need answered before anything else is: how do we reliably distinguish ‘genuinely simple’ from ‘looks simple at first glance’ before an agent acts on that classification? Insurance fraud specifically likes to look like a simple, unremarkable claim — that’s the whole point of committing it convincingly. I want to talk to Oscar’s fraud team before I scope anything. 

### **Miriam Katz — Chief Claims Officer** 

Fair. But I don’t want fraud caution to become an excuse to automate nothing — the vast majority of our claims are legitimate and simple, and treating all of them with maximum suspicion is its own cost, both in cycle time and in how it makes honest customers feel. 

#### _13:00 | Wednesday 8 July 2026 | Special Investigations Unit_ 

#### **Discovery Interview — Attendees: Deshawn Carter (EA), Oscar Lindqvist (Head of SIU)** 

### **Oscar Lindqvist — Head of Special Investigations Unit** 

I want to push back gently on the framing of ‘simple versus complex’ as the right axis. From a fraud perspective, the more useful distinction is ‘low information asymmetry versus high information asymmetry.’ A small, clearly-documented auto glass claim with photos, a police report, and a repair estimate that matches market rate has very little room for the claimant to be lying in a way we can’t verify. A soft-tissue injury claim with no objective imaging, self-reported pain levels, and treatment from a provider we don’t have history with — that has enormous information asymmetry even if it looks routine on the surface. 

### **Deshawn Carter — Enterprise AI Architect** 

That’s a much sharper design principle than ‘simple versus complex’ and I want to build the eligibility criteria for autonomous processing around it directly — not claim type or dollar amount alone, but the degree to which the claim’s legitimacy is independently verifiable from objective evidence versus resting on self-report. Can your team help define, quantitatively, what verifiable evidence looks like for each major claim category? 

### **Oscar Lindqvist — Head of Special Investigations Unit** 

Yes, and I want one more thing built in from the start, not added later: even within an ‘eligible for autonomous processing’ category, I want a continuously running fraud-pattern detection layer operating alongside the autonomous processing agent, not instead of it. Fraud rings adapt — if we ever tell a fraud ring, even implicitly through public claims-handling patterns, that a certain claim profile sails through automatically, that profile becomes the template they’ll exploit. Autonomous processing eligibility criteria need to be a living, monitored boundary, not a fixed rule we set once. 

### **Deshawn Carter — Enterprise AI Architect** 

Understood — I’ll design for that as a standing operational requirement, not a one-time launch condition. Autonomous processing gets built alongside continuous fraud-pattern monitoring that can dynamically tighten eligibility criteria if it detects the exploitation pattern you’re describing. 

#### u **EMAIL** 

**From:** Deshawn Carter (Enterprise AI Architect) **To:** Ines Duarte (Head of Actuarial & Fair Practices) 

**Subject:** Early Flag: Agentic Claims Processing — Fair Practices Review Needed on Eligibility Criteria 

Ines, scoping an agentic system for autonomous processing of claims meeting an ‘independently verifiable evidence’ threshold, defined with Oscar’s SIU team. I want your team’s input from the start on whether the specific evidence-verifiability criteria we land on could inadvertently correlate with protected characteristics or geography in a way that creates disparate claims-experience outcomes — for instance, if certain claim types or documentation patterns are more common in some communities than others for reasons unrelated to claim legitimacy. I’d rather catch that in criteria design than discover it in a fair-lending-style audit after launch. Can we set up a working session? Deshawn 

#### I **ARTIFACT: AIA-2026-063** 

### **Architecture Intake Assessment — Agentic Claims Processing System** 

_Draft v0.2 | Harborstone Mutual Insurance_ 

#### **BUSINESS PROBLEM STATEMENT** 

Average claims cycle time 19 days; approximately 60% of auto/home claims have low information asymmetry (objectively verifiable evidence) but are processed in the same queue and timeframe as high-asymmetry complex/disputed claims. 

#### **KEY DESIGN PRINCIPLE** 

Autonomous processing eligibility framed around information asymmetry / evidence verifiability, not claim type or dollar amount alone — per SIU guidance. Eligibility criteria treated as a living, continuously monitored boundary, not a fixed one-time rule, given fraud rings’ capacity to adapt to known patterns. 

#### **BUILD / BUY / REUSE ASSESSMENT** 

Option A: Vendor autonomous claims settlement suite, opaque eligibility logic — Effort: LOW, Risk: HIGH (cannot verify or adjust eligibility criteria transparently), Speed: HIGH 

Option B: Internally defined evidence-verifiability eligibility criteria (SIU + Fair Practices co-owned), agentic processing for eligible claims, continuous fraud-pattern monitoring, human adjuster retains all non-eligible and disputed claims — Effort: MED-HIGH, Risk: MED, Speed: MED 

Option C: Faster manual triage only, no autonomous settlement — Effort: LOW, Risk: LOW, Speed: HIGH, Value: MED 

#### **RECOMMENDATION** 

Option B, with Fair Practices and SIU as permanent co-owners of eligibility criteria, not one-time design consultants. 

### **STAGE OUTCOMES** 

- I Eligibility framework reframed from “claim simplicity” to “evidence verifiability / information asymmetry” — a materially more fraud-resistant design principle 

- I Continuous fraud-pattern monitoring established as a standing requirement alongside autonomous processing, anticipating adversarial adaptation 

- I Fair Practices engaged pre-design specifically to check eligibility criteria for inadvertent disparate-impact correlation 

- I SIU and Fair Practices positioned as permanent co-owners of eligibility criteria, not one-time consultants 

## **STAGE 2 — THE SETTLEMENT AUTHORITY NOBODY WANTED TO OWN ALONE** 

_Approving autonomous payment with three separate hands on the brake | Week 5 | Tuesday, 4 August 2026_ 

#### _10:00 | Tuesday 4 August 2026 | Harborstone HQ, Executive Board Room_ 

#### **Architecture Review Board (ARB) — Attendees: Deshawn (EA), Miriam (CCO), Oscar (SIU), Harold (General Counsel), Ines (Fair Practices)** 

### **Harold Ashby — General Counsel** 

Deshawn, I want absolute clarity on what ‘autonomous processing’ actually authorises. Is this system issuing binding settlement offers and payments without any human touching the claim at all? 

### **Deshawn Carter — Enterprise AI Architect** 

For claims meeting the evidence-verifiability threshold, below a defined payout ceiling, in a pre-approved claim category, and clearing the continuous fraud-pattern monitoring check — yes, the system issues the settlement and payment autonomously. I want to be direct that this is a meaningfully different risk category from a decision-support tool, and I think it’s the right design for this narrow slice specifically because the eligibility bar is evidence-verifiability, not claim size or convenience. 

### **Harold Ashby — General Counsel** 

What’s the payout ceiling, and who sets it? 

### **Deshawn Carter — Enterprise AI Architect** 

Initial ceiling proposed at $7,500, set jointly by Miriam’s claims leadership and your legal team based on your risk tolerance for autonomous financial commitment, not by engineering. I want that number owned by the business and legal, reviewable and adjustable by them, not baked into code as an engineering assumption. 

### **Oscar Lindqvist — Head of Special Investigations Unit** 

I want a specific SIU condition in the ADR: any claim autonomously settled still gets logged into our fraud-pattern monitoring system just as if it had gone through a human adjuster, and if a pattern later emerges across multiple autonomously-settled claims that looks suspicious in aggregate — even though none of them individually triggered a red flag — I want the authority to freeze that specific claim category’s autonomous eligibility immediately, without needing a full governance cycle to react to an active exploitation pattern. 

### **Deshawn Carter — Enterprise AI Architect** 

Agreed, and I’ll build that as a formal emergency-freeze authority for your team specifically — fast to invoke, logged and reviewed after the fact, distinct from the normal quarterly eligibility criteria review process. 

### **Ines Duarte — Head of Actuarial & Fair Practices** 

My condition: quarterly disparate-impact analysis comparing claims-experience outcomes — cycle time, autonomous-eligibility rate, dispute rate — across demographic and geographic segments, specifically to catch the correlation risk I flagged during Incubation before it becomes a pattern rather than after. 

### **Miriam Katz — Chief Claims Officer** 

I can support all three conditions. What’s the actual customer-experience upside if we get this right? 

### **Deshawn Carter — Enterprise AI Architect** 

Modelling against last year’s claim mix, roughly 35% of auto and home claims would meet the eligibility bar, with settlement in under 24 hours instead of the current 19-day average for that subset. 

I **ARTIFACT: ADR-2026-044** 

### **Architecture Decision Record — Agentic Claims Processing System** 

##### _Issued 4 August 2026_ 

#### **DECISION** 

Approve Option B — autonomous claims settlement for claims meeting evidence-verifiability eligibility, below a $7,500 payout ceiling, in pre-approved categories, clearing continuous fraud-pattern monitoring. 

#### **CONDITIONS** 

[LEGAL-001] Payout ceiling owned and reviewable by Claims leadership and Legal jointly, not an engineering-set parameter 

[SIU-001] All autonomously-settled claims logged into standard fraud-pattern monitoring identically to human-adjusted claims; SIU granted emergency-freeze authority over any claim category’s autonomous eligibility, invocable without a full governance cycle, logged and reviewed after invocation [FAIR-001] Quarterly disparate-impact analysis across demographic/geographic segments on cycle time, eligibility rate, and dispute rate 

[OPS-001] Eligibility criteria reviewed quarterly as a living boundary, not a fixed one-time rule **ARB CHAIR SIGN-OFF** 

Miriam Katz (CCO) — DATE: 04/08/2026 

### **STAGE OUTCOMES** 

- I Autonomous settlement authority approved for a narrowly-defined, evidence-verifiability-gated claim subset, with a business/legal-owned payout ceiling 

- I SIU granted a fast, independent emergency-freeze authority over autonomous eligibility — distinct from the normal governance cycle, designed for rapid response to active exploitation 

- I Quarterly disparate-impact analysis built into governance from approval, directly addressing the correlation risk flagged during Incubation 

- I Payout ceiling explicitly assigned to business and legal ownership, not treated as an engineering parameter 

## **STAGE 3 — THE PHOTO THAT LOOKED RIGHT AND WASN’T** 

_Evidence verification turns out to need its own evidence | Weeks 6–13 | August–October 2026_ 

#### _10:00 | Wednesday 26 August 2026 | Claims Automation Lab_ 

#### **Design Working Session — Attendees: Deshawn (EA), Beatriz Nunes (Lead AI Engineer)** 

### **Beatriz Nunes — Lead AI Engineer, Claims Automation** 

Core architecture: an evidence-extraction agent processes submitted photos, repair estimates, and police reports into structured claim facts; an eligibility agent checks those facts against the evidence-verifiability criteria; a settlement-calculation agent computes the payout using deterministic policy terms and market-rate repair cost data, not free generation. Question for you — how do we verify that submitted photos are actually genuine and current, not reused from a prior claim or pulled from the internet? 

### **Deshawn Carter — Enterprise AI Architect** 

That’s exactly the kind of verification-of-verification question I want us asking at design time rather than discovering as a fraud vector after launch. What signals do we actually have available — photo metadata, reverse image matching against our own historical claims database, anything else? 

### **Beatriz Nunes — Lead AI Engineer, Claims Automation** 

Photo EXIF metadata when available — though many phones strip it or claimants may screenshot rather than upload directly. We can run reverse image matching against our own historical claims photo database to catch reused images. We don’t currently have a reliable way to catch a photo sourced from outside our own history — the broader internet — without a much larger external index, which raises its own data and cost questions. 

### **Deshawn Carter — Enterprise AI Architect** 

I don’t want to chase a perfect solution to external image sourcing right now — that’s a genuinely hard problem and pursuing it could delay launch significantly for a marginal gain. What I do want is for photo-based evidence alone to never be sufficient for eligibility on its own; it should always need to be corroborated by at least one independent evidence type — a police report reference number we can verify against a public records lookup, or a repair estimate from a shop in our verified network. That way, a single successfully spoofed photo isn’t enough to unlock autonomous settlement by itself. 

#### _11:00 | Thursday 24 September 2026 | Special Investigations Unit_ 

#### **Fraud Red-Team Findings Review — Attendees: Deshawn (EA), Beatriz (Lead Engineer), Oscar (SIU)** 

### **Oscar Lindqvist — Head of Special Investigations Unit** 

My team ran twenty synthetic claim scenarios specifically designed to probe the eligibility boundary — not obviously fraudulent claims, but claims constructed to just barely clear the evidence-verifiability threshold with technically-satisfying-but-suspicious documentation. Three of twenty were classified eligible for autonomous settlement by the system. 

### **Deshawn Carter — Enterprise AI Architect** 

Walk me through one of the three. 

### **Oscar Lindqvist — Head of Special Investigations Unit** 

A staged minor collision claim with a genuine police report, genuine repair estimate from a network shop, and photos that pass reverse-image and metadata checks — because the staging was physically real, not digitally faked. The individual evidence items are all genuinely verifiable. What makes it suspicious to a 

trained investigator is a pattern across the claim as a whole — the timing relative to a recent policy purchase, and a repair shop with an unusually high concentration of claims from policies purchased in the same window. 

### **Deshawn Carter — Enterprise AI Architect** 

So the failure isn’t in evidence verification at all — each piece of evidence genuinely is what it claims to be. The gap is that the eligibility agent evaluates evidence-item verifiability in isolation and has no cross-claim pattern awareness, which is precisely the kind of signal a human SIU investigator builds through experience across many claims over time. I don’t think an agentic evidence-verification system should try to replicate that pattern-detection capability itself — that’s SIU’s domain expertise, not something to reinvent in a different architecture. Instead, I want the continuous fraud-pattern monitoring layer we already committed to at Incubation to run as a mandatory pre-settlement check, not just a post-hoc audit — every claim heading toward autonomous settlement gets screened against SIU’s pattern-detection models before payment issues, not after. 

#### **EA'S INTERNAL THOUGHT** 

_This is a useful, humbling finding. I designed the evidence-verification agent well for its actual job — confirming that submitted evidence is genuine — but I initially let the eligibility boundary rest on that alone, when genuine evidence and a legitimate claim are not the same thing. Fraud pattern detection across claims is a fundamentally different kind of signal than evidence authenticity within a single claim, and I should have designed the mandatory pre-settlement fraud screen as a first-class gate from the start, not realized it needed to move earlier in the pipeline after a red-team exercise found the gap._ 

#### I **ARTIFACT: SAD-2026-058** 

### **Solution Architecture Document (Extract) — Agentic Claims Processing System** 

_v1.0 | Approved 15 October 2026_ 

#### **SECTION 3: EVIDENCE VERIFICATION ARCHITECTURE** 

Photo evidence requires corroboration by at least one independent evidence type (verifiable police report, network-shop repair estimate); photo evidence alone is never sufficient for eligibility. Reverse-image matching and metadata checks applied to all submitted photos. 

#### **SECTION 4: MANDATORY PRE-SETTLEMENT FRAUD SCREEN** 

Every claim reaching autonomous-settlement eligibility is screened against SIU cross-claim pattern-detection models BEFORE payment issues, not as a post-hoc audit. Any pattern-model flag routes the claim to human SIU review, overriding evidence-verifiability eligibility regardless of individual evidence-item authenticity. 

#### **SECTION 5: EMERGENCY FREEZE MECHANISM** 

SIU emergency-freeze authority (ADR-2026-044 SIU-001) implemented as an immediately-effective eligibility-category kill switch, independently invocable, logged with mandatory post-invocation review within 5 business days. 

### **STAGE OUTCOMES** 

- I Photo-evidence-alone eligibility gap closed — corroborating independent evidence type now mandatory before photo evidence contributes to eligibility 

- I Fraud red-team exercise found three of twenty adversarially-constructed claims cleared the initial evidence-verifiability threshold despite genuine authenticity concerns visible only in cross-claim pattern 

- I Mandatory pre-settlement fraud-pattern screen moved to a first-class, blocking gate rather than a post-hoc audit — fundamentally changing the architecture’s risk posture 

- I Clear division of labour established: evidence-authenticity verification (agentic system’s job) versus cross-claim fraud pattern detection (SIU’s domain expertise, consumed as a service, not reinvented) 

## **STAGE 4 — THE QUARTER THE DISPARATE-IMPACT REPORT WASN’T CLEAN** 

_Following through on Ines’s condition when the data actually shows something | Months 4–8 | November 2026–March 2027_ 

#### _09:00 | Thursday 4 February 2027 (First Live Disparate-Impact Analysis) | Actuarial & Fair Practices Office_ 

#### **Design-Stage Disparate-Impact Dry Run — Attendees: Deshawn (EA), Ines Duarte (Fair Practices), Beatriz (Lead Engineer)** 

### **Ines Duarte — Head of Actuarial & Fair Practices** 

We ran the disparate-impact analysis against six months of shadow-mode eligibility classifications, ahead of go-live, per my ARB condition. Overall eligibility rates are reasonably even across most segments. One finding: claimants in rural zip codes are eligible for autonomous settlement at a meaningfully lower rate than urban claimants, even controlling for claim type and severity. 

### **Deshawn Carter — Enterprise AI Architect** 

That’s exactly the kind of finding I wanted this analysis positioned to catch. What’s driving it — do we have a hypothesis yet? 

### **Ines Duarte — Head of Actuarial & Fair Practices** 

Working hypothesis, not yet confirmed: our ‘verified network repair shop’ corroboration requirement, which we just added in Design specifically to close the photo-evidence gap, may be harder to satisfy in rural areas with fewer network-affiliated shops nearby. If a rural claimant’s nearest repair shop isn’t in our network, their otherwise-legitimate claim can’t clear the corroboration bar even though nothing about their claim is actually less verifiable in substance. 

### **Deshawn Carter — Enterprise AI Architect** 

If that hypothesis holds, that’s a direct consequence of a fix we made for good reasons — closing the photo-evidence vulnerability — that introduced an unintended geographic disparity. I don’t want to just note this and move on; I want it tested properly before go-live, not treated as an acceptable side effect of a fraud fix. Beatriz, can we expand the acceptable corroboration evidence set to include options more accessible in rural areas — a licensed adjuster site visit, or a broader set of verifiable repair estimate sources beyond our specific network — without reopening the photo-evidence vulnerability we were originally closing? 

### **Beatriz Nunes — Lead AI Engineer, Claims Automation** 

I think so — the actual requirement we need is independent verifiability, not specifically network-shop membership. A repair estimate from any licensed, independently-verifiable shop should serve the same fraud-resistance purpose as a network shop, provided we can verify the shop’s licensing status through a public registry check. 

### **Deshawn Carter — Enterprise AI Architect** 

That’s the right fix — it preserves the fraud-resistance intent while removing a rural-geography penalty that was never actually about claim legitimacy. I want this re-tested through the disparate-impact analysis again before go-live, not assumed fixed. 

I **ARTIFACT: GOV-2027-002** 

### **Corroboration Evidence Equity Remediation** 

_v1.0 | Amends SAD-2026-058_ 

#### **FINDING** 

Network-repair-shop corroboration requirement, added to close the photo-evidence vulnerability, created an unintended lower autonomous-eligibility rate for rural claimants, driven by network shop density rather than claim legitimacy. 

#### **REMEDIATION** 

Corroboration evidence set expanded to any licensed, independently-verifiable repair shop (verified via public licensing registry check), removing the network-membership requirement while preserving independent-verifiability fraud resistance. 

#### **VALIDATION REQUIREMENT** 

Disparate-impact analysis re-run against remediated criteria before go-live authorisation; geographic eligibility-rate gap must fall within the pre-defined acceptable variance threshold before proceeding. 

### **STAGE OUTCOMES** 

- I Pre-go-live disparate-impact dry run, mandated at ARB, caught a genuine unintended rural-geography disparity before any live claimant was affected 

- I Disparity traced to a well-intentioned fraud-resistance fix from Design stage, illustrating that closing one gap can open another if not tested broadly 

- I Remediation preserved fraud-resistance intent (independent verifiability) while removing the specific network-membership mechanism causing the disparity 

- I Validation loop — re-running disparate-impact analysis after remediation — established as mandatory before proceeding, not just documenting the original finding 

## **STAGE 5 — THE SIU FREEZE THAT PROVED THE MECHANISM WORKS** 

_Watching the emergency-freeze authority actually get used | Months 9–13 | April–August 2027_ 

Go-live occurs 15 April 2027 following successful re-validation of the disparate-impact remediation. Autonomous settlement handles 34% of eligible auto and home claims within the first quarter, with settlement time under 24 hours for those claims versus a 19-day baseline. Customer satisfaction on autonomously-settled claims scores meaningfully higher than the historical average. 

#### _15:00 | Wednesday 14 July 2027 | Special Investigations Unit_ 

#### **Emergency Freeze Incident Review — Attendees: Deshawn (EA), Oscar (SIU), Miriam (CCO)** 

### **Oscar Lindqvist — Head of Special Investigations Unit** 

I invoked the emergency-freeze authority Tuesday night on the windshield-damage claim category, effective immediately. Our cross-claim pattern monitoring detected a sudden cluster — fourteen claims in nine days, all from a narrow geographic radius, all using the same two repair shops, all just under the payout ceiling, all otherwise individually clean on evidence verification. 

### **Deshawn Carter — Enterprise AI Architect** 

That’s precisely the scenario this authority was built for — individually clean claims forming a suspicious pattern in aggregate, exactly like the red-team scenario from Design, but now a live signal rather than a synthetic test. Walk me through what happened mechanically when you invoked it. 

### **Oscar Lindqvist — Head of Special Investigations Unit** 

Freeze took effect within about ninety seconds of my authorization — windshield-damage claims in that category immediately started routing to human SIU review instead of autonomous settlement, with no need to go through the normal quarterly eligibility review process. Six claims that would otherwise have auto-settled in that window got the human review instead, and my team is investigating the whole cluster now. 

### **Miriam Katz — Chief Claims Officer** 

Any customer-facing disruption from the freeze? 

### **Oscar Lindqvist — Head of Special Investigations Unit** 

Minimal — those claims simply route to a human adjuster instead of instant settlement, which is exactly the pre-programme experience for all claims. No claimant was denied or delayed beyond the original baseline; we just removed the fast-track for that specific pattern while we investigate. 

### **Deshawn Carter — Enterprise AI Architect** 

This is the design working as intended — fast, independent action available to the people with the actual fraud expertise, without needing to route through me or a full governance cycle in the middle of an active pattern. I want this documented as a case study for how the mechanism is supposed to function, and I want to check with Beatriz’s team whether the pattern-detection models can be updated with this cluster’s signature once the investigation concludes, so a similar pattern doesn’t need a fresh manual freeze next time. 

I **ARTIFACT: OPS-2027-Q3** 

### **Agentic Claims Processing System — Quarterly Operating Review** 

##### _Q3 2027_ 

#### **THROUGHPUT** 

Autonomous settlement: 34% of eligible auto/home claims, under 24 hours settlement time vs. 19-day baseline. Overall claims cycle time (all claims, autonomous and human-adjusted combined): reduced from 19 to 13 days. 

#### **FRAUD GOVERNANCE** 

One emergency-freeze invocation in the quarter (windshield-damage claim cluster), resolved within 90 seconds of authorization, zero customer-facing disruption beyond baseline experience. Investigation ongoing; pattern-detection model update planned post-conclusion. 

#### **FAIR PRACTICES** 

Post-remediation disparate-impact analysis: geographic eligibility-rate gap within acceptable variance threshold, holding steady across the quarter. 

#### **CUSTOMER EXPERIENCE** 

Customer satisfaction score on autonomously-settled claims: significantly above historical claims-handling average. 

### **STAGE OUTCOMES** 

- I SIU emergency-freeze authority successfully invoked for the first time in production, halting a suspicious claim cluster within 90 seconds with zero customer-facing disruption beyond pre-programme baseline 

- I Autonomous settlement achieved 34% eligible-claim coverage with under-24-hour settlement time, materially improving overall claims cycle time 

- I Post-remediation disparate-impact analysis held within acceptable variance, validating the Build-stage rural-geography fix in live operation 

- I Fraud pattern feedback loop identified: investigation-concluded cluster signatures planned for pattern-detection model updates, closing the loop between incident and prevention 

## **STAGE 6 — RAISING THE CEILING, CAREFULLY** 

_Annual review — the payout ceiling question, answered with the same discipline as everything before it | Month 14 | September 2027_ 

#### _14:00 | Tuesday 14 September 2027 | Harborstone HQ, Executive Board Room_ 

#### **Annual Programme Review — Attendees: Deshawn (EA), Miriam (CCO), Harold (Legal), Oscar (SIU), Ines (Fair Practices)** 

### **Miriam Katz — Chief Claims Officer** 

Thirteen-day overall cycle time, down from nineteen. One fraud cluster caught and contained cleanly. Disparate-impact metrics holding steady. I want to propose raising the autonomous settlement payout ceiling from $7,500 to $15,000 — our data shows claims in that range have similar evidence-verifiability characteristics to what’s already eligible. 

### **Deshawn Carter — Enterprise AI Architect** 

I want to apply the exact same discipline to this proposal that we’ve applied to every threshold or scope change so far in this programme — raising a ceiling isn’t a single-number decision, it’s a decision about whether the new band of claims shares the same risk profile as the validated band. Before I’d support this, I want a dedicated fraud red-team exercise from Oscar’s team specifically targeting the $7,500–$15,000 band, and a disparate-impact analysis re-run against that band specifically, the same way we tested rural geography before the original go-live. 

### **Oscar Lindqvist — Head of Special Investigations Unit** 

Agreed — higher payout claims are also, generally, a more attractive target for fraud, so I wouldn’t want to assume the risk profile transfers just because the evidence-verifiability mechanics look similar on paper. 

### **Harold Ashby — General Counsel** 

I’d support the ceiling increase in principle, contingent on both of those validations passing, and I want the increase itself to go through a formal ADR amendment with the same rigor as the original approval, not an operational memo. 

### **Miriam Katz — Chief Claims Officer** 

Understood. I’d rather take the extra month to validate this properly than rush it and undermine the trust this programme has built over the last year. 

#### I **ARTIFACT: RDREC-2027-009** 

### **Annual Programme Governance Decision** 

_September 2027_ 

#### **DECISION** 

Agentic Claims Processing System confirmed as steady-state production. Proposed payout ceiling increase ($7,500→$15,000) authorised to proceed to dedicated validation — fraud red-team exercise and band-specific disparate-impact analysis — required before any formal ADR amendment; ceiling change not yet approved. 

#### **RATIONALE** 

Consistent with programme-wide principle established at Stage 3 and Stage 5: threshold or scope expansion requires validation against the new band’s specific risk profile, not inferred from adjacent-band performance alone. 

#### **APPROVED BY** 

Miriam Katz (CCO), Harold Ashby (General Counsel), Oscar Lindqvist (SIU) 

### **STAGE OUTCOMES** 

- I Payout ceiling increase proposal correctly routed through dedicated validation rather than approved on adjacent-band performance alone 

- I Programme-wide discipline — evidence-profile validation before any threshold expansion — sustained consistently from Design through the first annual review 

- I Overall claims cycle time reduced from 19 to 13 days in year one, with autonomous settlement covering over a third of eligible claims 

- I Emergency-freeze mechanism validated in live use, demonstrating the fraud-governance design held under a genuine adversarial pattern 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2026-063)|Incubation|CCO, SIU, Fair Practices|
|Architecture Decision Record (ADR-2026-044)|Pitch / Approve|ARB, Legal, SIU|
|Solution Architecture Document (SAD-2026-058)|Design|AI Engineering, SIU|
|Corroboration Evidence Equity Remediation<br>(GOV-2027-002)|Build|Fair Practices, AI Engineering|
|Quarterly Operating Review (OPS-2027-Q3)|Operate|SIU, CCO|
|Annual Programme Governance Decision<br>(RDREC-2027-009)|Review|CCO, Legal, SIU|

_“A claim that looks simple and a claim that is simple are not the same thing. The entire job of this architecture was building a system honest enough to know the difference — and humble enough to keep checking.”_
