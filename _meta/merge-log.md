# Merge Log — Phase 3

Generated: 2026-07-09

---

## cluster_001 — DONE (archive)
- Keeper: `docs/ai-usecases/eu-bank-ai-copilot-complete.pdf` + converted `.md`
- Archived: `docs/ai-usecases/eu-bank-ai-copilot-research.pdf` → `archive/`
- Reason: near-exact duplicate (sim 1.0); complete version is larger and named more definitively.

## cluster_002 — DONE (archive)
- Keeper: `docs/interview-prep/EY_AI_Architect_Interview_Guide_1.pdf` + converted `.md`
- Archived: `docs/interview-prep/EY_AI_Architect_Interview_Guide.pdf` → `archive/`
- Reason: identical content and size (sim 1.0).

## cluster_003 — DONE (archive)
- Keeper: `docs/ai-foundations/AI_Native_Architecture_Evolution_Report.pdf` + converted `.md`
- Archived: `docs/knowledge-engineering/data/AI_Native_Architecture_Evolution_Report.pdf` → `archive/`
- Reason: exact copy placed in wrong section (sim 1.0). Canonical copy stays in ai-foundations.

## cluster_004 — DONE (archive)
- Keeper: `docs/ai-protocols/mcp/MCP_Deep_Research_2026.md`
- Archived: `docs/ai-protocols/mcp/MCP_Deep_Research_2026.md.pdf` → `archive/`
- Reason: PDF is an export of the MD file (sim 0.945). MD is the source of truth.

## cluster_005 — DONE (archive PDFs only — both MDs kept as separate volumes)
- Keeper Vol.1: `docs/ai-protocols/auth/entra-3lo-agent-auth-standards-architecture.md`
- Keeper Vol.3: `docs/ai-protocols/auth/entra-3lo-agent-auth-multiagent-compliance.md`
- Archived: `EntraID_3LO_Agent_Auth_Research.pdf` (source for Vol.1 MD), `EntraID_3LO_Agent_Auth_Volume3.pdf` (source for Vol.3 MD)
- Decision override: cluster algorithm proposed Vol.3 MD as single keeper. Overridden — Vol.1 and Vol.3 are separate volumes of a series, both valid and distinct.

## cluster_006 — DONE (archive)
- Keeper: `docs/ai-protocols/auth/entra-3lo-agent-auth-implementation.md` (Vol.2)
- Archived: `docs/ai-protocols/auth/EntraID_3LO_Agent_Auth_Volume2.pdf` → `archive/`
- Reason: source PDF for the Vol.2 MD (sim 0.915).

## cluster_007 — DONE (archive with note)
- Keeper: `docs/enterprise-architecture/specialization/APEX_EA_Final.pdf` + converted `.md`
- Archived: `TOGAF10_APEX_AI_Platform_NexaBank.pdf`, `TOGAF10_APEX_CloudNative_GlobalCorp.pdf`, `TOGAF10_APEX_v4_PeerReviewed.pdf`
- Note: NexaBank and GlobalCorp PDFs contain org-specific scenario data. Reviewer should verify APEX_EA_Final.md captures the scenario variety.

## cluster_008 — DONE (archive)
- Keeper: `docs/ai-protocols/auth/agent-identity-entra-vs-awsagentcore.md`
- Archived: `docs/ai-protocols/auth/AgentIdentity_Research_2026.pdf` → `archive/`
- Reason: source research PDF for the MD comparison guide (sim 0.854).

## cluster_009 — DONE (archive)
- Keeper: `docs/ai-protocols/auth/tool-authentication-connectors.md`
- Archived: `docs/ai-protocols/auth/Part2_Tool_Authentication.pdf` → `archive/`
- Reason: only 28 unique tokens in 4KB sample (sim 0.839). No unique content.

## cluster_010 — DONE (archive)
- Keeper: `docs/ai-protocols/auth/entra-3lo-agent-auth-security-review.md` (Vol.4)
- Archived: `docs/ai-protocols/auth/EntraID_3LO_Agent_Auth_Volume4.pdf` → `archive/`
- Reason: source PDF for Vol.4 MD (sim 0.776).

## cluster_011 — FLAGGED: related-but-distinct (do not merge)
- Files: `kong-ai-gateway-guide.md`, `kong-ai-gateway-auth-guide.md`, `kong-entra-id-integration.md`
- Similarity: 0.773 / 0.621 / 0.608
- Decision: three distinct scopes (general Kong setup / Kong auth plugins / Kong + Entra ID integration). 162-170 unique tokens per non-keeper confirms distinct content. Keep all three; add cross-links in Phase 4.

## cluster_012 — DONE (archive with content note)
- Keeper: `docs/coding-tools/claude/claude-api-mastery.md`
- Archived: `docs/coding-tools/claude/Module_2_Claude_API_SDK.pdf` → `archive/`
- Note: PDF module has ~240 unique tokens including SDK code examples. Reviewer should check claude-api-mastery.md covers all SDK patterns from Module 2.

## cluster_013 — FLAGGED: related-but-distinct (do not merge)
- Files: `Enterprise_AI_Architect_Communication_Guide.pdf`, `Enterprise_AI_Architect_Deep_Dive_Guide.pdf`
- Similarity: 0.734
- Decision: Communication Guide focuses on stakeholder communication; Deep Dive covers full EA methodology. 204/353 unique tokens. Keep both.

## cluster_014 — FLAGGED: keeper selection error + related-but-distinct (do not merge)
- Algorithm picked `docs/quantum/index.md` (2,294 B) as keeper — this is a section navigation page, not substantive content.
- The three PDFs (Consultancies/Startups/TechGiants) each cover different market segments — not duplicates of each other.
- `docs/quantum/zero-to-mastery.md` is the substantive synthesis and should remain as-is.
- Action: no archiving. All 5 files kept. Add cross-links in Phase 4.

## cluster_015 — FLAGGED: related-but-distinct (do not merge)
- Files: `docs/ai-protocols/auth/Part3_Identity_OBO_Sessions.pdf`, `docs/ai-protocols/Part7_Standards_Reference.pdf`
- Similarity: 0.707
- Decision: Part3 covers identity propagation/OBO session tokens; Part7 covers protocol standards reference. Different parts of a series. 220/298 unique tokens. Keep both.

## cluster_016 — FLAGGED: different certification levels (do not merge)
- Files: `IBM_Associate_Quantum_CertGuide.pdf`, `IBM_Developer_Quantum_CertGuide.pdf`
- Similarity: 0.686
- Decision: Associate (C1000-156) and Developer (C1000-171) are different exam levels with different audiences. 195/298 unique tokens. Keep both.

## cluster_017 — DONE (archive with content note)
- Keeper: `docs/ai-development/testing/AI_Agent_Evaluation_Framework_Guide.md`
- Archived: `AI Agent Evaluation Framework — AWS Bedrock AgentCore · Strands · Arize Phoenix.pdf` → `archive/`
- Note: PDF has AWS-specific AgentCore/Strands/Arize Phoenix content not in the MD. Reviewer should expand the MD with AWS-specific sections.

## cluster_018 — FLAGGED: related-but-distinct (do not merge)
- Files: `ai-msf-requirements-runbook.pdf`, `ai-platform-factory-runbook-v2.pdf`
- Similarity: 0.625
- Decision: requirements runbook (what the platform must do) vs factory runbook (how to operate it). Different lifecycle stages. 222/328 unique tokens. Keep both.

## cluster_019 — FLAGGED: separate series chapters (do not merge)
- Files: Part01 (Vision/Architecture), Part04 (RAG/Agents/Models), Part07 (Prompts/Evaluation)
- Similarity: 0.617 / 0.600
- Decision: separate chapters of the GitHub Copilot Enterprise series covering distinct topics. Keep all; add series navigation in Phase 4.

## cluster_020 — FLAGGED: related-but-distinct (do not merge)
- Files: `ai-first-to-ai-native.md`, `sovereign-ai-roadmap-maturity.md`
- Similarity: 0.617
- Decision: ai-first-to-ai-native covers enterprise AI transformation journey; sovereign-ai-roadmap-maturity covers regulatory and maturity frameworks. Different angles on overlapping vocabulary. Keep both.

## cluster_021 — FLAGGED: intentionally different documents (do not merge)
- Files: `CEO_Agent_Solution_Blueprint.pdf`, `ceo_agent_pitch.pdf`
- Similarity: 0.617
- Decision: Pitch is the concept/sales narrative; Blueprint is the technical implementation guide. Different audiences and purposes. Keep both.

## cluster_022 — FLAGGED: different books (do not merge)
- Files: `Mental_Model_Encyclopedia.pdf`, `Strategic_Thinking_Handbook.pdf`
- Similarity: 0.605
- Decision: Different reference books on adjacent topics (mental models vs strategic frameworks). 256/350 unique tokens. Keep both.
