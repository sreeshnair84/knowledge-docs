---
title: "Case Study"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "07_pharma.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
last_reviewed: 2026-07-10
---

# **Case Study** 

Vireon Therapeutics — R&D Literature Intelligence & Regulatory Submission Copilot 

Confidential Internal Engagement Documentation 

Engagement Period: June 2025 – May 2026 

|1. Executive Summary|
|---|
|2. Client Background|
|3. Business Problem|
|4. Constraints|
|5. Discovery Transcript|
|5.1 Kickoff—Week 1|
|5.2 R&D Scientist Shadowing—Week 3|
|5.3 Medical Writer Shadowing—Week 4|
|5.4 Capability Mapping and ROI—Week 5|
|6. Architecture Workshops|
|6.1 Data & Information Architecture|
|6.2 AI/Platform Architecture—Whiteboard Session, Week 10|
|6.3 Security & Identity Architecture|
|6.4 Integration & API Strategy|
|7. Technical Debates|
|7.1 Should the Literature-Intelligence Agent Have Live Web Search Access?|
|7.2 Citation Resolution—Exact Match vs. Fuzzy Match|
|7.3 Evaluation Strategy Debate|
|8. Executive Reviews|
|8.1 Quality Assurance / GxP Validation Review—Week 20|
|8.2 CSO/Regulatory Executive Review—Week 28|
|8.3 Post-Incident Executive Review—Week 39 (see Section 14)|
|9. Final Architecture|
|10. Delivery Roadmap|
|11. Risks|
|12. Governance Model|
|13. Production Rollout|
|14. Production Incident—Month 9|
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

Vireon Therapeutics, a mid-size pharmaceutical company with three approved therapies and a twelve-compound clinical pipeline, engaged an Enterprise AI Architecture team to build an integrated platform spanning scientific literature intelligence for R&D and drafting support for regulatory submissions to the FDA and EMA. The mandate came directly from Vireon’s Chief Scientific Officer and Head of Regulatory Affairs, both frustrated by the same underlying problem from different angles: the company’s scientific and regulatory knowledge was scattered across tens of thousands of papers, internal study reports, and prior submission documents, with no systematic way to retrieve and synthesize it reliably. 

The twelve-month engagement delivered a literature-intelligence agent for R&D scientists performing systematic literature reviews, and a regulatory-submission drafting copilot assisting medical writers in assembling Common Technical Document (CTD) submission sections — both built on a scientific knowledge graph and operating under GxP (Good Practice) computer system validation requirements, given that submission-supporting systems fall within FDA’s expectations for validated computerized systems. 

The engagement’s defining event was a near-miss nine months in: during preparation of a regulatory submission’s clinical overview section, the drafting copilot generated a citation to a supporting study that, upon verification by a second medical writer performing mandatory citation cross-checking, did not exist in the form cited — the citation combined real elements (a real journal, a real set of authors who had published together previously, a plausible-sounding title) into a reference that did not correspond to any actual publication. The fabricated citation was caught before the submission left Vireon’s internal review process, but it triggered an immediate, comprehensive audit of all AI-assisted content in submissions then in preparation, and a fundamental redesign of the system’s citation-generation architecture. 

Key outcomes: - Literature review cycle time for new target validation reduced from an average of 6 weeks to 10 days for systematic reviews using the tool - Regulatory submission section first-draft turnaround reduced by approximately 55% for in-scope CTD sections - One material near-miss (fabricated citation, Month 9) caught by existing mandatory cross-checking process before reaching a real submission, triggering architectural redesign of citation generation - Zero fabricated citations reaching an actual FDA/EMA submission — the mandatory human verification process, hardened post-incident, held throughout 

# **2. Client Background** 

Vireon Therapeutics operates a 40-person R&D scientific staff and a 25-person regulatory affairs and medical writing organization, supporting an active pipeline that included two compounds in Phase 3 trials during the engagement period — meaning regulatory submission activity was not a hypothetical future need but an active, high-stakes, near-term deliverable throughout the engagement. 

Vireon’s Chief Scientific Officer, Dr. Amara Osei (no relation to other engagements’ similarly-named individuals — a coincidence noted internally during the engagement), and Head of Regulatory Affairs, Dr. Jonathan Reyes, cosponsored the engagement. Vireon’s General Counsel, Patricia Lindqvist, was closely involved throughout given both the trade-secret sensitivity of unpublished internal research and the legal exposure of any inaccuracy in regulatory submission content. 

# **3. Business Problem** 

**Literature intelligence.** Vireon’s R&D scientists, when evaluating a new drug target or mechanism, needed to systematically review the existing scientific literature — a process that discovery found took an average of six weeks for a thorough review, during which a scientist manually searched databases (PubMed, proprietary literature aggregators), read and synthesized findings across dozens or hundreds of papers, and tried to identify both supporting and contradicting evidence. Vireon had lost time on at least one occasion, per Dr. Osei’s account, to a target-validation effort that could have been redirected earlier had a contradicting finding buried in a lessprominent journal been surfaced sooner. 

**Regulatory submission drafting.** Medical writers assembling CTD submission sections synthesized clinical trial data, nonclinical study reports, and supporting literature into the standardized document structure FDA and EMA require. This process was manual, document-heavy, and constrained by an unforgiving deadline structure — submission timelines are often externally fixed (tied to trial completion or regulatory meeting dates), meaning schedule pressure on medical writers was a persistent, real condition, not a hypothetical risk factor. 

# **4. Constraints** 

1. **GxP computer system validation.** Any system supporting activities that feed into a regulatory submission fell within the scope of FDA’s expectations for validated computerized systems (21 CFR Part 11 and associated GxP guidance) — requiring formal validation documentation, change control, and audit trail capabilities considerably more rigorous than typical enterprise software validation. 

2. **Trade secret and IP protection.** Vireon’s unpublished internal research, study data, and strategic pipeline information were highly sensitive trade secrets; General Counsel required that no such data be processed by any external LLM provider without contractual guarantees at least as strong as those the banking engagement required for borrower financial data, and ideally stronger given the competitive stakes of pipeline information leaking. 

3. **Citation and evidentiary accuracy.** Any citation appearing in R&D literature synthesis or regulatory submission content had to be verifiably accurate — not just plausible-sounding — given both scientific integrity norms and the direct regulatory and legal consequences of inaccurate content in an FDA/EMA submission. 

4. **Human medical writer accountability.** Consistent with the non-decisioning pattern established in other regulated engagements, no AI-generated content could enter a regulatory submission without a credentialed medical writer’s review and the existing multi-person submission quality-control process — including, critically, Vireon’s pre-existing mandatory citation cross-checking step, a process that predated this engagement and proved directly responsible for catching the Month 9 incident. 

5. **Active, time-pressured pipeline.** With two compounds in Phase 3 during the engagement, the regulatorysubmission-facing components of the platform had to be built and validated without disrupting active submission timelines — a scheduling constraint that shaped the phased rollout approach (Section 10). 

6. **Multi-jurisdictional submission format differences.** FDA and EMA submission requirements, while both based on the ICH Common Technical Document structure, had meaningful format and content differences requiring the system to handle both, not just a single regulatory jurisdiction’s format. 

# **5. Discovery Transcript** 

## **5.1 Kickoff — Week 1** 

_Present: Dr. Amara Osei (CSO), Dr. Jonathan Reyes (Head of Regulatory Affairs), Patricia Lindqvist (General Counsel), the Enterprise AI Architect (EAA)._ 

**Osei:** My scientists are drowning in literature. Every target validation effort requires reading an enormous and growing body of published research, and the tools they have — basically PubMed search plus manual note-taking — haven’t kept pace with the volume. I need something that helps them synthesize faster without cutting corners on rigor, because a missed contradicting finding isn’t just inefficient, it can send a program down a dead end for months before we find out. 

**EAA:** That’s a genuinely different risk profile than a pure literature-summarization convenience tool, and I want to design for it as such. I’d propose the literature-intelligence agent is explicitly built to surface _both_ supporting and contradicting evidence for any given hypothesis or claim a scientist is investigating — not just retrieve relevant papers, but actively characterize where the literature agrees and where it conflicts, which is a more demanding synthesis task than simple retrieval. 

**Reyes:** On the regulatory side, my medical writers are good at their jobs, but assembling a CTD section means pulling together clinical data, nonclinical reports, and supporting literature into an extremely specific, standardized structure, under deadlines we don’t control — FDA meeting dates, trial completion timelines. I need this to make that assembly faster without introducing any new risk to submission accuracy. I want to be very direct: an inaccuracy in a regulatory submission is not like a typo in an internal memo. It can trigger a Refusal to File, a clinical hold, or worse. 

**Lindqvist:** And I need every AI-generated claim in submission content to be traceable to an actual, verifiable source — not just “this sounds right based on the model’s training.” Given what’s at stake, I’d rather have a slower process that’s provably accurate than a fast one I can’t fully vouch for. 

**EAA:** That’s exactly the design principle I’d propose leading with, and I want to name a specific risk directly and early, because I think it’s the central technical challenge of this engagement: large language models can generate citations that are stylistically and structurally indistinguishable from real ones — plausible author names, plausible journal titles, plausible-sounding findings — without those citations corresponding to any actual publication. This is a well-documented failure mode, not a hypothetical edge case, and I’d rather build the citationgeneration architecture assuming this risk from day one than discover it the hard way in production. 

**Reyes:** We already have a mandatory second-writer citation cross-check on every submission section, regardless of whether AI is involved — that’s existed for years as a quality control measure. 

**EAA:** That existing process is genuinely valuable context, and I want to be clear that I’m not proposing we rely on it as the _only_ safeguard — architecturally, I want to minimize the chance a fabricated citation is ever generated in the first place, with your existing cross-check process as a second, independent layer of defense, not the primary control. Belt and suspenders, given what’s at stake. 

## **5.2 R&D Scientist Shadowing — Week 3** 

**Research Scientist (Dr. Kwame Boateng, target validation team):** For this new target, I’m trying to build a complete picture — mechanism papers, any prior clinical failures involving this pathway, competitive intelligence on which companies are also pursuing it. Right now I’m manually building a spreadsheet of maybe 200 papers, and honestly, I know I’m missing some — the search terms that surface the “this pathway failed in a related indication” papers aren’t always the same search terms that surface the “this pathway looks promising” papers, so my search strategy itself has a blind spot. 

**EAA:** How would you characterize the difference between a good literature review and a merely thorough one, in your own practice? 

**Boateng:** A good one actively looks for reasons the hypothesis might be wrong, not just evidence it might be right. That’s the discipline that’s hardest to maintain when you’re excited about a promising target and reading hundreds of papers under time pressure. 

This session directly shaped the design principle behind the literature-intelligence agent’s **structured evidencecharacterization** approach (Section 6.2) — actively prompting for and surfacing contradicting evidence as a first- 

class output, not an afterthought, addressing the exact cognitive-bias risk Boateng described. 

## **5.3 Medical Writer Shadowing — Week 4** 

**Medical Writer (Sarah Chen, no relation to other engagements’ Chens):** For the clinical overview section, I’m synthesizing efficacy and safety findings across multiple trials, cross-referencing supporting literature for context on the therapeutic area, and writing it all into an extremely specific ICH-structured format. The actual writing isn’t the bottleneck — it’s the assembly and verification of every single factual claim and citation, which for a typical clinical overview might mean fifty to eighty individual citations, each of which I need to trust completely. 

**EAA:** Walk me through your current citation verification process. 

**Chen:** I pull the citation, a second writer independently verifies it exists and says what I claim it says, and we both sign off before it goes into the submission. It’s slow, but it’s non-negotiable given what’s at stake. 

This existing process — independent verification by a second qualified medical writer — is the control that proved decisive in the Month 9 incident, and the team explicitly designed the drafting copilot’s output format to make this existing verification process _easier and faster_ , not to replace or shortcut it, described further in Section 6.2. 

## **5.4 Capability Mapping and ROI — Week 5** 

|**Capability**|**Current State**|**AI Opportunity**|**Impact**|**Feasibility**|
|---|---|---|---|---|
|Systematic literature<br>review|Manual, search-<br>strategy-dependent|Literature-intelligence<br>agent with structured<br>evidence<br>characterization|Very High|Medium|
|Regulatory submission<br>drafting|Manual assembly,<br>existing mandatory<br>citation cross-check|Grounded drafting<br>copilot, citation-<br>verification-optimized<br>output|High|Medium|
|Competitive<br>intelligence monitoring|Manual, ad hoc|Deferred to phase 2 —<br>distinct stakeholder<br>group (business<br>development), separate<br>scoping needed|Medium|Medium|
|Regulatory<br>determination /<br>submission strategy|Human expert<br>judgment|Explicitly out of scope<br>— remains human, non-<br>negotiable|N/A|N/A|
|Clinical trial data<br>analysis|Existing separate<br>biostatistics function|Out of scope — mature<br>function, different<br>governance model|Low|N/A|

# **6. Architecture Workshops** 

## **6.1 Data & Information Architecture** 

**Enterprise Data Architect (Grace Lin):** How do we structure the scientific knowledge underlying both the literature-intelligence agent and the drafting copilot? 

**EAA:** I’d propose a **Scientific Evidence Knowledge Graph** distinct in kind from the policy-manual-style knowledge graphs I’ve built in other regulated engagements — this one needs to represent not just facts but _evidentiary relationships_ : which findings support or contradict which hypotheses, the strength and type of each piece of evidence (in vitro, in vivo, clinical, meta-analysis), and critically, a verified linkage to the actual source publication’s persistent identifier (DOI or equivalent), not just a text description that could drift from the actual source. 

**Lin:** How does that verified-linkage requirement actually get enforced technically? 

**EAA:** This is the core of the citation-integrity architecture, and I want to be precise about it given how central it became after the Month 9 incident. Every entry in the knowledge graph representing a literature finding is created through an ingestion pipeline that resolves against an authoritative external bibliographic database (PubMed/MEDLINE, CrossRef) at ingestion time — the graph never contains a citation that wasn’t independently verified to exist in that authoritative source at the moment of ingestion. The literature-intelligence agent and drafting copilot can only cite findings that are already in the graph; they cannot generate a novel citation on the fly. That’s the architectural principle intended to prevent fabrication at the source, though — and this is exactly what the Month 9 incident revealed a gap in — the principle’s implementation had a boundary case, described in Section 14. 

## **6.2 AI/Platform Architecture — Whiteboard Session, Week 10** 

**Platform Architect (Sam Ito):** Walk through the literature-intelligence agent’s actual workflow. 

**EAA:** [at whiteboard] Scientist poses a research question — say, evaluating a specific target’s viability given known prior clinical outcomes in related pathways. The agent decomposes this into a structured search strategy across the ingested, verified knowledge graph plus a live-search capability against PubMed/MEDLINE for very recent publications not yet processed into the graph. Critically, per the Boateng shadowing finding, the agent is explicitly prompted and structured to produce two parallel evidence syntheses — supporting findings and contradicting findings — rather than a single blended synthesis that risks unconsciously favoring the more prominent or more numerous supporting evidence. 

**Ito:** And for the drafting copilot? 

**EAA:** Same citation-integrity backbone, different output shape. The Drafting Agent assembles CTD section content, but every factual and citation claim is inserted via a resolved reference to a specific, graph-verified knowledge-graph entry — similar in principle to the banking engagement’s numeric-grounding architecture, adapted here to citation grounding instead of financial figures. Critically, given Chen’s Week 4 description of the existing verification workflow, I’d propose the drafting copilot’s output format explicitly surfaces each citation with a direct link back to the verified source and the specific supporting excerpt, formatted specifically to make the existing mandatory second-writer verification process faster, not to imply the verification step is now unnecessary. 

**Reyes:** I want to be very clear with my team that this doesn’t replace the second-writer check. If anything, it should make that check easier to do well, not something people feel free to skip because “the AI already checked it.” 

**EAA:** Agreed, and I’d recommend that message come from your office directly, repeatedly, through rollout — this is exactly the kind of automation-complacency risk that matters most when the underlying safeguard is a human process, not a purely technical one. 

## **6.3 Security & Identity Architecture** 

All LLM inference within Vireon’s cloud tenant boundary (AWS, consistent with existing R&D data infrastructure) under a contractually negotiated no-training, no-retention agreement with the model provider — reviewed and required by Lindqvist’s office before any pipeline or study data could be processed 

- Strict data classification and access control distinguishing published/public literature (broadly accessible internally) from unpublished internal study data and pipeline-strategic information (access-restricted per Vireon’s existing IP-protection classification scheme, inherited and enforced by the new platform rather than creating a parallel classification system) Full audit logging of every knowledge-graph ingestion event, every agent-generated citation resolution, and every medical writer review/edit action — sized and structured specifically to satisfy GxP audit-trail requirements (21 CFR Part 11), reviewed and validated by Vireon’s Quality Assurance function as part of the computer-system-validation process 

## **6.4 Integration & API Strategy** 

- MCP server exposing the Scientific Evidence Knowledge Graph, live PubMed/MEDLINE search, and CrossRef bibliographic verification as discrete tools consumed by both the Literature-Intelligence Agent and the Drafting Agent Integration with Vireon’s existing document management system (Veeva Vault, industry-standard for regulated pharma content) for CTD section assembly and version control, preserving Veeva’s existing GxPvalidated document lifecycle rather than building a parallel document system Ingestion pipeline architecture: scheduled and on-demand knowledge-graph updates from PubMed/MEDLINE, with each new entry passing through the CrossRef verification step described in Section 6.1 before becoming available for agent citation 

# **7. Technical Debates** 

## **7.1 Should the Literature-Intelligence Agent Have Live Web Search Access?** 

**ML Engineer (Devon Park):** The knowledge graph will always lag slightly behind the very latest publications. Should the agent have live, unconstrained web search access to fill that gap? 

**EAA:** I’d support live search access to PubMed/MEDLINE and CrossRef specifically — authoritative, structured bibliographic sources — but I’d resist general, unconstrained web search for this specific agent, and I want to explain why given it might look unnecessarily restrictive. General web search would surface preprints, press releases, and secondary sources of varying reliability, and blending those with the verified knowledge-graph content risks quietly degrading the evidentiary rigor that’s the whole point of this system for Dr. Osei’s team. I’d rather the agent clearly distinguish “verified, graph-resident findings” from “very recent, live-searched findings from authoritative bibliographic sources” in its output, and simply not have access to lower-reliability general web content at all for this specific use case. 

**Park:** What about preprints specifically — those are often scientifically important and timely, even if not peerreviewed. 

**EAA:** Fair point, and I don’t want to dismiss preprints as categorically unreliable. I’d propose the agent can surface preprints from recognized preprint servers (bioRxiv, medRxiv) but must explicitly and prominently label them as non-peer-reviewed, distinct from the verified peer-reviewed graph content — giving scientists the information rather than making the reliability judgment for them silently. 

## **7.2 Citation Resolution — Exact Match vs. Fuzzy Match** 

This debate, in retrospect, is the one most directly implicated in the Month 9 incident, and is presented here as it occurred, before that incident, followed by its resolution in Section 14. 

**Park (Week 14):** The CrossRef verification step — does it require an exact match on the citation details, or do we allow fuzzy matching to handle minor formatting variance in how a citation might be referenced? 

**EAA:** I’d want exact match on the persistent identifier (DOI) as the ground truth, with fuzzy matching only used to _help a human or the ingestion pipeline find_ the likely correct DOI for a citation encountered without one explicitly stated — never as a substitute for the DOI-based verification itself. My concern with broader fuzzy matching is exactly the fabrication risk we discussed in Week 1: a sufficiently permissive fuzzy match could allow a citation that’s _similar to_ a real one, but not actually the real one, to pass verification. 

**Park:** What about citations to internal Vireon study reports, which don’t have a DOI or appear in CrossRef at all? 

**EAA:** Good catch, and this needs a separate pathway — internal study reports should be verified against Vireon’s own regulated document management system (Veeva Vault) using its internal document ID as the equivalent ground-truth identifier, with the same principle: exact match against an authoritative internal source, not fuzzy text matching. 

This design was implemented as described — but the Month 9 incident revealed a gap specifically in how the internal-document verification pathway handled a particular edge case, detailed in Section 14. 

## **7.3 Evaluation Strategy Debate** 

**Reyes:** For the drafting copilot, how do we measure success beyond “did it save time”? 

**EAA:** I’d propose three tiers, mirroring principles from other regulated engagements but adapted to this domain’s specific risk. First, **citation integrity** — percentage of generated citations that pass the exact-match verification against CrossRef or Veeva Vault, which should be at or extremely close to 100% given the architectural design, with any failure treated as a hard-block, not a warning. Second, **synthesis accuracy** — does the drafted content accurately represent what the cited sources actually say, evaluated by sampled medical writer review, since exactmatch citation verification confirms a source exists and is correctly identified but doesn’t independently confirm the drafted text faithfully represents that source’s findings. Third, **time-to-first-draft** , the efficiency metric Jonathan’s team actually cares about operationally. 

**Osei:** For the literature-intelligence agent, I want a metric specifically testing whether it surfaces contradicting 

evidence, not just supporting evidence — given that’s the exact failure mode Kwame described in discovery. 

**EAA:** Agreed, and I’d propose a specific “contradicting-evidence recall” metric — measured against a curated set of historical target-validation questions where the actual literature is known by your senior scientists to contain meaningful contradicting findings, checking whether the agent surfaces those specific findings, not just whether its overall synthesis sounds thorough. 

# **8. Executive Reviews** 

## **8.1 Quality Assurance / GxP Validation Review — Week 20** 

**Vireon QA Director (joining for computer-system-validation review):** I need to understand the full validation package — installation qualification, operational qualification, performance qualification — for this system before it can support any GxP-regulated activity. 

**EAA:** We’ve structured the validation documentation around exactly that IQ/OQ/PQ framework, with the citationintegrity architecture (Section 6.1) as the centerpiece of the OQ testing — specifically verifying that the system cannot produce a citation that fails exact-match verification against an authoritative source, tested against both normal-operation and adversarial-input scenarios. 

**QA Director:** What’s your change-control process for updates to the model or the knowledge-graph ingestion pipeline, given GxP requires formal revalidation triggers for significant changes? 

**EAA:** Any change to the citation-verification logic itself, or to the underlying LLM model version, triggers mandatory re-execution of the full OQ test suite before deployment — I’d recommend that threshold be set conservatively, erring toward “this counts as significant” rather than assuming a change is minor, given what’s at stake if the citation-integrity architecture were ever weakened by an untested change. 

## **8.2 CSO/Regulatory Executive Review — Week 28** 

**Osei:** Early literature-intelligence agent results — is it actually catching contradicting evidence, or just producing more thorough-sounding summaries? 

**EAA:** Against the contradicting-evidence-recall benchmark Dr. Osei requested in Week 15, the agent is currently surfacing about 78% of the known contradicting findings in our curated historical test set — meaningfully better than nothing, but I want to be honest that this isn’t yet where I’d want it before treating it as a fully trusted second opinion rather than a starting point for a scientist’s own review. I’d recommend continued improvement work before broader team-wide rollout beyond the current pilot group. 

**Osei:** I appreciate that honesty rather than a rounded-up number. Keep the pilot scoped until that number improves. 

## **8.3 Post-Incident Executive Review — Week 39 (see Section 14)** 

**Lindqvist:** I need the precise answer: how did a fabricated citation get past an architecture specifically designed to make that structurally impossible? 

**EAA:** I want to walk through this precisely rather than generalize, because the specific mechanism matters for trusting the fix. The core citation-verification architecture — requiring exact DOI match against CrossRef — held for all externally published literature citations; that pathway was not the source of the incident. The gap was in the internal-document verification pathway we discussed in Week 14 — the one handling citations to Vireon’s own internal study reports via Veeva Vault document IDs. In this specific case, the drafting copilot generated a citation that referenced what it described as an internal study report, formatted to look like it should be verified through that internal pathway, but the internal document ID it generated did not correspond to any actual Veeva Vault document — and the internal-verification pathway, unlike the external CrossRef pathway, did not hard-block on a failed lookup; it was implemented to flag a warning that, due to a UI design gap, was easy to miss. 

**Lindqvist:** So this wasn’t a failure of the architectural principle, it was a weaker implementation of that same principle on one specific pathway. 

**EAA:** That’s exactly right, and I think that’s the important distinction for how we characterize this both internally and, if it ever becomes relevant, to a regulator. The principle — no citation without verified-source resolution — was sound and held on the primary, higher-volume pathway. The internal-document pathway was built to a lower rigor standard than the external pathway, which in retrospect was a real design gap, not a difference that was ever deliberately, consciously justified. 

# **9. Final Architecture** 

- **Scientific Evidence Knowledge Graph** : structured representation of literature findings with evidentiaryrelationship typing (supporting/contradicting, evidence strength/type), every entry resolved against an authoritative bibliographic source (CrossRef/PubMed) at ingestion, with a separate, hardened-post-incident pathway for internal Vireon study report citations verified against Veeva Vault document IDs with the same hard-block-on-failure rigor as the external pathway 

- **Literature-Intelligence Agent** : structured dual-synthesis output (supporting and contradicting evidence presented as parallel, explicit tracks), live search restricted to authoritative bibliographic sources plus clearly-labeled preprint servers, contradicting-evidence-recall as a standing evaluation metric **Regulatory Submission Drafting Copilot** : CTD-section content assembly with every citation resolved to a verified knowledge-graph entry, output format explicitly designed to accelerate (not replace) Vireon’s existing mandatory second-writer citation cross-check process 

- Full GxP computer-system-validation package (IQ/OQ/PQ), with mandatory re-validation triggers for any change to citation-verification logic or underlying model version 

- All LLM inference within Vireon’s AWS tenant boundary under contractual no-training/no-retention terms Integration with Veeva Vault preserving existing GxP-validated document lifecycle 

# **10. Delivery Roadmap** 

|**Phase**|**Duration**|**Scope**|
|---|---|---|
|Discovery & GxP Validation Planning|Months 1–2|Discovery, QA/validation framework<br>design|
|Knowledge Graph & Citation-Integrity<br>Build|Months 2–6|Ingestion pipeline, CrossRef/Veeva<br>verification pathways|
|Literature-Intelligence Agent Build &<br>Pilot|Months 4–7 (overlapped)|Dual-synthesis agent, limited scientist<br>pilot group|
|Drafting Copilot Build|Months 6–9 (overlapped)|CTD-section drafting, GxP validation<br>testing|
|Incident & Remediation|Month 9|Fabricated citation near-miss, internal-<br>pathway hardening|
|Drafting Copilot GA (phased, active-<br>submission-aware)|Months 10–12|Rollout timed around active Phase 3<br>submission activity|

# **11. Risks** 

|**Risk**|**Likelihood**|**Impact**|**Mitigation**|**Owner**|
|---|---|---|---|---|
|Fabricated or<br>misattributed citations|Low (post-remediation);<br>was Medium on<br>internal-doc pathway<br>pre-incident|Very High|Hard-block exact-match<br>verification on all<br>pathways (post-<br>remediation);<br>mandatory second-<br>writer cross-check as<br>independent backstop|Regulatory Affairs / QA|
|Contradicting-evidence<br>blind spot in literature<br>synthesis|Medium (improving)|High|Dual-synthesis<br>architecture,<br>contradicting-evidence-<br>recall benchmark,<br>phased rollout gated on<br>benchmark<br>improvement|R&D / ML Engineering|
|GxP validation gaps<br>triggering audit finding|Low (post IQ/OQ/PQ<br>completion)|Very High|Formal validation<br>package, conservative<br>change-control<br>revalidation triggers|Quality Assurance|
|Trade secret / pipeline<br>data exposure|Low|Very High|Contractual no-<br>training/no-retention<br>terms, existing IP-<br>classification-scheme<br>enforcement|General Counsel|
|Submission timeline<br>disruption from<br>platform issues|Low|High|Phased rollout<br>explicitly sequenced<br>around active Phase 3<br>submission deadlines|Regulatory Affairs|

# **12. Governance Model** 

- **GxP Change Control** : any change to citation-verification logic, knowledge-graph ingestion pipeline, or underlying model version triggers mandatory OQ re-validation before deployment **Mandatory second-writer citation cross-check** : preserved as an independent, non-negotiable control regardless of system-level citation-integrity architecture, with explicit, repeated communication from Regulatory Affairs leadership against any perception that AI assistance reduces the need for this check **QA sign-off authority** : Vireon’s Quality Assurance function holds standing authority to pause any AIassisted submission activity pending investigation of a suspected citation-integrity or validation issue **Post-incident pathway-parity requirement** : any future citation-verification pathway added to the system (e.g., for a new source type) must meet the same hard-block-on-failure rigor as the existing external and internal pathways — formalized specifically in response to the Month 9 finding that one pathway had been built to a lower standard than the other 

# **13. Production Rollout** 

The Literature-Intelligence Agent entered pilot with a limited group of R&D scientists in Month 7, deliberately scoped narrow pending improvement on the contradicting-evidence-recall benchmark (Section 8.2). The Drafting Copilot’s rollout was explicitly sequenced to avoid disrupting the two active Phase 3 programs’ submission timelines — initial GA was scoped to non-time-critical CTD sections and lower-stakes submission types before expanding to core clinical-overview content, a sequencing decision made more conservative still following the Month 9 incident. 

# **14. Production Incident — Month 9** 

## **14.1 Incident Summary** 

During preparation of a clinical overview section for an upcoming regulatory submission (still in internal drafting, not yet submitted to any regulator), the Drafting Copilot generated a paragraph citing what it presented as an internal Vireon pharmacokinetics study report, including a specific internal document reference. A second medical writer, performing the mandatory citation cross-check described in Section 5.4, attempted to locate the referenced document in Veeva Vault and could not find it — the document ID did not correspond to any actual internal report. Further investigation confirmed the “citation” combined plausible elements (a real study type Vireon had in fact conducted around the relevant timeframe, formatted with a document-ID structure resembling Vireon’s actual internal ID conventions) into a reference that did not correspond to any real document. 

No submission left Vireon’s internal review process referencing this fabricated citation — the mandatory crosscheck caught it during internal drafting, exactly as that existing control was designed to do. 

## **14.2 Incident Response Transcript** 

**Reyes (emergency session, within 24 hours):** I want the precise mechanism. The architecture was specifically supposed to make this impossible. 

**EAA:** For externally published literature, via the CrossRef exact-DOI-match pathway, it is — that pathway hardblocks on any citation that doesn’t resolve to a real, verified publication, and there’s no evidence that pathway was involved or compromised here. The gap is specific to the internal-document verification pathway, which I need to own was built to a lower rigor standard: it attempted to verify against Veeva Vault, but on a failed lookup, it generated a warning flag rather than a hard block, and that warning was not prominent enough in the drafting copilot’s output UI for the medical writer using it to notice before the second-writer cross-check independently caught the issue through their own manual process, exactly as that process is designed to do as a backstop. 

**Lindqvist:** I need to understand why the internal pathway was weaker in the first place. Was this a conscious tradeoff, or an oversight? 

**EAA:** Based on my own review of the design history, I believe this was an oversight rather than a conscious, documented tradeoff — the external CrossRef pathway received more design and testing attention, likely because it handles the much higher volume of citations, and the internal pathway’s lower rigor wasn’t caught by our own QA validation process as a meaningful gap, which in retrospect it should have been. I want to be direct that this is a real miss on our part, not something I can attribute entirely to a reasonable, deliberate design tradeoff. 

**Osei:** How confident are we that this is the only instance, and not one we got lucky enough to catch? 

**EAA:** I’d recommend, and am proposing today, a full retrospective audit of every internal-document citation generated by the drafting copilot since its build began — not just recent submissions, all of them — cross-checked against actual Veeva Vault records, before any further drafting-copilot use on active submission content resumes. 

**Reyes:** Agreed. I’m pausing drafting copilot use on both active Phase 3 submission workstreams until that audit and the pathway fix are both complete and independently validated by QA. 

## **14.3 Remediation** 

The retrospective audit covered all internal-document citations generated during the pilot period — approximately 340 across various drafting sessions. It found one additional instance of a fabricated internal-document reference (caught during a routine, non-submission-related drafting exercise, never reviewed by a second writer since it wasn’t part of an active submission workflow) and confirmed no other instances. The internal-document verification pathway was rebuilt to hard-block on any failed Veeva Vault lookup, with identical rigor to the external CrossRef pathway — eliminating the parity gap identified as the root cause. QA independently revalidated both pathways under the OQ framework before drafting copilot use resumed on active submission content. 

# **15. Lessons Learned** 

1. **An architectural principle applied unevenly across its own implementation pathways creates exactly the kind of latent risk that’s easy to miss until it’s exploited or exposed.** The citationintegrity principle itself was sound; the failure was that one implementation pathway (internal documents) received meaningfully less design rigor than another (external literature) without that disparity being consciously identified or justified at any point in the build process. The post-incident governance addition — mandatory pathway-parity for any future citation-source type — exists specifically to prevent this class of gap from recurring silently. 

2. **A hard-block failure mode is safer than a warning-based failure mode for any control where the person relying on the warning is under time pressure and has other things competing for their attention.** The internal pathway’s warning-based design assumed a busy medical writer would reliably notice and act on a flagged warning; the incident showed that assumption doesn’t hold reliably in practice. This reinforced a design principle already present in the external pathway — hard-block, don’t warn-andhope — as the correct default for any citation-integrity-critical control, not just a nice-to-have where feasible. 

3. **A pre-existing, independent human process (Vireon’s mandatory second-writer citation crosscheck) that long predated this AI platform was the control that actually caught the incident — reinforcing, as in other regulated engagements, that AI-assisted systems should be designed to strengthen and be genuinely subordinate to existing rigorous human verification processes, not to implicitly encourage complacency in them.** The postmortem specifically credited Vireon’s own quality culture and existing process discipline, not any AI-specific safeguard, as the reason this stayed an internal near-miss rather than reaching an actual submission — a finding the team was careful to communicate clearly rather than overstate the AI platform’s own safety properties. 

# **16. Enterprise Architecture Artifacts** 

- **Capability Map** : literature intelligence and regulatory submission drafting value chains with AI-opportunity overlay (Section 5.4) 

- **Scientific Evidence Knowledge Graph schema** , including evidentiary-relationship typing and the dual external/internal citation-verification pathway documentation 

- **GxP Validation Package** (IQ/OQ/PQ documentation), including the post-incident pathway-parity revalidation record 

- **Citation-Integrity Architecture Specification** , explicitly documenting the pre- and post-incident pathway designs as a reference for the pathway-parity governance requirement 

# **17. Architecture Decision Records (ADRs)** 

**ADR-001: No AI-generated citation may be presented without resolution against an authoritative verification source; the system is architecturally prohibited from generating novel, unresolved citations.** Status: Accepted, foundational. Implementation gap identified and remediated post-incident (Section 14). 

**ADR-002: Literature-Intelligence Agent produces structured, parallel supporting/contradicting evidence synthesis, not a single blended summary.** Status: Accepted. See Section 6.2, directly responsive to the Boateng shadowing finding. 

**ADR-003: Live search access restricted to authoritative bibliographic sources (PubMed/MEDLINE, CrossRef) and clearly-labeled preprint servers; no general, unconstrained web search for this agent.** Status: Accepted. See Section 7.1. 

**ADR-004: Citation verification requires exact match against an authoritative persistent identifier (DOI for external literature, Veeva Vault document ID for internal reports) — fuzzy matching permitted only as a lookup aid, never as a substitute for exact-match verification.** Status: Accepted; internal-document pathway found to have a lower-rigor (warning-based, not hard-block) implementation, remediated post-incident. 

**ADR-005: Mandatory second-writer citation cross-check preserved as an independent control, explicitly not superseded or diminished by the system’s own citation-integrity architecture.** Status: Accepted, foundational per Regulatory Affairs mandate; validated as the control that caught the Month 9 incident. 

**ADR-006: Drafting Copilot rollout phased and explicitly sequenced around active Phase 3 submission timelines, starting with lower-stakes, non-time-critical CTD sections.** Status: Accepted, made more conservative post-incident. 

**ADR-007 (post-incident): Internal-document citation-verification pathway rebuilt to hard-block on failed lookup, achieving parity with the external CrossRef pathway; mandatory pathway-parity requirement established for any future citation-source type.** Status: Accepted, emergency remediation, independently re-validated by QA under the OQ framework. 

# **18. AI Evaluation Strategy** 

- **Citation integrity** : hard-gate metric, target effectively 100% (given architectural hard-blocking) across all pathways, monitored continuously with any failure treated as an immediate investigation trigger, not a tolerable error rate 

- **Contradicting-evidence recall** : measured against a curated historical benchmark of target-validation questions with known contradicting findings, gating broader literature-intelligence-agent rollout on continued improvement (Section 8.2) 

- **Synthesis accuracy** : sampled medical writer review confirming drafted content faithfully represents cited sources’ actual findings, distinct from and in addition to citation-existence verification **Post-incident pathway-parity audit** : standing requirement to test any new or modified citation-verification pathway against the same adversarial and failure-mode test suite applied to existing pathways before production use 

# **19. Operational Runbook** 

- **Citation-verification failure handling** : any failed lookup across any pathway hard-blocks the associated content from appearing in copilot output, routed to a flagged-content queue with a clear explanation, never silently retried or downgraded to a soft warning 

- **GxP change-control procedure** : mandatory OQ re-validation for any change to citation-verification logic, ingestion pipeline, or underlying model version, per Section 12 

- **Active-submission-period support protocol** : elevated monitoring and support responsiveness during periods when the drafting copilot is in active use for a live Phase 3 submission workstream, given the schedule-criticality constraint from discovery **Retrospective audit protocol** (post-incident, formalized): standing procedure for full historical-output audit following any future citation-integrity finding, modeled on the Month 9 response 

# **20. Future Roadmap** 

1. **Broader Literature-Intelligence Agent rollout** beyond the current pilot group, gated on continued contradicting-evidence-recall benchmark improvement per Dr. Osei’s Week 28 condition, not a fixed calendar date. 

2. **Competitive intelligence monitoring capability** (deferred in discovery, Section 5.4), requiring separate scoping and stakeholder engagement with Vireon’s business development function, given its materially different data sources and governance considerations. 

3. **Expansion of the Drafting Copilot to additional CTD section types** beyond the initial phased scope, contingent on continued stable performance through the current Phase 3 submission cycles before taking on additional scope. 

4. **Cross-functional reuse of the citation-integrity architecture pattern** : Vireon’s QA function has proposed the exact-match, hard-block verification principle as a standing architectural requirement for any future AI system touching regulated content — formally adopted as an internal standard following the Month 9 postmortem, extending beyond this platform’s original scope.
