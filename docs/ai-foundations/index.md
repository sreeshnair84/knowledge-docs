---
title: "Agentic AI Basics"
date_created: 2026-07-05
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["ai-foundations"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# Agentic AI Basics

Foundational concepts, landing zone architecture, and visual deep dives into transformer models — the building blocks for understanding agentic AI systems.

---

## The Agentic AI Primer

An **AI agent** is a system that perceives its environment, reasons over it, and takes actions to achieve a goal — autonomously, over multiple steps, using tools.

### The Agent Loop

```
 ┌────────────────────────────────────────────────────────────┐
 │                       AGENT LOOP                           │
 │                                                            │
 │  Perceive ──► Reason ──► Plan ──► Act ──► Observe          │
 │     ▲                                        │             │
 │     └────────────── feedback ─────────────────┘            │
 └────────────────────────────────────────────────────────────┘
```

Each iteration the agent:

1. **Perceives** — reads its context window (system prompt + conversation + tool results + memory)
2. **Reasons** — generates a chain of thought to decide what to do next
3. **Plans** — selects the next action (tool call, sub-agent delegation, or final answer)
4. **Acts** — executes the action via a tool call or message
5. **Observes** — receives the tool result and updates its context

### The Four Building Blocks

| Building block | What it does | Example |
| --- | --- | --- |
| **LLM backbone** | Provides reasoning, language understanding, and planning | Claude Fable 5, Sonnet 5 |
| **Tools** | Connect the agent to systems outside the model | MCP servers, APIs, databases |
| **Memory** | Persist information across turns and sessions | Vector DB, key-value store, context window |
| **Orchestration** | Manage multi-step tasks, sub-agents, and control flow | LangGraph, CrewAI, Microsoft Agent Framework |

### Memory Taxonomy

| Type | Scope | Implementation | Use case |
| --- | --- | --- | --- |
| **In-context** | Current conversation | Context window | Short-term task state |
| **External / episodic** | Session or long-term | Vector DB, database | Past interactions, user preferences |
| **Semantic** | Persistent knowledge | Knowledge graph, RAG | Facts, domain knowledge |
| **Procedural** | How to do things | System prompt, fine-tuning | Agent behavior, tool usage patterns |

### Tool Use via MCP

MCP (Model Context Protocol) is the standard interface for connecting agents to tools. A tool is any function the agent can call — from querying a database to sending an email to running code.

```
Agent context window:
  "I need to find the customer's recent orders"
        │
        ▼
Tool call: crm_mcp_server.get_orders({customer_id: "C123", limit: 5})
        │
        ▼
Result: [{order_id: "O456", date: "2026-06-15", status: "shipped"}, ...]
        │
        ▼
Agent incorporates result and continues reasoning
```

Each tool is declared with a typed interface (JSON Schema). The agent never executes arbitrary code — it can only call tools explicitly given to it.

---

## Markdown Guides

- [Agentic AI Landing Zone Architecture](agentic_ai_landing_zone_architecture.md) — Enterprise landing zone design for agentic AI systems
