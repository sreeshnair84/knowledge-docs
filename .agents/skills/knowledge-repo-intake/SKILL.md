---
name: knowledge-repo-intake
description: Given a prompt (a research request) or a file (PDF/HTML/DOCX/PPTX/other document), figure out which folder/page of this knowledge-docs repo it belongs to, then either (a) deep-research the topic and write a new artifact following this repo's standards, or (b) extract the file's content and use it to enrich the repo — updating an existing page if one already covers the ground, or creating a new one if not. Always runs a grounding check on factual claims before publishing. Use this any time the user hands you a topic to research and add, or a document to bring into the repo. This is the front door — it dispatches to knowledge-repo-cleanup, pdf-to-markdown, and knowledge-page-authoring at the right points rather than duplicating their logic.
model: sonnet
---

# Knowledge Repo Intake

Two possible inputs, one shared pipeline after step 1:

```
INPUT (prompt or file)
   │
   ▼
1. Classify: research prompt, or source document?
   │
   ▼
2. Find placement — does this update an existing page, or need a new one?
   │
   ├─ research prompt ──▶ 3a. Deep research (WebSearch/WebFetch)
   │                          references/research-path.md
   │
   └─ source document ──▶ 3b. Extract content
                              references/document-path.md
   │
   ▼
4. Grounding check — verify every factual claim before it goes in the repo
   references/grounding-check.md
   │
   ▼
5. Apply this repo's standards (knowledge-page-authoring: type, frontmatter, lint)
   │
   ▼
6. Final duplicate check, commit
```

## Step 1 — Classify the input

- A plain-text ask naming a topic, question, or gap ("research X and add it,"
  "we're missing content on Y," "write up Z for the repo") → **research
  prompt**, go to 3a.
- An attached/referenced file (PDF, HTML, DOCX, PPTX, TXT, a URL to fetch) →
  **source document**, go to 3b.
- If the input is genuinely both (e.g. "here's a vendor PDF, research it
  further and expand it") — do 3b first to ground in the source, then 3a to
  fill gaps the source doesn't cover, then merge into one draft before the
  grounding check.

## Step 2 — Find placement (always do this before drafting anything)

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/find_placement.py --text "<topic summary or extracted text>"
```

This compares the input against every existing file under `docs/` (same
method as `knowledge-page-authoring`'s duplicate checker) and reports:
- Whether an existing page already covers this closely enough that it
  should be **updated** rather than duplicated (≥60% similarity to a
  specific file).
- If not, which folder the content most likely belongs in, based on where
  the closest-related existing content lives.
- If neither — genuinely new ground, no strong folder signal — say so and
  propose a folder based on the repo's existing taxonomy rather than
  inventing a new top-level section without reason.

Don't skip this because the topic "obviously" needs a new page — this
script exists because that assumption is exactly how the original repo
ended up with 329 overlapping file pairs.

## Step 3a — Deep research (research-prompt path)

See [references/research-path.md](references/research-path.md) for search
scaling, sourcing, and copyright rules. In short: search proportionally to
the topic's breadth (a narrow factual gap might need 3-5 searches; "research
the current state of X" needs closer to 15-20), read primary/official
sources over aggregators, and never copy source text verbatim into the
repo — paraphrase, same as any other Codex output.

## Step 3b — Extract content (source-document path)

See [references/document-path.md](references/document-path.md) for the
per-filetype dispatch. In short: PDFs go through the `pdf-to-markdown`
skill, HTML goes through WebFetch or a direct convert, DOCX/PPTX go through
the `docx`/`pptx` skills' extraction guidance — don't hand-roll extraction
for a format this repo already has tooling for.

## Step 4 — Grounding check (always, both paths)

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/extract_claims.py <draft.md>
```

This flags every sentence containing a number, percentage, date, version
string, dollar figure, or unattributed superlative ("industry-leading,"
"the first to," "proven to") — the claim types most likely to be
fabricated or carried over inaccurately. For each flagged claim:
- **Research path**: confirm it's actually supported by one of the sources
  you searched — not just plausible-sounding. If you can't find support for
  it, cut it or soften it to "reportedly" / remove the specific number.
- **Document path**: confirm it's actually present in the source document —
  don't let a specific figure get invented while paraphrasing. If the
  source didn't say it, the draft shouldn't either.

Don't treat this as optional busywork — this is the step that keeps
"depth of research" from becoming "confident-sounding but ungrounded."
See [references/grounding-check.md](references/grounding-check.md) for the
full method, including how to handle claims you can't verify either way.

## Step 5 — Apply repo standards

Hand off to the `knowledge-page-authoring` skill: identify the document
type from its nine types, add the required frontmatter and section
structure, run its `lint_page.py`. If Step 2 identified this as an update
to an existing page rather than a new one, integrate the new content into
that page's existing structure and voice — bump `last_reviewed`, don't
append a mismatched new section at the bottom.

## Step 6 — Final duplicate check and handoff

Run `check_against_corpus.py` (from `knowledge-page-authoring`) one more
time against the finished draft — Step 2's placement check ran against the
topic/summary before research or extraction happened; content actually
drafted can drift from that summary. Only after this passes should the page
be considered ready to commit.
