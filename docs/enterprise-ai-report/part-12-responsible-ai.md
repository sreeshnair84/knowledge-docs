---
title: "Part 12 — Responsible AI"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
tags: ["responsible-ai", "fairness", "transparency", "explainability", "bias", "privacy", "safety", "eu-ai-act", "nist-ai-rmf", "iso-42001", "owasp-llm"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 12 — Responsible AI

> **Report Context:** Part 12 of the [Enterprise AI Research Report](./index). Authoritative guides are in the **Sovereign Constitutional AI** and **AI Security Governance** sections — this page maps the full Responsible AI framework and links to each area.

---

## Responsible AI Dimensions

```
┌───────────────────────────────────────────────────────┐
│              RESPONSIBLE AI FRAMEWORK                  │
├──────────────┬────────────────────────────────────────┤
│  PRINCIPLES  │  IMPLEMENTATION                        │
├──────────────┼────────────────────────────────────────┤
│ Fairness     │ Bias detection, fairness metrics,       │
│              │ demographic parity testing              │
├──────────────┼────────────────────────────────────────┤
│ Transparency │ Model cards, decision logging,          │
│              │ disclosure of AI use                   │
├──────────────┼────────────────────────────────────────┤
│ Explainability│ SHAP/LIME for ML, chain-of-thought     │
│              │ for LLMs, citation attribution in RAG  │
├──────────────┼────────────────────────────────────────┤
│ Privacy      │ PII detection/redaction, data           │
│              │ minimisation, right to erasure         │
├──────────────┼────────────────────────────────────────┤
│ Security     │ See Part 13                            │
├──────────────┼────────────────────────────────────────┤
│ Grounding    │ RAG for factual grounding, citation,   │
│              │ hallucination measurement              │
├──────────────┼────────────────────────────────────────┤
│ Safety       │ Content moderation, harmful content    │
│              │ filtering, constitutional constraints  │
├──────────────┼────────────────────────────────────────┤
│ Human Oversight│ HITL/HOTL/HOOL patterns,             │
│              │ human recourse, override capability   │
└──────────────┴────────────────────────────────────────┘
```

---

## Regulatory Standards

### EU AI Act (2024–2026)
The EU AI Act introduces a risk-based regulatory framework for AI systems. All enterprises operating in the EU or offering AI-powered products/services to EU residents must comply.

| Risk Level | Definition | Examples | Requirements |
|-----------|------------|---------|--------------|
| **Unacceptable Risk** | Banned | Social scoring, real-time biometric surveillance | Prohibited — cannot deploy |
| **High Risk** | Regulated | Credit scoring, recruitment AI, medical diagnostic AI, critical infrastructure | Conformity assessment, registration, documentation, human oversight |
| **Limited Risk** | Transparency obligations | Chatbots, deepfakes | Must disclose AI use to users |
| **Minimal Risk** | No specific obligations | Spam filters, AI games | Voluntary code of practice |

**Key compliance requirements for High Risk AI:**
- Risk management system documented
- Data governance (training data quality, bias mitigation)
- Technical documentation (model card equivalent)
- Logging and traceability
- Transparency for users
- Human oversight mechanism
- Accuracy and robustness standards
- Post-market monitoring

**Primary guide:** [EU AI Act coverage — Landing Zone](../ai-foundations/agentic_ai_landing_zone_eu_ai_act)

---

### NIST AI RMF (Risk Management Framework)
The US National Institute of Standards and Technology AI Risk Management Framework provides a structured approach to identifying, assessing, and managing AI risks. It is technology-agnostic and voluntary (except where mandated by sector regulation).

**Four core functions:**
1. **Govern** — Establish AI risk governance structures, policies, and culture
2. **Map** — Identify AI risks in context (technical, operational, societal)
3. **Measure** — Analyse and assess risk impact and likelihood
4. **Manage** — Prioritise and implement risk treatments; monitor effectiveness

**Primary guide:** [Sovereign Constitutional AI Handbook](../ai-security-governance/Sovereign_Constitutional_AI_RAI_Implementation_Handbook)

---

### ISO 42001 (AI Management Systems)
The first international standard for AI management systems — analogous to ISO 27001 for information security. Provides a framework for organisations to demonstrate responsible AI governance.

**Key clauses:**
- Clause 4: Organisational context (AI use, stakeholders, AI policy)
- Clause 6: Planning (AI objectives, AI impact assessment)
- Clause 8: Operation (AI system lifecycle management)
- Clause 9: Performance evaluation (monitoring, audit)
- Clause 10: Improvement (corrective action, continual improvement)

---

### ISO 23894 (AI Risk Management)
Provides guidance on AI risk management, complementing NIST AI RMF and aligned with ISO 31000 enterprise risk management.

---

### OWASP LLM Top 10
The OWASP Top 10 for LLM Applications identifies the most critical security risks for GenAI systems:

| # | Risk | Description |
|---|------|-------------|
| LLM01 | Prompt Injection | Malicious input manipulates LLM behaviour |
| LLM02 | Insecure Output Handling | Downstream system trusts LLM output without validation |
| LLM03 | Training Data Poisoning | Adversarial data corrupts model behaviour |
| LLM04 | Model Denial of Service | Inputs consuming excessive resources |
| LLM05 | Supply Chain Vulnerabilities | Compromised components in the AI supply chain |
| LLM06 | Sensitive Information Disclosure | LLM reveals sensitive training data or system prompts |
| LLM07 | Insecure Plugin/Tool Design | Tool integrations with insufficient access control |
| LLM08 | Excessive Agency | LLM given too much capability or autonomy |
| LLM09 | Overreliance | Trusting LLM output without verification |
| LLM10 | Model Theft | Unauthorised access to model weights or APIs |

**Primary guide:** [AI TRiSM Complete Guide](../ai-security-governance/security/AI-TRiSM-Complete-Guide)

---

### MITRE ATLAS
ATLAS (Adversarial Threat Landscape for Artificial-Intelligence Systems) is the AI equivalent of MITRE ATT&CK. It documents adversarial techniques, tactics, and case studies specifically for AI/ML systems.

Key ATLAS tactics: Reconnaissance, Resource Development, Initial Access, ML Attack Staging, Exfiltration, Impact.

**Primary guide:** [AI Red Teaming Guide](../ai-security-governance/security/AI-Red-Teaming-Guide)

---

## Implementation Playbook

### Step 1: RAI Governance Structure
Appoint a Responsible AI Officer. Form a cross-functional Responsible AI Council (see [Part 6](./part-06-governance)). Define the enterprise AI ethics principles (typically 6–8 principles covering the dimensions above).

### Step 2: Risk Classification
Classify every AI use case against EU AI Act risk levels and internal risk criteria (see [Part 9 — Prompt/Agent Approval](./part-09-operating-processes)). High-risk AI requires full conformity assessment.

### Step 3: Bias & Fairness Assessment
For every AI system affecting people:
- Identify protected characteristics (age, gender, race, disability, etc.)
- Measure outcome disparities across groups
- Apply fairness metrics: demographic parity, equalised odds, individual fairness
- Document findings in the model card / AI system card

### Step 4: Transparency & Explainability
- Publish AI disclosure to users (EU AI Act transparency obligation for limited risk)
- Implement chain-of-thought or citation-based explainability for consequential decisions
- Maintain decision logs for regulatory audit purposes
- Enable human recourse mechanism (users can challenge AI decisions)

### Step 5: Human Oversight Implementation
Design AI systems with appropriate human oversight:
- **HITL** (Human-in-the-Loop): human must approve before action
- **HOTL** (Human-on-the-Loop): human monitors; can override in real-time
- **HOOL** (Human-out-of-the-Loop): fully autonomous; human reviews retrospectively
- Choose oversight level based on risk class (High Risk → HITL required)

### Step 6: Continuous Monitoring & Improvement
- Monitor for bias drift (fairness metrics can degrade as data distributions shift)
- Track hallucination rates and grounding quality
- Run quarterly RAI reviews; annual external RAI audits
- Incorporate RAI findings into continuous improvement cycle (see [Part 9](./part-09-operating-processes))

---

## RAI Metrics Dashboard

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Hallucination rate (RAG systems) | <1% | >2% |
| PII leakage incidents | 0 | Any occurrence |
| Bias delta (max outcome gap across groups) | <5% | >10% |
| HITL escalation rate | Appropriate per use case | >30% (may indicate agent overreach) |
| User challenge / recourse rate | <1% | >3% |
| High-risk AI use cases with current conformity assessment | 100% | <100% |
| RAI incident rate | 0 high severity | Any high severity |

---

## Authoritative Guides

| Guide | What It Covers |
|-------|---------------|
| [Sovereign Constitutional AI Handbook](../ai-security-governance/Sovereign_Constitutional_AI_RAI_Implementation_Handbook) | Full RAI implementation, EU AI Act, ISO 42001 |
| [RAI Operating Model](../sovereign-constitutional-ai/rai-operating-model) | Fairness, transparency, explainability, bias |
| [AI Safety Framework](../sovereign-constitutional-ai/ai-safety-framework) | Safety, human oversight, grounding |
| [AI Risk Taxonomy](../sovereign-constitutional-ai/ai-risk-taxonomy) | Privacy, security, hallucination risk taxonomy |
| [Constitutional AI Engineering](../sovereign-constitutional-ai/constitutional-ai-engineering) | Constitutional constraints for AI |
| [AI TRiSM Complete Guide](../ai-security-governance/security/AI-TRiSM-Complete-Guide) | OWASP LLM Top 10 mitigation |
| [AI Red Teaming Guide](../ai-security-governance/security/AI-Red-Teaming-Guide) | MITRE ATLAS, adversarial testing |
| [Model Cards & System Cards Guide](../ai-security-governance/security/Model-Cards-System-Cards-Guide) | Transparency artifacts |

---

## Related Parts

- [Part 6](./part-06-governance) — Responsible AI governance roles and operating model
- [Part 8](./part-08-organizational-roles) — RAI Officer, AI Auditor, AI Risk Officer roles
- [Part 9](./part-09-operating-processes) — Red teaming, hallucination handling processes
- [Part 13](./part-13-security-model) — Security controls (OWASP LLM Top 10, MITRE ATLAS)
