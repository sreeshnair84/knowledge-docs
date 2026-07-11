---
title: "Repository Context Engineering"
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
series_part: 6
series_total: 12
series_index: "agentic-systems/skill/coding/index"
---
# Part 8 — Repository Context (+ Deliverable 6: Context Engineering Framework)

## 8.1 Why repository context matters beyond AGENTS.md and Skills

AGENTS.md and Skills are *authored* context — someone deliberately wrote them for the agent. **Repository context** is the much larger body of material that exists for humans but that a well-built agent should also mine: README, architecture docs, ADRs, CONTRIBUTING, SECURITY, issue/PR history, wiki, and code ownership records. The difference matters because authored context requires maintenance discipline that inevitably lags reality, while repository context (especially git history and issue/PR discussion) captures *decisions and their reasoning* that rarely make it into a rules file at all.

## 8.2 Source-by-source retrieval strategy

| Source | What it uniquely provides | Retrieval approach |
| --- | --- | --- |
| **README** | High-level project purpose, setup steps | Usually loaded eagerly/early — cheap, high value, low volatility |
| **Architecture docs / design docs** | System boundaries, major components, data flow | Retrieved on demand when a task touches cross-cutting concerns; too large to always-load in most repos |
| **ADRs (Architecture Decision Records)** | The *why* behind a past technical choice — critical for avoiding an agent "helpfully" reverting a deliberate decision | Semantic search over the ADR directory, triggered when a task's scope overlaps a documented decision |
| **CONTRIBUTING.md** | PR process, commit conventions, required checks | Loaded when the task involves opening a PR or making a commit |
| **STYLEGUIDE** | Formatting/naming conventions beyond what a linter enforces | Often folded directly into AGENTS.md rather than kept separate, since it's usually always-relevant |
| **SECURITY.md** | Disclosure process, known sensitive areas | Loaded when a task touches auth, secrets, or user data handling |
| **Issue tracker / PR history** | Precedent for how similar problems were previously solved; active discussion context for the specific task at hand | MCP-mediated (GitHub/Jira/Linear MCP servers) — retrieved per-task, not pre-indexed wholesale |
| **Wiki** | Institutional knowledge not co-located with code | Same pattern as issue tracker — MCP or search-API mediated |
| **CODEOWNERS** | Who to attribute a PR to / whose conventions apply in a given path | Used to route review requests and to weight whose past patterns in that path are most authoritative |
| **Monorepo / workspace settings** | Which package a given file belongs to; build/test commands per package | Read from the monorepo's own manifest (package.json workspaces, Bazel BUILD files, Nx project.json) — structural, not prose |
| **Semantic index / embeddings / vector DB** | Concept-level retrieval ("where do we handle rate limiting") beyond exact keyword match | Pre-built index (Cursor's codebase indexing, Sourcegraph's code graph, Amp's semantic code graph) queried at context-collection time |
| **AST / tree-sitter** | Structural navigation (find all callers of this function, find the class hierarchy) | Used for precise, exact-match structural queries where semantic search would be imprecise |

## 8.3 Retrieval strategy selection

```
Is the query exact/structural
("find all callers of X")?  ──yes──► AST/tree-sitter or LSP-backed search
        │no
        ▼
Is the query conceptual
("where do we validate input")? ──yes──► Semantic/embedding search over
        │no                              the codebase index
        ▼
Is the query about a past decision
or discussion, not current code?  ──yes──► ADR search / issue-tracker MCP query
        │no
        ▼
Is it a small, stable, high-value
fact true of the whole repo? ──yes──► Belongs in AGENTS.md (pre-loaded,
                                        not retrieved per-task)
```

## 8.4 Retrieval failure modes to guard against

- **Stale index**: a semantic index built once at onboarding and never refreshed will confidently point the agent at deleted or heavily refactored code. Index freshness should be tied to CI (rebuild on merge to main), not a manual, occasional step.
- **Over-retrieval**: dumping too many "relevant" files into context degrades reasoning quality and burns tokens — retrieval should be precision-oriented (few, highly relevant files) rather than recall-maximizing (everything that might be tangentially related). This mirrors the same anti-pattern named in Part 9/instructions engineering (file `05`) at the retrieval layer instead of the authoring layer.
- **Silently ignoring ADRs**: without an explicit retrieval trigger, an agent can "fix" code in a way that directly contradicts a documented, deliberate architectural decision — this is a specific, avoidable failure mode that argues for treating ADR search as a default step whenever a task touches a documented decision area, not an optional enhancement.

## 8.5 Deliverable 6 — Repository Context Engineering Framework

**Tier 1 — Always-loaded (belongs in AGENTS.md/CLAUDE.md, not retrieved):**

- Stack and tooling (languages, frameworks, package manager, build system).
- Core conventions (naming, formatting — beyond what a linter auto-enforces).
- Hard boundaries ("never touch `legacy/`," "the billing service requires a second approver").
- Verification steps ("run `pnpm test` before considering a task complete").

**Tier 2 — Retrieved on demand, triggered by task scope:**

- README (cheap enough to often sit in Tier 1 for smaller repos).
- Architecture docs / ADRs, retrieved when the task's file scope overlaps a documented area.
- CONTRIBUTING/SECURITY, retrieved when the task involves a PR or touches sensitive surface area.
- CODEOWNERS, retrieved when routing review or resolving whose convention applies in ambiguous cases.

**Tier 3 — Retrieved via structural/semantic search, not stored as documents at all:**

- Codebase content itself, via AST/tree-sitter for exact queries and embeddings for conceptual queries.
- Issue/PR/wiki content, via MCP-mediated API queries scoped tightly to the current task.

**Governance overlay:**

- Tier 1 content changes should go through the same PR review as code.
- Tier 2 content (especially ADRs) should be linked from Tier 1 where highly relevant, so the always-loaded context can point the agent to deeper material rather than trying to inline it.
- Tier 3 retrieval infrastructure (the semantic index) should have an owner and a freshness SLA tied to CI, exactly like any other piece of build infrastructure.
