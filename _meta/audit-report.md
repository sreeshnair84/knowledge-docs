# Repo-wide Consistency Audit

Files scanned: **669**  |  Clean: **292**  |  With findings: **377**

## Findings by severity

| Severity | Count |
|---|---|
| CRITICAL | 0 |
| HIGH | 0 |
| MEDIUM | 1324 |
| LOW | 612 |

## Most common issue types

| Issue | Files affected |
|---|---|
| Only one tag present | 243 |
| Heading level jumps from H3 to H5 at '**PURPOSE /  | 32 |
| Heading level jumps from H4 to H6 at 'DISCUSSION H | 24 |
| Heading level jumps from H4 to H6 at 'WHAT THE PAN | 13 |
| Heading level jumps from H2 to H6 at '**Q1   DISTI | 12 |
| Heading level jumps from H2 to H6 at 'QUESTION 1' | 12 |
| Heading level jumps from H2 to H4 at '**EPILOGUE & | 11 |
| Heading level jumps from H3 to H5 at '**THE PROBLE | 11 |
| Heading level jumps from H3 to H5 at 'Why It Emerg | 10 |
| Heading level jumps from H3 to H6 at 'BY THE END O | 10 |
| Line 9 looks like a collapsed table row (only 2 pi | 10 |
| Heading level jumps from H3 to H5 at '**Verificati | 10 |
| Heading level jumps from H2 to H6 at 'Q1   DISTING | 10 |
| Heading level jumps from H3 to H5 at '**THE ARCHIT | 9 |
| Line 8 looks like a collapsed table row (only 2 pi | 9 |

## Per-file findings

### `docs\agentic-systems\config\enterprise-agentic-ai-config-management-2026.md`

- LOW: H1 ('Enterprise Configuration & Parameter Management') doesn't match frontmatter title ('Enterprise Configuration & Parameter Management for Agentic AI Platforms on AWS') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H1 to H3 at '2026 Edition' — add an intermediate heading or fix the level.
- LOW: Line 26 looks like a collapsed table row (only 2 pipe(s)): '|**Part 0**<br>**Part 1**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 27 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 33 looks like a collapsed table row (only 2 pipe(s)): '|**Part 2**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 34 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 40 looks like a collapsed table row (only 2 pipe(s)): '|**Part 3**|' — verify it isn't a table that lost columns during conversion.

### `docs\agentic-systems\memory\AI_Memory_Agent_Innovations_Research_Report.md`

- MEDIUM: Heading level jumps from H1 to H6 at '**PLATFORMS COMPARED:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PART A**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PART B**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**B.1 Memory Provenance & Trust Boundaries**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PART D**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**AP-01 Context Window Dependence**' — add an intermediate heading or fix the level.

### `docs\agentic-systems\platform\Enterprise_PromptOps_AWS_AgentCore_2026.md`

- LOW: H1 ('The Complete Prompt Lifecycle') doesn't match frontmatter title ('Enterprise PromptOps: Prompt Lifecycle Management for AWS AgentCore Runtime') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H1 to H3 at 'Lifecycle Ownership Matrix' — add an intermediate heading or fix the level.

### `docs\agentic-systems\platform\MultiTenantAgentPlatform_Architecture.md`

- LOW: H1 ('Multi-Tenant Agent Platform') doesn't match frontmatter title ('Multi-Tenant Agent Platform Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H2 to H4 at '1. Architecture Overview' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'CopilotRuntime setup — Option A:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Skill invocation pattern:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'ContextForge configuration:' — add an intermediate heading or fix the level.

### `docs\agentic-systems\platform\enterprise-agentic-ai-asset-management-2026.md`

- MEDIUM: Heading level jumps from H1 to H3 at 'Table of Contents' — add an intermediate heading or fix the level.
- LOW: Line 473 looks like a collapsed table row (only 2 pipe(s)): '|**PART 6**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 474 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 559 looks like a collapsed table row (only 2 pipe(s)): '|**PART 8**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 560 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.

### `docs\agentic-systems\platform\genaiaf-prompt-lifecycle-hotswap-research-2026.md`

- MEDIUM: Heading level jumps from H1 to H3 at 'Executive Summary' — add an intermediate heading or fix the level.
- LOW: Line 667 looks like a collapsed table row (only 2 pipe(s)): '|**§8**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 668 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-development\aidlc\AIDLC_Agile_CICD_AI_Transformation_2026.md`

- MEDIUM: Heading level jumps from H2 to H5 at '01 The Grand Transformation — Why Everything Is Changing at ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Era 1: Waterfall' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Generation 1: MLOps — The Classical Pipeline' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Is the Agile Manifesto Dead? The Vibe Coding vs Spec-Driven ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'BEFORE: Vibe Coding (Exploration)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'AGENTS.md / CLAUDE.md files' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Fundamental Problem: Binary Assertions vs. Probabilistic' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Prompt Versioning: The 7 Non-Negotiable Rules' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Developer's Daily Workflow Has Fundamentally Changed' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Phase 1 — Now (Month 1-3): Stop the Technical Debt Accumulat' — add an intermediate heading or fix the level.

### `docs\ai-development\aidlc\AIDLC_Artifact_Reference_Library.md`

- MEDIUM: Heading level jumps from H2 to H6 at 'PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'INPUTS TO THIS PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'CHARTER IDENTIFICATION' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'OUTPUT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'TECHNICAL FEASIBILITY ASSESSMENT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'INPUTS TO THIS PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'INPUTS TO THIS PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'OPTIONS CONSIDERED' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'INPUTS TO THIS PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'INPUTS TO THIS PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Auditor Sign-off' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'INPUTS TO THIS PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'OUTPUT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'INPUTS TO THIS PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'INPUTS TO THIS PHASE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Enforcement' — add an intermediate heading or fix the level.
- LOW: Line 125 looks like a collapsed table row (only 2 pipe(s)): '|**RCS-001**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 126 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 276 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 355 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 594 looks like a collapsed table row (only 2 pipe(s)): '|**UDD-001**|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-development\aidlc\AIDLC_Enterprise_Framework_2025.md`

- MEDIUM: Heading level jumps from H2 to H4 at '1. Introduction to AIDLC' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'AWS AI-DLC PARALLEL' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Key Outcomes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Key Outcomes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Key Outcomes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Key Outcomes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'CLOSING THESIS' — add an intermediate heading or fix the level.

### `docs\ai-development\aidlc\EA_AIDLC_Deep_Research_2026.md`

- MEDIUM: Heading level jumps from H2 to H4 at 'CROSS-CUTTING ARCHITECTURE CONCERNS' — add an intermediate heading or fix the level.

### `docs\ai-economics\AI-Value-Creator-Deliverables-Pack.md`

- MEDIUM: Heading level jumps from H1 to H4 at '**Companion document to: "AI Value Creators for Agentic AI a' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**DELIVERABLE 1 · AI Value Creation Reference Model**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Companion document to: "AI Value Creators for Agentic AI a' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**DELIVERABLE 1 · AI Value Creation Reference Model**' — add an intermediate heading or fix the level.

### `docs\ai-economics\AI_Cost_Implementation_Guide_2026.md`

- MEDIUM: 15 H1 headings found (expected exactly 1): ['router/main.py', 'litellm_config.yaml — mount as Kubernetes ConfigMap', 'cache/semantic_cache.py', 'cache/warming.py — seed semantic cache with high-frequency queries from Langfuse', 'docker-compose.yml — Enterprise AI Cost Control Platform (EACCP)', 'gateway/middleware.py', 'budget/manager.py', 'Monthly token budgets — override via env/config in production', 'observability/metrics.py', 'roi/scorecard.py', 'agents/budget_guard.py', 'agents/lazy_tools.py', 'agents/history.py', 'agents/prompt_trim.py']. Demote all but the first to H2 (or lower, matching its actual position in the outline).

### `docs\ai-economics\Agentic-AI-Use-Case-Value-Lifecycle.md`

- MEDIUM: Heading level jumps from H1 to H5 at '**Companion document to: "AI Value Creators for Agentic AI a' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Stage 1 — Discover · Weeks 1–8**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**WHY THIS MATTERS FOR THE VALUE CALCULATION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**FORMULA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**FORMULA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**FORMULA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**WHY BEAR CASE STILL RETURNS 4.3x**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**HOW TO USE THIS DOCUMENT**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Companion document to: "AI Value Creators for Agentic AI a' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Stage 1 — Discover · Weeks 1–8**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**WHY THIS MATTERS FOR THE VALUE CALCULATION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**FORMULA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**FORMULA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**FORMULA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**WHY BEAR CASE STILL RETURNS 4.3x**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**HOW TO USE THIS DOCUMENT**' — add an intermediate heading or fix the level.

### `docs\ai-foundations\AI_Native_Architecture_Evolution_Report.md`

- MEDIUM: Heading level jumps from H2 to H4 at 'Seven Cross-Cutting Findings' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Why It Emerged' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Starting a new data platform from scratch (greenfield)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Pattern / Technology' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '2026-2027: Semantic Layers Become the Primary Agent-Data Int' — add an intermediate heading or fix the level.

### `docs\ai-foundations\The_Agentic_Loop_Enterprise_AI_Architect_Guide.md`

- LOW: H1 ('The Agentic Loop') doesn't match frontmatter title ('The Agentic Loop - Enterprise AI Architect's Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H1 to H3 at '*A practitioner's guide to designing, governing, and scaling' — add an intermediate heading or fix the level.

### `docs\ai-protocols\auth\auth_identity_flows.md`

- MEDIUM: Heading level jumps from H2 to H4 at '**Four Authentication Patterns**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Step-by-Step Flow**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**IMDS Token Flow Diagram**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Client Credentials Flow Diagram**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Configuration Requirements**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**APIM validate-jwt Policy (Production Configuration)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Network Security Controls**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**10.1 Implementation Checklist**' — add an intermediate heading or fix the level.
- LOW: Line 168 looks like a collapsed table row (only 2 pipe(s)): '|**Azure Key Vault — Runtime Secret Injection (Zero Credenti' — verify it isn't a table that lost columns during conversion.
- LOW: Line 169 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 170 looks like a collapsed table row (only 2 pipe(s)): '|**ACA/AKS**<br>Workload<br>**IMDS /**<br>Entra ID<br>**Azur' — verify it isn't a table that lost columns during conversion.
- LOW: Line 173 looks like a collapsed table row (only 2 pipe(s)): '|**Secret Name**<br>**Type**<br>**Consumer**<br>**Rotation**' — verify it isn't a table that lost columns during conversion.
- LOW: Line 174 looks like a collapsed table row (only 2 pipe(s)): '|**aoai-api-key-primary**<br>API Key<br>Orchestrator, Worker' — verify it isn't a table that lost columns during conversion.

### `docs\ai-security-governance\security\01-Foundations-Reference-Architecture.md`

- MEDIUM: Heading level jumps from H2 to H6 at 'Architectural premise of this program' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Comparative note: how the framework vendors are positioning ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'STRIDE and PASTA — what still applies, and where they stop' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Design recommendation' — add an intermediate heading or fix the level.

### `docs\ai-security-governance\security\02-Identity-MCP-A2A-Security-Blueprint.md`

- MEDIUM: Heading level jumps from H2 to H6 at '**Where the standards landscape actually stands, June 2026**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Microsoft's framing of the shift**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Emerging standard: OWASP MCP Top 10 (beta, 2026)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Sensitive-payload gap**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**The single highest-leverage architectural investment in th' — add an intermediate heading or fix the level.

### `docs\ai-security-governance\security\04-AI-SOC-Observability-RedTeam-Memory.md`

- LOW: H1 ('AI SOC, Observability, Red/Purple Teaming & Memory Security') doesn't match frontmatter title ('AI SOC, Observability, Red Team & Memory Security') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H3 to H5 at '**Architectural recommendation**' — add an intermediate heading or fix the level.

### `docs\ai-security-governance\security\05-Economic-Security-FinOps-Commerce-PQC.md`

- LOW: H1 ('Economic Security: FinOps, Autonomous Commerce & Post-Quantum') doesn't match frontmatter title ('Economic Security, FinOps, Commerce & Post-Quantum Cryptography') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H3 to H5 at '**Design principle: one circuit breaker, two trigger sources' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Where this sits on the priority list**' — add an intermediate heading or fix the level.

### `docs\ai-security-governance\security\06-Operating-Model-Maturity-Roadmap.md`

- LOW: H1 ('Operating Model, Maturity Model & 24Month Roadmap') doesn't match frontmatter title ('Operating Model & Security Maturity Roadmap') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H2 to H4 at '**Architecture & Threat Modeling**' — add an intermediate heading or fix the level.

### `docs\ai-security-governance\security\07-Zero-to-Mastery-Curriculum.md`

- LOW: H1 ('Zero to Mastery Enterprise Agentic AI Security Architect') doesn't match frontmatter title ('Zero-to-Mastery Security Curriculum') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H2 to H4 at 'Program Structure' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'For instructors running this as a cohort' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**STAGE 0** -   Week 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'The mistake this concept exists to prevent' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'HANDS-ON LAB  Threat-Model a Simple Web Application' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Why this matters more than it sounds like it should' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'HANDS-ON LAB  MAESTRO Threat Model for a Customer Support Ag' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**STAGE 2** -   Week 3' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'What this actually buys you' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'HANDS-ON LAB  Design a Compound Identity Token' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'HANDS-ON LAB  Build a Minimal MCP Gateway Policy' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'HANDS-ON LAB  Design an A2A Trust Broker Decision' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**STAGE 5** -   Week 6' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'A trap to avoid' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'HANDS-ON LAB  Build a Framework Crosswalk and Classify an Ag' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'The single most common real-world gap in this area' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'HANDS-ON LAB  Design Cross-Surface Detection Logic' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'HANDS-ON LAB  Red Team and Purple Team Your Own System' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**STAGE 8** -   Week 9' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'The actual near-term action item' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BY THE END OF THIS STAGE, YOU WILL BE ABLE TO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'STAGE CAPSTONE  Ninety-Day Plan for a New Agentic Platform' — add an intermediate heading or fix the level.

### `docs\ai-security-governance\security\08-Architects-Field-Guide.md`

- LOW: H1 ('The Architect's Field Guide: A Real-World Walkthrough') doesn't match frontmatter title ('AI Security Architect's Field Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H3 to H5 at '**A note on realism**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE ARCHITECT'S REASONING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**DECISION POINT  Where do you spend your first three weeks?' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE ARCHITECT'S REASONING  Why this matters before any arc' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**EXHIBIT — SPIRE Registration Entry — Customer Support Agen' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**DECISION POINT  How does the agent carry 'who it's acting ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE ARCHITECT'S REASONING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE ARCHITECT'S REASONING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**DECISION POINT  Do you launch on the original two-week tim' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**FIELD NOTE — TRANSFERABLE LESSON**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE ARCHITECT'S REASONING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**FIELD NOTE — TRANSFERABLE LESSON**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CHAPTER 5**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**DECISION POINT  Which observability platform, and how much' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE ARCHITECT'S REASONING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**EXHIBIT — AI SOC Correlation Rule — CORR-014**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**FIELD NOTE — TRANSFERABLE LESSON**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE ARCHITECT'S REASONING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE ARCHITECT'S REASONING  Why the first analyst's stand-d' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**DECISION POINT  Do you disclose, and to whom, before the i' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**FIELD NOTE — TRANSFERABLE LESSON**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE ARCHITECT'S REASONING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**FIELD NOTE — TRANSFERABLE LESSON**' — add an intermediate heading or fix the level.
- LOW: Line 533 looks like a collapsed table row (only 2 pipe(s)): '|**Layer**<br>**Fix**<br>**Timeline**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 534 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-security-governance\security\Part4_Runtime_Security_Governance.md`

- LOW: H1 ('Part 4') doesn't match frontmatter title ('Agent Runtime, MCP Security & Governance') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H4 to H6 at '**MCP Server Security Requirements**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**MCP-Specific Security Risks (2024-2025 Research)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Complete AI Audit Chain (10 Steps)**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\CEO_Agent_Failure_Modes_Governance_Harness.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'Direct analogue' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Pre-production — Sandbox & simulation' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_01_Meridian_Fraud_Investigation_Agents.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H5 at '*Issued 4 February 2026 | Meridian Financial Group*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_03_Ironclad_Maintenance_Orchestration_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_05_Aurelia_Research_Assistant_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H5 at '*Draft v0.2 | Aurelia Biosciences*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_06_Skyline_Disruption_Control_Tower.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_07_Harborstone_Claims_Processing_Agents.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H3 to H5 at '*Issued 4 August 2026*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '*Q3 2027*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_08_Sterling_Loan_Underwriting_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_11_Vaxion_Clinical_Trial_Matching_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_12_Meritage_Dynamic_Pricing_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H5 at '*Approved v1.0 | Meritage Retail Group*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '*Q1 2028*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_13_StateDHS_Benefits_Navigation_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H5 at '*Approved v1.0 | State Department of Human Services*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_14_Falkirk_SOC_Threat_Response_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Case_15_Correlate_Recruiting_Screening_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H5 at '*Approved v1.0 | Correlate Global*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '*Correlate Global*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**EPILOGUE & ARTEFACT REGISTER**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Enterprise_AI_Case_Studies.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**Enterprise AI Transformations Under Real-World Complexity*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CONTEXT & OBJECTIVE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CONTEXT & OBJECTIVE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CONTEXT & OBJECTIVE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CONTEXT & OBJECTIVE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CONTEXT & OBJECTIVE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CONTEXT & OBJECTIVE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CONTEXT & OBJECTIVE**' — add an intermediate heading or fix the level.

### `docs\ai-usecases\Part6_Banking_Case_Study.md`

- MEDIUM: Heading level jumps from H1 to H3 at '**Case Study — Regulated Banking Institution**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Bank Technology Stack**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Sample OPA Rego Policy — GitHub Tool Authorization**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Privileged Action Approval Requirements**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Compliance Framework to Architecture Control Mapping**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Banking AI Architecture Anti-Patterns**' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\ai-gateway\AI_Gateway_MultiTenant_MultiCloud.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H3 to H5 at 'CHAPTER C' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'CHAPTER D' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Residency-Aware Routing' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **`Config`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **`Config`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **`Config`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **`Config`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **`Formula`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **`Formula`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **`Formula`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'CHAPTER H' — add an intermediate heading or fix the level.
- LOW: Line 309 looks like a collapsed table row (only 2 pipe(s)): '|I**`Cloudflare Worker — edge auth + rate pre-check (snippet' — verify it isn't a table that lost columns during conversion.
- LOW: Line 310 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 311 looks like a collapsed table row (only 2 pipe(s)): '|`export default {`|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 312 looks like a collapsed table row (only 2 pipe(s)): '|`async fetch(request, env) {`|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 313 looks like a collapsed table row (only 2 pipe(s)): '|`// 1. Validate JWT at edge (no origin round-trip)`|' — verify it isn't a table that lost columns during conversion.

### `docs\cloud-platforms\ai-gateway\Enterprise_AI_Gateway.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'Provider Lock-in & API Fragmentation' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'SSE Proxy & Fan-out' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **Config snippet**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **Config snippet**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **Config snippet**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **Config snippet**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **Config snippet**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **Config snippet**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'I **Carbon-aware routing plugin (pseudo-snippet)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Virtual Keys' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Metrics (Prometheus / Datadog)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'I **CI/CD Pipeline Integration — snippet**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'I **Data Platform & RAG Integration — snippet**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'I **Service Mesh Integration (Istio) — snippet**' — add an intermediate heading or fix the level.
- LOW: Line 55 looks like a collapsed table row (only 2 pipe(s)): '|I**Cost**<br>**Reduction**<br>**40–70%**<br>Semantic cachin' — verify it isn't a table that lost columns during conversion.
- LOW: Line 56 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 57 looks like a collapsed table row (only 2 pipe(s)): '|I**Latency P99**<br>**Improvement**<br>Intelligent routing ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 58 looks like a collapsed table row (only 2 pipe(s)): '|I**Compliance**<br>**Acceleration**<br>Centralised PII reda' — verify it isn't a table that lost columns during conversion.
- LOW: Line 59 looks like a collapsed table row (only 2 pipe(s)): '|I**Developer**<br>**Velocity**<br>A single SDK against a un' — verify it isn't a table that lost columns during conversion.

### `docs\cloud-platforms\aws\AWS_Native_Standards_First_Agentic_Architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H6 at 'ROLE LENSES APPLIED:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'PART 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'PART 2' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'PART 3' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\aws\AWS_Strands_AgentCore_AdvancedPatterns_v3.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at 'TABLE OF CONTENTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'A1.1 Hook Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`hooks_production.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'A2.1 The Two HITL Patterns in Strands' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`hitl_hook_pattern.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`hitl_toolcontext.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`async_hitl_sqs.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`circuit_breaker.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'A3.1 Why Agents Need Checkpointing' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`session_manager.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`dynamodb_checkpointer.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`agentcore_memorysaver.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`multi_tier_memory.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'A4.1 Architecture & Security Model' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`code_interp_isolated.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`data_analysis_agent.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'A5.1 Browser Tool Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`browser_agent.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`browser_extraction.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`nova_act_erp.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'A6.1 What Is the Meta Tool Pattern' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`meta_tool_full.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`dynamic_tools.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'A7.1 AgentCore Memory Branching (Parallel Agent Graphs)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`memory_branching.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`structured_output.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`import_agent.sh`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`claude_code_a2a.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`injection_defence.py`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '`cost_routing.py`' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\aws\AWS_Strands_AgentCore_Builder_Journey_Kit.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**TABLE OF CONTENTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '12.4 Production Checklist' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Key design pillars:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**The Strands agentic loop follows the ReAct (Reason + Act) ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**AgentCore Runtime provisions a dedicated MicroVM per user ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**requirements.txt / setup**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**my_agent.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**tools.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**CLI**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**invoke.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**custom_agent/main.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**agui_agent.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**short_term_memory.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**long_term_memory.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**create_gateway.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**agent_with_gateway.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**apigateway_mcp.yaml**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Dockerfile**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**cognito.tf**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**outbound_auth.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**sigv4_mcp.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**cross_tenant_a2a.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**policy.json**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**supervisor_pattern.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**a2a_protocol.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**swarm.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**cloudwatch_setup.sh**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**phoenix_deploy.sh**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**phoenix_instrumentation.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**strands_eval.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**llm_judge.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**guardrail.yaml**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**pii_pipeline.py**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CHAPTER 10**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**api_gateway.tf**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'I **BEST PRACTICE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'I **ANTI-PATTERN**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'I **ANTI-PATTERN**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**main.tf**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'II **NOTE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Key URLs & Resources' — add an intermediate heading or fix the level.
- LOW: Line 1443 looks like a collapsed table row (only 2 pipe(s)): '|**Production Reference Architecture**<br>IIIIIIIIIIIIIIIIII' — verify it isn't a table that lost columns during conversion.
- LOW: Line 1444 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 1445 looks like a collapsed table row (only 2 pipe(s)): '|I`CONSUMER LAYER`I|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 1446 looks like a collapsed table row (only 2 pipe(s)): '|I`Web App / Mobile`→`API Gateway (REST + MCP Proxy)`→`Lambd' — verify it isn't a table that lost columns during conversion.
- LOW: Line 1447 looks like a collapsed table row (only 2 pipe(s)): '|I`Partner Systems`→`A2A Protocol (JWT-federated, cross-tena' — verify it isn't a table that lost columns during conversion.

### `docs\cloud-platforms\aws\AWS_Strands_AgentCore_Delta_Supplement_v2.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '**CHAPTER D1 — Strands Ecosystem Extensions**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**D1.1 Strands TypeScript SDK — Full Feature Parity**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'GA · Feb 2026' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`bidi_agent.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **WHAT'S NEW**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`strands_evals_new.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`multi_mcp.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**D2.1 What Is AgentSkills and Why It Matters**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`skill_structure/`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`agentskills_patterns.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`agentcore_with_skills.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**D3.1 AgentOps Architecture & Core Concepts**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`agentops_quickstart.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`agentops_decorators.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`agentops_agentcore.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **BEST PRACTICE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**D4.1 Strands Labs Overview**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Launched Feb 24, 2026' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`ai_functions.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`robot_agent.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`robots_sim.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**D5.1 Full Release Timeline**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`cedar_policy.cedar`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`agentcore_evaluations.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`episodic_memory.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`memory_streaming.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**D6.1 Three-Platform Observability Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`observability_bootstrap.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**`phoenix_prompts.py`**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**D7.1 New Best Practices from GA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **ANTI-PATTERN**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'II **NOTE**' — add an intermediate heading or fix the level.
- LOW: Line 966 looks like a collapsed table row (only 2 pipe(s)): '|**`Production 3-Layer Observability Architecture`**<br>IIII' — verify it isn't a table that lost columns during conversion.
- LOW: Line 967 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 968 looks like a collapsed table row (only 2 pipe(s)): '|I`LAYER 1: AgentCore Native (Zero-Config, Always-On)`I|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 969 looks like a collapsed table row (only 2 pipe(s)): '|I`CloudWatch Transaction Search + GenAI Dashboard`I|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 970 looks like a collapsed table row (only 2 pipe(s)): '|I`• Span-level traces for every invocation, tool call, auth' — verify it isn't a table that lost columns during conversion.

### `docs\cloud-platforms\aws\AgentCore_Memory_Architecture_Guide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'Strands Framework  ·  EU Banking  ·  Session Resume Patterns' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '3.1 Memory Resource, Events & Namespaces' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Write short-term event' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '4.1 Short-Term Memory (Working Memory)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '4.3 Episodic Memory' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '5.1 How Claude / ChatGPT Build Their Sidebars' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '5.2 The Three Layers of Session State' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '6.1 Scenario A: Resume Within Idle Timeout (Warm Start)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Invoke with same runtimeSessionId' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Cold start — new microVM provisions' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Reconstruction Context Block — Example System Prompt Injecti' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '7.1 Single Agent — Isolated Namespace' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '11.1 Mandatory Hooks' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'PIIRedactionHook ·** ***MessageAddedEvent (before write)*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'ANTI-PATTERNS (Avoid)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'PHASE 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Memory Resource with Strictly Consistent Metadata (memory_re' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '18.2 Final Recommendations' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'A.1 Session Status Detection' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'B.1 List Sessions (Sidebar Render)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'C.1 Warm Pool Heartbeat' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'D.1 Resume Scenario Tests' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\aws\AgentCore_Memory_Gaps_Extensions_2026.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '1. FileSessionManager — The Missing Chapter' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Single agent (file backend):' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Required infrastructure (Terraform / CDK):' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Graphiti wiring in a Strands hook:' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\aws\AgentCore_Memory_Operations_DeepDive.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'CreateEvent with metadata — full parameter set:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '<mark>`return 'HOLD'`</mark>' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part10_Observability.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'PART X OBSERVABILITY' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**CHAPTER 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The Three Pillars**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**OpenTelemetry Components**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Auto-Instrumentation with OTel Operator**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Prometheus Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Thanos Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Thanos Deployment Pattern**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Essential Kubernetes Dashboards**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Loki Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Tracing Concepts**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Tempo Deployment and Configuration**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Fluent Bit Pipeline Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Fluent Bit ConfigMap for Kubernetes**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Loki vs Elasticsearch Decision Matrix**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**SLO Definitions**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Alert Hierarchy**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Alertmanager Production Configuration**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**OpenCost Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Cost Allocation Queries**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**DCGM Exporter Metrics Reference**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**DCGM Exporter Deployment**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**LLM Inference Metrics**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**LLM Observability with OpenTelemetry**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Capacity Planning Signals**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Capacity Planning Prometheus Queries**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Anti-Pattern: Alert fatigue -- alerting on symptoms not ca' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Exercise 10.1 -- Deploy the Full Observability Stack**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**End of Part X -- Continue to Part XI: Kubernetes for AI In' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part11_AI_Infrastructure.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**CHAPTER 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**GPU Operator Installation**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Kubeflow Pipeline Example**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**RayCluster for LLM Inference**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**InferenceService for LLM (vLLM runtime)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**SGLang Kubernetes Deployment**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**LiteLLM Proxy on Kubernetes**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Milvus Operator Deployment**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**AMD ROCm on Kubernetes**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Anti-Pattern: One model per Deployment for serving**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**End of Part XI -- Continue to Part XII: Kubernetes for Ent' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part12_Agentic_AI.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'CHAPTER 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Temporal Deployment with Helm' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Agentic Research Pipeline in Argo Workflows' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Shared MCP Server Deployment' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'A2A via Kafka on Kubernetes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Agent Worker Pod Resource Profiles' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Karpenter for Dynamic GPU Node Provisioning' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Kata Containers for Untrusted Agent Code Execution' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Redis for Agent Working Memory' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Tool Lifecycle Governance' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'ConfigMap-Based Prompt Registry (GitOps)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Agent CRD Design' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Secret Injection for Agent Tools' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'OpenTelemetry for Agent Tracing' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Prompt CI/CD Pipeline' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Hub-Spoke Agent Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'End of Part XII -- Continue to Parts XIII, XIV, XV, XVI' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part13_Emerging_Standards.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at 'CHAPTER 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '<mark>MCP and A2A: Complementary Standards</mark>' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'OpenAI API Compatibility as the De Facto Standard' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'CHAPTER 5' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part14_Reference_Architectures.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at 'CHAPTER 1' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part15_Implementation_Labs.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at '**LAB GUIDE OVERVIEW**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**LAB 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Verification Commands:**' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part16_Future_Outlook.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'CHAPTER 1' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part1_Infrastructure_Evolution.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'CHAPTER 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '<mark>Key Insight</mark>' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Architecture: Physical Server Model' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Anti-Patterns That Kubernetes Eliminates' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Hypervisor Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Memory Virtualisation — Extended Page Tables (EPT)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'The Boot Time Problem' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'The Microservices Catalyst' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Container isolation mechanisms:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Omega — Advancing the Scheduler' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Desired state reconciliation' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'IDP Core Capabilities' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Anti-Pattern: Lift-and-shift monoliths into Pods' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Phase 1: Containerise' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'End of Part I — Continue to Part II: Linux Foundations' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part2_Linux_Foundations.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**CHAPTER 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**<mark>Key Insight</mark>**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**CFS mechanism — how Kubernetes CPU resources map to kernel' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Created with:** `clone(CLONE_NEWPID)`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Created with:** `clone(CLONE_NEWNET)`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Created with:** `clone(CLONE_NEWNS)`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Created with:** `clone(CLONE_NEWUSER)`' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**cgroups Filesystem Layout for a Kubernetes Pod**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Copy-on-Write (CoW) Mechanics**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Linux Network Bridge**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Packet Flow: Pod-to-Pod Cross-Node**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**iptables at Scale — The kube-proxy Problem**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**runc config.json — The OCI Runtime Spec**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**CHAPTER 13**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Namespace and Container Inspection**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Issue: Pod OOMKilled**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**End of Part II — Continue to Part III: Containers**' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part3_Containers.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'PART III CONTAINERS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**CHAPTER 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Container Stack Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**<mark>Key Insight</mark>**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Docker Component Architecture (Before and After Decomposit' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Production Dockerfile with BuildKit Features**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**OCI Image Specification -- Internal Structure**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**<mark>Critical: Always Pull by Digest in Production</mark>' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**containerd -- The Production Default**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Key containerd Production Configuration**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**CRI-O vs containerd comparison:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Multi-Stage Builds -- Production Pattern**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Go Application -- Scratch Image**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Enterprise Registry Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Image Lifecycle Policies**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Layer Cache Optimisation**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The Supply Chain Threat Model**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Sigstore -- The Signing Ecosystem**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Keyless Signing Workflow in CI/CD**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Why SBOMs Are Now Mandatory**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Generating and Attaching SBOMs**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**SLSA Overview**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**SLSA Provenance -- What It Contains**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Scanning Architecture for Kubernetes**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Trivy -- Production Scanning Configuration**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Defence in Depth for Running Containers**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Falco Deployment in Kubernetes**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Anti-Pattern: Running containers as root**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Exercise 3.1 -- Multi-Stage Build Optimisation**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**End of Part III -- Continue to Part IV: Kubernetes Interna' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part4_Kubernetes_Internals.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'PART IV KUBERNETES INTERNALS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**CHAPTER 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**High-Level Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**API Server Responsibilities**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**API Groups and Versioning**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**API Server Scalability and HA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**etcd Architecture and Raft Consensus**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**etcd Key-Value Structure for Kubernetes**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**etcd Compaction and Defragmentation**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Scheduling Lifecycle**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Scheduler Profiles and Multiple Schedulers**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**GPU Node Taint/Toleration Pattern**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The Reconciliation Loop Pattern**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**CCM Controllers**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**LoadBalancer Service -- CCM in Action**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**kubelet Responsibilities**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**kubelet Static Pods**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**kube-proxy Modes**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**DNS Resolution Hierarchy**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**CoreDNS Corefile Configuration**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Built-in Admission Controllers**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**<mark>Webhook Failure Modes -- Critical Production Conside' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**CRD Structure**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Operator Maturity Model**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Leader Election Mechanism**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Complete Lifecycle: kubectl apply -> Pod Running**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Issue: Pod stuck in Pending**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Exercise 4.1 -- Watch the Reconciliation Loop**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**End of Part IV -- Continue to Part V: Kubernetes Resources' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part5_Kubernetes_Resources.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'PART V KUBERNETES RESOURCES' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**CHAPTER 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Universal Resource Structure**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Complete Production Pod Specification**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Deployment -- Stateless Workloads**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**StatefulSet Guarantees vs. Deployment**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Jobs -- Run-to-Completion Workloads**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**AI/ML Training Job Pattern**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Service Types Reference**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Ingress**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**ConfigMaps -- Externalised Non-Secret Configuration**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**<mark>Secret Security Warning</mark>**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Storage Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Access Modes**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Namespace Strategy**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**RBAC Model**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Default Deny -- Zero Trust Starting Point**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Microservices Network Policy Pattern**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Autoscaling Layers**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**PriorityClass -- Workload Preemption**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**PDB Anti-Patterns**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**RuntimeClass**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**CHAPTER 17**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Exercise 5.1 -- StatefulSet DNS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**End of Part V -- Continue to Part VI: Kubernetes Networkin' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part6_Kubernetes_Networking.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**CHAPTER 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Calico BGP Configuration**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Cilium L7 Network Policy**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Topology-Aware DNS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**ingress-nginx Production Configuration**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Gateway API for AI Serving**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Issue: Pod cannot reach another Pod**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**End of Part VI -- Continue to Part VII: Storage**' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part7_Storage.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'PART VII STORAGE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'CHAPTER 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Three Storage Layers' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'CSI Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'CSI Sidecar Containers' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'StorageClass Production Examples' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Volume Snapshot Workflow' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Volume Cloning' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'AWS EBS CSI -- Production Configuration' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Ceph Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Rook CephCluster Configuration' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Longhorn Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Mayastor (OpenEBS v3) -- NVMe Performance' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'NFS-based StorageClass with nfs-subdir-external-provisioner' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'I/O Path Optimisation' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'AI Artifact Storage Requirements' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'S3-Compatible Model Storage with Mountpoint' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Model Registry Architecture Patterns' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'MLflow Deployment on Kubernetes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Vector Database Storage Sizing' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Qdrant on Kubernetes -- Production Deployment' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Velero -- Kubernetes Backup and DR' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Key Storage Metrics' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Storage Capacity Planning' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Anti-Pattern: Using Delete reclaim policy for production dat' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Exercise 7.1 -- Dynamic Provisioning and Expansion' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'End of Part VII -- Continue to Part VIII: Security' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part8_Security.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'PART VIII KUBERNETES SECURITY' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'CHAPTER 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Kubernetes Threat Model' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Zero Trust Principles Applied to Kubernetes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Authentication Methods' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Common RBAC Roles Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'RBAC Audit Queries' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'SPIFFE Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'SPIRE on Kubernetes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'HashiCorp Vault Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'cert-manager Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'cert-manager ClusterIssuer and Certificate' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'mTLS Implementation Options' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Pod Security Standards (PSS)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Complete Restricted Pod Security Context' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'OPA Gatekeeper -- Rego Policies' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'End-to-End Supply Chain Pipeline' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Falco -- CNCF Runtime Security' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Falco Alerting Integration' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Confidential Computing Hardware' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Control Plane' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'EU AI Act -- Kubernetes-Specific Requirements' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Incident Response Playbook' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Exercise 8.1 -- RBAC Hardening' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'End of Part VIII -- Continue to Part IX: Platform Engineerin' — add an intermediate heading or fix the level.

### `docs\cloud-platforms\kubernetes\K8s_Handbook_Part9_Platform_Engineering.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'PART IX PLATFORM ENGINEERING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**CHAPTER 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The Platform Engineering Value Proposition**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**GitOps Four Principles**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Recommended GitOps Repository Structure**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**ArgoCD Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Flux Controllers**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Helm Chart Structure**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Production Helm Values Pattern**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Kustomize Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Kustomization Files**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Backstage Core Components**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Backstage Software Template for AI Service**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Crossplane Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Crossplane: Self-Service Database**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Cluster Management Tools**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Multi-Tenancy Models**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**vCluster -- Virtual Clusters**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Argo Rollouts -- Progressive Delivery Controller**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Cluster Bootstrap Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Standard Namespace Labels and Annotations**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Self-Service Capabilities Matrix**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Namespace-as-a-Service Pattern**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**AI Platform Golden Paths**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**DORA Metrics and Kubernetes Indicators**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Anti-Pattern: Building a platform nobody uses**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Exercise 9.1 -- GitOps with ArgoCD**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**End of Part IX -- Continue to Part X: Observability**' — add an intermediate heading or fix the level.

### `docs\coding-tools\claude\Claude_Ecosystem_Research_Report.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H6 at 'Comprehensive Research Report' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H1 to H5 at '**2.1 Architectural Overview**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**3.1 Why Context Engineering Supersedes Prompt Engineering*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**4.1 What Is CLAUDE.md?**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**5.1 Agent Topology Patterns**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**6.1 MCP Architecture Overview**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**7.1 Claude Code Configuration Hierarchy**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**8.1 Token Cost Drivers**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**9.1 Emerging Consensus Among Power Users**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**10.1 Comprehensive Risk Register**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**11.1 Enterprise Adoption Roadmap**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**12.1 The Agentic SDLC**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**13.1 Principal AI Architect Competency Model**' — add an intermediate heading or fix the level.
- LOW: Line 567 looks like a collapsed table row (only 2 pipe(s)): '|Real-time token usage dashboards; per-agent, per-task, per-' — verify it isn't a table that lost columns during conversion.
- LOW: Line 568 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 569 looks like a collapsed table row (only 2 pipe(s)): '|anomaly alerting; session cost estimates before execution|' — verify it isn't a table that lost columns during conversion.

### `docs\coding-tools\claude\Module_1_Claude_Foundations.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**What You Will Master in This Module**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**The Three Core Properties (Always Tested in Domain 5)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Model Selection Decision Tree**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Hard Limits (Cannot Be Overridden at Any Tier)**' — add an intermediate heading or fix the level.

### `docs\coding-tools\claude\Module_3_Prompt_Engineering.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**What You Will Master in This Module**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**The Six Components of a Production System Prompt**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**System Prompt Versioning Best Practice**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**<b>Mode</b> <b>How to Enable</b> <b>Description</b> <b>Bes' — add an intermediate heading or fix the level.
- LOW: Line 138 looks like a collapsed table row (only 2 pipe(s)): '|**<b>Use extended thinking for</b>**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 139 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 140 looks like a collapsed table row (only 2 pipe(s)): '|**<b>Do NOT use for</b>**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 141 looks like a collapsed table row (only 2 pipe(s)): '|**<b>Cost impact</b>**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 142 looks like a collapsed table row (only 2 pipe(s)): '|**<b>max_tokens rule</b>**|' — verify it isn't a table that lost columns during conversion.

### `docs\coding-tools\claude\Module_4_MCP.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**What You Will Master in This Module**' — add an intermediate heading or fix the level.

### `docs\coding-tools\claude\Module_5_Claude_Code_Agents.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**What You Will Master in This Module**' — add an intermediate heading or fix the level.

### `docs\coding-tools\claude\Module_6_Claude_Workflows.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**What You Will Master in This Module**' — add an intermediate heading or fix the level.

### `docs\coding-tools\claude\Module_7_Safety_Enterprise_Exam.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**What You Will Master in This Module**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Tier 1: Hard Limits (Anthropic Training) — NEVER Overridab' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**<b>Week</b> <b>Activities & Milestones</b>**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Q1: A streaming request returns stop_reason='max_tokens'. ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Q6: Which technique reduces missed fields in contract extr' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Q10: A company wants Claude to reference internal policy d' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Q19: Which is the SIMPLEST HIPAA-compliant path for an ent' — add an intermediate heading or fix the level.

### `docs\coding-tools\claude\claude_agents_best_practices_v2.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**01**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'I **Architectural Insight**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'II **Context Rot — Real Threshold**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'I **Critical: CLAUDE.md is NOT the System Prompt**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'II **Agent Teams Cost Warning**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'I **The /agents Redesign (Apr 2026)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'I **Google Workspace MCP (gws)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'I **Memory Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Tier 1: Prompt Caching (Biggest Win)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'I **CI Cost Tip**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'I **Critical Rule**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Anti-Pattern #1: Kitchen Sink CLAUDE.md**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Anti-Pattern #5: Agent Teams for Simple Parallelism**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Anti-Pattern #9: Over-Formatting Hook**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Anti-Pattern #12: The Kitchen Sink Session**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Anti-Pattern #16: 35-Tool MCP Server**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Anti-Pattern #18: Unpinned Model Version**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**RESEARCH**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'I **Final Summary**' — add an intermediate heading or fix the level.
- LOW: Line 24 looks like a collapsed table row (only 2 pipe(s)): '|ReAct loop, 9-step pipeline, 5-layer compaction, 98.4% infr' — verify it isn't a table that lost columns during conversion.
- LOW: Line 25 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 26 looks like a collapsed table row (only 2 pipe(s)): '|SKILL.md mastery, description engineering, compaction budge' — verify it isn't a table that lost columns during conversion.
- LOW: Line 27 looks like a collapsed table row (only 2 pipe(s)): '|Explore-Plan-Execute, domain routing, Agent Teams, model<br' — verify it isn't a table that lost columns during conversion.
- LOW: Line 28 looks like a collapsed table row (only 2 pipe(s)): '|Handler types, async, HTTP, security gates, PostToolUseFail' — verify it isn't a table that lost columns during conversion.

### `docs\coding-tools\code-review\PR_Review_Handbook_Vol1_Traditional_Review.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H5 at '**Companion volumes in this series:**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**2.1 Junior Developer**' — add an intermediate heading or fix the level.

### `docs\coding-tools\code-review\PR_Review_Handbook_Vol2_Deep_Domain_Reviews.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**Database Migration Review Checklist**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Documentation Review Checklist**' — add an intermediate heading or fix the level.

### `docs\coding-tools\code-review\PR_Review_Handbook_Vol5_Case_Studies_Maturity_Model.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H3 to H5 at '**PR #4821 — "Add real-time balance snapshot endpoint" — 3 f' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PR #9103 — "Rename orders.promo_code to orders.discount_co' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PR #2290 — "Grant triage-agent access to refund-issuance t' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**11.1 Architecture**' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\GitHub_Copilot_Enterprise_Research_2026.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'Comprehensive Research Report — 15-Phase Analysis' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Strategic Positioning' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Capability Maturity Model' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Agent Lifecycle — Five Phases' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Core SDK Capabilities' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Four-Tier Instruction Hierarchy' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'GitHub Primitives as OS Components' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Traditional vs AI-Native SDLC' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Context Engineering' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Active Threat Vectors' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'AI Credits — Plan Entitlements' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Enterprise Adoption Roadmap' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Platform Comparison Matrix' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Competency Framework' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Forecast: 1-Year, 3-Year, 5-Year' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'DEVELOPER LAYER' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'GitHub Official' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part01_Git_Internals.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Q: What is the difference between a Git blob and a tree?**' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part02_GitHub_Architecture_and_Actions.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Q: What is the difference between pull_request and pull_re' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part04_RAG_Agents_Models_Platform.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part04_Runners_and_Runtime.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Q: How does a self-hosted runner communicate with GitHub? ' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part06_Marketplace_Pages_Packages.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Q: Why should you pin GitHub Actions to commit SHAs instea' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part07_Prompts_Evaluation_Spark_Infrastructure.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part11_CICD_Secrets_Security.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Q: Explain blue-green vs canary deployments and when to us' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part11_Security_Governance.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part13_CICD_Observability_Scaling.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part14_Enterprise_APIs_Apps_CLI.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Q: What is the difference between a GitHub App and an OAut' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\Part16_Artifacts_ReferenceArchitecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.
- LOW: Line 52 looks like a collapsed table row (only 2 pipe(s)): '|**Artifact**<br>**Problem addressed**<br>**Transferable les' — verify it isn't a table that lost columns during conversion.
- LOW: Line 53 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 54 looks like a collapsed table row (only 2 pipe(s)): '|Embrace The Red — CVE-2025-53773 disclosure<br>Whether an a' — verify it isn't a table that lost columns during conversion.
- LOW: Line 55 looks like a collapsed table row (only 2 pipe(s)): '|'Comment and Control' cross-vendor disclosure (Apr 2026)<br' — verify it isn't a table that lost columns during conversion.
- LOW: Line 56 looks like a collapsed table row (only 2 pipe(s)): '|StepSecurity / Harden-Runner write-ups<br>Native CI/CD agen' — verify it isn't a table that lost columns during conversion.

### `docs\coding-tools\github-copilot\Part18_Ecosystem_Patterns_Labs.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '**TOPICS COVERED**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Q: Design a GitHub Actions CI/CD system for 500 microservi' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\copilot-enterprise-playbook.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**Table of Contents**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H1 to H5 at '**Plan Inclusions (Post June 1, 2026)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Best Practices by Role**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Token Amplification Risks**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Governance Hierarchy**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Context Strategy Comparison**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Routing Decision Tree**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Tool Comparison Matrix**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Category A — Context & Prompt Anti-Patterns (#1–10)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Architecture Review Checklist**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Key Trends**' — add an intermediate heading or fix the level.

### `docs\coding-tools\github-copilot\github-copilot-big-wins-research.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at 'Compiled from: GitHub Blog, Microsoft Research, Accenture RC' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '04 Multi-Agent Orchestration Patterns' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'RANDOMIZED CONTROLLED TRIAL' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'BEFORE/AFTER DEPLOYMENT STUDY' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'CONTROLLED BEFORE/AFTER' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'FINANCIAL SERVICES ENTERPRISE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'SUPPLY CHAIN ENGINEERING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'LARGEST SINGLE DEPLOYMENT' — add an intermediate heading or fix the level.
- LOW: Line 644 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 645 looks like a collapsed table row (only 2 pipe(s)): '|`for PROTECTED in "${PROTECTED_PATHS[@]}"; do`<br>`if [[ "$' — verify it isn't a table that lost columns during conversion.
- LOW: Line 646 looks like a collapsed table row (only 2 pipe(s)): '|`exit 0`<br>`fi`<br>`done`|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 647 looks like a collapsed table row (only 2 pipe(s)): '|`# 2. Detect secrets in content being written`<br>`SECRET_P' — verify it isn't a table that lost columns during conversion.
- LOW: Line 650 looks like a collapsed table row (only 2 pipe(s)): '|`jq -n '{"decision":"deny","reason":"Potential secret in wr' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\architectural-review-board\Volume10_Collaborative_Use_Case_Transcripts.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '**HOW TO USE THESE TRANSCRIPTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**SETTING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**AUTOMATED PRE-SCREEN REPORT — AI FRAUD DETECTION INITIATIV' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**SETTING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**SETTING**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\architectural-review-board\Volume1_Governance_Ecosystem_Operating_Models.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H5 at '**HOW TO USE THIS MAP**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**DESIGN PRINCIPLE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE SHADOW STANDARDS BOARD**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**A PRACTICAL DIAGNOSTIC SEQUENCE**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\architectural-review-board\Volume2_Economics_Decision_Science.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H4 to H6 at '**FORMULA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**PRACTICAL CAUTION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**CD3 — COST OF DELAY DIVIDED BY DURATION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**WHERE AI ROI CALCULATIONS COMMONLY GO WRONG**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**PRACTICAL LEVERS FOR ARCHITECTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**CAUSALITY CAUTION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**WORKED EXAMPLE STRUCTURE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**LIMITATION TO STATE EXPLICITLY**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**ATAM'S NINE STEPS (CONDENSED)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**WHY THIS IS HARD TO SELL INTERNALLY**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**BANKING-RELEVANT EVOLUTIONARY OBSERVATIONS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**MINIMUM VIABLE PRACTICE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**QUICK REFERENCE FOR CHOOSING A FRAMEWORK UNDER TIME PRESSU' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\architectural-review-board\Volume4_Artifact_Catalog_Quality_Attributes.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**HOW TO READ THIS CATALOG**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\architectural-review-board\Volume5_Review_Questions_Scorecards.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H5 at '**HOW TO USE THIS BANK IN AN ACTUAL REVIEW**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Q: WHAT BUSINESS CAPABILITY DOES THIS INITIATIVE SERVE, AN' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Q: WHAT ARCHITECTURAL PATTERN DOES THIS FOLLOW, AND WHY WA' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Q: WALK THROUGH THE AUTHENTICATION AND AUTHORIZATION MODEL' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**A SCORECARD DISCIPLINE WORTH STATING EXPLICITLY**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\architectural-review-board\Volume7_AI_Native_ARB_Case_Studies.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**A GROUNDING CAVEAT BEFORE THIS SECTION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**A NOTE ON HOW TO READ THESE CASE STUDIES**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\architectural-review-board\Volume9_Enterprise_Reference_Repository.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at 'USING MERMAID DIAGRAMS IN LIVING DOCUMENTATION' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'graph LR' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'flowchart TD' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'ADR-001 — ADOPT APACHE KAFKA AS ENTERPRISE EVENT STREAMING B' — add an intermediate heading or fix the level.
- LOW: Line 59 looks like a collapsed table row (only 2 pipe(s)): '|**sequenceDiagram**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 60 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 61 looks like a collapsed table row (only 2 pipe(s)): '|**PaymentService->>FraudService: CheckFraud(paymentId)**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 62 looks like a collapsed table row (only 2 pipe(s)): '|**FraudService-->>PaymentService: FraudCheckPassed**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 63 looks like a collapsed table row (only 2 pipe(s)): '|**PaymentService->>AMLService: ScreenTransaction(paymentId)' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\best-practices\EA_BestPractices_Jargon.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H6 at '**CATEGORY: GOVERNANCE & PROCESS**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\best-practices\EA_Glossary_CheatSheet.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at '**TABLE OF CONTENTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**CHEAT SHEET 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**CHEAT SHEET 2**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**CHEAT SHEET 3**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**CHEAT SHEET 4**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**CHEAT SHEET 5**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**CHEAT SHEET 6**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Detection Signal**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Key Claims/Tokens**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Pitfall**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Distinguished**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\framework\EA_Soft_Skills_Interview_Master_Guide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'SECTION 01 — EXECUTIVE PRESENCE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H1 to H6 at 'QUESTION 1.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'INTERVIEW INTENT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'INTERVIEW INTENT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 2.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 3.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 5.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 8.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 11.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 16.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'INTERVIEW INTENT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'INTERVIEW INTENT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 17.1' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\framework\Enterprise_AI_Architect_Communication_Guide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H6 at '**Why This Matters for Your Career**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**SECTION 02**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Strategic Advice**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Slide 1: Value Map**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Scope Discipline Ritual**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Engagement Layer**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**SAFe / Agile Integration**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**SRE Integration Checklist**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Listening Techniques for Architects**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**SECTION 09**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Days 1–30**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Days 31–60**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Cadence Principles**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Measure your communication maturity across all four arenas —' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Continuous growth practices for the Enterprise AI / Principa' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Enterprise & Business Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Final Thought**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\framework\Executive_Communication_Framework_Guide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at '**TABLE OF CONTENTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**SECTION 01 — The Communication Pyramid**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**THE FIVE REGISTERS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**THE STRUCTURE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**THE STRUCTURE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**THE STRUCTURE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**THE STRUCTURE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**THE STRUCTURE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**THE AUDIENCE MATRIX**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**THE THREE LENSES**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**THE FRAMEWORK**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**THE THREE CONVERSATIONS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**AP2 The Certainty Performance**' — add an intermediate heading or fix the level.
- LOW: Line 276 looks like a collapsed table row (only 2 pipe(s)): '|**SC**<br>**Situation · Complication · Resolution**<br>Orig' — verify it isn't a table that lost columns during conversion.
- LOW: Line 277 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 278 looks like a collapsed table row (only 2 pipe(s)): '|**R**<br>*Use when: Strategic presentations, investment cas' — verify it isn't a table that lost columns during conversion.
- LOW: Line 279 looks like a collapsed table row (only 2 pipe(s)): '|**THE STRUCTURE**<br>**S**<br>**Situation**<br>Establish th' — verify it isn't a table that lost columns during conversion.
- LOW: Line 280 looks like a collapsed table row (only 2 pipe(s)): '|**C**<br>**Complication**<br>Introduce the disruption: the ' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\process\EA_Lifecycle_Artifact_Templates_2026.md`

- MEDIUM: Heading level jumps from H1 to H4 at 'TOGAF 10 ADM · All Phases · AI-First Extensions' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '***TOGAF 10 COMPLIANCE: All standard TOGAF 10 artifacts are ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**PHASE OUTPUT**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**WORK DEFINITION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '! **AI EXTENSION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '! **AI EXTENSION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '! **AI EXTENSION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '! **AI EXTENSION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '! **AI EXTENSION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**PHASE OUTPUT**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '! **AI EXTENSION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**PHASE OUTPUT**' — add an intermediate heading or fix the level.
- LOW: Line 444 looks like a collapsed table row (only 2 pipe(s)): '|**ASRF-001**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 445 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 572 looks like a collapsed table row (only 2 pipe(s)): '|L5 — Leading<br>Industry benchmark; external thought<br>lea' — verify it isn't a table that lost columns during conversion.
- LOW: Line 573 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 574 looks like a collapsed table row (only 2 pipe(s)): '|**Current Maturity Level (May 2026)**<br>L2 transitioning t' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\process\EA_Mastery_Guide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**TOGAF 10 — The Open Group Architecture Framework**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Cloud Architecture (Multi-Cloud & Hybrid)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **Priority:** II **IMPORTANT**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Business Capability Mapping**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '*Mark Richards & Neal Ford (2020)*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Patterns of Enterprise Application Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**The Open Group Blog**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Archi (free)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Lucidchart**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Confluence**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Influence Without Authority**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Architecture Is Enabling, Not Controlling**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\process\EA_Real_Life_Transcript.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**A DAY IN THE LIFE OF AN**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Cast of Characters**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Diana Cole — CDO**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'I **10:00 | Monday 3 February 2025**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Blueprinting the Future Weeks 6–12 | February' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'I **30% Architecture Compliance Review**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Marcus Webb — Enterprise Architect**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Annual Rationalisation Month 14 |' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Marcus Webb — Enterprise Architect**' — add an intermediate heading or fix the level.
- LOW: Line 340 looks like a collapsed table row (only 2 pipe(s)): '|`- Priya's data architecture team must define CDM before De' — verify it isn't a table that lost columns during conversion.
- LOW: Line 341 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 342 looks like a collapsed table row (only 2 pipe(s)): '|`REVIEW DATE: Q1 2026 (post-implementation)`|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 343 looks like a collapsed table row (only 2 pipe(s)): '|`ARB CHAIR SIGN-OFF: Diana Cole (CDO) DATE: 03/02/2025`|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 345 looks like a collapsed table row (only 2 pipe(s)): '|**Stage Outcomes**|' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\process\Enterprise_AI_Architect_Bible_2026.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H5 at '01 The Enterprise AI Architect Role in 2026' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'MARKET SIGNAL' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'NEGOTIATION NOTE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'STRATEGIC FRAMING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'INTERVIEW TRAP' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'CHAPTER 03' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'KEY INSIGHT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '2026 STANDARD' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'RAGAS FRAMEWORK' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'CHAPTER 05' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'CHAPTER 06' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'CHAPTER 07' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Key Components:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Key Components:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Key Components:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Key Components:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Key Components:' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'CHAPTER 08' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '[ BEGINNER ]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'INTERVIEW SIGNAL' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'INTERVIEW SIGNAL' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'INTERVIEW SIGNAL' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'INTERVIEW SIGNAL' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'INTERVIEW SIGNAL' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'FINAL ADVICE' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\process\Enterprise_Agentic_AI_Architecture_Playbook_2026.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H3 to H5 at 'Cost Optimization' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Agent Frameworks' — add an intermediate heading or fix the level.
- LOW: Line 63 looks like a collapsed table row (only 2 pipe(s)): '|**THEME**<br>**02**<br>**CONTEXT ENGINEERING**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 64 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 362 looks like a collapsed table row (only 2 pipe(s)): '|**PRINCIPAL AI ARCHITECT DELIVERABLES**<br>8 Deliverables ·' — verify it isn't a table that lost columns during conversion.
- LOW: Line 363 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 364 looks like a collapsed table row (only 2 pipe(s)): '|**D1**<br>**Enterprise Agent Platform Reference Architectur' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\specialization\AI_Transformation_Consultant_Toolkit_2026.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'Client Engagement Bible' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'TABLE OF CONTENTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '1.1 The 5 Client Archetypes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'ARCHETYPE 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'PART 2' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '2.1 Data Readiness Scorecard' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Data Availability' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Overall Readiness Interpretation' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '3.1 Executive / C-Suite Discovery (25 Questions)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Strategic Intent' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Infrastructure & Cloud' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Data Quality Reality Check' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Pain Discovery' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Q1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Q1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '4.1 CEO / CAIO Interview Guide' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Opening Frame (2 minutes)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Opening Frame' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Facilitation Rules' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '5.1 Use Case Scoring Rubric' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Q1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'PART 6' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '6.1 Executive FAQs — The Sceptical CEO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Q: How do I know this isn't just hype? My team has told me A' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Q: Should we build our own LLM or use an API?' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Q: What does the EU AI Act mean for us?' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Q: How do we communicate AI to employees who are scared of l' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '7.1 Pre-Engagement Checklist' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Consultant Preparation' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Data Architecture [CRITICAL]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Quality Gates' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Week 1–4: Intensive Monitoring (Daily)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '8.1 AI Business Case Template' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Structure' — add an intermediate heading or fix the level.
- LOW: Line 1413 looks like a collapsed table row (only 2 pipe(s)): '|A: For 95% of enterprises: use an API. Building a foundatio' — verify it isn't a table that lost columns during conversion.
- LOW: Line 1414 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 1420 looks like a collapsed table row (only 2 pipe(s)): '|A: Short answer: start with RAG, add fine-tuning for style ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 1421 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 1433 looks like a collapsed table row (only 2 pipe(s)): '|A: Three layers: architectural, operational, and human. Arc' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\specialization\APEX_EA_Final.md`

- MEDIUM: Heading level jumps from H2 to H4 at 'Document Control' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\specialization\DSA_Principal_Architect_Reference.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H3 to H5 at '**Dijkstra & Bellman-Ford**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Tarjan's Bridge Finding — O(V+E)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Segment Tree with Lazy Propagation — O(log n) query/update' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Tree DP — Max Independent Set O(n)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Knapsack variants + Bitmask TSP**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Convex Hull Trick — O(n) amortized**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**LFU Cache — O(1) all operations**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Bloom Filter — O(k) add/lookup, k = (m/n)ln2**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Consistent Hashing with Virtual Nodes — O(log n) lookup**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Inversion Count + K-way Merge — O(n log n) / O(n log k)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Time**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\specialization\EA_Business_Communication_Executive_Skills.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**MASTERY GUIDE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at '**Every Framework, Script, Template & Conversation You Need*' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Financial Literacy — The Non-Negotiable Baseline**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Total Cost of Ownership (TCO)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**EA with business acumen**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**THE PYRAMID PRINCIPLE**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**AFTER — Pyramid Principle (Assertion** → **Arguments** → *' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The Four Pillars of EA Executive Presence**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Preparation Gravitas**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The Mendelow Stakeholder Matrix — Your Mapping Tool**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **The CFO Who Won't Approve the Business Case**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**BATNA — Your Most Important Negotiation Concept**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Negotiation Script — EA Holds the Line on Architecture Sta' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The 5-Slide Executive Architecture Brief**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**SLIDE 1: THE RECOMMENDATION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **TEMPLATE: Architecture One-Pager Structure**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The 5-Second Email Test**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Executive Email — Pyramid Principle**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **TEMPLATE: Architecture Decision Record (ADR) — Standard ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**BOARD / CEO (30 seconds)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The EA Meeting Taxonomy — Know Which Room You're Running**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**ARB Opening — Sets the Frame**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**De-escalation Script — When Two Stakeholders Are in Confli' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The 5 Laws of Organisational Politics for EAs**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Presenting a Recommendation to an Executive When You Have ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '***"The EA who speaks in numbers, listens with curiosity, de' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\specialization\EA_OKR_KPI_Research.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'FOR ENTERPRISE ARCHITECTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'SECTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Core Components' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'SECTION 2' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Types of KPIs' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'SECTION 3' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Comparison Matrix' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Why EA Measurement Is Uniquely Challenging' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'SECTION 5' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '1. Strategic Alignment' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'SECTION 6' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'O1: Reduce technology fragmentation and redundancy across th' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Attribution Challenge' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Recommended Implementation Phases' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'SECTION 9' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\specialization\Enterprise_Data_Architect_AI_GenAI.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '*"The Enterprise Data Architect of the GenAI era is not just' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'PHASE 1 RFP Discovery & Intelligence' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'To the CEO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'JPMorgan Chase' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'McKinsey & Company' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '! **Think Business-First, Architecture-Second**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\specialization\Enterprise_Manager_AI_GenAI.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '*"The Enterprise Manager of the GenAI era leads not just tea' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '! **Managing AI Anxiety in Your Team**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'PHASE 1 Discovery & Qualification' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'To the CEO / Executive Sponsor' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Amazon' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'McKinsey & Company' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '! **Lead with Curiosity, Not Fear**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\specialization\Principal_Enterprise_AI_Guide_Educative.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('<mark>Principal &</mark> Enterprise AI Architect') doesn't match frontmatter title ('Principal Enterprise AI Architect') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H1 to H3 at 'Scenario & Strategy Mastery' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'MODULE 01' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Lesson 1.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **The Three Planes of Principal Impact**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **What Real Job Descriptions Say**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '! **KEY TAKEAWAYS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Lesson 2.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'II **AI Gateway — Required Capabilities**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Routing Criteria: Complexity Axis' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Performance' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Lesson 3.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **RAG Quality Levers — From Naive to Production-Grade**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **REAL-WORLD SCENARIO — Legal Firm RAG — Citation Accuracy' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **The Context Window Budget Framework**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Lesson 4.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'II **The Five Non-Negotiable Safety Controls**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Orchestrator-Specialist Pattern' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **The 4-Tier Agentic Evaluation Framework**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Lesson 5.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'II **Embedding EU AI Act Compliance in Your CI/CD Pipeline**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Fairness Metrics — Know the Difference' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Lesson 6.1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **The 5-Component AI Business Case Framework**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Technical Language (Engineer)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **REAL-WORLD SCENARIO — Stalled AI Program — 12% Adoption ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Sources' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\specialization\RFI_AI_Platform_Transcript.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H5 at 'ENTERPRISE ARCHITECTURE | PROCUREMENT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Why an RFI? Why Now? Week 1 | Monday 7' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'I **RFI Drafting Session 1 — Scope & Requirements**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Microsoft Rep — Azure AI Enterprise Sales' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Phase Outcomes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Alan Brooks — CISO' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Google Rep — Google Cloud — Enterprise AI Sales' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Marcus Webb — EA' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\strategy\EA_AI_First_Transformation_Transcript.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'The Moment It Becomes Unavoidable' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Attendees: Marcus (EA), Lisa Park (Advisor)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Priya Nair — Head of Data Architecture**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Sarah Chen — CAIO**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Raj Patel — Head of Retail Operations**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'I **AI Use Case Prioritisation — Full Leadership Team**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Board Member (via Diana) — Board**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Zara Okonkwo — BCG X — AI Transformation Partner**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'I **ARTIFACT: AI Transformation Review — 18-Month Report**' — add an intermediate heading or fix the level.
- LOW: Line 362 looks like a collapsed table row (only 2 pipe(s)): '|IAI Readiness Assessment (AIRA-2025-001) approved by board ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 363 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 364 looks like a collapsed table row (only 2 pipe(s)): '|IPilot selected: Demand Forecasting / Markdown Optimisation' — verify it isn't a table that lost columns during conversion.
- LOW: Line 365 looks like a collapsed table row (only 2 pipe(s)): '|ICAIO hire authorised. MLOps Engineer hire authorised.|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 366 looks like a collapsed table row (only 2 pipe(s)): '|ICustomer Data Platform workstream funded as AI foundation|' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\strategy\EA_Strategy_Playbook.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H4 at '**How EA Creates Strategy from Pitch to Retire**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Strategic Purpose**' — add an intermediate heading or fix the level.
- LOW: Line 8 looks like a collapsed table row (only 2 pipe(s)): '|**1. PITCH**<br>**2. APPROVE**<br>**3. DESIGN**<br>**4. BUI' — verify it isn't a table that lost columns during conversion.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\strategy\Enterprise_AI_Strategic_Brief_2026.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H6 at '**<u>SECTION 02</u>**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Signals, Concerns & Opportunities for the Enterprise**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'I **CONCERNS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**AIOps Maturity Model: Five Stages**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**The Critical Governance Gap**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**<u>The AEGIS Framework: Six Domains of Agentic AI Security' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Mythos-Class Attack Defense**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Key Velocity Changes: SDLC vs ADLC**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H1 to H5 at '**Infrastructure Before Models**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Observe Before Automating**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Govern at Agent Speed**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Treat Mythos as a Security Forcing**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Build Evaluation Competency Now**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Speak to the Board in Financial Terms**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\strategy\Enterprise_AI_Transformation_Blueprint_CTO_Guide_2026.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H6 at 'PART 7 END-TO-END WORKED EXAMPLE' — add an intermediate heading or fix the level.
- LOW: Line 58 looks like a collapsed table row (only 2 pipe(s)): '|7.1 — Customer Support Agent: Spec→Context→Agent→Eval→Deplo' — verify it isn't a table that lost columns during conversion.
- LOW: Line 59 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\transformation\00_Executive_Summary_and_AI_Vision.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**Contents of this deliverable**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\transformation\01_Current_State_Assessment_and_AI_Maturity.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'Contents of this deliverable' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\transformation\02_AI_Opportunity_Portfolio.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**Contents of this deliverable**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\transformation\03_Enterprise_AI_Platform_and_Data_Architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**Contents of this deliverable**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\transformation\04_Governance_Responsible_AI_and_Security.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**Contents of this deliverable**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\transformation\05_Target_Operating_Model_and_Change.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**Contents of this deliverable**' — add an intermediate heading or fix the level.

### `docs\enterprise-architecture\transformation\06_Roadmap_Financials_KPIs_and_Risk.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '**Contents of this deliverable**' — add an intermediate heading or fix the level.

### `docs\interview-prep\AI_Agent_Systems_Interview_Guide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H3 to H5 at '**Senior Interview Answer Pattern**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**Common Interview Failure**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**The Soft Intervention (Underused Pattern)**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Scope containment**' — add an intermediate heading or fix the level.
- LOW: Line 279 looks like a collapsed table row (only 2 pipe(s)): '|**Scenario**<br>**Why Plan-Then-Execute Wins**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 280 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 281 looks like a collapsed table row (only 2 pipe(s)): '|Well-specified tasks with stable world<br>Pre-planning is c' — verify it isn't a table that lost columns during conversion.
- LOW: Line 282 looks like a collapsed table row (only 2 pipe(s)): '|Tasks requiring long-horizon resource management Resources ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 283 looks like a collapsed table row (only 2 pipe(s)): '|Tasks with expensive tool calls<br>Pre-planning can avoid u' — verify it isn't a table that lost columns during conversion.

### `docs\interview-prep\Enterprise_Architect_in_the_Age_of_AI.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Enterprise Architect in the Age of AI Agents, Copilots & Workflow Automation') doesn't match frontmatter title ('Enterprise Architect in the Age of AI') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H1 to H3 at 'A Comprehensive Role Definition for the Modern Era' — add an intermediate heading or fix the level.

### `docs\interview-prep\Enterprise_GenAI_Architect_Interview_Guide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'HOW TO USE THIS GUIDE' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '! **ANSWER**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Agentic Systems' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '! **ANSWER**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '! **ANSWER**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Security / Adversarial AI' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '! **ANSWER**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '! **ANSWER**' — add an intermediate heading or fix the level.

### `docs\interview-prep\ea\EA_Interview_Handbook.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'Enterprise AI · Cloud Strategy · Security Architecture · Ide' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '01 Enterprise Architecture Foundations' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at 'Each question includes' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [TOGAF] [Governance] [Cloud-Native]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   CHIEF ARCHITECT   [Capability Map] [Banking] [Business ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   CHIEF ARCHITECT   [AI Investment] [CFO] [Business Case]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [Zero Trust] [Multi-Cloud] [Design]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [Identity] [Scale] [Multi-Cloud]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [Data Mesh] [Data Fabric] [Architecture' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   CHIEF ARCHITECT   [Platform Team] [When to Create] [Tea' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [Multi-Cloud] [Hybrid] [Strategy]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [AI Operating Model] [Governance] [SR 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [Agent Identity] [Authorization] [RFC 8' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   PRINCIPAL   [SLOs] [AI Systems] [Observability]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [Banking AI] [Global Platform] [Design]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [Multi-Cloud] [CTO Defence] [Tradeoffs]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Q1   DISTINGUISHED   [Transformation] [Failure Patterns] [Fi' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'DISCUSSION HINTS' — add an intermediate heading or fix the level.

### `docs\interview-prep\ea\EA_Interview_Handbook_DELTA.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at '∆ **DELTA EDITION**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'D1 — Post-Quantum Cryptography Migration' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [PQC] [NIST] [Crypto-Agility] [Bankin' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [EU AI Act] [Compliance Architecture]' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   CHIEF ARCHITECT   [AI FinOps] [Cost Governance] [LLM ' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [Composable Architecture] [PBC] [MACH' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [Supply Chain] [SBOM] [Third-Party Ri' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   CHIEF ARCHITECT   [Sustainable Architecture] [CSRD] [' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [Integration] [EDA] [API Economy] [Mo' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [DORA] [Operational Resilience] [Arch' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [Autonomous Operations] [AIOps] [Self' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [Responsible AI] [Explainability] [Fa' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   PRINCIPAL   [Edge Computing] [Edge AI] [Distributed A' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [EA Leadership] [Value Proposition] [' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Delta Addition**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Delta Priority**' — add an intermediate heading or fix the level.

### `docs\interview-prep\ea\EA_Interview_Master_Guide.md`

- MEDIUM: Heading level jumps from H1 to H3 at 'CONTENTS' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'SECTION 01 — Executive Presence' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'QUESTION 1' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'WHAT THE PANEL IS ASSESSING' — add an intermediate heading or fix the level.

### `docs\interview-prep\ea\EA_Interview_Vol3_CTO_AI.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H1 to H3 at 'Interview Handbook — Volume 3' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'G **Section 18 — CTO Round**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**SECTION 18**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   CTO   [Technology Strategy] [5-Year Plan] [Board] [Co' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**PREPARATION HINTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [Prompt Injection] [LLM Security] [De' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**PREPARATION HINTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**PREPARATION HINTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [Agent Identity] [SPIFFE] [Scale] [Wo' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**PREPARATION HINTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**PREPARATION HINTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**Q1   DISTINGUISHED   [AI Audit Trail] [SR 11-7] [EU AI Act' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**PREPARATION HINTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**PREPARATION HINTS**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**SCORECARD 1 — CTO ROUND**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**WB-01 — LLM Gateway Architecture [Chief Architect] [40 min' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**RA-1: Enterprise AI Platform**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**AI Model Hosting Strategy**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**AR-1 — Customer Credit Advice AI Assistant [Chief Architec' — add an intermediate heading or fix the level.
- LOW: Line 3708 looks like a collapsed table row (only 2 pipe(s)): '|**Holistic AI**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 3709 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 3710 looks like a collapsed table row (only 2 pipe(s)): '|EU AI Act compliance,|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 3711 looks like a collapsed table row (only 2 pipe(s)): '|risk assessment,<br>vendor risk|' — verify it isn't a table that lost columns during conversion.

### `docs\knowledge-engineering\data\Data_Architecture_for_AI_Report.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'Five Critical Findings' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '1. The Lakehouse Has Won the Storage War' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Traditional Data Warehouse (1990–2010)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Apache Iceberg — Deep Dive' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Apache Spark (Batch + Micro-batch)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Databricks' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Property Graph' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Neo4j — LEADER | Property Graph + Cypher' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**Microsoft Research (2024):** GraphRAG on the same datasets' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Microsoft 365 Copilot' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Online Store' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'dbt Semantic Layer + MetricFlow' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Collibra — ENTERPRISE LEADER' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'HNSW (Hierarchical Navigable Small World)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Data Ownership & Stewardship' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'EU AI Act (2024)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Microsoft 365 Copilot' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'AI-Native Data Platforms' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '**ADOPT** Proven in enterprise production. Recommend for new' — add an intermediate heading or fix the level.

### `docs\knowledge-engineering\data\End_to_End_Lineage_Systems_Report.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'Six Critical Findings' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Why Six Layers, and Why This Order' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'What This Layer Answers' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'What Changed From Data Lineage' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'What Changed From Feature Lineage' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'What Changed From Model Lineage' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'What Changed From Prompt Lineage' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'What This Layer Answers, and Its Relationship to the Other L' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Impact Analysis by Layer' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Root Cause Investigation Chain for AI Incidents' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Step 1 — Agent Lineage (Layer 5)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Compliance Evidence Generation Problem' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Explainability Requirements by Stakeholder' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'How Multi-Agent Architectures Change the Lineage Problem' — add an intermediate heading or fix the level.

### `docs\knowledge-engineering\data\Enterprise_Data_Systems_AI_Governance_Report.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'Six Critical Findings' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '1. Streaming Is Becoming the Default, Not the Exception' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Data Warehouse' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Batch Processing — Hadoop, Spark Batch, Hive' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'ETL (Extract, Transform, Load)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Apache Spark' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Data Ownership' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Technical Lineage' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Data Quality Monitoring' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Metrics' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'SLOs (Service Level Objectives) for Data' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Netflix' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'IAM (Identity & Access Management)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'GDPR (EU)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Responsible AI' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'MCP (Model Context Protocol)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Glean' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Scalability' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'Kafka Outages — Partition Reassignment Storms' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'ADOPT' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at '1. Storage Costs' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Data Quality & Observability' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H6 at 'Convergence of Data and AI Observability Platforms' — add an intermediate heading or fix the level.

### `docs\knowledge-engineering\knowledge\Autonomous_Knowledge_Engineering_System.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at '**Spotify — Backstage: the Service Catalog as the Front Door' — add an intermediate heading or fix the level.

### `docs\knowledge-engineering\knowledge\Enterprise_Knowledge_Architectures_Report.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H4 at 'Six Critical Findings' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Formality/Agility Spectrum' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'What a Knowledge Graph Is — and Why the Definition Matters' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'The Semantic Web Stack' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'The Property Graph Data Model' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at 'Recap: The Semantic Layer's Original Purpose' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'Top-Down: Ontology-First Modeling' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Grounding Spectrum: From Documents to Structured Facts' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Document-Level Grounding (Vector Retrieval)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'What 'Multi-Hop' Actually Means' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'OWL/RDF (Inference-Based Multi-Hop)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'The Three Retrieval Mechanisms and What Each Is Good At' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at 'Vector Similarity (Embedding-Based)' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'What Knowledge Governance Must Cover Beyond Data Governance' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '1. Establish Ownership Before Scale' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at 'GraphRAG vs. Vector-Only RAG' — add an intermediate heading or fix the level.

### `docs\quantum\IBM_Associate_Quantum_CertGuide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('TABLE OF CONTENTS') doesn't match frontmatter title ('IBM Certified Associate Developer — Quantum Computation Study Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.
- MEDIUM: Heading level jumps from H1 to H3 at '**SECTION 1**' — add an intermediate heading or fix the level.

### `docs\quantum\Quantum_AI_Consultancies_Report.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H6 at '**SECTION 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**THE CORE PROBLEM EVERY CONSULTANCY IS SOLVING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**SECTION 2**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**THE PROBLEM CLIENTS BRING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM CLIENTS BRING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM CLIENTS BRING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM CLIENTS BRING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**THE PROBLEM CLIENTS BRING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Pattern 1: The Vendor-Relationship IS the Product**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Procurement Anti-Patterns**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**SECTION 9**' — add an intermediate heading or fix the level.
- LOW: Line 135 looks like a collapsed table row (only 2 pipe(s)): '|Hiring McKinsey QuantumBlack expecting deep production-buil' — verify it isn't a table that lost columns during conversion.
- LOW: Line 136 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 137 looks like a collapsed table row (only 2 pipe(s)): '|Treating the Quantum Technology Monitor's industry-wide fig' — verify it isn't a table that lost columns during conversion.
- LOW: Line 138 looks like a collapsed table row (only 2 pipe(s)): '|Engaging QuantumBlack for narrow technical quantum circuit ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 139 looks like a collapsed table row (only 2 pipe(s)): '|Assuming the 9-24 month consulting-model timeline (shared a' — verify it isn't a table that lost columns during conversion.

### `docs\quantum\Quantum_AI_Startups_Report.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H6 at '**SECTION 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**THE CORE PROBLEM EVERY STARTUP IS SOLVING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**SECTION 2**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Pattern 1: 'Quantum-Inspired Now, Quantum-Ready Later' Gen' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Hardware-Selection Anti-Patterns**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**SECTION 10**' — add an intermediate heading or fix the level.
- LOW: Line 76 looks like a collapsed table row (only 2 pipe(s)): '|755% year-on-year revenue growth in Q1 2026 ($64.7M, exceed' — verify it isn't a table that lost columns during conversion.
- LOW: Line 77 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 78 looks like a collapsed table row (only 2 pipe(s)): '|$470M in Remaining Performance Obligations (up 554% YoY) si' — verify it isn't a table that lost columns during conversion.
- LOW: Line 79 looks like a collapsed table row (only 2 pipe(s)): '|Sold the first 6th-generation, chip-based 256-qubit system ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 80 looks like a collapsed table row (only 2 pipe(s)): '|Becoming critical INFRASTRUCTURE for other quantum startups' — verify it isn't a table that lost columns during conversion.

### `docs\quantum\Quantum_AI_TechGiants_Report.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- MEDIUM: Heading level jumps from H2 to H6 at '**SECTION 1**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**THE CORE PROBLEM EVERY GIANT IS SOLVING**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**SECTION 2**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**THE PROBLEM**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H6 at 'CUDA-Q platform • GPU-accelerated quantum simulation' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H5 at '**Pattern 1: Hybrid-First, Not Quantum-First**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H2 to H4 at '**Strategic Anti-Patterns**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H4 to H6 at '**SECTION 9**' — add an intermediate heading or fix the level.

### `docs\soft-skills\Strategic_Thinking_Handbook.md`

- MEDIUM: Heading level jumps from H2 to H4 at '**Part I — Strategic Analysis Frameworks**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.
- MEDIUM: Heading level jumps from H3 to H5 at '**PURPOSE / CORE IDEA**' — add an intermediate heading or fix the level.

### `docs\about.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('About This Knowledge Base') doesn't match frontmatter title ('About & Site Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-systems\platform\agentic_platform_bestpractices.md`

- LOW: Line 164 looks like a collapsed table row (only 2 pipe(s)): '| # requirements.txt strands-agents[otel] langfuse # ── Envi' — verify it isn't a table that lost columns during conversion.
- LOW: Line 165 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.

### `docs\agentic-systems\platform\ai-msf-requirements-runbook.md`

- LOW: H1 ('AI-Assisted Microservice') doesn't match frontmatter title ('AI-MSF PoC — Shared Requirements & Agent Runbook') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\platform\ai-platform-factory-runbook-v2.md`

- LOW: H1 ('AI Platform Factory') doesn't match frontmatter title ('AI Platform Factory Runbook v2') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\01-foundations-what-is-a-coding-skill.md`

- LOW: H1 ('Part 1 — Foundations: What Is a Coding Skill?') doesn't match frontmatter title ('Foundations: What Is a Coding Skill?') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\02-skill-anatomy-and-metadata-schema.md`

- LOW: H1 ('Part 2 — Internal Structure of a Coding Skill (+ Deliverable 4: Metadata Schema)') doesn't match frontmatter title ('Skill Anatomy & Metadata Schema') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\03-discovery-and-execution-lifecycle.md`

- LOW: H1 ('Part 3 — Skill Discovery & Part 4 — Execution Lifecycle (+ Deliverable 2)') doesn't match frontmatter title ('Skill Discovery & Execution Lifecycle') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\04-skills-tools-mcp-relationship.md`

- LOW: H1 ('Part 5 — Skills vs. MCP & the Full Responsibility Stack (+ Deliverable 3)') doesn't match frontmatter title ('Skills vs. MCP & the Full Responsibility Stack') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\05-tool-definitions-and-instructions-engineering.md`

- LOW: H1 ('Part 6 — Tool Definitions & Part 7 — Instructions Engineering (+ Deliverable 5)') doesn't match frontmatter title ('Tool Definitions & Instructions Engineering') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\06-repository-context-engineering.md`

- LOW: H1 ('Part 8 — Repository Context (+ Deliverable 6: Context Engineering Framework)') doesn't match frontmatter title ('Repository Context Engineering') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\07-vscode-devcontainers-integration.md`

- LOW: H1 ('Part 9 — VS Code Enhancement & Part 10 — Dev Containers (+ Deliverable 7)') doesn't match frontmatter title ('VS Code & Dev Containers Integration') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\08-mcp-integration-and-memory.md`

- LOW: H1 ('Part 11 — MCP Integration & Part 12 — Memory') doesn't match frontmatter title ('MCP Integration & Memory') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\09-multi-agent-and-observability.md`

- LOW: H1 ('Part 13 — Multi-Agent Skills & Part 14 — Logging and Tracing (+ Deliverable 9)') doesn't match frontmatter title ('Multi-Agent Skills & Observability') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\10-governance-and-security.md`

- LOW: H1 ('Part 15 — Governance & Part 16 — Security') doesn't match frontmatter title ('Governance & Security') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\11-evaluation-reusability-deduplication.md`

- LOW: H1 ('Part 17 — Evaluation · Part 18 — Skill Reusability · Part 19 — Preventing Duplication') doesn't match frontmatter title ('Evaluation, Reusability & Deduplication') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\coding\12-enterprise-workflows-comparative-analysis-and-patterns.md`

- LOW: H1 ('Part 20 — Enterprise Development Workflows · Part 21 — Comparative Analysis (+ Deliverables 1 & 10)') doesn't match frontmatter title ('Enterprise Workflows & Comparative Analysis') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\01-foundations-what-is-an-agent-skill.md`

- LOW: H1 ('Part 1 — Foundations: What Is an Agent Skill?') doesn't match frontmatter title ('Foundations: What Is an Agent Skill?') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\02-skill-anatomy-and-metadata-schema.md`

- LOW: H1 ('Part 2 — Skill Anatomy & Metadata Schema') doesn't match frontmatter title ('Skill Anatomy & Metadata Schema') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\03-execution-lifecycle-and-tracing.md`

- LOW: H1 ('Part 3 — Skill Execution Lifecycle (+ Deliverable 2: End-to-End Flow)') doesn't match frontmatter title ('Skill Execution Lifecycle & Tracing') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\04-skills-tools-mcp-a2a-relationship.md`

- LOW: H1 ('Part 4 — Relationship Between Skills, Tools, MCP, and A2A (+ Deliverable 3: Decision Matrix)') doesn't match frontmatter title ('Skills, Tools, MCP & A2A Relationship') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\05-tool-definition-best-practices.md`

- LOW: H1 ('Part 5 — Tool Definitions Inside Skills (+ Deliverable 5: Best-Practice Template)') doesn't match frontmatter title ('Tool Definition Best Practices') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\06-registry-discovery-and-deduplication.md`

- LOW: H1 ('Part 6 + Part 8 — Avoiding Duplication, Registry & Discovery Architecture (+ Deliverable 9)') doesn't match frontmatter title ('Registry, Discovery & Deduplication') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\07-composition-and-instructions-engineering.md`

- LOW: H1 ('Part 7 — Skill Composition & Part 9 — Instructions Engineering') doesn't match frontmatter title ('Skill Composition & Instructions Engineering') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\08-observability-and-evaluation.md`

- LOW: H1 ('Part 10 — Logging & Tracing + Part 13 — Evaluation (+ Deliverable 7)') doesn't match frontmatter title ('Observability & Evaluation') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\09-security-architecture.md`

- LOW: H1 ('Part 12 — Security (+ Deliverable 8: Security Architecture)') doesn't match frontmatter title ('Security Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\10-governance-and-lifecycle.md`

- LOW: H1 ('Part 11 — Governance (+ Deliverable 6: Governance Model)') doesn't match frontmatter title ('Governance & Lifecycle') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-systems\skill\enterprise\11-architecture-patterns-antipatterns-and-case-studies.md`

- LOW: H1 ('Part 14 — Architecture Patterns · Part 15 — Anti-Patterns · Part 16 — Vendor Case Studies (+ Deliverable 10)') doesn't match frontmatter title ('Architecture Patterns, Anti-Patterns & Case Studies') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\agentic-ui\agent-ux-patterns.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\agui-standards-landscape.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\anti-patterns.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\application-lifecycle.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\context-engineering.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\decision-frameworks.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\devsecops.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\enterprise-reference-architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\evaluation-framework.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\evolution-human-ai-interfaces.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\future-outlook.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\governance.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\identity-auth-architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\industry-reference-architectures.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\observability.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\performance-engineering.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\reliability-engineering.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\responsible-ai.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\scalability-engineering.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\agentic-ui\security-architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-development\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-economics\ai-coding-agents-2026.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('AI Coding Agent Assistants: The Complete 2026 Landscape') doesn't match frontmatter title ('AI Coding Agents 2026') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-economics\ai-value-creators-synthesis.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-economics\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_business_layer.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_context_engineering.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_eu_ai_act.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_evaluation.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_memory_architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_multiagent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_platform_layer.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_playbooks.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_tier3_complete.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\agentic_ai_landing_zone_visual_guide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-foundations\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-protocols\auth\index.md`

- LOW: H1 ('Authentication & Identity for Agentic AI') doesn't match frontmatter title ('Authentication & Identity') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-protocols\mcp\MCP_Deep_Research_2026.md`

- LOW: H1 ('MCP Deep Research Report: Architecture, Security, Capabilities & Ecosystem (2026)') doesn't match frontmatter title ('MCP Deep Research 2026') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-protocols\mcp\index.md`

- LOW: H1 ('Model Context Protocol (MCP)') doesn't match frontmatter title ('MCP') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-protocols\standards\emerging-protocols-acp-anp.md`

- LOW: H1 ('Section 2A: ACP & ANP — Federated and Decentralised Agent Protocols') doesn't match frontmatter title ('Section 2A: ACP & ANP Deep Dives — Federated and Decentralised Agent Protocols') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-protocols\standards\emerging-protocols-agui-utcp.md`

- LOW: H1 ('Section 2B: AG-UI and UTCP — Enterprise Architecture Deep Dive') doesn't match frontmatter title ('Section 2B: AG-UI & UTCP — Enterprise Architecture Deep Dive (July 2026)') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-protocols\standards\emerging-protocols-beyond-mcp-a2a.md`

- LOW: H1 ('Emerging AI Agent Protocols Beyond MCP & A2A') doesn't match frontmatter title ('Emerging AI Agent Protocols Beyond MCP & A2A (2026)') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-protocols\standards\emerging-protocols-crosscutting.md`

- LOW: H1 ('Section 3 — Cross-Cutting Architecture') doesn't match frontmatter title ('Section 3 — Cross-Cutting Architecture: Security, Governance, Compliance & Observability') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-protocols\standards\emerging-protocols-overview.md`

- LOW: H1 ('Emerging AI Agent Protocols Beyond MCP & A2A') doesn't match frontmatter title ('Emerging AI Agent Protocols Beyond MCP & A2A — Enterprise Architecture, Standards, Security, and Adoption (2026)') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-protocols\standards\emerging-protocols-ucp-ap2-nlip-lmos.md`

- LOW: H1 ('Section 2C — Emerging AI Agent Protocols: UCP, AP2, NLIP & LMOS') doesn't match frontmatter title ('Section 2C — Emerging AI Agent Protocols: UCP, AP2, NLIP & LMOS Deep Dives') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\Sovereign_Constitutional_AI_RAI_Implementation_Handbook.md`

- LOW: H1 ('Sovereign Constitutional AI & Responsible AI (RAI) — The Complete Implementation Handbook') doesn't match frontmatter title ('Sovereign Constitutional AI & RAI - Complete Implementation Handbook') — keep them in sync so browser tabs, search results, and the rendered page agree.
- LOW: Line 1402 looks like a collapsed table row (only 2 pipe(s)): '|**Term**<br>**Definition**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 1403 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-security-governance\deep-mind\Part01_DeepMind_AI_Control_Roadmap.md`

- LOW: H1 ('DeepMind AI Control Roadmap') doesn't match frontmatter title ('Part 1: DeepMind AI Control Roadmap Analysis') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part02_Evolution_Enterprise_AI_Security.md`

- LOW: H1 ('Evolution of Enterprise AI Security') doesn't match frontmatter title ('Part 2: Evolution of Enterprise AI Security') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part03_Enterprise_Threat_Modeling.md`

- LOW: H1 ('Enterprise Threat Modeling for AI Agents') doesn't match frontmatter title ('Part 3: Enterprise Threat Modeling for AI Agents') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part04_AI_Control_Architecture.md`

- LOW: H1 ('Enterprise AI Control Architecture') doesn't match frontmatter title ('Part 4: AI Control Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part05_Runtime_AI_Security.md`

- LOW: H1 ('Runtime AI Security') doesn't match frontmatter title ('Part 5: Runtime AI Security') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part06_Identity_for_AI_Agents.md`

- LOW: H1 ('Identity Architecture for AI Agents') doesn't match frontmatter title ('Part 6: Identity for AI Agents') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part07_AI_Authorization.md`

- LOW: H1 ('AI Authorization Architecture') doesn't match frontmatter title ('Part 7: AI Authorization Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part08_Memory_Governance.md`

- LOW: H1 ('Memory Governance for Enterprise AI') doesn't match frontmatter title ('Part 8: Memory Governance') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part09_Tool_Governance.md`

- LOW: H1 ('Tool Governance for Enterprise AI') doesn't match frontmatter title ('Part 9: Tool Governance') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part10_Reasoning_Governance.md`

- LOW: H1 ('Reasoning and Planning Governance') doesn't match frontmatter title ('Part 10: Reasoning Governance') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part11_Multi_Agent_Security.md`

- LOW: H1 ('Multi-Agent Security Architecture') doesn't match frontmatter title ('Part 11: Multi-Agent Security') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part12_AI_Observability.md`

- LOW: H1 ('AI Observability Architecture') doesn't match frontmatter title ('Part 12: AI Observability') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part13_AI_SOC.md`

- LOW: H1 ('AI Security Operations Center (AI SOC)') doesn't match frontmatter title ('Part 13: AI Security Operations Center') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part14_Enterprise_Governance.md`

- LOW: H1 ('Enterprise AI Governance') doesn't match frontmatter title ('Part 14: Enterprise Governance') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part15_Cloud_Implementation_Comparison.md`

- LOW: H1 ('Cloud Implementation Comparison') doesn't match frontmatter title ('Part 15: Cloud Implementation Comparison') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part16_Reference_Architecture.md`

- LOW: H1 ('Enterprise AI Reference Architectures') doesn't match frontmatter title ('Part 16: Reference Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part17_Best_Practices_Anti_Patterns.md`

- LOW: H1 ('Best Practices & Anti-Patterns') doesn't match frontmatter title ('Part 17: Best Practices & Anti-Patterns') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\Part18_Future_Outlook_2026_2035.md`

- LOW: H1 ('Future Outlook: 2026–2035') doesn't match frontmatter title ('Part 18: Future Outlook 2026-2035') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\deep-mind\index.md`

- LOW: H1 ('DeepMind AI Safety & Control Roadmap') doesn't match frontmatter title ('DeepMind Control Roadmap') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-security-governance\policy\Vol1_Executive_Architecture.md`

- LOW: H1 ('Executive Architecture & Authorization Fundamentals') doesn't match frontmatter title ('Executive Architecture & Authorization Fundamentals (Vol 1)') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\policy\index.md`

- LOW: H1 ('Policy & Authorization for Agentic AI') doesn't match frontmatter title ('Policy & Authorization') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\security\AI-TRiSM-Complete-Guide.md`

- LOW: H1 ('AI TRiSM — AI Trust, Risk and Security Management') doesn't match frontmatter title ('AI TRiSM — AI Trust, Risk and Security Management: Complete Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\security\AISPM-AI-Security-Posture-Management.md`

- LOW: H1 ('AISPM — AI Security Posture Management') doesn't match frontmatter title ('AISPM — AI Security Posture Management: Complete Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\security\Part5_Marketplace_Architecture.md`

- LOW: H1 ('Marketplace Connector Auth Patterns') doesn't match frontmatter title ('Marketplace Connector Auth Patterns & Enterprise Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-security-governance\security\Part7_Standards_Reference.md`

- LOW: H1 ('Auth Standards Reference') doesn't match frontmatter title ('Auth Standards Reference: OAuth 2.1, OIDC, RFC 8693 & Implementation Checklists') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-soc-playbooks\part-09-enterprise-architecture.md`

- LOW: H1 ('Part 09 — Enterprise Architecture Integration for AI SOC') doesn't match frontmatter title ('Part 09 — Enterprise Architecture Integration') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-soc-playbooks\part-10-standards-compliance.md`

- LOW: H1 ('Part 10 — Standards and Compliance Mapping for AI SOC') doesn't match frontmatter title ('Part 10 — Standards & Compliance Mapping') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-soc-playbooks\part-11-implementation-roadmap.md`

- LOW: H1 ('Part 11 — Implementation Roadmap and Reference Architecture') doesn't match frontmatter title ('Part 11 — Implementation Roadmap & Reference Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-soc-playbooks\part-13-vendor-landscape.md`

- LOW: H1 ('Part 13 — AI SOC Vendor Landscape (2026)') doesn't match frontmatter title ('Part 13 — AI SOC Vendor Landscape') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-soc-playbooks\part-14-future-soc.md`

- LOW: H1 ('Part 14 — Future of the AI SOC (2026–2030)') doesn't match frontmatter title ('Part 14 — Future of AI SOC') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ai-usecases\01_aviation.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-usecases\02_banking.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 28 looks like a collapsed table row (only 2 pipe(s)): '|6.2 AI/Platform Architecture—Whiteboard Session, Week 8|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 29 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 33 looks like a collapsed table row (only 2 pipe(s)): '|6.4 Integration & API Strategy|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 34 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 38 looks like a collapsed table row (only 2 pipe(s)): '|7.1 Foundation Model Selection and On-Prem vs. Cloud|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-usecases\03_healthcare.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 6 looks like a collapsed table row (only 2 pipe(s)): '|1. Executive Summary|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 7 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 8 looks like a collapsed table row (only 2 pipe(s)): '|2. Client Background|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '|3. Business Problem|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 19 looks like a collapsed table row (only 2 pipe(s)): '|6.3 Security & Identity Architecture<br>6.4 Integration & A' — verify it isn't a table that lost columns during conversion.

### `docs\ai-usecases\04_manufacturing.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 34 looks like a collapsed table row (only 2 pipe(s)): '|7.1 Build vs. Buy for the Vision Model<br>7.2 Per-Line Cali' — verify it isn't a table that lost columns during conversion.
- LOW: Line 35 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 36 looks like a collapsed table row (only 2 pipe(s)): '|7.3 Supply Chain Recovery Agent—How Much Autonomy?|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 37 looks like a collapsed table row (only 2 pipe(s)): '|8. Executive Reviews|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 38 looks like a collapsed table row (only 2 pipe(s)): '|8.1 Works Council Consultation—Week 12 (Germany facilities)' — verify it isn't a table that lost columns during conversion.

### `docs\ai-usecases\05_telecom.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 6 looks like a collapsed table row (only 2 pipe(s)): '|1. Executive Summary|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 7 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 8 looks like a collapsed table row (only 2 pipe(s)): '|2. Client Background|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '|3. Business Problem|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 10 looks like a collapsed table row (only 2 pipe(s)): '|4. Constraints|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-usecases\06_government.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 6 looks like a collapsed table row (only 2 pipe(s)): '|1. Executive Summary|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 7 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 8 looks like a collapsed table row (only 2 pipe(s)): '|2. Client Background|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '|3. Business Problem|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 10 looks like a collapsed table row (only 2 pipe(s)): '|4. Constraints|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-usecases\07_pharma.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 6 looks like a collapsed table row (only 2 pipe(s)): '|1. Executive Summary|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 7 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 8 looks like a collapsed table row (only 2 pipe(s)): '|2. Client Background|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '|3. Business Problem|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 10 looks like a collapsed table row (only 2 pipe(s)): '|4. Constraints|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-usecases\08_energy.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 6 looks like a collapsed table row (only 2 pipe(s)): '|1. Executive Summary|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 7 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 8 looks like a collapsed table row (only 2 pipe(s)): '|2. Client Background|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '|3. Business Problem|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 10 looks like a collapsed table row (only 2 pipe(s)): '|4. Constraints|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-usecases\09_logistics.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 6 looks like a collapsed table row (only 2 pipe(s)): '|1. Executive Summary|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 7 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 8 looks like a collapsed table row (only 2 pipe(s)): '|2. Client Background|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '|3. Business Problem|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 10 looks like a collapsed table row (only 2 pipe(s)): '|4. Constraints|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-usecases\10_media.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 6 looks like a collapsed table row (only 2 pipe(s)): '|1. Executive Summary|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 7 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 8 looks like a collapsed table row (only 2 pipe(s)): '|2. Client Background|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '|3. Business Problem|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 10 looks like a collapsed table row (only 2 pipe(s)): '|4. Constraints|' — verify it isn't a table that lost columns during conversion.

### `docs\ai-usecases\CEO_Agent_Solution_Blueprint.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-usecases\Case_02_Cascadia_Prior_Authorization_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-usecases\Case_04_Northline_Customer_Service_Agents.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-usecases\Case_09_Palisade_Grid_Operations_Agent.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-usecases\Case_10_Vantara_Procurement_Negotiation_Agents.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-usecases\ceo_agent_pitch.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ai-usecases\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cloud-platforms\ai-gateway\kong-ai-gateway-guide.md`

- LOW: H1 ('Kong AI Gateway — Complete End-to-End Guide') doesn't match frontmatter title ('Kong AI Gateway Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\cloud-platforms\ai-gateway\kong-entra-id-integration.md`

- LOW: H1 ('Kong AI Gateway — Microsoft Entra ID Integration') doesn't match frontmatter title ('Kong + Entra ID Integration') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\cloud-platforms\aws\agentcore_strands_deep_research_report.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Contents') doesn't match frontmatter title ('Amazon Bedrock AgentCore & Strands SDK — Deep Technical Research Report') — keep them in sync so browser tabs, search results, and the rendered page agree.
- LOW: Line 42 looks like a collapsed table row (only 2 pipe(s)): '|6.1.3 6.3 What Registry Deliberately Does *Not* Do (Preview' — verify it isn't a table that lost columns during conversion.
- LOW: Line 43 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 44 looks like a collapsed table row (only 2 pipe(s)): '|6.1.4 6.4 Registry vs. Gateway — the Control-Plane / Data-P' — verify it isn't a table that lost columns during conversion.
- LOW: Line 45 looks like a collapsed table row (only 2 pipe(s)): '|**7**<br>**Part VI — Harness**<br>**17**|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 46 looks like a collapsed table row (only 2 pipe(s)): '|7.1 7. Harness Architecture . . . . . . . . . . . . . . . .' — verify it isn't a table that lost columns during conversion.

### `docs\cloud-platforms\aws\bedrock-agentcore-code-interpreter-architecture.md`

- LOW: H1 ('Amazon Bedrock AgentCore Runtime + Code Interpreter') doesn't match frontmatter title ('Bedrock AgentCore Code Interpreter Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\cloud-platforms\iac\terraform\ai-assisted-iac-mastery.md`

- LOW: H1 ('AI-Assisted Infrastructure as Code Mastery') doesn't match frontmatter title ('AI-Assisted IaC Mastery Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\cloud-platforms\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\coding-tools\claude\Anthropic_Partner_Cert_Study_Guide.md`

- LOW: Line 25 looks like a collapsed table row (only 2 pipe(s)): '| Scenario 1: Customer Support Resolution Agent Building a c' — verify it isn't a table that lost columns during conversion.
- LOW: Line 26 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 28 looks like a collapsed table row (only 2 pipe(s)): '| Scenario 2: Code Generation with Claude Code Using Claude ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 29 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 31 looks like a collapsed table row (only 2 pipe(s)): '| Scenario 3: Multi-Agent Research System Coordinator agent ' — verify it isn't a table that lost columns during conversion.

### `docs\coding-tools\claude\CCAF_Advanced_Supplement.md`

- LOW: Line 25 looks like a collapsed table row (only 2 pipe(s)): '| 🆕  NOT IN ORIGINAL GUIDE This topic is NOT covered in the ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 26 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 47 looks like a collapsed table row (only 2 pipe(s)): '| Session Start → Context = [system_prompt] After User Messa' — verify it isn't a table that lost columns during conversion.
- LOW: Line 48 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 50 looks like a collapsed table row (only 2 pipe(s)): '| 💡  KEY INSIGHT The dominant cause of context window overfl' — verify it isn't a table that lost columns during conversion.

### `docs\coding-tools\claude\CCAF_Study_Guide.md`

- LOW: Line 21 looks like a collapsed table row (only 2 pipe(s)): '| 🔴  HIGH-PRIORITY EXAM TOPIC Domains 1, 3 & 4 together acco' — verify it isn't a table that lost columns during conversion.
- LOW: Line 22 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 59 looks like a collapsed table row (only 2 pipe(s)): '| ┌─────────────────────────────────────────────────────────' — verify it isn't a table that lost columns during conversion.
- LOW: Line 60 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 62 looks like a collapsed table row (only 2 pipe(s)): '| ⚠️  EXAM TRAP ANTI-PATTERNS that exams love to test: (1) P' — verify it isn't a table that lost columns during conversion.

### `docs\coding-tools\claude\claude-best-practices.md`

- LOW: Line 50 looks like a collapsed table row (only 2 pipe(s)): '| KEY INSIGHT: Coordinator Task Decomposition Determines Cov' — verify it isn't a table that lost columns during conversion.
- LOW: Line 51 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 74 looks like a collapsed table row (only 2 pipe(s)): '| DETERMINISTIC vs. PROBABILISTIC The exam's most important ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 75 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 121 looks like a collapsed table row (only 2 pipe(s)): '| Error Category Reference TRANSIENT: Timeout, service unava' — verify it isn't a table that lost columns during conversion.

### `docs\coding-tools\code-review\PR_Review_Handbook_Vol3_AI_Assisted_Review.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\coding-tools\code-review\PR_Review_Handbook_Vol4_Agentic_Review_Architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\coding-tools\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\01-evolution.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\02-enterprise-security-architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\03-security-domains.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\04-ai-security.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\05-agentic-ai-security.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\06-identity-architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\07-cloud-security.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\08-ai-governance.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\09-security-operations.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\10-technology-investment.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\11-ai-investment.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\12-ea-deliverables.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\13-security-patterns.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\14-case-studies.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\15-emerging-trends.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\cybersec-architect\usecase-transcript.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\ea-masterclass\deliverables\business-case-templates.md`

- LOW: H1 ('Business Case Templates (Templates 1–6)') doesn't match frontmatter title ('Business Case Templates (1–6)') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\ea-masterclass\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\enterprise-ai-report\index.md`

- LOW: H1 ('Enterprise AI Research Report') doesn't match frontmatter title ('Enterprise AI Research Report: From Traditional Software to AI-Native Organization') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-ai-report\part-21-agentic-process-blueprint.md`

- LOW: H1 ('Part 21 — Agentic Process Blueprint') doesn't match frontmatter title ('Part 21 — Agentic Process Blueprint: Reimagining Enterprise Processes') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-architecture\ai-architecture\ART-Framework-Agentic-AI-Execution.md`

- LOW: H1 ('A.R.T. — Agility · Risk · Tenacity') doesn't match frontmatter title ('A.R.T. — Agility · Risk · Tenacity: Enterprise Execution Framework for Agentic AI') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-architecture\ai-architecture\a2a-enterprise-security-governance-guide.md`

- LOW: H1 ('Enterprise-Scale Agent-to-Agent (A2A) Ecosystem: Security, Governance & Architecture Guide') doesn't match frontmatter title ('Enterprise-Scale A2A Ecosystem: Security, Governance & Architecture Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-architecture\ai-architecture\ai-finops-infrastructure-optimization.md`

- LOW: H1 ('AI FinOps — Infrastructure Cost Optimization') doesn't match frontmatter title ('AI FinOps — Infrastructure Cost Optimization (GPU, Kubernetes, Serverless)') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-architecture\ai-architecture\ai-finops-multi-agent-cost-propagation.md`

- LOW: H1 ('Multi-Agent Cost Propagation') doesn't match frontmatter title ('Multi-Agent Cost Propagation — How Costs Accumulate Across Distributed AI Workflows') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-architecture\architectural-review-board\Volume3_Knowledge_Management_Capability_Mapping.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\enterprise-architecture\architectural-review-board\Volume6_Banking_Industry_DeepDive.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\enterprise-architecture\architectural-review-board\Volume8_Implementation_Accelerator_Kit.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\enterprise-architecture\best-practices\index.md`

- LOW: H1 ('Enterprise Architect Best Practices') doesn't match frontmatter title ('EA Best Practices') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-architecture\framework\index.md`

- LOW: H1 ('Enterprise Architecture Frameworks') doesn't match frontmatter title ('EA Frameworks') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-architecture\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\enterprise-architecture\process\EA_Lifecycle_Checklist.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\enterprise-architecture\process\ai-solution-lifecycle-deliverables.md`

- LOW: H1 ('AI Solution Lifecycle Deliverables by Role') doesn't match frontmatter title ('AI Solution Lifecycle Deliverables') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-architecture\specialization\EAKA_Research_Study.md`

- LOW: Line 149 looks like a collapsed table row (only 2 pipe(s)): '|**Business Capability** M|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 150 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 151 looks like a collapsed table row (only 2 pipe(s)): '|**Domain** M|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 152 looks like a collapsed table row (only 2 pipe(s)): '|**Technology** M **Concept** M|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 153 looks like a collapsed table row (only 2 pipe(s)): '|**Pattern** M|' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\specialization\modern-data-ai-platform-blueprint-2026.md`

- LOW: Line 210 looks like a collapsed table row (only 2 pipe(s)): '|**Risk — Catalog lock-in despite Iceberg.**Mitigation: use ' — verify it isn't a table that lost columns during conversion.
- LOW: Line 211 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 212 looks like a collapsed table row (only 2 pipe(s)): '|**Risk — AI gateway / agent tooling churn (MCP/A2A still em' — verify it isn't a table that lost columns during conversion.
- LOW: Line 213 looks like a collapsed table row (only 2 pipe(s)): '|**Risk — Cost overruns from GPU inference.**Mitigation: shi' — verify it isn't a table that lost columns during conversion.

### `docs\enterprise-architecture\strategy\index.md`

- LOW: H1 ('Enterprise Architecture Strategy') doesn't match frontmatter title ('EA Strategy') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\enterprise-architecture\transformation\ai-first-to-ai-native.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\enterprise-architecture\transformation\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Knowledge Docs') doesn't match frontmatter title ('Home') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\interview-prep\Agentic_AI_Platforms_Questionnaire_2025.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\interview-prep\EA_HITL_HOTL_HOOL_Interview_Questions.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Enterprise Architect Interview — Human Oversight Patterns') doesn't match frontmatter title ('EA HITL / HOTL / HOOL Interview Questions') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\interview-prep\EA_Quality_Resilience_Testing_Interview_Questions.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Enterprise Architect Interview — Quality, Resilience & Testing Scenario Question Bank') doesn't match frontmatter title ('EA Quality, Resilience & Testing Interview Questions') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\interview-prep\EA_Senior_Interview_Questions.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Enterprise Architect Interview — Scenario Question Bank') doesn't match frontmatter title ('EA Senior Interview Questions') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\interview-prep\EA_Soft_Skills_and_Behaviors.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('The Enterprise Architect's Inner Game') doesn't match frontmatter title ('EA Soft Skills and Behaviors') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\interview-prep\EY_AI_Architect_Interview_Guide_1.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\interview-prep\Hard_Scenarios_Interview_Prep.md`

- LOW: H1 ('Advanced Scenario Interview Prep') doesn't match frontmatter title ('Hard Scenarios Interview Prep') — keep them in sync so browser tabs, search results, and the rendered page agree.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '| Your company deployed an autonomous procurement agent 6 we' — verify it isn't a table that lost columns during conversion.
- LOW: Line 10 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 27 looks like a collapsed table row (only 2 pipe(s)): '| Own this completely. Do not blame the attacker. The archit' — verify it isn't a table that lost columns during conversion.
- LOW: Line 28 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 38 looks like a collapsed table row (only 2 pipe(s)): '| BEFORE (Vulnerable Architecture): PDF Invoice → [Document ' — verify it isn't a table that lost columns during conversion.

### `docs\interview-prep\ML_AI_Interview_Mastery_Guide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 2 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 13 looks like a collapsed table row (only 2 pipe(s)): '| ⚡ McKinsey Insight: AI upskilling succeeds when it is embe' — verify it isn't a table that lost columns during conversion.
- LOW: Line 14 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 16 looks like a collapsed table row (only 2 pipe(s)): '| PART ONE: THE THINKING LAYER Mental Models, First Principl' — verify it isn't a table that lost columns during conversion.
- LOW: Line 17 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.

### `docs\interview-prep\ea-ai-artifacts-and-metrics.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\interview-prep\fde\architect-in-fde-context.md`

- LOW: H1 ('Architect Expectations When Deployed in an FDE Context') doesn't match frontmatter title ('Architect Expectations in an FDE Context') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\interview-prep\fde\fde-life-transcript.md`

- LOW: H1 ('FDE Life Transcript — FinClear AI Deployment') doesn't match frontmatter title ('FDE Life Transcript — FinClear AI Deployment (Complete)') — keep them in sync so browser tabs, search results, and the rendered page agree.
- LOW: Line 65 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 84 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 139 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 164 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.
- LOW: Line 237 looks like a collapsed table row (only 2 pipe(s)): '|---|' — verify it isn't a table that lost columns during conversion.

### `docs\interview-prep\fde\fde-role-skills-map.md`

- LOW: H1 ('FDE Role: Complete Skills & Study Map') doesn't match frontmatter title ('FDE Role Skills & Study Map') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\interview-prep\fde\index.md`

- LOW: H1 ('Forward Deployed Engineer — Interview & Study Hub') doesn't match frontmatter title ('Forward Deployed Engineer (FDE)') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\interview-prep\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Interview Preparation') doesn't match frontmatter title ('Interviews') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\knowledge-engineering\data\index.md`

- LOW: H1 ('Data Architecture for AI') doesn't match frontmatter title ('Data Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\knowledge-engineering\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\knowledge-engineering\industry-practices\consulting-firms.md`

- LOW: H1 ('Consulting Firm AI Knowledge Platforms') doesn't match frontmatter title ('Consulting Firm AI Platforms') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\knowledge-engineering\industry-practices\governance-rai.md`

- LOW: H1 ('Governance & Responsible AI for Knowledge Systems') doesn't match frontmatter title ('Governance & Responsible AI') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\knowledge-engineering\industry-practices\index.md`

- LOW: H1 ('Industry Knowledge Systems: How the Best Build Them') doesn't match frontmatter title ('Industry Knowledge Systems') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\knowledge-engineering\industry-practices\tech-companies.md`

- LOW: H1 ('How Tech Companies Build & Serve Knowledge Systems') doesn't match frontmatter title ('How Tech Companies Serve Knowledge') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\knowledge-engineering\knowledge\Complex_RAG_Deep_Dive.md`

- LOW: Line 8 looks like a collapsed table row (only 2 pipe(s)): '| Naive RAG re-indexes the entire corpus on every document u' — verify it isn't a table that lost columns during conversion.
- LOW: Line 9 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 14 looks like a collapsed table row (only 2 pipe(s)): '| # Document-level fingerprint doc_fingerprint = SHA256(raw_' — verify it isn't a table that lost columns during conversion.
- LOW: Line 15 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 24 looks like a collapsed table row (only 2 pipe(s)): '| # Chunk metadata schema (stored alongside the embedding) {' — verify it isn't a table that lost columns during conversion.

### `docs\nist-ai-standards\index.md`

- LOW: H1 ('NIST AI Standards & CAISI — Enterprise Security Implementation Guide') doesn't match frontmatter title ('NIST AI Standards & CAISI — Enterprise Security Guide') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\nist-ai-standards\part-01-nist-ai-100-2-adversarial-ml.md`

- LOW: H1 ('NIST AI 100-2 — Adversarial Machine Learning: Taxonomy, Threat Model & Mitigations') doesn't match frontmatter title ('NIST AI 100-2 — Adversarial Machine Learning') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\nist-ai-standards\part-02-nist-ai-100-4-synthetic-content.md`

- LOW: H1 ('NIST AI 100-4 — Synthetic Content: Detection, Attribution & Provenance') doesn't match frontmatter title ('NIST AI 100-4 — Synthetic Content Detection & Provenance') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\nist-ai-standards\part-03-caisi-agentic-ai.md`

- LOW: H1 ('CAISI Agentic AI Security Guidance — Enterprise Implementation') doesn't match frontmatter title ('CAISI Agentic AI Security Guidance') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\nist-ai-standards\part-04-enterprise-architecture.md`

- LOW: H1 ('NIST AI Standards — Enterprise Architecture & Cloud Implementation') doesn't match frontmatter title ('NIST AI Standards — Enterprise Architecture Patterns') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\nist-ai-standards\part-05-control-mappings.md`

- LOW: H1 ('Cross-Framework Control Mappings: NIST AI 100-2 / 100-4 / CAISI') doesn't match frontmatter title ('NIST AI Standards — Cross-Framework Control Mappings') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\nist-ai-standards\part-07-future-trends.md`

- LOW: H1 ('NIST AI Standards — Future Trends & Standards Evolution') doesn't match frontmatter title ('NIST AI Standards — Future Trends & Emerging Threats') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\quantum\IBM_Developer_Quantum_CertGuide.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\quantum\Quantum_AI_Zero_to_Mastery.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\quantum\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\quantum\zero-to-mastery.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\soft-skills\CTO_Voice_Mastery_Program.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\soft-skills\Mental_Models_for_Voice_Training.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\soft-skills\Storytelling_Exercise_Workbook.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: Line 49 looks like a collapsed table row (only 2 pipe(s)): '| S — Situation: Set the scene in 1-2 sentences. Who, where,' — verify it isn't a table that lost columns during conversion.
- LOW: Line 50 looks like a collapsed table row (only 2 pipe(s)): '| --- |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 51 looks like a collapsed table row (only 2 pipe(s)): '|  |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 52 looks like a collapsed table row (only 2 pipe(s)): '|  |' — verify it isn't a table that lost columns during conversion.
- LOW: Line 53 looks like a collapsed table row (only 2 pipe(s)): '|  |' — verify it isn't a table that lost columns during conversion.

### `docs\soft-skills\Voice_Training_30Day_Plan.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\soft-skills\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Non-Technical Skills') doesn't match frontmatter title ('Non-Tech') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\sovereign-constitutional-ai\ai-alignment-control.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('AI Alignment & Control Framework (Deliverable 21)') doesn't match frontmatter title ('AI Alignment & Control') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\sovereign-constitutional-ai\ai-assurance-audit-architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('AI Assurance & Audit Architecture (Deliverables 10 & 11)') doesn't match frontmatter title ('AI Assurance & Audit Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\sovereign-constitutional-ai\ai-governance-operating-model.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('AI Governance Operating Model (Deliverable 8)') doesn't match frontmatter title ('AI Governance Operating Model') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\sovereign-constitutional-ai\ai-safety-framework.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('AI Safety Framework (Deliverable 20)') doesn't match frontmatter title ('AI Safety Framework') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\sovereign-constitutional-ai\constitutional-agent-architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Constitutional Agent Architecture (Deliverables 13 & 14)') doesn't match frontmatter title ('Constitutional Agent Architecture') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\sovereign-constitutional-ai\constitutional-ai-engineering.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\sovereign-constitutional-ai\democratic-ai-public-interest.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\sovereign-constitutional-ai\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Sovereign Constitutional AI & Responsible AI (RAI)') doesn't match frontmatter title ('Sovereign & Constitutional AI') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\sovereign-constitutional-ai\policy-as-code-framework.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Policy-as-Code Framework (Deliverables 12 & 15)') doesn't match frontmatter title ('Policy-as-Code Framework') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\sovereign-constitutional-ai\rai-operating-model.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Responsible AI (RAI) Operating Model') doesn't match frontmatter title ('Responsible AI Operating Model') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\sovereign-constitutional-ai\sovereign-ai-foundations.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\sovereign-constitutional-ai\sovereign-ai-roadmap-maturity.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Roadmap, Maturity & Standards Canon (Deliverables 16–24)') doesn't match frontmatter title ('Roadmap, Maturity & Standards Canon') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\workflow-orchestration\01-executive-summary.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Executive Summary: Workflow Orchestration Meets Agentic AI') doesn't match frontmatter title ('Executive Summary - Workflow Orchestration in the Agentic AI Era') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\workflow-orchestration\02-evolution-timeline.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Technology Evolution Timeline') doesn't match frontmatter title ('Technology Evolution Timeline - From BPM to Agentic Orchestration') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\workflow-orchestration\03-workflow-vs-agent-architecture.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Workflow vs Agent Architecture') doesn't match frontmatter title ('Workflow vs Agent Architecture - Determinism, Adaptivity, and Design Principles') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\workflow-orchestration\04-temporal-deep-dive.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Temporal Deep Dive') doesn't match frontmatter title ('Temporal Deep Dive - Architecture, Patterns, and AI Integration') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\workflow-orchestration\05-camunda-deep-dive.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Camunda Deep Dive') doesn't match frontmatter title ('Camunda Deep Dive - BPMN, BPM, and AI Integration') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\workflow-orchestration\07-ai-coding-orchestrators.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('AI Coding Orchestrators') doesn't match frontmatter title ('AI Coding Orchestrators - Claude Code, GitHub Copilot, and the Meta-Orchestrator Pattern') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\workflow-orchestration\19-reference-architectures.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).

### `docs\workflow-orchestration\20-decision-matrix.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Decision Matrix: Platform Selection Guide') doesn't match frontmatter title ('Decision Matrix - Choosing Your Orchestration Platform') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\workflow-orchestration\21-future-predictions.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
- LOW: H1 ('Future Predictions: Workflow Orchestration (2026–2035)') doesn't match frontmatter title ('Future Outlook: Workflow Orchestration 2026–2035') — keep them in sync so browser tabs, search results, and the rendered page agree.

### `docs\workflow-orchestration\index.md`

- LOW: Only one tag present — consider adding a doc_type and 1-2 topic tags alongside the existing domain tag for real discoverability (see references/taxonomy.md).
