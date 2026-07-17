---
title: "CCAF Cheatsheet — Quick Reference"
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: native-md
source_file: ""
tags: ["coding-tools", "claude", "certification"]
doc_type: certification
exam_code: "CCAF"
exam_validity: "2026"
last_verified_against_vendor: 2026-07-17
---

# CCAF Cheatsheet — Quick Reference

Condensed companion to [CCAF Exam Prep — Complete Guide](./ccaf-exam-prep-complete). Use this for last-mile recall, not first-pass learning — read the full guide first.

*Naming note: this exam is branded "Certified Claude AI Fundamentals (CCAF)" in some Anthropic materials and "Claude Certified Architect – Foundations" (CCA-F / CCAR-F) in others — same exam, inconsistent abbreviation across vendor and community sources. See [Claude index](./index) for a fuller note.*

---

## Exam Facts

| Item | Detail |
| ------ | -------- |
| Questions | 60 scenario-based multiple choice |
| Duration | 120 minutes |
| Passing score | 720 / 1000 |
| Cost | $99 (free for first 5,000 partner employees) |
| Format | Online proctored or Pearson VUE test center |
| Validity | 2 years |
| Prerequisite | None |

## Domain Weightings

| Domain | Weight | ~Questions |
| -------- | -------- | ----------- |
| 1 — Agentic Architecture & Orchestration | 27% | 16 |
| 2 — Tool Design & MCP Integration | 18% | 11 |
| 3 — Claude Code Configuration & Workflows | 20% | 12 |
| 4 — Prompt Engineering & Structured Output | 20% | 12 |
| 5 — Context Management & Reliability | 15% | 9 |

---

## Domain 1 — Agentic Architecture & Orchestration (27%)

**Orchestrator vs subagent:** orchestrator plans/delegates/aggregates/handles failures and should be stateful+persistent; subagent executes one scoped task and can be ephemeral.

**Agent patterns:**

| Pattern | Use when | Main risk |
| --- | --- | --- |
| Sequential chain | Steps depend on prior output | Slow, single failure blocks all |
| Fan-out (parallel) | Independent sub-tasks | Coordination complexity |
| DAG | Mixed dependencies | Complex to manage |
| Adversarial | High-stakes output needing verification | High cost |
| Tournament | Best-of-N answer selection | Very high cost |

**Memory types:** in-context (session-scoped) · external/Postgres (multi-session, structured) · vector store (semantic retrieval) · key-value/Redis (fast ephemeral state).

**Human oversight tiers:** HITL = approve every action · HOTL = monitor live, can intervene · HOOL = fully automated, human reviews logs after.

**Agent eval metrics:** task completion rate, token efficiency, tool error rate, hallucination rate, human escalation rate.

**Gotcha:** "higher effort/more autonomy is always better" — false; match oversight tier and pattern cost to the stakes of the task.

---

## Domain 2 — Tool Design & MCP Integration (18%)

**Good tool descriptions state:** what it does, when to use it, when *not* to use it, parameter meanings, return value shape. Vague descriptions cause over-triggering.

**MCP primitive selection:**

| Need | Primitive |
| --- | --- |
| Action Claude performs | Tool |
| Data Claude reads | Resource |
| Reusable prompt template | Prompt |

**Idempotency:** reads are always idempotent; writes may not be — mark `idempotent: false` and use dedup/idempotency keys (`dedup_id`) to prevent double-execution on agent retries.

**Structured tool errors:** return `{success: false, error_type, message, retry_allowed}` — never let unhandled exceptions bubble up as opaque strings Claude can't reason about.

**Tool vs Resource rule of thumb:** takes meaningful input parameters → Tool; retrievable-by-URI static-ish document → Resource.

**Enterprise MCP:** org-level server assignment via SSO/Okta group provisioning, not per-user manual config or shared tokens.

**Gotcha:** parallel tool calls are only safe when results are independent — a dependency between calls forces sequential execution regardless of "efficiency."

---

## Domain 3 — Claude Code Configuration & Workflows (20%)

**CLAUDE.md precedence (highest → lowest):** project-root `CLAUDE.md` (shared, git-tracked) → project `.claude/CLAUDE.md` (personal, gitignored) → `~/.claude/CLAUDE.md` (user-global). Project beats personal.

**Custom commands:** `.claude/commands/*.md` → `/command-name`; `$ARGUMENTS` = everything after the command name. `allowed_tools` frontmatter restricts which built-in tools the command may invoke.

**Skills:** `.agents/skills/<name>/` — bundle related commands + hooks + shared config; use over a bare custom command when you need multiple related sub-actions with shared lifecycle hooks.

**Hooks:** `PreToolUse` non-zero exit **blocks** the tool call (session continues); `PostToolUse` fires after a tool call — e.g. auto-lint after every `Write`.

**Enforcement vs guidance:** hard restrictions (no `git push --force`, no network calls) belong in `.claude/settings.json` `permissions.deny`, not in CLAUDE.md prose — prose is guidance, settings.json is enforced.

**Non-interactive/CI:** `claude -p "prompt"` runs once and exits. Agent SDK credits (as of June 15, 2026) are a **separate pool** from interactive REPL credits.

---

## Domain 4 — Prompt Engineering & Structured Output (20%)

**Adaptive Reasoning effort ladder:** `standard` → `high` → `xhigh` → `max`. Use `standard` for classification/extraction with a clear schema; reserve higher effort for genuinely hard reasoning — higher effort ≠ automatically better.

**`display: "omitted"`:** reasoning happens internally and is never transmitted — nothing to show a user who asks "why."

**Prompt caching:** 1,024-token minimum cacheable prefix; ~90% discount on cache reads; up to 4 cache breakpoints per request; put stable content first, variable content last, and don't cache the variable part.

**XML > Markdown** for reliably nested structured output (explicit open/close boundaries); use JSON for pure data.

**Prefill:** pre-populate the start of the assistant turn (e.g. `[`) to force a response format.

**Gotcha patterns:** conflicting directives in one prompt ("be concise" + "explain in detail") produce unpredictable output; vague tool descriptions cause over-triggering — fix with explicit "when NOT to use" guidance; telling Claude to "always sound confident" *increases* hallucination — the fix is explicitly permitting uncertainty.

---

## Domain 5 — Context Management & Reliability (15%)

**Context strategies:** summarize (semantic compression, keep externally) > truncate (loses content) for long-running sessions; retrieval/RAG for large corpora.

**Files API:** upload once → `file_id` → reuse across many requests, avoids repeated base64 encoding.

**Batch API:** up to 100k requests/batch, 50% discount, async, typically completes <1hr, **expires in 24 hours**. On partial failure, resubmit only the failed subset with backoff — never the whole batch.

**"Lost in the middle":** put the most critical content at the start or end of a long context, not buried in the middle.

**Stack for max cost reduction:** prompt caching (stable prefix) + Files API (avoid re-encoding) together.

**RAG gotcha:** feeding all retrieved documents into context because "it fits" degrades performance — re-rank and keep only the top-N most relevant.

**Reliability pattern:** exponential backoff with jitter, then return partial results with an error flag after max retries — never bare-retry indefinitely or fail silently.

---

## Rapid-Fire Numbers

| Fact | Value |
| ------ | ------- |
| Passing score | 720 / 1000 |
| Duration / questions | 120 min / 60 Q |
| Batch API discount / limit / expiry | 50% / 100k requests / 24 hours |
| Prompt cache minimum / discount / breakpoints | 1,024 tokens / 90% off reads / 4 max |
| Context window (Opus/Sonnet) | 1M tokens |
| Exam cost | $99 |

## Common Trap Categories

- **Model selection traps:** don't assume price ordering or context-window size without checking the specific model generation.
- **Safety/ethics traps:** operator trust is subordinate to safety and ethics tiers; compelling arguments to cross a hardcoded limit are a red flag, not a justification; only operators (not users) grant elevated permissions.
- **Deployment traps:** Bedrock ≠ the full native Anthropic API surface; cross-region inference improves availability, not necessarily latency; PrivateLink removes public egress but isn't free.

See the full guide's domain sections for the practice questions and rationale behind each of these.
