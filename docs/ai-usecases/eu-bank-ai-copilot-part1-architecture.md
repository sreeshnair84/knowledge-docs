---
title: "EU Bank AI Copilot Platform — Part 1: Architecture & Design Decisions"
date_created: 2026-06-29
last_reviewed: 2026-07-17
status: current
source_type: converted-pdf
source_file: "eu-bank-ai-copilot-complete.pdf"
tags: ["ai-usecases", "copilotkit", "strands-agents", "agentcore"]
doc_type: multi-part-series
covers_version: "as of 2026-07-10"
series_name: "EU Bank AI Copilot Platform"
series_part: 1
series_total: 4
series_index: "ai-usecases/eu-bank-ai-copilot-complete"
---

# EU Bank AI Copilot Platform — Part 1: Architecture & Design Decisions

Part 1 of the *EU Bank AI Copilot Platform* series — see the [series index](./eu-bank-ai-copilot-complete.md) for the full part list and what each part covers.

This part covers the platform's five security zones, the technology stack, the MCP Tools-vs-Apps design decision, where every component physically runs, and the architecture decision records (ADRs) that document why the platform was built this way.

## 1. Platform Overview & Architecture Zones

The platform spans five security zones. Traffic between zones is strictly controlled with mTLS, IAM role validation, and VPC-level network segmentation. Every zone-to-zone call is logged to an immutable audit stream.

| Zone | Runtime | Key Components | Security Boundary |
|------|---------|----------------|-------------------|
| User Device | Browser (React SPA) | @copilotkit/react-core, MSAL.js | No direct calls to AgentCore or MCP |
| BFF | EKS / Lambda (eu-west-1) | @copilotkit/runtime, HttpAgent, OIDC middleware | Session validation, CSRF, rate limit, audit |
| Runtime | AWS Managed (eu-west-1) | Strands agent, ag_ui_strands, MCP client | Bearer auth, session isolation, auto-scaling |
| MCP Servers | AgentCore containers | FastAPI + mcp[server], domain tools | IAM task role per server, VPC-internal only |
| Data / LLM | AWS Managed | Bedrock Claude, DynamoDB, Aurora, S3 | KMS CMK encryption, VPC endpoints, EU region SCP |

**Key Design Principles**

- **Zero Trust:** Every service-to-service call is authenticated with short-lived credentials. No implicit trust based on network location.
- **Regulatory First:** GDPR, DORA, EBA ICT Guidelines, NIS2, and EU AI Act are primary constraints, not afterthoughts.
- **Dynamic Composition:** Domain teams register new MCP tools and CopilotKit UI elements via a Tool Registry without redeploying the core platform.
- **Audit Completeness:** Every agent decision, tool invocation, and data access is immutably logged for supervisory review with 7-year retention (DORA).
- **Data Residency:** All processing, storage, and inference remain within EU AWS regions (eu-west-1 / eu-central-1), enforced by Service Control Policy.
- **Human-in-Loop:** High-risk operations (payments, risk overrides) require explicit human approval through Strands `interrupt_before` flows.


## 2. Technology Stack & Component Map

| Layer | Package / Service | Version | Role |
|-------|-------------------|---------|------|
| Frontend | @copilotkit/react-core + react-ui | ^1.x | CopilotKit provider, chat, useCopilotAction, dynamic tool UI loader |
| Frontend | msal-browser | ^3.x | Entra ID PKCE auth flow in browser |
| BFF | @copilotkit/runtime | ^1.x | CopilotRuntime server SDK — AG-UI handler, MCPAppsMiddleware |
| BFF | @ag-ui/client (HttpAgent) | ^0.x | AG-UI SSE connection from BFF to AgentCore |
| Agent Runtime | strands-agents (Python) | latest | Strands agent framework — tool routing, conversation state |
| Agent Runtime | ag_ui_strands | latest | AG-UI protocol adapter wrapping Strands agent |
| Agent / MCP | mcp[server] + mcp (client) | ^1.x | MCP server SDK (tool servers) and MCP client (inside Strands) |
| LLM | Amazon Bedrock Claude | claude-3-5-sonnet-20241022-v2:0 | Foundation model inference — eu-west-1, no training on data |
| Auth | Microsoft Entra ID | OIDC / OAuth 2.0 | User authentication, MFA, Conditional Access, role claims |
| Data | Amazon DynamoDB | on-demand | Conversation state, approval records, PITR enabled |
| Data | Aurora PostgreSQL | v15 | Tool Registry database, row-level security |
| Data | ElastiCache Redis | 7.x | BFF session store, rate limit counters — encrypted |
| Audit | Amazon Kinesis + S3 | managed | Immutable audit stream, Object Lock WORM, 7-year retention |
| IaC | Terraform + CDK | latest | Infrastructure as code — Checkov + OPA policy gates in CI |


## 3. CopilotKit MCP Tools vs MCP Apps — Design Decision

### 3.1 The Fundamental Difference

CopilotKit exposes two distinct integration patterns for MCP. **MCP Tools** follow the original MCP specification: the agent calls a function, receives JSON/data, and the host application decides how to render it via `useCopilotAction`. **MCP Apps** are a newer extension (January 2026, CopilotKit + community): the MCP server ships its own interactive HTML/JS UI bundle alongside the tool result via a `ui://` resource reference. CopilotKit renders this in a sandboxed iframe, with AG-UI keeping iframe state synchronised with the agent.

| Criterion | MCP Tools | MCP Apps |
|-----------|-----------|----------|
| UI Ownership | Host app (your React code) owns rendering | Domain team ships their own UI bundle |
| Spec Maturity | Stable — original MCP specification | January 2026 — evolving, growing adoption |
| Security Surface | Minimal — no iframes, CSP-friendly | Larger — requires sandbox iframe + SRI enforcement |
| Rendering | Native React via useCopilotAction render() | Sandboxed iframe via MCPAppsMiddleware |
| AG-UI Sync | Tool lifecycle events (start/end) | Full state sync via postMessage + AG-UI |
| Human-in-Loop | interrupt_before works natively | Requires validation across iframe boundary |
| GDPR / PII Risk | Data in controlled codebase | Must NOT pass PII into iframe — opaque refs only |

### 3.2 Recommendation for EU Bank

> **Recommended Strategy: Tiered Hybrid**
> Use MCP Tools as the default for all data retrieval and background orchestration (account queries, risk scores, AML checks, transaction history). Reserve MCP Apps for domain-owned interactive workflows where a team needs full UX autonomy (payment forms, KYC wizards, FX booking). Both share the same Tool Registry and Strands agent session.

### 3.3 Banking Use Case Assignment

| Use Case | Pattern | Rationale |
|----------|---------|-----------|
| Account balance / transaction lookup | MCP Tools | Read-only data, host renders card component |
| Risk score query | MCP Tools | Returns score + tier, agent narrates, simple card |
| AML / sanctions check | MCP Tools | Binary verdict, background orchestration step |
| Payment initiation (SEPA / SWIFT) | MCP Apps | Payment team owns form UX — IBAN validator, amounts, review screen |
| KYC identity check wizard | MCP Apps | Multi-step, compliance team controls the flow |
| FX rate booking | MCP Apps | Live rate ticker, tenor picker — Markets desk domain UI |
| Loan application | Hybrid | MCP Tools for bureau queries + MCP App for application form |


## 4. Server Topology — Where Everything Lives

### 4.1 Package Location Matrix

| Package / Component | Runs On | Server / Container | Key Role |
|---------------------|---------|--------------------|----------|
| @copilotkit/react-core + react-ui | User device | React SPA bundle | UI Provider, CopilotChat, useCopilotAction |
| msal-browser | User device | React SPA bundle | Entra ID PKCE flow, code_verifier generation |
| @copilotkit/runtime | BFF | EKS pod / Lambda function | CopilotRuntime — receives /api/copilotkit POSTs, proxies to AgentCore |
| @ag-ui/client (HttpAgent) | BFF | Inside CopilotRuntime config | SSE connection to AgentCore AG-UI endpoint |
| MCPAppsMiddleware | BFF | Attached to CopilotRuntime | Fetches + SRI-verifies MCP App bundles from CDN |
| strands-agents + ag_ui_strands | AgentCore Runtime | Container :8080 — /invocations + /ws | Agent logic + AG-UI event streaming adapter |
| mcp (Python client) | AgentCore Runtime | Inside Strands agent container | Calls each MCP server over Streamable-HTTP |
| FastAPI + mcp[server] | AgentCore Runtime | Separate containers :8081–8084 | Domain MCP servers — Core Banking, Payment, Risk, KYC |
| Tool Registry API | EKS service | Backed by Aurora PostgreSQL | Dynamic tool discovery — queried by Strands on session start |
| Amazon Bedrock Claude | AWS Managed | eu-west-1 VPC endpoint | Foundation model inference — no training on bank data |

### 4.2 Network Call Matrix

| From | To | Protocol | Authentication |
|------|----|----------|----------------|
| Browser (CopilotChat) | BFF /api/copilotkit | HTTPS POST | __Host-session cookie + X-CSRF-Token header |
| BFF (OIDC middleware) | Entra ID JWKS endpoint | HTTPS GET (cached) | JWT signature validation |
| BFF (CopilotRuntime) | AgentCore :8080/invocations | HTTPS + AG-UI SSE | Cognito Bearer token or SigV4 |
| AgentCore (Strands) | Amazon Bedrock | HTTPS | IAM task role (VPC endpoint) |
| AgentCore (MCP client) | MCP Server :808x/mcp | Streamable-HTTP | IAM task role (internal VPC) |
| MCP Server | Internal Bank API | HTTPS (private link) | mTLS + internal OAuth token |
| BFF (MCPAppsMiddleware) | CDN (assets.bank.eu) | HTTPS GET | SRI hash verification on response |
| Browser (iframe) | Parent CopilotKit | postMessage | event.origin validated: assets.bank.eu only |

### 4.3 MCP Tool Inventory by Domain Server

Each domain MCP server runs in its own AgentCore container (`:8081`–`:8084`) and exposes a fixed tool set over Streamable-HTTP. [Part 3, §2 MCP Servers Code Reference](./eu-bank-ai-copilot-part3-agent-mcp-security.md) gives full code references for Core Banking and Payment Rail; Risk Engine and KYC/AML follow the same `FastAPI + mcp[server]` pattern.

| Server | Port | Exposed Tools | Notes |
|--------|------|----------------|-------|
| Core Banking | `:8081/mcp` | `get_account_balance`, `get_transactions`, `get_account_details` | Read-only, PII stripped before return |
| Payment Rail | `:8082/mcp` | `payment_initiate` (returns `ui://` for MCP App), `payment_status`, `payment_cancel` | Gated by approval token |
| Risk Engine | `:8083/mcp` | `get_risk_score`, `check_exposure`, `get_limit_status` | Returns risk verdicts/scores + codes only, no PII |
| KYC / AML | `:8084/mcp` | `check_sanctions`, `get_kyc_status`, `pep_screen` | Read-only; results immutably logged; never returns raw PII |


## 5. Architecture Decision Records (ADRs)

Key architecture decisions are recorded here for auditability and future reference. Each ADR follows the MADR template: context, decision, consequences, and alternatives considered.

### ADR-001: Use AgentCore Runtime instead of self-managed ECS/EKS for agent workers

**Context:** We needed a managed runtime for Python agent containers with auth, session isolation, and auto-scaling built in. Self-managing these on EKS would require significant platform engineering effort.

**Decision:** Deploy Strands agent containers on AWS AgentCore Runtime with the AG-UI protocol flag. AgentCore handles Cognito OAuth 2.0 inbound auth, session management, scaling, and CloudWatch observability automatically.

**Consequences:**

- ✅ Reduced operational burden — no custom auth or scaling code needed.
- ⚠️ Tied to AWS AgentCore API — migration cost if switching providers.
- ✅ AgentCore GA in March 2026 — mature enough for production banking use.

**Alternatives considered:**

- ❌ Self-managed EKS with custom auth middleware — rejected (high ops cost).
- ❌ AWS Lambda — rejected (cold start latency unacceptable for streaming agents).

### ADR-002: BFF pattern — CopilotRuntime runs in BFF, not in AgentCore

**Context:** We need to enforce Entra ID session validation, CSRF protection, PII scrubbing, and audit logging before any request reaches the agent. AgentCore only supports Cognito OAuth 2.0 inbound auth — insufficient for our Entra ID + session cookie requirements.

**Decision:** Run @copilotkit/runtime in a BFF service (EKS/Lambda) that validates the Entra ID session, enforces CSRF, scrubs PII, enforces rate limits, then proxies to AgentCore via HttpAgent.

**Consequences:**

- ✅ Single enforcement point for all security controls.
- ⚠️ Extra network hop adds ~10-30ms latency.
- ⚠️ BFF becomes a critical path — must be highly available (Multi-AZ).

**Alternatives considered:**

- ❌ Direct CopilotKit-to-AgentCore with Cognito auth — rejected (Entra ID session requirements).
- ❌ AgentCore Gateway — rejected (not approved in this environment).

### ADR-003: Tiered MCP strategy — Tools for data, Apps for interactive UI

**Context:** Some domain teams need to ship their own UI components alongside MCP tools (payment forms, KYC wizards). MCP Tools require the host app to build UI for every tool, creating tight coupling between platform and domain teams.

**Decision:** Use MCP Tools as default for all data retrieval (no iframe surface, CSP-friendly). Use MCP Apps for domain-owned interactive UIs — the team ships their own React bundle, CopilotKit renders it in a sandboxed iframe with SRI enforcement.

**Consequences:**

- ✅ Domain teams can iterate on their UX without platform deploys.
- ⚠️ MCP Apps introduces an iframe sandbox surface — mitigated by SRI + sandbox policy.
- ⚠️ MCP Apps spec is newer (Jan 2026) — spec may evolve; monitored quarterly.

**Alternatives considered:**

- ❌ All tools use MCP Tools — rejected (platform team bottleneck for every UI change).
- ❌ Custom CopilotKit actions for everything — rejected (duplicates MCP pattern).

### ADR-004: Amazon Bedrock Claude (eu-west-1) for LLM inference

**Context:** We need EU data residency for all LLM inference. No customer data may leave the EU. The no-training-on-data guarantee must be contractually assured.

**Decision:** Use Amazon Bedrock with Claude claude-3-5-sonnet-20241022-v2:0 in eu-west-1. Bedrock contractually guarantees no use of customer data for model training. Bedrock Guardrails enforce PII detection, prompt injection resistance, and topic blocks.

**Consequences:**

- ✅ EU data residency guaranteed — satisfies GDPR Art. 25 and DORA Art. 9.
- ⚠️ Tied to Anthropic model releases via Bedrock — model upgrade cadence managed by AWS.
- ⚠️ Bedrock Guardrails may block legitimate use cases — requires tuning.

**Alternatives considered:**

- ❌ Azure OpenAI (EU region) — considered; Bedrock chosen for AWS ecosystem alignment.
- ❌ Self-hosted open-source model — rejected (data sovereignty harder to prove contractually).

### ADR-005: DynamoDB for conversation state, Aurora for Tool Registry

**Context:** Two different access patterns: conversation state requires high-throughput, low-latency key-value access per session; Tool Registry requires relational queries with joins, role-based filtering, and audit triggers.

**Decision:** DynamoDB (on-demand, PITR enabled) for conversation state and approval records. Aurora PostgreSQL (Multi-AZ, encrypted) for Tool Registry with row-level security.

**Consequences:**

- ✅ Appropriate data model for each access pattern.
- ⚠️ Two databases to manage — operational complexity is low given both are AWS managed.
- ⚠️ Aurora cold start on first query — mitigated by connection pooling (PgBouncer).

**Alternatives considered:**

- ❌ PostgreSQL for everything — rejected (DynamoDB better for high-throughput session state).
- ❌ DynamoDB for everything — rejected (complex relational queries on Tool Registry require SQL).
