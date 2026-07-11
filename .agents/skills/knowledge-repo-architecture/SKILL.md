---
name: knowledge-repo-architecture
description: Assess and evolve the information architecture of the knowledge-docs repository. Use when reorganizing sections, designing taxonomy or tags, generating or auditing indexes, improving Docusaurus sidebar navigation, finding orphaned pages, or planning scalable repository governance.
---

# Knowledge Repository Architecture

1. Run `node ${CLAUDE_SKILL_DIR}/scripts/audit-knowledge-repo.mjs --output _meta/repository-health-audit.json`.
2. Run `node ${CLAUDE_SKILL_DIR}/scripts/build-knowledge-index.mjs --output _meta/knowledge-index.json`.
3. Treat both generated files as evidence, not a mandate for bulk edits. Confirm ambiguous moves, merges, and retitles with the user.
4. Keep one canonical page per durable concept. Put overview pages at category roots; use links and the index for related material rather than copied introductions.
5. Keep the sidebar at three useful levels or fewer: domain, subdomain, and page/series. A category needs either a landing page or at least two meaningful children.
6. Use lower-kebab-case folders for domains, stable filenames for canonical pages, and numeric prefixes only for intentional ordered series. Docusaurus IDs omit numeric prefixes where they do not add meaning.
7. Maintain `_meta/knowledge-index.json` after structural, metadata, or relationship changes. It is the compact context source for AI maintenance; open only its relevant folder, tag, or document entries before loading full pages.

## Decisions

- Archive, do not delete, retired source material; retain a `supersedes` relationship.
- Prefer a one-page delta or supplement to a duplicate full guide.
- Treat duplicate titles, unlisted pages, and stale `last_reviewed` values as triage queues; verify semantic overlap before changing content.
