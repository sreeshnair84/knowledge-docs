---
title: "Enterprise Cyber Security Architect"
date_created: 2026-07-09
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cybersec-architect"]
---

# Enterprise Cyber Security Architect

**Audience:** Enterprise architects, CISOs, CIOs, CTOs, Chief AI Officers, technology investment boards, and security practitioners leading digital transformation and AI adoption.

**Related:**
[AI Security & Governance](../ai-security-governance/index.md) |
[AI Protocols & Auth](../ai-protocols/auth/index.md) |
[Enterprise Architecture](../enterprise-architecture/index.md) |
[Sovereign & Constitutional AI](../sovereign-constitutional-ai/index.md) |
[Cloud Platforms](../cloud-platforms/index.md)

> **Current as of July 2026.** This handbook transforms you into an expert capable of leading enterprise cyber security strategy, designing secure enterprise architectures, advising CXOs on technology investment, evaluating AI security risks, and building AI-first secure organizations.

---

## Purpose & Scope

Modern enterprise cyber security cannot be treated as an isolated technical function. It must connect **Enterprise Architecture**, **Security Architecture**, **Technology Investment**, **Digital Transformation**, **AI Adoption**, **Cloud Transformation**, **Agentic AI**, and **Enterprise Governance** into a coherent operating model.

This handbook provides a complete reference for advisors who need to speak authoritatively to:

- **CIOs** — on technology roadmaps and security investment priorities
- **CISOs** — on threat landscapes, security architecture, and operational models
- **CTOs** — on AI adoption risks and secure architecture patterns
- **Chief AI Officers** — on AI governance, model risk, and agentic system controls
- **Enterprise Architects** — on security integration into EA frameworks and deliverables
- **Investment Boards** — on risk-adjusted ROI, build-vs-buy, and platform strategy

---

## 15-Part Handbook Map

| Part | Title | Key Topics |
|---|---|---|
| [1](01-evolution.md) | Cyber Security Evolution | Network → AI → Autonomous security; Traditional vs Cloud-Native vs AI-Native |
| [2](02-enterprise-security-architecture.md) | Enterprise Security Architecture | Business / Information / Application / Technology layers |
| [3](03-security-domains.md) | Security Domains | Identity, Cloud, Network, Endpoint, Application, Data, Infrastructure, Operations |
| [4](04-ai-security.md) | AI Security | Foundation models, attack surface, AI threat taxonomy (30+ threat types) |
| [5](05-agentic-ai-security.md) | Agentic AI Security | Agent identity, MCP/A2A security, multi-agent systems, kill switches |
| [6](06-identity-architecture.md) | Identity Architecture | Human/Machine/AI/Agent identity; delegation, token exchange, secrets mgmt |
| [7](07-cloud-security.md) | Cloud Security Architecture | AWS / Azure / GCP comparison; GPU security, private AI, air-gapped AI |
| [8](08-ai-governance.md) | AI Governance & Compliance | NIST AI RMF, ISO 42001, OWASP LLM Top 10, MITRE ATLAS, EU AI Act |
| [9](09-security-operations.md) | Security Operations | SOC evolution, AI SOC, threat hunting, red/blue/purple teams |
| [10](10-technology-investment.md) | Technology Investment | Business case, roadmaps, risk-adjusted ROI, TCO/NPV/IRR, platform rationalization |
| [11](11-ai-investment.md) | AI & Security Investment | Build vs Buy, security automation ROI, investment trade-off frameworks |
| [12](12-ea-deliverables.md) | EA Deliverables | Security principles, target architecture, ADRs, threat models, ZT reference arch |
| [13](13-security-patterns.md) | Security Patterns | Secure RAG, Secure MCP, Secure Agent Runtime, AI Gateway, HITL, DLP |
| [14](14-case-studies.md) | Industry Case Studies | 10 industries: FinServ, Healthcare, Government, Defense, Retail, and more |
| [15](15-emerging-trends.md) | Emerging Trends 2026–2030 | Post-quantum crypto, confidential AI, SBOM/AIBOM, AI-native SOC, cyber mesh |

**Companion:** [Use Case Transcript](usecase-transcript.md) — Advisory session dialogue for a financial services firm adopting agentic AI.

---

## How Security Connects to Enterprise Architecture

```
Business Strategy
    ↓ defines
Security Strategy & Risk Appetite
    ↓ shapes
Security Architecture (TOGAF / SABSA / NIST CSF)
    ↓ governs
Security Domains (Identity, Cloud, Network, Data, Operations…)
    ↓ implemented in
Technology Stack (IAM, SIEM, CNAPP, AI Security Controls…)
    ↓ measured by
Security KPIs → Investment Decisions → Roadmap Updates
```

Enterprise security architecture is not a technology problem — it is a **business capability problem** mapped onto a technology stack. Every control must be traceable to a business outcome, a regulatory obligation, or a risk reduction target.

---

## Three Eras of Enterprise Security (Summary)

| Era | Focus | Model | Failure Mode |
|---|---|---|---|
| **Traditional** (pre-2015) | Perimeter defence | Castle-and-moat | Assumes trusted interior |
| **Cloud-Native** (2015–2022) | Identity-centric, Zero Trust | Never trust, always verify | Identity sprawl, misconfiguration |
| **AI-Native** (2023→) | Behaviour-based, autonomous | Adaptive, agentic controls | Model manipulation, agent hijack |

The AI era introduces **new attack surfaces** (prompt injection, model extraction, agent hijacking) and **new defenders** (AI-assisted SOC, autonomous remediation, AI-driven identity governance). Security architects must master both.

---

## Cross-Section Navigation

| If you need to go deeper on… | See |
|---|---|
| Agent identity protocols (SPIFFE, OAuth 2.1, IETF AIMS) | [AI Protocols — Auth & Identity](../ai-protocols/auth/index.md) |
| MCP security and A2A protocol trust | [MCP & A2A Deep Dive](../coding-tools/enterprise-ai-architect/mcp-a2a-protocol-deep-dive.md) |
| AI governance maturity models | [Sovereign & Constitutional AI](../sovereign-constitutional-ai/index.md) |
| Kong AI Gateway and API security | [AI Gateway](../cloud-platforms/ai-gateway/index.md) |
| Bedrock AgentCore security patterns | [AWS AgentCore](../cloud-platforms/aws/index.md) |
| Policy-as-code (OPA, Cedar) | [Policy & Authorization](../ai-security-governance/policy/index.md) |
| EA frameworks (TOGAF, Zachman) | [Enterprise Architecture](../enterprise-architecture/index.md) |
