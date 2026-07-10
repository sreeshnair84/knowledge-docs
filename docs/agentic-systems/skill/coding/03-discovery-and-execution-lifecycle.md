---
title: "Skill Discovery & Execution Lifecycle"
date_created: 2026-06-01
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
doc_type: multi-part-series
tags: ["agentic-systems", "skill", "coding-tools", "research"]
covers_version: "as of mid-2026"
series_name: "Coding Assistant Skills Research"
series_part: 3
series_total: 12
series_index: "agentic-systems/skill/coding/index"
---
# Part 3 — Skill Discovery & Part 4 — Execution Lifecycle (+ Deliverable 2)

## PART A: Discovery

### 3.1 The discovery hierarchy

```
Built-in Skills          (shipped with the agent itself, e.g. OpenAI's curated
   │                       catalog: playwright, gh-fix-ci, cloudflare-deploy)
   ▼
Organization Skills       (org-wide catalog — "coming soon" on several platforms
   │                       as of mid-2026; today mostly simulated via a shared
   │                       git repo teams clone into their skills directory)
   ▼
Repository / Project      (.github/skills/, .claude/skills/, .codex/skills/,
   Skills                  .agents/skills/ — committed, code-reviewed, shared
   │                       via git with the whole team)
   ▼
User / Global Skills      (~/.copilot/skills/, ~/.claude/skills/,
   │                       ~/.codex/skills/, ~/.agents/skills/ — personal,
   │                       not committed, cross-project)
   ▼
Marketplace / Extension-  (community/vendor catalogs: Agensi, awesome-copilot,
   Provided Skills          ClawHub-equivalents, Codex plugin marketplace —
   │                        installed explicitly via a CLI installer)
   ▼
MCP-Discoverable Skills    (Google ADK-style dynamic registries — less common
                            in pure coding-assistant tooling today than in
                            enterprise agent platforms, but the same pattern
                            is emerging via `gh skill` search-and-install)
```

### 3.2 Lookup mechanisms

| Mechanism | How it works | Where observed |
|---|---|---|
| **Keyword/description matching** | Agent compares the user's request text against every loaded skill's `description` | Universal baseline mechanism across all SKILL.md-compatible tools |
| **Slash/explicit invocation** | User types `/skill-name` or `$skill-name`, bypassing matching entirely | Copilot (`/name`), Codex (`$name`), Claude Code (`/name`) |
| **Semantic/embedding search** | Registry-level search over skill descriptions for near-miss phrasing | `gh skill` search across GitHub-hosted skill repos; marketplace search (Agensi and similar) |
| **Provenance-based update checks** | Installed skill's frontmatter carries source repo/ref/tree-SHA; CLI checks upstream for changes | `gh skill update`, which reads its own previously-written provenance metadata |
| **Static registration** | Skills placed in a fixed directory, loaded at session start | Default behavior for local/project/personal skills in nearly every tool |
| **Dynamic/on-demand fetch** | Agent fetches a skill from a remote registry mid-session | Less common in pure coding tools than in enterprise platforms (Google ADK); Codex's `$skill-installer` is the closest coding-tool analogue, though it is typically a one-time install step, not a per-turn dynamic fetch |

### 3.3 Ranking and caching

- **Ranking** is largely implicit today (best-match-by-description), not yet a formalized quality-score-driven ranking system like the enterprise registries in the companion package — this is a maturity gap worth flagging for any org building internal tooling on top of these ecosystems.
- **Caching**: once loaded for a session, a skill's content typically stays resident for that session/conversation; most tools reload from disk on session restart rather than maintaining a long-lived server-side cache (consistent with the local-first, filesystem-based design of nearly every coding-assistant Skill implementation, in contrast to the server-hosted registries common in enterprise platforms).

---

## PART B: Execution Lifecycle (Deliverable 2)

### 4.1 Stage-by-stage flow

```
Developer Request
   │
   ▼
[1] Intent Detection ──────  Agent classifies what kind of task this is
   │                          (bug fix, feature, review, refactor, question).
   ▼
[2] Planning ───────────────  Agent decomposes into steps; decides whether
   │                          AGENTS.md context alone suffices or a Skill
   │                          is needed.
   ▼
[3] Skill Selection ────────  Match request against loaded skill descriptions;
   │                          load full SKILL.md (+ referenced files) on match.
   ▼
[4] Tool Selection ─────────  Within the skill's guidance (or, absent a
   │                          matching skill, the agent's own judgment),
   │                          pick specific tools: read_file, run_terminal,
   │                          git_diff, etc.
   ▼
[5] Repository Scan ────────  Retrieve relevant files via semantic index,
   │                          AST/tree-sitter navigation, grep/ripgrep, or
   │                          embeddings — NOT the whole repo dumped into
   │                          context (file `06`).
   ▼
[6] Context Collection ─────  Assemble: AGENTS.md + skill instructions +
   │                          retrieved files + repo docs (README, ADRs) +
   │                          prior conversation state.
   ▼
[7] Execution ───────────────  Tool calls actually run: edits written,
   │                          commands executed, typically inside a
   │                          sandbox/dev container (file `07`, `10`).
   ▼
[8] Validation ──────────────  Compile/build check, linter, test suite run —
   │                          "it compiles and the tests pass" as the modern
   │                          bar before claiming completion.
   ▼
[9] Response ────────────────  Diff/PR/summary presented to the developer,
   │                          following the skill's declared output format
   │                          if one exists.
   ▼
[10] Telemetry ───────────────  Spans emitted for every step above to the
                               observability plane (file `09`).
```

### 4.2 Sequence diagram — single-skill, single-tool happy path

```
Developer      Agent Harness      Skill Store      Repo Index      Sandbox        Telemetry
   │                │                  │                │              │              │
   │ "add tests"    │                  │                │              │              │
   │───────────────►│                  │                │              │              │
   │                │ match description│                │              │              │
   │                │─────────────────►│                │              │              │
   │                │◄─────────────────│ webapp-testing   │              │              │
   │                │   SKILL.md         │                │              │              │
   │                │  emit span: skill_selected ─────────────────────────────────────►│
   │                │                  │                │              │              │
   │                │ retrieve relevant files (semantic/AST search)      │              │
   │                │───────────────────────────────────►│              │              │
   │                │◄───────────────────────────────────│ file set      │              │
   │                │  emit span: repo_scan (files, method) ─────────────────────────────►│
   │                │                  │                │              │              │
   │                │ execute: write test file per skill's AAA pattern   │              │
   │                │────────────────────────────────────────────────────►│              │
   │                │  emit span: tool_call(write_file) ──────────────────────────────────►│
   │                │                  │                │              │              │
   │                │ execute: run test suite            │              │              │
   │                │────────────────────────────────────────────────────►│              │
   │                │◄────────────────────────────────────────────────────│ pass/fail     │
   │                │  emit span: validation(test_result) ────────────────────────────────►│
   │                │                  │                │              │              │
   │◄───────────────│ diff + summary   │                │              │              │
   │                │  emit span: response, session_summary ───────────────────────────────►│
```

### 4.3 Failure and multi-step paths

**A. Validation failure loop**
```
[8] Validation → tests fail
        │
        ▼
   Agent reads failure output, re-enters [7] Execution with a fix
        │
        ▼
   [8] Validation (attempt N+1) — bounded retry count; beyond the bound,
       agent reports the failure back to the developer rather than looping
       indefinitely (a directly observed anti-pattern is unbounded fix-retry
       loops burning tokens/time without escalating — file `12`)
```

**B. Skill-not-found / ambiguous match**
```
[3] Skill Selection: no skill's description clearly matches
        │
        ▼
   Fall back to AGENTS.md context + general model capability alone,
   OR ask a clarifying question if the ambiguity is consequential
   (destructive action, unclear scope)
```

**C. Cross-tool delegation (MCP-mediated)**
```
[4] Tool Selection determines the needed capability lives outside the
    built-in tool set (e.g., "check the related Jira ticket")
        │
        ▼
    MCP client connects to the relevant server → tool call →
    result folded into [6] Context Collection as if it were a local file
```

**D. Human approval gate**
Triggered for destructive or high-risk actions (force-push, `rm -rf`, deploying to production, auto-approving further tool calls) — the lifecycle pauses between [6] and [7]. This checkpoint is precisely what several documented CVEs (file `10`) attack: tricking the agent into silently modifying its own approval settings to skip this gate.

### 4.4 Deliverable 2 — the complete flow, one more time as a single artifact

```
Developer Request
   → Intent Detection → Planning → Skill Selection → Tool Selection
   → Repository Scan → Context Collection → [Human Approval Gate if high-risk]
   → Execution (in sandbox/dev container) → Validation (build/lint/test)
   → [loop back to Execution on failure, bounded] → Response → Telemetry
```
