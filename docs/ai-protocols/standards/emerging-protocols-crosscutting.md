---
title: "Section 3 — Cross-Cutting Architecture: Security, Governance, Compliance & Observability"
subtitle: "Emerging AI Agent Protocols Beyond MCP & A2A — Enterprise Architecture, Standards, Security, and Adoption (2026)"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
source_type: native-md
doc_type: research-guide
source_file: ""
edition: "July 2026"
tags: ["ai-protocols", "security", "governance", "compliance", "observability", "zero-trust", "acp", "anp", "ag-ui", "a2ui", "ucp", "ap2", "nlip", "lmos", "utcp"]
covers_version: "as of 2026-07-11"
audience: ["Enterprise Architects", "AI Platform Architects", "CTOs", "Principal Engineers"]
---

# Section 3 — Cross-Cutting Architecture

## Security, Governance, Compliance, Networking, Messaging, and Observability Across All 9 Emerging Protocols

> **Publication:** Emerging AI Agent Protocols Beyond MCP & A2A — Enterprise Architecture, Standards, Security, and Adoption (2026)
> **Edition:** July 2026 | Audience: Enterprise Architects, AI Platform Architects, CTOs, Principal Engineers
> **Protocols covered:** ACP (merged → A2A), ANP, AG-UI, A2UI, UCP, AP2, NLIP, LMOS, UTCP

---

## Protocol Reference Map

Before diving into cross-cutting concerns, a quick reference of the 9 protocols evaluated throughout this section:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    EMERGING PROTOCOL LANDSCAPE — JULY 2026                  │
├────────────┬───────────────────────────────┬──────────────┬─────────────────┤
│ Protocol   │ Full Name                     │ Origin       │ Status          │
├────────────┼───────────────────────────────┼──────────────┼─────────────────┤
│ ACP        │ Agent Communication Protocol  │ IBM BeeAI /  │ MERGED into A2A │
│            │                               │ Linux Fdn    │ Aug 2025        │
├────────────┼───────────────────────────────┼──────────────┼─────────────────┤
│ ANP        │ Agent Network Protocol        │ Open Source  │ EMERGING        │
│            │                               │ Jul 2025     │ Peer-to-peer    │
├────────────┼───────────────────────────────┼──────────────┼─────────────────┤
│ AG-UI      │ Agent-User Interaction Proto. │ CopilotKit   │ GROWING         │
│            │                               │ 2025         │ SSE streaming   │
├────────────┼───────────────────────────────┼──────────────┼─────────────────┤
│ A2UI       │ Agent-to-User Interface Proto.│ Google ADK   │ EARLY v0.9      │
│            │                               │ 2025         │ Declarative UI  │
├────────────┼───────────────────────────────┼──────────────┼─────────────────┤
│ UCP        │ Universal Commerce Protocol   │ Google / NRF │ NEW — coalition │
│            │                               │ Jan 2026     │ major partners  │
├────────────┼───────────────────────────────┼──────────────┼─────────────────┤
│ AP2        │ Agent Payments Protocol       │ Google 2025  │ EARLY v0.1      │
│            │                               │              │ audit trail     │
├────────────┼───────────────────────────────┼──────────────┼─────────────────┤
│ NLIP       │ Natural Language Interop.     │ Ecma TC56    │ NICHE           │
│            │                               │ 2025         │ ECMA-430–434    │
├────────────┼───────────────────────────────┼──────────────┼─────────────────┤
│ LMOS       │ LM Operating System Protocol  │ Eclipse Fdn  │ NICHE — IoA     │
│            │                               │ 2025         │ vision          │
├────────────┼───────────────────────────────┼──────────────┼─────────────────┤
│ UTCP       │ Universal Tool Calling Proto. │ Community    │ COMPETING       │
│            │                               │ 2025         │ with MCP        │
└────────────┴───────────────────────────────┴──────────────┴─────────────────┘
```

> **Note on ACP:** IBM's Agent Communication Protocol merged into A2A in August 2025 under Linux Foundation governance. Where ACP design choices survive as A2A features, they are noted. ACP's REST-native message envelope and BeeAI's Python SDK influenced A2A's task state machine and artifact model.

---

## 3.1 Security Architecture Comparison

### 3.1.1 Threat Model Overview

All 9 protocols operate within the same broad threat surface: an untrusted network, AI agents that may be manipulated through prompt injection, tool servers that may be compromised, and downstream actions (financial transactions, UI rendering, data exfiltration) that carry real-world consequences.

The threat categories that apply across the stack:

```
┌─────────────────────────────────────────────────────────────────┐
│                 SHARED AI AGENT THREAT CATEGORIES               │
├─────────────────────────┬───────────────────────────────────────┤
│ T1 — Identity Spoofing  │ Fake agent cards, DID squatting,      │
│                         │ OAuth client impersonation            │
├─────────────────────────┼───────────────────────────────────────┤
│ T2 — Prompt Injection   │ Malicious payloads via tool results,  │
│                         │ NL messages, UI components            │
├─────────────────────────┼───────────────────────────────────────┤
│ T3 — Privilege Escalation│ Token over-scoping, ABAC bypass,     │
│                         │ cross-agent scope leakage             │
├─────────────────────────┼───────────────────────────────────────┤
│ T4 — Replay Attacks     │ Stale JWT/SSE events, unsigned        │
│                         │ payment requests replayed             │
├─────────────────────────┼───────────────────────────────────────┤
│ T5 — Data Exfiltration  │ Tool result forwarding, payload       │
│                         │ compression oracles, SSE log leakage  │
├─────────────────────────┼───────────────────────────────────────┤
│ T6 — Supply Chain       │ Malicious MCP/UTCP servers, tampered  │
│                         │ agent registries, DID document hijack │
├─────────────────────────┼───────────────────────────────────────┤
│ T7 — Denial of Service  │ Long-poll floods, SSE connection      │
│                         │ exhaustion, DHT poisoning             │
├─────────────────────────┼───────────────────────────────────────┤
│ T8 — Rogue Commerce     │ Unauthorized purchases (UCP), payment │
│                         │ mandate bypass (AP2)                  │
└─────────────────────────┴───────────────────────────────────────┘
```

### 3.1.2 Security Architecture Comparison Matrix

| Dimension | ACP (→A2A legacy) | ANP | AG-UI | A2UI | UCP | AP2 | NLIP | LMOS | UTCP |
|---|---|---|---|---|---|---|---|---|---|
| **Auth Model** | OAuth 2.1 (declared in Agent Card) | DID-based + DIDComm encrypted channel | Bearer token (delegated from host) | OAuth 2.0 / API Key (Google ADK) | OAuth 2.1 + merchant API keys | OAuth 2.1 + PaymentMandate signing | Bearer / session token (undefined) | OAuth 2.1 + SPIFFE (proposed) | API Key / Bearer (spec draft) |
| **Mutual Auth** | Server-side only (A2A RC); mTLS optional | DID-to-DID: both sides cryptographically verified | None specified; relies on TLS | One-way TLS to Google ADK endpoint | Merchant mTLS optional; buyer OAuth | Mandate: cryptographic sender + receiver verification | Not specified | mTLS + SPIFFE SVID (proposed) | Not specified |
| **Encryption** | TLS 1.3 (transport) | DIDComm: end-to-end encryption at message level | TLS 1.3 | TLS 1.3 | TLS 1.3 | TLS 1.3 + message-level signing | TLS 1.3 (assumed) | TLS 1.3 + mTLS | TLS 1.3 (assumed) |
| **Message Signing** | Not mandated | Ed25519 / secp256k1 via DID key | Not specified | Not specified | Optional per merchant | Mandatory: PaymentMandate cryptographically signed | Not specified | Proposed via W3C VC | Not specified |
| **Replay Protection** | JWT `jti` + `exp` (OAuth tokens) | DIDComm `created_time` + `expires_time` | SSE stream IDs (best-effort) | State nonce per session | Order idempotency key | Mandate `nonce` + timestamp + TTL | Not specified | Proposed token binding | Not specified |
| **Identity Model** | OAuth 2.1 client + subject claim | W3C DID (did:web, did:key, did:peer) | Inherited from host app session | Google identity / ADK service account | Merchant ID + buyer OAuth principal | Principal hierarchy: Shopping Agent + Merchant + Credentials Provider | Session principal (NL-based) | DID + SPIFFE + X.509 | API Key principal |
| **Zero Trust Compat.** | Partial (OAuth scopes, no continuous verification) | Strong (cryptographic identity per message) | Weak (trusts host app session) | Partial (Google IAM boundary) | Partial (merchant boundary enforcement) | Strong (cryptographic mandate per transaction) | Weak (no formal model) | Strong (proposed continuous verification) | Weak |
| **Supply Chain Security** | Agent Card signing (proposed in A2A RC) | DID document integrity (W3C spec) | npm/pip package trust (community) | Google ADK provenance | NRF registry + merchant certification | Google-signed mandate schema | Ecma spec only | Eclipse artifact signing | npm package trust |
| **Primary Threat** | T1: Agent card spoofing | T6: DID document hijack | T2: Injected SSE events to frontend | T2: Malicious UI component injection | T8: Unauthorized cart/order | T8: Mandate bypass / replayed transactions | T2: NL injection through messages | T1: Identity spoofing in IoA mesh | T6: Malicious tool server |

### 3.1.3 Narrative Assessment

**Strongest security posture (July 2026):** ANP and AP2 lead the field. ANP's DID-based architecture provides cryptographic identity at the message level — every message is signed by a verifiable DID key, enabling true peer-to-peer trust without a central broker. AP2's PaymentMandate model enforces cryptographic proof of intent before any financial transaction, with configurable guardrails and an immutable audit trail — the strongest design for high-stakes autonomous actions.

**Adequate for enterprise with hardening:** ACP/A2A (via A2A v1.0), UCP, and LMOS (when fully implemented) are enterprise-deployable with appropriate gateway hardening, token scope reduction, and audit logging. They rely on OAuth 2.1, which is a well-understood enterprise standard.

**Requires significant hardening before production:** AG-UI, A2UI, NLIP, and UTCP lack formal security models in their current specifications. AG-UI's SSE stream is trusted by the frontend application without message-level authentication — a significant risk when AI agents stream tool calls and state updates to browser clients. UTCP inherits MCP's security surface (prompt injection via tool results) without MCP's 2026 security hardening work.

:::warning Security Gap
Neither AG-UI nor UTCP define mandatory authentication or message integrity controls in their current specifications. Enterprises deploying these protocols must implement transport-level controls (mTLS gateway, WAF rules) and message validation at the application layer. Do not deploy AG-UI endpoints directly to browsers without a backend-for-frontend (BFF) proxy that validates origin and sanitizes SSE events.
:::

---

## 3.2 Identity and Trust

### 3.2.1 Identity Model Taxonomy

The 9 protocols span four distinct identity paradigms:

```
┌──────────────────────────────────────────────────────────────┐
│              IDENTITY PARADIGM MAP                           │
│                                                              │
│  CENTRALIZED IDENTITY (OAuth/OIDC IdP)                       │
│  ├── ACP/A2A: OAuth 2.1 client credentials + subject claim  │
│  ├── A2UI:    Google ADK service account / OIDC              │
│  ├── UCP:     OAuth 2.1 buyer identity + merchant API key    │
│  └── AP2:     Principal hierarchy (Shopping/Merchant/Wallet) │
│                                                              │
│  DECENTRALIZED IDENTITY (W3C DID)                            │
│  ├── ANP:     did:web / did:key / did:peer per agent         │
│  └── LMOS:    DID + SPIFFE SVID (hybrid proposed)            │
│                                                              │
│  SESSION/AMBIENT IDENTITY (host app context)                 │
│  ├── AG-UI:   Inherits frontend session (browser/app)        │
│  ├── NLIP:    Natural language session principal             │
│  └── UTCP:    API key / inherited from invoking agent        │
│                                                              │
│  WORKLOAD IDENTITY (infrastructure-bound)                    │
│  └── LMOS:    SPIFFE SVID + X.509 workload cert (proposed)  │
└──────────────────────────────────────────────────────────────┘
```

### 3.2.2 Trust Establishment Comparison

| Protocol | Trust Model | Trust Establishment Mechanism | Trust Federation | Reputation/Scoring |
|---|---|---|---|---|
| **ACP→A2A** | OAuth 2.1 delegated trust | Agent Card at `/.well-known/agent-card.json`; OAuth client registration | Via shared IdP (Entra ID, Okta, etc.) | None specified |
| **ANP** | Cryptographic peer trust | DID document resolution + key verification; meta-protocol handshake | Via DID method (did:web → DNS; did:ion → Bitcoin) | Emerging: verifiable claims on DID doc |
| **AG-UI** | Ambient session trust | Host app session (cookie / bearer token propagation) | Via host app's IdP | None |
| **A2UI** | Google IAM trust | ADK service account + project-level IAM binding | Google Workspace federation | None |
| **UCP** | Merchant certification trust | NRF registry membership + OAuth 2.1 client credential | Via NRF coalition governance | Merchant rating (proposed) |
| **AP2** | Cryptographic mandate trust | PaymentMandate signed by all principals; IntentMandate scope binding | Via AP2 mandate chain | Transaction history (immutable ledger) |
| **NLIP** | Standards body implied trust | Ecma International membership / spec compliance | Undefined | None |
| **LMOS** | IoA mesh trust | DID + SPIFFE + certificate authority chain | Eclipse IoA registry (proposed) | Agent reputation registry (proposed) |
| **UTCP** | API key trust | Shared secret / bearer token | Via gateway proxy | None |

### 3.2.3 Decentralized Identifiers (DIDs) — ANP and LMOS

ANP's use of W3C DIDs (spec: https://www.w3.org/TR/did-core/) is the most architecturally significant identity innovation among the 9 protocols. A DID is a URI that resolves to a DID Document containing public keys, service endpoints, and verification methods — without requiring any central registry.

```
ANP DID-Based Agent Identity Flow:

  Agent A (did:web:enterprise.com:agents:billing)
     │
     │  1. Publishes DID Document at
     │     https://enterprise.com/.well-known/did.json
     │     (contains: Ed25519 public key, service endpoint, capabilities)
     │
     ▼
  Agent B resolves DID Document
     │
     │  2. Verifies DID Document signature
     │  3. Extracts public key for Agent A
     │  4. Initiates DIDComm Encrypted Envelope:
     │     {
     │       "type": "application/didcomm-encrypted+json",
     │       "ciphertext": "<AES-256-GCM encrypted payload>",
     │       "recipients": [{"header": {"kid": "did:web:...#key-1"}}]
     │     }
     ▼
  End-to-end encrypted, mutually authenticated channel
  — no central broker, no shared IdP required
```

**Enterprise implication:** ANP's DID model is the only protocol among the 9 that enables true cross-organizational agent trust without a shared IdP. For multi-cloud, multi-partner deployments, this is architecturally superior. The barrier is operational: DID document management, key rotation, and revocation require new operational tooling that most enterprise identity teams do not currently have.

### 3.2.4 SPIFFE Workload Identity — LMOS

LMOS's proposed SPIFFE (Secure Production Identity Framework for Everyone — https://spiffe.io) integration represents the most cloud-native identity model:

- Each LMOS agent receives a SPIFFE Verifiable Identity Document (SVID) — an X.509 certificate with a SPIFFE URI in the SAN field (e.g., `spiffe://enterprise.com/agent/procurement`)
- SVIDs are rotated automatically (short-lived: 1–24 hours) by a SPIFFE-compatible workload identity platform (SPIRE, Istio, HashiCorp Vault, AWS ROSA)
- No long-lived API keys or static credentials
- mTLS between agents is automatic when both sides present SVIDs

:::tip SPIFFE for Enterprise
For enterprises already running Istio or Linkerd service mesh, LMOS's SPIFFE model maps directly onto existing workload identity infrastructure. SPIFFE SVIDs eliminate the credential rotation problem that plagues API key-based protocols (UTCP, AG-UI). If your organisation is evaluating LMOS, prioritize SPIRE integration in your proof-of-concept.
:::

### 3.2.5 Verifiable Credentials (VCs)

W3C Verifiable Credentials (https://www.w3.org/TR/vc-data-model-2.0/) — cryptographically signed attestations about an entity — are referenced in ANP and LMOS specifications but not yet mandated. Their most natural enterprise use cases across the protocol stack:

| Use Case | Protocol(s) | VC Type |
|---|---|---|
| Agent capability attestation | ANP, LMOS | CapabilityCredential (custom type) |
| Merchant compliance certification | UCP | ComplianceCredential (NRF schema) |
| Payment mandate authorization | AP2 | PaymentAuthorizationCredential |
| Human identity delegation to agent | A2A, ACP | DelegationCredential (RFC 8693 analog) |
| Regulatory compliance evidence | LMOS | ComplianceEvidenceCredential |

---

## 3.3 Authentication Patterns

### 3.3.1 Authentication Method Matrix

| Auth Method | ACP/A2A | ANP | AG-UI | A2UI | UCP | AP2 | NLIP | LMOS | UTCP |
|---|---|---|---|---|---|---|---|---|---|
| **OAuth 2.1 Auth Code + PKCE** | ✓ Primary | — | Optional | Optional | ✓ (buyer) | ✓ (buyer) | — | Proposed | — |
| **OAuth 2.1 Client Credentials** | ✓ Primary | — | — | ✓ ADK SA | ✓ (merchant) | ✓ (merchant) | — | ✓ Proposed | — |
| **OIDC (ID Token)** | ✓ Agent Card declared | — | Optional | ✓ Google OIDC | Optional | Optional | — | Proposed | — |
| **mTLS (client cert)** | Optional (RC) | Optional (DID) | — | — | Optional | Proposed | — | ✓ Proposed | — |
| **DID Authentication** | — | ✓ Primary | — | — | — | — | — | ✓ Proposed | — |
| **DIDComm (encrypted msg)** | — | ✓ Primary | — | — | — | — | — | Proposed | — |
| **JWT Bearer (RFC 7523)** | ✓ (service-to-svc) | — | ✓ (delegated) | ✓ | ✓ | ✓ | — | ✓ | Optional |
| **PASETO** | — | — | — | — | — | — | — | — | — |
| **API Key** | Fallback | — | Fallback | Fallback | ✓ (merchant) | — | Fallback | — | ✓ Primary |
| **Hardware-backed Identity** | — | ✓ (HSM key in DID) | — | — | — | Proposed (HSM mandate signing) | — | ✓ (TPM SVID) | — |
| **Workload Identity (SPIFFE)** | — | — | — | — | — | — | — | ✓ Proposed | — |
| **Managed Identity (cloud)** | ✓ (via Entra/AWS) | — | ✓ (via host) | ✓ (GCP) | ✓ (GCP/AWS) | ✓ (GCP) | — | ✓ | — |

**Legend:** ✓ = supported/specified, Proposed = in spec roadmap, Optional = not mandated, — = not applicable

### 3.3.2 OAuth 2.1 Flow Patterns by Protocol

**ACP/A2A — Agent Card Declared Auth:**
```
Client Agent                    A2A Server Agent
     │                               │
     │  GET /.well-known/agent-card.json
     │ ─────────────────────────────►│
     │  ← {auth: {type: "oauth2", url: "https://idp..."}}
     │                               │
     │  POST /oauth/token (client_credentials)
     │ ─────────────── IdP ─────────►│
     │  ← access_token (scoped)      │
     │                               │
     │  POST /tasks {Authorization: Bearer <token>}
     │ ─────────────────────────────►│
```

**AP2 — Mandate-Chained Auth:**
```
Shopping Agent   Credentials Provider   Payment Processor
     │                   │                    │
     │  1. Create PaymentMandate              │
     │     {amount_limit, merchant_allow_list,│
     │      nonce, expiry, signed_by: agent}  │
     │                   │                    │
     │  2. Present Mandate for signing        │
     │ ──────────────────►                    │
     │  ← Countersigned PaymentMandate        │
     │                   │                    │
     │  3. Authorize transaction              │
     │ ───────────────────────────────────── ►│
     │     {mandate: <signed>, amount: X}     │
     │                   ◄────────────────────│
     │     PaymentReceipt (immutable)         │
```

### 3.3.3 Protocol-Specific Authentication Weaknesses

| Protocol | Weakness | Mitigation |
|---|---|---|
| **AG-UI** | No defined auth for SSE stream events — frontend trusts all events from the connected stream | Enforce origin pinning + CORS; implement BFF proxy with token validation |
| **A2UI** | ADK service account may have broad GCP project permissions | Principle of least privilege: create dedicated SA per UI agent; restrict to specific ADK APIs |
| **NLIP** | No authentication model specified; relies on transport-level session | Implement mandatory API gateway authentication before NLIP endpoints |
| **UTCP** | API keys in plaintext headers without rotation policy | Use short-lived tokens via OAuth 2.0 client credentials instead; enforce key rotation via secrets manager |
| **LMOS** | SPIFFE integration is proposed, not implemented — current deployments fall back to API keys | Do not deploy LMOS in production without explicit workload identity enforcement |

---

## 3.4 Authorization Models

### 3.4.1 Authorization Framework Matrix

| Protocol | Primary AuthZ Model | Policy Language | Enforcement Point | Policy Distribution |
|---|---|---|---|---|
| **ACP→A2A** | RBAC + scope-based (OAuth) | OAuth scopes + custom role claims | Token validation at A2A server | IdP + Agent Card declared scopes |
| **ANP** | Capability-based (DID) | DID Document capability section | DID key verification at message receipt | DID Document (on-chain or DNS-hosted) |
| **AG-UI** | Ambient (inherits host session) | Host application RBAC | Host application middleware | Centralized IdP |
| **A2UI** | Google IAM (ABAC) | IAM policy (resource + principal + condition) | Google IAM at ADK layer | GCP IAM console / Terraform |
| **UCP** | RBAC + merchant certification | NRF protocol schema + merchant tier | UCP gateway / NRF registry | NRF coalition governance |
| **AP2** | PBAC (mandate-scoped) | PaymentMandate + IntentMandate JSON schema | Mandate validator in Payment Processor | Mandate chain (per-transaction) |
| **NLIP** | Session-based (undefined) | Natural language intent (no formal policy) | Application layer | Not specified |
| **LMOS** | ABAC + ReBAC (proposed) | OPA (Open Policy Agent) Rego (proposed) | LMOS sidecar proxy | OPA bundle distribution |
| **UTCP** | API key scope (rudimentary) | Tool definition schema (allowed tool list) | Tool server validation | Static configuration |

### 3.4.2 Policy Model Deep Dives

**OPA (Open Policy Agent) — LMOS Proposed:**

LMOS's proposed use of OPA (https://www.openpolicyagent.org/) is the most sophisticated authorization model among the 9 protocols. Rego policies can encode complex ABAC and ReBAC rules:

```rego
# LMOS agent authorization policy example
package lmos.agent.authz

import future.keywords.if
import future.keywords.in

# Allow agent-to-agent tool call if:
# 1. Caller has a valid SPIFFE SVID
# 2. Caller's service name is in the allow-list for the target tool
# 3. Data classification of tool output <= caller's clearance level

default allow := false

allow if {
    input.identity.type == "spiffe"
    input.identity.spiffe_uri in data.tool_access_rules[input.tool.name].allowed_callers
    data.classification_level[input.tool.data_class] <= data.clearance[input.identity.spiffe_uri]
}
```

**AP2 PaymentMandate — PBAC in Practice:**

AP2 implements Policy-Based Access Control at the transaction layer — not through a traditional policy engine, but through cryptographically enforced mandate documents:

```json
{
  "type": "PaymentMandate",
  "version": "0.1",
  "nonce": "uuid-v4",
  "issued_at": "2026-07-11T10:00:00Z",
  "expires_at": "2026-07-11T10:05:00Z",
  "principal": {
    "shopping_agent": "did:web:enterprise.com:agents:procurement",
    "on_behalf_of": "user:alice@enterprise.com"
  },
  "spending_controls": {
    "max_amount": {"value": 5000, "currency": "USD"},
    "merchant_allow_list": ["amazon.com", "staples.com"],
    "category_block_list": ["gambling", "adult"],
    "require_human_approval_above": 1000
  },
  "signatures": {
    "agent": "<ed25519-sig>",
    "credentials_provider": "<ed25519-sig>"
  }
}
```

**Cedar (AWS) and OpenFGA — Cross-Protocol Applicability:**

Cedar (https://cedarpolicy.com) and OpenFGA (https://openfga.dev) are not referenced in any of the 9 protocol specifications, but both are strong candidates for enterprise authorization overlays:

| Framework | Best Fit Protocols | Rationale |
|---|---|---|
| **Cedar** | UCP, AP2, A2A | Cedar's attribute-based model maps well to commerce/payment agent permissions; formally verified policy language; AWS native |
| **OpenFGA** | LMOS, ANP, A2A | ReBAC model (who has relation X to object Y) maps well to multi-agent delegation chains and IoA mesh |
| **OPA** | LMOS, UTCP, AG-UI | Flexible Rego policies work for any protocol; already in wide enterprise use; strong CNCF ecosystem integration |

### 3.4.3 Policy Lifecycle Across Protocols

```
                    POLICY LIFECYCLE FOR MULTI-PROTOCOL ENTERPRISE DEPLOYMENT
┌────────────────────────────────────────────────────────────────────────────┐
│                                                                            │
│  AUTHOR         VALIDATE         DISTRIBUTE          ENFORCE               │
│                                                                            │
│  Rego/Cedar  →  OPA/Cedar     → Bundle server    →  Sidecar proxy         │
│  IAM Policy     unit tests       (periodic pull       (per LMOS agent,    │
│  AP2 Mandate    schema check      or push trigger)     per UCP gateway)    │
│                                                                            │
│  VERSION CONTROL: Git-tracked policy-as-code                               │
│  AUDIT: Every policy evaluation logged with input, output, policy version  │
│  ROLLBACK: Immutable policy versions; canary evaluation in shadow mode     │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## 3.5 Networking Architecture

### 3.5.1 Network Topology by Protocol

| Protocol | Topology | Discovery Mechanism | Routing | NAT/Firewall Compatibility |
|---|---|---|---|---|
| **ACP→A2A** | Client-server (HTTP) | DNS + `/.well-known/agent-card.json` | Direct HTTP to declared endpoint | Excellent: standard HTTPS port 443 |
| **ANP** | Peer-to-peer | DID resolution (DNS for did:web; DHT for did:ion) | Direct peer connection after DID resolution | Moderate: DHT requires UDP; did:web works over HTTPS |
| **AG-UI** | Client-server (SSE) | Configured frontend endpoint | HTTP SSE from backend to frontend | Excellent: SSE over HTTPS port 443 |
| **A2UI** | Client-server (ADK) | Google ADK service registry | ADK → GCP routing | Excellent: GCP endpoints on 443 |
| **UCP** | Client-server + federation | NRF merchant registry + DNS | Protocol gateway → merchant REST | Excellent: REST over HTTPS |
| **AP2** | Client-server (mandate chain) | Principal lookup via credential provider | Mandate chain: agent → provider → processor | Excellent: HTTPS throughout |
| **NLIP** | Client-server | Application-level registration | Application layer | Excellent: standard HTTPS |
| **LMOS** | Federated mesh | IoA agent registry + DNS-SD | LMOS routing fabric | Moderate: requires sidecar proxy ports |
| **UTCP** | Client-server | Tool catalog (static or dynamic) | Direct HTTP to tool server | Excellent: HTTPS port 443 |

### 3.5.2 ANP Peer-to-Peer Architecture Deep Dive

ANP's peer-to-peer model is architecturally distinct from all other protocols in this survey:

```
ANP NETWORK ARCHITECTURE

  ┌─────────────────────────────────────────────────────────────┐
  │                   ANP LAYER MODEL                           │
  │                                                             │
  │  LAYER 3: APPLICATION PROTOCOL                              │
  │  ┌─────────────────────────────────────────┐                │
  │  │ Capability registration, discovery, APIs │                │
  │  │ Custom schemas per capability type       │                │
  │  └─────────────────────────────────────────┘                │
  │                        ▲                                    │
  │  LAYER 2: META-PROTOCOL                                     │
  │  ┌─────────────────────────────────────────┐                │
  │  │ Protocol negotiation at runtime          │                │
  │  │ Agents agree on which app protocol to   │                │
  │  │ use BEFORE exchanging data              │                │
  │  └─────────────────────────────────────────┘                │
  │                        ▲                                    │
  │  LAYER 1: IDENTITY & ENCRYPTED COMMS                        │
  │  ┌─────────────────────────────────────────┐                │
  │  │ W3C DID-based identity                  │                │
  │  │ DIDComm end-to-end encrypted messages   │                │
  │  │ No central broker required              │                │
  │  └─────────────────────────────────────────┘                │
  └─────────────────────────────────────────────────────────────┘

  DID Resolution for did:web (enterprise-friendly):
  did:web:company.com:agents:invoicing
      → HTTPS GET https://company.com/.well-known/did/agents/invoicing
      → DID Document with public keys and service endpoints
      → Direct connection to agent endpoint

  DID Resolution for did:ion (decentralized):
  did:ion:EiAnKD8...
      → Bitcoin-anchored ION node lookup (Sidetree protocol)
      → DID Document resolved from DHT
      → Direct P2P connection
```

**Enterprise NAT/Firewall Considerations for ANP:**

- `did:web` DIDs resolve over standard HTTPS (port 443) — enterprise-friendly
- `did:ion` / `did:peer` DIDs may require UDP port access for DHT lookups — firewall exception required
- DIDComm messaging can be relayed over HTTPS mediator servers to handle NAT traversal
- Air-gapped environments: `did:web` can be configured against an internal DNS namespace

### 3.5.3 LMOS Internet of Agents Networking

LMOS envisions a three-layer networking stack for the "Internet of Agents":

```
LMOS NETWORKING LAYERS

  Internet of Agents (IoA)
  ┌────────────────────────────────────────────────────────────┐
  │ APPLICATION LAYER                                          │
  │   Agent capability APIs, semantic routing,                 │
  │   capability-aware load balancing                          │
  ├────────────────────────────────────────────────────────────┤
  │ TRANSPORT LAYER                                            │
  │   HTTPS / WebSockets / gRPC                                │
  │   LMOS routing fabric (capability-based forwarding)        │
  ├────────────────────────────────────────────────────────────┤
  │ IDENTITY & SECURITY LAYER                                  │
  │   SPIFFE SVIDs, mTLS, DID (proposed)                       │
  │   Continuous verification (Zero Trust)                     │
  └────────────────────────────────────────────────────────────┘

  Current reality (July 2026): Eclipse ecosystem only;
  not yet interoperable with A2A or ANP meshes.
```

### 3.5.4 Enterprise Networking Decision Framework

```
Decision: Which protocol is deployable in my enterprise network?

START
  │
  ├─ Air-gapped / no external connectivity?
  │    ├─ YES → ACP/A2A (internal IdP), UTCP, AG-UI, A2UI (internal GCP)
  │    └─ NO  → continue
  │
  ├─ UDP blocked / strict firewall?
  │    ├─ YES → Exclude did:ion ANP; use did:web ANP or ACP/A2A
  │    └─ NO  → All protocols viable
  │
  ├─ Service mesh deployed (Istio/Linkerd)?
  │    ├─ YES → LMOS (SPIFFE integration), ACP/A2A with mTLS sidecar
  │    └─ NO  → ACP/A2A (OAuth), UCP/AP2 (Google-hosted)
  │
  ├─ Google Cloud primary?
  │    └─ YES → A2UI, UCP, AP2 (native GCP deployment)
  │
  └─ Multi-cloud / vendor-neutral?
       └─ YES → ACP/A2A (Linux Foundation), ANP (open source)
```

---

## 3.6 Messaging Patterns

### 3.6.1 Messaging Pattern Matrix

| Protocol | Primary Pattern | Transport | Streaming | Bidirectional | Durability | Message Ordering |
|---|---|---|---|---|---|---|
| **ACP→A2A** | Request-Response + async Task | HTTP/1.1 + HTTP/2 | SSE (task status) | No (client initiates) | Task state machine (persistent) | Guaranteed within task |
| **ANP** | Encrypted P2P message | DIDComm over HTTPS | Optional | DIDComm bidirectional | Optional relay storage | Per-message sequence numbers |
| **AG-UI** | Streaming (server push) | SSE (primary) + WebSocket (optional) | Core feature | SSE: server→client only; WS: both | Not specified | SSE event ID ordering |
| **A2UI** | Request-Response | HTTP/REST | Polling or webhook | No | ADK session persistence | Request-response correlation |
| **UCP** | Request-Response | REST/HTTP | No | No | Order idempotency | Per-order sequence |
| **AP2** | Request-Response + mandate chain | HTTP/REST | No | No (mandate is atomic) | Immutable receipt | Mandate chain ordering |
| **NLIP** | Request-Response (NL) | HTTP/REST (assumed) | Optional NL stream | No | Session state | Session-scoped |
| **LMOS** | Request-Response + pub/sub | HTTP/gRPC/WebSocket | gRPC streaming | gRPC bidirectional | Proposed: message queue integration | gRPC sequence |
| **UTCP** | Request-Response | HTTP/REST | No | No | Not specified | Not specified |

### 3.6.2 AG-UI Streaming Architecture

AG-UI is the only protocol in this survey purpose-built for real-time streaming from backend agent to frontend application. Its SSE-based architecture deserves detailed treatment:

```
AG-UI STREAMING EVENT FLOW

  Backend AI Agent                    Frontend Application
       │                                      │
       │  1. User sends message to frontend   │
       │ ◄────────────────────────────────────│
       │                                      │
       │  2. Agent begins processing          │
       │     (LLM inference + tool calls)     │
       │                                      │
       │  3. SSE stream opens                 │
       │ ─────────────────────────────────── ►│
       │                                      │
       │  EVENT: run_started                  │
       │ ─────────────────────────────────── ►│ (show spinner)
       │                                      │
       │  EVENT: tool_call_start              │
       │ ─────────────────────────────────── ►│ (show tool activity)
       │  EVENT: tool_call_delta (chunks)     │
       │ ─────────────────────────────────── ►│ (stream tool args)
       │  EVENT: tool_call_end                │
       │ ─────────────────────────────────── ►│
       │                                      │
       │  EVENT: text_message_start           │
       │ ─────────────────────────────────── ►│
       │  EVENT: text_message_delta (tokens)  │
       │ ─────────────────────────────────── ►│ (stream response text)
       │  EVENT: text_message_end             │
       │ ─────────────────────────────────── ►│
       │                                      │
       │  EVENT: state_delta (JSON Patch)     │
       │ ─────────────────────────────────── ►│ (update shared state)
       │                                      │
       │  EVENT: run_finished                 │
       │ ─────────────────────────────────── ►│ (hide spinner)
       │                                      │
  SSE Connection closes (or stays open for next run)
```

**AG-UI Event Catalog (core events):**

| Event Type | Direction | Purpose |
|---|---|---|
| `run_started` | Agent → Frontend | Signals start of agent run |
| `run_finished` | Agent → Frontend | Signals completion |
| `run_error` | Agent → Frontend | Error with details |
| `text_message_start/delta/end` | Agent → Frontend | Streaming LLM text output |
| `tool_call_start/delta/end` | Agent → Frontend | Tool invocation visibility |
| `state_delta` | Agent → Frontend | JSON Patch to shared agent state |
| `messages_snapshot` | Agent → Frontend | Full message history sync |
| `custom` | Agent → Frontend | Protocol extension point |
| `human_turn_started` | Frontend → Agent | Human interrupt / clarification |

### 3.6.3 A2A Task Lifecycle — Messaging State Machine

ACP's REST-native message envelope design (before merger) influenced A2A's task state machine, which is now the most complete async messaging model among the 9 protocols:

```
A2A TASK STATE MACHINE

         POST /tasks
              │
              ▼
         [submitted]
              │
              ▼ (agent accepts)
         [working] ────────────────────────────── SSE status stream
              │                                   to calling agent
              ├─ needs clarification ──► [input-required]
              │                              │
              │◄─────────────────────────────┘ (user provides input)
              │
              ├─ success ───────────────────► [completed]
              │                               (artifact returned)
              │
              ├─ error ─────────────────────► [failed]
              │                               (error detail returned)
              │
              └─ caller cancels ────────────► [cancelled]
```

### 3.6.4 Retry Semantics and Durability

| Protocol | Retry Semantics | Timeout Behavior | Durability Model |
|---|---|---|---|
| **A2A** | Client retries task submission; idempotency via task ID | Task TTL declared in Agent Card | Persistent: task state survives agent restart |
| **ANP** | DIDComm retry via mediator; message expiry in envelope | `expires_time` in DIDComm header | Optional: mediator relay stores until delivery |
| **AG-UI** | SSE auto-reconnect (EventSource spec); `Last-Event-ID` header for resume | Connection timeout: SSE keepalive | Not durable: reconnect replays from last event ID |
| **UCP** | Idempotency key per order operation | HTTP timeout per merchant SLA | Order state persisted at UCP gateway |
| **AP2** | Mandate is atomic; retry with same nonce is rejected | Mandate expiry (short TTL: 5 min recommended) | Immutable: PaymentReceipt permanently stored |
| **UTCP** | HTTP retry with exponential backoff | Caller-defined timeout | Not specified |
| **LMOS** | Proposed: at-least-once with deduplication | Per-agent configurable | Proposed: message queue (Kafka/NATS) |

---

## 3.7 Payload Design

### 3.7.1 Serialization and Schema Matrix

| Protocol | Primary Serialization | Schema Format | Binary Support | Compression | Max Payload | Schema Evolution |
|---|---|---|---|---|---|---|
| **ACP→A2A** | JSON (JSON-RPC 2.0) | JSON Schema (declared in Agent Card) | Base64 in JSON artifacts | gzip (HTTP) | Practical: ~10MB (HTTP body) | Additive; version in spec |
| **ANP** | JSON-LD + DIDComm | JSON-LD context + DID Document schema | DIDComm attachments | gzip | Not specified | JSON-LD context versioning |
| **AG-UI** | JSON (SSE events) | TypeScript types (reference impl) | Base64 in event payload | HTTP gzip | Per-event: ~1MB practical | Additive event types; `custom` extension |
| **A2UI** | JSON (declarative component tree) | 18 component primitive schema | Image URLs (not inline) | HTTP gzip | Component tree: ~500KB practical | Versioned component spec (v0.9) |
| **UCP** | JSON (REST) | OpenAPI 3.x (NRF defined) | Not applicable | HTTP gzip | Order payload: ~1MB | Semantic versioning; additive fields |
| **AP2** | JSON | JSON Schema (mandate + receipt) | Not applicable | HTTP gzip | Mandate: ~10KB | Mandate version field |
| **NLIP** | JSON / natural language text | Ecma-defined (ECMA-430–434, published Dec 2025) | Not specified | Not specified | Not specified | Ecma standards process |
| **LMOS** | JSON + gRPC/Protobuf (proposed) | Protobuf IDL + JSON Schema | Protobuf bytes | gzip + Brotli | Per-capability | Protobuf field numbering |
| **UTCP** | JSON | Tool definition schema | Base64 | HTTP gzip | Tool-defined | Schema version in tool descriptor |

### 3.7.2 A2UI Declarative Component Model

A2UI's payload design is unique: rather than streaming text, the agent returns a declarative JSON component tree that the frontend renders:

```json
{
  "version": "0.9",
  "layout": {
    "type": "column",
    "children": [
      {
        "type": "text",
        "content": "Purchase Order Summary",
        "style": "heading"
      },
      {
        "type": "row",
        "children": [
          {"type": "label", "text": "Vendor"},
          {"type": "text", "content": "Acme Corp", "style": "body"}
        ]
      },
      {
        "type": "button",
        "label": "Approve",
        "action": {
          "type": "submit",
          "payload": {"decision": "approved", "po_id": "PO-2026-001"}
        }
      }
    ]
  }
}
```

The 18 safe primitives are: `text`, `label`, `button`, `row`, `column`, `card`, `list`, `list_item`, `divider`, `image`, `link`, `input`, `select`, `checkbox`, `radio`, `date_picker`, `progress`, `badge`.

:::warning A2UI Security
A2UI's component model deliberately excludes `script`, `iframe`, `style`, and arbitrary HTML to prevent XSS attacks. Any A2UI implementation that allows arbitrary HTML rendering in the component tree violates the protocol's safety model. Validate all component types against the allowlist before rendering — do not trust agent-generated JSON blindly.
:::

### 3.7.3 Chunking and Streaming Payload Patterns

**AG-UI Text Streaming (token-by-token):**
```
data: {"type": "text_message_start", "message_id": "msg-001", "role": "assistant"}

data: {"type": "text_message_delta", "message_id": "msg-001", "delta": {"content": "The"}}
data: {"type": "text_message_delta", "message_id": "msg-001", "delta": {"content": " vendor"}}
data: {"type": "text_message_delta", "message_id": "msg-001", "delta": {"content": " invoice"}}
...
data: {"type": "text_message_end", "message_id": "msg-001"}
```

**LMOS gRPC Streaming (proposed):**
```protobuf
service AgentService {
  rpc ExecuteCapability(CapabilityRequest) 
    returns (stream CapabilityResponse);
  
  rpc StreamingCapability(stream CapabilityRequest)
    returns (stream CapabilityResponse);
}

message CapabilityResponse {
  string agent_id = 1;
  bytes payload = 2;
  ResponseMetadata metadata = 3;
  bool is_final = 4;
}
```

---

## 3.8 Versioning and Compatibility

### 3.8.1 Versioning Strategy Matrix

| Protocol | Protocol Versioning | API Versioning | Backward Compat Guarantee | Breaking Change Policy |
|---|---|---|---|---|
| **ACP→A2A** | Spec version in metadata; `specVersion` field | URL path versioning (`/v1/tasks`) | Yes: A2A v1.0 commits to stable core | Breaking changes require new major version + deprecation period |
| **ANP** | DID Document version + spec changelog | N/A (P2P negotiated) | Limited: community-governed | Meta-protocol handles version negotiation at runtime |
| **AG-UI** | Package version (semver) | Event type versioning (custom extension) | Limited: community spec | Additive events preferred; breaking = major version |
| **A2UI** | Explicit `version` field in payload (current: 0.9) | Not applicable | No (pre-1.0) | Pre-1.0: any change possible |
| **UCP** | OpenAPI semantic versioning | URL path (`/v1/`) | Yes (NRF commitment) | Coalition governance change control |
| **AP2** | `version` field in mandate schema | Not applicable | Limited (v0.1) | Pre-1.0: schema changes with notice |
| **NLIP** | Ecma version (standards body slow-burn) | Not applicable | Yes (Ecma process) | Ecma TC process: multi-year |
| **LMOS** | Eclipse release train | gRPC service version | Proposed (Eclipse governance) | Eclipse EMO change control |
| **UTCP** | Package semver | Tool schema version | Limited (community) | Community-governed |

### 3.8.2 Rolling Upgrade Strategies

**A2A Multi-Version Support:**
```
Enterprise A2A Deployment — Rolling Upgrade

  API Gateway / Load Balancer
        │
        ├─ Route /v1/* → A2A v1.0 agents (current)
        │
        └─ Route /v2/* → A2A v2.0 agents (new)
                         (Blue/Green deployment)

  Agent Cards declare supported versions:
  {
    "protocolVersion": "1.0",
    "supportedVersions": ["0.9", "1.0"]
  }

  Client agents check Agent Card before task submission:
  → If both versions supported: use latest
  → If only v1.0: use v1.0 client library
```

**ANP Meta-Protocol Version Negotiation:**
```
Agent A                         Agent B
   │                               │
   │  Hello: {
   │    "supported_protocols": [
   │      "anp/1.0", "anp/0.9"
   │    ]
   │  }
   │ ─────────────────────────── ►│
   │                               │
   │  ◄── NegotiationResult: {
   │        "selected_protocol": "anp/1.0"
   │      }
   │
   Proceed with agreed protocol version
```

### 3.8.3 Schema Evolution Guidance

For protocols using JSON Schema (A2A, UCP, AP2):

```
SAFE SCHEMA CHANGES (backward-compatible):
  ✓ Add optional field with default value
  ✓ Widen type of existing field (string → string | null)
  ✓ Add new enum value (if consumers use unknown-value handler)
  ✓ Add new optional array element type

BREAKING SCHEMA CHANGES (require version bump):
  ✗ Remove or rename existing field
  ✗ Narrow type of existing field
  ✗ Change semantic meaning of existing field
  ✗ Make optional field required
  ✗ Remove enum value
```

---

## 3.9 Failure Handling

### 3.9.1 Failure Handling Matrix

| Protocol | Timeout Strategy | Retry Semantics | Circuit Breaker | Graceful Degradation | Offline Behavior |
|---|---|---|---|---|---|
| **A2A** | Task TTL in Agent Card; client polls until terminal state | Idempotent task submission (task ID) | Not specified; recommend gateway-level | Return cached task results; partial artifact delivery | Task state persists; can resume on reconnect |
| **ANP** | DIDComm `expires_time` per message | Mediator retry; exponential backoff | Not specified | Skip unavailable peers; retry via alternate DID service endpoint | Messages queued at mediator for offline peers |
| **AG-UI** | SSE keepalive interval; reconnect on drop | EventSource auto-reconnect; `Last-Event-ID` resume | Not specified | Show last known state; disable streaming features | Full degradation: falls back to polling or static state |
| **A2UI** | HTTP request timeout (ADK SLA) | HTTP retry with exponential backoff | ADK retry policy | Show error placeholder component | Cannot function offline (Google ADK dependency) |
| **UCP** | Per-merchant SLA timeout | Idempotency key retry | UCP gateway circuit breaker | Skip unavailable merchants; return partial catalog | Cannot function offline (catalog lookup required) |
| **AP2** | Mandate expiry (hard stop; no retry after expiry) | New mandate required for retry | Not applicable (atomic) | Fail closed: no payment if mandate expired | Cannot function offline |
| **NLIP** | Session timeout | Application-level retry | Not specified | Not specified | Not specified |
| **LMOS** | gRPC deadline propagation | gRPC retry policy (per RPC) | Proposed: resilience4j integration | Agent capability fallback (less capable agent) | Agent registry cache (TTL-based) |
| **UTCP** | Caller-defined timeout | HTTP retry | Not specified | Skip tool; return error to agent | Not specified |

### 3.9.2 Distributed Failure Patterns

**A2A Long-Running Task Failure Recovery:**

```
Failure scenario: Agent B crashes during a multi-hour task

  Agent A (caller)          A2A Gateway          Agent B
       │                        │                    │
       │  POST /tasks           │                    │
       │ ───────────────────── ►│  ──────────────── ►│
       │                        │     [working]      │
       │                        │                    │ ← CRASH
       │                        │
       │  GET /tasks/{id}        │
       │ ───────────────────── ►│
       │  ← {status: "working"} │ (gateway has persistent state)
       │                        │
       │  [Gateway detects agent B offline via health check]
       │                        │
       │  [Gateway routes to Agent B replica or fails task]
       │                        │
       │  GET /tasks/{id}        │
       │ ───────────────────── ►│
       │  ← {status: "failed",   │
       │     error: "agent_unavailable"}
       │
  Caller decides: retry, escalate, or degrade
```

**AP2 Failure — Mandate Expiry:**

AP2's hard mandate expiry is intentional and cannot be worked around — it is a security feature, not a limitation. If a payment fails because the mandate expired:

1. Shopping agent must request a new mandate from the Credentials Provider
2. Human approval may be required above the `require_human_approval_above` threshold
3. The expired mandate's nonce is burned — no replay possible
4. A new `PaymentReceipt` will be created for the successful retry

**ANP Peer Failure — DID Unavailability:**

```
if DID document resolution fails:
  → Check DID document cache (TTL-based, e.g., 1 hour)
  → If cached and not expired: use cached document
  → If expired: mark peer as temporarily unavailable
  → Log failure with DID, timestamp, resolution error
  → Retry after backoff interval (1m, 5m, 15m)
  → After 3 failures: mark peer as unreachable; alert operator
```

### 3.9.3 Cross-Protocol Conflict Resolution

In multi-protocol enterprise deployments, conflicts arise when protocols disagree:

| Conflict Type | Example | Resolution |
|---|---|---|
| **State divergence** | A2A task shows `completed` but AG-UI frontend still shows `working` | A2A task state is authoritative; AG-UI frontend should poll A2A task endpoint on SSE reconnect |
| **Payment mandate race** | Two agents attempt to use same AP2 mandate | Mandate `nonce` is single-use; second attempt rejected; Shopping Agent must serialize |
| **DID document stale** | ANP peer updated their DID document; old cached document used | TTL-based cache eviction; force refresh on authentication failure |
| **UCP / AP2 cart conflict** | UCP cart locked by one agent; AP2 mandate issued by another | Implement distributed lock at UCP cart level; AP2 mandate references specific cart ID |

---

## 3.10 Observability

### 3.10.1 Observability Coverage Matrix

| Protocol | Distributed Tracing | Metrics | Structured Logging | OpenTelemetry | Audit Trail | SIEM Integration |
|---|---|---|---|---|---|---|
| **A2A** | Task ID as correlation; A2A v1.0 recommends W3C Trace Context | Task state transition metrics | Task lifecycle JSON logs | Recommended (not mandated) | Task state history (immutable) | Export task events to SIEM |
| **ANP** | DIDComm message ID + thread ID | Connection metrics (proposed) | Message envelope + peer logs | Not specified | DID document access log | Limited: requires custom adapter |
| **AG-UI** | SSE event ID chaining | Stream event counts, latency | Event stream logs | Not specified | Event stream (ephemeral) | Forward SSE events to log aggregator |
| **A2UI** | ADK trace ID (GCP Cloud Trace) | GCP metrics (request latency, errors) | GCP Cloud Logging | Via GCP OpenTelemetry export | ADK audit log (GCP) | GCP → Chronicle / Splunk export |
| **UCP** | Order ID as correlation | Order success/failure rates, latency | Order lifecycle events | Not specified | Order audit trail (NRF requirement) | Order events → SIEM |
| **AP2** | Mandate ID + receipt ID | Transaction counts, mandate approval rates | Mandate lifecycle + receipt log | Not specified | Immutable PaymentReceipt (required) | Receipt events → SIEM (PCI requirement) |
| **NLIP** | Session ID | Not specified | Session logs | Not specified | Session transcript | Not specified |
| **LMOS** | W3C Trace Context (proposed) | Prometheus metrics (proposed) | Structured JSON (proposed) | Proposed: OTel SDK | Agent capability invocation log | Proposed: OTel → SIEM |
| **UTCP** | Caller-provided correlation ID | Tool call counts, latency | Tool invocation logs | Via caller instrumentation | Not specified | Via caller agent |

### 3.10.2 OpenTelemetry Integration Architecture

For enterprises instrumenting a multi-protocol agent stack, OpenTelemetry (https://opentelemetry.io) provides the unified observability layer:

```
OPENTELEMETRY INTEGRATION FOR MULTI-PROTOCOL AGENT STACK

  Agent A                 Protocol Gateway / Sidecar        Observability Backend
  (A2A client)                                              (Jaeger / Tempo / Datadog)
       │                           │                               │
       │  Span: "a2a.task.submit"  │                               │
       │  TraceID: abc123          │                               │
       │ ─────────────────────────►│                               │
       │                           │  Forward W3C traceparent      │
       │                           │  header to Agent B            │
       │                           │ ─────────────────────────────►│
       │                           │                               │
       │                    Span: "a2a.task.execute" (child)       │
       │                    TraceID: abc123                        │
       │                    Exported to OTel Collector ───────────►│
       │                                                           │
       │                    Span: "ag-ui.stream.event" (child)     │
       │                    (AG-UI SSE event correlated by         │
       │                     x-correlation-id header)  ───────────►│

OTel Semantic Conventions for AI Agents (contrib):
  gen_ai.system           = "a2a" | "ag-ui" | "anp" | ...
  gen_ai.request.model    = "claude-3-5-sonnet" (if applicable)
  gen_ai.agent.id         = "did:web:enterprise.com:agents:billing"
  gen_ai.task.id          = "task-uuid"
  gen_ai.task.status      = "submitted" | "working" | "completed" | "failed"
  gen_ai.protocol.version = "1.0"
```

### 3.10.3 Audit Trail Requirements by Protocol

| Protocol | Audit Requirement | Minimum Retention | Regulatory Driver |
|---|---|---|---|
| **A2A** | Task create/update/complete events with principal | 90 days (enterprise policy) | SOC 2, ISO 27001 |
| **ANP** | Peer connection events; DID resolution logs | 30 days | ISO 27001 |
| **AG-UI** | Stream session open/close; human interrupt events | 30 days | SOC 2 |
| **A2UI** | Component render events; button action submissions | 90 days | SOC 2 |
| **UCP** | Full order lifecycle: browse → cart → checkout → confirm | 7 years | PCI DSS, consumer protection law |
| **AP2** | PaymentMandate creation + all signatures + PaymentReceipt | 7 years | PCI DSS, SOX, GDPR |
| **NLIP** | Session transcript (NL messages) | 30 days | GDPR (right to explanation) |
| **LMOS** | Agent capability invocations; capability delegation events | 90 days | SOC 2, EU AI Act |
| **UTCP** | Tool invocation log: tool name, args (redacted), result code | 90 days | SOC 2, OWASP LLM |

### 3.10.4 SIEM Integration Patterns

```
MULTI-PROTOCOL SIEM ARCHITECTURE

  Protocol Events
  ┌─────────────────────────────────────────────────────────────┐
  │  A2A task events    ──┐                                     │
  │  ANP peer events    ──┤                                     │
  │  AG-UI stream events──┤ → OTel Collector → Kafka Topic     │
  │  UCP order events   ──┤    (normalization)   "ai-agent-events"
  │  AP2 receipt events ──┘                           │        │
  └───────────────────────────────────────────────────┼────────┘
                                                      │
                                            SIEM (Splunk / Sentinel / Chronicle)
                                                      │
                                            ┌─────────┴──────────┐
                                            │ Detection Rules:    │
                                            │ - Unusual mandate   │
                                            │   amount (AP2)      │
                                            │ - Peer connection   │
                                            │   to unknown DID    │
                                            │   (ANP)             │
                                            │ - SSE flood (AG-UI) │
                                            │ - Failed task rate  │
                                            │   spike (A2A)       │
                                            │ - Tool call to      │
                                            │   blocked domain    │
                                            │   (UTCP)            │
                                            └────────────────────┘
```

---

## 3.11 Compliance Matrix

### 3.11.1 Framework Reference Map

This section evaluates all 9 protocols against 12 compliance frameworks and standards. The evaluation reflects the state of each protocol's specification as of July 2026.

**Readiness Scale:**
- `STRONG` — Protocol specification explicitly addresses this framework's requirements
- `PARTIAL` — Some requirements are addressed; gaps require enterprise overlay controls
- `WEAK` — Framework requirements are not addressed in the protocol spec; significant implementation work required
- `N/A` — Framework is not applicable to this protocol's use case
- `[PCI]` — Special PCI DSS focus (AP2 and UCP)

### 3.11.2 OWASP Top 10 for LLM Applications

(Reference: https://owasp.org/www-project-top-10-for-large-language-model-applications/)

| OWASP LLM Risk | ACP/A2A | ANP | AG-UI | A2UI | UCP | AP2 | NLIP | LMOS | UTCP |
|---|---|---|---|---|---|---|---|---|---|
| **LLM01: Prompt Injection** | PARTIAL | PARTIAL | WEAK | PARTIAL | PARTIAL | STRONG* | WEAK | PARTIAL | WEAK |
| **LLM02: Insecure Output Handling** | PARTIAL | PARTIAL | WEAK | STRONG* | PARTIAL | PARTIAL | WEAK | PARTIAL | WEAK |
| **LLM03: Training Data Poisoning** | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| **LLM04: Model DoS** | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | WEAK | PARTIAL | WEAK |
| **LLM05: Supply Chain** | PARTIAL | STRONG | WEAK | PARTIAL | PARTIAL | PARTIAL | WEAK | PARTIAL | WEAK |
| **LLM06: Sensitive Information** | PARTIAL | STRONG | WEAK | PARTIAL | PARTIAL | STRONG | WEAK | PARTIAL | WEAK |
| **LLM07: Insecure Plugin Design** | PARTIAL | N/A | WEAK | WEAK | N/A | N/A | WEAK | PARTIAL | WEAK |
| **LLM08: Excessive Agency** | PARTIAL | PARTIAL | WEAK | WEAK | PARTIAL | STRONG* | WEAK | PARTIAL | WEAK |
| **LLM09: Overreliance** | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |
| **LLM10: Model Theft** | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A | N/A |

*AP2 STRONG for LLM01 (Prompt Injection) — PaymentMandate pre-commits agent to specific transaction scope before any LLM inference, preventing post-inference injection from changing financial intent. A2UI STRONG for LLM02 — Safe component primitive allowlist prevents malicious output rendering.

### 3.11.3 NIST AI Risk Management Framework

(Reference: https://www.nist.gov/system/files/documents/2023/01/26/AI_RMF_1.0.pdf)

| NIST AI RMF Function | ACP/A2A | ANP | AG-UI | A2UI | UCP | AP2 | NLIP | LMOS | UTCP |
|---|---|---|---|---|---|---|---|---|---|
| **GOVERN** (policies, roles, accountability) | PARTIAL | WEAK | WEAK | PARTIAL | PARTIAL | PARTIAL | WEAK | PARTIAL | WEAK |
| **MAP** (risk identification, categorization) | PARTIAL | WEAK | WEAK | PARTIAL | PARTIAL | STRONG | WEAK | PARTIAL | WEAK |
| **MEASURE** (risk analysis, metrics) | PARTIAL | WEAK | WEAK | PARTIAL | PARTIAL | STRONG | WEAK | PARTIAL | WEAK |
| **MANAGE** (risk treatment, response) | PARTIAL | PARTIAL | WEAK | PARTIAL | PARTIAL | STRONG | WEAK | PARTIAL | WEAK |

*No protocol in this survey achieves STRONG across all four NIST AI RMF functions. AP2 scores highest due to its explicit risk management through the mandate/guardrail model. Enterprise overlay governance is required for all protocols.*

### 3.11.4 Full Compliance Readiness Matrix

| Compliance Framework | ACP/A2A | ANP | AG-UI | A2UI | UCP | AP2 | NLIP | LMOS | UTCP |
|---|---|---|---|---|---|---|---|---|---|
| **OWASP LLM Top 10** | PARTIAL | PARTIAL | WEAK | PARTIAL | PARTIAL | STRONG | WEAK | PARTIAL | WEAK |
| **NIST AI RMF** | PARTIAL | WEAK | WEAK | PARTIAL | PARTIAL | STRONG | WEAK | PARTIAL | WEAK |
| **CSA AI Controls Matrix** | PARTIAL | PARTIAL | WEAK | PARTIAL | PARTIAL | PARTIAL | WEAK | PARTIAL | WEAK |
| **OpenSSF Supply Chain** | PARTIAL | STRONG | WEAK | PARTIAL | PARTIAL | PARTIAL | WEAK | PARTIAL | WEAK |
| **CNCF Cloud-Native** | PARTIAL | PARTIAL | WEAK | PARTIAL | PARTIAL | PARTIAL | WEAK | STRONG | WEAK |
| **ISO/IEC 27001** | PARTIAL | PARTIAL | WEAK | PARTIAL | PARTIAL | STRONG | WEAK | PARTIAL | WEAK |
| **ISO/IEC 42001 (AI MGMT)** | PARTIAL | WEAK | WEAK | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | WEAK |
| **SOC 2 Type II** | PARTIAL | PARTIAL | WEAK | PARTIAL | PARTIAL | STRONG | WEAK | PARTIAL | WEAK |
| **PCI DSS v4.0** | N/A | N/A | N/A | N/A | PARTIAL | STRONG | N/A | N/A | N/A |
| **HIPAA** | PARTIAL | PARTIAL | WEAK | PARTIAL | N/A | N/A | WEAK | PARTIAL | WEAK |
| **GDPR** | PARTIAL | PARTIAL | WEAK | PARTIAL | PARTIAL | STRONG | PARTIAL | PARTIAL | WEAK |
| **DORA (EU)** | PARTIAL | WEAK | WEAK | PARTIAL | PARTIAL | PARTIAL | WEAK | PARTIAL | WEAK |
| **EU AI Act** | PARTIAL | WEAK | WEAK | PARTIAL | PARTIAL | STRONG | WEAK | PARTIAL | WEAK |

### 3.11.5 Framework-Specific Notes

**PCI DSS v4.0 — UCP and AP2 (Critical)**

UCP and AP2 are the only protocols in this survey that touch financial transaction data. PCI DSS v4.0 requirements apply to both:

| PCI DSS Requirement | UCP Relevance | AP2 Relevance |
|---|---|---|
| Req 1-2: Network Security | Cart/order data in transit; isolate UCP segment | Mandate chain over TLS; isolate AP2 endpoints |
| Req 3: Data Protection | Cardholder data must not appear in UCP order payload (tokenize) | Payment credentials in Credentials Provider only; not in mandate JSON |
| Req 6: Secure Development | NRF merchant certification process addresses this | AP2 mandate schema validation; Google security review |
| Req 7-8: Access Control | Merchant OAuth scopes; buyer identity | Mandate principal hierarchy enforces least privilege |
| Req 10: Logging | Order audit trail (7-year retention) | Immutable PaymentReceipt (7-year retention) |
| Req 12: Security Policy | NRF coalition governance | AP2 mandate governance |

:::warning PCI DSS Scoping
Any system that processes, stores, or transmits cardholder data via UCP or AP2 is in PCI DSS scope. If UCP order payloads or AP2 mandate signing infrastructure touch cardholder data, engage a Qualified Security Assessor (QSA) before production deployment. Tokenize all payment credentials — they must never appear in UCP catalog queries, cart JSON, or AP2 mandate documents.
:::

**GDPR — Cross-Protocol**

| GDPR Principle | Protocol Impact | Enterprise Control Required |
|---|---|---|
| Data Minimization | NLIP NL transcripts may contain PII; AG-UI streams may log PII | Implement PII scrubbing at OTel collector |
| Purpose Limitation | A2A task artifacts may contain personal data beyond original purpose | Scope task artifacts; implement data flow documentation |
| Right to Erasure | AP2 PaymentReceipt is immutable — tension with right to erasure | Pseudonymize personal data in receipts; store raw PII in erasable store |
| Data Portability | UCP order history; A2A task history | Implement data export API for end-user requests |
| Lawful Basis | ANP peer-to-peer connections may transfer personal data across borders | Document lawful basis per data flow; use SCCs for cross-border ANP connections |

**EU AI Act — Cross-Protocol**

The EU AI Act (effective August 2026 for prohibited AI) classifies AI systems by risk level. Protocol-layer implications:

| Risk Class | Protocol Usage Scenario | AI Act Obligation |
|---|---|---|
| **Prohibited** | Social scoring via NLIP (NL agent tracking behavior) | Must not implement |
| **High Risk** | AP2 autonomous payment decisions; UCP autonomous procurement above thresholds | Conformity assessment; human oversight; logging requirement |
| **Limited Risk** | AG-UI chatbot interactions (transparency obligation) | Disclose AI nature to users |
| **Minimal Risk** | A2A agent delegation for internal workflows | No specific obligation |

:::tip EU AI Act Implementation
For AP2 deployments: the `require_human_approval_above` field in the IntentMandate is the mechanism to implement the EU AI Act's human oversight requirement for high-risk autonomous financial decisions. Set this threshold to match your regulatory classification. Document this in your AI system technical documentation per Article 11.
:::

**DORA (EU Digital Operational Resilience Act)**

DORA (effective January 2025) applies to financial entities in the EU using ICT services. For enterprises using UCP and AP2 in financial contexts:

| DORA Pillar | AP2/UCP Requirement |
|---|---|
| ICT Risk Management | AP2 mandate expiry and circuit breaker patterns are DORA-aligned; document RTO/RPO for payment flows |
| Incident Reporting | Payment processing failures via AP2 must be reported within DORA timelines (major incidents: 4h initial, 72h intermediate) |
| Digital Operational Resilience Testing | Conduct TLPT (Threat-Led Penetration Testing) on AP2 mandate chain and UCP gateway annually |
| Third-Party Risk | Google as AP2/UCP provider is a "critical ICT third-party provider" under DORA — register with competent authority |
| Information Sharing | Share AP2 payment fraud intelligence via DORA information-sharing arrangements |

**ISO/IEC 42001 Mapping**

| ISO 42001 Clause | Protocol Relevance | Enterprise Action |
|---|---|---|
| 6.1: AI Risk Assessment | All protocols: identify risks per 3.1 threat model | Document AI risk register per protocol |
| 6.2: AI System Impact Assessment | High-impact protocols: AP2, UCP, A2UI | Complete AIIA for all high-impact deployments |
| 8.4: AI System Documentation | All protocols: document architecture decisions | Include protocol selection rationale in AI system docs |
| 9.1: Monitoring & Measurement | All protocols: observability from §3.10 | Map OTel metrics to ISO 42001 performance indicators |
| 10.1: Nonconformity | Protocol failure patterns from §3.9 | Implement CAR (Corrective Action Request) for protocol failures |

---

## 3.12 Governance Operating Model

### 3.12.1 Protocol Governance Landscape

Understanding who governs each protocol is as critical as understanding the protocol's technical design. Governance determines: how bugs are fixed, who controls breaking changes, how security vulnerabilities are disclosed, and how long the protocol will survive.

```
PROTOCOL GOVERNANCE MAP — JULY 2026

  LINUX FOUNDATION (AAIF — Agentic AI Foundation)
  ├── A2A (incl. merged ACP) — GA, stable, 150+ orgs
  └── MCP — RC (stable July 28 2026)
  
  GOOGLE-LED (ecosystem governance)
  ├── ANP — open source, community governed
  ├── AG-UI — community / Agno maintainer
  ├── A2UI — Google ADK Team internal governance
  ├── UCP — NRF coalition (Google + Shopify + retailers)
  └── AP2 — Google (internal → proposed coalition)
  
  STANDARDS BODIES
  ├── NLIP — Ecma International TC (formal standards process)
  └── (ISO, NIST, W3C: provide underlying standards referenced by all)
  
  ECLIPSE FOUNDATION
  └── LMOS — Eclipse project governance
  
  COMMUNITY (informal governance)
  └── UTCP — community maintainers; no formal governance body
```

### 3.12.2 Enterprise Multi-Protocol Governance Framework

When deploying multiple protocols simultaneously, enterprises need a governance layer that sits above individual protocol governance bodies:

```
ENTERPRISE MULTI-PROTOCOL GOVERNANCE ARCHITECTURE

  ┌────────────────────────────────────────────────────────────────┐
  │            ENTERPRISE AI PROTOCOL GOVERNANCE COUNCIL           │
  │                                                                │
  │  MEMBERS:                                                      │
  │  • Enterprise Architect (chair)                                │
  │  • Security Architect                                          │
  │  • CISO / Deputy CISO                                          │
  │  • Data Privacy Officer / DPO                                  │
  │  • Platform Engineering Lead                                   │
  │  • Legal / Compliance Representative                           │
  │  • Business Domain Leads (Finance, Commerce, HR, etc.)         │
  │                                                                │
  │  RESPONSIBILITIES:                                             │
  │  1. Protocol Adoption Decisions                                │
  │  2. Version Upgrade Approval                                   │
  │  3. Security Incident Response (cross-protocol)                │
  │  4. Compliance Gap Closure                                     │
  │  5. Agent Registry Governance                                  │
  │  6. Deprecation Management                                     │
  └──────────────────────────────────┬─────────────────────────────┘
                                     │
           ┌──────────────┬──────────┴────────┬──────────────┐
           ▼              ▼                   ▼              ▼
   Protocol Working  Identity &         Data &          Registry &
   Groups           Trust WG           Privacy WG      Discovery WG
   (one per         (DID, SPIFFE,      (GDPR, HIPAA,   (Agent Cards,
    protocol)        OAuth, mTLS)       PCI, AI Act)    DID Docs,
                                                        UCP Catalog)
```

### 3.12.3 Version Governance

Enterprises cannot absorb breaking changes from 9 protocol specifications simultaneously. A structured version governance process is required:

```
PROTOCOL VERSION GOVERNANCE PROCESS

  1. MONITOR (continuous)
     └─ Subscribe to protocol release channels:
        • AAIF mailing list (A2A, MCP)
        • ANP GitHub releases
        • Google ADK release notes (A2UI, UCP, AP2)
        • Ecma TC newsletter (NLIP)
        • Eclipse project page (LMOS)
        • UTCP GitHub releases

  2. EVALUATE (on new release)
     └─ Protocol Working Group reviews:
        ├─ Breaking change? → full governance cycle
        ├─ Security fix? → expedited review (48h target)
        ├─ New optional feature? → lightweight review
        └─ Deprecation notice? → migration planning

  3. TEST (staging environment)
     └─ All protocol version upgrades tested in:
        ├─ Unit: protocol SDK version bump
        ├─ Integration: cross-protocol compatibility
        └─ Security: re-run security scan (SAST + DAST)

  4. APPROVE (governance council)
     └─ Sign-off required for:
        ├─ Production deployment
        ├─ Agent Card version update
        └─ Registry entry update

  5. DEPLOY (rollout)
     └─ Blue/green or canary per protocol
        Rolling upgrade per §3.8.2

  6. RETIRE (old version)
     └─ Deprecation notice to all agent consumers
        30-day migration window (minimum)
        Enforce via API gateway version routing
```

### 3.12.4 Identity Governance

Identity governance for multi-protocol deployments must handle four distinct identity systems simultaneously:

| Identity System | Protocols | Governance Tool | Review Cadence |
|---|---|---|---|
| **OAuth 2.1 clients** | A2A, UCP, AP2 | IdP admin (Entra ID, Okta, Ping) | Quarterly access review |
| **W3C DIDs** | ANP, LMOS | DID registry (custom or did:web DNS) | Monthly key rotation review |
| **API Keys** | UTCP, AG-UI (fallback) | Secrets manager (Vault, AWS SM, Azure KV) | 90-day rotation enforcement |
| **SPIFFE SVIDs** | LMOS | SPIRE server | Automatic (short-lived SVIDs, no manual review needed) |
| **AP2 Payment Mandates** | AP2 | AP2 mandate registry | Real-time (per-transaction governance) |

**Identity Lifecycle Automation Requirements:**

```
JUST-IN-TIME IDENTITY FOR AI AGENTS (recommended pattern)

  Agent deployment triggers:
    ├─ OAuth 2.1 dynamic client registration (RFC 7591)
    │   → IdP issues client_id + client_secret
    │   → Stored in secrets manager; injected at runtime
    │
    ├─ DID Document creation and publication (ANP agents)
    │   → Agent generates Ed25519 keypair on first boot
    │   → DID Document published to well-known endpoint
    │   → DID registered in enterprise DID registry
    │
    └─ SPIFFE SVID issuance (LMOS agents)
        → SPIRE agent running in Kubernetes namespace
        → SVID auto-issued to pod on scheduling
        → SVID auto-rotated every 1 hour

  Agent decommission triggers:
    ├─ OAuth 2.1 client revocation (RFC 7592)
    ├─ DID Document deactivation
    ├─ SVID expiry (automatic; no action needed if SPIRE deregistered)
    └─ Mandate revocation (AP2)
```

### 3.12.5 Registry Governance

Each protocol introduces a new "registry" concept. Enterprises must govern all of them:

| Registry Type | Protocol | What It Contains | Governance | Integrity Control |
|---|---|---|---|---|
| **Agent Card Registry** | A2A | Agent capability declarations | AAIF + enterprise internal | DNS + HTTPS (/.well-known/) |
| **DID Registry** | ANP, LMOS | DID documents + public keys | W3C DID method governance | Cryptographic (DID spec) |
| **NRF Merchant Registry** | UCP | Certified merchants + capabilities | NRF coalition governance | NRF certification process |
| **AP2 Principal Registry** | AP2 | Shopping agents + credential providers | Google (current) | Mandate chain signatures |
| **LMOS Agent Registry** | LMOS | IoA agent catalog + capabilities | Eclipse Foundation | Proposed: VC-signed entries |
| **Tool Registry** | UTCP | Available tools + schemas | Internal enterprise | Schema validation |

**Unified Registry Architecture (recommended):**

```
ENTERPRISE UNIFIED AGENT REGISTRY

  ┌─────────────────────────────────────────────────────────────┐
  │            ENTERPRISE AGENT REGISTRY SERVICE                │
  │                                                             │
  │  Registry Entry (per agent):                                │
  │  ├─ agent_id: <UUID>                                        │
  │  ├─ protocols: ["a2a", "ag-ui", "utcp"]                     │
  │  ├─ agent_card_url: "https://.../.well-known/agent-card.json"│
  │  ├─ did: "did:web:enterprise.com:agents:billing"            │
  │  ├─ spiffe_id: "spiffe://enterprise.com/agent/billing"      │
  │  ├─ owner_team: "finance-engineering"                       │
  │  ├─ compliance_tier: "high" (triggers PCI/GDPR controls)   │
  │  ├─ approved_versions: {"a2a": "1.0", "ag-ui": "0.8+"}     │
  │  └─ last_reviewed: "2026-07-01"                             │
  │                                                             │
  │  API:                                                       │
  │  GET  /registry/agents?protocol=a2a                         │
  │  GET  /registry/agents/{id}                                 │
  │  POST /registry/agents (requires governance approval)       │
  │  PUT  /registry/agents/{id}/versions (approval required)    │
  │  DELETE /registry/agents/{id} (decommission workflow)       │
  └─────────────────────────────────────────────────────────────┘
```

### 3.12.6 Metadata Governance

Metadata governance ensures that the information agents exchange (capability declarations, tool schemas, UI component definitions) is trusted, versioned, and auditable:

```
METADATA GOVERNANCE FRAMEWORK

  SCHEMA GOVERNANCE
  ├─ All agent capability schemas stored in internal schema registry
  ├─ Schema changes require PR review + protocol working group approval
  ├─ Schema versions pinned in agent deployments (no floating versions)
  └─ Schema breaking changes trigger downstream agent impact analysis

  DATA CLASSIFICATION
  ├─ All data flowing through protocols classified at source:
  │   PUBLIC | INTERNAL | CONFIDENTIAL | RESTRICTED
  ├─ AG-UI SSE streams: classify based on data types streamed
  ├─ A2A task artifacts: inherit classification from task input
  ├─ NLIP transcripts: default CONFIDENTIAL (may contain PII)
  └─ AP2 receipts: RESTRICTED (financial data, 7-year retention)

  LINEAGE TRACKING
  ├─ OTel TraceContext propagated across all protocol calls
  ├─ Data lineage graph: source → transformation → destination
  ├─ Per-protocol lineage capture:
  │   A2A:   task_id → artifact_id → downstream_task_id
  │   ANP:   message_id → thread_id → response_message_id
  │   AG-UI: run_id → event_id → frontend_render_event_id
  └─ Lineage data retained per compliance framework requirements
```

### 3.12.7 Governance Maturity Model

Enterprises should assess their multi-protocol governance maturity against this model and target Level 3 by the end of 2026:

```
PROTOCOL GOVERNANCE MATURITY MODEL

  LEVEL 1 — AD HOC
  ├─ Protocols adopted per team without central governance
  ├─ No registry; agent cards scattered across teams
  ├─ Security review done (if at all) at deployment
  └─ No version management; teams upgrade independently

  LEVEL 2 — DEFINED
  ├─ Enterprise AI Protocol Governance Council established
  ├─ Protocol adoption policy documented and enforced
  ├─ Centralized registry with manual entries
  └─ Security review process defined; compliance gaps documented

  LEVEL 3 — MANAGED     ← Target for mature enterprises by Q4 2026
  ├─ Automated registry with CI/CD integration
  ├─ Protocol version upgrades go through gated pipeline
  ├─ Compliance controls automated (OPA policy enforcement)
  └─ OTel-based observability covering all protocols

  LEVEL 4 — OPTIMIZED   ← 2027 target for leading enterprises
  ├─ Self-service agent deployment with governance guardrails
  ├─ Real-time compliance scoring per protocol deployment
  ├─ AI-assisted protocol selection and security review
  └─ Continuous conformance testing against protocol specs
```

---

## Cross-Section Summary: Protocol Maturity Assessment

The table below synthesizes all subsections of Section 3 into a single cross-cutting assessment:

| Dimension | ACP/A2A | ANP | AG-UI | A2UI | UCP | AP2 | NLIP | LMOS | UTCP |
|---|---|---|---|---|---|---|---|---|---|
| **Security Posture** | ★★★★☆ | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| **Identity Model** | ★★★★☆ | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★★☆ | ★★☆☆☆ | ★★★★☆ | ★★☆☆☆ |
| **Auth Completeness** | ★★★★☆ | ★★★★☆ | ★★☆☆☆ | ★★★☆☆ | ★★★★☆ | ★★★★★ | ★☆☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| **AuthZ Sophistication** | ★★★☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★★★ | ★☆☆☆☆ | ★★★★☆ | ★★☆☆☆ |
| **Network Compatibility** | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| **Messaging Completeness** | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| **Observability** | ★★★★☆ | ★★☆☆☆ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★☆☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| **Compliance Readiness** | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★★★ | ★★☆☆☆ | ★★★☆☆ | ★★☆☆☆ |
| **Governance Maturity** | ★★★★★ | ★★★☆☆ | ★★☆☆☆ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ★★☆☆☆ |
| **Enterprise Production Ready** | ★★★★★ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ | ★★☆☆☆ | ★★☆☆☆ | ★★☆☆☆ |

**Key findings from Section 3:**

1. **A2A (incl. ACP merger) is the baseline.** It is the only protocol among the 9 with enterprise-grade governance (Linux Foundation AAIF), stable specification (v1.0), and broad multi-vendor adoption. All cross-cutting concerns discussed in this section assume A2A as the coordination backbone.

2. **AP2 has the strongest security design for autonomous action.** The PaymentMandate model represents the most complete implementation of the principle of "pre-committed, cryptographically bounded agency" — agents cannot exceed their mandate without a new cryptographic agreement. This pattern should be studied and applied beyond payments to any high-stakes autonomous action.

3. **ANP's DID-based identity is architecturally superior for cross-organizational trust.** The barrier is operational readiness, not design quality. Enterprises investing in ANP should prioritize DID document lifecycle tooling.

4. **AG-UI, NLIP, and UTCP require significant enterprise hardening.** These protocols carry weak security models, undefined observability, and no formal compliance mappings. They are not production-ready for regulated industries without substantial enterprise overlay controls.

5. **LMOS's IoA vision requires a multi-year horizon.** The Eclipse Foundation governance is solid, and the SPIFFE/OPA integration proposals are the right direction — but as of July 2026, LMOS remains a research-grade platform, not an enterprise production choice.

6. **Multi-protocol governance is the defining enterprise challenge of 2026.** No enterprise will deploy just one of these protocols. The Enterprise AI Protocol Governance Council model in §3.12 is the minimum governance structure needed to safely manage this complexity.

---

*Section 3 of 6 — Emerging AI Agent Protocols Beyond MCP & A2A: Enterprise Architecture, Standards, Security, and Adoption (July 2026 Edition)*

*See also: Section 1 — Protocol Landscape Overview | Section 2 — Protocol Deep Dives | Section 4 — Enterprise Adoption Patterns | Section 5 — Reference Architectures | Section 6 — Executive Action Plan*

---

**Standards and Specifications Referenced**

| Standard | URL / Reference |
|---|---|
| W3C DID Core | https://www.w3.org/TR/did-core/ |
| W3C Verifiable Credentials v2.0 | https://www.w3.org/TR/vc-data-model-2.0/ |
| DIDComm Messaging | https://identity.foundation/didcomm-messaging/spec/ |
| OAuth 2.1 | draft-ietf-oauth-v2-1 |
| RFC 7591 — OAuth Dynamic Client Registration | https://www.rfc-editor.org/rfc/rfc7591 |
| RFC 8693 — OAuth Token Exchange | https://www.rfc-editor.org/rfc/rfc8693 |
| SPIFFE / SPIRE | https://spiffe.io |
| OpenTelemetry | https://opentelemetry.io |
| Open Policy Agent | https://www.openpolicyagent.org/ |
| OpenFGA | https://openfga.dev |
| Cedar Policy | https://cedarpolicy.com |
| OWASP LLM Top 10 | https://owasp.org/www-project-top-10-for-large-language-model-applications/ |
| NIST AI RMF 1.0 | https://www.nist.gov/system/files/documents/2023/01/26/AI_RMF_1.0.pdf |
| ISO/IEC 42001 | ISO/IEC JTC 1/SC 42 (published Dec 2023) |
| ISO/IEC 27001:2022 | ISO/IEC JTC 1/SC 27 |
| EU AI Act | Regulation (EU) 2024/1689 |
| DORA | Regulation (EU) 2022/2554 |
| PCI DSS v4.0 | https://www.pcisecuritystandards.org |
| GDPR | Regulation (EU) 2016/679 |
| CNCF Cloud Native Trail Map | https://landscape.cncf.io |
| OpenSSF Scorecard | https://securityscorecards.dev |
