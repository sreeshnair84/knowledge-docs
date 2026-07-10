---
title: "Part 12 — Enterprise Architecture Deliverables"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cybersec-architect"]
---

# Part 12 — Enterprise Architecture Deliverables

**Audience:** Enterprise architects and security architects producing governance artefacts, architecture documentation, and decision records that integrate security into the EA function.

**Related:**
[Overview](index.md) |
[Security Patterns](13-security-patterns.md) |
[Technology Investment](10-technology-investment.md) |
[Enterprise Architecture](../enterprise-architecture/index.md)

> **Current as of July 2026.** This part shows how security integrates into every major enterprise architecture artefact — from principles to roadmaps — using templates and examples from the AI era.

---

## 1. Security Principles

Security principles are the foundational, technology-agnostic rules that govern all security architecture decisions. They are agreed at executive level and rarely change.

### 1.1 Example Enterprise Security Principles

| # | Principle | Rationale | Implications |
|---|---|---|---|
| P1 | **Least Privilege** | Limiting access scope reduces blast radius of any compromise | All human, machine, and agent identities scoped to minimum necessary access |
| P2 | **Assume Breach** | Perimeter controls alone cannot guarantee secure interior | Defence-in-depth; microsegmentation; rapid detection and response |
| P3 | **Security by Design** | Retrofitting security is 10× more expensive than designing it in | Security requirements captured at initiative inception; threat model before build |
| P4 | **Data is the Ultimate Asset** | Protecting data directly is more resilient than protecting infrastructure | Encryption-first; data classification mandatory; DLP on all sensitive flows |
| P5 | **Identity is the Control Plane** | Network location no longer determines trust | Zero Trust; FIDO2; continuous verification |
| P6 | **AI Systems are Untrusted by Default** | AI model outputs are probabilistic and manipulable | All AI outputs treated as untrusted input; validation before action; human oversight |
| P7 | **Transparency and Auditability** | Security decisions must be explainable and evidence-based | Comprehensive logging; tamper-evident audit trails; explainable AI decisions |
| P8 | **Shared Responsibility is Active, Not Passive** | Cloud and vendor SLAs do not transfer security responsibility | Explicit control assignment for every shared service; vendor security assurance programme |

---

## 2. Security Architecture Vision

The security architecture vision is a 1–2 page document articulating where the enterprise is heading and why.

### 2.1 Vision Template

```markdown
## Security Architecture Vision — [Organisation] — [Year]

### Where We Are Today
[2–3 sentences on current security posture, key gaps, and the forcing
functions driving change: AI adoption, regulatory requirements, threat landscape]

### Where We Need to Be (3-Year Target)
[A clear statement of the target security operating model: e.g.,
"A Zero Trust security posture with AI-native security operations, full
data classification coverage, and ISO 42001-certified AI governance — 
enabling confident adoption of agentic AI across the enterprise."]

### The Journey
[High-level phases: Foundation → Enhancement → Optimisation]

### What This Enables
[Business outcomes enabled by the target security posture]

### What This Costs
[High-level investment envelope — not detailed; directional]
```

---

## 3. Target Architecture and Baseline Architecture

### 3.1 Baseline Architecture Document (Security View)

Captures the current state:
- Inventory of security tools and platforms
- Network architecture diagrams with trust zones marked
- Identity architecture: IdP, MFA coverage, privilege model
- Data flows for sensitive data
- Known vulnerabilities and control gaps

### 3.2 Target Architecture Document (Security View)

Defines the desired end state:

```
Target Security Architecture — 2028

Identity:          100% FIDO2; Entra Agent ID for all AI agents;
                   SPIFFE for all service workloads
Network:           Full SASE deployment; microsegmentation for all
                   production environments
Data:              DSPM covering all cloud data stores; 100% classified;
                   DLP on all AI interactions
AI Security:       Prompt gateway for all AI access; AI red team quarterly;
                   ISO 42001 certified
Operations:        AI-assisted SOC; autonomous tier-1 resolution > 60%;
                   MTTD < 1 hour for critical threats
GRC:               Continuous compliance; automated evidence collection;
                   EU AI Act compliant for all high-risk AI
```

---

## 4. Security Capability Map

A structured view of security capabilities at multiple levels of granularity:

```
Level 0: Enterprise Security
    │
    ├─ Level 1: Risk Management
    │   ├─ Level 2: Cyber Risk Quantification (FAIR)
    │   ├─ Level 2: Third-Party Risk Management
    │   ├─ Level 2: AI Risk Management
    │   └─ Level 2: Risk Reporting
    │
    ├─ Level 1: Identity & Access Management
    │   ├─ Level 2: Human IAM
    │   ├─ Level 2: Machine IAM
    │   ├─ Level 2: AI Agent IAM
    │   ├─ Level 2: PAM
    │   └─ Level 2: IGA
    │
    ├─ Level 1: Threat Management
    │   ├─ Level 2: SIEM/XDR
    │   ├─ Level 2: SOAR
    │   ├─ Level 2: Threat Intelligence
    │   ├─ Level 2: Vulnerability Management
    │   └─ Level 2: AI Threat Detection
    │
    └─ Level 1: AI Security
        ├─ Level 2: Prompt Gateway
        ├─ Level 2: Model Risk Management
        ├─ Level 2: AI Red Teaming
        ├─ Level 2: Agent Identity
        └─ Level 2: AI Governance
```

---

## 5. Architecture Decision Records (ADRs)

ADRs capture significant architecture decisions with their context and rationale. They prevent the same debate from recurring.

### 5.1 ADR Template

```markdown
# ADR-SEC-042: AI Agent Identity Standard

**Status:** Accepted
**Date:** 2026-06-15
**Deciders:** CISO, EA Lead, CTO
**Tags:** identity, agent, security

## Context
We are deploying AI agents across three business units. Agents need identities
to authenticate to MCP servers, databases, and external APIs. We evaluated:
(a) OAuth client credentials with client secrets
(b) SPIFFE/SPIRE workload identity
(c) Cloud managed identity (Azure managed identity)

## Decision
We will use Azure managed identity as the primary agent identity for all
agents deployed in Azure. For multi-cloud and on-prem agents, we will use
SPIFFE/SPIRE. OAuth client credentials are a fallback for external API
integrations that do not support managed identity.

## Rationale
Managed identity eliminates credential storage entirely for Azure-native
agents. SPIFFE provides equivalent capability for non-Azure environments.
OAuth client credentials introduce credential rotation overhead and secret
storage risk.

## Consequences
+ No credential storage for 90%+ of agents
+ Automatic token rotation (no manual rotation required)
+ Requires agents to run in Azure compute or SPIRE-enrolled environments
- Third-party APIs requiring client secret auth need separate handling
```

### 5.2 Security-Critical ADR Catalogue

Every enterprise should maintain ADRs for:
- AI agent identity standard
- AI gateway platform selection
- Zero Trust network architecture approach
- Secrets management platform
- Cloud security platform (CNAPP selection)
- SIEM/XDR platform
- MFA standard (FIDO2 vs. TOTP)
- Data classification framework
- AI governance model and oversight tiers
- Model deployment approach (managed vs. self-hosted)

---

## 6. Trust Boundary Diagrams

Trust boundary diagrams show where data and control flow cross trust zones.

### 6.1 AI System Trust Boundary Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ Trust Zone: Corporate Identity Provider (Entra ID)              │
│  - Authoritative identity source                                │
│  - Conditional Access policies                                  │
└──────────────────────────┬──────────────────────────────────────┘
                           │ (OIDC / SAML assertion)
            ═══════════════╪══════════════════════════  ← Trust Boundary 1
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Trust Zone: AI Gateway (Prompt Gateway)                         │
│  - Authentication verification                                  │
│  - Input filtering (injection, PII)                             │
│  - Rate limiting                                                │
│  - Output filtering                                             │
│  - Audit logging                                                │
└──────────────────────────┬──────────────────────────────────────┘
                           │ (filtered, authenticated request)
            ═══════════════╪══════════════════════════  ← Trust Boundary 2
                           ↓
┌─────────────────────────────────────────────────────────────────┐
│ Trust Zone: Model Serving / LLM API                             │
│  - Model inference                                              │
│  - System prompt + retrieved context                            │
│  - Tool call generation                                         │
└─────┬─────────────────────────────────┬───────────────────────┘
      │ (tool call request)             │ (response)
      ↓                                 ↑
┌─────────────┐               (filtered, validated)
│ Trust Zone: │
│ MCP Server  │ ← Trust Boundary 3
│  - Tool auth│
│  - Resource │
│    access   │
└─────────────┘
```

---

## 7. Threat Models

A threat model systematically identifies threats to an architecture.

### 7.1 STRIDE for AI Systems

| Threat | Category | AI Example | Control |
|---|---|---|---|
| **S**poofing | Identity | Attacker impersonates agent to invoke MCP tools | Agent authentication (managed identity, mTLS) |
| **T**ampering | Integrity | Training data poisoned to alter model behaviour | Data lineage; integrity checks; validation |
| **R**epudiation | Non-repudiation | Agent takes action with no audit trail | Immutable audit logging per agent action |
| **I**nformation Disclosure | Confidentiality | System prompt leaked to user | Gateway filtering; explicit non-disclosure instructions |
| **D**enial of Service | Availability | Model endpoint overwhelmed by prompt flooding | Rate limiting; cost controls; circuit breakers |
| **E**levation of Privilege | Authorization | Agent manipulated to access resources beyond its scope | Least-privilege scoping; task-level tokens |

---

## 8. Zero Trust Reference Architecture

### 8.1 Zero Trust Pillars (CISA Model)

| Pillar | Description | Key Controls |
|---|---|---|
| **Identity** | Verify every user and entity before granting access | FIDO2; continuous auth; UEBA |
| **Device** | Verify device health before granting access | MDM; device compliance; conditional access |
| **Network** | Segment networks; encrypt all traffic | ZTNA; microsegmentation; mTLS |
| **Application** | Secure application access with least privilege | PAM; CASB; API gateway; WAF |
| **Data** | Classify data; protect based on sensitivity | DSPM; DLP; encryption |
| **Visibility & Analytics** | Monitor all activity for anomalies | SIEM; XDR; UEBA |
| **Automation & Orchestration** | Automate response to detected threats | SOAR; CNAPP remediation; AI-assisted |

### 8.2 AI Extension to Zero Trust

The traditional 7 pillars do not account for AI agents. Two additional pillars required:

**Pillar 8 — AI Identity:** Every AI agent must have a verifiable identity (managed identity, SPIFFE, or IETF AIMS). Agents are never trusted because they run on trusted infrastructure.

**Pillar 9 — Intent Verification:** For high-risk actions, verify that the agent's intended action matches the authorizing human's intent (not just that the agent is authenticated). This requires HITL approval gates and intent-aware authorization policies.

---

## 9. Security Roadmaps

### 9.1 Phased Security Roadmap Template

**Phase 1: Foundation (0–6 months)**
- [ ] Deploy FIDO2 MFA for all privileged users
- [ ] Implement AI gateway for all enterprise AI access
- [ ] Deploy CSPM across all cloud environments
- [ ] Establish AI system inventory (all models, endpoints, agents)
- [ ] Publish AI security policy and acceptable use policy

**Phase 2: Enhancement (6–18 months)**
- [ ] SPIFFE/managed identity for all AI agents (eliminate API keys)
- [ ] DSPM deployment covering all cloud data stores
- [ ] AI red team programme (quarterly cadence)
- [ ] CNAPP deployment replacing point CSPM + CWPP tools
- [ ] ISO 42001 gap assessment and remediation

**Phase 3: Optimisation (18–36 months)**
- [ ] AI-assisted SOC (automated tier-1 triage > 60%)
- [ ] Continuous compliance monitoring (automated evidence)
- [ ] ISO 42001 certification
- [ ] Confidential computing for regulated AI workloads
- [ ] Post-quantum cryptography migration plan

### 9.2 Investment Roadmap

Align technology investments to roadmap phases:

| Phase | Initiative | Investment | Risk Reduction | Priority |
|---|---|---|---|---|
| 1 | AI Gateway deployment | $200K | High | Critical |
| 1 | FIDO2 rollout | $150K | High | Critical |
| 1 | CSPM (Wiz/Orca) | $350K/yr | Very High | Critical |
| 2 | CNAPP platform | $800K/yr | Very High | High |
| 2 | Agent identity (SPIFFE) | $200K | High | High |
| 2 | AI red team capability | $300K | High | High |
| 3 | AI-assisted SOC | $500K/yr | High | Medium |
| 3 | ISO 42001 certification | $150K | Medium | Medium |
| 3 | PQC migration (planning) | $100K | Future | Medium |
