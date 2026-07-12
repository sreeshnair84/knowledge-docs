---
title: "Skill Anatomy & Metadata Schema"
date_created: 2026-06-01
last_reviewed: 2026-07-12
status: current
supersedes: ""
source_type: native-md
source_file: ""
doc_type: multi-part-series
tags: ["agentic-systems", "skill", "enterprise", "research"]
covers_version: "as of mid-2026"
series_name: "Enterprise Agent Skills Research"
series_part: 2
series_total: 11
series_index: "agentic-systems/skill/enterprise/index"
---

# Part 2 — Skill Anatomy & Metadata Schema

> **Shared chapter.** The internal structure of a skill — the `SKILL.md` layout, folder anatomy (`references/`, `scripts/`, `templates/`, `evals/`), and the full metadata schema — is identical for enterprise and coding-assistant skills, because both build on the same open Agent Skills spec.
>
> The canonical version of this chapter lives in the coding series:
> **[Part 2 — Internal Structure of a Coding Skill (+ Metadata Schema)](../coding/02-skill-anatomy-and-metadata-schema.md)**

Read the canonical chapter for:

- **Physical structure** — the required `SKILL.md` plus optional `references/`, `scripts/`, `templates/`, and recommended `evals/` folders.
- **Metadata schema (Deliverable 4)** — every frontmatter field, which are required vs optional, and validation rules.
- **Progressive disclosure** — how metadata, instructions, and reference files load at different times to protect the context window.

Then continue this series with [Part 3 — Execution Lifecycle & Tracing](./03-execution-lifecycle-and-tracing.md).
