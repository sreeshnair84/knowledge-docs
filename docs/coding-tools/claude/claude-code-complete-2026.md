---
title: Claude Code CLI — Complete Guide 2026
---

# Claude Code CLI — Complete Guide 2026

Complete reference for Claude Code, Anthropic's official agentic CLI — installation, CLAUDE.md hierarchy, 60+ slash commands, custom commands, skills, MCP integration, hooks, and CI/CD patterns.

---

## Installation & Authentication

```bash
npm install -g @anthropic-ai/claude-code

# Authenticate (opens browser)
claude login

# Or use API key directly
export ANTHROPIC_API_KEY="sk-ant-..."
claude
```

### First-Time Setup

```bash
# Start interactive session in your project directory
cd /your/project
claude

# Non-interactive: pipe a prompt
echo "Summarize the architecture" | claude -p

# Run a single command and exit
claude -p "Review all TODO comments in src/"
```

---

## CLAUDE.md Hierarchy

Claude Code loads context files in order — later files can extend but not override earlier ones.

### Load Order (highest → lowest precedence)

```
1. Project: <project-root>/CLAUDE.md             (checked into repo, shared with team)
2. Project local: <project-root>/.claude/CLAUDE.md  (gitignored, personal overrides)
3. User global: ~/.claude/CLAUDE.md             (applies to all projects)
```

### What to Put in CLAUDE.md

```markdown
# CLAUDE.md

## Build Commands
- `npm run build` — production build
- `npm test` — run test suite
- `npm run lint` — ESLint + Prettier check

## Code Style
- TypeScript strict mode enabled
- Use `async/await`, not raw Promises
- Prefer named exports over default exports

## Architecture Notes
- API handlers live in `src/handlers/`
- Database models in `src/models/`
- Never commit credentials — use `.env.local`

## Do Not
- Run `DROP TABLE` or destructive migrations without confirmation
- Push directly to `main` branch
- Install new dependencies without asking
```

### Context Loading Behaviour

- Claude reads all matching CLAUDE.md files at session start
- Project CLAUDE.md takes effect for all team members who clone the repo
- `.claude/CLAUDE.md` is personal — gitignore it for machine-specific settings
- Global `~/.claude/CLAUDE.md` applies across all your projects

---

## Slash Commands Reference

### Navigation & Context

| Command | Description |
|---------|-------------|
| `/help` | Show all available commands |
| `/status` | Current session info: model, tokens used, context size |
| `/context` | Show what files are in the current context window |
| `/clear` | Clear context window (keep conversation) |
| `/reset` | Full reset: clear context and conversation history |
| `/compact` | Summarize and compress conversation to save tokens |
| `/memory` | View and edit Claude's memory for this project |

### File Operations

| Command | Description |
|---------|-------------|
| `/add <file>` | Add file to context |
| `/add <glob>` | Add files matching pattern (e.g. `/add src/**/*.ts`) |
| `/remove <file>` | Remove file from context |
| `/ls [path]` | List directory contents |
| `/tree [depth]` | Show directory tree |

### Code Actions

| Command | Description |
|---------|-------------|
| `/review` | Review all changes in working tree |
| `/diff` | Show git diff of current changes |
| `/test` | Run project test suite |
| `/lint` | Run linter |
| `/build` | Run build command |
| `/run <cmd>` | Execute arbitrary shell command |

### Git Operations

| Command | Description |
|---------|-------------|
| `/commit` | Stage and commit changes with AI-generated message |
| `/pr` | Create a pull request |
| `/push` | Push current branch |
| `/branch <name>` | Create and switch to a new branch |
| `/stash` | Git stash current changes |
| `/log` | Show recent git log |

### Agent & Session

| Command | Description |
|---------|-------------|
| `/task <description>` | Create a tracked task |
| `/tasks` | List all tasks |
| `/agent <prompt>` | Spawn a sub-agent for a specific task |
| `/model <id>` | Switch model mid-session |
| `/tokens` | Show token usage breakdown |
| `/cost` | Show session cost estimate |
| `/export` | Export conversation to markdown |

### Search

| Command | Description |
|---------|-------------|
| `/find <term>` | Search codebase for term |
| `/grep <pattern>` | Regex search across files |
| `/todo` | List all TODO/FIXME comments |

### MCP

| Command | Description |
|---------|-------------|
| `/mcp` | List connected MCP servers |
| `/mcp__<server>__<prompt>` | Invoke a named prompt from an MCP server |

---

## Custom Commands

Create reusable commands in `.claude/commands/`.

### File Format

```
.claude/
  commands/
    security-review.md     → /security-review
    deploy-staging.md      → /deploy-staging
    generate-tests.md      → /generate-tests
```

### Command Structure

```markdown
---
description: Run a security review on changed files
allowed_tools:
  - Read
  - Grep
  - Bash
default_model: claude-sonnet-4-6
---

# Security Review

Review all files changed in the current git diff for:

1. SQL injection vulnerabilities
2. XSS attack vectors
3. Hardcoded credentials or secrets
4. Insecure deserialization
5. Missing input validation at API boundaries

For each finding, output:
- File path and line number
- Severity: Critical / High / Medium / Low
- Description of the vulnerability
- Recommended fix

Focus on real vulnerabilities, not style issues.
```

### YAML Frontmatter Options

| Field | Type | Description |
|-------|------|-------------|
| `description` | string | Shown in `/help` listing |
| `allowed_tools` | list | Restrict which tools this command can use |
| `default_model` | string | Override default model for this command |
| `max_tokens` | int | Cap output tokens |

### Using Arguments in Custom Commands

```markdown
---
description: Generate unit tests for a specific file
---

Generate comprehensive unit tests for the file: $ARGUMENTS

Requirements:
- Use the existing test framework in this project
- Cover happy path, edge cases, and error conditions
- Follow the naming conventions in existing tests
```

Invoke as: `/generate-tests src/handlers/auth.ts`

---

## Skills System

Skills are self-contained capability bundles discovered automatically at session start.

### Built-in Skills

| Skill | Trigger | Description |
|-------|---------|-------------|
| `commit` | `/commit` | AI commit message generation |
| `pr` | `/pr` | Pull request creation |
| `review` | `/review` | Code review with structured output |
| `test` | `/test` | Test runner integration |
| `debug` | `/debug` | Structured debugging workflow |

### Custom Skills

Skills live in `.claude/skills/<skill-name>/` and follow a standard structure:

```
.claude/skills/deploy/
  skill.md          # Skill description and instructions
  commands/
    staging.md      # /deploy staging
    production.md   # /deploy production
  hooks/
    pre-deploy.sh   # Pre-deploy validation
```

### Skills vs Custom Commands

| | Custom Commands | Skills |
|-|-----------------|--------|
| Scope | Single action | Grouped capability set |
| Location | `.claude/commands/` | `.claude/skills/<name>/` |
| Sub-commands | No | Yes |
| Hooks | No | Yes |
| Discovery | At startup | At startup |
| Use when | One-off automation | Complex multi-step workflows |

---

## MCP Integration

Claude Code acts as an MCP client — it can connect to any MCP server to access tools, resources, and prompts.

### Configuring MCP Servers

In `.claude/settings.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "${DATABASE_URL}"]
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
    }
  }
}
```

### Using MCP Tools

Once connected, MCP tools appear alongside built-in tools automatically. Claude selects them based on context.

### Using MCP Prompts

```bash
# List available prompts from connected servers
/mcp

# Invoke a named prompt
/mcp__github__summarize-pr
/mcp__postgres__explain-query
```

### Enterprise MCP (June 2026+)

- Org-level provisioning via Okta — no per-user OAuth flows
- Admins configure allowed MCP servers centrally
- Users get access on first login; revoked on offboarding
- Audit trail of MCP server invocations per user

---

## Hooks

Hooks are shell commands that run automatically at lifecycle events. Configure in `.claude/settings.json`.

### Hook Types

| Hook | Fires | Common Use |
|------|-------|------------|
| `PreToolUse` | Before any tool call | Validate, log, block risky commands |
| `PostToolUse` | After any tool call | Audit, notify, post-process results |
| `Stop` | When session ends | Save artifacts, run cleanup |
| `SubagentStop` | When a sub-agent finishes | Aggregate results |

### Example: Pre-tool Validation Hook

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo 'Running: $CLAUDE_TOOL_INPUT' >> ~/.claude/audit.log"
          }
        ]
      }
    ]
  }
}
```

### Example: Block Destructive Commands

```bash
#!/usr/bin/env bash
# .claude/hooks/validate-bash.sh
COMMAND="$1"

BLOCKED_PATTERNS=(
  "DROP TABLE"
  "rm -rf /"
  "git push --force origin main"
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qi "$pattern"; then
    echo "BLOCKED: Dangerous command pattern detected: $pattern" >&2
    exit 1
  fi
done

exit 0
```

### Example: Post-commit Slack Notification

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/notify-slack.sh"
          }
        ]
      }
    ]
  }
}
```

---

## CI/CD Integration

### Non-Interactive Mode

```bash
# Run Claude with a prompt from stdin or -p flag
claude -p "Review the changes in this PR and identify any security issues"

# Output as JSON for downstream processing
claude -p "Extract all API endpoints from src/" --output-format json

# Pipe output to another command
claude -p "Generate a changelog from git log" | gh pr create --body -
```

### GitHub Actions Example

```yaml
name: Claude Code Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Install Claude Code
        run: npm install -g @anthropic-ai/claude-code

      - name: Run Security Review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/main...HEAD > /tmp/changes.patch
          claude -p "Review this diff for security vulnerabilities: $(cat /tmp/changes.patch)" \
            --output-format json > review.json

      - name: Post Review Comment
        uses: actions/github-script@v7
        with:
          script: |
            const review = require('./review.json')
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: review.text
            })
```

### Pre-commit Hook Integration

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit

echo "Running Claude Code lint check..."
claude -p "Check staged files for obvious bugs: $(git diff --cached --name-only)" \
  --output-format text

if [ $? -ne 0 ]; then
  echo "Claude Code found issues. Review before committing."
  exit 1
fi
```

---

## Agent SDK Credit Accounting (June 2026)

As of June 15, 2026, Claude Code uses a separate credit pool for Agent SDK calls.

### Credit Pools

| Pool | Covers | Limit |
|------|--------|-------|
| Interactive | Manual prompts in the REPL | Per-user plan limit |
| Agent SDK | Sub-agent spawns, programmatic calls | Separate per-org quota |

### Monitoring Usage

```bash
# View current session token usage
/tokens

# View estimated cost
/cost

# Export usage report
claude usage --format csv --period 2026-06
```

### Cost Controls in CI

```bash
# Set a per-run token budget
claude -p "..." --max-tokens 50000

# Enable cost logging
CLAUDE_COST_LOG=/var/log/claude-costs.jsonl claude -p "..."
```

---

## Configuration Reference

Full `.claude/settings.json` schema:

```json
{
  "model": "claude-sonnet-4-6",
  "maxTokens": 8192,
  "temperature": 0.7,
  "mcpServers": { },
  "hooks": { },
  "permissions": {
    "allow": ["Bash(git *)", "Read", "Write", "Edit"],
    "deny": ["Bash(rm -rf *)"]
  },
  "env": {
    "NODE_ENV": "development"
  },
  "contextFiles": [
    "src/README.md",
    "docs/architecture.md"
  ]
}
```

### Permission Patterns

```json
"permissions": {
  "allow": [
    "Bash(npm *)",
    "Bash(git *)",
    "Read(**/*.ts)",
    "Write(src/**)"
  ],
  "deny": [
    "Bash(curl *)",
    "Bash(wget *)"
  ]
}
```

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+C` | Cancel current operation |
| `Ctrl+L` | Clear terminal display |
| `Up/Down` | Navigate command history |
| `Tab` | Autocomplete slash commands |
| `Ctrl+D` | Exit session |
| `Ctrl+R` | Search command history |
| `Esc` | Cancel pending input |

---

## IDE Integrations

| IDE | Extension | Features |
|-----|-----------|---------|
| VS Code | Claude Code Extension | Inline suggestions, `/review` in sidebar |
| JetBrains | Claude Plugin | Code actions, chat panel |
| Neovim | claude.nvim | Buffer-level commands, floating chat |
| Emacs | claude-emacs | Region-based prompting |

All IDE integrations share the same `.claude/` configuration and CLAUDE.md context.
