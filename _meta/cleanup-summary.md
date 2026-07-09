---
title: "Cleanup Summary — restructure/dedup-2026-07"
date_created: 2026-07-09
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["_meta"]
---

# Cleanup Summary — restructure/dedup-2026-07

Branch: `restructure/dedup-2026-07`
Completed: 2026-07-09

---

## Before / After

| Metric | Before | After |
|--------|--------|-------|
| Files in inventory | 479 | — |
| Markdown files (`docs/`) | 216 | 228 (+12 conversions committed) |
| PDF files (`docs/`) | 242 | 227 (15 archived) |
| DOCX files (`docs/`) | 17 | 17 |
| PPTX files (`docs/`) | 4 | 4 |
| Files archived | 0 | 15 source files + 15 `.meta.md` sidecars |
| Files with standard frontmatter | ~120 estimated | 507 |

---

## Phase Outcomes

### Phase 0 — Inventory
- 479 files catalogued (`_meta/inventory.json`)
- Corpus text extracted for all files, including 263 PDF/DOCX/PPTX files (`_meta/corpus.json`)

### Phase 1 — Duplicate Detection
- 329 duplicate pairs detected (`_meta/duplicate-pairs.csv`)
- 22 clusters formed: 8 near-duplicate (≥0.85 similarity), 14 heavy-overlap (0.60–0.85)
- Cluster analysis and keeper recommendations written to `_meta/duplicate-clusters.md`

### Phase 2 — PDF → Markdown Conversion
11 keeper PDFs converted to Markdown with provenance frontmatter:

| Source PDF | Converted MD |
|---|---|
| `eu-bank-ai-copilot-complete.pdf` | `ai-usecases/eu-bank-ai-copilot-complete.md` |
| `EY_AI_Architect_Interview_Guide_1.pdf` | `interview-prep/EY_AI_Architect_Interview_Guide_1.md` |
| `AI_Native_Architecture_Evolution_Report.pdf` | `ai-foundations/AI_Native_Architecture_Evolution_Report.md` |
| `APEX_EA_Final.pdf` | `enterprise-architecture/specialization/APEX_EA_Final.md` |
| `AgentIdentity_Research_2026.pdf` (via MD) | `ai-protocols/auth/agent-identity-entra-vs-awsagentcore.md` |
| `ai-platform-factory-runbook-v2.pdf` | `agentic-systems/platform/ai-platform-factory-runbook-v2.md` |
| `ai-msf-requirements-runbook.pdf` | `agentic-systems/platform/ai-msf-requirements-runbook.md` |
| `CEO_Agent_Solution_Blueprint.pdf` | `ai-usecases/CEO_Agent_Solution_Blueprint.md` |
| `Mental_Model_Encyclopedia.pdf` | `ai-usecases/Mental_Model_Encyclopedia.md` |
| `bedrock-agentcore-code-interpreter-architecture.pdf` | `cloud-platforms/aws/bedrock-agentcore-code-interpreter-architecture.md` |
| `AI Agent Evaluation Framework...pdf` | `ai-development/testing/AI_Agent_Evaluation_Framework_Guide.md` |

### Phase 3 — Merge & Retire

**12 clusters archived** (non-keepers moved to `archive/`):

| Cluster | Archived | Keeper |
|---|---|---|
| 001 | `eu-bank-ai-copilot-research.pdf` | `eu-bank-ai-copilot-complete.pdf` + MD |
| 002 | `EY_AI_Architect_Interview_Guide.pdf` | `EY_AI_Architect_Interview_Guide_1.pdf` + MD |
| 003 | `knowledge-engineering/data/AI_Native_Architecture_Evolution_Report.pdf` | `ai-foundations/AI_Native_Architecture_Evolution_Report.pdf` + MD |
| 004 | `MCP_Deep_Research_2026.md.pdf` | `MCP_Deep_Research_2026.md` |
| 005 | `EntraID_3LO_Agent_Auth_Research.pdf`, `EntraID_3LO_Agent_Auth_Volume3.pdf` | Vol.1 + Vol.3 MDs |
| 006 | `EntraID_3LO_Agent_Auth_Volume2.pdf` | `entra-3lo-agent-auth-implementation.md` |
| 007 | `TOGAF10_APEX_AI_Platform_NexaBank.pdf`, `TOGAF10_APEX_CloudNative_GlobalCorp.pdf`, `TOGAF10_APEX_v4_PeerReviewed.pdf` | `APEX_EA_Final.pdf` + MD |
| 008 | `AgentIdentity_Research_2026.pdf` | `agent-identity-entra-vs-awsagentcore.md` |
| 009 | `Part2_Tool_Authentication.pdf` | `tool-authentication-connectors.md` |
| 010 | `EntraID_3LO_Agent_Auth_Volume4.pdf` | `entra-3lo-agent-auth-security-review.md` |
| 012 | `Module_2_Claude_API_SDK.pdf` | `claude-api-mastery.md` |
| 017 | `AI Agent Evaluation Framework — AWS Bedrock AgentCore...pdf` | `AI_Agent_Evaluation_Framework_Guide.md` |

**10 clusters flagged for human review** (related-but-distinct, not merged):
clusters 011, 013, 014, 015, 016, 018, 019, 020, 021, 022 — see `_meta/merge-log.md` for details.

### Phase 4 — Frontmatter & Taxonomy

- **507 files** standardized with full frontmatter schema (`title`, `date_created`, `last_reviewed`, `status`, `supersedes`, `source_type`, `source_file`, `tags`)
- `sidebars.js` audited; cybersec-architect section verified correct

### Phase 5 — Root Housekeeping

- `duplicate-content-pairs.csv` moved from repo root → `_meta/duplicate-pairs.csv`
- `append_questions.py` moved from repo root → `_internal/scripts/append_questions.py`
- `docusaurus.config.js` updated to exclude `_meta/` and `archive/` from docs build

### Phase 6 — Validation

- `npm run build` passes ✅
- 251 missing sidebar IDs diagnosed and fixed: Docusaurus strips numeric prefixes from doc IDs (`01-evolution.md` → ID `evolution`); Phase 4 had incorrectly added those prefixes to `sidebars.js`
- Remaining build warnings: broken anchors to numbered headings (`#9-conditional-access-mfa-enforcement` etc.) — pre-existing, set to `warn` in config, non-blocking

---

## Items Requiring Human Decision Before Merging to Main

1. **cluster_007 (APEX_EA_Final.md)**: Review that the converted MD captures the NexaBank and GlobalCorp scenario data from the three archived TOGAF PDFs.
2. **cluster_012 (claude-api-mastery.md)**: PDF module had ~240 unique tokens including SDK code examples. Verify the MD covers all SDK patterns from Module 2.
3. **cluster_017 (AI_Agent_Evaluation_Framework_Guide.md)**: Archived PDF had AWS-specific AgentCore/Strands/Arize Phoenix content. Reviewer should expand the MD with those sections.
4. **cluster_014 (quantum section)**: Algorithm picked `quantum/index.md` as cluster keeper — this is a nav page. The three quantum PDFs (Consultancies/Startups/TechGiants) cover different market segments; no archiving was done. Verify the quantum section navigation is correct.
5. **10 flagged clusters**: All noted in `_meta/merge-log.md` as related-but-distinct. No action required unless the reviewer decides they should be consolidated.
6. **Broken anchor warnings**: ~30 anchors pointing to numbered headings that don't match generated slugs. Low priority — fix by updating the anchor targets or removing the number prefix from the headings.

---

## Branch Handoff Checklist

- [x] Build passes (`npm run build`)
- [x] All 22 duplicate clusters resolved or flagged
- [x] 15 non-keeper files archived with `.meta.md` sidecars
- [x] 11 PDFs converted to Markdown
- [x] 507 files with standardized frontmatter
- [x] `_meta/` and `archive/` excluded from Docusaurus build
- [x] `sidebars.js` doc IDs verified against actual files
- [ ] Human review items above (before merging to `main`)
- [ ] Do NOT merge to `main` until reviewer signs off
