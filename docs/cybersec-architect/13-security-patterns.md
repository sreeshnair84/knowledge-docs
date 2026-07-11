---
title: "Part 13 — Security Patterns"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cybersec-architect"]
doc_type: multi-part-series
series_name: Cybersecurity Architect
series_part: 13
series_total: 15
series_index: index.md
---

# Part 13 — Security Patterns

**Audience:** Security architects and AI engineers implementing reusable security patterns for AI platforms, agent runtimes, and data pipelines.

**Related:**
[Overview](index.md) |
[Agentic AI Security](05-agentic-ai-security.md) |
[EA Deliverables](12-ea-deliverables.md) |
[Security Architecture & Guardrails](../enterprise-architecture/ai-architecture/agentic-ai-security-guardrails.md)

> **Current as of July 2026.** Reusable security patterns for the AI era — each described with architecture diagram, key controls, when to use, and implementation notes.

---

## 1. Secure AI Platform Pattern

### 1.1 Pattern Description

A centralized enterprise AI platform that provides secure, governed access to AI capabilities for all internal consumers.

### 1.2 Architecture

```
Consumer (User / Application / Agent)
            ↓
    ┌────────────────────────────────────────┐
    │        Enterprise AI Platform          │
    │                                        │
    │  ┌──────────┐    ┌──────────────────┐  │
    │  │ Identity │    │  AI Gateway      │  │
    │  │ (Entra)  │───▶│  - Auth          │  │
    │  └──────────┘    │  - Authz         │  │
    │                  │  - Input filter  │  │
    │  ┌──────────┐    │  - Rate limit    │  │
    │  │ Policy   │───▶│  - Model routing │  │
    │  │ Engine   │    │  - Output filter │  │
    │  │ (OPA)    │    │  - Audit logging │  │
    │  └──────────┘    └────────┬─────────┘  │
    │                           ↓            │
    │              ┌────────────────────┐    │
    │              │   Model Registry   │    │
    │              │  (approved models) │    │
    │              └────────┬───────────┘    │
    └───────────────────────┼────────────────┘
                            ↓
              [Claude API / Azure OpenAI / Bedrock /
               Private LLM (vLLM)]
```

### 1.3 Key Controls

- **Authentication:** OIDC/Entra ID; every consumer identified
- **Authorization:** OPA policy; model access controlled by user group and use case
- **Input filtering:** PII detection, injection pattern matching, prompt length limits
- **Output filtering:** Content safety, PII masking, groundedness check
- **Rate limiting:** Per-user and per-application; cost-based circuit breakers
- **Audit logging:** Every request logged with user ID, model, token count, and filtered content
- **Model governance:** Only approved models accessible; model changes require ARB review

---

## 2. Secure RAG Pattern

### 2.1 Pattern Description

Retrieval-Augmented Generation with document-level access control, preventing users from retrieving documents they are not authorized to see.

### 2.2 Architecture

```
User Query
    ↓
AI Gateway (auth + input filter)
    ↓
Query Encoder (embedding model)
    ↓
Vector Store Query
    ↓ (with user identity context)
Access Control Filter
    │  - Check user's document permissions
    │  - Exclude restricted documents from results
    ↓
Filtered Chunks (only authorized content)
    ↓
Context Assembly
    │  - Inject user query + authorized chunks
    │  - Append source attribution
    ↓
LLM (generates grounded response)
    ↓
Output Validator
    │  - Verify response is grounded in retrieved context
    │  - Check for PII or sensitive content not in source docs
    ↓
Response → User (with source citations)
```

### 2.3 Key Controls

- **Document-level ACL:** Each chunk in the vector store tagged with document permissions; filter at retrieval time
- **Source attribution:** Every response includes citation to source documents — enables audit of information provenance
- **Chunk isolation:** Users cannot infer content of restricted chunks from response
- **Embedding access control:** Non-public embedding models require authentication
- **Ingestion control:** Only authorized services can add documents to the RAG store
- **Hallucination check:** Output validator flags responses that are not grounded in retrieved content

---

## 3. Secure MCP Server Pattern

### 3.1 Pattern Description

An MCP server that provides AI agents with authorized access to enterprise tools and resources, without exposing backend credentials to agents.

### 3.2 Architecture

```
AI Agent (MCP Client)
    ↓ (mTLS or OAuth 2.1)
    ↓ presents: agent identity token + task scope
MCP Server
    ├─ Authentication: verify agent identity
    ├─ Authorization: check tool access policy (OPA)
    ├─ Input validation: validate tool parameters
    ├─ Rate limiting: per-agent per-tool
    │
    ↓ (server-side credential — agent never sees it)
Backend Resource
    (Database / API / File System / Cloud Service)
    │
    ↓
MCP Server: validate and sanitize response
    ↓
AI Agent receives: sanitized tool result
```

### 3.3 Key Controls

- **Agent authentication:** mTLS with SPIFFE SVID or OAuth 2.1 bearer token
- **Tool-level authorization:** Per-tool ACL; agents explicitly granted each tool
- **Credential isolation:** Backend credentials held server-side; never transmitted to agent
- **Parameter validation:** JSON Schema validation of tool call parameters
- **Response sanitization:** PII masked; sensitive fields redacted before returning to agent
- **Audit trail:** Agent ID + tool + parameters + response hash logged for every call
- **Rate limiting:** Prevents abuse and runaway agent loops
- **Definition pinning:** Tool schema hashes stored; tampering detected

---

## 4. Secure Agent Runtime Pattern

### 4.1 Pattern Description

A sandboxed execution environment for AI agents that limits blast radius, enforces network egress control, and provides complete audit visibility.

### 4.2 Architecture

```
Agent Orchestrator
    ↓
    ↓ spawns agent with:
    │  - Task specification
    │  - Identity token (managed identity)
    │  - Resource budget (time, cost, API calls)
    ↓
┌──────────────────────────────────────────┐
│  Agent Sandbox (Firecracker MicroVM)     │
│                                          │
│  Agent Runtime (LLM + Tools)            │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ Egress Control                     │  │
│  │ - Allowlist: MCP servers, APIs     │  │
│  │ - Block: public internet (default) │  │
│  └────────────────────────────────────┘  │
│                                          │
│  ┌────────────────────────────────────┐  │
│  │ Resource Monitor                   │  │
│  │ - Cost tracker → circuit breaker   │  │
│  │ - Time limit → auto-terminate      │  │
│  │ - Error rate → alert               │  │
│  └────────────────────────────────────┘  │
│                                          │
│  Audit Log Forwarder (immutable stream)  │
└──────────────────────────────────────────┘
```

### 4.3 Key Controls

- **MicroVM isolation:** Agent cannot escape to host; full kernel isolation
- **Network egress allowlisting:** Only permitted MCP server and API endpoints reachable
- **Filesystem isolation:** Read-only except for /tmp scratch space; no access to host filesystem
- **Resource budgets:** Hard limits on execution time, API tokens, and financial cost
- **Circuit breakers:** Auto-terminate on anomalous behaviour (error rate, unexpected network calls)
- **Immutable audit log:** All agent actions streamed to append-only log store

---

## 5. Secure Multi-Agent Architecture Pattern

### 5.1 Pattern Description

An orchestration pattern for multi-agent systems where inter-agent trust is explicit, message integrity is enforced, and the blast radius of any single agent compromise is limited.

### 5.2 Architecture

```
Human (authorizes task)
    ↓ (OBO delegation)
Orchestrator Agent
    ↓ (signed A2A message + scoped token)
┌─────────────────────────────────────────────┐
│  Agent Pool                                 │
│                                             │
│  Research Agent   Analysis Agent            │
│  (read-only)      (compute-only)            │
│                                             │
│  Writing Agent    Execution Agent           │
│  (write to docs)  (limited API scope)       │
└─────────────────────────────────────────────┘
    ↓ (signed A2A message with result)
Orchestrator Agent (aggregates results)
    ↓ (human review gate if high-impact)
Action / Output
```

### 5.3 Key Controls

- **Signed inter-agent messages:** Each message signed with sender's identity key; receiver verifies
- **Scoped delegation:** Orchestrator issues per-task, per-agent tokens (sub-scope of orchestrator's own authority)
- **Independent authorization:** Each agent authorized independently at resource server; no inherited trust
- **Blast radius isolation:** Agents partitioned by capability — a compromised read-only agent cannot write
- **Human review gate:** Orchestrator waits for human approval before executing high-impact aggregated actions
- **Conversation audit trail:** All inter-agent messages and decisions logged with correlation ID

---

## 6. Enterprise Prompt Gateway Pattern

### 6.1 Pattern Description

A security-as-infrastructure layer that enforces consistent security controls across all enterprise AI interactions.

### 6.2 Architecture

```
Any Consumer
(user / app / agent / CI pipeline)
            ↓
    ┌────────────────────────────────────┐
    │       Enterprise Prompt Gateway    │
    │                                    │
    │  1. AuthN: OIDC token validation   │
    │  2. AuthZ: model access policy     │
    │  3. Rate limit: per identity       │
    │  4. Input classifier:              │
    │     - PII detection → mask         │
    │     - Injection detection → block  │
    │     - Jailbreak pattern → block    │
    │     - Token count check            │
    │  5. Routing: select model/version  │
    │  6. Cost tracking: accumulate      │
    │  7. [Model call]                   │
    │  8. Output classifier:             │
    │     - Content safety check         │
    │     - PII in response → mask       │
    │     - Groundedness check (RAG)     │
    │  9. Audit log: full record         │
    │  10. Response delivery             │
    └────────────────────────────────────┘
            ↓
    ┌────────────────┐
    │  Telemetry     │
    │  - Cost        │
    │  - Latency     │
    │  - Filter hits │
    │  - Alerts      │
    └────────────────┘
```

### 6.3 Implementation Options

| Option | Product | Notes |
| --- | --- | --- |
| **Cloud-native** | Azure API Management + AI extensions | Best for Azure-only; deep Entra integration |
| **API Gateway** | Kong AI Gateway | Multi-cloud; plugin ecosystem; self-hosted or SaaS |
| **Open source** | LiteLLM + custom filters | Flexible; requires engineering to add security controls |
| **Specialized** | Portkey, Helicone | Purpose-built AI gateway; SaaS; less customizable |

---

## 7. Human-in-the-Loop Pattern

### 7.1 Pattern Description

An approval workflow that pauses agent execution before irreversible or high-impact actions, presenting the proposed action to a human for approval.

### 7.2 Architecture

```
Agent proposes action
    ↓
Risk Classifier
    ├─ LOW: proceed automatically
    ├─ MEDIUM: notify + proceed (HOTL)
    └─ HIGH/CRITICAL: block + await approval
                ↓
        Approval Request sent:
        (Slack / Email / ServiceNow ticket)
        - Action description
        - Agent rationale
        - Data affected
        - Risk assessment
        - Approve / Reject / Modify buttons
                ↓
        Human Decision
        ├─ Approved → Agent proceeds
        ├─ Rejected → Agent abandons task + notifies
        └─ Modified → Agent re-plans with constraints
                ↓
        Audit Record:
        - Agent ID + action + risk score
        - Approver identity + timestamp
        - Decision + rationale
```

### 7.3 Risk Classification Examples

| Action | Risk Level | Oversight |
| --- | --- | --- |
| Read a document | LOW | Autonomous |
| Search the web | LOW | Autonomous |
| Send an internal Slack message | MEDIUM | HOTL (notify) |
| Create a calendar event | MEDIUM | HOTL (notify) |
| Send an external email | HIGH | HITL (approve) |
| Delete a file | HIGH | HITL (approve) |
| Execute a database write | HIGH | HITL (approve) |
| Transfer funds | CRITICAL | HOOL (senior approval) |
| Modify production infrastructure | CRITICAL | HOOL (senior approval) |

---

## 8. Secrets Management Pattern

### 8.1 Pattern Description

Centralized secrets management that provides dynamic, short-lived credentials to all consumers — eliminating long-lived secrets from codebases, configs, and containers.

### 8.2 Architecture

```
Workload (Agent / Service / CI Pipeline)
    ↓ (authenticated via managed identity / OIDC)
Secrets Manager (HashiCorp Vault / AWS SM / Azure KV)
    ├─ Authenticate caller
    ├─ Evaluate access policy
    └─ Generate dynamic credential (database, API key, certificate)
            ↓ (short-lived credential — never stored)
Workload uses credential for target resource
            ↓ (credential expires; auto-revoked)
Next request → new credential generated
```

### 8.3 Key Controls

- **Dynamic secrets:** No stored, reusable credentials — new credential per request
- **Automatic revocation:** Credentials expire with calling workload's lifecycle
- **Policy-based access:** Only authorized workloads can request each secret type
- **Audit trail:** Every secret request logged with workload identity and purpose
- **Break-glass procedure:** Emergency credential access with enhanced logging and dual approval

---

## 9. AI Observability Pattern

### 9.1 Pattern Description

Comprehensive observability for AI systems covering requests, costs, latency, content quality, safety events, and agent behaviour.

### 9.2 Metrics to Capture

| Category | Metric | Alert Threshold |
| --- | --- | --- |
| **Performance** | p50/p95/p99 latency | p99 > 5s → alert |
| **Cost** | Tokens/hour; $/hour | > $500/hour → alert |
| **Quality** | Groundedness score (RAG) | < 0.7 → review |
| **Safety** | Content filter hits/hour | > 20/hour → investigate |
| **Security** | Injection detections/hour | > 5/hour → SIEM alert |
| **Agent** | Actions per session; cost per task | Anomalous → circuit breaker |
| **Availability** | Model API error rate | > 5% → failover |

---

## 10. Secure Vector Database Pattern

### 10.1 Key Controls

- **Namespace isolation:** Each tenant's vectors in separate namespace with separate encryption key
- **Access control:** Query API authenticated and authorized per namespace
- **Ingestion validation:** Documents scanned for malicious content before embedding
- **Encryption at rest:** AES-256 with customer-managed keys
- **Audit logging:** Every query logged with requestor identity and returned chunk IDs
- **Backup and recovery:** Vector store backed up; recovery tested quarterly
- **PII prevention:** PII detected and excluded before document ingestion

---

## 11. Data Loss Prevention for AI Pattern

### 11.1 DLP in the AI Interaction Flow

```
User input
    ↓
DLP Scanner:
  - PII detection (Name, SSN, PAN, PHI, etc.)
  - Classification label detection
  - Secret detection (API keys, passwords in input)
    ↓
Policy Decision:
  - ALLOW: no sensitive data detected
  - MASK: replace PII with placeholder before sending to model
  - BLOCK: input contains data that cannot be sent to AI
    ↓
Model (receives clean input)
    ↓
Model output
    ↓
DLP Scanner (output):
  - PII in model response (model hallucinated real PII)
  - Sensitive data from RAG context appearing in output
    ↓
Masked/filtered response → User
```

### 11.2 DLP Policy Examples

| Policy | Trigger | Action |
| --- | --- | --- |
| Block PAN submission | Input contains 16-digit card pattern | Block + alert user |
| Mask SSN in response | Output contains SSN pattern | Mask SSN in response |
| Block SECRET classification | Input labelled SECRET | Block; log; alert CISO |
| Alert on PHI | Input contains PHI indicators | Allow (if BAA in place) + log |
| Block to external model | Org is private-AI-only policy | Block all external LLM calls |
