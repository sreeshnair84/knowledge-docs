---
title: "Repository Review — Grounding, Duplication, Outdated & Gap Analysis"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
supersedes: "archive/_meta-analysis-2026-06/ (June 29 gap analysis set + July 5 freshness audit)"
source_type: native-md
tags: ["meta", "review", "grounding", "deduplication", "gap-analysis"]
---

# Repository Review — 2026-07-11

Fresh review of the full corpus (524 markdown files, 21 sections) plus the 9 in-flight docs.
The previous analysis set was moved to `archive/_meta-analysis-2026-06/` and was **not** used as input.

Scope: (A) grounding errors verified against primary sources, (B) duplication register,
(C) outdated topics, (D) incomplete topics, (E) missing topics, (F) remediation plan.

---

## A. Grounding Errors (web-verified against primary sources)

### A1. NLIP is a published Ecma standard, not a draft — and the committee is TC56, not TC54 🔴 P1

The repo states NLIP is developed by **"Ecma TC-54"**, is at **"Committee Draft stage"**, and targets
**"publication late 2026 or early 2027"** with a "65% standardization probability".

**Reality:** NLIP is developed by **Ecma TC56** (formed Dec 2024). Ecma International **published the
NLIP standards suite on 10 December 2025** — ECMA-430, ECMA-431, ECMA-432, ECMA-433, ECMA-434 and
ECMA TR/113. The "will it standardize?" framing is obsolete; it already did, before these docs were written.

Affected files:
- `docs/ai-protocols/standards/emerging-protocols-ucp-ap2-nlip-lmos.md` — Section on NLIP (lines ~67, 939–957) is built on the wrong premise; needs a rewrite, not a find/replace.
- `docs/ai-protocols/standards/emerging-protocols-overview.md` — comparison matrices (TC54; "Ecma draft"; 65% probability row; maturity model row).
- `docs/ai-protocols/standards/AI_Protocols_Standards_Service_Industry_Guide_2026.md` — NLIP status rows say "standards body process — slow"; update to published status.

Sources: [Ecma TC56 committee page](https://ecma-international.org/technical-committees/tc56/),
[Ecma news: NLIP standards suite approved](https://ecma-international.org/news/ecma-international-approves-nlip-standards-suite-for-universal-ai-agent-communication/),
[nlip-project GitHub (ECMA TC-56)](https://github.com/nlip-project).

### A2. AG-UI governance misattributed to "community/Agno" 🔴 P1

`emerging-protocols-overview.md` (lines 43, 112, 275) lists AG-UI governance as **"community/Agno"**.

**Reality:** AG-UI is created and **governed by CopilotKit** (which raised $27M in May 2026 around it),
with adoption by Google, Microsoft, Amazon, Oracle and frameworks incl. LangChain, Mastra, PydanticAI,
Agno, AG2. The companion deep-dive `emerging-protocols-agui-utcp.md` gets this right (CopilotKit + Agno
builders as co-originators) — only the overview matrices are wrong.

Sources: [CopilotKit AG-UI](https://www.copilotkit.ai/ag-ui), [CopilotKit GitHub — "Makers of the AG-UI Protocol"](https://github.com/copilotkit/copilotkit),
[CopilotKit $27M raise](https://ai2.work/blog/copilotkit-raises-27m-to-make-ag-ui-the-standard-for-in-app-ai-agents).

### A3. A2UI described as "Proprietary (ADK), closed, Google-only" 🔴 P1

`emerging-protocols-overview.md` matrices list A2UI license as **"Proprietary (ADK)"**, open-source
maturity **"Closed"**, cloud portability **"Google-only"**, and speculates Google will "keep ADK proprietary"
(lines ~277, 597, 626, 664).

**Reality:** A2UI is an **Apache 2.0 open project** (github.com/google/A2UI) announced Dec 2025, with
contributions from **CopilotKit** and the community; it is deliberately client-neutral (Flutter, Angular, Lit
renderers) and used in Gemini Enterprise. The "proprietary vs community permanent split" scenario in §5.2
needs reframing (the real question is convergence between AG-UI transport and A2UI's declarative format —
they already interoperate: `agui-standards-landscape.md` line 1304 correctly shows AG-UI rendering A2UI).

Sources: [Google Developers Blog — Introducing A2UI](https://developers.googleblog.com/introducing-a2ui-an-open-project-for-agent-driven-interfaces/),
[a2ui.org](https://a2ui.org/), [google/A2UI on GitHub](https://github.com/google/A2UI).

### A4. EU AI Act dates superseded by the Digital Omnibus 🔴 P1 (15 files)

The **AI Act simplification package (Digital Omnibus) received final Council approval on 29 June 2026**:
- High-risk obligations for stand-alone **Annex III** systems: deferred **2 Aug 2026 → 2 Dec 2027**
- High-risk AI embedded in **Annex I** regulated products: deferred **2 Aug 2027 → 2 Aug 2028**
- **Article 50 transparency** obligations largely **remain on the original schedule** — do not blanket-change every Aug 2026 date.

Files anchored on the old 2 Aug 2026 high-risk framing (each needs review, not mechanical replace):

1. `docs/ai-foundations/agentic_ai_landing_zone_eu_ai_act.md` (title itself says "August 2, 2026")
2. `docs/ai-foundations/agentic_ai_landing_zone_architecture.md`
3. `docs/ai-foundations/agentic_ai_landing_zone_business_layer.md`
4. `docs/ai-foundations/agentic_ai_landing_zone_visual_guide.md`
5. `docs/agentic-systems/platform/Enterprise_PromptOps_AWS_AgentCore_2026.md`
6. `docs/ai-development/aidlc/AIDLC_Enterprise_Framework_2025.md`
7. `docs/ai-development/testing/AI_Agent_Evaluation_Framework_Complete.md`
8. `docs/ai-protocols/auth/entra-3lo-agent-auth-multiagent-compliance.md`
9. `docs/ai-protocols/auth/entra-3lo-agent-auth-security-review.md`
10. `docs/ai-protocols/standards/AI_Protocols_Standards_Service_Industry_Guide_2026.md`
11. `docs/ai-security-governance/policy/Vol5b_Compliance_Governance_Decision_Framework.md`
12. `docs/ai-security-governance/security/06-Operating-Model-Maturity-Roadmap.md`
13. `docs/ai-security-governance/security/07-Zero-to-Mastery-Curriculum.md`
14. `docs/ai-security-governance/security/08-Architects-Field-Guide.md`
15. `docs/ai-usecases/EU_Banking_AI_Evaluation_Compliance_Guide.md`

Sources: [Consilium press release (7 May 2026 agreement)](https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/),
[Gibson Dunn — EU AI Act Omnibus Agreement](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/),
[Covington — Timeline Relief](https://www.insideprivacy.com/artificial-intelligence/eu-ai-act-update-timeline-relief-targeted-simplification-and-new-prohibitions/).

### A5. Verified correct (no action)

- **A2A v1.0** under Linux Foundation (signed Agent Cards, 150+ orgs) — repo's 21 "A2A v1.0" references check out. "A2A v2.0" mentions are clearly framed as future speculation. ([LF press](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year))
- **ACP merged into A2A** (Aug 2025), spec archived — consistent across new series.
- **MCP donated to Linux Foundation / Agentic AI Foundation (AAIF)** — consistently reflected.
- **AP2** (Google, 60+ partners, mandate signing), **UCP** (Google + NRF, Jan 2026), **LMOS** (Eclipse), **W3C DID v1.0**, **x402** — all consistent with primary sources.
- `enterprise-agent-runtime-internals-2026.md` uses an explicit evidence-classification scheme ([DOCUMENTED]/[EVIDENCE]/[INFERRED]/[SPECULATIVE]) — good practice; headline platform claims (AgentCore GA, Azure AI Foundry Agent Service, Vertex AI Agent Engine) are correct. Spot-checked only; [INFERRED]/[SPECULATIVE] sections are self-flagged.

---

## B. Duplication Register

### B1. Byte-identical full-content duplicates (only front-matter tags differ) 🔴

| # | File | Copies | Notes |
|---|------|--------|-------|
| 1 | `AI_Cost_Implementation_Guide_2026.md` | `docs/ai-economics/` + `docs/enterprise-architecture/strategy/` | **Both copies are modified in the current working tree** — fork-drift risk is already materializing |
| 2 | `EA_Lifecycle_Artifact_Templates_2026.md` | `docs/ai-development/aidlc/` + `docs/enterprise-architecture/process/` | 1-word drift already present |
| 3 | `02-skill-anatomy-and-metadata-schema.md` | `docs/agentic-systems/skill/coding/` + `docs/agentic-systems/skill/enterprise/` | Identical body, different series front-matter |
| 4 | `eu-bank-ai-copilot-complete.md` (ai-usecases) ≡ `eu-bank-ai-copilot-platform.md` (workflow-orchestration) | 2 sections | Bodies identical except one stray ``` line |

**Rule going forward:** one canonical home per doc; the second location gets a sidebar link to the canonical
doc (Docusaurus supports referencing the same doc id from multiple sidebar categories) — never a file copy.

### B2. Topic-level duplication clusters (consolidation candidates)

| Cluster | Files | Assessment |
|---------|-------|------------|
| **Quantum zero-to-mastery** | `quantum/Quantum_AI_Zero_to_Mastery.md` (4,950w) + `quantum/zero-to-mastery.md` (5,296w) | Same scope, restructured twice; keep the newer `zero-to-mastery.md`, archive the other |
| **Agent evaluation** | `ai-development/testing/AI_Agent_Evaluation_Framework_Complete.md` + `..._Guide.md` + `Agent_Testing_Monitoring_Evaluation.md`; plus `agentic-ui/evaluation-framework.md`, `ai-foundations/agentic_ai_landing_zone_evaluation.md`, `ai-usecases/EU_Banking_AI_Agent_Evaluation_Framework.md` + `EU_Banking_AI_Evaluation_Compliance_Guide.md`, `knowledge-engineering/industry-practices/evaluation.md` | 8 docs cover evaluation; the "Complete" vs "Guide" pair in testing/ is a direct overlap — merge into one canonical framework, keep the others as scoped views with cross-links |
| **AWS Strands/AgentCore accretion** | `AWS_Strands_AgentCore_AdvancedPatterns_v3.md`, `AWS_Strands_AgentCore_Delta_Supplement_v2.md`, `AWS_Strands_AgentCore_Builder_Journey_Kit.md`, `agentcore_strands_deep_research_report.md` | "v3" + "Delta v2" pattern = supersession never merged; fold deltas into base, archive superseded |
| **EA interview prep** | `ea/EA_Interview_Handbook.md` + `EA_Interview_Handbook_DELTA.md` (unmerged delta) + `EA_Interview_Master_Guide.md` + `EA_Interview_Vol3_CTO_AI.md` | Merge DELTA into Handbook; clarify Master Guide vs Handbook split |
| **CCAF / Anthropic cert** | `Anthropic_Partner_Cert_Study_Guide.md`, `CCAF_Study_Guide.md`, `CCAF_Advanced_Supplement.md`, `ccaf-exam-prep-complete.md`, `Module_7_Safety_Enterprise_Exam.md` | 5 overlapping exam-prep docs; `ccaf-exam-prep-complete.md` name claims completeness — make it canonical |
| **MCP deep dives** | `ai-protocols/mcp/MCP_Deep_Research_2026.md`, `coding-tools/claude/mcp-deep-guide.md`, `coding-tools/claude/Module_4_MCP.md`, `enterprise-architecture/ai-architecture/mcp-a2a-protocol-deep-dive.md` | 4 full MCP references; keep protocol home in `ai-protocols/mcp/`, scope the others (Claude-specific / EA-specific) and cross-link |
| **Executive communication** | `framework/Enterprise_AI_Architect_Communication_Guide.md`, `framework/Executive_Communication_Framework_Guide.md`, `specialization/EA_Business_Communication_Executive_Skills.md`, `framework/EA_Soft_Skills_Interview_Master_Guide.md`, `ea-masterclass/module-11`, `soft-skills/*` | 6+ homes for the same skill content |
| **Security & governance mega-overlap** | `ai-security-governance/deep-mind/` (18 parts), `ai-security-governance/security/` (12 files), `ai-security-governance/policy/` (12 vols), `cybersec-architect/` (15 parts), `agentic-ui/{security-architecture,governance,identity-auth}.md`, `workflow-orchestration/17-18`, `sovereign-constitutional-ai/` (13) | Agent identity, authorization, observability and AI-SOC are each written 4–6 times. Too big to merge in one pass — needs a canonical-topic map (see plan F4) |
| **Agent skills parallel series** | `skill/coding/` (12 parts) vs `skill/enterprise/` (11 parts) + `Agent_Skills_Complete_Playbook_2026.md` + `00-executive-summary...md` | ~7 chapters have same-topic twins (anatomy, lifecycle, MCP relationship, tool defs, observability, governance, dedup). Deliberate split (coding vs enterprise) but chapter 02 is literally the same file; Playbook duplicates both series |
| **EU bank copilot** | `ai-usecases/eu-bank-ai-copilot-{complete,architecture}.md`, `eu-bank-sequence-diagrams.md`, `workflow-orchestration/eu-bank-ai-copilot-platform.md` | See B1-#4; keep the case study in ai-usecases, link from workflow-orchestration |

---

## C. Outdated Topics (flagged)

| Item | Files | Why outdated |
|------|-------|--------------|
| EU AI Act 2 Aug 2026 high-risk framing | 15 files (list in A4) | Digital Omnibus (final 29 Jun 2026) deferred to 2 Dec 2027 / 2 Aug 2028 |
| NLIP "draft / TC-54" | 2 new protocol docs + Service Industry guide | Published Dec 2025 as ECMA-430–434 by TC56 |
| A2UI "proprietary" | `emerging-protocols-overview.md` | Apache 2.0 open project since Dec 2025 |
| Pre-2026 models cited as current (GPT-4o, Claude 3.5, Gemini 1.5, o1) | ~20+ files, concentrated in `cloud-platforms/ai-gateway/*` (all 5 docs), `agentic-ui/{performance,reliability,scalability}-engineering.md`, `agentic-ui/context-engineering.md`, AIDLC docs, `AI_Cost_Implementation_Guide_2026.md` | Model comparison tables and cost/token math anchored to superseded model generations; historical mentions are fine, "current model" tables are not |
| 2025-edition docs marked `status: current` | `AIDLC_Enterprise_Framework_2025.md`, `interview-prep/Agentic_AI_Platforms_Questionnaire_2025.md` | A 2025 framework doc marked current in a repo with 2026 companions (`Agile_in_the_Age_of_Agentic_AI_2026.md`, `AIDLC_Agile_CICD_AI_Transformation_2026.md`) — mark superseded or refresh |
| `workflow-orchestration/RESEARCH-STATUS.md` | 1 file | Program status/next-steps doc published in site nav; belongs in `_meta/` |
| 47 files with no front-matter date | across sections | Freshness cannot be tracked; violates repo date convention |

---

## D. Incomplete Topics

1. **Azure section is a stub** — `cloud-platforms/azure/index.md` is 57 words with zero content docs, while AWS has 10 deep docs. The new runtime-internals doc covers Azure internals but lives at the cloud-platforms root.
2. **No GCP section at all** — no `cloud-platforms/gcp/`; Vertex AI Agent Engine content exists only inside the new runtime doc.
3. **Broken PDF-conversion titles (~15 files)** — titles containing `**`, `~~strikethrough~~`, `<u>` or meaningless strings: e.g. `enterprise-architecture/strategy/Enterprise_AI_Strategic_Brief_2026.md` (title: "73% 54%"), `ai-development/aidlc/AIDLC_Agile_CICD_AI_Transformation_2026.md` (title: "Contents"), `EA_AIDLC_Deep_Research_2026.md`, `EA_Lifecycle_Artifact_Templates_2026.md` (both copies), `aws/AgentCore_Memory_Architecture_Guide.md`, `aws/AgentCore_Memory_Operations_DeepDive.md` (title is a section heading), `quantum/Quantum_AI_Consultancies_Report.md`, `framework/EA_Soft_Skills_Interview_Master_Guide.md` (title: "TABLE OF CONTENTS"), `interview-prep/ea/EA_Interview_Vol3_CTO_AI.md`, `strategy/EA_AI_First_Transformation_Transcript.md`.
4. **K8s handbook: all 16 parts share the identical title** "ENTERPRISE KUBERNETES MASTERY" — nav/search unusable; needs per-part titles.
5. **`ai-usecases/02–10` are all titled just "Case Study"** — 9 files indistinguishable in search/nav.
6. **Numbered series with holes/collisions:**
   - `ai-security-governance/security/`: `01,02,04–08` — **03 missing**; plus a second scheme `Part1,4,5,7` — Parts 2,3,6 missing.
   - `coding-tools/github-copilot/`: **two** Part01s, **two** Part04s, **two** Part11s; Parts 03, 05, 08–10, 12, 15, 17 absent — two interleaved series sharing one folder.
7. **Thin sections:** `agentic-systems/config/` (1 doc), `soft-skills/` (4 docs, index titled "Non-Tech"), `cloud-platforms/iac/` (terraform only).

---

## E. Missing Topics (fresh gap analysis)

Grounded against keyword probes of the corpus (mentions ≠ dedicated guide):

| Gap | Evidence | Priority |
|-----|----------|----------|
| **GCP agent stack guide** (Vertex AI Agent Engine/Builder, A2UI, Gemini Enterprise) | No `gcp/` section; only cross-cloud runtime doc | P1 |
| **Azure agent stack build-out** (Foundry Agent Service, Copilot Studio, Entra Agent ID) | 57-word stub index | P1 |
| **Computer-use / browser agents** (CUA patterns, RPA convergence, sandboxing) | 3 passing mentions repo-wide | P1 |
| **Voice / realtime agents** (speech-to-speech, realtime APIs, contact-center architecture) | 7 passing mentions, no guide | P2 |
| **Model customization decision framework** (prompting vs RAG vs fine-tuning/LoRA vs distillation) | 114 files mention fine-tuning; none is a decision guide | P1 |
| **Inference infrastructure & open-weight self-hosting** (vLLM, TensorRT-LLM, serving economics, sovereign hosting) | 34 scattered mentions | P2 |
| **SLM-first / edge agents** | 8 mentions; carried over from June audit, still open | P2 |
| **Sustainability / energy economics of agentic AI** | no dedicated doc | P3 |
| **AgentOps tooling landscape** (LangSmith, Langfuse, Arize, Braintrust, W&B Weave) as a vendor-selection guide | embedded fragments only | P2 |
| **Agent benchmark canon** (SWE-bench Verified, GAIA, tau-bench, OSWorld) as model/agent selection guidance | fragments inside eval docs | P3 |
| **Cross-vendor frontier-model tracker** (repo has `claude-models-2026.md` only) | Claude-only coverage | P3 |

Strong existing coverage (no action): harness & loop engineering, AIDLC, MCP/A2A, agent identity/auth,
agent memory, evaluation (over-covered — see B2), security/governance (over-covered), EA practice, FinOps/cost.

---

## F. Remediation Plan

### Phase 0 — Hygiene (this week, ~2h)
1. ✅ Previous analysis files → `archive/_meta-analysis-2026-06/` (done in this review).
2. Move `workflow-orchestration/RESEARCH-STATUS.md` → `_meta/`; remove from `sidebars.js`.
3. Commit the in-flight protocol series **after** Phase 1 corrections (don't publish known errors).

### Phase 1 — Grounding corrections 🔴 P1 (~1 day)
4. Fix NLIP across 3 files: TC54→TC56 everywhere; rewrite the NLIP status/probability narrative in `emerging-protocols-ucp-ap2-nlip-lmos.md` §NLIP and the overview matrices to reflect ECMA-430–434 + TR/113 (published 10 Dec 2025).
5. Fix AG-UI governance in `emerging-protocols-overview.md` (3 spots): "community/Agno" → "CopilotKit-governed, multi-vendor adoption".
6. Fix A2UI in `emerging-protocols-overview.md`: Apache 2.0 open project (Google + CopilotKit), not proprietary; reframe §5.2 fragmentation scenario.
7. EU AI Act: add a standard "Digital Omnibus (June 2026)" callout block and correct dates in the 15 files — preserving Article 50 transparency dates that did NOT move.

### Phase 2 — Deduplication (~2 days)
8. Kill the 4 byte-identical pairs (B1). Canonical homes (recommendation — confirm before executing):
   - `AI_Cost_Implementation_Guide_2026.md` → keep in **ai-economics** (strategy links to it)
   - `EA_Lifecycle_Artifact_Templates_2026.md` → keep in **enterprise-architecture/process**
   - `02-skill-anatomy...md` → keep in **skill/coding**, enterprise series links to it
   - EU bank copilot → keep in **ai-usecases**, workflow-orchestration links to it
   Reference the canonical doc id from both sidebar categories instead of copying files.
9. Merge delta/supersession sets: EA_Interview_Handbook+DELTA; AWS Strands v3+Delta v2; eval "Complete"+"Guide"; quantum zero-to-mastery pair. Superseded files → `archive/`.
10. Consolidate CCAF set around `ccaf-exam-prep-complete.md`.

### Phase 3 — Incomplete-content repair (~2 days)
11. Fix ~15 broken PDF-conversion titles; give the 16 K8s parts unique titles; retitle ai-usecases 02–10.
12. Add front-matter dates to the 47 undated files (use git history for date_created).
13. Resolve series numbering: security/ 03 + Part2/3/6; split or renumber the two interleaved github-copilot series.

### Phase 4 — New content (P1 gaps first, ~1–2 weeks)
14. Create `cloud-platforms/gcp/` (seed by extracting the GCP chapters of `enterprise-agent-runtime-internals-2026.md`); build out `azure/` the same way.
15. New guides in priority order: model customization decision framework → computer-use/browser agents → AgentOps tooling landscape → voice/realtime agents → inference/open-weight hosting → SLM/edge → sustainability.

### Phase 5 — Guardrails (prevent recurrence, ~half day)
16. Add a CI lint script: (a) front-matter `title`+`date` required; (b) title must not contain `**`, `~~`, `<u>`, or be "Contents"/"TABLE OF CONTENTS"; (c) fail on duplicate basenames outside `index.md`; (d) warn on byte-identical bodies.
17. Adopt the evidence-classification convention from `enterprise-agent-runtime-internals-2026.md` ([DOCUMENTED]/[EVIDENCE]/[INFERRED]/[SPECULATIVE]) as the standard for all research-report docs.
18. Quarterly freshness pass keyed on `last_reviewed` (EU AI Act omnibus proved 2-week-old facts can die).

---

*Review method: full-corpus inventory (titles, dates, word counts), duplicate-basename + md5 diffing,
targeted keyword probes for gaps, and web verification of load-bearing claims against primary sources
(Ecma, Linux Foundation, Google Developers Blog, CopilotKit, EU Council/law-firm analyses).*
