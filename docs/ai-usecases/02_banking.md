---
title: "Banking Case Study: Continental Union Bank — AI Underwriting Copilot"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "02_banking.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# Banking Case Study: Continental Union Bank — AI Underwriting Copilot
Continental Union Bank — Commercial Lending Underwriting Copilot & Model Risk Governance

Engagement Period: January 2025 – November 2025

1. Executive Summary

2. Client Background

3. Business Problem

4. Constraints

5. Discovery Transcript

   - 5.1 Kickoff — Week 1

   - 5.2 Underwriter Shadowing — Week 2

   - 5.3 Business Capability Mapping — Week 3

   - 5.4 ROI and Risk Discussion — Week 4

6. Architecture Workshops

   - 6.1 Data & Information Architecture

|6.2 AI/Platform Architecture—Whiteboard Session, Week 8|
|---|

- 6.3 Security & Identity Architecture

|6.4 Integration & API Strategy|
|---|

1. Technical Debates

|7.1 Foundation Model Selection and On-Prem vs. Cloud|
|---|
|7.2 Should the System Ever Suggest a Recommendation?|

|7.3 Evaluation Strategy Debate|
|---|

1. Executive Reviews

8.1 Model Risk Committee Review — Week 16 8.2 CRO / Board Risk Committee Briefing — Week 20 8.3 Post-Incident Executive Review — Week 34 (see Section 14 for incident detail) 9. Final Architecture 10. Delivery Roadmap 11. Risks 12. Governance Model 13. Production Rollout 14. Production Incident — Month 8 14.1 Incident Summary 14.2 Incident Response Transcript 14.3 Remediation 15. Lessons Learned 16. Enterprise Architecture Artifacts 17. Architecture Decision Records (ADRs) 18. AI Evaluation Strategy 19. Operational Runbook 20. Future Roadmap

# 1. Executive Summary

Continental Union Bank (CUB), a top-25 U.S. bank holding company with a $140B commercial lending book, engaged an Enterprise AI Architecture team to design an AI-assisted underwriting copilot for its Commercial & Industrial (C&I) lending division. The mandate: reduce the 11-day average time-to-credit-memo for mid-market loans ($2M–$50M) without weakening the bank’s model risk posture under SR 11-7 (the Federal Reserve’s supervisory guidance on model risk management) or its internal three-lines-of-defense governance model.

The ten-month engagement produced a retrieval-augmented drafting assistant for credit memos, a policycompliance verification agent built on a codified credit-policy knowledge graph, and an identity-aware document assembly pipeline — all operating under a strict non-decisioning boundary: the system could draft, retrieve, and flag, but the credit decision itself remained a human underwriter and credit committee function, with the AI’s role classified internally as “decision support,” not “automated adverse action,” a classification with direct regulatory and fair-lending consequences.

The engagement’s defining moment was a near-miss four months into production: the drafting assistant generated a financial ratio in a credit memo that did not match the source financial statements — a miscalculated debtservice coverage ratio that was internally consistent-looking but numerically wrong — caught by a second-line credit reviewer before the memo reached committee. This incident reshaped CUB’s evaluation strategy and produced the mandatory “numeric grounding” architecture pattern described in Section 14.

Key outcomes: - Average time-to-credit-memo reduced from 11 days to 6.5 days for in-scope loan segment - Zero credit decisions made autonomously by AI — 100% human decision authority retained, by design and by regulatory necessity - One material near-miss (Month 4 of pilot) triggering a full evaluation-strategy redesign before any further loan-segment expansion - Formal Fed/OCC model risk validation completed and passed prior to full production rollout

# 2. Client Background

Continental Union Bank operates a Commercial & Industrial lending division with roughly 340 relationship managers and 210 credit underwriters across twelve regional offices. Underwriters at CUB were spending a disproportionate share of their time on document assembly and financial-statement analysis — pulling data from borrower financials, tax returns, and industry comparables into a structured credit memo — rather than on judgment-intensive credit analysis.

CUB’s technology landscape included a core banking platform (a customized Finastra deployment), a document management system (iManage) holding decades of historical credit files, a market/industry data subscription (S&P Capital IQ), and a homegrown credit-policy manual — a 400-page PDF that underwriters were expected to know but that changed multiple times a year as policy committees revised risk appetite by industry vertical.

The bank’s Chief Risk Officer, Angela Osei, and Head of Model Risk Management, Dr. Farrukh Malik, were both explicit from the outset that this was as much a governance engagement as a technology engagement — CUB had been through a prior regulatory exam finding related to inadequate model documentation on an unrelated frauddetection model, and neither wanted a repeat.

# 3. Business Problem

C&I underwriting at CUB followed a well-defined but labor-intensive process: a relationship manager originates a loan opportunity, an underwriter spreads the borrower’s financials (normalizing them into the bank’s standard analytical format), assesses covenant structure and collateral, drafts a credit memo synthesizing the analysis, and routes it to a credit committee for approval above certain thresholds.

Discovery identified that roughly 60% of underwriter time on a typical mid-market deal went to mechanical work: re-keying financial statement data into the spreading template, searching for industry comparables, and drafting the narrative sections of the memo that followed a fairly predictable structure (business description, financial analysis, risk factors, mitigants, recommendation). Only the remaining time was spent on genuine credit judgment — the part CUB’s leadership agreed should never be automated.

A secondary problem: policy consistency. Underwriters across twelve regions interpreted CUB’s credit policy manual somewhat differently, and a Q2 internal audit had flagged seven instances in the prior eighteen months where credit memos cited policy provisions that had since been superseded by policy committee updates the underwriter hadn’t been aware of.

# 4. Constraints

1. **SR 11-7 model risk management.** Any model influencing credit decisions, even indirectly, required a formal model risk classification, independent validation by Model Risk Management (a group organizationally separate from the build team), and ongoing performance monitoring — regardless of whether the model was “AI” in the generative sense or a traditional statistical model.

2. **Fair lending / ECOA.** Legal counsel required that the system’s outputs never function as, or be perceived to function as, an automated adverse-action basis. Any AI-drafted content influencing a declination had to be traceable to human-reviewed, policy-grounded reasoning, not an opaque model score.

3. **Three lines of defense.** CUB’s governance model required underwriting (first line), independent credit review (second line), and internal audit (third line) to each retain a distinct, unreplaced role — the AI could not collapse the second-line review into a rubber-stamp.

4. **Data sensitivity.** Borrower financials are highly confidential commercial data; no borrower-identifiable data could be sent to any external LLM API without a signed data processing agreement and CUB legal sign-off, which ruled out several vendor options during procurement and pushed the architecture toward a VPCcontained deployment.

5. **Auditability.** Every AI-drafted statement in a credit memo needed to be traceable to a specific source document and page, given that credit memos are discoverable in litigation and regulatory exams.

6. **Legacy core banking constraints.** The Finastra core system’s data export was batch-only (nightly), meaning real-time loan portfolio data was not achievable without a separate real-time data service — a genuine limitation the team designed around rather than over-promised against.

# 5. Discovery Transcript

## 5.1 Kickoff — Week 1

*Present: Angela Osei (CRO), Dr. Farrukh Malik (Head of Model Risk Management), Head of C&I Lending (Robert Chen), General Counsel delegate (Priya Sharma), the Enterprise AI Architect (EAA).*

**Osei:** I’ll be direct. My board is enthusiastic about AI. My examiners are not hostile to it, but they will absolutely fail us on a model risk finding if we’re sloppy. I need an architecture where I can stand in front of the OCC and explain exactly what this system does and doesn’t decide.

**EAA:** That’s the right framing, and I want to start there rather than with technology. Can we agree on a bright line: this system never outputs a credit decision, a risk rating, or a recommendation framed as “approve” or “decline” — it only assists in assembling and drafting the analysis a human underwriter is accountable for?

**Malik:** I’d go further. I don’t want the system generating anything that *reads* like a decision even if it’s technically framed as a draft. If it writes “the borrower’s leverage ratio suggests this loan should be approved,” an underwriter under time pressure two years from now is going to rubber-stamp that sentence rather than independently verify it. Language matters here, not just formal decision authority.

**EAA:** Agreed, and that’s a genuinely important distinction — decision authority is a governance question, but *language design* is a human-factors question that governance alone doesn’t solve. I’d propose the drafting assistant is constrained to descriptive and analytical language — “the borrower’s DSCR is 1.35x, below the 1.5x policy threshold for this industry vertical” — and never prescriptive language. The underwriter writes the recommendation; the system helps assemble the facts underneath it.

**Chen:** From the business side, I need this to actually save time, or my underwriters won’t use it regardless of how well-governed it is. If it takes longer to verify the AI’s output than to do the analysis manually, it’s dead on arrival.

**EAA:** That tension — rigor versus speed — is going to run through this whole engagement, and I don’t think we should pretend it resolves easily. My view: the fastest path to genuine time savings without cutting corners on rigor is to focus the system on the mechanical 60% Robert’s team described in the RFP — financial spreading, comparable retrieval, first-draft narrative assembly — and make the numeric grounding so rigorous that verification is fast, not slow. If every number in the draft is directly traceable and hyperlinked to its source document and page, verification becomes a quick visual check rather than a re-derivation.

## 5.2 Underwriter Shadowing — Week 2

**Underwriter (Marissa Tolliver), during a live deal walkthrough:** Watch this — this is the part that kills me. [pulls up borrower’s tax return PDF] I have to manually find EBITDA add-backs buried in a schedule, crossreference them against three years of financials, and re-key every number into our spreading template. Takes me half a day for one borrower, and if I mistype one cell the whole ratio analysis downstream is wrong.

**EAA:** How do you currently catch a mis-key?

**Tolliver:** Honestly? Sometimes I don’t, until second-line review catches it, if they catch it. That’s exactly the kind of error I’d want a tool to help prevent, not just speed up drafting.

This session directly shaped the decision to prioritize a **numeric extraction and cross-validation** capability — pulling figures from source documents with page-level citation and automatically flagging internal inconsistencies (e.g., a balance sheet that doesn’t balance, an EBITDA figure that doesn’t reconcile against its stated add-backs) — as a distinct, high-value capability separate from narrative drafting.

## 5.3 Business Capability Mapping — Week 3

|**Capability**|**Current State**|**AI Opportunity**|**Impact**|**Feasibility**|
|---|---|---|---|---|
|Financial statement<br>spreading|Manual re-keying|Extraction + cross-<br>validation agent|Very High|Medium|
|Comparable<br>company/industry<br>research|Manual S&P CapIQ<br>search|Retrieval-augmented<br>research agent|High|High|
|Credit memo narrative|Manual template|Drafting assistant|High|Medium|

|Credit memo narrative<br>drafting|Manual, template-<br>based|Drafting assistant<br>(grounded, non-<br>prescriptive)|High|Medium|
|---|---|---|---|---|
|Policy compliance<br>checking|Manual, memory-<br>dependent|Policy-verification<br>agent against<br>knowledge graph|High|Medium|
|Credit decisioning|Human judgment,<br>committee|Explicitly out of scope<br>— remains fully human|N/A|N/A|
|Covenant monitoring<br>(post-close)|Manual quarterly<br>review|Deferred to phase 2|Medium|Medium|

## 5.4 ROI and Risk Discussion — Week 4

**EAA:** Robert’s team spends roughly 60% of underwriter time on mechanical work across a book that processes about 1,800 mid-market deals a year. If we recover even half of that mechanical time through extraction and drafting assistance, that’s a meaningful underwriter capacity increase — either faster cycle time or capacity to handle more deal volume without headcount growth, whichever the business prioritizes.

**Chen:** Faster cycle time. We’re losing deals to competitors who can turn around a term sheet faster.

**EAA:** Then I’d frame the ROI case around cycle-time reduction specifically, not generic productivity — target is to get from 11 days to somewhere in the 6–7 day range for standard mid-market deals, which is achievable based on where the time is actually going according to this week’s shadowing sessions.

**Risk identification** , formalized in the risk register (Section 12): - Model risk: hallucinated or misextracted financial figures propagating into credit memos - Fair lending risk: any perception that AI-generated language influenced a declination without adequate human review - Second-line complacency risk: reviewers trusting AIassisted memos less rigorously than fully human-drafted ones - Data leakage risk: borrower-confidential data reaching an external LLM provider without appropriate contractual protection - Policy drift risk: knowledge graph falling out of sync with policy committee updates

# 6. Architecture Workshops

## 6.1 Data & Information Architecture

The team built a **Credit Policy Knowledge Graph** encoding CUB’s 400-page policy manual as structured, versioned entities — industry verticals, risk appetite thresholds, required covenant structures, delegated authority limits — replacing the “underwriters memorize the PDF” model that had produced the Q2 audit findings.

### Enterprise Data Architect (Wei Zhang), Week 6:

**Zhang:** Why encode the policy manual as a graph instead of just chunking it for retrieval like a normal RAG system?

**EAA:** Retrieval-only RAG would let the drafting assistant *find* relevant policy text, but it wouldn’t let the policyverification agent *reason* about whether a specific deal’s structure actually satisfies a threshold that depends on multiple interacting factors — industry vertical, loan size tier, collateral type, and delegated authority level all combine to determine, say, the required minimum DSCR or whether a deal needs full committee approval versus delegated sign-off. That’s a structured lookup against interacting rules, not a text-similarity retrieval problem. Getting it wrong isn’t a bad paragraph, it’s a policy-compliance miss like the ones your Q2 audit already caught.

**Zhang:** So retrieval is still used for the narrative and comparable-research pieces.

**EAA:** Right — hybrid architecture. Structured graph lookup for anything that’s a rule with defined inputs and outputs; vector retrieval over the historical credit-file corpus in iManage and the CapIQ industry data for anything that’s genuinely about finding relevant unstructured context — prior similar deals, industry commentary, comparable company profiles.

## 6.2 AI/Platform Architecture — Whiteboard Session, Week 8

**EAA:** [at whiteboard] Walk through a deal end to end. Underwriter uploads or links the borrower’s financial package — tax returns, financial statements, business plan. The Extraction Agent pulls structured figures with page-level source citation, running against a validation layer that checks internal consistency — balance sheet balances, ratio calculations reconcile — and flags anything that doesn’t. That validation layer is deterministic arithmetic, not an LLM judgment call, deliberately: arithmetic correctness isn’t something you want probabilistic.

**Model Risk lead (Malik):** How does the Drafting Agent avoid inventing a number that isn’t actually in the extracted data?

**EAA:** This is the crux of the whole design, and it’s worth spending real time on. The Drafting Agent is architecturally prohibited from generating any numeric figure that isn’t pulled by direct reference from the Extraction Agent’s validated output — it’s not “trained to be careful with numbers,” it’s structurally constrained: the drafting prompt template requires every quantitative claim to be inserted via a citation token that resolves to a specific extracted-and-validated data point, not free-generated text. If the model tries to state a ratio that wasn’t computed by the deterministic validation layer, the output fails a post-generation programmatic check and gets flagged rather than delivered.

**Malik:** That’s a strong claim. What happens when that fails — because I guarantee you it will fail at some point.

**EAA:** It will, and I’d rather over-invest in catching that than claim it can’t happen. That’s exactly why the numeric grounding check is a hard gate before any memo section is shown to the underwriter, not a best-effort mitigation — and it’s why, as we’ll get to in Section 14, when a version of this did slip through in production, it was because of a boundary case in how the grounding check handled a *derived* ratio rather than a directly extracted figure, not a failure of the core architectural principle.

## 6.3 Security & Identity Architecture

All financial document processing occurs within CUB’s Azure VPC boundary using Azure OpenAI Service with a signed enterprise data processing agreement guaranteeing no data retention or model training on CUB data — a hard procurement requirement from Legal (Section 4)

- Identity propagation via OIDC/Azure AD: every extraction, draft, and policy-check action is attributed to the initiating underwriter’s session, with service identities for the agents themselves carrying no independent authority to access borrower data outside an active, human-initiated deal workflow

- Row-level and document-level access control mirroring CUB’s existing deal-team confidentiality walls (relationship managers and underwriters only see deals they’re assigned to) — enforced at the retrieval layer, not just the UI, so the vector search itself is scoped per user’s authorized deal set OPA-based policy enforcement ensuring the policy-verification agent’s knowledge graph queries are always scoped to the current, in-force policy version — critical given that policy versions change and old credit memos referencing superseded policy must remain intact as historical records while new memos reference current policy

## 6.4 Integration & API Strategy

- MCP server exposing the Credit Policy Knowledge Graph, the Extraction/Validation service, and the CapIQ comparable-search capability as discrete tools consumed by the Drafting Agent — chosen so tool definitions were independently reviewable by Model Risk Management as part of model validation, each tool documented with its own input/output contract and error-handling behavior Nightly batch integration with the Finastra core for portfolio-level context (existing relationship exposure, prior loan performance) — the team explicitly did not attempt to force real-time integration against a batchonly legacy system, instead designing the workflow to make clear to underwriters when portfolio context was as-of-last-night versus real-time iManage integration via its native API for historical credit-file retrieval, with access control inheritance from iManage’s existing permission model rather than a parallel access system

# 7. Technical Debates

## 7.1 Foundation Model Selection and On-Prem vs. Cloud

**Platform Architect (David Osei-Bonsu, no relation to the CRO):** Legal’s data processing agreement requirement effectively rules out several vendors we evaluated. Are we boxed into a single provider?

**EAA:** Practically, yes for this release — Azure OpenAI Service with the enterprise DPA was the only option that satisfied both the no-training-on-data requirement and the timeline. I want to flag that as a real constraint, not present it as if we had unconstrained choice and this was obviously best. The tradeoff is real: less model-provider flexibility for the next few years unless the LLM gateway abstraction we’re building lets us swap later without rearchitecting.

**Osei-Bonsu:** Is on-prem/self-hosted open-weight models a real alternative worth evaluating?

**EAA:** We evaluated it seriously, including a self-hosted open-weight deployment. The extraction and validation quality gap on financial-document-specific tasks was material enough in our bake-off testing that I couldn’t recommend it for a first release given the accuracy bar this domain demands — but I’d revisit it in eighteen months. Model quality in this space is moving fast, and if a self-hosted option closes that gap, it removes the vendor dependency, which is a real long-term benefit. I don’t want to present this as settled forever, just settled for this release.

## 7.2 Should the System Ever Suggest a Recommendation?

This debate recurred multiple times across the engagement — Osei’s team kept probing whether the “never prescriptive” boundary from Week 1 could be relaxed for efficiency.

**Chen (Week 12):** Underwriters keep telling us they still have to synthesize the recommendation section from scratch even with everything else drafted. Could the system at least draft a *first-pass* recommendation the underwriter then edits?

**Malik:** I said no to this in week one and my position hasn’t moved. The moment the system’s language reads as a recommendation, we’ve created exactly the automation-complacency and fair-lending risk we designed against.

**EAA:** I want to offer a middle path rather than just relitigate the same two positions. What if the system drafts a **structured risk-factor summary** — the specific factors bearing on approval and decline, each grounded in the extracted data and policy thresholds, organized the way underwriters already think about a recommendation — but explicitly stops short of a synthesized verdict? That gives underwriters the assembled raw material for their own judgment without the system ever writing the sentence “recommend approval.”

**Malik:** I could support that if the language is reviewed by my team and legal before release, and if we test specifically for whether underwriters using it produce meaningfully different recommendations than underwriters not using it — if usage correlates with more uniform, less independently-reasoned recommendations across underwriters, that’s a red flag we’d need to act on.

**Chen:** That’s a real compromise. I’ll take structured risk factors over nothing.

This became ADR-006 and directly shaped the Evaluation Strategy’s “recommendation independence” monitoring metric (Section 18).

## 7.3 Evaluation Strategy Debate

**Malik:** For SR 11-7 validation, I need more than “the model performs well on a test set.” I need ongoing monitoring that would satisfy an examiner asking “how do you know this is still working correctly six months from now, on deal types you didn’t originally test against?”

**EAA:** Agreed, and this is exactly the category of requirement that generic AI evaluation practice often underserves — SR 11-7 wants continuous monitoring against a defined performance baseline with defined escalation triggers, not a one-time validation report. I’d propose three tiers: extraction accuracy (measured against a golden dataset of underwriter-verified extractions, sampled monthly in production, not just at launch); numeric grounding integrity (the automated check described in Section 6.2, monitored as a hard production metric with an alert threshold); and the recommendation-independence metric Farrukh just raised, tracked

### quarterly

**Malik:** I want extraction accuracy broken out by document type and industry vertical, not a single blended number — I’ve seen too many model risk submissions hide a bad subsegment behind a good blended average.

**EAA:** Fair, and that’s a cheap ask relative to the value — we’ll stratify every metric by document type and industry vertical from day one of the monitoring dashboard, not add it later when someone asks.

# 8. Executive Reviews

## 8.1 Model Risk Committee Review — Week 16

**Malik (presenting to full Model Risk Committee):** I’m recommending conditional approval for pilot deployment, classified as a Tier 2 model under our internal framework — not Tier 1, because it doesn’t independently generate a credit decision or score, but not Tier 3 either, because its outputs materially inform a Tier 1 human decision process. Conditions: independent validation of the numeric grounding architecture by my team before any production data flows through it, and a defined kill-switch procedure if the extraction accuracy monitoring drops below the agreed threshold in any stratified segment.

**Committee member (Internal Audit):** What’s the kill-switch threshold?

**EAA:** We’re proposing 98.5% extraction accuracy on directly-extracted figures, measured monthly against underwriter-verified ground truth, with automatic escalation to Model Risk Management if any single industry vertical or document type drops below 97% for two consecutive months — not a full production halt at that threshold, but a mandatory investigation before that segment continues.

**Committee:** Approved for pilot, conditions as stated.

## 8.2 CRO / Board Risk Committee Briefing — Week 20

**Osei:** The board’s question is going to be simple: does this create new risk the bank didn’t have before, or does it reduce existing risk?

**EAA:** Honest answer: both, and I think that’s the right thing to tell the board rather than a one-sided pitch. It reduces the mis-key and inconsistent-policy-interpretation risk that your own Q2 audit already documented as an existing problem. It introduces a new risk category — AI-generated content in a regulated credit process — that didn’t exist before and that requires the governance model Dr. Malik’s team has built. I’d tell the board that this doesn’t eliminate risk, it changes its shape and, done well, the new risk is more monitorable and controllable than the old manual-error risk was, because it comes with continuous automated monitoring the manual process never had.

**Osei:** I’ll use that framing. The board doesn’t want to hear “no new risk” — they’ve been burned by vendors saying that before.

## 8.3 Post-Incident Executive Review — Week 34 (see Section 14 for incident detail)

**Osei:** I want a straight answer: does this incident change your confidence in the architecture, or was this within the range of expected imperfection we accepted at Week 16?

**EAA:** I’d separate those two questions rather than pick one framing. The core architectural principle — that no number reaches a memo without deterministic validation — held. What failed was a boundary case: a *derived* ratio computed by combining two validated figures through a calculation path that itself wasn’t subject to the same grounding check as directly-extracted figures. That’s a real gap in the implementation of the principle, not a failure of the principle itself, and it’s fully within the category of thing continuous monitoring exists to catch — which it did, before the memo reached committee. I’d tell the board this is the system and the governance model working as designed, at the cost of one uncomfortable incident, rather than evidence the design is wrong.

**Malik:** I’ll co-sign that characterization for the regulatory narrative, with the condition that the remediation (Section 14.3) is complete and independently re-validated before we lift the pause on expansion to new loan segments.

# 9. Final Architecture

- **Extraction & Validation Service** : document-ingestion pipeline (OCR/structure extraction, custom financialstatement parsing) producing extracted figures with page-level source citations; deterministic arithmetic validation layer checking internal consistency of every extracted figure and every *derived* figure (postincident scope expansion, Section 14.3)

- **Credit Policy Knowledge Graph** : versioned, structured representation of CUB’s credit policy manual, exposed via MCP as a queryable tool for the Policy-Verification Agent

- **Policy-Verification Agent** : checks a deal’s structure against current in-force policy thresholds, flagging any provision the drafted memo should address but doesn’t

- **Drafting Agent** : RAG-grounded narrative assembly (business description, financial analysis, structured riskfactor summary per ADR-006), architecturally prohibited from generating ungrounded numeric claims or prescriptive recommendation language

- **Comparable Research Agent** : retrieval over CapIQ industry data and CUB’s historical deal corpus (iManage), surfacing relevant comparables with citations

- **Underwriter Review Interface** : presents drafted memo sections with every numeric claim hyperlinked to source document/page; policy-verification flags surfaced prominently; full human edit capability before any downstream routing

All LLM inference via Azure OpenAI Service within CUB’s VPC boundary under signed enterprise DPA; no borrower data leaves the tenant boundary

# 10. Delivery Roadmap

|**Phase**|**Duration**|**Scope**|
|---|---|---|
|Discovery & Model Risk Framework|Months 1–2|Discovery, SR 11-7 classification<br>approach, Model Risk Committee<br>engagement|
|Extraction/Validation Build|Months 2–5|Core extraction pipeline, deterministic<br>validation layer, golden-dataset creation|
|Knowledge Graph & Policy Agent|Months 3–5 (overlapped)|Credit policy knowledge graph, policy-<br>verification agent|
|Drafting Agent & Pilot Approval|Months 5–7|Narrative drafting, structured risk-factor<br>summary, Model Risk Committee<br>conditional approval|
|Pilot Deployment (3 regions)|Months 7–9|Limited rollout, extraction accuracy<br>monitoring live|
|Incident & Remediation|Month 8 (during pilot)|Derived-ratio grounding gap incident,<br>evaluation redesign|
|Full Rollout (12 regions)|Months 9–11|Expansion post-remediation and re-<br>validation|

# 11. Risks

|**Risk**|**Likelihood**|**Impact**|**Mitigation**|**Owner**|
|---|---|---|---|---|
|Hallucinated/misgrounded<br>numeric figures|Medium (pre-<br>remediation); Low<br>(post)|Very High|Deterministic<br>grounding check<br>extended to derived<br>figures; monthly<br>stratified accuracy<br>monitoring|Model Risk<br>Management|
|Second-line reviewer<br>complacency|Medium|High|Reviewer training<br>emphasizing “assisted,<br>not verified” framing;<br>sampling audit of<br>override/catch rates|Credit Risk|
|Fair lending exposure via<br>prescriptive language<br>drift|Low (post-ADR-006)|Very High|Structured risk-factor<br>summary only;<br>quarterly<br>recommendation-<br>independence<br>monitoring|Legal / Model Risk|
|Policy knowledge graph<br>drift from live policy<br>manual|Low|High|Automated sync<br>process tied to policy<br>committee change-<br>control workflow|Credit Policy Office|
|Vendor/model<br>dependency (single LLM<br>provider)|Medium|Medium|LLM gateway<br>abstraction for future<br>portability; 18-month<br>self-hosted re-<br>evaluation planned|Platform Architecture|

# 12. Governance Model

- **Tier 2 Model Risk classification** under CUB’s internal framework, with defined ongoing monitoring obligations distinct from a one-time validation

- **Three-lines-of-defense preservation** : underwriting (first line) uses the tool; independent credit review (second line) explicitly trained and measured on catch rates, not just approval throughput; internal audit (third line) receives quarterly access to full monitoring dashboards and override-pattern data **AI Change Advisory process** : any change to the Drafting Agent’s prompts, the grounding-check logic, or the Credit Policy Knowledge Graph schema requires Model Risk Management sign-off before production deployment

- **Kill-switch authority** : jointly held by CRO and Head of Model Risk Management, with defined automaticescalation thresholds (Section 8.1) that trigger mandatory investigation, not necessarily automatic shutdown

# 13. Production Rollout

Pilot began in three regions (Month 7) with the underwriting teams that had participated in discovery shadowing, deliberately chosen because they had context on the tool’s design intent rather than encountering it cold. Extraction accuracy monitoring ran from day one of the pilot, stratified by document type and industry vertical per Malik’s Week 12 requirement.

The Month 8 incident (Section 14) occurred during this pilot phase and paused expansion to additional regions until remediation and re-validation were complete — full 12-region rollout did not occur until Month 9, roughly six weeks later than originally planned, a delay the team and CUB leadership both characterized afterward as the governance model working correctly rather than a failure.

# 14. Production Incident — Month 8

## 14.1 Incident Summary

During pilot deployment, the Drafting Agent produced a credit memo for a $14M mid-market manufacturing loan that included a debt-service coverage ratio (DSCR) of 1.62x. The figure was a *derived* value — calculated by combining an extracted EBITDA figure and an extracted debt-service figure through a ratio calculation — rather than a figure directly present in any source document. The derived-ratio calculation contained an error: it used the borrower’s prior-year debt service figure instead of the current projected figure, producing a DSCR that overstated the borrower’s coverage by a material margin (actual DSCR using correct figures was 1.31x, below the 1.5x policy threshold for the manufacturing vertical).

The error was not caught by the numeric grounding check because that check, as originally scoped, validated that *directly extracted* figures matched their source documents — it did not independently re-verify the arithmetic of *derived* figures computed by combining multiple extracted values. A second-line credit reviewer, cross-checking the memo against the underlying financials as part of standard review, noticed the mismatch and flagged it before the memo reached credit committee. No incorrect credit decision was made; the loan was correctly re-evaluated and ultimately approved at a smaller amount with additional covenant protections given the true 1.31x DSCR.

## 14.2 Incident Response Transcript

**Malik (emergency Model Risk review, within 24 hours):** I want to understand the precise boundary of what failed. Walk me through it.

**EAA:** The architectural principle from Week 8 — no number reaches a memo without deterministic validation — held for directly extracted figures. What we missed is that a *derived* figure, computed downstream of extraction by combining two validated inputs through a calculation, was treated by the implementation as already “grounded” because its inputs were grounded, without independently verifying the calculation itself used the correct inputs in the correct combination. In this case, the calculation pulled a stale prior-year debt-service figure instead of the current one — a data-selection error in the derivation step, not a fabrication, but functionally just as dangerous.

**Malik:** Is this a hallucination in the classic LLM sense, or something else?

**EAA:** Something else, and I think that distinction matters for how we fix it. This wasn’t the model inventing a number — it was the model performing a calculation using an input that was technically valid data but the *wrong* valid data for this specific ratio. That’s closer to a data-pipeline bug than a generative-model hallucination, which actually makes it more tractable to fix comprehensively rather than probabilistically mitigate.

**Osei (joining):** How do we know this is the only instance of this class of error, and not one we got unlucky enough to catch?

**EAA:** We don’t know that yet, and I won’t pretend otherwise. I’m proposing an immediate retrospective audit: rerun every derived-figure calculation from every pilot-phase memo generated so far against a fully independent recalculation, before we resume any drafting for new deals. That’s the only way to get an honest answer to your question rather than a reassuring guess.

**Malik:** Agreed, and I’m formally pausing pilot expansion pending that audit and a remediated grounding architecture, not just a patch.

## 14.3 Remediation

The retrospective audit covered all 47 pilot-phase memos; it found two additional instances of derived-figure calculation errors (neither had reached committee — both were still in underwriter draft review), and confirmed no incorrect credit decisions had resulted from any instance. The remediation extended the deterministic grounding check to **recursively validate every step of any derived calculation** , not just the leaf-level extracted inputs — architecturally, this meant the calculation graph itself became a first-class, auditable artifact rather than an internal implementation detail of the drafting prompt.

# 15. Lessons Learned

1. **“Grounded” needs a precise, recursive definition, not an intuitive one.** The team believed the numeric grounding architecture was complete because every *leaf* figure was validated against source documents. The gap was in derived, multi-step calculations, where grounding at the leaves doesn’t guarantee correctness of the combination. Any future numeric-integrity architecture in this domain should define grounding recursively across the full calculation graph from the outset, not extend to it after an incident.

2. **The classification of the failure mode matters for the fix.** Correctly identifying this as a data-selection error in a calculation pipeline, not a generative hallucination, changed the remediation from “improve prompting” (which would not have fixed it) to “make the calculation graph an auditable, independentlyverifiable artifact” (which did). Misclassifying an incident’s root cause risks a remediation that addresses the wrong mechanism.

3. **Second-line review, done rigorously, is not a formality — it is the control that worked.** The postmortem explicitly credited the second-line reviewer’s independent verification against source financials, performed as standard practice rather than because of any incident-specific alert, as the reason this stayed a near-miss. This reinforced Malik’s Week 1 position against ever framing AI assistance as replacing rigorous independent review, and became a case study CUB used in reviewer training afterward.

4. **A retrospective audit is worth the delay it causes.** Pausing expansion for six weeks to audit all prior pilot output, rather than patching forward only, surfaced two additional latent instances that would otherwise have remained undetected risk sitting in draft memos. The team’s assessment: the delay was the correct tradeoff, and the postmortem recommended this become standard incident-response procedure for any future model-risk-relevant finding, not a one-off decision.

# 16. Enterprise Architecture Artifacts

- **Capability Map** : C&I lending value chain with AI-opportunity overlay (Section 5.3) **Credit Policy Knowledge Graph schema documentation** , versioned alongside the policy manual’s own revision history

- **Numeric Grounding Architecture specification** , including the post-incident recursive calculation-graph validation design — used subsequently by CUB’s Model Risk Management team as a reference pattern for evaluating other numeric-generation AI proposals across the bank

- **Data Flow Diagram** showing VPC boundary, DPA-governed LLM inference path, and all borrower-data touchpoints, maintained jointly with Legal and Model Risk Management **RACI matrix** for the three-lines-of-defense model as applied to this specific system

# 17. Architecture Decision Records (ADRs)

**ADR-001: System is strictly non-decisioning; all credit decisions remain human authority.** Status: Accepted, foundational, non-negotiable per CRO and Model Risk mandate.

**ADR-002: Hybrid knowledge architecture — structured knowledge graph for deterministic policy-rule lookup; vector retrieval for unstructured historical/comparable context.** Status: Accepted. See Section 6.1.

**ADR-003: Numeric grounding is architecturally enforced via citation-token resolution against validated extraction output, not prompt-level instruction alone.** Status: Accepted; scope expanded post-incident to cover derived-figure calculation graphs recursively (Section 14.3).

**ADR-004: All LLM inference occurs within CUB’s Azure VPC boundary under a signed enterprise data processing agreement; no borrower data reaches an external, non-contracted model provider.** Status: Accepted, non-negotiable per Legal.

**ADR-005: Self-hosted open-weight model alternative deferred, to be re-evaluated in approximately 18 months.** Status: Accepted. See Section 7.1.

**ADR-006: Drafting Agent produces structured, grounded risk-factor summaries; never a synthesized approve/decline recommendation.** Status: Accepted. See Section 7.2. Monitored via quarterly recommendation-independence metric.

**ADR-007 (post-incident): Numeric grounding validation extended recursively to all derived-calculation steps, with the calculation graph treated as a first-class auditable artifact.** Status: Accepted, emergencyscoped and re-validated by Model Risk Management before pilot resumption.

# 18. AI Evaluation Strategy

- **Extraction accuracy** : monthly measurement against a golden dataset of underwriter-verified extractions, stratified by document type and industry vertical (Malik’s Week 12 requirement), with automatic escalation below defined thresholds (Section 8.1)

- **Numeric grounding integrity** : production hard-gate metric — percentage of memo sections passing the recursive grounding check on first generation, tracked continuously, with any failure logged and routed to the flagged-for-review queue rather than silently retried

- **Recommendation-independence monitoring** : quarterly comparison of underwriter recommendation patterns using the tool versus historical baseline, watching for convergence/uniformity that might indicate reduced independent judgment (Section 7.2)

- **Second-line catch-rate audit** : sampling review measuring whether second-line reviewers using AI-assisted memos catch issues at a comparable rate to fully manual memos — a direct test of the complacency risk identified in discovery

- **Post-incident retrospective audit protocol** : formalized as standard procedure (Section 15, lesson 4) for any future material finding

# 19. Operational Runbook

- **Extraction failure handling** : documents that fail OCR/structure parsing or fail the internal-consistency check are routed to a manual-review queue with a clear underwriter-facing explanation of what failed, rather than silently degrading to ungrounded generation

- **Model/prompt/knowledge-graph change procedure** : mandatory Model Risk Management sign-off; mandatory rerun of the golden-dataset extraction-accuracy suite and the numeric-grounding regression suite before any production deployment

- **Monthly monitoring review** : stratified accuracy dashboards reviewed jointly by Model Risk Management and Credit Risk; any threshold breach triggers the defined escalation procedure (Section 8.1) **Policy knowledge graph update procedure** : synchronized to the Credit Policy Office’s existing changecontrol calendar, with a defined verification step confirming graph updates before the new policy’s effective date, and historical memo references preserved against the policy version in force at drafting time

# 20. Future Roadmap

1. **Covenant monitoring agent (deferred phase 2)** : extending the extraction/validation architecture to quarterly covenant compliance monitoring on the existing loan book, reusing the numeric grounding pattern validated in this engagement.

2. **Self-hosted model re-evaluation** at the 18-month mark (ADR-005), contingent on closing the accuracy gap identified in the original bake-off.

3. **Expansion beyond mid-market C&I** to the bank’s commercial real estate lending division, which raised interest during executive reviews but was explicitly deferred pending full C&I rollout stabilization and a fresh discovery phase — CRE underwriting has materially different risk factors and would not simply inherit this architecture unchanged.

4. **Recommendation-independence metric maturation** : if quarterly monitoring continues to show no complacency signal after a full year, Model Risk Management indicated openness to revisiting the strict prescriptive-language boundary (ADR-006) — explicitly framed as a multi-year, evidence-gated conversation, not a near-term roadmap item.

5. **Cross-line-of-business knowledge graph reuse** : CUB’s Enterprise Architecture group has expressed interest in the Credit Policy Knowledge Graph pattern as a template for other policy-heavy domains (regulatory compliance, AML policy) — a candidate for a separate, distinct engagement given materially different stakeholders and risk profiles.
