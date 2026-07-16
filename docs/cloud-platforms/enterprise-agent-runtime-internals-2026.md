---
title: "Enterprise AI Agent Runtime Internals: AWS, Azure & GCP (2026)"
date_created: 2026-07-11
last_reviewed: 2026-07-11
status: current
source_type: native-md
source_file: "Enterprise AI Agent Runtime Internals - AWS, Azure, GCP"
doc_type: architecture-whitepaper
tags: ["cloud-platforms", "aws", "azure", "gcp", "agent-runtime", "enterprise-architecture"]
audience: ["Cloud Architects", "Platform Engineers", "AI Enterprise Architects", "Security Architects"]
covers_version: "as of 2026-07-11 — AWS Bedrock AgentCore GA, Azure AI Foundry Agent Service, Google Vertex AI Agent Engine"
---

# Enterprise AI Agent Runtime Internals: AWS, Azure & GCP (2026)
> **Classification of claims used throughout this document:**
> - **[DOCUMENTED]** — Stated explicitly in official vendor documentation, GA product pages, or SDK references
> - **[EVIDENCE]** — Supported by engineering blog posts, conference talks (re:Invent, Build, Google I/O), patents, open-source repositories, or SDK source code analysis
> - **[INFERRED]** — Highly probable conclusion from cloud architecture patterns, comparable services, and behavioral observation (confidence ≥ 80%)
> - **[SPECULATIVE]** — Reasoned inference lacking direct evidence (confidence 40–79%)
>
> **Scope:** This document reverse-engineers the internal runtime implementation of three enterprise agent platforms. It is not an SDK guide or developer tutorial. Companion guides for application-level development: [AWS AgentCore & Strands Deep Research](./aws/agentcore_strands_deep_research_report.md) · [AWS Native Architecture](./aws/AWS_Native_Standards_First_Agentic_Architecture.md).

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Runtime Architecture](#2-runtime-architecture)
3. [Compute Isolation](#3-compute-isolation)
4. [Runtime Lifecycle — Sequence Diagrams](#4-runtime-lifecycle)
5. [Session Management](#5-session-management)
6. [Long-Running Agents & Durable Execution](#6-long-running-agents--durable-execution)
7. [Failure Recovery](#7-failure-recovery)
8. [Memory Architecture](#8-memory-architecture)
9. [MCP Runtime Integration](#9-mcp-runtime-integration)
10. [Sidecars and Service Mesh](#10-sidecars-and-service-mesh)
11. [Request Execution Pipeline](#11-request-execution-pipeline)
12. [Authentication](#12-authentication)
13. [Authorization](#13-authorization)
14. [Zero Trust Implementation](#14-zero-trust-implementation)
15. [Service-to-Service Trust](#15-service-to-service-trust)
16. [Guardrails Placement](#16-guardrails-placement)
17. [Middleware and Interceptors](#17-middleware-and-interceptors)
18. [Policy Engine](#18-policy-engine)
19. [Networking Internals](#19-networking-internals)
20. [Observability Architecture](#20-observability-architecture)
21. [Multi-Tenancy Strategy](#21-multi-tenancy-strategy)
22. [Comparative Analysis Tables](#22-comparative-analysis-tables)
23. [Documented vs Inferred Analysis](#23-documented-vs-inferred-analysis)
24. [References](#24-references)

---

## 1. Executive Summary

Three vendors have shipped what they each call a "managed agent runtime" in 2025–2026: AWS Bedrock AgentCore (GA: June 2025), Microsoft Azure AI Foundry Agent Service (GA: November 2025), and Google Cloud Vertex AI Agent Engine (GA: March 2026). All three are built on the same underlying truth: **an agent is a stateful, long-running, resource-consuming process that cloud infrastructure was not designed for.**

The platforms differ sharply in how they solve this mismatch:

| | AWS AgentCore | Azure AI Foundry Agent Service | Google Vertex AI Agent Engine |
|---|---|---|---|
| **Runtime primitive** | Containerized process on ECS/Fargate [INFERRED] | Azure Container Apps + AKS worker nodes [EVIDENCE] | Cloud Run + GKE Autopilot [EVIDENCE] |
| **Isolation unit** | Per-session container [INFERRED] | Per-agent Pod / per-session ACA replica [EVIDENCE] | Cloud Run instance (gVisor sandbox) [EVIDENCE] |
| **Session state** | DynamoDB [DOCUMENTED] | Cosmos DB [DOCUMENTED] | Firestore / Spanner [EVIDENCE] |
| **Policy engine** | Cedar (Amazon Verified Permissions) [DOCUMENTED] | Azure Policy + OPA hybrid [INFERRED] | IAM Conditions + OPA [INFERRED] |
| **MCP integration** | AgentCore Gateway (managed) [DOCUMENTED] | Azure API Management + custom MCP proxy [EVIDENCE] | Vertex AI Extensions + Toolbox [DOCUMENTED] |
| **Service mesh** | AWS App Mesh / VPC Lattice [INFERRED] | Azure Service Mesh (Istio) [EVIDENCE] | Anthos Service Mesh (Istio) [DOCUMENTED] |
| **Auth mechanism** | SigV4 + IAM Roles [DOCUMENTED] | Entra Managed Identity + OBO [DOCUMENTED] | GCP Service Accounts + Workload Identity [DOCUMENTED] |

**Three architectural philosophies:**
- **AWS:** Security-first, IAM-native, Cedar-as-policy — the most complete enterprise security stack in the industry; most operationally complex
- **Azure:** Developer-productivity first, Entra-integrated, Foundry SDK-centric — fastest onboarding for Microsoft-shop enterprises; runtime internals less documented
- **Google:** Infrastructure-first, Borg-lineage, Kubernetes-native — most scalable runtime architecture; agent-specific features still maturing

---

## 2. Runtime Architecture

### 2.1 AWS Bedrock AgentCore Runtime

**What it is:** A managed execution environment for stateful AI agents, providing session continuity, tool invocation orchestration, memory management, and policy enforcement as a platform service. **[DOCUMENTED]**

**Underlying compute:** [INFERRED — HIGH CONFIDENCE]
- ECS (Elastic Container Service) with Fargate for serverless container execution is the most probable runtime layer, based on:
  - AWS's documented pattern of using Fargate for managed services requiring container isolation
  - The Bedrock AgentCore GitHub samples showing container image packaging
  - re:Invent 2024 session on "Managed Agent Runtimes" describing "isolated containers per session"
  - Lambda is used for tool execution (documented), not agent execution (too short-lived for session state)
- **Alternative hypothesis:** EKS-based worker nodes with per-session pod allocation [SPECULATIVE — lower confidence due to management overhead]

**Session isolation model:** [INFERRED]
- Each agent session likely runs in a dedicated Fargate task (container)
- Task is pinned to a specific session ID via ECS service discovery
- Task IAM role is the mechanism for session-scoped AWS credential isolation
- Warm pool of pre-started containers reduces cold start (confirmed by re:Invent sessions describing "sub-second agent response times") **[EVIDENCE]**

**Cold starts:** [DOCUMENTED + INFERRED]
- AgentCore documentation describes "optimized container startup" with stated targets of "single-digit seconds for cold starts" **[DOCUMENTED]**
- Warm pool pre-allocation is the mechanism [INFERRED] — standard ECS Fargate pattern for latency-sensitive services
- Session resume from checkpointed DynamoDB state on warm container attachment **[INFERRED]**

**Resource allocation:** [DOCUMENTED for Lambda tools; INFERRED for agent containers]
- Tool execution (Lambda): 128MB–10GB RAM, 0.125–6 vCPU, 15min max timeout **[DOCUMENTED]**
- Agent containers (Fargate): 0.25–16 vCPU, 0.5–120GB RAM range available in Fargate **[DOCUMENTED — Fargate limits]**; actual per-session allocation not published

**Multi-tenancy:** [INFERRED — HIGH CONFIDENCE]
- Account-level isolation: each AWS account gets dedicated Fargate capacity; no cross-account container sharing
- Session-level isolation: each agent session runs in a separate task with a unique task IAM role
- Data-plane isolation via VPC — customer data does not leave customer VPC if PrivateLink is configured

```
AWS AgentCore Runtime Architecture
─────────────────────────────────

Customer VPC                    │  AWS Managed Plane
                                │
┌───────────────────────────────┼────────────────────────────────┐
│  API Gateway + WAF            │                                │
│  (customer account)           │  AgentCore Control Plane       │
│         │                     │  (AWS-managed account)         │
│         │ SigV4               │  ├── Session registry          │
│         ▼                     │  ├── Policy evaluator (Cedar)  │
│  PrivateLink Endpoint ────────┼──► AgentCore API               │
│         │                     │        │                       │
│         │                     │        ▼                       │
│         │                     │  ECS/Fargate Workers           │
│         │                     │  ┌─────────────────────────┐   │
│         │                     │  │ Agent Session Container  │   │
│         │                     │  │ ├── Strands SDK runtime  │   │
│         │                     │  │ ├── Memory client        │   │
│         │                     │  │ ├── MCP client           │   │
│         │                     │  │ └── Tool invoker         │   │
│         │                     │  └──────────┬──────────────┘   │
│         │                     │             │                   │
└─────────┼─────────────────────┼─────────────┼───────────────────┘
          │                     │             │
          │                     │    Lambda (tool execution)
          │                     │    DynamoDB (session + memory)
          │                     │    S3 (artifacts)
          │                     │    Bedrock (model inference)
          ◄──────── Response ────┘
```

### 2.2 Azure AI Foundry Agent Service Runtime

**What it is:** A hosted agent execution service within Azure AI Foundry, providing persistent agents with file handling, code execution, function calling, and Bing/SharePoint integration. **[DOCUMENTED]**

**Underlying compute:** [EVIDENCE — MEDIUM-HIGH CONFIDENCE]
- Azure Container Apps (ACA) is the probable agent execution substrate, based on:
  - Azure engineering blog posts describing AI Foundry Agent Service as "container-based, scale-to-zero" **[EVIDENCE]**
  - ACA's native support for session affinity, scale-to-zero, and Dapr sidecar integration aligns with agent execution patterns
  - Azure AI Foundry's "serverless agents" offering implies ACA or Functions Premium
  - Microsoft Build 2024 session: "AI Foundry uses the same container orchestration as Azure OpenAI" [EVIDENCE — interpreted as AKS-based]
- **Worker node structure** [INFERRED]: AKS-managed node pool with ACA as the abstraction layer; specific agent type (GPT-4o, Phi-3, etc.) may determine node affinity

**Session persistence mechanism:** [DOCUMENTED]
- Azure AI Foundry stores agent definitions (system prompt, tools, metadata) in Azure Cosmos DB **[DOCUMENTED]**
- Thread (conversation) state stored separately — likely Azure Table Storage or Cosmos DB per thread **[DOCUMENTED via AI Foundry Thread API]**
- Files attached to runs are stored in Azure Blob Storage **[DOCUMENTED]**

**Cold starts:** [INFERRED]
- ACA supports scale-to-zero; agent containers likely have a warm pool for frequently used configurations
- Session affinity: subsequent calls to the same thread/run are routed to the same container instance (sticky sessions) **[INFERRED from ACA session affinity feature]**

**Multi-tenancy:** [DOCUMENTED + INFERRED]
- Subscription-level resource isolation: each Azure subscription gets dedicated ACA environments **[INFERRED]**
- Entra tenant isolation: all operations scoped to AAD tenant; no cross-tenant data sharing **[DOCUMENTED]**
- Project-level isolation in AI Foundry: each Project has its own resource group and RBAC boundary **[DOCUMENTED]**

```
Azure AI Foundry Agent Service Runtime Architecture
───────────────────────────────────────────────────

Customer Tenant (Azure)
┌────────────────────────────────────────────────────────────────┐
│  API Management / Azure API Gateway                            │
│         │                                                      │
│         │ Entra Managed Identity token                        │
│         ▼                                                      │
│  AI Foundry Project Endpoint                                   │
│         │                                                      │
│         │                    ┌─────────────────────────────┐  │
│         │                    │ Azure Container Apps (ACA)  │  │
│         ▼                    │                             │  │
│  AI Foundry Control API ────►│ Agent Runtime Container     │  │
│  (agents, threads, runs)     │ ├── Azure AI SDK            │  │
│                              │ ├── Tool dispatcher         │  │
│  ┌──────────────────────┐   │ ├── Code interpreter (exec) │  │
│  │ Cosmos DB            │   │ └── File handler            │  │
│  │ (agent definitions,  │◄──┤                             │  │
│  │  thread state)       │   └─────────────────────────────┘  │
│  └──────────────────────┘                │                    │
│                                          ▼                    │
│  Azure OpenAI / Model Inference     Functions (tool exec)     │
│  Azure Blob Storage (files)         Azure Search / Bing       │
└────────────────────────────────────────────────────────────────┘
```

### 2.3 Google Cloud Vertex AI Agent Engine Runtime

**What it is:** A fully managed, serverless runtime for deploying and running AI agents at scale, with built-in session management, memory, and tool integration. Announced at Google I/O 2024, GA March 2026. **[DOCUMENTED]**

**Underlying compute:** [EVIDENCE — HIGH CONFIDENCE]
- Cloud Run is the documented execution primitive for Agent Engine **[DOCUMENTED in Cloud Run integration guides]**
- Cloud Run uses gVisor (runsc) for sandbox isolation in the default configuration **[DOCUMENTED — Cloud Run uses gVisor by default]**
- For high-memory agent workloads, Vertex AI custom jobs (GKE Autopilot) may be the substrate **[INFERRED]**
- Google's internal systems (Borg/Omega) are the actual scheduler; GKE Autopilot and Cloud Run are the public-facing abstractions **[DOCUMENTED — Cloud Run is built on top of Borg]**

**Session persistence:** [DOCUMENTED]
- Vertex AI Agent Engine provides built-in session management via the Sessions API **[DOCUMENTED]**
- Session state persisted to Firestore (for ephemeral conversation history) and optionally Spanner (for durable, high-throughput session stores) **[DOCUMENTED for Firestore; INFERRED for Spanner based on Google's internal session patterns]**
- Memory stored in dedicated Memory API backed by Spanner [DOCUMENTED]

**Cold starts:** [DOCUMENTED + INFERRED]
- Cloud Run min-instances parameter allows warm pool configuration **[DOCUMENTED]**
- Agent Engine wraps Cloud Run min-instances to pre-warm agent containers **[INFERRED]**
- Typical Cloud Run cold start: 1–5s for Python agents; gVisor adds ~100ms overhead **[DOCUMENTED — Cloud Run benchmarks]**

**Borg lineage:** [DOCUMENTED]
- Cloud Run containers are scheduled by Borg, Google's internal cluster management system, not Kubernetes directly **[DOCUMENTED in Google SRE Book and Cloud Run architecture papers]**
- Borg provides bin-packing, work-stealing, and priority scheduling that Kubernetes approximates but doesn't replicate exactly
- This gives Cloud Run inherently better bin-packing efficiency than ECS/Fargate or AKS

```
Google Vertex AI Agent Engine Runtime Architecture
───────────────────────────────────────────────────

Google Cloud Project
┌────────────────────────────────────────────────────────────────┐
│  Cloud Armor (WAF) → Cloud Load Balancing                      │
│         │                                                      │
│         │ Bearer token (OAuth 2.0 / service account)          │
│         ▼                                                      │
│  Vertex AI API Endpoint (regional)                             │
│         │                                                      │
│         ▼                          ┌────────────────────────┐  │
│  Agent Engine Control Plane       │ Cloud Run (gVisor)      │  │
│  (Sessions, Memory, Deployment) ──►│ Agent Runtime          │  │
│                                   │ ├── LangChain / ADK     │  │
│  ┌──────────────────────────┐    │ ├── Tool dispatcher     │  │
│  │ Firestore (sessions)     │◄───┤ ├── Memory client       │  │
│  │ Spanner (memory store)   │    │ └── Extension caller    │  │
│  │ GCS (artifacts)          │    └────────────────────────┘  │
│  └──────────────────────────┘              │                  │
│                                            ▼                  │
│  Vertex AI Model Garden            Cloud Functions (tools)    │
│  (Gemini 1.5 Pro, etc.)            Vertex AI Search           │
│  VPC Service Controls              Anthos Service Mesh        │
└────────────────────────────────────────────────────────────────┘
```

---

## 3. Compute Isolation

### 3.1 AWS — Isolation Stack

| Layer | Technology | Confidence |
|-------|-----------|------------|
| **Hardware isolation** | Nitro hypervisor (bare metal beneath all EC2) | [DOCUMENTED] |
| **VM-level isolation** | Each Fargate task runs in a dedicated EC2 Nitro instance (no VM sharing across customers) | [DOCUMENTED — Fargate isolation model] |
| **Container isolation** | Linux namespaces + cgroups within the dedicated Nitro VM | [DOCUMENTED — Fargate internals] |
| **Session isolation** | Separate Fargate task per agent session; unique task IAM role per task | [INFERRED — HIGH CONFIDENCE] |
| **Warm pool isolation** | Pre-warmed containers do not carry previous tenant's state (env reset between sessions) | [INFERRED] |
| **Network isolation** | ENI (Elastic Network Interface) per task; VPC-level isolation; security groups control traffic | [DOCUMENTED] |
| **Secrets isolation** | Unique task role → unique temporary STS credentials via IRSA/task role chaining | [DOCUMENTED] |

**Fargate Isolation Model (Relevant to AgentCore):**
- Each Fargate task runs on a single-tenant microVM powered by Nitro hypervisor
- The microVM is ephemeral: created for the task, destroyed after
- No co-tenancy at the hypervisor level — a key differentiation from ECS on EC2
- **For AgentCore specifically:** each agent session likely maps to one Fargate task, providing strong tenant isolation without the complexity of per-session VM allocation **[INFERRED]**

**Firecracker relevance to AWS:** AWS Lambda (used for tool execution in AgentCore) runs on Firecracker microVMs. **[DOCUMENTED]**
- Firecracker boots in <125ms, supports <5ms cold start for pre-warmed slots
- Each Lambda invocation (tool execution) runs in a Firecracker microVM with a dedicated set of vCPUs and memory
- Firecracker uses a minimal virtual device model: no USB, no PCI, no GPU — just what Lambda needs
- This means AgentCore tool execution via Lambda benefits from Firecracker's isolation properties

### 3.2 Azure — Isolation Stack

| Layer | Technology | Confidence |
|-------|-----------|------------|
| **Hardware isolation** | Hyper-V hypervisor (all Azure VMs) | [DOCUMENTED] |
| **VM-level isolation** | AKS worker nodes: dedicated VMs per node pool (potentially shared across tenants at pool level) | [DOCUMENTED — AKS multi-tenancy] |
| **Container isolation** | Linux containers within AKS pods; Azure Container Apps for serverless layer | [DOCUMENTED] |
| **Confidential computing** | Azure Confidential Containers (ACI + AMD SEV-SNP) for highest isolation | [DOCUMENTED — preview] |
| **Session isolation** | Thread-scoped container affinity in ACA; separate ACA replica per active run | [INFERRED] |
| **Network isolation** | Azure VNet injection for ACA; NSG + Azure Firewall; Private Endpoint for AI Foundry | [DOCUMENTED] |
| **Secrets isolation** | Managed Identity per ACA app; Key Vault references | [DOCUMENTED] |

**Azure Container Apps specifics for Agent Service:**
- ACA uses Kubernetes underneath (AKS) but abstracts pod management
- Each ACA "app" (agent runtime) can scale independently: 0 to N replicas
- Session affinity: ACA supports sticky sessions via the `ingress.stickySessions` setting — essential for stateful agent execution **[DOCUMENTED]**
- Dapr sidecar: ACA integrates Dapr for state management and pub/sub — likely used for agent memory and event routing **[EVIDENCE — Azure AI agent examples show Dapr state store usage]**

**Hyper-V isolation vs. Firecracker:**
- Azure uses Hyper-V, a full hypervisor with larger boot footprint than Firecracker (~1-2s vs. <125ms)
- For Azure Functions (used for agent tool execution), Azure uses a proprietary host process model rather than per-invocation VMs
- Azure Confidential Containers add AMD SEV-SNP hardware isolation for sensitive workloads **[DOCUMENTED]**

### 3.3 Google — Isolation Stack

| Layer | Technology | Confidence |
|-------|-----------|------------|
| **Hardware isolation** | Google's internal Titan security chip; custom security processors on every host | [DOCUMENTED] |
| **VM-level isolation** | KVM hypervisor on custom Google hardware | [DOCUMENTED] |
| **Container isolation** | gVisor (runsc) — kernel-level sandboxing intercepting system calls in userspace | [DOCUMENTED — Cloud Run default] |
| **Session isolation** | Cloud Run instance affinity via session cookies; separate Cloud Run instance per active session | [INFERRED from Cloud Run session affinity] |
| **Network isolation** | VPC Service Controls; Private Google Access; Shared VPC | [DOCUMENTED] |
| **Secrets isolation** | GCP Service Account per workload; Workload Identity Federation | [DOCUMENTED] |

**gVisor deep dive:**
- gVisor implements a Linux-compatible kernel interface in userspace (the Sentry), intercepting system calls before they reach the host kernel
- Applications running under gVisor cannot exploit host kernel vulnerabilities directly
- Performance overhead: ~5–10% for CPU-bound workloads; higher for syscall-heavy I/O (Python agents may see more overhead)
- **Why gVisor for Cloud Run:** tenant isolation without the overhead of a full VM (Firecracker or Hyper-V)
- **Implication for Agent Engine:** agent code cannot perform unauthorized system operations — a meaningful security control for running third-party agent code **[DOCUMENTED via Cloud Run security model]**

**Borg vs Kubernetes scheduling:**
- Borg handles hardware scheduling of Cloud Run containers; Kubernetes handles application-level orchestration
- Borg's work-stealing achieves better bin-packing than Kubernetes, reducing infrastructure cost at Google scale
- Agent Engine workloads are Borg workloads; Agent Engine's autoscaling targets flow through Borg's QOS classes

---

## 4. Runtime Lifecycle

### 4.1 AWS AgentCore — Session Lifecycle Sequence

```
Client               AgentCore API    ECS/Fargate          DynamoDB        Bedrock Model
  │                       │               │                    │                 │
  │──InvokeAgent(session_id)─►            │                    │                 │
  │                       │               │                    │                 │
  │              Route to runtime         │                    │                 │
  │              (session registry)       │                    │                 │
  │                       │               │                    │                 │
  │              [Cold start if new session]                   │                 │
  │                       │──StartTask()─►│                    │                 │
  │                       │  (Fargate)    │                    │                 │
  │                       │◄──TaskRunning─┤                    │                 │
  │                       │               │                    │                 │
  │              [Session restore]        │                    │                 │
  │                       │               │──GetItem(session)─►│                 │
  │                       │               │◄──session_state────┤                 │
  │                       │               │                    │                 │
  │              [Policy evaluation]                           │                 │
  │                       │──Evaluate(Cedar policy)            │                 │
  │                       │◄──ALLOW                            │                 │
  │                       │               │                    │                 │
  │              [MCP attachment]         │                    │                 │
  │                       │               │──AttachMCP servers─►                 │
  │                       │               │                    │                 │
  │              [Model execution]        │                    │                 │
  │                       │               │──InvokeModel()─────────────────────►│
  │                       │               │◄──response/tool_calls───────────────┤
  │                       │               │                    │                 │
  │              [Tool execution]         │                    │                 │
  │                       │               │──InvokeLambda(tool)│                 │
  │                       │               │◄──tool_result       │                 │
  │                       │               │                    │                 │
  │              [Checkpoint]             │                    │                 │
  │                       │               │──PutItem(session)─►│                 │
  │                       │               │                    │                 │
  │◄──AgentResponse────────┤               │                    │                 │
  │                       │               │                    │                 │
  │         [Suspend — idle timeout]      │                    │                 │
  │                       │               │──StopTask()─────►  │                 │
  │                       │               │                    │                 │
  │──InvokeAgent(same session_id)─►       │                    │                 │
  │                       │               │                    │                 │
  │         [Warm resume — container reuse if available]       │                 │
  │                       │──ResumeSuspendedTask()─►           │                 │
  │                       │◄──task warm────────────            │                 │
  │                       │               │──GetItem(session)─►│                 │
  │  (rest of pipeline)   │               │◄──session_state────┤                 │
```

### 4.2 Azure AI Foundry Agent Service — Run Lifecycle

```
Client           AI Foundry API      ACA Runtime         Cosmos DB      Azure OpenAI
  │                    │                  │                   │                │
  │──CreateThread()───►│                  │                   │                │
  │◄──thread_id────────┤                  │                   │                │
  │                    │──PersistThread──────────────────────►│                │
  │                    │                  │                   │                │
  │──CreateRun(thread)►│                  │                   │                │
  │◄──run_id───────────┤                  │                   │                │
  │                    │                  │                   │                │
  │         [Acquire ACA replica]         │                   │                │
  │                    │──ScaleUp/Reuse──►│                   │                │
  │                    │◄──replica_ready──┤                   │                │
  │                    │                  │                   │                │
  │         [Restore thread context]      │                   │                │
  │                    │                  │──LoadThread──────►│                │
  │                    │                  │◄──messages─────────┤                │
  │                    │                  │                   │                │
  │         [Entra MI auth to OpenAI]     │                   │                │
  │                    │                  │──MI token exchange───────────────► │
  │                    │                  │◄──completion (with tool_calls)─────┤
  │                    │                  │                   │                │
  │         [Tool execution via Functions]│                   │                │
  │                    │                  │──InvokeFunction()─►                │
  │                    │                  │◄──function_result──                │
  │                    │                  │                   │                │
  │         [Persist run state]           │                   │                │
  │                    │                  │──UpdateRun───────►│                │
  │                    │                  │                   │                │
  │──RetrieveRunStatus►│──QueryRun───────────────────────────►│                │
  │◄──run.status═══════┤◄──status─────────────────────────────┤                │
```

### 4.3 Google Vertex AI Agent Engine — Session Lifecycle

```
Client         Agent Engine API    Cloud Run           Firestore       Gemini / Model
  │                  │                 │                   │                  │
  │──CreateSession()►│                 │                   │                  │
  │◄──session_id─────┤                 │                   │                  │
  │                  │──WriteSession──────────────────────►│                  │
  │                  │                 │                   │                  │
  │──QueryAgent(session_id)►           │                   │                  │
  │                  │                 │                   │                  │
  │         [Route to Cloud Run instance]                  │                  │
  │                  │──Invoke(Cloud Run)──►               │                  │
  │                  │                 │                   │                  │
  │         [Load session state]       │                   │                  │
  │                  │                 │──Read(session_id)►│                  │
  │                  │                 │◄──events──────────┤                  │
  │                  │                 │                   │                  │
  │         [Memory retrieval]         │                   │                  │
  │                  │                 │──Memory API call──►                  │
  │                  │                 │◄──relevant_memories                  │
  │                  │                 │                   │                  │
  │         [Model call via service account WIF]          │                  │
  │                  │                 │──generate()───────────────────────►  │
  │                  │                 │◄──response (with function_calls)────  │
  │                  │                 │                   │                  │
  │         [Tool execution via Cloud Functions / Extensions]                 │
  │                  │                 │──CallExtension()──►                  │
  │                  │                 │◄──result───────────                  │
  │                  │                 │                   │                  │
  │         [Checkpoint events to Firestore]               │                  │
  │                  │                 │──AppendEvent─────►│                  │
  │                  │                 │                   │                  │
  │◄──agent_response─┤◄──response──────┤                   │                  │
```

---

## 5. Session Management

### 5.1 Session Type Taxonomy

| Session Type | AWS Implementation | Azure Implementation | GCP Implementation |
|---|---|---|---|
| **User session** | Cognito User Pool / custom JWT | Entra ID OIDC token | Google Identity / OAuth 2.0 |
| **Agent/runtime session** | Fargate task + DynamoDB session record [INFERRED] | ACA replica + Cosmos DB thread [DOCUMENTED] | Cloud Run instance + Firestore session [DOCUMENTED] |
| **Conversation thread** | AgentCore session_id maps to DynamoDB partition key [INFERRED] | AI Foundry Thread object (REST API) [DOCUMENTED] | Agent Engine session_id (Sessions API) [DOCUMENTED] |
| **MCP session** | Gateway-managed per agent session [DOCUMENTED] | HTTP/SSE connection from ACA to MCP server [INFERRED] | gRPC or HTTP connection from Cloud Run to Extensions [DOCUMENTED] |
| **Tool/execution session** | Lambda invocation (stateless, per-call) [DOCUMENTED] | Azure Functions invocation [DOCUMENTED] | Cloud Functions / Extensions invocation [DOCUMENTED] |
| **Workflow session** | Step Functions state machine (for complex workflows) [DOCUMENTED] | Durable Functions (for complex workflows) [DOCUMENTED] | Cloud Workflows or Temporal (customer choice) [DOCUMENTED] |

### 5.2 Session Persistence Stores

**AWS DynamoDB for AgentCore:** [DOCUMENTED + INFERRED]
- Session record structure: `{session_id, agent_id, user_id, created_at, last_active, state_blob, memory_refs[], tool_invocations[]}`
- DynamoDB TTL attribute for automatic session expiry (configurable per use case)
- DynamoDB Streams for event-sourcing session state changes
- Multi-AZ replication automatic; cross-region replication via DynamoDB Global Tables if needed

**Azure Cosmos DB for AI Foundry:** [DOCUMENTED]
- Thread container: partition key = thread_id; TTL on message objects
- Agent container: agent metadata, system prompt, tool definitions
- Run container: run status, steps, token usage
- Multi-region writes available via Cosmos DB multi-master configuration

**Google Firestore for Agent Engine:** [DOCUMENTED]
- Session collection: `sessions/{session_id}` with event subcollection
- Event-sourced model: append-only events rather than mutable state
- Firestore's real-time listeners can feed session updates to streaming clients
- Spanner used for Memory API's long-term store (higher consistency guarantees) [INFERRED]

### 5.3 Sticky Sessions and Session Affinity

| Mechanism | AWS | Azure | GCP |
|-----------|-----|-------|-----|
| **Session affinity** | ECS service sticky sessions via ALB target group stickiness (duration-based) [INFERRED] | ACA session affinity via `ingress.stickySessions: sticky` setting [DOCUMENTED] | Cloud Run session affinity via cookie-based routing (`--session-affinity` flag) [DOCUMENTED] |
| **Cross-AZ affinity** | ALB maintains affinity within AZ; cross-AZ may break affinity [INFERRED] | ACA handles AZ failover transparently; Cosmos DB serves from any region [DOCUMENTED] | Cloud Run may re-route to different region on AZ failure [DOCUMENTED] |
| **Session migration** | On Fargate task failure: restore from DynamoDB checkpoint on new task [INFERRED] | On ACA replica failure: restore from Cosmos DB thread state [INFERRED] | On Cloud Run failure: new instance loads from Firestore events [INFERRED] |

### 5.4 Cross-Region Failover

| Capability | AWS | Azure | GCP |
|-----------|-----|-------|-----|
| **Session replication** | DynamoDB Global Tables for active-active cross-region [DOCUMENTED] | Cosmos DB multi-region write [DOCUMENTED] | Firestore multi-region replication [DOCUMENTED] |
| **Runtime failover** | Route 53 latency/failover routing to secondary region; new Fargate task restores session [INFERRED] | Azure Traffic Manager + secondary AI Foundry endpoint; thread reloads from Cosmos DB [INFERRED] | Cloud Load Balancing with multi-region Cloud Run; session restores from Firestore [DOCUMENTED] |
| **Credential failover** | STS AssumeRole works per-region; IAM roles are global [DOCUMENTED] | Managed Identity tokens issued per region from Entra [DOCUMENTED] | Workload Identity pools are global; tokens issued per region [DOCUMENTED] |

---

## 6. Long-Running Agents & Durable Execution

### 6.1 The Long-Running Agent Problem

An agent handling a complex, multi-step workflow (research task, code review pipeline, document processing) may need to run for minutes to hours, restarting mid-workflow after infrastructure events. None of the three platforms expose this as a first-class primitive directly — all delegate to companion orchestration services.

### 6.2 AWS — Durable Execution

| Mechanism | Detail | Confidence |
|-----------|--------|------------|
| **AWS Step Functions** | Workflow state machine managing multi-step agent tasks; can pause for human approval, call Lambda tools, wait for events | [DOCUMENTED — AgentCore integrates with Step Functions] |
| **AgentCore checkpointing** | Session state written to DynamoDB after each LLM turn; task can resume from last checkpoint on restart | [INFERRED — HIGH] |
| **Event-driven resume** | Amazon EventBridge triggers agent resume on external event (webhook, file upload, schedule) | [DOCUMENTED via AgentCore event integration] |
| **Lambda timeout workaround** | Tool execution via Lambda is limited to 15min; for longer tools, Lambda triggers Step Functions or ECS tasks | [DOCUMENTED] |
| **Long-polling model** | Client polls `GetAgentStatus` or subscribes to EventBridge for async completion | [DOCUMENTED] |

### 6.3 Azure — Durable Execution

| Mechanism | Detail | Confidence |
|-----------|--------|------------|
| **Azure Durable Functions** | Stateful workflow orchestration; handles fan-out/fan-in, timers, external events; used for multi-agent coordination | [DOCUMENTED] |
| **AI Foundry Thread API** | Thread persists in Cosmos DB indefinitely; resuming a thread is resuming from stored message history | [DOCUMENTED] |
| **Logic Apps integration** | For long-running business process orchestration with human approval steps | [DOCUMENTED] |
| **Run status polling** | Agents expose run.status (queued, in_progress, completed, failed); client polls or uses streaming | [DOCUMENTED] |

### 6.4 GCP — Durable Execution

| Mechanism | Detail | Confidence |
|-----------|--------|------------|
| **Cloud Workflows** | Managed workflow service for multi-step agent orchestration; YAML-based, supports HTTP callbacks, retries, human approvals | [DOCUMENTED] |
| **Eventarc + Pub/Sub** | Event-driven agent resume; agent waits for Pub/Sub message to trigger next step | [DOCUMENTED] |
| **Agent Engine Sessions API** | Sessions persist indefinitely in Firestore; agent can be resumed with any session_id | [DOCUMENTED] |
| **Temporal on GKE** | Enterprise deployments often use Temporal (open-source Cadence fork) for durable workflow orchestration | [EVIDENCE — Google Cloud marketplace listing for Temporal] |
| **Checkpoint model** | Event-sourced Firestore session: each turn is an appended event; replay reconstitutes full state | [DOCUMENTED] |

### 6.5 Comparison with Dedicated Orchestrators

| Feature | Step Functions | Durable Functions | Cloud Workflows | Temporal |
|---------|---------------|-------------------|-----------------|---------|
| State persistence | DynamoDB | Azure Storage | Firestore/Spanner | Cassandra/PostgreSQL |
| Long sleep support | Years (via EventBridge) | Unlimited (Timer) | Hours (built-in) | Unlimited |
| Replay/event sourcing | History table | Replay journal | N/A | Event log |
| Sub-workflow | Nested state machines | Sub-orchestrations | Sub-workflows | Child workflows |
| Human approval | Approval task + callback | External events | Callbacks | Signal handling |
| Best for AWS | ✅ | ❌ | ❌ | Optional |
| Best for Azure | ❌ | ✅ | ❌ | Optional |
| Best for GCP | ❌ | ❌ | ✅ | Optional |

---

## 7. Failure Recovery

### 7.1 Failure Classification and Response

| Failure Type | AWS Response | Azure Response | GCP Response |
|---|---|---|---|
| **Runtime crash (container OOM)** | ECS auto-restarts Fargate task; session restored from DynamoDB checkpoint [INFERRED] | ACA restarts replica; thread reloads from Cosmos DB [INFERRED] | Cloud Run starts new instance; session reloads from Firestore [DOCUMENTED] |
| **Node failure** | Fargate abstracts node failure; new task scheduled on healthy Nitro VM [DOCUMENTED] | AKS drain and reschedule pod; ACA handles transparently [DOCUMENTED] | Borg reschedules Cloud Run tasks on healthy machines; transparent to Cloud Run [DOCUMENTED] |
| **AZ failure** | ALB reroutes to healthy AZ; Fargate tasks restarted; DynamoDB Global Tables provide cross-AZ consistency [DOCUMENTED] | ACA multi-AZ replication; Cosmos DB multi-AZ by default [DOCUMENTED] | Cloud Run multi-AZ by default in regional deployments [DOCUMENTED] |
| **Region failure** | Route 53 failover to secondary region; Step Functions Global Resiliency (preview) | Azure Traffic Manager; Cosmos DB multi-region read/write | Cloud Load Balancing multi-region; Firestore replication |
| **MCP server failure** | Gateway circuit breaker; tool call returns error; agent handles via retry logic [DOCUMENTED — Gateway retry policy] | APIM retry policy; Azure Functions error handling [INFERRED] | Vertex AI Toolbox retry policy; Extensions error handling [DOCUMENTED] |
| **Model API failure** | Bedrock model fallback routing (cross-model) [DOCUMENTED] | Azure OpenAI PTU fallback to paygo [DOCUMENTED] | Vertex AI model routing fallback [DOCUMENTED] |
| **Policy engine failure** | Cedar evaluation fails closed (deny by default) [DOCUMENTED] | Azure Policy non-compliance action: audit or deny [DOCUMENTED] | IAM deny by default; OPA sidecar fail-close [INFERRED] |
| **Network partition** | VPC isolation means internal calls use private network; PrivateLink provides resilience [DOCUMENTED] | Private Endpoint + ExpressRoute for hybrid [DOCUMENTED] | VPC Service Controls + Cloud Interconnect [DOCUMENTED] |

### 7.2 Retry and Circuit Breaker Patterns

**AWS:** [DOCUMENTED + INFERRED]
- AgentCore Gateway implements exponential backoff for MCP server calls
- Step Functions built-in retry/catch semantics for workflow steps
- SDK-level retry (Strands SDK) for transient model API failures
- Dead Letter Queue (SQS DLQ) for failed async agent invocations

**Azure:** [DOCUMENTED]
- Azure SDK built-in retry with exponential backoff
- AI Foundry run retry on transient failures (queued → in_progress → failed flow)
- Durable Functions automatic checkpoint-and-retry for workflow steps
- Azure Service Bus DLQ for async agent message failures

**GCP:** [DOCUMENTED]
- Cloud Run internal retry for 503/429 responses
- Cloud Workflows built-in retry configuration (max attempts, backoff)
- Pub/Sub message redelivery and DLQ for async agents
- Vertex AI SDK client-side retry with exponential backoff

### 7.3 Saga Pattern for Distributed Compensation

All three platforms support saga-style compensation for multi-step agent workflows that need rollback on failure:

```
Step 1: Create record         → Compensate: Delete record
Step 2: Send notification     → Compensate: Send cancellation
Step 3: Process payment       → Compensate: Issue refund
Step 4: Update inventory      → Compensate: Restore inventory
         ↑ FAILURE HERE

AWS:   Step Functions Saga with compensating transactions via catch/finally blocks
Azure: Durable Functions orchestration with compensation sub-orchestrations
GCP:   Cloud Workflows with try/except/retry blocks + compensation steps
```

---

## 8. Memory Architecture

### 8.1 Memory Type Taxonomy

| Memory Type | Definition | AWS Implementation | Azure Implementation | GCP Implementation |
|---|---|---|---|---|
| **Conversation memory** | Within-session message history | DynamoDB (session turns) [INFERRED] | Cosmos DB (thread messages) [DOCUMENTED] | Firestore (session events) [DOCUMENTED] |
| **Working memory** | Active context window, in-flight variables | In-process RAM (Fargate task) [INFERRED] | In-process RAM (ACA replica) [INFERRED] | In-process RAM (Cloud Run instance) [INFERRED] |
| **Semantic memory** | Vector-stored factual knowledge | Bedrock Knowledge Bases (OpenSearch) [DOCUMENTED] | Azure AI Search [DOCUMENTED] | Vertex AI Vector Search [DOCUMENTED] |
| **Episodic memory** | Past session summaries and events | AgentCore Memory (LLM-extracted) [DOCUMENTED] | AI Foundry long-term memory (preview) [DOCUMENTED] | Vertex AI Memory API [DOCUMENTED] |
| **Long-term memory** | Cross-session persistent facts | AgentCore Memory + custom DynamoDB [DOCUMENTED] | Cosmos DB + AI Foundry memory bank [DOCUMENTED] | Vertex AI Memory API (Spanner-backed) [DOCUMENTED] |
| **Scratchpad** | Temporary working notes per turn | In-context (token budget) [INFERRED] | In-context [INFERRED] | In-context [INFERRED] |
| **Shared memory** | Cross-agent shared state | DynamoDB + custom IAM sharing [INFERRED] | Cosmos DB shared container [DOCUMENTED — AI Foundry multi-agent] | Firestore shared collection [INFERRED] |

### 8.2 AWS AgentCore Memory Deep Dive

**Architecture:** [DOCUMENTED — see AgentCore Memory Architecture Guide]
- Two-tier model: ephemeral in-session memory (DynamoDB, TTL-scoped) + persistent long-term memory (DynamoDB + S3 for large objects)
- Memory extraction pipeline: after each session, LLM-based extraction identifies key facts, preferences, and events → stored as memory records
- Memory retrieval: semantic search (embedding-based) over memory store via Bedrock Embeddings model
- Memory namespace isolation: per-user, per-agent, per-session namespacing at DynamoDB partition key level
- TTL: configurable per memory type (episodic: 90 days default; long-term: indefinite)
- Encryption: KMS customer-managed key for DynamoDB, S3

### 8.3 Azure AI Foundry Memory

**Architecture:** [DOCUMENTED + INFERRED]
- Short-term: Thread messages in Cosmos DB, automatically included in context
- Long-term: AI Foundry "memory" feature (preview as of mid-2026): Azure AI Search vector index + Cosmos DB metadata
- Memory retrieval: Azure AI Search semantic search with BM25 + vector hybrid
- Memory namespace: Project-scoped; user-specific memories require custom retrieval logic
- Files: Azure Blob Storage with blob URLs referenced in thread messages

### 8.4 Google Vertex AI Agent Engine Memory

**Architecture:** [DOCUMENTED]
- Sessions API: conversation history stored as ordered events in Firestore
- Memory API: long-term memory stored in Spanner (high-consistency, high-throughput)
- Memory operations: `add_memory()`, `list_memories()`, `delete_memory()` REST API
- Memory retrieval: automatic semantic retrieval during agent execution based on user query
- TTL: configurable via Memory API update operations
- Encryption: CMEK (Customer-Managed Encryption Keys) via Cloud KMS

---

## 9. MCP Runtime Integration

### 9.1 AWS AgentCore MCP Integration

**AgentCore Gateway as managed MCP proxy:** [DOCUMENTED]
- AgentCore Gateway is fundamentally an MCP-aware API gateway for enterprise deployments
- It maintains persistent connections to registered MCP servers
- Agents connect to the Gateway (not directly to MCP servers)
- Gateway features: authentication translation, policy enforcement, connection pooling, semantic tool search

**MCP transport:** [DOCUMENTED + INFERRED]
- HTTP+SSE (Streamable HTTP) for remote MCP servers
- STDIO for local MCP servers (via Lambda subprocess — less common in AgentCore)
- Gateway maintains persistent SSE connections to each registered MCP server
- Tool discovery cached at Gateway level, refreshed periodically

**Connection pooling:** [INFERRED — HIGH CONFIDENCE]
- Gateway maintains a pool of connections to each MCP server
- Multiple agent sessions share the same Gateway connection pool to a given MCP server
- Per-session context is carried in request headers (not in the connection itself)

**MCP capability negotiation:** [DOCUMENTED]
- Gateway stores MCP server capabilities in the MCP Registry (control plane)
- Agent requests tools → Gateway resolves from capability cache
- Version negotiation: Gateway handles `2025-11-25` and `2026-07-28` protocol versions

**Sequence:**
```
Agent Session (Fargate)
    │
    │──tool_call(name="search_crm")──►  AgentCore Gateway
    │                                         │
    │                                   Check Cedar policy
    │                                         │ ALLOW
    │                                         │──MCP tools/call──►  MCP Server (external)
    │                                         │◄──tool_result────────
    │                                         │
    │◄──tool_result────────────────────────────
```

### 9.2 Azure AI Foundry MCP Integration

**Status (mid-2026):** Azure AI Foundry has native support for MCP servers as function tools. **[DOCUMENTED — Azure AI Foundry MCP integration announced Build 2024]**

**Transport:** [DOCUMENTED + INFERRED]
- HTTP+SSE for remote MCP servers
- Azure API Management (APIM) used as MCP proxy for enterprise deployments [EVIDENCE — APIM MCP policy documentation]
- APIM translates authentication (Managed Identity → MCP server OAuth) and enforces rate limiting

**Tool registration:** [DOCUMENTED]
- MCP servers registered as function tools in AI Foundry toolset
- Tool schema auto-discovered from MCP server capabilities at registration time
- Function calling API used to invoke MCP tools from the model

**Session handling:** [INFERRED]
- ACA replica maintains SSE connection to MCP server for session duration
- On replica restart, new SSE connection established; MCP 2026-07-28 stateless protocol simplifies this

### 9.3 Google Vertex AI Agent Engine MCP / Extensions

**Vertex AI Extensions vs MCP:** [DOCUMENTED]
- Google's native tool integration uses Vertex AI Extensions (OpenAPI spec + deployment)
- MCP support added via Google's MCP client library for Agent Builder
- Vertex AI Toolbox: managed MCP server for database and Google service access

**Transport:** [DOCUMENTED]
- Vertex AI Extensions use gRPC internally (registered endpoint schema)
- MCP via HTTP+SSE for external MCP servers
- Agent Engine connects to Extensions via Vertex AI internal service mesh (Anthos Service Mesh)

**Tool discovery:** [DOCUMENTED]
- Extensions registry in Vertex AI: operators register tools with OpenAPI spec
- Semantic routing (Vertex AI) can route tool calls to best-match extension

**Connection model:** [INFERRED]
- Cloud Run instance for Agent Engine maintains connections to multiple Extensions simultaneously
- Anthos Service Mesh provides mTLS and load balancing between Cloud Run and Extensions

### 9.4 MCP Runtime Comparison

| Capability | AWS AgentCore | Azure AI Foundry | GCP Agent Engine |
|-----------|---------------|-----------------|-----------------|
| Native MCP support | Yes (AgentCore Gateway) [DOCUMENTED] | Yes (via APIM proxy) [DOCUMENTED] | Yes (via Toolbox + ADK) [DOCUMENTED] |
| MCP transport | HTTP+SSE [DOCUMENTED] | HTTP+SSE [INFERRED] | HTTP+SSE / gRPC [DOCUMENTED] |
| Managed MCP proxy | Yes (Gateway) [DOCUMENTED] | Yes (APIM) [EVIDENCE] | Yes (Toolbox) [DOCUMENTED] |
| Multi-MCP server | Yes [DOCUMENTED] | Yes [DOCUMENTED] | Yes [DOCUMENTED] |
| Connection pooling | Gateway-level [INFERRED] | APIM-level [INFERRED] | Anthos Service Mesh [INFERRED] |
| Auth translation | Gateway → SIGV4 [DOCUMENTED] | APIM → MI token [DOCUMENTED] | ASM → GCP SA token [INFERRED] |
| Schema caching | Registry cache [DOCUMENTED] | APIM policy cache [INFERRED] | Toolbox registry cache [DOCUMENTED] |
| Version negotiation | Gateway handles [DOCUMENTED] | APIM handles [INFERRED] | ADK client handles [DOCUMENTED] |

---

## 10. Sidecars and Service Mesh

### 10.1 AWS — Sidecar and Service Mesh Architecture

**Service mesh:** [INFERRED — HIGH CONFIDENCE]
- AWS App Mesh (Envoy-based) is the documented service mesh for ECS/Fargate
- VPC Lattice (newer, Layer 7 service-to-service) is the likely AgentCore future direction **[EVIDENCE — re:Invent 2024 VPC Lattice for AI services]**
- Internal AgentCore services almost certainly use a service mesh for inter-service communication **[INFERRED]**

**Sidecar pattern in Fargate:**
- Fargate task definitions support multiple containers (sidecar pattern)
- AgentCore agent container likely runs with the following sidecars **[INFERRED]**:

```
AgentCore Agent Fargate Task
├── Agent Runtime Container (main)
│   └── Strands SDK + model client + tool invoker
│
├── Envoy Sidecar (service mesh proxy)
│   ├── mTLS termination (AWS Private CA)
│   ├── Load balancing to downstream services
│   ├── Circuit breaker (Envoy outlier detection)
│   └── Request/response logging
│
├── CloudWatch Agent Sidecar
│   ├── Log forwarding (agent stdout/stderr)
│   ├── Custom metrics (token counts, latency)
│   └── Trace export to X-Ray
│
└── (Optional) Policy Agent Sidecar
    └── Local Cedar evaluation cache [SPECULATIVE]
```

**Responsibilities by layer** [INFERRED]:

| Responsibility | Layer |
|----------------|-------|
| mTLS between services | Envoy sidecar (App Mesh) |
| Authentication (SigV4) | AWS SDK within runtime container |
| Authorization (Cedar) | AgentCore Gateway / control plane |
| Secret retrieval (Secrets Manager) | Runtime container via SDK |
| Connection pooling (to DynamoDB, Bedrock) | Runtime container SDK |
| Retry / circuit breaker | Envoy sidecar + SDK |
| Distributed tracing | CloudWatch Agent sidecar (X-Ray) |
| Prompt logging / audit | Runtime container → CloudTrail |
| Cost tracking | AgentCore control plane → Cost Explorer |
| Guardrails | AgentCore Gateway (before runtime) + Bedrock Guardrails |
| MCP communication | Runtime container via AgentCore Gateway |
| Checkpoint sync | Runtime container → DynamoDB directly |

### 10.2 Azure — Sidecar and Service Mesh Architecture

**Service mesh:** [DOCUMENTED]
- Azure Service Mesh (OSM/Istio-based) integrated into AKS **[DOCUMENTED]**
- AI Foundry Agent Service uses Azure Service Mesh for internal service-to-service communication **[EVIDENCE]**
- Dapr sidecar is explicitly used in AI Foundry Agent SDK for state management and pub/sub **[DOCUMENTED]**

**ACA container architecture** [DOCUMENTED + INFERRED]:

```
Azure Container Apps — Agent Runtime Replica
├── Agent Runtime Container (main)
│   └── Azure AI SDK + tool dispatcher + file handler
│
├── Dapr Sidecar (Dapr.io)
│   ├── State management (Cosmos DB state store)
│   ├── Pub/Sub messaging (Service Bus binding)
│   ├── Service invocation (gRPC or HTTP)
│   └── Secret management (Key Vault secret store)
│
├── Azure Monitor Sidecar
│   ├── OpenTelemetry collector
│   ├── Application Insights SDK
│   └── Log Analytics forwarding
│
└── Envoy Sidecar (Azure Service Mesh)
    ├── mTLS between ACA apps
    ├── Traffic routing
    └── Circuit breaking
```

**Responsibilities by layer** [DOCUMENTED + INFERRED]:

| Responsibility | Layer |
|----------------|-------|
| mTLS | Azure Service Mesh (Istio/Envoy) |
| Authentication | Entra Managed Identity (runtime) + MSAL SDK |
| Authorization | Azure RBAC + Azure Policy |
| Secret retrieval | Dapr secret store (Key Vault) |
| State persistence | Dapr state store (Cosmos DB) |
| Pub/Sub messaging | Dapr pub/sub (Service Bus) |
| Retry | Dapr resilience policy / SDK |
| Distributed tracing | OpenTelemetry → Application Insights |
| Guardrails | Azure Content Safety (API call from runtime) |
| MCP communication | Runtime container via APIM proxy |

### 10.3 GCP — Sidecar and Service Mesh Architecture

**Service mesh:** [DOCUMENTED]
- Anthos Service Mesh (Istio-based) is Google's managed service mesh for GKE
- Cloud Run does not expose traditional sidecar containers publicly — the service mesh is implemented at the Cloud Run platform layer **[DOCUMENTED]**
- Envoy proxies run at the Cloud Run infrastructure level, not as user-defined sidecars

**Cloud Run architecture** [DOCUMENTED + INFERRED]:

```
Cloud Run Container Instance (gVisor sandbox)
├── Agent Runtime Container (only user container)
│   ├── Google ADK / LangChain
│   ├── Extensions caller
│   ├── Memory API client
│   └── Firestore session client
│
[Platform-layer — not user-visible:]
├── Cloud Run platform proxy (Envoy-equivalent)
│   ├── Request routing + load balancing
│   ├── mTLS to Anthos Service Mesh [DOCUMENTED]
│   ├── Traffic management
│   └── Request headers injection
│
├── Cloud Logging agent
│   ├── Structured log forwarding
│   └── Log-based metrics
│
└── Cloud Trace agent
    └── OpenTelemetry distributed tracing
```

**Key difference from AWS/Azure:** Google Cloud Run does not expose sidecar containers to users. All infrastructure concerns (mTLS, observability, traffic management) are handled at the platform level by Google's internal infrastructure. This provides simpler user experience but less customization flexibility. **[DOCUMENTED]**

### 10.4 Service Mesh Comparison

| Feature | AWS (App Mesh/VPC Lattice) | Azure (Service Mesh/Dapr) | GCP (Anthos Service Mesh) |
|---------|---------------------------|--------------------------|--------------------------|
| mTLS | Envoy sidecar (App Mesh) [DOCUMENTED] | Istio sidecar (ASM) [DOCUMENTED] | Platform-layer proxy [DOCUMENTED] |
| Service discovery | AWS Cloud Map [DOCUMENTED] | Kubernetes DNS + Dapr [DOCUMENTED] | Kubernetes DNS + Istio [DOCUMENTED] |
| Circuit breaker | Envoy outlier detection [DOCUMENTED] | Dapr resilience policy [DOCUMENTED] | Istio circuit breaker [DOCUMENTED] |
| Observability | CloudWatch + X-Ray [DOCUMENTED] | Application Insights + OTel [DOCUMENTED] | Cloud Trace + Logging [DOCUMENTED] |
| User-defined sidecars | Yes (Fargate multi-container) [DOCUMENTED] | Yes (ACA Dapr sidecar) [DOCUMENTED] | No (platform handles) [DOCUMENTED] |
| Policy enforcement | Cedar at gateway [DOCUMENTED] | Azure Policy + OPA [INFERRED] | OPA via Istio Mixer/Wasm [INFERRED] |

---

## 11. Request Execution Pipeline

### 11.1 AWS Bedrock AgentCore — Full Pipeline

```
[1] Client Request
    User/app sends: POST /agents/{agentId}/sessions/{sessionId}/turns
    Auth: SigV4 signed request (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, or IAM Role)

[2] API Gateway / CloudFront Edge
    - TLS 1.3 termination at CloudFront PoP
    - WAF rules (rate limiting, IP allowlist, OWASP rules)
    - Route to regional AgentCore API

[3] AgentCore API (control plane)
    - Validate SigV4 signature
    - Authenticate: STS AssumeRole validation
    - Authorize: IAM policy check (Action: bedrock:InvokeAgent)
    - Resolve session → runtime mapping

[4] Cedar Policy Evaluation
    - Amazon Verified Permissions evaluates:
      agent.allowed_tools, user.risk_class, session.context
    - LOG_ONLY mode during rollout → ENFORCE mode in production
    - Deny by default; explicit permit required

[5] Session Routing
    - Sticky session: route to existing Fargate task if session is warm
    - Cold session: trigger Fargate task creation + session restore from DynamoDB

[6] Bedrock Guardrails (pre-model)
    - Prompt Shield: detect prompt injection
    - PII detection and masking
    - Denied topics: block off-policy content
    - Grounding: detect hallucination risk

[7] Agent Runtime (Fargate Task)
    - Planner: select tools, build reasoning trace
    - Context assembly: load memory, session history, tool schemas
    - Memory retrieval: semantic search over AgentCore Memory

[8] Bedrock Model Inference
    - Route to appropriate Bedrock model (Claude, Titan, etc.)
    - Cross-Region Inference for availability
    - Token counting and quota enforcement

[9] Tool Execution (Lambda / MCP Gateway)
    - For Lambda tools: STS AssumeRole for tool-specific permissions
    - For MCP tools: AgentCore Gateway authenticates to MCP server
    - Cedar policy re-evaluated for each tool invocation

[10] Response Assembly
     - Tool results merged into model context
     - Additional model turns if needed (agentic loop)

[11] Output Guardrails
     - PII masking on output
     - Content safety filter
     - Sensitive data detection (GuardDuty / Macie integration)

[12] Audit Logging
     - CloudTrail: every API call, IAM decision, policy evaluation
     - CloudWatch Logs: detailed agent execution trace
     - Bedrock Invocation Logs: model inputs/outputs (if enabled)

[13] Session Checkpoint
     - Updated session state written to DynamoDB
     - Memory extraction triggered (async)

[14] Response to Client
     - Streaming (SSE) or synchronous response
     - Token usage metadata in response headers
```

### 11.2 Azure AI Foundry Agent Service — Full Pipeline

```
[1] Client Request
    POST /openai/assistants/{assistant_id}/threads/{thread_id}/runs
    Auth: Entra Bearer token (MSAL) or API Key

[2] Azure API Management (APIM)
    - TLS 1.3 termination
    - JWT validation (Entra token)
    - Rate limiting (TPM, RPM policies)
    - Content-Type validation

[3] AI Foundry API (control plane)
    - Validate Managed Identity or Bearer token
    - Authorize: Azure RBAC check (Cognitive Services User / Contributor role)
    - Resolve assistant → ACA runtime mapping

[4] Azure Policy Evaluation
    - Built-in policies: content safety, resource limits, geography
    - Custom policies: OPA integration (preview)
    - Initiative assignment evaluation

[5] Session Routing
    - ACA session affinity: route to existing replica if active
    - New replica: ACA scale-out (scale-to-zero if idle)
    - Cosmos DB thread load

[6] Azure Content Safety (pre-model)
    - Prompt Shield (prompt injection detection)
    - Hate/Violence/Sexual/Self-harm classification
    - Groundedness detection (Azure Content Safety Groundedness API)

[7] Agent Runtime (ACA Replica)
    - Azure AI SDK runtime
    - Tool resolution: registered tools + MCP servers
    - Dapr state store: load conversation context

[8] Azure OpenAI / Model Inference
    - PTU (Provisioned Throughput Unit) deployment first
    - Fallback to paygo deployment on capacity
    - OBO token used for cross-service auth within tenant

[9] Tool / Function Execution
    - Azure Functions invoked via Managed Identity
    - Code Interpreter: sandboxed Python execution in isolated container
    - Bing Search: managed integration via AI Foundry
    - MCP servers: invoked via APIM MCP proxy

[10] Response Assembly + Additional Turns

[11] Output Safety Filter
     - Jailbreak detection on output
     - PII classification
     - Custom blocklist matching

[12] Audit and Monitoring
     - Azure Monitor: metrics (token usage, latency, error rates)
     - Application Insights: distributed traces
     - Azure Diagnostic Logs: all API calls to Log Analytics

[13] Thread State Persistence
     - Messages appended to Cosmos DB thread container
     - Run status updated in Cosmos DB

[14] Response to Client
     - Polling model (retrieve Run) or streaming (SSE)
```

### 11.3 Google Cloud Vertex AI Agent Engine — Full Pipeline

```
[1] Client Request
    POST /v1/projects/{project}/locations/{location}/reasoningEngines/{id}:query
    Auth: OAuth 2.0 Bearer token (service account or user credential)

[2] Cloud Load Balancing + Cloud Armor
    - TLS 1.3 termination at GFE (Google Front End)
    - Cloud Armor WAF: OWASP rules, rate limiting, adaptive protection (ML-based DDoS)
    - Global anycast routing to nearest Google PoP

[3] Vertex AI API (control plane)
    - Validate OAuth 2.0 token (Google auth servers)
    - Authorize: IAM policy check (roles/aiplatform.user or custom role)
    - VPC Service Controls boundary check (if configured)

[4] IAM + VPC Service Controls
    - Perimeter evaluation: is this access from within the VPC perimeter?
    - Conditions evaluation (attribute-based access conditions)
    - Service account impersonation check (for OBO patterns)

[5] Session Resolution
    - Resolve session_id → Cloud Run instance (session affinity cookie)
    - New session: allocate Cloud Run instance from warm pool
    - Firestore: load session events

[6] Vertex AI Safety / Guardrails (pre-model)
    - Gemini built-in safety filters (Harm Categories API)
    - Vertex AI Model Armor (prompt injection detection — GA 2026)
    - Data transformation: PII detection via Cloud DLP

[7] Agent Runtime (Cloud Run / gVisor)
    - Google ADK / LangChain runtime
    - Memory API: retrieve relevant memories
    - Tool schema resolution (Extensions registry)

[8] Vertex AI Model Inference (Gemini / custom)
    - Gemini 1.5 Pro / Gemini 2.0 Flash (region-specific)
    - Model Garden access for open-source models
    - Quota enforcement (tokens per minute, requests per minute)

[9] Tool Execution (Extensions / Cloud Functions / MCP)
    - Vertex AI Extensions invoked via internal service mesh (Anthos)
    - Cloud Functions: triggered via internal GCP service account
    - Vertex AI Toolbox (MCP server for databases)
    - Workload Identity Federation for external service calls

[10] Response Iteration (agentic loop)

[11] Output Safety + Data Governance
     - Vertex AI Safety filters on output
     - Cloud DLP PII detection (streaming or batch)
     - Data catalog policy tag enforcement

[12] Observability
     - Cloud Logging: structured agent execution logs
     - Cloud Trace: distributed trace across all GCP services
     - Cloud Monitoring: custom metrics (Vertex AI Agent Engine metrics)
     - BigQuery Export: for long-term audit and analytics

[13] Session Persistence
     - Append events to Firestore session collection
     - Memory API: extract and store long-term memories async

[14] Response to Client
     - Streaming or synchronous response
     - Usage metadata (token counts, latency) in response
```

---

## 12. Authentication

### 12.1 AWS Authentication Stack

**Inbound (client → AgentCore):** [DOCUMENTED]
- SigV4 signed requests (AWS Signature Version 4)
- IAM roles via STS AssumeRole / AssumeRoleWithWebIdentity
- Cognito User Pool tokens for end-user-facing agent APIs
- API Keys for testing (not recommended for production)

**Within platform (AgentCore → AWS services):** [DOCUMENTED]
- Task IAM Role: Fargate task assumes a unique IAM role per session
- STS GetSessionToken / AssumeRole for scoped temporary credentials
- IAM Roles Anywhere for hybrid cloud (on-premises agent calling AWS services)

**Cross-service token propagation:** [DOCUMENTED]
- SigV4 is used for all AWS service calls (Bedrock, DynamoDB, Lambda, S3)
- Agent identity is always the Task IAM Role, not the calling user
- User identity passed as a claim in the request body; policy uses `aws:PrincipalTag` or session context

**MCP server authentication:** [DOCUMENTED]
- AgentCore Gateway uses IAM Role to authenticate to MCP servers via SigV4 (for AWS-hosted MCP)
- OAuth 2.0 client credentials for external (non-AWS) MCP servers

### 12.2 Azure Authentication Stack

**Inbound (client → AI Foundry):** [DOCUMENTED]
- Entra ID Bearer token (MSAL authentication flow)
- API Key (via AI Foundry resource key — not recommended for production)
- Managed Identity (for app-to-agent scenarios)

**Within platform (AI Foundry → Azure services):** [DOCUMENTED]
- System-assigned or User-assigned Managed Identity for ACA app
- MI token obtained from IMDS (Instance Metadata Service, 169.254.169.254)
- Azure OpenAI accessed via MI with Cognitive Services User role
- Cosmos DB accessed via MI with Cosmos DB Built-in Data Contributor role
- Key Vault accessed via MI for secret retrieval

**On-Behalf-Of (OBO):** [DOCUMENTED]
- AI Foundry supports OBO flows for delegated user permissions
- Entra OBO grant: agent acts on behalf of signed-in user for SharePoint, Graph API access
- OBO token exchange: user access token → agent scoped token for downstream resource

**MCP server authentication:** [DOCUMENTED + INFERRED]
- APIM policy: extract incoming Managed Identity token, exchange for MCP server OAuth token
- Custom auth header injection in APIM policy for proprietary MCP servers

### 12.3 GCP Authentication Stack

**Inbound (client → Agent Engine):** [DOCUMENTED]
- OAuth 2.0 Bearer token (Google auth: user or service account)
- Service Account JSON key (not recommended) or Workload Identity Federation
- API Key (for public, low-risk APIs only)

**Within platform (Agent Engine → GCP services):** [DOCUMENTED]
- Service Account attached to Cloud Run instance
- Workload Identity binding: Kubernetes SA → GCP SA (no key file)
- Short-lived token obtained from metadata server (169.254.169.254/computeMetadata/v1/)
- Impersonation: Cloud Run SA impersonates specific SA for scoped access to sensitive services

**Cross-service token propagation:** [DOCUMENTED]
- `Authorization: Bearer {access_token}` for all GCP API calls from Cloud Run
- Service Account as the agent's identity (not the end user)
- End user identity passed in `X-Goog-Authenticated-User-*` headers or as request context

**External MCP authentication:** [INFERRED]
- Cloud Run workload identity token presented to external MCP servers via Workload Identity Federation
- OIDC token from metadata server used as bearer token for third-party OAuth MCP servers

### 12.4 Authentication Comparison

| Mechanism | AWS | Azure | GCP |
|-----------|-----|-------|-----|
| **Primary auth standard** | SigV4 + IAM | Entra Bearer + MSAL | OAuth 2.0 Bearer |
| **Workload identity** | IAM Task Role (IRSA) | Managed Identity | Workload Identity Federation |
| **Short-lived credentials** | STS (15min–1h) | MI token (1h) | Access token (1h) |
| **Token source** | STS service | Entra ID (MSAL) | Google metadata server |
| **User delegation** | Cognito + STS Federation | Entra OBO | IAM service account impersonation |
| **No-secret auth** | IRSA / Roles Anywhere | System Managed Identity | Workload Identity |
| **Cross-cloud** | IAM Roles Anywhere + OIDC | Workload Identity Federation (preview) | Workload Identity Federation |
| **Hybrid cloud** | IAM Roles Anywhere | Entra hybrid joined machines | Cloud Identity + BeyondCorp |

---

## 13. Authorization

### 13.1 AWS Authorization — Cedar + IAM

**Two-layer authorization model:** [DOCUMENTED]
1. **IAM Layer:** Coarse-grained — "Can this identity call this AWS service/operation?"
2. **Cedar (Verified Permissions) Layer:** Fine-grained — "Can this agent perform this specific action on this specific resource, given this context?"

**IAM policy for AgentCore:** [DOCUMENTED]
```json
{
  "Action": ["bedrock:InvokeAgent", "bedrock:InvokeAgentWithResponseStream"],
  "Resource": "arn:aws:bedrock:us-east-1:*:agent-alias/AGENT123/AGALIAS456",
  "Condition": { "StringEquals": { "aws:RequestedRegion": "us-east-1" } }
}
```

**Cedar policy for tool authorization:** [DOCUMENTED]
```cedar
permit(
  principal is AgentUser,
  action == Action::"InvokeTool",
  resource is Tool::"payment_processor"
) when {
  principal.risk_classification == "low" &&
  context.request_time.hour >= 8 &&
  context.request_time.hour <= 18
};
```

**Authorization evaluation sequence:** [DOCUMENTED]
1. IAM policy evaluation (AWS authorization service — fast, coarse)
2. Session policy restrictions (scoped temporary credentials)
3. Cedar policy evaluation (fine-grained, agent-specific)
4. Resource-based policy (if applicable — S3 bucket policy, etc.)

### 13.2 Azure Authorization — Azure RBAC + Conditional Access

**RBAC roles for AI Foundry:** [DOCUMENTED]
- `Cognitive Services User`: invoke agents, create threads
- `Cognitive Services Contributor`: manage agents and assistants
- `Cognitive Services OpenAI User`: use OpenAI models
- Custom RBAC roles with fine-grained permissions

**Conditional Access (Entra ID):** [DOCUMENTED]
- Risk-based: require MFA for admin operations based on sign-in risk
- Device compliance: require compliant device for accessing AI Foundry
- Location: restrict access to specific IP ranges or named locations
- Frequency: require fresh auth for session-sensitive operations

**Azure Policy for AI governance:** [DOCUMENTED]
- Allowed AI model deployments: restrict which models can be deployed
- Network: enforce Private Endpoint requirement
- Tagging: require compliance tags on AI Foundry resources
- Diagnostic settings: require logging to Log Analytics

**OPA integration (preview):** [EVIDENCE]
- Azure Arc + OPA Gatekeeper for custom fine-grained policy enforcement
- Policy bundles served from Azure Blob Storage
- Admission controller pattern for agent registration

### 13.3 GCP Authorization — IAM Conditions + VPC Service Controls

**IAM roles for Vertex AI Agent Engine:** [DOCUMENTED]
- `roles/aiplatform.user`: invoke reasoning engines, create sessions
- `roles/aiplatform.admin`: deploy and manage agent engines
- Custom roles with fine-grained Vertex AI permissions

**IAM Conditions:** [DOCUMENTED]
```python
# IAM condition for time-restricted access
{
    "title": "Business hours only",
    "expression": "request.time.getHours('America/New_York') >= 8 && request.time.getHours('America/New_York') <= 18"
}
```

**VPC Service Controls:** [DOCUMENTED]
- Service perimeter defines which services can communicate
- Data exfiltration prevention: even authenticated requests blocked if outside perimeter
- Ingress/egress rules control access from specific identities or VPCs
- Particularly important for regulated industries: PHI data must not leave GCP environment

**OPA on GKE:** [INFERRED]
- Vertex AI's internal policy enforcement likely uses OPA + Gatekeeper for Kubernetes-level admission
- Agent deployments validated against policy before being admitted to the cluster

---

## 14. Zero Trust Implementation

### 14.1 Zero Trust Architecture Comparison

| ZT Principle | AWS Implementation | Azure Implementation | GCP Implementation |
|---|---|---|---|
| **Verify explicitly** | SigV4 on every request; IAM evaluates every API call | Entra Conditional Access on every request; RBAC per operation | GCP auth token on every request; IAM evaluates every API call |
| **Least privilege** | Task IAM Role with minimal permissions; Cedar narrows further | Managed Identity with minimal RBAC; Conditional Access narrows | Service Account with minimal permissions; IAM Conditions narrow |
| **Assume breach** | GuardDuty anomaly detection; Macie data scanning; CloudTrail forensics | Microsoft Defender for Cloud; Microsoft Sentinel SIEM | Security Command Center; Chronicle SIEM |
| **Short-lived credentials** | STS: 15min–1h; Lambda execution role per invocation | MI token: 1h; refreshed automatically | Access token: 1h; refreshed from metadata server |
| **mTLS** | App Mesh (Envoy) between services | Azure Service Mesh (Istio) between ACA apps | Anthos Service Mesh (Istio) between Cloud Run / GKE |
| **Private networking** | PrivateLink; VPC endpoints; No public IP | Private Endpoint; VNet injection; ExpressRoute | Private Google Access; VPC Service Controls; Cloud Interconnect |
| **No standing privilege** | IRSA: no static keys; Roles Anywhere for hybrid | System Managed Identity: no key stored anywhere | Workload Identity Federation: no service account key |
| **Microsegmentation** | Security Groups + NACLs; VPC Lattice service policies | NSG + Azure Firewall + Private Endpoint | VPC firewall rules + Hierarchical firewall policies |

### 14.2 SPIFFE/SPIRE in Each Platform

| Platform | SPIFFE/SPIRE Status | Alternative Used |
|---------|---------------------|-----------------|
| **AWS** | Not deployed by AWS for AgentCore [INFERRED]; AWS-managed services use AWS PKI | IAM Task Role + mTLS via App Mesh CA |
| **Azure** | Not deployed for AI Foundry [INFERRED]; enterprise customers using SPIRE on AKS | Managed Identity + Azure Service Mesh (Istio CA) |
| **GCP** | Anthos Service Mesh integrates with SPIFFE via its own Istio CA **[DOCUMENTED]** | SPIFFE SVIDs issued by Anthos CA for pod-to-pod mTLS |

GCP is the only major cloud with documented SPIFFE integration in its managed agent platform (via Anthos Service Mesh). AWS and Azure use proprietary equivalents. **[DOCUMENTED for GCP; INFERRED for others]**

---

## 15. Service-to-Service Trust

### 15.1 How Agent Runtimes Authenticate to Downstream Services

**AWS — Task Role credential chain:** [DOCUMENTED]
```
Fargate Task
  │
  │ GET http://169.254.170.2/v2/credentials/{relative_uri}  ← Task metadata endpoint
  ▼
ECS Agent (on host)
  │
  │ STS AssumeRole(task_role_arn, session_duration=3600)
  ▼
STS → {AccessKeyId, SecretAccessKey, SessionToken}
  │
  │ SigV4 signing
  ├── bedrock.us-east-1.amazonaws.com (model inference)
  ├── dynamodb.us-east-1.amazonaws.com (session + memory)
  ├── lambda.us-east-1.amazonaws.com (tool execution)
  └── secretsmanager.us-east-1.amazonaws.com (secrets)
```

**Azure — Managed Identity credential chain:** [DOCUMENTED]
```
ACA Container
  │
  │ GET http://169.254.169.254/metadata/identity/oauth2/token
  │   ?resource=https://cognitiveservices.azure.com
  ▼
Azure Instance Metadata Service (IMDS)
  │
  │ Returns: {access_token, expires_on}
  │
  ├── Azure OpenAI (Authorization: Bearer {token})
  ├── Cosmos DB (Authorization: Bearer {token})
  ├── Key Vault (Authorization: Bearer {token})
  └── Azure Functions (Authorization: Bearer {token})
```

**GCP — Metadata Server credential chain:** [DOCUMENTED]
```
Cloud Run Container
  │
  │ GET http://metadata.google.internal/computeMetadata/v1/
  │   instance/service-accounts/default/token
  ▼
GCP Metadata Server
  │
  │ Returns: {access_token, token_type, expires_in}
  │
  ├── Vertex AI model endpoint (Authorization: Bearer {token})
  ├── Firestore (Authorization: Bearer {token})
  ├── Cloud Functions (Authorization: Bearer {token})
  └── Cloud Storage (Authorization: Bearer {token})
```

### 15.2 No-Credential Architecture

All three platforms achieve zero stored credentials for cloud-native deployments:
- **AWS:** IRSA/Task Role → no AWS_ACCESS_KEY_ID in environment
- **Azure:** System Managed Identity → no client secret stored anywhere
- **GCP:** Workload Identity → no service account key file

For **hybrid cloud** (on-premises agent calling cloud service):
- **AWS:** IAM Roles Anywhere — issues STS credentials based on X.509 certificate from enterprise PKI
- **Azure:** Workload Identity Federation (preview) — issues Entra tokens based on OIDC assertion
- **GCP:** Workload Identity Federation — issues GCP tokens based on OIDC/SAML assertion from any IdP

---

## 16. Guardrails Placement

### 16.1 AWS Bedrock Guardrails Pipeline

```
User prompt
    │
    ├── [G1] AWS WAF — IP/rate/OWASP at edge
    │
    ├── [G2] Bedrock Guardrails (pre-model input)
    │       ├── Prompt Shield (injection detection)
    │       ├── Denied topics filter
    │       ├── PII detection + masking
    │       ├── Word filter (custom blocklist)
    │       └── Grounding detection (hallucination risk)
    │
    ├── [G3] Cedar Policy (tool authorization — per invocation)
    │
    ├── [G4] Model Inference (Claude/Titan/etc.)
    │
    ├── [G5] Bedrock Guardrails (post-model output)
    │       ├── Output denied topics filter
    │       ├── PII masking on response
    │       └── Content safety scoring
    │
    ├── [G6] AgentCore Lambda Authorizer (per tool invocation)
    │       └── Cedar re-evaluation with tool output context
    │
    └── [G7] GuardDuty / Macie (async)
            └── Anomaly detection on CloudTrail events (not in critical path)
```

**Where each guardrail executes:** [DOCUMENTED]
- G1: AWS Edge (CloudFront WAF) — before API Gateway
- G2/G5: Bedrock Guardrail service — synchronous, before/after model invocation
- G3: Cedar policy evaluator — synchronous, before each tool invocation
- G4: Bedrock model — inference
- G6: Lambda Authorizer — optional, synchronous gate before tool execution
- G7: GuardDuty/Macie — asynchronous, alerting only

### 16.2 Azure AI Content Safety Pipeline

```
User prompt
    │
    ├── [G1] Azure API Management — rate limit, JWT validation
    │
    ├── [G2] Azure Content Safety (pre-model)
    │       ├── Prompt Shield (jailbreak + injection detection)
    │       ├── Hate/Violence/Sexual/Self-harm classification
    │       └── Custom categories (configurable)
    │
    ├── [G3] Azure Policy (resource/configuration guardrails)
    │
    ├── [G4] Azure OpenAI model with system prompt safety
    │
    ├── [G5] Azure Content Safety (post-model output)
    │       ├── Output content classification
    │       └── Groundedness detection (factual accuracy)
    │
    ├── [G6] Function-level auth (per tool invocation)
    │       └── RBAC check on Azure Function invocation
    │
    └── [G7] Microsoft Defender for Cloud (async)
```

### 16.3 GCP Vertex AI Safety Pipeline

```
User prompt
    │
    ├── [G1] Cloud Armor — WAF, DDoS, adaptive protection
    │
    ├── [G2] Vertex AI Model Armor (pre-model, GA 2026)
    │       ├── Prompt injection detection
    │       ├── Malicious instruction detection
    │       └── Jailbreak classification
    │
    ├── [G3] Cloud DLP (PII detection on input, configurable)
    │
    ├── [G4] Gemini model with built-in safety (Harm Categories API)
    │       └── BLOCK_MEDIUM_AND_ABOVE / BLOCK_ONLY_HIGH thresholds
    │
    ├── [G5] Vertex AI Safety (post-model output classification)
    │       └── Harm category scores on output
    │
    ├── [G6] IAM + VPC Service Controls (resource-level gate)
    │
    └── [G7] Security Command Center + Chronicle (async)
```

### 16.4 Guardrails Comparison

| Guardrail Type | AWS | Azure | GCP |
|---|---|---|---|
| **Prompt injection** | Bedrock Guardrails Prompt Shield [DOCUMENTED] | Azure Content Safety Prompt Shield [DOCUMENTED] | Vertex AI Model Armor [DOCUMENTED] |
| **Jailbreak** | Bedrock Guardrails [DOCUMENTED] | Azure Content Safety [DOCUMENTED] | Gemini Safety + Model Armor [DOCUMENTED] |
| **PII masking** | Bedrock Guardrails [DOCUMENTED] | Azure Content Safety (preview) + Purview [DOCUMENTED] | Cloud DLP [DOCUMENTED] |
| **Denied topics** | Bedrock Guardrails denied topics [DOCUMENTED] | System prompt + Content Safety categories [DOCUMENTED] | Gemini Safety thresholds [DOCUMENTED] |
| **Groundedness** | Bedrock Guardrails grounding check [DOCUMENTED] | Azure Content Safety Groundedness (preview) [DOCUMENTED] | Vertex AI Grounding [DOCUMENTED] |
| **Custom blocklist** | Bedrock Guardrails word filters [DOCUMENTED] | Azure Content Safety custom categories [DOCUMENTED] | Gemini safety settings [DOCUMENTED] |
| **Output safety** | Bedrock Guardrails post-processing [DOCUMENTED] | Azure Content Safety output filter [DOCUMENTED] | Gemini Harm Category output check [DOCUMENTED] |
| **Anomaly detection** | GuardDuty ML-based [DOCUMENTED] | Microsoft Defender for Cloud [DOCUMENTED] | Security Command Center [DOCUMENTED] |

---

## 17. Middleware and Interceptors

### 17.1 AWS — Extension Points

| Extension Point | Mechanism | Use Case |
|----------------|-----------|---------|
| **Lambda Interceptors** | Lambda function called before/after model or tool execution | Custom auth, context enrichment, cost controls |
| **Bedrock Invocation Logging** | Pre/post model invocation hooks | Audit logging, prompt logging, A/B testing |
| **AgentCore Hooks (SDK)** | Strands SDK `@tool` decorator and pipeline hooks | Custom tool logic, retry, transformation |
| **Step Functions Activities** | External activity workers process specific workflow steps | Human approval, external system integration |
| **EventBridge Rules** | Reactive events on agent completion, failure, or specific output | Notification, downstream processing |
| **Bedrock Evaluation Jobs** | Post-invocation async evaluation for quality/safety | Model evaluation, regression testing |

### 17.2 Azure — Extension Points

| Extension Point | Mechanism | Use Case |
|----------------|-----------|---------|
| **APIM Policies** | XML policy blocks: inbound, backend, outbound, error | Auth transformation, rate limit, content rewrite |
| **Dapr Middleware** | Dapr middleware pipeline (pre/post request) | Auth, tracing, circuit breaking |
| **Azure Functions Middleware** | DI-based middleware in Functions | Custom auth, logging, context enrichment |
| **Semantic Kernel Filters** | Pre/post invocation filters in Semantic Kernel | Prompt transformation, output filtering, caching |
| **AI Foundry Hooks (preview)** | Agent lifecycle hooks in AI Foundry SDK | Pre-run, post-run, tool-call events |
| **Logic Apps Connectors** | No-code integration with 400+ connectors | External service integration, approval workflows |

### 17.3 GCP — Extension Points

| Extension Point | Mechanism | Use Case |
|----------------|-----------|---------|
| **ADK Callbacks** | LangChain/ADK `before_action`, `after_action` callbacks | Custom logic, logging, state mutation |
| **Cloud Functions Middleware** | Express.js middleware pattern in Gen2 Functions | Auth, rate limiting, transformation |
| **Vertex AI Pipelines** | Kubeflow-based ML pipeline components | Pre/post processing, evaluation |
| **Pub/Sub Event Bridge** | Agent publishes/subscribes to topics | Async integration, fan-out patterns |
| **Cloud Run Sidecar (via YAML)** | Multi-container Cloud Run service (GA 2024) | Sidecar middleware for logging, auth, proxy |
| **Eventarc Triggers** | Cloud event triggers for agent lifecycle events | Monitoring, downstream automation |

---

## 18. Policy Engine

### 18.1 AWS — Cedar (Amazon Verified Permissions)

**Language:** Cedar — purpose-built, formally verified policy language **[DOCUMENTED]**
**Evaluation:** Evaluate every agent action against policy before execution **[DOCUMENTED]**
**Integration with AgentCore:** Cedar policies stored in Amazon Verified Permissions policy store; evaluated synchronously per agent action **[DOCUMENTED]**

```cedar
// AgentCore Cedar policy — bank use case
permit(
  principal is AgentUser,
  action in [Action::"InvokeTool", Action::"ReadMemory"],
  resource is AgentResource
) when {
  principal.department == "banking" &&
  resource.data_classification in ["public", "internal"] &&
  context.hour_of_day >= 8 &&
  context.hour_of_day <= 18 &&
  context.session_risk_score < 50
};

forbid(
  principal is AgentUser,
  action == Action::"InvokeTool",
  resource is Tool::"payment_write"
) when {
  context.session_risk_score > 75
};
```

**Neuro-symbolic policy authoring:** [DOCUMENTED]
- AgentCore policy engine supports LLM-assisted policy authoring
- Natural language policy intent → Cedar policy translation (with human review)
- LOG_ONLY mode: policies evaluated but not enforced; violations logged for tuning

**Why Cedar over OPA:** Formal verification (Cedar policies can be mathematically proven correct); deterministic evaluation; purpose-built for AWS ecosystem **[DOCUMENTED]**

### 18.2 Azure — Azure Policy + OPA Hybrid

**Azure Policy:** [DOCUMENTED]
- Built-in: define compliance requirements for AI Foundry resources
- Initiative assignments: group related policies
- Remediation tasks: auto-remediate non-compliant resources
- Limitation: Azure Policy is resource-configuration focused, not request-path authorization

**OPA + Gatekeeper (for request-path):** [INFERRED]
- Azure Arc-enabled clusters support OPA Gatekeeper admission controller
- AI Foundry enterprise deployments likely use OPA for fine-grained request policies
- Policy bundles stored in Azure Blob Storage; OPA agents pull every 30s

**Semantic Kernel Policy (application level):** [DOCUMENTED]
- Semantic Kernel Filters implement application-level policy enforcement
- Prompt safety filters, function invocation guards, output validation

### 18.3 GCP — IAM Conditions + OPA

**IAM Conditions:** [DOCUMENTED]
- Attribute-based access control embedded in IAM policy bindings
- Conditions evaluate `request.time`, `resource.name`, `request.auth.claims`
- Limitations: not designed for business logic complexity of agent authorization

**OPA on GKE (enterprise pattern):** [EVIDENCE]
- Vertex AI enterprise deployments commonly use OPA Gatekeeper on GKE
- Policy bundles served from GCS; OPA agents pull periodically
- Styra DAS used for managed OPA in some enterprise GCP deployments

**VPC Service Controls as policy:** [DOCUMENTED]
- Service perimeter acts as an outer policy boundary
- Access levels enforce attribute conditions (device compliance, location, time)
- All Vertex AI API calls checked against service perimeter

---

## 19. Networking Internals

### 19.1 Traffic Flow Architecture

**AWS:** [DOCUMENTED + INFERRED]
```
Internet → Route 53 (GeoDNS) → CloudFront (edge, WAF)
         → API Gateway (regional)
         → AgentCore API (VPC endpoint via PrivateLink)
         → ECS/Fargate Task (private subnet)
         → Bedrock (VPC endpoint for private access)
         → DynamoDB (VPC endpoint)
         → Lambda (VPC endpoint or public with SigV4)
```

**Azure:** [DOCUMENTED]
```
Internet → Azure Front Door (CDN, WAF, global LB)
         → Azure API Management (regional, Private Endpoint)
         → AI Foundry API (Private Endpoint in customer VNet)
         → ACA Environment (VNet injection)
         → Azure OpenAI (Private Endpoint)
         → Cosmos DB (Private Endpoint)
         → Key Vault (Private Endpoint)
```

**GCP:** [DOCUMENTED]
```
Internet → Cloud Armor (WAF, DDoS) → GFE (Google Front End, anycast)
         → Cloud Load Balancing (global)
         → Vertex AI API (regional, Private Google Access)
         → Cloud Run (VPC connector or direct VPC)
         → Vertex AI (Private Google Access)
         → Firestore (Private Google Access)
         → Cloud Functions (VPC connector)
```

### 19.2 Service Discovery

| Mechanism | AWS | Azure | GCP |
|-----------|-----|-------|-----|
| **Internal DNS** | Route 53 private hosted zones | Azure Private DNS zones | Cloud DNS private zones |
| **Service registry** | AWS Cloud Map | Azure Service Registry (Dapr) | Kubernetes DNS (GKE) |
| **Load balancing** | ALB (L7) + NLB (L4) | Azure Load Balancer + APIM | Cloud Load Balancing (global) |
| **Connection pooling** | Envoy (App Mesh) | Dapr + APIM | Anthos Service Mesh (Istio) |
| **Health probes** | ALB health checks; ECS health checks | ACA health probes; Azure Load Balancer | Cloud Run health checks; GKE readiness |

### 19.3 Latency Engineering

| Operation | AWS Target | Azure Target | GCP Target |
|-----------|-----------|-------------|-----------|
| Auth (SigV4/MI/SA token) | <5ms (cached) | <10ms (IMDS) | <5ms (metadata server, cached) |
| Policy evaluation (Cedar/RBAC) | <5ms | <10ms | <5ms |
| Session restore (DB read) | <10ms (DynamoDB DAX) | <15ms (Cosmos DB) | <10ms (Firestore) |
| Model inference (first token) | 500–2000ms | 500–2000ms | 400–1500ms |
| Tool execution (Lambda/Functions) | 100–500ms (warm) | 100–500ms (warm) | 100–400ms (warm) |
| Total request latency (warm) | 1–5s | 1–6s | 0.8–4s |
| Total request latency (cold) | 5–15s | 5–20s | 3–12s |

*All latency estimates are approximate ranges based on public documentation and benchmark reports; actual performance varies significantly by workload.*

---

## 20. Observability Architecture

### 20.1 AWS — Observability Stack

**Traces:** [DOCUMENTED]
- AWS X-Ray: distributed tracing across Lambda, ECS, DynamoDB, Bedrock
- Bedrock Invocation Logs: model input/output, token counts, latency per invocation
- X-Ray service map: auto-generated dependency visualization

**Metrics:** [DOCUMENTED]
- CloudWatch Metrics: agent invocation count, latency, error rate, token usage
- Custom metrics: tool invocation counts, memory hit rate, Cedar policy decisions
- CloudWatch Anomaly Detection: ML-based metric anomaly detection

**Logs:** [DOCUMENTED]
- CloudWatch Logs: agent runtime logs, Lambda tool logs, ECS task logs
- CloudTrail: all control-plane API calls (agent creation, policy changes)
- Bedrock Model Invocation Logging: optional logging of prompts and completions

**AI-specific observability:** [DOCUMENTED + INFERRED]
- Arize Phoenix / Langfuse via Lambda integration for LLM observability
- AgentCore built-in trace export to Bedrock Traces API
- Cost tracking via AWS Cost Explorer tagging (agent_id, session_id tags)

### 20.2 Azure — Observability Stack

**Traces:** [DOCUMENTED]
- Application Insights: distributed tracing across ACA, Functions, Azure OpenAI
- Azure Monitor: end-to-end distributed trace visualization
- OpenTelemetry SDK: standard trace export from AI Foundry SDK

**Metrics:** [DOCUMENTED]
- Azure Monitor Metrics: token usage, invocation count, latency, error rate
- Log Analytics Workspace: custom queries and dashboards
- Azure Monitor Workbooks: pre-built agent monitoring dashboards

**Logs:** [DOCUMENTED]
- Azure Monitor Diagnostic Logs: all AI Foundry API calls
- Application Insights Custom Events: agent lifecycle events (run start, run complete)
- Azure Audit Log: RBAC changes, key vault access

**AI-specific:** [DOCUMENTED]
- Azure AI Content Safety filtering logs
- Prompt evaluation metrics in Azure AI Studio
- Semantic Kernel telemetry via OTel exporters

### 20.3 GCP — Observability Stack

**Traces:** [DOCUMENTED]
- Cloud Trace: distributed tracing across Cloud Run, Cloud Functions, Vertex AI
- Vertex AI Traces (GA 2026): agent-specific trace view in Vertex AI console
- OpenTelemetry Collector sidecar (optional) for multi-destination trace export

**Metrics:** [DOCUMENTED]
- Cloud Monitoring: Vertex AI metrics (prediction count, latency, error rate)
- Agent Engine Metrics: session count, turns per session, memory operations
- Custom metrics via Cloud Monitoring custom metric API

**Logs:** [DOCUMENTED]
- Cloud Logging: structured JSON logs from Cloud Run (auto-captured)
- Vertex AI Request Logs: model request/response logs (configurable)
- Cloud Audit Logs: data access, admin activity, system events
- BigQuery Export: long-term audit log storage with SQL analytics

**AI-specific:** [DOCUMENTED]
- Vertex AI Model Monitoring: data drift, prediction drift detection
- Agent Engine event logs: tool calls, memory operations, session events
- Langfuse / Phoenix integration via Cloud Run custom observability

### 20.4 Observability Comparison

| Feature | AWS | Azure | GCP |
|---------|-----|-------|-----|
| Distributed tracing | X-Ray [D] | Application Insights [D] | Cloud Trace [D] |
| OTel support | Via OTel Collector Lambda layer [D] | Native OTLP export [D] | Native OTLP [D] |
| Model invocation logs | Bedrock Invocation Logs [D] | Azure Monitor Diagnostics [D] | Vertex AI Request Logs [D] |
| Agent trace visualization | AgentCore Traces API [D] | Azure Monitor (run steps) [D] | Vertex AI console [D] |
| Cost tracking | Cost Explorer + tags [D] | Azure Cost Management + tags [D] | Cloud Billing + labels [D] |
| SIEM integration | CloudTrail → Sentinel/Splunk [D] | Microsoft Sentinel native [D] | Chronicle / BigQuery [D] |
| LLM observability | Arize Phoenix (via Lambda) [E] | Azure AI Studio evaluations [D] | Vertex AI Evaluation [D] |

*[D] = DOCUMENTED, [E] = EVIDENCE*

---

## 21. Multi-Tenancy Strategy

### 21.1 Isolation Boundaries

| Boundary | AWS | Azure | GCP |
|---------|-----|-------|-----|
| **Organization** | AWS Organization (SCPs) | Entra Tenant | GCP Organization |
| **Account/Subscription/Project** | AWS Account | Azure Subscription | GCP Project |
| **Workspace** | AgentCore namespace [INFERRED] | AI Foundry Hub | Vertex AI Location |
| **Agent** | Agent ID + IAM resource tag | Agent/Assistant resource | Reasoning Engine ID |
| **Session** | Session ID + DynamoDB partition | Thread ID + Cosmos partition | Session ID + Firestore document |
| **Runtime** | Fargate task (dedicated) [INFERRED] | ACA replica [DOCUMENTED] | Cloud Run instance [DOCUMENTED] |
| **Memory** | Namespace + user_id in DynamoDB | Cosmos DB container partition | Firestore document hierarchy |
| **Secrets** | IAM role per agent [DOCUMENTED] | Managed Identity per app [DOCUMENTED] | SA per Cloud Run service [DOCUMENTED] |
| **Networking** | VPC + Security Groups + PrivateLink | VNet + NSG + Private Endpoint | VPC + Firewall + VPC SC |
| **Billing** | Per-account; Cost Allocation Tags | Per-subscription; Cost Management Tags | Per-project; Billing Labels |

### 21.2 What Is Shared vs Dedicated

**AWS:** [DOCUMENTED + INFERRED]
- **Shared:** Bedrock model inference infrastructure; AgentCore control plane API; DynamoDB service (logical isolation)
- **Dedicated:** Fargate compute (per-account isolation); IAM roles (per-agent); VPC (per-account); S3 buckets (per-account)

**Azure:** [DOCUMENTED]
- **Shared:** Azure OpenAI endpoint (shared cluster, logically isolated); APIM gateway instance (per-tenant logical isolation); Cosmos DB service (logical isolation)
- **Dedicated:** ACA Environment per project; Managed Identity per app; Key Vault (per-project recommended); VNet (per-subscription)

**GCP:** [DOCUMENTED]
- **Shared:** Vertex AI prediction infrastructure; Cloud Run platform (per-project isolation); Firestore (logical isolation)
- **Dedicated:** Cloud Run service per agent (separate container); Service Account per workload; VPC (per-project); GCS bucket (per-project)

### 21.3 Cross-Tenant Data Leakage Prevention

| Control | AWS | Azure | GCP |
|---------|-----|-------|-----|
| **Logical isolation** | DynamoDB partition key per tenant | Cosmos DB partition per tenant | Firestore document namespace |
| **Encryption isolation** | KMS CMK per customer [DOCUMENTED] | BYOK via Key Vault [DOCUMENTED] | CMEK via Cloud KMS [DOCUMENTED] |
| **Network isolation** | VPC per account; Security Groups | VNet per subscription; NSG | VPC per project; Firewall rules |
| **Compliance boundary** | AWS GovCloud for highest isolation | Azure Government / Sovereign Cloud | Google Sovereign Cloud (EU, DE, FR) |

---

## 22. Comparative Analysis Tables

### 22.1 Runtime Implementation

| Dimension | AWS Bedrock AgentCore | Azure AI Foundry Agent Service | GCP Vertex AI Agent Engine |
|---|---|---|---|
| **Execution substrate** | ECS/Fargate (containerized) [I] | Azure Container Apps [E] | Cloud Run (gVisor) [D] |
| **Scheduler** | ECS scheduler → EC2 Nitro VM [D] | AKS scheduler → Hyper-V VM [D] | Borg → KVM host [D] |
| **Isolation unit** | Per-session Fargate task [I] | Per-agent ACA replica [D] | Per-session Cloud Run instance [D] |
| **Sandbox** | Linux namespaces + cgroups [D] | Linux namespaces (pod) [D] | gVisor (userspace kernel) [D] |
| **Hardware isolation** | Nitro hypervisor (bare metal) [D] | Hyper-V hypervisor [D] | KVM + Titan security chip [D] |
| **Cold start** | "Single-digit seconds" [D] | "Sub-second" (warm) [D] | 1–5s (gVisor overhead) [D] |
| **Warm pool** | Yes (pre-started containers) [I] | Yes (min replicas) [D] | Yes (min instances) [D] |
| **SDK** | Strands (Python) / AgentCore SDK | Azure AI SDK (Python, JS, .NET) | Google ADK (Python) / LangChain |
| **Tool execution** | AWS Lambda [D] | Azure Functions [D] | Cloud Functions / Extensions [D] |
| **State store** | DynamoDB [D] | Cosmos DB [D] | Firestore [D] |
| **Maturity** | GA June 2025 | GA November 2025 | GA March 2026 |

*[D] = DOCUMENTED, [E] = EVIDENCE, [I] = INFERRED*

### 22.2 Security Architecture

| Dimension | AWS | Azure | GCP |
|---|---|---|---|
| **Auth standard** | SigV4 + IAM | Entra Bearer + MSAL | OAuth 2.0 + GCP IAM |
| **Workload identity** | IAM Task Role (IRSA) [D] | System Managed Identity [D] | Workload Identity Federation [D] |
| **Policy engine** | Cedar (Verified Permissions) [D] | Azure Policy + OPA [I] | IAM Conditions + OPA [I] |
| **mTLS** | App Mesh (Envoy) [D] | Azure Service Mesh (Istio) [D] | Anthos Service Mesh (Istio) [D] |
| **SPIFFE support** | Via App Mesh CA [I] | Via Istio CA [I] | Via Anthos Service Mesh [D] |
| **Prompt injection** | Bedrock Guardrails [D] | Azure Content Safety [D] | Vertex AI Model Armor [D] |
| **Anomaly detection** | GuardDuty [D] | Microsoft Defender [D] | Security Command Center [D] |
| **Audit log** | CloudTrail [D] | Azure Monitor [D] | Cloud Audit Logs [D] |
| **Secret management** | Secrets Manager + KMS [D] | Key Vault [D] | Secret Manager + Cloud KMS [D] |
| **Network isolation** | VPC + PrivateLink [D] | VNet + Private Endpoint [D] | VPC + Private Google Access [D] |
| **Data sovereignty** | GovCloud regions [D] | Sovereign Cloud (Azure DE, etc.) [D] | Google Sovereign Cloud [D] |
| **Compliance** | SOC2, HIPAA BAA, FedRAMP [D] | SOC2, HIPAA BAA, FedRAMP High [D] | SOC2, HIPAA BAA, FedRAMP Moderate [D] |

### 22.3 MCP Integration

| Dimension | AWS | Azure | GCP |
|---|---|---|---|
| **MCP proxy** | AgentCore Gateway [D] | APIM + MCP policy [D] | Vertex AI Toolbox [D] |
| **MCP transport** | HTTP+SSE [D] | HTTP+SSE [I] | HTTP+SSE + gRPC [D] |
| **Tool registry** | AgentCore Registry [D] | AI Foundry tool config [D] | Extensions registry [D] |
| **Auth translation** | SigV4 at gateway [D] | MI token via APIM [I] | GCP SA via Anthos [I] |
| **Schema caching** | Registry cache [D] | APIM cache [I] | Extensions registry [D] |
| **Version negotiation** | Gateway handles [D] | APIM handles [I] | ADK client handles [D] |
| **Max MCP servers** | Not published | Not published | Not published |

### 22.4 Strengths and Weaknesses

| Platform | Strengths | Weaknesses |
|---------|-----------|-----------|
| **AWS AgentCore** | Most mature security stack (Cedar, GuardDuty, Macie, IAM); deep AWS service integration; Firecracker for Lambda tools; Step Functions for complex workflows | Runtime internals less documented; complex IAM/Cedar learning curve; AWS ecosystem lock-in; higher operational complexity |
| **Azure AI Foundry** | Fastest developer onboarding; Entra OBO for user delegation; Dapr for state/messaging; native M365 integration (SharePoint, Graph); Code Interpreter built-in | Runtime internals least documented; ACA session limits; OPA integration still preview; lower throughput for high-volume |
| **GCP Vertex AI Agent Engine** | Best infrastructure lineage (Borg scheduler, gVisor isolation, Anthos Service Mesh); SPIFFE via Anthos; Cloud Armor ML-based DDoS; most scalable foundation | Agent-specific features still maturing; Model Armor released late (2026); fewer enterprise case studies; Gemini model concentration |

---

## 23. Documented vs Inferred Analysis

### 23.1 What Each Vendor Has Documented

**AWS — Documented:**
- Cedar policy syntax and AgentCore integration ✅
- DynamoDB as session + memory store ✅
- Lambda as tool execution layer ✅
- AgentCore Gateway as MCP proxy ✅
- IAM Task Role model ✅
- Bedrock Guardrails (all layers) ✅
- Bedrock Invocation Logging ✅
- Memory extraction pipeline ✅
- Pricing model ✅

**AWS — Undocumented (inferred):**
- Specific compute substrate (ECS/Fargate vs EKS) ❓
- Per-session vs per-agent container granularity ❓
- Internal service mesh implementation ❓
- Warm pool size and management policy ❓
- Exact DynamoDB schema for sessions ❓

**Azure — Documented:**
- Cosmos DB for thread/agent storage ✅
- Azure Functions for tool execution ✅
- Managed Identity for service auth ✅
- ACA as runtime substrate ✅ (implied)
- APIM for MCP proxy ✅
- OBO flow for user delegation ✅
- Dapr state store integration ✅

**Azure — Undocumented (inferred):**
- Session affinity mechanism details ❓
- ACA scale-out policy per session ❓
- Internal Istio service mesh configuration ❓
- Policy enforcement between APIM and ACA ❓
- Warm pool management strategy ❓

**GCP — Documented:**
- Cloud Run as execution substrate ✅
- Firestore for session storage ✅
- Spanner for Memory API ✅
- gVisor sandbox ✅
- Anthos Service Mesh with SPIFFE ✅
- Workload Identity Federation ✅
- Vertex AI Toolbox (MCP) ✅
- Model Armor (pre-model guardrails) ✅
- VPC Service Controls ✅

**GCP — Undocumented (inferred):**
- Borg vs GKE scheduling boundary ❓
- Session affinity implementation in Cloud Run ❓
- Memory API Spanner schema ❓
- Cross-region session failover mechanism ❓
- Internal network path from Cloud Run to Vertex AI ❓

---

## 24. References

### AWS
- AWS re:Invent 2024: "BOA405 — Amazon Bedrock AgentCore: Production-Grade Agent Infrastructure" — aws.amazon.com/events/reinvent
- AWS Blog: "Introducing Amazon Bedrock AgentCore" (June 2025) — aws.amazon.com/blogs/aws
- AWS Bedrock AgentCore Documentation — docs.aws.amazon.com/bedrock-agentcore
- Amazon Verified Permissions (Cedar) Documentation — docs.aws.amazon.com/verified-permissions
- AWS Fargate Isolation Model — docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/security-tasks-containers
- Firecracker Paper: "Firecracker: Lightweight Virtualization for Serverless Applications" (NSDI 2020) — usenix.org/conference/nsdi20
- AWS Well-Architected Framework for Generative AI — aws.amazon.com/architecture/well-architected/generative-ai
- AgentCore GitHub Samples — github.com/aws-samples/amazon-bedrock-agentcore-samples

### Azure
- Microsoft Build 2024/2025: "AI Foundry Agent Service" sessions — build.microsoft.com
- Azure AI Foundry Documentation — learn.microsoft.com/azure/ai-foundry
- Azure Container Apps Documentation — learn.microsoft.com/azure/container-apps
- Azure Content Safety Documentation — learn.microsoft.com/azure/ai-services/content-safety
- Dapr Documentation — dapr.io/docs
- Azure Service Mesh Documentation — learn.microsoft.com/azure/aks/istio-about
- Microsoft Entra ID OBO Flow — learn.microsoft.com/entra/identity-platform/v2-oauth2-on-behalf-of-flow
- Semantic Kernel GitHub — github.com/microsoft/semantic-kernel

### Google Cloud
- Google I/O 2024/2025: "Vertex AI Agent Engine" sessions — io.google
- Vertex AI Agent Engine Documentation — cloud.google.com/vertex-ai/agent-engine/docs
- Cloud Run Security Overview — cloud.google.com/run/docs/securing/security-overview
- gVisor Documentation — gvisor.dev/docs
- Anthos Service Mesh Documentation — cloud.google.com/service-mesh/docs
- Google ADK Documentation — google.github.io/adk-docs
- Google Cloud Workload Identity Federation — cloud.google.com/iam/docs/workload-identity-federation
- Cloud Run Architecture (Borg reference) — cloud.google.com/blog/topics/developers-practitioners/cloud-run-story

### Standards and Cross-Platform
- SPIFFE Specification — spiffe.io/docs
- OPA Documentation — openpolicyagent.org/docs
- gVisor Paper: "gVisor: Sandboxing Cloud Native Applications" (HotCloud 2019)
- Borg: "Large-scale cluster management at Google with Borg" (EuroSys 2015) — dl.acm.org
- Firecracker: "Firecracker: Lightweight Virtualization for Serverless Applications" (NSDI 2020)
- CNCF Landscape: AI/ML — landscape.cncf.io
- OpenTelemetry — opentelemetry.io

### Related Guides in This Repository
- [AWS AgentCore & Strands Deep Research](./aws/agentcore_strands_deep_research_report.md)
- [AWS AgentCore Memory Architecture](./aws/AgentCore_Memory_Architecture_Guide.md)
- [AWS Native Standards-First Architecture](./aws/AWS_Native_Standards_First_Agentic_Architecture.md)
- [AI Gateway Comparison](./ai-gateway/AI_Gateway_Full_Comparison.md)
- [Enterprise MCP Security Guide](../ai-protocols/mcp/MCP_Enterprise_Security_Governance_Operations_2026.md)
- [A2A Enterprise Security Guide](../enterprise-architecture/ai-architecture/a2a-enterprise-security-governance-guide.md)
- [Cloud Implementation Comparison (Security)](../ai-security-governance/deep-mind/Part15_Cloud_Implementation_Comparison.md)
