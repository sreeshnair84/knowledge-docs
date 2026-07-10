---
title: "Claude Code CLI — Zero to Mastery 2026"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["coding-tools", "claude"]
---

# Claude Code CLI — Zero to Mastery 2026

Complete guide to Claude Code — from installation and first run through advanced hooks, skills, MCP integration, and CI/CD production patterns. Audience: developers new to Claude Code through advanced production users.

---

## 1. What Is Claude Code?

Claude Code is Anthropic's official **agentic CLI** — a command-line tool that wraps Claude models in a continuous agent loop, giving the model the ability to read files, write code, run shell commands, call MCP servers, and interact with your development environment autonomously.

### The Agent Loop

```
User message
     │
     ▼
Claude reasons and produces a plan
     │
     ▼
Claude calls tools (read file / write file / run command / MCP call)
     │
     ▼
Tool results returned to Claude
     │
     ▼
Claude continues reasoning and produces next action
     │
     ▼
(loop until task complete or user interrupts)
     │
     ▼
Claude produces final response
```

### What Makes It Different from Claude.ai Chat?

| Feature | Claude.ai Chat | Claude Code CLI |
|---|---|---|
| File system access | No | Yes (configurable scope) |
| Shell command execution | No | Yes (with confirmation) |
| MCP server integration | Limited | Full |
| Custom slash commands | No | Yes |
| Hooks (automated reactions) | No | Yes |
| CLAUDE.md instructions | No | Yes |
| Skills system | No | Yes |
| CI/CD integration | No | Yes |
| IDE extensions | No | VS Code, JetBrains |

---

## 2. Prerequisites and Installation

### Prerequisites

- **Node.js** 18 or higher
- **npm** or compatible package manager
- A **Claude subscription** (Pro or higher) or a valid **Anthropic API key**
- Git (recommended, required for many workflows)

### Installation

```bash
npm install -g @anthropic-ai/claude-code
```

Verify the installation:

```bash
claude --version
claude /doctor        # Runs environment diagnostics
```

### Authentication

=== "Claude Subscription (Recommended)"

    ```bash
    claude /login
    # Opens browser for OAuth login — no API key needed
    ```

=== "API Key"

    ```bash
    export ANTHROPIC_API_KEY="sk-ant-..."
    claude
    ```

=== "AWS Bedrock"

    ```bash
    export ANTHROPIC_API_KEY="unused"
    export CLAUDE_CODE_USE_BEDROCK=1
    export AWS_REGION="us-east-1"
    # Ensure AWS credentials are configured via standard AWS methods
    claude
    ```

=== "Google Vertex AI"

    ```bash
    export ANTHROPIC_API_KEY="unused"
    export CLAUDE_CODE_USE_VERTEX=1
    export CLOUD_ML_REGION="us-east5"
    export ANTHROPIC_VERTEX_PROJECT_ID="your-project-id"
    claude
    ```

---

## 3. First Run Walkthrough

```bash
# Navigate to your project directory
cd /path/to/your/project

# Start Claude Code
claude

# Claude Code starts an interactive session
# Try your first message:
> What files are in this project?

# Claude will use its file tools to explore and report back.
# Try a coding task:
> Explain what the main.py file does and suggest 3 improvements.

# Claude reads main.py, analyzes it, and responds.
# Approve or reject suggested changes interactively.
```

### Key Interactive Patterns

| Action | What to Do |
|---|---|
| Accept a proposed change | Press `y` or `Enter` when prompted |
| Reject a proposed change | Press `n` |
| Interrupt the agent | Press `Ctrl+C` |
| Exit Claude Code | Type `/quit` or press `Ctrl+D` |
| See available commands | Type `/help` |
| Check session cost | Type `/cost` |

---

## 4. Core Workflow: Ask → Plan → Edit → Verify

Claude Code is most effective when you treat it as a collaborative pair programmer operating in a structured loop:

### Step 1: Ask

Describe what you want clearly. Provide context about constraints, preferred patterns, and what success looks like:

```
> Refactor the DataProcessor class in src/processor.py to use a pipeline
  pattern. It must remain backward compatible with existing callers.
  Use our existing logging infrastructure (see utils/logger.py).
```

### Step 2: Plan

Claude will often produce a plan before writing code. Review it and course-correct before allowing execution:

```
> Before making any changes, show me your plan and list all files you intend
  to modify. Wait for my approval before proceeding.
```

### Step 3: Edit

Claude proposes and applies changes. Each file write is shown with a diff. You can approve or reject per-file.

### Step 4: Verify

Always verify changes work before moving on:

```
> Run the test suite for the processor module. Fix any failures you caused.
```

### Effective Prompting Patterns for Claude Code

```
# Scope the task explicitly
> Fix only the authentication bug in src/auth/jwt.py — do not touch other files.

# Provide constraints up front
> Implement the caching layer. Use Redis only — no in-memory fallback.
  Match the existing pattern in src/cache/session_cache.py.

# Request a plan first for large tasks
> I want to migrate our ORM from SQLAlchemy to SQLModel.
  First, analyze the scope: list all affected files and estimate risk.
  Do not make any changes yet.
```

---

## 5. CLAUDE.md: Project Instructions

### What Is CLAUDE.md?

`CLAUDE.md` is a Markdown file that Claude Code reads automatically at the start of every session. It provides project-specific context, constraints, conventions, and instructions that persist without re-stating them in every prompt.

### CLAUDE.md Hierarchy

Claude Code reads `CLAUDE.md` files from multiple locations and merges them in order:

| Location | Purpose | Scope |
|---|---|---|
| `~/.claude/CLAUDE.md` | User-level preferences, personal style | All projects |
| Parent directories (walking up from CWD) | Monorepo / workspace-level instructions | All sub-projects |
| `<project-root>/CLAUDE.md` | Project-specific conventions | Current project |
| `<project-root>/.claude/CLAUDE.md` | (alternative location, same behavior) | Current project |

More specific files override more general ones for conflicting instructions.

### Writing Effective CLAUDE.md Files

A high-quality `CLAUDE.md` covers:

```markdown
# CLAUDE.md

## Project Overview
Brief description of what this project does and its tech stack.

## Build & Test Commands
- Build: `npm run build`
- Test: `pytest tests/ -x`
- Lint: `ruff check . && mypy src/`
- Format: `black src/`

## Code Conventions
- Python: type hints required on all public functions
- Error handling: always use custom exceptions from src/errors.py
- Logging: use structlog, never print()
- Tests: every public function must have at least one test

## Architecture Constraints
- Do not introduce new dependencies without asking first
- The API layer (src/api/) must not import from src/data/ directly — go through src/services/
- All database access must go through the repository pattern in src/repositories/

## File Structure
- src/api/          — FastAPI route handlers
- src/services/     — Business logic
- src/repositories/ — Database access layer
- src/models/       — Pydantic models and DB schemas
- tests/            — Mirror structure of src/

## What NOT to Do
- Never commit secrets or API keys
- Never use `os.system()` — use `subprocess` with explicit args
- Never catch bare `Exception` — catch specific exception types
```

### CLAUDE.md Best Practices

- Keep it concise — Claude reads it every session; bloated files dilute signal
- Use exact command strings for build, test, and lint
- Describe architecture boundaries explicitly (what can import what)
- List the antipatterns most common in your codebase
- Update it when conventions change — stale CLAUDE.md is misleading

---

## 6. Slash Commands Reference

Slash commands are Claude Code's built-in interactive commands. All verified commands as of 2026:

| Command | Purpose |
|---|---|
| `/help` | Show all available commands and their descriptions |
| `/clear` | Clear the current conversation context |
| `/compact` | Summarize and compress the conversation to reduce token usage |
| `/config` | Open the Claude Code configuration settings |
| `/cost` | Show token usage and estimated cost for the current session |
| `/doctor` | Run environment diagnostics (auth, connectivity, config) |
| `/init` | Generate a `CLAUDE.md` file for the current project |
| `/login` | Authenticate with Anthropic (opens browser OAuth flow) |
| `/logout` | Revoke current authentication |
| `/memory` | Open and edit the persistent memory file (`MEMORY.md`) |
| `/mcp` | Manage MCP server connections — list, add, remove |
| `/model` | Switch the active model for the current session |
| `/pr-comments` | Fetch and display comments from the current pull request |
| `/quit` | Exit Claude Code |
| `/release-notes` | Show what changed in the current Claude Code version |
| `/review` | Request a code review of recent changes |
| `/status` | Show current session status (auth, model, tokens used) |
| `/terminal-setup` | Configure terminal integration settings |
| `/vim` | Toggle Vim keybindings mode |

:::warning Only use verified commands
    The commands above are the complete verified set. Do not use or document `/run`, `/exec`, `/debug`, or other commands not on this list — they do not exist in the current release.

---

## 7. Memory System

### How Memory Works

Claude Code maintains persistent memory across sessions via the **MEMORY.md** file located at `~/.claude/MEMORY.md`. This persists information between separate `claude` invocations, unlike the in-session context which is cleared between sessions.

### Using /memory

```bash
# Open the memory file for viewing and editing
/memory
```

Claude Code opens your `MEMORY.md` in your configured editor. You can:
- Add facts you want Claude to remember across sessions
- Remove outdated information
- Structure preferences in any Markdown format

### What to Store in Memory

Good candidates for persistent memory:

```markdown
# ~/.claude/MEMORY.md

## My Preferences
- Prefer functional patterns over OOP when both work
- Always add type hints to Python
- Use descriptive variable names over abbreviations
- Test-driven approach: write tests before implementation

## Frequent Projects
- ~/projects/api-server: FastAPI, PostgreSQL, Redis. Main branch: main.
- ~/projects/ml-pipeline: PyTorch, DVC, Weights & Biases. Main branch: develop.

## Common Commands I Forget
- Deploy staging: `make deploy-staging ENV=staging`
- Run integration tests: `pytest tests/integration -m "not slow"`

## Team Context
- PR reviews go to #engineering-review Slack channel
- Release cadence: Tuesdays and Thursdays
```

### What Not to Store

- Secrets, API keys, or credentials — never
- Project-specific conventions — put those in the project's CLAUDE.md instead
- Task-specific instructions — state those in the session

---

## 8. Hooks System

Hooks are shell commands that Claude Code executes automatically at defined lifecycle points. They are configured in `settings.json` and allow you to automate reactions to Claude Code events without user input.

### Hook Types

| Hook Type | When It Fires | Common Uses |
|---|---|---|
| `PreToolUse` | Before Claude calls any tool | Block dangerous commands, log intent, request confirmation |
| `PostToolUse` | After Claude calls any tool | Log results, trigger side effects, update state |
| `Stop` | When the agent session ends | Post-session reports, cleanup, notifications |
| `Notification` | When Claude Code generates a notification | Alert routing, Slack/email integration |

### Configuration Location

Hooks are configured in `.claude/settings.json` (project-level) or `~/.claude/settings.json` (user-level):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash /path/to/scripts/check-dangerous-command.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash /path/to/scripts/post-write-lint.sh"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash /path/to/scripts/session-summary.sh"
          }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash /path/to/scripts/notify-slack.sh"
          }
        ]
      }
    ]
  }
}
```

### PreToolUse: Blocking Dangerous Commands

A PreToolUse hook that intercepts shell commands and blocks dangerous patterns:

```bash
#!/usr/bin/env bash
# scripts/check-dangerous-command.sh
# Receives tool input via stdin as JSON

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('command',''))")

# Block dangerous patterns
DANGEROUS_PATTERNS=(
    "rm -rf /"
    "DROP TABLE"
    "DELETE FROM.*WHERE.*1=1"
    "chmod 777"
    "curl.*| bash"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
    if echo "$COMMAND" | grep -qi "$pattern"; then
        echo "BLOCKED: Dangerous command pattern detected: $pattern" >&2
        exit 1  # Non-zero exit blocks the tool call
    fi
done

exit 0  # Zero exit allows the tool call to proceed
```

### PostToolUse: Auto-Lint After File Writes

```bash
#!/usr/bin/env bash
# scripts/post-write-lint.sh
# Auto-run linter after Claude writes a Python file

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('file_path',''))")

if [[ "$FILE_PATH" == *.py ]]; then
    ruff check "$FILE_PATH" --fix --quiet
    echo "Linted: $FILE_PATH"
fi
```

### Stop: Session Summary

```bash
#!/usr/bin/env bash
# scripts/session-summary.sh
# Log session end timestamp and trigger any cleanup

echo "[$(date -u +"%Y-%m-%dT%H:%M:%SZ")] Claude Code session ended" >> ~/.claude/session-log.txt
```

### Hook Execution Rules

- Hook commands receive context as JSON via `stdin`
- `PreToolUse` hooks that exit non-zero **block the tool call**
- `PostToolUse` and `Stop` hooks that exit non-zero log errors but do not interrupt Claude
- Hooks time out after 30 seconds by default
- Hook output goes to stderr; it is visible in the terminal but not sent to Claude

---

## 9. MCP Integration

Model Context Protocol (MCP) allows Claude Code to connect to external servers that expose tools, resources, and prompts. This extends Claude's capabilities beyond the built-in file system and shell tools.

### MCP Configuration

MCP servers are configured in `.claude/mcp.json` (project level) or via the `/mcp` command:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/allowed/path"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${DATABASE_URL}"
      }
    },
    "custom-internal": {
      "command": "python3",
      "args": ["/path/to/your/mcp_server.py"],
      "env": {
        "API_KEY": "${INTERNAL_API_KEY}"
      }
    }
  }
}
```

### Managing MCP Servers in Session

```bash
/mcp              # List all configured MCP servers and their status
/mcp list         # Same as above
```

### Using MCP Tools in Chat

Once connected, MCP tools appear as callable tools in Claude's tool list. Reference them naturally:

```
> Use the GitHub MCP server to list open pull requests in the main repository.
> Query the postgres server for the count of users created in the last 7 days.
```

### Writing a Minimal MCP Server

```python
#!/usr/bin/env python3
"""Minimal MCP server exposing a custom tool."""

import json
import sys

def handle_list_tools() -> dict:
    return {
        "tools": [
            {
                "name": "get_deployment_status",
                "description": "Get the current deployment status for a service",
                "inputSchema": {
                    "type": "object",
                    "properties": {
                        "service_name": {
                            "type": "string",
                            "description": "Name of the service to check"
                        }
                    },
                    "required": ["service_name"]
                }
            }
        ]
    }

def handle_call_tool(name: str, arguments: dict) -> dict:
    if name == "get_deployment_status":
        service = arguments["service_name"]
        # Implement real lookup here
        return {"content": [{"type": "text", "text": f"{service}: healthy (v2.1.4)"}]}
    raise ValueError(f"Unknown tool: {name}")

# MCP server reads JSON-RPC from stdin and writes to stdout
for line in sys.stdin:
    try:
        request = json.loads(line)
        method = request.get("method")
        if method == "tools/list":
            result = handle_list_tools()
        elif method == "tools/call":
            result = handle_call_tool(
                request["params"]["name"],
                request["params"].get("arguments", {})
            )
        else:
            result = {}
        print(json.dumps({"jsonrpc": "2.0", "id": request.get("id"), "result": result}))
        sys.stdout.flush()
    except Exception as e:
        print(json.dumps({"jsonrpc": "2.0", "id": None, "error": {"message": str(e)}}))
        sys.stdout.flush()
```

For a full MCP deep-dive including server types, resources, and prompts primitives, see [MCP Deep Guide](mcp-deep-guide.md).

---

## 10. Custom Slash Commands

You can define project-specific slash commands that invoke Claude with pre-defined prompts, instructions, or tool restrictions.

### Directory Structure

```
.claude/
  commands/
    review-security.md
    generate-test.md
    summarize-pr.md
```

### Command File Format

```markdown
---
description: "Run a security-focused code review on the specified files"
allowed_tools: ["Read", "Grep"]
model: claude-sonnet-5
---

Perform a thorough security review of $ARGUMENTS.

Focus on:
- SQL injection vulnerabilities
- Authentication bypass risks
- Sensitive data exposure (secrets, PII in logs)
- Insecure deserialization
- Input validation gaps
- Dependency vulnerabilities (check imports against known CVEs)

For each finding, report:
1. Severity (Critical / High / Medium / Low)
2. File and line number
3. Description of the vulnerability
4. Recommended fix with code example

If no issues are found, explicitly state that the reviewed code appears secure.
```

### YAML Frontmatter Fields

| Field | Type | Purpose |
|---|---|---|
| `description` | string | Shown in `/help` output |
| `allowed_tools` | array of strings | Tools Claude may use (restricts permissions) |
| `model` | string | Model to use for this command (overrides default) |

### Using $ARGUMENTS

The `$ARGUMENTS` placeholder is replaced with everything the user types after the command name:

```bash
/review-security src/auth/jwt.py src/api/routes.py
# $ARGUMENTS becomes: "src/auth/jwt.py src/api/routes.py"
```

### More Command Examples

=== "generate-test.md"

    ```markdown
    ---
    description: "Generate pytest tests for the specified Python file"
    allowed_tools: ["Read", "Write"]
    model: claude-sonnet-5
    ---

    Generate comprehensive pytest tests for $ARGUMENTS.

    Requirements:
    - Read the target file first to understand its interface
    - Write tests to tests/<same-relative-path>
    - Follow the project's existing test patterns in tests/
    - Cover: happy path, edge cases, error conditions
    - Use fixtures from tests/conftest.py where applicable
    - Do not mock unless external I/O is involved
    ```

=== "summarize-pr.md"

    ```markdown
    ---
    description: "Summarize the current branch's changes for a PR description"
    allowed_tools: ["Bash"]
    ---

    Analyze the changes in the current git branch and produce a PR description.

    Run: git log main..HEAD --oneline
    Run: git diff main...HEAD --stat

    Output format:
    ## Summary
    (2-3 sentence description of what changed and why)

    ## Changes
    (bulleted list of notable changes)

    ## Testing
    (what was tested and how)
    ```

---

## 11. Skills System

Skills are reusable, nameable capabilities that extend Claude Code with domain-specific behaviors. Unlike custom slash commands (which are one-shot prompts), skills are richer modules that can include their own hooks and sub-agents.

### Directory Structure

```
.claude/
  skills/
    security-audit/
      SKILL.md
      hooks/
        pre_scan.sh
    test-generator/
      SKILL.md
```

### SKILL.md Format

```markdown
# Security Audit Skill

## Description
Perform a comprehensive security audit of the codebase following OWASP Top 10 guidelines.

## Trigger
When the user asks to "audit", "security check", or "find vulnerabilities".

## Instructions
1. Start with a dependency audit: check package.json or requirements.txt for known-vulnerable packages.
2. Scan all files in src/ for the following patterns using Grep:
   - Hardcoded secrets (password, api_key, secret in strings)
   - SQL concatenation (SELECT.*+.*user_input or f"SELECT)
   - eval() or exec() calls
   - Unvalidated redirects
3. Check authentication flows in src/auth/ for JWT validation gaps.
4. Review all API endpoints in src/api/ for missing authorization checks.
5. Produce a findings report in SECURITY_AUDIT.md with severity ratings.

## Output Format
SECURITY_AUDIT.md with sections: Critical, High, Medium, Low, Informational.
Each finding: description, file/line, recommendation, code example.
```

### How Skills Are Invoked

Skills are not slash commands — they are invoked naturally by describing the task:

```
> Perform a security audit of the authentication module.
```

Claude Code detects the intent, loads the matching skill's SKILL.md, and follows its structured instructions.

---

## 12. Permissions

Claude Code uses a permission system to control which tools the model can call. This is the primary guardrail for preventing unintended file writes or command executions.

### Configuration

Permissions are set in `.claude/settings.json` (project level) or `~/.claude/settings.json` (user level):

```json
{
  "allowed_tools": [
    "Read",
    "Grep",
    "Glob",
    "Bash(git:*)",
    "Bash(npm run:*)",
    "Bash(pytest:*)"
  ],
  "denied_tools": [
    "Bash(rm:*)",
    "Bash(curl:*)",
    "Write(/etc/*)"
  ]
}
```

### Tool Name Patterns

| Pattern | Matches |
|---|---|
| `"Read"` | All file reads |
| `"Write"` | All file writes |
| `"Bash"` | All bash commands |
| `"Bash(git:*)"` | Only git commands |
| `"Bash(npm run:*)"` | Only npm run commands |
| `"Write(/src/*)"` | Writes only within /src/ |
| `"Write(/etc/*)"` | All writes to /etc/ (deny this) |

### Permission Scoping Strategy

For production or sensitive projects, use a restrictive default and allowlist specific tools:

```json
{
  "denied_tools": ["Bash"],
  "allowed_tools": [
    "Read",
    "Grep",
    "Glob",
    "Bash(git log:*)",
    "Bash(git diff:*)",
    "Bash(git status:*)",
    "Bash(pytest:*)",
    "Bash(npm test:*)"
  ]
}
```

### Interactive Permission Prompts

By default, when Claude Code encounters a tool call not covered by allowed_tools, it prompts the user interactively. In CI mode (see Section 13), unallowed tool calls are rejected automatically.

---

## 13. CI/CD Integration

### CI Mode

Claude Code supports non-interactive execution for use in CI pipelines:

```bash
# Enable CI mode via environment variable
CLAUDE_CI=1 claude --print "Review this PR and output findings as JSON"

# Or via flag
claude --ci --print "Run tests and report failures"
```

In CI mode:
- No interactive prompts are shown
- Unallowed tool calls are rejected (not prompted)
- Output is printed to stdout and process exits when complete

### GitHub Actions Workflow

```yaml
# .github/workflows/claude-review.yml
name: Claude Code PR Review

on:
  pull_request:
    types: [opened, synchronize]

permissions:
  contents: read
  pull-requests: write

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for git diff

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Claude Code review
        env:
          ANTHROPIC_API_KEY: $\{\{ secrets.ANTHROPIC_API_KEY }}
          CLAUDE_CI: "1"
        run: |
          claude --print \
            "Review the changes in this PR. Focus on: bugs, security issues, and code quality.
             Output as Markdown with sections: Critical Issues, Warnings, Suggestions.
             Be concise — max 500 words." \
          > review-output.md

      - name: Post review as PR comment
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const review = fs.readFileSync('review-output.md', 'utf8');
            github.rest.issues.createComment(\{
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `## Claude Code Review\n\n$\{review}`
            });
```

### Pre-Commit Hook Integration

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit
# Run Claude Code quality check before each commit

STAGED_FILES=$(git diff --cached --name-only --diff-filter=AM | grep '\.py$')

if [ -z "$STAGED_FILES" ]; then
    exit 0
fi

echo "Running Claude Code review on staged Python files..."

REVIEW=$(CLAUDE_CI=1 claude --print \
    "Review these staged files for obvious bugs and style issues: $STAGED_FILES
     Output only a list of issues, or 'No issues found.' if clean.
     Be brief." 2>/dev/null)

echo "$REVIEW"

if echo "$REVIEW" | grep -qi "critical\|error\|security"; then
    echo "Claude Code found critical issues. Commit blocked."
    exit 1
fi

exit 0
```

### Environment Variables Reference

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | API key for direct Anthropic API access |
| `CLAUDE_CI` | Set to `1` to enable CI (non-interactive) mode |
| `CLAUDE_CODE_USE_BEDROCK` | Set to `1` to use Amazon Bedrock |
| `CLAUDE_CODE_USE_VERTEX` | Set to `1` to use Google Vertex AI |
| `AWS_REGION` | AWS region for Bedrock access |
| `CLOUD_ML_REGION` | GCP region for Vertex AI access |

---

## 14. IDE Extensions

### VS Code Extension

Install from the VS Code Marketplace: search for **"Claude Code"** by Anthropic.

Features:
- Inline code completions powered by Claude
- Chat panel within VS Code
- Context-aware suggestions based on open files
- Diff view for proposed changes
- Direct integration with VS Code terminal for command execution

```
Cmd/Ctrl + Shift + P → "Claude Code: Open Chat"
Cmd/Ctrl + Shift + P → "Claude Code: Explain Selection"
Cmd/Ctrl + Shift + P → "Claude Code: Fix Issue"
```

### JetBrains Plugin

Install from JetBrains Marketplace: search for **"Claude Code"**.

Supported IDEs: IntelliJ IDEA, PyCharm, WebStorm, GoLand, Rider.

Features:
- Chat panel in the IDE sidebar
- Code completion integration
- Inline explain and refactor actions
- Access to project CLAUDE.md instructions within the IDE context

### IDE vs. CLI Trade-offs

| Capability | CLI | IDE Extension |
|---|---|---|
| Full file system access | Yes | Limited to project |
| Shell command execution | Yes | Via integrated terminal |
| Hooks system | Yes | No |
| MCP integration | Yes | Limited |
| Skills system | Yes | No |
| Custom slash commands | Yes | No |
| CI/CD integration | Yes | No |
| Inline completions | No | Yes |
| Visual diff UI | Basic | Rich |

For agentic workflows, hooks, and automation: use the CLI. For inline assistance while coding: use the IDE extension.

---

## 15. Token Optimization in Claude Code

### The /compact Command

When a long session accumulates many tokens, use `/compact` to compress the conversation:

```bash
/compact
# Claude summarizes the conversation history into a compact form
# Reduces context size while preserving essential context
# Useful when approaching context limits or to reduce cost
```

Use `/compact` proactively before starting a new sub-task in a long session.

### /cost Command

Monitor token usage throughout your session:

```bash
/cost
# Shows: total input tokens, total output tokens, estimated cost so far
```

Check `/cost` at the start of complex tasks to understand your baseline and after task completion to review total spend.

### CLAUDE.md Brevity

CLAUDE.md is loaded into context on every session. Every extra line costs tokens on every request. Keep CLAUDE.md focused:

- Remove outdated instructions immediately
- Prefer bullet points over prose
- Use exact command strings instead of descriptions
- Remove examples once the pattern is established

### Token Optimization Patterns

=== "Scope File Access"

    ```
    # Antipattern — Claude reads the whole project
    > Fix the authentication bug.

    # Better — scope the files explicitly
    > Fix the authentication bug. Only look at these files:
      src/auth/jwt.py, src/auth/middleware.py, tests/test_auth.py
    ```

=== "Request Concise Responses"

    ```
    # Antipattern — verbose response
    > Explain why this function is slow.

    # Better — specify response format
    > In 2-3 sentences, explain why this function is slow and what to fix.
      No preamble. Be direct.
    ```

=== "Use /clear Between Tasks"

    ```bash
    # After completing one task, clear context before starting another
    /clear
    > Now, let's work on the database migration...
    ```

---

## 16. Cost Controls

### Model Selection Per Project

Configure which model Claude Code uses per project in `.claude/settings.json`:

```json
{
  "model": "claude-sonnet-4-6"
}
```

Or switch models for the current session:

```bash
/model claude-haiku-4-5-20251001    # Switch to Haiku for lightweight tasks
/model claude-sonnet-5              # Switch to Sonnet 5 for agentic work
```

See [Claude Models 2026](claude-models-2026.md) for model IDs, pricing, and selection guidance.

### Session Cost Budgets

For CI or automated runs, you can pass a max cost limit:

```bash
claude --max-cost 5.00 --print "Perform code review..."
# Session will terminate if estimated cost exceeds $5.00
```

### Usage Tracking Integration

Log Claude Code usage to a central tracking system by adding a Stop hook:

```bash
#!/usr/bin/env bash
# scripts/log-usage.sh — fires at end of every session
SESSION_DATA=$(cat)  # JSON with session summary
COST=$(echo "$SESSION_DATA" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d.get('cost_usd', 0))")
echo "$(date -u),${USER},${PWD},${COST}" >> /shared/claude-usage-log.csv
```

---

## 17. Guardrails

### CLAUDE.md Restrictions

The most reliable guardrail is explicit instruction in CLAUDE.md:

```markdown
## Restrictions
- NEVER commit to git without explicit user confirmation
- NEVER delete files without showing what will be deleted and waiting for approval
- NEVER modify files outside the src/ and tests/ directories
- NEVER run database migrations without explicit approval
- NEVER push to remote — always stop and ask
- If uncertain about scope, ask before acting
```

### Tool Denylists

Block categories of dangerous operations via `denied_tools`:

```json
{
  "denied_tools": [
    "Bash(rm:*)",
    "Bash(git push:*)",
    "Bash(git reset --hard:*)",
    "Bash(DROP:*)",
    "Bash(curl * | bash:*)"
  ]
}
```

### Confirmation Requirements

For operations that need human review, instruct Claude in the prompt or CLAUDE.md:

```markdown
## Required Confirmations
Before any of the following, output a summary and the text "CONFIRM? (y/n)"
and wait for the user to respond:
- Any git commit
- Any file deletion
- Any database schema change
- Any modification to configuration files in config/
```

---

## 18. Human-in-the-Loop (HITL) Patterns

### Explicit Pause Points

Build review steps into your workflow:

```
> Analyze the performance issue in database.py and produce a fix plan.
  Show me the plan. Stop. Do not implement until I say "proceed".
```

### Diff Review Before Apply

By default, Claude Code shows diffs before writing files and asks for confirmation. To reinforce this:

```
> Make the changes described in the ticket.
  Before writing any file, show me the complete diff and wait for my approval.
  Implement one file at a time.
```

### Staged Execution

For risky operations (migrations, deployments), use staged execution:

```
Stage 1: Analysis only (no writes)
> Analyze what changes the migration will make. List all affected tables and rows.

Stage 2: Dry-run
> Run the migration in dry-run mode. Show me the output.

Stage 3: Confirmation
> The migration looks correct. Proceed with applying it to staging.
```

### Error Escalation

Instruct Claude to surface uncertainty:

```markdown
## In CLAUDE.md
If you encounter an ambiguous situation where multiple approaches are possible,
stop and present the options with trade-offs before proceeding.
Do not make architectural decisions autonomously.
```

---

## 19. Best Practices

1. **Maintain a well-structured CLAUDE.md** — this single file is the most powerful way to shape Claude Code's behavior in your project. Invest time in writing it clearly.

2. **Scope every request explicitly** — name the files, directories, and constraints for each task. Vague requests lead to broad changes that are hard to review.

3. **Use /compact proactively** — do not let context grow to the limit. Compact after completing each major sub-task.

4. **Monitor cost with /cost regularly** — check before and after complex tasks to understand what operations cost.

5. **Plan before execute** — for any task touching more than 3 files, ask Claude to produce a written plan first. Review the plan before approving execution.

6. **Use denied_tools for dangerous operations** — never rely solely on Claude's judgment; enforce non-negotiable restrictions at the permission layer.

7. **Write hooks for cross-cutting concerns** — auto-lint, format, and test after file writes rather than asking Claude to do it manually each time.

8. **Test CI integration in dry-run mode first** — run `CLAUDE_CI=1 claude --print "..."` locally before wiring it into GitHub Actions.

9. **Keep custom commands in version control** — `.claude/commands/` should be committed to the repo so the team shares the same workflow automations.

10. **Use MCP servers for external data access** — instead of pasting API responses into the chat, connect Claude Code to the data source directly via MCP.

11. **Set a project model in settings.json** — ensure the whole team uses the same model for consistent and cost-predictable results.

12. **Clear context between unrelated tasks** — `/clear` between distinct workstreams prevents bleed-through of irrelevant context.

13. **Review diffs carefully** — Claude Code is generally accurate, but always read the diff before approving writes to critical files.

14. **Use /init to generate your initial CLAUDE.md** — the generated file is a good starting point; edit it to match your actual conventions.

15. **Combine hooks with CLAUDE.md for defense in depth** — CLAUDE.md provides behavioral instructions; hooks enforce them mechanically.

---

## 20. Antipatterns

:::danger Antipattern: Vague Task Descriptions
    `> Fix the bug` gives Claude no scope. It may modify files throughout the codebase attempting to find and fix multiple issues. Always name the file, describe the symptom, and specify constraints.

:::danger Antipattern: Never Using /compact
    Allowing context to grow to tens of thousands of tokens makes responses slower, more expensive, and less focused. Use `/compact` after each major task.

:::danger Antipattern: No CLAUDE.md
    Running Claude Code in a project without CLAUDE.md means repeating context in every session. CLAUDE.md is free, persistent, and powerful — always write one.

:::danger Antipattern: Storing Secrets in CLAUDE.md or MEMORY.md
    CLAUDE.md is committed to git. MEMORY.md is a plain text file. Neither is a secure secret store. Use environment variables or a secrets manager.

:::danger Antipattern: Approving File Writes Without Reading Diffs
    Clicking through confirmation prompts without reading the diff negates the value of HITL. Claude Code is accurate but not infallible — review every change to critical files.

:::danger Antipattern: Relying on Claude's Judgment for Dangerous Operations
    Do not assume Claude will always refuse dangerous requests. Enforce safety via `denied_tools` in settings.json and PreToolUse hooks that block patterns explicitly.

:::danger Antipattern: Using /clear Incorrectly
    `/clear` wipes the entire conversation context, including any task state Claude was tracking. Only use it between completely unrelated tasks, not mid-task.

:::danger Antipattern: Running Claude Code in CI Without a Scoped allowed_tools List
    CI runs with unrestricted tool access can make unexpected file writes or run unintended commands. Always specify `allowed_tools` in your CI settings.json.

:::danger Antipattern: Ignoring Hook Timeouts
    Hooks that run slow operations (network calls, heavy processing) and exceed 30 seconds will be killed. Keep hooks fast; offload heavy work to async queues.

:::danger Antipattern: Using Claude Code for Every Small Task
    Starting a full Claude Code session to rename a variable or fix a typo wastes time and tokens. Use Claude Code for tasks requiring planning, multi-file coordination, or agentic loops — not one-line edits.

:::danger Antipattern: Not Version-Controlling .claude/ Directory
    `.claude/commands/`, `.claude/settings.json`, and `.claude/mcp.json` are project configuration. Commit them to git so all team members share the same Claude Code environment.

:::danger Antipattern: Bloated Custom Commands
    Custom slash command prompts with hundreds of lines of instructions are hard to maintain and dilute focus. Keep each command scoped to one clear task.

---

## 21. Troubleshooting

### Authentication Issues

```bash
# Diagnose auth state
claude /doctor

# Re-authenticate
claude /logout
claude /login

# Verify API key is set (if using API key auth)
echo $ANTHROPIC_API_KEY

# Test connectivity
claude --print "Say hello"
```

### MCP Server Errors

```bash
# Check MCP server status
/mcp

# Common MCP issues:
# 1. Server process crashes — check stderr logs
# 2. Wrong command path — verify 'command' field in mcp.json
# 3. Missing environment variables — check 'env' block in mcp.json
# 4. Timeout — server is too slow; optimize or increase timeout

# Test MCP server manually
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' \
  | npx -y @modelcontextprotocol/server-filesystem /tmp
```

### Hook Failures

```bash
# Hooks log errors to stderr — check terminal output
# Common causes:
# 1. Script not executable — run: chmod +x scripts/your-hook.sh
# 2. Script path wrong — use absolute paths in settings.json
# 3. Script exits non-zero unintentionally — check exit codes
# 4. Script times out (>30s) — optimize the script

# Test hook script directly
echo '{"tool":"Bash","input":{"command":"ls"}}' | bash scripts/your-hook.sh
```

### Permission Denied Errors

```bash
# Claude Code is blocked from a tool you need
# Check settings.json for denied_tools
cat .claude/settings.json | python3 -m json.tool

# Check user-level settings too
cat ~/.claude/settings.json | python3 -m json.tool

# Add the needed tool to allowed_tools in the appropriate settings.json
```

### Context Limit Errors

```bash
# If hitting context limits:
/compact      # Compress conversation history
/clear        # Start fresh (loses current task context)

# Reduce context by:
# 1. Asking Claude to read fewer files per request
# 2. Scoping questions to specific files
# 3. Using /compact before large tasks
```

### Model Not Available

```bash
/model        # List available models for your auth tier
/status       # Check current model and subscription status
```

### Slow Responses

Common causes and fixes:

| Symptom | Likely Cause | Fix |
|---|---|---|
| Slow first token | Large context being processed | Use /compact or /clear |
| All responses slow | Rate limiting | Check /cost; wait or upgrade tier |
| Specific tool slow | MCP server latency | Check MCP server performance |
| Slow after many edits | Context accumulated | Use /compact |
