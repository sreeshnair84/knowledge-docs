---
name: knowledge-repo-graph
description: Build and query a knowledge graph of the docs/ corpus — pages, tags/concepts, and typed edges (content similarity, markdown links, tag membership, sidebar hierarchy). Use this when asked to find duplicate/overlapping topics repo-wide, find pages related to a given page or concept, or produce a searchable/visual index of the repo. Complements knowledge-repo-cleanup's find_duplicates.py (which requires a full _meta/corpus.json extraction pass and only outputs a flat CSV) by working directly off docs/*.md and producing a structured, queryable graph rather than a one-off pairs list. Regenerate after any bulk content change — a stale graph is worse than no graph, since a stale duplicate-cluster report gives false confidence (this repo's own _meta/duplicate-pairs.csv is a live example: 381 of its 543 rows still reference .pdf files deleted during the 2026-07-10 cleanup).
model: sonnet
date_created: 2026-07-16
status: current
---

# Knowledge Repo Graph

## 1. Build the graph

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/build_graph.py --sim-threshold 0.3
```

Reads every `docs/**/*.md` directly (no separate extraction step needed, unlike `knowledge-repo-cleanup`'s corpus.json pipeline — that matters because a stale corpus snapshot is exactly what made this repo's existing duplicate-pairs.csv actively misleading). Produces:

- **`_meta/graph.json`** — the graph: page nodes (title, domain, doc_type, tags, word count, sidebar category path) and concept nodes (one per tag), with four edge types: `similar_to` (TF-IDF cosine similarity — the duplication signal), `links_to` (real markdown links), `tagged` (page → concept). Sidebar hierarchy is attached to each page node as `category_path` rather than as separate edges.
- **`_meta/duplicate-clusters.md`** — connected components of pages at ≥60% similarity, human-readable, with every pairwise score inside each cluster shown. This is the direct answer to "where is topic duplication happening" — comprehensive (every page compared against every other page) rather than the one-new-page-at-a-time check `knowledge-page-authoring/scripts/check_against_corpus.py` runs at commit time.

Re-run this after any bulk content change. A graph built from a stale corpus gives false confidence — worse than no graph, since it looks authoritative.

## 2. Query it

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/query_graph.py --related <doc_id>       # what's connected to this page, strongest first
python3 ${CLAUDE_SKILL_DIR}/scripts/query_graph.py --concept <tag>          # every page tagged with this concept (frontmatter)
python3 ${CLAUDE_SKILL_DIR}/scripts/query_graph.py --tool <name>            # every page whose body mentions this technology
python3 ${CLAUDE_SKILL_DIR}/scripts/query_graph.py --tool list              # all 52 tool nodes ranked by page coverage
python3 ${CLAUDE_SKILL_DIR}/scripts/query_graph.py --duplicates --min 0.6   # every duplicate-candidate cluster, ranked
```

`doc_id` is the page's path under `docs/` without the `.md` extension (e.g. `ai-protocols/mcp/some-page`), matching the same id scheme `sidebars.js` and `check_sidebar_integrity.py` use.

### Tool taxonomy

`_meta/technology-taxonomy.json` is the registry of 52 named tools and frameworks across 11 categories (`llm`, `agent-framework`, `cloud-ai`, `vector-db`, `orchestration`, `infra`, `protocol`, `security`, `observability`, `data-platform`, `dev-tools`). Each entry has a canonical name, category, description, and aliases list — the aliases are compiled into a single regex and matched case-insensitively against page body text (not just frontmatter tags). Add new tools to the taxonomy and re-run `build_graph.py` to refresh.

The graph now carries a fifth edge type — `mentions` (page → tool) — with 4,671 edges across 52 tool nodes. This answers "which pages cover LangGraph?" without requiring authors to have remembered to add it to frontmatter tags (44 pages currently have empty tags).

## 3. Before writing new content

`knowledge-repo-intake`'s placement logic should query this graph (`--concept` for the target topic, or `--related` against the closest existing page it finds) as an additional signal before creating a new page — a `similar_to` edge ≥60% to something already in the graph is a stronger "this might already exist" signal than the taxonomy-based placement check alone, because it's based on actual content overlap, not just folder conventions.

## What "similar_to" does and doesn't tell you

A high similarity score between two pages in **different** directories is the actionable duplication signal — that's content that likely should be one page, cross-linked, not two. A high score between two pages in the **same** directory (e.g. sequential parts of a series, or three sibling pages on related sub-topics) is often expected and fine — check the cluster report's member list before assuming every cluster is a problem to fix.

## Interactive exploration

A generated HTML graph explorer (force-directed, searchable by title/tag, filterable by similarity threshold and domain) is the fastest way to actually look at this rather than read JSON — see the artifact provided alongside this skill. It's a static export of one `build_graph.py` run; regenerate it the same way after rebuilding the graph.
