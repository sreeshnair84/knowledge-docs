# MD Conversion Verification Checklist

Use this checklist when manually comparing a converted `.md` file against its original PDF or DOCX source.

---

## Per-File Checklist

### 1. Title & Frontmatter
- [ ] Title in frontmatter matches original document title
- [ ] `doc_type` is set correctly (guide, research-report, etc.)
- [ ] `date_created` reflects original document date (not conversion date)
- [ ] Source file reference is accurate in `source_file` field

### 2. Document Structure
- [ ] All major section headings (`H1` / `H2` / `H3`) are present
- [ ] Heading hierarchy is correct (H2 under H1, not H1 → H3)
- [ ] Section order matches the original document
- [ ] Table of contents entries (if original had ToC) match actual sections

### 3. Text Content
- [ ] Word count of `.md` body is ≥ 65% of original PDF word count (PDF word count includes headers/footers; 65% is the lower bound after stripping)
- [ ] No obviously missing paragraphs (compare first and last paragraph of each major section)
- [ ] Technical terms, acronyms, and proper nouns are preserved correctly
- [ ] Numbered/bulleted lists are complete — count items in original vs. MD
- [ ] Code snippets / command examples are inside fenced code blocks (` ``` `)
- [ ] No repeated running header or page number lines (search for "Page \d" patterns)

### 4. Tables
- [ ] All tables are present (count tables in original vs. MD)
- [ ] Table column headers are correct
- [ ] Table row count matches original (spot-check 2–3 tables per document)
- [ ] Pipe-separated Markdown table syntax is valid (no missing `|`)
- [ ] Multi-row cell merges are approximated (Markdown has no merged cells — confirm content is not lost)

### 5. Images & Diagrams
- [ ] Images referenced in the original are noted or described in MD (Markdown cannot embed rasterised PDF images — confirm no critical diagram was silently dropped)
- [ ] ASCII art diagrams (if any) are intact inside code fences
- [ ] Charts/infographics: check if described in surrounding text or if a caption reference remains
- [ ] Architectural diagrams: confirm the MD has equivalent textual description or a link to the original asset

### 6. Formatting
- [ ] Bold/italic emphasis preserved on key terms
- [ ] Footnotes or endnotes: content incorporated into body or listed at end
- [ ] Callout boxes / admonitions present (rendered as `:::note` or `> blockquote`)
- [ ] No stray Unicode replacement characters (`�` or `â€™`) indicating encoding issues

### 7. Cross-References & Links
- [ ] Internal cross-references intact (section anchors resolve)
- [ ] External URLs preserved and not broken during conversion
- [ ] No `[object Object]` or empty `[]()` link artifacts

---

## Batch Verification Script

Run `scripts/verify_md_against_source.py` to get a quick automated summary for each file:

```bash
python3 scripts/verify_md_against_source.py docs/<section>/<file>.md
# or all files:
python3 scripts/verify_md_against_source.py --all
```

Output columns:
| Column | Meaning |
|--------|---------|
| `word_ratio` | MD body words ÷ PDF words (target: ≥ 0.65) |
| `tables_md` | Number of `|---` table separators found in MD |
| `headings_md` | Number of `##` headings in MD |
| `encoding_issues` | Count of `�` replacement characters |
| `page_num_lines` | Remaining `Page N` or bare-number lines (should be 0) |
| `status` | PASS / WARN / FAIL |

---

## Priority Files to Review Manually

These files had the lowest word-count retention during conversion and may have layout issues:

| File | Word Ratio | Known Issue |
|------|-----------|-------------|
| `docs/agentic-systems/harness/Harness_BestPractices_AntiPatterns_Roadmap.md` | ~68% | Short — verify no sections dropped |
| `docs/agentic-systems/harness/Harness_Security_SupplyChain_Observability.md` | ~72% | Short — verify tables |
| `docs/agentic-systems/harness/Harness_Interview_Question_Bank.md` | ~74% | Short — count questions |
| `docs/soft-skills/CTO_Voice_Mastery_Program.md` | Check | DOCX convert — verify formatting |
| `docs/soft-skills/Storytelling_Exercise_Workbook.md` | Check | DOCX convert — verify exercises |
| `docs/quantum/IBM_Developer_Quantum_CertGuide.md` | Check | DEL char in title was fixed; check body |
| `docs/agentic-systems/platform/agentic_platform_bestpractices.md` | Check | DOCX convert — very long |

---

## What Cannot Be Verified Automatically

- **Embedded images**: PDFs with rasterized diagrams lose them on conversion. These need manual visual check of the original PDF.
- **Multi-column layouts**: pymupdf4llm reads columns left-to-right which may merge unrelated text. Compare section-by-section.
- **Complex nested tables**: Markdown flattens nested tables. Verify no data is lost.
- **Footnotes**: Most converters inline footnotes or drop them. Check originals with superscript numbers.
- **Page breaks used as logical separators**: Some PDFs use whitespace/page breaks to separate sections — these may merge in MD.

---

## Files with Known Image Loss

These source documents contain non-text diagrams that could not be converted to Markdown. Review originals manually for missing visual content:

- Architecture diagrams in `docs/enterprise-architecture/` files (EA frameworks often have diagrams)
- Sequence diagrams in `docs/ai-usecases/eu-bank-ai-copilot-complete.md`
- Network topology diagrams in `docs/cloud-platforms/` files

For these, the corresponding `.html` files in `docs/` (e.g., `eu-bank-sequence-diagrams.html`) may contain the original diagram as interactive content.
