#!/usr/bin/env python3
"""
Convert a PDF to Markdown, preserving reading order, with tables rendered as
real Markdown tables and images extracted as separate PNG files referenced
in place — not a flat text dump, and never an <iframe> embed.

Usage:
    python3 pdf_to_markdown.py <input.pdf> <output.md> \\
        [--img-dir static/img/<topic>] [--img-prefix mydoc] \\
        [--resolution 200]

This is a first-pass automated conversion — heading levels are inferred
from font size, which is a heuristic, not a guarantee. Always read
references/conversion-checklist.md and do the manual QA pass it describes
before treating the output as final.

Requires: pdfplumber, Pillow (pip install --break-system-packages pdfplumber pillow)
"""
import os
import sys
import argparse
import statistics
from collections import Counter

import pdfplumber


def group_words_into_lines(words, y_tolerance=3):
    """Group word dicts (with 'top','x0','text','size') into lines by
    vertical position."""
    lines = []
    current = []
    current_top = None
    for w in sorted(words, key=lambda w: (round(w["top"] / y_tolerance), w["x0"])):
        if current_top is None or abs(w["top"] - current_top) <= y_tolerance:
            current.append(w)
            current_top = w["top"] if current_top is None else current_top
        else:
            lines.append(current)
            current = [w]
            current_top = w["top"]
    if current:
        lines.append(current)
    return lines


def word_in_any_bbox(word, bboxes):
    cx = (word["x0"] + word["x1"]) / 2
    cy = (word["top"] + word["bottom"]) / 2
    for (x0, top, x1, bottom) in bboxes:
        if x0 <= cx <= x1 and top <= cy <= bottom:
            return True
    return False


def table_to_markdown(rows):
    rows = [[(c or "").replace("\n", " ").strip() for c in row] for row in rows]
    rows = [r for r in rows if any(c for c in r)]
    if not rows:
        return ""
    header, *body = rows
    ncols = len(header)
    out = ["| " + " | ".join(header) + " |"]
    out.append("| " + " | ".join(["---"] * ncols) + " |")
    for r in body:
        r = (r + [""] * ncols)[:ncols]
        out.append("| " + " | ".join(r) + " |")
    return "\n".join(out)


def classify_heading_level(size, body_size):
    if body_size <= 0:
        return None
    ratio = size / body_size
    if ratio >= 1.8:
        return 1
    if ratio >= 1.45:
        return 2
    if ratio >= 1.2:
        return 3
    return None


def convert_page(page, page_num, img_dir, img_prefix, resolution, image_counter):
    """Returns a list of (top, kind, payload) blocks for this page — NOT yet
    joined to a string, so the caller can strip running headers/footers
    across the whole document first."""
    words = page.extract_words(extra_attrs=["size"])
    tables = page.find_tables()
    table_bboxes = [t.bbox for t in tables]
    images = page.images

    blocks = []  # (top, kind, payload)

    for t in tables:
        rows = t.extract()
        md = table_to_markdown(rows)
        if md:
            blocks.append((t.bbox[1], "table", md))

    for img in images:
        bbox = (img["x0"], img["top"], img["x1"], img["bottom"])
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
        if w < 20 or h < 20:
            continue  # skip icons/bullets/decorative dots
        image_counter[0] += 1
        fname = f"{img_prefix}_p{page_num}_{image_counter[0]}.png"
        fpath = os.path.join(img_dir, fname)
        try:
            cropped = page.crop(bbox)
            im = cropped.to_image(resolution=resolution)
            os.makedirs(img_dir, exist_ok=True)
            im.save(fpath)
            rel_path = os.path.join(os.path.basename(img_dir.rstrip("/")), fname)
            blocks.append((bbox[1], "image", f"![Extracted from page {page_num}]({rel_path})"))
        except Exception as e:
            blocks.append((bbox[1], "note", f"<!-- image extraction failed on page {page_num}: {e} -->"))

    non_table_words = [w for w in words if not word_in_any_bbox(w, table_bboxes)]
    lines = group_words_into_lines(non_table_words)

    all_sizes = [w["size"] for w in words if "size" in w]
    body_size = statistics.mode(round(s) for s in all_sizes) if all_sizes else 10

    page_height = page.height
    paragraph_buf = []
    paragraph_top = None

    def flush_paragraph():
        if paragraph_buf:
            text = " ".join(paragraph_buf).strip()
            if text:
                blocks.append((paragraph_top, "text", text))
            paragraph_buf.clear()

    for line in lines:
        line_text = " ".join(w["text"] for w in line).strip()
        if not line_text:
            continue
        line_size = statistics.mean(w["size"] for w in line)
        level = classify_heading_level(line_size, body_size)
        top = line[0]["top"]
        in_header_footer_zone = top <= HEADER_FOOTER_ZONE or top >= page_height - HEADER_FOOTER_ZONE
        if in_header_footer_zone and not level:
            # Never merge header/footer-zone lines into a body paragraph —
            # keep them as standalone blocks so repeat-detection across
            # pages can isolate and strip them.
            flush_paragraph()
            blocks.append((top, "text", line_text))
        elif level:
            flush_paragraph()
            blocks.append((top, "heading", (level, line_text)))
        else:
            if not paragraph_buf:
                paragraph_top = top
            paragraph_buf.append(line_text)
    flush_paragraph()

    blocks.sort(key=lambda b: b[0])
    return blocks, page.height


HEADER_FOOTER_ZONE = 40  # points from top/bottom of page considered header/footer territory
HEADER_FOOTER_MIN_PAGES = 3  # a line must repeat on at least this many pages to be stripped


def normalize_for_repeat_detection(text):
    # Strip digits so "Page 1" / "Page 2" / "...May 2026" still match as the same running element
    return "".join(c for c in text if not c.isdigit()).strip().lower()


def strip_running_headers_footers(pages_blocks):
    """pages_blocks: list of (blocks, page_height) per page. Detects text
    blocks that repeat (near-verbatim, ignoring digits) in the header/footer
    zone across several pages, and removes them from every page."""
    candidate_counts = Counter()
    for blocks, page_height in pages_blocks:
        for top, kind, payload in blocks:
            if kind != "text":
                continue
            in_header_zone = top <= HEADER_FOOTER_ZONE
            in_footer_zone = top >= page_height - HEADER_FOOTER_ZONE
            if in_header_zone or in_footer_zone:
                norm = normalize_for_repeat_detection(payload)
                if norm:
                    candidate_counts[norm] += 1

    to_strip = {norm for norm, count in candidate_counts.items() if count >= HEADER_FOOTER_MIN_PAGES}
    if not to_strip:
        return pages_blocks

    cleaned = []
    for blocks, page_height in pages_blocks:
        new_blocks = []
        for top, kind, payload in blocks:
            if kind == "text":
                in_zone = top <= HEADER_FOOTER_ZONE or top >= page_height - HEADER_FOOTER_ZONE
                if in_zone and normalize_for_repeat_detection(payload) in to_strip:
                    continue  # drop the running header/footer
            new_blocks.append((top, kind, payload))
        cleaned.append((new_blocks, page_height))
    return cleaned


def render_blocks(blocks):
    out_lines = []
    for _top, kind, payload in blocks:
        if kind == "heading":
            level, text = payload
            out_lines.append(f"\n{'#' * (level + 1)} {text}\n")
        elif kind in ("table", "image", "note"):
            out_lines.append(f"\n{payload}\n")
        else:
            out_lines.append(payload + "\n")
    return "\n".join(out_lines)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("input_pdf")
    ap.add_argument("output_md")
    ap.add_argument("--img-dir", default=None,
                     help="Directory to save extracted images. Defaults to "
                          "static/img/<pdf-basename>/ next to a Docusaurus-style repo.")
    ap.add_argument("--img-prefix", default=None)
    ap.add_argument("--resolution", type=int, default=200)
    ap.add_argument("--max-pages", type=int, default=None)
    args = ap.parse_args()

    base = os.path.splitext(os.path.basename(args.input_pdf))[0]
    img_dir = args.img_dir or os.path.join("static", "img", base)
    img_prefix = args.img_prefix or base

    image_counter = [0]
    pages_blocks = []

    with pdfplumber.open(args.input_pdf) as pdf:
        pages = pdf.pages[: args.max_pages] if args.max_pages else pdf.pages
        for i, page in enumerate(pages, start=1):
            blocks, page_height = convert_page(page, i, img_dir, img_prefix, args.resolution, image_counter)
            pages_blocks.append((blocks, page_height))

    pages_blocks = strip_running_headers_footers(pages_blocks)
    page_texts = [render_blocks(blocks) for blocks, _h in pages_blocks]

    body = "\n\n---\n\n".join(page_texts)

    frontmatter = (
        "---\n"
        f'title: "{base}"\n'
        "date_created: \n"
        "last_reviewed: \n"
        "status: current\n"
        "supersedes: \"\"\n"
        "source_type: converted-pdf\n"
        f'source_file: "{os.path.basename(args.input_pdf)}"\n'
        "tags: []\n"
        "---\n\n"
    )

    with open(args.output_md, "w", encoding="utf-8") as f:
        f.write(frontmatter + body)

    print(f"Converted {args.input_pdf} -> {args.output_md}")
    print(f"  {len(page_texts)} pages, {image_counter[0]} images extracted to {img_dir}/")
    print("  NOTE: heading levels are font-size heuristics — review before publishing.")
    print("  Run the knowledge-page-authoring skill's lint_page.py next to check "
          "structure against the target document type.")


if __name__ == "__main__":
    main()
