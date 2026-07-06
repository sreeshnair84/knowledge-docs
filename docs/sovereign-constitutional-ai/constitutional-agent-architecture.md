---
title: Constitutional Agent Architecture
---

# Constitutional Agent Architecture (Deliverables 13 & 14)

**Audience:** Principal AI Architects, AI Safety Engineers, AI Governance Leads, Distinguished Architects  
**Purpose:** Design constitutional agents governed by constitution, policy, regulatory, and business rules — including the agent governance fabric (5 registries), L0–L5 autonomy taxonomy, and sovereign agent ecosystem blueprint.  
**Related:** [Constitutional AI Engineering](constitutional-ai-engineering.md) · [Policy-as-Code Framework](policy-as-code-framework.md) · [AI Safety Framework](ai-safety-framework.md) · [Agentic AI Security & Identity](../coding-tools/enterprise-ai-architect/agentic-ai-security-identity.md)

!!! info "Current as of July 2026"
    Agent autonomy governance is the most rapidly evolving area in enterprise AI. The autonomy taxonomy and governance fabric described here extend the 4-tier operational ladder in [Agentic AI Security & Identity](../coding-tools/enterprise-ai-architect/agentic-ai-security-identity.md) into a full L0–L5 maturity taxonomy and a sovereign agent ecosystem blueprint.

---

## 1. Constitutional Agents

### 1.1 What Makes an Agent "Constitutional"?

A constitutional agent is an AI agent that:

1. **Operates under an explicit, versioned constitution** — a documented set of principles governing its behavior
2. **Has its constitution enforced at runtime** — not just as training guidance, but as executable policy constraints
3. **Generates constitutional traceability** — every consequential action is linked to the constitutional principles evaluated
4. **Supports constitutional governance** — the constitution can be inspected, updated, and audited by authorized stakeholders
5. **Escalates constitutional conflicts** — when an instruction conflicts with the constitution, the agent escalates rather than blindly complying

```
CONSTITUTIONAL AGENT ARCHITECTURE

         ┌──────────────────────────────────┐
         │     CONSTITUTION REGISTRY         │
         │  Global │ Domain │ Agent │ Task   │
         └────────────────┬─────────────────┘
                          │ evaluates against
                          ▼
Input ──► CONSTITUTIONAL  ──► POLICY ENGINE ──► AGENT RUNTIME
          CLASSIFIER           (OPA/Cedar)
          (pre-check)          (enforcement)         │
                │                   │                ▼
                │ violated          │ denied      TOOL LAYER
                ▼                   ▼            (sandboxed)
           ESCALATION           BLOCKED               │
           HANDLER              + LOG                 ▼
                                              AUDIT LEDGER
                                              (constitutional
                                               trace)
```

### 1.2 The Four Rule Layers

Constitutional agents are governed by four interacting rule layers:

```
FOUR RULE LAYERS

1. CONSTITUTIONAL RULES (highest authority)
   Source: Ratified AI constitution document
   Nature: Principles-based; stable; human-readable
   Examples: "Never expose PII", "Always disclose AI identity"
   Enforcement: Constitutional classifier + Policy engine
   Override: None (except emergency with board approval)

2. POLICY RULES
   Source: Policy-as-code (OPA/Cedar policies)
   Nature: Executable; more granular than constitution
   Examples: "Block API calls to non-approved domains"
   Enforcement: Policy engine (real-time, fail-closed)
   Override: By higher-tier policy with approval

3. REGULATORY RULES
   Source: Regulatory requirements (EU AI Act, GDPR, SR 11-7)
   Nature: Legal obligations; jurisdiction-specific
   Examples: "Log all credit decisions with SHAP values"
   Enforcement: Compliance monitoring + audit
   Override: Not possible (legal requirement)

4. BUSINESS RULES
   Source: Business logic, domain-specific constraints
   Nature: Context-specific; may change frequently
   Examples: "Route queries >$10K to relationship manager"
   Enforcement: Business rule engine or agent instructions
   Override: By authorized product owner
```

---

## 2. L0–L5 Agent Autonomy Taxonomy

### 2.1 The Six Autonomy Levels

The L0–L5 taxonomy provides a standardized language for describing, governing, and regulating AI agent autonomy. It maps to capability, governance requirements, and risk tier.

```
L0 — ADVISORY
   Role: AI generates analysis and recommendations for humans
   Human role: Makes all decisions and takes all actions
   AI action: Generate insights, summaries, analysis
   Example: AI financial advisor dashboard; diagnostic support tool
   Governance: SL1/SL2; RAI Champion approval
   Risk tier: Minimal/Standard
   Constitution: Recommended but not enforced at runtime

L1 — ASSISTED
   Role: AI prepares actions for human review and execution
   Human role: Reviews AI-prepared outputs before acting
   AI action: Draft decisions, prepare transactions, compose communications
   Example: AI drafts loan decision; human reviews and signs
   Governance: SL2; ARB approval; model card required
   Risk tier: Standard
   Constitution: Runtime enforcement for output quality

L2 — SEMI-AUTONOMOUS
   Role: AI executes routine decisions autonomously within bounds;
         escalates edge cases
   Human role: Sets parameters; reviews exceptions; spot-checks
   AI action: Execute pre-approved action types independently
   Example: AI processes routine insurance claims; escalates complex
   Governance: SL3; RAIO Head approval; AI Impact Assessment
   Risk tier: Significant
   Constitution: Full runtime enforcement required

L3 — AUTONOMOUS
   Role: AI executes full task cycles without human checkpoints
   Human role: Monitors outcomes; retains override capability
   AI action: Plan, execute, and close multi-step tasks
   Example: Autonomous procurement agent; customer service resolution
   Governance: SL3/SL4; AI Governance Council approval; quarterly audit
   Risk tier: Significant/Critical
   Constitution: Full runtime enforcement + constitutional traceability

L4 — SUPERVISED AUTONOMOUS
   Role: AI operates with high autonomy under active human supervision
         in real-time; human monitors dashboards continuously
   Human role: Active oversight; real-time override capability
   AI action: Complex multi-agent task execution with self-monitoring
   Example: AI-assisted air traffic management; autonomous trading desk
   Governance: SL4; Board-level approval; external audit; sovereign infra
   Risk tier: Critical
   Constitution: Continuous constitutional compliance + external audit

L5 — MISSION AUTONOMOUS
   Role: AI operates autonomously toward defined mission goals
         with only outcome-level human oversight
   Human role: Sets mission parameters; reviews outcomes; kill switch
   AI action: Full mission planning and execution; self-directed
   Example: Autonomous scientific research agent; defense autonomous system
   Governance: SL4 + government oversight; international frameworks
   Risk tier: Critical + sovereign
   Constitution: Formal constitutional certification required
   Status: Not currently deployed in regulated enterprise contexts (2026)
```

### 2.2 Autonomy Level → Governance Mapping

| Requirement | L0 | L1 | L2 | L3 | L4 | L5 |
|---|---|---|---|---|---|---|
| Constitution | Optional | Recommended | Required | Required | Required | Certified |
| Approval level | RAI Champion | RAI Champion | RAIO Head | AI Gov Council | Board | Govt + Board |
| Kill switch SLA | Not required | 5 min | 2 min | 1 min | 30 sec | Real-time |
| Audit trail | Recommended | Required | Required | Required | Required | Certified |
| Human oversight | All decisions | All decisions | Exception-based | Outcome monitoring | Real-time | Mission outcome |
| Sovereign infra | Not required | Not required | Optional | Preferred | Required | Required |
| External audit | Not required | Not required | Annual | Quarterly | Monthly | Continuous |

### 2.3 Autonomy Level Decision Framework

Use this framework to determine the appropriate autonomy level for a new agent:

```
AUTONOMY LEVEL SELECTION

Q1: Can errors be easily detected and reversed?
    No → Maximum L2 until detection/reversal is confirmed

Q2: Do failures have direct physical or financial consequences > threshold?
    Yes → Maximum L3 with mandatory human oversight gate

Q3: Can the agent's action space affect third parties who have not consented?
    Yes → Maximum L2; require human review of third-party-affecting actions

Q4: Does the regulatory framework require human decision-making?
    Yes → Maximum L1 (human decision); AI in advisory role only

Q5: Is the task domain within the model's validated performance envelope?
    No → Maximum L1 until performance validated

Q6: Can the agent's actions be fully explained after the fact?
    No → Maximum L2 until explainability is achieved

Default: Start at L1. Increase autonomy level only after production
         performance validates safety and alignment at each tier.
```

---

## 3. Agent Governance Fabric

### 3.1 The Five Registries

The agent governance fabric is built on five registries — the source of truth for all governance-relevant information about agents and their operating context:

```
AGENT GOVERNANCE FABRIC — 5 REGISTRIES

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  AGENT REGISTRY  │  │CONSTITUTION REG. │  │  POLICY REGISTRY │
│                  │  │                  │  │                  │
│ agent_id         │  │ constitution_id  │  │ policy_id        │
│ name, version    │  │ version          │  │ policy_name      │
│ model_ref        │  │ sections[]       │  │ rego/cedar_bundle│
│ constitution_ref │  │ principles[]     │  │ constitution_ref │
│ autonomy_level   │  │ signed_by        │  │ version          │
│ tool_permissions │  │ ratified_date    │  │ effective_date   │
│ owner            │  │ amendment_log    │  │ git_commit_hash  │
│ safety_level     │  └──────────────────┘  └──────────────────┘
│ kill_switch_uri  │
└──────────────────┘
┌──────────────────┐  ┌──────────────────┐
│  TRUST REGISTRY  │  │  AUDIT REGISTRY  │
│                  │  │                  │
│ principal_id     │  │ decision_id      │
│ principal_type   │  │ agent_id         │
│ trust_score      │  │ timestamp        │
│ permissions[]    │  │ constitutional_  │
│ expiry           │  │   trace          │
│ issuer           │  │ policy_decisions │
│ spiffe_id        │  │ outcome          │
└──────────────────┘  │ chained_hash     │
                      └──────────────────┘
```

### 3.2 Registry Implementation

```yaml
# Agent Registry Entry
agent:
  id: "AGT-LOAN-UNDERWRITER-001"
  name: "Loan Underwriting Agent"
  version: "2.3.1"
  model:
    id: "anthropic/claude-fable-5"
    deployment: "private-endpoint-eu-west"
    sovereign: true
  constitution:
    id: "BANK-CONST-001"
    version: "1.2.0"
    enforced_at_runtime: true
  autonomy_level: L2
  safety_level: SL3
  tool_permissions:
    - tool: "credit_bureau_query"
      scope: "read"
      rate_limit: "100/hour"
    - tool: "core_banking_read"
      scope: "read"
      rate_limit: "500/hour"
  owner:
    team: "Retail Lending"
    lead: "Jane Smith"
    accountability: "Product Owner"
  kill_switch:
    uri: "https://ops.internal/agents/AGT-LOAN-001/kill"
    sla_minutes: 2
    on_call: "ops-pagerduty-P1"
  audit:
    ledger_endpoint: "https://audit.internal/ledger/AGT-LOAN-001"
    retention_years: 7
  approved_by: "RAIO Head"
  approval_date: "2026-06-15"
  next_review: "2026-09-15"
```

---

## 4. Multi-Agent Constitutional Systems

### 4.1 Constitutional Hierarchy in Multi-Agent Systems

In multi-agent pipelines, constitutions are inherited and composed:

```
MULTI-AGENT CONSTITUTIONAL HIERARCHY

ORCHESTRATOR AGENT (L3)
│ Constitution: Global + Domain + Orchestrator-specific
│ Scope: Full pipeline coordination
│
├── WORKER AGENT A (L2)
│   Constitution: Global + Domain + Worker-A-specific
│   Scope: Credit analysis
│
├── WORKER AGENT B (L2)
│   Constitution: Global + Domain + Worker-B-specific
│   Scope: Fraud detection
│
└── REVIEWER AGENT (L1)
    Constitution: Global + Domain + Reviewer-specific
    Scope: Decision validation; escalation trigger
    Rule: Any flagged constitutional violation → escalate to human
```

**Inter-agent trust rules:**
- An agent may not grant another agent permissions it doesn't itself have
- Constitutional constraints from parent agents propagate to child agents
- Constitutional violations in any agent propagate upward as escalation triggers
- Orchestrator agents cannot override constitutional prohibitions of worker agents

### 4.2 Agent-to-Agent Authorization

When agents invoke other agents, authorization must be validated:

```
A2A AUTHORIZATION PROTOCOL

Agent A wants to invoke Agent B:

1. Agent A presents its identity (SPIFFE ID + JWT)
2. Agent B's policy engine checks:
   - Is Agent A authorized to invoke Agent B?
   - Does Agent A's requested action fall within Agent B's permitted scope?
   - Does the action comply with both A's and B's constitutions?
3. If authorized: action proceeds + audit log entry created
4. If unauthorized: action blocked + constitutional flag raised
5. All inter-agent invocations logged in audit registry
```

---

## 5. Sovereign Agent Ecosystem Blueprint (Deliverable 14)

```
SOVEREIGN AGENT ECOSYSTEM — ENTERPRISE BLUEPRINT

┌──────────────────────────────────────────────────────────────┐
│              CONSTITUTIONAL GOVERNANCE LAYER                  │
│  Constitution Registry │ Policy Engine │ Audit Registry       │
│  Trust Registry │ Agent Registry │ Governance Dashboard       │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│               SOVEREIGN AGENT ORCHESTRATION LAYER             │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐   │
│  │                  AGENT HARNESS                         │   │
│  │  Constitutional gate │ Policy engine │ Audit publisher │   │
│  │  Kill switch hook    │ Memory governance               │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                               │
│  Strategic Agents (L3-L4)    Worker Agents (L1-L2)           │
│  ┌──────────────────┐        ┌──────────────────────────┐    │
│  │ Orchestrators    │        │ Domain specialists:       │    │
│  │ (cross-function  │──────▶ │ Credit │ Fraud │ Risk    │    │
│  │  planning)       │        │ KYC │ Reporting │ Ops    │    │
│  └──────────────────┘        └──────────────────────────┘    │
│                                                               │
│  Review Agents (L0-L1)                                       │
│  ┌──────────────────────────────────────────────────────┐    │
│  │ Constitutional reviewer │ Bias checker │ Fact-checker │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│               SOVEREIGN MODEL & DATA LAYER                    │
│  Private AI Platform │ Sovereign data stores │ RAG pipelines  │
│  Fine-tuned domain models │ Embedding + reranking services    │
└──────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌──────────────────────────────────────────────────────────────┐
│               SOVEREIGN INFRASTRUCTURE LAYER                  │
│  On-prem GPU cluster OR Sovereign cloud region               │
│  HSM-encrypted model weights │ Air-gappable networking        │
│  WORM audit storage │ Sovereign identity provider             │
└──────────────────────────────────────────────────────────────┘
```

---

## 6. Future: Constitutional Agent Operating Systems (2027+)

Emerging research and product development is moving toward **Governance-First Agent Operating Systems** — infrastructure where every agent action is governed at the OS level by:

- **Agent charters** — startup configuration specifying constitution, autonomy level, tool permissions
- **Fiscal controls** — token budgets, API cost limits, resource quotas enforced at runtime
- **Trust scores** — dynamic trust scores based on agent behavior history
- **Constitutional kernel** — operating system-level constitutional enforcement before any action executes

Organizations like Anthropic (Claude Agent SDK), Microsoft (Autogen), and emerging AI OS startups are building toward this model. Enterprise architects should design governance fabrics now that are compatible with these emerging platforms.

---

## Sources

- [Anthropic Claude Agent SDK](https://docs.anthropic.com/en/docs/agents) (2026)
- [Microsoft AutoGen — Multi-Agent Governance](https://microsoft.github.io/autogen/) (2026)
- [IETF AIMS — Agent Identity Management](https://datatracker.ietf.org/wg/aims/) (2025)
- [SPIFFE — Secure Production Identity Framework](https://spiffe.io) (2025)
- [A2A Protocol Specification](https://google.github.io/A2A/) (2025)
