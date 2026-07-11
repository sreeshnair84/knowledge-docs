---
name: knowledge-content-quality
description: Repair and validate Markdown quality in the knowledge-docs repository. Use when fixing converted documents, headings, tables, code fences, callouts, Mermaid diagrams, images, metadata, links, or document structure and readability.
---

# Knowledge Content Quality

1. Run the repository audit and limit work to the agreed queue or document.
2. Preserve semantic content while repairing mechanical defects. Do not silently invent missing diagrams, citations, or data.
3. Apply the universal frontmatter schema and one-H1 rule from `knowledge-page-authoring`.
4. Render tables as Markdown, fence code with a language where known, use standard Markdown images, and use Mermaid only where a diagram improves understanding.
5. Check heading nesting, unmatched fences, local links, blank-line runs, alt text, and mobile-readable tables.
6. For converted PDF/DOCX content, use `pdf-to-markdown` before manual polish.
7. Run `lint_page.py --universal` and `check_against_corpus.py` from `knowledge-page-authoring` on each completed page. Run `npm run build` for batches that change navigation or MDX-sensitive content.
