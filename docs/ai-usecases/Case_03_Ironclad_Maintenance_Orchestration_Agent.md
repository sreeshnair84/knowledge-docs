---
title: "Graduated Autonomy on the Factory Floor"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_03_Ironclad_Maintenance_Orchestration_Agent.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# **Graduated Autonomy on the Factory Floor**

Building a Multi-Tier Agentic Maintenance & Procurement Orchestrator Across 14 Plants

A transcript-style account following Kofi Mensah, Enterprise AI Architect at Ironclad Industrial Group, as he designs a maintenance-to-procurement agentic system with three distinct autonomy tiers — keeping a permanent human gate on safety-critical production scheduling while letting low-risk procurement run autonomously.

## Cast of Characters

| Character | Role |
| ----------- | ------ |
| **Kofi Mensah** ⭐ | Enterprise AI Architect, Operations (EA) — our protagonist |
| **Renata Silva** | VP Global Manufacturing Operations — sponsor |
| **Hans Weber** | Plant Director, Leipzig Facility |
| **Ayesha Malik** | Lead Agentic Systems Engineer |
| **Grzegorz Nowak** | Head of Procurement |
| **Owen Baptiste** | Safety & Reliability Engineer |
| **Lucia Ferraro** | Supply Chain Partner Manager |

:::info[Case Journey]
**`INCUBATION`**  →  **`PITCH / APPROVE`**  →  **`DESIGN`**  →  **`BUILD`**  →  **`OPERATE`**  →  **`REVIEW`**
:::

*Ironclad Industrial Group | Agentic Maintenance & Supply Orchestrator | 2026*

---

## Stage 1 — THE MACHINE THAT KNEW BEFORE ANYONE ASKED

*Turning a sensor-data pile into an actual agentic problem statement*
`Week 1 | Tuesday, 3 March 2026`

:::note[📅 Meeting]
**🕐 08:00**  📍 *Tuesday 3 March 2026 | Renata Silva’s office*

**Informal Strategy Discussion**

*Attendees: Renata Silva (VP Ops), Kofi Mensah (EA)*
:::

> **Renata Silva** — *VP Global Manufacturing Operations*
>
> Kofi, unplanned downtime cost us $31 million last year across fourteen plants. We have vibration sensors, thermal cameras, and oil analysis on every major asset already — we’re drowning in data and still getting surprised by failures. I want an AI system that acts on this data, not just another dashboard nobody looks at.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> ‘Acts on it’ is the interesting word. Are we talking about an agent that recommends maintenance windows to a human planner, or one that actually reschedules production and orders parts on its own?

> **Renata Silva** — *VP Global Manufacturing Operations*
>
> Ideally both, eventually. But I don’t want to wait two years for ‘eventually.’ Show me what’s realistic in six months.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> Give me two weeks in Leipzig with Hans’s team before I answer that. Predictive maintenance failures are rarely a modelling problem — they’re usually an organisational-handoff problem wearing a modelling costume.

:::note[📅 Meeting]
**🕐 10:00**  📍 *Thursday 5 March 2026 | Leipzig Facility, Maintenance Control Room*

**Discovery Interview**

*Attendees: Kofi Mensah (EA), Hans Weber (Plant Director), Owen Baptiste (Safety Engineer)*
:::

> **Hans Weber** — *Plant Director, Leipzig*
>
> We already get predictive alerts — our current anomaly detection model flags bearing degradation on Line 3 with reasonable accuracy, maybe two weeks’ lead time. The problem is what happens after the alert. It goes into a maintenance ticket queue that’s prioritised manually, alongside forty other tickets. By the time a planner schedules it against production windows and procurement orders the replacement part, we’ve often lost the lead time and the bearing fails anyway.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> So detection isn’t the bottleneck — orchestration across maintenance scheduling, production planning, and procurement is. How many separate systems and separate humans does an alert have to pass through before a part gets ordered?

> **Owen Baptiste** — *Safety & Reliability Engineer*
>
> Four systems, three approvals. The anomaly detection alert goes to a CMMS ticket. A planner reviews it against the production schedule — that’s a separate MES system. If parts are needed, that’s a manual requisition into procurement’s ERP, which then needs Grzegorz’s team to check supplier lead times and place an order. Average time from alert to parts-on-order: eleven days. Our average predictive lead time on bearing failures is fourteen days. We have a three-day margin, and half the time we blow through it.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> This is exactly the pattern I want to design for, and it’s also where I want to be most careful. An agentic system that closes this loop — detection to scheduling to procurement — has real value. But safety-critical production rescheduling and financial procurement commitments are two different risk categories, and I don’t want to build one agent that casually does both with the same authority level.

> **Owen Baptiste** — *Safety & Reliability Engineer*
>
> Agreed on safety. Any agent touching production scheduling on a live manufacturing line needs a hard stop if there’s any ambiguity — we’ve had near-misses in the past from over-eager automated systems that didn’t understand a maintenance window overlapped with a hazardous changeover procedure.

:::tip[💭 Internal Thought]

Renata wants ‘acts on its own’ and I understand the business pressure behind that. But I’ve just heard a safety engineer describe a near-miss from a previous automated system that didn’t understand changeover hazards. The agentic pattern I design here needs graduated autonomy — different confidence and authority thresholds for a procurement suggestion versus a live production line rescheduling action. Those cannot be the same decision.

:::

:::info[📋 Artifact: AIA-2026-021]

**Architecture Intake Assessment — Predictive Maintenance Orchestration Agent**

*Draft v0.2 | Ironclad Industrial Group*

**BUSINESS PROBLEM STATEMENT**

$31M unplanned downtime cost across 14 plants (2025). Root cause: not detection accuracy (14-day average predictive lead time already achieved) but a 11-day multi-system, multi-approval handoff from alert to parts-on-order, consuming most of the predictive lead-time margin.

**STRATEGIC ALIGNMENT**

Operational excellence programme target: 25% unplanned downtime reduction by FY2027. Safety non-negotiable: zero increase in production-scheduling risk incidents.

**LANDSCAPE FINDINGS**

Four disconnected systems (anomaly detection, CMMS, MES, procurement ERP), three manual approval handoffs. No unified orchestration layer. One prior automated-scheduling near-miss on record (2023, unrelated vendor tool, decommissioned).

**BUILD / BUY / REUSE ASSESSMENT**

Option A: Fully autonomous end-to-end agent (detect → schedule → procure, no human gate) — Effort: MED, Risk: HIGH (safety exposure), Speed: HIGH

Option B: Graduated-autonomy multi-agent orchestrator — autonomous procurement recommendation with human-approved commitment; production rescheduling proposal requires safety-engineer sign-off always — Effort: MED-HIGH, Risk: MED, Speed: MED

Option C: Workflow automation only (ticket routing), no generative reasoning — Effort: LOW, Risk: LOW, Speed: HIGH, Value: LOW

**RECOMMENDATION**

Option B — graduated autonomy, with production-scheduling actions permanently requiring human safety sign-off regardless of confidence level.

:::

:::tip[✅ Stage Outcomes]

- ✅ Root cause reframed: not detection accuracy but an 11-day cross-system handoff consuming nearly all predictive lead-time margin

- ✅ Prior automated-scheduling near-miss surfaced during discovery, directly shaping the graduated-autonomy design principle

- ✅ Graduated autonomy established as the core architecture concept: procurement recommendation vs. production-scheduling action treated as different risk tiers from the outset

- ✅ Safety engineering embedded as a stakeholder from Incubation, not bolted on after a build decision

:::

## Stage 2 — WHO HOLDS THE STOP BUTTON

*Approving autonomy tiers, not just a budget*
`Week 5 | Monday, 6 April 2026`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Monday 6 April 2026 | Ironclad Global HQ, Board Room 2*

**Architecture Review Board (ARB)**

*Attendees: Kofi (EA), Renata (VP Ops), Hans (Plant Director), Owen (Safety), Grzegorz (Procurement)*
:::

> **Grzegorz Nowak** — *Head of Procurement*
>
> I want to understand the procurement autonomy tier specifically. Are we saying the agent can place purchase orders with our suppliers without a human clicking approve?

> **Kofi Mensah** — *Enterprise AI Architect*
>
> For pre-qualified suppliers, pre-approved part categories, and orders below a defined value threshold — yes, autonomous placement, with your team notified in real time and a daily reconciliation report. Above the threshold, or for a non-pre-qualified supplier, or a part category with a history of spec ambiguity, it generates a recommendation for a human buyer to approve. That threshold and the pre-qualified list are entirely owned and set by your team, not by engineering.

> **Grzegorz Nowak** — *Head of Procurement*
>
> And if a supplier’s lead time or price has changed since our last data sync? I don’t want the agent committing us to stale pricing.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> Good catch — the agent must call the supplier’s live quote API at time of order, not rely on cached catalogue data, and if the live quote deviates more than a configurable percentage from the cached expectation, that’s an automatic route to human review regardless of the value threshold. I’ll add that as a hard design requirement today.

> **Owen Baptiste** — *Safety & Reliability Engineer*
>
> My position on production-scheduling actions hasn’t moved since our discovery conversation. I want it in the ADR explicitly: the agent may propose a maintenance window and a rescheduling plan, complete with its reasoning and any safety-relevant flags it can identify, but it never commits a schedule change to the live MES system without a safety engineer’s explicit sign-off. No confidence threshold, however high, changes that. This is a permanent architectural boundary, not a temporary one we relax once we trust the system.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> Agreed, and I want to be explicit about why that asymmetry with procurement is correct rather than inconsistent: a bad procurement decision costs money and is usually reversible. A bad

production-scheduling decision on a live industrial line can put people at risk and isn’t reversible in the same way. Same programme, two genuinely different autonomy tiers, and that’s intentional.

> **Hans Weber** — *Plant Director, Leipzig*
>
> What happens if the agent’s proposed maintenance window and Owen’s team’s judgment disagree?

> **Kofi Mensah** — *Enterprise AI Architect*
>
> The human judgment wins, always, in that pathway. The agent’s job in the scheduling tier is to surface a well-reasoned proposal fast, with the underlying sensor evidence, not to be the final word.

I **ARTIFACT: ADR-2026-013**

### **Architecture Decision Record — Predictive Maintenance Orchestration Agent**

*Issued 6 April 2026*

**DECISION**

Approve Option B — graduated-autonomy multi-agent orchestrator across three domains: detection, production scheduling, procurement.

**AUTONOMY TIERS**

Tier A (Autonomous): Procurement orders for pre-qualified suppliers, pre-approved part categories, below value threshold, with live quote verification — agent acts, human notified.

Tier B (Recommend + Approve): Procurement outside Tier A criteria; agent recommends, human buyer approves.

Tier C (Propose Only, Permanent): Any production-scheduling change on a live MES system — agent proposes with full reasoning trace, safety engineer sign-off mandatory, no confidence threshold exception, ever.

**CONDITIONS**

[SAFETY-001] Tier C boundary is architecturally permanent, not a maturity-based relaxation target [PROC-001] Live supplier quote verification mandatory at time of any Tier A order; price/lead-time deviation beyond threshold forces Tier B routing

[OPS-001] Daily reconciliation report of all Tier A autonomous actions to procurement leadership

**ARB CHAIR SIGN-OFF**

Renata Silva (VP Global Manufacturing Operations) — DATE: 06/04/2026

:::tip[✅ Stage Outcomes]

- ✅ Three-tier graduated autonomy model formally approved: autonomous, recommend-and-approve, propose-only

- ✅ Production-scheduling autonomy boundary made permanent and confidence-threshold-proof, not a temporary training-wheels stage

- ✅ Live supplier quote verification made a hard architectural requirement, preventing stale-pricing commitments

- ✅ Procurement autonomy thresholds and pre-qualified lists placed under business ownership, not engineering discretion

:::

## Stage 3 — THE REASONING TRACE NOBODY COULD READ

*Explainability as a safety requirement, not a nice-to-have*
`Weeks 6–12 | April–May 2026`

:::note[📅 Meeting]
**🕐 11:00**  📍 *Wednesday 22 April 2026 | Agentic Systems Lab*

**Design Working Session**

*Attendees: Kofi (EA), Ayesha Malik (Lead Agentic Systems Engineer)*
:::

> **Ayesha Malik** — *Lead Agentic Systems Engineer*
>
> First prototype of the scheduling-proposal agent is generating recommendations with reasoning, but I want your read on the output format. Right now it’s a single free-text paragraph explaining why it picked a given maintenance window — citing sensor trends, production calendar conflicts, and part availability all blended together.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> Owen’s team has maybe ninety seconds to review each proposal before their shift moves on. A blended paragraph means they either read it carefully every time — unlikely under time pressure — or they skim and effectively rubber-stamp it, which defeats the entire point of a mandatory human sign-off. I want the reasoning trace structured, not narrative: separate, labelled sections for sensor evidence, production-calendar conflicts, and safety-relevant flags, each with its own confidence indicator, so a safety engineer can jump straight to the section that matters for their judgment.

> **Ayesha Malik** — *Lead Agentic Systems Engineer*
>
> That’s a bigger change than formatting — it means the agent’s internal reasoning process itself needs to be modular, not one end-to-end generation call, so each section can be independently produced and independently wrong without contaminating the others.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> Correct, and that’s the right trade to make. It costs us some development time now. It buys us a review process that safety engineers can actually perform quickly and reliably, which is the entire justification for Tier C existing as a human-gate rather than full autonomy. An unreadable reasoning trace makes the human gate theatrical rather than real.

:::note[📅 Meeting]
**🕐 15:00**  📍 *Thursday 14 May 2026 | Agentic Systems Lab*

**Red-Team Findings Review**

*Attendees: Kofi (EA), Ayesha (Lead Engineer), Grzegorz (Procurement)*
:::

> **Ayesha Malik** — *Lead Agentic Systems Engineer*
>
> Red-team finding: we simulated a scenario where a pre-qualified supplier’s catalogue data was corrupted — a part description field that normally contains a simple SKU got replaced with a long text string during a test data feed error. The procurement agent partially parsed the corrupted field as if it contained ordering instructions, and generated an order for a different quantity than intended before our validation layer caught the mismatch against the original maintenance ticket.

> **Grzegorz Nowak** — *Head of Procurement*
>
> Caught before actual placement, or after?

> **Ayesha Malik** — *Lead Agentic Systems Engineer*
>
> Before — our quantity-reconciliation check against the originating maintenance ticket flagged the mismatch and routed to Tier B human review. But it’s uncomfortably close. If the corrupted field had produced a plausible-but-wrong quantity instead of an implausible one, the reconciliation check might not have caught it.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> This is the manufacturing-domain version of the injection-style risk I’d expect in any agentic system that ingests external, less-trusted data — in this case a corrupted or manipulated supplier catalogue field rather than a malicious prompt, but the failure shape is the same: untrusted external content getting interpreted as instructions. I want every field sourced from a supplier system tagged as untrusted data, structurally isolated the same way we’d isolate untrusted text in any other agentic pipeline, plus a tightened reconciliation check that validates quantity, part number, and unit price independently against the originating maintenance ticket — not just plausibility.

:::info[📋 Artifact: SAD-2026-018]

**Solution Architecture Document (Extract) — Maintenance Orchestration Agent**

*v1.0 | Approved 26 May 2026*

**SECTION 3: REASONING TRACE FORMAT**

Scheduling-proposal agent output restructured into three independently-generated, labelled sections: Sensor Evidence, Production-Calendar Conflicts, Safety-Relevant Flags — each with its own confidence indicator. Free-text narrative summary retained as a fourth, non-authoritative section for context only.

**SECTION 4: SUPPLY-DATA PROVENANCE CONTROLS**

All fields sourced from external supplier systems (catalogue descriptions, pricing, lead times) tagged untrusted; structurally isolated from any instruction-interpretation pathway. Tier A order generation requires independent reconciliation of quantity, part number, and unit price against the originating maintenance ticket — not plausibility checking alone.

**SECTION 5: NON-FUNCTIONAL REQUIREMENTS**

Scheduling proposal generation: under 60 seconds. Tier A procurement order cycle time: under 4 hours from ticket creation, including live quote verification.

:::

:::tip[✅ Stage Outcomes]

- ✅ Reasoning trace redesigned from a single free-text paragraph into structured, independently-generated sections — making the human safety gate practically usable, not just formally present

- ✅ Red-team exercise caught a corrupted-supplier-data failure mode before production, one call away from an incorrect autonomous order

- ✅ Untrusted-data isolation pattern applied to supplier catalogue fields, generalising the injection-defence principle beyond text-based prompt injection to structured external data corruption

- ✅ Independent multi-field reconciliation established as a stronger Tier A safeguard than single-field plausibility checking

:::

## Stage 4 — THE SHIFT CHANGE PROBLEM

*Where a well-designed gate fails for a completely human reason*
`Months 4–7 | June–September 2026`

:::note[📅 Meeting]
**🕐 09:00**  📍 *Tuesday 21 July 2026 (50% Build Review) | Leipzig Facility*

**50% Architecture Compliance Review**

*Attendees: Kofi (EA), Ayesha (Lead Engineer), Owen (Safety), Hans (Plant Director)*
:::

> **Owen Baptiste** — *Safety & Reliability Engineer*
>
> Pilot data from four weeks of shadow-mode Tier C proposals: the structured reasoning trace is working well — my team reviews proposals in about forty seconds average, well within our window, and catches issues meaningfully more often than with the old unstructured tickets. One operational problem, though, not a system flaw: a proposal that arrives fifteen minutes before a shift change tends to get either rushed through or missed entirely as the outgoing engineer hands off.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> That’s a real gap and it’s exactly the kind of failure mode that a purely technical review misses — the gate is well-designed but the human process around it has a timing blind spot. What’s the actual data — how many proposals landed in that shift-change window?

> **Owen Baptiste** — *Safety & Reliability Engineer*
>
> Eleven out of ninety-four shadow-mode proposals in the pilot period. None caused an actual incident since we’re still in shadow mode, but two were rushed through with what I’d call a superficial review compared to our normal standard.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> Then this needs a design response, not just a process reminder to be more careful during shift change — reminders don’t survive contact with a busy handoff. I want the orchestrator aware of the shift schedule: any Tier C proposal generated within a defined window before shift change gets held and delivered to the incoming engineer at the start of their shift instead, unless the underlying maintenance urgency genuinely can’t wait, in which case it escalates to both outgoing and incoming engineers simultaneously with an explicit urgency flag.

> **Hans Weber** — *Plant Director, Leipzig*
>
> That requires the orchestrator to know our shift schedules across fourteen plants, which differ by site and even by season for some facilities.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> Understood — that becomes a per-plant configuration input the orchestrator consumes, owned by each plant’s operations team, not a hardcoded assumption. I’d rather build that configuration layer now than find this same shift-change gap independently at each of the other thirteen plants during their rollouts.

:::tip[💭 Internal Thought]

This is a good reminder that a lot of agentic system risk isn’t in the model or the orchestration logic at all — it’s in how the system’s output timing interacts with ordinary human routines like a shift handoff. Owen caught this because he’s watching real reviewers under real conditions, not because any evaluation metric flagged it. I need to keep building in time for exactly this kind of operational observation during the build stage, not just technical compliance review.

:::

:::info[📋 Artifact: GUARD-2026-011]

**Shift-Aware Delivery Guardrail**

*v1.0 | Applies to all Tier C proposal delivery, all plants*

**REQUIREMENT**

Tier C scheduling proposals generated within a per-plant-configured window before shift change are held and delivered at the start of the incoming shift, unless maintenance urgency exceeds a configured threshold, in which case both outgoing and incoming engineers are notified simultaneously with an explicit urgency flag.

**CONFIGURATION OWNERSHIP**

Per-plant shift schedule and urgency threshold configuration owned by each plant’s operations leadership, not hardcoded centrally.

:::

:::tip[✅ Stage Outcomes]

- ✅ Shift-change timing gap discovered through direct observation of real reviewer behaviour during shadow-mode pilot, not through any automated evaluation metric

- ✅ Shift-aware delivery guardrail built as a platform-level control, applicable to all fourteen plants rather than fixed once per site

- ✅ Structured reasoning trace validated in practice: forty-second average review time, meeting the ninety-second operational window

- ✅ Reinforced design principle: human-factors observation during build is as important as technical compliance review

:::

## Stage 5 — THE QUARTER THE THRESHOLD MOVED

*Watching the procurement autonomy tier earn — or lose — trust with data*
`Months 8–12 | October 2026–February 2027`

Full rollout across all fourteen plants completes by 15 October 2026. Tier A autonomous procurement handles 61% of maintenance-related part orders within three months. Average alert-to-parts-on-order time falls from 11 days to 1.4 days. Tier C proposals maintain a 96% safety-engineer approval rate with structured reasoning trace, and zero scheduling-related safety incidents in the first operating quarter.

:::note[📅 Meeting]
**🕐 10:00**  📍 *Thursday 21 January 2027 | Ironclad Global HQ*

:::

**Quarterly Procurement Autonomy Review — Attendees: Kofi (EA), Grzegorz (Procurement), Lucia Ferraro (Supply Chain Partner Manager)**

> **Grzegorz Nowak** — *Head of Procurement*
>
> Quarterly data on Tier A: 61% autonomous rate, zero incorrect orders, average cycle time under an hour for straightforward cases. I want to raise the value threshold for autonomous action — right now we’re capping Tier A at orders under €5,000, and I think the data supports raising that to €15,000.

> **Lucia Ferraro** — *Supply Chain Partner Manager*
>
> I’d want to see the threshold change tested against a specific failure scenario first, not just aggregate accuracy — aggregate numbers look great because most of our orders under €5,000 are simple, standard parts. The €5,000–€15,000 band includes some custom-fabricated components with longer, more variable supplier lead times and more room for spec ambiguity.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> That matches a pattern I want us to standardise across every autonomy threshold in this programme, not just this one: raising a threshold isn’t a single number decision, it’s a decision about whether the new band of cases shares the same risk profile as the validated band. I’d want Lucia’s team to pull a sample of €5,000–€15,000 historical orders and specifically stress-test the agent against the custom-fabrication subset before any threshold change, the same way Dr. Grant’s panel stress-tests new fast-track procedures in a completely different industry’s prior-auth programme I worked on. Aggregate accuracy on a broader band can hide a systematic weakness in a clinically — or here, operationally — important minority of cases.

> **Grzegorz Nowak** — *Head of Procurement*
>
> Fair. I’d rather do that stress test properly than raise the threshold and find the gap the expensive way.

:::info[📋 Artifact: OPS-2027-Q1]

**Maintenance Orchestration Agent — Quarterly Operating Review**

*Q1 2027 | All 14 Plants*

**THROUGHPUT**

Alert-to-parts-on-order: 1.4 days average (from 11-day baseline). Tier A autonomous procurement: 61% of maintenance orders, zero incorrect orders in the period. Tier C safety-engineer approval rate: 96%, structured trace review averaging 42 seconds.

**SAFETY**

Zero scheduling-related safety incidents. Shift-change guardrail triggered 34 times across all plants; all held proposals correctly delivered at shift start with no missed urgent cases.

**FINANCIAL**

Unplanned downtime cost reduction: 19% year-over-year against the 25% FY2027 target, on track given phased rollout.

**GOVERNANCE ACTION**

Tier A value threshold increase request (€5,000→€15,000) deferred pending stress test of custom-fabrication order subset, following the same evidence-before-expansion principle applied elsewhere in Ironclad’s agentic governance.

:::

:::tip[✅ Stage Outcomes]

- ✅ Alert-to-parts-on-order time reduced from 11 days to 1.4 days across all fourteen plants

- ✅ Tier A autonomous procurement expanded to 61% of orders with zero incorrect autonomous orders recorded

- ✅ Threshold-expansion request correctly deferred pending subset-specific stress testing, avoiding aggregate-accuracy blind spots

- ✅ Zero safety incidents in first full operating quarter; shift-change guardrail functioning as designed

:::

## Stage 6 — THE PLATFORM BEHIND THE PLANT

*Annual review — generalising graduated autonomy beyond maintenance*
`Month 13 | March 2027`

:::note[📅 Meeting]
**🕐 13:00**  📍 *Tuesday 9 March 2027 | Ironclad Global HQ*

**Annual Programme Review**

*Attendees: Kofi (EA), Renata (VP Ops), Owen (Safety), Grzegorz (Procurement)*
:::

> **Renata Silva** — *VP Global Manufacturing Operations*
>
> Nineteen percent downtime reduction in year one, on track for the 25% target. Quality control and logistics teams are both asking whether they can get a version of this for their own workflows — quality wants an agent for defect-root-cause investigation, logistics wants one for cross-plant inventory rebalancing.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> Same answer I’d give in any domain: they shouldn’t reuse the maintenance agents directly, but they should absolutely build on the same underlying platform — the graduated-autonomy tiering model, the structured reasoning trace pattern, the untrusted-external-data isolation approach, and the

threshold-expansion-requires-subset-stress-testing governance discipline. That’s what actually generalises. I want to formalise those as the Ironclad Agentic Operations Framework so quality and logistics don’t have to rediscover the shift-change problem or the corrupted-catalogue-field problem independently.

> **Owen Baptiste** — *Safety & Reliability Engineer*
>
> From a safety standpoint, I’d want any new domain that touches physical operations — logistics routing, equipment control — to go through the same Tier C-style permanent human-gate analysis we did here, evaluated fresh for that domain’s specific risk, not just inherited by default.

> **Kofi Mensah** — *Enterprise AI Architect*
>
> Agreed — the framework provides the pattern and the governance discipline, not a pre-approved autonomy tier. Every new domain still runs its own Incubation and Approve stages to determine where its own tiers sit.

:::info[📋 Artifact: PLATFORM-2027-002]

**Ironclad Agentic Operations Framework — Rationalisation Decision**

*March 2027*

**DECISION**

Maintenance Orchestration Agent’s graduated-autonomy tiering model, structured reasoning trace pattern, and threshold-governance discipline extracted into a reusable Ironclad Agentic Operations Framework, owned by Enterprise AI Architecture.

**MANDATORY FOR NEW DOMAINS**

Domain-specific autonomy tiering with explicit permanent-human-gate analysis for any physical-operations risk · Structured, section-labelled reasoning traces for any human-reviewed output · Untrusted external-data isolation for any agent consuming supplier, partner, or customer-controlled data · Subset stress-testing requirement before any autonomy threshold expansion

**NEXT INTAKES**

Quality Defect Root-Cause Agent and Cross-Plant Inventory Rebalancing Agent enter Architecture Intake Q2 2027, each running independent tiering analysis under the shared framework.

:::

:::tip[✅ Stage Outcomes]

- ✅ Graduated-autonomy governance model extracted into a reusable Ironclad Agentic Operations Framework

- ✅ Framework provides shared patterns, not shared autonomy — every new domain runs independent risk-tiering analysis

- ✅ Two new business-function agent initiatives queued to build on shared infrastructure and governance discipline

- ✅ Year-one programme achieves 19% downtime reduction, on track for 25% FY2027 target, with zero safety incidents

#### **EPILOGUE & ARTEFACT REGISTER**

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Intake Assessment (AIA-2026-021)|Incubation|VP Ops, Plant Director, Safety|
|Architecture Decision Record (ADR-2026-013)|Pitch / Approve|ARB, Safety, Procurement|
|Solution Architecture Document (SAD-2026-018)|Design|Agentic Systems Eng, Safety|
|Shift-Aware Delivery Guardrail (GUARD-2026-011)|Build|Plant Operations, Safety|
|Quarterly Operating Review (OPS-2027-Q1)|Operate|Procurement, Supply Chain|
|Agentic Operations Framework Decision<br>(PLATFORM-2027-002)|Review|VP Ops, Safety, Procurement|

*“Autonomy is not a single dial you turn up as trust grows. It’s a set of separate decisions — one per risk category — and some of those decisions should never move, no matter how good the data looks.”*

:::
