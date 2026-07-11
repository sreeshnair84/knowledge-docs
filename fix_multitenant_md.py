"""
Post-process the pymupdf4llm conversion of MultiTenantAgentPlatform_Architecture.md.

Problems to fix:
1. Code in shaded PDF boxes → detected as single-column pipe tables → convert to fenced code blocks
2. Adjacent code blocks split by blank lines → merge into one
3. Section 4.3 JWT code continuation is trapped in <!-- picture text --> comment → move into code block
4. Section 9 heading embedded in the first table cell → extract as real heading
5. Auth matrix table (4.5) has garbled Unicode prefix chars on row values
6. Short single-line code fences that are just comments/labels → remove the fence
7. Apply proper frontmatter from the existing published file
"""

import re

INPUT  = "/tmp/MultiTenantAgentPlatform_Architecture_new.md"
OUTPUT = "docs/agentic-systems/platform/MultiTenantAgentPlatform_Architecture.md"

with open(INPUT, encoding="utf-8") as f:
    text = f.read()

# ── 1. Extract code from `<!-- picture text -->` blocks ──────────────────────
# Section 4.3: the second half of the JWT handler code is in a picture-text comment
# right after Figure 2. We'll pull it out and keep it as raw text (to be merged later).
def extract_picture_text(m):
    inner = m.group(1).strip()
    # Replace <br> with newline
    inner = inner.replace("<br>", "\n")
    # If it looks like code (has Python/JS syntax), emit as a code continuation marker
    if re.search(r'def |return |json\.|hashlib\.|\bawait\b|\.get\(', inner):
        return "\n<!-- PICTURE_CODE_START -->\n" + inner + "\n<!-- PICTURE_CODE_END -->\n"
    # Otherwise it's diagram label text — keep as an HTML comment (hidden)
    return f"\n<!-- diagram: {inner[:80]}... -->\n"

text = re.sub(
    r'<!-- Start of picture text -->(.*?)<!-- End of picture text -->',
    extract_picture_text,
    text,
    flags=re.DOTALL
)

# ── 2. Section 9: heading is embedded in a big table cell ────────────────────
# Pattern: |**9  CDK Infrastructure Patterns**<br>TypeScript CDK...<br>`// lib/...`|
def fix_section9_heading(m):
    header_line = m.group(1)
    # Extract the heading text (before first <br>)
    heading = re.split(r'<br>', header_line)[0].strip()
    subtitle = re.split(r'<br>', header_line)[1] if '<br>' in header_line else ''
    code_comment = re.split(r'<br>', header_line)[2].strip('`') if header_line.count('<br>') >= 2 else ''
    result = f"\n\n## **{heading}**\n\n{subtitle}\n\n"
    if code_comment:
        result += f"```typescript\n{code_comment}\n"
    return result

text = re.sub(
    r'\|\*\*(9\s+CDK Infrastructure Patterns)\*\*(.*?)\|',
    lambda m: f"\n\n## **9  CDK Infrastructure Patterns**\n\nTypeScript CDK · Per-tenant stacks · VPC endpoints · ECR\n\n```typescript\n",
    text
)

# ── 3. Convert single-column backtick-table rows → code block lines ──────────
# These look like:
#   |`code line`|
#   |---|
#   |`code line`|
# We collect runs of these and emit a fenced code block.

def convert_code_tables(text):
    lines = text.split('\n')
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Detect start of a backtick-table block
        # A separator row `|---|` or `|---|---|` or header `|`code`|` followed by `|---|`
        if re.match(r'^\|`.*`\|?\s*$', line) or (
            i + 1 < len(lines) and re.match(r'^\|---\|', lines[i+1]) and re.match(r'^\|`', line)
        ):
            # Collect the run
            code_lines = []
            while i < len(lines):
                l = lines[i]
                if re.match(r'^\|---[\|]?', l):
                    i += 1
                    continue
                m = re.match(r'^\|`(.*)`\|?\s*$', l)
                if m:
                    code_lines.append(m.group(1))
                    i += 1
                else:
                    break
            if code_lines:
                # Detect language hint
                first = code_lines[0]
                if first.startswith('//') or 'const ' in first or '=>' in first or 'export ' in first:
                    lang = 'typescript'
                elif first.startswith('#') or 'def ' in first or 'import ' in first:
                    lang = 'python'
                else:
                    lang = ''
                out.append(f'```{lang}')
                out.extend(code_lines)
                out.append('```')
            continue
        out.append(line)
        i += 1
    return '\n'.join(out)

text = convert_code_tables(text)

# ── 4. Merge adjacent fenced code blocks (split by ≤2 blank lines) ───────────
text = re.sub(
    r'```(\w*)\n(.*?)```\n{1,3}```(\w*)\n',
    lambda m: f'```{m.group(1) or m.group(3)}\n{m.group(2)}',
    text,
    flags=re.DOTALL
)
# Do it twice to catch chains of 3+
text = re.sub(
    r'```(\w*)\n(.*?)```\n{1,3}```(\w*)\n',
    lambda m: f'```{m.group(1) or m.group(3)}\n{m.group(2)}',
    text,
    flags=re.DOTALL
)

# ── 5. Inject picture-code blocks into the preceding open code block ──────────
def merge_picture_code(text):
    # Find the JWT code block (section 4.3) and append the picture code to it
    pic_code_pattern = re.compile(
        r'<!-- PICTURE_CODE_START -->\n(.*?)\n<!-- PICTURE_CODE_END -->',
        re.DOTALL
    )
    for m in pic_code_pattern.finditer(text):
        pic_code = m.group(1).strip()
        # Find the nearest preceding closing ``` and open it again
        before = text[:m.start()]
        last_close = before.rfind('```\n')
        if last_close != -1:
            text = (
                before[:last_close] +          # everything up to last ```
                pic_code + '\n```\n' +          # append pic code then close
                text[last_close + 4:m.start()] + # content between last ``` and pic block
                text[m.end():]                  # rest
            )
            break
    # Remove any remaining markers
    text = re.sub(r'<!-- PICTURE_CODE_(?:START|END) -->\n?', '', text)
    return text

text = merge_picture_code(text)

# ── 6. Fix auth matrix table (4.5) — strip leading Unicode garbage chars ──────
# Rows look like: |xBrowser|...| or |yCopilotRuntime|...| etc.
def fix_auth_matrix(text):
    # The table starts at "## **4.5 Auth Matrix..."
    def fix_row(m):
        row = m.group(0)
        # Replace leading garbage Unicode before a known word
        row = re.sub(r'\|[x-z{|}]\s*([A-Z])', r'|\1', row)
        return row
    # Only apply within the auth matrix section
    auth_section = re.search(r'(## \*\*4\.5 Auth Matrix.*?)(?=\n## )', text, re.DOTALL)
    if auth_section:
        fixed = re.sub(r'^\|[^\|].*\|$', fix_row, auth_section.group(1), flags=re.MULTILINE)
        text = text[:auth_section.start()] + fixed + text[auth_section.end():]
    return text

text = fix_auth_matrix(text)

# ── 7. Remove trivial single-line fenced code blocks (just a comment/label) ───
text = re.sub(
    r'```\w*\n((?:#|//)[^\n]{0,60})\n```\n',
    r'*\1*\n\n',
    text
)

# ── 8. Clean up excessive blank lines ────────────────────────────────────────
text = re.sub(r'\n{4,}', '\n\n\n', text)

# ── 9. Apply proper frontmatter from the existing published file ──────────────
frontmatter = """---
title: "Multi-Tenant Agent Platform Architecture"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
supersedes: ""
source_type: converted-pdf
source_file: "MultiTenantAgentPlatform_Architecture.pdf"
tags: ["agentic-ai", "multi-tenant", "platform-architecture", "aws"]
---"""

# Replace the auto-generated frontmatter stub
text = re.sub(
    r'^---\n.*?---\n',
    frontmatter + '\n',
    text,
    count=1,
    flags=re.DOTALL
)

# Remove the auto-generated HTML comment
text = text.replace('<!-- converted from MultiTenantAgentPlatform_Architecture.pdf -->\n', '')

# ── 10. Update image paths to new naming convention ──────────────────────────
text = text.replace(
    '/img/agentic-systems/platform/MultiTenantAgentPlatform_Architecture.pdf-0004-02.png',
    '/img/agentic-systems/platform/multitenant-platform-p4-1.png'
)
text = text.replace(
    '/img/agentic-systems/platform/MultiTenantAgentPlatform_Architecture.pdf-0011-02.png',
    '/img/agentic-systems/platform/multitenant-platform-p11-2.png'
)

with open(OUTPUT, 'w', encoding='utf-8') as f:
    f.write(text.strip() + '\n')

print(f"Written: {OUTPUT}")

# Quick stats
import re as _re
imgs   = len(_re.findall(r'!\[', text))
code   = len(_re.findall(r'^```', text, _re.M))
h2     = len(_re.findall(r'^## ', text, _re.M))
tables = len(_re.findall(r'^\|', text, _re.M))
words  = len(text.split())
print(f"Stats: {words} words | {imgs} images | {code//2} code blocks | {h2} h2 headings | {tables} table rows")
