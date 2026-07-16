---
title: "AIDR — AI Detection and Response: Complete Enterprise Guide"
date: 2026-07-14
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
covers_version: "as of July 2026"
doc_type: guide
source_type: native-md
source_file: ""
tags: ["aidr", "ai-security", "agentic-ai", "detection-response", "enterprise-security", "prompt-injection", "mcp-security", "zero-trust"]
---

# AIDR — AI Detection and Response: Complete Enterprise Guide

> **Current as of July 2026.** AIDR (AI Detection and Response) is the security category that secures the runtime behavior of autonomous AI agents. This guide covers its definition, architecture, vendor landscape, threat model, implementation patterns, and relationship with MCP, A2A, OWASP, and enterprise governance frameworks.

---

## Executive Summary

AIDR is the security discipline built to monitor, detect, and respond to threats that emerge when AI agents execute tasks autonomously inside enterprise systems. It extends the detection-and-response logic that EDR applied to endpoints — and that XDR extended across the network — to the AI layer, where agents act on behalf of identities, invoke tools, access memory, and coordinate with other agents at machine speed.

The category formally crystallized in September–December 2025, driven by CrowdStrike's acquisition of Pangea and launch of Falcon AIDR, and by Zenity's dedicated AIDR platform. Palo Alto Networks (Prisma AIRS 3.0) and Cisco followed at RSAC 2026. An academic production-validated framework (ADR, arXiv 2605.17380) deployed at Uber across 7,200+ hosts validated the approach at scale.

**AIDR is not a general AI framework, workflow orchestrator, or agent runtime.** It is a security control plane layered above an existing agentic architecture to make agent behavior observable, policy-enforceable, and incident-recoverable.

---

## Terminology and Definitions

### Primary Definition (Dominant, 2025–2026)

| Term | Definition |
|------|-----------|
| **AIDR** | AI Detection and Response — a cybersecurity capability providing continuous visibility into AI agent behavior at runtime, with automated response when that behavior poses a risk |
| **AIDR Platform** | Software product category combining agent telemetry, intent analysis, behavioral baselining, policy enforcement, and automated remediation |
| **AISPM** | AI Security Posture Management — the pre-deployment complement to AIDR (configuration auditing, supply-chain scanning); AISPM reduces static risk; AIDR enforces at runtime |

### Historical Definition (Legacy, 2013–present, humanitarian domain)

| Term | Definition |
|------|-----------|
| **AIDR** | Artificial Intelligence for Disaster Response / Digital Response — open-source platform from QCRI (Qatar Computing Research Institute) for classifying social-media crisis messages using human + ML hybrid approaches |

**Important:** The two definitions are completely unrelated. This guide focuses exclusively on the enterprise security meaning. The humanitarian AIDR predates the security AIDR by over a decade; the two share only the acronym.

### Relationship to Adjacent Categories

```
EDR  →  monitors endpoints (processes, file writes, network)
XDR  →  correlates across endpoint, network, identity, cloud, email
MDR  →  managed service delivery of EDR/XDR capabilities
AIDR →  observes AI agent decision paths, tool invocations, execution flow
AISPM → pre-deployment posture of AI models, agents, configurations
```

---

## Historical Timeline

| Date | Event |
|------|-------|
| 2013 | QCRI releases "Artificial Intelligence for Disaster Response" — the original AIDR (humanitarian) |
| 2022–2024 | Prompt injection and jailbreak attacks proliferate; enterprise AI adoption accelerates |
| Jan 2025 | OWASP publishes LLM Top 10 2025; prompt injection remains LLM01 for third consecutive year |
| Mid-2025 | Enterprises deploy autonomous agents at scale via MCP and LangGraph; attack surface becomes measurable |
| Sep 2025 | CrowdStrike acquires Pangea (~$260M); launches Agentic Security Platform, coins "AIDR" as next-gen security category |
| Dec 2025 | CrowdStrike Falcon AIDR goes GA; Zenity releases dedicated AIDR platform; OWASP publishes Agentic Top 10 (ASI01–ASI10) |
| May 2026 | arXiv 2605.17380 published: first large-scale production-validated ADR framework (Uber, 7,200+ hosts) |
| Apr 2026 | RSAC 2026: CrowdStrike, Palo Alto Networks (Prisma AIRS 3.0), and Cisco all ship agentic SOC tools; AIDR becomes mainstream category |
| Jun 2026 | Obsidian Security extends SaaS XDR capabilities to agentic systems; market consolidation begins |
| Jul 2026 | AIDR category broadly adopted; market analysts project consolidation into major security platforms |

---

## Part 1 — Definition and Origin

### Is AIDR an Official Standard?

AIDR is **not** a formal standard defined by ISO, IEEE, IETF, or NIST as of July 2026. It is a **vendor-coined category label** introduced by CrowdStrike in September 2025 and since adopted by Zenity, Obsidian Security, and others. However:

- NIST AI RMF 1.0 and the forthcoming AI 600-2 implicitly require the capabilities AIDR provides (GOVERN/MEASURE/MANAGE functions)
- OWASP Agentic Top 10 (December 2025) provides the threat taxonomy that AIDR platforms operationalize
- EU AI Act Articles 9 and 17 mandate risk management systems and post-market monitoring for high-risk AI systems — functions AIDR fulfills

There is no RFC, ISO standard, or IETF draft specifically for AIDR as a category. The academic community uses "ADR" (Agentic Detection and Response) interchangeably.

### Who Introduced It?

CrowdStrike crystallized the term "AIDR" in September 2025 following the Pangea acquisition. Zenity had been building the underlying capability (agent runtime security) independently and adopted the category label. The Relay Magazine article "AIDR arrives: CrowdStrike crystallizes agent security stack" (September 2025) documents the category formation.

### Is It Open Source?

The AIDR category spans both commercial and open approaches:
- **Commercial**: CrowdStrike Falcon AIDR, Zenity Defend, Palo Alto Prisma AIRS — proprietary
- **Research/Open**: ADR-Bench (Uber, arXiv 2605.17380) — open benchmark dataset for the community
- **Supporting open tools**: OpenTelemetry GenAI semantic conventions, OWASP threat taxonomy — open standards used within AIDR implementations

---

## Part 2 — Literature Survey

### Primary Academic Sources

#### ADR: An Agentic Detection System for Enterprise Agentic AI Security
**arXiv: 2605.17380** | May 2026 | Uber Research

- **Objective:** First production-validated enterprise framework for securing MCP-based AI agents
- **Architecture:** Three-component system: ADR Sensor (telemetry), ADR Explorer (red-team), ADR Detector (two-tier detection)
- **Methodology:** High-fidelity agent telemetry capture; systematic adversarial testing; fast-triage + context-aware LLM reasoning
- **Evaluation:**
  - Production: 97.2% precision for credential detection across 7,200+ hosts, 10,000+ daily agent sessions
  - ADR-Bench (302 tasks, 17 techniques): 67% attack detection, zero false positives
  - AgentDojo (93 tasks): 100% attack detection, 3 false alarms
- **Strengths:** Production-validated at scale; open benchmark (ADR-Bench)
- **Limitations:** MCP-specific; limited evaluation of non-tool-calling agent architectures
- **Category:** Agent Security / MCP Runtime Security

#### AgentSOC: A Multi-Layer Agentic AI Framework for Security Operations Automation
**arXiv: 2604.20134** | April 2026

- **Objective:** Multi-agent SOC automation using agentic AI for threat detection and response
- **Architecture:** Orchestrator + specialist agents for triage, investigation, and remediation
- **Methodology:** LangGraph-based orchestration; MITRE ATT&CK-aligned threat modeling
- **Category:** AI SOC / Security Operations Automation

#### Perspectives on a Reliability Monitoring Framework for Agentic AI Systems
**arXiv: 2511.09178** | November 2025

- **Objective:** Reliability and behavioral monitoring for autonomous AI systems
- **Relevance to AIDR:** Establishes behavioral baseline methodology used in AIDR platforms
- **Category:** Agent Reliability / Observability

### Threat Research Sources

| Source | Key Contribution |
|--------|----------------|
| OWASP Agentic Top 10 (Dec 2025) | ASI01–ASI10 threat taxonomy for AI agents |
| OWASP LLM Top 10 (2025 edition) | LLM01 prompt injection remains top threat |
| MITRE ATLAS | AI-specific adversarial TTP matrix |
| MCP-SandboxScan (arXiv 2601.01241) | WASM-based secure MCP tool execution |
| MCP Pitfall Lab (arXiv 2604.21477) | Multi-vector attack vectors on MCP tool servers |

### Research Categorization

| Category | Key Papers/Sources |
|----------|--------------------|
| Agent Runtime Security | arXiv 2605.17380 (ADR/Uber), Zenity AIDR architecture |
| Prompt Injection Defense | OWASP LLM01, arXiv 2604.21477, Getmaxim guide |
| Multi-Agent Security | arXiv 2605.17380, AgentSOC |
| Identity & Zero Trust | arXiv 2505.19301 (ZT agent identity), IETF draft-klrc-aiagent-auth-00 |
| MCP Security | arXiv 2601.01241, MCP Pitfall Lab |
| AI SOC | AgentSOC (2604.20134), CrowdStrike Falcon AIDR |
| Governance / Compliance | NIST AI RMF, EU AI Act, ISO 42001 |

---

## Part 3 — Vendor Landscape

### Tier 1: Category Leaders

#### CrowdStrike — Falcon AIDR
- **GA:** December 2025 (following Pangea acquisition, September 2025)
- **Architecture:** Unified platform covering data, models, agents, identities, infrastructure, and prompt interactions
- **Key capabilities:**
  - 99% detection efficacy for prompt attacks at ≤30ms latency
  - 180+ prompt injection techniques tracked
  - Shadow AI discovery across SaaS and cloud
  - Microsoft Copilot agent coverage (2026 expansion)
  - Integration with Microsoft Defender telemetry into Falcon Next-Gen SIEM
- **SDK/API:** Falcon platform APIs; no standalone AIDR SDK published
- **Enterprise features:** 15-day trial; white papers on AI agent security architecture; interactive prompt injection taxonomy

#### Zenity — Zenity Defend (AIDR)
- **Position:** Specialist vendor; coined "AIDR" definition independently
- **Architecture:** Three-layer runtime monitoring: execution monitoring, intent analysis, runtime response
- **Key capabilities:**
  - Full execution graph mapping (decision chains, tool invocations, control flow)
  - Intent-aware threat detection (indirect injection via RAG documents)
  - Build-time to runtime correlation
  - Six threat vectors: prompt injection, data exfiltration, privilege escalation, multi-agent attacks, memory poisoning, tool misuse
  - PII/PHI/financial data classification in real-time
- **Integration:** AISPM integration; SaaS platform and custom deployment support

#### Palo Alto Networks — Prisma AIRS 3.0
- **Position:** Extension of existing Prisma platform to agent workloads
- **Key capabilities:** Agent discovery, action auditing, governance enforcement
- **2026 additions:** Unit 42 Frontier AI Defense services; AI-agent runtime protection at RSAC 2026

### Tier 2: Expanding Vendors

| Vendor | Offering | Notes |
|--------|---------|-------|
| **Cisco** | AI-agent runtime protection | Announced RSAC 2026; details limited |
| **Obsidian Security** | SaaS XDR extended to agentic systems | Focuses on SaaS agent behavior |
| **Microsoft** | Security Copilot + Sentinel | Indirect AIDR via AI-augmented SOC; no explicit AIDR branding |
| **AWS** | GuardDuty + Bedrock security controls | Platform-native; not branded as AIDR |
| **Google** | Vertex AI security + Security Command Center | Integrated; not branded as AIDR |
| **IBM** | QRadar AI + Watsonx security | AI-augmented SIEM, not dedicated AIDR |

### Vendor Evaluation Matrix

| Criterion | CrowdStrike | Zenity | Palo Alto |
|-----------|-------------|--------|-----------|
| Agent telemetry depth | ★★★★★ | ★★★★★ | ★★★★☆ |
| Prompt injection detection | ★★★★★ | ★★★★★ | ★★★★☆ |
| MCP-aware detection | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| Enterprise integration | ★★★★★ | ★★★☆☆ | ★★★★★ |
| Shadow AI discovery | ★★★★★ | ★★★★☆ | ★★★★★ |
| Open telemetry support | ★★★☆☆ | ★★★★☆ | ★★★☆☆ |
| Time to value | ★★★☆☆ | ★★★★☆ | ★★★☆☆ |

---

## Part 4 — Open Source Ecosystem

### ADR-Bench
- **Source:** Uber Research, arXiv 2605.17380
- **Description:** 302-task benchmark suite covering 17 attack techniques for evaluating AIDR/ADR systems
- **Purpose:** Community evaluation harness; enables reproducible comparison of detection approaches
- **Status:** Published May 2026; community adoption growing

### AgentDojo
- **Description:** Public benchmark for evaluating agent security against injection attacks
- **Scope:** 93 task-based scenarios; used in ADR paper evaluation
- **Stars/Adoption:** Established benchmark in the agent security research community

### Bifrost (Open Prompt Firewall)
- **Description:** Gateway-layer prompt injection defense across LLM providers and MCP tools
- **Architecture:** Dual-stage input/output guardrails; CEL-based rule targeting; MCP tool allow-lists
- **Advantage:** No application code changes required

### OWASP GenAI Security Project
- **Description:** Open community producing threat taxonomies, guidelines, and tooling for AI security
- **Key outputs:** Agentic Top 10 (Dec 2025), LLM Top 10 (2025), MCP security guidelines
- **GitHub:** Active community with 100+ contributors

### Supporting Open Standards

| Standard | Role in AIDR |
|----------|-------------|
| **OpenTelemetry GenAI conventions** | Standard telemetry schema for AI agent traces |
| **SPIFFE/SPIRE** | Agent identity attestation and credential issuance |
| **OPA (Open Policy Agent)** | Policy-as-code for tool and data access decisions |
| **Cedar** | Amazon's policy language for fine-grained authorization |

---

## Part 5 — Architecture Deep Dive

### Core Architecture Overview

AIDR operates as a runtime security control plane that intercepts, observes, and governs AI agent execution. The canonical architecture has three interdependent layers:

```
┌─────────────────────────────────────────────────────────┐
│                  AIDR CONTROL PLANE                      │
│                                                          │
│  ┌────────────────┐  ┌────────────────┐  ┌───────────┐  │
│  │ Intent-Based   │  │  Execution     │  │ Automated │  │
│  │  Detection     │  │ Observability  │  │ Response  │  │
│  └────────────────┘  └────────────────┘  └───────────┘  │
└─────────────────────────────────────────────────────────┘
              ↕ intercepts / observes / governs
┌─────────────────────────────────────────────────────────┐
│                 AGENT EXECUTION LAYER                    │
│                                                          │
│  Agent Runtime → Tools → Memory → MCP Servers → A2A     │
└─────────────────────────────────────────────────────────┘
```

### Component 1: Intent-Based Detection

Traditional signature matching fails against indirect prompt injection embedded in retrieved documents or external API responses. AIDR's intent layer analyzes:

- **Cross-layer behavioral correlation** — links prompt content + tool calls + memory reads + data access into a unified execution graph
- **Behavioral baselining** — establishes what "normal" looks like per agent, per workflow, per user context
- **Anomaly classification** — deviations from baseline scored against threat categories (goal hijack, tool misuse, privilege escalation)
- **Indirect injection detection** — identifies injections arriving through RAG documents, email, database records, web content retrieved by the agent

### Component 2: Full Execution Observability

AIDR must capture telemetry that existing EDR/SIEM tools cannot produce:

| Telemetry Type | What Is Captured |
|---------------|-----------------|
| **Execution graph** | Full decision chain: prompt → reasoning → tool selection → tool call → output → next action |
| **Memory access log** | Which memory namespaces were read/written; context window contents at each step |
| **Tool invocation trace** | Tool name, parameters, response, latency, authorization check result |
| **MCP session log** | MCP server identity, capability negotiation, tool manifest hash, individual call chain |
| **A2A message trace** | Inter-agent messages, delegated task IDs, sub-agent identities, outcome chains |
| **Identity events** | Token issuance, permission checks, scope validations, OBO flows |
| **Data egress events** | What data left the trust boundary, in what form, to which destination |

The ADR Sensor (arXiv 2605.17380) addresses the observability gap where "existing EDR tools see file writes but not agent reasoning, prompts, or causal chains linking intent to execution."

### Component 3: Automated Response at Agent Speed

Human analysts cannot respond at the speed agents operate. AIDR automates:

| Response Action | Trigger Condition |
|----------------|-------------------|
| **Agent quarantine** | Confirmed malicious goal hijack or privilege escalation |
| **Action blocking** | Tool call matches deny policy or exceeds parameter bounds |
| **Permission revocation** | Agent identity token revoked in real-time |
| **Session termination** | Critical data exfiltration detected in flight |
| **Alert escalation** | Anomaly score exceeds threshold; routed to human SOC analyst |
| **Automated remediation** | Pre-built SOAR playbook executed; snapshot taken for forensics |
| **Memory sanitization** | Poisoned memory entries quarantined; clean state restored |

### Supporting Architecture Components

#### Agent Governance Registry
Central registry tracking every deployed agent: owner, model version, data access scope, tool manifest, deployment environment. Prerequisite for AIDR — you cannot monitor what you have not inventoried.

#### Prompt Firewall
Inline inspection of every prompt entering and every response exiting an agent or model. Can be implemented at:
- **AI Gateway layer** (Kong AI Gateway, Azure API Management, AWS Bedrock Guardrails) — intercepts all traffic
- **MCP proxy layer** — sits between agent and MCP server
- **Agent SDK layer** — instrumented directly in the agent runtime

#### Policy Engine
Enforces behavioral constraints defined as code (OPA/Cedar/Rego). Policies govern:
- Which tools an agent identity can invoke
- What data scopes are accessible in what contexts
- Which output transformations are permitted
- When human approval is required (HITL gates)

#### Sandboxed Execution
High-risk agent actions (OS commands, browser control, code execution) run in isolated containers (Firecracker microVMs or gVisor-sandboxed Kubernetes pods) to bound blast radius.

---

## Part 6 — Threat Model: OWASP Agentic Top 10 (2026)

OWASP released the first Agentic Top 10 in December 2025 (ASI01–ASI10). AIDR platforms are evaluated against coverage of these threats:

| ID | Threat | AIDR Detection Method |
|----|--------|-----------------------|
| **ASI01** | Agent Goal Hijack | Intent analysis detects redirected objectives; indirect injection detection |
| **ASI02** | Tool Misuse & Exploitation | Tool invocation monitoring; parameter bounds checking; allow-list enforcement |
| **ASI03** | Agent Identity & Privilege Abuse | Identity event logging; privilege escalation anomaly detection |
| **ASI04** | Agentic Supply Chain Compromise | MCP tool manifest hash verification; dependency scanning |
| **ASI05** | Unexpected Code Execution | Sandbox isolation; code execution telemetry |
| **ASI06** | Memory & Context Poisoning | Memory access logging; context integrity monitoring |
| **ASI07** | Insecure Inter-Agent Communication | A2A message tracing; mutual TLS verification |
| **ASI08** | Cascading Agent Failures | Multi-agent execution graph analysis; circuit breaker monitoring |
| **ASI09** | Human-Agent Trust Exploitation | Behavioral baseline deviation; social engineering pattern detection |
| **ASI10** | Rogue Agents | Agent registry enforcement; unregistered agent detection |

### Additional Threat Categories

Beyond the OWASP list, production deployments encounter:

- **Shadow AI** — employees using unapproved AI tools without IT awareness (45% of organizations per CrowdStrike data)
- **Model poisoning** — training data or fine-tuning contamination affecting agent behavior at runtime
- **Credential exposure** — agents inadvertently including API keys, tokens, or secrets in tool outputs (206 credential exposures identified in Uber ADR deployment)
- **Data residency violation** — agent sending regulated data to AI providers in non-compliant regions

---

## Part 7 — Security Architecture

### Identity and Authentication for AI Agents

AIDR requires that every agent has a verifiable, revocable identity. The current state of agent identity standards:

| Standard | Purpose | Status |
|----------|---------|--------|
| **SPIFFE/SPIRE** | Cryptographic workload identity (SVID certificates) | Production-ready |
| **IETF draft-klrc-aiagent-auth-00** | 9-layer AI agent identity framework | Draft, 2025 |
| **OAuth 2.1 + PKCE** | User-delegated authorization for agents | Current best practice |
| **OBO (On-Behalf-Of)** | Entra ID token exchange for downstream tool calls | Production-ready (Azure) |
| **DID-based signatures** | Decentralized identifiers for non-repudiation | Emerging (arXiv 2505.19301) |

### Zero-Trust Principles Applied to Agents

```
1. Verify explicitly      →  Every agent call authenticated; no implicit trust
2. Least privilege        →  Tool scopes minimal; default-deny policies
3. Assume breach          →  Agent sessions monitored from first call; blast radius bounded
```

### MCP Security Controls

MCP has become the dominant tool-integration protocol for AI agents, and also the dominant attack surface. AIDR must address:

| MCP Attack Vector | Control |
|-------------------|---------|
| Tool poisoning (malicious tool descriptions) | Tool manifest hash verification pre-execution |
| Credential theft via tool output | Output scanning before returning to agent context |
| Indirect injection through retrieved content | Semantic analysis of tool responses |
| Unauthenticated MCP server exposure | OAuth 2.1 enforcement on all MCP server connections |
| Excessive tool permissions | Least-privilege tool scopes; parameter validation |

**Scale of MCP risk (2026):** Trend Micro counted 492 unauthenticated MCP servers on the public internet; Antiy CERT identified 1,184 malicious "skills" in ClawHub.

### Authorization Models

| Model | Application in AIDR |
|-------|---------------------|
| **RBAC** | Agents assigned to roles; roles grant tool and data scopes |
| **ABAC** | Context-aware policies (agent identity + data classification + action type) |
| **PBAC (Policy-Based)** | OPA/Cedar policies evaluated at every tool call |
| **PBAC with OPA** | Dynamic policy evaluation; policies versioned and deployed as code |

### Compliance Alignment

| Framework | AIDR Alignment |
|-----------|---------------|
| **EU AI Act (Art. 9, 17)** | Risk management + post-market monitoring for high-risk AI = AIDR functions |
| **NIST AI RMF (MANAGE)** | Incident response and continuous monitoring functions |
| **ISO 42001** | Control A.6 (AI risk management) requires runtime monitoring |
| **OWASP LLM Top 10** | Operationalizes LLM01–LLM10 detection at runtime |
| **MITRE ATLAS** | Adversarial TTP coverage maps to AIDR detection signatures |

---

## Part 8 — Relationship with Agent Protocols and Frameworks

### MCP (Model Context Protocol)

MCP is the primary integration point for AIDR:
- Every MCP tool call is an observable unit of agent behavior
- AIDR sensors instrument the MCP transport layer to capture call chains
- MCP-aware AIDR can verify tool manifest integrity before any execution
- ADR (Uber) was specifically designed as "the first large-scale, production-validated enterprise security framework for MCP-based agents"

### A2A (Agent-to-Agent Protocol)

A2A creates inter-agent communication channels that AIDR must trace:
- Agent Card verification before delegation
- Mutual TLS for A2A transport security
- Trace propagation across A2A boundaries (W3C Trace Context headers)
- AIDR must correlate execution graphs across the A2A boundary to detect cascading failures (ASI08)

### Relationship Matrix

| Technology | AIDR Role |
|-----------|-----------|
| **MCP** | Primary telemetry source; AIDR instruments MCP transport |
| **A2A** | Inter-agent trace correlation; delegation chain verification |
| **LangGraph** | AIDR can instrument LangGraph node transitions as observable events |
| **LangChain** | Similar instrumentation via callbacks/middleware |
| **CrewAI** | Agent task delegation visible to AIDR sensors |
| **AutoGen** | Multi-agent conversation tracing |
| **OpenAI Agents SDK** | Tool calls and handoffs traceable via OTel GenAI conventions |
| **AWS Bedrock AgentCore** | Platform-native security controls complemented by AIDR |
| **Azure AI Foundry** | Microsoft Sentinel + Security Copilot provide partial AIDR coverage |
| **Google ADK** | Vertex AI security controls; third-party AIDR can integrate via telemetry |
| **Semantic Kernel** | Plugin/tool calls traceable; AIDR integrates at middleware layer |

---

## Part 9 — Runtime Internals and Observability

### Agent Lifecycle Monitoring

AIDR must cover the full agent lifecycle:

```
Initialization → Planning → Reasoning → Tool Selection
     ↓               ↓           ↓            ↓
  [identity    [goal scope   [chain-of-   [permission
   verified]    checked]     thought      checked]
                             logged]
                                              ↓
Tool Execution → Response → Memory Update → Next Step
     ↓               ↓            ↓             ↓
  [params      [output      [write        [loop or
   validated]   scanned]     audited]      terminate]
```

### Telemetry Standards

| Standard | Role |
|----------|------|
| **OpenTelemetry GenAI semantic conventions** | Standard schema for LLM/agent spans, attributes, events |
| **W3C Trace Context** | Distributed trace propagation across agent/service boundaries |
| **CloudEvents** | Standard event envelope for agent lifecycle events |

### Observability Tooling Compatible with AIDR

| Tool | Integration |
|------|-------------|
| **Langfuse** | LLM/agent observability platform; AIDR telemetry can feed into it |
| **Phoenix (Arize)** | ML observability; hallucination detection, prompt monitoring |
| **OpenTelemetry Collector** | Aggregates agent traces from AIDR sensors |
| **Grafana + Prometheus** | Metrics dashboards for AIDR detection rates, latency, alert volumes |
| **Elastic SIEM** | AIDR alert correlation with enterprise security events |

### Key Metrics

| Metric | Target |
|--------|--------|
| Detection latency (prompt attack) | ≤30ms (CrowdStrike benchmark) |
| Credential detection precision | ≥97% (Uber ADR benchmark) |
| False positive rate | ≤3% at production scale |
| Attack detection rate | ≥67% across 17 techniques (ADR-Bench) |
| Agent session coverage | 100% of registered agents |
| Mean Time to Detect (MTTD) | <60 seconds for confirmed incidents |

---

## Part 10 — Enterprise Reference Architectures

### Single-Tenant Enterprise Deployment

```
┌──────────────────────────────────────────────────────┐
│                   Enterprise Perimeter                │
│                                                       │
│  ┌──────────┐    ┌──────────────┐    ┌────────────┐  │
│  │  User /  │    │  AI Gateway  │    │  AIDR      │  │
│  │  App     │───▶│  (Kong/APIM) │───▶│  Control   │  │
│  │  Layer   │    │  + Prompt    │    │  Plane     │  │
│  └──────────┘    │  Firewall    │    │            │  │
│                  └──────────────┘    └─────┬──────┘  │
│                                            │ observe  │
│  ┌──────────────────────────────────────── ▼ ──────┐  │
│  │              Agent Runtime                       │  │
│  │  ┌────────┐  ┌────────┐  ┌──────┐  ┌────────┐  │  │
│  │  │Planner │  │Reasoner│  │Memory│  │Tool    │  │  │
│  │  │Agent   │  │Agent   │  │Store │  │Router  │  │  │
│  │  └────────┘  └────────┘  └──────┘  └───┬────┘  │  │
│  └───────────────────────────────────────┼────────┘  │
│                                           │            │
│  ┌────────────────────────────────────── ▼ ──────┐    │
│  │  MCP Servers (internal tools + external APIs)  │    │
│  └───────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
```

### Highly Regulated Enterprise (Banking/Healthcare/Government)

Additional controls required beyond baseline AIDR:

| Control | Implementation |
|---------|---------------|
| **Air-gap option** | AIDR sensor + local model for detection; no data leaves boundary |
| **Human-in-the-loop gates** | All actions above defined risk threshold require human approval |
| **Cryptographic audit trail** | Immutable, signed execution logs (WORM storage) |
| **Data residency enforcement** | AIDR policy blocks cross-border data flows in real-time |
| **PQC-ready identity** | Agent credentials using post-quantum algorithms |
| **Third-party audit** | AIDR telemetry exported to independent compliance system |

### 30-60-90 Day Implementation Plan

#### Days 0–30: Foundation
- [ ] Deploy agent governance registry (inventory all deployed agents)
- [ ] Implement AI Gateway with prompt firewall
- [ ] Set tool permission defaults to default-deny
- [ ] Enable centralized logging (OTel collector → SIEM)
- [ ] Deploy sandbox infrastructure for high-risk tool categories

#### Days 31–60: Detection
- [ ] Deploy AIDR sensor across all agent runtimes
- [ ] Run red-team evaluation (ADR-Explorer pattern)
- [ ] Establish behavioral baselines per agent workflow
- [ ] Implement agent identity lifecycle (issuance, rotation, revocation)
- [ ] Verify tool manifests; lock to known-good hashes

#### Days 61–90: Response
- [ ] Integrate AIDR alerts into SOC playbooks
- [ ] Implement automated response actions (quarantine, block, revoke)
- [ ] Enable human-approval workflows for critical agent actions
- [ ] Run tabletop incident simulation
- [ ] Begin weekly adversarial testing cycle

---

## Part 11 — Implementation Guide

### Python: AIDR Sensor Integration (OTel Pattern)

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

# Initialize AIDR-compatible tracer
provider = TracerProvider()
exporter = OTLPSpanExporter(endpoint="http://aidr-collector:4317")
provider.add_span_processor(BatchSpanProcessor(exporter))
trace.set_tracer_provider(provider)
tracer = trace.get_tracer("aidr.agent.sensor", schema_url="https://opentelemetry.io/schemas/1.24.0")

def monitored_tool_call(tool_name: str, params: dict, agent_id: str):
    with tracer.start_as_current_span(f"agent.tool.{tool_name}") as span:
        span.set_attribute("agent.id", agent_id)
        span.set_attribute("agent.tool.name", tool_name)
        span.set_attribute("agent.tool.params_hash", hash(str(params)))
        # AIDR intent check before execution
        if not aidr_policy_check(tool_name, params, agent_id):
            span.set_attribute("aidr.blocked", True)
            raise PermissionError(f"AIDR policy blocked {tool_name}")
        result = execute_tool(tool_name, params)
        # AIDR output scan after execution
        if not aidr_output_scan(result, agent_id):
            span.set_attribute("aidr.data_leak_detected", True)
            return sanitize_output(result)
        return result
```

### TypeScript: MCP-Aware AIDR Middleware

```typescript
import { MCPClient } from "@modelcontextprotocol/sdk/client";
import { AIDRSensor } from "./aidr-sensor";

const sensor = new AIDRSensor({ endpoint: "https://aidr-api.internal" });

async function securedMCPCall(
  client: MCPClient,
  toolName: string,
  args: Record<string, unknown>,
  context: { agentId: string; sessionId: string }
): Promise<unknown> {
  const traceId = await sensor.beginTrace(context.agentId, context.sessionId);

  // Pre-execution: verify tool manifest, check policy
  await sensor.assertToolPolicy(toolName, args, context.agentId);

  const result = await client.callTool({ name: toolName, arguments: args });

  // Post-execution: scan output for credential exposure and data leakage
  const scanResult = await sensor.scanOutput(result, { traceId, toolName });
  if (scanResult.blocked) throw new AIDRViolationError(scanResult.reason);

  await sensor.endTrace(traceId, { success: true });
  return result;
}
```

### Policy-as-Code Example (OPA/Rego)

```rego
package aidr.agent.policy

# Deny tool calls that exceed defined parameter bounds
deny[msg] {
  input.action == "tool_call"
  input.tool_name == "sql_query"
  not input.params.query_type == "SELECT"
  msg := "AIDR: Only SELECT queries permitted for this agent identity"
}

# Deny data egress of PII to external destinations
deny[msg] {
  input.action == "http_request"
  input.destination_classification == "external"
  input.data_labels[_] == "PII"
  msg := "AIDR: PII cannot be sent to external destinations"
}

# Require human approval for irreversible actions
requires_approval[reason] {
  input.action_type == "DELETE"
  input.resource_type == "production_database"
  reason := "Irreversible production action requires human approval gate"
}
```

---

## Part 12 — Anti-Patterns and Common Mistakes

| Anti-Pattern | Problem | Correct Approach |
|-------------|---------|-----------------|
| **Prompt-only filtering** | Misses indirect injection via tool responses, RAG content, email | Instrument full execution graph, not just ingress prompts |
| **Monitoring only, no response** | Detection without automated response creates alert fatigue | Automate responses for high-confidence, high-severity events |
| **Agent inventory skipped** | Cannot monitor what is not registered | Build governance registry before deploying AIDR sensors |
| **Shared agent identities** | Cannot attribute actions to a specific agent instance | Every agent instance gets a unique SPIFFE identity |
| **Static rule-only detection** | Rules fail against novel injection techniques | Combine rules with behavioral baselining and LLM-assisted reasoning |
| **AIDR deployed as gateway only** | Does not capture MCP tool chains, memory interactions, A2A hops | Deploy sensors at the agent runtime level, not just at the edge |
| **No red-team baseline** | Cannot calibrate detection thresholds without adversarial ground truth | Run red-team evaluation (ADR-Explorer pattern) before going live |
| **Ignoring shadow AI** | 45% of employees use unapproved AI tools; these bypass AIDR | Combine AIDR with AISPM for Shadow AI discovery across SaaS |

---

## Part 13 — Future Roadmap (2026–2029)

### Near-Term (2026)

- **Category standardization:** Analyst firms (Gartner, Forrester) expected to publish AIDR market guides by Q4 2026
- **OWASP tooling:** Open-source AIDR reference implementation tied to OWASP Agentic Top 10
- **IETF agent identity:** Draft standard for agent authentication (draft-klrc-aiagent-auth) targeting RFC status
- **Platform consolidation:** EDR/XDR leaders absorbing AIDR; specialist vendors compete on depth

### Medium-Term (2027–2028)

- **Autonomous AIDR:** AIDR systems that self-tune detection thresholds and playbooks using reinforcement learning from incident outcomes
- **Cross-enterprise agent trust:** Federated AIDR telemetry sharing across organizational boundaries for threat intelligence
- **Quantum-resistant agent identity:** PQC algorithm deployment in agent SPIFFE credentials
- **Regulatory mandates:** EU AI Act high-risk category requirements likely to explicitly mandate AIDR-class controls by 2027

### Long-Term (2028–2029)

- **Cognitive security planes:** AIDR evolves into a cognitive layer that understands agent intent semantically, not just behaviorally
- **Agent attestation ecosystems:** Hardware-rooted agent identity chains (TEE-backed) for highest-assurance deployments
- **Standard AIDR telemetry schema:** OpenTelemetry GenAI semantic conventions may formalize AIDR-specific spans

---

## Glossary

| Term | Definition |
|------|-----------|
| **AIDR** | AI Detection and Response — runtime security for AI agents |
| **AISPM** | AI Security Posture Management — pre-deployment AI security auditing |
| **ADR** | Agentic Detection and Response — academic/Uber synonym for AIDR |
| **ADR-Bench** | Open benchmark (302 tasks, 17 attack techniques) for evaluating AIDR/ADR systems |
| **Agent Goal Hijack (ASI01)** | Attack redirecting an agent's objectives via injected instructions |
| **Behavioral baseline** | Statistical model of normal agent behavior used to detect anomalies |
| **Execution graph** | Full trace of an agent's decision chain, tool calls, and memory interactions |
| **Intent analysis** | Inferring what an agent is actually trying to achieve, not just what inputs/outputs look like |
| **MCP** | Model Context Protocol — the dominant tool-integration standard for AI agents |
| **Memory poisoning (ASI06)** | Injecting malicious content into an agent's persistent memory |
| **Prompt firewall** | Inline inspection system blocking malicious prompt inputs and scanning outputs |
| **Prompt injection (LLM01)** | Attack embedding instructions in input content to override agent behavior |
| **Shadow AI** | Unauthorized AI tools used without IT approval |
| **SPIFFE/SPIRE** | Secure Production Identity Framework for Everyone — workload identity standard |
| **Tool misuse (ASI02)** | Agent invoking tools outside its sanctioned operational scope |
| **Zero Trust (agent)** | Security model requiring explicit verification of every agent action; no implicit trust |

---

## References

### Official Documentation and Vendor Sources

- [CrowdStrike: What is AIDR?](https://www.crowdstrike.com/en-us/cybersecurity-101/artificial-intelligence/ai-detection-and-response-aidr/)
- [CrowdStrike Falcon AIDR Platform](https://www.crowdstrike.com/en-us/platform/falcon-aidr-ai-detection-and-response/)
- [Zenity: What is AIDR? AI Detection and Response, Defined](https://zenity.io/academy/what-is-ai-detection-response)
- [Zenity Defend AIDR Platform](https://zenity.io/platform/ai-security-platform/aidr)
- [Loginsoft: What is AI Detection and Response (AIDR)?](https://www.loginsoft.com/glossary/what-is-ai-detection-and-response)
- [The Relay: AIDR arrives — CrowdStrike crystallizes agent security stack](https://therelaymag.com/aidr-arrives-agent-security-stack)

### Academic Papers

- [arXiv 2605.17380 — ADR: An Agentic Detection System for Enterprise Agentic AI Security (Uber, 2026)](https://arxiv.org/abs/2605.17380)
- [arXiv 2604.20134 — AgentSOC: Multi-Layer Agentic AI Framework for Security Operations](https://arxiv.org/pdf/2604.20134)
- [arXiv 2511.09178 — Reliability Monitoring Framework for Agentic AI Systems](https://arxiv.org/pdf/2511.09178)
- [arXiv 2505.19301 — Zero-Trust Identity Framework for Agentic AI](https://arxiv.org/html/2505.19301v2)
- [arXiv 2601.01241 — MCP-SandboxScan: WASM-based Secure Execution for MCP Tools](https://arxiv.org/pdf/2601.01241)
- [arXiv 2604.21477 — MCP Pitfall Lab: Developer Pitfalls in MCP Tool Server Security](https://arxiv.org/pdf/2604.21477)

### Standards and Frameworks

- [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [OWASP LLM Top 10 2025](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/ai-risk-management-framework)
- [ISO/IEC 42001:2023 AI Management Systems](https://www.iso.org/standard/81230.html)
- [MITRE ATLAS — Adversarial Threat Landscape for AI Systems](https://atlas.mitre.org/)

### Industry Analysis

- [VentureBeat: RSAC 2026 — Agentic SOC tools and the agent behavioral baseline gap](https://venturebeat.com/security/rsac-2026-agentic-soc-agent-telemetry-security-gap)
- [Help Net Security: Prompt injection drives most agentic AI security failures](https://www.helpnetsecurity.com/2026/06/11/owasp-prompt-injection-ai-security-failures/)
- [Palo Alto Networks: OWASP Agentic AI Security](https://www.paloaltonetworks.com/blog/cloud-security/owasp-agentic-ai-security/)
- [Obsidian Security: AI Detection and Response — Extending SaaS XDR to Agentic Systems](https://www.obsidiansecurity.com/blog/ai-detection-and-response)

### Historical AIDR (Humanitarian — for disambiguation)

- [AIDR: Artificial Intelligence for Disaster Response (QCRI)](https://aidr.qcri.org/)
- [ACM DL: AIDR — artificial intelligence for disaster response](https://dl.acm.org/doi/10.1145/2567948.2577034)
- [Wikipedia: Artificial Intelligence for Digital Response](https://en.wikipedia.org/wiki/Artificial_Intelligence_for_Digital_Response)

---

## See Also

| Guide | Link |
|-------|------|
| AI Security Foundations & Reference Architecture | [Foundations Reference Architecture](./01-Foundations-Reference-Architecture.md) |
| Agent Identity, MCP/A2A Security Blueprint | [Identity MCP A2A Security Blueprint](./02-Identity-MCP-A2A-Security-Blueprint.md) |
| Runtime Security & Governance | [Part4 Runtime Security Governance](./Part4_Runtime_Security_Governance.md) |
| AI SOC, Observability, Red Team | [AI SOC Observability RedTeam Memory](./04-AI-SOC-Observability-RedTeam-Memory.md) |
| OWASP ASI01–ASI10, SPIFFE/AIMS | [Agentic AI Security & Identity](../../enterprise-architecture/ai-architecture/agentic-ai-security-identity.md) |
| 18-threat catalog, 14-layer guardrail map | [Security Architecture & Guardrails](../../enterprise-architecture/ai-architecture/agentic-ai-security-guardrails.md) |
| OPA/Cedar policy-as-code | [Policy & Authorization Series](../policy/index.md) |
| MCP deep dive | [MCP Deep Research 2026](../../ai-protocols/mcp/MCP_Deep_Research_2026.md) |
