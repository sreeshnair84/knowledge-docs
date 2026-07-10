---
title: "Agent Skills"
date_created: 2026-06-29
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["agentic-systems", "skill"]
doc_type: guide
covers_version: "as of 2026-07-10"
---

# Agent Skills

Playbooks and research for designing, composing, and deploying AI agent skills — covering the SKILL.md open standard, skill architecture, A2A (Agent-to-Agent) protocol, skill discovery, and reusable tool libraries.

Start with the **[Executive Summary & Reference Architecture](00-executive-summary-and-reference-architecture)** for the full landscape overview, then dive into whichever sub-series fits your role.

---

## What is an Agent Skill?

An Agent Skill is a reusable, named, versioned package of procedural knowledge — a `SKILL.md` file (YAML frontmatter + Markdown body) plus optional scripts, templates, and reference material — that an agent runtime discovers and loads on demand. The defining architectural property is **progressive disclosure**: at rest, only the skill's `name` and `description` (a few dozen tokens) sit in the agent's context; the full instructions load only when a task matches.

This matters because without progressive disclosure, every additional capability added to an agent linearly inflates the system prompt, degrading latency, cost, and instruction-following accuracy. Skills let the addressable capability surface of an agent grow effectively unbounded while the loaded context stays small and task-relevant.

By mid-2026, the SKILL.md standard is natively supported by GitHub Copilot (April 2026), VS Code Stable (January 2026), OpenAI Codex CLI, Cursor, Antigravity CLI (formerly Gemini CLI), JetBrains Junie, and 20+ other tools, as well as enterprise agent platforms from Anthropic, AWS, Azure, and Google. A skill authored once works, largely unmodified, across most of the ecosystem.

---

## The two-plane model

The most important structural insight in this entire section: **Skills and always-loaded instruction files solve different problems, and both are necessary.**

| Layer | Examples | When it loads | What it carries |
|---|---|---|---|
| **Always-loaded context** | `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/*.mdc`, `.github/copilot-instructions.md` | Every turn, unconditionally | Standing rules, coding standards, "always true about this repo" |
| **Skill (on-demand)** | `SKILL.md` files in `.claude/skills/`, `.github/skills/` | Only when a task matches the skill's name/description | Specialized, procedural knowledge for a specific class of task |

Conflating these two — stuffing everything into the always-loaded file, or trying to make a skill do the job of a standing rule — is the most common authoring mistake observed across vendor documentation and community guides alike.

---

## Research Series in this section

### [Executive Summary & Reference Architecture](00-executive-summary-and-reference-architecture)

The shared entry point for both research series below. Covers the reference architecture diagram, core definitions, the one-page responsibility matrix (Skill vs. Tool vs. MCP vs. Extension vs. Language Server vs. Dev Container), and the six key findings from the research package.

### [Enterprise Agent Skills Research](enterprise/index)

An 11-part deep-dive into how enterprise agent platforms (Anthropic, AWS AgentCore, Azure AI Foundry, Google ADK, Salesforce Agentforce) implement the agent skill system at the platform layer — including registry architecture, governance lifecycle, security threat model, observability, and architecture patterns with vendor case studies.

**Start here if you are:** building or evaluating a central skill registry, designing multi-agent systems with cross-team skill reuse, or responsible for skill governance and security at the platform level.

### [Coding Assistant Skills Research](coding/index)

A 12-part vendor-neutral deep-dive into how AI coding assistants (Claude Code, GitHub Copilot, Cursor, OpenAI Codex CLI, Antigravity CLI, Devin, Amp, JetBrains Junie) implement the SKILL.md standard at the developer-facing layer — covering skill discovery, VS Code and Dev Containers integration, repository context engineering, MCP memory, multi-agent patterns, and a full vendor comparison table.

**Start here if you are:** an individual engineer optimising your coding assistant setup, a DevEx team standardising tooling org-wide, a security team assessing prompt injection and sandboxing posture, or evaluating coding tool vendors.

---

## Key concepts across both series

**Progressive disclosure** — the mechanism that keeps agent context efficient: skill metadata is always available, full instructions load only on match.

**AGENTS.md vs. SKILL.md** — the most frequently confused distinction in this space. AGENTS.md is what the agent always knows about your project; a SKILL.md is what the agent knows how to do, loaded only when relevant.

**Instruction steering** — a widely-cited Vercel evaluation found skills invoked with no steering instruction in AGENTS.md were ignored 56% of the time; explicitly telling the agent when to invoke a skill raised pass rates from 53% to 79%. Skills are not reliably self-triggering without a pointer in your always-loaded context.

**Security surface** — the AIShellJack attack framework demonstrated 41–84% success rates injecting malicious instructions via rules files and filenames. Repository-supplied text (rules files, READMEs, issue bodies) is a proven attack surface requiring review/trust gates equivalent to code review.

---

## Authoring a skill: the minimum viable SKILL.md

A conformant skill file requires three things: a `name`, a `description` (the text the agent uses to decide whether to load the full skill), and a body of instructions. Everything else is optional.

```yaml
---
name: run-tests
description: >
  Use this skill when the developer asks to run, write, fix, or review
  tests. Covers unit, integration, and e2e test patterns for this repo.
version: "1.0.0"
authors: ["platform-team"]
---

# Run Tests

## When to use this skill
...

## Step-by-step procedure
...
```

The description field is the single highest-leverage line in the file. The Vercel evaluation finding — 53% pass rate without a steering pointer in AGENTS.md, 79% with one — shows the model uses description-matching as the primary discovery signal. Write it as "Use this skill when..." to make the trigger condition explicit rather than leaving it implicit.

**Common authoring mistakes to avoid:**

1. **Cramming always-true rules into a skill.** If it applies every turn ("use tabs not spaces", "never commit secrets"), it belongs in `AGENTS.md` or `.cursor/rules/`, not a skill. Skills are for *occasional, task-specific* procedures.
2. **One giant skill covering everything.** Prefer narrowly-scoped, single-purpose skills that compose well over a monolithic skill that tries to cover all cases. Narrow skills are easier to discover (clearer description), easier to maintain, and easier to test.
3. **No version field.** Unversioned skills create governance problems the moment a second team depends on yours — they can't pin to a known-good state. Version from the start.
4. **Ignoring the `covers_version` / staleness problem.** Research reports and procedural skills go stale as platforms evolve. Add a dated banner at the top of any skill that references external APIs, vendor behaviours, or security guidance, and establish a review cadence.

---

## Skill discovery: how agents find skills

Modern coding agents (Claude Code, Copilot agent mode, Codex CLI, Cursor) follow a two-step discovery process:

1. **Index** — at session start (or on a file-change event), the agent walks the skill directories (`.claude/skills/`, `.github/skills/`, `~/.codex/skills/`, etc.) and loads only each skill's `name` and `description` into a lightweight index. This is cheap: a full skill directory with 50 skills might add 2–3K tokens of index overhead.
2. **Match** — when a developer sends a request, the agent compares the request against the index. If one or more skills match, the agent loads the full `SKILL.md` (and any referenced files the skill declares) into context for that turn only.

This is exactly progressive disclosure in practice. The index overhead is constant; the per-turn overhead scales only with the skills that actually apply to the current task.

**Explicit invocation** coexists with automatic discovery: GitHub Copilot supports `/skillname` slash commands; Codex CLI supports `$skillname` prefix notation. Frontmatter fields like `user-invokable: true` and `disable-model-invocation: true` let authors control whether a skill is reachable only via explicit command, only via automatic matching, or both.

---

## Skill placement: where skills live on disk

| Scope | Path | Who controls |
|---|---|---|
| **Project-local** | `.claude/skills/<name>/SKILL.md` or `.github/skills/<name>.md` | Repository authors — skill ships with the repo |
| **User-global** | `~/.claude/skills/<name>/SKILL.md` (Claude Code), `~/.codex/skills/` (Codex CLI) | Individual developer — available across all projects |
| **Org/enterprise** | Configured via org-level MDM, `.claude/settings.json` `skillDirectories`, or a central registry URL | Platform team — skills distributed to all org members |
| **Marketplace** | GitHub Extensions marketplace, VS Code Extension marketplace | Third-party or Anthropic-published |

Project-local skills take precedence over user-global skills of the same name, which take precedence over org-level. This means a repository can always override a generic org-provided skill with a project-specific version without needing to change central configuration.

---

## Security considerations

Three categories of risk are well-documented as of mid-2026:

**Rules-file injection (AIShellJack pattern)** — if an agent auto-loads repository-committed instruction files without a review gate, an attacker who can open a PR (or compromise a dependency) can inject malicious instructions. The AIShellJack framework demonstrated 41–84% success rates across real tooling. The mitigation is a code-review-equivalent gate on all skill and rules files — the same review discipline as application code.

**Filename injection** — agents that include filenames in context can be manipulated via crafted filenames (e.g., a file named `; ignore previous instructions`). Proper sandboxing and LSP-mediated file access (rather than raw shell expansion) mitigate this.

**Supply-chain trust for shared skills** — org-provided skills distributed via a central registry carry the same supply-chain risk as any internally-distributed package. Versioning, ownership metadata, and an approval gate before promotion to the registry are the standard mitigations; see the Enterprise Platform Research series (Part 9 — Security Architecture) for the full threat model.

All major agents (Claude Code, Codex CLI, Cursor, Antigravity) now ship OS-level sandboxing (Seatbelt on macOS, Landlock/bubblewrap on Linux) or container/microVM isolation as a default or strongly-recommended default. Anthropic reports an 84% reduction in permission prompts under sandboxing — it is both a security control and a usability improvement.

---

## Additional Resources

- [A2A Deep Research](a2a_deep_research.html) — Agent-to-Agent protocol deep dive (HTML)
- [Agent Skills Complete Playbook 2026](Agent_Skills_Complete_Playbook_2026.pdf) — source PDF
