---
name: pdf-to-markdown
description: Convert a PDF or DOCX file into Markdown while preserving reading order, rendering tables as real Markdown tables, properly fencing code blocks, and extracting embedded images/diagrams as separate PNG files referenced in place — never a flat text dump and never an <iframe> embed. PDF uses pymupdf4llm with ML-based layout detection; DOCX uses python-docx. Use this whenever the user wants to convert, migrate, or "properly" turn a PDF or DOCX into a markdown page for this knowledge-docs repo, including as part of the knowledge-repo-cleanup skill's Phase 2. Strips repeated running headers/footers automatically. Always followed by a manual QA pass (see references/conversion-checklist.md) and by the knowledge-page-authoring skill's linter — this produces a strong first draft, not a finished page.
model: sonnet
date_created: 2026-07-10
last_reviewed: 2026-07-11
status: current
source_type: native-md
covers_version: "N/A"
---

# PDF to Markdown

Converts a PDF to Markdown using **`pymupdf4llm`** with ML-based layout detection
(`pymupdf_layout`). Key advantages over plain text extraction:

- **Code blocks**: monospace font detection → properly fenced ` ``` ` blocks with language hints
- **Multi-column layouts**: ML model detects and correctly orders columns (no more interleaved text)
- **Tables**: borderless tables detected via `table_strategy="lines"`, rendered as real `| --- |` tables
- **Images**: raster images extracted as PNGs; vector graphics noted for manual screenshot
- **Running headers/footers**: stripped by both the `margins` parameter AND a post-processing
  repeat-detection pass (catches headers that pdfplumber's margin zone missed)
- **Cover page cleanup**: short decorative code blocks (sidebar labels, section numbers) removed

## Usage

```bash
python ${CLAUDE_SKILL_DIR}/scripts/pdf_to_markdown.py <input.pdf> <output.md> \
  --img-dir static/img/<topic-folder> \
  --img-prefix <short-name>
```

Run without `--img-dir` and it defaults to `static/img/<pdf-basename>/`.
Override to group images by topic folder (so a multi-part series lands in one place).

```bash
# Preview first 5 pages only
python ${CLAUDE_SKILL_DIR}/scripts/pdf_to_markdown.py input.pdf out.md --max-pages 5

# For PDFs with very tall headers (> 72pt from top), increase margins
python ${CLAUDE_SKILL_DIR}/scripts/pdf_to_markdown.py input.pdf out.md --margins 90

# For PDFs with borderless/whitespace-only tables, use 'lines' strategy (default)
# For PDFs where that creates noise, use 'lines_strict'
python ${CLAUDE_SKILL_DIR}/scripts/pdf_to_markdown.py input.pdf out.md --table-strategy lines_strict
```

**Requires:** `pymupdf4llm` (pip install pymupdf4llm)
**Note on python3 vs python:** On Windows the `python3` alias may point to the Microsoft Store stub.
Use `python` to invoke the real installation: `python pdf_to_markdown.py ...`

### DOCX conversion

```bash
python ${CLAUDE_SKILL_DIR}/scripts/docx_to_md.py <input.docx> <output.md>
```

**Requires:** `python-docx` (pip install python-docx)

### Batch PDF conversion

```bash
# Convert every PDF under docs/ that lacks an .md counterpart
python ${CLAUDE_SKILL_DIR}/scripts/pdf_batch_to_md.py --docs-dir docs --img-dir static/img
```

### Post-conversion QA

```bash
# Verify converted MD content coverage against original source file
python ${CLAUDE_SKILL_DIR}/scripts/verify_md_against_source.py <output.md> <source.pdf>

# Fix quality issues in bulk (running headers, excessive blank lines, page numbers)
python ${CLAUDE_SKILL_DIR}/scripts/fix_pdf_md_quality.py <output.md>

# Patch frontmatter on already-converted MDs missing required fields
python ${CLAUDE_SKILL_DIR}/scripts/patch_converted_frontmatter.py docs/<section>/
```

## What this does automatically

- **Tables**: `pymupdf4llm` finds tables including borderless ones. Rendered as `| --- |` Markdown.
- **Code blocks**: monospace-font text → fenced ` ``` ` blocks. Multi-line code preserved.
- **Images**: raster images saved as PNGs in `--img-dir`. Vector-only PDFs produce 0 images — screenshot those manually.
- **Running headers/footers**: two-pass suppression — `margins` parameter strips content near page edges, then a repeat-detection pass removes text appearing on 3+ pages.
- **Cover page**: short decorative code blocks (section number sidebars, logo labels) are cleaned up automatically.
- **Frontmatter stub**: writes `title`/`date_created`/`last_reviewed`/`status`/`source_type: converted-pdf`/`source_file`/`tags` — fill in `date_created`, `last_reviewed`, `tags`, `doc_type`, and `covers_version` before publishing.

## What this does NOT do automatically — always check these

Read [references/conversion-checklist.md](references/conversion-checklist.md)
before treating output as final. In short:

1. **Heading hierarchy still needs review.** pymupdf4llm does well on most PDFs but cover pages
   and TOC pages can produce odd heading jumps. Spot-check `#`/`##`/`###` nesting.
2. **Table-of-contents pages** are often extracted as a wall of text. Replace with a real
   anchor-linked Markdown TOC (required for research-report type in knowledge-page-authoring anyway).
3. **Vector diagrams produce 0 PNG files.** Screenshot each diagram from the original PDF at
   200dpi and save to `static/img/<topic>/`. Then add `![Caption](/img/<topic>/name.png)` in place.
4. **Cover page labels** (sidebar boxes, tool logos) may appear as garbled single-line code blocks.
   The script cleans short ones automatically; check for any remaining artifacts and remove manually.

## After conversion

1. Fill in `date_created` / `last_reviewed` in the frontmatter.

2. **Register in sidebars.js.** Every converted page MUST be added to the
   correct category in `sidebars.js` before it counts as done. A page not in
   sidebars.js is an orphan — it builds but is invisible in navigation and
   cannot be linked to reliably (see the broken-link pattern where Docusaurus
   strips numeric prefixes from unregistered docs). Look at the surrounding
   category entries to determine the right placement.

3. **Verify section demarcation.** The font-size heuristic for headings is
   imperfect. After conversion, manually confirm:
   - Every major section (introduction, methodology, key findings, appendices)
     is demarcated with an `##` heading, not buried in a wall of prose.
   - Subheadings use `###` and `####` in consistent, nested order.
   - Page-break joins haven't merged section headings into the paragraph that
     follows them — look for a lone capitalized sentence that should be a
     heading but wasn't detected as one.
   - Tables and diagrams appear IMMEDIATELY after the section text that
     introduces them, not displaced to the bottom of the document.

4. **Verify all tables are present.** Compare the table count in the original
   PDF against the converted output. Common failure mode: pdfplumber misses
   borderless tables (tables drawn with whitespace and alignment rather than
   borders). For any missing table, manually reconstruct it from the PDF
   text as a Markdown `| --- |` table.

5. **Verify all diagrams are present.** Open each extracted PNG. Common
   failure modes: blank PNG (image was vector, not raster — screenshot it
   manually), partially cropped PNG (bounding box clipped), missing diagram
   (pdfplumber skipped an image below the 20×20pt threshold that was
   actually important). For vector diagrams that pdfplumber cannot extract,
   screenshot the PDF page at high resolution and save as PNG.

6. **UX polish before publishing.** A raw conversion is a draft, not a
   finished page. Before treating it as done:
   - Replace `# Document Title\n\nPage 1` cover artifacts with just the title.
   - Convert dense wall-of-text introductions into a short lead paragraph
     (2–3 sentences) followed by a bullet list of what the document covers.
   - Add a `## Table of Contents` with real anchor links if the document is
     longer than 10 sections (replace extracted TOC text, which is always
     garbled).
   - Check that the page renders correctly in `npm run start` — load it in
     the browser and scroll through it.

7. Run the QA checklist (`references/conversion-checklist.md`).

8. Run the `knowledge-page-authoring` linter:
   ```bash
   python3 <path-to-knowledge-page-authoring>/scripts/lint_page.py <output.md> --type <type>
   ```

9. If this conversion is retiring a source PDF, archive the PDF (don't
   delete it) and remove or redirect any `<iframe>` wrapper page that
   pointed to it.
