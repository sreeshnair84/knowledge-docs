---
title: "AI Safety Framework"
date_created: 2026-07-07
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["sovereign-constitutional-ai"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# AI Safety Framework (Deliverable 20)

**Audience:** AI Safety Engineers, Principal AI Architects, CISOs, Chief AI Officers, AI Governance Leads  
**Purpose:** Define a comprehensive AI safety engineering framework — from responsible scaling policies and frontier safety through the 5-layer safety stack, kill switch architecture, and safe degradation design.  
**Related:** [AI Alignment & Control](ai-alignment-control.md) · [AI Risk Taxonomy](ai-risk-taxonomy.md) · [Constitutional Agent Architecture](constitutional-agent-architecture.md) · [Agentic AI Reliability, Observability & Governance](../enterprise-architecture/ai-architecture/agentic-ai-reliability-observability-governance.md)

:::info Current as of July 2026
    Responsible Scaling Policies (RSPs) and Frontier Safety Frameworks (FSFs) are now published by all major frontier AI labs (Anthropic, Google DeepMind, OpenAI). Enterprise AI safety must align with these frameworks while adding operational governance not covered by lab-level policies.

---

## 1. Frontier AI Safety

### 1.1 Responsible Scaling Policies (RSPs)

RSPs commit AI labs to only deploy models that meet defined safety evaluations at each capability level — operationalizing the principle: **don't build and deploy AI systems that are more dangerous than you know how to make safe**.

**Anthropic's AI Safety Level (ASL) framework:**

```
ASL THRESHOLDS

ASL-1  Clearly safe; no uplift to catastrophic harm
       Safeguards: Standard safety training

ASL-2  Potential uplift for serious harm (current Claude family)
       Safeguards: Responsible use policies; CBRN monitoring; abuse detection

ASL-3  Potential uplift for mass-casualty attacks
       Safeguards: Enhanced containment; restricted deployment;
                   mandatory safety evaluations before training or deploy

ASL-4  Approaching transformative capability
       Policy: Won't train or deploy until ASL-4 safeguards defined
```

**Google DeepMind Frontier Safety Framework (2024):** Four safety levels (SL1–SL4) evaluating three properties: **Corrigibility** (defers to humans), **Honesty** (no deception), **Non-harm** (avoids catastrophic actions).

**OpenAI Safety Preparedness Framework (2023):** Risk thresholds across cybersecurity, CBRN, persuasion, and model autonomy — each with low/medium/high/critical bands triggering deployment restrictions.

### 1.2 Dangerous Capability Evaluations

Before deploying frontier models, labs run red-team evaluations for:

| Domain | What is tested | Restriction trigger |
| --- | --- | --- |
| **CBRN uplift** | Meaningful uplift to WMD creation | Any significant uplift above public sources |
| **Cyberoffense** | Autonomous cyberweapon development | Capability above current tools |
| **Persuasion** | Convincing influence operations at scale | Indistinguishable from human campaigns |
| **Autonomous replication** | Acquiring resources, resisting shutdown | Any demonstrated capability |

**Enterprise implication:** Request vendor dangerous-capability evaluation results before adopting any frontier model. Prefer vendors with published RSPs and independent audit (UK AISI, US AISI).

---

## 2. Enterprise AI Safety Levels

```
ENTERPRISE SAFETY LEVELS

SL1 — Minimal Risk
     Narrow task; bounded outputs; no autonomous action;
     no access to sensitive data or external systems
     Examples: FAQ chatbot, text summarization
     Safeguards: Basic I/O filtering; standard monitoring

SL2 — Managed Risk
     Broader scope; limited tool use; internal data access;
     some autonomous decision-making
     Examples: Internal search, code review, report generation
     Safeguards: Constitutional alignment; fairness testing; kill switch

SL3 — Elevated Risk
     Significant autonomy; external systems; consequential decisions;
     multi-step agents
     Examples: Customer-facing agents, loan underwriting AI, clinical support
     Safeguards: Mandatory HITL for key decisions; formal AI Impact Assessment;
                 ARB approval; enhanced monitoring; quarterly audits

SL4 — Critical Risk
     High autonomy; critical infrastructure; irreversible actions;
     major legal or safety impact
     Examples: Air traffic AI, nuclear monitoring, financial market AI
     Safeguards: Independent external audit; government oversight;
                 sovereign infrastructure mandatory; sub-1-minute kill switch
```

| Requirement | SL1 | SL2 | SL3 | SL4 |
| --- | --- | --- | --- | --- |
| AI Impact Assessment | Not required | Standard | Full | Extended + external |
| ARB approval | Not required | RAI Champion | RAIO Head | AI Gov Council |
| Kill switch SLA | Not required | < 5 min | < 2 min | < 1 min |
| Fairness evaluation | Spot check | Required | Continuous | Continuous + audit |
| Sovereign infra | Not required | Not required | Preferred | Mandatory |
| Audit frequency | Annual | Bi-annual | Quarterly | Monthly |

---

## 3. The 5-Layer AI Safety Stack

```
AI SAFETY STACK

┌─────────────────────────────────────────────────────┐
│  L5: GOVERNANCE & OVERSIGHT                          │
│  Kill switches │ Human review │ Audit trail          │
│  Board reporting │ External audit │ Incident response │
├─────────────────────────────────────────────────────┤
│  L4: ACTION LAYER                                    │
│  Action sandboxing │ Reversibility preference        │
│  Capability budgets │ Irreversibility gates           │
├─────────────────────────────────────────────────────┤
│  L3: TOOL LAYER                                      │
│  Least-privilege tool access │ Tool sandboxing       │
│  Typed action contracts │ MCP server security        │
│  Tool output validation │ External API rate limiting  │
├─────────────────────────────────────────────────────┤
│  L2: GUARDRAIL LAYER                                 │
│  Constitutional classifier │ Policy engine (OPA/Cedar)│
│  Input validation │ Output filtering │ PII detection  │
│  Topic restriction │ Instruction following enforcement│
├─────────────────────────────────────────────────────┤
│  L1: MODEL LAYER                                     │
│  Constitutional AI training │ RLHF/RLAIF             │
│  Hardcoded refusals (CBRN, CSAM, etc.)              │
│  Calibrated uncertainty │ Corrigibility training      │
└─────────────────────────────────────────────────────┘
```

**Compensating controls — if a layer fails:**

| Layer | Failure mode | Compensated by |
| --- | --- | --- |
| Model (L1) | Model trained to bypass own safety ("jailbreak") | Guardrails (L2) catch outputs; governance (L5) audits |
| Guardrail (L2) | Novel attack bypasses classifier | Tool sandboxing (L3) limits damage; action gates (L4) block irreversible harm |
| Tool (L3) | Tool supply chain compromised | Action sandboxing (L4) limits blast radius; kill switch (L5) terminates |
| Action (L4) | Approval mechanism bypassed under pressure | Audit trail (L5) detects; incident response activates |
| Governance (L5) | Kill switch fails | Cryptographic audit trail; external audit; regulatory reporting |

---

## 4. Kill Switch Architecture

See also: [Agentic AI Reliability, Observability & Governance §4.3](../enterprise-architecture/ai-architecture/agentic-ai-reliability-observability-governance.md) for operational kill switch implementation.

### 4.1 Kill Switch Scope Levels

```
KILL SWITCH SCOPE HIERARCHY

Level 1: Task-level pause
   Action: Pause a specific agent task mid-execution
   Who: Any authorized engineer
   SLA: < 30 seconds

Level 2: Agent-level pause
   Action: Pause all tasks for a specific agent instance
   Who: On-call engineer
   SLA: < 2 minutes

Level 3: System-level pause
   Action: Pause all agents in a specific system or business unit
   Who: On-call engineer + system owner
   SLA: < 5 minutes

Level 4: Enterprise-wide shutdown
   Action: Pause all AI agents enterprise-wide
   Who: CISO or CAIO + on-call engineer (dual auth)
   SLA: < 10 minutes
```

### 4.2 Kill Switch Design Requirements

```
REQUIREMENTS

Reachability:  Every agent reachable without vendor involvement
               Kill switch works even if AI system itself is compromised
               Multiple kill switch paths (network, control plane, power)

State:         In-progress transactions handled safely (rollback or complete)
               Audit log continues during shutdown
               Human handover information preserved

Testing:       Quarterly drill; unannounced to be valid
               Results documented; SLA misses must be actioned
               Cross-team participation (Ops, Engineering, Compliance)

Access:        Documented who can invoke each level
               MFA for Levels 3-4; dual authorization for Level 4
               Full audit log of all invocations
```

### 4.3 Graceful Degradation Ladder

```
Full AI Operation
    │ L1 Kill switch
    ▼
AI Advisory Mode — all recommendations require human approval (SLA: 4h)
    │ L2 Kill switch
    ▼
Human-Assisted Mode — AI read-only; human makes all decisions
    │ L3 Kill switch
    ▼
Manual Fallback — AI offline; pre-defined manual procedures
    │ L4 Kill switch
    ▼
Emergency Operations — critical functions only; board notified;
                        regulatory notification if required
```

---

## 5. Autonomy Throttling

Dynamic reduction of agent autonomy based on risk signals — analogous to a software circuit breaker:

```
AUTONOMY THROTTLING STATE MACHINE

Normal → Monitored → Restricted → Supervised → Paused
  │          │            │            │
  │   Enhanced logging  Autonomy    Every action
  │   + spot-checks   reduced 1 tier  human approved

Throttling triggers:
  Constitutional violation rate > 0.5%  →  Normal → Monitored
  Constitutional violation rate > 2%    →  Monitored → Restricted
  Security alert (prompt injection)     →  Normal → Supervised
  Confirmed security incident           →  → Paused
  Fairness threshold breach             →  → Monitored + bias investigation
```

---

## 6. Architect's Checklist

- [ ] **SF1** — Each AI system assigned Safety Level (SL1–SL4) in model registry
- [ ] **SF2** — All 5 safety layers operational for SL3+ systems
- [ ] **SF3** — Kill switch tested quarterly for all scope levels; SLA compliance documented
- [ ] **SF4** — Dangerous capability evaluation by qualified red team before major model updates
- [ ] **SF5** — Autonomy throttling state machine implemented for SL3+ agents
- [ ] **SF6** — Capability registry maintained; all capabilities default-off; audited quarterly
- [ ] **SF7** — Graceful degradation playbook documented, tested, accessible without AI system access
- [ ] **SF8** — Vendor RSP reviewed and accepted before adopting any frontier model
- [ ] **SF9** — Constitutional classifier calibrated (< 0.5% false positive rate)

---

## Sources

- [Anthropic Responsible Scaling Policy](https://www.anthropic.com/news/responsible-scaling-policy) (2023, updated 2024)
- [Google DeepMind Frontier Safety Framework](https://deepmind.google/discover/blog/introducing-the-frontier-safety-framework/) (2024)
- [OpenAI Safety Preparedness Framework](https://openai.com/safety/preparedness) (2023)
- [UK AI Safety Institute — Model Evaluations](https://www.gov.uk/government/organisations/ai-safety-institute) (2024)
- [NIST AI RMF — MANAGE Function](https://airc.nist.gov/RMF) (2023)
