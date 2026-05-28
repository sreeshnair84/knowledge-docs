# GitHub Copilot: Zero to Hero Guide
### The Complete Playbook — Features, Agents, Automated Pipelines & Gated Deployments

---

## Table of Contents

1. [What Is GitHub Copilot?](#1-what-is-github-copilot)
2. [Plans & Pricing](#2-plans--pricing)
3. [Core Features A–Z](#3-core-features-az)
4. [Copilot Customization Primitives](#4-copilot-customization-primitives)
5. [The Agent Ecosystem](#5-the-agent-ecosystem)
6. [Skills, Hooks & MCP Servers](#6-skills-hooks--mcp-servers)
7. [The Fully Automated Agentic DevOps Loop](#7-the-fully-automated-agentic-devops-loop)
8. [Gated PR Pipeline — Step by Step](#8-gated-pr-pipeline--step-by-step)
9. [Gated Deployment Pipeline](#9-gated-deployment-pipeline)
10. [Repository Structure for Agentic DevOps](#10-repository-structure-for-agentic-devops)
11. [Reference: Agent Role Cards](#11-reference-agent-role-cards)
12. [Troubleshooting & Best Practices](#12-troubleshooting--best-practices)

---

## 1. What Is GitHub Copilot?

GitHub Copilot is AI that works where you do — in your editor, on the command line, and across GitHub. It has evolved from an inline code-completion tool into a full **Agentic DevOps platform** that can research a codebase, plan work, implement changes, open pull requests, review code, triage issues, and gate deployments — all autonomously.

> **Mental model:** Copilot is no longer a pair programmer sitting next to you. It is an AI team of specialists you assign work to, each operating with defined capabilities, guardrails, and approval gates.

---

## 2. Plans & Pricing

| Plan | Best For | Key Limits |
|---|---|---|
| **Free** | Individuals trying Copilot | Limited completions, chat, and agent usage per month |
| **Pro** | Individual developers | Unlimited completions, premium models, cloud agent access |
| **Pro+** | AI power users | Larger premium request allowance, all models including Claude Opus & GPT-4o |
| **Max** | Heavy agentic workflows | Highest allotment, usage-based billing (from June 1, 2026) |
| **Business** | Teams & orgs | Centralized policy control, cloud agent, admin dashboard |
| **Enterprise** | Large enterprises | All Business features + knowledge bases, IP indemnity, audit logs |

> **Note:** From June 1, 2026, GitHub moves to **usage-based billing**. Plans include "base credits" (matched 1:1 to subscription price) plus a variable "flex allotment." Hooks, coding agent, and MCP are available on Pro+, Business, and Enterprise.

---

## 3. Core Features A–Z

### 3.1 Code Completions (Inline Suggestions)
Autocomplete-style suggestions as you type in VS Code, Visual Studio, JetBrains, Neovim, Xcode, and Eclipse. Supports all languages present in public repositories — JavaScript, Python, TypeScript, Go, Rust, Java, and many more.

**Next Edit Suggestions** (VS Code, Xcode, Eclipse): Predicts the *location* of your next edit and pre-fills it. Goes beyond the cursor position.

### 3.2 Copilot Chat
A conversational interface for asking coding questions, explaining concepts, refactoring, generating tests, and more.

Available in:
- VS Code / Visual Studio / JetBrains / Neovim / Eclipse / Xcode
- GitHub.com (web interface)
- GitHub Mobile (iOS & Android)
- Windows Terminal

**Slash commands:** `/explain`, `/fix`, `/tests`, `/doc`, `/new`, `/security-review`, and custom-defined commands via prompt files.

### 3.3 Agent Mode (IDE)
A fully autonomous mode in the IDE where Copilot determines which files to change, proposes code edits and terminal commands, and self-heals runtime errors — iterating until the task is complete. Available in VS Code, JetBrains, Eclipse, Xcode, and Visual Studio.

### 3.4 Copilot Cloud Agent (Coding Agent)
An **asynchronous, background** AI agent that:
1. Receives a GitHub Issue assigned to it (or a prompt from VS Code / Chat)
2. Spins up an ephemeral compute environment powered by **GitHub Actions**
3. Clones the repo, explores the codebase via RAG + GitHub Code Search
4. Implements changes across multiple files
5. Pushes commits to a **draft pull request** with step-by-step session logs
6. Tags you for review and iterates on your PR comments

**Constraint:** Agent PRs require human approval before any CI/CD workflows run. This is a deliberate security gate.

### 3.5 Copilot CLI
A command-line interface that lets you describe tasks in natural language and have Copilot plan, build, and execute complex workflows from your terminal. Includes the GitHub MCP server by default. Supports handoff between CLI and GitHub.com sessions.

### 3.6 Code Review (AI-Powered)
AI-generated code review suggestions on pull requests. Copilot analyzes the diff, flags issues (security, performance, style), and leaves actionable inline comments — similar to a human reviewer. Can be set to run automatically on every PR via GitHub Actions.

### 3.7 Pull Request Summaries
Auto-generates a PR description summarizing:
- What changed
- Which files are impacted
- What a reviewer should focus on

### 3.8 Commit Message Generation
Available in GitHub Desktop and VS Code: generates commit messages and descriptions based on staged changes.

### 3.9 Copilot Workspace (Spark)
Build and deploy full-stack applications from natural-language prompts that integrate with the GitHub platform. Ideal for rapid prototyping.

### 3.10 Knowledge Bases (Enterprise)
Stores details Copilot has learned about a codebase and uses that knowledge across future sessions — a persistent institutional memory layer.

### 3.11 Custom Instructions
Personalize Copilot responses globally or per-project using:
- `.github/copilot-instructions.md` — global workspace rules
- `.github/instructions/*.instructions.md` — scoped per file pattern

### 3.12 Prompt Files
Reusable `.prompt.md` files that encapsulate a repeatable task (e.g., `/security-review`, `/release-notes`, `/generate-tests`). Invoked by slash command in Chat.

### 3.13 Model Selection (Auto Mode)
Copilot can automatically select the best AI model for each task from its supported roster: Claude Opus 4, Claude Sonnet, GPT-4o, Gemini, Grok 3, and more.

### 3.14 Multi-Model Support
Users on Pro+, Business, and Enterprise can choose specific models for Chat, cloud agent tasks, and third-party agents.

---

## 4. Copilot Customization Primitives

Understanding the six building blocks and when to use each one is essential before building automated pipelines.

```
┌──────────────────────────────────────────────────────────────────┐
│               COPILOT CUSTOMIZATION PRIMITIVES                   │
├──────────────┬────────────────────────────────┬──────────────────┤
│  Primitive   │  Lifetime / Trigger            │  Primary Use     │
├──────────────┼────────────────────────────────┼──────────────────┤
│ Instructions │ Always-on, per file pattern    │ Coding standards │
│ Prompts      │ Manually invoked via /command  │ Repeatable tasks │
│ Skills       │ Auto-discovered or /command    │ Specialized caps │
│ Custom Agents│ Persistent persona per session │ Role-based AI    │
│ MCP Servers  │ Live external data & tools     │ System context   │
│ Hooks        │ Event-triggered, deterministic │ Policy gates     │
└──────────────┴────────────────────────────────┴──────────────────┘
```

**Key insight:** These are composable. A custom agent can reference instruction files. A prompt file can invoke a skill. An MCP server provides tools to any agent. Hooks sit *underneath* everything and enforce policy regardless of which primitive triggered the action.

---

## 5. The Agent Ecosystem

### 5.1 Built-in Copilot Agents
- `@workspace` — Understands your entire project
- `@vscode` — VS Code-specific questions
- `@terminal` — Terminal and shell assistance
- `@github` — GitHub context (issues, PRs, repos)

### 5.2 Third-Party Agents
Assign tasks to Claude by Anthropic, OpenAI Codex, and others — subject to the same security protections as Copilot's own cloud agent.

### 5.3 Custom Agents (`.agent.md`)
Define your own specialist agents in `.github/agents/*.agent.md`:

```markdown
---
name: code-reviewer
description: Reviews PRs for security, performance, and style issues
tools:
  - github
  - filesystem
  - terminal
mcp_servers:
  - sonarqube-mcp
  - snyk-mcp
---

You are a senior security-focused code reviewer. When reviewing code:
1. Check for OWASP Top 10 vulnerabilities
2. Flag any hardcoded secrets or credentials
3. Identify N+1 query patterns
4. Verify error handling is complete
5. Confirm test coverage exists for new logic
Output findings as structured GitHub PR comments with severity: CRITICAL | HIGH | MEDIUM | LOW.
```

### 5.4 The Agents Panel
A centralized control page in VS Code and GitHub.com to jump between agent sessions, check progress, and manage all running agents without losing context.

---

## 6. Skills, Hooks & MCP Servers

### 6.1 Agent Skills
Self-contained folders that enhance Copilot with specialized instructions, scripts, and resources. Structure:

```
.github/skills/
├── log-analyzer/
│   ├── SKILL.md          # Instructions for the agent
│   ├── parse_logs.py     # Bundled script
│   └── log_schema.json   # Resource files
├── issue-triage/
│   ├── SKILL.md
│   └── triage_rules.yaml
└── doc-generator/
    └── SKILL.md
```

**Example skill: Log Analyzer (`SKILL.md`)**
```markdown
# Log Analyzer Skill

## Purpose
Analyze application logs to identify errors, anomalies, and performance issues.

## Instructions
1. Run `parse_logs.py` against the provided log file or stream
2. Extract ERROR and WARN entries with timestamps and stack traces
3. Group related errors by root cause
4. For each unique issue, determine: severity, frequency, first_seen, last_seen
5. Output a structured JSON report to `logs/analysis_report.json`
6. For each issue found, call the `create_github_issue` tool with:
   - title: "[LOG] <short description>"
   - labels: ["bug", "auto-detected", severity]
   - body: Full context including stack trace and reproduction steps
```

**Example skill: Issue Triage (`SKILL.md`)**
```markdown
# Issue Triage Skill

## Purpose
Classify and prioritize incoming GitHub Issues.

## Instructions
When a new issue arrives:
1. Read title, body, labels, and any attached logs/screenshots
2. Classify: bug | feature-request | documentation | question | security
3. Determine severity: P0 (outage) | P1 (critical) | P2 (major) | P3 (minor)
4. Assign appropriate labels
5. If security issue: label "security" and set confidential flag
6. Link to related issues if duplicates are found
7. Generate a triage comment summarizing classification and next steps
8. Assign to the correct team or agent based on component ownership map
```

### 6.2 Hooks
Deterministic shell commands that run at key lifecycle points — the enforcement layer that cannot be bypassed by the model.

**Hook types:**
| Hook | When It Fires | Use Case |
|---|---|---|
| `sessionStart` | Agent session begins | Environment setup, notify Slack |
| `sessionEnd` | Agent session ends | Summary report, cleanup |
| `userPromptSubmitted` | Before Copilot processes a prompt | Prompt injection prevention |
| `preToolUse` | Before any tool is called | **Approve or DENY tool executions** |
| `postToolUse` | After a tool executes | Log actions, trigger downstream agents |
| `agentStop` | Main agent completes | Final validation, deploy trigger |
| `subagentStop` | Sub-agent finishes | Inter-agent handoffs |
| `errorOccurred` | Any error in agent flow | Alert, fallback routing |

**Example hook: Pre-Tool Gate (`.github/hooks/security-gate.json`)**
```json
{
  "hooks": [
    {
      "event": "preToolUse",
      "run": "bash .github/hooks/scripts/security_gate.sh",
      "description": "Block writes to protected paths and secret detection"
    },
    {
      "event": "postToolUse",
      "run": "bash .github/hooks/scripts/audit_log.sh",
      "description": "Append every tool call to the audit trail"
    },
    {
      "event": "agentStop",
      "run": "bash .github/hooks/scripts/trigger_review_agent.sh",
      "description": "Hand off to the code review agent after coding agent finishes"
    }
  ]
}
```

**Example hook script: `security_gate.sh`**
```bash
#!/bin/bash
# Reads JSON from stdin (tool call context)
TOOL=$(echo "$HOOK_INPUT" | jq -r '.tool')
PATH_ARG=$(echo "$HOOK_INPUT" | jq -r '.args.path // empty')

# Block writes to protected paths
PROTECTED=(".env" "secrets/" "terraform/prod/")
for protected in "${PROTECTED[@]}"; do
  if [[ "$PATH_ARG" == *"$protected"* ]]; then
    echo '{"decision": "deny", "reason": "Write to protected path blocked by policy"}'
    exit 0
  fi
done

# Secret pattern detection
if echo "$HOOK_INPUT" | grep -qE '(password|secret|api_key)\s*=\s*["\x27][^"\x27]+'; then
  echo '{"decision": "deny", "reason": "Potential secret detected in output"}'
  exit 0
fi

echo '{"decision": "approve"}'
```

### 6.3 MCP Servers (Model Context Protocol)
Extend agents with live access to external systems. Configure in `.github/mcp.json` or VS Code settings.

**Key MCP servers for DevOps pipelines:**

| MCP Server | What It Provides |
|---|---|
| `github-mcp` (default) | Issues, PRs, branches, comments, reviews |
| `sonarqube-mcp` | Code quality metrics, hotspots, coverage |
| `snyk-mcp` | Dependency vulnerabilities, license risk |
| `jira-mcp` | Ticket context, sprint linking |
| `datadog-mcp` | Logs, metrics, traces, monitors |
| `slack-mcp` | Notifications, approvals via Slack |
| `linear-mcp` | Issue tracking, project context |

**Example MCP configuration (`.github/mcp.json`)**
```json
{
  "mcpServers": {
    "github": {
      "type": "url",
      "url": "https://api.githubcopilot.com/mcp/",
      "auth": "oauth"
    },
    "sonarqube": {
      "type": "url",
      "url": "https://your-sonar.company.com/mcp/v1",
      "headers": { "Authorization": "Bearer $SONAR_TOKEN" }
    },
    "datadog": {
      "type": "url",
      "url": "https://mcp.datadoghq.com/v1",
      "headers": { "DD-API-KEY": "$DD_API_KEY" }
    }
  }
}
```

---

## 7. The Fully Automated Agentic DevOps Loop

This is the complete end-to-end pipeline. Every step is automated with human-approved gates at critical control points.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FULLY AUTOMATED AGENTIC DEVOPS LOOP                      │
└─────────────────────────────────────────────────────────────────────────────┘

  [PRODUCTION LOGS / MONITORING]
           │
           ▼
  ┌─────────────────────┐
  │  1. LOG REVIEW AGENT │  ← Triggered by: cron / Datadog alert / webhook
  │  Skill: log-analyzer │
  │  MCP: datadog-mcp   │
  └────────┬────────────┘
           │  Finds errors/anomalies
           ▼
  ┌─────────────────────┐
  │  2. TRIAGE AGENT    │  ← postToolUse hook fires from Log Review Agent
  │  Skill: issue-triage│
  │  MCP: github-mcp    │
  └────────┬────────────┘
           │  Creates labelled GitHub Issues
           ▼
  ┌─────────────────────┐
  │  3. CODING AGENT    │  ← Issue assigned to Copilot (automated)
  │  Custom: fix-agent  │
  │  MCP: github-mcp    │
  │  Hook: preToolUse   │
  └────────┬────────────┘
           │  Pushes fix commits → opens Draft PR
           ▼
  ┌─────────────────────┐
  │  4. CODE REVIEW     │  ← agentStop hook triggers review agent
  │     AGENT           │
  │  Skill: pr-reviewer │
  │  MCP: sonarqube-mcp │
  │       snyk-mcp      │
  └────────┬────────────┘
           │  Posts inline review comments
           ▼
  ┌─────────────────────┐
  │  5. FIX ITERATION   │  ← Coding Agent reads review comments, iterates
  │    (AUTO-LOOP)      │
  └────────┬────────────┘
           │  All review comments addressed
           ▼
  ┌─────────────────────┐     GATE 1: PR QUALITY GATE
  │  6. PR GATE CHECK   │  ← GitHub Actions workflow (required status check)
  │  - Tests pass       │     ✅ PASS → PR promoted from Draft to Ready
  │  - Coverage ≥ 80%   │     ❌ FAIL → Coding Agent re-assigned automatically
  │  - No critical vulns│
  │  - Lint clean       │
  └────────┬────────────┘
           │
           ▼
  ┌─────────────────────┐     GATE 2: HUMAN APPROVAL (Required)
  │  7. PR APPROVAL     │  ← Minimum 1 human reviewer must approve
  │    (REQUIRED REVIEW)│     Branch protection rule enforced
  └────────┬────────────┘
           │  PR merged to main
           ▼
  ┌─────────────────────┐     GATE 3: DEPLOYMENT GATE
  │  8. DOC AGENT       │  ← Triggered by merge event
  │  Updates CHANGELOG  │
  │  Updates API docs   │
  │  Skill: doc-gen     │
  └────────┬────────────┘
           │
           ▼
  ┌─────────────────────┐
  │  9. DEPLOY GATE     │  ← GitHub Environments (required reviewers = 0 for
  │  - Smoke tests pass │     staging, ≥1 for prod)
  │  - Perf baseline OK │
  │  - Security scan OK │
  └────────┬────────────┘
           │  Approved
           ▼
  ┌─────────────────────┐
  │  10. DEPLOYMENT     │  ← GitHub Actions deployment workflow
  │   (STAGING → PROD)  │
  └─────────────────────┘
```

---

## 8. Gated PR Pipeline — Step by Step

### Step 1: Log Review Agent (GitHub Actions Workflow)

```yaml
# .github/workflows/log-review-agent.yml
name: Log Review Agent

on:
  schedule:
    - cron: '*/15 * * * *'   # Every 15 minutes
  workflow_dispatch:
  repository_dispatch:
    types: [datadog-alert]    # Triggered by Datadog webhook

jobs:
  analyze-logs:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Install dependencies
        run: pip install -r .github/agents/requirements.txt

      - name: Fetch recent logs
        env:
          DD_API_KEY: ${{ secrets.DATADOG_API_KEY }}
          DD_APP_KEY: ${{ secrets.DATADOG_APP_KEY }}
        run: python .github/agents/scripts/fetch_logs.py --window 15m --output logs/recent.json

      - name: Run Log Review Agent
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: python .github/agents/log_review_agent.py --input logs/recent.json

      - name: Upload analysis report
        uses: actions/upload-artifact@v4
        with:
          name: log-analysis-report
          path: logs/analysis_report.json
```

### Step 2: Auto-Assign Issues to Copilot Coding Agent

```yaml
# .github/workflows/auto-assign-to-copilot.yml
name: Auto-Assign Issues to Copilot

on:
  issues:
    types: [labeled]

jobs:
  assign-to-copilot:
    if: |
      contains(github.event.label.name, 'auto-fix') &&
      contains(github.event.issue.labels.*.name, 'bug')
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: Assign issue to Copilot
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.addAssignees({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              assignees: ['copilot']   // Assigns to Copilot coding agent
            });

            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `🤖 **Copilot Coding Agent assigned.**\n\nI'll analyze the logs, implement a fix, and open a draft PR for review. You can track my progress in the [Agents panel](https://github.com/${context.repo.owner}/${context.repo.repo}/copilot/agents).`
            });
```

### Step 3: PR Quality Gate (Required Status Check)

```yaml
# .github/workflows/pr-quality-gate.yml
name: PR Quality Gate

on:
  pull_request:
    types: [opened, synchronize, ready_for_review]
    branches: [main, develop]

jobs:
  # ── Gate 1: Test Suite ──────────────────────────────────────────────────────
  tests:
    name: Test Suite
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --coverage --coverageReporters=json-summary
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          echo "Coverage: $COVERAGE%"
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "❌ Coverage $COVERAGE% is below the 80% threshold"
            exit 1
          fi
          echo "✅ Coverage $COVERAGE% meets threshold"

  # ── Gate 2: Security Scan ───────────────────────────────────────────────────
  security:
    name: Security Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high --fail-on=all

      - name: Run CodeQL Analysis
        uses: github/codeql-action/analyze@v3
        with:
          languages: javascript, typescript

  # ── Gate 3: Code Quality ────────────────────────────────────────────────────
  quality:
    name: Code Quality
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: SonarQube Scan
        uses: sonarqube-community/sonarqube-scan-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
      - name: Check Quality Gate
        uses: sonarqube-community/sonarqube-quality-gate-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}

  # ── Gate 4: Copilot AI Code Review ─────────────────────────────────────────
  ai-review:
    name: Copilot AI Code Review
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
      contents: read
    steps:
      - uses: actions/checkout@v4
      - name: Run Copilot Code Review
        uses: github/copilot-code-review-action@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          review-level: comprehensive
          auto-approve-threshold: none   # Never auto-approve; always leave comments

  # ── Gate 5: Lint & Format ───────────────────────────────────────────────────
  lint:
    name: Lint & Format
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check

  # ── Summary Gate ────────────────────────────────────────────────────────────
  gate-summary:
    name: PR Gate Summary
    needs: [tests, security, quality, ai-review, lint]
    runs-on: ubuntu-latest
    if: always()
    steps:
      - name: Report gate status
        uses: actions/github-script@v7
        with:
          script: |
            const jobs = ${{ toJSON(needs) }};
            const failed = Object.entries(jobs)
              .filter(([, v]) => v.result !== 'success')
              .map(([k]) => k);

            if (failed.length > 0) {
              // Re-assign to Copilot for remediation
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.payload.pull_request.number,
                body: `❌ **PR Gate Failed:** ${failed.join(', ')}\n\n@copilot Please review the failing checks and push fixes.`
              });
              core.setFailed('One or more quality gates failed');
            } else {
              await github.rest.issues.createComment({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.payload.pull_request.number,
                body: '✅ **All PR gates passed.** Ready for human review.'
              });
            }
```

### Step 4: Branch Protection Rules Configuration

Configure these in **Settings → Branches → Branch protection rules** for `main`:

```yaml
# Equivalent config via GitHub API / Terraform
branch_protection:
  branch: main
  required_status_checks:
    strict: true                  # Require branch to be up to date
    contexts:
      - "Test Suite"
      - "Security Scan"
      - "Code Quality"
      - "Copilot AI Code Review"
      - "Lint & Format"
      - "PR Gate Summary"
  required_pull_request_reviews:
    required_approving_review_count: 1
    dismiss_stale_reviews: true
    require_code_owner_reviews: true
    require_last_push_approval: true
  restrict_pushes:
    push_restrictions: []         # No direct pushes to main
  allow_force_pushes: false
  allow_deletions: false
  block_creations: false
```

### Step 5: Documentation Agent (Post-Merge)

```yaml
# .github/workflows/doc-agent.yml
name: Documentation Agent

on:
  push:
    branches: [main]

jobs:
  update-docs:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Run Documentation Agent
        uses: actions/github-script@v7
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          script: |
            const { execSync } = require('child_process');

            // Generate changelog entry
            execSync('python .github/agents/doc_agent.py \
              --mode changelog \
              --commit ${{ github.sha }} \
              --output CHANGELOG.md');

            // Update API docs if API files changed
            const diff = execSync('git diff HEAD~1 --name-only').toString();
            if (diff.includes('src/api/') || diff.includes('routes/')) {
              execSync('python .github/agents/doc_agent.py \
                --mode api-docs \
                --output docs/api/');
            }

            // Commit and push doc updates
            execSync('git config user.name "Copilot Doc Agent"');
            execSync('git config user.email "copilot-doc@github-actions.bot"');
            execSync('git add CHANGELOG.md docs/');
            execSync('git diff --staged --quiet || git commit -m "docs: auto-update [skip ci]"');
            execSync('git push');
```

---

## 9. Gated Deployment Pipeline

### Deployment Environments Configuration

Set up in **Settings → Environments**:

| Environment | Required Reviewers | Wait Timer | Deployment Branch |
|---|---|---|---|
| `staging` | 0 (fully automated) | 0 min | `main` only |
| `production` | 1 (human required) | 5 min | `main` only |

### Deployment Workflow with Gates

```yaml
# .github/workflows/deploy.yml
name: Gated Deployment Pipeline

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      environment:
        type: choice
        options: [staging, production]
        default: staging

jobs:
  # ── Pre-deployment validation ───────────────────────────────────────────────
  pre-deploy-checks:
    name: Pre-Deployment Checks
    runs-on: ubuntu-latest
    outputs:
      deploy_approved: ${{ steps.check.outputs.approved }}
    steps:
      - uses: actions/checkout@v4
      - name: Run pre-deploy security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=critical

      - name: Check deployment readiness
        id: check
        run: |
          echo "approved=true" >> $GITHUB_OUTPUT
          echo "✅ Pre-deployment checks passed"

  # ── Deploy to Staging (Automated, No Approval Required) ─────────────────────
  deploy-staging:
    name: Deploy to Staging
    needs: pre-deploy-checks
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.yourapp.com
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        run: |
          echo "Deploying ${{ github.sha }} to staging..."
          # Your deployment command here
          # e.g.: kubectl set image deployment/app app=yourimage:${{ github.sha }} -n staging

  # ── Staging Gate: Smoke Tests & Performance ─────────────────────────────────
  staging-gate:
    name: Staging Validation Gate
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run smoke tests against staging
        run: |
          npm run test:smoke -- --env=staging --url=https://staging.yourapp.com
        env:
          STAGING_API_KEY: ${{ secrets.STAGING_API_KEY }}

      - name: Performance baseline check
        run: |
          npm run perf:check -- --url=https://staging.yourapp.com \
            --budget-file=.github/perf-budget.json

      - name: Run Copilot Log Review on staging
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Give the deployment 2 minutes to stabilize, then check logs
          sleep 120
          python .github/agents/log_review_agent.py \
            --env staging \
            --window 5m \
            --fail-on-error

  # ── Deploy to Production (Requires Human Approval) ──────────────────────────
  deploy-production:
    name: Deploy to Production
    needs: staging-gate
    runs-on: ubuntu-latest
    environment:
      name: production           # ← Configured with required_reviewers: [team-leads]
      url: https://yourapp.com
    steps:
      - uses: actions/checkout@v4

      - name: Notify deployment start
        uses: actions/github-script@v7
        with:
          script: |
            // Slack / Teams notification via MCP or webhook
            console.log('🚀 Production deployment started for ${{ github.sha }}');

      - name: Deploy to production
        run: |
          echo "Deploying ${{ github.sha }} to production..."
          # kubectl set image deployment/app app=yourimage:${{ github.sha }} -n production

      - name: Post-deployment health check
        run: |
          npm run health:check -- --url=https://yourapp.com --retries=5 --interval=30

  # ── Post-Deploy: Log Review on Production ───────────────────────────────────
  post-deploy-monitoring:
    name: Post-Deploy Monitoring
    needs: deploy-production
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Monitor production for 10 minutes
        run: |
          sleep 600
          python .github/agents/log_review_agent.py \
            --env production \
            --window 10m \
            --auto-rollback-on-critical \
            --github-token ${{ secrets.GITHUB_TOKEN }}
        env:
          DD_API_KEY: ${{ secrets.DATADOG_API_KEY }}
```

---

## 10. Repository Structure for Agentic DevOps

```
your-repo/
├── .github/
│   ├── copilot-instructions.md          # Global Copilot instructions
│   │
│   ├── agents/                          # Custom agent definitions
│   │   ├── log-review.agent.md
│   │   ├── triage.agent.md
│   │   ├── fix.agent.md
│   │   ├── code-reviewer.agent.md
│   │   └── doc-generator.agent.md
│   │
│   ├── skills/                          # Agent skills
│   │   ├── log-analyzer/
│   │   │   ├── SKILL.md
│   │   │   └── parse_logs.py
│   │   ├── issue-triage/
│   │   │   ├── SKILL.md
│   │   │   └── triage_rules.yaml
│   │   ├── pr-reviewer/
│   │   │   └── SKILL.md
│   │   └── doc-generator/
│   │       └── SKILL.md
│   │
│   ├── hooks/                           # Lifecycle enforcement hooks
│   │   ├── security-gate.json
│   │   ├── audit-log.json
│   │   └── scripts/
│   │       ├── security_gate.sh
│   │       ├── audit_log.sh
│   │       └── trigger_review_agent.sh
│   │
│   ├── instructions/                    # Scoped coding instructions
│   │   ├── typescript.instructions.md
│   │   ├── terraform.instructions.md
│   │   └── api.instructions.md
│   │
│   ├── prompts/                         # Reusable prompt files
│   │   ├── security-review.prompt.md
│   │   ├── release-notes.prompt.md
│   │   └── generate-tests.prompt.md
│   │
│   ├── mcp.json                         # MCP server configuration
│   ├── perf-budget.json                 # Performance thresholds
│   │
│   └── workflows/
│       ├── log-review-agent.yml
│       ├── auto-assign-to-copilot.yml
│       ├── pr-quality-gate.yml
│       ├── doc-agent.yml
│       └── deploy.yml
│
├── src/                                 # Application source
├── tests/                               # Test suites
├── docs/                                # Auto-updated documentation
├── CHANGELOG.md                         # Auto-generated changelog
└── CODEOWNERS                           # Required reviewers by component
```

---

## 11. Reference: Agent Role Cards

### 🔍 Log Review Agent
```markdown
**Trigger:** Scheduled (every 15 min) or Datadog webhook
**Skill:** log-analyzer
**MCP:** datadog-mcp, github-mcp
**Input:** Application logs (JSON stream)
**Output:** GitHub Issues with labels [bug, auto-detected, P0/P1/P2/P3]
**Hook:** postToolUse → fires Triage Agent
**Escalation:** P0 issues trigger PagerDuty alert via MCP
```

### 🗂️ Triage Agent
```markdown
**Trigger:** New Issue created with label "auto-detected"
**Skill:** issue-triage
**MCP:** github-mcp, jira-mcp (optional)
**Input:** Issue title, body, labels, related issues
**Output:** Classified issue with severity, component, CODEOWNERS assignment
**Gate:** Adds "auto-fix" label only if P2 or below (P0/P1 require human triage)
**Hook:** postToolUse → assigns "auto-fix" issues to Copilot
```

### 🔧 Fix Agent (Copilot Coding Agent)
```markdown
**Trigger:** Issue assigned to @copilot with label "auto-fix"
**Custom Agent:** fix.agent.md with fix-focused instructions
**MCP:** github-mcp (default), sonarqube-mcp
**Hook preToolUse:** security_gate.sh (blocks protected paths)
**Hook agentStop:** trigger_review_agent.sh
**Input:** Issue body + logs + related PRs + repo context
**Output:** Draft PR with fix commits + session logs
**Loop:** Iterates on review comments automatically
```

### 👁️ Code Review Agent
```markdown
**Trigger:** agentStop hook from Fix Agent OR PR opened/synchronized
**Skill:** pr-reviewer
**MCP:** sonarqube-mcp, snyk-mcp, github-mcp
**Input:** PR diff, test results, SonarQube report, Snyk report
**Output:** Structured inline PR comments (CRITICAL | HIGH | MEDIUM | LOW)
**Escalation:** CRITICAL findings block PR gate; notify #security-alerts Slack
```

### 📝 Documentation Agent
```markdown
**Trigger:** Push to main (post-merge)
**Skill:** doc-generator
**MCP:** github-mcp
**Input:** Merged commits, diff, PR description
**Output:** Updated CHANGELOG.md, API docs, README sections
**Commit:** Pushes with [skip ci] tag to avoid re-triggering pipeline
```

---

## 12. Troubleshooting & Best Practices

### Common Issues

**Copilot cloud agent blocked by branch protection**
Add Copilot as a bypass actor in the ruleset (Settings → Rules → Rulesets → Bypass list). Keep human approval gates — only allow Copilot to push to *draft* PRs, not merge.

**Hook not firing**
Ensure hook files are in `.github/hooks/*.json` and the agent plan (Business/Enterprise or Pro+) supports hooks. Verify the hook script is executable (`chmod +x`).

**MCP server authentication failures**
Prefer OAuth over PATs for the GitHub MCP server. Store all secrets in GitHub Secrets, never in hook scripts or agent files. Use the `preToolUse` hook to validate secret health on session start.

**Agent loops (infinite iteration)**
Set a `max_iterations` constraint in your custom agent instructions. Use the `agentStop` hook with a circuit breaker: if the agent has pushed > N commits without the gate passing, label the issue `needs-human` and close the agent session.

**Copilot ignoring custom instructions**
Ensure `.github/copilot-instructions.md` is in the root. For scoped instructions, verify file patterns in `*.instructions.md` front matter match the files being edited.

### Best Practices

1. **Start gated, expand gradually.** Begin with human approval on every agent action, then relax gates for lower-risk operations (docs, tests) as you build confidence.

2. **Use `preToolUse` hooks as your primary enforcement layer.** Never rely on prompts alone to prevent bad actions — hooks are deterministic and cannot be bypassed by the model.

3. **Separate concerns across agents.** Log Review ≠ Triage ≠ Fix ≠ Review ≠ Doc. Each agent should have one responsibility and hand off explicitly.

4. **Make issues the source of truth.** Every agent action should trace back to a GitHub Issue. This gives you a full audit trail: log anomaly → issue → PR → review → merge → deploy.

5. **Gate on outcomes, not inputs.** Don't gate on "did the agent run?" — gate on "did tests pass?", "is coverage ≥ 80%?", "are there zero critical vulnerabilities?". This is environment-agnostic.

6. **Log everything.** The `postToolUse` hook should write every agent action to an append-only audit log. This is your compliance record.

7. **P0/P1 issues always require humans.** Auto-fix pipelines should only process P2/P3. High-severity issues go to an on-call engineer immediately via PagerDuty or Slack.

8. **Test your hooks in isolation** before attaching them to live agent sessions. A broken `preToolUse` hook that always denies will silently halt your entire agent workflow.

---

*Guide version: May 2026 | Based on GitHub Copilot features as of claude-sonnet-4-6*
*Sources: GitHub Docs, GitHub Blog, VS Code Docs, GitHub Awesome Copilot*
