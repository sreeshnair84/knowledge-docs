---
title: "Coding Assistant Skills Research"
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
series_part: "00"
series_total: 12
series_index: "agentic-systems/skill/coding/index"
---

# Coding Assistant Skills Research

A 12-part vendor-neutral deep-dive into how AI coding assistants implement the SKILL.md open standard for packaging, discovering, and executing coding skills (2025–2026). Covers Claude Code, GitHub Copilot (agent mode), Cursor, OpenAI Codex CLI, Antigravity CLI (formerly Gemini CLI), Devin, Amp (Sourcegraph), and JetBrains Junie.

Start with the [shared executive summary and reference architecture](../00-executive-summary-and-reference-architecture.md) for the full landscape view spanning both this series and its companion [Enterprise Agent Skills Research](../enterprise/index.md).

---

## Who should read this series

**Individual engineers** optimising their own coding assistant setup — Parts 1 (foundational definitions), 5 (tool definitions and instructions engineering), and 7 (VS Code and Dev Containers) together provide the essential authoring discipline for skill files that actually trigger reliably.

**DevEx and platform engineering teams** standardising coding tooling org-wide — Parts 6 (repository context engineering), 10 (governance and security), and 11 (evaluation and deduplication) address the cross-team consistency and security challenges that emerge at scale.

**Security and AppSec teams** — Part 10 covers the AIShellJack attack framework (41–84% measured success rates against real tooling), the CVE catalog for 2025–2026 coding assistant vulnerabilities, sandboxing mitigations, and rules-file trust gate requirements.

**Anyone evaluating or comparing coding tools** — Part 12 provides the definitive vendor comparison table (Claude Code, Copilot, Cursor, Codex CLI, Antigravity, Devin, Amp, Junie) plus a workflow-type skill mapping for greenfield development, legacy modernisation, bug fixing, code review, DevSecOps, and SRE use cases.

---

## Why this series exists

Before Skills, coding assistants had tools (filesystem, terminal, git) and a single always-loaded instructions file. This created a real gap: tools tell the agent *what it can technically do*, but not the team's opinion on *how and when to do it well*. The SKILL.md standard — now natively supported by GitHub Copilot (April 2026), VS Code Stable (January 2026), OpenAI Codex CLI, Cursor, Antigravity CLI, and 20+ other tools — addresses this by enabling on-demand-loaded procedural knowledge that stays out of context until actually needed.

---

## Series structure

| Part | Title | What's unique to this part |
| --- | --- | --- |
| 1 | [Foundations: What Is a Coding Skill?](./01-foundations-what-is-a-coding-skill.md) | Coding-assistant definition of a skill, SKILL.md standard history, skill vs. slash command/prompt/tool/MCP tool/background agent — every adjacent concept disambiguated |
| 2 | [Skill Anatomy & Metadata Schema](./02-skill-anatomy-and-metadata-schema.md) | SKILL.md frontmatter fields, vendor-specific extensions (Copilot `user-invokable`, `disable-model-invocation`), canonical deliverable 4 template |
| 3 | [Skill Discovery & Execution Lifecycle](./03-discovery-and-execution-lifecycle.md) | How agents discover skills (description-based matching vs. explicit `/skillname` invocation), end-to-end execution sequence diagrams, deliverable 2 |
| 4 | [Skills vs. MCP & the Full Responsibility Stack](./04-skills-tools-mcp-relationship.md) | Responsibility matrix across Skill/Tool/MCP/Extension/IDE/Language Server/Dev Container, deliverable 3 |
| 5 | [Tool Definitions & Instructions Engineering](./05-tool-definitions-and-instructions-engineering.md) | Tool definition authoring inside skills, Vercel 53→79% pass-rate empirical finding, AGENTS.md steering patterns, deliverable 5 |
| 6 | [Repository Context Engineering](./06-repository-context-engineering.md) | README/ADR/CODEOWNERS/semantic-index/AST retrieval strategy by source type, when to use semantic search vs. tree-sitter vs. MCP, deliverable 6 |
| 7 | [VS Code & Dev Containers Integration](./07-vscode-devcontainers-integration.md) | VS Code Copilot Language Model API, devcontainer.json skill patterns, reproducible sandbox environments, deliverable 7 |
| 8 | [MCP Integration & Memory](./08-mcp-integration-and-memory.md) | MCP trust models in coding agents, versioning contracts, memory architecture across session/project/global/semantic scopes |
| 9 | [Multi-Agent Skills & Observability](./09-multi-agent-and-observability.md) | Orchestrator/subagent skill patterns, independent testing-agent role, OTel GenAI tracing, SWE-bench/Terminal-Bench evaluation, deliverable 9 |
| 10 | [Governance & Security](./10-governance-and-security.md) | AIShellJack attack framework, 2025–2026 CVE catalog, OS-level sandboxing (Seatbelt/Landlock/bubblewrap), rules-file trust gate requirements |
| 11 | [Evaluation, Reusability & Deduplication](./11-evaluation-reusability-deduplication.md) | Skill evaluation rubrics, cross-tool portability, anti-duplication patterns (symlinks vs. sync scripts vs. marketplace), deduplication tooling |
| 12 | [Enterprise Workflows & Comparative Analysis](./12-enterprise-workflows-comparative-analysis-and-patterns.md) | Workflow-type skill mapping table, full vendor comparison (Claude Code/Copilot/Cursor/Codex/Antigravity/Devin/Amp/Junie), patterns and anti-patterns, deliverables 1 & 10 |

---

## Relationship to companion series

This series focuses on the **developer-facing layer** — how engineers and teams use the SKILL.md standard within coding tools. The [Enterprise Agent Skills Research](../enterprise/index.md) covers the **platform layer** — the infrastructure a central team builds for consistent skill authoring, discovery, and governance across an organisation. Both series share the same foundational reference architecture and key concepts (progressive disclosure, skill schema, composition); the difference is the operational context and the audience.
