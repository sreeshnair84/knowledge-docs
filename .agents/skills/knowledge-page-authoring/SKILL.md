---
name: knowledge-page-authoring
description: Enforce consistent structure, depth of research, and formatting when adding or editing any page in this knowledge-docs repo. Covers all document types actually present in this workspace — guides, certification/exam prep, interview question banks, engagement case studies (industry-vertical deep dives), narrative/dramatized case studies, workshop transcripts, research reports, framework/methodology references, and multi-part volume series. Use this any time the user is writing a new page, converting a source document, reviewing an existing page for consistency, or asking "what should this page look like" / "is this page formatted right" / "does this duplicate something." Always run the linter and the duplicate-check script before treating a page as finished.
model: sonnet
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
source_type: converted-pdf
covers_version: "N/A"
last_reviewed: 2026-07-10
---

# Knowledge Page Authoring

This repo has nine distinct content types, each with its own real structural
pattern already established somewhere in the repo — the goal is to make new
and edited pages match the *best* existing example of their type, not
reinvent structure per page (which is how the original inconsistency
happened).

## Step 1 — Identify the document type

Infer from context (folder, what the user is converting, what the user asks
for) before asking. Only ask if genuinely ambiguous. The nine types, and
which reference file governs each:

| Type | Real example in this repo | Reference |
|---|---|---|
| Guide | `coding-tools/claude/claude-api-mastery.md` | [references/guide.md](references/guide.md) |
| Certification / exam prep | `coding-tools/claude/ccaf-exam-prep-complete.md` | [references/certification.md](references/certification.md) |
| Interview question bank | `interview-prep/EA_Senior_Interview_Questions.md` | [references/interview-questions.md](references/interview-questions.md) |
| Engagement case study (industry-vertical deep dive) | `ai-usecases/01_aviation.pdf` | [references/engagement-case-study.md](references/engagement-case-study.md) |
| Narrative case study (dramatized, named protagonist) | `ai-usecases/Case_01_Meridian_Fraud_Investigation_Agents.pdf` | [references/narrative-case-study.md](references/narrative-case-study.md) |
| Workshop / advisory transcript | `ea-masterclass/transcripts/bank-discovery-workshop.md` | [references/workshop-transcript.md](references/workshop-transcript.md) |
| Research report | `ai-protocols/mcp/MCP_Deep_Research_2026.md` | [references/research-report.md](references/research-report.md) |
| Framework / methodology reference | `enterprise-architecture/framework/TOGAF10_APEX*.pdf` | [references/framework-reference.md](references/framework-reference.md) |
| Multi-part / volume series | `enterprise-architecture/architectural-review-board/Volume*.pdf`, `ai-protocols/auth/EntraID_3LO_Agent_Auth_Volume*.pdf` | [references/multi-part-series.md](references/multi-part-series.md) |

Read only the one reference file that matches — don't load all nine.

**Engagement case study vs. narrative case study — don't conflate these.**
They cover similar subject matter but are structurally different: engagement
case studies are clinical/documentary (numbered sections, Discovery
Transcript as one sub-section among many, ends in Production Incident);
narrative case studies are dramatized (Cast of Characters, told through one
protagonist's perspective, "transcript-style account" as the whole
document's voice). If the user's source material doesn't clearly indicate
which, ask.

## Step 2 — Universal frontmatter (every page, every type)

```yaml
---
title: "Exact page title"
date_created: YYYY-MM-DD
last_reviewed: YYYY-MM-DD
status: current        # current | superseded | archived
supersedes: ""
source_type: native-md  # native-md | converted-pdf | converted-docx | converted-pptx
source_file: ""
doc_type: guide          # one of the nine types in the table above — lets tooling (lint_page.py, CI) check structure without a human specifying --type each time
tags: []
---
```
Do not use the legacy `parent:` / `nav_order:` fields still present on some
older pages — those are Jekyll-era and superseded by Docusaurus sidebar
config. If you're editing an old page that still has them, replace them with
the schema above as part of the edit rather than leaving both.

Type-specific additional frontmatter fields are listed in each reference
file — add those on top of the universal block, don't replace it.

## Step 3 — Universal formatting rules (every page, every type)

- Never embed a PDF via `<iframe>`. If source material is a PDF, convert it
  (see the `knowledge-repo-cleanup` skill's Phase 2 approach) — the markdown
  page is canonical, not a viewer wrapper.
- Tables as real Markdown tables. Code as fenced blocks with a language tag.
  Diagrams/screenshots extracted to `static/img/<topic>/`, referenced with
  standard `![]()`, never re-embedded as a PDF.
- One H1 per page, matching `title`. Use H2 for the reference file's
  required top-level sections, H3 below that.

## Step 4 — Before finishing: lint and duplicate-check

Always run both before telling the user a page is done:

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/lint_page.py <path-to-page.md> --type <type>
python3 ${CLAUDE_SKILL_DIR}/scripts/check_against_corpus.py <path-to-page.md>
```

`lint_page.py` checks frontmatter completeness, required section headings
for the declared type, absence of `<iframe>`, and word count against the
type's expected depth range (see the reference file). Fix everything it
flags before considering the page done.

`check_against_corpus.py` compares the new/edited page's content against
every existing file under `docs/` and reports anything above 35% similarity.
This is the direct fix for how this repo got duplicated in the first place —
**never skip this step for new content**, even content that feels obviously
original. If it flags a match:
- ≥85% — stop, this is very likely already covered; point the user to the
  existing page instead of publishing a near-duplicate.
- 60–85% — tell the user what it overlaps with and ask whether this should
  be a new section on the existing page instead of a new page.
- 35–60% — mention it, proceed if the user confirms it's genuinely distinct.

If `_meta/corpus.json` doesn't exist yet (the `knowledge-repo-cleanup`
skill's Phase 0 builds it), `check_against_corpus.py` will build a
lightweight version itself from `docs/` on first run — this can take a
minute on the full repo.

## Step 5 — Depth of research

Each reference file has a concrete rubric (word count range, minimum number
of sourced claims, minimum dialogue turns, etc.) — these are calibrated to
the strongest existing example of that type in the repo, not arbitrary.
"Depth of research" is enforced by that rubric plus one more check that
doesn't fit in the linter: every non-obvious factual claim (numbers,
version-specific technical claims, named product capabilities) should be
attributable to something — either cited inline (research reports,
framework references) or clearly framed as illustrative/fictional (narrative
case studies, workshop transcripts use fictional company names on purpose —
keep it that way, don't imply real client data).
