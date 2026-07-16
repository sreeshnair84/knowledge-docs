---
title: "ENTERPRISE AI GATEWAY"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Enterprise_AI_Gateway.pdf"
doc_type: guide
tags: ["cloud-platforms"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# ENTERPRISE AI GATEWAY

Design · Integration · Governance · Future

A Comprehensive Enterprise Architecture Reference for AI Gateway Strategy, Security, Resilience, Observability, and Operational Excellence

Enterprise AI Architecture Practice · April 2026 Version 1.0 · CONFIDENTIAL

## Table of Contents

|**CHAP**|**TER —**<br>**Table of C**|
|---|---|
|**01**|What Is an AI Gateway? Market Landscape & Big Wins|
|**02**|Problems AI Gateways Solve|
|**03**|Core Design — Architecture Blueprint|
|**04**|Harness & AGUI Integration|
|**05**|Resilience & Sustainability|
|**06**|Security & Governance|
|**07**|Operational Excellence — End-to-End Ops Support|
|**08**|Integration Patterns & Ecosystem|
|**09**|The Future of AI Gateways|
|**10**|Appendix — Snippets Reference|

**CHAPTER 01**

## Market Landscape & Big Wins

The emergence of large language models (LLMs) as production workloads has created a new infrastructure layer — the **AI Gateway** . Analogous to the API gateway revolution of the 2010s, the AI gateway is the critical control plane that mediates every interaction between enterprise consumers and AI providers (OpenAI, Anthropic, Cohere, Azure OpenAI, AWS Bedrock, Google Vertex AI, open-source Llama/Mistral, and private fine-tuned models). It is the single pane of glass for routing, cost management, security enforcement, observability, and policy compliance across a heterogeneous AI estate.

### 01.1 Defining the AI Gateway

An AI Gateway is a reverse-proxy, policy engine, and observability hub positioned inline between all AI consumers (applications, agents, pipelines) and AI providers. It abstracts provider APIs behind a unified interface, enforcing cross-cutting concerns without requiring application-level changes.

### 01.2 Key Market Players

|**Gateway**|**Origin**|**Key Differentiator**|**Target Segment**|**License**|
|---|---|---|---|---|
|Kong AI Gateway|Kong Inc.|Plugin ecosystem, multi-provider LLM<br>routing, semantic caching|Enterprise / SaaS|Apache 2 / Ent.|
|AWS Bedrock<br>Gateway|Amazon|Native IAM, Model Catalog,<br>Guardrails, multi-region|AWS-centric<br>enterprise|Proprietary|
|Azure API Mgmt<br>+ APIM AI|Microsoft|Azure OpenAI integration, RBAC,<br>OBO token passthrough|M365 enterprise|Proprietary|
|Google Apigee AI|Google|Vertex AI binding, Gemini routing,<br>Apigee policies|GCP-first orgs|Proprietary|
|Portkey.ai|Portkey|Provider fallback, prompt versioning,<br>fine-grained cost|Dev teams / startups|SaaS / OSS|
|LiteLLM Proxy|BerriAI|100+ LLM unification, budget limits,<br>virtual keys|OSS / DevOps teams|MIT / Enterprise|
|Traefik AI Plugin|Traefik Labs|K8s-native, sidecar model, mesh<br>integration|Cloud-native platform<br>teams|Apache 2|
|Cloudflare AI<br>Gateway|Cloudflare|Edge delivery, caching, WAF + AI in<br>one plane|Web-first orgs|SaaS|
|IBM watsonx<br>Gateway|IBM|Regulated industries, on-prem,<br>Watson model governance|Financial / Gov|Proprietary|

|**Gateway**|**Origin**|**Key Differentiator**|**Target Segment**|**License**|
|---|---|---|---|---|
|WSO2 Choreo AI|WSO2|Open-source, microgateway, Ballerina|OSS enterprise|Apache 2|
|GW||native|||

### 01.3 Big Wins Delivered by AI Gateways

|I**Cost**<br>**Reduction**<br>**40–70%**<br>Semantic caching returns cached responses for semantically equivalent prompts,<br>eliminating redundant LLM calls. Organisations deploying Kong's semantic cache<br>plugin report token spend reductions of 40–70% on high-volume RAG workloads.|
|---|
|I**Latency P99**<br>**Improvement**<br>Intelligent routing selects the lowest-latency provider per request. Fallback chains<br>ensure sub-second degraded service even during provider outages.|
|I**Compliance**<br>**Acceleration**<br>Centralised PII redaction, prompt injection filtering, and audit logs compressed<br>compliance certification timelines from 12 months to under 6 weeks for regulated firms.|
|I**Developer**<br>**Velocity**<br>A single SDK against a unified gateway endpoint removes per-provider integration<br>work. Teams ship AI features 3x faster than point-to-point integrations.|
|I**Security**<br>**Posture**<br>Gateway-level prompt injection detection, jailbreak prevention, and output content<br>filtering catch threats before they reach business logic layers.|

**CHAPTER 02**

## Problems AI Gateways Solve

Without a gateway layer, enterprises face a sprawl of point-to-point integrations, inconsistent security postures, uncontrolled costs, and zero cross-cutting observability. The following taxonomy covers the full problem surface that AI gateways address.

#### Provider Lock-in & API Fragmentation

Each AI provider has a distinct API schema, authentication mechanism, error taxonomy, and rate-limit strategy. Applications hardcoded to one provider cannot leverage competitive pricing, regional availability, or specialised model capabilities. The gateway abstracts all providers behind a unified OpenAI-compatible endpoint.

#### Cost Explosion & Token Sprawl

Unbounded LLM consumption leads to unpredictable cloud bills. Without per-team budget enforcement, token quotas, and semantic caching, costs scale linearly — or super-linearly — with user growth. Gateways implement budget guardrails, quota exhaustion policies (queue, throttle, or reject), and caching layers that dramatically reduce token burn.

#### Security Surface Expansion

AI endpoints introduce novel attack vectors: prompt injection, jailbreak attempts, data exfiltration via crafted prompts, PII leakage in completions, and model inversion. Traditional API gateways lack LLM-aware threat models. AI gateways include semantic guards, regex + ML-based PII detectors, and output content classifiers.

#### Observability Blind Spots

Token usage, latency distributions per model, prompt/completion content for audit, semantic drift, and hallucination rates are invisible without specialised telemetry. AI gateways emit rich structured logs, metrics (TTFT, TPS, token counts), and traces to OpenTelemetry collectors, Grafana, Datadog, and Splunk.

#### Governance & Compliance Gaps

GDPR, HIPAA, SOC 2, EU AI Act, and internal AI Ethics policies require audit trails, data residency enforcement, model explainability records, and consent management. Gateways enforce data residency routing, retain immutable audit logs, and integrate with policy-as-code frameworks (OPA, Styra).

#### Reliability & Resilience Deficits

LLM providers experience outages, rate-limit spikes, and latency degradation. Without circuit breakers, retry logic, and multi-provider fallback, a single provider hiccup cascades to full application failure. Gateways implement health-aware load balancing, exponential backoff, bulkhead isolation, and automatic failover.

**CHAPTER 03**

## Core Design — Architecture Blueprint

The reference architecture is organised in five horizontal planes. Each plane is independently scalable and replaceable, enabling progressive adoption and avoiding monolithic coupling. The design targets cloud-native Kubernetes deployment with GitOps-managed configuration.

### 03.1 Five-Plane Reference Architecture

|**CONSUMER**<br>**PLANE**|`Web / Mobile Apps Agent Frameworks (LangChain, AutoGen) CI/CD Pipelines BI / Analytics`<br>`Tools 3rd-party SaaS`|
|---|---|
|**GATEWAY**<br>**PLANE**|`Auth & Token Exchange Rate Limiting / Quota Engine Semantic Cache (vector DB) Prompt`<br>`Guard / PII Redact Intelligent Router Response Filter`|
|**PROVIDER**<br>**PLANE**|`OpenAI / Azure OpenAI Anthropic Claude AWS Bedrock (Titan / Llama) Google Vertex (Gemini)`<br>`On-prem Ollama / vLLM Fine-tuned Private Models`|
|**OBSERVABILI**<br>**TY PLANE**|`OTel Collector Prometheus + Grafana Jaeger Distributed Tracing LLM-specific Metrics`<br>`Dashboard Cost Attribution (Finops)`|
|**GOVERNANCE**<br>**PLANE**|`OPA Policy Engine Audit Log Store (immutable S3/Splunk) Data Residency Enforcer AI Ethics`<br>`Policy Registry Compliance Reporter (SOC2/GDPR/HIPAA)`|

### 03.2 Gateway Internal Components

Within the Gateway Plane, the following micro-components process each request in a deterministic pipeline. The pipeline is expressed as an ordered plugin chain executed per-request:

|**1. Ingress TLS Termination**|mTLS, certificate rotation, ALPN negotiation|
|---|---|
|**2. Identity Verification**|OAuth2/OIDC JWT validation, API key lookup, SPIFFE SVID|
|**3. Policy Pre-Check**|OPA sidecall evaluates consumer permissions and model access|
|**4. Rate & Quota Limiter**|Token-bucket per consumer/team/model, sliding window counters in Redis|
|**5. Prompt Inspector**|Regex + ML classifier for injection, jailbreak, PII, NSFW signals|
|**6. Semantic Cache Lookup**|Embed prompt→cosine similarity against vector cache (pgvector/Redis)|
|**7. Model Router**|Weighted round-robin, latency-aware, cost-aware, capability-based routing|
|**8. Request Transformer**|Schema normalisation to target provider API (OpenAI↔Bedrock↔Claude)|
|**9. Provider Call + Retry**|HTTP/2, circuit breaker, exponential backoff, bulkhead semaphore|

|**10. Response Filter**|Output content classifier, PII scrubber, hallucination confidence score|
|---|---|
|**11. Cache Populate**|Store response embedding + text in vector cache with TTL|
|**12. Telemetry Emit**|OTel spans, token metrics, cost attribution, audit log record|

### 03.3 Data Flow Snippet

|I**Kong AI Gateway — Declarative Route Config (snippet)**<br>|
|---|
|`services:`|
|`- name: llm-router-service`|
|`url: https://api.openai.com # primary provider`|
|`plugins:`|
|`- name: ai-proxy # Kong AI plugin`|
|`config:`|
|`route_type: llm/v1/chat`|
|`model: { provider: openai, name: gpt-4o }`|
|`auth: { header_name: Authorization, header_value: Bearer {vault://openai-key} }`|
|`- name: ai-semantic-cache`|
|`config:`|
|`embeddings: { provider: openai, model: text-embedding-3-small }`|
|`vectordb: { strategy: redis, threshold: 0.85 }`|
|`- name: ai-rate-limiting-advanced`|
|`config:`|
|`limit: [{ minute: 500, day: 50000 }]`|
|`strategy: sliding_window`|
|I**LiteLLM Proxy — Multi-provider fallback (snippet)**|
|`model_list:`|
|`- model_name: gpt-4o`|
|`litellm_params: { model: openai/gpt-4o, api_key: os.environ/OPENAI_KEY }`|
|`- model_name: gpt-4o # fallback to Azure`|
|`litellm_params: { model: azure/gpt-4o, api_base: $AZURE_ENDPOINT }`|
|`- model_name: gpt-4o # fallback to Bedrock`|
|`litellm_params: { model: bedrock/anthropic.claude-3-sonnet }`|
|`router_settings:`|
|`routing_strategy: latency-based-routing`|
|`allowed_fails: 2`|
|`cooldown_time: 30`|

#### CHAPTER 04

## Harness & AGUI Integration

The AI Gateway integrates with two rapidly evolving paradigms: the **AI Harness** (the orchestration and agent execution layer) and **AGUI** (Agent-to-UI protocol, enabling real-time streaming agent state into frontend interfaces). Together these define how complex agentic workflows interact with the gateway at runtime.

### 04.1 AI Harness Integration

AI Harnesses — frameworks such as LangChain, LlamaIndex, AutoGen, CrewAI, and Semantic Kernel — orchestrate multi-step, multi-model workflows. The gateway is the single egress point for all LLM calls originating inside the harness, ensuring that observability, rate limiting, and guardrails apply regardless of which model or step is executing.

- Single endpoint injection: harness is configured with **OPENAI_BASE_URL=<https://gateway/v1>** — no per-model client changes required.

- Context propagation: W3C TraceContext headers carried through harness → gateway → provider for end-to-end distributed tracing.

- Tool call interception: gateway can log, cache, or gate function/tool call results passing through the harness execution loop.

- Multi-agent token budgeting: each agent identity carries a JWT sub-claim mapped to a gateway quota bucket, preventing runaway agent spend.

- Streaming support: gateway transparently proxies Server-Sent Events (SSE) chunks, enabling real-time token streaming to harness consumers.

- Prompt versioning: harness injects **X-Prompt-Version** header; gateway routes to the model version that was validated for that prompt template.

|I**LangChain**→**Gateway (snippet)**|
|---|
|`from langchain_openai import ChatOpenAI`|
|`llm = ChatOpenAI(`|
|`base_url='https://ai-gateway.corp.internal/v1',`|
|`api_key='gw-virtual-key-team-a', # gateway virtual key`|
|`model='gpt-4o',`|
|`default_headers={`|
|`'X-Team-ID': 'platform-engineering',`|
|`'X-Trace-ID': trace_context.span_id,`<br>`}`<br>`)`|

### 04.2 AGUI — Agent-to-UI Protocol

AGUI (open protocol, CopilotKit reference implementation) defines a streaming event schema that lets agent backends push structured state updates — text deltas, tool calls, state snapshots, lifecycle events — directly to

React/Vue frontends via SSE. The AI Gateway participates in this flow as a transparent streaming proxy with additional control capabilities.

##### SSE Proxy & Fan-out

Gateway proxies AGUI SSE streams without buffering, maintaining sub-10ms forwarding latency. Fan-out allows one agent stream to be delivered to multiple UI sessions (e.g., collaborative agent views).

##### Event Filtering

Gateway strips internal tool-call events marked sensitive before forwarding to untrusted frontend origins. Configurable event-type allow-lists per consumer.

##### Session Affinity

Sticky routing ensures all AGUI events for a conversation session reach the same upstream agent pod, preventing state fragmentation.

##### Back-pressure Management

When frontend consumers are slow, gateway applies back-pressure signalling to the agent backend, preventing buffer bloat and OOM conditions.

##### AGUI Auth Injection

Gateway injects short-lived signed AGUI session tokens, eliminating the need for frontend clients to hold long-lived credentials.

|I**AGUI SSE Gateway Route — Nginx upstream snippet**|
|---|
|`location /agui/stream {`|
|`proxy_pass http://agent-backend-svc;`|
|`proxy_buffering off;`|
|`proxy_cache off;`|
|`proxy_read_timeout 900s; # long-lived SSE`|
|`proxy_set_header X-GW-Session $cookie_session_id;`|
|`proxy_set_header X-GW-Consumer $jwt_sub;`|
|`add_header Cache-Control no-store;`|
|`# Kong plugin strips sensitive tool_call events:`|
|`# plugin: agui-event-filter { deny: [tool_call_internal] }`<br>`}`|

#### CHAPTER 05

## Resilience & Sustainability

### 05.1 Resilience Patterns

AI gateway resilience encompasses provider-level fault tolerance, gateway-level high availability, and downstream consumer protection. The following patterns are implemented as composable plugins:

#### Circuit Breaker

Tracks consecutive 5xx / timeout errors per provider. Opens circuit after configurable threshold; half-open probes after cooldown. Prevents cascade failures during provider degradation events.

###### I **Config snippet**

```
cb_config: { threshold: 5, window: 30s, half_open_after: 60s }
```

#### Retry with Exponential Backoff + Jitter

Retries transient errors (429, 503) with exponential base and ±jitter to prevent thundering-herd against providers. Idempotency keys prevent duplicate charges on retried payment-model calls.

###### I **Config snippet**

```
retry: { attempts: 3, base_delay: 0.5s, max_delay: 10s, jitter: 0.2 }
```

#### Bulkhead Isolation

Semaphore-per-model limits concurrent in-flight requests, preventing a runaway consumer from exhausting connection pools shared with critical business workloads.

###### I **Config snippet**

```
bulkhead: { max_concurrent: 50, queue_size: 100, timeout: 5s }
```

#### Multi-provider Fallback Chain

Ordered provider list with health-check state. On primary failure, traffic is shed to secondary (e.g., Azure OpenAI), then tertiary (e.g., Bedrock Claude). SLA is preserved even during major outages.

###### I **Config snippet**

```
fallback_chain: [openai, azure-openai, bedrock-claude, local-llama]
```

#### Semantic Cache as Reliability Buffer

Cache hit rate forms a natural buffer: if all providers are down, cached responses continue serving semantically equivalent recent queries. TTL-aware freshness prevents stale responses in time-sensitive domains.

###### I **Config snippet**

```
cache: { ttl: 3600, similarity_threshold: 0.88, fallback_on_miss: true }
```

#### Health-aware Load Balancing

Active health probes (HEAD /health) + passive monitoring of latency percentiles (TTFB, TPS). Traffic weight dynamically adjusts: healthy fast providers receive higher weight.

###### I **Config snippet**

```
lb_strategy: weighted-latency-aware, probe_interval: 15s
```

### 05.2 Sustainability & FinOps

AI compute is among the most energy and cost-intensive enterprise workloads. Sustainability is a first-class concern at the gateway layer through the following mechanisms:

- Semantic caching eliminates redundant GPU compute at provider data centres — equivalent to removing thousands of inference calls per day.

- Model right-sizing routes low-complexity prompts to smaller, cheaper, lower-carbon models (GPT-4o-mini, Haiku) and reserves frontier models for tasks that require them.

- Batch scheduling: non-latency-sensitive workloads (summarisation, embedding generation) are deferred to off-peak hours using gateway queue policies, leveraging renewable energy windows.

- Carbon-aware routing: integrates with Electricity Maps API to prefer providers operating in regions with lower current carbon intensity.

- Token budget enforcement prevents waste: guardrails truncate excessively long prompts, enforce max_token ceilings, and block runaway agent loops.

- Cost attribution dashboards per team / product / feature enable chargeback, driving engineers to optimise prompt efficiency.

###### I **Carbon-aware routing plugin (pseudo-snippet)**

```
-- Kong custom plugin: carbon-router
```

```
local carbon_intensity = fetch_carbon_api(provider_region)
if carbon_intensity > threshold then
route_to_low_carbon_provider(request) -- prefer Azure Sweden or GCP Hamina
else
```

```
route_to_primary(request)
end
```

#### CHAPTER 06

## Security & Governance

### 06.1 Threat Model for AI Gateways

AI gateways face a superset of traditional API security threats, augmented by LLM-specific attack surfaces. The OWASP LLM Top 10 (2025) provides the canonical taxonomy; the gateway is the primary enforcement point for mitigations.

|**OWASP LLM Risk**|**Description**|**Gateway Mitigation**|
|---|---|---|
|LLM01 — Prompt Injection|Malicious instructions embedded in user<br>input hijack model behaviour|Semantic injection classifier, input sanitisation,<br>system-prompt pinning via gateway|
|LLM02 — Sensitive Info<br>Disclosure|Model reveals training data, PII, or<br>confidential content|Output PII detector, DLP regex engine, response<br>content classifier|
|LLM03 — Supply Chain|Compromised model weights or plugins<br>introduce backdoors|Model provenance registry, plugin signature<br>verification, SBOM enforcement|
|LLM04 — Data/Model<br>Poisoning|Adversarial training data degrades model<br>behaviour|Gateway-level anomaly detection on output drift;<br>model version pinning|
|LLM06 — Excessive<br>Agency|Agents take destructive autonomous<br>actions beyond intent|Tool-call allow-list enforcement,<br>human-in-the-loop gates at gateway, scope<br>tokens|
|LLM07 — System Prompt<br>Leakage|System prompts revealed to end users|Gateway strips system prompt content from<br>streamed responses|
|LLM09 — Misinformation|Model outputs falsehoods presented as<br>facts|Confidence scoring, RAG grounding verification,<br>hallucination rate metrics|
|LLM10 — Unbounded<br>Consumption|Resource exhaustion via large prompts /<br>token flooding|Token-count pre-check, max_tokens<br>enforcement, per-consumer rate limits|

### 06.2 Authentication & Authorisation Architecture

The gateway implements a layered AuthN/AuthZ model that decouples consumer identity from provider credentials, eliminating secret sprawl across teams:

##### Virtual Keys

Gateway issues team-scoped virtual API keys. Each key is mapped to a set of allowed models, token budgets, and provider credentials stored in a secrets vault (HashiCorp Vault / AWS Secrets Manager). Applications never hold provider keys.

##### JWT + OIDC Validation

Inbound requests from internal services carry OIDC JWTs. Gateway validates signature, issuer, audience, and expiry. Claims (sub, groups, tenant_id) map to RBAC policies in OPA.

##### mTLS for Service-to-Service

Internal microservices authenticate to the gateway using SPIFFE SVIDs issued by SPIRE. Eliminates static shared secrets in service mesh.

##### Scoped Provider Credentials

Gateway uses dedicated per-team Azure Managed Identities or AWS IAM roles to call providers. Audit logs correlate provider calls back to the originating consumer identity.

### 06.3 Governance & Policy-as-Code

I **OPA Policy — Model Access Control (snippet)** <mark>`package ai.gateway.authz default allow = false allow if { allowed_models[input.model] team_budget_ok not data.blocked_consumers[input.consumer_id] } allowed_models = {"gpt-4o", "claude-3-5-sonnet", "llama-3-70b"} team_budget_ok if input.tokens_used < data.budgets[input.team_id].daily_limit`</mark>

I **PII Redaction Plugin — Pattern Registry (snippet)** <mark>`pii_patterns: - name: credit_card regex: '\b(?:\d{4}[- ]?){3}\d{4}\b' action: redact # replace with [CREDIT_CARD] - name: ssn regex: '\b\d{3}-\d{2}-\d{4}\b' action: reject # block request entirely - name: email regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' action: tokenise # replace with stable pseudonym`</mark>

**CHAPTER 07**

## Operational Excellence — End-to-End Ops Support

### 07.1 Deployment Topology

The reference topology deploys the gateway as a Kubernetes Deployment behind an NLB/ALB, with HPA scaling on custom metrics (requests-per-second, token-throughput). Gateway configuration is managed via GitOps (ArgoCD / Flux), with Kong's decK CLI or Helm values driving declarative state.

I **Kubernetes HPA on Token Throughput**

|`apiVersion:`|`autoscaling/v2`|
|---|---|
|`kind: Horizo`|`ntalPodAutoscaler`|
|`metadata: {`|`name: ai-gateway-hpa }`|
|`spec:`||
|`scaleTargetR`|`ef: { name: ai-gateway, kind: Deployment }`|
|`minReplicas:`|`3`|
|`maxReplicas:`|`50`|
|`metrics:`||
|`- type: Exte`|`rnal`|
|`external:`||
|`metric: { na`|`me: gateway_tokens_per_second }`|
|`target: { ty`|`pe: AverageValue, averageValue: 50000 }`|

|I**ArgoCD Application — GitOps Gateway Config**|
|---|
|`apiVersion: argoproj.io/v1alpha1`|
|`kind: Application`|
|`metadata: { name: ai-gateway-config }`|
|`spec:`|
|`source:`|
|`repoURL: https://github.com/corp/ai-gateway-config`|
|`path: environments/prod`|
|`targetRevision: main`|
|`destination: { namespace: ai-gateway, server: https://kubernetes.default.svc }`|
|`syncPolicy: { automated: { prune: true, selfHeal: true } }`|

### 07.2 Observability Stack

Full-stack observability requires metrics, logs, traces, and AI-specific signals aggregated in a unified platform. The gateway emits all four signals via OpenTelemetry SDK, routing to provider-specific backends:

##### Metrics (Prometheus / Datadog)

gateway_request_total, gateway_token_usage_total{model,team,provider}, gateway_latency_ttfb_seconds{model}, gateway_cache_hit_ratio, gateway_circuit_breaker_state{provider}, gateway_cost_usd_total{team}

##### Distributed Traces (Jaeger / Tempo)

Span per gateway stage: auth_check, policy_eval, cache_lookup, provider_call, response_filter. Baggage carries consumer identity and prompt_version for cross-service correlation.

##### Structured Logs (Loki / Splunk)

JSON log per request: timestamp, consumer_id, model, provider, prompt_tokens, completion_tokens, latency_ms, cache_hit, pii_detected, injection_score, cost_usd, trace_id. Immutable append to compliance log store.

##### LLM-specific Signals

Hallucination confidence score (0–1), semantic drift from baseline embeddings, prompt injection probability, output toxicity score. Pushed as Prometheus histograms and alertable via Alertmanager rules.

###### I **OTel Collector Pipeline — AI Gateway (snippet)**

```
receivers:
otlp: { protocols: { grpc: { endpoint: 0.0.0.0:4317 } } }
processors:
batch: { send_batch_size: 1000, timeout: 5s }
attributes/enrich:
actions:
- { key: deployment.environment, value: prod, action: upsert }
exporters:
prometheusremotewrite: { endpoint: http://thanos-receive:9090/api/v1/write }
jaeger: { endpoint: jaeger-collector:14250 }
splunk_hec: { token: ${SPLUNK_TOKEN}, endpoint: https://splunk.corp/hec }
```

### 07.3 Incident Management & SLOs

Gateway SLOs are defined per consumer tier and enforced via Error Budget policies in the SRE practice. Alerting is stratified by severity:

|**SLO**|**Target**|**Alert Threshold**|**Severity**|
|---|---|---|---|
|Gateway Availability|99.95%|< 99.9% (1h)|P1|
|Request Success Rate (non-|4xx) 99.5%|< 99% (15m)|P1|
|P99 TTFB (streaming)|< 800ms|> 1200ms (10m)|P2|
|P99 End-to-End Latency|< 4s|> 6s (10m)|P2|
|Cache Hit Rate|> 35%|< 20% (1h)|P3|
|PII Leak Rate|0%|Any detection|P1|
|Token Budget Overrun|0 per day|Any overrun event|P2|

**CHAPTER 08**

## Integration Patterns & Ecosystem

The AI gateway integrates across the enterprise technology stack. The following patterns address common integration scenarios encountered in production deployments.

### 08.x CI/CD Pipeline Integration

Shift-left AI quality gates: pull-request pipelines invoke the gateway to run automated prompt regression tests, hallucination benchmarks, and safety evals against staging models before deployment. Gateway returns structured eval reports that can fail builds.

###### I **CI/CD Pipeline Integration — snippet**

```
# GitHub Actions — AI Gateway eval gate (snippet)
- name: Run LLM Eval Suite
run: |
llm-eval run --gateway $GW_URL \
--suite ./evals/regression.yaml \
--fail-on-regression 5% # fail if score drops >5%
```

### 08.x Data Platform & RAG Integration

Gateway sits between RAG orchestrators (LlamaIndex, Haystack) and both the embedding model endpoints and completion endpoints. It enforces namespace-level data access controls — ensuring retrieval results from one tenant's vector store cannot leak into another tenant's context window.

###### I **Data Platform & RAG Integration — snippet**

```
# LlamaIndex — Gateway-routed embedding (snippet)
from llama_index.embeddings.openai import OpenAIEmbedding
embed = OpenAIEmbedding(
api_base='https://ai-gateway/v1',
api_key='gw-embed-key',
additional_kwargs={'X-Namespace': tenant_id}
)
```

### 08.x SIEM & SOC Integration

Gateway audit logs are forwarded in real-time to SIEM platforms (Splunk, Microsoft Sentinel, Elastic SIEM). Correlation rules detect anomalies: sudden spike in injection scores, unusual model-access patterns, or bulk data extraction attempts via crafted prompts.

I **SIEM & SOC Integration — snippet**

```
# Splunk alert rule (SPL snippet)
```

```
index=ai_gateway pii_detected=true
```

```
| stats count by consumer_id, model, provider
```

```
| where count > 10
| eval severity='HIGH'
| sendalert pii_leak_alert
```

### 08.x Service Mesh Integration (Istio)

Gateway runs as a dedicated Istio Ingress Gateway or as an Egress Gateway controlling outbound LLM traffic. mTLS is enforced end-to-end via SPIFFE. Istio AuthorizationPolicies complement gateway-level RBAC for defence-in-depth.

###### I **Service Mesh Integration (Istio) — snippet**

```
# Istio EgressGateway for LLM traffic (snippet)
apiVersion: networking.istio.io/v1alpha3
kind: ServiceEntry
metadata: { name: llm-providers }
spec:
hosts: [api.openai.com, api.anthropic.com]
ports: [{ number: 443, name: https, protocol: TLS }]
resolution: DNS
location: MESH_EXTERNAL
```

#### CHAPTER 09

## The Future of AI Gateways

The AI gateway market is evolving at the pace of LLM capability expansion. The following trends define the next 24–36 months of gateway architecture:

|I<br>**Agentic Protocol**<br>**Gateways (MCP-native)**|Model Context Protocol (MCP) is becoming the de-facto standard for<br>agent-to-tool communication. Future gateways will be first-class MCP<br>servers and routers — brokering tool registries, managing tool-call<br>authorisation, caching tool results, and enforcing least-privilege tool access<br>scopes per agent identity. The gateway becomes the MCP Hub of the<br>enterprise, analogous to how service meshes centralised microservice<br>communication.|
|---|---|
|I<br>**Multimodal Traffic**<br>**Management**|As vision, audio, and video models proliferate, gateways must handle binary<br>payloads (images, audio streams, video frames) with modality-specific<br>caching strategies, content safety checks (CSAM detection, deepfake<br>scoring), and cost models that account for image resolution, audio duration,<br>and video FPS. Unified multimodal request schemas and pipeline plugins<br>are the next frontier.|
|I<br>**AI-Native Observability**<br>**& Evals-in-Flight**|Static logging is insufficient for AI quality assurance. Next-generation<br>gateways will run lightweight LLM judges inline (or in near-real-time async)<br>to score every response for faithfulness, relevance, toxicity, and<br>hallucination — feeding continuous evaluation dashboards and triggering<br>automated model rollbacks when quality degrades beyond thresholds.|
|I<br>**Confidential AI &**<br>**Homomorphic Inference**|Regulated industries (healthcare, finance, defence) cannot send raw data to<br>external LLM providers. Future gateways will orchestrate confidential<br>computing enclaves (Azure Confidential Containers, AWS Nitro Enclaves)<br>and early-stage fully homomorphic encryption (FHE) inference, where data<br>remains encrypted throughout the inference pipeline. The gateway manages<br>attestation, key escrow, and enclave routing.|
|I<br>**Federated & Edge AI**<br>**Gateways**|As inference moves to edge devices (mobile, IoT, on-prem GPUs),<br>gateways must operate in a federated topology: a cloud control plane<br>synchronises policy, model versions, and routing tables to lightweight edge<br>gateway<br>instances<br>running<br>on<br>K3s<br>or<br>WebAssembly<br>runtimes.<br>Offline-capable operation with eventual-consistency policy sync is a key<br>design challenge.|

**Autonomous** Machine learning will be applied to the gateway's own configuration: I **Self-Tuning Gateways** RL-based routing agents that optimise cost-latency-quality trade-offs in real time, anomaly detectors that auto-tune rate limits based on consumer behaviour patterns, and chaos engineering bots that continuously probe resilience. The gateway becomes an intelligent adaptive system rather than a static policy engine. **Regulatory & AI Act** The EU AI Act (fully in force 2026) requires conformity assessments, I **Compliance Automation** transparency obligations, and human oversight for high-risk AI systems. I Gateways will automate compliance: generating Article 13 transparency

The EU AI Act (fully in force 2026) requires conformity assessments, transparency obligations, and human oversight for high-risk AI systems. Gateways will automate compliance: generating Article 13 transparency notices per interaction, enforcing human-in-the-loop interrupts for high-risk decisions, logging model identity and version for post-hoc audits, and integrating with national AI supervisory authority reporting APIs.

**CHAPTER 10**

## Appendix — Snippets Quick Reference

### Gateway Decision Matrix

|**Criteria**|**Kong AI GW**|**LiteLLM Proxy**|**AWS Bedrock GW**|**Cloudflare AI GW**|
|---|---|---|---|---|
|Multi-provider routing|INative|INative|IIAWS-only|IILimited|
|Semantic caching|IPlugin|IBuilt-in|IManual|IBuilt-in|
|Plugin / extensibility|ILua/WASM|IIPython CB|IILambda|IIWorkers|
|On-prem deployment|IFull|IFull|ISaaS only|IEdge only|
|PII / prompt guard|IPlugin|IICallback|IGuardrails|IILimited|
|Kubernetes-native|IKIC/KGO|IHelm|IIEKS best|I|
|Cost attribution|IPlugin|IBuilt-in|INative|IIBasic|
|Enterprise support|IEnt|IICommunity|IAWS|ICloudflare|
|Open-source core|IApache 2|IMIT|I|I|

### Key Technology Stack

|**Gateway Engine**|Kong Gateway 3.x, Envoy Proxy, Nginx (OpenResty)|
|---|---|
|**Service Mesh**|Istio 1.22, Linkerd 2.x, Consul Connect|
|**Secret Management**|HashiCorp Vault, AWS Secrets Manager, Azure Key Vault|
|**Policy Engine**|Open Policy Agent (OPA), Styra DAS|
|**Vector Cache**|Redis Stack (RediSearch), pgvector, Qdrant|
|**Observability**|OpenTelemetry, Prometheus, Grafana, Jaeger, Loki|
|**Agent Frameworks**|LangChain, LlamaIndex, AutoGen, CrewAI, Semantic Kernel|
|**AGUI Protocol**|CopilotKit, ag-ui open protocol, Vercel AI SDK|
|**GitOps**|ArgoCD, Flux v2, Kong decK CLI|
|**Cost Tracking**|OpenCost, Kubecost, custom FinOps dashboards|

### Recommended Reading & Standards

- OWASP LLM Top 10 (2025 Edition) —

owasp.org/www-project-top-10-for-large-language-model-applications

- EU AI Act — Final Text (2024) — eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689

- NIST AI RMF 1.0 — Artificial Intelligence Risk Management Framework — nist.gov/airmf

- Model Context Protocol Specification — modelcontextprotocol.io

- ag-ui Agent-to-UI Protocol — github.com/ag-ui-protocol/ag-ui

- Kong AI Gateway Documentation — docs.konghq.com/gateway/latest/ai-gateway

- OpenTelemetry Semantic Conventions for GenAI — opentelemetry.io/docs/specs/semconv/gen-ai

- LiteLLM Proxy Documentation — docs.litellm.ai/docs/proxy

- Electricity Maps API (Carbon-aware routing) — electricitymaps.com

- SPIFFE / SPIRE (Service Identity) — spiffe.io

*This document is produced by the Enterprise AI Architecture Practice. It represents current best practices as of April 2026 and should be reviewed quarterly given the pace of change in the AI infrastructure landscape.*
