---
title: "Vol 6 — Organization Structure & Operating Model Design"
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["organization-design", "operating-model", "agile", "platform-organization", "ai-operating-model", "target-operating-model", "ai-coe"]
doc_type: handbook-volume
series_name: Enterprise Strategy & Business Architecture Handbook
series_part: 6
series_total: 10
---

# Vol 6 — Organization Structure & Operating Model Design

> **Covers:** Every major enterprise organization archetype, operating model variant, Target Operating Model (TOM) design methodology, AI Center of Excellence models, and a five-level AI organizational maturity framework. Suitable for Chief People Officers, Chief Operating Officers, Enterprise Architects, and transformation consultants designing or redesigning large-scale organizational systems.

---

## Part 1 — Why Organization Design Matters

### 1.1 The Organizational Design Problem

Structure follows strategy — or it should. Yet most enterprises carry organizational structures inherited from a different era, a different strategy, or a previous leadership regime. The result is predictable:

- **Accountability gaps:** Nobody owns the outcome because everybody owns a piece
- **Decision latency:** Simple choices require multiple approval layers across multiple chains
- **Resource misallocation:** Funding flows to cost centers rather than value streams
- **Culture-strategy mismatch:** The official strategy says "customer-centric" but the org chart says "function-centric"

Organization design is the discipline of aligning structure, governance, roles, processes, and culture to strategy. It is not an HR exercise — it is a strategic capability.

### 1.2 The Conway's Law Problem for Enterprise Architects

Conway's Law (1967): *"Organizations which design systems are constrained to produce designs which are copies of the communication structures of those organizations."*

This has profound implications for AI transformation:

- A siloed organization will build siloed AI systems
- A federated data governance model will produce federated (and therefore inconsistent) data products
- A centralized approval process will produce slow, risk-averse AI deployments

**Inverse Conway Maneuver:** Deliberately redesign the organization to produce the architecture you want. This is now a standard design move in platform engineering and AI transformation programs.

---

## Part 2 — Enterprise Organization Structures

### 2.1 Traditional Functional Hierarchy

**Definition:** Functions (Finance, HR, IT, Operations, Sales, Marketing) report vertically to a functional head. Authority flows top-down. Coordination happens through formal committees and the executive team.

**Structural Diagram:**
```
CEO
├── CFO (Finance)
│   ├── FP&A
│   ├── Accounting
│   └── Treasury
├── CTO (Technology)
│   ├── Infrastructure
│   ├── Development
│   └── Architecture
├── COO (Operations)
│   ├── Supply Chain
│   ├── Manufacturing
│   └── Logistics
└── CMO (Marketing)
    ├── Brand
    ├── Digital
    └── Analytics
```

**Advantages:**
- Deep functional expertise and clear career ladders
- Efficient resource pooling within functions
- Strong specialization and standards enforcement
- Clear accountability within each function

**When It Still Works:**
- Stable industries with predictable demand patterns (utilities, regulated banking)
- Organizations where functional excellence is the primary differentiator
- Environments with strong regulatory requirements demanding functional ownership
- Organizations below ~500 employees where coordination costs are low

**When It Fails:**
- Cross-functional product development requiring fast iteration
- Customer experience transformation requiring end-to-end ownership
- AI programs that span data, technology, and business units
- Any environment requiring speed-to-market as a competitive advantage

**Enterprise Examples:**
- Traditional manufacturing firms (automotive OEMs pre-2010)
- Legacy financial services (large retail banks pre-digital transformation)
- Government agencies (standard departmental structure)

| Dimension | Rating | Notes |
|-----------|--------|-------|
| Coordination speed | Low | Cross-function decisions require escalation |
| Specialization depth | High | Functional silos develop deep expertise |
| Customer orientation | Low | No single owner of the customer journey |
| AI readiness | Low | Data, IT, and business are structurally separated |
| Change adaptability | Low | Hierarchy resists lateral reorganization |

---

### 2.2 Matrix Organization

**Definition:** Resources report to two bosses simultaneously — a functional manager (who owns the resource pool, skills, and career development) and a project/product/business manager (who owns the deliverable, timeline, and prioritization).

**Types of Matrix:**

| Type | Balance of Power | When Used |
|------|-----------------|-----------|
| **Weak Matrix** | Functional manager dominant | Project coordination, not execution |
| **Balanced Matrix** | Equal power | Large programs needing shared resources |
| **Strong Matrix** | Project/Product manager dominant | Product-centric transformation |

**Dual Reporting Structure:**
```
Functional Manager (CTO)          Product Manager (Digital Banking Head)
         │                                    │
         ├─── Developer A ──────────────────── ► Product Team 1
         ├─── Developer B ──────────────────── ► Product Team 2
         └─── Architect C  ──────────────────── ► Platform Team
```

**Accountability Challenges:**
- "Two-boss problem": conflicting priorities between functional and product managers
- Performance management ambiguity: who rates whom?
- Resource contention: both bosses want the best people
- Decision paralysis when functional and product priorities conflict

**Making Matrix Work:**
- Explicit decision rights (RACI) for each type of decision
- Clear escalation paths defined before conflicts arise
- Transparency on resource allocation percentages
- Regular tri-party check-ins: resource, functional manager, product manager

**Enterprise Examples:**
- Global consulting firms (resource pools + client delivery structure)
- Aerospace and defense (engineering functions + program management)
- Large technology companies during transformation (AWS, Google circa 2010-2015)

---

### 2.3 Divisional Structure

**Definition:** The organization is divided into semi-autonomous business divisions, each with its own P&L, functional capabilities, and leadership. Divisions are organized by geography, product line, customer segment, or market.

**Divisional Variants:**

**By Geography:**
```
Group HQ
├── Americas Division (P&L owner, full stack)
├── EMEA Division (P&L owner, full stack)
└── APAC Division (P&L owner, full stack)
```

**By Product Line:**
```
Conglomerate HQ
├── Consumer Products Division
├── Industrial Products Division
└── Financial Services Division
```

**By Customer Segment:**
```
Bank HQ
├── Retail Banking Division (individual customers)
├── Corporate Banking Division (mid-market & enterprise)
└── Wealth Management Division (high net worth)
```

**Advantages:**
- Clear P&L accountability
- Empowered divisional leaders close to the market
- Easier to acquire, divest, or spin out divisions
- Allows different strategies in different markets

**Disadvantages:**
- Duplication of shared capabilities (each division builds its own IT, HR, etc.)
- Difficulty capturing enterprise-wide synergies
- Inconsistent customer experience across divisions
- Shared services coordination overhead

**AI Governance in Divisional Structures:**
The primary challenge is data sovereignty and model sharing across divisions. Solutions include:
- Enterprise AI platform as shared service from HQ
- Division-level AI teams consuming shared platform services
- Federated governance: division owns use case, enterprise owns model risk

---

### 2.4 Platform Organization (Team Topologies Model)

**Definition:** Matthew Skelton and Manuel Pais (Team Topologies, 2019) define four fundamental team types that reduce cognitive load and enable fast flow. This model has become the dominant organizational design approach for technology-intensive enterprises.

**Four Team Types:**

```
┌─────────────────────────────────────────────────────────────┐
│                    STREAM-ALIGNED TEAMS                      │
│    Aligned to business value stream; end-to-end ownership    │
│    Example: "Digital Payments", "Customer Onboarding"        │
└─────────────────────────────────────────────────────────────┘
         ↑ X-as-a-Service        ↑ Collaboration (time-limited)
┌──────────────┐          ┌─────────────────────────────────┐
│  PLATFORM    │          │     ENABLING TEAMS               │
│  TEAMS       │          │  Help stream-aligned teams       │
│              │          │  acquire missing capabilities    │
│  Provide     │          │  Example: DevOps CoP, Security   │
│  self-service│          │  Enablement, AI Enablement       │
│  foundations │          └─────────────────────────────────┘
└──────────────┘
         ↑ X-as-a-Service
┌──────────────────────────────────────────────────────────────┐
│              COMPLICATED-SUBSYSTEM TEAMS                      │
│   Own complex technical areas requiring specialization        │
│   Example: ML Platform, Risk Engine, Fraud Detection Model    │
└──────────────────────────────────────────────────────────────┘
```

**Interaction Modes:**

| Mode | Description | Duration |
|------|-------------|----------|
| **X-as-a-Service** | Platform/subsystem provides service; stream-aligned team consumes | Ongoing |
| **Collaboration** | Two teams work closely together on a problem | Time-bounded (weeks/months) |
| **Facilitation** | Enabling team helps another team upskill | Time-bounded (until capability built) |

**Cognitive Load Management:**
Team Topologies is built around minimizing cognitive load — the amount any team needs to hold in mind to do their work. Oversized teams with too many responsibilities suffer from:
- Slower delivery due to context switching
- Knowledge gaps when team members leave
- Architecture violations due to unclear ownership

**AI Application of Team Topologies:**
```
Stream-Aligned:   "AI-Powered Claims Processing" team
Platform:         "AI Platform" team (LLM gateway, vector DB, evaluation)
Enabling:         "AI Enablement" team (prompt engineering training, safety)
Complicated:      "Risk Model" team (specialized ML, regulatory compliance)
```

---

### 2.5 Federated Model

**Definition:** Authority and capabilities are distributed between a central function (which sets standards, provides shared services, and maintains governance) and business unit/divisional teams (which execute with local autonomy).

**Federation Governance Rights Matrix:**

| Decision Type | Central | Federated | Local |
|---------------|---------|-----------|-------|
| Enterprise architecture standards | DECIDE | CONSULT | INFORM |
| Technology platform selection | DECIDE | CONSULT | INFORM |
| Business unit technology choices | APPROVE | DECIDE | EXECUTE |
| Local tool and vendor selection | STANDARDS | CONSULT | DECIDE |
| Security baseline | MANDATE | COMPLY | COMPLY |
| Data governance policy | MANDATE | ADAPT | COMPLY |
| AI use case prioritization | STRATEGY | DECIDE | EXECUTE |
| AI model risk approval | APPROVE | PROPOSE | NONE |

**Federated Model Variants:**

| Variant | Center Role | Business Unit Role |
|---------|------------|-------------------|
| **Strong Center** | Mandates standards, provides all shared services | Executes within tight guardrails |
| **Balanced Federation** | Sets standards, provides platforms; BU can deviate with approval | Operates with significant autonomy |
| **Loose Federation** | Principles only; BU builds own capabilities | High autonomy, low consistency |

**The AI Governance Tension:**
Federated models create a natural tension in AI governance. Business units want speed; the center wants risk control. Resolution mechanisms:
- **AI Risk Tiering:** High-risk AI (autonomous decisions on credit, medical, legal) requires central approval. Low-risk (analytics, content generation) can be locally governed.
- **Platform Acceleration:** The central platform reduces friction so fast doesn't require bypassing governance.
- **Federated Trust:** Business units that demonstrate responsible AI practices earn higher autonomy.

---

### 2.6 Network Organization (Ecosystem Orchestrator Model)

**Definition:** The enterprise functions as an orchestrator, coordinating value creation across a network of external partners, suppliers, platforms, and co-creators. The internal organization is lean; most capability is in the ecosystem.

**Examples:**
- Apple: orchestrates app developers, hardware suppliers, content creators
- Airbnb: orchestrates hosts, guests, experience providers, service vendors
- Siemens Xcelerator: orchestrates industrial IoT partners and system integrators

**Implications for Enterprise Architecture:**
- APIs become the primary integration mechanism (the "network" is API-connected)
- Data governance must extend to partner ecosystems
- Platform teams become platform-of-platforms teams
- Identity and authorization must span organizational boundaries

**AI in Network Organizations:**
- AI agents must be able to operate across organizational boundaries
- Trust hierarchies must be established between internal and partner agents
- Agent-to-agent (A2A) protocol becomes critical for ecosystem orchestration

---

### 2.7 Agile at Scale: SAFe, LeSS, and Spotify Model

#### SAFe 6.0 (Scaled Agile Framework)

**Core Concept:** Hierarchical agile scaling — individual teams → Agile Release Trains (ARTs) → Solution Trains → Portfolio. Coordination happens through Program Increment (PI) Planning events.

**Four Configurations:**

| Configuration | Scale | Key Construct |
|---------------|-------|---------------|
| **Essential SAFe** | Single ART (50-125 people) | PI Planning, Product Owner, Scrum Master |
| **Large Solution SAFe** | Multiple ARTs building one large solution | Solution Train, Solution Architect |
| **Portfolio SAFe** | Multiple ARTs + strategy/funding | Lean Portfolio Management (LPM), Epics |
| **Full SAFe** | All levels + continuous learning | All constructs |

**Key SAFe Constructs for Enterprise Strategy:**
- **Lean Portfolio Management (LPM):** Connects strategy to execution. Portfolio epics represent strategic investments. WSJF (Weighted Shortest Job First) prioritizes work.
- **Program Increment (PI) Planning:** Quarterly synchronized planning event (typically 2 days). All ART members plan together.
- **Architectural Runway:** Technical investment that enables future features. Prevents technical debt accumulation.

#### LeSS (Large-Scale Scrum)

**Core Concept:** Single Product Backlog, one Product Owner, multiple Scrum Teams. Simpler than SAFe but requires more organizational change.

| Aspect | LeSS | SAFe |
|--------|------|------|
| Complexity | Lower | Higher |
| Structural change required | High | Moderate |
| Management layers | Reduced | Preserved |
| Works best for | Single product/platform | Portfolio of products |
| Enterprise adoption | Technology companies | Large enterprises |

#### Spotify Model

**Core Concept (Not a Framework — a Case Study):** Squads (autonomous teams), Tribes (groups of squads), Chapters (functional communities within tribes), Guilds (cross-tribe communities of practice). Originally described in a 2012 Spotify engineering blog post.

**Critical Warning:** The Spotify model was a description of Spotify's practice at a point in time — it was never a prescriptive framework. Spotify itself has evolved away from many elements. Enterprises that attempt to "implement the Spotify model" often do so without the underlying culture that made it work. The key elements worth adopting:
- Squad autonomy with alignment (not independence)
- Community of practice (Guilds/Chapters) for shared learning
- Alignment on "what" with autonomy on "how"

---

## Part 3 — Operating Model Design

### 3.1 What Is an Operating Model?

An **Operating Model** defines how an organization delivers value — the combination of people, processes, technology, data, and governance that enables strategy to be executed. Where organization structure defines *who reports to whom*, the operating model defines *how work actually gets done*.

**The Five Operating Model Dimensions:**

```
┌─────────────────────────────────────────────────────────┐
│                    OPERATING MODEL                       │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐             │
│  │ PEOPLE   │  │PROCESSES │  │TECHNOLOGY│             │
│  │ Roles    │  │ Workflows│  │ Systems  │             │
│  │ Skills   │  │ Standards│  │ Platforms│             │
│  │ Culture  │  │ Controls │  │ Data     │             │
│  └──────────┘  └──────────┘  └──────────┘             │
│                    │                                    │
│              ┌──────────┐  ┌──────────┐               │
│              │   DATA   │  │GOVERNANCE│               │
│              │ Ownership│  │ Policies │               │
│              │ Quality  │  │ Controls │               │
│              │ Products │  │ Decisions│               │
│              └──────────┘  └──────────┘               │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Jeanne Ross MIT Operating Model Framework

Jeanne Ross (MIT Sloan CISR) defines four operating model archetypes based on two dimensions: **process standardization** (how standardized are processes across business units?) and **process integration** (how tightly do business units share data and processes?).

**The Four Archetypes:**

```
                        INTEGRATION
                   Low                High
                ┌────────────────┬─────────────────┐
           High │ REPLICATION    │  UNIFICATION     │
STANDARDIZATION │                │                  │
                │ Examples:      │ Examples:        │
                │ Retail chains  │ Airlines, banks  │
                │ Franchise ops  │ with one P&L     │
                ├────────────────┼─────────────────┤
            Low │ DIVERSIFICATION│  COORDINATION    │
                │                │                  │
                │ Examples:      │ Examples:        │
                │ Conglomerates  │ B2B companies    │
                │ Private equity │ with shared      │
                │ holding cos    │ customer data    │
                └────────────────┴─────────────────┘
```

**Implications for AI Strategy:**

| Operating Model | AI Challenge | AI Opportunity |
|-----------------|-------------|----------------|
| **Unification** | Single model must serve all BUs | Enterprise-wide AI reuse is highest |
| **Coordination** | Shared customer data enables personalization | Cross-BU AI insights are natural |
| **Replication** | Each BU wants its own AI | Template-based AI deployment scales well |
| **Diversification** | No shared foundation | AI is BU-by-BU; little enterprise leverage |

### 3.3 Digital Operating Model

**Definition:** A digital operating model is purpose-built for continuous delivery of digital products and services. It replaces project-based delivery with product-based delivery, and waterfall governance with agile governance.

**Key Design Principles:**

| Traditional | Digital |
|-------------|---------|
| Project teams (temporary) | Product teams (permanent) |
| Deliver and handoff | Build-operate-improve |
| Annual budgets | Rolling investment decisions |
| Stage-gate approvals | Continuous deployment |
| IT as service provider | Technology as core capability |
| Functional ownership | End-to-end ownership |

**Digital Operating Model Components:**

- **Product Teams:** Long-lived, cross-functional, end-to-end ownership
- **Platform Engineering:** Internal developer platform reduces friction for product teams
- **DevOps Culture:** Developers own deployment and operations ("you build it, you run it")
- **Customer Feedback Loops:** Continuous measurement of user behavior, not just delivery
- **OKR Governance:** Outcomes measured quarterly; investment adjusted to performance

### 3.4 AI Operating Model

**Definition:** An AI Operating Model defines how an organization develops, deploys, governs, and continuously improves AI capabilities at scale. It extends the digital operating model with AI-specific constructs.

**AI Operating Model Dimensions:**

| Dimension | Key Decisions |
|-----------|--------------|
| **AI Team Model** | Centralized COE vs. federated vs. embedded vs. hybrid |
| **AI Development Model** | Build vs. buy vs. partner; fine-tune vs. prompt vs. RAG |
| **AI Governance Model** | Who approves AI use cases, models, deployments? |
| **AI Data Model** | Who owns AI training data? What quality standards apply? |
| **AI Risk Model** | How is AI risk categorized and managed? |
| **AI Talent Model** | What AI roles does the enterprise need? How are they sourced? |
| **AI Platform Model** | What shared infrastructure enables AI delivery? |
| **AI Value Model** | How are AI investments measured and justified? |

**AI Operating Model Maturity Continuum:**

```
STAGE 1: Experimentation     STAGE 2: Pilot Scale     STAGE 3: Enterprise Scale
━━━━━━━━━━━━━━━━━━━━━━        ━━━━━━━━━━━━━━━━━━━━━    ━━━━━━━━━━━━━━━━━━━━━━━
Ad hoc projects              Structured pilots         Production AI systems
No governance                Light governance          Formal governance
No shared platform           Shared experimentation    Enterprise AI platform
Siloed talent                Small COE                 Distributed + COE
Project budgeting            Experiment funding        Product budgeting
```

### 3.5 Platform Operating Model

**Definition:** The organization operates as a platform business — providing internal (and sometimes external) customers with reusable capabilities, infrastructure, and services rather than delivering projects.

**Internal Platform Operating Model:**

The enterprise technology function transforms from project factory to platform business:

| Old Model | Platform Model |
|-----------|----------------|
| IT delivers projects to business | Platform teams deliver capabilities |
| Business units are "customers" | Business units are "consumers" |
| Success = project delivered on time | Success = platform adoption and value |
| Annual project funding | Product investment model |
| IT owns and operates | Product teams self-serve |

**Platform Types in Enterprise:**

| Platform | Primary Consumer | Core Capabilities |
|----------|-----------------|-------------------|
| **Developer Platform (IDP)** | Engineering teams | CI/CD, environments, templates |
| **Data Platform** | Analytics and AI teams | Data products, pipelines, governance |
| **AI Platform** | Product teams, data scientists | LLM access, fine-tuning, evaluation |
| **Security Platform** | All teams | IAM, secrets, vulnerability scanning |
| **Observability Platform** | Engineering teams | Metrics, logs, traces, alerts |

### 3.6 Cloud Operating Model

**Definition:** A cloud operating model governs how the enterprise uses public cloud services — covering procurement, consumption management, security, governance, and FinOps.

**Key Design Decisions:**

| Decision | Options |
|----------|---------|
| **Cloud Strategy** | Single cloud, multi-cloud, hybrid |
| **Cloud Governance** | Centralized landing zone vs. federated |
| **FinOps Model** | Central FinOps team vs. federated cost ownership |
| **Security Baseline** | Central security; distributed compliance |
| **Workload Placement** | Which workloads go to cloud vs. stay on-premises |

**Cloud Operating Model Maturity:**

```
Level 1: Lift & Shift      → Rehosting existing workloads; no governance
Level 2: Cloud Enabled     → Basic governance; landing zones; some refactoring
Level 3: Cloud Native      → Product teams use cloud-native services; FinOps active
Level 4: Cloud Optimized   → Continuous cost optimization; AI workloads; SaaS-first
Level 5: Cloud Intelligent → AI-driven resource management; autonomous optimization
```

### 3.7 Data Operating Model

**Definition:** A data operating model governs how enterprise data is owned, managed, shared, and consumed to create value. The dominant modern patterns are Data Mesh and Data Fabric.

**Data Mesh vs. Data Fabric:**

| Dimension | Data Mesh | Data Fabric |
|-----------|-----------|-------------|
| **Core Philosophy** | Data as a product; domain ownership | Connected metadata layer across all data |
| **Ownership** | Distributed (domain teams own data products) | Central data team or shared |
| **Architecture** | Decentralized storage, shared governance | Centralized access, distributed storage |
| **Governance** | Federated computational governance | Centralized metadata governance |
| **Best Fit** | Large organizations with multiple domains | Organizations wanting unified data view |
| **Adoption** | Zalando, Saxo Bank, Netflix | IBM, SAP, cloud-native enterprises |

**Data Operating Model Components:**
- **Data Domain Ownership:** Each domain team owns its data products end-to-end
- **Data Product Catalog:** Discoverable, versioned, SLA-governed data assets
- **Data Quality Standards:** Centrally defined quality dimensions enforced at source
- **Data Governance Council:** Cross-functional body for standards and policy
- **Data Platform (Self-Service):** Tooling that enables domain teams to produce and consume data

---

## Part 4 — Target Operating Model (TOM) Design

### 4.1 What Is a TOM?

A **Target Operating Model (TOM)** is a blueprint of how an organization needs to operate in the future to execute its strategy. It is the "operating model at the end of a transformation" — the north star for organizational change programs.

A TOM is not aspirational fluff. It is a specific, actionable design that answers:
- What capabilities are needed and at what level?
- How are those capabilities organized?
- What processes will run them?
- What technology will support them?
- What data will inform them?
- Who governs them?

### 4.2 TOM Design Methodology

**Phase 1: Understand the Strategy**
- Review corporate strategy, strategic themes, and priorities
- Identify strategic requirements that drive operating model change
- Understand transformation drivers (regulatory, competitive, technology)

**Phase 2: Assess the Current State**
- Current organization structure and spans/layers analysis
- Process maturity assessment (CMMI or equivalent)
- Technology landscape review (application inventory, technical debt)
- Data quality and governance maturity
- Culture and capability gap analysis

**Phase 3: Design the Future State**
- Define operating model principles (the guardrails for design)
- Design organizational structure options (typically 2–3 alternatives)
- Define process model: which processes stay, transform, or are eliminated
- Define technology blueprint: which systems enable the TOM
- Define governance model: decision rights, forums, reporting
- Define talent model: capabilities needed, sourcing strategy

**Phase 4: Gap Analysis**
- Map current → future state for each TOM dimension
- Identify gaps: organizational, process, technology, data, capability
- Quantify transformation effort and investment required

**Phase 5: Define the Transition**
- Sequence the change: what changes in Year 1, Year 2, Year 3?
- Define the organizational change management (OCM) plan
- Establish governance for the transformation program

### 4.3 TOM Artifacts

| Artifact | Purpose | Owner |
|----------|---------|-------|
| **Operating Model Canvas** | One-page summary of TOM across all dimensions | Programme Director |
| **Organisation Design Blueprint** | Org charts, spans and layers, role profiles | HR / OD Lead |
| **Process Architecture** | Level 0-2 process map, ownership, maturity targets | Process Architect |
| **Application Blueprint** | Systems landscape, integration patterns | Enterprise Architect |
| **Data Architecture Blueprint** | Data domains, ownership, governance | Data Architect |
| **Governance Model** | Decision rights, forums, escalation paths | Governance Lead |
| **RACI Matrix** | Responsibility assignment for all key processes | Programme Director |
| **Service Catalogue** | Catalogue of capabilities and services offered | COO / CTO |
| **Transition Roadmap** | Multi-year transition plan | Programme Director |
| **Transformation Business Case** | Investment justification with benefits realization | CFO / Sponsor |

### 4.4 Operating Model Canvas (Template)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                         OPERATING MODEL CANVAS                             │
├──────────────────────┬─────────────────────────┬──────────────────────────┤
│ STRATEGY             │ VALUE PROPOSITION        │ CUSTOMER SEGMENTS        │
│ What we exist to do  │ What value we deliver    │ Who we serve             │
│                      │                          │                          │
├──────────────────────┼─────────────────────────┼──────────────────────────┤
│ CAPABILITIES         │ PROCESSES                │ CHANNELS                 │
│ What we must be able │ How work flows           │ How we reach customers   │
│ to do                │                          │                          │
├──────────────────────┼─────────────────────────┼──────────────────────────┤
│ ORGANISATION         │ TECHNOLOGY               │ DATA                     │
│ Who does what        │ What systems enable it   │ What information powers  │
│ Structure, roles     │                          │ decisions                │
├──────────────────────┼─────────────────────────┼──────────────────────────┤
│ GOVERNANCE           │ PERFORMANCE              │ CULTURE                  │
│ Who decides what     │ How we measure success   │ How we behave            │
└──────────────────────┴─────────────────────────┴──────────────────────────┘
```

### 4.5 Common TOM Anti-Patterns

| Anti-Pattern | Description | Consequence |
|--------------|-------------|-------------|
| **TOM as Org Chart** | TOM reduced to a box-and-line org chart | Misses process, technology, governance dimensions |
| **Aspirational TOM** | TOM describes an ideal state with no feasible path | Credibility loss; transformation stalls |
| **Technology-First TOM** | Technology choices made before operating model designed | Systems don't support the model |
| **Consultant-Dependent TOM** | TOM designed entirely by external consultants with no internal ownership | Not adopted; sits on shelf |
| **Static TOM** | TOM designed once; never updated as strategy evolves | Increasingly irrelevant |
| **Big Bang TOM** | Entire TOM implemented simultaneously | Change overload; high failure risk |
| **Missing Transition** | TOM defines future state but not the journey | Organisation doesn't know how to get there |

---

## Part 5 — AI Center of Excellence Models

### 5.1 Why an AI COE?

An AI Center of Excellence (COE) is an organizational construct that centralizes AI expertise, standards, platforms, and governance while enabling distributed delivery across the enterprise. Without some form of COE:

- Every team reinvents the same AI infrastructure
- Model risk is ungoverned
- AI talent is scattered and hard to develop
- Standards for safety, privacy, and quality are inconsistent
- Investment is duplicated; results are fragmented

The COE solves the "how do we scale AI responsibly?" problem.

### 5.2 Centralized AI COE

**Model:** Single team with all AI expertise, responsible for building and deploying AI across the organization.

**Organizational Position:**
```
CTO / CDO
└── VP AI / Chief AI Officer
    ├── AI Strategy & Governance (3-5 people)
    ├── AI Platform Engineering (8-15 people)
    ├── Data Science & ML (10-20 people)
    ├── AI Safety & Risk (3-5 people)
    ├── AI Product Management (3-5 people)
    └── AI Enablement & Training (2-4 people)
```

**Governance Model:**
- AI Steering Committee (C-suite): quarterly strategy and investment review
- AI Governance Board (BU heads + CDO + CISO): monthly risk and standards review
- AI Review Panel (technical): weekly review of new use cases and models

**Pros:**
- Highest consistency of standards and practices
- Deep expertise concentration enables state-of-the-art work
- Clear accountability for enterprise AI outcomes
- Easiest to govern and audit

**Cons:**
- Becomes a bottleneck as demand grows
- Risk of ivory-tower disconnect from business needs
- Business units feel disempowered and may shadow-build
- Single point of failure for AI delivery

**Best For:** Enterprises early in AI journey; highly regulated industries (banking, healthcare); organizations with significant model risk exposure.

### 5.3 Federated AI COE (Hub-and-Spoke)

**Model:** A central hub defines standards, provides the platform, and leads governance. Spoke teams within each business unit execute AI delivery with local context.

**Structure:**
```
Central AI Hub (CDO / Chief AI Officer)
├── AI Platform & Infrastructure
├── AI Standards & Governance
├── AI Risk & Safety
└── AI Talent Development
          │
          ├──► BU AI Team 1 (Banking) — 3-5 data scientists + ML engineer
          ├──► BU AI Team 2 (Risk) — 3-5 data scientists + ML engineer
          ├──► BU AI Team 3 (Operations) — 3-5 data scientists + ML engineer
          └──► BU AI Team 4 (Customer) — 3-5 data scientists + ML engineer
```

**Governance Model:**
- Hub sets standards and governance; spokes comply
- Joint AI Review Board: hub + spoke representatives
- Spoke teams must use hub platform for production deployments
- Experimentation allowed locally; production requires hub approval

**Pros:**
- Scales delivery without bottleneck
- Maintains standards and governance
- Business units feel ownership while benefiting from central expertise
- Best of both worlds for most enterprises

**Cons:**
- Coordination overhead between hub and spokes
- Cultural alignment required (spokes must buy in to central standards)
- Hub quality must be high enough to be worth the coordination cost
- Risk of spoke teams drifting from standards over time

**Best For:** Large enterprises with multiple distinct business units; enterprises past initial AI pilots; organizations where speed is critical.

### 5.4 Embedded AI Teams

**Model:** Small AI squads embedded directly within product or business teams. No central COE; AI capability is fully distributed.

**Structure:**
```
Product Team: "Digital Payments"
├── Product Manager
├── 2× Software Engineers
├── 1× Data Scientist (embedded)
├── 1× ML Engineer (embedded)
└── 1× UX Designer

Product Team: "Risk Engine"
├── Product Manager
├── 3× Software Engineers
├── 2× Data Scientists (embedded)
└── 1× ML Engineer (embedded)
```

**Governance Model:**
- Community of Practice (AI Guild) for shared standards
- Architecture Review Board for production AI sign-off
- Decentralized decision-making; central review for high-risk use cases only

**Pros:**
- Maximum speed; AI closest to the business problem
- No bottleneck; each team is self-sufficient
- Deep domain expertise in AI teams
- High business alignment

**Cons:**
- Inconsistency in standards, tools, and practices
- Duplication of infrastructure build
- Hard to recruit and retain dispersed AI talent
- Governance gaps; model risk may be unmanaged

**Best For:** Technology-native companies (fintechs, digital-first companies); organizations with strong engineering culture; post-COE scaling when norms are established.

### 5.5 Virtual AI COE (Community of Practice)

**Model:** No formal COE structure. AI practitioners across the organization form a community of practice that creates shared standards, shares learning, and develops reusable assets.

**Governance:** Community-led working groups for standards, tools, and ethics. Outputs are advisory, not mandatory.

**Pros:** Low overhead; respects autonomy; works with existing structure.

**Cons:** Standards are advisory (often ignored); no budget authority; coordination is slow; difficult to enforce governance.

**Best For:** Mature organizations where AI is well-established and teams self-govern; small enterprises where a formal structure is not justified.

### 5.6 AI Factory (High-Volume Delivery Model)

**Definition (McKinsey, Accenture, IBM):** An AI Factory is an industrial-scale operating model for AI delivery, treating AI use case development as a repeatable manufacturing process rather than a series of one-off projects.

**McKinsey AI Factory Model:**
- **Factory Floor:** Standardized delivery process for AI use cases (discovery → build → deploy → operate)
- **Quality Control:** Automated evaluation, monitoring, and human review
- **Supply Chain:** Reusable components (data pipelines, features, models, prompts)
- **Management System:** Throughput metrics, cycle time tracking, quality KPIs

**Accenture AI Factory Components:**
1. AI Innovation Hub: Ideation and use case identification
2. AI Build Factory: Rapid development using standardized tooling
3. AI Deployment Pipeline: Automated deployment and compliance checking
4. AI Operations Centre: Production monitoring and continuous improvement

**Throughput Metrics (Example Targets for Mature AI Factory):**
| Metric | Target |
|--------|--------|
| Use case identification to POC | < 4 weeks |
| POC to production (standard use case) | < 12 weeks |
| Production AI use cases per quarter | 5-15 (depending on complexity) |
| Reuse rate of existing components | > 60% |
| Automated quality check pass rate | > 80% on first submission |

---

## Part 6 — Organizational AI Maturity Model

### 6.1 Five-Level Maturity Framework

This framework assesses organizational readiness for AI — not technical readiness, but the organizational, cultural, and governance dimensions of AI adoption.

```
Level 5: AI-NATIVE         ████████████████████  AI-first in all decisions
Level 4: AI-SCALING        ████████████████░░░░  Systematic AI deployment
Level 3: AI-BUILDING       ████████████░░░░░░░░  Repeatable AI capability
Level 2: AI-EXPERIMENTING  ████████░░░░░░░░░░░░  Structured pilots
Level 1: AI-UNAWARE        ████░░░░░░░░░░░░░░░░  Ad hoc or none
```

### 6.2 Level 1: AI-Unaware

**Characteristics:**
- No formal AI strategy
- Occasional ad hoc data science or analytics projects
- No dedicated AI talent
- No AI governance
- Leadership views AI as "IT's problem"

**Symptoms:**
- Business units buying point solutions independently (AI features in SaaS tools)
- No inventory of AI use cases or models in production
- Data quality is poor; no data governance
- AI risk is unmanaged

**Path Forward:** Identify executive sponsor; conduct AI opportunity assessment; establish a small central team or fractional CAIO.

### 6.3 Level 2: AI-Experimenting

**Characteristics:**
- Executive-sponsored AI pilot program
- Small central AI team (5–15 people)
- 3–10 active AI pilots across business units
- Basic governance: AI steering committee exists
- AI platform is ad hoc (individual tool licenses, no shared infrastructure)

**Typical Investments:** Machine learning use cases (demand forecasting, fraud detection, customer churn prediction), GenAI chatbot pilots, copilot for internal productivity.

**Failure Modes at This Level:**
- Pilot purgatory: experiments never reach production
- Governance paralysis: governance so heavy that nothing gets approved
- Data desert: pilots starved by poor data quality
- Talent drain: small AI team leaves due to organizational frustration

**Path Forward:** Pick 2-3 pilots for production; build shared AI platform; formalize AI COE.

### 6.4 Level 3: AI-Building

**Characteristics:**
- Formal AI COE in place
- 10–50 AI practitioners across the enterprise
- AI platform (shared infrastructure) operational
- 15–50 AI use cases in production
- AI governance operating: risk review, deployment approval, monitoring
- AI investment is a line item in the technology budget

**Capabilities:**
- Repeatable development process from idea to production
- Model monitoring and drift detection
- Basic responsible AI practices (bias testing, explainability)
- AI integration with enterprise systems (CRM, ERP, core banking)

**Organizational Indicators:**
- AI fluency in business leadership (they request AI, not just accept it)
- HR has AI-specific role profiles and career paths
- Legal and risk teams understand AI risk categories

### 6.5 Level 4: AI-Scaling

**Characteristics:**
- Federated AI model: COE + BU embedded teams
- 50–200+ AI practitioners enterprise-wide
- Enterprise AI platform with self-service capabilities
- 50–200 AI use cases in production
- AI governance is automated (compliance-as-code)
- AI creates measurable competitive advantage

**Capabilities:**
- LLM deployment at scale with enterprise guardrails
- Agentic AI systems in production (not just assistants)
- AI-to-AI integration between enterprise systems
- Full MLOps and LLMOps pipelines
- Autonomous AI monitoring with human-in-the-loop escalation

**Organizational Indicators:**
- AI product managers are a recognized specialty
- AI skills embedded in non-AI roles (prompt engineers, AI trainers in business units)
- Board-level AI risk oversight
- AI described in annual report as a strategic differentiator

### 6.6 Level 5: AI-Native

**Characteristics:**
- AI is default, not exceptional — every major process has AI embedded
- "AI-first" design principle applied to all new capabilities
- Organization is partially self-optimizing via AI (workforce planning, resource allocation)
- AI agents handle significant operational workload autonomously
- AI strategy and corporate strategy are indistinguishable

**Organizational Characteristics:**
- Fluid human-AI collaboration model: humans set direction, AI executes and monitors
- AI literacy is table stakes for all roles (not a specialist skill)
- AI ethics and responsibility embedded in culture, not just policy
- Continuous AI learning organization: models, processes, and skills update continuously

**Known Examples (Approximating Level 5):**
- Google DeepMind (research organization)
- Netflix (recommendation, content investment, operations)
- Palantir (AI-augmented operations management)
- Ant Group / Alipay (financial services at AI scale)

### 6.7 Assessment Dimensions

| Dimension | Level 1-2 | Level 3 | Level 4-5 |
|-----------|-----------|---------|-----------|
| **AI Strategy** | None or ad hoc | Defined, approved | Integrated with corporate strategy |
| **AI Talent** | 0-5 people | COE of 10-50 | 50-200+ distributed |
| **AI Platform** | None | Shared tooling | Enterprise self-service |
| **AI Governance** | None | Manual review | Automated compliance |
| **AI Use Cases** | 0-10 pilots | 10-50 in production | 50-200+ in production |
| **Data Quality** | Poor | Improving | Managed as product |
| **AI Culture** | Skeptical | Curious | AI-fluent |
| **AI Risk Mgmt** | None | Basic | Formal, board-level |

---

## Part 7 — Organization Design Deliverables

### 7.1 Standard Deliverables by Phase

| Phase | Deliverable | Format | Owner |
|-------|-------------|--------|-------|
| **Assessment** | Organization diagnostic report | Presentation | OD Lead |
| **Assessment** | Spans and layers analysis | Data analysis | OD Lead |
| **Assessment** | Culture survey findings | Report | HR |
| **Design** | Organization design options (2-3) | Presentation | OD Lead + CEO |
| **Design** | RACI matrix | Spreadsheet | Program Director |
| **Design** | Role profiles for new/changed roles | HR document | HR |
| **Design** | Governance model | Document | Governance Lead |
| **Transition** | Change impact assessment | Report | OCM Lead |
| **Transition** | Communication plan | Plan | Communications |
| **Transition** | Training and enablement plan | Plan | Learning & Dev |
| **Transition** | Transition roadmap | Gantt / roadmap | Program Director |

### 7.2 RACI Template for AI Operating Model

| Activity | AI COE | Business Unit | IT | Legal/Risk | Exec Sponsor |
|----------|--------|--------------|-----|------------|--------------|
| AI Strategy Development | C | C | C | C | A |
| AI Use Case Prioritization | C | R | C | C | A |
| AI Platform Selection | R | C | A | C | I |
| AI Model Development | R | C | I | C | I |
| AI Risk Assessment | A | C | C | R | I |
| AI Production Deployment | R | C | A | I | I |
| AI Model Monitoring | R | C | R | I | I |
| AI Governance & Policy | C | C | C | R | A |

*R=Responsible, A=Accountable, C=Consulted, I=Informed*

---

*Volume 6 of 10 — Enterprise Strategy & Business Architecture Handbook*
