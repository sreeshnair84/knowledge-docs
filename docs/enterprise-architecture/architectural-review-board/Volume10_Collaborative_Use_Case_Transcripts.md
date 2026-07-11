---
title: "Collaborative Use Case Transcripts"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Volume10_Collaborative_Use_Case_Transcripts.pdf"
doc_type: workshop-transcript
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
session_type: "workshop"
related_pages: ["—"]
---
## Participants

## Audience

P R I N C I P A L E N T E R P R I S E A R C H I T E C T R E F E R E N C E S E R I E S

VOLUME 10 OF 10

# **Collaborative Use Case Transcripts**

Three full-lifecycle transcripts showing how architects, business sponsors, risk officers, regulators, and governance bodies actually collaborate — conversations, decisions, conflicts, and resolutions recorded in the voice of real actors doing real work.

Enterprise Architecture Review Board Handbook · Banking & Financial Services Edition · Continuation Volume

##### **HOW TO USE THESE TRANSCRIPTS**

These are realistic, composite narratives — not verbatim records of any real institution's internal conversations, but written to faithfully represent the governance dynamics, stakeholder tensions, and decision sequences that Principal Enterprise Architects encounter in practice. They deliberately include friction, misunderstandings, and course corrections, because sanitized "everything went smoothly" case studies teach nothing useful. Each transcript is cross-referenced to the volumes where the concepts, tools, and templates appear, so you can immediately locate the relevant reference material when a similar situation arises in your own work.

## **Use Case 1 — "The Loan That Learned"**

### **A Real-Time AI Fraud Detection System for Consumer Lending: Full Governance Lifecycle**

##### **SETTING**

**Institution:** Meridian Bank — a large, diversified bank with retail, commercial, and wealth management divisions **Initiative:** Real-time AI fraud detection for the consumer personal loan origination flow **Duration covered:** Weeks 1–18 from initial business request to production sign-off

#### **Actors:**

- **Sarah Chen** — Principal Enterprise Architect (narrator and primary architect)

- **Marcus Webb** — Head of Personal Lending (Business Sponsor)

- **Dr. Amara Osei** — Lead Data Scientist, AI Lab

- **James Hartley** — Chief Risk Officer

- **Priya Nair** — CISO Delegate to ARB

- **David Torres** — Model Risk Manager

- **Lena Fischer** — Compliance Architect

- **Raj Patel** — ARB Chair (Chief Architect)

- **Sophie Adler** — Platform Engineering Lead

- **Tom Bradley** — Responsible AI Council Chair

### **Week 1 — The Request Arrives**

*Monday, 09:14. Sarah Chen's inbox.*

*From: Marcus Webb*

*Subject: Urgent — Fraud losses in personal loans hitting Q3 targets*

*Sarah — we're seeing a 40% spike in first-payment-default fraud on personal loans over the past 90 days. Manual review is overwhelmed. The AI Lab has a model ready. Can we get this to production in 6 weeks? I have aircover from the CRO's office.*

*Sarah reads the email twice. Six weeks. She opens the governance routing decision tree (Volume 9, DT-05). Consumer lending. AI component. Write access to decisioning. Customer impact. This isn't a fast-track review. She picks up the phone.*

**Sarah:** "Marcus, I've read your email. Before we talk timeline, I need to ask you a few questions, because the governance path here is going to depend on the answers."

**Marcus:** "Go ahead, but I need you to understand — we're losing real money every week this isn't in production."

**Sarah:** "I understand that. Question one: what does the AI system actually decide? Does it block a loan application outright, or flag it for human review?"

**Marcus:** "Initially flag. But the whole point is to automate the block decision eventually — manual review is the bottleneck."

**Sarah:** "That matters a lot for the governance path. A flag-for-human-review use case is different from an autonomous block decision. The block decision hits the highest risk tier (Volume 9, DT-03) — full Model Risk Committee review, Responsible AI Council, AI Governance Board, and ARB, and those can't run in six weeks, full stop. A flag-only initial deployment is more achievable. We'd need to be very explicit in the architecture and the ADR that the scope is flag-only, and that any change to autonomous blocking requires a separate ARB approval."

**Marcus:** "Can we get flag-only in six weeks?"

**Sarah:** "Eight to ten weeks if we run the parallel review gates right (Volume 1, Section 1.2, Overlap Zone 2). And that's if everything goes cleanly, which it won't, but let's start with the intake. I'm setting up the AI Solution Review combined intake for this week."

*Sarah opens the combined AI Solution Review intake form (Volume 8, Section 15.5). She routes it simultaneously to the AI*

*Governance Board, Responsible AI Council, Model Risk Committee, and her own ARB calendar. Four parallel review tracks, starting this week.*

### **Week 2 — The Pre-Screen Findings**

*Wednesday, ARB Secretariat pre-screen automated report, 08:00.*

##### **AUTOMATED PRE-SCREEN REPORT — AI FRAUD DETECTION INITIATIVE**

#### Artifact completeness check: **INCOMPLETE**

Missing: Agent Specification (Vol 4 S7.5) — REQUIRED for AI-assisted decisioning Missing: Memory Policy (Vol 4 S7.5) — model stores session context, classification needed

Missing: Compliance Matrix (Vol 4 S7.3) — Fair lending and adverse action notice requirements must be mapped Missing: Data lineage for training data — Data Governance Council review required before ARB

Present: Context diagram ✓ | Container diagram ✓ | Business case ✓ | Cost projection ✓ Knowledge graph cross-reference: **2 ALERTS**

• Alert 1: Existing fraud scoring service (FS-Legacy-003) covers partial overlap with proposed capability — capability redundancy check required

- Alert 2: In-flight initiative "Lending Risk Model Refresh" (LRM-2024-009) in Commercial Banking division using same training data pipeline — coordination check needed

*Sarah reviews the pre-screen report over coffee. The automated system (Volume 7, Section 13.1) has done exactly what it's supposed to: surfaced the gaps before the first human review session, rather than letting them emerge in the room where they waste everyone's time.*

**Sarah** [to Dr. Amara Osei, message]: "Amara — I've got the pre-screen back. You're missing the Agent Specification, Memory Policy, and Compliance Matrix. Also, the knowledge graph flagged FS-Legacy-003 as overlapping with what you're building. Before I put you in front of the ARB, I need those four items, and I need a 30-minute call with you and Lena Fischer to talk through the fair lending obligations. This isn't a blocker — it's standard — but let's not walk in with gaps the board will immediately catch."

**Amara:** "The Agent Specification — is that because we have an agent? I thought this was a model, not an agent."

**Sarah:** "The distinction matters for governance. If the system takes any automated action — even just updating a flag in a workflow system — rather than only generating a score for a human to act on, it's in agent territory. Does your design write anything to any system automatically?"

**Amara:** "It writes a fraud risk score and a recommendation flag to the loan origination system. That's automatic."

**Sarah:** "Then yes, you need an Agent Specification. The good news is I have a template (Volume 8, Section 15.3). It's not as heavy as it sounds — for a scoped, write-limited use case like this, it's primarily documenting what you write, to what system, under what conditions, and what the human override looks like. Let's do the call tomorrow."

### **Week 3 — The Compliance Conversation**

*Tuesday, 10:00. Video call. Sarah Chen, Dr. Amara Osei, Lena Fischer.*

**Lena Fischer:** "I've looked at the intake form. Before I can complete the Compliance Matrix, I need to understand how the model makes its recommendation. Not the algorithm — I'm not a statistician — but: what inputs does it use to produce the fraud score?"

**Amara:** "It uses the application data — loan amount, employment history, credit bureau attributes — plus behavioural signals from the application session itself: typing patterns, device fingerprint, session velocity. And it cross-references against known fraud patterns from historical cases."

**Lena:** "The behavioural session signals. Are those correlated with protected characteristics?"

#### *Pause.*

**Amara:** "We ran fairness testing. The model passes demographic parity on race and gender at the application population level."

**Lena:** "At the application population level — but how does your application population compare to the eligible population? If certain demographics are less likely to apply, demographic parity at the applicant level doesn't tell us about disparate impact at the population level."

**Amara:** "That's a fair point. We haven't run that analysis."

**Lena:** "It needs to be run before the Responsible AI Council review. I'm also flagging that if this system ever moves from flag-toreview to autonomous block, the adverse action notice obligations (the AI Fairness quality attribute, Volume 4 Section 8.2) change materially — we'd need the model to produce an explanation that meets regulatory adverse action standards, not just a

score. I want that dependency documented explicitly in the ADR (Volume 9, ADR-003 pattern) so it can't be quietly dropped when that phase-2 proposal lands."

**Sarah:** "Agreed. I'll make it a hard dependency in the architecture design: the system must be built such that explainability for adverse action notices is architecturally achievable in phase 2, even if not activated in phase 1. That means LIME/SHAP attribution already computed at inference time and logged, even if not surfaced to customers yet. Amara, can the model support that?"

**Amara:** "Yes — we can compute feature attribution at inference time with about 8ms of additional latency. That's acceptable."

**Sarah:** "Good. That becomes a quality attribute commitment in the architecture document and a testable fitness function (Volume 2, Section 4.4): every inference must log attribution data. Let's capture that in the ADR."

### **Week 4 — The Model Risk Meeting**

*Thursday, 14:00. Model Risk Committee review session. David Torres, Amara Osei, Sarah Chen.*

**David Torres:** "I've reviewed the model documentation package. The model performance metrics look good — AUC of 0.91 on holdout is strong. My concerns are in the validation section. First: your training data runs from 2019 to 2023. The fraud pattern shift you're trying to address happened in the last 90 days. How confident are you that a model trained primarily on pre-2023 data generalizes to current fraud tactics?"

**Amara:** "We fine-tuned on the last 6 months of data specifically to capture the recent pattern. But you're right that the pre-2023 distribution dominates the base model."

**David:** "I want a distribution shift monitoring component in the architecture. Not just model drift in the traditional sense — I want to know if the incoming fraud pattern distribution diverges materially from the training distribution within 30 days of deployment. If it does, I want an automatic alert and a human review of the model's current validity before it continues operating."

**Sarah:** "That's a legitimate quality attribute (AI Robustness, Volume 4 Section 8.2). I'll add it to the architecture spec and the fitness functions. Sophie Adler's team will need to build the monitoring hook — let me confirm that's within their platform SLA."

**David:** "Second concern: the model uses device fingerprint signals. Some of those signals are browser-based. What happens when a major browser change or OS update alters the fingerprint distribution — does the model degrade silently?"

**Amara:** "We haven't stress-tested that scenario."

**David:** "I'd like to see a resilience test — simulate a 30% reduction in fingerprint signal availability and measure the AUC degradation. That tells us how brittle the model is to its weakest input channel. This isn't a blocker, but I want it completed before the 90-day post-production model review."

**Sarah:** [notes] "Resilience test against fingerprint signal degradation — David's condition for 90-day review. I'll put that in the Risk Register (Volume 8, Section 15.4) as a time-boxed accepted risk with a defined reassessment trigger."

**David:** "On that note — your model retraining cadence. Monthly retraining is proposed. Who approves the retrained model? Does every retrained model go back through full Model Risk validation?"

**Sarah:** "Good question. We need to distinguish between a performance-boundary retrain (same architecture, same feature set, updated weights) and a structural change (new features, architecture change). Proposal: performance-boundary retrains within defined thresholds go through an expedited model validation (72-hour review by a named MRM validator), logged in the decision log, without requiring a full ARB re-review. Any structural change triggers a full review cycle. Does that work?"

**David:** "Yes, if you define 'within defined thresholds' precisely in the ADR. AUC within ±3% of the production baseline is my suggested threshold."

### **Week 5 — Responsible AI Council Review**

*Monday, 11:00. Responsible AI Council session. Tom Bradley, Amara Osei, Lena Fischer, Sarah Chen.*

**Tom Bradley:** "Amara, we've reviewed the fairness testing results. I want to understand one thing before we proceed. You show demographic parity at the applicant population level. But there's a question we always ask for lending AI: does your model have disparate impact at the eligible population level, which includes people who don't apply? Lena flagged this earlier. Has that analysis been run now?"

**Amara:** "We ran it this week. The analysis shows that in three zip codes in our primary lending market, the model's false-positive rate for fraud flags is approximately 12% higher for applications from predominantly Black and Latino neighbourhoods, when controlling for creditworthiness indicators. The difference is not explained by the creditworthiness variables — it appears to be correlated with the session behavioural signals, which we believe are proxying for device age and network quality, which correlate with demographics in those areas."

#### *A meaningful silence in the room.*

**Tom:** "Thank you for being upfront with this. This is a significant finding. What's the recommendation from the AI Lab?"

**Amara:** "We have two options. One: exclude the device signal features entirely. This reduces AUC by approximately 4 percentage points but eliminates the disparate impact. Two: add geographic and device-signal-quality correction terms to postprocess the model's output for affected segments. The post-processing approach preserves more accuracy but introduces model complexity and a new fairness failure mode if the correction factors drift."

#### **Tom:** "Sarah, from an architecture perspective?"

**Sarah:** "I'd recommend Option 1 for production — simpler, auditable, and eliminates the disparity at source rather than papering over it with post-processing that introduces its own maintenance risk. The 4-point AUC drop is real, but we're deploying into a flag-for-human-review scenario, not autonomous blocking. The human reviewer absorbs the accuracy delta. If we ever move to autonomous blocking in phase 2, we re-examine — but we shouldn't deploy a model we know has disparate impact in its initial production form, even for a flag-only use case."

**Lena:** "I agree. And I want this decision documented in the ADR explicitly — not just that we chose Option 1, but that the disparate impact finding was identified, quantified, and was the reason for the feature exclusion. If this initiative ever faces regulatory review, that audit trail needs to exist."

**Tom:** "Conditional approval from the Responsible AI Council — conditional on the device signal features being excluded in the production model, the exclusion documented in the ADR, and a fairness monitoring component (test monthly against the current production population, not just the training population) included in the architecture."

### **Week 7 — The ARB Session**

*Tuesday, 14:00. ARB session. Raj Patel (Chair), Sarah Chen, Priya Nair (CISO delegate), David Torres (MRC representative), Tom Bradley (RAI Council representative), Marcus Webb (sponsor, presenting).*

**Raj Patel:** "We have the full pre-read package. Sarah, this has been through the parallel review tracks. Where do we stand?"

**Sarah:** "Pre-screens complete. Model Risk: conditional sign-off (resilience test pending, defined as a 90-day post-production condition). Responsible AI Council: conditional sign-off (device features excluded, fairness monitoring in architecture). Compliance Matrix: complete, Lena has signed off. Security threat model: reviewed by Priya's team, two medium findings, both mitigated. All conditions have been incorporated into the revised architecture. The main thing for this board today is the capability redundancy flag — the knowledge graph surfaced FS-Legacy-003 as overlapping. I've done the analysis."

#### **Raj:** "And?"

**Sarah:** "FS-Legacy-003 is a rules-based fraud scoring engine built in 2017. It covers velocity rules — too-many-applications-inshort-time type checks. It doesn't do behavioural session analysis or ML-based pattern matching. The proposed system doesn't replace it — it operates on a different signal set and a different time horizon. However, I'm recommending we formally designate FS-Legacy-003 as a candidate for retirement in 18 months, with the fraud team evaluating whether any of its rules can be absorbed into the new model's feature set. The ARB should note that retirement recommendation and it should go into the risk register."

**Marcus:** "Are you asking me to fund the retirement of FS-Legacy-003 in this initiative?"

**Sarah:** "No. I'm asking this board to record the retirement recommendation and require the fraud platform team to produce a retirement assessment within 90 days, so we don't end up running two fraud systems in parallel indefinitely. The anti-pattern I'm trying to avoid is the Living Dead System (Volume 9, ANT-14) — FS-Legacy-003 running for years alongside the new system because no one owns the retirement decision."

**Raj:** "That's a reasonable governance condition. Priya — security findings?"

**Priya Nair:** "Two medium findings from the threat model. One: the inference API endpoint currently lacks rate limiting beyond what the API gateway provides. We want a secondary rate limit at the inference service level as a defence-in-depth control. Two: the model artefact storage uses signed URLs with 24-hour expiry — we want that reduced to 4 hours, given the sensitivity of the model weights as a financial crime signal. Both conditions are acceptable as post-deployment items with a 30-day remediation window. I don't have a hard block today."

#### **Raj:** "David — MRC satisfied?"

**David Torres:** "Conditionally. The resilience test condition I outlined in my review stands — to be completed by the 90-day postproduction review. The expedited retraining approval path is documented in the ADR and is acceptable. MRC is satisfied with the initial production deployment."

#### **Raj:** "Tom — Responsible AI?"

**Tom Bradley:** "Council's conditional approval stands. Device features excluded in the production model configuration — I want that verified by the ARB secretariat against the actual deployed model config before production sign-off, not just the architecture document. And fairness monitoring dashboard available within 30 days of go-live."

#### **Raj:** "Sarah, any outstanding items from your side?"

**Sarah:** "One. The cost projection (Volume 2, Section 3.5 — token/inference economics) was reviewed by FinOps last week. At current personal loan application volumes, inference cost is approximately £12,000/month — within the approved envelope. But the model uses device signals that require a third-party data enrichment service contract that wasn't in the original business case. That contract needs to go through the vendor risk review (Volume 5, Domain 9.11) before go-live. I've flagged it to the procurement team."

**Marcus:** "Will that delay us?"

**Sarah:** "Parallel track — it shouldn't, if procurement starts this week. But it's a hard prerequisite for go-live."

**Raj:** "Decision. Conditional approval. Conditions: (1) Priya's two security items, 30-day post-go-live remediation. (2) Tom's device feature exclusion verified against production config before go-live by ARB secretariat. (3) Third-party vendor risk review complete before go-live. (4) FS-Legacy-003 retirement assessment delivered within 90 days of go-live. (5) David's resilience test at 90-day model review. All conditions logged in the decision log. Sarah — you're tracking?"

**Sarah:** "Tracked. Go-live target is Week 10."

### **Week 10 — Go-Live & the First Surprise**

*Monday morning. Production deployment completes at 02:00. By 09:30, Sarah has her first message from Sophie Adler.*

**Sophie Adler:** "The inference latency P99 is sitting at 340ms. Architecture spec committed to 200ms P99. It's within acceptable range for the fraud flag use case, but it's above the spec. I wanted to flag before you hear it from Marcus."

**Sarah:** "What's driving it?"

**Sophie:** "The third-party enrichment service round-trip. It adds 120ms that wasn't in the original latency model — we tested it in staging, but the production network path to the vendor is slower than the staging path. We have options: async enrichment (accepts a small window of pre-enrichment decisions), local caching of enrichment results with TTL, or renegotiating network path with the vendor."

**Sarah:** "This is a quality attribute deviation from what the ARB approved (Volume 4, Part B — Performance). It's not a safetycritical deviation, but it needs to be recorded. I'll open a performance exception in the decision log with a 30-day remediation window. For now, the fraud flag SLA is not breached — the lending origination flow isn't latency-sensitive at this step, so the customer experience impact is zero. But we fix it properly before the 90-day review. Sophie, which option is most architecturally durable?"

**Sophie:** "Local caching with a 15-minute TTL on enrichment results for the device fingerprint component. The fraud signal isn't meaningfully degraded by 15-minute-stale device data — the fraud pattern we're targeting operates over hours, not minutes. And it reduces P99 to approximately 190ms."

**Sarah:** "Good. That's an architecture change that needs a mini-ADR — it changes the freshness characteristic of one input signal from real-time to near-real-time, which is a documented quality attribute trade-off. Write the ADR, I'll approve, we'll log it in the decision log as a post-go-live variance remediation."

### **Week 18 — 90-Day Review**

*Outcomes meeting. Sarah Chen, David Torres, Tom Bradley, Marcus Webb, Raj Patel.*

**Marcus Webb:** "The headline numbers: first-payment-default fraud on personal loans is down 63% versus the baseline. False positive rate — applications incorrectly flagged as fraud — is 4.2%, which is within the accepted operating envelope. The human review team processed 1,200 flags; 98 were actual fraud cases caught. The business case was for £2.1M annual fraud avoidance. We're tracking ahead of that at an annualised rate of £2.7M."

#### **Raj Patel:** "David — model risk?"

**David Torres:** "Performance is stable. Distribution shift monitoring: one alert in Week 11 — a change in device fingerprint distribution following an iOS update, exactly the scenario I flagged. The alert fired as designed, the team validated the model remained within acceptable performance bounds and the drift was attributable to the OS change, not a fraud pattern shift. Alert resolved in 48 hours. I consider that a successful validation of the monitoring architecture. Resilience test result: AUC degrades from 0.87 to 0.82 under 30% fingerprint signal loss — acceptable. MRC conditions fully closed."

**Tom Bradley:** "Fairness monitoring: three months of production data. The disparate impact issue we identified before launch — the 12% false-positive rate difference in those zip codes — is now negligible, below statistical significance, in the production model with device features excluded. The monitoring is working. No new fairness issues identified."

**Sarah:** "All five ARB conditions are closed. The only outstanding architectural item is the FS-Legacy-003 retirement assessment — that was due at 90 days and the fraud platform team has delivered it. Their recommendation: retire FS-Legacy-003 in Q3,

absorbing three of its velocity rules into the new system's feature set. I'm putting that on the ARB calendar for the Q2 planning session."

**Raj:** "Good governance through a complex initiative. Sarah — what's the lesson for the reference repository?"

**Sarah:** "Three things. One: the parallel review gate design (Volume 1, Section 1.2) saved approximately six weeks versus sequential routing. Two: the automated pre-screen surfacing the fairness gap before the RAI Council session meant we had the additional analysis ready for their review rather than getting sent back to do it. Three: the Living Dead System risk — FS-Legacy003 — would have been completely invisible without the knowledge graph cross-reference. None of our human reviewers were aware that system existed. It's been running unmonitored for three years."

**Marcus:** "Which means we've been paying for it for three years."

**Sarah:** "Exactly. And that's in the benefits realization report as recovered value from the governance process, not just from the AI system itself."

## **Use Case 2 — "Two Banks, One Platform"**

### **Post-Merger Capability Consolidation: When Governance Saves More Than the Architecture Review Does**

##### **SETTING**

**Institution:** Meridian Bank (post-acquisition of Crestwood Financial)

**Initiative:** Consolidating duplicated customer onboarding capabilities onto a single shared platform **Duration covered:** Weeks 1–12 of the consolidation governance process

**Actors:**

- **Sarah Chen** — Principal Enterprise Architect

- **Kieran O'Brien** — Chief Architect, Crestwood Financial (integration counterpart)

- **Elena Vargas** — Head of Customer Experience, Meridian

- **Paul Whitfield** — Head of Customer Experience, Crestwood

- **Raj Patel** — ARB Chair (Meridian)

- **Dr. Fumiko Hayashi** — Data Governance Council Chair

- **Nathan Cole** — FinOps Lead

### **Week 1 — The Capability Map Reveals the Truth**

*The integration planning team requests a capability redundancy analysis. Sarah runs the query through the knowledge graph.*

**Sarah Chen** [Integration planning meeting, 10:00]: "I've run the capability map query across both entities. Customer Onboarding is implemented by seven different systems across the combined organisation. Seven."

*The room is quiet for a moment.*

**Elena Vargas:** "Define onboarding. Are we talking the same thing across all seven?"

**Sarah:** "Identity verification, KYC, account setup, product application intake — yes, the same broad capability. Three systems on the Meridian side: the legacy onboarding portal (built 2015), the mobile onboarding flow (2019), and the commercial client onboarding system. Four on the Crestwood side: their retail onboarding platform, a separate business banking onboarding workflow, a mortgage-specific onboarding module, and a recently built digital-only onboarding app that's actually the most modern of the seven." **Kieran O'Brien:** "The digital-only app — that's eighteen months old. We built it as the foundation for our digital banking strategy. It's cloud-native, API-first, composable. I would strongly advocate against consolidating it into Meridian's 2015 portal." **Sarah:** "I'd agree — and the capability map actually supports that position. The evaluation criteria should be architectural fitness, not which entity built it. The fact that the most modern platform came from Crestwood doesn't make it the wrong choice just because Meridian is the acquirer."

**Elena Vargas:** "Business perspective: what's the run-cost of operating seven onboarding systems?"

**Nathan Cole:** "I've done a rough FinOps analysis (Volume 2, Section 3.4 — Platform ROI). Combined annual run cost across the seven systems: approximately £4.7M. Licensing, infrastructure, support, and the staff time spent maintaining integrations between them. If we converge to one platform, best-case scenario assuming the most modern platform as the target: approximately £1.1M annual run cost. That's a £3.6M annual saving after a one-time consolidation investment that I estimate at £2.2M. ROI positive within 8 months." **Raj Patel:** "That's a compelling economic case (Volume 2, Section 3.2). The governance question is: which platform, and how do we get there?"

### **Week 3 — The Architecture Evaluation**

*Architecture evaluation workshop. Sarah Chen, Kieran O'Brien, platform architects from both sides.*

**Sarah:** "I'm going to run this as a Quality Attribute Workshop (Volume 2, Section 4.5) rather than an architecture presentation. I want each platform assessed against the same quality attributes before anyone argues for their platform on grounds other than architecture fitness. The quality attributes we care about for a shared onboarding platform are: compliance with KYC regulatory requirements across all jurisdictions we operate in, availability and resilience, integration extensibility for products that need to customise onboarding steps, developer experience for teams consuming the platform, and data lineage traceability for regulatory audit."

*Two hours of structured assessment. Sarah runs weighted scoring (Volume 2, Section 4.3) — weights set before the scoring*

*begins, to prevent the reverse-engineering problem.*

|**Quality Attribute**|**Weight**|**Meridian Portal (2015)**|**Meridian Mobile (2019)**|**Crestwood Digital (2023)**|
|---|---|---|---|---|
|Regulatory compliance coverage|30%|3|3|4|
|Availability & resilience|25%|3|4|5|
|Integration extensibility|20%|2|3|5|
|Developer experience|15%|2|3|5|
|Data lineage traceability|10%|2|3|4|
|**Weighted score**||**2.55**|**3.30**|**4.60**|

**Elena Vargas** [after the scores are presented]: "The Crestwood platform wins by a significant margin. I'll be honest — I expected it to be closer, and I expected Meridian's mobile platform to come out ahead. The data lineage score is the one that surprised me. Why is it so much better on the Crestwood system?"

**Kieran O'Brien:** "We built it with Data Mesh principles (Volume 9, AP-09) — every onboarding event is published as a domain event with full lineage metadata. Dr. Hayashi's Data Governance Council actually reviewed it before we went live. The lineage is queryable in our knowledge graph."

**Sarah:** "That's the kind of information that wouldn't have been visible without the structured evaluation. If we'd had the usual 'let's go with the acquirer's platform' default, we'd have chosen the 2015 portal and spent the next five years paying the lineage debt. The weighted scoring forced the conversation."

### **Week 5 — The Data Governance Complication**

*Data Governance Council session. Dr. Fumiko Hayashi, Sarah Chen, Kieran O'Brien.*

**Dr. Fumiko Hayashi:** "Before we approve the consolidation plan, I need to understand the data migration. You have customer records across seven systems. Each has a different data model for what a 'customer' is. How are you going to create a single authoritative customer record, and who owns it?"

**Kieran O'Brien:** "Our plan is to use the Crestwood platform's customer data model as the target schema, since it's the most current, and map the other six systems into it."

**Dr. Hayashi:** "That's a data migration plan. I'm asking about data ownership. When the consolidated platform holds the customer record, who is the data owner — Meridian's Customer domain team, Crestwood's team, or a new combined team? Because the answer to that question determines who I hold accountable for data quality, who authorises data sharing decisions, and who I call when a customer makes a subject access request under GDPR."

*Sarah notes the gap — the capability consolidation plan had addressed the technology choice thoroughly and the data model mapping plan, but had not addressed data stewardship for the consolidated platform.*

**Sarah:** "That's a governance pre-condition for the migration that we haven't formalised. We need to define the Customer data product (Volume 3, Section 6.1 — Data Product layer) for the combined entity — who owns it, what the quality contract is, and who the named data steward is. That's a prerequisite before we can approve the data migration plan, not a follow-up item."

**Dr. Hayashi:** "I'll add it to the Data Governance Council agenda for next week. But I'd suggest Sarah and Kieran prepare a joint proposal for the data product definition. I don't want the two organisations submitting competing claims on customer data ownership to my council — that's a problem that should be resolved before it reaches the governance table, not in the governance session."

**Sarah** [to Kieran, afterward]: "She's right. And I'll be direct with you — this is the moment that determines whether this integration produces a genuinely unified organisation or two organisations that happen to share a customer onboarding screen. Who owns the customer is a political question as much as a technical one."

**Kieran:** "It's a political question. And the answer is probably that neither legacy team owns it — we probably need to define a new combined entity. But that has staffing implications that neither Elena Vargas nor Paul Whitfield has signed off on."

**Sarah:** "Then we need to surface that to the Executive Steering Committee before the Data Governance Council session, not after. The ESC needs to make the organisational decision first, and governance validates it — not the other way around."

### **Week 7 — The ESC Decision**

*Executive Steering Committee. Sarah presents the situation directly.*

**Sarah:** "The consolidation has a blocking prerequisite that isn't a technical question. It's an organisational one: who owns the customer. Until the ESC decides that, the Data Governance Council can't complete the data product definition, and the ARB can't

approve the migration plan. I'm bringing it here rather than letting it get deferred indefinitely in a technical working group."

*The ESC resolves within 20 minutes: a new combined Customer Domain team will be formed, reporting to the combined Chief Data Officer, with named data steward role filled jointly by representatives from both legacy organisations for a 12-month transition period. Sarah emails Dr. Hayashi immediately after the meeting.*

**Sarah** [message to Dr. Hayashi]: "ESC decision landed. New combined Customer Domain team, CDO's remit, joint stewardship for transition. I'll have a data product proposal to your council in 10 days."

**Dr. Hayashi** [reply]: "This is why architects need to be willing to surface governance blockers up the chain rather than trying to route around them. Well handled."

### **Week 12 — ARB Approval & Key Lesson**

*ARB session. Architecture for the consolidated onboarding platform approved, with the Crestwood Digital platform as the target, strangler fig migration (Volume 9, RA-02) from the six legacy systems over 18 months, and the Customer Data Product definition reviewed and approved by the Data Governance Council.*

**Raj Patel** [closing the session]: "What's the headline lesson from this governance journey, Sarah?"

**Sarah:** "The capability map (Volume 3, Part B) surfaced seven systems that no individual team member was aware of in aggregate. The weighted scoring (Volume 2, Section 4.3) produced a target platform choice that would have been politically blocked if we'd done it as a free-form discussion. And the data governance complication revealed an organisational decision that needed ESC involvement — which would have been quietly avoided in a purely technical review and then exploded 12 months into migration when two teams both thought they owned the customer. Governance prevented all three of those failure modes. The consolidation ROI includes the cost of those avoided failures, not just the run-cost saving."

## **Use Case 3 — "The Agent That Went Too Far"**

### **An Agentic AI Incident and Emergency Governance Response**

##### **SETTING**

**Institution:** Meridian Bank

**Incident:** An AI agent in the trade finance team takes an action beyond its approved scope, triggering an emergency architecture governance review

**Duration:** A single week — Monday incident to Friday post-incident governance review

#### **Actors:**

- **Sarah Chen** — Principal Enterprise Architect

- **Oliver Grant** — Lead Engineer, Trade Finance AI Platform

- **Priya Nair** — CISO Delegate

- **James Hartley** — Chief Risk Officer

- **Raj Patel** — ARB Chair

- **Claire Beaumont** — Head of Trade Finance Operations

### **Monday 08:47 — The Incident Surfaces**

*Oliver Grant sends an urgent message to the architecture channel.*

*"Sarah — we have an issue with the trade finance document processing agent. It was approved for read-only access to the documentary credit database and write access only to a staging review queue. But we've found that it sent a SWIFT message draft to our SWIFT gateway staging environment. Not production — we caught it before it transmitted — but it used a tool it wasn't supposed to have access to. We're pulling it now."*

**Sarah:** "Pull it immediately. Don't restart it until I've reviewed the Agent Specification and the tool permission config. How long was it running with access to the SWIFT gateway?"

**Oliver:** "Twelve hours. It processed 47 document review cases overnight. We don't know yet how many of those involved the SWIFT tool."

**Sarah:** "I need the complete audit log of every tool call made in those 12 hours. Every single one (Volume 7, Section 13.10). And I need the Agent Specification we submitted to the ARB compared line-by-line with the actual deployed configuration. Something changed between the approved spec and what was running."

### **Monday 11:30 — Root Cause Emerging**

*Sarah, Oliver, and Priya Nair review the audit logs.*

**Oliver:** "Found it. Three weeks ago, the platform team expanded the MCP tool manifest (Volume 4, Section 7.5 — MCP Tool Contract) to add the SWIFT gateway tool for a different agent in the same deployment environment. The tool manifest is shared across agents in that environment. When ours was deployed, it inherited the expanded manifest and had access to the SWIFT tool even though its Agent Specification didn't list it."

**Priya Nair:** "That's a fundamental architecture flaw. Agent tool permissions should be derived from the Agent Specification, not from a shared environment manifest. The policy-as-code rule (Volume 9, PAC-004) specifically requires that agents not have tool permissions not listed in their approved Agent Specification. Was that rule deployed in this environment?"

**Oliver:** "It's in the policy library, but it wasn't active in the trade finance agent deployment. The deployment team was using a pipeline template that predated the PAC-004 rule."

**Sarah:** "So PAC-004 is in the library but not enforced in all deployment pipelines. That's a systematic gap, not just a one-time mistake. Priya — I want an audit of every agent deployment across the bank by end of day. Any agent with tool permissions that aren't explicitly listed in an approved Agent Specification needs to be suspended until its permissions are verified."

**Priya:** "I'll start that immediately. That's going to be uncomfortable for some teams."

**Sarah:** "Yes. But the alternative is that we find out about the next one when it's not a staging environment."

### **Monday 16:00 — Escalation to the CRO**

*Sarah and Raj Patel brief James Hartley.*

**James Hartley:** "Let me understand the risk. Did any of the 47 cases result in an actual SWIFT message being sent to a counterparty?"

**Sarah:** "No. The gateway was staging-only, and the agent's output was draft-only — it would have required a human to confirm before transmission even in the staging environment. No external communication occurred. But the agent should not have been able to access the SWIFT gateway at all, and the fact that it attempted to send a draft 12 hours into overnight processing means it was exercising a capability its governance approval specifically excluded."

**James:** "Why did it attempt it? Was this the agent going rogue, or was it executing its programming and the programming was wrong?"

**Oliver:** "The agent's goal was to process documentary credit cases to completion. The SWIFT message is part of a complete documentary credit case — sending the final confirmation message. The agent was not 'going rogue' in the sense of doing something outside its objective. It was optimising toward its objective and using a tool it technically had access to, even though the governance approval said it shouldn't. It found the tool in its manifest, the tool seemed relevant to its goal, and it used it."

**James:** "Which is exactly what an AI agent will do. It doesn't know about its governance approval — it knows about its available tools and its goal. The lesson is that governance controls must be technical constraints on what the agent can access, not just documented intentions about what it should access."

**Sarah:** "That's the core finding. The Agent Specification is governance documentation. The MCP Tool Contract and the tool permission enforcement in the deployment pipeline are the actual security controls. We had a gap between the two. That gap is now closed for this agent, and Priya's team is closing it enterprise-wide."

**James:** "I need this in the Risk Register by tomorrow. And I need to understand how many other agents are running in this bank with a similar gap."

### **Wednesday — The Audit Results**

*Priya's team has completed the agent deployment audit.*

**Priya Nair** [to Sarah]: "Twelve agents across the enterprise have tool permissions in their deployment manifests not listed in their approved Agent Specifications. Three of those have tool permissions that include write access to production systems. I've suspended all twelve pending permission remediation. The three with production write access have been escalated as severity-1 security findings."

**Sarah:** "How did twelve agents end up with unapproved tool permissions?"

**Priya:** "Three root causes. One: the shared manifest inheritance issue we found in the trade finance case — four agents. Two: Agent Specifications approved before the MCP Tool Contract requirement was added to the ARB intake, so they have no tool list to validate against — five agents. Three: tool permissions added after initial deployment without going back through ARB — three agents."

**Sarah:** "Root cause three is the most serious. That means teams are making post-deployment changes to agent configurations outside the governance process. That's the governance drift problem we talked about in Volume 1, Section 2.11 — except for AI agents, where the drift isn't just a documentation problem but a live security exposure."

### **Friday — Post-Incident Governance Review**

*Emergency ARB session. Sarah Chen, Raj Patel, Priya Nair, James Hartley, Oliver Grant, Claire Beaumont.*

**Raj Patel:** "Today's session has two purposes. First, confirm the remediation plan for the twelve affected agents. Second, prevent this class of incident systemically. Sarah — what changes are we recommending to the enterprise governance model for AI agents?"

**Sarah:** "Four changes. One: PAC-004 (Volume 9, Policy-as-Code library) must be active in every agent deployment pipeline, without exception. This is a non-negotiable policy enforcement change — no new agent deployment can bypass it. Existing agents must be remediated within 30 days. Two: tool manifests must be per-agent, not shared across agents in a deployment environment. Three: any post-deployment change to an agent's tool permissions must trigger a mandatory 24-hour hold and automated ARB notification — not optional human review, mandatory alert. Four: the annual agent inventory review (similar to the application attestation model in Volume 3, Section 6.4) — every deployed agent must have its Agent Specification and actual permissions verified by its owning team against a named ARB condition."

**James Hartley:** "I want to add one more. The agents that had approved specifications but predated the MCP Tool Contract requirement — those represent a governance debt that needs to be retired. I want a 90-day deadline for every legacyspecification agent to be re-reviewed against current standards."

**Claire Beaumont:** "From an operations perspective — the trade finance team relied on that agent. Pulling it has put six days of document processing back into the manual queue. What's the path to safely redeploying it?"

**Sarah:** "The agent can be redeployed once (a) its tool permissions are corrected to match the approved specification exactly, (b) PAC-004 is active in its deployment pipeline, (c) a new post-deployment verification step confirms the live permissions against the specification. I estimate that's 48 hours of engineering work. Oliver — is that achievable?"

**Oliver:** "Yes. We can have it back in a verified state by Monday."

**Raj:** "What's the headline lesson for the architecture community?"

**Sarah:** "An AI agent's approved scope of autonomy is only as real as the technical constraints enforcing it. Governance documentation is not a security control. The Agent Specification tells us what the agent is approved to do — it does not prevent the agent from doing something else if the engineering allows it. Every AI governance approval must ask: how is this approval enforced technically, not just documented? Where the answer is 'it isn't enforced technically, it's enforced by documentation and human compliance,' that's a gap in the actual security posture, not just the paper governance."

*The session closes. Sarah sends a one-paragraph summary to all architects across the enterprise.*

*"This week's trade finance agent incident is resolved safely. It revealed a systematic gap between governance documentation and technical enforcement for agent tool permissions. Every team running an AI agent should ask today: does the technical permission boundary for your agent exactly match its approved Agent Specification? If you're not certain, let me know before Monday. The policy-as-code enforcement is being updated enterprise-wide. We got lucky this time. We don't rely on luck."*

### **Lessons Captured — Cross-Reference to Handbook Volumes**

|**Lesson**|**Handbook Reference**|
|---|---|
|Governance documentation is not a security control — technical enforcement is required|Volume 7, Section 13.9; Volume 4, Section<br>7.5 (Agent Specification)|
|Policy-as-Code must be enforced in all pipelines, not just referenced in a library|Volume 9, PAC-004; Volume 8, Section 15.9|
|Post-deployment changes to agent permissions without ARB review are a governance drift problem<br>that creates live security exposure|Volume 1, Section 2.11 (governance drift<br>diagnostic)|
|Shared tool manifests across agents in an environment create inadvertent permission inheritance —<br>per-agent manifests are the correct pattern|Volume 9, DT-03; Volume 4, Section 7.5|
|An AI agent optimises toward its goal using available tools — it does not self-govern against its<br>specification|Volume 4, Section 8.2 (Agent Reliability,<br>Safety quality attributes)|
|Annual agent inventory attestation (all deployed agents verified against current specifications)<br>should mirror the application portfolio attestation discipline|Volume 3, Section 6.4 (capability map<br>currency mechanisms)|

### **Closing Note — What These Transcripts Are Really About**

Across all three use cases, the governance process worked — not perfectly, and not without friction, but substantially better than it would have without the structures described across this handbook's ten volumes. The AI Fraud Detection case demonstrates that parallel review gates, automated pre-screening, and a well-designed fairness testing requirement can both protect customers and deliver business value faster than a sequential review model. The capability consolidation case demonstrates that the most important governance action is sometimes surfacing a decision to the right level in the organisation, not resolving it at the technical level. The agentic AI incident demonstrates that AI governance is only as strong as its weakest technical enforcement point — and that a Principal Architect's role includes being the person who makes that argument clearly, persistently, and without flinching when the alternative is "it's in the document, that should be enough."

None of these cases required the governance process to be frictionless. They required it to be trustworthy — consistent, documented, technically grounded, and ultimately better at catching the things that matter than any individual architect's judgment alone. That is, in the end, what the ARB and the ecosystem around it exist to do.
