# Guide

**Example to match:** `coding-tools/claude/claude-api-mastery.md`

## When to use
A how-to / reference document teaching a tool, API, or workflow — organized
by feature or task, not by narrative or timeline.

## Additional frontmatter
```yaml
covers_version: ""     # e.g. "as of June 2026" — guides date fast, always state the version/date the content is accurate to
```

## Required section skeleton
1. H1 title + one-paragraph scope statement naming exactly what's covered
   and the "as of" date, same pattern as claude-api-mastery.md's opening line.
2. H2 per major feature/capability area, in the order a reader would
   actually use them (setup → basic use → advanced → troubleshooting), not
   alphabetical.
3. Each H2 with runnable code examples in fenced blocks with a language tag
   — not prose description of code.
4. A final "Related" or "Next steps" section linking to adjacent guides
   rather than repeating their content.

## Depth-of-research rubric
- Every code example must be runnable as written (correct imports, no
  placeholder ellipses standing in for required syntax).
- State the tool/API version or date the guide is accurate to, visibly, near
  the top — guides are the fastest-decaying content type in this repo and
  this is the single biggest lever against silent staleness.
- Target 1,500–4,000 words for a focused single-tool guide. If it's
  covering more ground than that, it's probably actually a multi-part series
  — see references/multi-part-series.md instead of one long guide.

## Formatting notes
- Prefer runnable code blocks over tables for API parameters when the
  parameters have interesting default/example values worth showing in
  context.
- Use a real Markdown table only for scannable reference data (endpoint
  lists, parameter names + types), not for narrative content.

## Framework and library constraints (this repo)
- **Do not reference Microsoft agent frameworks**: Semantic Kernel and AutoGen
  are excluded from this repo's architecture documentation by owner preference.
  Use LangGraph, CrewAI, PydanticAI, Google ADK, or Mastra instead.
- **Always use the latest LTS/stable version** in `covers_version` frontmatter
  and in ALL code examples (imports, pip install pins, version comments).
  Never write an older version number — always verify the latest stable release
  before writing. As of July 2026 known versions:
    - LangGraph: 1.2.8
    - CrewAI: 0.80
    - PydanticAI: 0.0.54
    - Google ADK: 1.0
    - Mastra: 0.10
    - MCP Python SDK: 1.8
    - Anthropic Python SDK: 0.40
    - Temporal Python SDK: 1.x (check pypi.org before citing)
  Stale version numbers erode reader trust and cause "it doesn't work"
  feedback — treat version accuracy as a correctness requirement, not a style
  preference. If you are uncertain of the current LTS version, state
  "verify at pypi.org/npm" rather than guessing.
