---
name: knowledge-doc-standard
description: |
  Enforces consistent page format and sidebar structure for all content in this knowledge-docs repo.
  Invoke when the user wants to: add a new section, add a new guide or page, add a new multi-part
  series (Part X / Vol X), register a new topic, write a new index.md, or wire up a new item in
  sidebars.js. Also invoke when the user asks "what format should this page use?", "how do I add
  this to the sidebar?", or "what front matter do I need?".
  Do NOT invoke for PDF cleanup (use pdf-format-cleanup instead).
---

# Knowledge Docs — Page Format & Sidebar Standard

This skill defines the canonical format for every page in this Docusaurus site and the sidebar
entry pattern for every content type. The standard is enforced at commit time by pre-commit hooks
— violations block the commit automatically.

---

## Pre-commit Enforcement Summary

Every `git commit` touching a `docs/*.md` file runs these checks in order:

| Hook | What it checks | On failure |
|------|---------------|------------|
| `trailing-whitespace` | Trailing spaces on any line | Auto-fixed |
| `end-of-file-fixer` | File must end with a single newline | Auto-fixed |
| `mixed-line-ending` | All line endings must be LF | Auto-fixed |
| `fix-frontmatter` | Removes deprecated/empty front matter fields | **Auto-fixed** (rewrites file) |
| `validate-frontmatter` | All 6 required fields present and valid | **Blocks commit** |
| `markdownlint-cli2` | Markdown style rules (see table below) | **Blocks commit** |

### Markdownlint rules in force

| Rule | Requirement |
|------|-------------|
| MD004 | Unordered lists use `-` not `*` or `+` |
| MD007 | List indent = 2 spaces |
| MD010 | No hard tabs |
| MD012 | Max 2 consecutive blank lines |
| MD022 | Every heading must have a blank line before **and** after it |
| MD031 | Fenced code blocks must have a blank line before **and** after |
| MD032 | Lists must have a blank line before **and** after |
| MD034 | No bare URLs (wrap in `<>` or `[text](url)`) |
| MD045 | Images must have alt text |
| MD049 | Emphasis uses `*asterisks*` not `_underscores_` |
| MD050 | Bold uses `**asterisks**` not `__underscores__` |

Rules intentionally **off**: MD001, MD013, MD024, MD025, MD033, MD036, MD040, MD041, MD046,
MD052, MD055, MD056, MD060 — see `.markdownlint.jsonc` for rationale.

---

## Front Matter Standard

The `fix-frontmatter` hook auto-removes deprecated fields on every touched file.
The `validate-frontmatter` hook blocks the commit if any required field is absent or invalid.

### Required fields (exactly these 7)

```yaml
---
title: "Page Title"
date_created: YYYY-MM-DD
last_reviewed: YYYY-MM-DD
status: current
source_type: native-md
source_file: ""
tags: ["tag1", "tag2"]
---
```

### Field rules

| Field | Valid values | Notes |
|-------|-------------|-------|
| `title` | Any quoted string | Must match the `# H1` heading on the page |
| `date_created` | `YYYY-MM-DD` | Set once when the file is created; never change |
| `last_reviewed` | `YYYY-MM-DD` | Update whenever content is meaningfully revised |
| `status` | `current` \| `archived` | Use `archived` only when a page is superseded |
| `source_type` | `native-md` \| `pdf-converted` | `pdf-converted` for PDF-sourced files |
| `source_file` | Path string or `""` | Original file path for `pdf-converted`; `""` for `native-md` |
| `tags` | YAML list of strings | Lowercase kebab-case; include section slug and key topics |

### Fields the hook auto-removes (deprecated)

`fix-frontmatter` silently strips these on every touched file — no manual cleanup needed:

| Field | Why removed |
|-------|-------------|
| `date:` | Superseded by `date_created` |
| `doc_type:` | Not rendered by Docusaurus; redundant |
| `covers_version:` | Put version context in the page body blockquote instead |
| `supersedes: ""` | Empty value is noise; only keep when set to a real slug |

---

## Page Templates

Apply the matching template when creating any new `docs/**/*.md` file.
All templates are already compatible with the markdownlint rules above.

### Template A — Section Index Page (`index.md`)

Use when creating the entry point for a new top-level or subcategory section.

```markdown
---
title: "Section Title"
date_created: YYYY-MM-DD
last_reviewed: YYYY-MM-DD
status: current
source_type: native-md
source_file: ""
tags: ["section-slug", "tag2"]
---

# Section Title

One-sentence description of what this section covers.

> **Audience:** [Primary roles, e.g. Enterprise Architects, Principal AI Architects]
> **Coverage:** [Topic 1 · Topic 2 · Topic 3]
> **As of:** Month YYYY

---

## What This Section Covers

One or two paragraphs. Explain the scope and why these topics belong together.

---

## Contents

| Document | What It Covers |
|----------|----------------|
| [Page Title](./page-slug) | One-sentence description. |
| [Page Title](./page-slug) | One-sentence description. |

---

## Related Sections

- [Section Name](../other-section/index.md) — how it connects
- [Section Name](../other-section/index.md) — how it connects
```

---

### Template B — Multi-Part Series Index (`index.md` for a Part/Vol series)

Use when the section is a structured series (Part 01–09, Vol 1–10, etc.).

```markdown
---
title: "Series Title — Subtitle"
date_created: YYYY-MM-DD
last_reviewed: YYYY-MM-DD
status: current
source_type: native-md
source_file: ""
tags: ["section-slug", "tag2", "tag3"]
---

# Series Title — Subtitle

> **Audience:** [Primary roles]
> **Coverage:** [Topic 1 · Topic 2 · Topic 3]
> **As of:** Month YYYY (post [event or release context])

---

## Executive Summary

2–4 sentences. What has changed, why it matters, and what the series covers.

---

## Series Structure

| Part | Topic | Key Concepts |
|------|-------|-------------|
| [Part 1 — Title](./part-01-slug) | Brief topic description | concept1, concept2 |
| [Part 2 — Title](./part-02-slug) | Brief topic description | concept1, concept2 |

---

## Quick Reference

Optional: glossary table or capability status table for at-a-glance lookup.

| Term / Capability | Definition / Status |
|-------------------|---------------------|
| **Term** | Definition |

---

*See individual parts for deep dives. This index is updated to reflect status as of [Month YYYY].*
```

---

### Template C — Content Guide Page (standalone or series part)

```markdown
---
title: "Guide Title"
date_created: YYYY-MM-DD
last_reviewed: YYYY-MM-DD
status: current
source_type: native-md
source_file: ""
tags: ["section-slug", "topic-tag"]
---

# Guide Title

One-sentence description of what this guide covers and who it is for.

> **Audience:** [roles]
> **Coverage:** [topic1 · topic2 · topic3]

---

## Section One

Content.

---

## Section Two

Content.

---

## Related

- [Page Title](../path/to/page.md) — relationship description
- [Page Title](../path/to/page.md) — relationship description
```

---

## Sidebar Entry Patterns (`sidebars.js`)

### New top-level section

```javascript
{
  type: 'category',
  label: 'Section Label',
  items: [
    'section-slug/index',       // auto-labeled "[Section Label] Overview"
    'section-slug/page-one',    // auto-labeled by sidebarLabel()
    'section-slug/page-two',
  ],
},
```

### Named series (Part X / Vol X) — always use explicit labels

```javascript
{
  type: 'category',
  label: 'Series Name',
  items: [
    'section-slug/index',
    {type: 'doc', id: 'section-slug/part-01-slug', label: 'Part 01 — Title'},
    {type: 'doc', id: 'section-slug/part-02-slug', label: 'Part 02 — Title'},
  ],
},
```

### Nested subcategory

```javascript
{
  type: 'category',
  label: 'Subcategory Label',
  items: [
    'section-slug/subcategory/index',
    'section-slug/subcategory/page-one',
  ],
},
```

### Bare string vs explicit object

| Use `{type:'doc', id, label}` | Use bare string |
|-------------------------------|-----------------|
| Part X / Vol X series entries | Generic content pages |
| Filename doesn't suggest the right label | Index pages (`overviewLabel()` handles them) |
| Needs a parenthetical e.g. `(Original PDF — superseded)` | Most standalone guides |

---

## File Naming Convention

| Situation | Pattern | Example |
|-----------|---------|---------|
| Series part | `part-NN-topic-slug.md` | `part-03-security-architecture.md` |
| Series volume | `volN-topic-slug.md` | `vol2-business-architecture.md` |
| Standalone guide | `topic-slug.md` | `agent-identity-entra-vs-awsagentcore.md` |
| Section or subcategory index | `index.md` | `auth/index.md` |

- Always kebab-case; no underscores in new files
- No version numbers in filenames (put in front matter and page body)
- Follow existing naming style within an established series

---

## Workflow for Adding New Content

1. **Pick the page type** — Section Index (A), Series Index (B), or Content Guide (C)
2. **Create the `.md` file** with the 6-field front matter from the matching template
3. **Apply the template body** — headings, blockquote, tables, Related section
4. **Add to `sidebars.js`** — bare string for content pages; explicit object for named series
5. **Commit** — `fix-frontmatter` cleans any noise; `validate-frontmatter` confirms all fields are present; markdownlint checks formatting

---

## Validator Script Reference

`scripts/validate_frontmatter.py` is the authoritative implementation.

```
python scripts/validate_frontmatter.py [--fix] file1.md file2.md ...
```

- Without `--fix`: validates only (used by `validate-frontmatter` hook)
- With `--fix`: removes deprecated/empty fields first, then validates (used by `fix-frontmatter` hook)

Exit code 0 = all files valid. Exit code 1 = one or more errors printed to stderr.
