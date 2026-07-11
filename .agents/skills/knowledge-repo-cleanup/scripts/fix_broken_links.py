#!/usr/bin/env python3
"""Fix broken Docusaurus links found in the build output."""
import re, os

REPO = os.path.normpath(os.path.join(os.path.dirname(__file__), ".."))

def read(relpath):
    with open(os.path.join(REPO, relpath), encoding="utf-8") as f:
        return f.read()

def write(relpath, text):
    with open(os.path.join(REPO, relpath), "w", encoding="utf-8") as f:
        f.write(text)

def fix(relpath, old, new):
    t = read(relpath)
    if old not in t:
        print(f"  MISS  {repr(old[:70])}")
        return
    write(relpath, t.replace(old, new))
    print(f"  OK    {repr(old[:70])}")


# ── A. agentic-systems/skill/index.md ─────────────────────────────────────────
print("\n[A] skill/index.md")
F = "docs/agentic-systems/skill/index.md"

fix(F, "(00-executive-summary-and-reference-architecture)**",
        "(./00-executive-summary-and-reference-architecture.md)**")
fix(F, "](00-executive-summary-and-reference-architecture)\n",
        "](./00-executive-summary-and-reference-architecture.md)\n")
fix(F, "](enterprise/index)\n", "](./enterprise/index.md)\n")
fix(F, "](coding/index)\n",   "](./coding/index.md)\n")
# Remove Additional Resources section (broken HTML + PDF links)
t = read(F)
t = re.sub(r"\n---\n\n## Additional Resources\n\n.*", "", t, flags=re.DOTALL)
write(F, t)
print("  OK  removed Additional Resources section")

# ── B. agentic-systems/skill/coding/index.md ──────────────────────────────────
print("\n[B] skill/coding/index.md")
F = "docs/agentic-systems/skill/coding/index.md"

fix(F, "](../00-executive-summary-and-reference-architecture)",
        "](../00-executive-summary-and-reference-architecture.md)")
fix(F, "](../enterprise/index)", "](../enterprise/index.md)")

CODING_PARTS = [
    "01-foundations-what-is-a-coding-skill",
    "02-skill-anatomy-and-metadata-schema",
    "03-discovery-and-execution-lifecycle",
    "04-skills-tools-mcp-relationship",
    "05-tool-definitions-and-instructions-engineering",
    "06-repository-context-engineering",
    "07-vscode-devcontainers-integration",
    "08-mcp-integration-and-memory",
    "09-multi-agent-and-observability",
    "10-governance-and-security",
    "11-evaluation-reusability-deduplication",
    "12-enterprise-workflows-comparative-analysis-and-patterns",
]
for p in CODING_PARTS:
    fix(F, f"]({p})", f"](./{p}.md)")

# ── C. agentic-systems/skill/enterprise/index.md ──────────────────────────────
print("\n[C] skill/enterprise/index.md")
F = "docs/agentic-systems/skill/enterprise/index.md"

fix(F, "](../00-executive-summary-and-reference-architecture)",
        "](../00-executive-summary-and-reference-architecture.md)")
fix(F, "](../coding/index)", "](../coding/index.md)")

ENTERPRISE_PARTS = [
    "01-foundations-what-is-an-agent-skill",
    "02-skill-anatomy-and-metadata-schema",
    "03-execution-lifecycle-and-tracing",
    "04-skills-tools-mcp-a2a-relationship",
    "05-tool-definition-best-practices",
    "06-registry-discovery-and-deduplication",
    "07-composition-and-instructions-engineering",
    "08-observability-and-evaluation",
    "09-security-architecture",
    "10-governance-and-lifecycle",
    "11-architecture-patterns-antipatterns-and-case-studies",
]
for p in ENTERPRISE_PARTS:
    fix(F, f"]({p})", f"](./{p}.md)")

# ── D. 00-executive-summary-and-reference-architecture.md ────────────────────
print("\n[D] skill/00-executive-summary...")
F = "docs/agentic-systems/skill/00-executive-summary-and-reference-architecture.md"
for p in ENTERPRISE_PARTS:
    fix(F, f"](enterprise/{p})", f"](./enterprise/{p}.md)")
for p in CODING_PARTS:
    fix(F, f"](coding/{p})", f"](./coding/{p}.md)")

# ── E. ai-security-governance/security/index.md ───────────────────────────────
print("\n[E] ai-security-governance/security/index.md")
F = "docs/ai-security-governance/security/index.md"
SEC = [
    ("01-Foundations-Reference-Architecture",    "01 — Foundations &amp; Reference Architecture"),
    ("02-Identity-MCP-A2A-Security-Blueprint",   "02 — Identity, MCP &amp; A2A Security Blueprint"),
    ("04-AI-SOC-Observability-RedTeam-Memory",   "04 — AI SOC, Observability, Red Team &amp; Memory"),
    ("05-Economic-Security-FinOps-Commerce-PQC", "05 — Economic Security, FinOps, Commerce &amp; PQC"),
    ("06-Operating-Model-Maturity-Roadmap",      "06 — Operating Model Maturity Roadmap"),
    ("07-Zero-to-Mastery-Curriculum",            "07 — Zero to Mastery Curriculum"),
    ("08-Architects-Field-Guide",                "08 — Architect&#39;s Field Guide"),
]
for slug, label in SEC:
    # Try both apostrophe encodings
    for lbl in (label, label.replace("&#39;", "'"), label.replace("&#39;", "&apos;")):
        old = f"[{lbl}](/knowledge-docs/ai-security-governance/security/{slug})"
        new = f"[{lbl}](./{slug}.md)"
        fix(F, old, new)

# ── F. enterprise-architecture/transformation/index.md ────────────────────────
print("\n[F] enterprise-architecture/transformation/index.md")
F = "docs/enterprise-architecture/transformation/index.md"
TRANSFORM = [
    ("00_Executive_Summary_and_AI_Vision",            "00 — Executive Summary &amp; AI Vision"),
    ("01_Current_State_Assessment_and_AI_Maturity",   "01 — Current State Assessment &amp; AI Maturity"),
    ("02_AI_Opportunity_Portfolio",                   "02 — AI Opportunity Portfolio"),
    ("03_Enterprise_AI_Platform_and_Data_Architecture","03 — Enterprise AI Platform &amp; Data Architecture"),
    ("04_Governance_Responsible_AI_and_Security",     "04 — Governance, Responsible AI &amp; Security"),
    ("05_Target_Operating_Model_and_Change",          "05 — Target Operating Model &amp; Change"),
    ("06_Roadmap_Financials_KPIs_and_Risk",           "06 — Roadmap, Financials, KPIs &amp; Risk"),
]
for slug, label in TRANSFORM:
    old = f"[{label}](/knowledge-docs/enterprise-architecture/transformation/{slug})"
    new = f"[{label}](./{slug}.md)"
    fix(F, old, new)

# ── G. ai-usecases/index.md ───────────────────────────────────────────────────
print("\n[G] ai-usecases/index.md")
F = "docs/ai-usecases/index.md"
SECTORS = [
    ("01_aviation",     "01 — Aviation AI Use Cases"),
    ("02_banking",      "02 — Banking AI Use Cases"),
    ("03_healthcare",   "03 — Healthcare AI Use Cases"),
    ("04_manufacturing","04 — Manufacturing AI Use Cases"),
    ("05_telecom",      "05 — Telecom AI Use Cases"),
    ("06_government",   "06 — Government AI Use Cases"),
    ("07_pharma",       "07 — Pharma AI Use Cases"),
    ("08_energy",       "08 — Energy AI Use Cases"),
    ("09_logistics",    "09 — Logistics AI Use Cases"),
    ("10_media",        "10 — Media AI Use Cases"),
]
for slug, label in SECTORS:
    old = f"[{label}](/knowledge-docs/ai-usecases/{slug})"
    new = f"[{label}](./{slug}.md)"
    fix(F, old, new)

# Remove broken PDF and HTML static asset links
t = read(F)
# Remove PDF line
t = re.sub(
    r"\n- \[EU Banking AI Agent Evaluation Framework \(PDF\)\]\([^)]+\)\n",
    "\n", t)
# Remove HTML Files section
t = re.sub(
    r"\n---\n\n## HTML Files\n\n(?:- \[[^\]]+\]\([^)]+\)\n\n?)+",
    "\n---\n\n", t)
write(F, t)
print("  OK  removed broken PDF + HTML section")

print("\nDone. Run `npm run build` to verify.")
