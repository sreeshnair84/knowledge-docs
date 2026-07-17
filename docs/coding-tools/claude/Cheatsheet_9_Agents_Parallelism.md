---
title: 'Claude Code Agents & Parallelism'
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: converted-html
source_file: 'Cheatsheet_9_Agents_Parallelism.html'
doc_type: guide
tags: [agents, parallelism, cheatsheet, coding-tools]
covers_version: "2026"
---

# Claude Code Agents & Parallelism

## ⚡ CLAUDE CODE AGENTS · PARALLELISM · COMPUTER USE

Subagents · Agent Teams · Git Worktrees · Background Agents · Task Tool · Computer Use · Model Routing

SUBAGENTS

AGENT TEAMS

WORKTREES

COMPUTER USE

⚖️ PARALLELISM DECISION MATRIX — Choose the Right Tool

Need | Subagents | Agent Teams | Worktrees | Background  
---|---|---|---|---  
Workers report to main | ✓ native | △ via lead | manual | ✓  
Workers talk to each other | ✗ isolated | ✓ native | ✗ manual | ✗  
Context window isolation | ✓ each own | ✓ each own | ✓ + branch | ✓  
Filesystem isolation | ✗ shared | ✗ shared* | ✓ own branch | ✗  
You keep working | ✗ blocks | ✗ blocks | ✓ separate | ✓ Ctrl+B  
Same-file edits safe | ✗ risky | ✗ risky | ✓ own branch | ✗  
Token cost | Low–Med | High (3-4×) | Med (per session) | Low–Med  
Experimental / flag needed | ✗ built-in | ✓ env flag | ✗ built-in | ✗ built-in  
  
* Agent Teams + worktrees = full isolation (recommended for large cross-layer refactors)

✓ Subagents: quick focused workers. Agent Teams: workers that debate + coordinate. Worktrees: branch isolation for safe parallelism.

🌲 GIT WORKTREES — Branch Isolation for Agents

Built-in CLI flag (Claude Code v2.1.50+)

## Start session in its own isolated worktree claude \--worktree # auto-named claude \--worktree bugfix-auth # named worktree claude \--worktree --tmux # own tmux session too # Manual setup (classic approach) git worktree add ../feature-a feature-branch-a git worktree add ../feature-b feature-branch-b # Run separate claude sessions in each dir

How Worktrees Solve the Conflict Problem

Without worktrees: Agent A + Agent B both edit src/auth.ts → overwrites, merge conflicts, corrupted context

With worktrees: each agent gets own branch + own directory → no conflicts at filesystem level

Worktree Lifecycle

Created at.claude/worktrees/[name]/ — isolated working directory

No changesWorktree + branch auto-removed when session ends

Has changesBranch persists — you review + merge manually

GitignoreAdd .claude/worktrees/ to .gitignore to keep clean

⚠ Subagents can also use worktrees — ask Claude: "use worktrees for its agents" for batched migrations

🤖 SUBAGENTS — Isolated Workers Within a Session

Built-in Subagents (Auto-invoked)

ExploreRead-only search + analysis. No writes. Delegates when codebase understanding needed without changes.

PlanResearch for planning in plan mode. Prevents infinite nesting (subagents can't spawn subagents).

general-purposeComplex multi-step: exploration + modification + reasoning. Default for mixed tasks.

Create Custom Subagents

## .claude/agents/code-reviewer.md \--- name: code-reviewer description: Expert code reviewer. Use proactively after code changes. model: sonnet # cheaper than opus tools: [Read, Grep, Glob, Bash] color: orange \--- You are a senior code reviewer. Focus on security, performance, and best practices. Return JSON: { file, line, severity, issue, fix } # User-level (all projects) ~/.claude/agents/debugger.md # Project-level (team shared) .claude/agents/debugger.md

Subagent Properties

ContextOwn isolated context window — doesn't share with parent

SpawningClaude invokes when task matches agent description — automatic or on request

No nestingSubagents cannot spawn other subagents — prevents infinite loops

ResultsReturn to main conversation — many detailed results can bloat context

InheritanceInherits parent CLAUDE.md context — picks up coding standards automatically

9-Parallel Code Review Pattern

## Run 9 specialist subagents simultaneously: 1. Linter + Static Analysis 2. Code Reviewer (top 5 by impact) 3. Security (injections, auth, secrets) 4. Quality + Style (complexity, duplication) 5. Performance (bottlenecks, O(n²)) 6. Test Coverage gaps 7. Dependency audit 8. Documentation completeness 9. Deduplication / reuse opportunities # All run in parallel → comprehensive review fast

Model Routing for Cost

## Route subagents to cheaper model export CLAUDE_CODE_SUBAGENT_MODEL="claude-sonnet-4-6" # Main session: Opus (complex reasoning) # Subagents: Sonnet (focused tasks) → saves $$$

👥 AGENT TEAMS — Multi-Session Collaboration (Experimental)

Enable + Activate

## Enable experimental flag export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 # Or in settings.json: { "agentTeams": true } # Verify echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS # Prompt Claude to form a team: "Create a team to refactor the payment module. Spawn 3 teammates: API layer, DB migrations, tests." # Force Opus (recommended for team lead) /model opus

Architecture

Team Lead (orchestrator) │ coordinates, assigns, synthesizes │ you interact directly here │ ├── Teammate A (own context window) │ own session, own branch (+ worktree) │ ↔ direct messaging to teammates │ ├── Teammate B (own context window) │ claims tasks from shared task list │ ↔ direct messaging │ └── Teammate C (own context window) reports findings, challenges others 

Subagents vs Agent Teams

SubagentsReport back in isolation. No inter-agent comms. Run within single session.

Agent TeamsTeammates message each other, share findings, challenge assumptions. Separate sessions.

Best Use Cases for Teams

  * Research + review — multiple teammates investigate different aspects, compare findings
  * Cross-layer work — frontend + backend + tests owned by different teammates
  * Competing hypotheses — debug: each teammate tests a different theory in parallel
  * Architectural debates — teammates argue different approaches, converge on best

Navigation Commands

Shift+DownNavigate to individual teammate session directly

Progress update"What are you working on? Progress update?" to any teammate

Stuck agent"Stop current task, report findings so far" — then redistribute

Agent Teams = 3–4× token cost of sequential single session. Only use when coordination value justifies it.

⏱️ BACKGROUND AGENTS

How It Works

## When Claude spawns a subagent for long task... # Press Ctrl+B to background it Ctrl+B → moves agent to background → you keep working on other tasks → agent status shown in sidebar # Track all background agents /tasks # see all running agents + IDs /stats # token usage, streaks, patterns # Long-running shell commands also backgroundable # npm install, docker build, ffmpeg # Background: Ctrl+B while running

Async Session Memory

Session summaryEvery session maintains: status, completed work, discussion points, work log

/compactExecutes immediately now — loads summary into fresh context, session continues

/renameName sessions, resume by name: claude --resume session-name

Background agents + worktrees = dispatch 5+ tasks and walk away. Each isolated, no conflicts.

🔢 TASK TOOL — Parallelism Limits

How the Task Tool Works

## Prompt Claude to run N tasks in parallel: "Explore codebase using 4 tasks in parallel. Each agent explores different directories." # Each subagent = own context window via Task Tool # Output: Task(Explore backend structure) ⎿ Done

Parallelism Behavior

Max parallelCapped at ~10 simultaneous tasks

With level setRuns in batches — waits for full batch to complete before next batch starts

Without levelPulls from queue as soon as one task done — more efficient (streaming)

100 tasksSupported — queued and processed. Codebase documentation, large refactors.

Best Prompt for Efficient Queue

## Don't specify parallelism level → streaming mode "Process all 75 files. For each file, refactor the deprecated function. Process them as fast as possible — don't wait." # Claude pulls next task as soon as one finishes

Specifying "run 4 parallel" creates fixed batches — less efficient than letting Claude self-manage queue

🖥️ COMPUTER USE — Web + Desktop Agent

Claude in Chrome (Browser Agent)

What it doesNavigate, click, fill forms, read content, manage tabs in Chrome

InterfaceSide panel in Chrome — sees what you see, acts on request

Auth contextUses your logged-in accounts — no re-authentication needed

Model (Max)Sonnet 4.6 / Opus 4.6 — full capability

Model (Pro)Haiku 4.5 only — limited capability

Token costBrowser automation eats usage faster than regular chat

Developer Build-Test-Verify Pattern

## 3-tool dev loop 1. Claude Code CLI → write + edit code 2. Claude in Chrome → test in browser, read console logs 3. Claude Code CLI → debug from console output # Chrome ext reads console directly — no copy/paste

Research → File Pipeline

Chrome → web research, scrape structured data Cowork → synthesize into polished deliverable # No copy-pasting between windows

Pro plan: Haiku only for Chrome → upgrade to Max for complex browser automation tasks

🌲 WORKTREE PATTERNS — Advanced Use Cases

Pattern 1: A/B Implementation

## Generate multiple solutions, pick best git worktree add trees/impl-1 -b impl-1 git worktree add trees/impl-2 -b impl-2 git worktree add trees/impl-3 -b impl-3 # Same prompt in each → 3 implementations # Compare, pick winner, merge to main cd trees/impl-1 && git diff main cd trees/impl-2 && git diff main git merge impl-2 # winner git worktree remove trees/impl-1 git worktree remove trees/impl-3

Pattern 2: Feature + Hotfix

## Work on feature AND fix prod bug in parallel # Main session: feature development claude # in main repo dir # New session for urgent hotfix claude \--worktree hotfix-auth-bug # Both run completely independently # No stashing. No context switching. # Merge hotfix → deploy → continue feature

Pattern 3: Large-Scale Migration

## Deprecate fn used in 75 files "Find all 75 files with deprecated fn, use worktrees for subagents, refactor each file in its own isolated context" # Each file = own worktree branch # All run in parallel, ~10 at a time # Merge PRs → complete migration # Spotify used this: 90% time reduction

Worktrees + Agent Teams = Maximum Isolation

## Phase 1 (Sequential): Team lead defines architecture # Phase 2 (Parallel with worktrees): Team Lead ├── Agent A: Backend → worktree-backend branch ├── Agent B: Frontend → worktree-frontend branch └── Agent C: Tests → worktree-tests branch # Phase 3 (Sequential): Integration + validation git merge worktree-backend worktree-frontend worktree-tests

Worktrees share local DB, Docker daemon, ports — only code is isolated, not runtime environment

Two agents modifying DB state at same time = race conditions. Use worktrees for code-only changes.

💸 MODEL ROUTING + COST OPTIMIZATION

Token Cost Hierarchy

Opus 4.6Highest cost — use for: complex reasoning, team lead, architectural decisions, 1M context tasks

Sonnet 4.6Mid cost — everyday tasks, standard subagents, code review, most Claude.ai interactions

Haiku 4.5Lowest cost — high-volume subagents, Chrome on Pro, rapid iteration, simple focused tasks

Cost Control Commands

## Route all subagents to cheaper model export CLAUDE_CODE_SUBAGENT_MODEL="claude-sonnet-4-6" # Switch model mid-session /model haiku # for simple tasks /model opus # for complex planning # Monitor cost /cos # cost + duration current session /stats # usage patterns dashboard # Reduce context to reduce cost /compact # summarize + fresh context \--max-turns 5 # bounded scripted queries

Parallel Cost Math

Cost vs Speed Trade-off

Subagents (×4 parallel):  
~2–3× token cost, 4× faster 

Agent Teams (×3 teammates):  
~3–4× token cost, 3× faster on complex tasks 

Worktrees (manual):  
~N× cost (N sessions), but you control timing 

Pro plan Chrome:  
Fast usage drain — consider Max plan 

When NOT to Parallelize

  * Sequential dependencies (B needs A's output)
  * Same-file edits without worktrees
  * Tasks < 10 minutes — setup overhead not worth it
  * Tight dependencies between subtasks
  * Budget-constrained sessions

Progressive Escalation

## Start small → scale as needed 1. Single session (try first) 2. \+ Subagents (if context fills) 3. \+ Worktrees (if file conflicts) 4. \+ Agent Teams (if coordination needed) 5. \+ Background (if you need to keep working)
