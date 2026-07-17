---
title: "CCDV-F Cheatsheet — Quick Reference"
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: native-md
source_file: ""
tags: ["coding-tools", "claude", "certification"]
doc_type: certification
exam_code: "CCDV-F"
exam_validity: "2 years"
last_verified_against_vendor: 2026-07-17
---
# CCDV-F Cheatsheet — Quick Reference

Condensed companion to `ccdv-f-exam-prep-complete.md`. High-value recall material only — no full practice questions here; use the complete guide for scenario practice and rationale.

---

## Exam Facts

| Item | Detail |
| ------ | -------- |
| Questions | 53 multiple-choice / multiple-response |
| Duration | 120 minutes |
| Passing score | 720 / 1000 (scaled, criterion-referenced) |
| Cost | $125 USD per attempt |
| Format | Pearson VUE, online proctored or test center |
| Validity | 2 years (inferred — unconfirmed against an official source) |
| Prerequisite | None mandatory; recommended 1–5 yrs SWE + 6+ months hands-on Claude/LLM |
| Retakes | 14 / 30 / 90 day waits after fail 1 / 2 / 3; max 4 attempts per rolling 12 months |

*Compiled from Pearson VUE's Anthropic certification listing and independent sources; verify against Anthropic's official candidate handbook before your exam date.* **Validity note:** community sources for this new exam report 12 months, but that figure traces to unverifiable SEO-oriented sites citing one another rather than an official source — 2 years is used here as an inference matching the Foundations-tier pattern elsewhere in this program. The retake-wait figures above are corroborated directly on pearsonvue.com.

---

## Domain Weightings

| Domain | Weight | ~Questions |
| ------ | ------ | ----------- |
| 1 — Applications and Integration | 33.1% | 18 |
| 2 — Model Selection and Optimization | 16.8% | 9 |
| 3 — Agents and Workflows | 14.7% | 8 |
| 4 — Prompt and Context Engineering | 11.0% | 6 |
| 5 — Tools and MCPs | 10.6% | 6 |
| 6 — Security and Safety | 8.1% | 4 |
| 7 — Claude Code | 3.1% | 2 |
| 8 — Eval, Testing, and Debugging | 2.6% | 1–2 |

---

## Domain 1 — Applications and Integration (33.1%)

**Key terms**: `stop_reason` (`end_turn`, `max_tokens`, `stop_sequence`, `tool_use`, `refusal`), Batch API, Files API, prompt caching, Bedrock/Vertex third-party deployment, `custom_id`, session hygiene.

- Pin exact model versions in production — never a `-latest` alias.
- `max_tokens` stop_reason = truncated output, not complete. `refusal` = not billed.
- Batch API: up to 100K requests/batch, 50% discount, 24h expiry, most finish <1h, use `custom_id` to re-associate results.
- Files API: upload once → `file_id`, eliminates repeated base64 encoding; stacks with prompt caching.
- Streaming (`stream=True`) fixes *perceived* latency (first token ~100–150ms), not total generation time.
- Error codes: `401`/`403` = fix credentials/access, don't retry. `429`/`500`/`529` = retryable, exponential backoff + jitter.
- Bedrock/Vertex: same Messages API shape; auth, billing account, model-ID format, and region availability differ.
- Prompts, CLAUDE.md, settings.json, tool schemas = versioned production config, same review/rollback discipline as code.

**Decision table — real-time vs. batch vs. streaming**

| Need | Use |
| --- | --- |
| User-facing, low latency | Standard sync Messages API |
| Perceived latency (chat UX) | `stream=True` |
| High volume, latency-tolerant | Batch API |
| Same large doc across many calls | Files API + prompt caching |

**Gotchas**: `max_tokens` stop reason ≠ complete response. Hardcoded API keys in git = compromised immediately (private repo doesn't help). Batch API is about cost/volume, not speed. Aliased model versions break reproducibility.

---

## Domain 2 — Model Selection and Optimization (16.8%)

**Key terms**: tokens, context window, sampling (`temperature`/`top_p`), non-determinism, next-token generation, adaptive reasoning effort (`standard`/`high`/`xhigh`/`max`), `display: "omitted"`, tokenizer migration impact, model routing.

**Model family quick table**

| Model | Context | Max Output | Thinking | Best For |
| --- | --- | --- | --- | --- |
| Fable 5 | 1M | 128K | Always on | Frontier reasoning, >200K docs |
| Sonnet 5 | 1M | 128K | On by default | Agentic automation, cost-balanced default |
| Opus 4.8 | 200K | 16K | Optional | Deep reasoning within 200K |
| Sonnet 4.6 | 200K | 16K | Optional | Proven production baseline |
| Haiku 4.5 | 200K | 16K | Not supported | Classification, extraction, high volume |

- Even at `temperature=0`, exact reproducibility is not guaranteed (infra-level nondeterminism).
- Effort scale: `standard` → `high` → `xhigh` → `max`. No `ultra` level — common distractor.
- Thinking tokens billed as output tokens. `display: "omitted"` = nothing transmitted, ever — not retrievable later.
- Sonnet 5 / Fable 5 new tokenizer ≈ 30% more tokens for same text vs. Claude 4.x — re-baseline cost/`max_tokens` on migration.
- `usage.cache_read_input_tokens > 0` in the *response* confirms an actual cache hit (not just that `cache_control` was set in the request).
- Cost routing: cheap/fast model for high-volume well-defined sub-tasks (classification, fan-out workers); stronger model reserved for the step needing real judgment.

**Gotchas**: extended thinking adds cost/latency with zero benefit for deterministic extraction/classification tasks — don't over-apply it. A model version bump is a breaking change to test, not a silent swap.

---

## Domain 3 — Agents and Workflows (14.7%)

**Key terms**: workflow vs. agent, orchestrator/manager, subagent, context isolation, hooks (deterministic enforcement), Agent SDK, Managed Agents, memory (in-context vs. external/durable), fan-out, DAG, sequential chain, adversarial verification.

**Workflow vs. agent — decision signal**

| Signal | Workflow | Agent |
| --- | --- | --- |
| Steps/order known in advance | Yes | No |
| Needs runtime adaptation | No | Yes |
| Predictability critical | Yes | Lower priority |

**Build-path decision**

| Path | When |
| --- | --- |
| Agent SDK | Need production scaffolding, control over data/infra |
| Managed Agents | Standard tools, no DevOps capacity, want REST API |
| Custom loop on raw Messages API | Max control, own all scaffolding |

- Subagents isolate context: only the final result crosses back to the orchestrator, not the full exploration transcript.
- Hooks (`PreToolUse` etc.) enforce behavior deterministically in code — stronger guarantee than a system-prompt instruction, which the model could still deviate from.
- In-context memory dies with the session/process; only external durable state (Postgres/Redis) survives a crash/restart.
- Third-party frameworks to recognize by name: Strands, LangGraph, PydanticAI (recognition-level only, not deep implementation).

**Gotchas**: "agent" ≠ always the right answer — a fixed, non-adaptive sequence should be a workflow, not an agent, even if it's multi-step. A system-prompt instruction is not an enforcement mechanism.

---

## Domain 4 — Prompt and Context Engineering (11.0%)

**Key terms**: context drift, context bloat, tool output pruning, compaction, context isolation, system vs. user placement, few-shot, output constraints, XML tags, prefill, input sanitization, defensive parsing, parse/validate/retry loop.

- Context drift/bloat: unpruned raw tool output accumulating in context dilutes earlier instructions — fix via pruning + periodic compaction/summarization, not just a bigger context window.
- Stable, task-invariant instructions → system prompt (also makes them cache-eligible). Variable per-request content → user turn (never cache the variable tail).
- XML tags > Markdown for demarcating nested/mixed structured content — explicit open/close boundaries.
- Prefill (pre-populating the assistant turn, e.g. with `{`) forces a specific output format.
- Untrusted external content (web pages, uploaded docs, tool output) must be clearly demarcated as data, never merged with trusted instructions — core prompt injection defense.
- Structured output needs a parse → validate → retry loop (feed the parse error back on retry), plus semantic validation beyond "does it parse."

**Gotchas**: conflicting directives in one system prompt ("be concise" + "explain in detail") produce unpredictable output — audit for contradictions. A bigger context window doesn't fix dilution/drift, it just delays hitting the ceiling.

---

## Domain 5 — Tools and MCPs (10.6%)

**Key terms**: tool description quality, idempotency, idempotency key/`dedup_id`, structured tool errors, client-side vs. server-side tools, approval patterns, MCP primitives (Tool/Resource/Prompt), stdio, Streamable HTTP, OAuth 2.1/PKCE, stateless MCP core.

**MCP primitive selection**

| Use | Primitive |
| --- | --- |
| Action with side effects / meaningful input | Tool |
| Read-only data by URI, no side effects | Resource |
| Reusable parameterized message template | Prompt |

**Transport selection**

| Transport | Best for | Auth |
| --- | --- | --- |
| stdio | Local, per-dev, subprocess | OS-level |
| Streamable HTTP | Remote, multi-client, enterprise | OAuth 2.1/PKCE |

**Agentic customization decision**

| Approach | Best when |
| --- | --- |
| Built-in tool | Anthropic already ships it |
| Custom tool | Bespoke, single-app capability |
| MCP server | Reusable across multiple apps, independently maintained |
| Skill | Bundle commands/instructions/hooks, mainly Claude Code/Agent SDK |

- Read ops are inherently idempotent; write ops often aren't — use `dedup_id`/idempotency keys for retry-prone write tools.
- Unhandled exceptions in a tool → opaque error the model can't reason about. Always catch and return structured `{success, error_type, message, retry_allowed}`.
- Approval/HITL gate: required before any irreversible, high-cost, or externally visible tool call — not after, and not merely described in the docstring.

**Gotchas**: a tool description saying "read-only" is not enforcement — must be backed by an actual read-only credential/role. "Rename the tool" fixes over-triggering less reliably than rewriting the description's when/when-not guidance.

---

## Domain 6 — Security and Safety (8.1%)

**Key terms**: prompt injection, jailbreak defense, least privilege, PII handling, data leakage prevention, guardrail layering, secure-by-design, Claude Hooks, identity/secrets/key management, idempotency keys (cross-ref Domain 5).

- Untrusted content (user messages, retrieved docs) = data, never instructions. Demarcate clearly; don't rely on the model "choosing" to refuse an injected instruction for consequential decisions — enforce deterministically instead.
- Least privilege: provision only the tools/data scope the current task needs, not the maximum conceivable future need.
- Defense-in-depth: enforce sensitive constraints (e.g., read-only) at the credential/infrastructure level, not just in a tool description or system prompt.
- Secrets: environment variables or a secrets manager only. Never hardcoded, never in a code comment, never in git history (even a "private" repo).
- Hooks are the deterministic enforcement point for safety-critical rules — same mechanism as Domain 3, applied to blocking destructive actions.

**Gotchas**: "ask the user nicely not to inject" and "raise temperature" and "use a bigger model" are not injection defenses — none are enforceable controls. A more capable/instruction-following model can be *more* susceptible to a well-crafted injection, not less.

---

## Domain 7 — Claude Code (3.1%)

**Key terms**: Rules, Skills, Commands, Agents, Agent Memory, `settings.json` permissions/hooks, `CLAUDE.md` hierarchy, headless mode (`claude -p`), streaming mode, auto-mode, repository initialization.

**CLAUDE.md precedence (highest → lowest)**: project-root `CLAUDE.md` (team-shared, git-tracked) → personal project-level (gitignored) → user-global `~/.claude/CLAUDE.md`.

- Team-wide enforced rules (e.g., block `git push --force`) belong in project `.claude/settings.json` `permissions.deny`, checked into git — not in personal config or a README.
- `claude -p "prompt"` = non-interactive/headless mode for CI/CD and scripting; runs once and exits.
- Hooks (`PreToolUse`, `PostToolUse`, `Stop`, `Notification`) configured in `settings.json` — same system referenced in Domains 3 and 6.

**Gotchas**: personal config never overrides project-root `CLAUDE.md` — team conventions win by design.

---

## Domain 8 — Eval, Testing, and Debugging (2.6%)

**Key terms**: trace analysis, error type identification, recovery strategy selection, failure-origin isolation (integration layer vs. model output).

- First diagnostic question on any failure: is the fault in your code (integration layer — bad prompt template, broken tool, parsing bug) or in the model's actual output (reasoning error on well-formed input)? These need different fixes.
- Trace the full message/tool-call/tool-result sequence for a failing run before guessing — don't jump straight to rewriting the system prompt or swapping models.
- Match recovery strategy to error class: malformed JSON → parse/validate/retry loop. Transient `429`/`529` → backoff/retry. Semantically-wrong-but-valid JSON → not a retry problem, needs schema/prompt tightening plus content-level validation.

**Gotchas**: valid-JSON-but-wrong-content errors won't be caught by a parse-failure retry loop — that's a different error class requiring semantic validation.

---

## Rapid-Fire Numbers

| Fact | Value |
| ------ | ------- |
| Questions / duration | 53 / 120 min |
| Passing score | 720 / 1000 |
| Cost | $125 |
| Validity | 2 years (inferred) |
| Batch API | 100K req max, 50% off, 24h expiry |
| Prompt cache | 1,024 token min prefix, ~90% read discount, 5 min TTL, 4 breakpoints max |
| Effort levels | standard → high → xhigh → max |
| Tokenizer shift (Sonnet 5 / Fable 5) | ~30% more tokens vs. Claude 4.x |
| Context: Fable 5 / Sonnet 5 | 1M tokens |
| Context: Opus 4.8 / Sonnet 4.6 / Haiku 4.5 | 200K tokens |
| MCP primitives | Tool, Resource, Prompt |
| MCP transports | stdio, Streamable HTTP |
