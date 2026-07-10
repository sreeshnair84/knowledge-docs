---
title: "Claude Dynamic Workflows — Complete Guide"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Module_6_Claude_Workflows.pdf"
doc_type: guide
tags: ["coding-tools"]
last_reviewed: 2026-07-10
covers_version: "N/A"
last_reviewed: 2026-07-10
---

#### **MODULE 6** 

# **Claude Dynamic Workflows — Complete Guide** 

JavaScript-orchestrated parallel subagent execution, plan-as-code, Ultracode, /deep-research, cost management (released May 28 2026) 

**NEW — Released May 28, 2026 | Max · Team · Enterprise plans** 

**Claude Certified Architect (CCA-F) | Professional Enterprise Architect | May 2026** 

### **What You Will Master in This Module** 

I What Dynamic Workflows are — how they differ from subagents, skills, and MCP 

I Architecture: Claude writes workflow.js, Bun runtime executes it, agents work in parallel 

I Plan-as-code: why plans live in code (not context) — the scaling breakthrough 

I Triggering: 'workflow' keyword, Ultracode mode, /deep-research built-in command 

I Technical limits: 16 concurrent agents, 1,000 total per run, plan constraints 

I Pause, resume, and checkpoint behavior for interrupted long-running workflows 

I workflow.js structure: fan-out, verification, convergence, synthesis phases 

I Cost modeling: estimating token spend for 200-1,000 agent workflow runs 

I Availability: Claude Code v2.1.154+, Max/Team/Enterprise plans, all cloud platforms 

I Decision guide: Workflows vs Subagents vs Skills vs MCP — when to use each 

### **6.1 What Are Dynamic Workflows?** 

**Released May 28, 2026** alongside Claude Opus 4.8, Dynamic Workflows are a fundamental architectural shift in how Claude Code handles large-scale parallel tasks. They solve the context window scaling ceiling that limited previous multi-agent approaches. 

|**Feature**|**<b>Old: Subagents in context</b>**|**<b>New: Dynamic Workflows</b>**|
|---|---|---|
|**Plan location**|Claude's 200K context window|JavaScript code (workflow.js) — outside context|
|**Intermediate results**|Accumulate in Claude's context|Live in JS variables — never touch context|
|**Final result in session**|Everything accumulates|Only the synthesized final answer|
|**Max parallel agents**|Context-limited (~5-10 practical)|16 concurrent, 1,000 total per run|
|**Resumability**|No — restart on interruption|Yes — checkpointed after each agent|
|**Context pollution**|Every agent result uses context|Zero — context stays clean throughout|
|**Available on**|All Claude Code plans|Max, Team, Enterprise plans only|
|**Trigger method**|Explicit Task tool call|'workflow' keyword or Ultracode mode|

### **6.2 Architecture & Execution Flow** 

`USER PROMPT: 'Create a workflow to audit 200 microservices for security issues' STEP 1: CLAUDE PLANS` II `Claude writes workflow.js — a JavaScript orchestration script Plan includes: task decomposition, agent prompts, schemas, concurrency settings STEP 2: BUN RUNTIME EXECUTES` II `Bun runtime takes over — your session stays responsive Runtime manages: agent spawning, concurrency (max 16), checkpointing, retries Note: workflow.js CANNOT directly access filesystem/shell — only agents can STEP 3: PARALLEL AGENT EXECUTION` II `[Agent 1]: audit service-auth` → `result stored in JS variable` II `[Agent 2]: audit service-payments` → `result stored in JS variable` II `[Agent 3]: audit service-users` → `result stored in JS variable` II `... (up to 16 concurrent)` II `Progress checkpointed after each completion STEP 4: VERIFICATION (adversarial agents challenge findings)` II `Agents assigned to refute high-severity findings Findings that survive challenge = high confidence STEP 5: SYNTHESIS` II `Single synthesis agent creates final report Only this final report is returned to your session Session context remains clean throughout entire run` 

### **6.3 Technical Specifications** 

|**<b>Orchestration language</b>**|JavaScript — Bun runtime. Claude writes workflow.js using standard JS constructs.|
|---|---|
|**<b>Concurrent agents (max)</b>**|16 agents running simultaneously. Queue-based: next starts when one completes.|
|**<b>Total agents per run</b>**|1,000 agents hard limit. Plan your token budget accordingly.|
|**<b>Context per agent</b>**|Each agent has its own fresh 200K context window. Intermediate results in JS vars.|
|**<b>Script restrictions</b>**|workflow.js cannot access filesystem or shell directly — only agents can use tools.|
|**<b>Resumability</b>**|Checkpointed after each agent. Interrupted workflows resume within same session.|

|**<b>Retry behavior</b>**|Failed agents auto-retried with exponential back-off. Configurable retry count.|
|---|---|
|**<b>Trigger methods</b>**|(1) Include 'workflow' in prompt. (2) Enable Ultracode setting. (3) Use /deep-research.|
|**<b>Ultracode mode</b>**|Combines xhigh reasoning effort + automatic workflow orchestration for complex tasks.|
|**<b>Built-in workflows</b>**|/deep-research: fan-out research→cross-validation→synthesis report.|
|**<b>Required version</b>**|Claude Code v2.1.154+. Check with: claude --version|
|**<b>Available plans</b>**|Max 5x, Max 20x, Team Standard, Team Premium, Enterprise (admin must enable).|
|**<b>Cloud platforms</b>**|CLI, Desktop, VS Code. Also: Claude API, Amazon Bedrock, Vertex AI, MS Foundry.|

### **6.4 workflow.js — Structure & Example** 

```
// workflow.js — Auto-generated by Claude for security audit // Executed by Bun runtime —
filesystem/shell only accessible via agents const { runAgent, parallel, sequential } = await
import('@anthropic/claude-code-runtime'); // Phase 1: Discovery — find all service directories const
discovery = await runAgent({ prompt: 'List all microservice directories in this monorepo. Return
JSON: {services:[string[]]}', tools: ['Read','Glob'], outputSchema: { services: ['string'] }, model:
'claude-haiku-4-5-20251001' // Cheap for discovery }); // Phase 2: Fan-out — audit each service in
parallel const audits = await parallel( discovery.services.map(service => ({ prompt: `Security audit
of ${service}: check SQL injection, auth bypass, hardcoded secrets, input validation. Return JSON:
{service:string, risk:'high'|'medium'|'low',
```

```
findings:[{type,file,line,description,recommendation}]}`, tools: ['Read','Grep'], budget: {
maxTokens: 4000 }, // Per-agent token budget retries: 2, model: 'claude-sonnet-4-6' })), {
concurrency: 16 } // Run up to 16 simultaneously ); // Phase 3: Verification — challenge high-risk
findings const highRisk = audits.filter(a => a.risk === 'high'); const verified = await parallel(
highRisk.map(audit => ({ prompt: `Verify this finding. Check for false positives:
${JSON.stringify(audit)} Return: {confirmed:bool, confidence:0-100, reasoning:string}`, tools:
['Read'], model: 'claude-sonnet-4-6' })) ); // Phase 4: Synthesis — one agent creates the executive
report const report = await runAgent({ prompt: `Synthesize verified security findings into an
executive report. All findings: ${JSON.stringify(verified)} Include: risk summary, top 10 critical
findings, remediation roadmap.`, tools: [], // Synthesis agent needs no tools model:
'claude-opus-4-8' // Best model for synthesis }); return report; // Only this returns to the user
session
```

### **6.5 Cost Management & Tool Comparison** 

**Warning:** Workflows can spawn up to 1,000 agents. At Sonnet 4.6 pricing ($3/$15/MTok), a large workflow can cost $100-500+. Always estimate cost and set per-agent token budgets before running at scale. 

## **Cost Estimation Template** 

```
# 200-service security audit cost estimate pricing = {'haiku':(1,5), 'sonnet':(3,15), 'opus':(5,25)}
# $/MTok in/out phases = [ ('discovery', 1, 'haiku', 5_000, 500), ('audit', 200, 'sonnet', 20_000,
2_000), ('verify', 40, 'sonnet', 8_000, 1_000), ('synthesis', 1, 'opus', 60_000, 10_000), ] total =
sum(n * (ti*p[0] + to*p[1]) / 1e6 for _, n, m, ti, to in phases for p in [pricing[m]])
print(f'Estimated total: ${total:.2f}') # ~$136
```

## **When to Use Each Agentic Tool** 

**<b>Tool</b> <b>Use When</b> <b>Example</b>** 

<b>Dynamic Workflows</b> 

<b>Subagents (Task)</b>Single focused isolated task; security boundary needed; onDel **e** gate security r at a time; fits **e** view ofasily in **one** contextPR to a read-only agent 

<b>Skills (SKILL.md)</b>Reusable task playbook; consistent execution each time; in-context or forked; all plan sizes'Add API endpoint' — runs the same 6-step process every time <b>MCP Servers</b> Connecting to external services (CRM, GitHub, Gmail); real-time data; used across many sessionsQuery Salesforce, search GitHub issues, read Gmail 

**New Capability:** Dynamic Workflows transform Claude Code from a context-constrained assistant into a massively parallel compute platform. Anthropic used hundreds of parallel agents in the Claude 4.8 internal migration — this architecture is production-validated at scale.
