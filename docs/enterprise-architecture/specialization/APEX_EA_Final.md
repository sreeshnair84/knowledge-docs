---
title: "APEX: AI Platform of Platforms"
date_created: 2026-04-01
last_reviewed: 2026-07-17
status: current
supersedes: "archive/enterprise-architecture/framework/TOGAF10_APEX_AI_Platform_NexaBank.md"
source_type: converted-pdf
source_file: "APEX_EA_Final.pdf"
doc_type: guide
framework_name: "APEX AI Platform of Platforms — TOGAF 10 + AI-DLC"
tags: ["enterprise-architecture", "specialization", "togaf", "ai-dlc", "cloud-native"]
covers_version: "Final Edition — April 2026"
---
# APEX: AI Platform of Platforms

**Organisation:** GlobalCorp Enterprises
**Programme:** APEX — AI Platform of Platforms
**Framework:** TOGAF 10 ADM + AI-DLC | Cloud-Native / Vendor-Agnostic
**Reference:** EA-APEX-MASTER-001 | **Issue Date:** April 2026
**Classification:** Confidential — Approved Final

The authoritative Enterprise Architecture blueprint for the

**APEX**programme. Applies TOGAF 10 ADM as governance skeleton and

**AI-DLC** as velocity engine to create a cloud-native AI Platform of Platforms. Covers all nine ADM phases, full team structure, RACI, responsibility mappings, cloud-native service design, and regulatory compliance across

**EU AI Act**, DORA, GDPR, MiFID II, and internal model risk policy.

---

## Executive Summary

### Programme Purpose

APEX is GlobalCorp's strategic programme to replace 23 siloed AI tools with a unified, governed AI Platform of Platforms built on cloud-native open standards. It applies the TOGAF 10 Architecture Development Method (ADM) as its governance framework and the AWS AI-Driven Development Lifecycle (AI-DLC) as its delivery methodology — positioning AI as a central collaborator across design, build, and operations, not merely a peripheral productivity tool. The platform provides every GlobalCorp division with reusable AI agent capabilities, governed knowledge bases, shared observability, and a self-service marketplace — eliminating the time, cost, and compliance risk of building isolated AI systems.

> **Programme at a Glance:** 10 TOGAF ADM Phases · 30+ Architecture Documents · 5 Pioneer Domains · 6 Regulatory Frameworks · 24 Cloud-Native Patterns · 18 Team Roles Defined

### What This Programme Delivers

APEX delivers three interlocking outcomes: • Velocity — time-to-market for AI use cases reduced from 9.2 months to a planning baseline of 5–6 weeks through AI-DLC Construction phase, reusable agent templates, and self-service onboarding • Governance — five-tier continuous governance model replacing quarterly gate reviews; automated conformance, real-time observability, and Decision Explanation Artefacts for every regulated agent decision • Platform Economics — $14M annual duplicated spend eliminated through shared infrastructure, reusable tooling, and centralised compliance — generating positive NPV within 24 months of platform go-live

### Programme Pain Chain — Current State vs. Target

| Problem Area | Current State | APEX Target | Delivery Mechanism |
| --- | --- | --- | --- |
| Time-to-market for AI use cases | 9.2 months | 5–6 weeks (planning baseline) | AI-DLC Construction; reusable templates; automated compliance pipeline |
| Duplicated AI tool spend | $14 M / year | $3 M / year | Platform consolidation; shared observability; agent marketplace |
| Regulatory governance gaps | 47 open gaps | 0 gaps | Automated conformance; DEA pattern; DORA change framing |
| Developer satisfaction (NPS) | -12 | Target: +55 | Self-service portal; AI-DLC mob sessions; reduced compliance toil |
| Agents in production | 23 (siloed) | 120 (platform-governed) | Agent lifecycle management; health scoring; marketplace |
| MTTR for AI incidents | 6.3 hours | < 30 minutes | LGTM observability; AI-DLC Operations; incident agent (Pioneer 4) |

---

## Series Structure

This blueprint is published as a **4-part series**. This page is the series index — the Executive Summary above is the only full-programme overview; each part below covers genuinely distinct ground and should be read as a standalone reference for its topic.

| Part | Title | What's unique to this part |
| --- | --- | --- |
| 1 | [Team Structure, RACI & Operating Model](./APEX_EA_Final_Part1_Team_Structure_RACI.md) | The federated operating model, Core Team Register (18 roles), all 3 RACI matrices (Agent Lifecycle, Platform Governance, Regulatory & Compliance), the Responsibility Assignment Matrix, Stakeholder Power/Interest Map, and Team Interaction & Dependency Map |
| 2 | [AI-DLC Methodology & Foundation Architecture](./APEX_EA_Final_Part2_AI_DLC_Methodology_Foundation_Architecture.md) | What AI-DLC is and its terminology, its impact across all 10 TOGAF ADM phases, the 5 operating-model transformations it forces, the phased adoption roadmap, plus TOGAF Preliminary Phase principles, Architecture Vision (Phase A), and Business Architecture (Phase B) |
| 3 | [Information Systems & Technology Architecture](./APEX_EA_Final_Part3_Information_Systems_Technology_Architecture.md) | TOGAF Phase C (data classification, AI-native data entities, application component model, API catalogue) and Phase D (multi-region deployment, security architecture, the L1–L5 Layered Verification CI/CD pipeline) |
| 4 | [Delivery, Governance & Reference](./APEX_EA_Final_Part4_Delivery_Governance_Reference.md) | TOGAF Phases E–H (architecture roadmap, legacy tool migration strategy, Solution Building Blocks, 5-tier governance model, change intelligence), the full 162-item Requirements Management traceability set, the Regulatory Cross-Reference Matrix, Cloud-Native Service Mapping, Glossary, and Document Control |

### Who should start where

Readers assembling a **team and governance model** for a comparable programme should start with Part 1. Readers evaluating the **AI-DLC methodology** itself, or the earliest TOGAF phases (Preliminary/Vision/Business), should start with Part 2. Readers focused on **data, application, and infrastructure design** should go straight to Part 3. Readers who need the **delivery roadmap, migration plan, governance tiers, regulatory mapping, or glossary** should go to Part 4.

---

## Document Control

| Versio n | Issue Date | Authors | Description | Approved By |
| --- | --- | --- | --- | --- |
| 1.0 | January 2025 | Enterprise Architecture Team | Initial release — TOGAF 10 ADM phases A–D | Architecture Review Board |
| 2.0 | March 2025 | Enterprise Architecture Team | Full ADM coverage; Architecture Contracts; Governance model added | Group CTO |
| 3.0 | April 2026 | Enterprise Architecture Team | Cloud-native edition (vendor-agnostic); AI-DLC integrated; table formatting improved | Group CTO |
| 4.0 — FINAL | April 2026 | Enterprise Architecture Team | Final edition: team structure added (org model, core team register, RACI: Agent Lifecycle, RACI: Platform Governance, RACI: Regulatory, Responsibility Assignment Matrix, Stakeholder Map, Team Interaction Map); DEA service; Agent Gateway; Embedding Compatibility Contract; Data Maturity Gate; Phase Boundary Receipts; DORA change framing; Layered Verification Model; Agent Sprawl governance; 19 requirements; 24-entry Cloud-Native Service Mapping; full glossary | Group CTO |
| 5.0 — SERIES SPLIT | July 2026 | Enterprise Architecture Team | Split into a 4-part series per repo multi-part-series standard; this page became the series index (Executive Summary retained here); full Document Control history retained in Part 4 | Enterprise Architecture Team |

TOGAF® is a registered trademark of The Open Group. EU AI Act, DORA, GDPR, MiFID II, and BCBS 239 are legislative instruments of their respective issuing bodies. All product names mentioned as cloud-provider equivalents are trademarks of their respective owners.
