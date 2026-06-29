---
title: CCAF Exam Prep — Complete Guide
---

# CCAF Exam Prep — Complete Guide

Complete preparation for the Certified Claude AI Fundamentals (CCAF) exam — all 5 domains, 75+ original scenario-based practice questions with full answer rationale.

---

## Exam Facts

| Item | Detail |
|------|--------|
| Questions | 60 scenario-based multiple choice |
| Duration | 120 minutes |
| Passing score | 720 / 1000 |
| Cost | $99 (free for first 5,000 partner employees) |
| Format | Online proctored |
| Validity | 2 years |
| Prerequisite | None |

---

## Domain Weightings

| Domain | Weight | ~Questions |
|--------|--------|-----------|
| 1 — Agentic Architecture & Orchestration | 27% | 16 |
| 2 — Tool Design & MCP Integration | 18% | 11 |
| 3 — Claude Code Configuration & Workflows | 20% | 12 |
| 4 — Prompt Engineering & Structured Output | 20% | 12 |
| 5 — Context Management & Reliability | 15% | 9 |

---

## Domain 1 — Agentic Architecture & Orchestration (27%)

### Core Concepts

**Orchestrator vs Subagent**
- Orchestrator: plans the task, delegates sub-tasks, aggregates results, handles failures
- Subagent: executes a specific scoped task, reports results back to orchestrator
- Rule: orchestrators should be stateful and persistent; subagents can be ephemeral

**Agent Patterns**

| Pattern | When to Use | Risk |
|---------|------------|------|
| Sequential chain | Steps depend on prior output | Slow; single failure blocks all |
| Fan-out (parallel) | Independent sub-tasks | Coordination complexity |
| DAG | Mixed dependencies | Complex to manage |
| Adversarial | High-stakes output requiring verification | High cost |
| Tournament | Best answer from multiple approaches | Very high cost |

**Memory Architecture**

| Memory Type | Storage | Scope | Use Case |
|-------------|---------|-------|---------|
| In-context | Claude's context window | Single session | Short conversations, recent facts |
| External (Postgres) | Relational DB | Multi-session | User history, structured records |
| Vector store | Embedding DB | Semantic search | Large knowledge base retrieval |
| Key-value (Redis) | In-memory DB | Fast ephemeral | Session state, rate limit counters |

**Human-in-the-Loop Tiers**

- **HITL**: Human approves every action before execution
- **HOTL**: Human monitors in real-time; can intervene
- **HOOL**: Fully automated; human reviews logs after the fact

**Agent Evaluation Metrics**

- Task completion rate (% tasks finishing without manual intervention)
- Token efficiency (tokens per completed task vs baseline)
- Tool error rate (% tool calls returning error)
- Hallucination rate (% outputs containing unverified claims)
- Human escalation rate (% tasks needing HITL override)

---

### Domain 1 Practice Questions

**Q1.** Your team is building an agent that analyses 50 customer contracts simultaneously and extracts key dates and obligations. Which pattern is most appropriate?

A) Sequential chain — process one contract at a time
B) Fan-out — spawn parallel subagents per contract
C) Adversarial — have two agents cross-check each other
D) Tournament — generate multiple interpretations and pick the best

**Answer: B**
*Fan-out is ideal for independent parallel work items. Each contract analysis is independent with no dependencies between them. Sequential is 50x slower. Adversarial/tournament add cost with no benefit for straightforward extraction.*

---

**Q2.** An agentic system needs to: (1) gather market data, (2) analyse it, (3) generate a report. Step 2 requires step 1's output. Step 3 requires step 2's output. Which is the correct implementation?

A) Run all three in parallel using fan-out
B) Sequential chain: 1 → 2 → 3
C) Have a single agent do all three in one prompt
D) Fan-out steps 1 and 2, then run step 3

**Answer: B**
*Steps have strict data dependencies, so sequential execution is required. Fan-out fails because steps 2 and 3 cannot start until prior steps complete. A single-prompt approach loses auditability and is harder to debug.*

---

**Q3.** A long-running research agent fails after 47 minutes due to a timeout. The agent had completed 80% of its work. What design pattern would allow it to resume rather than restart?

A) Increase the timeout limit
B) Use in-context memory to save progress
C) Implement checkpoint-based durable state in Postgres
D) Break the task into a single larger prompt

**Answer: C**
*Only external durable state (Postgres/Redis) survives a process restart. In-context memory is lost when the session ends. Increasing timeout delays but doesn't prevent restarts. A larger prompt doesn't help with interruptions.*

---

**Q4.** You are designing an agentic coding assistant that can push code to GitHub. Which human-in-the-loop tier is most appropriate for the initial production deployment?

A) HOOL — agents are autonomous
B) HITL — human approves every push
C) HOTL — human monitors and can intervene
D) No oversight needed — the agent is tested

**Answer: C**
*HOTL is the recommended default for agentic systems performing consequential actions. HITL is too slow for productive use. HOOL should only be used after extensive validation in lower environments. Even well-tested agents warrant monitoring at launch.*

---

**Q5.** An orchestrator spawns 10 subagents to analyse different sections of a large document. Three subagents return errors. What is the best recovery strategy?

A) Fail the entire task and report an error
B) Continue with the 7 successful results and note gaps
C) Retry failed subagents with exponential backoff; fall back to partial results if retries exhaust
D) Re-run all 10 subagents from the beginning

**Answer: C**
*Retry with backoff handles transient failures. Falling back to partial results is better than complete failure. Option A is too aggressive. Option B skips retries. Option D wastes the 7 successful results.*

---

**Q6.** Which metric is the best leading indicator that an agent is hallucinating?

A) High token count per task
B) High tool error rate
C) High human escalation rate
D) Decreased task completion rate

**Answer: C**
*Human escalation rate captures cases where agents produce plausible-but-wrong outputs that humans catch. High token count just means verbose output. Tool errors are a separate failure mode. Task completion rate measures finishing, not accuracy.*

---

**Q7.** Your agent maintains a session across multiple user turns over 3 days. The conversation log grows to 800K tokens. What is the best strategy?

A) Use a 1M token context model to fit everything
B) Summarise older turns and store summaries externally
C) Delete turns older than 24 hours
D) Truncate from the oldest end

**Answer: B**
*Summarisation preserves semantic content while reducing token count. External storage means nothing is lost. Simply deleting or truncating loses potentially important context. 1M context is expensive and the log will keep growing.*

---

**Q8.** A banking agent has tools for reading account balances (read-only) and transferring funds (write). Which principle should govern how these tools are provisioned?

A) Grant all tools to all agents by default
B) Minimal footprint — each agent gets only the tools it currently needs
C) Read tools are always safe, grant them broadly
D) Write tools should be granted based on user request

**Answer: B**
*Minimal footprint is a core safety principle for agentic systems. Granting broad tool access increases blast radius if the agent is compromised or misbehaves. Write tools especially should be provisioned per-task.*

---

**Q9.** An adversarial verification pattern is most useful when:

A) Tasks are parallelisable and independent
B) Speed is critical and accuracy is secondary
C) Output accuracy is critical and errors could be costly
D) The task requires multiple steps with data dependencies

**Answer: C**
*Adversarial verification (primary agent + critic agent) is designed for high-stakes outputs where errors have consequences. It increases cost and latency, so it's inappropriate when speed matters or for routine tasks.*

---

**Q10.** Which agent evaluation metric directly measures whether agents are efficient with API costs?

A) Task completion rate
B) Tool error rate
C) Token efficiency (tokens per completed task)
D) Human escalation rate

**Answer: C**
*Token efficiency directly measures how many tokens are consumed per successful task, which maps to API cost. The other metrics measure reliability, errors, and human workload.*

---

**Q11.** A subagent needs to store its intermediate results so the orchestrator can aggregate them. The subagent processes are short-lived and may run on different machines. What storage is most appropriate?

A) In-memory dictionary in the subagent process
B) Claude's context window
C) Shared Redis or Postgres
D) Local file system

**Answer: C**
*Shared external storage (Redis/Postgres) is accessible across machines and persists beyond process lifetime. In-memory and local file system are machine-local. Context window is not shared between separate agent processes.*

---

**Q12.** What is the primary risk of a fully corrigible AI agent?

A) It may refuse legitimate user requests
B) It will execute any instruction, including harmful ones from malicious operators
C) It cannot learn from feedback
D) It is slower than autonomous agents

**Answer: B**
*Fully corrigible agents do whatever they're told, which makes them dangerous if controlled by malicious actors or if instructions are harmful. CAI 2.0 targets a position close to corrigible but with retained ability to refuse clear ethical violations.*

---

**Q13.** During a long-running agent task, the agent detects that completing the task would require accessing data it wasn't explicitly authorised to access. What should it do?

A) Access the data since the task goal justifies it
B) Infer implied permission from the task description
C) Stop, report the gap to the orchestrator, and request clarification
D) Continue the task without that data and hope for acceptable results

**Answer: C**
*Agents should not assume implied permissions for sensitive data access. Stopping and requesting clarification preserves human oversight and prevents unauthorised access. This is a core minimal footprint principle.*

---

**Q14.** Circuit breakers in agent systems are designed to:

A) Prevent agents from making tool calls
B) Stop an agent from calling a failing service repeatedly, preventing cascading failures
C) Limit the number of tokens an agent can use
D) Block agents from writing to databases

**Answer: B**
*Circuit breakers detect repeated failures and "open" to stop calls to a failing service, giving it time to recover. After a recovery period, they "half-open" to test if the service is healthy before resuming normal operation.*

---

**Q15.** Which statement best describes the orchestrator's role in a multi-agent system?

A) Execute tools and return results to the user
B) Manage task planning, delegation, monitoring, and aggregation
C) Store conversation history for all subagents
D) Apply safety filters to subagent outputs

**Answer: B**
*Orchestrators plan, delegate, monitor, and aggregate. Tool execution is the subagent's role. Conversation history is managed by the state store. Safety is enforced at the model and system level.*

---

**Q16.** An agent builds a report by calling 5 different data sources. The final step combines results. The user asks for the report 1 minute later. Which architecture minimises total time?

A) Call all 5 sources sequentially, then combine
B) Call all 5 sources in parallel using fan-out, then combine
C) Have the agent call sources one at a time as it writes the report
D) Pre-cache all data sources at agent startup

**Answer: B**
*Fan-out parallelises the 5 independent data source calls, then combines results. This reduces total latency to max(individual_call_times) + combine_time, vs sum(all_call_times) for sequential.*

---

## Domain 2 — Tool Design & MCP Integration (18%)

### Core Concepts

**Tool Description Quality** — the most critical factor in whether Claude uses tools correctly. Must include:
1. What the tool does
2. **When to use it** (and when NOT to use it)
3. What the input parameters mean
4. What the return value contains

**Idempotency** — an operation that produces the same result regardless of how many times it's called with the same input. Read operations are always idempotent. Write operations may or may not be.

**MCP Primitives Selection**

| Use | Primitive |
|-----|-----------|
| Action Claude should perform | Tool |
| Data Claude should read | Resource |
| Reusable prompt template | Prompt |

**Tool Error Handling**
- Return structured errors (JSON with `success: false, error_type, message`) — Claude can reason about these
- Don't raise unhandled exceptions — these return as opaque errors Claude can't act on
- Include `retry_allowed: bool` in error responses

---

### Domain 2 Practice Questions

**Q17.** Which tool description is most likely to result in Claude using the tool correctly?

A) `"search": "Search for things."`
B) `"search_knowledge_base": "Search internal policies. Use when asked about internal procedures. Do NOT use for public information."`
C) `"search": "A search function that takes a query parameter and returns results from the database."`
D) `"search_knowledge_base": "Searches things."`

**Answer: B**
*The best description specifies what to search, when to use it, and when NOT to use it. Option A is too vague. Option C describes mechanics but not when to use it. Option D is almost as vague as A.*

---

**Q18.** A tool `send_invoice` emails an invoice to a customer. A subagent fails mid-task and retries. The invoice gets sent twice. Which attribute should this tool be marked with?

A) `idempotent: true`
B) `idempotent: false`
C) `read_only: true`
D) `safe_to_retry: true`

**Answer: B**
*`send_invoice` is NOT idempotent — calling it twice sends two emails. This should be marked `idempotent: false` to signal that retry logic must be careful. The orchestrator should deduplicate before calling this tool.*

---

**Q19.** An MCP server provides access to a company knowledge base. Claude should be able to read articles but should NOT modify them. Which MCP primitive is most appropriate?

A) Tool
B) Resource
C) Prompt
D) Both Tool and Resource

**Answer: B**
*Resources are the correct primitive for data Claude reads but doesn't modify. Tools are for actions. A resource with `uri: "kb://articles/{id}"` lets Claude request specific articles.*

---

**Q20.** A tool returns the following error. What should Claude do next?

```json
{"success": false, "error_type": "payment_declined", "message": "Card declined", "retry_allowed": false}
```

A) Retry the payment immediately
B) Wait 60 seconds and retry
C) Inform the user the payment was declined and ask for an alternative payment method
D) Try a different card number automatically

**Answer: C**
*`retry_allowed: false` explicitly signals the operation should not be retried. The correct action is to surface the error to the user and request alternative action. Retrying is explicitly disallowed.*

---

**Q21.** A developer wants Claude to run SQL queries against a production database. Which security measure is most critical?

A) Log all queries
B) Enforce read-only access at the database user level, not just in the tool description
C) Limit query length to 1000 characters
D) Rate limit to 10 queries per minute

**Answer: B**
*Enforcing read-only at the DB user level is a defence-in-depth measure that cannot be bypassed even if the tool description is ignored or an injection attack occurs. The other measures are useful but secondary.*

---

**Q22.** An MCP tool `create_jira_ticket` occasionally gets called twice for the same issue due to agent retries. What is the best solution?

A) Disable retries for all agent tools
B) Implement idempotency keys: accept a `dedup_id` parameter and check if it was already processed
C) Return an error on the second call
D) Add a delay between the agent's tool calls

**Answer: B**
*Idempotency keys are the standard solution for duplicate-call prevention. The first call stores the `dedup_id` and result; subsequent calls with the same ID return the stored result without re-executing.*

---

**Q23.** You have two options for giving Claude access to current weather data: (A) a Resource that returns a weather JSON document, or (B) a Tool that accepts a location and returns weather for that location. When should you use the Tool?

A) Always — tools are more powerful
B) When the data varies based on input parameters (dynamic queries)
C) When Claude should passively read the data
D) When the data is static and doesn't change

**Answer: B**
*Use a Tool when Claude needs to query with specific parameters (e.g., location). Use a Resource when the data can be pre-determined by URI (e.g., current weather for HQ). The rule: if it takes meaningful input, use a Tool; if it's a retrievable document, use a Resource.*

---

**Q24.** What happens when an MCP tool raises an unhandled exception?

A) Claude automatically retries with different parameters
B) The exception message is returned to Claude as a string
C) The session terminates
D) Claude receives an opaque error it cannot reason about

**Answer: D**
*Unhandled exceptions return as generic error messages that Claude cannot interpret meaningfully. Always catch exceptions in tool handlers and return structured error objects so Claude can reason about what went wrong and what to do next.*

---

**Q25.** A parallel tool call pattern is appropriate when:

A) Tool B needs the output of Tool A
B) Tool calls are independent and their results will be combined
C) One tool has a higher priority than another
D) Tools share a database connection

**Answer: B**
*Parallel tool calls work when results are independent. If Tool B depends on Tool A's output, they must be sequential. Priority and connection sharing don't determine parallel eligibility.*

---

**Q26.** An enterprise wants to give the Sales team access to Salesforce via MCP and the Engineering team access to GitHub, without each user configuring their own OAuth. What should they use?

A) Ask each user to add MCP servers to their local settings.json
B) Enterprise MCP with Okta provisioning — org-level server assignment by group
C) Share a single OAuth token across all users
D) Create a custom MCP server with hardcoded credentials

**Answer: B**
*Enterprise MCP with Okta provisioning assigns approved MCP servers to user groups centrally. Users get access on SSO login without individual setup. Sharing tokens is a security risk. Hardcoded credentials are a critical security vulnerability.*

---

**Q27.** Which of these best describes the purpose of a Prompt primitive in MCP?

A) A pre-configured set of tool permissions for Claude
B) A reusable, parameterised prompt template users can invoke via slash command
C) A security policy restricting what prompts Claude can receive
D) A cached system prompt for repeated use

**Answer: B**
*MCP Prompts are named, parameterised templates. They appear as `/mcp__<server>__<name>` commands and can accept arguments. They are not permission systems or caching mechanisms.*

---

## Domain 3 — Claude Code Configuration & Workflows (20%)

### Core Concepts

**CLAUDE.md Hierarchy** (highest → lowest precedence):
1. `<project-root>/CLAUDE.md` — shared with team, checked into git
2. `<project-root>/.claude/CLAUDE.md` — personal, gitignored
3. `~/.claude/CLAUDE.md` — user global, all projects

**Custom Commands** live in `.claude/commands/` and become `/command-name` slash commands.

**Skills** live in `.claude/skills/<name>/` and group related commands + hooks.

**Non-interactive mode**: `claude -p "prompt"` — runs a single task and exits. Used in CI/CD.

**Agent SDK credits** (June 15, 2026): Separate pool from interactive REPL credits. CI/CD pipelines and programmatic calls draw from the Agent SDK pool.

---

### Domain 3 Practice Questions

**Q28.** A developer's personal CLAUDE.md sets `preferred_language: Python`. The project CLAUDE.md sets `preferred_language: TypeScript`. When working in this project, which language does Claude use?

A) Python — personal settings override project settings
B) TypeScript — project settings have higher precedence
C) Claude chooses based on file extensions in the repo
D) Both are applied and Claude uses whichever fits the context

**Answer: B**
*Project-level CLAUDE.md has higher precedence than user-level. This ensures team-shared settings are consistent for all contributors. Personal settings apply only when no project setting overrides them.*

---

**Q29.** A team wants to enforce that Claude never runs `git push --force` in their project. Where should this restriction be placed?

A) User global `~/.claude/CLAUDE.md`
B) Project `.claude/settings.json` permissions deny list
C) Personal `<project>/.claude/CLAUDE.md`
D) In each individual custom command

**Answer: B**
*`.claude/settings.json` with `permissions.deny: ["Bash(git push --force *)"]` enforces the restriction for all team members who use the project. It's checked into git and applies consistently. Personal files only affect one user.*

---

**Q30.** What is the correct location for a custom command named `security-audit` that the whole team should use?

A) `~/.claude/commands/security-audit.md`
B) `.claude/skills/security-audit.md`
C) `.claude/commands/security-audit.md`
D) `docs/commands/security-audit.md`

**Answer: C**
*Project-level custom commands live in `.claude/commands/` at the project root. This makes them available to all team members. The global path `~/.claude/commands/` is for personal commands only.*

---

**Q31.** A custom command needs to use `$ARGUMENTS` to accept user input. A developer invokes it as `/generate-tests src/auth.ts`. What does `$ARGUMENTS` resolve to?

A) `generate-tests`
B) `src/auth.ts`
C) `/generate-tests src/auth.ts`
D) An empty string

**Answer: B**
*`$ARGUMENTS` resolves to everything typed after the command name: `src/auth.ts`. The command name itself is not included.*

---

**Q32.** When should you use a Skill instead of a Custom Command?

A) When the action involves reading files
B) When you need a group of related commands with shared hooks and configuration
C) When you want to restrict tool access
D) Custom commands and skills are interchangeable

**Answer: B**
*Skills group related commands, hooks, and configuration into a cohesive capability bundle. Use a Skill when you have multiple related sub-commands and shared lifecycle hooks. Custom commands are for single, standalone actions.*

---

**Q33.** A CI/CD pipeline needs to run Claude to generate a changelog from git log. Which invocation is correct?

A) `claude "Generate changelog from git log"`
B) `claude -p "Generate changelog from the git log output: $(git log --oneline -20)"`
C) `claude --interactive "Generate changelog"`
D) `claude start --task "Generate changelog"`

**Answer: B**
*Non-interactive mode uses `-p` flag with the prompt. Shell command output can be substituted directly. Option A starts an interactive session. Option C is not a valid flag. Option D is not a real command.*

---

**Q34.** A PreToolUse hook returns exit code 1 when invoked before a Bash command. What happens?

A) Claude logs a warning and proceeds
B) Claude skips the tool call and continues the session
C) The tool call is blocked and Claude receives a block notification
D) The session terminates

**Answer: C**
*A non-zero exit code from a PreToolUse hook blocks the tool call. Claude receives information about the block and can adjust its approach. The session continues; only that specific tool call is prevented.*

---

**Q35.** As of June 15, 2026, what is the key difference between interactive credits and Agent SDK credits?

A) Interactive credits are cheaper per token
B) They are separate pools — CI/CD and programmatic calls use Agent SDK credits, not the interactive limit
C) Agent SDK credits have no limit
D) Interactive credits can only be used in Claude.ai, not the API

**Answer: B**
*The June 2026 change created separate accounting. Interactive REPL sessions use one pool; programmatic/CI calls via the Agent SDK use another. This prevents CI pipelines from consuming a developer's interactive quota.*

---

**Q36.** A CLAUDE.md file in the project root contains instructions to "always add tests for new functions." A developer's personal `.claude/CLAUDE.md` says "skip tests unless explicitly asked." What happens?

A) Personal settings override project settings — tests are skipped
B) Project settings override personal settings — tests are always added
C) Both apply — Claude uses whichever was loaded last
D) Claude asks the user which setting to follow

**Answer: B**
*Project CLAUDE.md has higher precedence. Team-shared settings override personal settings within a project. This ensures code quality standards are enforced consistently.*

---

**Q37.** What is the `allowed_tools` frontmatter in a custom command used for?

A) Specify which external APIs the command can call
B) Restrict which Claude tools (Read, Write, Bash, etc.) the command can invoke
C) List the team members who can use the command
D) Define the maximum token budget for the command

**Answer: B**
*`allowed_tools` in YAML frontmatter limits which Claude built-in tools the command can call. For example, a read-only review command could set `allowed_tools: [Read, Grep]` to prevent any writes.*

---

**Q38.** A team wants Claude Code to automatically run linting after every file write. Where should this automation be configured?

A) In each custom command's `allowed_tools` list
B) As a PostToolUse hook that triggers on Write tool calls
C) In the project CLAUDE.md with instructions
D) As a cron job outside of Claude Code

**Answer: B**
*PostToolUse hooks fire after specific tool calls. A hook matching the `Write` tool can automatically run linting. CLAUDE.md instructions are guidance, not enforced automation. Cron jobs are external to Claude Code.*

---

**Q39.** A custom command for code review should not be able to make network calls or install packages. How is this enforced?

A) Write instructions in the command file telling Claude not to use network tools
B) Set `allowed_tools: [Read, Grep, Bash]` and configure Bash permissions to deny network commands
C) The command file automatically inherits project-level tool restrictions
D) Custom commands cannot use Bash by default

**Answer: B**
*Combine `allowed_tools` to limit which tools the command can use, and configure the `permissions.deny` list in settings.json to block specific Bash patterns (e.g., `curl`, `npm install`). Instructions alone are not enforced.*

---

## Domain 4 — Prompt Engineering & Structured Output (20%)

### Core Concepts

**Adaptive Reasoning effort levels**: `standard` → `high` → `xhigh` → `max`
**`display: "omitted"`**: Reasoning happens internally; not transmitted. Use for production APIs.
**Prompt cache minimum**: 1,024 tokens for a prefix to be cacheable.
**Stable prefix design**: Stable content first, variable content last.
**XML tags**: More reliable than Markdown for nested structured output.
**Prefill**: Pre-populating the assistant turn to force a specific output format.

---

### Domain 4 Practice Questions

**Q40.** A developer wants Claude to extract 10 specific fields from insurance claims. The extraction logic is clear and unambiguous. Which prompt engineering technique adds the most value?

A) Chain-of-thought with step-by-step reasoning
B) Extended thinking with `effort: "xhigh"`
C) Explicit JSON output schema with field names and types
D) Role prompting as an "insurance expert"

**Answer: C**
*For extraction tasks, a clear output schema is the most effective technique. CoT and extended thinking add cost with no quality gain for well-defined extraction. Role prompting is less impactful than explicit format specification.*

---

**Q41.** An application uses a 15,000-token system prompt that is identical for every user request. What is the most effective cost optimisation?

A) Switch to a cheaper model
B) Add `cache_control: {type: "ephemeral"}` to the system prompt
C) Reduce the system prompt to under 1,000 tokens
D) Use the Batch API

**Answer: B**
*Prompt caching with a 15K-token stable prefix achieves ~90% cost reduction on that prefix. The 1,024-token minimum is easily met. The Batch API adds latency and isn't appropriate for synchronous user interactions.*

---

**Q42.** A developer uses `thinking: {type: "enabled", effort: "high", display: "omitted"}`. A user asks: "Why did the AI reach this conclusion?" What can the developer show them?

A) The full thinking chain from the API response
B) Nothing — the thinking is not transmitted when display is omitted
C) A summary of the thinking blocks
D) The reasoning is stored in the `metadata` field

**Answer: B**
*`display: "omitted"` means no `thinking_delta` events are emitted. The reasoning happens internally in the model but is never transmitted. There is nothing to show the user.*

---

**Q43.** Which effort level is most appropriate for classifying support tickets into 5 priority categories?

A) `standard`
B) `high`
C) `xhigh`
D) `max`

**Answer: A**
*Classification with clear categories is a routine task. `standard` effort is sufficient. Higher effort levels add latency and cost with no quality benefit for well-defined classification tasks.*

---

**Q44.** A prompt that includes sensitive user context changes on every request. A stable 2,000-token system prompt stays the same. What is the correct cache structure?

A) Cache the entire message including user context
B) Cache only the user context
C) Cache the system prompt with `cache_control`; leave user context uncached
D) Cache nothing — the request changes too often

**Answer: C**
*Only the stable prefix (system prompt) should be marked for caching. The variable user context must not be cached — it changes every request and would create a cache miss on every call anyway. Caching the stable prefix still achieves significant savings.*

---

**Q45.** Which output format is most reliable for deeply nested structured data with mixed text and structured sections?

A) Markdown with headers
B) Plain text with numbered sections
C) JSON only
D) XML tags for structure with text content inside tags

**Answer: D**
*XML tags are more reliable than Markdown for nested structures because they have explicit open/close boundaries. JSON is reliable for pure data but awkward when mixed with free text. Markdown is ambiguous for nesting.*

---

**Q46.** A developer pre-fills the assistant turn with `[` before Claude responds. What is the purpose?

A) To confuse Claude into thinking it started its response
B) To force the response to begin as a JSON array
C) To save tokens by starting the response early
D) This is not a valid API pattern

**Answer: B**
*Prefill (pre-populating the assistant turn) forces Claude to continue from that starting point. Starting with `[` forces a JSON array format. This is a legitimate technique documented in the API.*

---

**Q47.** A system prompt contains both static instructions (2,500 tokens) and a dynamic document that changes daily (8,000 tokens). How should cache breakpoints be placed?

A) Cache only the static instructions
B) Cache only the dynamic document
C) Cache the static instructions first, then cache the dynamic document separately
D) Cache the entire prompt as a single block

**Answer: C**
*Place static content first with a cache breakpoint, then dynamic content with a separate breakpoint. Requests within the same day get both cache hits. New days still get a hit on the static instructions. Up to 4 cache breakpoints per request are supported.*

---

**Q48.** An agent prompt contains: "Be concise. Explain your reasoning in detail. Answer briefly." What problem does this create?

A) Token waste
B) Conflicting directives — Claude cannot simultaneously be concise and explain in detail
C) Prompt injection risk
D) Cache inefficiency

**Answer: B**
*Conflicting directives produce unpredictable output. Claude may follow one instruction and ignore the other, or blend them inconsistently. System prompts should be audited for contradictions.*

---

**Q49.** When should you NOT use chain-of-thought prompting?

A) For architecture design decisions
B) For extracting structured data from a well-defined schema
C) For complex multi-step reasoning
D) For novel mathematical problems

**Answer: B**
*CoT adds tokens and latency. For well-defined extraction where the answer is deterministic, CoT provides no quality benefit. It is valuable for reasoning, architecture, and novel problems.*

---

**Q50.** Which system prompt instruction most effectively reduces Claude's hallucination rate on factual questions?

A) "Always answer confidently."
B) "Never say you don't know."
C) "If you are uncertain, say so. Distinguish between what you know and what you're inferring."
D) "Use extended thinking for all questions."

**Answer: C**
*Explicitly permitting Claude to express uncertainty reduces confident hallucinations. Instructing Claude to "always answer confidently" or "never say you don't know" actively increases hallucination risk.*

---

**Q51.** A tool's description says "Search the database." Claude frequently uses it when it shouldn't. What is the fix?

A) Rename the tool to a more descriptive name
B) Add "When NOT to use this tool" guidance to the description
C) Reduce the tool's parameter count
D) Increase the `max_tokens` for the response

**Answer: B**
*Adding explicit "when NOT to use" guidance to the description is the most effective fix for over-triggering. Tool names help but descriptions govern invocation decisions.*

---

## Domain 5 — Context Management & Reliability (15%)

### Core Concepts

**Context strategies**: Summarisation (semantic compression), truncation (lose content), retrieval (RAG)
**Files API**: Upload once → `file_id` → reference in multiple requests — no repeated encoding
**Batch API**: 100k requests, 50% discount, async, <1 hour typical, expires in 24 hours
**"Lost in the middle"**: Performance degrades for content placed in the middle of very long contexts
**Prompt caching + Files API**: Stack both for maximum cost reduction
**Timeout handling**: Don't just retry — implement partial result recovery

---

### Domain 5 Practice Questions

**Q52.** A conversational agent has been running for 2 hours. The conversation log is 900K tokens. The model has a 1M token context. What should happen proactively?

A) Let it fill to 1M tokens, then crash
B) Truncate the oldest 400K tokens to stay within limits
C) Summarise older turns and store summaries externally; keep recent turns verbatim
D) Switch to a smaller, cheaper model

**Answer: C**
*Summarisation with external storage preserves semantic content while managing context size. Truncation loses content. Letting it hit the limit causes errors. Switching models is a last resort and loses history.*

---

**Q53.** A document is referenced in 500 API requests per day. Each request base64-encodes the 2MB PDF. What is the most efficient approach?

A) Compress the PDF before encoding
B) Use the Files API — upload once, reference by file_id in all 500 requests
C) Cache the base64 string in the application
D) Split the document into smaller chunks

**Answer: B**
*The Files API eliminates repeated base64 encoding and reduces network transfer. One upload creates a `file_id` reused in all 500 requests. This is the purpose of the Files API.*

---

**Q54.** An application needs to analyse 50,000 customer feedback records overnight. Response time is not critical. What is the best approach?

A) Make 50,000 synchronous API calls in parallel
B) Use the Batch API — 50% cost discount, async processing, results available within hours
C) Stream all 50,000 requests using the streaming API
D) Use a single 50,000-request prompt

**Answer: B**
*Batch API is explicitly designed for this: non-time-sensitive, high-volume workloads at 50% discount. Parallel sync calls would hit rate limits. Streaming is for single-request use. A single 50K-request prompt is not a real pattern.*

---

**Q55.** For a 1M token context window request, where should the most critical content be placed?

A) In the middle of the context
B) Distributed evenly throughout
C) At the beginning or end of the context
D) Placement doesn't affect performance

**Answer: C**
*The "lost in the middle" phenomenon means models perform worse on content in the middle of very long contexts. Critical information should be placed at the start or end.*

---

**Q56.** A Batch API request is submitted at 9:00 AM. By what time will it expire if not processed?

A) 1 hour
B) 6 hours
C) 24 hours
D) 72 hours

**Answer: C**
*Batch API requests expire if not processed within 24 hours. Most batches complete within 1 hour, but the SLA allows up to 24 hours.*

---

**Q57.** An agent calls an external API that times out after 30 seconds. The agent should:

A) Immediately retry with the same parameters
B) Wait 30 seconds and retry once
C) Implement exponential backoff with jitter; after max retries, return partial results with error flag
D) Switch to a different model

**Answer: C**
*Exponential backoff with jitter is the standard retry pattern for transient failures. Returning partial results with an error flag is better than complete failure. Immediate retry can overwhelm a struggling service.*

---

**Q58.** Which combination achieves the maximum cost reduction for an application that processes the same 20,000-token document for every user query?

A) Batch API + smaller model
B) Prompt caching with `cache_control` + Files API
C) Streaming API + parallel requests
D) Extended thinking with `effort: "standard"`

**Answer: B**
*Files API eliminates base64 encoding overhead and network transfer. Prompt caching on the stable document prefix achieves 90% cost reduction on those tokens. These two stack for maximum savings.*

---

**Q59.** A RAG system retrieves 20 documents to answer a question. The context window can fit all 20, but performance is degraded. What is the better approach?

A) Use a model with a larger context window
B) Re-rank and include only the top 5 most relevant documents
C) Summarise all 20 documents before including them
D) Include all 20 to ensure no information is missed

**Answer: B**
*Re-ranking and limiting to the most relevant documents improves performance and reduces cost. More context is not always better — quality of retrieved content matters more than quantity. Summarising 20 documents adds latency without necessarily improving relevance.*

---

**Q60.** A batch job submits 10,000 requests. 500 fail with error type `overloaded`. What is the correct response?

A) Resubmit all 10,000 requests
B) Wait 24 hours before resubmitting
C) Retrieve the results, identify the 500 failed requests, and resubmit only those with backoff
D) Overloaded errors cannot be retried

**Answer: C**
*Overloaded (529) errors are transient and retryable. Identify failed requests from the batch results, then resubmit only failures — not the entire batch. Apply exponential backoff before resubmitting.*

---

## Rapid-Fire Review — Key Numbers to Memorise

| Fact | Value |
|------|-------|
| Passing score | 720 / 1000 |
| Exam duration | 120 minutes |
| Question count | 60 |
| Batch API discount | 50% off standard pricing |
| Batch API max requests per batch | 100,000 |
| Batch API expiry | 24 hours |
| Prompt cache minimum prefix | 1,024 tokens |
| Prompt cache discount on reads | 90% off input price |
| Prompt cache TTL | 5 minutes (resets on each hit) |
| Max cache breakpoints per request | 4 |
| Sonnet 4.6 SWE-bench score | 79.6% |
| Opus 4.5 retirement (earliest) | November 24, 2026 |
| CAI 2.0 publication date | January 22, 2026 |
| Constitutional AI 2.0 length | ~84 pages / 23,000 words |
| CCAF exam cost | $99 |
| Opus pricing | $5 input / $25 output per MTok |
| Sonnet pricing | $3 input / $15 output per MTok |
| Haiku pricing | $1 input / $5 output per MTok |
| Context window (Opus/Sonnet) | 1M tokens |
| Agent SDK credit split date | June 15, 2026 |

---

## Last-Day Study Plan

### Day Before Exam

**Morning (2 hours)**
- Re-read Domain 1 practice questions (highest weight at 27%)
- Focus on: pattern selection rationale, HITL/HOTL/HOOL distinctions, memory types

**Afternoon (2 hours)**
- Work through Domain 4 questions (prompt engineering)
- Memorise: effort levels, cache structure, conflicting directives examples

**Evening (1 hour)**
- Rapid-fire numbers table above
- Review any questions you got wrong in this guide
- Light review of Domains 2, 3, 5

### Exam Day Strategy

1. **Read every option before answering** — several questions have traps (e.g., "Option B is almost right except...")
2. **Elimination first** — for scenario questions, eliminate 2 options before choosing
3. **Pattern for agentic questions**: ask "What does the minimal footprint principle say here?"
4. **Pattern for prompt questions**: ask "Does this technique add real value or just cost?"
5. **Flag difficult questions** and return at the end — don't spend >3 minutes on any single question
6. **Budget**: 120 min / 60 questions = 2 min average. Flag and move on.
