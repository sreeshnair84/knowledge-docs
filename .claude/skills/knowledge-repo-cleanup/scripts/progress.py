#!/usr/bin/env python3
"""
Resumable progress tracker for the knowledge-repo-cleanup skill.
State lives at _meta/progress.json — commit this file to git after every
update so the job survives a session ending mid-batch.

Subcommands:
    init                                   Create the tracker if it doesn't exist (idempotent)
    status                                 Print a summary of every phase
    next                                   Print the exact next task to work on
    seed-queue --phase N --items "a,b,c"   Populate a phase's queue
    seed-queue --phase N --items-from FILE Populate from a markdown file's file paths (best-effort)
    mark --phase N --item X --status done  Mark one queue item complete
    complete-phase --phase N               Mark an entire phase complete
"""

import argparse
import datetime
import json
import os
import re

META_DIR = "_meta"
PROGRESS_PATH = os.path.join(META_DIR, "progress.json")

PHASES = [
    {"id": 0, "name": "inventory", "output": "_meta/inventory.json", "queued": False},
    {"id": 1, "name": "duplicate_detection", "output": "_meta/duplicate-clusters.md", "queued": False},
    {"id": 2, "name": "pdf_conversion", "output": None, "queued": True},
    {"id": 3, "name": "merge_retire", "output": "_meta/merge-log.md", "queued": True},
    {"id": 4, "name": "frontmatter_taxonomy", "output": "_meta/taxonomy-changes.md", "queued": True},
    {"id": 5, "name": "root_cleanup", "output": None, "queued": False},
    {"id": 6, "name": "validation", "output": "_meta/cleanup-summary.md", "queued": False},
]


def now():
    return datetime.datetime.now(datetime.UTC).isoformat()


def load():
    if not os.path.exists(PROGRESS_PATH):
        return None
    with open(PROGRESS_PATH) as f:
        return json.load(f)


def save(state):
    os.makedirs(META_DIR, exist_ok=True)
    state["last_updated"] = now()
    with open(PROGRESS_PATH, "w") as f:
        json.dump(state, f, indent=2)


def cmd_init(_args):
    state = load()
    if state is not None:
        print(f"{PROGRESS_PATH} already exists. Not overwriting.")
        return
    state = {
        "started_at": now(),
        "last_updated": now(),
        "phases": [
            {**p, "status": "pending", "completed_at": None, "queue": [] if p["queued"] else None} for p in PHASES
        ],
    }
    save(state)
    print(f"Created {PROGRESS_PATH} with {len(PHASES)} phases, all pending.")


def cmd_status(_args):
    state = load()
    if state is None:
        print(f"No {PROGRESS_PATH} yet. Run `progress.py init` first.")
        return
    for p in state["phases"]:
        line = f"Phase {p['id']} ({p['name']}): {p['status']}"
        if p.get("queue") is not None:
            done = sum(1 for q in p["queue"] if q["status"] == "done")
            total = len(p["queue"])
            line += f" — {done}/{total} queue items done"
        print(line)


def _find_phase(state, phase_id):
    for p in state["phases"]:
        if p["id"] == phase_id:
            return p
    raise SystemExit(f"No such phase: {phase_id}")


def cmd_next(_args):
    state = load()
    if state is None:
        print("No tracker yet. Run `progress.py init`, then start Phase 0.")
        return
    for p in state["phases"]:
        if p["status"] == "complete":
            continue
        if p.get("queue"):
            pending = [q for q in p["queue"] if q["status"] != "done"]
            if pending:
                print(f"Resume Phase {p['id']} ({p['name']}): {len(pending)} items left.")
                print(f"Next item: {pending[0]['item']}")
                return
            else:
                print(
                    f"Phase {p['id']} ({p['name']}) queue is fully done but phase "
                    f"not marked complete. Run `complete-phase --phase {p['id']}` "
                    f"after writing {p['output']}."
                )
                return
        print(f"Start or resume Phase {p['id']} ({p['name']}). Output: {p['output']}")
        return
    print("All phases complete. Nothing left to resume.")


def cmd_seed_queue(args):
    state = load()
    if state is None:
        raise SystemExit("No tracker yet. Run `progress.py init` first.")
    p = _find_phase(state, args.phase)
    if p.get("queue") is None:
        raise SystemExit(f"Phase {args.phase} is not a queued phase.")

    items = []
    if args.items:
        items = [x.strip() for x in args.items.split(",") if x.strip()]
    elif args.items_from:
        with open(args.items_from) as f:
            text = f.read()
        # Best-effort: pull anything that looks like a repo-relative file path
        items = sorted(set(re.findall(r"[\w\-./]+\.(?:md|pdf|docx|pptx)", text)))
    else:
        raise SystemExit("Provide --items or --items-from")

    existing = {q["item"] for q in p["queue"]}
    added = 0
    for it in items:
        if it not in existing:
            p["queue"].append({"item": it, "status": "pending", "completed_at": None})
            added += 1
    if p["status"] == "pending":
        p["status"] = "in_progress"
    save(state)
    print(f"Seeded {added} new items into Phase {args.phase} queue ({len(p['queue'])} total).")


def cmd_mark(args):
    state = load()
    if state is None:
        raise SystemExit("No tracker yet.")
    p = _find_phase(state, args.phase)
    if p.get("queue") is None:
        raise SystemExit(f"Phase {args.phase} has no queue; use complete-phase instead.")
    for q in p["queue"]:
        if q["item"] == args.item:
            q["status"] = args.status
            q["completed_at"] = now() if args.status == "done" else None
            save(state)
            print(f"Marked '{args.item}' as {args.status} in Phase {args.phase}.")
            return
    # not found — add it directly as done, so ad-hoc items still get tracked
    p["queue"].append(
        {"item": args.item, "status": args.status, "completed_at": now() if args.status == "done" else None}
    )
    save(state)
    print(f"'{args.item}' was not in the queue; added and marked {args.status}.")


def cmd_complete_phase(args):
    state = load()
    if state is None:
        raise SystemExit("No tracker yet.")
    p = _find_phase(state, args.phase)
    if p.get("queue") is not None:
        pending = [q for q in p["queue"] if q["status"] != "done"]
        if pending:
            raise SystemExit(
                f"Phase {args.phase} still has {len(pending)} pending queue items. "
                f"Mark them done first, or confirm this is intentional and edit "
                f"{PROGRESS_PATH} directly."
            )
    p["status"] = "complete"
    p["completed_at"] = now()
    save(state)
    print(f"Phase {args.phase} ({p['name']}) marked complete.")


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    sub.add_parser("init").set_defaults(func=cmd_init)
    sub.add_parser("status").set_defaults(func=cmd_status)
    sub.add_parser("next").set_defaults(func=cmd_next)

    sq = sub.add_parser("seed-queue")
    sq.add_argument("--phase", type=int, required=True)
    sq.add_argument("--items", default=None)
    sq.add_argument("--items-from", default=None)
    sq.set_defaults(func=cmd_seed_queue)

    mk = sub.add_parser("mark")
    mk.add_argument("--phase", type=int, required=True)
    mk.add_argument("--item", required=True)
    mk.add_argument("--status", required=True, choices=["done", "pending", "skipped"])
    mk.set_defaults(func=cmd_mark)

    cp = sub.add_parser("complete-phase")
    cp.add_argument("--phase", type=int, required=True)
    cp.set_defaults(func=cmd_complete_phase)

    args = ap.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
