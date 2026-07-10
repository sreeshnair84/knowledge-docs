---
title: "About & Site Guide"
date_created: 2026-07-07
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["about.md"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# About This Knowledge Base

A curated, open-access knowledge base covering Agentic AI, Enterprise Architecture, cloud platforms, and emerging technologies — built for practitioners, architects, and AI engineers.

---

## Site

| | |
|---|---|
| **Live URL** | [sreeshnair84.github.io/knowledge-docs](https://sreeshnair84.github.io/knowledge-docs/) |
| **Stack** | Docusaurus 3 (Modern theme) |
| **Hosting** | GitHub Pages (auto-deployed on push to `main`) |
| **Source** | [github.com/sreeshnair84/knowledge-docs](https://github.com/sreeshnair84/knowledge-docs) |

---

## How to Build Locally

```bash
npm install
npm run start          # local preview at http://127.0.0.1:3000
npm run build          # build to build/ (do not commit build/)
```

Deployment is automatic — every push to `main` triggers `.github/workflows/pages.yml` which runs `npm run build` and deploys `build/` to GitHub Pages. No manual deploy needed.

---

## Repository Structure

```
docs/                        # Docusaurus source root
  index.md                   # Home page
  <section>/
    index.md                 # Section overview
    *.md                     # Wiki guide pages (appear in sidebar nav)
    *.pdf / *.docx / *.html  # Source files served as static assets
src/css/custom.css          # Custom styling and responsive designs
src/pages/                   # Custom pages
sidebars.js                 # Full navigation configuration
docusaurus.config.js        # Full site config
.github/workflows/pages.yml # CI: npm install → npm run build → deploy
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
3. Add the file to `sidebars.js` under the correct section.

### New PDF
```html
<details>
<summary>Document Title</summary>
&lt;iframe src="/knowledge-docs/filename.pdf" width="100%" height="800px" frameborder="0">&lt;/iframe>
<p><a href="/knowledge-docs/filename.pdf" target="_blank">Open in new tab ↗</a></p>
</details>
```

### New DOCX / PPTX (Google Docs Viewer)
```html
- [Document Title](/knowledge-docs/filename.docx) *(download)*
```

### New HTML file
```html
<details>
<summary>Title</summary>
&lt;iframe src="/knowledge-docs/filename.html" width="100%" height="700px" frameborder="0" style="border:1px solid #ddd;border-radius:4px;">&lt;/iframe>
<p><a href="/knowledge-docs/filename.html" target="_blank">Open in new tab ↗</a></p>
</details>
```

### New section
1. Create `docs/<section>/index.md` with `title:` front matter.
2. Add it to `sidebars.js` under the correct section.

:::note Non-markdown files
PDF, DOCX, PPTX, HTML, JSX, and Excel files are served as static assets via static/ folder and accessed via iframe embeds in section `index.md` files.
:::

---

## Key Design Decisions

- **Static assets** — All PDFs, images, and documents are served from the `static/` folder. Reference them with absolute paths from baseUrl.
- **Responsive design** — Mobile-optimized CSS in `src/css/custom.css` handles responsive iframes and layouts.
- **Search enabled** — Built-in Docusaurus search indexes all documentation pages.
- **Sidebar navigation** — All pages are organized in `sidebars.js` and appear in the left navigation panel.
- **Sensitive documents** — Before adding any file, verify it does not contain client names, internal infrastructure details, or credentials.
