# Multi-Part / Volume Series

**Example of the failure mode to avoid:** the original audit found
`github-copilot` Part01/04/07/11/13/14 overlapping 50-60% with each other,
and `ai-protocols/auth` Volume2-4 overlapping 78-92% with their own
converted-markdown companions. Both are cases of this template not being
followed — each part re-explained prior context instead of linking to it.

## When to use
Content too large for one page (a full course, a deep multi-stage technical
series) that must be split across multiple files.

## Additional frontmatter (every part in the series)
```yaml
series_name: ""           # shared across all parts, e.g. "EntraID 3LO Agent Auth"
series_part: 0             # this part's number
series_total: 0             # total parts, so a reader/tool can tell if the series is incomplete
series_index: ""            # path to the series' own index/landing page
```

## Required structure
1. A single series index page listing every part with a one-sentence
   description of what's unique to that part — this is the ONLY place a
   full series overview belongs.
2. Each part opens with a one-sentence "previously" line linking back to the
   prior part (e.g. "Continues from [Part 2: Implementation](...)") — not a
   recap paragraph restating prior content.
3. Each part covers genuinely distinct ground from every other part. Before
   writing a new part, check the series index for what's already covered —
   if the new content substantially overlaps an existing part, it belongs
   in that part, not a new one.
4. The series' final part ends with a short "what's next" pointer if the
   series continues, or a wrap-up if complete — don't leave `series_total`
   ambiguous.

## Depth-of-research rubric
- **Zero-recap rule**: run `check_against_corpus.py` against the *other
  parts of the same series specifically* before finishing any part — if a
  new part scores above 40% similarity against a sibling part, that's the
  recap-duplication failure mode recurring, not acceptable series structure.
- If a PDF/DOCX source is being split into a markdown series (as with the
  Auth Volumes), the original PDF gets retired per the cleanup skill's
  Phase 3 rules once the markdown series covers it — a PDF and its
  markdown-series conversion must never coexist as two live sources for the
  same content.
- Prefer fewer, more substantial parts over many thin ones — a series
  should be split by genuine topic boundary, not by arbitrary length.

## Formatting notes
- Consistent numbering scheme across a series (Part 1, Part 2... or Volume
  1, Volume 2...) — don't mix numbering styles within one series.
