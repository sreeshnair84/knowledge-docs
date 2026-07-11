---
title: "Claude Foundations & Ecosystem Overview"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Module_1_Claude_Foundations.pdf"
doc_type: guide
tags: ["coding-tools"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
#### **MODULE 1** 
# **Claude Foundations & Ecosystem Overview** 

Complete guide to the Claude model family, product suite, plans, pricing, token economics, safety philosophy, and certification pathway 

**Claude Certified Architect (CCA-F) | Professional Enterprise Architect Learning Guide | May 2026** 

### **What You Will Master in This Module** 

I Claude model families (Haiku, Sonnet, Opus) — capabilities, benchmarks & selection guide 

I Full product suite: Claude.ai, API, Claude Code, Cowork, Chrome/Excel/PowerPoint (beta) 

I Plan comparison: Free → Pro → Max → Team → Enterprise — detailed feature matrix 

I Current API pricing with prompt caching and batch discount calculations 

- I Token economics: context windows, input/output ratios, cost modeling 

- I Safety philosophy: Constitutional AI, Responsible Scaling Policy, ASL levels 

- I Deployment channels: Direct API, Amazon Bedrock, Google Vertex AI 

- I CCA-F certification structure, exam domains, and Skilljar learning path 

### **Table of Contents** 

- 1.1 What Is Claude & Anthropic's Mission ........... 

- 1.2 Model Families: Haiku, Sonnet, Opus ............ 

- 1.3 The Claude Product Suite in Depth .............. 

- 1.4 Subscription Plan Comparison ................... 

- 1.5 API Pricing & Cost Modeling .................... 

- 1.6 Token Economics & Context Windows .............. 

- 1.7 Constitutional AI & Safety Philosophy .......... 

- 1.8 Responsible Scaling Policy (RSP) ............... 

- 1.9 Deployment Channels: Direct, Bedrock, Vertex ... 

- 1.10 CCA-F Certification Pathway ................... 

### **1.1 What Is Claude & Anthropic's Mission** 

Claude is Anthropic's family of large language models, built with a foundational emphasis on safety, helpfulness, and honesty. Anthropic is an AI safety company, and that mission shapes every product decision — from training methodology to deployment policy. 

For enterprise architects, understanding Anthropic's safety-first stance is not optional: it directly determines what Claude can and cannot do in your application, which behaviors operators can customize, and what compliance assurances you can make to regulators. 

##### **The Three Core Properties (Always Tested in Domain 5)** 

|**<b>Property</b>**|**<b>What It Means in Practice</b>**|
|---|---|
|<b>Helpful</b>|Genuinely assists users and operat|
|<b>Harmless</b>|Avoids producing content that is dan|
|<b>Honest</b>|Does not deceive users or operators|

**Architect Insight:** These three properties create real architectural constraints. 'Helpful' means your system prompt shouldn't over-restrict Claude unnecessarily. 'Harmless' means you cannot use system prompts to bypass safety training. 'Honest' means Claude will not lie to users on your behalf — design your application accordingly. 

### **1.2 Model Families: Haiku, Sonnet, Opus** 

The Claude model family follows a consistent three-tier structure. Each tier is updated through version generations (4, 4.1, 4.5, 4.6, 4.7, 4.8…). The version number and date suffix in the API model string uniquely identify a model snapshot, ensuring reproducibility in production. 

|**<b>Model</b>**|**<b>API String</b>**|**<b>Profile</b>**<br>**<b>Best Use Cases</b>**<br>**<b>$/MTok in/out</b>**|
|---|---|---|
|<b>Claude Haiku 4.|5</b><br>claude-haiku-4-5-20251001|Fastest & most cost-efficient<br>High-volume routing, classification, quick Q&A, sub-agent wor<br>$1 / $5|
|<b>Claude Sonnet|4.6</b><br>claude-sonnet-4-6|Best balanced (default)<br>Production workloads: code generation, document analysis, c<br>$3 / $15|
|<b>Claude Opus 4.|7</b><br>claude-opus-4-7|Most capable (flagship)<br>Complex reasoning, autonomous coding, multi-step agentic ta<br>$5 / $25|
|<b>Claude Opus 4.|8</b><br>claude-opus-4-8|Latest frontier<br>Hardest coding/reasoning tasks; new tokenizer (up to 35% m<br>$5 / $25|

**Context Window:** All current Opus and Sonnet models support a **1 million token** context window at standard pricing — no surcharge. Haiku 4.5 supports 200K tokens. This is approximately 750,000 words or an entire medium-sized codebase. 

##### **Model Selection Decision Tree** 

|**<b>Requirement</b>**|**<b></b>**<br>**<b>Model Choice</b>**|
|---|---|
|<b>Need</b>|→<br><b>Choose</b>|

|Sub-500ms latency + high volume (100K+ req/day)|→|Haiku 4.5|
|---|---|---|
|General production API workload (default choice)|→|Sonnet 4.6|
|Complex multi-step reasoning, hard coding tasks|→|Opus 4.7 or 4.8|
|Budget-constrained high-volume analysis|→|Haiku 4.5 + Batch API|
|Research / evaluation / maximum quality|→|Opus 4.8 + Extended Thinking|
|Cost-sensitive production with long static prompts|→|Any model + Prompt Caching|

**Exam Note:** The CCA-F exam references **claude-sonnet-4-20250514** in code examples. Real-world model strings use the format: _claude-{tier}-{major}.{minor}-{YYYYMMDD}_ or abbreviated forms. Always check the Anthropic models documentation for the latest stable string before deploying. 

#### **Important: Opus 4.8 Tokenizer Change** 

Claude Opus 4.8 ships with a new tokenizer that can generate up to **35% more tokens** for the same input text compared to Opus 4.6. Per-token prices are unchanged, but effective cost per request can increase by up to 35%. Always benchmark your specific workload before migrating from Opus 4.6 to 4.8. 

### **1.3 The Claude Product Suite in Depth** 

Claude is not a single product. It is an ecosystem of access channels, each optimized for a different user persona and integration pattern. Enterprise architects must understand all channels to design the right deployment architecture. 

|**<b>Product</b>**|**<b>Access Type</b>**|**<b>Primary Users</**|**b><b>Key Capabilities</b>**|
|---|---|---|---|
|<b>Claude.ai</b>|Web / Mobile / Desktop|End users, knowledge|workers<br>Chat UI with Projects, file uploads, memory, MCP connectors. Free, Pr|
|<b>Claude API</b>|REST API + Python/TS|SDKs<br>Developers|Full programmatic access. Messages API, tool use, batch, streaming, e|
|<b>Claude Code</b>|CLI + Agent SDK|Software engineers|Agentic coding: autonomous file editing, shell commands, MCP tools, h|
|<b>Claude Cowork</b|>Desktop GUI|Non-technical profess|ionals<br>File management, task automation, workflow orchestration — no code r|
|<b>Claude in Chrome|</b><br>Browser extension (beta|)Power users|Browsing agent: reads page content, clicks, fills forms, executes multi-s|
|<b>Claude in Excel</|b>Excel add-in (beta)|Analysts / Finance|Formula generation, data analysis, chart creation, pivot automation with|
|<b>Claude in PowerP|oint</b><br>PPT add-in (beta)|Presenters|Slide creation, design suggestions, content generation inside Microsoft|
|<b>Amazon Bedrock<|/b><br>AWS-managed API|AWS enterprise team|s Bedrock converse API, IAM auth, VPC integration, private link, data res|
|<b>Google Vertex AI<|/b><br>GCP-managed API|GCP enterprise teams|Vertex AI Claude endpoint, CMEK, VPC service controls, regional endp|
|<b>Anthropic Academ|y</b><br>Skilljar LMS|Architects / developer|sOfficial courses: Claude 101, API, Bedrock, MCP, Claude Code, Skills,|

### **1.4 Subscription Plan Comparison** 

Claude.ai offers consumer and enterprise plans. API access is billed separately per token. Understanding plan differences matters for architects designing who accesses Claude via the UI vs. building custom API-powered applications. 

|**Feature**|**<b>Free</b>**|**<b>Pro**<br>**$20/mo</b>**|**<b>Max 5x**<br>**$100/mo</b>**|**<b>Max 20x**<br>**$200/mo</b>**|**<b>Team Std**<br>**$25/seat</b>**|**<b>Enterprise**<br>**Custom</b>**|
|---|---|---|---|---|---|---|
|**Message limits**|Low daily|~5x Free|~25x Free|~100x Free|Higher|Negotiated|
|**Model access**|Sonnet|Opus+Sonnet|Opus+Sonnet<br>Op|us+Sonnet+Prio|rityOpus+Sonnet|All incl. Opus 4.8|
|**Extended thinking**|No|Yes|Yes|Yes|Yes|Yes|
|**Projects**|Limited|Unlimited|Unlimited|Unlimited|Unlimited|Unlimited + admin|
|**Memory (auto)**|No|Beta|Beta|Beta|Beta|Yes + private data|
|**MCP connectors**|No|No|No|No|Yes|Yes + custom MCPs|
|**Claude Code usage**|No|No|Max-scale|Max-scale<br>|Team Claude Cod|eEnterprise Claude Code|
|**SSO / SAML**|No|No|No|No|No|Yes|
|**Audit logs**|No|No|No|No|Limited|Full + SIEM export|
|**Zero data retention**|No|No|No|No|No|Optional|
|**SLA**|No|No|No|No|No|Yes|
|**Priority support**|No|No|No|No|No|Yes + CSM|
|**Admin console**|No|No|No|No|Basic|Full governance|

**Architect Decision:** For enterprise deployments, choose **Enterprise plan for UI users** (SSO, audit logs, admin control) and use the **API directly or via Bedrock/Vertex** for programmatic access. Do not rely on Claude.ai plans for production API workloads — use the API with token-based billing for predictable cost control. 

### **1.5 API Pricing & Cost Modeling** 

API pricing is per million tokens (MTok), billed separately for input and output tokens. The output cost is consistently 5x the input cost across all current tiers. Two major discount levers — prompt caching and batch processing — can dramatically reduce costs in production pipelines. 

|**<b>Model</b>**|**<b>Input**<br>**$/MTok</b>**|**<b>Output**<br>**$/MTok</b>**|**<b>Cache Write**<br>**$/MTok</b>**|**<b>Cache Read**<br>**$/MTok</b>**|**<b>Batch Input**<br>**$/MTok</b>**<br>|**<b>Batch Output**<br>**$/MTok</b>**|
|---|---|---|---|---|---|---|
|**Haiku 4.5**|$1.00|$5.00|$1.25|$0.10|$0.50|$2.50|
|**Sonnet 4.6**|$3.00|$15.00|$3.75|$0.30|$1.50|$7.50|
|**Opus 4.7 / 4.8**|$5.00|$25.00|$6.25|$0.50|$2.50|$12.50|
|**Opus 4.6 Fast Mode**|$30.00|$150.00|N/A|N/A|N/A|N/A|

## **Cost Modeling Examples** 

Use these formulas to budget your Claude API spend before production launch: 

```
# Example 1: Standard Sonnet 4.6 document analysis # Input: 10,000 tokens system+document, Output:
500 tokens summary cost_per_req = (10_000 * 3.00 / 1_000_000) + (500 * 15.00 / 1_000_000) # = $0.03
+ $0.0075 = $0.0375 per request # Example 2: Same with prompt caching (system prompt cached = 2,000
tokens) cost_cached = (2_000 * 0.30 / 1_000_000) + # cache read (8_000 * 3.00 / 1_000_000) + #
fresh input (500 * 15.00 / 1_000_000) # output # = $0.0006 + $0.024 + $0.0075 = $0.0321 — 14%
savings # Example 3: Batch API for 10,000 documents nightly batch_cost = 10_000 * ((10_000 * 1.50 /
1_000_000) + (500 * 7.50 / 1_000_000)) # = $187.50 vs $375 standard — 50% savings = $187.50 saved
per run
```

**Cost Optimization Priority Order:** (1) Use Haiku 4.5 for tasks where quality difference is negligible. (2) Add prompt caching for any static system prompt > 1,024 tokens. (3) Switch non-real-time bulk workloads to Batch API. (4) Route requests by complexity — Haiku for simple, Sonnet for medium, Opus for hard. Combined, these can reduce costs by 70-90%. 

### **1.6 Token Economics & Context Windows** 

Tokens are the fundamental unit of measurement for all Claude API interactions. A token is roughly 4 characters or 0.75 words in English. Different languages have different token densities — code, JSON, and non-Latin scripts often tokenize differently. 

|**<b>1 token**≈**</b>**|4 characters or ~0.75 words in English text|
|---|---|
|**<b>1,000 tokens**≈**</b>**|750 words — about 3 pages of double-spaced text|
|**<b>Max context (Opus/Sonnet 4.6+)</b>**|1,000,000 tokens — ~750,000 words, ~2,000 pages|
|**<b>Max context (Haiku 4.5)</b>**|200,000 tokens — ~150,000 words, ~500 pages|
|**<b>Max output (Opus 4.6/4.7/4.8)</b>**|128,000 tokens — extended with output-300k-2026-03-24 beta to 300K|
|**<b>Max output (Sonnet 4.6)</b>**|64,000 tokens; 300K with beta header|
|**<b>Max output (Haiku 4.5)</b>**|8,192 tokens standard|
|**<b>Token counting API</b>**|Use /v1/messages/count_tokens to pre-calculate before billing|
|**<b>Context auto-compaction</b>**|Claude Code compacts context at ~75-92% capacity — summarizes history|
|**<b>Cache minimum</b>**|1,024 tokens minimum to be eligible for prompt caching|
|**<b>Thinking tokens</b>**|Extended thinking tokens count toward max_tokens but previous thinking blocks are stripped|

## **Context Window Strategy for Architects** 

|**<b>Scenario</b>**|**<b>Architectural Recommendation</b>**|
|---|---|
|<b>Static system prompt</b>|Mark with cache_control: ephemeral — free cache refresh after 5 min, ~90% discount on hits|
|<b>Large reference document</b>|Chunk it — or cache the document in the context for repeated queries|
|<b>Long conversation history</b>|Implement server-side summarization at ~70% capacity; never rely on auto-compaction for API apps|

|<b>RAG retrieved chunks</b>|Inject at the end of the user message — after the static cached content|
|---|---|
|<b>Multi-modal inputs</b>|Images cost ~1,600 tokens each regardless of image size; PDFs counted per page|
|<b>Measuring actual usage</b>|Always log response.usage.input_tokens + output_tokens for cost tracking|

### **1.7 Constitutional AI & Safety Philosophy** 

Constitutional AI (CAI) is Anthropic's training methodology that embeds safety behaviors directly into the model rather than applying them as post-hoc filters. Understanding CAI is essential for Domain 5 of the CCA-F exam and for designing compliant enterprise applications. 

## **How Constitutional AI Works** 

|**<b>Phase</b>**|**<b>Description</b>**|
|---|---|
|1. RLHF (Base)|Standard reinforcement learning from human feedback to create a capable base model|
|2. Constitution|A set of principles ('the constitution') defining what makes Claude's responses good or bad|
|3. AI Feedback (RLAIF)|Claude critiques its own outputs against the constitution — no human labeling needed at scale|
|4. Revision|Claude revises responses based on its own constitutional critique|
|5. Fine-tuning|The revised outputs train the final model — safety behaviors are intrinsic, not a filter|

## **The Three-Tier Permission System** 

Claude's behavior is governed by a three-tier system. Each tier can only operate within the bounds set by the tier above it: 

|**<b>Tier</b>**|**<b>Authority Lev**|**el</b>**<br>**<**<br>**What They Control</b>**|
|---|---|---|
|<b>TIER 1<br>Anthropic|Highest authority|Sets absolute limits via Cons|
|(Training)</b>|||
|<b>TIER 2|Middle authority|Can adjust Claude's default|
|Operators|||
|(System Prompt)|</b>||
|<b>TIER 3|Lowest authority|Can adjust behaviors within|
|Users|||
|(Chat Messages)|</b>||

#### **Hard Limits (Cannot Be Overridden at Any Tier)** 

I Generating sexual content involving minors (CSAM) — absolute, no exceptions 

I Providing meaningful technical uplift for creating CBRN (chemical, biological, radiological, nuclear) weapons 

I Creating functional cyberweapons or malware designed to cause significant damage 

I Denying being an AI when a user sincerely and directly asks 

I Taking actions that undermine the ability of humans to oversee and correct AI systems 

I Assisting attempts to seize unprecedented societal control 

#### **Adjustable Default Behaviors (Operator-Configurable)** 

**<b>Behavior Category</b> <b>Examples</b>** <b>Default ON — operators CAN turn off</b> <b>Default OFF — operators CAN turn on</b> <b>Default OFF — users CAN turn on</b>Using crude/profane language; providing extremely blunt feedback without diplomatic softening 

### **1.8 Responsible Scaling Policy (RSP)** 

The Responsible Scaling Policy establishes the framework by which Anthropic decides when to train and deploy increasingly powerful models. It defines AI Safety Levels (ASL) that trigger specific safety requirements. Enterprise architects should understand this because it explains why certain capabilities are gated or restricted. 

|**<b>Level</b><b>Threshold</b>**|**<b>Implications</b>**|
|---|---|
|<b>ASL-1</b>Current commercial models|No extraordinary risks identified. Standard deployment permitted.|
|<b>ASL-2</b>Models approaching serious uplift for|CBRN or cyberweapons<br>Enhanced evaluations required. Standard deployment with monitoring.|
|<b>ASL-3</b>Models capable of serious CBRN upli|ft or autonomous replication<br>Strict security controls required before deployment. Not yet reached.|
|<b>ASL-4</b>Models posing catastrophic risk|Full capability control protocols required. Theoretical at this stage.|

**Enterprise Implication:** The RSP means that Anthropic proactively withholds certain capabilities if safety evaluations are not met — even if those capabilities are technically achievable. For example, Claude Mythos Preview (the most advanced frontier model) is restricted to trusted organizations via Project Glasswing due to cybersecurity concerns. 

### **1.9 Deployment Channels: Direct API, Bedrock, Vertex** 

Enterprise architects must choose the right deployment channel based on infrastructure, compliance, data residency, and operational requirements. Each channel offers different SLAs, IAM integrations, and data isolation guarantees. 

|**<b>Feature</b>**|**<b>Direct Anthropic API</b>**|**<b>Amazon Bedrock</b>**|**<b>Google Vertex AI</b>**|
|---|---|---|---|
|**Authentication**|ANTHROPIC_API_KEY|AWS IAM roles + Cognito|GCP service accounts + OAuth|
|**Network isolation**|Internet (TLS)|VPC endpoint + PrivateLink|VPC Service Controls|
|**Data residency**|Anthropic infrastructure|Your AWS account + region|Your GCP project + region|

|**Anthropic access to data**|Logging per retention policy|None — your VPC|None — your GCP project|
|---|---|---|---|
|**Compliance certs**|SOC 2 Type II|HIPAA, SOC 2, FedRAMP|HIPAA, SOC 2, ISO 27001|
|**Cost model**|Per-token billing|Per-token + Bedrock inferenc|e markup|
|**Per-token + Vertex markup**||||
|**Prompt caching**|Full support|Full support|Full support|
|**Batch API**|Yes|Yes (Batch Inference)|Yes (Batch predictions)|
|**Extended thinking**|Yes|Yes (beta headers)|Yes (beta headers)|
|**Rate limits**|Anthropic tiers|Bedrock service quotas|Vertex quotas|
|**Best for**|Startups, speed to market|AWS-native enterprise|GCP-native enterprise|

#### **Bedrock SDK Pattern — Python:** 

```
import boto3, json bedrock = boto3.client('bedrock-runtime', region_name='us-east-1') response =
bedrock.invoke_model( modelId='anthropic.claude-sonnet-4-6-20251101-v1:0', body=json.dumps({
'anthropic_version': 'bedrock-2023-05-31', 'max_tokens': 1024, 'messages': [{'role': 'user',
'content': 'Hello from Bedrock'}] }) ) result = json.loads(response['body'].read())
print(result['content'][0]['text'])
```

### **1.10 CCA-F Certification Pathway** 

The Claude Certified Architect — Foundations (CCA-F) is Anthropic's official certification for practitioners who design and build production Claude applications. It was launched in late 2025 through Anthropic Academy on the Skilljar platform. 

|**<b>Exam Code</b>**|CCA-F|
|---|---|
|**<b>Questions</b>**|60 multiple-choice|
|**<b>Duration</b>**|120 minutes|
|**<b>Passing Score</b>**|720 / 1,000 (approximately 72% — weighted by domain)|
|**<b>Proctoring</b>**|Online via Skilljar — webcam + screen share required|
|**<b>Retake Policy</b>**|14-day waiting period after a failed attempt|
|**<b>Validity</b>**|2 years from pass date|
|**<b>Prerequisites (recommende**|**d)</b>**3–6 months hands-on Claude development experience|
|**<b>Target Candidate</b>**|Solution architect designing/shipping production Claude applications|
|**<b>Platform</b>**|anthropic.skilljar.com — Anthropic Academy|

## **Exam Domain Weights — Know These Cold** 

**<b>Domain</b><b>Topic</b> <b>Weight</b><b>Study Strategy</b>** 

|<b>Domain 1</b><br>Claude API & SDK Integration|22%|Priority 1 — most questions; master Messages API, streaming, tool use, ca|
|---|---|---|
|<b>Domain 2</b><br>Prompt Engineering & Optimization|20%|Priority 2 — XML tags, few-shot, chain-of-thought, extended thinking, RAG|
|<b>Domain 3</b><br>Model Context Protocol (MCP)|18%|Priority 3 — hardest for most; tools/resources/prompts primitives, transport|
|<b>Domain 4</b><br>Agent Design & Orchestration|22%|Priority 1 — tied with Domain 1; CLAUDE.md, Skills, Subagents, multi-age|
|<b>Domain 5</b><br>Safety, Security & Responsible Deplo|yment<br>18%|Priority 3 — frequently underestimated; hard limits, privacy, hardening, RS|

## **Recommended Skilljar Course Completion Order** 

|**<b>**|**#</b>**<br>**<**<br>**Course</b>**|**<b>Level</b>**|**<b>Why It Matters</b>**|
|---|---|---|---|
|1|Claude 101|Beginner|Start here — core features, projects, file uploads, everyday Claude usage|
|2|Building with the Claude API|Intermediate|Most important course — covers full API from auth to agents|
|3|Claude in Amazon Bedrock|Intermediate|AWS-specific deployment, IAM, VPC, RAG on Bedrock|
|4|Introduction to Model Context Protocol|Intermediate|Three MCP primitives, Python SDK, MCP Inspector|
|5|MCP: Advanced Topics|Advanced|Sampling, transport layers, roots, production scaling|
|6|Claude Code in Action|Intermediate|Agentic coding, CLAUDE.md, GitHub workflows, thinking modes|
|7|Introduction to Agent Skills|Intermediate|SKILL.md frontmatter, description writing, distribution|
|8|Introduction to Subagents|Intermediate|Isolated contexts, delegation, structured outputs, limits|
