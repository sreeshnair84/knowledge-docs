---
title: "Multi-Agent Orchestration — claude-flow & Beyond"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["coding-tools", "claude"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# Multi-Agent Orchestration — claude-flow & Beyond

**What is claude-flow?** claude-flow is an open-source multi-agent orchestration framework built by rUv, hosted at [github.com/ruvnet/claude-flow](https://github.com/ruvnet/claude-flow). It coordinates swarms of specialised AI agents connected by shared memory, structured workflows, and the SPARC methodology. The community sometimes refers to it as **Ruflo** — this guide uses both names interchangeably.

**What this guide covers:** Installation, core architecture, multi-agent patterns with working code, evaluation harness, stress testing, parallelism, token and cost optimisation, guardrails, governance, and CI/CD integration.

**What it does NOT duplicate:**
- MCP protocol fundamentals → [MCP Deep Guide](mcp-deep-guide.md)
- Claude model pricing → [Models 2026](claude-models-2026.md)
- Agent SDK patterns → [Agent SDK Production](claude-agent-sdk-production.md)
- EA-level governance → [Governance & Compliance](../../enterprise-architecture/ai-architecture/enterprise-ai-governance-compliance.md)

---

## 1. Overview

### The Problem claude-flow Solves

A single AI agent is bounded by three constraints: a finite context window, sequential reasoning, and no ability to parallelise work across independent subtasks. Complex tasks — large codebase refactors, multi-phase research pipelines, document processing at scale — require more than a single agent can deliver.

claude-flow coordinates multiple specialised agents into a structured swarm. A Queen agent decomposes the goal and assigns workstreams; Worker agents execute in parallel; shared memory ensures agents build on each other's work rather than repeating it. The framework ships with the SPARC methodology (Specification, Pseudocode, Architecture, Refinement, Completion) which turns agentic coding into a disciplined, phase-gated pipeline.

### Scope and Approach

claude-flow is a Node.js/TypeScript project installable via npm, with Python bindings for interoperability with Python-native data and ML tooling. It integrates with Claude via the Anthropic API and supports MCP server connections for tool access.

**What to expect:** claude-flow is an active open-source project — the feature surface evolves quickly. Verify capabilities against the [GitHub repo](https://github.com/ruvnet/claude-flow) before designing production systems.

---

## 2. Installation

### Prerequisites

- Node.js 18+ (LTS recommended)
- An Anthropic API key (`ANTHROPIC_API_KEY`)
- Optional: Python 3.10+ for Python bindings

### npm Installation

```bash
# Install globally
npm install -g claude-flow

# Or run without installing
npx claude-flow@latest --help

# Verify installation
claude-flow --version
```

### Project Initialisation

```bash
# Minimal init (SPARC methodology only — no MCP server)
npx claude-flow@latest init --sparc

# Full init (MCP server + SPARC + hooks)
npx claude-flow@latest init --sparc --mcp

# Set your API key
export ANTHROPIC_API_KEY="your-api-key-here"

# Verify the MCP server is registered (full init only)
npx claude-flow status
```

### Python Bindings

```bash
pip install claude-flow-py   # community Python bindings

# Or call the CLI from Python
import subprocess
result = subprocess.run(
    ["npx", "claude-flow", "swarm", "run", "--task", "summarise this report"],
    capture_output=True, text=True
)
```

:::note npm package name
    The canonical package is `claude-flow` on npm. The community brand "Ruflo" may appear in community tooling and documentation but refers to the same codebase. Always install from `github.com/ruvnet/claude-flow` or the `claude-flow` npm package.

---

## 3. Core Architecture

### The Hive-Mind Pattern

claude-flow implements a **hive-mind** orchestration model: a Queen agent that decomposes goals and delegates to specialised Worker agents, coordinated by a shared SQLite-backed memory store.

```
┌─────────────────────────────────────────────────────┐
│                    QUEEN AGENT                      │
│   Goal decomposition · Task routing · Synthesis     │
└──────────────────┬──────────────────────────────────┘
                   │  Hierarchical delegation
       ┌───────────┼───────────┐
       ▼           ▼           ▼
  [Coder]      [Tester]   [Reviewer]    ← Specialised worker agents
  Worker        Worker      Worker
       │           │           │
       └───────────┼───────────┘
                   ▼
        ┌──────────────────────┐
        │   Shared Memory      │
        │  (SQLite + vectors)  │
        │  SPARC state store   │
        │  Pattern library     │
        └──────────────────────┘
```

**Core components:**

- **Queen agent** — receives the top-level goal, breaks it into parallel or sequential workstreams, assigns each to the most appropriate Worker type, and synthesises results into a coherent output
- **Worker agents** — each has a single responsibility (coding, testing, reviewing, research) and limited tool access; stateless between invocations but can read/write shared memory
- **Memory store** — SQLite database with vector-indexed content for semantic retrieval; agents store patterns, decisions, and outputs; later agents retrieve what earlier agents produced
- **SPARC pipeline** — five-phase workflow (Specification → Pseudocode → Architecture → Refinement → Completion) enforced as a gate sequence; each phase feeds the next

### Supported Topologies

| Topology | When to use |
|----------|-------------|
| `hierarchical` | Complex tasks with clear decomposition; Queen has full authority |
| `mesh` | Collaborative tasks where agents need to share findings peer-to-peer |
| `ring` | Pipeline tasks where each agent hands off to the next |
| `star` | Hub-and-spoke: one coordinator routes to many specialists in parallel |

---

## 4. Quick Start

A working 20-line example that spawns a two-agent swarm:

```javascript
// quick-start.js
const \{ ClaudeFlow } = require('claude-flow');

async function main() \{
  const flow = new ClaudeFlow(\{
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: 'claude-sonnet-4-6',
  });

  // Define the swarm
  const swarm = await flow.createSwarm(\{
    topology: 'hierarchical',
    agents: ['coder', 'reviewer'],
  });

  // Run a task
  const result = await swarm.run(\{
    task: 'Write a Python function that validates email addresses with unit tests',
    memoryPersist: true,
  });

  console.log(result.output);
  console.log(`Tokens used: $\{result.usage.totalTokens}`);
}

main().catch(console.error);
```

```bash
node quick-start.js
```

---

## 5. Framework Comparison

| Framework | Language | Orchestration model | Memory | Tool integration | Cloud hosting | Best for |
|-----------|----------|---------------------|--------|-----------------|---------------|----------|
| **claude-flow** | TypeScript / Node.js | Hive-mind (Queen + Workers), SPARC pipeline | SQLite + vector index | MCP servers, bash, file system | Self-hosted | AI-native software development, multi-phase coding tasks |
| **LangGraph** | Python | Directed acyclic graph (nodes + edges) | Built-in checkpointing, time-travel | LangChain tool ecosystem | LangSmith Cloud | Production stateful workflows, highest control and auditability |
| **CrewAI** | Python | Role-based crew (sequential or hierarchical) | Task output passing | CrewAI tools, custom tools | CrewAI Enterprise | Business process automation, fastest prototype to first result |
| **AutoGen / AG2** | Python | Conversational GroupChat, speaker selection | Conversation history (in-memory or custom) | Function calling, custom executors | Azure AutoGen | Research tasks, iterative dialogue, debate-style reasoning |
| **Google ADK** | Python | Hierarchical agent tree | Session state, Vertex pluggable backends | Google Cloud tools, MCP | Google Vertex AI | Google Cloud / Vertex AI workloads, A2A interoperability |
| **OpenAI Agents SDK** | Python | Explicit handoffs, triage agent pattern | Context variables (ephemeral) | OpenAI built-in tools | OpenAI platform | OpenAI-native deployments, rapid prototyping on OpenAI stack |

:::note Choosing a framework
    Framework selection should be driven by your primary cloud platform, team language preference, and the nature of the task (is it a pipeline or a conversation?). Avoid mixing multiple orchestration frameworks in a single workflow — the coordination complexity is not worth it. Standardise on one primary framework and extend it.

---

## 6. Multi-Agent Patterns

### 6.1 Hierarchical Orchestration (Queen Spawns Workers)

The Queen receives the goal, decomposes it, spawns workers in parallel, waits for results, and synthesises.

```javascript
// hierarchical-orchestration.js
const \{ ClaudeFlow, Agent } = require('claude-flow');

const flow = new ClaudeFlow(\{
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-6',
});

async function buildFeature(featureDescription) \{
  // Define specialised agents
  const queen = new Agent(\{
    role: 'orchestrator',
    instructions: `You are the Queen agent. Decompose the given feature into:
    1. A specification document
    2. Implementation tasks
    3. Test cases
    Assign each to the appropriate worker agent.`,
    tools: ['spawn_agent', 'memory_write', 'memory_read'],
  });

  const coder = new Agent(\{
    role: 'coder',
    instructions: 'Implement the feature to the specification. Write clean, documented code.',
    tools: ['file_write', 'file_read', 'memory_read', 'bash'],
  });

  const tester = new Agent(\{
    role: 'tester',
    instructions: 'Write comprehensive unit tests. Aim for >90% coverage.',
    tools: ['file_write', 'file_read', 'bash', 'memory_read'],
  });

  const reviewer = new Agent(\{
    role: 'reviewer',
    instructions: 'Review code and tests. Check for correctness, edge cases, and code quality.',
    tools: ['file_read', 'memory_read', 'memory_write'],
  });

  const swarm = await flow.createSwarm(\{
    queen,
    workers: [coder, tester, reviewer],
    topology: 'hierarchical',
    memoryNamespace: 'feature-build',
  });

  return swarm.run(\{ task: featureDescription });
}

buildFeature('JWT authentication with refresh token rotation')
  .then(r => console.log(r.output))
  .catch(console.error);
```

### 6.2 Peer-to-Peer Collaboration (Agents Share a Memory Pool)

Agents work independently but read each other's outputs from the shared memory pool, building on prior work.

```javascript
// peer-collaboration.js
const \{ ClaudeFlow, Agent, MemoryPool } = require('claude-flow');

const flow = new ClaudeFlow(\{
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-6',
});

async function collaborativeResearch(topic) \{
  const memory = new MemoryPool(\{ namespace: 'research', backend: 'sqlite' });

  // Each agent runs concurrently and deposits findings into shared memory
  const agents = [
    new Agent(\{
      role: 'literature-reviewer',
      instructions: `Research existing approaches to: $\{topic}. Store findings in memory under key "prior-art".`,
      tools: ['web_search', 'memory_write'],
    }),
    new Agent(\{
      role: 'technical-analyst',
      instructions: `Analyse technical feasibility of: $\{topic}. Read "prior-art" from memory first.`,
      tools: ['memory_read', 'memory_write'],
    }),
    new Agent(\{
      role: 'risk-assessor',
      instructions: `Identify risks for: $\{topic}. Read all memory keys before writing risk assessment.`,
      tools: ['memory_read', 'memory_write'],
    }),
  ];

  // Run all agents concurrently with access to the same memory pool
  const results = await Promise.all(
    agents.map(agent => flow.runAgent(agent, \{ memory }))
  );

  // Synthesise: final agent reads all memory and produces report
  const synthesiser = new Agent(\{
    role: 'synthesiser',
    instructions: 'Read all memory entries and produce a structured research report.',
    tools: ['memory_read'],
  });

  return flow.runAgent(synthesiser, \{ memory });
}

collaborativeResearch('stateless MCP server architecture').then(r => console.log(r.output));
```

### 6.3 Competitive Evaluation (Multiple Agents, Judge Picks Best)

Multiple agents independently produce outputs; a judge agent selects the best based on defined criteria.

```javascript
// competitive-evaluation.js
const \{ ClaudeFlow, Agent } = require('claude-flow');

const flow = new ClaudeFlow(\{
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-6',
});

async function getBestImplementation(requirement) \{
  // Spawn three independent implementers concurrently
  const implementers = ['coder-a', 'coder-b', 'coder-c'].map(id =>
    new Agent(\{
      id,
      role: 'implementer',
      instructions: `Implement this requirement independently: $\{requirement}. Optimise for readability.`,
      tools: ['file_write'],
    })
  );

  // Run in parallel — each produces an independent implementation
  const implementations = await Promise.all(
    implementers.map(agent => flow.runAgent(agent, {}))
  );

  // Judge picks the best
  const judge = new Agent(\{
    role: 'judge',
    instructions: `You will receive $\{implementations.length} implementations of the same requirement.
    Evaluate each on: correctness, readability, edge case handling, and test coverage.
    Select the best and explain why the others were not selected.`,
    tools: [],
  });

  const judgeInput = implementations.map((impl, i) => (\{
    label: `Implementation $\{i + 1}`,
    code: impl.output,
  }));

  return flow.runAgent(judge, \{ context: JSON.stringify(judgeInput) });
}

getBestImplementation('rate limiter with sliding window and Redis backend')
  .then(r => console.log(r.output));
```

:::warning Cost of competitive evaluation
    The competitive pattern runs 3+ independent LLM calls for a single task plus a judge call. Use it only for high-stakes outputs where the quality improvement justifies the cost. For most tasks, hierarchical orchestration with a single reviewer is more cost-effective.

---

## 7. Memory and State

### SPARC Memory System

claude-flow's memory layer is SQLite-backed with vector indexing for semantic retrieval. Memory is namespaced — agents in different workflows do not share memory unless explicitly configured.

```bash
# Store a reusable pattern
npx claude-flow memory store \
  --key "patterns:auth" \
  --value "JWT with refresh token rotation; bcrypt for passwords; RBAC for authorisation" \
  --namespace "project-patterns"

# Semantic search — retrieves the most relevant stored knowledge
npx claude-flow memory search \
  --query "authentication best practices" \
  --namespace "project-patterns" \
  --limit 5

# List all keys in a namespace
npx claude-flow memory list --namespace "project-patterns"

# Delete a key
npx claude-flow memory delete --key "patterns:auth" --namespace "project-patterns"
```

### Shared Context Strategies

| Strategy | When to use | Implementation |
|----------|-------------|---------------|
| **Namespace per workflow** | Default; isolates context per feature or session | `--namespace "workflow-id"` |
| **Shared pattern namespace** | Reusable engineering patterns across workflows | Long-lived namespace; curated manually |
| **Session namespace** | Ephemeral; auto-deleted after session ends | `--namespace "session-$(date +%s)"` |
| **Semantic retrieval** | When agents need context but you cannot know which key | Use `memory search` rather than `memory get` |

### Avoiding Memory Bloat

```javascript
// Memory hygiene: set TTLs on ephemeral state
await memory.store('working-draft', content, {
  namespace: 'session',
  ttlSeconds: 3600,   // auto-expires after 1 hour
});

// Compact a long-lived namespace periodically
await memory.compact('project-patterns', {
  deduplicateSimilarityThreshold: 0.95,   // remove near-duplicates
  maxEntries: 500,
});
```

---

## 8. Evaluation Framework

### 3-Layer Evaluation Taxonomy

A well-designed multi-agent evaluation covers three layers. Measuring only final output quality misses the majority of agent failure modes.

```
Layer 1 — Output Quality
  ├── Correctness        Does the output solve the stated requirement?
  ├── Faithfulness       Are claims grounded in retrieved context?
  ├── Relevance          Does the output address what was asked?
  ├── Format compliance  Does the output match the expected schema/format?
  └── Safety             No harmful, toxic, or policy-violating content

Layer 2 — Trajectory Quality
  ├── Tool selection     Did the agent choose the right tools?
  ├── Tool arguments     Were tools called with correct parameters?
  ├── Error recovery     Did the agent recover gracefully from tool failures?
  ├── Step efficiency    Was the goal achieved without unnecessary steps?
  └── Routing accuracy   Did the orchestrator send tasks to the right agents?

Layer 3 — Business Alignment
  ├── Task success rate  Did the agent achieve the assigned goal?
  ├── Latency            Does end-to-end time meet SLA requirements?
  ├── Cost per task      Is token spend within budget?
  └── Human override rate How often do humans need to correct outputs?
```

### Metric Thresholds (Starter Template)

Define thresholds before the first eval run — not after deployment. These are starting points; adjust to your specific domain and risk tolerance.

| Metric | Minimum acceptable | Target | Block deployment below |
|--------|-------------------|--------|----------------------|
| Correctness | 0.80 | 0.90 | 0.75 |
| Faithfulness (RAG) | 0.85 | 0.95 | 0.80 |
| Task success rate | 0.75 | 0.90 | 0.70 |
| Routing accuracy | 0.85 | 0.95 | 0.80 |
| Safety (no violations) | 1.00 | 1.00 | 0.99 |
| Latency P95 (seconds) | < 30 | < 15 | > 60 |

:::tip Collaborating on thresholds
    Thresholds must be agreed with governance stakeholders before deployment, not set unilaterally by engineering. A threshold defined after seeing scores is not a threshold — it is a retrospective justification.

---

## 9. Evaluation Harness

### LLM-as-Judge Implementation

```python
# eval_harness.py
import json
import anthropic
from dataclasses import dataclass
from typing import Optional

client = anthropic.Anthropic()

@dataclass
class EvalCase:
    task: str
    expected: str
    context: Optional[str] = None

@dataclass
class EvalResult:
    case: EvalCase
    actual_output: str
    score: float
    reasoning: str
    passed: bool

JUDGE_PROMPT = """You are an expert evaluator assessing an AI agent's output.

Task: {task}
Expected (reference): {expected}
Agent output: {actual}
{context_block}

Rate the agent output on correctness (0.0–1.0). Consider:
- Does it correctly solve the task?
- Does it cover edge cases the reference covers?
- Are there factual errors?

Respond ONLY with valid JSON:
{{
  "score": <0.0-1.0>,
  "reasoning": "<one sentence explanation>",
  "passed": <true if score >= 0.75>
}}"""

def evaluate_output(case: EvalCase, actual_output: str) -> EvalResult:
    context_block = f"Context provided: {case.context}" if case.context else ""
    prompt = JUDGE_PROMPT.format(
        task=case.task,
        expected=case.expected,
        actual=actual_output,
        context_block=context_block,
    )
    response = client.messages.create(
        model='claude-sonnet-4-6',
        max_tokens=256,
        messages=[{'role': 'user', 'content': prompt}],
    )
    verdict = json.loads(response.content[0].text)
    return EvalResult(
        case=case,
        actual_output=actual_output,
        score=verdict['score'],
        reasoning=verdict['reasoning'],
        passed=verdict['passed'],
    )

def run_eval_suite(dataset_path: str, agent_runner) -> dict:
    """Run full eval suite, return summary metrics."""
    with open(dataset_path) as f:
        cases = [EvalCase(**json.loads(line)) for line in f if line.strip()]

    results = []
    for case in cases:
        actual = agent_runner(case.task, case.context)   # call your agent here
        result = evaluate_output(case, actual)
        results.append(result)

    passed = [r for r in results if r.passed]
    return {
        'total': len(results),
        'passed': len(passed),
        'pass_rate': len(passed) / len(results),
        'avg_score': sum(r.score for r in results) / len(results),
        'failures': [
            {'task': r.case.task, 'score': r.score, 'reason': r.reasoning}
            for r in results if not r.passed
        ],
    }

if __name__ == '__main__':
    import sys
    # Usage: python eval_harness.py evals/baseline.jsonl
    summary = run_eval_suite(sys.argv[1], agent_runner=lambda t, c: "stub output")
    print(json.dumps(summary, indent=2))
    if summary['pass_rate'] < 0.75:
        print("EVAL FAILED: pass rate below 0.75 threshold")
        sys.exit(1)
```

### Eval Dataset Format

```jsonl
{"task": "Write a Python function to validate an email address", "expected": "Returns True for valid emails, False for invalid. Handles edge cases: missing @, multiple @, domain without TLD.", "context": null}
{"task": "Summarise the key points of this document", "expected": "3-5 bullet points covering the main arguments", "context": "The document argues that..."}
```

---

## 10. Stress Testing

### Concurrent Agent Load Testing

```javascript
// stress-test.js
const \{ ClaudeFlow } = require('claude-flow');

const flow = new ClaudeFlow(\{
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-6',
});

async function stressTest(\{
  concurrentAgents = 10,
  tasksPerAgent = 5,
  timeoutMs = 30_000,
}) \{
  const tasks = Array.from(\{ length: concurrentAgents }, (_, i) => `agent-$\{i}`);
  const results = \{ succeeded: 0, failed: 0, timedOut: 0, errors: [] };

  await Promise.allSettled(
    tasks.map(async (agentId) => \{
      for (let t = 0; t < tasksPerAgent; t++) \{
        const controller = new AbortController();
        const timeout = setTimeout(() => \{
          controller.abort();
          results.timedOut++;
        }, timeoutMs);

        try \{
          await flow.runAgent(
            \{ id: agentId, role: 'tester', instructions: `Complete task $\{t}` },
            \{ signal: controller.signal }
          );
          results.succeeded++;
        } catch (err) \{
          if (err.name === 'AbortError') \{
            // already counted in timedOut
          } else \{
            results.failed++;
            results.errors.push(\{ agentId, task: t, error: err.message });
          }
        } finally \{
          clearTimeout(timeout);
        }
      }
    })
  );

  return results;
}

stressTest(\{ concurrentAgents: 10, tasksPerAgent: 5 }).then(r => \{
  console.log('Stress test results:', r);
  const failRate = (r.failed + r.timedOut) / (r.succeeded + r.failed + r.timedOut);
  if (failRate > 0.05) \{
    console.error(`FAIL: failure rate $\{(failRate * 100).toFixed(1)}% exceeds 5% threshold`);
    process.exit(1);
  }
});
```

### Resource Limits

```javascript
// resource-limited-swarm.js
const swarm = await flow.createSwarm(\{
  topology: 'hierarchical',
  agents: ['coder', 'tester'],
  limits: \{
    maxConcurrentAgents: 5,       // cap parallelism
    maxTokensPerAgent: 50_000,    // per-agent token budget
    maxTotalTokens: 200_000,      // workflow-level budget
    timeoutMs: 60_000,            // per-agent timeout
    retryOnTimeout: true,
    maxRetries: 2,
  },
});
```

---

## 11. Parallelism

### Spawning Concurrent Agents

```javascript
// parallel-agents.js
const \{ ClaudeFlow } = require('claude-flow');

const flow = new ClaudeFlow(\{
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-sonnet-4-6',
});

async function parallelFileProcessing(filePaths) \{
  // Process up to 5 files concurrently; serialise the rest
  const CONCURRENCY = 5;
  const results = [];

  for (let i = 0; i < filePaths.length; i += CONCURRENCY) \{
    const batch = filePaths.slice(i, i + CONCURRENCY);

    const batchResults = await Promise.all(
      batch.map(filePath =>
        flow.runAgent(
          \{
            role: 'file-processor',
            instructions: `Analyse this file and extract key information: $\{filePath}`,
            tools: ['file_read', 'memory_write'],
          },
          \{ memoryKey: `result:$\{filePath}` }
        )
      )
    );

    results.push(...batchResults);
    console.log(`Processed batch $\{Math.floor(i / CONCURRENCY) + 1}: $\{batch.length} files`);
  }

  return results;
}
```

### Result Aggregation and Race Condition Prevention

```javascript
// safe-aggregation.js
const \{ Mutex } = require('async-mutex');  // npm install async-mutex

const mutex = new Mutex();
const aggregatedResults = [];

async function safeAggregate(agentResult) \{
  // Serialise writes to prevent concurrent modification
  const release = await mutex.acquire();
  try \{
    aggregatedResults.push(agentResult);
  } finally \{
    release();
  }
}

// In your agent runner:
await Promise.all(
  agents.map(async agent => \{
    const result = await flow.runAgent(agent, {});
    await safeAggregate(result);
  })
);
```

---

## 12. Token Optimisation

### Per-Agent Token Budget

Assign token budgets at the agent level to prevent runaway spend from a single verbose agent.

```javascript
const swarm = await flow.createSwarm(\{
  agents: [
    \{
      role: 'coder',
      tokenBudget: \{
        maxInputTokens: 20_000,
        maxOutputTokens: 4_000,
      },
    },
    \{
      role: 'reviewer',
      tokenBudget: \{
        maxInputTokens: 8_000,
        maxOutputTokens: 1_000,    // reviewers write less than coders
      },
    },
  ],
});
```

### Shared Context Strategies

Agents sharing a large context window (e.g., a codebase) should read from the shared memory store rather than each receiving the full context.

```javascript
// Instead of this (wasteful — N agents each get the full codebase):
const fullCodebase = fs.readFileSync('src/index.ts', 'utf8');  // 50,000 tokens
agents.map(agent => flow.runAgent(agent, \{ context: fullCodebase }));

// Do this (agents retrieve only the relevant sections):
await memory.store('codebase:index', fullCodebase, \{ namespace: 'project' });
// Agent instructions: "Read the relevant sections from memory using memory_read."
// Each agent retrieves only the ~2,000 tokens it actually needs.
```

### Output Length Controls

```javascript
const agent = new Agent(\{
  role: 'summariser',
  instructions: 'Summarise the document in exactly 3 bullet points. Do not exceed 150 words.',
  // Explicit length constraints in the prompt reduce output token spend
  maxOutputTokens: 300,   // hard cap as a backstop
});
```

---

## 13. Cost Optimisation

### Model Routing by Task Complexity

Use the cheapest model capable of the task. Reserve expensive models for tasks that actually require their capability.

```javascript
// cost-optimised-swarm.js
const flow = new ClaudeFlow(\{ apiKey: process.env.ANTHROPIC_API_KEY });

const swarm = await flow.createSwarm(\{
  agents: [
    \{
      role: 'router',
      // Routing decisions do not need a frontier model
      model: 'claude-haiku-4-5',
      instructions: 'Classify the task type and route to the appropriate specialist.',
    },
    \{
      role: 'coder',
      // Complex reasoning benefits from a mid-tier model
      model: 'claude-sonnet-4-6',
      instructions: 'Implement the feature to spec.',
    },
    \{
      role: 'tester',
      // Test generation is pattern-following — haiku is sufficient
      model: 'claude-haiku-4-5',
      instructions: 'Write unit tests for the implementation.',
    },
    \{
      role: 'architect',
      // Architecture decisions with high stakes warrant the best model
      model: 'claude-fable-5',
      instructions: 'Review the architecture and identify systemic risks.',
    },
  ],
});
```

**Model reference (July 2026):**

| Model | Input (per MTok) | Output (per MTok) | Best for in multi-agent |
|-------|-----------------|------------------|-----------------------|
| Claude Haiku 4.5 | Low cost | Low cost | Routing, classification, test generation, summarisation |
| Claude Sonnet 4.6 | Moderate | Moderate | Implementation, research, standard reasoning |
| Claude Sonnet 5 | $3 | $15 | Production-quality reasoning, most enterprise tasks |
| Claude Fable 5 | $10 | $50 | Complex architecture decisions, high-stakes reasoning |

For current pricing, see [Models 2026](claude-models-2026.md).

### Cost Tracking Per Workflow

```javascript
// cost-tracker.js
class CostTracker \{
  constructor() \{
    this.records = [];
  }

  record(workflowId, agentRole, usage) \{
    this.records.push(\{
      workflowId,
      agentRole,
      inputTokens: usage.input_tokens,
      outputTokens: usage.output_tokens,
      timestamp: new Date().toISOString(),
    });
  }

  summary(workflowId) \{
    const workflow = this.records.filter(r => r.workflowId === workflowId);
    return \{
      totalInput: workflow.reduce((s, r) => s + r.inputTokens, 0),
      totalOutput: workflow.reduce((s, r) => s + r.outputTokens, 0),
      byAgent: Object.groupBy(workflow, r => r.agentRole),
    };
  }
}

const tracker = new CostTracker();

// Instrument each agent run:
const result = await flow.runAgent(agent, {});
tracker.record('workflow-001', agent.role, result.usage);
```

---

## 14. Guardrails

### Agent Action Whitelists

```javascript
// guardrailed-swarm.js
const AGENT_PERMISSIONS = \{
  coder:    ['file_read', 'file_write', 'bash', 'memory_read'],
  tester:   ['file_read', 'bash', 'memory_read', 'memory_write'],
  reviewer: ['file_read', 'memory_read'],
  queen:    ['spawn_agent', 'memory_read', 'memory_write'],
};

// Enforce at runtime — reject tool calls outside the whitelist
function buildAgent(role) \{
  const allowedTools = AGENT_PERMISSIONS[role] ?? [];
  return new Agent(\{
    role,
    tools: allowedTools,
    onToolCall: (toolName, args) => \{
      if (!allowedTools.includes(toolName)) \{
        throw new Error(`GUARDRAIL: $\{role} is not authorised to call $\{toolName}`);
      }
    },
  });
}
```

### Output Validation

```python
# output_validator.py — validates agent outputs before they leave the system
import re
import json

# Patterns that should never appear in outputs
BLOCKED_PATTERNS = [
    r'\b\d\{4}[- ]?\d\{4}[- ]?\d\{4}[- ]?\d\{4}\b',   # credit card
    r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]\{2,}\b',  # email (when unexpected)
    r'AKIA[0-9A-Z]\{16}',                            # AWS access key
    r'sk-[a-zA-Z0-9]\{40,}',                         # API key pattern
]

def validate_output(output: str, context: dict) -> tuple[bool, list[str]]:
    """Returns (is_valid, list_of_violations)."""
    violations = []
    for pattern in BLOCKED_PATTERNS:
        if re.search(pattern, output):
            violations.append(f"Blocked pattern detected: \{pattern}")
    if len(output) > context.get('max_output_length', 10_000):
        violations.append("Output exceeds maximum allowed length")
    return len(violations) == 0, violations

# Use in your agent pipeline:
is_valid, violations = validate_output(agent_result.output, \{'max_output_length': 5_000})
if not is_valid:
    log_violation(violations)
    raise GuardrailViolation(f"Output blocked: \{violations}")
```

### HITL Gates

```javascript
// hitl-gate.js
async function withHumanApproval(action, actionDescription, \{
  timeoutMs = 300_000,   // 5 minutes
  onTimeout = 'reject',  // 'reject' | 'approve' | 'escalate'
} = {}) \{
  const approvalRequest = await notifyApprover(\{
    description: actionDescription,
    requestedAt: new Date().toISOString(),
  });

  return new Promise((resolve, reject) => \{
    const timer = setTimeout(() => \{
      if (onTimeout === 'approve') \{
        console.warn(`HITL timeout: auto-approving "$\{actionDescription}"`);
        resolve(action());
      } else if (onTimeout === 'escalate') \{
        notifyEscalation(approvalRequest);
        reject(new Error(`HITL timeout: escalated "$\{actionDescription}"`));
      } else \{
        reject(new Error(`HITL timeout: rejected "$\{actionDescription}"`));
      }
    }, timeoutMs);

    approvalRequest.onDecision(decision => \{
      clearTimeout(timer);
      if (decision === 'approved') \{
        resolve(action());
      } else \{
        reject(new Error(`Human rejected action: "$\{actionDescription}"`));
      }
    });
  });
}

// Usage — wrap irreversible agent actions:
await withHumanApproval(
  () => deployToProduction(build),
  'Deploy build v1.42 to production',
  \{ timeoutMs: 600_000, onTimeout: 'reject' }
);
```

:::warning Timeout handling is not optional
    Every HITL gate must specify what happens when no human responds within the timeout. Leaving the agent blocked indefinitely creates availability problems. Define the default explicitly — and for most irreversible actions, the right default is to reject and log, not to approve automatically.

---

## 15. Governance

### Audit Logging

Every agent action, tool call, and decision should be logged with enough context to reconstruct what happened and why.

```javascript
// audit-logger.js
class AuditLogger \{
  constructor(workflowId) \{
    this.workflowId = workflowId;
    this.entries = [];
  }

  log(event) \{
    const entry = \{
      workflowId: this.workflowId,
      timestamp: new Date().toISOString(),
      ...event,
    };
    this.entries.push(entry);
    // In production: ship to your observability backend
    console.log(JSON.stringify(entry));
  }

  agentStarted(agentId, role, task) \{
    this.log(\{ type: 'AGENT_STARTED', agentId, role, task });
  }

  toolCalled(agentId, toolName, args) \{
    // Redact sensitive args before logging
    const safeArgs = redactSensitive(args);
    this.log(\{ type: 'TOOL_CALLED', agentId, toolName, args: safeArgs });
  }

  agentCompleted(agentId, outputSummary, usage) \{
    this.log(\{ type: 'AGENT_COMPLETED', agentId, outputSummary, usage });
  }

  policyViolation(agentId, violation) \{
    this.log(\{ type: 'POLICY_VIOLATION', agentId, violation, severity: 'HIGH' });
  }
}
```

### Agent Activity Tracking

```javascript
// activity-tracker.js
const swarm = await flow.createSwarm(\{
  agents: ['coder', 'tester', 'reviewer'],
  onAgentEvent: (event) => \{
    auditLogger.log(event);   // every event goes to audit log
    if (event.type === 'tool_call' && SENSITIVE_TOOLS.includes(event.toolName)) \{
      notifyGovernanceChannel(event);
    }
  },
});
```

### Rollback Capability

```javascript
// rollback-support.js
class CheckpointedWorkflow \{
  constructor() \{
    this.checkpoints = [];
  }

  async saveCheckpoint(label, state) \{
    this.checkpoints.push(\{
      label,
      timestamp: new Date().toISOString(),
      state: JSON.parse(JSON.stringify(state)),  // deep clone
    });
  }

  async rollbackTo(label) \{
    const checkpoint = this.checkpoints.findLast(c => c.label === label);
    if (!checkpoint) throw new Error(`Checkpoint "$\{label}" not found`);
    console.log(`Rolling back to checkpoint: $\{label} ($\{checkpoint.timestamp})`);
    return checkpoint.state;
  }
}

const workflow = new CheckpointedWorkflow();

// Save state before each risky phase
await workflow.saveCheckpoint('pre-refactor', \{ files: currentFiles });
const refactorResult = await swarm.run(\{ task: 'refactor auth module' });

if (!refactorResult.testsPass) \{
  const previousState = await workflow.rollbackTo('pre-refactor');
  await restoreFiles(previousState.files);
}
```

---

## 16. Best Practices

1. **Decompose before spawning.** Define the work breakdown structure at the Queen level before spinning up workers. Agents with unclear scope waste tokens and produce inconsistent results.

2. **Use hierarchical topology for complex tasks, mesh for collaborative ones.** Hierarchical gives the Queen clear authority over sequencing; mesh enables peer-to-peer knowledge sharing for research or creative tasks.

3. **Single responsibility per agent.** A coder + tester + reviewer monolith agent is harder to route, harder to evaluate, and harder to replace. Three separate agents compose more predictably.

4. **Store patterns, not just outputs.** Capture reusable engineering decisions in memory under stable keys. Later workflows retrieve them rather than rediscovering the same conclusions.

5. **Use SPARC for all non-trivial feature work.** The specification-first discipline prevents scope creep, ensures testability, and creates a natural audit trail.

6. **Namespace your memory keys.** Use consistent prefixes (`patterns:`, `decisions:`, `context:`) to prevent key collisions across agents and sessions.

7. **Set explicit token budgets.** Per-agent token budgets prevent a verbose agent from consuming the entire workflow budget. Define them before the first production run.

8. **Route by model capability.** Use Haiku for routing, classification, and test generation; Sonnet for implementation and reasoning; Fable for high-stakes architectural decisions. Do not overprovision.

9. **Evaluate trajectories, not just outputs.** A correct final answer via a broken path is still a broken agent. Measure tool selection, step efficiency, and error recovery alongside output quality.

10. **Integrate evals into CI/CD.** Every prompt change, tool change, or model version bump should trigger the eval suite. Block deployment on regression — not just on code errors.

11. **Instrument with OTel from day one.** Retrofitting observability to a production agent system is expensive and incomplete. Emit traces at agent start, tool call, and completion from the first deployment.

12. **Define HITL gates before go-live.** Enumerate which action categories require human approval. Implement the gates and test them — do not assume agents will stay within safe boundaries without enforcement.

---

## 17. Antipatterns

1. **The Monolith Agent.** One agent tries to do everything: plan, code, test, review, deploy. It becomes impossible to route, evaluate, or replace individual capabilities. *Fix: split by single responsibility.*

2. **Agent Sprawl.** Spawning 50 agents for a task that 5 can handle. Coordination overhead grows faster than throughput. *Fix: start with the minimum viable swarm; scale up based on measurement.*

3. **Context Window Stuffing.** Passing the entire codebase into every agent's context. This maximises token cost and degrades reasoning quality as the model tries to process irrelevant content. *Fix: use semantic memory retrieval to pass only relevant context.*

4. **Stateless Design.** No persistent memory between sessions. Agents re-learn the same patterns on every run. *Fix: store reusable patterns in a stable namespace; retrieve at session start.*

5. **Tool Overloading.** Giving every agent access to every tool. This violates least privilege and makes agent behaviour harder to reason about. *Fix: each agent gets only the tools its role requires.*

6. **Skipping SPARC.** Jumping straight to implementation without a specification phase. Agents code the wrong thing confidently. *Fix: enforce specification-first for all non-trivial features.*

7. **Infinite Retry Loops.** Agents that retry failing tool calls without circuit breakers. A broken external dependency causes the agent to loop indefinitely. *Fix: set max retry limits and circuit breakers at the orchestrator level.*

8. **Cascade Failure.** One agent failure blocks the entire swarm. *Fix: design for partial success; isolate agent failures and allow the swarm to continue with degraded capability.*

9. **Token Burn on Simple Tasks.** Running a 5-agent debate to answer a question that a single prompt can resolve. 5 agents × multiple rounds = many unnecessary LLM calls. *Fix: match orchestration complexity to task complexity; use a single agent for simple tasks.*

10. **Provider Lock-in.** Tightly coupling agent logic to one LLM provider's API idioms. A provider outage, price change, or capability regression has no mitigation path. *Fix: build model-agnostic abstractions; test failover paths.*

11. **Launch-Day Evals Only.** Running evals once before deployment and never again. Model behaviour changes without code changes; prompt regressions from later changes go undetected. *Fix: continuous evaluation in CI/CD; treat evals as an operational process.*

12. **Observability as an Afterthought.** Adding logging and tracing after a production incident. By then, the incident is over and the logs that would have explained it were never captured. *Fix: OTel-first from the first deployment; treat traces as a first-class system requirement.*

---

## 18. CI/CD Integration

A complete GitHub Actions workflow that runs the eval suite on every PR that changes agent, prompt, or tool files.

```yaml
# .github/workflows/claude-flow-eval.yml
name: claude-flow Agent Evaluation

on:
  pull_request:
    paths:
      - 'agents/**'
      - 'prompts/**'
      - 'tools/**'
      - 'evals/**'
  push:
    branches: [main]
    paths:
      - 'agents/**'
      - 'prompts/**'

jobs:
  eval-gate:
    name: Evaluation Gate
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          cache: 'pip'

      - name: Install Node dependencies
        run: npm ci

      - name: Install claude-flow
        run: npm install -g claude-flow

      - name: Install Python eval dependencies
        run: pip install anthropic

      - name: Run offline eval suite
        env:
          ANTHROPIC_API_KEY: $\{\{ secrets.ANTHROPIC_API_KEY }}
        run: |
          RESULTS_FILE="evals/results/ci-$(date +%Y%m%d-%H%M%S).json"
          python evals/eval_harness.py evals/datasets/baseline.jsonl \
            --output "$RESULTS_FILE" \
            --pass-threshold 0.75
          echo "RESULTS_FILE=$RESULTS_FILE" >> "$GITHUB_ENV"

      - name: Check regression against baseline
        env:
          ANTHROPIC_API_KEY: $\{\{ secrets.ANTHROPIC_API_KEY }}
        run: |
          npx claude-flow eval compare \
            --current "$RESULTS_FILE" \
            --baseline evals/results/baseline.json \
            --fail-on-regression \
            --regression-threshold 0.05

      - name: Upload eval results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: eval-results-$\{\{ github.run_number }}
          path: evals/results/
          retention-days: 90

      - name: Post eval summary to PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync(process.env.RESULTS_FILE));
            const body = [
              '## Eval Results',
              `Pass rate: **$\{(results.pass_rate * 100).toFixed(1)}%** ($\{results.passed}/$\{results.total})`,
              `Average score: **$\{results.avg_score.toFixed(2)}**`,
              results.failures.length > 0
                ? `\n### Failures\n$\{results.failures.map(f => `- \`$\{f.task}\`: $\{f.reason}`).join('\n')}`
                : '\nNo failures.',
            ].join('\n');
            github.rest.issues.createComment(\{
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body,
            });

  stress-test:
    name: Stress Test (main branch only)
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    needs: eval-gate

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci && npm install -g claude-flow

      - name: Run concurrent agent stress test
        env:
          ANTHROPIC_API_KEY: $\{\{ secrets.ANTHROPIC_API_KEY }}
        run: node evals/stress-test.js --concurrent 5 --tasks-per-agent 3
```

:::note Secrets management
    `ANTHROPIC_API_KEY` must be stored as a GitHub Actions secret, not hardcoded. Navigate to repository Settings → Secrets and variables → Actions → New repository secret.

---

## References

- **claude-flow GitHub:** [github.com/ruvnet/claude-flow](https://github.com/ruvnet/claude-flow)
- **Claude API documentation:** [docs.anthropic.com](https://docs.anthropic.com)
- **MCP specification:** [modelcontextprotocol.io](https://modelcontextprotocol.io)
- **AGENTSAFE governance framework:** arxiv.org/pdf/2512.03180
- **LLM agent evaluation survey:** arxiv.org/pdf/2507.21504
- **Agentic AI Governance (IMDA):** imda.gov.sg/mgf-for-agentic-ai
- **Related guides in this site:**
  - [MCP Deep Guide](mcp-deep-guide.md)
  - [Agent SDK Production](claude-agent-sdk-production.md)
  - [Models 2026](claude-models-2026.md)
  - [Enterprise AI Architecture Patterns](../../enterprise-architecture/ai-architecture/enterprise-ai-architecture-patterns.md)
  - [Governance & Compliance](../../enterprise-architecture/ai-architecture/enterprise-ai-governance-compliance.md)
  - [Skills Assessment](../../enterprise-architecture/ai-architecture/enterprise-ai-skills-assessment.md)

---

*Guide current as of July 2026. claude-flow is an active open-source project — verify feature availability against the [GitHub repo](https://github.com/ruvnet/claude-flow) changelog before designing production systems.*
