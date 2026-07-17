---
title: 'Multi-Agent Production Patterns'
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: converted-html
source_file: 'Cheatsheet_10_MultiAgent_Production.html'
doc_type: guide
tags: [multi-agent, production-patterns, cheatsheet, coding-tools]
covers_version: "2026"
---

# Multi-Agent Production Patterns

## MULTI-AGENT PRODUCTION PATTERNS

// CONTEXT OVERFLOW · CITATION TRACKING · ORCHESTRATION · STATE HANDOFFS · TOKEN BUDGETS · RECOVERY

Complete field guide for building agent systems that work at production scale — covering every failure mode, design pattern, and fix for real scenarios.

Context fills mid-batch

Citations lost across agents

Reporting agent missing sources

State not passed on handoff

Subagent token budget blowout

Fan-out/fan-in aggregation

Partial failure in pipeline

Map-reduce over documents

12

Failure Modes

8

Patterns

6

Architectures

🔴 PROBLEM 1: CONTEXT OVERFLOW MID-BATCH (e.g. filling at doc 22/50)

Why It Happens

Every document read + every LLM response + every prior tool result accumulates in context. By doc 22, the window is full — Claude sees only recent history, loses earlier docs. 

Root Fix

Never process multiple documents inside one agent's single loop. Use a **Map-Reduce architecture** — one subagent per document, each with its own clean context. 

WRONG: Single agent loop

## Anti-pattern — everything accumulates in ONE context for doc in documents[0:50]: result = claude.read(doc) # +doc tokens summary = claude.summarize(result) # +summary tokens findings.append(summary) # context GROWS every iteration # Context explodes by doc 22 → truncation → lost findings

CORRECT: Map-Reduce — subagent per document

## Orchestrator spawns one Task per document (up to 10 parallel) Task(doc_1) → { summary, key_points, metadata, source_id: "doc_1" } Task(doc_2) → { summary, key_points, metadata, source_id: "doc_2" } ... up to doc_50 (queued, max 10 parallel) # Each subagent has a FRESH context window for its 1 doc # Returns a COMPACT structured result (not full doc content) # Orchestrator context only holds 50 small result objects # Prompt for each Task: "Read ONLY this document. Extract: {summary (≤100 words), key_claims: [], entities: [], source_id}. Return JSON. Nothing else."

ORCHESTRATOR COLLECTS RESULTS

## Orchestrator receives 50 compact JSON objects # Each is ~200 tokens vs 5000 tokens for raw doc # Total: 50 × 200 = 10,000 tokens — fits easily results = [ { "source_id": "doc_1", "summary": "...", "key_claims": [...] }, { "source_id": "doc_2", "summary": "...", "key_claims": [...] }, ... × 50 ] # Now pass to synthesis agent with full citation provenance

**Context budget rule:** Each subagent should return ≤500 tokens. If 50 subagents each return 500 tokens, orchestrator receives 25,000 tokens total — still safe. 

🔵 PROBLEM 2: CITATIONS UNAVAILABLE IN REPORTING AGENT

Why It Happens

Research subagents hold citations in their own isolated context. When they return a text summary to the orchestrator, citations are stripped. The reporting agent receives findings without sources. 

Root Fix

Citations must be part of the structured return schema. Every agent that finds evidence must return source IDs alongside the finding — not embedded in prose. 

WRONG: Citation in prose → lost

## Research agent returns this — citations buried in text return "The market grew 23% (Source: McKinsey 2024 Report). " "Revenue hit $4.2B (per Bloomberg Terminal, March 2025)." # Reporting agent receives text → cannot extract structured cites # Result: report has no footnotes, no source links

CORRECT: Citation as structured field in return schema

## Define this schema for EVERY research subagent return { "findings": [ { "claim": "Market grew 23% in 2024", "confidence": "high", "source": { "id": "mckinsey_2024_q3", "title": "McKinsey Global Report Q3 2024", "page": 47, "url": "https://...", "quote": "exact supporting text ≤50 words" } } ] } # Reporting agent prompt: "Each finding in the findings array has a source.id field. When writing the report, cite as [source.id] after each claim. Append a References section listing all source objects."

**Citation chain rule:** source_id must propagate through every agent boundary — research → orchestrator → synthesis → reporting. If any agent drops it, it's gone forever. 

CITATION REGISTRY PATTERN (for large systems)

## Orchestrator maintains a flat citation registry citation_registry = {} # Each subagent return is registered immediately for finding in agent_result.findings: cid = finding.source.id citation_registry[cid] = finding.source # persist # Reporting agent receives: # 1. Synthesized findings (with source_id references) # 2. The full citation_registry lookup table # → can render complete footnotes

🔀 MAP-REDUCE: BATCH DOCUMENT PROCESSING

Architecture

ORCHESTRATOR (Opus — planning + synthesis) │ ├─ Splits 50 docs → batches of 10 │ ├── Task(doc_1..10) ──→ 10 parallel subagents │ each: fresh context, 1 doc, returns compact JSON │ ~500 tokens output per agent │ ├─ Collects batch 1 results (10 × 500 = 5k tokens) │ ├── Task(doc_11..20) ─→ next 10 parallel │ ... repeat for 5 batches │ └── Synthesis Agent ──→ receives all 50 result objects citation_registry passed alongside produces final report with full citations 

Max parallel10 simultaneous Tasks — rest queued automatically

Batch strategyDon't specify parallelism level → streaming queue (more efficient than fixed batches)

Orchestrator budgetSave 60% of context for result aggregation — don't fill it during mapping

Failure handlingTrack success/fail per task ID — retry failed tasks in next batch pass

🔗 PIPELINE PATTERN: SEQUENTIAL AGENT CHAIN

Architecture — Research → Analysis → Report

Stage 1: Research Agent Input: topic + search queries Output: { findings[], citations[], raw_data } ↓ (explicit context packet passed) Stage 2: Analysis Agent Input: findings + citations + analysis_brief Output: { insights[], patterns[], gaps[], citations[] } ↓ (same citation IDs carried forward) Stage 3: Synthesis Agent Input: insights + citations + format_spec Output: { draft_report, citation_map } ↓ Stage 4: Reporting Agent Input: draft + citation_map + style_guide Output: final_report_with_footnotes.docx 

**Key rule:** Each stage receives ONLY what it needs — not the full prior conversation. Explicit handoff packets prevent context bloat. 

Handoff packet structure

{ "stage": "analysis", "prior_stage_summary": "Brief summary of what stage 1 did", "data": { ...stage 1 outputs }, "citation_registry": { ...all source objects so far }, "task": "Analyze these findings and extract patterns", "constraints": { max_output_tokens: 2000, format: "JSON" } } 

🌟 ORCHESTRATOR DESIGN: HUB-AND-SPOKE

Core responsibilities

DecomposeBreak task into independent subtasks assignable to specialized agents

Route dynamicallyOnly invoke relevant subagents — not always the full pipeline

Pass context explicitlySubagents do NOT inherit orchestrator history — pass what they need

Maintain registryKeep citation_registry, task_status, and partial_results

Aggregate resultsCollect all subagent outputs before synthesis pass

Handle failuresTrack which subagents failed, retry or degrade gracefully

Orchestrator context budget

## Context allocation strategy for orchestrator System prompt + task spec: ~2,000 tokens (10%) Subagent result accumulation: ~10,000 tokens (50%) Citation registry: ~3,000 tokens (15%) Task status + error log: ~1,000 tokens (5%) Reserved for synthesis: ~4,000 tokens (20%) ─────────────── Total budget: 20,000 tokens # If approaching limit → /compact before synthesis pass

**Anti-pattern:** Orchestrator reads every subagent's full working context. Instead, define compact return schemas — orchestrator sees only the summary. 

💾 STATE MANAGEMENT ACROSS AGENT BOUNDARIES

The fundamental problem

Subagents have NO access to orchestrator conversation history. Every boundary is a context reset. Anything not explicitly passed is invisible.

What MUST be explicitly passed

Task specWhat the subagent should do, in full

Relevant prior resultsOnly the subset it needs — not all results

Citation registryAll source objects accumulated so far

ConstraintsOutput format, max length, required fields

Global contextCompany/project context (from CLAUDE.md or system prompt)

Task IDFor result tracking and failure recovery

Persistent state object pattern

## Orchestrator maintains this throughout the session state = { "session_id": "report_2026_03", "tasks": { "doc_1": { "status": "complete", "result": {...} }, "doc_2": { "status": "failed", "error": "timeout" }, "doc_3": { "status": "pending" }, }, "citation_registry": { ...all sources seen so far }, "partial_report": "...", # built incrementally "failed_tasks": ["doc_2"], # for retry pass }

Handoff summary pattern (human or agent)

## When passing to next agent OR human agent handoff = { "completed_by": "research_agent", "task_status": "partial — 22/50 docs processed", "completed_items": ["doc_1" .. "doc_22"], "remaining_items": ["doc_23" .. "doc_50"], "findings_so_far": { ...22 result objects }, "citation_registry": { ...all sources found }, "next_agent_task": "Continue from doc_23. Use the citation_registry for all source refs.", "blockers": ["doc_7 timeout — retry needed"] }

Resume pattern after context limit

## When orchestrator approaches context limit mid-batch: # 1. Save state to RESULTS.md in worktree Write("RESULTS.md", json.dumps(state)) # 2. Compact with preservation instruction /compact "Keep: citation_registry, task_status, partial_report. Discard: raw tool outputs." # 3. Continue — state is now summarized, not lost # 4. On resume: Read("RESULTS.md") to restore state

💰 TOKEN BUDGET MANAGEMENT PER AGENT

Token budget tiers

Agent Role | Model | Budget  
---|---|---  
Orchestrator| Opus 4.6| 20K–50K in  
Research agents| Sonnet 4.6| 8K in, 1K out  
Doc processing| Haiku 4.5| 4K in, 500 out  
Synthesis agent| Opus 4.6| 30K in, 4K out  
Reporting agent| Sonnet 4.6| 15K in, 8K out  
  
Routing by complexity

## Set subagent model via env var export CLAUDE_CODE_SUBAGENT_MODEL="claude-haiku-4-5-20251001" # Main session (orchestrator) uses Opus # Subagents (doc processing) use Haiku # Cost reduction: ~10x on processing step # For Agent Teams — per-agent model override: agent: code-reviewer model: claude-sonnet-4-6 # override for this agent

Output size discipline per agent

**Compact return rule:** Subagent output should be ≤10% of its input size. A 5000-token doc should produce a ≤500-token result.

Enforce via prompt"Return a JSON object. Summary ≤100 words. key_claims ≤5 items. No full quotes."

max_tokens paramSet max_tokens on subagent API call to hard-cap output size

Schema validationValidate return schema — reject oversized responses and retry with stricter prompt

Token trackingLog usage.output_tokens per subagent — alert if >budget threshold

Budget exceeded → response

## When subagent hits max_tokens: # stop_reason === "max_tokens" # → append partial + continue:"Please finish the JSON" # OR → retry with more constrained output instructions # OR → use the partial result if schema is satisfied

📎 CITATION SYSTEM: COMPLETE IMPLEMENTATION

Citation object schema (define once, use everywhere)

## Include this schema definition in EVERY agent's system prompt # that handles sources CitationObject = { "id": "unique_slug", # e.g. "bloomberg_2025_q1" "type": "document|web|db|api", "title": "Source display name", "author": "optional", "date": "2025-03-01", "url": "https://...", # if applicable "page": 47, # if document "tool_call": "search_tool('query')", # if from MCP tool "excerpt": "≤50 word exact quote", "confidence":"high|medium|low" }

Inline citation pattern for agent outputs

## Agent instruction: "When you make a factual claim, append [source_id] immediately after the claim. Never make a claim without a citation. If you cannot cite it, mark it [INFERRED] so the reporting agent can flag it for human review." # Example agent output: "Market grew 23% [bloomberg_2025_q1]. Three companies account for 78% of revenue [mckinsey_2024_p47]. The trend is expected to continue [INFERRED]." # Reporting agent: # - Replaces [source_id] with footnote numbers # - Flags all [INFERRED] for human verification # - Appends bibliography from citation_registry

Citation registry — orchestrator implementation

## Orchestrator builds this incrementally class CitationRegistry: def register(self, source: CitationObject): if source.id not in self.sources: self.sources[source.id] = source def merge_from_agent(self, agent_result): # Each subagent returns its own citations[] for cite in agent_result.citations: self.register(cite) def to_prompt_context(self): # Compact form for passing to synthesis/reporting return {id: {title, url, page} for id, src in self.sources.items()}

Multi-source deduplication

## Problem: agent_1 and agent_3 both cite same document # with slightly different IDs or titles # Solution: Normalize IDs before registering def normalize_source_id(title, url): # Hash URL or normalize title to dedup return slugify(title)[:30] + "_" \+ hash(url)[:6] # OR: Instruct agents to use canonical IDs: "Source IDs must use this format: {author_surname}_{year}_{topic_slug} Example: mckinsey_2024_market_report"

**[INFERRED] flag:** When an agent makes a claim without a source, require it to mark [INFERRED]. Reporting agent highlights these for human review before publication. 

🔥 ERROR RECOVERY IN MULTI-AGENT SYSTEMS

Failure mode taxonomy

Subagent timeoutReturn is_error: true with error="timeout". Orchestrator marks task failed, queues retry.

Schema violationSubagent returns wrong format. Validate, retry with stricter schema prompt. After 2 retries → use partial or skip.

Context overflowCompact before subagent receives too-large input. Split input into smaller Tasks.

Tool MCP failurePostToolUse hook catches error. Subagent retries with alternative tool or graceful degrade.

Citation missingValidate return has citations[]. If not: retry with citation-enforcement prompt. Mark output [NEEDS_CITATION].

Partial batch failureTrack which doc IDs failed. After primary pass, run retry pass on failed IDs only.

Retry strategy

for attempt in range(3): result = run_subagent(task, prompt) if validate_schema(result): break if attempt == 0: prompt += "\nReturn ONLY valid JSON." elif attempt == 1: prompt = STRICT_SCHEMA_PROMPT # nuclear option else: result = DEGRADED_RESULT # mark as incomplete

Checkpoint pattern for long pipelines

## Write checkpoint after each batch completes # Enables resume without reprocessing completed work checkpoint = { "last_completed_batch": 3, "processed_doc_ids": ["doc_1".."doc_30"], "results_so_far": { ...30 result objects }, "citation_registry": { ...all sources }, "timestamp": "2026-03-12T14:30:00Z" } Write("checkpoint.json", checkpoint) # On restart/resume: checkpoint = Read("checkpoint.json") remaining = all_docs - checkpoint.processed_doc_ids # Continue from doc_31

Graceful degradation levels

Level 1: Full result → all fields populated, citations ✓ Level 2: Partial result → some fields null, [INFERRED] flags Level 3: Summary only → just a text summary, no structure Level 4: Skip + log → task_status="failed", human review # Never silently produce nothing — always return something # at the degraded level and mark it clearly

🏗️ 6 AGENT ARCHITECTURES — WHEN TO USE EACH

Architecture | Use When | Citation Handling | Context Risk  
---|---|---|---  
Single Agent | <10 docs, simple task, no parallelism needed | Inline — agent holds all | Low  
Map-Reduce | 10–1000 docs, batch processing, independent items | Schema per subagent → registry | Low (subagents isolated)  
Pipeline | Sequential stages, each stage needs prior output | Explicit handoff packet each stage | Medium (accumulates)  
Hub-and-Spoke | Mixed tasks, dynamic routing, varied tools | Orchestrator holds registry | Medium (orchestrator grows)  
Agent Teams | Workers need to debate/coordinate with each other | Experimental — design carefully | High (3-4× tokens)  
Worktree Parallel | Same-repo work needing filesystem isolation | Per-branch — merge required | Low (isolated contexts)  
  
Architecture selection guide

Does the task involve many similar items (docs, files, records)? → YES: Map-Reduce (each item = 1 subagent) → NO: continue... Do the subtasks need to share findings with each other? → YES: Agent Teams (experimental) or Hub-and-Spoke with central state → NO: continue... Do the subtasks need to run in a specific order? → YES: Pipeline (pass handoff packet at each stage) → NO: continue... Do they need filesystem isolation (same repo, different changes)? → YES: Worktrees → NO: Subagents with Hub-and-Spoke 

❌ ANTI-PATTERNS — THE 12 PRODUCTION KILLERS

All-in-one contextProcessing 50 docs in a single agent loop. Context fills at doc N. Use Map-Reduce instead.

Citation in prose"Sources: [3]" in free text. Reporting agent can't parse it. Use structured citation schema.

Assuming inheritanceSubagent expected to "know" orchestrator's context. Subagents are context-blind — pass everything explicitly.

Large subagent outputSubagent returns 5000-token analysis. Orchestrator fills immediately. Enforce compact return schema.

No task trackingNo status for each doc/task. Can't retry failures. Can't resume. Always track {id, status, result, error}.

Text-based stop checkChecking if response contains "I'm done" to terminate loop. Use stop_reason === "end_turn" — the only reliable signal.

Subagent spawns subagentNot supported — causes silent failure. Plan agent exists for this reason. Use Agent Teams if cross-agent work needed.

No checkpoint saves50-doc batch fails at doc 48. Must restart from scratch. Checkpoint every 10 docs.

Unvalidated JSONTrusting subagent JSON is always valid. Always validate schema before aggregating. Retry on schema failure.

Prompt for compliance"Never call delete_file". Use PreToolUse hook for guaranteed enforcement — prompts are probabilistic.

Same-file parallel editsTwo subagents editing src/auth.ts simultaneously → corruption. Use worktrees or assign non-overlapping file sets.

Fixed batch parallelism"Run 4 parallel, wait for all 4, then next 4" — inefficient. Let Claude self-manage queue for streaming efficiency.

⚡ COMPLETE EXAMPLE: 50-DOCUMENT RESEARCH REPORT WITH CITATIONS

Phase 1: Setup + Task Decomposition

## Orchestrator prompt (Opus 4.6) """ You are the orchestrator for a document research pipeline. You have 50 documents to analyze. RULES: 1\. Process in batches of 10 using Task tool (parallel) 2\. Each Task must use this EXACT return schema (below) 3\. Maintain citation_registry - merge all citations from Tasks 4\. Track task_status for every document ID 5\. Never read full doc yourself - delegate to Tasks Return schema for each Task: { "doc_id": "string", "summary": "≤100 words", "key_claims": [{"claim": "", "source_id": ""}], "citations": [CitationObject], "status": "complete|partial|failed" } """

Task prompt template

## Injected into each Task's context f""" doc_id: {doc_id} document: {document_content} Extract per schema. Every claim needs a source_id. If no source exists for a claim, mark source_id as "INFERRED". Return ONLY raw JSON starting with {{ """

Phase 2: Map (10 parallel Tasks × 5 batches)

## Let Claude manage queue — no fixed parallelism "Process all 50 documents using the Task tool. Use the task prompt template for each. As each Task completes, immediately add its citations to citation_registry and update task_status. Continue until all 50 are processed or failed." # After each batch of 10: Write("checkpoint.json", { "processed": completed_ids, "citation_registry": registry, "results": accumulated_results, "failed": failed_ids }) # If approaching context limit (use /compact): /compact "Preserve: citation_registry, task_status, all result objects. Compress: intermediate reasoning."

Phase 3: Reduce + Report Generation

## Retry failed docs first if failed_ids: retry_pass(failed_ids, stricter_prompt) # Pass to synthesis agent synthesis_input = { "all_results": results_50, # compact objects "citation_registry": registry, # full source objects "report_brief": "Analyze X trends", "task": "Synthesize findings. Cite every claim as [source_id]. Mark [INFERRED] where needed." } # Reporting agent receives synthesis + citation_registry report_input = { "draft": synthesis_result.draft, "citation_registry": registry, "task": "Replace [source_id] with footnote numbers. Add References section. Flag all [INFERRED]." } # Output: report.docx with full citations ✓

**Context safe:** Each Task has its own context window. Orchestrator only holds 50 × ~500 token result objects — total ~25K tokens. Well within budget.

**Citations intact:** Every claim in final report has a source_id. citation_registry propagated through all boundaries. Reporting agent has full bibliography.

**Fault tolerant:** Checkpoint every 10 docs. Failed docs retried separately. [INFERRED] flags human review needed. No silent data loss.

**Cost efficient:** Tasks use Haiku (cheap, fast). Orchestrator/Synthesis use Opus (complex reasoning). 10x cost reduction on processing step.

📋 PRODUCTION CHECKLIST — BEFORE DEPLOYING ANY MULTI-AGENT SYSTEM

Context management

□ Compact return schemaEvery subagent has ≤500 token output spec

□ Checkpoint savesState written to file every N batches

□ /compact planKnow when to compact and what to preserve

□ Budget allocationOrchestrator reserves 20% for synthesis

□ No subagent inheritance assumptionAll context explicitly passed

Citation tracking

□ Citation schema definedCitationObject with id, title, url, excerpt

□ Schema in all agent promptsEvery research agent uses same schema

□ Registry maintainedOrchestrator merges citations from all agents

□ [INFERRED] flagUncited claims flagged for human review

□ Registry passed to reporterFinal agent receives full bibliography

Reliability

□ Task status tracking{id, status, result, error} for every item

□ Schema validationAll subagent returns validated before use

□ Retry logicMax 3 retries with escalating prompt strictness

□ Graceful degradation levelsFull → Partial → Summary → Skip

□ stop_reason checkNOT text parsing — never "I am done"

Safety

□ PreToolUse hooksForbidden operations blocked deterministically

□ Plan mode triggersDestructive ops require human review

□ File isolationParallel agents not editing same files

□ No secrets in promptsAPI keys / credentials not in agent context

□ Prompt injection checkExternal docs treated as untrusted input

🗺️ CONTEXT OVERFLOW — COMPLETE DECISION TREE

Q1: Are you processing multiple similar items (docs/files)? → YES: Use Map-Reduce. ONE SUBAGENT PER ITEM. → NO: Continue to Q2 Q2: Will accumulated tool results + history exceed ~20K tokens? → YES: Plan /compact checkpoints at regular intervals → NO: Single agent is fine, monitor token usage Q3: Does each subagent return too much data? → YES: Add compact return schema to task prompt Enforce max_tokens on subagent API calls → NO: Continue to Q4 Q4: Is the orchestrator filling up from result accumulation? → YES: Write results to RESULTS.md, /compact with "preserve: citation_registry, task_status" → NO: Continue to Q5 Q5: Are you resuming a session where files changed? → YES: Start fresh session + explicit context of changes → NO: Safe to resume Q6: Multiple agents editing the same file simultaneously? → YES: Assign non-overlapping file sets OR use worktrees → NO: Safe for parallel execution 

Emergency context recovery

## Context is nearly full, work not done: # 1. SAVE STATE IMMEDIATELY Write("emergency_state.json", full_state_object) # 2. COMPACT with specific preservation /compact "CRITICAL - preserve: \- citation_registry (complete) \- task_status for all 50 docs \- accumulated results array \- failed_ids list Discard: all intermediate tool call outputs" # 3. VERIFY state survived compaction Read("emergency_state.json") # restore if needed # 4. CONTINUE from where left off "Continue processing docs 23-50. State is in emergency_state.json."

MULTI-AGENT PRODUCTION PATTERNS · ANTHROPIC PARTNER CERTIFICATION EA · MARCH 2026 
