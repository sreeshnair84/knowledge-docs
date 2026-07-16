---
title: "Vol 10 — Relationship Maps, Comparisons & Enterprise Glossary"
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["relationships", "glossary", "concept-hierarchy", "comparisons", "cross-reference", "definitions", "terminology"]
doc_type: handbook-volume
series_name: Enterprise Strategy & Business Architecture Handbook
series_part: 10
series_total: 10
series_index: ./index.md
---

# Vol 10 — Relationship Maps, Comparisons & Enterprise Glossary

> **Covers:** Complete enterprise concept hierarchy maps; 30+ pairwise concept comparisons clarifying the most commonly confused terms; terminology cross-reference across McKinsey, TOGAF, BIZBoK, SAFe, and Gartner; and a 250+ term enterprise glossary covering strategy, architecture, AI, and delivery domains. The definitive reference for precise enterprise language.

---

## Part 1 — Concept Hierarchy Maps

### 1.1 Strategy Hierarchy

```
ENTERPRISE CONTEXT
└── Vision  (10–25 year aspiration: "What do we want to become?")
    └── Mission  (Why we exist: "What do we do and for whom?")
        └── Purpose  (Why it matters: "Why does this matter beyond profit?")
            └── Strategic Intent  (Competitive ambition: "Where do we want to lead?")
                └── Corporate Strategy  (How to compete: "What is our theory of winning?")
                    └── Strategic Themes  (Annual focus areas: "What are this year's priorities?")
                        └── Strategic Priorities  (Ranked focus within themes)
                            └── Strategic Objectives  (Measurable outcomes: "What must change?")
                                └── Strategic Initiatives  (Programs enabling objectives)
                                    └── Programs  (Group of related projects)
                                        └── Projects  (Temporary; defined deliverable)
                                            └── Epics  (Large body of user work)
                                                └── Features  (User-visible capabilities)
                                                    └── Stories  (Development units)
                                                        └── Tasks  (Implementation activities)
```

---

### 1.2 Business Architecture Hierarchy

```
ENTERPRISE
└── Business Domain  (Major area of business activity: "Finance", "Customer", "Operations")
    └── Business Capability Level 1  (e.g., "Customer Management")
        └── Business Capability Level 2  (e.g., "Customer Acquisition")
            └── Business Capability Level 3  (e.g., "Lead Generation")
                └── Business Process / Value Stream  (How the capability is executed)
                    └── Business Activity  (Step within a process)
                        └── Business Rule  (Constraint governing the activity)
                        └── Business Event  (Trigger for the activity)
                        └── Business Decision  (Choice point within the activity)
```

---

### 1.3 Application Architecture Hierarchy

```
ENTERPRISE APPLICATION LANDSCAPE
└── Application Domain  (Grouping of related systems: "CRM Domain", "ERP Domain")
    └── Application / System  (Named enterprise system: "Salesforce", "SAP S/4HANA")
        └── Application Module  (Functional subset: "Sales Cloud", "Service Cloud")
            └── Component / Service  (Deployable unit of functionality)
                └── API / Interface  (Contract for interacting with the component)
                    └── Operation / Endpoint  (Specific callable function)
                        └── Data Object / Schema  (Data exchanged via the API)
```

---

### 1.4 Technology Architecture Hierarchy

```
ENTERPRISE TECHNOLOGY LANDSCAPE
└── Infrastructure Domain  ("Cloud", "Network", "Compute", "Storage")
    └── Platform  ("AWS", "Azure", "GCP", "On-Premise Data Centre")
        └── Technology Building Block (ABB)  ("Container Platform", "Message Broker")
            └── Service / Product (SBB)  ("AWS EKS", "Apache Kafka", "PostgreSQL")
                └── Instance / Cluster  (Specific deployment)
                    └── Configuration  (Settings, policies, versions)
```

---

### 1.5 AI Architecture Hierarchy

```
AI STRATEGY LAYER
└── AI Strategic Theme  (e.g., "AI-First Customer Experience")
    └── AI Capability  (e.g., "Personalised Recommendation")
        └── AI Use Case  (e.g., "Next Best Offer for Retail Banking Customers")
            └── AI System / Product  (e.g., "Offers AI v2.1")
                └── AI Building Block  (e.g., "LLM Gateway", "Vector Database")
                    └── Model / Agent / Pipeline  (e.g., "Claude Sonnet", "Fraud Agent")
                        └── Prompt / Tool / Memory  (e.g., "fraud-analysis-prompt-v2")
```

---

### 1.6 Governance Hierarchy

```
BOARD OVERSIGHT
└── Executive Committee  (CEO + C-Suite)
    └── Investment Committee  (Capital allocation authority)
        └── Architecture Review Board (ARB)  (Technical standards governance)
        └── AI Governance Board  (AI risk and policy governance)
        └── Data Governance Council  (Data policy governance)
            └── Domain Governance Forum  (Function/domain-level governance)
                └── Team-Level Standards  (Development standards, definition of done)
```

---

## Part 2 — Concept Comparisons

### 2.1 Strategy vs. Tactic

| Dimension | Strategy | Tactic |
|-----------|---------|--------|
| **Time horizon** | Long-term (3-10 years) | Short-term (weeks to months) |
| **Scope** | Organization-wide | Function or team |
| **What it decides** | Where to play; how to win | How to execute within chosen approach |
| **Changes when** | Competitive environment changes | Strategy changes or better methods found |
| **Example** | "Win in digital-first banking by 2028" | "Launch mobile-first onboarding this quarter" |

**The Confusion:** People often call tactical choices "strategies." A pricing discount is a tactic. A decision to compete on price as a market positioning is a strategy.

---

### 2.2 Vision vs. Mission vs. Purpose

| Dimension | Vision | Mission | Purpose |
|-----------|--------|---------|---------|
| **Question answered** | What do we want to become? | What do we do and for whom? | Why does this matter beyond money? |
| **Time horizon** | 10-25 years | 5-10 years | Permanent / timeless |
| **Tone** | Aspirational, inspirational | Descriptive, operational | Motivational, moral |
| **Changes when** | Achieved or worldview shifts | Business model changes | Almost never |
| **Bad example** | "Be the best bank" | "We provide banking services" | "Profit for shareholders" |
| **Good example** | "Financial empowerment for every person" | "We lend responsibly to people banks overlook" | "We believe everyone deserves a fair chance" |

---

### 2.3 Goal vs. Objective vs. KPI

| Dimension | Goal | Objective | KPI |
|-----------|------|-----------|-----|
| **Definition** | Broad desired outcome | Specific, measurable desired outcome | Metric tracking progress toward objective |
| **Time bound** | Often not explicitly | Yes (quarter, year) | Measured at specific intervals |
| **Measurability** | Qualitative acceptable | Must be quantifiable | Is the measurement |
| **Hierarchy** | Goals contain objectives | Objectives contain KPIs | Measures progress |
| **Example** | "Improve customer experience" | "Reduce customer effort score by 15% by Q4" | "Customer Effort Score = 3.2 (target: 2.7)" |

---

### 2.4 Capability vs. Function vs. Process

| Dimension | Capability | Function | Process |
|-----------|-----------|---------|---------|
| **What it is** | What the organization *can do* | Organizational unit responsible for work | Sequence of activities producing an outcome |
| **Stability** | Stable (doesn't change when org changes) | Changes with org design | Changes with optimization |
| **Owner** | Architecture / Business | HR / Org Design | Operations / Process Excellence |
| **Technology neutral** | Yes — defines *what*, not *how* | No — often names systems | Sometimes — may reference systems |
| **Example** | "Credit Underwriting" | "Credit Risk Department" | "Receive application → Verify identity → Score → Decide → Notify" |

**Why it matters:** Capabilities are the stable reference for architecture; functions and processes are expressions of capabilities in a specific organizational context. When the org reorganizes, capabilities remain — only the function assignment changes.

---

### 2.5 Initiative vs. Program vs. Project

| Dimension | Initiative | Program | Project |
|-----------|-----------|---------|---------|
| **Definition** | Strategic investment area (umbrella) | Coordinated group of related projects | Temporary endeavour with defined output |
| **Time horizon** | 1-5 years | 1-3 years | 3-18 months |
| **Output** | Strategic capability / change | Business outcomes exceeding individual projects | Specific deliverable |
| **Managed by** | Transformation Office / Strategy | Programme Director (PRINCE2) | Project Manager |
| **Example** | "AI Transformation Initiative" | "Customer AI Programme" | "AI Chatbot Deployment Project" |

---

### 2.6 Portfolio vs. Program

| Dimension | Portfolio | Program |
|-----------|-----------|---------|
| **What it groups** | Programs + projects + operations aligned to a theme | Related projects managed coordinatedly |
| **Relationship** | Strategic investment vehicle | Delivery vehicle |
| **Change when** | Strategy changes | Scope changes |
| **Governance** | Portfolio Board; Investment Committee | Programme Board |
| **Success measured by** | Strategic outcomes; ROI | Benefits realization; delivery quality |

---

### 2.7 Platform vs. Product

| Dimension | Platform | Product |
|-----------|---------|---------|
| **Value creation** | Enables others to create value | Directly delivers value to users |
| **Consumers** | Developers, builders, other teams | End users |
| **Success metric** | Number of products/services built on it; adoption rate | User satisfaction; NPS; revenue |
| **Monetization** | Consumption (API calls, usage); seats; revenue share | License; subscription; one-time purchase |
| **Ownership** | Platform team | Product team |
| **Example** | AWS (enables 1M+ services); Salesforce Platform | Salesforce Sales Cloud |

---

### 2.8 Building Block vs. Component

| Dimension | Building Block | Component |
|-----------|---------------|-----------|
| **Abstraction level** | Architecture level (ABB = capability; SBB = solution) | Design / implementation level |
| **Purpose** | Defines reusable, composable capability unit | Implementation unit of a system |
| **Standard** | TOGAF Building Block concept | Software engineering concept (microservice, module) |
| **Reusability scope** | Enterprise-wide | Within an application |
| **Example** | "API Gateway" ABB → "Kong" SBB | Kong's routing component, auth component |

---

### 2.9 Architecture vs. Design

| Dimension | Architecture | Design |
|-----------|-------------|--------|
| **Level** | System-wide; strategic decisions | Detailed; implementation decisions |
| **Changes frequently?** | No — stable, costly to change | Yes — iterates through development |
| **Audience** | Architects, executives, governance | Developers, tech leads |
| **Timeframe** | Years | Sprints to months |
| **Example** | "We use microservices with an event bus" | "The payment service uses Kafka topic 'transactions' with Avro schema v3" |

---

### 2.10 Business Architecture vs. Enterprise Architecture

| Dimension | Business Architecture | Enterprise Architecture |
|-----------|----------------------|------------------------|
| **Scope** | Business strategy, capabilities, processes, org | All four domains: business, data, application, technology |
| **Primary focus** | What the business does; why and how | How all systems work together to enable the business |
| **Frameworks** | BIZBoK, BIZBOK, Lean Business Architecture | TOGAF, Zachman, FEAF |
| **Owner** | Business Architect (BA domain) | Enterprise Architect |
| **Output** | Capability maps, value streams, operating model | Architecture blueprints across all domains |

---

### 2.11 Operating Model vs. Organization Structure

| Dimension | Operating Model | Organization Structure |
|-----------|----------------|----------------------|
| **Definition** | How the organization delivers value (people + process + technology + data + governance) | How people are grouped and who reports to whom |
| **Components** | 5+ dimensions (see Vol 6) | Boxes and lines; spans and layers |
| **Stability** | Moderately stable | Changes with leadership |
| **Designed by** | Strategy + Architecture + HR together | CEO + CHRO |
| **The relationship** | Operating model determines what structure is needed | Organization structure implements the operating model |

---

### 2.12 Reference Architecture vs. Solution Architecture

| Dimension | Reference Architecture | Solution Architecture |
|-----------|----------------------|----------------------|
| **Purpose** | Prescriptive pattern for a class of problems | Specific design for a specific system |
| **Reusability** | High — used across multiple solutions | Low — specific to one implementation |
| **Level of detail** | High-level; conceptual | Detailed; implementation-ready |
| **Owner** | Enterprise / Platform Architecture team | Solution / Project Architect |
| **Example** | "Enterprise AI Platform Reference Architecture" | "Claims Processing AI Solution Architecture v2.3" |

---

### 2.13 Segment vs. Sector vs. Industry vs. Market

| Term | Definition | Example |
|------|-----------|---------|
| **Industry** | Broad grouping of companies with similar business activities | Financial Services |
| **Sector** | Sub-grouping within industry | Banking; Insurance; Asset Management |
| **Market** | The buyers and sellers of a specific product or service | UK retail mortgage market |
| **Segment** | Subset of a market with distinct characteristics | First-time buyer mortgage segment |

---

### 2.14 Business Unit vs. Division vs. Department

| Term | Typical Definition | P&L? | Scale |
|------|--------------------|------|-------|
| **Business Unit (BU)** | Semi-autonomous organizational entity with own strategy | Often yes | Medium to large |
| **Division** | Major organizational subdivision (by product, geography, or market) | Yes | Large |
| **Department** | Functional grouping within a business unit | No | Small to medium |

---

### 2.15 Roadmap vs. Plan vs. Schedule

| Term | Definition | Detail Level | Owner |
|------|-----------|--------------|-------|
| **Roadmap** | Strategic view of what will be built/changed over time, at what quarter/half level | Low-medium | Product / Strategy |
| **Plan** | Detailed articulation of activities, owners, and sequencing | High | Project Manager |
| **Schedule** | Specific dates and milestones for delivery | Very high | Project Manager |

---

### 2.16 AI Model vs. AI System vs. AI Product

| Term | Definition | Example |
|------|-----------|---------|
| **AI Model** | Mathematical function trained on data to make predictions or generate content | GPT-4, Random Forest, BERT |
| **AI System** | Model + infrastructure + data + interfaces that make the model usable | Fraud detection system: model + API + monitoring + retrain pipeline |
| **AI Product** | AI system wrapped with UX, business logic, and go-to-market; sold or used as a product | Grammarly, GitHub Copilot, ChatGPT |

---

### 2.17 Agent vs. Assistant vs. Copilot vs. Bot

| Term | Definition | Autonomy | Examples |
|------|-----------|----------|---------|
| **Bot** | Rule-based automated process; no LLM | None — follows rules | RPA bot, FAQ chatbot (pre-LLM) |
| **Assistant** | LLM-powered conversational interface; single-turn or multi-turn | Low — executes when asked | ChatGPT, Google Gemini |
| **Copilot** | AI embedded in a workflow tool; assists human completing tasks | Low-Medium — suggests; human accepts/rejects | GitHub Copilot, Microsoft 365 Copilot |
| **Agent** | Autonomous AI that plans and executes multi-step tasks; uses tools; takes action | High — acts without step-by-step instruction | Claude Code, Devin, AutoGPT |

---

### 2.18 LLM vs. SLM vs. Foundation Model

| Term | Definition | Size | Examples |
|------|-----------|------|---------|
| **Foundation Model** | Large model trained on broad data; general-purpose; fine-tunable | Large to very large | GPT-4, Claude 3, Gemini Ultra |
| **LLM (Large Language Model)** | Foundation model specifically for text/language understanding and generation | 7B–1000B+ parameters | Claude, GPT, Llama |
| **SLM (Small Language Model)** | Compact language model optimised for efficiency; runs on-device or edge | 1B–7B parameters | Phi-3, Mistral 7B, Gemma |

---

### 2.19 MLOps vs. LLMOps vs. AgentOps

| Term | Definition | Key Concerns |
|------|-----------|-------------|
| **MLOps** | Practices for deploying, monitoring, and maintaining traditional ML models in production | Feature drift, model drift, retraining, A/B testing |
| **LLMOps** | Extends MLOps for LLM-specific concerns: prompts, RAG, evaluation, hallucination | Prompt versioning, semantic evaluation, cost tracking, guardrails |
| **AgentOps** | Extends LLMOps for agentic systems: multi-step reasoning, tool calls, memory, parallel agents | Agent traces, tool invocation logging, interrupt/resume, multi-agent coordination |

---

### 2.20 Fine-tuning vs. RAG vs. Prompt Engineering

| Approach | What It Does | When to Use | Cost |
|----------|-------------|-------------|------|
| **Prompt Engineering** | Craft instructions to guide model behavior without changing weights | When behavior change is achievable via instruction | Low |
| **RAG (Retrieval-Augmented Generation)** | Inject relevant context from a knowledge base at query time | When model needs access to proprietary or current information | Medium |
| **Fine-tuning** | Train model on domain-specific examples to change its behavior permanently | When style, tone, or domain knowledge is deeply embedded | High |

**Decision Guide:**
1. Try prompt engineering first — 80% of enterprise use cases can be solved well
2. Add RAG when proprietary knowledge or currency of information matters
3. Fine-tune only when prompt + RAG approach fails to achieve required quality

---

### 2.21 Orchestration vs. Choreography

| Term | Definition | Control Mechanism | Example |
|------|-----------|-------------------|---------|
| **Orchestration** | Central coordinator directs all participants | One conductor controlling the flow | Saga pattern with orchestrator; LangGraph |
| **Choreography** | Each service reacts to events; no central coordinator | Each dancer knows their part | Event-driven microservices; event mesh |

---

### 2.22 Horizontal vs. Vertical Integration

| Term | Definition | Example |
|------|-----------|---------|
| **Horizontal integration** | Acquiring or combining with competitors at the same level of the value chain | Bank acquiring another bank |
| **Vertical integration** | Expanding into upstream (supply) or downstream (distribution) of your value chain | Retailer acquiring a manufacturer |
| **AI parallel** | Horizontal: acquire AI company in same space. Vertical: AI company acquiring training data supplier |

---

### 2.23 Synchronous vs. Asynchronous Communication

| Term | Definition | When to Use |
|------|-----------|------------|
| **Synchronous** | Caller waits for response before proceeding | Real-time queries; simple request-response; user-facing APIs |
| **Asynchronous** | Caller sends request and continues; response arrives later | Long-running processes; decoupled services; high-volume processing |

---

### 2.24 Latency vs. Throughput

| Term | Definition | Measured In |
|------|-----------|------------|
| **Latency** | Time from request to response for a single request | Milliseconds; percentiles (P50, P95, P99) |
| **Throughput** | Number of requests processed per unit of time | Requests per second (RPS); transactions per second (TPS) |

**The Tension:** Optimizing for one often degrades the other. Batching improves throughput but increases latency.

---

### 2.25 CapEx vs. OpEx (Technology Context)

| Term | Definition | Technology Examples |
|------|-----------|---------------------|
| **CapEx (Capital Expenditure)** | Investment in assets expected to provide benefit beyond one year | Data center hardware, software licenses (perpetual), internally developed software |
| **OpEx (Operating Expenditure)** | Day-to-day costs of running the business | Cloud subscriptions, SaaS licenses, API usage fees |
| **Why it matters for AI** | AI via API is OpEx; AI platform build may be CapEx; CFO perspective shapes how AI investment is accounted |

---

### 2.26 Accuracy vs. Precision vs. Recall

| Term | Definition | Formula |
|------|-----------|---------|
| **Accuracy** | % of all predictions that are correct | (TP + TN) / Total |
| **Precision** | Of all positive predictions, % that are actually positive | TP / (TP + FP) |
| **Recall (Sensitivity)** | Of all actual positives, % that were correctly identified | TP / (TP + FN) |
| **F1 Score** | Harmonic mean of precision and recall | 2 × (P × R) / (P + R) |

**When it matters:** Fraud detection prefers high recall (catch all fraud, accept some false positives). Spam filter prefers high precision (don't block real emails, accept some spam reaching inbox).

---

### 2.27 Waterfall vs. Agile vs. SAFe

| Dimension | Waterfall | Agile (Team) | SAFe (Enterprise) |
|-----------|---------|-------------|-------------------|
| **Planning** | Full upfront plan | Sprint-by-sprint | PI Planning quarterly |
| **Requirements** | Fixed at start | Evolving | Evolving; governed |
| **Delivery** | Single release at end | Sprint-by-sprint | Per PI (quarterly) |
| **Risk management** | Late discovery | Continuous | Continuous; portfolio level |
| **Best for** | Fixed, well-understood scope | Single product team | Multi-team enterprise |

---

### 2.28 SOA vs. Microservices vs. Monolith

| Architecture | Definition | When to Use |
|-------------|-----------|------------|
| **Monolith** | Single deployable unit containing all functionality | Small teams; early stage; low complexity |
| **SOA (Service-Oriented Architecture)** | Enterprise services shared via ESB (Enterprise Service Bus); coarse-grained | Enterprise integration; legacy systems |
| **Microservices** | Fine-grained, independently deployable services | High scale; large teams; need independent deployment |

---

### 2.29 Push vs. Pull (Data and Notification)

| Model | How It Works | Use Cases |
|-------|-------------|----------|
| **Push** | Server sends data to client when available | Real-time notifications; WebSocket; streaming |
| **Pull** | Client requests data on demand | REST API; traditional web; batch reporting |
| **Event-driven (hybrid)** | Events published; interested consumers pull | Event bus (Kafka); messaging patterns |

---

### 2.30 Zero-Shot vs. Few-Shot vs. Fine-tuning (Prompting)

| Approach | What It Provides | Example |
|----------|-----------------|---------|
| **Zero-shot** | Task description only; no examples | "Summarize this document: {text}" |
| **Few-shot** | 2-5 examples in the prompt | "Example 1: [input] → [output]. Now do: {input}" |
| **Chain-of-thought** | Step-by-step reasoning examples | "Let's think step by step..." |
| **Fine-tuning** | Examples baked into model weights | Training dataset; permanent behavior change |

---

## Part 3 — Terminology Cross-Reference (Framework Babel)

The same concept is named differently across frameworks. This cross-reference table enables translation between frameworks.

| Concept | McKinsey | TOGAF 10 | BIZBoK | SAFe 6.0 | Gartner |
|---------|---------|---------|--------|---------|---------|
| **What we exist to do** | Mission/Purpose | Architecture Principles | Business Motivation Model | Mission | Business Purpose |
| **Where to play/how to win** | Strategy | Architecture Vision | Strategy | Portfolio Vision | Strategic Intent |
| **Annual priorities** | Strategic Priorities | Architecture Roadmap | Strategic Themes | Portfolio Epics | Strategic Initiatives |
| **What we can do** | Organizational Capability | Business Capability | Business Capability | Competency | Business Capability |
| **How work flows** | Process | Business Process | Value Stream | Value Stream | Business Process |
| **Investment grouping** | Initiative | Architecture Work Package | Initiative | Portfolio Epic | Investment Theme |
| **Technology building block** | Technology Module | Architecture Building Block (ABB) | IT Building Block | Solution | Technology Platform |
| **Specific implementation** | Technology Solution | Solution Building Block (SBB) | Application | Solution | Vendor Product |
| **Governance body** | Steering Committee | Architecture Board | Governance Forum | Lean Portfolio Management | IT Steering Committee |
| **Performance measure** | KPI | Architecture Metric | Performance Indicator | OKR Key Result | KPI |
| **Change program** | Transformation Initiative | Architecture Transition | Change Initiative | Program Increment Objective | Transformation Program |
| **Business context** | Business Context | Enterprise Context | Business Environment | Enterprise | Business Context |
| **System integration** | Integration Layer | Technology Architecture | Integration Domain | Platform | Integration Platform |
| **Customer journey** | Customer Journey | Business Scenario | Value Stream | Customer Journey | Customer Experience Map |
| **Organization model** | Organization Model | Organization Architecture | Organization Map | Organization | Operating Model |
| **Data governance** | Data Strategy | Data Architecture | Information Architecture | Data Management | Data Governance |
| **Vendor relationship** | Partnership | External Organization | Partner | Supplier | Third Party |
| **Risk assessment** | Risk & Opportunity | Risk Management | Risk Register | Risk Register | Risk Assessment |

---

## Part 4 — Enterprise Glossary (250+ Terms)

### A

| Term | Definition | Domain |
|------|-----------|--------|
| **A2A (Agent-to-Agent)** | Protocol enabling AI agents to communicate and collaborate across organizational and system boundaries | AI |
| **ABB (Architecture Building Block)** | TOGAF concept: defines a capability without specifying implementation; technology-agnostic | Architecture |
| **Accountability** | In RACI: the single person who owns the outcome and is answerable for it | Governance |
| **Agile** | Iterative, collaborative approach to software delivery; values individuals and interactions over processes and tools | Delivery |
| **AI Agent** | Autonomous AI system that plans and executes multi-step tasks using tools without step-by-step human instruction | AI |
| **AI COE** | AI Center of Excellence: organizational construct centralizing AI expertise, standards, and governance | Organization |
| **AI Ethics** | Principles governing the responsible development and use of AI: fairness, transparency, accountability, safety | AI |
| **AI Factory** | Industrial-scale operating model treating AI use case development as a repeatable manufacturing process | Operating Model |
| **AI Governance** | Policies, processes, and controls ensuring AI systems are developed and used responsibly | Governance |
| **AI Maturity Model** | Framework assessing an organization's readiness and capability to develop and deploy AI at scale | Strategy |
| **AI Operating Model** | How an organization develops, deploys, governs, and continuously improves AI capabilities | Operating Model |
| **AI Platform** | Shared infrastructure enabling AI delivery across the enterprise: LLM gateway, model registry, evaluation | Technology |
| **AI Risk** | Potential harm from AI systems: bias, hallucination, security vulnerabilities, unintended consequences | Risk |
| **Algorithm** | Step-by-step procedure for solving a problem or making a decision | Technology |
| **AML (Anti-Money Laundering)** | Regulatory requirements and controls to detect and prevent money laundering | Compliance |
| **Ansoff Matrix** | Strategic framework for growth: market penetration, product development, market development, diversification | Strategy |
| **API (Application Programming Interface)** | Contract defining how software components communicate | Technology |
| **API Gateway** | Component managing north-south API traffic: authentication, rate limiting, routing, transformation | Architecture |
| **Architecture Domain** | TOGAF: one of four high-level architecture areas: Business, Data, Application, Technology | Architecture |
| **Architecture Principle** | Fundamental rule guiding architecture decisions across the enterprise | Architecture |
| **Architecture Review Board (ARB)** | Governance body reviewing and approving architecture decisions and standards | Governance |
| **Architecture Runway** | SAFe: pre-existing infrastructure and frameworks enabling near-term feature development | Delivery |
| **Artificial Intelligence (AI)** | Machine simulation of cognitive functions including learning, reasoning, and problem-solving | AI |
| **ART (Agile Release Train)** | SAFe: long-lived team of teams (50-125 people) delivering value in a synchronized cadence | Delivery |
| **Autonomy** | Ability of an AI agent to act without continuous human direction | AI |

### B

| Term | Definition | Domain |
|------|-----------|--------|
| **Balanced Scorecard** | Performance management framework with four perspectives: Financial, Customer, Internal Process, Learning | Strategy |
| **Benefits Realization** | Process of measuring whether expected benefits from an investment are actually achieved | Portfolio |
| **BCG Matrix** | Boston Consulting Group portfolio tool: Stars, Cash Cows, Question Marks, Dogs | Strategy |
| **BIZBoK** | Business Architecture Guild body of knowledge: capabilities, value streams, organization | Architecture |
| **Blue Ocean Strategy** | Creating uncontested market space rather than competing in existing markets | Strategy |
| **Board of Directors** | Governing body of an organization; fiduciary responsibility; sets strategic direction | Governance |
| **BSS (Business Support Systems)** | Telecom IT systems for billing, CRM, ordering, and revenue management | Industry |
| **Build vs. Buy** | Decision whether to develop a capability internally or purchase from a vendor | Strategy |
| **Business Architecture** | Architecture domain covering business strategy, capabilities, processes, and organization | Architecture |
| **Business Capability** | What an organization can do; stable over time regardless of organizational changes | Architecture |
| **Business Case** | Document justifying an investment by quantifying expected costs, benefits, and risks | Finance |
| **Business Domain** | Major area of business activity containing related capabilities | Architecture |
| **Business Model Canvas** | Osterwalder framework: 9 building blocks describing how an organization creates and captures value | Strategy |
| **Business Process** | Sequence of activities producing an outcome; expresses how a capability is executed | Architecture |
| **Business Transformation** | Fundamental change to an organization's strategy, operating model, or capabilities | Strategy |

### C

| Term | Definition | Domain |
|------|-----------|--------|
| **CapEx (Capital Expenditure)** | Investment in long-lived assets expected to provide benefit beyond one year | Finance |
| **Capability Maturity** | Level at which a capability is performed; typically 1 (initial) to 5 (optimizing) | Architecture |
| **CAIO (Chief AI Officer)** | Executive responsible for AI strategy, governance, and delivery across the enterprise | Leadership |
| **CDO (Chief Data Officer)** | Executive responsible for data strategy, governance, and data-driven value creation | Leadership |
| **Change Management** | Structured approach to transitioning individuals and organizations to a desired future state | People |
| **CISO (Chief Information Security Officer)** | Executive responsible for information security strategy and risk management | Leadership |
| **Cloud Operating Model** | Governance model for enterprise use of public cloud services | Operating Model |
| **CMMI (Capability Maturity Model Integration)** | Framework measuring process capability maturity on a 1-5 scale | Quality |
| **Cognitive Load** | Amount of mental effort required to understand and manage a system or process | Organization |
| **Conway's Law** | Organizations produce system designs that mirror their communication structures | Architecture |
| **CoP (Community of Practice)** | Group of practitioners sharing knowledge and developing skills in a common domain | Knowledge |
| **Corporate Strategy** | High-level plan for achieving organizational goals and competitive advantage | Strategy |
| **CPQ (Configure, Price, Quote)** | Software enabling complex product configuration and pricing | Technology |
| **Cross-Functional Team** | Team with members from multiple disciplines working toward a shared outcome | Organization |
| **Customer Journey Map** | Visual representation of the end-to-end customer experience with an organization | Strategy |

### D

| Term | Definition | Domain |
|------|-----------|--------|
| **DACI** | Decision framework: Driver, Approver, Contributors, Informed | Governance |
| **Data Architecture** | Architecture domain covering data assets, data flows, and data management | Architecture |
| **Data Domain** | Group of related data entities owned by a business area | Architecture |
| **Data Fabric** | Connected metadata layer enabling unified data access across distributed sources | Technology |
| **Data Governance** | Policies and processes ensuring data quality, security, and appropriate use | Governance |
| **Data Mesh** | Decentralized data architecture with domain ownership and self-serve data infrastructure | Architecture |
| **Data Operating Model** | How enterprise data is owned, managed, shared, and consumed to create value | Operating Model |
| **Data Product** | Data asset treated as a product: discoverable, versioned, SLA-governed, owned | Architecture |
| **Decision Rights** | Who has authority to make which decisions | Governance |
| **Deep Learning** | Subset of ML using neural networks with many layers to learn complex patterns | AI |
| **Design Thinking** | Human-centered innovation approach: empathize, define, ideate, prototype, test | Innovation |
| **DevOps** | Culture and practice combining software development and operations for faster delivery | Delivery |
| **Digital Operating Model** | Operating model built for continuous delivery of digital products and services | Operating Model |
| **Digital Twin** | Virtual representation of a physical object or system, updated in real time | Technology |
| **Domain-Driven Design (DDD)** | Software design approach aligning code structure with business domain structure | Architecture |

### E

| Term | Definition | Domain |
|------|-----------|--------|
| **EA (Enterprise Architecture)** | Discipline aligning an organization's processes, information, and technology to its strategy | Architecture |
| **Embedding** | Dense vector representation of text capturing semantic meaning | AI |
| **Enterprise Architecture Framework** | Structured methodology for planning and governing enterprise architecture (TOGAF, Zachman) | Architecture |
| **Enterprise Strategy** | Organization-wide plan for achieving long-term competitive advantage | Strategy |
| **Epic** | Large body of user work representing a business outcome; contains multiple features | Delivery |
| **ESB (Enterprise Service Bus)** | Middleware enabling service-oriented architecture integration | Technology |
| **Evaluation (AI)** | Systematic assessment of AI system quality: accuracy, safety, helpfulness | AI |
| **Event-Driven Architecture** | Systems communicating through events rather than direct API calls | Architecture |
| **Executive Sponsor** | Senior leader accountable for a program's business case and outcomes | Governance |
| **Explainability** | Ability to explain why an AI system produced a specific output | AI |

### F

| Term | Definition | Domain |
|------|-----------|--------|
| **Feature (Delivery)** | User-visible capability that delivers business value; delivered within a sprint or two | Delivery |
| **Feature Store** | Central store of ML features ensuring consistency between training and inference | AI |
| **Federation (Governance)** | Distribution of authority between central function and decentralized business units | Governance |
| **Fine-tuning** | Training a pre-trained model on domain-specific data to adapt its behavior | AI |
| **FinOps** | Financial operations for cloud: optimizing cloud spend with cost accountability | Finance |
| **Five Forces (Porter's)** | Framework analyzing industry competitiveness: rivalry, new entrants, substitutes, supplier power, buyer power | Strategy |
| **Foundation Model** | Large AI model trained on broad data; general-purpose; fine-tunable for specific use cases | AI |
| **Function (Organization)** | Organizational unit responsible for a domain of work (Finance, HR, IT) | Organization |

### G

| Term | Definition | Domain |
|------|-----------|--------|
| **GenAI (Generative AI)** | AI that generates new content: text, images, code, audio, video | AI |
| **GRC (Governance, Risk, and Compliance)** | Integrated framework for managing enterprise governance, risk management, and regulatory compliance | Governance |
| **Guardrails (AI)** | Controls preventing AI systems from generating harmful, inaccurate, or non-compliant outputs | AI |
| **Governance** | System of rules, practices, and processes directing and controlling an organization | Governance |

### H

| Term | Definition | Domain |
|------|-----------|--------|
| **Hallucination** | AI system generating content that appears credible but is factually incorrect | AI |
| **HITL (Human-in-the-Loop)** | Design pattern requiring human review and approval before AI action proceeds | AI |
| **Horizon Model (McKinsey)** | Three-horizon framework for managing core business (H1), emerging (H2), and exploratory (H3) | Strategy |
| **Hoshin Kanri** | Japanese strategic planning methodology aligning the entire organization to 3-5 priorities | Strategy |
| **HQ (Headquarters)** | Central function of a corporation setting strategy and governance for all business units | Organization |

### I–J

| Term | Definition | Domain |
|------|-----------|--------|
| **IAM (Identity and Access Management)** | Controls governing who can access what resources | Security |
| **ICE Score** | Prioritization framework: Impact × Confidence × Ease | Portfolio |
| **IDP (Internal Developer Platform)** | Self-service platform enabling product teams to deploy and operate services | Technology |
| **Impact Mapping** | Strategic planning technique connecting business goals to user behavior to deliverables | Strategy |
| **Initiative** | Strategic investment area grouping programs and projects aligned to an objective | Strategy |
| **Integration Architecture** | How systems connect and exchange data | Architecture |
| **IT Governance** | Processes ensuring IT investments align to business strategy and manage risk | Governance |
| **JTBD (Jobs-to-be-Done)** | Clayton Christensen framework: customers hire products to do a job | Innovation |

### K–L

| Term | Definition | Domain |
|------|-----------|--------|
| **KANO Model** | Product prioritization framework: must-be, performance, attractive, indifferent, reverse | Strategy |
| **KPI (Key Performance Indicator)** | Measurable metric tracking progress toward an objective | Performance |
| **Knowledge Graph** | Graph-based knowledge representation showing entities and their relationships | AI |
| **KYC (Know Your Customer)** | Regulatory process verifying customer identity and assessing risk | Compliance |
| **Landing Zone** | Pre-configured cloud environment with security, networking, and governance baselines | Technology |
| **Latency** | Time elapsed between a request and the corresponding response | Technology |
| **Lean** | Methodology eliminating waste to deliver value faster | Delivery |
| **LeSS (Large-Scale Scrum)** | Scaled agile framework: single product backlog, multiple Scrum teams | Delivery |
| **LLM (Large Language Model)** | AI model trained on large text corpora; generates, analyzes, and transforms text | AI |
| **LLM Gateway** | Enterprise component managing all LLM API calls: routing, rate limiting, cost control, observability | AI |
| **LLMOps** | MLOps practices extended for LLM-specific concerns: prompts, RAG, evaluation, guardrails | AI |
| **LPM (Lean Portfolio Management)** | SAFe approach connecting strategy to execution through value stream funding | Portfolio |

### M

| Term | Definition | Domain |
|------|-----------|--------|
| **Market Segment** | Subset of a market with distinct characteristics or needs | Strategy |
| **McKinsey 7S** | Framework examining strategy, structure, systems, staff, skills, style, shared values | Strategy |
| **MCP (Model Context Protocol)** | Anthropic-led protocol for tool connectivity to AI models | AI |
| **Memory (AI Agent)** | Agent's ability to store and retrieve information: episodic, semantic, procedural | AI |
| **Microservices** | Architectural style with fine-grained, independently deployable services | Architecture |
| **Mission** | Statement of what an organization does and for whom | Strategy |
| **ML (Machine Learning)** | AI technique where systems learn from data without explicit programming | AI |
| **MLOps** | Practices for deploying, monitoring, and maintaining ML models in production | AI |
| **Model Drift** | Degradation of model performance over time as real-world data changes | AI |
| **Model Registry** | Versioned catalog of all ML and AI models including metadata and evaluation results | AI |
| **Model Risk Management** | Governance framework for identifying, measuring, and managing risks from AI/ML models | Risk |
| **Multi-Agent System** | Architecture with multiple AI agents collaborating to accomplish complex tasks | AI |

### N–O

| Term | Definition | Domain |
|------|-----------|--------|
| **Network Organization** | Enterprise functioning as ecosystem orchestrator coordinating external partners | Organization |
| **NPV (Net Present Value)** | Present value of future cash flows minus initial investment; investment appraisal metric | Finance |
| **OKR (Objectives and Key Results)** | Goal-setting framework: qualitative objective with quantitative key results | Performance |
| **OpEx (Operating Expenditure)** | Day-to-day costs of running the business | Finance |
| **Operating Model** | How an organization delivers value: people, process, technology, data, governance | Operating Model |
| **Orchestration** | Central coordinator directing all participants in a process or workflow | Architecture |
| **Organization Design** | Discipline of aligning structure, governance, roles, and culture to strategy | Organization |
| **OSS (Operations Support Systems)** | Telecom IT systems for network inventory, fault management, and provisioning | Industry |

### P

| Term | Definition | Domain |
|------|-----------|--------|
| **P&L (Profit and Loss)** | Financial statement showing revenues, costs, and profitability | Finance |
| **PI (Program Increment)** | SAFe: 10-12 week planning and delivery cadence; 5 sprints | Delivery |
| **Platform** | Foundation enabling others to create value on top; governed by platform economics | Strategy |
| **Platform Engineering** | Building and maintaining internal developer platforms enabling product team self-service | Technology |
| **Platform Operating Model** | Organization operating as a platform business: providing capabilities as services | Operating Model |
| **PMO (Project/Programme Management Office)** | Function providing project governance, standards, and reporting | Governance |
| **Portfolio** | Collection of programs and projects aligned to a strategic theme | Portfolio |
| **Porter's Five Forces** | Industry analysis framework: five forces shaping competitive dynamics | Strategy |
| **Precision** | Of all positive AI predictions, percentage that are actually positive | AI |
| **Prioritization** | Process of ranking initiatives by relative importance and urgency | Portfolio |
| **Process** | Sequence of activities producing a defined outcome | Architecture |
| **Program** | Coordinated group of related projects managed to obtain benefits not available individually | Portfolio |
| **Project** | Temporary endeavour with defined start, end, and deliverable | Portfolio |
| **Prompt** | Input instruction given to an LLM to elicit a desired output | AI |
| **Prompt Engineering** | Craft of designing effective prompts to guide LLM behavior without changing model weights | AI |
| **Prompt Registry** | Version-controlled, governed storage for prompt templates | AI |
| **Purpose** | Why an organization exists beyond profit; its societal contribution | Strategy |

### Q–R

| Term | Definition | Domain |
|------|-----------|--------|
| **RACI** | Responsibility assignment matrix: Responsible, Accountable, Consulted, Informed | Governance |
| **RAG (Retrieval-Augmented Generation)** | Technique injecting retrieved relevant context into LLM prompt at query time | AI |
| **Recall** | Of all actual positives, percentage correctly identified by AI model | AI |
| **Reference Architecture** | Prescriptive pattern for a class of architectural problems; reusable across solutions | Architecture |
| **RICE Score** | Prioritization framework: Reach × Impact × Confidence / Effort | Portfolio |
| **Risk Appetite** | Amount of risk an organization is willing to accept in pursuit of its strategy | Risk |
| **Risk Register** | Record of identified risks, their likelihood, impact, and mitigations | Risk |
| **Roadmap** | Strategic view of what will be built or changed over time at quarter/half year granularity | Strategy |
| **ROI (Return on Investment)** | Benefit from an investment as a percentage of its cost | Finance |
| **Run/Grow/Transform (RGT)** | Gartner IT budget classification: operational (Run), growth (Grow), disruptive (Transform) | Portfolio |

### S

| Term | Definition | Domain |
|------|-----------|--------|
| **SABSA** | Sherwood Applied Business Security Architecture: business-driven security architecture | Architecture |
| **SAFe (Scaled Agile Framework)** | Framework scaling agile from team to enterprise level | Delivery |
| **SBB (Solution Building Block)** | TOGAF: specific implementation of an ABB (e.g., a named product or service) | Architecture |
| **Scrum** | Agile framework using sprints, daily standups, and retrospectives | Delivery |
| **Service Mesh** | Infrastructure layer managing east-west service-to-service communication | Technology |
| **SLA (Service Level Agreement)** | Agreed level of service: availability, latency, error rate | Technology |
| **SLM (Small Language Model)** | Compact language model optimized for efficiency; 1-7B parameters | AI |
| **Solution Architecture** | Specific design for a specific system or product | Architecture |
| **Span of Control** | Number of direct reports a manager has | Organization |
| **Sprint** | Fixed-length iteration (typically 2 weeks) in which a team completes a defined scope | Delivery |
| **Story (User Story)** | Short description of a feature from the user's perspective | Delivery |
| **Strategic Initiative** | Program of work enabling a strategic objective | Strategy |
| **Strategic Intent** | Competitive ambition describing where the organization wants to lead | Strategy |
| **Strategic Theme** | Annual focus area providing direction for investment and delivery | Strategy |
| **Strategy Map** | Balanced Scorecard tool showing cause-and-effect relationships between objectives | Strategy |
| **Streaming (Data)** | Continuous, real-time data processing as events occur | Technology |

### T

| Term | Definition | Domain |
|------|-----------|--------|
| **Target Operating Model (TOM)** | Blueprint of how an organization needs to operate in the future to execute its strategy | Operating Model |
| **Team Topologies** | Matthew Skelton/Manuel Pais model: four team types and three interaction modes | Organization |
| **Three Horizons** | McKinsey framework: H1 (core), H2 (emerging), H3 (exploratory) investments | Strategy |
| **Throughput** | Number of requests processed per unit of time | Technology |
| **TOGAF** | The Open Group Architecture Framework: enterprise architecture methodology (ADM) | Architecture |
| **Token** | Sub-word unit that LLMs process; typically 3/4 of a word; key unit of LLM cost | AI |
| **TOM** | See Target Operating Model | Operating Model |
| **Transformation Office** | Dedicated organizational function governing large-scale change programs | Governance |
| **Two-Pizza Rule** | Amazon principle: no team should require more than two pizzas to feed (5-8 people) | Organization |

### U–V

| Term | Definition | Domain |
|------|-----------|--------|
| **Value Chain** | Full sequence of activities creating value from raw input to end customer | Strategy |
| **Value Proposition** | Statement of the unique value an organization delivers to customers | Strategy |
| **Value Stream** | BIZBoK/SAFe: end-to-end sequence of steps delivering value to a stakeholder | Architecture |
| **Value Stream Mapping** | Visual technique mapping material and information flow in a value stream | Architecture |
| **Vector Database** | Storage optimized for dense vector embeddings; enables semantic search | AI |
| **Vendor Management** | Processes governing relationships with external suppliers | Governance |
| **Vision** | Vivid, compelling description of an organization's desired future state | Strategy |

### W–Z

| Term | Definition | Domain |
|------|-----------|--------|
| **Wardley Map** | Strategic map showing value chain vs. evolutionary stage | Strategy |
| **Waterfall** | Sequential project delivery: requirements → design → build → test → deploy | Delivery |
| **WSJF (Weighted Shortest Job First)** | SAFe prioritization: Cost of Delay / Job Duration | Portfolio |
| **Zachman Framework** | Classification schema for architecture artifacts: stakeholder rows × interrogative columns | Architecture |
| **Zero-Shot** | Prompting an LLM with task description only; no examples | AI |
| **Zero Trust** | Security model: never trust implicitly; always verify identity and access | Security |

---

## Part 5 — Deliverables Cross-Reference

### Standard Architecture Deliverables by Phase

| Phase | Deliverable | Framework | Owner |
|-------|-------------|-----------|-------|
| **Strategy** | Architecture Vision | TOGAF Phase A | Chief Architect |
| **Strategy** | Architecture Principles | TOGAF Preliminary | Architecture Board |
| **Strategy** | Business Capability Map | BIZBoK | Business Architect |
| **Business Architecture** | Business Capability Model (L1-L3) | BIZBoK / TOGAF B | Business Architect |
| **Business Architecture** | Value Stream Map | BIZBoK / Lean | Business Architect |
| **Business Architecture** | Operating Model Canvas | Custom | Strategy + EA |
| **Business Architecture** | RACI / RASCI Matrix | Custom | Programme Director |
| **Data Architecture** | Conceptual Data Model | TOGAF C | Data Architect |
| **Data Architecture** | Data Domain Map | BIZBoK / TOGAF | Data Architect |
| **Data Architecture** | Data Governance Framework | DAMA / Custom | CDO |
| **Application Architecture** | Application Portfolio Assessment | TOGAF C | Enterprise Architect |
| **Application Architecture** | Application Integration Map | TOGAF C | Solution Architect |
| **Technology Architecture** | Technology Roadmap | TOGAF D | CTO / EA |
| **Technology Architecture** | Platform Architecture Blueprint | TOGAF D | Platform Architect |
| **Implementation** | Architecture Roadmap | TOGAF E | Enterprise Architect |
| **Implementation** | Transition Architecture | TOGAF F | Enterprise Architect |
| **Governance** | Architecture Contract | TOGAF G | Architecture Board |

---

*Volume 10 of 10 — Enterprise Strategy & Business Architecture Handbook*

*This volume concludes the 10-volume Enterprise Strategy & Business Architecture Handbook series. Volumes 1-5 cover corporate strategy, business architecture, portfolio governance, consulting frameworks, and AI strategy. Volumes 6-10 cover organization design and operating models, building blocks, portfolio and framework depth, industry deep dives, and this reference volume covering relationships, comparisons, and the glossary.*
