#!/usr/bin/env python3
"""Clean up APEX_EA_Final.md after PDF extraction."""
import re, os

PATH = os.path.join(os.path.dirname(__file__), "..",
                    "docs", "enterprise-architecture", "specialization", "APEX_EA_Final.md")

with open(PATH, encoding="utf-8") as f:
    text = f.read()

# ── 1. Fix frontmatter ────────────────────────────────────────────────────────
text = text.replace(
    '---\ntitle: "APEX_EA_Final"\ndate_created: \nlast_reviewed: \nstatus: current\nsupersedes: ""\nsource_type: converted-pdf\nsource_file: "APEX_EA_Final.pdf"\ntags: []\n---',
    '---\ntitle: "APEX: AI Platform of Platforms"\ndate_created: 2026-04-01\nlast_reviewed: 2026-07-10\nstatus: current\nsupersedes: ""\nsource_type: converted-pdf\nsource_file: "APEX_EA_Final.pdf"\ndoc_type: engagement-case-study\nframework_name: "APEX AI Platform of Platforms — TOGAF 10 + AI-DLC"\ntags: ["enterprise-architecture", "specialization", "togaf", "ai-dlc", "cloud-native"]\ncovers_version: "Final Edition — April 2026"\n---'
)
print("OK frontmatter")

# ── 2. Replace cover-page table with clean header ─────────────────────────────
cover_old = """\n\n|  | APEX: AI Platform of Platforms |  |  |
| --- | --- | --- | --- |
|  | Cloud-Native AI Agent Architecture | TOGAF 10 ADM + AI-DLC The authoritative Enterprise Architecture blueprint for the APEX programme |  |  |
|  |  | at GlobalCorp Enterprises. Applies TOGAF 10 ADM as governance skeleton and AI-DLC as velocity engine to create a cloud-native AI Platform of Platforms. Covers all nine ADM phases, full team structure, RACI, responsibility mappings, cloud-native service design, and regulatory compliance across |  |
|  | EU AI Act, DORA, GDPR, MiFID II, and internal model risk policy. |  |  |
|  | ORGANISATION PROGRAMME |  |  |
|  |  | GlobalCorp Enterprises APEX — AI Platform of Platforms FRAMEWORK ARCHITECTURE APPROACH TOGAF 10 ADM + AI-DLC Cloud-Native / Vendor-Agnostic DOCUMENT REFERENCE ISSUE DATE EA-APEX-MASTER-001 April 2026 |  |

CLASSIFICATION STATUS CONFIDENTIAL APPROVED — FINAL"""

cover_new = """

# APEX: AI Platform of Platforms

**Organisation:** GlobalCorp Enterprises
**Programme:** APEX — AI Platform of Platforms
**Framework:** TOGAF 10 ADM + AI-DLC | Cloud-Native / Vendor-Agnostic
**Reference:** EA-APEX-MASTER-001 | **Issue Date:** April 2026
**Classification:** Confidential — Approved Final

The authoritative Enterprise Architecture blueprint for the APEX programme. Applies TOGAF 10 ADM as governance skeleton and AI-DLC as velocity engine to create a cloud-native AI Platform of Platforms. Covers all nine ADM phases, full team structure, RACI, responsibility mappings, cloud-native service design, and regulatory compliance across EU AI Act, DORA, GDPR, MiFID II, and internal model risk policy."""

if cover_old in text:
    text = text.replace(cover_old, cover_new)
    print("OK cover page")
else:
    print("MISS cover page — check exact string")

# ── 3. Remove repeated running header rows ────────────────────────────────────
# Pattern: optional \n---\n\n followed by the header table (with or without trailing \n)
RUNNING_HDR = r'\n\n\|  \| APEX: AI Platform of Platforms \| TOGAF 10 \+ AI-DLC \| Cloud-Native \| Final Edition GlobalCorp Enterprises \| CONFIDENTIAL \|\n\| --- \| --- \|\n'
n = len(re.findall(RUNNING_HDR, text))
text = re.sub(RUNNING_HDR, '\n', text)
print(f"OK removed {n} running header rows")

# ── 4. Fix (cid:127) bullet artifacts ─────────────────────────────────────────
text = text.replace("(cid:127)", "•")
print("OK fixed bullet encoding")

# ── 5. Fix stats line rendered as heading ─────────────────────────────────────
text = text.replace(
    "### 10 30+ 5 6 24 18\n\nTOGAF ADM Phases Architecture Documents Pioneer Domains Regulatory Frameworks Cloud-Native Patterns Team Roles Defined",
    "> **Programme at a Glance:** 10 TOGAF ADM Phases · 30+ Architecture Documents · 5 Pioneer Domains · 6 Regulatory Frameworks · 24 Cloud-Native Patterns · 18 Team Roles Defined"
)
print("OK fixed stats heading")

# ── 6. Remove section-label subtitles that repeat heading text ────────────────
# Pattern: heading followed by "SECTION NN <description>" or "OVERVIEW <description>"
text = re.sub(r'\nSECTION \d+ [^\n]+\n', '\n', text)
text = re.sub(r'\nOVERVIEW [^\n]+\n', '\n', text)
text = re.sub(r'\nTOC [^\n]+\n', '\n', text)
text = re.sub(r'\nAPPENDIX [A-Z] [^\n]+\n', '\n', text)
text = re.sub(r'\nDOC REF: [^\n]+\n', '\n', text)
print("OK removed section-label subtitles")

# ── 7. Replace garbled TOC paragraph with a real Markdown TOC ─────────────────
toc_old = """### Table of Contents

TOC Structure of this document 01 — Team Structure, RACI & Responsibility Mappings n APEX Operating Model — Who Does What n Organisation Tiers n Core Team Register n RACI: Agent Lifecycle n RACI: Platform Governance n RACI: Regulatory & Compliance n Responsibility Assignment Matrix n Stakeholder Engagement Map 02 — AI-DLC: Methodology, Phases & EA Impacts n What is AI-DLC? n Three Phases n Terminology Reference n Impact Across All 10 TOGAF ADM Phases n Operating Model Transformations 03 — Preliminary Phase — Foundation n Architecture Principles (APD-001) n Tailored ADM Process n Architecture Repository 04 — Phase A — Architecture Vision n Statement of Architecture Work (SAW-APEX-001) n Stakeholder Map & Register n Architecture Vision Document 05 — Phase B — Business Architecture n Business Capability Map (BCM-APEX-001) n Value Stream Analysis n Organisation Model 06 — Phase C — Information Systems Architecture n Data Architecture & AI-Native Entities (DAD-APEX-001) n Application Architecture & Component Model (AAD-APEX-001) 07 — Phase D — Technology Architecture n Multi-Region Cloud-Native Infrastructure n Security Architecture n CI/CD Pipeline with Layered Verification Model n Observability Architecture 08 — Phase E–H — Delivery, Governance & Change n Architecture Roadmap (ROAD-APEX-001) n Solution Building Blocks (SBB-APEX-001) n Migration Plan (IMP-APEX-001) n 5-Tier Governance Model (CAF-APEX-001) n Change Intelligence Process (ACHG-APEX-001) 09 — Requirements Management n Architecture Requirements Specification (ARS-APEX-001) 10 — Appendices n A — Regulatory Cross-Reference n B — Cloud-Native Service Mapping n C — Glossary"""

toc_new = """## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Team Structure, RACI & Responsibility Mappings](#team-structure-raci--responsibility-mappings)
   - [APEX Operating Model — Who Does What](#apex-operating-model--who-does-what)
   - [Core Team Register](#core-team-register)
   - [RACI Matrix — Agent Lifecycle](#raci-matrix--agent-lifecycle)
   - [RACI Matrix — Platform Governance & Architecture Board](#raci-matrix--platform-governance--architecture-board)
   - [RACI Matrix — Regulatory & Compliance](#raci-matrix--regulatory--compliance)
   - [Responsibility Assignment Matrix](#responsibility-assignment-matrix)
   - [Stakeholder Engagement Map](#stakeholder-engagement-map)
3. [AI-DLC: Methodology, Phases & EA Impacts](#ai-dlc-methodology-phases--ea-impacts)
4. [Preliminary Phase — Foundation (Phase 0)](#preliminary-phase--foundation-phase-0)
5. [Phase A — Architecture Vision](#phase-a--architecture-vision)
6. [Phase B — Business Architecture](#phase-b--business-architecture)
7. [Phase C — Information Systems Architecture](#phase-c--information-systems-architecture)
8. [Phase D — Technology Architecture](#phase-d--technology-architecture)
9. [Phases E–H — Delivery, Governance & Change](#phases-eh--delivery-governance--change)
10. [Requirements Management](#requirements-management)
11. [Appendix A — Regulatory Cross-Reference Matrix](#regulatory-cross-reference-matrix)
12. [Appendix B — Cloud-Native Service Mapping](#cloud-native-service-mapping)
13. [Appendix C — Glossary](#glossary)"""

if toc_old in text:
    text = text.replace(toc_old, toc_new)
    print("OK replaced TOC")
else:
    print("MISS TOC — check exact string")

# ── 8. Fix Glossary — break dense paragraph into definition list ───────────────
# The glossary is one giant paragraph; add line breaks before each defined term
# Pattern: "TERM " at start or after period/newline + caps
# Simpler: split on known term starts
GLOSSARY_TERMS = [
    "Adaptive Capability", "Agent Gateway", "Agent Health Score", "AI-DLC",
    "APEX ", "ARB ", "Bolt ", "CNCF ", "Data Maturity Gate", "DEA ",
    "DORA ", "Embedding Compatibility", "EU AI Act", "GitOps",
    "Guardrails ", "HITL ", "Layered Verification", "LGTM ",
    "Mob Construction", "Mob Elaboration", "OpenTofu", "Phase Boundary Receipt",
    "RAGAS ", "SAW ", "SBB ", "Semantic Context", "TLPT ", "Unit of Work", "Zero-Trust"
]
for term in GLOSSARY_TERMS:
    # Add a newline before each term definition in the glossary block
    # Look for the term following a period or within the dense block
    text = re.sub(r'(?<=[a-z\.]) ' + re.escape(term), r'\n\n**' + term.strip() + '**', text, count=1)

# Also fix the ADM definition at the start of the glossary
text = text.replace(
    "APPENDIX C Complete reference — TOGAF 10, AI-DLC, cloud-native, team, and regulatory ADM Architecture Development Method",
    "**ADM** Architecture Development Method"
)
print("OK glossary term breaks")

# ── 9. Upgrade Executive Summary to ## heading ────────────────────────────────
text = text.replace("\n### Executive Summary\n", "\n## Executive Summary\n")

# ── 10. Upgrade main sections to ## ──────────────────────────────────────────
MAIN_SECTIONS = [
    "Team Structure, RACI & Responsibility Mappings",
    "AI-DLC: Methodology, Phases & EA Impacts",
    "Preliminary Phase",
    "Phase A —",
    "Phase B —",
    "Phase C —",
    "Phase D —",
    "Phases E",
    "Requirements Management",
    "Regulatory Cross-Reference Matrix",
    "Cloud-Native Service Mapping",
    "Glossary",
]
for s in MAIN_SECTIONS:
    text = text.replace(f"\n### {s}", f"\n## {s}")
print("OK promoted main sections to ##")

# ── 11. Clean up triple+ blank lines ─────────────────────────────────────────
text = re.sub(r'\n{4,}', '\n\n\n', text)
print("OK collapsed blank lines")

with open(PATH, "w", encoding="utf-8") as f:
    f.write(text)

print(f"\nDone. Written to {PATH}")
