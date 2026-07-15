---
title: "Vol 2 — Business Architecture & Operating Models"
date: 2026-07-15
date_created: 2026-07-15
last_reviewed: 2026-07-15
status: current
source_type: native-md
source_file: ""
tags: ["business-architecture", "capability-map", "value-stream", "operating-model", "target-operating-model", "BIZBOK", "domain-driven-design"]
doc_type: handbook-volume
series_name: Enterprise Strategy & Business Architecture Handbook
series_part: 2
series_total: 5
---

# Vol 2 — Business Architecture & Operating Models

> **Covers:** Business Architecture as a discipline, Capability Mapping, Value Streams, Business Domains, Operating Model design, Target Operating Model (TOM), Organization Design, and Platform Operating Models — from BIZBOK foundations through 2026 AI-era practices.

---

## Part 1 — Business Architecture as a Discipline

### 1.1 What Is Business Architecture?

**Business Architecture** is the practice of defining how an organization creates and delivers value — through its capabilities, processes, information, stakeholders, and governance structures — independently of any specific technology implementation.

Business Architecture answers: *"How does this organization actually work?"*

It is the **translation layer between strategy and execution**. Strategy says "what we want to achieve." Technology says "how we build it." Business Architecture says "what capabilities, processes, and structures must exist to bridge the two."

```
STRATEGY LAYER
"Become the most customer-centric bank in Southeast Asia"
         │
         ▼
BUSINESS ARCHITECTURE LAYER
"We need these capabilities at this maturity to achieve that strategy"
• Customer Onboarding (target: digital, <2 hours)
• Credit Assessment (target: AI-powered, real-time)
• Relationship Management (target: omnichannel, personalized)
         │
         ▼
TECHNOLOGY LAYER
"These systems and platforms deliver those capabilities"
• Digital Onboarding Platform
• AI Credit Engine
• CRM with 360-degree customer view
```

### 1.2 The BIZBOK Standard

The **Business Architecture Body of Knowledge (BIZBOK)** published by the Business Architecture Guild is the primary professional standard for Business Architecture practice.

**BIZBOK Core Metamodel:**

```
BIZBOK METAMODEL
│
├── CAPABILITY — What the organization is able to do
│   └── Measured by: Maturity, Performance, Investment
│
├── VALUE STREAM — How value is created end-to-end for a stakeholder
│   └── Comprised of: Value Stream Stages (each with capabilities)
│
├── ORGANIZATION — Who performs the work
│   └── Includes: Business Units, Roles, Stakeholders
│
├── INFORMATION — What data and knowledge is used
│   └── Includes: Business Objects, Information Concepts
│
└── INITIATIVE — What changes are being made
    └── Links: Capabilities → Gaps → Initiatives
```

### 1.3 Business Architecture vs. Enterprise Architecture

| Dimension | Business Architecture | Enterprise Architecture |
|-----------|----------------------|------------------------|
| **Focus** | Business side (capabilities, processes, value) | Full stack (business + apps + data + technology) |
| **Primary Audience** | Business executives, strategy teams | Technology leaders, architects |
| **Language** | Business language | Technical + business hybrid |
| **Deliverables** | Capability maps, value stream maps, business glossary | Architecture blueprints, reference architectures, tech roadmaps |
| **Standard** | BIZBOK (Business Architecture Guild) | TOGAF (Open Group) |
| **Horizon** | Longer term, more stable | Shorter term, more dynamic |
| **Primary Question** | "What must the business be able to do?" | "How do we build/govern the technology?" |

> **Key Insight**: You cannot do good Enterprise Architecture without Business Architecture. Technology decisions made without capability context produce technically excellent solutions that don't solve business problems.

### 1.4 Business Architecture Practitioners

| Role | Responsibilities |
|------|----------------|
| **Business Architect** | Owns capability maps, value stream analysis, business domain design |
| **Enterprise Architect** | Translates business architecture into application and technology architecture |
| **Business Analyst** | Supports BA with process modeling and requirements |
| **Chief Architect** | Governs coherence of business and technical architecture |
| **Strategy Lead** | Provides strategic intent that drives capability priorities |

---

## Part 2 — Business Capabilities

### 2.1 What Is a Business Capability?

A **Business Capability** is what an organization is able to do — expressed in business terms, independent of how it is done (people, process, technology). Capabilities are stable over time even as the underlying technology changes.

**The Golden Rule:** A capability describes WHAT the organization can do, not HOW or WHO or WHERE.

```
WRONG (describes how):    "Process loan applications using Salesforce"
WRONG (describes who):    "Loan Underwriting Team reviews applications"
RIGHT (describes what):   "Loan Underwriting" — the ability to assess
                          creditworthiness and approve/decline loan applications
```

### 2.2 Capability Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Stable** | Does not change when technology changes |
| **Outcome-focused** | Describes a business outcome, not a process step |
| **Unique** | No two capabilities in a map should mean the same thing |
| **Business language** | No technology terms |
| **Hierarchical** | Can be decomposed into sub-capabilities |
| **Measurable** | Can be assessed for maturity and performance |

### 2.3 Capability Hierarchy

Capabilities are organized in a hierarchy of three to four levels:

```
LEVEL 1 — CAPABILITY DOMAIN (Top-level business area)
└── Customer Management

LEVEL 2 — CAPABILITY CLUSTER (Major capability group)
    └── Customer Acquisition

LEVEL 3 — BUSINESS CAPABILITY (Core unit of analysis)
    └── Lead Generation
    └── Prospect Qualification
    └── Sales Closure

LEVEL 4 — CAPABILITY COMPONENT (Sub-capability, rarely needed)
    └── Lead Scoring
    └── Campaign Management
```

**Rule of thumb:** Most business architecture works at Level 1–3. Level 4 is used for deep process analysis.

### 2.4 Capability Map Example: Retail Banking

```
RETAIL BANKING CAPABILITY MAP (Level 1–2)

├── CUSTOMER MANAGEMENT
│   ├── Customer Acquisition
│   ├── Customer Onboarding
│   ├── Customer Relationship Management
│   ├── Customer Analytics & Segmentation
│   └── Customer Offboarding
│
├── PRODUCT MANAGEMENT
│   ├── Product Design & Development
│   ├── Product Pricing
│   ├── Product Lifecycle Management
│   └── Product Performance Management
│
├── CHANNEL MANAGEMENT
│   ├── Branch Network Management
│   ├── Digital Channel Management
│   ├── Contact Center Management
│   └── Partner Channel Management
│
├── CREDIT & LENDING
│   ├── Credit Origination
│   ├── Credit Assessment & Underwriting
│   ├── Loan Servicing
│   ├── Collections & Recovery
│   └── Credit Risk Management
│
├── PAYMENTS & TRANSACTIONS
│   ├── Payment Processing
│   ├── Settlement & Clearing
│   ├── Transaction Monitoring
│   └── Fraud Detection & Prevention
│
├── FINANCE & TREASURY
│   ├── Financial Accounting
│   ├── Treasury Management
│   ├── Financial Planning & Analysis
│   └── Tax Management
│
├── RISK & COMPLIANCE
│   ├── Regulatory Compliance
│   ├── AML / KYC
│   ├── Operational Risk Management
│   └── Audit Management
│
├── TECHNOLOGY & DATA
│   ├── Application Management
│   ├── Data Management
│   ├── Infrastructure Management
│   └── Cybersecurity
│
└── ENTERPRISE SUPPORT
    ├── Human Resources
    ├── Procurement
    ├── Legal & Regulatory Affairs
    └── Corporate Real Estate
```

### 2.5 Capability Maturity Model

Every capability can be assessed against a 5-level maturity model:

| Level | Name | Description | Indicators |
|-------|------|-------------|------------|
| **1** | Initial | Ad hoc, undocumented, dependent on individuals | No process documentation, tribal knowledge |
| **2** | Developing | Some standardization, repeated but reactive | Documented process, inconsistent execution |
| **3** | Defined | Standardized, documented, proactively managed | Consistent execution, clear ownership |
| **4** | Managed | Quantitatively managed with metrics | KPIs tracked, continuous improvement |
| **5** | Optimized | Continuously improving, industry-leading | Benchmarked against best-in-class, innovating |

**How to Use Maturity Assessments:**

1. Score each capability (1–5) on current and target maturity
2. Calculate the **Maturity Gap** (Target − Current)
3. Prioritize investments based on gap × strategic importance
4. Build initiatives to close critical gaps

### 2.6 Capability Heat Map

A **Capability Heat Map** overlays multiple data dimensions onto the capability map to create an at-a-glance view of where to invest:

**Common Heat Map Overlays:**

```
HEAT MAP OVERLAYS
│
├── MATURITY GAP (Red = Large gap, Green = At target)
│   Identifies where the organization is weakest relative to strategy
│
├── STRATEGIC IMPORTANCE (High / Medium / Low)
│   Identifies which capabilities are most critical to the strategy
│
├── INVESTMENT LEVEL (High / Medium / Low)
│   Identifies where budget is flowing vs. where it should flow
│
├── PAIN LEVEL (High / Medium / Low)
│   Identifies operational pain points from stakeholder interviews
│
└── AI TRANSFORMATION POTENTIAL (High / Medium / Low)
    Identifies which capabilities can be transformed by AI
```

**Reading a Heat Map:**
- Red + High Strategic Importance = Critical capability gap to address now
- Green + Low Strategic Importance = Candidate for consolidation or cost reduction
- Low Investment + High Pain = Underinvested — candidate for budget reallocation

---

## Part 3 — Value Streams and Value Chains

### 3.1 Porter's Value Chain

**Porter's Value Chain** (Michael Porter, 1985) decomposes an organization into strategically relevant activities to identify sources of competitive advantage.

```
PORTER'S VALUE CHAIN

PRIMARY ACTIVITIES (Directly create customer value)
┌──────────────┬────────────────┬────────────────┬──────────────┬──────────────┐
│ INBOUND      │  OPERATIONS    │  OUTBOUND      │ MARKETING    │   SERVICE    │
│ LOGISTICS    │                │  LOGISTICS     │  & SALES     │              │
│              │                │                │              │              │
│ Receiving    │ Manufacturing  │ Distribution   │ Advertising  │ Installation │
│ Storage      │ Assembly       │ Warehousing    │ Sales force  │ Repair       │
│ Inventory    │ Testing        │ Delivery       │ Pricing      │ Support      │
└──────────────┴────────────────┴────────────────┴──────────────┴──────────────┘
                                                                        ↑
SUPPORT ACTIVITIES (Enable primary activities)                   MARGIN
┌────────────────────────────────────────────────────────────────────────────┐
│ FIRM INFRASTRUCTURE (Finance, Legal, Management, Planning)                 │
├────────────────────────────────────────────────────────────────────────────┤
│ HUMAN RESOURCE MANAGEMENT (Recruiting, Training, Development)              │
├────────────────────────────────────────────────────────────────────────────┤
│ TECHNOLOGY DEVELOPMENT (R&D, Process Automation, IT Systems)               │
├────────────────────────────────────────────────────────────────────────────┤
│ PROCUREMENT (Vendor Management, Supplier Relationships)                    │
└────────────────────────────────────────────────────────────────────────────┘
```

**Value Chain Analysis for AI Transformation:**

| Value Chain Stage | AI Application | Value Created |
|------------------|----------------|--------------|
| Inbound Logistics | AI demand forecasting, supplier risk scoring | Reduced inventory cost, supply chain resilience |
| Operations | Predictive maintenance, quality vision AI, process optimization | Reduced downtime, zero-defect quality |
| Outbound Logistics | AI route optimization, last-mile AI | Reduced delivery cost and time |
| Marketing & Sales | AI personalization, lead scoring, pricing optimization | Higher conversion, better margins |
| Service | AI virtual agents, predictive service, churn prevention | Lower cost to serve, higher retention |

### 3.2 Value Streams (BIZBOK Definition)

A **Value Stream** is an end-to-end sequence of activities that creates value for a specific stakeholder — customer, employee, partner, or regulator. Unlike processes (which focus on internal steps), Value Streams focus on the stakeholder experience from outside in.

**Value Stream vs. Business Process:**

| Dimension | Value Stream | Business Process |
|-----------|-------------|----------------|
| **Perspective** | Outside-in (stakeholder experience) | Inside-out (how we do work) |
| **Boundary** | End-to-end, crosses departments | Often within a function |
| **Focus** | Value delivered | Activity sequence |
| **Trigger** | Stakeholder need | Business event |
| **Measurement** | Value delivered to stakeholder | Efficiency of execution |

### 3.3 Value Stream Example: Retail Banking — "Get a Loan"

```
VALUE STREAM: "Customer Gets a Loan" (Retail Bank)
Stakeholder: Retail Customer applying for a personal loan

┌────────────────┬─────────────────┬───────────────────┬─────────────────┬──────────────────┐
│   STAGE 1      │    STAGE 2      │     STAGE 3       │    STAGE 4      │     STAGE 5      │
│  Initiate      │   Apply         │   Assess          │   Decide        │   Receive        │
│                │                 │                   │                 │                  │
│ Customer       │ Complete        │ Bank reviews      │ Approved or     │ Funds            │
│ expresses      │ loan            │ credit, income,   │ declined with   │ disbursed,       │
│ interest       │ application     │ collateral        │ reasons         │ repayment starts │
│                │                 │                   │                 │                  │
│ Capabilities:  │ Capabilities:   │ Capabilities:     │ Capabilities:   │ Capabilities:    │
│ • Customer     │ • Digital       │ • Credit          │ • Decision      │ • Loan           │
│   Acquisition  │   Onboarding    │   Assessment      │   Management    │   Servicing      │
│ • Lead Mgmt    │ • Document Mgmt │ • Risk Scoring    │ • Notification  │ • Disbursement   │
│                │ • Identity Verif│ • Fraud Detection │                 │ • Collections    │
└────────────────┴─────────────────┴───────────────────┴─────────────────┴──────────────────┘
                                         │
                               VALUE METRICS:
                               • Time: 14 days → target 2 hours (AI-enabled)
                               • Approval rate: 65% → target 72%
                               • Customer effort: High → target Low
                               • Abandonment rate: 35% → target 10%
```

### 3.4 Value Streams in SAFe (Scaled Agile Framework)

SAFe uses Value Streams as the organizing unit for large-scale agile delivery:

**SAFe Value Stream Types:**

| Type | Description | Example |
|------|-------------|---------|
| **Operational Value Stream** | The sequence of steps to deliver a product/service to customers | "Customer requests fraud investigation" → investigation completed |
| **Development Value Stream** | The steps to build new digital capabilities | "Idea" → "Deployed to production" |

**Agile Release Train (ART):** A SAFe team-of-teams aligned to a single development value stream, delivering every 8–12 weeks.

---

## Part 4 — Business Domains and Domain-Driven Design

### 4.1 Business Domain

A **Business Domain** is a bounded area of business knowledge and activity that is cohesive and distinct from other areas. Domains are owned by specific business stakeholders, have clear boundaries, and speak their own "ubiquitous language."

Business Domains bridge business architecture and software architecture. They enable autonomous teams to work independently while still serving a coherent enterprise architecture.

**Domain Hierarchy:**

```
ENTERPRISE
└── BUSINESS DOMAIN (e.g., "Payments")
    └── SUBDOMAIN (e.g., "Payment Processing")
        └── BOUNDED CONTEXT (e.g., "Real-time Payment Engine")
```

### 4.2 Domain-Driven Design (DDD)

**Domain-Driven Design** (Eric Evans, 2003) provides the vocabulary and patterns for designing software that reflects business domains accurately.

**Core DDD Concepts:**

| Concept | Definition | Business Architecture Equivalent |
|---------|-----------|----------------------------------|
| **Domain** | Sphere of knowledge the application is applied to | Business Domain |
| **Ubiquitous Language** | Common vocabulary shared by developers and domain experts | Business Glossary |
| **Bounded Context** | Explicit boundary within which a model applies | Sub-domain / microservice boundary |
| **Context Map** | Visual showing how bounded contexts relate | Business Domain integration map |
| **Aggregate** | Cluster of objects treated as a unit | Business Object |
| **Domain Event** | Something that happened that domain experts care about | Business Event |

### 4.3 Bounded Context

A **Bounded Context** defines the explicit boundary within which a domain model is valid. The same term may mean different things in different bounded contexts — and that is expected and correct.

**Example: "Account" across Bounded Contexts**

```
BANKING ENTERPRISE

┌─────────────────────────┐    ┌──────────────────────────┐    ┌──────────────────────────┐
│  RETAIL BANKING CONTEXT │    │  INVESTMENT BANKING CTX  │    │  HR CONTEXT              │
│                         │    │                          │    │                          │
│  "Account" means:       │    │  "Account" means:        │    │  "Account" means:        │
│  Customer savings or    │    │  Trading account with    │    │  Employee HR record      │
│  checking account       │    │  securities portfolio    │    │  in payroll system       │
│                         │    │                          │    │                          │
│  Owner: Retail BU       │    │  Owner: IB BU            │    │  Owner: HR               │
└─────────────────────────┘    └──────────────────────────┘    └──────────────────────────┘
```

This is expected and healthy. The mistake is trying to force one "Account" model across all three — the resulting data model pleases no one and works for no one.

### 4.4 Context Map Patterns

How bounded contexts integrate with each other:

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| **Shared Kernel** | Two contexts share a subset of the domain model | Close coupling is acceptable and beneficial |
| **Customer-Supplier** | One context depends on another in a downstream relationship | Clear upstream-downstream dependency |
| **Conformist** | Downstream context adopts upstream model without modification | Upstream is an external system you can't change |
| **Anti-Corruption Layer (ACL)** | Translation layer isolates downstream from upstream model | Protecting your domain from a legacy/external system |
| **Published Language** | Shared, well-documented interchange language | Open ecosystem integration (e.g., FHIR in healthcare) |
| **Open Host Service** | Upstream exposes API protocol for downstream use | Microservices, platform APIs |

### 4.5 Business Events

**Business Events** are significant occurrences in the business domain that trigger processes, decisions, or notifications.

**Event Examples by Industry:**

| Industry | Business Event | Triggered Process |
|----------|---------------|-----------------|
| Banking | "Customer opened account" | KYC verification, welcome journey |
| Healthcare | "Patient discharged" | Discharge summary, follow-up scheduling |
| Retail | "Order placed" | Inventory reservation, fulfillment |
| Insurance | "Claim filed" | Claim assessment, fraud check |
| Manufacturing | "Machine failure detected" | Maintenance dispatch, production rerouting |

**Event-Driven Architecture** translates business events into technical messages (events) that trigger downstream services — enabling loose coupling, scalability, and real-time responsiveness.

---

## Part 5 — Business Model Design

### 5.1 Business Model Canvas (Osterwalder)

The **Business Model Canvas** (Alexander Osterwalder, 2010) is the dominant tool for designing and analyzing how an organization creates, delivers, and captures value.

```
BUSINESS MODEL CANVAS

┌─────────────────┬───────────────────────────┬─────────────────┐
│   KEY           │                           │   CUSTOMER      │
│   PARTNERS      │    KEY ACTIVITIES         │   RELATIONSHIPS │
│                 │                           │                 │
│                 ├───────────────────────────┤                 │
│                 │                           ├─────────────────┤
│                 │    VALUE PROPOSITIONS     │   CUSTOMER      │
│   KEY           │                           │   SEGMENTS      │
│   RESOURCES     │                           │                 │
│                 ├───────────────────────────┤                 │
│                 │                           │   CHANNELS      │
│                 │                           │                 │
└─────────────────┴───────────────────────────┴─────────────────┘
┌─────────────────────────────┬───────────────────────────────────┐
│         COST STRUCTURE      │           REVENUE STREAMS         │
└─────────────────────────────┴───────────────────────────────────┘
```

**Nine Building Blocks:**

| Block | Question | Example (SaaS) |
|-------|----------|----------------|
| **Customer Segments** | Who are we creating value for? | Mid-market finance teams |
| **Value Propositions** | What value do we deliver? | Close books 10x faster with AI |
| **Channels** | How do we reach customers? | Product-led, inside sales, partner |
| **Customer Relationships** | How do we maintain relationships? | Self-serve + Customer Success |
| **Revenue Streams** | How do we generate revenue? | Subscription + usage-based |
| **Key Resources** | What assets does our model require? | AI models, data, engineering talent |
| **Key Activities** | What must we do well? | Product development, AI training, sales |
| **Key Partners** | Who do we work with? | AWS, Salesforce, accounting firms |
| **Cost Structure** | What are the major costs? | R&D, cloud infrastructure, sales |

### 5.2 Value Proposition Canvas

The **Value Proposition Canvas** (Osterwalder) zooms into one cell of the BMC — the customer segment × value proposition — to ensure fit.

```
VALUE PROPOSITION CANVAS

LEFT SIDE: CUSTOMER PROFILE        RIGHT SIDE: VALUE MAP
────────────────────────────────   ────────────────────────────────
                                   
JOBS (What they're trying to do)   PRODUCTS & SERVICES (What you offer)
• Close month-end books            • AI-powered financial closing tool
• Ensure compliance                • Real-time anomaly detection
• Report to CFO                    • Automated reconciliation
                                   
PAINS (Frustrations, obstacles)    PAIN RELIEVERS (How you reduce pain)
• Takes 10 days each month         • Reduces closing to 2 days
• Manual reconciliation errors     • AI catches 97% of errors before review
• No visibility into status        • Real-time dashboard for CFO
                                   
GAINS (Desired outcomes)           GAIN CREATORS (How you create gains)
• Faster close cycle               • Frees FP&A team for strategic work
• Confident numbers                • Audit trail for compliance
• CFO visibility                   • CFO-ready reports in one click
```

---

## Part 6 — Organization Design

### 6.1 What Is Organization Design?

**Organization Design** is the deliberate structuring of an organization's roles, reporting lines, decision rights, processes, and culture to deliver on its strategy. Organization design is the "people and structure" dimension of the Operating Model.

Peter Drucker: *"Structure follows strategy."* — The right organization structure depends on what the organization is trying to achieve.

### 6.2 Classic Organization Structures

**Functional Structure:**
```
CEO
├── CFO (Finance)
├── CMO (Marketing)
├── CTO (Technology)
├── COO (Operations)
└── CHRO (Human Resources)
```
Best for: Stable, efficiency-focused organizations. Deepens expertise. Slow to cross-function.

**Divisional Structure:**
```
CEO
├── Division A (Product / Market / Region)
│   ├── Marketing
│   ├── Sales
│   └── Operations
├── Division B
└── Division C
```
Best for: Large, diverse organizations in different markets. Fast to market, but duplicates capability.

**Matrix Structure:**
```
CEO
├── Functional Leaders (Marketing, Technology, Finance)
└── Business Unit Leaders (Product A, Product B, Region)
    (Each team member reports to both a functional leader AND a BU leader)
```
Best for: Balancing functional excellence with business agility. High coordination cost.

**Platform Organization (2026):**
```
CEO
├── Platform Teams (Shared capability providers)
│   ├── Data Platform
│   ├── AI Platform
│   ├── Identity Platform
│   └── Customer Platform
└── Value Stream Teams (Product/customer-facing)
    ├── Consumer Banking
    ├── SMB Banking
    └── Wealth Management
    (Each value stream team consumes platform capabilities)
```
Best for: Digital-native or transforming organizations. Enables autonomy + shared capability.

### 6.3 Modern Organizational Archetypes

| Archetype | Description | Best For |
|-----------|-------------|----------|
| **Hierarchical** | Command-and-control with clear reporting lines | Regulated, stable, safety-critical industries |
| **Federated** | Central standards + local autonomy | Multi-BU enterprises with distinct markets |
| **Platform + Teams** | Shared platforms + autonomous product teams | Digital/tech-first organizations |
| **Networked** | Fluid, project-based teams across ecosystem | Innovation, professional services |
| **Agile at Scale** | SAFe/Spotify model with squads, tribes, chapters | Large-scale software delivery |
| **Ecosystem** | Orchestrating network of partners | Marketplace, platform businesses |

### 6.4 Centers of Excellence (CoE)

A **Center of Excellence** is a centralized team that provides specialized expertise, standards, tools, and governance for a specific capability domain across the enterprise.

**Common CoEs in 2026:**

| CoE | Purpose | Deliverables |
|-----|---------|-------------|
| **AI CoE** | Drive enterprise AI adoption and governance | AI standards, model library, AI ops toolchain |
| **Data CoE** | Govern enterprise data as a strategic asset | Data catalog, data quality standards, MDM |
| **Cloud CoE** | Enable cloud adoption with guardrails | Cloud standards, cost governance, FinOps |
| **Security CoE** | Enterprise security standards and operations | Security architecture, threat intelligence |
| **Platform Engineering CoE** | Internal developer platform | IDP, CI/CD standards, observability |
| **Architecture CoE** | Enterprise architecture governance | Standards, patterns, ARB |

**CoE vs. Community of Practice:**

| Dimension | CoE | Community of Practice (CoP) |
|-----------|-----|-----------------------------|
| **Structure** | Formal, funded team | Informal, self-organizing |
| **Authority** | Governance authority | Influence and knowledge sharing |
| **Deliverables** | Standards, tools, policies | Best practices, learning |
| **Members** | Dedicated staff | Volunteers alongside day job |
| **Accountability** | Accountable for outcomes | Accountable to the community |

### 6.5 Digital Factory

A **Digital Factory** is a dedicated organizational unit designed to accelerate digital product delivery through autonomous, cross-functional teams, modern engineering practices, and streamlined governance.

**Digital Factory Characteristics:**
- Co-located or virtual cross-functional teams (Product + Design + Engineering + Data)
- Product-led operating model (not project-led)
- End-to-end ownership from idea to production
- Autonomous teams: self-contained squad model
- Modern toolchain: cloud-native, CI/CD, DevSecOps
- Separate governance from core enterprise governance
- Focus: speed of delivery and validated learning

---

## Part 7 — Operating Model Design

### 7.1 What Is an Operating Model?

An **Operating Model** defines how an organization delivers on its strategy — the combination of its capabilities, processes, people, technology, governance, and information that creates and delivers value.

If Strategy answers *"What"* and Business Architecture answers *"What capabilities we need,"* the Operating Model answers *"How we organize and run to deliver those capabilities."*

**Operating Model Components (Six Dimensions):**

```
OPERATING MODEL — SIX DIMENSIONS

┌─────────────────────────────────────────────────────────────────┐
│                     STRATEGY & PURPOSE                          │
│                  (The 'Why' that drives design)                 │
└──────────────────────────┬──────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
  ORGANIZATION         PROCESS           TECHNOLOGY
  Structure, roles,    How work flows,   Systems, platforms,
  governance,          standards,        automation, data
  decision rights       handoffs
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
    PEOPLE              DATA              GOVERNANCE
  Skills, talent,    Information         Controls, risk,
  culture,           assets,             compliance,
  incentives         analytics           oversight
```

### 7.2 Target Operating Model (TOM)

The **Target Operating Model** is the future-state design of how the organization will operate — the intended end-state that transformation programs are designed to achieve.

**TOM Components:**

| Component | Description | Example (Bank Digital TOM) |
|-----------|-------------|--------------------------|
| **Strategic Intent** | The objective the TOM supports | "AI-native bank by 2028" |
| **Organization Design** | Future structure, roles, reporting | Platform + Value Stream teams |
| **Capability Model** | Target capabilities and maturity | L5 AI credit, L4 digital onboarding |
| **Value Streams** | Key end-to-end flows | Customer gets loan in 2 hours |
| **Process Design** | Future-state processes (Level 2–3) | Straight-through-process for loans <$25K |
| **Technology Architecture** | Future application and platform landscape | Cloud-native, API-first core |
| **Data & Analytics** | Future data capabilities | Real-time data platform, AI/ML pipeline |
| **Governance** | Decision rights, committees, policies | Federated governance with AI CoE |
| **People & Culture** | Skills, structure, behaviors needed | AI-fluent workforce, product mindset |
| **Transition Plan** | How to get from current to target state | 18-month phased roadmap |

### 7.3 TOM Design Principles

Effective TOMs are designed against a set of architecture principles agreed upfront:

**Example TOM Design Principles:**

```
TOM DESIGN PRINCIPLES (Example: Financial Services)

1. CUSTOMER-CENTRICITY FIRST
   Every process redesign starts with the customer experience,
   not internal convenience.

2. DIGITAL-BY-DEFAULT
   Digital channel is the primary channel. Physical is the exception.
   No process is designed that cannot be completed digitally.

3. AI-AUGMENTED, HUMAN-GOVERNED
   AI handles routine work. Humans make exceptions and policy decisions.
   Every AI decision has a human accountable for outcomes.

4. DATA AS A PRODUCT
   Data is treated as a managed asset with owners, consumers, SLAs.
   No capability can function without trustworthy data.

5. PLATFORM OVER BESPOKE
   Reuse before build. Buy before build. Build only when unique value exists.
   All platforms are API-accessible and composable.

6. FEDERATED GOVERNANCE
   Business units have autonomy within enterprise guardrails.
   Central standards enable decentralized execution.
```

### 7.4 Current State vs. Target State: Gap Analysis

The TOM process always includes a gap analysis comparing the current operating model to the target:

```
OPERATING MODEL GAP ANALYSIS FRAMEWORK

DIMENSION          CURRENT STATE           TARGET STATE           GAP
─────────────────  ──────────────────────  ─────────────────────  ──────────────────────
Organization       Siloed by function      Platform + Value       Reorganization required;
                   12 BUs, no shared       Stream teams           new roles: Platform
                   services                                       Engineers, Product owners

Processes          Manual, 14-day loan     STP for <$25K loans;  Process redesign;
                   approval; 47 steps      AI-assisted for        AI workflow engine;
                                           complex cases          exception-only human

Technology         3 core banking systems  Single cloud-native    7-year migration; API-
                   legacy; no API layer    platform; API-first    first integration layer

Data               10 siloed data          Unified data platform  Data migration; MDM;
                   warehouses; no single   with real-time         data governance program
                   customer view           customer 360

People             80% operations          60% engineering/       Reskilling program;
                   specialists             product talent         AI literacy training
```

### 7.5 Operating Model Archetypes

**Coordination Model (McKinsey):**

| Model | Description | When Appropriate |
|-------|-------------|-----------------|
| **Diversification** | BUs are independent; corporate adds little synergy | Conglomerate, holding company |
| **Coordination** | BUs are related; corporate facilitates sharing | Multi-product enterprise |
| **Replication** | Same model replicated across geographies | Retail chains, franchise |
| **Unification** | Single operating model across all units | Single-product company |

**Technology Delivery Model:**

| Model | Description | Trade-offs |
|-------|-------------|-----------|
| **Centralized IT** | Single IT function serves all business units | Efficiency vs. business agility |
| **Federated IT** | Each BU has its own IT with central standards | Agility vs. fragmentation |
| **Product IT** | Product teams own their technology end-to-end | Speed vs. duplication |
| **Platform IT** | Platform teams + stream-aligned product teams | Balance of both (Team Topologies model) |

---

## Part 8 — AI Operating Model

### 8.1 Why a Distinct AI Operating Model?

AI capabilities require a fundamentally different operating model from traditional IT capabilities:

| Dimension | Traditional IT | AI Operating Model |
|-----------|---------------|-------------------|
| **Delivery** | Requirements → Build → Release | Experiment → Validate → Scale |
| **Maintenance** | Bug fixes, feature updates | Model retraining, drift monitoring, prompt updates |
| **Quality** | Functional correctness | Accuracy, fairness, explainability |
| **Governance** | Technical standards | Responsible AI + regulatory compliance |
| **Skills** | Software engineers | ML engineers, data scientists, AI architects |
| **Risk** | System failure | Hallucination, bias, adversarial attack |
| **Lifecycle** | SDLC | MLOps + LLMOps + AgentOps |

### 8.2 AI Operating Model Components

```
AI OPERATING MODEL

STRATEGY LAYER
├── AI Strategy (use case portfolio, build/buy/partner)
├── AI Governance (responsible AI, risk, compliance)
└── AI Investment Management (FinOps for AI)

ORGANIZATION LAYER
├── AI Center of Excellence (standards, enablement)
├── AI Product Teams (embed AI into product streams)
├── AI Platform Team (builds and operates AI infrastructure)
└── AI Governance Board (oversight, risk, ethics)

DELIVERY LAYER
├── AI Development Lifecycle (AIDLC)
├── MLOps (model training, deployment, monitoring)
├── LLMOps (prompt management, model selection, cost)
├── AgentOps (agent orchestration, memory, guardrails)
└── PromptOps (prompt versioning, A/B testing, governance)

PLATFORM LAYER
├── AI Platform (model serving, vector DB, inference)
├── Data Platform (training data, feature store, lineage)
├── Observability Platform (model performance, drift, cost)
└── Security Platform (input/output filtering, access control)

GOVERNANCE LAYER
├── Responsible AI Framework (bias, fairness, transparency)
├── AI Risk Register (model-level risk tracking)
├── AI Compliance (regulatory requirements: EU AI Act, etc.)
└── AI Audit (periodic review of model performance and ethics)
```

### 8.3 Agentic AI Operating Model (2026)

**Agentic AI** introduces new operational requirements beyond traditional ML/LLM deployment:

| Dimension | GenAI (LLM) | Agentic AI (Agents) |
|-----------|-------------|---------------------|
| **Autonomy** | Request/response | Multi-step autonomous execution |
| **Tools** | None / minimal | Tool calling, API integration |
| **Memory** | Stateless | Short-term + long-term memory |
| **Risk** | Hallucination | Hallucination + runaway action |
| **Governance** | Output review | Human-in-the-Loop checkpoints |
| **Ops** | LLMOps | AgentOps + LLMOps |
| **Cost model** | Per-token | Per-workflow + per-tool-call |

→ *See [Vol 5](./vol5-ai-strategy-transformation-glossary) for complete AgentOps and AI Operating Model.*

---

## Part 9 — Business Building Blocks

### 9.1 What Are Building Blocks?

**Building Blocks** are reusable, standardized components — business, application, data, or technology — that can be assembled to create capabilities and solutions.

TOGAF defines two types:
- **Architecture Building Blocks (ABBs)**: Abstract, specification-level components (e.g., "Authentication Service")
- **Solution Building Blocks (SBBs)**: Concrete, implemented components (e.g., "Microsoft Entra ID")

### 9.2 Business Building Block Taxonomy

```
BUSINESS BUILDING BLOCKS

├── BUSINESS CAPABILITIES (What we do)
│   e.g., Customer Onboarding, Credit Assessment, Payment Processing
│
├── BUSINESS SERVICES (What we offer)
│   e.g., Digital Account Opening, Real-time Transfer, AI Advisory
│
├── BUSINESS PROCESSES (How we do it)
│   e.g., KYC Verification Process, Loan Approval Workflow
│
├── BUSINESS RULES (Constraints on how we operate)
│   e.g., "Loans above $500K require two approvers"
│
├── BUSINESS OBJECTS (What we manage)
│   e.g., Customer, Account, Transaction, Claim, Contract
│
└── BUSINESS EVENTS (What happens)
    e.g., AccountOpened, LoanApproved, PaymentReceived
```

### 9.3 Technology Building Blocks (2026)

| Building Block | Description | Examples |
|---------------|-------------|---------|
| **Identity** | Authentication, authorization, identity federation | Entra ID, Okta, AWS IAM |
| **API Gateway** | API management, rate limiting, security | Kong, Apigee, AWS API Gateway |
| **Integration** | Message bus, event streaming, ETL | Kafka, MuleSoft, Azure Service Bus |
| **Observability** | Logging, metrics, tracing | Datadog, Grafana, OpenTelemetry |
| **Container Platform** | Container orchestration | Kubernetes, ECS, AKS |
| **CI/CD** | Continuous integration and deployment | GitHub Actions, ArgoCD, Tekton |
| **AI Inference** | Model serving and inference | AWS Bedrock, Azure OpenAI, vLLM |
| **Vector Store** | Semantic search and RAG | Pinecone, Weaviate, pgvector |
| **Knowledge Graph** | Entity relationships and reasoning | Neo4j, AWS Neptune |
| **Agent Framework** | Agent orchestration and memory | LangGraph, Strands, AutoGen |

---

## Part 10 — Business Glossary and Taxonomy

### 10.1 Business Glossary

A **Business Glossary** is the authoritative dictionary of business terms used within the organization — ensuring everyone uses the same words to mean the same things.

**Why It Matters:**
- "Customer" means different things in Sales, IT, Legal, and Finance
- "Revenue" is calculated differently in different P&L systems
- Without a glossary, data integrations fail silently (joining the wrong "account" concepts)
- AI models trained on poorly defined terms produce inconsistent outputs

**Business Glossary Structure:**

| Field | Description |
|-------|-------------|
| **Term** | The business term |
| **Definition** | Clear, unambiguous definition in business language |
| **Synonyms** | Alternative names used in the organization |
| **Domain** | Which business domain owns this term |
| **Owner** | The business role accountable for this definition |
| **Status** | Active / Deprecated / Under Review |
| **Related Terms** | Related concepts in the glossary |
| **Examples** | Concrete examples to clarify the definition |
| **Data Source** | Which system(s) capture this concept |

### 10.2 Business Taxonomy

A **Business Taxonomy** is the hierarchical classification system for organizing business concepts — products, customers, geographies, channels, etc.

**Product Taxonomy Example (Bank):**

```
PRODUCT
└── FINANCIAL PRODUCTS
    ├── DEPOSITS
    │   ├── Checking Accounts
    │   ├── Savings Accounts
    │   └── Time Deposits
    ├── LENDING
    │   ├── Personal Loans
    │   ├── Auto Loans
    │   ├── Home Loans
    │   └── Credit Cards
    └── INVESTMENTS
        ├── Mutual Funds
        ├── ETFs
        └── Fixed Income
```

**Why Taxonomies Matter for AI:**
- AI classification models require clean, consistent taxonomy
- RAG systems retrieve more accurately when documents are taxonomy-tagged
- Reporting and analytics require consistent product categorization

---

## Part 11 — Customer Journey and Service Blueprint

### 11.1 Customer Journey Map

A **Customer Journey Map** visualizes the end-to-end experience a customer has with an organization — across all touchpoints, channels, and time — from first awareness through advocacy.

```
CUSTOMER JOURNEY MAP — Banking Example: "Opening a Savings Account"

PHASE:      │ AWARE      │ CONSIDER    │ APPLY       │ ONBOARD     │ ENGAGE
            │            │             │             │             │
TOUCHPOINT: │ Instagram  │ Website     │ Mobile App  │ Email +App  │ App + Branch
            │ Ad         │ Comparison  │ Form        │             │
            │            │             │             │             │
CUSTOMER    │ "I see     │ "Are they   │ "This form  │ "I got my   │ "I use it
SAYS:       │ their ads  │ better than │ is long —   │ card, now   │ daily — love
            │ everywhere"│ my bank?"   │ is it safe?"│ what?"      │ the insights"
            │            │             │             │             │
FEELING:    │ 😐 Neutral │ 🤔 Curious  │ 😤 Annoyed  │ 😊 Happy    │ 😍 Advocate
            │            │             │             │             │
PAIN:       │            │ Hard to     │ 15-page KYC │ No guidance │
            │            │ compare     │ form        │ on features │
            │            │             │             │             │
OPPORTUNITY:│ AI-targeted│ Comparison  │ AI pre-fill │ AI-powered  │ Personalized
            │ ads        │ widget      │ from ID     │ onboarding  │ insights
```

### 11.2 Service Blueprint

A **Service Blueprint** extends the Customer Journey Map to reveal the behind-the-scenes processes, systems, and people that enable each touchpoint.

```
SERVICE BLUEPRINT LAYERS

LINE OF INTERACTION (visible to customer)
─────────────────────────────────────────────────────────
Customer Actions: What the customer does at each touchpoint

LINE OF VISIBILITY (what customer can see)
─────────────────────────────────────────────────────────
Frontstage Employee Actions: What staff do that customer sees
Frontstage Technology: What systems/UI customer interacts with

LINE OF INTERNAL INTERACTION
─────────────────────────────────────────────────────────
Backstage Employee Actions: What staff do behind the scenes
Backstage Technology: Systems that enable but aren't visible
Support Processes: IT, finance, legal, compliance
```

---

## Part 12 — Key Relationships and Comparisons

### 12.1 Capability vs. Function vs. Process vs. Service

| Concept | Definition | Example | Key Distinction |
|---------|-----------|---------|----------------|
| **Capability** | What the org CAN DO | "Credit Assessment" | What, not how |
| **Function** | Organizational unit that owns capabilities | "Credit Risk Department" | Who owns it |
| **Process** | How a capability is executed step-by-step | "Loan Approval Workflow (17 steps)" | How it's done |
| **Service** | What the organization OFFERS to stakeholders | "Instant Loan Decision" | What's delivered to whom |

### 12.2 Value Stream vs. Process vs. Journey

| Concept | Perspective | Boundary | Example |
|---------|------------|----------|---------|
| **Value Stream** | Outside-in; stakeholder value | End-to-end across departments | "Customer gets a loan" |
| **Business Process** | Inside-out; activity sequence | Usually within one function | "Underwriting Process" |
| **Customer Journey** | Customer experience | Customer-facing touchpoints only | "Loan Application Experience" |

### 12.3 Operating Model vs. Organization Structure

| Dimension | Operating Model | Organization Structure |
|-----------|-----------------|----------------------|
| **Scope** | Full: people, process, technology, governance | People and reporting lines only |
| **Breadth** | Holistic — all six dimensions | Narrow — hierarchy and roles |
| **Stability** | Changes with strategy shifts | Changes less frequently |
| **Owner** | CEO / COO / Chief Transformation Officer | CHRO / CEO |
| **Document** | TOM blueprint | Org chart |

---

*→ Continue to [Vol 3 — Portfolio Management & Governance](./vol3-portfolio-governance)*

*← Return to [Handbook Index](./index)*
