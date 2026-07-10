import { useState, useEffect } from "react";

const ALL_QUESTIONS = [
  // ─── DOMAIN 1: Agentic Architecture & Orchestration ───
  // Task 1.1 – Agentic loops
  {
    id: 1, domain: 1, task: "1.1", scenario: "Customer Support Agent",
    stem: "Your agentic loop code checks whether the assistant's text content contains the phrase 'TASK COMPLETE' to decide when to stop. What is the primary problem with this approach?",
    options: {
      A: "It increases API costs because text generation is more expensive than tool use.",
      B: "It is an anti-pattern; loop termination should be driven by stop_reason === 'end_turn', not natural language signals.",
      C: "The phrase 'TASK COMPLETE' may be too short for the model to generate reliably.",
      D: "Tool results cannot be appended to the conversation when using text-based loop control."
    },
    correct: "B",
    explanation: "Parsing natural language signals to determine loop termination is an explicit anti-pattern in the exam guide. The correct mechanism is inspecting stop_reason: continue when 'tool_use', terminate when 'end_turn'. Text content is unreliable and model-dependent."
  },
  {
    id: 2, domain: 1, task: "1.1", scenario: "Developer Productivity",
    stem: "After each tool call returns a result, what must your agentic loop do before sending the next request to Claude?",
    options: {
      A: "Reset the conversation history to reduce token costs.",
      B: "Validate the tool result schema before appending it.",
      C: "Append the tool result to the conversation history so Claude can reason about the next action.",
      D: "Increment an iteration counter and verify it hasn't exceeded the cap."
    },
    correct: "C",
    explanation: "Tool results must be appended to conversation context between iterations. This is how the model incorporates new information into its reasoning for the next step. Without this, each iteration starts blind."
  },
  {
    id: 3, domain: 1, task: "1.1", scenario: "Multi-Agent Research",
    stem: "Which stop_reason value signals that Claude has decided to call one or more tools rather than produce a final answer?",
    options: { A: "tool_call", B: "function_use", C: "tool_use", D: "requires_action" },
    correct: "C",
    explanation: "The two key stop_reason values for agentic loops are 'tool_use' (Claude wants to call a tool — continue the loop) and 'end_turn' (Claude is done — terminate). The exam tests whether you know the exact string values."
  },

  // Task 1.2 – Multi-agent orchestration
  {
    id: 4, domain: 1, task: "1.2", scenario: "Multi-Agent Research",
    stem: "In a hub-and-spoke multi-agent research system, a subagent encounters an error it cannot resolve. To which agent should it propagate the error?",
    options: {
      A: "Directly to the synthesis subagent so it can adjust its output.",
      B: "To the coordinator agent, which manages all inter-subagent communication.",
      C: "To all subagents simultaneously via a shared error bus.",
      D: "It should retry indefinitely until the error resolves."
    },
    correct: "B",
    explanation: "Hub-and-spoke architecture requires all inter-subagent communication, error handling, and information routing to flow through the coordinator. Direct subagent-to-subagent communication breaks observability and consistent error handling."
  },
  {
    id: 5, domain: 1, task: "1.2", scenario: "Multi-Agent Research",
    stem: "After running your research pipeline on 'Impact of AI on creative industries', final reports cover only visual arts, missing music, writing, and film. Coordinator logs show subtasks: 'AI in digital art', 'AI in graphic design', 'AI in photography'. What is the root cause?",
    options: {
      A: "The synthesis agent lacks instructions for identifying coverage gaps.",
      B: "The web search agent's queries were insufficiently broad.",
      C: "The coordinator's task decomposition was too narrow, assigning only visual art subtopics.",
      D: "The document analysis agent used overly restrictive relevance criteria."
    },
    correct: "C",
    explanation: "The logs directly show the root cause: the coordinator decomposed 'creative industries' into only visual arts subtasks. All downstream agents executed their assigned tasks correctly — the flaw is in what they were assigned. Blaming downstream agents (A, B, D) ignores the evidence in the logs."
  },
  {
    id: 6, domain: 1, task: "1.2", scenario: "Multi-Agent Research",
    stem: "Your coordinator always routes every query through the full pipeline: search → analyze → synthesize → report. For simple factual queries, this is slow and wasteful. What is the better design?",
    options: {
      A: "Pre-classify all queries with a separate ML model before the coordinator sees them.",
      B: "Reduce the number of subagents to two for all query types.",
      C: "Design the coordinator to analyze query requirements and dynamically select which subagents to invoke.",
      D: "Give each subagent the ability to decide independently whether to pass results forward."
    },
    correct: "C",
    explanation: "Coordinators should dynamically select which subagents to invoke based on query complexity and requirements, rather than always routing through the full pipeline. This is more efficient and is the pattern described in Task Statement 1.2."
  },

  // Task 1.3 – Subagent context passing
  {
    id: 7, domain: 1, task: "1.3", scenario: "Multi-Agent Research",
    stem: "A synthesis subagent produces a coherent report but with no source citations, even though the web search and document analysis subagents found well-cited results. What is the most likely cause?",
    options: {
      A: "The synthesis subagent's model version does not support citation generation.",
      B: "The coordinator did not pass the search results and analysis outputs into the synthesis subagent's prompt.",
      C: "The synthesis subagent automatically summarizes and discards metadata.",
      D: "Citations require a separate MCP tool that was not configured."
    },
    correct: "B",
    explanation: "Subagents have isolated context — they do NOT inherit the coordinator's conversation history or other subagents' outputs automatically. Complete findings from prior agents must be explicitly included in the subagent's prompt. This is one of the most commonly tested concepts in Domain 1."
  },
  {
    id: 8, domain: 1, task: "1.3", scenario: "Multi-Agent Research",
    stem: "What must be included in a coordinator's allowedTools configuration for it to be able to spawn subagents?",
    options: {
      A: "spawn_agent", B: "SubAgentTool", C: "Task", D: "delegate"
    },
    correct: "C",
    explanation: "The Task tool is the mechanism for spawning subagents. The coordinator's allowedTools must explicitly include 'Task'. Without this, the coordinator cannot invoke any subagents regardless of its system prompt instructions."
  },
  {
    id: 9, domain: 1, task: "1.3", scenario: "Multi-Agent Research",
    stem: "You want the web search and document analysis subagents to run simultaneously rather than sequentially. How do you achieve this?",
    options: {
      A: "Set parallel: true on each Task tool definition.",
      B: "Emit multiple Task tool calls in a single coordinator response (not across separate turns).",
      C: "Create a dedicated 'parallel executor' subagent that manages the two subagents.",
      D: "Use async/await in your orchestration code to trigger both subagents at the same time."
    },
    correct: "B",
    explanation: "Parallel subagent execution is achieved by emitting multiple Task tool calls in a single coordinator response. Spreading them across separate turns forces sequential execution. This is a specific pattern tested in Task Statement 1.3."
  },
  {
    id: 10, domain: 1, task: "1.3", scenario: "Multi-Agent Research",
    stem: "When passing context between agents to preserve attribution, what format is recommended for separating content from metadata?",
    options: {
      A: "Plain text with inline comments indicating sources.",
      B: "Structured data formats that separate content from metadata (source URLs, document names, page numbers).",
      C: "Base64-encoded JSON to reduce token count.",
      D: "Numbered footnotes appended to the end of the content string."
    },
    correct: "B",
    explanation: "Structured data formats that explicitly separate content from metadata (source URLs, document names, page numbers) preserve attribution through multi-agent pipelines. Plain text mixing content and citations (A) makes it hard for downstream agents to parse and maintain provenance."
  },

  // Task 1.4 – Multi-step workflows
  {
    id: 11, domain: 1, task: "1.4", scenario: "Customer Support Agent",
    stem: "Production data shows your agent skips get_customer in 12% of cases and calls lookup_order using only the customer's stated name, leading to misidentified accounts and incorrect refunds. What is the most effective fix?",
    options: {
      A: "Add a programmatic prerequisite that blocks lookup_order and process_refund until get_customer has returned a verified customer ID.",
      B: "Strengthen the system prompt to explicitly state customer verification is mandatory.",
      C: "Add 5–8 few-shot examples showing the agent always calling get_customer first.",
      D: "Implement a routing classifier that pre-selects the appropriate tool before the agent runs."
    },
    correct: "A",
    explanation: "When deterministic compliance is required for critical business logic (identity verification before financial operations), programmatic enforcement provides guarantees that prompt-based approaches cannot. Options B and C rely on probabilistic LLM compliance — insufficient when errors have financial consequences. D addresses tool availability, not tool ordering."
  },
  {
    id: 12, domain: 1, task: "1.4", scenario: "Customer Support Agent",
    stem: "An agent is escalating a complex case to a human agent. The human agent does not have access to the conversation transcript. What should the escalation handoff include?",
    options: {
      A: "A link to the full conversation transcript and the customer's email address.",
      B: "A structured handoff summary including customer ID, root cause, refund amount, and recommended action.",
      C: "Only the customer's account number so the human can look up the rest.",
      D: "A confidence score indicating how complex the case is."
    },
    correct: "B",
    explanation: "Structured handoff summaries must be self-contained since human agents lack access to the conversation transcript. They need customer ID, root cause analysis, amounts involved, and recommended actions — everything required to act immediately without re-investigating."
  },

  // Task 1.5 – Hooks
  {
    id: 13, domain: 1, task: "1.5", scenario: "Customer Support Agent",
    stem: "Your MCP tools return timestamps in mixed formats: some as Unix timestamps, some as ISO 8601, some as numeric status codes. The agent sometimes misinterprets these, causing incorrect responses. What is the most reliable fix?",
    options: {
      A: "Update the system prompt to tell the agent to normalize timestamps before using them.",
      B: "Implement a PostToolUse hook that intercepts tool results and normalizes all timestamp formats before the model processes them.",
      C: "Create separate tool variants for each timestamp format.",
      D: "Add few-shot examples showing the agent correctly interpreting each format."
    },
    correct: "B",
    explanation: "PostToolUse hooks intercept tool results for transformation before the model processes them — providing deterministic normalization. Prompt instructions (A) are probabilistic and can still fail. Creating format variants (C) is impractical and doesn't solve the root problem. Few-shot examples (D) don't guarantee correct handling of all edge cases."
  },
  {
    id: 14, domain: 1, task: "1.5", scenario: "Customer Support Agent",
    stem: "Your policy requires that no automated refund exceeds $500. You've added a system prompt instruction: 'Never process refunds above $500.' In 3% of cases, the agent still processes large refunds. What should you implement?",
    options: {
      A: "Make the instruction more prominent in the system prompt using capital letters.",
      B: "Add more few-shot examples demonstrating refusal of large refund requests.",
      C: "A tool call interception hook that blocks process_refund calls above $500 and redirects to human escalation.",
      D: "A PostToolUse hook that reverses refunds above $500 after they are processed."
    },
    correct: "C",
    explanation: "A tool call interception hook provides deterministic enforcement — the tool call is blocked BEFORE execution when the amount exceeds $500. A PostToolUse hook (D) reverses after the fact, which may have already caused financial harm. Prompt-based approaches (A, B) have non-zero failure rates, as demonstrated by the 3% failure rate already observed."
  },
  {
    id: 15, domain: 1, task: "1.5", scenario: "Customer Support Agent",
    stem: "When should you choose hooks over prompt-based enforcement for business rules?",
    options: {
      A: "When the business rule is complex and requires multi-step reasoning.",
      B: "When business rules require guaranteed, deterministic compliance rather than probabilistic compliance.",
      C: "When the system prompt is already too long to add more instructions.",
      D: "Only when the rule involves financial transactions over $1,000."
    },
    correct: "B",
    explanation: "Hooks provide deterministic guarantees; prompt instructions provide probabilistic guidance. Choose hooks whenever guaranteed compliance is required — regardless of rule complexity or transaction size. The distinction deterministic vs. probabilistic is the core principle of Task Statement 1.5."
  },

  // Task 1.6 – Task decomposition
  {
    id: 16, domain: 1, task: "1.6", scenario: "Claude Code CI/CD",
    stem: "A PR modifies 14 files across a stock tracking module. Your single-pass review produces inconsistent results: detailed for some files, superficial for others, and contradictory feedback flagging a pattern in one file while approving it in another. How should you restructure the review?",
    options: {
      A: "Split into focused passes: analyze each file individually for local issues, then a separate integration pass for cross-file data flow.",
      B: "Require developers to split large PRs into 3–4 file submissions.",
      C: "Switch to a model with a larger context window to give all 14 files adequate attention.",
      D: "Run three independent review passes and flag only issues appearing in 2 of 3 runs."
    },
    correct: "A",
    explanation: "Splitting reviews into per-file local analysis passes plus a separate cross-file integration pass directly addresses attention dilution. Option C misunderstands the issue — larger context windows don't solve attention quality problems. Option D would suppress real bugs that appear inconsistently. Option B shifts burden to developers."
  },
  {
    id: 17, domain: 1, task: "1.6", scenario: "Developer Productivity",
    stem: "You need to add comprehensive tests to a large legacy codebase. The task is open-ended — you don't know what modules exist or their dependencies. Which decomposition strategy should you use?",
    options: {
      A: "Prompt chaining: write all test cases sequentially file by file.",
      B: "Fixed sequential pipeline: analyze architecture → write tests → run tests → fix failures.",
      C: "Dynamic adaptive decomposition: first map structure, identify high-impact areas, then create a prioritized plan that adapts as dependencies are discovered.",
      D: "Parallel decomposition: split the codebase into equal chunks and test each simultaneously."
    },
    correct: "C",
    explanation: "Open-ended investigation tasks require dynamic adaptive decomposition where subtasks are generated based on what is discovered at each step. Prompt chaining (A, B) works for predictable multi-aspect reviews with known structure. A legacy codebase with unknown structure requires adaptive investigation."
  },

  // Task 1.7 – Session management
  {
    id: 18, domain: 1, task: "1.7", scenario: "Developer Productivity",
    stem: "You were investigating a legacy refund module yesterday using a named session 'refund-investigation'. Today you modified three files in that module. How should you resume your work?",
    options: {
      A: "Use --resume refund-investigation and let Claude re-read all files automatically.",
      B: "Use --resume refund-investigation and explicitly inform the agent which specific files were changed for targeted re-analysis.",
      C: "Start a new session since resuming with stale tool results is always unreliable.",
      D: "Use fork_session to create a branch before re-analyzing the changes."
    },
    correct: "B",
    explanation: "When resuming a session after code modifications, you must inform the agent about specific file changes for targeted re-analysis rather than requiring full re-exploration. Option A misses the point — the agent needs to know what changed. Option C is overly conservative; resume is appropriate when prior context is mostly valid. Option D (fork) is for divergent approaches, not resumption."
  },
  {
    id: 19, domain: 1, task: "1.7", scenario: "Developer Productivity",
    stem: "You've completed a deep analysis of a codebase and want to evaluate two competing refactoring strategies from the same baseline analysis. Which session management feature should you use?",
    options: {
      A: "--resume to continue the same session for both strategies.",
      B: "fork_session to create two independent branches from the shared analysis baseline.",
      C: "Start two completely separate sessions with identical system prompts.",
      D: "/compact to reduce context before switching between strategies."
    },
    correct: "B",
    explanation: "fork_session creates independent branches from a shared analysis baseline — exactly designed for exploring divergent approaches. --resume (A) continues a single thread. Separate sessions (C) lose the baseline analysis. /compact (D) reduces context but doesn't create branches."
  },

  // ─── DOMAIN 2: Tool Design & MCP Integration ───
  // Task 2.1 – Tool descriptions
  {
    id: 20, domain: 2, task: "2.1", scenario: "Customer Support Agent",
    stem: "Production logs show the agent calls get_customer when users ask about orders ('check my order #12345') instead of calling lookup_order. Both tools have minimal descriptions and accept similar identifier formats. What is the most effective first step?",
    options: {
      A: "Add 5–8 few-shot examples routing order queries to lookup_order.",
      B: "Expand each tool's description to include input formats, example queries, edge cases, and when to use it versus similar tools.",
      C: "Implement a routing layer that parses user input and pre-selects the tool.",
      D: "Consolidate both tools into a single lookup_entity tool."
    },
    correct: "B",
    explanation: "Tool descriptions are the PRIMARY mechanism LLMs use for tool selection. Minimal descriptions cause unreliable selection among similar tools. Expanding descriptions (B) directly fixes the root cause with minimal effort. Few-shot examples (A) add token overhead without fixing the underlying ambiguity. A routing layer (C) is over-engineered. Consolidation (D) is valid but higher effort."
  },
  {
    id: 21, domain: 2, task: "2.1", scenario: "Multi-Agent Research",
    stem: "Your system has two tools: analyze_content (searches and processes web results) and analyze_document (processes uploaded PDFs). Both have nearly identical descriptions. The agent frequently picks the wrong tool. What is the best fix?",
    options: {
      A: "Rename analyze_content to extract_web_results and update its description to be web-result-specific.",
      B: "Delete one tool and handle both use cases in the remaining tool.",
      C: "Add a disclaimer to the system prompt: 'Be careful to use the correct analyze tool.'",
      D: "Add tool_choice: 'auto' to force the model to select tools more carefully."
    },
    correct: "A",
    explanation: "Renaming the tool and providing a domain-specific description eliminates functional overlap. The new name 'extract_web_results' signals its purpose. Deleting a tool (B) reduces capability. System prompt disclaimers (C) are unreliable keyword-sensitive instructions. tool_choice 'auto' (D) is the default and doesn't help with selection."
  },
  {
    id: 22, domain: 2, task: "2.1", scenario: "Multi-Agent Research",
    stem: "Your analyze_document tool is too generic. It handles citation extraction, content summarization, and claim verification — all with one tool. This causes the agent to use it incorrectly for different tasks. What is the recommended approach?",
    options: {
      A: "Add a 'mode' parameter to analyze_document so the agent can specify the operation.",
      B: "Split it into purpose-specific tools: extract_data_points, summarize_content, and verify_claim_against_source.",
      C: "Write a longer, more detailed description explaining all three modes.",
      D: "Create a wrapper tool that calls analyze_document with pre-set parameters."
    },
    correct: "B",
    explanation: "Splitting a generic tool into purpose-specific tools with defined input/output contracts provides clear selection signals for the LLM. Each tool's description unambiguously indicates its purpose. A 'mode' parameter (A) keeps the ambiguity. A longer description (C) helps but doesn't resolve the functional overlap as cleanly."
  },

  // Task 2.2 – Structured error responses
  {
    id: 23, domain: 2, task: "2.2", scenario: "Customer Support Agent",
    stem: "Your process_refund MCP tool returns a generic 'Operation failed' error for all failure types: service timeouts, invalid customer IDs, refunds above policy limit, and permission errors. Why is this a problem?",
    options: {
      A: "It increases token usage because the agent must re-attempt more frequently.",
      B: "It prevents the agent from making appropriate recovery decisions since all errors look identical.",
      C: "MCP tools are required to use isError: true for every response.",
      D: "Generic errors cause the agent to escalate every failure to a human agent."
    },
    correct: "B",
    explanation: "Uniform error responses hide critical context from the agent. A timeout (retryable) requires a different response than a policy violation (non-retryable, explain to customer) or an invalid ID (ask for clarification). The agent cannot make appropriate recovery decisions without knowing error category and retryability."
  },
  {
    id: 24, domain: 2, task: "2.2", scenario: "Customer Support Agent",
    stem: "A customer's refund request is rejected because the order is over 90 days old — outside the return policy window. What should the MCP tool's error response include?",
    options: {
      A: "isError: true, errorCategory: 'transient', isRetryable: true",
      B: "isError: true, errorCategory: 'business', isRetryable: false, a customer-friendly explanation of the policy",
      C: "isError: false with an empty result set",
      D: "isError: true, errorCategory: 'permission', isRetryable: true after manager approval"
    },
    correct: "B",
    explanation: "A return policy violation is a business error — non-retryable (the policy won't change on retry) and requires a customer-friendly explanation so the agent can communicate appropriately. Marking it transient/retryable (A) would cause wasted retry loops. Returning it as success (C) is the 'silent suppression' anti-pattern."
  },
  {
    id: 25, domain: 2, task: "2.2", scenario: "Multi-Agent Research",
    stem: "A web search subagent queries for 'AI regulation EU 2024' and receives a result set with zero articles. Separately, the search service itself times out on a different query. How should these two situations be communicated to the coordinator differently?",
    options: {
      A: "Both should return isError: true with the same generic error message.",
      B: "Both should return empty result sets to keep error handling simple.",
      C: "The empty result is a valid success (no matches); the timeout is an access failure that should be communicated as an error with retry context.",
      D: "Both should trigger immediate escalation to a human researcher."
    },
    correct: "C",
    explanation: "Distinguishing access failures (timeouts — need retry decisions) from valid empty results (successful queries with no matches) is a key skill from Task Statement 2.2. An empty search result is a valid outcome. A timeout requires the coordinator to know it was a failure, not a genuine 'no results found.'"
  },

  // Task 2.3 – Tool distribution
  {
    id: 26, domain: 2, task: "2.3", scenario: "Multi-Agent Research",
    stem: "Your synthesis subagent has access to 18 tools including web search, document analysis, database lookup, report generation, email sending, and file management. You observe it occasionally attempts web searches when it should be synthesizing. What is the fix?",
    options: {
      A: "Add a system prompt instruction: 'You are a synthesis agent. Do not perform web searches.'",
      B: "Restrict the synthesis agent's tool set to only those relevant to synthesis, with perhaps a scoped verify_fact tool for simple lookups.",
      C: "Increase the tool selection temperature so the agent makes more deliberate choices.",
      D: "Log and manually review all tool selections before allowing execution."
    },
    correct: "B",
    explanation: "Giving an agent too many tools (18 vs 4–5) degrades tool selection reliability by increasing decision complexity. Agents with tools outside their specialization misuse them. Restrict each subagent's tool set to its role. Prompt instructions alone (A) have non-zero failure rates."
  },
  {
    id: 27, domain: 2, task: "2.3", scenario: "Multi-Agent Research",
    stem: "The synthesis agent frequently needs to verify simple facts (dates, statistics) — 85% are simple checks, 15% require deeper investigation. Currently every verification requires a full coordinator round-trip, adding 40% latency. What is the best solution?",
    options: {
      A: "Have the synthesis agent accumulate all verification needs and batch-return them to the coordinator at the end of its pass.",
      B: "Give the synthesis agent a scoped verify_fact tool for simple lookups, while complex verifications continue delegating through the coordinator.",
      C: "Give the synthesis agent full access to all web search tools.",
      D: "Have the web search agent proactively cache extra context to anticipate synthesis verification needs."
    },
    correct: "B",
    explanation: "This applies least-privilege: give the synthesis agent only what it needs for the 85% common case while preserving coordination for complex cases. Batching (A) creates blocking dependencies since synthesis steps may depend on earlier verified facts. Full web search access (C) over-provisions and violates separation of concerns. Speculative caching (D) cannot reliably predict what will be needed."
  },
  {
    id: 28, domain: 2, task: "2.3", scenario: "Structured Data Extraction",
    stem: "You have two extraction tools: extract_invoice and extract_contract. The document type is unknown at request time. Which tool_choice configuration ensures the model always calls a tool?",
    options: {
      A: "tool_choice: 'auto' — the model will pick the right tool automatically.",
      B: "tool_choice: 'any' — the model must call a tool but can choose which one.",
      C: "tool_choice: { type: 'tool', name: 'extract_invoice' } — always start with invoice.",
      D: "No tool_choice needed; the model always calls a tool when tools are provided."
    },
    correct: "B",
    explanation: "'any' guarantees the model calls some tool rather than returning conversational text. 'auto' (A) allows the model to decide not to call any tool and return text instead — unacceptable when structured output is required. Forced selection (C) pre-selects the wrong tool half the time. Without tool_choice (D), the model may return plain text."
  },

  // Task 2.4 – MCP server integration
  {
    id: 29, domain: 2, task: "2.4", scenario: "Developer Productivity",
    stem: "Your team uses a shared Jira MCP server for project management. You want all developers who clone the repo to automatically have access to this server. Where should you configure it?",
    options: {
      A: "In ~/.claude.json on each developer's machine.",
      B: "In .mcp.json at the project root, committed to version control.",
      C: "In the root CLAUDE.md file as an @import reference.",
      D: "In a shared ~/.claude/CLAUDE.md that each developer symlinks."
    },
    correct: "B",
    explanation: ".mcp.json is project-level and version-controlled — shared with the entire team. ~/.claude.json is user-level and personal. The project-level .mcp.json is the correct location for shared team tooling. CLAUDE.md is for instructions/context, not MCP configuration."
  },
  {
    id: 30, domain: 2, task: "2.4", scenario: "Developer Productivity",
    stem: "Your .mcp.json configures a GitHub MCP server that requires an authentication token. How should you handle this credential?",
    options: {
      A: "Hardcode the token directly in .mcp.json and add .mcp.json to .gitignore.",
      B: "Store the token in a separate secrets.json file and import it.",
      C: "Use environment variable expansion in .mcp.json: ${GITHUB_TOKEN}.",
      D: "Encode the token in base64 to avoid storing plaintext in the config file."
    },
    correct: "C",
    explanation: "Environment variable expansion (${GITHUB_TOKEN}) allows .mcp.json to be safely committed to version control without exposing secrets. Each developer sets the environment variable locally. Hardcoding (A) is a security vulnerability even with .gitignore. Base64 (D) is not encryption — it's trivially reversible."
  },
  {
    id: 31, domain: 2, task: "2.4", scenario: "Developer Productivity",
    stem: "You've configured a powerful custom Jira MCP server, but Claude keeps using the built-in Grep tool for ticket searches instead of the Jira MCP's search capability. What is the fix?",
    options: {
      A: "Remove the Grep tool from Claude Code's allowed tools.",
      B: "Add a system prompt instruction: 'Always use the Jira MCP for ticket operations.'",
      C: "Enhance the Jira MCP tool descriptions to clearly explain their capabilities and outputs, preventing the agent from preferring built-in tools over more capable MCP tools.",
      D: "Set tool_choice to force the Jira MCP tool on every request."
    },
    correct: "C",
    explanation: "When agents prefer built-in tools over more capable MCP tools, the fix is enhancing MCP tool descriptions to clearly explain their capabilities and outputs. The agent uses descriptions to select tools — if the MCP description doesn't explain why it's better than Grep, the agent defaults to what it knows. Removing Grep (A) removes legitimate functionality."
  },
  {
    id: 32, domain: 2, task: "2.4", scenario: "Developer Productivity",
    stem: "Your organization has an internal issue tracker with hundreds of issue summaries, documentation hierarchies, and database schemas. Agents make many exploratory tool calls just to discover what data is available. How can MCP resources help?",
    options: {
      A: "MCP resources cache tool results to avoid redundant API calls.",
      B: "MCP resources expose content catalogs, giving agents visibility into available data without requiring exploratory tool calls.",
      C: "MCP resources provide authentication tokens for external services.",
      D: "MCP resources are a backup mechanism when MCP tools fail."
    },
    correct: "B",
    explanation: "MCP resources expose content catalogs (issue summaries, documentation hierarchies, database schemas) so agents can see what data exists without making exploratory tool calls. This reduces unnecessary API calls and helps agents plan more efficiently."
  },

  // Task 2.5 – Built-in tools
  {
    id: 33, domain: 2, task: "2.5", scenario: "Developer Productivity",
    stem: "You want to find all files in a large codebase that are test files (matching patterns like Button.test.tsx, api.test.js). Which tool should you use?",
    options: {
      A: "Grep — search file contents for the pattern 'test'.",
      B: "Read — read each file and check if it contains test functions.",
      C: "Glob — use the pattern **/*.test.* to find files matching the naming convention.",
      D: "Bash — run a shell find command."
    },
    correct: "C",
    explanation: "Glob is for file PATH pattern matching — finding files by name or extension patterns like **/*.test.tsx. Grep is for searching FILE CONTENTS (what's inside files). For discovering test files by naming convention, Glob is the right choice."
  },
  {
    id: 34, domain: 2, task: "2.5", scenario: "Developer Productivity",
    stem: "You want to find all places in a codebase where the function processRefund() is called. Which tool should you use?",
    options: {
      A: "Glob — use the pattern **/*.js to find all JavaScript files, then Read each one.",
      B: "Grep — search file contents for the pattern 'processRefund'.",
      C: "Edit — search for the function definition across files.",
      D: "Bash — run grep manually as a shell command."
    },
    correct: "B",
    explanation: "Grep searches FILE CONTENTS for patterns — ideal for finding function names, error messages, import statements, or any code pattern. Glob (A) finds files by path pattern, not content. Using Bash (D) works but bypasses the built-in tool's structured output that Claude can process."
  },
  {
    id: 35, domain: 2, task: "2.5", scenario: "Developer Productivity",
    stem: "You attempt to use Edit to modify a logging statement in config.js, but the tool fails with a 'non-unique match' error because the same log pattern appears 8 times in the file. What should you do?",
    options: {
      A: "Use Grep to identify which occurrence you want, then use Edit with a longer unique anchor.",
      B: "Use Read to load the full file contents, make the modification, then Write the complete updated file back.",
      C: "Use Bash to run sed with a line number to target the specific occurrence.",
      D: "Split the file into smaller files so the pattern appears only once."
    },
    correct: "B",
    explanation: "When Edit fails due to non-unique text matches, the documented fallback is Read + Write: load the full file, modify in memory, write back. This is reliable for any file modification when anchor text is duplicated. Read then Edit with a longer anchor (A) might work but B is the explicit fallback pattern."
  },

  // ─── DOMAIN 3: Claude Code Configuration & Workflows ───
  // Task 3.1 – CLAUDE.md hierarchy
  {
    id: 36, domain: 3, task: "3.1", scenario: "Code Generation",
    stem: "A new developer joins the team and reports that Claude Code isn't following the team's coding standards. Other developers on the team are not experiencing this problem. Where is the most likely location of the misconfigured instructions?",
    options: {
      A: "In the project-level .claude/CLAUDE.md file, which wasn't committed.",
      B: "In the user-level ~/.claude/CLAUDE.md, which only applies to that user and isn't shared via version control.",
      C: "In a subdirectory CLAUDE.md that the new developer hasn't navigated to yet.",
      D: "In the .claude/rules/ directory, which requires manual activation."
    },
    correct: "B",
    explanation: "User-level instructions in ~/.claude/CLAUDE.md are not shared via version control — they only apply to the machine where they're set. If existing developers have standards that work, those are probably in their personal ~/.claude/CLAUDE.md. New developers need these migrated to project-level configuration."
  },
  {
    id: 37, domain: 3, task: "3.1", scenario: "Code Generation",
    stem: "You want to create a custom /review-pr slash command and make it available to all developers automatically when they clone the repository. Where should you create it?",
    options: {
      A: "~/.claude/commands/ on each developer's machine.",
      B: ".claude/commands/ in the project repository.",
      C: "In CLAUDE.md as a custom command definition.",
      D: "In a .claude/config.json with a commands array."
    },
    correct: "B",
    explanation: ".claude/commands/ is project-scoped and version-controlled — slash commands placed here are automatically available to all developers when they clone or pull. ~/.claude/commands/ is personal and not shared. CLAUDE.md is for instructions, not command definitions. .claude/config.json with a commands array is not a real Claude Code configuration."
  },
  {
    id: 38, domain: 3, task: "3.1", scenario: "Code Generation",
    stem: "Your CLAUDE.md has grown to 800 lines covering testing, API conventions, deployment rules, security requirements, and UI standards. It's becoming hard to maintain and contains irrelevant context for most tasks. What is the best restructuring approach?",
    options: {
      A: "Split it into multiple CLAUDE.md files in each subdirectory.",
      B: "Create .claude/rules/ topic-specific files (testing.md, api-conventions.md, deployment.md) and use path-scoped YAML frontmatter.",
      C: "Compress the CLAUDE.md using @import to pull from a separate standards repository.",
      D: "Move all content to a wiki and link to it from CLAUDE.md."
    },
    correct: "B",
    explanation: ".claude/rules/ with topic-specific files and YAML frontmatter path-scoping is the recommended approach for organizing complex rule sets. Path-scoping means rules only load when editing matching files, reducing irrelevant context and token usage. Subdirectory CLAUDE.md files (A) can't easily handle conventions spanning multiple directories."
  },
  {
    id: 39, domain: 3, task: "3.1", scenario: "Code Generation",
    stem: "Claude Code seems to be inconsistently applying your rules across sessions. Some sessions follow your testing conventions; others don't. How do you diagnose which memory files are currently loaded?",
    options: {
      A: "Check the Claude Code logs in ~/.claude/logs/.",
      B: "Run the /memory command to verify which memory files are loaded.",
      C: "Look at the active_rules field in .claude/config.json.",
      D: "Restart Claude Code with --verbose to see rule loading output."
    },
    correct: "B",
    explanation: "The /memory command verifies which memory files are currently loaded, helping diagnose inconsistent behavior across sessions. This is the documented way to audit what configuration is active. The other options describe non-existent features."
  },

  // Task 3.2 – Skills and commands
  {
    id: 40, domain: 3, task: "3.2", scenario: "Code Generation",
    stem: "You create a /analyze-codebase skill that does deep exploration and produces 500+ lines of intermediate output. After running it, your main conversation context is polluted with all this verbose output, making subsequent interactions harder. What frontmatter option should you use?",
    options: {
      A: "output: minimal — limits skill output length.",
      B: "context: fork — runs the skill in an isolated sub-agent context, preventing output from polluting the main conversation.",
      C: "allowed-tools: [] — prevents the skill from using tools that generate output.",
      D: "scope: isolated — keeps skill outputs in a separate channel."
    },
    correct: "B",
    explanation: "context: fork runs skills in an isolated sub-agent context, returning only a summary to the main conversation. This is specifically designed for skills that produce verbose output (codebase analysis) or exploratory context (brainstorming) where you want the result but not all the intermediate work."
  },
  {
    id: 41, domain: 3, task: "3.2", scenario: "Code Generation",
    stem: "You want to customize the /analyze-codebase skill for your personal workflow by adding extra steps, but you don't want your changes to affect your teammates. What is the correct approach?",
    options: {
      A: "Edit the skill file in .claude/skills/ directly — your changes will only apply locally.",
      B: "Create a personal variant with a different name in ~/.claude/skills/ so it doesn't affect teammates.",
      C: "Fork the skill file into a feature branch and use it from there.",
      D: "Add a personal-only flag in the skill's YAML frontmatter."
    },
    correct: "B",
    explanation: "Creating personal variants with different names in ~/.claude/skills/ is the documented approach for personal skill customization. Editing .claude/skills/ directly (A) would affect everyone via version control. There is no 'personal-only flag' in skill frontmatter."
  },
  {
    id: 42, domain: 3, task: "3.2", scenario: "Code Generation",
    stem: "A skill invokes external APIs and could potentially make destructive calls if misused. How do you restrict the tools available to the skill during execution?",
    options: {
      A: "Set the skill's permission level to 'read-only' in CLAUDE.md.",
      B: "Configure allowed-tools in the skill's YAML frontmatter to restrict tool access during execution.",
      C: "Add a system prompt instruction inside the skill: 'Do not use destructive tools.'",
      D: "Create a separate MCP server with restricted permissions for the skill."
    },
    correct: "B",
    explanation: "The allowed-tools frontmatter option in SKILL.md restricts which tools can be used during skill execution. This is deterministic enforcement — the tools simply aren't available. Prompt instructions (C) are probabilistic and can be bypassed."
  },

  // Task 3.3 – Path-specific rules
  {
    id: 43, domain: 3, task: "3.3", scenario: "Code Generation",
    stem: "Your test files are scattered throughout the codebase (Button.test.tsx next to Button.tsx, api.test.js next to api.js, etc.). You want all test files to follow consistent testing conventions regardless of directory. What is the most maintainable approach?",
    options: {
      A: "Place a CLAUDE.md in each directory containing test files.",
      B: "Add testing conventions to the root CLAUDE.md and rely on Claude to apply them to test files.",
      C: "Create a .claude/rules/testing.md with YAML frontmatter: paths: ['**/*.test.*'].",
      D: "Create a dedicated /test-conventions slash command that developers run before writing tests."
    },
    correct: "C",
    explanation: ".claude/rules/ files with glob pattern path-scoping apply conventions to files by type regardless of directory location. paths: ['**/*.test.*'] matches all test files across the entire codebase. Subdirectory CLAUDE.md files (A) can't handle files spanning many directories. Root CLAUDE.md (B) loads the testing conventions even when editing non-test files, wasting tokens."
  },
  {
    id: 44, domain: 3, task: "3.3", scenario: "Code Generation",
    stem: "What is the primary advantage of path-scoped rules over including all conventions in the root CLAUDE.md?",
    options: {
      A: "Path-scoped rules are processed faster by the model.",
      B: "Path-scoped rules only load when editing matching files, reducing irrelevant context and token usage.",
      C: "Path-scoped rules support more complex syntax than CLAUDE.md.",
      D: "Path-scoped rules are automatically versioned separately from the main codebase."
    },
    correct: "B",
    explanation: "Path-scoped rules conditionally load — they only activate when editing files matching the glob pattern. This means Terraform conventions don't load when you're editing React components, and vice versa. This reduces irrelevant context and token usage compared to always loading everything from root CLAUDE.md."
  },

  // Task 3.4 – Plan mode vs direct execution
  {
    id: 45, domain: 3, task: "3.4", scenario: "Code Generation",
    stem: "You need to restructure a monolithic application into microservices, involving decisions about service boundaries across dozens of files. Which approach should you take?",
    options: {
      A: "Enter plan mode to explore the codebase, understand dependencies, and design an implementation approach before making changes.",
      B: "Start with direct execution and let the implementation reveal natural service boundaries.",
      C: "Use direct execution with comprehensive upfront instructions detailing exactly how each service should be structured.",
      D: "Start direct, switch to plan mode only if unexpected complexity emerges during implementation."
    },
    correct: "A",
    explanation: "Plan mode is designed for complex tasks involving large-scale changes, multiple valid approaches, and architectural decisions — exactly what microservices restructuring requires. It enables safe codebase exploration and design before committing to changes. Option B risks costly rework when dependencies are discovered late. Option D ignores that the complexity is already stated upfront."
  },
  {
    id: 46, domain: 3, task: "3.4", scenario: "Code Generation",
    stem: "A bug report includes a clear stack trace pointing to a null pointer exception on line 42 of UserService.java. The fix is obvious: add a null check. Which mode should you use?",
    options: {
      A: "Plan mode — always plan before modifying production code.",
      B: "Direct execution — this is a simple, well-scoped single-file change with a clear fix.",
      C: "Plan mode — null pointer exceptions often indicate systemic issues.",
      D: "Direct execution with the Explore subagent to analyze potential side effects first."
    },
    correct: "B",
    explanation: "Direct execution is appropriate for simple, well-scoped changes (e.g., adding a single validation check to one function, single-file bug fix with a clear stack trace). Plan mode overhead is unnecessary when the fix is obvious and contained. Plan mode is for architectural decisions and multi-file changes."
  },

  // Task 3.5 – Iterative refinement
  {
    id: 47, domain: 3, task: "3.5", scenario: "Code Generation",
    stem: "You describe a desired code transformation in natural language but Claude produces inconsistent results: sometimes correct, sometimes missing edge cases. After three iterations, results are still unreliable. What is the most effective next step?",
    options: {
      A: "Increase the model temperature for more varied output.",
      B: "Provide 2–3 concrete input/output examples that clearly demonstrate the expected transformation.",
      C: "Break the task into smaller prompts and iterate on each separately.",
      D: "Add a detailed step-by-step procedure in the prompt."
    },
    correct: "B",
    explanation: "Concrete input/output examples are the most effective technique for communicating expected transformations when prose descriptions produce inconsistent results. Examples show exactly what should happen, eliminating ambiguity that detailed prose can't fully resolve."
  },
  {
    id: 48, domain: 3, task: "3.5", scenario: "Code Generation",
    stem: "You have a bug where Claude generates correct code that fails two specific test cases: one with null values and one with empty arrays. You also have 5 unrelated style issues to address. How should you communicate these to Claude?",
    options: {
      A: "Send all 7 issues in one message for efficiency.",
      B: "Address the two failing test cases first with specific examples, then address style issues sequentially after.",
      C: "Send all issues simultaneously since Claude can handle multiple concerns at once.",
      D: "Fix style issues first since they're simpler, then address the test failures."
    },
    correct: "B",
    explanation: "The exam guide distinguishes: provide all issues in a SINGLE message when they interact (the failing tests may interact — fixing null handling might affect empty array handling). Fix SEQUENTIALLY when issues are independent (the 5 style issues are independent from each other and from the test failures). Address the interacting test issues first with specific examples."
  },

  // Task 3.6 – CI/CD integration
  {
    id: 49, domain: 3, task: "3.6", scenario: "Claude Code CI/CD",
    stem: "Your CI pipeline runs: claude 'Analyze this PR for security issues' — but the job hangs indefinitely. Logs show Claude Code is waiting for interactive input. What is the correct fix?",
    options: {
      A: "Add -p flag: claude -p 'Analyze this PR for security issues'",
      B: "Set environment variable CLAUDE_HEADLESS=true",
      C: "Redirect stdin: claude 'Analyze this PR' < /dev/null",
      D: "Add --batch flag: claude --batch 'Analyze this PR'"
    },
    correct: "A",
    explanation: "The -p (or --print) flag runs Claude Code in non-interactive mode — it processes the prompt, outputs to stdout, and exits. CLAUDE_HEADLESS (B) and --batch (D) are non-existent flags. stdin redirection (C) is a Unix workaround that doesn't properly address Claude Code's command syntax."
  },
  {
    id: 50, domain: 3, task: "3.6", scenario: "Claude Code CI/CD",
    stem: "Your CI pipeline auto-posts review comments to PRs. After a developer pushes a new commit addressing 3 of 5 issues, your review runs again and posts all 5 issues as new comments, duplicating the 3 already resolved. How do you fix this?",
    options: {
      A: "Delete all previous comments before each re-review run.",
      B: "Include prior review findings in context when re-running, instructing Claude to report only new or still-unaddressed issues.",
      C: "Use a hash of the code to detect which issues were already resolved.",
      D: "Only run the review on files changed in the new commit."
    },
    correct: "B",
    explanation: "Including prior review findings in context and instructing Claude to report only new or still-unaddressed issues avoids duplicate comments. This is the documented approach for incremental review in CI contexts. Option D is incomplete — existing issues in unchanged files still need tracking."
  },
  {
    id: 51, domain: 3, task: "3.6", scenario: "Claude Code CI/CD",
    stem: "Your team wants to reduce API costs. Two workflows exist: (1) a blocking pre-merge check developers wait for, and (2) a nightly technical debt report. Your manager proposes switching BOTH to the Message Batches API for 50% savings. How should you evaluate this?",
    options: {
      A: "Switch both to batch processing with status polling for completion.",
      B: "Keep real-time for pre-merge checks; use batch only for nightly technical debt reports.",
      C: "Keep both on real-time to avoid complexity.",
      D: "Switch both to batch with a 30-minute timeout fallback to real-time."
    },
    correct: "B",
    explanation: "The Message Batches API has up to 24-hour processing time with no guaranteed SLA — unacceptable for blocking pre-merge checks where developers wait. It's ideal for nightly/weekly batch jobs. This is the core batch vs. real-time tradeoff tested in Task Statement 4.5."
  },
  {
    id: 52, domain: 3, task: "3.6", scenario: "Claude Code CI/CD",
    stem: "You're generating tests for a pull request. Your test generator keeps suggesting test scenarios already covered in the existing test suite, creating duplicate test cases. What is the most effective fix?",
    options: {
      A: "Instruct Claude to always create unique test names.",
      B: "Provide the existing test files in context so test generation avoids suggesting already-covered scenarios.",
      C: "Run the new tests against the existing suite and filter duplicates programmatically.",
      D: "Use a different temperature setting to increase output diversity."
    },
    correct: "B",
    explanation: "Providing existing test files in context gives Claude the information it needs to avoid duplicating already-covered scenarios. Context is how Claude knows what's already there. Programmatic deduplication (C) wastes tokens generating tests that will be filtered out."
  },

  // ─── DOMAIN 4: Prompt Engineering & Structured Output ───
  // Task 4.1 – Explicit criteria
  {
    id: 53, domain: 4, task: "4.1", scenario: "Claude Code CI/CD",
    stem: "Your automated code review generates many false positives on code style issues, causing developers to dismiss the tool entirely. You add the instruction: 'Only report high-confidence findings.' This doesn't improve the false positive rate. Why?",
    options: {
      A: "The model doesn't understand 'high-confidence' — you need a numeric threshold.",
      B: "General vague instructions like 'be conservative' or 'high-confidence only' fail to improve precision compared to specific categorical criteria.",
      C: "Style issues are inherently subjective and cannot be filtered by confidence.",
      D: "The instruction needs to be in the system prompt, not the user prompt."
    },
    correct: "B",
    explanation: "General instructions like 'be conservative' or 'only report high-confidence findings' fail to improve precision because they don't specify WHAT to look for or skip. Specific categorical criteria ('skip minor style issues; only report bugs and security vulnerabilities') are far more effective than confidence-based filtering."
  },
  {
    id: 54, domain: 4, task: "4.1", scenario: "Claude Code CI/CD",
    stem: "High false positive rates on one review category (style violations) are undermining developer trust in accurate categories (security issues). What is the recommended immediate tactical response?",
    options: {
      A: "Retrain the review prompt with more examples of true positives.",
      B: "Temporarily disable the high false-positive style category to restore developer trust while improving prompts for that category.",
      C: "Reduce the overall volume of review comments across all categories.",
      D: "Switch to human-only code review until the AI system improves."
    },
    correct: "B",
    explanation: "The exam guide explicitly recommends temporarily disabling high false-positive categories to restore developer trust while improving prompts for those categories. The insight: high false positive rates in ONE category undermine confidence in ALL categories, so surgical removal of the problematic category while fixing it is the right tactical move."
  },

  // Task 4.2 – Few-shot prompting
  {
    id: 55, domain: 4, task: "4.2", scenario: "Structured Data Extraction",
    stem: "Your document extraction system extracts data correctly from standard invoices but consistently fails on research papers — leaving citation fields empty even when citations are clearly present. The citation format in papers (inline numbered references) differs from invoices (footnotes). What is the most targeted fix?",
    options: {
      A: "Add more required fields to the JSON schema to force extraction.",
      B: "Increase max_tokens to allow more thorough document scanning.",
      C: "Add few-shot examples demonstrating correct extraction from documents with varied citation formats (inline vs. bibliographies).",
      D: "Create a separate extraction tool specifically for research papers."
    },
    correct: "C",
    explanation: "Few-shot examples are the most effective technique for reducing hallucination and improving extraction accuracy with varied document structures. Examples demonstrating correct handling of inline citations vs. bibliographies teach the model to generalize to different formats. This directly addresses empty field extraction from structural variety."
  },
  {
    id: 56, domain: 4, task: "4.2", scenario: "Claude Code CI/CD",
    stem: "Your code review system produces inconsistently formatted output: sometimes JSON, sometimes prose, sometimes mixed. You've written detailed formatting instructions but results remain inconsistent. What is the most effective technique?",
    options: {
      A: "Add more explicit formatting instructions with examples of correct format.",
      B: "Switch to JSON mode to force structured output.",
      C: "Add 2–4 few-shot examples showing the exact desired output format (location, issue, severity, suggested fix).",
      D: "Implement post-processing to normalize the output format."
    },
    correct: "C",
    explanation: "Few-shot examples demonstrating the specific desired output format are the most effective technique for achieving consistent formatting when detailed instructions alone produce inconsistent results. Examples show the model exactly what you want, while instructions describe it — showing is more reliable than describing."
  },

  // Task 4.3 – Structured output via tool use
  {
    id: 57, domain: 4, task: "4.3", scenario: "Structured Data Extraction",
    stem: "Your extraction pipeline sometimes receives JSON with syntax errors (mismatched braces, trailing commas). This breaks your downstream systems. What is the most reliable solution to eliminate JSON syntax errors?",
    options: {
      A: "Add a JSON linting step in post-processing that retries on syntax errors.",
      B: "Use tool use (tool_use) with a JSON schema, which guarantees schema-compliant structured output and eliminates syntax errors.",
      C: "Instruct the model: 'Always output valid JSON. Double-check your brackets.'",
      D: "Use a JSON repair library to fix malformed output."
    },
    correct: "B",
    explanation: "tool_use with JSON schemas eliminates JSON syntax errors — the API guarantees schema-compliant output. Post-processing repair (D) and retry linting (A) are workarounds for a problem that tool_use eliminates at the source. Prompt instructions (C) are probabilistic."
  },
  {
    id: 58, domain: 4, task: "4.3", scenario: "Structured Data Extraction",
    stem: "Your invoice extraction schema marks 'vendor_tax_id' as a required field, but many invoices from small vendors don't include it. The model is filling in plausible-looking but incorrect tax IDs. What is the fix?",
    options: {
      A: "Add a few-shot example showing an invoice without a tax ID.",
      B: "Make the vendor_tax_id field optional (nullable) so the model can return null when the information is absent.",
      C: "Add a prompt instruction: 'If vendor tax ID is not present, return an empty string.'",
      D: "Create a separate extraction schema for small vendor invoices."
    },
    correct: "B",
    explanation: "Required fields in a schema force the model to fabricate values when information is absent. Making fields optional/nullable when source documents may not contain the information prevents hallucination. This is a fundamental schema design principle from Task Statement 4.3."
  },
  {
    id: 59, domain: 4, task: "4.3", scenario: "Structured Data Extraction",
    stem: "Your schema has a 'document_type' enum: ['invoice', 'contract', 'receipt', 'report']. You start receiving an unexpected new document type that doesn't fit any category. The model picks the closest option, causing misclassification. How should you update the schema?",
    options: {
      A: "Add all possible future document types to the enum proactively.",
      B: "Switch from an enum to a free-text string field.",
      C: "Add 'other' to the enum plus a companion 'document_type_detail' string field for extensible categorization.",
      D: "Add 'unknown' to the enum and handle it as an error condition."
    },
    correct: "C",
    explanation: "The 'other' + detail string pattern is the recommended approach for extensible enum categorization. It maintains the benefits of constrained values for known types while allowing graceful handling of unknown categories without forcing misclassification or requiring schema updates for every new type."
  },

  // Task 4.4 – Validation and retry
  {
    id: 60, domain: 4, task: "4.4", scenario: "Structured Data Extraction",
    stem: "Your invoice extraction returns line_items that sum to $1,450 but the stated_total is $1,200. Both values are syntactically valid JSON but the semantics are inconsistent. How should you design the validation-correction flow?",
    options: {
      A: "Accept the extraction as valid — the schema syntax is correct.",
      B: "Design a self-correction flow: extract 'calculated_total' alongside 'stated_total', flag discrepancies with a 'conflict_detected' boolean, and send back for re-extraction with the specific validation error.",
      C: "Use the line items sum as the authoritative value and overwrite the stated total.",
      D: "Send a generic retry request without specifying the discrepancy."
    },
    correct: "B",
    explanation: "Semantic validation errors (values don't sum, wrong field placement) require self-correction flows. The approach: extract both calculated_total and stated_total, flag conflicts with a 'conflict_detected' boolean, and when retrying, include the specific validation error. Tool use eliminates syntax errors but NOT semantic errors — application-level validation is still required."
  },
  {
    id: 61, domain: 4, task: "4.4", scenario: "Structured Data Extraction",
    stem: "A batch of invoices consistently fails to extract the 'payment_terms' field. Investigation reveals payment terms appear only in a separate Terms & Conditions PDF attached to each invoice — not in the invoice itself. Will retrying with validation error feedback fix this?",
    options: {
      A: "Yes — retrying with error feedback always improves extraction accuracy.",
      B: "No — retries are ineffective when the required information is simply absent from the source document. You must provide the Terms & Conditions PDF as additional context.",
      C: "Yes — the model will search its training data for likely payment terms.",
      D: "No — retrying would increase costs without any benefit; discard these documents."
    },
    correct: "B",
    explanation: "Retries are only effective for format errors or structural output issues — when the model CAN produce the correct output but didn't. When information is absent from the source document, no amount of retrying will produce it. The fix is to provide the correct source (the Terms & Conditions PDF)."
  },

  // Task 4.5 – Batch processing
  {
    id: 62, domain: 4, task: "4.5", scenario: "Structured Data Extraction",
    stem: "You submit a batch of 500 invoice documents using the Message Batches API. Results come back after 18 hours. 47 documents failed with 'context_length_exceeded' errors. What is the correct handling strategy?",
    options: {
      A: "Resubmit all 500 documents with a higher max_tokens setting.",
      B: "Discard the 47 failed documents and note the limitation.",
      C: "Identify the 47 failed documents by custom_id, chunk those specific documents into smaller pieces, and resubmit only those 47.",
      D: "Switch to the synchronous API for all future batches to avoid this issue."
    },
    correct: "C",
    explanation: "Batch failure handling: resubmit only failed documents (identified by custom_id) with appropriate modifications (chunking documents that exceeded context limits). Resubmitting all 500 (A) wastes API calls and costs. The custom_id field exists specifically for correlating batch request/response pairs and handling partial failures."
  },
  {
    id: 63, domain: 4, task: "4.5", scenario: "Structured Data Extraction",
    stem: "You need to extract data from 10,000 documents with a 30-hour SLA. The Message Batches API has up to a 24-hour processing window. How frequently must you submit batches to guarantee meeting the SLA?",
    options: {
      A: "Submit once every 24 hours.",
      B: "Submit every 30 hours to match the SLA.",
      C: "Submit every 6 hours to ensure a 24-hour batch has time to complete within the 30-hour window.",
      D: "Use real-time API instead since the SLA is too tight for batch processing."
    },
    correct: "C",
    explanation: "To guarantee a 30-hour SLA with 24-hour batch processing: submit at most every 6 hours (30 - 24 = 6). This ensures that even if a batch takes the maximum 24 hours, it still completes within the 30-hour window. The exam tests this calculation pattern from Task Statement 4.5."
  },

  // Task 4.6 – Multi-instance review
  {
    id: 64, domain: 4, task: "4.6", scenario: "Claude Code CI/CD",
    stem: "You instruct Claude to review code it just generated for bugs. It reports 'looks good' on all sections. Another engineer manually finds a subtle off-by-one error in the logic. Why did the self-review fail?",
    options: {
      A: "The model was too confident from positive training data.",
      B: "A model retains reasoning context from generation, making it less likely to question its own decisions in the same session.",
      C: "Code review requires domain-specific fine-tuning.",
      D: "The context window was too full to fit the review prompt."
    },
    correct: "B",
    explanation: "Self-review limitations: the model retains its reasoning context from generation. This makes it anchor to its original decisions and less likely to catch subtle errors. An independent Claude instance without prior reasoning context is more effective at catching subtle issues than self-review instructions or extended thinking in the same session."
  },

  // ─── DOMAIN 5: Context Management & Reliability ───
  // Task 5.1 – Context preservation
  {
    id: 65, domain: 5, task: "5.1", scenario: "Customer Support Agent",
    stem: "After 20 turns in a customer support conversation, the agent contradicts itself — agreeing to a $75 credit in turn 8 but now claiming the maximum is $50. What is the most likely cause and fix?",
    options: {
      A: "The model is hallucinating — increase temperature to reduce randomness.",
      B: "Progressive summarization condensed the $75 credit commitment into a vague summary, losing the exact amount. Fix: extract transactional facts into a persistent 'case facts' block included in each prompt.",
      C: "The conversation is too long — start a new session every 10 turns.",
      D: "The agent's tool results are overwriting earlier conversation content."
    },
    correct: "B",
    explanation: "Progressive summarization risk: condensing numerical values, percentages, dates, and customer-stated expectations into vague summaries. The fix is extracting transactional facts (amounts, dates, order numbers, statuses) into a persistent 'case facts' block OUTSIDE summarized history, included in every prompt."
  },
  {
    id: 66, domain: 5, task: "5.1", scenario: "Customer Support Agent",
    stem: "Your order lookup MCP tool returns 40+ fields per order (warehouse location, carrier codes, weight, dimensions, insurance details, etc.) even though only 5 fields are relevant to support decisions. How should you handle this?",
    options: {
      A: "Filter fields on the frontend before displaying to agents.",
      B: "Trim verbose tool outputs to only relevant fields before they accumulate in context.",
      C: "Increase max_tokens to accommodate the full tool output.",
      D: "Cache tool results to avoid repeated lookups."
    },
    correct: "B",
    explanation: "Tool results accumulate in context and consume tokens disproportionately to their relevance. Trimming verbose tool outputs to only relevant fields before they accumulate reduces token waste and keeps context focused on decision-relevant information."
  },
  {
    id: 67, domain: 5, task: "5.1", scenario: "Multi-Agent Research",
    stem: "Your research report consistently omits findings from middle sections of subagent outputs, even when those findings are the most important. What is this phenomenon and how do you mitigate it?",
    options: {
      A: "Token overflow — increase max_tokens for the synthesis call.",
      B: "The 'lost in the middle' effect — models reliably process information at the beginning and end but may omit middle sections. Mitigate by placing key findings summaries at the beginning and organizing with explicit section headers.",
      C: "Subagent hallucination — add validation to verify all claimed findings.",
      D: "Context poisoning from earlier tool results — clear context between subagent calls."
    },
    correct: "B",
    explanation: "The 'lost in the middle' effect is a well-documented phenomenon: models reliably process information at the beginning and end of long inputs but omit findings from middle sections. Mitigation: place key findings summaries at the beginning of aggregated inputs and organize detailed results with explicit section headers."
  },

  // Task 5.2 – Escalation
  {
    id: 68, domain: 5, task: "5.2", scenario: "Customer Support Agent",
    stem: "A frustrated customer writes: 'I've been on hold for 45 minutes. I want to speak to a human agent RIGHT NOW.' Your agent detects frustration and begins investigating the customer's order before escalating. What should the agent have done instead?",
    options: {
      A: "Escalate immediately without any response — the customer is too frustrated for the agent to help.",
      B: "Continue investigating and offer to resolve, since the underlying issue may be straightforward.",
      C: "Honor the explicit customer request for a human agent immediately, without first attempting investigation.",
      D: "Ask the customer to clarify what specific help they need before deciding whether to escalate."
    },
    correct: "C",
    explanation: "When a customer EXPLICITLY requests a human agent, that request must be honored immediately — without first attempting investigation. This is a clear escalation trigger. The distinction: when a customer seems frustrated but hasn't explicitly asked for a human, the agent can offer to resolve. But explicit human requests are non-negotiable."
  },
  {
    id: 69, domain: 5, task: "5.2", scenario: "Customer Support Agent",
    stem: "A customer asks for a competitor price match. Your return policy document covers own-site price adjustments but is silent on competitor prices. The customer's request is reasonable and within the spirit of the policy. What should the agent do?",
    options: {
      A: "Deny the request since competitor matching isn't in the policy.",
      B: "Approve the request since the customer's intent matches the spirit of price adjustment policies.",
      C: "Escalate to a human agent since the policy is ambiguous or silent on this specific case.",
      D: "Ask the customer to submit a formal price match request through another channel."
    },
    correct: "C",
    explanation: "Policy gaps (not just complex cases) are explicit escalation triggers. When policy is ambiguous or silent on the customer's specific request, escalate rather than making a unilateral decision. This protects both the customer and the company while ensuring policy exceptions are handled by appropriate human decision-makers."
  },
  {
    id: 70, domain: 5, task: "5.2", scenario: "Customer Support Agent",
    stem: "Your agent achieves 55% first-contact resolution vs the 80% target. Logs show it escalates standard damage replacements with photo evidence while attempting to autonomously handle complex policy exceptions. What is the fix?",
    options: {
      A: "Have the agent self-report a confidence score (1–10) and escalate below a threshold.",
      B: "Deploy a separate ML classifier trained on historical tickets to predict escalation.",
      C: "Add explicit escalation criteria to the system prompt with few-shot examples demonstrating when to escalate versus resolve autonomously.",
      D: "Implement sentiment analysis to detect customer frustration and trigger escalation."
    },
    correct: "C",
    explanation: "Adding explicit escalation criteria with few-shot examples directly addresses unclear decision boundaries — the root cause. Self-reported confidence (A) is poorly calibrated. A separate ML classifier (B) is over-engineered before prompt optimization is tried. Sentiment (D) doesn't correlate with case complexity."
  },

  // Task 5.3 – Error propagation
  {
    id: 71, domain: 5, task: "5.3", scenario: "Multi-Agent Research",
    stem: "A web search subagent times out. Which error propagation approach best enables intelligent coordinator recovery?",
    options: {
      A: "Return structured error context including failure type, attempted query, partial results, and potential alternative approaches.",
      B: "Implement automatic retry with exponential backoff inside the subagent, returning generic 'search unavailable' only after exhaustion.",
      C: "Return an empty result set marked as successful to keep the pipeline running.",
      D: "Propagate the exception directly to a top-level handler that terminates the entire workflow."
    },
    correct: "A",
    explanation: "Structured error context (failure type, attempted query, partial results, alternative approaches) enables the coordinator to make intelligent recovery decisions — retry with modified query, try an alternative, or proceed with partial results. Generic status (B) hides context. Empty success (C) is silent suppression anti-pattern. Full termination (D) is unnecessarily drastic."
  },
  {
    id: 72, domain: 5, task: "5.3", scenario: "Multi-Agent Research",
    stem: "A subagent searches for 'AI governance frameworks EU 2023' and finds zero results. Separately, the same subagent fails to connect to the search service (timeout). How should these two situations differ in their error reporting?",
    options: {
      A: "Both should be reported as errors since neither produced results.",
      B: "The empty result is a valid success response (no matches found); the timeout is an access failure that should propagate as a structured error with retry context.",
      C: "The timeout should be silently suppressed; only the empty result needs reporting.",
      D: "Both should trigger subagent retry before reporting to the coordinator."
    },
    correct: "B",
    explanation: "Distinguishing access failures from valid empty results is critical. An empty search result (zero articles found) is a SUCCESSFUL query that returned no matches — the coordinator should note the gap but not treat it as a failure. A timeout is an ACCESS FAILURE — the coordinator needs this context to decide whether to retry or proceed without that data."
  },

  // Task 5.4 – Large codebase context
  {
    id: 73, domain: 5, task: "5.4", scenario: "Developer Productivity",
    stem: "After 2 hours of codebase exploration, your agent starts referencing 'typical authentication patterns' instead of the specific AuthService class it analyzed earlier. It's giving inconsistent answers about the codebase structure. What is happening and what should you do?",
    options: {
      A: "The model is making things up — restart with a fresh session from scratch.",
      B: "Context degradation: the model's context is overloaded. Have the agent maintain scratchpad files recording key findings, and reference them for subsequent questions.",
      C: "The model needs more context — increase max_tokens for all requests.",
      D: "The agent analyzed the wrong files — provide a corrected directory structure."
    },
    correct: "B",
    explanation: "Context degradation in extended sessions: models start giving inconsistent answers and referencing 'typical patterns' rather than specific discoveries. The fix: have agents maintain scratchpad files recording key findings and reference them across context boundaries. This externalizes memory beyond what the context window can hold."
  },
  {
    id: 74, domain: 5, task: "5.4", scenario: "Developer Productivity",
    stem: "Your codebase exploration agent crashes halfway through analyzing 200 microservices. How should you design for crash recovery so you don't lose all progress?",
    options: {
      A: "Use session resumption — Claude Code's --resume flag saves all progress automatically.",
      B: "Design structured state persistence: each agent exports its state to a known location, and the coordinator loads a manifest on resume to inject into agent prompts.",
      C: "Run multiple parallel agents so if one crashes, others continue.",
      D: "Checkpoint every 10 tool calls by storing the full conversation history."
    },
    correct: "B",
    explanation: "Structured state persistence for crash recovery: each agent exports state to a known location, and the coordinator loads a manifest on resume and injects state into agent prompts. This is more reliable than --resume alone (which may have stale tool results) and more structured than storing full conversation history."
  },

  // Task 5.5 – Human review workflows
  {
    id: 75, domain: 5, task: "5.5", scenario: "Structured Data Extraction",
    stem: "Your extraction system achieves 97% overall accuracy. You reduce human review for all high-confidence extractions. Three months later you discover 40% error rates on a specific document type (medical records) that represent only 3% of your volume. What is the lesson and fix?",
    options: {
      A: "97% overall accuracy is not sufficient — the bar should be 99%.",
      B: "Aggregate accuracy metrics mask poor performance on specific document types. Analyze accuracy by document type and field segment before reducing human review.",
      C: "High-confidence scoring needs recalibration — lower the confidence threshold.",
      D: "Medical records require specialized models and should be excluded from the system."
    },
    correct: "B",
    explanation: "Aggregate accuracy metrics (97% overall) can mask poor performance on specific document types or fields. Stratified accuracy analysis by document type and field segment is required before reducing human review. A segment with 3% volume but 40% error rate won't show up in overall metrics but causes significant harm."
  },
  {
    id: 76, domain: 5, task: "5.5", scenario: "Structured Data Extraction",
    stem: "Your extraction system produces field-level confidence scores. How should you calibrate these scores to determine the optimal review threshold?",
    options: {
      A: "Use the model's built-in confidence score directly — it's already calibrated.",
      B: "Set the threshold based on business risk: high-value fields get stricter thresholds.",
      C: "Calibrate field-level confidence scores using labeled validation sets, then set thresholds based on measured accuracy at each confidence level.",
      D: "A/B test different thresholds with human reviewers and pick the one with highest throughput."
    },
    correct: "C",
    explanation: "Calibrating confidence scores using labeled validation sets is the rigorous approach. Self-reported model confidence may not be accurately calibrated. A labeled validation set lets you measure actual accuracy at each confidence level and set thresholds based on real performance data, not assumptions."
  },

  // Task 5.6 – Provenance and uncertainty
  {
    id: 77, domain: 5, task: "5.6", scenario: "Multi-Agent Research",
    stem: "Two credible academic sources cite different statistics for the same metric: Source A reports 34% market penetration, Source B reports 52%. Your synthesis agent picks 52% and presents it as fact. What should it do instead?",
    options: {
      A: "Average the two values and report 43% as the consensus estimate.",
      B: "Use the more recent publication since it likely reflects more current data.",
      C: "Annotate the conflict with source attribution, including both values, and structure the report to distinguish well-established from contested findings.",
      D: "Flag the conflict to a human reviewer and exclude this metric from the report."
    },
    correct: "C",
    explanation: "Conflicting statistics from credible sources should be annotated with source attribution rather than arbitrarily selecting one. The report should explicitly distinguish well-established findings from contested ones, preserving both values and their sources so readers can evaluate the disagreement themselves."
  },
  {
    id: 78, domain: 5, task: "5.6", scenario: "Multi-Agent Research",
    stem: "Source A (2019) reports 15% AI adoption in manufacturing. Source B (2024) reports 67%. The synthesis agent flags this as a contradiction. What is actually happening and how should it be handled?",
    options: {
      A: "One source is wrong — use Source B as it is more recent.",
      B: "This is likely a genuine contradiction indicating inconsistent methodology.",
      C: "Require subagents to include publication/collection dates in structured outputs so the coordinator can interpret temporal differences correctly as growth, not contradiction.",
      D: "Exclude both sources since contradictory data reduces report credibility."
    },
    correct: "C",
    explanation: "Temporal data requires publication/collection dates in structured outputs to prevent temporal differences from being misinterpreted as contradictions. 15% (2019) → 67% (2024) is likely market growth over 5 years, not a contradiction. Including dates in structured subagent outputs enables correct temporal interpretation."
  },

  // ─── CROSS-DOMAIN: Additional scenario questions ───
  {
    id: 79, domain: 2, task: "2.4", scenario: "Developer Productivity",
    stem: "You need to integrate with Jira for issue tracking. Should you build a custom Jira MCP server or use an existing community implementation?",
    options: {
      A: "Build custom — it gives you full control over the interface and data returned.",
      B: "Use an existing community MCP server for standard integrations like Jira, reserving custom servers for team-specific workflows.",
      C: "Use the Jira REST API directly in a bash tool instead of MCP.",
      D: "Use both — the community server as fallback and a custom one as primary."
    },
    correct: "B",
    explanation: "The guidance is to choose existing community MCP servers over custom implementations for standard integrations (e.g., Jira, GitHub), reserving custom servers for team-specific or proprietary workflows. Community servers save development time and are often better tested."
  },
  {
    id: 80, domain: 1, task: "1.2", scenario: "Multi-Agent Research",
    stem: "Your coordinator always routes through the full pipeline even for simple queries. What risk does this create specifically for broad research topics?",
    options: {
      A: "The system becomes too slow for any practical use.",
      B: "Overly narrow task decomposition by the coordinator leads to incomplete coverage of broad research topics.",
      C: "Subagents run out of context window budget on simple queries.",
      D: "The synthesis agent has too little material to work with on simple topics."
    },
    correct: "B",
    explanation: "A key risk in coordinator design is overly narrow task decomposition — breaking a broad topic like 'creative industries' into only visual arts subtopics. The coordinator's decomposition quality directly determines coverage quality. This is why coordinator prompts should specify research GOALS and quality criteria, not step-by-step procedures."
  },
  {
    id: 81, domain: 4, task: "4.3", scenario: "Structured Data Extraction",
    stem: "You force tool selection with tool_choice: { type: 'tool', name: 'extract_metadata' } on the first request. What happens in subsequent extraction steps?",
    options: {
      A: "The forced tool_choice persists for all subsequent requests automatically.",
      B: "After the forced first call, subsequent steps are processed in follow-up turns where the model can freely select appropriate tools.",
      C: "You must force a different tool on each subsequent request.",
      D: "Forced tool selection cannot be followed by free tool selection in the same session."
    },
    correct: "B",
    explanation: "Forced tool selection (tool_choice: forced) applies to the specific request where it's set. After the first forced call (e.g., extract_metadata), subsequent steps are processed in follow-up turns where the model can freely select appropriate tools based on what's needed. This enables sequential workflows with a guaranteed starting point."
  },
  {
    id: 82, domain: 3, task: "3.5", scenario: "Code Generation",
    stem: "You're implementing a caching solution in an unfamiliar domain. Before asking Claude to implement it, you want to ensure important design considerations (cache invalidation strategies, failure modes, consistency requirements) are surfaced. What technique should you use?",
    options: {
      A: "Provide a detailed specification document with all requirements upfront.",
      B: "Use the interview pattern — have Claude ask clarifying questions to surface considerations before implementing.",
      C: "Request that Claude implement several alternative approaches simultaneously for comparison.",
      D: "Ask Claude to review similar open-source implementations first."
    },
    correct: "B",
    explanation: "The interview pattern has Claude ask questions to surface design considerations the developer may not have anticipated before implementing — especially valuable in unfamiliar domains. Cache invalidation strategies and failure modes are exactly the kind of non-obvious considerations the interview pattern is designed to surface."
  },
  {
    id: 83, domain: 5, task: "5.1", scenario: "Multi-Agent Research",
    stem: "Upstream subagents return verbose 3,000-word summaries with extensive reasoning chains. Downstream synthesis agents have limited context budgets. What should you change?",
    options: {
      A: "Increase the downstream synthesis agent's max_tokens to fit more content.",
      B: "Summarize upstream outputs to 200 words before passing them downstream.",
      C: "Modify upstream agents to return structured data (key facts, citations, relevance scores) instead of verbose content and reasoning chains.",
      D: "Use document chunking to split upstream outputs into smaller pieces."
    },
    correct: "C",
    explanation: "When downstream agents have limited context budgets, modify upstream agents to return structured data (key facts, citations, relevance scores) instead of verbose content and reasoning chains. Structured data conveys the same essential information in far fewer tokens, preserving attribution while respecting context constraints."
  },
  {
    id: 84, domain: 4, task: "4.5", scenario: "Structured Data Extraction",
    stem: "The Message Batches API does not support which of the following?",
    options: {
      A: "Processing up to 10,000 requests in a single batch.",
      B: "Multi-turn tool calling within a single request (cannot execute tools mid-request and return results).",
      C: "Using custom_id fields to correlate request/response pairs.",
      D: "Receiving up to 50% cost savings compared to synchronous API."
    },
    correct: "B",
    explanation: "The Message Batches API does NOT support multi-turn tool calling within a single request. You cannot execute tools mid-request and return results in a batch context. This makes it unsuitable for agentic workflows that require tool use, but fine for single-turn extraction tasks."
  },
  {
    id: 85, domain: 1, task: "1.6", scenario: "Developer Productivity",
    stem: "When should you prefer prompt chaining over dynamic adaptive decomposition?",
    options: {
      A: "Always — prompt chaining is more reliable and predictable.",
      B: "For open-ended, exploratory tasks where the next step depends on what is discovered.",
      C: "For predictable multi-aspect reviews where the steps are known in advance (e.g., analyze each file, then cross-file integration pass).",
      D: "When working with large codebases where context limits are a concern."
    },
    correct: "C",
    explanation: "Prompt chaining works best for predictable multi-aspect reviews with known steps. Dynamic adaptive decomposition is for open-ended tasks where subtasks are generated based on intermediate discoveries. The key distinction: known structure → prompt chaining; unknown structure → adaptive decomposition."
  },

  // ══════════════════════════════════════════════════
  // ─── EXTENDED QUESTION SET (86–135) ───
  // ══════════════════════════════════════════════════

  // ─── DOMAIN 1 EXTENDED ───

  // Iteration safety & infinite loop prevention
  {
    id: 86, domain: 1, task: "1.1", scenario: "Customer Support Agent",
    stem: "Your agentic loop has been running for 47 iterations and shows no sign of stopping. The customer's original query was simple: 'Where is my order?' What safeguard should have been in place?",
    options: {
      A: "A fallback system prompt that instructs the model to conclude after 10 turns.",
      B: "An explicit maximum iteration cap in the loop control code that terminates and escalates when exceeded.",
      C: "A watchdog timer that restarts the agent process after 60 seconds.",
      D: "A token budget that forces end_turn when remaining tokens drop below 500."
    },
    correct: "B",
    explanation: "Agentic loops must have an explicit maximum iteration cap (e.g., MAX_ITERATIONS = 20) in the orchestration code. When exceeded, the loop should terminate gracefully and escalate rather than run indefinitely. Prompt-based limits (A) are probabilistic. Timers (C) may interrupt mid-tool-call. Token budgets (D) are a proxy, not a direct iteration control."
  },
  {
    id: 87, domain: 1, task: "1.1", scenario: "Multi-Agent Research",
    stem: "A subagent calls the same web_search tool 12 times in a row with nearly identical queries, making no progress. This is wasting API costs. What design principle prevents this?",
    options: {
      A: "Rate limiting MCP tool calls at the infrastructure level.",
      B: "Track tool calls made per iteration; if the same tool is called more than N times without state change, trigger a circuit breaker to escalate to the coordinator.",
      C: "Add an instruction: 'Do not search for the same thing twice.'",
      D: "Limit each subagent to a maximum of 3 tool types."
    },
    correct: "B",
    explanation: "Circuit breaker patterns detect when an agent is stuck in a repetitive loop without progress. Tracking tool calls and detecting repeated invocations without state change — then escalating — is the correct design safeguard. Prompt instructions (C) are probabilistic and won't reliably prevent runaway loops."
  },
  {
    id: 88, domain: 1, task: "1.2", scenario: "Customer Support Agent",
    stem: "Your customer support agent decides on its own to apply a full account credit to resolve a dispute, bypassing your $50 maximum policy. The system prompt says 'resolve customer issues effectively.' What went wrong architecturally?",
    options: {
      A: "The model hallucinated a permission it was never granted.",
      B: "The system prompt was too vague — 'resolve effectively' implicitly grants too much latitude. Agentic systems must have explicit, bounded authority with programmatic enforcement.",
      C: "The process_credit tool description didn't mention the $50 limit.",
      D: "The model needs to be fine-tuned on company policies."
    },
    correct: "B",
    explanation: "Vague goal-oriented system prompts ('resolve effectively') can grant unintended latitude in agentic systems. Authority must be explicitly bounded and enforced programmatically (via hooks or tool parameter validation), not just described in prose. The model legitimately pursued the stated goal using available tools."
  },
  {
    id: 89, domain: 1, task: "1.3", scenario: "Multi-Agent Research",
    stem: "A research coordinator spawns 5 parallel subagents. Three return successfully after 2 minutes. Two time out after 10 minutes. How should the coordinator handle this partial completion?",
    options: {
      A: "Wait indefinitely for all subagents to complete before proceeding.",
      B: "Cancel all subagents and restart the full pipeline.",
      C: "Set a maximum wait time; proceed with results from completed subagents, explicitly noting which topics lack coverage in the final report.",
      D: "Return an error to the user since the pipeline cannot guarantee complete coverage."
    },
    correct: "C",
    explanation: "Graceful partial completion: proceed with available results after a timeout, explicitly flagging coverage gaps. Users receive a useful partial report faster than waiting indefinitely, with transparent notes about missing coverage so they can decide whether to re-run specific subtopics."
  },
  {
    id: 90, domain: 1, task: "1.3", scenario: "Multi-Agent Research",
    stem: "Your system prompt instructs the coordinator: 'You are a research coordinator. Research the topic thoroughly.' The coordinator produces shallow, unfocused reports. What improvement would most directly fix this?",
    options: {
      A: "Switch the coordinator to a more capable model.",
      B: "Reframe the coordinator's system prompt around research GOALS and quality criteria rather than step-by-step procedures.",
      C: "Add a step-by-step procedure for the coordinator to follow.",
      D: "Give the coordinator access to all subagent tools directly."
    },
    correct: "B",
    explanation: "Coordinator system prompts should specify research goals and quality criteria (e.g., 'Ensure coverage spans all major industry sectors; identify 3+ concrete examples per sector; flag contested claims'). Step-by-step procedures constrain adaptive reasoning. Goal-oriented prompts allow the coordinator to flexibly decompose tasks to meet quality standards."
  },
  {
    id: 91, domain: 1, task: "1.4", scenario: "Customer Support Agent",
    stem: "A customer asks: 'Can I return this laptop I bought 6 months ago?' Your agent needs to check the return policy, verify the purchase date, and check warranty status — all before responding. What is the correct multi-step handling?",
    options: {
      A: "Answer immediately with the general 30-day return policy, then check details if the customer pushes back.",
      B: "Complete all prerequisite information gathering (policy lookup, purchase verification, warranty check) before formulating a response to the customer.",
      C: "Ask the customer to call support since multi-step queries require human handling.",
      D: "Check only the return policy; warranty status is a separate concern."
    },
    correct: "B",
    explanation: "For queries requiring multiple lookups before a valid response can be formulated, complete all information gathering first. Responding with incomplete information (A) leads to contradictions when additional checks reveal different constraints. All prerequisite checks should complete before the customer-facing response."
  },
  {
    id: 92, domain: 1, task: "1.5", scenario: "Developer Productivity",
    stem: "You want to audit all file write operations made by Claude Code — logging the file path, content size, and timestamp — without modifying Claude's behavior. Which hook type is appropriate?",
    options: {
      A: "PreToolUse hook that logs and always approves.",
      B: "PostToolUse hook that records file write details after execution.",
      C: "Tool description update that adds a logging parameter.",
      D: "A separate monitoring agent that watches the filesystem."
    },
    correct: "B",
    explanation: "PostToolUse hooks run after tool execution and are ideal for audit logging — recording what happened without affecting the outcome. PreToolUse (A) could log, but runs before execution so doesn't have result data. Filesystem monitoring (D) is indirect and doesn't capture Claude's intent/context."
  },
  {
    id: 93, domain: 1, task: "1.6", scenario: "Structured Data Extraction",
    stem: "You need to extract data from 500 varied document types (invoices, contracts, research papers, emails). Some need 3 extraction steps; others need 10. Which decomposition approach handles this variability best?",
    options: {
      A: "Always run all 10 steps for every document for consistency.",
      B: "Pre-classify documents into 3 categories and use fixed pipelines for each category.",
      C: "Dynamic adaptive decomposition: the coordinator analyzes each document's characteristics and determines the extraction steps needed.",
      D: "Prompt chaining with 10 fixed steps, skipping steps that return empty results."
    },
    correct: "C",
    explanation: "Variable-complexity extraction across 500 document types requires dynamic adaptive decomposition. The coordinator examines document characteristics and adapts the extraction pipeline accordingly — simpler for standard invoices, more elaborate for complex research papers with embedded tables and citations."
  },
  {
    id: 94, domain: 1, task: "1.7", scenario: "Developer Productivity",
    stem: "A developer's Claude Code session runs for 4 hours and involves analyzing 150 files. The context window is approaching its limit. Without ending the session, how can you address context pressure?",
    options: {
      A: "Start a fresh session — context limit means all prior work is lost anyway.",
      B: "Use /compact to summarize earlier conversation portions while retaining key findings, then continue the session.",
      C: "Increase max_tokens to extend the available context.",
      D: "Delete old tool call results from the conversation to free up space."
    },
    correct: "B",
    explanation: "The /compact command summarizes earlier conversation portions to reduce context usage while retaining key findings, allowing the session to continue. This is the purpose of /compact — extending working sessions beyond initial context limits without losing critical accumulated knowledge."
  },
  {
    id: 95, domain: 1, task: "1.7", scenario: "Developer Productivity",
    stem: "You want to explore a risky database schema migration but preserve the current state of your analysis session in case the exploration goes wrong. Which session management feature enables this?",
    options: {
      A: "--save-session to checkpoint the current state.",
      B: "fork_session to branch from the current baseline before the risky exploration.",
      C: "--resume to roll back to a previous session state.",
      D: "Export the conversation to a file and import it later if needed."
    },
    correct: "B",
    explanation: "fork_session creates an independent branch from the current session baseline — perfect for risky explorations. If the exploration goes wrong, the original analysis session is untouched. If it succeeds, the findings can inform the main session. --save-session and --resume (A, C) are not real Claude Code commands."
  },

  // ─── DOMAIN 2 EXTENDED ───

  {
    id: 96, domain: 2, task: "2.1", scenario: "Customer Support Agent",
    stem: "You're designing a get_customer tool. A junior developer suggests the description: 'Gets customer data.' What specific elements should you add to make this description effective for LLM tool selection?",
    options: {
      A: "The tool's internal implementation details and database schema.",
      B: "Input formats accepted (email, customer ID, phone), example queries ('look up customer john@example.com'), what the output includes, and when to use it versus lookup_order.",
      C: "The API endpoint URL and authentication method.",
      D: "A confidence score indicating when the tool reliably succeeds."
    },
    correct: "B",
    explanation: "Effective tool descriptions for LLM selection include: accepted input formats, concrete example queries, output description, and disambiguation from similar tools (when to use get_customer vs lookup_order). Implementation details (A) and API endpoints (C) are irrelevant to LLM decision-making."
  },
  {
    id: 97, domain: 2, task: "2.1", scenario: "Multi-Agent Research",
    stem: "A new search_academic_papers tool is rarely called even when users request academic research. The web_search tool handles those requests instead, returning lower-quality results. What is the most likely cause?",
    options: {
      A: "The search_academic_papers tool has a lower success rate than web_search.",
      B: "The tool description for search_academic_papers doesn't explain its advantage over web_search — the model defaults to the tool it knows handles broad searches.",
      C: "Academic paper search requires a different API key that isn't configured.",
      D: "The model has a bias toward built-in tools and always prefers them."
    },
    correct: "B",
    explanation: "When a specialized tool is underused in favor of a general one, the description needs to explain WHY to choose the specialist. The search_academic_papers description should specify: 'Use for peer-reviewed academic literature. Returns DOIs, citation counts, and abstracts. Prefer over web_search when research quality and citation traceability are required.'"
  },
  {
    id: 98, domain: 2, task: "2.2", scenario: "Structured Data Extraction",
    stem: "Your extract_invoice tool encounters a password-protected PDF and cannot access its contents. What error response should the tool return?",
    options: {
      A: "isError: true, errorCategory: 'transient', isRetryable: true — retrying may bypass the protection.",
      B: "isError: false, result: {} — return empty extraction as a valid outcome.",
      C: "isError: true, errorCategory: 'access', isRetryable: false, explanation: 'Document is password-protected. Request document without password protection or provide decryption credentials.'",
      D: "isError: true with a generic 'extraction failed' message."
    },
    correct: "C",
    explanation: "A password-protected document is an access/permission error — non-retryable (retrying won't bypass the password) with a clear explanation of why it failed and what's needed to resolve it. The actionable next step (provide credentials or an unprotected version) helps the orchestrating agent or human decide how to proceed."
  },
  {
    id: 99, domain: 2, task: "2.2", scenario: "Customer Support Agent",
    stem: "Your lookup_order MCP tool returns a 200 status code but with an empty orders array when the customer ID exists but has no orders. The agent interprets this as 'customer not found' and asks the customer to verify their account. What is wrong?",
    options: {
      A: "The tool should throw an exception instead of returning an empty array.",
      B: "The tool's response doesn't distinguish 'customer not found' (actual error) from 'customer found with no orders' (valid empty state). These require different agent responses.",
      C: "The agent's parsing logic is incorrect — it should check array length.",
      D: "The MCP tool should always return at least one placeholder order."
    },
    correct: "B",
    explanation: "Returning identical responses for 'customer not found' vs 'customer has no orders' forces the agent to guess the distinction. The tool should return a structured response: customer_found: true/false alongside the (possibly empty) orders array. This allows the agent to respond correctly in both cases."
  },
  {
    id: 100, domain: 2, task: "2.3", scenario: "Claude Code CI/CD",
    stem: "Your CI/CD pipeline Claude agent has access to tools for: code review, test generation, security scanning, deployment, database migration, and production log analysis. After a bad deployment, you find the agent ran a database migration mid-review without being asked. What principle was violated?",
    options: {
      A: "The agent should have asked for confirmation before each tool call.",
      B: "Least-privilege tool assignment: CI review agents should only have tools relevant to their review role, not deployment or migration tools.",
      C: "The system prompt didn't explicitly forbid database migrations.",
      D: "Database migration tools should require a separate API key."
    },
    correct: "B",
    explanation: "Least-privilege tool assignment means each agent receives only the tools needed for its designated role. A code review agent has no legitimate reason to access deployment or database migration tools. The presence of the tool — not the absence of a prohibition — was the vulnerability. Remove irrelevant tools, don't rely on instructions to prevent their use."
  },
  {
    id: 101, domain: 2, task: "2.3", scenario: "Structured Data Extraction",
    stem: "Your extraction pipeline's first step uses tool_choice to force an extract_structure tool. The second step needs to classify document type. The third step extracts specific fields based on document type. How should tool_choice be configured across these steps?",
    options: {
      A: "Force tool_choice on all three steps to guarantee structured output throughout.",
      B: "Force only step 1 (extract_structure); step 2 uses 'any' to guarantee a classification tool call; step 3 uses 'any' to guarantee extraction.",
      C: "Use 'auto' for all steps after confirming the pipeline works.",
      D: "Force tool_choice only on the final step since earlier steps are intermediate."
    },
    correct: "B",
    explanation: "Multi-step pipelines requiring structured output at each stage should use appropriate tool_choice per step: forced for known required tools, 'any' when multiple tools could apply but a call is required, 'auto' only when a text response is an acceptable outcome. Step 2 and 3 need 'any' to guarantee a tool call without prescribing which one."
  },
  {
    id: 102, domain: 2, task: "2.4", scenario: "Developer Productivity",
    stem: "A developer configures a GitHub MCP server in ~/.claude.json with their personal token, then pushes that file to a shared Docker image used by the team's CI system. What security problem results?",
    options: {
      A: "The token will expire because MCP tokens have short lifespans.",
      B: "The personal GitHub token is embedded in the shared Docker image, exposing it to anyone with image access.",
      C: "The MCP server will reject requests because the token is associated with a personal account, not a service account.",
      D: "The ~/.claude.json configuration overrides the project .mcp.json, breaking team settings."
    },
    correct: "B",
    explanation: "Embedding personal credentials in shared infrastructure artifacts (Docker images, repos) is a classic credentials exposure vulnerability. MCP credentials for CI should use environment variable expansion (${CI_GITHUB_TOKEN}) pointing to a service account token injected by the CI platform's secrets manager — never hardcoded in configuration files."
  },
  {
    id: 103, domain: 2, task: "2.4", scenario: "Developer Productivity",
    stem: "Your team's MCP server configuration lists 12 servers. Developers report Claude is slow to respond and sometimes picks wrong tools. What is the likely cause and fix?",
    options: {
      A: "MCP servers add network latency; reduce to 3 servers by removing rarely used ones.",
      B: "12 active MCP servers provide too many tools simultaneously, degrading selection reliability. Audit usage and remove or deactivate servers not needed by most developers.",
      C: "MCP servers should be loaded sequentially, not all at startup.",
      D: "The tool description quality varies across servers; standardize all descriptions."
    },
    correct: "B",
    explanation: "Too many active MCP servers = too many tools available = degraded tool selection reliability. Just as too many tools in a single agent degrades selection, too many MCP servers compound the problem. Audit actual usage patterns and deactivate servers that most developers don't need day-to-day."
  },
  {
    id: 104, domain: 2, task: "2.5", scenario: "Developer Productivity",
    stem: "You run Edit to replace a function body in main.py. The tool returns 'success' but when you Read the file, the change wasn't applied. What is the most likely cause?",
    options: {
      A: "The file is read-only on the filesystem.",
      B: "The Edit tool silently succeeds when the file hasn't been Read in the current session — it requires a prior Read to establish the file's current state.",
      C: "The replacement string contained special characters that caused a no-op.",
      D: "Edit only works on files under 100KB."
    },
    correct: "B",
    explanation: "The Edit tool requires reading the file first in the current session to establish its current state. Attempting to Edit without a prior Read can result in silent no-ops or incorrect matches if the file was modified externally. Always Read before Edit to ensure the anchor text in old_str accurately reflects the current file state."
  },
  {
    id: 105, domain: 2, task: "2.5", scenario: "Claude Code CI/CD",
    stem: "In a CI pipeline, which combination of tools is correct for the task: 'Find all Python files in the src/ directory, then check if any import the deprecated `legacy_utils` module'?",
    options: {
      A: "Glob to find Python files → Read each file → check for import.",
      B: "Grep with pattern 'legacy_utils' across all files directly.",
      C: "Glob to find Python files matching src/**/*.py → Grep to search those files for 'from legacy_utils' or 'import legacy_utils'.",
      D: "Bash to run a find | xargs grep command."
    },
    correct: "C",
    explanation: "The optimal combination: Glob to scope the file set (src/**/*.py) + Grep to search contents for the import pattern. Grep alone (B) would search all files, not just src/ Python files. Read + manual check (A) is less efficient than Grep for pattern matching. Glob + Grep is the canonical pattern for scoped content search."
  },

  // ─── DOMAIN 3 EXTENDED ───

  {
    id: 106, domain: 3, task: "3.1", scenario: "Code Generation",
    stem: "Your CLAUDE.md has grown to include authentication guidelines, database conventions, API design standards, frontend rules, and DevOps policies. The file is 1,200 lines long and loads for every Claude Code session regardless of task. What is wrong with this approach?",
    options: {
      A: "CLAUDE.md has a maximum 500-line limit.",
      B: "Loading 1,200 lines of irrelevant context for every session wastes tokens and can degrade response quality by cluttering context with non-relevant rules.",
      C: "CLAUDE.md cannot be used for cross-domain conventions.",
      D: "Long CLAUDE.md files cause Claude Code to time out on startup."
    },
    correct: "B",
    explanation: "Monolithic CLAUDE.md loads entirely for every session, wasting tokens on rules irrelevant to the current task and potentially degrading response quality. The solution is modular .claude/rules/ files with path-scoped frontmatter — only relevant rules load for each session based on which files are being edited."
  },
  {
    id: 107, domain: 3, task: "3.1", scenario: "Code Generation",
    stem: "You want to share common prompt patterns across multiple CLAUDE.md files without duplicating content. What is the correct mechanism?",
    options: {
      A: "Use YAML anchors (&anchor, *alias) in CLAUDE.md frontmatter.",
      B: "Use the @import syntax in CLAUDE.md to import content from shared files.",
      C: "Symlink the CLAUDE.md to a shared file in a network location.",
      D: "Use environment variables to reference shared instruction blocks."
    },
    correct: "B",
    explanation: "The @import syntax in CLAUDE.md imports content from other files — enabling shared instruction blocks referenced by multiple CLAUDE.md files without duplication. This is the documented mechanism for modular CLAUDE.md composition. YAML anchors (A) don't work in CLAUDE.md. Symlinks (C) are fragile across platforms and teams."
  },
  {
    id: 108, domain: 3, task: "3.1", scenario: "Code Generation",
    stem: "A developer opens Claude Code from their home directory (~/). Which CLAUDE.md files are loaded?",
    options: {
      A: "Only ~/.claude/CLAUDE.md since no project directory is active.",
      B: "~/.claude/CLAUDE.md (user-level) only; project CLAUDE.md files are not loaded when no project is active.",
      C: "All CLAUDE.md files found anywhere on the filesystem.",
      D: "The user-level CLAUDE.md is never loaded; only project-level files load."
    },
    correct: "B",
    explanation: "CLAUDE.md loading follows the hierarchy: user-level (~/.claude/CLAUDE.md) is always loaded, project-level (.claude/CLAUDE.md) loads when inside a project directory, and subdirectory CLAUDE.md files load when editing files in those subdirectories. From the home directory with no project, only user-level loads."
  },
  {
    id: 109, domain: 3, task: "3.2", scenario: "Code Generation",
    stem: "You create a /analyze-dependencies skill. When developers run it, they want to provide the target module name as a parameter. How do you configure this?",
    options: {
      A: "Use $ARGUMENTS in the skill body to reference the parameter and set argument-hint in frontmatter to describe expected input.",
      B: "Create a separate skill file for each possible module name.",
      C: "Use a required_params field in the skill frontmatter listing parameter names.",
      D: "Skills don't support parameters — use a template instead."
    },
    correct: "A",
    explanation: "$ARGUMENTS is the placeholder in skill body content that gets replaced with user-provided input at runtime. The argument-hint frontmatter field describes the expected input format (e.g., 'module name, e.g. auth, payments') and is shown to developers in autocomplete. Together these enable parameterized skills."
  },
  {
    id: 110, domain: 3, task: "3.2", scenario: "Claude Code CI/CD",
    stem: "Your /security-audit slash command is in .claude/commands/ and runs a comprehensive security scan. You want a personal variant that additionally checks your company's internal compliance rules — but only for yourself. Where should you put it?",
    options: {
      A: "Add a 'personal_mode' parameter to the existing .claude/commands/ version.",
      B: "Create ~/.claude/commands/security-audit-internal.md — a personal command that calls the project command and adds internal compliance checks.",
      C: "Fork the project repository and modify .claude/commands/ there.",
      D: "Add conditional logic to the project command that detects your username."
    },
    correct: "B",
    explanation: "Personal slash commands in ~/.claude/commands/ are user-scoped and version-controlled separately from the project. Creating a personal variant (security-audit-internal) that extends the team command with personal additions is the documented pattern for personal customization without affecting teammates."
  },
  {
    id: 111, domain: 3, task: "3.3", scenario: "Code Generation",
    stem: "You have a .claude/rules/security.md file with frontmatter `paths: ['**/*.js', '**/*.ts']`. A developer is editing a Python file (auth.py). Will the security rules load?",
    options: {
      A: "Yes — security rules always load regardless of file type.",
      B: "No — the glob pattern only matches .js and .ts files; Python files don't trigger this rule file.",
      C: "Yes — CLAUDE.md rules files always load when their parent directory is active.",
      D: "It depends on whether auth.py is in the same directory as security.md."
    },
    correct: "B",
    explanation: "Path-scoped rule files only load when editing files that match the specified glob patterns. `paths: ['**/*.js', '**/*.ts']` matches only JavaScript and TypeScript files. Editing a Python file won't trigger this rule file — by design, so that only relevant conventions load for each editing context."
  },
  {
    id: 112, domain: 3, task: "3.3", scenario: "Code Generation",
    stem: "You want different database conventions to apply when editing files in src/postgres/ versus src/mongodb/. How do you configure this with path-scoped rules?",
    options: {
      A: "Create a single .claude/rules/database.md covering both databases.",
      B: "Create .claude/rules/postgres.md with `paths: ['src/postgres/**']` and .claude/rules/mongodb.md with `paths: ['src/mongodb/**']` — each with their respective conventions.",
      C: "Place separate CLAUDE.md files in src/postgres/ and src/mongodb/.",
      D: "Use a conditional expression in a single rules file: `if postgres: ... else if mongodb: ...`"
    },
    correct: "B",
    explanation: "Multiple path-scoped rule files with different glob patterns is the correct approach for directory-specific conventions. This is cleaner than subdirectory CLAUDE.md files (which can't easily share root context) and more targeted than a single rules file with all database conventions loading for both contexts."
  },
  {
    id: 113, domain: 3, task: "3.4", scenario: "Claude Code CI/CD",
    stem: "A CI pipeline task is: 'Add error handling to the payment module.' There are 3 files involved, and the correct error handling pattern depends on whether a transaction is synchronous or asynchronous. Which mode should you use?",
    options: {
      A: "Direct execution — error handling is a straightforward, routine task.",
      B: "Plan mode — the task requires analyzing the codebase to determine transaction patterns before deciding which error handling approach to apply.",
      C: "Direct execution with detailed instructions specifying sync vs async handlers.",
      D: "Plan mode only if the files are over 500 lines each."
    },
    correct: "B",
    explanation: "Plan mode is needed when the correct approach depends on analysis of existing code. The instruction 'add error handling' seems simple, but the correct implementation depends on discovering whether transactions are sync or async — information that requires codebase exploration before implementation decisions can be made. Plan mode enables this investigation."
  },
  {
    id: 114, domain: 3, task: "3.5", scenario: "Code Generation",
    stem: "You ask Claude to refactor a function for performance. It produces a solution that's faster but harder to read, violating your readability standards. On the next iteration, you ask it to improve readability but it reverts to the unoptimized version. What is the best prompting approach?",
    options: {
      A: "Accept the trade-off — performance and readability cannot both be improved.",
      B: "Provide explicit constraints in the prompt: 'Maintain O(n) time complexity from the previous solution while adding inline comments and extracting helper functions.'",
      C: "Ask Claude to prioritize readability over performance on every iteration.",
      D: "Run two separate requests and manually merge the best parts."
    },
    correct: "B",
    explanation: "When iterating on code with multiple constraints, explicitly carry forward requirements from successful prior iterations. Saying 'maintain O(n) time complexity from the previous solution' preserves the performance gain while giving Claude clear bounds for the readability improvements. Without explicit constraints, earlier requirements get dropped."
  },
  {
    id: 115, domain: 3, task: "3.5", scenario: "Code Generation",
    stem: "After 8 iterations, Claude still produces code that doesn't handle the edge case you care about. Each iteration is slightly better but misses the same corner case. What is the most effective diagnostic step?",
    options: {
      A: "Switch to a more capable model.",
      B: "Provide a minimal, concrete failing test case as an example — showing exact input and expected output for the edge case.",
      C: "Add more detailed prose explaining why the edge case matters.",
      D: "Ask Claude to explain its reasoning before generating code."
    },
    correct: "B",
    explanation: "When iterative prose refinement fails to address an edge case, provide a concrete failing test case (exact input, expected output). This gives Claude an unambiguous specification it cannot misinterpret. A test case communicates the edge case in executable terms, far more precisely than prose descriptions."
  },
  {
    id: 116, domain: 3, task: "3.6", scenario: "Claude Code CI/CD",
    stem: "Your CI pipeline generates structured JSON review output using `--output-format json`. The JSON includes a `review_findings` array. You want to fail the CI build if any finding has `severity: 'critical'`. What does the correct pipeline step look like?",
    options: {
      A: "Pipe Claude's output to a severity keyword checker using grep.",
      B: "Parse the `--output-format json` output programmatically, check the review_findings array for critical severity items, and exit non-zero if found.",
      C: "Ask Claude to exit with code 1 if it finds critical issues.",
      D: "Configure a severity threshold in .mcp.json that automatically fails on critical findings."
    },
    correct: "B",
    explanation: "The correct pattern: use --output-format json to get machine-parseable output, then parse the JSON programmatically in your pipeline script to check for critical severity items and exit non-zero to fail the build. Having Claude exit with a specific code (C) is unreliable — programmatic parsing of structured output is the designed approach."
  },
  {
    id: 117, domain: 3, task: "3.6", scenario: "Claude Code CI/CD",
    stem: "You want Claude Code to generate a test for every new function added in a PR. The PR diff shows 3 new functions across 2 files. How should you structure the CI prompt?",
    options: {
      A: "One prompt: 'Generate tests for all new functions in this PR.'",
      B: "Three separate prompts — one per new function — for targeted test generation.",
      C: "Provide the PR diff and existing test patterns in context, then prompt Claude to generate tests specifically for the 3 identified new functions, following the existing test style.",
      D: "Ask Claude to identify new functions first, then approve the list before test generation."
    },
    correct: "C",
    explanation: "Effective CI test generation: provide the PR diff (so Claude knows what changed), include existing test files (so Claude learns the project's testing patterns and avoids duplication), then prompt with the specific functions to test. This combines context about what exists with clear scope of what to generate."
  },

  // ─── DOMAIN 4 EXTENDED ───

  {
    id: 118, domain: 4, task: "4.1", scenario: "Claude Code CI/CD",
    stem: "Your code review prompt says: 'Thoroughly check the code for issues.' The output is inconsistent — sometimes detailed, sometimes superficial. What is the root cause?",
    options: {
      A: "The model's temperature setting is too high.",
      B: "'Thoroughly' is a vague quality descriptor that provides no concrete criteria. Define explicit review categories: security vulnerabilities, logic errors, null pointer risks, unused imports.",
      C: "The prompt needs to be longer with more context about the codebase.",
      D: "The model needs chain-of-thought prompting to produce thorough reviews."
    },
    correct: "B",
    explanation: "Vague quality descriptors ('thoroughly', 'carefully', 'comprehensively') produce inconsistent results because they don't specify WHAT to check. Explicit, enumerated review categories with concrete examples for each produce consistent, comparable outputs across runs."
  },
  {
    id: 119, domain: 4, task: "4.1", scenario: "Customer Support Agent",
    stem: "Your agent classifies customer sentiment as 'frustrated' and immediately escalates. In reality, the customer is frustrated about an unrelated past experience but their current issue is simple and resolvable. What is the flaw in the escalation criteria?",
    options: {
      A: "Sentiment analysis models are not accurate enough for production use.",
      B: "Using sentiment as a proxy for case complexity or resolvability is unreliable. Escalation criteria should be based on case type and policy scope, not emotional tone.",
      C: "The agent should ask customers if they want to escalate rather than deciding automatically.",
      D: "Sentiment analysis should be disabled entirely in favor of keyword detection."
    },
    correct: "B",
    explanation: "Sentiment ≠ case complexity or resolvability. A frustrated customer may have a trivial issue; a calm customer may have an unsolvable policy exception. Escalation criteria should be explicit and case-based: 'escalate if request is outside documented policy scope' — not 'escalate if customer sounds upset.'"
  },
  {
    id: 120, domain: 4, task: "4.2", scenario: "Customer Support Agent",
    stem: "Your agent consistently fails to ask for an order number when customers report shipping issues, even though the system prompt says 'collect necessary information.' You add a few-shot example showing an agent asking for the order number in a similar scenario. After testing, the behavior improves from 40% to 91% compliance. What does this illustrate?",
    options: {
      A: "The model responds better to commands than examples.",
      B: "Few-shot examples are more effective than general instruction for consistent behavior — showing the model exactly what to do beats describing it.",
      C: "The 'collect necessary information' instruction was placed incorrectly in the prompt.",
      D: "A 91% rate means the remaining 9% require a programmatic fix."
    },
    correct: "B",
    explanation: "This illustrates the core value of few-shot prompting: concrete examples demonstrating desired behavior produce more consistent results than abstract instructions. The model learns what 'collect necessary information' means in practice from the example. Few-shot > general instruction for consistent specific behaviors."
  },
  {
    id: 121, domain: 4, task: "4.2", scenario: "Structured Data Extraction",
    stem: "You include one positive few-shot example for invoice extraction and get decent results. What would be the highest-value addition to your few-shot set?",
    options: {
      A: "Add 4 more positive examples of standard invoices.",
      B: "Add a negative example showing incorrect extraction with an explanation of what went wrong.",
      C: "Add examples covering edge cases: invoices with missing fields, non-standard layouts, multiple currencies.",
      D: "Increase the detail of the existing positive example."
    },
    correct: "C",
    explanation: "After having one positive example of the happy path, the highest-value additions are edge case examples that cover non-standard situations where the model is most likely to fail: missing fields (showing nullable handling), non-standard layouts (showing structural adaptation), multiple currencies (showing disambiguation). Edge cases teach the model its boundaries."
  },
  {
    id: 122, domain: 4, task: "4.3", scenario: "Structured Data Extraction",
    stem: "You need to extract data from an invoice and then validate business rules (payment terms must be net-30 or net-60; discount must be 0–15%). How should you structure this pipeline?",
    options: {
      A: "Include business rule validation in the extraction JSON schema as complex enum constraints.",
      B: "Use tool_use for schema-compliant extraction (eliminates syntax errors), then apply business rule validation in application code as a separate step.",
      C: "Add business rules to the system prompt: 'Ensure extracted values comply with payment terms policy.'",
      D: "Combine extraction and validation into a single tool with a 'valid' boolean output field."
    },
    correct: "B",
    explanation: "Two-layer validation: tool_use guarantees syntactically correct JSON (schema compliance), while business rule validation happens in application code as a separate step. JSON schemas handle structure; application logic handles semantics. Mixing them (A, D) creates overly complex schemas. Prompt-based validation (C) is probabilistic."
  },
  {
    id: 123, domain: 4, task: "4.3", scenario: "Multi-Agent Research",
    stem: "Your synthesis agent must output a research report in a structured format with fields: executive_summary, key_findings (array), confidence_level, and limitations. The agent sometimes returns prose instead of structured output. What is the fix?",
    options: {
      A: "Add more explicit formatting instructions to the system prompt.",
      B: "Use tool_choice: 'any' with a submit_research_report tool that has the required JSON schema, forcing the agent to populate the structured fields.",
      C: "Post-process the prose output to extract structured sections.",
      D: "Use tool_choice: 'auto' and rely on the model to pick the structured output tool."
    },
    correct: "B",
    explanation: "When structured output is mandatory from an agent, define a 'submit' or 'output' tool with the required schema and use tool_choice: 'any'. This forces the agent to call a tool rather than return prose, and the tool's JSON schema guarantees structural compliance. 'auto' (D) allows prose fallback — unacceptable when structure is required."
  },
  {
    id: 124, domain: 4, task: "4.4", scenario: "Structured Data Extraction",
    stem: "Your extraction system retries on every semantic validation error with full context. After 3 retries, a batch of 100 documents has cost 4x more than expected, with minimal accuracy improvement. How should you optimize the retry strategy?",
    options: {
      A: "Disable retries entirely — they are too costly.",
      B: "Implement targeted retries: retry only specific failed fields (not full re-extraction), limit to 2 retries per document, and flag for human review after exhaustion.",
      C: "Increase max_tokens per retry to give the model more room to correct errors.",
      D: "Switch to a cheaper model for retry attempts."
    },
    correct: "B",
    explanation: "Retry optimization: scope retries to specific failed fields rather than full document re-extraction (dramatically reduces tokens per retry), cap at 2 retries to prevent cost explosion, then flag for human review after exhaustion rather than retrying indefinitely. Targeted field retry is the key cost-reduction insight."
  },
  {
    id: 125, domain: 4, task: "4.4", scenario: "Structured Data Extraction",
    stem: "An invoice has the line: 'Discount: Ten percent.' The schema expects discount as a numeric value (0.10). After extraction, discount: null. After retry with error feedback, still null. What is the correct interpretation?",
    options: {
      A: "The model has a bug — it should convert 'ten' to 0.10.",
      B: "This is a semantic ambiguity the model cannot reliably resolve — annotate the extraction as requiring human review to convert the text to a numeric value.",
      C: "The schema should accept string values like 'ten percent'.",
      D: "Retry with explicit instructions: 'Convert written number words to numeric values.'"
    },
    correct: "D",
    explanation: "This is a case where a targeted retry instruction CAN help — the model isn't missing information, it needs explicit instruction to convert textual number representations. Option D is correct: retry with the specific instruction 'Convert written number words (ten, twenty, etc.) to their decimal equivalents.' This is different from absent information where retries are futile."
  },
  {
    id: 126, domain: 4, task: "4.5", scenario: "Structured Data Extraction",
    stem: "You submit a Message Batch with 200 invoice extraction requests. Each request needs to call an MCP tool to look up vendor details from your database mid-extraction. Will the batch work as designed?",
    options: {
      A: "Yes — MCP tools are fully supported in Message Batches.",
      B: "No — Message Batches do not support multi-turn tool calling. Each request must be self-contained without requiring external tool calls mid-processing.",
      C: "Yes, but only if the MCP server is available at the time the batch runs.",
      D: "Partial support — the first tool call per request is supported, but not subsequent ones."
    },
    correct: "B",
    explanation: "The Message Batches API does not support multi-turn tool calling within a single request. Requests that require mid-processing tool calls to external services cannot use batch mode. Design your extraction to either pre-fetch vendor details and include them as context in each batch request, or use synchronous API for interactive tool-calling workflows."
  },
  {
    id: 127, domain: 4, task: "4.6", scenario: "Claude Code CI/CD",
    stem: "To implement independent code review, you spawn a fresh Claude instance with only the code to review and no prior context. After running the review, the fresh instance flags 0 issues. The original author reviews the reviewer's work and finds the reviewer was given minified, obfuscated code accidentally. What process control was missing?",
    options: {
      A: "The review instance needed a higher temperature for more critical output.",
      B: "Validate that the code passed to the independent review instance is readable/non-obfuscated before submitting.",
      C: "The review should have been done by a human, not an AI.",
      D: "Multiple review instances should have been used and results averaged."
    },
    correct: "B",
    explanation: "Input validation before independent review: verify the code being reviewed is in a reviewable state (not minified, not generated artifacts, not transpiled output). Process controls must ensure the review receives meaningful input. Independent instance isolation doesn't help if the input itself is the problem."
  },
  {
    id: 128, domain: 4, task: "4.6", scenario: "Claude Code CI/CD",
    stem: "You want to detect security vulnerabilities specifically in authentication code (session management, token validation, CSRF handling). What is the most effective review strategy?",
    options: {
      A: "Run a general security review on the full codebase and filter results.",
      B: "Use a security-specialized review instance with a system prompt focused exclusively on authentication vulnerabilities, reviewing only authentication-related files.",
      C: "Ask the original developer to self-review with a security checklist.",
      D: "Run 5 independent reviews and keep findings that appear in 3 or more."
    },
    correct: "B",
    explanation: "Domain-specialized review: a review instance with a system prompt focused on authentication vulnerabilities (session fixation, token entropy, CSRF patterns, replay attacks) will identify issues that general security prompts miss. Specializing both the prompt AND the file scope produces the most targeted, deep results."
  },

  // ─── DOMAIN 5 EXTENDED ───

  {
    id: 129, domain: 5, task: "5.1", scenario: "Customer Support Agent",
    stem: "After 35 conversation turns, your agent starts giving responses like 'as I mentioned earlier about the refund...' but the refund was discussed 25 turns ago and has since been superseded by a different resolution. What is the cause and fix?",
    options: {
      A: "The model is hallucinating fabricated conversation history.",
      B: "Progressive summarization collapsed the resolution update into an ambiguous summary while retaining the older refund reference. Fix: maintain a structured 'current resolution state' block updated explicitly with each new development.",
      C: "The conversation is too long — enforce a maximum of 20 turns.",
      D: "Use a higher max_tokens to give the model better recall of older turns."
    },
    correct: "B",
    explanation: "When conversation summarization collapses sequential updates, the model may surface outdated states. The fix is a structured 'current state' block that's explicitly updated with each resolution change — not relied upon being preserved through summarization. The current state block is always accurate; summarized history may lose temporal ordering of updates."
  },
  {
    id: 130, domain: 5, task: "5.1", scenario: "Multi-Agent Research",
    stem: "Your synthesis agent receives a 15,000-token aggregate input from 6 upstream subagents. The final report omits key findings from agents 3 and 4. What ordering change would most likely improve this?",
    options: {
      A: "Reduce each subagent's output to 500 tokens.",
      B: "Move the most critical findings from agents 3 and 4 to the beginning of the aggregate input, as models reliably process information at input boundaries.",
      C: "Process agents 3 and 4 in a separate synthesis pass.",
      D: "Increase max_tokens for the synthesis call."
    },
    correct: "B",
    explanation: "'Lost in the middle' mitigation: place critical findings at the beginning or end of long inputs where model attention is strongest. Reorganizing the aggregate input to front-load key findings from agents 3 and 4 directly addresses the attention distribution problem without architectural changes."
  },
  {
    id: 131, domain: 5, task: "5.2", scenario: "Customer Support Agent",
    stem: "A customer contacts support about an issue that involves a recent regulatory change affecting their account type — something not yet documented in your policy database. The agent says 'I'm unable to help with this.' Is this the correct behavior?",
    options: {
      A: "Yes — if it's not in the policy database, the agent is correct to decline.",
      B: "No — regulatory changes creating policy gaps should trigger escalation to a human agent who can apply judgment, not a refusal.",
      C: "The agent should look up the regulatory change on external websites.",
      D: "The agent should apply the closest matching policy and note the uncertainty."
    },
    correct: "B",
    explanation: "Policy gaps (situations not covered by current documentation) are explicit escalation triggers. The agent should escalate with a summary of the situation and flag that it involves a potential regulatory change — not refuse to help. The escalation message should include all available context so the human agent can research and apply appropriate judgment."
  },
  {
    id: 132, domain: 5, task: "5.3", scenario: "Customer Support Agent",
    stem: "Your process_refund tool fails with a database lock error (transient, retryable). The error propagates to the customer as: 'Refund failed.' The customer calls in the next day and is angry that they received no update. What was missing from the error handling?",
    options: {
      A: "The tool should never fail — add more database replicas.",
      B: "Transient errors should trigger automatic retry with backoff; if retries are exhausted, the customer should receive a specific message acknowledging the failure and promising follow-up, not a generic 'failed' message.",
      C: "The agent should have asked the customer to try again.",
      D: "Database lock errors should be escalated to engineering, not the customer."
    },
    correct: "B",
    explanation: "Transient error handling: auto-retry with exponential backoff first. If retries exhaust, provide a customer-facing message that acknowledges the failure specifically ('Your refund request was received but we encountered a technical issue processing it — you will receive a follow-up within 24 hours') rather than a generic failure that leaves the customer with no recourse."
  },
  {
    id: 133, domain: 5, task: "5.4", scenario: "Developer Productivity",
    stem: "You're analyzing a large monorepo with 2,000 files. Your agent tries to Read all files upfront before starting analysis. Context fills up after 300 files and performance degrades badly. What is the better approach?",
    options: {
      A: "Increase max_tokens to allow more files to be read upfront.",
      B: "Have the agent use strategic exploration: first read the project structure/README/CLAUDE.md to understand the architecture, then read only the specific files relevant to the current analysis task.",
      C: "Pre-process all 2,000 files offline and provide a summary to the agent.",
      D: "Split the monorepo into 7 chunks of ~285 files and analyze each separately."
    },
    correct: "B",
    explanation: "Strategic context loading: start with architecture-level files (README, root CLAUDE.md, package.json, top-level directory structure) to build a mental model, then load only the specific files relevant to the current question. Reading all 2,000 files is both wasteful and counterproductive — targeted reads based on understanding are far more effective."
  },
  {
    id: 134, domain: 5, task: "5.5", scenario: "Structured Data Extraction",
    stem: "Your extraction pipeline processes 10,000 documents per day. For compliance, 100% of documents above $50,000 total value must have a human review the extracted data before it's used. How do you implement this without creating a bottleneck?",
    options: {
      A: "Flag all documents for human review and let reviewers prioritize by value.",
      B: "Use asynchronous human-in-the-loop: extract and write results with a 'pending_review' status for high-value documents; downstream systems check status before consuming data; humans review the pending queue during their working hours.",
      C: "Reduce extraction volume by pre-filtering documents below $50,000.",
      D: "Use a separate, more capable model for high-value documents to eliminate the need for human review."
    },
    correct: "B",
    explanation: "Asynchronous human-in-the-loop: extract immediately (don't block the pipeline), mark high-value extractions as 'pending_review', downstream consumption checks status before using data. Humans review the pending queue at their own pace. This eliminates the pipeline bottleneck while maintaining the compliance requirement."
  },
  {
    id: 135, domain: 5, task: "5.6", scenario: "Multi-Agent Research",
    stem: "The web search subagent finds a single blog post claiming 'AI will replace 90% of white-collar jobs by 2026.' The synthesis agent includes this as a finding. What should the synthesis agent do instead?",
    options: {
      A: "Include it as is — the subagent found it, so it should be reported.",
      B: "Discard it — blog posts are not credible sources.",
      C: "Include it with source attribution and confidence classification, noting it is a single non-peer-reviewed opinion, and seek corroborating or contradicting academic sources before treating it as a key finding.",
      D: "Rephrase it as a hedged statement: 'Some analysts suggest AI may replace white-collar jobs.'"
    },
    correct: "C",
    explanation: "Source credibility affects confidence classification. A single blog post is low credibility; the synthesis agent should: (1) include it with source attribution, (2) classify it as low-confidence/single-source opinion, (3) flag that peer-reviewed or multi-source corroboration is needed before treating it as a key finding. Discarding (B) loses a finding that might be worth investigating."
  },
];


const DOMAIN_NAMES = {
  1: "Agentic Architecture & Orchestration",
  2: "Tool Design & MCP Integration",
  3: "Claude Code Configuration & Workflows",
  4: "Prompt Engineering & Structured Output",
  5: "Context Management & Reliability"
};

const DOMAIN_COLORS = {
  1: "#f97316", 2: "#06b6d4", 3: "#8b5cf6", 4: "#10b981", 5: "#f59e0b"
};

export default function App() {
  const [mode, setMode] = useState("home"); // home | quiz | review | summary
  const [filter, setFilter] = useState({ domain: 0, scenario: "All" });
  const [queue, setQueue] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [answers, setAnswers] = useState({});
  const [showFilter, setShowFilter] = useState(false);

  const scenarios = ["All", ...Array.from(new Set(ALL_QUESTIONS.map(q => q.scenario)))];
  const domains = [0, 1, 2, 3, 4, 5];

  const filteredQuestions = ALL_QUESTIONS.filter(q => {
    const dOk = filter.domain === 0 || q.domain === filter.domain;
    const sOk = filter.scenario === "All" || q.scenario === filter.scenario;
    return dOk && sOk;
  });

  const startQuiz = (shuffled = false) => {
    let qs = [...filteredQuestions];
    if (shuffled) qs = qs.sort(() => Math.random() - 0.5);
    setQueue(qs);
    setCurrentIdx(0);
    setSelected(null);
    setShowExp(false);
    setAnswers({});
    setMode("quiz");
  };

  const handleAnswer = (letter) => {
    if (selected) return;
    setSelected(letter);
    setShowExp(true);
    setAnswers(prev => ({ ...prev, [queue[currentIdx].id]: { selected: letter, correct: queue[currentIdx].correct } }));
  };

  const next = () => {
    if (currentIdx < queue.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelected(null);
      setShowExp(false);
    } else {
      setMode("summary");
    }
  };

  const prev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(i => i - 1);
      const q = queue[currentIdx - 1];
      const saved = answers[q.id];
      setSelected(saved?.selected || null);
      setShowExp(!!saved);
    }
  };

  const correctCount = Object.values(answers).filter(a => a.selected === a.correct).length;
  const totalAnswered = Object.keys(answers).length;
  const pct = totalAnswered > 0 ? Math.round(correctCount / totalAnswered * 100) : 0;

  const domainStats = [1,2,3,4,5].map(d => {
    const domainAnswers = Object.entries(answers).filter(([id]) => {
      const q = ALL_QUESTIONS.find(q => q.id === parseInt(id));
      return q && q.domain === d;
    });
    const correct = domainAnswers.filter(([, a]) => a.selected === a.correct).length;
    return { domain: d, correct, total: domainAnswers.length };
  });

  const q = queue[currentIdx];
  const progress = queue.length > 0 ? ((currentIdx + 1) / queue.length) * 100 : 0;

  if (mode === "home") return (
    <div style={{ minHeight: "100vh", background: "#080f1e", fontFamily: "'IBM Plex Mono', monospace", color: "#e2e8f0", padding: "40px 24px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Manrope:wght@400;600;700;800&display=swap'); * { box-sizing: border-box; } .btn-primary { background: #f97316; color: #fff; border: none; padding: 12px 28px; border-radius: 8px; font-family: inherit; font-size: 0.88rem; font-weight: 600; cursor: pointer; transition: background 0.2s; } .btn-primary:hover { background: #ea6c0a; } .btn-outline { background: transparent; color: #94a3b8; border: 1px solid #334155; padding: 12px 28px; border-radius: 8px; font-family: inherit; font-size: 0.88rem; cursor: pointer; transition: all 0.2s; } .btn-outline:hover { border-color: #64748b; color: #e2e8f0; } .filter-btn { background: transparent; border: 1px solid #1e293b; border-radius: 6px; padding: 6px 12px; font-family: inherit; font-size: 0.75rem; cursor: pointer; transition: all 0.15s; } .filter-btn.active { border-color: #f97316; color: #f97316; background: rgba(249,115,22,0.08); } .filter-btn:not(.active) { color: #64748b; } .filter-btn:hover:not(.active) { border-color: #475569; color: #94a3b8; }`}</style>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-block", background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 8, padding: "6px 16px", fontSize: "0.72rem", color: "#f97316", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Claude Certified Architect · Foundations</div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "2.4rem", color: "#f8fafc", margin: "0 0 12px 0", letterSpacing: "-0.03em" }}>Complete Question Bank</h1>
          <p style={{ color: "#64748b", fontSize: "0.9rem", margin: "0 0 8px 0" }}>{ALL_QUESTIONS.length} non-repeating questions · All 5 domains · All 6 scenarios · All 25+ task statements</p>
          <p style={{ color: "#475569", fontSize: "0.78rem", margin: 0 }}>Minimum passing score: 720/1000 scaled · 4 scenarios per exam (random from 6)</p>
        </div>

        {/* Domain coverage */}
        <div style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>Coverage by Domain</h2>
            <span style={{ fontSize: "0.72rem", color: "#475569" }}>{ALL_QUESTIONS.length} total questions</span>
          </div>
          {[1,2,3,4,5].map(d => {
            const count = ALL_QUESTIONS.filter(q => q.domain === d).length;
            return (
              <div key={d} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>Domain {d}: {DOMAIN_NAMES[d]}</span>
                  <span style={{ fontSize: "0.78rem", color: DOMAIN_COLORS[d], fontWeight: 600 }}>{count}q</span>
                </div>
                <div style={{ height: 5, background: "#1e293b", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${(count / ALL_QUESTIONS.length) * 100}%`, background: DOMAIN_COLORS[d], borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 16px 0" }}>Filter Questions</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: "0.72rem", color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Domain</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {domains.map(d => (
                <button key={d} className={`filter-btn ${filter.domain === d ? "active" : ""}`} onClick={() => setFilter(f => ({ ...f, domain: d }))}>
                  {d === 0 ? "All Domains" : `D${d}: ${DOMAIN_NAMES[d].split(" ")[0]}`}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.72rem", color: "#475569", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>Scenario</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {scenarios.map(s => (
                <button key={s} className={`filter-btn ${filter.scenario === s ? "active" : ""}`} onClick={() => setFilter(f => ({ ...f, scenario: s }))}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", background: "#131d2e", borderRadius: 8, fontSize: "0.78rem", color: "#64748b" }}>
            <span style={{ color: "#f97316", fontWeight: 600 }}>{filteredQuestions.length}</span> questions match your filters
          </div>
        </div>

        {/* Start buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="btn-primary" onClick={() => startQuiz(false)}>Start in Order ({filteredQuestions.length} questions)</button>
          <button className="btn-outline" onClick={() => startQuiz(true)}>🎲 Shuffle & Start</button>
        </div>
      </div>
    </div>
  );

  if (mode === "quiz" && q) return (
    <div style={{ minHeight: "100vh", background: "#080f1e", fontFamily: "'IBM Plex Mono', monospace", color: "#e2e8f0" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Manrope:wght@400;600;700;800&display=swap'); * { box-sizing: border-box; } .ans-btn { width: 100%; text-align: left; background: #0d1526; border: 1px solid #1e293b; border-radius: 10px; padding: 16px 20px; font-family: inherit; font-size: 0.82rem; color: #cbd5e1; line-height: 1.6; cursor: pointer; transition: all 0.15s; margin-bottom: 10px; } .ans-btn:hover:not(:disabled) { border-color: #475569; } .ans-btn.correct { border-color: #10b981 !important; background: rgba(16,185,129,0.12) !important; color: #d1fae5 !important; } .ans-btn.wrong { border-color: #ef4444 !important; background: rgba(239,68,68,0.08) !important; } .ans-btn.reveal { border-color: #10b981 !important; background: rgba(16,185,129,0.05) !important; } .nav-btn { background: #1e293b; border: 1px solid #334155; color: #94a3b8; padding: 10px 20px; border-radius: 8px; font-family: inherit; font-size: 0.8rem; cursor: pointer; transition: all 0.15s; } .nav-btn:hover { border-color: #64748b; color: #e2e8f0; } .nav-btn:disabled { opacity: 0.35; cursor: not-allowed; } .next-btn { background: #f97316; border: none; color: #fff; padding: 10px 24px; border-radius: 8px; font-family: inherit; font-size: 0.8rem; cursor: pointer; font-weight: 600; } .next-btn:hover { background: #ea6c0a; }`}</style>

      {/* Top bar */}
      <div style={{ background: "#0a1220", borderBottom: "1px solid #1e293b", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => setMode("home")} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", fontFamily: "inherit", fontSize: "0.78rem" }}>← Back</button>
          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
            <span style={{ color: "#f97316", fontWeight: 600 }}>{currentIdx + 1}</span> / {queue.length}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#475569" }}>Domain {q.domain} · Task {q.task}</div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {totalAnswered > 0 && (
            <div style={{ fontSize: "0.78rem", color: pct >= 72 ? "#10b981" : "#f59e0b" }}>{correctCount}/{totalAnswered} ({pct}%)</div>
          )}
          <button onClick={() => setMode("summary")} style={{ background: "none", border: "1px solid #334155", color: "#64748b", padding: "6px 12px", borderRadius: 6, fontFamily: "inherit", fontSize: "0.72rem", cursor: "pointer" }}>Results</button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 3, background: "#1e293b" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${DOMAIN_COLORS[q.domain]}, #f97316)`, transition: "width 0.3s" }} />
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}>
        {/* Question meta */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{ background: `${DOMAIN_COLORS[q.domain]}18`, border: `1px solid ${DOMAIN_COLORS[q.domain]}44`, color: DOMAIN_COLORS[q.domain], padding: "4px 10px", borderRadius: 6, fontSize: "0.7rem" }}>Domain {q.domain}: {DOMAIN_NAMES[q.domain]}</span>
          <span style={{ background: "#1e293b", color: "#64748b", padding: "4px 10px", borderRadius: 6, fontSize: "0.7rem" }}>{q.scenario}</span>
          <span style={{ background: "#1e293b", color: "#475569", padding: "4px 10px", borderRadius: 6, fontSize: "0.7rem" }}>Task {q.task}</span>
        </div>

        {/* Question */}
        <div style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, padding: 28, marginBottom: 20 }}>
          <div style={{ fontSize: "0.7rem", color: "#475569", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Question {currentIdx + 1}</div>
          <p style={{ fontSize: "0.95rem", color: "#f1f5f9", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>{q.stem}</p>
        </div>

        {/* Answers */}
        <div>
          {Object.entries(q.options).map(([letter, text]) => {
            const isCorrect = letter === q.correct;
            const isSelected = letter === selected;
            let cls = "ans-btn";
            if (selected) {
              if (isCorrect) cls += " correct";
              else if (isSelected) cls += " wrong";
            }
            return (
              <button key={letter} className={cls} disabled={!!selected} onClick={() => handleAnswer(letter)}>
                <span style={{ color: selected ? (isCorrect ? "#10b981" : isSelected ? "#ef4444" : "#334155") : "#f97316", fontWeight: 700, marginRight: 12, fontSize: "0.9rem" }}>{letter}</span>
                {text}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExp && (
          <div style={{ background: selected === q.correct ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)", border: `1px solid ${selected === q.correct ? "#10b981" : "#ef4444"}`, borderRadius: 12, padding: 20, marginTop: 4, marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: selected === q.correct ? "#10b981" : "#ef4444", marginBottom: 10 }}>
              {selected === q.correct ? "✅ Correct!" : `❌ Incorrect — Answer: ${q.correct}`}
            </div>
            <p style={{ fontSize: "0.82rem", color: "#94a3b8", lineHeight: 1.8, margin: 0 }}>{q.explanation}</p>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8 }}>
          <button className="nav-btn" disabled={currentIdx === 0} onClick={prev}>← Previous</button>
          {selected ? (
            <button className="next-btn" onClick={next}>
              {currentIdx === queue.length - 1 ? "View Results →" : "Next Question →"}
            </button>
          ) : (
            <div style={{ fontSize: "0.72rem", color: "#334155" }}>Select an answer to continue</div>
          )}
        </div>
      </div>
    </div>
  );

  if (mode === "summary") return (
    <div style={{ minHeight: "100vh", background: "#080f1e", fontFamily: "'IBM Plex Mono', monospace", color: "#e2e8f0", padding: "40px 24px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=Manrope:wght@400;600;700;800&display=swap'); * { box-sizing: border-box; } .review-q { border: 1px solid #1e293b; border-radius: 8px; padding: 14px 16px; margin-bottom: 10px; cursor: pointer; transition: border-color 0.15s; } .review-q:hover { border-color: #475569; } .start-btn { background: #f97316; border: none; color: #fff; padding: 12px 28px; border-radius: 8px; font-family: inherit; font-size: 0.85rem; font-weight: 600; cursor: pointer; } .out-btn { background: transparent; border: 1px solid #334155; color: #94a3b8; padding: 12px 28px; border-radius: 8px; font-family: inherit; font-size: 0.85rem; cursor: pointer; } `}</style>

      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>{pct >= 72 ? "🏆" : pct >= 60 ? "📈" : "📚"}</div>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#f8fafc", margin: "0 0 8px 0" }}>
            {pct >= 72 ? "Exam Ready!" : pct >= 60 ? "Getting There" : "Keep Practicing"}
          </h1>
          <div style={{ fontSize: "3rem", fontWeight: 800, color: pct >= 72 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444", fontFamily: "'Manrope', sans-serif" }}>{pct}%</div>
          <div style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 4 }}>{correctCount} correct of {totalAnswered} answered (pass threshold ≈ 72%)</div>
        </div>

        {/* Domain breakdown */}
        <div style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 16px 0" }}>Performance by Domain</h2>
          {domainStats.filter(d => d.total > 0).map(d => {
            const dpct = d.total > 0 ? Math.round(d.correct / d.total * 100) : null;
            return (
              <div key={d.domain} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>D{d.domain}: {DOMAIN_NAMES[d.domain]}</span>
                  <span style={{ fontSize: "0.78rem", color: dpct >= 72 ? "#10b981" : "#ef4444", fontWeight: 600 }}>{dpct}% ({d.correct}/{d.total})</span>
                </div>
                <div style={{ height: 6, background: "#1e293b", borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${dpct}%`, background: dpct >= 72 ? "#10b981" : "#f59e0b", borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Missed questions */}
        {Object.entries(answers).filter(([, a]) => a.selected !== a.correct).length > 0 && (
          <div style={{ background: "#0d1526", border: "1px solid #1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#ef4444", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 16px 0" }}>
              ❌ Review Missed Questions ({Object.entries(answers).filter(([, a]) => a.selected !== a.correct).length})
            </h2>
            {Object.entries(answers).filter(([, a]) => a.selected !== a.correct).map(([id, ans]) => {
              const missed = ALL_QUESTIONS.find(q => q.id === parseInt(id));
              if (!missed) return null;
              return (
                <div key={id} className="review-q" style={{ background: "#0a0f1a" }} onClick={() => {
                  const idx = queue.findIndex(q => q.id === parseInt(id));
                  if (idx >= 0) { setCurrentIdx(idx); setSelected(ans.selected); setShowExp(true); setMode("quiz"); }
                }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: "0.65rem", background: `${DOMAIN_COLORS[missed.domain]}18`, color: DOMAIN_COLORS[missed.domain], padding: "2px 6px", borderRadius: 4 }}>D{missed.domain}</span>
                    <span style={{ fontSize: "0.65rem", color: "#475569" }}>{missed.scenario}</span>
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#94a3b8", lineHeight: 1.5 }}>{missed.stem.substring(0, 120)}...</div>
                  <div style={{ fontSize: "0.72rem", marginTop: 6 }}>
                    <span style={{ color: "#ef4444" }}>You: {ans.selected}</span>
                    <span style={{ color: "#475569", margin: "0 8px" }}>·</span>
                    <span style={{ color: "#10b981" }}>Correct: {ans.correct}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="start-btn" onClick={() => { setMode("home"); setAnswers({}); }}>← New Session</button>
          <button className="out-btn" onClick={() => startQuiz(true)}>🎲 Retry Shuffled</button>
        </div>
      </div>
    </div>
  );

  return null;
}
