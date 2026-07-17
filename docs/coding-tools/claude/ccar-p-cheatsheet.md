---
title: "CCAR-P Cheatsheet — Quick Reference"
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

# CCAR-P Cheatsheet — Quick Reference

Condensed companion to [CCAR-P Exam Prep — Complete Guide](/docs/coding-tools/claude/ccar-p-exam-prep-complete). Key terms, frameworks, and gotchas only — no practice questions, no re-derivation. If a term here is unfamiliar, the full guide has the scenario walkthrough; if it's still unfamiliar after that, it's probably [Foundations-level](/docs/coding-tools/claude/ccaf-exam-prep-complete) material.

---

## Exam Facts

| Item | Detail |
| ------ | -------- |
| Questions | 63 multiple-choice / multiple-response |
| Duration | 120 minutes (~1.9 min/question) |
| Passing score | 720 / 1000 (scaled, criterion-referenced) |
| Cost | $175 per attempt, no retake discount |
| Format | Pearson VUE — online proctored or test center |
| Validity | 2 years (inferred, unconfirmed — pattern-matched to Foundations tier) |
| Prerequisite | None enforced; Foundations strongly recommended |
| Retakes / renewal | Staged wait ladder + capped attempts, free on-time renewal (community-reported shape, exact figures unconfirmed) |

*Verify against Anthropic's Partner Academy candidate handbook before your exam date — this table is compiled from Pearson VUE's listing and independent community sources, not Anthropic's gated official handbook. Early sources for the 12-month validity figure traced back to unverifiable, SEO-oriented sites citing each other rather than an official source, so this page uses 2 years as an inference instead.*

---

## Domain Weightings

| Domain | Weight | ~Q |
| -------- | -------- | --- |
| 1 — Solution Design & Architecture | 17% | 11 |
| 2 — Models, Prompting & Context Engineering | 13% | 8 |
| 3 — Integration | 19% | 12 |
| 4 — Evaluation, Testing & Optimization | 16% | 10 |
| 5 — Governance, Safety & Risk Management | 14% | 9 |
| 6 — Stakeholder Communication & Lifecycle Mgmt | 14% | 9 |
| 7 — Developer Productivity & Op. Enablement | 7% | 4 |

---

## Domain 1 — Solution Design & Architecture (17%)

**Discovery-to-ADR chain:** Business problem statement (owner-signed, measurable) → NFR set (latency/availability/residency/throughput/cost ceiling) → candidate pattern shortlist with explicit rejections → Architecture Decision Record.

**NFR → architecture:** sub-second + high volume → workflow over agentic loop · hard residency → region-pinned cloud platform before model choice · >99.9% availability → redundancy, not just retries · unbounded complexity → agentic + cost ceilings · strict cost at scale → tiering architecture, not retrofitted later.

**Redundancy ladder (cheapest → most expensive):** single-region → single-provider multi-region → active-passive multi-provider → active-active multi-provider. Match to actual SLA tier — don't default to the top of the ladder.

**Build vs. buy is time-bound**, not a permanent verdict — re-evaluate as org capability changes, don't retroactively grade an old decision against conditions that didn't exist yet.

**Gotchas:** "the pattern was wrong" is rarely the real finding at this tier — missing NFR elicitation or an undocumented ADR usually is. Capacity/rate-limit planning is a proactive commercial conversation with the account team, not something that "just scales."

---

## Domain 2 — Models, Prompting & Context Engineering (13%)

**Key terms:** model entitlement governance (SCIM-group model access tiers) · token-maxing (defaulting to frontier model regardless of task) · prompt-as-code (version control + review + rollback for system prompts) · model registry (production model per workload + EOL tracking) · cost attribution metadata / chargeback.

**Migration governance checklist:** recompute token budgets and cost forecasts against new tokenizer *before* cutover · re-validate cache minimums and context ceilings · stage validation well ahead of the 6-month deprecation notice window, not after it arrives.

**Decision: is a model swap ready to ship?**

| Check | Required before production |
| --- | --- |
| Golden-set accuracy | Meets or exceeds the workload's bar, not just "close" |
| Cost forecast | Recomputed against new tokenizer/pricing |
| Rollback plan | Documented and tested |

**Gotchas:** "5 points of headroom on paper" ≠ validated — always test the candidate against the same golden set the incumbent was held to. A hot-fixed system prompt with no version history is a governance failure even if the fix works.

---

## Domain 3 — Integration (19%, highest weight)

**RAG governance surface:** chunking (change-controlled) · embedding model (version-pinned; migration = re-embed + validate, never a silent swap) · retrieval quality (owned as an SLO, e.g. recall@k) · freshness policy · multi-source conflict resolution (recency/authority/surface-the-conflict) · citation/grounding verification.

**Protocol selection matrix:**

| Situation | Protocol |
| --- | --- |
| Multiple internal clients need same capability | MCP |
| Single team/app, max control | Direct API tool-use |
| Standard capability set, no infra desired | Managed Agents |
| No network egress allowed | MCP over stdio |
| Need distributed tracing across hops | MCP + W3C Trace Context |

**Entitlement lifecycle:** provisioning alone is not governance — automated de-provisioning on role/team change and periodic drift audits are required, or stale access becomes a standing security risk.

**Idempotency across composed systems:** the dedup key must travel unchanged across every hop (webhook → queue → orchestrator → tool call) — reinventing it per hop is how duplicate side effects happen.

**Gotchas:** "reputable vendor" ≠ pre-vetted — a third-party MCP server needs the same security review as an internal one. A vendor-supplied server operating with excess privileges or hardcoded creds is a finding, not a footnote.

---

## Domain 4 — Evaluation, Testing & Optimization (16%)

**Golden dataset governance:** versioning · drift monitoring · adjudication process for labeler disagreement · periodic refresh (a static set decays as production input distribution shifts).

**LLM-as-judge:** must be calibrated against human raters (e.g., Cohen's kappa) before trusting at scale, and re-calibrated on any judge-model or rubric change.

**A/B testing traps:** compute required sample size for the claimed effect size *before* concluding anything — small-sample "wins" are usually noise. Separate primary metric from guardrail metrics (cost, latency, safety refusal rate).

**Rollout safety ladder:**

| Pattern | Trade-off |
| --- | --- |
| Shadow (parallel, unserved) | Safest; ~2x compute cost during shadow period |
| Canary (small % live traffic + gate) | Standard default |
| Full regression gate before any stage advance | Non-negotiable for regulated workflows |

**Root-cause taxonomy:** quality drop + stable retrieval/tool metrics + recent prompt/model change → prompt/model regression · quality drop + recall drop → retrieval layer · completion drop + rising tool errors → integration layer · latency/timeout spike only → infrastructure.

**Gotchas:** cost optimization is a Pareto problem (cost vs. quality), never a single-axis price cut — always re-run the golden set before a cheaper-model swap ships. Every incident that reveals an eval gap should add a case to the golden set, or it can silently recur.

---

## Domain 5 — Governance, Safety & Risk Management (14%)

**Framework-to-context map:**

| Context | Framework(s) | Core obligation |
| --- | --- | --- |
| US healthcare, PHI | HIPAA | BAA before any PHI flows through the system |
| US financial services | SR 11-7 | Independent model validation, ongoing monitoring |
| EU financial services | EBA / MiFID II | Risk categorization, full audit trail |
| EU high-risk AI use case | EU AI Act (Annex III) | Documented risk assessment, tamper-proof logging |
| EU personal data | GDPR | Purpose limitation, 72-hour breach notification, SCCs |
| US federal | FedRAMP | Authorization boundary |
| Cross-industry | ISO 42001 / NIST AI RMF | Model register; Govern/Map/Measure/Manage |

Frameworks stack — a US healthcare company serving EU patients can be under HIPAA + GDPR + EU AI Act simultaneously.

**Key artifacts to own:** enterprise-wide AI risk register (not per-project) · vendor/model procurement risk assessment (data handling, compliance posture, continuity risk) · audit trail retention policy (deliberately set, not left at platform default) · HOTL→HOOL graduation sign-off + demotion trigger.

**Gotchas:** technical containment ≠ regulatory closure — the GDPR 72-hour clock runs from *discovery*, not from when the fix ships. `display: "omitted"` controls transmission only; high-stakes workflows still need thinking blocks captured server-side for audit. ASL classification changes can carry real deployment constraints for high-stakes contexts — don't assume it's "Anthropic's problem only."

---

## Domain 6 — Stakeholder Communication & Lifecycle Management (14%)

*No Foundations equivalent — this domain is Professional's signature differentiator. Judgment-based, not recall-based; expect no purely technical answer option.*

**Stakeholder mapping — three categories, all required:** approval authority · operational-consequence bearers (don't forget ops/on-call) · veto power (compliance/legal/security).

**Audience-framing table:**

| Audience | Weighs | Frame as |
| --- | --- | --- |
| Executive sponsor | Business risk, cost, timeline | $ cost vs. quantified risk reduction |
| Legal/compliance | Regulatory exposure | Map directly to a named obligation |
| Security | Attack surface, blast radius | What's newly exposed + compensating control |
| Engineering peers | Maintainability | Standard technical trade-off talk |

**SLA/SLO discipline:** "99.9% accuracy" is not a defensible SLI — use a measurable proxy (p95 latency, escalation-rate ceiling, defined critical-error rate) with an explicit, business-agreed error budget.

**Postmortem split:** technical postmortem (root cause, timeline, fix) for engineering ≠ executive summary (impact, fix confidence, prevention) for leadership. Sending one to the other audience under-serves both.

**Change management:** communication timing scales with blast radius, not with how far along the internal work is — a 6-month deprecation notice should trigger downstream communication in month 1, not month 5.

**Gotchas:** discovery that takes a stated request at face value instead of probing the underlying business problem is a discovery failure, not the stakeholder's fault. Undocumented compliance-control exceptions should be escalated transparently to the control owner — never granted or refused unilaterally.

---

## Domain 7 — Developer Productivity & Operational Enablement (7%)

**Paved-road principle:** the governed path should be the *fastest* way to build, not just the *required* one — low adoption despite a mandate means the platform, not the team, has the problem.

**Platform vs. product boundary:** platform team owns shared infra (cost limits, audit logging, MCP approval workflow, golden-path templates); product team owns business logic, prompts, and domain integration on top.

**Adoption metrics that matter:** time-to-first-successful-use for a new team · paved-road utilization vs. ad hoc workarounds · developer satisfaction. Raw call-volume or server-count metrics don't distinguish real enablement from mandated usage.

**Gotchas:** a rigid, zero-customization org-wide CLAUDE.md template invites the exact workaround behavior it's trying to prevent — define non-negotiable shared defaults, leave room elsewhere. Tribal-knowledge debugging (one person holds all the operational context) is a runbook gap, not bad luck.

---

## Cross-Domain Rapid-Fire Numbers

| Fact | Value |
| --- | --- |
| Passing score | 720/1000 |
| Question count / duration | 63 / 120 min |
| Exam cost | $175 |
| Credential validity | 2 years (inferred, unconfirmed) |
| Retake policy | Staged wait ladder + capped attempts (unconfirmed exact figures) |
| Model deprecation minimum notice | 6 months |
| GDPR breach notification window | 72 hours from discovery |
| HOTL→HOOL minimum stable window | 30 days, zero critical incidents |
| Enterprise spend-alert tiers | 75% / 90% of org limit |
| Domain with highest weight | Integration, 19% |
| Domain with no Foundations equivalent | Stakeholder Communication, 14% |
