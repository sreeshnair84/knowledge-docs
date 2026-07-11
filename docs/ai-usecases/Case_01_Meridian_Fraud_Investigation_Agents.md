---
title: "The Agent That Proposes, Never Disposes"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_01_Meridian_Fraud_Investigation_Agents.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# **The Agent That Proposes, Never Disposes** 

Building an Autonomous Fraud Investigation Copilot Inside a Global Bank 

A transcript-style account following Elena Cross, Enterprise AI Architect at Meridian Financial Group, as she leads the design of a multi-agent fraud investigation system — and holds the line on human decision authority, prompt injection defence, and numeric hallucination control through a 12-month build under Model Risk governance. 

## Cast of Characters

| Character | Role |
|-----------|------|
| **Elena Cross** ⭐ | Enterprise AI Architect (EA) — our protagonist |
| **Marcus Idowu** | Chief Risk Officer (CRO) — programme sponsor |
| **Dr. Wen Zhao** | Head of Model Risk Management (MRM) |
| **Farrukh Aziz** | Lead AI Engineer — Agent Platform |
| **Bea Solano** | Head of Financial Crime Operations |
| **Neil Cartwright** | General Counsel |
| **Ingrid Halvorsen** | Chief Information Security Officer (CISO) |
| **Tobias Reyes** | Vendor Lead — FraudNet AI Agents |

:::info[Case Journey]
**`INCUBATION`**  →  **`APPROVE`**  →  **`DESIGN`**  →  **`BUILD`**  →  **`OPERATE`**  →  **`REVIEW & SCALE`**
:::

*Meridian Financial Group | Agentic Fraud Investigation Copilot | 2026*

---

## Stage 1 — THE BACKLOG THAT NEVER SHRINKS

*Where the problem gets named honestly before a solution gets named at all*
`Week 1 | Monday, 12 January 2026`

:::note[📅 Meeting]
**🕐 08:30**  📍 *Monday 12 January 2026 | Marcus Idowu’s office, Floor 22*

**Informal Strategy Discussion**

*Attendees: Marcus Idowu (CRO), Elena Cross (EA)*
:::

> **Marcus Idowu** — *Chief Risk Officer*
>
> Elena, our fraud investigation queue is at 14,000 open cases and growing by 900 a week. We hired forty more analysts last year and we’re still six weeks behind. The board wants to know why we haven’t used AI for this yet. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Before we talk about AI, I want to understand the actual bottleneck. Is it detection, or is it investigation? Those are different problems with different agentic patterns. 

> **Marcus Idowu** — *Chief Risk Officer*
>
> Detection is fine — the rules engine flags plenty. The bottleneck is investigation. Each flagged transaction needs an analyst to pull account history, check device fingerprints, cross-reference sanctions lists, call the customer sometimes, and write up a decision. It takes forty minutes per case on average. 

> **Elena Cross** — *Enterprise AI Architect*
>
> So you don’t need an AI that detects fraud better. You need an AI that does the forty minutes of legwork so a human analyst can make the forty-second decision. That’s an agentic workflow problem, not a model-accuracy problem. Give me two weeks to scope it properly — I want to sit with your analysts before I promise the board anything. 

> **Marcus Idowu** — *Chief Risk Officer*
>
> Two weeks. But I’ve already told the board we’re piloting ‘AI investigation agents’ by Q2. FraudNet has been calling me for a year — their agent suite is supposedly plug-and-play. 

:::tip[💭 Internal Thought]

Marcus has already named the vendor to the board before I’ve scoped the problem. That’s backwards, and it’s how organisations end up with an agent that does the wrong forty minutes of work extremely fast. I need to find out what actually eats analyst time before FraudNet’s sales cycle finds out for me.

:::

:::note[📅 Meeting]
**🕐 11:00**  📍 *Thursday 15 January 2026 | Financial Crime Operations Floor, Level 4*

**Discovery Interview**

*Attendees: Elena Cross (EA), Bea Solano (Head of Fin Crime Ops)*
:::

> **Bea Solano** — *Head of Financial Crime Operations*
>
> Watch this. Flagged transaction comes in — card-not-present, £4,200, new merchant category for this customer. My analyst opens six systems: the core banking platform, the device fingerprinting tool, the sanctions screening tool, the customer’s case history in our old case management system, a knowledge base wiki for policy, and finally a dialler to call the customer if needed. None of these talk to each other. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Six systems, no orchestration. How much of that forty minutes is judgment versus just... clicking between tabs and copying data? 

> **Bea Solano** — *Head of Financial Crime Operations*
>
> Honestly? Maybe eight minutes of actual judgment. The rest is retrieval and transcription. My best analysts are glorified copy-paste operators for thirty-two minutes out of every case, and it’s burning them out. We lost six analysts to attrition last quarter. 

> **Elena Cross** — *Enterprise AI Architect*
>
> That reframes everything. This isn’t ‘replace the analyst’s judgment with AI.’ It’s ‘build a multi-agent system that assembles the case file autonomously and hands a human a decision-ready packet.’ The judgment step stays human. Always. Given this is financial crime and there’s regulatory exposure, that’s not optional — that’s the design constraint. 

> **Bea Solano** — *Head of Financial Crime Operations*
>
> If it can cut the thirty-two minutes to five, I’ll fight for the budget myself. 

:::note[📧 Email]

**From:** Elena Cross (Enterprise AI Architect) **To:** Dr. Wen Zhao (Head of Model Risk Management) 

**Subject:** Early Flag: Agentic AI in Fraud Investigation — MRM Involvement Needed Pre-Design 

Wen, I’m scoping an agentic AI system to assist fraud investigation case assembly. This will involve autonomous retrieval and summarisation across account, device, and sanctions data, with LLM-generated case narratives that human analysts will act on. Given SR 11-7 / model risk expectations and the fact that outputs could influence SAR filings, I want your team engaged from the Architecture Intake stage, not bolted on at the end. Specifically I need your view on: (1) what constitutes a ‘model’ in an agentic system for governance purposes — is it the orchestrator, each tool-calling agent, or the whole pipeline; (2) evaluation and monitoring requirements for generative outputs feeding regulatory decisions; (3) whether autonomous action (vs. draft-for-human-review) is permissible anywhere in this workflow. Can we meet this week? Elena

:::

:::info[📋 Artifact: AIA-2026-014]

**Architecture Intake Assessment — Fraud Investigation Agent Platform**

_Draft v0.2 | Meridian Financial Group_ 

**BUSINESS PROBLEM STATEMENT**

Fraud investigation case assembly consumes 32 of 40 average minutes per case in non-judgment retrieval and transcription across 6 disconnected systems. Backlog: 14,000 open cases, growing 900/week. Analyst attrition: 6 in Q4 2025, cited workload and repetitive tooling as primary factors. 

**STRATEGIC ALIGNMENT**

Corporate objective: reduce financial crime operating cost 20% by FY2027 without reducing detection coverage. Regulatory driver: FCA/FinCEN expectations on SAR timeliness (30-day filing window currently at 68% on-time compliance). 

**LANDSCAPE FINDINGS**

Six disconnected systems in the investigation path. No orchestration layer. No existing model risk inventory entry for any generative AI component. Sanctions screening tool has a documented API; case management system does not (screen-scraping currently used by two analysts as a workaround — undocumented and unsupported). **BUILD / BUY / REUSE ASSESSMENT** 

Option A: FraudNet AI Agent Suite (vendor, black-box multi-agent) — Effort: LOW, Risk: HIGH (opaque reasoning, no explainability API), Speed: HIGH 

Option B: Build orchestrated agent system on internal LLM gateway with tool-use over existing systems, human-in-the-loop decision gate — Effort: MED, Risk: MED, Speed: MED 

Option C: Status quo + targeted RPA for retrieval only, no generative reasoning — Effort: LOW, Risk: LOW, Speed: HIGH, Value: LOW (does not address narrative synthesis) 

**RECOMMENDATION**

Option B — Build, with mandatory human decision gate on every case. Reject fully autonomous action on regulatory grounds pending MRM and Legal sign-off. 

**STATUS**

Pending Model Risk Management and Legal review of autonomous-action boundary. FraudNet vendor demo scheduled for ARB awareness only, not as pre-committed direction.

:::

:::tip[✅ Stage Outcomes]

- ✅ Architecture Intake Assessment (AIA-2026-014) drafted — reframes problem from “replace analyst judgment” to “automate case assembly, keep human decision gate” 

- ✅ Root cause identified: 32 of 40 minutes per case is non-judgment retrieval across 6 disconnected systems 

- ✅ Model Risk Management engaged pre-design, ahead of any vendor commitment 

- ✅ Undocumented screen-scraping workaround discovered — flagged as a shadow-automation risk 

- ✅ FraudNet vendor demo scheduled for awareness only; no pre-commitment made to CRO’s board narrative

:::

## Stage 2 — THE GOVERNANCE GATE

*Where autonomy gets a leash before it gets a budget*
`Week 4 | Wednesday, 4 February 2026`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Wednesday 4 February 2026 | Board Room C, Meridian HQ*

**Architecture Review Board (ARB)**

*Attendees: Elena (EA) | Marcus (CRO) | Wen (MRM) | Ingrid (CISO) | Neil (Legal) | Bea (Fin Crime Ops)*
:::

> **Neil Cartwright** — *General Counsel*
>
> Elena, walk me through what happens if the agent gets it wrong. Specifically — if it summarises a customer’s transaction history incorrectly and an analyst relies on that summary to file, or not file, a Suspicious Activity Report. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Two controls address that directly. First, the agent never files anything — it produces a case packet with every claim in the narrative traceable back to a source system field, shown as an inline citation the analyst can click to verify. Second, we run a mandatory human decision gate: no SAR, no account action, no customer contact happens without analyst sign-off. The agent proposes; it never disposes. 

> **Neil Cartwright** — *General Counsel*
>
> What if the analyst just rubber-stamps it because it’s faster than checking? 

> **Elena Cross** — *Enterprise AI Architect*
>
> That’s the real risk — automation complacency, not the model being wrong. We’re addressing it three ways: a random 10% sample of agent-assisted cases gets blind re-review by a second analyst with no visibility into the agent’s summary; the UI forces the analyst to affirmatively check each cited source before the sign-off button activates, not just click submit; and we track agreement-rate metrics per analyst — if someone accepts the agent’s recommendation 100% of the time with zero edits, Bea’s team gets an alert. 

> **Dr. Wen Zhao** — *Head of Model Risk Management*
>
> I want to register a concern on the record. The orchestrator in this design calls four different tool-using sub-agents plus a summarisation model. For model risk inventory purposes, is that one model or five? 

> **Elena Cross** — *Enterprise AI Architect*
>
> Five, for governance purposes. Each sub-agent — device analysis, sanctions cross-reference, transaction pattern, customer history retrieval, and the final narrative synthesiser — gets its own model risk tier rating, its own evaluation suite, and its own owner. The orchestrator itself also gets inventoried, because orchestration logic — which agent gets called, in what order, with what context window — is itself a decision surface that can go wrong even if every individual agent is correct. 

> **Dr. Wen Zhao** — *Head of Model Risk Management*
>
> That’s the right answer. Most vendors treat the orchestrator as plumbing. It isn’t. I want the orchestrator classified as Tier 1 — highest scrutiny — given it controls sequencing over regulated financial crime data. 

> **Ingrid Halvorsen** — *Chief Information Security Officer*
>
> My concern is different. Tool-calling agents with API access to core banking and sanctions systems are a new attack surface. If someone can manipulate the inputs — a crafted transaction memo field, say — can they cause the summarisation agent to produce a misleading narrative? That’s a prompt injection risk sitting inside customer-controllable data. 

**Elena Cross — Enterprise AI Architect** 

Confirmed risk, and a good catch. Transaction memo fields, merchant descriptors, and customer-submitted dispute text are all untrusted input from the agent’s perspective, even though they originate inside our own systems. Design requirement: every field pulled into agent context gets tagged by provenance — trusted (system-generated, e.g., timestamps, amounts) or untrusted (human-entered free text) — and untrusted fields are quoted, delimited, and never allowed to contain instructions the orchestrator will follow. I’ll have Farrukh’s team build this as a hard architectural boundary, not a prompt-engineering suggestion. 

> **Marcus Idowu** — *Chief Risk Officer*
>
> Can we still hit a Q2 pilot? 

> **Elena Cross** — *Enterprise AI Architect*
>
> Yes, with a narrower scope than the board narrative implied. Pilot on card-not-present fraud only, one product line, 200 cases, human decision gate on every single one, with the orchestrator and all five sub-agents in the model risk inventory before go-live. Full rollout depends on pilot evaluation results, not the calendar. 

:::info[📋 Artifact: ADR-2026-009]

**Architecture Decision Record — Fraud Investigation Agent Platform**

##### _Issued 4 February 2026 | Meridian Financial Group_ 

**DECISION**

Approve Option B — internally orchestrated multi-agent case-assembly system with mandatory human decision gate. Reject autonomous action (SAR filing, account freezing, customer contact) by any agent. 

**GOVERNANCE CONDITIONS**

[MRM-001] Orchestrator classified Tier 1 model risk; each of 5 sub-agents independently inventoried and tiered [MRM-002] Evaluation suite required pre-production: hallucination rate, citation accuracy, sanctions false-negative rate, demographic parity across customer segments 

[CISO-001] Provenance tagging mandatory for all agent context fields; untrusted free-text fields architecturally isolated from instruction-following pathways (prompt injection control) 

[LEGAL-001] Every agent-generated claim in a case packet must carry a source citation resolvable to a system-of-record field; no unsourced narrative text permitted 

[OPS-001] 10% blind second-review sample; per-analyst agent-agreement-rate monitoring with escalation threshold 

**SCOPE**

Pilot: card-not-present fraud, single product line, 200 cases, human decision gate on 100% of cases. Full rollout gated on pilot evaluation results. 

**CONSEQUENCES**

+ Projected reduction of non-judgment case time from 32 to under 6 minutes if pilot evaluation passes thresholds 

+ Full audit trail per case, improving SAR timeliness compliance 

– Five-model governance overhead increases design and evaluation lead time by an estimated 4 weeks versus vendor black-box option 

– FraudNet vendor option formally declined for this use case; documented for CRO board communication 

**ARB CHAIR SIGN-OFF**

Marcus Idowu (CRO) — DATE: 04/02/2026

:::

:::tip[✅ Stage Outcomes]

- ✅ ARB approves internally orchestrated build over FraudNet vendor black-box (rejected on explainability and governance grounds) 

- ✅ Orchestrator formally classified as Tier 1 model risk — a decision most vendor-led programmes never make explicitly 

- ✅ Prompt injection risk from customer-controllable free-text fields identified pre-design and made an architectural boundary, not a prompt-engineering afterthought 

- ✅ Human decision gate mandated on 100% of cases; autonomous action explicitly rejected 

- ✅ Pilot scope narrowed to 200 cases, single product line — CRO’s board narrative reset to match actual readiness

:::

## Stage 3 — FIVE AGENTS AND A REFEREE

*Where orchestration topology becomes the whole ballgame*
`Weeks 6–11 | February–March 2026`

:::note[📅 Meeting]
**🕐 09:30**  📍 *Tuesday 17 February 2026 | AI Platform Studio, Level 9*

**Design Working Session**

*Attendees: Elena (EA), Farrukh (Lead AI Engineer), Tobias Reyes (FraudNet Vendor, integration-only role)*
:::

> **Farrukh Aziz** — *Lead AI Engineer*
>
> Elena, I want to challenge the five-agent topology. Why not one large agent with all four tools available and let the model decide what to call and when? It’s simpler to build and modern models are good at tool selection. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Two reasons. First, blast radius — if one monolithic agent has sanctions-screening, device-fingerprinting, transaction-history, and customer-contact tools all in one context, a single reasoning error or injected instruction can cascade across all four capabilities at once. Separate agents with narrow tool scopes contain the failure. Second, and this is the one that’ll matter to Wen’s team — a single monolithic agent is much harder to evaluate. You can’t cleanly measure ‘sanctions cross-reference accuracy’ in isolation if it’s tangled up with narrative generation in one call. Separation gives us per-capability evaluation, which is what Tier 1 governance requires. 

> **Farrukh Aziz** — *Lead AI Engineer*
>
> Fair. But the orchestrator now has to manage state across five agents with different latencies — sanctions screening hits an external API that can take eight seconds, device fingerprinting is local and near-instant. If we run them all in sequence, we’re back to a forty-minute case. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Parallel fan-out, not sequence. The orchestrator dispatches all four retrieval agents concurrently, waits on the slowest, then passes the assembled evidence bundle to the narrative synthesiser as the final step. That’s a fork-join pattern. Target: under 90 seconds from case creation to draft packet. 

> **Tobias Reyes** — *FraudNet Vendor*
>
> We can still offer our sanctions-screening agent as a component even though the platform decision went against the full suite — our match algorithm has a lower false-negative rate than most in-house builds. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Noted, and we’ll benchmark it against our current screening provider on false-negative rate during evaluation. But I want to be direct about scope: it plugs in as a tool behind our orchestrator with our provenance-tagging and citation requirements applied to its output. It does not get its own reasoning autonomy inside our pipeline. 

:::note[📅 Meeting]
**🕐 14:00**  📍 *Thursday 6 March 2026 | AI Platform Studio, Level 9*

**Evaluation Review**

*Attendees: Elena (EA), Farrukh (Lead AI Engineer), Dr. Wen Zhao (MRM)*
:::

> **Farrukh Aziz** — *Lead AI Engineer*
>
> First eval run on 300 synthetic cases. Citation accuracy is good — 97% of claims trace correctly to source fields. But hallucination rate on numeric details inside the narrative — dates, amounts, transaction counts — is 4.2%. The model is occasionally stating a number that isn’t anywhere in the evidence bundle. 

> **Dr. Wen Zhao** — *Head of Model Risk Management*
>
> 4.2% of cases with a fabricated numeric detail in a financial crime narrative is not deployable. What’s the failure pattern? 

> **Farrukh Aziz** — *Lead AI Engineer*
>
> Mostly summarisation drift — when the evidence bundle has, say, six transactions, the model sometimes says ‘seven transactions’ or rounds an amount. It’s not inventing fraud that didn’t happen, but it is getting arithmetic and counting wrong inside natural language generation. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Then we don’t let natural language generation do arithmetic or counting. Redesign: the synthesiser agent is not permitted to state any number in the narrative that it computed itself. Every quantitative claim must be a direct, programmatically-inserted value from the evidence bundle — templated insertion, not free generation. The model writes the connective prose around fixed facts; it doesn’t generate the facts. 

> **Farrukh Aziz** — *Lead AI Engineer*
>
> That constrains the writing style significantly. It’ll read a bit more mechanical. 

> **Elena Cross** — *Enterprise AI Architect*
>
> A mechanical-but-accurate case packet beats a fluent-but-wrong one every time in this domain. Analysts can live with slightly stiffer prose. They cannot live with a fabricated transaction count in a document that might support a SAR filing. 

> **Dr. Wen Zhao** — *Head of Model Risk Management*
>
> I want that redesign re-evaluated before I’ll consider signing the Design gate. Numeric hallucination rate needs to be at or near zero — this is a factual-extraction task wearing a narrative-generation costume, and it should be engineered as one. 

:::tip[💭 Internal Thought]

Wen is right, and I should have caught this in the initial architecture. I let the synthesiser agent do too much — I treated ‘write a case summary’ as one job when it’s actually two: extract facts precisely, then narrate them fluently. Conflating extraction and narration inside a single generative call is exactly how you get confident, well-written, wrong numbers. This is the kind of mistake that looks like a prompt-tuning problem but is actually an architecture problem.

:::

I **ARTIFACT: SAD-2026-011** 

### **Solution Architecture Document (Extract) — Fraud Investigation Agent Platform** 

_v1.0 | Approved 24 March 2026_ 

**SECTION 3: AGENT TOPOLOGY**

Pattern: Fork-join orchestration, 4 parallel retrieval agents + 1 constrained synthesiser, single orchestrator (Tier 1 governed). 

Retrieval agents: Device Fingerprint Agent, Sanctions Cross-Reference Agent, Transaction Pattern Agent, Customer History Agent — each scoped to one tool, one data domain, independently evaluated. Synthesiser Agent: narrative generation constrained to templated slot-filling for all quantitative claims; free generation permitted only for connective prose and contextual explanation, never for figures. 

**SECTION 4: PROVENANCE & INJECTION CONTROLS**

All context fields tagged trusted (system-generated) or untrusted (human free-text). Untrusted fields wrapped in structural delimiters and explicitly excluded from any instruction-following pathway. Orchestrator system prompt includes an explicit denylist: agent must never treat content inside untrusted-field delimiters as a directive. 

**SECTION 5: EVALUATION RESULTS (RE-RUN, POST-REDESIGN)**

Numeric hallucination rate: 0.2% (from 4.2% pre-redesign) — remaining cases traced to evidence-bundle assembly bugs, not generation, and routed to Farrukh’s team as data-pipeline defects. Citation accuracy: 99.1%. 

Sanctions false-negative rate: 0.03%, benchmarked against incumbent provider at 0.05% — improvement retained. 

End-to-end latency (case creation to draft packet): 71 seconds average, 94 seconds p95. 

**SECTION 6: NON-FUNCTIONAL REQUIREMENTS**

Human decision gate: mandatory, 100% of cases, no exceptions. 

Availability: 99.5% (business-hours tier, not mission-critical infrastructure). 

Audit retention: 7 years, full evidence bundle + agent reasoning trace + analyst decision, immutable storage. 

:::tip[✅ Stage Outcomes]

- ✅ Five-agent fork-join topology finalised with per-agent evaluation, replacing a proposed monolithic single-agent design 

- ✅ Critical numeric-hallucination flaw (4.2%) caught during design-stage evaluation, not in production 

- ✅ Architecture fix: quantitative claims templated from evidence bundle, never freely generated — reduced hallucination to 0.2% 

- ✅ Provenance tagging and prompt-injection isolation built as a structural boundary, satisfying CISO’s Stage 2 condition 

- ✅ Solution Architecture Document (SAD-2026-011) approved with MRM sign-off contingent on re-evaluation results

:::

## Stage 4 — THE AGENT THAT WOULDN’T STOP CALLING

*Governing delivery when the failure mode is autonomy, not bugs*
`Months 4–7 | April–July 2026`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Wednesday 6 May 2026 (30% Build Review) | Virtual — Teams Call*

**30% Architecture Compliance Review**

*Attendees: Elena (EA), Farrukh (Lead AI Engineer), Bea (Fin Crime Ops)*
:::

> **Farrukh Aziz** — *Lead AI Engineer*
>
> Elena, flag before we start the walkthrough. During load testing, the Customer History Agent got stuck in a retrieval loop — it called the case management API 340 times for a single case before a timeout killed it. Cost about $40 in API and compute spend for one case that should have cost four cents. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Walk me through what triggered the loop. 

> **Farrukh Aziz** — *Lead AI Engineer*
>
> The agent has an instruction to ‘retrieve complete customer history before proceeding.’ For a customer with a long relationship, the API paginates results. The agent kept calling ‘next page’ because it interpreted ‘complete’ as needing to reach a natural stopping point, and a data quality bug meant the pagination cursor never returned an end-of-results flag for this particular customer. So the agent just... kept going. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Two separate problems, and I want both fixed, not just the pagination bug. Yes, fix the API defect. But the deeper issue is that we have an autonomous agent with no hard ceiling on tool-call count or spend per case. That’s an architecture gap, not a bug — any agent with a loop-inducing instruction and a flaky dependency can do this again with a different tool next month. 

> **Farrukh Aziz** — *Lead AI Engineer*
>
> We could add a max-iteration limit. 

> **Elena Cross** — *Enterprise AI Architect*
>
> We need three ceilings, not one: max tool-calls per agent per case, max wall-clock time per agent, and a per-case cost budget that kills the whole orchestration and routes to manual investigation with an alert if breached. This is a guardrail every agent in this platform needs, and I want it built into the orchestrator as a shared control, not implemented separately and inconsistently by each agent team. 

> **Bea Solano** — *Head of Financial Crime Operations*
>
> If a case hits the ceiling and falls back to manual, does the analyst know why? I don’t want a mystery ‘AI couldn’t handle this one’ with no context. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Good requirement — the fallback includes a structured reason code and whatever partial evidence was gathered before the ceiling hit, so the analyst isn’t starting from zero. I’ll get this written up as a formal guardrail spec today. 

:::tip[💭 Internal Thought]

This is the kind of failure that doesn’t show up in a demo. A vendor black-box would have hidden this loop inside a per-call billing line item that nobody would have noticed until the invoice arrived. Because we built this ourselves with observability designed in from Stage 3, Farrukh caught it in load testing instead of Marcus catching it in a finance review three months from now.

:::

:::note[📅 Meeting]
**🕐 09:00**  📍 *Tuesday 30 June 2026 (70% Build Review) | AI Platform Studio, Level 9*

**70% Architecture Compliance Review**

*Attendees: Elena (EA), Farrukh (Lead AI Engineer)*
:::

> **Farrukh Aziz** — *Lead AI Engineer*
>
> Runaway-loop guardrails are live: max 15 tool calls per agent per case, 20-second wall clock per agent, $0.50 cost ceiling per case with automatic fallback to manual queue plus reason code. Re-ran the pagination scenario — it now fails safely at call 15 instead of 340. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Good. Second item on my list — the sanctions cross-reference agent. Tobias’s FraudNet component. How’s the provenance tagging holding up on a third-party tool response? 

> **Farrukh Aziz** — *Lead AI Engineer*
>
> That one’s solid — FraudNet’s API returns structured JSON, easy to tag as trusted system data. The harder case turned out to be the customer dispute text field, which we already knew was untrusted, but we found a second one during red-teaming: the merchant descriptor field, which merchants set themselves at point of sale. My team ran an adversarial test — planted an instruction-like string inside a test merchant descriptor. 

> **Elena Cross** — *Enterprise AI Architect*
>
> And? 

> **Farrukh Aziz** — *Lead AI Engineer*
>
> The orchestrator correctly quoted it as inert data and didn’t follow the embedded instruction. The isolation boundary held. But it only held because we caught merchant descriptor as untrusted in red-teaming — it wasn’t on the original provenance list from Stage 3. I think we need a standing red-team pass before every production release, not just a one-time design review. 

> **Elena Cross** — *Enterprise AI Architect*
>
> Agreed — I’m making adversarial red-teaming a permanent pre-production gate for this platform, not a one-off Stage 3 exercise. Any field that originates from a party outside our direct control is a candidate for injection, and new integrations will keep introducing new untrusted fields we haven’t thought of yet. 

:::info[📋 Artifact: GUARD-2026-003]

**Agent Runaway & Cost Guardrail Specification**

_v1.0 | Mandatory for all production agents on the platform_ 

**SCOPE**

Applies to every autonomous or semi-autonomous agent deployed on the Meridian Agent Platform, present and future. 

**CONTROLS**

Max tool-calls per agent per task: configurable ceiling, default 15 Max wall-clock time per agent per task: configurable ceiling, default 20s Max cost per task (aggregate across all sub-agents): configurable ceiling, default $0.50 

On breach of any ceiling: task halted, partial evidence preserved, structured reason code emitted, task routed to human fallback queue 

**OWNER**

AI Platform Engineering (Farrukh Aziz) — enforced at orchestrator level, not delegable to individual agent implementations 

**STANDING RED-TEAM GATE**

Adversarial prompt-injection testing added as a mandatory pre-production release gate for every new agent or new data-field integration, in addition to the one-time Stage 3 design review.

:::

:::tip[✅ Stage Outcomes]

- ✅ Runaway-agent incident caught in load testing: one case triggered 340 API calls and $40 in spend before a timeout 

- ✅ Platform-wide guardrail spec (GUARD-2026-003) established: tool-call, wall-clock, and cost ceilings mandatory for every agent 

- ✅ Second untrusted-data field (merchant descriptor) discovered via red-teaming that was missed in Stage 3 design 

- ✅ Standing adversarial red-team gate instituted as a permanent pre-production requirement, not a one-time exercise 

- ✅ Structured fallback-with-reason-code design ensures analysts aren’t left with an unexplained AI failure

:::

## Stage 5 — THE 100% AGREEMENT RATE

*Where automation complacency shows up as a suspiciously clean dashboard*
`Months 8–11 | August–November 2026`

The pilot goes live on 200 card-not-present cases on 3 August 2026. Case-assembly time drops from 32 minutes to 68 seconds average. Analyst decision time (the human judgment step) stays roughly constant at 6–8 minutes. Bea’s team requests expansion to all fraud case types within six weeks. Elena insists on completing the full 90-day pilot evaluation window first. 

:::note[📅 Meeting]
**🕐 09:00**  📍 *Monday 12 October 2026 | Financial Crime Operations Floor, Level 4*

**Monthly Agent-Agreement-Rate Review**

*Attendees: Elena (EA), Bea (Fin Crime Ops)*
:::

> **Bea Solano** — *Head of Financial Crime Operations*
>
> Elena, one of our top-performing analysts, Priya on the CNP team — her agent-agreement rate has been 100% for three straight weeks. She accepts every case packet exactly as the AI presents it. Her case throughput has also nearly doubled. Is this good news or a problem? 

> **Elena Cross** — *Enterprise AI Architect*
>
> It’s the exact scenario we built the monitoring for. It could genuinely mean the agent is very accurate on her case mix and she’s an efficient reviewer. Or it could mean she’s stopped actually checking the citations and is just clicking through. We can’t tell which from the agreement rate alone — that’s why we also sample. 

> **Bea Solano** — *Head of Financial Crime Operations*
>
> The blind second-review sample on her cases — any discrepancies? 

> **Elena Cross** — *Enterprise AI Architect*
>
> That’s the useful data point. Twenty of her cases went through blind second review this month. Nineteen matched exactly. One had a discrepancy — the second reviewer flagged a case as needing escalation to enhanced due diligence that Priya’s AI-assisted review had classified as routine. Let’s not treat this as a Priya problem yet. Let’s look at the actual case. 

> **Bea Solano** — *Head of Financial Crime Operations*
>
> I pulled it. The discrepancy is subtle — a customer with two accounts where the AI’s customer-history agent only retrieved history from the primary account, missing a small pattern of related activity on the secondary account that would’ve nudged this toward enhanced due diligence. 

> **Elena Cross** — *Enterprise AI Architect*
>
> That’s a real gap, and it’s in the agent, not in Priya’s judgment — the case packet she reviewed genuinely didn’t contain the secondary-account pattern, so there was nothing there for her to catch. I want the Customer History Agent scoped to include linked accounts, not just the primary account on the flagged transaction. That’s a design fix. Separately, I still want to talk to Priya — not as a discipline conversation, but to understand her actual review process, because a 100% agreement rate is a signal worth a conversation regardless of root cause. 

**EA'S INTERNAL THOUGHT** 

_This is the outcome I designed the monitoring to surface, and it worked — not by catching an analyst cutting corners, but by catching a real gap in the agent’s evidence retrieval that a purely accuracy-focused evaluation would have missed, because the agent wasn’t ‘wrong’ about what it retrieved, it just didn’t retrieve enough. A high agreement rate is not proof of quality and it is not proof of complacency. It’s a prompt to go look._ 

:::info[📋 Artifact: OPS-2026-Q4]

**Quarterly Agent Platform Compliance & Performance Review**

_Q4 2026 | Fraud Investigation Agent Platform_ 

**THROUGHPUT**

Case-assembly time: 68s average (from 32min baseline). Backlog reduced from 14,000 to 3,100 open cases. Analyst headcount stable — no reductions; capacity redirected to backlog and higher-complexity cases. 

**QUALITY**

Numeric hallucination rate: 0.15% (production, 90-day rolling). Citation accuracy: 99.3%. Blind second-review discrepancy rate: 3.1% (within expected human-AI system variance; used as continuous improvement signal, not a pass/fail gate). 

**GUARDRAILS**

Runaway-loop ceiling triggered 11 times in 90 days, all routed cleanly to manual fallback with reason codes. Zero unbounded-cost incidents since GUARD-2026-003 deployment. 

**FINDING & REMEDIATION**

Customer History Agent scope gap identified via agreement-rate monitoring (not evaluation suite) — linked-account retrieval added, redeployed 2 November 2026. 

**COMPLIANCE**

SAR on-time filing rate improved from 68% to 91%. Full evidence-and-reasoning audit trail available for 100% of cases, 7-year retention confirmed by internal audit.

:::

:::tip[✅ Stage Outcomes]

- ✅ Backlog reduced from 14,000 to 3,100 cases without analyst headcount reduction 

- ✅ Agent-agreement-rate monitoring surfaced a real evidence-retrieval gap (linked accounts) rather than analyst complacency 

- ✅ Distinction established and proven in practice: high agreement rate is a prompt to investigate, not proof of either success or failure 

- ✅ Guardrail ceilings from Stage 4 functioned correctly in production — 11 clean fallbacks, zero runaway-cost incidents 

- ✅ SAR on-time filing compliance improved from 68% to 91%

:::

## Stage 6 — THE FLEET, NOT THE PROJECT

*Where one agent platform becomes governance infrastructure for every agent that follows*
`Month 12 | January 2027`

:::note[📅 Meeting]
**🕐 14:00**  📍 *Thursday 14 January 2027 | Board Room C, Meridian HQ*

**Annual Agent Portfolio Review**

*Attendees: Elena (EA), Marcus (CRO), Dr. Wen Zhao (MRM), Ingrid (CISO)*
:::

> **Marcus Idowu** — *Chief Risk Officer*
>
> Elena, three other business units have asked me directly whether they can ‘just use the fraud AI’ for their own workflows — commercial lending wants something similar for covenant monitoring, and customer service wants an agent for dispute triage. 

> **Elena Cross** — *Enterprise AI Architect*
>
> They can’t reuse the fraud agents directly — the domains are different. But they should absolutely reuse the platform underneath them: the orchestrator pattern, the provenance-tagging and injection-isolation boundary, the runaway-cost guardrails, the citation-and-templated-numbers discipline, and the human-decision-gate framework. That’s the actual asset we built. I want to formally spin that out as the Meridian Agent Platform, not let each business unit rebuild these controls from scratch, inconsistently, at different quality bars. 

> **Dr. Wen Zhao** — *Head of Model Risk Management*
>
> From my side, that’s the right call and honestly the safer one. Right now I have one Tier 1 orchestrator and five sub-agents in the model risk inventory. If three more business units build agent systems independently without this platform, I could have thirty ungoverned agents in eighteen months, each with its own injection surface and its own way of getting cost ceilings wrong. 

> **Ingrid Halvorsen** — *Chief Information Security Officer*
>
> Agreed from security. I’d rather audit one platform’s injection controls deeply than audit five bespoke implementations shallowly. 

> **Marcus Idowu** — *Chief Risk Officer*
>
> What does ‘spinning it out’ actually require? 

> **Elena Cross** — *Enterprise AI Architect*
>
> A platform team with a clear mandate, a published set of architecture guardrails any business unit must build against — the ones we’re already enforcing here — and a lightweight intake process so new use cases get the governance benefits without repeating our eleven-month build. I’d rather spend the next quarter turning our hard-won lessons into reusable infrastructure than watch commercial lending rediscover the numeric-hallucination problem from a standing start. 

:::info[📋 Artifact: PLATFORM-2027-001]

**Agent Platform Rationalisation Decision**

_January 2027 | Approved by CRO_ 

**DECISION**

Fraud Investigation Agent Platform’s orchestration layer, guardrail framework, and governance model are extracted into the reusable Meridian Agent Platform, owned by AI Platform Engineering with EA architectural sponsorship. 

**MANDATORY FOR ALL NEW AGENT INITIATIVES**

Runaway-cost/tool-call/wall-clock guardrails (GUARD-2026-003 lineage) · Provenance tagging and injection isolation · Templated numeric-claim discipline for any generative output feeding a decision · Mandatory human decision gate unless explicitly waived by MRM for low-risk, reversible-action use cases · Standing adversarial red-team pre-production gate 

**NEXT INTAKES**

Commercial Lending Covenant Monitoring Agent and Customer Service Dispute Triage Agent both enter Architecture Intake in Q1 2027, building on the platform rather than starting fresh.

:::

:::tip[✅ Stage Outcomes]

- ✅ Fraud Investigation Agent Platform’s governance and orchestration patterns formally extracted into a reusable Meridian Agent Platform 

- ✅ Model Risk Management avoids a projected ungoverned-agent-sprawl scenario across business units 

- ✅ Guardrail framework (GUARD-2026-003 lineage) made mandatory baseline for all future agent initiatives, not a one-off fraud-specific control 

- ✅ Two new business unit agent initiatives queued to build on the platform rather than rebuilding controls from scratch 

- ✅ Programme reframed from a single project outcome to durable governance infrastructure 

#### **EPILOGUE & ARTEFACT REGISTER** 

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2026-014)|Incubation|CRO, Fin Crime Ops, MRM|
|Architecture Decision Record (ADR-2026-009)|Approve|ARB, MRM, CISO, Legal|
|Solution Architecture Document (SAD-2026-011)|Design|AI Engineering, MRM|
|Agent Guardrail Specification (GUARD-2026-003)|Build|AI Platform Engineering|
|Quarterly Compliance & Performance Review<br>(OPS-2026-Q4)|Operate|CRO, MRM, Fin Crime Ops|
|Agent Platform Rationalisation Decision<br>(PLATFORM-2027-001)|Review & Scale|CRO, MRM, CISO|

_“The hardest part of building an autonomous agent isn’t making it capable. It’s deciding, precisely, what it is never allowed to do — and building that boundary so it can’t be reasoned around.”_

:::
