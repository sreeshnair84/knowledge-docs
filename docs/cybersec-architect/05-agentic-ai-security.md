---
title: "Part 5 — Agentic AI Security"
date_created: 2026-07-09
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cybersec-architect"]
---

# Part 5 — Agentic AI Security

**Audience:** AI security engineers, platform architects, and enterprise architects responsible for securing autonomous AI agent systems.

**Related:**
[Overview](index.md) |
[AI Security](04-ai-security.md) |
[Identity Architecture](06-identity-architecture.md) |
[Security Patterns](13-security-patterns.md) |
[Agentic AI Security & Identity](../coding-tools/enterprise-ai-architect/agentic-ai-security-identity.md)

> **Current as of July 2026.** Agentic AI introduces autonomous behaviour, tool invocation, multi-agent coordination, and persistent memory — each of which requires security controls beyond what traditional or even standard AI security provides.

---

## 1. What Makes Agentic Security Different

Traditional security controls assume a **human in the loop** — a person initiates requests, reviews outputs, and takes actions. Agentic AI breaks this assumption:

| Assumption | Traditional System | Agentic System |
|---|---|---|
| Who initiates actions? | Human | Agent (autonomously) |
| Who reviews outputs? | Human | Downstream agent or automated system |
| How long does a session last? | Minutes | Hours, days, or indefinitely |
| What can the subject do? | Bounded by UI | Bounded by tool access (potentially very broad) |
| Who is accountable? | Identified human | Agent identity (often opaque) |
| What is the blast radius? | Limited to user actions | Potentially enterprise-wide if agent has broad permissions |

This shift requires **new security primitives** that do not exist in traditional security frameworks.

---

## 2. AI Agents — Architecture Overview

### 2.1 Agent Components

```
┌─────────────────────────────────────────────────────────┐
│                    AI Agent                             │
│                                                         │
│  ┌───────────┐  ┌──────────┐  ┌────────────────────┐   │
│  │  Planner  │  │ Executor │  │  Memory (S/L-term) │   │
│  │  (LLM)   │  │  (LLM)   │  │  + Knowledge       │   │
│  └───────────┘  └──────────┘  └────────────────────┘   │
│         ↓               ↓                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │               Tool Integrations                  │   │
│  │  (MCP Servers / APIs / Databases / Code Exec)   │   │
│  └─────────────────────────────────────────────────┘   │
│                         ↓                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │         External Environment                     │   │
│  │  (Web, Email, Files, Enterprise Systems)         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

Each component is an attack surface. Security must be embedded at every layer.

### 2.2 Multi-Agent Systems

Enterprise agents rarely operate in isolation. A typical enterprise multi-agent architecture:

```
Orchestrator Agent
├─ Research Agent → Web search, document retrieval
├─ Analysis Agent → Data processing, reasoning
├─ Execution Agent → System actions, API calls
└─ Verification Agent → Output validation, compliance check
```

**Security challenge:** In a multi-agent system, compromise of any one agent can affect the entire chain. Trust must be established **between agents** — not assumed because they share a platform.

### 2.3 Agent Platforms (2026)

| Platform | Provider | Key Security Features |
|---|---|---|
| **AWS Bedrock Agents** | Amazon | IAM role-based agent identity, VPC isolation, Guardrails |
| **Azure AI Foundry Agents** | Microsoft | Entra Agent ID, managed identity, private networking |
| **Google Vertex AI Agents** | Google | Workload identity federation, VPC Service Controls |
| **Anthropic Claude Agent SDK** | Anthropic | Harness-based controls, tool permission scoping |
| **LangGraph** | LangChain | Custom; requires additional security controls |
| **AutoGen** | Microsoft Research | Custom; requires additional security controls |
| **CrewAI** | Open source | Custom; requires additional security controls |

---

## 3. Agent Identity

### 3.1 Why Agent Identity is Hard

1. Agents are software, not humans — they cannot use human authentication flows (MFA, biometrics)
2. Agents may be ephemeral (created on demand, destroyed after task completion)
3. An enterprise may run thousands of agent instances simultaneously
4. Agents may delegate to sub-agents — requiring delegation chains
5. Agents operate across multi-cloud environments — requiring cross-domain identity

### 3.2 Agent Identity Standards (2026)

| Standard | Body | Maturity | Description |
|---|---|---|---|
| **IETF AIMS** (AI Model Statement) | IETF | Draft RFC | Framework for AI system identity claims |
| **SPIFFE/SPIRE** | CNCF | Stable | Workload identity via X.509 SVIDs — applicable to agent workloads |
| **Entra Agent ID** | Microsoft | GA (2026) | Microsoft's agent identity in Azure ecosystem |
| **AWS AgentCore Identity** | Amazon | GA (2026) | AWS agent identity with IAM role binding |
| **OAuth 2.0 for Agents** | IETF | Draft | Extension of OAuth for non-human principals |

### 3.3 Agent Authentication Patterns

**Pattern 1 — Managed Identity (Cloud-native):**
```
Agent workload (running in cloud)
        ↓ (IMDS call — no secret required)
Cloud IAM service issues short-lived token
        ↓
Agent uses token to access cloud resources
```

**Pattern 2 — SPIFFE SVID:**
```
SPIRE server attests agent workload (via k8s annotations or hardware attestation)
        ↓ issues
X.509 SVID (short-lived certificate, renewed automatically)
        ↓ presented to
mTLS-secured endpoints (MCP servers, APIs, databases)
```

**Pattern 3 — OAuth Client Credentials:**
```
Agent registered as OAuth client with client_id + client_secret (in Vault)
        ↓ requests
Access token from OAuth server
        ↓ (short-lived, scoped)
Agent uses token for API calls
```

**Recommended for enterprise:** Pattern 1 (managed identity) for cloud-native deployments; Pattern 2 (SPIFFE) for multi-cloud and on-prem; Pattern 3 only as fallback.

### 3.4 Agent Authorization

Authorization for agents must be **more restrictive** than for humans:

| Principle | Human User | Agent |
|---|---|---|
| Scope | Role-based broad access | Task-specific, per-session scoping |
| Duration | Session-lifetime tokens | Per-task short-lived tokens (minutes) |
| Delegation | Manager-to-employee delegation | Explicit, audited delegation chains |
| Irreversible actions | Allowed if authorized | Require human approval gate |
| Token introspection | Standard | Agent ID must be verifiable by resource server |

### 3.5 Delegation and On-Behalf-Of (OBO)

When a human delegates a task to an agent, the agent must carry the human's authorization context — but with reduced scope.

**OAuth 2.0 OBO flow:**
```
Human authenticates (gets user token)
        ↓
Human delegates task to agent
        ↓
Agent exchanges user token for agent token (OBO grant)
        ↓ (agent token has user's identity context BUT limited scope)
Agent calls downstream services with agent token
        ↓ (services can verify: this is agent X acting on behalf of user Y for task Z)
```

**Microsoft Entra implementation:** Entra Agent ID supports OBO delegation with explicit scope limitation — agents cannot acquire more permissions than the delegating user has.

---

## 4. Agent Communication

### 4.1 MCP (Model Context Protocol)

MCP is the primary tool integration protocol for AI agents.

**MCP security architecture:**

```
Agent (MCP Client)
        ↓ (OAuth 2.1 + PKCE or mTLS)
MCP Server (Tool Provider)
        ↓ (server-side credential, not passed to agent)
Backend Resource (Database, API, File System)
```

**Critical security property:** The agent **never receives** the backend resource credentials. The MCP server holds credentials and acts as an authorized proxy.

**MCP security controls:**
- **Server authentication**: Agent must authenticate to each MCP server before invoking tools
- **Tool-level authorization**: Not all tools are available to all agents — per-tool ACLs
- **Input validation**: MCP server validates tool parameters before executing
- **Output sanitization**: MCP server sanitizes responses before returning to agent
- **Audit logging**: Every tool invocation logged with agent ID, parameters, result, and timestamp
- **Rate limiting**: Per-agent, per-tool rate limits

### 4.2 A2A (Agent-to-Agent Protocol)

A2A is the emerging standard for inter-agent communication.

**A2A trust model:**
```
Agent A (Sender)
        ↓ (signed message with A's identity)
A2A Protocol Layer (routing + attestation)
        ↓ (verified sender identity)
Agent B (Receiver)
        ↓ (processes message with sender context)
```

**A2A security controls:**
- Message signing: each inter-agent message signed with sender's private key
- Attestation: receiver verifies sender's identity before processing
- Scope enforcement: messages can only trigger actions within the receiver's defined capability
- Audit trail: all A2A messages logged for forensics

### 4.3 AG-UI (Agent-User Interface Protocol)

AG-UI governs how agents present interfaces to human users — important for security because it determines what users can approve, reject, or redirect.

**Security-relevant AG-UI elements:**
- **Approval dialogs**: Presented before irreversible agent actions
- **Progress visibility**: Users can see what the agent is doing in real time
- **Interruption controls**: User can pause or cancel agent tasks
- **Action audit**: Visual display of actions taken by the agent

---

## 5. Agent Runtime Security

### 5.1 Agent Isolation

Agents that can execute code, browse the web, or access files must be isolated to prevent escape and cross-contamination.

| Isolation Technology | Provider | Isolation Level | Overhead |
|---|---|---|---|
| **MicroVM** (Firecracker) | AWS | Near-VM isolation, millisecond boot | Low |
| **gVisor** | Google | Kernel syscall interception | Low-Medium |
| **Docker container** | OCI | Namespace isolation only | Very low |
| **Full VM** (EC2, Azure VM) | Cloud providers | Full isolation | High |
| **Kata Containers** | CNCF | VM-level isolation in container runtime | Medium |

**Recommendation:** Use MicroVM (Firecracker) or Kata Containers for agents that execute untrusted code (e.g., code generation agents). Standard containers are insufficient if the agent can execute arbitrary code.

### 5.2 Agent Sandboxing

Sandboxing limits what an agent can do **within** its execution environment:

- **Network egress control**: Allowlist of permitted outbound destinations; deny all others
- **Filesystem access**: Read-only except for designated scratch space
- **System call filtering**: Seccomp profile blocking dangerous syscalls (exec, ptrace, socket)
- **Resource limits**: CPU, memory, and time limits prevent abuse
- **No credential access**: Secrets are provided via managed identity or injected at request time, not stored in sandbox

### 5.3 Agent Governance

Governance controls define what agents are permitted to do at a policy level:

| Governance Control | Description | Implementation |
|---|---|---|
| **Agent registry** | Central inventory of all deployed agents | CMDB entry per agent with owner, capability, and approval |
| **Capability approval** | Each new capability requires explicit approval | ARB or AI governance committee review |
| **Human-in-the-loop gates** | Approval required before high-impact actions | Workflow integration (email, Slack, ticketing) |
| **Kill switches** | Ability to halt all agent operations immediately | Centralized feature flag or circuit breaker |
| **Circuit breakers** | Automatic halt on anomalous behaviour | Rate limit breach, error rate spike, cost threshold |
| **Policy enforcement** | Policy-as-code evaluated before every action | OPA, Cedar, or custom policy engine |
| **Audit logging** | Complete record of all agent actions | Centralized logging with immutable storage |

---

## 6. Human Oversight Models

Not all agent actions warrant the same level of oversight. A tiered model:

| Tier | Oversight Model | Trigger Condition | Implementation |
|---|---|---|---|
| 0 | **Autonomous** | Low-risk, reversible, frequently repeated actions | Agent acts without human input |
| 1 | **Human-in-the-Loop (HITL)** | Moderate-risk or first-time actions | Agent pauses, human approves, agent continues |
| 2 | **Human-on-the-Loop (HOTL)** | Actions in progress, human monitors | Agent acts, human can interrupt |
| 3 | **Human-over-the-Loop (HOOL)** | High-risk, irreversible, strategic decisions | Human decides, agent executes |

**Implementation pattern:**

```
Agent plans action
        ↓
Risk classifier evaluates action
        ↓
Risk level: LOW → execute automatically
Risk level: MEDIUM → notify human, proceed after timeout unless rejected
Risk level: HIGH → block, require explicit human approval
Risk level: CRITICAL → block, require senior approval + audit trail
```

---

## 7. Kill Switches and Circuit Breakers

### 7.1 Kill Switches

A kill switch is an emergency control that immediately halts all agent operations.

**Kill switch hierarchy:**
```
Global kill switch (stops all agents org-wide)
    ↓
Platform kill switch (stops all agents on a specific platform)
    ↓
Agent class kill switch (stops all agents of a specific type)
    ↓
Individual agent kill switch (stops a single agent instance)
```

**Implementation requirements:**
- Kill switch must be reachable even when agent infrastructure is compromised
- Kill switch action must be logged with reason, who triggered it, and timestamp
- Kill switch should gracefully complete in-flight safe operations before halting
- Kill switch must be tested quarterly

### 7.2 Circuit Breakers

Circuit breakers automatically stop agent operations when predefined thresholds are exceeded:

| Trigger | Threshold Example | Response |
|---|---|---|
| Cost overrun | > $1,000 in 1 hour | Halt, alert, require manual re-enable |
| Error rate | > 20% tool failures in 10 minutes | Halt, alert, root cause investigation |
| Anomalous output | Content classifier flags > 5 outputs/hour | Halt, human review |
| Rate limit breach | > 1,000 API calls/minute | Throttle, alert |
| Unexpected network egress | Traffic to non-allowlisted endpoint | Block, alert, forensic capture |
| Memory usage | > 10,000 facts written in 1 hour | Halt, memory integrity check |

---

## 8. Autonomous Risk

The ultimate governance question for agentic AI: **What is the maximum autonomous risk the organisation is willing to accept?**

This is a board-level decision that should be documented as a risk appetite statement:

> *"Our organisation accepts autonomous agent actions up to [dollar value / scope] without human approval. Actions exceeding this threshold require [approval tier]. Actions in [domain categories] are never autonomous, regardless of value."*

**Framework for defining autonomous risk:**

1. **Impact magnitude**: What is the maximum blast radius of an undetected mistake?
2. **Reversibility**: Can the action be undone if it is found to be wrong?
3. **Domain sensitivity**: Does the action touch regulated data, financial transactions, or legal commitments?
4. **Novelty**: Is this a new type of action or one the agent has performed many times before?
5. **External exposure**: Does the action affect parties outside the organisation?

Combine these factors into a risk score, and map score ranges to oversight tiers (0–3 above).
