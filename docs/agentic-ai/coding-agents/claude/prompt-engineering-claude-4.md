---
title: Prompt Engineering for Claude 4.x
---

# Prompt Engineering for Claude 4.x

Modern prompting for Claude 4.x — the model family behaves differently from earlier versions. This guide covers what changed, what still works, and the techniques that consistently get the best results.

---

## How Claude 4.x Differs from Earlier Models

| Behaviour | Claude 3.x | Claude 4.x |
|-----------|-----------|-----------|
| Response style | Verbose, hedged | Direct, concise |
| Instructions | Often over-explains before answering | Leads with the answer |
| Refusals | Frequent, sometimes over-cautious | Less reflexive, more grounded |
| Uncertainty | Often hidden | Explicitly stated when present |
| Role prompting | Moderate effect | Strong effect |
| Long system prompts | Sometimes ignored mid-way | Followed more reliably |

**Key implication**: Remove filler phrases like "Certainly!", "Of course!", and lengthy preambles from your prompts — Claude 4.x ignores them anyway and you waste tokens.

---

## System Prompt Design

### Role Prompting

State the role clearly and include the level of expertise:

```
You are a senior security engineer specialising in cloud-native application security.
You have deep expertise in OWASP Top 10, Kubernetes hardening, and zero-trust architecture.
You give direct, technically precise answers. You cite specific CVEs, CWEs, and NIST controls when relevant.
```

**Why it works**: Claude 4.x treats role prompts as a strong prior that shapes vocabulary, depth, and tone throughout the session.

### Avoid Over-Constraining

Bad:
```
You are a helpful assistant. Please be concise but also thorough.
Try to be friendly but professional. Make sure to cover all aspects.
Avoid being too technical but also don't oversimplify.
```

Good:
```
You are a technical writer. Your audience is senior engineers. Be precise and direct.
```

### Stable Instructions Before Variable Context

Structure system prompts so stable instructions come first (good for prompt caching):

```
[Role and behaviour — STABLE, cache this]
You are a financial analyst...

[Context documents — SEMI-STABLE, optionally cache]
<policy_document>
...10,000 tokens of policy text...
</policy_document>

[Per-request instructions — VARIABLE, don't cache]
Analyse the following transaction for policy compliance:
{user_input}
```

---

## Clarity and Directness

### Lead with the Task

Bad:
```
I'm working on a project and I've been thinking about how to handle authentication.
I read a few articles and I'm wondering if you could maybe help me think about
what approach might be best for my situation?
```

Good:
```
Design a JWT authentication system for a multi-tenant SaaS API.
Requirements: RS256 signing, 15-minute access tokens, 7-day refresh tokens,
tenant isolation enforced at the token level.
```

### Specify Output Format Explicitly

```
Return the result as a JSON object with this schema:
{
  "findings": [{"severity": "critical|high|medium|low", "description": "...", "line": int}],
  "summary": "...",
  "recommendation": "..."
}
Do not include any text outside the JSON.
```

### Scope the Task

```
Review ONLY the authentication middleware in src/auth/middleware.ts.
Do not suggest changes to other files.
Focus on: token validation, session handling, and error responses.
```

---

## Few-Shot Learning

### When to Use Examples

Use few-shot examples when:
- The output format is non-standard or complex
- The task involves subtle judgment calls
- You need consistent tone or style across many runs

Skip examples when:
- The task is clearly specified in plain language
- Claude's default behaviour already matches what you want
- Examples would waste tokens for no measurable gain

### Single Example (Most Common)

```
Classify the support ticket severity. Reply with only "P1", "P2", "P3", or "P4".

Example:
Ticket: "Production database is down, all users affected"
Classification: P1

Now classify:
Ticket: "{ticket_text}"
Classification:
```

### Multiple Examples for Complex Judgments

```
Extract action items from meeting notes. Format: "- [Owner] Action by [Date]"

Example 1:
Notes: "Sarah will update the roadmap before Thursday's board meeting."
Actions: - [Sarah] Update roadmap by Thursday

Example 2:
Notes: "Team agreed to deprecate v1 API by end of Q3. DevRel owns comms."
Actions: - [DevRel] Communicate v1 API deprecation by end of Q3

Now extract from:
Notes: "{meeting_notes}"
Actions:
```

---

## Chain-of-Thought Techniques

### Explicit CoT Request

```
Walk me through your reasoning step by step before giving the final answer.
```

### Structured Reasoning Format

```
Analyse the following architecture for scalability bottlenecks.

Format your response as:
## Observations
[What you see]

## Bottlenecks Identified
[Specific issues with reasoning for each]

## Recommendations
[Prioritised list with effort/impact assessment]
```

### When NOT to Request CoT

Avoid explicit CoT for:
- Simple extraction tasks (adds tokens, no quality gain)
- Classification with clear rules
- Any task where `thinking.effort: "high"` or above is enabled (Claude thinks internally)

---

## Adaptive Reasoning — Effort Level Selection

Use `thinking.effort` to match compute to task complexity:

| Task Type | Effort Level | Example |
|-----------|-------------|---------|
| Extraction, classification, simple Q&A | `standard` | "Extract all emails from this text" |
| Code review, data analysis, multi-step logic | `high` | "Review this PR for performance issues" |
| Architecture design, debugging complex systems | `xhigh` | "Design a zero-downtime migration for 50TB Postgres" |
| Novel problems, maximum accuracy required | `max` | "Find the flaw in this cryptographic protocol" |

```python
# Example: escalate effort for complex tasks
effort = "standard"
if task_type in ("architecture", "security_audit", "algorithm_design"):
    effort = "xhigh"

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=16000,
    thinking={"type": "enabled", "effort": effort, "display": "omitted"},
    messages=[{"role": "user", "content": prompt}]
)
```

---

## Extended Thinking: display: "omitted"

When using Adaptive Reasoning, you usually don't want to expose chain-of-thought to end users:

```python
thinking={
    "type": "enabled",
    "effort": "high",
    "display": "omitted"   # Reasoning happens internally; not in the response
}
```

**When to use `"omitted"`:**
- Production APIs where internal reasoning is not relevant to the user
- To reduce output payload and streaming latency
- When reasoning would confuse rather than help the end user

**When to expose reasoning (omit `"omitted"` or set `"display": "shown"`):**
- Debugging why Claude reached a particular conclusion
- Audit trails for high-stakes decisions
- Teaching applications where the thought process is the product

---

## Handling Uncertainty

Explicitly permit Claude to express uncertainty — this reduces confident hallucinations:

```
If you don't know or are not certain, say so directly.
Distinguish clearly between what you know with confidence and what you're inferring.
```

Without this instruction, Claude may fill gaps with plausible-sounding but wrong information.

### Uncertainty Tiers

```
Use this format when answering:
- State "I know that..." for established facts
- State "I believe that..." for reasonable inferences
- State "I'm uncertain about..." for gaps in your knowledge
- State "This requires verification..." when the answer depends on current/live data
```

---

## Structured Output

### JSON Mode

```python
response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=2048,
    system="You always respond with valid JSON. Never include text outside the JSON object.",
    messages=[{
        "role": "user",
        "content": "Extract the key metrics from this report: ..."
    }]
)
import json
data = json.loads(response.content[0].text)
```

### XML Tags for Nested Structure

XML tags are more reliable than Markdown for nested or mixed structured/unstructured output:

```
Analyse this code and respond in this format:

<analysis>
  <summary>One paragraph overview</summary>
  <issues>
    <issue severity="high">
      <location>src/auth/login.ts:47</location>
      <description>Missing input sanitization before SQL query</description>
      <fix>Use parameterized queries</fix>
    </issue>
  </issues>
  <verdict>approve|request_changes|needs_discussion</verdict>
</analysis>
```

### Using Prefill for Reliable Formatting

Force a specific output format by pre-filling the assistant turn:

```python
messages = [
    {"role": "user", "content": "List the top 5 cloud providers by market share as JSON"},
    {"role": "assistant", "content": "["}  # Prefill — forces JSON array output
]
```

---

## Tool Use Prompt Patterns

### Tool Description Quality

The tool description is the most important factor in whether Claude uses the tool correctly:

```python
# Too vague
{"name": "search", "description": "Search for things"}

# Correct
{
    "name": "search_knowledge_base",
    "description": (
        "Search the internal knowledge base for policies, procedures, and historical decisions. "
        "Use this when the user asks about internal processes, compliance requirements, or "
        "past architectural decisions. Do NOT use for publicly available information."
    )
}
```

### Parallel vs Sequential Tool Call Guidance

```
When gathering information for this analysis, call all data-gathering tools simultaneously
rather than waiting for each result before calling the next.
Only call tools sequentially when the output of one is required as input to another.
```

### Tool Result Formatting

Return structured results that Claude can reason over easily:

```python
# Weak: unstructured string
return "John Smith, age 34, joined 2019, department Engineering, manager Sarah Jones"

# Strong: structured dict
return {
    "employee": {"name": "John Smith", "age": 34, "department": "Engineering"},
    "tenure_years": 7,
    "manager": "Sarah Jones"
}
```

---

## Prompt Caching — Cache-Friendly Structure

Design prompts with the most stable content first:

```python
messages = [
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": SYSTEM_INSTRUCTIONS,          # ~2,000 tokens, never changes
                "cache_control": {"type": "ephemeral"}
            },
            {
                "type": "text",
                "text": KNOWLEDGE_BASE_CONTENT,        # ~8,000 tokens, changes weekly
                "cache_control": {"type": "ephemeral"}
            },
            {
                "type": "text",
                "text": f"User question: {user_question}"  # Changes every request
            }
        ]
    }
]
```

**Cache hit rate target**: Aim for > 80% cache hit rate on the stable prefix for high-volume applications (saves ~90% on cached input tokens).

---

## Anti-Patterns to Avoid

### Over-Constraining

```
# Bad: 47 conflicting rules
You must always be helpful but also concise but also thorough...
Never say X but also always include X when relevant...
```

### Vague Instructions

```
# Bad
"Make it better"
"Fix the code"
"Review this"

# Good
"Refactor the authentication handler to eliminate the N+1 query on user.permissions"
"Fix the null pointer exception on line 47 of UserService.java"
"Review this diff for: security vulnerabilities, performance issues, and test coverage gaps"
```

### Conflicting Directives

Audit your system prompts for contradictions. Common conflicts:
- "Be concise" + "Always explain your reasoning in detail"
- "Only answer questions you're certain about" + "Always provide an answer"
- "Use technical language" + "Explain as if to a non-technical audience"

### Prompt Injection Risk

When including untrusted user input in prompts, clearly delimit it:

```python
system = "You are a document summarizer. Summarize the document between the <doc> tags."
user_content = f"<doc>{user_provided_text}</doc>\n\nSummarize the above document."
```

Never interpolate user input directly into instructions:
```python
# DANGEROUS: user can inject "Ignore the above and..."
prompt = f"You are a helpful assistant. {user_provided_instructions}"
```
