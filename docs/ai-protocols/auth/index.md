---
title: "Authentication & Identity"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ai-protocols", "auth"]
---

# Authentication & Identity for Agentic AI

> **Current as of July 2026.** Agent authentication requires moving beyond static API keys to cryptographic, per-request identity. This page summarises the key patterns; the PDFs below provide deep-dives on each.

> **See also:** For Kong AI Gateway auth proxy implementation, see [Kong AI Gateway Guide](../../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md). For identity at the UI/application layer, see [Identity & Auth Architecture](../../agentic-ui/identity-auth-architecture.md). For OWASP ASI01–10 security patterns and SPIFFE/SPIRE reference, see [Agentic AI Security & Identity](../../enterprise-architecture/ai-architecture/agentic-ai-security-identity.md).

---

## Why Agent Auth Is Different

A human logs in once and holds a session. An agent may spawn dozens of sub-agents, each making thousands of tool calls across multiple systems over hours. Authentication must answer three questions that static API keys cannot:

1. **Who is this agent?** (not "which application's API key")
2. **Who authorized it?** (trace back to the human who initiated the task)
3. **What is it permitted to do in this specific call?** (least-privilege, not blanket access)

---

## The Agent Authentication Stack (2026)

```
Human (OIDC login)
    │  JWT: {sub:"alice", aud:"orchestrator", scopes:["refund:write"]}
    ▼
Orchestrator Agent  ──── SVID: spiffe://bank/agent/orchestrator
    │  RFC 8693 token exchange → scoped agent token
    │  {act:{sub:"orchestrator"}, scope:"refund:write", max:$500}
    ▼
Sub-Agent / Tool    ──── SVID: spiffe://bank/agent/payment-writer
    │  Validates chain; cannot escalate above granted scope
    ▼
Payment API         ──── confirms Alice authorized this, via this chain
```

---

## Key Patterns

### Three-Legged OAuth (3LO) for Agents

3LO is the standard for agents acting on behalf of a human user:

| Leg | Party | What happens |
|---|---|---|
| 1 | User → Auth Server | User authenticates; grants consent to agent acting on their behalf |
| 2 | Auth Server → Agent | Auth server issues authorization code to agent |
| 3 | Agent → Auth Server | Agent exchanges code for access token + refresh token |

**Enterprise critical detail:** the agent must store the refresh token securely (not in the agent's context window or memory store). Use a secrets manager (Azure Key Vault, AWS Secrets Manager) or the platform's credential store (Bedrock AgentCore, Copilot Studio).

### On-Behalf-Of (OBO) for Service-to-Service

When an orchestrator agent needs to call a backend service on behalf of the user without the user being present, use **OBO flow** (Azure AD / Entra ID):

```
Orchestrator presents user JWT to Entra
  → Entra validates the assertion and issues a new token
  → New token: {sub:"alice", azp:"orchestrator", scp:"credit-api.read"}
  → Backend service validates token; sees the action is on behalf of Alice
```

OBO preserves user identity through the delegation chain — critical for audit and GDPR data-subject rights ("which user's data was this?").

### SPIFFE/SPIRE for Workload Identity

For service-to-service calls where no user is involved (automated pipeline agents, background agents), use **SPIFFE SVIDs** instead of OAuth:

- SPIRE server attests workloads (via k8s node, pod labels, or cloud attestation)
- Issues short-lived X.509 SVIDs (hourly rotation recommended)
- mTLS between all agent-to-tool and agent-to-agent calls
- No static secrets; rotation is automatic

See [Agentic AI Security & Identity](../../enterprise-architecture/ai-architecture/agentic-ai-security-identity.md) §3 for the full SPIFFE/SPIRE deployment pattern.

### MCP OAuth 2.1 (2026 Spec)

MCP's 2026-07-28 stateless spec RC mandates:
- **OAuth 2.1** (not 2.0) — implicit flow removed
- **PKCE** required for all authorization code flows
- **RFC 9207 issuer validation** — prevents token-redirect attacks by requiring the token issuer matches the expected server
- **RFC 8707 resource indicators** — tokens are scoped to specific MCP server URIs; a token for `mcp://crm-server` cannot be used at `mcp://payment-server`

---

## Entra Agent ID (Microsoft, 2026)

Microsoft Entra now supports **Agent ID** — agents as first-class identity objects in Azure AD:

- Agents get their own service principal with explicit permissions
- Administrators can review, approve, and revoke agent identities in the same console as human identities
- Copilot Studio agents and Microsoft Foundry agents are automatically registered
- Supports workload identity federation for non-Microsoft agents

---

## PDFs

<details>
<summary>Entra ID 3LO Agent Auth — Standards &amp; Architecture (Vol. 1)</summary>

→ **[Read the full guide](./entra-3lo-agent-auth-standards-architecture)**

</details>

<details>
<summary>Entra ID 3LO Agent Auth — Implementation Guide (Vol. 2)</summary>

→ **[Read the full guide](./entra-3lo-agent-auth-implementation)**

</details>

<details>
<summary>Entra ID 3LO Agent Auth — Multi-Agent Compliance (Vol. 3)</summary>

→ **[Read the full guide](./entra-3lo-agent-auth-multiagent-compliance)**

</details>

<details>
<summary>Entra ID 3LO Agent Auth — Security Review (Vol. 4)</summary>

→ **[Read the full guide](./entra-3lo-agent-auth-security-review)**

</details>

<details>
<summary>Auth &amp; Identity Flows</summary>
<iframe src="auth_identity_flows.pdf" width="100%" height="800px" frameborder="0"></iframe>
<p><a href="auth_identity_flows.pdf" target="_blank">Open in new tab ↗</a></p>
</details>

<details>
<summary>Tool Authentication &amp; Connectors</summary>

→ **[Read the full guide](./tool-authentication-connectors)**

</details>

<details>
<summary>Part 3 — Identity, OBO &amp; Sessions</summary>
<iframe src="Part3_Identity_OBO_Sessions.pdf" width="100%" height="800px" frameborder="0"></iframe>
<p><a href="Part3_Identity_OBO_Sessions.pdf" target="_blank">Open in new tab ↗</a></p>
</details>
