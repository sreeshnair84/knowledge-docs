---
title: "A Demo That Should Never Have Left the Room"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_11_Vaxion_Clinical_Trial_Matching_Agent.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

#### **AGENTIC AI IN THE ENTERPRISE** 

# **A Demo That Should Never Have Left the Room** 

Building an Agentic Clinical Trial Patient-Matching and Adverse Event Triage System Through Public Failure and Recovery 

A transcript-style account following Dr. Yusuf Kamara, Enterprise AI Architect at Vaxion Therapeutics, through a programme that fails publicly in its first demo, survives two architectural rejections, a sponsor departure, a cost-runaway incident, and a second safety-relevant failure eight months into operation — and comes out the other side with a human-in-the-loop design its own failure history ends up defending. 

#### **CAST OF CHARACTERS** 

#### **Dr. Yusuf Kamara** 

Enterprise AI Architect, Clinical Systems (EA) — our protagonist 

#### **Dr. Helen Doyle** 

Chief Medical Information Officer (CMIO) — original sponsor 

#### **Marcus Webb Jr.** 

VP Clinical Operations — becomes sponsor after Doyle's departure 

#### **Priyanka Iyer** 

Lead AI Engineer, Clinical Systems 

#### **Sanjay Kohli** 

Data Architect, Clinical Data Platform 

#### **Dr. Otieno Achieng** 

Head of Pharmacovigilance & Drug Safety 

#### **Renata Vasquez** 

CISO 

#### **Bill Strand** 

IRB Liaison & Regulatory Affairs 

#### **Nora Fitzgerald** 

Clinical Research Coordinator, Site 04 (pilot user) 

#### **INCUBATION** → **PITCH / APPROVE** → **DESIGN** → **BUILD** → **OPERATE** → **REVIEW** → **RETROSPECTIVE** 

Vaxion Therapeutics | Agentic Clinical Trial Patient-Matching & AE Triage | 2027 

## **STAGE 1 — A DEMO THAT SHOULD NEVER HAVE LEFT THE ROOM** 

_The first proof of concept fails in front of the people whose trust it needed most | Weeks 1–6 | March–April 2027_ 

#### _09:00 | Monday 1 March 2027 | Dr. Helen Doyle’s office_ 

#### **Informal Strategy Discussion — Attendees: Dr. Helen Doyle (CMIO), Dr. Yusuf Kamara (EA)** 

### **Dr. Helen Doyle — Chief Medical Information Officer** 

Yusuf, our Phase II oncology trial is enrolling at half the rate we need, and manual chart review to check eligibility criteria against our patient population takes a research coordinator four to six hours per candidate. I want an agentic system that reads patient records, matches them against trial protocols, and can proactively flag — maybe even contact — eligible patients. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

I can build the matching and flagging part quickly. The ‘contact patients’ part I’m going to push back on hard before we scope anything — any patient-facing autonomous action in a clinical trial context runs straight into IRB, informed consent, and HIPAA territory that I don’t think belongs anywhere near an unsupervised agent, ever. Let me build a fast proof of concept on matching alone and bring it back before we talk about anything patient-facing. 

### **Dr. Helen Doyle — Chief Medical Information Officer** 

Fine, but I want something to show the Site 04 coordinators by the end of the month — they’re the ones drowning in this work and I want their buy-in early. 

#### _14:00 | Thursday 25 March 2027 | Site 04, Clinical Research Office_ 

#### **Proof of Concept Demo — Attendees: Dr. Yusuf Kamara (EA), Priyanka Iyer (Lead AI Eng), Nora Fitzgerald (CRC, Site 04), three other coordinators** 

### **Priyanka Iyer — Lead AI Engineer** 

This is a live demo against de-identified records from your actual candidate pool. The agent reads the trial protocol’s inclusion and exclusion criteria and the patient chart, then produces a match assessment with reasoning. 

### **Nora Fitzgerald — Clinical Research Coordinator, Site 04** 

[after reviewing the output for patient candidate #7] This says the patient meets the washout period requirement for prior chemotherapy. I know this patient. She had a dose adjustment eleven days before her most recent scan that isn’t clearly dated in the structured fields — it’s in a free-text oncology note. This assessment is wrong, and it’s wrong in a way that could have gotten a real patient enrolled when she shouldn’t have been. 

### **Priyanka Iyer — Lead AI Engineer** 

[after checking] You’re right — the model picked up a chemotherapy date from a structured field that was actually a scheduling placeholder, not the administration date, and didn’t cross-reference the free-text note that had the real date. 

### **Nora Fitzgerald — Clinical Research Coordinator, Site 04** 

I appreciate you showing this to us honestly, but I want to be direct: this is exactly the kind of confident, plausible-looking mistake that’s more dangerous than an obviously broken tool, because it would have taken 

me a while to catch it on a candidate I didn’t already know as well as I know her. I’m not comfortable being an early adopter of something that gets structured-field-versus-free-text dates wrong on a washout period. 

#### **EA'S INTERNAL THOUGHT** 

_This is a genuinely bad outcome and I need to sit with it rather than immediately reframe it as a fixable bug, because Nora is right about the shape of the risk, not just this one instance of it. The failure here isn’t that the model made a mistake — every system makes mistakes. It’s that the mistake was confident, plausible, and specifically the kind that’s hardest for a busy coordinator to catch, on a criterion where being wrong has direct patient-safety consequences. I brought this to Site 04 too early, before I’d done the work to understand where structured data can’t be trusted over free text, and I burned trust with exactly the people I need as champions._ 

#### u **EMAIL** 

**From:** Dr. Yusuf Kamara (Enterprise AI Architect) **To:** Dr. Helen Doyle (CMIO) 

**Subject:** POC Demo at Site 04 Did Not Go Well — Need to Reset Timeline 

Helen, I need to tell you directly that Thursday’s demo at Site 04 surfaced a real, patient-safety-relevant error — the matching agent misread a chemotherapy washout date from a structured field that didn’t reflect the true administration date, missing the correct date in a free-text oncology note. Nora Fitzgerald caught it, and I’m glad she did, but the coordinators there are understandably skeptical now. I don’t want to push a revised version back to them until I’ve done real investigative work on how often structured fields diverge from free-text clinical narrative in our data, and I want Otieno’s pharmacovigilance team involved from here forward, not brought in later. I’d rather take an extra month here than lose Site 04’s trust for the life of this programme. Yusuf 

### **STAGE OUTCOMES** 

- I First proof of concept failed publicly in front of intended pilot users, on a patient-safety-relevant eligibility criterion 

- I Root cause identified as structured-field/free-text divergence, not a model capability failure — a data-quality and data-architecture problem masquerading as an AI accuracy problem 

- I Patient-facing autonomous contact ruled out at the earliest stage, before formal scoping, based on regulatory exposure alone 

- I Trust damage with the pilot site explicitly acknowledged rather than minimized, with timeline reset to rebuild credibility before re-engaging 

## **STAGE 2 — THREE FIGHTS IN ONE ROOM** 

_Security, platform, and clinical operations each reject a different part of the proposed design | Weeks 8–14 | May–June 2027_ 

#### _10:00 | Tuesday 18 May 2027 | Vaxion Therapeutics, ARB Chamber_ 

#### **Architecture Review Board Session — Attendees: Dr. Kamara (EA), Dr. Doyle (CMIO), Renata Vasquez (CISO), Sanjay Kohli (Data Architect), Bill Strand (IRB Liaison)** 

### **Renata Vasquez — CISO** 

I’m rejecting the proposed MCP integration pattern as written. The design has the matching agent connecting directly to the EHR’s clinical data API using a service account with broad read access across the entire patient population, not scoped to trial candidates. That’s a much larger blast radius than this use case needs, and if that service account is ever compromised or the agent is manipulated into over-broad queries, we’ve exposed our entire patient population, not just trial-relevant records. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

That’s a fair rejection and I should have scoped the access more tightly from the start rather than defaulting to the broadest connection the EHR vendor made easy to set up. I’ll redesign around a narrow, protocol-specific query interface that can only retrieve records for patients already flagged as potential candidates by a separate, narrower pre-filter, not open access to the full population. 

### **Sanjay Kohli — Data Architect, Clinical Data Platform** 

Separately, I want to reject the proposed knowledge model outright, not just tune it. The design treats trial protocols as flat documents to embed and retrieve against — but eligibility criteria have real logical structure: nested inclusion/exclusion conditions, cross-references between criteria, temporal relationships like washout periods. A flat embedding-and-retrieval approach is going to keep missing exactly the kind of structural relationship that caused the Site 04 failure. I want a structured knowledge graph representation of each protocol’s criteria, not a vector index over prose. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

I pushed back on that suggestion two weeks ago because I thought it added unnecessary engineering complexity for a first release, and I want to say plainly now that I was wrong to resist it — the Site 04 failure was exactly a structural-relationship failure, a washout period defined relative to a treatment date, and a flat retrieval approach has no natural way to represent that relationship at all. I’d rather take the additional build time than ship the same failure mode again. 

### **Bill Strand — IRB Liaison & Regulatory Affairs** 

And I want to formally note that even with those two fixes, this system produces a candidate recommendation for human review — it does not, ever, independently determine trial eligibility or contact a patient. That has to be in the ADR in language the IRB can point to directly, not implied by the architecture. 

#### _15:00 | Tuesday 18 May 2027 | Hallway outside ARB Chamber_ 

#### **Post-Meeting Exchange — Attendees: Dr. Kamara (EA), Dr. Doyle (CMIO)** 

### **Dr. Helen Doyle — Chief Medical Information Officer** 

That was a rougher session than I expected — rejected on security scope and rejected on the knowledge model in the same meeting. Are we still on track for a Q3 pilot? 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

Honestly, no — both rejections are correct, and both add real time. I’d rather tell you now that Q3 is very unlikely than protect an optimistic date I don’t believe in. I think we’re looking at early Q4 for a properly scoped pilot, assuming the knowledge graph rebuild goes reasonably smoothly, which after Site 04 I’m not going to promise without margin. 

### **Dr. Helen Doyle — Chief Medical Information Officer** 

I’d rather have the honest date. I’ll manage expectations upward. Just don’t let the margin quietly become the new deadline that also slips. 

#### I **ARTIFACT: ADR-2027-019** 

### **Architecture Decision Record — Agentic Clinical Trial Patient-Matching System** 

_Approved v1.0 (Revised) | Vaxion Therapeutics_ 

#### **DECISION** 

Approved to Design/Build, contingent on two rejected elements from initial proposal being redesigned: (1) EHR access scoped to a narrow, pre-filtered candidate population via protocol-specific query interface, not broad population access; (2) trial protocol eligibility criteria represented as a structured knowledge graph capturing logical and temporal relationships, not flat document embedding/retrieval. 

#### **PERMANENT EXCLUSION** 

System produces candidate match recommendations for human coordinator review only. No autonomous eligibility determination. No autonomous or agent-initiated patient contact, under any circumstance. 

#### **CONDITIONS** 

IRB-reviewable language confirming permanent exclusions included verbatim in system documentation. Revised timeline: Q4 2027 pilot, not Q3. 

#### **APPROVED BY** 

ARB Panel, Dr. Helen Doyle (CMIO), Renata Vasquez (CISO), Bill Strand (IRB Liaison) 

### **STAGE OUTCOMES** 

- I Two separate architectural rejections in a single ARB session — EHR access scope and knowledge representation model — both accepted and incorporated rather than contested 

- I EA publicly acknowledged having previously resisted the knowledge-graph approach that turned out to be necessary, modeling accountability over defensiveness 

- I Realistic timeline reset communicated proactively to the sponsor rather than protecting an optimistic date under pressure 

## **STAGE 3 — THE GUIDANCE THAT CHANGED THE SCOPE OVERNIGHT** 

_An unexpected regulatory development forces a redesign mid-stream | Weeks 16–24 | July–September 2027_ 

#### _11:00 | Wednesday 21 July 2027 | Clinical Systems Engineering lab_ 

#### **Design Working Session — Attendees: Dr. Kamara (EA), Sanjay Kohli (Data Architect), Priyanka Iyer (Lead AI Eng)** 

### **Sanjay Kohli — Data Architect, Clinical Data Platform** 

Knowledge graph construction against our first three protocols is going well — we’re representing washout periods, staged dosing requirements, and cross-criteria dependencies explicitly now instead of hoping a retrieval system infers them. Vector search is still in the loop for the free-text clinical notes, though, and I want to flag it’s performing worse in this more realistic test set than it did on our clean early samples. 

### **Priyanka Iyer — Lead AI Engineer** 

Confirmed — recall on relevant free-text passages dropped from around ninety percent in early testing to closer to sixty-five percent against a broader, messier sample of real clinical notes, which include a lot more abbreviation variance, inconsistent formatting across different treating physicians, and scanned handwritten addenda that didn’t exist in our clean test set at all. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

That’s a real production-realism gap, and I’d rather find it now than after go-live. I want us to treat this the way Sanjay treated the structural-relationship problem — not tune around it, understand it. Can we characterize which note types and which authoring physicians are driving the recall drop specifically? 

#### _09:00 | Monday 9 August 2027 | Dr. Kamara’s office_ 

#### **Unexpected Development — Attendees: Dr. Kamara (EA), Bill Strand (IRB Liaison), phone** 

### **Bill Strand — IRB Liaison & Regulatory Affairs** 

[phone] Yusuf, FDA issued new draft guidance this morning on AI/ML-enabled tools used in clinical trial recruitment and conduct. It’s more specific than anything that existed when we scoped this — it requires documented, auditable reasoning traces for any AI-assisted eligibility recommendation that’s later relied upon in an enrollment decision, and it wants explicit disclosure to IRBs of the tool’s known failure modes and limitations, not just a general description. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

That’s going to reshape the output format, not just the documentation — I need every match 

recommendation to carry a structured, auditable trace back to the specific protocol criteria and specific chart evidence that produced it, not a narrative summary. And I want to get ahead of the failure-mode disclosure requirement rather than treat it as a compliance afterthought — the Site 04 washout-date failure and the free-text recall gap both belong in that disclosure explicitly, as known and actively mitigated limitations, not hidden. 

### **Bill Strand — IRB Liaison & Regulatory Affairs** 

I’d actually go further — I think proactively disclosing a failure we caught and fixed, with the fix documented, makes for a stronger IRB submission than a system that claims no known limitations at all. It shows the process working, not just the outcome. 

#### **EA'S INTERNAL THOUGHT** 

_Bill’s reframe is worth sitting with: I’d been treating the Site 04 failure as something to move past quietly once fixed, and here’s a regulator, indirectly, telling us the opposite — that documented failure and documented remediation is itself evidence of a trustworthy process, more so than a system with no visible history of ever having been wrong. That’s a genuinely different way to think about transparency in this programme, and I want to carry it forward past this one regulatory submission._ 

#### I **ARTIFACT: SAD-2027-011** 

### **Solution Architecture Document — Agentic Clinical Trial Patient-Matching System** 

_v1.1 (Post-Guidance Revision) | Vaxion Therapeutics_ 

#### **KNOWLEDGE REPRESENTATION** 

Structured knowledge graph for protocol eligibility criteria, capturing logical and temporal relationships. Free-text clinical note retrieval via hybrid vector + rule-based extraction, targeting known low-recall note types identified in realistic-data testing. 

#### **AUDITABLE REASONING TRACE** 

Every match recommendation includes structured trace to specific protocol criteria and specific chart evidence, per FDA draft guidance (Aug 2027) requirement for AI-assisted eligibility recommendations relied upon in enrollment decisions. 

#### **DISCLOSED KNOWN LIMITATIONS** 

Structured-field/free-text date divergence (Site 04 finding, remediated via knowledge graph temporal modeling); reduced recall on handwritten addenda and non-standard note formats (active mitigation in progress, disclosed as ongoing). 

#### **SCOPE (UNCHANGED)** 

Human coordinator review required for every recommendation. No autonomous eligibility determination or patient contact. 

### **STAGE OUTCOMES** 

- I Unanticipated FDA draft guidance mid-design forced a substantive redesign of output format around auditable reasoning traces, absorbed as a design improvement rather than pure compliance burden 

- I Production-realism testing caught a significant recall gap on messy real-world clinical notes before pilot, avoiding a second Site 04-style failure 

- I Reframed disclosure of known limitations as evidence of process maturity rather than a liability to minimize, changing the IRB submission strategy 

## **STAGE 4 — THE SPONSOR LEAVES, THE COST EXPLODES, AND THE AGENT LOOPS** 

_Three unrelated crises land inside the same six weeks | Weeks 26–34 | September–November 2027_ 

#### _08:00 | Monday 27 September 2027 | Dr. Kamara’s office_ 

#### **Unexpected Development — Attendees: Dr. Kamara (EA), Dr. Doyle (CMIO)** 

### **Dr. Helen Doyle — Chief Medical Information Officer** 

Yusuf, I need to tell you directly — I’ve accepted a CMIO role at another organization, effective in three weeks. I know this lands badly mid-programme. I’ve recommended Marcus Webb from Clinical Operations as my successor sponsor; he knows the programme and supports it, but he’s going to need real ramp-up time on the technical decisions we’ve already made. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

I appreciate you telling me directly rather than letting me find out secondhand. I’ll put together a full decision-history briefing for Marcus — every rejected design, why it was rejected, and why we landed where we did — so he’s not starting from zero and second-guessing settled decisions out of unfamiliarity rather than genuine disagreement. 

#### _14:00 | Wednesday 6 October 2027 | Clinical Systems Engineering lab_ 

#### **Build Review — Attendees: Dr. Kamara (EA), Priyanka Iyer (Lead AI Eng)** 

### **Priyanka Iyer — Lead AI Engineer** 

Two things, and neither is good. First, our LLM API spend for the month is running roughly six times our projection. I dug in — the knowledge-graph query agent is making far more calls than expected because it re-queries the graph from scratch on every candidate criterion rather than reusing results across related criteria within the same patient evaluation, and on complex protocols with forty-plus criteria that compounds fast. Second, in stress testing yesterday, the same agent entered what looks like an infinite loop on one specific protocol — it kept re-attempting a graph query that was timing out, retrying indefinitely rather than failing gracefully, and burned about four hours of compute before anyone noticed. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

Both of those need fixing, and I want the loop treated as the more urgent one even though the cost number is the more dramatic one — an agent that can’t fail gracefully is a production-outage risk, not just a budget risk. I want a hard retry ceiling and a circuit breaker on any single query pattern, non-negotiable, before we touch the cost-optimization work. Then let’s redesign the query pattern to batch and cache related criteria within one evaluation instead of re-querying from scratch each time. 

### **Priyanka Iyer — Lead AI Engineer** 

I should have caught the missing retry ceiling in design review — that’s a basic agentic-systems guardrail and I let it slip because we were focused on eligibility accuracy, not operational robustness. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

I’m equally responsible — I reviewed that design too and didn’t catch it either. I want us to build a standing pre-build checklist from this, covering the operational guardrails we now know we need — retry ceilings, circuit breakers, cost-per-evaluation ceilings — so we’re not relying on catching this kind of gap by memory on the next protocol we onboard. 

#### **EA'S INTERNAL THOUGHT** 

_This is a hard stretch — losing Helen as sponsor right as two real engineering failures surfaced, in the same month, is the kind of coincidence that makes a programme feel like it’s coming apart even when each individual problem is fixable on its own. I want to resist the urge to quietly absorb all of this and present Marcus with a clean, already-resolved picture when he starts. He should see the real state of the programme, mistakes included, so his first real decisions are made with accurate information rather than an artificially smooth handoff._ 

#### _10:00 | Monday 25 October 2027 | Marcus Webb’s office_ 

#### **Sponsor Handoff — Attendees: Dr. Kamara (EA), Marcus Webb Jr. (new VP Clinical Ops sponsor)** 

### **Marcus Webb Jr. — VP Clinical Operations** 

Helen’s notes say this programme is in good shape technically but has had a rough few weeks. Walk me through what ‘rough’ actually means — I’d rather hear the unfiltered version now than discover it during the pilot. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

Fair, and I’ll give you the unfiltered version. We had a public matching failure at Site 04 early on that cost us real trust there, which we’re still rebuilding. We had two separate ARB rejections on the architecture that added roughly two months. New FDA guidance forced a mid-stream redesign of our output format, which was the right call but also cost time. And in the last three weeks specifically, we found a cost-runaway issue and an infinite-loop bug in the same engineering review, both now fixed with new guardrails, plus documentation of the gap in our own review process that let them through in the first place. None of that changes my confidence in where we’ll land — but I didn’t want your first weeks built on a sanitized history. 

### **Marcus Webb Jr. — VP Clinical Operations** 

I appreciate the directness, genuinely. I’d rather sponsor a programme with a documented, honestly-told rough patch than one that presents as flawless right up until it isn’t. What do you need from me specifically going into the pilot? 

### **STAGE OUTCOMES** 

- I Sponsor transition handled with full decision-history transparency rather than a curated handoff, preserving institutional memory across the change 

- I Cost-runaway and infinite-loop failures investigated to root cause and fixed with standing operational guardrails, with the gap in prior design review explicitly owned by both engineer and architect 

- I A new pre-build operational-guardrail checklist created directly from this failure, intended to prevent the same category of gap on future protocol onboarding 

## **STAGE 5 — WINNING SITE 04 BACK** 

_Adoption resistance from the pilot users who were burned once already | Months 1–6 | December 2027–May 2028_ 

#### _10:00 | Thursday 9 December 2027 | Site 04, Clinical Research Office_ 

#### **Pilot Launch Meeting — Attendees: Dr. Kamara (EA), Nora Fitzgerald (CRC, Site 04), three other coordinators** 

### **Nora Fitzgerald — Clinical Research Coordinator, Site 04** 

I remember the washout-date miss from March. I’m willing to try the revised version, but I want to be clear that trust here is earned slowly, not restored by a good pitch. What’s actually different this time, mechanically, not just ‘we fixed it’? 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

Fair question, and I’ll answer it mechanically rather than reassuringly. Washout periods and other temporal criteria are now represented explicitly in a structured knowledge graph, not inferred from a flat document — the specific failure mode from March is now a category of error the system is structurally less able to make, not just a case we patched. And every recommendation now comes with a full evidence trace back to the specific chart data it used, so you can verify it yourself in under a minute instead of having to independently re-derive the whole assessment the way you had to in March. 

### **Nora Fitzgerald — Clinical Research Coordinator, Site 04** 

That evidence trace is the part that actually matters to me. I don’t need it to be right every time — I need to be able to check it fast when I’m not sure. I’ll pilot it on new candidates only, not retroactively on ones I’ve already screened, and I want a direct line to your team, not a ticket queue, for the first month. 

Pilot rollout proceeds across four sites, Site 04 included, starting 9 December 2027. Adoption is gradual rather than immediate — Nora’s team uses the system on roughly 40% of new candidates in month one, rising to 85% by month four as the evidence-trace verification workflow builds confidence. Average eligibility screening time falls from 4–6 hours to under 45 minutes per candidate across adopting sites. 

#### _13:00 | Tuesday 14 March 2028 | Pharmacovigilance & Drug Safety office_ 

#### **Adverse Event Triage Incident Review — Attendees: Dr. Kamara (EA), Dr. Otieno Achieng (Pharmacovigilance)** 

### **Dr. Otieno Achieng — Head of Pharmacovigilance & Drug Safety** 

I want to flag an issue with the adverse event severity triage component specifically, separate from the matching system’s track record. Last week the agent classified a reported adverse event as Grade 2 based on the reporter’s free-text description; a pharmacovigilance reviewer reclassified it as Grade 3 on manual review, because the free text used a colloquial phrase for a symptom that maps to a more severe MedDRA code than the agent’s generative interpretation assumed. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

That’s a serious finding and I want to treat it with the same weight as the Site 04 failure, not as a minor calibration issue — adverse event under-classification has direct patient-safety and regulatory-reporting consequences. I think the right fix mirrors what we learned in Design: the severity classification shouldn’t be a generative interpretation of free text at all. It should be a deterministic MedDRA coding lookup against structured symptom extraction, with the generative layer only handling extraction, never severity judgment. 

### **Dr. Otieno Achieng — Head of Pharmacovigilance & Drug Safety** 

Agreed, and I want every AE triage output flagged for mandatory human review going forward regardless of confidence, permanently — not as an interim measure while we fix this, as the permanent operating model. Adverse event severity is not a domain where I want autonomous classification, full stop, the same way patient eligibility never got autonomous determination. 

#### I **ARTIFACT: OPS-2028-Q1** 

### **Agentic Clinical Trial Systems — Quarterly Operating Review** 

_Q1 2028_ 

#### **MATCHING PERFORMANCE** 

Average eligibility screening time: 4–6 hrs to under 45 min across adopting sites. Site 04 adoption recovered to 90% of new candidates by end of Q1, from a standing start of active distrust in March 2027. 

#### **ADVERSE EVENT TRIAGE INCIDENT** 

One Grade 2→Grade 3 under-classification caught in manual review; root cause was generative free-text severity interpretation rather than deterministic MedDRA lookup. Remediated by restructuring to deterministic classification with generative extraction only; permanent mandatory human review affirmed as standing policy, not interim. 

#### **OPERATIONAL GUARDRAILS** 

Zero cost-runaway or infinite-loop incidents since October 2027 remediation; retry-ceiling and circuit-breaker guardrails holding across four pilot sites. 

### **STAGE OUTCOMES** 

- I Pilot adoption at the previously-burned site rebuilt gradually through a verifiable evidence-trace workflow rather than a persuasion campaign 

- I A second, independent AE-triage classification failure was caught, treated with equal seriousness to the original Site 04 failure, and fixed with the same deterministic-versus-generative architectural principle 

- I Mandatory human review for adverse event severity affirmed as a permanent policy rather than an interim safeguard pending further validation 

## **STAGE 6 — A COMPETITOR DEMO AND A BUDGET QUESTION** 

_Executive pressure to move faster meets a year of hard-won caution | Month 8 | July 2028_ 

#### _14:00 | Wednesday 12 July 2028 | Vaxion Therapeutics, Executive Board Room_ 

#### **Executive Review — Attendees: Dr. Kamara (EA), Marcus Webb Jr. (VP Clinical Ops), CFO (guest), Dr. Otieno Achieng (Pharmacovigilance)** 

### **CFO (guest) — —** 

A vendor demoed a competing patient-matching platform to me last week that claims fully autonomous eligibility screening with no human review step, and a price point well under what we’ve invested in this programme internally. I want to understand why we’re not further along toward that level of automation after sixteen months of work. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

I’d want to see that vendor’s system undergo the same failure modes we hit and caught internally before I’d trust a claim of fully autonomous screening — our own system had a patient-safety-relevant washout-date error in its first public demo, and a Grade 2/3 adverse-event misclassification eight months after that, each caught specifically because a human was in the loop verifying the system’s reasoning. A vendor claiming to have skipped that human-review step entirely is either claiming to have solved a harder problem than we have, or hasn’t yet had the failure that reveals why the step exists. I’d want to see their failure history, not just their demo, before treating ‘no human review’ as a selling point rather than a red flag. 

### **Dr. Otieno Achieng — Head of Pharmacovigilance & Drug Safety** 

I’ll add the regulatory dimension: FDA’s draft guidance from last August specifically anticipates documented reasoning traces and disclosed failure modes for AI tools relied upon in enrollment decisions. A fully autonomous system with no review step is a much harder system to defend in an IRB submission or an FDA inspection, regardless of its accuracy claims. 

### **Marcus Webb Jr. — VP Clinical Operations** 

I’ll speak to the numbers directly — screening time down from 4–6 hours to under 45 minutes, adoption recovered at the one site that had every reason to reject this outright, and two real safety-relevant failures caught by design before they reached a patient. I don’t think the lesson from those numbers is ‘move faster toward full autonomy.’ I think it’s ‘the human-in-the-loop model is why those numbers are trustworthy at all.’ 

### **CFO (guest) — —** 

That’s a more convincing answer than I expected. I’d still like a formal cost-benefit comparison against the vendor option for the record, but I’m not pushing for a change in direction based on what I’ve heard today. 

#### I **ARTIFACT: RDREC-2028-004** 

### **Annual Programme Governance Decision** 

_July 2028_ 

#### **DECISION** 

Agentic Clinical Trial Patient-Matching & AE Triage System confirmed as steady-state production across four pilot sites, expansion to two additional sites approved. Fully autonomous, no-human-review operating model explicitly declined as a direction, including in response to competing vendor offering. 

#### **RATIONALE** 

Two independent safety-relevant failures (Site 04 matching error; Grade 2/3 AE misclassification) were caught specifically because of human review, directly evidencing the review step’s necessity rather than its redundancy; FDA draft guidance further disfavors fully autonomous designs for enrollment-relevant recommendations. 

#### **APPROVED BY** 

Marcus Webb Jr. (VP Clinical Ops), Dr. Otieno Achieng (Pharmacovigilance), CFO 

### **STAGE OUTCOMES** 

- I Executive pressure toward faster, fully-autonomous automation was met with evidence from the programme’s own failure history rather than a defensive posture 

- I The programme’s two safety-relevant failures were reframed, accurately, as evidence for why the human-review architecture is necessary, not as marks against the programme 

- I Expansion approved on the existing human-in-the-loop model, with no erosion of the permanent scope boundaries set at Pitch/Approve 

## **STAGE 7 — WHAT SIXTEEN MONTHS ACTUALLY TAUGHT US** 

_A candid look back, not a highlight reel | Month 8 | July 2028_ 

#### _10:00 | Friday 21 July 2028 | Clinical Systems Engineering lab_ 

#### **Programme Retrospective — Attendees: Dr. Kamara (EA), Priyanka Iyer (Lead AI Eng), Sanjay Kohli (Data Architect), Marcus Webb Jr. (sponsor)** 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

I want this retrospective to be genuinely candid, including about my own decisions, not a highlight reel for the next steering committee slide. What succeeded: the structured knowledge graph representation, the auditable evidence-trace format, and the permanent human-review boundary all held up under real pressure, including executive pressure to abandon that last one. What failed, more than once: I under-scoped operational guardrails — retry ceilings, circuit breakers — in early design, and that gap let a real cost and reliability incident happen that a basic pre-build checklist would have prevented. 

### **Sanjay Kohli — Data Architect, Clinical Data Platform** 

I’d add a technical-debt item: the free-text extraction pipeline for clinical notes is still weaker on handwritten addenda and non-standard formats than I’d like, even after remediation. We disclosed it honestly to the IRB, which was the right call, but it’s still a real limitation I’d want addressed before we onboard protocols with a higher proportion of that note type. 

### **Priyanka Iyer — Lead AI Engineer** 

Anti-pattern worth naming explicitly for other teams: we initially treated ‘the model gave a wrong answer’ and ‘the model gave a confidently wrong answer with no way to quickly verify it’ as the same category of problem. They’re not. The evidence-trace requirement that came out of the FDA guidance turned out to be more valuable for rebuilding Site 04’s trust than any accuracy improvement we made — verifiability mattered more than raw correctness for actual adoption. 

### **Dr. Yusuf Kamara — Enterprise AI Architect** 

If I were starting this programme over, I’d build the evidence-trace and structured-reasoning requirements in from day one rather than treating them as a response to external regulatory pressure — we got lucky that the guidance landed early enough in Design to absorb the redesign relatively cheaply. I’d also insist on the operational-guardrail checklist existing before any build work started, not after an incident forced it into existence. 

### **Marcus Webb Jr. — VP Clinical Operations** 

From the sponsor side: the thing I’d recommend to the next programme is exactly what Helen did on her way out and what Yusuf did with me — full, unfiltered decision-history handoffs. I started this sponsorship with an accurate picture of a programme that had already failed once publicly and recovered, and that accuracy is why I was able to defend it credibly to the CFO in July rather than being caught flat-footed by a hard question about our own track record. 

Recommendations carried forward to the next clinical AI programme at Vaxion: (1) build the operational-guardrail checklist — retry ceilings, circuit breakers, cost-per-evaluation limits — before any agentic build begins, not after the first incident; (2) treat structured, auditable reasoning traces as a default design requirement for any clinical-adjacent recommendation system, not a response to external regulatory pressure; (3) preserve full decision-history documentation through any sponsor or 

team transition, treating transparency about past failures as an asset for institutional credibility, not a liability to minimize; (4) recognize that free-text clinical narrative will consistently underperform structured data in realistic conditions, and budget accordingly rather than discovering the gap in production-adjacent testing. 

### **STAGE OUTCOMES** 

- I Retrospective explicitly named unresolved technical debt (free-text extraction on non-standard note formats) rather than declaring the programme complete 

- I A specific, generalizable anti-pattern — conflating wrongness with unverifiable wrongness — articulated as a lesson for future programmes 

- I Concrete, actionable recommendations for the next clinical AI programme captured directly from this programme’s specific failures, not generic best practice 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Decision Record (ADR-2027-019)|Pitch / Approve|ARB, CISO, IRB Liaison|
|Solution Architecture Document (SAD-2027-011)|Design|Data Architecture, AI Engineering,<br>IRB Liaison|
|Quarterly Operating Review (OPS-2028-Q1)|Operate|Pharmacovigilance, Clinical Ops|
|Annual Programme Governance Decision<br>(RDREC-2028-004)|Review|VP Clinical Ops, Pharmacovigilance,<br>CFO|

_“The version of this programme worth remembering isn’t the one where nothing went wrong. It’s the one where a coordinator caught a mistake that mattered, told us plainly, and we let that moment reshape the architecture instead of just the apology.”_
