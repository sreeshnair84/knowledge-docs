#!/usr/bin/env python3
"""Validate (and optionally fix) YAML front matter in docs/*.md files.

Run by pre-commit on every staged docs/*.md file.
  validate-frontmatter hook  — no --fix flag; blocks commit on errors
  fix-frontmatter hook       — --fix flag; auto-removes deprecated fields before validating
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

import yaml

# 7 required fields — every docs/*.md must have all of these
REQUIRED: set[str] = {
    "title",
    "date_created",
    "last_reviewed",
    "status",
    "source_type",
    "source_file",
    "tags",
}

# These fields are stripped on every touched file by fix-frontmatter
DEPRECATED: set[str] = {"date", "doc_type", "covers_version"}

# supersedes is kept only when it holds a real slug; remove if empty
NOISE_WHEN_EMPTY: set[str] = {"supersedes"}

VALID_STATUS: set[str] = {"current", "archived"}
VALID_SOURCE_TYPE: set[str] = {"native-md", "pdf-converted"}
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
FM_RE = re.compile(r"\A---[ \t]*\r?\n(.*?)\r?\n---[ \t]*\r?\n", re.DOTALL)


def _parse(text: str) -> tuple[dict | None, str | None]:
    m = FM_RE.match(text)
    if not m:
        return None, "no YAML front matter block found"
    try:
        fm = yaml.safe_load(m.group(1))
    except yaml.YAMLError as exc:
        return None, f"invalid YAML: {exc}"
    if not isinstance(fm, dict):
        return None, "front matter is not a key-value mapping"
    return fm, None


def _validate(path: str, fm: dict) -> list[str]:
    errors: list[str] = []

    for field in sorted(REQUIRED - fm.keys()):
        errors.append(f"{path}: missing required field '{field}'")

    for field in sorted(DEPRECATED & fm.keys()):
        errors.append(f"{path}: deprecated field '{field}' must be removed (run fix-frontmatter)")

    for field in sorted(NOISE_WHEN_EMPTY & fm.keys()):
        if fm[field] in ("", None):
            errors.append(f"{path}: '{field}' is empty — remove it or set it to a real slug")

    status = fm.get("status")
    if status is not None and status not in VALID_STATUS:
        errors.append(f"{path}: 'status' must be one of {sorted(VALID_STATUS)}, got '{status}'")

    source_type = fm.get("source_type")
    if source_type is not None and source_type not in VALID_SOURCE_TYPE:
        errors.append(
            f"{path}: 'source_type' must be one of {sorted(VALID_SOURCE_TYPE)}, got '{source_type}'"
        )

    for date_field in ("date_created", "last_reviewed"):
        val = fm.get(date_field)
        if val is not None and not DATE_RE.match(str(val)):
            errors.append(f"{path}: '{date_field}' must be YYYY-MM-DD, got '{val}'")

    tags = fm.get("tags")
    if tags is not None and not isinstance(tags, list):
        errors.append(f"{path}: 'tags' must be a list, got {type(tags).__name__}")

    return errors


def _fix(path_obj: Path, text: str, fm: dict) -> bool:
    """Remove deprecated and empty-noise fields. Returns True if file was changed."""
    m = FM_RE.match(text)
    if not m:
        return False

    to_remove: set[str] = set()
    to_remove |= DEPRECATED & fm.keys()
    to_remove |= {f for f in NOISE_WHEN_EMPTY if f in fm and fm[f] in ("", None)}

    if not to_remove:
        return False

    fm_lines = m.group(1).splitlines(keepends=True)
    clean_lines: list[str] = []
    for line in fm_lines:
        key = line.split(":")[0].strip()
        if key in to_remove:
            continue
        clean_lines.append(line)

    new_fm_block = "---\n" + "".join(clean_lines) + "---\n"
    new_text = new_fm_block + text[m.end():]
    path_obj.write_text(new_text, encoding="utf-8")
    return True


def main() -> int:
    fix_mode = "--fix" in sys.argv
    files = [f for f in sys.argv[1:] if not f.startswith("--")]

    all_errors: list[str] = []
    fixed: list[str] = []

    for filepath in files:
        path_obj = Path(filepath)
        if not path_obj.exists():
            continue
        text = path_obj.read_text(encoding="utf-8")
        fm, parse_err = _parse(text)
        if parse_err:
            all_errors.append(f"{filepath}: {parse_err}")
            continue

        assert fm is not None

        if fix_mode:
            if _fix(path_obj, text, fm):
                fixed.append(filepath)
                text = path_obj.read_text(encoding="utf-8")
                fm, _ = _parse(text)
                if fm is None:
                    continue

        assert fm is not None
        all_errors.extend(_validate(filepath, fm))

    if fixed:
        print(f"[fix-frontmatter] cleaned deprecated fields in {len(fixed)} file(s):")
        for f in fixed:
            print(f"  {f}")

    if all_errors:
        for err in all_errors:
            print(err, file=sys.stderr)
        return 1

    return 0


if __name__ == "__main__":
    sys.exit(main())
