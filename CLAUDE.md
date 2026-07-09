# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Site

**Live URL:** https://sreeshnair84.github.io/knowledge-docs/
**Stack:** Docusaurus (React/Node.js), deployed via GitHub Actions to GitHub Pages.

## Build & Preview

```bash
npm install                   # installs dependencies
npm run start                 # local preview at http://localhost:3000 (hot reload)
npm run build                 # build to build/ (do not commit build/)
```

Deployment is automatic — every push to `main` triggers `.github/workflows/pages.yml` which runs `npm run build` and deploys the static site to GitHub Pages. No manual deploy needed.

## Repository Structure

```
docs/                        # Docusaurus content directory
  index.md                   # Home page
  <section>/
    index.md                 # Section overview page
    *.md                     # Wiki guide pages (referenced in sidebars.js)
    *.pdf / *.docx / *.html  # Source files served as static assets
docusaurus.config.js         # Full site config: theme, plugins, metadata
sidebars.js                  # Navigation structure (replaces mkdocs.yml)
package.json                 # Node.js dependencies and build scripts
.github/workflows/pages.yml  # CI: npm install → npm run build → deploy
```

Navigation is defined in `sidebars.js` using Docusaurus structure: categories, subcategories, and doc references. This replaces the `nav:` section of mkdocs.yml.

## Adding Content

### New markdown guide
1. Drop the `.md` file into the relevant `docs/<section>/` folder.
2. Add front matter at the top with `title:` and optionally `date:`:
   ```yaml
   ---
   title: Page Title
   date: YYYY-MM-DD
   ---
   ```
3. Add the file to `sidebars.js` under the correct category. Reference the file by its path relative to docs/: `'ai-foundations/my-page'` (no .md extension).

### New PDF / DOCX / HTML / JSX
1. Drop the file into `docs/<section>/`.
2. Reference it in a markdown doc or add a link in `sidebars.js` if it should appear in navigation.
3. Files are served as static assets; Docusaurus does not auto-generate viewer blocks.

### New section
1. Create `docs/<section>/index.md` with `title:` front matter.
2. Add a new category in `sidebars.js`:
   ```javascript
   {
     type: 'category',
     label: 'Section Label',
     items: [
       'section/index',
       // other docs in this section
     ],
   }
   ```

## Key Design Decisions

- **Navigation via sidebars.js** — Docusaurus uses `sidebars.js` for all navigation structure. Categories, labels, and doc ordering are defined here, not in individual markdown files.
- **Relative URLs** — Use relative paths for internal links (e.g., `../other-section/page`). Docusaurus handles routing automatically.
- **Static assets** — PDFs, images, and other files in `docs/` are served as-is. Add links in markdown or reference them programmatically.
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
