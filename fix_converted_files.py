#!/usr/bin/env python3
"""
One-shot fix script for the newly-converted HTML→Markdown files.

Fixes applied to every file in FILES:
  1. Add meaningful tags to frontmatter
  2. Add covers_version: "2026" for doc_type: guide
  3. Add doc_type / last_reviewed where missing (policy volumes)
  4. Demote the second H1 in the body to H2 (decorative HTML banner)
  5. Wrap code-block lines (start with '# ' + code syntax) in code fences
  6. Fix heading level jumps: H2→H4 → change H4 to H3
"""
import re
import sys

FILES = {
    "docs/agentic-systems/skill/a2a_deep_research.md": {
        "tags": ["a2a", "protocols", "agent-communication", "research"],
        "covers_version": "2026",
    },
    "docs/ai-foundations/transformer_architectures.md": {
        "tags": ["transformers", "llm", "ai-foundations", "architecture"],
        "covers_version": "2026",
    },
    "docs/ai-foundations/transformer_concepts_deep.md": {
        "tags": ["transformers", "llm", "ai-foundations", "deep-dive"],
        "covers_version": "2026",
    },
    "docs/cloud-platforms/azure/azure_agent_architecture.md": {
        "tags": ["azure", "cloud", "agent-architecture", "reference-architecture"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_1_Claude_Code.md": {
        "tags": ["claude-code", "cheatsheet", "coding-tools", "quick-reference"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_2_Agent_SDK.md": {
        "tags": ["agent-sdk", "cheatsheet", "coding-tools", "quick-reference"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_3_MCP.md": {
        "tags": ["mcp", "cheatsheet", "coding-tools", "quick-reference"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_4_AI_Fluency.md": {
        "tags": ["ai-concepts", "cheatsheet", "coding-tools", "quick-reference"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_5_Prompt_Engineering.md": {
        "tags": ["prompt-engineering", "cheatsheet", "coding-tools", "quick-reference"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_6_Claude_CLI.md": {
        "tags": ["claude-cli", "cheatsheet", "coding-tools", "quick-reference"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_7_Claude_Ecosystem.md": {
        "tags": ["claude-ecosystem", "cheatsheet", "coding-tools", "quick-reference"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_9_Agents_Parallelism.md": {
        "tags": ["agents", "parallelism", "cheatsheet", "coding-tools"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_10_MultiAgent_Production.md": {
        "tags": ["multi-agent", "production-patterns", "cheatsheet", "coding-tools"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Cheatsheet_11_MCP_Pipeline_Errors.md": {
        "tags": ["mcp", "error-handling", "cheatsheet", "coding-tools"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/claude_routines_guide.md": {
        "tags": ["claude-code", "coding-tools", "workflows", "reference"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Questionnaire_Claude_Certification.md": {
        "tags": ["claude", "certification", "exam-prep", "questionnaire"],
        "covers_version": "2026",
    },
    "docs/coding-tools/claude/Questionnaire_Vol2_Claude_Certification.md": {
        "tags": ["claude", "certification", "exam-prep", "questionnaire"],
        "covers_version": "2026",
    },
    "docs/coding-tools/github-copilot/copilotkit-mcp-apps-vs-tools.md": {
        "tags": ["copilotkit", "mcp", "github-copilot", "design-decision"],
        "covers_version": "2026",
    },
    "docs/coding-tools/github-copilot/microsoft-apm-guide.md": {
        "tags": ["microsoft-apm", "github-copilot", "package-management", "guide"],
        "covers_version": "2026",
    },
    "docs/coding-tools/github-copilot/copilotkit-server-map-call-flow.md": {
        "tags": ["copilotkit", "agentcore", "mcp", "call-flow"],
        "covers_version": "2026",
    },
    # Policy volumes - fix tags + doc_type + last_reviewed
    "docs/ai-security-governance/policy/Vol1b_Authorization_Deep_Dive.md": {
        "tags": ["authorization", "ai-security", "policy", "access-control"],
        "doc_type": "multi-part-series",
        "last_reviewed": "2026-07-17",
        "series_name": "Enterprise AI Authorization Series",
        "series_part": "1b",
        "series_total": "5",
        "series_index": "ai-security-governance/policy/Vol0_Series_Index_and_Overview",
    },
}


def fix_frontmatter(text, path_cfg):
    """Apply frontmatter fixes to a file's text."""
    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        print(f"  SKIP: no frontmatter found")
        return text
    fm_text = m.group(1)
    body = text[m.end():]
    lines = fm_text.splitlines()

    # Helper: set or replace a key
    def set_key(key, value, lines):
        for i, line in enumerate(lines):
            if re.match(rf"^{re.escape(key)}\s*:", line):
                lines[i] = f"{key}: {value}"
                return lines
        lines.append(f"{key}: {value}")
        return lines

    # 1. Fix tags
    tags = path_cfg.get("tags")
    if tags:
        tag_str = "[" + ", ".join(tags) + "]"
        for i, line in enumerate(lines):
            if re.match(r"^tags\s*:", line):
                lines[i] = f"tags: {tag_str}"
                break
        else:
            lines.append(f"tags: {tag_str}")

    # 2. Add covers_version for guides
    if path_cfg.get("covers_version"):
        # Only add if not already present
        if not any(re.match(r"^covers_version\s*:", l) for l in lines):
            lines = set_key("covers_version", f'"{path_cfg["covers_version"]}"', lines)

    # 3. Add doc_type if specified
    if path_cfg.get("doc_type"):
        if not any(re.match(r"^doc_type\s*:", l) for l in lines):
            lines = set_key("doc_type", path_cfg["doc_type"], lines)

    # 4. Fix last_reviewed if it's empty or missing
    if path_cfg.get("last_reviewed"):
        for i, line in enumerate(lines):
            if re.match(r"^last_reviewed\s*:", line):
                if re.match(r"^last_reviewed\s*:\s*$", line):  # empty
                    lines[i] = f"last_reviewed: {path_cfg['last_reviewed']}"
                break
        else:
            lines.append(f"last_reviewed: {path_cfg['last_reviewed']}")

    # 5. Add series fields if specified
    for key in ("series_name", "series_part", "series_total", "series_index"):
        if path_cfg.get(key):
            if not any(re.match(rf"^{re.escape(key)}\s*:", l) for l in lines):
                lines = set_key(key, f'"{path_cfg[key]}"', lines)

    new_fm = "\n".join(lines)
    return f"---\n{new_fm}\n---\n{body}"


CODE_INDICATORS = re.compile(
    r"(?:for |def |class |return |import |from |if |while |elif |else:|"
    r"try:|except |raise |with |yield |lambda |\bTrue\b|\bFalse\b|\bNone\b"
    r"|\{\s*[\"\w]|\}\s*#|\)\s*#|=\s*\{|\]\s*=|\.read\(|\.write\(|\.append\(|"
    r"status.*[:=]|→|\bTask\(|citation_registry|agent_result|source_id)"
)


def is_code_line(text):
    """Heuristic: line looks like code rather than a prose heading."""
    # Very long lines with code-like content
    if len(text) > 120 and CODE_INDICATORS.search(text):
        return True
    # Lines that contain multiple # (Python comments inside the line)
    if text.count(" # ") >= 2:
        return True
    return False


def fix_body(text):
    """Fix H1 count and heading level jumps in the body."""
    lines = text.splitlines(keepends=True)
    result = []
    h1_count = 0
    prev_level = 0
    in_code_fence = False
    i = 0

    while i < len(lines):
        line = lines[i]

        # Track code fences
        if line.strip().startswith("```") or line.strip().startswith("~~~"):
            in_code_fence = not in_code_fence
            result.append(line)
            i += 1
            continue

        if in_code_fence:
            result.append(line)
            i += 1
            continue

        # Check for ATX heading
        hm = re.match(r"^(#{1,6})[ \t](.*?)$", line.rstrip())
        if hm:
            level = len(hm.group(1))
            heading_text = hm.group(2)

            # Fix 1: Demote extra H1s to H2
            if level == 1:
                h1_count += 1
                if h1_count > 1:
                    line = f"## {heading_text}\n"
                    level = 2

            # Fix 2: Heading level jump (H2 → H4, etc.) — demote to prev+1
            if level > prev_level + 1 and prev_level > 0:
                new_level = prev_level + 1
                line = f"{'#' * new_level} {heading_text}\n"
                level = new_level

            prev_level = level
            result.append(line)
            i += 1
            continue

        # Check for lines that should be in code fences
        stripped = line.rstrip()
        if stripped.startswith("# ") and is_code_line(stripped[2:]):
            # Wrap in code fence
            code_content = stripped  # keep the whole line including the leading #
            result.append("```python\n")
            result.append(code_content + "\n")
            result.append("```\n")
            # Don't update prev_level — this is code, not a heading
            i += 1
            continue

        result.append(line)
        i += 1

    return "".join(result)


def process_file(path, cfg):
    with open(path, encoding="utf-8") as f:
        text = f.read()

    # Split frontmatter from body for body fixes
    m = re.match(r"^---\n.*?\n---\n", text, re.DOTALL)
    fm_end = m.end() if m else 0

    # Fix frontmatter
    text = fix_frontmatter(text, cfg)

    # Re-split after frontmatter fix
    m2 = re.match(r"^---\n.*?\n---\n", text, re.DOTALL)
    fm2_end = m2.end() if m2 else 0
    fm_part = text[:fm2_end]
    body_part = text[fm2_end:]

    # Fix body
    body_fixed = fix_body(body_part)

    result = fm_part + body_fixed

    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(result)

    print(f"  Fixed: {path}")


def main():
    errors = 0
    for path, cfg in FILES.items():
        print(f"\nProcessing {path}...")
        try:
            process_file(path, cfg)
        except Exception as e:
            print(f"  ERROR: {e}")
            errors += 1
    print(f"\nDone. {len(FILES)} files processed, {errors} errors.")
    return errors


if __name__ == "__main__":
    sys.exit(main())
