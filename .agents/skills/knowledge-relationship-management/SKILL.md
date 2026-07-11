---
name: knowledge-relationship-management
description: Maintain single-source-of-truth relationships in the knowledge-docs repository. Use when detecting duplicate content, normalizing tags, adding cross-references or Related Topics, recommending canonical pages, or maintaining the machine-readable knowledge index.
---

# Knowledge Relationship Management

1. Use `_meta/knowledge-index.json` to identify candidates by tag, document type, folder, and inbound/outbound links before opening full documents.
2. Run `check_against_corpus.py` for a new or materially rewritten page. Treat 85%+ similarity as a stop condition; treat 60–85% as a merge-or-supplement decision.
3. Choose one canonical page for a durable concept. Replace repeated explanations with a concise contextual sentence and a cross-link.
4. Use lowercase, hyphenated tags. Apply 3–7 tags: one domain, one or two concepts, optional technology, and optional audience or lifecycle stage. Do not use title words as filler tags.
5. Add a short Related Topics section only when it directs readers to distinct, high-value neighboring material; avoid link lists that duplicate the sidebar.
6. Regenerate `_meta/knowledge-index.json` after accepted changes.
