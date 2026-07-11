#!/usr/bin/env python3
"""
Convert a PDF to Markdown using pymupdf4llm (ML-based layout detection).

Advantages over the old pdfplumber approach:
  - Code blocks detected via monospace font → properly fenced as ``` blocks
  - Multi-column layouts handled by ML layout model (pymupdf_layout)
  - Headings inferred from font weight/size hierarchy, not just size ratio
  - Vector graphics rendered as PNG via page rendering (not pixel bounding box)
  - Tables extracted with borderless-table support via configurable strategy
  - Running headers/footers suppressed via margins parameter

Usage:
    python pdf_to_markdown.py <input.pdf> <output.md> \\
        [--img-dir static/img/<topic-folder>] \\
        [--img-prefix <short-name>] \\
        [--resolution 200] \\
        [--max-pages N]

Requires: pymupdf4llm (pip install pymupdf4llm)
"""
import os
import re
import sys
import argparse
import shutil

try:
    import pymupdf4llm
except ImportError:
    print("ERROR: pymupdf4llm not installed. Run: pip install pymupdf4llm", file=sys.stderr)
    sys.exit(1)


def fix_image_references(md_text, img_dir, img_prefix, base_name):
    """
    pymupdf4llm saves images as <pdf_full_name>-NNNN-NN.png (note: includes .pdf
    in stem, e.g. 'my-doc.pdf-0008-02.png') and references them with the
    image_path prefix.

    This function:
      1. Matches all image references using the img_dir prefix
      2. Renames files to use img_prefix (e.g. 'my-doc-img-p8-1.png')
      3. Converts paths from 'static/img/...' to '/img/...' (Docusaurus absolute)
    """
    # Match any image reference starting with img_dir
    img_dir_esc = re.escape(img_dir.replace('\\', '/'))
    auto_pattern = re.compile(
        r'!\[([^\]]*)\]\((' + img_dir_esc + r'[/\\]([^)]+\.png))\)'
    )

    renamed = {}
    counter = [0]

    def rename_match(m):
        alt, old_path, fname = m.group(1), m.group(2), m.group(3)
        # Normalize path separators
        old_path_norm = old_path.replace('\\', '/')
        img_dir_norm = img_dir.replace('\\', '/')
        old_abs = os.path.join(img_dir, fname).replace('\\', '/')

        if old_abs not in renamed:
            counter[0] += 1
            # Extract page number from pymupdf4llm naming: name.pdf-0008-02.png
            page_match = re.search(r'-(\d+)-\d+\.png$', fname)
            pg = page_match.group(1).lstrip('0') or '0' if page_match else str(counter[0])
            new_name = f"{img_prefix}-p{pg}-{counter[0]}.png"
            new_abs = os.path.join(img_dir, new_name).replace('\\', '/')
            try:
                if os.path.exists(old_abs):
                    shutil.move(old_abs, new_abs)
                    renamed[old_abs] = new_abs
                else:
                    renamed[old_abs] = old_abs
            except Exception:
                renamed[old_abs] = old_abs

        final = renamed.get(old_abs, old_abs)
        # Convert to Docusaurus /img/... absolute path (strip 'static' prefix)
        norm_final = final.replace('\\', '/')
        if '/static/' in norm_final:
            rel = '/' + norm_final.split('/static/', 1)[1]
        elif norm_final.startswith('static/'):
            rel = '/' + norm_final[len('static/'):]
        else:
            rel = '/' + norm_final
        label = alt or f"Figure {counter[0]}"
        return f'![{label}]({rel})'

    return auto_pattern.sub(rename_match, md_text)


def _normalize_for_repeat(line):
    """Strip digits and whitespace so 'Page 3' and 'Page 4' compare equal."""
    import re
    return re.sub(r'\d+', '', line).strip().lower()


def strip_running_headers_footers(md_text, min_pages=3):
    """
    Remove lines that appear (near-verbatim, ignoring digits) on 3+ separate
    'pages'.  We approximate page boundaries by splitting on Markdown
    horizontal rules (---) or the literal text 'Page N'.

    Also strips single-line fenced code blocks (``` ... ```) whose content
    repeats 3+ times — these are typically page-footer date stamps or document
    title banners that pymupdf4llm detected as monospace text.
    """
    import re
    from collections import Counter

    # --- Pass 1: strip repeating single-line code blocks ----------------------
    # Pattern: ``` followed by content on next line, then ``` — all repeating
    code_block_re = re.compile(
        r'^```[^\n]*\n([^\n`]{1,120})\n```\s*$',
        re.MULTILINE
    )
    code_content_counts: Counter = Counter()
    for m in code_block_re.finditer(md_text):
        norm = _normalize_for_repeat(m.group(1))
        if norm and len(norm) > 2:
            code_content_counts[norm] += 1

    repeated_code = {norm for norm, cnt in code_content_counts.items()
                     if cnt >= min_pages}

    def maybe_strip_code_block(m):
        norm = _normalize_for_repeat(m.group(1))
        if norm in repeated_code:
            return ''
        return m.group(0)

    md_text = code_block_re.sub(maybe_strip_code_block, md_text)

    # --- Pass 2: strip repeating plain-text lines ----------------------------
    # Split into segments (approximate page chunks)
    segments = re.split(r'^(?:---|Page\s+\d+\s*)$', md_text, flags=re.MULTILINE)
    if len(segments) < min_pages:
        # Too short to do meaningful repeat detection; just remove "Page N" lines
        md_text = re.sub(r'^Page\s+\d+\s*$', '', md_text, flags=re.MULTILINE)
        return md_text

    # Count how many page-segments each normalized line appears in
    line_page_count: Counter = Counter()
    for seg in segments:
        seen_in_seg = set()
        for raw_line in seg.splitlines():
            stripped = raw_line.strip()
            if not stripped:
                continue
            # Skip image references — they all normalize the same (page nums removed)
            # and should never be treated as running headers.
            if stripped.startswith('!['):
                continue
            # Skip table rows — they're content, not headers.
            if stripped.startswith('|'):
                continue
            # Strip markdown bold/italic markers for comparison
            clean = re.sub(r'\*+', '', stripped).strip()
            norm = _normalize_for_repeat(clean)
            if norm and len(norm) > 3:  # skip very short tokens
                seen_in_seg.add(norm)
        for norm in seen_in_seg:
            line_page_count[norm] += 1

    to_strip = {norm for norm, count in line_page_count.items()
                if count >= min_pages}

    if not to_strip:
        # Still remove bare "Page N" lines
        md_text = re.sub(r'^Page\s+\d+\s*$', '', md_text, flags=re.MULTILINE)
        return md_text

    result_lines = []
    for raw_line in md_text.splitlines():
        stripped = raw_line.strip()
        # Always drop bare "Page N" lines
        if re.fullmatch(r'Page\s+\d+', stripped):
            continue
        clean = re.sub(r'\*+', '', stripped).strip()
        norm = _normalize_for_repeat(clean)
        if norm and norm in to_strip:
            continue  # drop running header/footer
        result_lines.append(raw_line)

    return '\n'.join(result_lines)


def clean_cover_code_blocks(md_text):
    """
    Remove spurious ``` fenced blocks on the cover page that are actually
    sidebar labels / decorative elements detected as monospace by pymupdf4llm.
    Heuristic: short (< 5 words) fenced blocks before the first ## heading.
    """
    import re
    # Find position of first real ## heading
    first_heading = re.search(r'^#{1,4}\s+\S', md_text, re.MULTILINE)
    if not first_heading:
        return md_text

    preamble = md_text[:first_heading.start()]
    rest = md_text[first_heading.start():]

    # Remove short fenced code blocks from preamble
    preamble = re.sub(
        r'```[^\n]*\n([^\n`]{0,100})\n```',
        lambda m: m.group(1).strip() if len(m.group(1).split()) > 4 else '',
        preamble
    )
    return preamble + rest


def build_frontmatter(base_name, source_pdf_name):
    return (
        "---\n"
        f'title: "{base_name}"\n'
        "date_created: \n"
        "last_reviewed: \n"
        "status: current\n"
        'supersedes: ""\n'
        "source_type: converted-pdf\n"
        f'source_file: "{source_pdf_name}"\n'
        "tags: []\n"
        "---\n\n"
        f"<!-- converted from {source_pdf_name} -->\n\n"
    )


def main():
    ap = argparse.ArgumentParser(
        description="Convert PDF to Markdown using pymupdf4llm (ML layout detection)."
    )
    ap.add_argument("input_pdf", help="Path to source PDF")
    ap.add_argument("output_md", help="Path to write output Markdown")
    ap.add_argument(
        "--img-dir", default=None,
        help="Directory for extracted images. Default: static/img/<pdf-basename>/",
    )
    ap.add_argument(
        "--img-prefix", default=None,
        help="Filename prefix for extracted images. Default: pdf basename.",
    )
    ap.add_argument(
        "--resolution", type=int, default=200,
        help="DPI for image/graphics extraction (default: 200)",
    )
    ap.add_argument(
        "--max-pages", type=int, default=None,
        help="Convert only the first N pages (preview mode)",
    )
    ap.add_argument(
        "--table-strategy", default="lines",
        choices=["lines_strict", "lines", "explicit"],
        help="Table detection strategy. 'lines' catches borderless tables too (default).",
    )
    ap.add_argument(
        "--margins", type=int, default=40,
        help="Points from page top/bottom to suppress (strips running headers/footers). Default: 40.",
    )
    args = ap.parse_args()

    base = os.path.splitext(os.path.basename(args.input_pdf))[0]
    img_dir = args.img_dir or os.path.join("static", "img", base)
    img_prefix = args.img_prefix or base

    # Build 0-based page list if --max-pages given
    pages = list(range(args.max_pages)) if args.max_pages else None

    # Ensure image output directory exists
    os.makedirs(img_dir, exist_ok=True)

    # Count images already in img_dir so we can diff
    existing_imgs = set(os.listdir(img_dir))

    print(f"Converting: {args.input_pdf}")
    print(f"  Output:     {args.output_md}")
    print(f"  Image dir:  {img_dir}")
    print(f"  DPI:        {args.resolution}")

    md = pymupdf4llm.to_markdown(
        args.input_pdf,
        pages=pages,
        write_images=True,
        image_path=img_dir,
        image_format="png",
        dpi=args.resolution,
        margins=(args.margins, 0, args.margins, 0),  # top, left, bottom, right
        table_strategy=args.table_strategy,
        page_separators=False,   # no ---- page breaks in output
        force_text=True,
        show_progress=False,
    )

    # Rename images to use img_prefix and fix markdown references
    md = fix_image_references(md, img_dir, img_prefix, base)

    # Post-process: strip running headers/footers and cover-page code artifacts
    md = strip_running_headers_footers(md, min_pages=3)
    md = clean_cover_code_blocks(md)

    # Count newly extracted images
    new_imgs = set(os.listdir(img_dir)) - existing_imgs
    img_count = len(new_imgs)

    # Write output
    os.makedirs(os.path.dirname(args.output_md) or ".", exist_ok=True)
    frontmatter = build_frontmatter(base, os.path.basename(args.input_pdf))

    with open(args.output_md, "w", encoding="utf-8") as f:
        f.write(frontmatter + str(md))

    print(f"\nConverted: {args.input_pdf}")
    print(f"Output:    {args.output_md}")
    print(f"  {img_count} image(s) extracted to {img_dir}/")
    if img_count == 0:
        print("  NOTE: No raster images found. Vector diagrams require manual screenshots.")
    print("  NOTE: Review section headings, tables, and code blocks before publishing.")
    print("  Run knowledge-page-authoring lint_page.py for structural QA.")


if __name__ == "__main__":
    main()
