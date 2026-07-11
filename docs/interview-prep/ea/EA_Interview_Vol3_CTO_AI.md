---
title: "ENTERPRISE ARCHITECTURE"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "EA_Interview_Vol3_CTO_AI.pdf"
doc_type: interview-questions
tags: ["interview-prep"]
last_reviewed: 2026-07-10
target_role: "AI/ML Architect"
---
## How to Use This Guide

# **ENTERPRISE ARCHITECTURE** 

### Interview Handbook — Volume 3 

**CTO Round · AI Security · AI Identity · AI Governance** Architecture Review Simulations · Whiteboard Exercises · Mock Interview Scorecards · Reference Architectures · Tradeoff Matrices 

**Distinguished Architect / CTO / Chief AI Architect / Chief Architecture Officer Edition** 

21 questions with 10 perspectives each · Full model answers · Whiteboard exercises · Follow-up challenges Section 18: CTO Round (7 questions) · Section 19: AI Security (5 questions) Section 20: AI Identity (4 questions) · Section 21: AI Governance (5 questions) 

Targeting: Microsoft · Google · Amazon · JPMorgan · Goldman Sachs · Morgan Stanley · Barclays · HSBC · Visa · ServiceNow · SAP 

### **TABLE OF CONTENTS** 

###### G **Section 18 — CTO Round** 

   - The new CEO asks you to present the 5-year technology strategy to the Board next… 

   - Your platform team has become a bottleneck — 400 product engineers are waiting o… 

   - You are 48 hours from briefing the new CEO on AI strategy. They have a backgroun… 

   - You need to present a $200M technology investment programme to the CFO. They are… 

   - You spend $500M/year with technology vendors. Your top 3 vendors (cloud, ERP, co… 

   - You are redesigning the technology organisation from 3,000 engineers. Conway's L… 

- How do you build and manage a technology innovation programme that produces stra… 

- G **Section 19 — AI Security** 

   - Design a comprehensive prompt injection defence architecture for an enterprise L… 

   - Your enterprise uses RAG (Retrieval-Augmented Generation) to answer customer que… 

   - Your company has invested $10M fine-tuning a proprietary LLM for financial servi… 

   - Design a security architecture for an enterprise agentic system where AI agents … 

- What is your threat model for the AI system supply chain — from training data th… 

- G **Section 20 — AI Identity** 

   - Design an agent identity architecture for an enterprise deploying 10,000 AI agen… 

   - An AI agent acts on behalf of a user across multiple downstream services. How do… 

   - How do you implement Just-In-Time (JIT) token scoping for AI agents to ensure th… 

- What are the unique challenges of managing non-human identity (NHI) for AI agent… 

- G **Section 21 — AI Governance** 

   - Design an AI audit trail architecture that simultaneously satisfies SR 11-7 (mod… 

   - Design a human-in-the-loop (HITL) governance architecture for an enterprise with… 

   - Design an enterprise AI risk framework for a bank with 500 production ML/AI mode… 

   - Build an AI governance framework from scratch for a company that is deploying AI… 

   - Design an agent approval workflow architecture for a bank where AI agents can in… 

###### G **Appendix A — Mock Interview Scorecards** 

- CTO Round · AI Security · AI Identity · AI Governance 

###### G **Appendix B — Whiteboard Exercises** 

- 8 timed whiteboard scenarios with evaluation criteria 

###### G **Appendix C — Reference Architectures** 

- RA-1 Enterprise AI Platform · RA-2 Agent Security · RA-3 Zero Trust · RA-4 Risk Framework 

###### G **Appendix D — Tradeoff Matrices** 

- Model Hosting · Orchestration Frameworks · IdP Selection · Governance Platforms 

###### G **Appendix E — Architecture Review Simulations** 

- AR-1 Credit Advice AI · AR-2 Autonomous Payments · AR-3 HR Assistant 

## **HOW TO USE THIS VOLUME** 

This volume builds on Volumes 1 and 2 and targets Distinguished Architect, CTO, and Chief AI Architect interviews. Each question is answered across 10 perspectives — the same dimensions a senior interviewer will probe: Business · Architecture · Security · Operational · Financial · Regulatory · Tradeoffs · Alternatives · Common Mistakes · Executive Summary. For every question: first attempt your own answer, then read the model answer. Where your answer differs, identify why — is it a knowledge gap or a legitimate alternative view? For CTO Round questions: practice the 30-second Executive Summary version out loud. Senior executives interrupt — you must be able to make your key point in under 60 seconds. For Whiteboard Exercises: use a physical whiteboard. Diagrams drawn on paper or screen look different from diagrams drawn in front of an interviewer under time pressure. Practise the physical act. 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 3 

###### **SECTION 18** 

## **CTO ROUND — EXECUTIVE INTERVIEWS** 

[ Technology Strategy ] [ Platform Strategy ] [ AI Strategy ] [ Investment Planning ] [ Vendor Strategy ] [ Org Design ] [ Innovation ] 

_Simulate Executive Committee and Board-level interviews. Every answer must be deliverable to a non-technical CEO or CFO. Prepare both a 2-minute and a 10-minute version of each answer. The 2-minute version is more important — executives interrupt._ 

###### **Q1   CTO   [Technology Strategy] [5-Year Plan] [Board] [Competitive Advantage]** 

**_The new CEO asks you to present the 5-year technology strategy to the Board next month. How do you structure it, what does it contain, and how do you defend it under challenge?_** 

###### **PREPARATION HINTS** 

- I _Start with business outcomes, not technology_ 

- I _Horizon planning (1/3/5 year)_ 

- I _Competitive differentiation vs. table stakes_ 

- I _Capital allocation framework_ 

- I _Risk and dependency map_ 

###### G **BUSINESS PERSPECTIVE** 

The board does not care about technology — they care about competitive advantage, risk, and return. Frame everything in those terms. 

- Open with the business strategy: where does the company want to be in 5 years? What markets, products, revenue streams? 

- Then: what technology capabilities are required to get there? Not what technology we want — what is required. 

- Quantify the opportunity: what revenue at risk if we don't invest? What competitive advantage if we do? 

- Three horizons: Horizon 1 (protect core — 60% of investment), Horizon 2 (grow adjacencies — 30%), Horizon 3 (transform — 10%) 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Structure the technology strategy around capabilities, not systems:** 

- Capability map: what business capabilities are needed? Which are differentiated (build), which are commodity (buy/SaaS)? 

- Current state assessment: honest view of the estate — where are we strong? Where is technical debt blocking strategy? 

- Target state: what does the architecture look like in 5 years? Principles, patterns, platforms. 

- Migration path: how do we get from here to there? Sequenced by dependency and value delivery. 

- Architecture fitness functions: how will we know the strategy is working? 

###### G **SECURITY PERSPECTIVE** 

###### **Security strategy embedded in technology strategy, not appended:** 

- Zero Trust as the security architecture pattern for the 5-year horizon 

- Post-quantum cryptography migration as a non-negotiable workstream (regulatory requirement by 2030) 

- AI security as a new threat surface: prompt injection, model theft, agent abuse — new controls required 

- Cyber resilience: DORA/operational resilience requirements as architecture constraints 

- Security investment as % of technology spend: industry benchmark 8-12% for financial services 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Operability is a strategic concern, not an afterthought:** 

- Platform engineering: reduce cognitive load on product teams — standardise deployment, observability, security 

- SRE culture: SLOs as the contract between technology and business 

- Technology debt runway: how many years before technical debt materially impairs delivery? 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 4 

- Vendor concentration risk: which strategic dependencies create operational fragility? 

- Talent strategy: what skills does the technology organisation need that it doesn't have today? 

###### G **FINANCIAL PERSPECTIVE** 

###### **Technology strategy requires a capital allocation framework:** 

- Technology P&L;: separate run (keep the lights on), grow (incremental improvement), and transform (strategic change) spend 

- Run/Grow/Transform target ratio: typical large bank is 70/20/10. Aspiration should be 50/30/20. 

- Technical debt quantification: convert debt to financial terms — cost of carry, risk exposure, delivery drag 

- Investment thesis for each major initiative: payback period, NPV, strategic option value 

- CapEx vs OpEx: cloud migration changes the capital structure. CFO cares about this. 

###### G **REGULATORY PERSPECTIVE** 

###### **Regulatory compliance as architecture constraint:** 

- EU AI Act high-risk system obligations (enforced August 2026) 

- DORA operational resilience requirements (in force 2025) 

- BCBS 239 data aggregation and reporting 

- FCA/PRA operational resilience rules (UK) 

- Basel IV capital requirements affecting technology investment prioritisation 

- Data sovereignty requirements driving regional architecture decisions 

###### G **TRADEOFFS** 

- Innovation speed vs. architecture discipline: moving fast creates debt. The strategy must define acceptable debt limits. 

- Build vs. buy: differentiating capabilities warrant building. Commodity capabilities should be purchased. The temptation is to build everything. 

- Cloud-first vs. cloud-pragmatic: not all workloads benefit from cloud. Latency-sensitive, data-sovereign, and cost-sensitive workloads may be better on-premises. 

- Centralisation vs. autonomy: platform standardisation reduces variety but can bottleneck product teams. Balance is the critical design decision. 

###### G **ALTERNATIVE APPROACHES** 

- Technology-first strategy: built around exciting technology. Fails because it lacks business grounding. 

- Pure incremental strategy: improve existing systems. Fails to create competitive differentiation. 

- Outsource-everything strategy: reduce technology risk by outsourcing. Creates vendor dependency, loses capability. 

- Platform-only strategy: invest only in platforms. Fails because business outcomes require end-to-end product thinking. 

###### G **COMMON MISTAKES** 

- Leading with technology instead of business outcomes 

- Underestimating the political difficulty of changing run/grow/transform ratios 

- Failing to quantify technical debt in terms the CFO understands 

- Presenting a strategy that ignores regulatory constraints 

- Not having a credible talent acquisition and development plan 

- Confusing a list of projects with a strategy 

- Not anticipating the CFO's first question: 'What are we stopping to fund this?' 

###### G **EXECUTIVE SUMMARY** 

_A 5-year technology strategy is a business strategy with technology as the primary instrument. It starts with competitive intent, translates to capability requirements, and allocates capital with discipline. The board wants to know: what do we own that competitors cannot easily replicate? What are the critical dependencies and risks? How will we know it's working? Prepare for 60 minutes of questions, not 30 minutes of presentation._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw the technology strategy on one page:** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 5 

- Left axis: Business Horizon (1yr / 3yr / 5yr) 

- Top axis: Investment type (Run / Grow / Transform) 

- Fill: key initiatives per quadrant with estimated investment 

- Overlay: strategic dependencies as arrows between initiatives 

- Add: risk flags where dependencies or talent are bottlenecks 

###### **FOLLOW-UP CHALLENGE** 

I _The CFO says your 5-year strategy costs $2B. They will approve $800M. Which 40% do you cut and why?_ 

I _The Board asks: 'What does your strategy do that a competitor cannot copy in 12 months?'_ 

I _A board member asks: 'What is the single biggest technology risk to this company and what are you doing about it?'_ 

###### **Q2   CTO   [Platform Strategy] [Bottleneck] [Team Topology] [Developer Experience]** 

**_Your platform team has become a bottleneck — 400 product engineers are waiting on a 40-person platform team. How do you redesign the platform strategy to enable speed at scale?_** 

###### **PREPARATION HINTS** 

I _Thinnest viable platform_ 

- I _Self-service vs. full-service_ 

- I _Golden paths_ 

I _Team Topologies stream-aligned vs. platform_ 

- I _Paved road vs. guardrails_ 

###### G **BUSINESS PERSPECTIVE** 

- Speed is a strategic asset. If the platform team is the bottleneck, the company is losing revenue opportunities and engineering talent. 

- Quantify the drag: how many weeks of engineering time lost to platform dependency per quarter? 

- Competitive cost: what features have competitors shipped while your engineers waited? 

- Developer NPS: measure it. Low developer satisfaction is a leading indicator of talent attrition. 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Redesign around the Thinnest Viable Platform (TVP) principle:** 

- The platform team provides: paved roads (golden paths) with opinionated, documented defaults — not mandatory infrastructure 

- Product teams can deviate from golden paths when they have genuine reasons — but deviation is explicit and auditable 

- Self-service via Internal Developer Platform (IDP): Backstage-based portal where engineers provision services, databases, pipelines, secrets without raising tickets 

- Platform as a product: platform team has a product backlog, SLA, and NPS score from their internal customers 

- Thin core: only the non-negotiable capabilities are centralised (identity, security guardrails, observability agents). Everything else is self-service. 

###### G **SECURITY PERSPECTIVE** 

###### **Security enforced as guardrails, not gates:** 

- OPA/Kyverno policies enforced in CI/CD pipeline — block non-compliant deployments automatically, no human approval needed 

- Security golden path: compliant baseline is the easiest path to follow. Deviation is harder, not impossible. 

- Supply chain security checks (SBOM, vulnerability scanning) automated — never a manual bottleneck 

- Secrets management: auto-injected via Vault agent. No manual secret rotation tickets. 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Shift from ticket-based to self-service operations:** 

- Day 0 (provisioning), Day 1 (configuration), Day 2 (operations) all self-service 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 6 

- Runbooks as code: automated remediation for known failure patterns 

- Shared observability: platform provides the telemetry infrastructure. Teams own their dashboards and alerts. 

- On-call rotation: product teams own their services on-call. Platform team on-call only for core platform failures. 

###### G **FINANCIAL PERSPECTIVE** 

###### **Platform investment ROI:** 

- Cost per deployment: measure and trend. Self-service platform should reduce this 60-80%. 

- Engineering productivity: hours recovered per engineer per week from self-service migration 

- Incident cost reduction: standardised platforms have fewer integration-related incidents 

- Platform team cost vs. productivity multiplier: 40-person platform team should create 400-person engineering force multiplier 

###### G **REGULATORY PERSPECTIVE** 

###### **Platform must enforce compliance automatically:** 

- Data residency: platform routing policies enforce data sovereignty by default 

- Audit logging: all deployments logged centrally — regulators can query deployment history 

- Change management: automated change records generated by CI/CD satisfy change management requirements without manual process 

###### G **TRADEOFFS** 

- Standardisation vs. flexibility: paved roads reduce cognitive load but may not fit every use case. Over-standardisation frustrates high-performing teams. 

- Self-service vs. governance: more self-service means less control. The right balance depends on risk tolerance. 

- Investment timing: building the IDP takes 12-18 months before teams see benefit. During this period, the bottleneck may worsen. 

###### G **ALTERNATIVE APPROACHES** 

- Hire more platform engineers: scales linearly with load — not a sustainable solution 

- Decentralise platform completely: each product team owns their own infrastructure. Creates fragmentation, security gaps, and duplicated cost. 

- Outsource platform to a cloud provider (e.g., EKS, GKE Autopilot): reduces in-house complexity but loses customisation and potentially increases cost 

###### G **COMMON MISTAKES** 

- Building a 'perfect' platform before releasing it — platform must iterate rapidly with user feedback 

- Mandating platform adoption rather than making it attractive — forced adoption creates resentment 

- Platform team not having engineering resources for customer requests — backlog grows, bottleneck persists 

- Measuring platform success by platform team output (deployments done) vs. product team outcomes (cycle time reduced) 

###### G **EXECUTIVE SUMMARY** 

_A 400:40 ratio means platform is structurally blocking value delivery. The solution is not more platform engineers — it is a self-service Internal Developer Platform that shifts from ticket-based to API-based consumption. Within 18 months, product engineers should be able to provision, deploy, and operate their services without any platform team interaction for standard use cases. The platform team becomes an enabler and accelerator, not a gatekeeper._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw the Platform Maturity Model:** 

- Stage 1: Ad-hoc — everything manual, tickets for everything 

- Stage 2: Scripted — runbooks, some automation, still ticket-based 

- Stage 3: Self-service — IDP with golden paths, automated provisioning 

- Stage 4: Intelligent — platform predicts needs, auto-remediates, proactively optimises 

- Mark current state, target state in 18 months 

###### **FOLLOW-UP CHALLENGE** 

I _A senior product engineer says: 'The IDP is too opinionated — I can't deploy the way my team works.' How do you respond?_ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 7 

I _How do you measure whether the new platform strategy is working?_ 

###### **Q3   CTO   [AI Strategy] [CEO Briefing] [Investment] [Governance]** 

**_You are 48 hours from briefing the new CEO on AI strategy. They have a background in finance, not technology. What is your one-page AI strategy and how do you defend the investment case?_** 

###### **PREPARATION HINTS** 

I _Start with value not technology_ 

- I _Three AI horizons_ 

I _Build vs. buy vs. partner decision_ 

- I _Risk and governance framework_ 

- I _Competitive benchmarking_ 

###### G **BUSINESS PERSPECTIVE** 

- The CEO briefing must answer three questions: Where are we losing money or opportunity by not using AI? Where are competitors using AI that we are not? What will AI enable in 2 years that is impossible today? 

- Identify the top 5 AI use cases with quantified financial impact: fraud reduction, credit decisioning, customer service automation, code generation, risk analytics 

- Build vs. buy vs. partner: do we build proprietary models (competitive differentiator), fine-tune open models, or use AI APIs? Each has a different cost, risk, and strategic profile. 

- AI P&L;: what is the projected cost vs. return for Year 1, Year 3? 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **AI strategy architecture:** 

- Foundation: enterprise data strategy must precede AI strategy. AI without data quality is just fast wrongness. 

- AI Platform: centralised LLM gateway, model registry, feature store, evaluation framework — the shared infrastructure for all AI applications 

- Application tier: AI features embedded in existing products (not standalone AI products that no one uses) 

- Agent layer: autonomous AI agents for specific process automation use cases — phased deployment with human oversight 

- Observability: quality SLOs on every AI system — if you can't measure it, you can't trust it 

###### G **SECURITY PERSPECTIVE** 

AI security is a new attack surface that most security teams are not prepared for: 

- Prompt injection: external content manipulating AI agent behaviour — architectural defence required 

- Model theft and IP protection: proprietary fine-tuned models are IP — access controls, rate limiting, watermarking 

- Data leakage: AI systems can inadvertently expose training data or other users' context — strict isolation required 

- Supply chain: third-party model providers become critical infrastructure — vendor risk management applies 

- AI Act compliance: high-risk AI systems require conformity assessment — legal risk if not addressed 

###### G **OPERATIONAL PERSPECTIVE** 

###### **AI operations are different from software operations:** 

- Models degrade without model drift — monitoring required 

- AI incidents are probabilistic — detection harder than binary system failures 

- Explainability required for regulated decisions — not a nice-to-have 

- Human override capability for every consequential AI decision 

- Rollback requires model version management, not just code rollback 

###### G **FINANCIAL PERSPECTIVE** 

###### **AI investment framework:** 

- Year 1 investment: platform build ($5-15M depending on scale) + use case delivery ($2-5M per use case) 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 8 

- Expected Year 1 returns: fraud reduction 10-15% = $X00M depending on fraud losses; customer service automation 20-30% cost reduction 

- Token costs: $20-50M/year at scale — AI FinOps required from day one 

- Build vs. API: API cheaper short-term, fine-tuned model cheaper long-term above certain call volume threshold 

- ROI timeline: Year 1 investment-heavy, Year 2-3 returns dominate 

###### G **REGULATORY PERSPECTIVE** 

###### **Regulatory obligations as investment rationale:** 

- EU AI Act: high-risk AI non-compliance risk is 6% of global turnover — framing governance investment as risk mitigation 

- SR 11-7 (US Fed): model risk management requirements for ML/AI in banking — validation framework required 

- FCA expectations on AI explainability in consumer decisions (UK) 

- GDPR: automated decision-making restrictions (Article 22) — human review requirements 

- These are not optional — budget for compliance architecture 

###### G **TRADEOFFS** 

- Speed vs. governance: deploying AI fast creates regulatory and reputational risk. Governance slows speed. 

- Build vs. buy: building models creates proprietary advantage but requires scarce ML engineering talent. 

- Centralised vs. federated AI: central AI team creates bottleneck; federated AI creates governance gaps. 

- Experimentation vs. industrialisation: most AI programmes have many pilots and few production systems. The bottleneck is from pilot to production. 

###### G **ALTERNATIVE APPROACHES** 

- AI everywhere approach: deploy AI in every process. Creates governance nightmare and diluted focus. 

- AI lab model: isolated AI research team. Produces research papers, not business value. 

- Partner-only model: all AI capability from vendors. Creates vendor lock-in and no internal capability. 

- Wait-and-see approach: let competitors experiment, adopt later. Risk: some AI advantages are compounding — first-mover matters. 

###### G **COMMON MISTAKES** 

- Presenting an AI strategy that is a list of use cases rather than a strategy 

- Not addressing data quality as a prerequisite — 'we'll fix data later' guarantees failure 

- Underestimating the cost of AI at scale (token costs, GPU costs, talent costs) 

- Not having a governance framework — regulators are watching AI deployment closely 

- Confusing 'we have an AI project' with 'we have an AI strategy' 

- Not benchmarking against competitors' AI maturity 

###### G **EXECUTIVE SUMMARY** 

_AI strategy has three components: foundation (data and platform), applications (embed AI in existing products for measurable ROI), and governance (make it safe, compliant, and auditable). The first year is investment-heavy; years 2-3 are return-dominated. The biggest risk is not moving too fast — it is building AI on weak data foundations and then discovering the governance gap when a regulator or a journalist finds a failure. Build the platform right, deploy use cases fast._ 

###### **WHITEBOARD EXERCISE** 

###### **One-page AI strategy map:** 

- Column 1: Foundation (Data quality, AI Platform, Talent) 

- Column 2: Horizon 1 Applications (12 months, quick wins with clear ROI) 

- Column 3: Horizon 2 Applications (12-24 months, transformational) 

- Column 4: Governance (Risk framework, EU AI Act, SR 11-7) 

- Bottom: Investment and Return timeline 

###### **FOLLOW-UP CHALLENGE** 

I _The CEO asks: 'Our competitor has 500 AI engineers. We have 50. How do we compete?' How do you respond?_ 

- I _The Board asks you to guarantee the AI strategy will deliver $500M in value in 3 years. What do you say?_ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 9 

###### **Q4   CTO   [Investment Planning] [CFO] [Business Case] [Capital Allocation]** 

**_You need to present a $200M technology investment programme to the CFO. They are sceptical of technology ROI claims. How do you build and defend the business case?_** 

###### **PREPARATION HINTS** 

- I _NPV and IRR calculation_ 

- I _Risk-adjusted returns_ 

- I _Optionality value_ 

- I _Cost of inaction_ 

- I _Comparables from industry_ 

###### G **BUSINESS PERSPECTIVE** 

CFO language is NPV, IRR, payback period, and risk-adjusted return. Translate every investment into these terms: 

- Revenue protection: which investments prevent revenue loss? (e.g., preventing regulatory action that could restrict operations) 

- Revenue growth enablement: which investments directly enable new revenue? Quantify the incremental revenue per dollar invested. 

- Cost reduction: which investments reduce operating cost? What is the fully-loaded cost saving? 

- Risk reduction: what is the expected value of risk reduction? (probability of loss × magnitude of loss) 

- Cost of inaction: what happens in year 3 if we don't invest? This is often the most powerful CFO argument. 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Portfolio view of the $200M:** 

- Run (maintain): 40% — keep existing systems operational and compliant. Non-discretionary. Present as mandatory baseline. 

- Grow (improve): 35% — incremental improvements to existing capabilities. Each with specific ROI calculation. 

- Transform (differentiate): 25% — strategic investments that create future competitive advantage. Present as portfolio with option value. 

- Sequence investments by: dependency (what must come first?), risk (what is most uncertain?), and return timing (when does cash come back?) 

###### G **SECURITY PERSPECTIVE** 

###### **Security investments as risk quantification:** 

- Cyber incident expected value: probability × average cost of major incident (industry data: average financial services cyber incident costs $18M+) 

- Regulatory fine avoidance: calculate expected regulatory penalty risk being mitigated 

- Insurance premium reduction: evidence that improved security posture reduces cyber insurance cost 

- Reputational risk: harder to quantify but directionally important 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Operational investment ROI:** 

- Engineering productivity gains: if $50M in platform investment recovers 30% of engineering time, what is the value of that recovered time at fully-loaded engineering cost? 

- Incident cost reduction: mean time to recovery improvement × average incident cost 

- Vendor contract consolidation: rationalisation savings from vendor reduction 

- Automation ROI: process automation saves X FTE at Y cost = Z annual saving, payback in W months 

###### G **FINANCIAL PERSPECTIVE** 

###### **Business case structure:** 

- Total investment: $200M (phased over 3 years: $80M / $70M / $50M) 

- Total returns: Year 1 $15M, Year 2 $65M, Year 3 $140M (cumulative $220M) 

- NPV at 8% discount rate: $X (should be positive by Year 3) 

- IRR: target >15% to clear corporate hurdle rate 

- Payback period: <3 years for CFO appetite 

- Sensitivity analysis: what if returns are 30% lower? What if costs are 20% higher? Still viable? 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 10 

- Risk-adjusted: weight returns by confidence: certain savings (high weight), estimated productivity gains (medium weight), strategic option value (low weight) 

###### G **REGULATORY PERSPECTIVE** 

###### **Regulatory investment is non-discretionary:** 

- Present regulatory investments separately as mandatory compliance spend — these are not optional and should not be subject to ROI challenge 

- Regulatory cost of inaction: DORA non-compliance fines, EU AI Act fines, BCBS 239 regulatory expectations — quantify expected regulatory action cost without investment 

- Regulatory capital benefit: investments that improve operational resilience may reduce operational risk capital requirement under Basel III 

###### G **TRADEOFFS** 

- Front-loading vs. back-loading investment: investing heavily in Year 1 creates earlier returns but higher cash burn. Back-loading reduces Year 1 risk but delays returns. 

- Centralised vs. distributed investment control: central control enables portfolio optimisation; distributed control enables business-led innovation. 

- Waterfall funding vs. rolling horizon: annual budget cycles create stop-start investment; rolling horizon allocation is more efficient but requires CFO trust. 

###### G **ALTERNATIVE APPROACHES** 

- Reduce scope to $120M: reduces cost but likely removes the strategic investments that create differentiation. Present the delta in return terms. 

- Phase over 5 years instead of 3: reduces annual spend but extends payback period and increases execution risk 

- Outsource to reduce CapEx: converts investment to OpEx, may reduce CFO objections but increases vendor dependency 

###### G **COMMON MISTAKES** 

- Presenting a 'trust me' business case without financial model 

- Not having a cost-of-inaction argument 

- Including vanity investments without clear ROI 

- Underestimating the CFO's ability to challenge assumptions 

- Not having a portfolio view — presenting 47 individual projects instead of a coherent programme 

- Forgetting that CFOs have seen many technology business cases fail — your credibility as a CTO is on the line 

###### G **EXECUTIVE SUMMARY** 

_The $200M investment programme has a 3-year NPV of $X and IRR of Y%. Of the total, $80M is non-discretionary (regulatory and maintenance), $75M has proven ROI (automation and cloud migration), and $45M is strategic investment in AI and platform that creates 5-year competitive option value. The cost of not investing is estimated at $Z in missed revenue and $W in regulatory risk. I recommend phasing: $80M in Year 1 (compliance-first), then $70M and $50M as returns materialise._ 

###### **WHITEBOARD EXERCISE** 

###### **Investment waterfall diagram:** 

- Bar chart: Year 0-3 investment vs. cumulative returns 

- Break-even line: when cumulative returns exceed cumulative investment 

- Risk-adjusted vs. base case scenario bands 

- Portfolio matrix: 2x2 of Strategic Value vs. Certainty of Return 

###### **FOLLOW-UP CHALLENGE** 

I _The CFO approves only $120M and asks you to cut the rest. Walk through your prioritisation framework._ 

- I _Six months in, the programme is 20% over budget. How do you communicate this to the CFO and Board?_ 

###### **Q5   CTO   [Vendor Strategy] [Concentration Risk] [Negotiation] [Ecosystem]** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 11 

**_You spend $500M/year with technology vendors. Your top 3 vendors (cloud, ERP, core banking) represent 70% of spend. How do you design a vendor strategy that manages concentration risk while maintaining competitive procurement leverage?_** 

###### **PREPARATION HINTS** 

- I _Vendor tiering_ 

- I _DORA concentration risk_ 

- I _Multi-vendor strategy_ 

I _Exit strategy_ 

- I _Negotiation leverage_ 

###### G **BUSINESS PERSPECTIVE** 

###### **Vendor strategy is a balance between concentration efficiency and resilience:** 

- Concentration benefits: volume discounts, deeper partnerships, reduced integration complexity 

- Concentration risks: supplier failure, price increases, regulatory sanctions on vendor, loss of negotiating leverage 

- DORA requirement: EU-regulated institutions must identify ICT concentration risk and have credible mitigation plans — this is not optional 

- Business continuity: what is the impact if your #1 cloud provider has a major outage? Your core banking vendor fails? These are board-level questions. 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Vendor architecture strategy:** 

- Vendor tiering: Strategic (1-2 vendors, deep integration, board-level relationship), Preferred (5-10 vendors, standard integration, senior relationship), Commodity (open market, lowest cost, replaceable) 

- Portability architecture: for strategic vendors, define the exit architecture at contract signing. What would migration take? Document it. 

- Multi-cloud: for cloud concentration risk, architect applications to avoid cloud-specific lock-in for the most critical workloads 

- Core banking: modular architecture with standard APIs (ISO 20022, BIAN) reduces switching cost and enables gradual migration 

###### G **SECURITY PERSPECTIVE** 

###### **Vendor security risk management:** 

- Tier 1 vendor security requirements: annual penetration test, SOC 2 Type II, ISO 27001, right to audit contractually guaranteed 

- Incident notification: Tier 1 vendors contractually required to notify you within 4 hours of any incident that could affect your services (DORA requirement) 

- Sub-processor disclosure: Tier 1 vendors must disclose their own critical sub-processors — your supply chain is their supply chain 

- Vendor access management: all vendor access to production systems via PAM (privileged access management), time-limited, fully audited 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Vendor operational resilience:** 

- SLA requirements differentiated by vendor tier: Tier 1 core banking platform — 99.99% availability, 15-minute RTO 

- Joint resilience testing: Tier 1 vendors must participate in annual resilience testing exercises 

- Vendor escrow: for business-critical software, source code escrow ensures you can maintain the system if vendor fails 

- Dependency mapping: DORA-mandated register of all ICT third-party dependencies with criticality classification 

###### G **FINANCIAL PERSPECTIVE** 

###### **Negotiation and value extraction:** 

- $500M spend creates leverage. Use it. Volume-based pricing should yield 15-25% below list price for top vendors. 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 12 

- Multi-year contracts: 3-year commitments get better pricing; 5-year is too long given technology change rate 

- Benchmarking: use Gartner/ISG/TPI benchmarking data to validate you are paying market rates — vendors know when you have this data 

- Contract terms: auto-renewal with price increase caps, service credit mechanisms, termination for convenience rights 

- Shadow competition: always have a credible alternative vendor in your pocket when negotiating renewal 

###### G **REGULATORY PERSPECTIVE** 

###### **DORA ICT Third-Party Risk requirements:** 

- Critical third-party register: maintained and updated quarterly 

- Contractual requirements for Tier 1: audit rights, incident notification, resilience testing participation, exit plan 

- Concentration risk assessment: formal assessment if >40% of critical function delivery depends on a single vendor 

- Exit plan: documented and tested exit plan for each Tier 1 vendor — regulators will ask for this 

###### G **TRADEOFFS** 

- Best-of-breed vs. integrated suite: best-of-breed maximises capability in each domain; integrated suites reduce integration complexity and negotiation overhead. 

- Long-term contracts vs. flexibility: longer contracts get better pricing but reduce ability to respond to market changes. 

- Multi-vendor vs. single vendor per category: multi-vendor increases resilience but increases integration and management complexity. 

###### G **ALTERNATIVE APPROACHES** 

- Cloud-only vendor strategy: simplify to one cloud provider. Reduces complexity but maximises concentration risk. 

- Build-not-buy for strategic capabilities: reduce vendor dependency by building proprietary capabilities. Requires significant in-house engineering capacity. 

- Consortium purchasing: join industry consortium to aggregate buying power across peers. 

###### G **COMMON MISTAKES** 

- Not having an exit plan for critical vendors — when the vendor raises prices 40%, you discover you can't leave 

- Signing 7-year ERP contracts without break clauses 

- Not reading the DORA concentration risk register until a regulator examines it 

- Letting vendor relationships become personal rather than commercial — makes it harder to negotiate 

- Not tracking total cost of ownership — licence cost is often only 40-50% of true TCO 

###### G **EXECUTIVE SUMMARY** 

_Vendor strategy is a balance between cost efficiency and strategic resilience. Your top 3 vendors represent both your greatest efficiency and your greatest concentration risk. The solution is not to immediately diversify — switching costs are real. Instead: (1) ensure all Tier 1 contracts have the right legal protections; (2) build portability into architecture incrementally; (3) maintain credible negotiating alternatives; (4) meet DORA concentration risk requirements formally. Review vendor strategy annually against market alternatives._ 

###### **WHITEBOARD EXERCISE** 

###### **Vendor portfolio matrix:** 

- X-axis: Strategic importance (low → high) 

- Y-axis: Switching difficulty (easy → hard) 

- Quadrant 1 (high importance, easy to switch): aggressively shop at renewal 

- Quadrant 2 (high importance, hard to switch): invest in portability architecture, maximum contract protections 

- Quadrant 3 (low importance, easy to switch): commodity procurement, lowest cost 

- Quadrant 4 (low importance, hard to switch): actively reduce dependency 

###### **FOLLOW-UP CHALLENGE** 

I _Your primary cloud vendor announces a 30% price increase with 90 days notice. Walk through your response._ 

I _A regulator says your DORA concentration risk register shows a single point of failure in payment processing. What is your 90-day response?_ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 13 

###### **Q6   CTO   [Organisational Design] [Engineering Leadership] [Conway's Law] [Scale]** 

**_You are redesigning the technology organisation from 3,000 engineers. Conway's Law means your organisation will design the architecture it is structured to build. How do you design the organisation to build the architecture you want?_** 

###### **PREPARATION HINTS** 

- I _Team Topologies_ 

- I _Inverse Conway manoeuvre_ 

- I _Stream-aligned teams_ 

- I _Platform and enabling teams_ 

- I _Cognitive load budget_ 

###### G **BUSINESS PERSPECTIVE** 

Organisational design is architecture. Conway's Law is not a metaphor — it is an empirical observation. The organisational structure you create will produce systems with the same coupling pattern. 

- If you want loosely-coupled, independently deployable services: you need loosely-coupled, independently-operated teams 

- If you want a scalable AI platform: you need a platform team that operates like a product company, not a shared services cost centre 

- If you want fast customer value delivery: you need stream-aligned teams with end-to-end ownership, not functional silos 

###### G **ARCHITECTURE PERSPECTIVE** 

Inverse Conway Manoeuvre — design the organisation to match the target architecture: 

- Stream-aligned teams (60-70% of teams): focused on a customer-facing value stream. Owns a domain end-to-end. Small (5-9 people). Minimise dependencies. 

- Platform teams (15-20%): build and maintain the Internal Developer Platform. Treat product teams as customers. Self-service first. 

- Enabling teams (10-15%): time-bounded coaches who help stream-aligned teams adopt new capabilities (AI, observability, security). Not permanent. 

- Complicated subsystem teams (5-10%): for areas requiring deep specialisation (ML model training, core banking engine, trading risk systems) 

- Target team size: Dunbar-informed. Teams of >12 people start losing coherence. Prefer 5-9. 

###### G **SECURITY PERSPECTIVE** 

###### **Security organisational design:** 

- Platform security: security capabilities (secrets management, identity, policy enforcement) embedded in the platform — not a separate security team that reviews every deployment 

- Security enabling team: time-bounded team that helps product teams adopt secure coding practices, threat modelling, and security testing 

- Centralised CISO function: sets policy and standards; manages regulatory relationships; does not own day-to-day security operations in product teams 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Cognitive load management:** 

- Each team has a cognitive load budget — the amount of knowledge, coordination, and operational responsibility they can sustainably carry 

- Too many dependencies (coordination load), too broad a domain (intrinsic load), too complex a tech stack (extrinsic load) all exceed the budget 

- Team cognitive load assessment: for each team, score their load in each dimension. Teams over budget need scope reduction or platform investment. 

- On-call sustainability: no team should be on-call for services they don't own. On-call follows ownership. 

###### G **FINANCIAL PERSPECTIVE** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 14 

###### **Organisational design has a financial model:** 

- Cost per team: fully-loaded cost of a 7-person team (salary, benefits, tooling, office) is typically £700K-£1.2M/year 

- Productivity multiplier: platform investment in self-service should allow each platform engineer to support 10x product engineers 

- Span of control: appropriate span (1 manager to 7-10 engineers) — over-management is waste; under-management is risk 

- Hiring vs. retraining: in a reorganisation, retrain existing engineers where possible. Hiring market for senior engineers is extremely competitive. 

###### G **REGULATORY PERSPECTIVE** 

###### **Regulatory considerations in organisational design:** 

- Three lines of defence: technology organisation maps to first-line (own the risk). Technology Risk function in second line. Internal Audit in third. 

- SOX controls: engineering organisations under SOX must separate development from production access — team design must respect this boundary 

- DORA: operational resilience accountability must be clearly assigned at team level — regulators will ask 'who is accountable for this critical function?' 

###### G **TRADEOFFS** 

- Centralisation vs. autonomy: central platforms enable standardisation; autonomous teams enable speed. The balance point shifts with company maturity. 

- Specialist vs. generalist teams: specialist teams build deeper expertise; generalist teams move faster with fewer dependencies. 

- Stability vs. reorganisation: reorganisations have a 6-12 month productivity cost. Frequent reorganisation is more disruptive than the problem it solves. 

###### G **ALTERNATIVE APPROACHES** 

- Functional organisation (front-end, back-end, DBA, DevOps): optimises for skill specialisation but maximises coordination overhead and creates silos. 

- Product-led organisation without platform: each product team owns full stack. Fast but creates fragmentation and security gaps. 

- Outsourced engineering model: reduce headcount by outsourcing development. Reduces cost but increases coordination overhead and loses proprietary knowledge. 

###### G **COMMON MISTAKES** 

- Redesigning the organisation without considering cognitive load — teams become overwhelmed and productivity falls 

- Creating a platform team that operates as a shared service cost centre rather than a product team 

- Implementing Team Topologies as a naming exercise without changing how teams actually interact 

- Not addressing the impact on people — reorganisations create anxiety. Communication and support matter. 

- Ignoring Conway's Law and then wondering why the architecture didn't change 

###### G **EXECUTIVE SUMMARY** 

_Organisational design is the most powerful architecture tool available to a CTO. The structure you create will determine the systems you can build. Applying the Inverse Conway Manoeuvre — designing the organisation to match the target architecture — and the Team Topologies patterns creates an organisation that can deliver: fast, independently-deployable products; a platform that enables rather than blocks; and specialists who enable rather than gatekeep. The transition from 3,000 people in functional silos to stream-aligned teams takes 18-24 months and requires sustained leadership commitment._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw 3,000 engineers as teams:** 

- Group into Stream-aligned (n teams × ~7 people) 

- Platform teams (n × ~7) 

- Enabling teams (temporary, time-bounded) 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 15 

- Complicated subsystem teams 

- Show interaction modes: X-as-a-Service, Collaboration, Facilitating 

- Overlay: current vs. target interaction patterns 

###### **FOLLOW-UP CHALLENGE** 

I _Three months after the reorganisation, your most senior engineers are threatening to leave because they feel their craft is being commoditised. How do you respond?_ 

I _How do you measure whether the organisational design is working?_ 

###### **Q7   CTO   [Innovation Management] [Portfolio] [Culture] [Strategic Bets]** 

#### **_How do you build and manage a technology innovation programme that produces strategic outcomes rather than innovation theatre?_** 

###### **PREPARATION HINTS** 

- I _Innovation portfolio vs. point initiatives_ 

- I _Horizon model_ 

- I _From lab to production_ 

- I _Kill criteria_ 

- I _Innovation metrics beyond hackathons_ 

###### G **BUSINESS PERSPECTIVE** 

Innovation theatre: activities that look like innovation — hackathons, AI labs, innovation days — that produce prototypes, demos, and press releases but no production systems and no business value. 

- Outcome-based innovation: every innovation investment has a defined success criterion measured in business terms (revenue, cost, risk) 

- Portfolio management: not every bet will pay off. The portfolio as a whole must generate return. Individual failures are expected and managed. 

- Time-bound: innovation initiatives without deadlines drift indefinitely. Deadlines force decisions. 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Innovation architecture:** 

- Horizon 1 (Optimise — 60%): incremental innovation within existing platforms. AI features in existing products. Automation of existing processes. 

- Horizon 2 (Extend — 30%): adjacent innovation. New products built on existing platforms. New markets served by existing capabilities. 

- Horizon 3 (Transform — 10%): disruptive innovation. New business models. New technology bets. Accept high failure rate. 

- Production pipeline: every innovation initiative must have a defined production path or it is not an innovation — it is a science experiment 

- Architecture review at graduation: before an H3 concept moves to H2, it must pass architecture review for scalability, security, and compliance 

###### G **SECURITY PERSPECTIVE** 

###### **Innovation security sandbox:** 

- Isolated environments with no access to production data or production network 

- Synthetic data for AI training and testing — no customer PII in innovation environments 

- Security review gate before any innovation moves toward production 

- Open-source components used in innovation must be reviewed before adoption in production 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Innovation operations:** 

- Dedicated innovation capacity: 10-15% of engineering time ring-fenced for H2/H3 work. Not subject to sprint velocity pressure. 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 16 

- Rotation programme: engineers rotate through innovation team (6-month tours). Returns production insights to innovation, innovation insights to production. 

- Exit criteria: every innovation initiative evaluated at 90-day gates. Continue / Pivot / Kill decision required. No zombie projects. 

- Kill culture: killing a project that isn't working is a success. Rewarding teams for rigorous kills, not just successful bets. 

###### G **FINANCIAL PERSPECTIVE** 

###### **Innovation portfolio economics:** 

- H1 innovations: 12-month payback expected. High confidence in return. 

- H2 innovations: 24-36 month payback. Medium confidence. Portfolio diversification required. 

- H3 innovations: 5-7 year payback. Low confidence in any individual bet. Expect 8/10 to fail. 1-2 will pay for the rest. 

- Innovation budget as % of technology spend: industry benchmark for financial services 5-10% 

- Stage-gate funding: innovations receive seed funding at each gate, not full programme budget upfront. Reduces waste. 

###### G **REGULATORY PERSPECTIVE** 

###### **Innovation governance:** 

- Regulatory sandbox: many regulators (FCA, MAS, HKMA) operate innovation sandboxes for testing regulated products. Use them. 

- Pre-application engagement: for regulated innovations (AI in credit decisions, biometrics), engage regulator informally before building 

- Compliance by design: every innovation initiative has a compliance owner who assesses regulatory implications at inception, not at launch 

###### G **TRADEOFFS** 

- Speed vs. rigour: moving fast in innovation produces prototypes quickly but creates technical debt and security issues at scale. 

- Internal vs. external innovation: internal programmes build proprietary capability; external (VC investment, partnerships, acquisitions) gets to market faster. 

- Innovation team vs. embedded innovation: centralised innovation teams create isolation from business problems; embedded innovation lacks focus. 

###### G **ALTERNATIVE APPROACHES** 

- Acquire innovation: buy startups instead of building. Faster market access but integration is hard and culture clashes are common. 

- Partner for innovation: co-innovate with fintech partners, cloud providers, or academic institutions. Reduces cost but dilutes IP. 

- Open innovation: publish APIs and invite external developers to innovate on your platform. Scales innovation surface area but requires platform investment. 

###### G **COMMON MISTAKES** 

- Running hackathons as the primary innovation mechanism — they produce demos, not products 

- Not having kill criteria — zombie projects consume resources without producing value 

- Letting innovation happen only in the innovation lab — the best innovations often come from product teams solving real problems 

- Not tracking innovation output in business terms — 'we filed 12 patents' is vanity; 'we generated $X from 3 innovations' is value 

- Separating innovation from production reality — innovators who never run production systems build things that don't scale 

###### G **EXECUTIVE SUMMARY** 

_Innovation management is portfolio management applied to technology bets. The discipline is not in generating ideas — organisations have abundant ideas. The discipline is in selecting, funding, and decisively killing or scaling those ideas based on evidence. Build an innovation portfolio with three horizons, stage-gate funding, explicit kill_ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 17 

_criteria, and production graduation requirements. Measure innovation by business value delivered to production, not by ideas generated or patents filed._ 

###### **WHITEBOARD EXERCISE** 

###### **Innovation pipeline:** 

- Funnel: Ideation → Concept → Prototype → Pilot → Scale → Production 

- At each stage: entry criteria, exit criteria, decision authority, funding level 

- Portfolio view: how many initiatives at each stage? What is the expected value at each stage? 

- Metrics overlay: time-in-stage, kill rate, graduation rate, production value 

###### **FOLLOW-UP CHALLENGE** 

I _The Board wants to see the ROI on last year's $15M innovation investment. What do you show them?_ 

I _A competitor launches a product that your innovation lab built a prototype of 18 months ago but never took to production. How does this happen and how do you prevent it?_ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 18 

###### **SECTION 19** 

## **AI SECURITY — ADVANCED ARCHITECTURE** 

[ Prompt Injection ] [ Data Poisoning ] [ Model Theft ] [ Agent Abuse ] [ Tool Exploitation ] [ Supply Chain ] 

_AI security requires a threat model distinct from traditional application security. These questions probe whether you understand the AI-specific attack surface and can design architectures that are structurally resistant to it. The key differentiator: distinguishing between prompt engineering mitigations (insufficient) and architectural mitigations (required)._ 

###### **Q1   DISTINGUISHED   [Prompt Injection] [LLM Security] [Defence Architecture]** 

#### **_Design a comprehensive prompt injection defence architecture for an enterprise LLM platform handling regulated financial decisions. What are the attack vectors and how do you defeat them architecturally?_** 

###### **PREPARATION HINTS** 

- I _Direct vs indirect injection_ 

- I _Instruction hierarchy_ 

- I _Input validation_ 

- I _Output filtering_ 

- I _Canary tokens_ 

- I _Sandboxed execution_ 

###### G **BUSINESS PERSPECTIVE** 

- Prompt injection is the #1 security risk in LLM deployments. In a regulated financial context, a successful injection could: override credit decisioning logic, exfiltrate customer data, bypass compliance controls, cause the model to produce advice that violates regulations. 

- Business impact: regulatory fine, customer harm, reputational damage, potential licence revocation 

- The attack surface is every piece of external content that enters the LLM context: documents, emails, web pages, database records, API responses, user messages 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Defence-in-depth architecture for prompt injection:** 

###### **Layer 1 — Input Validation:** 

- Classify every input by trust level: System prompt (highest trust), User message (medium trust), External content (zero trust) 

- External content never placed in system prompt position 

- Input length limits and character sanitisation 

- Injection pattern detection (ML classifier trained on known attack patterns) 

###### **Layer 2 — Instruction Hierarchy:** 

- System prompt explicitly establishes that no user instruction or external content can override core instructions 

- Canary token technique: embed a secret token in system prompt. If LLM reveals it, injection has occurred. 

- Role separation: never combine 'process this external document' and 'make decisions with elevated authority' in the same prompt 

###### **Layer 3 — Output Validation:** 

- Output classifier: does the LLM response contain instructions, code, URLs, or data extraction patterns that suggest injection success? 

- Response schema enforcement: for structured outputs, validate against strict schema — reject responses that don't conform 

- PII detection: scan outputs for customer data that should not be in a response 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 19 

###### **Layer 4 — Sandboxed Tool Execution:** 

- Tools available to the LLM execute in minimal-privilege sandbox 

- No tool can access production data directly — only via API with explicit authorisation 

- Tool call rate limiting: if LLM issues >N tool calls in a single session, trigger human review 

###### G **SECURITY PERSPECTIVE** 

###### **Specific attack vectors and countermeasures:** 

- Direct injection: user embeds instructions in their message ('Ignore previous instructions and...'). Counter: input classification, system prompt authority establishment. 

- Indirect injection: malicious content in a document or web page the LLM is asked to process. Counter: zero-trust treatment of external content, content sandboxing. 

- Multi-turn injection: attacker gradually shifts model behaviour across multiple turns. Counter: stateless prompt reconstruction on each turn, anomaly detection across turns. 

- Jailbreak via role-play: 'Let's play a game where you are an AI without restrictions.' Counter: jailbreak classifier on input. 

- Tool exploitation: injection in tool response causes LLM to make additional dangerous tool calls. Counter: tool response sanitisation, tool call limits. 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Monitoring and response:** 

- Injection attempt logging: every detected or suspected injection attempt logged with full context 

- Red team programme: quarterly adversarial testing of the LLM platform 

- Incident classification: injection attempts classified by severity (attempted vs. partially successful vs. successful) 

- Response playbook: successful injection → immediate session termination, audit of all outputs from that session, customer notification if required 

###### G **FINANCIAL PERSPECTIVE** 

###### **Security investment justification:** 

- Cost of undetected injection in credit decisioning: one case of AI-assisted fraud or discriminatory lending can cost $10M+ in regulatory fines and remediation 

- Security tooling cost: $200-500K/year for a mature AI security stack 

- Red team programme: $100-200K/year for quarterly adversarial testing 

- ROI: one prevented major incident justifies multiple years of security investment 

###### G **REGULATORY PERSPECTIVE** 

###### **Regulatory implications of prompt injection:** 

- EU AI Act: high-risk AI systems must have 'cybersecurity robustness standards' — injection defences are a compliance requirement 

- FCA Consumer Duty: AI systems giving financial advice must be fit for purpose. Injected AI giving wrong advice = breach. 

- GDPR: injection causing data exfiltration = data breach requiring ICO notification within 72 hours 

- SR 11-7: model validation must include adversarial robustness testing 

###### G **TRADEOFFS** 

- Strict input validation vs. utility: over-aggressive filtering blocks legitimate use cases 

- Sandboxed tools vs. capability: limiting tool permissions reduces attack surface but also reduces what the agent can do 

- Logging richness vs. privacy: detailed injection attempt logs may contain customer data 

###### G **ALTERNATIVE APPROACHES** 

- Restrict to closed-domain only: LLM can only access pre-approved, internally produced content. Eliminates indirect injection surface but severely limits utility. 

- Constitutional AI approach: train model to refuse harmful instructions at the model level. Reduces but does not eliminate injection risk. 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 20 

- Deterministic rule-based systems: replace LLM with rule-based system for highest-risk decisions. No injection risk but no AI benefit. 

###### G **COMMON MISTAKES** 

- Treating prompt injection as a configuration problem rather than an architectural one 

- Only defending against known attack patterns — novel attacks bypass signature-based detection 

- Not testing injection defences with adversarial red team 

- Placing external content in privileged positions in the prompt 

- Not having a response validation layer — only validating inputs 

###### G **EXECUTIVE SUMMARY** 

_Prompt injection is to LLMs what SQL injection was to databases — the fundamental security risk of the technology. Defence requires a layered architecture: trust-tiered inputs, instruction hierarchy enforcement, output validation, and sandboxed tool execution. No single control is sufficient. Test quarterly with adversarial red teams. Log and monitor all injection attempts. In a regulated financial context, one successful injection causing a customer harm event is a regulatory incident._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw prompt injection threat model:** 

- Show data flow: User → LLM Gateway → Context Assembly → LLM → Output 

- Mark injection points at each stage 

- Add defence layers as horizontal bands across the flow 

- Show the trust hierarchy: System (red) → User (amber) → External (green = untrusted) 

###### **FOLLOW-UP CHALLENGE** 

I _An attacker embeds a prompt injection in a PDF that a customer submits for mortgage assessment. The LLM processes the PDF and approves the mortgage despite clear eligibility failures. Walk through your incident response._ 

I _How do you test your prompt injection defences without exposing production systems?_ 

###### **Q2   DISTINGUISHED   [Data Poisoning] [RAG Security] [Training Data] [Defence]** 

**_Your enterprise uses RAG (Retrieval-Augmented Generation) to answer customer queries using your knowledge base. How do you architect defences against data poisoning attacks on the RAG corpus?_** 

###### **PREPARATION HINTS** 

I _Ingestion pipeline validation_ 

I _Document provenance_ 

- I _Adversarial document detection_ 

I _Poisoning detection patterns_ 

I _Access controls on corpus_ 

###### G **BUSINESS PERSPECTIVE** 

A poisoned RAG corpus is more dangerous than a biased base model because it is silently modified after deployment. An attacker who can insert content into your knowledge base can cause the LLM to: 

- Give wrong regulatory advice to customers 

- Provide incorrect financial information 

- Recommend fraudulent products 

- Exfiltrate information from the context window 

- The attack is persistent — the poison stays in the knowledge base until explicitly removed 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **RAG security architecture:** 

###### **Ingestion Pipeline Controls:** 

- Source authentication: only accept documents from authenticated, authorised sources 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 21 

- Document provenance chain: every document in the corpus has a verifiable provenance record (who created it, when, via what process) 

- Pre-ingestion scanning: scan every document for injection patterns before embedding 

- Dual-approval ingestion: high-risk knowledge base domains require two approvals before content is embedded 

###### **Corpus Integrity:** 

- Immutable audit log: every document insertion, modification, and deletion recorded in tamper-evident log 

- Cryptographic signing: document hash stored at ingestion. Detect any post-ingestion modifications. 

- Access control: knowledge base segments with different trust levels — internal policy docs (high trust) vs. external web content (zero trust) — never mixed in the same retrieval pool 

###### **Retrieval-Time Controls:** 

- Retrieved chunk validation: before inserting retrieved content into prompt, validate chunk against provenance record 

- Source credibility scoring: weight retrieval results by source authority and recency 

- Retrieval diversity: retrieve from multiple independent sources; if sources disagree, flag for human review 

###### G **SECURITY PERSPECTIVE** 

###### **Specific poisoning attack patterns:** 

- Authority hijacking: attacker injects document that mimics official company policy 

- Gradual drift: small poisoning over many documents that gradually shifts model behaviour 

- Context poisoning: inject content that activates only for specific trigger queries 

- Citation poisoning: inject content designed to appear as a citation from a trusted source 

###### **Detection mechanisms:** 

- Consistency checking: compare LLM answers against non-RAG baseline. Significant deviation triggers review. 

- Canary queries: known-answer queries run periodically. If LLM gives wrong answer, corpus may be poisoned. 

- Human review sampling: 1-5% of RAG responses reviewed by human expert for quality and accuracy 

###### G **OPERATIONAL PERSPECTIVE** 

- **Corpus maintenance:** 

- Regular review cycle: high-risk knowledge base domains reviewed quarterly for accuracy 

- Poisoning response playbook: if poisoning detected — quarantine suspect content, audit recent responses, notify affected customers if required 

- Rollback capability: ability to restore corpus to a known-good state from point-in-time snapshot 

- G **FINANCIAL PERSPECTIVE** 

###### **Poisoning impact quantification:** 

   - Wrong financial advice to customers: regulatory liability + remediation cost + reputational damage 

   - Security monitoring cost: $100-200K/year for corpus integrity monitoring 

   - Prevention vs. detection: prevention controls (provenance, scanning) are cheaper than post-incident remediation 

- G **REGULATORY PERSPECTIVE** 

###### **Regulatory implications:** 

- EU AI Act: AI systems providing information in high-risk domains must be robust against adversarial attacks — corpus integrity is a compliance requirement 

- FCA: information given to customers must be accurate. Poisoned knowledge base causing wrong advice = regulatory breach. 

- GDPR: if poisoning causes exfiltration of personal data from the knowledge base, data breach notification required 

###### G **TRADEOFFS** 

- Open vs. curated corpus: open corpus (web-augmented) has more coverage but much higher poisoning surface; curated corpus is safer but has less coverage 

- Real-time ingestion vs. batch review: real-time ingestion of new content is useful but reduces review time; batch ingestion with review is safer 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 22 

###### G **ALTERNATIVE APPROACHES** 

- No external content: only use internally produced, reviewed content in RAG corpus. Eliminates external poisoning risk but severely limits knowledge coverage. 

- Human-curated knowledge base only: all knowledge base content human-reviewed before embedding. Very safe but very slow to update. 

###### G **COMMON MISTAKES** 

- Treating RAG corpus as static and therefore not needing ongoing security 

- Not having a provenance chain for every document in the corpus 

- Mixing high-trust and zero-trust content in the same retrieval pool 

- Not monitoring for corpus drift and poisoning with canary queries 

###### G **EXECUTIVE SUMMARY** 

_RAG corpus poisoning is the supply chain attack of AI systems. Defence requires: authenticated ingestion with provenance chains, cryptographic integrity of corpus content, retrieval-time validation, and ongoing monitoring with canary queries. Design the corpus as you would design a database of authoritative facts — access control, integrity checking, audit trail, and backup/restore capability are all required._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw RAG architecture with security overlays:** 

- Ingestion pipeline (left) → Corpus (centre) → Retrieval (right) → LLM context 

- Add security controls at each stage as coloured overlays 

- Show trust levels for different corpus segments 

###### **FOLLOW-UP CHALLENGE** 

I _You discover that a third-party document ingestion vendor has been inserting subtly incorrect financial data into your knowledge base for 3 months. How do you assess the scope of impact and communicate to customers?_ 

###### **Q3   PRINCIPAL   [Model Theft] [IP Protection] [Watermarking] [Access Control]** 

#### **_Your company has invested $10M fine-tuning a proprietary LLM for financial services. How do you architect protection against model theft and model extraction attacks?_** 

###### **PREPARATION HINTS** 

I _Model watermarking_ 

I _API rate limiting_ I _Output perturbation_ I _Query monitoring_ 

I _Membership inference defence_ 

###### G **BUSINESS PERSPECTIVE** 

A fine-tuned model on proprietary financial data represents significant competitive IP: 

- Data advantage: years of domain-specific training data (transaction patterns, credit decisions, compliance knowledge) that competitors cannot easily replicate 

- Model IP: the fine-tuned weights embody the organisation's domain knowledge 

- Attack vectors: model extraction (recreating the model by querying the API), direct model theft (exfiltrating model weights from storage) 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Model protection architecture:** 

###### **Access Control:** 

- Model weights stored in encrypted model registry (Azure ML, SageMaker Model Registry) with HSM-protected encryption keys 

- Inference access via API only — model weights never accessible to application code 

- API authentication: all inference requests require service authentication with short-lived tokens 

- Fine-grained authorisation: different model capabilities accessible to different client tiers 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 23 

###### **Model Watermarking:** 

- Embed cryptographic watermarks in model outputs — detectable signatures that prove model provenance 

- Watermark at inference: subtle statistical patterns in outputs that are detectable with the right key but imperceptible to users 

- Canary outputs: small percentage of queries return slightly modified outputs — if these appear in a competitor's model, proves extraction 

###### **Extraction Attack Prevention:** 

- Rate limiting: limit queries per API key per hour — model extraction requires millions of queries 

- Query diversity monitoring: extraction attacks have characteristic query patterns (systematic coverage of input space) 

- Output perturbation: add calibrated noise to outputs — imperceptible to legitimate users but degrades extraction quality 

- Minimum viable response: return only the information the application needs — not full model logits or confidence scores 

###### G **SECURITY PERSPECTIVE** 

###### **Threat model:** 

- External extraction: attacker with API access systematically queries model to train a copy. Counter: rate limiting, query monitoring, output perturbation. 

- Insider theft: malicious employee exports model weights. Counter: access control, DLP, audit logging of all model access. 

- Supply chain: model weights intercepted in transit between registry and inference server. Counter: encrypted storage, TLS in transit, container signing. 

- Membership inference: attacker queries model to determine if specific data was in training set. Counter: differential privacy training techniques. 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Monitoring for extraction attempts:** 

- Anomaly detection on query patterns: unusually systematic or high-volume queries from a single API key 

- Semantic similarity clustering: if queries are exploring the input space systematically, flag for review 

- Automated response: suspicious API key automatically rate-limited and flagged for human review 

- Legal evidence preservation: all suspicious query logs preserved for potential IP litigation 

###### G **FINANCIAL PERSPECTIVE** 

###### **Protection investment vs. model value:** 

- Model value: $10M development cost + ongoing competitive advantage 

- Protection cost: $50-200K/year for comprehensive model IP protection 

- Detection capability: watermarking enables detection of stolen model in competitor products — enables IP litigation 

- Insurance: cyber insurance policies increasingly cover AI IP theft — proper controls may be required for coverage 

###### G **REGULATORY PERSPECTIVE** 

###### **IP and data protection regulations:** 

- GDPR: if training data includes personal data, membership inference attacks could reveal whether specific individuals' data was used 

- Trade secrets law: model weights may qualify as trade secrets — documented protection measures strengthen legal claims 

- AI Act: providers of GPAI models must maintain technical documentation — protection of this documentation is an IP concern 

###### G **TRADEOFFS** 

- Perturbation vs. utility: output perturbation degrades extraction quality but may also reduce legitimate application quality 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 24 

- Rate limiting vs. high-volume legitimate use: rate limits that prevent extraction may also impact legitimate high-volume applications 

- Opacity vs. transparency: hiding confidence scores protects against extraction but may reduce application quality 

###### G **ALTERNATIVE APPROACHES** 

- On-premises only deployment: model never accessible via external API. Eliminates API-based extraction but severely limits deployment flexibility. 

- Model distillation as deliberate strategy: produce a smaller, less capable public model. Competition can copy the public model; they cannot access the full model. 

- Federated inference: model weights never leave secure enclave. Applications interact via API with model that runs inside trusted hardware. 

###### G **COMMON MISTAKES** 

- Treating model weights like ordinary application code — they require stronger access controls 

- Not monitoring for extraction attack patterns — detection is impossible without logging 

- Publishing full confidence scores and logits in API responses — this is valuable for extraction attacks 

- Not having a legal strategy alongside the technical strategy — watermarks are only valuable if you can enforce them 

###### G **EXECUTIVE SUMMARY** 

_A proprietary fine-tuned model is a competitive asset requiring IP protection equivalent to other trade secrets. Protection architecture: encrypted storage with HSM keys, API-only access with rate limiting and monitoring, output watermarking for detection, and query anomaly detection. The goal is not to make extraction impossible — it is to make it expensive, slow, and detectable. When extraction is detected, watermarking provides evidence for IP litigation._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw model access architecture:** 

- Model weights in encrypted registry (core) 

- Inference server as the only access point 

- API gateway with rate limiting and authentication 

- Query monitoring and anomaly detection layer 

- Show what external parties can and cannot access 

###### **FOLLOW-UP CHALLENGE** 

I _Your model watermarking detects a 70% match with a competitor's newly released product. Walk through your response._ 

I _How do you balance model protection with the need to provide developers access for integration testing?_ 

###### **Q4   DISTINGUISHED   [Agent Abuse] [Tool Exploitation] [Agentic Security] [OWASP]** 

**_Design a security architecture for an enterprise agentic system where AI agents can execute code, query databases, call external APIs, and manage cloud infrastructure. How do you prevent agent abuse and tool exploitation?_** 

###### **PREPARATION HINTS** 

I _Minimal privilege per agent_ 

I _Tool call validation_ 

I _Human-in-the-loop gates_ 

I _Agent identity_ 

- I _Blast radius limits_ 

- I _OWASP Top 10 for LLM Agents_ 

###### G **BUSINESS PERSPECTIVE** 

Agentic systems are qualitatively more dangerous than chatbots because they can take real-world actions with real-world consequences: 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 25 

- Code execution agents: can deploy malware, exfiltrate data, modify production systems 

- Database agents: can read, modify, or delete customer data 

- Cloud management agents: can provision infrastructure for cryptomining, delete production resources 

- API-calling agents: can initiate payments, create accounts, modify customer records 

- The threat model is not just external attackers — it includes the AI itself being manipulated through prompt injection or simply making mistakes with real consequences 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Agentic security architecture — defence in depth:** 

###### **Agent Identity and Authorisation:** 

- Each agent has a unique SPIFFE/SPIRE-issued identity (SVID) 

- Agent identity maps to minimal permission set — never more than the specific tools needed for the specific task 

- Agent permissions granted as JIT (Just-In-Time) for the duration of a task, not persistent 

- No agent has production database write access by default — explicitly granted per-task 

###### **Tool Security:** 

- Tool registry: every tool the agent ecosystem can call is registered with: owner, risk level, required permissions, rate limits 

- Tool call validation: every tool call validates that the calling agent has permission for that specific tool + that specific argument 

- Read before write: agents must explicitly request write permissions — read-only is the default 

- Dangerous tool confirmation: tools classified as 'dangerous' (delete, transfer, deploy) require human approval regardless of agent authorisation level 

###### **Blast Radius Limitation:** 

- Each agent task launched with explicit scope limits: max API calls, max data volume, max cloud resource creation, max spend 

- Hard stops at scope limits — agent task suspended, not silently continued 

- Rollback capability: for infrastructure changes, agents must use reversible operations or maintain rollback snapshots 

###### G **SECURITY PERSPECTIVE** 

###### **OWASP Top 10 for LLM Agents and mitigations:** 

1. Insecure output handling: agent outputs treated as untrusted — validate before acting on 

2. Excessive agency: agents given more permissions than needed — minimal privilege enforcement 

3. Plugin/tool vulnerabilities: vulnerable tools can be exploited — tool security review required 

4. Sensitive information disclosure: agents can be prompted to reveal system information — output filtering 

5. Insecure code execution: code agents can be manipulated to run malicious code — sandboxed execution environment 

6. SSRF via tool calls: agents calling internal services they shouldn't — network egress controls on agent execution environment 

7. Prompt injection via tool responses: tool responses can contain injections — tool response sanitisation 

8. Insufficient logging: agent actions not fully audited — comprehensive action logging 

9. Denial of service: agent loops consuming resources — task budget limits and circuit breakers 

10. Unsafe deserialization in tool calls: malicious serialised objects in tool arguments — input validation 

- G **OPERATIONAL PERSPECTIVE** 

###### **Monitoring and incident response for agents:** 

- Agent action ledger: immutable, tamper-evident log of every agent action (tool called, arguments, result, user context) 

- Real-time anomaly detection: alert if agent deviates from established behaviour patterns 

- Kill switch: disable all agents globally in under 60 seconds — tested monthly 

- Post-task review: human review of agent action ledger for high-risk task categories 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 26 

###### G **FINANCIAL PERSPECTIVE** 

###### **Cost of agent abuse incidents:** 

- Cryptomining via exploited cloud management agent: $100K+ per incident in cloud bill before detection 

- Data exfiltration via database agent: regulatory fine + remediation + customer notification 

- Autonomous payment agent manipulation: direct financial loss 

- Security cost: agent security controls add $200-500K/year — justified by first incident prevention 

###### G **REGULATORY PERSPECTIVE** 

###### **Regulatory requirements for agentic systems:** 

- EU AI Act: agentic AI in high-risk domains requires conformity assessment, human oversight, and audit trails 

- GDPR: agents processing personal data must have legal basis, minimal access, and audit trail 

- DORA: agents operating in critical financial functions must have resilience and security controls equivalent to the function they support 

- Financial regulations: autonomous financial transactions require specific controls (payments authorisation frameworks) 

###### G **TRADEOFFS** 

- Capability vs. security: more restricted agents are safer but less capable. Business must decide what capability is worth what risk level. 

- Speed vs. oversight: human approval gates make dangerous operations safer but add latency. For time-sensitive operations, this is a real cost. 

- Autonomy vs. trust: the more autonomous the agent, the harder it is to maintain human trust in the system 

###### G **ALTERNATIVE APPROACHES** 

- No agentic systems: use AI for analysis and recommendation only — humans execute all actions. Maximally safe but loses automation benefits. 

- Restricted tool set only: agents can only call pre-approved, low-risk tools. Limits attack surface but also limits capability. 

- Air-gapped agents: agents run in completely isolated environment with no external connectivity. Only processed results leave the environment. 

###### G **COMMON MISTAKES** 

- Giving agents production access from day one — always start with read-only, earn write access gradually 

- Not having a kill switch — when something goes wrong, you need immediate stop capability 

- Logging what agents decided but not what they actually did — the action log is more important than the reasoning log 

- Not testing agent behaviour under adversarial conditions before production deployment 

- Assuming prompt injection cannot affect your agents because 'they don't process external content' — they almost certainly do 

###### G **EXECUTIVE SUMMARY** 

_Agentic systems represent a step-change in security risk compared to chatbots — they can take real-world irreversible actions. Security architecture requires: agent identity with minimal JIT permissions, tool-level authorisation, blast radius limits on every task, human approval gates for dangerous operations, and comprehensive immutable action logging. The security model should treat every agent as a potentially compromised process — what is the worst it can do? That determines the permission level it should have._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw agent security architecture:** 

- Agent at centre, surrounded by permission shell (what it can access) 

- Tool registry on the right with risk tiers (green/amber/red) 

- Human approval gate in the flow for red-tier tools 

- Action ledger at the bottom receiving all action logs 

- Show: injection attack vector and where it is blocked 

###### **FOLLOW-UP CHALLENGE** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 27 

I _An agent autonomously deleted a production database table because it misinterpreted an instruction. Walk through your incident response and architectural remediation._ 

I _How do you implement security for a multi-agent system where Agent A orchestrates Agents B, C, and D?_ 

###### **Q5   PRINCIPAL   [AI Security] [Supply Chain] [Model Integrity] [Adversarial ML]** 

**_What is your threat model for the AI system supply chain — from training data through to production inference? Map the key attack vectors and architectural mitigations._** 

###### **PREPARATION HINTS** 

- I _Training data integrity_ 

- I _Model weight integrity_ 

- I _Container signing_ 

I _Dependency scanning_ 

I _Inference environment isolation_ 

###### G **BUSINESS PERSPECTIVE** 

- The AI supply chain has more attack surface than traditional software supply chains because it includes novel attack vectors: 

- Training data poisoning: attack the data before training 

- Model architecture attacks: backdoor behaviour coded into model structure 

- Weight tampering: modify model weights in storage or transit 

- Inference environment compromise: attack the server running the model 

- Prompt injection via input: attack at inference time 

Each link in the chain is a potential attack point that traditional software security does not address. 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **AI Supply Chain security architecture by stage:** 

###### **Training Data Security:** 

- Provenance: every training dataset has documented source, collection method, and processing pipeline 

- Integrity: cryptographic hash of training dataset stored in immutable record before training begins 

- Access control: training data access restricted to training pipeline service accounts — no human access to raw training data 

- Anomaly detection on training data: statistical checks for distribution anomalies that may indicate poisoning 

###### **Model Training Security:** 

- Reproducible training: deterministic training pipelines with pinned dependencies — same inputs must produce same model 

- Training environment isolation: training infrastructure separated from production — no internet egress during training 

- Gradient monitoring: monitor training loss curves for anomalous behaviour that may indicate data poisoning 

###### **Model Packaging and Registry:** 

- Model signing: trained model weights cryptographically signed by training pipeline 

- Registry security: model registry access via service accounts with MFA for human access 

- Vulnerability scanning: scan model container images for CVEs before deployment 

- Model card: every model published with: architecture, training data, evaluation metrics, known limitations, intended use 

###### **Deployment and Inference:** 

- Container signing: inference container image signed and signature verified before deployment 

- Network isolation: inference servers in isolated network segment — no access to training data stores 

- Runtime protection: adversarial input detection at inference time 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 28 

###### G **SECURITY PERSPECTIVE** 

###### **Specific threat-mitigation mapping:** 

- Data poisoning → training data provenance + integrity hashing + anomaly detection 

- Backdoor implantation → reproducible training + training environment isolation + model evaluation 

- Weight tampering → model signing + registry access control + signature verification at deployment 

- Container compromise → container signing + vulnerability scanning + runtime protection 

- Prompt injection → input validation + instruction hierarchy + output filtering 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Supply chain monitoring:** 

- Continuous training data monitoring: statistical drift detection on training datasets 

- Model performance monitoring: production performance compared against validation benchmark — unexpected degradation triggers review 

- Dependency vulnerability scanning: all ML framework dependencies (PyTorch, Hugging Face) monitored for CVEs 

###### G **FINANCIAL PERSPECTIVE** 

###### **Supply chain compromise cost vs. protection cost:** 

- Supply chain compromise can result in: biased model (regulatory action), backdoored model (fraud losses), performance degradation (customer experience) 

- Protection cost: 10-15% overhead on AI development pipeline cost 

- ROI: one prevented supply chain compromise justifies years of security investment 

###### G **REGULATORY PERSPECTIVE** 

EU AI Act Article 9 requires risk management including 'known or reasonably foreseeable risks' — AI supply chain attacks are foreseeable and must be addressed in the risk management system. 

###### G **TRADEOFFS** 

- Reproducibility vs. performance: some model performance improvements come from non-deterministic training. Reproducibility requirement may limit some optimisation techniques. 

- Open-source models vs. provenance: using open-source foundation models provides cost benefits but provenance of training data is opaque. 

###### G **ALTERNATIVE APPROACHES** 

- Build vs. download: train models from scratch with fully controlled training data rather than fine-tuning open-source models. Maximum control but maximum cost. 

- Hardware-secured inference: run inference inside trusted execution environments (Intel TDX, AMD SEV). Prevents inference environment compromise. 

###### G **COMMON MISTAKES** 

- Securing only the inference endpoint and ignoring the training pipeline 

- Not having a model card or provenance record for every production model 

- Treating model weights like a deployment artefact rather than a sensitive IP asset 

- Not scanning model container images for vulnerabilities before deployment 

###### G **EXECUTIVE SUMMARY** 

_The AI supply chain threat model extends from data collection through training, packaging, and inference. Each stage has distinct attack vectors requiring distinct controls. The key principle: cryptographic integrity checks at every handoff point — training data hash before training, model signing after training, container signing before deployment, signature verification before inference. Monitor continuously for signs of supply chain compromise in production._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw the AI supply chain as a horizontal pipeline:** 

- Stages: Data → Training → Model Registry → Container → Inference 

- Attack vectors as lightning bolt icons at each stage 

- Security controls as shield icons at each stage 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 29 

- Show the integrity chain: each stage cryptographically verifies the previous 

###### **FOLLOW-UP CHALLENGE** 

I _A security scan reveals that a Hugging Face model your team fine-tuned from contains a backdoor trigger. How do you assess impact and respond?_ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 30 

###### **SECTION 20** 

## **AI IDENTITY — AUTHENTICATION & AUTHORISATION** 

[ Agent Identities ] [ Delegated Access ] [ User-Context Propagation ] [ Token Boundaries ] [ NHI Governance ] 

_AI identity is a rapidly emerging specialism. Most candidates can describe OAuth2 and OIDC for human users. Few can design agent identity at 10,000-agent scale, implement RFC 8693 token exchange correctly, or describe JIT scoping for agent workloads. These are the questions that separate Principal from Distinguished._ 

###### **Q1   DISTINGUISHED   [Agent Identity] [SPIFFE] [Scale] [Workload Identity]** 

**_Design an agent identity architecture for an enterprise deploying 10,000 AI agents across cloud and on-premises infrastructure. How do you issue, manage, and revoke agent identities at this scale?_** 

###### **PREPARATION HINTS** 

- I _SPIFFE/SPIRE_ 

- I _Short-lived SVIDs_ 

- I _Agent identity lifecycle_ 

- I _Workload attestation_ 

- I _Identity federation across environments_ 

###### G **BUSINESS PERSPECTIVE** 

10,000 agents without identity management is 10,000 anonymous processes with elevated permissions. When an agent is compromised, you cannot identify which one, what it did, or whether others are compromised. 

- Every agent must have a unique, verifiable, revocable identity 

- Agent identity enables: authorisation (what this agent is permitted to do), attribution (which agent took this action), and revocation (remove an agent's permissions instantly without affecting others) 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Agent Identity Architecture using SPIFFE/SPIRE:** 

###### **SPIFFE ID Design:** 

- Every agent gets a SPIFFE Verifiable Identity Document (SVID) at startup 

- SVID format: spiffe://enterprise.com/agent/{agent-type}/{instance-id} 

- Agent types: spiffe://enterprise.com/agent/credit-risk/{uuid} 

- SVIDs are short-lived (1-4 hours) — must be rotated automatically 

- No persistent credentials stored in agent code or configuration 

###### **SPIRE Architecture at Scale:** 

- SPIRE server cluster (3 nodes for HA) per major deployment region 

- SPIRE agents on every node where AI agents execute 

- Workload attestation: SPIRE attests workload identity using: Kubernetes service account, AWS EC2 instance identity, hardware TPM 

- Global SPIRE federation: agents in cloud and on-premises get identities that are mutually trusted via OIDC federation 

###### **Identity Lifecycle:** 

- Provisioning: agent identity created in agent registry before deployment 

- Issuance: SPIRE issues SVID at workload attestation 

- Rotation: SVID rotated automatically 5 minutes before expiry — no downtime 

- Revocation: remove SPIFFE entry from SPIRE → next SVID rotation fails → agent loses all access within hours 

- Emergency revocation: SVID TTL set to 15 minutes for high-risk agents — compromise window is limited 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 31 

###### G **SECURITY PERSPECTIVE** 

###### **Identity security controls:** 

- No static credentials: no agent has an API key, password, or long-lived token — only short-lived X.509 SVIDs 

- Minimal privilege: agent identity maps to minimal permission set — credit risk agent cannot access customer PII unless task explicitly requires it 

- Cross-agent authorisation: when Agent A needs to call Agent B, A presents its SVID as mTLS client certificate — B verifies A's identity and authorises the call 

- Lateral movement prevention: agent identities are typed (credit-risk-agent cannot impersonate data-retrieval-agent even if compromised) 

- Anomaly detection: alert if the same agent identity appears simultaneously in geographically distant locations 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Agent identity operations at 10K scale:** 

- Automated issuance: zero human involvement in normal SVID issuance lifecycle 

- Fleet visibility: agent identity dashboard showing all active agent identities, their last attestation, and SVID expiry 

- Audit trail: every SVID issuance and use logged in immutable audit store 

- Health monitoring: alert if agent SVID rotation fails — indicates potential agent compromise or configuration issue 

###### G **FINANCIAL PERSPECTIVE** 

###### **Cost of agent identity management at scale:** 

- SPIRE infrastructure: minimal — 6-node SPIRE cluster handles millions of SVIDs 

- Operational cost: zero human intervention in normal operation — automation eliminates operational overhead 

- Security value: every minute of compromise detection time saved is worth thousands in incident cost reduction 

- Without identity: if an agent is compromised without identity management, blast radius is the entire permission set — with identity, blast radius is limited to one agent's minimal permissions 

###### G **REGULATORY PERSPECTIVE** 

###### **Regulatory requirements for agent identity:** 

- DORA: 'access management' requirements apply to AI agents — they must have identities, not anonymous permissions 

- EU AI Act: high-risk AI systems require audit trails — agent identity is a prerequisite for attributing actions to specific agents 

- PCI-DSS: payment-adjacent agents must have unique identifiers with access logging 

- ISO 27001: access control requirements apply to non-human identities 

###### G **TRADEOFFS** 

- Short SVID TTL vs. operational complexity: 15-minute SVIDs limit compromise window but increase rotation frequency. 4-hour SVIDs are simpler but expose a longer compromise window. 

- Centralised SPIRE vs. federated: centralised SPIRE simplifies management but is a single point of failure; federated SPIRE is more resilient but more complex. 

###### G **ALTERNATIVE APPROACHES** 

- Service account tokens: use Kubernetes service accounts as agent identity. Simpler but less granular, longer-lived, and less portable. 

- IAM role-based identity: cloud IAM roles as agent identity (AWS IAM, Azure Managed Identity). Works well within a single cloud but hard to federate across clouds and on-premises. 

###### G **COMMON MISTAKES** 

- Sharing service accounts across multiple agents — one compromised agent exposes all agents 

- Using long-lived static credentials (API keys) instead of short-lived SVIDs 

- Not having an emergency revocation procedure — when you need it, you need it in under 5 minutes 

- Not logging SVID issuance and use — impossible to investigate incidents without this trail 

###### G **EXECUTIVE SUMMARY** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 32 

_10,000 AI agents without individual identities is an unmanageable security risk. SPIFFE/SPIRE provides the standard-based architecture for workload identity at scale: every agent gets a unique, short-lived, automatically-rotating SVID. Identity enables three critical security properties: minimal-privilege authorisation per agent, attribution of every action to a specific agent, and instant revocation when compromise is detected. This is non-negotiable for enterprise-scale agentic deployment._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw SPIRE architecture:** 

- SPIRE server cluster (centre) 

- SPIRE agents on nodes (distributed) 

- AI agents on each node requesting SVIDs 

- Show SVID lifecycle: request → attestation → issuance → rotation → revocation 

- Show mTLS connection between agents using SVIDs 

###### **FOLLOW-UP CHALLENGE** 

I _Agent SVID rotation is failing for 200 agents in your London data centre. Walk through your diagnosis and response._ 

I _How do you handle agent identity when agents are spawned dynamically and can number in the millions during peak periods?_ 

###### **Q2   DISTINGUISHED   [Delegated Access] [OAuth2] [On-Behalf-Of] [Multi-hop]** 

**_An AI agent acts on behalf of a user across multiple downstream services. How do you propagate user context through a multi-hop agent call chain while maintaining minimal privilege at each hop?_** 

###### **PREPARATION HINTS** 

I _OAuth2 On-Behalf-Of (OBO) flow_ 

- I _RFC 8693 Token Exchange_ 

I _Actor claims_ 

I _Audience restriction_ 

I _Delegation chain depth limits_ 

###### G **BUSINESS PERSPECTIVE** 

An agent acting 'on behalf of' a user must carry the user's authorisation claims through every service it calls: 

- Without delegation: agent uses its own identity (system account) → every service sees a system call, not a user call → audit trail shows the agent, not the user → regulatory accountability is lost 

- With delegation: agent carries a token that says 'agent X is acting for user Y' → every downstream service can enforce user-level permissions → audit trail shows both agent and user 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **OAuth2 On-Behalf-Of (OBO) / RFC 8693 Token Exchange pattern:** 

###### **Step 1 — User Token:** 

- User authenticates and receives an access token: {sub: user-id, scope: 'credit:read', aud: 'api.enterprise.com'} 

###### **Step 2 — Agent Receives User Token:** 

- User initiates agent task, presenting their token 

- Agent validates the token (signature, expiry, audience) 

###### **Step 3 — Token Exchange (RFC 8693):** 

- Agent calls token exchange endpoint with: subject_token (user's token), actor_token (agent's SVID), requested_scope (minimal scope needed for the task) 

- Token exchange service validates: user token is valid; agent identity is authorised to act as a delegated actor; requested scope does not exceed user's original scope 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 33 

- Returns: delegated token with actor claim: {sub: user-id, act: {sub: agent-id}, scope: 'credit:read', aud: 'credit-service.enterprise.com'} 

###### **Step 4 — Multi-hop Delegation:** 

- If Agent A calls Agent B which calls Service C: 

- Each hop performs a new token exchange 

- Each token is audience-restricted to the specific downstream service 

- Delegation chain depth is limited (max 3 hops) to prevent privilege escalation chains 

- Each hop adds its actor claim: {sub: user, act: {sub: agent-b, act: {sub: agent-a}}} 

###### G **SECURITY PERSPECTIVE** 

###### **Security properties of the delegation chain:** 

- Scope cannot increase: each token exchange can only request scope equal to or less than the user's original scope 

- Audience restriction: each token is valid only for the specific downstream service — a token for credit-service cannot be used to call payment-service 

- Short TTL: delegated tokens have shorter TTL than user tokens — typically 5-15 minutes 

- Delegation depth limit: maximum 3 hops — prevents infinite delegation chains that could be used for privilege escalation 

- Audit trail: every token exchange logged with: requesting agent, user, scope requested, scope granted, downstream service 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Token exchange infrastructure:** 

   - Token exchange service must be highly available — it is in the critical path for all agent operations 

   - Caching: tokens can be cached for their TTL minus 1 minute to reduce token exchange load 

   - Monitoring: alert if token exchange failure rate exceeds 0.1% — may indicate misconfiguration or attack 

- G **FINANCIAL PERSPECTIVE** 

###### **Implementation cost vs. regulatory value:** 

   - Token exchange service: modest infrastructure cost 

   - Development overhead: token exchange adds 1-3 API calls per agent task — acceptable latency overhead 

   - Compliance value: without proper delegation chain, regulated use cases (credit decisions, customer advice) cannot be deployed — the business value unlocked exceeds the implementation cost 

- G **REGULATORY PERSPECTIVE** 

###### **Regulatory requirements for delegation:** 

- GDPR Article 5: personal data processing must have a legal basis that applies to the actual human user — agent acting as a system account loses this linkage 

- Financial regulations: customer-facing AI decisions must be traceable to the specific customer and the authorised context in which they occurred 

- SR 11-7: model actions in credit decisions must be attributable and auditable at the customer level 

###### G **TRADEOFFS** 

- Security vs. performance: multi-hop token exchange adds latency. For time-sensitive operations, token caching is required. 

- Delegation depth vs. capability: limiting delegation depth (max 3 hops) prevents complex agent architectures but also prevents certain attack patterns. 

###### G **ALTERNATIVE APPROACHES** 

- System account delegation: agent uses a shared system account with all necessary permissions. Simpler but loses user-level attribution and violates minimal privilege. 

- SAML assertion delegation: SAML-based identity propagation. Older standard, less suitable for modern microservices and agent architectures. 

###### G **COMMON MISTAKES** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 34 

- Not restricting token audience at each hop — a token valid for all services is a credential that, if stolen, accesses everything 

- Not limiting delegation depth — infinite chains are vulnerable to privilege escalation 

- Caching delegated tokens across different users — user A's delegated token must never be served to a request from user B 

- Not logging token exchange events — makes post-incident investigation impossible 

###### G **EXECUTIVE SUMMARY** 

_User context propagation in multi-hop agent chains requires a formal delegation protocol. OAuth2 RFC 8693 Token Exchange provides the standard: each agent hop performs a token exchange, creating an audience-restricted, minimal-scope, short-lived delegated token that carries both user and agent identity in the actor claim. This maintains user-level accountability through every service call while enforcing the principle that an agent can never exceed the permissions of the user it serves._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw delegation chain:** 

- User → Agent A → Agent B → Service C 

- At each hop: show the token exchange call and the resulting delegated token 

- Show actor claims accumulating: {sub: user, act: {sub: B, act: {sub: A}}} 

- Show audience restriction: each token only valid for next hop's audience 

###### **FOLLOW-UP CHALLENGE** 

I _How do you handle delegation when the downstream service does not support RFC 8693 token exchange — for example, a legacy mainframe service?_ 

I _An audit reveals that agent tokens are being cached across users for performance reasons. Walk through your remediation._ 

###### **Q3   PRINCIPAL   [Token Boundaries] [JIT Access] [Scope Minimisation] [Agent Authorisation]** 

#### **_How do you implement Just-In-Time (JIT) token scoping for AI agents to ensure they never hold more permissions than the current task requires?_** 

###### **PREPARATION HINTS** 

- I _JIT access provisioning_ 

- I _Task-scoped tokens_ 

- I _Scope request at task start_ 

- I _Automatic scope expiry_ 

- I _Scope audit trail_ 

###### G **BUSINESS PERSPECTIVE** 

Standing permissions (persistent agent access to all permitted resources) violate minimal privilege: 

- An agent with persistent read/write access to the customer database holds that access 24/7, even when it is idle 

- If the agent is compromised while idle, the attacker has persistent database access 

- JIT scoping: agent holds only the permissions needed for the specific task it is currently executing — nothing more 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **JIT Scope Architecture:** 

###### **Task Registry:** 

- Every agent task type defined in the task registry with: required tool set, required data scopes, required API permissions, maximum duration 

- Example: 'credit-assessment' task requires: customer:read, credit-bureau:read, internal-risk-model:invoke — nothing else 

###### **Scope Request at Task Start:** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 35 

- When agent starts a task, it calls the authorisation service with: agent-identity (SVID), task-type, user-context (delegated token) 

- Authorisation service validates: agent is authorised for this task type; user context permits this task 

- Issues task-scoped token: valid for the specific task's required scopes, expires at task deadline (maximum 30 minutes) 

###### **Scope Enforcement:** 

- Every tool call presents the task-scoped token 

- Tool rejects calls outside the token's granted scopes — even if the agent requests them 

- At task completion or timeout: token expires, agent loses all access 

###### **Audit Trail:** 

- Every scope grant logged: agent, task type, scopes granted, duration, user context 

- Every scope expiry logged 

- Scope usage within task: which scopes were actually used vs. granted? Unused scopes indicate over-provisioning. 

###### G **SECURITY PERSPECTIVE** 

###### **JIT security properties:** 

- Idle agent has zero standing permissions — no attack value 

- Compromise during a task: blast radius limited to the task's scope, which expires at task end 

- Scope creep detection: if an agent consistently requests scopes it never uses, reduce its permitted scope for that task type 

- Emergency revocation: revoke the task-scoped token without affecting the agent identity — agent can still work on other tasks 

###### G **OPERATIONAL PERSPECTIVE** 

###### **JIT operational considerations:** 

- Latency: scope request adds 10-50ms to task start time. Acceptable for most workflows. Not acceptable for sub-100ms latency-sensitive operations — use pre-computed scope bundles for these. 

- Token caching: task-scoped tokens can be reused within the same task session (same task ID) but not across tasks 

- Monitoring: dashboard showing active scope grants, expiry timeline, and scope utilisation 

###### G **FINANCIAL PERSPECTIVE** 

###### **JIT cost vs. benefit:** 

- Implementation: 1-3 months engineering for authorisation service + task registry 

- Runtime overhead: minimal — authorisation service is lightweight 

- Security benefit: standing permission elimination dramatically reduces compromise blast radius 

- Compliance benefit: JIT access is a best practice expectation for high-risk AI systems under EU AI Act and DORA 

###### G **REGULATORY PERSPECTIVE** 

DORA and banking regulations require 'access management' with 'need-to-know and least-privilege principles' — JIT scoping is the operational implementation of these principles for AI agents. 

###### G **TRADEOFFS** 

- Security vs. latency: JIT adds task-start latency. For time-sensitive operations, the tradeoff must be evaluated. 

- Granularity vs. complexity: very fine-grained scope definitions are more secure but harder to maintain. Start with task-level granularity. 

###### G **ALTERNATIVE APPROACHES** 

- Role-based persistent access: agents assigned to roles with persistent permissions. Simpler but not minimal privilege. 

- Attribute-based access control (ABAC): permissions derived from attributes of agent, task, and context — more flexible than JIT but more complex to implement correctly. 

###### G **COMMON MISTAKES** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 36 

- Implementing JIT for authorisation tokens but keeping long-lived API keys for tool access — the API keys remain the vulnerability 

- Not auditing which scopes are actually used — granted but unused scopes indicate over-provisioning 

- Setting task timeouts too long — a 4-hour task window is not meaningfully different from persistent access 

###### G **EXECUTIVE SUMMARY** 

_JIT scope minimisation is the implementation of minimal privilege for AI agents. The principle is simple: agents hold permissions only during the execution of a specific task and only the permissions that task requires._ 

_Implementation: a task registry defining required scopes per task type, a scope request at task start, task-scoped tokens with hard expiry, and audit logging of all scope grants and usage. An idle agent with zero permissions has zero attack value._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw JIT scoping flow:** 

- Timeline: Agent idle → Task start → Scope request → Task execution → Task end → Scope expiry 

- At task start: show scope request, authorisation check, token issuance 

- During task: show each tool call presenting scoped token 

- After task: show token expiry, agent returns to zero-permission state 

###### **FOLLOW-UP CHALLENGE** 

I _How do you handle a long-running agent task (8 hours) that requires JIT scoping without creating a 8-hour token window?_ 

###### **Q4   PRINCIPAL   [AI Identity] [Non-Human Identity] [Credential Management] [Lifecycle]** 

#### **_What are the unique challenges of managing non-human identity (NHI) for AI agents compared to human identities and traditional service accounts? How do you build an NHI governance programme?_** 

###### **PREPARATION HINTS** 

I _Scale and ephemerality_ 

- I _No password reset fallback_ 

I _Proliferation risk_ 

I _Orphaned accounts_ 

- I _Automated lifecycle management_ 

###### G **BUSINESS PERSPECTIVE** 

Non-human identities (NHIs) — AI agents, service accounts, API keys, certificates — outnumber human identities 45:1 in the average enterprise and are responsible for the majority of modern breaches. Unlike human identities, NHIs have no human to notice unusual behaviour and no natural lifecycle events (promotions, departures) that trigger access reviews. 

G **ARCHITECTURE PERSPECTIVE** 

###### **NHI Governance Architecture:** 

###### **Inventory and Discovery:** 

- NHI registry: every non-human identity catalogued with: owner, purpose, permissions, expiry, last-used date 

- Automated discovery: scanning cloud APIs, Kubernetes secrets, code repositories, CI/CD pipelines for undiscovered NHIs 

- Shadow NHI detection: API keys embedded in code, service accounts created without registration 

###### **Lifecycle Management:** 

- Creation: all NHI creation requires business justification, owner assignment, expiry date — no perpetual credentials 

- Rotation: all credentials rotated on schedule (certificates: annually; API keys: quarterly; service account tokens: monthly) 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 37 

- Deletion: automated deletion of NHIs associated with decommissioned services; orphan detection and cleanup workflow 

- Review: quarterly access review of all NHIs — owner confirms continued need 

###### **For AI Agents specifically:** 

- Ephemeral identity preferred: SPIFFE/SPIRE SVIDs (short-lived, auto-rotating) over static credentials 

- Agent identity tied to workload: not to the person who deployed the agent 

- Agent identity versioned: new model version → new identity (previous identity retired) 

- Identity reflects purpose: 'credit-risk-agent-v2.1' not 'service-account-001' 

###### G **SECURITY PERSPECTIVE** 

###### **NHI security controls:** 

- Secrets scanning: prevent credentials being committed to source code (GitGuardian, Trufflesecurity) 

- Vault-based secrets management: all credentials stored in secrets manager, injected at runtime — never in config files 

- Anomaly detection: alert on NHI accessing resources from unusual locations or at unusual times 

- Privilege review: quarterly review of NHI permissions against actual usage — remove unused permissions 

###### G **OPERATIONAL PERSPECTIVE** 

###### **NHI operational hygiene:** 

- Orphan hunting: identify NHIs with no activity in 90 days — disable, notify owner, delete after 30 days 

- Expiry management: automated notification to NHI owner 30 days before expiry — rotate or decommission 

- Rotation automation: credential rotation should be zero-touch — applications must handle credential rotation without restart 

###### G **FINANCIAL PERSPECTIVE** 

###### **NHI cost of poor governance:** 

- Average breach involving compromised credentials: $4.5M (IBM Cost of Data Breach 2024) 

- NHI governance programme cost: $200-500K/year at enterprise scale 

- ROI: one prevented credential compromise justifies programme 

###### G **REGULATORY PERSPECTIVE** 

###### **NHI regulatory context:** 

- DORA: 'access management' controls must apply to service accounts and automated processes — not just humans 

- PCI DSS Requirement 8: unique identifiers required for all system components — applies to AI agents 

- ISO 27001: access control policy applies to non-human entities 

###### G **TRADEOFFS** 

- Automation vs. oversight: fully automated NHI lifecycle is efficient but requires confidence in automation correctness. Human oversight adds review time. 

- Ephemeral vs. persistent: ephemeral credentials (SVIDs) are more secure but require all consuming systems to handle credential rotation. 

###### G **ALTERNATIVE APPROACHES** 

- Manual NHI management: human-managed spreadsheet of service accounts. Doesn't scale and consistently fails on rotation and deletion. 

- Cloud-native identity only: use cloud provider IAM (AWS IAM, Azure Managed Identity) as sole NHI mechanism. Simpler but not portable across clouds. 

###### G **COMMON MISTAKES** 

   - Not having an NHI inventory — you cannot govern what you cannot see 

   - Creating service accounts with no expiry date and no owner — orphan credentials accumulate over years 

   - Storing credentials in application configuration files or code repositories 

   - Not rotating credentials after team changes — former employees retain access via service accounts they created 

- G **EXECUTIVE SUMMARY** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 38 

_Non-human identity management is the most neglected aspect of enterprise identity programmes. The AI agent explosion is creating thousands of new NHIs with elevated permissions and no natural lifecycle management. An NHI governance programme requires: complete inventory with discovery automation, lifecycle management with mandatory owners and expiry dates, secrets management via vault (no credentials in code), rotation automation, and quarterly orphan cleanup. For AI agents specifically, ephemeral SPIFFE-based identity is the architectural standard._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw NHI lifecycle:** 

- Stages: Request → Provision → Active → Review → Rotate/Decommission 

- Show: owner assignment at creation, expiry enforcement, orphan detection after service decommission 

- Highlight the gaps where NHIs become abandoned (service decommission without NHI cleanup) 

###### **FOLLOW-UP CHALLENGE** 

I _A penetration test finds 400 service account credentials committed to your internal GitLab repositories across 50 teams. Design your remediation programme._ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 39 

###### **SECTION 21** 

## **AI GOVERNANCE — DEEP DIVE** 

[ Human-in-the-Loop ] [ Agent Approval Workflows ] [ AI Audit Trails ] [ AI Risk Frameworks ] [ Governance Build ] 

_AI governance is moving from ethics committees to hard regulatory requirement. SR 11-7, EU AI Act, DORA, and GDPR all have specific AI governance obligations. These questions test whether you can design governance that is operationally real — not policy documents._ 

###### **Q1   DISTINGUISHED   [AI Audit Trail] [SR 11-7] [EU AI Act] [DORA] [GDPR]** 

**_Design an AI audit trail architecture that simultaneously satisfies SR 11-7 (model risk management), EU AI Act (high-risk system traceability), DORA (operational resilience), and GDPR (automated decision-making) for a bank operating in US and EU._** 

###### **PREPARATION HINTS** 

- I _Single audit store vs. federated_ 

- I _Immutability requirements_ 

- I _PII in audit records_ 

- I _Query performance at scale_ 

- I _Retention policies by regulation_ 

###### G **BUSINESS PERSPECTIVE** 

A bank operating in both US and EU faces overlapping regulatory audit requirements. Designing separate audit trails for each regulation is inefficient and inconsistent. The business requirement is a single, unified audit architecture that satisfies all four frameworks simultaneously while remaining queryable by regulators in the relevant jurisdiction. 

- Regulatory examination cost: auditors querying inconsistent or incomplete audit trails triggers follow-up requests costing weeks of staff time 

- Customer disputes: ability to provide a complete audit trail of an AI decision is critical for resolving customer complaints and avoiding regulatory escalation 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Unified AI Audit Architecture:** 

###### **Audit Event Schema (common across all regulations):** 

- Event ID (unique, immutable) 

- Timestamp (nanosecond precision, signed) 

- AI System ID and version 

- Task type and risk classification 

- Input data fingerprint (hash of inputs, not raw data — preserves privacy) 

- Decision output and confidence 

- Model version that produced the decision 

- User/customer context (anonymised for GDPR, pseudonymised with reversible key for regulatory access) 

- Human override (if any, with reason) 

- Explanation summary (SHAP feature importance for structured models; chain-of-thought digest for LLMs) 

###### **Storage Architecture:** 

- Immutable append-only store: Apache Iceberg on S3 with Object Lock (WORM) or Apache Kafka with retention policies 

- Dual-region storage: US audit records in US regions (CFTC/Fed/OCC access), EU records in EU regions (ECB/FCA/ESMA access) 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 40 

• Data sovereignty: customer PII pseudonymised with jurisdiction-specific keys — EU regulator cannot access US customer PII and vice versa 

###### **Retention by regulation:** 

- SR 11-7: model validation records retained for model lifetime + 3 years 

- EU AI Act: high-risk AI system logs retained 10 years 

- DORA: ICT incident logs retained 5 years 

- GDPR: automated decision records retained for dispute window (typically 1-3 years, then deletion or anonymisation) 

- Implement tiered storage: recent records on fast storage for operational queries; older records on cold storage for regulatory examination 

###### G **SECURITY PERSPECTIVE** 

###### **Audit record integrity:** 

- Cryptographic signing: each audit record signed by the producing service at write time 

- Hash chaining: each record includes the hash of the previous record — tampering with one record invalidates all subsequent records 

- Access control: audit records are write-once, read by regulators and audit personnel only — no update or delete operations permitted 

- Regulator access: dedicated, logged, time-limited access for regulatory examinations — all regulator queries are themselves audited 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Audit infrastructure operations:** 

- Write performance: audit records must be written with <5ms overhead on the decision path — async write with durability guarantee 

- Query performance: regulators expect to retrieve all decisions for a customer or all decisions by a model version within minutes — requires appropriate indexing 

- Retention enforcement: automated deletion/anonymisation at retention expiry — requires policy engine with business calendar awareness 

###### G **FINANCIAL PERSPECTIVE** 

###### **Audit infrastructure cost:** 

- Storage at scale: 10 billion decisions/year at 2KB per record = 20TB/year — tiered storage cost is manageable ($50-200K/year at scale) 

- Query infrastructure: columnar storage (Iceberg/Parquet) enables efficient regulatory queries without full table scan 

- Cost of poor audit trail: regulatory examination finding a gap in audit trail can result in remediation requirements costing $10M+ and management time 

###### G **REGULATORY PERSPECTIVE** 

###### **Specific requirement mapping:** 

- SR 11-7 §IV.A: 'model documentation should explain... what the model is doing' — satisfied by explanation summary in every audit record 

- EU AI Act Article 13: 'technical documentation... sufficient to allow assessment of compliance' — satisfied by model version linking and decision logging 

- DORA: 'registers of information' on ICT operations — audit trail provides the operational log 

- GDPR Article 22(3): 'implement suitable measures to safeguard... rights' — human override capability and explanation access satisfy this 

###### G **TRADEOFFS** 

- Centralised vs. federated audit: centralised is simpler to query but creates data sovereignty complications. Federated satisfies sovereignty but requires cross-jurisdiction query capability. 

- Full input logging vs. hash-based: logging full inputs enables richer investigation but creates significant PII risk; hash-based logging satisfies integrity requirements without storing sensitive data. 

###### G **ALTERNATIVE APPROACHES** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 41 

- Regulation-specific audit trails: separate systems for each regulation. Satisfies each individually but creates inconsistency and duplication. 

- Blockchain-based audit: immutable by design, cryptographically verifiable. Operationally complex and expensive at scale. 

###### G **COMMON MISTAKES** 

- Logging decisions but not the model version that produced them — makes it impossible to reproduce or validate historical decisions 

- Storing raw customer PII in audit records without encryption — creates a GDPR liability 

- Not testing regulatory query performance — finding out it takes 8 hours to produce a customer audit trail during a regulatory examination is too late 

- Not including human override records in the audit trail — regulators care about when and why humans overrode AI decisions 

###### G **EXECUTIVE SUMMARY** 

_A unified AI audit architecture that satisfies all four regulatory frameworks (SR 11-7, EU AI Act, DORA, GDPR) is achievable with a common event schema, dual-region immutable storage, and jurisdiction-specific access controls. The key design principles: hash inputs (don't store raw PII in audit records), link every decision to model version, store human overrides, ensure <5ms write overhead on the decision path, and design for regulatory query performance from day one._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw the audit architecture:** 

- Decision path (fast): Application → AI Decision → Async Audit Write → Immutable Store 

- Show dual-region: US Audit Store | EU Audit Store 

- Show access paths: Regulator (read-only, logged) → Query Layer → Audit Store 

- Show retention tiers: Hot (0-1yr) → Warm (1-5yr) → Cold (5-10yr) → Delete/Anonymise 

###### **FOLLOW-UP CHALLENGE** 

I _The EU AI regulator requests 'all credit decisions made in the EU in the last 12 months, grouped by decision outcome and customer demographic category.' How does your audit architecture respond to this query?_ 

###### **Q2   DISTINGUISHED   [HITL] [Approval Workflows] [Risk Tiering] [Governance]** 

**_Design a human-in-the-loop (HITL) governance architecture for an enterprise with 500 AI use cases ranging from chatbots to autonomous credit decisions. How do you determine what requires human oversight and implement it at scale?_** 

###### **PREPARATION HINTS** 

I _Risk tiering framework_ 

I _Tiered oversight levels_ 

I _Automated vs. supervised vs. gated_ 

I _Reviewer capacity planning_ 

I _Escalation chains_ 

###### G **BUSINESS PERSPECTIVE** 

HITL is not binary — it exists on a spectrum from 'fully autonomous' to 'every decision requires human approval'. For 500 use cases, the business challenge is: how much HITL is enough to manage regulatory and reputational risk, without making human review the operational bottleneck that prevents AI deployment at scale? 

- Regulator expectation: high-risk AI systems must have 'meaningful human oversight' — but what is meaningful differs by use case risk level 

- Business expectation: if every AI decision requires human approval, the speed advantage of AI is lost 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **HITL Risk Tiering Architecture:** 

###### **Tier 1 — Fully Autonomous (no HITL required):** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 42 

- Criteria: low stakes, reversible, no regulated decision, affects only internal processes 

- Examples: code suggestion, internal search, content summarisation, IT ticket routing 

- Controls: quality SLOs, anomaly detection, audit logging — no human in the loop 

###### **Tier 2 — Supervised Autonomy (HITL on exception):** 

- Criteria: moderate stakes, partially reversible, affects customers but not in a regulated manner 

- Examples: customer service chatbot responses, marketing content generation, fraud alert triage (pre-decision) 

- Controls: random sampling (1-5% of outputs reviewed by humans), output quality scoring, automatic escalation to Tier 3 if confidence below threshold 

###### **Tier 3 — Human-Confirmed (HITL before action):** 

- Criteria: high stakes, partially or fully irreversible, regulated customer impact 

- Examples: credit limit increase, account restriction, insurance claim pre-approval 

- Controls: AI recommendation presented to human reviewer; human must confirm or override; SLA on review time (e.g., 2 business hours) 

###### **Tier 4 — Human-Decided (AI advisory only):** 

- Criteria: severe consequences, fully regulated, reputationally sensitive 

- Examples: credit application decisions (FCA-regulated), mortgage approval, major account closure, legal document generation 

- Controls: AI produces analysis and recommendation only; human makes the decision; AI recommendation and human decision both logged 

###### **Governance Architecture:** 

- Use case classification: every AI use case assessed against risk criteria at design time 

- Annual reclassification: risk tier reviewed annually or when use case scope changes 

- Reviewer capacity planning: Tier 3 and Tier 4 require human reviewer capacity — size teams accordingly 

###### G **SECURITY PERSPECTIVE** 

###### **HITL security controls:** 

- Reviewer identity: all human reviews performed with authenticated, attributed identity — who approved what 

- Override audit: every human override of an AI recommendation logged with mandatory reasoning field 

- Reviewer conflict of interest: for high-value decisions, reviewer must not be the requestor 

- Collusion prevention: for Tier 4 decisions above value threshold, two-person approval required 

###### G **OPERATIONAL PERSPECTIVE** 

###### **HITL operations:** 

- Review queue management: Tier 3 and Tier 4 decisions enter a managed review queue with SLA tracking 

- Escalation: unreviewed decisions approaching SLA breach automatically escalated to senior reviewer 

- Queue health: if review queue grows beyond X items, automatic capacity alert to operations team 

- Reviewer training: reviewers must be trained on AI system capabilities and limitations — especially 'automation bias' (tendency to accept AI recommendations without scrutiny) 

###### G **FINANCIAL PERSPECTIVE** 

###### **HITL capacity cost:** 

   - Tier 3 at 10,000 decisions/day: at 5 minutes per review = 833 reviewer-hours/day = ~100 FTE reviewers 

   - This is why Tier 3 classification must be reserved for genuinely high-risk decisions 

   - Random sampling model for Tier 2: 5% of 100,000 decisions/day = 5,000 reviews/day = 417 reviewer-hours = ~50 FTE 

   - HITL cost is often the binding constraint on AI deployment scale — factor into use case prioritisation 

- G **REGULATORY PERSPECTIVE** 

###### **HITL regulatory requirements:** 

- EU AI Act: high-risk AI systems 'shall be designed and developed in such a way... that they can be effectively overseen by natural persons' 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 43 

- GDPR Article 22: right to not be subject to solely automated decisions with significant effects — Tier 4 compliance mechanism 

- FCA Consumer Duty: AI systems must produce outcomes that are fair for customers — HITL is one mechanism to ensure fairness 

- SR 11-7: models used in significant decisions must have governance structures including review processes 

###### G **TRADEOFFS** 

- Safety vs. speed: more HITL is safer but slower. For time-sensitive decisions (fraud prevention, trading), HITL latency may be incompatible with the use case. 

- Reviewer quality vs. cost: expert reviewers provide better oversight but are expensive and scarce. Training and tooling quality matters more than raw reviewer count. 

- Automation bias risk: extensive HITL may create automation bias — reviewers rubber-stamp AI recommendations without genuinely reviewing them. Monitor override rates. 

###### G **ALTERNATIVE APPROACHES** 

- Outcome-based oversight: instead of reviewing decisions in advance, review outcomes. AI makes decisions autonomously; humans review patterns of outcomes. Faster but reactive rather than preventive. 

- Statistical process control: use SPC methods to monitor AI decision distributions — automatically flag deviations for review. Less intensive than per-decision review. 

###### G **COMMON MISTAKES** 

- Classifying use cases as Tier 1 to avoid the operational cost of HITL — under-classification is a regulatory risk 

- Not training reviewers on automation bias — HITL without genuine scrutiny provides false assurance 

- Not monitoring override rates — low override rates may indicate rubber-stamping rather than genuine oversight 

- Not having escalation procedures — if a reviewer disagrees with AI but feels pressured to approve, the governance fails 

###### G **EXECUTIVE SUMMARY** 

_Human-in-the-loop governance for 500 AI use cases requires a structured risk-tiering framework, not case-by-case decisions. Tier 1 (fully autonomous) through Tier 4 (AI advisory only) maps to risk level, reversibility, and regulatory category. The operational discipline is: correct initial classification, annual reclassification, reviewer capacity planning, and monitoring of override rates as a governance health indicator. HITL without genuine scrutiny is theatre — measure whether it is actually working._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw the HITL tier decision tree:** 

- Decision node 1: Is this a regulated decision? Y → Tier 3/4 

- Decision node 2: Is the consequence irreversible? Y → Tier 3+ 

- Decision node 3: Does it affect customer rights? Y → Tier 2+ 

- Output: tier assignment with example use cases at each tier 

- Overlay: cost of HITL per tier per day 

###### **FOLLOW-UP CHALLENGE** 

I _Your reviewer override rate for Tier 3 credit limit decisions is 0.2% — nearly every AI recommendation is approved. Is this a sign that the AI is very accurate, or that reviewers are not genuinely reviewing? How do you investigate?_ 

###### **Q3   DISTINGUISHED   [AI Risk Framework] [Model Risk] [SR 11-7] [500 Models]** 

#### **_Design an enterprise AI risk framework for a bank with 500 production ML/AI models. How do you tier models by risk, validate them, and manage their lifecycle?_** 

###### **PREPARATION HINTS** 

- I _Model risk tiering_ 

- I _Validation independence_ 

- I _Ongoing monitoring_ 

- I _Model inventory_ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 44 

###### I _Change management for models_ 

###### G **BUSINESS PERSPECTIVE** 

500 production models without a risk framework is 500 potential regulatory, financial, and reputational liabilities. SR 11-7 (US Federal Reserve) mandates model risk management for any model used in material business decisions — most of those 500 models will qualify. 

- Models that are miscalibrated, biased, or operating outside their valid scope can cause: discriminatory lending, wrong risk assessments, regulatory violations, financial losses 

- The risk framework is both a regulatory requirement and a business management tool — it tells you where your AI risk is concentrated 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Enterprise AI Risk Framework Architecture:** 

###### **Model Inventory:** 

- Centralised model registry: every production model registered with: name, version, purpose, business owner, technical owner, risk tier, validation date, next review date 

- Automated discovery: CI/CD integration ensures no model can be deployed to production without registry entry 

- Model card for every entry: training data description, performance metrics, known limitations, intended use, prohibited uses 

###### **Risk Tiering:** 

- Tier 1 (High Risk): used in regulated decisions affecting customers (credit, fraud, AML screening, pricing) — SR 11-7 full validation required 

- Tier 2 (Medium Risk): used in internal decisions with material financial impact (risk capital models, liquidity forecasting) — rigorous validation required 

- Tier 3 (Low Risk): internal productivity tools, content generation, non-decision AI — simplified validation 

- Tiering criteria: outcome severity, decision irreversibility, regulatory obligation, data sensitivity, model complexity 

###### **Validation Framework:** 

- Independent validation: Tier 1 and Tier 2 models validated by team separate from development (SR 11-7 requirement) 

- Validation components: conceptual soundness, data quality assessment, performance testing, sensitivity analysis, stress testing, fairness assessment 

- Pre-deployment gate: no Tier 1 model deployed to production without completed validation report and sign-off 

- Ongoing validation: model performance monitored continuously; re-validation triggered by: material performance drift, data distribution change, business use change, regulatory change 

###### **Lifecycle Management:** 

- Change management: material model changes (retraining on new data, feature changes, threshold changes) require change assessment — may trigger full re-validation 

- Retirement: models no longer in use formally retired — documentation preserved per SR 11-7 retention requirements 

- Version control: all model versions retained for at least the SR 11-7 minimum period — needed for regulatory examination of historical decisions 

###### G **SECURITY PERSPECTIVE** 

###### **Model risk security controls:** 

- Model access control: Tier 1 and Tier 2 models accessible only via API with authentication — no direct access to model weights 

- Change control: production model deployment requires approval from model owner + validation team 

- Emergency model change procedure: for critical issues requiring immediate deployment, expedited review process with post-deployment retrospective 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Model risk operations:** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 45 

- Performance monitoring: every Tier 1 and Tier 2 model has performance SLOs with automated alerting on breach 

- Model health dashboard: CISO/CRO-level view of all models with traffic light status 

- Escalation: Tier 1 model SLO breach escalated to CRO within 24 hours 

- Quarterly review: all Tier 1 models reviewed quarterly by Model Risk Committee 

###### G **FINANCIAL PERSPECTIVE** 

###### **Model risk management cost vs. value:** 

- Validation programme cost: 3-5 FTE validators for 500 models (focus on Tier 1/2) 

- Model failure cost: one misclassified Tier 1 credit model causing regulatory breach: $50M+ remediation + fine 

- Capital model risk: inaccurate internal risk models can result in incorrect capital allocation — regulatory capital impact 

- ROI: model risk management programme at $2-5M/year is justified by one prevented major model failure 

###### G **REGULATORY PERSPECTIVE** 

###### **SR 11-7 requirements:** 

- 'Model risk management encompasses... identification and assessment of model risk, governance policies and procedures, and controls' 

- Independent validation required for models used in material decisions 

- Documentation: development documentation, validation documentation, ongoing monitoring documentation 

- Board and senior management oversight: model risk committee typically includes CRO, CFO, CTO 

- EU AI Act: mirrors SR 11-7 requirements for high-risk AI systems in financial services context 

###### G **TRADEOFFS** 

- Validation rigour vs. deployment speed: independent validation for every Tier 1 model adds weeks to deployment timeline. Investment in validation capacity and tooling reduces this delay. 

- Central vs. distributed model risk: centralised MRM team ensures consistency but creates bottleneck; distributed (teams own their own validation) is faster but may sacrifice independence. 

###### G **ALTERNATIVE APPROACHES** 

- Portfolio approach: validate a sample of Tier 1 models in detail; others receive lighter-touch review. Risk: unvalidated models may contain material issues. 

- Vendor model validation: outsource validation to specialist model risk consultancies. Addresses independence but loses institutional knowledge. 

###### G **COMMON MISTAKES** 

- Treating model risk management as a compliance checkbox rather than a genuine risk management tool 

- Not requiring independent validation — development teams validating their own models is ineffective 

- Failing to update the model inventory when new models are deployed — shadow models escape governance 

- Not having an ongoing monitoring programme — initial validation without monitoring misses post-deployment drift 

###### G **EXECUTIVE SUMMARY** 

_A 500-model estate without a risk framework is a material regulatory and business risk. SR 11-7 mandates governance for models used in material decisions — most of your 500 models qualify. The framework: centralised inventory, risk tiering (Tier 1 high-risk to Tier 3 low-risk), independent validation for Tier 1/2, ongoing performance monitoring, and lifecycle management. The Model Risk Committee provides board-level governance. The investment is 3-5 FTE validators and governance tooling — justified by the prevention of one major model failure._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw model risk framework as a pyramid:** 

- Top (Tier 1): small number of high-risk models, full validation, quarterly review 

- Middle (Tier 2): medium risk, rigorous validation, annual review 

- Base (Tier 3): large number of low-risk models, lightweight review 

- Overlay: validation pipeline as a funnel — development → validation → production 

- Show Model Risk Committee at the top as governance layer 

###### **FOLLOW-UP CHALLENGE** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 46 

I _During a DORA examination, the regulator finds that 12 of your Tier 1 credit models have not been re-validated following a significant data distribution change caused by the COVID-19 economic shock. What is your immediate response?_ 

###### **Q4   PRINCIPAL   [AI Governance] [Policy] [Model Registry] [Compliance]** 

#### **_Build an AI governance framework from scratch for a company that is deploying AI rapidly but has no governance structure. Where do you start and what do you build first?_** 

###### **PREPARATION HINTS** 

- I _Crawl-walk-run approach_ 

- I _Quick wins vs. foundational work_ 

- I _Governance charter_ 

- I _Model inventory as prerequisite_ 

- I _Stakeholder buy-in_ 

###### G **BUSINESS PERSPECTIVE** 

- AI deployed without governance creates compounding risk. Every ungovenred model is a potential liability. But governance that moves too slowly allows competitors to pull ahead. 

- The urgency: build governance fast enough to prevent the most serious risks before they materialise, but not so slow that it blocks the AI programme 

- The sequence matters: some governance foundations (inventory, risk tiering) must precede others (validation, monitoring). Getting the sequence right accelerates rather than blocks the AI programme. 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Governance build sequence — Crawl/Walk/Run:** 

Phase 1 — Crawl (Months 1-3): Foundation 

- AI inventory: document every AI system in production. This is non-negotiable first step — you cannot govern what you don't know. 

- Risk classification: classify each system against a simple 3-tier framework. Rough tiers are better than no tiers. 

- Governance charter: define who owns AI risk, who validates models, who can approve deployment. Get executive sign-off. 

- AI usage policy: what AI is permitted, what is prohibited, what requires approval. Published to all staff. 

- Quick wins: identify and address the 3-5 highest-risk ungovenred models immediately 

Phase 2 — Walk (Months 3-9): Structure 

- Model registry: formal inventory tool with metadata, owner, version, validation status 

- Validation programme: build validation capability for Tier 1 models. Start with new deployments, then backfill existing. 

- AI incident process: how do AI incidents get reported, classified, and resolved? 

- Human oversight framework: define HITL requirements by risk tier 

- Monitoring: deploy quality SLOs on Tier 1 models 

Phase 3 — Run (Months 9-18): Maturity 

- Automated governance gates: CI/CD integration prevents deployment without governance compliance 

- Fairness monitoring: continuous bias monitoring for models making customer decisions 

- Model risk committee: formal governance body with CRO/CTO/CLO representation 

- Regulatory alignment: formal SR 11-7 / EU AI Act compliance assessment and gap remediation 

###### G **SECURITY PERSPECTIVE** 

###### **Security foundations in Phase 1:** 

- Identify highest-risk ungovenred models and assess security posture 

- Ensure no Tier 1 models have unauthenticated API access 

- Audit trail for all Tier 1 model decisions — even if basic initially 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 47 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Governance operations:** 

- AI Governance Lead: dedicated owner of the governance programme — without this, governance drift back to ad-hoc 

- Governance forum: monthly cross-functional meeting reviewing AI risk, new deployments, incidents 

- Metric dashboard: governance health metrics visible to senior management 

###### G **FINANCIAL PERSPECTIVE** 

###### **Governance investment by phase:** 

- Phase 1: 1-2 FTE governance leads + tooling = $200-400K 

- Phase 2: add 2-3 validators + monitoring tooling = $500K-$1M incremental 

- Phase 3: full programme $1-3M/year depending on model count 

- ROI: governance prevents the first major AI failure, which typically costs 10-50x the governance investment to remediate 

###### G **REGULATORY PERSPECTIVE** 

###### **Regulatory readiness milestones:** 

- Month 3: can demonstrate an AI inventory exists to a regulator (minimum bar) 

- Month 9: can demonstrate risk tiering and validation for Tier 1 models 

- Month 18: can demonstrate full SR 11-7 / EU AI Act alignment 

###### G **TRADEOFFS** 

- Speed vs. completeness: Phase 1 governance is deliberately lightweight. The risk: lightweight governance is more gameable and has more gaps. Accept this and commit to the Walk and Run phases. 

- Top-down vs. bottom-up: top-down governance (mandate from CEO/Board) is faster to establish but may face engineering team resistance. Bottom-up (engineering-led) is more durable but slower. 

###### G **ALTERNATIVE APPROACHES** 

- Buy a governance platform: tools like Credo AI, Holistic AI, or Truera provide governance infrastructure faster than building from scratch. 

- Regulatory sandbox approach: deploy governance only for use cases that face regulatory scrutiny. Faster but leaves gaps. 

###### G **COMMON MISTAKES** 

- Building the governance framework before doing the inventory — you're governing against an incomplete picture 

- Creating governance that is so burdensome it drives AI underground — teams will work around governance they perceive as blocking 

- Not having executive sponsorship — without C-suite backing, governance has no teeth 

- Treating governance as a one-time project rather than an ongoing operational capability 

###### G **EXECUTIVE SUMMARY** 

_AI governance must be built in sequence: inventory first, then risk tiering, then validation and monitoring. A_ 

_crawl-walk-run approach delivers regulatory defensibility at 3 months, operational governance at 9 months, and mature compliance at 18 months. The most common failure mode is trying to build full governance immediately — it takes too long, loses stakeholder support, and leaves the highest-risk models ungovenred for longer. Start with the most dangerous risks and build outward._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw governance maturity roadmap:** 

- Timeline: Month 0 → 3 → 9 → 18 

- At each milestone: what governance capabilities exist? 

- Show: inventory → risk tiering → validation → monitoring → automated gates → regulatory compliance 

- Overlay: risk exposure curve (decreasing as governance matures) 

###### **FOLLOW-UP CHALLENGE** 

I _Six months into your governance programme, you discover that a business unit has been deploying AI models through a shadow process that bypasses your new governance controls. How do you respond?_ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 48 

###### **Q5   DISTINGUISHED   [Agent Approval Workflow] [Autonomous Operations] [Governance Design] [Banking]** 

**_Design an agent approval workflow architecture for a bank where AI agents can initiate, approve, and execute financial transactions up to certain value thresholds. How do you govern autonomous financial operations?_** 

###### **PREPARATION HINTS** 

- I _Value-based tiering_ 

- I _Dual control requirements_ 

- I _Time-of-day restrictions_ 

- I _Velocity controls_ 

- I _Emergency override procedures_ 

###### G **BUSINESS PERSPECTIVE** 

- Autonomous financial operations represent both the most valuable AI use case (24/7 operations, speed, scale) and the highest-risk (direct financial loss, regulatory liability). The governance challenge is enabling genuine autonomy for low-risk operations while maintaining appropriate controls for high-value transactions. 

- Regulatory requirement: payments authorisation frameworks require specific controls — many mandate human approval above certain thresholds 

- Business requirement: 24/7 automated processing of routine transactions is a competitive and operational necessity 

- Risk appetite: the board must define the maximum single transaction and cumulative daily value an AI agent can approve autonomously 

###### G **ARCHITECTURE PERSPECTIVE** 

###### **Agent Approval Workflow Architecture:** 

###### **Transaction Risk Tiering:** 

- Tier A (Fully Autonomous): value < £10K, known counterparty, routine transaction type, business hours, no sanctions flags 

- Tier B (Agent with Notification): £10K-£100K, known counterparty, standard transaction, human notified but not required to approve 

- Tier C (Human Approval Required): £100K-£1M, or any transaction with: new counterparty, unusual pattern, sanctions match, off-hours high-value 

- Tier D (Dual Human Approval): > £1M, or any transaction escalated from Tier C, or any transaction matching fraud patterns 

- Special rules: 4-eyes principle for any transaction above board-defined threshold regardless of tier 

###### **Approval Architecture:** 

- Approval service: centralised, highly available service that evaluates each agent transaction request against tier rules 

- Decision latency: Tier A decisions in <100ms (automated), Tier C decisions queued with SLA notification 

- Velocity controls: even within Tier A, cumulative velocity limits — agent cannot process >£500K/hour without escalation 

- Time-of-day controls: higher scrutiny outside business hours — Tier A limit reduced outside 07:00-19:00 

- Counterparty controls: new counterparties always require Tier C or above, regardless of value 

###### **Human Approval Interface:** 

- Mobile-first approval interface: approvers receive push notification with transaction context 

- 30-minute approval SLA: Tier C transactions approved within 30 minutes or auto-escalated 

- Rejection requires reason: approver must select reason from structured list + optional free text 

- Batch review: for high-volume periods, approver can batch-approve similar transactions after reviewing sample 

###### G **SECURITY PERSPECTIVE** 

###### **Autonomous financial operations security:** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 49 

- Agent identity: every transaction submitted with agent SVID — system knows exactly which agent initiated it 

- Segregation: transaction initiation agent ≠ transaction approval agent — no single agent can both initiate and approve 

- Immutable ledger: every agent transaction action logged immutably — regulatory grade audit trail 

- Anomaly detection: real-time scoring of transaction patterns — unusual patterns trigger automatic escalation to Tier C/D regardless of value 

- Emergency freeze: all autonomous transaction processing can be halted globally within 60 seconds 

###### G **OPERATIONAL PERSPECTIVE** 

###### **Approval workflow operations:** 

- Approver availability monitoring: ensure Tier C approver pool has sufficient coverage 24/7 

- Queue health: alert if Tier C queue exceeds 50 items or P99 approval time exceeds SLA 

- False positive management: agent transactions incorrectly escalated to human create friction — monitor escalation accuracy and tune tier rules quarterly 

- Reconciliation: end-of-day reconciliation of all agent-processed transactions against expected patterns 

###### G **FINANCIAL PERSPECTIVE** 

###### **Autonomous operations financial controls:** 

   - Daily autonomy limit: aggregate daily value processed autonomously limited to board-approved threshold 

   - Monthly review: finance and risk review of autonomous transaction profile — any pattern shifts require investigation 

   - Settlement risk: in T+1 settlement systems, autonomous transactions must complete within settlement window — approval SLAs must respect this 

   - P&L; attribution: autonomous transaction outcomes tracked against expected outcomes — performance monitoring 

- G **REGULATORY PERSPECTIVE** 

###### **Payment operations regulatory requirements:** 

- PSD2: strong customer authentication requirements for customer-initiated payments — AI agents cannot bypass SCA 

- SWIFT gpi: SWIFT global payments innovation requires traceable transaction chain — agent-initiated transactions must comply 

- BACS/Faster Payments: scheme rules apply to agent-initiated transactions — compliance must be designed in, not retrofitted 

- FCA Systems and Controls: automated systems must have 'appropriate controls' — the approval workflow framework is the evidence 

- SAR obligations: if agent detects suspicious transaction pattern, must trigger SAR submission process — agent cannot suppress this 

###### G **TRADEOFFS** 

- Automation rate vs. risk: raising Tier A threshold increases automation rate but increases autonomous risk. Lower threshold is safer but creates more human review. 

- Approval SLA vs. operational speed: tight approval SLAs are good for business but create approver pressure. Approver pressure correlates with automation bias — rubber-stamping. 

- Centralised vs. distributed approval: centralised approval service is simpler to govern; distributed approval per business line is faster but harder to monitor. 

###### G **ALTERNATIVE APPROACHES** 

- Human-in-the-loop for all transactions: maximum safety but eliminates the automation value proposition. Not viable for high-volume operations. 

- Retrospective review only: agent executes all transactions; humans review outcomes. Faster but does not prevent individual transaction errors — only pattern detection. 

###### G **COMMON MISTAKES** 

- Not defining the daily cumulative autonomy limit — individual transaction controls are evaded by many small transactions 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 50 

- Allowing agents to both initiate and approve their own transactions — violates segregation of duties 

- Setting approval SLAs so tight that approvers cannot genuinely review — creates automation bias 

- Not testing the emergency freeze capability regularly — discovering it doesn't work during an incident is catastrophic 

- Forgetting that scheme rules (SWIFT, BACS) apply to agent-initiated transactions as much as human-initiated ones 

###### G **EXECUTIVE SUMMARY** 

_Autonomous financial operations require a governance architecture that enables genuine automation for routine low-risk transactions while maintaining proportionate human oversight for higher-value or unusual transactions. The architecture: value-tiered approval rules, velocity controls, counterparty controls, segregation of duties between initiation and approval agents, and an always-available emergency freeze. The board sets the risk appetite (maximum autonomous value); the architecture enforces it consistently and auditibly._ 

###### **WHITEBOARD EXERCISE** 

###### **Draw transaction approval flow:** 

- Agent submits transaction → Approval Service evaluates tier rules 

- Branch: Tier A (auto-approve with logging) | Tier B (approve + notify) | Tier C (queue for human) | Tier D (dual approval required) 

- Show velocity accumulator: counts toward daily limit 

- Show audit trail feeding from all paths into immutable ledger 

###### **FOLLOW-UP CHALLENGE** 

I _An agent processes £2M in automated transactions over 3 hours via 200 transactions each below the £10K Tier A threshold — a classic velocity attack pattern. How does your architecture detect and respond to this?_ 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 51 

## **MOCK INTERVIEW SCORECARDS** 

_Score each criterion 1-5. Distinguished Architect threshold: average_ ≥ _4.5 with no criterion below 3. Use in mock interview sessions — have a partner complete the scorecard while you answer._ 

##### **SCORECARD 1 — CTO ROUND** 

|**Criterion**|**1 — Weak**|**3 — Competent**|**5 — Distinguished**|
|---|---|---|---|
|Strategic Vision &<br>Business Framing|Technology-first. Cannot<br>connect initiatives to<br>business outcomes.|Connects most<br>investments to business<br>outcomes. Some financial<br>grounding.|Articulates multi-horizon strategy with<br>quantified ROI, competitive framing, and<br>board-level narrative.|
|Executive<br>Communication|Technical jargon. Loses<br>non-technical audience<br>within 2 minutes.|Clear explanations with<br>business framing. Handles<br>simple challenge<br>questions.|Board-level: concise, financially fluent,<br>narrative-driven. Handles hostile challenge<br>questions with confidence and data.|
|Financial Acumen &<br>Investment Judgement|Cannot quantify ROI.<br>Treats all investments as<br>equally important.|Understands NPV/IRR<br>concepts. Can prioritise<br>when given data.|Builds rigorous business cases. Phases<br>commitments. Negotiates with CFO.<br>Understands risk-adjusted returns.|
|Organisational<br>Leadership|Technical leader only. No<br>people or change<br>management experience.|Aware of org design<br>principles. Some<br>experience leading<br>change.|Deep Conway's Law and Team Topologies<br>knowledge. Has led large-scale<br>reorganisations with measurable<br>outcomes.|
|AI & Emerging<br>Technology|Uses buzzwords without<br>architectural depth or<br>governance awareness.|Understands AI platform<br>and governance concepts<br>at a theoretical level.|Designs AI operating models, navigates<br>regulatory complexity, connects AI<br>investment to competitive strategy with<br>financial models.|
|Risk & Regulatory<br>Governance|Identifies only obvious<br>risks. Unaware of DORA,<br>EU AI Act.|Knows key frameworks.<br>Identifies risks<br>systematically.|Integrates DORA, SR 11-7, EU AI Act into<br>strategy. Quantifies regulatory risk. Builds<br>governance that enables rather than<br>blocks.|
|Vendor & Ecosystem<br>Strategy|Transactional vendor<br>relationships. No<br>concentration risk<br>awareness.|Manages vendors against<br>contracts. Aware of<br>concentration risk.|Builds portfolio vendor strategy. Uses<br>architecture portability as negotiation<br>leverage. Meets DORA ICT third-party<br>requirements.|
|**SCORECARD 2 — AI**|**SECURITY ARCHITECT**|||
|**Criterion**|**1 — Weak**|**3 — Competent**|**5 — Distinguished**|
|AI Threat Modelling|Lists known vulnerabilities<br>without structured analysis.<br>Applies generic security<br>frameworks.|Applies STRIDE or similar<br>to AI. Identifies primary<br>AI-specific threat vectors.|First-principles threat modelling specific to<br>AI. Identifies novel attack vectors.<br>Quantifies blast radius per threat.|
|Prompt Injection Defence|Aware of prompt injection.<br>Suggests prompt<br>engineering as the<br>solution.|Understands privilege<br>separation and instruction<br>hierarchy principles.|Designs defence-in-depth: input<br>classification, privilege separation, output<br>validation, sandboxing. Tests indirect<br>injection vectors.|

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 52 

|**Criterion**|**1 — Weak**|**3 — Competent**|**5 — Distinguished**|
|---|---|---|---|
|Agent Security|Knows agents have|Designs basic permission|Complete agent security: SPIFFE identity,|
|Architecture|security considerations.|models and sandboxing for|JIT permissions, sandboxing, blast radius|
||Cannot design controls.|agents.|limits, observability, kill switch, anomaly<br>detection.|
|Data & Model Supply|Knows training data should|Understands data|Designs training pipeline security, RAG|
|Chain Security|be protected. No specific|poisoning and model|corpus integrity, canary detection,|
||controls.|extraction concepts. Some<br>mitigations.|differential privacy, model watermarking at<br>scale.|
|AI Regulatory Integration|Unaware of AI-specific|Knows EU AI Act and ISO|Integrates EU AI Act cybersecurity|
||security regulations.|27090 exist. Basic|requirements, ISO/IEC FDIS 27090, and|
|||compliance awareness.|SR 11-7 adversarial robustness into|
||||architecture.|
|Incident Response for AI|Generic incident response|Identifies AI-specific|Complete AI incident response: prompt|
||process applied to AI. No|incident categories. Some|injection, data poisoning, model failure,|
||AI-specific considerations.|AI-aware response steps.|fairness incidents, supply chain<br>compromise — each with distinct playbook.|

##### **SCORECARD 3 — AI IDENTITY ARCHITECT** 

|**Criterion**|**1 — Weak**|**3 — Competent**|**5 — Distinguished**|
|---|---|---|---|
|Agent Identity Design|API keys or shared service<br>accounts for agent<br>authentication.|Understands<br>SPIFFE/SPIRE concepts.<br>Can describe basic SVID<br>architecture.|Designs SPIFFE/SPIRE at 10K+ agent<br>scale: HA cluster, federation, rotation,<br>revocation <60 seconds, operational<br>monitoring.|
|Delegation & Token<br>Exchange|Aware of delegation as a<br>concept. No protocol<br>knowledge.|Understands OAuth2 OBO<br>and token exchange at a<br>conceptual level.|Implements RFC 8693 token exchange<br>with correct act/sub semantics. Designs<br>multi-hop delegation with scope narrowing<br>and depth limits.|
|Token Boundary & JIT<br>Design|Grants broad permissions<br>to avoid permission errors.|Understands<br>least-privilege in theory.<br>Some JIT awareness.|Designs complete JIT permission grants,<br>dynamic scope elevation, scope usage<br>auditing, privilege creep prevention<br>automation.|
|Scale & Operational|Cannot describe identity|Identifies operational|Designs identity operations for 10K+|
|Resilience|operations at scale. No<br>rotation or revocation<br>design.|challenges. Some<br>monitoring awareness.|agents: rotation monitoring, certificate<br>inventory, emergency revocation <60<br>seconds, fleet health dashboard.|
|NHI Governance|Treats agent identity like<br>human identity. No<br>NHI-specific governance.|Knows NHI is different.<br>Identifies orphaned<br>credential risk.|Designs complete NHI governance:<br>automated discovery, lifecycle<br>management, secrets vault integration,<br>quarterly orphan cleanup, rotation<br>automation.|
|Regulatory Compliance<br>Linkage|Unaware of identity<br>compliance requirements<br>for AI.|Knows frameworks require<br>audit trails. Can name<br>relevant regulations.|Connects agent identity design to SR 11-7,<br>EU AI Act, DORA audit requirements.<br>Designs for regulatory examination<br>readiness.|

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 53 

##### **SCORECARD 4 — AI GOVERNANCE & RISK** 

|**Criterion**|**1 — Weak**|**3 — Competent**|**5 — Distinguished**|
|---|---|---|---|
|Risk Framework Design|No risk tiering. Applies<br>same governance to all AI<br>systems.|Understands risk tiering<br>concepts. Can classify<br>systems at high level.|Designs complete risk framework: tiering<br>criteria, validation independence, lifecycle<br>stages, governance committee structure,<br>regulatory mapping.|
|Audit Trail Architecture|Audit trail = application log.<br>No immutability or|Understands immutability<br>requirements. Some|Designs multi-regulation audit architecture:<br>WORM storage, hash chaining,|
||regulatory design.|regulatory awareness.|dual-region, pseudonymisation for GDPR,<br>query performance at scale.|
|HITL Framework Design|HITL is binary: always or<br>never. Cannot describe<br>tiered oversight.|Understands HITL tiers<br>conceptually. Can assign<br>basic tier classifications.|Designs complete HITL framework: 4-tier<br>risk tiering, reviewer capacity planning,<br>override monitoring, automation bias<br>detection, escalation chains.|
|Regulatory Knowledge|General awareness of AI|Knows SR 11-7, EU AI Act,|Deep SR 11-7 knowledge (validation|
|Depth|regulation. Cannot cite|DORA at summary level.|independence, documentation|
||specific requirements.|Some specific requirement<br>knowledge.|requirements). EU AI Act Annex IV. DORA<br>Art. 28. GDPR Art. 22. Can design to<br>satisfy each.|
|Governance from Scratch|Cannot sequence|Understands|Sequences governance build correctly:|
||governance build. Would|crawl-walk-run principle.|inventory→tiering→validation→|
||try to build everything at|Can identify Phase 1|monitoring→automation. Balances speed|
||once.|priorities.|with risk. Has executive buy-in strategy.|
|Agent Governance|Cannot describe|Applies general AI|Designs agent approval workflows with|
||agent-specific governance<br>requirements.|governance to agents.<br>Some agent-specific<br>awareness.|value tiering, velocity controls, segregation<br>of duties, dual control for high-value<br>operations, emergency freeze.|

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 54 

## **WHITEBOARD EXERCISES** 

_Complete each exercise on a physical whiteboard or whiteboard app. Time yourself strictly — interview whiteboards have hard time limits. Score yourself: Did you cover all key components? Did your diagram tell a clear story?_ 

##### **WB-01 — LLM Gateway Architecture [Chief Architect] [40 min]** 

###### **SCENARIO:** 

Draw the complete enterprise LLM Gateway. Include: API authentication layer, rate limiting, PII scrubber, prompt classifier (for injection detection), model router (cost/quality tier selection), semantic cache, response validator, audit logger, and cost attribution engine. Show data flow for: (a) a human user request and (b) an AI agent request. Highlight where agent identity is verified differently from human identity. 

###### **EVALUATION CRITERIA:** 

Components: all 9 listed above. Data flow: both human and agent paths. Security: injection detection, PII scrubbing, output validation. Cost: cost attribution at correct granularity. Differentiator: agent vs. human flow differences explained. 

##### **WB-02 — Agent Security Architecture [Distinguished] [45 min]** 

###### **SCENARIO:** 

Design the complete security architecture for a fleet of 500 enterprise AI agents. Draw: agent identity issuance (SPIFFE/SPIRE), tool permission model (which tools each agent tier can access), execution sandbox boundary, blast radius controls, anomaly detection layer, and kill switch. Show what happens when an agent is successfully compromised via prompt injection — trace the attack and show each layer that limits the damage. 

###### **EVALUATION CRITERIA:** 

Identity: SPIFFE SVID issuance correctly described. Permissions: JIT model with tool registry. Sandbox: network egress controls, ephemeral storage. Blast radius: session limits, irreversibility gates. Kill switch: global suspension path. Attack trace: each defence layer shown reducing impact. 

##### **WB-03 — Multi-Hop Token Delegation [Distinguished] [30 min]** 

###### **SCENARIO:** 

Draw the complete token exchange chain for: User → Orchestrator Agent → Specialist Agent → Customer Database API → External Credit Bureau. For each hop: show the token being exchanged, the act/sub claims structure, the scope being requested vs. granted, and the audience restriction. Show what happens if the Specialist Agent attempts to request a scope not in the User's original token. 

###### **EVALUATION CRITERIA:** 

RFC 8693 mechanics: correct token exchange at each hop. Claims: act/sub correctly accumulating. Scope narrowing: each hop ≤ previous scope. Audience restriction: each token bound to next hop's audience. Scope violation handling: auth server rejects request with error. 

##### **WB-04 — AI Audit Trail Architecture [Distinguished] [35 min]** 

###### **SCENARIO:** 

Design an AI audit trail that simultaneously satisfies SR 11-7 (7-year retention), EU AI Act (10-year retention for high-risk), DORA (5-year, immutable), and GDPR (right to erasure). Draw: the audit event schema, storage architecture (including dual-region for US/EU data sovereignty), retention tiers (hot/warm/cold), access control model (who can query what), and how you handle a GDPR erasure request without violating the retention requirement. 

###### **EVALUATION CRITERIA:** 

Schema: all required fields present including model version and explanation. Storage: WORM with hash chaining. Dual region: correct US/EU split. Retention tiers: tiered storage with correct retention periods. GDPR resolution: pseudonymisation approach correctly described. Query performance: columnar storage rationale. 

##### **WB-05 — HITL Governance Framework [Chief Architect] [30 min]** 

###### **SCENARIO:** 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 55 

Design a 4-tier Human-in-the-Loop framework for a bank with 300 AI use cases. Define: the criteria for each tier (what makes a use case Tier 1 vs. Tier 4), the controls at each tier (what governance applies), and the reviewer capacity model (how many reviewers needed at each tier). Then classify these 5 use cases and justify: (1) Fraud alert generation, (2) Credit application decision, (3) Customer service chatbot, (4) Internal IT ticket routing, (5) Mortgage recommendation. 

###### **EVALUATION CRITERIA:** 

Tier criteria: clear, defensible criteria for all 4 tiers. Controls: distinct controls at each tier including HITL frequency. Capacity model: rough reviewer numbers per tier. Classification: all 5 use cases correctly classified with justification. Regulatory mapping: EU AI Act and SR 11-7 referenced. 

##### **WB-06 — Technology Strategy on One Page [CTO] [20 min]** 

###### **SCENARIO:** 

You have 20 minutes and a blank whiteboard. A new CFO is visiting — they have no technology background. Draw a technology strategy for a global bank that: shows where we are today, where we need to be in 3 years, what the three biggest investments are, what the return on each investment is, and what the cost of not investing is. No jargon. Every element must connect directly to a financial outcome. 

###### **EVALUATION CRITERIA:** 

Business-first: no technology jargon unexplained. Current state: honest assessment including risks. Target state: clear destination. Three investments: each with quantified return and risk of inaction. Executive narrative: coherent story a CFO can retell. 

##### **WB-07 — Post-Quantum Migration Architecture [Distinguished] [45 min]** 

###### **SCENARIO:** 

Draw the post-quantum cryptography migration plan for a bank. Identify: all locations where RSA/ECDSA/ECDH is used (TLS, JWT, SAML, SWIFT, PKI, HSMs, code signing, SSH). Show the migration sequence (what must migrate first). Design the hybrid transition architecture (running classical and PQC simultaneously). Include the HNDL (Harvest Now Decrypt Later) risk timeline and explain why some data must be protected before Q-Day. 

###### **EVALUATION CRITERIA:** 

Inventory: comprehensive coverage of all crypto touch points. Sequence: dependencies correctly identified. Hybrid architecture: ML-KEM + classical running simultaneously. HNDL: correctly explained — long-lived sensitive data must be protected now. PKI: root CA, intermediate, leaf certificate migration correctly sequenced. 

##### **WB-08 — Autonomous Operations Security [Distinguished] [40 min]** 

###### **SCENARIO:** 

Design the security architecture for an autonomous operations platform where AI agents can restart services, scale infrastructure, and execute runbooks without human approval. Show: the tiered autonomy model (what executes autonomously vs. requires approval), the agent identity and permission model, the blast radius controls (what is the worst an agent can do?), the kill switch architecture, and the complete audit trail. Then show what happens when an injection attack causes an agent to attempt to delete a production database. 

###### **EVALUATION CRITERIA:** 

Tiered autonomy: clear criteria for each tier. Identity: SPIFFE-based with JIT permissions. Blast radius: per-session limits, irreversibility gates. Kill switch: global suspension path with <60 second SLA. Audit trail: immutable, includes reasoning trace. Attack scenario: each layer shown blocking or limiting the attack. 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 56 

## **REFERENCE ARCHITECTURES** 

##### **RA-1: Enterprise AI Platform** 

##### **Component Layers** 

|**Layer**|**Components**|**Purpose**|**Technology Options**|
|---|---|---|---|
|Developer<br>Experience|AI Workbench, Prompt Registry,<br>Golden Path Templates, Evaluation<br>Harness|Developer self-service for AI<br>development without platform<br>team involvement|Backstage, VS Code + Copilot,<br>JupyterHub, LangSmith|
|AI Gateway|Auth/AuthZ, PII Scrubber, Injection<br>Classifier, Model Router, Rate<br>Limiter, Semantic Cache, Cost<br>Attributor, Audit Logger|Single entry point for all LLM<br>traffic — governance, security,<br>and observability in one layer|Kong + custom plugins, APIM,<br>Portkey.ai, custom FastAPI<br>service|
|Model Platform|Model Registry, Model Serving,<br>Fine-Tuning Pipeline, Evaluation<br>Framework, A/B Testing|Model lifecycle management<br>from training through production<br>with governance gates|MLflow, vLLM, TGI, SageMaker,<br>Vertex AI, Azure ML|
|Application Platform|Vector Database, RAG Framework,<br>Agent Orchestration, Tool Registry,<br>Memory Store|Reusable components for<br>building AI-powered applications<br>with security built in|pgvector, Weaviate, LangGraph,<br>AutoGen, Redis|
|Governance<br>Platform|Model Risk Registry, Audit Trail,<br>Fairness Monitor, Explainability<br>Engine, Approval Workflow|SR 11-7 and EU AI Act<br>compliance infrastructure|Custom + Credo AI, Fiddler AI,<br>Holistic AI|
|Observability|LLM Traces, Token Metrics, Quality<br>SLOs, Cost Attribution, Anomaly<br>Alerts|Operational visibility into AI<br>system health, cost, and quality|Langfuse, Prometheus, Grafana,<br>Datadog LLM Observability|

##### **RA-2: Enterprise Agent Security Reference Architecture Security Control Map** 

|**Security Domain**|**Control**|**Implementation**|**Regulatory Coverage**|
|---|---|---|---|
|Agent Identity|SPIFFE/SPIRE X.509<br>SVIDs, 1-hour TTL,<br>auto-rotation|SPIRE server cluster (3-node<br>HA), node attestors per platform|EU AI Act Art. 9, DORA ICT risk<br>management|
|Agent|RFC 8693 token exchange,|Entra ID / Keycloak token|SR 11-7 human accountability, GDPR Art.|
|Authorisation|scope narrowing, delegation<br>depth≤3|exchange endpoint|5|
|Tool Permissions|Tool registry, JIT grants for<br>high-risk tools, OPA<br>enforcement|OPA policy engine, tool registry<br>service|Least-privilege (NIST ZT, DORA<br>operational resilience)|
|Execution|Isolated compute, network|Kubernetes network policies,|EU AI Act cybersecurity requirements, Art.|
|Sandbox|egress whitelisting,<br>ephemeral storage, JIT<br>secrets|Vault agent sidecar, Kata<br>Containers|15|
|Blast Radius|Per-session action limits,|Custom orchestrator controls,|DORA operational resilience, EU AI Act|
|Controls|irreversibility gates, human<br>checkpoints at M actions|approval service|HITL|

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 57 

|**Security Domain**|**Control**|**Implementation**|**Regulatory Coverage**|
|---|---|---|---|
|Observability &|Full execution trace, WORM|OpenTelemetry→SIEM, S3|SR 11-7 documentation, EU AI Act Art. 12,|
|SIEM|audit log, behavioural|Object Lock, custom ML|DORA|
||anomaly detection|anomaly model||
|Kill Switch|Global agent suspension by|Centralised agent control plane,|DORA operational resilience testing, Art.|
||risk tier, <60 second SLA,<br>monthly testing|circuit breaker pattern|25|

##### **RA-3: Zero Trust Architecture for AI Workloads** 

##### **Control Plane Mapping** 

|**ZT Control Plane**|**Standard Component**|**AI-Specific Extension**|**Standard Reference**|
|---|---|---|---|
|Identity|Entra ID / Okta for humans|SPIFFE/SPIRE for agents + models, NHI<br>lifecycle management|NIST SP 800-207, CISA<br>ZTA|
|Device/Workload|MDM for endpoints|GPU node attestation, model container<br>signing, model integrity verification at load|NIST SP 800-207|
|Network|ZTNA + service mesh<br>mTLS|AI inference traffic isolated, no internet<br>egress for training workloads, agent network<br>egress whitelisted|BeyondCorp Enterprise, Istio|
|Application|OIDC + RBAC|Agent delegation chain (RFC 8693),<br>prompt-level authorisation, tool permission<br>model|OAuth 2.0 RFC 6749/8693|
|Data|DSPM + DLP + field<br>encryption|PII scrubbing at AI gateway, training data<br>access control, RAG corpus signing, WORM<br>audit logs|NIST CSF, GDPR Art. 25|
|Policy Engine|OPA/Cedar for application<br>policies|Agent permission policies, model access<br>policies, approval workflow rules, velocity<br>controls|Open Policy Agent, AWS<br>Cedar|
|Continuous<br>Verification|Behaviour analytics<br>(UEBA)|Agent behavioural baselines, anomaly<br>detection on tool call patterns, cross-agent<br>correlation|NIST SP 800-207<br>continuous diagnostics|

##### **RA-4: Enterprise AI Risk Framework — Lifecycle Architecture** 

##### **Lifecycle Stages by Risk Tier** 

|**Stage**|**Tier 1 (High Risk)**|**Tier 2 (Medium Risk)**|**Tier 3 (Low Risk)**|
|---|---|---|---|
|Intake|Full model proposal form, automated|Model proposal form,|Brief intake form, automated|
||risk classification, MRC review required|automated classification, team|classification, self-service|
|||lead approval||
|Development|Data documentation required, bias|Data quality assessment,|Standard SDLC, automated|
||assessment, fairness plan, IMV design|standard SDLC controls|quality gates|
||review|||
|Validation|Independent validation team (reports to|Internal validation with peer|Automated validation gates in|
||CRO). Conceptual soundness +|review. Performance + basic|CI/CD only|
||performance + fairness + stress testing|fairness.||

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 58 

|**Stage**|**Tier 1 (High Risk)**|**Tier 2 (Medium Risk)**|**Tier 3 (Low Risk)**|
|---|---|---|---|
|Production|Continuous performance SLOs, daily|Monthly performance review,|Automated quality SLOs,|
||fairness metrics, drift monitoring,|annual validation refresh|annual review|
||quarterly review, MRC oversight|||
|Change|Material changes restart full validation|Changes assessed against|Standard software change|
|Management|cycle. Change definition documented in|threshold. >threshold triggers|management|
||risk framework.|re-validation.||
|Decommission|6-month notice, dependent system|3-month notice, artefact|Standard decommission, 1-year|
||migration, artefact archive for SR 11-7|archive, brief post-retirement|artefact retention|
||period, post-retirement review|review||
|Governance|Model Risk Committee sign-off|Model owner + MRM team|Team lead approval.|
||required. CRO approval for production.|approval.||

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 59 

## **TRADEOFF MATRICES** 

##### **AI Model Hosting Strategy** 

|**Dimension**|**Self-Hosted Open Source**<br>**Foundation Model API (3rd**<br>**Party)**<br>**Fine-Tuned on Foundation**<br>**Model**|
|---|---|
|Cost model|High upfront GPU/infra, low<br>per-inference at scale<br>Low upfront, high per-inference at<br>scale, unpredictable token costs<br>Medium upfront fine-tuning cost<br>+ API inference cost|
|Data privacy|Full control — data never leaves<br>your infrastructure<br>Data sent to third-party — DPA<br>required, sovereignty concerns<br>Training data stays local;<br>inference data sent to API|
|Model performance|Varies widely by model; requires<br>ML team to evaluate and maintain<br>Best general capability (GPT-4,<br>Claude); regularly updated by<br>provider<br>Best domain-specific<br>performance for your specific<br>use case|
|Latency control|Full control — co-locate inference<br>with application<br>Network-dependent, provider SLA<br>governs<br>Network-dependent, provider<br>SLA governs|
|Compliance posture|Easiest — full control over data,<br>model, and audit trail<br>Requires DPA, data residency<br>validation, provider audit rights<br>Training compliance same as<br>self-hosted; inference same as<br>API|
|Operational burden|Full responsibility: GPU<br>management, scaling, monitoring,<br>updates<br>Zero infrastructure ops<br>Model refresh responsibility;<br>API ops otherwise|
|Regulatory risk|Lowest — all controls internal<br>Provider outage = service outage;<br>provider policy changes affect you<br>Hybrid: training risk is internal;<br>inference risk is<br>provider-dependent|
|Talent requirement|ML engineering, MLOps, GPU<br>infrastructure<br>Prompt engineering, integration<br>engineering<br>ML engineering for fine-tuning;<br>otherwise similar to API|
|Best for|High-volume, latency-sensitive,<br>data-sovereign, regulated use<br>cases<br>General productivity, rapid<br>prototyping, variable workloads<br>Production domain-specific use<br>cases with quality requirements|
|**Agent Orchestrat**|**ion Framework Comparison**|
|**Dimension**|**LangGraph**<br>**AutoGen (Microsoft)**<br>**CrewAI**<br>**Custom-Built**|
|Architecture model|Graph-based state<br>machine<br>Conversation-based<br>multi-agent<br>Role-based crew<br>model<br>Define your own|
|State management|Built-in persistent graph<br>state<br>Conversation history<br>(limited)<br>Task-level state only<br>Full control|
|Multi-agent support|Strong — native graph<br>edges between agents<br>Strong —<br>conversation-based<br>coordination<br>Good — role-defined<br>crew coordination<br>Full control|
|Tool integration|Good — LangChain tool<br>ecosystem<br>Good — Python function<br>tools<br>Good — built-in tool<br>types<br>Full control — any<br>integration|
|Observability|Via LangSmith (paid)<br>Limited built-in<br>observability<br>Limited built-in<br>observability<br>Build your own or integrate|

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 60 

**Dimension LangGraph** Security & Limited — requires governance hooks custom implementation 

**AutoGen (Microsoft)** Limited — requires custom implementation 

**CrewAI** Limited — requires custom implementation 

Vendor lock-in LangChain ecosystem Microsoft/Azure dependency ecosystem Enterprise readiness Growing — production Growing — Microsoft deployments exist backing Best for Complex stateful Research agents, workflows, conversational graph-structured agent multi-agent systems logic 

Open but CrewAI-specific patterns 

Microsoft/Azure Open but ecosystem CrewAI-specific patterns Growing — Microsoft Early — primarily backing startup deployments 

Role-based automation, simpler crew patterns 

**Custom-Built** Full control — build to your requirements 

None — full portability 

High — you own the stack 

Enterprise with strict governance, security, or performance requirements 

##### **Identity Provider Selection for Enterprise AI** 

**Okta Workforce Identity** Workforce identity, cloud-agnostic 

**Dimension Entra ID (Microsoft) Okta Workforce Ping / ForgeRock Identity** Primary use case Workforce identity, M365, Workforce identity, Workforce + CIAM, Azure-native cloud-agnostic regulated industries AI agent identity Managed Identity for Service accounts, OIDC Service accounts, OIDC support Azure workloads only for apps federation Multi-cloud support Azure-native (deep), Cloud-agnostic by Cloud-agnostic by limited multi-cloud design design PQC readiness ML-KEM in SymCrypt — Roadmap — not yet Roadmap — not yet (2026) ahead of market deployed deployed SPIFFE federation Via OIDC discovery Via OIDC discovery Via OIDC discovery endpoint endpoint endpoint Credential rotation Managed Identity tokens API keys require Varies by credential auto-rotate manual rotation type Compliance features DORA, SOC 2, ISO DORA, SOC 2, ISO DORA, SOC 2, ISO 27001, FIPS 140-2 27001 27001, sector-specific Best for Microsoft-heavy Best-of-breed workforce Large regulated enterprises, Azure-native identity, multi-cloud enterprises needing workloads unified workforce + 

Large regulated enterprises needing unified workforce + CIAM 

**SPIFFE/SPIRE (Machine)** Machine/workload identity (agents, services) 

Native purpose-built for workload identity Cloud-agnostic — purpose built for hybrid Depends on underlying PKI Native SPIFFE federation 

SVIDs auto-rotate — core feature Standards-based (SPIFFE spec) Enterprise-scale AI agent and microservice identity 

##### **AI Governance Platform Comparison** 

|**Dimension**|**Credo AI**|
|---|---|
|Primary strength|Policy as code, AI Act|
||compliance, risk tiering|

|**Holistic AI**|
|---|
|EU AI Act compliance,|
|risk assessment,<br>vendor risk|

**Fiddler AI** Model monitoring, explainability, fairness real-time 

**Custom-Built (OpenMRM)** Full control, deep integration 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 61 

|**Dimension**|**Credo AI**|**Holistic AI**|**Fiddler AI**|**Custom-Built**<br>**(OpenMRM)**|
|---|---|---|---|---|
|SR 11-7 support|Good — model lifecycle<br>tracking|Good — risk<br>assessment<br>documentation|Strong — monitoring and<br>validation evidence|Build to your exact<br>requirements|
|EU AI Act|Strong — built for<br>compliance|Strong — purpose-built<br>for EU AI Act|Partial — monitoring<br>component only|Build to your<br>requirements|
|Fairness monitoring<br>Explainability|Good<br>Integration-dependent|Good<br>Integration-dependent|Excellent — real-time<br>fairness metrics<br>Strong — SHAP/LIME built<br>in|Build your own<br>Build your own|
|Integration effort|Medium — APIs and<br>connectors|Medium — APIs and<br>connectors|Low — Fiddler client library|High — build<br>everything|
|Cost model<br>Best for|Enterprise SaaS licence<br>Enterprises needing<br>policy-as-code and<br>compliance documentation|Enterprise SaaS licence<br>EU-regulated<br>enterprises needing AI<br>Act compliance|Enterprise SaaS licence<br>Enterprises needing<br>real-time model monitoring<br>and fairness|Engineering cost<br>only<br>Enterprises with<br>complex custom<br>requirements or<br>wanting to avoid<br>vendor lock-in|

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 62 

## **ARCHITECTURE REVIEW SIMULATIONS** 

_Simulate Architecture Review Board (ARB) sessions. Read each proposal, identify the issues independently, then compare against the model review. For Distinguished Architect preparation: aim to identify all critical issues and at least 4 of the additional issues before reading the model review._ 

##### **AR-1 — Customer Credit Advice AI Assistant [Chief Architect Reviewer]** 

###### **PROPOSAL:** 

A retail banking product team proposes deploying an LLM-powered chatbot that answers customer questions about credit products and provides personalised rate estimates. The system will use GPT-4o via Azure OpenAI. Customer account history, credit score, and transaction data will be included in the prompt context to personalise responses. Expected scale: 2M customer interactions per month. The team plans to launch in 6 weeks and has not engaged Model Risk or Legal. 

###### **ISSUES TO IDENTIFY (attempt independently before reading):** 

- CRITICAL: EU AI Act — credit advice chatbot with access to financial data and providing rate estimates is almost certainly a 

- high-risk AI system under Annex III (credit assessment). Requires conformity assessment before deployment. 6-week timeline is impossible. 

- CRITICAL: SR 11-7 — any system influencing credit decisions must be in the model risk framework. No model intake has been 

- done. Tier 1 validation required. 

- CRITICAL: GDPR — customer account data, credit score, and transaction data included in prompts sent to Azure OpenAI. Data 

- minimisation assessment required. DPA with Microsoft must be reviewed for this specific use case. 

- HIGH: PII in prompts — what is the retention period for Microsoft's Azure OpenAI service? Sensitive financial data in training 

- pipelines? Must be contractually restricted. 

- HIGH: Hallucination risk — rate estimates from an LLM without grounding will be wrong. Incorrect rate communicated to a 

- customer creates mis-selling liability and FCA Consumer Duty breach. 

- HIGH: No audit trail — credit advice interactions must be logged for regulatory and customer dispute resolution purposes. 

- HIGH: No HITL — rate estimates that could affect customer decisions have no human review mechanism. 

- MEDIUM: Data residency — where is Azure OpenAI processing this data? Must be confirmed for EU customers. 

- MEDIUM: No model monitoring — 2M interactions/month with no quality SLOs or anomaly detection. 

- MEDIUM: No prompt injection defence — a motivated customer could attempt to manipulate the model. 

###### **MODEL REVIEW RESPONSE:** 

Do NOT approve in current form. Required before re-submission: (1) EU AI Act risk assessment completed by Legal — if high-risk, full conformity process before launch; (2) SR 11-7 model intake completed — expected Tier 1 classification; (3) GDPR impact assessment completed and Azure OpenAI DPA reviewed; (4) Audit trail designed and implemented; (5) Rate estimates removed or replaced with approved rate ranges from the product catalogue; (6) HITL mechanism for any personalised rate recommendation; (7) Minimum revised timeline: 16 weeks. Return to ARB when conditions are met. 

##### **AR-2 — Autonomous Payment Processing Agent [Distinguished Reviewer]** 

###### **PROPOSAL:** 

The operations team proposes deploying an AI agent to autonomously process domestic payments up to £50,000 without human approval, 24/7. The agent will retrieve payment instructions from the queue, validate against counterparty data, check against sanctions screening, and submit to Faster Payments. Estimated volume: 5,000 payments/day. Human oversight: daily reconciliation review. The team has classified this as a Tier 2 risk use case. 

###### **ISSUES TO IDENTIFY (attempt independently before reading):** 

- CRITICAL: Risk tier is wrong. An autonomous system processing payments up to £50,000 is Tier 1 by any defensible risk 

- framework — consequential, regulated, and with direct financial impact. Requires full SR 11-7 validation and MRC approval. 

- CRITICAL: Payment scheme compliance — Faster Payments scheme rules govern how payments are submitted. Must verify 

- agent-submitted payments meet all scheme requirements including indemnity rules. 

- CRITICAL: Legal entity authorisation — what is the legal entity authorising these payments? Agent identity (SVID) does not 

- constitute legal payment authorisation. FCA payment services regulations require specific controls. 

- CRITICAL: Sanctions screening reliability — the agent checks against sanctions lists, but what is the false negative rate? 

- Sanctions violations have severe legal consequences. Independent validation of screening accuracy required. 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 63 

HIGH: Daily reconciliation is insufficient oversight for a system processing £250M/week. Intraday monitoring required — minimum hourly P&L; review. 

HIGH: No velocity controls — what prevents the agent from processing an anomalous pattern (e.g., 500 payments to the same new counterparty in one hour)? 

HIGH: No kill switch — if the agent malfunctions, how quickly can it be stopped? Must be sub-minute for payment operations. 

HIGH: DORA — automated payment processing is likely a critical function. Resilience testing required before go-live. 

MEDIUM: Counterparty validation — 'validate against counterparty data' is vague. How are new counterparties handled? What is the first-payment policy? 

MEDIUM: Error handling — what happens when payment is rejected by Faster Payments? Does agent retry? Alert? What is the refund process? 

###### **MODEL REVIEW RESPONSE:** 

Do NOT approve in current form. Required before re-submission: (1) Re-classify to Tier 1 — full SR 11-7 validation programme required; (2) Legal opinion on payment authorisation model and FCA compliance; (3) Faster Payments scheme compliance assessment; (4) Independent sanctions screening validation; (5) Velocity controls and anomaly detection implemented; (6) Intraday monitoring with human escalation; (7) Kill switch with <60 second SLA, tested; (8) DORA critical function assessment; (9) Revised human oversight model — 4-eyes on daily settlement not just reconciliation. Estimated timeline with these controls: 6 months. 

##### **AR-3 — Enterprise AI Knowledge Assistant — HR Policies [Principal Reviewer]** 

###### **PROPOSAL:** 

The HR team proposes deploying an internal AI assistant for all 40,000 employees to query HR policies, benefits, and leave entitlements. The assistant uses RAG over a 3,000-document HR policy corpus. Built on a commercial platform (Glean). SSO via Entra ID. The assistant will have read access to employee name, manager hierarchy, and role — to personalise responses (e.g., 'Your leave entitlement as a Grade 5 employee is...'). Go-live in 8 weeks across all regions simultaneously. 

###### **ISSUES TO IDENTIFY (attempt independently before reading):** 

- HIGH: Data minimisation — does the assistant need access to manager hierarchy? An employee querying their own leave 

- entitlement does not require visibility of their manager's details. Principle of data minimisation applies. 

- HIGH: Document freshness — who is responsible for keeping 3,000 HR policy documents current? Stale policy documents will 

- cause the assistant to give wrong answers about legally binding entitlements. A governance process for document maintenance must exist before go-live. 

- HIGH: Regional policy variation — HR policies vary by country (UK, US, DE, FR, etc.). RAG over a mixed-region corpus risks 

- giving UK employees German leave entitlements or vice versa. Regional segmentation required. 

- HIGH: GDPR legal basis for processing — processing employee data to personalise AI responses requires a documented legal 

- basis. Legitimate interest assessment required. Works council consultation required in Germany/Netherlands. 

- HIGH: Wrong answer liability — incorrect information about legally binding entitlements (leave, benefits, disciplinary process) 

- could create legal liability. Disclaimer required; escalation path to HR helpdesk required. 

- MEDIUM: Indirect prompt injection — 3,000 HR policy documents are ingested and trusted. Any document containing injected 

- instructions would be treated as a trusted source. Document provenance and injection scanning required. 

- MEDIUM: Simultaneous global rollout — if there is an issue (wrong answer, data exposure), it affects all 40,000 employees 

- simultaneously. Phased rollout (500 employees first) strongly recommended. 

- MEDIUM: Sensitive HR documents — performance review policies, disciplinary procedures, grievance processes. What is the 

- access control model for sensitive policy documents that should not be retrievable by all employees? 

- LOW: Audit trail — which employee queried what information. Required for any dispute about what guidance was provided. 

###### **MODEL REVIEW RESPONSE:** 

Approve with 6 conditions: (1) Data minimisation — remove manager hierarchy access; retain only employee grade/role for policy personalisation; (2) Document governance process documented and owner assigned before go-live; (3) Regional corpus segmentation implemented — UK employees only receive UK policy documents; (4) GDPR legitimate interest assessment completed, works council consultation initiated for EU countries; (5) Wrong-answer disclaimer on every response + 'speak to HR' escalation link; (6) Phased rollout: 500 employees in one region first, 2-week review, then global. Approve for pilot in 8 weeks; global rollout conditional on pilot review. 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 64 

### **EA INTERVIEW HANDBOOK — VOLUME 3** 

CTO Round · AI Security · AI Identity · AI Governance 

21 questions · 10 perspectives each · 8 whiteboard exercises · 4 scorecards · 4 reference architectures · 4 tradeoff matrices · 3 architecture review simulations 

Use alongside Volume 1 (EA Foundations) and Volume 2 (Delta: Emerging Topics) for complete Distinguished Architect preparation 

EA INTERVIEW HANDBOOK  —  VOL 3: CTO, AI SECURITY, AI IDENTITY & AI GOVERNANCE  |  DISTINGUISHED ARCHITECT EDITION  |  2025-2026Page 65
