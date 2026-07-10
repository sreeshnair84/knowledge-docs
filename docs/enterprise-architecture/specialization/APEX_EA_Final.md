---
title: "APEX: AI Platform of Platforms"
date_created: 2026-06-29
last_reviewed: 2026-07-10
status: current
supersedes: "docs/enterprise-architecture/framework/TOGAF10_APEX_AI_Platform_NexaBank.pdf, docs/enterprise-architecture/framework/TOGAF10_APEX_CloudNative_GlobalCorp.pdf, docs/enterprise-architecture/framework/TOGAF10_APEX_v4_PeerReviewed.pdf"
source_type: converted-pdf
source_file: "APEX_EA_Final.pdf"
doc_type: framework-reference
framework_name: "APEX AI Platform of Platforms — TOGAF 10 + AI-DLC"
tags: ["enterprise-architecture", "specialization", "togaf", "ai-dlc", "cloud-native"]
---

# APEX: AI Platform of Platforms

**Organisation:** GlobalCorp Enterprises  
**Framework:** TOGAF 10 ADM + AWS AI-DLC  
**Classification:** Confidential — Final Edition (April 2026)  
**Reference:** EA-APEX-MASTER-001

> Full document: [APEX_EA_Final.pdf](APEX_EA_Final.pdf)

---

## Programme Purpose

APEX is GlobalCorp's strategic programme to replace 23 siloed AI tools with a unified, governed **AI Platform of Platforms** built on cloud-native open standards. It applies:

- **TOGAF 10 ADM** as the governance framework (all nine ADM phases)
- **AWS AI-Driven Development Lifecycle (AI-DLC)** as the delivery methodology

The platform provides every GlobalCorp division with reusable AI agent capabilities, governed knowledge bases, shared observability, and a self-service marketplace — eliminating the time, cost, and compliance risk of building isolated AI systems.

---

## Key Outcomes

| Outcome | Current State | APEX Target |
|---|---|---|
| Time-to-market for AI use cases | 9.2 months | 5–6 weeks |
| Duplicated AI tool spend | $14 M/year | $3 M/year |
| Regulatory governance gaps | 47 open gaps | 0 gaps |
| Developer satisfaction (NPS) | −12 | +55 |
| AI agents in production | 23 (siloed) | Platform-governed |
| MTTR for AI incidents | 6.3 hours | < 30 minutes |

---

## Document Structure

The full PDF covers all nine TOGAF ADM phases plus AI-DLC integration:

1. **Team Structure, RACI & Responsibility Mappings** — Operating model, Core Team Register, RACI matrices
2. **AI-DLC: Methodology, Phases & EA Impacts** — Three phases, ADM integration, terminology
3. **Preliminary Phase** — Architecture Principles (APD-001), Tailored ADM, Architecture Repository
4. **Phase A — Architecture Vision** — Statement of Architecture Work, Stakeholder Map, Vision Document
5. **Phase B — Business Architecture** — Business Capability Map, Value Stream Analysis, Organisation Model
6. **Phase C — Information Systems Architecture** — Data Architecture (DAD-APEX-001), Application Architecture (AAD-APEX-001)
7. **Phase D — Technology Architecture** — Multi-Region Cloud-Native Infrastructure, Security, CI/CD, Observability
8. **Phases E–H — Delivery, Governance & Change** — Architecture Roadmap, 5-Tier Governance Model, Change Intelligence Process
9. **Requirements Management** — Architecture Requirements Specification (ARS-APEX-001)
10. **Appendices** — Regulatory Cross-Reference (EU AI Act, DORA, GDPR, MiFID II), Cloud-Native Service Mapping, Glossary

---

## Operating Model Tiers

| Tier | Name | Key Roles |
|---|---|---|
| Tier 0 | Exec | Group CTO, Executive Sponsor, Steering Committee |
| Tier 1 | Govern | Architecture Board (ARB), Chief AI Ethics Officer, Compliance Lead |
| Tier 2 | Platform | VP AI Platform, Platform Eng Lead, AI/ML Eng Lead, SRE Lead, DevX Lead |
| Tier 3 | Domains | Domain Architects ×5, Domain Dev Teams, Data Stewards |
| Tier 4 | Specialist | Security Architect, Data Architect, Model Risk Lead, Reg Affairs Lead |

---

## Regulatory Coverage

- EU AI Act (risk classification and sign-off)
- DORA (change intelligence framing)
- GDPR (data architecture)
- MiFID II (model risk policy)
