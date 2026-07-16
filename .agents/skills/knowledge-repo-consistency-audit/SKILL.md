---
name: knowledge-repo-consistency-audit
description: Retroactively audit and repair structural consistency across the ENTIRE existing docs/ corpus in one pass — not just staged/changed files. Use this after any bulk import or content-expansion pass (before calling it done), periodically as a drift check, or any time the user asks "how consistent is the repo right now" / "make the pages look consistent" / "audit the whole repo." Complements knowledge-repo-enforcement (which only ever sees staged files at commit time) and shares its check definitions with knowledge-page-authoring's lint_page.py via consistency_checks.py, so "consistent" means the same thing whether a page is being checked one at a time at authoring time or in bulk here.
model: sonnet
date_created: 2026-07-11
status: current
---

# Knowledge Repo Consistency Audit

Three scripts, each doing one clearly-scoped job. Run them in this order.

## 1. See where things stand

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/audit_corpus.py --min-severity MEDIUM --out /tmp/audit.md
```

Scans every `docs/**/*.md` file against the same checks `knowledge-page-authoring`'s linter runs on one file at a time (H1 count/match, heading-hierarchy skips, tag presence/richness, raw HTML leakage, collapsed tables) and produces a Markdown report: severity totals, most-common issue types, and per-file findings. Exit code is non-zero if any CRITICAL/HIGH issue exists — safe to use as a CI gate on a schedule (see `knowledge-repo-enforcement`'s CI workflow).

Use `--min-severity HIGH` for a quick "anything actually broken" pass, or the default `LOW` for the full picture including advisory-only findings.

## 2. Check and repair sidebar/navigation integrity

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/check_sidebar_integrity.py          # detect only
python3 ${CLAUDE_SKILL_DIR}/scripts/check_sidebar_integrity.py --fix    # auto-resolve unambiguous cases
```

Diffs every doc ID referenced in `sidebars.js` against every file that actually exists in `docs/`, in both directions (broken references, and orphaned files nothing points to). Docusaurus does **not** hard-fail the build on this — it silently drops bad sidebar entries — so this is the only thing that actually catches it. `--fix` only ever rewrites `sidebars.js` (never renames files on disk) and only for references with exactly one unambiguous on-disk match by normalized filename; anything with multiple candidates is reported for a human decision, not guessed at. Always `git diff sidebars.js` after `--fix` and rebuild before committing.

## 3. Apply safe structural fixes

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/autofix_structural.py --all --dry-run   # preview
python3 ${CLAUDE_SKILL_DIR}/scripts/autofix_structural.py --all            # apply
```

Currently fixes exactly one thing: demotes every H1 after the first to H2 (correctly skipping fenced code blocks, so a Python comment starting with `#` never gets touched). This is the only finding type mechanical enough to fix without judgment — a second H1 in a single page is wrong regardless of content. Everything else `audit_corpus.py` finds (thin tags, raw HTML, collapsed tables, heading skips) needs a human or an authoring pass to fix correctly; don't extend this script to guess at those.

## What this skill does NOT do

It doesn't decide *what* a page's content should say, doesn't merge duplicate pages (that's `knowledge-repo-cleanup`), and doesn't gate individual commits (that's `knowledge-repo-enforcement`, which now also calls `check_sidebar_integrity.py` — see its `SKILL.md`). This skill's job is specifically: **find out how consistent the corpus is right now, in bulk, and fix the parts that are safe to fix without a human decision.**

## After running all three

Re-run `audit_corpus.py` and compare the "Clean:" count to before — that's your actual before/after evidence, not a guess. Anything still flagged is either a genuine content decision (thin tags need real topic knowledge to fill in well) or an ambiguous sidebar collision that needs a person to pick which file is canonical.
