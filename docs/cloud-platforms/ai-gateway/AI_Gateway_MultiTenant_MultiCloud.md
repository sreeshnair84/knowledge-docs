---
title: "AI GATEWAY"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "AI_Gateway_MultiTenant_MultiCloud.pdf"
doc_type: guide
tags: ["cloud-platforms"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# AI GATEWAY

Multi-Tenant · Multi-Cloud · Data Ownership

Scaling Patterns · Isolation Architecture · Data Sovereignty · Cross-Cloud Governance · Tenant Lifecycle Management

<mark>Enterprise AI Architecture Practice · April 2026 · Addendum 02</mark> Version 1.0 · CONFIDENTIAL

|**CHA**|**PTER —**<br>**Table of Contents**|
|---|---|
|**A**|**The Multi-Tenancy Problem Space**|
||· Tenancy Models & Trade-offs<br>· Isolation Failure Modes|
|**B**|**Multi-Tenant Gateway Architecture**|
||· Control Plane vs Data Plane Isolation<br>· Namespace, Shard & Cell Patterns<br>· Tenant Lifecycle Management|
|**C**|**Multi-Cloud Gateway Design**|
||· Cloud-agnostic Routing Fabric<br>· Cross-Cloud Failover & Latency Routing<br>· Provider Abstraction Layer|
|**D**|**Data Ownership & Sovereignty**|
||· Data Residency Enforcement<br>· Tenant Data Isolation Guarantees<br>· Prompt & Completion Data Lifecycle<br>· Right-to-Erasure (GDPR Art. 17)|
|**E**|**Scaling Architecture**|
||· Horizontal & Vertical Scaling Patterns<br>· Token-throughput Autoscaling<br>· Global Anycast & Edge PoPs|
|**F**|**Cost Attribution & FinOps at Scale**|
||· Chargeback Models<br>· Budget Guardrails per Tenant|
|**G**|**Governance at Scale**|
||· Policy Federation<br>· Audit at Multi-tenant Scale<br>· Compliance Matrix by Cloud & Region|
|**H**|**Reference Patterns & Snippets**|

**CHAPTER A**

## The Multi-Tenancy Problem Space

As enterprises scale AI capabilities across business units, geographies, products, and customer-facing SaaS offerings, the AI gateway must serve dozens to thousands of distinct **tenants** — each with unique identity, data, quota, policy, and compliance requirements. The naive approach of shared infrastructure without isolation boundaries creates catastrophic risks: data cross-contamination, quota exhaustion by noisy neighbours, compliance scope explosion, and blast-radius amplification on security incidents.

### A.1 Tenancy Models & Trade-offs

Three primary tenancy models exist, positioned on a spectrum from maximum isolation (maximum cost) to maximum density (minimum cost). The choice is driven by regulatory classification of tenant data, SLA tier, and scale economics:

|**SILO**|Dedicated gateway +<br>infra per tenant|IMaximum isolationI<br>Zero noisy-neighbourI<br>Simple audit scope|IIHighest costII<br>Slow provisioningII<br>Operational complexity|*Regulated: HIPAA,*<br>*FedRAMP High-value*<br>*enterprise accounts*|
|---|---|---|---|---|
|**BRIDG**<br>**E**|Shared gateway,<br>isolated namespaces &<br>dedicated DB schemas<br>per tenant|IStrong isolationI<br>Moderate costIFast<br>provisioning|IINamespace escape<br>riskIIShared control<br>plane|*Mid-market SaaS Internal*<br>*BU isolation*|
|**POOL**|Fully shared gateway,<br>tenant ID as runtime<br>context only|ILowest costIHighest<br>densityISimplest ops|IIWeakest isolation<br>IINoisy neighbour<br>riskIIWidest blast<br>radius|*Free/trial tiers Low-risk*<br>*internal tools*|

### A.2 Isolation Failure Modes

Understanding failure modes is prerequisite to designing mitigations. The following taxonomy covers the critical ways multi-tenant AI gateway isolation breaks down in production:

#### Token Budget Cross-contamination

**Problem:** A tenant's token counter stored in a shared Redis key namespace collides with another tenant's key due to inadequate key prefixing. Tenant A exhausts Tenant B's daily budget or reads Tenant B's usage telemetry.

**Mitigation:** Mitigation: Tenant-scoped Redis keyspaces with ACL isolation per tenant. Key schema: **gw:{tenant_id}:quota:{model}:{window}** . Redis AUTH per tenant key range.

#### Prompt/Completion Data Leakage via Cache

**Problem:** A semantically similar prompt from Tenant A hits a vector cache entry populated by Tenant B's prior request. Tenant B's proprietary completion is returned to Tenant A.

**Mitigation:** Mitigation: Cache partition by tenant_id as mandatory primary key. Vector index is per-tenant (separate pgvector schema or Qdrant collection). Cross-tenant cache lookups are architecturally impossible.

#### Rate-limit Bypass via Header Spoofing

**Problem:** A malicious tenant crafts requests with a spoofed X-Tenant-ID header, routing their traffic against another tenant's quota bucket.

**Mitigation:** Mitigation: Tenant identity is derived exclusively from verified JWT claims (sub, tenant_id) or mTLS certificate SAN — never from user-supplied headers. Headers are stripped and re-injected by the gateway after authentication.

#### Audit Log Commingling

**Problem:** All tenant request logs written to a shared stream with insufficient partitioning. Compliance audit for Tenant A inadvertently surfaces Tenant B's prompt content.

**Mitigation:** Mitigation: Separate log streams per tenant (Kafka topic-per-tenant or S3 prefix-per-tenant with bucket policies). SIEM ingestion filters enforced at the collector level.

#### Model Version Drift

**Problem:** A gateway-wide model upgrade (e.g., GPT-4o → GPT-4o-mini for cost optimisation) changes output quality for tenants who pinned contract SLAs against specific model versions.

**Mitigation:** Mitigation: Per-tenant model pinning stored in tenant configuration registry. Upgrade rollouts use tenant-scoped canary deployments with A/B quality comparison.

## Multi-Tenant Gateway Architecture

### B.1 Control Plane vs Data Plane Isolation

The gateway separates its concerns into a **Control Plane** (configuration, policy, identity, quota) and a **Data Plane** (request processing, routing, provider communication). Isolation strategies differ by plane:

|**CONTROL**|`Tenant Registry`I`Policy Store (OPA)`I`Quota Engine`I`Config API`I`Admin Portal`|
|---|---|
|**SYNC**|`Config Push (gRPC)`I`Policy Distribution (bundle)`I`Quota Sync (Redis)`|
|**DATA**|`Auth Plugin`I`Rate Limiter`I`Cache (tenant-scoped)`I`Router`I`Provider Proxy`|
|**PROVIDERS**|`OpenAI`I`Anthropic`I`Azure OpenAI`I`Bedrock`I`Vertex AI`I`On-prem LLM`|
|**OBSERVE**|`Per-tenant Metrics`I`Isolated Audit Logs`I`Tenant Cost Dashboard`|

The control plane is a singleton per region, managing all tenant configurations. The data plane is horizontally scaled and stateless — tenant context is resolved per-request from JWT claims without shared memory. This allows the data plane to scale independently of control plane operations.

### B.2 Namespace, Shard & Cell Patterns

#### Namespace Pattern

All gateway resources (routes, plugins, consumers, credentials) are namespaced under a tenant_id prefix. In Kong, this maps to separate Workspaces. In Kubernetes, to separate Namespaces with NetworkPolicies. Namespaces share the same gateway binary but enforce logical separation via RBAC and plugin scoping.

#### Shard Pattern

High-throughput tenants are assigned dedicated gateway shard(s) — isolated Kubernetes Deployments with dedicated node pools. A global Layer-7 dispatcher routes tenant traffic to the correct shard based on tenant_id extracted from the JWT. Shards share no Redis, no vector cache, and no audit log infrastructure.

- I **`Shard Pattern — snippet`**

```
# Nginx upstream shard dispatcher (snippet)
```

```
map $jwt_tenant_id $backend_shard {
~^acme-.* shard-enterprise-a; # dedicated shard
~^startup-.* shard-pooled-b; # shared shard
default shard-pooled-default;
}
upstream shard-enterprise-a {
server gw-enterprise-a-1.internal:8000;
server gw-enterprise-a-2.internal:8000;
}
```

#### Cell Architecture

For hyperscale (10,000+ tenants), the gateway adopts a Cell architecture: a cell is a fully self-contained stack (gateway + cache + quota store + audit log) serving a cohort of ~500 tenants. Cells are independently deployable, upgradable, and fault-isolated. A global cell-router maps tenant_id → cell_id via a consistent hash ring, allowing cell addition without rehashing all tenants.

I **`Cell Architecture — snippet`** <mark>`# Cell assignment via consistent hash (Python concept) ring = ConsistentHashRing(vnodes=150) ring.add_nodes(['cell-us-east-1', 'cell-us-west-2', 'cell-eu-west-1']) def route_tenant(tenant_id): cell = ring.get_node(tenant_id) # deterministic return CELL_ENDPOINTS[cell]`</mark>

### B.3 Tenant Lifecycle Management

Tenant onboarding and offboarding must be fully automated via a Tenant Management API. Manual provisioning at scale introduces drift, security gaps, and compliance violations:

|**Onboar**<br>**d**|Tenant record created · Workspace/Namespace provisioned · Virtual keys issued · Quota bucket initialised ·<br>OPA policy bundle deployed · Audit log stream created · Tenant admin notified|
|---|---|
|**Suspen**<br>**d**|All virtual keys revoked · Rate limit set to 0 · Active connections drained gracefully · Data plane routes<br>disabled · Control plane config frozen · Audit log sealed|
|**Offboar**<br>**d**|All keys deleted · Routes removed · Cache entries purged · Audit logs archived to cold storage with retention<br>policy · Data deletion workflow triggered (GDPR Art. 17) · Compliance certificate of deletion issued|

##### CHAPTER C

## Multi-Cloud Gateway Design

Multi-cloud AI gateway deployments address three distinct organisational drivers: **resilience** (avoid single-cloud outage dependency), **compliance** (data residency requires specific cloud regions or on-prem), and **best-of-breed** (Azure OpenAI for Microsoft 365 integration, Bedrock for AWS-native workloads, Vertex for GCP-native ML pipelines). The gateway must present a unified plane while being physically deployed across AWS, Azure, GCP, and on-prem simultaneously.

### C.1 Cloud-Agnostic Routing Fabric

**GLOBAL LB** `Cloudflare/Anycast DNS` I `GeoDNS / Latency routing` I `Health-based failover` **REGIONAL** `AWS: Kong on EKS (us-east-1)` I `Azure: Kong on AKS (eu-west)` I `GCP: Kong on GKE (asia-se)` **GW** `WireGuard tunnels / Transit Gateway` I `mTLS cross-cloud service accounts` I `BGP anycast` **MESH LINK** `(on-prem) AWS Bedrock (same-cloud preference)` I `Azure OpenAI (same-cloud)` I `GCP Vertex (same-cloud)` **PROVIDERS** I `OpenAI (any cloud) Global Kong Admin API (read-only replicas)` I `Centralised OPA bundle server` I `Shared Vault` **CONTROL** `(HA active-active)`

The routing fabric follows a **same-cloud-preferred** policy: a request entering the AWS regional gateway prefers AWS Bedrock models to avoid cross-cloud data egress costs and latency. Cross-cloud routing is triggered only on health failure, capacity exhaustion, or explicit tenant policy override.

### C.2 Cross-Cloud Failover & Latency Routing

### C.3 Provider Abstraction Layer

The Provider Abstraction Layer (PAL) normalises heterogeneous provider APIs into a single internal schema, allowing the routing layer and application layer to remain provider-agnostic. Schema translation is performed in the gateway plugin pipeline, not in application code:

|**Provider**|**Native API Schema**|**Auth Mechanism**|**Streaming Format**|**PAL Translation**|
|---|---|---|---|---|
|OpenAI|/v1/chat/completions|Bearer API Key|SSE<br>text/event-stream|Passthrough (reference)|
|Anthropic<br>Claude|/v1/messages|x-api-key header|SSE<br>application/json|messages→content mapping|
|AWS Bedrock|/model/{id}/invoke-strea<br>m|SigV4 signed<br>request|chunked binary|InvokeModel→OpenAI schema|
|Azure OpenAI|/openai/deployments/{d}/<br>chat|api-key + AAD OBO|SSE (same as<br>OAI)|deployment ID mapping|
|Google Vertex|/v1/projects/{p}/generate<br>Content|OAuth2 Bearer|SSE JSON|contents→messages mapping|
|Ollama<br>(on-prem)|/api/chat|No auth (internal)|NDJSON stream|stream format convert|
|I**`PAL — Bed`**|**`rock to OpenAI schema t`**|**`ranslation (snippet`**|**`)`**||
|`-- Kong plu`|`gin: bedrock-normalize`|`r`|||
|`local funct`|`ion transform_request(`|`body)`|||
|`return {`|||||
|`modelId = B`|`EDROCK_MODEL_MAP[body.`|`model],`|||
|`messages =`<br>`inferenceCo`<br>`maxTokens =`<br>`temperature`<br>`}`<br>`}`<br>`end`<br>`local funct`<br>`return { --`<br>`choices = {`<br>`role = 'ass`<br>`content = b`<br>`}}}`<br>`}`<br>`end`|`map_openai_to_bedrock_`<br>`nfig = {`<br>`body.max_tokens,`<br>`= body.temperature,`<br>`ion transform_response`<br>`OpenAI shape`<br>`{ message = {`<br>`istant',`<br>`edrock_resp.output.mes`|`messages(body.mess`<br>`(bedrock_resp)`<br>`sage.content[1].te`|`ages),`<br>`xt`||

##### CHAPTER D

## Data Ownership & Sovereignty

Data ownership in multi-tenant AI gateways spans four distinct data categories, each requiring separate governance: **prompts** (input data, often containing PII or proprietary business context), **completions** (output data, potentially containing model-synthesised sensitive information), **metadata** (token counts, latency, consumer identity — operational telemetry), and **embeddings** (vector representations of tenant content stored in semantic caches). Each category has distinct ownership, residency, retention, and erasure requirements.

### D.1 Data Residency Enforcement

Data residency enforcement ensures that a tenant's prompt and completion data never leaves a specified geographic jurisdiction. The gateway enforces residency at the routing layer, not as a post-hoc control:

##### Residency-Aware Routing

Each tenant profile carries a **data_residency** attribute (e.g., EU, US, APAC, IN). The router enforces a strict allow-list of provider endpoints that satisfy the residency requirement. Requests from EU-residency tenants can only be routed to Azure OpenAI Sweden Central, OpenAI EU endpoints, or AWS Bedrock eu-west-1 — regardless of latency or cost optimisation signals.

##### Egress Enforcement via Network Policy

Kubernetes NetworkPolicies and Istio AuthorizationPolicies at the egress gateway enforce that traffic from EU-namespace pods cannot reach US provider endpoints at the network layer — providing a defence-in-depth guarantee independent of the application-layer routing decision.

##### On-Premises Residency

For data classified as unable to leave corporate infrastructure (sovereign cloud, classified government workloads), the gateway routes exclusively to on-premises model serving (vLLM, Ollama, Triton) or private Azure Government / AWS GovCloud endpoints. The PAL ensures the same API surface regardless of where the model runs.

I **`Residency-aware routing policy — OPA (snippet)`** <mark>`package ai.gateway.residency # Allowed providers per residency zone residency_allow = { "EU": {"azure-sweden", "aws-bedrock-eu-west-1", "onprem-eu-dc1"}, "US": {"openai-us", "azure-east-us", "aws-bedrock-us-east-1"}, "IN": {"azure-india-central", "aws-bedrock-ap-south-1"}, } allow_route if { tenant := data.tenants[input.tenant_id] allowed := residency_allow[tenant.data_residency] input.target_provider in allowed }`</mark>

### D.2 Tenant Data Isolation Guarantees

The following table defines the isolation guarantee level for each data type across the three tenancy models:

|**Data Type**|**SILO**|**BRIDGE**|**POOL**|
|---|---|---|---|
|Prompts (in-flight)|Dedicated TLS endpoint|Shared endpoint, tenant JWT|Shared endpoint, tenant JWT|
|Completions|Dedicated TLS endpoint|Shared endpoint, filtered|Shared endpoint, filtered|
|Semantic Cache|Dedicated vector DB|Isolated collection/schema|Partitioned by tenant_id key|
|Quota counters|Dedicated Redis instance|Tenant-prefixed Redis keys|Tenant-prefixed Redis keys|
|Audit Logs|Dedicated S3 bucket|Tenant-prefixed S3 prefix|Tenant-tagged shared stream|
|Embeddings|Dedicated index|Isolated namespace/schema|Tenant_id partition key|
|Model config|Dedicated CRDs|Tenant workspace config|Tenant config object|

### D.3 Prompt & Completion Data Lifecycle

The gateway defines explicit data lifecycle policies for prompt and completion content, distinguishing between operational logging (for debugging and cost tracking) and compliance audit logging (for regulatory evidence). By default, **prompt and completion content is never stored** — only metadata is logged. Content logging is an explicit opt-in per tenant with additional encryption and access controls:

|**Transit**|In-flight only. TLS 1.3 with perfect-forward-secrecy. No buffering except for streaming reassembly (max<br>30s window). Memory is zeroed after response dispatch.|
|---|---|
|**Operational**<br>**Log**|Metadata only by default: timestamp, tenant_id, model, token_counts, latency, cache_hit, cost_usd.<br>Content stored only if tenant opts in + DPO approval + field-level encryption with tenant-held key.|
|**Compliance**<br>**Audit**|Immutable record: consumer_id, request_hash (SHA-256 of prompt), response_hash, model_version,<br>provider, timestamp. Hashes enable audit without storing raw content. Retained per regulatory<br>requirement (7yr HIPAA, 5yr SOC2).|
|**Cache TTL**|Vector cache entries carry configurable TTL (default 1 hour). Tenant can set TTL=0 to disable caching for<br>sensitive workloads. Cache entries are encrypted with tenant-specific AES-256 key stored in Vault.|
|**Erasure**|Right-to-erasure pipeline: cache purge→operational log field masking→audit hash retention (hash<br>retained, no raw content to erase)→certificate of deletion. SLA: 72 hours for GDPR, 30 days for CCPA.|

### D.4 Right-to-Erasure (GDPR Article 17)

I **`Tenant data deletion workflow — API + operator script (snippet)`**

```
# Step 1: Trigger deletion via Tenant Management API
DELETE /v1/tenants/{tenant_id}/data
{ "scope": ["cache", "logs", "embeddings"], "reason": "GDPR_ART17" }
# Step 2: Gateway operator reconciler executes:
# -- Purge Redis keyspace: DEL gw:{tenant_id}:*
# -- Drop pgvector schema: DROP SCHEMA tenant_{id} CASCADE
```

```
# -- Mask operational logs: UPDATE logs SET prompt=NULL WHERE tenant=?
```

```
# -- Archive audit hashes to cold store (hashes kept, content null)
```

```
# -- Generate signed deletion certificate (timestamped, DPO countersigned)
```

```
# Step 3: Verification
```

```
GET /v1/tenants/{tenant_id}/data/audit
```

- <mark>`# Returns: { status: DELETED, certificate_id: ..., completed_at: ... }`</mark>

## Scaling Architecture

### E.1 Horizontal & Vertical Scaling Patterns

The gateway data plane is designed for horizontal scaling — stateless request processing with all state externalised to Redis (quota counters, session data) and the vector cache. Vertical scaling (larger instance types) is only applied to the semantic embedding computation path, which is CPU/GPU-intensive.

#### Stateless Data Plane Pods

Gateway instances hold zero in-memory tenant state. All quota, session, and cache state is in Redis Cluster. Any pod can serve any tenant. HPA scales on token-throughput (custom metric) and CPU. Target: 3–50 replicas per cell.

###### I **`Config`**

```
hpa_metric: gateway_tokens_per_second hpa_target: 50,000 TPS per pod
```

#### Redis Cluster for Quota State

Redis Cluster (6 shards, 3 replicas each) handles quota counters using INCRBY with TTL. Consistent hashing distributes tenant keys across shards. Redis 7.x ACL isolates per-tenant keyspaces. CRDT-based counters handle cross-region quota synchronisation with bounded staleness (5s).

###### I **`Config`**

```
redis_topology: 6-shard cluster replication: 3 replicas/shard consistency: eventual (5s)
```

#### Vector Cache Scaling

pgvector deployed as read-replica cluster: 1 primary (writes) + N read replicas (similarity lookups). Read traffic load-balanced by gateway plugin. At >1M cached embeddings, Qdrant distributed cluster is preferred for horizontal vector index scaling with HNSW indexing.

###### I **`Config`**

<mark>`cache_backend: pgvector (< 1M)` →</mark> <mark>`Qdrant cluster (> 1M) index: HNSW, ef=128`</mark>

#### Control Plane Scaling

Kong Admin API with read-only replica nodes. Configuration changes hit the primary; data plane nodes pull configuration via Kong's declarative config sync (deck sync) every 30 seconds. At 10,000+ tenants, a dedicated Config Delivery Network (CDN-style) distributes tenant config bundles to regional data planes.

###### I **`Config`**

```
sync_interval: 30s config_delivery: CDN-backed bundle server
```

### E.2 Global Anycast & Edge PoPs

For globally distributed SaaS tenants, the gateway is deployed at edge Points of Presence (PoPs) using Cloudflare Workers, Fastly Compute@Edge, or AWS CloudFront Functions as a lightweight first-hop. The edge PoP handles:

- JWT validation and tenant identification (eliminates RTT to origin for auth failures)

- Rate-limit pre-check against edge-local counters (eventual consistency with origin quota)

- Semantic cache lookup against a CDN-proxied vector cache (read-only, refreshed every 60s)

- Request routing to the nearest regional gateway cluster based on tenant residency policy

- TLS termination and DDoS absorption (absorbs L3/L4 attack traffic before it reaches gateway fleet)

|I**`Cloudflare Worker — edge auth + rate pre-check (snippet)`**|
|---|
|`export default {`|
|`async fetch(request, env) {`|
|`// 1. Validate JWT at edge (no origin round-trip)`|
|`const jwt = await verifyJWT(request.headers.get('Authorization'), env.JWKS_URL)`|
|`if (!jwt.valid) return new Response('Unauthorized', { status: 401 })`|
|`// 2. Edge rate-limit pre-check (KV store, eventual consistency)`|
|`const key =`rl:${jwt.tenant_id}:${getMinuteBucket()}``|
|`const count = await env.KV.get(key) ?? 0`|
|`if (count > EDGE_LIMIT) return new Response('Too Many Requests', { status: 429 })`|
|`await env.KV.put(key, count+1, { expirationTtl: 120 })`|
|`// 3. Route to tenant's regional gateway`|
|`const region = RESIDENCY_REGION[jwt.data_residency]`|
|`return fetch(`https://${region}-gateway.corp/${request.url}`, request)`<br>`}`<br>`}`|

## Cost Attribution & FinOps at Scale

### F.1 Chargeback Models

At multi-tenant scale, cost attribution must be granular enough to drive engineering behaviour (prompt optimisation, cache leverage) and support accurate financial chargeback to business units or external customers:

#### Token-based Chargeback

Gateway emits per-request telemetry: prompt_tokens, completion_tokens, model, provider, tenant_id, team_id, feature_id. FinOps pipeline (OpenCost + custom Prometheus rules) aggregates cost = tokens × model_rate_per_token. Grafana dashboards show cost by tenant / team / model / feature with drill-down.

###### I **`Formula`**

```
cost_formula: (prompt_tokens * input_rate) + (completion_tokens * output_rate)
```

#### Request-based Chargeback

For tenants on flat-rate contracts, cost is allocated per request regardless of token count. Gateway tags each request with a request_unit (RU) weight by model tier. GPT-4o = 10 RU, GPT-4o-mini = 1 RU, Claude Haiku = 1.5 RU. Monthly RU consumption drives invoice generation.

###### I **`Formula`**

```
cost_formula: requests * model_request_unit_weight
```

#### Cache Savings Credit

Tenants who generate cache hits effectively subsidise their peers. FinOps model credits the cache-hitting tenant: if a cache hit returns a $0.05 completion at zero provider cost, the tenant is charged a cache_fee ($0.001) rather than full provider cost. Cache hit rate is a first-class metric in tenant cost dashboards.

###### I **`Formula`**

```
charge: min(provider_cost, cache_fee) # cache_fee << provider_cost
```

### F.2 Budget Guardrails per Tenant

I **`Budget exhaustion policy — Kong plugin config (snippet)`**

```
plugins:
- name: ai-quota-guardian
config:
tenant_id: '{{ jwt.tenant_id }}'
budgets:
- window: day
limit_usd: 500.00
```

```
on_exceed: throttle # 429 with Retry-After
warn_at_pct: 80 # alert at $400
- window: month
limit_usd: 10000.00
on_exceed: queue # queue in Redis, process when budget resets
escalate_to: finops@corp.com
model_overrides:
gpt-4o:
on_exceed: downgrade_to # auto-downgrade to gpt-4o-mini
downgrade_model: gpt-4o-mini
```

## Governance at Scale

### G.1 Policy Federation

At multi-tenant scale, a monolithic policy file is unmanageable. The gateway adopts a federated policy architecture using OPA's bundle mechanism: global base policies are authored by the Platform team; tenant-specific overrides are authored by Tenant Admins within a constrained sandbox, preventing privilege escalation.

I **`OPA Bundle hierarchy (snippet)`** <mark>`# Bundle server serves layered bundles: # /bundles/global/base.tar.gz — platform-authored, enforced everywhere # /bundles/tenant/{id}/policy.tar.gz — tenant-authored, sandboxed scope # Global base policy (enforced, cannot be overridden): package ai.gateway.global deny if { input.model in BANNED_MODELS_GLOBAL } # e.g. ['dall-e-2'] deny if { input.prompt_injection_score > 0.9 } # Tenant override (tenant can restrict further, not expand): package ai.gateway.tenant allow_model if { not ai.gateway.global.deny # global deny takes precedence input.model in data.tenant_allowed_models[input.tenant_id] }`</mark>

### G.2 Audit at Multi-Tenant Scale

Generating, storing, and querying audit logs for thousands of tenants at millions of requests per day requires a purpose-built audit architecture:

- Kafka topic-per-tenant for real-time audit event streaming; compacted topics for latest-state queries

- S3 with tenant-prefixed partition keys; S3 Object Lock (WORM) for tamper-proof retention

- Athena/BigQuery partitioned queries allow tenant-scoped audit export without cross-tenant data access

- Audit log schema is immutable once deployed; schema evolution only via additive fields (never delete/rename)

- Tenant self-service audit portal: tenants query their own audit log via scoped API credentials — no platform team involvement required

- Cross-tenant audit aggregation (for platform-level security analytics) uses separate anonymised data pipeline with PII removed

### G.3 Compliance Matrix by Cloud & Region

|**Regulation**|**Scope**|**AWS (us-east)**|**Azure (eu-west)**|**GCP (asia-se)**|**On-prem**|
|---|---|---|---|---|---|
|GDPR|EU persons' data|IDisallowed|IAllowed|IDisallowed|IAllowed|

|**Regulation**|**Scope**|**AWS (us-east)**|**Azure (eu-west)**|**GCP (asia-se)**|**On-prem**|
|---|---|---|---|---|---|
|HIPAA|US health data|IBAA signed|IBAA signed|IBAA signed|IAllowed|
|SOC 2 Type II|Service trust|ICovered|ICovered|ICovered|IISelf-cert|
|DPDP (India)|IN persons' data|IDisallowed|IDisallowed|IIMumbai PoP|IPreferred|
|FedRAMP High|US Gov data|IGovCloud|IGov Cloud|IDisallowed|ISILO only|
|EU AI Act|High-risk AI|IIEU mirror|INative EU|I|IFull ctrl|
|PCI DSS|Cardholder data|I+ no log|I+ no log|I+ no log|I+ no log|

##### CHAPTER H

## Reference Patterns & Snippets

### H.1 Multi-Tenant Gateway — Decision Checklist

|**Tenancy Model**|Silo / Bridge / Pool decided per tenant tier based on regulatory classification|
|---|---|
|**Identity**|Tenant_id sourced from verified JWT claim only — never HTTP header|
|**Cache**|Vector cache partitioned per tenant_id as primary key — cross-tenant lookups impossible|
|**Quota**|Redis keys prefixed gw:{tenant_id}: — ACL-enforced keyspace isolation|
|**Residency**|OPA policy enforces provider allow-list per tenant data_residency attribute|
|**Audit Logs**|Separate Kafka topic or S3 prefix per tenant — no shared stream|
|**Data Deletion**|Automated erasure pipeline with 72h SLA and signed deletion certificate|
|**Cost**|Per-request token telemetry→FinOps pipeline→chargeback dashboard|
|**Policy**|OPA bundle federation: global base (overrides all) + tenant sandbox (additive only)|
|**Scaling**|Stateless data plane pods + external Redis + vector cache→HPA on token throughput|
|**Multi-cloud**|Same-cloud-preferred routing + cross-cloud failover + Provider Abstraction Layer|
|**Model Pinning**|Per-tenant model version locked in control plane — upgrade via tenant-scoped canary|

### H.2 Capacity Sizing Reference

|**Scale Tier**|**Tenants**|**Peak RPS**|**Gateway Pods**|**Redis**|**Vector Cache**|**Audit**<br>**Storage**|
|---|---|---|---|---|---|---|
|Small|1–50|500|3 pods (2 CPU)|Single node 8GB|pgvector 1 node|100GB/mon<br>th S3|
|Medium|50–500|5,000|10 pods (4 CPU)|Cluster 3-shard|pgvector 3 node|1TB/month<br>S3|
|Large|500–5k|50,000|30 pods (8 CPU)|Cluster 6-shard|Qdrant 3-node|10TB/mont<br>h S3|
|Hyperscale|5k–50k|500,000|Cell arch (3 cells 50<br>pods each)|Redis Enterprise|Qdrant 9-node<br>cluster|100TB/mon<br>th + Glacier|

### H.3 Data Ownership RACI

|**Activity**|**Platform Team**|**Tenant Admin**|**Data Owner**|**DPO / Legal**|
|---|---|---|---|---|
|Define residency policy|Consult|Inform|Accountable|Responsible|

|**Activity**|**Platform Team**|**Tenant Admin**|**Data Owner**|**DPO / Legal**|
|---|---|---|---|---|
|Configure tenant residency|Responsible|Accountable|Inform|Consult|
|Enable content logging|Implement|Request|Accountable|Approve|
|Trigger data erasure|Execute|Accountable|Initiate|Audit|
|Audit log access (own data)|Provide access|Responsible|Review|Oversee|
|Cross-tenant security audit|Responsible|Informed|Informed|Accountable|
|Model version upgrade|Responsible|Approve/Veto|Inform|Consult|
|Budget limit configuration|Implement|Accountable|Inform|Consult|

*This addendum complements the Enterprise AI Gateway primary document. Multi-tenancy and multi-cloud topology choices are architecture decisions with long-term cost and compliance implications — review with your Data Protection Officer, Cloud Architect, and FinOps lead before committing to a tenancy model.*
