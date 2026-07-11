# Research Path

For inputs that are a topic/prompt, not a source file.

## Scale search effort to the actual gap

- A narrow factual question ("what's the current CCAF exam passing score")
  — 1-3 searches, confirm and move on.
- "We're missing coverage of X" for a bounded technical topic — 5-10
  searches: the thing itself, its main alternatives/competitors, recent
  changes/versions, at least one primary/official source.
- "Research the current state of X" for a broad topic (matching this repo's
  existing research-report type, e.g. MCP_Deep_Research_2026.md's scope) —
  15-20+ searches across sub-topics; don't try to cover a whole ecosystem
  from 3 queries.
- If the topic would genuinely need more than ~25-30 searches to cover
  properly, say so and suggest breaking it into a multi-part-series (see
  the `knowledge-page-authoring` skill's reference for that type) rather
  than one page, or suggest the user's Research feature for something this
  repo-intake skill isn't scoped to do in one pass.

## Source quality

- Prefer official docs, vendor announcements, standards bodies, and
  original reporting over aggregators, forums, or SEO content — same bar as
  any other research task.
- For anything version/date-sensitive (which is most of this repo's
  technical content), get the actual current version/date, don't rely on
  training knowledge that may predate it.
- Note where sources disagree rather than silently picking one — the
  existing research-report example (MCP_Deep_Research_2026.md) explicitly
  covers "configuration incompatibilities" and contested tradeoffs, not
  just a clean consensus narrative.

## Writing it up — copyright rules apply here same as anywhere else

This is content going into a repo, but it's still Claude output built from
search results, so the standard rules apply in full:
- Paraphrase in your own words — never lift sentences from a source, even
  a short phrase strung together from one source.
- Any direct quote must be under 15 words, and no more than one quote per
  source.
- Never reproduce anything resembling the source's paragraph structure —
  restructure around this repo's document-type template, not the source
  article's outline.
- Cite what you can (link to the source), but citation doesn't license
  closer paraphrasing — a citation plus a near-verbatim rewrite is still a
  violation.

## After drafting

Go to the grounding check (Step 4 in SKILL.md) before anything else —
research-path content is exactly where fabricated-sounding-plausible
numbers creep in, since a model drafting from multiple sources can
misattribute a stat from one source to a different claim.
