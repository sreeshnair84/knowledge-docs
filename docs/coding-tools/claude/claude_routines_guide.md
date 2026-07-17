---
title: 'Claude Routines — Complete Help Guide'
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: converted-html
source_file: 'claude_routines_guide.html'
doc_type: guide
tags: [claude-code, coding-tools, workflows, reference]
covers_version: "2026"
---

# Claude Routines — Complete Help Guide

⚡

Claude Routines 

Getting Started

🗺 Overview 📊 Three Scheduling Tiers 🔀 Which to Choose

Cloud Routines

☁️ What Are Routines? NEW ⚡ Trigger Types 🧩 Core Components ✨ Creating Routines 📏 Limits & Pricing

Session Scheduling

🔁 /loop Command ⏰ Cron Reference 📄 loop.md 📌 One-Time Tasks

Design Patterns

💡 Use Cases ✍️ Prompt Design 📦 Skills in Routines ⚠️ Anti-Patterns

Reference

⚖️ vs GitHub Actions 📋 Quick Reference

Research Preview · Launched April 14, 2026 

## Claude _Routines_
& Scheduled Tasks

The complete guide to automated, persistent AI workflows — from in-session /loop commands to cloud-native Routines that run while your laptop is closed.

☁️ Cloud-managed infrastructure

🔔 Schedule · API · GitHub webhooks

📋 Pro plan required ($20/mo)

🔖 v2.1.72+ required for /loop

CLI / Session

🖥

### /loop

/loop 5m check deploy

Quick, in-session polling. Lives inside an active terminal and stops when you exit.

Runs onYour machine

Machine must be onYes

Session requiredYes

Min interval1 minute

Max tasks50 per session

Auto-expires7 days

Desktop

🖱

### Desktop Scheduled Tasks

Sidebar → Schedule → + New task

Persistent local tasks. Survive restarts. Fire each session at your chosen interval with full local file access.

Runs onYour machine

Machine must be onYes

Session requiredNo

Min interval1 minute

Local filesYes ✓

Worktree isolationSupported

New · Apr 2026

☁️

### Cloud Routines

/schedule or claude.ai/code/routines

Runs on Anthropic's managed infrastructure. Laptop can be closed. Trigger by schedule, API call, or GitHub event.

Runs onAnthropic cloud

Machine must be onNo ✓

Session requiredNo ✓

Min interval1 hour

Local filesNo (fresh clone)

GitHub triggerYes ✓

01

## Which Should You Use?

❓ Does the task need to run when your laptop is closed or overnight?

Yes

☁️ Cloud Routines

Only option that runs fully unattended on Anthropic's infra

No — needs local files

🖱 Desktop Tasks

Full access to your filesystem, MCP servers, and plugins

No — quick in-session

🖥 /loop

Fastest to set up; good for "babysit this build" style polling

Scenario| Best Tier| Why  
---|---|---  
Poll deployment for 20 minutes| `/loop 5m`| Session-scoped, simple, zero setup  
Daily 7am standup briefing| Desktop Task| Local calendar/Slack access, persistent schedule  
Nightly security scan at 2am| Cloud Routine| Laptop closed; must run unattended  
Auto-review every new PR| Cloud Routine| GitHub webhook trigger, runs in cloud per event  
Run on external system trigger| Cloud Routine| API trigger accepts any HTTP POST  
Babysit a long-running test| `/loop 10m`| Interactive, can cancel with Esc  
  
02

## Cloud Routines — What They Are

Cloud Routines (launched April 14, 2026 as a research preview) run on Anthropic's managed infrastructure. You configure a prompt, repository, and connectors once — then the routine executes on its own trigger without any active session or open laptop required.

**The key difference from traditional automation:** a Routine is an agent, not a script. It receives a prompt and decides how to reach the outcome. It can reason about what it encounters, self-heal errors, and adapt execution to context — unlike a GitHub Actions workflow that runs commands you pre-defined.

☁️

**Anthropic-Managed Infrastructure**

You don't provision servers, configure environments, or manage cron infrastructure. Anthropic handles the execution environment, container lifecycle, and retry logic. The execution environment is a fresh, sandboxed container with a fresh repository clone on each run.

⚠️

**No Local File Access**

Cloud Routine containers clone your repository fresh on each run. They cannot access files from your local machine, local MCP servers, or local plugin configs. Skills must be stored in the repository or a secondary repository. See Skills in Routines for the workaround pattern.

03

## Trigger Types

A single Routine can combine multiple trigger types. GitHub triggers have per-routine and per-account hourly caps during preview — events beyond the limit are dropped until the window resets.

🕐

### Schedule Trigger

Time-based recurring execution. Use presets (Hourly, Daily, Weekdays, Weekly) or any valid 5-field cron expression.

Min interval: 1 hour  
Cron syntax: standard 5-field  
❌ Sub-hourly cron rejected 

🔗

#### API Trigger

HTTP POST to a per-routine endpoint with a bearer token. Any external system — Jenkins, Slack bot, monitoring tool — can fire a Routine.

Method: POST  
Auth: Bearer token  
Body: optional context JSON 

🐙

#### GitHub Event Trigger

Fire on PR opened, PR merged, release published, push, and other repository events. Branch security: Claude pushes only to `claude/`-prefixed branches by default.

PR opened / merged  
Release published  
Push to branch 

💡

**Branch Security Default**

By default Claude can push only to branches prefixed `claude/`. This prevents a poorly written routine from touching `main`. Disable only where you have robust downstream review processes.

04

## Core Components of a Routine

Every Routine has four configurable parts. Getting these right is the difference between a routine that runs reliably and one that fails silently.

📝

### Prompt

Natural language instructions describing what Claude should do. Since the routine runs autonomously, the prompt must be **fully self-contained** — explain what to do, what to verify, how success looks, and how to handle edge cases. No references to context missing from the clean cloud session.

⚡

#### Triggers

The event that starts the routine. Schedule (recurring), GitHub Event (PR, push, release), or API (HTTP endpoint). A single routine can combine multiple triggers. GitHub and API triggers must be configured in the web UI.

🏗

#### Environment

The sandboxed execution context. Configure: **Network access** (blocked by default, or allowlisted domains / trusted / full), **environment variables** for secrets and API keys, and **setup scripts** that run before Claude Code launches.

🔌

#### Connectors

Pre-built integrations with external services. Currently: **Slack** (read/write), **Gmail** , **Google Calendar** , **GitHub** (full repo access). Each connector provides tools Claude can call natively within the routine.

### Network Access Modes

Mode| What's Allowed| Best For  
---|---|---  
Blocked (default)| No outbound requests| Pure code analysis, no external data needed  
Custom (allowlist)| Only specified domains| RSS feeds, specific APIs — most secure option  
Trusted| Pre-approved Anthropic list| Common services without custom allowlisting  
Full| Unrestricted internet| General research; use with caution  
  
05

## Creating Your First Routine

### Method 1 — CLI (Schedule triggers only)

Terminal Copy
    
    
    # One-liner — Claude parses, asks clarifying questions, creates the routine
    /schedule Create a daily 9am trigger that fetches RSS from JavaScript Weekly,
    picks 10 good articles for YouTube, and sends to Slack #dev-feed
    
    # Or from any active session — creates a cloud routine, not a local task
    /schedule daily PR review at 9am on weekdays

ℹ️

**Claude asks clarifying questions**

After your `/schedule` command, Claude will ask clarifying questions to fill in details (destination channel, selection criteria, etc.) before creating the routine. Answer them, and Claude confirms creation and provides a link to manage it in the web UI.

### Method 2 — Web UI (all trigger types)

  1. **Navigate to Routines**

Go to `claude.ai/code/routines` and click **New routine**. This is the only place to create API or GitHub event triggers.

  2. **Write your prompt**

Be specific and self-contained. Include: what to do, what success looks like, how to handle edge cases, and what outputs to produce. The routine runs without you present.

  3. **Choose your trigger(s)**

Select Schedule (cron preset or custom expression), GitHub Event (pick event type and repository), or API (generates a bearer-token endpoint). You can combine multiple triggers on one routine.

  4. **Configure the environment**

Add network access if the task fetches external data. Set environment variables for API keys and secrets. Add a setup script if the routine needs dependencies installed before Claude launches.

  5. **Add connectors**

Connect Slack, Gmail, or GitHub to give Claude tools it can call. Each connector grants specific read/write actions in that service.

  6. **Test with Run now**

Hit **Run now** before relying on the schedule. Watch the live log — if an approach fails, Claude self-corrects and retries. Fix any issues (network access, connector auth, prompt ambiguities) now.

✅

**Always run at least one manual test**

Edge cases appear in the first week. Catching permission issues, connector auth problems, and output formatting errors (e.g., Slack's `invalid_blocks` from `---` dividers) in a test run costs nothing. Catching them after the routine has been running for a week costs much more.

06

## Plan Limits & Pricing

Free

—

Routines not available

$0/mo

Pro

5

runs per day

$20/mo

Max

15

runs per day

$100/mo

Team / Enterprise

25

runs per day

Custom

💰

**Metered Overage Available**

Routines draw down the same subscription limit as interactive sessions. Organizations with extra usage enabled can go past the cap at metered overage rates. Monitor usage at `claude.ai/settings/usage`. GitHub triggers have additional per-routine and per-account hourly caps — events beyond the limit are dropped until the window resets.

### Token Cost Per Run

Each Routine run consumes inference tokens based on: the prompt length, any context Claude reads (repository files, fetched URLs), and the output it produces. There's no separate fee for Routines — you pay standard Claude API rates for usage. A large `CLAUDE.md` file consumes a significant portion of the session token budget on every run — keep it concise for cloud contexts.

07

## /loop — Session Scheduling

The `/loop` bundled skill is the quickest way to run a prompt on repeat within an active session. Both interval and prompt are optional.

Command| Behavior  
---|---  
`/loop 5m check if the deployment finished`| Fixed interval — runs every 5 minutes  
`/loop check if the deployment finished`| Dynamic interval — Claude chooses delay based on what it observes  
`/loop 20m /review-pr 1234`| Re-runs a slash command on a schedule  
`/loop`| Runs built-in maintenance prompt (PR triage, bug hunts) at dynamic interval  
`/loop 15m`| Runs built-in maintenance prompt every 15 minutes  
  
### Interval Units

Examples
    
    
    /loop 30s  # 30 seconds — rounded up to 1 minute (cron minimum)
    /loop 5m   # Every 5 minutes
    /loop 2h   # Every 2 hours
    /loop 1d   # Once per day
    # Intervals like 7m are rounded to nearest clean cron step — Claude tells you what it picked

### Dynamic Interval Behavior

When you omit the interval, Claude chooses a delay between 1 minute and 1 hour based on what it observes: short waits while a build is active, longer waits when nothing is pending. Claude may use the **Monitor tool** instead of polling — which streams background script output and is more token-efficient for event-driven watching.

### Stopping a Loop

Press `Esc` to stop a `/loop` while it's waiting for the next iteration. This clears the pending wakeup. Tasks you scheduled by asking Claude directly (e.g. "remind me at 3pm") are _not_ affected by Esc — cancel those explicitly.

08

## Cron Expression Reference

Standard 5-field cron expressions. All times use your local timezone for `/loop` and Desktop tasks; UTC for Cloud Routines. Cloud Routines reject expressions that run more frequently than once per hour.

⏱

**Format: minute hour day-of-month month day-of-week**

Fields support: `*` (wildcard), single values (`5`), steps (`*/15`), ranges (`1-5`), comma lists (`1,15,30`). Day-of-week: `0` or `7` = Sunday. Extended syntax like `L`, `W`, `?`, and name aliases (`MON`, `JAN`) are NOT supported.

Common Cron Expressions

0 9 * * 1-5 9:00 AM every weekday Daily standup briefing

0 2 * * * 2:00 AM every night Nightly security scan

0 8 * * 1 8:00 AM every Monday Weekly review digest

0 * * * * Every hour (top of hour) Use 3 * * * * to avoid jitter

0 18 * * 5 6:00 PM every Friday End-of-week PR summary

0 9,17 * * 1-5 9 AM and 5 PM on weekdays Twice-daily email triage

30 6 1 * * 6:30 AM on the 1st of each month Monthly report generation

💡

**Jitter Awareness**

The scheduler adds a small deterministic offset to fire times. Recurring tasks may fire up to 10% of their period late (capped at 15 min). One-shot tasks at :00 or :30 fire up to 90 seconds early. To avoid jitter: use minutes like `3 9 * * *` instead of `0 9 * * *`.

09

## Customizing /loop with loop.md

A `loop.md` file replaces the built-in maintenance prompt with your own default. It defines the prompt for a bare `/loop` invocation. It is ignored when you supply a prompt on the command line.

Path| Scope  
---|---  
`.claude/loop.md`| Project-level. Takes precedence when both exist.  
`~/.claude/loop.md`| User-level. Applies in any project without its own.  
  
.claude/loop.md — Release branch keeper Copy
    
    
    Check the `release/next` PR. If CI is red, pull the failing job log,
    diagnose, and push a minimal fix to a `claude/fix-*` branch. If new review
    comments have arrived, address each one and resolve the thread.
    If everything is green and quiet, say so in one line.
    
    # Constraints
    - Never push directly to `main` or `release/next`
    - Only fix failures you can diagnose from the log alone
    - If the fix requires context you don't have, leave a comment and stop

📏

**Size Limit**

Content beyond 25,000 bytes is truncated. Keep `loop.md` concise. Edits take effect on the next iteration — you can refine instructions while a loop is running.

10

## One-Time Reminders

For single-fire tasks, use natural language directly — no `/loop` needed. Claude schedules a single-fire task that deletes itself after running.

Natural language examples
    
    
    # Relative time
    in 45 minutes, check whether the integration tests passed
    
    # Absolute time
    remind me at 3pm to push the release branch
    
    # After an event
    when the CI run finishes, tell me the result and suggest next steps

Claude pins the fire time to a specific minute using a cron expression and confirms when it will fire. One-shot tasks resume on `--resume` or `--continue` if the scheduled time hasn't passed yet. Background Bash and Monitor tasks are never restored on resume.

11

## High-Value Use Cases

📬

### Email Triage

Schedule: Daily 7:00 AM · Connectors: Gmail

Fetch unread emails from last 24h. Classify by urgency. Draft replies for routine questions. Flag anything needing human judgment with a summary in Slack.

🔍

#### Automated PR Review

Trigger: GitHub PR opened · Connector: GitHub

On every new PR: analyze code changes, check for security vulnerabilities, verify test coverage, and post a structured review comment directly on the PR.

📰

#### Content Curation

Schedule: Daily 9:00 AM · Network: Custom allowlist

Fetch RSS feeds from target publications. Select articles matching your criteria. Format and post to Slack #reading-list. Avoid previously sent articles.

📊

#### Weekly Status Report

Schedule: Friday 5:00 PM · Connectors: GitHub + Slack

Compile merged PRs, closed issues, and open blockers from the week. Generate a formatted summary. Post to Slack #weekly-update and create a Google Doc archive.

🔐

#### Nightly Security Scan

Schedule: Daily 2:00 AM · Network: Trusted

Clone repo, run dependency audit, check for newly published CVEs in used packages. Alert Slack #security immediately for CRITICAL findings. Weekly digest for lower severity.

📣

#### On-Call Alert Triage

Trigger: API (from PagerDuty/monitoring) · Full network

External monitoring fires HTTP POST to the API trigger. Claude analyzes alert context, checks recent deployments, suggests root cause, and posts runbook to the on-call Slack thread.

12

## Prompt Design for Routines

The prompt is the most important part of any Routine. Since it runs autonomously in a fresh cloud container, it must be completely self-contained. Here's the anatomy of a well-written Routine prompt:

Routine Prompt — Anatomy Copy
    
    
    ## What to do (specific action steps)
    1. Fetch all unread emails from the last 24 hours using the Gmail connector.
    2. For each email: classify as [URGENT / ACTION / FYI / SPAM].
    3. Draft a reply for any [ACTION] email that has a clear, short answer.
    4. Compile a summary table: sender | subject | classification | action taken.
    
    ## What success looks like (verification criteria)
    - All emails classified
    - Replies drafted for ACTION items where a reply is clearly appropriate
    - Summary posted to Slack #daily-triage
    
    ## How to handle edge cases
    - If the email requires information you don't have: classify as NEEDS-HUMAN and skip drafting
    - If Gmail connector fails: log the error and post an alert to Slack, then stop
    - Never send emails — only draft. Always require human approval before sending.
    
    ## Output format
    Post a Slack message with:
    - Header: "Email Triage — {date}"
    - Table: sender | subject | classification | action
    - Footer: total count by classification
    - Use plain text, no --- dividers (causes Slack invalid_blocks errors)

### Prompt Writing Rules

Rule| Why It Matters  
---|---  
State the goal, not just the steps| Claude can self-correct if a step fails while still achieving the goal  
Define success explicitly| Claude knows when to stop; prevents over-execution  
Handle the error path| Routines run unattended — silent failures are invisible  
Specify output format exactly| Connector formatting quirks (Slack's invalid_blocks from `---`) must be pre-empted  
No references to missing context| Fresh container — no session history, no local state  
Start with human-in-the-loop| Drafts → human approves → auto-send as trust grows  
  
13

## Using Skills in Cloud Routines

Cloud Routine containers are fresh and have no access to skills defined on your local machine. The solution is a **secondary GitHub repository** that stores skills and is cloned alongside the primary repository.

  1. **Create a skills repository**

Create a GitHub repo (e.g., `routine-env`) with your skill files at `.agents/skills/skill-name/SKILL.md`. This repo serves as your cloud skill library.

  2. **Add the skills repo to your Routine config**

In the web UI, add `routine-env` as a secondary repository to the Routine. It will be cloned into the cloud container alongside your main repository.

  3. **Add a SessionStart hook to copy skills**

A `.claude/settings.json` in the skills repo tells Claude to copy skills into the right directory at session start:

routine-env/.claude/settings.json Copy
    
    
    {
      "hooks": {
        "SessionStart": {
          "hooks": [
            {
              "type": "command",
              "command": "[ ! -d ~/.agents/skills ] && cp -r ~/routine-env/.agents/skills/. ~/.agents/skills"
            }
          ]
        }
      }
    }

✅

**The Skills Repository Pattern**

This is likely to become the standard pattern for Routines involving complex or reusable task definitions. A skills repository lets you version-control your automation logic separately from your application code, and share it across multiple Routines.

14

## Anti-Patterns to Avoid

⛔

Vague or Stateful Prompts

Writing prompts like "check the usual stuff" or "continue from where you left off." Cloud containers start fresh — there is no session state, no previous context, no memory of last run.

**Fix:** Every prompt must be fully self-contained. Define what to check, what sources to use, and what to produce — as if explaining to someone with no context at all.

⛔

Skipping the Manual Test

Activating a Routine without ever running it manually. Common failure modes: network blocked for a needed domain, connector auth expired, Slack formatting errors (--- dividers), missing environment variables.

**Fix:** Always click "Run now" at least once and review the live log before relying on the schedule. Fix all issues in the prompt or environment config before going live.

⛔

Sub-Hourly Cron on Cloud Routines

Attempting to set a Cloud Routine with a cron expression that fires more than once per hour (e.g., */30 * * * *). Cloud Routines reject these expressions — minimum interval is 1 hour.

**Fix:** For sub-hourly polling, use /loop in an active session or Desktop Scheduled Tasks. Cloud Routines are for longer-cadence, unattended workflows.

⛔

Bloated CLAUDE.md for Cloud Routines

Using a large CLAUDE.md file in your project that was written for interactive development. Every token in CLAUDE.md is consumed on each routine run. A 200-line CLAUDE.md wastes significant budget every execution.

**Fix:** Create a minimal CLAUDE.md (or none) for Routine-specific repositories. Put all instructions in the Routine prompt itself — it's loaded fresh each run anyway.

⛔

Full Network Access by Default

Using "Full" network access for all Routines because it's simpler. This allows the Routine to reach any external endpoint, increasing the blast radius if the prompt is poorly written or the repository is compromised.

**Fix:** Use "Custom" allowlist mode for specific domains, or "Trusted" for pre-approved services. Only use "Full" when the task genuinely requires unrestricted access and you accept the security tradeoff.

⛔

Using /loop Instead of Routines for Overnight Tasks

Leaving a /loop running overnight, requiring your machine to stay on and the terminal to stay open. This is fragile — a sleep, crash, or network drop kills the loop silently.

**Fix:** If a task needs to run while your laptop is off, it's a Cloud Routine. /loop is for in-session monitoring you're actively watching.

15

## Routines vs GitHub Actions

The question teams consistently ask: should I replace GitHub Actions with Routines? The answer is nuanced — they serve different purposes and work best together.

Dimension| Cloud Routines| GitHub Actions  
---|---|---  
Type of work| Judgment-based — reads, reasons, adapts| Deterministic — runs commands you defined  
Trigger| Schedule, API, GitHub event| Git events, schedule, manual, API  
Execution| Claude agent making decisions| YAML steps, shell commands  
Self-healing| Yes — Claude retries with different approach| No — fails on unexpected state  
Build / test / deploy| ⚠️ Possible but not ideal| ✅ Purpose-built  
Code review with context| ✅ Purpose-built| ⚠️ Possible with complex prompts  
Alert triage| ✅ Excels at reasoning about context| ⚠️ Very limited  
Cost model| Token-based (inference cost)| Runner minutes (fixed)  
Predictability| Probabilistic (AI reasoning)| Deterministic (scripted)  
  
🏆

**Recommended: Use Both Together**

Many production teams combine them: **Routines for the thinking work** (code review, bug triage, alert analysis, documentation updates) and **Actions for the mechanical work** (build, test, deploy). A Routine can review a PR; an Action builds and deploys it. They complement each other — neither replaces the other.

16

## Quick Reference

### Key URLs

URLs
    
    
    claude.ai/code/routines        # Create and manage Routines
    claude.ai/settings/usage       # Monitor run consumption
    code.claude.com/docs/en/routines         # Official Cloud Routines docs
    code.claude.com/docs/en/scheduled-tasks # /loop and session tasks docs
    code.claude.com/docs/en/desktop-scheduled-tasks # Desktop tasks docs

### Essential Commands

CLI Commands
    
    
    # Create a cloud routine from CLI (schedule triggers only)
    /schedule daily 9am briefing that summarizes Slack and email
    
    # Loop with fixed interval
    /loop 5m check if the deployment finished
    
    # Loop with dynamic interval (Claude chooses delay)
    /loop check CI and address any review comments
    
    # One-time reminder
    remind me at 3pm to push the release branch
    
    # Manage tasks
    what scheduled tasks do I have?
    cancel the deploy check job
    
    # Check version (need v2.1.72+ for scheduled tasks)
    claude --version
    
    # Disable scheduler entirely
    export CLAUDE_CODE_DISABLE_CRON=1

### Setup Checklist for a New Cloud Routine

  1. **Write a self-contained prompt**

Goal + steps + success criteria + error handling + output format. No references to missing context.

  2. **Choose the minimum network access**

Custom allowlist > Trusted > Full. Blocked if no external calls needed.

  3. **Set environment variables for secrets**

Never hardcode API keys in the prompt. Use env vars in the Environment config.

  4. **Add connectors you actually need**

Only add Slack/Gmail/GitHub if the routine uses them. Unused connectors add surface area.

  5. **Click Run now and watch the log**

Fix any network, auth, or formatting issues before activating the schedule.

  6. **Monitor the first week's runs**

Edge cases surface early. Adjust the prompt based on what you see in the run logs.

