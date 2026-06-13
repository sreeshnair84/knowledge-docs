---
title: About & Site Guide
---

# About This Knowledge Base

A curated, open-access knowledge base covering Agentic AI, Enterprise Architecture, cloud platforms, and emerging technologies — built for practitioners, architects, and AI engineers.

---

## Site

| | |
|---|---|
| **Live URL** | [sreeshnair84.github.io/knowledge-docs](https://sreeshnair84.github.io/knowledge-docs/) |
| **Stack** | MkDocs + Material theme (Python) |
| **Hosting** | GitHub Pages (auto-deployed on push to `main`) |
| **Source** | [github.com/sreeshnair84/knowledge-docs](https://github.com/sreeshnair84/knowledge-docs) |

---

## How to Build Locally

```bash
pip install mkdocs-material>=9.5
mkdocs serve          # local preview at http://127.0.0.1:8000
mkdocs build          # build to site/ (do not commit site/)
```

Deployment is automatic — every push to `main` triggers `.github/workflows/pages.yml` which runs `mkdocs build` and deploys `site/` to GitHub Pages. No manual deploy needed.

---

## Repository Structure

```
docs/                        # MkDocs source root
  index.md                   # Home page — grid cards with Material icons
  <section>/
    index.md                 # Section overview + embedded file viewers
    *.md                     # Wiki guide pages (appear in sidebar nav)
    *.pdf / *.docx / *.html  # Source files served as static assets
docs/stylesheets/extra.css   # Responsive iframe styles
docs/javascripts/pdf-viewer.js  # Mobile: swaps PDF iframes → Google Docs Viewer
mkdocs.yml                   # Full site config: nav, theme, extensions
.github/workflows/pages.yml  # CI: pip install → mkdocs build → deploy
```

---

## Adding Content

### New markdown guide
1. Drop the `.md` file into the relevant `docs/<section>/` folder.
2. Add front matter at the top:
   ```yaml
   ---
   title: Page Title
   ---
   ```
3. Add the file to `nav:` in `mkdocs.yml` under the correct section.

### New PDF
```html
<details>
<summary>Document Title</summary>
<iframe src="filename.pdf" width="100%" height="800px" frameborder="0"></iframe>
<p><a href="filename.pdf" target="_blank">Open in new tab ↗</a></p>
</details>
```

### New DOCX / PPTX (Google Docs Viewer)
```html
<details>
<summary>Document Title</summary>
<iframe src="https://docs.google.com/viewer?url=https://raw.githubusercontent.com/sreeshnair84/knowledge-docs/main/docs/<section>/filename.docx&embedded=true" width="100%" height="750px" frameborder="0"></iframe>
<p><a href="filename.docx" download>Download ↓</a></p>
</details>
```

### New HTML file
```html
<details>
<summary>Title</summary>
<iframe src="filename.html" width="100%" height="700px" frameborder="0" style="border:1px solid #ddd;border-radius:4px;"></iframe>
<p><a href="filename.html" target="_blank">Open in new tab ↗</a></p>
</details>
```

### New section
1. Create `docs/<section>/index.md` with `title:` front matter.
2. Add it to `nav:` in `mkdocs.yml` with at minimum an `Overview:` entry.

!!! note "Non-markdown files"
    PDF, DOCX, PPTX, HTML, JSX, and Excel files are auto-excluded from nav via `not_in_nav` in `mkdocs.yml` — no extra config needed. They are served as static assets and accessed via iframe embeds in section `index.md` files.

---

## Key Design Decisions

- **Relative URLs only** — MkDocs uses relative URLs; all `iframe src` values are relative to the section folder. Never use absolute GitHub raw URLs for PDFs.
- **PDF mobile handling** is done in `docs/javascripts/pdf-viewer.js` — on viewports < 768px it rewrites PDF iframe srcs to Google Docs Viewer and injects an "Open PDF ↗" button.
- **Icons on the home page** use `:material-<name>:` syntax from the Material icon set (requires `pymdownx.emoji` extension).
- **Sensitive documents** — before adding any file, verify it does not contain client names, internal infrastructure details, or credentials.

---

## Sensitive Content Check

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
