# doc_type Backfill — Completed 2026-07-10

## Status: COMPLETE

All 243 markdown files under docs/ now have `doc_type` in their frontmatter.
The pre-commit hook is installed at `.githooks/pre-commit` and validated.

## Summary

| doc_type | Files |
|---|---|
| guide | 150 |
| multi-part-series | 36 |
| interview-questions | 9 |
| engagement-case-study | 6 |
| workshop-transcript | 6 |
| research-report | 4 |
| certification | 2 |
| framework-reference | 1 |
| **Previously had doc_type** | **28** |
| **Total** | **242** |

## Commits (batch backfill)

- `a5aa03e` — batch 1/5: agentic-systems, agentic-ui, ai-development, ai-economics, ai-foundations (47 files)
- `b0c951c` — batch 2/5: ai-protocols, ai-security-governance, ai-usecases, cloud-platforms, coding-tools (41 files)
- `8470186` — batch 3/5: cybersec-architect, ea-masterclass (52 files)
- `cd8f82d` — batch 4/5: enterprise-architecture, interview-prep, knowledge-engineering (44 files)
- `53d47dc` — batch 5/5: quantum, soft-skills, sovereign-constitutional-ai, workflow-orchestration, misc (30 files)

## Known remaining lint issues (non-blocking for now)

Some files have content-level issues the linter flags but that are out of scope
for the frontmatter backfill:

- **Word count too high** — Many comprehensive guide pages exceed 4000 words.
  These should either be reclassified as `research-report` over time or split
  into multi-part series. See the linter output per file for specifics.
- **Missing required headings** — workshop-transcript files need: audience,
  related, scenario, participants. Some ea-masterclass transcripts may be
  missing some of these.
- **Empty extra fields** — Inferrable fields (exam_code, industry,
  protagonist_role, etc.) left empty where content was not explicit enough
  to safely infer a value. Fill these in as the relevant pages are edited.

These will surface naturally when the pre-commit hook fires on future edits.
