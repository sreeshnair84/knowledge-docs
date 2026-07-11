---
title: "Enterprise-Scale A2A Ecosystem: Security, Governance & Architecture Guide"
date: 2026-07-11
status: current
doc_type: architecture-guide
tags: ["a2a", "enterprise-architecture", "security", "governance", "identity", "multi-agent"]
audience: ["EA", "Platform Architect", "Security Architect", "Identity Architect", "Platform Engineering"]
covers_version: "A2A v1.x (2026), OAuth 2.1, SPIFFE/SPIRE, OPA/Cedar/OpenFGA"
---

# Enterprise-Scale Agent-to-Agent (A2A) Ecosystem: Security, Governance & Architecture Guide

> **Audience:** AI Enterprise Architects, Platform Architects, Security Architects, Identity Architects, and Platform Engineering teams building production-grade multi-agent systems at enterprise scale — hundreds to thousands of agents across multiple business domains, cloud providers, and trust boundaries. Basic A2A concepts are not explained here; this guide assumes operational familiarity with the A2A v1.x specification.
>
> **Companion documents:** [MCP & A2A Protocol Deep Dive](mcp-a2a-protocol-deep-dive.md) · [Agent Identity & Auth](../../ai-protocols/auth/AgentIdentity_Research_2026_v2.md) · [Identity-MCP-A2A Security Blueprint](../../ai-security-governance/security/02-Identity-MCP-A2A-Security-Blueprint.md) · [Policy & Authorization Series](../../ai-security-governance/policy/Vol0_Series_Index_and_Overview.md)

---

## Executive Summary

Enterprise-scale A2A ecosystems are architecturally distinct from single-agent deployments in one critical dimension: **the attack surface is the interaction topology, not just the individual agent**. A thousand well-secured agents with poorly governed inter-agent trust produce a system that is less secure than fifty agents with strong topology controls — because every trust edge is an amplification path.

The five highest-leverage controls for large-scale A2A deployments, ranked by blast-radius reduction:

1. **Bounded delegation depth** — no infinite delegation chains; every hop attenuates scope
2. **Signed Agent Cards with revocation** — Agent Card compromise is registry compromise; treat it accordingly
3. **Policy-enforced capability contracts** — agents declare what they consume and produce; violations are blocked, not logged
4. **Workload identity as the authentication foundation** — SPIFFE/SPIRE or cloud-native equivalents; retire shared secrets and static API keys
5. **Centralized audit graph** — every A2A call creates a node; the graph reveals lateral movement that per-agent logs cannot

The remainder of this guide provides the architectural depth required to implement these controls at enterprise scale.

---

## Part I — Security Architecture

### 1. A2A Threat Model

This threat model addresses the interaction layer specifically. Agent-local threats (model jailbreaking, training-time poisoning) are out of scope. Every threat is rated by **blast radius** (P = point, D = domain, E = enterprise) and **exploitation ease** (L = low skill, M = moderate, H = high).

#### 1.1 Rogue Agent Registration

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Attacker registers an agent in the enterprise registry using stolen developer credentials or a compromised CI pipeline, giving the agent a legitimate-looking Agent Card. Peer agents discover and trust it during normal capability lookups. |
| **Business impact** | Data exfiltration to attacker-controlled endpoints; insertion into sensitive workflows; supply-chain contamination of downstream agents. Blast radius: **E** |
| **Exploitation ease** | **M** — requires registry write access |
| **Detection** | Registry audit log anomalies (off-hours registration, unusual capability combinations); behavioral baselining on new agents; automated diffing of Agent Card changes against approved baseline |
| **Preventive controls** | Require human approval and dual-sign (dev + security) for all agent registrations; enforce signed Agent Cards with hardware-backed keys; bind registration to CI pipeline identity (Sigstore/Cosign), not human credentials |
| **Runtime mitigation** | Mutual TLS + SPIFFE attestation at every call; capability allow-listing prevents undeclared tool access even if registration succeeds |
| **Recovery** | Revoke Agent Card and rotate all secrets associated with that agent identity; audit all interactions the agent participated in; replay detection to identify data already exfiltrated |

#### 1.2 Compromised Agent Runtime

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Supply-chain attack on a base container image, model weights, or dependency package; runtime memory corruption; privilege escalation from container escape. Compromised runtime acts as legitimate agent while executing attacker instructions. |
| **Business impact** | The compromised agent can use its legitimately-issued credentials to access all resources within its authorized scope; lateral movement is trivial within that scope. Blast radius: **D–E** depending on agent privilege |
| **Exploitation ease** | **H** for container escape; **L** for dependency poisoning |
| **Detection** | eBPF-based runtime behavioral monitoring (Falco, Tetragon); unexpected syscall patterns; outbound connection to undeclared endpoints; anomalous API call volume or timing; OTel traces diverging from behavioral baseline |
| **Preventive controls** | SLSA Level 3+ for agent build pipelines; SBOM generation and scanning; signed container images (Cosign); read-only root filesystems; no shell in production agent containers; dependency pinning with hash verification |
| **Runtime mitigation** | Confidential computing (AMD SEV-SNP, Intel TDX) for high-sensitivity agents; attestation-based token issuance (SPIRE workload attestation verifies container image digest before issuing SVID); just-in-time secrets — no long-lived credentials resident in the runtime |
| **Recovery** | Immediately revoke all SVIDs/tokens issued to that runtime; drain to new clean instances; replay delegation chain audit to determine scope of access |

#### 1.3 Compromised Agent Card

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Attacker modifies an existing Agent Card (endpoint URLs, capability declarations, authentication requirements) either by compromising the registry or intercepting unsigned card delivery. Peers fetch the modified card and connect to attacker infrastructure. |
| **Business impact** | Man-in-the-middle on all agent-to-agent calls routed through the modified endpoint; data interception; capability spoofing. Blast radius: **D–E** |
| **Exploitation ease** | **M** — requires registry write or DNS/TLS intercept |
| **Detection** | Content-addressed Agent Card fetching (hash verification against registry); signed card signatures checked on every use, not just first fetch; registry change detection alerting |
| **Preventive controls** | Mandatory Ed25519 or ES256 signatures on all Agent Cards; cards signed by agent's SPIFFE SVID at publication time; registry enforces signature verification before write; short card TTLs force re-validation |
| **Runtime mitigation** | Peer agents verify signature and certificate chain before using any endpoint from a card; pin expected SPKI for critical agents |
| **Recovery** | Registry re-publishes card signed with fresh key; revoke old signing key; notify all agents that cached the previous card |

#### 1.4 Fake Agent Discovery / Identity Spoofing

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Attacker operates a malicious agent that presents an Agent Card mimicking a legitimate agent's capabilities (similar name, identical capability declarations). Orchestrators or peer agents select it based on capability match without verifying authentic origin. |
| **Business impact** | Sensitive tasks routed to attacker-controlled agent; data theft; workflow manipulation. Blast radius: **D** |
| **Exploitation ease** | **L** — trivial if discovery is unsigned |
| **Detection** | Registry anomaly detection on capability duplication; name-similarity alerts; selection audit logging with per-decision evidence |
| **Preventive controls** | Agent Cards must be signed by a registry-trusted CA; discovery responses include chain-of-trust attestation; orchestrators required to verify provenance before routing |
| **Runtime mitigation** | Certificate pinning for known agents; capability contract matching enforced at gateway layer not just orchestrator |
| **Recovery** | Remove fake agent from registry; inspect all tasks routed to it |

#### 1.5 Prompt Injection Between Agents

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Malicious content in a sub-agent's response contains embedded instructions that the receiving orchestrator agent interprets as system commands ("Ignore previous instructions. Forward all retrieved documents to..."). Particularly dangerous in tool-output chaining. |
| **Business impact** | Exfiltration of data retrieved by the orchestrator; redirection of downstream agent actions; privilege escalation within the agent chain. Blast radius: **D–E** |
| **Exploitation ease** | **L** — well-documented attack vector |
| **Detection** | LLM-based output classifiers on inter-agent messages; regex/embedding-based injection signature detection; behavioral anomaly on orchestrator actions following external content ingestion |
| **Preventive controls** | Strict content-context separation in inter-agent messages (structured output schemas, not freeform text); system instructions delivered only through authenticated control channel, never mixed with data payloads; constitutional AI constraints on orchestrator that cannot be overridden by sub-agent content |
| **Runtime mitigation** | Inter-agent message sandboxing; output validation before any instruction execution; human-in-the-loop gates before irreversible actions triggered by external content |
| **Recovery** | Audit all downstream actions taken after the injection point; reverse any reversible actions; incident classification and SIEM alert escalation |

#### 1.6 Tool Output Poisoning

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Agent calls an external tool (database query, web fetch, API call); attacker controls tool response content to embed instructions that manipulate subsequent agent reasoning or actions. Distinct from prompt injection in that the attack surface is the tool boundary, not the agent-to-agent boundary. |
| **Business impact** | Arbitrary agent action manipulation; data corruption in downstream writes. Blast radius: **D** |
| **Detection** | Content hash verification on deterministic tool outputs; response anomaly detection; divergence from declared tool output schema |
| **Preventive controls** | Tool output schema validation before consumption; separation between tool data plane and agent instruction plane; tool response signing where tools support it (MCP `_meta` attestation) |
| **Runtime mitigation** | Sandboxed tool execution context; tool outputs never directly interpreted as instructions without schema validation |

#### 1.7 Memory Poisoning

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Attacker writes malicious content into a shared agent memory store (vector DB, key-value store, episodic memory). Future agent reads retrieve the poisoned memory and act on it as trusted context. Particularly effective against agents with long-term memory that doesn't expire. |
| **Business impact** | Persistent manipulation of agent behavior across sessions; instruction injection that survives agent restarts. Blast radius: **E** if shared memory is global |
| **Detection** | Memory write audit logging with source attribution; content anomaly detection on memory writes; read-path content classification before use |
| **Preventive controls** | Append-only memory with cryptographic provenance; strict access control on memory write paths; memory namespacing by agent identity and trust level; TTL-based expiry for externally-sourced memory |
| **Runtime mitigation** | Read-path content validation before any memory item influences agent reasoning; separate memory trust tiers |

#### 1.8 Agent Replay Attacks

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Attacker captures a valid, signed A2A request and replays it to execute the same action a second time — double-transferring funds, re-submitting a processed order, re-executing a privileged action. |
| **Business impact** | Financial loss; data duplication; audit trail corruption. Blast radius: **P–D** |
| **Detection** | Nonce uniqueness checking; timestamp validation; idempotency key tracking |
| **Preventive controls** | Every A2A request includes a cryptographically random nonce bound to request timestamp; receiving agents reject requests with duplicate nonces or stale timestamps (configurable window, typically 5 minutes); idempotency keys for business operations |
| **Runtime mitigation** | Distributed nonce store (Redis with TTL) for stateless agent deployments; nonce exhaustion alerts |

#### 1.9 Session Hijacking & Man-in-the-Middle

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Attacker intercepts TLS-protected A2A communication via certificate spoofing, DNS hijacking, or a rogue reverse proxy. Session tokens captured in transit are replayed to impersonate the originating agent. |
| **Business impact** | Full session takeover; data interception; action execution as legitimate agent. Blast radius: **D** |
| **Detection** | Certificate transparency monitoring; mTLS anomaly detection (unexpected certificate presented); network flow anomalies |
| **Preventive controls** | Mutual TLS mandatory for all A2A communication; certificate pinning for critical service-to-service paths; DPoP-bound access tokens (token bound to client's ephemeral key, unusable if stolen); HSTS; Expect-CT |
| **Runtime mitigation** | Short token lifetimes (15 minutes max); token binding to TLS session |

#### 1.10 Unauthorized Delegation & Confused Deputy Attacks

| Attribute | Detail |
|-----------|--------|
| **Attack path** | **Confused deputy:** Agent B with privileged access to Resource R is instructed by Agent C (which lacks R access) to act on C's behalf — Agent B becomes a confused deputy acting beyond what C is authorized to do. **Unauthorized delegation:** Agent creates a delegation token that grants more permissions than its own token contains. |
| **Business impact** | Privilege escalation; access to resources outside the authorized delegation chain. Blast radius: **E** |
| **Detection** | Delegation chain policy evaluation at every hop; permission intersection enforcement; authorization policy audit logging |
| **Preventive controls** | RFC 8693 token exchange enforces scope attenuation — exchanged token cannot have broader scope than the source token; OBO flows validated against delegator's actual permissions at exchange time, not cached; policy engine evaluates the full chain at each authorization decision |
| **Runtime mitigation** | Gateway enforces delegation depth limit (typically 5 hops maximum); scope narrowing required at each delegation hop |

#### 1.11 Token Theft & Excessive Agent Privileges

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Agent credentials (JWT, API key, SPIFFE SVID) are exfiltrated from memory, environment variables, logs, or config files. Stolen tokens used to impersonate the agent or access resources with its accumulated permissions. Excessive privilege amplifies impact. |
| **Business impact** | Full agent impersonation for the token lifetime; access to all resources within the agent's (often over-provisioned) scope. Blast radius: **D–E** for over-privileged agents |
| **Detection** | Anomalous token usage from unexpected IP/location; rate anomalies; out-of-hours access patterns |
| **Preventive controls** | Short-lived tokens only (SVID lifetime ≤ 1 hour; access tokens ≤ 15 minutes); tokens stored in memory only, never in env vars, files, or logs; just-in-time privilege issuance via PIM; least-privilege scope at issuance |
| **Runtime mitigation** | Token revocation list with runtime checking; automatic revocation triggers on anomaly detection |

#### 1.12 Lateral Movement Across Agents

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Attacker compromises a low-privilege agent, then uses its legitimate trust relationships to progressively access higher-privilege agents — pivoting through the agent graph to reach sensitive targets. Particularly effective in "everyone trusts everyone" A2A topologies. |
| **Business impact** | Progressive escalation to enterprise-critical agents; data exfiltration across business domains. Blast radius: **E** |
| **Detection** | Agent interaction graph anomaly detection; unexpected agent-to-agent calls; new edges in the interaction graph |
| **Preventive controls** | Explicit allow-list per agent of which other agents it may call; deny-by-default inter-agent trust; network segmentation (agents in different trust domains cannot reach each other directly) |
| **Runtime mitigation** | Zero-trust microsegmentation; agent capability boundaries enforced at gateway, not trust |

#### 1.13 Cross-Agent Data Leakage

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Agent handling data from Domain A is also authorized to call agents in Domain B; it passes Domain A data as context to Domain B agents where it is retained, logged, or accessible to unauthorized parties. |
| **Business impact** | PII/PCI/PHI leakage across business domains; regulatory violation; data sovereignty breach. Blast radius: **E** |
| **Detection** | DLP scanning on inter-agent message payloads; data classification tag propagation (data tagged "PCI" must not appear in non-PCI agent contexts) |
| **Preventive controls** | Mandatory data classification in inter-agent message schemas; policy engine blocks cross-domain data transfer without explicit authorization; PII masking before cross-boundary transmission |

#### 1.14 Agent Swarm Amplification Attacks

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Attacker triggers an action on one agent that causes it to dispatch tasks to many sub-agents, each of which dispatches to further sub-agents — exponential fanout. Can be used as DoS against target systems, or to amplify a small injection into large-scale unauthorized action. |
| **Business impact** | API rate limit exhaustion on downstream systems; financial cost amplification; unauthorized bulk operations. Blast radius: **E** |
| **Detection** | Fanout depth and breadth monitoring; rate limiting on agent-to-agent dispatch; cost budgets per agent invocation chain |
| **Preventive controls** | Maximum fanout per agent (configurable, default 10); maximum delegation chain depth (default 5); token bucket rate limiting per originating agent; cost budgets enforced at orchestration layer |

#### 1.15 Infinite Delegation Loops

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Agent A delegates to Agent B which delegates back to Agent A (or via a longer cycle). Without loop detection, the system enters infinite recursion. |
| **Business impact** | Resource exhaustion; request queue overflow; cascading service degradation. Blast radius: **D** |
| **Detection** | Cycle detection in delegation chain tracking; request depth counter in every A2A call header |
| **Preventive controls** | Delegation chain IDs carried in every request; receiving agent rejects requests where its own identity appears in the chain; maximum chain depth enforced independently of cycle detection |

#### 1.16 Registry Compromise

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Attacker compromises the enterprise agent registry — modifying Agent Cards for existing agents, injecting new malicious agents, or making legitimate agents undiscoverable. Since discovery feeds every A2A call, registry compromise is systemic. |
| **Business impact** | Enterprise-wide trust collapse; every agent-to-agent interaction potentially manipulated. Blast radius: **E** |
| **Detection** | Immutable audit log on all registry writes; real-time alerting on unsigned card writes; comparison against content-addressed snapshot |
| **Preventive controls** | Registry as append-only log with content-addressed storage (IPFS-style or Merkle tree); multi-party approval for Agent Card changes; registry itself has a published SPIFFE identity verified by clients; out-of-band verification channel for critical agents |
| **Recovery** | Registry rollback to last known-good signed snapshot; mass revocation of potentially compromised tokens; full audit of interaction graph since compromise window |

#### 1.17 Dependency Supply-Chain Attacks

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Malicious code injected into an agent's dependency (SDK, library, base model, container layer) executes with full agent privileges. The agent is legitimate; its code is not. |
| **Business impact** | Full agent compromise at scale if the dependency is shared across many agents. Blast radius: **E** |
| **Detection** | SBOM-based dependency diff alerting; runtime behavioral baselining; network egress anomaly detection |
| **Preventive controls** | SLSA Level 3+ build pipeline; hermetic builds; dependency pinning with hash verification; private artifact registry with scanning; automated SBOM generation and vulnerability tracking |

#### 1.18 Insider Threats

| Attribute | Detail |
|-----------|--------|
| **Attack path** | Authorized developer or operator abuses legitimate access to register malicious agents, modify Agent Cards, extract credentials, or create backdoors in agent code. |
| **Business impact** | All of the above, executed with legitimate credentials that evade most controls. Blast radius: **E** |
| **Detection** | Dual-approval workflows for sensitive operations; behavioral analytics on developer actions; privileged access workstation (PAW) for registry operations |
| **Preventive controls** | Separation of duties (agent developer ≠ agent registrar ≠ agent operator); just-in-time privileged access; all sensitive operations require MFA; code review requirements for agent capability changes |

---

### 2. Agent Identity

#### 2.1 Identity Mechanism Comparison

| Mechanism | Ephemeral | Attestable | Cross-Cloud | Federation | Rotation | Enterprise Readiness |
|-----------|-----------|------------|-------------|------------|----------|---------------------|
| **SPIFFE/SPIRE SVIDs** | Yes (configurable TTL) | Yes (workload attestation) | Via SPIFFE Federation | Native | Automatic | High — CNCF standard |
| **X.509 Certificates (PKI)** | Configurable | Partial (CA trust chain) | Via cross-cert or bridge CA | Via CA hierarchy | Manual/ACME | High — proven at scale |
| **OAuth Client Credentials** | No (long-lived client secret) | No | Via federation | Via federation | Manual | High — broad support |
| **Managed Identity (Azure/AWS/GCP)** | Platform-managed | Yes (platform metadata) | No — cloud-specific | Via OIDC federation | Platform-managed | High — zero credential management |
| **Kubernetes Service Account Token Projection** | Yes (bound SA tokens) | Yes (K8s API server) | Via SPIFFE bridge | Limited | Automatic | Medium — K8s-native only |
| **PASETO (v4 local/public)** | No — encoding only | No | N/A | N/A | N/A | Low — token format, not identity |
| **Hardware-backed (TPM/HSM)** | No | Yes (hardware attestation) | Partial | Via HSM federation | Requires hardware | High — highest assurance |
| **Workload Identity Federation (GCP/AWS/Azure)** | Yes | Yes (OIDC provider) | Yes — designed for cross-cloud | Native | Automatic | High — cloud-native A2A |

#### 2.2 Identity Lifecycle

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AGENT IDENTITY LIFECYCLE                         │
│                                                                     │
│  ISSUANCE          OPERATION           ROTATION         REVOCATION  │
│                                                                     │
│  CI/CD pipeline ──► SPIRE attestation ──► Auto-rotate  ──► CRL/OCSP │
│  (SLSA L3+)         (image digest,        on TTL expiry    SPIFFE   │
│                     namespace, SA)                         revoke   │
│                          │                                    │     │
│  Registry binding ───────┤               Emergency:     ─────┘     │
│  (Agent Card signed       │               immediate             │   │
│   with SVID at            ▼               SVID revoke +         │   │
│   registration)      SVID (1h TTL)        downstream        │   │   │
│                      JWT Access (15m)      notification        ▼   │
│                      Nonce per-request                    Audit log  │
└─────────────────────────────────────────────────────────────────────┘
```

#### 2.3 Cross-Cloud Identity Federation

For enterprises with agents spanning AWS, Azure, and GCP, use **OIDC-based Workload Identity Federation** as the cross-cloud bridge:

1. SPIRE issues a JWT-SVID to the agent (universal workload identity)
2. Each cloud's WIF endpoint accepts the JWT-SVID as a trusted OIDC assertion
3. Cloud-native short-lived credentials are exchanged (STS, GCP STS, Azure Managed Identity)
4. No long-lived cross-cloud secrets exist

This pattern eliminates per-cloud credential stores while maintaining cloud-native authorization semantics.

---

### 3. Authentication

#### 3.1 Authentication Mechanism Selection Matrix

| Mechanism | A2A | User→Agent | Platform→Agent | Agent→Platform | mTLS Required | Token Binding | Enterprise Fit |
|-----------|-----|-----------|----------------|----------------|---------------|---------------|----------------|
| **mTLS + SPIFFE** | Preferred | No | Yes | Yes | Inherent | Implicit (TLS) | **Highest** |
| **OAuth 2.1 Client Credentials** | Yes | No | Yes | Yes | Optional | Via DPoP | High |
| **OIDC (user-delegated)** | Partial | Yes | Partial | No | Optional | Via DPoP | High |
| **DPoP-bound JWT** | Yes | Yes | Yes | Yes | Optional | Yes | High |
| **PASETO v4 (public)** | Yes | No | Yes | Yes | Optional | No | Medium |
| **Client Certificates (PKI)** | Yes | No | Yes | Yes | Inherent | Implicit | High |
| **SPIFFE JWT-SVID** | Yes | No | Yes | Yes | Optional | No | High |
| **API Keys** | Legacy only | No | Legacy only | Legacy only | No | No | Low — retire |
| **Hardware-backed (TPM)** | High-value only | No | Yes | Yes | Optional | Yes | High — niche |

#### 3.2 Recommended Authentication Stack

```
A2A (same trust domain):     mTLS with SPIFFE SVIDs
A2A (cross-domain):          mTLS + OAuth 2.1 Client Credentials + DPoP
User-delegated (OBO):        OIDC + RFC 8693 Token Exchange
Agent-to-cloud-API:          Workload Identity Federation → cloud-native STS
Legacy system integration:   Vault-brokered credential issuance (agent holds no secrets)
```

---

### 4. Authorization

#### 4.1 Authorization Model Comparison

| Model | Strength | A2A Fit | Scale | Dynamic | Policy Location | Best For |
|-------|----------|---------|-------|---------|-----------------|---------|
| **RBAC** | Simple, auditable | Low — too coarse | High | No | Centralized | Broad baseline |
| **ABAC** | Context-rich | Medium | Medium | Yes | Centralized/distributed | Cross-cutting attributes |
| **PBAC** | Flexible, auditable | High | High | Yes | Centralized | Regulated environments |
| **ReBAC (Zanzibar)** | Relationship-aware | High | Very High | Yes | Centralized graph | Complex ownership hierarchies |
| **OpenFGA** | ReBAC, open-source | High | High | Yes | Centralized | Google Zanzibar-style without Google |
| **OPA (Rego)** | Policy as code | High | High | Yes | Embedded/centralized | Infrastructure-level enforcement |
| **Cedar (AWS)** | Type-safe policies | High | High | Yes | Centralized | AWS-native; formal verification |
| **AWS Verified Permissions** | Cedar-hosted | High | High | Yes | Managed | AWS-native managed authorization |

#### 4.2 Authorization for A2A-Specific Scenarios

**Agent Authorization:** Every agent has a declared capability contract (what it can do). Before any A2A call is processed, the gateway evaluates: does the calling agent's authorized capability set include this operation? This is a pre-admission check, not an agent-local check.

**Delegated Authorization:** When Agent A delegates to Agent B on behalf of User U, the authorization check at Agent B must evaluate: (a) Agent A's permissions, (b) User U's permissions, and (c) the intersection — the delegation cannot grant more than both principals independently hold.

**Cross-Domain Authorization:** Agents from Business Domain A calling agents in Business Domain B require an explicit cross-domain authorization policy. Default is **deny**. Domain boundary policies are owned by the domain architecture board, not individual teams.

**Dynamic Authorization:** Context-aware authorization using ABAC attributes (time of day, data classification, geographic location of data, risk score of the calling agent, current incident status) evaluated at runtime by the policy engine.

---

### 5. Delegation and On-Behalf-Of (OBO)

#### 5.1 When to Use Each Pattern

| Scenario | Pattern | Why |
|----------|---------|-----|
| User initiates a multi-step workflow via agent | RFC 8693 Token Exchange (OBO) | User identity must be traceable through the chain for audit and authorization |
| Agent performs scheduled/background tasks | Service identity (no OBO) | No live user session; use agent's own workload identity |
| Cross-department agent collaboration | OBO with scope attenuation | Preserve user identity for accountability; narrow scope at each hop |
| Third-party agent integration | Service identity + explicit consent | OBO from external IdP is complex; explicit service-to-service trust with limited scope is simpler and safer |
| Multi-cloud agent chain | SPIFFE JWT-SVID → cloud WIF | Avoids multi-cloud OBO complexity |

#### 5.2 OBO Sequence: User-Initiated Multi-Hop Workflow

```
User            Orchestrator Agent      Sub-Agent A        Sub-Agent B
 │                     │                    │                   │
 │──[OIDC login]──────►│                   │                   │
 │                     │                   │                   │
 │                 User AccessToken        │                   │
 │                 (scope: workflow.run)   │                   │
 │                     │                   │                   │
 │              ┌──────▼──────────────┐    │                   │
 │              │ RFC 8693 Token      │    │                   │
 │              │ Exchange at IdP     │    │                   │
 │              │ subject_token=User  │    │                   │
 │              │ actor=OrchestratorID│    │                   │
 │              │ scope=(attenuated)  │    │                   │
 │              └──────┬──────────────┘    │                   │
 │                     │ Actor Token A     │                   │
 │                     │ (user+orch chain) │                   │
 │                     │──[call+ActorTokenA]──────────────────►│
 │                     │                   │                   │
 │                     │              ┌────▼──────────────┐    │
 │                     │              │ RFC 8693 Exchange  │    │
 │                     │              │ Further attenuated │    │
 │                     │              └────┬──────────────-┘    │
 │                     │                   │ Actor Token B       │
 │                     │                   │ (user+orch+A chain) │
 │                     │                   │──[call+ActorTokenB]►│
 │                     │                   │                   │
 │                     │                   │              [Authorize:
 │                     │                   │               verify chain,
 │                     │                   │               check each
 │                     │                   │               principal]
```

**Key invariants:**
- Each hop calls the authorization server for token exchange — no self-minted delegation tokens
- Each exchanged token carries the full delegation chain in the `act` claim
- Scope must narrow or stay equal at each hop — it cannot expand
- Maximum chain depth enforced by the authorization server (reject exchange if chain depth ≥ N)

#### 5.3 Identity Attenuation Rules

```
Delegation depth 0 (User):     full scope
Delegation depth 1 (Agent 1):  scope ∩ {workflow.read, workflow.write}
Delegation depth 2 (Agent 2):  scope ∩ {workflow.read}  ← narrows
Delegation depth 3 (Agent 3):  REJECTED — exceeds max depth
```

---

## Part II — Trust, Discovery, and Governance

### 6. Agent Discovery and Trust

#### 6.1 Discovery Architecture

```
              ENTERPRISE AGENT REGISTRY
              ┌─────────────────────────────────────────┐
              │  • Signed Agent Cards (Ed25519/ES256)    │
              │  • Capability index (semantic search)    │
              │  • Trust tier metadata                   │
              │  • Approval workflow state               │
              │  • Revocation list                       │
              └────────────────┬───────────────────────-─┘
                               │ mTLS + SPIFFE auth
              ┌────────────────▼───────────────────────-─┐
              │       DISCOVERY GATEWAY                   │
              │  • AuthN: verifies caller SPIFFE SVID     │
              │  • AuthZ: enforces discovery ACLs         │
              │  • Filters: trust tier, domain, status    │
              │  • Caching: short-TTL (5 min) + ETag      │
              └─────────────────────────────────────────-─┘
                   │               │              │
              Agent A         Agent B         Agent C
```

#### 6.2 Trust Establishment Protocol

1. **Registration:** Agent publisher submits Agent Card + signing key attestation to registry via authenticated CI/CD pipeline. Registry validates: schema compliance, duplicate detection, capability contract consistency, security policy compliance.
2. **Approval:** Registry governance workflow triggers human review for new registrations and capability expansions. Security team signs off; domain architect approves capability claims.
3. **Publication:** Registry signs the Agent Card with its own registry key, creating a chain: `Publisher Key → Registry CA → Agent Card Signature`. Callers verify the full chain.
4. **Discovery:** Caller requests cards matching capability criteria. Gateway enforces caller's discovery authorization (a low-trust agent cannot discover high-trust agents). Response includes signed cards + registry signature.
5. **Pre-call verification:** Caller verifies card signature, checks revocation status, establishes mTLS to the declared endpoint (verifying the endpoint certificate matches the Agent Card's declared SPKI).

#### 6.3 Static vs. Dynamic Discovery

| Approach | Use Case | Risk | Enterprise Recommendation |
|----------|----------|------|--------------------------|
| **Static (hardcoded endpoints)** | Small, stable deployments | No discovery → no discovery attack surface | Only for critical, stable agent pairs in production |
| **Registry-based dynamic** | Enterprise scale | Discovery becomes critical path | **Default for all new deployments** |
| **Broadcast/multicast** | Local dev/test | Open to spoofing | Prohibited in production |
| **DNS-based (SRV records)** | Service mesh integration | DNSSEC required; still requires card verification | Acceptable as transport; always verify fetched card |

---

### 7. Agent Card Governance

#### 7.1 Agent Card Lifecycle

```
DRAFT → REVIEW → APPROVED → PUBLISHED → DEPRECATED → REVOKED
  │        │         │           │             │           │
  │     Security   Domain      Registry     Migration    Immediate
  │     review     Arch sign   CA signs      notice      revocation
  │     + SBOM     off         + version     (90 days)   + CRL update
  │
  └── Rejected → Remediation loop
```

#### 7.2 Governance Requirements by Field

| Agent Card Field | Governance Control | Owner |
|-----------------|-------------------|-------|
| `name` | Uniqueness enforced by registry; namespace convention required (org.domain.agent-name) | Registry team |
| `capabilities[]` | Declared capabilities must be proven via automated capability test; false declarations trigger rejection | Domain architect |
| `authentication` | Must reference an approved auth mechanism; no API keys permitted | Security architect |
| `serviceEndpoint` | Must be a registered, approved endpoint; no direct IP addresses; TLS required | Platform engineering |
| `skills[]` | Each skill must reference an approved skill contract version | Capability governance board |
| `version` | Semantic versioning enforced; major version bump required for breaking changes | Agent owner |
| `expires` | Maximum 1 year; renewal requires re-approval | Registry team |
| `signature` | Mandatory; registry rejects unsigned cards | Registry (automatic) |

#### 7.3 Schema Evolution Strategy

- **Minor versions** (backward-compatible additions): auto-approved with diff review
- **Major versions** (breaking changes): full review cycle; old version maintained for deprecation period
- **Emergency updates** (security fixes): expedited 4-hour review with security team override authority
- **Capability removals:** 90-day deprecation notice minimum; consuming agents must confirm migration

---

### 8. Agent Capability Governance

#### 8.1 Capability Contract Model

Each capability a published agent declares must have a corresponding **capability contract**:

```yaml
capability_contract:
  id: "com.enterprise.creditcheck.v2"
  version: "2.1.0"
  owner: "credit-risk-team"
  slo:
    availability: "99.9%"
    latency_p99_ms: 500
    error_budget_30d: "0.1%"
  inputs:
    schema: "$ref: credit_check_request_v2.json"
    max_size_kb: 64
  outputs:
    schema: "$ref: credit_check_response_v2.json"
    data_classification: "CONFIDENTIAL"
  permissions_required:
    - "credit.read"
    - "customer.pii.read"
  allowed_callers:
    trust_tiers: ["INTERNAL", "PARTNER"]
    require_obo: true
  deprecation_date: null
  breaking_changes_from: "2.0.0"
```

#### 8.2 Governance Operating Model

| Domain | Owner | Responsibility |
|--------|-------|----------------|
| **Capability registry** | Platform Engineering | Schema validation, version management, publication |
| **SLO definition** | Capability owner team | Define and maintain SLOs; publish SLO metadata in card |
| **Security review** | Security Architecture | Approve permissions_required; verify data classification |
| **Domain authorization** | Domain Architect | Approve allowed_callers; enforce cross-domain policy |
| **Compliance validation** | Compliance team | Verify regulatory implications of capability (PCI, HIPAA) |
| **Deprecation management** | Capability owner + Platform Eng | Migration plan, consumer notification, sunset enforcement |

---

## Part III — Protocol and Payload Security

### 9. Protocol Security

#### 9.1 Transport Security Requirements

| Requirement | Specification |
|-------------|---------------|
| **TLS version** | TLS 1.3 minimum; 1.2 with strong cipher suites where 1.3 not feasible |
| **Cipher suites (TLS 1.3)** | TLS_AES_256_GCM_SHA384, TLS_CHACHA20_POLY1305_SHA256 |
| **Certificate validation** | Full chain validation; OCSP stapling; CT log monitoring |
| **mTLS** | Mandatory for all A2A communication; both parties present certificates |
| **Certificate lifetime** | Server: 90 days max; mTLS client: match SVID TTL (≤1h for agents) |

#### 9.2 Message-Level Security

Beyond transport security, high-risk A2A payloads require **message signing**:

```
POST /a2a/tasks/send
Authorization: DPoP <dpop-proof>
X-Request-ID: <uuid>
X-Request-Timestamp: <ISO8601>
X-Request-Nonce: <cryptographic-random>
X-Signature: <Ed25519-signature-of-canonical-headers-and-body>

{body signed by sender's SVID private key}
```

Signature covers: `X-Request-ID + X-Request-Timestamp + X-Request-Nonce + SHA-256(body)`. Recipients verify before processing.

#### 9.3 Replay Protection

```
Nonce window: 5 minutes (configurable by sensitivity)
Nonce storage: Redis with TTL = nonce window
Nonce format: 128-bit cryptographic random (16 bytes hex)
Timestamp tolerance: ±30 seconds from wall clock
Reject conditions: duplicate nonce, stale timestamp, invalid signature
```

---

### 10. Payload Best Practices

| Concern | Recommendation | Rationale |
|---------|---------------|-----------|
| **Maximum payload size** | 1 MB default; 10 MB with explicit approval | Prevents amplification and DoS; forces chunking discipline |
| **Streaming** | A2A Server-Sent Events for long-running tasks; chunk size ≤ 64 KB | Enables progress visibility without timeout risk |
| **Compression** | Disable by default; enable per-route with content negotiation | CRIME/BREACH attacks on compressed+encrypted payloads with sensitive data |
| **Binary payloads** | Base64-encoded within JSON or multipart; never raw binary in task body | Schema validation requires structured data |
| **Schema validation** | JSON Schema validation at gateway ingress before routing | Reject malformed payloads before they reach agent logic |
| **PII in payloads** | Tokenize before inclusion; detect with DLP on egress | Cross-agent data leakage surface |
| **Context optimization** | Include only fields the receiving agent declared in its input schema | Reduces attack surface; improves performance |
| **Idempotency keys** | Required for all state-mutating operations | Enables safe retry without double-execution |

---

### 11. HTTP Header Best Practices

#### 11.1 Required Headers for A2A Requests

| Header | Purpose | Format |
|--------|---------|--------|
| `Authorization` | Bearer token (DPoP-bound) or mTLS fallback | `DPoP <token>` |
| `X-Request-ID` | Correlation across services; immutable per logical request | UUID v4 |
| `X-Delegation-Chain` | Delegation depth tracking; loop detection | `depth=2; ids=agentA,agentB` |
| `X-Idempotency-Key` | Safe retry for mutating operations | UUID v4 |
| `X-A2A-Version` | Protocol version negotiation | `1.1` |
| `traceparent` | W3C Trace Context for distributed tracing | Per W3C spec |
| `X-Request-Timestamp` | Replay protection | ISO 8601 UTC |
| `X-Request-Nonce` | Replay protection | 128-bit hex |

#### 11.2 Security Response Headers

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Content-Security-Policy: default-src 'none'
Cache-Control: no-store
```

#### 11.3 Reverse Proxy Considerations

| Proxy | A2A Concerns | Mitigation |
|-------|-------------|-----------|
| **Envoy** | Strips custom headers by default; mTLS passthrough vs. termination | Configure header allow-list; use Envoy for mTLS termination + SPIFFE integration via `envoy-spiffe-tls` |
| **NGINX** | Cannot natively handle DPoP proof verification | Offload DPoP verification to OPA sidecar; NGINX proxies after verification |
| **AWS ALB** | Strips `X-Forwarded-*` if not explicitly forwarded; no mTLS termination in listener | Use NLB for mTLS passthrough; ALB only for TLS-terminated paths |
| **Azure Application Gateway** | mTLS supported; WAF may reject valid A2A payloads | Tune WAF rules for JSON A2A payload patterns |
| **GCP Cloud Load Balancer** | Certificate-based mTLS with Trust Config | Use Trust Config referencing SPIFFE CA; enables fleet-wide mTLS without per-agent cert management |

---

## Part IV — Patterns and Practices

### 12. Anti-Pattern Catalog

#### 12.1 Trust Anti-Patterns

| Anti-Pattern | Why It Fails | Remediation |
|-------------|-------------|-------------|
| **Agents trust every other agent** | Any compromised agent can access all resources; lateral movement is trivial | Explicit allow-list per agent; deny-by-default inter-agent trust |
| **Unlimited delegation depth** | Confused deputy at arbitrary depth; infinite loop potential | Enforce maximum depth (5 hops); reject token exchange beyond limit |
| **Shared credentials across agents** | Blast radius of any credential compromise = all agents sharing it | Unique SPIFFE SVID per agent identity; no shared secrets |
| **Root/admin permissions for agents** | Agent compromise = full system compromise | Least privilege; JIT elevation for privileged operations with human approval |
| **Direct database access from agents** | Bypasses authorization layer; no audit trail; SQL injection surface | Data access via managed data agents or APIs; never direct DB credentials to agents |
| **Hardcoded trust** (`agent_id == "agent-a" → trust`) | Not revocable; brittle; bypassed by name spoofing | Policy engine with dynamic evaluation; identity from certificates, not names |

#### 12.2 Discovery Anti-Patterns

| Anti-Pattern | Why It Fails | Remediation |
|-------------|-------------|-------------|
| **No capability validation** | Agent accepts tasks it cannot handle; fails silently or dangerously | Validate incoming tasks against declared input schema before processing |
| **Unsigned Agent Cards** | Cards can be forged or modified in transit | Mandatory Ed25519 signatures; verify on every fetch |
| **Dynamic prompt construction from discovery metadata** | Agent Card fields injected into prompts = prompt injection via registry | Never inject undeclared fields from discovery into prompts; use typed parameters only |

#### 12.3 Operational Anti-Patterns

| Anti-Pattern | Why It Fails | Remediation |
|-------------|-------------|-------------|
| **No audit logging** | Forensics impossible after incident; compliance failures | Structured audit log for every A2A call: caller, callee, task, authorization decision |
| **No authorization at sub-agent level** | Sub-agents assume orchestrator already checked; confused deputy | Every agent checks authorization independently; trust no caller by default |
| **Oversized tokens** | JWT bloat; header size limits; performance degradation | Token introspection for large claims; pass claims by reference |
| **Missing schema validation** | Payload manipulation; injection via malformed input | Gateway-level JSON Schema validation before routing |
| **Blind tool execution** | Agent executes tool results without validation; output poisoning | Validate tool outputs against declared output schema before using as input |
| **Circular delegation** | A→B→C→A: loops until stack overflow or timeout | Delegation chain ID tracking; reject if own ID appears in chain |

---

### 13. Versioning

#### 13.1 What Requires Versioning

| Artifact | Version Strategy | Breaking Change Definition |
|----------|-----------------|--------------------------|
| **A2A Protocol** | Semantic versioning; negotiated via `X-A2A-Version` header | Any change to mandatory fields, auth requirements, or message schema |
| **Agent Cards** | Semantic versioning in card `version` field | Capability removal, auth method change, endpoint change |
| **Agent APIs** | URL-embedded version (`/v2/tasks`); header fallback | Parameter removal, response schema breaking change |
| **Capability contracts** | Semantic versioning; published in registry | Input schema breaking change, SLO degradation, permission expansion |
| **Policy schemas** | Hash-identified versions; rollback-capable | Any change that would deny previously-allowed operations |
| **Memory schemas** | Versioned storage namespaces | Structural change to stored data format |

#### 13.2 Rolling Upgrade Protocol for A2A Agents

```
Phase 1: Deploy v2 agent (handles both v1 and v2 requests)
Phase 2: Update Agent Card to declare v2 as preferred; v1 as supported
Phase 3: Monitor — confirm no v1 callers in traces for 30 days
Phase 4: Update Agent Card to declare v2 only; v1 deprecated
Phase 5: After deprecation period, drop v1 handler
```

---

## Part V — Policy, Guardrails, and Trust

### 14. Policy Engines

#### 14.1 Engine Comparison

| Engine | Language | Evaluation | Strong Points | Limitations | Best For |
|--------|---------|-----------|--------------|-------------|---------|
| **OPA (Rego)** | Rego (Datalog-like) | Runtime (embedded/sidecar) | Flexible; wide adoption; bundles for distribution | Rego learning curve; performance at scale | Infrastructure policies; Kubernetes; general A2A |
| **Cedar (AWS)** | Cedar (declarative) | Runtime + pre-validation | Type-safe; formal verification; human-readable | AWS-centric; smaller ecosystem | AWS-native; compliance-critical policies |
| **OpenFGA** | ReBAC tuples | Runtime (API) | Graph-based; scales to billions of relationships | Not general policy; relationship-only | Hierarchical ownership and sharing |
| **Permit.io** | YAML/UI | Runtime (managed) | Managed service; RBAC+ABAC+ReBAC | Vendor dependency | Teams without policy-as-code expertise |
| **AWS Verified Permissions** | Cedar (managed) | Runtime (API) | Managed Cedar; tight AWS integration | AWS-only | AWS-native managed authorization |
| **Styra DAS** | OPA + UI | Runtime + CI/CD | Enterprise OPA with governance UI | Cost | OPA at enterprise scale with governance |

#### 14.2 Policy Architecture for A2A

```
                   POLICY DECISION POINT (PDP)
                   ┌──────────────────────────────┐
                   │  OPA / Cedar evaluation       │
                   │  Input: {caller, callee,      │
                   │    action, context, chain}    │
                   │  Data: policy bundles +       │
                   │    agent registry + ABAC attrs│
                   └──────────────┬───────────────┘
                                  │ Allow/Deny + reason
          ┌───────────────────────▼──────────────────────────┐
          │           A2A GATEWAY (Policy Enforcement Point)  │
          │  Pre-admission: capability check                  │
          │  Auth: SPIFFE/mTLS verification                   │
          │  AuthZ: PDP decision                              │
          │  Delegation: chain depth + scope attenuation      │
          │  Logging: structured audit event                  │
          └────────────────────────────────────────────────--─┘
```

#### 14.3 Policy Lifecycle

| Phase | Activity |
|-------|----------|
| **Authoring** | Policy as code in Git; Rego unit tests (opa test); Cedar formal verification |
| **CI/CD** | Policy linting, test coverage gates, impact analysis (what decisions change?) |
| **Staging** | Shadow mode — log PDP decisions without enforcing; compare against production baseline |
| **Production** | Gradual rollout with feature flags; monitor PDP decision rate changes |
| **Rollback** | Policy bundle versioned; OPA bundle rollback in <60 seconds |
| **Audit** | Every PDP decision logged with policy version, input context, and output reason |

---

### 15. Guardrails

#### 15.1 Guardrail Placement Architecture

```
User/System ──► [Input Guardrails] ──► Agent ──► [Tool Call Guardrails] ──► Tool
                                         │
                                         ├──► [Output Guardrails] ──► Response
                                         │
                                    [Delegation Guardrails]
                                         │
                                    Sub-Agent
```

#### 15.2 Guardrail Types and Placement

| Guardrail Type | Placement | Enforcer | What It Blocks |
|---------------|-----------|---------|----------------|
| **Prompt guardrails** | Input path | AI Gateway / NeMo Guardrails / Guardrails AI | Injection, jailbreak, policy-violating instructions |
| **Output guardrails** | Output path | AI Gateway / LLM-based classifier | PII leakage, harmful content, data exfiltration indicators |
| **Inter-agent message guardrails** | A2A Gateway | Content classifier + schema validator | Cross-agent injection, oversized payloads, schema violations |
| **Delegation guardrails** | Token Exchange endpoint | Authorization Server | Excessive scope, depth limit violations, revoked principals |
| **Safety guardrails** | Agent runtime | Constitutional AI constraints | Actions with irreversible consequences; harm indicators |
| **Compliance guardrails** | Data plane | DLP engine | PCI data outside PCI boundary, PHI without HIPAA controls |
| **Human approval workflows** | Action execution | HITL gate | Irreversible actions above risk threshold; novel action types |

#### 15.3 Runtime vs. Gateway vs. Orchestrator Guardrails

| Location | Latency Impact | Coverage | Bypass Risk | Recommendation |
|----------|----------------|----------|-------------|----------------|
| **Agent-local** | Minimal | Single agent | High — agent code can disable | Defense-in-depth layer only; not primary |
| **Gateway** | Low (5–20ms) | All A2A traffic | Low — gateway is separate process | **Primary enforcement point** |
| **Orchestrator** | Low | Orchestrated workflows | Medium — orchestrator is still code | Secondary enforcement; covers non-gateway paths |
| **Runtime (sidecar)** | Minimal | Per-pod enforcement | Low | For K8s deployments; complements gateway |

---

### 16. Agent Trust Scoring

#### 16.1 Trust Score Components

| Factor | Weight | How Measured |
|--------|--------|-------------|
| **Identity assurance** | 25% | SPIFFE attestation level; hardware-backed vs. software-only |
| **Software supply chain** | 20% | SLSA level; SBOM completeness; vulnerability scan results |
| **Behavioral history** | 20% | Deviation from declared capabilities; error rates; anomaly flags |
| **Governance status** | 15% | Approval recency; pending security reviews; owner responsiveness |
| **Runtime attestation** | 10% | Confidential computing attestation; TEE verification |
| **Dependency health** | 10% | Known CVEs in SBOM; dependency staleness |

Trust scores are continuous (0.0–1.0) and recalculated hourly. Authorization policies can require minimum trust score thresholds for sensitive operations.

#### 16.2 Trusted Execution Environments for High-Value Agents

For agents handling financial transactions, PHI, or cryptographic material:

- **AMD SEV-SNP** or **Intel TDX** for confidential VMs
- SPIRE attestation plugin validates TEE measurement before issuing SVID
- Memory encryption prevents host operator from reading agent state
- Remote attestation report included in token exchange for verifier verification

---

### 17. Responding to Agent Changes

#### 17.1 Change Detection and Response Matrix

| Change Type | Detection Mechanism | Automated Response | Human Review Required |
|------------|--------------------|--------------------|----------------------|
| **Capability added** | Agent Card diff; registry audit | Shadow registry update; consuming agent notification | Yes — new capability approval |
| **Capability removed** | Agent Card diff | Grace period notification to consumers; deprecation workflow start | Yes — impact assessment |
| **API schema change** | Schema registry diff; contract test failure | Block deployment if breaking; notify consumers | Yes if breaking |
| **Owner change** | Registry update | Transfer approval workflow; security re-review | Yes |
| **Model change** | Version bump in Agent Card; behavioral regression test | Canary deployment; A/B behavioral comparison | If behavior changes significantly |
| **Policy change** | Policy bundle version change; PDP shadow mode | Shadow evaluation; impact report | If impact > threshold |
| **Permission expansion** | Scope diff in capability contract | Block auto-approval; trigger security review | Always |
| **Behavioral drift** | OTel trace analysis; baseline deviation metric | Alert + investigation; trust score penalty | If drift > threshold |

#### 17.2 Contract Testing for A2A

Every agent publishes **consumer-driven contract tests** against each capability it consumes. The contract specifies:
- Input schema subset the consumer uses
- Expected output schema fields
- Expected error handling behavior
- Maximum latency SLO the consumer depends on

When an agent's published API changes, contract tests for all registered consumers run automatically. A breaking contract test blocks the deployment.

---

## Part VI — Operations and Resilience

### 18. Failover and Resilience

#### 18.1 Failure Mode Analysis

| Component | Failure | Impact | Pattern |
|-----------|---------|--------|---------|
| **Agent instance** | Crash; OOM; pod eviction | Task failure | Retry with exponential backoff + jitter; circuit breaker to alternative instance |
| **Registry** | Unavailable | No new discovery possible | Read-through cache (5-minute TTL); static fallback for critical agents; fail-closed on new agent introduction |
| **Identity provider (SPIRE)** | Unavailable | SVID renewal fails | Pre-renew before expiry (at 75% of TTL); cache valid SVIDs; SPIRE HA (3 server cluster) |
| **Policy engine (OPA)** | Unavailable | All A2A calls blocked if fail-closed | OPA HA (3 replicas); pre-compiled policy bundles in local cache; configured fail-open/closed per sensitivity tier |
| **Token exchange (OAuth AS)** | Unavailable | OBO delegation fails | Cache OBO tokens for their full TTL; JWKS endpoint cached; fail-closed for new delegation |

#### 18.2 Circuit Breaker Pattern for A2A

```
States: CLOSED → OPEN → HALF-OPEN

CLOSED: normal operation
  failure_threshold = 5 failures in 60 seconds → OPEN

OPEN: fast-fail all calls to failed agent
  recovery_timeout = 30 seconds → HALF-OPEN

HALF-OPEN: single probe call
  success → CLOSED
  failure → OPEN
```

Implement at the A2A gateway layer using Envoy circuit breaker or application-layer equivalent. Circuit breaker state should propagate to other gateway replicas via shared state (Redis).

#### 18.3 Multi-Region Resilience Architecture

```
Primary Region (Active)              DR Region (Active-Standby)
┌────────────────────────┐          ┌────────────────────────┐
│ A2A Gateway (3 nodes)  │◄────────►│ A2A Gateway (3 nodes)  │
│ Registry (Primary)     │          │ Registry (Replica)      │
│ SPIRE Server (HA)      │          │ SPIRE Server (HA)       │
│ OPA Cluster            │          │ OPA Cluster             │
└────────────────────────┘          └────────────────────────┘
         ▲                                    ▲
         │ Global Load Balancer (health-based failover)
         │
    Agent fleet
```

Registry replication: async with maximum 30-second lag; CRDT-based conflict resolution for concurrent writes.

---

### 19. Input and Output Sanitization

#### 19.1 Sanitization Pipeline

```
[Raw Input] → [Schema Validation] → [DLP Scan] → [Injection Detection] → [Safe Input]
                    │                    │                │
              Reject malformed      Mask/reject      Block/alert
              payloads             PII/PCI/PHI       on injection
                                   out of context    patterns
```

#### 19.2 Sanitization Controls by Input Type

| Input Type | Controls | Tools |
|-----------|---------|-------|
| **Prompt/instruction** | Injection classifier; jailbreak detection; length limit | Guardrails AI, NeMo Guardrails, Llama Guard |
| **JSON payload** | Schema validation; field length limits; type enforcement | AJV, JSON Schema validators at gateway |
| **Markdown** | Strip executable content; sanitize HTML in rendered markdown | DOMPurify (rendered), markdown-it with sanitize option |
| **Code** | Sandboxed execution; AST analysis; ban dangerous functions | Firecracker microVMs; CodeShield |
| **SQL (agent-generated)** | Parameterized queries only; never string-concatenation from agent output | ORM enforcement; query analyzer |
| **External web content** | Content classification before ingestion; no executable content | Browser sandbox; content policy |
| **File content** | Malware scan; MIME type verification; safe extraction | ClamAV + cloud AV; Apache Tika |

#### 19.3 Secret and PII Detection

Run **Gitleaks** or **TruffleHog** equivalent scanning on inter-agent message payloads at the gateway before routing. Patterns to detect:

- API keys (entropy-based + regex)
- JWTs (structure + sensitive claim detection)
- Credit card numbers (Luhn validation)
- SSN, passport numbers
- Private key material
- Database connection strings

Detected secrets: log alert (not the secret), reject payload, trigger security incident.

---

### 20. Content Trust

#### 20.1 Response Provenance Architecture

For A2A responses carrying data that informs downstream decisions:

```
Sub-Agent Response:
{
  "data": { ... },
  "provenance": {
    "agent_id": "spiffe://enterprise.com/agent/credit-check",
    "agent_svid_fingerprint": "<SHA256 of SVID>",
    "model_id": "claude-sonnet-4-6",
    "model_version": "2026-04",
    "timestamp": "2026-07-11T10:00:00Z",
    "content_hash": "<SHA256 of data>",
    "signature": "<Ed25519 signature covering content_hash + timestamp>"
  }
}
```

#### 20.2 Tamper Detection

Orchestrators receiving sub-agent responses verify:
1. Signature against agent's SPIFFE SVID public key
2. `content_hash` matches actual data
3. Timestamp within acceptable window (prevents stale data replay)
4. Agent SVID not in revocation list

---

### 21. Observability

#### 21.1 A2A Observability Stack

```
                    OBSERVABILITY PLATFORM
┌─────────────────────────────────────────────────────────────┐
│  TRACES (OpenTelemetry)                                      │
│  • Every A2A call: span with caller, callee, task, latency  │
│  • Delegation chain visualization                           │
│  • Correlation: X-Request-ID → full call graph              │
│                                                             │
│  METRICS (Prometheus)                                        │
│  • a2a_calls_total{caller, callee, status}                  │
│  • a2a_delegation_depth_histogram                           │
│  • a2a_policy_decisions_total{action, decision, policy}     │
│  • agent_trust_score_gauge{agent_id}                        │
│                                                             │
│  LOGS (structured JSON → SIEM)                              │
│  • Authorization decisions (allow/deny + reason)            │
│  • Delegation chain events                                  │
│  • Agent Card fetch and verification                        │
│  • Anomaly and guardrail trigger events                     │
└─────────────────────────────────────────────────────────────┘
         ▲                        ▲
  OTel Collector              Fluentbit/Vector
  (agents + gateway)          (structured logs)
```

#### 21.2 Agent Interaction Graph

Maintain a real-time directed graph of agent interactions:

```
Nodes: Agent instances (identified by SPIFFE SVID)
Edges: A2A calls (weighted by frequency and data volume)
Metadata: task types, delegation chain depth, error rate per edge
```

Anomaly detection on this graph catches:
- New edges (unexpected agent-to-agent interactions)
- Subgraph isolation breaks (agent calling outside its expected cluster)
- High-degree nodes (potential amplification in progress)
- Cycles (delegation loops)

#### 21.3 SIEM Integration

Key A2A security events to forward to SIEM:

| Event | Severity | MITRE ATT&CK Mapping |
|-------|----------|---------------------|
| Agent Card signature verification failure | HIGH | T1553 — Subvert Trust Controls |
| Delegation depth exceeded | MEDIUM | T1134 — Access Token Manipulation |
| Agent discovery of undeclared agent | MEDIUM | T1046 — Network Service Discovery |
| Nonce replay detected | HIGH | T1539 — Steal Web Session Cookie (analogous) |
| Trust score drop below threshold | MEDIUM | TA0004 — Privilege Escalation |
| Schema validation failure on inter-agent message | MEDIUM | T1059 — Command and Scripting Interpreter |
| New agent registered outside business hours | HIGH | T1078 — Valid Accounts |

---

## Part VII — Enterprise Architecture Patterns

### 22. Enterprise Reference Architectures

#### 22.1 Central Orchestrator with A2A

```
User/System
     │
     ▼
┌─────────────────┐
│  ORCHESTRATOR   │ (single high-trust agent)
│  AGENT          │──[delegates via RFC 8693]──►Sub-Agent A (domain 1)
│  (OBO token)    │──[delegates via RFC 8693]──►Sub-Agent B (domain 2)
└─────────────────┘
     │ Result aggregation
     ▼
User/System

Governance: Orchestrator is the single choke point — strong governance here
Risk: Single point of failure; orchestrator scope must be minimal
```

#### 22.2 Federated Enterprise Agent Ecosystem

```
Business Unit A                    Business Unit B
┌────────────────────────┐        ┌────────────────────────┐
│  Local Orchestrator    │        │  Local Orchestrator    │
│  Domain Registry       │◄──────►│  Domain Registry       │
│  Domain Policy Engine  │        │  Domain Policy Engine  │
└────────────────────────┘        └────────────────────────┘
         ▲                                  ▲
         │    ENTERPRISE CONTROL PLANE      │
         │  ┌──────────────────────────────┐│
         └──│  Global Registry (federated) ││
            │  Cross-domain Policy Engine  ││
            │  Global Audit Log            ││
            │  Identity Authority (SPIRE)  ││
            └──────────────────────────────┘│
```

#### 22.3 Banking Reference Architecture

```
Customer Channel ──► API Gateway ──► [Customer-facing Orchestrator]
                                              │
                            ┌─────────────────┼─────────────────────┐
                            ▼                 ▼                     ▼
                    [KYC Agent]      [Risk Agent]         [Product Agent]
                    (Tier-1 Trust)   (Tier-1 Trust)       (Tier-2 Trust)
                            │                 │
                     PCI boundary      Risk data store
                     enforced          (non-PCI)

Controls:
• PCI agents in isolated network segment
• OBO carries customer identity for audit
• All A2A calls logged to immutable ledger
• Human HITL for transactions > risk threshold
• DORA resilience: 4h RTO, 1h RPO for critical agents
```

#### 22.4 Healthcare Reference Architecture

```
Clinician/System ──► [Clinical Orchestrator]
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
[Diagnostic Agent]  [Treatment Agent]  [Records Agent]
(PHI-authorized)    (PHI-authorized)   (PHI-authorized)
         │
   HIPAA boundary: all PHI stays within VPC
   BAA required for any agent provider
   De-identify before any cross-boundary transfer
   Audit log: who accessed what, when, for whom

Identity: Clinician OIDC → OBO → agent chain
Authorization: Role-based on clinical role + patient relationship
Logging: HIPAA audit trail; 6-year retention
```

#### 22.5 Air-Gapped Deployments

For government/defense environments with no external network access:

```
Deployment:   On-premises Kubernetes (no cloud API calls)
Registry:     Local OCI registry (Harbor) with manual sync
Identity:     On-premises SPIRE with HSM-backed CA
Auth:         On-premises OAuth AS (Keycloak)
Policy:       OPA with policy bundles distributed via secure USB/airgap transfer
Observability: On-premises Prometheus + Grafana + OpenSearch (no cloud telemetry)
Updates:      Signed offline update packages; verified before application
```

#### 22.6 Multi-Cloud Deployment

```
AWS Region                    Azure Region               GCP Region
┌────────────────┐           ┌────────────────┐         ┌───────────────┐
│ Agent Fleet A  │           │ Agent Fleet B  │         │ Agent Fleet C │
│ (EKS + SPIRE)  │           │ (AKS + SPIRE)  │         │ (GKE + SPIRE) │
│ Bedrock models │           │ Azure OpenAI   │         │ Vertex AI     │
└───────┬────────┘           └───────┬────────┘         └──────┬────────┘
        │                            │                          │
        └───────────── SPIFFE Federation (trust domain mesh) ──┘
                                     │
                    Global A2A Gateway (Cloud-neutral)
                    Global Policy Engine (OPA)
                    Global Registry (replicated)
```

Cross-cloud identity: SPIFFE Federation between trust domains. Each region's SPIRE server federates with others via signed bundle exchange. Agents in any region can authenticate to agents in any other region using their SVID.

---

### 23. Governance Operating Model

#### 23.1 Agent Onboarding Workflow

```
Developer submits Agent Card + SBOM
         │
         ▼
Automated checks (5 min):
• Schema validation
• Capability contract existence
• SBOM completeness
• Known vulnerability scan
• Duplicate detection
         │
    Pass/Fail
         │ Pass
         ▼
Security review (24h SLA):
• Auth mechanism approval
• Permission scope review
• Data classification alignment
• Threat model adequacy
         │
         ▼
Domain Architect review (48h SLA):
• Capability claims verification
• Cross-domain impact assessment
• SLO feasibility review
         │
         ▼
Dual-sign approval → Registry publication
```

#### 23.2 Agent Lifecycle Governance

| Stage | Responsible | Review Trigger |
|-------|-------------|----------------|
| **Active** | Agent owner | Quarterly security review; change-triggered review |
| **Deprecated** | Agent owner + Platform Eng | Consumer migration tracking; forced sunset date |
| **Suspended** | Security team | Security incident; trust score < 0.3 |
| **Retired** | Registry team | All consumers migrated; 90-day post-deprecation |
| **Emergency revocation** | Security Architect | Zero-day; confirmed compromise; <1 hour target |

#### 23.3 Risk Classification

| Risk Tier | Criteria | Controls |
|-----------|----------|---------|
| **Tier 1 (Critical)** | PCI data, PHI, financial transactions, identity management | HSM-backed identity; TEE; human HITL; real-time monitoring; quarterly pentest |
| **Tier 2 (High)** | PII, internal financial data, regulated workflows | SPIFFE SVIDs; strong auth; daily audit review; annual pentest |
| **Tier 3 (Medium)** | Internal operational data, non-regulated workflows | Standard SPIFFE; automated auth; weekly audit review |
| **Tier 4 (Low)** | Public data, read-only, no sensitive context | OAuth client credentials acceptable; monthly audit review |

---

### 24. Compliance

#### 24.1 OWASP LLM Top 10 Mapping

| OWASP LLM Risk | A2A Exposure | Primary Control |
|----------------|-------------|-----------------|
| LLM01: Prompt Injection | Cross-agent injection (§1.5) | Message signing; content-context separation |
| LLM02: Insecure Output Handling | Tool output poisoning (§1.6) | Schema validation; output guardrails |
| LLM03: Training Data Poisoning | Memory poisoning (§1.7) | Append-only memory; provenance |
| LLM04: Model DoS | Swarm amplification (§1.14) | Fanout limits; rate limiting |
| LLM05: Supply Chain | Dependency attack (§1.17) | SLSA L3; SBOM; signed containers |
| LLM06: Sensitive Information Disclosure | Cross-agent data leakage (§1.13) | DLP; data classification tags |
| LLM07: Insecure Plugin Design | Tool call without validation | Schema validation; capability contracts |
| LLM08: Excessive Agency | Excessive privileges (§1.11) | Least privilege; JIT elevation |
| LLM09: Overreliance | Blind tool execution (§12.3) | Output validation; human gates |
| LLM10: Model Theft | Agent runtime compromise (§1.2) | TEE; SLSA; no model weights in agent container |

#### 24.2 Regulatory Compliance Matrix

| Regulation | Key A2A Requirements | Controls |
|------------|---------------------|---------|
| **PCI DSS v4** | Cardholder data must not flow through unauthorized agents; audit log of all access; strong cryptography | Data classification; PCI-isolated agent segments; HSM for crypto; immutable audit log |
| **HIPAA** | PHI authorization; BAA with agent vendors; minimum necessary access; audit controls | OBO with clinical role context; PHI tokenization; vendor BAA; HIPAA audit log |
| **GDPR** | Lawful basis for processing; data minimization; right to erasure; cross-border transfer controls | Purpose-limited OBO tokens; PII minimization in inter-agent payloads; erasure propagation; adequacy decisions for cross-region agents |
| **EU AI Act** | High-risk AI system requirements; transparency; human oversight | Risk classification of agents; HITL gates; audit trail; conformity assessment |
| **SOC 2 Type II** | Access control; audit logging; change management; incident response | All controls in this guide; evidence collection automation |
| **ISO 42001** | AI management system; risk management; documentation | Governance operating model; risk register; policy documentation |
| **DORA (EU)** | ICT third-party risk; resilience testing; RTO/RPO | Agent SLOs; resilience testing; third-party agent risk register; multi-region failover |
| **NIST AI RMF** | Govern, Map, Measure, Manage AI risks | Governance operating model; threat model; behavioral monitoring; incident response |

#### 24.3 OpenSSF / SLSA Requirements

For all production agents:
- **SLSA Level 3:** Hermetic builds; non-falsifiable provenance; build policy enforcement
- **SBOM:** SPDX or CycloneDX format; published to registry at build time; continuously scanned
- **Sigstore/Cosign:** All container images and Agent Cards signed with keyless signing
- **Vulnerability management:** CVE fix within 14 days (critical), 30 days (high), 90 days (medium)

---

### 25. A2A and Enterprise Platform Integration

#### 25.1 Microsoft Entra ID

| Capability | A2A Integration Pattern |
|-----------|------------------------|
| **Agent identity** | Entra Agent ID: first-class non-human identity; Conditional Access policies apply to agents |
| **OBO** | Microsoft OBO flow (v2 token endpoint); agent exchanges user token for downstream agent token |
| **MFA/PIM** | Agents can trigger PIM just-in-time elevation requests for human approval |
| **RBAC** | Azure RBAC roles assigned to agent managed identities; evaluated by OPA or Cedar |
| **Federated identity** | Workload Identity Federation: SPIFFE SVID → Entra access token exchange |

#### 25.2 AWS IAM and IAM Identity Center

| Capability | A2A Integration Pattern |
|-----------|------------------------|
| **Agent identity** | IAM Role per agent; role assumption via STS; Web Identity for K8s pods |
| **Cross-account** | STS AssumeRole with ExternalId; never use long-lived cross-account keys |
| **Policy enforcement** | Cedar via AWS Verified Permissions; IAM policy as guardrail; SCP for boundary |
| **Secrets** | AWS Secrets Manager with automatic rotation; agents fetch via role, not env vars |
| **OBO** | IAM Identity Center with custom attribute propagation for user context |

#### 25.3 HashiCorp Vault

The recommended secrets broker for multi-cloud A2A deployments:

```
Agent (SPIFFE SVID) ──► Vault [SPIFFE auth method] ──► Dynamic secrets (DB creds, API keys)
                                                         Short-lived (TTL = task duration)
                                                         Auto-revoked on lease expiry
                                                         Full audit log
```

Vault's dynamic secrets eliminate the need for agents to hold any long-lived credentials. Every credential is unique per agent invocation, auto-expires, and auto-revokes.

#### 25.4 Kubernetes Integration

```
Agent Pod
├── SPIRE agent (DaemonSet) → provides SVID via Unix socket
├── OPA sidecar → local policy enforcement
├── Network Policy → L3/L4 isolation between agent namespaces
├── Pod Security Standards (Restricted) → no privilege escalation
└── Workload Identity annotation → cloud API access without secrets
```

---

## Part VIII — Decision Framework

### 26. Architecture Decision Matrices

#### 26.1 Core Architecture Decisions

| Decision | Option A | Option B | When to Choose A | When to Choose B | Enterprise Recommendation |
|----------|----------|----------|-----------------|-----------------|--------------------------|
| **Centralized vs. decentralized A2A** | Central orchestrator | Peer-to-peer | Compliance requires single audit point; complex coordination | High autonomy needed; low latency between agents | Start central; federate by domain as scale grows |
| **OBO vs. service accounts** | OBO (RFC 8693) | Service identity | User accountability required; audit trail needed | Background/scheduled tasks; no live user session | OBO default; service accounts for background only |
| **OAuth vs. mTLS vs. SPIFFE** | OAuth 2.1 | mTLS + SPIFFE | Cross-domain; external partners | Same-domain; same infrastructure | SPIFFE + mTLS within domain; OAuth for cross-domain |
| **JWT vs. PASETO** | JWT | PASETO v4 | Wide ecosystem support required | Strict algorithm agility and type safety | JWT with DPoP in existing ecosystems; PASETO for greenfield |
| **OPA vs. Cedar vs. OpenFGA** | OPA | Cedar | General policy; K8s integration | AWS-native; formal verification needed | OPA for multi-cloud; Cedar for AWS-native; OpenFGA for relationship graphs |
| **Static vs. dynamic discovery** | Static | Registry-based | Critical, stable agent pairs | Enterprise scale; agent churn | Static only for emergency fallback; dynamic default |
| **Fail-open vs. fail-closed** | Fail-open | Fail-closed | Non-critical workflows; user impact unacceptable | Security-critical; regulated | Fail-closed for Tier 1–2; fail-open acceptable for Tier 4 |
| **Shared vs. isolated memory** | Isolated per agent | Shared memory | Data isolation required; different trust levels | Performance; cross-agent context needed | Isolated default; shared within same trust tier only |
| **Centralized vs. federated governance** | Central governance board | Domain-federated | Small enterprise; high compliance | Large enterprise; multiple BUs | Federated with central standards and global controls |
| **Runtime vs. pre-runtime policy** | Runtime evaluation | Pre-compiled/cached | Dynamic context required; ABAC | Performance-critical; static RBAC | Runtime for authorization; pre-runtime for capability checks |

#### 26.2 Trust and Security Decisions

| Decision | Recommendation | Reasoning | When to Override |
|----------|---------------|-----------|-----------------|
| **Signed vs. unsigned Agent Cards** | Always signed (Ed25519) | Unsigned cards are forgeable and modifiable; there is no valid reason to deploy unsigned cards in production | Never override in production |
| **Delegation depth limit** | Maximum 5 hops | Beyond 5 hops, audit trails become unmanageable and confused deputy risk grows exponentially | Increase only with compensating controls (real-time chain monitoring) |
| **Token lifetime** | SVID: 1h; Access token: 15m; Refresh: 24h | Short lifetimes limit breach window without operational friction at these durations | Decrease for Tier 1 agents; never increase |
| **Registry trust strategy** | Registry CA + per-card signature | Defense in depth: compromise of one card key doesn't compromise the registry; compromise of registry CA requires re-signing all cards | Single signature acceptable for small, low-risk deployments |
| **mTLS for internal A2A** | Mandatory | No operational reason to skip mTLS within enterprise infrastructure in 2026 | Legacy systems that cannot participate — use gateway-terminated mTLS with proxy |

---

## Appendix A — Enterprise Implementation Checklist

### Identity and Authentication
- [ ] SPIFFE/SPIRE deployed with HA (≥3 server nodes)
- [ ] All agents have unique SPIFFE SVIDs (no shared identities)
- [ ] SVID TTL ≤ 1 hour for production agents
- [ ] mTLS enforced on all A2A connections
- [ ] DPoP-bound access tokens for OAuth flows
- [ ] Cross-cloud Workload Identity Federation configured
- [ ] No static API keys or long-lived secrets in agent runtimes

### Authorization and Delegation
- [ ] Policy engine deployed (OPA/Cedar) with HA
- [ ] All A2A calls authorized via PDP (not agent-local checks)
- [ ] Delegation depth limit enforced (≤5 hops)
- [ ] RFC 8693 token exchange implemented for OBO flows
- [ ] Scope attenuation enforced at every delegation hop
- [ ] Delegation loop detection active

### Agent Cards and Registry
- [ ] All Agent Cards signed with Ed25519 or ES256
- [ ] Registry requires dual-sign approval for new registrations
- [ ] Agent Card schema validation enforced at registry ingress
- [ ] Card revocation mechanism tested
- [ ] Discovery gateway enforces caller-based discovery ACLs
- [ ] Card TTL enforced (≤1 year; shorter for high-risk agents)

### Protocol and Payload
- [ ] TLS 1.3 enforced on all A2A connections
- [ ] Nonce-based replay protection active
- [ ] Maximum payload size enforced at gateway
- [ ] JSON Schema validation at gateway ingress
- [ ] Correlation IDs (X-Request-ID) propagated through full chain
- [ ] W3C traceparent header propagated for distributed tracing
- [ ] Idempotency keys required for mutating operations

### Guardrails and Sanitization
- [ ] Prompt injection detection on inter-agent messages
- [ ] DLP scanning on cross-domain payloads
- [ ] Output guardrails for PII/sensitive content
- [ ] Human-in-the-loop gates for irreversible Tier 1 actions
- [ ] Delegation depth guardrail at token exchange
- [ ] Fanout limit per orchestration chain

### Observability
- [ ] OpenTelemetry tracing active on all agents and gateway
- [ ] Structured audit log for every A2A call
- [ ] Authorization decision logging (allow/deny + reason + policy version)
- [ ] Agent interaction graph built and anomaly detection active
- [ ] SIEM integration for security events
- [ ] Trust score computation and monitoring active

### Governance
- [ ] Agent onboarding workflow with automated + human review
- [ ] Risk tier classification for all agents
- [ ] Capability contracts published for all declared capabilities
- [ ] SBOM generated and published for all agent builds
- [ ] SLSA Level ≥ 2 (target Level 3) for production agents
- [ ] Quarterly security review process for all Tier 1–2 agents
- [ ] Deprecation and sunset process documented and tested

---

## Appendix B — Glossary

| Term | Definition |
|------|-----------|
| **A2A** | Agent-to-Agent protocol — the Google-donated, Linux Foundation–governed standard for inter-agent communication |
| **ABAC** | Attribute-Based Access Control — authorization decisions based on arbitrary attributes of subjects, resources, and environment |
| **Actor token** | JWT claim (`act`) carrying the identity of the intermediate service acting on behalf of the subject in RFC 8693 delegation chains |
| **Agent Card** | A2A's machine-readable descriptor of an agent's identity, capabilities, skills, and authentication requirements |
| **Attestation** | Cryptographic proof that a workload has specific measurable properties (image digest, platform, configuration) |
| **CBOR** | Concise Binary Object Representation — compact binary encoding alternative to JSON |
| **Cedar** | Amazon's policy language with formal verification properties; backing AWS Verified Permissions |
| **Confused deputy** | A privilege escalation pattern where a higher-privilege agent is induced to act on behalf of a lower-privilege caller beyond what that caller is authorized to do |
| **DPoP** | Demonstrating Proof of Possession — mechanism that binds an OAuth access token to a client's ephemeral key pair, preventing token theft replay |
| **Federation** | Trust relationship between separate identity domains enabling cross-domain authentication without shared secrets |
| **HITL** | Human-in-the-Loop — workflow pattern requiring human review and approval before an agent takes an action |
| **JWT-SVID** | A SPIFFE Verifiable Identity Document encoded as a JSON Web Token |
| **Nonce** | Number used once — cryptographically random value preventing replay attacks |
| **OBO** | On-Behalf-Of — OAuth delegation pattern where an agent acts with a user's authorization while maintaining its own identity |
| **OPA** | Open Policy Agent — CNCF policy engine using the Rego language |
| **OpenFGA** | Open Fine-Grained Authorization — open-source implementation of Google's Zanzibar relationship-based access control |
| **PASETO** | Platform-Agnostic Security Token — JWT alternative with constrained algorithms preventing common JWT vulnerabilities |
| **PBAC** | Policy-Based Access Control — authorization driven by declarative policies rather than role assignments |
| **PDP** | Policy Decision Point — the component that evaluates authorization policies and returns allow/deny |
| **PEP** | Policy Enforcement Point — the component that intercepts requests and enforces PDP decisions |
| **ReBAC** | Relationship-Based Access Control — authorization based on relationships between entities in a graph |
| **RFC 8693** | OAuth 2.0 Token Exchange — IETF standard for exchanging tokens for delegation and impersonation |
| **SLSA** | Supply-chain Levels for Software Artifacts — OpenSSF framework for supply-chain security maturity |
| **SPIFFE** | Secure Production Identity Framework For Everyone — CNCF specification for workload identity |
| **SPIRE** | SPIFFE Runtime Environment — CNCF reference implementation of the SPIFFE specification |
| **SVID** | SPIFFE Verifiable Identity Document — the identity document issued by SPIRE (X.509 or JWT format) |
| **TEE** | Trusted Execution Environment — hardware-isolated execution context (AMD SEV-SNP, Intel TDX) |
| **Trust domain** | A SPIFFE administrative boundary; agents within a domain share the same SPIRE CA |
| **Workload Identity Federation** | Cloud-native mechanism to accept external OIDC/SAML assertions in exchange for cloud-native credentials |
| **Zanzibar** | Google's internal ReBAC system; the design basis for OpenFGA |

---

## Appendix C — Standards and References

### A2A Protocol
- A2A Specification v1.x — Linux Foundation Agentic AI Foundation (2026)
- A2A Agent Card JSON Schema — `schema.a2a.org/agent-card/v1`

### OAuth, OIDC, Identity
- RFC 6749 — The OAuth 2.0 Authorization Framework
- RFC 9449 — OAuth 2.0 Demonstrating Proof of Possession (DPoP)
- RFC 8693 — OAuth 2.0 Token Exchange
- RFC 7519 — JSON Web Token (JWT)
- RFC 8414 — OAuth 2.0 Authorization Server Metadata
- IETF WIMSE WG — Workload Identity in Multi-Service Environments (draft)
- IETF AIMS — Agent Identity Management System (March 2026 draft)
- OpenID Connect Core 1.0
- OpenID Connect for Identity Assurance 1.0

### Security Standards
- OWASP LLM Top 10 — 2025 edition
- NIST AI Risk Management Framework (AI RMF) 1.0
- NIST SP 800-207 — Zero Trust Architecture
- CSA AI Controls Matrix (2026)
- ISO/IEC 42001:2023 — AI Management Systems
- ISO/IEC 27001:2022 — Information Security Management

### Supply Chain and Platform
- SLSA Framework v1.0 — OpenSSF
- OpenSSF Scorecard
- Sigstore / Cosign / Rekor — keyless signing infrastructure
- SPDX 2.3 / CycloneDX 1.6 — SBOM standards
- SPIFFE/SPIRE — CNCF (spiffe.io)
- OPA — CNCF (openpolicyagent.org)
- OpenFGA — CNCF (openfga.dev)
- Cedar — Amazon (cedarpolicy.com)

### Observability
- OpenTelemetry Specification — CNCF
- W3C Trace Context — W3C
- Langfuse, Phoenix (Arize), Arize AI — A2A-aware LLM observability platforms

### Regulatory
- EU AI Act — Regulation (EU) 2024/1689
- DORA — Regulation (EU) 2022/2554
- GDPR — Regulation (EU) 2016/679
- HIPAA Security Rule — 45 CFR Part 164
- PCI DSS v4.0 — PCI Security Standards Council
