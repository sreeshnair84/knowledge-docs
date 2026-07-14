---
title: "Model Cards and System Cards — AI Transparency Documentation Standards"
date: 2026-07-14
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
covers_version: "as of July 2026"
doc_type: guide
source_type: native-md
source_file: ""
tags: ["model-card", "system-card", "ai-transparency", "eu-ai-act", "responsible-ai", "documentation", "governance"]
---

# Model Cards and System Cards — AI Transparency Documentation Standards

> **Current as of July 2026.** Model cards and system cards are structured documentation artifacts for AI systems — describing what they do, how they were built, what they were evaluated on, and where they fail. The EU AI Act (effective August 2026) makes equivalent documentation mandatory for high-risk AI systems.

---

## What Are Model Cards and System Cards?

**Model cards** and **system cards** are documents published alongside AI models and systems to describe their capabilities, limitations, evaluation results, intended use, and safety properties. They serve multiple audiences:

| Audience | What They Need |
|---------|---------------|
| **Developers** | Does this model fit my use case? What are the limitations? |
| **End users** | What can I expect this system to do? When should I not trust it? |
| **Procurement teams** | Does this meet our compliance requirements? What data was it trained on? |
| **Auditors/regulators** | What risks does this system pose? How was it evaluated? |
| **The broader research community** | How does this model compare to others on consistent dimensions? |

### Model Card vs. System Card

| Aspect | Model Card | System Card |
|--------|-----------|-------------|
| **Subject** | The AI model (weights, training, capabilities) | The deployed AI system (model + product + safeguards) |
| **Scope** | Model-level: architecture, training data, benchmarks | System-level: use case, HITL design, abuse mitigations, deployment context |
| **Published by** | Model developer (Anthropic, Google, OpenAI, HuggingFace contributors) | Product/system builder deploying the model |
| **Audience** | Developers and researchers | Regulators, users, procurement, safety teams |
| **Examples** | HuggingFace model cards, Google Model Card Toolkit | Anthropic System Cards, OpenAI System Cards, Meta System Cards |

---

## Why Documentation Is Now Mandatory

### EU AI Act (August 2026)

Article 11 + Annex IV require high-risk AI providers to maintain technical documentation covering:

- General description of the AI system and its intended purpose
- Description of the elements of the AI system and how they interact
- Detailed description of the training methodology and training data
- Design choices and the trade-offs made
- System validation and testing procedures and results
- Standards applied and solutions adopted to comply with requirements
- Reasonably foreseeable risks and the mitigation measures taken

A model card or system card that covers these areas is the primary mechanism for meeting these requirements.

### GPAI Code of Practice (EU)

General-Purpose AI model providers (GPT-4, Claude, Gemini, Llama) face additional documentation requirements under the EU GPAI Code of Practice, including:
- Training data transparency
- Evaluation results on standardized benchmarks
- Known capabilities and limitations at scale

### US AI Executive Order (2023, updated 2025)

Requires AI developers providing dual-use foundation models to government submit documentation of capabilities, evaluations, and safety properties — functionally requiring model cards.

---

## Model Card Structure (Standard)

Following Mitchell et al. (2019, Google) — the foundational academic paper — augmented with 2025–2026 practice:

### Section 1: Model Details

| Field | Description |
|-------|-------------|
| Model name | Official name and version identifier |
| Model type | Architecture family (transformer, diffusion, etc.) |
| Model developer | Organization that trained the model |
| Model date | Training completion date |
| License | Usage license and restrictions |
| Citation | How to cite the model in research |
| Contact | Who to contact for questions |

### Section 2: Intended Use

| Field | Description |
|-------|-------------|
| Primary intended uses | What tasks was this model designed for? |
| Primary intended users | Who is the target user? |
| Out-of-scope uses | What should this model NOT be used for? |
| Prohibited uses | What uses are explicitly forbidden by license/policy? |

### Section 3: Training Data

| Field | Description |
|-------|-------------|
| Training data | What datasets were used? |
| Data collection methodology | How was data collected and processed? |
| Data characteristics | Size, domains, languages, time period |
| Known biases in data | Documented representation gaps |
| Consent and licensing | Whether data subjects consented; data licenses |

### Section 4: Evaluation Results

| Field | Description |
|-------|-------------|
| Performance benchmarks | Standard benchmark results (MMLU, HumanEval, etc.) |
| Disaggregated evaluation | Performance across demographic groups, languages, domains |
| Safety evaluation | Harmful content, refusal behavior, adversarial robustness |
| Limitations | Where the model performs poorly |
| Out-of-distribution behavior | How performance degrades outside training distribution |

### Section 5: Ethical Considerations

| Field | Description |
|-------|-------------|
| Sensitive use cases | Uses requiring additional caution |
| Fairness and bias | Known demographic disparities in performance |
| Privacy | What private information might the model expose? |
| Environmental impact | Training compute and estimated CO₂ |

### Section 6: Caveats and Recommendations

| Field | Description |
|-------|-------------|
| Recommendations | Best practices for deploying this model |
| Known failure modes | Documented scenarios where the model fails |
| Update policy | How will this card be updated as the model evolves? |

---

## System Card Structure (Enterprise)

For deployed AI systems (agents, copilots, applications):

### Section 1: System Overview

```yaml
system_name: Customer Support Agent v2.3
deployer: Acme Corp, Customer Experience Team
model_used: claude-sonnet-4-6 (via Anthropic API)
deployment_date: 2026-06-15
eu_ai_act_risk_class: Limited Risk (Art. 52 transparency obligation)
intended_use: Answer customer support questions; escalate to humans for complex issues
```

### Section 2: Capability and Limitation Statement

What the system can and cannot do:
- Can answer product questions from the knowledge base
- Can initiate returns and exchanges via the Returns API
- Cannot handle legal, medical, or financial advice
- Cannot access customer payment information

### Section 3: Safeguards and Mitigations

| Risk | Mitigation |
|------|-----------|
| Harmful content generation | Output guardrail (Llama Guard + custom rules) |
| PII leakage | Real-time PII detection and redaction before logging |
| Hallucination | RAG-grounded responses; confidence threshold |
| Manipulation | Prompt injection detection (AIDR) |
| Bias in responses | Regular bias auditing; disaggregated eval by demographics |

### Section 4: Human Oversight Design

| Trigger | Human Action Required |
|---------|----------------------|
| Customer dissatisfaction signal | Escalate to human agent |
| Legal/regulatory question detected | Hard block; route to legal team |
| Confidence below threshold | Disclose uncertainty; offer human option |
| AIDR security alert | Session terminated; SOC notified |

### Section 5: Evaluation and Monitoring

- Pre-deployment evaluation suite: 500-task domain-specific eval + adversarial red team
- Production monitoring: LLM-as-judge on sampled sessions (n=200/week)
- Human review: 50 sessions per week reviewed by QA team
- Drift detection: Automated statistical monitoring; alert if quality score drops >5%

### Section 6: Regulatory Compliance

| Requirement | Status |
|------------|--------|
| EU AI Act Art. 52 (transparency) | ✅ Users notified they are interacting with AI |
| GDPR (data minimization) | ✅ Conversation data retained 30 days; no long-term storage |
| ISO 42001 | ✅ Reviewed under AI management system |
| DPDP Act (India) | ✅ Consent obtained for Indian customers |

---

## Quality of Model Card Documentation (2026 Research Finding)

Research analyzing model cards in production (arXiv 2512.12443) found:

| Documentation Element | % of Cards That Include It |
|----------------------|---------------------------|
| Model architecture | >90% |
| Evaluation metrics | >90% |
| Compute requirements | >85% |
| Intended use | >80% |
| Bias and fairness | ~45% |
| Safety evaluation | ~40% |
| Out-of-scope uses | ~35% |
| Interpretability | ~20% |

**The critical gap:** Safety, bias, and out-of-scope documentation — the elements most needed by regulators — are present in fewer than half of published model cards. Enterprise model cards should fill these gaps explicitly.

---

## Tools for Generating Model Cards

| Tool | Description |
|------|-------------|
| **Google Model Card Toolkit** | Open-source Python library; structured output; GitHub |
| **HuggingFace Model Card template** | Web-based; YAML front matter + Markdown; auto-rendered on HF Hub |
| **Microsoft Responsible AI Dashboard** | GUI-driven; integrates with Azure ML; generates structured cards |
| **MLflow Model Registry** | Stores model metadata; can export structured documentation |
| **CycloneDX ML-BOM** | Machine-readable; overlaps with model card for supply chain use |

---

## Integration with AIBOM

Model cards and AIBOMs are complementary and should be generated together:

```
AIBOM → machine-readable inventory (provenance, integrity, license)
Model Card → human-readable documentation (capabilities, limitations, evaluation)

Together: complete picture for developers, users, auditors, and regulators
```

For EU AI Act compliance, both are needed: AIBOM for Annex IV supply chain documentation, model card for capability and risk documentation.

---

## Key Metrics

| KPI | Target |
|----|--------|
| Model card publication rate | 100% of models before production deployment |
| System card coverage | 100% of deployed AI systems |
| Card freshness | Updated within 30 days of any material change |
| Required section completeness | 100% of sections populated (no "TBD" in production cards) |
| Safety evaluation documented | 100% (this is the common gap) |
| EU AI Act Annex IV completeness | 100% for high-risk systems |

---

## References

- [Anthropic: Model System Cards](https://www.anthropic.com/system-cards)
- [HuggingFace: Model Card Guidebook](https://huggingface.co/docs/hub/en/model-card-guidebook)
- [arXiv 2512.12443 — AI Transparency Atlas: Model Card Evaluation Pipeline](https://arxiv.org/pdf/2512.12443)
- [arXiv 2405.06258 — Automatic Generation of Model and Data Cards](https://arxiv.org/pdf/2405.06258)
- [Lawgorithm: AI System Cards — Anthropic's Example](https://lawgorithm.blog/2025/05/26/ai-system-cards-anthropics-example/)
- [Model Cards, System Cards and What They're Quietly Becoming](https://hoeijmakers.net/model-cards-system-cards/)

---

## See Also

| Guide | Link |
|-------|------|
| AI Bill of Materials (AIBOM) | [AI BOM Guide](./AI-Bill-of-Materials-Guide.md) |
| AI TRiSM (governance framework) | [AI TRiSM Guide](./AI-TRiSM-Complete-Guide.md) |
| EU AI Act compliance | [Governance Compliance](../../enterprise-architecture/ai-architecture/enterprise-ai-governance-compliance.md) |
| AIDR (runtime monitoring) | [AIDR Guide](./AIDR-AI-Detection-Response-Complete-Guide.md) |
