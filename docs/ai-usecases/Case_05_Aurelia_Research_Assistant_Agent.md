---
title: "Necessary But Not Sufficient"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_05_Aurelia_Research_Assistant_Agent.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# Necessary But Not Sufficient
Building an Agentic Scientific Research Assistant Inside a Drug Discovery Organisation

A transcript-style account following Dr. Naledi Khumalo, Enterprise AI Architect at Aurelia Biosciences, as she designs a research agent for literature review, internal data cross-reference, and patent prior-art surfacing — discovering that citation presence, aggregate accuracy, and clean results can all mask silent, systematic gaps.

## Cast of Characters

| Character | Role |
| ----------- | ------ |
| **Dr. Naledi Khumalo** ⭐ | Enterprise AI Architect, R&D; Systems (EA) — our protagonist |
| **Dr. Piotr Zielinski** | Chief Scientific Officer (CSO) — sponsor |
| **Dr. Helena Marsh** | Head of Computational Chemistry |
| **Andres Villalobos** | Lead ML/Agentic Systems Engineer |
| **Dr. Ben Okonjo** | Head of IP & Patent Strategy |
| **Claire Fenwick** | Head of Data Governance |

:::info[Case Journey]
**`INCUBATION`**  →  **`PITCH / APPROVE`**  →  **`DESIGN`**  →  **`BUILD`**  →  **`OPERATE`**  →  **`REVIEW`**
:::

*Aurelia Biosciences | Agentic Research Assistant Platform | 2026*

---

## Stage 1 — THE LITERATURE NOBODY HAD TIME TO READ

*Scoping an agent for scientific research without scoping away the science*
`Week 1 | Monday, 11 May 2026`

:::note[📅 Meeting]
**🕐 09:00**  📍 *Monday 11 May 2026 | Piotr Zielinski’s office*

**Informal Strategy Discussion**

*Attendees: Piotr Zielinski (CSO), Naledi Khumalo (EA)*
:::

> **Dr. Piotr Zielinski** — *Chief Scientific Officer*
>
> Naledi, our medicinal chemists are spending close to a third of their time on literature review and target validation research — reading papers, cross-referencing patent filings, checking prior art — before they even get to actual hypothesis generation. I want an agentic research assistant that can do the groundwork so our scientists spend more time thinking and less time reading.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> That’s a compelling goal, and also one of the higher-stakes domains I could be asked to build in — if an agent misrepresents a paper’s findings or misses a critical piece of prior art, that’s not just an inefficiency, it could send a research programme down a dead end, or worse, into IP infringement territory. Before I scope this as a build, I want to understand precisely what ‘do the groundwork’ means task by task.

> **Dr. Piotr Zielinski** — *Chief Scientific Officer*
>
> Fair. Helena’s computational chemistry team would be the first users — talk to them.

:::note[📅 Meeting]
**🕐 11:00**  📍 *Wednesday 13 May 2026 | Computational Chemistry Lab*

**Discovery Interview**

*Attendees: Naledi Khumalo (EA), Dr. Helena Marsh (Head of Computational Chemistry)*
:::

> **Dr. Helena Marsh** — *Head of Computational Chemistry*
>
> When we’re validating a new target, the workflow is: search the literature for everything published on the target and related pathways, check patent databases for existing IP that might block a compound class, cross-reference our internal experimental database for anything we’ve already tried, and then synthesise all of that into a target validation summary. Each of those four steps could plausibly be agent-assisted, but they carry very different risk if the agent gets something wrong.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> Walk me through the risk difference as you see it.

> **Dr. Helena Marsh** — *Head of Computational Chemistry*
>
> Literature search and summarisation — if the agent misses a paper or slightly mischaracterises a finding, a good scientist reading the summary alongside the actual sources will usually catch it, especially if we can see citations. Patent prior-art search is scarier, because a missed or misread patent could mean we invest years and tens of millions into a compound class that turns out to infringe, and by the time anyone double-checks manually, we’ve already committed resources based on the agent’s summary.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> So patent prior-art work needs a fundamentally different assurance level than literature summarisation — not because the underlying agent technology is different, but because the cost of being wrong and unnoticed is so much higher and the feedback loop for catching an error is so much slower. I want to scope this in phases with that risk gradient explicit: literature summarisation with mandatory citations first, patent prior-art as a much more heavily human-reviewed capability, introduced later and never fully autonomous.

> **Dr. Ben Okonjo** — *Head of IP & Patent Strategy*
>
> If I may — I’d go further on patents specifically. I don’t want an AI system’s prior-art assessment to ever be the sole basis for a go/no-go decision on IP freedom-to-operate. That determination legally needs to rest on qualified patent counsel’s judgment, informed by whatever the agent surfaces, not replaced by it.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> That’s exactly the boundary I want written down before design starts, not discovered as a gap later. The agent’s role in the patent domain is comprehensive, well-cited surfacing of potentially relevant prior art for counsel’s review — never an autonomous freedom-to-operate opinion.

:::info[📋 Artifact: AIA-2026-041]

**Architecture Intake Assessment — Agentic Research Assistant Platform**

##### *Draft v0.2 | Aurelia Biosciences*

**BUSINESS PROBLEM STATEMENT**

Medicinal chemistry scientists spend an estimated 30% of working time on literature review, prior-art checking, and internal-data cross-referencing ahead of hypothesis generation, reducing capacity for novel scientific reasoning.

**RISK GRADIENT (KEY FINDING)**

Four candidate workflow steps carry materially different risk-of-undetected-error profiles: literature summarisation (lower — self-correcting via visible citations), internal experimental cross-reference (lower-medium), patent prior-art surfacing (high — slow feedback loop, high cost of undetected miss), freedom-to-operate determination (out of scope entirely — remains exclusively with qualified patent counsel).

**BUILD / BUY / REUSE ASSESSMENT**

Option A: Vendor all-in-one research AI including autonomous FTO opinions — REJECTED at intake, incompatible with IP counsel requirement.

Option B: Phased internal build — literature/internal-data agents first (lower risk), patent prior-art surfacing agent second with mandatory counsel review, FTO determination permanently human-only — Effort: MED-HIGH, Risk: MED (with phasing), Speed: MED

Option C: Literature summarisation only, no patent-domain capability — Effort: LOW, Risk: LOW, Speed: HIGH, Value: MED

**RECOMMENDATION**

Option B, phased by risk gradient, with IP & Patent Strategy as a permanent governance stakeholder for any patent-domain capability.

:::

:::tip[✅ Stage Outcomes]

- ✅ Risk gradient across four candidate research workflows identified as the central design constraint, not treated as a single undifferentiated “AI for research” problem

- ✅ Freedom-to-operate determination explicitly and permanently excluded from AI scope — remains with qualified patent counsel

- ✅ Phased build sequence proposed: lower-risk literature/internal-data capability first, patent prior-art surfacing with mandatory counsel review second

- ✅ IP & Patent Strategy embedded as a standing governance stakeholder from Incubation

:::

## Stage 2 — CITATIONS ARE NOT OPTIONAL DECORATION

*Approving a research agent that must show its work, always*
`Week 5 | Wednesday, 17 June 2026`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Wednesday 17 June 2026 | Aurelia HQ, Executive Briefing Room*

**Architecture Review Board (ARB)**

*Attendees: Naledi (EA), Piotr (CSO), Helena (Comp Chem), Ben (IP), Claire (Data Governance)*
:::

> **Dr. Ben Okonjo** — *Head of IP & Patent Strategy*
>
> I want the citation requirement to be more than a nice-to-have UI feature. Every factual claim the literature agent makes about a paper’s findings needs to be traceable to a specific passage in a specific source, not a general ‘based on the literature’ gesture. Scientists need to be able to verify quickly, not re-read the whole paper.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> Agreed, and I’d make that requirement even stronger: I want the agent architecturally unable to state a specific finding — a numeric result, an experimental conclusion — without an inline citation resolving to source text. This is the same discipline I’d apply to any agentic system producing claims a human will act on: fluent-but-uncited is not acceptable in this domain any more than in fraud investigation or clinical review.

> **Claire Fenwick** — *Head of Data Governance*
>
> On the internal experimental database cross-reference — that data includes some unpublished, commercially sensitive results from partner collaborations with contractual data-sharing restrictions. I need assurance the agent won’t surface partner-restricted data outside its permitted access boundary, especially if a scientist’s query spans both our data and partner data.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> That needs to be enforced at the data access layer, not the prompt layer — the agent should never even receive partner-restricted records it isn’t entitled to return for a given user and a given collaboration agreement, rather than relying on the model to correctly decide not to mention something it technically has access to. I’ll design retrieval permissions to mirror our existing data-sharing agreement structure exactly, enforced before any content reaches the agent’s context window.

> **Dr. Helena Marsh** — *Head of Computational Chemistry*
>
> What’s the plan for the patent prior-art agent specifically — timeline and review process?

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> Phase 2, starting after Phase 1 literature/internal-data agents are validated in production. Every patent prior-art surfacing output goes to Ben’s team for review before it informs any research decision, and I want to build in a deliberate completeness bias — tuned to over-surface potentially relevant prior art rather than under-surface, since a false positive costs counsel some review time, but a false negative could cost years of wasted research investment.

I **ARTIFACT: ADR-2026-029**

### **Architecture Decision Record — Agentic Research Assistant Platform**

*Issued 17 June 2026*

**DECISION**

Approve Option B, phased. Phase 1: Literature Summarisation Agent + Internal Experimental Cross-Reference Agent. Phase 2: Patent Prior-Art Surfacing Agent, mandatory IP counsel review on every output, tuned toward completeness over precision. Freedom-to-operate determination permanently excluded from AI scope.

**CONDITIONS**

[COMPCHEM-001] Every specific factual claim requires an inline citation resolvable to source passage; architecturally enforced, not a UI convention

[GOVERNANCE-001] Partner-restricted data access enforced at retrieval layer per existing data-sharing agreement structure, before content reaches agent context — not relied upon as a model behaviour [IP-001] Patent prior-art agent tuned toward completeness (over-surfacing) rather than precision, given asymmetric cost of a missed prior-art reference

[IP-002] All Phase 2 outputs mandatorily reviewed by IP & Patent Strategy before informing any research decision

**ARB CHAIR SIGN-OFF**

Piotr Zielinski (CSO) — DATE: 17/06/2026

:::tip[✅ Stage Outcomes]

- ✅ Inline, passage-resolvable citation made an architectural requirement, not a UI feature, for any specific factual claim

- ✅ Partner-restricted data access enforced at the retrieval layer, matching existing contractual data-sharing structures, rather than relying on model judgment

- ✅ Patent prior-art agent explicitly tuned toward completeness over precision, reflecting the asymmetric cost of a missed reference versus a false positive

- ✅ Freedom-to-operate determination reaffirmed as permanently outside AI scope

:::

## Stage 3 — THE PAPER THAT SAID SOMETHING IT DIDN’T SAY

*Where citation-presence and citation-accuracy turn out to be different problems*
`Weeks 7–14 | June–August 2026`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Tuesday 21 July 2026 | Agentic Systems Lab*

**Evaluation Review**

*Attendees: Naledi (EA), Andres Villalobos (Lead ML/Agentic Engineer), Helena (Comp Chem)*
:::

> **Andres Villalobos** — *Lead ML/Agentic Systems Engineer*
>
> First evaluation on the literature agent: citation presence is at 99.6% — almost every claim has an attached citation, which looked great until Helena’s team did a deeper spot-check.

> **Dr. Helena Marsh** — *Head of Computational Chemistry*
>
> Citation presence isn’t the same as citation accuracy. We manually checked eighty claims against their cited sources. Seventy-four were accurate. Six had a citation attached to a real paper, but the specific claim attributed to that paper was a subtly wrong paraphrase — not fabricated, but overstated or understated relative to what the source actually says. One example: the source paper reported a statistically significant but modest effect size, and the agent’s summary characterised it as a ‘strong’ effect.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> That’s a more dangerous failure mode than a missing citation, honestly, because a missing citation is visibly incomplete and a scientist will treat it with appropriate scepticism, whereas a confidently cited but subtly overstated claim looks fully verified at a glance. I want a second evaluation dimension specifically for this: not just ‘does a citation exist’ but ‘does the claim’s strength and specificity match the source’s actual strength and specificity,’ checked against a held-out expert-annotated sample, not just automated citation-matching.

> **Andres Villalobos** — *Lead ML/Agentic Systems Engineer*
>
> We can build a calibration check — comparing the hedging language and effect-size framing in the summary against the source’s actual reported statistics, and flag summaries where the model appears to be amplifying certainty beyond what the source supports.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> Build it, and I want it framed to the scientists using the platform as a known and monitored limitation, not something we quietly patch and call solved — language models have a documented tendency to sharpen and amplify claims during summarisation, and no fix is likely to be perfect. Ongoing spot-check auditing needs to be a permanent feature of this platform’s operations, not a one-time pre-launch check.

:::tip[💭 Internal Thought]

Ben’s IP concern and Helena’s calibration finding are the same underlying lesson wearing different clothes: a system that fluently cites its sources can still misrepresent them, and the fluency itself is what makes the misrepresentation dangerous — it looks more trustworthy than an honest ‘I’m not sure.’ I keep re-learning this lesson in every domain I work in, and I should stop treating it as a surprise each time and start treating it as a standing design principle: citation presence is necessary, never sufficient.

:::

:::info[📋 Artifact: SAD-2026-034]

**Solution Architecture Document (Extract) — Agentic Research Assistant Platform**

*v1.0 | Approved 18 August 2026*

**SECTION 3: CITATION FIDELITY ARCHITECTURE**

Two-dimensional evaluation, both mandatory: (1) Citation Presence — every specific claim has a resolvable source citation. (2) Citation Fidelity — claim strength/specificity calibrated against source’s actual reported strength/specificity, checked via automated calibration scoring plus recurring expert-annotated spot-check sampling.

**SECTION 4: DATA ACCESS ENFORCEMENT**

Partner-restricted experimental data filtered at retrieval layer per collaboration agreement metadata, before reaching agent context window. No reliance on model-level access judgment.

**SECTION 5: STANDING GOVERNANCE**

Citation fidelity spot-check auditing established as a permanent, recurring operational process, not a one-time pre-launch gate — reflecting the inherent, not fully eliminable, risk of claim amplification in summarisation.

:::

:::tip[✅ Stage Outcomes]

- ✅ Critical distinction established between citation presence (99.6%) and citation fidelity (92.5% on manual spot-check) — a gap that looked like success on the surface metric alone

- ✅ Calibration scoring built to detect claim-strength amplification relative to source material

- ✅ Citation fidelity spot-check auditing made a permanent operational process rather than a one-time pre-launch validation

- ✅ Partner-restricted data enforcement confirmed at the retrieval layer, matching Stage 2 governance requirement

:::

## Stage 4 — THE PRIOR ART THAT ARRIVED TOO CLEAN

*Testing the completeness-over-precision mandate against real patent counsel workflow*
`Months 5–9 | September 2026–January 2027`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Thursday 12 November 2026 (Phase 2, 50% Build Review) | IP & Patent Strategy Office*

**50% Architecture Compliance Review**

*Attendees: Naledi (EA), Andres (Lead Engineer), Ben (IP)*
:::

> **Dr. Ben Okonjo** — *Head of IP & Patent Strategy*
>
> First batch of prior-art surfacing results on a live target validation exercise. My initial reaction was actually concern, not relief — the results looked too clean. Eleven prior-art references surfaced, all clearly relevant, no obvious noise. Given how messy real patent search usually is, I asked my team to run the same search manually as a comparison.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> Good instinct — an unusually clean result from a system we explicitly tuned toward

completeness-over-precision should raise suspicion, not confidence, precisely because we expected some noise as the cost of not missing anything. What did the manual comparison find?

> **Dr. Ben Okonjo** — *Head of IP & Patent Strategy*
>
> My team found four additional references the agent missed entirely — not noisy or borderline, genuinely relevant prior art. All four were patents filed in non-English-language jurisdictions, machine-translated into our patent database with translation quality that apparently degraded the agent’s search-term matching.

> **Andres Villalobos** — *Lead ML/Agentic Systems Engineer*
>
> That tracks — our search agent is doing semantic matching against the patent text, and if the machine translation introduced enough terminology drift, semantically similar concepts could end up textually dissimilar enough to fall below our retrieval threshold.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> This is a serious finding precisely because it violates the design mandate from Stage 2 — we asked for completeness bias and got an undetected completeness gap in a specific, systematic category: non-English-language filings. I don’t want a point fix for this one language pair. I want a broader review of retrieval performance segmented by filing jurisdiction and original language, because if translation-quality variance is causing silent gaps in one category, it’s plausibly happening in others we haven’t specifically tested yet.

:::info[📋 Artifact: GOV-2027-001]

**Prior-Art Retrieval Jurisdiction Coverage Standard**

*v1.0 | Mandatory for Patent Prior-Art Surfacing Agent*

**FINDING**

Semantic retrieval performance varies systematically by filing jurisdiction and original document language, correlated with machine-translation quality in the underlying patent database, not a random or uniform gap.

**REQUIREMENT**

Retrieval performance must be evaluated and reported per major filing jurisdiction/language, not as a single blended recall metric. Any jurisdiction falling below the defined recall threshold against a gold-standard comparison set triggers either a retrieval-method adjustment for that language or an explicit, documented coverage-limitation disclosure attached to every prior-art report involving that jurisdiction.

**OWNER**

IP & Patent Strategy (Ben Okonjo) jointly with AI/ML Engineering (Andres Villalobos), reviewed quarterly.

:::

:::tip[✅ Stage Outcomes]

- ✅ An unusually clean, noise-free result from a completeness-tuned system correctly treated as a warning sign rather than a success indicator

- ✅ Systematic prior-art retrieval gap identified in non-English-language patent filings, traced to machine-translation quality variance

- ✅ Jurisdiction-segmented retrieval evaluation established as a standing requirement, replacing a single blended recall metric

- ✅ Explicit coverage-limitation disclosure mechanism built for any jurisdiction not yet meeting the recall threshold, rather than silently shipping a known gap

:::

## Stage 5 — THE AMPLIFICATION AUDIT, SIX MONTHS IN

*Proving a permanent monitoring commitment was worth keeping*
`Months 10–14 | February–June 2027`

Phase 1 (literature and internal-data agents) reaches full production adoption across the medicinal chemistry organisation by March 2027; scientists report literature review and cross-referencing time reduced from roughly 30% to 11% of working hours. Phase 2 (patent prior-art surfacing) launches in limited pilot with three target validation teams following the jurisdiction-coverage remediation.

:::note[📅 Meeting]
**🕐 10:00**  📍 *Tuesday 4 May 2027 | Computational Chemistry Lab*

**Six-Month Citation Fidelity Audit**

*Attendees: Naledi (EA), Helena (Comp Chem), Andres (Lead Engineer)*
:::

> **Dr. Helena Marsh** — *Head of Computational Chemistry*
>
> Second round of the recurring citation fidelity spot-check, six months into production. Citation presence holding at 99.7%. Citation fidelity — the deeper check on claim-strength calibration — improved from 92.5% at launch to 97.1% now.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> That’s a meaningful improvement. What drove it — a model update, a prompt change, or something in how scientists are using the system?

> **Andres Villalobos** — *Lead ML/Agentic Systems Engineer*
>
> Partly a calibration-scoring refinement on our side. But Helena’s team also tells me scientists have started treating low-confidence flagged summaries differently — checking the source directly more often when the calibration score is borderline, which seems to have created a feedback loop where the flagged cases get reported and we tune against them.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> That’s the outcome I was hoping the permanent-audit commitment would produce — not a system that becomes perfect, but a monitoring and feedback loop that keeps genuinely improving it and keeps the scientists appropriately calibrated in their own trust of it. I want this audit result, including the 2.9% residual fidelity gap, reported transparently in the same format every cycle — I don’t want a good result this quarter to become a reason to quietly stop auditing next quarter.

:::info[📋 Artifact: OPS-2027-Q2]

**Agentic Research Assistant Platform — Semi-Annual Operating Review**

*Q2 2027*

**ADOPTION & PRODUCTIVITY**

Literature/internal-data review time reduced from ~30% to ~11% of scientist working hours (Phase 1, full production). Patent prior-art pilot: 3 target validation teams, 100% of outputs reviewed by IP & Patent Strategy per governance requirement.

**QUALITY**

Citation presence: 99.7%. Citation fidelity: 97.1% (up from 92.5% at launch), residual gap actively monitored, not treated as resolved.

**PATENT COVERAGE**

Jurisdiction-segmented recall now meeting threshold across 6 of 8 major filing languages; 2 languages still carrying explicit coverage-limitation disclosure per GOV-2027-001 pending further retrieval-method work.

**GOVERNANCE**

Permanent citation fidelity audit and jurisdiction coverage review both continuing on schedule; no proposal to discontinue either despite strong current results.

:::

:::tip[✅ Stage Outcomes]

- ✅ Literature and internal-data review time reduced from approximately 30% to 11% of scientist working hours

- ✅ Citation fidelity improved from 92.5% to 97.1% over six months of production operation, driven by the permanent audit commitment and resulting feedback loop

- ✅ Patent prior-art pilot operating successfully within its mandatory counsel-review boundary across three target validation teams

- ✅ Jurisdiction coverage gap narrowed from 8 languages needing disclosure to 2, with continued remediation in progress rather than declared complete

:::

## Stage 6 — WHAT THE PLATFORM TAUGHT THE COMPANY

*Annual review — codifying "necessary but not sufficient" as a company-wide AI principle*
`Month 15 | July 2027`

:::note[📅 Meeting]
**🕐 14:00**  📍 *Wednesday 14 July 2027 | Aurelia HQ, Executive Briefing Room*

**Annual Programme Review**

*Attendees: Naledi (EA), Piotr (CSO), Ben (IP), Claire (Data Governance)*
:::

> **Dr. Piotr Zielinski** — *Chief Scientific Officer*
>
> This programme has been a genuine productivity win, and I want to expand agentic assistance into clinical trial design support next — protocol drafting, endpoint selection literature review. But I also want to make sure we’re carrying forward what we learned here, not starting from zero on risk thinking again.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> That’s exactly the right instinct, and I’d like to formalise it rather than rely on me personally remembering to apply these lessons to the next programme. The core principle underneath everything we did here — citation presence is necessary but not sufficient, aggregate accuracy can hide a systematic gap in an important minority, an unusually clean result from a completeness-tuned system deserves scrutiny not celebration — these aren’t specific to drug discovery. I want to write these up as standing Aurelia agentic AI design principles, reviewed and updated as we learn more, so clinical trial design and any future agentic initiative starts from this baseline instead of rediscovering it.

> **Dr. Ben Okonjo** — *Head of IP & Patent Strategy*
>
> I’d add one more from the patent side specifically: any AI-assisted output that informs a legal or regulatory determination needs an explicit, named human owner of the final call, always, regardless of how good the AI’s contribution is. That’s not a limitation of the technology — it’s a statement about where accountability has to sit.

> **Dr. Naledi Khumalo** — *Enterprise AI Architect*
>
> Agreed, and that maps directly onto clinical trial design too — endpoint selection and protocol decisions need the same permanent human-accountability boundary that freedom-to-operate has here. I’ll build that into the principles document explicitly before the next Incubation cycle starts.

:::info[📋 Artifact: PLATFORM-2027-003]

**Aurelia Agentic AI Design Principles — Rationalisation Decision**

*July 2027*

**DECISION**

Research Assistant Platform’s risk-gradient phasing approach, citation fidelity discipline, and jurisdiction/segment-aware evaluation practices codified into standing Aurelia Agentic AI Design Principles, owned by Enterprise AI Architecture.

**CORE PRINCIPLES**

Citation/evidence presence is necessary but never sufficient — fidelity and calibration must be independently measured · Aggregate accuracy metrics must be segmented by any dimension where systematic gaps are plausible (language, jurisdiction, case category) before being trusted · Unusually clean results from a system tuned toward completeness warrant scrutiny, not celebration · Any AI-informed output feeding a legal, regulatory, or clinical determination requires a permanently named human accountability owner

**NEXT INTAKE**

Clinical Trial Design Support Agent enters Architecture Intake Q3 2027, built on these principles from day one.

:::

:::tip[✅ Stage Outcomes]

- ✅ Design lessons from an eighteen-month programme codified into standing, reusable Aurelia Agentic AI Design Principles

- ✅ Human-accountability-ownership principle generalised beyond patent law to all legal, regulatory, and clinical AI-informed determinations

- ✅ Clinical Trial Design Support Agent queued as the next initiative, explicitly built on accumulated principles rather than starting fresh

- ✅ Programme closes having reduced literature/data review burden by roughly two-thirds while catching two systematic, otherwise-silent quality gaps before they caused harm

#### **EPILOGUE & ARTEFACT REGISTER**

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2026-041)|Incubation|CSO, Comp Chem, IP Strategy|
|Architecture Decision Record (ADR-2026-029)|Pitch / Approve|ARB, IP, Data Governance|
|Solution Architecture Document (SAD-2026-034)|Design|ML Engineering, Comp Chem|
|Prior-Art Jurisdiction Coverage Standard<br>(GOV-2027-001)|Build|IP Strategy, ML Engineering|
|Semi-Annual Operating Review (OPS-2027-Q2)|Operate|Comp Chem, IP Strategy|
|Agentic AI Design Principles Decision<br>(PLATFORM-2027-003)|Review|CSO, IP, Data Governance|

*“A citation makes a claim look verified. It doesn’t make it true. Building an agent for scientific work means designing for that gap, permanently, not closing it once and moving on.”*

:::
