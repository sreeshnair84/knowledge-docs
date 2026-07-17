# Quantum Documentation Domain — Audit & Modernization Report

**Scope:** `docs/quantum/**`, the Quantum AI sidebar category, and `archive/quantum/**` (superseded originals). No other domain was inspected or touched.
**Date:** 2026-07-17 · **Method:** direct file read of all 7 pages, `sidebars.js`, `_meta/duplicate-clusters.md`, `_meta/graph.json`, and targeted keyword/link verification (see §3, §6).

---

## 0. Reality check before reading further

The request this report answers was written as a generic template for a large, many-page quantum curriculum site (dozens of standalone topic pages, notebooks, per-algorithm deep-dives, etc.). **That is not what exists here.** The actual domain is **7 files, ~4,270 lines total**, anchored by one exceptionally dense flagship guide. Sections below follow the requested deliverable list, but are sized to the evidence rather than padded to match the template's assumed scale — a 20-section report about a 7-file domain would otherwise be mostly filler.

Housekeeping note: `Quantum_AI_TechGiants_Report.md` is already archived (`git status` shows it renamed to `archive/quantum/Quantum_AI_TechGiants_Report.md`), its content already absorbed into `zero-to-mastery.md`'s "Industry Landscape Quick Reference" section, and it's already removed from `sidebars.js`. That earlier archiving instruction is fully done — nothing further to do there.

---

## 1. Complete Inventory

| Page | Title | Doc type | Lines / words | Status | Audience | Quality |
|---|---|---|---|---|---|---|
| `index.md` | Quantum AI (landing) | guide | 41 / 149w | current | All entry points | High — does its one job (routing) cleanly |
| `zero-to-mastery.md` | Quantum AI: Zero to Mastery | guide | 1,006 / 5,267w | current | Principal/Solution Architects, senior engineers | **High** — flagship page |
| `Quantum_AI_Zero_to_Mastery.md` | Zero to Mastery (Original PDF) | unknown | 18 / 78w | superseded | n/a | Correct as a redirect stub |
| `IBM_Associate_Quantum_CertGuide.md` | IBM Assoc. Developer — Quantum (C1000-112) | guide | 922 / 4,380w | current | Cert candidates, Qiskit beginners | High, narrow scope by design |
| `IBM_Developer_Quantum_CertGuide.md` | IBM Developer — Quantum (C1000-171) | certification | 1,252 / 4,892w | current | Cert candidates, practicing Qiskit devs | High, narrow scope by design |
| `Quantum_AI_Startups_Report.md` | Quantum AI Startup Landscape | research-report | 580 / 5,659w | current | Architects, strategy/vendor selection | High, time-sensitive |
| `Quantum_AI_Consultancies_Report.md` | Quantum AI Consulting Landscape | research-report | 447 / 4,516w | current | Architects, buy-vs-build decisions | High, time-sensitive |

**Navigation:** one sidebar category "Quantum AI" → `index` (landing) + 6 children (`sidebars.js:938-946`). No sub-categories, no learning-path grouping — it's a flat list.

**Assets:** `static/img/quantum/` exists but is **empty** — zero images/diagrams as files. Every diagram in the domain is ASCII art inside fenced code blocks (in `zero-to-mastery.md`); there are no Mermaid diagrams anywhere in `docs/quantum/`, and no notebooks (`find . -iname "*.ipynb"` returns nothing under `docs/`).

**Cross-links:** every internal relative link out of `zero-to-mastery.md` (9 links to `ai-foundations`, `agentic-systems`, `enterprise-architecture/ai-architecture/*`, `ai-security-governance`, `ai-protocols/auth/*`, `coding-tools/claude/mcp-deep-guide`, `cloud-platforms`) was verified to resolve. **No broken links found.**

---

## 2. Current-State Assessment (by persona)

- **Beginner:** No true on-ramp exists. `zero-to-mastery.md` Week 1 assumes you'll go read Nielsen & Chuang externally — there's no self-contained "what is a qubit" primer in-repo. A beginner lands on `index.md`, is pointed straight at a 12-week Principal Architect programme.
- **Software Engineer / Quantum Developer:** Well served. Both IBM cert guides are genuinely "heavy code edition" — real Qiskit API surfaces, transpilation, Runtime v2, error mitigation, practice exams. This is the strongest part of the domain.
- **AI Engineer:** Well served by `zero-to-mastery.md` Phase 2 (VQE/QAOA/QNN/QNLP) and Appendix C (Quantum × Agentic AI, MCP-as-tool pattern) — genuinely current and cross-links into the agentic-systems domain correctly.
- **Solution/Enterprise/Principal Architect:** The best-covered persona in the whole domain. Phase 3, the hardware selection matrix, the hybrid architecture reference diagram, the 6 solution-design use cases (Appendix B), and the two vendor-landscape reports (startups, consultancies) are architect-grade and current (2026 revenue figures, McKinsey data, named production deployments).

**Strengths to preserve as-is:** `zero-to-mastery.md`'s structure (Foundations → QML → Architecture → Security → Use Cases → Career), the "Architect's Note" / decision-flowchart callouts, and both industry reports' "Problem → Solution → Big Wins → Anti-Patterns" format. These are not generic — they contain named companies, dated figures, and falsifiable claims, which is rare and valuable.

**Weaknesses:**
- No graduated entry point below "Principal Architect, 12-week programme."
- All code is inline snippets — none are runnable (no notebooks, no Colab links, no verified-working repo).
- No images/diagrams-as-assets despite an empty folder provisioned for them.
- No page ends with the requested references footer (Official Docs / Tutorials / Books / Papers / GitHub / Videos / Community) — external references are scattered inline as prose mentions instead.

---

## 3. Gap Analysis vs. requested curriculum

Verified via direct read + targeted grep across all 7 files (not assumed):

| Area | Status | Evidence |
|---|---|---|
| Foundations (superposition, entanglement, measurement, Bloch sphere, Dirac notation, tensor products) | **Covered** | `zero-to-mastery.md` Week 1 + Appendix A |
| No-cloning theorem, dense coding, teleportation | **Partial** | Teleportation named twice, no-cloning and dense coding never explained |
| Deutsch-Jozsa, Grover, QFT, phase estimation | **Covered** | Week 3 + both cert guides |
| Simon's, Bernstein-Vazirani algorithms | **Missing** | Zero hits |
| Shor's | **Covered (conceptually)** | Named + explained as motivation for PQC, no worked circuit |
| HHL, quantum walks, amplitude estimation | **Partial** | HHL covered with explicit caveats (good — flags the Tang 2019 dequantization result); quantum walks never mentioned; amplitude estimation named once |
| VQE, QAOA, quantum annealing, variational algorithms | **Covered, strongly** | Week 6 + Appendix B use cases 2/3/5 |
| Hardware modalities (superconducting/ion/photonic/neutral-atom/topological) | **Covered** | Week 4 table |
| Silicon spin, diamond NV centers | **Missing** | Zero hits |
| Noise, error mitigation (ZNE/PEC/twirling) | **Covered well** | Week 4 + Developer cert guide §4 |
| Surface codes, logical qubits, fault tolerance | **Weak** | "logical qubits" and "fault tolerance" each appear once in passing; no explanation of how surface-code error correction actually works |
| Qiskit, PennyLane, Cirq | **Covered** | Deep for Qiskit (2 full cert guides), adequate for PennyLane, name-only for Cirq |
| CUDA-Q, Braket, Azure Quantum, Q#, OpenQASM, TKET | **Partial/Missing** | CUDA-Q and Braket covered (vendor landscape + code); Azure Quantum and Q# named in tables only; **OpenQASM and TKET never mentioned** |
| QML encoding schemes (basis/angle/amplitude), quantum kernels, QNNs, QGANs | **Mostly covered** | Angle embedding and quantum kernels have code; basis/amplitude encoding named only; QGANs never mentioned |
| Enterprise architecture, hybrid patterns, cost/governance | **Covered, strongly** | Week 9-10 + reference architecture diagram |
| Applications (drug discovery, finance, logistics, energy, security) | **Covered, strongly** | Appendix B, 6 fully worked solution designs |
| PQC, NIST FIPS 203-206, migration | **Covered well** | Week 11 |
| Quantum Key Distribution (QKD), cryptographic agility as a named discipline | **Missing** | Zero hits — PQC is covered but QKD (a distinct topic) is not |
| Industry vendors (IBM/Google/Microsoft/AWS/NVIDIA/IonQ/Quantinuum/Rigetti/D-Wave/Xanadu) | **Covered well** | Industry Landscape section + both reports |
| Pasqal, PsiQuantum as standalone profiles | **Thin** | PsiQuantum named twice in reports; Pasqal never named (QuEra covers the neutral-atom niche instead) |
| Research / arXiv / benchmarks / papers-with-code | **Weak** | arXiv named twice as a "follow these researchers" pointer; no actual paper citations with links |

**Bottom line:** foundations, algorithms-for-architects, VQE/QAOA, hardware selection, enterprise architecture, applications, and PQC are genuinely strong. The consistent gap is **depth in error correction (surface codes/fault tolerance), the software-tooling long tail (OpenQASM, TKET, Q#, Cirq), QKD as distinct from PQC, and anything runnable** (notebooks/Colab/real hardware walkthroughs beyond snippets).

---

## 4. Hands-on Coverage Matrix

| Capability | Present? |
|---|---|
| Inline Python/Qiskit/PennyLane code | Yes, extensively (both cert guides + zero-to-mastery) |
| Runnable Jupyter notebooks | **No** |
| Google Colab links | **No** |
| Real hardware walkthrough (submit job, read back results) | Named as a schedule item ("run on real IBM hardware") but no actual walkthrough/code for job submission + result retrieval |
| Simulator examples | Yes (AerSimulator, statevector, `default.qubit`) |
| Architecture diagrams | Yes, but all ASCII-art-in-code-fences — none as Mermaid or image assets |
| Exercises / labs | Partial — "Weekly Schedule" and 4 capstone options exist, but no graded exercises with solutions |
| Practice exams | Yes, in both cert guides (40 and 50 questions with explanations) |
| References footer per page | **No page has one** |

---

## 5. Duplicate Content Report

From `_meta/duplicate-clusters.md` (repo's own similarity analysis, ≥60% threshold):

> `quantum/index` · `quantum/Quantum_AI_Consultancies_Report` · `quantum/Quantum_AI_Startups_Report` · `quantum/zero-to-mastery` — pairwise similarity 51–71%.

This is **expected, not a problem**: `index.md` is a router that legitimately echoes the titles/topics of the pages it links to, and `zero-to-mastery.md`'s "Industry Landscape Quick Reference" section intentionally summarizes the two reports it points readers toward. There is no unique content duplicated across two "full" pages — recommend **no merges**. The one true redundancy (`Quantum_AI_Zero_to_Mastery.md` PDF-original vs. `zero-to-mastery.md`) is already correctly resolved via the `status: superseded` stub pattern.

---

## 6. Page-by-Page Recommendations

| Page | Recommendation | Why |
|---|---|---|
| `index.md` | **Keep** | Clean router, no issues |
| `zero-to-mastery.md` | **Minor Enhancement** | Add a references footer per section; add 2-3 Mermaid versions of the ASCII diagrams; link a companion notebook once one exists (§8) |
| `Quantum_AI_Zero_to_Mastery.md` | **Keep as-is** | Correct superseded-stub pattern, do not touch |
| `IBM_Associate_Quantum_CertGuide.md` | **Keep** | Strong, narrow-purpose page |
| `IBM_Developer_Quantum_CertGuide.md` | **Keep** | Strong, narrow-purpose page |
| `Quantum_AI_Startups_Report.md` | **Minor Enhancement** | Add a "last verified" freshness banner given how fast Q1 2026 revenue figures age |
| `Quantum_AI_Consultancies_Report.md` | **Minor Enhancement** | Same freshness-banner note |

No page qualifies for Merge, Split, Archive, or Remove.

---

## 7. New Pages — Genuine Gaps Only

Recommending only what §3/§4 actually show missing, not a wishlist:

1. **"Quantum Computing Foundations for Beginners"** — a true zero-prerequisite on-ramp before `zero-to-mastery.md`'s Week 1, so `index.md` doesn't route straight into a Principal Architect programme.
   - *Learning objectives:* qubit vs. bit, superposition/measurement intuition, read your first circuit diagram.
   - *Prerequisites:* none. *Est. reading time:* 20 min.
   - *Related:* `zero-to-mastery.md` (become Week 0), `IBM_Associate_Quantum_CertGuide.md`.

2. **"Quantum Error Correction & Fault Tolerance Deep Dive"** — the one substantive technical gap identified in §3 (surface codes, logical qubits, threshold theorem) that a Principal Architect audience will be asked about.
   - *Prerequisites:* `zero-to-mastery.md` Week 4. *Est. reading time:* 30 min.
   - *Required diagrams:* surface code lattice, logical-vs-physical qubit ratio chart.

3. **A runnable companion notebook repo/folder** (or a `docs/quantum/notebooks.md` index page linking to Colab) covering the Bell state, Grover, and VQE snippets that currently only exist as static code blocks. This directly closes the biggest gap in §4.

Everything else requested in the original curriculum outline (QKD, OpenQASM/TKET, Cirq depth, Pasqal) is a legitimate but lower-priority gap — better handled as **expansions of existing sections** (Week 10's SDK table, Week 11's security section) than as new standalone pages, to avoid fragmenting a domain that currently benefits from consolidation.

---

## 8. Modernization Roadmap

**Quick wins (no new content, <1 hr each):**
- Add a short references footer (Official docs / 1-2 tutorials / 1 book / community link) to the end of `zero-to-mastery.md` and both cert guides.
- Add "last verified" freshness banners to the two industry reports (revenue figures are already 6+ months old relative to 2026-07-17).
- Populate or remove the empty `static/img/quantum/` folder — currently dead weight.

**Medium-term:**
- Write the beginner on-ramp page (§7.1) and re-point `index.md`'s "Start Here" at it instead of straight into the 12-week programme.
- Expand Week 4/11 with the OpenQASM/TKET/QKD/surface-code material identified as gaps in §3, rather than new pages.

**Long-term:**
- Stand up the notebook companion (§7.3) — this is the single highest-leverage change: it converts a strong *reading* curriculum into a strong *doing* curriculum without rewriting any existing page.
- Consider a second, deeper error-correction page (§7.2) once fault-tolerant hardware coverage becomes a recurring reader ask.

---

## What this report deliberately does not do

It does not recommend archiving, merging, or removing any of the 7 current pages — the duplicate-clusters signal is explained by intentional summarization, not redundant content. It does not invent multi-page sub-curricula (e.g., separate pages per algorithm) because the existing single-page consolidation in `zero-to-mastery.md` is working well and splitting it would fragment cross-references that currently resolve cleanly.
