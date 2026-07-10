---
title: "One Conversation, Five Specialist Brains"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_04_Northline_Customer_Service_Agents.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

# **One Conversation, Five Specialist Brains** 

Building a Multi-Agent Customer Service Orchestrator Inside a Telecom Carrier 

A transcript-style account following Yara Haddad, Enterprise AI Architect at Northline Telecom, as she replaces a nine-percent-resolution chatbot with a five-domain specialist agent system — while keeping a documented social-engineering risk category permanently out of autonomous scope. 


## Cast of Characters

| Character | Role |
|-----------|------|
| **Yara Haddad** ⭐ | Enterprise AI Architect, Customer Experience (EA) — our protagonist |
| **Big Tom Reilly** | Chief Customer Officer (CCO) — sponsor |
| **Nadia Petrov** | Head of Contact Centre Operations |
| **Julius Boateng** | Lead Conversational AI Engineer |
| **Renee Okafor** | Billing & Revenue Assurance Director |
| **Simon Voss** | Data Privacy Officer |


:::info[Case Journey]
**`INCUBATION`**  →  **`PITCH / APPROVE`**  →  **`DESIGN`**  →  **`BUILD`**  →  **`OPERATE`**  →  **`REVIEW`**
:::


*Northline Telecom | Agentic Customer Service Orchestration | 2026*

---


## Stage 1 — THE BOT THAT COULDN’T HAND OFF

*Why "add a chatbot" was the wrong brief from the start*
`Week 1 | Monday, 20 April 2026`


:::note[📅 Meeting]
**🕐 09:00**  📍 *Monday 20 April 2026 | Tom Reilly’s office*

**Informal Strategy Discussion**

*Attendees: Tom Reilly (CCO), Yara Haddad (EA)*
:::


> **Big Tom Reilly** — *Chief Customer Officer*
>
> Yara, our current chatbot resolves nine percent of contacts. Ninety-one percent escalate to a human agent, and half of those escalations start with the customer re-explaining everything because the bot didn’t pass context along. Customers hate it, agents hate it. I want an agentic AI system that actually resolves things, not another bot. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> That escalation pattern tells me the current system’s core failure isn’t language understanding — it’s that it has no real access to do anything and no ability to hand off context when it can’t. Before I scope a new system, I want to see the actual contact mix. What are the top reasons people contact us, and which of those genuinely require a system action versus just an answer? 


> **Big Tom Reilly** — *Chief Customer Officer*
>
> Nadia’s team tracks that. But I’ll tell you upfront — I want this to feel like one conversation to the customer, even if multiple things are happening behind the scenes. No ‘let me transfer you’ five times. 


:::note[📅 Meeting]
**🕐 13:00**  📍 *Wednesday 22 April 2026 | Contact Centre Operations*

**Discovery Interview**

*Attendees: Yara Haddad (EA), Nadia Petrov (Head of Contact Centre Ops)*
:::


> **Nadia Petrov** — *Head of Contact Centre Operations*
>
> Top five contact reasons: billing disputes, plan changes, device troubleshooting, service outages, and account security — password resets, suspected fraud on the account. Each of those touches a completely different backend system: billing disputes need the revenue assurance platform, plan changes need the provisioning system, troubleshooting needs network diagnostics, outages need the incident management system, and account security needs identity verification and fraud tooling. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> So a single monolithic bot trying to handle all five with one set of tools is going to be either shallow across all of them or genuinely capable at none. What I’m hearing is closer to five specialist agents behind one conversational front door, with an orchestrator that routes and — critically — carries context between them so the customer never repeats themselves. 


> **Nadia Petrov** — *Head of Contact Centre Operations*
>
> If you can pull that off, that alone would fix most of the complaint volume. But I want to flag something before you get too excited about full automation: account security contacts are the ones I’m most nervous about handing to an AI. We had an incident two years ago where a social-engineering attempt nearly got a human agent to reset a password without proper verification. I do not want an AI agent to be an easier target for that than a trained human. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> That’s a critical flag and it changes how I’ll scope this. Account security and fraud-adjacent contacts need to be treated as a fundamentally higher-risk category from day one — possibly excluded from autonomous resolution entirely in the first phase, routed to a human with the agent providing only context assembly, not 


### identity decisions. 


:::note[📧 Email]

**From:** Yara Haddad (Enterprise AI Architect) **To:** Simon Voss (Data Privacy Officer) 

**Subject:** Early Flag: Multi-Agent Customer Service Platform — Identity Verification & Fraud Scope 

Simon, scoping a multi-agent customer service system covering billing, plan changes, troubleshooting, outages, and account security contacts. Given the prior social-engineering near-miss on record, I’m planning to exclude autonomous identity verification and account security actions from Phase 1 scope entirely — those contacts get context-assembly support only, with the actual verification and action remaining human-performed. I want your team’s input on what ‘acceptable AI involvement’ looks like even in that reduced role, particularly around what customer-provided information the agent can access before identity is confirmed by the human agent. Can we align before I finalize the intake assessment? Yara

:::


:::info[📋 Artifact: AIA-2026-032]

**Architecture Intake Assessment — Multi-Agent Customer Service Platform**

_Draft v0.2 | Northline Telecom_ 

**BUSINESS PROBLEM STATEMENT**

Current single-bot resolution rate: 9%. 91% of contacts escalate, ~50% of escalations require the customer to re-explain context due to lack of handoff continuity. Five dominant contact categories identified, each requiring distinct backend system access. 

**STRATEGIC ALIGNMENT**

Customer experience objective: reduce average handle time 30%, increase first-contact resolution to 60%. Risk constraint: zero increase in account-security/fraud incident rate. 

**LANDSCAPE FINDINGS**

Five backend systems with no shared context layer. One prior social-engineering near-miss on record involving human agent identity verification — informs risk posture for any AI involvement in that category. 

**BUILD / BUY / REUSE ASSESSMENT**

Option A: Vendor all-in-one conversational AI suite with built-in identity verification automation — Effort: LOW, Risk: HIGH (opaque verification logic, vendor cannot fully explain fraud-resistance mechanism), Speed: HIGH Option B: Internally orchestrated specialist multi-agent system, shared context layer, account security/fraud contacts excluded from autonomous action in Phase 1 — Effort: MED-HIGH, Risk: MED, Speed: MED Option C: Incremental single-bot capability expansion, no re-architecture — Effort: LOW, Risk: LOW, Speed: HIGH, Value: LOW 

**RECOMMENDATION**

Option B, phased: billing, plan changes, troubleshooting, and outages in Phase 1; account security remains human-owned with AI context-assembly support only, pending a dedicated future risk review.

:::


:::tip[✅ Stage Outcomes]

- ✅ Root cause reframed from “bot isn’t smart enough” to “bot has no tool access and no context-handoff mechanism” 

- ✅ Five-domain specialist multi-agent topology proposed in place of a single monolithic bot 

- ✅ Account security and fraud-adjacent contacts excluded from autonomous scope at Incubation, based on a documented prior near-miss 

- ✅ Data Privacy Officer engaged pre-design specifically on the reduced-role boundary for security-adjacent contacts

:::


## Stage 2 — THE CONTEXT HANDOFF THAT WORRIED LEGAL

*Approving shared memory across five agents without approving shared blame*
`Week 4 | Thursday, 14 May 2026`


:::note[📅 Meeting]
**🕐 10:00**  📍 *Thursday 14 May 2026 | Northline HQ, Board Room A*

**Architecture Review Board (ARB)**

*Attendees: Yara (EA), Tom (CCO), Nadia (Contact Centre), Renee (Billing/Revenue Assurance), Simon (Privacy)*
:::


> **Renee Okafor** — *Billing & Revenue Assurance Director*
>
> My concern with the billing dispute agent specifically: if it has autonomous authority to issue credits, what stops it from being systematically generous to avoid conflict, the way some human agents drift toward over-crediting to end a difficult call quickly? 


> **Yara Haddad** — *Enterprise AI Architect*
>
> Fair pattern to worry about, and it’s a real failure mode in human agents too, so we should assume an agent could learn something similar if we’re not careful about the objective it’s optimising for. Design response: the billing agent has autonomous credit authority only up to a defined value threshold, only for a pre-approved set of dispute categories with clear-cut resolution criteria — for example, a documented billing system error — and every autonomous credit is logged with the specific evidence that justified it, reviewable by your team. Anything ambiguous, above threshold, or outside pre-approved categories routes to a human with a recommendation, not an autonomous decision. 


> **Renee Okafor** — *Billing & Revenue Assurance Director*
>
> I want a monthly aggregate credit-rate report by category, and I want an alert if any category’s average credit rate shifts more than a defined percentage month over month — that’s exactly the kind of drift you’re describing and I want it caught early, not discovered in a year-end audit. 


> **Simon Voss** — *Data Privacy Officer*
>
> On the shared context layer — if a customer discusses billing details in one part of the conversation and the orchestrator hands that context to the troubleshooting agent, are we creating a data-minimisation problem? The troubleshooting agent doesn’t need to know the customer’s billing dispute history to diagnose a router issue. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> Correct, and I want to design context-sharing as scoped, not global. Each specialist agent receives only the context fields relevant to its domain, defined by an explicit allow-list, not the full conversation history by default. The orchestrator retains the full context for continuity purposes — so the customer never has to repeat themselves — but individual agents only see what they need for their task. 


> **Simon Voss** — *Data Privacy Officer*
>
> That satisfies my data-minimisation concern. I do want the account-security exclusion from Phase 1 formally written into the ADR, not just implied by silence — I don’t want that boundary to quietly disappear during Build under delivery pressure. 


I **ARTIFACT: ADR-2026-021** 

### **Architecture Decision Record — Multi-Agent Customer Service Platform** 

_Issued 14 May 2026_ 

**DECISION**

Approve Option B — orchestrated five-domain specialist agent system with scoped, allow-listed context sharing per agent. Account security and fraud-adjacent contacts explicitly excluded from autonomous action; human-owned with AI context-assembly support only. 

**CONDITIONS**

[BILLING-001] Autonomous credit authority capped by value threshold and pre-approved dispute category list; all autonomous credits logged with justifying evidence 

[BILLING-002] Monthly aggregate credit-rate-by-category monitoring with drift alert threshold 

[PRIVACY-001] Context sharing between orchestrator and specialist agents scoped via explicit per-agent allow-list, not global conversation history 

[SECURITY-001] Account security / fraud contacts remain human-owned in Phase 1; any future expansion requires a dedicated risk review, not a scope-creep addition 

**ARB CHAIR SIGN-OFF**

Tom Reilly (CCO) — DATE: 14/05/2026 


:::tip[✅ Stage Outcomes]

- ✅ Billing agent autonomy bounded by value threshold, pre-approved category list, and mandatory evidence logging, with drift monitoring built in from approval 

- ✅ Scoped, allow-listed context sharing adopted in place of global conversation history sharing across agents, satisfying data minimisation 

- ✅ Account security exclusion formally written into the governing ADR to prevent quiet scope erosion during Build 

- ✅ Credit-rate drift alerting established as a standing control, addressing a human-agent-style failure mode proactively

:::


## Stage 3 — ONE CONVERSATION, FIVE BRAINS

*Making the handoff invisible to the customer without making it unaccountable*
`Weeks 6–12 | May–July 2026`


:::note[📅 Meeting]
**🕐 10:00**  📍 *Tuesday 2 June 2026 | Conversational AI Lab*

**Design Working Session**

*Attendees: Yara (EA), Julius Boateng (Lead Conversational AI Engineer)*
:::


> **Julius Boateng** — *Lead Conversational AI Engineer*
>
> Working prototype: orchestrator classifies intent, routes to the right specialist agent, and each specialist agent responds in the same chat thread so it feels seamless. One design question — what happens when a single contact genuinely spans two domains, like a customer whose billing dispute is actually caused by an incorrect plan change? 


> **Yara Haddad** — *Enterprise AI Architect*
>
> That’s going to be common, not an edge case — Nadia’s data showed a meaningful fraction of billing disputes trace back to provisioning errors. I don’t want the orchestrator forcing a single classification and getting it wrong. Design it so the orchestrator can dispatch to multiple specialist agents concurrently when intent is ambiguous or clearly multi-domain, then synthesise their outputs into one coherent response — similar fork-join pattern to what I’ve used in other agentic systems, though here the join step is a natural-language merge rather than a data merge, so it needs its own quality bar. 


> **Julius Boateng** — *Lead Conversational AI Engineer*
>
> And if the two specialist agents produce conflicting information — say the billing agent sees an active dispute credit already applied, but the provisioning agent doesn’t know that and proposes a different resolution? 


> **Yara Haddad** — *Enterprise AI Architect*
>
> The synthesis step needs a conflict-detection check before it merges anything into customer-facing language. If two specialist agents’ outputs contradict each other on a factual point, that’s an automatic route to a human agent with both outputs shown, rather than the orchestrator picking one arbitrarily or worse, blending them into something that sounds coherent but is actually inconsistent underneath. 


:::note[📅 Meeting]
**🕐 14:00**  📍 *Thursday 9 July 2026 | Conversational AI Lab*

**Evaluation Review**

*Attendees: Yara (EA), Julius (Lead Engineer), Renee (Billing/Revenue Assurance)*
:::


> **Julius Boateng** — *Lead Conversational AI Engineer*
>
> Evaluation on 400 simulated billing dispute conversations. Accuracy on straightforward, single-issue disputes is strong — 97% correct categorisation and credit calculation. But we found a pattern where customers describing a dispute in an emotionally charged or roundabout way — venting about frustration before getting to the actual billing detail — cause the agent to sometimes miscategorise the dispute type, which then triggers the wrong pre-approved category and an incorrect autonomous credit. 


> **Renee Okafor** — *Billing & Revenue Assurance Director*
>
> How incorrect, and in which direction — over-crediting or under-crediting? 


> **Julius Boateng** — *Lead Conversational AI Engineer*
>
> Skews over-crediting, actually — the model seems to weight the emotional framing of the complaint somewhat, tending toward the more generous resolution when the customer sounds upset, even when the actual facts support a smaller or no credit. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> That’s a genuinely important finding and it validates Renee’s original concern from the ARB almost exactly — the agent picking up a human-agent-like conflict-avoidance bias, just from a different mechanism. I want the categorisation step separated from the emotional tone of the conversation entirely — categorisation should run against a structured extraction of the factual billing details only, with conversational tone explicitly excluded from that specific decision, even though tone is legitimately useful for the agent’s empathetic response style elsewhere in the conversation. Empathy in phrasing, yes. Empathy influencing a credit calculation, no. 


:::info[📋 Artifact: SAD-2026-027]

**Solution Architecture Document (Extract) — Multi-Agent Customer Service Platform**

_v1.0 | Approved 21 July 2026_ 

**SECTION 3: ORCHESTRATION PATTERN**

Intent classification with confidence-based single or multi-domain dispatch. Multi-domain fork-join pattern with mandatory conflict-detection check before response synthesis; detected factual conflicts route to human agent with both specialist outputs shown, not auto-resolved. 

**SECTION 4: BILLING AGENT DECISION ISOLATION**

Dispute categorisation and credit calculation run against structured factual extraction only (billing system data, documented dispute category criteria); conversational tone and emotional framing explicitly excluded from this decision pathway, though retained for response-phrasing style elsewhere. 

**SECTION 5: RE-EVALUATION RESULTS**

Miscategorisation rate on emotionally-framed disputes: reduced from 14% to 1.8% post-redesign. Over-crediting skew eliminated in evaluation set.

:::


:::tip[✅ Stage Outcomes]

- ✅ Multi-domain fork-join pattern with mandatory conflict detection designed for contacts spanning more than one specialist domain 

- ✅ Emotional-tone-driven over-crediting bias caught in evaluation — the exact drift pattern Renee flagged at the ARB, surfacing through a different mechanism than anticipated 

- ✅ Architecture fix: billing categorisation isolated from conversational tone, reducing miscategorisation on emotionally-framed disputes from 14% to 1.8% 

- ✅ Distinction preserved between empathetic phrasing (desirable) and empathy-influenced financial decisions (not permitted)

:::


## Stage 4 — THE TRANSFER THAT WASN’T INVISIBLE

*Catching a UX regression before customers do*
`Months 4–7 | August–November 2026`


:::note[📅 Meeting]
**🕐 09:00**  📍 *Wednesday 26 August 2026 (40% Build Review) | Virtual — Teams Call*

**40% Architecture Compliance Review**

*Attendees: Yara (EA), Julius (Lead Engineer), Nadia (Contact Centre)*
:::


> **Nadia Petrov** — *Head of Contact Centre Operations*
>
> I sat in on ten live shadow-mode conversations this week — the agent running in parallel with a human agent, not yet customer-facing. The seamless handoff mostly works, but when a conversation escalates from a specialist agent to an actual human, the human agent onboarding screen shows the raw context handoff as a dense JSON-like data dump. Our agents are spending two extra minutes just parsing it before they can even greet the customer. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> We solved seamlessness for the customer and created a new friction point for the human agent — that’s a real gap and it directly undermines the average-handle-time goal for exactly the contacts that most need a fast human takeover. I want the handoff context rendered as a structured, human-readable summary specifically for the receiving agent’s screen — similar principle to what I insisted on for the safety-review reasoning trace in a manufacturing programme I worked on: raw data assembled correctly is necessary but not sufficient, it also has to be genuinely reviewable by the human under time pressure. 


> **Julius Boateng** — *Lead Conversational AI Engineer*
>
> That means an additional generation step specifically to summarise the handoff context for human agent consumption, separate from the customer-facing conversation and separate from the raw data the orchestrator uses internally. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> Correct, and I want that summary held to the same numeric-accuracy discipline we apply everywhere else in agentic systems touching factual claims — any dollar amounts, dates, or account details in that summary must be templated from source data, not freely generated, so a human agent taking over a billing dispute doesn’t get a slightly-wrong number at the exact moment they need to trust it. 


:::note[📅 Meeting]
**🕐 10:00**  📍 *Tuesday 14 October 2026 (70% Build Review) | Contact Centre Operations*

**70% Architecture Compliance Review**

*Attendees: Yara (EA), Julius (Lead Engineer), Nadia (Contact Centre)*
:::


> **Nadia Petrov** — *Head of Contact Centre Operations*
>
> New handoff summary format tested with twenty agents this week. Average pickup-to-greeting time down to under fifteen seconds, from the two-plus minutes we saw in August. Agents describe it as ‘like the previous agent left me proper notes’ rather than a data dump. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> Good. Where do things stand on the account-security exclusion boundary — any pressure to relax it as the rest of the system performs well? 


> **Nadia Petrov** — *Head of Contact Centre Operations*
>
> Some, informally — a few team leads have asked whether the context-assembly support for security contacts could be extended to include a confidence-scored fraud-risk flag. I told them that’s exactly the kind of question that needs to go through you and Simon’s team formally, not get added quietly. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> Appreciate you holding that line, and yes — that’s a legitimate idea worth evaluating, but it needs its own risk assessment given the fraud and social-engineering history here, not a build-stage feature addition. I’ll raise it formally as a Phase 2 candidate for the next Incubation cycle rather than let it drift into this build. 


:::info[📋 Artifact: GUARD-2026-019]

**Human Agent Handoff Summary Standard**

_v1.0 | Applies to all specialist-to-human escalations_ 

**REQUIREMENT**

Every escalation from a specialist agent to a human agent generates a structured, human-readable summary distinct from raw orchestrator context: customer issue, actions already attempted, relevant account facts (templated from source data, never freely generated for numeric/factual content), and recommended next step. **PERFORMANCE TARGET** 

Human agent pickup-to-first-response time under 20 seconds post-handoff.

:::


:::tip[✅ Stage Outcomes]

- ✅ Human-agent-facing UX gap caught in shadow mode before customer-facing launch — raw context handoff was creating a new friction point 

- ✅ Structured, templated handoff summary reduced human agent pickup time from over two minutes to under fifteen seconds 

- ✅ Account security scope-creep proposal correctly redirected to a formal future Incubation cycle rather than absorbed into current build 

- ✅ Numeric-templating discipline extended consistently to a new artifact type (handoff summaries), not just original agent outputs

:::


## Stage 5 — THE RESOLUTION RATE THAT LOOKED TOO GOOD

*Sanity-checking a metric before celebrating it*
`Months 8–12 | December 2026–March 2027`


Phased rollout completes across all contact channels by 1 December 2026. First-contact resolution rises from a blended human/bot baseline of roughly 44% to 58% within eight weeks — short of the 60% target but trending upward. Average handle time falls 34%, exceeding the 30% goal. 


:::note[📅 Meeting]
**🕐 09:00**  📍 *Monday 2 February 2027 | Contact Centre Operations*

**Monthly Metrics Review**

*Attendees: Yara (EA), Nadia (Contact Centre), Renee (Billing/Revenue Assurance)*
:::


> **Nadia Petrov** — *Head of Contact Centre Operations*
>
> Troubleshooting agent resolution rate jumped to 81% this month, up from a steady 68% the prior three months. That’s a big enough jump that I want to understand it before I report it upward as a win. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> Good instinct — a sudden jump in a metric that’s been stable is worth investigating before celebrating, the same way a suspiciously perfect agreement rate was worth investigating in a fraud-investigation system I worked on previously. What changed in the same window — network conditions, a specific issue type spike, anything in the agent itself? 


> **Nadia Petrov** — *Head of Contact Centre Operations*
>
> Nothing on the agent side that I’m aware of. But I did pull the underlying data — there was a firmware update rollout to a common router model in the same period that fixed a known intermittent connectivity bug. A meaningful share of troubleshooting contacts in that window were for an issue that had genuinely become easier to resolve, independent of the agent. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> That matters — it means part of this jump is a real environmental factor, not the agent suddenly getting smarter, and I don’t want us to build false confidence in the agent’s capability based on an external tailwind. I want the resolution-rate reporting segmented by issue type going forward, not just a single blended number, precisely so we can tell these apart — the agent’s improving competence on issues it always faced, versus the underlying issue mix shifting for reasons outside the agent entirely. 


:::info[📋 Artifact: OPS-2027-Q1B]

**Multi-Agent Customer Service Platform — Quarterly Operating Review**

_Q1 2027_ 

**THROUGHPUT**

First-contact resolution: 58%, trending toward 60% target. Average handle time reduced 34% against 30% goal. 

**METRIC INTEGRITY FINDING**

Troubleshooting resolution-rate spike traced to external firmware fix, not agent capability change; resolution-rate reporting redesigned to segment by issue type to distinguish agent improvement from environmental factors going forward. 

**BILLING GOVERNANCE**

Autonomous credit-rate drift monitoring: no threshold breaches in the quarter. Emotional-tone-isolation fix from Design stage holding — credit rate on emotionally-framed disputes tracking within 0.3 percentage points of factually-similar neutral-toned disputes. 

**ESCALATION QUALITY**

Human agent pickup-to-response time: 14 seconds average, holding the Build-stage target.

:::


:::tip[✅ Stage Outcomes]

- ✅ A suspicious metric jump correctly investigated before being reported as a win, tracing to an external firmware fix rather than agent improvement 

- ✅ Resolution-rate reporting redesigned to segment by issue type, distinguishing genuine agent capability gains from environmental factors 

- ✅ Emotional-tone-bias fix from Design stage validated as holding in production, over a full operating quarter 

- ✅ First-contact resolution and handle-time targets both trending favourably in first full operating quarter

:::


## Stage 6 — THE PHASE 2 CONVERSATION, DONE PROPERLY

*Revisiting the account security boundary with a year of evidence*
`Month 13 | April 2027`


:::note[📅 Meeting]
**🕐 14:00**  📍 *Thursday 15 April 2027 | Northline HQ, Board Room A*

**Annual Programme Review**

*Attendees: Yara (EA), Tom (CCO), Nadia (Contact Centre), Simon (Privacy)*
:::


> **Big Tom Reilly** — *Chief Customer Officer*
>
> Fifty-eight percent first-contact resolution, thirty-four percent handle time reduction, and Renee’s team reports the billing agent’s drift monitoring hasn’t triggered once in eight months. I want to formally open the Phase 2 conversation on account security — the confidence-scored fraud-risk flag idea Nadia’s team raised during Build. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> I’m glad to open it now, with real data behind us rather than delivery-pressure momentum, which is exactly why I redirected it away from the Build stage. I want this run as its own full Incubation-to-Approve cycle, not a fast-tracked addition, given the documented social-engineering near-miss that shaped our original scope decision. Simon, what would you need to see before signing off on even a limited pilot? 


> **Simon Voss** — *Data Privacy Officer*
>
> A clear description of exactly what the confidence-scored flag would and wouldn’t influence — I’d want it to inform a human verifier’s attention, never to substitute for or lower the bar on identity verification itself. And I’d want a dedicated red-team exercise simulating social-engineering attempts against the flag mechanism specifically, the same discipline Yara applied to injection risks in other systems. 


> **Yara Haddad** — *Enterprise AI Architect*
>
> Agreed on both. I’ll scope this as a new Architecture Intake Assessment, informed by everything we’ve learned in this programme — emotional-tone isolation, structured human-readable outputs, drift monitoring — but treated as its own risk decision, not inherited automatically from Phase 1’s success. 


I **ARTIFACT: RDREC-2027-004** 

### **Annual Programme Governance Decision** 

_April 2027_ 

**DECISION**

Phase 1 multi-agent customer service platform confirmed as steady-state production, with segmented metric reporting and drift monitoring continuing. Account security / fraud-adjacent AI involvement (Phase 2 candidate) authorised to begin a fresh, independent Architecture Intake Assessment — explicitly not a fast-tracked extension of Phase 1 approval. 

**RATIONALE**

Phase 1 success does not transfer risk clearance to a materially different, higher-risk domain. Documented social-engineering history requires independent evaluation with dedicated adversarial testing before any AI involvement in identity verification workflows. 

**APPROVED BY**

Tom Reilly (CCO), Simon Voss (Data Privacy Officer) 


:::tip[✅ Stage Outcomes]

- ✅ Phase 1 platform confirmed in steady-state production with first-contact resolution and handle-time gains sustained over a full year 

- ✅ Account security Phase 2 proposal directed into a fresh, independent governance cycle rather than inheriting Phase 1’s approval by default 

- ✅ Principle reaffirmed across the programme: success in a lower-risk domain does not transfer automatic authorisation to a higher-risk one 

- ✅ A year of accumulated design lessons — tone isolation, structured outputs, drift monitoring — carried forward as inputs to the next intake, not lost between programmes 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2026-032)|Incubation|CCO, Contact Centre, Privacy|
|Architecture Decision Record (ADR-2026-021)|Pitch / Approve|ARB, Billing, Privacy|
|Solution Architecture Document (SAD-2026-027)|Design|Conversational AI Eng, Billing|
|Handoff Summary Standard (GUARD-2026-019)|Build|Contact Centre Ops|
|Quarterly Operating Review (OPS-2027-Q1B)|Operate|Contact Centre, Billing|
|Annual Programme Governance Decision<br>(RDREC-2027-004)|Review|CCO, Privacy, Contact Centre|

_“Seamless for the customer and accountable to the business are not the same design goal — you have to solve both, and solving one first can quietly make the second one harder.”_

:::
