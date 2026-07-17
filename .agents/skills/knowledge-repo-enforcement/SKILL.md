---
name: knowledge-repo-enforcement
description: Scaffold automated, ongoing enforcement of this repo's content standards — a git pre-commit hook plus a GitHub Actions check — so duplication and structural drift can't silently creep back in after the one-time knowledge-repo-cleanup migration. Use this when the user asks to set up pre-commit checks, CI checks, automated enforcement, or "make sure this doesn't happen again" for the knowledge-docs repo. This installs files into the target repo; it does not itself run on every commit (that's the installed hook's job, not this skill's).
model: sonnet
---

# Knowledge Repo Enforcement

The other three content skills (`knowledge-page-authoring`, `pdf-to-markdown`,
`knowledge-repo-intake`) all rely on someone actually invoking them. This
skill closes that gap: it installs a **git pre-commit hook** and a
**GitHub Actions workflow** that run the same checks automatically, whether
or not the person committing used any of those skills.

## Prerequisite

The `knowledge-page-authoring` skill must be installed at
`.agents/skills/knowledge-page-authoring/` in the target repo — both the
hook and the CI workflow call its `lint_page.py` and
`check_against_corpus.py` directly. If it isn't installed yet, install it
first.

## Install

```bash
bash ${CLAUDE_SKILL_DIR}/scripts/install.sh
```

Run this from anywhere inside the target repo. It:
1. Copies `pre-commit` to `.githooks/pre-commit` and runs
   `git config core.hooksPath .githooks` so git actually uses it.
2. Copies `knowledge-repo-checks.yml` to
   `.github/workflows/knowledge-repo-checks.yml`.

Then commit both new paths — the CI workflow only takes effect once it's
committed and pushed; that's what actually protects the repo regardless of
anyone's local git config.

## What the hook checks (on every commit touching `docs/**/*.md`)

1. **Structure/frontmatter lint** (`lint_page.py`) — every staged markdown
   file must have complete universal frontmatter and a valid `doc_type`,
   and must match its declared type's required sections. Blocks the commit
   if not.
2. **Near-duplicate check** (`check_against_corpus.py`, ≥85% threshold) —
   only on newly *added* files, not edits to existing ones. Blocks the
   commit if a new page is a near-duplicate of something already in the
   repo.

Both checks were validated against this repo's real content before
packaging: a file missing required frontmatter was correctly blocked, a
near-duplicate copy of existing auth content was correctly blocked (100%
and 91% matches against two existing files), and a genuinely original file
passed cleanly.

## What the CI workflow adds beyond the local hook

The local hook only protects commits made on a machine that has it
installed and `core.hooksPath` configured — a fresh clone, a different
contributor, or `git commit --no-verify` all bypass it. The GitHub Actions
workflow re-runs the same two checks against every pull request's changed
files, so it catches anything that slips past the local hook. Treat the
hook as the fast local feedback loop and CI as the actual guarantee.

## What this does NOT check

- It does not run the full `knowledge-repo-cleanup` pipeline — that's a
  one-time migration, not a per-commit check.
- It does not catch moderate overlap (40-85% similarity) automatically —
  that range often includes legitimately related-but-distinct content
  (case studies sharing a framework, etc.), so it's left for human/model
  review via the other skills rather than auto-blocked, to avoid the hook
  becoming noisy enough that people start reaching for `--no-verify`
  habitually.
- It does not check non-markdown files (PDFs, DOCX, PPTX) — the standing
  rule from the other skills is that new content should already be
  converted to Markdown before it's added, so there shouldn't be new
  binary source-of-truth files to check going forward.
