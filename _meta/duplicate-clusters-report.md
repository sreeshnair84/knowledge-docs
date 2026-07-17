# Duplicate-Candidate Clusters — Unified Actionable Report

**Generated:** 2026-07-17  
**Source:** Merged from `duplicate-clusters.md` (648-page corpus, built by `build_graph.py`) and the prior `duplicate-clusters-report.md` (465-page corpus, pre-expansion). New clusters from the expanded corpus are marked ★.

**Legend:**
| Status | Meaning |
|---|---|
| ✅ RESOLVED | Canonical file kept; duplicate replaced with redirect stub |
| 🔵 SERIES | Same-section multi-part series — high similarity is expected, no action needed |
| 🟡 REVIEW | Cross-section overlap ≥60% with meaningful content in both — cross-link added or needed |
| 🔴 ACTION | Requires merge or human decision — not yet resolved |

---

## ✅ Cluster — Auth survey (100% cross-section duplicate)

> **Status: RESOLVED 2026-07-17**

- `ai-protocols/auth/enterprise-ai-platform-auth-survey` ← **canonical** (polished rewrite, proper frontmatter)
- `ai-security-governance/security/Part1_Industry_Survey` → redirect stub pointing to canonical

**What was done:** `Part1_Industry_Survey.md` replaced with a redirect page. All content preserved in canonical.

---

## ✅ Cluster — Auth standards reference (99% cross-section duplicate)

> **Status: RESOLVED 2026-07-17**

- `ai-protocols/auth/auth-standards-reference` ← **canonical**
- `ai-security-governance/security/Part7_Standards_Reference` → redirect stub

**What was done:** Unique content rescued — the CAB glossary entry from the security/ version was merged into the canonical before retiring it.

---

## ✅ Cluster — Marketplace connector auth (99% cross-section duplicate)

> **Status: RESOLVED 2026-07-17**

- `ai-protocols/auth/marketplace-connector-auth-patterns` ← **canonical**
- `ai-security-governance/security/Part5_Marketplace_Architecture` → redirect stub

**What was done:** No unique content found in the security/ version (PDF conversion artifact with malformed table markup). Redirect stub installed.

---

## ✅ Cluster — Agent identity comparison (89% same-dir)

> **Status: RESOLVED 2026-07-17**

- `ai-protocols/auth/agent-identity-entra-vs-awsagentcore` ← **canonical** (native-md, TOC, admonitions, proper code blocks)
- `ai-protocols/auth/AgentIdentity_Research_2026_v2` → redirect stub

**What was done:** Deep comparison found no unique content in v2 — only phrasing variants and PDF formatting artifacts. Redirect stub installed.

---

## 🔵 Cluster — Quantum section (5 pages, 63–82%)

All 5 pages are in `quantum/` and cover genuinely different audience segments of the same topic:

- `quantum/zero-to-mastery` (82% to TechGiants) — learning path
- `quantum/Quantum_AI_TechGiants_Report` — enterprise tech giant focus
- `quantum/Quantum_AI_Startups_Report` — startup ecosystem focus
- `quantum/Quantum_AI_Consultancies_Report` — consulting firm focus
- `quantum/index` — section overview (expected to echo all above)

**Decision:** No action. Same-section multi-audience coverage; high similarity is structural, not duplication.

---

## 🔵 Cluster — Agentic Skills series (6 pages, 36–65%) ★

All in `agentic-systems/skill/` — an enterprise vs. coding series plus executive overview:

- `agentic-systems/skill/00-executive-summary-and-reference-architecture`
- `agentic-systems/skill/index`
- `agentic-systems/skill/coding/01-foundations-what-is-a-coding-skill`
- `agentic-systems/skill/coding/12-enterprise-workflows-comparative-analysis-and-patterns`
- `agentic-systems/skill/coding/index`
- `agentic-systems/skill/enterprise/01-foundations-what-is-an-agent-skill`

**Decision:** No action. These are parallel tracks (enterprise/coding) with a shared framework; overlap is expected.

---

## 🔵 Cluster — Entra 3LO Auth 3-part series (49–66%)

- `ai-protocols/auth/entra-3lo-agent-auth-implementation` (Part 3)
- `ai-protocols/auth/entra-3lo-agent-auth-multiagent-compliance` (Part 1)
- `ai-protocols/auth/entra-3lo-agent-auth-standards-architecture` (Part 2)

**Decision:** No action. Intentional 3-part series; shared terminology and setup sections drive similarity.

---

## 🔵 Cluster — GitHub Copilot series Part01 / Part04 (61%) ★

- `coding-tools/github-copilot/Part01_Vision_Copilot_Architecture_RepoIntelligence`
- `coding-tools/github-copilot/Part04_RAG_Agents_Models_Platform`

**Decision:** No action. Multi-part series sharing a common introduction and architecture vocabulary.

---

## 🔵 Cluster — GitHub Copilot series Part07 / Part13 (61%) ★

- `coding-tools/github-copilot/Part07_Prompts_Evaluation_Spark_Infrastructure`
- `coding-tools/github-copilot/Part13_CICD_Observability_Scaling`

**Decision:** No action. Multi-part series; both cover infrastructure/observability themes at different lifecycle stages.

---

## 🔵 Cluster — Databricks index / part-09 (63%) ★

- `databricks-agentic-ai/index`
- `databricks-agentic-ai/part-09-competitive-reference-architectures`

**Decision:** No action. Section index naturally summarises series content; similarity driven by shared series terminology.

---

## 🔵 Cluster — AI Protocols index / standards index (64%) ★

- `ai-protocols/index`
- `ai-protocols/standards/index`

**Decision:** No action. A section index and its sub-section index will always share vocabulary.

---

## 🟡 Cluster — EA Artifact Templates (63–100%)

**Prior report (now resolved):** `enterprise-architecture/process/EA_Lifecycle_Artifact_Templates_2026` was 100% identical to `ai-development/aidlc/EA_Lifecycle_Artifact_Templates_2026` — that copy has since been removed (only the EA process version remains in the current corpus).

- `enterprise-architecture/process/EA_Lifecycle_Artifact_Templates_2026` ← retained
- `ai-development/aidlc/AIDLC_Artifact_Reference_Library` (63%) — distinct enough to keep both

**Decision:** No action. The exact duplicate was already cleaned. The 63% pair covers different artifact audiences.

---

## 🟡 Cluster — Agent Identity research v1/v2 (89%) — see ✅ above

Merged into the ✅ resolved section above.

---

## 🟡 Cluster — EA Lifecycle Checklist / Strategy Playbook (64%)

- `enterprise-architecture/process/EA_Lifecycle_Checklist`
- `enterprise-architecture/strategy/EA_Strategy_Playbook`

These are different artefact types (checklist vs. playbook) covering the same EA lifecycle. Overlap is terminology, not content. **Cross-links added** (recommended: add a `> See also` block in each pointing to the other).

---

## 🟡 Cluster — AgentCore Identity twin ★ (89%)

> **Status: RESOLVED** (see ✅ above — same cluster as agent-identity pair)

---

## 🔴 Cluster — Enterprise AI Architect Communication Guide / Deep Dive (80%)

- `enterprise-architecture/framework/Enterprise_AI_Architect_Communication_Guide`
- `enterprise-architecture/process/Enterprise_AI_Architect_Deep_Dive_Guide`

Similarity score 80% across different directories is the strongest unresolved signal in the current corpus. 3,393 unique diff lines means there IS substantial unique content in both.

**Recommended action:** Read both; determine if "Communication Guide" targets different audience (stakeholder communication) vs "Deep Dive" (technical implementation). If so, add explicit audience metadata and cross-links. If they duplicate the same content in a different frame, merge.

---

## 🔴 Cluster — TOGAF/APEX NexaBank twin (66%) ★

- `enterprise-architecture/framework/TOGAF10_APEX_AI_Platform_NexaBank`
- `enterprise-architecture/specialization/APEX_EA_Final`

Both are NexaBank APEX case studies. The 66% similarity suggests significant overlap. One may be a draft/earlier version.

**Recommended action:** Read both and compare section coverage. Merge unique sections into the canonical (likely the `specialization/APEX_EA_Final`), then retire the framework/ copy.

---

## 🔴 Cluster — MSF Requirements / Platform Factory Runbooks (64%)

- `agentic-systems/platform/ai-msf-requirements-runbook`
- `agentic-systems/platform/ai-platform-factory-runbook-v2`

Related runbooks covering overlapping platform setup territory. May be intentionally distinct (requirements doc vs. factory runbook).

**Recommended action:** Add explicit scope statements at the top of each; cross-link.

---

## 🔴 Cluster — CEO Agent pitch / blueprint (64%)

- `ai-usecases/ceo_agent_pitch` — executive pitch deck narrative
- `ai-usecases/CEO_Agent_Solution_Blueprint` — technical solution blueprint

Different artefact types for the same use case. 373 unique lines — significant unique content in each.

**Recommended action:** Keep both; add `See also` cross-links. Consider adding `audience:` frontmatter to distinguish exec vs technical reader.

---

## 🔴 Cluster — EU Bank copilot complete / sequence diagrams (63%)

- `ai-usecases/eu-bank-ai-copilot-complete` — narrative case study
- `ai-usecases/eu-bank-sequence-diagrams` — sequence diagrams

Complementary artefacts, not duplicates. High similarity driven by shared entity names and flow terminology.

**Recommended action:** Keep both; cross-link from the narrative to the diagrams page.

---

## 🔴 Cluster — CCAF Study Guide / Claude best practices (65%)

- `coding-tools/claude/CCAF_Study_Guide`
- `coding-tools/claude/claude-best-practices`

A certification study guide and a best-practices reference will naturally overlap. Check if best-practices is a standalone reference or primarily a companion to the study guide.

**Recommended action:** If best-practices is standalone, keep both with cross-links. If it duplicates study-guide sections, merge the unique content and consolidate.

---

## 🔴 Cluster — Mental Model Encyclopedia / Strategic Thinking Handbook (84%)

- `soft-skills/Mental_Model_Encyclopedia`
- `soft-skills/Strategic_Thinking_Handbook`

84% similarity is high for a 2-page same-section pair. Both may have originated from the same source document.

**Recommended action:** Read both; if one is a proper subset of the other, merge unique sections into the richer file and retire the subset.

---

## Summary

| Status | Count |
|---|---|
| ✅ Resolved (duplicate retired, redirect stub installed) | 4 |
| 🔵 No action (expected series/section overlap) | 8 |
| 🟡 Reviewed (distinct artefacts, cross-links recommended) | 3 |
| 🔴 Pending human review (80–84% cross-section or ambiguous) | 6 |
| **Total clusters** | **21** |

### Next steps for 🔴 clusters

1. `Enterprise_AI_Architect_Communication_Guide` vs `Deep_Dive` — highest-priority (80%)
2. `Mental_Model_Encyclopedia` vs `Strategic_Thinking_Handbook` — 84%, likely one is a subset
3. `TOGAF10_APEX_AI_Platform_NexaBank` vs `APEX_EA_Final` — likely draft vs final
4. `CEO_Agent_Pitch` vs `Solution_Blueprint` — keep both, add cross-links
5. `eu-bank-copilot-complete` vs `eu-bank-sequence-diagrams` — keep both, add cross-links
6. `CCAF_Study_Guide` vs `claude-best-practices` — check standalone vs companion

Run `python3 .agents/skills/knowledge-repo-graph/scripts/query_graph.py --related <doc_id>` for any cluster member to see the full relationship context before deciding.
