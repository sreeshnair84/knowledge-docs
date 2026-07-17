---
title: "CCAR-P Exam Prep — Complete Guide"
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: native-md
source_file: ""
tags: ["coding-tools", "claude", "certification"]
doc_type: certification
exam_code: "CCAR-P"
exam_validity: "2 years"
last_verified_against_vendor: 2026-07-17
---

# CCAR-P Exam Prep — Complete Guide

Complete preparation for the Claude Certified Architect – Professional (CCAR-P) exam — the top tier of Anthropic's certification program, for architects who own a Claude-based system end-to-end in production rather than only designing it. Covers all 7 domains with senior-practitioner frameworks, decision tables, and 64 original scenario-based practice questions with full answer rationale.

---

## Exam Facts

| Item | Detail |
| ------ | -------- |
| Questions | 63 multiple-choice / multiple-response |
| Duration | 120 minutes |
| Passing score | 720 / 1000 (scaled, criterion-referenced) |
| Cost | $175 per attempt |
| Format | Pearson VUE — online proctored or test center |
| Validity | 2 years (inferred — see note below) |
| Prerequisite | None enforced; Architect – Foundations strongly recommended as the on-ramp |

**Retake policy:** community sources describe a staged retake-wait ladder (escalating wait periods after repeated fails, with a capped number of attempts per rolling 12-month window) and a free non-proctored renewal option if renewed on time versus a full paid retake if lapsed. Treat this as a plausible, community-reported shape for the policy, not a confirmed set of numbers — several of the specific figures circulating for this brand-new exam trace back to sites that were not independently verifiable against anthropic.com or pearsonvue.com and appear to cite one another rather than an official source. Confirm the actual retake and renewal terms in the Partner Academy candidate handbook at registration.

*Domain weightings and exam facts are compiled from Pearson VUE's Anthropic certification listing and multiple independent community sources; Anthropic's official candidate handbook (gated behind Partner Academy login) is the authoritative source — verify against it before your exam date. **Note on validity:** early community guides for this exam reported a 12-month validity period, but that claim traces back to newly-registered, SEO-oriented sites that could not be independently corroborated against anthropic.com or pearsonvue.com and appear to reference each other rather than an official source — the same pattern of unreliable sourcing seen elsewhere for this brand-new program. This guide instead follows 2 years as an inference, pattern-matched to the validity period used at the Foundations tier elsewhere in the Claude certification program. Treat this as an assumption, not a confirmed fact, until you check the candidate handbook.*

### Foundations vs. Professional

Architect – Foundations tests whether you can **design** a Claude system correctly: pattern selection, tool design, prompt engineering, context management. CCAR-P assumes you can already do that and tests whether you can **own** one: carry it from discovery through integration, evaluation, compliance review, stakeholder negotiation, and multi-year operation without an instructor checking your work. There's no enforced gate between them, but candidates who skip Foundations consistently report the CCAR-P scenario questions assume fluency with concepts — agent pattern selection, MCP primitives, HITL tiers, prompt caching — that Foundations builds from scratch. Start there if any of this domain list doesn't already feel like home turf: [CCAF Exam Prep — Complete Guide](/docs/coding-tools/claude/ccaf-exam-prep-complete).

---

## Domain Weightings

| Domain | Weight | ~Questions (of 63) |
| -------- | -------- | ----------- |
| 1 — Solution Design & Architecture | 17% | 11 |
| 2 — Claude Models, Prompting & Context Engineering | 13% | 8 |
| 3 — Integration | 19% | 12 |
| 4 — Evaluation, Testing & Optimization | 16% | 10 |
| 5 — Governance, Safety & Risk Management | 14% | 9 |
| 6 — Stakeholder Communication & Lifecycle Management | 14% | 9 |
| 7 — Developer Productivity & Operational Enablement | 7% | 4 |

---

## Domain 1 — Solution Design & Architecture (17%)

### What this domain actually tests

Foundations Domain 1 (Agentic Architecture & Orchestration) tests whether you can pick the right pattern — fan-out, DAG, adversarial — for a given task. This domain assumes you can already do that and tests something one level up: whether you can take a vague business ask, turn it into a defensible architecture, and produce the artifacts a review board, a security team, and a budget owner will all sign off on independently. If you haven't seen agent patterns, HITL tiers, or memory architecture before, go build that base in [CCAF Domain 1](/docs/coding-tools/claude/ccaf-exam-prep-complete#domain-1--agentic-architecture--orchestration-27) first — this section won't re-derive it.

**Discovery-to-architecture translation.** The recurring failure mode at this level isn't picking the wrong pattern — it's skipping straight to pattern selection before the problem is actually specified. A defensible architecture traces cleanly through four artifacts:

1. **Business problem statement** — one sentence, owner-signed, with a measurable success condition (not "improve support" but "reduce first-response time from 4h to 15min without increasing headcount").
2. **Non-functional requirement (NFR) set** — latency budget, availability target, data residency constraints, peak throughput, hard cost ceiling.
3. **Candidate pattern shortlist** — 2-3 architectures that could satisfy the NFRs, with an explicit reason each other candidate was rejected.
4. **Architecture Decision Record (ADR)** — the chosen design, the rejected alternatives, and the conditions under which the decision should be revisited.

Skipping straight from problem to pattern is the single most common finding when a CCAR-P-level architecture gets challenged in review — not because the pattern was wrong, but because there's no record of why it was right.

**NFR-to-architecture mapping**

| NFR pressure | Architectural consequence |
| --- | --- |
| Sub-second latency, high volume | Favor workflow (deterministic pipeline) over open-ended agentic loop; push reasoning to build-time, not runtime |
| Hard data residency (e.g., EU-only) | Constrains cloud platform choice (region-pinned Bedrock/Vertex/Azure deployment) before model choice |
| Availability target >99.9% | Requires multi-region or multi-provider redundancy — see below — not just retries |
| Unbounded/unpredictable task complexity | Favor agentic pattern with cost ceilings (`CostLimit`) over a rigid workflow that will break on edge cases |
| Strict cost ceiling at high volume | Drives model-tiering architecture (route by task complexity) before it drives model selection |

**Build vs. buy vs. managed, at the ownership level.** Foundations Domain 1 covers *when* to reach for Managed Agents vs. the Agent SDK vs. a raw Messages API loop as a technical decision. At the Professional level the same choice is a 3-year total-cost-of-ownership and organizational-capability decision: Managed Agents minimizes ops burden but caps customization and creates a dependency the org may not be staffed to replace later; the Agent SDK maximizes control but commits the org to carrying platform-engineering headcount for the life of the system. The architect's job is to make that trade-off explicit to whoever owns the budget — not to silently pick the technically cleanest option.

**Resilience architecture: multi-region and multi-provider.** A production Claude system with a real availability SLA needs a documented failure domain, not just retries at the call site.

| Redundancy strategy | Protects against | Cost/complexity |
| --- | --- | --- |
| Single provider, multi-region (e.g., two AWS regions via Bedrock) | Regional outage | Low-moderate; same API surface |
| Multi-provider (direct Anthropic API + Bedrock + Vertex as fallback) | Single-vendor platform outage | High; requires abstraction layer, behavior parity testing across providers |
| Active-passive with health-checked failover | Most outage classes | Moderate; failover latency is itself an NFR to define |
| Active-active | Same, with no failover latency | Highest; doubles baseline infra cost and requires idempotent writes across both paths |

Multi-provider redundancy is frequently *over*-engineered relative to the actual availability requirement — the exam rewards recognizing when single-provider multi-region is sufficient, not defaulting to the most resilient (and most expensive) option.

**Capacity planning.** Rate limits and concurrency ceilings are commercial terms, not just infrastructure facts — they're negotiated with the account team ahead of a launch, not discovered during it. An architecture that assumes default-tier rate limits will hold at 10x current traffic is a planning failure, not an infrastructure failure.

---

### Domain 1 Practice Questions

**Q1.** An architect is asked to "add AI to the claims intake process." Six weeks into the project, the security team blocks launch because no one can explain why the system needs write access to the claims database instead of read-only staging. What process gap allowed this?

A) The team chose the wrong agent pattern
B) There was no NFR elicitation step defining exactly what access the system needed and why, before architecture began
C) The security team was not consulted early enough in general
D) The Agent SDK was used instead of Managed Agents

**Answer: B**
*The proximate cause looks like a stakeholder-timing problem (C), but the root cause is process: without an explicit NFR/constraint elicitation step that forces write-access justification onto paper before pattern selection, no amount of earlier security involvement would have caught it — there was nothing written down to review. Pattern choice (A) and SDK choice (D) are downstream decisions that inherit whatever was or wasn't specified upstream.*

---

**Q2.** A logistics company needs a Claude-based dispatch system with a contractual 99.95% availability SLA. The team proposes single-region deployment via the direct Anthropic API with aggressive client-side retries. What is the most defensible objection?

A) Retries alone cannot satisfy an availability SLA against a regional or provider-level outage — the architecture needs multi-region or multi-provider redundancy matched to the SLA class
B) The direct API should never be used for SLA-bound production systems
C) 99.95% is not achievable with any Claude deployment
D) Retries should be replaced with a queue instead of addressing redundancy

**Answer: A**
*Retries help with transient, sub-second failures; they do nothing for a regional outage or a sustained provider incident, which is exactly the failure class a 99.95% SLA has to survive. The fix is redundancy architecture (region or provider), sized to the specific SLA tier — not a blanket rejection of the direct API (B) or the SLA target itself (C). A queue (D) helps with backpressure, not availability.*

---

**Q3.** During an architecture review, a candidate ADR states: "We chose the agentic pattern over a deterministic workflow." No rejected alternatives or NFRs are listed. What is the correct critique?

A) The ADR is fine — the decision is stated clearly
B) The ADR is incomplete — it must also record the NFRs that drove the decision and the alternatives that were rejected and why, so the decision can be re-evaluated later without re-litigating it from scratch
C) ADRs should only be written after the system is in production
D) The pattern choice itself is wrong without more information

**Answer: B**
*A decision without its rejected alternatives and driving constraints is not reviewable or revisitable — six months later, no one (including the original author) can tell whether the conditions that justified it still hold. That's the entire point of an ADR. There isn't enough information to judge the pattern choice itself (D), and ADRs are written at decision time, not after the fact (C).*

---

**Q4.** A team is deciding between Managed Agents and the Agent SDK for a new internal tool with 3 engineers and no dedicated platform team. Six months later, the org staffs up a platform team and the tool needs heavy customization Managed Agents can't support. What does this reveal about the original decision?

A) The original choice of Managed Agents was wrong
B) The original choice was reasonable given the org's capability at the time; the correct architectural response now is a deliberate, budgeted migration decision — not evidence the first choice was a mistake
C) The team should have used the Agent SDK from day one regardless of staffing
D) Managed Agents should never be used for internal tools

**Answer: B**
*Build-vs-buy is a decision bound to organizational capability at a point in time, not a permanent technical verdict. Choosing the lower-ops-burden option when there's no platform team to carry the alternative was correct then; needing to migrate later as capability grows is a normal lifecycle event, not proof of an earlier error. The exam rewards recognizing decisions as time-bound rather than retroactively grading them against conditions that didn't exist yet.*

---

**Q5.** A system serving EU customers must keep all data processing within the EU. The team wants to use Claude via the direct Anthropic API for simplicity. What is the architectural constraint this creates?

A) None — the direct API can be configured for EU-only processing on request
B) Data residency is a hard NFR that should be resolved *before* model/vendor selection — it likely drives the team toward a region-pinned cloud platform deployment (e.g., EU-region Bedrock or Vertex) rather than the direct API
C) EU data residency requirements only apply to training data, not inference
D) This is purely a legal question with no architectural impact

**Answer: B**
*Hard residency constraints are NFRs that must be resolved upstream of vendor/model choice, per the discovery-to-architecture ordering in this domain — get this backwards and you end up justifying a platform choice you can't actually keep. A region-pinned cloud platform deployment is the standard way to satisfy this, not a configuration flag on the direct API. This has direct architectural consequences (D is wrong) and applies to inference-time processing, not just training (C is wrong).*

---

**Q6.** A cost-sensitive application processes 2 million requests/day. The architecture uses a single frontier model for every request regardless of complexity. A junior engineer proposes routing simple requests to a cheaper model. The lead architect's correct response is:

A) Reject it — using one model everywhere is simpler to maintain
B) This is exactly the kind of model-tiering architecture that should have been an NFR-driven decision from the start; evaluate it, but recognize the real fix is that "cost ceiling" should have shaped the architecture before launch, not after
C) Accept it immediately without evaluation since it will obviously reduce cost
D) Model tiering is a Domain 2 concern and out of scope for Domain 1 architecture

**Answer: B**
*Cost ceiling is an NFR (see the NFR-to-architecture table above) — a cost-sensitive, high-volume system should have had a tiering architecture designed in from the start, not retrofitted after a junior engineer notices the bill. The proposal is directionally right but the real lesson for the architect is upstream process, not just "yes, do it" (C) or "no, keep it simple" (A). Model tiering is a cross-cutting concern that Domain 1 architecture must account for even though its mechanics live in Domain 2 (D is an artificial boundary).*

---

**Q7.** A healthcare startup's architecture review board rejects a proposed design because "the failure mode isn't documented." The design uses an agentic pattern with a database write tool. What is most likely missing from the ADR?

A) The system prompt text
B) An explicit description of what happens when the agent fails partway through a multi-step task — partial writes, retries, and who is notified
C) The exact Claude model version
D) The names of the engineering team

**Answer: B**
*"Failure mode not documented" in a review of a write-capable agentic system almost always means: what happens to partially-completed state when something breaks mid-task? Architecture review boards at this level expect that answered explicitly (rollback? idempotent retry? human alert?) — not implied. The other items (A, C, D) are metadata, not failure-mode design.*

---

**Q8.** An architecture serves three internal teams from one shared Claude platform. Team A needs sub-200ms responses; Team B runs unpredictable long-running research tasks; Team C needs strict cost caps. The architect proposes one shared configuration for all three. What is the correct challenge to this design?

A) Shared platforms are always wrong — each team needs its own deployment
B) A single shared configuration cannot simultaneously satisfy conflicting NFRs (latency vs. unbounded task complexity vs. hard cost caps) — the platform needs per-tenant configuration profiles, not one-size-fits-all
C) Team B should be removed from the shared platform entirely
D) This is only a problem if all three teams use the same model

**Answer: B**
*Different NFR profiles need different configuration — cost limits, timeout budgets, effort levels — even on a shared underlying platform. That's a multi-tenant configuration design problem, not a reason to fragment into three separate platforms (A) or exile one team (C). The conflict exists regardless of whether they share a model (D).*

---

**Q9.** A team plans a system architecture assuming their current API rate-limit tier will hold at 10x projected growth over 18 months. What is the architectural risk here?

A) None — rate limits scale automatically with usage
B) Rate limits and concurrency ceilings are commercial terms negotiated with the vendor, not infrastructure facts that scale on their own — capacity planning for 10x growth requires a proactive tier/quota conversation with the account team, built into the roadmap
C) This is purely a procurement issue with no architectural relevance
D) The system should be redesigned to avoid the API entirely

**Answer: B**
*Treating rate limits as something that "just scales" is the exact planning failure this domain calls out. Capacity planning at this tier is an architect's responsibility because it directly shapes system design (batching, queuing, tiering) — it isn't purely procurement's problem (C), and the fix isn't avoiding the API (D).*

---

**Q10.** A retail company's Claude-based recommendation system needs 99.9% availability. An architect proposes active-active multi-provider redundancy (direct API + Bedrock, both live simultaneously). A peer reviewer flags this as over-engineered. Evaluate the reviewer's objection.

A) The objection is wrong — more redundancy is always better
B) The objection is likely correct: 99.9% (≈8.7 hours/year downtime budget) is typically achievable with single-provider multi-region redundancy at much lower cost and complexity; active-active multi-provider should be reserved for materially higher availability tiers where the extra complexity is justified
C) Active-active is required whenever more than one cloud platform is available
D) The reviewer is wrong because multi-provider always costs less than multi-region

**Answer: B**
*Matching redundancy strategy to the actual SLA tier (see the resilience table above) is the core skill this domain tests. 99.9% does not typically require the most expensive resilience pattern available — over-provisioning redundancy wastes budget and adds operational complexity (idempotent writes across two provider paths) without a corresponding SLA benefit. The decision should be driven by the target, not by "more redundancy is always better" (A).*

---

**Q11.** A system architecture document lists the chosen pattern, the model, and the tools — but no rejected alternatives. During a stakeholder review six months later, a new VP asks "why didn't you just use a simpler workflow instead of an agent?" No one on the team can answer confidently. What should have prevented this?

A) The VP should not be allowed to ask architecture questions
B) The original ADR should have recorded the rejected alternatives (including the simpler workflow) and the specific reasons each was insufficient — turning a re-litigation into a five-minute lookup
C) The system should be redesigned as a workflow immediately to satisfy the VP
D) Architecture documents don't need to survive stakeholder turnover

**Answer: B**
*This is the practical payoff of the ADR discipline established earlier in this domain: recording rejected alternatives means a leadership-level question six months and one stakeholder-turnover later gets answered by opening a document, not by reconvening the original design conversation from memory. Caving to the question by redesigning (C) or dismissing it (A, D) both signal an architecture that wasn't actually defensible in the first place.*

---

## Domain 2 — Claude Models, Prompting & Context Engineering (13%)

### What this domain actually tests

Foundations Domain 4 covers the mechanics: effort levels, cache breakpoints, XML vs. Markdown for structured output, prefill. This domain assumes that fluency and tests the governance layer sitting on top of it — how you manage models, prompts, and context as production assets with a multi-team, multi-year lifecycle, not as a single request you're optimizing once. If cache TTLs, effort levels, or prompt caching mechanics are unfamiliar, that's [CCAF Domain 4](/docs/coding-tools/claude/ccaf-exam-prep-complete#domain-4--prompt-engineering--structured-output-20) territory — this section builds from there.

**Model entitlement governance.** At enterprise scale, model choice stops being a per-request engineering decision and becomes an access-control policy. Modern Claude enterprise platforms let administrators lock which models each SCIM group can call — engineering gets full model access, sales defaults to a mid-tier model, back-office operations defaults to the cheapest model that clears the accuracy bar. This directly targets **token-maxing**: the habit of defaulting every task to the most expensive frontier model "just in case," which is one of the largest avoidable cost drivers in mature Claude deployments given the pricing spread between tiers. The architect's job is to define entitlement policy at the platform level, not to rely on every team independently choosing the cheap model out of goodwill.

**Prompt-as-code governance.** A production system prompt is a versioned artifact with a review process, not a string someone edits in the admin console during an incident. Minimum bar for a Professional-level deployment:

| Governance element | Why it matters |
| --- | --- |
| Version control for system prompts and prompt templates | Enables rollback, diffing, and blame when behavior regresses |
| Regression test suite run before any prompt change ships | Catches silent behavior drift before it reaches production traffic |
| Change owner + approval step for prompts touching regulated workflows | Same discipline as code review, because prompts *are* the business logic |
| Documented rollback procedure | An untested prompt change is an incident waiting to happen; know how to revert before you need to |

**Migration governance.** Model migrations (e.g., a tokenizer change that inflates token counts ~30% for the same text) are not just an engineering task, they're a program with stakeholders: budget owners need advance warning that costs may shift, and every downstream token budget, context-window ceiling, and cache-minimum threshold needs to be recomputed — not assumed to carry over. The architect owns a **model registry**: current production model per workload, its documented EOL/deprecation date once one is announced, and a validated migration plan staged well ahead of the mandatory 6-month deprecation notice window, not started when the notice arrives.

**Cost attribution and chargeback.** Production Claude spend must be attributable to the team, product, or workload that generated it — not lumped into one line item — both for internal chargeback and for detecting a runaway cost incident before finance does. This means every call is tagged with cost-attribution metadata at the point of the request, and the architect owns the dashboard that turns that into per-team, per-workload cost visibility.

**Context engineering as a production discipline.** Foundations Domain 5 covers the mechanics of managing a single long-running context (summarization, truncation, retrieval). At the Professional level, context strategy is a *design decision made once per workload class and then governed*, not re-decided per request: which workloads get RAG, which get full-document context with caching, and what the escalation path is when a workload's context needs outgrow its original design (see also Domain 3's RAG governance content, which extends this further).

---

### Domain 2 Practice Questions

**Q12.** An enterprise rolls out Claude access to 4,000 employees. Within a month, the AI spend is 6x the original budget forecast. Investigation shows most requests — including trivial ones like formatting a bullet list — default to the most expensive frontier model. What is the correct systemic fix?

A) Ask employees individually to use cheaper models when appropriate
B) Implement model entitlement policy at the SCIM-group level so that access to expensive models is scoped to roles that need it, rather than relying on every user's discretion
C) Remove access to the frontier model entirely for all users
D) This is expected and not a fix-worthy problem

**Answer: B**
*Token-maxing at scale is a policy failure, not an individual-discipline failure — asking 4,000 people to individually self-regulate (A) does not scale and will not hold. Entitlement policy that defaults roles to the cheapest model that clears their accuracy bar, with the frontier model reserved for roles that actually need it, is the systemic fix. Removing frontier access entirely (C) breaks the roles that do need it.*

---

**Q13.** A team migrates a production prompt from Claude Sonnet 4.6 to Claude Sonnet 5. Two weeks after cutover, finance flags that costs are 35% higher than forecast even though request volume is flat. What should have been done as part of the migration plan?

A) Nothing could have predicted this
B) Recompute token budgets and cost forecasts against the new tokenizer *before* migration — Sonnet 5's tokenizer encodes roughly 30% more tokens for the same text, which directly inflates cost and should have been modeled into the pre-migration forecast
C) Immediately roll back to Sonnet 4.6
D) The finance team should not be involved in model migrations

**Answer: B**
*This is a predictable, well-documented consequence of the tokenizer change — a migration plan that doesn't recompute cost forecasts against it isn't a complete migration plan. Governance means catching this before the finance surprise, not reacting to it after (C jumps to rollback without diagnosing whether the new model's other benefits justify the cost, and D ignores that finance should be a stakeholder in any migration with cost impact).*

---

**Q14.** A regulated workflow's system prompt is edited directly in a production admin console during an incident to fix a bug, with no review and no version history entry. The fix works, but a week later a different behavior regression appears and no one can determine what changed. What governance gap caused this?

A) The bug should never have occurred in the first place
B) There was no prompt-as-code discipline — version control, review, and a rollback procedure — treating the system prompt as production business logic rather than a string anyone can hot-edit
C) The admin console should be removed entirely
D) System prompts don't need governance because they're just text

**Answer: B**
*A production-breaking hotfix with no version history is exactly what prompt-as-code governance exists to prevent — not by banning emergency fixes, but by requiring they go through the same version control and review discipline as any other production change, even under time pressure. The console itself isn't the problem (C); the missing process around using it is.*

---

**Q15.** An organization has no model registry. When Anthropic announces a 6-month deprecation notice for a model still running three production workloads, the team discovers this by accident when a routine API call starts returning a deprecation warning. What should have existed to prevent the scramble?

A) A model registry tracking which production workloads run which model, monitored proactively for deprecation announcements, with migration validation started well ahead of the notice window — not a reactive scramble once it arrives
B) All workloads should always run the newest model automatically
C) Deprecation notices are Anthropic's responsibility to push directly to every engineer
D) This risk is unavoidable and cannot be planned for

**Answer: A**
*Owning a model registry with EOL tracking is exactly the governance artifact that turns a 6-month notice into a comfortable migration timeline instead of a fire drill. Auto-upgrading everything (B) trades this risk for uncontrolled behavior regression risk, which is worse. Anthropic's notice obligation (C) doesn't remove the org's obligation to actually monitor for it.*

---

**Q16.** A finance team asks which internal product consumed $40,000 of Claude API spend last quarter. The platform team cannot answer because API calls aren't tagged by requesting product or team. What should have been designed in from the start?

A) A single shared API key is sufficient for all products
B) Cost-attribution metadata tagged on every request at call time, feeding a per-team/per-workload cost dashboard the architect owns — so chargeback and anomaly detection are queryable, not reconstructed after the fact
C) This information is not knowable after the fact and the question should be declined
D) Only aggregate organization-wide spend needs to be tracked

**Answer: B**
*Cost attribution has to be designed in at the point of the request — metadata tagging every call with the owning team/workload — precisely so this question is a dashboard query, not an unanswerable one. A single shared key (A) and aggregate-only tracking (D) both make this structurally impossible to answer later.*

---

**Q17.** A workload was originally designed with full-document context and prompt caching because the source documents were small and static. Eighteen months later the documents have grown 20x and now change hourly. Request latency and cost have both degraded significantly, but no one revisited the original context strategy. What is the governance failure?

A) Context strategy was treated as a one-time decision with no trigger for revisiting it as the workload's characteristics changed materially
B) Prompt caching should never be used for any workload
C) The team should have used a bigger context window model from the start
D) This is a Domain 3 (Integration) issue only and out of scope here

**Answer: A**
*Context strategy is a design decision that needs an explicit revisit trigger (data volume growth, change-frequency shift) — not a "set once, forget forever" choice. The original full-document-plus-caching design was correct for the original data profile; the failure is not having a governance checkpoint that would have flagged when the profile changed enough to warrant re-evaluating toward retrieval. This is a legitimate Domain 2 context-engineering governance question even though its solution may borrow Domain 3 retrieval mechanics (D draws an artificial line).*

---

**Q18.** A cost-sensitive classification workload currently uses a frontier model and clears 97% accuracy against a 92% target. An engineer proposes switching to a cheaper model tier to reduce cost, and the architect wants to validate this before approving. What is the correct next step?

A) Approve immediately since the accuracy target has 5 points of headroom
B) Reject immediately since changing a working production model is inherently risky
C) Run the cheaper model against the same golden evaluation set used to validate the current model, and only approve the switch if it still clears the 92% target with an acceptable margin
D) Switch in production and monitor for a week before deciding

**Answer: C**
*Headroom on paper (A) isn't validation — the correct governance move is to actually test the candidate model against the same eval bar the current model was held to, offline, before any production exposure. This connects directly to the eval-framework discipline covered in Domain 4: model swaps are exactly the kind of change a golden dataset and regression gate exist to de-risk. Testing in live production first (D) exposes real users to an unvalidated change.*

---

## Domain 3 — Integration (19%)

### What this domain actually tests

This is the highest-weighted domain, and for good reason: production Claude systems fail in integration far more often than they fail in model quality. Foundations Domain 2 covers MCP primitives, tool descriptions, and idempotency at the single-tool level; Foundations Domain 5 covers Files/Batch API mechanics. This domain assumes both and tests integration at the *system* level — RAG pipelines as production assets, protocol selection across an enterprise portfolio, auth/entitlement lifecycle, observability ownership, and the failure modes that only show up when multiple systems compose.

**RAG as a governed production pipeline, not a one-time build.** A RAG system has more moving, versioned parts than most teams initially design for:

| Component | What "governed" means in production |
| --- | --- |
| Chunking strategy | Change-controlled — a chunking change is a retrieval-quality-affecting deploy, not a tweak |
| Embedding model | Version-pinned; migrating embedding models requires re-embedding the entire corpus and validating retrieval quality before cutover, not a silent swap |
| Retrieval quality | Owned as an SLO (e.g., recall@k against a labeled eval set), monitored continuously, not assumed static |
| Freshness/staleness | An explicit policy — how stale can retrieved content be before it's wrong, and what re-indexing cadence satisfies that |
| Multi-source conflict | A defined resolution strategy when two retrieved sources disagree (recency wins? source authority ranking? surface both and let Claude flag the conflict?) |
| Citation/grounding | Verification that cited sources actually support the claim attributed to them — not just that a source was retrieved |

**Protocol selection at the portfolio level.** Foundations teaches MCP primitive selection for a single tool. At the enterprise level, the question is which *integration protocol* to standardize on across dozens of systems:

| Situation | Preferred protocol |
| --- | --- |
| Multiple internal AI clients (Claude Code, Agent SDK apps, third-party tools) need the same capability | MCP — build once, any compliant client can use it |
| One team, one application, tight coupling acceptable, need maximum control over request/response shape | Direct API tool-use definitions |
| Standard capability set (search, ticketing, common SaaS), no custom infra desired | Managed Agents |
| High-security, on-prem, no network egress allowed | MCP over stdio transport |
| Need distributed tracing across orchestrator → subagents → tool calls, multiple observability tools already in place | MCP with W3C Trace Context propagation in `_meta` |

**Enterprise auth and entitlement lifecycle.** Foundations covers *that* Okta/SCIM-based MCP provisioning exists. Professional-level ownership means designing the full lifecycle: automated de-provisioning when an employee leaves or changes teams (stale entitlements are a standing security risk, not a one-time setup cost), periodic entitlement audits to catch drift between what SCIM groups say someone should have and what they actually have, and a documented exception process for one-off access requests that doesn't quietly become the default path everyone uses to bypass the group model.

**Observability as an operational commitment, not a launch checklist item.** Distributed tracing (W3C Trace Context in MCP messages) gets you the *data*. Owning observability means deciding which signals actually matter for this system (tool error rate by tool, p99 latency by integration hop, cost per trace), setting alert thresholds tied to actual SLOs rather than arbitrary round numbers, and owning the on-call rotation that responds when they fire.

**Legacy and third-party integration risk.** Connecting Claude to a mainframe or ESB via an adapter, or integrating an external vendor's MCP server, both introduce a system the architect doesn't fully control. Before production integration: does the legacy system's data contract actually match what the adapter promises Claude? For a third-party MCP server, has it been through the same security review (credential handling, least-privilege scoping, injection surface) as an internally-built one — vendor-provided doesn't mean pre-vetted.

**Idempotency across composed systems.** Foundations covers idempotency at a single tool call. In production, a request often crosses a webhook → queue → tool call chain, and a retry anywhere in that chain can duplicate an effect anywhere downstream — the dedup key needs to travel with the request end-to-end, not be reinvented at each hop.

---

### Domain 3 Practice Questions

**Q19.** A RAG system's retrieval quality has silently degraded over 4 months — recall@5 dropped from 91% to 68% — but no one noticed until customers complained about wrong answers. What governance gap allowed this?

A) The embedding model should never be changed
B) Retrieval quality was not tracked as an ongoing SLO against a labeled eval set — it was validated once at launch and never monitored afterward
C) RAG systems always degrade over time and this is unavoidable
D) Customer complaints are an acceptable detection mechanism for retrieval quality

**Answer: B**
*"Discovered by customer complaint" is the signature of a metric that was never actually owned as a continuous SLO. Retrieval quality needs the same ongoing monitoring discipline as latency or error rate, against a maintained labeled eval set — not a one-time launch validation. Degradation isn't inevitable (C) if the corpus, chunking, and embedding model are governed; the real fix is proactive monitoring, not accepting complaints as the alerting mechanism (D).*

---

**Q20.** A team silently swaps their RAG system's embedding model for a newer, cheaper one without re-embedding the existing corpus. What is the immediate consequence?

A) No consequence — embeddings are model-agnostic
B) Retrieval breaks or degrades badly — the new queries are embedded in a different vector space than the old corpus vectors, so similarity search against them is meaningless
C) Only the cost improves; quality is unaffected
D) The system automatically re-embeds the corpus on the next query

**Answer: B**
*Embeddings from different models are not comparable — a query embedded with the new model searched against a corpus embedded with the old model produces essentially garbage similarity scores. This is exactly why embedding model changes require a full corpus re-embed and a validated cutover, not a silent swap. Nothing about this is automatic (D) or free of consequence (A, C).*

---

**Q21.** Three internal teams each want Claude to search the same internal wiki. Team A uses Claude Code, Team B uses a custom Agent SDK app, Team C uses a third-party AI coding tool. What is the most maintainable integration approach?

A) Build three separate custom tool integrations, one per client
B) Build one MCP server for the wiki search capability — all three clients, being MCP-compatible, can use it without separate implementations
C) Standardize all three teams onto the same client so only one integration is needed
D) Give each team direct database credentials to query the wiki themselves

**Answer: B**
*This is the canonical case for MCP's portability value: one server built against the open spec serves any compliant client, rather than three separately-maintained integrations (A) that will drift out of sync over time. Forcing client standardization (C) is a heavier, less realistic ask than just using a portable protocol. Direct credentials per team (D) bypasses any centralized access control or auditing.*

---

**Q22.** An employee moves from the Sales team to Engineering. Six months later, a security audit discovers they still have MCP server access entitlements from their old Sales SCIM group, which were never revoked. What process failure does this indicate?

A) SCIM group provisioning should not be used at all
B) There was no automated de-provisioning tied to group membership changes — entitlement lifecycle management stopped at initial grant and never accounted for offboarding or role changes
C) The employee should have manually requested removal of old access
D) This is expected behavior and not a security concern

**Answer: B**
*Provisioning-only entitlement management — granting access on join but never revoking it on role change — is a standing security risk that shows up exactly like this in an audit. The fix is automated de-provisioning wired to the same SCIM group-membership events that trigger provisioning, not relying on the departing employee to self-report (C), which is not a control.*

---

**Q23.** A vendor offers a pre-built MCP server for a popular CRM. The integration team plans to connect it directly to production with the vendor's default configuration, reasoning that "it's from a reputable vendor, so it's already secure." What is wrong with this reasoning?

A) Nothing — vendor-provided MCP servers are pre-vetted by definition
B) Vendor-provided does not mean pre-vetted for *this organization's* security posture — the server still needs the same review (credential handling, least-privilege scoping, injection surface) as an internally-built server before production connection
C) MCP servers from vendors should never be used
D) The only risk with vendor MCP servers is pricing

**Answer: B**
<br>*"Reputable vendor" speaks to the vendor's general trustworthiness, not to whether their default configuration matches this specific organization's least-privilege and data-handling requirements. A vendor MCP server needs the same security review pass as a homegrown one before production use — skipping that review because of the vendor's reputation is exactly the failure mode this domain flags. Wholesale rejection of vendor servers (C) is also wrong; the answer is review, not avoidance.*

---

**Q24.** A request flows: webhook → message queue → orchestrator → MCP tool call that charges a customer's card. The queue redelivers the message once due to a consumer crash before acknowledgment. The tool call fires twice, double-charging the customer. Where should the fix have been applied?

A) Remove the message queue from the architecture
B) A single idempotency/dedup key generated at the webhook should travel unchanged through the queue and into the tool call, so the tool can detect and reject the duplicate regardless of which hop caused the retry
C) Disable queue redelivery entirely
D) This can only be fixed by making the payment provider's API idempotent, which is out of the architect's control

**Answer: B**
*The chain crossed three hops before reaching the tool — the dedup key has to be generated once, early, and propagated unchanged through every hop so the final tool call (or the payment provider, via an idempotency key parameter) can recognize "I've already processed this exact request." Removing the queue (A) or disabling redelivery (C) trades a duplicate-charge risk for a lost-message risk, which is worse. The payment provider almost certainly *does* support an idempotency key (D is a cop-out) — the architect's job is wiring the org's own dedup key into that parameter.*

---

**Q25.** A high-security government client requires that an MCP server handling classified document metadata never open a network port. Which transport satisfies this, and what enterprise trade-off does it introduce?

A) Streamable HTTP; no trade-off
B) stdio transport — no network port opened, satisfying the no-egress requirement; the trade-off is that stdio is process-local, so it doesn't natively support the kind of centralized multi-client, remote-access topology that HTTP-based transports enable
C) WebSocket; fully equivalent to stdio for this use case
D) MCP cannot be used in no-egress environments at all

**Answer: B**
*stdio is the correct choice for the hard no-egress requirement (matches Foundations Domain 3's coverage of stdio), but the Professional-level addition is recognizing the trade-off it forces: a process-local server can't be centrally shared across remote clients the way an HTTP-based deployment could, which has real implications for how many separate stdio instances the org ends up maintaining. Both HTTP-based options (A, C) violate the no-network-port requirement, and MCP is fully usable in no-egress environments (D is false).*

---

**Q26.** An MCP-based platform serves 12 internal teams. One team's tool calls begin timing out during another team's traffic spike, even though the two teams use logically separate tools. What integration design is most likely missing?

A) Per-tenant rate limiting/quota allocation at the platform's API gateway layer, so one team's spike cannot starve another team's capacity on shared infrastructure
B) Each team should have used a completely separate physical server
C) MCP does not support multi-tenant usage and this is expected
D) The tools should be merged into a single tool to avoid contention

**Answer: A**
*Shared infrastructure without per-tenant quota allocation means any one team's spike can degrade every other team's experience — the fix is API-gateway-level rate limiting and quota per tenant, not full physical separation (B), which defeats the point of a shared platform. MCP handles multi-tenancy fine when the surrounding infrastructure is designed for it (C is false); merging tools (D) doesn't address a capacity problem.*

---

**Q27.** A RAG system retrieves two internal documents that directly contradict each other on a policy detail — one from 2023, one from 2026. The system currently just concatenates both into context and lets Claude pick. Customer-facing answers have become inconsistent as a result. What governance element is missing?

A) A defined multi-source conflict resolution policy — e.g., recency-wins for policy documents, or explicit surfacing of the conflict to the user rather than silent selection — rather than leaving resolution implicit and unpredictable
B) RAG systems should never retrieve more than one document
C) This is a model quality issue, not an integration issue
D) Concatenating conflicting sources is standard practice and the inconsistency is unrelated

**Answer: A**
*Leaving conflict resolution implicit — hoping Claude picks consistently — produces exactly this symptom: inconsistent customer-facing answers. The fix is a documented policy (recency, source authority, or explicit surfacing) applied at retrieval or ranking time, which is squarely an integration/pipeline design responsibility, not a model quality issue to blame on Claude (C).*

---

**Q28.** A distributed trace shows a customer request spent 40ms in the orchestrator, 30ms in subagent A, and 4.2 seconds in a single MCP tool call to a legacy mainframe adapter. What should the architect do first?

A) Immediately blame the mainframe vendor and open a support ticket
B) Use the trace data to confirm the mainframe adapter hop is the actual bottleneck (not a suspicion), then investigate whether it's a legacy system latency floor to design around (caching, async pattern) or a fixable adapter inefficiency
C) Remove the mainframe integration entirely
D) Increase the client-side timeout to accommodate the 4.2 seconds

**Answer: B**
*This is exactly what end-to-end tracing is for: it turns "the request feels slow" into "this specific hop is the bottleneck," which then drives a real investigation — is 4.2s a hard floor for this legacy system (in which case the fix is architectural, e.g., async + callback, or aggressive caching) or is it a fixable adapter problem. Jumping to a vendor ticket (A), removal (C), or just raising the timeout (D) all skip the diagnosis step the trace data was collected to enable.*

---

**Q29.** A team wants to expose an internal document store to Claude such that Claude gets pushed a notification whenever a document changes, without polling. What MCP capability enables this, and what does the architect need to own operationally once it's live?

A) Tool calls with a polling loop; nothing additional to own
B) Resource subscriptions (`notifications/resources/updated`) — but the architect now owns the subscription lifecycle: cleaning up stale subscriptions from disconnected clients, and monitoring for notification delivery failures, which polling never had to worry about
C) MCP does not support push notifications
D) A cron job outside of MCP is required

**Answer: B**
*Resource subscriptions are the correct mechanism (matches Foundations Domain 1/5 coverage of the primitive), but the Professional-level addition is operational: push-based systems introduce a new failure class — stale subscriptions and missed notifications — that a polling system never had, and someone has to own detecting and cleaning those up. This is a real operational cost traded against efficiency, not a free upgrade.*

---

**Q30.** An organization is choosing between MCP and direct API tool-use definitions for a brand-new, single-purpose internal tool that will only ever be called from one custom Agent SDK application, with no plans to reuse it elsewhere. Which is the better default, and why does this not contradict the earlier guidance favoring MCP?

A) MCP, always, because it's the newer standard
B) Direct API tool-use definitions are reasonable here — MCP's core value is cross-client portability, and a single-purpose, single-client tool with no reuse on the roadmap doesn't need that portability overhead yet; it can always be wrapped in an MCP server later if reuse emerges
C) This is a trade-off with no right answer and either choice is equally defensible
D) MCP is required for all production tools regardless of reuse

**Answer: B**
*The portfolio-level protocol guidance in this domain isn't "always use MCP" — it's "use MCP when portability across multiple clients has actual value." A genuinely single-client, no-reuse-planned tool doesn't need that overhead yet, and direct tool-use definitions are simpler to build and reason about for that narrow case. The decision should track actual reuse needs, not protocol fashion (A, D) — but this is a real trade-off with a defensible default, not a coin flip (C).*

---

## Domain 4 — Evaluation, Testing & Optimization (16%)

### What this domain actually tests

Evaluation in production is a governance and diagnostic discipline, not a one-time pre-launch checklist. This domain builds on the agent evaluation metrics covered in [CCAF Domain 1](/docs/coding-tools/claude/ccaf-exam-prep-complete#domain-1--agentic-architecture--orchestration-27) (task completion rate, tool error rate, human escalation rate, token efficiency) — Professional-level content is about building and running the *program* those metrics feed into: golden datasets, statistically valid A/B tests, safe rollout gates, and root-cause diagnosis when production quality drops.

**Golden dataset governance.** A labeled evaluation set is itself a production asset that decays if unmanaged:

| Governance need | Failure mode without it |
| --- | --- |
| Versioning | Can't reproduce "why did this model pass eval last quarter but fail this quarter" |
| Drift monitoring | Production input distribution shifts away from what the golden set covers, and eval scores stop meaning anything |
| Adjudication process for labeler disagreement | Ambiguous labels silently corrupt the ground truth everyone is being measured against |
| Periodic refresh | A static golden set from launch stops reflecting current real-world inputs within months |

**LLM-as-judge calibration.** Using Claude (or another model) as a judge to score outputs at scale only works if the judge is calibrated against human raters first — measure agreement (e.g., Cohen's kappa) between judge and human labels on a sample before trusting the judge at scale, and re-calibrate whenever the judge model or the rubric changes. An uncalibrated judge doesn't fail loudly; it just quietly produces scores that don't track what humans actually care about.

**A/B testing at production scale.** The Foundations-level content on evaluation metrics doesn't cover statistical validity, and it's a common exam trap: a "winning" variant after 200 requests is very likely noise. Minimum discipline: compute required sample size for the effect size you care about before starting, distinguish the primary metric (the thing you're actually trying to move) from guardrail metrics (things that must not regress — cost, latency, safety refusal rate), and watch for novelty effects inflating early results.

**Safe rollout patterns for model/prompt changes.** A model or prompt version upgrade should never go from "passed offline eval" straight to "100% of production traffic."

| Pattern | Use when |
| --- | --- |
| Shadow deployment (new version runs alongside old, outputs compared, only old version's output is served) | Highest safety; adds compute cost; use for high-stakes workflows |
| Canary (small % of real traffic routed to new version, regression gate before ramp) | Standard default for most production changes |
| Full regression suite gate before any rollout stage advances | Non-negotiable for regulated or high-stakes workflows |

**Cost-quality optimization as a Pareto problem, not a single-axis cut.** "Reduce cost" projects that only look at price-per-token and ignore the resulting accuracy/quality curve routinely make things worse — the discipline is plotting cost against quality across candidate configurations and picking a point on the frontier deliberately, not the cheapest point available.

**Root-cause diagnosis taxonomy.** When production quality drops, the architect's job is narrowing down *which layer* broke before proposing a fix:

| Symptom pattern | Most likely layer |
| --- | --- |
| Quality drop, stable retrieval/tool metrics, coincides with a prompt or model change | Prompt or model regression |
| Quality drop, retrieval recall metric also dropped | Retrieval/RAG layer |
| Quality stable, but task completion drops and tool error rate rises | Tool/integration layer |
| Everything else stable, but latency/timeouts spike | Infrastructure layer |

**The feedback loop.** Every production incident that reveals a gap in quality should add a case to the golden evaluation set — otherwise the same failure mode can recur silently and pass the next eval run.

---

### Domain 4 Practice Questions

**Q31.** A team runs an A/B test comparing two prompt versions. After 4 hours and roughly 300 total requests, variant B shows a 6-point accuracy improvement over variant A. The team wants to ship variant B immediately. What is the correct challenge?

A) Ship it — a 6-point improvement is clearly meaningful
B) At that sample size, a 6-point difference is very likely within noise; compute the required sample size for the effect size claimed and continue the test until it's reached before concluding anything
C) A/B tests are never valid for prompt changes
D) Run the test for exactly 24 hours regardless of sample size, then decide

**Answer: B**
*Small samples routinely produce apparent effects that vanish at scale — the fix is not a fixed time window (D), which is an arbitrary proxy for statistical power, but computing the actual sample size needed for the claimed effect size and running until it's reached. Shipping on 300 requests (A) is exactly the trap this question tests.*

---

**Q32.** An organization uses Claude as an LLM judge to score customer support response quality at scale, with no calibration step ever performed against human raters. Six months in, a manual audit finds the judge's scores don't correlate well with what human QA reviewers actually flag as poor responses. What was missing?

A) LLM-as-judge should never be used for this purpose
B) An initial and periodically repeated calibration step measuring agreement (e.g., Cohen's kappa) between the judge and human raters on a labeled sample, so miscalibration is caught before six months of decisions are made on ungrounded scores
C) The judge model should have been the most expensive model available
D) Human QA review should be eliminated entirely once an LLM judge is deployed

**Answer: B**
*An uncalibrated judge doesn't announce its own unreliability — it just produces scores that quietly diverge from what humans actually care about, exactly as described. Calibration against human labels, checked initially and after any rubric or judge-model change, is the missing control. LLM-as-judge is a legitimate technique when calibrated (A is too extreme), and calibration doesn't eliminate the need for periodic human review (D) — it validates the judge that reduces how much human review is needed.*

---

**Q33.** A team upgrades their production model version. The new version passes the full offline golden evaluation suite. The rollout plan is to switch 100% of production traffic immediately since it "already passed eval." What is the risk in this plan?

A) None — passing the offline eval suite is sufficient validation for full rollout
B) Offline eval passing doesn't guarantee production behavior matches at scale under real traffic patterns; a canary or shadow rollout with a regression gate should precede a full switch, especially for anything the offline suite may not fully represent
C) Canary rollouts are only necessary for cost changes, not quality changes
D) The offline suite should be skipped in favor of going straight to canary

**Answer: B**
*Offline eval and live production traffic are different environments — real-world input distribution, load, and edge cases the golden set may not fully capture can all reveal issues an offline pass didn't catch. That's why a canary/shadow stage with a live regression gate belongs between "passed offline" and "100% traffic," not instead of the offline suite (D is also wrong — both stages matter, not one or the other).*

---

**Q34.** A cost-reduction initiative swaps a workload to a cheaper model purely based on price-per-token, without re-running the golden evaluation suite. Three weeks later, customer complaints about answer quality spike. What optimization discipline was skipped?

A) None — cost optimization and quality are unrelated axes
B) Treating cost-quality trade-offs as a Pareto problem — evaluating the cheaper model's actual quality against the same golden set before switching, rather than optimizing the cost axis alone and hoping quality holds
C) The team should have chosen the most expensive model instead
D) Customer complaints are an acceptable way to validate a cost change

**Answer: B**
*Optimizing purely on price and ignoring the resulting quality curve is the single-axis mistake this domain explicitly warns against — a legitimate cost optimization plots both axes and picks a deliberate point on the frontier, validated against the golden set *before* the swap, not discovered via complaints after (D is the anti-pattern, not a validation method).*

---

**Q35.** Production task completion rate drops from 93% to 74% over two weeks. Investigation shows tool error rate is flat, human escalation rate is flat, but the retrieval recall@5 metric (tracked separately) dropped from 88% to 61% over the same window. Which layer does the diagnostic taxonomy point to?

A) The model itself is hallucinating more
B) The retrieval/RAG layer — the coincident drop in recall@5 alongside stable tool error and escalation rates points to a retrieval-layer regression (e.g., a corpus indexing issue or an embedding mismatch) rather than a model or tool problem
C) The prompt was changed and needs to be reverted
D) This pattern indicates an infrastructure/latency problem

**Answer: B**
*Per the root-cause taxonomy in this domain, a quality drop that coincides with a retrieval metric drop — while tool error and escalation rates stay flat — points squarely at the retrieval layer, not the model (A) or prompt (C), and there's no latency signal mentioned to support an infrastructure diagnosis (D). This is a textbook case for why tracking retrieval quality as its own metric, separate from end-to-end task completion, matters: it isolates exactly which layer to investigate.*

---

**Q36.** A safety-critical production incident reveals that Claude gave a confidently wrong answer on a specific type of edge-case query that the golden evaluation set had no examples of. The incident is resolved with a prompt fix. What should happen next as part of the evaluation program, not just the incident response?

A) Nothing further — the specific incident is resolved
B) The edge case from the incident should be added to the golden evaluation set, so that any future model or prompt change is automatically checked against this exact failure mode before it can regress silently
C) The golden evaluation set should be entirely rebuilt from scratch
D) This is purely a Domain 5 (Governance) concern and doesn't touch the evaluation program

**Answer: B**
*This is the feedback loop this domain calls out explicitly: incidents that reveal an eval gap should close that gap by adding the case to the golden set, so the fix is protected going forward rather than just patched once. Treating this as resolved without updating the eval set (A) means the same failure mode can silently reappear on a future change. It's a genuine cross-cutting concern with Domain 5's incident response process, but the evaluation-program half of the fix belongs squarely here (D draws too hard a line).*

---

**Q37.** A team wants to compare three candidate model configurations for a workload: current model, a cheaper model, and a cheaper model with a longer prompt providing more explicit instructions. They plot each configuration's average cost per request against its accuracy on the golden set. Configuration C (cheaper model + longer prompt) sits at 95% of current accuracy at 40% of current cost; configuration B (cheaper model alone) sits at 80% of current accuracy at 35% of current cost. Which is the more defensible choice, assuming the accuracy bar for this workload is 90%?

A) Configuration B, because it's cheapest
B) Configuration C — it clears the accuracy bar (95% ≥ 90%) at a substantial cost saving, while configuration B falls below the required bar despite being marginally cheaper
C) The current (most expensive) configuration, because it's always safest
D) Whichever configuration has the shortest prompt

**Answer: B**
*This is the Pareto-frontier discipline in practice: the right choice isn't the cheapest point (A) or the status quo by default (C) — it's the cheapest point that still clears the workload's actual quality bar. Configuration B fails that bar outright regardless of its lower cost, making it non-viable, not just suboptimal. Prompt length alone (D) isn't a meaningful selection criterion.*

---

**Q38.** A golden evaluation dataset was created 14 months ago at launch and has never been updated. A recent audit finds that 40% of current production query types have no representative examples in the golden set. What is the risk this creates?

A) None — a golden set is valid indefinitely once created
B) Eval scores against this stale golden set no longer reflect real production quality on the 40% of query types it doesn't cover — model or prompt changes could be silently regressing quality on those query types while still "passing" the outdated eval suite
C) The golden set should be discarded and eval abandoned
D) This only matters if the model itself changes, not for prompt changes

**Answer: B**
*A golden set decays as production input distribution shifts, exactly as flagged in this domain's governance table — periodic refresh isn't optional maintenance, it's what keeps "passed eval" meaning "actually performs well in production." The risk applies to any change, prompt or model (D is wrong), and the fix is refreshing the set, not abandoning evaluation altogether (C).*

---

**Q39.** Two labelers disagree on whether a customer support response should be scored "helpful" or "partially helpful" for 15% of a new golden dataset's examples. There is no adjudication process, so both labels are kept as-is with the disagreement unresolved, and the dataset ships. What is the downstream risk?

A) None — some label disagreement is normal and doesn't affect eval validity
B) Ambiguous, unresolved ground truth silently corrupts what every future eval run is actually measuring against — an adjudication process (tie-breaker reviewer, or refined rubric) is needed before the disputed labels are finalized
C) The dataset should be discarded entirely because of the disagreement
D) Only one labeler's opinion should always be used by default, chosen at random

**Answer: B**
*Unresolved label disagreement doesn't cancel out — it means the ground truth itself is unreliable for those examples, which quietly degrades the meaning of every eval score computed against them. The fix is a defined adjudication step before the dataset ships, not tolerating ambiguity (A) or resolving it arbitrarily (D). Wholesale discarding (C) throws away the 85% of the dataset that isn't in dispute.*

---

**Q40.** A shadow deployment runs a new model version alongside the current production version for two weeks, with only the current version's output actually served to users. Outputs are logged and compared offline. What is the primary trade-off of this pattern compared to a canary rollout?

A) Shadow deployment is strictly worse in every dimension
B) Shadow deployment is safer (zero user exposure to the unvalidated version) but costs roughly double the compute for the shadow period, since every request is processed by both versions with no traffic-serving benefit from the shadow side
C) Shadow deployment is cheaper than canary because only one version is actually serving traffic
D) There is no meaningful difference between shadow and canary deployment

**Answer: B**
*Shadow's safety advantage (nothing unvalidated ever reaches a real user) comes at a direct compute cost — running two full versions against 100% of traffic for the shadow period, versus a canary's much smaller exposed slice. That trade-off, not a blanket "worse" (A) or "cheaper" (C) claim, is what should drive the choice between the two patterns for a given workload's risk tolerance and budget.*

---

**Q41.** A production incident report states: "Quality regressed after the last deploy." The deploy bundled a prompt change, a model version bump, and a retrieval re-indexing, all shipped simultaneously. The team cannot determine which change caused the regression. What process failure enabled this?

A) Deploys should never include more than one type of change bundled together without a way to isolate which change is responsible if something regresses — via staged rollout of each change independently, or at minimum, thorough pre-deploy testing of each in isolation
B) The team should never re-index a RAG corpus
C) Model version bumps should always be deployed separately from everything else, with no exceptions ever
D) This is unavoidable and root-cause isolation is not realistically achievable in production systems

**Answer: A**
*Bundling three independently-risky changes into one deploy with no way to attribute a regression to a specific one is a self-inflicted diagnostic dead end — the fix is isolating changes (staged/sequential rollout, or rigorous independent pre-deploy validation of each) precisely so root-cause diagnosis stays possible when something breaks. This isn't unavoidable (D) — it's a direct consequence of how the deploy was structured.*

---

## Domain 5 — Governance, Safety & Risk Management (14%)

### What this domain actually tests

[CCAF's constitutional-AI and safety coverage](/docs/coding-tools/claude/ccaf-exam-prep-complete.md) (principal hierarchy, corrigibility, HITL/HOTL/HOOL, hardcoded absolute limits) establishes the safety model. This domain assumes that and tests whether you can run the *governance program* around it: mapping compliance frameworks to real deployments, owning an AI risk register, managing incident response and regulatory notification obligations, and owning the audit trail as a long-term asset rather than a launch requirement.

**Compliance framework selection by context.** Picking the right framework(s) to design against is itself a skill — over-applying a framework wastes effort, under-applying creates real regulatory exposure.

| Context | Primary framework(s) | Key obligation |
| --- | --- | --- |
| Healthcare, US, handling PHI | HIPAA | Business Associate Agreement (BAA) with the model provider before any PHI touches the system |
| Financial services, US | SR 11-7 (Federal Reserve model risk management) | Independent model validation, ongoing monitoring, documented model risk register |
| Financial services, EU | EBA AI guidance, MiFID II | Risk-based categorization; full audit trail of AI-assisted trading/advice decisions |
| Any EU-facing high-risk use case | EU AI Act (Annex III high-risk categories) | Documented risk assessment, data governance, transparency disclosure, tamper-proof logging before deployment |
| Any personal data, EU subjects | GDPR | Purpose limitation in system prompts; 72-hour breach notification obligation; DPA with cross-border transfer clauses (SCCs) |
| US federal/government | FedRAMP | Authorization boundary, specific hosting/deployment constraints |
| Cross-industry management system | ISO 42001 | AI policy, risk/opportunity assessment, maintained model register, quarterly fairness/safety evaluation cadence |
| Cross-industry (US, voluntary but increasingly expected) | NIST AI RMF | Govern/Map/Measure/Manage functions mapped to concrete actions |

The exam trap here is treating these as a checklist to satisfy once — they're overlapping and often apply simultaneously (a US healthcare fintech serving EU patients could be under HIPAA, GDPR, *and* EU AI Act at once), and the architect's job is identifying which combination actually applies to a given deployment, not defaulting to the most familiar one.

**AI risk register — enterprise-wide, not per-project.** A mature governance program maintains one risk register across every AI deployment in the org: what's deployed, its risk tier, its HITL tier, its compliance obligations, and its last review date — not a scattered set of per-project risk assessments that no one owns collectively. This is what lets a compliance team answer "which of our AI systems touch regulated data" in minutes instead of a multi-week audit.

**Vendor/model risk assessment for procurement.** Before a new model, MCP server, or AI vendor tool enters production, procurement-level risk assessment covers: where does data go and is it used for training, what's the vendor's own compliance posture (SOC 2 report, DPA availability), and what's the operational dependency risk if the vendor has an outage or is acquired/discontinued.

**Audit trail ownership.** Someone has to own: retention period (set per data governance policy, not left as a platform default), what gets logged (full request/response for regulated workflows; Extended Thinking blocks captured for high-stakes decision audit trails, not set to `display: "omitted"` where compliance needs them), and where the audit store lives (append-only, tamper-evident).

**Incident response ownership and regulatory notification timing.** A safety or security incident has a technical containment track and a separate regulatory track, and the architect needs to know both apply: contain and root-cause the technical issue, *and* assess within the relevant clock (GDPR's 72-hour breach notification window is the one most likely to appear on the exam) whether the incident is reportable, and to whom.

**RSP/ASL awareness for architects.** Anthropic's Responsible Scaling Policy defines capability thresholds (ASL levels) that trigger safeguards on Anthropic's side — architects don't set these, but need to understand that a model's ASL classification can affect what deployment contexts are permitted (e.g., enhanced controls or government notification requirements at higher ASL tiers), which is a real constraint on system design for certain high-stakes domains.

**HITL tier graduation governance.** Foundations covers what HOTL and HOOL mean. Professional-level ownership is the graduation *process*: who signs off on moving a workflow from HOTL to HOOL, what the minimum stable-operation window is (the pattern used elsewhere in this program is 30 days with zero critical incidents), and what triggers a demotion back to HOTL if something goes wrong after graduation.

---

### Domain 5 Practice Questions

**Q42.** A US healthcare startup building a patient-facing Claude application discovers mid-build that they never requested a Business Associate Agreement from their model provider, and PHI has already flowed through the system for three weeks. What is the correct immediate governance response?

A) Continue operating normally since the application works technically
B) Halt PHI processing through the system immediately, escalate to legal/compliance to assess the exposure from the three weeks without a BAA, and only resume once the BAA is executed
C) Simply request the BAA and continue operating in parallel while it's being negotiated
D) HIPAA does not apply to AI vendors, only to the covered entity itself

**Answer: B**
*Processing PHI without an executed BAA is a compliance gap with real exposure the moment it's discovered — the correct response is to stop the exposure first, then assess and remediate, not continue operating "in parallel" while unprotected (C) or assume it's a non-issue because the vendor is an AI company rather than a traditional business associate (D is false; HIPAA's business associate definition applies to any vendor handling PHI on the covered entity's behalf).*

---

**Q43.** A fintech company deploys a Claude-based system to help loan officers draft explanations for credit decisions. Which combination of frameworks most likely applies, and what does the architect need to prioritize?

A) Only GDPR, since this is a data privacy concern
B) Likely both SR 11-7 (model risk management, since this touches a lending decision workflow) and fair lending/explainability obligations — the architect should prioritize documented model validation, ongoing monitoring, and audit-trail-backed explainability for each decision
C) No formal framework applies since Claude is only drafting explanations, not making the decision
D) Only ISO 42001, since it's the most comprehensive framework available

**Answer: B**
*A system assisting credit decisions sits squarely in model-risk-management and fair-lending territory even if a human loan officer makes the final call — "only drafting explanations" (C) understates the exposure, since flawed AI-generated explanations for a regulated decision are themselves a compliance risk. This is a case where recognizing which framework combination actually applies, per the selection table, matters more than defaulting to the most familiar one (A) or the most comprehensive one (D).*

---

**Q44.** An organization has 30 different Claude-based applications across 12 business units. When a new regulation requires reporting "every AI system that processes customer PII," the compliance team takes six weeks to compile the answer through manual outreach to every team. What governance artifact was missing?

A) A centralized, continuously-maintained enterprise AI risk register covering every deployment's data handling, risk tier, and compliance obligations — turning this into a database query instead of a six-week audit
B) Every business unit should have used the exact same architecture
C) This delay is normal and unavoidable at this organizational scale
D) Only customer-facing applications need to be tracked this way

**Answer: A**
*This is exactly the failure mode enterprise-wide risk register ownership prevents — without it, answering a basic "which systems touch regulated data" question requires reconstructing the picture from scratch every time. Uniform architecture (B) isn't the fix; register-level visibility is. Internal-only tools can touch PII too, so scope can't be limited to customer-facing systems alone (D).*

---

**Q45.** A team wants to integrate a third-party vendor's pre-built MCP server that connects to a niche SaaS tool. The vendor is a two-person startup with no published SOC 2 report. What should the procurement-level risk assessment weigh most heavily beyond basic functionality?

A) Only the price of the integration
B) Data handling (where data goes, whether it's used for the vendor's own model training), the vendor's compliance posture given the lack of a SOC 2 report, and operational continuity risk given the vendor's small size and single-point-of-failure profile
C) Nothing beyond functionality matters if the integration works technically
D) Two-person vendors should be automatically disqualified from all integrations

**Answer: B**
*Vendor risk assessment for procurement is about more than "does it work" — data handling terms, compliance posture (the missing SOC 2 report is a real flag requiring a compensating assessment, not an automatic disqualifier), and continuity risk (small vendor, single point of failure) all belong in the evaluation. Blanket disqualification by company size alone (D) isn't a substantive risk assessment.*

---

**Q46.** A security incident is discovered: a prompt injection attack caused an agent to expose internal ticket data containing customer names and email addresses to an unauthorized party. The technical team patches the vulnerability within 4 hours. What additional obligation might still be outstanding?

A) None — the technical fix resolves the entire incident
B) A regulatory assessment of whether this constitutes a reportable data breach — if EU customer data was exposed, GDPR's 72-hour notification clock may already be running from the moment of discovery, independent of how quickly the technical fix was deployed
C) The 72-hour clock only starts once the technical fix is complete
D) Only the customers whose data was exposed need to be informed, with no regulatory body involved

**Answer: B**
*Technical containment and regulatory obligation are separate tracks that both need active ownership — closing the technical vulnerability doesn't stop or reset the notification clock, which (for GDPR) runs from discovery of the breach, not from remediation (C is a dangerous misunderstanding). Depending on jurisdiction and data involved, a regulator may need notification in addition to affected individuals (D understates the obligation).*

---

**Q47.** A workflow has been operating under HOTL (human monitors, can intervene) for 45 days with zero critical incidents. The team wants to graduate it to HOOL (fully autonomous, logs reviewed after the fact). Who should make this call, and what should trigger reverting the decision?

A) Any individual engineer can graduate the workflow unilaterally, and there's no need for a reversion trigger once graduated
B) Graduation should go through a defined sign-off (not a unilateral engineering call) confirming the minimum stable-operation window and zero-critical-incident bar were actually met, and the org should pre-define what triggers an automatic demotion back to HOTL (e.g., any critical incident post-graduation)
C) HOOL should never be used for any workflow regardless of stability history
D) Graduation is permanent once granted and cannot be reverted under any circumstances

**Answer: B**
*Graduation to full autonomy is a governance decision, not an individual engineering judgment call (A) — it needs a defined sign-off process and, just as importantly, a pre-defined demotion trigger, so a post-graduation incident automatically pulls the workflow back to human monitoring rather than requiring someone to notice and manually intervene. HOOL is a legitimate end state for validated workflows (C overstates the caution), but nothing about graduation should be treated as irreversible (D).*

---

**Q48.** A team using Extended Thinking for a high-stakes loan-decision workflow sets `display: "omitted"` in production to reduce payload size, following general API best practice. A regulator later requests the reasoning behind a specific historical decision, and it's unrecoverable. What governance principle was violated?

A) `display: "omitted"` should never be used anywhere, in any application
B) For high-stakes, regulated decision workflows, thinking blocks should be captured and stored in an append-only audit log even when not transmitted to the end user via the API response — `display: "omitted"` controls transmission, not whether the reasoning is worth retaining for compliance
C) Regulators cannot legally request AI reasoning after the fact
D) This is unavoidable since Extended Thinking reasoning is never recoverable once generated

**Answer: B**
*`display: "omitted"` is a legitimate general-purpose optimization (as covered in Foundations) — the governance failure here is applying that general default to a regulated, high-stakes workflow without a separate compliance-side capture step. The reasoning could have been captured server-side into an audit store even while omitted from the transmitted response; the two are independent choices, not one setting (D is wrong because capture, if designed for, is entirely possible).*

---

**Q49.** A model that Claude's system is built on gets classified at a higher ASL (AI Safety Level) tier under Anthropic's Responsible Scaling Policy. What is the correct architect-level response?

A) Nothing changes — ASL classification is entirely Anthropic's internal concern
B) Review whether the new classification introduces deployment constraints relevant to the org's use case (e.g., enhanced control requirements or notification obligations for certain high-stakes contexts) and assess whether the current deployment remains compliant
C) Immediately stop using the model regardless of use case
D) ASL classifications only apply to models still in training, never to deployed models

**Answer: B**
*ASL classification isn't purely an internal Anthropic matter once it carries deployment-relevant safeguards for certain contexts — an architect operating in a high-stakes domain needs to actively check whether a classification change affects their specific deployment's compliance posture, rather than assuming it's irrelevant (A) or automatically disqualifying (C) without checking whether it actually applies to their use case.*

---

**Q50.** An organization's audit log retention period was set to the platform's default (30 days) at launch, with no one deliberately choosing that number. A regulatory investigation two years later requests logs from 18 months ago, which no longer exist. What governance step was skipped?

A) Retention period should have been deliberately set to match the organization's actual data governance and regulatory requirements at design time, not left at whatever the platform defaults to
B) Audit logs should be retained forever by default in every system
C) This is not a governance failure since 30 days is a reasonable default
D) Regulatory investigations never request logs older than 30 days

**Answer: A**
*Accepting a platform default without deliberately mapping it to the org's actual regulatory retention obligations is exactly the gap that produces this outcome — retention policy is a governance decision to make explicitly, not inherit passively. "Retain forever" (B) isn't automatically correct either (it has its own cost and data-minimization trade-offs); the point is deliberate policy-setting, not defaulting in either direction.*

---

## Domain 6 — Stakeholder Communication & Lifecycle Management (14%)

### What this domain actually tests

This is the domain that most distinguishes Professional from Foundations, and it is not padding — 14% of a technical certification going to communication and process is a deliberate signal that owning a production system means owning the humans around it too, not just the code. Nothing here appears in Foundations. Expect scenario questions that test judgment about *how* and *when* to communicate, not just technical correctness.

**Structured discovery.** Before architecture begins, discovery should produce a stakeholder map (who has authority to approve, who has to live with the operational consequences, who has veto power via compliance/security/legal) and a requirements elicitation pass that distinguishes what a stakeholder is *asking for* from the underlying business problem — these frequently diverge, and building exactly what was asked for when it doesn't solve the actual problem is a communication failure, not a technical one.

**Trade-off communication.** The core skill is translating a technical trade-off into terms the audience actually weighs decisions in.

| Audience | What they weigh | How to frame a trade-off |
| --- | --- | --- |
| Executive sponsor | Business risk, cost, timeline | "This choice costs $X more but reduces the chance of a customer-facing outage from Y% to Z%" — not architecture jargon |
| Legal/compliance | Regulatory exposure | Map the trade-off directly to a named obligation ("this satisfies GDPR Article 30 record-keeping; the alternative doesn't") |
| Security | Attack surface, blast radius | Frame in terms of what's newly exposed and what compensating control offsets it |
| Engineering peers | Maintainability, technical debt | Standard technical trade-off discussion is appropriate here — don't over-translate for an audience that doesn't need it |

Using the wrong register for the audience — jargon at the exec level, or oversimplified hand-waving to a security reviewer who needs specifics — is a common and costly failure at this level even when the underlying technical judgment is sound.

**SLA/SLO definition and negotiation.** An AI system's SLA needs SLIs that are actually measurable and meaningful for probabilistic systems — "99.9% accuracy" is rarely a defensible SLI on its own; better framed as a measurable proxy (e.g., "95th percentile response time under 2s," "human escalation rate under 3%," "critical-error rate under 0.1%, defined as...") with an error budget the business explicitly agrees to. Negotiation means identifying what's genuinely non-negotiable (regulatory floors, safety limits) versus what's a cost/quality trade-off the business should consciously choose — and not letting a stakeholder assume 100% accuracy is achievable or implicitly promised.

**Change management.** Every material change to a production AI system — a model swap, a prompt change affecting regulated output, a deprecation-driven migration — needs a communication plan proportional to its blast radius: who's notified, how far in advance, and what the rollback communication looks like if it goes wrong. A model deprecation announced with a 6-month notice window should trigger stakeholder communication (budget owners, downstream teams depending on current behavior) in month one, not month five.

**Post-incident review.** A blameless postmortem process needs two different outputs for two different audiences: a technical postmortem (root cause, timeline, contributing factors, engineering action items) for the team that will implement the fix, and a separate executive summary (business impact, what changed to prevent recurrence, confidence in the fix) for the audience that needs to know the system is trustworthy again without wading through log timestamps. Conflating the two — sending the technical postmortem to an executive, or a sanitized summary to the engineers who need the detail to actually fix it — undermines both audiences.

**Business case and ROI communication.** Executives fund systems based on business case, not architecture elegance — total cost of ownership (build + ongoing model/infra cost + platform headcount) framed against a quantified benefit (cost avoided, revenue enabled, risk reduced) is the currency that gets budget approved and retained through the inevitable cost surprises.

---

### Domain 6 Practice Questions

**Q51.** During discovery, a stakeholder asks for "a chatbot that answers any question about our product catalog." The architect builds exactly that. Post-launch, usage is low and the stakeholder is unhappy — it turns out the actual business goal was reducing a specific support team's ticket volume on a narrow set of repeat questions. What discovery failure occurred?

A) The architect should have built a more capable chatbot
B) The stated request ("any question about our catalog") was taken at face value instead of being probed for the underlying business problem it was meant to solve — proper discovery would have surfaced the actual goal (reducing ticket volume on a specific repeat-question set) and produced a narrower, more targeted design
C) The stakeholder gave bad requirements and the failure is entirely theirs
D) This outcome was unavoidable since stakeholders often don't know what they want

**Answer: B**
*This is the exact discovery failure this domain calls out: what's asked for and the underlying problem frequently diverge, and it's the architect's job to elicit the real one through structured discovery, not build literally to the request as stated. Blaming the stakeholder (C) or treating it as unavoidable (D) both let the architect off the hook for a skill this domain explicitly expects.*

---

**Q52.** An architect needs to explain to an executive sponsor why a more expensive multi-region redundancy architecture is being recommended over a cheaper single-region option. Which framing is most appropriate?

A) A detailed technical explanation of active-passive failover mechanics and DNS-based routing
B) "This costs $40K more per year but reduces the chance of a customer-facing outage during a regional cloud incident from roughly quarterly to under once every few years — given our SLA commitments, that gap is the business risk we'd otherwise be carrying"
C) "Trust me, this is the right architecture"
D) A comparison of Kubernetes vs. serverless deployment models

**Answer: B**
*This maps directly to the audience-framing table: an executive sponsor weighs cost against business risk, not failover mechanics (A, D are the wrong register for this audience even if technically accurate) or bare assertion of authority (C, which isn't communication at all). Framing the same decision in terms of dollars and outage-risk reduction is what actually gets a defensible, informed sign-off.*

---

**Q53.** A contract is being negotiated with an enterprise customer who wants "99.99% accuracy" written into the SLA for an AI-assisted classification system. What is the architect's correct role in this negotiation?

A) Agree to the number since the customer is asking for it
B) Push back on "accuracy" as an unmeasurable, likely unachievable SLI as worded, and propose a defensible, measurable alternative (e.g., a specific error-rate definition, an escalation-rate ceiling, or a response-time SLI) with an explicit error budget the business consciously accepts
C) Refuse to participate in any SLA negotiation since that's a sales function
D) Agree to whatever number keeps the deal moving, since SLAs are rarely enforced anyway

**Answer: B**
*Signing up for an SLI that's vague or effectively unachievable is a liability the business will inherit later — the architect's job in this negotiation is translating the customer's real intent into something measurable and realistic, with an explicit error budget, not rubber-stamping a number (A, D) or opting out of the technical conversation entirely (C), which leaves an unqualified promise on the table.*

---

**Q54.** A production model is being retired with Anthropic's standard 6-month deprecation notice. The architect quietly begins migration work internally but doesn't communicate anything externally until month 5, when the migration is nearly complete. A downstream team that depends on the current model's exact behavior is caught off guard by a late-breaking compatibility issue. What communication failure occurred?

A) None — waiting until migration is nearly complete before communicating is efficient
B) Stakeholder communication about a change of this blast radius should start in month one of the notice window, not month five — downstream teams need lead time to validate their own dependency on current behavior, not a surprise near the end of the window
C) The downstream team should have been monitoring Anthropic's deprecation announcements themselves
D) 6-month deprecation notices don't require any stakeholder communication since Anthropic already announced it

**Answer: B**
*Communication timing should scale with blast radius and lead time needed by affected parties, not with how far along the internal migration happens to be — starting in month one gives downstream teams the runway to validate and adjust; waiting until month five turns a plannable change into a fire drill for them. Anthropic's public announcement (D) doesn't substitute for the architect proactively communicating impact to their own org's downstream dependents (C shifts an ownership responsibility that belongs to the architect).*

---

**Q55.** After a production incident, the on-call engineer writes a single document containing the full root-cause timeline, stack traces, and remediation code diff, and sends it to both the engineering team and the executive steering committee. What is the problem with this approach?

A) There is no problem — one document is more efficient than two
B) A single technical postmortem serves the engineering audience but is the wrong artifact for executives, who need a separate, business-framed summary (impact, fix confidence, prevention) — conflating the two under-serves both audiences
C) Executives should not receive any incident communication
D) The engineering team should receive a business-framed summary instead of technical detail

**Answer: B**
*This is exactly the postmortem-audience mismatch this domain flags: engineers need the technical detail to actually implement fixes, executives need a business-impact framing to assess whether the system is trustworthy again — sending the same artifact to both means the executive document is unreadable noise and the engineering document, if watered down instead, is unusable for the fix. Excluding executives entirely (C) isn't the fix either; the fix is two purpose-built artifacts.*

---

**Q56.** A CFO asks an architect to justify continued investment in a Claude-based system after a rough cost quarter. The architect's response focuses entirely on the elegance of the multi-agent architecture and the sophistication of the prompt engineering. How should this response have been framed instead?

A) Exactly as given — technical sophistication is the strongest justification
B) In terms of total cost of ownership against quantified business benefit — cost avoided, revenue enabled, or risk reduced — since that's the currency a CFO actually evaluates continued investment in
C) The architect should have deflected the question to someone in finance
D) By promising the cost will decrease without providing any supporting basis

<br>**Answer: B**
*Executives fund and continue funding systems based on business case, not architectural elegance — a CFO conversation about continued investment needs to be answered in TCO-versus-quantified-benefit terms, the actual currency of that decision, not a technical showcase (A) that doesn't address the question asked. Deflecting (C) or making an unsupported promise (D) both fail to actually engage with a legitimate business question the architect is best positioned to answer.*

---

**Q57.** A stakeholder mapping exercise for a new project identifies an executive sponsor, an engineering team, and a legal reviewer — but omits the operations team that will be on-call for the system once it launches. Three months post-launch, the on-call team is blindsided by alert volume they were never consulted about. What discovery gap does this reveal?

A) Operations teams never need to be included in discovery since they only operate what's already been designed
B) Stakeholder mapping must include everyone who will bear the operational consequences of the system, not just those with approval or veto authority — the ops team had no seat at discovery despite owning a major downstream consequence of the design
C) This is an inevitable outcome of any new system launch
D) Legal review should have caught this issue instead

**Answer: B**
<br>*A stakeholder map limited to approval/veto authority (executive sponsor, legal) while excluding the team that has to live with the operational consequences is an incomplete map — per this domain's discovery guidance, "who has to live with the operational consequences" is one of the three categories that belongs in stakeholder mapping from the start, not a lower-priority addendum. This isn't legal's responsibility to catch (D) or an unavoidable outcome (C) — it's a scoping gap in the original discovery exercise.*

---

**Q58.** An architect is asked by a product manager to add a feature that would require bypassing a documented compliance control "just for this one high-value customer, as an exception." What is the correct communication approach?

A) Quietly implement the exception without telling anyone, since it's a small change
B) Decline to implement it silently, and instead surface the request transparently to the actual control owner (compliance/legal) as a formal exception request with the business justification and risk documented — let the accountable party make an informed call, rather than the architect unilaterally deciding either way
C) Refuse the request outright with no further discussion
D) Implement it immediately since the product manager is a stakeholder with legitimate authority to request features

**Answer: B**
*A documented compliance control isn't the architect's to waive unilaterally in either direction — silently complying (A, D) creates unreviewed risk, and silently refusing without escalation (C) may also be wrong if there's a legitimate, reviewable exception process. The correct move is transparent escalation to whoever actually owns that control, with the request and its justification documented, so an accountable party makes the call on the record.*

---

**Q59.** Six months after a system's HOTL-to-HOOL graduation, a minor but real incident occurs. The team debates whether to communicate it upward given it was "minor." What is the correct approach?

A) Suppress it since it was minor and doesn't need to be reported
B) Report it through the normal incident channel regardless of severity — minor incidents post-graduation are exactly the signal that should trigger review of whether HOOL status should hold, and suppressing them removes the data that governance and stakeholders need to make that call
C) Only report incidents that are customer-facing
D) Wait until a pattern of multiple incidents emerges before reporting anything

**Answer: B**
*Suppressing "minor" incidents (A) or waiting for a pattern to accumulate before reporting (D) both starve the governance process of exactly the signal it needs to evaluate whether autonomous operation should continue — per Domain 5's HITL graduation content, a pre-defined demotion trigger only works if incidents are actually reported when they happen, not filtered by someone's individual judgment about severity. Internal-only incidents matter too, not just customer-facing ones (C).*

---

## Domain 7 — Developer Productivity & Operational Enablement (7%)

### What this domain actually tests

The lightest-weighted domain, but not a throwaway — it tests whether you can scale Claude adoption across an *organization* rather than just configure it well for one project. Foundations Domain 3 covers CLAUDE.md hierarchy, custom commands, hooks, and skills at the single-project level. This domain is about standardizing those same primitives across many teams, and owning the platform that makes adoption easy instead of ad hoc.

**Paved-road platform design.** The goal is a "golden path" — a pre-approved, pre-configured way for any team to stand up a new Claude-based capability (approved MCP servers, standard CLAUDE.md conventions, pre-wired cost limits and audit logging) that's faster than doing it themselves from scratch, so teams adopt the governed path by preference, not by mandate. A platform only teams are forced to use gets worked around; one that's genuinely the fastest path gets adopted voluntarily.

**Org-wide configuration governance.** Foundations covers CLAUDE.md precedence within one project. At the platform level, the question is standardizing conventions *across* projects — a shared template for what belongs in every project's CLAUDE.md (security defaults, cost limits, escalation paths), while leaving room for legitimate per-project customization, and a lightweight review process so one team's local conventions don't silently diverge into incompatible patterns across the org.

**Adoption metrics.** A platform team should track adoption the same way a product team tracks its own product: time-to-first-successful-use for a new team onboarding, utilization of the paved-road path versus ad hoc workarounds, and developer satisfaction — low adoption despite a mandate usually means the paved road is slower or more restrictive than going around it, which is itself the signal to fix, not a compliance problem to enforce harder.

**Operational debugging enablement.** Every team running production Claude workloads needs a documented, tested runbook for common failure classes (tool errors, rate-limit exhaustion, unexpected cost spikes) so debugging doesn't depend on tribal knowledge held by whoever built the original system.

**Platform team vs. product team boundary.** A clear split prevents both platform-team overreach (dictating every product decision) and product-team platform reinvention (each team building its own auth, logging, and cost-tracking from scratch): the platform team owns shared infrastructure, governance defaults, and the paved road; product teams own their specific business logic, prompts, and domain integrations on top of it.

---

### Domain 7 Practice Questions

**Q60.** A platform team builds a mandatory internal Claude deployment standard, but adoption six months later is under 20% — most teams route around it with their own ad hoc setups. What is the most likely root cause and correct response?

A) Teams should be forced to comply through stricter enforcement
B) The mandated path is probably slower or more restrictive than going around it — the platform team should investigate what friction is driving teams away and redesign the golden path to be the *fastest* option, not just the *required* one
C) Low adoption after six months means the initiative should be abandoned entirely
D) This is normal adoption behavior and no action is needed

**Answer: B**
*Low adoption despite a mandate is a strong signal the paved road isn't actually paved — it's slower or more restrictive than the workaround, which is a design problem to fix, not a compliance problem to escalate (A only increases the incentive to route around it further). Abandoning the initiative (C) throws away the value of a genuinely good golden path without first diagnosing what's wrong with the current one.*

---

**Q61.** Twelve product teams each independently implement their own cost-limit enforcement, audit logging, and MCP server approval process for their Claude-based features, with significant duplicated effort and inconsistent security postures across teams. What platform gap does this reveal?

A) Each team should continue building independently since customization is valuable
B) Shared infrastructure (cost limits, audit logging, MCP approval workflow) should be owned once by a platform team and consumed by all product teams, freeing each team to focus on their actual business logic instead of reinventing governance primitives with inconsistent results
C) The organization should stop using Claude across all teams
D) This is a Domain 5 governance issue only, unrelated to developer productivity

**Answer: B**
*This is the exact platform-vs-product boundary problem this domain addresses: governance primitives that are the same regardless of business domain (cost limits, audit logging, approval workflows) belong in shared platform infrastructure, not duplicated per team — both to eliminate wasted effort and to close the inconsistent-security-posture risk that duplication creates. It's a legitimate developer productivity and enablement problem even though the specific primitives (audit logging, cost limits) also connect to Domain 5 governance (D draws too hard a line between the two).*

---

**Q62.** A platform team wants to measure whether their internal Claude enablement program is actually working. Which metric combination is most meaningful?

A) Total number of Claude API calls across the organization, regardless of context
B) Time-to-first-successful-use for newly onboarded teams, utilization rate of the paved-road path versus ad hoc alternatives, and developer satisfaction — together indicating whether the platform is actually the easiest way to build, not just heavily used
C) Number of MCP servers deployed, regardless of whether they're actively used
D) Total lines of code written using Claude Code

**Answer: B**
*Raw usage volume (A, C, D) doesn't distinguish a genuinely well-adopted, low-friction platform from one that's heavily used because it's mandatory or because a few teams happen to be power users — the meaningful signal is whether onboarding is fast, whether the governed path is chosen over workarounds, and whether developers actually like using it, which together indicate real enablement rather than just measured activity.*

---

**Q63.** A new engineer joins a team and needs to debug why their Claude-based feature is failing intermittently in production. No runbook exists; the only person who understands the system's common failure modes is the original architect, who is on leave. What operational enablement gap does this expose?

A) The engineer should wait for the architect to return
B) There was no documented, tested runbook for common failure classes (tool errors, rate-limit exhaustion, cost spikes) — operational knowledge was held as tribal knowledge in one person instead of being a durable, discoverable artifact
C) This is unavoidable since every system has unique failure modes that can't be documented in advance
D) Only the platform team should ever be allowed to debug production issues

**Answer: B**
*Bus-factor-of-one operational knowledge is exactly the gap a documented runbook exists to close — common failure classes (tool errors, rate limits, cost spikes) are largely predictable and documentable in advance, contrary to the claim that they're too unique to write down (C). Waiting for one person to return (A) or centralizing all debugging in the platform team (D) both avoid fixing the actual gap: knowledge that should be a shared, durable artifact.*

---

**Q64.** A platform team enforces one rigid organization-wide CLAUDE.md template with zero allowance for per-project customization, citing consistency. Several teams complain the template doesn't fit their workflow and start ignoring parts of it. What is the correct governance design?

A) Keep the rigid template and enforce compliance more strictly
B) A shared template should define the non-negotiable shared defaults (security, cost limits, escalation paths) while explicitly leaving room for legitimate per-project customization elsewhere — total rigidity invites exactly the workaround behavior being observed
C) Remove all standardization and let every team do whatever they want
D) This complaint should be ignored since consistency is more important than team preference

**Answer: B**
*Over-rigid standardization produces the same workaround dynamic seen elsewhere in this domain — teams route around a mandate that doesn't fit their reality. The fix is distinguishing what genuinely needs to be non-negotiable (security defaults, cost limits) from what can flex per project, not doubling down on rigidity (A, D) or abandoning standardization altogether (C), which loses the real benefits consistency provides where it matters.*

---

## Rapid-Fire Review — Key Numbers to Memorise

| Fact | Value |
| ------ | ------- |
| CCAR-P passing score | 720 / 1000 |
| Exam duration | 120 minutes |
| Question count | 63 |
| Exam cost | $175 per attempt |
| Credential validity | 2 years (inferred, unconfirmed — see Exam Facts note) |
| Retake policy | Staged wait ladder + capped attempts per rolling window (community-reported shape, exact figures unconfirmed) |
| Recommended prior experience | 3+ years architecture/platform engineering, 6+ months hands-on Claude production work |
| Highest-weight domain | 3 — Integration (19%) |
| Lowest-weight domain | 7 — Developer Productivity & Operational Enablement (7%) |
| Domain unique to Professional (no Foundations equivalent) | 6 — Stakeholder Communication & Lifecycle Management (14%) |
| Model deprecation minimum notice (referenced from enterprise practice) | 6 months |
| GDPR breach notification window | 72 hours from discovery |
| HOTL → HOOL graduation minimum stable window (program convention) | 30 days, zero critical incidents |
| Spend-threshold alert tiers (enterprise cost governance pattern) | 75% and 90% of org-level limit |
| Prompt cache minimum prefix (mechanics, from Foundations) | 1,024 tokens |
| CCAF (Foundations) passing score, for comparison | 720 / 1000 |
| CCAF (Foundations) exam cost, for comparison | $99 |

---

## Last-Day Study Plan

### Day Before Exam

**Morning (2 hours)**

- Re-read Domain 3 (Integration, 19% — highest weight): RAG governance table, protocol selection matrix, entitlement lifecycle, idempotency-across-hops reasoning
- Re-read Domain 1 (Solution Design, 17%): discovery-to-ADR chain, NFR-to-architecture mapping, resilience strategy sizing

**Afternoon (2 hours)**

- Work through Domain 4 (Evaluation, 16%): root-cause diagnostic taxonomy, golden dataset governance, statistical validity traps in A/B testing, rollout gate patterns
- Work through Domain 6 (Stakeholder Communication, 14%): audience-framing table, SLA negotiation logic, postmortem-audience split — this domain rewards judgment over recall, so focus on *why* each answer is correct, not just which letter

**Evening (1 hour)**

- Rapid-fire numbers table above
- Review any questions you got wrong in this guide
- Light review of Domains 2, 5, 7

### Exam Day Strategy

1. **This exam tests ownership judgment, not just technical correctness** — for scenario questions, ask "what would a senior architect actually be accountable for here?" before picking an answer that's merely technically true.
2. **Watch for the "technically fine, but skips a governance step" trap** — several questions in this guide have an option that solves the immediate technical problem while missing the process failure that allowed it. The exam rewards catching the root cause.
3. **Domain 6 questions have no purely technical answer** — don't look for one. Judge them on stakeholder-appropriate framing and process, the same way you'd judge them on the job.
4. **Budget**: 120 min / 63 questions ≈ 1.9 min/question. Flag and move on rather than over-indexing on any one scenario.
5. **Elimination first** — options that are absolute ("never," "always," "only") are frequently wrong in scenario-based governance questions where the correct answer is almost always "it depends, and here's the process for deciding."

---

## Where to Go Next

- **Not confident on Foundations-level material referenced throughout this guide?** Go back to [CCAF Exam Prep — Complete Guide](/docs/coding-tools/claude/ccaf-exam-prep-complete) first — Domains 1, 2, and 4 there are load-bearing for this exam's Domains 1, 3, and 2 respectively.
- **Need deeper production grounding on governance and compliance?** See [`constitutional-ai-safety-2026.md`](/docs/coding-tools/claude/constitutional-ai-safety-2026) for the full incident response runbook, red-teaming process, and regulatory framework detail this guide's Domain 5 builds on.
- **Need deeper production grounding on enterprise deployment?** See [`claude-enterprise-2026.md`](/docs/coding-tools/claude/claude-enterprise-2026) for cloud platform selection, cost governance tooling, and the full compliance checklist this guide's Domains 1, 2, and 3 build on.
- **Need deeper production grounding on Agent SDK patterns?** See [`claude-agent-sdk-production.md`](/docs/coding-tools/claude/claude-agent-sdk-production) for the checkpointing, cost-limit, and human-checkpoint mechanics referenced throughout this guide's Domains 1 and 5.
