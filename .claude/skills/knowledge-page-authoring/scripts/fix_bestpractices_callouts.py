"""
Fix agentic_platform_bestpractices.md:
  1. Fix title frontmatter
  2. Convert cover 1-col table to heading
  3. Fix Section 1 bullet list
  4. Convert all callout 1-col tables to Docusaurus admonitions
  5. Wrap code 1-col tables in fenced code blocks
  6. Remove duplicate table header rows
  7. Add Resolution: labels in Section 8
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
TARGET = ROOT / "docs/agentic-systems/platform/agentic_platform_bestpractices.md"


def fix_title(content: str) -> str:
    return content.replace(
        'title: "Table of Contents"',
        'title: "Enterprise Agentic Platform Best Practices"',
        1,
    )


def fix_cover_block(content: str) -> str:
    # Replace the 1-col cover table with a plain heading block
    content = re.sub(
        r"\| ENTERPRISE AGENTIC PLATFORM(.+?) \|\n\| --- \|\n",
        lambda m: (
            "\n**ENTERPRISE AGENTIC PLATFORM — Best Practices, Antipatterns & Implementation Guide**\n\n"
            "*Strands Agents · AgentCore · MCP · ADFS/FT Rights · Multitenancy · Langfuse*\n\n"
        ),
        content,
        count=1,
        flags=re.DOTALL,
    )
    return content


def fix_key_findings(content: str) -> str:
    """Add bullet markers to the run-on findings list in Section 1."""
    BULLETS = [
        "AgentCore reached General Availability",
        "AgentCore Identity now natively supports",
        "AgentCore Gateway now includes",
        "Strands Agents SDK ships with",
        "AgentCore Runtime provides",
        "Strands Agent SOPs",
    ]
    for bullet in BULLETS:
        content = content.replace(f"\n{bullet}", f"\n- {bullet}")
    return content


# Emoji/prefix → admonition type
CALLOUT_MAP = [
    (re.compile(r"^[ℹ️ ]+\s*NOTE\s+", re.UNICODE),    ":::note",                         ":::"),
    (re.compile(r"^✅\s+BEST PRACTICE\s+"),             ":::tip[✅ Best Practice]",         ":::"),
    (re.compile(r"^❌\s+ANTIPATTERN\s+"),               ":::danger[❌ Antipattern]",        ":::"),
    (re.compile(r"^⚠️\s+WARNING\s+"),                   ":::warning",                      ":::"),
]
CODE_RE = re.compile(r"^#\s*(✅|❌)")


def classify_callout(text: str):
    """Return (open, close) admonition tags or ('```python', '```') for code."""
    stripped = text.strip()
    if CODE_RE.match(stripped):
        return "```python", "```"
    for pattern, open_tag, close_tag in CALLOUT_MAP:
        if pattern.match(stripped):
            body = pattern.sub("", stripped).strip()
            return open_tag, close_tag, body
    return None


def fix_callout_tables(content: str) -> str:
    """Convert all 1-column callout tables to admonitions."""
    lines = content.split("\n")
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Detect: | text |\n| --- |
        if (
            line.startswith("| ")
            and line.endswith(" |")
            and i + 1 < len(lines)
            and lines[i + 1].strip() == "| --- |"
        ):
            # Check it's a single-column table (no inner | separating columns)
            inner = line[2:-2]
            # Multi-column: inner has unescaped |
            # Simple heuristic: if inner contains " | " it's multi-col
            # But callout text can contain | as well — check if next-next line exists
            # and is also a data row (multi-col table has data rows following)
            is_multi_col = (
                i + 2 < len(lines)
                and lines[i + 2].startswith("| ")
                and lines[i + 2].endswith(" |")
                and lines[i + 2] != "| --- |"
            )
            if not is_multi_col:
                result = classify_callout(inner)
                if result:
                    if len(result) == 2:
                        # Code block
                        open_tag, close_tag = result
                        out.append("")
                        out.append(open_tag)
                        out.append(inner)
                        out.append(close_tag)
                        out.append("")
                    else:
                        open_tag, close_tag, body = result
                        out.append("")
                        out.append(open_tag)
                        out.append("")
                        out.append(body)
                        out.append("")
                        out.append(close_tag)
                        out.append("")
                    i += 2  # skip the | --- | line
                    continue
        out.append(line)
        i += 1
    return "\n".join(out)


def fix_duplicate_header_rows(content: str) -> str:
    """Remove duplicate table header rows (header appears twice before first data row)."""
    # Pattern: header_row \n separator_row \n same_header_row \n separator_row
    content = re.sub(
        r"(\| .+? \|\n\| [-| :]+\|\n)(\1)",
        r"\1",
        content,
        flags=re.MULTILINE,
    )
    return content


def fix_resolution_labels(content: str) -> str:
    """Add **Resolution:** before bullet lists following :::warning blocks in Section 8."""
    # Find :::warning ... ::: blocks followed by bullet lists without a Resolution label
    def _add_resolution(m):
        warning_block = m.group(1)
        bullets = m.group(2)
        if "Resolution" in warning_block or "Resolution" in bullets[:30]:
            return m.group(0)
        return warning_block + "\n**Resolution:**\n" + bullets

    content = re.sub(
        r"(:::warning\n.*?:::)\n(\n- )",
        _add_resolution,
        content,
        flags=re.DOTALL,
    )
    return content


def process(path: Path) -> None:
    content = path.read_text(encoding="utf-8", errors="replace")
    content = fix_title(content)
    content = fix_cover_block(content)
    content = fix_key_findings(content)
    content = fix_callout_tables(content)
    content = fix_duplicate_header_rows(content)
    content = fix_resolution_labels(content)
    # Collapse excess blank lines
    content = re.sub(r"\n{4,}", "\n\n\n", content)
    path.write_text(content, encoding="utf-8")
    print(f"Fixed: {path.relative_to(ROOT)}")


if __name__ == "__main__":
    process(TARGET)
