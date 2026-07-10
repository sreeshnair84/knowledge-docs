---
title: "AI Opportunity Portfolio & Prioritization"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "02_AI_Opportunity_Portfolio.pdf"
doc_type: guide
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
last_reviewed: 2026-07-10
covers_version: "N/A"
---

AI-FIRST ENTERPRISE TRANSFORMATION  |  CONSULTING ENGAGEMENT 

# **AI Opportunity Portfolio & Prioritization** 

Where the value is, and in what order to capture it 

### **Contents of this deliverable** 

- Portfolio method: value cases, not use cases 

- Opportunity inventory across 16 business functions 

- Deep-dive cards for the five lighthouse candidates 

- Impact vs. Effort prioritization matrix and sequencing logic 

Deliverable 02  |  July 2026  |  Draft for discussion Illustrative engagement package. Assumptions stated in Deliverable 00 apply throughout. 

## **1. Portfolio Method** 

Each opportunity is assessed on business value, complexity, technical feasibility, required data, AI technique, expected ROI horizon, and principal risks. Two disciplines matter more than the list itself: **(1)** benefits are counted only when audited by Finance against a pre-registered baseline, and **(2)** every funded opportunity must consume the shared platform (Deliverable 03), so each use case makes the next one cheaper. 

## **2. Opportunity Inventory by Function** 

|**Function / opportunity**|**Value driver**|**Value**|**Comple**<br>**xity**|**Data required**|**Technique**|**ROI**<br>**horiz**|
|---|---|---|---|---|---|---|
|Customer service - AI<br>resolution & agent copilot|40-70% faster handling;<br>30-60% autonomous<br>deflection on routine<br>intents|VH|M|Interaction history,<br>KB, order/CRM<br>systems|RAG + tool-using<br>agents|6-12|
|Software engineering -<br>AI-assisted SDLC|20-40% cycle-time gain;<br>higher review coverage|VH|L-M|Code repos, tickets,<br>CI/CD telemetry|Code assistants +<br>agentic PR review|3-9 m|
|Sales - intelligence & proposal<br>automation|5-12% win-rate lift; 30-50%<br>less admin per rep|H|M|CRM, call transcripts,<br>win/loss, pricing|RAG + generation +<br>scoring|6-12|
|Marketing - content ops &<br>personalization|3-8x content throughput;<br>segment-of-one<br>campaigns|H|M|Brand corpus,<br>campaign<br>performance,<br>consented CDP data|Generation +<br>brand-tuned eval|3-9 m|
|Finance - close automation &<br>FP&A; copilot|30-50% faster close tasks;<br>narrative reporting on<br>demand|H|M-H|ERP GL, sub-ledgers,<br>planning models|Agents + structured<br>retrieval;<br>deterministic checks|9-18|
|Finance - AP/AR &<br>contract-to-invoice matching|Touchless invoice rate to<br>70-85%|M-H|M|Invoices, POs,<br>contracts|Document AI + rules<br>+ LLM exception<br>handling|6-12|
|HR - talent acquisition &<br>internal mobility|30-50% faster screening;<br>better internal matching|M-H|M|Job architecture, skills<br>taxonomy, HRIS|Matching +<br>generation; strict<br>human decision<br>rights|9-18|
|Legal - contract review &<br>clause intelligence|50-70% faster first-pass<br>review|M-H|M|Contract repository,<br>playbooks, precedent|RAG + extraction +<br>redline suggestion|6-12|
|Procurement - spend<br>intelligence & sourcing|2-5% addressable-spend<br>savings|M-H|M|Spend cube, supplier<br>master, market data|Classification +<br>negotiation-prep<br>agents|9-18|
|Supply chain - demand sensing<br>& disruption watch|10-20% forecast-error<br>reduction; earlier<br>disruption response|H|H|Orders, POS,<br>logistics, external<br>signals|ML forecasting +<br>LLM signal fusion|12-24<br>mo|
|Manufacturing/ops - quality &<br>maintenance|15-30%<br>unplanned-downtime<br>reduction|H|H|Sensor/IoT,<br>maintenance logs|Predictive ML +<br>technician copilot|12-24<br>mo|

Deliverable 02  |  Page 1 

|**Function / opportunity**|**Value driver**|**Value**|**Comple**<br>**xity**|**Data required**|**Technique**|**ROI**<br>**horiz**|
|---|---|---|---|---|---|---|
|IT ops - AIOps & self-service|40-60% L1 ticket<br>deflection; faster MTTR|H|M|ITSM tickets,<br>observability<br>telemetry, runbooks|RAG + remediation<br>agents (guarded)|6-12|
|Cybersecurity - triage &<br>detection engineering|50-70% faster alert triage|H|M|SIEM/SOAR data,<br>threat intel|LLM triage +<br>enrichment agents|6-12|
|Knowledge management -<br>enterprise brain|Foundational multiplier for<br>all other cases|VH (e<br>nablin<br>g)|M-H|Documents, wikis,<br>tickets, transcripts|Ingestion + RAG +<br>permissions-aware<br>search|6-12|
|Risk & compliance - monitoring<br>& reg-change|60-80% faster regulatory<br>impact analysis|M-H|M|Policy corpus,<br>regulatory feeds,<br>controls library|RAG + classification<br>+ workflow|9-18|
|Executive decision support -<br>enterprise copilot|Faster, evidence-linked<br>decisions|H|H|Semantic layer over<br>governed metrics|Text-to-analytics +<br>narrative synthesis|18-30<br>mo|

Value/Complexity: VH very high, H high, M medium, L low. ROI horizon = time from build start to audited net benefit. 

## **3. Lighthouse Deep-Dive Cards** 

### **Lighthouse 1 - Customer Service AI (copilot first, autonomy second)** 

|**Aspect**|**Detail**|
|---|---|
|Approach|Phase A: agent-assist copilot (suggested answers, auto-summarization, next-best-action). Phase<br>B: autonomous resolution for top 10-20 routine intents with confidence thresholds and instant<br>human escalation.|
|Expected ROI|Cost-to-serve down 25-40% in covered intents by month 18; CSAT neutral-to-positive as a hard<br>gate.|
|Key risks|Hallucinated policy answers (mitigate: retrieval-grounded with citation checks, refusal on low<br>confidence); agent morale (mitigate: position as augmentation, involve agents in design).|
|Why first|Rich data, measurable baseline, high visibility, and it forces the knowledge platform to be built<br>properly.|

### **Lighthouse 2 - AI-Assisted Software Engineering** 

|**Aspect**|**Detail**|
|---|---|
|Approach|Governed coding assistants for all engineers; agentic code review and test generation in CI;<br>migration agents for legacy remediation as a Horizon 2 extension.|
|Expected ROI|15-30% throughput gain measured by cycle time and change failure rate - never by lines of code.|
|Key risks|Insecure generated code (mitigate: security scanning in CI, provenance tagging); license<br>contamination (mitigate: policy + tooling).|
|Why first|Fastest time-to-value in the portfolio and it builds the internal skill base the platform team needs.|

### **Lighthouse 3 - Enterprise Knowledge Platform** 

Deliverable 02  |  Page 2 

|**Aspect**|**Detail**|
|---|---|
|Approach|Permissions-aware ingestion of documents, wikis, tickets, and call transcripts into a governed<br>retrieval layer; exposed as a service to every other use case via the platform.|
|Expected ROI|Indirect but foundational: measured via search success rate, time-to-answer, and reuse by<br>downstream use cases.|
|Key risks|Over-permissive retrieval leaking sensitive content (mitigate: document-level ACL enforcement at<br>query time, not index time only).|
|Why first|Every ambitious use case dies without it; building it once prevents 20 teams building it badly.|

### **Lighthouse 4 - Finance Close & FP&A; Copilot** 

|**Aspect**|**Detail**|
|---|---|
|Approach|Reconciliation and flux-analysis agents with deterministic validation; narrative reporting drafted by<br>AI, approved by controllers.|
|Expected ROI|2-4 days off monthly close tasks; analyst capacity shifted from assembly to analysis.|
|Key risks|Errors in financial reporting (mitigate: AI drafts, humans certify; full audit trail; SOX-aligned<br>controls).|
|Why first|Creates a credible, CFO-sponsored proof that AI works under control-heavy conditions - unlocking<br>governance trust.|

### **Lighthouse 5 - IT Ops & Security Triage** 

|**Aspect**|**Detail**|
|---|---|
|Approach|RAG over runbooks and ticket history for L1 deflection; alert-triage agents that enrich and prioritize<br>but do not auto-remediate in Phase A.|
|Expected ROI|40-60% L1 deflection; 30-50% triage-time reduction in the SOC.|
|Key risks|Automated actions causing outages (mitigate: read-only Phase A; graduated autonomy per<br>Deliverable 04).|
|Why first|IT is a willing early adopter and the telemetry to measure impact already exists.|

## **4. Impact vs. Effort Prioritization** 

|**Quadrant**|**Opportunities**|**Decision rule**|
|---|---|---|
|Quick wins (high impact,<br>low-med effort)|SW engineering assist; customer-service copilot;<br>marketing content ops; IT/SOC triage|Fund now; production within 2-3<br>quarters|
|Strategic bets (high impact,<br>high effort)|Knowledge platform; finance close; supply chain<br>sensing; autonomous service resolution|Fund now with staged gates; 12-24<br>month value horizon|
|Fill-ins (moderate impact,|Meeting/document summarization; HR policy|Deliver via platform self-service, minimal|
|low effort)|assistant; sales-call summaries|central investment|

Deliverable 02  |  Page 3 

|**Quadrant**|**Opportunities**|**Decision rule**|
|---|---|---|
|Deprioritize (low impact or<br>unready)|Executive enterprise copilot (until semantic layer<br>exists); fully autonomous HR decisions (regulatory);<br>moonshot product bets without data|Revisit at 12-month portfolio review|

Sequencing logic: quick wins fund credibility, strategic bets build the moat, and the platform mandate ensures the two share infrastructure. The portfolio is rebalanced quarterly by the AI Portfolio Board (Deliverable 05) with explicit kill criteria - a pilot that cannot show a path to audited value within two quarters is stopped and harvested for lessons. 

Deliverable 02  |  Page 4
