# AI Value Creators for Agentic AI and Beyond
*A synthesis for Principal Enterprise Architects, Chief AI Officers, CTOs, Strategy Consultants, AI Platform Teams, and AI Transformation Leaders*

## TL;DR
- **AI value is now a scaling and operating-model problem, not a technology problem.** Adoption is near-universal — McKinsey's *State of AI* (published 5 Nov 2025, n=1,993 across 105 countries) reports 88% of organizations use AI regularly in at least one function (up from 78% a year earlier) — but enterprise financial impact is rare: only ~6% are "AI high performers" (109 respondents with 5%+ of EBIT attributable to AI), 39% report *any* enterprise-level EBIT impact, and only about one-third have begun scaling enterprise-wide (7% "fully scaled"). The differentiator is workflow redesign, proprietary data/context, and governance — not model choice.
- **Agentic AI is the next value frontier, and value accrues to compounding systems.** BCG's *Widening AI Value Gap* (30 Sept 2025) finds agents account for 17% of total AI value in 2025, rising to a projected 29% by 2028. Leaders treat AI as a self-reinforcing flywheel (data → model → decisions → outcomes → more data) on a decision-centric context layer. But Gartner projects over 40% of agentic AI projects will be canceled by end-2027, and S&P Global found 42% of firms abandoned most AI initiatives in 2025 — the anti-pattern is deploying autonomy on ungoverned data.
- **Winners re-architect the enterprise as a cognitive system.** They combine a shared AI platform ("freedom within a frame"), decision intelligence, human-agent operating models (hub-and-spoke CoE evolving to federated), and outcome-based measurement. Over 3–10 years the pattern points toward AI-native operating models, digital workforces measured as capacity, and autonomous business units — but with humans accountable for the hardest ~20% of decisions.

## Key Findings

1. **The adoption–value gap is the central fact of 2025–2026.** McKinsey (Nov 2025): 88% use AI, 62% experimenting with agents, but only 39% report enterprise EBIT impact and ~6% (109 of 1,993 respondents) are high performers. MIT NANDA's "GenAI Divide" found 95% of GenAI pilots deliver no measurable P&L impact. RAND (2025) put enterprise AI project failure at 80.3%; S&P Global found 42% of firms abandoned most AI initiatives in 2025 (up from 17% in 2024), an estimated ~$18B written off in 18 months.

2. **The failure cause is organizational, not technical.** MIT's "learning gap": tools that can't retain feedback, adapt to context, or integrate into workflows stall. McKinsey high performers are 3.6x more likely to pursue transformative change and 55% report fundamental workflow redesign (vs. ~20% of others). The 10/20/70 rule (BCG): 10% algorithms, 20% data/tech, 70% people/process.

3. **The economics of intelligence are collapsing but not to zero.** Stanford HAI's 2025 AI Index: the cost of querying a GPT-3.5-equivalent model (64.8 MMLU) dropped from $20.00 per million tokens in Nov 2022 to $0.07 by Oct 2024 (Gemini-1.5-Flash-8B) — a >280-fold reduction. But the Jevons paradox and test-time compute (reasoning models) mean total spend rises as reasoning depth increases; agentic task cost exceeds inference — it adds coordination, memory, context, trust, and governance.

4. **Value compounds through flywheels and data/network effects.** Proprietary data + usage → better models → better decisions → more usage, creating structural moats latecomers cannot replicate. IBM's internal orchestration ("Client Zero") is on track for $4.5B in savings by end-2025; AskHR answers 94% of common employee inquiries in minutes, and 86% of top IT issues are addressed by AI-powered support.

5. **Agentic value is created by re-architecting work, not by chasing model accuracy.** BCG frames agentic AI's dual nature (tool + colleague); leaders redesign workflows "agentic-first," build "freedom within a frame" platforms, and expect operating-model and decision-rights changes.

## Details

### Theme 1 — AI as a Value Creation System

**DELIVERABLE — AI Value Creation Reference Model.** Five stacked layers: (1) **Data & Knowledge Substrate** (proprietary data, documents, ontology/knowledge graph); (2) **Model & Reasoning Layer** (foundation, fit-for-purpose, and reasoning models); (3) **Agent & Orchestration Layer** (tools, planners, multi-agent orchestration, memory); (4) **Workflow & Decision Layer** (redesigned value streams, decision intelligence); (5) **Value Capture Layer** (EBIT, revenue, capacity, risk reduction). Value leaks at every inter-layer boundary; the flywheel spins only when outcomes feed back into the substrate.

**AI Value Equation (synthesis):** Realized Value = (Decision Quality × Decision Volume × Automation Rate × Reuse Factor) − (Cost of Reasoning + Coordination + Governance + Change) × (1 − Adoption). Adoption and reuse are the multipliers most firms neglect; IBM found fit-for-purpose models cut inference cost up to 30x, improving the denominator.

**Enterprise AI Flywheel:** proprietary data → context/ontology → model/agent performance → better/faster decisions → measured outcomes → captured "decision exhaust" → richer context. IBM's internal AI orchestration is on track for $4.5B in savings by end-2025, including a 90% cycle-time reduction in finance/journal processing.

- **Key insights:** Value is a system property; point solutions don't compound. The scarce ingredient is governed, contextualized proprietary data plus workflow redesign.
- **Enterprise implications:** Fund the flywheel (data + feedback capture), not isolated pilots; sequence high-leverage decisions first.
- **Architecture implications:** Build a decision-centric semantic layer (ontology/knowledge graph) capturing data, logic, and action; instrument feedback loops back into the lakehouse.
- **Consulting recommendations:** Diagnose whether AI systems can compound (feedback capture, reuse) or will stall; kill non-compounding pilots.
- **Anti-patterns:** "Pilot purgatory"; treating AI as cost-only; linear model-by-model pipelines with no feedback.
- **Open research questions:** How to value "decision capital" on the balance sheet; how fast do data moats compound by industry?

### Theme 2 — Enterprise Value Architecture

**DELIVERABLE — Enterprise AI Value Map + AI Leverage Matrix.** Map value flow across business capabilities → value streams → customer journeys → decisions → processes → knowledge/data/agent/platform assets. The AI Leverage Matrix scores each capability on (a) value-at-stake and (b) AI-amenability (data availability, decision frequency, rule vs. judgment). High/high = "reshape and invent" big bets; low/low = leave alone.

**AI Investment Hierarchy (synthesis):** Foundation (data/context/governance) → Augmentation (copilots) → Automation (agents on bounded workflows) → Orchestration (multi-agent value streams) → Autonomy (self-optimizing units). Don't skip levels.

- **Key insights:** Value leaks at handoffs; agents amplify only where the end-to-end workflow is redesigned — you can't redesign a workflow if humans must orchestrate every step.
- **Enterprise implications:** Rebuild the highest-value workflow end-to-end (e.g., L1→L2 support, SDR→AE handoff).
- **Architecture implications:** Capability heatmaps tied to value streams; event-driven integration so decisions write back to systems of record.
- **Consulting recommendations:** Concentrate spend on 2–3 reshape bets rather than sprinkling AI across 20 processes.
- **Anti-patterns:** "AI confetti"; picking the use case before understanding the underlying process.
- **Open research questions:** Standardized value-leakage metrics; quantifying amplification vs. substitution.

### Theme 3 — AI Economic Models

Inference for GPT-3.5-class performance fell >280x (Stanford AI Index). Yet zero-marginal-cost SaaS economics don't hold: every agent action is a real inference call, and reasoning models scale cost with "thinking time." The **cost of an agentic task** = inference + reasoning depth + tool calls + memory/context retrieval + inter-agent coordination + trust/verification + governance/audit. This drives "service-as-software" and outcome-based pricing over flat-rate SaaS.

**Substitution vs. augmentation:** Klarna's assistant did the work of ~700 (later 853) FTEs and ~$40M ($60M by Q3 2025) profit improvement — but Klarna re-hired humans in May 2025 after nuance/quality gaps, reframing AI as "tier-1 automation, humans move up the value chain." The canonical augmentation lesson.

**Hyperscaler vs. enterprise economics:** foundation labs run "triple-helix" flywheels (Wright's-Law cost curves + data network effects + developer ecosystems). Enterprises can't win on model economics; they win on proprietary context and workflow depth.

**DELIVERABLE — AI Economics Model / Enterprise Investment Model.** TCO = build + inference/run + data/context engineering + governance + change management, benchmarked across three ROI tiers: Realized (18–36 months), Trending (leading indicators), Capability. Implement GenAI FinOps from day 1 (token-cost visibility).

- **Anti-patterns:** all-you-can-use pricing on AI features; ignoring inference-cost scaling; measuring adoption not value.
- **Open questions:** Will inference commoditize to near-zero, or will reasoning depth keep marginal cost material (Jevons)? How to price digital labor?

### Theme 4 — AI Value Patterns (reusable archetypes)

A pattern library from advisor → analyst → engineer → operator → planner → orchestrator → digital employee → manager → executive → operating system. For each: architecture, economics, risk, ROI, adoption.
- **Advisor/Analyst (copilot):** low risk, fast ROI, augmentation; JPMorgan LLM Suite (200,000+ employees, 30–40% efficiency gains reported).
- **Engineer:** coding assistants, 10–20% developer productivity (JPMorgan).
- **Operator:** autonomous execution on bounded workflows (Klarna support; Salesforce Agentforce ~32,000 conversations/week, 83% resolution, escalations halved).
- **Orchestrator:** multi-agent value streams (supervisor + workers); highest value, highest governance burden.
- **Operating system:** ontology-driven enterprise operation (Palantir AIP).

### Theme 5 — Agentic AI Value Creators

Agents create value beyond copilots via planning, reflection, tool orchestration, goal decomposition, autonomous execution, and memory. BCG: agents = 17% of AI value in 2025, rising to 29% by 2028; MIT SMR/BCG: 35% of firms use agentic AI, 44% plan to. Dominant architecture is supervisor/orchestrator + specialized worker agents (LangGraph, AutoGen, CrewAI, Google ADK, OpenAI Agents SDK, Anthropic). Gartner reports a 1,445% surge in multi-agent-system inquiries from Q1 2024 to Q2 2025.

**Where value is created:** agent utilization (like capacity), reuse of agent components across the org (network effect), and the "agent factory" that industrializes production of governed agents. Salesforce's Agentic Enterprise Index: agents deployed per business grew 119% in H1 2025; 94% of consumers chose to interact with agents when offered.

- **Anti-patterns:** "brittle LLM wrappers"; autonomy without audit trails; agents on ungoverned data (liability).
- **Open questions:** inter-agent trust and A2A protocols; long-running-agent memory governance.

### Theme 6 — Enterprise Cognitive Architecture

**DELIVERABLE — Enterprise Cognitive Architecture + Organizational Memory Reference Architecture.** Organizations as cognitive systems: perception (data ingestion) → memory (knowledge graph + vector store + decision traces) → reasoning (models + causal/decision engines) → action (writeback to systems of record) → learning (feedback loops). Palantir's ontology exemplifies "ontology-aware generation" (retrieving structured objects, not text) to reduce hallucination and capture "decision exhaust." **Context engineering — not prompt engineering — is the emerging discipline.** MIT's failure analysis roots pilot collapse in absent institutional memory and contextual metadata.

- **Anti-patterns:** RAG over flat warehouses with no semantics; institutional knowledge lost when experienced staff are cut (Klarna).
- **Open questions:** how to represent and govern organizational memory; decision-trace standards.

### Theme 7 — Enterprise Decision Intelligence

Gartner defines Decision Intelligence Platforms as combining decision modeling, analytics, and AI; it predicts 50% of business decisions will be augmented/automated by AI agents by 2027 and places causal AI as high-impact in 2–5 years. Deloitte (2026): 60% of executives regularly use AI in decisions, but oversight lags.

**DELIVERABLE — Executive Decision Framework:** classify decisions by reversibility, stakes, latency, and confidence; route to automate / augment / human-only; add counterfactual, Bayesian, and causal reasoning, Monte Carlo simulation, scenario planning, and digital twins for high-stakes decisions. Causal AI answers WHY/WHERE/HOW (not just WHAT); agentic AI acts, causal AI decides which actions are worth taking.

- **Anti-patterns:** black-box automation of consequential/rights-impacting decisions; research shows delegating to AI can increase dishonesty and reduce ownership.
- **Open questions:** decision-quality indices; accountability chains for agent decisions.

### Theme 8 — AI Operating Models

**DELIVERABLE — AI Operating Model Blueprint.** Four archetypes: **Centralized** (early maturity, strong governance, bottleneck risk), **Federated** (autonomy, inconsistent standards), **Hub-and-Spoke** (recommended default: central platform/governance + embedded BU leads), **AI-Factory** (continuous industrialized production). IBM research (cited by practitioners): CAIOs in centralized/hub-and-spoke models achieve 36% higher ROI than decentralized. Evolution path: centralize (0–12 mo) → hub-and-spoke (12–24 mo) → federated (24–36 mo). Add AI CoE, agent factory, AI PMO, AI governance council.

- **Anti-patterns:** federated-first before standards exist; a "steering committee" CoE that doesn't operationalize evals/security/FinOps.

### Theme 9 — Enterprise Architecture for AI Value

**DELIVERABLE — Agentic Enterprise Reference Architecture + AI Platform Reference Architecture.** Through TOGAF/Business Architecture: **Business** layer (capability maps, value streams, heatmaps), **Data** layer (ontology, knowledge/vector/graph stores, feature store), **Application** layer (agent platform, orchestration, tools/MCP), **Technology** layer (AI landing zones, GPU/inference, observability). Composable enterprise + event-driven + domain-driven design; the agentic orchestration layer sits at the center of the modern stack. TOGAF stress point: AI creates brand-new capabilities in months, forcing continuous (not annual) capability mapping.

- **Architecture implications:** model-agnostic platform (BYO-model) to avoid lock-in; agent control plane; policy/guardrails/audit as first-class.

### Theme 10 — AI Portfolio Strategy

**DELIVERABLE — AI Portfolio Framework.** Manage capability, agent, use-case, model, data, and platform portfolios like a VC book: many small bets, few big "reshape/invent" bets, ruthless kill criteria (production-readiness gate). Prioritize by value-at-stake × amenability × reusability. Use McKinsey's lighthouse-project approach (3–6 months to results, then scale).

### Theme 11 — AI Value Measurement

**DELIVERABLE — AI Value Scorecard.** Move beyond ROI to a balanced set: **financial** (EBIT impact, AI operating margin, capital efficiency), **operational** (cycle time, automation rate, agent utilization/productivity), **cognitive** (decision-quality index, context/platform reuse, organizational learning velocity), **adoption** (workflow-integrated usage, not seat counts). Three-tier ROI: Realized (18–36 mo), Trending, Capability. Gartner: measure metrics tied to cost reduction / revenue / employee experience, not activity. Measurement maturity: vibe-based → manual → automated dashboards → predictive/outcome-linked.

- **Anti-patterns:** adoption dashboards as success metric; no pre-deployment baseline.

### Theme 12 — AI Transformation

**DELIVERABLE — AI Transformation Roadmap + Capability Maturity Model.** Waves: (1) **Assist** (copilots, literacy); (2) **Automate** (agents on bounded workflows); (3) **Orchestrate** (multi-agent value streams, operating-model redesign); (4) **Autonomous** (self-optimizing units). Maturity stages (MIT CISR / IBM): experimentation → scaling → AI-native. Change management is ~70% of the work; executive sponsorship evaporates within six months in a majority of failed cases. BCG "reshape and invent" big bets; business-led, not IT-led.

### Theme 13 — Industry Deep Dives

**Banking:** JPMorgan — LLM Suite to 200,000+ employees, 30–40% efficiency gains, ~$2B annual value estimated; COiN automated 360,000 lawyer-hours/year; Coach AI improved advisor response times 95% during volatility; 450+ AI use cases. BCG: KYC cost cuts up to 50%; a European retail bank's Ops AI Agent cut lending manual processing 70%, approvals days→<30 min.

**Insurance:** Lemonade — AI claims settled in ~2 seconds, ~50% of claims handled by AI. Zurich — ~$40M annual underwriting-leakage reduction (Expert.AI). Allianz — Insurance Copilot + AllianzGPT to 60,000+ employees; #1 in Evident AI Insurance Index. Intact ~CA$150–200M annualized AI returns; Manulife ~CA$300M AI value FY2025.

**Telecom:** Vodafone SuperTOBi — Portugal first-time resolution 15%→60%, 90% correctness, ~1M conversations/day, ~10x cheaper after a model switch. Deutsche Telekom RAN Guardian (agentic, on Gemini) — reduced major-event management time from hours to ~1 minute (>95%); Frag Magenta handles 4M+ dialogues/year.

**Healthcare/Pharma:** Moderna — ChatGPT Enterprise, 750 custom GPTs in 2 months, 120 conversations/user/week, 100% legal adoption. Pfizer — "Charlie" GenAI platform; manufacturing AI ~10% yield gain, ~25% cycle-time cut; Claude search cut research search time ~80% (~16,000 hours/year, secondary sources). Anthropic Claude for Life Sciences (Oct 2025) — autonomous research partner.

**Manufacturing/Supply Chain:** 61% of manufacturing execs report cost decreases from AI in supply chain; Walmart's 2-year data-infrastructure build → 25–30% cost reduction, 10–15% supply-chain efficiency; AI shift-planning 90→30 min; Trend-to-Product cut fashion timeline up to 18 weeks.

**Retail/E-commerce:** Mercado Libre — Mercado Pago AI Assistant handled >9M conversations Q4 2025, 87% resolved without humans; ad tools +67% FX-neutral growth. Walmart Sparky/Wallaby; 900,000+ weekly conversational-AI users, 3M+ queries/day.

**Energy/Utilities:** Shell + C3 AI — predictive maintenance on 10,000+ (now 30,000+) pieces of equipment, ~20B data points/week. Enel — predictive maintenance cut incidents up to 90% (secondary source; verify).

**Aerospace:** Airbus — generative-design "bionic partition" 45% lighter; potential ~500,000 tons CO2/year if scaled across the A320 backlog; Skywise predictive maintenance.

**Logistics:** DHL — doubled picking productivity at sites, 500M+ robot-assisted picks by mid-2024, $737M investment in 1,000+ AI robots (UK/Ireland); forecasting cut associate travel distance 50%. Maersk — AI routing ~9.2% fuel reduction, predictive maintenance ~30% downtime cut, >$300M annual savings (mostly secondary sources; frame as reported).

**Government:** Pennsylvania ChatGPT Enterprise pilot — ~95 minutes/day saved per employee (self-reported pilot). GSA OneGov — $1.15B procurement savings; USAi platform across 20+ agencies. Gartner: 80% of governments will deploy AI agents for routine decisions by 2028.

**High Tech:** Salesforce (Customer Zero) — Agentforce ~32,000 conversations/week, 83% resolution, escalations halved; ~$540M ARR, 18,500 customers (early 2026); Reddit deflected 46% of support cases, resolution time cut 84% (8.9→1.4 min).

### Theme 14 — Enterprise Case Studies (successes and failures)

Successes detailed above (JPMorgan, Klarna, Moderna, Walmart, DHL, Airbus, Mercado Libre, Vodafone, Deutsche Telekom, Zurich, Lemonade, Salesforce, Pfizer, IBM internal, Shell, GSA, Pennsylvania).

**Failures / cautionary tales:** IBM Watson Health — ~$4B invested, assets sold ~$1B (2022); MD Anderson–Watson ~$62M collapse (clinicians positioned as end-users, not co-designers). Amazon's AI recruiting tool scrapped for gender bias. Adidas Speedfactory shut 2019 (mis-aligned with supply chain/demand). Zillow iBuying ~$881M losses. Klarna over-pivot (re-hired humans 2025). S&P Global: 42% abandoned most AI in 2025; ~$18B written off in 18 months. Common causes: data unreadiness, treating AI as tech not transformation, absent executive ownership, skipped change management, misaligned metrics.

### Theme 15 — Future Value Creators (3–10 year signals)

- **AI-native companies / autonomous enterprises:** IBM's "enterprise in 2030" — AI *as* the business model; self-improving organizations.
- **Physical AI / robotics:** Deloitte — 58% already using physical AI, projected 80% within two years; analysts cite ~$15T economic impact by 2030 (a projection, not realized).
- **Autonomous science:** ORNL "Labs of the Future" closed-loop autonomous experimentation; Anthropic's Mythos generated drug candidates for 9 of 14 targets, with one hypothesis lab-validated.
- **Agent marketplaces / digital labor:** Salesforce AgentExchange; the "$6 trillion digital labor market" framing.
- **AI-native ERP/CRM, self-governing systems, enterprise digital twins, sovereign AI.**
- **Market sizing (projections, treat as speculative):** agentic AI market ~$8–11B in 2026, forecast $45B+ by 2030 (multiple analysts, wide range).

## Deliverables Index
This report contains the requested artifacts, embedded within the themes above: **AI Value Creation Reference Model** (T1); **Enterprise AI Value Map & AI Leverage/Opportunity Matrix & Value Heatmap** (T2); **AI Business Capability Map & Investment Hierarchy** (T2); **AI Economics Model** (T3); **AI Value Patterns library** (T4); **Agentic Enterprise Reference Architecture & AI Platform Reference Architecture** (T9); **Enterprise Cognitive Architecture & Organizational Memory Reference Architecture** (T6); **Executive Decision Framework** (T7); **AI Operating Model Blueprint & AI Organization Design Blueprint & AI Governance Model** (T8); **AI Portfolio Framework** (T10); **AI Value Scorecard & Capability Maturity Model** (T11); **AI Transformation Roadmap & AI Strategy Playbook** (T12); **Enterprise Architect Playbook** (T9 + Recommendations); **Chief AI Officer Playbook** (T8, T11, T12 + Recommendations).

## Recommendations

**Stage 0 (now, 0–3 months): Establish the value thesis and baselines.** Pick 2–3 highest-value workflows (not 20). Set outcome KPIs (EBIT, cycle time, capacity). Baseline before deployment. Stand up a lean hub-and-spoke CoE owning evals, guardrails, LLMOps, and FinOps. *Threshold to proceed:* a named executive owner and a measurable business KPI per initiative.

**Stage 1 (3–9 months): Build the compounding foundation.** Invest 60%+ of project effort in data/context engineering; build the ontology/knowledge-graph and feedback-capture loop. Deploy copilots for adoption/literacy while building agentic capability. *Threshold:* a production-readiness gate (identity, governance, observability, ownership) before any pilot scales.

**Stage 2 (9–24 months): Redesign workflows and deploy governed agents.** Rebuild the chosen workflows end-to-end with agents; use confidence thresholds and human escalation for the hardest ~20%. Move to a shared agent platform ("freedom within a frame"). *Threshold:* a pilot must exit "pilot purgatory" within 6 months or be killed.

**Stage 3 (24–36+ months): Orchestrate and industrialize.** Multi-agent value streams, agent factory, federated operating model, decision intelligence for executive decisions. *Benchmarks that change strategy:* if EBIT impact <2% after 18 months, revisit the operating model and measurement — not the model; if agent utilization/reuse is low, invest in the platform and context layer before adding use cases.

**Always:** business-led not IT-led; 10/20/70 spend; model-agnostic to avoid lock-in; measure workflow-integrated usage, not seat counts; keep humans accountable for consequential decisions.

## Caveats

- **Survey and vendor bias.** Adoption/ROI figures from McKinsey, BCG, Deloitte, Salesforce, and vendors are self-reported and often serve marketing narratives; the MIT 95% and S&P 42% figures have been contested on methodology. Treat single-source numbers as directional.
- **Case-study quality varies.** JPMorgan, Klarna, Moderna, Walmart, DHL, Airbus, Mercado Libre, Vodafone, Deutsche Telekom, GSA, Pennsylvania, and IBM-internal figures are primary/strong. Shell's "$2B savings," Maersk's "$300M/9.2%," H&M's "30% profit uplift," Enel's "90%/300%," and Pfizer's manufacturing/16,000-hours figures rest largely on secondary/vendor sources — verify before citing prominently. Moderna's "15 products with a fraction of headcount" and the physical-AI "$15T" figure are aspirational/projected, not realized.
- **Klarna caveat.** Its savings are cost-avoidance during growth, not layoff-driven, and it re-hired humans in 2025 — the augmentation lesson matters more than the headline FTE number.
- **Rapidly moving field.** Market-size forecasts and 2027–2030 predictions are speculative; regulatory timelines (e.g., EU AI Act) are shifting.
- **Frameworks are synthesis.** The value equation, reference models, and matrices here are original decision scaffolding, not empirically validated standards.