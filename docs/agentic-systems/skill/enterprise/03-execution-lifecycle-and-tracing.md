---
title: "Skill Execution Lifecycle & Tracing"
date_created: 2026-06-01
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
doc_type: multi-part-series
tags: ["agentic-systems", "skill", "enterprise", "research"]
covers_version: "as of mid-2026"
series_name: "Enterprise Agent Skills Research"
series_part: 3
series_total: 11
series_index: "agentic-systems/skill/enterprise/index"
---
# Part 3 — Skill Execution Lifecycle (+ Deliverable 2: End-to-End Flow)

## 3.1 The lifecycle, stage by stage

```
User Request
   │
   ▼
[1] Planning ─────────────── Agent decomposes the goal; decides if it needs
   │                          skill(s), tool(s), or can answer directly.
   ▼
[2] Skill Selection ────────  Agent matches task against loaded skill
   │                          metadata (name+description); loads full
   │                          SKILL.md (and referenced files) on match.
   ▼
[3] Tool Selection ─────────  Within the loaded skill's guidance, agent
   │                          picks the specific tool(s) the skill
   │                          recommends for this step.
   ▼
[4] Policy Check (PEP) ─────  Deterministic authorization check: does this
   │                          identity + skill + tool + data class combo
   │                          satisfy policy? (Cedar/OPA — see file 09)
   ▼
[5] Tool Invocation ────────  Call executes via MCP Gateway → MCP Server →
   │                          Backend API/System.
   ▼
[6] Result Validation ──────  Output checked against the tool's schema and,
   │                          if declared, the skill's output_contract.
   ▼
[7] Memory Update ──────────  Session state updated; episodic/procedural
   │                          memory written if the skill's memory_policy
   │                          allows it.
   ▼
[8] Response Generation ────  Agent synthesizes user-facing output,
   │                          respecting the skill's declared output format.
   ▼
[9] Trace Collection ───────  Every span above (skill-selected, tool-called,
   │                          policy-decision, result) emitted via OTel
   │                          GenAI conventions to the observability plane.
   ▼
[10] Evaluation ─────────────  Online (production sampling + LLM-judge) and
   │                          offline (golden dataset regression) scoring.
   ▼
[11] Learning ────────────────  Findings feed: (a) skill/prompt refinement
                               recommendations, (b) episodic memory, (c)
                               registry quality scores that influence future
                               discovery ranking (file 06).
```

This mirrors, at an architectural level, what AWS AgentCore's harness loop does explicitly (reasoning → tool selection → action execution → response streaming, with a continuous "agent performance loop" that analyzes production traces to recommend prompt/tool-description improvements) and what Salesforce's Atlas Reasoning Engine documents as its topic-selection → action-selection → grounding-check flow.

## 3.2 Detailed sequence diagram — single-skill, single-tool happy path

```
User        Agent Runtime      Skill Registry     Policy (PEP)     MCP Gateway     Backend      Observability
 │                │                   │                 │               │              │               │
 │ request        │                   │                 │               │              │               │
 │───────────────►│                   │                 │               │              │               │
 │                │ match description │                 │               │              │               │
 │                │──────────────────►│                 │               │              │               │
 │                │◄──────────────────│ SKILL.md         │               │              │               │
 │                │  (load full skill)│                 │               │              │               │
 │                │                   │                 │               │              │               │
 │                │  emit span: skill_selected ─────────────────────────────────────────────────────────►│
 │                │                   │                 │               │              │               │
 │                │ choose tool per skill instructions                  │              │               │
 │                │  emit span: tool_selected (reason) ─────────────────────────────────────────────────►│
 │                │                   │                 │               │              │               │
 │                │ authorize(identity, skill, tool, args)              │              │               │
 │                │──────────────────────────────────────►│               │              │               │
 │                │◄──────────────────────────────────────│ allow/deny    │              │               │
 │                │  emit span: guardrail_event (decision) ─────────────────────────────────────────────►│
 │                │                   │                 │               │              │               │
 │                │ invoke tool(args) │                 │               │              │               │
 │                │─────────────────────────────────────────────────────►│              │               │
 │                │                   │                 │               │ call API     │               │
 │                │                   │                 │               │─────────────►│               │
 │                │                   │                 │               │◄─────────────│               │
 │                │◄─────────────────────────────────────────────────────│ result        │               │
 │                │  emit span: tool_result (latency, tokens, cost) ────────────────────────────────────►│
 │                │                   │                 │               │              │               │
 │                │ validate result against output_contract              │              │               │
 │                │ update memory (per memory_policy)                    │              │               │
 │                │ synthesize response                                  │              │               │
 │◄───────────────│                   │                 │               │              │               │
 │                │  emit span: final_response, session_summary ────────────────────────────────────────►│
 │                │                   │                 │               │  eval sample │               │
 │                │                   │                 │               │◄─────────────────────────────│
```

## 3.3 Deliverable 2 — end-to-end flow, expanded with failure and multi-step paths

Real production traffic is rarely single-skill/single-tool. The full flow must account for:

**A. Skill-selection ambiguity (two skills both plausible)**
The planner should prefer the *more specific* skill (narrower description match) and, where confidence is low, either (a) ask a clarifying question, or (b) load both skills' metadata-only summaries and let the model disambiguate before committing to a full load — this is exactly why skill descriptions must be precise and mutually distinguishing (file `01`, §1.5).

**B. Tool failure / retry**
```
[5] Tool Invocation → error
        │
        ▼
   retry_policy check (from tool or skill metadata)
        │
   ┌────┴────┐
   │ retries  │ exhausted → escalate: return partial result +
   │ remain   │             guardrail_event(failure) + human handoff
   └────┬────┘
        │ backoff, re-invoke
        ▼
   [5] Tool Invocation (attempt N+1)
```

**C. Skill-to-skill delegation (composite skill)**
```
[2] Skill Selection: "process-refund" skill loaded
        │
        ▼
   Skill instructs: "first apply the eligibility sub-skill"
        │
        ▼
[2'] Skill Selection: "refund-eligibility-check" skill loaded (nested)
        │
        ▼
   returns eligibility=true/false → resumes parent skill's procedure
```
(Full treatment of nested/hierarchical/planner/supervisor skill patterns in file `07`.)

**D. Cross-agent delegation (A2A)**
```
[3] Tool Selection step determines the needed capability is owned by
    a peer agent, not a local tool
        │
        ▼
   Agent Card discovery (/.well-known/agent-card.json) → capability match
        │
        ▼
   A2A Task submitted → remote agent's own [1]-[11] lifecycle runs
        │
        ▼
   A2A Artifact returned → treated like a tool result in the parent's
   Result Validation step
```

**E. Human-in-the-loop pause**
Triggered when `human_approval.required_for` conditions are met (file `02`) — the lifecycle suspends between steps [4] and [5], persists state (AWS AgentCore's filesystem persistence and Azure's session-isolated runtime both exist specifically to make this pattern practical without custom plumbing), and resumes on approval.

## 3.4 Trace hierarchy (ties to Part 10, expanded in file `08`)

```
Session Trace
 └── Agent Trace (one user turn)
      └── Skill Trace (skill_selected → skill_completed)
           └── Tool Trace (tool_selected → tool_result)
                └── MCP Trace (mcp request/response framing)
                     └── API Trace (backend call, if instrumented)
```

Each level should propagate a common `trace_id`/`session_id` per W3C Trace Context so that a single production incident can be reconstructed top-to-bottom — this is the explicit design goal behind both the AAIF's push for OTel-based agent tracing and OpenTelemetry's own GenAI observability walkthroughs, which show the `invoke_agent` span as the parent of child `chat` (LLM call) and `execute_tool` spans.
