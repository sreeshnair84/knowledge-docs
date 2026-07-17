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
3. Merges a `PostToolUse` hook into `.claude/settings.json` (via
   `install_claude_hook.py`) that runs `lint_page.py` immediately after
   Claude writes or edits any `docs/**/*.md` file — see "Three enforcement
   layers" below. Idempotent; safe to re-run.

Then commit the new/changed paths — the CI workflow only takes effect once
it's committed and pushed, and `.claude/settings.json` only protects
teammates who pull it; that's what actually protects the repo regardless of
anyone's local git config.

## Three enforcement layers

This installs three layers, from earliest to latest in the authoring
lifecycle:

1. **Write-time hook** (`.claude/settings.json` `PostToolUse`, this skill's
   `install_claude_hook.py` + `knowledge-page-authoring`'s
   `post_write_lint_hook.py`) — runs `lint_page.py` on a `docs/**/*.md`
   file the instant Claude writes or edits it, feeding failures back into
   the same turn. This is the fix for the specific failure mode where an
   agent gets every type-specific frontmatter field right but forgets
   `doc_type` itself, and it isn't discovered until several files and a
   `git commit` later. Session-local to Claude Code — only active in a
   session that has loaded that hook config (open `/hooks` once after
   installing, or start a fresh session).
2. **Pre-commit hook** (`.githooks/pre-commit`) — re-runs the same
   structural lint on every staged file, plus the near-duplicate check
   (below), plus sidebar integrity. Blocks the commit if not. Protects
   anyone committing from a machine with the hook installed, regardless of
   whether they used any authoring skill or a write-time hook was even
   configured.
3. **CI workflow** (`.github/workflows/knowledge-repo-checks.yml`) —
   re-runs the same two checks against every pull request's changed files.
   The only layer that can't be bypassed by `--no-verify`, a missing local
   hook, or a fresh clone that never ran the installer.

## What the checks cover

1. **Structure/frontmatter lint** (`lint_page.py`) — every checked markdown
   file must have complete universal frontmatter and a valid `doc_type`,
   and must match its declared type's required sections. Blocks (layers 1
   and 2) or fails CI (layer 3) if not.
2. **Near-duplicate check** (`check_against_corpus.py`, ≥85% threshold) —
   pre-commit and CI only, and only on newly *added* files, not edits to
   existing ones. Blocks the commit/PR if a new page is a near-duplicate of
   something already in the repo. Not run by the write-time hook — a full
   corpus scan is too slow to run on every keystroke-adjacent `Write`/`Edit`,
   so this stays a commit/PR-time check.

Both checks were validated against this repo's real content before
packaging: a file missing required frontmatter was correctly blocked, a
near-duplicate copy of existing auth content was correctly blocked (100%
and 91% matches against two existing files), and a genuinely original file
passed cleanly. The write-time hook was validated the same way against a
real page that had shipped with every certification-specific frontmatter
field present except `doc_type` — it caught and reported exactly that gap.

## What the CI workflow adds beyond the local hooks

Both local hooks only protect actions taken on a machine that has them
installed (and, for the pre-commit hook, `core.hooksPath` configured) — a
fresh clone, a different contributor, or `git commit --no-verify` all
bypass them. The GitHub Actions workflow re-runs the same two checks
against every pull request's changed files, so it catches anything that
slips past both local layers. Treat the write-time hook as the earliest
feedback loop, the pre-commit hook as the fast local backstop, and CI as
the actual guarantee.

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
