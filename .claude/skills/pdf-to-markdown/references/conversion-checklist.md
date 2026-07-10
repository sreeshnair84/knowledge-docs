# Post-Conversion QA Checklist

Run through this on every converted page before considering it done. None of
these are automatable with the current script — they need a human/model read.

## Structure
- [ ] Heading hierarchy makes sense top to bottom (no H4 appearing before
      the first H2, no two consecutive same-level headings that should
      actually be parent/child).
- [ ] The table of contents section (if the source had one) has been
      replaced with a real anchor-linked Markdown TOC, not left as the raw
      extracted paragraph.
- [ ] Any page that was genuinely multi-column in the source PDF has been
      manually re-checked — automated extraction reads by vertical position
      and will interleave columns.

## Tables
- [ ] Every table has the correct number of columns in every row (extraction
      occasionally drops a cell on merged/spanned cells — compare against
      the original PDF page).
- [ ] Table headers are in row 1, not accidentally pulled from a caption
      above the table.

## Images
- [ ] Every extracted image is the actual diagram/chart, not a blank or
      partially-cropped region — open each PNG and check.
- [ ] Image resolution is legible (bump `--resolution` and re-run for that
      page if a diagram has small text that's blurry at the default 200dpi).
- [ ] Alt text (`![Extracted from page N](...)`) has been replaced with a
      real, descriptive alt text once you know what the image actually shows.
- [ ] Images live under the correct topic folder in `static/img/`, not
      scattered by source-PDF name — group by where the content topic
      actually lives in the site, not where the PDF happened to sit.

## Content fidelity
- [ ] No leftover running header/footer text anywhere in the body — search
      for the document's title string and "page" to catch anything the
      auto-stripper missed (it needs 3+ repeats to trigger; short documents
      may need manual cleanup).
- [ ] No orphaned page-break artifacts (`---` separators from the
      page-to-page join) sitting in the middle of a sentence that
      originally continued across a page boundary — merge those paragraphs
      back together.
- [ ] Footnotes/endnotes, if present in the source, have been reattached
      near their reference point — the script doesn't associate these
      automatically.

## Sidebar and navigation
- [ ] Page is added to the correct category in `sidebars.js` — not an orphan.
- [ ] If the page is part of a multi-part series, ALL parts of the series
      are listed under the same sidebar category, in order.
- [ ] Any index or overview page for the section links to this page with a
      relative `./filename.md` path (not an absolute `/knowledge-docs/…` URL
      and not a bare filename without `.md` extension).

## Section demarcation and UX
- [ ] Every major section is headed with `##` (not buried in prose).
- [ ] Page-break joins haven't merged a section heading into adjacent text.
- [ ] Tables appear immediately after the text that introduces them.
- [ ] Diagrams appear immediately after the section that references them.
- [ ] Cover-page artifacts (large title followed by "Page 1", date stamps,
      confidentiality banners repeated in the body) have been removed.
- [ ] The page has been loaded in `npm run start` and visually reviewed in
      the browser — not just checked as raw Markdown text.

## Frontmatter and typing
- [ ] `date_created` and `last_reviewed` filled in (left blank by the
      script).
- [ ] Document type identified and the `knowledge-page-authoring` skill's
      type-specific frontmatter fields and required sections added.
- [ ] `source_file` matches the actual original PDF filename, for
      provenance.

## Source retirement
- [ ] If this conversion is replacing a live PDF (not just a one-off
      extraction), confirm the old PDF is archived (not deleted) and any
      `<iframe>` wrapper page pointing to it is removed or redirected, per
      the `knowledge-repo-cleanup` skill's Phase 3 rules.
