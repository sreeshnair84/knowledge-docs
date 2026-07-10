---
title: "Cleanup Summary — Phase 6 Handoff"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cleanup-summary"]
covers_version: "N/A"
---

# Cleanup Summary — Restructure/Dedup 2026-07

Generated: 2026-07-10  
Branch: `restructure/dedup-2026-07`

---

## Totals

| Metric | Count |
|---|---|
| Files scanned (Phase 0) | 479 |
| Duplicate clusters detected (Phase 1) | 26 |
| Files archived (duplicates/sources retired) | 17 |
| Files kept as DISTINCT (no action) | 12 clusters |
| Files merged (content consolidated) | 1 (Kong auth guide → general guide) |
| Frontmatter normalized (Phase 4) | 226/227 files updated |
| Live markdown pages after cleanup | 227 |
| Broken build links fixed | 3 (1 sidebar + 2 page references) |
| Broken anchor warnings remaining | 14 (pre-existing numeric headings) |

---

## Phase 3 Decisions

### Archived (17 files)

| Archived File | Superseded By | Reason |
|---|---|---|
| `ai-usecases/eu-bank-ai-copilot-research.pdf` | `eu-bank-ai-copilot-complete.pdf` | Near-exact duplicate (sim 1.0) |
| `interview-prep/EY_AI_Architect_Interview_Guide.pdf` | `EY_AI_Architect_Interview_Guide_1.pdf` | Exact duplicate (sim 1.0) |
| `ai-foundations/AI_Native_Architecture_Evolution_Report.pdf` (knowledge-engineering copy) | ai-foundations canonical copy | Misplaced exact copy |
| `ai-protocols/mcp/MCP_Deep_Research_2026.md.pdf` | `MCP_Deep_Research_2026.md` | PDF print of the MD |
| `ai-protocols/auth/EntraID_3LO_Agent_Auth_Volume4.pdf` | `entra-3lo-agent-auth-security-review.md` | Source PDF for Vol.4 MD |
| `ai-protocols/auth/AgentIdentity_Research_2026.pdf` | `agent-identity-entra-vs-awsagentcore.md` | Source PDF for comparison guide |
| `ai-protocols/auth/EntraID_3LO_Agent_Auth_Volume2.pdf` | `entra-3lo-agent-auth-implementation.md` | Source PDF for Vol.2 MD |
| `ai-protocols/auth/EntraID_3LO_Agent_Auth_Volume3.pdf` | `entra-3lo-agent-auth-multiagent-compliance.md` | Source PDF for Vol.3 MD |
| `ai-protocols/auth/EntraID_3LO_Agent_Auth_Research.pdf` | `entra-3lo-agent-auth-standards-architecture.md` | Source PDF for Research MD |
| `ai-protocols/auth/Part2_Tool_Authentication.pdf` | `tool-authentication-connectors.md` | Source PDF for Part 2 MD |
| `coding-tools/claude/Module_2_Claude_API_SDK.pdf` | `claude-api-mastery.md` | Source PDF for API mastery guide |
| `ai-development/testing/AI Agent Evaluation Framework...pdf` | `AI_Agent_Evaluation_Framework_Guide.md` | Source PDF for evaluation guide |
| `cloud-platforms/ai-gateway/kong-ai-gateway-auth-guide.md` | `kong-ai-gateway-guide.md` | Auth sections merged into general guide |
| `ai-usecases/eu-bank-ai-copilot-architecture.docx` | `eu-bank-ai-copilot-complete.md` | Source DOCX for complete MD |
| `enterprise-architecture/specialization/TOGAF10_APEX_CloudNative_GlobalCorp.pdf` | `APEX_EA_Final.pdf` | Scenario variant subsumed |
| `enterprise-architecture/specialization/TOGAF10_APEX_v4_PeerReviewed.pdf` | `APEX_EA_Final.pdf` | Peer-reviewed version subsumed |
| `enterprise-architecture/specialization/TOGAF10_APEX_AI_Platform_NexaBank.pdf` | — | NOTE: initially archived, then restored — distinct AWS Agent Core / UK FCA scenario |

### DISTINCT — Both Files Kept (12 clusters)

- cluster_11: Kong general / auth / Entra ID guides (three distinct scopes)
- cluster_13: EA Communication Guide vs EA Deep Dive Guide
- cluster_14: Quantum market PDFs (Consultancies / Startups / TechGiants)
- cluster_15: Auth Part3 (Identity/OBO) vs Part7 (Standards Reference)
- cluster_16: IBM Associate vs Developer Quantum cert guides
- cluster_18: MSF Requirements runbook vs Platform Factory runbook
- cluster_19: GitHub Copilot series chapters (Part01, Part04, Part07)
- cluster_20: AI-first-to-AI-native vs Sovereign AI roadmap
- cluster_21: CEO Agent Blueprint vs Pitch deck
- cluster_22: Mental Model Encyclopedia vs Strategic Thinking Handbook
- cluster_25: EA Interview Handbook vs EA Interview Handbook DELTA (supplement covering 2025-2026 emerging topics)
- cluster_26: Enterprise AI Architect Communication Guide vs Deep Dive Guide

### Merged (1 cluster)

- cluster_06: `kong-ai-gateway-auth-guide.md` sections 4–13 merged into `kong-ai-gateway-guide.md`. Guide grew from 39K → 71K chars.

---

## Build Status

| Check | Result |
|---|---|
| Docusaurus build | PASS |
| Sidebar doc IDs | CLEAN |
| Broken page links | CLEAN (fixed 3: sidebar + 2 page refs) |
| Broken anchor warnings | 14 pre-existing (numeric heading anchors) |
| Node 24 compatibility | YES (`engines: ">=24"` in package.json) |

---

## Still Needs Review

- **`coding-tools/claude/claude-api-mastery.md`**: 1304 words < 1500 guide minimum. Expand with SDK code patterns from the archived `Module_2_Claude_API_SDK.pdf`.
- **`cloud-platforms/ai-gateway/kong-ai-gateway-guide.md`**: 7525 words > 4000 guide max. Expected for merged comprehensive guide — split auth section if unwieldy.
- **Broken anchors (14)**: Numeric heading anchors on `EA_Soft_Skills_and_Behaviors` and `Enterprise_Architect_in_the_Age_of_AI` — pre-existing, fix by renaming headings to avoid leading numbers.

---

Ready for merge to `main`.
