---
name: pdf-to-markdown
description: Convert a PDF into Markdown while preserving reading order, rendering tables as real Markdown tables, and extracting embedded images/diagrams as separate PNG files referenced in place — never a flat text dump and never an <iframe> embed. Use this whenever the user wants to convert, migrate, or "properly" turn a PDF into a markdown page for this knowledge-docs repo, including as part of the knowledge-repo-cleanup skill's Phase 2. Strips repeated running headers/footers automatically. Always followed by a manual QA pass (see references/conversion-checklist.md) and by the knowledge-page-authoring skill's linter — this produces a strong first draft, not a finished page.
model: sonnet
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
source_type: converted-pdf
covers_version: "N/A"
last_reviewed: 2026-07-10
---

# PDF to Markdown

Converts a PDF to Markdown using `pdfplumber`: tables are extracted with
their cell structure intact (not flattened to prose), images/diagrams are
cropped and rendered as standalone PNGs positioned where they appear in the
source, and repeated running headers/footers (page numbers, confidentiality
banners, document titles that repeat on every page) are detected and
stripped automatically. Heading levels are inferred from font size.

## Usage

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/pdf_to_markdown.py <input.pdf> <output.md> \
  --img-dir static/img/<topic-folder> \
  --img-prefix <short-name>
```

Run without `--img-dir` and it defaults to `static/img/<pdf-basename>/` —
override it to match wherever this page's images should actually live in
the Docusaurus static tree (group by topic folder, not by source filename,
so images from a multi-part series land together).

For a quick look before committing to a full conversion, add
`--max-pages N` to convert just the first N pages.

## What this does automatically

- **Tables**: extracted via `pdfplumber.find_tables()`, rendered as real
  `| --- |` Markdown tables. Text that falls inside a table's bounding box
  is excluded from surrounding paragraphs so table content isn't duplicated
  as prose.
- **Images**: any embedded image region larger than 20x20pt is cropped and
  re-rendered as a PNG at the requested resolution (default 200dpi),
  positioned in the output exactly where it appeared in the source page.
  Decorative icons/bullets smaller than that are skipped on purpose.
- **Running headers/footers**: any line sitting in the top or bottom ~40pt
  of the page that repeats (ignoring digits, so "Page 3" and "Page 4" still
  match) across 3+ pages is treated as a running header/footer and dropped
  from the body entirely.
- **Frontmatter**: writes the standard schema
  (`title`/`date_created`/`last_reviewed`/`status`/`source_type: converted-pdf`/
  `source_file`/`tags`) as a stub — `date_created` and `last_reviewed` are
  left blank for you to fill in, everything else is populated.

## What this does NOT do automatically — always check these

Read [references/conversion-checklist.md](references/conversion-checklist.md)
before treating output as final. In short:

1. **Heading levels are a font-size heuristic.** Spot-check the heading
   hierarchy, especially cover pages and TOC pages, which often produce odd
   jumps (e.g. a large title followed by a smaller subtitle at a level that
   doesn't nest cleanly).
2. **Table-of-contents pages usually collapse into one dense paragraph** —
   TOC entries are typically the same font size as body text, so they don't
   get detected as separate list items. Delete the extracted TOC text and
   replace it with a real anchor-linked Markdown TOC instead (required for
   the research-report type in the knowledge-page-authoring skill anyway).
3. **Multi-column layouts are not detected** — this reads left-to-right by
   vertical position, so a genuine two-column page will interleave the two
   columns' text. Check any page you know was multi-column in the source.
4. **Header/footer stripping needs 3+ repeated pages** — on very short
   documents (1-2 pages) a running footer may not repeat enough times to be
   auto-detected; check short conversions by hand.

## After conversion

1. Fill in `date_created` / `last_reviewed` in the frontmatter.
2. Run the QA checklist above.
3. If the `knowledge-page-authoring` skill is installed, identify the page's
   document type and run its linter:
   ```bash
   python3 <path-to-knowledge-page-authoring>/scripts/lint_page.py <output.md> --type <type>
   ```
   The converted page will need the type-specific frontmatter fields and
   section structure added — this script only produces the generic
   universal frontmatter and a font-size-based heading structure, not a
   type-conformant page.
4. If this conversion is retiring a source PDF as part of a cleanup (per the
   `knowledge-repo-cleanup` skill), don't delete the PDF until this output
   has been reviewed and committed — archive it, per that skill's
   guardrails, rather than deleting outright.
5. Delete the intermediate PDF's `<iframe>` wrapper page, if one existed, and
   redirect any links that pointed to it to the new Markdown page.
