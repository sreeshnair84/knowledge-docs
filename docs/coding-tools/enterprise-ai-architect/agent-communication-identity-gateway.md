---
title: Agent Communication, Identity, Authorization & AI Gateway
---

# Agent Communication, Identity, Authorization & AI Gateway

> **Current as of July 2026.** This guide covers the connective tissue of an agent platform: how agents communicate (channel catalog, delivery semantics, sagas), how every action is attributed to a cryptographically verifiable identity chain, how authorization composes (RBAC → ABAC → ReBAC → capability tokens → risk overlay), and the AI gateway as the single mediated path for all inference traffic. Volume 2 of the harness series ([Vol 1: Harness & Orchestration](ai-harness-architecture-orchestration.md), [Vol 3: MCP & A2A Deep Dive](mcp-a2a-protocol-deep-dive.md)). For the credential/identity standards stack (SPIFFE/SPIRE deployment, OWASP ASI, Entra Agent ID), see [Agentic AI Security & Identity](agentic-ai-security-identity.md); for a concrete gateway implementation, see the [Kong AI Gateway guides](../../cloud-platforms/ai-gateway/index.md).

---

## 1. Agent Communication

### 1.1 Mechanism Catalog

| Mechanism | Role in agent systems | Strengths | Weaknesses / cautions |
|-----------|----------------------|-----------|----------------------|
| **A2A** | Cross-framework/cross-org agent↔agent tasks (Agent Cards, task lifecycle, Artifacts; JSON-RPC + gRPC bindings, SSE streaming) | Vendor-neutral; discovery + auth + streaming + task states in one spec; Signed Agent Cards for trust | Young operational tooling; you still need your own contract/entitlement layer per remote agent |
| **MCP** | Agent↔tool/data (tools, resources, prompts; 2026-07-28: stateless HTTP core, Tasks extension) | Dominant tool standard (~10k public servers); OAuth-aligned authZ; LB-friendly (Mcp-Method/Mcp-Name headers, no protocol sessions) | Tool descriptions are an injection surface; registry/trust of third-party servers is on you |
| **HTTP/REST** | Synchronous service calls; the substrate under MCP/A2A | Universal; gateway/WAF ecosystem mature | Request/response only; you build retries, idempotency, streaming semantics |
| **gRPC** | Low-latency internal agent↔service; A2A binding | Streaming, deadlines, typed contracts, mTLS-native | Browser/edge friction; schema governance required |
| **WebSocket** | Bidirectional UX streaming; realtime voice/agent consoles | Full duplex, low latency | Stateful connections fight autoscaling; prefer SSE/streamable HTTP where one-directional |
| **Kafka / Redis Streams** | Event backbone; agent work distribution; replayable history | Replay = audit + reprocessing; consumer groups; ordering per partition/key | Ordering only per key; consumer lag = hidden latency; poison messages need DLQ design |
| **SQS/SNS, EventBridge** | Managed queueing/fan-out/routing (rules, schedules) | Zero-ops; DLQ, redrive, filtering built in | Standard SQS = at-least-once, unordered; FIFO for ordering at throughput cost |
| **Shared memory / vector store / KG** | Blackboard-style indirect coordination | Decouples producers/consumers of knowledge | Poisoning + staleness; must carry provenance and ACLs ([Memory & Planning](agent-memory-planning-architecture.md)) |
| **Shared filesystem / Git workspace** | Coding agents coordinating via repo (Claude Code, OpenHands, Copilot agents) | Artifacts diffable, reviewable, versioned; Git = free audit + rollback + branch isolation | Merge conflicts as coordination failures; secrets-in-workspace risk |
| **CRDTs** | Conflict-free concurrent state (shared docs/plans) | No coordination needed for convergence | Semantics limited to CRDT types; "converged" ≠ "correct" |
| **Pub/Sub (generic)** | Ambient/reactive agents | Decoupling, N consumers | Delivery/ordering guarantees vary; design for dupes |

### 1.2 Delivery Semantics and Distributed Consistency

:::danger Exactly-once delivery does not exist end-to-end
    Production systems achieve **effectively-once processing** = at-least-once delivery + **idempotent consumers**. Everything below follows from accepting this.

**Idempotency keys on every mutating tool call** (Stripe's pattern): `key = hash(task_id, step_id, action_fingerprint)`; tool backends dedupe. This single control neutralizes retry storms, duplicate deliveries, and replay after checkpoint resume.

**Ordering:** only guarantee it where semantics require it (per-task partition key). Cross-task global ordering is an anti-requirement.

**Distributed transactions:** do **not** attempt 2PC across tools. Agent workflows are long-lived → use **Sagas**: each step has a registered *compensating action* in the tool registry (book→cancel, create→delete, send→recall-or-notify). The workflow engine (Temporal) executes compensation on failure. Steps without possible compensation (external emails, payments) are **pivot points**: require pre-commit approval gates and place them as late as possible in the plan.

**State replication between agents:** prefer artifact-passing (immutable snapshots via object-store references) over live shared mutable state; where live sharing is required, use versioned reads (optimistic concurrency) or CRDTs for the narrow types that fit.

**Consistency model to promise internally:** read-your-writes within a task; eventual across agents; causal where the event bus preserves per-key order. **Document this** — agents that assume stronger consistency generate phantom "bugs."

### 1.3 Choosing the Channel

| Situation | Channel |
|-----------|---------|
| Synchronous capability invocation | MCP |
| Delegating a *task with lifecycle* to another agent | A2A |
| Decoupled reaction to business facts | Events |
| Large artifacts | Object store / Git references passed **by handle** — never inlined into context |
| Anything crossing an org boundary | A2A over mTLS with signed cards + contract allowlist |

---

## 2. Authentication and Identity

### 2.1 The Identity Chain and the Delegation Gap

Every action must be attributable to a chain — **human principal → agent identity → sub-agent → tool/MCP server → downstream API** — with each link cryptographically verifiable.

The central design problem of 2025–26 agent security is the **delegation gap**: OAuth was built for "app acts for user," not "ephemeral agent #4711, spawned by agent A, acts for user U within task T." The production answers:

### 2.2 Identity per Boundary

| Boundary | Mechanism | Notes |
|----------|-----------|-------|
| **Human** | OIDC (enterprise IdP: Entra/Okta/Ping); phishing-resistant MFA for approval actions | Human identity anchors the chain; approvals re-authenticate for high-risk actions (step-up) |
| **Agent (workload)** | SPIFFE/SPIRE SVIDs (X.509 or JWT) issued per runtime via node+workload attestation; or cloud-native equivalents (IAM roles, Entra Workload ID, GCP WIF) | Agents get *born* with identity from platform attestation — never from baked-in secrets. SVID TTL minutes, auto-rotated |
| **Sub-agent** | Child SVID or STS-minted scoped token derived from parent, carrying task context; spawn depth + scope monotonically non-increasing | Delegation must only **narrow** privileges |
| **Tool / MCP server** | OAuth 2.1 per MCP auth spec: MCP server = resource server; tokens audience-bound via RFC 8707 resource indicators (mandatory since 2025-06) | Never pass through the user's upstream token to downstream APIs — "token passthrough" is explicitly forbidden by the spec |
| **External API** | Token exchange (RFC 8693) at an internal STS: agent presents its SVID + user context → receives short-lived, audience- and scope-narrowed access token | **The STS is where enterprise delegation policy lives** |
| **Infrastructure** | mTLS everywhere via service mesh; no ambient instance credentials inside agent sandboxes | Sandbox egress through identity-aware proxy |

SPIFFE deployment detail, OWASP ASI mapping, and Entra Agent ID coverage: [Agentic AI Security & Identity](agentic-ai-security-identity.md).

### 2.3 Token and Credential Doctrine

- **Everything short-lived.** Access tokens ≤15 min for agent contexts; SVIDs minutes-scale; refresh handled by platform, never by agent code. Rotation is continuous by construction; revocation ≈ "stop renewing."
- **Sender-constrained tokens:** DPoP (RFC 9449) or mTLS-bound tokens for any token an agent carries across a network hop — a stolen bearer token from a compromised sandbox must be useless elsewhere.
- **Context/capability tokens:** embed `task_id`, purpose, human principal, and expiry as claims; downstream PEPs authorize on the *tuple*, not just the subject. This is practical capability-based security: possession of a narrowly-scoped, unforgeable token *is* the authorization (macaroon/Biscuit-style attenuation where supported).
- **Cryptographic delegation chain:** each hop signs a delegation assertion (`act` claim in RFC 8693 token exchange), producing an auditable chain: the sub-agent's token contains `act:\{agent-A}`, `sub:\{user}`, `task`, `aud:\{tool}`. Emerging OAuth work on agent on-behalf-of chains standardizes this; until then, the internal STS enforces it.
- **DCR + issuer discipline (MCP):** Dynamic Client Registration against the enterprise AS; MCP 2026-07-28 hardens this (RFC 9207 `iss` validation, AS-bound credentials, declared `application_type`) — adopt now, these close real mix-up attacks.
- **Attestation:** SPIRE attestors verify *what* is running (image digest, node, k8s SA) before issuing identity — the anti-impersonation control. **Identity without attestation is a name, not a proof.**
- **Secrets:** agents never see long-lived secrets; tool credentials live in the tool-execution layer / secrets manager, injected per-call server-side.

---

## 3. Authorization

### 3.1 Model Selection

| Model | Use in agent platforms |
|-------|----------------------|
| **RBAC** | Baseline entitlements: which roles may *deploy/invoke* which agents. Too coarse alone — agents explode role counts |
| **ABAC** | The workhorse: decisions over attributes of principal (human+agent chain), action, resource, and *context* (task purpose, risk score, time, data classification, environment) |
| **ReBAC** | Zanzibar-style (SpiceDB/OpenFGA) for data-scoped questions: "may this agent read *this* document?" — mirrors doc/folder/org graphs; ideal for memory & retrieval ACLs |
| **PBAC / Policy-as-Code** | The delivery mechanism for all of the above: **Cedar** (AWS Verified Permissions; formally verified evaluator, default-deny, forbid-overrides-permit) or **OPA/Rego** (CNCF, ubiquitous in k8s/gateways) |
| **Capability tokens** | Runtime least-privilege: mint per-task capability sets; the agent literally cannot name actions outside its granted tool manifest |
| **Risk-/context-aware** | Dynamic overlay: risk engine scores each action (novelty, blast radius, data sensitivity, anomaly signals) → thresholds map to allow / allow-with-logging / require-approval / deny |

**Recommended composite:** RBAC for coarse entitlements → ABAC/Cedar for per-action decisions → ReBAC for data access → capability manifests at runtime → risk engine for HITL escalation.

### 3.2 Policy Mechanics

**Evaluation order & conflict resolution:** adopt Cedar semantics platform-wide even if using OPA: default deny; explicit *forbid* always beats *permit*; most-specific-scope wins only via explicit policy structure, never implicit precedence. Document the algebra — ad-hoc precedence is where audit findings live.

**Composition & inheritance:** layer policies as:

1. **Platform invariants** — non-overridable forbids (no prod-DB writes without approval, no PII egress to unapproved models)
2. **Domain policies**
3. **Team/agent policies**
4. **Task-scoped grants**

Lower layers may only *restrict*, never *expand*. Enforce via a policy-bundle build pipeline — policies are code: PR review, tests, CI, signed bundles.

**Dynamic policy:** context attributes (risk score, budget remaining, kill-switch flags) are injected at decision time from the platform; the *policy text* stays static and versioned — dynamism lives in data, not in mutating rules.

**Versioning & audit:** every PDP decision logs `\{policy bundle hash, request tuple, decision, obligations}`. Replayability of authorization decisions is a regulator-grade requirement (EU AI Act logging, SOC2 CC6).

**Delegated authority:** delegation grants are first-class objects `\{grantor, grantee agent, scope, task, expiry, revocation handle}` stored centrally; the STS consults them when minting tokens — this unifies §2 identity with §3 policy.

**Where PEPs sit:** AI gateway (model actions), tool gateway/MCP proxy (tool calls), memory service (reads/writes), A2A edge (inter-agent), workflow engine (step transitions). **One PDP, many PEPs**; decisions cached ≤ seconds with event-driven invalidation.

---

## 4. The AI Gateway

### 4.1 Why It Exists

Without a gateway, every team wires model credentials into app code: no unified audit, no cost control, no kill switch, no redaction, N incompatible provider SDKs, and compliance evidence scattered across services. The AI gateway (LiteLLM / Portkey / Kong AI / Cloudflare AI Gateway / Apigee-class, or in-house on Envoy) is the **single mediated path for all inference traffic** — the model-side twin of the API gateway.

**Placement:** between the agent plane and all model providers (internal and external), and increasingly also as (or beside) the MCP/tool gateway mediating the action side.

### 4.2 Responsibility Matrix

| Responsibility | Implementation notes |
|----------------|---------------------|
| **Authentication** | Terminate workload identity (SVID/OIDC); virtual keys per team/agent, mapped to real provider creds held only here |
| **Authorization** | PEP → PDP call per request: may this agent use this model/feature (tools, vision) at this size for this data class? |
| **Prompt inspection** | Injection classifiers, policy screens; inspect *before* spend |
| **PII redaction** | Deterministic detectors (Presidio-class) + format-preserving tokenization on egress to external models; de-tokenize on response where permitted; residency-aware |
| **Rate limiting & quotas** | Token-based (not just RPS) limits per tenant/agent/task; concurrency caps; fair-share under provider throttling |
| **Routing & model routing** | Policy-driven: task class → model tier; residency pinning; capability fallbacks (provider outage → alternate) with **semantic equivalence classes** declared in the registry |
| **Cost management** | Real-time meter per request → budget check pre-flight; downgrade-or-halt obligations from policy |
| **Caching** | Exact + semantic caching with **cache scope keys** (tenant, data-class) — never share caches across trust domains; honor provider prompt-caching for KV reuse |
| **Audit & provenance** | Immutable log of full request/response (evidence store, access-controlled), trace-ID linked; **prompt provenance tags** on every context segment (origin: user / system / retrieval / tool-result) so injection forensics can reconstruct who said what |
| **Tool mediation & response filtering** | Validate tool-call JSON against registered schemas; strip/flag hallucinated tools; output safety pass (secrets/PII/policy) before returning |
| **Tenant isolation** | Per-tenant keys, headers, quotas, caches; no cross-tenant batching |
| **Context validation** | Enforce context budget, reject over-window, verify required policy header present (tamper-evident system-prompt hash) |

:::tip Sizing / HA
    The gateway is on the hot path of every token — engineer it like an L7 load balancer: stateless, horizontally scaled, p99 added-latency budget < 20–30 ms *excluding* safety models. Run heavy classifiers async-parallel with fast deterministic checks inline.

---

## 5. How Industry Implements

**Gateway landscape (2026).** The market has settled into clear niches: **LiteLLM** as the open-source standard (self-hosted container, 100+ providers behind an OpenAI-compatible endpoint) for teams that want control; **Portkey** for managed production routing with prompt/model-aware observability and guardrails; **Kong AI Gateway** for enterprises already operating Kong's API platform — plugin ecosystem, SSO, PII redaction (see the [Kong AI Gateway guide](../../cloud-platforms/ai-gateway/kong-ai-gateway-guide.md) and [Kong + Entra ID integration](../../cloud-platforms/ai-gateway/kong-entra-id-integration.md) in this knowledge base); **Cloudflare AI Gateway** for near-zero-setup edge caching. Decision heuristic from the field: greenfield AI-only → LiteLLM/Portkey; existing API-platform estate → extend it; results-today → managed edge.

**Identity in managed platforms.** Azure AI Foundry Agent Service issues an **Entra identity per agent** — the "agent as first-class directory principal" pattern. AWS AgentCore Identity provides workload identity + credential brokering for agents, and AgentCore Gateway holds tool credentials server-side (agents never see them) — the §2.3 secrets doctrine as a managed service.

**Financial services.** Banks apply the §3.1 composite directly: A2A internal agent directories at scale for trade reconciliation and KYC, with dual-control on funds-adjacent pivot steps and full decision replay for SR 11-7 / DORA evidence — the PDP decision log *is* the regulator artifact.

**The convergence signal.** Gateways are absorbing the tool side: MCP gateways route on the 2026-07-28 `Mcp-Method`/`Mcp-Name` headers without body parsing, and production operators (Uber's platform team among them) report the gateway+registry combination does "most of the real work" of agent governance ([Vol 3 §4](mcp-a2a-protocol-deep-dive.md#4-discovery-registry-versioning-trust)).

---

## 6. Architect's Checklist

- [ ] Idempotency keys on every mutating tool call; compensations registered per step; pivot points approval-gated and placed late
- [ ] Consistency model documented and promised (read-your-writes in-task, eventual across agents)
- [ ] Identity chain verifiable end-to-end: OIDC human anchor → attested workload identity → narrowing sub-agent delegation → audience-bound tool tokens
- [ ] No token passthrough anywhere; RFC 8707 resource indicators on all MCP tokens
- [ ] All tokens ≤15 min, sender-constrained (DPoP/mTLS-bound) across network hops
- [ ] Delegation grants stored as first-class objects; STS consults them at mint time
- [ ] Policy layering enforced: platform invariants non-overridable; lower layers restrict only
- [ ] Every PDP decision logged with policy bundle hash — replayable for audit
- [ ] One AI gateway on the path of all model traffic; virtual keys; provider creds only in the gateway
- [ ] Prompt provenance tags on every context segment
- [ ] Gateway p99 added latency < 20–30 ms; heavy classifiers async
- [ ] Per-tenant cache scope keys; no cross-tenant batching

---

## Sources

- [TrueFoundry — A Definitive Guide to AI Gateways in 2026](https://www.truefoundry.com/blog/a-definitive-guide-to-ai-gateways-in-2026-competitive-landscape-comparison)
- [Lushbinary — AI Gateway Comparison: LiteLLM vs Portkey vs Cloudflare vs Kong](https://lushbinary.com/blog/ai-gateway-llm-routing-comparison-litellm-portkey-cloudflare/)
- [Deepak Gupta — Top 5 AI Gateways 2026](https://guptadeepak.com/tools/top-5-ai-gateways-2026/)
- [Microsoft Learn — Foundry Agent Service overview](https://learn.microsoft.com/en-us/azure/foundry/agents/overview)
- [AWS — Building multi-tenant agents with Amazon Bedrock AgentCore](https://aws.amazon.com/blogs/machine-learning/building-multi-tenant-agents-with-amazon-bedrock-agentcore/)
- [Linux Foundation — A2A Protocol Surpasses 150 Organizations](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year)
- Volume 2, *Multi-Agent AI Harness Architecture (2026) — Production Reference Guide*
