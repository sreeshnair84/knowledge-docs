---
title: 'Claude Cert Questionnaire Vol.2'
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: converted-html
source_file: 'Questionnaire_Vol2_Claude_Certification.html'
doc_type: guide
tags: [claude, certification, exam-prep, questionnaire]
covers_version: "2026"
---

# Claude Cert Questionnaire Vol.2

## Claude Certification Questionnaire — Vol. 2

// NEW TOPICS ONLY — no repeats from Vol.1

RAG & Embeddings Tool Design Nuance Error & Graceful Degradation CI/CD Deep Dive Multimodal & Vision Sycophancy & Behavior IDE & Integrations Structured Output Edge Cases

45

MORE QUESTIONS

Click any card to reveal

REVEAL ALL HIDE ALL

0 / 45 revealed

01

## RAG, Embeddings & Knowledge Retrieval

6 QUESTIONS

Q1

Scenario: Long document QA

A chatbot must answer questions about a 500-page legal contract. The contract exceeds the context window. Which architecture is correct?

AFeed the entire document in one API call using Opus 4.6's 1M context

BChunk the document, embed chunks, retrieve relevant sections per query, inject into context (RAG)

CSummarize the entire document once and only use the summary for all queries

DSplit into 10 API calls and merge responses

▶ SHOW ANSWER

✓ Correct

B — RAG (Retrieval-Augmented Generation). For documents exceeding context, RAG is the correct pattern: chunk → embed → store in vector DB → at query time, embed query → retrieve top-k semantically similar chunks → inject only relevant chunks into context. Feeding 500 pages even to Opus 4.6 (1M context) is possible but expensive, slow, and attention degrades at extreme lengths. RAG is more cost-efficient and faster.

Q2

Scenario: RAG chunk size

A developer uses 50-word chunks for RAG on technical documentation and gets poor recall. What's the most likely problem?

AChunks are too small — they lose surrounding context needed for semantic meaning

BChunks are too large — need smaller chunks for better precision

CThe embedding model is the wrong model for technical content

DRAG doesn't work with technical documentation

▶ SHOW ANSWER

✓ Correct

A — Chunks too small, losing context. 50-word chunks often fragment concepts mid-sentence. A function description split across chunks loses meaning. Typical effective chunk sizes: 256–512 tokens with 10–20% overlap between chunks. Overlap ensures context spans chunk boundaries. Small chunks hurt recall; oversized chunks reduce precision. Tune based on document structure.

Q3

Scenario: RAG + hallucination

A RAG system retrieves the correct chunks but Claude still gives a wrong answer. What's the most likely cause?

AClaude's training data overrides the retrieved context

BThe prompt doesn't instruct Claude to ground its answer in the retrieved context only

CRAG retrieval latency caused a timeout

DThe embedding model and generation model must be from the same provider

▶ SHOW ANSWER

✓ Correct

B — Prompt doesn't enforce grounding. Always include explicit grounding instructions: "Answer ONLY using the provided context. If the answer is not in the context, say 'I don't know based on available information.' Do not use prior knowledge." Without this, Claude blends retrieved content with training data — producing plausible but potentially wrong answers. The prompt must be explicit about the knowledge boundary.

Q4

Scenario: Hybrid search

A product search system uses only vector similarity for retrieval. Users complain that exact product SKUs ("X7-2049") return wrong results. What's the fix?

AUse a larger embedding model

BImplement hybrid search: combine vector similarity with keyword/BM25 search

CLower the similarity threshold to retrieve more results

DPre-process all queries through Claude before embedding

▶ SHOW ANSWER

✓ Correct

B — Hybrid search (vector + BM25). Vector similarity excels at semantic matching but fails at exact token matching (IDs, codes, SKUs). BM25/keyword search excels at exact matches but misses semantic meaning. Hybrid search combines both: rank fusion (RRF or weighted) of vector scores + keyword scores. Industry standard for production RAG. Especially important for product catalogs, code search, and ID-heavy domains.

Q5

Scenario: Context window vs RAG

An architect argues: "With Opus 4.6's 1M context, we don't need RAG anymore — just put everything in context." When does this argument break down?

ANever — 1M context eliminates the need for RAG in all cases

BWhen the knowledge base exceeds 1M tokens, updates frequently, or cost/latency of full-context is prohibitive

COnly when using Haiku — Opus handles 1M context efficiently

DOnly for real-time data — static documents are fine at full context

▶ SHOW ANSWER

✓ Correct

B — Knowledge exceeds 1M, updates frequently, or cost/latency is prohibitive. 1M context breaks down when: (1) knowledge base is multi-million tokens (legal corpora, codebases), (2) content updates daily — re-sending all context is wasteful, (3) cost — billing is per input token, 1M tokens = expensive per query, (4) latency — processing 1M tokens takes time even at inference speed. RAG + smaller context is often more practical at scale.

Q6

Scenario: MCP Resources for RAG

A developer is deciding whether to implement document retrieval as an MCP Tool or an MCP Resource. Which is correct?

AMCP Tool — it requires execution and computation

BMCP Resource for static reference docs; MCP Tool for search that takes query parameters and returns results

CMCP Resource always — retrieval has no side effects

DDoesn't matter — Tool and Resource are interchangeable

▶ SHOW ANSWER

✓ Correct

B — Resource for static docs; Tool for parameterized search. MCP Resources are read-only, no side effects — use for: product_catalog, api_docs, feature_flags. MCP Tools are executable functions WITH parameters — use for: search_documents(query, top_k), get_document(id). A search function that accepts query parameters is a Tool, not a Resource, because it takes dynamic input and executes computation.

02

## Tool Design Nuances & MCP Patterns

5 QUESTIONS

Q7

Scenario: Tool description length

A developer writes a 3-word tool description: "Analyzes user data." Claude rarely uses it correctly. What's the root cause?

AThe description needs to be under 50 characters for Claude to parse it

BThe description lacks: what it does, input formats, when to use it, what it does NOT do, and example queries

CTool descriptions don't affect Claude's routing decisions

DClaude always uses all available tools regardless of description quality

▶ SHOW ANSWER

✓ Correct

B — Description missing all five essential components. Tool descriptions are the PRIMARY mechanism for Claude's tool selection. A good description includes: (1) Purpose — what it does specifically, (2) Input format — expected parameters and types, (3) Example queries that should trigger it, (4) Explicit scope — what it does NOT handle, (5) Edge cases and boundaries. "Analyzes user data" gives Claude nothing to distinguish this from 10 other tools.

Q8

Scenario: Overlapping tools

Two tools exist: analyze_sentiment(text) and analyze_emotion(text). Descriptions are nearly identical. Claude randomly picks one. What's the fix?

AMerge them into one tool with a mode parameter

BDifferentiate descriptions clearly: sentiment = positive/negative/neutral scale; emotion = joy/anger/fear/surprise taxonomy

CRemove one of the tools

DUse system prompt to tell Claude which one to prefer

▶ SHOW ANSWER

✓ Correct

B — Clearly differentiate descriptions with explicit boundaries. Near-identical descriptions cause misrouting. The fix: make descriptions explicitly different in scope, output format, and use case. Sentiment: "Returns a score from -1 to +1 representing positive/negative polarity. Use for: customer satisfaction, review analysis. Does NOT categorize emotional type." Emotion: "Returns one of [joy, anger, fear, surprise, disgust, sadness]. Use for: content moderation, UX personalization."

Q9

Scenario: Tool vs system prompt keywords

A system prompt says "Always use the sales_lookup tool for any product questions." A new tool get_product_info is added. Claude ignores sales_lookup. What happened?

ASystem prompt keywords always override tool descriptions — this is a bug

Bget_product_info's description may create an association that outweighs the system prompt's probabilistic instruction

CTools always override system prompt routing instructions

DClaude cannot read system prompts when tools are present

▶ SHOW ANSWER

✓ Correct

B — Tool description can outweigh probabilistic system prompt instruction. System prompt routing instructions are probabilistic guidance. A new tool with a description like "Get information about any product by ID or name" may be semantically closer to the query than sales_lookup's description. Fix: use a PreToolUse hook (deterministic) to enforce the correct tool choice, OR update get_product_info's description to explicitly state "NOT for sales or pricing queries — use sales_lookup instead."

Q10

Scenario: Tool result size

A tool returns a full 10MB database dump every time it's called. Claude's context fills up after 2-3 tool calls. What's the correct design fix?

AIncrease max_tokens to handle larger contexts

BUse PostToolUse hook or tool-level filtering to return only fields relevant to the current query

CUse Opus 4.6 with 1M context to absorb the large results

DLimit the agent to 1 tool call per session

▶ SHOW ANSWER

✓ Correct

B — Filter at tool level or PostToolUse hook. Tool results should return minimum necessary information. Design: (1) Tool accepts filter params — "return only fields: [id, status, amount]", (2) PostToolUse hook intercepts and trims results before Claude sees them, (3) Tool returns summary + offer to retrieve specific fields. Dumping 10MB into context on every call is a fundamental anti-pattern — context is precious and billing is per-token.

Q11

Scenario: MCP community vs custom server

A team needs Claude to interact with their proprietary internal CRM and also with GitHub. What server strategy is correct?

ABuild custom MCP servers for both — never trust community servers

BUse community MCP server for GitHub; build custom for proprietary CRM

CUse community MCP server for both — building custom servers is too slow

DMCP is only for Anthropic-approved integrations

▶ SHOW ANSWER

✓ Correct

B — Community for GitHub; custom for proprietary CRM. Community MCP servers exist for: GitHub, Jira, Slack, Google Drive, Salesforce, Linear, and many more. Use them. For proprietary internal systems (custom CRM, internal databases, company-specific APIs), build a custom MCP server. This is the right division: don't reinvent what exists; do build what's unique to your organization.

03

## Error Handling & Graceful Degradation

5 QUESTIONS

Q12

Scenario: max_tokens hit

A Claude API response returns stop_reason: "max_tokens" mid-sentence. What's the correct production handling?

ATreat as end_turn — the response is complete enough

BDetect max_tokens, append the partial response to history, and continue with a follow-up message requesting completion

CRetry the exact same request with a higher temperature

DAlert user that generation failed and ask them to rephrase

▶ SHOW ANSWER

✓ Correct

B — Detect max_tokens, append partial, continue. When stop_reason is "max_tokens": (1) the response is incomplete, (2) append the partial response to conversation history as an assistant turn, (3) send a continuation message: "Please continue." Claude will resume from where it stopped. This is the standard pattern for long-form generation. Also: increase max_tokens in your request if you control it.

Q13

Scenario: Tool call failure

An MCP tool times out during an agentic loop. What should the agent do?

ATerminate the entire agent session immediately

BReturn a tool_result with is_error: true and a description; let Claude decide how to proceed

CRetry the tool call 10 times before giving up

DSkip the tool result and continue the loop as if the tool succeeded

▶ SHOW ANSWER

✓ Correct

B — Return tool_result with is_error: true. The correct API pattern: return the tool_result block with is_error: true and content explaining the error. Claude then reasons about it: retry, use an alternative tool, ask user for clarification, or gracefully degrade. Never skip the tool result — Claude expects a result for every tool_use block. Never terminate on first failure — build resilient loops.

Q14

Scenario: Graceful degradation

A customer support agent's order lookup tool fails. What's graceful degradation in this context?

ATell the customer the system is down and end the conversation

BAcknowledge the lookup failure, offer what help is possible without order data, and provide escalation path

CHallucinate order details to keep the conversation moving

DRetry the lookup 5 times silently before responding

▶ SHOW ANSWER

✓ Correct

B — Acknowledge, provide partial help, offer escalation. Graceful degradation: tell the user honestly that order lookup is temporarily unavailable, offer what assistance IS possible (general policies, return procedures, alternative contact), and provide a human escalation path. Never hallucinate data. Never silently fail. The design principle: degrade to the next-best level of service, not to zero.

Q15

Scenario: Iteration cap

An agentic loop has a hard cap of 20 iterations as a safety measure. The agent reaches 20 iterations on a legitimate complex task. What should happen?

ASilently stop — the cap represents task completion

BSurface to human with current state, progress summary, and option to extend or redirect

CAutomatically increase the cap to 40 and continue

DRetry from iteration 1 with a fresh context

▶ SHOW ANSWER

✓ Correct

B — Surface to human with state and options. Iteration caps are safety fallbacks, not primary termination mechanisms. When hit: (1) summarize progress so far, (2) describe what remains, (3) ask human to decide: extend, redirect, or abandon. This is the human-in-the-loop pattern for long-running agents. The cap prevents infinite loops; hitting it legitimately means the task is complex — escalate, don't silently abort.

Q16

Scenario: Confidence thresholds

When should a Claude-based agent escalate to a human vs proceed autonomously? What's the correct deterministic trigger?

AWhen the user uses words like "urgent" or "critical"

BWhen Claude says "I'm not sure" in its response text

CPredefined deterministic criteria: confidence threshold, issue category, policy boundary, dollar amount

DAlways escalate — human-in-the-loop on every action

▶ SHOW ANSWER

✓ Correct

C — Predefined deterministic criteria. Escalation triggers must be deterministic, not parsing Claude's text: (1) Confidence score below threshold (if system provides one), (2) Issue category in [fraud, legal, health, safety], (3) Transaction amount > $X, (4) Policy boundary reached (no clear resolution path), (5) N failed attempts at resolution. "I'm not sure" in text is probabilistic — Claude might still be correct, or might say it when confident.

04

## CI/CD, Code Review & Developer Workflows

6 QUESTIONS

Q17

Scenario: PR review false positives

Your CI/CD Claude reviewer flags 40% of valid code as issues. Developers start ignoring all feedback. What prompt engineering fix addresses this?

ASwitch to a more powerful model

BAdd explicit criteria: severity levels, scope boundaries, what counts as an issue vs style preference, and a minimum confidence threshold

CReduce the number of files reviewed per PR

DAdd "be strict" to the system prompt

▶ SHOW ANSWER

✓ Correct

B — Explicit severity levels, scope boundaries, confidence threshold. To minimize false positives: (1) Define severity: critical (security/crash), high (performance/correctness), medium (maintainability), low (style). (2) Scope: "Only flag issues in changed lines, not pre-existing issues." (3) Threshold: "Only report if >80% confidence." (4) Exclusions: "Do not flag style preferences if project has a linter." The JSON output schema should include confidence field.

Q18

Scenario: CI output schema

Your CI/CD pipeline needs to parse Claude's code review to post inline GitHub PR comments. Which output design enables this?

AFree-form prose — easier for Claude to generate

BJSON array: [{file, line, severity, issue, suggestion, confidence}] with "Return ONLY the JSON array"

CMarkdown with #### headers per file

DPython dict format for easy parsing

▶ SHOW ANSWER

✓ Correct

B — JSON array with file, line, severity, issue, suggestion, confidence. Structured JSON is machine-parseable for GitHub API inline comment posting. The file+line fields map directly to GitHub's pull_request_review_comments API. "Return ONLY the JSON array. No preamble. If no issues found, return []." This schema is the canonical CI/CD review pattern from the exam scenarios.

Q19

Scenario: Test generation TDD

A developer wants Claude Code to follow TDD (Test-Driven Development). What's the correct ADLC sequence?

AImplement → Test → Refactor

BWrite failing test → implement until test passes → verify → refactor

CPlan → Implement → Test → Deploy

DGenerate all tests first for the whole codebase, then implement

▶ SHOW ANSWER

✓ Correct

B — Failing test → implement → verify → refactor. Claude Code TDD workflow: (1) Generate a failing test (describe desired behavior), (2) Run test — confirm it fails for the right reason, (3) Implement the minimum code to pass, (4) Run test — confirm green, (5) Refactor with tests passing as safety net. This "red-green-refactor" loop is the ADLC TEST phase. Claude Code can run this automatically via Bash tool for test execution.

Q20

Scenario: Claude Code in GitHub Actions

A team sets up Claude Code in GitHub Actions for automated PR review. Which flags are essential for non-interactive CI use?

A\--verbose and --max-turns 1

B-p (print mode), --dangerously-skip-permissions, and --output-format json

C\--system-prompt and --model haiku

D\--add-dir and --append-system-prompt

▶ SHOW ANSWER

✓ Correct

B — -p, --dangerously-skip-permissions, --output-format json. For CI/CD: (1) -p (print/non-interactive mode) — no REPL, outputs to stdout and exits, (2) --dangerously-skip-permissions — no user prompts (CI has no human), (3) --output-format json — machine parseable for downstream pipeline steps. Also common: --allowedTools "Read Grep Glob Bash(git:*)" to restrict scope in automated contexts.

Q21

Scenario: Plan mode in deployment

Why is Plan Mode specifically recommended for database migrations in the ADLC DEPLOY phase?

ADatabase migrations run faster in Plan Mode

BPlan Mode requires human review before executing irreversible operations — DB migrations can't be easily undone

CPlan Mode auto-generates rollback scripts

DPlan Mode is only useful for deployment, not code changes

▶ SHOW ANSWER

✓ Correct

B — Plan Mode enforces human review before irreversible operations. Database migrations are irreversible in many cases — dropping columns, changing types, adding NOT NULL constraints. Plan Mode: Claude proposes the migration, human reviews the plan, approves or modifies, THEN execution. This prevents automated destruction of production data. The CLAUDE.md safety rule: "Always use plan mode for DB migrations."

Q22

Scenario: CLAUDE.md safety rules

What MUST be included in CLAUDE.md's safety rules section according to best practices?

AClaude's personality preferences and communication style

BForbidden commands (no force push to main), required conditions (always test before commit), and plan mode triggers (DB migrations, prod deployments)

CAPI keys and environment-specific credentials

DThe full git history of the project

▶ SHOW ANSWER

✓ Correct

B — Forbidden commands, required conditions, plan mode triggers. NEVER secrets. CLAUDE.md safety rules: (1) Forbidden: "Never git push --force to main", "Never drop tables without explicit confirmation", (2) Required: "Always run tests before commit", "Always lint before PR", (3) Plan mode triggers: "Use plan mode for DB migrations, production deployments, file deletions". NEVER put API keys, passwords, or secrets in CLAUDE.md — it's committed to git.

05

## Multimodal, Vision & Document Understanding

5 QUESTIONS

Q23

Scenario: Screenshot analysis

A developer sends a screenshot of a bug in their UI. What does Claude in Chrome do that Claude.ai's image upload cannot?

ANothing different — both analyze screenshots identically

BChrome can directly read the live DOM, console errors, and network requests — not just the visual screenshot

CChrome uses a higher-resolution capture than manual screenshot upload

DChrome can modify the screenshot before analysis

▶ SHOW ANSWER

✓ Correct

B — Chrome reads live DOM, console errors, network requests. Claude in Chrome is a browser agent, not just a screenshot tool. It can: read the DOM structure, access JavaScript console logs, inspect network requests, read element attributes — context that's invisible in a screenshot. This makes it dramatically more useful for debugging than static image analysis in Claude.ai.

Q24

Scenario: PDF vs image input

A developer needs Claude to extract a table from a scanned PDF (image-based, not text-based). Which input type is correct?

ASend as type: "document" with media_type: "application/pdf"

BExtract text with OCR first, then send as plain text

CBoth A and B work; A is simpler for scanned PDFs

DClaude cannot extract tables from scanned PDFs

▶ SHOW ANSWER

✓ Correct

C — Both work; type: document is simpler for scanned PDFs. The Anthropic API supports PDFs directly via { type: "document", source: { type: "base64", media_type: "application/pdf", data: "..." } }. Claude's vision capabilities handle scanned PDF content including tables, charts, and diagrams. Pre-OCR (option B) also works but adds preprocessing complexity. Use document type for simplicity; it preserves page structure better than converting to image.

Q25

Scenario: Claude in Excel — Moody's data

An analyst uses Claude in Excel and wants to pull live Moody's credit ratings directly into their spreadsheet. What's required?

AThis is not possible — Claude in Excel is read-only for external data

BEnable Moody's live data connector within Claude in Excel — available on Team/Enterprise plans

CExport data from Moody's site and upload manually

DUse a separate MCP server that fetches from Moody's API

▶ SHOW ANSWER

✓ Correct

B — Moody's live data connector within Claude in Excel. Claude in Excel supports live data integrations including Moody's (credit ratings, financial data) and LSEG (market data). These are available within the Excel add-in. Plans required: Pro/Max/Team/Enterprise. This differentiates Claude in Excel from a simple AI chat — it's a financial data workbench with native market data feeds.

Q26

Scenario: PowerPoint design context

A user asks Claude in PowerPoint to create a new slide. What design context does Claude automatically have access to?

ANone — Claude generates generic slides without design context

BThe slide master, layouts, fonts, colors, and existing slide content — enabling on-brand generation

COnly the text content of existing slides, not design elements

DOnly the most recently edited slide

▶ SHOW ANSWER

✓ Correct

B — Slide master, layouts, fonts, colors, existing content. Claude in PowerPoint reads the entire presentation context: slide master (corporate template), layouts, fonts, colors, and existing slides. This enables generation of new slides that match the brand's design system automatically — no manual styling needed. Charts are generated as native editable PowerPoint charts, not images. Context passes between Excel and PowerPoint without restarting.

Q27

Scenario: Claude vision limitations

A user uploads a handwritten medical prescription scan and asks Claude to transcribe it. What limitation applies?

AClaude cannot process handwritten content at all

BClaude can attempt transcription but may have errors on ambiguous handwriting — always verify medical content with a professional

CMedical content is blocked by Claude's safety filters

DClaude transcribes handwriting with 100% accuracy

▶ SHOW ANSWER

✓ Correct

B — Can attempt but may have errors; always verify medical content. Claude's vision can transcribe handwriting but accuracy depends on legibility. For medical prescriptions: drug names, dosages, and instructions can be critical if misread. Claude should caveat: "This is my best interpretation — please verify with the prescribing physician before use." This is both a technical limitation (handwriting OCR accuracy) and a safety/medical guidance principle.

06

## Sycophancy, Behavior & Prompt Sensitivity

6 QUESTIONS

Q28

Scenario: User pushback

Claude gives a correct answer. The user says "No, you're wrong." Claude immediately reverses its answer without new evidence. What behavior is this?

AAppropriate — Claude should always defer to users

BSycophancy — reversing position based on social pressure rather than new evidence

CCorrect behavior — the user knows their domain better

DModel uncertainty — Claude recalibrating on new information

▶ SHOW ANSWER

✓ Correct

B — Sycophancy. Sycophancy is when Claude changes its position based on user emotional state or pushback, not on new evidence or arguments. The correct behavior: acknowledge the disagreement, explain the reasoning, hold the position if confident, and offer to reconsider if the user provides new evidence. Position changes should be driven by logic and facts, not social pressure.

Q29

Scenario: Temperature for structured output

A production system extracts structured financial data from documents. Temperature should be set to:

A0.9 — higher temperature catches more edge cases

B0 or near-0 — deterministic, consistent extraction for repeatable results

C1.0 — maximum creativity for better field interpretation

DTemperature doesn't affect structured extraction tasks

▶ SHOW ANSWER

✓ Correct

B — Temperature 0 or near-0 for structured extraction. Temperature controls randomness in token selection. For structured data extraction: temperature=0 gives the same output for the same input consistently — critical for auditable financial systems. High temperature = more variation = unpredictable field extraction. Use high temperature for creative tasks (writing, brainstorming); use low for extraction, classification, and code generation.

Q30

Scenario: Prompt sensitivity

Changing "Extract the data" to "Carefully extract only the explicitly stated data" dramatically improves accuracy. What does this demonstrate?

AClaude is poorly engineered and needs better training

BClaude is highly prompt-sensitive — small wording changes in instructions significantly affect outputs

CThe model was updated between the two tests

DTemperature was different between runs

▶ SHOW ANSWER

✓ Correct

B — Prompt sensitivity is a fundamental LLM characteristic. LLMs including Claude are highly sensitive to prompt phrasing. "Carefully extract only explicitly stated data" adds: (1) attention signal ("carefully"), (2) scope boundary ("only"), (3) accuracy constraint ("explicitly stated — don't infer"). Prompt engineering is a critical skill precisely because of this sensitivity. Always test prompt variations systematically in production.

Q31

Scenario: Operator vs user conflict

Operator system prompt says "Always recommend our premium plan." A user asks "Which plan is cheapest for my use case?" How should Claude respond?

AAlways recommend premium plan as instructed — operator takes precedence

BIgnore operator instruction — user needs come first

CFollow operator instruction but don't actively mislead user — tell them to consult website for plan comparisons

DRefuse to answer plan questions

▶ SHOW ANSWER

✓ Correct

C — Follow operator instruction without actively deceiving the user. Operators can restrict Claude's behavior (promote certain products), but cannot instruct Claude to actively deceive users against their interests. Claude can follow "recommend premium plan" but cannot lie about pricing or hide clearly better options when directly asked. The boundary: operators restrict/shape behavior; they can't weaponize Claude against users. Telling the user to check the website for comparisons respects both constraints.

Q32

Scenario: Few-shot example bias

All 5 few-shot examples in a classification prompt show positive sentiment. The model starts classifying ambiguous cases as positive. What's wrong?

A5 examples is too many — use 1-2

BExamples are biased toward positive class — include examples from all classes including edge cases

CFew-shot examples don't influence Claude's classification

DThe issue is with temperature, not examples

▶ SHOW ANSWER

✓ Correct

B — Biased examples create biased outputs; include all classes and edge cases. Few-shot examples teach both pattern and distribution. All-positive examples implicitly tell Claude "outputs in this context tend to be positive." Fix: balanced examples across all classes (positive, negative, neutral), plus edge cases (sarcasm, mixed sentiment, ambiguous). Include the hard cases, not just the easy happy path.

Q33

Scenario: System vs append-system-prompt

A developer uses --system-prompt in Claude Code CLI to add compliance instructions. Their session loses file reading capabilities. Why?

A\--system-prompt is incompatible with file operations

B\--system-prompt replaces the entire default system prompt, removing built-in capabilities

CCompliance instructions conflict with file reading permissions

DThe --system-prompt flag requires --allowedTools to be set

▶ SHOW ANSWER

✓ Correct

B — --system-prompt replaces the ENTIRE default system prompt. This is a critical CLI distinction: --system-prompt replaces all defaults, removing Claude Code's built-in tool use instructions, safety guidelines, and capabilities. --append-system-prompt ADDS to the defaults, preserving all built-in behavior. Best practice: always use --append-system-prompt to add custom instructions. Only use --system-prompt if you want full control and know exactly what you're replacing.

07

## IDE Integrations, Remote Sessions & Cowork

6 QUESTIONS

Q34

Scenario: VS Code extension

A developer has Claude Code CLI and also the VS Code extension. What does the VS Code extension add over the CLI?

AThe VS Code extension replaces the CLI entirely — use one or the other

BVS Code extension adds inline diff viewing, editor context sharing, and inline code suggestions within the IDE

CVS Code extension only supports JavaScript and TypeScript

DThey are identical — VS Code extension is just a GUI wrapper

▶ SHOW ANSWER

✓ Correct

B — IDE-integrated features: inline diffs, editor context, inline suggestions. Claude Code is available as VS Code extension and JetBrains plugin (in addition to CLI and Desktop app). IDE extensions add: (1) inline diff views for changes, (2) editor context — Claude sees your cursor position, selected code, and open files without manual @file references, (3) inline code suggestions in editor, (4) /ide command syncs with IDE state. CLI and extension complement each other.

Q35

Scenario: Remote vs Local session

A developer starts a large refactor in Remote mode and closes their laptop. What happens to the session?

ASession terminates immediately when the app closes

BSession continues running on Anthropic's cloud; developer reconnects when ready to see results

CSession pauses and resumes when the laptop reopens

DSession saves state locally and auto-resumes

▶ SHOW ANSWER

✓ Correct

B — Remote session continues on Anthropic's cloud after app closes. Remote sessions run on Anthropic infrastructure. The developer can close the laptop, go to lunch, and reconnect — the session will have completed work or be in progress. Local sessions run on the developer's machine and terminate when closed. Remote sessions are ideal for long-running tasks (large refactors, migration runs) that outlast a working session.

Q36

Scenario: Cowork VM isolation

A user asks Cowork to process files from their Documents folder. How does Cowork access those files safely?

ACowork uploads files to Anthropic's servers for processing

BFiles are accessible through an isolated VM (Apple Virtualization Framework on Mac) that controls what Cowork can access

CCowork has full unrestricted access to all local files

DUsers must manually copy files to a Cowork-specific folder

▶ SHOW ANSWER

✓ Correct

B — Isolated VM via Apple Virtualization Framework. Cowork uses Apple Virtualization Framework (macOS) or equivalent on Windows to provide VM-level isolation for local file access. The VM acts as a sandbox — Cowork can access files the user grants but is isolated from the broader system. This is the key security architecture: local processing without uploading to cloud, with VM-level containment. Cowork stores conversation history locally, not on Anthropic's servers.

Q37

Scenario: Cowork parallel workstreams

A product manager uses Cowork to simultaneously draft a proposal, research competitors, and build a financial model. What architecture does Cowork use?

ASequential processing — Cowork handles one task at a time

BSub-agent coordination — Cowork orchestrates specialized agents for parallel workstreams

CThree separate Claude.ai chat sessions

DOne agent switches between tasks sequentially but very quickly

▶ SHOW ANSWER

✓ Correct

B — Sub-agent coordination for parallel workstreams. Cowork is built on the same architecture as Claude Code — it uses sub-agent coordination to handle multiple parallel workstreams. Each stream (writing, research, modeling) runs in its own sub-agent context, coordinated by a lead agent. Results feed into each other (research findings inform the proposal). This is why Cowork was built: non-developer parallel multi-task automation.

Q38

Scenario: SSH session

A developer wants to use Claude Code on a remote Linux server they access via SSH. What's the correct setup?

ANot possible — Claude Code only runs on local machines

BSSH into the server, install Claude Code there (npm i -g @anthropic-ai/claude-code), run claude — it uses the remote shell environment

CUse Remote mode — it automatically connects to SSH servers

DOnly available on Linux with Docker

▶ SHOW ANSWER

✓ Correct

B — Install Claude Code on the remote server, run over SSH. SSH sessions are a supported Claude Code session mode. The developer SSHs into the remote machine, runs Claude Code in the remote shell — Claude then operates with access to the remote filesystem, processes, and environment. The session runs on the remote machine, not tunneled from local. Ideal for: cloud servers, remote dev environments, air-gapped systems with controlled Claude access.

Q39

Scenario: Cowork scheduled tasks

A sales manager wants Cowork to automatically compile a weekly competitive intelligence report every Monday at 8AM. What Cowork feature enables this?

ANot possible — Cowork is interactive only

BCowork's scheduled tasks feature — create a recurring automation that runs at specified times

CSet up a cron job that calls the Claude API

DRequires Enterprise plan with Compliance API

▶ SHOW ANSWER

✓ Correct

B — Cowork scheduled tasks. Cowork supports scheduled task automation — set a task to run at a specific time (daily, weekly, etc.) without human trigger. The competitive intelligence report would: use Claude in Chrome to gather research, Cowork to synthesize, and output a formatted document. Available on paid plans with Cowork access (Pro, Max, Team, Enterprise). Remember: Cowork is desktop-only (macOS + Windows) and not suitable for regulated workloads (no audit logs).

08

## Structured Output Edge Cases & Schema Design

6 QUESTIONS

Q40

Scenario: Missing field handling

Claude is extracting invoice data from varied formats. Some invoices don't have a "discount" field. What instruction prevents Claude from inventing values?

AMake "discount" a required field so Claude always includes it

BInclude "discount" as optional in schema; instruct "If field not explicitly present in source, use null — do not infer or calculate"

COmit "discount" from the schema entirely

DUse a default value of 0 for missing discounts

▶ SHOW ANSWER

✓ Correct

B — Optional field in schema + explicit null instruction. The critical prompt clause: "If the field is not explicitly present in the source document, use null. Do not calculate, estimate, or infer values not directly stated." Without this, Claude may calculate a discount from subtracted amounts or infer 0 when no discount appears. null explicitly signals "data not present" — different from 0 which could mean "no discount applied."

Q41

Scenario: Nested JSON

A contract extraction task needs to pull clauses with sub-clauses. The JSON output keeps varying in depth. What's the fix?

AFlatten all clauses into a single array with no nesting

BDefine a fixed schema with explicit nesting depth; include a few-shot example showing exactly the expected nested structure

CUse XML output format instead of JSON for nested data

DAsk Claude to "use consistent nesting"

▶ SHOW ANSWER

✓ Correct

B — Explicit schema + few-shot example of exact nested structure. For complex nested outputs: (1) Define the full schema explicitly in system prompt — show clause → sub_clauses → [] structure, (2) Include a complete few-shot example with actual nesting, (3) Specify max depth if applicable. Vague instructions like "use consistent nesting" are probabilistic. A concrete example is the most effective anchor for complex structure.

Q42

Scenario: Array vs single object

An extraction prompt sometimes returns a single JSON object, sometimes a JSON array, depending on whether 1 or multiple items are found. How do you enforce consistent output?

AAccept variability — parse both formats

BExplicitly instruct: "Always return a JSON array, even if only one item is found — e.g., [{ single item }]"

CUse a POST-processing step to normalize

DSet the schema type to "object OR array"

▶ SHOW ANSWER

✓ Correct

B — Always return array, even for single items. The prompt fix: "Return a JSON array of items. If only one item is found, return a one-element array: [{ ... }]. If no items found, return an empty array: []." This enforces consistent type for downstream code — your parser always calls .map() or .forEach() without type-checking first. Option C (post-processing) works but adds complexity that's avoidable at the prompt level.

Q43

Scenario: Output format contamination

You ask for JSON output. Claude wraps it in ```json\n...\n``` markdown code fences. Your JSON parser breaks. What's the fix?

AParse the markdown manually — code fences are standard

BAdd to prompt: "Return ONLY the raw JSON. No markdown. No code fences. No explanation. Start your response with { or [."

CUse a regex to strip code fences in post-processing

DRequest XML instead of JSON — less prone to formatting

▶ SHOW ANSWER

✓ Correct

B — Explicit instruction to return raw JSON only, starting with { or [. The canonical prompt suffix: "Return ONLY the raw JSON object/array. No markdown formatting. No code fences. No preamble or explanation. Your response must begin with { or [ and end with } or ]." The "start with {" instruction is a strong anchor — Claude follows literal starting character requirements reliably. Option C is a viable backup but adds fragility.

Q44

Scenario: Schema validation in production

A team trusts Claude's JSON output and skips validation. What production risk does this create?

ANo risk — Claude's JSON is always valid and schema-compliant

BMissing fields, wrong types, or unexpected structure can silently corrupt downstream processing without validation

CRisk is low — JSON parsing errors are immediately visible

DOnly affects free tier — paid plans have stricter output guarantees

▶ SHOW ANSWER

✓ Correct

B — Schema validation is non-negotiable in production. Claude occasionally: omits optional fields (field: undefined vs null), uses wrong types (string "3" vs number 3), adds unexpected fields, or truncates arrays on long content. Always validate against your schema (Zod, Pydantic, JSON Schema) before using output. Log and alert on validation failures — they reveal where your prompt needs improvement. Never trust LLM output without schema validation in production.

Q45

Scenario: Negative instructions

An extraction prompt says "Do not include personal information." Claude still includes names and emails. What's a stronger instruction?

A"Do not include personal information" — the instruction is correct, it's a model limitation

BAdd positive instruction: "Extract only: [invoice_date, amount, line_items]. The output schema has no name or email fields. Any personal identifiers not in this list must be omitted."

CAdd: "Definitely never under any circumstances include personal data"

DUse a PostToolUse hook to strip PII after extraction

▶ SHOW ANSWER

✓ Correct

B — Whitelist approach: specify exactly what to include, not what to exclude. Negative instructions ("do not include X") are weaker than positive whitelist instructions. Better: define the exact output schema and state "only fields in this schema are valid outputs." If the schema has no name/email fields, Claude has no place to put them. Combining with: "Any data not explicitly in this schema must be omitted" provides double reinforcement. Option D (PostToolUse PII stripping) is also good as a defense layer but doesn't fix the prompt.

0 of 45 revealed · Click any card to reveal · Vol.2 of the Claude Certification Questionnaire Series · March 2026
