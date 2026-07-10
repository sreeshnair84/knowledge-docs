---
title: "The Denial Letter Problem"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_08_Sterling_Loan_Underwriting_Agent.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

#### **AGENTIC AI IN THE ENTERPRISE** 

# **The Denial Letter Problem** 

Building an Agentic Loan Underwriting Copilot Inside a Fair-Lending-Bound Bank 

A transcript-style account following Priya Ramanathan, Enterprise AI Architect at Sterling National Bank, as she builds an agentic underwriting copilot deliberately restricted to approval-side recommendations — and discovers that proxy discrimination can hide inside a feature that is, on paper, entirely legal. 

#### **CAST OF CHARACTERS** 

**Priya Ramanathan Walter Hedges** Enterprise AI Architect, Consumer Lending (EA) — our Chief Lending Officer (CLO) — sponsor protagonist **Dr. Camille Fontaine Jordan Alvarez** Head of Model Risk Management Lead AI Engineer, Underwriting Automation **Rosalind Meyer Tunde Bakare** Fair Lending & Compliance Counsel VP, Underwriting Operations 

#### **INCUBATION** → **PITCH / APPROVE** → **DESIGN** → **BUILD** → **OPERATE** → **REVIEW** 

Sterling National Bank | Agentic Loan Underwriting Copilot | 2026 

## **STAGE 1 — THE DENIAL LETTER PROBLEM** 

_Discovering that the hard part was never approving loans faster | Week 1 | Monday, 12 January 2026_ 

#### _09:30 | Monday 12 January 2026 | Walter Hedges’ office_ 

#### **Informal Strategy Discussion — Attendees: Walter Hedges (CLO), Priya Ramanathan (EA)** 

### **Walter Hedges — Chief Lending Officer** 

Priya, our consumer loan underwriters process about 340 applications a day between them, and roughly seventy percent are what I’d call unambiguous — clean credit history, verifiable income, debt-to-income well within policy. I want an agentic system that can pre-screen and draft underwriting recommendations so our underwriters spend their time on the genuinely borderline cases instead of re-deriving the obvious ones. 

### **Priya Ramanathan — Enterprise AI Architect** 

I can build that, but I want to be direct about where the real risk sits before we scope anything else: it isn’t in speeding up approvals. It’s in what happens the first time this system’s output influences a denial, and in whether its approval recommendations end up correlating with protected characteristics in ways nobody intended. Under ECOA and Regulation B, we’re required to give applicants specific, accurate reasons for adverse action — and a system that can’t explain itself in those exact terms is a system we can’t use for denials at all, agentic or not. 

### **Walter Hedges — Chief Lending Officer** 

Understood. I wasn’t picturing it making denial decisions anyway — more that it drafts the analysis and an underwriter signs off either way. 

### **Priya Ramanathan — Enterprise AI Architect** 

Then let’s make that explicit in the design from day one rather than implicit in how people happen to use it — because ‘drafts the analysis and an underwriter signs off’ quietly becomes ‘approves the recommendation without really re-deriving it’ under caseload pressure, and at that point the human sign-off is a formality, not a control. I want to talk to Rosalind before we scope the eligibility boundary. 

#### _14:00 | Wednesday 14 January 2026 | Legal & Compliance floor_ 

#### **Discovery Interview — Attendees: Priya Ramanathan (EA), Rosalind Meyer (Fair Lending Counsel)** 

### **Rosalind Meyer — Fair Lending & Compliance Counsel** 

The framing I want you to design around isn’t ‘can the model predict default risk accurately’ — most of these models can. It’s ‘can we prove, continuously, that the model’s predictions don’t function as a proxy for race, sex, national origin, or the other protected classes, even when none of those fields are inputs.’ Zip code, education institution, even certain spending-pattern features can carry a strong proxy signal for race in a segregated housing market, entirely without the model ever seeing race directly. 

### **Priya Ramanathan — Enterprise AI Architect** 

So the governance question isn’t just input exclusion, it’s outcome monitoring — disparate impact testing has to run continuously against the live decision stream, not just once at model validation. 

### **Rosalind Meyer — Fair Lending & Compliance Counsel** 

Exactly, and I want a second constraint on top of that: the system is permanently restricted to drafting analysis and recommending approval on the strongest applications — the equivalent of Harborstone’s low-information-asymmetry claims, if I understand your prior work. It never independently recommends denial, and it never sees or handles adverse-action letter language without an underwriter and a compliance 

reviewer in the loop. A wrong approval costs us money we can absorb. A wrong denial, especially a pattern of wrong denials against one group, is a fair-lending violation that can end a bank. 

### **Priya Ramanathan — Enterprise AI Architect** 

That asymmetry is the right design anchor, and I’ll build the eligibility and autonomy boundary around it exactly the way you’ve framed it. 

#### u **EMAIL** 

**From:** Priya Ramanathan (Enterprise AI Architect) 

**To:** Dr. Camille Fontaine (Head of Model Risk Management) 

**Subject:** Early Flag: Agentic Underwriting Copilot — Proxy Discrimination Testing Needed Before Design Freeze 

Camille, scoping an agentic underwriting copilot restricted to drafting fast-track approval recommendations on the strongest applications, with denial authority remaining permanently with human underwriters. Before I freeze the feature set, I need your team’s read on which input features have known proxy-discrimination risk in our historical data — zip code, alma mater, and any spending-pattern derived features are my starting suspects. I’d rather exclude a feature at design time than discover the correlation in a disparate-impact audit after launch. Can we schedule a working session this week? Priya 

#### I **ARTIFACT: AIA-2026-071** 

### **Architecture Intake Assessment — Agentic Loan Underwriting Copilot** 

_Draft v0.1 | Sterling National Bank_ 

#### **BUSINESS PROBLEM STATEMENT** 

Consumer loan underwriters process ~340 applications/day; approximately 70% are unambiguous approvals under policy, yet receive similar manual analysis time as borderline cases, extending average decision time and underwriter capacity. 

#### **PROPOSED SCOPE** 

Agentic copilot drafts underwriting analysis and recommends fast-track approval on applications meeting a defined strength threshold. Permanently excluded: independent denial recommendation, adverse-action letter generation or reason-code selection, any autonomous decision without human underwriter sign-off. 

#### **KEY RISK FLAGGED AT INTAKE** 

Proxy discrimination — protected-class correlation via facially neutral features (geography, institutional history, derived spending patterns) requires continuous disparate-impact monitoring, not one-time validation. 

#### **NEXT STEPS** 

Model Risk Management feature-level proxy review; Fair Lending Counsel eligibility-boundary design session; Underwriting Ops workflow mapping. 

### **STAGE OUTCOMES** 

- I Autonomy boundary set at intake: fast-track approval recommendation only, denial authority permanently retained by human underwriters 

- I Fair Lending Counsel embedded from week one rather than brought in pre-launch, reframing the core design question from prediction accuracy to provable non-discrimination 

- I Proxy discrimination identified as the primary architectural risk before any feature engineering began 

## **STAGE 2 — THE ARCHITECTURE REVIEW BOARD ASKS THE UNCOMFORTABLE QUESTION** 

_Defending a design that intentionally does less than it could | Week 4 | Thursday, 5 February 2026_ 

#### _10:00 | Thursday 5 February 2026 | Sterling National Bank, ARB Chamber_ 

#### **Architecture Review Board Session — Attendees: Priya (EA), Walter (CLO), Camille (MRM), Rosalind (Fair Lending), ARB Panel** 

### **ARB Chair (Deputy CIO) — —** 

Ms. Ramanathan, the business case shows underwriter capacity gains of roughly forty percent, but the scope you’ve brought us is narrower than what was originally requested — no denial drafting, no adverse-action involvement at all. Why leave that value on the table when a human is still reviewing every output either way? 

### **Priya Ramanathan — Enterprise AI Architect** 

Because ‘a human is still reviewing every output’ is a weaker control than it sounds once you account for automation bias under caseload pressure — we saw exactly this failure pattern surface at Cascadia Health and at Northline Telecom in comparable programmes: humans stop meaningfully re-deriving recommendations they’re shown repeatedly, especially ones drafted in confident, well-organized language. For denials specifically, where the legal exposure is direct and individualized, I’m not willing to build a system whose real-world behavior depends on underwriters resisting that bias every single time. 

### **Dr. Camille Fontaine — Head of Model Risk Management** 

I’ll add the model risk view: we can validate that a model predicts default risk well in aggregate. We cannot validate, at this point, that its specific stated reasons for any individual denial would hold up as accurate, non-discriminatory, and legally sufficient under Regulation B’s specificity requirement. That’s a much higher bar than aggregate accuracy, and this system doesn’t clear it yet. 

### **ARB Chair (Deputy CIO) — —** 

And the forty percent capacity gain holds even restricted to fast-track approvals only? 

### **Priya Ramanathan — Enterprise AI Architect** 

Yes — because the seventy percent of unambiguous applications Walter described at intake are almost entirely on the approval side of the distribution. We capture nearly all of the achievable time savings without touching the higher-risk decision. 

### **Rosalind Meyer — Fair Lending & Compliance Counsel** 

I want the board’s approval to explicitly record that denial-side automation was considered and deliberately excluded, not simply deferred as a future phase to be added once the system proves itself on approvals. Proving itself on approvals says nothing about whether it can meet the denial-side bar — those are different problems, not different difficulty levels of the same problem. 

#### **EA'S INTERNAL THOUGHT** 

_It would have been easy to let the ARB’s question push the scope wider — the business case is genuinely stronger with denial-drafting included, and I could feel the pull to say ‘we’ll add strong guardrails’ rather than ‘we’re not doing this part.’ But guardrails around a fundamentally higher-stakes decision are not the same thing as an appropriately-scoped decision, and I’ve watched that exact substitution go wrong in other programmes. Better to bring back a system that does less and is defensible in every part of what it does._ 

#### I **ARTIFACT: ADR-2026-052** 

### **Architecture Decision Record — Agentic Loan Underwriting Copilot** 

_Approved v1.0 | Sterling National Bank_ 

#### **DECISION** 

Approved: agentic copilot for fast-track approval-recommendation drafting on applications meeting a defined strength threshold. Denial recommendation, adverse-action reasoning, and adverse-action letter generation are permanently out of scope — not deferred, excluded by design. 

#### **RATIONALE** 

Asymmetric regulatory and consumer-harm exposure between approval and denial errors under ECOA/Regulation B; automation-bias risk under underwriter caseload pressure; denial-side explainability does not currently meet regulatory specificity bar even with human review. 

#### **CONDITIONS** 

Continuous disparate-impact monitoring on all copilot-influenced approvals; Model Risk Management feature-level proxy review prior to build; quarterly Fair Lending audit of copilot recommendation patterns by applicant geography and available demographic proxies. 

#### **APPROVED BY** 

ARB Panel, Walter Hedges (CLO), Dr. Camille Fontaine (MRM), Rosalind Meyer (Fair Lending Counsel) 

### **STAGE OUTCOMES** 

- I ARB approved a deliberately narrower scope than originally pitched, with denial-side automation permanently excluded rather than deferred 

- I Automation bias under caseload pressure named explicitly as a reason human review alone is an insufficient control for high-stakes decisions 

- I Continuous disparate-impact monitoring made a standing condition of approval, not a one-time pre-launch gate 

## **STAGE 3 — THE FEATURE THAT WAS TECHNICALLY LEGAL** 

_Finding a proxy for race in a feature nobody had flagged | Weeks 6–10 | February–March 2026_ 

#### _11:00 | Tuesday 24 February 2026 | Model Risk Management lab_ 

#### **Feature Review Session — Attendees: Priya (EA), Camille (MRM), Jordan (Lead AI Eng)** 

### **Jordan Alvarez — Lead AI Engineer** 

We ran the proxy-correlation analysis Camille’s team specified across all candidate features. Zip code and alma mater came back exactly as flagged — both show strong correlation with race in our footprint and both are excluded. But we found a third one nobody flagged going in: ‘banking relationship tenure with a Sterling-network branch versus a non-network institution.’ It’s a reasonable-sounding underwriting signal on its face — longer relationship, more data, lower information asymmetry. 

### **Dr. Camille Fontaine — Head of Model Risk Management** 

And branch density correlates with neighborhood demographics in ways that track our historical footprint, including some legacy redlining-era branch placement decisions this bank made two generations ago. ‘Non-network institution’ is disproportionately where applicants from historically underserved neighborhoods bank, not because of anything about them as borrowers, but because of where we chose to put branches sixty years ago. 

### **Priya Ramanathan — Enterprise AI Architect** 

So the feature is legal, plausible-sounding, and would have sailed through a naive relevance review — and it’s still a proxy, just one layer removed from geography instead of being geography directly. This is exactly the failure shape we saw at Skyline with the Denver hub cost ranking — a historically-created data pattern masquerading as a genuine signal about the present. 

### **Jordan Alvarez — Lead AI Engineer** 

Do we exclude it outright, or can we make it safe by controlling for something? 

### **Dr. Camille Fontaine — Head of Model Risk Management** 

Exclude it. We don’t have a clean way to separate the legitimate signal from the historical-artifact signal within that single feature, and ‘probably mostly fine’ isn’t the bar for a feature we already know carries protected-class correlation. 

#### **EA'S INTERNAL THOUGHT** 

_The zip code and alma mater exclusions were the easy part — everyone expects those and nobody defends them once flagged. The banking-relationship feature is the harder lesson: proxy discrimination doesn’t only hide in obviously-geographic fields, it hides in any feature whose distribution was shaped by decisions this institution made decades ago. I need a standing process for this, not a one-time review — every new feature proposed for this model, indefinitely, needs the same historical-artifact question asked of it, because the naive relevance check will keep passing features like this one._ 

#### I **ARTIFACT: MRM-2026-018** 

### **Feature-Level Proxy Discrimination Review** 

_Sterling National Bank Model Risk Management_ 

**EXCLUDED FEATURES** 

Applicant zip code / census tract (direct geographic proxy). Undergraduate/graduate institution attended (education-access proxy). Banking relationship tenure by network-vs-non-network institution (historical branch-placement proxy, newly identified). 

#### **APPROVED FEATURES** 

Verified income, debt-to-income ratio, payment history depth and consistency, credit utilization trend, requested loan-to-value ratio — all reviewed for absence of significant protected-class correlation in current portfolio data. 

#### **STANDING REQUIREMENT** 

Every new feature proposed for the underwriting model, indefinitely, requires proxy-correlation review including assessment of whether its distribution was shaped by historically discriminatory institutional practice, prior to inclusion in any model version. 

### **STAGE OUTCOMES** 

- I Two anticipated proxy features excluded (zip code, alma mater) and one unanticipated proxy feature discovered and excluded (branch-network relationship tenure) 

- I Historical-artifact proxy discrimination identified as a recurring risk shape requiring a standing review process rather than a one-time feature audit 

- I Approved feature set restricted to signals with no significant demonstrated protected-class correlation in current portfolio data 

## **STAGE 4 — THE REASON CODE THAT WAS TRUE BUT UNHELPFUL** 

_Explainability that satisfies a regulator and explainability that satisfies an underwriter turn out to be different problems | Weeks 12–20 | April–May 2026_ 

#### _15:30 | Wednesday 22 April 2026 | Underwriting Operations floor_ 

#### **Build Review — Attendees: Priya (EA), Jordan (Lead AI Eng), Tunde Bakare (VP Underwriting Ops)** 

### **Tunde Bakare — VP, Underwriting Operations** 

The drafted approval rationales are technically accurate but they’re not useful to my underwriters — half of them read as ‘model output score exceeded threshold 0.87’ dressed up in a sentence. My team needs to be able to look at the reasoning and independently agree or disagree with it, not just see that a number was high. 

### **Jordan Alvarez — Lead AI Engineer** 

That’s a fair critique of the current version. The model score is genuinely the basis for the recommendation, so being honest about that isn’t wrong — but it’s not sufficient. We can have the drafting agent decompose the score into the specific underwriting factors that drove it — debt-to-income margin, payment consistency, requested amount relative to income — stated in the same terms an underwriter already reasons in. 

### **Priya Ramanathan — Enterprise AI Architect** 

I want to be careful here about a specific failure mode we’ve hit before, at Aurelia with citation fidelity — a decomposition that’s narratively persuasive but doesn’t map faithfully back to what actually drove the underlying score is worse than an honest ‘the score was high,’ because it gives underwriters false confidence that they’ve independently verified something they’ve actually just read a plausible story about. Jordan, whatever decomposition method you use has to be mathematically traceable to the score, not a separate generative explanation running alongside it. 

### **Jordan Alvarez — Lead AI Engineer** 

Understood — I’ll use a feature-attribution method computed directly from the model rather than having a language model narrate a plausible-sounding rationale afterward. The drafting agent’s job becomes translating attributed factors into underwriter-readable language, not generating the reasoning itself. 

#### **EA'S INTERNAL THOUGHT** 

_This is a subtler version of the numeric-hallucination problem I dealt with at Meridian, and the citation-fidelity problem at Aurelia — different domain, same underlying failure shape: a generative layer producing something that sounds like reasoning but was never actually derived from the thing it claims to explain. The fix pattern is consistent across all three: separate the deterministic, traceable computation from the generative language layer, and only let the generative layer translate, never originate, the substantive claim._ 

#### _10:00 | Monday 11 May 2026 | Underwriting Operations floor_ 

#### **Build Review — Attendees: Priya (EA), Tunde (VP Underwriting Ops), Rosalind (Fair Lending)** 

### **Tunde Bakare — VP, Underwriting Operations** 

The attribution-based rationale is much better — my team can now actually agree or push back on specific factors. One workflow gap: when an underwriter disagrees with the fast-track recommendation and pulls the application into full manual review instead, does that override get logged anywhere for the model, or does it 

just vanish into the normal review queue? 

### **Priya Ramanathan — Enterprise AI Architect** 

Right now it vanishes, and that’s a gap I should have caught — underwriter overrides of the recommendation are exactly the signal that would tell us if the system is systematically wrong in some pattern, the same way the Northline billing-tone bias only surfaced because someone looked at where the agent’s judgment and the human’s diverged. I’ll build an override-logging layer as a first-class part of this, and Rosalind, I want your team reviewing override patterns by applicant demographic proxy on a standing basis, not just the recommendations themselves. 

### **Rosalind Meyer — Fair Lending & Compliance Counsel** 

Agreed — a pattern where underwriters disproportionately override recommendations for applicants from a particular group is itself a fair-lending signal, whether the override rate is too high or, just as concerning, suspiciously too low. 

### **STAGE OUTCOMES** 

- I Rationale generation redesigned around traceable feature attribution rather than generative narrative explanation, preventing a plausible-but-unfaithful reasoning failure mode 

- I Underwriter override logging added as a first-class system component after being identified as a gap during build review, not at design 

- I Override-pattern monitoring by demographic proxy adopted as a standing Fair Lending review, extending disparate-impact monitoring beyond recommendations to human responses to them 

## **STAGE 5 — THE QUARTER THE OVERRIDE RATE SPIKED** 

_The monitoring layer catches something the accuracy metrics never would have | Months 4–8 | August–December 2026_ 

Go-live occurs 3 August 2026. The copilot drafts fast-track approval recommendations on applications meeting the strength threshold, with underwriters retaining full authority to accept, modify, or override every recommendation and pull any application into standard manual review. Average unambiguous-application decision time falls from 2.3 days to 6 hours in the first quarter, with underwriter capacity redirected to borderline and complex cases. 

#### _14:00 | Thursday 12 November 2026 | Model Risk Management lab_ 

#### **Quarterly Disparate Impact Review — Attendees: Priya (EA), Camille (MRM), Rosalind (Fair Lending)** 

### **Dr. Camille Fontaine — Head of Model Risk Management** 

The recommendation-level disparate impact metrics are clean this quarter — approval rates by proxy geography and other available demographic indicators are within our acceptable variance band, consistent with the last two quarters. But the override-pattern monitoring Rosalind asked for surfaced something in a different place: underwriter override rate on copilot recommendations for applicants in three specific branch territories is roughly double the network average, all overrides in the direction of pulling into manual review rather than accepting the fast-track approval. 

### **Rosalind Meyer — Fair Lending & Compliance Counsel** 

That’s not necessarily a problem in itself — a higher override rate in the conservative direction isn’t a consumer-harm pattern the way a suspiciously high approval-override rate might be. But it needs an explanation, because ‘double the average’ in a specific set of territories is exactly the shape a subtler bias would take even when the model’s own outputs look clean. 

### **Priya Ramanathan — Enterprise AI Architect** 

I want to run this down before we file it as low-risk. Jordan, can your team check whether those three territories have anything else in common — branch tenure of the underwriting staff, recent leadership change, application mix, anything operational rather than about the applicants themselves? 

#### _10:00 | Tuesday 1 December 2026 | Model Risk Management lab_ 

#### **Follow-Up Review — Attendees: Priya (EA), Jordan (Lead AI Eng), Camille (MRM)** 

### **Jordan Alvarez — Lead AI Engineer** 

Found it, and it’s not about the applicants. All three territories had a regional underwriting manager rotation in the same six-week window this summer, right after go-live. New managers in those branches were noticeably more cautious with a system that was still new to them, and that caution shows up as elevated override rates that have nothing to do with the applicant population — it’s an adoption-curve effect, not a bias signal. 

### **Dr. Camille Fontaine — Head of Model Risk Management** 

Good — but I want to note for the record that we didn’t assume that explanation going in, we tested for it. The fact that this particular instance turned out to be operational rather than discriminatory doesn’t change that the monitoring did exactly what it was built to do, and the next anomaly in this pattern needs the same level of scrutiny before anyone calls it benign. 

### **Priya Ramanathan — Enterprise AI Architect** 

Agreed — I don’t want ‘turned out to be a training issue last time’ to become a reason to look less carefully next time. I’ll add manager-tenure-since-rotation as a tracked covariate in the standing override analysis going forward, precisely so this kind of explanation gets checked systematically rather than discovered by asking around after the fact. 

#### I **ARTIFACT: OPS-2026-Q4** 

### **Agentic Loan Underwriting Copilot — Quarterly Operating Review** 

_Q4 2026_ 

#### **THROUGHPUT** 

Average unambiguous-application decision time: 2.3 days to 6 hours. Underwriter capacity redirected to borderline/complex cases increased by approximately 35%. 

#### **DISPARATE IMPACT — RECOMMENDATIONS** 

Approval-recommendation rates by proxy geography and available demographic indicators within acceptable variance band for third consecutive quarter. 

#### **DISPARATE IMPACT — OVERRIDES** 

Elevated override rate in three branch territories investigated and attributed to concurrent manager rotation (operational, not applicant-population driven). Manager-tenure-since-rotation added as standing covariate in override analysis. 

#### **GOVERNANCE** 

Zero denial-side automation incidents (feature remains permanently out of scope). Feature-level proxy review conducted on one new candidate feature this quarter; feature rejected on historical-artifact correlation grounds. 

### **STAGE OUTCOMES** 

- I Override-pattern monitoring caught and correctly investigated an anomaly that recommendation-level metrics alone would never have surfaced 

- I Anomaly resolved as an operational adoption-curve effect rather than bias, but only after genuine investigation rather than assumed benign explanation 

- I Monitoring framework strengthened with a new standing covariate as a direct result of the investigation, rather than the finding being treated as closed once explained 

## **STAGE 6 — THE REQUEST TO EXTEND INTO DENIALS, REVISITED** 

_A year of clean data raises the same question the ARB asked at the start — answered the same way | Month 13 | September 2027_ 

#### _13:00 | Monday 13 September 2027 | Sterling National Bank, Executive Board Room_ 

#### **Annual Programme Review — Attendees: Priya (EA), Walter (CLO), Camille (MRM), Rosalind (Fair Lending)** 

### **Walter Hedges — Chief Lending Officer** 

Fourteen months of clean disparate-impact data, decision time down from over two days to under six hours on unambiguous applications, and the one anomaly we found turned out to be operational, not discriminatory. I want to bring the denial-side scope question back to the table — not full autonomy, but at minimum drafting adverse-action reason codes for underwriter review, the same review model we already use for approvals. 

### **Priya Ramanathan — Enterprise AI Architect** 

I understand why the track record makes this feel like the natural next step, but I want to name directly why I don’t think it follows, using the same reasoning the ARB used to exclude it originally: fourteen months of clean approval-side data tells us the system is trustworthy for approval-side decisions under approval-side legal standards. It tells us nothing about whether its reasoning would meet Regulation B’s specificity bar for an individual denial, because we’ve never tested that capability at all — it’s not a harder version of what we’ve validated, it’s a different regulatory and consumer-harm problem, exactly as Camille and Rosalind framed it at the ARB in February 2026. 

### **Dr. Camille Fontaine — Head of Model Risk Management** 

I’d support a dedicated, separately-scoped exploration of denial-side explainability as its own workstream, validated on its own terms against its own regulatory bar — not an extension of this system’s existing approval, but a genuinely new intake with its own ARB process. 

### **Rosalind Meyer — Fair Lending & Compliance Counsel** 

I want that recorded formally. Good performance on approvals is not evidence for denial-side readiness, and I don’t want next year’s review to treat another year of approval-side data as incrementally closing that gap — it doesn’t, because it isn’t measuring the same thing. 

### **Walter Hedges — Chief Lending Officer** 

Understood. I’d rather scope a proper new intake for denial-side explainability than treat this as a scope extension of something that’s already working well for a different reason. 

#### I **ARTIFACT: RDREC-2027-014** 

### **Annual Programme Governance Decision** 

_September 2027_ 

#### **DECISION** 

Agentic Loan Underwriting Copilot confirmed as steady-state production for approval-recommendation drafting. Denial-side reason-code drafting explicitly declined as a scope extension of this system; any future denial-side capability requires a new, independently-scoped intake and ARB process against Regulation B specificity requirements. 

#### **RATIONALE** 

Approval-side track record validates approval-side risk profile only; denial-side explainability presents a distinct regulatory and consumer-harm standard not exercised by this system’s operating history. 

#### **APPROVED BY** 

Walter Hedges (CLO), Dr. Camille Fontaine (MRM), Rosalind Meyer (Fair Lending Counsel) 

### **STAGE OUTCOMES** 

- I Denial-side scope extension declined for the second time, on the same principled grounds, despite a year of strong approval-side performance data 

- I "Good performance on approvals is not evidence for denial-side readiness" formally recorded to prevent gradual scope creep in future reviews 

- I Any future denial-side capability explicitly routed through independent intake rather than treated as an extension of the existing approved system 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2026-071)|Incubation|CLO, MRM, Fair Lending|
|Architecture Decision Record (ADR-2026-052)|Pitch / Approve|ARB, MRM, Fair Lending|
|Feature-Level Proxy Discrimination Review<br>(MRM-2026-018)|Design|Model Risk Management|
|Quarterly Operating Review (OPS-2026-Q4)|Operate|MRM, Fair Lending, Underwriting Ops|
|Annual Programme Governance Decision<br>(RDREC-2027-014)|Review|CLO, MRM, Fair Lending|

_“The model never once needed to know an applicant’s race to end up discriminating by it — that was always the danger. The job wasn’t building a system that was fair by accident. It was building one that stayed provably fair on purpose, quarter after quarter, including the quarters where nothing seemed to be going wrong.”_
