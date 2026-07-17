---
title: 'Claude CLI Cheat Sheet'
date_created: 2026-07-17
last_reviewed: 2026-07-17
status: current
source_type: converted-html
source_file: 'Cheatsheet_6_Claude_CLI.html'
doc_type: guide
tags: [claude-cli, cheatsheet, coding-tools, quick-reference]
covers_version: "2026"
---

# Claude CLI Cheat Sheet

## $ claude CLI Reference

Complete command-line interface reference · Commands, Flags, Slash Commands, Subagents, Scripting, Permissions

INSTALL: npm i -g @anthropic-ai/claude-code

NEEDS: Claude Pro/Max/Team/Enterprise

macOS · Linux · Windows (WSL/Git Bash)

⌨️ Core CLI Commands

claude| Start interactive REPL sessionClean context, ready for new task  
---|---  
claude "query"| Start session with initial prompte.g. claude "summarize this project"  
claude -p "query"| **Print mode** — execute and exit (non-interactive SDK)Returns output to stdout, exits. Ideal for scripting.  
claude -c| Continue most recent conversationResumes last session with full context intact  
claude -c -p "q"| Continue recent session in print modee.g. claude -c -p "Check for type errors"  
claude -r "id"| Resume specific session by IDe.g. claude -r "abc123" "Finish this PR"  
claude --resume id| Resume session with query\--continue flag also works for session continuation  
claude update| Update Claude Code to latest version  
claude --version| Show installed version number  
claude --help| Show all available options  
  
Piping & Scripting

## Pipe content to Claude cat error.log | claude -p "find the root cause" git log --oneline | claude -p "summarize these commits" ls -la | claude -p "explain this directory structure" # Script with JSON output claude -p "analyze codebase" \--output-format json > analysis.json claude -p "generate tests" \--max-turns 3 > tests.txt # CI/CD GitHub Actions claude -p "fix any linting errors and suggest commit msg"

🏳️ CLI Flags Reference

Output & Format

\--output-format| text|json|stream-json — json useful for scripting, parse responses programmatically  
---|---  
\--verbose| Show full tool call details and reasoning steps  
\--max-turns N| Limit conversation turns (use in -p mode for bounded runs)  
  
System Prompt Control

\--system-prompt| Replace entire system prompt (blank slate, removes Claude Code defaults)  
---|---  
\--system-prompt-file| Load custom system prompt from file (version-controlled templates)  
\--append-system-prompt| **RECOMMENDED** — Add to Claude's defaults, keep built-in capabilities  
\--append-system-prompt-file| Append from file while keeping defaults. Works with append flags.  
  
\--append-system-prompt is recommended for most use cases — preserves built-in Claude Code capabilities

\--system-prompt and --system-prompt-file are MUTUALLY EXCLUSIVE

Directory & Context

\--add-dir path| Add additional directory to Claude's context. Can specify multiple: --add-dir ../frontend ../backend  
---|---  
  
Model Selection

\--model| claude-opus-4-6 | claude-sonnet-4-6 | claude-haiku-4-5  
---|---  
  
/ Slash Commands (In-Session)

Session Management

/clear| Reset conversation history and context window  
---|---  
/compact| Summarize conversation — optionally: /compact "keep auth implementation"  
/resume| Return to a previous conversation  
/exit| Exit the REPL cleanly  
  
Configuration & Info

/config| Open configuration panel — settings, preferences  
---|---  
/doctor| Check Claude Code installation health  
/ide| Manage IDE integrations (VS Code, JetBrains)  
/mcp| Access MCP server management and status  
/cos| Show cost and duration of current session  
/insights| Compile usage history HTML report — try monthly for patterns  
/help| Show all available slash commands including custom ones  
  
Project & Plugins

/init| Generate CLAUDE.md in project root — Claude analyzes and writes it  
---|---  
/plugins| Browse, install, manage plugins from marketplaces  
/plugins install| Install a plugin: /plugins install typescript-lsp  
  
In-Prompt Shortcuts

@file.ts| Reference specific file: "Review @src/auth.ts"  
---|---  
!command| Run shell command: !npm test · !git status  
  
🔐 Permissions & Tool Control

Allow / Disallow Tools

## Allow specific safe tools only claude \--allowedTools "Bash(git log:*)" "Bash(git diff:*)" "Write" "Read" # Disallow dangerous commands claude \--disallowedTools "Bash(rm:*)" "Bash(sudo:*)" # Skip permission prompts (DANGEROUS - use in CI only) claude \--dangerously-skip-permissions # Prompt for specific tool permission claude -p \--permission-prompt-tool mcp_auth_tool "query"

Permission Modes (Desktop)

Auto-approve| Claude proceeds with low-risk actions automatically  
---|---  
Ask first| Claude asks before each tool use — maximum oversight  
Plan mode| Claude shows plan first, awaits approval before any execution  
  
Environment Config

## Extended thinking control export MAX_THINKING_TOKENS=8000 # set budget export MAX_THINKING_TOKENS=0 # disable entirely # Session environments # Local: runs on your machine, inherits shell env # Remote: runs on Anthropic cloud, continues when app closed # SSH: runs on remote machine you manage

\--dangerously-skip-permissions: CI/CD use only — never in dev with sensitive files

Deletion protection: Claude always asks before permanently deleting files

⌨️ Keyboard Shortcuts + Advanced

Keyboard Controls

Ctrl+C| Cancel current operation / interrupt Claude  
---|---  
Ctrl+D| Exit Claude Code REPL  
Tab| Autocomplete commands and file paths  
↑ ↓| Navigate command history  
Escape| Interrupt plan — provide feedback to revise approach  
  
Subagents via --agents flag

claude \--agents '{ "code-reviewer": { "description": "Expert code reviewer. Use after code changes.", "prompt": "Senior reviewer: focus on security, quality, best practices.", "tools": ["Read", "Grep", "Glob", "Bash"], "model": "sonnet" }, "debugger": { "description": "Debugging specialist for errors and test failures.", "prompt": "Expert debugger. Analyze errors, find root causes.", "model": "haiku" } }'

Git Worktrees (Parallel Sessions)

## True parallel sessions on separate branches git worktree add ../feature-a feature-branch-a git worktree add ../feature-b feature-branch-b # Run separate claude sessions in each

Context Window Tips

/compact| Trigger early summarization to free space  
---|---  
Remote mode| For long-running tasks — continues if app closes  
@file refs| Reference files specifically vs "find auth file" — more efficient  
\--max-turns 5| Limit turns for focused scripted queries  
  
🧩 Skills System (Custom Commands)

Skills vs Slash Commands

Custom slash commands (.claude/commands/) merged into skills. Both work, skills recommended for new work.

## Old way (still works) .claude/commands/review.md → /review # New way (recommended) .agents/skills/review/SKILL.md → /review # Skills add: supporting files, invocation # control, subagent execution (fork context)

Skill YAML Front Matter

\--- name: deep-research description: Research topic thoroughly context: fork # isolated context agent: Explore # built-in or custom agent \--- Research $ARGUMENTS thoroughly: 1\. Find files using Glob and Grep 2\. Read and analyze the code 3\. Summarize findings with file refs 

Subagent from Skill

## .claude/agents/reviewer.md \--- name: reviewer description: Use for code reviews model: sonnet color: orange \--- You are an expert code reviewer. Focus on security, performance, and maintainability.

Built-in Agents

Explore| Read-only codebase exploration before implementation  
---|---  
Plan| Creates implementation plan (saved to Plan.md)  
general| Default agent — full capabilities  
  
ultrathink

Add "ultrathink" to skill content to enable extended thinking mode in that skill

🚀 Power Patterns & Common Workflows

TDD Workflow

## Test-Driven Development cycle claude "Write a failing test for user auth feature" → !npm test (see it fail) claude "Now write code to make that test pass" → !npm test (verify pass)

Plan → Execute Pattern

## Always plan first for complex tasks claude "Plan the refactoring of auth module. Save plan to Plan.md. Do not execute yet." → Review Plan.md → Hit Escape to revise if needed claude "Execute the plan in Plan.md"

Long Context Strategy

## When context runs out mid-project: /compact "preserve: auth impl + DB schema decisions" # Or break into chunks: # "Part 1 done. Update Plan.md. /clear" # "Reference Plan.md, continue from Part 2"

Codebase Analysis First

## Explore before writing (Explore agent) claude "Analyze this codebase structure and suggest improvements @./src/"

Background Bash (Non-blocking)

## Long commands don't block conversation # Claude runs them in background !npm install & # Continue talking while it runs

Complex Flag Combo

claude \ \--model claude-opus-4-6 \ \--add-dir ../apps ../lib \ \--allowedTools "Bash(git:*)" "Write" "Read" \ \--verbose \ \--output-format json 

Notification

## Terminal bell when Claude finishes long task claude config set --global preferredNotifChannel terminal_bell
