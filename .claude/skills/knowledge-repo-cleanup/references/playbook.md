---
title: "Cleanup Playbook — Phase Detail"
date_created: 2026-07-09
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["skills", "knowledge-repo-cleanup"]
---

# Cleanup Playbook — Phase Detail

Each phase below writes one output file under `_meta/` and updates
`_meta/progress.json` via `scripts/progress.py`. Read this file once per
phase, not the whole thing up front — it's reference material, not standing
instructions.

## Phase 0 — Inventory (read-only)

Walk the full `docs/` tree. For every `.md`, `.pdf`, `.docx`, `.pptx` file,
record: path, title (frontmatter or first heading, or filename for
binaries), size, last git-log modification date, and a 2-3 sentence content
summary.

**Step 1 — Extract corpus** using `scripts/extract_corpus.py` (handles all
four formats; batch by index range so a single call doesn't time out):

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/extract_corpus.py 0 60
python3 ${CLAUDE_SKILL_DIR}/scripts/extract_corpus.py 60 120
# ... continue in batches of ~60 until script reports all files processed
```

This writes `_meta/corpus.json` (path → extracted text), used by Phase 1.

**Step 2 — Build inventory** — there is no dedicated script for this step;
run it inline. The snippet below derives titles (frontmatter → first heading
→ filename), gets file sizes and git dates, and uses the first three
non-heading content lines as the summary:

```python
import json, os, re, subprocess, sys

with open("_meta/corpus.json", encoding="utf-8") as f:
    corpus = json.load(f)

inventory = {}
for path, text in corpus.items():
    try: size = os.path.getsize(path)
    except: size = 0
    try:
        r = subprocess.run(["git","log","-1","--format=%as","--",path], capture_output=True, text=True)
        git_date = r.stdout.strip() or "unknown"
    except: git_date = "unknown"
    title = None
    fm = re.search(r'^---\s*\n.*?^title:\s*["\']?(.+?)["\']?\s*$.*?^---', text, re.MULTILINE|re.DOTALL)
    if fm: title = fm.group(1).strip()
    if not title:
        hm = re.search(r'^#{1,3}\s+(.+)', text, re.MULTILINE)
        if hm: title = hm.group(1).strip()
    if not title: title = os.path.basename(path)
    lines = text.split('\n'); in_fm = False; cl = []; i = 0
    if lines and lines[0].strip() == '---': in_fm = True; i = 1
    while i < len(lines):
        if in_fm:
            if lines[i].strip() == '---': in_fm = False
        else:
            l = lines[i].strip()
            if l and not l.startswith(('#','|','!')): cl.append(l)
            if len(cl) >= 3: break
        i += 1
    inventory[path] = {"path":path,"title":title,"size_bytes":size,"git_date":git_date,"summary":' '.join(cl)[:400]}

with open("_meta/inventory.json","w",encoding="utf-8",errors="replace") as f:
    json.dump(inventory, f, indent=2, ensure_ascii=False)
```

Output: `_meta/inventory.json` — path, title, size, summary per file.
Mark complete: `progress.py complete-phase --phase 0`.

## Phase 1 — Duplicate & overlap detection (Opus recommended)

Do **not** rely on filename or hash matching — content-level duplication
across differently-named files is the actual failure mode here, not exact
copies.

Run `scripts/find_duplicates.py`, which strips HTML/markdown markup from
`_meta/corpus.json` (so repeated `<iframe>`/`<details>` wrappers don't
inflate scores) and computes pairwise TF-IDF cosine similarity across the
full corpus:

```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/find_duplicates.py --threshold 0.4
```

This writes `_meta/duplicate-pairs.csv` with a similarity score and tier per
pair:
- `>=0.85` — near-duplicate content, one file very likely subsumes the other
- `0.6-0.85` — heavy overlap, same topic covered twice with real differences
- `0.4-0.6` — moderate/partial overlap, may be legitimately related-but-
  distinct (e.g. two case studies sharing a common framework) — review, don't
  assume

Group pairs that chain together into clusters (A~B, B~C → cluster {A,B,C}).
For each cluster, decide the "keeper" (most complete, most recent, best-
formatted) and read every non-keeper closely enough to list what content in
it is NOT already in the keeper — that's what has to be preserved in Phase 3,
not the whole file.

Output: `_meta/duplicate-clusters.md` — one section per cluster: files
involved, similarity scores, recommended keeper, and the specific unique
content from each non-keeper that must be merged in. This is a proposal, not
an action — don't merge or delete anything in this phase.

Seed Phase 3's queue from this output:
```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/progress.py seed-queue --phase 3 \
  --items "cluster_001,cluster_002,..."
```
Mark complete: `progress.py complete-phase --phase 1`.

## Phase 2 — PDF/DOCX/PPTX → Markdown conversion (queued, batch this)

For every PDF/DOCX/PPTX identified in Phase 1 as a keeper, or as containing
unique content that needs merging: convert to Markdown preserving heading
hierarchy, tables as real Markdown tables (not pasted ASCII), code blocks as
fenced blocks, and images/diagrams extracted to
`static/img/<topic-folder>/` with standard `![]()` references — never
re-embed a PDF via `<iframe>` in the output.

Seed the queue once at the start of this phase:
```bash
python3 ${CLAUDE_SKILL_DIR}/scripts/progress.py seed-queue --phase 2 \
  --items-from _meta/duplicate-clusters.md
```
(Or pass an explicit comma-separated file list with `--items` if the queue
should include files beyond what Phase 1 flagged.)

For each file: add a one-line comment at the top of the new `.md` noting the
original source filename for provenance, then
`progress.py mark --phase 2 --item <path> --status done`. Don't delete the
original PDF/DOCX/PPTX yet — that happens in Phase 3 once the merge is
confirmed.

Work in batches per the usage-limit protocol in SKILL.md — this phase alone
may cover 100+ files, don't attempt it in one sitting.

Mark complete once the queue is empty: `progress.py complete-phase --phase 2`.

## Phase 3 — Merge & retire duplicates (Opus recommended, queued)

For each cluster from Phase 1 (queue seeded automatically): merge the unique
content identified into the keeper file, in the keeper's own voice and
structure — not appended as a mismatched block at the end.

Move non-keeper source files (now fully represented in the merged keeper)
into `/archive/<original-relative-path>/`. Do not hard-delete. Add a
one-line `supersedes` frontmatter pointer in the keeper referencing what it
replaced, and `status: archived` frontmatter on the archived copies.

After each cluster: `progress.py mark --phase 3 --item <cluster-id> --status
done`, then append a before/after entry to `_meta/merge-log.md`.

Mark complete once the queue is empty: `progress.py complete-phase --phase 3`.

## Phase 4 — Standardize frontmatter & taxonomy (queued)

Add/normalize this frontmatter block on every current (non-archived) page:

```yaml
---
title: "Exact page title"
date_created: 2026-01-15
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: []
---
```

Seed the queue with every current page not yet touched in Phase 2 or 3
(those already got frontmatter as part of conversion/merge — just verify
and mark done).

Separately (not part of the per-file queue): reconcile the root `README.md`
and `sidebars.js` navigation so every listed section maps to a folder that
actually exists. Note every rename in `_meta/taxonomy-changes.md`.

Mark complete: `progress.py complete-phase --phase 4`.

## Phase 5 — Root-level housekeeping (one-shot, not queued)

Move repo-root process/audit artifacts (anything that reads as output from a
previous audit or build, not knowledge content itself — check `_meta/
inventory.json` from Phase 0 for candidates at the root) into `_meta/` or
`_internal/`, excluded from the Docusaurus build via config. Don't delete
them.

Flag any scripts (e.g. build helpers) sitting at repo root for a decision:
move to `/scripts/` if still used, otherwise list for the user to confirm
removal — don't remove without explicit confirmation.

Mark complete: `progress.py complete-phase --phase 5`.

## Phase 6 — Validation & handoff (one-shot)

Run the Docusaurus build. Fix any broken links or missing references caused
by the restructuring. Run a link checker against the built site.

Produce `_meta/cleanup-summary.md`: total files before/after, duplicate
clusters resolved, PDFs converted, files archived, and anything still
needing a human decision.

Don't merge the branch — stop and hand off the branch plus summary for
review.

Mark complete: `progress.py complete-phase --phase 6`.
