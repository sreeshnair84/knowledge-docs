---
title: "Architectural Review Board (ARB)"
date_created: 2026-07-07
last_reviewed: 2026-07-10
status: current
supersedes: "enterprise-architecture/arb/index.md"
source_type: native-md
source_file: ""
tags: ["enterprise-architecture", "arb", "architectural-review-board"]
doc_type: guide
framework_name: Architectural Review Board (ARB)
covers_version: "N/A"
---

# Architectural Review Board (ARB)

A comprehensive reference for running AI-native Architectural Review Boards — covering governance models, economic evaluation, knowledge management, artifact standards, and industry case studies. Includes the 10-volume source series below.

---

## What is an ARB?

An **Architectural Review Board** is a governance body that ensures technology decisions align with enterprise strategy, technical standards, security policies, and economic constraints. In the AI era, the ARB must evolve to evaluate agentic systems, LLM integrations, data residency, safety, and responsible AI practices.

---

## ARB Core Functions

| Function | Description |
| ---------- | ------------- |
| **Architecture Review** | Evaluate solution designs against enterprise standards before build |
| **Standards Governance** | Define, publish, and maintain architectural patterns and reference architectures |
| **Risk Assessment** | Identify technical, security, compliance, and AI-specific risks |
| **Exception Management** | Process and track deviations from approved standards |
| **Technology Radar** | Assess emerging technologies (adopt / trial / assess / hold) |
| **Economic Evaluation** | TCO, ROI, and make-vs-buy analysis for architectural decisions |
| **AI Governance** | Review LLM integrations, agentic systems, data pipelines, and safety controls |

---

## ARB Operating Model

### Meeting Cadence

| Forum | Frequency | Scope |
| ------- | ----------- | ------- |
| Weekly ARB | Weekly | Active project reviews, exception requests |
| Architecture Forum | Monthly | Standards updates, patterns library, retrospectives |
| Strategic Review | Quarterly | Technology radar update, portfolio alignment |
| AI Safety Review | Monthly | LLM deployments, agentic system approvals, safety audits |

### Voting & Quorum

- **Quorum**: Minimum 3 of 5 voting members
- **Approval**: Simple majority for standard requests; unanimous for exceptions affecting security or compliance
- **Escalation**: CTO/CIO for decisions with >$1M impact or regulatory risk

---

## Submission Process

```
1. Architect submits Architecture Decision Record (ADR) via portal
2. ARB secretariat validates completeness (SLA: 2 business days)
3. Pre-review meeting with sponsor architect (optional, 30 min)
4. ARB review session (agenda slot: 15–45 min)
5. Decision: Approved / Conditionally Approved / Deferred / Rejected
6. Decision record published to Knowledge Base within 24 hours
7. Conditions tracked to closure by ARB secretariat
```

---

## Architecture Decision Records (ADRs)

An ADR captures a significant architectural decision with its context, options considered, and rationale.

### ADR Template

```markdown
## ADR-{number}: {Title}

**Status:** Proposed | Accepted | Deprecated | Superseded  
**Date:** YYYY-MM-DD  
**Deciders:** [Names/roles]

### Context
What is the issue motivating this decision?

### Decision Drivers
- Driver 1 (e.g., security requirement)
- Driver 2 (e.g., cost constraint)
- Driver 3 (e.g., team capability)

### Considered Options
1. Option A
2. Option B
3. Option C

### Decision Outcome
**Chosen option:** Option A  
**Rationale:** ...

### Consequences
- Positive: ...
- Negative: ...
- Risks: ...

### Compliance Checklist
- [ ] Security review completed
- [ ] Data residency requirements met
- [ ] Regulatory compliance verified (GDPR, PCI-DSS, etc.)
- [ ] AI safety review completed (if LLM/agentic)
```

---

## AI-Specific Review Criteria

For any submission involving LLMs, generative AI, or agentic systems, the ARB evaluates:

### Model & Provider Assessment

| Criterion | Questions |
| ----------- | ----------- |
| **Model selection** | Why this model? Is there a cheaper/faster alternative for the use case? |
| **Data residency** | Where is inference performed? Does it cross data sovereignty boundaries? |
| **Cost model** | Input/output token pricing, caching strategy, batch vs real-time split |
| **Vendor lock-in** | Can the model be swapped? Is the abstraction layer model-agnostic? |
| **SLA & reliability** | What are the uptime guarantees? What is the fallback if the model is unavailable? |

### Agentic System Assessment

| Criterion | Questions |
| ----------- | ----------- |
| **Agent scope** | What tools/permissions does the agent have? Are permissions scoped minimally? |
| **Human oversight** | Is HITL/HOTL/HOOL implemented appropriately for the risk level? |
| **Prompt injection** | How is the system protected against indirect prompt injection? |
| **Audit trail** | Are all agent decisions, tool calls, and results logged with W3C Trace Context? |
| **Failure modes** | What happens when a tool fails? Are circuit breakers implemented? |
| **Cost controls** | Are per-session and per-day token budgets configured? |

### Safety & Ethics Assessment

| Criterion | Questions |
| ----------- | ----------- |
| **Output validation** | Is there post-processing to catch harmful, incorrect, or sensitive outputs? |
| **Bias testing** | Has the system been tested for demographic bias, language bias, or stereotyping? |
| **Responsible AI policy** | Does the deployment comply with the organisation's RAI policy? |
| **User transparency** | Are users informed they are interacting with AI? |
| **Data handling** | Is PII/PHI handled according to GDPR/HIPAA/local regulations? |

---

## Economic Evaluation Framework

### TCO Template

| Cost Component | Year 1 | Year 2 | Year 3 | Notes |
| ---------------- | -------- | -------- | -------- | ------- |
| Infrastructure | | | | Cloud compute, storage, networking |
| AI/LLM API costs | | | | Model inference (per token pricing) |
| Licensing | | | | SaaS, enterprise agreements |
| Development | | | | Build, test, security review |
| Operations | | | | Monitoring, maintenance, on-call |
| Compliance | | | | Audit, legal, regulatory |
| **Total TCO** | | | | |

### ROI Calculation

```
ROI = (Benefit - Cost) / Cost × 100%

Benefit Sources:
- Productivity gains (FTE hours saved × burdened rate)
- Error reduction (incidents avoided × average incident cost)
- Revenue impact (new capabilities, faster time-to-market)
- Risk reduction (compliance fines avoided)
```

---

## Standards Library

### Approved Patterns

| Pattern | Version | Status | Reference |
| --------- | --------- | -------- | ----------- |
| Multi-Agent Orchestrator | 2.1 | Approved | [Agent SDK Guide](../../coding-tools/claude/claude-agent-sdk-production.md) |
| MCP Tool Design | 1.3 | Approved | [MCP Deep Guide](../../coding-tools/claude/mcp-deep-guide.md) |
| RAG Architecture | 3.0 | Approved | [Knowledge & RAG](../../knowledge-engineering/knowledge/index.md) |
| Zero-Trust Agent Identity | 1.0 | Approved | [Auth & Identity](../../ai-protocols/auth/index.md) |
| Prompt Caching Strategy | 1.1 | Approved | [API Mastery](../../coding-tools/claude/claude-api-mastery.md) |
| HITL/HOTL Decision Framework | 1.2 | Approved | [Agentic Systems](../../agentic-systems/index.md) |

### Technology Radar (July 2026)

| Technology | Ring | Notes |
| ----------- | ------ | ------- |
| Claude Sonnet 4.6 | **Adopt** | Default model for production agentic workloads |
| MCP (Model Context Protocol) | **Adopt** | Standard for tool integration |
| Agent SDK (Anthropic) | **Adopt** | Multi-agent orchestration |
| Fable 5 | **Trial** | Evaluate for long-context tasks; cost premium |
| A2A Protocol | **Assess** | Cross-vendor agent interoperability; early stage |
| Fine-tuning | **Assess** | Only for stable, high-volume, proven use cases |
| Local LLM (air-gapped) | **Assess** | For classified environments; capability gap vs cloud |
| Autonomous agents (HOOL) | **Hold** | Only after proven HOTL stage with 6-month track record |

---

## Common Exception Requests

### Exception: Bypassing Standard Model Selection

**Common reason**: Team wants GPT-4o instead of Claude for a specific task.

**ARB evaluation criteria**:

- Is there a measurable capability gap in the approved model?
- Has benchmarking been done on the specific task?
- What is the incremental cost?
- Does the alternative model meet data residency requirements?
- Is there a path back to the standard model?

---

### Exception: Higher Agent Permissions than Minimal Footprint

**Common reason**: Agent needs broad database access for exploratory tasks.

**ARB evaluation criteria**:

- Is the permission scope time-limited or task-scoped?
- Is HITL implemented for irreversible actions?
- Is there a rollback mechanism?
- Is the access logged with full audit trail?

---

## ARB Contacts

| Role | Responsibility |
| ------ | --------------- |
| ARB Chair | Final escalation, CTO/CIO liaison |
| ARB Secretariat | Submission management, scheduling, decision records |
| Security Architect | Security and compliance review lead |
| AI/ML Architect | LLM, agentic, and ML system reviews |
| Data Architect | Data residency, privacy, lineage reviews |
| Cloud Architect | Infrastructure, cost, and platform reviews |

---

## Volume Series

- [Volume 1 — Governance, Ecosystem &amp; Operating Models](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume1_Governance_Ecosystem_Operating_Models)

- [Volume 2 — Economics &amp; Decision Science](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume2_Economics_Decision_Science)

- [Volume 3 — Knowledge Management &amp; Capability Mapping](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume3_Knowledge_Management_Capability_Mapping)

- [Volume 4 — Artifact Catalog &amp; Quality Attributes](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume4_Artifact_Catalog_Quality_Attributes)

- [Volume 5 — Review Questions &amp; Scorecards](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume5_Review_Questions_Scorecards)

- [Volume 6 — Banking Industry Deep Dive](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume6_Banking_Industry_DeepDive)

- [Volume 7 — AI-Native ARB Case Studies](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume7_AI_Native_ARB_Case_Studies)

- [Volume 8 — Implementation Accelerator Kit](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume8_Implementation_Accelerator_Kit)

- [Volume 9 — Enterprise Reference Repository](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume9_Enterprise_Reference_Repository)

- [Volume 10 — Collaborative Use Case Transcripts](/knowledge-docs/enterprise-architecture/architectural-review-board/Volume10_Collaborative_Use_Case_Transcripts)

---

## Related Resources

- [Enterprise Architecture Overview](../index.md)
- [EA Strategy](../strategy/index.md)
- [EA Frameworks (TOGAF/APEX)](../framework/index.md)
- [EA Processes](../process/index.md)
- [EA Best Practices](../best-practices/index.md)
- [Claude API Mastery](../../coding-tools/claude/claude-api-mastery.md)
- [Agentic AI Systems](../../agentic-systems/index.md)
- [AI Security & Governance](../../ai-security-governance/index.md)
