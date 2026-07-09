# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site

**Live URL:** https://sreeshnair84.github.io/knowledge-docs/
**Stack:** MkDocs + Material theme (Python), deployed via GitHub Actions to GitHub Pages.

## Build & Preview

```bash
pip install -r requirements.txt   # installs material, git-revision-date, glightbox, minify
mkdocs serve                      # local preview at http://127.0.0.1:8000
mkdocs build                      # build to site/ (do not commit site/)
```

Deployment is automatic — every push to `main` triggers `.github/workflows/pages.yml` which runs `mkdocs build` and deploys `site/` to GitHub Pages. No manual deploy needed.

## Repository Structure

```
docs/                        # MkDocs source root (docs_dir)
  index.md                   # Home page — grid cards with Material icons
  <section>/
    index.md                 # Section overview + embedded file viewers
    *.md                     # Wiki guide pages (appear in sidebar nav)
    *.pdf / *.docx / *.html  # Source files served as static assets
docs/stylesheets/extra.css   # Responsive iframe styles, mobile PDF button
docs/javascripts/pdf-viewer.js  # Mobile: swaps PDF iframes → Google Docs Viewer
hooks/docs_gen.py            # Build hook: auto-generates <details> viewer blocks
mkdocs.yml                   # Full site config: nav, theme, extensions
requirements.txt             # All Python dependencies (used by CI and local dev)
.github/workflows/pages.yml  # CI: pip install -r requirements.txt → mkdocs build → deploy
```

All 13 topic sections follow the same pattern: `docs/<section>/index.md` is the wiki overview page listed in `nav:` under "Overview"; additional `.md` files in the same folder are listed as child nav entries.

## Auto-generation Hook

`hooks/docs_gen.py` runs at build time via the MkDocs `on_page_markdown` event. For every `index.md`, it scans the same directory for non-markdown assets and injects a `## Documents` block of `<details>` viewer iframes between `<!-- AUTO-DOCS-START -->` and `<!-- AUTO-DOCS-END -->` markers.

**What this means for adding content:**

- **Dropping a PDF/DOCX/HTML file into a section folder is sufficient** — the hook generates the viewer block automatically. You do not need to hand-write `<details>` blocks unless you want custom ordering, a custom title, or content that differs from the auto-generated default.
- The hook overwrites the `AUTO-DOCS-*` region on every build; edits inside those markers are lost. Place custom content *above* `<!-- AUTO-DOCS-START -->`.
- File types handled: `.pdf`, `.html` (inline iframe); `.docx`, `.pptx`, `.xlsx` (Google Docs Viewer); `.jsx`, `.excalidraw`, `.txt` (download-only link).
- `index.md` and `README.md` are excluded from the scan (`SKIP` set in `docs_gen.py`).

## Adding Content

### New markdown guide
1. Drop the `.md` file into the relevant `docs/<section>/` folder.
2. Add a front matter block at the top — **always include `date:`**:
   ```yaml
   ---
   title: Page Title
   date: YYYY-MM-DD
   ---
   ```
   Use today's actual date (ISO 8601 format). The `date:` field is displayed by the `git-revision-date-localized` plugin and serves as the canonical creation date for the page.
3. Add the file to `nav:` in `mkdocs.yml` under the correct section.

### New PDF / DOCX / HTML / JSX
1. Drop the file into `docs/<section>/`.
2. **The build hook auto-generates the viewer block** — no manual edits to `index.md` are needed unless you want a custom title or ordering. To override, add a `<details>` block *above* `<!-- AUTO-DOCS-START -->` in `index.md`.

   If you need a custom viewer block (e.g. to override the auto-generated title), use these templates:

   **PDF:**
   ```html
   <details>
   <summary>Document Title</summary>
   <iframe src="filename.pdf" width="100%" height="800px" frameborder="0"></iframe>
   <p><a href="filename.pdf" target="_blank">Open in new tab ↗</a></p>
   </details>
   ```

   **DOCX / PPTX** (Google Docs Viewer):
   ```html
   <details>
   <summary>Document Title</summary>
   <iframe src="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/sreeshnair84/knowledge-docs/main/docs/<section>/filename.docx&embedded=true" width="100%" height="750px" frameborder="0"></iframe>
   <p><a href="filename.docx" download>Download ↓</a></p>
   </details>
   ```

   **HTML:**
   ```html
   <details>
   <summary>Title</summary>
   <iframe src="filename.html" width="100%" height="700px" frameborder="0" style="border:1px solid #ddd;border-radius:4px;"></iframe>
   <p><a href="filename.html" target="_blank">Open in new tab ↗</a></p>
   </details>
   ```

3. Non-markdown files are auto-excluded from nav via `not_in_nav` in `mkdocs.yml` — no extra config needed.

### New section
1. Create `docs/<section>/index.md` with `title:` and `date:` front matter:
   ```yaml
   ---
   title: Section Title
   date: YYYY-MM-DD
   ---
   ```
2. Add it to `nav:` in `mkdocs.yml` with at minimum an `Overview:` entry.

## Key Design Decisions

- **`{{ site.baseurl }}` must never be used** — this repo switched from Jekyll to MkDocs. MkDocs uses relative URLs; all `iframe src` values are relative to the section folder.
- **PDF mobile handling** is done entirely in `docs/javascripts/pdf-viewer.js` — on viewports < 768px it rewrites PDF iframe srcs to Google Docs Viewer and injects an "Open PDF ↗" button.
- **Icons on the home page** require the `pymdownx.emoji` extension (configured in `mkdocs.yml`). Use `:material-<name>:` syntax from the Material icon set.
- **Sensitive documents**: before adding any file, check it does not contain client names, internal infrastructure details, or credentials. Use `pypdf` + `python-docx` to scan text content.

## Searching Document Content

To scan PDFs and DOCX files for sensitive terms (requires `pip install pypdf python-docx`):

```python
import os, re
from pypdf import PdfReader
import docx

pattern = re.compile(r'term1|term2', re.IGNORECASE)
for root, _, files in os.walk("docs"):
    for fname in files:
        fpath = os.path.join(root, fname)
        text = ""
        if fname.endswith(".pdf"):
            text = "\n".join(p.extract_text() or "" for p in PdfReader(fpath, strict=False).pages)
        elif fname.endswith(".docx"):
            text = "\n".join(p.text for p in docx.Document(fpath).paragraphs)
        if pattern.search(text):
            print(fpath)
```
