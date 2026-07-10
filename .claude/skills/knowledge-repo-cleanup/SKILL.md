---
title: "Knowledge Repo Cleanup"
date_created: 2026-07-09
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["skills", "knowledge-repo-cleanup"]
---

# Knowledge Repo Cleanup

Multi-phase cleanup of a knowledge-base repo where the same content has been
re-authored across multiple markdown pages, PDFs, DOCX, and PPTX files instead
of a single file being updated. Full phase detail is in
[references/playbook.md](references/playbook.md) — read it before starting
Phase 0. This file covers orientation, resumability, and model guidance.

## Always do this first

1. Run `python3 ${CLAUDE_SKILL_DIR}/scripts/progress.py status` to see phase
   states. If it says "No tracker yet", the file doesn't exist — run
   `python3 ${CLAUDE_SKILL_DIR}/scripts/progress.py init` first (confirm with
   the user before doing so on the very first run).
2. Run `python3 ${CLAUDE_SKILL_DIR}/scripts/progress.py next` to get the exact
   next task — a phase to start, or the next pending item in a phase's queue.
3. Tell the user what you found ("Phase 2 is 34/242 files converted, resuming
   from `docs/ai-protocols/auth/Part5_Marketplace_Architecture.pdf`") before
   doing anything else. Never restate completed phases as if they still need
   doing, and never re-derive "what's done" from your own memory or by
   re-scanning the repo — the tracker is the single source of truth, because
   your own context resets every session and this job doesn't.

## The phases (detail in references/playbook.md)

| # | Phase | Touches | Model |
|---|---|---|---|
| 0 | Inventory | every file, read-only | sonnet |
| 1 | Duplicate/overlap detection | run `scripts/find_duplicates.py` | **opus** |
| 2 | PDF/DOCX/PPTX → Markdown conversion | per-file, queued | sonnet |
| 3 | Merge & retire duplicates | per-cluster, queued | **opus** |
| 4 | Frontmatter & taxonomy standardization | per-file, queued | sonnet |
| 5 | Root-level housekeeping | small, one-shot | sonnet |
| 6 | Validation & handoff | build + link check | sonnet |

Never skip a phase or jump ahead of what `progress.py next` reports, even if
a later phase looks more urgent — Phase 3 merges depend on Phase 1's cluster
analysis being complete and reviewed, and Phase 4's frontmatter pass assumes
Phase 3's retirements already happened.

## Model guidance

This repo's cleanup has two different kinds of work, and they don't want the
same model:

- **Mechanical, high-volume work** (Phases 0, 2, 4, 5, 6 — extracting text,
  drafting conversions, applying a frontmatter template, moving files) is
  well-suited to **Sonnet**. It's fast and cheap, and the work is
  well-specified enough that Sonnet's judgment is sufficient. This is the
  skill's default model.
- **Judgment-heavy work** (Phase 1 — deciding which file in a cluster is the
  keeper and what's genuinely unique in the others; Phase 3 — actually
  performing the merges without losing content or introducing
  contradictions) benefits from **Opus**. Before starting Phase 1 or Phase 3,
  tell the user you're switching and run `/model opus`; switch back with
  `/model sonnet` once that phase's queue is empty. If the user has Opus
  access constraints, `opusplan` (`/model opusplan`) is a reasonable
  middle ground — it uses Opus to decide the merge plan and Sonnet to
  execute it.
- Don't use Haiku for any part of this job — merge and taxonomy decisions
  need real judgment, and the volume here (450+ files) isn't so large that
  Haiku's speed advantage outweighs the accuracy cost.

## Working in resumable batches (usage-limit protocol)

This job is too big for one session or one usage-limit window. Treat every
work session as a batch, not an attempt to finish everything:

1. Pick a batch size you can comfortably finish and verify in one sitting —
   as a starting point, ~15-20 files for Phase 2 or Phase 4, or 2-3 clusters
   for Phase 3. Don't try to clear an entire phase's queue in one go.
2. After each file or cluster is actually done (converted/merged/retagged
   AND the source file archived or removed per the playbook's rules), mark
   it immediately: `python3 ${CLAUDE_SKILL_DIR}/scripts/progress.py mark
   --phase <n> --item <path-or-cluster-id> --status done`. Don't batch up
   tracker updates for the end — if the session is cut off mid-batch, only
   already-marked items should count as done.
3. Periodically check remaining budget (the user can run `/usage`). When
   it's getting low, stop cleanly at a batch boundary rather than partway
   through a file: finish or fully back out the current item, update the
   tracker, commit, and tell the user exactly what's done and what
   `progress.py next` will return in the following session.
4. Commit after every batch (`git add -A && git commit`), not just at the
   end of a phase. The commit and the tracker file are what makes this
   survivable across a session ending unexpectedly — don't rely on
   `claude --resume` alone to preserve state, since that restores
   conversation, not a guarantee that in-progress file edits were finished
   or committed.
5. At the start of a new session, this skill's Phase-0-first instruction
   handles resumption automatically — the user doesn't need to re-explain
   where things left off.

## Guardrails (apply in every phase)

- Work only on the `restructure/dedup-2026-07` branch (or whatever branch
  name the user confirms) — never commit this cleanup directly to main.
- Never hard-delete a source file. Archive it under `/archive/<original-
  relative-path>/` with `status: archived` frontmatter instead.
- Never edit a PDF/DOCX/PPTX's content directly. If something in one needs
  correcting, the correction happens in its Markdown replacement.
- If two files' relationship is ambiguous (related-but-distinct vs. true
  duplicate), don't merge automatically — list them in the phase's report
  for human review instead. See references/playbook.md's per-phase output
  files for where that goes.
