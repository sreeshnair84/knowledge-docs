---
title: AI Security & Governance
---

# AI Security & Governance

> **Current as of July 2026.** This section covers securing enterprise AI systems across identity, protocol, policy, observability, regulatory compliance, and organizational maturity.

> **See also:** For CISA role, security architecture practice, and security domains, see [Enterprise Cyber Security Architect](../cybersec-architect/index.md). For security at the agentic UI/application layer, see [Agentic UI Security & DevSecOps](../agentic-ui/security-architecture.md) and [DevSecOps for Agentic Applications](../agentic-ui/devsecops.md). For constitutional AI and alignment security, see [Sovereign Constitutional AI](../sovereign-constitutional-ai/index.md).

---

## What's in This Section

| Subsection | Coverage |
|---|---|
| [AI Security](security/index.md) | 8-volume series: foundations, identity/MCP/A2A blueprint, AI SOC, FinOps security, operating model maturity |
| [DeepMind Control Roadmap](deep-mind/index.md) | Google DeepMind's AI safety and control research roadmap for enterprise architectures |
| [Policy & Authorization](policy/index.md) | Policy-as-code patterns (OPA/Cedar), authorization models, AI-specific access control |

---

## AI Security Is a Three-Layer Problem

```
Layer 1: Identity & Credentials
    Who is this agent? Who authorized it? What can it access?
    → SPIFFE/SPIRE, IETF AIMS, Entra Agent ID, OAuth 2.1/PKCE
    → See: AI Security Vol 02, Agentic AI Security & Identity

Layer 2: Behavioral & Architectural
    Can a compromised agent cause unacceptable harm?
    → Guardrail pipelines, egress control, blast-radius isolation, HITL gates
    → See: AI Security Vols 01/04/08, Security Architecture & Guardrails

Layer 3: Governance & Compliance
    Are AI systems auditable, accountable, and regulation-compliant?
    → NIST AI RMF, EU AI Act, ISO 42001, RAI frameworks, AI SOC
    → See: AI Security Vol 06, Governance & Compliance
```

---

## Regulatory Framework Map (July 2026)

| Framework | Type | Key 2026 dates | Obligations |
|---|---|---|---|
| **EU AI Act** | Mandatory law (EU) | Art. 50 + GPAI enforcement: **Aug 2, 2026**; Annex III high-risk: **Dec 2, 2027** | Risk classification, GPAI docs, transparency, human oversight |
| **NIST AI RMF 1.0** | Voluntary (US) | Current; AI 600-1 (Jul 2024); CAISI agent standards (Feb 2026) | GOVERN / MAP / MEASURE / MANAGE |
| **ISO/IEC 42001:2023** | Certifiable std | ISO 42006:2025 published; 350+ orgs certified (Apr 2026) | AI management system, 38 controls |
| **OWASP Agentic Top 10** | Industry | 2026, 100+ contributors | ASI01–ASI10 threat taxonomy |

---

## Cross-Section Navigation

| Topic | Location |
|---|---|
| OWASP ASI01–ASI10, SPIFFE/AIMS, bounded autonomy | [Agentic AI Security & Identity](../coding-tools/enterprise-ai-architect/agentic-ai-security-identity.md) |
| 18-threat catalog, 14-layer guardrail map | [Security Architecture & Guardrails](../coding-tools/enterprise-ai-architect/agentic-ai-security-guardrails.md) |
| EU AI Act, NIST AI RMF, ISO 42001, state laws | [Governance & Compliance](../coding-tools/enterprise-ai-architect/enterprise-ai-governance-compliance.md) |
| MCP OAuth 2.1 / A2A Agent Card trust | [Agent Interoperability & Orchestration](../coding-tools/enterprise-ai-architect/agent-interoperability-orchestration.md) |
| OTel GenAI observability, anomaly detection | [Reliability, Observability & Governance](../coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance.md) |
| EntraID 3LO agent auth, OBO flows | [Auth & Identity](../ai-protocols/auth/index.md) |

