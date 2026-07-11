#!/usr/bin/env python3
"""Create a deterministic health report for the Markdown knowledge corpus."""

from __future__ import annotations

import argparse
import json
import re
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

REQUIRED_FRONTMATTER = {
    "title", "date_created", "last_reviewed", "status", "source_type",
    "source_file", "doc_type", "tags",
}
FRONTMATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.DOTALL)
HEADING = re.compile(r"^(#{1,6})\s+(.+?)\s*$", re.MULTILINE)
MARKDOWN_LINK = re.compile(r"(?<!!)\[[^\]]*\]\(([^)]+)\)")


def parse_frontmatter(text: str) -> dict[str, str]:
    match = FRONTMATTER.match(text)
    if not match:
        return {}
    data = {}
    for line in match.group(1).splitlines():
        if ":" in line and not line.lstrip().startswith("#"):
            key, value = line.split(":", 1)
            data[key.strip()] = value.strip().strip('"\'')
    return data


def is_local_target(target: str) -> bool:
    return not (target.startswith(("http:", "https:", "mailto:", "#", "/")) or "://" in target)


def audit(root: Path) -> dict:
    docs = root / "docs"
    sidebar = (root / "sidebars.js").read_text(encoding="utf-8") if (root / "sidebars.js").exists() else ""
    pages = sorted(docs.rglob("*.md"))
    findings: dict[str, list[dict]] = defaultdict(list)
    titles: dict[str, list[str]] = defaultdict(list)
    doc_types = Counter()
    tags = Counter()

    for page in pages:
        relative = page.relative_to(root).as_posix()
        doc_id = page.relative_to(docs).with_suffix("").as_posix()
        text = page.read_text(encoding="utf-8", errors="replace")
        frontmatter = parse_frontmatter(text)
        if not frontmatter:
            findings["missing_frontmatter"].append({"file": relative})
        else:
            missing = sorted(REQUIRED_FRONTMATTER - frontmatter.keys())
            if missing:
                findings["incomplete_frontmatter"].append({"file": relative, "missing": missing})
            title = frontmatter.get("title", "").casefold()
            if title:
                titles[title].append(relative)
            else:
                findings["missing_title"].append({"file": relative})
            if frontmatter.get("doc_type"):
                doc_types[frontmatter["doc_type"]] += 1
            raw_tags = frontmatter.get("tags", "")
            for tag in re.findall(r"[\w-]+", raw_tags):
                tags[tag.casefold()] += 1

        headings = [(len(level), heading) for level, heading in HEADING.findall(text)]
        if not headings or headings[0][0] != 1:
            findings["invalid_h1"].append({"file": relative})
        for (previous, _), (current, heading) in zip(headings, headings[1:]):
            if current > previous + 1:
                findings["heading_level_jump"].append({"file": relative, "heading": heading, "from": previous, "to": current})
        if text.count("```") % 2:
            findings["unclosed_fence"].append({"file": relative})
        if re.search(r"\n{5,}", text):
            findings["excessive_blank_lines"].append({"file": relative})
        if "<iframe" in text.casefold():
            findings["iframe_embed"].append({"file": relative})
        if f"'{doc_id}'" not in sidebar and f'"{doc_id}"' not in sidebar:
            findings["sidebar_orphan_candidate"].append({"file": relative, "doc_id": doc_id})

        for target in MARKDOWN_LINK.findall(text):
            target = target.split("#", 1)[0].strip()
            if is_local_target(target) and target:
                candidate = (page.parent / target).resolve()
                if not candidate.exists():
                    findings["broken_relative_link"].append({"file": relative, "target": target})

    for title, paths in titles.items():
        if len(paths) > 1:
            findings["duplicate_title"].append({"title": title, "files": paths})

    return {
        "generated": date.today().isoformat(),
        "pages_scanned": len(pages),
        "document_types": dict(sorted(doc_types.items())),
        "top_tags": tags.most_common(30),
        "findings": {kind: items for kind, items in sorted(findings.items())},
        "summary": {kind: len(items) for kind, items in sorted(findings.items())},
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", default=".", type=Path)
    parser.add_argument("--output", type=Path)
    args = parser.parse_args()
    report = audit(args.root.resolve())
    payload = json.dumps(report, indent=2) + "\n"
    if args.output:
        args.output.write_text(payload, encoding="utf-8")
    else:
        print(payload, end="")


if __name__ == "__main__":
    main()
