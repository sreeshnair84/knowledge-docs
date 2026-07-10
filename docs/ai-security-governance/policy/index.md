---
title: "Policy & Authorization"
date_created: 2026-07-05
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ai-security-governance", "policy"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# Policy & Authorization for Agentic AI

> **Current as of July 2026.** Policy-as-code and authorization patterns for AI agent deployments — moving from human-readable documents to machine-evaluated rules enforced at runtime.

---

## The Core Problem

Traditional access control assumes humans or deterministic applications make requests. Agents are neither — they reason probabilistically, act autonomously, and can be manipulated into requesting things their owners never intended. Authorization must shift from "authenticate then trust" to **continuous, per-request policy evaluation**.

---

## Policy-as-Code Fundamentals

The two leading engines for AI agent policy are **Open Policy Agent (OPA)** and **Cedar** (AWS):

| | OPA (Rego) | Cedar (AWS Verified Permissions) |
|---|---|---|
| **Language** | Rego (Datalog-inspired) | Cedar (purpose-built) |
| **Evaluation** | Open-source, any runtime | Managed via AWS |
| **Best for** | Kubernetes/service mesh, custom infra | AWS-native agent workloads, Bedrock AgentCore |
| **Agent support** | Policy Gateway pattern | Native integration with Bedrock AgentCore |

### Deny-by-Default Pattern

```rego
# opa/agent_access.rego
package agents.access

default allow = false   # nothing permitted unless explicitly allowed

allow if {
    input.agent.cleared_tiers[_] == input.resource.classification
    input.action in allowed_actions_for_tier[input.resource.classification]
}

allowed_actions_for_tier := {
    "PUBLIC":       {"read", "search"},
    "INTERNAL":     {"read", "search", "write_internal"},
    "CONFIDENTIAL": {"read"},
}
```

### Human-Oversight Policy

```rego
require_human_approval if {
    input.action in {"transfer_funds", "delete_records", "send_email", "grant_access"}
}

require_human_approval if {
    input.action == "write_external"
    input.estimated_impact_score > 7   # on a 1-10 scale set at design time
}
```

---

## Authorization Patterns for AI Agents

### Pattern 1: Policy Gateway

Every agent tool call passes through a central policy evaluation endpoint before execution:

```
Agent → Tool Call Request → Policy Gateway (OPA/Cedar) → Allow/Deny/Notify → Tool
                                      ↑
                         Policies loaded from Git (CI/CD updated)
```

**Pros:** single enforcement point, easy audit, policies updated without agent redeployment.
**Cons:** latency (mitigate with local sidecar OPA), single point of failure (mitigate with HA).

### Pattern 2: Sidecar Policy

OPA runs as a sidecar in the same pod as the agent; policy is loaded locally. Eliminates network hop:

```
Agent Container | OPA Sidecar
     │           │
     └──────────►│ allow? (in-process, ~1ms)
                 │
              Policy bundle (pulled from bundle server, refreshed every 60s)
```

### Pattern 3: Attribute-Based Access Control (ABAC) for Agents

Rather than per-agent rules, define rules over attributes:

```cedar
// Any agent that is cleared for CONFIDENTIAL data AND
// was authorized by a human in the finance department
// may read credit-assessment resources
permit(
    principal is Agent,
    action == Action::"read",
    resource is CreditAssessment
) when {
    principal.data_clearance == "CONFIDENTIAL" &&
    context.authorizing_human.department == "finance"
};
```

---

## Authorization in the MCP / A2A Stack

MCP's 2026-07-28 stateless spec RC mandates **OAuth 2.1** with:
- RFC 9207 issuer validation (prevents token-redirect attacks)
- PKCE (Proof Key for Code Exchange) required for all flows
- Resource indicators (RFC 8707) so tokens are scoped to specific MCP servers

For A2A, authorization is declared in the **Agent Card** (the `authentication` block) and evaluated per-task delegation. Each A2A hop should issue a scoped credential — sub-agents cannot exceed parent agent permissions.

---

## PDF Resources in This Section

<details>
<summary>AI Security Series — see parent section for full catalog</summary>
<p>Policy and authorization content is covered across the <a href="../security/">AI Security PDF series</a>, particularly volumes on identity, MCP/A2A security, and the operating model maturity roadmap.</p>
</details>

---

## Related Guides

- [Agentic AI Security & Identity](../../enterprise-architecture/ai-architecture/agentic-ai-security-identity.md) — SPIFFE/AIMS, bounded autonomy, delegation chains
- [Machine-Readable EA](../../enterprise-architecture/ai-architecture/machine-readable-ea.md) — policy-as-code as an EA standard; OPA/Cedar for enterprise-wide agent governance
- [Agent Interoperability & Orchestration](../../enterprise-architecture/ai-architecture/agent-interoperability-orchestration.md) — MCP OAuth 2.1, A2A Agent Card auth

