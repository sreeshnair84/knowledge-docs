# Research Report

**Example to match:** `ai-protocols/mcp/MCP_Deep_Research_2026.md`

## When to use
A comprehensive, sourced deep-dive on a technology, market, or ecosystem
topic — this is the type most exposed to going stale, so dating and sourcing
discipline matters more here than anywhere else in the repo.

## Additional frontmatter
```yaml
covers_through: ""        # e.g. "spec versions through 2025-11-25 and the 2026-07-28 RC" — be as specific as MCP_Deep_Research_2026.md's coverage line
research_date: YYYY-MM-DD  # when the research was actually conducted, separate from date_created
```

## Required section skeleton
1. H1 title.
2. Dated banner immediately under the title stating exactly what's covered
   and as-of when — match the "Critical Research · April 2026 (updated July
   2026) · Covers spec versions through..." pattern exactly. This line is
   the single most important sentence in the document for a reader deciding
   whether to trust it.
3. Table of Contents with anchor links — required for any report over
   ~2,000 words.
4. Numbered H2 sections following the TOC order exactly.

## Depth-of-research rubric
- Every non-obvious factual claim needs a source — a link, a named
  spec/document/vendor announcement, or explicit "as reported by X." Claims
  without attribution get flagged by the duplicate-check/lint tooling as
  "unsourced" and should be fixed before publishing, not left as
  house-style prose.
- The dated coverage banner must be updated whenever the report is
  substantively revised — "updated July 2026" in the existing example is
  doing real work, don't let a report silently drift out of date with a
  banner that still says the original date.
- Minimum ~3,000 words for something billed as a "deep research" report —
  shorter than that, it's a guide (references/guide.md) or a summary, not a
  deep-dive, and should be titled/framed accordingly.

## Formatting notes
- Use a real anchor-linked TOC, not a flat list of section names — readers
  use these reports for lookup, not linear reading.
