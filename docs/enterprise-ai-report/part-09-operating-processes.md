---
title: "Part 9 — AI Operating Processes"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
source_file: ""
tags: ["ai-processes", "model-onboarding", "agent-approval", "incident-response", "prompt-governance", "red-teaming"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 9 — AI Operating Processes

> **Report Context:** Part 9 of the [Enterprise AI Research Report](./index). Covers all enterprise AI operational processes — from model onboarding and prompt approval through incident response, red-teaming, and continuous improvement.

---

## Why AI Processes Are Different

Traditional ITIL-based processes (Change Management, Incident Management, Problem Management) were designed for deterministic software. AI systems are **non-deterministic, probabilistic, and data-dependent** — they require a fundamentally different set of operational processes:

| Traditional Process | AI Equivalent | Key Difference |
|--------------------|--------------|-----------------|
| Change Management | Model Rollout + Canary Deployment | Changes are continuous; rollback is model-version-specific |
| Incident Management | AI Incident Response | Hallucination, drift, and agent failures require AI-specific playbooks |
| Problem Management | Root Cause Analysis | Root cause may be data drift, prompt drift, or model behaviour change |
| Configuration Management | Model + Prompt + Agent Registry | Configuration is a compound of model version + prompt version + tool config |
| Service Catalogue | AI Service Catalogue | Services include LLM APIs, embedding, RAG, agents with probabilistic SLAs |
| Release Management | Evaluation Gates + Canary | Release requires evaluation score threshold, not just test pass rate |

---

## Process 1 — Model Onboarding

### Objective
Safely introduce a new AI model (LLM, embedding, specialist model) into the enterprise environment, ensuring it meets security, compliance, performance, and governance standards before production use.

### Trigger
- New foundation model version released by vendor (e.g., Claude Sonnet 4.7 → 4.8)
- New use case requiring a model not currently in the approved catalogue
- Performance degradation of existing model prompting evaluation of alternatives
- Cost optimisation requiring evaluation of smaller/cheaper models

### Process Flow

```
[Model Identification] → Vendor releases new model or team requests new model
        ↓
[Initial Assessment] → AI Architect reviews model card, technical specs, pricing
        ↓
[Security Assessment] → AI Security Engineer: data residency, terms of service, API security
        ↓
[Privacy & Compliance Review] → AI Gov Officer: GDPR, EU AI Act classification, acceptable use policy
        ↓
[Technical Evaluation] → AI Engineer: benchmark on internal test sets; latency; token cost
        ↓
[Responsible AI Assessment] → RAI Officer: bias evaluation, safety testing, content policy
        ↓
[Cost Modelling] → FinOps: token cost projections, volume pricing negotiation
        ↓
[Approval Gate] → AI Governance Board: approve, conditionally approve, or reject
        ↓
[Platform Onboarding] → AI Platform Engineer: configure in model gateway, set quotas, enable logging
        ↓
[Sandbox Deployment] → Available to approved teams in sandbox environment
        ↓
[Production Promotion] → Full production availability with monitoring active
```

### Key Artifacts
- Model Assessment Report (security, privacy, performance, RAI)
- Model Card (vendor-provided, supplemented with enterprise evaluation data)
- Approved Model Registry entry (version, capabilities, constraints, approved use cases)
- Cost model (per-token pricing, volume estimates, budget allocation)

### Decision Gate Criteria
| Gate | Pass Criteria |
|------|--------------|
| Security Assessment | Data residency confirmed, no unacceptable data sharing terms |
| Privacy Review | GDPR compliance confirmed, PII processing assessment complete |
| Performance Evaluation | Meets baseline benchmark thresholds for target use cases |
| RAI Assessment | Bias evaluation complete; no critical safety failures |
| Cost Approval | Total cost within approved AI budget envelope |

### SLA
- Standard model onboarding: 10 business days
- Fast-track (minor version upgrade of approved model family): 3 business days
- Emergency (security patch/model recall): 24 hours

### Stakeholders
| Role | Responsibility |
|------|---------------|
| AI Architect | Technical lead for evaluation |
| AI Security Engineer | Security and privacy assessment |
| AI Gov Officer | Compliance review, registry management |
| RAI Officer | Responsible AI evaluation |
| FinOps | Cost modelling and approval |
| AI Governance Board | Final approval |

---

## Process 2 — Prompt Approval

### Objective
Ensure that system prompts deployed to production AI features are reviewed for quality, safety, compliance, and alignment with enterprise standards before deployment.

### Scope
Applies to all system prompts (not user turn prompts) deployed to production AI features accessible to employees or customers.

### Process Flow

```
[Prompt Draft] → AI Engineer or Prompt Engineer writes prompt
        ↓
[Peer Review] → Second AI Engineer reviews: technical quality, injection resistance
        ↓
[Automated Evaluation] → Evaluation pipeline runs: quality benchmarks, adversarial tests, PII test suite
        ↓
[Content & Safety Review] → RAI Officer reviews: safety, bias, tone, prohibited content
        ↓
[Compliance Review] (if applicable) → Legal/Compliance: regulated industries or customer-facing
        ↓
[Approval] → AI Gov Officer approves and registers in Prompt Registry
        ↓
[Version Control] → Prompt committed to Prompt Registry with version tag
        ↓
[Deployment] → Deployed via platform (linked to model version, feature version)
        ↓
[Production Monitoring] → Prompt performance tracked; drift alerts trigger re-review
```

### Prompt Registry Schema
```
prompt_id: PRO-2026-0847
feature: customer-service-assistant
version: 3.2.1
model_family: claude-4
approved_by: AI Gov Officer (jane.smith@enterprise.com)
approval_date: 2026-07-14
review_cycle: 90 days
content_hash: sha256:a3f2...
status: active
next_review: 2026-10-14
risk_class: medium
change_summary: "Added instruction to escalate regulatory complaints to human agent"
```

### Risk Classification
| Risk Class | Description | Review Requirements |
|------------|-------------|---------------------|
| Low | Internal-only, non-sensitive domain | Peer review + automated eval |
| Medium | Customer-facing or sensitive domain | Full approval process |
| High | Regulated domain (finance, health, legal) | Full process + Legal review |
| Critical | High-stakes autonomous action | Full process + Governance Board |

### SLA
- Low risk: 2 business days
- Medium risk: 3 business days
- High risk: 5 business days
- Critical: 5 business days + Governance Board scheduling

---

## Process 3 — Agent Approval

### Objective
Ensure AI agents are reviewed for goal alignment, action scope, safety, security, and governance compliance before deployment to production, especially where agents take actions with real-world consequences.

### Agent Risk Classification
Before entering the approval process, each agent is classified:

| Agent Risk Class | Criteria | Examples |
|-----------------|----------|---------|
| **Observe-only** | Agent reads and reports; no write actions | Research agent, analytics agent |
| **Low-impact Action** | Actions reversible; limited scope | Document drafting, calendar scheduling |
| **Medium-impact Action** | Actions affect enterprise systems; partially reversible | Email sending, ticket creation, data updates |
| **High-impact Action** | Actions have material business or financial impact; hard to reverse | Payment initiation, contract execution, HR actions |
| **Critical Action** | Actions with regulatory, legal, or safety implications | Trading, medical advice, security policy changes |

### Process Flow

```
[Agent Specification] → AI Product Manager writes Agent Charter:
                        goals, tools, memory, authorisation scope, constraints
        ↓
[Technical Architecture Review] → AI Architect: tool design, MCP config, A2A interfaces, memory
        ↓
[Safety & Adversarial Testing] → AI Security Engineer + RAI Officer:
                                  red-team agent; test prompt injection, goal misalignment,
                                  unintended tool use, loop detection
        ↓
[Simulation Testing] → AgentOps Engineer: simulate production scenarios;
                       measure task completion rate, human handoff rate, cost per task
        ↓
[Human Oversight Design Review] → RAI Officer: HITL triggers adequate? Escalation paths defined?
        ↓
[Identity & Authorisation Review] → AI Security Engineer:
                                    agent has least-privilege identity; actions logged
        ↓
[Governance Board Review] (High and Critical only) → AI Governance Board:
                           approves agent scope, constraints, and monitoring requirements
        ↓
[Canary Deployment] → Deployed to small user group (5–10%); monitored for 72 hours
        ↓
[Full Deployment] → Approved for full production
```

### Agent Charter Template
```markdown
# Agent Charter: [Agent Name]

## Purpose
One-paragraph description of agent's business purpose and value.

## Goals
- Primary goal 1
- Primary goal 2

## Tools & Permissions
| Tool | Permitted Actions | Rate Limit |
|------|------------------|------------|
| CRM API | Read customer records | 100 req/hr |
| Email | Send to internal addresses only | 50/day |

## Memory Configuration
- Working memory: conversation context only
- Episodic memory: task history (30-day retention)
- Long-term: none

## Human-in-the-Loop Triggers
- Any action exceeding £10,000 in value
- First contact with any new external party
- Agent confidence below 0.7 on any decision

## Constraints
- Must not access data outside user's authorised scope
- Must log every tool call with rationale
- Must terminate if loop detected (>5 identical actions)

## Risk Class: [Observe-only / Low / Medium / High / Critical]
## Approved By: [AI Gov Officer / Governance Board]
## Review Date: [Date]
```

### KPIs for Agent Approval Process
- Agent approval cycle time (target: <10 business days for Medium risk)
- % agents passing first-time (target: >70%)
- Post-deployment agent incidents per 100 agents (target: <5)
- Average time to detect and respond to agent incident (target: <15 minutes)

---

## Process 4 — Knowledge Ingestion

### Objective
Safely and accurately ingest enterprise documents into knowledge bases used by RAG systems, ensuring quality, access control, and freshness.

### Process Flow

```
[Source Identification] → Knowledge Engineer identifies document sources
        ↓
[PII & Sensitivity Scan] → Automated scan: detect PII, confidential info, restricted content
        ↓
[Classification] → Assign sensitivity label and access control group
        ↓
[Processing Pipeline] → Extract → Clean → Chunk → Embed → Index
        ↓
[Quality Validation] → Sample retrieval test: verify chunks are coherent and retrievable
        ↓
[Access Control Application] → RBAC applied at chunk level (user can only retrieve from permitted sources)
        ↓
[Version Registration] → Document registered in Knowledge Registry with version, source, expiry
        ↓
[Freshness Monitoring] → Scheduled re-ingestion based on document type and change frequency
```

### Document Lifecycle
| Stage | Description | Action |
|-------|-------------|--------|
| Active | Current, authoritative content | Indexed and searchable |
| Superseded | Replaced by newer version | Archive; remove from active index |
| Expired | Past retention period or validity date | Delete from index; archive source |
| Restricted | Access removed due to compliance | Remove from index; access-controlled archive |

### Knowledge Registry Entry
```
doc_id: KD-FIN-2026-04891
source: SharePoint / Finance / Policies / Credit-Policy-v4.2.pdf
sensitivity: Internal Confidential
access_groups: [finance-team, risk-team, compliance-team]
ingested_date: 2026-07-14
version: 4.2
next_review: 2026-10-14
expiry: 2027-01-01
status: active
chunk_count: 47
embedding_model: text-embedding-3-large
```

---

## Process 5 — Model Rollout & Canary Deployment

### Objective
Safely deploy AI model upgrades (new model version, fine-tuned model, updated embedding model) to production with minimal risk.

### Deployment Strategies

| Strategy | Description | When to Use |
|----------|-------------|-------------|
| **Blue/Green** | Two identical environments; traffic switched instantly | Low-risk model updates; fast rollback needed |
| **Canary** | New version receives small % of traffic; ramped up over time | Most model updates; allows gradual quality validation |
| **Shadow** | New model runs in parallel but results not served to users | Major model changes; pre-production quality validation |
| **Feature Flag** | New model activated per user cohort/feature flag | A/B testing; targeted rollouts |

### Canary Process for LLM Version Upgrade

```
[Change Request] → LLMOps Engineer raises model upgrade request
        ↓
[Regression Test Suite Run] → Automated eval on golden test set;
                              compare new vs. old model scores
        ↓
[Canary Config] → Route 5% of production traffic to new model version
        ↓
[Monitoring Window: 24 hours]
    Monitor: quality metrics, latency, cost per token, error rate
    Alert thresholds: >5% quality degradation, >20% latency increase
        ↓
[Ramp: 5% → 25% → 50% → 100%] (each step: 24-hour monitoring window)
        ↓
[Rollback Trigger] → Auto-rollback if alerts breach threshold
        ↓
[Full Promotion] → New version promoted; old version decommissioned after 48 hours
```

### Rollback SLA
- Canary rollback (traffic routing): **< 5 minutes**
- Full rollback (all traffic to previous version): **< 15 minutes**
- Emergency shutdown (all AI service traffic): **< 2 minutes**

---

## Process 6 — Evaluation

### Objective
Continuously assess the quality, safety, and business value of AI systems throughout the lifecycle.

### Evaluation Dimensions

| Dimension | What It Measures | Tooling |
|-----------|-----------------|---------|
| **Task Quality** | Does the AI output meet the task specification? | RAGAS, DeepEval, TruLens |
| **Retrieval Quality** | Is RAG retrieving the right content? | Hit Rate, MRR, NDCG |
| **Safety** | Does output contain harmful, biased, or prohibited content? | Guardrails AI, Azure Content Safety |
| **Hallucination Rate** | Does output contain factual errors or unsupported claims? | FactCheck frameworks, human eval |
| **Latency** | Does the system meet response time SLAs? | Platform observability |
| **Cost** | Is cost per transaction within budget? | Token analytics, cost dashboards |
| **Business Metric** | Does AI feature improve the KPI it was designed for? | A/B test results, analytics |
| **User Satisfaction** | Do users trust and value the AI output? | Thumbs up/down, NPS, CSAT |

### Evaluation Cadence
| Evaluation Type | Frequency | Trigger |
|-----------------|-----------|---------|
| Automated eval pipeline | Continuous (every deployment) | CI/CD gate |
| Regression test suite | Weekly | Scheduled |
| Human evaluation sample | Weekly | Sampling pipeline |
| Business metric assessment | Monthly | Analytics review |
| Comprehensive RAI review | Quarterly | Governance calendar |
| Red team exercise | Semi-annually | Security calendar |
| External audit | Annually | Compliance requirement |

---

## Process 7 — Red Teaming

### Objective
Proactively identify AI system vulnerabilities, failure modes, and safety gaps through adversarial testing before threat actors or users discover them.

### Red Team Exercise Types

| Type | Objective | Who Runs It |
|------|-----------|-------------|
| **Jailbreak Testing** | Can users bypass safety instructions? | AI Security Engineer |
| **Prompt Injection** | Can malicious content in retrieved data hijack the agent? | AI Security Engineer |
| **Goal Misalignment** | Does the agent pursue unintended goals? | RAI Officer + AI Security |
| **Data Exfiltration** | Can the agent leak sensitive data? | AI Security Engineer |
| **Loop / Runaway Testing** | Can the agent get stuck in loops or take uncontrolled actions? | AgentOps Engineer |
| **Tool Abuse** | Can the agent be induced to misuse authorised tools? | AI Security Engineer |
| **Bias Stress Test** | Does the system exhibit bias for specific demographic groups? | RAI Officer |
| **Regulatory Boundary Test** | Does the system comply with regulatory constraints under stress? | AI Gov Officer + Legal |

### Red Team Process
```
[Scope Definition] → Define target system, attack surface, prohibited findings
        ↓
[Team Assembly] → Internal red team + optional external specialists
        ↓
[Threat Modelling] → Apply MITRE ATLAS to identify attack vectors
        ↓
[Attack Execution] → Structured adversarial testing (documented)
        ↓
[Finding Triage] → Classify by severity (Critical / High / Medium / Low)
        ↓
[Remediation Planning] → Engineering team remediates Critical and High within SLA
        ↓
[Validation] → Red team confirms remediation effective
        ↓
[Report Publication] → Findings reported to AI Governance Board; summary to CISO
        ↓
[Incorporation into Test Suite] → Successful attack vectors added to regression test suite
```

### Finding Severity SLA
| Severity | Definition | Remediation SLA |
|----------|------------|-----------------|
| Critical | AI system can cause immediate harm or significant data breach | 24 hours (or take offline) |
| High | Significant safety or security gap; exploitable under realistic conditions | 5 business days |
| Medium | Notable vulnerability; exploitable with effort | 30 days |
| Low | Minor issue; low likelihood or low impact | 90 days |

---

## Process 8 — Hallucination Handling

### Objective
Detect, respond to, and learn from instances where AI systems produce factually incorrect, unsupported, or misleading outputs.

### Detection Mechanisms
| Mechanism | How It Works | Coverage |
|-----------|-------------|----------|
| **Automated FactCheck** | LLM-as-judge compares output against retrieved sources | High (for RAG systems) |
| **Citation Validation** | System checks that cited sources actually contain the stated claim | Medium |
| **Confidence Scoring** | Model self-reports uncertainty; low-confidence outputs flagged | Medium |
| **Human Spot-Check** | Random sampling of outputs reviewed by domain expert | Low (sampling) |
| **User Feedback** | Users flag incorrect outputs via thumbs-down / report button | Reactive |
| **External Fact Database** | Cross-reference claims against authoritative databases | Domain-specific |

### Response Procedure
```
[Hallucination Detected] (automated or user report)
        ↓
[Severity Assessment]
    Is the hallucination harmful / compliance-relevant? → High priority
    Is it minor factual error without material impact? → Standard priority
        ↓
[Immediate Response]
    High priority: Disable feature or add warning banner; notify stakeholders
    Standard priority: Log for batch analysis; add to retraining queue
        ↓
[Root Cause Analysis]
    Is it retrieval failure? → Update knowledge base; tune retrieval
    Is it prompt ambiguity? → Update system prompt; run regression
    Is it model limitation? → Document known limitation; consider model change
    Is it out-of-scope query? → Add query classification; route to human
        ↓
[Fix Deployment] → Standard prompt approval and model rollout processes
        ↓
[Post-Incident Review] → Incorporate findings into evaluation suite and training data
```

---

## Process 9 — AI Security Incident Response

### Objective
Respond to AI-specific security incidents including prompt injection attacks, data exfiltration via AI, jailbreaks affecting users, and agent misuse.

### AI Incident Taxonomy

| Incident Type | Description | Example |
|--------------|-------------|---------|
| **Prompt Injection** | Malicious input hijacks AI behaviour | User embeds instructions in a support ticket to exfiltrate data |
| **Jailbreak** | User bypasses safety guardrails | Customer forces AI to produce prohibited content |
| **Data Exfiltration** | AI leaks sensitive data from knowledge base | RAG system exposes restricted documents |
| **Agent Runaway** | Autonomous agent takes unintended actions | Agent sends unauthorised emails or modifies records |
| **Model Poisoning** | Fine-tuning or RAG data tampered with | Adversary inserts malicious content into knowledge base |
| **Supply Chain** | Compromised model or tool | Third-party MCP tool executes malicious code |
| **Identity Abuse** | Agent identity exploited for privilege escalation | Attacker uses agent credentials to access restricted systems |

### Incident Response Playbook

```
[Detection] → SIEM alert / user report / automated monitoring
        ↓
[P1 Triage] (< 15 minutes)
    Is production AI system actively causing harm? → Initiate emergency shutdown
    Is incident contained? → Continue monitoring; escalate if it spreads
        ↓
[Notification] (< 30 minutes for P1)
    Notify: CISO, CAIO, AI Gov Officer, Legal (for data breach)
    Activate incident response team (on-call AI Security Engineer, AgentOps)
        ↓
[Containment] (< 60 minutes for P1)
    Isolate affected agent/feature (feature flag or emergency shutdown)
    Preserve evidence (logs, conversation traces, tool call records)
    Block attack vector (rate limit, filter, IP block as applicable)
        ↓
[Investigation] (ongoing)
    Full audit log review
    Attack chain reconstruction
    Scope assessment: how many users / what data affected?
        ↓
[Eradication]
    Remove malicious content from knowledge base
    Update prompts / guardrails / filters
    Rotate compromised credentials
        ↓
[Recovery]
    Validate fix with security test
    Staged re-enablement with enhanced monitoring
        ↓
[Post-Incident Review] (within 5 business days)
    Root cause documentation
    Process improvement actions
    Regulatory notification (if data breach: GDPR 72-hour window)
    MITRE ATLAS TTP documentation
```

### Emergency Shutdown Procedure
Every AI system in production **must** have a documented emergency shutdown procedure. The minimum viable shutdown takes **< 2 minutes** and requires no more than one operator action.

```
AI Emergency Shutdown Options:
1. Feature flag OFF → removes AI from user journey immediately
2. API gateway rule → blocks all traffic to affected AI service
3. Agent kill switch → terminates all running agent instances
4. Full AI platform isolation → nuclear option; affects all AI services
```

---

## Process 10 — Agent Rollback

### Objective
Safely revert an AI agent to a previous version when the current version exhibits unexpected or harmful behaviour.

### Rollback Triggers
- Agent task completion rate drops > 10% below baseline
- Human handoff rate rises > 20% above baseline
- Hallucination or tool-error alerts breach threshold
- User complaints escalate
- Security incident involving the agent
- Regulatory compliance breach

### Agent Version Control
Agents must be versioned as a **compound artifact**:
```
Agent Version 2.4.1 =
    Model: claude-sonnet-4-6 (pinned version)
    System Prompt: PRO-2026-0847 v3.2.1
    Tool Config: tools-crm-v1.4, tools-email-v2.1
    Memory Config: mem-config-v1.0
    Evaluation Baseline: score=0.87 (established 2026-06-01)
```

Rollback returns all components to the prior version tag simultaneously.

### Rollback SLA
- Identification to rollback decision: **< 30 minutes** (for urgent)
- Rollback execution: **< 10 minutes**
- Post-rollback validation: **< 30 minutes**

---

## Process 11 — Version Management

### Scope
Version management for all AI artifacts: models, prompts, agents, knowledge bases, evaluation suites, and tool configurations.

### Versioning Schema
```
[component]-[major].[minor].[patch]

Major: Breaking change to behaviour, goal, or interface
Minor: Significant behaviour improvement or feature addition
Patch: Bug fix, safety fix, or minor prompt tuning

Examples:
claude-4-1.0.0 → 1.0.1 (patch: safety fix)
claude-4-1.0.1 → 1.1.0 (minor: new capability)
claude-4-1.1.0 → 2.0.0 (major: model version change)
```

### Dependency Matrix
Every production AI feature maintains a dependency matrix:

| Artifact | Current Version | Previous Version | Change Date | Rollback Safe? |
|----------|----------------|------------------|-------------|----------------|
| LLM Model | claude-4-2.1.0 | claude-4-2.0.0 | 2026-07-01 | Yes (tested) |
| System Prompt | PRO-0847 v3.2.1 | PRO-0847 v3.1.0 | 2026-07-05 | Yes |
| Embedding Model | text-emb-3-large-v2 | text-emb-3-large-v1 | 2026-06-15 | Requires re-index |
| Knowledge Base | KB-FIN-v4.2 | KB-FIN-v4.1 | 2026-07-10 | Yes (soft delete) |
| Tool Config | crm-tools-v1.4 | crm-tools-v1.3 | 2026-07-12 | Yes |

---

## Process 12 — Continuous Improvement

### Objective
Systematically improve AI system quality, safety, efficiency, and business value over time using feedback loops, evaluation insights, and usage patterns.

### Continuous Improvement Flywheel

```
Production Usage
        ↓
Collect Signals: user feedback, quality metrics, cost data, business KPIs
        ↓
Analyse: identify top failure modes, improvement opportunities
        ↓
Prioritise: rank by impact (quality × frequency × business value)
        ↓
Intervene: update prompt / add knowledge / fine-tune / change retrieval strategy
        ↓
Evaluate: measure improvement against baseline
        ↓
Deploy: standard approval and rollout process
        ↓
Back to Production Usage
```

### Feedback Signal Types
| Signal | Source | How Collected |
|--------|--------|--------------|
| Explicit thumbs up/down | Users | UI feedback widget |
| Correction feedback | Users | "What went wrong?" form |
| Dwell time | Users | Analytics (time spent reading response) |
| Escalation rate | Operations | HITL handoff events |
| Task completion rate | Agents | AgentOps monitoring |
| Retrieval success rate | RAG system | Evaluation pipeline |
| Cost trend | Platform | Token analytics |
| Business KPI movement | Finance | Analytics dashboard |

### Improvement Governance
All continuous improvements follow the appropriate approval process:
- Prompt change → Prompt Approval process
- Model change → Model Onboarding process
- Agent change → Agent Approval process (if behaviour-impacting)
- Knowledge change → Knowledge Ingestion process

---

## Process Summary Table

| Process | Owner | Trigger | SLA | Approval |
|---------|-------|---------|-----|---------|
| Model Onboarding | AI Architect | New model needed | 3–10 days | AI Governance Board |
| Prompt Approval | AI Gov Officer | Prompt created/changed | 2–5 days | AI Gov Officer |
| Agent Approval | AI Gov Officer | New agent or major update | 5–10 days | AI Gov Board (High/Critical) |
| Knowledge Ingestion | Knowledge Engineer | New/updated source | 1–3 days | AI Gov Officer |
| Model Rollout | LLMOps Engineer | Version upgrade | 3–5 days + canary | AI Platform Lead |
| Evaluation | AI QA Engineer | Continuous | Continuous | Automated |
| Red Teaming | AI Security Engineer | Semi-annual | 2–4 weeks | CISO + CAIO |
| Hallucination Handling | AI Engineer | Detection event | 24h (high) | AI Product Manager |
| Security Incident | AI Security Engineer | Detection | <15 min response | CISO |
| Agent Rollback | AgentOps Engineer | Alert trigger | <30 min | AgentOps Lead |
| Continuous Improvement | AI Product Manager | Monthly review cycle | Sprint-based | Standard approval per change |

---

## Related Resources

- [Part 6 — Governance Model](./index#part-6) — Governance forums and approval workflows
- [Part 8 — Organizational Roles](./part-08-organizational-roles) — Process owners and RACI
- [AgentOps Production Guide](../enterprise-architecture/ai-architecture/AgentOps-Production-Guide) — Agent operations in depth
- [AI Agent Evaluation Framework](../ai-development/testing/AI_Agent_Evaluation_Framework_Guide) — Evaluation methodology
- [AI Red Teaming Guide](../ai-security-governance/security/AI-Red-Teaming-Guide) — Red team methodology
- [Agentic AI Governance Framework](../ai-security-governance/Agentic_AI_Governance_Framework) — Agent governance policies
