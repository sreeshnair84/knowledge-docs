---
title: "Case Study"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "06_government.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# **Case Study** 

State of Meridian Department of Human Services — Citizen Benefits Eligibility Assistant 

Confidential Internal Engagement Documentation 

Engagement Period: May 2025 – April 2026 

|1. Executive Summary|
|---|
|2. Client Background|
|3. Business Problem|
|4. Constraints|
|5. Discovery Transcript|
|5.1 Kickoff—Week 1|
|5.2 Caseworker Shadowing—Week 3|
|5.3 Citizen-Facing Usability Pre-Discovery—Week 4|
|5.4 Capability Mapping and ROI—Week 5|
|6. Architecture Workshops|
|6.1 Data & Information Architecture|
|6.2 AI/Platform Architecture—Whiteboard Session, Week 10|
|6.3 Security & Identity Architecture|
|6.4 Integration & API Strategy|
|7. Technical Debates|
|7.1 Multi-Lingual Support Architecture|
|7.2 Should the Rules-Monitoring Agent Auto-Apply Federal Updates?|
|7.3 Evaluation Strategy Debate—Fairness and Accessibility|
|8. Executive Reviews|
|8.1 State IT Governance Review—Week 24|
|8.2 Pre-Launch Fairness Audit Review—Week 34 (see Section 14)|
|9. Final Architecture|
|10. Delivery Roadmap|
|11. Risks|
|12. Governance Model|
|13. Production Rollout|
|14. Pre-Launch Finding—Month 8 (Fairness Audit)|
|14.1 Finding Summary|
|14.2 Response Transcript|
|14.3 Remediation|
|15. Lessons Learned|
|16. Enterprise Architecture Artifacts|
|17. Architecture Decision Records (ADRs)|
|18. AI Evaluation Strategy|
|19. Operational Runbook|
|20. Future Roadmap|

# **1. Executive Summary** 

The State of Meridian’s Department of Human Services (DHS), responsible for administering federal and state benefits programs (SNAP, Medicaid, TANF, and state-specific energy assistance) to approximately 1.4 million residents, engaged an Enterprise AI Architecture team to build a citizen-facing eligibility-screening and application-assistance tool, alongside an internal caseworker copilot to reduce a persistent backlog in benefitsapplication processing. 

The eleven-month engagement — considerably slower than comparable private-sector engagements due to state procurement law, FedRAMP-adjacent security requirements for systems touching federally-funded programs, and a mandatory public-comment period — delivered a citizen-facing eligibility screener grounded in a codified benefits-rules knowledge graph, and an internal caseworker copilot assisting with document review and eligibilitydetermination drafting, both operating under a strict non-decisioning boundary enforced even more rigidly than in the engagement team’s private-sector work, given the direct due-process implications of benefits determinations. 

The engagement’s central governance event was not a production incident but a pre-launch finding: an internal fairness audit, conducted as a condition of executive sign-off, identified that the eligibility screener’s plainlanguage explanations of ineligibility determinations were systematically less clear and less actionable for nonnative English speakers, despite the underlying determinations themselves being accurate and unbiased — a finding that delayed launch by ten weeks while the team redesigned the explanation-generation approach and conducted supplementary usability testing with the affected population. 

Key outcomes: - Citizen self-screening reduced unnecessary in-person office visits for clearly-ineligible cases by an estimated 31%, reducing wait times for citizens with genuine, actionable applications - Caseworker documentreview time reduced by approximately 40% on in-scope case types - Pre-launch fairness audit finding addressed prior to public rollout, avoiding a disparate-impact issue that would otherwise have reached production - Zero automated eligibility denials — every determination affecting a citizen’s benefits remains a human caseworker decision, per statutory due-process requirements 

# **2. Client Background** 

Meridian DHS operates through a combination of state central offices and 43 county-level field offices, administering both federally-funded programs (SNAP, Medicaid) subject to federal regulations and oversight, and state-specific programs subject to Meridian’s own statutory framework. The department had faced sustained public criticism over application-processing backlogs, particularly following a period of elevated caseload growth, and the state legislature had held oversight hearings on the issue in the year prior to this engagement. 

The engagement was sponsored by DHS Commissioner Angela Whitfield (a political appointee reporting to the Governor) and the department’s Chief Information Officer, Marcus Delacroix, a career civil servant with two decades at the department who had witnessed several prior technology modernization efforts stall in procurement or fail to account for the department’s regulatory complexity. 

# **3. Business Problem** 

**Citizen-facing confusion.** Meridian’s benefits programs had eligibility rules that varied by program, household composition, income, and — for some programs — county-specific supplemental provisions. Citizens attempting to determine their own eligibility before applying often could not get a clear answer without an in-person office visit, contributing to office wait times that had become a recurring source of public complaint and legislative scrutiny. 

**Caseworker backlog.** Caseworkers processing applications spent significant time manually reviewing submitted documentation (pay stubs, household composition documents, medical records for disability-related benefits) against program-specific eligibility criteria, cross-referencing rules that, like the banking and healthcare engagements’ policy-manual problems, existed as lengthy program manuals rather than structured, queryable data — compounded here by the fact that federal program rules changed on the federal government’s schedule, sometimes with limited advance notice to states. 

# **4. Constraints** 

1. **Due process.** Both federal and state law required that benefits determinations affecting a citizen’s eligibility be made by an accountable human decision-maker with defined appeal rights — an AI system could never be the determinative authority, a constraint even more legally rigid here than the analogous non-decisioning boundaries in the banking and healthcare engagements, given constitutional due-process case law specific to government benefits administration. 

2. **Procurement law.** State procurement processes required competitive bidding, public disclosure of contract terms, and a formal state IT governance review — a materially slower and more procedurally constrained process than private-sector procurement, which the engagement timeline had to accommodate rather than treat as an obstacle to route around. 

3. **FedRAMP-adjacent security requirements.** Systems touching federally-funded program data (SNAP, Medicaid) were subject to federal security requirements flowing down through the state’s federal funding agreements, requiring a security architecture and authorization process modeled on, though not identical to, full FedRAMP authorization. 

4. **Public records and transparency law.** Meridian’s public records law meant that significant elements of the system’s design, and potentially its underlying logic, could be subject to public disclosure requests — a consideration that shaped both the architecture’s auditability and the department’s approach to what could remain a trade-secret-protected vendor component versus what needed to be state-owned and disclosable. 

5. **Digital equity.** A meaningful share of DHS’s client population had limited digital literacy, limited English proficiency, or limited reliable internet/device access — the citizen-facing tool could not be designed assuming a digitally fluent, English-fluent user, a constraint that became central to the pre-launch fairness audit finding (Section 14). 

6. **Federal program rule volatility.** SNAP and Medicaid eligibility rules could change based on federal policy updates, sometimes on short notice, requiring a rules-update process that could keep pace without requiring a full re-procurement or re-authorization cycle for every rule change. 

# **5. Discovery Transcript** 

## **5.1 Kickoff — Week 1** 

_Present: Commissioner Angela Whitfield, CIO Marcus Delacroix, the department’s General Counsel (Robert Chen, no relation to prior engagements’ namesakes), a Legal Aid Society representative invited as a stakeholder given the population served, the Enterprise AI Architect (EAA)._ 

**Whitfield:** I’ve been in front of the legislature twice this year explaining our backlog. I need this to actually reduce wait times, and I need to be able to explain to a skeptical committee exactly how it works and why it’s fair. 

**Delacroix:** I want to add something Angela’s political context doesn’t always surface: I’ve seen three modernization efforts at this department stall or fail because vendors didn’t understand that our eligibility rules aren’t simple lookups — they’re genuinely complex, they interact with federal rules we don’t fully control, and getting a determination wrong isn’t a minor bug, it’s someone losing food assistance or health coverage they’re legally entitled to, or conversely, us paying out benefits we’re not authorized to pay and having to claw them back later, which is its own harm to the recipient. 

**EAA:** Both of those failure directions matter, and I want to design against both rather than optimizing for one at the expense of the other. I’d propose the same non-decisioning principle I’ve applied in similarly high-stakes regulated engagements: the system never issues an eligibility determination — it can help a citizen understand likely eligibility before applying, and it can help a caseworker assemble and review the evidence faster, but the actual determination, and the accountability for it, remains a human caseworker’s, with full appeal rights preserved exactly as they exist today. 

**Legal Aid representative (Yolanda Reyes-Martinez):** I want to raise something specific to who you’re serving. A lot of our clients don’t trust government systems, sometimes for good historical reasons. If this tool gives someone a confusing or unclear answer about their eligibility, they may just give up rather than push back or seek clarification — that’s a very different failure mode than a private-sector customer who’ll just call and complain. 

**EAA:** That’s a critical framing I want to build into the evaluation strategy explicitly, not just note as a general concern — I’d propose usability testing specifically with representative members of the client population, including non-native English speakers and people with limited digital literacy, as a mandatory pre-launch gate, not an optional nice-to-have. I’ll say directly: this is a population where an unclear system failure has a meaningfully worse consequence than in most private-sector contexts I’ve worked in, and the architecture and testing rigor should reflect that. 

**Chen (General Counsel):** And I need every explanation this system gives a citizen to be legally accurate, not just plain-language-friendly — I don’t want a well-intentioned simplification that ends up being wrong about someone’s actual rights. 

## **5.2 Caseworker Shadowing — Week 3** 

**Caseworker (Denise Alcala, SNAP unit):** For a household with mixed immigration status, self-employment income, and a recent job loss, I’m cross-referencing three different sections of the federal SNAP manual plus our state supplemental guidance, and the manual itself is genuinely ambiguous in a couple of places — I usually call a senior caseworker to confirm my read before finalizing. 

**EAA:** When the manual is ambiguous like that, how is that ambiguity ultimately resolved? 

**Alcala:** Sometimes there’s an official policy clarification bulletin from the state office; sometimes it’s just accumulated institutional practice among senior caseworkers that isn’t written down anywhere formally. 

This session directly shaped a decision similar to the banking and healthcare engagements’ knowledge-graph pattern, but with an added wrinkle: the **Benefits Rules Knowledge Graph** needed to explicitly represent not just codified rules but a **confidence/authority tier** — distinguishing rules with clear statutory or regulatory basis from areas of documented policy clarification versus undocumented institutional practice — surfaced transparently to caseworkers rather than presented with false uniform confidence, described further in Section 6.1. 

## **5.3 Citizen-Facing Usability Pre-Discovery — Week 4** 

Working with Reyes-Martinez’s Legal Aid Society contacts, the team conducted informal usability sessions with several current and former benefits recipients. 

### **Participant (anonymized, Spanish-primary speaker, using an English-language draft prototype):** 

[translated] I don’t understand why it says I might not qualify. It just says “income exceeds threshold” — exceeds what threshold? For which program? I would just give up and not apply if I saw this. 

**EAA:** This is exactly the finding I want captured formally, this early, even though it’s a rough prototype — the technical determination might be entirely correct, but the _explanation_ is failing the actual communication goal for a real user in the target population. I’d rather have this surface now, in week four, than discover it in a compliance audit after launch. 

This early finding, while informative, did not fully prevent a more systematic version of the same issue from surfacing later in the formal pre-launch fairness audit (Section 14) — a point the postmortem returns to directly. 

## **5.4 Capability Mapping and ROI — Week 5** 

|**Capability**|**Current State**|**AI Opportunity**|**Impact**|**Feasibility**|
|---|---|---|---|---|
|Citizen eligibility self-<br>screening|None (requires office<br>visit or manual<br>research)|Grounded eligibility<br>screener, plain-<br>language explanations|Very High|Medium|
|Caseworker document<br>review|Fully manual|Document-review and<br>evidence-<br>summarization copilot|High|Medium|
|Eligibility<br>determination|Human caseworker|Explicitly out of scope<br>— remains human, non-<br>negotiable per due<br>process|N/A|N/A|
|Federal rule-change<br>monitoring|Manual bulletin<br>tracking|Rules-change<br>monitoring agent,<br>human-reviewed graph<br>updates|Medium-High|Medium|
|Fraud detection|Existing separate<br>program|Out of scope —<br>different governance<br>model, not this<br>engagement|Low|N/A|

**EAA:** I want to flag the fraud-detection exclusion specifically, since it came up in early scoping conversations with the department’s program-integrity unit. I’d recommend keeping this engagement’s tools and the programintegrity unit’s fraud-detection work architecturally and organizationally separate — conflating an eligibilityassistance tool meant to help citizens access benefits they’re entitled to with a fraud-detection capability risks undermining the trust-building goal Yolanda raised in Week 1, and the governance models for the two functions are genuinely different. 

**Whitfield:** Agreed — keep them separate, and I’d want that separation clearly communicated publicly too, given how sensitive this population is to feeling surveilled rather than served. 

# **6. Architecture Workshops** 

## **6.1 Data & Information Architecture** 

**Enterprise Data Architect (Wei Zhang):** Walk me through the confidence-tier concept from the Alcala shadowing session — how does that actually get represented? 

**EAA:** The Benefits Rules Knowledge Graph encodes each rule with an explicit provenance tag: statutory/regulatory (highest confidence, direct citation to code), official policy bulletin (documented but more specific/situational), or institutional practice (the least formally documented tier, sourced from structured interviews with senior caseworkers and explicitly flagged as such). For the citizen-facing screener, I’d recommend only surfacing determinations grounded in the top two tiers directly — if a citizen’s situation only resolves against institutional-practice-tier knowledge, the screener should route them to a human caseworker consultation rather than presenting an automated screening result, given the lower confidence and auditability of that tier. 

**Zhang:** That’s a meaningfully more conservative design than a system that just uses whatever knowledge it has. 

**EAA:** Deliberately so — given the due-process stakes Robert Chen raised in Week 1, I think it’s the right tradeoff to accept reduced automation coverage on the genuinely ambiguous cases rather than present a citizen with a confident-sounding automated answer built on undocumented institutional practice that might not hold up if challenged. 

## **6.2 AI/Platform Architecture — Whiteboard Session, Week 10** 

**Platform Architect (Sam Ito):** Walk through the citizen-facing screener end to end. 

**EAA:** [at whiteboard] Citizen answers a structured intake — household composition, income sources, program of interest — through a plain-language, multi-lingual interface. The Screening Agent queries the Benefits Rules Knowledge Graph, restricted to the top two provenance tiers per Section 6.1, and produces a preliminary eligibility indication — “likely eligible,” “likely not eligible based on [specific, cited factor],” or “recommend speaking with a caseworker” for anything ambiguous or graph-uncertain. Critically, this is explicitly framed to the citizen as a preliminary screening tool, not a determination — legally accurate language reviewed and approved by Chen’s office, not just plain-language-friendly phrasing the engineering team came up with independently. 

**Delacroix (CIO):** And the explanation of a “likely not eligible” result — that’s where the fairness audit finding eventually landed, correct? 

**EAA:** Correct, and I want to be transparent about this in the architecture documentation itself, not just in the postmortem, given how central it became. The initial design generated explanations via a single, general-purpose drafting agent producing what we assumed was clear plain language. The gap the fairness audit found (Section 14) was that “clear” wasnate assessed against the actual target population’s comprehension, particularly for nonnative English speakers and citizens with lower health/benefits literacy — and the fix required a fundamentally different explanation-generation and testing approach, not just a wording tweak. 

## **6.3 Security & Identity Architecture** 

- Security architecture modeled on FedRAMP Moderate baseline controls, given the federal program data involved, with a formal Authorization to Operate (ATO) process run jointly with the state’s own IT security office and reviewed against federal partner (USDA for SNAP, CMS for Medicaid) requirements flowing down through the state’s federal funding agreements 

- Citizen identity verification integrated with Meridian’s existing state identity-verification service (used for other e-government services), avoiding a new, parallel identity system 

- Strict data minimization: the Screening Agent’s preliminary intake data was designed to not persist beyond the screening session unless the citizen explicitly proceeded to a full application, given both privacy-bydesign principles and the digital-trust concerns Reyes-Martinez raised in Week 1 

- Caseworker copilot operates within the department’s existing case-management system’s access-control boundary, with no new data-access pathway created beyond what the copilot needs for its specific document-review and drafting-assistance function 

**6.4 Integration & API Strategy** 

- MCP server exposing the Benefits Rules Knowledge Graph (with provenance-tier metadata) as a queryable tool consumed by both the citizen-facing Screening Agent and the internal Caseworker Copilot — a shared knowledge layer, consistent with the pattern used in the banking and healthcare engagements, ensuring citizens and caseworkers were never working from inconsistent rule interpretations Federal Rule-Change Monitoring Agent: tracks known federal policy bulletin sources (USDA SNAP policy memos, CMS Medicaid guidance) for changes, flags affected knowledge-graph entries, and drafts proposed updates for mandatory human policy-office review before any graph change goes live — directly modeled on the banking engagement’s payer-policy-monitoring pattern, adapted to federal benefits policy sources Integration with the department’s legacy case-management system via a narrow, read/limited-write API scoped specifically to the copilot’s document-review and draft-assembly function, preserving the system of record’s existing determination-authority workflow unchanged 

# **7. Technical Debates** 

## **7.1 Multi-Lingual Support Architecture** 

**ML Engineer (Devon Park):** Given the target population’s language diversity — the state’s data shows meaningful populations speaking Spanish, Vietnamese, and Haitian Creole in addition to English — do we build native multi-lingual generation, or translate a single English-generated explanation? 

**EAA:** I’d push for native-language generation over translation-of-English-output, and I want to walk through why given it’s a more expensive architectural choice. Machine translation of a plain-language legal/benefits explanation risks losing exactly the kind of nuance and cultural/contextual clarity that determines whether a real person actually understands their situation — which is precisely the failure mode the Week 4 usability finding surfaced even in English. I’d rather the Screening Agent generate explanations natively in the citizen’s selected language, grounded in the same knowledge-graph facts, with each language’s explanation independently validated through usability testing with native speakers of that specific language and population — not validated once in English and assumed to transfer via translation. 

**Park:** That’s a substantially larger testing and validation burden across four languages instead of one. 

**EAA:** It is, and I think that cost is justified given what’s at stake for a citizen who might otherwise give up on a benefit they’re entitled to, per Reyes-Martinez’s framing in Week 1. This became directly relevant to the prelaunch fairness audit finding, and in retrospect I’d say we underinvested in exactly this kind of per-language, perpopulation validation before that formal audit caught it — a point the postmortem addresses directly. 

## **7.2 Should the Rules-Monitoring Agent Auto-Apply Federal Updates?** 

**Alcala (caseworker, Week 16):** Federal rule changes sometimes come with tight compliance deadlines. Could the monitoring agent auto-update the knowledge graph for federal changes specifically, given they’re not really Meridian’s own policy discretion? 

**EAA:** I understand the time-pressure motivation, but I’d resist full automation here for a reason specific to this domain: federal policy bulletins, even when clearly binding, often require state-level implementation guidance to resolve ambiguity in exactly how a federal rule interacts with Meridian’s existing state supplemental provisions — that interaction is exactly the kind of judgment call that shouldn’t be automated even under time pressure. I’d recommend the same human-review gate as the banking and healthcare engagements’ policy-monitoring agents, but with an expedited review SLA specifically for federal-compliance-deadline-driven changes, so urgency is handled through process speed, not through removing the human review step itself. 

**Delacroix:** That’s consistent with how our policy office already prioritizes urgent federal guidance today — I’d support an expedited-review lane rather than full automation. 

## **7.3 Evaluation Strategy Debate — Fairness and Accessibility** 

**Reyes-Martinez (Legal Aid, Week 20, joining a technical evaluation-strategy session at the EAA’s invitation):** I want to push on something. Standard accuracy metrics will tell you whether the eligibility determination is technically correct. They won’t tell you whether a real person in our client population actually understood and could act on the result. 

**EAA:** Agreed, and I think this needs to be a formally separate evaluation dimension, not folded into general “quality” metrics where it could get averaged away by strong performance on determination accuracy. I’d propose a **comprehension and actionability** evaluation track — structured usability testing with representative population samples, per language, measuring not just “was the determination correct” but “did the participant correctly understand what they should do next,” run as a mandatory pre-launch gate with defined pass criteria, not just a post-launch feedback mechanism. 

**Reyes-Martinez:** That’s the right framing. I’d want Legal Aid Society involvement in defining what “actionable” means for this specific population, not just DHS or the vendor team defining it internally. 

**EAA:** Agreed, and I’d recommend that formally — external stakeholder involvement in defining the evaluation criteria for exactly this dimension, given DHS and our team, however well-intentioned, don’t have lived experience of navigating this system as a client. 

This evaluation-strategy addition, while established in Week 20, was not yet fully operationalized with the rigor the Week 4 finding and this discussion implied it should have — a gap the formal pre-launch fairness audit (Section 14) subsequently surfaced more systematically. 

# **8. Executive Reviews** 

## **8.1 State IT Governance Review — Week 24** 

**State IT Governance reviewer:** Walk me through your security authorization status and your plan for the mandatory public comment period. 

**EAA:** Security authorization is in progress against the FedRAMP Moderate-modeled baseline (Section 6.3), targeting completion by Month 8. On public comment — Meridian’s administrative procedure requirements for this kind of citizen-facing government system trigger a formal comment period; we’re building the commentperiod timeline into the delivery roadmap as a hard dependency, not something to compress under schedule pressure, given the legal risk of a procedurally deficient rollout. 

**Reviewer:** And your explainability posture for public records requests? 

**EAA:** The Benefits Rules Knowledge Graph, including provenance tiers, is designed to be a state-owned, disclosable artifact — not a vendor trade secret — specifically because we anticipate public records requests given the political sensitivity Commissioner Whitfield described in Week 1. The underlying LLM components’ weights and training are not disclosable in the same way, but the actual rules being applied to citizens are fully transparent and auditable, which I’d recommend proactively publishing in some form rather than waiting for a records request to force the issue. 

**Whitfield:** I like that framing for the legislative testimony — “the rules are public, we’re not hiding behind a black box.” 

## **8.2 Pre-Launch Fairness Audit Review — Week 34 (see Section 14)** 

**Chen (General Counsel), reviewing the audit findings with the full team:** The audit is clear that determination accuracy is not the problem — it’s explanation comprehension, specifically for non-native English speakers. I need to understand whether this is fixable in a reasonable timeframe or whether we’re looking at a fundamental redesign. 

**EAA:** Based on the audit’s detailed findings, I believe this is fixable without a fundamental redesign, but it does require real additional work, not a quick patch. The core determination logic and knowledge graph are sound — the audit didn’t find bias or inaccuracy in the underlying determinations themselves, which is the more serious finding it could have been. What it found is that our explanation-generation approach, even in native-language generation per ADR-004, wasn’t adequately validated against real comprehension outcomes for the specific populations most affected, essentially confirming and systematizing what the Week 4 informal finding hinted at but that we didn’t follow up on with sufficient rigor at the time. 

**Whitfield:** I want a straight answer — do we delay launch? 

**EAA:** Yes, and I’d recommend that directly rather than looking for a way to avoid it. I’d estimate roughly ten weeks for a redesigned explanation-generation approach plus the population-specific usability validation the audit’s own recommendations call for. I think that delay is the right call given what’s at stake for citizens who might otherwise receive a technically correct but practically incomprehensible answer about benefits they need. 

**Reyes-Martinez:** I want to say, for the record, that I appreciate the team not trying to minimize this finding or launch around it. That’s not always how this goes with government technology vendors. 

# **9. Final Architecture** 

- **Benefits Rules Knowledge Graph** : structured, versioned, provenance-tiered (statutory/regulatory, official policy bulletin, institutional practice) representation of eligibility rules across SNAP, Medicaid, TANF, and state energy-assistance programs; designed as a state-owned, publicly disclosable artifact 

- **Citizen-Facing Screening Agent** : native multi-lingual (English, Spanish, Vietnamese, Haitian Creole) preliminary eligibility screening, restricted to top-two-tier knowledge graph facts, routing lower-confidence cases to human caseworker consultation rather than presenting an automated result 

- **Redesigned Explanation-Generation Layer** (post-audit, Section 14.3): population-validated, per-language explanation templates with defined comprehension/actionability testing as an ongoing quality gate, not a one-time validation 

- **Caseworker Document-Review Copilot** : assists with document review and eligibility-determinationdrafting evidence assembly within the existing case-management system’s access boundary; human caseworker retains all determination authority and accountability 

- **Federal Rule-Change Monitoring Agent** : tracks known federal policy sources, flags and drafts proposed knowledge-graph updates, with mandatory human policy-office review (expedited-lane available for compliance-deadline-driven changes) 

- Security architecture modeled on FedRAMP Moderate baseline, formal state ATO process completed prior to launch 

- Explicit organizational and architectural separation from the department’s fraud-detection/program-integrity function 

# **10. Delivery Roadmap** 

|**Phase**|**Duration**|**Scope**|
|---|---|---|
|Discovery & Procurement Completion|Months 1–3|Discovery, state procurement process,<br>State IT Governance engagement|
|Knowledge Graph & Security<br>Authorization Build|Months 3–7|Rules knowledge graph, FedRAMP-<br>modeled ATO process|
|Screener & Copilot Build|Months 4–8 (overlapped)|Citizen screener, caseworker copilot|
|Public Comment Period|Months 7–8 (overlapped with build)|Statutory administrative procedure<br>requirement|
|Pre-Launch Fairness Audit|Month 8|Formal audit, finding on explanation<br>comprehension (Section 14)|
|Remediation & Re-Validation|Months 8–10.5|Explanation-generation redesign,<br>population-specific usability testing|
|Public Launch|Month 11|System-wide rollout across 43 county<br>field offices|

# **11. Risks** 

|**Risk**|**Likelihood**|**Impact**|**Mitigation**|**Owner**|
|---|---|---|---|---|
|Explanation<br>comprehension gap for<br>non-native/low-literacy<br>populations|Medium (realized —<br>Section 14)|High|Redesigned explanation<br>layer, mandatory per-<br>language usability<br>validation gate|Legal Aid Society<br>(external) / Program<br>Team|
|Due-process/legal<br>challenge to any<br>perceived automated<br>determination|Low (post non-<br>decisioning design)|Very High|Strict non-decisioning<br>architecture, legally<br>reviewed language<br>throughout|General Counsel|
|Federal rule-change<br>compliance-deadline<br>miss|Low|High|Expedited-review lane<br>for compliance-driven<br>knowledge graph<br>updates|Policy Office|
|Public records<br>disclosure of vendor-<br>sensitive components|Low (post<br>transparency-by-design<br>approach)|Medium|State-owned,<br>disclosable rules<br>knowledge graph; clear<br>disclosable/non-<br>disclosable component<br>boundary|General Counsel / IT<br>Governance|
|Security authorization<br>delay affecting launch<br>timeline|Medium|Medium|ATO process initiated<br>early, run in parallel<br>with build, not<br>sequenced after|CISO-equivalent (State<br>IT Security)|

# **12. Governance Model** 

- **Strict non-decisioning architecture** : no automated eligibility determination, ever — a constitutional/dueprocess-grounded requirement, not a discretionary design choice, with legal review of all citizen-facing language 

- **Mandatory comprehension/actionability evaluation gate** : formalized post-audit as a standing prelaunch and ongoing requirement for any citizen-facing explanation content, with external stakeholder (Legal Aid Society) involvement in defining evaluation criteria 

- **Expedited federal-compliance-deadline review lane** : preserves human review while accommodating time pressure, rather than removing the review step 

- **Transparency-by-design** : rules knowledge graph designed as a publicly disclosable artifact from the outset, not retrofitted in response to records requests 

- **Organizational separation from fraud-detection/program-integrity function** , maintained architecturally, not just by policy statement 

# **13. Production Rollout** 

Public launch occurred in Month 11, roughly ten weeks later than the original Month 8.5 target, entirely attributable to the fairness-audit-driven remediation described in Section 14 rather than technical delivery issues. Rollout proceeded across all 43 county field offices simultaneously (rather than phased, per Whitfield’s preference given the statewide legislative visibility of the backlog issue), with the caseworker copilot’s rollout preceding the citizen-facing screener’s public launch by several weeks to allow caseworker familiarization ahead of the anticipated public-facing volume increase. 

# **14. Pre-Launch Finding — Month 8 (Fairness Audit)** 

## **14.1 Finding Summary** 

As a condition of Commissioner Whitfield’s executive sign-off for public launch, DHS commissioned an independent fairness audit (conducted by a university-affiliated public policy research center, at Chen’s recommendation, specifically to have credibility independent of the vendor team) examining the Screening Agent’s outputs across demographic and linguistic subgroups. The audit’s core finding: the underlying eligibility _determinations_ showed no statistically significant disparate accuracy across demographic groups — the knowledge-graph-grounded logic was sound and consistent. However, structured comprehension testing found that citizens who selected non-English language options, and citizens with lower self-reported health/benefits literacy regardless of language, were significantly less likely to correctly identify their next required action after receiving a “likely not eligible” or “recommend speaking with a caseworker” result, compared to English-primary, higher-literacy participants — despite the native-language generation architecture (ADR-004) that had been specifically designed to address this class of risk. 

## **14.2 Response Transcript** 

**Delacroix (reviewing the audit with the full team):** I want to understand why the native-language generation architecture — which was specifically designed to address exactly this concern — didn’t fully solve it. 

**EAA:** The honest answer, based on the audit’s detailed methodology, is that native-language generation solved the _linguistic_ translation-fidelity problem it was designed for — the explanations are grammatically and semantically accurate in each language — but comprehension and actionability turned out to depend on more than linguistic accuracy. The audit’s qualitative interviews found that explanations, even when linguistically clear, often used a structure and level of assumed familiarity with bureaucratic/benefits-system concepts that didn’t match how the target population actually processes this kind of information — for example, assuming a reader understands what “recommend speaking with a caseworker” concretely means in terms of next steps, versus needing that spelled out explicitly. 

**Reyes-Martinez:** This tracks with what our clients have told us for years about government communications generally, honestly — it’s not usually about literal translation quality, it’s about whether the communication meets people where they actually are. 

**EAA:** That’s a useful and humbling framing, and I think it points to a real gap in how we validated the Week 7.1 architecture decision — we tested translation fidelity and had informal usability signal from Week 4, but we didn’t build the more rigorous, population-specific comprehension/actionability testing (which we discussed conceptually in Week 20) into the actual pre-launch process with enough weight before this formal audit forced the issue. That’s a process gap I’d own directly, not attribute to the underlying architecture being wrong. 

### **Whitfield:** What’s the fix, concretely? 

**EAA:** Redesigned explanation templates, co-developed with Reyes-Martinez’s organization and with structured input from representative community members in each target population — not just translated by the engineering team and validated after the fact, but built collaboratively from the start with people who understand how the target population actually processes this kind of communication. Then formal, statistically powered comprehension testing per language and literacy segment as a mandatory pass/fail gate before this component of the system launches. 

## **14.3 Remediation** 

The explanation-generation layer was rebuilt over the following ten weeks in direct collaboration with the Legal Aid Society and community organizations serving each target linguistic population, restructuring explanations around concrete, explicit next-step guidance rather than assuming bureaucratic-system familiarity, and validated through structured comprehension testing meeting a pre-agreed statistical threshold before launch proceeded. This testing protocol, plus the population-collaborative design process, was formalized as a permanent, ongoing requirement (not a one-time pre-launch gate) — any future material change to explanation templates would require the same validation process. 

# **15. Lessons Learned** 

1. **A technically sound, well-intentioned architectural mitigation (native-language generation) can still fall short of its actual goal if the validation methodology doesn’t match the real-world outcome that matters.** The team correctly identified translation fidelity as a risk and correctly built nativelanguage generation to address it — but validated against the wrong proxy (linguistic accuracy) rather than the outcome that actually mattered (citizen comprehension and ability to act). Future citizen-facing systems in this domain should define the actual target outcome precisely, and validate against that outcome directly, rather than against a plausible-seeming proxy. 

2. **Informal early signal (the Week 4 usability finding) that isn’t followed up with sufficient rigor can create false confidence that a risk has been “addressed” when it’s only been noted.** The team’s own postmortem was direct about this: Week 4 surfaced a version of the eventual finding, Week 20 discussed the right evaluation approach conceptually, but neither was operationalized with the weight the risk deserved before the formal audit forced the issue. The recommendation was to treat early qualitative signal as requiring proportionate follow-through, not just acknowledgment. 

3. **External, independent stakeholder involvement — both in defining evaluation criteria (ReyesMartinez’s Week 20 involvement) and in conducting the actual audit (the university research center’s independence from the vendor team) — was what actually caught this finding before public launch.** The postmortem was explicit that a vendor-only quality process, however well-intentioned, may not have applied the same rigor or asked the same questions as external stakeholders with direct experience of the client population’s needs. This became a standing recommendation for any future citizenfacing government AI system: build in independent, population-representative audit capacity from the start, not as an afterthought. 

# **16. Enterprise Architecture Artifacts** 

- **Capability Map** : citizen self-screening and caseworker support value chains with AI-opportunity overlay (Section 5.4) 

- **Benefits Rules Knowledge Graph schema** , with provenance-tier documentation, published in a publicfacing form per the transparency-by-design principle 

- **Comprehension/Actionability Evaluation Protocol** (post-audit artifact): the formalized, statisticallypowered testing methodology developed collaboratively with the Legal Aid Society and community organizations 

- **Security Authorization documentation** (FedRAMP Moderate-modeled ATO package) 

- **Disclosable/Non-Disclosable Component Boundary documentation** , prepared jointly with General Counsel for public records compliance 

# **17. Architecture Decision Records (ADRs)** 

**ADR-001: System is strictly non-decisioning; all eligibility determinations remain human caseworker authority, preserving existing due-process and appeal rights.** Status: Accepted, foundational, non-negotiable per due-process law. 

**ADR-002: Benefits Rules Knowledge Graph encodes explicit provenance tiers (statutory/regulatory, official policy bulletin, institutional practice); citizen-facing screener restricted to top two tiers, routing lower-confidence cases to human consultation.** Status: Accepted. See Section 6.1. 

**ADR-003: Federal rule-change monitoring agent flags and drafts proposed updates only; human policyoffice review required for all knowledge graph changes, with an expedited lane for compliancedeadline-driven changes.** Status: Accepted. See Section 7.2. 

**ADR-004: Native multi-lingual explanation generation (not translation of English output) for citizenfacing screening results.** Status: Accepted; found insufficient on its own to ensure comprehension, requiring the post-audit remediation in ADR-006. 

**ADR-005: Benefits Rules Knowledge Graph is a state-owned, publicly disclosable artifact by design, distinct from non-disclosable vendor model components.** Status: Accepted. See Section 8.1. 

**ADR-006 (post-audit): Explanation-generation layer redesigned collaboratively with external population-representative stakeholders, validated through mandatory, statistically-powered comprehension/actionability testing as a permanent, ongoing quality gate.** Status: Accepted, ten-week remediation completed prior to public launch. 

**ADR-007: Explicit organizational and architectural separation between this eligibility-assistance platform and the department’s fraud-detection/program-integrity function.** Status: Accepted, foundational per trust-building goals established in discovery. 

# **18. AI Evaluation Strategy** 

- **Determination accuracy** : measured against caseworker-validated ground truth, stratified by program and demographic subgroup, monitored on an ongoing basis for any emergent disparate-accuracy pattern (the audit found none, but ongoing monitoring was formalized regardless) **Comprehension and actionability** (post-audit, elevated to mandatory permanent gate): structured, statistically-powered usability testing per language and literacy segment, with pass/fail criteria co-defined with the Legal Aid Society, required before launch of any material explanation-template change **Knowledge graph currency** : monitored freshness against known federal and state policy source updates, with expedited-lane SLA tracking for compliance-deadline-driven changes **Caseworker copilot document-review accuracy** : measured against caseworker-validated ground truth, tracked separately by document type and program 

# **19. Operational Runbook** 

- **Federal rule-change response procedure** : defined escalation and expedited-review SLA for compliancedeadline-driven updates, distinguishing from routine policy-office review cadence for non-urgent changes **Comprehension-testing re-validation procedure** : mandatory trigger for any material explanationtemplate or knowledge-graph-provenance-tier-boundary change, per ADR-006 **Public records request response procedure** : defined process for responding to records requests against the disclosable/non-disclosable component boundary established with General Counsel **County field office escalation path** : procedure for caseworkers to flag knowledge-graph gaps or ambiguities encountered in practice, feeding back into the policy office’s review queue 

# **20. Future Roadmap** 

1. **Expansion to additional benefit programs** beyond the initial SNAP/Medicaid/TANF/energy-assistance scope, contingent on knowledge-graph extension and, per the lessons of this engagement, proportionate comprehension-testing investment for any newly added program’s citizen-facing content — not assumed to inherit validation from the initial launch. 

2. **Additional language support** beyond the initial four languages, prioritized by Meridian’s demographic data and pursued through the same collaborative, population-validated design process established in the post-audit remediation, not a faster/cheaper translation-only approach. 

3. **Caseworker copilot expansion** to additional case types beyond the initial pilot scope, contingent on continued accuracy monitoring. 

4. **Standing independent-audit capacity** : Commissioner Whitfield’s office has proposed formalizing an ongoing (not just pre-launch) relationship with the university research center or a similar independent body for periodic re-audits, given the value the pre-launch audit demonstrated — under discussion as a budget item for the following fiscal year, not yet committed. 

5. **Cross-agency reuse** : Meridian’s state CIO office has expressed interest in the Benefits Rules Knowledge Graph and comprehension-testing methodology as a reference pattern for other state agencies’ citizenfacing AI systems — a candidate for a separate, distinct engagement given each agency’s different populations and statutory context.
