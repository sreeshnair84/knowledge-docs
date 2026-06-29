"""
MkDocs build hook: Auto-generates document viewer blocks for all
non-markdown files found in each section directory.
"""
import os, re
from pathlib import Path

MARKER_START = "<!-- AUTO-DOCS-START -->"
MARKER_END   = "<!-- AUTO-DOCS-END -->"
GITHUB_RAW   = "https://raw.githubusercontent.com/sreeshnair84/knowledge-docs/main/docs"

VIEWABLE = {'.pdf', '.html'}
OFFICE   = {'.docx', '.pptx', '.xlsx'}
DOWNLOAD = {'.jsx', '.excalidraw', '.txt'}
SKIP     = {'index.md', 'README.md', '.gitkeep'}

def _name(f):
    n = re.sub(r'[_\-\.]+', ' ', Path(f).stem).strip()
    return re.sub(r'\s+', ' ', n).title()

def _block(f, rel):
    ext = f.suffix.lower()
    name = _name(f.name)
    raw = f"{GITHUB_RAW}/{rel}/{f.name}" if rel else f"{GITHUB_RAW}/{f.name}"
    if ext == '.pdf':
        return (f'\n<details>\n<summary>{name}</summary>\n'
                f'<iframe src="{f.name}" width="100%" height="800px" frameborder="0"></iframe>\n'
                f'<p><a href="{f.name}" target="_blank">Open in new tab ↗</a></p>\n</details>\n')
    if ext in OFFICE:
        return (f'\n<details>\n<summary>{name}</summary>\n'
                f'<iframe src="https://docs.google.com/viewer?url={raw}&embedded=true" '
                f'width="100%" height="750px" frameborder="0"></iframe>\n'
                f'<p><a href="{f.name}" download>Download ↓</a></p>\n</details>\n')
    if ext == '.html':
        return (f'\n<details>\n<summary>{name}</summary>\n'
                f'<iframe src="{f.name}" width="100%" height="700px" frameborder="0" '
                f'style="border:1px solid #ddd;border-radius:4px;"></iframe>\n'
                f'<p><a href="{f.name}" target="_blank">Open in new tab ↗</a></p>\n</details>\n')
    if ext in DOWNLOAD:
        return (f'\n<details>\n<summary>{name}</summary>\n'
                f'<p><a href="{f.name}" download>Download {ext[1:].upper()} ↓</a></p>\n</details>\n')
    return ''

def on_page_markdown(markdown, page, config, files, **kwargs):
    if not page.file.src_path.endswith('index.md'):
        return markdown
    docs_dir = Path(config['docs_dir'])
    page_dir  = docs_dir / Path(page.file.src_path).parent
    rel       = str(Path(page.file.src_path).parent).replace('\\', '/').lstrip('./')

    # Strip any previous auto-generated block
    if MARKER_START in markdown:
        markdown = re.sub(re.escape(MARKER_START) + r'.*?' + re.escape(MARKER_END),
                          '', markdown, flags=re.DOTALL).strip()

    # Collect files from current directory
    assets = sorted(
        f for f in page_dir.iterdir()
        if f.is_file() and f.name not in SKIP
        and f.suffix.lower() in (VIEWABLE | OFFICE | DOWNLOAD)
    )

    # If no files in root, check if subdirectories have files
    if not assets:
        subdirs = sorted(
            d for d in page_dir.iterdir()
            if d.is_dir() and not d.name.startswith('.')
        )

        # If only subdirectories exist with index.md, show helpful message
        if subdirs and any((d / 'index.md').exists() for d in subdirs):
            subsections = [d.name for d in subdirs if (d / 'index.md').exists()]
            if subsections:
                msg = '\n\n'.join(
                    f'- **{s.replace("-", " ").title()}**: [`{s}/index.md`]({s}/)'
                    for s in subsections
                )
                return f'{markdown}\n\n{MARKER_START}\n\n## Sections\n\n{msg}\n\n{MARKER_END}'
        return markdown

    blocks = ''.join(_block(f, rel) for f in assets)
    return f'{markdown}\n\n{MARKER_START}\n\n## Documents\n{blocks}\n{MARKER_END}'
