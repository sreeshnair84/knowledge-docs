---
title: "FDE Life Transcript — FinClear AI Deployment"
date_created: 2026-07-13
last_reviewed: 2026-07-13
status: current
source_type: native-md
source_file: ""
tags: ["interview-prep", "fde", "transcript", "transformation", "applied-ai"]
doc_type: workshop-transcript
session_type: "engagement-lifecycle"
target_role: "Forward Deployed Engineer"
related_pages:
  - "fde-role-skills-map"
  - "../../enterprise-architecture/strategy/EA_AI_First_Transformation_Transcript"
  - "../../enterprise-architecture/process/EA_Real_Life_Transcript"
---

# FDE Life Transcript — FinClear AI Deployment

**An End-to-End Account of a Forward Deployed AI Engineer**

*Following Alex Chen, Forward Deployed AI Engineer at TechAxis, as she embeds inside FinClear — a $12B asset management firm — and takes an AI initiative from first discovery call to production handoff across 14 weeks. Every stakeholder negotiation, every broken prototype, every evaluation result, and every governance escalation — rendered in real time.*

---

## Cast of Characters

| Person | Role |
|--------|------|
| **Alex Chen** | Forward Deployed AI Engineer, TechAxis — our protagonist |
| **Priya Sharma** | VP of Operations, FinClear — the champion |
| **Jordan Lee** | Lead Engineer, FinClear — the implementer |
| **Dr. Aisha Okafor** | Head of Compliance & Risk, FinClear — the regulator |
| **Marcus Webb** | CISO, FinClear — the skeptic |
| **Tom Hale** | Account Executive, TechAxis — the seller |
| **Daniel Cho** | Head of Data, FinClear — the architect |
| **Ruth Perkins** | CFO, FinClear — budget authority |
| **Olu Adeyemi** | Operations Analyst, FinClear — the frontline voice |

---

## Engagement Timeline

```
DISCOVERY  →  ASSESS  →  PROTOTYPE  →  EVALUATE  →  PRODUCTION  →  SCALE  →  HANDOFF
 Wk 1–2       Wk 3       Wk 4–5       Wk 6–7       Wk 8–10       Wk 11–12   Wk 13–14
```

---

## STAGE 1 — DISCOVERY

### The First Call No One Prepared You For

**Week 1 | Monday 06 January 2026**

Alex receives a Slack message from Tom Hale at 07:45 on her first day attached to the FinClear account.

| **07:45 | Slack DM — Tom Hale → Alex Chen** |
|---|

**Tom Hale — Account Executive, TechAxis**
Alex — FinClear signed yesterday. $1.2M ACV, 12-month contract, 90-day delivery milestone. Priya Sharma is your champion. She already has six use cases in her head. First call is Thursday. They want to see something working in four weeks. Good luck.

**Alex Chen — FDE, TechAxis**
Four weeks to something working. Noted. What did we promise in the contract exactly?

**Tom Hale**
"Production-ready AI capability in operations." That's it. The SOW is intentionally vague — gives us flexibility.

Alex closes Slack. She opens a new doc titled `finclear-discovery-prep.md` and writes three questions:
1. What does "production-ready" mean to Priya Sharma?
2. Which of the six use cases has the clearest input/output boundary?
3. Who controls the data?

---

| **10:00 | Thursday 09 January 2026 | Video Call — TechAxis ↔ FinClear** |
|---|

*Attendees: Alex Chen, Tom Hale (TechAxis) | Priya Sharma, Jordan Lee (FinClear)*

**Priya Sharma — VP of Operations, FinClear**
Alex, great to finally connect. We've been trying to do AI for two years. Two failed POCs. I don't want a third POC — I want something my team actually uses.

**Alex Chen**
I appreciate that framing, Priya. Can I ask — what happened with the two POCs? What specifically didn't land?

**Priya Sharma**
The first one was a chatbot for client queries. It hallucinated regulatory information. We had to pull it within a week. The second was an automated report generator — took eight months to build, the output was unusable because it didn't match our house style and the citations were wrong.

**Alex Chen**
That's useful. Both of those are solvable problems, but they're also symptoms of deploying before evaluation. I want to understand your operations before we write a single line of code. I'd like to spend the first two weeks shadowing your team. Not building — watching. Is that acceptable?

**Priya Sharma**
*(pause)* That's not what I expected. Usually vendors come in with decks.

**Alex Chen**
I'll bring a deck to week three. Week one, I want to sit with Olu and whoever does the morning operations review. Can you set that up?

**Priya Sharma**
Yes. I can do that.

---

### Shadow Week — What the Org Chart Doesn't Show

**Week 1 | Tuesday–Friday, 07–10 January 2026**
*FinClear Operations Floor, Level 6*

Alex spends four days in observation mode. She keeps a running note under the headings: **Time wasted | Decisions made | Data touched | Tools switched**.

By Thursday she has filled three pages. The summary:

```
OBSERVATION LOG — FinClear Operations (Wk 1)
=============================================
Olu's morning routine:
  - 07:30: Pulls overnight trade confirmation reports from 3 separate systems
  - 07:45: Manually cross-references against client mandate spreadsheets (Excel, 12 tabs)
  - 08:30: Flags exceptions — average 8–12 per morning
  - 09:00: Writes exception summary email to 6 stakeholders
  - 09:30: First actual analysis work begins

Time on mechanical data aggregation:  ~2 hours daily
Time on judgment-requiring work:       ~6 hours daily
Most common error source:              Mandate spreadsheet out of date (updated quarterly)

Key insight: the 2-hour aggregation is not just slow — it is the CAUSE of stress.
If Olu starts late, the 09:00 email is late, and by 10:00 three VPs are calling.
```

| **16:30 | Friday 10 January 2026 | FinClear Operations — Debrief with Priya** |
|---|

**Alex Chen**
I've identified what I think is your highest-ROI starting point. It's not the six use cases you mentioned on Thursday's call. It's Olu's morning aggregation routine.

**Priya Sharma**
That's... not glamorous. I was expecting something like intelligent portfolio commentary generation.

**Alex Chen**
Portfolio commentary is a better demo. Morning aggregation is a better first deployment. Here's why: it has a clear input, a clear output, a measurable baseline, and it affects every morning's ops rhythm. If it works, Olu goes from two hours of aggregation to fifteen minutes. That's a number you can put in front of the CFO. If it breaks, the blast radius is contained — Olu still has the original process as a fallback.

**Priya Sharma**
*(nodding)* What's the timeline to working?

**Alex Chen**
Four weeks to an internal pilot. Two more weeks to evaluate properly. Then we decide whether to expand.

---

### Discovery: The Technical Reality

**Week 2 | Monday 13 January 2026**
*Meeting with Jordan Lee and Daniel Cho*

| **09:30 | FinClear IT Floor — Technical Discovery Session** |
|---|

*Attendees: Alex Chen | Jordan Lee, Daniel Cho*

**Alex Chen**
I want to understand the data landscape. Walk me through every system that feeds into Olu's morning process.

**Jordan Lee — Lead Engineer, FinClear**
Three systems. The trade confirmation feed comes from our settlement platform — it exports a CSV at 06:00 each morning via SFTP. The client mandate data lives in Salesforce. The exception rules are in — and this is the embarrassing part — a shared Excel file on a SharePoint drive.

**Alex Chen**
Is there an API for the settlement platform?

**Jordan Lee**
REST API, but it requires VPN + internal credentials. It's not documented.

**Alex Chen**
Salesforce?

**Jordan Lee**
Standard Salesforce API. We have credentials.

**Alex Chen**
The Excel file — can it be replaced, or is it sacred?

**Jordan Lee**
Sacred. Compliance owns it. You'd need Aisha's sign-off to touch it.

**Alex Chen**
*(writing)* Okay. So my architecture is: MCP server wraps Salesforce for mandates, MCP server wraps the SFTP trade feed, the Excel file I treat as a document store and chunk into a vector index. Claude orchestrates the morning aggregation, compares trades against mandate rules, and generates the exception email. Does that match your mental model?

**Daniel Cho — Head of Data, FinClear**
Mostly. But I have a concern: the Salesforce data has PII. Client names, account numbers. Are you going to send that to Anthropic's API?

**Alex Chen**
That's the right question. Two options: we run Claude on Azure with data residency controls, or we strip PII at the MCP layer before it reaches the model and re-inject account numbers into the output via a post-processing step. I'd lean toward the second option — it's faster to implement and doesn't require a new cloud agreement.

**Daniel Cho**
*(interested)* Tell me more about that second option.

**Alex Chen**
The MCP server holds a lookup table: account ID → pseudonymous token. The model sees "ACCT-4471" not "James Robertson." After the model produces output, the server substitutes back. The model never touches PII. I can show you the architecture in code by end of week.

---

## STAGE 2 — TECHNICAL ASSESSMENT & COMPLIANCE GATE

**Week 3 | Monday 20 January 2026**

Alex presents her architecture to the full FinClear stakeholder group, including Dr. Aisha Okafor (Compliance) and Marcus Webb (CISO) for the first time.

| **14:00 | Monday 20 January | FinClear — Architecture Review: "AI Morning Ops — Proposed Design"** |
|---|

*Attendees: Alex Chen | Priya Sharma, Jordan Lee, Daniel Cho, Dr. Aisha Okafor, Marcus Webb*

Alex shares a one-page architecture diagram (no PowerPoint — it's a hand-drawn diagram photographed and dropped into a shared doc).

**Marcus Webb — CISO, FinClear**
Before you go further — where does the model run?

**Alex Chen**
Anthropic's API, via our TechAxis enterprise agreement. Data processed under the enterprise data privacy agreement — no training on customer data, 30-day log retention, SOC 2 Type II compliant.

**Marcus Webb**
I need to see those agreements. And I want to know: does the model ever see unmasked account numbers?

**Alex Chen**
No. I'll walk you through the masking layer. *(She opens her laptop and shows 40 lines of Python — the MCP pseudonymisation code she wrote the night before.)* Every Salesforce record goes through this function before it reaches the model. The model sees tokens. The human-readable substitution happens post-output, inside our network perimeter.

**Dr. Aisha Okafor — Head of Compliance, FinClear**
What about the mandate comparison logic? The Excel file contains regulatory mandate terms. If the model misinterprets a mandate and misses an exception, we have a compliance breach.

**Alex Chen**
That's the most important risk in the whole system. My mitigation: the model does not make the compliance decision — it surfaces candidates for human review. The output of the system is always a structured list of *potential* exceptions with the specific mandate clause referenced. Olu reviews and approves before the email goes out. This is a **human-in-the-loop** pattern, not autonomous compliance.

**Dr. Aisha Okafor**
*(softening)* I can work with that framing. Can you put it in writing?

**Alex Chen**
I'll have a one-page human-oversight document to you by Wednesday.

**Marcus Webb**
I still want to run this through our security review process. That's a minimum four weeks.

**Alex Chen**
I understand. Can we run the prototype in a sandboxed environment with synthetic data while the security review runs in parallel? That way we don't lose four weeks of development time.

**Marcus Webb**
*(after a pause)* Define sandboxed.

**Alex Chen**
No production data. No production credentials. Synthetic trade data I generate, synthetic mandate rules I write. Same code, different data source. At the end of the four weeks, if security approves, we swap the synthetic data connectors for real ones. One day of work.

**Marcus Webb**
That's acceptable.

---

## STAGE 3 — PROTOTYPE

**Weeks 4–5 | 27 January – 07 February 2026**

Alex builds the system. She works from FinClear's office three days a week and remote two days. She codes in the mornings and tests with Jordan in the afternoons.

### What She Builds

**Architecture: Morning Ops Agent — v0.1**

```
┌─────────────────────────────────────────────────────┐
│  CLAUDE (claude-sonnet-4-6)                         │
│  System prompt: Operations exception analyst        │
│  Tools: [get_trades, get_mandates, flag_exception]  │
└──────────────┬──────────────────────────────────────┘
               │ tool calls
    ┌──────────┴──────────┐
    ▼                     ▼
┌─────────────┐    ┌──────────────┐
│ MCP Server  │    │ MCP Server   │
│ (Trades)    │    │ (Mandates)   │
│             │    │              │
│ SFTP feed   │    │ Salesforce   │
│ → normalise │    │ + Excel      │
│ → mask PII  │    │ → mask PII   │
└─────────────┘    └──────────────┘
               │
    ┌──────────▼──────────┐
    │ Post-processor       │
    │ - PII re-injection  │
    │ - Email formatter   │
    │ - Human review UI   │
    └─────────────────────┘
```

**System Prompt (v0.1) — excerpt:**

```
You are an operations exception analyst for an asset management firm.
You have access to two tools:
- get_trades(date): returns normalised trade confirmations for a given date
- get_mandates(account_id): returns the investment mandate rules for an account

Your task:
1. Retrieve all trades from today's settlement feed
2. For each trade, retrieve the mandate for that account
3. Compare the trade against the mandate rules
4. If a trade potentially violates a rule, add it to the exceptions list
5. Return a structured JSON object with: confirmed_trades (count), potential_exceptions (list with rule_reference, trade_id, reason)

IMPORTANT: You are surfacing candidates for human review. You are NOT making compliance decisions.
Never state that a trade IS a violation — only that it POTENTIALLY breaches rule [X].
```

**Week 5 | Thursday 05 February 2026 — First Real Test**

Alex runs the prototype against synthetic data for the first time with the full intended workflow.

```
Run 1: 47 synthetic trades, 12 synthetic mandates
Result: 6 exceptions flagged
Expected: 7 exceptions (Alex's ground truth)
Missed: 1 — a currency restriction clause buried in mandate footnote

Run 2 (after prompt revision):
Result: 7 exceptions flagged — 1 false positive
Precision: 6/7 = 86%
Recall: 6/7 = 86%
```

She writes in her Slack to Tom Hale:

**Alex Chen → Tom Hale | 17:23 Thursday**
Prototype works. 86/86 on synthetic data. Not good enough for production yet — the false positive rate needs to come down and I want recall near 100% (missing an exception is worse than flagging a false one). Starting evaluation design tomorrow.

---

## STAGE 4 — EVALUATION HARNESS

**Weeks 6–7 | 10–21 February 2026**

This is the stage most POC teams skip. Alex does not skip it.

| **09:00 | Monday 10 February | Working Session — Alex + Jordan** |
|---|

**Alex Chen**
Before we show Priya any results, we need to build the evaluation framework. I need your help creating the ground truth dataset.

**Jordan Lee**
What do you mean?

**Alex Chen**
I need 200 historical trade-mandate pairs where we *know* the correct answer — exception or not. Can you pull six months of historical data and the compliance team's manual exception logs?

**Jordan Lee**
I can get that. It'll take a few days.

**Alex Chen**
While you're doing that, I'll build the evaluation harness — automated test runner, metrics calculation, LLM-as-judge for borderline cases.

---

**The Evaluation Framework — design sketch Alex sends Jordan:**

```
EVALUATION DESIGN — Morning Ops Agent
======================================

Dataset:
  - 200 historical trade-mandate pairs
  - Labels: {exception: true/false, rule_reference: str, severity: H/M/L}
  - Split: 150 train (for prompt iteration), 50 holdout (for final eval)

Metrics:
  Primary:
    - Recall (must be ≥ 95%) — missing exceptions is the worst failure mode
    - Precision (target ≥ 85%) — false positives create analyst fatigue
  Secondary:
    - Rule reference accuracy — does the cited rule match compliance team's label?
    - Latency: p99 < 30 seconds per daily batch
    - Cost: < $0.50 per morning run

Evaluation method:
  - Automated: exact match on exception/no-exception, rule_reference
  - LLM-as-judge (Claude Opus): for borderline cases where human labels are ambiguous
  - Human spot-check: Dr. Okafor reviews 10 samples per evaluation run

Passing threshold:
  Recall ≥ 95% AND Precision ≥ 80% on holdout set
  Zero critical failures (missed high-severity exceptions)
```

**Week 7 | Friday 20 February — Evaluation Results Presentation**

| **15:00 | Friday 20 February | FinClear — Evaluation Results: v0.4 of the agent** |
|---|

*Attendees: Alex Chen | Priya Sharma, Jordan Lee, Dr. Aisha Okafor*

**Alex Chen**
I'm going to show you numbers, not a demo. I ran v0.4 of the agent against 50 historical cases your compliance team labelled. Here are the results.

```
EVALUATION RESULTS — Morning Ops Agent v0.4
============================================
Dataset: 50 holdout cases (historical, labelled by compliance team)

Recall:     96% (48/50 exceptions caught)
Precision:  88% (48/54 flags were true exceptions)
Rule Ref Accuracy: 91%
Latency (p99): 22 seconds
Cost per run:  $0.31

Failed cases:
  - 2 missed exceptions: both involved mandate amendments made within 24h
    (Excel file update lag — not a model failure, a data freshness issue)
  - 6 false positives: all involved ambiguous mandate language ("permitted
    with conditions") — the model flagged conservatively

Critical failures: 0
```

**Dr. Aisha Okafor**
96% recall. That means one in twenty-five exceptions gets missed?

**Alex Chen**
On this dataset, yes. But look at the failure mode: both misses were caused by the Excel file not being updated in time — not by the model making a wrong inference. If we add a data freshness check that alerts when the mandate file is more than 48 hours stale, those two cases become catches. I estimate real-world recall is higher than 96% once that's fixed.

**Dr. Aisha Okafor**
*(thinking)* Olu currently catches about 70% of exceptions manually. He misses the rest — they get caught in the monthly audit.

**Alex Chen**
So the model at 96% is meaningfully better than the current state, even before the data freshness fix.

**Dr. Aisha Okafor**
*(quietly)* Yes. I'll support moving to pilot.

---

## STAGE 5 — SECURITY REVIEW & PRODUCTION GATE

**Weeks 8–9 | 24 February – 07 March 2026**

Marcus Webb's security review runs in parallel with the evaluation. Alex has four interactions with his team.

**Interaction 1 — Credential storage (Week 8)**

Marcus's team identifies that the MCP server stores Salesforce credentials in a `.env` file. Alex replaces it with Azure Key Vault integration in four hours. She sends Marcus a diff and a test showing the credential is no longer in the codebase.

**Interaction 2 — Prompt injection risk (Week 8)**

Marcus asks: "What happens if a malicious mandate clause contains instructions to the model?"

Alex adds input sanitisation to the mandate preprocessing step — strips HTML tags, removes instruction-like patterns, adds a fixed system prompt preamble that tells the model to treat all tool output as data, never as instructions.

**Interaction 3 — Audit logging (Week 9)**

Marcus requires: every model call must be logged with timestamp, input hash, output hash, and the human who triggered the run. Alex builds a structured audit log written to FinClear's Splunk instance.

**Interaction 4 — Data retention (Week 9)**

Marcus requires: no FinClear data in Anthropic's logs beyond 30 days. Alex confirms with TechAxis legal that the enterprise agreement already specifies this, and sends Marcus the contract clause.

**Week 9 | Wednesday 04 March — Security Sign-Off**

| **10:00 | Wednesday 04 March | Email from Marcus Webb** |
|---|

**Marcus Webb → Alex Chen**
Alex — security review complete. Four findings, all remediated as of last week. No blocking issues. You're cleared to move to production data. Well done on the prompt injection mitigation — that was handled faster than I expected.

**Alex Chen → Marcus Webb**
Thank you, Marcus. I'll send you the production deployment plan for a final eyes-on before we go live.

---

## STAGE 6 — PRODUCTION DEPLOYMENT

**Week 10 | 10–14 March 2026**

Alex and Jordan deploy together. Alex writes the runbook; Jordan owns the infrastructure.

**Production Go-Live Checklist (excerpt):**

```
Pre-deployment (Day -3):
  ☑ Swap synthetic data connectors for production Salesforce + SFTP credentials
  ☑ Smoke test against last week's real trade data (compare to Olu's manual output)
  ☑ Audit log verified writing to Splunk
  ☑ Key Vault credential rotation tested
  ☑ Human review UI accessible to Olu and 2 backup analysts

Day 0 (Monday 10 March):
  ☑ 06:00: SFTP feed parsed successfully
  ☑ 06:15: Mandates loaded from Salesforce
  ☑ 06:28: Agent completes exception analysis (28 seconds — within SLA)
  ☑ 07:45: Olu reviews 9 flagged exceptions, approves 7, dismisses 2
  ☑ 09:00: Exception email sent (8 minutes earlier than Olu's previous average)

Day 1–5 metrics:
  Recall: 94% (47/50 true exceptions caught across the week)
  Precision: 91%
  Olu's review time: 18 minutes average (vs. 120 minutes historical baseline)
  Zero missed high-severity exceptions
```

| **09:15 | Tuesday 11 March | FinClear — Ops Floor (Olu's desk)** |
|---|

**Olu Adeyemi — Operations Analyst, FinClear**
Alex — I have to say, yesterday I had forty-five minutes of thinking time before the 09:00 call. That hasn't happened in three years. I used it to actually read one of the mandate documents I never have time for. And I found a clause we've been interpreting wrong for six months.

**Alex Chen**
*(making a note)* That's exactly what this is supposed to do. The time savings aren't just efficiency — they create capacity for the high-judgment work you're actually here to do. Can I quote you on that for the CFO presentation?

**Olu Adeyemi**
*(laughing)* Yes. Please use my name.

---

## STAGE 7 — SCALE & EXPANSION

**Weeks 11–12 | 17–28 March 2026**

With Week 10 metrics in hand, Priya calls a steering committee. The question: expand to the other five use cases or stabilise first?

| **14:00 | Wednesday 18 March | FinClear — Steering Committee** |
|---|

*Attendees: Priya Sharma, Ruth Perkins (CFO), Dr. Aisha Okafor, Marcus Webb | Alex Chen*

**Alex Chen** *(presenting)*
Here's what we know at Day 8 of production:

```
Morning Ops Agent — Production Week 1 Summary
==============================================
Time saved per analyst per day: ~100 minutes
Analysts using the system: 3
Weekly time saved: ~25 person-hours
Annualised: ~1,300 person-hours

Current analyst fully loaded cost: ~$95/hr
Annual value of time recovered: ~$123,500

AI system cost (API + infrastructure): ~$3,600/year
ROI: 34x in year 1, labour savings alone
(Not including value of the missed clause Olu found in Week 1)
```

**Ruth Perkins — CFO, FinClear**
34x ROI. Is that conservative or optimistic?

**Alex Chen**
Conservative. It only counts one use case, and it only counts three analysts. We have twelve analysts who could use this across two more desks. The real ROI is higher.

**Ruth Perkins**
What's the risk of expanding?

**Alex Chen**
The risk of expanding *without a good evaluation framework for each new use case* is high. The risk of expanding with the same methodology we used here — shadow work, evaluation harness, security review — is manageable. My recommendation: pick one of the five remaining use cases, run the same process, add 8 weeks. Don't try to do all five at once.

**Priya Sharma**
Which one next?

**Alex Chen**
Portfolio commentary generation. It's the one that excited you on Day 1, and now we have the infrastructure — MCP servers, auth, audit logging — already in place. The new piece is the output quality evaluation for long-form text. I have a framework for that.

**Ruth Perkins**
*(to Priya)* Approve the next phase.

---

## STAGE 8 — KNOWLEDGE TRANSFER & HANDOFF

**Weeks 13–14 | 31 March – 11 April 2026**

Alex's mandate is to make herself unnecessary. This stage is as important as the build.

| **09:00 | Monday 31 March | Handoff Planning Session — Alex + Jordan** |
|---|

**Alex Chen**
Jordan, by April 11th you need to be able to: deploy a new version of the agent, update the mandate MCP server when the Excel schema changes, run the evaluation harness against a new dataset, and debug a production failure without me. Let's spend two weeks making that true.

**Jordan Lee**
What about when the prompts need tuning? I've never done prompt engineering.

**Alex Chen**
That's what I'm writing this week. A prompt tuning playbook specific to this system — not generic, not theoretical. The actual failure modes we've seen, the changes that fixed them, and the evaluation check you run after each change to verify it worked.

**Jordan Lee**
What if something goes wrong that's completely new — something we haven't seen?

**Alex Chen**
You call me. I'll be reachable for 30 days post-handoff as escalation. But my job is to make sure the 80% of scenarios you'll face are covered by the playbooks. The 20% edge cases — let's document everything you've seen so far and I'll write runbooks for each one.

---

**Handoff Documentation Package (delivered Week 14):**

```
HANDOFF PACKAGE — FinClear Morning Ops Agent
=============================================

1. ARCHITECTURE RUNBOOK
   - System diagram with all components
   - Deployment instructions (step-by-step)
   - Rollback procedure

2. PROMPT TUNING PLAYBOOK
   - Current system prompt + rationale for each line
   - Known failure modes + what fixed them
   - How to run evaluation after a prompt change

3. EVALUATION HARNESS GUIDE
   - How to add new test cases to the dataset
   - How to interpret metrics
   - What triggers a production rollback (Recall < 90%)

4. INCIDENT RUNBOOK
   - SFTP feed failure → fallback procedure
   - Salesforce API downtime → cached mandate mode
   - Model latency spike → cost/quality mitigation

5. ESCALATION MATRIX
   - Jordan Lee: day-to-day ops (primary)
   - Daniel Cho: data/infra changes
   - Alex Chen (TechAxis): 30-day escalation window
   - Anthropic Support: model/API issues

6. EXPANSION GUIDE FOR NEXT USE CASE
   - Phase checklist for onboarding portfolio commentary generation
   - Reusable MCP servers (Salesforce already done)
   - New component: long-form text evaluation framework
```

---

| **16:00 | Friday 11 April 2026 | Final Handoff Call** |
|---|

*Attendees: Alex Chen, Tom Hale | Priya Sharma, Jordan Lee, Ruth Perkins, Dr. Aisha Okafor*

**Priya Sharma**
Alex, when we spoke in January I said I didn't want another POC. What we have now is not a POC. It is the most useful tool my team has used in four years. Thank you.

**Alex Chen**
This worked because your team was willing to show me the real work — not the work you wanted to show a vendor. Olu sitting with me for a week in January is the reason we built the right thing.

**Ruth Perkins**
We're extending the contract. Priya has executive sponsorship for portfolio commentary as phase two.

**Tom Hale**
*(visibly pleased)* We're very glad to hear that.

**Alex Chen**
*(to Jordan)* You're ready. The hard stuff is already done — the auth infrastructure, the security review, the evaluation framework. Phase two is building on a solid foundation. Don't let anyone rush the discovery phase.

**Jordan Lee**
*(wryly)* I'll tell them you said so.

**Alex Chen**
Tell them the data says so. That's better.

---

## After the Engagement — What Alex Carried Forward

Three weeks after the FinClear handoff, Alex writes her engagement retrospective for the TechAxis FDE knowledge base.

```
ENGAGEMENT RETROSPECTIVE — FinClear, Q1 2026
Alex Chen, FDE

WHAT WORKED:
- Spending Week 1 in shadow/observation before writing a line of code.
  The morning aggregation use case was not in Priya's original six — I found it
  by watching. It was the right starting point.

- Running evaluation before the stakeholder demo. By the time Priya saw "96% recall",
  she understood what that meant because Aisha had explained the baseline.
  The number landed with weight.

- The CISO (Marcus) became an ally because I moved fast on his findings.
  Four security findings, all remediated in under 48 hours. He wrote a positive
  note to Tom. That almost never happens.

- PII masking at the MCP layer. Daniel's question in Week 3 was legitimate.
  Having a working code answer ready (not just a verbal answer) changed the room.

WHAT DIDN'T WORK:
- I underestimated the mandate data freshness problem. It caused 2 of my
  missed exceptions in evaluation. I should have asked about data update frequency
  in Week 1 discovery, not discovered it in Week 6.

- The first week I tried to compress discovery into 3 days. Priya pushed back.
  She was right. Discovery can't be rushed.

THINGS I'LL DO DIFFERENTLY:
- Add data freshness as a mandatory discovery question (when was this last updated?
  what triggers an update? who owns it?)

- Start the security review on Day 1 of prototype, not after prototype is done.
  Four weeks of parallel running saved us; starting it earlier would have saved more.

REUSABLE ARTIFACTS (added to TechAxis FDE library):
- PII masking MCP layer (Python, Salesforce connector)
- Exception detection system prompt template
- Evaluation harness (configurable for any structured classification task)
- Handoff documentation package template
```

---

## What This Engagement Demonstrates — FDE Skill Summary

| Phase | FDE Skill Demonstrated | Study Guide |
|-------|----------------------|-------------|
| Discovery | Shadowing to find the real use case, not the stated one | [EA Deep Dive Guide](../../enterprise-architecture/process/Enterprise_AI_Architect_Deep_Dive_Guide) |
| Discovery | CISO/compliance engagement as Day 1 stakeholders, not blockers | [Agentic AI Security Guardrails](../../enterprise-architecture/ai-architecture/agentic-ai-security-guardrails) |
| Assessment | MCP architecture with PII masking | [MCP Deep Research 2026](../../ai-protocols/mcp/MCP_Deep_Research_2026) |
| Assessment | Tool auth design (Key Vault, Salesforce OAuth) | [Tool Authentication & Connectors](../../ai-protocols/auth/tool-authentication-connectors) |
| Prototype | System prompt engineering for compliance-safe output | [Prompt Engineering for Claude 4](../../coding-tools/claude/prompt-engineering-claude-4) |
| Prototype | HITL pattern — model flags, human decides | [Human-in-the-Loop Architectures](../../workflow-orchestration/human-in-the-loop-architectures) |
| Evaluation | Evaluation harness before stakeholder demo | [AI Agent Evaluation Framework](../../ai-development/testing/AI_Agent_Evaluation_Framework_Guide) |
| Evaluation | LLM-as-judge for borderline cases | [AI Agent Evaluation Framework — Complete](../../ai-development/testing/AI_Agent_Evaluation_Framework_Complete) |
| Production | Audit logging, prompt injection mitigation | [Agentic AI Security Guardrails](../../enterprise-architecture/ai-architecture/agentic-ai-security-guardrails) |
| Scale | ROI framing with conservative estimates for CFO | [AI Value Creators Synthesis](../../ai-economics/ai-value-creators-synthesis) |
| Handoff | Prompt tuning playbook, incident runbook | [Enterprise AI Lifecycle Deliverables](../../enterprise-architecture/process/ai-solution-lifecycle-deliverables) |

---

*This transcript is a composite illustrative account for study purposes. Character names are fictional. Modelled on real FDE engagement patterns from Anthropic, Palantir, and Scale AI deployment literature, 2025–2026.*

*Last reviewed: 2026-07-13*
