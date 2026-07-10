---
title: "Case Study"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "10_media.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

# **Case Study** 

Solstice Media Group — Content Generation, Localization & IP Rights Compliance Platform 

Confidential Internal Engagement Documentation 

Engagement Period: July 2025 – June 2026 

|1. Executive Summary|
|---|
|2. Client Background|
|3. Business Problem|
|4. Constraints|
|5. Discovery Transcript|
|5.1 Kickoff—Week 1|
|5.2 Marketing Creative Team Shadowing—Week 3|
|5.3 Legal/Business Affairs Shadowing—Week 4|
|5.4 Capability Mapping and ROI—Week 5|
|6. Architecture Workshops|
|6.1 Data & Information Architecture—Rights & Clearances Knowledge Graph|
|6.2 AI/Platform Architecture—Whiteboard Session, Week 10|
|6.3 Security & Identity Architecture|
|6.4 Integration & API Strategy|
|7. Technical Debates|
|7.1 Should the Content-Generation Agent Have Access to Actual Competitor/Third-Party Creative<br>Assets for“Inspired By”Grounding?|
|7.2 Multi-Territory Legal Variance in the Guardrail Architecture|
|7.3 Evaluation Strategy Debate|
|8. Executive Reviews|
|8.1 Legal/Business Affairs Governance Review—Week 20|
|8.2 CMO Speed/Adoption Review—Week 28|
|8.3 Post-Incident Executive Review—Week 42 (see Section 14)|
|9. Final Architecture|
|10. Delivery Roadmap|
|11. Risks|
|12. Governance Model|
|13. Production Rollout|
|14. Production Incident—Month 10|
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

Solstice Media Group, a global media and entertainment company producing television, streaming, and marketing content across 30-plus territories, engaged an Enterprise AI Architecture team to build a content-generation and localization assistance platform for its marketing and secondary-content production teams, paired with an IP rights-compliance guardrail system designed to prevent AI-assisted content from inadvertently incorporating copyrighted or trademarked material Solstice did not have clear rights to use. 

The twelve-month engagement delivered a generative content-assistance platform for marketing asset creation, trailer-copy drafting, and multi-territory localization, integrated with a Rights & Clearances Knowledge Graph tracking Solstice’s actual licensing position for every character, music cue, brand partnership, and third-party asset across its content library — a genuinely difficult data problem given the complexity and fragmentation of entertainment-industry rights arrangements, which often involve layered, territory-specific, time-limited licenses negotiated separately for different use cases. 

The engagement’s defining incident occurred in Month 10: a marketing content-generation workflow, producing a set of social media promotional assets for a new streaming series, generated an image that an internal legal review flagged as bearing a strong stylistic resemblance to a distinctive, protected visual design element from an unrelated third-party franchise — not a direct reproduction, but close enough that Solstice’s legal team assessed real infringement risk and required the asset be pulled before any external publication occurred. The incident had not yet reached external publication when caught, but it triggered a fundamental redesign of the platform’s approach to visual-style guardrails and a broader reassessment of how “inspired by” creative direction prompts were handled throughout the generation pipeline. 

Key outcomes: - Marketing asset production cycle time reduced by approximately 60% for in-scope asset types (social promotional graphics, trailer copy variants, territory-localized marketing copy) - Multi-territory localization turnaround reduced from an average of 9 days to 2.5 days per territory batch - One material pre-publication IP risk finding (Month 10) caught by mandatory legal review before external release, triggering visual-style guardrail redesign - Zero instances of AI-generated content reaching external publication with an unresolved rights or IPrisk flag — the mandatory legal review gate held throughout the engagement 

# **2. Client Background** 

Solstice Media Group operates across television production, a direct-to-consumer streaming service, and a marketing/brand organization responsible for promotional content across all territories where Solstice content is distributed. The company’s content library includes both wholly-owned intellectual property and content produced under complex co-production, licensing, and distribution arrangements with other studios and rights holders — meaning Solstice’s own rights position on any given piece of content or character could be genuinely complicated, varying by territory, by use case (marketing versus the content itself), and by time-limited contractual windows. 

Solstice’s Chief Marketing Officer, Isabelle Fontaine, and General Counsel, David Okonkwo-Reyes, co-sponsored the engagement, reflecting its dual creative-production and legal-risk nature. Solstice’s marketing organization had faced increasing pressure to produce more territory-localized, more frequently-refreshed promotional content to compete with streaming rivals’ content marketing velocity, while Legal had grown increasingly concerned about the IP risk surface as generative AI tools proliferated informally across creative teams before this engagement’s formal governance was established. 

# **3. Business Problem** 

**Content velocity gap.** Solstice’s marketing teams needed to produce a large and growing volume of promotional assets — social media graphics, trailer copy variants, territory-localized campaigns — but existing production processes, involving external creative agencies and manual localization review, couldn’t keep pace with the streaming industry’s content-marketing cadence, where competitors were refreshing campaigns and producing territory-specific variants far faster than Solstice’s traditional agency-dependent workflow allowed. 

**Ungoverned AI proliferation and rights risk.** Discovery found that several marketing sub-teams had already begun informally using consumer generative AI tools for draft content, without any systematic check against Solstice’s actual rights position for the characters, brand elements, or creative styles being generated — a practice Okonkwo-Reyes’s office had already flagged internally as a governance gap before this engagement began, making this partly a “formalize and govern an existing practice” engagement rather than a purely greenfield build. 

# **4. Constraints** 

1. **Fragmented, territory- and use-case-specific rights data.** Solstice’s actual rights position for any given character, music cue, or brand element was not systematically codified anywhere — it existed across legal contract documents, distribution agreements, and institutional knowledge within the legal and business affairs teams, requiring substantial data-architecture work before any reliable automated rights-checking was possible. 

2. **Creative quality and brand voice.** Marketing leadership required that AI-assisted content genuinely meet Solstice’s creative and brand-voice standards, not just be legally safe — a distinct quality dimension from the IP-risk concerns, requiring the evaluation strategy to address both independently rather than treating “passed the rights check” as equivalent to “good creative work.” 

3. **Third-party style and likeness risk.** Beyond direct trademark/copyright infringement (using an actual protected asset), Solstice’s legal team flagged a subtler risk category: AI-generated content that wasn’t a direct reproduction of any specific protected work but was stylistically similar enough to a recognizable, distinctive third-party creative style to carry real infringement or right-of-publicity risk — a genuinely harder-to-systematize risk category than direct-asset-reuse checking, and the category directly implicated in the Month 10 incident. 

4. **Multi-territory legal variance.** Solstice’s territories had different legal standards for intellectual property, right of publicity, and content regulation (some territories with stricter advertising content regulations than others), meaning a rights-compliance architecture couldn’t assume a single, uniform legal standard applied globally. 

5. **Talent and likeness rights.** Marketing content featuring actual actors/talent from Solstice’s productions required checking not just IP rights but talent contract terms governing likeness use in marketing — a related but distinct rights category from character/franchise IP, requiring its own representation in the rights architecture. 

6. **Creative team autonomy and trust.** Marketing leadership was explicit that an overly restrictive or slow guardrail system would simply drive creative teams back to informal, ungoverned tool use (the exact preengagement problem) — the compliance architecture needed to be fast and usable enough that creative teams would actually adopt it rather than route around it. 

# **5. Discovery Transcript** 

## **5.1 Kickoff — Week 1** 

_Present: Isabelle Fontaine (CMO), David Okonkwo-Reyes (General Counsel), VP of Business Affairs (Miriam Chen), the Enterprise AI Architect (EAA)._ 

**Fontaine:** I need to be direct about the tension driving this engagement. My teams need to move faster — streaming competitors are producing territory-specific marketing content at a pace we simply can’t match with our current agency-dependent process. But I also know Legal has real concerns about how some of my teams have already started using AI tools informally, and I don’t want to solve the speed problem by creating a legal liability problem. 

**Okonkwo-Reyes:** I’ll add specificity to that concern. We’ve already had two internal incidents — not public, caught before external use — where marketing-generated content using consumer AI tools produced something uncomfortably close to a competitor’s protected character design. We got lucky that internal review caught both before external publication. I don’t want to rely on luck going forward, and I don’t want to simply ban AI tools either, because that just pushes the practice further underground rather than actually managing the risk. 

**EAA:** That’s a genuinely important framing — this isn’t a greenfield “should we adopt AI” question, it’s “how do we govern and improve a practice that’s already happening, in a way that creative teams will actually adopt rather than evade.” I want to design the rights-compliance guardrails to be fast and integrated into the actual creative workflow, not a slow, separate approval gate that creates the exact incentive to route around it that Isabelle just flagged as the core risk. 

**Chen (Business Affairs):** The harder problem underneath this is that our own rights position often isn’t cleanly documented anywhere a system could easily check against. A character might be fully owned by us for U.S. marketing use but only partially licensed for use in a specific European territory due to a co-production agreement, with a licensing window that expires in eighteen months. That complexity is real, not something we can wish away with a simpler data model. 

**EAA:** I want to take that complexity seriously rather than propose an oversimplified rights model that would give false confidence. I’d propose the core data-architecture investment of this engagement is building a genuinely accurate, territory- and use-case-specific **Rights & Clearances Knowledge Graph** , sourced directly from your actual contracts and business affairs institutional knowledge — I’d flag now that this is likely to be the single largest and most labor-intensive workstream in the engagement, more so than the generative-AI components themselves, precisely because the underlying rights reality is as fragmented as you’re describing. 

**Fontaine:** I want to understand the tradeoff between comprehensive and fast — if building a fully comprehensive rights graph takes a year, that’s not going to solve my team’s near-term speed problem. 

**EAA:** Fair, and I’d propose a phased approach rather than requiring full comprehensiveness before any value is delivered — prioritize the rights graph’s initial coverage around the content and territories generating the highest current marketing volume and, not coincidentally, the highest current informal-AI-use risk exposure, expanding coverage over time rather than attempting full library coverage before launch. 

## **5.2 Marketing Creative Team Shadowing — Week 3** 

**Marketing Creative Director (Elena Vasquez, no relation to other engagements’ similarly-named** 

**individuals):** For a new series launch, I need social assets, trailer copy variants for different territories, and I’m coordinating with an external creative agency who takes days to turn around each round of revisions. If I could get a first-draft set of on-brand creative options in an hour instead of days, and be confident they’re not going to get flagged by legal down the line, that would fundamentally change how much creative iteration I can actually do before a launch deadline. 

**EAA:** When you brief the external agency today, how do you communicate creative direction — style references, “inspired by” comparisons to other creative work? 

**Vasquez:** Constantly — “make it feel like [comparable successful marketing campaign]” is completely normal creative-direction language in this industry. That’s actually something I’d want to be able to say to an AI tool too, and I’d want to understand if that’s a problem from a rights perspective, because I genuinely don’t know where that line is today. 

This exchange directly foreshadowed the Month 10 incident and shaped an explicit discovery-phase flag — **“inspired by” and stylistic-reference creative-direction language was identified as a known risk area requiring specific guardrail design** , not an edge case discovered only after the incident, a point returned to directly in the postmortem (Section 15). 

## **5.3 Legal/Business Affairs Shadowing — Week 4** 

**Business Affairs Rights Specialist (Thomas Reid):** [reviewing a sample contract] This co-production agreement gives us marketing rights to this character, but only for “advertising materials directly promoting the co-produced series” — not for general brand marketing that happens to feature the character. That’s a real, meaningful distinction that requires understanding the specific contractual use-case scope, not just “do we have rights to this character, yes or no.” 

**EAA:** How is that use-case-scope distinction currently tracked or communicated to marketing teams making dayto-day content decisions? 

**Reid:** Honestly, it’s not systematically tracked — marketing teams generally know to check with us for anything involving a co-produced or licensed character, but the actual scope nuance lives in the contract language and our own institutional memory. 

This directly shaped the Rights & Clearances Knowledge Graph’s design to represent **use-case-scoped rights** , not just binary ownership/no-ownership, described further in Section 6.1. 

## **5.4 Capability Mapping and ROI — Week 5** 

|**Capability**|**Current State**|**AI Opportunity**|**Impact**|**Feasibility**|
|---|---|---|---|---|
|Marketing asset<br>generation (social,<br>trailer copy)|Agency-dependent,<br>slow|Generative content-<br>assistance platform|Very High|Medium|
|Multi-territory<br>localization|Manual<br>translation/adaptation<br>review|AI-assisted localization<br>with cultural/legal-<br>variance awareness|High|Medium|
|Rights and IP-risk<br>checking|Ad hoc, institutional-<br>knowledge-dependent|Rights & Clearances<br>Knowledge Graph +<br>automated guardrail<br>checking|Very High|Medium (data-<br>intensive)|
|Full content production<br>(episodic content itself)|Existing production<br>pipeline|Explicitly out of scope<br>— this engagement<br>addresses<br>marketing/secondary<br>content, not core<br>content production|N/A|N/A|
|Talent likeness/contract<br>compliance checking|Manual, Business<br>Affairs-dependent|Integrated into the<br>Rights Graph as a<br>related but distinct<br>rights category|Medium-High|Medium|

**EAA:** I want to flag the core-content-production exclusion explicitly, since it came up in early scoping conversations. I’d recommend against including core episodic content production in this engagement’s scope — that’s a materially different creative, legal, and guild-relations (actors’, writers’, directors’ union agreements) risk landscape than marketing/secondary content, and conflating the two risks both scope creep and importing a much more complex governance problem than this engagement’s timeline supports. 

**Fontaine:** Agreed, and frankly that’s a decision above my pay grade anyway given guild agreement implications — keep this scoped to marketing and secondary content. 

# **6. Architecture Workshops** 

## **6.1 Data & Information Architecture — Rights & Clearances Knowledge Graph** 

**Enterprise Data Architect (Wei Zhang):** Walk through how the use-case-scoped rights model from the Reid shadowing session actually gets represented. 

**EAA:** The Rights & Clearances Knowledge Graph encodes each rights-bearing entity — character, brand element, music cue, talent likeness — with structured relationships to: territory (which territories the right applies in), use case (the specific contractually-defined use scope, like Reid’s “advertising materials directly promoting the coproduced series” example), time window (license expiration dates, critical given some rights are time-limited), and source contract (traceable back to the actual underlying agreement for any ambiguous case requiring Business Affairs consultation). 

**Zhang:** That’s a meaningfully more complex data model than a simple ownership flag. How do we populate it without an enormous, slow manual data-entry effort? 

**EAA:** I want to be honest that there’s no way around this requiring substantial Business Affairs involvement, given the source data lives in contract language and institutional knowledge, not any existing structured system — but I’d propose prioritizing population by current marketing volume and risk exposure, per the phased approach we discussed in Week 1, rather than attempting comprehensive population before any value is delivered. I’d also propose an AI-assisted contract-extraction capability to help Reid’s team accelerate the initial population — extracting candidate structured rights data from contract text for Business Affairs review and confirmation, rather than requiring fully manual structured data entry — though I want to be clear that capability itself needs human verification given the legal stakes of getting the underlying rights data wrong. 

## **6.2 AI/Platform Architecture — Whiteboard Session, Week 10** 

**Platform Architect (Sam Ito):** Walk through the content-generation workflow end to end, including how rightschecking integrates. 

**EAA:** [at whiteboard] Marketing creative team member provides a creative brief — territory, asset type, creative direction, any specific characters or brand elements to feature. The Rights-Checking Agent queries the Knowledge Graph against every explicitly-referenced rights-bearing entity in the brief, returning a clear go/no-go/consultBusiness-Affairs status before generation even begins for anything with an explicit reference — this is the fast, integrated-into-workflow check Isabelle emphasized in Week 1, not a slow separate approval gate. 

**Ito:** That handles explicit references — a brief that says “feature character X.” What about the “inspired by” stylistic-reference pattern Elena Vasquez described in discovery? 

**EAA:** This is the harder problem, and I want to be honest that our Week 10 design treats it with meaningfully less rigor than the explicit-reference case — which, in retrospect, is exactly the gap the Month 10 incident exposed. At this point in the build, our approach was: the Content-Generation Agent is instructed via prompt guidance to avoid closely replicating any specific third-party protected style even when a creative brief references comparable external campaigns for tone/mood direction, but this is a soft, prompt-level instruction, not a hard, verifiable guardrail comparable to the Knowledge-Graph-backed explicit-reference check. 

**Fontaine (joining this session):** Is that soft instruction actually reliable? 

**EAA:** I want to answer this honestly rather than reassuringly: I don’t think prompt-level instruction alone is a reliable guardrail against subtle stylistic-similarity risk, for the same reason prompt-level instruction alone isn’t reliable for other categories of risk I’ve dealt with in other engagements — it’s a real mitigation, but not a hard backstop. I’d recommend this remain a flagged, actively-monitored risk area rather than something we present as fully solved, and I’d want mandatory legal review specifically weighted toward scrutinizing this risk category for any “inspired by”-style creative brief, given the guardrail here is genuinely softer than the explicit-reference pathway. 

This exchange — an accurate, honest assessment of a real architectural gap, made explicitly at design time rather than only discovered after an incident — is directly relevant to the Month 10 incident and its response (Section 14), and is referenced directly in the postmortem as evidence the risk was known, not novel. 

## **6.3 Security & Identity Architecture** 

- All generative content processing within Solstice’s cloud tenant boundary under contractual no-training/noretention terms with the model provider, given the commercial sensitivity of unreleased marketing campaigns and content strategy Access control aligned to Solstice’s existing content-security classification (unreleased series marketing carries higher sensitivity/access-restriction than content for already-released series), inherited rather than creating a parallel classification scheme 

Full audit logging of every generation request, rights-check result, and legal-review outcome — providing both the operational trail for the mandatory legal review gate and a discoverable record given entertainment-industry IP disputes are a real, recurring litigation category 

## **6.4 Integration & API Strategy** 

- MCP server exposing the Rights & Clearances Knowledge Graph as a queryable tool consumed by the Rights-Checking Agent, with a defined escalation pathway to Business Affairs for any query returning ambiguous or graph-uncertain results, consistent with the non-decisioning, human-escalation-on-ambiguity pattern used across several of the team’s other regulated engagements AI-assisted contract-extraction pipeline (Section 6.1) as a distinct, Business-Affairs-reviewed capability supporting Knowledge Graph population, not a production content-generation-facing capability Integration with Solstice’s existing digital asset management (DAM) system for final approved-asset storage and distribution, preserving existing brand-asset governance rather than creating a parallel asset repository 

# **7. Technical Debates** 

## **7.1 Should the Content-Generation Agent Have Access to Actual Competitor/Third-Party Creative Assets for “Inspired By” Grounding?** 

**ML Engineer (Devon Park):** If creative direction language like “make it feel like [comparable campaign]” is normal industry practice per Vasquez’s discovery interview, would giving the Content-Generation Agent actual reference access to the named comparable campaign’s assets produce better, more precisely-targeted creative output than relying on the model’s general training-data familiarity with it? 

**EAA:** I want to flag this as a genuinely risky direction rather than evaluate it purely on creative-quality merits. Providing the agent direct reference access to a specific third-party protected creative asset, even for “inspiration” rather than direct reproduction, meaningfully increases the risk that generated output stays closer to that specific reference than intended — I’d recommend against this, and would instead propose the creativedirection language be translated into abstract creative _attributes_ (color palette mood, pacing style, tonal register) rather than direct reference-asset access, keeping a clearer distinction between “inspired by a general creative direction” and “generated with a specific protected asset as reference material.” 

**Park:** That abstraction step could lose some of the precision Vasquez’s team wants from referencing a specific successful campaign. 

**EAA:** That’s a real cost, and I don’t want to dismiss it — but I think it’s the right tradeoff given the risk category we’re discussing. I’d rather creative teams accept somewhat less precise “inspired by” targeting than have the architecture actively increase infringement risk by providing direct reference-asset access. This is exactly the kind of tradeoff I’d want documented explicitly, not just decided quietly, given how central it is to the “inspired by” risk category flagged in Week 10. 

This decision — attribute-abstraction rather than direct reference-asset access — was implemented as designed and was not itself the direct cause of the Month 10 incident, which occurred through a different mechanism (Section 14) — but the underlying soft-guardrail limitation acknowledged in Week 10 remained relevant regardless. 

## **7.2 Multi-Territory Legal Variance in the Guardrail Architecture** 

**Fontaine (Week 16):** For territories with stricter advertising content regulations, does the Rights-Checking Agent need territory-specific compliance logic beyond just IP rights checking? 

**EAA:** Yes, and I’d recommend representing this as a related but distinct check from the core IP-rights-checking function, rather than conflating them into a single “compliance” check — territory-specific advertising content regulations (certain claims restrictions, disclosure requirements, content-rating-adjacent rules in some territories) are a different legal domain than IP/rights clearance, even though both need to be satisfied before a territoryspecific asset is approved. I’d propose a Territory Compliance Agent as a structurally separate check, consulted alongside but not merged with the Rights-Checking Agent, so each can be maintained and updated against its own regulatory source material independently. 

**Okonkwo-Reyes:** That separation makes sense from a legal-team-organization perspective too — different specialists on my team own IP/rights versus advertising-content-regulation compliance. 

## **7.3 Evaluation Strategy Debate** 

**Vasquez (Creative Director):** I want evaluation to cover creative quality, not just legal safety — a legally-safe asset that’s creatively mediocre doesn’t actually solve my team’s problem. 

**EAA:** Agreed, and I’d propose these as genuinely separate evaluation tracks rather than trying to build a single blended score, given they’re measuring different things for different stakeholders. Legal/rights-safety evaluation: percentage of generated content passing rights-checking and legal review without a flag, tracked as a hard-gate metric. Creative-quality evaluation: structured review by Vasquez’s creative team against Solstice’s existing brand-voice and creative-quality standards, using the same review criteria her team already applies to agencyproduced work, specifically so the AI-assisted content is held to the same bar, not a separate, lower one. 

**Okonkwo-Reyes:** For the “inspired by” risk category specifically, given what we discussed in Week 10 about the guardrail being softer there, I want that risk category’s flag rate tracked separately and reported to me directly, 

not folded into a general rights-check pass rate. 

**EAA:** That’s a good instinct given the acknowledged architectural gap, and I’d build that stratified tracking from the start rather than adding it reactively — this became directly relevant when the Month 10 incident occurred within exactly this flagged risk category. 

# **8. Executive Reviews** 

## **8.1 Legal/Business Affairs Governance Review — Week 20** 

**Okonkwo-Reyes (chairing):** I’m prepared to approve pilot deployment for the explicit-reference-checking pathway, which I’m confident in given the Knowledge Graph architecture. For the “inspired by” pathway, I want to approve pilot deployment too, but I want it explicitly conditioned on mandatory legal review for every asset in that category before external publication, with no exceptions and no fast-track — given the team’s own honest assessment in Week 10 that the guardrail there is softer. 

**Fontaine:** That mandatory review adds time back into exactly the category — creative “inspired by” direction — that Elena’s team uses constantly. I want to understand if that’s going to functionally neutralize the speed benefit for a meaningful share of our content. 

**EAA:** I want to be direct about this tension rather than paper over it. I think Okonkwo-Reyes’s condition is the right call given the genuine architectural gap we’ve acknowledged — I’d rather creative teams experience real, bounded friction on this specific risk category than have an unreviewed “inspired by” asset reach external publication with unassessed infringement risk. I’d recommend we track how large a share of actual content volume falls into this reviewed category, and if it’s a large share, that’s useful signal to prioritize hardening the “inspired by” guardrail architecture sooner rather than accepting the friction indefinitely. 

**Okonkwo-Reyes:** Agreed, and I want that volume tracked and reported to me monthly. 

## **8.2 CMO Speed/Adoption Review — Week 28** 

**Fontaine:** Give me the honest adoption picture. Are creative teams actually using this instead of routing back to informal tool use? 

**EAA:** Adoption is strong for the explicit-reference pathway — fast, integrated, and creative teams report it’s genuinely faster than their prior process. For the “inspired by” pathway with mandatory legal review, adoption is more mixed — some teams are using it and accepting the review friction, but we have anecdotal signal, not yet fully quantified, that some teams may still be supplementing with informal tools for very early, rough creative exploration before bringing a refined direction into the governed platform. 

**Fontaine:** That’s exactly the risk David and I discussed in Week 1 — governance that’s too slow just pushes the risk back underground for part of the workflow. 

**EAA:** I’d agree that’s a real, live risk, not fully resolved by this platform as currently designed. I’d recommend this be an explicit, named risk in the risk register rather than something we consider solved because the formal platform has a governance gate — the gate only works if it’s where the actual risk-bearing creative decisions happen, and informal early-exploration tool use potentially routes around that. 

## **8.3 Post-Incident Executive Review — Week 42 (see Section 14)** 

**Okonkwo-Reyes:** I want to understand precisely how this asset got as far as legal review before being caught, and whether that’s the system working as designed or a near-failure. 

**EAA:** I’d characterize this as the system working exactly as designed, and I want to be clear that’s a meaningfully different characterization than “the system failed and got lucky.” This asset came from an “inspired by” creative brief, which per the Week 20 governance decision was routed to mandatory legal review before any external publication — and that review is precisely what caught the stylistic-similarity risk before publication. This is the acknowledged-soft-guardrail-plus-mandatory-human-review architecture functioning as intended, not a bypass of it. 

**Okonkwo-Reyes:** So the actual finding here isn’t “the mandatory review process failed,” it’s “we now have a concrete example validating that the ‘inspired by’ guardrail genuinely needs hardening, not just human-review backstopping indefinitely.” 

**EAA:** That’s exactly how I’d characterize it, and I think it validates both the original Week 10 honesty about the gap and the Week 20 decision to require mandatory review for that category rather than treating the softer guardrail as adequate on its own. 

# **9. Final Architecture** 

- **Rights & Clearances Knowledge Graph** : territory-, use-case-, and time-window-scoped structured representation of Solstice’s actual rights position for characters, brand elements, music cues, and talent likeness, populated via AI-assisted contract extraction with mandatory Business Affairs verification, phased by content volume/risk priority 

- **Rights-Checking Agent** : fast, workflow-integrated go/no-go/consult-Business-Affairs checking for any explicitly-referenced rights-bearing entity in a creative brief 

- **Content-Generation Agent** : produces marketing assets and localization content using attribute-abstracted (not direct-reference) creative-direction grounding for “inspired by” briefs (Section 7.1), with output for this category routed to mandatory legal review before external publication **Territory Compliance Agent** : structurally separate check for territory-specific advertising content regulation, maintained independently from IP/rights-clearance logic 

- **Redesigned Visual-Style Guardrail** (post-incident, Section 14.3): hardened, more systematic stylisticsimilarity detection for the “inspired by” pathway, supplementing rather than replacing the mandatory legal review gate 

- Stratified evaluation tracking distinguishing explicit-reference and “inspired by” risk categories, with the latter’s flag rate and volume reported directly to General Counsel 

# **10. Delivery Roadmap** 

|**Phase**|**Duration**|**Scope**|
|---|---|---|
|Discovery & Architecture|Months 1–2|Discovery, Rights Graph data-<br>architecture design|
|Rights Graph Population (Phase 1,<br>highest-volume content)|Months 2–6|AI-assisted contract extraction, Business<br>Affairs verification|
|Content-Generation Platform Build|Months 3–7 (overlapped)|Explicit-reference and “inspired by”<br>pathways, Territory Compliance Agent|
|Governance Review & Pilot Approval|Month 5 (during build)|Week 20 mandatory-review conditioning<br>decision|
|Pilot Deployment|Months 7–9|Limited creative-team rollout, both<br>pathways|
|Broader Rollout|Months 9–10|Expanded creative-team adoption|
|Incident & Remediation|Month 10|Stylistic-similarity pre-publication<br>finding, guardrail redesign|
|Post-Remediation Stabilization|Months 10–12|Hardened visual-style guardrail deployed,<br>continued Rights Graph expansion|

# **11. Risks** 

|**Risk**|**Likelihood**|**Impact**|**Mitigation**|**Owner**|
|---|---|---|---|---|
|Stylistic-<br>similarity/“inspired by”<br>infringement risk|Medium (realized —<br>Section 14)|High|Mandatory legal review<br>for this category (held<br>throughout); post-<br>incident hardened<br>guardrail|General Counsel /<br>Creative Legal|
|Incomplete Rights &<br>Clearances Knowledge<br>Graph coverage|Medium (phased<br>population, ongoing)|High|Priority-based phased<br>population by content<br>volume/risk exposure,<br>explicit coverage-gap<br>tracking|Business Affairs|
|Creative team routing<br>around governed<br>platform for early-stage<br>informal exploration|Medium (partially<br>realized per Week 28<br>signal)|Medium-High|Explicit risk-register<br>tracking, ongoing<br>adoption monitoring,<br>not treated as solved by<br>platform existence<br>alone|CMO / General Counsel|
|Talent<br>likeness/contract-term<br>compliance gap|Low-Medium|High|Integrated into Rights<br>Graph as distinct rights<br>category, Business<br>Affairs verification|Business Affairs|
|Territory-specific<br>advertising regulation<br>non-compliance|Low|Medium|Structurally separate<br>Territory Compliance<br>Agent, independently<br>maintained|Legal / Territory<br>Compliance|

# **12. Governance Model** 

- **Mandatory legal review for all “inspired by”-category content** prior to external publication, held as a non-negotiable gate throughout the engagement, validated as the control that caught the Month 10 finding **Monthly reporting to General Counsel** of “inspired by” pathway volume and flag rate, per the Week 20 stratified-tracking requirement, used to prioritize the eventual guardrail-hardening investment **Explicit informal-tool-use risk tracking** : adoption and potential-workaround patterns tracked as an ongoing risk-register item, not considered resolved by the governed platform’s existence alone **AI Change Advisory process** : any change to the Rights & Clearances Knowledge Graph schema, the Rights-Checking Agent’s logic, or the visual-style guardrail requires joint Legal and Platform Architecture sign-off 

# **13. Production Rollout** 

Pilot deployment began Month 7 with a limited set of creative teams working on upcoming series launches, chosen to align with the Rights Graph’s initial phased-population priority (Section 6.1). Broader rollout to additional creative teams occurred Months 9–10, with the Month 10 incident occurring shortly after this broader rollout — during a period of both increased platform usage volume and, per the postmortem, less individualized on-boarding attention than the original pilot group had received, a factor noted in the incident review though not identified as a primary causal factor. 

# **14. Production Incident — Month 10** 

## **14.1 Incident Summary** 

A marketing creative team, producing social media promotional assets for an upcoming series launch, submitted an “inspired by” creative brief referencing a comparable successful marketing campaign’s general tone and visual energy (per the attribute-abstraction design from Section 7.1 — no direct reference-asset access was provided to the Content-Generation Agent). The generated output, per the Week 20 governance requirement, was routed to mandatory legal review before any external publication. Solstice’s legal team, reviewing the generated image assets, flagged one variant as bearing a strong stylistic resemblance — in color palette, character silhouette treatment, and overall visual composition — to a distinctive, legally protected visual design element from an unrelated third-party entertainment franchise, despite no direct reference to that franchise appearing anywhere in the creative brief or, as far as could be determined, in the attribute-abstracted prompt actually sent to the generation model. 

Legal’s assessment was that while not a direct reproduction, the resemblance was close enough to carry real infringement risk if published externally. The asset was pulled before any external use; no publication occurred. 

## **14.2 Incident Response Transcript** 

**Okonkwo-Reyes (review session, within 48 hours, given no external publication occurred, allowing for a less compressed emergency timeline than some other engagements’ incidents):** I want to understand the actual generation mechanism — how did an attribute-abstracted brief, with no direct reference to the third-party franchise, produce something similar enough to trigger this concern? 

**EAA:** Based on our investigation, the most likely explanation is that the underlying generative model’s own training data familiarity with the third-party franchise’s visual style — which is genuinely distinctive and, unfortunately, well-represented in the kind of general training data these models learn from — meant that certain abstracted creative attributes in the brief (specific color-palette and silhouette-treatment language, in this case) happened to correlate strongly enough with that franchise’s recognizable style in the model’s learned associations to produce output that echoed it, even without any explicit reference. This is a genuinely different and, honestly, harder mechanism to fully guard against than either direct reference-asset access (which we deliberately avoided per ADR-003) or explicit named-franchise mentions (which the Rights-Checking Agent would have caught). 

**Park (ML Engineer):** Is this a predictable, systematic risk, or a rare, hard-to-anticipate edge case? 

**EAA:** I want to be honest that our Week 10 assessment already flagged this general risk category as inadequately guarded by prompt-level instruction alone — we didn’t predict this specific incident, but we did predict, in the architecture documentation itself, that the “inspired by” pathway’s guardrail was soft and that mandatory legal review was a necessary backstop specifically because of that acknowledged gap. I’d characterize this incident as a fairly direct validation of that Week 10 concern materializing in practice, not a novel, unforeseen failure mode. 

**Fontaine:** I want to understand the practical implication for my creative teams — does this mean “inspired by” creative direction is now effectively off-limits? 

**EAA:** I don’t think that’s the right conclusion, and I’d push back on it if proposed. I think the right response is hardening the guardrail specifically for stylistic-similarity risk — building automated visual-similarity screening (comparing generated visual output against a reference library of known, distinctive protected third-party visual styles) as an additional, earlier-stage check before content even reaches the human legal review stage, reducing the volume of clearly-problematic content reaching that review stage while keeping the human review as the final backstop for the genuinely ambiguous cases, rather than the sole line of defense for everything in this category. 

**Okonkwo-Reyes:** I want that automated pre-screening built, and I want the mandatory human legal review preserved regardless of how good the automated screening becomes — I’m not willing to remove the human backstop just because we’ve added an earlier automated check, given how directly this incident validates the value of that backstop. 

## **14.3 Remediation** 

An automated visual-similarity screening capability was added to the Content-Generation pipeline for the “inspired by” pathway specifically: generated visual assets are compared against a curated reference library of 

known, distinctive protected third-party visual styles (built and maintained with Legal’s involvement, given the legal judgment required to determine what counts as sufficiently distinctive to warrant inclusion) before reaching the human legal review stage, with any flagged similarity surfaced explicitly to the legal reviewer rather than silently blocking generation — preserving human judgment for the final call while reducing the volume of clearcut cases requiring full manual visual comparison from scratch. 

# **15. Lessons Learned** 

1. **An honestly acknowledged architectural gap, documented at design time (Week 10) rather than discovered only after an incident, enabled a faster and more confident incident response.** Because the team had already characterized the “inspired by” pathway’s guardrail as soft and specifically recommended mandatory human review as a necessary backstop for that reason, the Month 10 incident was immediately recognizable as validation of a known, named risk rather than requiring the team to first diagnose whether this was a novel failure mode — accelerating the path to an appropriate, proportionate remediation. 

2. **A generative model’s own training-data familiarity with distinctive third-party creative work is a genuinely difficult risk surface to fully close through prompt-level or reference-access controls alone, because the risk can manifest even without any explicit reference to the protected work in the input.** This is a meaningfully different risk mechanism than direct-asset-reuse or explicit-reference risk, and the postmortem’s recommendation — automated visual-similarity screening as an additional, earlierstage layer, not a replacement for human review — reflects that this risk category likely requires ongoing, evolving mitigation rather than a single architectural fix that fully closes it. 

3. **Mandatory human review, even when it creates real friction against a business goal (creative velocity) that leadership genuinely cares about, proved its value directly and concretely in this incident — reinforcing the Week 20 governance decision against relaxing it, even as the underlying automated guardrail improves.** The postmortem was explicit that automated pre-screening should reduce the _volume_ of cases requiring full manual scrutiny, not eliminate the human review step itself — a pattern consistent with how mandatory human verification processes functioned as the actual safeguard across several of this team’s other regulated-industry engagements, here applied to creative/IP risk rather than safety, financial, or clinical risk. 

# **16. Enterprise Architecture Artifacts** 

- **Capability Map** : marketing content generation, localization, and rights-compliance value chains with AIopportunity overlay (Section 5.4) 

- **Rights & Clearances Knowledge Graph schema** : territory/use-case/time-window-scoped rights representation, with phased-population priority documentation 

- **Visual-Style Guardrail Architecture** (post-incident artifact): the automated similarity-screening design, including the Legal-curated reference-library methodology 

- **“Inspired By” Risk Category Documentation** : the Week 10 original risk assessment, preserved and referenced directly in the Month 10 postmortem as an example of a well-characterized, proactively-flagged architectural gap 

# **17. Architecture Decision Records (ADRs)** 

**ADR-001: Rights & Clearances Knowledge Graph represents territory-, use-case-, and time-windowscoped rights, not a simplified binary ownership model.** Status: Accepted. See Section 6.1, directly responsive to the Reid shadowing finding. 

**ADR-002: Core episodic content production explicitly out of scope; engagement addresses marketing and secondary content only.** Status: Accepted. See Section 5.4. 

**ADR-003: Content-Generation Agent uses attribute-abstracted creative-direction grounding for “inspired by” briefs, not direct reference-asset access to named comparable campaigns or third-party works.** Status: Accepted. See Section 7.1. Did not fully prevent the Month 10 incident, which arose from the underlying model’s training-data familiarity rather than explicit reference access — a distinct mechanism. 

**ADR-004: Mandatory legal review, with no fast-track exception, required for all “inspired by”-category generated content prior to external publication.** Status: Accepted at Week 20; validated as the control that caught the Month 10 finding; preserved post-incident per Okonkwo-Reyes’s explicit direction. 

**ADR-005: Territory Compliance Agent structurally separate from the Rights-Checking Agent, maintained independently for territory-specific advertising content regulation.** Status: Accepted. See Section 7.2. 

**ADR-006: Stratified evaluation and reporting distinguishing explicit-reference and “inspired by” risk categories, with the latter reported directly to General Counsel.** Status: Accepted. See Section 7.3 and Section 8.1. 

**ADR-007 (post-incident): Automated visual-similarity screening added as an earlier-stage check for the “inspired by” pathway, comparing generated visual output against a Legal-curated reference library of distinctive protected third-party styles, surfacing flags to human legal reviewers rather than silently blocking — mandatory human review preserved regardless of automated screening performance.** Status: Accepted, built and deployed following the Month 10 incident. 

# **18. AI Evaluation Strategy** 

- **Rights-check accuracy (explicit-reference pathway)** : measured against Business-Affairs-verified ground truth, tracked as a hard-gate metric given the direct IP-risk consequences of a missed check **“Inspired by” pathway flag rate and volume** : tracked separately and reported monthly to General Counsel per the Week 20 governance requirement, used to prioritize the guardrail-hardening investment that followed the Month 10 incident 

- **Creative-quality evaluation** : structured review by Solstice’s creative team against existing brandvoice/quality standards, holding AI-assisted content to the same bar as agency-produced work, tracked independently from legal-safety metrics per Vasquez’s Week 10 requirement 

- **Post-incident visual-similarity screening efficacy** : validated against both the Month 10 incident’s specific case and a broader test set of known-similar-style scenarios, reviewed jointly by Legal and the ML engineering team before and after deployment 

- **Platform adoption vs. informal-tool-use risk** : ongoing qualitative and, where possible, quantitative tracking of the Week 28 concern about creative teams routing around the governed platform for early-stage exploration, treated as a standing risk-register item rather than resolved 

# **19. Operational Runbook** 

- **Rights Graph update procedure** : triggered by new contract execution, license expiration, or Business Affairs-identified correction, with mandatory Business Affairs sign-off for any change, consistent with the human-verification pattern used across other engagements’ policy/knowledge-graph update procedures **“Inspired by” mandatory review procedure** : defined workflow and SLA for legal review turnaround, balancing Okonkwo-Reyes’s non-negotiable review requirement against Fontaine’s creative-velocity needs, monitored for bottleneck patterns 

- **Visual-similarity reference library maintenance** : standing process for Legal to add newly-identified distinctive protected third-party styles to the screening reference library as new risk patterns are identified, not a one-time-built, static library **Territory Compliance regulatory-update monitoring** : process for tracking changes to territory-specific advertising content regulations, feeding updates to the Territory Compliance Agent independently from the Rights Graph’s own update cadence 

# **20. Future Roadmap** 

1. **Continued Rights & Clearances Knowledge Graph expansion** beyond the initial phased, highest-volume content coverage, toward fuller library coverage over time, informed by ongoing content-volume and riskexposure prioritization rather than a fixed calendar target. 

2. **Deeper investigation of the informal-tool-use-workaround risk** flagged at Week 28 and preserved as a standing risk-register item — potential future workstream examining whether the “inspired by” pathway’s friction could be reduced through further automated-screening improvement without weakening the mandatory human review backstop, an open question the team explicitly declined to resolve prematurely. 

3. **Talent likeness rights-checking deepening** : closer integration between the Rights Graph’s talentlikeness category and Solstice’s talent contract management systems, currently less mature than the character/franchise IP portion of the graph. 

4. **Cross-functional reuse of the visual-similarity screening pattern** : Solstice’s broader Legal function has expressed interest in the automated-screening-plus-mandatory-human-review pattern developed here as a potential model for other AI-generated-content risk categories across the company, beyond marketing specifically — flagged as a candidate for a future, separately-scoped engagement given the different stakeholder and content-type considerations involved.
