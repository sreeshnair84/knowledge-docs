---
title: "Knowledge Repository Architecture Assessment and Operating Model"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
supersedes: ""
source_type: native-md
source_file: ""
doc_type: guide
tags: ["knowledge-management", "information-architecture", "governance", "repository-operations"]
---

# Knowledge Repository Architecture Assessment and Operating Model

## Executive assessment

The repository is no longer in the ungoverned state described in the original cleanup brief. The July 2026 migration has already removed or archived known duplicates, normalized 226 pages, and produced a clean Docusaurus build. It now has a solid domain-based foundation and a usable sidebar. The remaining risk is regression: structural metadata, titles, links, and relationships are not yet governed by a single routine that runs across the whole corpus.

The baseline audit scanned 465 Markdown pages. It found 37 pages with incomplete frontmatter, 16 duplicate-title groups, 3 unmatched fenced-code candidates, one relative-link candidate, and one page not represented in the sidebar (`workflow-orchestration/RESEARCH-STATUS.md`). It also detected 1,974 heading-level jumps and 49 pages without a valid first H1. These are a review queue, not evidence that every item should be changed automatically: converted and series content often needs human classification before a safe correction.

The recommended operating model is **canonical pages plus contextual links**. A durable concept has one authoritative page. Series, playbooks, or case studies may refer to it, but must not reproduce it. The compact index is the default AI entry point, so maintenance begins with metadata and relationships rather than loading whole sections into context.

## Evidence and prioritized remediation

| Priority | Finding | Action | Exit criterion |
|---|---|---|---|
| Critical | Three unmatched-code-fence candidates | Review and repair the reported pages before broad content work. | All code fences pair and the site builds. |
| Critical | Metadata gaps | Backfill the remaining required universal fields. Keep `doc_type` only when it improves discovery. | Audit reports zero incomplete frontmatter. |
| High | 16 duplicate-title groups | Decide whether each is a legitimate series, a title collision, or a duplicate concept. Retitle collisions; merge only confirmed duplicate content. | Every title is unique unless deliberately scoped by title. |
| High | Heading structure queue | Review by document type and repair the largest/highest-traffic pages first. | No avoidable H1/H2/H3 skips in priority pages. |
| High | One link and one sidebar-status-page candidate | Fix or deliberately exclude the candidate link and clarify whether the status page is internal-only. | No unexplained audit findings. |
| Medium | Cross-topic concepts are represented in many domains | Establish canonical references for identity, governance, evaluation, observability, agent memory, and architecture patterns. | Each has a named canonical page and contextual links. |
| Medium | Tags are descriptive but not controlled | Normalize tags against a small vocabulary and maintain the index. | New/edited pages use the tagging policy. |
| Low | Sidebar contains deep and lengthy series | Keep it stable now; refactor only after canonical-page decisions. | Sections remain at domain → subdomain → page/series depth. |

## Target information architecture

Keep the current top-level domains; they are recognisable and suitably broad for enterprise readers. Do not create new top-level folders for every technology, framework, or course. Use this scalable pattern:

```text
docs/
  <domain>/
    index.md                    # reader-oriented domain map and canonical links
    <subdomain>/
      index.md                  # optional only when the subdomain has several pages
      <canonical-topic>.md
      <ordered-series>/          # only where the reading sequence matters
  _shared/                       # future reusable, non-reader content blocks only
archive/                         # retired source material, never canonical content
_meta/                           # index, audit, decisions, migration records
```

Top-level domains should remain: AI Foundations, Agentic AI, Security, Coding Tools, AI Protocols, Cloud Platforms, Knowledge, Enterprise Architecture, AI Development, AI Economics, Use Cases, Sovereign & Constitutional AI, Agentic UI, Interview Prep, Cybersecurity Architecture, EA Masterclass, Soft Skills, Workflow Orchestration, and Quantum AI. The duplication control is not a forced folder merge; it is a canonical ownership map. For example, an authoritative identity or authentication concept lives under AI Protocols/Auth, while architecture, security, cloud, and use-case pages link to it and add only domain-specific decisions.

Every category landing page should answer: what belongs here, which pages are canonical, what sequence (if any) is recommended, and what adjacent domains readers should consult. Do not put a single-page category in the sidebar unless it will soon gain a second meaningful page; use the page directly instead.

## Metadata, taxonomy, and lifecycle standard

Use the existing universal frontmatter schema on every content page:

```yaml
title: "Specific, reader-facing title"
date_created: YYYY-MM-DD
last_reviewed: YYYY-MM-DD
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["domain", "concept", "technology"]
```

Use `status: current | superseded | archived`. `supersedes` should be a canonical document ID or an intentionally empty value. `doc_type` and other descriptive fields are optional indexes, not triggers for a page template. Keep filenames stable and prefer lower-kebab-case; reserve numeric prefixes for sequenced series. Put dates in frontmatter rather than filenames unless a document is an explicitly dated market or version report.

Tags are an index, not a second taxonomy. Apply three to seven lowercase, hyphenated terms: a domain tag, a primary concept, optional technology, and optional audience or lifecycle tag. Prefer `identity`, `governance`, `evaluation`, `observability`, `agent-memory`, `mcp`, and `aws` over ad hoc variants. A controlled vocabulary should grow through a reviewed taxonomy change, not with every new page.

## Indexing and token-efficient maintenance

Two generated files are now the maintenance entry points:

- `_meta/repository-health-audit.json` is a deterministic quality queue.
- `_meta/knowledge-index.json` is a compact document registry with folder, document type, tags, review date, and inbound/outbound relationships.

Regenerate both after a structural or metadata batch. An AI task should first read the relevant index slice (folder, tag, or document record), then only the canonical page and directly related pages. This avoids loading a whole category to answer a narrow question and makes relationship decisions explicit. The index supports category, topic, technology, framework, capability, parent-child, dependency, and related-document queries without duplicating prose.

Reusable blocks should be introduced cautiously. Use them only for stable text such as terminology, policy statements, or diagram definitions that genuinely appear in several pages. Keep the source block in one clearly owned location and include it at build time only if the site tooling is configured for it; otherwise a canonical link is safer than a copy-paste workflow.

## Modular skill architecture

Existing skills remain the execution core:

| Skill | Primary responsibility |
|---|---|
| `knowledge-repo-intake` | Classify new research/source input and choose update versus new page. |
| `pdf-to-markdown` | Extract PDF/DOCX content into a repairable Markdown draft. |
| `knowledge-page-authoring` | Apply document type, frontmatter, structure, linting, and duplicate checks. |
| `knowledge-repo-cleanup` | Perform a scoped, resumable migration when a large historical cleanup is approved. |
| `knowledge-repo-enforcement` | Install local and CI quality gates. |
| `knowledge-repo-architecture` | Audit taxonomy, navigation, hierarchy, and indexes. |
| `knowledge-content-quality` | Repair Markdown, tables, diagrams, images, callouts, metadata, and links. |
| `knowledge-relationship-management` | Maintain canonical ownership, tags, cross-links, Related Topics, and index relationships. |

This composition deliberately avoids creating one tiny skill for every requested check. The new three skills cover repository architecture; metadata, sidebar and index generation; Markdown/table/image/diagram repair; duplicate detection; cross-reference recommendation; tag normalization; and document-quality triage, while delegating specialised conversion and authoring to the existing skills.

## Governance and roadmap

Require a change to have: a designated canonical page (or an explicit reason it is distinct), complete frontmatter, an appropriate sidebar location, index regeneration, lint/duplicate checks, and a build for navigation or MDX changes. The contributor proposes merges and moves; a maintainer approves ambiguous semantic consolidation. Archive rather than delete retired sources and preserve the replacement relationship.

1. **Stabilize (next batch):** repair the critical items, complete metadata, and validate the audit on a clean build.
2. **Consolidate (following batches):** resolve title collisions and establish canonical ownership for cross-cutting concepts, starting with pages that attract the most cross-links.
3. **Operationalize:** install the enforcement hook and CI workflow, regenerate the index in the content workflow, and track audit counts as quality metrics.
4. **Scale:** introduce topic-level landing pages and reusable blocks only when repeated maintenance demonstrates a real need. Review stale pages on a risk-based cadence: time-sensitive research quarterly, technical guides on major version changes, evergreen frameworks annually.

The objective is not zero duplication at any cost. It is intentional reuse: one owner for shared knowledge, clear links for context, compact indexes for maintenance, and automated guardrails against drift.
