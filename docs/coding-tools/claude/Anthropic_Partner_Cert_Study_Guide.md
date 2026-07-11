---
title: "About The Certification"
date_created: 2026-07-10
last_reviewed: 2026-07-10
status: current
source_type: converted-pdf
covers_version: "N/A"
doc_type: guide
---
| ANTHROPIC Partner Certification Exam Enterprise Architect (EA) Complete Study Guide 250+ Practice Questions  |  Cheat Sheet  |  Domain Deep Dives |
| --- |
| EXAM OVERVIEW Domain Weightings & Structure |
| --- |
## **About The Certification**
The Anthropic Partner Certification (Enterprise Architect) validates your ability to design and implement production-grade applications using Claude. The ideal candidate is a solution architect with 6+ months of practical experience building with Claude APIs, Agent SDK, Claude Code, and MCP in real production environments.

## **Exam Format**
The exam uses scenario-based questions. 4 scenarios are selected at random from a pool of 6. Each scenario presents a realistic production context and frames a set of questions. Understanding the scenarios deeply is critical to exam success.

## **Domain Weightings**
| Domain | Name | Weight | Key Focus |
| --- | --- | --- | --- |
| 1 | Agentic Architecture & Orchestration | 27% | Agentic loops, multi-agent systems, lifecycle hooks |
| 2 | Tool Design & MCP Integration | 18% | Tool descriptions, MCP tools/resources, built-in tools |
| 3 | Claude Code Configuration & Workflows | 20% | CLAUDE.md, plan mode, slash commands, CI/CD |
| 4 | Prompt Engineering & Structured Output | 20% | JSON schemas, few-shot, extraction patterns |
| 5 | Context Management & Reliability | 15% | Long docs, multi-turn, handoffs, escalation |

## **The 6 Exam Scenarios**
| Scenario 1: Customer Support Resolution Agent Building a customer support agent using Claude Agent SDK. Handles high-ambiguity requests (returns, billing disputes). MCP tools: get_customer, lookup_order, process_refund, escalate_to_human. Target: 80%+ first-contact resolution. Domains: Agentic Architecture, Tool Design & MCP, Context Management & Reliability |
| --- |

| Scenario 2: Code Generation with Claude Code Using Claude Code to accelerate software development (code generation, refactoring, debugging, documentation). Integrate with custom slash commands, CLAUDE.md configurations, plan mode vs direct execution. Domains: Claude Code Configuration & Workflows, Context Management & Reliability |
| --- |

| Scenario 3: Multi-Agent Research System Coordinator agent delegates to specialized subagents: web search, document analysis, findings synthesis, report generation. System researches topics and produces comprehensive, cited reports. Domains: Agentic Architecture, Tool Design & MCP, Context Management & Reliability |
| --- |

| Scenario 4: Developer Productivity with Claude Integrating Claude into the development workflow for productivity. Focus on MCP integrations, Claude Code configuration, and agentic workflows for developer tasks. Domains: Tool Design & MCP, Claude Code Configuration & Workflows, Agentic Architecture |
| --- |

| Scenario 5: Claude Code for Continuous Integration Integrating Claude Code into CI/CD pipelines. System runs automated code reviews, generates test cases, and provides feedback on pull requests. Prompts must be actionable with minimal false positives. Domains: Claude Code Configuration & Workflows, Prompt Engineering & Structured Output |
| --- |

| Scenario 6: Structured Data Extraction Building a structured data extraction system using Claude. Extracts information from unstructured documents, validates output using JSON schemas, maintains high accuracy, integrates with downstream systems. Domains: Prompt Engineering & Structured Output, Context Management & Reliability |
| --- |

| QUICK REFERENCE CHEAT SHEET Key Concepts, APIs, and Patterns |
| --- |

| Agentic Loop Control Flow |
| --- |
| stop_reason: tool_use: Execute the requested tool(s) and return results to continue the loop |
| stop_reason: end_turn: Claude is done — terminate the loop and return the final response |
| Anti-pattern: Parsing assistant text for completion signals (e.g., 'I have finished') |
| Anti-pattern: Setting arbitrary iteration caps as the PRIMARY stopping mechanism |
| Anti-pattern: Checking stop_reason from wrong position in response |
| Correct pattern: Loop continues on tool_use, terminates on end_turn. Use caps only as safety fallback |

| Lifecycle Hooks PreToolUse: Intercept OUTGOING tool calls before execution — enforce compliance rules, block actions PostToolUse: Intercept tool RESULTS before model sees them — normalize data formats Use hooks when: Business rules require guaranteed deterministic compliance Use prompts when: Compliance is probabilistic/guidance-based (best effort) Example: Block refunds > $500 with PreToolUse (not just prompting) | Multi-Agent Architecture Hub-and-spoke: Coordinator manages all inter-subagent communication Context isolation: Subagents do NOT inherit coordinator's history Coordinator role: Decompose, delegate, aggregate, decide Risk: Overly narrow decomposition → incomplete coverage Communication: Route ALL subagent communication through coordinator for observability |
| --- | --- |

| CLAUDE.md Configuration Elements |
| --- |
| Project context: Repository structure, tech stack, architecture overview |
| Coding conventions: Style guide, naming conventions, patterns to follow/avoid |
| Custom commands: Slash commands (e.g., /review, /test, /deploy) that trigger specific behaviors |
| Agent Skills: Reusable, team-specific capabilities defined for consistent behavior |
| MCP servers: Which servers to connect to and when to use their tools |
| Test/build commands: How to run tests, lint, build — so Claude can validate its own changes |

| Plan Mode vs Direct Execution Plan mode: Claude proposes actions for human review BEFORE executing Direct mode: Claude executes immediately without review step Use plan mode for: High-risk ops, production changes, major refactoring, deletions Use direct for: Low-risk tasks, development iteration, safe read operations Key benefit: Plan mode enables human oversight at critical decision points | Claude Code Built-in Tools Grep: Search FILE CONTENTS — function names, error messages, import statements Glob: Find FILES by name/extension pattern — e.g., **/*.test.tsx Read: Full file read — use before Write for complete file replacement Write: Full file write — always Read first for existing files Edit: Targeted modification using unique text matching Edit fallback: When text match is non-unique → use Read + Write instead Bash: Execute shell commands — run tests, git, npm, etc. |
| --- | --- |

| Structured Output Engineering |
| --- |
| JSON Schema: Define exact structure: field names, types, required fields, nesting — enables validation |
| Few-shot examples: Show model exactly what output looks like — include edge cases in examples |
| Extraction patterns: Prompt constructs that direct model to locate and extract specific fields from unstructured text |
| Chain-of-thought: Have model reason through ambiguities before committing to final structured output |
| Validation: Always validate output against schema before passing to downstream systems |
| Edge cases: Include malformed/missing/ambiguous inputs in few-shot examples |
| CI/CD feedback: Specify: file, line, issue description, severity level, suggested fix — for actionable output |

| Context Management Strategies |
| --- |
| Long documents: Chunking, summarization of earlier sections, or RAG (retrieve only relevant portions) |
| Multi-turn conversations: Selectively retain relevant context, prune resolved subtopics to prevent bloat |
| Multi-agent handoffs: Preserve: key decisions, gathered data, task state, user preferences, constraints |
| Session resumption: Resume when prior context is valid; start fresh with summaries when results are stale |
| fork_session: Creates parallel branches for comparing approaches without affecting original state |
| Context poisoning: Stale/incorrect info contaminating later reasoning — prune proactively |
| Handoff summaries: Customer ID, root cause, recommended action — for agents without transcript access |

| MCP Design Patterns |
| --- |
| Tool vs Resource: Tools: executable with side effects. Resources: read-only data exposure (catalogs, docs) |
| Community servers: Use for standard integrations (Jira, GitHub, Slack) — don't reinvent the wheel |
| Custom servers: Build for proprietary/team-specific workflows only |
| Content catalogs as resources: Give agents upfront visibility into available data without exploratory tool calls |
| Tool descriptions: Include: purpose, input formats, example queries, edge cases, and what it does NOT do |
| Overlapping descriptions: analyze_content vs analyze_document with identical descriptions → misrouting |
| System prompt effect: Keyword-sensitive system prompts can create unintended tool associations |

| Reliability & Escalation Patterns |
| --- |
| Human-in-the-loop: Pause for human review/approval at critical decision points — not just for errors |
| Self-evaluation: Agent critiques its own output for completeness/format before returning (not for fact verification) |
| Deterministic escalation: Define explicit criteria upfront — don't rely solely on model judgment for boundaries |
| Error handling: Detect failures, graceful degradation, retry with backoff, escalate when unresolvable |
| 80% FCR target: Accurate tool use + clear escalation criteria + self-evaluation before responding |
| Context isolation: Prevents cross-contamination, enables parallel execution, clean independent reasoning |

| PRACTICE QUESTIONS 250+ Questions Across All 5 Domains |
| --- |

| Domain 1: Agentic Architecture & Orchestration 27% of exam  |  29 questions |
| --- |

| Q1  |  Domain 1   What does the agentic loop continue on, and terminate on? |
| --- |
| A. Continues on end_turn; terminates on tool_use |
| ✓ B. Continues on tool_use; terminates on end_turn |
| C. Continues indefinitely until timeout |
| D. Terminates on both tool_use and end_turn |
| 💡 Explanation: The loop inspects stop_reason: 'tool_use' means execute tools and continue; 'end_turn' means Claude is done and the loop should terminate. |

| Q2  |  Domain 1   In a hub-and-spoke multi-agent architecture, who manages inter-subagent communication? |
| --- |
| A. Each subagent directly |
| ✓ B. The coordinator agent |
| C. A shared message bus |
| D. The user's system |
| 💡 Explanation: Hub-and-spoke architecture places the coordinator agent at the center — it manages all inter-subagent communication, error handling, and information routing. |

| Q3  |  Domain 1   Do subagents automatically inherit the coordinator's conversation history? |
| --- |
| A. Yes, always |
| B. Yes, but only system prompt |
| ✓ C. No — they operate with isolated context |
| D. Only if explicitly configured |
| 💡 Explanation: Subagents operate with isolated context. They do not inherit the coordinator's conversation history automatically — the coordinator must explicitly pass relevant context. |

| Q4  |  Domain 1   Which anti-pattern should be AVOIDED when implementing agentic loop termination? |
| --- |
| A. Checking stop_reason for end_turn |
| ✓ B. Setting iteration caps as the PRIMARY stopping mechanism |
| C. Executing tool results |
| D. Appending results to conversation history |
| 💡 Explanation: Setting arbitrary iteration caps as the primary stopping mechanism is an anti-pattern. The correct approach is using stop_reason. Caps can exist as safety fallbacks, not primary logic. |

| Q5  |  Domain 1   What is the risk of overly narrow task decomposition by a coordinator? |
| --- |
| A. Slower execution |
| B. Higher API costs |
| ✓ C. Incomplete coverage of broad research topics |
| D. Too many subagents spawned |
| 💡 Explanation: If the coordinator decomposes tasks too narrowly, broad research topics may not be fully covered — subtopics can be missed, leading to incomplete results. |

| Q6  |  Domain 1   When should you use hooks (e.g., PostToolUse) instead of prompt instructions for compliance? |
| --- |
| A. When compliance is probabilistic |
| ✓ B. When business rules require guaranteed compliance |
| C. When performance is critical |
| D. When using multiple subagents |
| 💡 Explanation: Hooks provide deterministic guarantees. Prompt instructions provide probabilistic compliance. For hard business rules (e.g., never approve refunds > $500), use hooks. |

| Q7  |  Domain 1   What does a PostToolUse hook primarily enable? |
| --- |
| A. Spawning new subagents |
| ✓ B. Intercepting tool results for transformation before the model processes them |
| C. Generating tool descriptions |
| D. Managing conversation history |
| 💡 Explanation: PostToolUse hooks intercept tool results after execution but before the model processes them, allowing data normalization, validation, or transformation. |

| Q8  |  Domain 1   In the agentic loop, how are tool results incorporated for the next reasoning step? |
| --- |
| A. Sent as a separate API call |
| B. Stored in a vector database |
| ✓ C. Appended to conversation history |
| D. Cached in memory |
| 💡 Explanation: Tool results are appended to conversation history so the model can reason about them in the next iteration and incorporate new information into its decision-making. |

| Q9  |  Domain 1   What distinguishes model-driven decision-making from pre-configured decision trees? |
| --- |
| A. Model-driven uses fewer tokens |
| ✓ B. Model-driven: Claude reasons about next tool from context; pre-configured: fixed sequences |
| C. Pre-configured is always more reliable |
| D. They are functionally equivalent |
| 💡 Explanation: Model-driven: Claude dynamically decides which tool to call next based on context and results. Pre-configured: tool sequences or decision trees are hardcoded regardless of context. |

| Q10  |  Domain 1   What should be included in structured handoff summaries when escalating to human agents? |
| --- |
| A. Full conversation transcript |
| ✓ B. Customer ID, root cause, refund amount, recommended action |
| C. Only the customer's latest message |
| D. A list of all tools that were called |
| 💡 Explanation: Effective handoff summaries include: customer ID, root cause, refund amount, and recommended action — especially when human agents lack direct access to the conversation transcript. |

| Q11  |  Domain 1   What is the role of the coordinator in task decomposition? |
| --- |
| A. Execute tools directly |
| ✓ B. Decompose tasks, delegate to subagents, aggregate results, decide which subagents to invoke |
| C. Only monitor subagent outputs |
| D. Provide the final response to the user |
| 💡 Explanation: The coordinator decomposes complex queries, delegates subtasks to appropriate subagents, aggregates their results, and intelligently decides which subagents are needed based on query complexity. |

| Q12  |  Domain 1   What does fork_session enable in Claude Code? |
| --- |
| A. Running parallel subagents |
| ✓ B. Creating parallel exploration branches from a shared codebase state |
| C. Forking a git repository |
| D. Splitting the conversation context |
| 💡 Explanation: fork_session creates parallel exploration branches — e.g., comparing two refactoring approaches or testing strategies from a shared codebase, without affecting the original state. |

| Q13  |  Domain 1   When should you use session resumption vs. starting fresh with injected summaries? |
| --- |
| A. Always resume to save tokens |
| ✓ B. Resume when prior context is mostly valid; start fresh when prior tool results are stale |
| C. Always start fresh for reliability |
| D. Only resume for coding tasks |
| 💡 Explanation: Resume when prior context is still valid and relevant. Start fresh with injected summaries when prior tool results are stale (e.g., file system changed, new requirements). |

| Q14  |  Domain 1   What is the primary benefit of routing all subagent communication through the coordinator? |
| --- |
| A. Lower latency |
| ✓ B. Observability, consistent error handling, and controlled information flow |
| C. Reduced token usage |
| D. Simpler subagent implementations |
| 💡 Explanation: Central routing provides observability (you can log and monitor all communication), consistent error handling, and controlled information flow between components. |

| Q15  |  Domain 1   How should a coordinator handle iterative refinement when initial synthesis is insufficient? |
| --- |
| A. Ask the user for more input |
| ✓ B. Evaluate gaps, re-delegate to search/analysis subagents with targeted queries, re-invoke synthesis |
| C. Return partial results immediately |
| D. Increase max_tokens |
| 💡 Explanation: The coordinator evaluates synthesis output for gaps, re-delegates to search and analysis subagents with more targeted queries, then re-invokes synthesis until coverage is sufficient. |

| Q16  |  Domain 1   Which stop_reason indicates Claude wants to use a tool? |
| --- |
| A. end_turn |
| B. max_tokens |
| ✓ C. tool_use |
| D. stop_sequence |
| 💡 Explanation: stop_reason: 'tool_use' means Claude has decided to use a tool. The loop should execute the tool and return results. stop_reason: 'end_turn' means Claude is done. |

| Q17  |  Domain 1   What is the best practice for partitioning research scope across subagents? |
| --- |
| A. Assign all subagents the same query for redundancy |
| ✓ B. Minimize duplication by assigning distinct subtopics or source types |
| C. Have only one subagent do research |
| D. Let each subagent decide its own scope |
| 💡 Explanation: Partitioning by distinct subtopics or source types (e.g., one searches academic papers, one searches news) minimizes duplication and ensures comprehensive coverage. |

| Q18  |  Domain 1   What does a PreToolUse hook enable? |
| --- |
| A. Transform results after tool execution |
| ✓ B. Intercept outgoing tool calls to enforce compliance rules (e.g., block certain actions) |
| C. Log tool call history |
| D. Select which tool to use |
| 💡 Explanation: PreToolUse hooks intercept outgoing tool calls before execution, enabling enforcement of compliance rules — for example, blocking refund requests above a threshold. |

| Q19  |  Domain 1   What should you inform a resumed session about for targeted re-analysis? |
| --- |
| A. The entire codebase |
| ✓ B. Specific file changes since last session |
| C. All previous tool calls |
| D. The user's original intent |
| 💡 Explanation: Inform a resumed session about specific file changes for targeted re-analysis rather than requiring full re-exploration, which wastes tokens and time. |

| Q20  |  Domain 1   In a customer support agent with MCP tools get_customer, lookup_order, process_refund, escalate_to_human — when should escalate_to_human be called? |
| --- |
| A. For every request |
| B. Only when billing disputes exceed $100 |
| ✓ C. When the agent cannot resolve within confidence threshold or business rules require it |
| D. Only when the customer asks |
| 💡 Explanation: Escalation decisions should be based on confidence levels, complexity, and explicit business rules (e.g., fraud cases always escalate), not just customer requests. |

| Q21  |  Domain 1   What anti-pattern involves checking assistant text content as a loop completion indicator? |
| --- |
| A. Using stop_reason |
| ✓ B. Checking if assistant response contains phrases like 'I have completed' |
| C. Counting tool calls |
| D. Using iteration caps |
| 💡 Explanation: Parsing assistant text for completion signals (e.g., 'Task complete') is an anti-pattern. Use stop_reason: 'end_turn' as the definitive completion indicator. |

| Q22  |  Domain 1   How should a coordinator dynamically select subagents rather than always using the full pipeline? |
| --- |
| A. Random selection |
| ✓ B. Analyze query requirements and invoke only relevant subagents |
| C. Always use all subagents in sequence |
| D. Let the user specify which subagents to use |
| 💡 Explanation: Coordinators should analyze query requirements and dynamically select which subagents to invoke — e.g., a simple factual query may only need the search subagent, not the full analysis pipeline. |

| Q23  |  Domain 1   Task Statement 1.3 covers what topic? |
| --- |
| A. Designing MCP tools |
| ✓ B. Configure subagent invocation, context passing, and spawning |
| C. Prompt engineering for agents |
| D. Error handling patterns |
| 💡 Explanation: Task Statement 1.3 specifically covers how to configure subagent invocation, pass context between agents, and spawn subagents appropriately within the agent SDK. |

| Q24  |  Domain 1   What is the Agent SDK's primary purpose compared to direct API calls? |
| --- |
| A. Lower cost per token |
| ✓ B. Higher-level abstractions for building agentic loops, tool orchestration, and multi-agent coordination |
| C. Faster response times |
| D. Larger context windows |
| 💡 Explanation: The Agent SDK provides higher-level abstractions that simplify building agentic applications — handling loop control flow, tool execution, multi-agent coordination, and lifecycle hooks. |

| Q25  |  Domain 1   For a multi-agent research system, what are the PRIMARY content domains? |
| --- |
| A. Prompt Engineering & Claude Code |
| ✓ B. Agentic Architecture & Orchestration, Tool Design & MCP Integration, Context Management & Reliability |
| C. Only Agentic Architecture |
| D. Tool Design & Prompt Engineering |
| 💡 Explanation: The multi-agent research system scenario (Scenario 3) primarily tests Agentic Architecture & Orchestration, Tool Design & MCP Integration, and Context Management & Reliability. |

| Q26  |  Domain 1   What is the overall structure of the Anthropic Partner Certification exam? |
| --- |
| A. 50 questions, 5 domains |
| ✓ B. Scenario-based: 4 scenarios picked randomly from 6, each with multiple questions |
| C. 100 multiple choice questions |
| D. Essay-based certification |
| 💡 Explanation: The exam uses scenario-based questions. 4 scenarios are presented from a pool of 6, each grounding a set of questions in realistic production contexts. |

| Q27  |  Domain 1   Which domain has the highest weighting in the exam? |
| --- |
| A. Prompt Engineering (20%) |
| B. Claude Code (20%) |
| ✓ C. Agentic Architecture & Orchestration (27%) |
| D. Tool Design & MCP (18%) |
| 💡 Explanation: Domain 1: Agentic Architecture & Orchestration has the highest weighting at 27% of scored content, reflecting the importance of agent system design. |

| Q28  |  Domain 1   A coordinator agent in a research system receives a broad query. What is the BEST approach? |
| --- |
| A. Send the full query to one subagent |
| ✓ B. Decompose into distinct subtopics, assign each to specialized subagents, aggregate and synthesize results |
| C. Search broadly first, then narrow |
| D. Ask the user to narrow the query |
| 💡 Explanation: Best practice: decompose the broad query into distinct subtopics, assign each to a specialized subagent (web search, document analysis, synthesis), then aggregate and synthesize the results. |

| Q29  |  Domain 1   What lifecycle hooks does the Agent SDK provide? |
| --- |
| A. onCreate, onDestroy |
| ✓ B. PreToolUse, PostToolUse, and other hooks for tool call interception and data normalization |
| C. beforeRun, afterRun |
| D. onMessage, onResponse |
| 💡 Explanation: The Agent SDK provides lifecycle hooks including PreToolUse (intercept before execution) and PostToolUse (intercept after execution) for tool call interception, compliance enforcement, and data normalization. |

| Domain 2: Tool Design & MCP Integration 18% of exam  |  23 questions |
| --- |

| Q30  |  Domain 2   What is the PRIMARY mechanism LLMs use for tool selection? |
| --- |
| A. Tool parameter types |
| ✓ B. Tool descriptions |
| C. Tool names |
| D. Response format instructions |
| 💡 Explanation: Tool descriptions are the primary mechanism — LLMs read descriptions to understand when and how to use each tool. Minimal descriptions lead to unreliable tool selection. |

| Q31  |  Domain 2   What should tool descriptions include beyond just a basic description? |
| --- |
| A. Only the function signature |
| ✓ B. Input formats, example queries, edge cases, and boundary explanations |
| C. Only return type |
| D. Performance characteristics |
| 💡 Explanation: Good tool descriptions include: what the tool does, input formats, example queries that should trigger it, edge cases, boundary conditions, and what it does NOT do. |

| Q32  |  Domain 2   What problem arises from having analyze_content and analyze_document with near-identical descriptions? |
| --- |
| A. Slower performance |
| B. Higher token costs |
| ✓ C. Misrouting — ambiguous descriptions cause Claude to pick the wrong tool |
| D. Tool execution errors |
| 💡 Explanation: Ambiguous or overlapping tool descriptions cause misrouting. Claude may consistently pick one tool over the other, or alternate unpredictably, leading to incorrect behavior. |

| Q33  |  Domain 2   How does system prompt wording affect tool selection? |
| --- |
| A. It has no effect on tool selection |
| ✓ B. Keyword-sensitive instructions can create unintended tool associations |
| C. Only tool descriptions matter |
| D. System prompts override tool descriptions |
| 💡 Explanation: System prompt wording affects tool selection — certain keywords can create unintended associations between context and tools. Test prompts for keyword sensitivity. |

| Q34  |  Domain 2   What does an MCP resource represent vs. an MCP tool? |
| --- |
| A. They are identical |
| ✓ B. Resources: static/queryable data; Tools: executable functions with side effects |
| C. Resources are faster than tools |
| D. Tools return data; resources execute actions |
| 💡 Explanation: MCP resources represent static or queryable data (like content catalogs, documentation). MCP tools are executable functions that may have side effects. Resources give agents visibility into available data. |

| Q35  |  Domain 2   When should you choose an existing community MCP server over a custom implementation? |
| --- |
| A. Always use custom implementations |
| ✓ B. For standard integrations (e.g., Jira, GitHub); reserve custom for team-specific workflows |
| C. Only when the community server is free |
| D. When the integration is simple |
| 💡 Explanation: Existing community MCP servers (for Jira, GitHub, Slack, etc.) save development time for standard integrations. Build custom servers only for proprietary or team-specific workflows. |

| Q36  |  Domain 2   What is the correct use of Grep in Claude Code? |
| --- |
| A. Find files by name or extension pattern |
| ✓ B. Search file contents for patterns (function names, error messages, import statements) |
| C. Execute shell commands |
| D. Read and write files |
| 💡 Explanation: Grep is for content search — searching inside files for patterns. Use it to find all callers of a function, locate error messages, or find import statements across a codebase. |

| Q37  |  Domain 2   What is Glob used for in Claude Code? |
| --- |
| A. Searching file contents |
| ✓ B. File path pattern matching — finding files by name or extension patterns |
| C. Executing code |
| D. Managing dependencies |
| 💡 Explanation: Glob is for file path pattern matching — e.g., **/*.test.tsx finds all TypeScript test files recursively. It's for navigating the file system structure, not reading file contents. |

| Q38  |  Domain 2   When should Read + Write be used instead of Edit? |
| --- |
| A. Always prefer Read + Write |
| ✓ B. When Edit fails due to non-unique text matches |
| C. For large files only |
| D. When creating new files |
| 💡 Explanation: Edit uses unique text matching for targeted modifications. When text isn't unique enough to match reliably, Edit will fail. Fall back to Read the entire file, modify in memory, then Write. |

| Q39  |  Domain 2   What does exposing content catalogs as MCP resources accomplish? |
| --- |
| A. Reduces API costs |
| ✓ B. Gives agents visibility into available data without requiring exploratory tool calls |
| C. Improves response speed |
| D. Enables content editing |
| 💡 Explanation: MCP resources let agents see what data is available upfront (like a catalog or index), eliminating the need to make exploratory tool calls just to discover what exists. |

| Q40  |  Domain 2   What is the key difference between MCP tool 'tools' and 'resources'? |
| --- |
| A. Tools are synchronous, resources are async |
| ✓ B. Tools execute actions; resources expose data for reading |
| C. Resources are more secure |
| D. Tools cost more tokens |
| 💡 Explanation: MCP tools execute actions (with potential side effects like creating records, sending emails). MCP resources expose data for reading (like documentation, catalogs, configuration). |

| Q41  |  Domain 2   What is Task Statement 2.1 focused on? |
| --- |
| A. MCP server setup |
| ✓ B. Design effective tool interfaces with clear descriptions and boundaries |
| C. Tool security |
| D. Built-in tools |
| 💡 Explanation: Task Statement 2.1 focuses on designing effective tool interfaces — specifically writing clear descriptions and defining boundaries so Claude knows exactly when and how to use each tool. |

| Q42  |  Domain 2   Why should tool boundaries be explicitly defined? |
| --- |
| A. For documentation purposes only |
| ✓ B. Prevent misuse and clarify when NOT to call a tool, reducing incorrect invocations |
| C. Required by the MCP protocol |
| D. For performance optimization |
| 💡 Explanation: Explicit boundaries (what a tool does AND does NOT do) prevent misuse. Without clear boundaries, Claude may call a tool in inappropriate contexts. |

| Q43  |  Domain 2   What MCP tools are shown in the Customer Support scenario? |
| --- |
| A. search, analyze, report |
| ✓ B. get_customer, lookup_order, process_refund, escalate_to_human |
| C. create_ticket, update_status, close_case |
| D. authenticate, fetch_data, send_email |
| 💡 Explanation: Scenario 1 explicitly lists: get_customer, lookup_order, process_refund, and escalate_to_human as the MCP tools for the customer support resolution agent. |

| Q44  |  Domain 2   What is Domain 2's weighting in the exam? |
| --- |
| A. 27% |
| B. 20% |
| ✓ C. 18% |
| D. 15% |
| 💡 Explanation: Domain 2: Tool Design & MCP Integration is 18% of scored content — the second smallest domain by weight. |

| Q45  |  Domain 2   Task Statement 2.5 covers which tools? |
| --- |
| A. MCP server tools |
| ✓ B. Read, Write, Edit, Bash, Grep, Glob — Claude Code built-in tools |
| C. Custom tool creation |
| D. API integration tools |
| 💡 Explanation: Task Statement 2.5 covers selecting and applying built-in tools effectively: Read, Write, Edit, Bash, Grep, and Glob — the core tools available in Claude Code. |

| Q46  |  Domain 2   What does 'PostToolUse hook for data normalization' solve? |
| --- |
| A. Different agents return different response formats |
| ✓ B. Heterogeneous data formats from different MCP tools (e.g., Unix timestamps vs ISO 8601) |
| C. Large data payloads |
| D. Authentication issues |
| 💡 Explanation: Different MCP tools may return timestamps as Unix timestamps, ISO 8601, or numeric status codes. PostToolUse hooks normalize these into a consistent format before the model processes them. |

| Q47  |  Domain 2   What makes tool descriptions 'effective' according to the exam guide? |
| --- |
| A. They are as short as possible |
| B. They are technically precise |
| ✓ C. They guide reliable selection: include usage context, input formats, examples, and boundaries |
| D. They list all possible parameters |
| 💡 Explanation: Effective tool descriptions guide Claude toward correct tool selection. They include: what the tool does, when to use it, input formats, example queries, edge cases, and what distinguishes it from similar tools. |

| Q48  |  Domain 2   In MCP server design, what should a 'tool' vs 'resource' decision be based on? |
| --- |
| A. Size of data returned |
| ✓ B. Whether the operation has side effects or just reads/exposes data |
| C. Performance requirements |
| D. Security level needed |
| 💡 Explanation: Use tools for operations with side effects (creating, updating, deleting, sending). Use resources for read-only data exposure. This maintains clear semantic meaning in your MCP design. |

| Q49  |  Domain 2   How does Claude Code's Edit tool handle modifications? |
| --- |
| A. Rewrites the entire file |
| ✓ B. Uses targeted modifications with unique text matching |
| C. Creates a diff and applies it |
| D. Requires explicit line numbers |
| 💡 Explanation: Edit uses unique text matching — you specify the exact text to find (which must appear exactly once) and what to replace it with, enabling surgical edits without rewriting the whole file. |

| Q50  |  Domain 2   What are the 6 exam scenarios? |
| --- |
| A. Various API tasks |
| ✓ B. Customer Support Agent, Code Generation, Multi-Agent Research, Developer Productivity, CI/CD Integration, Structured Data Extraction |
| C. Security, Performance, Reliability, Cost, Quality, Speed |
| D. Chat, Code, Analysis, Generation, Extraction, Integration |
| 💡 Explanation: The 6 scenarios are: (1) Customer Support Resolution Agent, (2) Code Generation with Claude Code, (3) Multi-Agent Research System, (4) Developer Productivity with Claude, (5) Claude Code for CI/CD, (6) Structured Data Extraction. |

| Q51  |  Domain 2   The CI/CD scenario (Scenario 5) requires designing prompts to do what? |
| --- |
| A. Deploy code automatically |
| ✓ B. Run automated code reviews, generate test cases, provide PR feedback with actionable output |
| C. Optimize code performance |
| D. Document codebases |
| 💡 Explanation: Scenario 5: Claude Code for CI/CD — the system runs automated code reviews, generates test cases, and provides PR feedback. The design challenge is prompts that are actionable and minimize false positives. |

| Q52  |  Domain 2   What is the Scenario 1 (Customer Support) primary resolution target? |
| --- |
| A. 95% accuracy |
| ✓ B. 80%+ first-contact resolution |
| C. Under 60 second response time |
| D. Zero escalations |
| 💡 Explanation: Scenario 1 explicitly states the target is 80%+ first-contact resolution — resolving customer issues without escalation to human agents. |

| Domain 3: Claude Code Configuration & Workflows 20% of exam  |  17 questions |
| --- |

| Q53  |  Domain 3   What is CLAUDE.md used for? |
| --- |
| A. Claude API documentation |
| ✓ B. Configuration file for team workflows — project context, commands, conventions, agent skills |
| C. Model training data |
| D. Error logging |
| 💡 Explanation: CLAUDE.md is a configuration file in your repository that provides Claude Code with project-specific context: coding conventions, team workflows, custom commands, and how to work with the codebase. |

| Q54  |  Domain 3   What does 'plan mode' in Claude Code do vs. direct execution? |
| --- |
| A. Plan mode is faster |
| ✓ B. Plan mode: Claude proposes actions for review before executing; direct: executes immediately |
| C. Plan mode uses fewer tokens |
| D. They are identical modes |
| 💡 Explanation: Plan mode has Claude outline its intended actions (what files to modify, what commands to run) for human review before executing. Direct mode executes immediately without review. |

| Q55  |  Domain 3   What are 'Agent Skills' in Claude Code? |
| --- |
| A. Built-in tool capabilities |
| ✓ B. Custom, reusable capabilities defined in CLAUDE.md that extend Claude's behavior for team workflows |
| C. API endpoints |
| D. Pre-written code templates |
| 💡 Explanation: Agent Skills are custom capabilities defined in CLAUDE.md that give Claude team-specific knowledge and workflows — like how to run your test suite, deploy process, or code review standards. |

| Q56  |  Domain 3   What is a 'slash command' in Claude Code? |
| --- |
| A. A shell command |
| ✓ B. A custom shorthand command defined in CLAUDE.md to trigger specific agent behaviors |
| C. A CLI flag |
| D. A markdown heading |
| 💡 Explanation: Slash commands (e.g., /review, /deploy) are custom shortcuts defined in CLAUDE.md that trigger specific, pre-configured agent behaviors, saving time for common repetitive tasks. |

| Q57  |  Domain 3   Domain 3: Claude Code Configuration & Workflows has what exam weighting? |
| --- |
| A. 27% |
| B. 18% |
| C. 15% |
| ✓ D. 20% |
| 💡 Explanation: Domain 3: Claude Code Configuration & Workflows is 20% of scored content — tied with Domain 4 for second-highest weighting. |

| Q58  |  Domain 3   In Scenario 5 (CI/CD), what are the primary domains tested? |
| --- |
| A. Agentic Architecture & Tool Design |
| ✓ B. Claude Code Configuration & Workflows, Prompt Engineering & Structured Output |
| C. Context Management & Claude Code |
| D. Only Prompt Engineering |
| 💡 Explanation: Scenario 5 (Claude Code for Continuous Integration) primarily tests Claude Code Configuration & Workflows and Prompt Engineering & Structured Output — designing prompts for code review feedback. |

| Q59  |  Domain 3   What is the primary challenge in Scenario 2 (Code Generation with Claude Code)? |
| --- |
| A. Managing large context windows |
| ✓ B. Integrating Claude Code into development workflow with custom commands, CLAUDE.md, and plan mode |
| C. Designing MCP tools |
| D. Handling multi-agent coordination |
| 💡 Explanation: Scenario 2 focuses on integrating Claude Code effectively: configuring CLAUDE.md for the project, creating custom slash commands, and deciding when to use plan mode vs. direct execution. |

| Q60  |  Domain 3   When is 'plan mode' preferable over 'direct execution' in Claude Code? |
| --- |
| A. For all coding tasks |
| ✓ B. For high-risk operations or when human review of the approach is needed before making changes |
| C. Only for large refactoring |
| D. When token usage needs to be minimized |
| 💡 Explanation: Plan mode is preferable for high-risk operations (deleting files, major refactoring, production deployments) or any time a human should review the approach before changes are made. |

| Q61  |  Domain 3   What should CLAUDE.md include for a team workflow? |
| --- |
| A. Only the API key |
| ✓ B. Project structure, coding conventions, test commands, deployment process, custom slash commands |
| C. Just a project description |
| D. The full codebase documentation |
| 💡 Explanation: Effective CLAUDE.md includes: project structure overview, coding conventions, how to run tests, deployment processes, custom slash commands, and any team-specific workflows Claude should follow. |

| Q62  |  Domain 3   What does fork_session allow in Claude Code's agentic context? |
| --- |
| A. Deploying to multiple environments |
| ✓ B. Creating parallel exploration branches from shared codebase state for comparison |
| C. Forking a GitHub repository |
| D. Running multiple CI/CD pipelines |
| 💡 Explanation: fork_session creates divergent branches from the current session state — useful for comparing two refactoring approaches or testing strategies side-by-side without contaminating each other. |

| Q63  |  Domain 3   For CI/CD integration (Scenario 5), what design goal is stated? |
| --- |
| A. Maximize code coverage |
| ✓ B. Automated code review, test generation, pull request feedback with actionable output, minimize false positives |
| C. Replace human code review entirely |
| D. Run all tests in parallel |
| 💡 Explanation: Scenario 5 goal: design prompts that provide actionable feedback and minimize false positives in automated code reviews, test case generation, and PR feedback. |

| Q64  |  Domain 3   What is MCP server integration in Claude Code primarily used for? |
| --- |
| A. Only for database connections |
| ✓ B. Extending Claude Code with external tools and services (Jira, GitHub, internal APIs) |
| C. Managing conversation history |
| D. Controlling token usage |
| 💡 Explanation: MCP server integration in Claude Code extends its capabilities with external tools — connecting to project management systems (Jira), version control APIs (GitHub), and internal services. |

| Q65  |  Domain 3   When should you use Read + Write instead of Edit in Claude Code? |
| --- |
| A. For all file modifications |
| ✓ B. When the text to be modified is not unique in the file (Edit fails on non-unique matches) |
| C. Only for large files |
| D. For binary files |
| 💡 Explanation: Edit requires a unique text match. When the same text appears multiple times, Edit can't determine which occurrence to modify. Read the file, modify the content in the response, then Write it back. |

| Q66  |  Domain 3   What does 'Glob for **/*.test.tsx' accomplish? |
| --- |
| A. Searches content of test files |
| ✓ B. Finds all TypeScript test files at any depth in the file tree |
| C. Runs all test files |
| D. Compiles TypeScript test files |
| 💡 Explanation: Glob pattern **/*.test.tsx uses ** to match any directory depth and *.test.tsx to match files ending in .test.tsx — finding all TypeScript test files recursively. |

| Q67  |  Domain 3   What is the benefit of configuring Agent Skills in CLAUDE.md? |
| --- |
| A. Reduces API costs |
| ✓ B. Gives Claude reusable, team-specific behaviors without repeating instructions each session |
| C. Makes Claude faster |
| D. Required for MCP server usage |
| 💡 Explanation: Agent Skills in CLAUDE.md persist team-specific behaviors across sessions — Claude knows your deployment process, testing conventions, and code review standards without re-explaining each time. |

| Q68  |  Domain 3   Scenario 4 (Developer Productivity with Claude) primarily tests which domains? |
| --- |
| A. Context & Reliability only |
| ✓ B. Tool Design & MCP Integration, Claude Code Configuration & Workflows, Agentic Architecture & Orchestration |
| C. Prompt Engineering & Agentic Architecture |
| D. Only Claude Code |
| 💡 Explanation: Scenario 4: Developer Productivity primarily tests Tool Design & MCP Integration, Claude Code Configuration & Workflows, and Agentic Architecture & Orchestration. |

| Q69  |  Domain 3   What does CLAUDE.md's 'MCP server integration' section typically include? |
| --- |
| A. API keys and secrets |
| ✓ B. Which MCP servers to connect, what tools they expose, and when to use them |
| C. Performance benchmarks |
| D. Model parameters |
| 💡 Explanation: The MCP server integration section in CLAUDE.md documents: which servers to connect to, what tools each exposes, and guidance on when to use specific tools — extending Claude Code's capabilities. |

| Domain 4: Prompt Engineering & Structured Output 20% of exam  |  18 questions |
| --- |

| Q70  |  Domain 4   What does 'structured output' primarily rely on for reliability? |
| --- |
| A. Large context windows |
| ✓ B. JSON schemas, few-shot examples, and extraction patterns |
| C. Chain-of-thought prompting only |
| D. Lower temperature settings |
| 💡 Explanation: Reliable structured output requires: JSON schemas (to define the exact structure), few-shot examples (to show the model what good output looks like), and extraction patterns (to handle varied inputs). |

| Q71  |  Domain 4   What is the purpose of using few-shot examples in structured output prompts? |
| --- |
| A. Reduce token usage |
| ✓ B. Show the model the exact format and content quality expected in its response |
| C. Speed up inference |
| D. Reduce hallucination generally |
| 💡 Explanation: Few-shot examples demonstrate exactly what the output should look like — they teach the model the expected structure, content, and handling of edge cases through concrete examples. |

| Q72  |  Domain 4   Domain 4: Prompt Engineering & Structured Output has what weighting? |
| --- |
| A. 27% |
| B. 18% |
| C. 15% |
| ✓ D. 20% |
| 💡 Explanation: Domain 4: Prompt Engineering & Structured Output is 20% of scored content — tied with Domain 3 for second-highest weight after Domain 1 (27%). |

| Q73  |  Domain 4   For CI/CD code review prompts, what does 'minimize false positives' require? |
| --- |
| A. Checking fewer files |
| ✓ B. Precise prompt design: clear criteria, severity levels, and scope boundaries |
| C. Using lower temperatures |
| D. Limiting output length |
| 💡 Explanation: Minimizing false positives requires precise prompt design: define clear criteria for what constitutes an issue, specify severity levels (error vs. warning), and scope boundaries (what NOT to flag). |

| Q74  |  Domain 4   What is an 'extraction pattern' in structured output prompting? |
| --- |
| A. A regex for parsing |
| ✓ B. A prompt technique that directs the model to locate and extract specific information from unstructured input |
| C. A JSON path expression |
| D. A database query pattern |
| 💡 Explanation: Extraction patterns are prompt constructs that guide the model to find specific information within unstructured text — e.g., 'Extract the date, amount, and vendor from the following invoice text.' |

| Q75  |  Domain 4   In Scenario 6 (Structured Data Extraction), the system must do what with JSON schemas? |
| --- |
| A. Generate schemas automatically |
| ✓ B. Validate extracted output against JSON schemas |
| C. Convert JSON to XML |
| D. Store schemas in MCP resources |
| 💡 Explanation: Scenario 6 requires the extraction system to validate its output against predefined JSON schemas, ensuring the extracted data conforms to the expected structure before downstream use. |

| Q76  |  Domain 4   What is the MOST important element of a prompt for producing reliable structured output? |
| --- |
| A. Model temperature |
| ✓ B. A clear, detailed schema or format specification with examples |
| C. Extensive system prompt length |
| D. Using XML instead of JSON |
| 💡 Explanation: A clear schema or format specification with examples is most important. The model needs to understand exactly what structure to produce, and examples demonstrate ambiguous cases. |

| Q77  |  Domain 4   How should 'edge cases' be handled in structured output prompts? |
| --- |
| A. Ignore them and handle in post-processing only |
| ✓ B. Include them in few-shot examples to show the model the expected output for unusual inputs |
| C. Use a separate prompt for edge cases |
| D. Lower the confidence threshold |
| 💡 Explanation: Include edge cases in few-shot examples. Show the model what structured output should look like when input is ambiguous, missing fields, or malformed — otherwise it will improvise inconsistently. |

| Q78  |  Domain 4   What makes code review feedback 'actionable' in a CI/CD context? |
| --- |
| A. Including line numbers only |
| ✓ B. Specific file, line, issue description, severity, and suggested fix |
| C. A pass/fail result |
| D. Detailed explanation of the coding standard |
| 💡 Explanation: Actionable feedback includes: specific file and line location, clear description of the issue, severity level, and a concrete suggested fix — enough for a developer to act without additional context. |

| Q79  |  Domain 4   What prompting technique is specifically mentioned for structured output engineering? |
| --- |
| A. Tree of thought |
| ✓ B. Few-shot examples, JSON schemas, extraction patterns |
| C. Constitutional AI |
| D. Reflection prompting |
| 💡 Explanation: The exam guide specifically mentions: few-shot examples, JSON schemas, and extraction patterns as the core techniques for prompt engineering targeting structured output. |

| Q80  |  Domain 4   What is the risk of under-specified output schemas? |
| --- |
| A. Slower response times |
| ✓ B. Inconsistent field names, nested structures, or missing fields across responses |
| C. Higher API costs |
| D. Model refusal |
| 💡 Explanation: Under-specified schemas lead to inconsistency — the model may use different field names, nest data differently, or omit fields across requests, breaking downstream systems. |

| Q81  |  Domain 4   Scenario 6 primary domains are? |
| --- |
| A. Agentic Architecture & Tool Design |
| ✓ B. Prompt Engineering & Structured Output, Context Management & Reliability |
| C. Claude Code & Tool Design |
| D. Only Prompt Engineering |
| 💡 Explanation: Scenario 6 (Structured Data Extraction) primarily tests Prompt Engineering & Structured Output and Context Management & Reliability — handling edge cases and maintaining accuracy. |

| Q82  |  Domain 4   What does 'chain of thought' prompting help with in structured output? |
| --- |
| A. Reduces output length |
| ✓ B. Improves accuracy by having the model reason through the problem before producing structured output |
| C. Enforces JSON format |
| D. Eliminates the need for few-shot examples |
| 💡 Explanation: Chain-of-thought prompting can improve accuracy in complex extraction tasks by having the model reason through ambiguities before committing to the final structured output. |

| Q83  |  Domain 4   When building prompts for automated test generation, what should be specified? |
| --- |
| A. Only the test framework |
| ✓ B. Test types (unit/integration), coverage targets, edge cases to consider, output format |
| C. The programming language only |
| D. Number of tests to generate |
| 💡 Explanation: For test generation prompts: specify test types, coverage targets, edge cases to handle, output format (test file structure), and any framework-specific conventions (Jest, pytest, etc.). |

| Q84  |  Domain 4   What problem does 'extraction pattern' prompting specifically address? |
| --- |
| A. Long context performance |
| ✓ B. Reliably pulling structured data from varied, unstructured source documents |
| C. JSON validation errors |
| D. Hallucination in creative tasks |
| 💡 Explanation: Extraction patterns address the challenge of consistently pulling specific data fields from unstructured text that may vary in format, layout, and phrasing across documents. |

| Q85  |  Domain 4   What characterizes the 'ideal candidate' for this certification? |
| --- |
| A. A developer who uses Claude chat |
| ✓ B. A solution architect with 6+ months building production apps with Claude APIs, Agent SDK, Claude Code, MCP |
| C. A data scientist using Claude for analysis |
| D. A product manager designing Claude features |
| 💡 Explanation: The target candidate is a solution architect who designs and implements production applications with Claude, with 6+ months of hands-on experience with Claude APIs, Agent SDK, Claude Code, and MCP. |

| Q86  |  Domain 4   For the structured data extraction system (Scenario 6), what does 'integrate with downstream systems' require? |
| --- |
| A. REST API knowledge |
| ✓ B. Consistent, validated structured output that downstream systems can reliably parse |
| C. Database design skills |
| D. Microservices architecture knowledge |
| 💡 Explanation: Downstream integration requires that extracted data is consistently structured and validated — schema compliance ensures downstream systems can reliably parse the output without custom error handling. |

| Q87  |  Domain 4   JSON schema in structured output prompting serves what primary purpose? |
| --- |
| A. Compress the output |
| ✓ B. Define the exact structure, field names, types, and required fields the model must produce |
| C. Validate user input |
| D. Generate documentation |
| 💡 Explanation: JSON schema defines exactly what structure the model must produce: field names, data types, required vs. optional fields, nesting, and constraints — enabling validation and downstream integration. |

| Domain 5: Context Management & Reliability 15% of exam  |  18 questions |
| --- |

| Q88  |  Domain 5   What are the three main challenges of context window management? |
| --- |
| A. Speed, cost, accuracy |
| ✓ B. Long documents, multi-turn conversations, multi-agent handoffs |
| C. Tokenization, truncation, compression |
| D. System prompts, user messages, tool results |
| 💡 Explanation: The exam guide specifically identifies three context management challenges: long documents, multi-turn conversations, and multi-agent handoffs — each requiring different strategies. |

| Q89  |  Domain 5   Domain 5: Context Management & Reliability has what weighting? |
| --- |
| A. 27% |
| B. 20% |
| C. 18% |
| ✓ D. 15% |
| 💡 Explanation: Domain 5: Context Management & Reliability is 15% of scored content — the smallest domain by weight. |

| Q90  |  Domain 5   What is a 'human-in-the-loop workflow' in the reliability context? |
| --- |
| A. A workflow where humans type all responses |
| ✓ B. A workflow that pauses for human review/approval at critical decision points |
| C. A workflow using human feedback for training |
| D. Manual tool execution |
| 💡 Explanation: Human-in-the-loop workflows include checkpoints where a human reviews and approves agent decisions before proceeding — critical for high-stakes actions, ambiguous cases, or policy boundaries. |

| Q91  |  Domain 5   What is 'self-evaluation pattern' in agent reliability? |
| --- |
| A. The model evaluating user input quality |
| ✓ B. The agent critiquing its own output before returning it, checking for completeness and accuracy |
| C. Automated testing of prompts |
| D. Benchmark performance measurement |
| 💡 Explanation: Self-evaluation patterns have the agent review its own response: 'Does this answer the question? Are there gaps? Is this format correct?' — catching errors before they reach the user. |

| Q92  |  Domain 5   What escalation criteria should be defined for a customer support agent targeting 80% first-contact resolution? |
| --- |
| A. Escalate all complex issues |
| ✓ B. Clear rules: confidence thresholds, issue types requiring human judgment, policy boundaries |
| C. Escalate based on response time |
| D. Escalate only when tools fail |
| 💡 Explanation: For 80%+ first-contact resolution, define explicit escalation criteria: confidence thresholds below X%, specific issue categories (fraud, legal), and policy boundaries the agent cannot exceed. |

| Q93  |  Domain 5   When managing context across multi-agent handoffs, what should be preserved? |
| --- |
| A. The entire conversation history |
| ✓ B. Key decisions made, relevant data gathered, current task state, and any user preferences |
| C. Only tool call logs |
| D. Only the most recent message |
| 💡 Explanation: Multi-agent handoffs should preserve: key decisions, relevant gathered data, current task state, user preferences, and any constraints — enough for the receiving agent to continue without redundant work. |

| Q94  |  Domain 5   What is the recommended approach for handling very long documents that exceed context limits? |
| --- |
| A. Truncate from the beginning |
| ✓ B. Chunking, summarization, or retrieval-augmented approaches to fit relevant content |
| C. Increase max_tokens parameter |
| D. Use a different model |
| 💡 Explanation: For long documents: use chunking (process in segments), summarization (compress earlier sections), or RAG (retrieve only relevant portions) to fit within context limits while preserving needed information. |

| Q95  |  Domain 5   What does 'error handling' in agentic workflows primarily involve? |
| --- |
| A. Try-catch blocks only |
| ✓ B. Detecting tool failures, graceful degradation, retry logic, and deciding when to escalate |
| C. Logging all errors |
| D. Restarting the agent |
| 💡 Explanation: Agentic error handling includes: detecting tool failures (HTTP errors, timeouts), graceful degradation (what to do without the tool), retry logic with backoff, and escalation criteria for unresolvable failures. |

| Q96  |  Domain 5   What is 'context poisoning' in multi-agent systems? |
| --- |
| A. Injecting malicious prompts |
| ✓ B. Stale or incorrect information from earlier turns contaminating later reasoning |
| C. Exceeding the context limit |
| D. Duplicate tool results in history |
| 💡 Explanation: Context poisoning occurs when stale, incorrect, or irrelevant information from earlier conversation turns influences the model's later reasoning — especially problematic in long multi-turn conversations. |

| Q97  |  Domain 5   For multi-turn customer support conversations, what context management challenge is primary? |
| --- |
| A. Token costs |
| ✓ B. Maintaining coherent state across many turns while preventing context pollution from resolved issues |
| C. Response latency |
| D. Tool availability |
| 💡 Explanation: In long multi-turn support conversations, the primary challenge is maintaining coherent state while preventing resolved issues and outdated context from influencing current reasoning. |

| Q98  |  Domain 5   What makes 'escalation decisions' reliable in an agentic system? |
| --- |
| A. Always escalating uncertain cases |
| ✓ B. Clear, deterministic criteria defined upfront — not left to model judgment in ambiguous cases |
| C. Using a separate escalation model |
| D. Counting conversation turns |
| 💡 Explanation: Reliable escalation decisions come from clear, deterministic criteria defined during system design — not relying solely on model judgment, which can be inconsistent for boundary cases. |

| Q99  |  Domain 5   What is the purpose of 'structured handoff summaries' when escalating to human agents? |
| --- |
| A. For audit logging only |
| ✓ B. Give human agents actionable context to continue the conversation without reading the full transcript |
| C. To close the agent session |
| D. For model fine-tuning data |
| 💡 Explanation: Structured handoff summaries (customer ID, root cause, recommended action) give human agents instant actionable context — critical when they don't have access to the full conversation transcript. |

| Q100  |  Domain 5   In Scenario 6 (Structured Data Extraction), the system 'maintains high accuracy' — what does this require for context management? |
| --- |
| A. Larger context windows |
| ✓ B. Proper handling of edge cases, validation against schemas, and graceful error handling for malformed input |
| C. Caching all previous extractions |
| D. Only processing one document at a time |
| 💡 Explanation: High accuracy requires: edge case handling in prompts, output validation against JSON schemas, and graceful error handling when input documents are malformed, incomplete, or unexpected format. |

| Q101  |  Domain 5   What is the 'self-evaluation' anti-pattern to avoid? |
| --- |
| A. Checking output format |
| ✓ B. Having the same model evaluate its own factual claims without external verification |
| C. Asking for JSON output |
| D. Using few-shot examples |
| 💡 Explanation: Self-evaluation of factual claims is limited because the same model that made an error will often evaluate that error as correct. Use self-evaluation for format/completeness checks, not fact verification. |

| Q102  |  Domain 5   How should context be managed when the same Claude instance handles multiple conversation turns with the same user? |
| --- |
| A. Clear context between every turn |
| ✓ B. Selectively retain relevant prior context while pruning resolved subtopics |
| C. Always pass the full history |
| D. Use a database for all context |
| 💡 Explanation: For multi-turn conversations, selectively retain relevant context (current goals, important decisions, user preferences) while pruning resolved subtopics to prevent context bloat and cost escalation. |

| Q103  |  Domain 5   What does 'making sound escalation and reliability decisions' include per the exam guide? |
| --- |
| A. Only technical error handling |
| ✓ B. Error handling, human-in-the-loop workflows, and self-evaluation patterns |
| C. Only human escalation logic |
| D. Load balancing and failover |
| 💡 Explanation: The exam guide explicitly states: sound escalation and reliability decisions include error handling, human-in-the-loop workflows, and self-evaluation patterns — all three together. |

| Q104  |  Domain 5   When 80% first-contact resolution is the target for a customer support agent, what reliability pattern is most important? |
| --- |
| A. Always escalating quickly |
| ✓ B. Accurate tool use, clear escalation criteria, and self-evaluation before responding |
| C. Increasing context window |
| D. Adding more MCP tools |
| 💡 Explanation: For 80%+ FCR: accurate tool use (correct MCP calls), clear escalation criteria (when to escalate vs. resolve), and self-evaluation (verify response addresses the issue) work together. |

| Q105  |  Domain 5   In multi-agent systems, why does context isolation of subagents matter? |
| --- |
| A. Reduces cost |
| ✓ B. Prevents cross-contamination between agents and allows parallel execution with independent reasoning |
| C. Required by MCP protocol |
| D. Simplifies debugging only |
| 💡 Explanation: Context isolation prevents cross-contamination (one subagent's incorrect reasoning affecting another), enables true parallel execution, and allows each subagent to reason independently from clean state. |

| EXAM STRATEGY & FINAL TIPS How to Approach Scenario-Based Questions |
| --- |

## **Approach for Scenario-Based Questions**
1. READ the scenario context carefully — understand what system is being built, what tools are available, and what the target metric is (e.g., 80% FCR).
2. IDENTIFY the primary domains for the scenario — questions will focus on those domain competencies.
3. ELIMINATE answers that contradict core principles (e.g., setting arbitrary iteration caps as PRIMARY stopping mechanism is always wrong).
4. LOOK for 'deterministic vs probabilistic' distinctions — hooks give guarantees, prompts give guidance.
5. REMEMBER context isolation — subagents never automatically inherit coordinator history.

| Key Exam Traps to Avoid |
| --- |
| • Confusing stop_reason tool_use (continue) with end_turn (terminate) — get these exactly right |
| • Thinking prompt instructions can replace hooks for guaranteed compliance — hooks are deterministic, prompts are probabilistic |
| • Assuming subagents inherit coordinator conversation history — they don't (context isolation) |
| • Confusing Grep (searches file CONTENTS) vs Glob (matches file PATHS/NAMES) |
| • Thinking Edit always works — it fails on non-unique text matches; fall back to Read+Write |
| • Confusing MCP tools (executable, side effects) vs MCP resources (read-only data exposure) |
| • Missing that fork_session is about parallel exploration branches, not git forks |
| • Forgetting that Plan Mode requires human review before execution (unlike Direct mode) |
