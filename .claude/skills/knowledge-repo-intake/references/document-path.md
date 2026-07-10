# Document Path

For inputs that are a file (or a URL to fetch), not a bare topic prompt.

## Dispatch by file type — don't hand-roll extraction for formats this
## workspace already has tooling for

| Input type | What to use |
|---|---|
| `.pdf` | The `pdf-to-markdown` skill — never hand-extract a PDF with a one-off script when that skill exists; it already handles tables, images, and running headers/footers. |
| `.html` / a URL | WebFetch to get the page content converted to markdown, or fetch + read directly if it's a page already in context. Strip site navigation/boilerplate before drafting — a fetched page's nav menu and footer links are not content. |
| `.docx` | Use the `docx` skill's read/extraction guidance. |
| `.pptx` | Use the `pptx` skill's read/extraction guidance. |
| `.txt` / `.md` already in a usable format | Read directly, no conversion needed. |

## Enrich vs. replace

Once content is extracted, Step 2's placement check (already run before you
got here) determines what happens next:

- **Placement said "update existing page X"**: read page X in full first.
  Integrate the new material into its existing structure — add to the
  relevant section, or add a new section if the source material covers
  genuinely new ground within the same topic. Don't create a second page on
  the same subject. Update `last_reviewed`.
- **Placement said "new page in folder Y"**: draft a new page following the
  matching type template from `knowledge-page-authoring`, placed in folder
  Y.
- **Placement flagged the incoming content as ≥85% similar to something
  existing**: stop — this file is very likely already represented in the
  repo. Tell the user what it matches before doing anything else; don't
  silently skip it or silently duplicate it.

## Fidelity to the source

Enriching the repo with a source document's content means representing
what that document actually says — not extrapolating, not filling gaps with
plausible-sounding invented specifics. If the source is thin on a point the
target page's type template requires (e.g. a certification page needs an
Exam Facts table but the source PDF doesn't state the passing score),
either research that specific gap (a small, targeted pass through the
research path) or leave it explicitly marked as unconfirmed — don't
silently invent it to complete the template.

## After extraction

Go to the grounding check (Step 4 in SKILL.md). For the document path, the
check is specifically: does every carried-over figure/date/claim actually
appear in the source document text, not just in the drafted page.
