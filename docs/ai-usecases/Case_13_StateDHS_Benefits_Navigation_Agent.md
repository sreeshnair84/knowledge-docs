---
title: "The Mainframe Owner Who Said No"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_13_StateDHS_Benefits_Navigation_Agent.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

# **The Mainframe Owner Who Said No** 

Building an Agentic Benefits Navigation Assistant Through Legacy Constraints, a Critical Security Finding, and a Change in Political Leadership 

A transcript-style account following Imani Bledsoe, Enterprise AI Architect at the State Department of Human Services, through a legacy-system standoff, a legal data-use restriction, a critical prompt-injection vulnerability caught before launch, an election that nearly ended the programme, and a language-equity trade-off with no clean answer that gets escalated, resolved, and revisited a year later with real evidence. 


## Cast of Characters

| Character | Role |
|-----------|------|
| **Imani Bledsoe** ⭐ | Enterprise AI Architect, Constituent Services (EA) — our protagonist |
| **Ray Delacroix-Huang** | Deputy Director, original programme sponsor |
| **Commissioner Patricia Voss** | Agency Commissioner (departs mid-programme after election) |
| **Commissioner Earl Tanaka** | Agency Commissioner (successor, post-election) |
| **Wanda Okoye** | General Counsel |
| **Frank Delgado** | Legacy Systems Director (mainframe eligibility engine owner) |
| **Selin Yalcin** | Lead AI Engineer, Constituent Services |
| **Marcus Webb** | State CISO |
| **Denise Callahan** | Caseworker Union Steward |


:::info[Case Journey]
**`INCUBATION`**  →  **`PITCH / APPROVE`**  →  **`DESIGN`**  →  **`BUILD`**  →  **`OPERATE`**  →  **`REVIEW`**  →  **`RETROSPECTIVE`**
:::


*State Department of Human Services | Agentic Benefits Navigation Assistant | 2027*

---


## Stage 1 — THE MAINFRAME OWNER WHO SAID NO

*The first real obstacle is not the AI at all — it is the thirty-year-old system it needs to talk to*
`Weeks 1–6 | January–February 2027`


:::note[📅 Meeting]
**🕐 09:00**  📍 *Monday 11 January 2027 | Ray Delacroix-Huang’s office*

**Informal Strategy Discussion**

*Attendees: Ray Delacroix-Huang (Deputy Director), Imani Bledsoe (EA)*
:::


> **Ray Delacroix-Huang** — *Deputy Director*
>
> Imani, our benefits eligibility process spans SNAP, Medicaid, and three state-specific programmes, each with different eligibility rules, and constituents routinely apply for one and get rejected from another they’d actually qualify for, simply because navigating all five systems requires more expertise than any single caseworker or applicant reasonably has. I want an agentic assistant that can help applicants and caseworkers navigate eligibility across all five programmes coherently. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> That’s a real and worthwhile problem, and I want to flag immediately that the eligibility rules engine underneath all five programmes runs on the same thirty-year-old mainframe system, which I understand almost nothing in this agency currently integrates with directly — everything goes through batch overnight file transfers. Before I scope any agentic architecture, I need to understand whether that system can support real-time queries at all, because if it can’t, this entire vision may need to be built around a fundamentally different, slower interaction pattern than what you’re describing. 


:::note[📅 Meeting]
**🕐 13:00**  📍 *Thursday 21 January 2027 | Legacy Systems office*

**Discovery Interview**

*Attendees: Imani Bledsoe (EA), Frank Delgado (Legacy Systems Director)*
:::


> **Frank Delgado** — *Legacy Systems Director*
>
> I’ll save you some time: the answer is no, and I want to be direct about why before this becomes an argument about my team being obstructionist, which I’ve been accused of before on other projects. That mainframe eligibility engine has zero modern API surface, runs a nightly batch cycle that I do not have budget or staffing to modify, and any real-time integration attempt is going to either require rebuilding decades of undocumented COBOL business rules from scratch, or building a shadow copy of eligibility logic that will drift out of sync with the authoritative system the moment anyone changes a rule on either side. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> I appreciate you being direct rather than letting me find that out three months into a build. I don’t want to fight you on the constraint — I want to understand it well enough to design around it honestly. If real-time integration genuinely isn’t viable, what is the actual data latency we could work with? Is nightly batch truly the ceiling, or is there a narrower, lower-risk integration — read-only, specific fields only — that your team could support without touching the core eligibility logic at all? 


> **Frank Delgado** — *Legacy Systems Director*
>
> Read-only, specific fields, nightly batch — that I could support with modest effort. What I won’t support, this year or probably ever with current staffing, is anything that writes back to the mainframe or that depends on real-time responsiveness from a system built in an era when ‘real-time’ wasn’t a design consideration anyone had. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> Understood, and I’d rather design a genuinely useful system around a real constraint than fight for six months to get a marginal responsiveness improvement out of a system that was never built for it. Nightly 


batch, read-only, becomes the architectural foundation, not an obstacle to route around. 


:::tip[💭 Internal Thought]

Frank’s ‘no’ could have become a months-long political fight if I’d treated it as an obstacle to overcome rather than a real constraint to design within — I’ve seen that fight before, at other agencies, and it rarely ends with the legacy system yielding; it usually ends with a shadow system nobody trusts because it silently drifted out of sync with the system of record. Accepting the nightly-batch constraint early, honestly, is going to shape everything downstream — no real-time eligibility determination is possible at all under this constraint, which actually simplifies one of the harder governance questions before it even gets asked.

:::


:::note[📧 Email]

**From:** Imani Bledsoe (Enterprise AI Architect) 

**To:** Wanda Okoye (General Counsel) 

**Subject:** Early Flag: Agentic Benefits Navigation Assistant — Data Use and Training Data Questions Before Design Freeze 

Wanda, scoping an agentic assistant to help applicants and caseworkers navigate cross-programme eligibility, built around a nightly-batch, read-only integration with our legacy eligibility mainframe (confirmed with Frank Delgado’s team — real-time integration is not viable this year). Before I go further, I need your read on two things: (1) whether we can use historical applicant data, even de-identified, to fine-tune or evaluate any model component, given the sensitivity of benefits data, and (2) what disclosure obligations we have to applicants about AI involvement in navigation guidance. I’d rather build the legal boundary in from the start than discover a use restriction after architecture is set. Can we meet this week? Imani

:::


:::info[📋 Artifact: AIA-2027-004]

**Architecture Intake Assessment — Agentic Benefits Navigation Assistant**

_Draft v0.1 | State Department of Human Services_ 

**BUSINESS PROBLEM STATEMENT**

Applicants and caseworkers navigating SNAP, Medicaid, and three state-specific benefit programmes lack coherent cross-programme eligibility guidance, resulting in missed eligible benefits and duplicated application effort. 

**CONFIRMED CONSTRAINT**

Core eligibility rules engine runs on a legacy mainframe supporting only nightly batch, read-only integration; no real-time query capability and no write-back capability this fiscal year, per Legacy Systems Director confirmation. 

**KEY RISK FLAGGED AT INTAKE**

Historical applicant data sensitivity and potential training-data use restrictions pending Legal review; AI-involvement disclosure obligations to applicants undetermined. 

**NEXT STEPS**

General Counsel data-use and disclosure review; caseworker union engagement on job-impact concerns; CISO review of read-only mainframe integration security posture.

:::


:::tip[✅ Stage Outcomes]

- ✅ A hard technical constraint from the legacy system owner was accepted and designed around early, rather than fought, avoiding a likely months-long unproductive conflict 

- ✅ Nightly-batch, read-only architecture adopted as a foundational design decision, which incidentally simplified later autonomous-determination governance questions by making real-time autonomous action structurally impossible 

- ✅ Legal data-use and disclosure questions raised proactively at intake rather than discovered after architecture commitments were made

:::


## Stage 2 — LEGAL SAYS NO TO THE TRAINING DATA, THE UNION SAYS NO TO THE WHOLE IDEA

*Two separate rejections in the same month, for very different reasons*
`Weeks 8–14 | March 2027`


:::note[📅 Meeting]
**🕐 10:00**  📍 *Tuesday 9 March 2027 | Legal Department*

**Legal Review Findings**

*Attendees: Imani Bledsoe (EA), Wanda Okoye (General Counsel)*
:::


> **Wanda Okoye** — *General Counsel*
>
> I’m blocking the use of historical applicant data for any model fine-tuning, including de-identified data, at least for now. Our data-sharing consent language, going back years, describes use “for eligibility determination and programme administration” — it does not contemplate use for training an AI system, and I’m not comfortable stretching that language to cover a use case applicants never consented to, particularly for a vulnerable population that includes people with limited practical ability to object to how their data gets used. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> That’s a significant constraint on the technical approach, and I’d rather absorb it now than build something we’d have to unwind later. Can we still use general-purpose, publicly available eligibility rule text — the actual published programme regulations, not applicant records — as the knowledge base the assistant reasons over? That doesn’t touch applicant data at all. 


> **Wanda Okoye** — *General Counsel*
>
> Yes, published regulatory text is fine — that’s public information, not applicant data. My concern is specifically about using real people’s case histories to train or tune anything. I’d also want updated consent language drafted for any future data use we do want, but that’s a longer process I don’t want to gate this specific programme on. 


:::note[📅 Meeting]
**🕐 14:00**  📍 *Thursday 18 March 2027 | Union Hall*

**Stakeholder Engagement Meeting**

*Attendees: Imani Bledsoe (EA), Denise Callahan (Union Steward), caseworker representatives*
:::


> **Denise Callahan** — *Caseworker Union Steward*
>
> I want to be direct with you before this goes further: our members have watched two previous ‘efficiency’ technology rollouts at this agency get followed by headcount reductions within eighteen months, framed afterward as ‘the system made positions redundant.’ I’m not going to support this quietly and find out in a year that it was pitched to leadership as a staffing reduction opportunity behind closed doors. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> I can’t promise you leadership decisions I don’t control, and I won’t pretend to. What I can commit to, and put in writing in the architecture record itself, is what this specific system is designed to do: it navigates and explains eligibility rules to applicants and caseworkers, it does not make eligibility determinations, and it doesn’t reduce caseworker judgment calls to a rubber-stamp review — caseworkers remain the decision-makers on every case, full stop, by design, not as a current-phase limitation. If leadership later proposes using this system’s existence to justify headcount reduction, that’s a fight I’d expect your local to have with them directly, and I’d rather the architecture itself not give them ammunition for it by being more autonomous than the actual business need requires. 


> **Denise Callahan** — *Caseworker Union Steward*
>
> I want that scope commitment in the ADR, explicitly, in language my local’s counsel can review before I’ll recommend our members engage with the pilot at all. 


:::note[📅 Meeting]
**🕐 10:00**  📍 *Thursday 25 March 2027 | ARB Chamber*

**Architecture Review Board Session**

*Attendees: Imani (EA), Ray Delacroix-Huang (Deputy Director), Wanda Okoye (Legal), Marcus Webb (CISO)*
:::


> **Marcus Webb** — *State CISO*
>
> I want the record to show this system is explicitly and permanently scoped to eligibility navigation and explanation, not determination, per both the Legal consent constraint and the union commitment Imani just described — and I want that scope enforced architecturally, not just documented, so a future product manager can’t quietly expand it without a new ARB review. 


> **Ray Delacroix-Huang** — *Deputy Director*
>
> Agreed, and I’ll say plainly this is a narrower system than I originally envisioned in January. I think it’s still the right one to build given the constraints we’ve found — the mainframe limitation, the data-use restriction, and the legitimate union concern all point the same direction, toward navigation and explanation rather than determination. 


:::info[📋 Artifact: ADR-2027-011]

**Architecture Decision Record — Agentic Benefits Navigation Assistant**

##### _Approved v1.0 | State Department of Human Services_ 

**DECISION**

Approved to Design/Build. Knowledge base restricted to published regulatory text, not historical applicant data. System scope permanently limited to eligibility navigation and explanation; no eligibility determination authority, enforced architecturally. 

**RATIONALE**

Legal consent-language restriction on applicant data use; caseworker union commitment that system will not substitute for or reduce caseworker decision authority; converges with mainframe read-only/batch constraint already limiting real-time determination capability. 

**CONDITIONS**

Scope commitment documented in language reviewable by union local counsel. Any future scope expansion requires new ARB review, not incremental product decision. 

**APPROVED BY**

ARB Panel, Ray Delacroix-Huang (Deputy Director), Wanda Okoye (General Counsel), Marcus Webb (CISO)

:::


:::tip[✅ Stage Outcomes]

- ✅ Legal rejection of applicant-data training use was absorbed by redirecting the knowledge base to public regulatory text, preserving the core use case without the restricted data 

- ✅ Union distrust rooted in genuine prior organizational history was engaged directly and specifically, resulting in an architecturally-enforced scope commitment rather than a verbal reassurance 

- ✅ Original programme vision was explicitly narrowed from what the sponsor first described, with that narrowing acknowledged openly rather than downplayed

:::


## Stage 3 — THE PENETRATION TEST FINDS A DOOR PROPPED OPEN

*A critical security flaw, an uncomfortable finding, and an election that changes the sponsor overnight*
`Weeks 16–24 | April–June 2027`


:::note[📅 Meeting]
**🕐 09:00**  📍 *Wednesday 12 May 2027 | CISO office*

**Penetration Test Findings Review**

*Attendees: Imani (EA), Marcus Webb (CISO), Selin Yalcin (Lead AI Eng)*
:::


> **Marcus Webb** — *State CISO*
>
> Penetration testing found a critical flaw, and I want to walk through it carefully because it’s a genuinely novel attack vector for this agency. The assistant accepts uploaded documents from applicants — pay stubs, utility bills, for verifying income and residency claims during navigation. Our testers embedded adversarial instructions inside a scanned document’s metadata and, separately, as near-invisible text layered into a PDF, and were able to get the assistant to disclose portions of its system instructions and, in one test, to describe eligibility thresholds in a way that contradicted its own published-regulation knowledge base. 


> **Selin Yalcin** — *Lead AI Engineer, Constituent Services*
>
> That’s a prompt-injection vector through document uploads that we hadn’t adequately tested — we treated document content as data to extract information from, not as a channel an adversarial actor could use to inject instructions. Given this assistant is publicly accessible to any applicant, that’s a much larger and more accessible attack surface than an internal system would have. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> I want to treat this with real seriousness given the population this serves — if a bad actor can manipulate the assistant into giving incorrect eligibility guidance to a vulnerable applicant, that’s a direct harm to exactly the people this system exists to help. I don’t want a narrow patch on this specific injection technique. I want document content treated as strictly untrusted input from here forward, provenance-tagged and isolated from the assistant’s instruction-following context entirely, the same isolation pattern I’ve seen work in other agentic systems dealing with untrusted external input. 


> **Marcus Webb** — *State CISO*
>
> I’m not comfortable approving this for the planned June pilot until that isolation is built and independently re-tested. I know that’s a real timeline hit, and I’m making the call anyway — this finding is too serious for a partial fix under deadline pressure. 


:::note[📅 Meeting]
**🕐 08:00**  📍 *Wednesday 9 June 2027 | Imani’s office*

**Unexpected Development**

*Attendees: Imani Bledsoe (EA), Ray Delacroix-Huang (Deputy Director)*
:::


> **Ray Delacroix-Huang** — *Deputy Director*
>
> I need to tell you something that’s going to affect this programme’s sponsorship. Commissioner Voss is stepping down following last week’s statewide election results, effective in three weeks. Her successor, Commissioner Tanaka, is coming in with a stated priority of “reviewing all in-flight technology programmes for cost and necessity” before committing to continue them — that’s a direct quote from his transition briefing. I don’t know yet whether this programme survives that review. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> I’d rather walk into that review with an honest, complete picture than a defensive one. I’ll prepare a full briefing — the mainframe constraint, the legal data-use restriction, the union scope commitment, and the 


security finding we just found and are actively fixing — framed as evidence of a programme that’s been rigorously governed under real constraints, not one that’s been rubber-stamped. If Commissioner Tanaka wants to cancel it after seeing that, I’d rather that be an informed decision than one made without the full context. 


:::info[📋 Artifact: SEC-2027-002]

**Critical Security Finding & Remediation Record**

_State Department of Human Services CISO Office_ 

**FINDING**

Prompt injection via adversarial instructions embedded in uploaded document metadata and near-invisible layered PDF text; assistant disclosed portions of system instructions and produced eligibility guidance contradicting its own knowledge base in penetration testing. 

**SEVERITY**

Critical — publicly accessible attack surface with potential for direct harm to vulnerable applicant population through manipulated eligibility guidance. 

**REMEDIATION**

Document content reclassified as strictly untrusted input, provenance-tagged and architecturally isolated from assistant instruction-following context. Independent re-test required before pilot approval. 

**TIMELINE IMPACT**

Planned June 2027 pilot delayed pending remediation and re-test; CISO declined to approve partial fix under deadline pressure.

:::


:::tip[✅ Stage Outcomes]

- ✅ A critical, publicly-accessible prompt-injection vulnerability was found before pilot launch and treated with full seriousness rather than patched narrowly under timeline pressure 

- ✅ CISO explicitly prioritized security completeness over the planned pilot date, with that trade-off made transparently rather than absorbed quietly 

- ✅ An unexpected change in political leadership was met with a proactive, transparent briefing strategy rather than a defensive minimization of the programme’s real complications

:::


## Stage 4 — SURVIVING THE REVIEW, THEN FINDING A NEW PROBLEM

*The programme survives a change in political leadership and immediately finds a fairness gap of its own making*
`Weeks 26–34 | July–September 2027`


:::note[📅 Meeting]
**🕐 11:00**  📍 *Thursday 8 July 2027 | Commissioner’s office*

**New Sponsor Review**

*Attendees: Imani (EA), Commissioner Earl Tanaka (new sponsor), Ray Delacroix-Huang (Deputy Director)*
:::


> **Commissioner Earl Tanaka** — *Agency Commissioner*
>
> I’ve read the full briefing Ray gave me — the mainframe constraint, the data-use restriction, the union scope agreement, and the security finding you caught and fixed before pilot rather than after. Candidly, I expected to find a programme that had been rubber-stamped through governance and was hoping I’d have an easy justification to cancel it under my cost-review mandate. What I found instead reads like a programme that’s been genuinely tested at every stage. I’m approving continuation, with one addition: I want a formal disparate-impact assessment before pilot, specifically looking at whether navigation quality holds equally across languages other than English, since this state has a large non-English-speaking eligible population. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> That’s a fair addition and, honestly, a gap in our current test plan — we’ve tested extensively in English and only lightly in Spanish, and not at all in the other four languages our applicant population represents in meaningful numbers. I’ll get that assessment scoped before we finalize a pilot date. 


:::note[📅 Meeting]
**🕐 15:00**  📍 *Tuesday 24 August 2027 | Constituent Services Engineering lab*

**Disparate Impact Assessment Findings**

*Attendees: Imani (EA), Selin Yalcin (Lead AI Eng)*
:::


> **Selin Yalcin** — *Lead AI Engineer, Constituent Services*
>
> The disparate-impact assessment found a real problem, and I want to be upfront that it’s worse than I expected going in. Navigation guidance quality in English and Spanish is comparably strong — above ninety percent accuracy against our regulatory knowledge base in independent evaluation. In the other four languages, accuracy drops to between sixty and seventy percent, largely because the underlying model’s training data and our regulatory knowledge base translation quality are both weaker in those languages, and errors compound across that combination. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> That’s exactly the kind of gap Commissioner Tanaka asked us to look for, and finding it ourselves before pilot, even though it’s an uncomfortable finding, is a much better outcome than a community advocacy group finding it after launch. I don’t want to launch with that quality gap live for four language communities — that would create exactly the kind of unequal access this programme was meant to reduce, not add to. I want those four languages held out of the pilot entirely until we can either source better translated regulatory text or add a verified human-review step specifically for guidance in those languages. 


> **Selin Yalcin** — *Lead AI Engineer, Constituent Services*
>
> Holding them out feels right technically, but I want to flag the equity tension in that decision too — launching only in English and Spanish means the populations who’d benefit most from this navigation help, because they’re least equipped to navigate five overlapping bureaucracies in a non-native language without in-language institutional support, are the ones excluded from getting that help first. 


**Imani Bledsoe — Enterprise AI Architect** 

That tension is real and I don’t think there’s a clean answer to it — launching a lower-quality tool to those communities isn’t equity either, it risks giving people confidently wrong guidance about benefits they depend on. I want to bring this exact trade-off to Commissioner Tanaka directly rather than resolve it unilaterally as an engineering decision, because it’s fundamentally a values judgment about the agency’s priorities, not a technical one. 


:::tip[💭 Internal Thought]

This is one of the harder trade-offs I’ve had to bring to a sponsor rather than solve myself — both options carry a real cost to the same vulnerable population, just distributed differently. I want to resist the temptation to present this to Commissioner Tanaka as already-decided, dressed up as a recommendation, when it’s genuinely a values call about which kind of harm the agency is more willing to risk. My job here is to make the trade-off fully legible, not to make it disappear behind a confident engineering recommendation.

:::


:::info[📋 Artifact: GOV-2027-014]

**Disparate Impact Assessment & Scope Decision**

_State Department of Human Services_ 

**FINDING**

Navigation guidance accuracy: >90% in English/Spanish; 60–70% in four additional languages representing meaningful shares of the eligible applicant population, driven by weaker underlying model training data and regulatory-text translation quality in those languages. 

**DECISION**

Pilot launches in English and Spanish only. Four additional languages held out of scope pending either improved translated regulatory source text or a verified human-review layer for guidance in those languages — decision escalated to and made by Commissioner Tanaka given the equity trade-off involved. 

**COMMISSIONER RATIONALE (RECORDED)**

"Confidently wrong guidance in an under-resourced language is a worse outcome than no automated guidance at all for that community. I want the fix to be genuine language-quality investment, not a lowered bar for who gets accurate help." — Commissioner Earl Tanaka

:::


:::tip[✅ Stage Outcomes]

- ✅ The programme survived a full leadership-transition cost-and-necessity review specifically because its documented governance history, including failures and fixes, demonstrated rigor rather than being hidden 

- ✅ A significant disparate-impact gap was found through proactive assessment before pilot, avoiding a worse external discovery, and the resulting values trade-off was escalated to the sponsor rather than resolved unilaterally by engineering 

- ✅ A formal decision record captured the sponsor’s explicit reasoning for the harder of two imperfect options, preserving institutional accountability for a genuinely difficult call

:::


## Stage 5 — THE FIRST MONTHS, HONESTLY REPORTED

*A cautious pilot, real adoption friction, and one more caseworker concern the dashboards missed*
`Months 1–6 | October 2027–March 2028`


Pilot launches 4 October 2027 in English and Spanish across three regional benefits offices. Navigation accuracy holds at 91% against independent evaluation in the first quarter. Caseworker adoption is gradual — 35% of eligible interactions in month one, rising to 68% by month four — as caseworkers build trust in the tool’s explicit non-determination scope. 


:::note[📅 Meeting]
**🕐 10:00**  📍 *Wednesday 14 January 2028 | Regional Office 2*

**Caseworker Feedback Session**

*Attendees: Imani (EA), Denise Callahan (Union Steward), caseworker representatives*
:::


> **Denise Callahan** — *Caseworker Union Steward*
>
> I want to bring something forward that I don’t think shows up in your accuracy metrics. The tool is technically accurate on eligibility rules, but several of our caseworkers report it sometimes generates guidance that’s legally correct but practically unusable — for instance, correctly explaining a five-programme interaction rule in a way that’s dense and jargon-heavy enough that an applicant with a tenth-grade reading level, which describes a meaningful share of our applicant population, can’t actually act on it without the caseworker re-explaining it anyway. That’s not an accuracy problem your evaluation would catch — it’s a usability problem. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> That’s a genuinely important gap and I appreciate you surfacing it — we’ve been evaluating correctness against the regulatory text, not comprehensibility for the actual population using it, and those are different bars. I want to add a plain-language readability requirement to our evaluation criteria directly, not as a nice-to-have — something like a target reading-level score, tested against real applicant feedback, not just internal review. 


> **Denise Callahan** — *Caseworker Union Steward*
>
> I’d also want our caseworkers involved in defining what ‘usable’ means here — they’re the ones who see the gap between a technically correct answer and one an applicant can actually use, every day. 


:::info[📋 Artifact: OPS-2028-Q1]

**Agentic Benefits Navigation Assistant — Quarterly Operating Review**

_Q1 2028_ 

**NAVIGATION ACCURACY**

91% against independent evaluation, English/Spanish, holding from pilot launch through Q1. 

**ADOPTION**

Caseworker use in eligible interactions: 35% month one, 68% month four, attributed to gradual trust-building around the tool’s explicit non-determination scope. 

**USABILITY GAP IDENTIFIED**

Plain-language readability requirement added to evaluation criteria following caseworker field feedback; correctness-only evaluation found insufficient for actual applicant comprehension. 

**SECURITY** 

Zero prompt-injection incidents since Design-stage remediation; quarterly independent re-test scheduled per CISO standing requirement.

:::


:::tip[✅ Stage Outcomes]

- ✅ A usability gap invisible to correctness-based evaluation was surfaced through direct caseworker feedback, expanding the definition of quality the system is held to 

- ✅ Caseworker adoption grew gradually as trust in the explicit non-determination scope built over time, validating the union-negotiated boundary as workable in practice, not just on paper 

- ✅ Security remediation from Design held through the first full quarter with zero incidents, validated by continued independent testing rather than assumed permanent

:::


## Stage 6 — THE FOUR LANGUAGES QUESTION, REVISITED WITH REAL DATA

*A year later, the hard equity trade-off comes back — this time with evidence instead of just principle*
`Month 11 | September 2028`


:::note[📅 Meeting]
**🕐 13:00**  📍 *Thursday 7 September 2028 | State Capitol, Commissioner’s Conference Room*

**Annual Programme Review**

*Attendees: Imani (EA), Commissioner Earl Tanaka, Wanda Okoye (General Counsel), Denise Callahan (Union Steward)*
:::


> **Commissioner Earl Tanaka** — *Agency Commissioner*
>
> A year of English/Spanish operation, ninety-one percent sustained accuracy, caseworker adoption above two-thirds, and a usability fix that came directly from caseworker input rather than from us. I want to revisit the four excluded languages — has the underlying model or translation-quality landscape improved enough to reconsider? 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> It has, meaningfully, in two of the four languages, and I want to walk through why I still think a cautious, evidence-based expansion is the right move rather than a full reversal of last year’s exclusion. We commissioned improved regulatory-text translation for all four languages this year specifically anticipating this review, and independent evaluation now shows two of them — Vietnamese and Haitian Creole — at eighty-eight and eighty-five percent accuracy respectively, close enough to our English/Spanish bar that I’d support a supervised pilot expansion there. The other two remain below seventy percent even with improved translated source text, and I don’t think that gap has closed enough to responsibly include them yet. 


> **Denise Callahan** — *Union Steward*
>
> I’d support the two-language expansion specifically because it’s evidence-based rather than a blanket reversal — that matches the standard Commissioner Tanaka set last year, that confidently wrong guidance is worse than no automated guidance, applied consistently rather than relaxed under a year of good performance elsewhere. 


> **Wanda Okoye** — *General Counsel*
>
> I’ll note for the record that the improved-translation investment this year, made specifically to responsibly close this gap rather than to justify an earlier expansion, is exactly the kind of evidence I’d want to see before supporting any future scope change in either direction. 


I **ARTIFACT: RDREC-2028-007** 

### **Annual Programme Governance Decision** 

_September 2028_ 

**DECISION**

Agentic Benefits Navigation Assistant confirmed as steady-state production, English/Spanish. Supervised pilot expansion approved for Vietnamese and Haitian Creole based on independently evaluated accuracy improvement (85–88%) following dedicated translation-quality investment. Remaining two languages held out of scope pending further improvement. 

**RATIONALE** 

Expansion decision applies the same standard set at original scope decision — accuracy parity with English/Spanish bar, evidenced independently — rather than relaxing the standard based on unrelated programme success. 

**APPROVED BY**

Commissioner Earl Tanaka, Wanda Okoye (General Counsel), Denise Callahan (Union Steward) 


:::tip[✅ Stage Outcomes]

- ✅ A year-old equity exclusion was revisited with new evidence rather than either being permanently frozen or relaxed under general programme-success pressure 

- ✅ Dedicated translation-quality investment made specifically to responsibly close the original gap, rather than to retroactively justify expansion, was recognized as the right kind of evidence for a scope change 

- ✅ The original governing standard — confidently wrong guidance is worse than none — was applied consistently a year later rather than eroded by accumulated trust in the system elsewhere

:::


## Stage 7 — A PROGRAMME BUILT MOSTLY OUT OF OTHER PEOPLE’S ‘NO’

*What a year of constraints, rejections, and one real vulnerability actually taught the team*
`Month 11 | September 2028`


:::note[📅 Meeting]
**🕐 10:00**  📍 *Friday 22 September 2028 | Constituent Services Engineering lab*

**Programme Retrospective**

*Attendees: Imani (EA), Selin Yalcin (Lead AI Eng), Frank Delgado (Legacy Systems), Denise Callahan (Union Steward)*
:::


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> Looking back, almost every major design decision in this programme started as someone telling us no — Frank’s mainframe constraint, Wanda’s data-use restriction, Denise’s union scope demand, Marcus’s security-first delay, Commissioner Tanaka’s language-equity requirement. I want to name directly that the system we ended up with is better for having absorbed every one of those constraints honestly rather than fighting or minimizing any of them, and I think that’s a real lesson, not just a nice sentiment — nearly every ‘no’ in this programme turned into a design constraint that made the system safer or fairer than my original January vision. 


> **Frank Delgado** — *Legacy Systems Director*
>
> I’ll say from my side — I expected this to be a fight, based on how similar conversations have gone with other project teams in the past. It wasn’t, because you designed around the constraint instead of trying to route around it, and I think that’s worth other teams here hearing directly, not just this one team learning it. 


> **Selin Yalcin** — *Lead AI Engineer, Constituent Services*
>
> Technical debt I want on the record: our document-upload isolation fix addresses the specific injection vector penetration testing found, but I don’t have full confidence we’ve found every possible injection channel through user-uploaded content — that space evolves, and I want continued adversarial testing built into our operating cadence permanently, not treated as a one-time Design-stage gate we’ve now passed. 


> **Denise Callahan** — *Union Steward*
>
> From the union side, what I’d want other agency programmes to take from this: engaging us early and giving us an actual architecturally-enforced commitment, not just a verbal one, is what made this pilot workable for our members. I’ve recommended two other departments talk to Imani’s team before starting their own AI programmes, specifically because of how this one handled the scope commitment. 


> **Imani Bledsoe** — *Enterprise AI Architect*
>
> If I were restarting this programme, the one thing I’d do differently from day one is what Denise’s caseworker-usability feedback taught us eight months in — I’d define quality against real applicant comprehension from the start, not just regulatory correctness, instead of discovering that gap after launch. Correctness and usefulness turned out to be different bars, and I only learned that because someone on the front line told me directly. 


Recommendations carried forward to future constituent-facing agentic programmes at the agency: (1) treat a legacy-system owner’s hard technical constraint as a design input to absorb early, not an obstacle to negotiate away; (2) build permanent, architecturally-enforced scope commitments when engaging skeptical stakeholders (union, advocacy groups), not verbal assurances alone; (3) evaluate quality against real end-user comprehension, not just technical or regulatory correctness, from the start; (4) treat adversarial security testing as a continuing operating requirement, not a one-time 

pre-launch gate; (5) when equity trade-offs have no clean answer, escalate the trade-off itself to the accountable sponsor rather than resolving it unilaterally as an engineering decision. 


:::tip[✅ Stage Outcomes]

- ✅ Retrospective reframed a year of external rejections and constraints as the primary source of the system’s eventual quality, rather than as obstacles merely survived 

- ✅ Ongoing, unresolved risk (incomplete confidence in injection-channel coverage) named explicitly rather than treated as closed by the Design-stage fix 

- ✅ The union steward’s account of the programme independently influenced other departments’ approach to future AI programmes, an organizational outcome beyond the system itself 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2027-004)|Incubation|Deputy Director, Legal, Legacy<br>Systems|
|Architecture Decision Record (ADR-2027-011)|Pitch / Approve|ARB, Legal, CISO|
|Critical Security Finding & Remediation Record<br>(SEC-2027-002)|Design|CISO, AI Engineering|
|Disparate Impact Assessment & Scope Decision<br>(GOV-2027-014)|Build|Commissioner, AI Engineering|
|Quarterly Operating Review (OPS-2028-Q1)|Operate|Union, Caseworker Ops|
|Annual Programme Governance Decision<br>(RDREC-2028-007)|Review|Commissioner, Legal, Union|

_“Nearly every hard constraint on this programme started as someone with good reason to distrust us saying no. The job was never to get to yes anyway. It was to build something that deserved a yes, from people who had no obligation to give us the benefit of the doubt.”_

:::
