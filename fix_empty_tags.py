#!/usr/bin/env python3
"""
Fix all pages with tags: [] — adds tags, doc_type, last_reviewed, covers_version,
and repairs heading level jumps so the pre-commit hook passes.

Run from the repo root.
"""
import re
import sys

# Tags per file path prefix
TAG_MAP = {
    "ai-security-governance/deep-mind/Part01": ["ai-security", "ai-control", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part02": ["ai-security", "ai-control", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part03": ["ai-security", "threat-modeling", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part04": ["ai-security", "ai-control", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part05": ["ai-security", "runtime-security", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part06": ["ai-security", "identity", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part07": ["ai-security", "authorization", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part08": ["ai-security", "memory-governance", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part09": ["ai-security", "tool-governance", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part10": ["ai-security", "reasoning-governance", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part11": ["ai-security", "multi-agent", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part12": ["ai-security", "observability", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part13": ["ai-security", "ai-soc", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part14": ["ai-security", "governance", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part15": ["ai-security", "cloud", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part16": ["ai-security", "reference-architecture", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part17": ["ai-security", "best-practices", "deepmind", "multi-part-series"],
    "ai-security-governance/deep-mind/Part18": ["ai-security", "future-outlook", "deepmind", "multi-part-series"],
    "ai-security-governance/policy/Vol0": ["authorization", "ai-security", "policy", "multi-part-series"],
    "ai-security-governance/policy/Vol1_": ["authorization", "ai-security", "policy", "multi-part-series"],
    "ai-security-governance/policy/Vol2_": ["authorization", "identity", "policy", "multi-part-series"],
    "ai-security-governance/policy/Vol2b": ["authorization", "policy-engineering", "policy", "multi-part-series"],
    "ai-security-governance/policy/Vol3_": ["authorization", "mcp", "agent-tools", "multi-part-series"],
    "ai-security-governance/policy/Vol3b": ["authorization", "agent-authorization", "policy", "multi-part-series"],
    "ai-security-governance/policy/Vol4_": ["authorization", "rag", "data-governance", "multi-part-series"],
    "ai-security-governance/policy/Vol4b": ["authorization", "aws", "entra", "multi-part-series"],
    "ai-security-governance/policy/Vol5_": ["authorization", "aws", "governance", "multi-part-series"],
    "ai-security-governance/policy/Vol5b": ["authorization", "compliance", "governance", "multi-part-series"],
    "ai-security-governance/Agentic_AI_Governance_Framework": ["ai-governance", "agentic-ai", "ai-security", "framework"],
    "ai-security-governance/Sovereign_Constitutional_AI": ["sovereign-ai", "constitutional-ai", "rai", "governance"],
    "ai-foundations/AI_Assistant_Architecture_Research_Report": ["ai-foundations", "architecture", "assistant", "research-report"],
    "ai-foundations/AI_Deep_Future_Outlook_2026_2035": ["ai-foundations", "future-outlook", "research-report", "strategy"],
    "agentic-systems/skill/Agent_Skills_Complete_Playbook_2026": ["agentic-ai", "agent-skills", "playbook", "coding-tools"],
    "databricks-agentic-ai/part-09": ["databricks", "agentic-ai", "competitive", "reference-architecture"],
    "enterprise-architecture/framework/TOGAF10_APEX_AI_Platform": ["togaf", "enterprise-architecture", "framework", "ai-platform"],
    "enterprise-architecture/specialization/AKES_Addendum": ["enterprise-architecture", "knowledge-systems", "versioning", "standards"],
    "enterprise-architecture/specialization/DPDP_Act_2023": ["compliance", "data-privacy", "india", "governance"],
    "enterprise-architecture/specialization/EAKA_Research_Study": ["enterprise-architecture", "research", "knowledge-architecture", "study"],
    "enterprise-architecture/specialization/modern-data-ai-platform": ["data-platform", "ai-platform", "architecture", "enterprise"],
}

# Heading level jump fixer (same logic as fix_converted_files.py)
def fix_heading_jumps(body):
    lines = body.splitlines(keepends=True)
    result = []
    prev_level = 0
    in_code_fence = False
    for line in lines:
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_code_fence = not in_code_fence
            result.append(line)
            continue
        if in_code_fence:
            result.append(line)
            continue
        hm = re.match(r"^(#{1,6})[ \t](.*?)$", line.rstrip())
        if hm:
            level = len(hm.group(1))
            heading_text = hm.group(2)
            if level > prev_level + 1 and prev_level > 0:
                level = prev_level + 1
                line = f"{'#' * level} {heading_text}\n"
            prev_level = level
        result.append(line)
    return "".join(result)


def fix_file(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()

    m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        print(f"  SKIP: no frontmatter in {path}")
        return False

    fm_text = m.group(1)
    body = text[m.end():]
    lines = fm_text.splitlines()

    # Determine relative path for tag lookup
    rel = path.replace("\\", "/")
    if "docs/" in rel:
        rel = rel[rel.index("docs/") + 5:]

    tags = None
    for prefix, t in TAG_MAP.items():
        if prefix in rel:
            tags = t
            break

    if tags is None:
        # File already has tags or no mapping
        return False

    changed = False

    # 1. Fix tags
    for i, line in enumerate(lines):
        if re.match(r"^tags\s*:", line):
            new_line = "tags: [" + ", ".join(tags) + "]"
            if lines[i] != new_line:
                lines[i] = new_line
                changed = True
            break

    # 2. Add doc_type: guide (if missing)
    if not any(re.match(r"^doc_type\s*:", l) for l in lines):
        lines.append("doc_type: guide")
        changed = True

    # 3. Fill empty last_reviewed
    for i, line in enumerate(lines):
        if re.match(r"^last_reviewed\s*:\s*$", line):
            lines[i] = "last_reviewed: 2026-07-17"
            changed = True
            break
    else:
        if not any(re.match(r"^last_reviewed\s*:", l) for l in lines):
            lines.append("last_reviewed: 2026-07-17")
            changed = True

    # 4. Add covers_version (required for doc_type: guide)
    if not any(re.match(r"^covers_version\s*:", l) for l in lines):
        lines.append('covers_version: "2026"')
        changed = True

    # 5. Fix heading level jumps in body
    fixed_body = fix_heading_jumps(body)
    if fixed_body != body:
        changed = True

    if not changed:
        return False

    new_fm = "\n".join(lines)
    new_text = f"---\n{new_fm}\n---\n{fixed_body}"

    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(new_text)
    print(f"  Fixed: {rel}")
    return True


def main():
    import subprocess
    result = subprocess.run(
        ["git", "-C", ".", "grep", "-rl", "^tags: \\[\\]", "--", "docs/"],
        capture_output=True, text=True
    )
    files = [l.strip() for l in result.stdout.splitlines() if l.strip()]

    # Also process files we already staged (tags already set, but may have other issues)
    result2 = subprocess.run(
        ["git", "diff", "--cached", "--name-only"],
        capture_output=True, text=True
    )
    staged = [l.strip() for l in result2.stdout.splitlines() if l.strip().startswith("docs/")]

    all_files = list(set(files + staged))
    if not all_files:
        print("Nothing to fix.")
        return 0

    fixed = 0
    for f in sorted(all_files):
        # For staged files with tags already set, still run the other fixes
        if f not in files:
            # Only run heading + frontmatter fix on staged docs
            with open(f, encoding="utf-8") as fh:
                text = fh.read()
            m = re.match(r"^---\n(.*?)\n---\n", text, re.DOTALL)
            if not m:
                continue
            fm_text = m.group(1)
            body = text[m.end():]
            lines = fm_text.splitlines()
            changed = False

            if not any(re.match(r"^doc_type\s*:", l) for l in lines):
                lines.append("doc_type: guide")
                changed = True
            for i, line in enumerate(lines):
                if re.match(r"^last_reviewed\s*:\s*$", line):
                    lines[i] = "last_reviewed: 2026-07-17"
                    changed = True
                    break
            if not any(re.match(r"^covers_version\s*:", l) for l in lines):
                lines.append('covers_version: "2026"')
                changed = True
            fixed_body = fix_heading_jumps(body)
            if fixed_body != body:
                changed = True

            if changed:
                new_text = f"---\n{chr(10).join(lines)}\n---\n{fixed_body}"
                with open(f, "w", encoding="utf-8", newline="\n") as fh:
                    fh.write(new_text)
                print(f"  Fixed (staged): {f}")
                fixed += 1
        else:
            if fix_file(f):
                fixed += 1

    print(f"\nFixed: {fixed}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
