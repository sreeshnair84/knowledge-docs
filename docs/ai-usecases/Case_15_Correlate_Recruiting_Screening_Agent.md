---
title: "The Architecture That Got Rejected Before It Was Even a Proposal"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_15_Correlate_Recruiting_Screening_Agent.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# **The Architecture That Got Rejected Before It Was Even a Proposal** 

Building an Agentic Recruiting and Candidate Screening Copilot Through a Works Council Standoff, a Hidden Gender Proxy, and an Acquisition 

A transcript-style account following Ana Beatriz Souza, Enterprise AI Architect at Correlate Global, through an autonomous-rejection vision killed before it was ever proposed, a German works council co-determination negotiation, a gender signal hiding in resume hobbies, a mid-programme acquisition that tests whether the team's own bias-review standards survive contact with a CEO's timeline, and a year-later validation that deferring a hard question properly was worth the wait. 

## Cast of Characters

| Character | Role |
|-----------|------|
| **Ana Beatriz Souza** ⭐ | Enterprise AI Architect, Talent Systems (EA) — our protagonist |
| **Graham Pettit** | Chief People Officer (CPO) — sponsor |
| **Dr. Miriam Katz-Levin** | Head of People Analytics & Risk |
| **Bastian Hoefler** | Works Council Chair, Germany |
| **Ravi Chandrasekaran** | Lead AI Engineer, Talent Systems |
| **Colette Ferreira** | General Counsel |
| **Priya Sundaram** | Senior Technical Recruiter (pilot user) |
| **Owen Whitfield** | CEO |

:::info[Case Journey]
**`INCUBATION`**  →  **`PITCH / APPROVE`**  →  **`DESIGN`**  →  **`BUILD`**  →  **`OPERATE`**  →  **`REVIEW`**  →  **`RETROSPECTIVE`**
:::

*Correlate Global | Agentic Recruiting & Candidate Screening Copilot | 2027*

---

## Stage 1 — THE ARCHITECTURE THAT GOT REJECTED BEFORE IT WAS EVEN A PROPOSAL

*The obvious version of this system dies in the very first conversation with Risk*
`Weeks 1–5 | February 2027`

:::note[📅 Meeting]
**🕐 09:00**  📍 *Monday 1 February 2027 | Graham Pettit’s office*

**Informal Strategy Discussion**

*Attendees: Graham Pettit (CPO), Ana Beatriz Souza (EA)*
:::

> **Graham Pettit** — *Chief People Officer*
>
> Ana, our recruiters are drowning — average time to screen a candidate slate for a single technical role is running twelve hours across roughly two hundred applications, most of which are not remotely qualified. I want an agentic system that can screen incoming applications against role requirements and automatically reject candidates who clearly don’t meet the bar, so recruiters only see a shortlist. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> I want to stop on ‘automatically reject’ before this goes anywhere else, because I think that’s going to be a hard rejection from both Legal and our own People Analytics & Risk team, and I’d rather find that out from me now than from them after you’ve committed to the idea publicly. Autonomous candidate rejection in hiring is one of the highest-scrutiny applications of AI that exists right now, across employment law in basically every jurisdiction we operate in. Let me talk to Miriam and Colette before we scope anything as ‘automatic.’ 

:::note[📅 Meeting]
**🕐 13:00**  📍 *Wednesday 3 February 2027 | People Analytics & Risk office*

**Discovery Interview**

*Attendees: Ana Beatriz Souza (EA), Dr. Miriam Katz-Levin (People Analytics & Risk)*
:::

> **Dr. Miriam Katz-Levin** — *Head of People Analytics & Risk*
>
> I’ll save you the trouble of pitching autonomous rejection formally — I would reject that proposal outright, and I want to explain why in a way that sticks: every historical hiring dataset carries the fingerprint of every biased human decision that ever went into it, and a model trained or even just prompted with reference to historical outcomes will reproduce those patterns with a confidence and scale no individual biased recruiter ever had. This isn’t a hypothetical risk category — it’s a well-documented failure pattern in this exact application, and I’ve seen the regulatory and litigation consequences at other companies firsthand. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> I don’t want to argue that risk away — I think you’re right, and I’d rather design around it from day one. What would you support? Screening and structured comparison for recruiter review, with the actual accept/reject decision remaining entirely human? 

> **Dr. Miriam Katz-Levin** — *Head of People Analytics & Risk*
>
> That I could support, with real scrutiny on how ‘structured comparison’ is built — even a system that only surfaces information rather than deciding can still bias what a recruiter sees or how it’s framed, in ways that quietly shape the human decision without ever making it directly. I want disparate-impact testing built into this from day one, not bolted on before launch as a compliance checkbox. 

:::note[📅 Meeting]
**🕐 11:00**  📍 *Friday 5 February 2027 | Legal Department*

**Discovery Interview**

*Attendees: Ana Beatriz Souza (EA), Colette Ferreira (General Counsel)*
:::

> **Colette Ferreira** — *General Counsel*
>
> I want to flag a jurisdiction-specific issue early, before you’ve built anything: we have a works council in Germany, and under German co-determination law, any system that materially changes how employees— in this case, recruiters — do their work, particularly anything algorithmic that touches employment decisions, requires works council co-determination before rollout, not just notification after the fact. If this launches globally without that engagement, Germany operations will be legally blocked from using it regardless of how well it performs elsewhere. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> I’d rather build the works council engagement into the programme plan from the start than treat it as a late-stage regional rollout blocker. Can you connect me with Bastian’s team early, even before we have a working prototype to show them? 

:::tip[💭 Internal Thought]

Two separate people, from two separate functions, independently steered me away from the version of this system Graham actually asked for, within the same week — and I think that convergence is itself the signal to take most seriously, more than either objection individually. I want to bring Graham a genuinely different proposal, not a softened version of his original ask, and I want to be direct with him that ‘automatic rejection’ isn’t a feature we’re deferring to a later phase, it’s one we’re not going to build, on the same footing as decisions in other case studies I know of where denial or rejection authority stayed permanently with a human.

:::

:::note[📧 Email]

**From:** Ana Beatriz Souza (Enterprise AI Architect) **To:** Graham Pettit (CPO) 

**Subject:** Reframing the Recruiting Copilot Proposal — Autonomous Rejection Is Not Going to Be in Scope 

Graham, following up on our Monday conversation — I’ve now talked to both Miriam and Colette, and I want to tell you directly that autonomous candidate rejection isn’t something I’m going to bring forward as a proposal, not because of engineering difficulty but because of well-documented bias-reproduction risk in this exact application and a genuine co-determination legal requirement in Germany that a fully-autonomous design would run straight into. What I want to propose instead: a screening and structured-comparison copilot that surfaces qualified candidates faster for recruiter review, with every accept/reject decision remaining fully human, and disparate-impact testing built in from day one rather than added before launch. I think this still solves the twelve-hour screening problem — the bottleneck is finding qualified candidates in a large pool, not making the final call, which recruiters are fast at once they have a good shortlist. Ana

:::

:::tip[✅ Stage Outcomes]

- ✅ Autonomous rejection was ruled out at the earliest possible stage, before formal proposal, based on independent and convergent objections from both Risk and Legal 

- ✅ German works council co-determination requirement identified early enough to be built into the programme plan rather than discovered as a late-stage regional blocker 

- ✅ Sponsor was given a direct, honest reframing of the original ask rather than a diluted version presented as equivalent to what was originally requested

:::

## Stage 2 — THE WORKS COUNCIL DOES NOT TRUST A SLIDE DECK

*Formal co-determination engagement becomes its own extended negotiation*
`Weeks 6–14 | March–April 2027`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Tuesday 16 March 2027 | Correlate Global Frankfurt Office*

**Works Council Engagement Session**

*Attendees: Ana Beatriz Souza (EA), Bastian Hoefler (Works Council Chair), Colette Ferreira (Legal)*
:::

> **Bastian Hoefler** — *Works Council Chair, Germany*
>
> I want to be direct about our starting position: our members have seen ‘recruiter assistance tool’ framings before, at other companies, that quietly became performance-monitoring or headcount-justification tools within a year. I’m not going to co-determine approval based on a slide deck describing good intentions. I need to understand, mechanically, what data this system uses, whether recruiter usage patterns are logged in any way that could be used to evaluate individual recruiters, and what happens to this system’s design if it’s ever proposed for expansion into something closer to automated decision-making. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> Those are fair questions and I want to answer them as concretely as I can, and commit to what I can’t answer today being resolved before rollout rather than after. The system uses job-requirement text and candidate application materials — no monitoring of recruiter behavior for performance evaluation, and I’m willing to have that explicitly excluded in writing, enforced architecturally, not just as a policy statement. On expansion toward automated decision-making — I’ve already had that conversation with our Risk and Legal teams, and it’s been ruled out, not deferred. I’d support that exclusion being written into whatever co-determination agreement we reach, with any future proposal to change it requiring a fresh works council review, not an internal product decision. 

> **Bastian Hoefler** — *Works Council Chair, Germany*
>
> I want that in a formal document I can bring to my full council, not a verbal commitment in this room. I also want an independent bias audit conducted before German rollout specifically, not just a global audit — our workforce composition and legal protections around discrimination differ enough from other markets that a global-average result could mask a Germany-specific problem. 

:::note[📅 Meeting]
**🕐 10:00**  📍 *Thursday 8 April 2027 | Correlate Global HQ, ARB Chamber*

**Architecture Review Board Session**

*Attendees: Ana (EA), Graham Pettit (CPO), Dr. Katz-Levin (Risk), Colette Ferreira (Legal)*
:::

> **Dr. Miriam Katz-Levin** — *Head of People Analytics & Risk*
>
> I want the ARB to formally record that disparate-impact testing is a pre-launch gate, globally, and that the German-specific audit Bastian requested is a separate, additional gate for that market specifically — not satisfied by the global result alone. I also want ongoing, not just pre-launch, monitoring, because bias patterns can emerge or shift after launch as the candidate pool or job requirements change. 

> **Graham Pettit** — *Chief People Officer*
>
> I’ll say plainly this timeline is longer than I hoped for in February, with the works council engagement and now two separate bias-audit gates. I still think it’s the right call — I’d rather launch this properly than launch fast and have Germany operations blocked, or worse, discover a bias problem after the fact. 

:::info[📋 Artifact: ADR-2027-013]

**Architecture Decision Record — Agentic Recruiting & Candidate Screening Copilot**

##### _Approved v1.0 | Correlate Global_ 

**DECISION**

Approved to Design/Build. Screening and structured-comparison only; all accept/reject decisions remain fully human, permanently excluded from automation. Recruiter behavioral monitoring explicitly and architecturally excluded from system scope. 

**CONDITIONS**

Global disparate-impact audit required pre-launch. Separate, additional Germany-specific bias audit required before German rollout, not satisfied by global result. Ongoing (not only pre-launch) bias monitoring required as standing operational requirement. Any future proposal to expand toward automated decision-making requires fresh works council co-determination review, formally documented. 

**APPROVED BY**

ARB Panel, Graham Pettit (CPO), Dr. Miriam Katz-Levin (Risk), Colette Ferreira (Legal), Bastian Hoefler (Works Council, pending formal council ratification)

:::

:::tip[✅ Stage Outcomes]

- ✅ Works council engagement produced a formally documented, architecturally-enforced set of commitments rather than a verbal assurance, addressing legitimate historical distrust directly 

- ✅ A jurisdiction-specific bias audit requirement was added as an independent gate rather than assumed satisfied by a global result 

- ✅ Sponsor explicitly acknowledged the timeline cost of rigorous engagement while affirming it was the right trade-off, rather than pressuring for a faster path

:::

## Stage 3 — THE HOBBY THAT WAS SECRETLY A GENDER SIGNAL

*A feature that looked completely unrelated to any protected characteristic turns out not to be*
`Weeks 16–24 | May–July 2027`

:::note[📅 Meeting]
**🕐 11:00**  📍 *Wednesday 12 May 2027 | Talent Systems Engineering lab*

**Design Working Session**

*Attendees: Ana (EA), Ravi Chandrasekaran (Lead AI Eng), Dr. Katz-Levin (Risk)*
:::

> **Ravi Chandrasekaran** — *Lead AI Engineer, Talent Systems*
>
> Feature-level bias testing on our candidate-comparison scoring found something worth flagging before we go further. We excluded the obvious protected-characteristic proxies — name-based ethnicity inference, graduation-year-implied age, address-implied geography. But a feature we treated as clearly neutral — mentions of specific extracurricular activities and hobbies on resumes — showed a statistically significant correlation with gender in our historical validation data, strong enough that the model was implicitly using hobby mentions as a gender signal even though gender was never a direct input. 

> **Dr. Miriam Katz-Levin** — *Head of People Analytics & Risk*
>
> That doesn’t surprise me, unfortunately — certain traditionally male-coded or female-coded extracurricular activities are genuinely gendered in aggregate participation patterns in most of our source markets, for reasons that have nothing to do with job qualification. A model picking up on ‘mentions competitive rowing’ versus ‘mentions competitive figure skating’ as any kind of quality signal is really just learning a demographic proxy dressed up as a personality or fit signal. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> This is exactly the proxy discrimination pattern I’ve seen surface in other domains — a feature that passes a naive relevance check but turns out to encode a protected characteristic once actually tested. I want hobby and extracurricular mentions excluded from the comparison scoring entirely, not down-weighted — I don’t trust a partial fix to a signal we’ve now confirmed is doing this. And I want this made a standing requirement: every new feature considered for this system, indefinitely, gets tested for protected-characteristic correlation before inclusion, the same discipline I’d apply to a lending or underwriting model, not a one-time audit. 

:::note[📅 Meeting]
**🕐 14:00**  📍 *Tuesday 15 June 2027 | Talent Systems Engineering lab*

**German Bias Audit Findings Review**

*Attendees: Ana (EA), Ravi (Lead AI Eng), Dr. Katz-Levin (Risk)*
:::

> **Dr. Miriam Katz-Levin** — *Head of People Analytics & Risk*
>
> The Germany-specific audit Bastian requested found something the global audit didn’t catch, which validates his insistence on a separate gate. Global disparate-impact metrics were within acceptable variance across most categories, but the Germany-specific data showed a meaningful gap in how the system scored candidates with non-linear career paths — career breaks, non-traditional 

education-to-employment sequences — which correlates with parental leave patterns under German labor law and other markets’ more flexible norms differently than in markets with less career-path variance in our historical data. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> That’s a good example of exactly why Bastian was right to insist on a market-specific audit rather than trusting the global average — a pattern that’s statistically diluted globally can be a real, concentrated problem in a specific market with different underlying norms. I want the career-path-continuity weighting redesigned to be far more permissive of non-linear paths generally, not just patched for the German case 

specifically, since the same underlying issue likely affects other markets with strong parental-leave norms too, just less visibly in aggregate data. 

:::tip[💭 Internal Thought]

Two proxy-discrimination findings in one design phase — the hobby signal and the career-path-continuity gap — and both are humbling in slightly different ways. The hobby signal was found through the standing feature-testing discipline I insisted on, which felt like process overhead when I set it up and turned out to catch something real. The career-path finding specifically vindicates Bastian’s demand for a market-specific audit that I initially treated as a reasonable but possibly redundant additional gate. I want to remember both lessons: build the standing process even when it feels like overhead, and don’t assume a global aggregate tells you what a specific population experiences.

:::

:::info[📋 Artifact: GOV-2027-011]

**Feature-Level Proxy Discrimination Review & Germany-Specific Audit Findings**

##### _Correlate Global_ 

**FINDING 1 — GLOBAL**

Extracurricular/hobby-mention features found to carry significant gender correlation despite passing naive relevance review; excluded entirely from candidate-comparison scoring. 

**FINDING 2 — GERMANY-SPECIFIC**

Career-path-continuity weighting showed disparate impact concentrated in German market data, correlating with parental-leave and career-break patterns; not visible in global aggregate metrics. Weighting redesigned globally to be more permissive of non-linear career paths. 

**STANDING REQUIREMENT ADOPTED**

Every new candidate-comparison feature requires protected-characteristic correlation testing before inclusion, indefinitely. Market-specific bias audits required for any market with materially different labor-law or demographic norms from the global baseline, not satisfied by global-aggregate results.

:::

:::tip[✅ Stage Outcomes]

- ✅ A non-obvious proxy-discrimination feature (hobby/extracurricular mentions) was caught through standing feature-testing discipline rather than a one-time pre-launch audit 

- ✅ The Germany-specific audit gate, initially treated as a possibly-redundant additional requirement, caught a real disparate-impact pattern invisible in global aggregate data, directly validating the works council’s original demand 

- ✅ Standing requirements adopted for both ongoing feature review and market-specific auditing, generalizing both findings beyond the specific instances that revealed them

:::

## Stage 4 — THE ACQUISITION THAT BROUGHT A SECOND, INCOMPATIBLE SYSTEM

*An unexpected acquisition forces an integration decision under real time pressure*
`Weeks 26–34 | August–October 2027`

:::note[📅 Meeting]
**🕐 08:30**  📍 *Monday 16 August 2027 | Graham Pettit’s office*

**Unexpected Development**

*Attendees: Ana Beatriz Souza (EA), Graham Pettit (CPO)*
:::

> **Graham Pettit** — *Chief People Officer*
>
> Ana, the board approved acquiring Bellcrest Analytics, closing in eight weeks. Bellcrest runs its own applicant tracking system with a completely different candidate data model, and their recruiting team — about 40 people — will be using our systems going forward. Owen wants a unified recruiting experience across both organizations within the first quarter post-close, and I know that’s going to touch this programme. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> I want to be careful here in a way I wasn’t forced to be careful with the original programme, because the stakes are different now — Bellcrest’s historical candidate data is exactly the kind of data Miriam warned me about in February, data that reflects another organization’s hiring patterns and potential biases we haven’t tested at all. I don’t want to fold that data into our system’s scoring or comparison logic without the same feature-level and market-specific bias review we did for our own data — that review took months the first time, and I don’t think an acquisition timeline should compress a safety process that mattered enough to insist on originally. 

:::note[📅 Meeting]
**🕐 14:00**  📍 *Wednesday 25 August 2027 | Talent Systems Engineering lab*

**Design Working Session**

*Attendees: Ana (EA), Ravi (Lead AI Eng), Dr. Katz-Levin (Risk)*
:::

> **Dr. Miriam Katz-Levin** — *Head of People Analytics & Risk*
>
> I want to be the one to say the unpopular thing given the CEO-level timeline pressure: I will not sign off on folding Bellcrest’s historical hiring data into this system’s scoring logic within eight weeks. A proper bias review of a new, unvetted dataset from a different organization’s hiring history is not a process we should compress just because there’s an integration deadline attached to it. 

> **Ravi Chandrasekaran** — *Lead AI Engineer, Talent Systems*
>
> I think there’s a version that satisfies the ‘unified experience’ goal without that specific risk, though. Bellcrest recruiters can use our existing system’s screening and comparison logic on new incoming candidates going forward — that’s a data-model integration problem, mapping their job-requirement and application-material schema to ours, which is real engineering work but doesn’t touch the bias-review question at all. Their historical candidate data can stay out of scope for this system entirely, at least for this quarter, without blocking recruiters from using the tool on new applications starting at close. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> That’s the right split, and I want to bring it to Graham and Owen as a genuine proposal, not a fallback — unified experience for Bellcrest recruiters on new candidates, immediately, with historical-data integration explicitly deferred pending its own full bias review on its own timeline, not compressed to match an unrelated integration deadline. 

_10:00 | Friday 3 September 2027 | Owen Whitfield’s office_ 

**Executive Alignment — Attendees: Ana Beatriz Souza (EA), Graham Pettit (CPO), Owen Whitfield (CEO)**

> **Owen Whitfield** — *CEO*
>
> I asked for a unified experience within the first quarter, and what I’m hearing is a partial version of that with a piece deliberately deferred. Convince me that’s the right call and not just caution for its own sake. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> I’d rather give you the version that gets Bellcrest recruiters working in a unified tool on day one of close, which is most of what ‘unified experience’ actually means operationally, than the version that also includes their historical data and skips the bias review we required for our own data eight months ago. If a review we insisted on for our own hiring data isn’t applied to a newly-acquired dataset just because there’s a deadline attached, that’s not consistency, and it’s exactly the kind of gap that shows up badly in a discrimination claim or regulatory inquiry later. 

> **Owen Whitfield** — *CEO*
>
> That’s a convincing framing, put that way. Approved — unified tool access at close, historical data integration on its own review timeline. 

I **ARTIFACT: GOV-2027-016** 

### **Acquisition Integration Scope Decision** 

_Correlate Global_ 

**DECISION**

Bellcrest Analytics recruiters granted access to existing screening/comparison system for new incoming candidates effective at acquisition close. Bellcrest historical candidate data explicitly excluded from system scope pending full, independent feature-level and market-specific bias review on its own timeline, not compressed to acquisition integration deadline. 

**RATIONALE**

Consistency with standing bias-review requirements established for the system’s original dataset; acquisition timeline pressure explicitly rejected as justification for reduced review rigor on a new, unvetted dataset. 

**APPROVED BY**

Owen Whitfield (CEO), Graham Pettit (CPO), Dr. Miriam Katz-Levin (Risk) 

:::tip[✅ Stage Outcomes]

- ✅ An unexpected acquisition’s integration pressure was met with a scope split that preserved bias-review rigor rather than compressing it to meet an unrelated deadline 

- ✅ CEO-level timeline pressure was engaged directly and successfully reframed around consistency with existing standards, rather than either capitulating or refusing without a workable alternative 

- ✅ A genuine partial win (unified tool access without full data integration) was proposed proactively by engineering rather than presented as an unwelcome compromise

:::

## Stage 5 — THE RECRUITER WHO STOPPED USING IT

*Adoption resistance rooted in a legitimate professional concern, not mere unfamiliarity*
`Months 1–6 | November 2027–April 2028`

Production launch occurs 8 November 2027 following successful completion of both global and Germany-specific bias audits. Average screening time for a 200-candidate slate falls from 12 hours to approximately 2.5 hours across pilot regions. Germany rollout follows separately on 15 December 2027 after formal works council ratification. 

:::note[📅 Meeting]
**🕐 10:00**  📍 *Thursday 27 January 2028 | Talent Acquisition floor*

**Adoption Feedback Session**

*Attendees: Ana Beatriz Souza (EA), Priya Sundaram (Senior Technical Recruiter)*
:::

> **Priya Sundaram** — *Senior Technical Recruiter*
>
> I want to be honest that I’ve mostly stopped using the comparison tool for senior technical roles specifically, even though I use it regularly for junior and mid-level roles. For senior candidates, the qualifying signal is often something the tool doesn’t surface well — a specific, hard-to-formalize judgment about whether someone’s unconventional career path reflects genuine expertise or just job-hopping, which I make from pattern recognition built over twelve years of recruiting, not from anything reducible to the structured comparison fields your system shows me. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> That’s a genuinely useful distinction and I don’t want to respond to it by trying to formalize your twelve years of judgment into a feature, because I think that’s exactly the kind of thing that risks becoming a bias proxy if we try to encode it crudely — similar to the career-path-continuity issue we found in the Germany audit. I think the more honest fix is making the tool’s scope for senior technical roles more clearly ‘early filtering only,’ explicitly signaling lower confidence for exactly the kind of nuanced-judgment cases you’re describing, rather than presenting a comparison with the same apparent confidence across all seniority levels. 

> **Priya Sundaram** — *Senior Technical Recruiter*
>
> I’d find that more useful than either extreme — more useful than the current one-size-fits-all confidence framing, and more useful than trying to build a black-box ‘senior judgment’ feature I wouldn’t trust anyway. 

:::info[📋 Artifact: OPS-2028-Q1]

**Agentic Recruiting & Screening Copilot — Quarterly Operating Review**

_Q1 2028_ 

**SCREENING PERFORMANCE**

Average 200-candidate slate screening time: 12 hrs to ~2.5 hrs across pilot regions. Adoption: 74% of eligible screening tasks by end of Q1, with lower adoption specifically for senior technical roles. 

**BIAS MONITORING**

Ongoing disparate-impact monitoring within acceptable variance globally and in Germany specifically for third consecutive month post-launch. Zero new proxy-discrimination findings this quarter under standing feature-review requirement. 

**ADOPTION GAP IDENTIFIED**

Senior technical role adoption gap traced to genuine scope mismatch (tool confidence framing did not distinguish structured-signal-friendly roles from nuanced-judgment-dependent roles), not resistance to the tool generally. Confidence-framing redesign scoped for Q2. 

**GOVERNANCE**

Bellcrest historical data integration review remains pending, on its own timeline, per acquisition scope decision.

:::

:::tip[✅ Stage Outcomes]

- ✅ A recruiter’s reduced adoption for a specific role category was investigated as a genuine scope-mismatch signal rather than dismissed as change resistance 

- ✅ The proposed fix explicitly avoided encoding the recruiter’s tacit judgment into a new feature, applying the same proxy-discrimination caution learned from the hobby-feature and career-path findings 

- ✅ Bias monitoring held through the first full quarter of live operation, validating the pre-launch audit gates rather than treating them as one-time checks

:::

## Stage 6 — THE BELLCREST DATA QUESTION, ANSWERED WITH A FULL REVIEW INSTEAD OF A SHORTCUT

*A year later, the deferred question returns — and gets the same rigor as everything before it*
`Month 11 | September 2028`

:::note[📅 Meeting]
**🕐 14:00**  📍 *Tuesday 12 September 2028 | Correlate Global HQ, Executive Board Room*

**Annual Programme Review**

*Attendees: Ana (EA), Graham Pettit (CPO), Dr. Katz-Levin (Risk), Bastian Hoefler (Works Council), Colette Ferreira (Legal)*
:::

> **Graham Pettit** — *Chief People Officer*
>
> Screening time down roughly eighty percent, adoption above seventy percent and rising, zero disparate-impact findings since the fixes in Design, and the Bellcrest integration handled without incident. I want to close the loop on the deferred question: is Bellcrest’s historical data ready for review now, a year later? 

> **Dr. Miriam Katz-Levin** — *Head of People Analytics & Risk*
>
> We completed the full feature-level and market-specific review over the past two months, applying the exact same standard as our original dataset and as the Germany-specific audit. Findings: broadly comparable to our own historical data on most dimensions, but with one notable gap — Bellcrest’s prior hiring process relied heavily on a ‘culture fit’ interview score that shows meaningful correlation with several protected characteristics in their historical outcomes. I want that specific signal excluded permanently if we ever do integrate their historical data, the same way we excluded the hobby-mention feature. 

> **Bastian Hoefler** — *Works Council Chair, Germany*
>
> I want to note for the record that Correlate Global held to the commitment made in April 2027 — a full year of the deferred integration being handled on its own rigorous timeline, not quietly folded in under acquisition-integration pressure at any point. That consistency is exactly what earns continued works council trust for future programmes, more than any single feature of this system. 

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> I want to propose Bellcrest historical data integration proceed now, with the culture-fit score permanently excluded per Miriam’s finding, and with a fresh disparate-impact audit specifically covering the integrated dataset before it goes live — not assumed safe because the broader review came back largely clean. 

:::info[📋 Artifact: RDREC-2028-009]

**Annual Programme Governance Decision**

_September 2028_ 

**DECISION**

Agentic Recruiting & Screening Copilot confirmed as steady-state production, Correlate Global and Bellcrest recruiters. Bellcrest historical data integration approved to proceed, with the identified "culture fit" interview score feature permanently excluded, and a dedicated pre-integration disparate-impact audit required before the integrated dataset goes live. 

**RATIONALE**

Full-rigor review of Bellcrest historical data, deferred at acquisition per the August 2027 scope decision, completed on its own timeline rather than compressed to an integration deadline; found one significant proxy-discrimination signal requiring permanent exclusion, validating the deferral decision. 

**APPROVED BY**

Graham Pettit (CPO), Dr. Miriam Katz-Levin (Risk), Bastian Hoefler (Works Council), Colette Ferreira (Legal)

:::

:::tip[✅ Stage Outcomes]

- ✅ The deferred Bellcrest data integration was completed a year later with full rigor, directly vindicating the original decision to decouple it from acquisition-timeline pressure 

- ✅ A genuine, significant proxy-discrimination signal was found in the newly-reviewed dataset, demonstrating the deferred review was substantively necessary, not merely cautious process 

- ✅ Works council explicitly cited sustained follow-through on a year-old commitment as the basis for continued trust, an organizational outcome beyond the technical result

:::

## Stage 7 — WHAT A YEAR OF SAYING NO TO SHORTCUTS ACTUALLY BOUGHT

*A candid retrospective on caution that was tested repeatedly and held*
`Month 11 | September 2028`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Friday 21 September 2028 | Talent Systems Engineering lab*

**Programme Retrospective**

*Attendees: Ana (EA), Ravi Chandrasekaran (Lead AI Eng), Dr. Katz-Levin (Risk), Priya Sundaram (Senior Technical Recruiter)*
:::

> **Ana Beatriz Souza** — *Enterprise AI Architect*
>
> I want to name the pattern across this whole programme plainly: almost every major decision point involved real pressure to move faster or scope wider — Graham’s original autonomous-rejection vision, the acquisition timeline, Owen’s unified-experience deadline — and almost every time, holding to the slower, more rigorous path caught something real: the hobby-mention gender proxy, the Germany-specific career-path gap, and now the Bellcrest culture-fit score. I don’t think that’s a coincidence, and I want other teams to hear it as more than a values statement — the caution had a near-perfect hit rate at finding real problems, not just a theoretical risk-avoidance benefit. 

> **Dr. Miriam Katz-Levin** — *Head of People Analytics & Risk*
>
> I’d name a piece of technical debt honestly, though: our standing feature-review process is good at catching correlation-based proxies we can measure directly against known protected characteristics. I have less confidence it would catch a more subtle, compound proxy — a combination of several individually-innocuous features that only becomes a proxy in combination. We haven’t built tooling for that yet, and I want it named as a real gap, not implied to be covered by what we have. 

> **Priya Sundaram** — *Senior Technical Recruiter*
>
> From the recruiter side, the lesson I’d want carried forward is that adoption gaps are data, the same way Miriam treats bias metrics as data — my reduced use of the tool for senior roles wasn’t resistance, it was a genuine signal about scope mismatch, and it only got treated as useful information because someone asked me directly instead of just watching a dashboard. 

> **Ravi Chandrasekaran** — *Lead AI Engineer, Talent Systems*
>
> Anti-pattern I’d flag for other teams: it would have been easy, especially under the acquisition deadline, to treat ‘we already did a rigorous bias review for our original dataset’ as effort that should discount the bar for the next dataset. It doesn’t — each new data source is a genuinely new risk surface, and the Bellcrest culture-fit finding is proof that assuming otherwise would have been a real, not hypothetical, mistake. 

Recommendations carried forward to future agentic HR programmes at Correlate Global: (1) rule out autonomous employment decisions at the earliest possible stage, on the same permanent footing as denial-authority exclusions in other regulated domains, not as a phased limitation; (2) treat every new candidate-facing feature and every new data source, including from future acquisitions, as requiring its own full bias review regardless of how rigorously prior sources were reviewed; (3) run market-specific audits wherever labor-law or demographic norms differ materially, never relying on global-aggregate results to represent a specific population’s experience; (4) treat reduced adoption by expert users as a genuine scope-mismatch signal to investigate directly, not a change-management problem to push through; (5) invest in detecting compound, multi-feature proxy discrimination, not only single-feature correlation, as an acknowledged current gap. 

:::tip[✅ Stage Outcomes]

- ✅ Retrospective quantified the practical hit rate of the programme’s caution rather than defending it only on principle, strengthening the case for the same discipline in future programmes 

- ✅ A specific, unresolved technical gap (compound/multi-feature proxy discrimination) was named honestly rather than implied to be covered by existing tooling 

- ✅ Recruiter adoption feedback was formalized as a standing category of signal alongside bias metrics, broadening what the programme treats as meaningful operating data 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Decision Record (ADR-2027-013)|Pitch / Approve|ARB, Risk, Legal, Works Council|
|Feature-Level Proxy Discrimination Review &<br>Germany Audit (GOV-2027-011)|Design|Risk, AI Engineering|
|Acquisition Integration Scope Decision<br>(GOV-2027-016)|Build|CEO, CPO, Risk|
|Quarterly Operating Review (OPS-2028-Q1)|Operate|Talent Acquisition, Risk|
|Annual Programme Governance Decision<br>(RDREC-2028-009)|Review|CPO, Risk, Works Council, Legal|

_“Every time this programme was asked to move faster by skipping a review we’d already insisted on once, the shortcut would have hidden something real — a gendered hobby signal, a career-path penalty, a culture-fit score with someone else’s bias baked in. The caution wasn’t a value we held despite the pressure to be faster. It was, on the evidence, the actual fastest way to build something worth trusting.”_

:::
