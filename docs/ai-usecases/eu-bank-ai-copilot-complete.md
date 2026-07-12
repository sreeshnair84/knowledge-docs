---
title: "EU Bank AI Copilot Platform"
date_created: 2026-06-29
last_reviewed: 2026-07-12
status: current
supersedes: "docs/ai-usecases/eu-bank-ai-copilot-research.pdf"
source_type: converted-pdf
source_file: "eu-bank-ai-copilot-complete.pdf"
tags: ["ai-usecases", "copilotkit", "strands-agents", "agentcore"]
doc_type: guide
covers_version: "as of 2026-07-10"
---

# EU Bank AI Copilot Platform

**Classification:** Internal Confidential — April 2026 — Version 1.0
**Stack:** CopilotKit · Strands Agents SDK · AWS AgentCore EU · MCP Streamable-HTTP · AG-UI · Entra ID OIDC/PKCE
**Compliance:** OWASP · DORA · GDPR · EU AI Act
**Tech:** Python 3.13 · TypeScript · Next.js · FastAPI · DynamoDB · Aurora · Bedrock · Redis · Terraform · EKS

---

## Executive Summary

This document presents the complete end-to-end architecture, implementation reference, and security analysis for the EU Bank AI Copilot Platform. The platform enables authorised bank staff to query accounts, initiate payments, assess risk, and perform KYC operations through a conversational AI interface, while maintaining full compliance with GDPR, DORA, EBA ICT Guidelines, and the EU AI Act.

The architecture centres on three pillars: (1) AWS AgentCore Runtime hosting Strands agent workers and MCP tool servers in isolated EU-region containers; (2) a CopilotKit React frontend communicating exclusively through a hardened BFF layer; and (3) a dynamic Tool Registry enabling domain teams to register new capabilities without redeploying the core platform.

> **Critical Design Constraint**
> AgentCore Gateway is not an approved service. All traffic from the BFF to AgentCore Runtime uses private VPC endpoints and SigV4-signed requests only. No direct browser-to-AgentCore communication is permitted under any circumstance.

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
