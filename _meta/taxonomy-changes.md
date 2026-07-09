---
title: "Taxonomy Changes — Phase 4"
date_created: 2026-07-09
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["_meta"]
---

# Taxonomy Changes — Phase 4

## Frontmatter Standardisation

**507 files** updated with the standard frontmatter schema:

```yaml
title: "..."
date_created: YYYY-MM-DD
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md | converted-pdf
source_file: ""
tags: [section, subsection]
```

- `title` — inferred from existing frontmatter, first `#` heading, or filename
- `date_created` — from existing `date_created`/`date` field, or git log date
- `source_type` — `converted-pdf` where `source_file` is set; otherwise `native-md`
- `tags` — auto-derived from 2-level path (`[section, subsection]`)

Files already carrying all required fields were skipped (0 skipped after the bulk run).

## sidebars.js Fixes

**15 broken references** corrected in `sidebars.js` — cybersec-architect section:

| Old reference | Corrected reference | Actual file |
|---|---|---|
| `cybersec-architect/evolution` | `cybersec-architect/01-evolution` | `01-evolution.md` |
| `cybersec-architect/enterprise-security-architecture` | `cybersec-architect/02-enterprise-security-architecture` | `02-enterprise-security-architecture.md` |
| `cybersec-architect/security-domains` | `cybersec-architect/03-security-domains` | `03-security-domains.md` |
| `cybersec-architect/ai-security` | `cybersec-architect/04-ai-security` | `04-ai-security.md` |
| `cybersec-architect/agentic-ai-security` | `cybersec-architect/05-agentic-ai-security` | `05-agentic-ai-security.md` |
| `cybersec-architect/identity-architecture` | `cybersec-architect/06-identity-architecture` | `06-identity-architecture.md` |
| `cybersec-architect/cloud-security` | `cybersec-architect/07-cloud-security` | `07-cloud-security.md` |
| `cybersec-architect/ai-governance` | `cybersec-architect/08-ai-governance` | `08-ai-governance.md` |
| `cybersec-architect/security-operations` | `cybersec-architect/09-security-operations` | `09-security-operations.md` |
| `cybersec-architect/technology-investment` | `cybersec-architect/10-technology-investment` | `10-technology-investment.md` |
| `cybersec-architect/ai-investment` | `cybersec-architect/11-ai-investment` | `11-ai-investment.md` |
| `cybersec-architect/ea-deliverables` | `cybersec-architect/12-ea-deliverables` | `12-ea-deliverables.md` |
| `cybersec-architect/security-patterns` | `cybersec-architect/13-security-patterns` | `13-security-patterns.md` |
| `cybersec-architect/case-studies` | `cybersec-architect/14-case-studies` | `14-case-studies.md` |
| `cybersec-architect/emerging-trends` | `cybersec-architect/15-emerging-trends` | `15-emerging-trends.md` |

**Root cause:** Files were renamed to add numeric ordering prefixes but `sidebars.js` was not updated to match.

## Remaining sidebars.js Gaps

170 of 185 path-style references verified present. The 15 corrected above were the only mismatches.

No files were renamed or moved as part of Phase 4 — taxonomy changes were limited to frontmatter and sidebar corrections.
