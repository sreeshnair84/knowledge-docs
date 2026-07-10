---
title: "Decision Support, Never Decision"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_02_Cascadia_Prior_Authorization_Agent.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

#### **AGENTIC AI IN THE ENTERPRISE** 

# **Decision Support, Never Decision** 

Building an Agentic Prior Authorization Assistant Inside a Health Payer 

A transcript-style account following Dr. Amara Osei, Enterprise AI Architect at Cascadia Health Partners, as she draws a hard line between AI-assisted clinical review and autonomous denial — and defends a narrow, clinically-governed fast-track approval pathway against pressure to expand it faster than the evidence allows. 

#### **CAST OF CHARACTERS** 

#### **Dr. Amara Osei** 

Enterprise AI Architect, Clinical Systems (EA) — our protagonist 

#### **Ron Faulkner** 

Chief Medical Officer (CMO) — programme sponsor 

#### **Linh Tran** 

VP Utilization Management 

#### **Dave Kowalski** 

Chief Compliance Officer 

#### **Priya Bhatt** 

Lead ML Engineer, Clinical AI 

#### **Sam Ortega** 

Member Advocate / Appeals Lead 

**Dr. Felix Grant** 

Medical Director, external reviewer panel 

#### **INCUBATION** → **PITCH / APPROVE** → **DESIGN** → **BUILD** → **OPERATE** → **REVIEW** 

Cascadia Health Partners | Agentic Prior Authorization Review | 2026 

## **STAGE 1 — THE QUEUE THAT DECIDES PEOPLE’S CARE** 

_Naming the real bottleneck before naming the AI | Week 1 | Monday, 9 February 2026_ 

#### _09:00 | Monday 9 February 2026 | Ron Faulkner’s office_ 

#### **Informal Strategy Discussion — Attendees: Ron Faulkner (CMO), Amara Osei (EA)** 

### **Ron Faulkner — Chief Medical Officer** 

Amara, prior auth turnaround is averaging 6.2 days against a state-mandated 72-hour standard for non-urgent requests. We’re getting regulator letters. Every payer in the market is talking about AI for this. I need a plan, and I need it fast. 

### **Dr. Amara Osei — Enterprise AI Architect** 

Fast is exactly the risk here, Ron. Prior auth denials that turn out to be wrong don’t just cost us a grievance — they can delay someone’s cancer treatment. Before I scope any AI, I need to know: where specifically are the 6.2 days going? Intake, clinical review, or the back-and-forth for missing documentation? 

### **Ron Faulkner — Chief Medical Officer** 

Linh’s team would know the breakdown better than me. 

#### _13:00 | Wednesday 11 February 2026 | Utilization Management floor_ 

#### **Discovery Interview — Attendees: Amara Osei (EA), Linh Tran (VP Utilization Management)** 

### **Linh Tran — VP Utilization Management** 

Here’s the breakdown on a typical case. Day 1: intake and eligibility check, automated, fast. Days 2–4: waiting on the provider’s office to submit clinical documentation, because our fax-based intake loses about a third of the first submission. Day 5: nurse reviewer applies medical necessity criteria. Day 6: physician reviewer signs off on anything the nurse can’t approve outright, which is about 40% of cases. 

### **Dr. Amara Osei — Enterprise AI Architect** 

So three-plus of the six days are provider-side documentation friction, not our review capacity. 

### **Linh Tran — VP Utilization Management** 

Correct. And of the cases that do reach clinical review, nurses spend most of their time manually checking documentation against InterQual or MCG criteria line by line. That part takes 20–25 minutes per case even when the documentation is complete. 

### **Dr. Amara Osei — Enterprise AI Architect** 

So there are two very different agentic opportunities, and I don’t want to conflate them. One: an intake agent that proactively identifies missing documentation and requests it structurally instead of a fax black hole — that attacks the 3-day delay. Two: a clinical-criteria matching agent that assembles a 

documented-evidence-to-criteria mapping for the nurse reviewer, similar to what a first-pass reviewer would produce — that attacks the 20-minute review time. Neither one makes an approval or denial decision. That’s the line I won’t move on. 

### **Linh Tran — VP Utilization Management** 

Some vendors are pitching fully automated denial for cases that clearly fail criteria — no human touch at all. 

### **Dr. Amara Osei — Enterprise AI Architect** 

- I know, and I want to be direct with Ron about this early: an AI system denying care autonomously, even for ‘clear-cut’ cases, is a different risk category entirely — it touches medical necessity determinations that have 

real clinical and legal consequences, and ‘clear-cut’ according to a model is not the same as clear-cut according to a licensed clinician reading the whole chart. I’m scoping this as decision support only, full stop. 

#### **EA'S INTERNAL THOUGHT** 

_Every payer AI vendor pitch I’ve seen leads with denial automation because it’s the flashiest ROI number. But an agent that can autonomously deny care is the one output of this whole programme I am least willing to build, regardless of what the business case says. Approval-support and documentation-completeness are both defensible, high-value, and don’t put us in the position of an algorithm telling someone their treatment isn’t medically necessary without a clinician’s eyes on the case._ 

#### u **EMAIL** 

**From:** Dr. Amara Osei (Enterprise AI Architect) **To:** Dave Kowalski (Chief Compliance Officer) 

**Subject:** Early Flag: Prior Auth AI Scope — Explicitly Excluding Autonomous Denial 

Dave, scoping an agentic AI initiative for prior authorization. I want compliance input from day one on scope boundaries, specifically: the system will NOT autonomously deny or approve any prior authorization request — every determination remains with a licensed clinical reviewer. The AI’s role is (1) proactive 

documentation-completeness checking at intake, and (2) assembling a criteria-mapping packet for the human reviewer. I want this boundary documented before any vendor conversation happens, so we don’t drift toward autonomous denial under delivery pressure six months from now. Can we align this week? Amara 

#### I **ARTIFACT: AIA-2026-007** 

### **Architecture Intake Assessment — Prior Authorization Review Assistant** 

_Draft v0.3 | Cascadia Health Partners_ 

#### **BUSINESS PROBLEM STATEMENT** 

Average prior auth turnaround: 6.2 days vs. 72-hour regulatory standard. Root cause split: ~3.2 days provider documentation friction (fax-based intake, ~33% first-submission loss rate), ~2 days clinical review capacity (20–25 min manual criteria-matching per case). 

#### **STRATEGIC ALIGNMENT** 

Regulatory compliance driver: state UM turnaround mandate. Member experience objective tied to Star Ratings. Clinical safety non-negotiable: no reduction in review rigor. 

#### **SCOPE BOUNDARY (NON-NEGOTIABLE)** 

System will not autonomously approve or deny any request. All determinations require sign-off from a licensed clinical reviewer (nurse or physician per existing escalation rules). 

#### **BUILD / BUY / REUSE ASSESSMENT** 

Option A: Vendor autonomous-denial suite — REJECTED at intake on clinical governance grounds, not evaluated further. 

Option B: Intake Documentation Agent + Criteria-Mapping Decision Support Agent, internally orchestrated, human determination retained — Effort: MED, Risk: MED, Speed: MED 

Option C: Process redesign only (structured digital intake, no AI) — Effort: LOW, Risk: LOW, Speed: HIGH, Value: MED (addresses documentation friction only) 

#### **RECOMMENDATION** 

Option B, phased: Intake Documentation Agent first (addresses largest delay source), Criteria-Mapping Agent second. 

#### **STATUS** 

Pending Compliance and CMO sign-off on scope boundary before Design. 

### **STAGE OUTCOMES** 

- I Root cause split identified: documentation friction (3.2 days) vs. clinical review capacity (2 days) — two distinct problems requiring two distinct agents 

- I Autonomous denial explicitly excluded from scope at Incubation, before any vendor engagement, on clinical governance grounds 

- I Compliance engaged pre-design to formalise the human-determination boundary in writing 

- I Two-phase build sequence proposed, prioritised by delay-source magnitude 

## **STAGE 2 — THE LINE THE BOARD WANTED TO MOVE** 

_Where a compelling ROI number tests a boundary that was supposed to be settled | Week 5 | Thursday, 12 March 2026_ 

#### _10:00 | Thursday 12 March 2026 | Executive Board Room_ 

#### **Architecture Review Board (ARB) — Attendees: Amara (EA), Ron (CMO), Dave (Compliance), Linh (UM)** 

### **Ron Faulkner — Chief Medical Officer** 

Amara, I’ve seen the numbers from a competitor payer running autonomous approval — not denial, just fast-track approval — for the clearest 15% of cases: total knee replacement post-op physical therapy, routine imaging follow-ups. Turnaround for those drops to under an hour. Why aren’t we considering that? 

### **Dr. Amara Osei — Enterprise AI Architect** 

I want to separate two things that sound similar but aren’t. Autonomous approval and autonomous denial carry very different risk profiles. An erroneous autonomous approval mostly costs us money — we pay for something that, on full review, might not have met criteria. An erroneous autonomous denial delays or denies someone’s care and creates real clinical and legal exposure. I’m much more open to a 

narrowly-scoped autonomous fast-track approval for a defined, low-risk, high-clarity case category than I would ever be to autonomous denial. 

### **Dave Kowalski — Chief Compliance Officer** 

What would ‘narrowly scoped’ actually mean in practice? 

### **Dr. Amara Osei — Enterprise AI Architect** 

A pre-approved, clinically-validated list of procedure-and-criteria combinations — built and periodically reviewed by Dr. Grant’s medical director panel, not by engineering — where the documentation either unambiguously meets criteria or it doesn’t, with no clinical judgment call in between. If the case falls outside that narrow list, or if the documentation-matching agent has anything less than full confidence, it routes to a human. And even within the fast-track category, I want a statistically sampled retrospective audit — a random 5% of auto-approved cases get full clinical review after the fact, so we catch drift before it becomes a pattern. 

### **Linh Tran — VP Utilization Management** 

What’s excluded from ever being fast-track eligible, regardless of confidence score? 

### **Dr. Amara Osei — Enterprise AI Architect** 

Anything involving a denial outcome, anything involving an appeal or a prior denial on the same member, anything above a defined cost threshold, and anything Dr. Grant’s panel hasn’t explicitly pre-validated. I’d rather launch with a narrow, boring list of ten procedure types than a broad list that looks impressive in a board deck and creates edge cases none of us anticipated. 

### **Ron Faulkner — Chief Medical Officer** 

I can live with narrow and boring if it’s defensible. Dave, are you comfortable? 

### **Dave Kowalski — Chief Compliance Officer** 

Comfortable with fast-track approval under those conditions. I remain firmly opposed to any autonomous denial pathway, now or in any future phase, without a full separate governance review and regulator consultation. 

#### I **ARTIFACT: ADR-2026-004** 

### **Architecture Decision Record — Prior Authorization Review Assistant** 

_Issued 12 March 2026_ 

#### **DECISION** 

Approve Option B, phased. Phase 1: Intake Documentation Agent. Phase 2: Criteria-Mapping Decision Support Agent for human reviewers. Phase 3 (conditional): narrow autonomous fast-track approval for a clinically pre-validated procedure list only — approval outcomes exclusively, never denial. 

#### **CONDITIONS** 

[CMO-001] Fast-track eligible list defined and maintained exclusively by Medical Director panel, reviewed quarterly 

[COMPLY-001] Autonomous denial explicitly and permanently out of scope absent a separate governance review 

[COMPLY-002] 5% random retrospective audit of all fast-track auto-approvals, full clinical review 

[UM-001] Any case outside pre-validated list, or below defined confidence threshold, routes to human reviewer with no exception 

#### **ARB CHAIR SIGN-OFF** 

Ron Faulkner (CMO) — DATE: 12/03/2026 

### **STAGE OUTCOMES** 

- I Board pressure to expand into autonomous denial resisted; narrow autonomous fast-track approval approved instead, with denial permanently excluded 

- I Asymmetric risk framing (approval error vs. denial error) established as the governing principle for future scope decisions 

- I Fast-track eligibility list ownership assigned to clinical Medical Director panel, not engineering, preventing scope creep by confidence-score tuning alone 

- I Mandatory retrospective audit sampling built into governance from approval, not added after an incident 

## **STAGE 3 — THE CONFIDENCE SCORE THAT MEANT NOTHING** 

_Where a model’s stated confidence and its actual reliability turn out to be different things | Weeks 7–12 | March–April 2026_ 

#### _10:00 | Tuesday 31 March 2026 | Clinical AI Lab_ 

#### **Design Working Session — Attendees: Amara (EA), Priya Bhatt (Lead ML Engineer)** 

### **Priya Bhatt — Lead ML Engineer** 

First calibration run on the criteria-mapping agent. It outputs a confidence score alongside every criteria match, 0 to 100. We were planning to route anything above 90 straight to fast-track eligibility checking. Problem: the confidence scores don’t track actual correctness. We had multiple cases scored 95+ confidence where the model had misread a lab value threshold — read ‘<50’ as ‘>50’ in the source note. 

### **Dr. Amara Osei — Enterprise AI Architect** 

So the self-reported confidence score is really a fluency-and-certainty signal from the language model, not a calibrated probability of correctness against the actual clinical criteria. That’s a well-known failure mode and I should have flagged it before you built around it — my mistake for not raising it in Stage 2 design assumptions. We need an external, independent confidence measure, not the model grading its own homework. 

### **Priya Bhatt — Lead ML Engineer** 

What would independent verification look like here? 

### **Dr. Amara Osei — Enterprise AI Architect** 

Structured extraction plus deterministic rule evaluation. The agent extracts specific clinical values — lab results, diagnosis codes, prior treatment dates — into a structured schema. Then a separate, non-generative rules engine evaluates those structured values against the InterQual/MCG criteria logic, which is deterministic, not probabilistic. The LLM’s job is extraction and summarisation; the rules engine’s job is the actual criteria match. ‘Confidence’ for fast-track purposes becomes: did extraction succeed unambiguously, and did the deterministic rule evaluate cleanly to a single answer — not a number the model made up. 

### **Priya Bhatt — Lead ML Engineer** 

That means building a proper extraction schema per procedure type in the fast-track list, and it means the extraction agent needs to flag its own uncertainty honestly — say ‘I can’t find this value’ rather than guessing. 

### **Dr. Amara Osei — Enterprise AI Architect** 

Exactly. And critically: an extraction failure or ambiguous source document is itself a routing signal — straight to human review, not a lower confidence score that still might clear a threshold. Absence of clean extraction is a hard stop, not a soft one. 

#### **EA'S INTERNAL THOUGHT** 

_This is a pattern I need to remember and generalise: whenever an agentic system uses a generative model’s self-reported confidence as a gate for autonomous action, that gate is unreliable by construction, because the model is scoring its own fluency, not ground truth. The fix is always the same shape — separate extraction (probabilistic, honest about uncertainty) from evaluation (deterministic, auditable) — and never let the generative component be both the evidence-gatherer and the judge._ 

#### I **ARTIFACT: SAD-2026-005** 

### **Solution Architecture Document (Extract) — Prior Auth Review Assistant** 

_v1.0 | Approved 22 April 2026_ 

#### **SECTION 3: DECISION SUPPORT ARCHITECTURE** 

Extraction Agent (generative, LLM): pulls structured clinical values from unstructured notes/faxes; must explicitly flag any value it cannot extract with high textual confidence — no silent best-guess. 

Criteria Evaluation Engine (deterministic, rules-based): evaluates extracted structured values against InterQual/MCG logic. Not a language model. Auditable, versioned, clinically owned by Medical Director panel. Fast-track eligibility = clean extraction (no flagged gaps) AND unambiguous single-answer deterministic evaluation AND procedure on pre-validated list. Any failure on any condition routes to human review. 

#### **SECTION 4: DOCUMENTATION AGENT (PHASE 1)** 

Scans inbound intake documents against a per-payer, per-procedure required-field checklist; generates structured, itemised deficiency requests to providers via portal (replacing fax loop). Deficiency list is templated from the checklist, not freely generated, to avoid inventing incorrect documentation requirements. 

#### **SECTION 5: NON-FUNCTIONAL REQUIREMENTS** 

Fast-track auto-approval latency: under 5 minutes. Human-routed case: criteria packet available to reviewer within 3 minutes of submission. 5% retrospective audit sampling automated and reported monthly to Medical Director panel. 

### **STAGE OUTCOMES** 

- I Critical design flaw caught pre-build: LLM self-reported confidence does not correlate with clinical correctness 

- I Architecture redesigned around extraction/evaluation separation — generative extraction feeding a deterministic, clinically-owned rules engine 

- I Extraction ambiguity made a hard routing stop to human review, not a soft confidence penalty 

- I Fax-based intake replaced with structured, templated deficiency requests, targeting the largest original delay source 

## **STAGE 4 — THE LIST THAT GREW ITSELF** 

_Governing scope creep in a system designed to stay narrow | Months 4–7 | May–August 2026_ 

#### _09:00 | Thursday 18 June 2026 (60% Build Review) | Clinical AI Lab_ 

#### **60% Architecture Compliance Review — Attendees: Amara (EA), Priya (ML Eng), Dr. Felix Grant (Medical Director panel)** 

### **Priya Bhatt — Lead ML Engineer** 

Build update: extraction and deterministic evaluation are both performing well in shadow mode — running live in parallel with human reviewers, not yet making decisions. One flag: Dr. Grant’s panel has expanded the fast-track list from the original 10 procedure types to 34 over the last six weeks, based on shadow-mode accuracy data. 

### **Dr. Felix Grant — Medical Director, external reviewer panel** 

The data supported it — extraction and evaluation accuracy on the new procedure types was consistently above 99.5% against retrospective human review. 

### **Dr. Amara Osei — Enterprise AI Architect** 

I don’t doubt the accuracy data, and expanding the list through your panel, on evidence, is exactly the governance process we designed — that’s working as intended, not scope creep in the bad sense. My concern is different: has anyone reassessed the exclusion criteria as the list grew? The original ten procedures were chosen partly because none of them had meaningful clinical variability or common comorbidity interactions. Some of the newer additions — I’m looking at the physical therapy authorization category — do have comorbidity-dependent criteria that a deterministic rules engine handles less cleanly. 

### **Dr. Felix Grant — Medical Director, external reviewer panel** 

Fair challenge. We added physical therapy because the base-case accuracy was excellent, but you’re right that we didn’t specifically stress-test the comorbidity edge cases the way we did for the original ten. 

### **Dr. Amara Osei — Enterprise AI Architect** 

I’d like to propose a standing requirement, not just for this category: every procedure type added to the fast-track list needs an explicit edge-case stress test as part of panel sign-off, not just aggregate accuracy on the general case mix. Aggregate accuracy can hide a systematic failure on a clinically important minority of cases. 

### **Dr. Felix Grant — Medical Director, external reviewer panel** 

Agreed. I’ll pull physical therapy back to shadow-only pending a dedicated comorbidity stress test, and I’ll apply the same standard going forward. 

I **ARTIFACT: GOV-2026-002** 

### **Fast-Track List Governance Addendum** 

_v1.1 | Amends ADR-2026-004_ 

#### **REQUIREMENT** 

Every procedure type nominated for the fast-track auto-approval list must pass (a) aggregate accuracy ≥99.5% against retrospective human review in shadow mode, and (b) an explicit comorbidity/edge-case stress test designed by the Medical Director panel, not just general case-mix accuracy. 

**OWNER** 

Medical Director panel (Dr. Felix Grant), reviewed quarterly, changes logged with rationale. 

### **STAGE OUTCOMES** 

- I Fast-track list expansion process validated as functioning governance, not uncontrolled scope creep — evidence-driven, panel-owned 

- I Gap identified: aggregate accuracy metrics can mask comorbidity-specific failure modes not present in the original narrow list 

- I Physical therapy category pulled back to shadow-only pending dedicated edge-case stress testing 

- I Standing requirement established: edge-case stress testing mandatory for all future fast-track additions, not just aggregate accuracy 

## **STAGE 5 — THE AUDIT THAT FOUND NOTHING, THEN SOMETHING** 

_Trusting the retrospective sample when it finally disagrees | Months 8–12 | September 2026–January 2027_ 

Fast-track auto-approval launches 1 September 2026 on the validated 33-procedure list (physical therapy excluded pending stress test). Turnaround for fast-track cases: 4 minutes median. Overall prior auth turnaround falls from 6.2 days to 1.8 days across all case types combined, driven mainly by the Phase 1 documentation agent eliminating fax-loop delay. 

#### _10:00 | Monday 7 December 2026 | Utilization Management floor_ 

#### **Monthly Retrospective Audit Review — Attendees: Amara (EA), Linh (UM), Sam Ortega (Member Advocate)** 

### **Sam Ortega — Member Advocate / Appeals Lead** 

I want to raise something from the appeals side, not the audit sample. We’ve had two member appeals this quarter where the underlying case was fast-track auto-approved, then a downstream claims adjudication system flagged a billing mismatch — the auto-approved authorization didn’t match what was ultimately billed. Neither case was in the 5% retrospective sample. 

### **Dr. Amara Osei — Enterprise AI Architect** 

That’s useful and it’s exactly the kind of signal a fixed random sample can miss — appeals and billing mismatches are a different, targeted lens on the same population. Can you get me both case files? I want to know if this is a documentation-extraction issue on our side or a provider billing discrepancy unrelated to our system. 

### **Linh Tran — VP Utilization Management** 

I pulled them this morning. Both cases: the extraction agent correctly identified the authorized procedure code. In both cases the provider billed a slightly different but related procedure code that wasn’t on the fast-track list. Our system approved the originally requested code correctly; the mismatch happened at the billing stage, after our decision. 

### **Dr. Amara Osei — Enterprise AI Architect** 

So the agent performed correctly — this is a downstream billing-versus-authorization reconciliation gap, not a flaw in the fast-track decision itself. Good to confirm, but I don’t want to just close this out. I want billing-mismatch rate added as a standing supplementary signal alongside the 5% retrospective clinical audit, specifically because it surfaced two cases the random sample didn’t happen to catch. A random sample and a targeted signal are complementary, not redundant. 

#### I **ARTIFACT: OPS-2026-Q4B** 

### **Prior Auth Assistant — Quarterly Operating Review** 

_Q4 2026_ 

#### **THROUGHPUT** 

Overall turnaround: 1.8 days (from 6.2 days baseline). Fast-track cases: 4 min median. 33 procedure types live; physical therapy remains shadow-only pending stress test. 

#### **AUDIT RESULTS** 

5% retrospective sample, 612 cases reviewed: 100% concordance with retrospective clinical review — zero incorrect fast-track approvals identified in the random sample. 

#### **SUPPLEMENTARY SIGNAL ADDED** 

Billing-authorization mismatch rate now tracked as a second, targeted audit lens following two appeals cases outside the random sample; both traced to downstream billing coding, not extraction or evaluation error. 

#### **COMPLIANCE** 

Regulatory turnaround standard (72 hours) met on 96% of all cases, up from an estimated 38% pre-programme. 

### **STAGE OUTCOMES** 

- I Prior auth turnaround reduced from 6.2 days to 1.8 days overall; fast-track cases resolved in minutes 

- I Random retrospective audit showed 100% concordance — but appeals-driven signal caught cases the fixed sample structurally could not 

- I Billing-authorization mismatch instituted as a second, complementary audit lens rather than relying on random sampling alone 

- I Regulatory turnaround compliance improved from an estimated 38% to 96% 

## **STAGE 6 — WHAT DOESN’T MAKE THE FAST-TRACK LIST** 

_Annual governance review, and the discipline of saying no to expansion | Month 13 | February 2027_ 

#### _14:00 | Wednesday 10 February 2027 | Executive Board Room_ 

#### **Annual Programme Governance Review — Attendees: Amara (EA), Ron (CMO), Dave (Compliance), Dr. Grant (Medical Director)** 

### **Ron Faulkner — Chief Medical Officer** 

The results speak for themselves. Some board members are now asking about extending fast-track to inpatient authorizations — much bigger cost category, much bigger visibility. 

### **Dr. Amara Osei — Enterprise AI Architect** 

I want to be candid about why I’d resist that, not just note it as a future consideration. Every procedure on our current list shares a property: low clinical variability, minimal comorbidity interaction, and a criteria set that reduces cleanly to deterministic logic. Inpatient authorizations are almost definitionally the opposite — high variability, multi-factor clinical judgment, exactly the profile we’ve been deliberately excluding. Extending fast-track there isn’t a scaling exercise, it’s a different problem that would need its own Incubation stage, its own risk assessment, and very likely a different architecture entirely, not just a bigger list. 

### **Dave Kowalski — Chief Compliance Officer** 

I’d go further — I think inpatient authorization decision support should stay in the same category we started with: assist the human reviewer, never approve autonomously, at least until we have multiple years of data on the current narrower programme. 

### **Dr. Grant — Medical Director, external reviewer panel** 

Agreed from the clinical panel. I’d rather protect the credibility of what we’ve built — a genuinely narrow, well-audited system — than dilute it by stretching into a domain where I can’t honestly promise the same rigor. 

### **Ron Faulkner — Chief Medical Officer** 

Understood. I’ll take that back to the board as the recommendation: expand documentation-agent and criteria-mapping decision support to inpatient cases, but no autonomous fast-track there, full stop, pending a dedicated future review. 

I **ARTIFACT: RDREC-2027-001** 

### **Annual Programme Governance Decision** 

_February 2027_ 

#### **DECISION** 

Phase 1 (Documentation Agent) and Phase 2 (Criteria-Mapping Decision Support) extended to inpatient authorization workflows. Phase 3 (autonomous fast-track approval) explicitly NOT extended to inpatient authorizations; remains scoped to the current 33 validated low-variability procedure types. 

#### **RATIONALE** 

Inpatient authorizations carry structurally higher clinical variability and comorbidity interaction than the outpatient procedure types validated for fast-track. Extension would require a new Incubation-stage risk assessment, not a list expansion. 

**APPROVED BY** 

Ron Faulkner (CMO), Dave Kowalski (Compliance), Dr. Felix Grant (Medical Director Panel) 

### **STAGE OUTCOMES** 

- I Board pressure to extend autonomous fast-track into inpatient authorizations declined by unanimous clinical, compliance, and architecture agreement 

- I Decision support (non-autonomous) phases extended to inpatient workflows, where the risk profile is appropriate 

- I Principle reaffirmed: narrow validated scope for autonomous action is a feature to be protected, not a limitation to be expanded under growth pressure 

- I Programme closes its first year with zero incorrect fast-track approvals in either the random or targeted audit lens 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2026-007)|Incubation|CMO, UM, Compliance|
|Architecture Decision Record (ADR-2026-004)|Pitch / Approve|ARB, CMO, Compliance|
|Solution Architecture Document (SAD-2026-005)|Design|ML Engineering, Medical Director|
|Fast-Track List Governance Addendum<br>(GOV-2026-002)|Build|Medical Director Panel|
|Quarterly Operating Review (OPS-2026-Q4B)|Operate|UM, Member Advocate, EA|
|Annual Programme Governance Decision<br>(RDREC-2027-001)|Review|CMO, Compliance, Medical Director|

_“In healthcare, the question is never just ‘can the model do this correctly most of the time.’ It’s ‘what happens to the person in the case where it doesn’t — and did we design so a human catches it before it matters.”_
