---
title: Agentic AI Security Architecture & Multi-Layer Guardrails
---

# Agentic AI Security Architecture & Multi-Layer Guardrails

> **Current as of July 2026.** This guide covers the full threat catalog for multi-agent AI systems, the multi-layer guardrail architecture, and how the world's leading technology companies and consultancies implement production-grade AI security. For agent credential identity (SPIFFE/SPIRE, IETF AIMS, Entra Agent ID), see [Agentic AI Security & Identity](agentic-ai-security-identity.md). This guide covers the behavioral and architectural layers above identity.

:::warning See Also: Identity is Layer 1
    [Agentic AI Security & Identity](agentic-ai-security-identity.md) covers the credential and identity stack (SPIFFE/SPIRE, OWASP ASI01–ASI10, bounded autonomy, HITL). This guide covers all 18 threat classes with their architectural controls, the 14-layer guardrail map, and how tech giants operationalize these defenses at scale.

---

## 1. Core Security Doctrine

The foundational principle of agentic AI security, drawn from production deployments at scale:

> **Prompt injection is not reliably detectable. It is survivable. Architect so that a fully hijacked agent still cannot cause unacceptable harm: least privilege, egress control, human gates on pivots, and blast-radius isolation. Detection layers reduce frequency; architecture bounds severity.**

This doctrine inverts the traditional security posture. In classical application security, you detect and block attacks at the perimeter. In agentic AI security, you assume some attacks will succeed and design the system so that even a fully compromised agent cannot produce catastrophic outcomes.

Three architectural principles follow:

| Principle | Implementation |
|-----------|---------------|
| **Least privilege per agent** | Each agent gets the minimum tool set required — no cross-agent tool sharing without explicit policy |
| **Egress control as invariant** | All agent outbound traffic flows through a proxied allowlist — no direct internet egress from agent runtimes |
| **Blast-radius isolation** | Tenant/workload separation ensures a compromised agent in one namespace cannot read or affect another |

Standards framing: **OWASP Top 10 for LLM Applications** (LLM01–LLM10) covers the model-level risks; **OWASP Agentic AI Security** taxonomy extends this to the 9 agentic-specific threat classes (memory poisoning, tool misuse, privilege compromise, cascading hallucination, intent manipulation, identity spoofing, rogue agents, HITL bypass, inter-agent communication attacks). Governance overlays: NIST AI RMF (Map/Measure/Manage/Govern), ISO 42001 AIMS, EU AI Act high-risk obligations.

---

## 2. Threat Catalog: 18 Attack Classes

Each threat class is mapped to four treatment stages: **Architecture** (structural prevention), **Detection** (signals that fire during an attack), **Mitigation/Containment** (active response), and **Recovery** (restoring integrity after the event).

### 2.1 Input and Context Threats

| Threat | Attack Shape | Architecture (Prevent) | Detection | Mitigation/Containment | Recovery |
|--------|-------------|----------------------|-----------|----------------------|----------|
| **Prompt Injection (Direct)** | User crafts input overriding policy | Instruction hierarchy; system-prompt integrity hash; input classifiers | Injection classifiers; jailbreak heuristics; anomaly on refusal-rate | Refuse/strip; degrade to restricted toolset | Session quarantine; pattern → detector update |
| **Indirect Injection** | Instructions embedded in retrieved docs/webpages/emails/tool results | Provenance tagging (untrusted spans); spotlighting/delimiting; lethal-trifecta separation (private data ∥ untrusted content ∥ egress never co-resident) | Tool-result scanners; canary instructions; egress DLP hits | Drop tainted span; require approval for post-taint actions | Purge tainted context/memory; blocklist source |
| **Context Poisoning** | Adversary shapes long-lived context (files, tickets) agent will read | Same as indirect + content signing for internal sources | Diffing trusted sources; write-audit on agent-readable stores | Re-fetch from source of record | Invalidate derived memories by provenance |

### 2.2 Memory and Persistence Threats

| Threat | Attack Shape | Architecture (Prevent) | Detection | Mitigation/Containment | Recovery |
|--------|-------------|----------------------|-----------|----------------------|----------|
| **Tool Poisoning** | Malicious MCP tool descriptions / rug-pull updates | Private registry, manifest hash pinning, review tiers | Manifest-change alerts; behavioral diff of tool outputs | Suspend server; tier downgrade | Rotate creds it saw; audit calls since change |
| **Memory Poisoning** | Implant persistent instructions/facts into long-term memory | Gated writes, provenance, quarantine pipeline | Write anomaly detection; instruction-like-memory classifier | Quarantine records | Bulk invalidation by provenance/time window |
| **Vector DB Poisoning** | Adversarial embeddings/documents steer retrieval | Ingest validation + provenance; per-tenant collections; embedding-space outlier checks (OWASP LLM08) | Retrieval-quality drift; outlier density | Remove vectors; re-embed clean corpus | Snapshot restore of collection |

### 2.3 Identity and Credential Threats

| Threat | Attack Shape | Architecture (Prevent) | Detection | Mitigation/Containment | Recovery |
|--------|-------------|----------------------|-----------|----------------------|----------|
| **Agent Impersonation** | Rogue process claims agent identity | SPIFFE attestation-issued identity; no static agent API keys | Cert/token misuse analytics; unknown-SVID alerts | Revoke SVID (stop renewal) | Re-attest fleet; audit actions under stolen identity |
| **Tool Impersonation** | Fake MCP server / typosquatted card or package | Signed Agent Cards (A2A), registry-only resolution, TLS pinning to registered endpoints | Card-signature failures; endpoint drift | Block; catalog alert | Purge results consumed from impostor |
| **Identity/Credential Theft** | Token exfiltrated from sandbox/logs | Short-TTL, DPoP/mTLS-bound, audience-scoped tokens; secrets never in context; log redaction | Token-replay detection (binding failures); impossible-travel for workloads | Stop renewal; kill sessions | Rotate; review actor-chain audit |

### 2.4 Output and Action Threats

| Threat | Attack Shape | Architecture (Prevent) | Detection | Mitigation/Containment | Recovery |
|--------|-------------|----------------------|-----------|----------------------|----------|
| **Data Exfiltration** | Hijacked agent leaks via tool params, URLs, DNS, markdown images, A2A artifacts | Egress allowlist; DLP on all outbound; no raw-context sharing cross-boundary | DLP alerts; unusual destination/volume | Block channel; kill task | Incident response; rotate exposed secrets |
| **Hallucinated Actions** | Agent invents tool/params/entities → wrong real-world effects | Schema validation (nonexistent tool = hard fail); reference-validity checks (IDs must exist); acceptance criteria | Verification-gate failures; downstream reconciliation breaks | Block commit; re-plan | Saga compensation of committed steps |
| **Jailbreaks** | Roleplay/encoding/multi-turn erosion of safety | Safety engine layers; conversation-level (not turn-level) analysis | Multi-turn drift detectors; shared industry severity rubrics (cross-vendor CVSS-for-jailbreaks efforts) | Terminate session; restrict caps | Red-team → retrain filters |

### 2.5 Supply Chain and Infrastructure Threats

| Threat | Attack Shape | Architecture (Prevent) | Detection | Mitigation/Containment | Recovery |
|--------|-------------|----------------------|-----------|----------------------|----------|
| **Supply Chain** | Compromised model, SDK, MCP package, prompt template, fine-tune data | Signed artifacts (Sigstore), SBOM + AI-BOM (models, datasets, prompts), pinned versions, private mirrors | Dependency scanning; registry diff alerts | Version rollback; registry freeze | Rebuild from attested sources |
| **Sandbox Escape** | Malicious code (agent-written or tool) breaks isolation | microVM/gVisor; syscall filtering; no host mounts; egress proxy; non-root | Runtime sensors (Falco-class); unexpected syscalls/egress | Kill microVM (disposable by design) | Rebuild from image; forensic snapshot |
| **Model Extraction/Abuse** | Systematic querying to clone or misuse capacity | Gateway quotas, anomaly-based throttling, watermark/canary responses | Query-distribution analytics | Rate-limit; ban keys | Legal/contractual |

### 2.6 Multi-Agent and Human-Layer Threats

| Threat | Attack Shape | Architecture (Prevent) | Detection | Mitigation/Containment | Recovery |
|--------|-------------|----------------------|-----------|----------------------|----------|
| **Cross-Agent Contamination** | Compromised agent spreads instructions via shared memory/messages/A2A | Mediated edges only; per-agent namespaces; content screening on inter-agent messages | Lineage tracing (which agents consumed X) | Isolate agent (identity revoke) | Contamination graph walk → invalidate downstream state |
| **Insider Threat** | Privileged human abuses agent platform (policy edits, registry, memory) | Separation of duties; policy/registry changes need 2-person review; admin actions fully audited | UEBA on admin ops | Freeze change; access review | Restore signed policy bundles |
| **HITL Bypass / Approval Fatigue** | Flooding approvals or crafting misleading summaries | Approval UI shows raw action + diff, not agent prose; rate-limits on approval requests; risk-tiered routing | Approval-latency/override analytics | Auto-deny on timeout; batch-suspicious escalation | Retrospective review of approvals granted under flood |

---

## 3. Threat-Model Method

Apply **STRIDE per trust boundary** (as defined in your architecture's trust-boundary diagram) combined with the **OWASP Agentic AI taxonomy** per component. Maintain a risk register with:

- Owner, likelihood × impact score
- Control mapping (ISO 27001 Annex A + AI-specific controls)
- Test evidence (red-team findings, automated injection test results)

**Continuous adversarial testing cadence:**

| Cadence | Activity |
|---------|----------|
| Every CI run | Automated injection suites (promptfoo / garak-class tooling) across regression fixtures |
| Weekly | Automated red-team scanning against staging environment |
| Quarterly | Human red-team exercises, bug bounty scope review including agent behaviors |
| On model version change | Re-run full injection + jailbreak suite against new model version before promotion |

The [Skills Assessment checklist](enterprise-ai-skills-assessment.md) section A1–A10 maps directly to the threat classes above for architecture review purposes.

---

## 4. Multi-Layer Guardrail Architecture

### 4.1 Deterministic vs Probabilistic — The Composition Rule

Two fundamentally different control types are combined in production guardrail stacks:

**Deterministic controls** (regex/schema/policy/allowlists/quotas):
- Same input → same verdict; fully auditable
- Use for **invariants**: spend caps, tool allowlists, PII patterns, schema validation, egress domains, approval routing
- Never fail silently — errors are actionable

**Probabilistic controls** (classifiers, guard models, critic LLMs, Bedrock Guardrails, Azure Content Safety, Model Armor, Llama-Guard-class):
- Handle semantics that deterministic rules cannot
- Have error rates → **never the sole control for an unacceptable outcome**
- Track FP/FN rates as SLOs; a guardrail with unmeasured error rate is decoration

**Composition rule:** Deterministic outer shell, probabilistic inner filters. Probabilistic verdicts can **tighten** (escalate/deny) but **never loosen** a deterministic deny.

### 4.2 Operational Law

Every guardrail in a production system must:

1. **Emit telemetry** — fired/passed/latency metrics on every evaluation
2. **Be individually toggleable** — feature flag per guardrail layer, not a monolithic on/off
3. **Be tested in CI** — adversarial fixtures test each guardrail independently
4. **Ship through release governance** — guardrail changes follow the same pipeline as code (PR review, eval gate, staged rollout)

---

## 5. The 14-Layer Guardrail Map

| Layer | Deterministic Controls | Probabilistic Controls |
|-------|----------------------|----------------------|
| **Input** | Length/format limits; encoding normalization; known-pattern blocklists; system-prompt hash check | Injection/jailbreak classifiers; intent screening |
| **Output** | Schema validation; secret/PII regex+detectors; link/domain allowlist; license/copyright rules | Toxicity/harm classifiers; groundedness/hallucination scoring vs sources |
| **Context** | Budget enforcement; provenance tags required; untrusted-span delimiting | Contextual-relevance and contradiction detection |
| **Memory** | Write ACLs; provenance-gated persistence; TTL | Instruction-like-memory and poisoning classifiers |
| **Planning** | Plan-schema validation; pivot-step approval routing; depth/budget caps | Plan-risk scoring; feasibility critic |
| **Tool** | Schema+type validation; idempotency keys; allowlists per agent; parameter bounds (amount ≤ limit); rate caps | Argument-anomaly detection; result-injection scanning |
| **Policy** | Cedar/OPA PDP on every action; fail-closed | Risk engine adjusting approval thresholds |
| **Infrastructure** | Sandbox profiles; egress proxy; mTLS; quotas | Runtime behavioral anomaly detection |
| **Model** | Provider safety configs pinned; model allowlist per data class | Constitutional/RLHF alignment (inherited); guard-model ensembles |
| **Human** | Mandatory approval gates on risk tiers; step-up auth; timeout=deny | Sampling-based human QA of "green" outputs |
| **Governance** | Release gates (eval thresholds must pass); registry enforcement | Continuous eval drift monitoring |
| **Compliance** | Residency routing; retention/legal hold; audit completeness checks | Automated compliance-evidence classification |

:::tip Architect's heuristic
    Map each threat from Section 2 to the layers that address it. Gaps where no layer covers a threat class are architecture risks. Most critical gap pattern: memory and context layers are often the weakest in early deployments — teams build input/output guardrails first and neglect the persistence plane.

---

## 6. How Google Implements at Scale

Google's agentic AI security stack integrates its cloud-native security fabric with AI-specific controls:

**Threat prevention layer:**
- **Vertex AI Model Armor** — Google's managed guardrail service for prompt injection detection, jailbreak classification, and toxicity filtering, integrated directly into Vertex AI endpoints
- **Sensitive Data Protection (DLP API)** — Applied at output layer for PII detection and redaction before agent responses reach downstream systems
- **Cloud Armor + Apigee** — Gateway-layer DDoS/rate-limiting and API management providing the deterministic outer shell; quota enforcement and allowlisted egress paths

**Identity and isolation layer:**
- **Workload Identity Federation** — OIDC-based agent identity without static API keys, equivalent to SPIFFE/SPIRE for GKE-hosted agents
- **GKE Sandbox (gVisor)** — User-space kernel for agent-executed code, providing syscall-level isolation without hardware VM overhead; microVM-equivalent blast-radius containment
- **Binary Authorization** — Signed container images enforced at deployment; supply chain integrity for agent runtimes

**Detection and response layer:**
- **Chronicle SIEM** — Centralized security analytics ingesting agent audit logs, tool call logs, and egress events; behavioral analytics on agent action sequences
- **Security Command Center** — Aggregated view of guardrail findings, DLP hits, and anomaly detections across the agent fleet
- **Gemini Security AI** — AI-powered threat hunting within Chronicle, enabling natural-language queries over agent behavioral logs

**Google's organizational model:** The AI security team is embedded within the broader Cloud Trust organization, with dedicated red-team capacity for Gemini and Vertex AI agents. External researchers can report through the Google VRP with agent-behavior scope included.

---

## 7. How Microsoft Implements at Scale

Microsoft's approach integrates Azure security services with its Responsible AI principles:

**Threat prevention layer:**
- **Azure AI Content Safety — Prompt Shield** — Dedicated indirect injection classifier, specifically trained on the attack pattern of instructions embedded in retrieved documents and tool results (the hardest guardrail problem to solve deterministically)
- **Azure Content Safety** — Multi-modal classifier for toxicity, harm, and policy violation in both inputs and outputs; FP/FN tracking via the Azure AI Foundry evaluation hub
- **Azure API Management** — Gateway-layer rate limiting, IP allowlisting, JWT validation, and egress control for all agent-to-external-system traffic

**Identity and isolation layer:**
- **Entra Agent ID (Workload Identity)** — Microsoft's managed identity for AI agents; federated credentials eliminate static secrets; audience-scoped tokens with short TTLs
- **Azure Confidential Computing** — Hardware-based trusted execution environments (TEEs) for agent runtimes processing regulated data; enclave-level isolation for the most sensitive workloads
- **Azure Policy** — Guardrail enforcement at the infrastructure layer; deny policies for non-compliant agent configurations (e.g., public endpoint exposure, unencrypted storage)

**Detection and response layer:**
- **Microsoft Defender for Cloud — AI Threat Protection** — Real-time detection of prompt injection, anomalous tool usage, and data exfiltration patterns in Azure AI deployments
- **Microsoft Sentinel** — SIEM with pre-built playbooks for agent security incidents; automated response workflows for identity revocation and session termination
- **Purview Information Protection** — Data lineage tracking from source systems through agent context into outputs; legal hold capability for agent evidence store

**Microsoft's organizational model:** The Responsible AI (RAI) team maintains the AI red-team (AIRT) which specifically attacks Copilot and Azure AI agent deployments, with findings feeding guardrail updates. The Security Copilot product itself operates on the same security architecture it defends.

---

## 8. How AWS Implements at Scale

AWS's security architecture for agentic AI centers on Bedrock Guardrails and the broader AWS security fabric:

**Threat prevention layer:**
- **Amazon Bedrock Guardrails** — Managed guardrail service with six control types: content filters (configurable severity thresholds), topic deny lists (semantic blocking), word filters (exact and wildcard), PII detection+redaction (20+ PII entity types), grounding checks (RAG answer faithfulness), and sensitive information filters (regex + ML patterns)
- **AWS WAF + CloudFront** — Deterministic outer shell for rate limiting, geo-blocking, and IP allowlisting at the API gateway level before requests reach agent infrastructure
- **Amazon Macie** — DLP service scanning S3 buckets used as agent knowledge stores and evidence stores for sensitive data classification and access anomaly detection

**Identity and isolation layer:**
- **AWS Nitro Enclaves** — Isolated compute environments for agent runtimes processing regulated data; no persistent storage, no operator access; attestation via the Nitro Attestation Document
- **IAM roles for service accounts (IRSA)** — Short-lived credentials bound to Kubernetes service accounts; equivalent to SPIFFE/SVID for EKS-hosted agents; audience-scoped and rotation-handled
- **Amazon Inspector** — Automated vulnerability scanning of agent container images and AI-BOM (tracking which model versions, SDK versions, and MCP package versions are in each agent deployment)

**Detection and response layer:**
- **Amazon GuardDuty** — Runtime threat detection for unusual API call patterns, credential exfiltration signals, and cross-account activity from agent roles
- **AWS Security Hub** — Aggregated findings across GuardDuty, Inspector, and Macie with custom insights for agent-specific threat patterns
- **CloudWatch Logs + Contributor Insights** — Tool audit logging at scale with anomaly detection on agent call distributions; behavioral delta alerting on tool-call frequency changes

**AWS's organizational model:** Amazon's AI Security Center of Excellence maintains the threat model for all Bedrock services and publishes the shared responsibility model for agentic workloads, which explicitly extends the traditional compute responsibility model to include prompt integrity, tool manifest integrity, and memory provenance as customer responsibilities.

---

## 9. How Top Consultancies Frame AI Security

Global consultancies have developed structured security frameworks for enterprise agentic AI engagements:

### Accenture — "Responsible AI Shield"

Accenture's 5-layer security model for agentic AI deployments:
1. **Perimeter** — API gateway controls, authentication, rate limiting
2. **Behavioral** — Guardrail classifiers and policy engines per request
3. **Identity** — Agent workload identity, delegation chain integrity
4. **Data** — Provenance tracking, DLP, residency enforcement
5. **Audit** — Immutable logs, evidence store, regulatory reporting

Their engagement model typically starts with a 4-week AI threat-model workshop, producing a prioritized risk register that maps to the client's existing ISO 27001 control framework with AI-specific extensions.

### McKinsey — AI Security Maturity Model

McKinsey's maturity stages for enterprise agentic AI security:
- **Level 1 (Reactive)** — Basic content filters; manual incident response; security added after deployment
- **Level 2 (Proactive)** — Systematic threat modeling; automated guardrails; security in the design process
- **Level 3 (Embedded)** — Security-by-design; continuous adversarial testing in CI; behavioral monitoring as business-as-usual
- **Level 4 (Adaptive)** — Self-improving defenses; red-team findings automatically feed guardrail updates; AI-assisted threat hunting

McKinsey's research indicates most enterprises deploying agentic AI in 2025–2026 enter at Level 1 and need 12–18 months to reach Level 3.

### Deloitte — AI Trust Model

Deloitte's AI trust framework for regulated industries (financial services, healthcare, public sector) structures AI security as a trust assurance problem:
- **Technical trust** — Guardrails, testing, and security architecture
- **Process trust** — Change management, incident response, audit trails
- **Regulatory trust** — Compliance mapping, evidence generation, regulator engagement
- **Stakeholder trust** — Explainability, human oversight, escalation paths

Their approach emphasizes that in regulated industries, the audit trail and the regulatory evidence package are as important as the technical controls themselves.

### Big-4 Common Playbook for Regulated Industries

Across finance and healthcare deployments, the common engagement pattern is:
1. **AI-BOM creation** — Inventory all model versions, SDK versions, prompt templates, and fine-tuning datasets
2. **Trust boundary mapping** — Formal diagram of all agent-to-system and agent-to-agent data flows
3. **Threat model workshop** — STRIDE + OWASP agentic taxonomy applied to each boundary
4. **Control gap analysis** — Current controls vs target state; prioritized remediation roadmap
5. **Guardrail architecture design** — Layer map tailored to the specific agent workflow
6. **Red-team exercise** — Adversarial testing against the deployed system
7. **Audit readiness** — Evidence package mapping controls to regulatory requirements

---

## 10. Real-World Big Wins

### JPMorgan Chase — Contract Intelligence (COIN) Successor
JPMorgan's COIN program (contract review AI) was expanded into a multi-agent agentic system handling loan servicing, compliance checking, and trade processing. The security architecture that enabled regulatory approval:
- Egress control as an invariant: agents cannot reach external networks; all external calls route through a proxied, allowlisted API gateway
- Hallucination containment: schema validation + reference-validity checks before any financial record mutation; saga compensation for rollback
- Audit completeness: every agent action is logged with the full actor chain; this was a non-negotiable requirement from the OCC (Office of the Comptroller of the Currency)

The guardrail architecture allowed JPMorgan to demonstrate to regulators that even in a worst-case injection attack, no agent could authorize a transaction outside its bounded decision scope.

### Salesforce Agentforce — Einstein Trust Layer at Scale
Salesforce's Agentforce platform (which uses Claude from Anthropic as the underlying LLM, accessed via the Einstein Trust Layer) is built on a multi-layer guardrail stack that implements the core principles from Section 5:
- **Einstein Trust Layer** — Enforces zero data retention, PII masking, prompt-injection defense, toxicity scoring, and geo-aware routing before any prompt leaves the Salesforce environment and reaches the LLM provider
- **Zero-data retention** — LLM calls routed through Salesforce infrastructure with contractual no-training commitment from all model providers; data residency per region
- **Audit trail** — Every agent action logged to the Einstein Activity Platform with full actor-chain capture; customer-accessible audit API
- **FedRAMP High** — Agentforce achieved FedRAMP High authorization in 2025, unlocking federal and public-sector procurement

The trust layer is the primary enterprise sales differentiator — it enables Agentforce to be deployed in financial services, healthcare, and government contexts that would otherwise reject agentic AI.

### ServiceNow + Moveworks — FedRAMP-Authorized Agentic AI
ServiceNow (the platform) holds FedRAMP High authorization. Moveworks from ServiceNow (its conversational AI and agentic front-door product) achieved FedRAMP **Moderate** authorization in February 2026, enabling deployment to federal agencies and defense contractors. The security architecture that enabled authorization:
- Zero-data-retention contracts with all underlying LLM providers
- Complete audit log with immutable storage for federal customers
- Human-in-the-loop as a mandatory gate for any workflow step touching access control changes
- Geo-aware routing for data residency requirements

This demonstrates that the guardrail architecture described in Section 5 is not just a best practice — it is the architectural prerequisite for operating agentic AI in the most security-sensitive environments. Separately, Agentforce from Salesforce achieved FedRAMP High authorization in 2025.

---

## 11. Compliance Overlay

| Framework | Relevant Requirements | Architect Action |
|-----------|----------------------|-----------------|
| **NIST AI RMF** | Map (categorize risk), Measure (quantify), Manage (controls), Govern (oversight) | Map each threat class to a Manage function control; use the risk register as the Measure artifact |
| **ISO 42001 AIMS** | Clause 6.1 (AI risk assessment), Clause 8.4 (AI system operation), Annex A (AI-specific controls) | Align guardrail telemetry to 42001 Annex A controls A.6.1–A.6.3 (AI risk treatment) |
| **ISO 27001** | Annex A controls (especially A.8 Technology controls for AI-extended threat surface) | AI-BOM, dependency scanning, registry controls map to A.8.7, A.8.20, A.8.22 |
| **EU AI Act — GPAI** | Transparency obligations, systemic risk assessment (in force since Aug 2, 2025) | Model provider transparency documentation; GPAI applies to model providers, not deployers, but deployers must verify compliance |
| **EU AI Act — High-Risk** | Risk management system, technical documentation, logging, human oversight, robustness (Annex III application Dec 2, 2027) | Guardrail audit telemetry = logging requirement; human approval gates = oversight requirement |
| **NIST IR 8596** | Agentic AI-specific guidance (draft 2026) | Follow NIST's agent threat taxonomy as a compliance vocabulary for US federal agency engagements |

---

## 12. Security Architecture Review Checklist

Cross-keyed to the [Agentic AI Security & Identity](agentic-ai-security-identity.md) A1–A10 checklist (which covers identity) and the [Skills Assessment](enterprise-ai-skills-assessment.md) 30-point review checklist.

**G-series: Guardrail Architecture**

| # | Check | Pass Criteria |
|---|-------|--------------|
| G1 | Deterministic outer shell defined | Input, output, and egress have deterministic rules before probabilistic classifiers |
| G2 | Probabilistic controls measured | FP and FN rates tracked as SLOs; not sole control for any unacceptable outcome |
| G3 | All guardrails emit telemetry | fired/passed/latency metrics on every evaluation; no silent guardrails |
| G4 | Guardrails are individually toggleable | Feature flag per layer; can disable one without affecting others |
| G5 | Guardrails tested in CI | Adversarial fixture suite; regression tested on each PR |
| G6 | Threat model covers all 18 classes | Risk register maps each class to controls; no uncovered classes |
| G7 | Egress is allowlisted, not blocked | Default-deny egress with explicit allowlist; not default-allow with blocklist |
| G8 | Lethal-trifecta separation enforced | Private data, untrusted content, and egress never co-resident in one agent context |
| G9 | Memory writes are gated and provenance-tagged | No agent can write to memory without ACL check and provenance label |
| G10 | HITL approval shows raw action, not prose | Approval UI presents the actual tool call + diff, not the agent's natural language summary |
| G11 | AI-BOM maintained and scanned | Model versions, SDK versions, MCP packages tracked; dependency scanning in CI |
| G12 | Sandbox provides microVM-level isolation | Agent-executed code runs in gVisor/Firecracker or equivalent; no host mounts |
| G13 | Incident response tested | Kill switches (<1 min reach); emergency shutdown sequence documented and drilled |
| G14 | Red-team on quarterly cadence | Human adversarial testing quarterly; findings tracked in risk register |
| G15 | Compliance evidence auto-generated | Audit telemetry maps to regulatory requirements without manual collection |
