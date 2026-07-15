---
title: "Vol 5 — AI Strategy, Enterprise Transformation & Master Glossary"
date: 2026-07-15
date_created: 2026-07-15
last_reviewed: 2026-07-15
status: current
source_type: native-md
source_file: ""
tags: ["ai-strategy", "enterprise-transformation", "digital-transformation", "LLMOps", "AgentOps", "transformation-roadmap", "enterprise-glossary"]
doc_type: handbook-volume
series_name: Enterprise Strategy & Business Architecture Handbook
series_part: 5
series_total: 5
---

# Vol 5 — AI Strategy, Enterprise Transformation & Master Glossary

> **Covers:** The complete AI Strategy framework, AI Operating Model, AI transformation roadmap, enterprise transformation methodology, and a comprehensive A-Z glossary of every term used in this handbook — cross-referenced to source volumes.

---

## Part 1 — AI Strategy Framework

### 1.1 Why AI Strategy Is Different from Digital Strategy

Digital transformation was fundamentally about **channels and processes** — moving customer interactions online and automating manual steps. AI transformation is about **intelligence and autonomy** — fundamentally changing how decisions are made, knowledge is used, and work is executed.

```
DIGITAL TRANSFORMATION          AI TRANSFORMATION
"Move it online"                "Make it intelligent"

Focus: Channels, processes      Focus: Decisions, intelligence, autonomy
Outcome: Faster/cheaper         Outcome: Better decisions, new capabilities
Risk: Execution                 Risk: Accuracy, bias, safety, compliance
Speed: 3–5 year programs        Speed: Ongoing — models improve, evolve
Talent: Software engineers      Talent: ML engineers, data scientists, AI PMs
Cost model: CapEx project       Cost model: OpEx + inference at scale
```

### 1.2 The Five-Dimension AI Strategy Framework

A complete AI strategy has five interdependent dimensions:

```
AI STRATEGY — FIVE DIMENSIONS

┌─────────────────────────────────────────────────────────────────────┐
│                    AI VISION & STRATEGIC INTENT                     │
│     "What AI-enabled future are we building toward?"               │
└─────────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
   AI USE CASE           AI PLATFORM          AI GOVERNANCE
   PORTFOLIO             STRATEGY             & RESPONSIBLE AI
   "Which AI bets        "What infrastructure  "How do we govern
    to make?"             enables AI at scale?" AI safely?"
          │                   │                   │
          └───────────────────┼───────────────────┘
                              │
                              ▼
                     AI TALENT & CULTURE
                     "How do we build an
                      AI-fluent organization?"
```

### 1.3 AI Vision and Strategic Intent

**AI Vision** translates the corporate vision into what role AI will play in the organization's future.

**Framework — AI Vision Spectrum:**

```
AI VISION SPECTRUM

LEVEL 1: AI TOOL ADOPTION
"We use AI tools to make our people more productive"
→ Individual productivity; no structural change

LEVEL 2: AI-AUGMENTED OPERATIONS
"AI augments our processes and helps our people make better decisions"
→ Process transformation; human stays in loop

LEVEL 3: AI-NATIVE PROCESSES
"Key business processes are fundamentally redesigned around AI"
→ Most decisions AI-assisted; exceptions to human

LEVEL 4: AI-LED BUSINESS MODEL
"AI is central to our value proposition and revenue model"
→ AI creates the differentiation customers pay for

LEVEL 5: AI ECOSYSTEM ORCHESTRATOR
"We orchestrate an AI ecosystem that others build on"
→ Network effects; platform economics; AI moats
```

### 1.4 AI Use Case Portfolio

**AI Use Case Portfolio Management** applies portfolio thinking to AI investment — not all AI use cases deserve equal investment.

**AI Use Case Evaluation Matrix:**

| Criterion | Weight | Scoring (1–5) |
|-----------|--------|--------------|
| Strategic alignment | 25% | Does it advance a strategic objective? |
| Business value (NPV) | 25% | What is the measurable financial impact? |
| Data availability | 15% | Do we have the data to train/operate? |
| Technical feasibility | 15% | Can we build this with current tech? |
| Regulatory risk | 10% | Is this high-risk per EU AI Act or sector rules? |
| Time to value | 10% | How quickly does this pay back? |

**Use Case Portfolio Grid:**

```
AI USE CASE PORTFOLIO (Bank Example)

HIGH VALUE
    │
    │  STRATEGIC          QUICK
    │  BETS               WINS
    │  AI credit          AI document
    │  underwriting       extraction
    │  AI wealth mgmt     AI fraud alerts
    │  AI personalization
────┼────────────────────────────────── EASE OF IMPLEMENTATION →
    │
    │  DEFER              FOUNDATION
    │  General NLP        AI governance
    │  AI trade finance   Data platform
    │  (complex, low ROI) MLOps pipeline
    │
LOW VALUE
```

**Use Case Categories by Industry:**

| Industry | Quick Wins | Strategic Bets | Foundation |
|----------|-----------|----------------|------------|
| **Banking** | AI document processing, chatbots | AI credit, wealth AI, fraud AI | Data platform, governance |
| **Healthcare** | Clinical documentation AI | Diagnostic AI, predictive care | Health data platform |
| **Retail** | Search/recommendation AI | Demand forecasting, dynamic pricing | Customer data platform |
| **Manufacturing** | Predictive maintenance | Digital twin, quality AI | IoT + data infrastructure |
| **Telecom** | AI chatbot, churn prediction | Network AI, B2B advisor AI | Network data lake |

### 1.5 Build vs. Buy vs. Partner: AI Edition

The Build/Buy/Partner decision is more nuanced for AI than traditional software:

```
AI BUILD VS. BUY VS. PARTNER FRAMEWORK

BUY/USE (Off-the-shelf AI)
When to use:
• Commodity AI capabilities (OCR, translation, sentiment)
• No unique data advantage available
• Speed to market critical
• Cost of maintenance > benefit of customization
Examples: OpenAI API, AWS Rekognition, Azure Cognitive Services

PARTNER/CUSTOMIZE (Fine-tune or adapt existing models)
When to use:
• Industry-specific language/knowledge needed
• Moderate data advantage exists
• Some differentiation needed but not full control
Examples: Fine-tuning Claude/GPT on proprietary data
          RAG with proprietary knowledge base

BUILD (Custom AI development)
When to use:
• Proprietary data creates unique competitive advantage (VRIO test)
• Regulatory requirement for full model control
• Unique business problem not solved by existing models
• AI IS the product
Examples: Proprietary credit scoring model
          Custom recommendation engine
          Proprietary drug discovery model
```

---

## Part 2 — AI Operating Model

### 2.1 AI Operating Model Complete Framework

```
AI OPERATING MODEL — COMPLETE VIEW

GOVERNANCE LAYER
├── AI Strategy Alignment (links to corporate strategy)
├── AI Governance Board (oversight, risk, ethics, compliance)
├── Responsible AI Framework (fairness, explainability, safety)
└── AI Risk Register (per-model risk tracking)

ORGANIZATION LAYER
├── AI Center of Excellence (standards, enablement, evangelism)
├── AI Platform Team (builds/operates AI infrastructure)
├── AI Product Teams (embed AI into value streams)
└── AI Enablement (training, certification, support)

DELIVERY LAYER
├── AIDLC (AI Development Lifecycle)
│   Ideate → Validate → Build → Deploy → Operate → Retire
├── MLOps (traditional ML model lifecycle)
├── LLMOps (large language model lifecycle)
├── AgentOps (agentic AI lifecycle)
└── PromptOps (prompt versioning, A/B testing, governance)

PLATFORM LAYER
├── AI Foundation
│   ├── Model Registry (catalog of approved models)
│   ├── Inference Infrastructure (GPU, TPU, serverless)
│   └── AI Gateway (routing, rate limiting, cost control)
├── Data Foundation
│   ├── Feature Store (ML features)
│   ├── Vector Database (semantic search, RAG)
│   └── Knowledge Graph (entity relationships)
├── Observability
│   ├── Model Performance Monitoring
│   ├── Drift Detection
│   ├── Cost Attribution (AI FinOps)
│   └── Audit Logging
└── Security
    ├── Input Filtering (prompt injection, PII)
    ├── Output Validation (guardrails)
    └── Access Control (RBAC for AI)

TALENT LAYER
├── AI Roles (ML Engineer, Data Scientist, AI Architect, AI PM)
├── AI Literacy Program (all staff)
└── AI Ethics Training (governance, compliance roles)
```

### 2.2 MLOps, LLMOps, AgentOps Compared

| Dimension | MLOps | LLMOps | AgentOps |
|-----------|-------|--------|---------|
| **What it governs** | Traditional ML models | Large language models (GPT, Claude) | Agentic AI systems |
| **Training** | Regular retraining from data | Fine-tuning + RLHF; expensive | Prompt engineering + RAG; fast |
| **Deployment** | Model serving endpoints | API integration + prompt management | Agent orchestration + tool integration |
| **Monitoring** | Accuracy, drift, feature drift | Hallucination rate, cost/token, latency | Task completion, tool errors, loop detection |
| **Key tools** | MLflow, SageMaker, Vertex AI | LangSmith, PromptLayer, Weights & Biases | LangGraph, AutoGen, AWS Multi-Agent Orchestrator |
| **Risk** | Model drift, bias | Hallucination, prompt injection | Runaway agents, tool misuse, data exfil |
| **Cost driver** | Training compute | Inference tokens | Tokens + tool calls + workflow orchestration |
| **Governance** | Model cards, bias testing | Constitutional AI, guardrails | Human-in-the-loop, kill switch, policy enforcement |

### 2.3 PromptOps

**PromptOps** is the operational discipline for managing prompts in production LLM/GenAI systems:

```
PROMPTOPS LIFECYCLE

DESIGN
├── Prompt engineering (few-shot, chain-of-thought, system prompts)
├── Prompt testing (test suite with expected outputs)
└── Prompt review (accuracy, safety, tone)

VERSION CONTROL
├── Prompt version registry (git-like versioning for prompts)
├── A/B testing (compare prompt versions on live traffic)
└── Rollback capability (revert to prior version instantly)

DEPLOYMENT
├── Prompt deployment pipeline (staging → production)
├── Model-prompt binding (which model version with which prompt)
└── Feature flags (enable new prompts for segments)

MONITORING
├── Response quality monitoring
├── Token cost monitoring
├── Prompt injection detection
└── Output policy compliance checking
```

### 2.4 AI Centers of Excellence (AI CoE)

**AI CoE Charter:**

```
AI CENTER OF EXCELLENCE — CHARTER

MISSION: Enable responsible, scalable, and value-creating
         AI adoption across the enterprise.

RESPONSIBILITIES:
├── STANDARDS: Define AI development standards and guidelines
├── PLATFORM: Build and operate shared AI infrastructure
├── ENABLEMENT: Train and certify AI practitioners
├── GOVERNANCE: Run AI risk reviews and approvals
├── INNOVATION: Track emerging AI capabilities
└── EVANGELISM: Share success stories; drive adoption

WHAT THE AI CoE DOES NOT DO:
├── Own every AI project (AI CoE enables; teams execute)
├── Be the only team allowed to build AI
└── Create bureaucracy that slows adoption

OPERATING MODEL:
├── Federated model: AI CoE sets standards
├── Teams own their AI within those standards
├── AI CoE available for consulting support
└── ARB-equivalent review for high-risk AI
```

---

## Part 3 — Enterprise Transformation

### 3.1 Transformation Archetypes

**Four Enterprise Transformation Archetypes:**

| Archetype | Trigger | Scope | Duration |
|-----------|---------|-------|---------|
| **Digital Transformation** | Digital disruption, customer expectation change | Business model, channels, processes | 3–7 years |
| **AI Transformation** | AI capability availability, competitive pressure | Capabilities, processes, people, governance | 2–5 years |
| **Cloud Transformation** | Infrastructure modernization, cost, agility | Technology stack | 2–4 years |
| **Operating Model Transformation** | Strategic pivot, merger, efficiency mandate | Organization, process, governance | 2–4 years |

### 3.2 Transformation Phases (McKinsey / BCG Model)

```
ENTERPRISE TRANSFORMATION LIFECYCLE

PHASE 1: DIAGNOSE (Months 1–3)
├── Current state assessment
├── Capability gap analysis
├── Stakeholder interviews
├── Market benchmark
└── Transformation case (Why transform? Why now? Why us?)

PHASE 2: DESIGN (Months 3–6)
├── Target Operating Model design
├── Transformation roadmap
├── Business case finalization
├── Capability build plan
└── Change management plan

PHASE 3: MOBILIZE (Months 4–6)
├── Governance structure setup
├── Program team onboarding
├── Wave 1 initiatives launched
├── Platform foundations started
└── Communication program launched

PHASE 4: EXECUTE (Months 6–36)
├── Wave-by-wave delivery
├── Benefits realization tracking
├── Risk management
├── Change management
└── Continuous adaptation

PHASE 5: EMBED (Months 30–60)
├── Ways of working institutionalized
├── New capabilities at target maturity
├── Governance model operating
└── Benefits fully realized
```

### 3.3 Change Management: Kotter's 8-Step Model

**John Kotter's 8 Steps for Leading Change:**

```
KOTTER'S 8 STEPS

STEP 1: CREATE URGENCY
"Why must we transform? What happens if we don't?"
→ Build compelling case with data and competitive examples

STEP 2: BUILD GUIDING COALITION
"Who are the senior leaders who will champion this?"
→ Cross-functional coalition with real authority and credibility

STEP 3: FORM VISION AND STRATEGY
"Where are we going and how will we get there?"
→ Clear, compelling target state; credible roadmap

STEP 4: COMMUNICATE THE VISION
"How will everyone in the organization understand and commit?"
→ Multi-channel communication; leader-led; repeated; two-way

STEP 5: REMOVE BARRIERS
"What organizational barriers block the change?"
→ Structural barriers, resistant leaders, missing tools

STEP 6: GENERATE SHORT-TERM WINS
"What can we show within 3–6 months to build momentum?"
→ Quick wins visible to all; celebrated and publicized

STEP 7: BUILD ON THE CHANGE
"How do we avoid declaring victory too early?"
→ Each win launches next wave; maintain urgency through wins

STEP 8: ANCHOR CHANGES IN CULTURE
"How do we make the new way 'the way we do things here'?"
→ Connect behaviors to outcomes; promote people who embody change
```

### 3.4 AI Transformation Blueprint

```
AI TRANSFORMATION BLUEPRINT (Enterprise 18–36 month roadmap)

FOUNDATION (Months 1–6): BUILD TO LEARN
├── AI Strategy finalized and board-approved
├── AI CoE established (5–15 people)
├── AI platform foundation (MLOps, data pipeline, governance)
├── 3–5 pilot use cases: Quick wins + high-visibility
├── Responsible AI framework published
└── AI literacy program launched (all staff)

SCALE (Months 6–18): BUILD TO SCALE
├── AI use case factory: 10–15 use cases live
├── AI platform: Production-grade, multi-team
├── Data foundation: Feature store, vector DB, governance
├── MLOps + LLMOps + AgentOps operational
├── AI talent: 50+ AI practitioners embedded in teams
└── AI governance board: Monthly cadence

TRANSFORM (Months 18–36): AI-NATIVE OPERATIONS
├── Core processes redesigned around AI
├── Agentic AI in selected processes
├── AI-powered decision support for leadership
├── AI product operating model established
├── Benefits: $X realization against business case
└── AI capability maturity at Level 4+ in priority domains
```

### 3.5 AI Transformation Mapping: Every Strategy Concept

**How Strategy Concepts Evolve in the AI Era:**

```
STRATEGY CONCEPT → AI-ERA EVOLUTION

Vision
TRADITIONAL: "Become the most customer-centric bank"
AI-ERA: "Become the bank that knows you better than you know yourself,
          providing financial guidance before you ask for it"

Strategic Intent
TRADITIONAL: "Be the fastest loan approver in the market"
AI-ERA: "Instant, explainable AI credit for any SMB, anywhere, anytime"

Business Capabilities
TRADITIONAL: "Credit Assessment" (human underwriters)
AI-ERA: "AI-Augmented Credit" (AI assesses, human reviews exceptions)

Capability Maturity
TRADITIONAL: L1–L5 by process standardization
AI-ERA: L1 = No AI; L3 = AI-assisted; L5 = AI-led with human governance

Value Streams
TRADITIONAL: "Customer Gets a Loan" (14 days)
AI-ERA: "Customer Gets a Loan" (2 hours, straight-through for <$25K)

Operating Model
TRADITIONAL: Functional departments, handoffs, waterfalls
AI-ERA: Value stream teams + AI automation + human exception handling

Portfolio Management
TRADITIONAL: Project approval based on NPV
AI-ERA: AI use case portfolio: feasibility + data readiness + risk + value

Enterprise Governance
TRADITIONAL: ARB reviews technology; Risk reviews compliance
AI-ERA: AI Governance Board reviews models; ARB + AI CoE for architecture
         Responsible AI reviews fairness, bias, explainability

Organization Design
TRADITIONAL: Functional departments with dotted-line matrix
AI-ERA: Platform teams (AI platform, data platform) + value stream teams
         with embedded AI practitioners

Building Blocks
TRADITIONAL: CRM, ERP, ESB, database
AI-ERA: LLM API, vector store, agent framework, feature store, guardrails,
         model registry, AI gateway, prompt vault
```

---

## Part 4 — AI Transformation: Sector-Specific Mappings

### 4.1 Banking: AI Capability Map

```
BANKING AI CAPABILITY MAP

CUSTOMER INTELLIGENCE
├── AI Customer Segmentation (replacing rule-based RFM)
├── AI Churn Prediction (predicting at-risk customers)
├── AI Next Best Offer (personalized product recommendation)
└── AI Customer 360 (real-time unified view)

CREDIT & RISK
├── AI Credit Scoring (replacing scorecards for individuals + SMBs)
├── AI Portfolio Risk (real-time portfolio risk modeling)
├── AI Fraud Detection (real-time transaction monitoring)
└── AI AML/KYC (automated suspicious activity detection)

OPERATIONS
├── AI Document Processing (loan application, KYC document extraction)
├── AI Process Automation (straight-through processing)
├── AI Customer Service (AI agent for 80% of queries)
└── AI Code Generation (developer productivity, compliance code)

INTELLIGENCE & ANALYTICS
├── AI Market Intelligence (news + data analysis)
├── AI Regulatory Monitoring (regulation change detection)
├── AI Financial Planning (AI-assisted FP&A)
└── Generative AI Research (internal knowledge search)
```

### 4.2 Healthcare: AI Transformation Roadmap

```
HEALTHCARE AI TRANSFORMATION (36-month roadmap)

YEAR 1: ADMINISTRATIVE AI
├── AI clinical documentation (ambient AI in exam rooms)
├── AI scheduling optimization
├── AI claims processing and denial management
└── AI revenue cycle management
Value: $15–20M cost reduction; 2 hours/day saved per clinician

YEAR 2: CLINICAL AI (decision support)
├── AI diagnostic decision support (imaging, lab interpretation)
├── AI early warning systems (deterioration prediction)
├── AI medication management (dosing, interaction)
└── AI care pathway optimization
Value: Reduced adverse events; improved outcomes

YEAR 3: PREDICTIVE & POPULATION HEALTH
├── AI chronic disease prediction and prevention
├── AI readmission prediction
├── AI population health analytics
└── Agentic AI for care coordination
Value: Value-based care contract performance; patient outcomes
```

---

## Part 5 — Maturity Models

### 5.1 Enterprise Strategy Maturity Model

| Level | Name | Characteristics | Indicators |
|-------|------|----------------|------------|
| **1** | Ad Hoc | No formal strategy; reactive decisions | No strategic plan; budget allocated by politics |
| **2** | Developing | Annual planning exists; limited cascade | Strategy plan exists; not linked to budget |
| **3** | Defined | Strategy linked to budget and OKRs; quarterly reviews | Strategy tracked; governance in place |
| **4** | Managed | Data-driven strategy execution; adaptive | Real-time portfolio visibility; benefits tracked |
| **5** | World-Class | Continuous strategy learning; predictive | AI-assisted strategy; market-sensing capability |

### 5.2 Business Architecture Maturity Model

| Level | Name | Characteristics |
|-------|------|----------------|
| **1** | None | No business architecture practice |
| **2** | Reactive | Ad hoc capability maps created for specific projects |
| **3** | Managed | Formal BA practice; capability map maintained; value streams mapped |
| **4** | Integrated | BA integrated with EA, strategy, and portfolio governance |
| **5** | Advanced | AI-assisted BA; real-time capability analytics; continuous improvement |

### 5.3 AI Maturity Model (Full Detail)

| Level | Name | Characteristics | AI Use Cases | Governance |
|-------|------|----------------|-------------|-----------|
| **1** | AI Aware | Exploring AI; isolated experiments | ChatGPT for personal productivity | None |
| **2** | AI Experimenter | POCs running; no production AI | AI demos, proof of concepts | Ad hoc |
| **3** | AI Deployer | First production AI systems; some value | Document AI, chatbots live | Initial policies |
| **4** | AI Practitioner | AI in multiple core processes; ROI proven | AI credit, fraud AI, ops AI | AI governance board |
| **5** | AI Native | AI in core value proposition; AI operating model | AI-first processes, agentic AI | Responsible AI embedded |
| **6** | AI Leader | Setting industry standards; AI ecosystem | AI platform-as-a-service | Industry governance leadership |

---

## Part 6 — Master Glossary: A–Z

*This glossary covers all terms used across the five volumes, with cross-references to the relevant section.*

---

**A**

**Agile Release Train (ART)** — A SAFe team-of-teams aligned to a development value stream, delivering every 8–12 weeks. → [Vol 3, Part 5]

**AgentOps** — The operational discipline for managing agentic AI systems in production — covering deployment, monitoring, memory, guardrails, and lifecycle management. → [Vol 5, Part 2]

**AI Center of Excellence (AI CoE)** — A centralized team providing AI standards, platform services, enablement, and governance to the enterprise. → [Vol 5, Part 2]

**AI Governance Board** — A formal committee overseeing AI use, responsible AI, and AI risk across the enterprise. → [Vol 3, Part 6]

**AI Operating Model** — The combination of organization, processes, platforms, talent, and governance needed to develop and operate AI capabilities at scale. → [Vol 5, Part 2]

**AI Strategy** — The strategic framework for how an organization will develop, deploy, govern, and extract value from Artificial Intelligence. → [Vol 1, Part 8]

**Ansoff Matrix** — A strategy framework presenting four growth options: market penetration, market development, product development, and diversification. → [Vol 4, Part 3]

**Architecture Building Block (ABB)** — An abstract, specification-level architectural component in TOGAF. → [Vol 2, Part 9]

**Architecture Review Board (ARB)** — A governance body that reviews and approves technology and architecture decisions against enterprise standards. → [Vol 3, Part 6]

**B**

**Balanced Scorecard** — A multi-perspective strategy measurement framework (Financial, Customer, Internal Processes, Learning & Growth) developed by Kaplan & Norton. → [Vol 4, Part 4]

**BCG Growth-Share Matrix** — A portfolio analysis tool classifying business units as Stars, Cash Cows, Question Marks, or Dogs. → [Vol 4, Part 3]

**Benefits Realization Management (BRM)** — The practice of defining, tracking, and confirming that business benefits committed in a business case are actually achieved. → [Vol 3, Part 3]

**BIZBOK** — Business Architecture Body of Knowledge, the professional standard published by the Business Architecture Guild. → [Vol 2, Part 1]

**Blue Ocean Strategy** — A strategy framework (Kim & Mauborgne) for creating uncontested market space rather than competing in existing markets. → [Vol 4, Part 3]

**Bounded Context** — A DDD concept defining the explicit boundary within which a domain model is valid. → [Vol 2, Part 4]

**Business Architecture** — The practice of defining how an organization creates and delivers value through its capabilities, processes, information, and governance. → [Vol 2, Part 1]

**Business Capability** — What an organization is able to do, expressed independently of how it is done. → [Vol 2, Part 2]

**Business Case** — The documented justification for an investment, covering strategic, economic, commercial, financial, and management dimensions. → [Vol 3, Part 2]

**Business Domain** — A bounded area of business knowledge and activity that is cohesive and distinct from other domains. → [Vol 2, Part 4]

**Business Model Canvas** — Osterwalder's nine-block framework for designing how an organization creates, delivers, and captures value. → [Vol 2, Part 5]

**Business Strategy** — The strategy for a specific business unit defining how it will compete within its market. → [Vol 1, Part 8]

**C**

**Capability Heat Map** — A visualization overlaying multiple data dimensions (maturity, strategic importance, investment) onto a capability map. → [Vol 2, Part 2]

**Capability Map** — A structured, hierarchical visualization of all capabilities an organization must have to deliver its strategy. → [Vol 2, Part 2]

**Capability Maturity** — A 1–5 assessment of how well an organization executes a specific capability. → [Vol 2, Part 2]

**Center of Excellence (CoE)** — A centralized team providing specialized expertise, standards, and tools for a capability domain. → [Vol 2, Part 6]

**Change Management** — The structured approach to transitioning individuals and organizations from a current state to a desired future state. → [Vol 5, Part 3]

**Cloud Strategy** — The framework for how an organization uses cloud platforms to deliver technology capabilities. → [Vol 1, Part 8]

**Context Map** — A DDD artifact showing how bounded contexts relate to each other. → [Vol 2, Part 4]

**Corporate Strategy** — The highest-level strategy defining the scope of the enterprise — which businesses to be in and how to create synergies. → [Vol 1, Part 8]

**Cost of Delay** — The economic impact of deferring a feature or initiative. → [Vol 3, Part 5]

**Customer Journey Map** — A visualization of the end-to-end customer experience across all touchpoints and channels. → [Vol 2, Part 11]

**D**

**Data Strategy** — The framework for how an organization collects, stores, governs, and monetizes data as a strategic asset. → [Vol 1, Part 8]

**Digital Factory** — A dedicated organizational unit designed to accelerate digital product delivery. → [Vol 2, Part 6]

**Digital Strategy** — The plan for using digital technologies to transform business models, customer experiences, and operational capabilities. → [Vol 1, Part 8]

**Digital Transformation** — Enterprise-wide change using digital technologies to create new or modify existing business processes and customer experiences. → [Vol 5, Part 3]

**Domain-Driven Design (DDD)** — A software design approach (Eric Evans) that models software around business domains. → [Vol 2, Part 4]

**E**

**Enterprise Architecture** — The ongoing practice of defining, communicating, and governing the relationship between an organization's strategy, capabilities, and technology investments. → [Vol 2, Part 1]

**Enterprise Portfolio** — The full inventory of all strategic investments, programs, and initiatives across the enterprise. → [Vol 3, Part 1]

**Epic** — A large user-visible capability in SAFe, spanning one or more program increments. → [Vol 3, Part 5]

**EPMO** — Enterprise Portfolio Management Office — operates at corporate level to govern the enterprise portfolio. → [Vol 3, Part 4]

**F**

**Feature** — A user-visible functionality in SAFe, delivered within one Program Increment (PI). → [Vol 3, Part 5]

**Federated Governance** — A governance model combining central standards with local decision-making autonomy. → [Vol 3, Part 6]

**Five Forces** — Porter's framework assessing industry attractiveness through five competitive forces. → [Vol 4, Part 2]

**Functional Strategy** — Strategy for a specific function (Finance, HR, Technology, etc.) aligned to business strategy. → [Vol 1, Part 8]

**G**

**Governance** — The system of accountability, decision rights, processes, and oversight ensuring the organization acts per its values and objectives. → [Vol 3, Part 6]

**H**

**Horizon 3 Framework** — McKinsey's three-horizon model for balancing investment in core, emerging, and future growth areas. → [Vol 1, Part 7]

**Hoshin Kanri** — A strategy deployment methodology using X-matrices and catchball to cascade strategy through the organization. → [Vol 4, Part 4]

**Human-in-the-Loop (HITL)** — A governance pattern requiring human review or approval at defined points in an AI workflow. → [Vol 5, Part 2]

**I**

**Innovation Strategy** — The framework for identifying, funding, incubating, and scaling new ideas from incremental to transformational. → [Vol 1, Part 8]

**Investment Planning** — The annual cycle of identifying, evaluating, prioritizing, and funding strategic initiatives. → [Vol 3, Part 2]

**Issue Tree** — A hierarchical decomposition of a business problem used in consulting (McKinsey/BCG). → [Vol 4, Part 8]

**K**

**KPI (Key Performance Indicator)** — A measurable value demonstrating how effectively an organization is achieving a key business objective. → [Vol 1, Part 11]

**L**

**Lean Portfolio Management (LPM)** — The SAFe approach to connecting strategy to agile execution through value streams and decentralized funding. → [Vol 3, Part 5]

**LLMOps** — The operational discipline for managing large language models in production — covering model selection, prompt management, cost control, and safety. → [Vol 5, Part 2]

**M**

**MECE** — Mutually Exclusive, Collectively Exhaustive — McKinsey's principle for structuring analyses with no overlaps and no gaps. → [Vol 4, Part 8]

**Mission** — A statement describing what an organization does today, for whom, and why. → [Vol 1, Part 3]

**MLOps** — The operational discipline for managing traditional machine learning models in production. → [Vol 5, Part 2]

**N**

**Net Present Value (NPV)** — The sum of all discounted future cash flows minus initial investment. → [Vol 3, Part 2]

**Net Promoter Score (NPS)** — A customer loyalty metric measuring the likelihood of recommending an organization to others. → [Vol 4, Part 8]

**O**

**OKR (Objectives and Key Results)** — A goal-setting framework connecting strategic objectives to measurable key results at all levels of the organization. → [Vol 4, Part 4]

**Operating Model** — The combination of capabilities, processes, people, technology, governance, and information that creates and delivers value. → [Vol 2, Part 7]

**P**

**PESTLE** — A macro-environmental analysis framework covering Political, Economic, Social, Technological, Legal, and Environmental factors. → [Vol 4, Part 2]

**Platform Strategy** — The strategy for building or participating in multi-sided platforms that create network effects. → [Vol 1, Part 8]

**PMO** — Project Management Office — provides templates, standards, governance, and coordination for project delivery. → [Vol 3, Part 4]

**Porter's Generic Strategies** — Porter's three competitive positions: Cost Leadership, Differentiation, and Focus. → [Vol 4, Part 3]

**Porter's Value Chain** — A model decomposing an organization into primary and support activities to identify competitive advantage. → [Vol 2, Part 3]

**Portfolio Management** — Centralized management of an organization's strategic investments to maximize collective value. → [Vol 3, Part 1]

**Product Strategy** — The framework for which products to build, for which customers, at which price points, and through which channels. → [Vol 1, Part 8]

**Program** — A group of related projects managed to obtain benefits not available from managing them individually. → [Vol 3, Part 3]

**PromptOps** — The operational discipline for managing prompts in production LLM systems, including versioning, A/B testing, and monitoring. → [Vol 5, Part 2]

**Purpose** — An organization's fundamental reason for being beyond financial returns. → [Vol 1, Part 4]

**R**

**RACI** — A decision rights matrix: Responsible, Accountable, Consulted, Informed. → [Vol 3, Part 6]

**RAID Log** — Program tracking artifact: Risks, Assumptions, Issues, Dependencies. → [Vol 3, Part 9]

**Responsible AI** — The practice of developing and deploying AI in a way that is fair, transparent, accountable, explainable, and safe. → [Vol 5, Part 2]

**Roadmap** — A temporal visualization of when initiatives, capabilities, and platforms will be delivered to achieve strategic intent. → [Vol 1, Part 7]

**S**

**SAFe (Scaled Agile Framework)** — A framework for applying Lean-Agile principles at enterprise scale. → [Vol 3, Part 5]

**Scenario Planning** — A strategy technique building multiple plausible futures to test strategy robustness. → [Vol 4, Part 2]

**Service Blueprint** — An extension of the customer journey map revealing the behind-the-scenes processes and systems. → [Vol 2, Part 11]

**Solution Building Block (SBB)** — A concrete, implemented architectural component in TOGAF. → [Vol 2, Part 9]

**Strategic Initiative** — A funded, time-bound effort designed to achieve one or more strategic objectives. → [Vol 1, Part 7]

**Strategic Intent** — An organization's bold, specific competitive ambition for a defined medium-term horizon. → [Vol 1, Part 5]

**Strategic Objective** — A specific, measurable outcome the organization commits to achieving within a planning period. → [Vol 1, Part 6]

**Strategic Portfolio** — The enterprise's full inventory of strategic initiatives, programs, and transformation efforts. → [Vol 1, Part 7]

**Strategic Priority** — A ranked choice within strategic themes, determining what gets funded and executed first. → [Vol 1, Part 6]

**Strategic Roadmap** — The temporal visualization of when capabilities, initiatives, and enablers will be delivered. → [Vol 1, Part 7]

**Strategic Theme** — One of 3–7 categories into which an organization groups its strategic work. → [Vol 1, Part 6]

**SWOT** — A situation analysis framework: Strengths, Weaknesses, Opportunities, Threats. → [Vol 4, Part 2]

**T**

**Target Operating Model (TOM)** — The future-state design of how an organization will operate. → [Vol 2, Part 7]

**TOGAF** — The Open Group Architecture Framework — the most widely adopted enterprise architecture framework globally. → [Vol 4, Part 5]

**Transformation Office** — A senior leadership structure leading large-scale enterprise transformation programs. → [Vol 3, Part 4]

**V**

**Value Chain** — Porter's model decomposing an organization into strategically relevant activities. → [Vol 2, Part 3]

**Value Proposition Canvas** — Osterwalder's tool for ensuring fit between customer needs and value offered. → [Vol 2, Part 5]

**Value Stream** — An end-to-end sequence of activities creating value for a specific stakeholder. → [Vol 2, Part 3]

**Vision** — A vivid, compelling description of the organization's desired future state. → [Vol 1, Part 2]

**VRIO** — A resource-based framework assessing whether a capability creates sustainable competitive advantage (Valuable, Rare, Inimitable, Organized). → [Vol 4, Part 3]

**W**

**Wardley Mapping** — A strategic situational awareness tool mapping capabilities by visibility and evolutionary stage. → [Vol 4, Part 3]

**Weighted Shortest Job First (WSJF)** — SAFe's prioritization formula: Cost of Delay / Job Duration. → [Vol 3, Part 5]

**Z**

**Zachman Framework** — A classification schema for organizing architecture artifacts by perspective (who, what, how, where, when, why) and stakeholder level. → [Vol 4, Part 5]

---

## Part 7 — Cross-Reference Matrix

### 7.1 Concept × Concept Relationships

| Concept A | Relationship | Concept B |
|-----------|-------------|-----------|
| Vision | Achieved through | Mission execution |
| Mission | Operationalizes | Strategic Intent |
| Strategic Intent | Expressed in | Strategic Themes |
| Strategic Themes | Prioritized into | Strategic Priorities |
| Strategic Priorities | Measured by | Strategic Objectives |
| Strategic Objectives | Achieved by | Strategic Initiatives |
| Strategic Initiatives | Grouped into | Programs |
| Programs | Decomposed into | Projects |
| Business Strategy | Defines requirements for | Capabilities |
| Capabilities | Delivered by | Value Streams |
| Value Streams | Executed through | Business Processes |
| Business Processes | Supported by | Applications |
| Applications | Run on | Technology Platforms |
| Capability Gaps | Drive | Strategic Initiatives |
| TOM | Realized through | Transformation Programs |
| Portfolio | Contains | Programs + Projects + Initiatives |
| AI Strategy | Translates into | AI Use Case Portfolio |
| AI Use Cases | Require | AI Platform Capabilities |
| AI Platform | Governed by | AI Governance Board |
| OKR | Executes | Strategic Objectives |
| Balanced Scorecard | Measures | Strategy |

### 7.2 Alternative Terminology Cross-Reference

Different organizations and consulting firms use different words for the same concept:

| BIZBOK Term | McKinsey Term | SAFe Term | Gartner Term | TOGAF Term |
|-------------|--------------|-----------|-------------|-----------|
| Business Capability | Capability | Enabler | Business Capability | Business Architecture BBs |
| Value Stream | Value Chain | Value Stream | Value Stream | Business Architecture |
| Business Function | Business Unit | Value Stream | Business Process Group | Business Unit |
| Operating Model | Operating Model | ART Structure | Organizational Model | Business Architecture |
| Strategic Initiative | Program | Portfolio Epic | Initiative | Strategic Architecture |
| Benefits Realization | Value Capture | OKR achievement | Business Value | Architecture Benefits |

---

*← Return to [Handbook Index](./index)*

*This concludes the Enterprise Strategy & Business Architecture Handbook, Vol 1–5.*

---

## Appendix — Decision Trees

### A.1 Which Strategy Framework Should I Use?

```
WHAT IS THE PRIMARY QUESTION?

"What's happening in our environment?"
    → PESTLE + Porter's Five Forces

"What strategy should we choose?"
    → Ansoff Matrix + Porter's Generic Strategies + Blue Ocean

"How do we prioritize our business units?"
    → BCG Growth-Share Matrix

"Do we have a sustainable competitive advantage?"
    → VRIO Framework

"Why are we misaligned as an organization?"
    → McKinsey 7S

"How do we measure strategy execution?"
    → OKR + Balanced Scorecard

"Where should our technology be heading?"
    → Wardley Mapping

"How do we design our organization?"
    → Operating Model Design + Galbraith Star Model

"How do we plan AI investment?"
    → AI Use Case Portfolio + Wardley Map for AI

"How do we govern our enterprise architecture?"
    → TOGAF ADM
```

### A.2 Which Operating Model Pattern Should I Use?

```
WHAT IS YOUR TRANSFORMATION CONTEXT?

Single product, single market, fast-moving
    → Platform + Product Teams (Team Topologies model)

Multi-BU, diverse markets, moderate change
    → Federated model with central standards

Highly regulated, safety-critical
    → Centralized governance with controlled autonomy

Start-up or digital native
    → Squad model (Spotify-inspired)

Traditional enterprise modernizing
    → Bimodal: Run Mode 1 (stability) + Mode 2 (speed)

AI-first transformation
    → AI CoE + Embedded AI in value stream teams
```
