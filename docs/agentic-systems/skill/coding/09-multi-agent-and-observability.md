---
title: "Multi-Agent Skills & Observability"
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
series_part: 9
series_total: 12
series_index: "agentic-systems/skill/coding/index"
---
# Part 13 — Multi-Agent Skills & Part 14 — Logging and Tracing (+ Deliverable 9)

## PART A: Multi-Agent Architectures in Coding Workflows

### 13.1 The emerging role taxonomy

| Role | Function | Observed examples |
| --- | --- | --- |
| **Planner** | Decomposes a large task into subtasks, sequences work across other agents | Codex CLI's subagent orchestration; Warp's multi-agent parallel dispatch |
| **Research Agent** | Gathers external context (docs, web, related code) before implementation begins | Codex's "search the web for up-to-date information" pattern; a dedicated research pass ahead of coding |
| **Coding Agent** | Implements the actual change | The default role most tools optimize for by default |
| **Testing Agent** | Generates/extends tests, independent of the implementation agent, to avoid the same blind spots | Explicitly recommended pattern: "get your code reviewed by a separate Codex agent" generalizes to "get your code *tested* by a separate agent" |
| **Review Agent** | Independent code review before merge, distinct from the implementing agent | Codex's dedicated review-agent pattern; CodeRabbit/Greptile as fully separate review-focused products |
| **Documentation Agent** | Generates/updates docs alongside a code change | Less commonly a fully separate agent role; often folded into the coding agent's own output-format requirement |
| **Security Agent** | Scans for vulnerabilities, reviews auth/secrets handling | Specialist verticals (Snyk DeepCode AI, Semgrep Assistant) increasingly operate as attachable review agents rather than a role inside a general coding agent |
| **Refactoring Agent** | Large-scale, mechanical, cross-file transformations | Distinct from feature-coding because the safety bar (no behavior change) and validation strategy (broad regression testing) differ |
| **Deployment Agent** | Executes or gates the release process | Highest blast-radius role; should have the tightest approval-gate policy of any role in this list |

### 13.2 Orchestration patterns

```
(a) Sequential pipeline           (b) Parallel fan-out              (c) Supervisor/delegate
Planner → Coder → Tester           Planner → [Coder A, Coder B,       Orchestrator
  → Reviewer → (merge)                        Coder C in parallel]      ├─ delegates subtask 1
                                              → merge conflict            ├─ delegates subtask 2
                                                resolution                └─ delegates subtask 3
                                              (Replit Agent 4's                (Devin/GitHub Copilot
                                               parallel task forking            Workspace pattern —
                                               auto-resolves merge              isolated cloud VM per
                                               conflicts ~90% of the            long-running task)
                                               time, per vendor claims)
```

### 13.3 When to use multi-agent vs. a single agent with skills

- **Single agent + skills** is sufficient, and preferable, when the task is well-scoped and sequential — the added coordination overhead of multiple agents is not free (token cost, latency, potential for agents to disagree or duplicate work).
- **Multi-agent decomposition earns its cost** when (a) independent review genuinely benefits from a second, un-anchored perspective (testing/review agents deliberately kept separate from the implementer, for exactly the same reason human code review isn't done by the PR's own author), (b) subtasks are genuinely parallelizable across independent files/services, or (c) the task is long-running enough that background/async execution (Devin-style isolated VM) is warranted over an interactive session.
- **A supervisor pattern mirrors the enterprise Planner/Supervisor Skill pattern** (companion package file `07`) one layer up — here the delegation target is a separate *agent instance* (sometimes a different vendor's agent entirely, per the "let Claude Code talk to Codex and Gemini" pattern observed in community tooling) rather than a separate skill within one agent.

---

## PART B: Observability

### 14.1 Trace hierarchy for coding agents

```
Developer Request
   │
   ▼
Skill Selected ──── which skill, why (description match or explicit invocation)
   │
   ▼
Planning ──────────  decomposition, subtask list if multi-agent
   │
   ▼
Repository Search ── retrieval method (AST/semantic/grep), files retrieved
   │
   ▼
Tool Calls ────────  each file edit, terminal command, git operation
   │
   ▼
MCP Calls ─────────  external system calls (GitHub, Jira, DB, browser)
   │
   ▼
LLM Calls ─────────  model invocations, token usage, latency
   │
   ▼
Git ───────────────  commits, branches created
   │
   ▼
Terminal ──────────  commands run, exit codes
   │
   ▼
File Changes ──────  diff summary
   │
   ▼
Testing ───────────  suite run, pass/fail counts
   │
   ▼
Review ────────────  if a separate review agent/pass ran, its findings
   │
   ▼
Response ──────────  final summary/PR presented to the developer
   │
   ▼
Telemetry ─────────  everything above, emitted as structured spans
```

### 14.2 Tooling landscape

| Category | Examples | Notes for coding-agent use specifically |
| --- | --- | --- |
| Vendor-native session telemetry | Claude Code's own session logs/telemetry, VS Code Copilot's telemetry, GitHub's Copilot usage/audit telemetry | Best default for single-vendor shops; least effort to enable |
| OTel-based GenAI observability | Same `gen_ai.*` semantic conventions as the enterprise case (companion package file `08`) | Increasingly the right choice once more than one agent vendor is in use across a team, to get one unified view |
| Dedicated LLM-app observability | Langfuse, LangSmith, Phoenix | More common when a team has built *custom* agent tooling (e.g., an internal Codex-MCP-orchestrated pipeline) than when using off-the-shelf CLI/IDE agents directly |
| Session-replay / audit tools | Community tools (`claude-replay`, `session-dashboard`) that convert agent session logs into reviewable, shareable replays | A coding-agent-specific pattern with no strong enterprise-business-agent equivalent — useful for post-incident review and for onboarding developers to "how the agent actually worked through this" |
| CI-integrated telemetry | Test/lint/build results already flow through existing CI observability | The Validation lifecycle stage (file `03`) should feed the *same* dashboards a human-authored PR's CI run would, not a separate, siloed "AI metrics" view — this keeps agent-authored and human-authored work held to the same visible bar |

### 14.3 Deliverable 9 — Observability Architecture

```
┌───────────────────────────────────────────────────────────────┐
│  PER-SESSION TRACE (agent harness)                                │
│  Skill selection → Planning → Repo search → Tool/MCP/LLM calls →   │
│  Git/Terminal/File changes → Testing → Review → Response            │
└───────────────────────────────┬─────────────────────────────────┘
                                 ▼
┌───────────────────────────────────────────────────────────────┐
│  TELEMETRY EXPORT                                                    │
│  OTel GenAI spans (gen_ai.* attributes) OR vendor-native telemetry    │
│  → OTel Collector (if standardizing across multiple agent vendors)    │
└───────────────────────────────┬─────────────────────────────────┘
                                 ▼
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                          ▼
┌───────────────┐      ┌──────────────────┐       ┌──────────────────┐
│ CI/BUILD         │      │ DEVELOPER          │       │ SECURITY/AUDIT     │
│ DASHBOARDS         │      │ PRODUCTIVITY        │       │ TRAIL                │
│ (same pipeline as  │      │ ANALYTICS            │       │ (who ran what,       │
│  human-authored     │      │ (acceptance rate,    │       │  what tools/MCP       │
│  PRs — no separate  │      │  time-to-merge,       │       │  servers were used,   │
│  "AI-only" view)    │      │  regression rate)      │       │  approval-gate events) │
└───────────────────┘      └──────────────────┘       └──────────────────┘
```

The key design choice this architecture encodes: **agent-authored work should be observable through the same lens as human-authored work** (same CI dashboards, same PR review metrics) *plus* an additional agent-specific layer (skill/tool selection, MCP calls, approval-gate events) that has no human-workflow equivalent. Treating agent telemetry as a completely separate, siloed system tends to produce blind spots exactly where it matters most — at the moment an agent's output merges into the same codebase a human's would.
