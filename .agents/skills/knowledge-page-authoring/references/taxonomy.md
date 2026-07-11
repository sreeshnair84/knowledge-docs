# Canonical Taxonomy

This is the authoritative folder map for this repo. `knowledge-repo-intake`'s
`find_placement.py` checks incoming content against this **before** trusting
pure content-similarity — similarity alone just reinforces however the repo
already happens to be organized, including its mistakes (this is exactly how
enterprise-AI-architecture content ended up scattered across four unrelated
locations: each addition matched *something* nearby by similarity, but
nothing checked it against an actual intended structure).

When adding a **new top-level section**, don't — extend one of these instead
unless the content genuinely fits none of them. Sprawl happens one
reasonable-seeming new folder at a time.

| Folder | Scope | Explicitly NOT here |
|---|---|---|
| `enterprise-architecture/` | THE canonical home for enterprise architecture and enterprise AI architecture — methodology, governance (ARB), AI-specific architecture patterns, transformation strategy. Subsections: `framework/`, `architectural-review-board/`, `ai-architecture/`, `transformation/`, `best-practices/`, `process/`, `specialization/`, `strategy/`. | Career-development/course material about becoming an EA — that's `ea-masterclass/`. |
| `ea-masterclass/` | Structured, numbered-module EA career/skills course. Pedagogical track, not reference material — even though it covers overlapping topics to `enterprise-architecture/`. | Reference content someone would look up mid-project — put that in `enterprise-architecture/` and link to it from the relevant module instead of duplicating it. |
| `cybersec-architect/` | Structured cybersecurity-architect career/skills course. Same pedagogical-track pattern as `ea-masterclass/`. | Security reference content — that's `ai-security-governance/`. |
| `ai-security-governance/` | AI security & governance reference: identity, protocol-level security, policy, compliance, observability. | Career/course framing — see `cybersec-architect/`. |
| `agentic-systems/` | Agentic AI backend/platform architecture — memory, orchestration harnesses, config, skills infrastructure. | UI/application-layer patterns — see `agentic-ui/`. |
| `agentic-ui/` | Agentic application and UI patterns — how agent-driven applications are built and presented. | Backend platform architecture — see `agentic-systems/`. |
| `ai-protocols/` | Protocol-level reference: MCP, A2A, agent auth, interoperability standards. Subsections: `auth/`, `mcp/`, `standards/`. | Security governance framing of protocols — cross-link to `ai-security-governance/` instead of duplicating. |
| `ai-development/` | AI development lifecycle, testing/evaluation methodology. | |
| `ai-economics/` | Cost, ROI, economic modeling for AI initiatives. | |
| `ai-foundations/` | Core AI/ML concepts, fundamentals. | |
| `ai-usecases/` | Engagement case studies, narrative case studies, industry-vertical deep dives (see `knowledge-page-authoring`'s case-study types). | |
| `cloud-platforms/` | AWS, Azure, Kubernetes, IaC, API/AI gateways. | |
| `coding-tools/` | Developer tooling ONLY — Claude, GitHub Copilot, code review practices. | Enterprise AI architecture content — that belongs in `enterprise-architecture/ai-architecture/`, not here, regardless of how it got filed originally. |
| `interview-prep/` | Interview question banks (see the `interview-questions` type). | |
| `knowledge-engineering/` | Data and knowledge management practices. | |
| `quantum/` | Quantum computing content. Lowercase only — a capitalized `Quantum/` existing alongside this is a filesystem-case bug, not a second category. | |
| `soft-skills/` | Non-technical professional skills. | |
| `sovereign-constitutional-ai/` | Sovereign AI, constitutional AI governance, national/regulatory AI strategy. | |
| `workflow-orchestration/` | Workflow engines vs. agent architectures — Temporal, Camunda, durable execution, orchestration patterns. | |

## Known consolidation debt (as of 2026-07-10)

These exist in the live repo and violate the map above — flagged so
placement decisions don't treat them as precedent:

- `coding-tools/enterprise-ai-architect/` — should be
  `enterprise-architecture/ai-architecture/`.
- `ai-first-enterprise/` — should be `enterprise-architecture/transformation/`.
- `Quantum/` — should be merged into `quantum/` (case-duplicate).
- `enterprise-architecture/arb/` — should be merged into
  `enterprise-architecture/architectural-review-board/` (same concept, two
  names).
- `ai-protocols/protocol/` — should be renamed `ai-protocols/standards/`
  (the current name is redundant with its parent).

If you're asked to place new content and the best-matching existing file
lives in one of these deprecated locations, place the **new** content in the
correct canonical location instead of next to the deprecated one — don't
propagate the debt further.
