"""
Reformat the Agentic AI in the Enterprise case study MD files to restore
the visual structure of the PDF originals using Docusaurus admonitions,
blockquotes, and tables.
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
DOCS = ROOT / "docs"


def clean_bold(s: str) -> str:
    return re.sub(r"\*\*", "", s).strip()


ARTIFACT_TITLE_WORDS = re.compile(
    r"\b(Assessment|Report|Review|Analysis|Platform|Framework|System|"
    r"Architecture|Investigation|Strategy|Design|Blueprint|Document|"
    r"Findings|Recommendation|Alignment|Statement|Background|Intake|"
    r"Procedure|Policy|Charter|Proposal|Overview|Summary|Evaluation|"
    r"Specification|Register|Log|Matrix|Map|Plan|Structure)\b",
    re.IGNORECASE,
)


def is_person_name(s: str) -> bool:
    """Return True if s looks like a person's name (not a document title)."""
    s = s.strip()
    if ARTIFACT_TITLE_WORDS.search(s):
        return False
    words = s.split()
    return 1 <= len(words) <= 4 and all(bool(w) and w[0].isupper() for w in words)


# ---------------------------------------------------------------------------
# State-machine transformer
# ---------------------------------------------------------------------------

class Transformer:
    def __init__(self):
        self.lines: list = []
        self.i: int = 0
        self.out: list = []

    def cur(self) -> str:
        return self.lines[self.i] if self.i < len(self.lines) else ""

    def advance(self) -> str:
        line = self.lines[self.i]
        self.i += 1
        return line

    def skip_blanks(self) -> None:
        while self.i < len(self.lines) and not self.lines[self.i].strip():
            self.i += 1

    def collect_until(self, stop_re_list) -> list:
        collected = []
        while self.i < len(self.lines):
            if any(p.match(self.lines[self.i]) for p in stop_re_list):
                break
            collected.append(self.advance())
        return collected

    def emit(self, *lines) -> None:
        self.out.extend(lines)

    RE_SERIES_HDR  = re.compile(r"^####\s+\*\*AGENTIC AI IN THE ENTERPRISE\*\*")
    RE_JOURNEY     = re.compile(r"^####\s+\*\*INCUBATION\*\*")
    RE_CAST_HDR    = re.compile(r"^####\s+\*\*CAST OF CHARACTERS\*\*")
    RE_STAGE_HDR   = re.compile(r"^##\s+\*\*STAGE\s+(\d+)\s+[—–-]+\s+(.+?)\*\*\s*$")
    RE_SUBTITLE    = re.compile(r"^_(.+\|.+)_\s*$")
    RE_TIME        = re.compile(r"^####\s+_(\d{1,2}:\d{2}[^_]*)_\s*$")
    RE_ATTENDEES   = re.compile(r"^####\s+\*\*(.+?)\*\*\s*$")
    RE_SPEAKER     = re.compile(r"^###\s+\*\*([^*—–]+)\s*[—–]\s*([^*]+)\*\*\s*$")
    RE_THOUGHT     = re.compile(r"^####\s+.*INTERNAL\s+THOUGHT", re.IGNORECASE)
    RE_EMAIL       = re.compile(r"^####\s+u?\s*\*\*EMAIL\*\*", re.IGNORECASE)
    RE_ARTIFACT    = re.compile(r"^####\s+I?\s*\*\*ARTIFACT:\s*([A-Z0-9\-]+)\*\*", re.IGNORECASE)
    RE_OUTCOMES    = re.compile(r"^###\s+\*\*STAGE OUTCOMES\*\*", re.IGNORECASE)
    RE_FOOTER      = re.compile(r"^[A-Z][^|\n]+\|[^|\n]+\|\s*\d{4}\s*$")
    RE_H4_BOLD     = re.compile(r"^####\s+\*\*([^*]+)\*\*\s*$")
    RE_H4_ITALIC   = re.compile(r"^####\s+_([^_]+)_\s*$")
    RE_H4_GENERIC  = re.compile(r"^####\s+")
    RE_CHECK       = re.compile(r"^-\s+I\s+")

    RE_STAGE_STOP  = [
        re.compile(r"^##\s+Stage "),
        re.compile(r"^##\s+\*\*STAGE"),
    ]
    RE_EMAIL_STOP  = RE_STAGE_STOP + [
        re.compile(r"^####\s+I?\s*\*\*ARTIFACT:"),
        re.compile(r"^###\s+\*\*STAGE OUTCOMES\*\*", re.IGNORECASE),
    ]
    RE_ART_STOP    = RE_STAGE_STOP + [
        re.compile(r"^###\s+\*\*STAGE OUTCOMES\*\*", re.IGNORECASE),
    ]

    def transform(self, body: str) -> str:
        self.lines = body.split("\n")
        self.i = 0
        self.out = []

        while self.i < len(self.lines):
            line = self.cur()

            if self.RE_SERIES_HDR.match(line):
                self.advance()
                continue

            if self.RE_JOURNEY.match(line):
                self._journey(line)
                self.advance()
                continue

            if self.RE_CAST_HDR.match(line):
                self.advance()
                self._cast()
                continue

            m = self.RE_STAGE_HDR.match(line)
            if m:
                self._stage(m)
                self.advance()
                continue

            m = self.RE_TIME.match(line)
            if m:
                self._time_block(m)
                continue

            m = self.RE_SPEAKER.match(line)
            if m and is_person_name(m.group(1).strip()):
                self._speaker(m)
                continue

            if self.RE_THOUGHT.match(line):
                self.advance()
                self._thought()
                continue

            if self.RE_EMAIL.match(line):
                self.advance()
                self._email()
                continue

            m = self.RE_ARTIFACT.match(line)
            if m:
                self._artifact(m)
                continue

            if self.RE_OUTCOMES.match(line):
                self.advance()
                self._outcomes()
                continue

            if self.RE_FOOTER.match(line):
                self.emit("", f"*{line.strip()}*", "", "---", "")
                self.advance()
                continue

            # Clean up remaining #### markup
            line = self.RE_H4_BOLD.sub(r"**\1**", line)
            line = self.RE_H4_ITALIC.sub(r"*\1*", line)
            line = self.RE_H4_GENERIC.sub("### ", line)
            line = self.RE_CHECK.sub("- ✅ ", line)
            self.emit(line)
            self.advance()

        result = "\n".join(self.out)
        result = re.sub(r"\n{4,}", "\n\n\n", result)
        return "\n\n" + result.lstrip("\n").rstrip("\n") + "\n"

    # ── Block handlers ──────────────────────────────────────────────────────

    def _journey(self, line: str) -> None:
        raw = re.sub(r"^####\s+", "", line).strip()
        stages = re.split(r"\s*→\s*", raw)
        stages = [clean_bold(s) for s in stages if s.strip()]
        badges = "  →  ".join(f"**`{s}`**" for s in stages)
        self.emit("", ":::info[Case Journey]", badges, ":::", "")

    def _cast(self) -> None:
        STOP = [
            re.compile(r"^###\s+"),
            re.compile(r"^##\s+"),
            re.compile(r"^:::"),
            re.compile(r"^####\s+\*\*INCUBATION\*\*"),         # journey pipeline
            re.compile(r"^[A-Z][^|\n]+\|[^|\n]+\|\s*\d{4}"),  # footer line
        ]
        chars = []

        while self.i < len(self.lines):
            line = self.lines[self.i]
            if any(p.match(line) for p in STOP):
                break

            # H4: #### **Name** (heading alone on line)
            m = re.match(r"^####\s+\*\*([^*]+)\*\*\s*$", line)
            if m:
                name = m.group(1).strip()
                self.advance()
                self.skip_blanks()
                if self.i < len(self.lines):
                    role = self.lines[self.i].strip()
                    if role and not role.startswith("#") and not any(p.match(role) for p in STOP):
                        chars.append((name, role))
                        self.advance()
                continue

            # Inline: **Name** Role text (name and role on same line)
            m = re.match(r"^\*\*([^*\n]+)\*\*\s+([^\n*#]+)", line)
            if m:
                name = m.group(1).strip()
                role = m.group(2).strip()
                if name and role:
                    chars.append((name, role))
                self.advance()
                continue

            # Bold-only: **Name** alone — role on next line
            m = re.match(r"^\*\*([^*\n]+)\*\*\s*$", line)
            if m:
                name = m.group(1).strip()
                self.advance()
                self.skip_blanks()
                if self.i < len(self.lines):
                    role = self.lines[self.i].strip()
                    if role and not role.startswith("#") and not any(p.match(role) for p in STOP):
                        chars.append((name, role))
                        self.advance()
                continue

            self.advance()

        if not chars:
            return

        self.emit("", "## Cast of Characters", "")
        self.emit("| Character | Role |")
        self.emit("|-----------|------|")
        for name, role in chars:
            star = " ⭐" if "protagonist" in role.lower() else ""
            self.emit(f"| **{name}**{star} | {role} |")
        self.emit("")

    def _stage(self, m: re.Match) -> None:
        num = m.group(1)
        title = clean_bold(m.group(2))
        j = self.i + 1
        while j < len(self.lines) and not self.lines[j].strip():
            j += 1
        subtitle = ""
        if j < len(self.lines):
            sub_m = self.RE_SUBTITLE.match(self.lines[j])
            if sub_m:
                subtitle = sub_m.group(1).strip()
                self.i = j  # will be incremented by caller's advance()
        self.emit("", f"## Stage {num} — {title}", "")
        if subtitle:
            parts = [p.strip() for p in subtitle.split("|")]
            desc = parts[0]
            when = " | ".join(parts[1:]) if len(parts) > 1 else ""
            self.emit(f"*{desc}*")
            if when:
                self.emit(f"`{when}`")
            self.emit("")

    def _time_block(self, time_m: re.Match) -> None:
        time_loc = time_m.group(1).strip()
        self.advance()
        self.skip_blanks()

        attendees_text = ""
        if self.i < len(self.lines):
            att_m = self.RE_ATTENDEES.match(self.lines[self.i])
            if att_m:
                raw = clean_bold(att_m.group(1))
                if "ttendee" in raw or " — " in raw or ":" in raw:
                    attendees_text = raw
                    self.advance()

        parts = [p.strip() for p in time_loc.split("|")]
        time_part = parts[0]
        loc_part = " | ".join(parts[1:]) if len(parts) > 1 else ""

        self.emit("", ":::note[📅 Meeting]")
        heading = f"**🕐 {time_part}**"
        if loc_part:
            heading += f"  📍 *{loc_part}*"
        self.emit(heading, "")

        if attendees_text:
            if " — Attendees:" in attendees_text:
                mtype, atts = attendees_text.split(" — Attendees:", 1)
                self.emit(f"**{mtype.strip()}**", "", f"*Attendees: {atts.strip()}*")
            else:
                self.emit(f"*{attendees_text}*")

        self.emit(":::", "")

    def _speaker(self, m: re.Match) -> None:
        name = m.group(1).strip()
        role = m.group(2).strip()
        self.advance()
        self.skip_blanks()
        dialogue = []
        while self.i < len(self.lines) and self.lines[self.i].strip():
            dialogue.append(self.lines[self.i])
            self.i += 1
        self.emit("", f"> **{name}** — *{role}*")
        if dialogue:
            self.emit(">")
            for dl in dialogue:
                self.emit(f"> {dl}")
        self.emit("")

    def _thought(self) -> None:
        self.skip_blanks()
        thought_lines = []
        while self.i < len(self.lines) and self.lines[self.i].strip():
            raw = self.lines[self.i].strip().strip("_")
            thought_lines.append(raw)
            self.i += 1
        thought = " ".join(thought_lines)
        self.emit("", ":::tip[💭 Internal Thought]", "", thought, "", ":::", "")

    def _email(self) -> None:
        self.skip_blanks()
        lines = self.collect_until(self.RE_EMAIL_STOP)
        text = "\n".join(lines).strip()
        self.emit("", ":::note[📧 Email]", "", text, "", ":::", "")

    def _artifact(self, m: re.Match) -> None:
        artifact_id = m.group(1).strip()
        self.advance()
        self.skip_blanks()
        raw_lines = self.collect_until(self.RE_ART_STOP)
        processed = []
        for al in raw_lines:
            al = re.sub(r"^###\s+\*\*([^*]+)\*\*\s*$", r"**\1**", al)
            al = re.sub(r"^####\s+\*\*([^*]+)\*\*\s*$", r"**\1**", al)
            al = re.sub(r"^####\s+", "", al)
            processed.append(al)
        art_text = "\n".join(processed).strip()
        self.emit("", f":::info[📋 Artifact: {artifact_id}]", "", art_text, "", ":::", "")

    def _outcomes(self) -> None:
        self.skip_blanks()
        raw = self.collect_until(self.RE_STAGE_STOP)
        processed = []
        for ol in raw:
            ol = re.sub(r"^-\s+I\s+", "- ✅ ", ol)
            ol = re.sub(r"^I\s+([A-Z])", r"✅ \1", ol)
            processed.append(ol)
        text = "\n".join(processed).strip()
        self.emit("", ":::tip[✅ Stage Outcomes]", "", text, "", ":::", "")


# ---------------------------------------------------------------------------
# File processor
# ---------------------------------------------------------------------------

def process_file(md_path: Path) -> bool:
    content = md_path.read_text(encoding="utf-8", errors="replace")
    if not content.startswith("---"):
        return False
    parts = content.split("---", 2)
    if len(parts) < 3:
        return False
    fm, body = parts[1], parts[2]

    if "CAST OF CHARACTERS" not in body and "AGENTIC AI IN THE ENTERPRISE" not in body:
        return False

    t = Transformer()
    new_body = t.transform(body)

    if new_body == body:
        return False

    md_path.write_text(f"---{fm}---{new_body}", encoding="utf-8")
    return True


TARGET_FILES = [
    "docs/ai-usecases/Case_01_Meridian_Fraud_Investigation_Agents.md",
    "docs/ai-usecases/Case_02_Cascadia_Prior_Authorization_Agent.md",
    "docs/ai-usecases/Case_03_Ironclad_Maintenance_Orchestration_Agent.md",
    "docs/ai-usecases/Case_04_Northline_Customer_Service_Agents.md",
    "docs/ai-usecases/Case_05_Aurelia_Research_Assistant_Agent.md",
    "docs/ai-usecases/Case_06_Skyline_Disruption_Control_Tower.md",
    "docs/ai-usecases/Case_07_Harborstone_Claims_Processing_Agents.md",
    "docs/ai-usecases/Case_08_Sterling_Loan_Underwriting_Agent.md",
    "docs/ai-usecases/Case_09_Palisade_Grid_Operations_Agent.md",
    "docs/ai-usecases/Case_10_Vantara_Procurement_Negotiation_Agents.md",
    "docs/ai-usecases/Case_11_Vaxion_Clinical_Trial_Matching_Agent.md",
    "docs/ai-usecases/Case_12_Meritage_Dynamic_Pricing_Agent.md",
    "docs/ai-usecases/Case_13_StateDHS_Benefits_Navigation_Agent.md",
    "docs/ai-usecases/Case_14_Falkirk_SOC_Threat_Response_Agent.md",
    "docs/ai-usecases/Case_15_Correlate_Recruiting_Screening_Agent.md",
    "docs/ai-usecases/Enterprise_AI_Case_Studies.md",
]


def main():
    import sys
    if len(sys.argv) > 1 and not sys.argv[1].startswith("--"):
        targets = [ROOT / sys.argv[1]]
    else:
        targets = [ROOT / f for f in TARGET_FILES]

    fixed = 0
    for path in targets:
        if not path.exists():
            print(f"  SKIP (not found): {path.relative_to(ROOT)}")
            continue
        if process_file(path):
            print(f"  reformatted: {path.relative_to(ROOT)}")
            fixed += 1
        else:
            print(f"  no change:   {path.relative_to(ROOT)}")

    print(f"\nDone: {fixed}/{len(targets)} files reformatted")


if __name__ == "__main__":
    main()
