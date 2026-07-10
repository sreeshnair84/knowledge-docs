---
title: "Enterprise Agent Skills Research"
date_created: 2026-06-01
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
doc_type: multi-part-series
tags: ["agentic-systems", "skill", "enterprise", "research"]
covers_version: "as of mid-2026"
series_name: "Enterprise Agent Skills Research"
series_part: "00"
series_total: 11
series_index: "agentic-systems/skill/enterprise/index"
---

# Enterprise Agent Skills Research

An 11-part deep-dive into how enterprise agent platforms implement the Agent Skill system. Covers how Anthropic, AWS AgentCore, Azure AI Foundry, Google ADK, Salesforce Agentforce, and SAP Joule converged on the same progressive-disclosure pattern — and where they diverged in registry architecture, governance, and security.

Start with the [shared executive summary and reference architecture](../00-executive-summary-and-reference-architecture.md) for the full landscape view spanning both this series and its companion [Coding Assistant Skills Research](../coding/index.md).

---

## Who should read this series

**Platform architects and AI platform teams** building or evaluating a central skill registry — Parts 6 (registry architecture), 9 (security), and 10 (governance) are the highest-leverage starting points.

**Enterprise AI architects** designing multi-agent systems — Part 4 (Skills vs. Tools vs. MCP vs. A2A decision matrix) and Part 7 (composition and instructions engineering) address the most common design confusion.

**Security and compliance teams** — Part 9 covers the skill-level threat model, sandboxing requirements, and privilege minimisation; Part 10 covers approval gates and deprecation governance.

**Engineering leads** standardising skill-authoring discipline across teams — Part 1 (foundational definitions), Part 2 (canonical schema), and Part 5 (tool definition best practices) together provide the shared vocabulary and concrete authoring templates needed before any cross-team standardisation effort can succeed.

---

## Series structure

The parts are designed to be read in order on first pass; experienced practitioners can navigate directly to the part covering their current decision. Each part opens with a one-sentence "continues from" link to the prior part.

| Part | Title | What's unique to this part |
|---|---|---|
| 1 | [Foundations: What Is an Agent Skill?](./01-foundations-what-is-an-agent-skill.md) | Enterprise definition, progressive disclosure model, skill vs. tool/workflow/agent/prompt — enterprise platform framing across Anthropic, AWS, Azure, Google ADK |
| 2 | [Skill Anatomy & Metadata Schema](./02-skill-anatomy-and-metadata-schema.md) | Internal SKILL.md structure, YAML frontmatter schema, canonical deliverable 4 template |
| 3 | [Skill Execution Lifecycle & Tracing](./03-execution-lifecycle-and-tracing.md) | End-to-end execution flow from intent detection to response validation, sequence diagrams, deliverable 2 |
| 4 | [Skills, Tools, MCP & A2A Relationship](./04-skills-tools-mcp-a2a-relationship.md) | Decision matrix for when to use Skill vs. Tool vs. MCP vs. A2A, cross-platform comparison, deliverable 3 |
| 5 | [Tool Definition Best Practices](./05-tool-definition-best-practices.md) | Tool schema authoring, naming conventions, error-handling patterns, idempotency requirements, deliverable 5 |
| 6 | [Registry, Discovery & Deduplication](./06-registry-discovery-and-deduplication.md) | Enterprise skill registry architecture, semantic discovery via embeddings, root causes of duplication, federation across platform silos, deliverable 9 |
| 7 | [Skill Composition & Instructions Engineering](./07-composition-and-instructions-engineering.md) | Composing skills, skill-to-subagent invocation, instructions-writing discipline, prompt engineering within skills |
| 8 | [Observability & Evaluation](./08-observability-and-evaluation.md) | OTel GenAI tracing, logging patterns, skill evaluation frameworks, evals at registry admission vs. runtime, deliverable 7 |
| 9 | [Security Architecture](./09-security-architecture.md) | Skill-level threat model, sandboxing requirements, privilege minimisation, supply-chain trust for shared skills, deliverable 8 |
| 10 | [Governance & Lifecycle](./10-governance-and-lifecycle.md) | Versioning contracts, deprecation process, ownership signals, approval gates for shared skills, deliverable 6 |
| 11 | [Architecture Patterns, Anti-Patterns & Case Studies](./11-architecture-patterns-antipatterns-and-case-studies.md) | Proven patterns (hub-spoke registry, skill-per-domain), documented failure modes, vendor-specific case studies, deliverable 10 |

---

## Relationship to companion series

This series focuses on the **enterprise platform layer** — the infrastructure a central team builds to enable consistent skill authoring, discovery, and governance across an organisation. The [Coding Assistant Skills Research](../coding/index.md) covers the **developer-facing layer** — how individual engineers and teams use the SKILL.md standard within their coding tools (Claude Code, GitHub Copilot, Cursor, Codex CLI). The two series share a common reference architecture and executive summary; the skill-level concepts (progressive disclosure, schema, composition) are consistent across both.
