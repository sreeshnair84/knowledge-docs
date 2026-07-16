---
title: "Vol 8 — Portfolio Management & Consulting Frameworks"
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["portfolio-management", "consulting-frameworks", "mckinsey", "bcg", "togaf", "okr", "wardley", "safe", "lean-portfolio"]
doc_type: handbook-volume
series_name: Enterprise Strategy & Business Architecture Handbook
series_part: 8
series_total: 10
---

# Vol 8 — Portfolio Management & Consulting Frameworks

> **Covers:** Complete portfolio management hierarchy, investment models, AI portfolio design, prioritization frameworks, PMO evolution, and an encyclopaedic review of 25+ consulting, architecture, delivery, innovation, and decision frameworks — with comparison tables, selection guides, and applicability criteria. Essential reference for portfolio managers, strategy consultants, enterprise architects, and transformation leaders.

---

## Part 1 — Portfolio Management

### 1.1 The Portfolio Hierarchy

Enterprise work exists in a hierarchy — from the most strategic to the most tactical. Understanding this hierarchy is essential for governance, investment decisions, and performance management.

```
STRATEGY LEVEL
└── Corporate Objective (3-5 years)
    └── Strategic Theme (annual)
        └── PORTFOLIO (Investment portfolio of Programs)
            └── PROGRAM (Group of related Projects / Products)
                └── PROJECT / PRODUCT (Deliver a specific outcome)
                    └── EPIC (Large body of work: 3-6 months)
                        └── FEATURE (User-visible capability: 1-4 weeks)
                            └── STORY (Development unit: 1-5 days)
                                └── TASK (Implementation activity: hours)
```

**Definitions at Each Level:**

| Level | Definition | Time Horizon | Owner |
|-------|-----------|--------------|-------|
| **Portfolio** | Collection of programs/projects aligned to a strategy theme | 1-5 years | CPO, CDO, or Portfolio Board |
| **Program** | Group of related projects managed in a coordinated way to obtain benefits not available from managing them individually | 1-3 years | Programme Director |
| **Project** | Temporary endeavour with a defined start, end, and deliverable | 3-18 months | Project Manager |
| **Epic** | Large body of user work representing a business outcome | 1-6 months | Product Owner |
| **Feature** | User-facing capability that delivers business value | 1-4 weeks | Product Owner |
| **Story** | Smallest unit of user value delivered in a sprint | 1-5 days | Delivery Team |
| **Task** | Implementation activity enabling a story | Hours | Developer |

### 1.2 Investment Portfolio Models

**Gartner Run / Grow / Transform (RGT)**

```
RUN (60-70% of budget):
   Keep the lights on; business operations; mandatory compliance
   Returns: Cost avoidance, risk reduction

GROW (20-30% of budget):
   Enhance existing capabilities; expand market share
   Returns: Revenue growth, efficiency improvement

TRANSFORM (10-15% of budget):
   Disruptive change; new business models; emerging technology
   Returns: Long-term competitive advantage (3-5 year horizon)
```

**Why RGT matters for AI investment:**
Most enterprises allocate AI budget under "Transform" — but the most impactful AI is often embedded in "Run" operations (fraud detection, document processing, predictive maintenance). The framework must evolve to allow AI investment across all three horizons.

---

**McKinsey Three Horizons**

| Horizon | Time Frame | Focus | Management Mode |
|---------|-----------|-------|----------------|
| **H1: Core** | 0-1 year | Protect and extend the core business | Performance management |
| **H2: Emerging** | 1-3 years | Build emerging businesses | Growth management |
| **H3: Options** | 3-7 years | Seed real options for the future | Exploration |

**AI Across Three Horizons:**

| Horizon | AI Investment Examples |
|---------|----------------------|
| **H1** | AI in core operations: fraud detection, claims processing, demand forecasting |
| **H2** | AI products: AI-powered customer service, copilots for employees, AI-native workflows |
| **H3** | AI business model transformation: AI agents replacing headcount, AI-driven pricing |

**Common Three Horizons Mistake:** H3 work (exploration) is often cut during cost pressure. But H3 investments take 3-7 years to mature. Organizations that consistently cut H3 starve their future.

---

### 1.3 AI Investment Portfolio Design

Structuring the AI investment portfolio requires a custom framework that addresses AI's unique characteristics: rapid capability evolution, high uncertainty, significant infrastructure investment, and asymmetric risk profiles.

**AI Investment Tiers:**

| Tier | Description | Investment Characteristics |
|------|-------------|---------------------------|
| **Foundation** | AI platform, data infrastructure, talent | High CapEx; long payback; enables all other tiers |
| **Differentiation** | AI capabilities that improve existing products | Moderate investment; 6-18 month payback |
| **Disruption** | AI-native business model innovations | High risk; long horizon; asymmetric upside |

**AI Portfolio Target Allocation (Mature Enterprise):**

```
Foundation (30-40%): AI platform, data governance, MLOps, talent development
Differentiation (45-55%): AI use cases in core business processes
Disruption (10-15%): AI-native business model experiments
```

**AI Portfolio Governance Principles:**
1. Separate AI foundation investment from use case investment (foundation is infrastructure, not projects)
2. Treat AI use cases as products with persistent funding, not projects with end dates
3. Maintain a dedicated "explore" budget that is protected from annual cuts
4. Measure foundation investments by capability enablement, not ROI
5. Require quantified benefits realization for differentiation-tier investments

---

### 1.4 Portfolio Prioritization Frameworks

**WSJF — Weighted Shortest Job First (SAFe)**

Used in SAFe Lean Portfolio Management to prioritize work. Calculates economic value by dividing business value by job duration.

```
WSJF = Cost of Delay / Job Duration

Cost of Delay = User-Business Value + Time Criticality + Risk Reduction/Opportunity Enablement
```

| Initiative | Business Value | Time Criticality | Risk/OE | Cost of Delay | Duration | WSJF |
|-----------|---------------|-----------------|---------|--------------|---------|------|
| AI fraud detection | 8 | 10 | 7 | 25 | 3 | 8.3 |
| Customer chatbot | 7 | 5 | 3 | 15 | 5 | 3.0 |
| Demand forecasting | 9 | 6 | 8 | 23 | 8 | 2.9 |

*Score 1-10; higher WSJF = higher priority*

---

**ICE Score**

Simple scoring model: Impact × Confidence × Ease

| Criterion | What It Measures | Scale |
|-----------|-----------------|-------|
| **Impact** | How much will this move the needle? | 1-10 |
| **Confidence** | How certain are we of the impact estimate? | 0-100% |
| **Ease** | How easy is it to implement? (inverse of effort) | 1-10 |

`ICE = Impact × Confidence × Ease`

---

**RICE Score (Intercom)**

| Criterion | Formula Variable | What It Measures |
|-----------|----------------|-----------------|
| **R**each | Number of users/customers affected per period | Breadth of impact |
| **I**mpact | How much it moves the target metric (0.25 to 3x) | Depth of impact |
| **C**onfidence | Estimate certainty (%) | Risk adjustment |
| **E**ffort | Person-months required | Investment required |

`RICE = (Reach × Impact × Confidence) / Effort`

---

**KANO Model**

Classifies features by their effect on customer satisfaction:

| Type | Description | Example |
|------|-------------|---------|
| **Must-Be (Basic)** | Expected; absence causes dissatisfaction; presence is neutral | Security, reliability |
| **Performance (One-Dimensional)** | More = better; linear satisfaction | Speed, accuracy |
| **Attractive (Delighter)** | Unexpected; presence creates delight; absence is fine | AI-generated summaries, proactive alerts |
| **Indifferent** | Neither satisfies nor dissatisfies | Internal admin features |
| **Reverse** | Some customers dislike; others appreciate | Complexity of advanced features |

---

### 1.5 Benefits Realization Management

**The Output-Outcome-Impact Hierarchy:**

```
OUTPUT → "We deployed an AI chatbot"
OUTCOME → "Customer service handle time reduced 35%"
IMPACT → "Customer satisfaction score +8 points; $12M annual cost saving"
```

Most AI programs track outputs. Mature programs track outcomes and impact.

**Benefits Realization Framework:**

| Stage | Activity | Timing |
|-------|----------|--------|
| **Identification** | Define expected benefits; quantify where possible | Before investment approval |
| **Planning** | Benefits realization plan with milestones | During project initiation |
| **Tracking** | Regular measurement against baseline | Monthly during delivery |
| **Review** | Benefits achieved vs. projected | 3, 6, 12 months post-deployment |
| **Learning** | What would we do differently? | 12 months post-deployment |

**Common Benefits Categories for AI Programs:**

| Category | Example Metric | Measurement Approach |
|----------|---------------|---------------------|
| **Cost reduction** | FTE hours saved, headcount avoided | Time-and-motion study; headcount plan |
| **Revenue growth** | Conversion rate uplift, new products | A/B test; revenue attribution |
| **Risk reduction** | Fraud loss reduced, error rate reduced | Incident data comparison |
| **Speed** | Process cycle time reduction | Process timing measurement |
| **Quality** | Error rate, rework rate, NPS | Quality measurement systems |
| **Employee experience** | eNPS, productivity survey | Survey; productivity metrics |

### 1.6 Capital Planning for AI

**OpEx vs. CapEx for AI:**

| Cost Type | OpEx | CapEx |
|-----------|------|-------|
| **Cloud AI API calls** | Yes | No |
| **SaaS AI platform subscriptions** | Yes | No |
| **Cloud infrastructure for AI** | Yes | Potentially (reserved) |
| **Custom AI model development** | Depends | May qualify (if substantial new capability) |
| **AI platform build (internal)** | No | Yes (internally developed intangible) |
| **AI data acquisition** | Depends | May qualify if capitalized |

**Cloud Consumption Models for AI:**

| Model | How It Works | Best For |
|-------|-------------|---------|
| **On-Demand** | Pay per API call; no commitment | Unpredictable workloads; experimentation |
| **Provisioned Throughput** | Reserve capacity; consistent cost | High-volume, predictable production |
| **Reserved Instances** | Commit to 1-3 years; significant discount | Stable infrastructure workloads |
| **Savings Plans** | Flexible commitment; moderate discount | Mixed workload portfolios |

---

## Part 2 — PMO Evolution

### 2.1 Traditional PMO → Agile PMO → AI-Augmented PMO

**Traditional PMO:**
- Focus: Governance, process compliance, reporting
- Tools: MS Project, spreadsheets, stage gates
- Cadence: Annual planning, quarterly reviews
- Success metric: On-time, on-budget, on-scope delivery

**Agile PMO:**
- Focus: Value delivery, team enablement, impediment removal
- Tools: Jira, Rally, Azure DevOps
- Cadence: PI planning (quarterly), sprint reviews (bi-weekly)
- Success metric: Business outcomes, velocity, team health

**AI-Augmented PMO:**
- Focus: Predictive risk management, automated reporting, portfolio intelligence
- Tools: AI-powered portfolio management (Planview + AI, Workfront + AI)
- Cadence: Continuous; AI surfaces risks in real time
- Success metric: Portfolio ROI, AI benefits realization, speed to value

### 2.2 Transformation Office Design

Large-scale transformation programs require a dedicated Transformation Office (TO) that is distinct from the traditional PMO:

| Dimension | PMO | Transformation Office |
|-----------|-----|-----------------------|
| **Scope** | Active projects and programs | The full transformation agenda |
| **Time horizon** | Project delivery | 3-5 year transformation |
| **Authority** | Coordination and reporting | May have investment authority |
| **Skills** | Project managers | Business architects, change leaders, data analysts |
| **Engagement** | Project teams | C-suite + Board |

### 2.3 OKR Integration with Portfolio

OKRs translate strategy into measurable commitments for teams. When integrated with portfolio management, they close the strategy-execution gap:

```
CORPORATE OKR
  Objective: "Become the AI-leader in commercial banking"
  KR1: 15 AI use cases in production by Q4
  KR2: AI features rated 4.2+/5 by business users
  KR3: AI investments deliver $50M NPV by EOY
         ↓ (aligns to)
PORTFOLIO OKR
  Objective: "Build AI infrastructure enabling 15 use cases"
  KR1: AI platform serving 5 production models by Q2
  KR2: Feature store with 200+ features available
  KR3: Evaluation pipeline passing 80%+ of cases automatically
         ↓ (aligns to)
PRODUCT TEAM OKR
  Objective: "AI-powered credit decisioning live in Q3"
  KR1: Model accuracy >94% on holdout test set
  KR2: Decision latency <200ms at P99
  KR3: 0 regulatory findings in model validation review
```

---

## Part 3 — Strategy Frameworks Deep Dive

### 3.1 McKinsey 7S Framework

**Origin:** Tom Peters and Robert Waterman at McKinsey, 1980. Published in "In Search of Excellence" (1982).

**Core Concept:** Seven interdependent elements that must be aligned for an organization to perform. Divided into "hard" (easier to define and manage) and "soft" (cultural, harder to change) elements.

```
                    Strategy
                      │
         ┌────────────┼────────────┐
         │            │            │
      Structure    Systems      Staff
         │            │            │
         └────────────┼────────────┘
                   Shared Values
                   (Core of model)
                      │
         ┌────────────┼────────────┐
         │            │            │
       Style        Skills    (back to Staff)
```

**The Seven Elements:**

| Element | Hard/Soft | Definition |
|---------|-----------|-----------|
| **Strategy** | Hard | Plan for achieving competitive advantage |
| **Structure** | Hard | How the organization is divided and coordinated |
| **Systems** | Hard | Processes and procedures employees use |
| **Staff** | Soft | Types of employees and their development |
| **Skills** | Soft | Core competencies of the organization |
| **Style** | Soft | Leadership style and organizational culture |
| **Shared Values** | Soft | Core beliefs and attitude the organization holds |

**When to Use:**
- Organizational change planning: all 7S elements must be realigned
- Post-merger integration: identify misalignment between organizations
- Strategy execution diagnosis: why is the strategy not being executed?
- AI transformation: which of the 7S elements is the blocking constraint?

**AI Transformation 7S Alignment:**

| Element | AI Transformation Implication |
|---------|------------------------------|
| Strategy | Is AI embedded in corporate strategy, or is it IT's project? |
| Structure | Does the org structure enable cross-functional AI delivery? |
| Systems | Do existing systems expose APIs that AI can use? |
| Staff | Do staff have AI literacy? Fear AI as a job threat? |
| Skills | Does the organization have data science, ML engineering, product for AI? |
| Style | Does leadership model AI use? Or is it "for employees only"? |
| Shared Values | Is experimentation valued? Is failure safe? |

**Strengths:** Holistic; helps see systemic issues rather than symptoms; applies to any organizational change.

**Limitations:** Descriptive rather than prescriptive; doesn't tell you what to do, only what to look at; soft elements are hard to measure.

---

### 3.2 BCG Growth-Share Matrix (Updated for Digital Era)

**Origin:** Bruce Henderson at BCG, 1970. Published as "The Product Portfolio."

**Classic Matrix:**

```
              HIGH MARKET SHARE    LOW MARKET SHARE
HIGH MARKET  ┌────────────────┬───────────────────┐
GROWTH       │   STARS        │  QUESTION MARKS   │
             │ (invest/grow)  │  (evaluate/bet)   │
             ├────────────────┼───────────────────┤
LOW MARKET   │   CASH COWS    │  DOGS             │
GROWTH       │ (harvest)      │  (divest/fix)     │
             └────────────────┴───────────────────┘
```

**Digital Era Adaptation:**

| Traditional Category | Digital Era Nuance |
|---------------------|-------------------|
| **Stars** | Platform businesses with network effects; AI-native products | Invest aggressively; network effects compound |
| **Cash Cows** | Core SaaS with high retention; digital operations | Use AI to extend longevity; automate to protect margin |
| **Question Marks** | New AI products; experimental features | Time-boxed experiments; kill fast if no traction |
| **Dogs** | Legacy on-premise; technical debt | Migrate or retire; don't invest |

**When to Use:** Portfolio rationalization; investment allocation; M&A target evaluation.

**Limitations:** Market share is not the only determinant of profitability (especially in platform businesses); ignores competitive dynamics; can encourage milking of cash cows into obsolescence.

---

### 3.3 Porter's Five Forces

**Origin:** Michael Porter, Harvard Business School, 1979. Published in Harvard Business Review.

**The Five Forces:**

```
                    Threat of New Entrants
                            ↓
Supplier Power  →   COMPETITIVE RIVALRY  ← Buyer Power
                            ↑
                    Threat of Substitutes
```

**AI Disruption of Competitive Forces:**

| Force | Traditional Dynamic | AI Disruption |
|-------|-------------------|---------------|
| **Competitive Rivalry** | Brand, cost, features | AI can rapidly replicate features; speed of innovation increases |
| **Threat of New Entrants** | Capital, regulations, distribution | AI lowers barrier to entry dramatically in knowledge work |
| **Threat of Substitutes** | Alternative products | AI creates entirely new substitutes (LLM replaces research analysts) |
| **Supplier Power** | Few suppliers = high power | Foundation model providers have significant power; open source constrains it |
| **Buyer Power** | Many buyers = low power | AI-enabled price comparison, switching reduce switching costs |

**When to Use:** Industry analysis; competitive strategy development; identifying strategic threats.

---

### 3.4 McKinsey Three Horizons (Full Treatment)

Covered in Part 1 investment section. Additional strategic application:

**Portfolio Allocation Principles:**

| Horizon | Investment Principle | Management Discipline |
|---------|--------------------|-----------------------|
| **H1** | Allocate to defend; minimize waste | Performance excellence; lean |
| **H2** | Invest in building adjacencies | Growth management; scaling |
| **H3** | Maintain optionality; small bets | Exploration; option value |

**Common Failure:** Applying H1 management (ROI-driven, cost-control) to H3 projects (exploration). H3 requires portfolio thinking and option value metrics.

---

### 3.5 Ansoff Matrix

**Origin:** Igor Ansoff, 1957. Published in Harvard Business Review as "Strategies for Diversification."

```
                 EXISTING PRODUCTS    NEW PRODUCTS
EXISTING MARKETS│ MARKET PENETRATION │ PRODUCT DEVELOPMENT │
                │ (lowest risk)      │ (medium risk)        │
NEW MARKETS     │ MARKET DEVELOPMENT │ DIVERSIFICATION      │
                │ (medium risk)      │ (highest risk)        │
```

**AI Transformation Implications:**

| Ansoff Cell | AI Application |
|-------------|---------------|
| **Market Penetration** | Use AI to sell more of existing products to existing customers (personalization, pricing) |
| **Product Development** | AI-enhance existing products for existing customers (copilots, smart features) |
| **Market Development** | Use AI to enter new segments cost-effectively (AI-enabled SMB products from enterprise offerings) |
| **Diversification** | AI-native new businesses serving new markets (entirely new business lines) |

---

### 3.6 Blue Ocean Strategy

**Origin:** W. Chan Kim and Renée Mauborgne, 2004. Published in Harvard Business Review.

**Core Concept:** Rather than competing in existing ("red ocean") markets, create uncontested market space ("blue ocean") by making the competition irrelevant.

**ERRC Framework (Eliminate-Reduce-Raise-Create):**

| Action | What to Do |
|--------|-----------|
| **Eliminate** | Which factors taken for granted should be eliminated? |
| **Reduce** | Which factors should be reduced well below industry standards? |
| **Raise** | Which factors should be raised well above industry standards? |
| **Create** | Which factors should be created that the industry has never offered? |

**AI Blue Ocean Example (HR SaaS):**

| Action | Factor |
|--------|--------|
| Eliminate | Manual timesheet entry; complex reporting configuration |
| Reduce | Implementation timeline; training required |
| Raise | Prediction accuracy for attrition; personalization of learning |
| Create | AI coach for managers; skills genome mapping |

---

### 3.7 Jobs-to-be-Done (Clayton Christensen)

**Core Concept:** Customers don't buy products — they hire products to do a "job" in their lives. Understanding the job reveals unmet needs that competitors miss.

**Jobs-to-be-Done Types:**

| Job Type | Definition | Example |
|----------|-----------|---------|
| **Functional** | Practical task to be accomplished | "Help me process 500 invoices faster" |
| **Social** | How others perceive the person | "Help me look competent to my CFO" |
| **Emotional** | How the person wants to feel | "Give me confidence my books are correct" |

**Application to AI Product Strategy:**
Most AI products target functional jobs. The differentiated opportunity is addressing social and emotional jobs:
- Emotional job: "I want to feel in control, not replaced by AI"
- Social job: "I want to be seen as an AI-savvy leader by my peers"

---

## Part 4 — Architecture Frameworks

### 4.1 TOGAF 10 Deep Dive

**Origin:** The Open Group Architecture Framework. Current version: TOGAF 10 (2022).

**Architecture Development Method (ADM) — Complete Phases:**

| Phase | Name | Key Activities | Key Outputs |
|-------|------|---------------|-------------|
| **Preliminary** | Framework & Principles | Establish EA capability; define architecture principles | Architecture principles; governance model |
| **A** | Architecture Vision | Scope, stakeholders, high-level solution concept | Architecture Vision; Statement of Architecture Work |
| **B** | Business Architecture | Business strategy, capabilities, processes | Business Architecture baseline and target |
| **C** | Information Systems Architecture | Application and data architectures | Application & Data Architecture |
| **D** | Technology Architecture | Technology platforms and infrastructure | Technology Architecture |
| **E** | Opportunities & Solutions | Implementation options; roadmap; SBB selection | Implementation roadmap; Architecture Roadmap |
| **F** | Migration Planning | Detailed transition roadmap; business value | Transition Architecture; Migration Plan |
| **G** | Implementation Governance | Oversee implementation against architecture | Architecture Contracts; compliance assessment |
| **H** | Architecture Change Management | Manage changes to architecture | Updated baseline architecture |
| **Requirements Management** | Central (ongoing) | Identify, store, feed requirements to all phases | Requirements repository |

**Four Architecture Domains:**

| Domain | What It Covers |
|--------|---------------|
| **Business Architecture** | Strategy, governance, organization, capabilities, processes, value streams |
| **Data Architecture** | Data assets, data management, data flows |
| **Application Architecture** | Application systems and their interactions |
| **Technology Architecture** | Infrastructure, platforms, middleware, networks |

**TOGAF Content Framework:**

Key deliverable types:
- **Architecture Building Blocks (ABBs):** Capability definitions
- **Solution Building Blocks (SBBs):** Specific implementations
- **Architecture Contracts:** Agreements between development and sponsor
- **Compliance Assessments:** How well implementation meets architecture

---

### 4.2 Zachman Framework

**Origin:** John Zachman, 1987. Published in IBM Systems Journal.

**Core Concept:** A classification schema (not a methodology) for organizing architectural artifacts. Rows represent stakeholder perspectives; columns represent interrogatives (the six questions).

```
         WHAT       HOW       WHERE     WHO       WHEN      WHY
         (Data)   (Function) (Network) (People)  (Time)   (Motivation)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PLANNER  List of   List of   List of   List of   List of  List of
(Scope)  things    processes locations people    events   goals

OWNER    Semantic   Business  Business  Org       Master   Business
(Concept)model      process   logistics chart     schedule plan

DESIGNER Logical    System    Distributed Class    Processing Architectur
(System) data model design    architecture diagram schedule   e rules

BUILDER  Physical  Tech      Technology Security  Control   Rule
(Tech)   data model design   architecture design   structure design

SUB-     Data      Program   Network   Role      Timing    Rule
CONTRACTOR definition       spec    def.  def.   definition specification
(Detail)

USER     Data      Function  Network   Organi-   Schedule  Goal/
(Functional) in use in use   in use   zation    events    strategy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**When to Use:**
- Enterprise architecture artifact organization
- Ensuring completeness of architecture across all perspectives
- Communication with different stakeholders (each row = a different audience)

**Limitations:** Not a methodology; doesn't tell you how to create the artifacts; very academic; rarely used in full in practice.

---

### 4.3 BIZBoK (Business Architecture Guild)

**Origin:** Business Architecture Guild. Current version: BIZBoK 8.0 (2024).

**Core Domains:**

| Domain | What It Contains |
|--------|----------------|
| **Business Capability Map** | What the organization must be able to do; hierarchical |
| **Value Streams** | End-to-end sequences of activities delivering value to stakeholders |
| **Organization Map** | How business units and roles are organized |
| **Business Information Map** | Key information concepts used by the business |
| **Initiative Map** | How strategies and initiatives align to capabilities |
| **Strategy Map** | Strategic goals and their relationships |

**Capability Mapping in BIZBoK:**

Capabilities are organized in a 3-level hierarchy:

```
Level 1: Customer Management
└── Level 2: Customer Acquisition
    └── Level 3: Lead Generation
    └── Level 3: Lead Qualification
    └── Level 3: Opportunity Management
└── Level 2: Customer Retention
    └── Level 3: Loyalty Program Management
    └── Level 3: Churn Prediction and Prevention
```

**Value Stream Mapping:**

A value stream in BIZBoK is not a process — it is an end-to-end sequence of stages that together deliver value to a stakeholder:

- **Value Stream:** "Customer Onboarding"
- **Stages:** Application Receipt → Eligibility Verification → Risk Assessment → Decision → Offer → Acceptance → Account Setup → Welcome
- **Each Stage:** Has inputs, outputs, participating capabilities, and value metrics

**When to Use BIZBoK:**
- Enterprise business capability mapping
- Strategy-to-execution alignment analysis
- Business transformation planning
- AI capability gap analysis (which capabilities need AI enhancement?)

---

### 4.4 SABSA (Sherwood Applied Business Security Architecture)

**Origin:** John Sherwood, Andrew Clark, David Lynas. Published as business security architecture framework.

**Approach:** Security architecture derived from business requirements (not IT requirements). Uses a Zachman-like matrix of business views × interrogatives.

**Key Concept:** Every security control should be traceable to a business attribute (risk appetite, regulatory requirement, business objective).

**SABSA Business Attribute Profile:**
For each security domain, define:
- Business attribute (what business requirement does security serve?)
- Service level objective (measurable security outcome)
- Security policy (control requiring the attribute)
- Security standard (specific implementation requirement)

---

## Part 5 — Operating & Delivery Frameworks

### 5.1 SAFe 6.0 (Complete Treatment)

**Four Core Values:** Alignment, Built-in Quality, Transparency, Program Execution

**Essential SAFe (Most Common Entry Point):**

```
PORTFOLIO: Strategic themes → Portfolio Epics → WSJF prioritization
    ↓
PROGRAM (ART): PI Planning → Iteration → System Demo → Inspect & Adapt
    ↓
TEAM: Sprint planning → Daily standup → Sprint review → Retrospective
```

**Program Increment (PI) Planning:**
- 2-day event every 10-12 weeks (5 sprints)
- All ART members attend
- Business owners present objectives and priorities
- Teams create team PI objectives and identify dependencies
- Output: Program Board (features + dependencies + milestones)

**Lean Portfolio Management (LPM):**
Three key activities:
1. **Strategy and Investment Funding:** Connect portfolio to enterprise strategy; fund value streams (not projects)
2. **Agile Portfolio Operations:** Coordinate value stream execution; support operational excellence
3. **Lean Governance:** Forecast, budget dynamically; measure portfolio performance

**SAFe for AI Programs:**
- AI use cases become Epics at portfolio level
- AI platform delivery is a dedicated Value Stream
- Model governance checkpoints embedded in Definition of Done
- AI ethics review as part of PI System Demo

---

### 5.2 OKR Framework

**Origin:** Andy Grove at Intel (1970s); popularized by John Doerr at Google (1999). Described in John Doerr's "Measure What Matters" (2018).

**OKR Structure:**

```
OBJECTIVE: Qualitative, inspirational, direction-setting
  KEY RESULT 1: Quantitative, measurable, time-bound
  KEY RESULT 2: Quantitative, measurable, time-bound
  KEY RESULT 3: Quantitative, measurable, time-bound
```

**OKR Hierarchy:**

| Level | Purpose | Cadence |
|-------|---------|---------|
| **Company OKRs** | Strategic priorities for the year | Annual, with quarterly check |
| **Department OKRs** | How the department contributes | Quarterly |
| **Team OKRs** | Specific team commitments | Quarterly |
| **Individual OKRs** (optional) | Personal contribution | Quarterly |

**Google OKR Scoring:**
- 0.0-0.4: Failed to make progress
- 0.5-0.6: Partial progress
- 0.7-0.9: Good progress ("sweet spot" — ambition without overstretch)
- 1.0: Fully achieved (may indicate insufficient ambition)

**OKR Anti-Patterns:**

| Anti-Pattern | Problem | Fix |
|--------------|---------|-----|
| **Activity OKRs** | "Launch the AI platform" is a task, not an outcome | Write: "AI platform adopted by 80% of product teams" |
| **Too many OKRs** | 10+ objectives = no focus | 3-5 objectives; 2-4 KRs each |
| **Sandbagging** | Teams write OKRs they know they'll achieve | Calibrate for 70% achievement as success |
| **No cascading** | Team OKRs disconnected from company OKRs | Explicit alignment mapping |
| **Annual-only** | OKRs set in January; forgotten by March | Quarterly OKRs with weekly check-ins |

---

### 5.3 Balanced Scorecard

**Origin:** Robert Kaplan and David Norton, Harvard Business School, 1992. Published in Harvard Business Review.

**Four Perspectives:**

| Perspective | Question | Example KPIs |
|-------------|----------|-------------|
| **Financial** | How do we look to shareholders? | Revenue growth, EBITDA, ROI, NPV |
| **Customer** | How do customers see us? | NPS, CSAT, churn rate, market share |
| **Internal Process** | What must we excel at? | Cycle time, defect rate, on-time delivery |
| **Learning & Growth** | How can we continue to improve? | Employee skills, system capabilities, culture |

**Strategy Map:**
A cause-and-effect diagram linking objectives across the four perspectives:

```
FINANCIAL: Revenue growth ← Customer profitability ← Wallet share
                                    ↑
CUSTOMER: Customer satisfaction ← Product quality + Service + Price
                                    ↑
INTERNAL: Process excellence ← Innovation rate + Quality
                                    ↑
LEARNING: Skills ← Training + Technology + Culture
```

**AI Integration with Balanced Scorecard:**
- Financial: Add "AI investment ROI" and "AI cost per outcome"
- Customer: Add "AI-enabled service rating" and "AI personalization score"
- Internal Process: Add "AI model accuracy" and "AI automation rate"
- Learning & Growth: Add "AI literacy index" and "AI capability maturity score"

---

### 5.4 Hoshin Kanri (Policy Deployment)

**Origin:** Toyota, 1960s. Japanese strategic planning methodology.

**Core Concept:** Align the entire organization to 3-5 strategic priorities through a top-down/bottom-up "catchball" process.

**X-Matrix Structure:**
```
┌─────────────────────────────────────────────────────┐
│                    X-MATRIX                          │
│  ┌──────────────┬──────────────┬──────────────┐     │
│  │ 3-5 Year     │ Annual       │ Improvement  │     │
│  │ Breakthrough │ Objectives   │ Priorities   │     │
│  │ Objectives   │              │              │     │
│  ├──────────────┼──────────────┼──────────────┤     │
│  │ Correlations │ Correlations │ Metrics &    │     │
│  │ (strong/med) │              │ Targets      │     │
│  ├──────────────┴──────────────┴──────────────┤     │
│  │          Resources / Owners                │     │
│  └────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

**Catchball Process:**
Leadership proposes strategic priorities → cascades down → teams propose how they will contribute → proposals go back up for negotiation → final commitments agreed

This is superior to top-down OKR mandate because teams feel ownership over their commitments.

---

## Part 6 — Innovation Frameworks

### 6.1 Wardley Mapping

**Origin:** Simon Wardley. Developed at Fotango (2005); open-sourced and published extensively.

**Core Concept:** Map the value chain of a business onto two axes — user need visibility (y-axis) and evolutionary stage (x-axis). Reveals where to invest, what to commoditize, and where disruption is coming.

**Evolution Axis:**

```
GENESIS → CUSTOM-BUILT → PRODUCT → COMMODITY/UTILITY
(Novel,    (Rare,         (Increasingly (Ubiquitous,
uncertain) competitive)  standardised) utility-like)
```

**Example Wardley Map (Banking AI):**

```
Visible to user
        │
Customer Trust ──────────────────────────────── (Genesis)
        │
AI Insights ──────────────────── (Custom-built)
        │
Risk Models ──────────────── (Product)
        │
Cloud Infrastructure ─────── (Commodity)
Data Storage ────────────────────────────────── (Utility)
        │
Invisible to user
        ←────────────────────────────────────────→
     Genesis                              Commodity
```

**Strategic Gameplay (Wardley):**

| Play | When to Use |
|------|------------|
| **Exploit evolution** | Buy commodity; don't build what's commoditizing |
| **Accelerate** | Push competitors' differentiators to commodity |
| **Tower and moat** | Build proprietary capability above commoditized layer |
| **Sensing engines** | Invest in sensing emerging capabilities before they become products |

**AI Application of Wardley:**
Foundation models are moving from Product toward Commodity rapidly. The enterprise play is to build proprietary capabilities (data, processes, workflows) *above* the commoditizing LLM layer.

---

### 6.2 Design Thinking

**Origin:** IDEO; Stanford d.school. Popularized in business by Roger Martin's "The Design of Business" (2009).

**Five Stages:**

```
EMPATHIZE → DEFINE → IDEATE → PROTOTYPE → TEST
```

| Stage | Purpose | Key Activities |
|-------|---------|----------------|
| **Empathize** | Understand users deeply | Interviews, observation, journey mapping |
| **Define** | Frame the right problem | Problem statement, "How Might We" questions |
| **Ideate** | Generate many solutions | Brainstorming, SCAMPER, worst possible idea |
| **Prototype** | Make ideas tangible | Paper prototypes, wireframes, role-play |
| **Test** | Learn from real users | User testing, A/B experiments |

**Design Thinking for AI Products:**
- Empathize: Understand what task users are trying to accomplish; what are they afraid AI will do wrong?
- Define: Define the job to be done; define what "good" looks like to the user
- Ideate: How might AI augment (vs. replace) the user?
- Prototype: Build prompt+UI prototype; test concept before building
- Test: Measure accuracy, trust, adoption

---

### 6.3 Business Model Canvas

**Origin:** Alexander Osterwalder and Yves Pigneur. Published in "Business Model Generation" (2010).

**Nine Building Blocks:**

| Block | Question |
|-------|---------|
| **Customer Segments** | Who are we creating value for? |
| **Value Propositions** | What value do we deliver to the customer? |
| **Channels** | How do we reach customers? |
| **Customer Relationships** | What type of relationship does each segment expect? |
| **Revenue Streams** | What are customers willing to pay for? |
| **Key Resources** | What resources do we need? |
| **Key Activities** | What do we need to do? |
| **Key Partners** | Who are our key partners and suppliers? |
| **Cost Structure** | What are the most important costs? |

**AI Business Model Canvas Variant:**

| Block | AI-Specific Consideration |
|-------|--------------------------|
| **Value Propositions** | AI-derived insights, predictions, automation |
| **Key Resources** | Training data, compute, model IP, AI talent |
| **Key Activities** | Model training, data collection, evaluation, safety |
| **Revenue Streams** | Per-query, per-seat, outcome-based, data monetization |
| **Cost Structure** | Token/compute costs, data acquisition, human review |

---

### 6.4 Value Proposition Canvas

**Origin:** Alexander Osterwalder. Extension of Business Model Canvas.

**Two Sides:**

```
CUSTOMER PROFILE:          VALUE MAP:
┌──────────────────┐       ┌──────────────────┐
│  Customer Jobs   │       │ Products &       │
│  (What they're   │  FIT  │ Services         │
│  trying to do)   │ ←───► │                  │
│                  │       │ Pain Relievers   │
│  Pains           │       │ (address pains)  │
│  (What frustrates│       │                  │
│  them)           │       │ Gain Creators    │
│                  │       │ (create gains)   │
│  Gains           │       │                  │
│  (What they want)│       │                  │
└──────────────────┘       └──────────────────┘
```

**"Fit"** exists when the value map addresses the most important jobs, pains, and gains of the customer profile.

---

## Part 7 — Decision Frameworks

### 7.1 RACI Matrix

**The Four Roles:**

| Role | Definition |
|------|-----------|
| **Responsible** | Does the work; multiple people can share responsibility |
| **Accountable** | Owns the outcome; only one person per task |
| **Consulted** | Input required before decision; two-way communication |
| **Informed** | Notified of outcome; one-way communication |

**RACI Rules:**
- Every task must have exactly one Accountable
- Accountable can also be Responsible (doing + owning)
- Too many Consulted roles slows decisions — be selective
- Informed roles receive notification but don't block the decision

### 7.2 RASCI (Adding "Supportive")

| Role | Definition |
|------|-----------|
| **Responsible** | Executes the work |
| **Accountable** | Owns the outcome |
| **Supportive** | Provides resources, support; helps Responsible complete |
| **Consulted** | Input before decision |
| **Informed** | Notified after |

Supportive is useful for distinguishing between full ownership (Responsible) and assistance (Supportive) — common in matrix organizations.

### 7.3 DACI (Driver, Approver, Contributors, Informed)

**Origin:** Intuit; popularized by product management teams.

| Role | Definition |
|------|-----------|
| **Driver** | Drives the process; owns the schedule; ensures the decision happens |
| **Approver** | Single person who approves the final decision |
| **Contributors** | Provide input and expertise; do not have veto |
| **Informed** | Notified of the decision |

DACI is often preferred over RACI for product decisions because it clarifies that "Approver" is one person (not a committee).

### 7.4 Decision Rights Matrix for AI Governance

| AI Decision | Who Decides | Who Approves | Who Is Consulted |
|-------------|------------|--------------|-----------------|
| New AI use case approval | Business Unit | AI Governance Board | Legal, Risk, IT |
| AI model selection | AI COE | CAIO | Business Unit |
| AI production deployment | AI Platform Team | CISO + Risk | Business Unit |
| AI incident response | AI Operations | CISO | CAIO |
| AI policy creation | Legal + Risk | Board (for high-risk) | All stakeholders |
| AI budget allocation | Portfolio Board | CFO | AI COE, BU Heads |
| AI vendor selection | AI COE | CTO | CISO, Procurement |

---

## Part 8 — Framework Selection Guide

### 8.1 Which Framework When?

**Strategy Questions → Use:**

| Question | Framework |
|----------|-----------|
| "What should our strategy be?" | Porter's Five Forces (industry), Ansoff (growth), Blue Ocean |
| "Is our organization aligned to execute?" | McKinsey 7S |
| "How should we allocate investment?" | Three Horizons, BCG Matrix |
| "How do we translate strategy to execution?" | OKR, Balanced Scorecard, Hoshin Kanri |
| "Where is disruption coming from?" | Wardley Mapping |

**Architecture Questions → Use:**

| Question | Framework |
|----------|-----------|
| "How do we structure our architecture program?" | TOGAF ADM |
| "How do we map all architecture artifacts?" | Zachman Framework |
| "How do we map business capabilities?" | BIZBoK |
| "How do we ensure security architecture is business-driven?" | SABSA |

**Delivery Questions → Use:**

| Question | Framework |
|----------|-----------|
| "How do we scale agile across the enterprise?" | SAFe 6.0 |
| "How do we set team goals and measure performance?" | OKR |
| "How do we govern a large portfolio?" | Lean Portfolio Management |
| "How do we track performance across perspectives?" | Balanced Scorecard |

**Innovation Questions → Use:**

| Question | Framework |
|----------|-----------|
| "How do we understand our users' needs?" | Design Thinking, JTBD |
| "What business model should we use?" | Business Model Canvas |
| "How do we find uncontested market space?" | Blue Ocean Strategy |
| "What should we build vs. buy?" | Wardley Mapping |

### 8.2 Framework Combination Patterns

Frameworks are most powerful in combination:

| Goal | Framework Combination |
|------|-----------------------|
| **AI Strategy** | Three Horizons + Wardley + BCG Matrix |
| **Transformation Planning** | TOGAF + McKinsey 7S + OKR |
| **Portfolio Governance** | SAFe LPM + Balanced Scorecard + WSJF |
| **Operating Model Design** | BIZBoK + TOGAF + RACI |
| **New Business Building** | Design Thinking + Value Proposition Canvas + Business Model Canvas |

---

*Volume 8 of 10 — Enterprise Strategy & Business Architecture Handbook*
