---
title: "Part 8 — AI Governance & Compliance"
date: 2026-07-09
---

# Part 8 — AI Governance & Compliance

**Audience:** CISOs, Chief AI Officers, compliance officers, and enterprise architects responsible for governing AI systems in regulated environments.

**Related:**
[Overview](index.md) |
[AI Security](04-ai-security.md) |
[Technology Investment](10-technology-investment.md) |
[Sovereign & Constitutional AI](../sovereign-constitutional-ai/index.md) |
[AI Governance Operating Model](../sovereign-constitutional-ai/ai-governance-operating-model.md)

> **Current as of July 2026.** AI governance frameworks are maturing rapidly. EU AI Act enforcement of GPAI and Article 50 transparency obligations began August 2, 2026. ISO 42001 certifications exceed 500 organisations globally. This part maps every major framework and explains how they interact.

---

## 1. Responsible AI Principles

Before governance mechanics, the foundational ethical principles that all governance frameworks encode:

| Principle | Description | Governance Control |
|---|---|---|
| **Fairness** | AI systems treat individuals equitably; no discriminatory outcomes | Bias testing; diverse training data; demographic parity metrics |
| **Transparency** | AI decision-making is explainable and auditable | Explainability tools (SHAP, LIME); model cards; logging |
| **Accountability** | Clear ownership of AI system outcomes | Model owner; AI product owner; governance committee oversight |
| **Privacy** | Personal data handled with respect for rights and consent | DSPM; consent management; privacy impact assessments |
| **Safety** | AI systems do not cause physical, psychological, or societal harm | Red teaming; safety classifiers; human oversight |
| **Reliability** | AI systems perform consistently and as expected | Evaluation frameworks; regression testing; monitoring |
| **Security** | AI systems are resistant to manipulation and misuse | Controls across all parts of this handbook |
| **Human oversight** | Humans can understand, correct, and override AI decisions | HITL/HOTL/HOOL tiers; audit trails; kill switches |

---

## 2. AI Governance Structure

### 2.1 Governance Roles

| Role | Responsibility |
|---|---|
| **AI Ethics Board** | Sets principles and policies; escalation point for contested decisions |
| **Chief AI Officer (CAIO)** | Owns AI strategy and governance programme |
| **CISO** | Owns AI security controls; AI red team; model risk integration |
| **Model Risk Officer (MRO)** | Quantifies and monitors model risk; validation |
| **AI Product Owner** | Owns each deployed AI system; responsible for compliance |
| **Data Steward** | Governs training data; consent; classification |
| **AI Red Team** | Adversarial testing; safety evaluation |
| **Architecture Review Board (ARB)** | Reviews new AI capabilities; approves deployment |

### 2.2 AI Governance Lifecycle

```
Ideation → Assessment → Design → Development → Validation → Deployment → Monitoring → Retirement
    ↑           ↑           ↑           ↑             ↑             ↑              ↑
Risk class   Privacy     Security    Data        Red team       ARB           Continuous
assessment   impact      review      governance  & safety       approval      compliance
             assessment  (threat     review      testing                      monitoring
                         model)
```

---

## 3. NIST AI Risk Management Framework (AI RMF 1.0)

The NIST AI RMF is the US government's voluntary framework for managing AI risk. Its four functions:

### 3.1 GOVERN

Establishes organizational practices, culture, and accountability:
- AI policies and procedures documented and communicated
- AI risk tolerance defined and approved by leadership
- Roles and responsibilities assigned for AI risk management
- Workforce trained on AI risk and responsible use

### 3.2 MAP

Identifies AI risks in context:
- AI system categorized by application domain and risk level
- Stakeholders identified (users, affected parties, operators)
- Potential harms enumerated (physical, financial, psychological, societal)
- Threat model documented

### 3.3 MEASURE

Quantifies and tracks AI risks:
- Bias and fairness metrics defined and measured
- Performance metrics established with acceptable thresholds
- Uncertainty and confidence calibration assessed
- Red team findings tracked and remediated
- Model drift monitored post-deployment

### 3.4 MANAGE

Treats and monitors AI risks:
- Risk treatment decisions documented (accept, mitigate, transfer, avoid)
- Incident response plan for AI failures
- Escalation procedures for unexpected AI behaviour
- Decommissioning criteria defined

**NIST AI 100-1** (AI RMF 1.0) is supplemented by:
- **NIST AI 100-2**: Red teaming guidance for generative AI
- **NIST AI 100-4**: Reducing risks posed by synthetic content
- **NIST CAISI**: Standards for agentic AI security (February 2026)

---

## 4. ISO/IEC 42001:2023

ISO 42001 is the first certifiable AI management system standard.

### 4.1 Scope

Analogous to ISO 27001 for information security, ISO 42001 establishes an AI Management System (AIMS) covering:
- AI policy and objectives
- AI system lifecycle management
- Risk management for AI systems
- Data management for AI
- Human oversight and accountability
- Supplier and third-party AI governance

### 4.2 Key Controls (Annex A)

| Control Group | Examples |
|---|---|
| **AI system design** | Document intended purpose; assess impact; design for transparency |
| **Data for AI** | Classify training data; validate quality; document provenance |
| **Testing and evaluation** | Define evaluation criteria; red team; validate against requirements |
| **Human oversight** | Document oversight mechanisms; define escalation paths |
| **Supplier AI** | Assess third-party AI risks; contractual obligations; audit rights |
| **Incident management** | Detect AI incidents; respond; review; learn |

**Certification status (mid-2026):** 500+ organisations certified globally, predominantly in financial services, healthcare, and technology sectors.

### 4.3 ISO 42001 vs ISO 27001 Relationship

ISO 42001 is **designed to integrate with** ISO 27001:
- Both use the ISO High-Level Structure (HLS)
- AI risks are added to the ISO 27001 risk register
- Existing ISMS controls are extended (not replaced) to cover AI
- Organisations with ISO 27001 can achieve ISO 42001 with incremental effort

---

## 5. ISO/IEC 27001:2022

Foundation information security management standard. Key 2022 updates relevant to AI:

- **A.5.23**: Information security for use of cloud services (directly applicable to managed AI APIs)
- **A.8.8**: Management of technical vulnerabilities (extended to include AI model vulnerabilities)
- **A.5.7**: Threat intelligence (AI threat intelligence as explicit input)
- New controls for supplier relationships covering AI third-party risk

---

## 6. OWASP LLM Top 10 (2025 Edition)

| # | Vulnerability | Description | Primary Control |
|---|---|---|---|
| LLM01 | **Prompt Injection** | Attacker injects instructions via input | Input validation; privilege separation |
| LLM02 | **Sensitive Information Disclosure** | Model reveals training data or system prompt | Output filtering; differential privacy |
| LLM03 | **Supply Chain** | Compromised model, data, or dependencies | AIBOM; provenance verification; signing |
| LLM04 | **Data and Model Poisoning** | Training data manipulation | Data lineage; validation; integrity checks |
| LLM05 | **Improper Output Handling** | Downstream systems trust LLM output naively | Output validation; treat as untrusted |
| LLM06 | **Excessive Agency** | Agent takes high-impact actions without oversight | Scope limitation; HITL; kill switches |
| LLM07 | **System Prompt Leakage** | System prompt revealed to user | Explicit instructions; gateway filtering |
| LLM08 | **Vector and Embedding Weaknesses** | RAG poisoning; embedding inversion | RAG access control; chunk validation |
| LLM09 | **Misinformation** | Model generates false information | Grounding; RAG; output verification |
| LLM10 | **Unbounded Consumption** | Resource abuse; DoS via excessive generation | Rate limiting; cost controls; timeouts |

---

## 7. MITRE ATLAS

MITRE ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) is the authoritative adversarial ML threat framework.

### 7.1 ATLAS Tactic Categories

| Tactic | Description | Example Technique |
|---|---|---|
| **Reconnaissance** | Gather information about AI system | AML.T0000: Search for victim AI information |
| **Resource Development** | Prepare attack resources | AML.T0002: Obtain capabilities |
| **Initial Access** | Gain access to AI system | AML.T0012: Valid accounts |
| **Execution** | Run malicious inputs | AML.T0051: Prompt injection |
| **Persistence** | Maintain access to AI | AML.T0018: Backdoor ML model |
| **Defence Evasion** | Avoid detection | AML.T0015: Evade ML model |
| **Exfiltration** | Steal AI assets | AML.T0024: Exfiltrate via ML inference API |
| **Impact** | Degrade or destroy AI capability | AML.T0031: Denial of ML service |

### 7.2 ATLAS + ATT&CK Integration

ATLAS extends MITRE ATT&CK by adding ML-specific tactics. An attack on an AI-powered application may traverse both frameworks:

```
ATT&CK: Initial Access (phishing → user credentials)
        ↓
ATT&CK: Lateral Movement (credentials → AI platform)
        ↓
ATLAS: Execution (prompt injection → model manipulation)
        ↓
ATLAS: Exfiltration (model inference → training data extraction)
```

---

## 8. EU AI Act

The EU AI Act is the world's first comprehensive AI regulation. Enforcement timeline:

| Date | Milestone |
|---|---|
| Feb 2, 2025 | Prohibited AI practices banned (Article 5) |
| Aug 2, 2025 | GPAI model governance obligations in effect |
| **Aug 2, 2026** | **Article 50 transparency obligations; notified body requirements** |
| Dec 2, 2027 | High-risk AI system obligations (Annex III) in effect |
| 2030 | Full Article 6 obligations for embedded high-risk AI |

### 8.1 Risk Classification

| Risk Level | Category | Obligations |
|---|---|---|
| **Unacceptable Risk** | Prohibited AI (social scoring, real-time biometric) | Banned entirely |
| **High Risk** | Critical infrastructure, education, employment, law enforcement, etc. | Full conformity assessment; registration; HRIA |
| **Limited Risk** | Chatbots, deepfakes, AI-generated content | Transparency / disclosure obligations |
| **Minimal Risk** | Spam filters, AI in video games | Voluntary codes of practice |

### 8.2 GPAI (General Purpose AI) Obligations

LLMs like Claude, GPT-4, and Gemini are classified as GPAI models. Obligations (in force since Aug 2025):
- Technical documentation (training data summary, evaluation results)
- Copyright compliance (EUCC data provenance)
- Transparency (information for downstream deployers)

**Systemic risk GPAI** (models trained on > 10²⁵ FLOP, including frontier models): Additional obligations:
- Model evaluation and red teaming
- Adversarial testing
- Incident reporting to EU AI Office
- Cybersecurity risk assessment

---

## 9. Additional Frameworks

### 9.1 DORA (Digital Operational Resilience Act)

**Scope:** Financial entities in the EU (banks, insurers, investment firms, crypto service providers)
**Key AI obligations:**
- AI systems used in critical or important functions require ICT risk assessment
- Third-party AI providers (LLM vendors) subject to oversight if systemic
- Incident reporting for ICT incidents including AI-related failures
- Digital operational resilience testing including AI systems

### 9.2 NIS2 Directive

**Scope:** Operators of essential and important services across EU member states
**AI relevance:**
- Cybersecurity risk management must cover AI systems in scope
- Incident reporting obligations apply to AI-related incidents affecting service continuity
- Supply chain security obligations apply to AI model providers as third parties

### 9.3 GDPR and AI

GDPR applies to AI systems that process personal data of EU residents. Key intersections:

| GDPR Requirement | AI Implementation |
|---|---|
| **Legal basis for processing** | Consent or legitimate interest required before using personal data in AI training |
| **Data minimisation** | Include only necessary data in training sets; avoid PII in prompts |
| **Right to explanation** | High-stakes AI decisions require explanation (automated decision-making, Art. 22) |
| **Data subject rights** | Right to access, rectification, erasure — must be implementable for AI-processed data |
| **Privacy by design** | Embed privacy controls in AI system design, not as afterthought |

### 9.4 PCI DSS v4.0 (2024)

PCI DSS applies to AI systems that store, process, or transmit cardholder data:
- AI inference endpoints processing card data are in-scope for PCI
- Requirements 6 (secure development) and 12 (policies) apply to AI model deployment
- Requirement 8 (identity) applies to AI access to cardholder data environments

### 9.5 HIPAA

HIPAA applies to AI systems processing Protected Health Information (PHI):
- PHI must not be submitted to public AI APIs without BAA
- AI model fine-tuned on PHI requires same safeguards as any PHI system
- AI-generated clinical notes are covered if they contain PHI

---

## 10. AI Governance Maturity Model

| Level | Name | Characteristics |
|---|---|---|
| 0 | **Unaware** | No AI governance; ad hoc AI use; no risk visibility |
| 1 | **Reactive** | Governance triggered by incidents; informal policies |
| 2 | **Defined** | AI policy exists; roles assigned; basic inventory of AI systems |
| 3 | **Managed** | Risk assessments for AI; compliance tracked; training programmes |
| 4 | **Optimising** | AI governance integrated into business processes; metrics-driven; board-level AI risk reporting |
| 5 | **Adaptive** | Continuous improvement; AI-assisted governance; predictive risk management |

**2026 benchmark:** Most enterprises are Level 1–2. Financial services and regulated industries leading at Level 3. Level 4+ is the 3-year target for mature organizations.

---

## 11. AI Governance KPIs

| KPI | Target (Mature) | Measurement |
|---|---|---|
| AI systems inventoried | 100% | Annual AI system audit |
| AI systems with risk assessment | 100% of high-risk | Risk assessment per new deployment |
| AI systems with documented owner | 100% | CMDB integration |
| Red team coverage | 100% of customer-facing AI | Quarterly red team |
| Training data PII review | 100% before use | Automated PII scanner on training data |
| Model incidents resolved within SLA | >95% | Incident management metrics |
| ISO 42001 compliance controls implemented | >80% | Gap assessment |
| Human oversight coverage for high-risk actions | 100% | Agent audit log review |
| Regulatory obligation tracking | 100% | Compliance register |
