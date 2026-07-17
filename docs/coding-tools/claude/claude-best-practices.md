---
title: "How to Use This Guide"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
source_type: converted-pdf
covers_version: "N/A"
doc_type: guide
source_file: ""
tags: ["coding-tools", "claude"]
---
**CLAUDE ARCHITECT FOUNDATIONS**
**Best Practices &**
**Anti-Patterns Guide**
*A Reference for the Claude Certified Architect – Foundations Exam*
Covering all 5 domains · 25+ task statements · 6 exam scenarios
March 2026

# How to Use This Guide
This document synthesizes Anthropic's official documentation, the Claude Certified Architect exam guide, and current production patterns into a single reference. Each section follows the same structure: a conceptual overview, a best practices vs. antipatterns comparison table, and detailed guidance with real-world context.

| Domain | Key Best Practices |
| --- | --- |
| Domain 1
(27%) | Agentic loop termination · Multi-agent hub-and-spoke · Context passing · Hooks for deterministic enforcement · Task decomposition · Session management |
| Domain 2
(18%) | Tool description quality · Structured MCP error responses · Least-privilege tool distribution · Project vs user MCP scoping · Grep vs Glob selection |
| Domain 3
(20%) | CLAUDE.md hierarchy · Path-scoped rules · Plan mode vs direct execution · Slash commands & skills · CI/CD with -p flag |
| Domain 4
(20%) | Explicit criteria over vague instructions · Few-shot for consistent output · tool_use for schema compliance · Retry loops · Batch API SLA constraints |
| Domain 5
(15%) | Persistent facts blocks · Lost-in-the-middle mitigation · Escalation triggers · Structured error propagation · Provenance preservation |

## **Domain 1 — Agentic Architecture & Orchestration  (27%)**

Agentic systems extend Claude beyond single-turn responses into multi-step, tool-driven loops that gather context, take action, verify results, and repeat. This domain covers how to architect those loops correctly, orchestrate multiple agents, and enforce business rules deterministically.

## **1.1  Agentic Loop Termination**

The core agentic loop pattern is: send request → check stop_reason → if 'tool_use', execute tool and append result → loop back; if 'end_turn', terminate. Every deviation from this pattern introduces fragility.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Terminate on stop_reason === 'end_turn'; continue on 'tool_use'. This is the API contract, not a heuristic. | Parsing Claude's text content for phrases like 'TASK COMPLETE' to detect completion. Natural language signals are unreliable. |
| Append every tool result to conversation history before the next API call so Claude accumulates information across iterations. | Discarding tool results after each step. Each iteration then starts without the findings of prior steps. |
| Set an explicit MAX_ITERATIONS cap in orchestration code. Terminate gracefully and escalate when exceeded. | Unbounded loops with no iteration limit. A stuck agent can run indefinitely, exhausting budget without progress. |
| Implement circuit-breaker logic: detect repeated identical tool calls without state change and escalate rather than retry. | Allowing the agent to call the same tool dozens of times in a row with no detection of the runaway loop. |

## **1.2  Multi-Agent Orchestration**

Hub-and-spoke is the correct topology: ALL communication between subagents routes through the coordinator. Direct subagent-to-subagent communication breaks observability, consistent error handling, and makes debugging nearly impossible.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Route all inter-subagent communication through the coordinator. The coordinator is the single source of truth. | Allowing subagents to communicate directly with each other, creating unobservable side channels. |
| Design coordinator prompts around research GOALS and quality criteria rather than step-by-step procedures. | Over-specifying coordinator procedures, which prevents adaptive task decomposition when subtopics vary in complexity. |
| Emit multiple Task tool calls in a SINGLE coordinator response to achieve parallel subagent execution. | Emitting Task calls across separate turns, which forces sequential execution even when tasks are independent. |
| Set maximum wait times for parallel subagents; proceed with partial results and flag missing coverage explicitly. | Waiting indefinitely for all subagents to return before the pipeline can produce any output. |

| KEY INSIGHT: Coordinator Task Decomposition Determines Coverage The most common multi-agent failure is overly narrow task decomposition by the coordinator — not downstream agent failures. If you research 'creative industries' and the coordinator decomposes into only visual arts subtasks, all downstream agents will execute correctly but the report will still miss music, writing, and film. Always audit your coordinator's subtask generation, not just the quality of individual subagent outputs. |
| --- |

## **1.3  Subagent Context & Isolation**

Subagents start with an empty context window. They do NOT inherit coordinator context, prior subagent outputs, or any findings from other pipeline stages unless those are explicitly passed in their Task prompt.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Explicitly pass all required context into each subagent's Task prompt — prior findings, source materials, constraints, and the specific subtask. | Assuming subagents share context with the coordinator or with each other. They have isolated context windows by design. |
| Include 'Task' in the coordinator's allowedTools configuration to enable subagent spawning. | Expecting the coordinator to spawn subagents without 'Task' in allowedTools. The tool simply won't be available. |
| Pass structured data (key facts, citations, relevance scores) rather than verbose summaries when context budgets are constrained. | Passing entire 3,000-word subagent output verbatim to downstream agents, exhausting their context budgets. |
| Use structured data formats that separate content from metadata (source URLs, dates, document names) to preserve provenance. | Passing mixed content-and-citation strings that downstream agents cannot parse programmatically. |

## **1.4  Hooks for Deterministic Enforcement**

Claude is probabilistic. Prompt instructions have non-zero failure rates. When a business rule requires GUARANTEED compliance — financial thresholds, identity verification, audit logging — hooks provide the determinism that prompts cannot.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Use PreToolUse hooks to block disallowed tool calls before execution (e.g., intercept process_refund when amount > $500). | Relying on system prompt instructions ('never process refunds above $500') to enforce financial policy. Will fail at some rate. |
| Use PostToolUse hooks for data normalization — converting Unix timestamps, inconsistent status codes, or mixed formats before the model processes them. | Asking Claude to normalize data formats via instructions. The model occasionally misinterprets edge case formats. |
| Use PostToolUse hooks for audit logging — capturing file paths, content sizes, and timestamps without affecting agent behavior. | Post-hoc filesystem monitoring. Captures events but loses Claude's intent and reasoning context for each action. |

| DETERMINISTIC vs. PROBABILISTIC The exam's most important concept: hooks = deterministic (the code either runs or it doesn't), prompts = probabilistic (a very good model still fails 1–3% of cases at scale). For business logic that cannot tolerate ANY failures — identity verification before financial transactions, security policy enforcement, compliance audit trails — always use programmatic enforcement via hooks. Never rely on prompt instructions alone. |
| --- |

## **1.5  Task Decomposition Strategies**

Two primary strategies: Prompt chaining (fixed sequential steps) and Dynamic adaptive decomposition (subtasks generated based on intermediate discoveries). Choosing correctly determines whether complex tasks succeed or produce incomplete results.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Prompt chaining: use for predictable multi-aspect tasks with known structure (per-file code review → cross-file integration pass). | Using prompt chaining for open-ended tasks with unknown structure. Fixed steps cannot adapt when discoveries reveal unexpected complexity. |
| Dynamic adaptive decomposition: use when the correct next step depends on what the current step discovers (legacy codebase analysis, novel research). | Using step-by-step fixed pipelines for exploratory tasks. The agent cannot adapt when initial assumptions prove incorrect. |
| Split large reviews into focused passes: per-file local analysis + separate cross-file integration pass for data flow. | Single-pass review of 14+ files. Attention dilutes — some files get thorough review, others get superficial attention. |

## **1.6  Session Management**

Named sessions, fork_session, /compact, and --resume are tools for managing expensive, long-running analysis sessions. Use the right tool for the right situation.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Use fork_session to branch from a shared analysis baseline when exploring two competing approaches simultaneously. | Exploring divergent approaches sequentially in a single session, polluting earlier analysis with later conclusions. |
| Use /compact during extended sessions to summarize earlier conversation while retaining key findings and continuing work. | Starting a fresh session when context fills — loses all accumulated analysis. /compact preserves discoveries. |
| When resuming after file modifications, explicitly inform the agent which specific files changed for targeted re-analysis. | Resuming a session assuming the agent knows what changed. It will apply stale analysis to modified files. |

## **Domain 2 — Tool Design & MCP Integration  (18%)**

Tool quality is the most under-appreciated factor in agent reliability. A model cannot use a tool well if it cannot understand what the tool does, what it expects, and when to choose it over similar tools.

## **2.1  Tool Descriptions as the Primary Selection Mechanism**

The LLM uses tool descriptions — not the tool name, not the system prompt — as the primary signal for tool selection. Minimal descriptions produce unreliable selection. Every tool needs four elements: what it does, what it accepts, what it returns, and when to use it versus similar tools.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Include input formats accepted, 2–3 example queries, output schema, and disambiguation from similar tools in every description. | 'Gets customer data.' — minimal descriptions cause unreliable selection especially among tools with overlapping names. |
| When a specialist tool is underused in favor of a general one, update the specialist's description to explain WHY it's better for specific cases. | Adding system prompt instructions 'always use the Jira MCP for ticket operations'. Instructions are less reliable than descriptions. |
| Split multi-purpose tools into purpose-specific variants with clear, non-overlapping descriptions. | A single analyze_document tool with a 'mode' parameter covering citation extraction, summarization, and verification. |

## **2.2  Structured Error Responses**

Tool errors must include enough information for the agent to make an intelligent recovery decision. All errors looking identical forces the agent to guess — leading to inappropriate retries or missed escalations.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Return structured errors: errorCategory (transient/validation/business/permission), isRetryable (bool), and a customer-friendly explanation. | Returning generic 'Operation failed' for all error types. The agent cannot distinguish retry-worthy from non-retryable errors. |
| Distinguish valid empty results (query returned no matches) from access failures (service timeout) — they require different coordinator responses. | Returning identical error responses for 'no results found' and 'service unavailable'. The coordinator misclassifies coverage gaps as access failures. |
| For business errors (policy violations), include the specific policy constraint and actionable next steps in the error response. | Returning isError: true with no context for policy violations. The agent can't explain the rejection to the customer. |

| Error Category Reference TRANSIENT: Timeout, service unavailable — retry with backoff. VALIDATION: Invalid input format — ask user to clarify. BUSINESS: Policy violation, data constraint — explain to user, do not retry. PERMISSION: Authorization failure — escalate to admin. Each category requires a different agent response strategy. |
| --- |

## **2.3  Least-Privilege Tool Distribution**

Too many tools degrades selection reliability. Each agent should receive only the tools needed for its designated role. This improves selection accuracy, reduces security risk, and makes agents more predictable.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Assign each subagent only the tools relevant to its role (synthesis agents get synthesis tools, not web search tools). | Giving all agents access to all 18 tools. Selection reliability degrades significantly beyond 4–5 tools. |
| Give high-frequency simple operations a scoped tool (verify_fact) rather than full tool suite access. Handles 85% of cases; coordinator handles the 15% complex cases. | Routing every verification request through the coordinator. Adds 40% latency for cases that could be handled directly. |
| For CI review agents, include only review tools. Deployment tools should NEVER be accessible to review agents. | Giving a CI code review agent access to deployment and database migration tools. Creates risk of unintended production changes. |

## **2.4  MCP Server Configuration**

MCP configuration has two scopes: project-level (.mcp.json, version-controlled, shared with team) and user-level (~/.claude.json, personal, not version-controlled). Credentials must always use environment variable expansion, never hardcoded values.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Use .mcp.json at project root for team-shared MCP servers. Commit to version control so all developers get access on clone. | Configuring shared MCP servers in ~/.claude.json on each developer's machine. New team members miss the configuration. |
| Use ${GITHUB_TOKEN} syntax in .mcp.json for credentials. Each developer sets the environment variable locally. | Hardcoding credentials in .mcp.json, even with .gitignore. Risks accidental credential exposure across build artifacts. |
| Audit active MCP servers and deactivate those not needed day-to-day. Too many active servers = too many tools = degraded selection. | Configuring 12 MCP servers simultaneously. Tool proliferation causes the same selection problems as 18+ inline tools. |
| Use existing community MCP servers for standard integrations (Jira, GitHub, Slack). Reserve custom servers for proprietary workflows. | Building custom MCP servers for integrations that already have community implementations. Wastes development time and results in less-tested tooling. |

## **2.5  Built-in Tool Selection: Grep vs Glob vs Edit**

Claude Code's built-in tools have precise, non-overlapping use cases. Using the wrong tool for a task is a common source of subtle errors.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Glob (**/*.test.ts) for finding files by NAME pattern. Grep for finding files by CONTENT pattern. Never swap them. | Using Grep to find test files ('search for test'). Returns files containing the word test in their content, not test files by naming convention. |
| Always Read a file before using Edit on it to establish current state. Edit requires accurate anchor text. | Using Edit without a prior Read. Edit may silently no-op or match the wrong occurrence if the file was modified externally. |
| When Edit fails with 'non-unique match', fall back to Read + Write: load the full file, modify in memory, write back. | Repeatedly retrying Edit with the same anchor text after a non-unique match error. It will continue to fail. |
| Combine Glob + Grep for scoped content search: Glob to identify the file set, Grep to search contents within that set. | Using only Grep across all files when you only care about a specific subdirectory or file type. Processes irrelevant files. |

## **Domain 3 — Claude Code Configuration & Workflows  (20%)**

Claude Code's behavior is shaped by a hierarchy of configuration files, each with different scope and sharing properties. Understanding what loads when, and for whom, is essential for consistent team behavior.

## **3.1  CLAUDE.md Hierarchy**

Three levels: user (~/.claude/CLAUDE.md, personal, not version-controlled), project (.claude/CLAUDE.md, shared, version-controlled), and subdirectory (CLAUDE.md within directories, scoped to files in that subtree). All active levels load simultaneously.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Put team-shared standards in .claude/CLAUDE.md at project root and commit to version control. | Putting team standards in ~/.claude/CLAUDE.md. New team members get different behavior than existing members. |
| Use @import syntax to share common instruction blocks across multiple CLAUDE.md files without duplication. | Copy-pasting the same instructions into multiple CLAUDE.md files. Changes must be made in every copy. |
| Run /memory to audit which memory files are currently loaded when debugging inconsistent behavior. | Guessing which CLAUDE.md files are active based on the directory structure. /memory shows exactly what's loaded. |

## **3.2  Path-Scoped Rules**

Monolithic CLAUDE.md files load entirely for every session, wasting tokens on irrelevant conventions. .claude/rules/ files with YAML frontmatter path patterns load conditionally — only when editing files matching the glob.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Create .claude/rules/testing.md with paths: ['**/*.test.*'] to apply testing conventions to all test files regardless of directory. | Creating a CLAUDE.md in every directory containing test files. Cannot centrally manage conventions that span the codebase. |
| Split a monolithic CLAUDE.md into topic-specific rule files (testing.md, api-conventions.md, security.md) with path scopes. | A single 1,200-line CLAUDE.md that loads entirely for every session, filling context with irrelevant conventions. |
| Use separate path-scoped files for directory-specific conventions (src/postgres/**, src/mongodb/**) with their respective standards. | A single database.md covering multiple conflicting database conventions that always loads regardless of context. |

## **3.3  Slash Commands & Skills**

Slash commands package repeatable workflows. Skills package domain expertise with progressive disclosure. The key distinction for sharing: .claude/commands/ is project-scoped (version-controlled, shared), ~/.claude/commands/ is personal (not shared).

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Put team slash commands in .claude/commands/ and commit to version control. All developers get them on clone. | Creating shared team commands in ~/.claude/commands/. Not shared via version control — every developer must copy manually. |
| Use context: fork in skill frontmatter for skills that produce verbose intermediate output (codebase analysis). Returns summary only to main conversation. | Running large exploration skills without context: fork. All intermediate output pollutes the main conversation context. |
| Create personal variants in ~/.agents/skills/ with a different name rather than modifying team skills in .agents/skills/. | Editing .agents/skills/ directly for personal customization. Affects all teammates via version control. |
| Use $ARGUMENTS placeholder in skill body and argument-hint in frontmatter to create parameterized skills. | Creating a separate skill file for each module name or variation. Leads to combinatorial skill proliferation. |

## **3.4  Plan Mode vs. Direct Execution**

Plan mode enables safe codebase exploration and architectural design before committing to changes. Direct execution is for well-scoped, simple changes where the correct approach is already known.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Plan mode for: architectural decisions, large-scale refactoring, multi-file changes, tasks where the correct approach depends on codebase analysis. | Using plan mode for every task including simple single-file bug fixes. Adds unnecessary overhead for well-scoped changes. |
| Direct execution for: single-file bug fixes with clear stack traces, adding a known validation check, routine well-defined changes. | Using direct execution for monolith-to-microservices restructuring. Commits to implementation before discovering dependency complexity. |
| When the correct implementation depends on discovering codebase patterns (sync vs async, existing patterns), use plan mode to investigate first. | Directly implementing 'add error handling' without analyzing whether affected transactions are sync or async. |

## **3.5  CI/CD Integration**

Claude Code integrates into CI pipelines via non-interactive mode. The correct flag, output format, and retry logic determine whether the integration is reliable or brittle.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Use -p (or --print) flag for non-interactive CI mode: claude -p 'prompt'. Processes prompt, outputs to stdout, exits. | Running claude without -p in CI. The process waits for interactive input and hangs indefinitely. |
| Use --output-format json to produce machine-parseable output. Parse programmatically to check severity, fail builds, extract findings. | Parsing Claude's prose output with regex to detect critical issues. Fragile and misses findings with varied phrasing. |
| Provide existing test files in context when generating tests to prevent duplicate test case generation. | Generating tests without context of existing test suite. Produces duplicate coverage and wastes tokens. |
| Use Message Batches API ONLY for non-blocking jobs (nightly reports, weekly audits). Use synchronous API for pre-merge checks developers wait for. | Switching pre-merge blocking checks to Message Batches for cost savings. 24-hour SLA is incompatible with developer wait time. |

## **Domain 4 — Prompt Engineering & Structured Output  (20%)**

Prompt engineering is the discipline of communicating intent to Claude with enough precision that outputs are consistent, correct, and well-formed. Context engineering — managing everything in the context window including tools, examples, and conversation history — is its natural extension.

## **4.1  Explicit Criteria Over Vague Instructions**

Vague quality descriptors ('thoroughly', 'carefully', 'high-confidence only') produce inconsistent results because they don't specify WHAT to do or avoid. Explicit, enumerated criteria produce consistent, measurable outputs.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Enumerate specific review categories: 'Check for: null pointer dereference, SQL injection, off-by-one errors. Skip minor style issues.' | 'Thoroughly check the code for issues.' Inconsistent depth — some runs detailed, others superficial, no shared definition of thorough. |
| Define escalation criteria by case type: 'Escalate if: customer explicitly requests human, policy is silent on the request, error persists after 2 retries.' | Using sentiment or frustration level as an escalation proxy. Frustrated customers may have simple issues; calm customers may have unsolvable ones. |
| When false positives in one category undermine trust in all categories, temporarily disable that category while improving its prompt. | Keeping a high-false-positive category active. It erodes developer trust in the entire review system, not just that category. |

## **4.2  Few-Shot Examples**

Few-shot examples are the most reliable technique for consistent output format and behavior. Examples show rather than describe — and showing is more reliable than describing.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Wrap examples in <example> tags inside <examples> so Claude distinguishes them from instructions. Include 3–5 examples. | Embedding examples as free-form text mixed with instructions. Claude may treat example content as instructions to follow. |
| After one successful happy-path example, prioritize edge case examples: missing fields, non-standard layouts, ambiguous values. | Adding 5 more happy-path examples. The model already understands the standard case — edge cases are where it fails. |
| For consistently missed behaviors, provide a concrete failing input/output example rather than more detailed prose description. | After 8 iterations of refined prose, still not communicating the edge case. Concrete test cases communicate better than descriptions. |
| For escalation calibration, use few-shot examples showing exactly which case types escalate and which resolve autonomously. | Relying on a separate ML classifier to predict escalation. Over-engineered before few-shot optimization has been fully explored. |

## **4.3  Structured Output via Tool Use**

tool_use with JSON schemas eliminates syntax errors. It does NOT eliminate semantic errors. Two-layer validation is required for production extraction systems.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Use tool_use with JSON schema for extraction. Guarantees schema-compliant output, eliminates JSON syntax errors at the source. | Post-processing prose output with a JSON repair library. Treats symptoms, not the cause, and still fails on edge cases. |
| Make schema fields optional/nullable when source documents may not contain the information. | Marking all fields required. Forces the model to fabricate plausible-looking values for absent information (hallucination). |
| Add 'other' + companion detail field to enums for extensible categorization. Prevents misclassification when new types emerge. | Hard-coding a closed enum with no 'other' option. New document types get misclassified as the nearest existing category. |
| Apply application-level semantic validation (line items sum to total, dates are chronological) as a second layer after schema compliance. | Assuming tool_use guarantees semantic correctness. Schemas validate structure, not business logic. |

## **4.4  Validation and Retry Loops**

Retries are effective only when the model CAN produce the correct output but didn't. When information is absent from the source, retrying with error feedback will produce no improvement.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| On semantic validation failure, retry with the SPECIFIC error ('line items sum to $1,450 but stated_total is $1,200') not a generic retry. | Generic retry request without specifying what failed. The model has no guidance on what to correct. |
| When the target field is absent from the source document, provide the correct source document — not a retry. | Retrying 5 times when payment_terms is missing because it's in a separate Terms & Conditions PDF not included in context. |
| Scope retries to specific failed fields, cap at 2 retries per field, then flag for human review. | Full document re-extraction on every semantic error. 4x cost increase with minimal accuracy improvement. |
| For textual number representations ('ten percent'), retry with explicit conversion instructions: 'Convert written numbers to decimal equivalents.' | Flagging for human review immediately. This is a format error the model can resolve with targeted instruction, not absent information. |

## **4.5  Message Batches API**

The Batches API provides 50% cost savings and processes requests asynchronously with up to a 24-hour window. This SLA makes it appropriate only for non-blocking workflows.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Use Batches API for: nightly technical debt reports, weekly compliance audits, overnight document ingestion pipelines. | Using Batches API for pre-merge code review checks that developers are waiting on. A 24-hour SLA is incompatible with developer workflow. |
| Use custom_id to correlate request/response pairs. Identify and re-submit only failed documents (not the entire batch) on partial failure. | Re-submitting all 500 documents when 47 fail. custom_id enables surgical retry of only the failed subset. |
| Batches API does not support multi-turn tool calling. Pre-fetch external data and include it as context in each batch request. | Designing batch requests that require mid-processing MCP tool calls. The batch will fail for all requests needing tool use. |
| For a 30-hour SLA, submit batches at most every 6 hours to guarantee completion within the window (30 - 24 = 6 hour submission buffer). | Submitting once every 24 hours for a 30-hour SLA. If a batch takes the maximum 24 hours, it misses the SLA. |

## **4.6  Multi-Instance Code Review**

A model retains its reasoning context from code generation, making it less likely to catch its own mistakes in the same session. Independent review instances without prior context are significantly more effective.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Use an independent Claude instance with no prior context for code review. Fresh context means no anchoring bias. | Asking Claude to review code it just generated in the same session. It is anchored to its own reasoning and misses subtle errors. |
| Use a security-specialized review instance with a system prompt focused on auth vulnerabilities for authentication code review. | Running a general security review on the full codebase and filtering results. Specialist prompts catch domain-specific issues general prompts miss. |
| Validate that code passed to the independent review instance is readable (not minified/obfuscated) before submission. | Passing transpiled output or minified code to the review instance. Independent instance isolation doesn't help if the input itself is unreadable. |

## **Domain 5 — Context Management & Reliability  (15%)**

As conversations grow longer and agent sessions extend, context quality degrades. Numerical values get collapsed into vague summaries, middle sections get skipped, and accumulated tool output crowds out reasoning space. Proactive context engineering prevents these failure modes.

## **5.1  Preventing Context Degradation**

Context degrades in two ways: progressive summarization loses precision (specific numbers collapse to 'some amount'), and the 'lost in the middle' effect causes models to omit findings from middle sections of long inputs.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Extract transactional facts (amounts, order IDs, dates, statuses, commitments) into a persistent 'case facts' block updated explicitly with every change. | Relying on progressive summarization to preserve exact numbers. '$75 credit' becomes 'partial credit' and then the agent contradicts itself. |
| Trim verbose tool outputs to only relevant fields before they accumulate. 40+ field API responses → 5 decision-relevant fields. | Passing full tool outputs directly into context. 40-field order records across 20 calls fill context with non-decision-relevant data. |
| Mitigate 'lost in the middle': place key findings at the beginning of aggregate inputs. Use explicit section headers for deep-middle content. | Ordering aggregate subagent results chronologically. Findings from agents 3-4 in an 8-agent pipeline are most likely to be omitted. |
| Have agents maintain scratchpad files recording key discoveries. Reference files persist beyond context window boundaries. | Relying on the context window to hold all codebase discoveries during a 4-hour 150-file analysis session. Context degrades and the agent cites generic patterns instead of specific classes. |

| Structured State for Crash Recovery Long-running agent pipelines must export state to known locations as they progress. The coordinator loads a manifest on resume and injects prior state into agent prompts. Without this, a crash at step 140 of 200 loses all prior work. Design state persistence before building the pipeline — retrofitting it is significantly harder. |
| --- |

## **5.2  Escalation Triggers**

Escalation must be driven by case characteristics, not by inferred emotional state. Three explicit triggers: (1) customer explicitly requests a human agent, (2) policy is ambiguous or silent on the request, (3) agent cannot make progress after N retries.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Honor explicit human agent requests immediately, without first attempting investigation or offering alternatives. | Investigating the issue before escalating when the customer has explicitly asked for a human. Delays service and ignores the explicit request. |
| Escalate when policy documentation is silent on the specific request. Policy GAPS are escalation triggers, not just policy VIOLATIONS. | Applying the closest matching policy autonomously when policy is silent. Creates unintended precedents and potential liability. |
| Include structured handoff summaries (customer ID, root cause, amounts, recommended action) in all escalations. Human agents lack conversation access. | Escalating with a vague summary. Human agents must re-investigate from scratch, negating the efficiency benefit of the AI triage. |

## **5.3  Structured Error Propagation**

Subagents must communicate failures with enough context for the coordinator to make intelligent recovery decisions. Generic status codes and silent error suppression both produce incorrect recovery behavior.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Return structured error context: failure type, attempted query, partial results, and potential alternative approaches. | Returning generic 'search unavailable' after timeout exhaustion. Coordinator cannot distinguish transient failures from permanent ones. |
| Distinguish valid empty results (no articles matching the query) from access failures (service timeout). They require different coordinator responses. | Returning both cases identically. Coordinator marks topics as not covered when they simply have no published literature. |
| For transient errors, auto-retry with exponential backoff first. If exhausted, provide specific customer-facing acknowledgment with follow-up commitment. | Surfacing 'Refund failed' immediately on first transient failure. One database lock error produces a misleading customer-visible error. |

## **5.4  Large Codebase Context Strategy**

Reading all files upfront is counterproductive for large codebases. Strategic loading — architecture first, targeted files second — produces better analysis with dramatically less token usage.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Start with architecture-level files (README, package.json, root CLAUDE.md, directory structure) to build a mental model before loading specific files. | Reading all 2,000 files upfront. Context fills at 300 files and performance degrades on the most critical analysis. |
| Design structured state persistence for long multi-agent pipelines. Each agent exports state; coordinator loads manifest on resume. | Relying on --resume flag alone for crash recovery. Stale tool results and no structured state means re-running from the beginning anyway. |
| Use Glob + Grep for strategic targeted discovery rather than reading every file. Find relevant files by pattern, then read only those. | Reading all files to find the ones containing a specific pattern. Glob + Grep achieves the same result in a fraction of the tokens. |

## **5.5  Provenance, Attribution & Uncertainty**

Research quality depends on preserving the origin of every claim from source through synthesis. Conflicting sources are not errors — they are findings that require attribution and confidence classification, not arbitrary resolution.

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Annotate conflicting statistics with source attribution and confidence classification. Distinguish well-established from contested findings. | Picking one value and presenting it as fact when two credible sources disagree. Reader cannot evaluate the disagreement. |
| Require publication/collection dates in subagent structured outputs. Temporal differences in data should be interpreted as growth, not contradiction. | Flagging 15% (2019) vs 67% (2024) as a contradiction. These are the same metric 5 years apart, not inconsistent sources. |
| Include source attribution, confidence level, and corroboration status for single-source findings. Flag as low-confidence until corroborated. | Including a single blog post's claim ('AI will replace 90% of jobs by 2026') as a key finding without credibility qualification. |
| Preserve claim-to-source mappings through synthesis steps. Synthesis agents should not lose attribution when combining findings. | Losing source attribution during synthesis. The final report makes unattributed factual claims that cannot be verified. |

## **Quick Reference — Critical Exam Decision Points**

## **The 8 Rules That Appear in Every Exam Scenario**

### **Rule 1: Deterministic vs. Probabilistic Enforcement**

| When to Use | Mechanism |
| --- | --- |
| Identity verification before transactions, financial thresholds, audit logging, security policy | Programmatic hooks (PreToolUse / PostToolUse). Never prompts alone. |
| Style guidelines, response tone, output format preferences | Prompt instructions and few-shot examples are sufficient. |

### **Rule 2: stop_reason Reference**

| Value | Action |
| --- | --- |
| tool_use | Execute the tool call, append the result to conversation history, send next request. |
| end_turn | Claude is done. Terminate the loop. Return final output to the caller. |

### **Rule 3: tool_choice Reference**

| Value | Behavior & When to Use |
| --- | --- |
| auto | Model decides whether to call a tool. Use when text response is an acceptable outcome. |
| any | Model MUST call a tool (its choice which). Use when structured output is mandatory but the specific tool is unknown. |
| {type: tool, name} | Model MUST call this specific tool. Use for forced extraction steps where the pipeline requires a known output. |

### **Rule 4: MCP Configuration Scope**

| File | Scope | Version Controlled? |
| --- | --- | --- |
| .mcp.json (project root) | Team — all developers on clone | YES |
| ~/.claude.json | Personal — current machine only | NO |
| .claude/CLAUDE.md | Project — all team developers | YES |
| ~/.claude/CLAUDE.md | Personal — current machine only | NO |
| .claude/commands/ | Project slash commands — shared | YES |
| ~/.claude/commands/ | Personal slash commands | NO |

### **Rule 5: When to Use Batch vs. Real-Time API**

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Batch API: Nightly reports, weekly audits, overnight document ingestion — anything with an SLA > 24 hours. | Batch API for pre-merge checks, customer-facing responses, or any workflow developers or customers wait on. |
| Real-time API: Pre-merge code review (developers waiting), customer support responses, any blocking pipeline step. | Real-time API for high-volume asynchronous jobs where 50% cost savings via Batch would be appropriate. |

### **Rule 6: Escalation Decision Matrix**

| Situation | Correct Action | Incorrect Action |
| --- | --- | --- |
| Customer explicitly requests human | Escalate immediately | Investigate first, then escalate |
| Policy document is silent on request | Escalate (policy gap trigger) | Apply nearest matching policy autonomously |
| Customer is frustrated, issue is simple | Resolve autonomously | Escalate based on sentiment |
| Error after 2 retries, still failing | Escalate with error context | Retry indefinitely |
| Request requires a policy EXCEPTION | Escalate to human decision-maker | Apply the exception unilaterally |

### **Rule 7: Schema Design for Extraction**

| ✅  BEST PRACTICE | ❌  ANTIPATTERN |
| --- | --- |
| Optional/nullable fields for data that may be absent. Returns null cleanly when not present. | Required fields for conditionally-present data. Forces hallucination of plausible-looking values. |
| Enum + companion 'detail' string for extensible categorization. | Closed enum with no 'other'. New types get force-fit into wrong categories. |
| Two-layer validation: tool_use (syntax) + application code (semantics: sums, date ordering, cross-field consistency). | Assuming tool_use = fully correct extraction. Schema validates structure only, not business logic. |

### **Rule 8: Grep vs. Glob vs. Edit Cheat Sheet**

| Tool | Use For | Example |
| --- | --- | --- |
| Grep | Search FILE CONTENTS for a text/pattern | Find all files calling processRefund() |
| Glob | Find FILES by NAME pattern | Find all test files: **/*.test.ts |
| Glob + Grep | Scoped content search | Find imports of legacy_utils in src/**/*.py |
| Edit | Precise in-place text replacement (unique anchor required) | Fix known bug on specific line |
| Read + Write | Full file replacement when Edit anchor is non-unique | Modify repeated log pattern appearing 8 times |

*——  End of Guide  ——*
