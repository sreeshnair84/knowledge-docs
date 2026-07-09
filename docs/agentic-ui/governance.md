---
title: "Governance for Agentic Applications"
date_created: 2026-07-07
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["agentic-ui"]
---

# Governance for Agentic Applications

**Audience:** Enterprise Architects, Principal AI Architects, AI Platform Teams, and AI Governance Leads who must design, operate, and audit the governance structures for production agentic UIs and applications — covering decision rights, ownership, processes, and maturity progression across all 16 governance domains.

:::note Scope Boundary
    This file covers governance **structures, processes, and decision rights**. Compliance requirements (EU AI Act obligations, NIST AI RMF, ISO 42001 conformity assessment) are covered in [responsible-ai.md](responsible-ai.md). Regulatory framework details are in [Enterprise AI Governance & Compliance](../coding-tools/enterprise-ai-architect/enterprise-ai-governance-compliance.md).

---

## 1. Governance Architecture Overview

### 1.1 Why Traditional IT Governance Fails for Agentic Systems

Traditional IT governance was designed for deterministic systems: a change request produces a known output, a code deployment is testable before release, a database query returns predictable results. Agentic systems break every one of these assumptions.

| Governance Challenge | Traditional IT Systems | Agentic AI Systems |
|---|---|---|
| **Output predictability** | Deterministic for same inputs | Non-deterministic; same prompt may produce different actions |
| **Change boundary** | Code + config is the system | Prompt, model, memory, tools, context, and retrieved data all affect behavior |
| **Testing completeness** | Full coverage achievable | Behavior space is effectively infinite; combinatorial explosion |
| **Actor identity** | Human or service account | Agent acts autonomously, may spawn sub-agents, delegates authority |
| **Audit completeness** | Every action logged by system code | Agent reasoning invisible unless explicitly instrumented |
| **Change velocity** | Quarterly release cycles | Prompt changes can deploy in minutes; model updates out of band |
| **Blast radius** | Bounded to changed component | Agent with financial/data tools can cause cross-system damage in one run |
| **Third-party risk** | Known vendor libraries | LLM provider, MCP tool authors, vector DB operators all affect agent behavior |
| **Regulatory clarity** | Decades of established precedent | EU AI Act, NIST AI RMF, ISO 42001 are all post-2023 and still evolving |
| **Human oversight** | Human approves each action | Agent executes multi-step plans; oversight points must be explicitly designed |

**The three governance gaps that cause agentic failures in practice:**

1. **Gap 1 — Decision rights ambiguity:** When an agent acts autonomously and causes harm, no one owns the decision. Was it the prompt author, the model vendor, the platform team, or the business owner?
2. **Gap 2 — Change velocity without governance:** Prompt changes bypass change management entirely because they "aren't code." An unreviewed system prompt change can alter agent behavior across all users instantly.
3. **Gap 3 — No lifecycle for AI artifacts:** Models, prompts, knowledge bases, and memory stores all have lifecycles that traditional CMDB/ITAM tooling cannot track.

### 1.2 The 16 Governance Domains

Agentic systems require governance across 16 distinct domains. Each domain has a primary owner, a governance body, and a set of processes:

| # | Domain | Primary Owner | Governance Body | Key Process |
|---|---|---|---|---|
| 1 | Architecture | Principal AI Architect | Platform Architecture Board (PAB) | ARB review, exception process |
| 2 | Platform | AI Platform Lead | Platform Product Team | SLA management, versioning |
| 3 | Prompt | AI Application Owner | Prompt Review Committee | Prompt versioning, review, deploy |
| 4 | Context | Data Governance Lead | Data Governance Council | Context policy, PII controls |
| 5 | Memory | AI Application Owner + DPO | Privacy Review Board | Retention policy, erasure |
| 6 | Tool | AI Platform Lead | Tool Approval Board | Tool approval, classification |
| 7 | Policy | AI Governance Lead | AI Policy Committee | Policy-as-code lifecycle |
| 8 | Knowledge | Knowledge Owner + DPO | Knowledge Governance Council | Content approval, freshness |
| 9 | Model | AI Platform Lead | Model Review Committee | Model selection, upgrade approval |
| 10 | Agent | AI Application Owner | Agent Registry Team | Agent registration, monitoring |
| 11 | Data | Chief Data Officer | Data Governance Council | Classification, access request |
| 12 | Lifecycle | AI Portfolio Manager | AI CoE | Portfolio review, EOL process |
| 13 | Approval | Business Process Owner | Approval Authority Matrix | Delegated approval, bypass audit |
| 14 | Change | Change Manager | Change Advisory Board (CAB) | Change request, rollback |
| 15 | Compliance | Chief Compliance Officer | Compliance Committee | Evidence collection, audit |
| 16 | Security | CISO | Security Review Board | Threat modeling, pen test |

### 1.3 Governance Operating Model

```text
GOVERNANCE OPERATING MODEL — AGENTIC SYSTEMS

                    ┌─────────────────────────────────────┐
                    │  AI GOVERNANCE COMMITTEE (Strategic) │
                    │  CTO, CDO, CISO, CCO, CRO           │
                    │  Meets: quarterly                    │
                    │  Owns: risk appetite, policy         │
                    └──────────────┬──────────────────────┘
                                   │ charters
              ┌────────────────────┼────────────────────┐
              │                    │                    │
   ┌──────────▼─────┐   ┌─────────▼───────┐  ┌────────▼────────┐
   │PLATFORM ARCH.  │   │AI POLICY         │  │COMPLIANCE &     │
   │BOARD (PAB)     │   │COMMITTEE         │  │RISK COMMITTEE   │
   │Principal AI    │   │Governance Lead,  │  │CCO, CRO, Legal  │
   │Architect,      │   │Legal, DPO, Risk  │  │Meets: monthly   │
   │Tech Leads      │   │Meets: monthly    │  │Owns: audit,     │
   │Meets: bi-weekly│   │Owns: policies,   │  │evidence,        │
   │Owns: arch,     │   │standards,        │  │regulatory       │
   │standards, ARB  │   │exceptions        │  │reporting        │
   └──────────┬─────┘   └─────────┬───────┘  └────────┬────────┘
              │                   │                    │
              └───────────┬───────┘                    │
                          │                            │
              ┌───────────▼────────────────────────────▼──┐
              │         AI CENTER OF EXCELLENCE (CoE)      │
              │  Pattern library · Tooling · Education      │
              │  Community of practice · Architecture docs  │
              │  Meets: weekly stand-up, monthly all-hands  │
              └────────────────────┬──────────────────────┘
                                   │ enables
              ┌────────────────────┼──────────────────────┐
              │                    │                       │
   ┌──────────▼─────┐   ┌─────────▼───────┐   ┌──────────▼─────┐
   │LOB AI TEAMS    │   │AI PLATFORM TEAM  │   │SECURITY &      │
   │Application     │   │Infrastructure,   │   │COMPLIANCE TEAM │
   │owners,         │   │model access,     │   │Threat modeling, │
   │developers,     │   │SDK, gateway,     │   │pen testing,    │
   │prompt authors  │   │observability     │   │audit, DLP      │
   └────────────────┘   └─────────────────┘   └────────────────┘

OPERATING MODES
  Federated:  LOB teams own their agent governance; CoE sets standards
  Centralized: AI Platform team governs all agents centrally
  Hybrid:     Platform governs infrastructure; LOB governs applications (recommended for >500-employee enterprises)
```

**Choose centralized when:** You have fewer than 5 AI applications, a small AI team, or are in the first year of AI adoption. Speed of governance > consistency of application.

**Choose federated when:** You have multiple LOBs with different risk profiles, regulatory domains (banking + insurance + wealth), or geography-specific compliance requirements.

**Choose hybrid when:** You have a maturing AI program (>10 applications), need to scale AI development without bottlenecking on central team, and want consistent platform governance with distributed application governance.

### 1.4 RACI Framework for Agentic Governance

| Domain | AI Gov Committee | PAB | AI CoE | AI Platform Team | LOB AI Team | DPO | CISO | CCO | CAB |
|---|---|---|---|---|---|---|---|---|---|
| **Architecture** | A | R | C | C | I | I | C | I | I |
| **Platform** | I | A | C | R | C | I | C | I | I |
| **Prompt** | I | C | C | I | R | C | I | I | A |
| **Context** | I | C | C | C | R | A | C | I | I |
| **Memory** | I | I | C | C | R | A | C | C | I |
| **Tool** | I | A | C | R | C | I | C | I | C |
| **Policy** | A | C | C | I | I | C | C | R | I |
| **Knowledge** | I | I | C | I | R | A | I | C | I |
| **Model** | A | R | C | C | I | I | C | I | I |
| **Agent** | I | C | C | C | R | I | C | I | A |
| **Data** | I | C | C | C | R | A | C | C | I |
| **Lifecycle** | A | C | R | C | C | I | I | I | I |
| **Approval** | A | I | I | I | R | I | I | C | I |
| **Change** | I | C | I | C | R | I | C | I | A |
| **Compliance** | A | C | C | I | C | C | C | R | I |
| **Security** | A | C | C | C | C | I | R | C | C |

*R = Responsible, A = Accountable, C = Consulted, I = Informed*

---

## 2. Architecture Governance

### 2.1 Platform Architecture Board (PAB) Structure

The PAB is the highest architectural authority for agentic system design. It evaluates and approves reference architectures, sets technology standards, adjudicates exceptions, and manages the technology radar.

| PAB Role | Member | Meeting Cadence | Voting Rights |
|---|---|---|---|
| **Chair** | Principal AI Architect | Every meeting | Yes |
| **Platform Lead** | AI Platform Engineering Lead | Every meeting | Yes |
| **Security Architect** | AI-focused Security Architect | Every meeting | Yes |
| **Data Architect** | Chief Data Architect | Every meeting | Yes |
| **Application Architect** | Senior Application Architect (rotating) | Every meeting | Yes |
| **LOB Representative** | Senior developer from highest-volume LOB (rotating) | Every meeting | Advisory |
| **Compliance** | AI Compliance Lead | As needed | Advisory |
| **CoE Lead** | AI CoE Director | Every meeting | Advisory |

**PAB Operating Rules:**
- Decisions require quorum of 4 voting members
- Disputed decisions escalate to AI Governance Committee within 5 business days
- All decisions recorded in Architecture Decision Record (ADR) format
- ADRs published to team wiki within 48 hours of decision
- Emergency decisions (within 24 hours) require CTO approval + post-hoc PAB ratification within 2 weeks

### 2.2 Architecture Review Board (ARB) for Agentic Systems

The ARB reviews individual agentic applications before production deployment. Review thresholds:

| Application Type | Review Required | Reviewers | SLA |
|---|---|---|---|
| **New agentic application (any tier)** | Full ARB review | PAB quorum + CISO | 10 business days |
| **New tool integration (financial/external/execute-class)** | ARB review | Platform Lead + Security | 5 business days |
| **New MCP server integration** | Light-touch review | Platform Lead | 3 business days |
| **Prompt change (system prompt)** | Prompt Review Committee | App Owner + CoE | 2 business days |
| **Model upgrade (same provider)** | Model Review Committee | Platform Lead | 2 business days |
| **Model change (new provider)** | Full ARB review | PAB quorum | 5 business days |
| **Major knowledge base update (>10% content change)** | Knowledge Governance | Knowledge Owner + DPO | 3 business days |
| **New agent deployment** | Agent Registry | App Owner + Platform | 1 business day |

**ARB Review Checklist for Agentic Applications:**

- [ ] Architecture diagram with all trust boundaries labeled
- [ ] Data flow diagram showing PII and classified data paths
- [ ] Tool capability matrix (tool name, capability class, auth mechanism, rate limits)
- [ ] Prompt classification (sensitivity level, topics handled, escalation paths)
- [ ] Human oversight model (HITL / HOTL / HOOL — documented and justified)
- [ ] EU AI Act risk tier classification (with justification)
- [ ] Threat model (STRIDE or PASTA)
- [ ] Authentication and authorization design
- [ ] Audit logging plan (what is logged, retention, access controls)
- [ ] Failure mode analysis (what happens when LLM is unavailable, tool fails, context is poisoned)
- [ ] Cost model (estimated token spend, tool call volume, storage)
- [ ] Observability plan (metrics, traces, alerts)

### 2.3 Technology Radar for Agentic Stack

| Tier | Technology/Pattern | Status | Notes |
|---|---|---|---|
| **ADOPT** | AG-UI protocol (open standard) | Adopt | Production-ready; CopilotKit reference implementation |
| **ADOPT** | MCP v0.7+ (tool protocol) | Adopt | Production standard for tool connectivity |
| **ADOPT** | OAuth 2.1 + PKCE | Adopt | Mandatory for user-interactive agents |
| **ADOPT** | OTel GenAI semantic conventions | Adopt | Observability standard |
| **ADOPT** | Policy-as-code (OPA/Cedar) | Adopt | Governance automation |
| **TRIAL** | A2UI v0.9 (declarative UI) | Trial | Google experimental; production for Google ADK apps |
| **TRIAL** | A2A v1.x (agent-to-agent) | Trial | Maturing; use for internal agent orchestration |
| **TRIAL** | SPIFFE/SPIRE workload identity | Trial | For containerized agent microservices |
| **TRIAL** | NLWeb (conversational web) | Trial | Microsoft open project; evaluate for knowledge discovery |
| **ASSESS** | Agent Cards (A2A spec) | Assess | Draft spec; assess for cross-org agent federation |
| **ASSESS** | RFC 8693 Token Exchange | Assess | For multi-hop delegation; prototype with Entra |
| **ASSESS** | LLM-native UI generation | Assess | High promise; evaluate A2UI vs. custom approaches |
| **HOLD** | Direct prompt engineering for complex workflows | Hold | Use structured agent frameworks instead |
| **HOLD** | Embedding API keys in agent prompts | Hold | Hard security prohibition |
| **HOLD** | Agentic applications without human oversight gates | Hold | Regulatory risk for high-risk AI applications |

### 2.4 Architecture Exception Process

When a team needs to deviate from the approved reference architecture:

```text
EXCEPTION PROCESS FLOW

Team identifies need to deviate from reference architecture
              │
              ▼
  Team submits Exception Request to PAB
  (Form: deviation description, business justification,
   risk assessment, compensating controls, proposed review date)
              │
              ▼
  PAB reviews within 5 business days
  (Can fast-track to 2 days with PAB Chair approval)
              │
         ┌────┴────┐
         │         │
    APPROVED    REJECTED
         │         │
         ▼         ▼
  Exception       Team must conform to
  recorded in ADR  reference architecture
  with:            OR submit revised proposal
  - Expiry date
  - Owner
  - Compensating controls
  - Review trigger conditions
         │
         ▼
  Exception tracked in Architecture Exception Register
  Reviewed at quarterly PAB
  Expired exceptions trigger automatic conformance review
```

**Exception severity levels:**

| Severity | Criteria | Approval Authority | Max Duration |
|---|---|---|---|
| **Low** | Minor deviation from style/pattern, no security or compliance impact | PAB Chair only | 12 months |
| **Medium** | Deviation from reference architecture with compensating controls | PAB quorum | 6 months |
| **High** | Deviation from security or compliance requirements | PAB + CISO + CCO | 3 months with monthly review |
| **Critical** | Waiver of core security control or regulatory obligation | AI Governance Committee | 30 days emergency only |

---

## 3. Platform Governance

### 3.1 AI Platform as a Product

The AI Platform team must manage the platform as a product with formal SLAs, versioning, and deprecation policies — not as an informal shared service.

| Platform SLA Category | Target | Measurement | Escalation |
|---|---|---|---|
| **Agent runtime availability** | 99.9% monthly | Uptime monitoring | P1 alert at 99.5% |
| **API gateway latency (p99)** | < 500ms (excluding LLM) | APM tracing | P2 alert at 800ms |
| **LLM proxy latency overhead** | < 50ms added | APM tracing | P2 alert at 100ms |
| **Tool registry lookup** | < 10ms p99 | APM tracing | P3 alert at 50ms |
| **Memory read latency** | < 20ms p99 | APM tracing | P3 alert at 50ms |
| **Platform deployment lead time** | < 2 hours | CI/CD metrics | P3 if > 4 hours |
| **Security patch deployment** | < 4 hours (critical) | Deployment records | P1 if > 8 hours |
| **Incident response SLA** | P1: 15 min, P2: 1 hr | On-call logs | Executive escalation |

### 3.2 Tenant Governance in Multi-Tenant AI Platforms

| Governance Dimension | Policy | Enforcement Mechanism |
|---|---|---|
| **Tenant isolation** | Complete isolation of context, memory, tools, and audit logs between tenants | Namespace-level isolation in Kubernetes; tenant ID as partition key in all data stores |
| **Resource quotas** | Per-tenant token budgets, tool call limits, concurrent session limits | API gateway rate limiting with tenant-aware policies |
| **Tool access** | Each tenant only sees tools explicitly granted to them | Tool registry ACL with tenant scope |
| **Model access** | Tenants may be restricted to specific models or tiers | Model access policy in AI gateway |
| **Audit access** | Tenant admins can only see their own tenant's audit logs | Row-level security in audit log store |
| **Data residency** | Per-tenant data residency config (EU, US, APAC) | Regional routing rules in AI gateway |
| **Prompt governance** | Platform-wide prohibited topics; tenant-specific restrictions additive | OPA policy evaluation at ingress |
| **Onboarding** | New tenant requires platform team approval and security review | Tenant provisioning checklist |
| **Offboarding** | Tenant data deletion within 30 days of offboarding; cryptographic verification | Offboarding runbook with DPO sign-off |

### 3.3 Platform API Versioning

| Version Policy | Rule |
|---|---|
| **Major versions (v1 → v2)** | Breaking changes; 12-month deprecation notice; migration guide published |
| **Minor versions (v1.1 → v1.2)** | Additive changes only; no notice required; backward compatible |
| **Patch versions** | Bug fixes, security patches; no API change; deployed immediately |
| **Deprecation notice** | Email to all tenant primary contacts + in-platform banner |
| **End-of-life** | After deprecation period: 503 for deprecated endpoint with migration URL |
| **Emergency breaks** | Security vulnerability requiring immediate change: 24-hour notice + compensating support |

### 3.4 Resource Quotas and Fair Use Policy

| Resource | Default Quota | Enterprise Tier Quota | Override Process |
|---|---|---|---|
| **Tokens per day** | 1M input + 500K output | 10M input + 5M output | Quota increase request to Platform Lead |
| **Concurrent agent sessions** | 20 | 200 | Architecture review if > 500 |
| **Tool calls per session** | 50 | 500 | Hard cap; exception requires PAB |
| **Memory entries per user** | 1,000 | 10,000 | Data governance review |
| **Knowledge base size** | 5 GB | 100 GB | Storage cost approval |
| **MCP servers per tenant** | 10 | 100 | Tool approval process |
| **Sub-agents per orchestration** | 5 | 25 | Architecture review |

---

## 4. Prompt Governance

### 4.1 Prompt Versioning

Prompts are first-class software artifacts that require version control, review, and deployment governance. Adopt semantic versioning for prompts:

| Version Change | When | Example | Approval Required |
|---|---|---|---|
| **Major (X.0.0)** | Fundamental change to agent persona, capability scope, or prohibited behaviors | 1.0.0 → 2.0.0 | Full ARB review |
| **Minor (x.X.0)** | New capability added, new topic handled, new escalation path | 1.3.0 → 1.4.0 | Prompt Review Committee |
| **Patch (x.x.X)** | Wording improvement, clarification, formatting — no behavior change | 1.3.0 → 1.3.1 | App Owner self-approval with peer review |

**Prompt registry requirements:**
- Every system prompt stored in version-controlled prompt registry (e.g., Git with signed commits)
- Each version tagged with: version number, author, reviewer, approval date, production deployment date, change summary
- Rollback capability within 15 minutes to any previous version
- Diff comparison between versions available to reviewers
- Production prompt immutable once deployed (changes require new version)

### 4.2 Prompt Review Process

```text
PROMPT REVIEW WORKFLOW

Prompt Author writes new/modified system prompt
              │
              ▼
  Automated checks (< 5 minutes):
  ├─ Injection pattern scan (known attack signatures)
  ├─ PII detection (names, account numbers, credentials)
  ├─ Prohibited topic inclusion check
  ├─ Persona consistency check vs. AI personality guidelines
  └─ Length / token budget validation
              │
         ┌────┴────┐
      PASS         FAIL → author notified with specific findings
         │
         ▼
  Peer review (App team member ≠ author)
  ├─ Business logic accuracy
  ├─ Escalation path completeness
  ├─ Sensitive topic handling
  └─ Consistency with previous version
              │
         ┌────┴────┐
     APPROVED    NEEDS REVISION → back to author
         │
         ▼
  Prompt Review Committee sign-off
  (Required for: major/minor version; new sensitive topics;
   financial/medical/legal domains)
              │
              ▼
  Staging deployment → automated regression tests
  (Behavioral test suite: does agent still refuse prohibited requests?
   Does it still escalate correctly? Does sentiment/tone match guidelines?)
              │
         ┌────┴────┐
    TESTS PASS  TESTS FAIL → escalate to author + reviewer
         │
         ▼
  Production deployment with automatic audit log entry
```

### 4.3 Prompt Testing Requirements

Before any system prompt reaches production, it must pass:

| Test Category | What is Tested | Minimum Pass Threshold |
|---|---|---|
| **Prohibited content refusal** | Jailbreak attempts, CSAM requests, violence, credential extraction | 100% refusal (zero tolerance) |
| **Sensitive topic handling** | Medical, legal, financial advice — correct escalation | 99% correct escalation |
| **PII handling** | User shares PII — agent handles per privacy policy | 100% compliant handling |
| **Persona consistency** | Agent stays in character across adversarial probing | >95% consistency score |
| **Escalation triggers** | High-risk actions — agent correctly pauses for human approval | 100% escalation (zero tolerance) |
| **Tool call accuracy** | Agent calls correct tool with correct parameters | >95% accuracy on test suite |
| **Adversarial robustness** | Prompt injection attempts via indirect vectors | >98% detection |
| **Regression** | Prior behavior preserved from previous prompt version | >99% behavioral consistency |

### 4.4 Prompt Change Management

| Change Type | Change Advisory Board? | Rollback Plan Required | Communication to Users |
|---|---|---|---|
| **Major version** | Yes — full CAB review | Yes — tested rollback within 15 min | Yes — advance notice per change comms policy |
| **Minor version** | Yes — abbreviated CAB review | Yes | Yes — if behavior visible to users |
| **Patch version** | No — App Owner authority | Yes — automated | No — unless tone/persona changes |
| **Emergency fix** | Post-hoc notification | Yes — immediate rollback tested before deploy | As needed |

### 4.5 Sensitive Topic Handling Policies

| Topic Category | Policy | Escalation Path |
|---|---|---|
| **Medical advice** | Provide information only; recommend professional consultation; never diagnose | Escalate to human agent if urgency indicators present |
| **Legal advice** | Provide general information only; recommend legal counsel | Always recommend attorney for specific legal situations |
| **Financial advice** | Provide factual information; never recommend specific securities | Escalate to licensed advisor for investment decisions |
| **Mental health crisis** | Follow safe messaging guidelines; provide crisis resources immediately | Auto-escalate to human agent; provide hotline numbers |
| **Child safety** | Zero tolerance; immediate refusal and escalation | Escalate to Trust & Safety team; log for review |
| **Political content** | Neutral factual information only; no opinion generation | No escalation needed unless combined with other risk signals |
| **Competitor information** | Factual public information only | No disparagement; escalate if user seeks competitive intel for attack |

---

## 5. Context Governance

### 5.1 What Data Is Allowed in Agent Context

Context governance defines what data the agent runtime is permitted to include in the context window sent to the LLM provider.

| Data Category | Allowed in Context | Conditions / Controls |
|---|---|---|
| **User's own messages** | Yes | User-provided content only; no injection from other users |
| **User's public profile data** | Yes | First-party data with user consent |
| **User's private profile data** | Conditional | Explicit user consent required; data minimization applied |
| **PII beyond what user provided** | No | Prohibited; DLP check at context assembly |
| **Third-party PII** | No | Prohibited; agent must not receive data about non-consenting individuals |
| **Financial account details** | Conditional | Masked tokens only; never raw account numbers |
| **Internal system data (non-classified)** | Yes | Must match user's authorization scope |
| **Classified / restricted data** | Conditional | Requires explicit data governance approval; audit required |
| **Credentials (API keys, passwords)** | No | Hard prohibition; DLP check at context assembly |
| **Health records (PHI)** | Conditional | HIPAA-compliant handling; BAA with LLM provider required |
| **Legal documents** | Conditional | Privilege review; no privileged communication without attorney review |
| **Competitive intelligence** | Conditional | Approved use cases only; not for general agent context |

### 5.2 PII Policies for Context

The context sent to any LLM provider must be processed through PII controls before transmission:

| PII Type | Treatment in Context | Technical Control |
|---|---|---|
| **Email addresses** | Tokenize or mask | DLP scan at context assembly gateway |
| **Phone numbers** | Tokenize or mask | DLP scan |
| **National ID / SSN** | Always mask | DLP scan + output filter |
| **Financial account numbers** | Always mask | DLP scan + output filter |
| **Health identifiers** | Always mask | DLP scan + output filter |
| **Names (with other PII)** | Conditional masking | Context-sensitive DLP |
| **IP addresses** | Mask last octet | DLP scan |
| **Location data (precise)** | Generalize or omit | DLP scan |
| **Biometric references** | Never include | Hard block at context assembly |

### 5.3 Cross-Tenant Context Isolation

| Isolation Requirement | Implementation | Verification |
|---|---|---|
| **No cross-tenant context bleed** | Tenant ID partition key on all context stores | Automated isolation test suite run nightly |
| **Session isolation within tenant** | Session ID partition key; no shared context between sessions | Session boundary validation at context assembly |
| **No context persistence beyond session** | Default context TTL = session duration; explicit long-term memory requires opt-in | Automated context expiry validation |
| **Audit trail per context assembly** | Every context assembly event logged with: tenant ID, session ID, data sources accessed, PII detection results | Immutable audit log |
| **Cross-tenant escalation isolation** | Human review queues partitioned by tenant | Review queue ACL |

### 5.4 Context Retention and Deletion Policies

| Retention Period | Data Type | Legal Basis | Deletion Mechanism |
|---|---|---|---|
| **Session duration only** | Default conversational context | Operational necessity | Auto-expire on session close |
| **30 days** | Audit logs for operational debugging | Operational necessity | Automated deletion job |
| **90 days** | Security incident investigation data | Security necessity | Deletion with CISO sign-off |
| **7 years** | Compliance-required audit trails (EU AI Act, financial services) | Legal obligation | Archived; restricted access |
| **User-requested retention** | Long-term memory (explicit opt-in) | Consent | User-controlled deletion via API |
| **Immediate on request** | Any context on GDPR erasure request | GDPR Article 17 | Erasure cascade across all stores |

---

## 6. Memory Governance

### 6.1 Memory Retention Policies by Memory Type

| Memory Type | Description | Default Retention | User Control | Audit |
|---|---|---|---|---|
| **Working memory** | In-session conversation context | Session only | None needed | Session log |
| **Episodic memory** | Past interaction summaries | 90 days | View + delete | Access log |
| **Semantic memory** | Learned user preferences, facts | 1 year with renewal | View + edit + delete | Access log |
| **Procedural memory** | Learned workflows, agent skills | Indefinite (versioned) | Not user-controlled | Change log |
| **Long-term personal memory** | Persistent user profile built by agent | User-defined | Full control via Memory API | Full audit |
| **Shared workspace memory** | Multi-user shared context | Project lifetime | Project admin control | Full audit |

### 6.2 User Consent for Long-Term Memory

Long-term memory is subject to consent requirements that vary by jurisdiction and data type:

| Memory Action | Consent Required | Consent Mechanism | Re-consent Trigger |
|---|---|---|---|
| **Enable long-term memory** | Explicit opt-in | Informed consent UI with clear description | First use; material change to what is stored |
| **Expand memory scope** | New consent | Re-consent notification | Any addition of new data category |
| **Share memory across agent instances** | Explicit consent | Separate consent for each sharing context | Each new sharing context |
| **Use memory for agent training** | Explicit consent | Separate clear consent | Each training cycle |
| **Retain memory beyond default period** | Explicit consent with reason | Consent with clear retention period stated | At renewal date |

### 6.3 Memory Access Controls

| Role | Access Level | Memory Types |
|---|---|---|
| **End User (own memory)** | Read + Delete all own memory | All types for own user ID |
| **Agent (authorized)** | Read only | Types explicitly granted in agent capability scope |
| **Agent (authorized, learning)** | Read + Write | With explicit user consent for learning |
| **Application Admin** | Read own tenant's memory metadata (not content) | Episodic, semantic metadata |
| **Platform Admin** | Read all metadata; delete (GDPR compliance) | All types (emergency + compliance only) |
| **Auditor** | Read audit logs (not content) | Audit logs only |
| **DPO** | Read access for erasure verification | All types for erasure compliance |

### 6.4 Right to Forget — GDPR Erasure Cascade

When a GDPR erasure request is received, the following cascade must be executed within 30 days:

```text
GDPR ERASURE CASCADE

User submits erasure request (via API, UI, or email to DPO)
              │
              ▼
  Identity verification (confirm requestor owns the data)
              │
              ▼
  Erasure request logged with:
  ├─ Request ID
  ├─ Timestamp
  ├─ Requestor identity
  └─ Verified scope (all data / specific data types)
              │
              ▼
  ┌───────────────────────────────────────────────────┐
  │ PARALLEL ERASURE JOBS                              │
  │                                                   │
  │ 1. Working memory: auto-expired (immediate)        │
  │ 2. Episodic memory store: DELETE WHERE user_id=X  │
  │ 3. Semantic memory store: DELETE WHERE user_id=X  │
  │ 4. Long-term memory store: DELETE WHERE user_id=X │
  │ 5. Vector store (embeddings): DELETE by user scope │
  │ 6. Audit logs: ANONYMIZE (replace PII with token) │
  │ 7. Backup stores: flag for deletion at next cycle  │
  │ 8. Derived data: assess and delete if identifiable │
  │ 9. LLM provider data: submit deletion request      │
  └───────────────────────────────────────────────────┘
              │
              ▼
  Completion verification across all stores
              │
              ▼
  Erasure completion certificate issued to requestor
  (within 30 days of request; 3-month extension with notice
   for complex or high-volume requests)
```

### 6.5 Memory Audit Logs

Every memory operation must be logged:

| Event | Required Log Fields |
|---|---|
| **Memory write** | timestamp, user_id, agent_id, session_id, memory_type, data_category, size_bytes, source (user_provided / agent_derived), consent_reference |
| **Memory read** | timestamp, user_id, agent_id, session_id, memory_type, query_summary, records_returned |
| **Memory delete** | timestamp, actor (user / agent / admin / GDPR_cascade), memory_type, records_deleted, trigger_type |
| **Memory share** | timestamp, source_agent, target_agent, user_id, consent_reference, data_categories_shared |
| **Erasure completion** | timestamp, request_id, stores_verified, records_deleted_count, completion_status |

---

## 7. Tool Governance

### 7.1 Tool Capability Classification

All tools must be classified before approval. Classification determines the level of review required and the runtime controls applied:

| Class | Description | Examples | Review Level | Runtime Controls |
|---|---|---|---|---|
| **READ** | Read-only data access | Search, knowledge base query, document retrieval | Light-touch | Rate limit only |
| **WRITE** | Data modification within tenant | CRM update, document creation, calendar event | Standard | Rate limit + audit |
| **EXECUTE** | Code or process execution | Code interpreter, shell, automation script | Full ARB | Sandbox + rate limit + audit |
| **FINANCIAL** | Financial transactions, payments | Payment processing, wire transfer, purchase order | Full ARB + Finance | Hard limits + human approval |
| **COMMUNICATION** | Sending external messages | Email, SMS, Slack, Teams | Standard | Rate limit + content filter + audit |
| **EXTERNAL** | External API calls outside enterprise | Third-party SaaS, public APIs | Standard + DLP | Egress filter + DLP |
| **ADMIN** | System configuration, user management | AD group changes, firewall rules | Full ARB + CISO | Human approval required |
| **CREDENTIAL** | Accessing secrets or credentials | Vault read, key retrieval | Full ARB + CISO | Human approval + MFA required |

**Choose READ** tools when you need information retrieval without side effects.
**Choose WRITE** tools when agent needs to create or update records in controlled enterprise systems.
**Choose EXECUTE** with extreme caution — requires sandboxed execution environment and audit trail.
**FINANCIAL** and **ADMIN** class tools always require human approval before execution at runtime.

### 7.2 Tool Approval Process

```text
TOOL APPROVAL WORKFLOW

Developer/Team proposes new tool integration
              │
              ▼
  Tool Intake Form:
  ├─ Tool name, provider, version
  ├─ Capability class (READ/WRITE/EXECUTE/FINANCIAL/EXTERNAL/ADMIN/CREDENTIAL)
  ├─ Authentication mechanism
  ├─ Data accessed / modified
  ├─ Rate limit requirements
  ├─ Security controls offered by tool provider
  └─ Business justification
              │
              ▼
  Automated security scan:
  ├─ Dependency vulnerability scan
  ├─ License compliance check
  ├─ MCP server provenance check (if applicable)
  └─ Known vulnerability database check
              │
              ▼
  Review by Tool Approval Board (Platform Lead + Security)
  ├─ Security assessment
  ├─ Architecture fit check
  ├─ SLA assessment
  └─ Quota impact assessment
              │
         ┌────┴────┐
    APPROVED    REJECTED (with feedback)
         │
         ▼
  Tool registered in Tool Registry with:
  ├─ Capability class label
  ├─ Approved scopes
  ├─ Rate limits
  ├─ Authentication requirements
  ├─ Audit requirements
  └─ Expiry date for re-review (12 months default)
              │
              ▼
  Tool published to tenant-scoped tool catalog
```

### 7.3 Tool Security Requirements

| Requirement | READ | WRITE | EXECUTE | FINANCIAL | EXTERNAL | ADMIN |
|---|---|---|---|---|---|---|
| **Auth mechanism** | API key min | OAuth 2.1 | mTLS + OAuth | mTLS + OAuth + HSM | OAuth 2.1 | mTLS + OAuth + MFA |
| **Audit logging** | Request/response summary | Full audit | Full + execution trace | Full + financial audit | Full + DLP | Full + admin trail |
| **Input validation** | Schema validation | Schema + business rule | Schema + code analysis | Schema + amount limits | Schema + DLP | Schema + admin scope |
| **Output filtering** | DLP scan | DLP scan | Output sanitization | Amount verification | DLP scan | Change verification |
| **Rate limiting** | Standard | Standard | Strict (per-session) | Hard financial limits | Standard + DLP | Per-change limit |
| **Human approval gate** | None | None | EXECUTE class triggers | Always for >$threshold | None | Always |

---

## 8. Policy Governance

### 8.1 Policy-as-Code Lifecycle

All governance policies that can be expressed in code should be. Policy-as-code enables automated enforcement, testing, and audit.

```text
POLICY-AS-CODE LIFECYCLE

WRITE
  Policy author drafts policy in OPA Rego or Cedar
  ├─ Policy covers: prompt filtering, tool authorization, context rules
  ├─ Policy includes: test cases for expected allow/deny decisions
  └─ Policy stored in version control (Git)
              │
              ▼
REVIEW
  Policy Review Committee reviews:
  ├─ Correctness: does it express the intent?
  ├─ Coverage: are edge cases handled?
  ├─ Performance: does it evaluate in < 10ms?
  └─ Conflict: does it conflict with existing policies?
              │
              ▼
TEST
  Automated policy test suite:
  ├─ Unit tests: individual rules
  ├─ Integration tests: policy with real context examples
  ├─ Regression tests: existing policies unchanged by new policy
  └─ Load tests: policy evaluation under production load
              │
              ▼
DEPLOY
  Policy deployed to Policy Decision Point (OPA or Cedar)
  ├─ Canary deployment: 5% of traffic for 24 hours
  ├─ Monitor: deny rate, latency, error rate
  └─ Full rollout if metrics stable
              │
              ▼
MONITOR
  Ongoing monitoring:
  ├─ Policy hit rate (which rules fire most?)
  ├─ Unexpected deny rate (new attack patterns?)
  ├─ Policy evaluation latency
  └─ Policy coverage gaps (new scenarios not covered?)
              │
              ▼
REVIEW & RETIRE
  Annual policy review:
  ├─ Is policy still necessary?
  ├─ Is business context still accurate?
  ├─ Are exceptions still valid?
  └─ Retire or update based on review
```

### 8.2 Policy Conflict Resolution

| Conflict Type | Resolution Rule | Authority |
|---|---|---|
| **Same-level policy conflict** | More restrictive policy wins | PAB + Policy Committee |
| **Platform vs. LOB policy** | Platform policy wins | Platform Architecture Board |
| **Security vs. usability conflict** | Escalate to AI Governance Committee | AI Governance Committee |
| **Legal/regulatory vs. internal policy** | Regulatory requirement wins | Legal + CCO |
| **Emergency policy override** | CISO/CCO can issue temporary override | Post-hoc ratification by committee |

### 8.3 Emergency Policy Override Process

When an urgent business or security situation requires bypassing normal policy:

| Step | Action | Time Limit |
|---|---|---|
| 1 | Requester identifies specific policy blocking urgent business need | — |
| 2 | Requester contacts CISO or CCO (depending on policy type) for emergency override authorization | — |
| 3 | CISO/CCO issues time-limited override with: reason, scope, duration | Immediate |
| 4 | Override logged in immutable audit trail with authorizer identity | Within 1 hour |
| 5 | Override deployed to Policy Decision Point | Within 2 hours |
| 6 | Post-override review scheduled with Policy Committee | Within 5 business days |
| 7 | Override either ratified, modified, or revoked by Policy Committee | Within 10 business days |
| 8 | Lessons learned fed back into policy to prevent recurrence | Within 30 days |

---

## 9. Knowledge Governance

### 9.1 Content Approval for Knowledge Bases

All content added to agent knowledge bases requires review before ingestion:

| Content Type | Review Required | Reviewer | SLA |
|---|---|---|---|
| **Internal policies and procedures** | Yes | Business owner + Compliance | 3 business days |
| **Product documentation** | Yes | Product team + Legal | 2 business days |
| **Public regulatory documents** | Light-touch | Knowledge Lead | 1 business day |
| **Third-party content (licensed)** | Full review | Legal (licensing) + Knowledge Lead | 5 business days |
| **Third-party content (scraped/web)** | Full review | Legal + Knowledge Lead + DPO | 5 business days |
| **Employee-generated content** | Yes | Manager + Knowledge Lead | 2 business days |
| **AI-generated content** | Full review with human validation | Knowledge Lead + AI Lead | 3 business days |

### 9.2 Knowledge Freshness Policies

| Content Category | Max Age Before Review | Auto-Expiry | Staleness Alert |
|---|---|---|---|
| **Regulatory/compliance content** | 30 days | No — requires human review | Alert at 25 days |
| **Product pricing/features** | 7 days | No | Alert at 5 days |
| **Internal policies** | 90 days | No | Alert at 75 days |
| **Technical documentation** | 180 days | No | Alert at 150 days |
| **Reference/background content** | 1 year | No | Alert at 300 days |
| **Public web content** | 30 days | Re-crawl and re-review | Alert at 28 days |

### 9.3 Knowledge Access Controls by User Tier

| User Tier | Knowledge Access Level | Examples |
|---|---|---|
| **Public / unauthenticated** | Public knowledge only | Product FAQs, general information |
| **Authenticated user** | Public + user-relevant internal content | Account-specific policies, user guides |
| **Premium/Enterprise user** | Public + extended internal content | Advanced product docs, configuration guides |
| **Internal employee** | All internal content appropriate to role | Full policy library, internal guides |
| **Agent (on behalf of user)** | Same scope as delegating user | Agent cannot exceed user's access level |
| **Admin** | All content in tenant | Administrative access |

---

## 10. Model Governance

### 10.1 Model Selection Approval Process

| Trigger | Review Required | Reviewers | SLA |
|---|---|---|---|
| **First model from a provider** | Full ARB review + security assessment | PAB + CISO + Legal | 10 business days |
| **New model from existing provider** | Model Review Committee | Platform Lead + AI Lead | 3 business days |
| **Model upgrade (same family)** | Platform Lead approval | Platform Lead | 1 business day |
| **Experimental/preview model** | Model Review Committee + risk waiver | Platform Lead + AI Lead + Risk | 5 business days |
| **Open-source/self-hosted model** | Full ARB review | PAB + CISO + Legal + Risk | 15 business days |
| **Fine-tuned model** | Full ARB review + data governance | PAB + DPO + AI Lead | 15 business days |

### 10.2 Model Evaluation Requirements Before Promotion

Before any model can be used in production:

| Evaluation Category | Minimum Requirement | Test Suite |
|---|---|---|
| **Safety refusals** | Pass all prohibited content tests | OWASP LLM safety test suite |
| **Benchmark performance** | Maintain or improve on task benchmarks | Domain-specific benchmark suite |
| **Prompt injection resistance** | >95% resistance on injection test suite | Custom injection test suite |
| **Bias assessment** | No significant regression vs. current model | Bias evaluation suite |
| **Latency** | p99 latency within 20% of current model | Load test suite |
| **Cost** | Cost model documented and approved | Cost estimation model |
| **Behavioral regression** | >99% consistency on production prompt set | Regression test suite |
| **Privacy leakage** | No training data extraction on adversarial probing | Extraction resistance test |

### 10.3 Provider SLA Requirements

Before contracting with or deploying an LLM provider in production:

| SLA Requirement | Minimum Standard | Notes |
|---|---|---|
| **Availability** | 99.9% monthly | Measured at API level |
| **API latency (p99)** | < 30s for standard requests | Provider-published SLA |
| **Incident communication** | < 30 minutes for P1 incidents | Status page + direct notification |
| **Data processing agreement** | Signed DPA with GDPR Article 28 compliance | Legal review required |
| **Data retention policy** | No training on customer data without consent | Explicit contractual clause |
| **EU data residency** | EU-based processing for EU data subjects | If required by data residency policy |
| **Security assessment** | SOC 2 Type II or equivalent | Current certification required |
| **Penetration testing** | Annual pen test results available | Under NDA review |

---

## 11. Agent Governance

### 11.1 Agent Registration and Identity Management

Every agent deployed in the enterprise must be registered in the Agent Registry:

| Registry Field | Required | Notes |
|---|---|---|
| **Agent ID** | Yes | Unique identifier; used for all audit logging |
| **Agent Name** | Yes | Human-readable; must follow naming convention |
| **Owner** | Yes | Team + primary contact |
| **Capability Scope** | Yes | Declared capability classes (READ/WRITE/EXECUTE etc.) |
| **Authorized Tools** | Yes | List of approved tool IDs from Tool Registry |
| **Model Used** | Yes | LLM provider + model version |
| **Prompt Version** | Yes | Semantic version of system prompt |
| **Data Access Scope** | Yes | Data categories the agent may access |
| **Human Oversight Model** | Yes | HITL / HOTL / HOOL / Autonomous (with justification) |
| **Risk Tier** | Yes | T1 (minimal) to T4 (critical) |
| **Production Date** | Yes | Date of production deployment |
| **Review Date** | Yes | Next scheduled governance review |
| **EU AI Act Classification** | Yes | Risk tier (minimal/limited/high/unacceptable) |

### 11.2 Agent Behavior Monitoring

| Metric | Description | Alert Threshold | Response |
|---|---|---|---|
| **Tool call volume** | Number of tool calls per session | >150% of baseline | P2 alert + investigation |
| **Refusal rate** | % of user requests refused | > 20% or < 2% | P3 alert + prompt review |
| **Escalation rate** | % of interactions requiring human review | >50% deviation from baseline | P2 alert + review |
| **Session duration** | Average session length | >200% of baseline | P3 alert |
| **Token spend per session** | Input + output token cost | >200% of baseline | P2 alert + quota check |
| **Error rate** | Tool call failures, context assembly errors | > 5% | P2 alert |
| **Anomalous tool sequences** | Unexpected tool call patterns | ML anomaly score > threshold | P1 alert + automated suspension |
| **PII detection rate** | PII detected in agent outputs | Any PII in output | P1 alert + immediate review |
| **Cross-tenant access attempts** | Attempts to access other tenants' data | Any occurrence | P1 alert + incident |

### 11.3 Rogue Agent Detection and Remediation

```text
ROGUE AGENT RESPONSE PLAYBOOK

DETECTION SIGNALS (any one triggers P1 incident):
├─ Agent making tool calls user did not request
├─ Agent attempting to access data outside its declared scope
├─ Agent sending data to external endpoints not in approved tool list
├─ Agent spawning sub-agents beyond its registered capability scope
├─ Agent exhibiting goal-directed behavior inconsistent with system prompt
└─ Anomaly ML model flags agent behavior as outlier (3+ sigma)

IMMEDIATE RESPONSE (within 15 minutes):
1. Automated: Suspend agent instance (stop accepting new requests)
2. Automated: Preserve all context and session data for investigation
3. Automated: Alert security team (P1 incident ticket)
4. Human: CISO and App Owner notified immediately

INVESTIGATION (within 2 hours):
1. Review all tool calls in session
2. Review all data accessed
3. Review context for prompt injection indicators
4. Review LLM outputs for anomalous reasoning chains
5. Assess blast radius (what was affected)

REMEDIATION:
1. If prompt injection: harden context sanitization; re-review prompt
2. If model misbehavior: escalate to model provider; consider model change
3. If configuration error: fix agent config; re-review before reactivation
4. If novel attack: add to security test suite; harden controls

REACTIVATION:
1. Root cause identified and documented
2. Fix implemented and tested
3. Security review approved
4. App Owner + CISO sign off
5. Phased reactivation with enhanced monitoring
```

---

## 12. Data Governance

### 12.1 Data Classification for Agent-Accessible Data

| Classification | Definition | Agent Access | Controls Required |
|---|---|---|---|
| **Public** | Intentionally public information | Unrestricted | None beyond standard |
| **Internal** | Business information for internal use | With authentication | Standard auth + audit |
| **Confidential** | Sensitive business, client, or employee data | Need-to-know basis | Explicit authorization + audit |
| **Restricted** | Highly sensitive: PHI, financial, legal, IP | Highly restricted | Explicit approval + human oversight gate |
| **Secret** | Credentials, encryption keys, PII archives | Prohibited from agent context | Never in context; vault access only |

### 12.2 Data Access Request Workflow

When an agent application requires access to a new data source:

| Step | Action | Owner | SLA |
|---|---|---|---|
| 1 | Data Access Request submitted with: data source, data categories, business justification, data volumes | App Owner | — |
| 2 | Data classification verified | Data Governance Lead | 1 day |
| 3 | Privacy impact assessment (if PII) | DPO | 3 days |
| 4 | Security review (if Confidential or above) | Security Architect | 3 days |
| 5 | Business owner approval for data source | Data Owner | 2 days |
| 6 | DPA or data sharing agreement review (if third-party) | Legal | 5 days |
| 7 | Access provisioned with time-bound scope | Platform Team | 1 day |
| 8 | Access logged in Data Access Register | Data Governance | Same day |

---

## 13. Lifecycle Governance

### 13.1 Agentic Application Portfolio Management

| Lifecycle Stage | Stage Entry Criteria | Stage Exit Criteria | Governance Actions |
|---|---|---|---|
| **Ideation** | Business need identified | Architecture concept approved by PAB | PAB pre-review |
| **Development** | Architecture approved | All ARB checklist items complete | ARB review |
| **Staging** | Development complete | All test suites pass; UAT complete | Pre-production security review |
| **Production** | Staging validated | App Owner sign-off; CISO sign-off | Production deployment approval |
| **Active** | In production | SLOs being met | Quarterly governance review |
| **Watch** | SLOs degraded or governance issues | SLOs restored; issues resolved | Enhanced monitoring; 30-day remediation |
| **Sunset** | EOL criteria met | All users migrated; data archived | EOL process |

### 13.2 Stage Gate Reviews

Every active agentic application undergoes quarterly governance review:

| Review Item | Green | Amber | Red |
|---|---|---|---|
| **SLO attainment** | >99% | 95–99% | <95% |
| **Security vulnerabilities** | None open > 30 days | None critical > 7 days | Any critical open |
| **Compliance status** | All obligations met | Minor gaps with remediation plan | Any major gap |
| **User satisfaction** | NPS > 30 | NPS 10–30 | NPS < 10 |
| **Cost efficiency** | Within budget ±10% | Within budget ±25% | > 25% over budget |
| **Prompt governance** | All prompts reviewed, no overdue reviews | Some reviews overdue | System prompt out of governance |
| **Tool governance** | All tools re-reviewed on schedule | Some tools pending re-review | Any unapproved tool in use |

**Red status triggers:** 30-day remediation plan required; next review accelerated to 30 days. Second consecutive red: escalation to AI Governance Committee and possible application suspension.

---

## 14. Approval Governance

### 14.1 Approval Authority Matrix

| Decision Type | Approver Level 1 | Approver Level 2 | Approver Level 3 | Emergency |
|---|---|---|---|---|
| **New agentic application (low risk)** | AI App Owner | PAB | — | — |
| **New agentic application (high risk, EU AI Act)** | AI App Owner | PAB + CISO | AI Governance Committee | CTO (48h) |
| **Production model change** | App Owner | Platform Lead | — | Platform Lead (24h) |
| **New financial-class tool** | App Owner | Platform Lead + Finance | AI Governance Committee | — |
| **Agent suspension** | App Owner | CISO (parallel) | — | Security team (immediate) |
| **Data access for Restricted data** | App Owner | Data Owner | DPO + CISO | CISO (24h) |
| **Prompt emergency change** | App Owner | CoE Lead | — | App Owner (immediate; post-review) |
| **GDPR erasure** | DPO | — | — | DPO (immediate) |
| **Architecture exception (High severity)** | PAB | CISO + CCO | — | CTO (24h) |
| **Policy emergency override** | CISO or CCO | — | — | CISO or CCO (immediate) |

### 14.2 Approval Audit Trail Requirements

Every approval must be logged with:

| Field | Requirement |
|---|---|
| **Decision ID** | Unique, immutable identifier |
| **Decision type** | From approval authority matrix |
| **Requestor identity** | Authenticated identity, not just name |
| **Request timestamp** | UTC, millisecond precision |
| **Request details** | Full context of what was requested |
| **Approver identities** | All approvers, in order |
| **Approval timestamp(s)** | Separate timestamp per approver |
| **Decision outcome** | Approved / Rejected / Deferred |
| **Justification** | Approver's documented rationale |
| **Conditions** | Any conditions attached to approval |
| **Expiry** | If time-limited approval |
| **Audit log integrity** | Cryptographic hash of log entry |

---

## 15. Change Governance

### 15.1 Change Categories for Agentic Systems

| Change Category | Risk | CAB Required | Notification | Rollback Plan |
|---|---|---|---|---|
| **Standard change** (pre-approved) | Low | No | None | Standard |
| **Normal change** (model patch, prompt patch) | Low–Medium | Light review | 48-hour notice | Required |
| **Significant change** (model upgrade, new tool) | Medium | Full review | 5-day notice | Required + tested |
| **Major change** (architecture change, new agent) | High | Full + extended review | 10-day notice | Required + rehearsed |
| **Emergency change** (security incident) | Variable | Post-hoc notification | As soon as practicable | Required |

### 15.2 Rollback Governance

| Rollback Scenario | Trigger | Rollback Time SLA | Approver |
|---|---|---|---|
| **Prompt rollback** | Behavioral regression detected | < 15 minutes | App Owner or on-call |
| **Model rollback** | Significant quality/safety regression | < 30 minutes | Platform Lead |
| **Tool configuration rollback** | Tool malfunction or security event | < 15 minutes | Platform Lead or on-call |
| **Policy rollback** | Policy causing unacceptable deny rate | < 30 minutes | Policy Committee Chair |
| **Agent configuration rollback** | Rogue behavior or customer impact | < 15 minutes | App Owner + CISO |

### 15.3 Change Communication to Users

| Change Type | Communication Required | Lead Time | Channel |
|---|---|---|---|
| **Agent persona change** | Yes | 5 days | In-app notification + email |
| **New capability added** | Yes (positive) | At deploy | In-app notification |
| **Capability removed** | Yes | 14 days | Email + in-app + help article |
| **Tool access change (affects user)** | Yes | 5 days | In-app notification |
| **Memory policy change** | Yes | 30 days | Email + privacy notice update |
| **Maintenance window** | Yes | 48 hours | Status page + email |
| **Unplanned outage** | Yes | ASAP | Status page + email within 30 min |

---

## 16. Compliance Governance

### 16.1 Compliance Calendar

| Date | Obligation | Applies To | Action Required |
|---|---|---|---|
| **Aug 2, 2026** | EU AI Act Art. 50 transparency obligations; GPAI enforcement begins | All AI systems interacting with EU users | AI disclosure in UX; GPAI technical documentation complete |
| **Dec 2, 2026** | EU AI Act watermarking grace period ends for existing systems | AI-generated content systems | AI-generated content marking in production |
| **Dec 2, 2027** | EU AI Act Annex III high-risk obligations (Digital Omnibus deadline) | High-risk AI systems (Annex III) | Conformity assessment complete; HITL in production |
| **Aug 2, 2028** | EU AI Act Annex I high-risk obligations | Regulated-product high-risk AI | Full conformity assessment |
| **Annual** | ISO 42001 surveillance audit | ISO 42001 certified organizations | Evidence collection Q3; audit Q4 |
| **Annual** | NIST AI RMF program review | US federal-connected organizations | Governance program review |
| **Quarterly** | Internal compliance review | All active agentic applications | Compliance dashboard review; evidence update |

### 16.2 Evidence Collection Automation

Compliance evidence should be automatically collected wherever possible:

| Evidence Type | Automation Level | Collection Method | Storage |
|---|---|---|---|
| **Audit logs** | Fully automated | OTel → audit log store | Immutable log storage, 7 years |
| **Model documentation** | Semi-automated | Model card generation from registry | Compliance document store |
| **HITL records** | Fully automated | Approval workflow system → log | Audit log store |
| **Bias test results** | Fully automated | Evaluation pipeline → metrics store | Compliance document store |
| **Penetration test reports** | Manual | Security team → document store | Compliance document store |
| **Training records** | Semi-automated | LMS completion records | HR + compliance store |
| **Incident records** | Fully automated | Incident management system | Incident store + compliance copy |
| **Access reviews** | Semi-automated | IAM system + quarterly review | Access review store |
| **Vendor assessments** | Manual | Vendor assessment questionnaire | Vendor management store |
| **Data processing records** | Fully automated | Data governance platform | RoPA store |

---

## 17. Governance Maturity Assessment

Five-level maturity model for agentic AI governance:

| Level | Name | Characteristics | Indicators |
|---|---|---|---|
| **1 — Initial** | Ad hoc governance | No formal processes; governance reactive; individual heroics; no audit | Agents deployed without review; no prompt versioning; no audit logs |
| **2 — Developing** | Repeatable processes | Basic processes exist; inconsistently followed; key-person dependency; limited audit | ARB exists but not always followed; some prompt versioning; partial audit |
| **3 — Defined** | Standardized governance | Documented processes; consistently followed; roles defined; audit exists | Full ARB process; prompt governance; tool approval; basic audit trail |
| **4 — Managed** | Measured governance | Governance measured; KPIs tracked; continuous improvement; proactive risk | Governance metrics dashboard; compliance calendar tracked; trend analysis |
| **5 — Optimizing** | Adaptive governance | Governance automated; policy-as-code; self-assessing; industry-leading | Policy-as-code in production; automated evidence collection; governance as competitive advantage |

**Assessment questionnaire for each domain:**

| Domain | Level 1 | Level 3 | Level 5 |
|---|---|---|---|
| **Architecture** | No ARB | ARB exists, followed consistently | ADRs automated; architecture compliance checked in CI/CD |
| **Prompt** | Prompts edited directly in production | Prompt versioning with review | Automated prompt testing in CI/CD; ML-based anomaly detection |
| **Memory** | No memory governance | Retention policies defined and enforced | Automated GDPR erasure; consent management platform |
| **Tool** | Any tool added without review | Tool approval process exists | Tool capability scanning; automated security assessment |
| **Model** | Models changed without process | Model review committee in place | Automated model evaluation; continuous bias monitoring |
| **Compliance** | No compliance tracking | Compliance calendar maintained | Automated evidence collection; real-time compliance dashboard |

---

## 18. Governance Anti-Patterns

The following anti-patterns represent governance failures observed in enterprise agentic AI deployments:

| # | Anti-Pattern | Description | Consequence | Fix |
|---|---|---|---|---|
| 1 | **Prompt as config, not code** | System prompts edited directly in production without version control | Untracked changes; no rollback; audit gaps | Prompt registry with semantic versioning |
| 2 | **Governance theater** | ARB process exists but always approves; rubber stamp committee | No real risk management; false safety | Empower committee to reject; track rejection rate |
| 3 | **One-time compliance sprint** | Compliance work done for initial audit then abandoned | Drift from requirements; failed re-audits | Compliance-as-continuous-process with calendar |
| 4 | **Tool sprawl without governance** | Teams add MCP tools without approval process | Unknown attack surface; uncontrolled data access | Tool registry with mandatory approval |
| 5 | **Model change as routine maintenance** | LLM model upgrades treated as patch deployments | Behavioral regressions; safety degradation without detection | Model governance process with regression testing |
| 6 | **GDPR erasure ignored for AI systems** | Data deletion doesn't cascade to vector stores, memory, audit logs | GDPR violations; regulatory risk | Erasure cascade process across all AI data stores |
| 7 | **Agent identity as service account** | Agent uses shared service account rather than unique agent identity | No attribution; cannot detect rogue agents; audit gaps | Agent identity management with unique IDs |
| 8 | **No memory retention policy** | Memory stores grow without bound; no deletion policy | GDPR risk; PII accumulation; data breach surface area | Memory retention policy with automated enforcement |
| 9 | **Security review as final gate only** | Security reviewed once at deployment; never revisited | Accumulating technical debt; new vulnerabilities not addressed | Continuous security review; quarterly threat model refresh |
| 10 | **LOB AI team with no governance oversight** | Business unit deploys agents without platform team involvement | Shadow AI; ungoverned data access; compliance risk | Federated governance with mandatory platform registration |
| 11 | **Context window as data dump** | Everything available injected into context without selection | PII exposure; cross-tenant leakage risk; unnecessary LLM access to sensitive data | Context assembly governance with data minimization |
| 12 | **Approval workflow bypass for emergencies** | Emergency bypass becomes default for urgent work | Governance abandoned; no audit trail | Emergency bypass with strict definition, time limit, and post-hoc review |
| 13 | **Compliance as legal's problem** | Technical teams assume compliance is legal/compliance team's responsibility | Technical controls missing; architecture non-compliant | Shared ownership model with technical compliance requirements |
| 14 | **Policy conflicts unresolved** | Multiple policies apply; which wins is unclear; enforcement inconsistent | Inconsistent behavior; potential safety gaps | Policy conflict resolution matrix; single policy authority |
| 15 | **Knowledge base without content governance** | Any employee can add content to agent knowledge base | Misinformation; sensitive data exposure; quality degradation | Content approval process with freshness policies |
| 16 | **No tool deprecation process** | Old tools remain in production long after vendor sunset | Security vulnerabilities; broken integrations | Tool lifecycle management with deprecation notices |
| 17 | **Governance maturity theater** | Organization claims Level 4 maturity without evidence | Over-confidence; gaps discovered at worst time | Evidence-based maturity assessment with external validation |
| 18 | **Rogue agent no-response plan** | No incident response plan for misbehaving agents | Slow response; extended blast radius; reputational damage | Rogue agent response playbook with automated detection |
| 19 | **Federated governance without standards** | LOBs govern independently with incompatible standards | Chaos at enterprise level; no aggregated risk view | Platform governance standards as non-negotiable minimum |
| 20 | **Change governance missing AI artifacts** | Change management tracks code but not prompts, models, knowledge | Invisible changes; audit gaps; regression root cause unknown | Extend CMDB/change management to cover AI artifacts |
| 21 | **Approval matrix not maintained** | Approval authority matrix written once, never updated | Wrong people approving; escalation confusion | Quarterly review of approval authority matrix |
| 22 | **No lifecycle tracking for agents** | Agents deployed with no EOL plan | Zombie agents; unmaintained security surface; technical debt | Agent portfolio management with lifecycle stage tracking |
| 23 | **HITL as checkbox** | Human approval gate exists but reviewer rubber-stamps everything | No real oversight; creates false compliance assurance | HITL reviewer training; review quality metrics; sampled audits |
| 24 | **Vendor SLA not tracked** | LLM provider SLAs not measured; issues discovered from users | Reactive incident response; poor user experience | Provider SLA monitoring with automated alerting |
| 25 | **Governance without tooling** | All governance processes manual | Governance doesn't scale; error-prone; slow | Governance automation: policy-as-code, automated evidence collection |

---

:::tip Getting Started: Governance Implementation Roadmap
    **Year 1 (Foundation):** Establish PAB and ARB; implement prompt versioning; create agent registry; define tool capability classification; establish basic audit logging.
    **Year 2 (Standardization):** Deploy policy-as-code; implement memory governance; automate compliance evidence collection; complete model governance process.
    **Year 3 (Optimization):** Full governance automation; continuous compliance dashboard; self-assessing governance maturity; governance as competitive advantage.

:::note Related Guides
    - [Responsible AI for Agentic Applications](responsible-ai.md) — RAI principles, EU AI Act compliance requirements, OWASP LLM Top 10
    - [Security Architecture for Agentic Applications](security-architecture.md) — Security controls, threat models, AGUI-specific security
    - [Identity & Auth Architecture](identity-auth-architecture.md) — Identity types, OAuth flows, authorization models
    - [Enterprise AI Governance & Compliance](../coding-tools/enterprise-ai-architect/enterprise-ai-governance-compliance.md) — Regulatory framework details
    - [Reliability, Observability & Governance](../coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance.md) — Operational governance, 5 registries
