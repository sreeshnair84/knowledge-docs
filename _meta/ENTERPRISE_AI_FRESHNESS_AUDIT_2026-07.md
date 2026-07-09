---
title: "Enterprise AI Freshness Audit — July 5, 2026"
date_created: 2026-07-05
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: []
---

# Enterprise AI Freshness Audit — July 5, 2026

**Scope:** `docs/coding-tools/enterprise-ai-architect/` (5 guides) + all `ai-*` sections, cross-checked against the June 29, 2026 gap analysis (`ALL_72_TOPICS_REFERENCE.md`).
**Method:** 4 parallel research agents verified every dated/priced/regulatory claim against primary sources (Anthropic/AWS/Microsoft docs, EUR-Lex/Consilium, NIST, Linux Foundation, OWASP).

**Headline findings:**

1. **EU AI Act timeline is materially wrong across the repo.** The Digital Omnibus on AI (Council final approval June 29, 2026) deferred Annex III high-risk obligations to **Dec 2, 2027** and Annex I to **Aug 2, 2028**. Article 50 transparency and GPAI enforcement remain on the **Aug 2, 2026** clock. Affects the governance guide, the EU Banking compliance calendar, and the landing-zone doc.
2. **The "19,831+ MCP servers" figure is unsupported** (appears fabricated). Official figure: 10,000+ public servers, ~97–110M monthly SDK downloads, MCP governed by the Linux Foundation's Agentic AI Foundation since Dec 2025.
3. **A2A is absent from the EA-architect guides** despite v1.0 shipping April 2026 with 150+ orgs — the MCP+A2A two-layer stack is now the enterprise default.
4. **12 topics are missing from both the guides and the prior 72-topic list** — led by agent identity (SPIFFE/AIMS), OWASP Agentic Top 10, bounded autonomy, and machine-readable EA.

---

## Part 1 — Outdated facts: enterprise-ai-architect/ guides

### 1.1 Models, pricing, platforms (`index.md`, `enterprise-ai-architect-foundations.md`)

| Location | Stale claim | Current fact (July 2026) | Source |
|---|---|---|---|
| index.md:86, foundations.md:198 | Sonnet 5 "$3/$15 (was $2/$10)" | Inverted — $2/$10 is the **current intro price through Aug 31, 2026**; $3/$15 starts Sept 1, 2026 | [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing) |
| index.md:87, foundations.md:199 | Opus 4.8 "premium tier" | Opus 4.8 is $5/$25 per MTok — half of Fable 5 ($10/$50). Fast mode $10/$50 (research preview) | same |
| foundations.md:197–200 | 200K context for Fable 5, Sonnet 5, Opus 4.8, Sonnet 4.6 | All four have **1M-token context** (128K max output); only Haiku 4.5 is 200K | same |
| index.md:88, foundations.md:200 | Sonnet 4.6 "legacy, cost-sensitive" | Current, fully supported at $3/$15 — currently *more expensive* than Sonnet 5 intro pricing | same |
| index.md:104, foundations.md:590, skills-assessment.md:69 | "19,831+ MCP servers (July 2026)" | Unsupported figure. Official: **10,000+ public servers**; registry ~6,400+ (Feb 2026); ~110M monthly SDK downloads | [AAIF](https://aaif.io/blog/mcp-is-growing-up/) |
| index.md:104 (omission) | No MCP governance context | MCP donated to **Linux Foundation Agentic AI Foundation** Dec 9, 2025 (Anthropic, Block, OpenAI co-founders) | [Anthropic](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation) |
| both files (omission) | No A2A mention | **A2A v1.0 stable April 2026**, Linux Foundation, 150+ orgs, GA in Copilot Studio / Microsoft Foundry / Bedrock AgentCore | [Linux Foundation](https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year) |
| index.md:101, foundations.md:84,168,636 | "Azure AI Foundry" | Renamed **Microsoft Foundry** (late 2025); Claude billed via Azure Marketplace in CCUs ($0.01/CCU) | [Microsoft Learn](https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/claude-models) |
| index.md:97–102 (omission) | AWS access = Bedrock only | **Claude Platform on AWS** (Anthropic-operated, AWS Marketplace/CCU billing) now a distinct access path | [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing) |
| foundations.md:87,155 | AutoGen as current framework | AutoGen in **maintenance mode**; **Microsoft Agent Framework 1.0 GA April 3, 2026** is the successor | [framework comparisons](https://pecollective.com/blog/ai-agent-frameworks-compared/) |
| foundations.md:95,130 | GPT-4o as OpenAI peer | Legacy in 2026 — reference the current GPT-5-family flagship | 2026 landscape coverage |
| foundations.md:424–426 | "Budget 1,000–10,000 thinking tokens"; visible reasoning | `budget_tokens` is **rejected (400)** on Fable 5 / Opus 4.8 / Sonnet 5. Thinking is **adaptive** (`thinking: {type:"adaptive"}`, always-on for Fable 5); depth via `output_config.effort`. Fable 5 never returns raw CoT | Claude API reference |
| foundations.md:433–440 | `anthropic-metadata-team` etc. HTTP headers | **No such headers exist.** Use the `metadata` body field (`metadata.user_id`) + per-team API keys/workspaces | Anthropic platform docs |
| foundations.md:398–399 | Cache lifetime 5 min (only) | 5-min default correct, but a **1-hour cache tier** exists (2× write price vs 1.25×) | [Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing) |
| foundations.md:634 | Bedrock "single-region" | Bedrock has **global endpoints** (default) + regional at 10% premium for Claude 4.5+ | same |
| foundations.md:637 | Direct API "US-based processing" | Global by default; US-only inference is self-serve (`inference_geo: "us"`, 1.1× multiplier) on Opus 4.6/Sonnet 4.6+ | same |
| foundations.md:915 | Model ID `claude-fable-5-20251101` | Invalid — the ID is exactly **`claude-fable-5`** (no date suffix) | Claude API reference |
| foundations.md:812, governance:868–876 | CCA-F "required for Anthropic Partner Network tiers" | **Unverified** — CCA-F itself is real (launched Mar 12, 2026) but no source supports the partner-tier requirement. Remove or caveat | — |
| index.md:90–91 | Copilot $19/$39 (no billing context) | Prices correct, but **AI Credits usage-based billing since June 1, 2026** (pooled credits, $0.01/credit overage, 2× promo through Aug 2026) | [GitHub blog](https://github.blog/news-insights/company-news/github-copilot-is-moving-to-usage-based-billing/) |

**Verified still accurate:** Fable 5 $10/$50; Haiku 4.5 $1/$5 @200K; MCP "stateless 2026 RC spec, Extensions and Tasks" (2026-07-28 RC confirmed); Batch API ~50%; cache read 0.1× / ≥1,024-token minimum; CCA-F exists (60 MCQs / 120 min / 720 pass); LangGraph + CrewAI still top-tier.

### 1.2 Governance & regulation (`enterprise-ai-governance-compliance.md`)

| Location | Stale claim | Current fact (July 2026) | Source |
|---|---|---|---|
| :49–68 | Implied original EU AI Act timeline (high-risk Aug 2026) | **Digital Omnibus on AI** (Council approval June 29, 2026): Annex III high-risk → **Dec 2, 2027**; Annex I → **Aug 2, 2028**; sandbox deadline → Aug 2, 2027 | [Consilium](https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/), [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/) |
| :51–58 | **No GPAI row at all** | GPAI obligations (Art. 53/55) live since Aug 2, 2025; Code of Practice July 2025; **Commission enforcement + fines start Aug 2, 2026** — unaffected by Omnibus | [EC digital-strategy](https://digital-strategy.ec.europa.eu/en/policies/guidelines-gpai-providers) |
| :57 | Limited-risk disclosure, no date | Art. 50 transparency applies **Aug 2, 2026** on schedule; watermarking grace to Dec 2, 2026 for existing systems | [Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/) |
| :55 | Prohibited list incomplete | Omnibus adds **Art. 5 ban on AI-generated NCII/CSAM** ("nudifiers"), transition to Dec 2, 2026 | same |
| :78–122 | NIST = AI RMF 1.0 only | Missing: **AI 600-1 GenAI Profile** (Jul 2024), **IR 8596 Cyber AI Profile** draft (Dec 2025), **CAISI AI Agent Standards Initiative** (Feb 17, 2026), COSAiS SP 800-53 agent overlays | [CSA note](https://labs.cloudsecurityalliance.org/research/csa-research-note-nist-ai-agent-standards-federal-framework/) |
| :137–146 | Generic ISO 42001 process | **ISO/IEC 42006:2025** published; ANAB/UKAS/RvA-accredited CBs operating; **350+ orgs certified** (Apr 2026) | [ISO](https://www.iso.org/standard/42006), [ANAB](https://anab.ansi.org/accreditation/iso-iec-42001-artificial-intelligence-management-systems/) |
| :168–174 | CPRA opt-out as principle | **CPPA ADMT regulations** approved Sept 2025; compliance required **Jan 1, 2027** for significant decisions | [CPPA](https://cppa.ca.gov/announcements/2025/20250923.html) |

**New developments the doc omits:** Texas TRAIGA in force Jan 1, 2026; Colorado AI Act repealed & replaced May 14, 2026 (narrower disclosure regime, effective Jan 1, 2027); US federal preemption EO (Dec 11, 2025) + DOJ AI Litigation Task Force; China CAC labeling rules + GB 45438-2025 in force Sept 1, 2025; UK still has no AI Act (regulator-led).

**Verified still accurate:** four-tier risk taxonomy; €35M/7% penalties; NIST RMF functions; ISO 42001 Dec 2023; GDPR Art. 22; DORA Jan 17, 2025; SR 11-7; HIPAA BAA guidance; FDA PCCP.

---

## Part 2 — Outdated facts: ai-* sections

| # | Location | Stale claim | Current fact (July 2026) | Source |
|---|---|---|---|---|
| 1 | `ai-usecases/EU_Banking_AI_Evaluation_Compliance_Guide.md`:52,98–102,119,1370,1412 | "Aug 2, 2026 — high-risk full obligations" + entire Appendix A calendar | Omnibus deferral: Annex III → **Dec 2, 2027**, Annex I → **Aug 2, 2028**. Art. 50 still Aug 2026. **Most consequential stale claim in the repo** — it's a compliance action calendar | [Consilium](https://www.consilium.europa.eu/en/press/press-releases/2026/05/07/artificial-intelligence-council-and-parliament-agree-to-simplify-and-streamline-rules/) |
| 2 | same:766 | "EU AI Act Art. 52" for disclosure | **Article 50** in final Regulation 2024/1689 (Art. 52 was draft numbering) | [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj) |
| 3 | same:1028 | "eu-west-1 (Oregon — DO NOT USE for EU data)" | **eu-west-1 is Dublin, Ireland** (Oregon = us-west-2); AgentCore GA in Frankfurt + Ireland. Doc tells EU banks to avoid a valid EU region | [AWS](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/agentcore-regions.html) |
| 4 | same:87 | FCA listed among EU NCAs | FCA is the **UK** regulator — outside EU AI Act/DORA | — |
| 5 | `ai-development/testing/AI_Agent_Evaluation_Framework_Guide.md`:1288 | "AgentCore (GA 2026)" | GA **October 2025** (Policy GA March 2026) | [AWS](https://aws.amazon.com/about-aws/whats-new/2025/10/amazon-bedrock-agentcore-available/) |
| 6 | same:941,1076 | Judge model `anthropic.claude-sonnet-4-20250514-v1:0` | Several generations old — use a current Sonnet | Anthropic docs |
| 7 | `ai-protocols/mcp/MCP_Deep_Research_2026.md`:60–84,548–556 | "Stateless standardization in progress"; Tasks "experimental" | **2026-07-28 spec RC published**: stateless core, Extensions framework, Tasks promoted, MCP Apps, auth hardening. §2/§4.7/§12 superseded | [MCP blog](https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/) |
| 8 | same:520,286 | Registry "launched November 2025" | Preview launched **Sept 8, 2025** | [MCP blog](https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/) |
| 9 | same:40,624 | "12,000+ public servers" | Official: **10,000+** (AAIF); aggregators list 16–20k. Add source caveat + 97M monthly SDK downloads | [Linux Foundation](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) |
| 10 | same:598 | "Google's A2A protocol" | Donated to **Linux Foundation June 2025** (Agent2Agent Project) | [Google](https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation/) |
| 11 | `ai-economics/ai-coding-agents-2026.md`:288,540 | Copilot "$39/mo Business" | **Business = $19; $39 = Pro+.** AI Credits billing live since June 1, 2026 (Pro $10 incl. $15 credits; Pro+ $39 incl. $70; Max $100) | [GitHub](https://github.com/features/copilot/plans) |
| 12 | same:339,352,374,668 | Devin "$20 Core → $500 Team" | Core/Team **retired April 2026**; now Free/Pro/Max/Teams/Enterprise; ACU persists | [Devin](https://devin.ai/pricing/) |
| 13 | same:42 | "only 29% trust the output" | SO 2025: **33% trust / 46% distrust** (84% use, 51% daily are correct) | [SO survey](https://survey.stackoverflow.co/2025/ai) |
| 14 | same:218,640 | "deepest reasoning: Opus 4.7" | **Opus 4.8** is now top Opus tier | Anthropic docs |
| 15 | same:244 | Cursor "150,000+ GitHub stars (LangChain connection)" | Incoherent/hallucinated — Cursor is closed-source, no LangChain link. **Delete** | — |
| 16 | `ai-foundations/agentic_ai_landing_zone_architecture.md`:1347 | "OpenAI (GPT-4, o1)"; `claude-sonnet-4-5` examples | Superseded model listings; review date (2026-05-06) already passed | vendor docs |
| 17 | same:121,905–923 | EU AI Act readiness, no timeline | Should reflect Omnibus deferral + Art. 50 Aug 2026 | see #1 |
| 18 | `ai-development/testing/index.md`:37; `ai-usecases/index.md`:71 | Viewer URLs → `docs/agentic-ai/testing/`, `docs/usecases/` | **Link rot** after restructure — raw.githubusercontent viewer URLs 404 | repo structure |

**Best-maintained file:** `ai-economics/ai-value-creators-synthesis.md` — all analyst figures verified correct.

---

## Part 3 — Missing topics (delta vs. guides + 72-topic list)

### P1 — Essential for 2026–27

| # | Topic | Why | Fit |
|---|---|---|---|
| 1 | **Agent identity & auth** — SPIFFE/SPIRE, IETF AIMS draft (Mar 2026), WIMSE, OAuth token exchange, Entra Agent ID | Guides cover API keys only — pre-agentic. Production FS architectures now issue hourly-rotating SVIDs per agent ([Stacklok](https://stacklok.com/blog/agentic-identity-explained-how-to-apply-spiffe-and-relationship-based-authorization-to-ai-agents-in-2026/)) | New guide |
| 2 | **OWASP Top 10 for Agentic Applications** (ASI01–ASI10, 2026) | De-facto threat taxonomy; Microsoft/Teleport map controls to it ([OWASP](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)) | New guide + governance §9 xref |
| 3 | **Bounded autonomy & decision-rights frameworks** | Autonomy tiers, typed action contracts, escalation paths ([WEF](https://www.weforum.org/stories/2026/03/ai-agent-autonomy-governance/)) | New guide + governance §4 |
| 4 | **Machine-readable EA** — policies/constraints/lineage as runtime agent context | 2026 EA consensus; redefines the architect role ([BlueDolphin](https://bluedolphin.io/blog/agentic-ai-and-enterprise-architecture-in-2026/)) | New guide |
| 5 | **MCP+A2A two-layer stack, Agent Cards, agent registries** | A2A v1.0, 150+ orgs; registry-as-governance ([Zylos](https://zylos.ai/research/2026-03-26-agent-interoperability-protocols-mcp-a2a-acp-convergence/)) | New guide / patterns |
| 6 | **OTel GenAI semconv + trajectory-level evals** | invoke_agent/execute_tool spans stabilizing; 37% lab-to-prod gap ([OTel](https://opentelemetry.io/blog/2026/genai-observability/)) | Extend foundations §13 + patterns §13 |
| 7 | **SLM-first / on-device architecture** | Gartner: 3× SLM vs LLM by 2027; 80–90% of agent steps local at 10–20% cost ([NVIDIA](https://research.nvidia.com/labs/lpr/slm-agents/)) | Extend foundations §4 + patterns §11 |
| 8 | **Certification landscape** — Microsoft AB-100 Agentic AI Business Solutions Architect ($165, covers MCP/A2A) | Skills guide is CCA-F-only ([Microsoft Learn](https://learn.microsoft.com/en-us/credentials/certifications/agentic-ai-business-solutions-architect/)) | Extend skills §2 |

### P2 — Valuable

| # | Topic | Fit |
|---|---|---|
| 9 | **AI tokenomics as FinOps discipline** — 9 cost buckets, RAG/agent infra 40–60% of spend, neocloud commitments ([FinOps Foundation](https://www.finops.org/insights/token-economics-the-atomic-unit-of-ai-value/)) | Extend foundations §8 + governance §10 |
| 10 | **Sovereign AI & geopatriation** — Gartner: 35% of countries region-locked by 2027; confidential computing ([Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-10-20-gartner-identifies-the-top-strategic-technology-trends-for-2026)) | Extend foundations §11.3 |
| 11 | **Agentic commerce & payments** — AP2 (60+ partners), x402, AgentCore Payments; $3–5T by 2030 ([Google](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)) | New pattern |
| 12 | **Agent lifecycle governance** — registration → monitoring → deprovisioning; rogue-agent detection (OWASP ASI10) | Extend governance §7 |

### Recommended new guides (outlines)

**1. `agentic-ai-security-identity.md` — Agentic AI Security & Agent Identity**
OWASP ASI01–ASI10 walk-through with control mappings · SPIFFE/SPIRE + AIMS + WIMSE identity stack · Entra Agent ID / Okta / MCP gateway auth · bounded autonomy: decision-rights matrix, autonomy tiers, typed action contracts · rogue agent / goal hijack / memory poisoning defenses · delegation chains & non-repudiation · reference architecture (SPIRE + MCP gateway + policy engine) · +10 agent-security items for the 30-point review checklist.

**2. `agent-interoperability-orchestration.md` — Enterprise Agent Interoperability & Orchestration Governance**
MCP (agent↔tool) + A2A v1.0 (agent↔agent) two-layer stack · Agent Cards, Tasks, Artifacts; ACP/x402/AP2 convergence · agent registries as governance control points · cross-vendor agent trust & delegation limits · agentic payments (AP2 mandates vs x402; spend controls) · OTel GenAI spans across A2A hops · cascading-loop/runaway-spend failure modes · single orchestrator vs registry-mediated mesh decision guide.

**3. `machine-readable-ea.md` — Machine-Readable EA for the Agentic Era**
EA as static blueprint → queryable runtime context · policy-as-code (OPA-style, deny-by-default) · machine-readable constraints/dependencies/lineage as guardrail inputs · EA repository via MCP (models, standards, ADRs as tools) · request-level dynamic governance vs design-time ARBs · EU AI Act human-oversight hooks & explainability APIs · SLM-first as EA standard · migration roadmap from Confluence to a machine-readable policy layer.

---

## Part 4 — Structural stubs in ai-* sections (ordered by severity)

1. `ai-security-governance/index.md` + `policy/` + `deep-mind/` (~10 words each) — need a governance landing page mapping NIST/ISO/EU AI Act to site sections; policy-as-code page; DeepMind safety roadmap summary
2. `ai-security-governance/security/index.md` — 8 PDF iframes, zero prose; needs a 1-page markdown synthesis (searchability)
3. `ai-protocols/auth/index.md` — 7 PDFs only; needs a markdown agent-auth primer (3LO, OBO, token exchange, SPIFFE, Entra Agent ID)
4. `ai-protocols/protocol/index.md` — single PDF; needs an A2A overview + MCP-vs-A2A decision guide
5. `ai-first-enterprise/index.md` — 7 PDF volumes, no prose; needs executive summaries
6. `ai-development/aidlc/index.md` — needs a markdown AIDLC overview (phases, gates, artifacts)
7. `ai-usecases/index.md` — ~40 iframes; needs a markdown case-study index table (sector, pattern, outcome, link)
8. `ai-foundations/index.md` — needs a markdown agentic foundations primer (agent loop, tool use, memory, orchestration)

---

## Part 5 — Priority fix order

1. **EU AI Act timeline** everywhere (governance guide, EU Banking calendar, landing zone) — compliance-critical
2. **eu-west-1/Oregon region error** in the EU Banking guide — actively harmful advice
3. **MCP server count + governance** (3 files) and MCP deep-research §2/§4.7/§12 vs the 2026-07-28 RC
4. **Pricing/context-window table** corrections in EA-architect index + foundations
5. **API mechanics** (adaptive thinking, metadata field, model IDs) in foundations
6. Copilot/Devin pricing in ai-economics; broken viewer URLs (link rot)
7. New guides (Part 3) and stub backfills (Part 4)
