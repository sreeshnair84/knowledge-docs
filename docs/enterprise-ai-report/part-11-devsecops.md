---
title: "Part 11 — AI DevSecOps"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
tags: ["devsecops", "mlops", "llmops", "agentops", "promptops", "dataops", "gitops", "cicd"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 11 — AI DevSecOps

> **Report Context:** Part 11 of the [Enterprise AI Research Report](./index). Authoritative guides are in the **AI Development**, **Agentic UI**, and **Enterprise Architecture** sections — this page maps the full AI DevSecOps landscape and links to each area.

---

## The AI DevSecOps Stack

AI DevSecOps extends traditional DevSecOps with AI-specific operational disciplines:

```
Traditional DevSecOps
    CI/CD · SecurityOps · GitOps · PlatformOps

Plus AI-Specific Disciplines:
    ModelOps · LLMOps · AgentOps · PromptOps
    DataOps · KnowledgeOps · EvaluationOps · ContextOps · MemoryOps
```

---

## Discipline Definitions & Key Practices

### CI/CD for AI
Standard continuous integration and deployment practices extended for AI artifacts. Every change to model configuration, prompt, agent, or knowledge base triggers a pipeline.

**What triggers the pipeline?**
- Code change → standard CI tests + AI integration tests
- Prompt version change → prompt eval suite
- Model version change → regression eval + canary deployment
- Agent configuration change → agent simulation tests
- Knowledge base update → retrieval quality check

**Key AI-specific CI gates:**
- Evaluation score threshold (don't deploy if quality drops)
- Hallucination rate check (reject if rate exceeds threshold)
- Safety test pass (required before any customer-facing deployment)
- Cost budget check (estimated cost of new version within approved budget)

---

### ModelOps
Operationalisation of ML model training, deployment, monitoring, and retraining. The "traditional" ML engineering discipline.

**Key practices:** Feature store management, training pipelines, model registry, model serving, model monitoring, automated retraining triggers.

**Tooling:** MLflow, Kubeflow, SageMaker Pipelines, Azure ML, Vertex AI Pipelines.

---

### LLMOps
Operational discipline for large language model deployment and management in production.

**Key practices:** LLM deployment pipelines, model version pinning, prompt version management, A/B testing, cost optimisation (caching, routing), latency monitoring, fine-tuning pipelines.

**Tooling:** LangSmith, Langfuse, Helicone, LiteLLM, OpenRouter, GPTCache.

**Primary guide:** [AIDLC Agile CI/CD Transformation](../ai-development/aidlc/AIDLC_Agile_CICD_AI_Transformation_2026)

---

### AgentOps
Operational discipline for AI agent deployment, monitoring, and lifecycle management.

**Key practices:** Agent deployment pipelines, agent health monitoring (loop detection, tool error tracking), HITL queue management, emergency shutdown procedures, agent fleet management, version management of compound agent artifacts.

**Primary guide:** [AgentOps Production Guide](../enterprise-architecture/ai-architecture/AgentOps-Production-Guide)

---

### PromptOps
Version control, testing, deployment, and monitoring of system prompts.

**Key practices:** Prompt registry, semantic versioning, approval workflow automation, A/B test management, prompt performance monitoring, hot-swap without redeployment.

**Primary guide:** [Enterprise PromptOps](../agentic-systems/platform/Enterprise_PromptOps_AWS_AgentCore_2026)

---

### DataOps
Data pipeline automation and quality management for AI training and knowledge base data.

**Key practices:** Data versioning, pipeline orchestration, data quality monitoring, lineage tracking, schema evolution management.

**Tooling:** Airflow, dbt, Great Expectations, Delta Lake, DVC.

**Primary guide:** [Data Architecture for AI Report](../knowledge-engineering/data/Data_Architecture_for_AI_Report)

---

### KnowledgeOps
Operational discipline for managing enterprise knowledge bases used in RAG systems.

**Key practices:** Document ingestion pipelines, freshness monitoring, PII scanning automation, access control synchronisation, retrieval quality monitoring, knowledge base versioning.

**Primary guide:** [Autonomous Knowledge Engineering System](../knowledge-engineering/knowledge/Autonomous_Knowledge_Engineering_System)

---

### EvaluationOps
Continuous automated evaluation of AI system quality across all deployment stages.

**Key practices:** Evaluation test suite management, LLM-as-judge pipelines, human annotation queue, regression detection, quality dashboards, drift alerting.

**Primary guide:** [AI Agent Evaluation Framework Complete](../ai-development/testing/AI_Agent_Evaluation_Framework_Complete)

---

### ContextOps
Operational management of the context assembly pipeline — ensuring context quality, freshness, and efficiency.

**Key practices:** Context pipeline monitoring, retrieval quality tracking, context cache management, context compression pipeline, token budget monitoring.

---

### MemoryOps
Operational management of agent and conversational memory systems.

**Key practices:** Memory store health monitoring, retention policy enforcement, privacy deletion automation, memory index maintenance, episodic memory pruning.

---

### SecurityOps (AI-specific)
AI security operations extending traditional SecOps with AI-specific threat monitoring.

**Key practices:** Prompt injection monitoring, jailbreak attempt detection, data exfiltration via AI monitoring, agent action anomaly detection, AI SBOM management.

**Primary guide:** [AI SOC, Observability & Red Team](../ai-security-governance/security/AI-SOC-Observability-RedTeam-Memory)

---

### GitOps for AI
Infrastructure-as-code and configuration-as-code for AI platform components.

**Key practices:** AI platform config in Git (model routing rules, guardrail config, policy definitions), GitOps reconciliation loops, drift detection for AI platform config.

---

### PlatformOps
Operation of the AI platform itself — the infrastructure that all other AI ops disciplines depend on.

**Key practices:** AI platform SRE, capacity planning, cost optimisation, vendor SLA management, GPU cluster operations.

---

## AI DevSecOps Pipeline Pattern

```
┌─────────────────────────────────────────────────────────┐
│                  AI DEVSECOPS PIPELINE                   │
│                                                          │
│  [Code Commit / Prompt Change / Config Change]           │
│             ↓                                            │
│  [Automated Lint & Format Check]                         │
│             ↓                                            │
│  [Unit Tests + AI Integration Tests]                     │
│             ↓                                            │
│  [Security Scan: SAST, secrets detection, SBOM]          │
│             ↓                                            │
│  [Evaluation Gate: quality score ≥ threshold]            │
│             ↓                                            │
│  [Safety Gate: no high-severity safety failures]         │
│             ↓                                            │
│  [Cost Gate: estimated cost within budget]               │
│             ↓                                            │
│  [Deploy to Staging]                                     │
│             ↓                                            │
│  [Staging Evaluation Suite + Integration Test]           │
│             ↓                                            │
│  [Canary Deployment (5% traffic)]                        │
│             ↓                                            │
│  [Production Monitoring: 24h window]                     │
│             ↓                                            │
│  [Promote to 100% or Rollback]                           │
└─────────────────────────────────────────────────────────┘
```

---

## Comparison: AI DevSecOps vs Traditional DevSecOps

| Practice | Traditional | AI DevSecOps |
|----------|------------|--------------|
| Test artifact | Source code | Code + model + prompt + evaluation suite |
| Quality gate | Tests pass | Evaluation score threshold met |
| Security scan | SAST, DAST, SCA | + Prompt injection test, adversarial test, SBOM for AI |
| Deployment strategy | Blue/green, rolling | + Shadow, canary with quality monitoring, A/B prompt test |
| Monitoring | Uptime, error rate, latency | + Quality drift, hallucination rate, cost per token, agent task completion |
| Rollback trigger | Error rate spike | + Quality degradation, safety incident, cost overrun |
| Release cadence | Days/weeks | Prompts: hours; Models: weeks; Agents: days–weeks |

---

## Authoritative Guides

| Guide | Discipline | What It Covers |
|-------|-----------|---------------|
| [AIDLC Agile CI/CD Transformation](../ai-development/aidlc/AIDLC_Agile_CICD_AI_Transformation_2026) | CI/CD, LLMOps | AI CI/CD pipelines, sprint cadence |
| [Agile in the Age of Agentic AI](../ai-development/aidlc/Agile_in_the_Age_of_Agentic_AI_2026) | AgentOps | Agile for agent delivery |
| [AgentOps Production Guide](../enterprise-architecture/ai-architecture/AgentOps-Production-Guide) | AgentOps | Agent deployment and operations |
| [Agentic UI DevSecOps](../agentic-ui/devsecops) | CI/CD, SecurityOps | Full DevSecOps for AI applications |
| [Enterprise PromptOps](../agentic-systems/platform/Enterprise_PromptOps_AWS_AgentCore_2026) | PromptOps | Prompt lifecycle management |
| [AI SOC, Observability & Red Team](../ai-security-governance/security/AI-SOC-Observability-RedTeam-Memory) | SecurityOps | AI security operations |
| [Autonomous Knowledge Engineering System](../knowledge-engineering/knowledge/Autonomous_Knowledge_Engineering_System) | KnowledgeOps | Knowledge pipeline automation |
| [AI Agent Evaluation Framework](../ai-development/testing/AI_Agent_Evaluation_Framework_Complete) | EvaluationOps | Evaluation pipelines |

---

## Related Parts

- [Part 9](./part-09-operating-processes) — Model rollout, canary deployment, agent approval processes
- [Part 10](./part-10-service-catalog) — Evaluation Service, Guardrail Service used in pipelines
- [Part 13](./part-13-security-model) — Security controls embedded in DevSecOps pipelines
- [Part 14](./part-14-observability) — Observability powering monitoring stages
