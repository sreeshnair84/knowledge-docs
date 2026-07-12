---
title: "CCAF Study Guide"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
source_type: converted-pdf
covers_version: "N/A"
doc_type: guide
source_file: ""
tags: ["coding-tools", "claude"]
---
**ANTHROPIC**
**Claude Certified Architect**
**Foundations (EAP-CCAF)**
Complete Exam Preparation Guide
*All 5 Domains  •  Practice MCQs  •  Flashcards  •  Quick-Revision Sheets*

## **Exam At-a-Glance**

| Attribute | Detail |
| --- | --- |
| Format | Multiple choice — 1 correct + 3 distractors per question |
| Passing Score | 720 / 1000 (scaled scoring) |
| Unanswered Questions | Scored as incorrect — always guess |
| Scenarios per exam | 4 of 6 possible scenarios (random) |
| Domain 1 | Agentic Architecture & Orchestration — 27% |
| Domain 2 | Tool Design & MCP Integration — 18% |
| Domain 3 | Claude Code Configuration & Workflows — 20% |
| Domain 4 | Prompt Engineering & Structured Output — 20% |
| Domain 5 | Context Management & Reliability — 15% |

| 🔴  HIGH-PRIORITY EXAM TOPIC Domains 1, 3 & 4 together account for 67% of exam content. Master these three first. There is NO penalty for guessing, so always answer every question. |
| --- |

# CCAF Study Guide
This guide is structured in five domain modules matching the exam blueprint. Each module contains:
Concept explanation (plain English, then technical deep-dive)
Architecture diagrams
Key definitions table
Comparison tables (VS concepts)
Exam traps & tips
Practice MCQs with explanations

**Recommended Study Order:**Domain 1 → Domain 3 → Domain 4 → Domain 2 → Domain 5 → Practice Questions → Flashcards → Quick-Revision Sheet.

**DOMAIN 1: Agentic Architecture & Orchestration — 27% of exam**

# **DOMAIN 1: Agentic Architecture & Orchestration**

*27% of scored content — the most heavily tested domain.*

## **1.1  The Agentic Loop Lifecycle**

### **Plain-English Explanation**

Imagine sending a message to Claude and giving it tools (like a calculator or a database lookup). Instead of responding once and stopping, Claude can decide to use a tool, get a result, think about it, use another tool, and eventually give you a final answer. This cycle is the agentic loop.

### **Technical Deep-Dive**

The agentic loop works via the API's stop_reason field:

| stop_reason Value | What to Do |
| --- | --- |
| stop_reason = "tool_use" | Claude wants to call one or more tools. Your code must execute those tools, append results to conversation history, and call the API again. |
| stop_reason = "end_turn" | Claude has finished. Present the response to the user. Loop terminates. |
| stop_reason = "max_tokens" | Token limit hit — handle gracefully, do NOT treat as end_turn. |

### **Architecture Diagram**

| ┌─────────────────────────────────────────────────────────────┐ │                     AGENTIC LOOP                           │ │                                                             │ │   User Prompt                                               │ │       │                                                     │ │       ▼                                                     │ │  ┌─────────┐  stop_reason=tool_use  ┌──────────────────┐   │ │  │  CLAUDE  │ ──────────────────────▶│  Execute Tools   │   │ │  │   API    │                        │  (your code)     │   │ │  └─────────┘ ◀──────────────────────└──────────────────┘   │ │       │        tool_result in history                       │ │       │ stop_reason=end_turn                                │ │       ▼                                                     │ │  Final Response → User                                      │ └─────────────────────────────────────────────────────────────┘ |
| --- |

| ⚠️  EXAM TRAP ANTI-PATTERNS that exams love to test: (1) Parsing natural language to decide loop termination ('if response contains DONE...') — WRONG. (2) Setting an arbitrary iteration cap as the PRIMARY stopping mechanism — WRONG. (3) Checking for assistant text content as a completion indicator — WRONG. The ONLY correct termination signal is stop_reason == 'end_turn'. |
| --- |

### **Key Points for Exam**

**Always check stop_reason** — never parse Claude's text for loop control.
**Tool results go INTO conversation history** — append as user turn with role 'user' and content type 'tool_result'.
Claude decides WHICH tool to call next based on context — this is **model-driven decision making**, not hard-coded routing.

## **1.2  Multi-Agent: Coordinator–Subagent Pattern**

### **Plain-English Explanation**

Think of a manager (coordinator) who receives a big project and assigns parts to specialists (subagents). The manager never lets specialists talk to each other directly — all communication flows through the manager. Each specialist knows only what the manager tells them.

### **Architecture Diagram**

| ┌────────────────┐ User ─────────▶│  COORDINATOR   │◀───────── User │    AGENT       │ └───────┬────────┘ ┌────────────────┼────────────────┐ ▼                ▼                ▼ ┌──────────┐    ┌──────────┐    ┌──────────────┐ │  SEARCH  │    │ ANALYSIS │    │  SYNTHESIS   │ │ Subagent │    │ Subagent │    │  Subagent    │ └──────────┘    └──────────┘    └──────────────┘ web_search      analyze_doc      synthesize tools only      tools only       verify_fact ⚠  Subagents do NOT share memory. Each gets its own fresh context. ⚠  Coordinator routes ALL inter-agent communication. |
| --- |

### **Critical Knowledge**

| Concept | Detail |
| --- | --- |
| Hub-and-spoke architecture | Coordinator manages ALL communication. Subagents never call each other directly. |
| Isolated context | Subagents do NOT inherit coordinator's conversation history. You must pass it explicitly. |
| Task decomposition | Coordinator splits broad queries into subtasks and assigns to appropriate subagents. |
| Spawning subagents | Use the Task tool. allowedTools MUST include "Task" for coordinator to spawn subagents. |
| Parallel execution | Emit MULTIPLE Task tool calls in a SINGLE coordinator response (not across separate turns). |

| ⚠️  EXAM TRAP Overly narrow task decomposition is a tested failure mode. E.g., a coordinator told to research 'creative industries' decomposes into only 'digital art', 'graphic design', 'photography' — missing music, writing, film. The coordinator is the bug, not the subagents. |
| --- |

| 🔵  VS / COMPARE Sequential vs Parallel subagent execution: Sequential = coordinator calls Task tool in turn 1, gets result, calls Task in turn 2. Parallel = coordinator emits MULTIPLE Task calls in a SINGLE response. Parallel reduces latency significantly. |
| --- |

## **1.3  Subagent Context Passing & AgentDefinition**

Subagents have zero memory of prior runs. Everything they need must be injected into their prompt. Use structured data to separate content from metadata.

| Concept | Detail |
| --- | --- |
| AgentDefinition | Config object for each subagent type: description, system prompt, allowedTools. |
| allowedTools | Restricts which tools the subagent can call. Principle of least privilege. |
| Context injection | Pass web search results, doc analysis outputs directly in the subagent's prompt. |
| fork_session | Creates independent branches from a shared analysis baseline for divergent exploration. |
| Metadata preservation | Include source URLs, doc names, page numbers in structured format when passing context. |

## **1.4  Multi-Step Workflows: Enforcement vs Prompt Guidance**

This is a HIGH-PRIORITY topic. The exam frequently tests the difference between programmatic enforcement and prompt-based guidance.

| Approach | Detail |
| --- | --- |
| Prompt-based guidance | Instructing Claude in the system prompt: 'Always call get_customer first.' Probabilistic — will fail ~12% of time in production. |
| Programmatic enforcement | Code that BLOCKS downstream tools until prerequisites complete. Deterministic — 100% compliance. Use hooks. |
| When to use programmatic | Any time errors have financial/legal/safety consequences. Identity verification before refunds. Any compliance-critical sequence. |
| Hooks (PostToolUse) | Intercept tool RESULTS to normalize data (dates, formats, codes) before Claude processes them. |
| Hooks (PreToolCall) | Intercept outgoing tool calls to block policy violations (e.g., refunds > $500) and redirect to human escalation. |

| 🔴  HIGH-PRIORITY EXAM TOPIC The exam will present a scenario where an agent skips a required step 12% of the time and ask how to fix it. ALWAYS choose programmatic enforcement (hooks/gates) over enhanced prompt instructions or few-shot examples when financial/safety consequences exist. |
| --- |

## **1.5  Task Decomposition Strategies**

| Strategy | Best For |
| --- | --- |
| Prompt chaining | Fixed sequential pipeline. Best for predictable multi-aspect reviews (e.g., code review: analyze each file, then cross-file integration pass). |
| Dynamic decomposition | Adaptive plan generated from intermediate findings. Best for open-ended investigation (e.g., 'add tests to legacy codebase'). |
| Cross-file integration pass | After per-file analysis, run a SEPARATE pass examining cross-file data flow. Avoids attention dilution. |
| Adaptive investigation | First map structure, identify high-impact areas, create prioritized plan that adapts as dependencies are discovered. |

## **1.6  Session State: Resume & Fork**

| Mechanism | Use Case |
| --- | --- |
| --resume <name> | Continue a named prior session. Use when prior context is mostly valid. |
| fork_session | Create parallel branches from shared baseline. Use to compare two approaches (e.g., testing strategies). |
| Starting fresh with summary | More reliable than resuming when prior tool results are stale. Inject a structured summary into initial context. |
| After code changes | When resuming after modifications, tell the agent WHICH files changed for targeted re-analysis — don't force full re-exploration. |

## **Domain 1 — Practice Questions**

| Q1: An agentic loop is running and Claude's API response contains stop_reason='tool_use'. What should your code do next? |
| --- |
| A) Present the response text to the user and end the loop. |
| ✓ B) Execute the requested tools, append results to conversation history as tool_result, and call the API again. |
| C) Check Claude's response text for a completion signal before deciding whether to continue. |
| D) Set an iteration counter and exit the loop after 10 tool calls to prevent infinite loops. |
| Explanation: stop_reason='tool_use' means Claude needs tool results to continue reasoning. Execute the tools, add results to history, and loop. Parsing text (C) is an anti-pattern. Arbitrary caps (D) should never be the primary stopping mechanism. |

| Q2: A coordinator agent needs to invoke three subagents simultaneously to minimize latency. How should the coordinator emit these invocations? |
| --- |
| A) Emit one Task tool call per coordinator turn, waiting for each result before invoking the next. |
| ✓ B) Include all three Task tool calls in a single coordinator response turn. |
| C) Use a separate API thread for each subagent with independent conversation histories. |
| D) Chain the subagents directly, having each invoke the next when it completes. |
| Explanation: Parallel subagent execution requires emitting MULTIPLE Task tool calls in a SINGLE coordinator response. Sequential per-turn invocation (A) wastes latency. Subagents should never call each other (D) — all communication routes through the coordinator. |

| Q3: Your customer support agent skips identity verification (get_customer) in 8% of cases before processing refunds. Which fix provides the strongest guarantee? |
| --- |
| A) Add 10 few-shot examples showing get_customer always called first. |
| B) Strengthen system prompt: 'ALWAYS call get_customer before any refund operation.' |
| ✓ C) Implement a programmatic prerequisite gate that blocks process_refund until get_customer returns a verified customer ID. |
| D) Deploy a classifier to predict when verification might be skipped. |
| Explanation: When errors have financial consequences, programmatic enforcement is the only approach that provides deterministic guarantees. A and B are probabilistic — they reduce failure rate but cannot reach 0%. D is over-engineered and still probabilistic. |

**DOMAIN 2: Tool Design & MCP Integration — 18% of exam**

# **DOMAIN 2: Tool Design & MCP Integration**

## **2.1  Writing Effective Tool Descriptions**

### **Plain-English Explanation**

Tool descriptions are the menu Claude reads when deciding which tool to use. A one-line description like 'Retrieves information' is like a restaurant menu that just says 'Food'. Claude will guess — and guess wrong.
A complete tool description must include:
**Purpose:**What this tool does and what it returns.
**Input formats:**What parameters it accepts and in what format.
**Example queries:**When a user says X, use this tool.
**Boundary explanations:**When NOT to use this tool vs. similar tools.
**Edge cases:**What happens with invalid inputs.

| 🔴  HIGH-PRIORITY EXAM TOPIC Tool descriptions are the PRIMARY mechanism LLMs use for tool selection. Minimal descriptions → unreliable selection. This is the FIRST thing to fix when tools are being misrouted, BEFORE adding few-shot examples or routing layers. |
| --- |

| ⚠️  EXAM TRAP The exam may present two tools with similar names (analyze_content vs analyze_document) and ask why misrouting occurs. The answer is ALWAYS: insufficient/overlapping tool descriptions, not a routing layer problem. |
| --- |

## **2.2  Structured Error Responses**

### **Error Category Taxonomy**

| errorCategory | Meaning & Handling |
| --- | --- |
| transient | Timeouts, service unavailability. isRetryable: true. Agent should retry. |
| validation | Invalid input format. isRetryable: false (fix input first). Agent should explain to user. |
| business | Policy violation (e.g., refund limit exceeded). isRetryable: false. Agent should escalate or explain. |
| permission | Access denied. isRetryable: false. Agent may need different credentials or escalation. |

| ⚠️  EXAM TRAP Generic error messages like 'Operation failed' hide context from the coordinator. The coordinator cannot make intelligent recovery decisions without knowing: (1) what kind of error, (2) whether to retry, (3) what was attempted, (4) any partial results available. ALWAYS return structured error context. |
| --- |

| 🔵  VS / COMPARE Access failure vs valid empty result: An access failure (timeout/permission) means the tool couldn't run — coordinator must decide to retry or escalate. A valid empty result means the tool ran successfully but found nothing — this is NOT an error and should NOT trigger retry logic. These must be clearly distinguished in error responses. |
| --- |

## **2.3  Tool Distribution & tool_choice**

Giving an agent too many tools degrades reliability. The exam tests the principle: fewer, well-scoped tools per agent > many generic tools.

| Config / Concept | Detail |
| --- | --- |
| tool_choice: 'auto' | Model may call a tool OR return conversational text. Default behavior. |
| tool_choice: 'any' | Model MUST call a tool — cannot return plain text. Use when structured output is required. |
| tool_choice: {type:'tool', name:'X'} | Model MUST call tool X specifically. Use to enforce a required first step (e.g., extract_metadata before enrichment). |
| Scoped tool access | Each subagent gets only tools for its role. A synthesis agent should not have web search tools. |
| Cross-role tools | One or two high-frequency cross-role tools (e.g., verify_fact for synthesis agent) are acceptable. |

## **2.4  MCP Server Configuration**

| Concept | Detail |
| --- | --- |
| .mcp.json (project-level) | Shared team MCP servers checked into version control. Available to all developers. |
| ~/.claude.json (user-level) | Personal/experimental MCP servers. NOT shared. For individual use only. |
| Environment variable expansion | ${GITHUB_TOKEN} in .mcp.json. Credentials managed via env vars — never hard-coded. |
| MCP Resources | Expose content catalogs (issue lists, schema hierarchies) so agents can browse available data without exploratory tool calls. |
| Discovery | All tools from all configured MCP servers are discovered at connection time and available simultaneously. |

## **2.5  Built-in Tool Selection Guide**

| Tool | When to Use |
| --- | --- |
| Grep | Search FILE CONTENTS for patterns. Use: find all callers of a function, locate error messages, find import statements. |
| Glob | Match FILE PATHS by pattern. Use: find **/*.test.tsx, find all .env files. |
| Read | Load full file contents. Use: when you need entire file. |
| Write | Create or overwrite a file completely. |
| Edit | Targeted modification using unique text matching. FAILS if anchor text is not unique → fall back to Read + Write. |
| Bash | Execute shell commands. Use: run tests, git operations, build scripts. |

| 💡  KEY TIP The optimal codebase exploration pattern: (1) Glob to find files by type, (2) Grep to find entry points and function references, (3) Read to follow imports and trace data flows. Do NOT read all files upfront — start narrow and expand. |
| --- |

## **Domain 2 — Practice Questions**

| Q4: Your multi-agent research system has a synthesis agent that incorrectly uses web_search tools (intended for the search agent) instead of synthesize_findings. What is the root cause? |
| --- |
| A) The synthesis agent's tool descriptions are too long and confusing. |
| ✓ B) The synthesis agent has been given access to tools outside its specialization. |
| C) The coordinator is not routing requests through the correct subagent. |
| D) The web_search tool description is too similar to the synthesize tool description. |
| Explanation: Agents with tools outside their specialization tend to misuse them. Scope tool access to each agent's role. The synthesis agent should only have synthesis-relevant tools, not web_search. |

| Q5: An MCP tool returns the same generic error message 'Operation failed' for all failures. What is the primary problem this causes? |
| --- |
| A) It increases token usage in the conversation. |
| ✓ B) It prevents the agent from making appropriate recovery decisions (retry vs escalate vs explain to user). |
| C) It violates the MCP protocol specification. |
| D) It causes the agentic loop to terminate prematurely. |
| Explanation: Generic error messages hide the error category and retryability from the agent. Without knowing whether an error is transient (retry) vs. validation (fix input) vs. business (escalate), the agent cannot make intelligent recovery decisions. |

**DOMAIN 3: Claude Code Configuration & Workflows — 20% of exam**

# **DOMAIN 3: Claude Code Configuration & Workflows**

## **3.1  CLAUDE.md Configuration Hierarchy**

### **The Three Levels**

| ┌───────────────────────────────────────────────────────┐ │  ~/.claude/CLAUDE.md        ← USER-LEVEL              │ │  (personal settings, NOT shared via version control)  │ │                                                        │ │  .claude/CLAUDE.md or CLAUDE.md  ← PROJECT-LEVEL      │ │  (checked into git, ALL team members get this)        │ │                                                        │ │  src/api/CLAUDE.md          ← DIRECTORY-LEVEL         │ │  (applies only within that directory)                 │ └───────────────────────────────────────────────────────┘ @import syntax: reference external files from CLAUDE.md .claude/rules/ directory: topic-specific rule files /memory command: diagnose which memory files are loaded |
| --- |

| 🔴  HIGH-PRIORITY EXAM TOPIC Classic exam scenario: 'A new team member's Claude Code doesn't follow project conventions.' Root cause: instructions are in ~/.claude/CLAUDE.md (user-level) instead of .claude/CLAUDE.md (project-level). User-level settings are NOT shared via version control. |
| --- |

| ⚠️  EXAM TRAP The /memory command is used to DIAGNOSE which files are loaded — use it to debug inconsistent behavior across sessions, not to change settings. |
| --- |

## **3.2  Path-Specific Rules (.claude/rules/)**

Rules in .claude/rules/ use YAML frontmatter with glob patterns for conditional loading. This is more powerful than subdirectory CLAUDE.md files for conventions that span multiple directories.

| Pattern / Concept | Detail |
| --- | --- |
| paths: ["terraform/**/*"] | Only loads when editing Terraform files — wherever they live in the codebase. |
| paths: ["**/*.test.tsx"] | Applies test conventions to ALL test files regardless of directory. |
| paths: ["src/api/**/*"] | API conventions load only when editing API files. |
| vs. subdirectory CLAUDE.md | Directory-bound. Cannot easily apply conventions to files spread across many directories (e.g., test files next to their source). |

| 🔵  VS / COMPARE .claude/rules/ with glob patterns vs subdirectory CLAUDE.md: Use glob patterns when conventions must apply to files by TYPE scattered across the codebase (e.g., all *.test.tsx). Use subdirectory CLAUDE.md when conventions are specific to a particular directory and its children. |
| --- |

## **3.3  Custom Slash Commands & Skills**

| Concept | Detail |
| --- | --- |
| .claude/commands/ (project) | Checked into version control. Available to ALL developers who clone the repo. Team-wide commands. |
| ~/.claude/commands/ (user) | Personal commands. NOT shared. Only available to the individual developer. |
| .claude/skills/ with SKILL.md | Skills with frontmatter config: context:fork, allowed-tools, argument-hint. |
| context: fork | Runs the skill in an ISOLATED sub-agent. Output does NOT pollute the main conversation. Use for verbose analysis or exploratory tasks. |
| allowed-tools | Restricts which tools the skill can call. Use for safety (e.g., limit to read-only). |
| argument-hint | Prompts developer for required parameters when the skill is invoked without arguments. |

| 🔵  VS / COMPARE Skills vs CLAUDE.md: Skills are invoked ON-DEMAND for specific tasks. CLAUDE.md is ALWAYS-LOADED universal standards. Use skills for task-specific workflows (e.g., /review, /test-gen). Use CLAUDE.md for conventions that should always apply. |
| --- |

## **3.4  Plan Mode vs Direct Execution**

| Mode | When to Use |
| --- | --- |
| Plan Mode — USE WHEN | Large-scale changes, architectural decisions, multiple valid approaches, multi-file modifications (45+ files), microservice restructuring, library migrations. |
| Direct Execution — USE WHEN | Simple well-scoped changes: single-file bug fix with clear stack trace, adding a date validation conditional, single-function change. |
| Explore subagent | Used during plan mode to isolate verbose discovery output — returns summaries to preserve main conversation context. |
| Combined approach | Plan mode for investigation phase → direct execution for implementation phase. Best of both worlds. |

| ⚠️  EXAM TRAP The exam may describe a complex task (e.g., monolith-to-microservices refactoring affecting 45+ files) and ask whether to use plan mode or direct execution. Always choose plan mode for architectural decisions. 'Direct execution with comprehensive upfront instructions' is a wrong answer — it assumes you already know the right approach without exploring the code. |
| --- |

## **3.5  Iterative Refinement Techniques**

| Technique | When / How to Use |
| --- | --- |
| Input/output examples | The MOST effective technique when prose descriptions produce inconsistent results. Provide 2-3 concrete examples. |
| Test-driven iteration | Write test suite FIRST (expected behavior, edge cases, performance). Then iterate by sharing test failures. |
| Interview pattern | Have Claude ask questions before implementing. Surfaces cache invalidation strategies, failure modes, design considerations the developer missed. |
| Single message (interacting) | When multiple issues INTERACT (fixing one affects another) — address ALL in one message. |
| Sequential iteration | When issues are INDEPENDENT — fix one at a time, verify, then next. |

## **3.6  CI/CD Integration**

| Feature / Pattern | Detail |
| --- | --- |
| -p / --print flag | Runs Claude Code in NON-INTERACTIVE mode. REQUIRED for CI/CD pipelines — prevents indefinite hang waiting for input. |
| --output-format json --json-schema | Produces machine-parseable structured output for automated posting as inline PR comments. |
| Session context isolation | The SAME Claude session that generated code is LESS effective at reviewing its own changes (retains biasing reasoning context). Use a SEPARATE fresh instance for review. |
| CLAUDE.md in CI | Provides project context (testing standards, fixture conventions, review criteria) to CI-invoked Claude Code. |
| Prior review in context | Include previous review findings when re-running. Instruct: report only NEW or still-unaddressed issues to avoid duplicates. |

| ⚠️  EXAM TRAP CLAUDE_HEADLESS=true and --batch flags do NOT exist in Claude Code. The ONLY correct way to run non-interactively is with the -p or --print flag. Exam distractors often include these fake options. |
| --- |

## **Domain 3 — Practice Questions**

| Q6: A new developer clones the repository but Claude Code doesn't follow team coding conventions. Investigation shows conventions are defined in ~/.claude/CLAUDE.md on the original author's machine. What is the fix? |
| --- |
| A) Send the developer the CLAUDE.md file to manually copy to their machine. |
| B) Move the conventions to .claude/CLAUDE.md in the project repository and commit it. |
| C) Create a .claude/rules/ file with the conventions. |
| ✓ D) Both B and C are valid solutions. |
| Explanation: Both B and C are correct. Moving to project-level .claude/CLAUDE.md ensures all team members get universal conventions via version control. Using .claude/rules/ with appropriate glob patterns also works and provides more granular control. User-level ~/.claude/CLAUDE.md is never shared. |

| Q7: Your CI pipeline runs: 'claude "Review this PR for security issues"' and the job hangs indefinitely. What is the correct fix? |
| --- |
| A) Set environment variable CLAUDE_HEADLESS=true before running the command. |
| B) Add the --batch flag: claude --batch "Review this PR for security issues" |
| ✓ C) Add the -p flag: claude -p "Review this PR for security issues" |
| D) Redirect stdin from /dev/null to prevent interactive prompts. |
| Explanation: The -p (--print) flag is the documented way to run Claude Code non-interactively. It processes the prompt, outputs to stdout, and exits. CLAUDE_HEADLESS and --batch are non-existent features. Redirecting stdin (D) is a Unix workaround that doesn't properly address Claude Code's behavior. |

| Q8: Your codebase has test files scattered throughout (Button.test.tsx next to Button.tsx, etc.) all requiring the same testing conventions. What is the most maintainable solution? |
| --- |
| A) Add testing conventions to the root CLAUDE.md and rely on Claude to apply them to test files. |
| B) Create a separate CLAUDE.md in every directory that contains test files. |
| ✓ C) Create a .claude/rules/ file with paths: ["**/*.test.tsx"] containing the testing conventions. |
| D) Create a skill in .claude/skills/ with the testing conventions. |
| Explanation: .claude/rules/ with glob path patterns is purpose-built for conventions that must apply to files by type regardless of directory location. Option A requires inference (unreliable). Option B requires maintaining CLAUDE.md in every directory (unmaintainable). Option D requires manual skill invocation rather than automatic application. |

**DOMAIN 4: Prompt Engineering & Structured Output — 20% of exam**

# **DOMAIN 4: Prompt Engineering & Structured Output**

## **4.1  Explicit Criteria vs Vague Instructions**

### **The Core Principle**

Vague instructions produce vague results. 'Check that comments are accurate' tells Claude nothing about WHEN to flag an issue. 'Flag a comment ONLY when the claimed behavior directly contradicts the actual code behavior' gives Claude a testable rule.

| Type | Example / Impact |
| --- | --- |
| ❌ Vague | "Be conservative" / "Only report high-confidence findings" / "Check for code quality issues" |
| ✅ Specific | "Flag only: (1) bugs that would cause incorrect behavior, (2) security vulnerabilities. SKIP: style issues, local patterns, preference differences." |
| False positive impact | High false-positive categories undermine developer TRUST in ALL categories — even the accurate ones. Fix by temporarily disabling offending categories. |
| Severity criteria | Define each severity level with a concrete code example showing exactly what qualifies. |

## **4.2  Few-Shot Prompting**

### **When and How to Use**

Few-shot examples are the MOST effective technique when detailed instructions alone produce inconsistent results. They show the model how to handle ambiguous cases by example rather than rule.

| Aspect | Guidance |
| --- | --- |
| Quantity | 2-4 examples for ambiguous scenarios. Too many wastes tokens; too few doesn't generalize. |
| Content | Show the reasoning: WHY was this action chosen over a plausible alternative? |
| Format examples | Demonstrate exact desired output format: {location, issue, severity, suggested fix}. |
| False positive reduction | Include examples of ACCEPTABLE patterns that look suspicious but are NOT issues. |
| Varied formats | For extraction: show examples from inline citations, bibliographies, narrative sections, tables. |
| Hallucination reduction | For extraction tasks, few-shot examples demonstrating correct null handling reduce fabrication. |

| 🔵  VS / COMPARE Few-shot examples vs expanding instructions: Instructions define rules. Few-shot examples demonstrate judgment for AMBIGUOUS cases that rules can't fully specify. Use few-shot when the model needs to generalize to novel patterns, not just match pre-specified cases. |
| --- |

## **4.3  Structured Output via Tool Use & JSON Schemas**

### **The Reliability Spectrum**

| Approach | Reliability |
| --- | --- |
| Plain text instructions | Lowest reliability. Model can deviate from format. JSON syntax errors possible. |
| JSON in system prompt | Medium reliability. Reduces deviations but JSON errors still possible. |
| tool_use with JSON schema | Highest reliability. Eliminates JSON syntax errors. Schema-compliant output guaranteed. |

| ⚠️  EXAM TRAP tool_use eliminates JSON SYNTAX errors but NOT semantic errors. For example: line items that don't sum to the stated total, dates placed in wrong fields, conflicting values. Semantic validation still requires post-processing code. |
| --- |

Schema design best practices:
**Nullable / optional fields:**Use for information that MAY NOT exist in the source document. Prevents Claude from fabricating values to satisfy required fields.
**Enum with 'other' + detail:**Add 'unclear' for ambiguous cases, 'other' + free-text field for extensible categorization.
**Format normalization:**Include normalization rules in prompts (e.g., 'normalize all dates to ISO 8601') alongside the schema.

### **tool_choice Decision Guide**

| Setting | When to Use |
| --- | --- |
| tool_choice: 'auto' | Model may return text OR call a tool. Use when conversational responses are acceptable. |
| tool_choice: 'any' | Model MUST call a tool. Use when structured output is ALWAYS required regardless of input. |
| tool_choice: {type:'tool',name:'X'} | Model MUST call tool X. Use to enforce a mandatory first step (e.g., extract_metadata before any enrichment). |

## **4.4  Validation, Retry & Feedback Loops**

| Pattern | Detail |
| --- | --- |
| Retry-with-error-feedback | On validation failure: resend the original document + the failed extraction + the specific error. Model corrects format/structure. |
| When retries FAIL | Information is ABSENT from the source document. No amount of retrying will produce data that isn't there. Detect and handle gracefully. |
| When retries SUCCEED | Format mismatches, structural errors, wrong field placement — these are correctable via retry. |
| detected_pattern field | Add to structured findings to track which code patterns trigger false positives. Enables systematic analysis. |
| Self-correction validation | Extract 'calculated_total' alongside 'stated_total'. Add 'conflict_detected' boolean for inconsistent source data. |

## **4.5  Batch Processing (Message Batches API)**

| Attribute | Value |
| --- | --- |
| Cost savings | 50% versus synchronous API calls. |
| Processing window | Up to 24 hours. No guaranteed latency SLA. |
| Multi-turn tool calling | NOT supported within a single batch request. |
| custom_id | Correlates request/response pairs. Use for failure resubmission — resubmit only failed items. |
| Use when | Non-blocking, latency-tolerant: overnight reports, weekly audits, nightly test generation. |
| Do NOT use when | Blocking workflows: pre-merge checks that developers wait for. |

| 🔴  HIGH-PRIORITY EXAM TOPIC Exam scenario: 'Reduce API costs for (A) blocking pre-merge check and (B) overnight technical debt report.' Answer: Use batch API for B only, keep synchronous for A. The 24-hour processing window makes batch API incompatible with blocking workflows. |
| --- |

## **4.6  Multi-Instance & Multi-Pass Review**

| Pattern | Detail |
| --- | --- |
| Self-review limitation | A model that generated code retains reasoning context from generation — less likely to question its own decisions. Use a SEPARATE fresh instance for review. |
| Multi-pass review | Split large reviews: (1) per-file local analysis pass, (2) separate cross-file integration pass. Prevents attention dilution and contradictory findings. |
| Independent instance | More effective at catching subtle issues than self-review instructions OR extended thinking mode. |
| Verification pass | Model self-reports confidence per finding. Route low-confidence findings to more thorough review. |

## **Domain 4 — Practice Questions**

| Q9: Your CI code review system has a 34% false positive rate in the 'comment accuracy' category, causing developers to distrust the entire review system. What is the most effective immediate fix? |
| --- |
| A) Add 'be conservative and only report high-confidence findings' to the system prompt. |
| ✓ B) Replace vague instructions with specific categorical criteria: 'Flag a comment ONLY when the claimed behavior directly contradicts the actual code behavior.' |
| C) Add 5 few-shot examples of accurate comment flagging. |
| D) Switch to extended thinking mode to improve the model's reasoning quality. |
| Explanation: General instructions like 'be conservative' fail to improve precision because they don't define WHAT constitutes a problem. Specific categorical criteria give the model a testable rule. Few-shot examples (C) help but specific criteria are the root fix. Extended thinking (D) doesn't address criterion ambiguity. |

| Q10: You need guaranteed schema-compliant JSON output from Claude. Which approach ELIMINATES JSON syntax errors? |
| --- |
| A) Add 'Always respond with valid JSON only' to the system prompt. |
| ✓ B) Use tool_use with a strict JSON schema and set tool_choice to 'any'. |
| C) Use extended thinking to improve the model's JSON formatting. |
| D) Post-process Claude's output with a JSON parser and retry on failure. |
| Explanation: tool_use with JSON schema is the only approach that ELIMINATES JSON syntax errors — the API enforces schema compliance. System prompt instructions (A) reduce but don't eliminate errors. Extended thinking (C) doesn't address JSON formatting. Retry loops (D) handle errors but don't prevent them. |

| Q11: Your extraction system has a required 'methodology_section' field that is empty for 30% of documents. The model is filling it with plausible-sounding but fabricated text. What schema change fixes this? |
| --- |
| A) Add detailed instructions in the prompt about what methodology sections look like. |
| B) Add few-shot examples showing correct methodology extraction. |
| ✓ C) Make the 'methodology_section' field optional (nullable) in the JSON schema. |
| D) Add a validation step that checks for methodology section presence. |
| Explanation: Required fields pressure the model to fabricate values to satisfy the schema. Making fields optional/nullable for information that may not exist in source documents is the correct schema design principle. It tells the model it's acceptable to return null rather than invent data. |

**DOMAIN 5: Context Management & Reliability — 15% of exam**

# **DOMAIN 5: Context Management & Reliability**

## **5.1  Context Window Management**

### **The Problems**

| Problem | Description |
| --- | --- |
| Progressive summarization risk | Condensing numerical values, percentages, dates, customer expectations into vague summaries. Precision is lost. |
| Lost in the middle | Models reliably process info at start and end of long inputs. Information in the MIDDLE gets less attention. |
| Tool result accumulation | Verbose tool outputs (40+ fields from an order lookup when only 5 are relevant) consume tokens without value. |
| Stale context in resume | Resumed sessions may contain tool results from before code was modified — those results are now wrong. |

### **Solutions**

| Solution | How It Helps |
| --- | --- |
| Persistent 'case facts' block | Extract transactional facts (amounts, dates, order numbers, statuses) into a persistent block included in EVERY prompt, OUTSIDE summarized history. |
| Trim verbose tool outputs | Filter tool results to only relevant fields BEFORE they accumulate in context. |
| Key findings at start | Place summaries at BEGINNING of aggregated inputs. Organize details with explicit section headers to mitigate position effects. |
| Scratchpad files | Agents maintain files recording key findings. Reference files for subsequent questions rather than relying on in-context memory. |
| /compact command | Reduces context usage during extended exploration sessions when context fills with verbose discovery output. |
| Structured subagent output | Require subagents to include metadata (dates, source URLs, methodological context) — not just content — in structured outputs. |

## **5.2  Escalation & Ambiguity Resolution**

### **When to Escalate**

Customer EXPLICITLY requests a human — honor IMMEDIATELY, no investigation first.
Policy is ambiguous or SILENT on the customer's specific request (not just complex cases).
Agent cannot make meaningful progress after reasonable attempts.
Multiple customer matches returned — ask for additional identifiers, do NOT heuristically select.

| ⚠️  EXAM TRAP Sentiment-based escalation (escalate when negative sentiment > threshold) is an exam distractor. Sentiment does NOT correlate with case complexity. A frustrated customer with a simple issue should be resolved, not escalated. Likewise, self-reported confidence scores are poorly calibrated — the agent may be confidently WRONG. |
| --- |

| 🔵  VS / COMPARE Explicit escalation request vs complex case: If customer explicitly asks for a human, escalate IMMEDIATELY regardless of case complexity. If the case is complex but the customer hasn't requested escalation, attempt resolution — only escalate if you cannot make progress. |
| --- |

## **5.3  Error Propagation in Multi-Agent Systems**

| Concept | Detail |
| --- | --- |
| Structured error context | Include: failure type, attempted query, partial results, potential alternative approaches. |
| Access failure | Tool couldn't execute (timeout, permission denied). Coordinator needs to decide: retry, alternative, or proceed with partial. |
| Valid empty result | Tool ran successfully but found nothing. NOT an error. Do NOT retry or treat as failure. |
| Silent suppression | Returning empty results as success hides failures from coordinator. ANTI-PATTERN. |
| Full workflow termination | Terminating entire workflow on a single subagent failure. ANTI-PATTERN — proceed with partial results. |
| Coverage annotations | Synthesis output should indicate which areas are well-supported vs. which have gaps due to unavailable sources. |

## **5.4  Large Codebase Context Management**

| Pattern | When to Use |
| --- | --- |
| Context degradation signal | Model starts referencing 'typical patterns' instead of specific classes discovered earlier. Start fresh with summary. |
| Subagent delegation | Spawn subagents for focused investigation (e.g., 'trace refund flow'). Main agent maintains high-level coordination only. |
| Scratchpad files | Agents write key findings to files. Reference files in subsequent questions to counteract context degradation. |
| Phase summaries | Before spawning sub-agents for next phase, summarize key findings from current phase. Inject into subagent initial context. |
| Crash recovery | Each agent exports state to a known location (manifest). Coordinator loads manifest on resume and injects into agent prompts. |

## **5.5  Human Review & Confidence Calibration**

| Concept | Detail |
| --- | --- |
| Aggregate accuracy risk | 97% overall accuracy may mask 70% accuracy on a specific document type. Always segment by type and field. |
| Stratified random sampling | Sample high-confidence extractions randomly to measure actual error rates and detect novel failure patterns. |
| Field-level confidence | Model outputs confidence per field. Calibrate review thresholds using LABELED validation sets. |
| Review routing | Low-confidence extractions → human review. Ambiguous/contradictory source documents → human review. Prioritize limited reviewer capacity. |
| Before automation | Validate accuracy by document type AND field segment before reducing human review rates. |

## **5.6  Information Provenance in Multi-Source Synthesis**

| Concept | Detail |
| --- | --- |
| Claim-source mappings | Each finding from subagents must include: claim, source URL/document name, relevant excerpt, publication date. |
| Conflicting statistics | Do NOT arbitrarily select one value. Annotate BOTH with source attribution. Let coordinator or final report reflect the conflict. |
| Temporal data | Require publication/collection dates to prevent temporal differences from being misinterpreted as contradictions. |
| Report structure | Separate well-established findings from contested ones. Preserve original source characterizations and methodological context. |
| Format by content type | Financial data → tables. News → prose. Technical findings → structured lists. Don't convert everything to one format. |

## **Domain 5 — Practice Questions**

| Q12: A multi-agent research system is running a long session. You notice the coordinator is referencing 'typical authentication patterns' rather than specific classes it discovered earlier. What does this indicate and what should you do? |
| --- |
| A) The coordinator is working correctly — generalizing from specific examples is expected behavior. |
| ✓ B) This indicates context degradation. Start a new session with a structured summary of key findings injected into initial context. |
| C) This indicates the subagents are not providing enough detail in their outputs. |
| D) Use the /compact command to free up context window space. |
| Explanation: Referencing 'typical patterns' instead of specific discovered artifacts is a signal of context degradation — the specific findings have been effectively lost. The correct response is to start fresh with an injected summary of key findings rather than continue with degraded context. /compact (D) helps prevent degradation but doesn't fix an already-degraded session. |

| Q13: A customer says 'I've been dealing with this billing issue for weeks, I'm so frustrated, I just want to speak to a human agent right now.' What should the support agent do? |
| --- |
| A) Acknowledge frustration and attempt to resolve the billing issue since it's within the agent's capabilities. |
| ✓ B) Escalate immediately to a human agent without attempting further investigation. |
| C) Ask clarifying questions to fully understand the billing issue before deciding. |
| D) Offer to resolve but explain it may take a few minutes to investigate. |
| Explanation: When a customer EXPLICITLY requests a human agent, the system must honor that request immediately — without attempting investigation, without asking clarifying questions, without offering alternatives first. The customer has made their preference clear. This is a core escalation principle in the exam guide. |

# **SCENARIO-BASED PRACTICE QUESTIONS**

## **Scenario A: Multi-Agent Research System (3 Questions)**

*Context:*You are building a multi-agent research system. A coordinator delegates to: web_search subagent, document_analysis subagent, synthesis subagent, report_generation subagent.

| Q14: [Scenario A - Q1] The synthesis subagent frequently needs to verify simple facts (dates, names) during synthesis. Currently each verification requires 3 round-trips through the coordinator to the web_search subagent, adding 40% latency. 85% of verifications are simple facts; 15% require deep investigation. What is the best solution? |
| --- |
| A) Give the synthesis agent full access to all web_search tools for autonomous verification. |
| B) Have synthesis accumulate all verifications, batch-return them to the coordinator at end of pass. |
| ✓ C) Give synthesis a scoped verify_fact tool for simple lookups; complex verifications route through the coordinator. |
| D) Have the web_search agent proactively cache extra context anticipating synthesis needs. |
| Explanation: Least-privilege principle: give the synthesis agent only what it needs for the 85% common case (verify_fact for simple lookups) while preserving the coordinator routing for complex cases. Full access (A) over-provisions and violates role separation. Batching (B) creates blocking dependencies. Speculative caching (D) cannot reliably predict verification needs. |

| Q15: [Scenario A - Q2] The web_search subagent times out mid-research. It has gathered partial results on 3 of 5 planned subtopics. How should the subagent report this to the coordinator? |
| --- |
| A) Return an empty result set to allow the coordinator to decide how to proceed. |
| B) Propagate the exception directly to terminate the workflow and prevent incomplete reports. |
| ✓ C) Return structured error context: failure type (timeout), attempted queries, partial results for 3/5 subtopics, and suggested alternatives. |
| D) Implement exponential backoff retries internally, return 'search unavailable' only after 3 failures. |
| Explanation: Structured error context enables intelligent coordinator recovery. With partial results and failure details, the coordinator can: use partial results with gap annotations, retry with different queries, invoke an alternative search approach. Empty results (A) suppress valuable partial data. Terminating (B) is wasteful when partial recovery is possible. Generic status (D) hides context. |

| Q16: [Scenario A - Q3] Two credible sources provide different statistics on the same metric: Source A says 34%, Source B says 41%. How should the synthesis subagent handle this? |
| --- |
| A) Use the more recently published figure and note the discrepancy in parentheses. |
| B) Average the two figures and cite both sources. |
| ✓ C) Include both figures with full source attribution and annotate as conflicting, letting the coordinator or final report determine how to present. |
| D) Request the coordinator to invoke the web_search subagent to find a third source for arbitration. |
| Explanation: Conflicting statistics from credible sources should be preserved with both values, each with source attribution, and explicitly annotated as conflicting. The synthesis agent should NOT make an editorial decision about which is 'right' — that judgment belongs higher in the pipeline. Averaging (B) loses the original data. Option D adds unnecessary latency. |

## **Scenario B: Structured Data Extraction (3 Questions)**

*Context:*You are building an extraction system that processes research papers into structured JSON for a database. Papers have varying formats: some have explicit methodology sections, others embed methodology in narrative text. Some papers are from the 1990s, others from 2024.

| Q17: [Scenario B - Q1] 25% of papers don't have a dedicated methodology section, causing the model to fabricate plausible-sounding methodology text. What is the most effective fix? |
| --- |
| A) Add a prompt instruction: 'If no methodology section exists, write N/A.' |
| ✓ B) Make the methodology_section field optional (nullable) in the JSON schema. |
| C) Add 3 few-shot examples showing papers without methodology sections. |
| D) Add a validation step that checks methodology field length. |
| Explanation: Required fields create pressure to fabricate. Making the field nullable/optional signals to the model that returning null is the correct behavior when information doesn't exist. This is a schema design principle that eliminates the fabrication incentive. Prompt instruction (A) helps but schema design (B) is more reliable. Few-shot examples (C) help too but schema design is the root fix. |

| Q18: [Scenario B - Q2] You need to process 10,000 papers over a weekend to populate a new database. Papers don't need to be available until Monday morning. What API approach should you use? |
| --- |
| A) Synchronous API calls with 10 parallel threads to complete faster. |
| ✓ B) Message Batches API for 50% cost savings and the non-blocking processing window. |
| C) Synchronous API with streaming to reduce time-to-first-token. |
| D) Message Batches API but with a 4-hour polling interval to ensure completion before Monday. |
| Explanation: Non-blocking, latency-tolerant batch processing is the ideal use case for the Message Batches API. The 24-hour window and 50% cost savings make it perfect for weekend processing with Monday availability. Option D has the right API but the wrong polling calculation — a 4-hour interval would only guarantee results within 28 hours (24+4), not necessarily by Monday morning. |

| Q19: [Scenario B - Q3] A validation check finds that extracted line items don't sum to the stated total in 12% of papers. Your tool_use schema is strictly enforced. Why does this error still occur? |
| --- |
| A) The JSON schema needs stricter validation rules. |
| ✓ B) tool_use eliminates JSON syntax errors but not semantic errors — mathematical relationships between fields are not enforced by schema. |
| C) The model is ignoring the schema definition. |
| D) The tool_choice setting should be changed to 'any' instead of forced tool selection. |
| Explanation: This is the key distinction: tool_use with JSON schema eliminates SYNTAX errors (malformed JSON, wrong types, missing required fields) but does NOT prevent SEMANTIC errors (values that are internally inconsistent, calculations that don't add up, dates in wrong sequence). Semantic validation requires post-processing business logic in your application code. |

# **FLASHCARDS**

Study these card pairs. Cover the right side, answer, then check.

## **Domain 1 Flashcards**

| D1 AGENTIC LOOP What does stop_reason='tool_use' mean and what must you do? | ANSWER Claude wants to call tools. Execute the tools, append tool_results to conversation history, call the API again. |
| --- | --- |

| D1 AGENTIC LOOP What does stop_reason='end_turn' mean? | ANSWER Claude has finished. Present the response to the user. Terminate the loop. |
| --- | --- |

| D1 MULTI-AGENT How do you spawn multiple subagents in parallel? | ANSWER Emit MULTIPLE Task tool calls in a SINGLE coordinator response (not across separate turns). |
| --- | --- |

| D1 SUBAGENTS Do subagents automatically inherit the coordinator's conversation history? | ANSWER NO. Subagents have isolated context. You must explicitly pass all needed information in the subagent's prompt. |
| --- | --- |

| D1 SUBAGENTS What must be in allowedTools for a coordinator to spawn subagents? | ANSWER The string 'Task' must be included in the coordinator's allowedTools configuration. |
| --- | --- |

| D1 ENFORCEMENT When should you use programmatic enforcement vs prompt guidance? | ANSWER Use programmatic enforcement (hooks/gates) when errors have financial, legal, or safety consequences and deterministic compliance is required. |
| --- | --- |

| D1 SESSION What does fork_session do? | ANSWER Creates independent session branches from a shared analysis baseline to explore divergent approaches (e.g., compare two refactoring strategies). |
| --- | --- |

## **Domain 2 Flashcards**

| D2 TOOLS What is the PRIMARY mechanism LLMs use for tool selection? | ANSWER Tool descriptions. Minimal/overlapping descriptions lead to unreliable selection. |
| --- | --- |

| D2 MCP What is the difference between MCP isError=true and an empty result? | ANSWER isError=true means the tool FAILED to execute. Empty result means the tool ran successfully but found nothing. They require different handling. |
| --- | --- |

| D2 MCP Where do you configure team-shared MCP servers? | ANSWER .mcp.json (project-level, checked into git). Personal/experimental servers go in ~/.claude.json (user-level). |
| --- | --- |

| D2 TOOL CHOICE What does tool_choice: 'any' guarantee? | ANSWER The model MUST call a tool — it cannot return plain conversational text. Use when structured output is always required. |
| --- | --- |

| D2 TOOLS What is the Grep tool used for? | ANSWER Searching FILE CONTENTS for patterns (function names, error messages, import statements). Not for file paths. |
| --- | --- |

| D2 TOOLS What is the Glob tool used for? | ANSWER Matching FILE PATHS by pattern (e.g., **/*.test.tsx). Not for searching file contents. |
| --- | --- |

## **Domain 3 Flashcards**

| D3 CLAUDE.MD Why don't new team members receive project Claude Code instructions? | ANSWER Instructions are in ~/.claude/CLAUDE.md (user-level) instead of .claude/CLAUDE.md (project-level). User-level is NOT shared via version control. |
| --- | --- |

| D3 CI/CD What CLI flag is REQUIRED for Claude Code in CI/CD pipelines? | ANSWER -p or --print. Runs Claude Code non-interactively — processes prompt, outputs to stdout, exits without waiting for input. |
| --- | --- |

| D3 SKILLS What does context: fork do in a SKILL.md? | ANSWER Runs the skill in an isolated sub-agent context. Verbose/exploratory output does NOT pollute the main conversation. |
| --- | --- |

| D3 PLAN MODE When should you use plan mode vs direct execution? | ANSWER Plan mode: architectural decisions, multi-file changes, multiple valid approaches. Direct: simple well-scoped single-file changes. |
| --- | --- |

| D3 REVIEW Why use a separate Claude instance for code review? | ANSWER The instance that GENERATED the code retains reasoning context, making it biased. A fresh independent instance is more effective at catching subtle issues. |
| --- | --- |

## **Domain 4 Flashcards**

| D4 STRUCTURED What does tool_use with JSON schema eliminate? What does it NOT eliminate? | ANSWER Eliminates JSON SYNTAX errors. Does NOT eliminate semantic errors (wrong values, calculations that don't add up, conflicting data). |
| --- | --- |

| D4 BATCH When is the Message Batches API NOT appropriate? | ANSWER Blocking workflows where users/processes wait for the result (e.g., pre-merge checks). The 24-hour window makes it unsuitable. |
| --- | --- |

| D4 SCHEMA What schema design prevents field fabrication? | ANSWER Make fields optional/nullable when information may not exist in source documents. Required fields pressure the model to invent values. |
| --- | --- |

| D4 FEW-SHOT What is the most effective fix for inconsistent output format? | ANSWER 2-4 few-shot examples demonstrating the exact desired output format. More reliable than detailed instructions alone. |
| --- | --- |

## **Domain 5 Flashcards**

| D5 CONTEXT What is 'lost in the middle' effect? | ANSWER Models reliably process information at the START and END of long inputs. Information in the middle gets less attention. Mitigate: place key summaries first. |
| --- | --- |

| D5 ESCALATION When should you escalate to a human IMMEDIATELY? | ANSWER When the customer EXPLICITLY requests a human agent — regardless of case complexity or whether the agent could resolve it. |
| --- | --- |

| D5 REVIEW What is the risk of 97% overall accuracy? | ANSWER It may mask much lower accuracy on specific document types or fields. Always validate accuracy by document type AND field segment before reducing human review. |
| --- | --- |

| D5 PROVENANCE How should you handle conflicting statistics from two credible sources? | ANSWER Include BOTH figures with full source attribution, explicitly annotated as conflicting. Do NOT average, arbitrarily select one, or editorially resolve the conflict. |
| --- | --- |

| D5 CONTEXT What is context degradation and how do you detect it? | ANSWER When a model starts referencing 'typical patterns' instead of specific artifacts discovered earlier. Signal to start a fresh session with an injected summary. |
| --- | --- |

# **COMPARISON TABLES (High-Value Exam Topics)**

## **Programmatic Enforcement vs Prompt Guidance**

| Attribute | Programmatic Enforcement | Prompt Guidance |
| --- | --- | --- |
| Guarantee | 100% deterministic | Probabilistic (~88-95%) |
| Implementation | Code hooks, prerequisite gates, blocking logic | System prompt instructions, few-shot examples |
| Failure rate | Zero (when implemented correctly) | Non-zero even with best prompts |
| Use when | Financial, legal, safety consequences | Preference-level guidance, style, tone |
| Example | Block process_refund until get_customer verified | 'Always verify customer identity before refunds' |

## **batch API vs Synchronous API**

| Attribute | Message Batches API | Synchronous API |
| --- | --- | --- |
| Cost | 50% savings | Full price |
| Latency | Up to 24 hours, no SLA | Seconds to minutes |
| Multi-turn tool calling | Not supported | Supported |
| Best for | Overnight reports, weekly audits, nightly test gen | Pre-merge checks, real-time chat, blocking workflows |
| Failure handling | Resubmit by custom_id | Retry in loop |

## **Plan Mode vs Direct Execution**

| Attribute | Plan Mode | Direct Execution |
| --- | --- | --- |
| Use for | Architectural decisions, 45+ file changes, migrations, multiple valid approaches | Single-file bug fixes, adding one validation, clear scope |
| Risk of wrong choice | Costly rework from late-discovered dependencies | Minimal — scope is already clear |
| Explore subagent | Available to isolate verbose discovery | Not needed |
| Combined approach | Plan first, then direct execution for implementation | N/A |

## **project-level vs user-level Configuration**

| Concept | Project / Shared | User / Personal |
| --- | --- | --- |
| .claude/CLAUDE.md | Checked into git — ALL team members | .claude/commands/ |
| ~/.claude/CLAUDE.md | Local only — individual user only | ~/.claude/commands/ |
| .mcp.json | Project-scope MCP servers — team shared | ~/.claude.json |
| AgentDefinition config | N/A — defined in code | N/A |

## **tool_choice Options**

| Setting | Behavior | Use Case |
| --- | --- | --- |
| 'auto' | Model CHOOSES: tool call OR text response | General use, flexible interactions |
| 'any' | Model MUST call a tool (any available) | When structured output always required |
| {type:'tool', name:'X'} | Model MUST call tool X specifically | Enforce required first step (e.g., extract_metadata first) |

# **QUICK REVISION SHEET**

*One-page summary of the highest-probability exam topics.*

## **🔴 Must-Know Rules (Highest Exam Probability)**

stop_reason DRIVES agentic loop. 'tool_use' → continue. 'end_turn' → terminate. NEVER parse text.
Subagents have ZERO memory inheritance. Always inject context explicitly.
Parallel subagents: emit MULTIPLE Task calls in ONE response (not sequentially).
Financial/safety compliance → programmatic enforcement (hooks). Prompt guidance is probabilistic.
Tool misrouting → fix tool DESCRIPTIONS first (the primary mechanism for tool selection).
User-level CLAUDE.md is NOT shared with teammates. Project-level is shared via git.
-p flag is required for CI/CD non-interactive Claude Code. CLAUDE_HEADLESS does not exist.
tool_use eliminates JSON SYNTAX errors. Semantic errors still need application-level validation.
Message Batches API: 50% cost savings, up to 24hr, NO blocking workflow use.
Explicit human escalation request → honor IMMEDIATELY without investigation.
Conflicting statistics → preserve BOTH with source attribution. Never arbitrarily select one.
97% aggregate accuracy may mask poor performance on specific segments. Always segment.

## **⚠️ Top Exam Traps**

Arbitrary iteration cap as PRIMARY stopping mechanism → WRONG.
CLAUDE_HEADLESS=true or --batch flag → DO NOT EXIST.
Coordinator decomposes too narrowly → root cause is coordinator, not subagents.
Sentiment-based escalation → poor proxy for complexity.
Self-review by the generating instance → less effective than independent instance.
tool_use eliminates ALL errors → WRONG, only syntax errors.
Same Claude session for code generation AND review → biased, less effective.
Resuming with stale tool results → better to start fresh with injected summary.

## **📊 Domain Weights Quick Reference**

| Domain | Topic | Weight |
| --- | --- | --- |
| Domain 1 | Agentic Architecture & Orchestration | 27% |
| Domain 2 | Tool Design & MCP Integration | 18% |
| Domain 3 | Claude Code Config & Workflows | 20% |
| Domain 4 | Prompt Engineering & Structured Output | 20% |
| Domain 5 | Context Management & Reliability | 15% |

**Highest ROI:**Master Domains 1, 3, and 4 first — they cover 67% of the exam.

**No penalty for guessing:**Always answer every question. If uncertain, eliminate clearly wrong choices and pick from the remainder.

## **🧠 Memory Techniques**

### **Agentic Loop: 'TEAR'**

**T:**Tool_use → continue. End_turn → stop.
**E:**Execute tools in your code.
**A:**Append results to conversation history.
**R:**Return to API call again.

### **Tool Description Quality: 'PIEEB'**

**P:**Purpose — what does it do, what does it return.
**I:**Input formats — parameters and formats.
**E:**Examples — show which queries should use this tool.
**E:**Edge cases — invalid inputs, limits.
**B:**Boundaries — when NOT to use vs. similar tools.

### **Escalation Triggers: 'CPI'**

**C:**Customer explicitly requests human — escalate IMMEDIATELY.
**P:**Policy is ambiguous/silent on the specific request.
**I:**Inability to make meaningful progress.

### **Error Response: 'TRAP'**

**T:**Type — transient/validation/business/permission.
**R:**Retryable — boolean flag.
**A:**Attempted — what was tried.
**P:**Partial results — what was accomplished before failure.

# **GOOD LUCK ON YOUR EXAM!**

You've covered all 5 domains, 19+ practice questions, 30+ flashcards, and the top exam traps. Remember: the exam rewards architectural judgment over memorization. Ask yourself 'what provides the strongest guarantee?' and 'what is the root cause?' for each question.

**Passing score: 720/1000  •  Always guess  •  No negative marking**
