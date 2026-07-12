---
title: "Two VPs, One Agent, No Agreement on Who Owns It"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Case_12_Meritage_Dynamic_Pricing_Agent.pdf"
doc_type: guide
tags: ["ai-usecases"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# Two VPs, One Agent, No Agreement on Who Owns It
Building an Agentic Dynamic Pricing and Inventory Rebalancing System Through Turf Conflict, a Merger, and a $20,000 Mistake

A transcript-style account following Teodor Rusu, Enterprise AI Architect at Meritage Retail Group, through a cross-functional ownership fight, a genuine vendor-native-versus-portable architecture debate, a mid-design acquisition, and a production incident where dozens of individually-bounded pricing decisions compounded into one very expensive mistake.

## Cast of Characters

| Character | Role |
| ----------- | ------ |
| **Teodor Rusu** ⭐ | Enterprise AI Architect, Commerce Platform (EA) — our protagonist |
| **Alicia Byrne** | Chief Commercial Officer (CCO) — original sponsor |
| **Grant Okafor** | VP Merchandising |
| **Sunny Patel** | VP Supply Chain & Inventory |
| **Wren Delacroix** | Head of Platform Engineering (vendor-native advocate) |
| **Ines Cabrera** | Lead AI Engineer, Pricing Systems |
| **Hollis Vance** | CFO |
| **Deborah Ash** | Store Operations Director, Region West |

:::info[Case Journey]
**`INCUBATION`**  →  **`PITCH / APPROVE`**  →  **`DESIGN`**  →  **`BUILD`**  →  **`OPERATE`**  →  **`REVIEW`**  →  **`RETROSPECTIVE`**
:::

*Meritage Retail Group | Agentic Dynamic Pricing & Inventory Rebalancing | 2027*

---

## Stage 1 — TWO VPS, ONE AGENT, NO AGREEMENT ON WHO OWNS IT

*Before any architecture exists, a turf fight over who the system serves*
`Weeks 1–5 | February 2027`

:::note[📅 Meeting]
**🕐 09:30**  📍 *Monday 1 February 2027 | Alicia Byrne’s office*

**Informal Strategy Discussion**

*Attendees: Alicia Byrne (CCO), Teodor Rusu (EA)*
:::

> **Alicia Byrne** — *Chief Commercial Officer*
>
> Teodor, we’re losing margin on slow-moving inventory because markdown decisions happen on a weekly cadence, manually, across twelve thousand SKUs. I want an agentic system that continuously monitors sell-through and adjusts pricing in near real time.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> That’s buildable, and I want to flag early that this sits at the intersection of two organizations that don’t currently share a system of record for the same decision — Merchandising owns pricing strategy, Supply Chain owns inventory positioning, and a real-time pricing agent is going to need to reason about both simultaneously. Before I scope architecture, I need Grant and Sunny in the same room agreeing on how this system’s recommendations get authorized, because if they don’t agree upfront, we’ll build something neither of their teams trusts.

:::note[📅 Meeting]
**🕐 14:00**  📍 *Thursday 4 February 2027 | Meritage HQ, Conference Room 3B*

**Stakeholder Alignment Meeting**

*Attendees: Teodor Rusu (EA), Grant Okafor (VP Merchandising), Sunny Patel (VP Supply Chain)*
:::

> **Grant Okafor** — *VP Merchandising*
>
> I want to be direct — pricing is a merchandising decision. It affects brand positioning, category strategy, promotional calendar conflicts. I don’t want an inventory-driven system making price cuts that undercut a planned promotion three weeks out because a model sees slow sell-through and doesn’t know a promotion is coming.

> **Sunny Patel** — *VP Supply Chain & Inventory*
>
> And I want to be equally direct — inventory carrying cost is a real, measurable number, and merchandising has historically been slow to markdown items that are burning warehouse space and working capital, because pricing decisions get made on a cadence that doesn’t match how fast inventory problems compound. If this system reports into Merchandising alone, I have no confidence it will actually act on inventory signals with urgency.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> I don’t think this is a question either of your organizations can resolve by one of you owning the system outright, because you’re both right about the risk of the other design. I want to propose the system itself embodies the joint constraint structurally, not organizationally — pricing recommendations are generated against both a merchandising-calendar constraint layer, so it can’t undercut a planned promotion, and an inventory-urgency signal, so slow-moving stock gets flagged with real teeth. Neither team owns the agent outright; both teams own inputs to it, and both have to approve the constraint logic that governs it.

> **Grant Okafor** — *VP Merchandising*
>
> I could accept that if I have visibility into every recommendation before it executes and can veto anything that conflicts with active promotional planning.

> **Sunny Patel** — *VP Supply Chain & Inventory*
>
> And I want a standing report on veto rate — if merchandising vetoes inventory-urgency-driven markdowns constantly, that tells us the constraint logic is miscalibrated, not that the system is wrong to flag it.

:::tip[💭 Internal Thought]

This joint-ownership design is the right call, but I know from experience it’s also the harder path operationally — a system with two co-equal stakeholder groups is much easier to get right architecturally and much easier to get wrong politically, the first time a real disagreement surfaces in production rather than in a planning meeting. I want to build the veto-rate reporting Sunny asked for from day one, specifically so a future disagreement has data behind it instead of becoming another turf argument.

:::

:::note[📧 Email]

**From:** Teodor Rusu (Enterprise AI Architect)

**To:** Wren Delacroix (Head of Platform Engineering)

**Subject:** Early Flag: Agentic Pricing System — Need Your Input on Build vs. Vendor-Native Direction

Wren, scoping an agentic dynamic pricing system jointly governed by Merchandising and Supply Chain, with structural constraint logic rather than single-team ownership. Before I go further into architecture, I want your team’s early read on platform direction — I know Platform Engineering has been pushing vendor-native services for velocity, and I want to understand that constraint before I design something that assumes portability we might not actually get budget or support for. Can we talk this week, ideally before Grant and Sunny’s teams start assuming a direction I haven’t validated with you? Teodor

:::

:::tip[✅ Stage Outcomes]

- ✅ Cross-functional ownership conflict between Merchandising and Supply Chain surfaced and addressed structurally through shared constraint logic, rather than resolved by assigning single-team ownership

- ✅ Veto-rate monitoring built into the design from intake specifically to convert future organizational disagreement into data rather than repeated political conflict

- ✅ Platform Engineering’s vendor-native preference flagged as an open architectural tension before any design commitment was made

:::

## Stage 2 — VENDOR-NATIVE VERSUS PORTABLE, FOUGHT IN FRONT OF THE BOARD

*A genuine architecture disagreement, not a rubber-stamp review*
`Weeks 6–10 | March 2027`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Wednesday 10 March 2027 | Meritage HQ, ARB Chamber*

**Architecture Review Board Session**

*Attendees: Teodor (EA), Wren Delacroix (Platform Eng), Ines Cabrera (Lead AI Eng), Alicia Byrne (CCO), Hollis Vance (CFO)*
:::

> **Wren Delacroix** — *Head of Platform Engineering*
>
> I want to push hard for building this on our cloud provider’s native pricing-optimization and agent-orchestration services rather than a portable, self-managed stack. We already pay for that platform, our team already operates it at scale, and a vendor-native build gets us to pilot roughly two months faster than standing up and operating a comparable portable architecture ourselves.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> I understand the velocity argument and I don’t want to dismiss it, but I want to raise a concern specific to this system rather than a general portability preference: pricing logic embodying two organizations’ negotiated constraint structure is exactly the kind of business logic I don’t want tightly coupled to a single vendor’s proprietary agent-orchestration format, because if we ever need to renegotiate that constraint structure — which given the Merchandising/Supply Chain tension we just navigated, I think is likely — I want that logic in a form we control directly, not embedded in vendor-specific configuration we’d need to reverse-engineer.

> **Wren Delacroix** — *Head of Platform Engineering*
>
> That’s a fair concern, but two months of delay has a real cost too — markdown decisions on twelve thousand SKUs on a weekly cadence are bleeding margin every week this isn’t live.

> **Hollis Vance** — *CFO*
>
> I want to hear both of you actually quantify that trade-off rather than argue it qualitatively. Teodor, what’s the actual cost of vendor lock-in here, concretely, not hypothetically? Wren, what specifically is driving the two-month gap — is it truly the platform choice, or is some of it other build work that would take the same time regardless?

:::note[📅 Meeting]
**🕐 15:00**  📍 *Wednesday 10 March 2027 | Engineering breakout room*

**Post-Meeting Technical Session**

*Attendees: Teodor (EA), Wren (Platform Eng), Ines Cabrera (Lead AI Eng)*
:::

> **Ines Cabrera** — *Lead AI Engineer, Pricing Systems*
>
> I went back through the vendor-native proposal in detail. About five weeks of the two-month gap is genuinely platform-choice-driven — standing up equivalent portable orchestration infrastructure ourselves. The other three weeks is core pricing-logic development that’s identical either way and I mis-scoped as platform-dependent in the original estimate.

> **Wren Delacroix** — *Head of Platform Engineering*
>
> That changes my framing — five weeks of delay for meaningfully lower lock-in risk on the specific piece Teodor is worried about is a more defensible trade than the two months I originally presented. I’d still lean vendor-native for the surrounding infrastructure — monitoring, scaling, deployment — where lock-in risk is much lower, and reserve the portable approach specifically for the constraint-logic and orchestration layer Teodor flagged.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> I can live with that split — vendor-native where lock-in risk is genuinely low, portable specifically where the business logic is most likely to need renegotiation. That’s a better answer than either of our original positions, and it only came from actually re-scoping the estimate rather than each of us defending our first instinct.

:::info[📋 Artifact: ADR-2027-008]

**Architecture Decision Record — Agentic Dynamic Pricing & Inventory Rebalancing**

##### *Approved v1.0 | Meritage Retail Group*

**DECISION**

Hybrid architecture approved: constraint-logic and orchestration layer built on portable, self-managed infrastructure; surrounding monitoring/scaling/deployment infrastructure on vendor-native services. Five-week timeline impact accepted versus original two-month estimate for fully portable build.

**RATIONALE**

Joint Merchandising/Supply Chain constraint structure identified as the component most likely to require future renegotiation and therefore highest lock-in risk; surrounding infrastructure assessed as lower lock-in risk, justifying vendor-native velocity there.

**CONDITIONS**

Veto-rate reporting operational from go-live per intake agreement. Formal cost-benefit re-estimation required before any future full-vendor-native or full-portable architecture change.

**APPROVED BY**

ARB Panel, Alicia Byrne (CCO), Hollis Vance (CFO)

:::

:::tip[✅ Stage Outcomes]

- ✅ A genuine technical disagreement was resolved through joint re-scoping rather than either party unilaterally prevailing or a forced compromise without evidence

- ✅ Original two-month delay estimate was found to be partially mis-scoped once examined in detail, changing the actual trade-off being decided

- ✅ Hybrid architecture emerged as a better answer than either original position, driven by identifying which specific component carried the lock-in risk rather than treating portability as all-or-nothing

:::

## Stage 3 — THE MERGER NOBODY BUILT FOR

*An acquisition mid-design introduces a pricing system that speaks a different language entirely*
`Weeks 12–20 | April–June 2027`

:::note[📅 Meeting]
**🕐 11:00**  📍 *Monday 26 April 2027 | Meritage HQ, Executive Floor*

**Unexpected Development**

*Attendees: Teodor (EA), Alicia Byrne (CCO), Hollis Vance (CFO)*
:::

> **Alicia Byrne** — *Chief Commercial Officer*
>
> Teodor, this hasn’t been publicly announced yet, but the board approved acquiring Fernhollow Home Goods, expected to close in ten weeks. Fernhollow runs on an entirely different merchandising and pricing system, with its own SKU taxonomy, its own promotional calendar structure, and roughly three thousand additional SKUs. I know this changes your scope, and I need to know how much.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> It changes scope meaningfully, and I want to be honest about that rather than pretend the current design absorbs this cleanly. The constraint-logic layer Grant and Sunny negotiated was built assuming one merchandising calendar and one SKU taxonomy. A second, structurally different pricing system means either we delay integrating Fernhollow into the agentic pricing system until after our own pilot stabilizes, or we accept a materially more complex design now that handles two taxonomies and two calendar structures from the start. I don’t think we should decide that today — I want to understand Fernhollow’s system in more depth before committing either way.

> **Hollis Vance** — *CFO*
>
> I’d push toward delay if it protects the pilot timeline — the margin case for this system was already strong on Meritage alone, and I don’t want acquisition complexity to derail a programme that’s finally past its architecture debates.

:::note[📅 Meeting]
**🕐 14:00**  📍 *Thursday 13 May 2027 | Commerce Platform Engineering lab*

**Design Working Session**

*Attendees: Teodor (EA), Ines Cabrera (Lead AI Eng), Grant Okafor (VP Merchandising)*
:::

> **Teodor Rusu** — *Enterprise AI Architect*
>
> After two weeks digging into Fernhollow’s systems with their retained merchandising lead, my recommendation is delay, but not indefinitely, and not by default — by design. I want to pilot on Meritage’s existing SKU base first, prove the constraint-logic architecture works in production under real conditions, and only then design the multi-taxonomy extension needed for Fernhollow, with real production learnings informing that extension instead of guessing at requirements for a system we haven’t operated yet.

> **Grant Okafor** — *VP Merchandising*
>
> I support that, with one condition — I want the constraint-logic layer’s data model designed now, even if the Fernhollow integration itself waits, so we’re not locking in assumptions this quarter that make the later extension harder than it needs to be. I don’t want to pay for two rebuilds because we didn’t think about extensibility while it was cheap to think about.

> **Ines Cabrera** — *Lead AI Engineer, Pricing Systems*
>
> That’s the right ask. I can design the taxonomy and calendar abstraction layer to be extensible to a second source system from the start, without actually building the Fernhollow-specific integration yet — that’s a much smaller cost now than retrofitting extensibility onto an already-built single-taxonomy system later.

:::tip[💭 Internal Thought]

This is a case where the disciplined answer and the fast answer genuinely diverge, and I’m glad Hollis’s instinct toward protecting the pilot timeline got tested against Grant’s extensibility concern rather than settled by whoever had the loudest voice in the room. Delaying full Fernhollow integration while designing for it structurally is more work upfront than either ‘just delay’ or ‘just build it all now’ would have been, but it’s the version that doesn’t leave us choosing between a rushed integration and a expensive rebuild in six months.

:::

:::info[📋 Artifact: SAD-2027-014]

**Solution Architecture Document — Agentic Dynamic Pricing & Inventory Rebalancing**

*v1.1 (Post-Acquisition Revision) | Meritage Retail Group*

**SCOPE PHASING**

Phase 1: Meritage SKU base only, pilot and production validation. Phase 2 (post-pilot stabilization): Fernhollow Home Goods integration via extensible taxonomy/calendar abstraction layer designed now, built later.

**DESIGN IMPLICATION**

Constraint-logic and orchestration layer data model designed for multi-source-system extensibility from Phase 1, avoiding retrofit cost identified as a risk by Merchandising.

**TIMELINE IMPACT**

Pilot timeline protected; Fernhollow integration timeline explicitly deferred pending Phase 1 production learnings, not committed to a premature date.

:::

:::tip[✅ Stage Outcomes]

- ✅ Mid-design acquisition absorbed through deliberate phased scoping rather than either an ungoverned scope expansion or a rushed exclusion of the new business

- ✅ Extensibility built into the data model proactively at low cost, avoiding a more expensive retrofit anticipated by Merchandising leadership

- ✅ CFO’s instinct to protect the pilot timeline was honored without abandoning the acquisition’s architectural implications, through phasing rather than a forced binary choice

:::

## Stage 4 — THE FLASH-SALE ITEM THAT PRICED ITSELF TO ZERO

*A real production incident, a real financial loss, and a hard look at what the guardrails missed*
`Weeks 24–30 | July–August 2027`

:::note[📅 Meeting]
**🕐 07:40**  📍 *Tuesday 3 August 2027 | Teodor’s phone*

**Production Incident**

*Attendees: Teodor Rusu (EA), Ines Cabrera (Lead AI Eng), on-call*
:::

> **Ines Cabrera** — *Lead AI Engineer, Pricing Systems*
>
> [urgent page] We have a production incident. During last night’s clearance flash sale, the pricing agent on a specific SKU category — patio furniture, end-of-season — entered a rapid repricing cycle, cutting price roughly every four minutes for four and a half hours before someone on overnight retail ops noticed and manually intervened. Final price on the affected SKU landed at $4.12 against a $340 list price before the intervention, and it sold through the remaining 60 units at that price before anyone caught it.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> I want a root cause before anything else, and I want to know it precisely, not approximately — this is a real financial loss and I’m not going to characterize it to Alicia and Hollis until I understand exactly what happened.

:::note[📅 Meeting]
**🕐 11:00**  📍 *Tuesday 3 August 2027 | Commerce Platform Engineering lab*

**Incident Root Cause Review**

*Attendees: Teodor (EA), Ines (Lead AI Eng), Grant Okafor (VP Merchandising), Sunny Patel (VP Supply Chain)*
:::

> **Ines Cabrera** — *Lead AI Engineer, Pricing Systems*
>
> Root cause: the flash-sale event created an unusual feedback loop we hadn’t tested for. The agent reprices based partly on real-time sell-through velocity, and the flash sale itself artificially spiked velocity, which the agent read as ‘demand signal supports further price increase headroom’ in the wrong direction — a bug in how we signed the velocity-response coefficient specifically under flash-sale conditions caused it to interpret rising velocity as justification for further cuts rather than the reverse, and it kept reinforcing its own signal every four-minute repricing cycle, each cut increasing velocity further and triggering the next cut.

> **Grant Okafor** — *VP Merchandising*
>
> I want to understand why this ran for four and a half hours before a human caught it. Where was the constraint-logic layer we spent two months building specifically to prevent this kind of thing?

> **Ines Cabrera** — *Lead AI Engineer, Pricing Systems*
>
> That’s the harder finding. The constraint layer does have a maximum-single-adjustment ceiling per repricing cycle, and every individual cut was within that ceiling. What it didn’t have was any ceiling on cumulative price movement over a rolling time window — we guarded against one bad decision, not against many individually-small decisions compounding into a catastrophic one.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> That’s on me as much as anyone — I reviewed that constraint design and didn’t push for a cumulative-movement ceiling because every scenario we tested involved a single erroneous signal, not a reinforcing feedback loop. I want two fixes, not one: correct the velocity-response coefficient sign error under flash-sale conditions specifically, and add a hard cumulative-price-movement ceiling over a rolling window as a permanent guardrail, independent of whether we ever fully understand every future scenario that could trigger it — the lesson here is that I shouldn’t need to anticipate the specific failure mode to guard against

the general category of ‘many small compounding actions producing one large uncontrolled outcome.’

> **Sunny Patel** — *VP Supply Chain & Inventory*
>
> I want the financial impact quantified precisely and reported transparently to Hollis, not minimized — sixty units at roughly $335 below list is a real number, and I’d rather we own it fully now than have it surface later looking like it was downplayed.

:::tip[💭 Internal Thought]

This is the incident I should have designed against and didn’t, and I want to resist the instinct to explain it away as an edge case nobody could have foreseen — ‘many individually-bounded actions compounding into an unbounded outcome’ is a known category of agentic-systems risk, not a novel one, and I’ve implicitly designed against exactly this pattern in other programmes without naming it as a general principle I should apply everywhere by default. I want that principle written down now, explicitly, as a standing requirement for every agentic system I design going forward, not just patched into this one system’s constraint layer.

:::

:::info[📋 Artifact: GOV-2027-006]

**Production Incident Report & Remediation Record**

*Meritage Retail Group*

**INCIDENT SUMMARY**

Flash-sale-induced feedback loop caused rapid, compounding repricing of one SKU category over 4.5 hours, resulting in final unit price $4.12 against $340 list; 60 units sold at erroneous price before manual intervention. Estimated direct financial impact: approximately $20,000.

**ROOT CAUSE**

Velocity-response coefficient sign error under flash-sale conditions caused rising sell-through velocity to be misread as justification for continued price cuts; per-cycle adjustment ceiling was respected on every individual cut, but no cumulative-movement ceiling existed to bound the compounding effect.

**REMEDIATION**

Velocity-response coefficient corrected for flash-sale conditions specifically. New permanent cumulative price-movement ceiling added, bounding total price change over any rolling time window regardless of individual-cycle compliance.

**STANDING PRINCIPLE ADOPTED**

"Many individually-bounded actions can compound into an unbounded outcome" formalized as a mandatory design consideration for every future agentic system at Meritage, not scenario-specific patching.

:::

:::tip[✅ Stage Outcomes]

- ✅ A real production incident with quantified financial loss was investigated to precise root cause and reported transparently rather than minimized

- ✅ The fix addressed both the specific coefficient-sign bug and the general architectural gap (no cumulative-movement ceiling) that allowed it to compound undetected for hours

- ✅ A generalizable agentic-systems design principle was extracted from a single incident and formally adopted as a standing requirement beyond this one system

:::

## Stage 5 — STORE MANAGERS WHO DON’T TRUST THE NUMBER ON THE SHELF

*Adoption resistance from the people who have to explain price changes to customers in person*
`Months 1–6 | September 2027–February 2028`

Following the flash-sale incident remediation, full production rollout proceeds 5 September 2027 across Meritage’s existing SKU base, Region West first. Markdown decision cadence moves from weekly manual review to continuous agentic monitoring with merchandising-calendar and cumulative-movement constraints enforced.

:::note[📅 Meeting]
**🕐 10:00**  📍 *Wednesday 20 October 2027 | Region West Store Operations*

**Adoption Feedback Session**

*Attendees: Teodor (EA), Deborah Ash (Store Operations Director, Region West)*
:::

> **Deborah Ash** — *Store Operations Director, Region West*
>
> I want to raise something the dashboards won’t show you. My store managers are getting customer complaints about price changes happening mid-shopping-trip — someone puts an item in their cart, walks the store for twenty minutes, and the shelf price has changed by the time they check out, sometimes up, sometimes down. Even though every individual change is within your constraint ceilings, the customer experience of ‘the price changed while I was standing in the store’ is corrosive to trust in a way none of your production metrics are capturing.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> That’s a real gap in what I’ve been measuring, and I appreciate you bringing it from the store floor rather than it just showing up as an unexplained complaint-rate increase in a dashboard I might not think to connect to this system. I don’t think the fix is slowing down the repricing cadence generally — the margin case depends on responsiveness. I think it’s a price-honor window: once a shelf price is displayed, it holds for some minimum duration, long enough to cover a typical shopping trip, regardless of what the agent wants to do next.

> **Deborah Ash** — *Store Operations Director, Region West*
>
> That would solve the in-store experience problem directly. I’d suggest forty-five minutes based on our average shopping-trip data, but I’d want my team’s input on the exact number before you lock it in — we see this pattern more than any dashboard does.

:::info[📋 Artifact: OPS-2028-Q1]

**Agentic Pricing & Inventory System — Quarterly Operating Review**

##### *Q1 2028*

**MARGIN PERFORMANCE**

Markdown-related margin recovery on slow-moving SKUs: approximately 4.1% improvement versus prior-year comparable period across Region West rollout.

**GOVERNANCE HOLDING**

Zero cumulative-movement ceiling breaches since flash-sale remediation. Merchandising veto rate on inventory-urgency-driven markdowns: 6%, within expected calibration range per Supply Chain’s standing monitoring request.

**CUSTOMER EXPERIENCE REMEDIATION**

Price-honor window (45 minutes) implemented following Store Operations field feedback; in-store price-change complaints down 71% in the four weeks following implementation.

**EXPANSION READINESS**

Taxonomy/calendar abstraction layer validated in production; Fernhollow Home Goods integration design work resuming per Phase 2 plan.

:::

:::tip[✅ Stage Outcomes]

- ✅ A real customer-experience harm invisible to system-level dashboards was surfaced through direct field feedback rather than metrics alone

- ✅ Price-honor window added specifically in response to store-floor input, with the exact parameter deferred to the team closest to the problem rather than set unilaterally

- ✅ Margin and governance metrics held through the first full quarter of production, with the flash-sale-derived guardrails showing zero breaches

:::

## Stage 6 — THE BUDGET CUT AND THE FERNHOLLOW QUESTION

*A mid-year cost pressure forces a hard prioritization conversation*
`Month 9 | May 2028`

:::note[📅 Meeting]
**🕐 14:00**  📍 *Tuesday 9 May 2028 | Meritage HQ, Executive Board Room*

**Annual Programme Review**

*Attendees: Teodor (EA), Alicia Byrne (CCO), Hollis Vance (CFO), Grant Okafor (VP Merchandising)*
:::

> **Hollis Vance** — *CFO*
>
> I need to tell this group directly: enterprise-wide cost pressure from a slower-than-expected first half means every discretionary programme is taking a budget reduction this year, this one included, roughly 30% off the planned remainder-of-year spend. I need to understand what that means for the Fernhollow integration specifically, since I know that’s the next major planned investment.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> I’d rather scope honestly against the reduced budget than protect the original Fernhollow timeline and quietly under-deliver on quality to hit it. The extensibility work we did in Design specifically to make this affordable is what makes a reduced-scope answer possible at all — I can propose a Fernhollow integration limited to their top 500 SKUs by revenue in this budget cycle, full 3,000-SKU integration deferred to next fiscal year, rather than a rushed full integration that risks a flash-sale-incident-style failure on a system we understand less well than our own.

> **Grant Okafor** — *VP Merchandising*
>
> I’d support the phased-down version over a rushed full version, especially given what the flash-sale incident cost us in trust as well as money. I don’t want Fernhollow’s first experience of this system to be a rushed integration that breaks in a way we could have avoided by being honest about capacity now.

> **Alicia Byrne** — *Chief Commercial Officer*
>
> Agreed. I’d rather explain a slower Fernhollow timeline to the board than explain a second production incident to them.

:::info[📋 Artifact: RDREC-2028-011]

**Annual Programme Governance Decision**

*May 2028*

**DECISION**

Agentic Dynamic Pricing & Inventory Rebalancing System confirmed as steady-state production for Meritage core SKU base. Fernhollow integration re-scoped to top 500 SKUs by revenue for current fiscal year, full integration deferred to next fiscal year, in response to enterprise-wide budget reduction.

**RATIONALE**

Reduced-scope, quality-preserved integration preferred over full-scope, timeline-compressed integration, informed directly by the flash-sale incident’s demonstrated cost of insufficiently-tested changes to production pricing logic.

**APPROVED BY**

Alicia Byrne (CCO), Hollis Vance (CFO), Grant Okafor (VP Merchandising)

:::

:::tip[✅ Stage Outcomes]

- ✅ Mid-year budget reduction was absorbed through honest re-scoping rather than protecting the original timeline at the cost of quality

- ✅ The flash-sale incident’s lesson directly informed a cautious, phased approach to onboarding a second, less-understood pricing system under budget pressure

- ✅ Extensibility investment made during the acquisition disruption in Design paid off by making a partial, sustainable integration possible under constraint

:::

## Stage 7 — WHAT $20,000 AND FOUR AND A HALF HOURS TAUGHT THE PROGRAMME

*A candid retrospective, incident included*
`Month 9 | May 2028`

:::note[📅 Meeting]
**🕐 10:00**  📍 *Friday 19 May 2028 | Commerce Platform Engineering lab*

**Programme Retrospective**

*Attendees: Teodor (EA), Ines Cabrera (Lead AI Eng), Sunny Patel (VP Supply Chain), Deborah Ash (Store Ops Director)*
:::

> **Teodor Rusu** — *Enterprise AI Architect*
>
> I want to start with what failed, not what succeeded, because that’s the harder and more useful conversation. The flash-sale incident cost roughly $20,000 directly and, less measurably, some trust with Region West store teams before we fixed the price-honor gap. Both failures trace back to the same root cause: I designed guardrails against the specific bad scenarios I could imagine, not against the general category of risk those scenarios belonged to.

> **Ines Cabrera** — *Lead AI Engineer, Pricing Systems*
>
> I’d name the technical debt directly: the velocity-response model still has other conditions we haven’t stress-tested as thoroughly as flash sales — clearance events, weather-driven demand spikes, competitor price-matching triggers. We fixed the one feedback loop we found. I don’t have confidence we’ve found every feedback loop this architecture is capable of producing, and I want that stated plainly rather than implied to be solved.

> **Sunny Patel** — *VP Supply Chain & Inventory*
>
> From the governance side, what actually worked was building veto-rate and constraint-breach monitoring in from day one, before we had any evidence we’d need it. When the flash-sale incident happened, we already had the instrumentation to find the root cause fast, because Teodor insisted on it during intake when it seemed like process overhead rather than urgent need.

> **Deborah Ash** — *Store Operations Director, Region West*
>
> What I’d want the next programme to learn from Region West specifically: build a channel for field feedback before launch, not after a problem surfaces. We only caught the mid-shopping-trip pricing issue because I happened to escalate it directly — there was no standing mechanism for store-floor observations to reach the engineering team, and I don’t think that should depend on one manager deciding to push it upward.

> **Teodor Rusu** — *Enterprise AI Architect*
>
> That’s a fair and important gap. If I were restarting this programme, I’d build a standing field-feedback channel alongside the technical monitoring from day one, on the assumption that some real harms will only be visible from the store floor, not the dashboard — the same way I now assume some feedback loops won’t be visible until they compound.

Recommendations carried forward: (1) design guardrails against categories of risk (e.g., “many bounded actions compounding into an unbounded outcome”), not only specific anticipated scenarios; (2) instrument veto-rate, constraint-breach, and anomaly monitoring from day one regardless of perceived near-term need; (3) build a standing field-feedback channel from frontline operational staff before launch, not reactively after a customer-facing gap surfaces; (4) when cross-functional ownership conflicts exist, resolve them through structural constraint design rather than assigning single-team ownership, but budget the ongoing political cost of joint governance honestly.

:::tip[✅ Stage Outcomes]

- ✅ Retrospective led with the financial-loss incident rather than leading with success metrics, and extracted a generalizable design principle from it

- ✅ Unresolved risk (unstress-tested feedback-loop conditions beyond the one found) explicitly acknowledged rather than treated as closed by the single fix applied

- ✅ A structural gap in field-feedback channels was identified as a governance lesson independent of the technical incident, broadening the retrospective beyond the pricing bug itself

#### **EPILOGUE & ARTEFACT REGISTER**

|**Artefact**|**Stage**|**Stakeholders**|
|---|---|---|
|Architecture Decision Record (ADR-2027-008)|Pitch / Approve|ARB, CFO, Platform Engineering|
|Solution Architecture Document (SAD-2027-014)|Design|Merchandising, AI Engineering|
|Production Incident Report & Remediation Record<br>(GOV-2027-006)|Build|AI Engineering, Merchandising,<br>Supply Chain|
|Quarterly Operating Review (OPS-2028-Q1)|Operate|Store Operations, Merchandising,<br>Supply Chain|
|Annual Programme Governance Decision<br>(RDREC-2028-011)|Review|CCO, CFO, Merchandising|

*“We built guardrails for every bad scenario we could imagine, and the one that cost us $20,000 was made of dozens of individually harmless decisions we never imagined stacking up. The lesson wasn’t to imagine harder. It was to stop assuming imagination was the right defense in the first place.”*

:::
