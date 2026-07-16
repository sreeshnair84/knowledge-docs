---
title: "Vol 4 — Consulting Frameworks & Industry Strategy Playbook"
date: 2026-07-15
date_created: 2026-07-15
last_reviewed: 2026-07-15
status: current
source_type: native-md
source_file: ""
tags: ["consulting-frameworks", "McKinsey", "BCG", "Bain", "strategy-tools", "industry-strategy", "TOGAF", "wardley-mapping", "business-model-canvas"]
doc_type: handbook-volume
series_name: Enterprise Strategy & Business Architecture Handbook
series_part: 4
series_total: 5
---

# Vol 4 — Consulting Frameworks & Industry Strategy Playbook

> **Covers:** Every major consulting framework (McKinsey, BCG, Bain, Deloitte, Gartner and academic), when to use each, comparisons between competing tools, and industry-specific strategy playbooks for 12 sectors — plus a decision tree for selecting the right framework.

---

## Part 1 — The Consulting Framework Landscape

### 1.1 Why Frameworks Exist

Consulting frameworks are cognitive shortcuts — structured thinking tools that:
1. Decompose complex problems into manageable components
2. Ensure completeness (nothing important is missed)
3. Create a shared vocabulary between consultants and clients
4. Speed up analysis by providing a proven starting structure

**The Fatal Error with Frameworks:** Using them as paint-by-numbers instead of as thinking scaffolding. A framework is a starting point for analysis, not a substitute for analysis.

### 1.2 Framework Taxonomy

```
CONSULTING FRAMEWORK TAXONOMY

ENVIRONMENTAL ANALYSIS (Where are we?)
├── PESTLE — Macro-environment analysis
├── Porter's Five Forces — Industry attractiveness
├── SWOT — Situation analysis
└── Scenario Planning — Future uncertainty mapping

STRATEGY FORMULATION (What should we do?)
├── Ansoff Matrix — Growth direction choices
├── BCG Growth-Share Matrix — Portfolio allocation
├── Porter's Generic Strategies — Competitive position
├── VRIO — Resource-based advantage analysis
├── Blue Ocean Strategy — Uncontested market creation
└── Three Horizons — Innovation and growth portfolio

ORGANIZATIONAL DESIGN (How should we organize?)
├── McKinsey 7S — Organizational alignment
├── MOST — Mission, Objectives, Strategies, Tactics
├── Congruence Model (Nadler-Tushman) — Org fit analysis
└── Star Model (Galbraith) — Org design dimensions

EXECUTION & PERFORMANCE (Are we executing well?)
├── OKR — Objective and Key Results
├── Balanced Scorecard — Multi-perspective measurement
├── Hoshin Kanri — Strategy deployment
└── Lean / Six Sigma — Process excellence

INNOVATION & DISRUPTION (What's next?)
├── Jobs To Be Done — Customer motivation lens
├── Wardley Mapping — Capability evolution
├── Business Model Canvas — Business model design
├── Value Proposition Canvas — Customer fit
└── Christensen Disruption — Competitive threat analysis

ARCHITECTURE & DESIGN (How do we build?)
├── TOGAF — Enterprise architecture lifecycle
├── BIZBOK — Business architecture
├── Domain-Driven Design — Software design
└── Zachman Framework — Architecture classification
```

---

## Part 2 — Environmental Analysis Frameworks

### 2.1 PESTLE Analysis

**PESTLE** (Political, Economic, Social, Technological, Legal, Environmental) provides a structured scan of the macro-environment affecting an organization.

```
PESTLE DIMENSIONS

P — POLITICAL
"How do government decisions affect our business?"
• Regulatory policy and reform
• Government stability
• Trade policy and tariffs
• Tax policy
• Government spending priorities

E — ECONOMIC
"How do economic conditions affect us?"
• GDP growth rates
• Interest rates and inflation
• Exchange rates
• Employment and wage levels
• Consumer spending patterns

S — SOCIAL / SOCIOCULTURAL
"How do social changes affect us?"
• Demographics (aging, urbanization)
• Cultural shifts and values
• Consumer behavior changes
• Health and wellbeing trends
• Education and skills

T — TECHNOLOGICAL
"What technology changes create opportunity or threat?"
• AI and automation
• Digital disruption
• Platform economics
• Cybersecurity threats
• Emerging tech (quantum, biotech)

L — LEGAL
"What legal obligations constrain or enable us?"
• Data protection (GDPR, CCPA, DPDP)
• Industry regulations
• Employment law
• Competition/antitrust
• IP and licensing

E — ENVIRONMENTAL
"How do ecological factors affect us?"
• Climate change physical risks
• Net-zero commitments
• ESG reporting requirements
• Resource scarcity
• Circular economy regulations
```

**PESTLE Example: European Bank 2026:**

| Factor | Observation | Strategic Implication |
|--------|-------------|----------------------|
| Political | EU AI Act in force | High-risk AI systems require conformity assessment |
| Economic | ECB rate cycle turning | Net Interest Margin compression; fee income focus |
| Social | Gen Z expects fully digital | Physical branch reduction; digital-first design |
| Technology | Agentic AI available | Opportunity for AI-native banking operations |
| Legal | PSD3 / Open Finance | Must open APIs to third parties |
| Environmental | ECB green taxonomy | Loan portfolio must report ESG impact |

### 2.2 Porter's Five Forces

Michael Porter's **Five Forces** model assesses the structural attractiveness of an industry. High forces = low profitability potential.

```
PORTER'S FIVE FORCES

                    THREAT OF
                  NEW ENTRANTS
                       ↓
BARGAINING       ──────────────       BARGAINING
POWER OF         │            │       POWER OF
SUPPLIERS        │  INDUSTRY  │       BUYERS
   ─────────────►│ RIVALRY    │◄─────────────
                 │            │
                  ──────────────
                       ↑
                    THREAT OF
                   SUBSTITUTES
```

**Force Analysis:**

| Force | High Threat Factors | Low Threat Factors |
|-------|--------------------|--------------------|
| **New Entrants** | Low capital required, no regulation, easy access to distribution | High capital, patents, regulation, brand loyalty |
| **Supplier Power** | Few suppliers, unique inputs, no substitutes | Many suppliers, commodity inputs, easy to switch |
| **Buyer Power** | Buyers concentrated, standard products, price-sensitive | Fragmented buyers, differentiated products, switching costs |
| **Substitutes** | Lower-cost alternatives, better performance | No alternatives, high switching costs |
| **Rivalry** | Many competitors, slow growth, commodity product | Few competitors, fast growth, differentiated |

**Application for AI Strategy:** Agentic AI increases threat of new entrants (lower barrier) and substitutes (AI-native competitors) while potentially increasing buyer power (AI enables easier comparison).

### 2.3 SWOT Analysis

**SWOT** (Strengths, Weaknesses, Opportunities, Threats) is the most widely used — and most abused — strategy framework.

**The Right Way to Use SWOT:**

| Quadrant | Content | Source |
|----------|---------|--------|
| **Strengths** | Internal advantages relative to competitors | Internal assessment |
| **Weaknesses** | Internal disadvantages relative to competitors | Internal assessment |
| **Opportunities** | External conditions you can exploit with your strengths | PESTLE + Five Forces |
| **Threats** | External conditions that could harm you | PESTLE + Five Forces |

**SWOT → TOWS (Strategic Options):**

```
TOWS MATRIX (Deriving Strategy from SWOT)

                    OPPORTUNITIES          THREATS
                    (External)             (External)
              ┌────────────────────┬───────────────────────┐
STRENGTHS     │ SO Strategy        │ ST Strategy           │
(Internal)    │ Use strengths to   │ Use strengths to      │
              │ exploit            │ avoid or mitigate     │
              │ opportunities      │ threats               │
              ├────────────────────┼───────────────────────┤
WEAKNESSES    │ WO Strategy        │ WT Strategy           │
(Internal)    │ Overcome           │ Minimize weaknesses   │
              │ weaknesses by      │ and avoid threats     │
              │ exploiting         │ (defensive)           │
              │ opportunities      │                       │
              └────────────────────┴───────────────────────┘
```

### 2.4 Scenario Planning

**Scenario Planning** (Shell Oil / GBN method) builds multiple plausible futures and tests strategy robustness against each.

**Four-Step Process:**

1. **Identify focal question**: "What is our strategic position in 2030?"
2. **Identify driving forces**: Macro forces that will shape the future (AI regulation, climate, geopolitics)
3. **Identify critical uncertainties**: Forces that are both important AND uncertain
4. **Build 4 scenarios**: Using the two most critical uncertainties as axes

```
SCENARIO MATRIX (Retail Banking 2030)

                    AI ADOPTION: HIGH
                         │
                         │
REGULATION:     ─────────┼─────────  REGULATION:
LIGHT                    │                HEAVY
(permissive)   SCENARIO 1 │ SCENARIO 2  (restrictive)
               "Wild West" │ "Regulated AI"
               AI-native  │ Governed AI
               challengers│ adoption
               dominate   │
                         │
               SCENARIO 3 │ SCENARIO 4
               "Stagnation"│ "Fortified Banks"
               Slow AI;   │ Regulation blocks
               incumbents  │ challengers; incumbents
               survive     │ retain market
                         │
                    AI ADOPTION: LOW
```

---

## Part 3 — Strategy Formulation Frameworks

### 3.1 Ansoff Matrix

The **Ansoff Matrix** (Igor Ansoff, 1957) provides four growth strategy options based on market and product dimensions:

```
ANSOFF MATRIX

                  EXISTING PRODUCT    NEW PRODUCT
                ┌──────────────────┬──────────────────┐
EXISTING        │ MARKET           │ PRODUCT          │
MARKET          │ PENETRATION      │ DEVELOPMENT      │
                │                  │                  │
                │ Sell more of the │ Develop new      │
                │ same to existing │ products for     │
                │ customers        │ existing markets │
                │                  │                  │
                │ Risk: LOW        │ Risk: MEDIUM     │
                ├──────────────────┼──────────────────┤
NEW             │ MARKET           │ DIVERSIFICATION  │
MARKET          │ DEVELOPMENT      │                  │
                │                  │                  │
                │ Take existing    │ New products     │
                │ products to      │ for new markets  │
                │ new markets      │                  │
                │                  │                  │
                │ Risk: MEDIUM     │ Risk: HIGH       │
                └──────────────────┴──────────────────┘
```

### 3.2 BCG Growth-Share Matrix

The **BCG Growth-Share Matrix** (Bruce Henderson, 1970) classifies business units or products by market growth rate and relative market share:

```
BCG GROWTH-SHARE MATRIX

HIGH GROWTH
     │
     │  QUESTION MARKS         STARS
     │  (Problem Children)  
     │  Low share,             High share,
     │  high growth            high growth
     │  → Invest or divest     → Invest to maintain
─────┼────────────────────────────────────  RELATIVE MARKET SHARE →
     │
     │  DOGS                   CASH COWS
     │  Low share,             High share,
     │  low growth             low growth
     │  → Divest or milk       → Harvest for cash
     │
LOW GROWTH
```

**BCG Prescriptions:**

| Quadrant | Strategic Action | Investment |
|----------|-----------------|-----------|
| **Stars** | Invest to maintain leadership | High — defend position |
| **Cash Cows** | Harvest cash; minimal new investment | Low — milk for cash |
| **Question Marks** | Invest in winners; divest losers | Selective — bet on best |
| **Dogs** | Divest or run for cash | Minimal or none |

**Modern Critique:** BCG matrix oversimplifies. A "Dog" with high synergy value may be worth keeping. A "Star" in a commoditizing market may face disruption. Use as one input, not a mandate.

### 3.3 VRIO Framework

**VRIO** (Barney, 1991) is a resource-based view tool for assessing whether a capability creates sustainable competitive advantage:

| Test | Question | If Yes | If No |
|------|---------|--------|-------|
| **Valuable** | Does this capability allow us to exploit opportunities or neutralize threats? | Proceed | Competitive disadvantage |
| **Rare** | Is this capability possessed by few competitors? | Proceed | Competitive parity |
| **Inimitable** | Is it costly or difficult for competitors to copy? | Proceed | Temporary advantage |
| **Organized** | Are we organized to exploit it? | **Sustainable advantage** | Unused potential |

**VRIO Applied to AI Strategy:**

| AI Capability | V | R | I | O | Advantage |
|---------------|---|---|---|---|-----------|
| Off-the-shelf ChatGPT | ✅ | ❌ | ❌ | ✅ | None — parity |
| Proprietary training data | ✅ | ✅ | ✅ | ✅ | Sustainable |
| AI operating model | ✅ | ✅ | ❌ | ✅ | Temporary |
| AI + customer data flywheel | ✅ | ✅ | ✅ | ✅ | Sustainable |

### 3.4 Wardley Mapping

**Wardley Mapping** (Simon Wardley, 2016) is a situational awareness tool that maps capabilities on two axes — visibility to user and evolutionary stage — to guide strategic decisions.

```
WARDLEY MAP

VISIBILITY TO USER (High → Low)
         │
VISIBLE  │    Customer       Order         Fulfillment
(User    │    Experience  ──► Management ──► System
sees it) │         │                              │
         │    Mobile App ──► API Layer ──► Logistics Platform
         │                              │
INVISIBLE│                        Cloud Infrastructure
(Genesis → Custom → Product → Commodity)
         └──────────────────────────────────────────────►
              EVOLUTION / COMMODITY STAGE
```

**Evolutionary Stages:**

| Stage | Characteristics | Strategy |
|-------|----------------|---------|
| **Genesis** | Unique, poorly understood, experimental | R&D, tolerate failure |
| **Custom-Built** | Better understood, bespoke, expensive | Build to differentiate |
| **Product/Rental** | Standardized, feature competition | Buy or build best-in-class |
| **Commodity/Utility** | Widespread, price competition | Buy cheapest, outsource |

**Wardley Mapping for AI (2026):**

| AI Capability | Evolutionary Stage | Implication |
|---------------|-------------------|-------------|
| LLM foundation models | Product → Commodity | Buy from hyperscaler (don't build) |
| AI orchestration frameworks | Custom → Product | Use LangGraph/AutoGen, don't reinvent |
| AI governance | Genesis → Custom | Build internally — no commodity solution |
| AI customer personalization | Custom → Product | Build with differentiating data |
| AI agent memory | Genesis → Custom | Research + early investment |

### 3.5 Blue Ocean Strategy

**Blue Ocean Strategy** (Kim & Mauborgne, 2005) advocates creating uncontested market space rather than competing in existing ("red ocean") markets.

**ERRC Grid (Eliminate-Reduce-Raise-Create):**

```
ERRC GRID — Example: AI-Native Insurance Company

ELIMINATE (factors industry competes on that have low value)
• Paper forms and wet signatures
• Branch networks
• Human call centers for routine queries

REDUCE (factors below industry standard)
• Processing time (from weeks to minutes)
• Documentation requirements

RAISE (factors above industry standard)
• Claims speed (AI settles simple claims in minutes)
• Transparency (real-time claim tracking)
• Personalization (AI-tailored coverage)

CREATE (factors never offered before)
• Embedded insurance at point of purchase (API-first)
• Behavioral data-driven dynamic pricing
• AI-powered preventive risk advice
```

---

## Part 4 — Organizational and Execution Frameworks

### 4.1 McKinsey 7S Framework

The **McKinsey 7S Framework** (Peters, Waterman, 1980) provides a holistic view of organizational alignment across seven interdependent elements.

```
McKINSEY 7S FRAMEWORK

                    STRATEGY
                       │
              ┌────────┼────────┐
              │        │        │
           STRUCTURE   │     SYSTEMS
              │        │        │
              └────────┼────────┘
                       │
              ┌────────┼────────┐
              │        │        │
          SHARED     STAFF    SKILLS
          VALUES       │        │
              │        │        │
              └────────┼────────┘
                       │
                     STYLE
```

**The 7 Elements:**

| Element | Description | Diagnostic Questions |
|---------|-------------|---------------------|
| **Strategy** | Plan to build competitive advantage | Is the strategy clear and unique? |
| **Structure** | Organization design and reporting | Does structure support strategy? |
| **Systems** | Processes and procedures | Do our processes enable or hinder strategy? |
| **Shared Values** | Core beliefs and culture | Does culture support strategic goals? |
| **Staff** | People and HR practices | Do we have the right people? |
| **Skills** | Capabilities of the organization | Do we have required capabilities? |
| **Style** | Leadership and management approach | Does leadership style match strategy? |

**7S for Digital Transformation:**
When assessing a digital transformation, all 7S must change coherently. Organizations fail when they change Structure (org chart) and Systems (technology) without changing Skills (AI literacy), Style (experiment-friendly leadership), and Shared Values (customer-first culture).

### 4.2 OKR Framework (Google / Intel)

**OKRs** (Objectives and Key Results) connect strategy to execution through ambitious qualitative objectives and measurable key results.

**OKR Design Rules:**

| Rule | Description |
|------|-------------|
| **Ambitious** | Should feel slightly uncomfortable — 70% completion is good |
| **Qualitative Objective** | Inspiring, memorable, directional |
| **Quantitative KRs** | 3–5 per objective; clearly measurable; binary (done/not done) |
| **Time-bound** | Quarterly (teams) or Annual (company) |
| **Transparent** | Published across the organization — everyone sees everyone's OKRs |
| **Tracked** | Weekly check-ins; quarterly scoring |

**OKR Scoring:**
- 0.0–0.3: Failed to make real progress
- 0.4–0.6: Made progress but fell short
- 0.7–1.0: Delivered (0.7 is considered "ideal" — too easy if consistently 1.0)

**OKR vs. KPI:**

| Dimension | OKR | KPI |
|-----------|-----|-----|
| **Purpose** | Set ambitious direction; drive improvement | Monitor performance against baseline |
| **Frequency** | Quarterly / Annual | Real-time, monthly, quarterly |
| **Nature** | Stretch goals | Operational thresholds |
| **Failure** | Expected sometimes — shows ambition | Signals problem to fix |
| **Origin** | Intel/Google | Business management |

### 4.3 Balanced Scorecard (Kaplan & Norton)

The **Balanced Scorecard** provides four perspectives for measuring strategic performance — preventing over-focus on financial metrics alone.

**Four Perspectives:**

| Perspective | Core Question | Example Metrics |
|-------------|--------------|----------------|
| **Financial** | How do we look to shareholders? | Revenue growth, EBITDA, ROI |
| **Customer** | How do customers see us? | NPS, market share, retention, CLV |
| **Internal Processes** | What must we excel at? | Process efficiency, quality, cycle time |
| **Learning & Growth** | Can we continue to improve? | Employee skills, innovation rate, culture |

**Strategy Map:** Kaplan & Norton's companion tool shows causal linkages between objectives across the four perspectives.

```
STRATEGY MAP (Banking Example)

FINANCIAL: "Increase shareholder returns by 20%"
     ↑ drives
CUSTOMER: "Grow SMB market share from 12% to 20%"
     ↑ drives
INTERNAL: "Deliver AI-powered SMB onboarding in <2 hours"
     ↑ requires
LEARNING: "Build AI engineering and product capability (200 FTE)"
```

### 4.4 Hoshin Kanri (Policy Deployment)

**Hoshin Kanri** cascades strategy through the organization using a "catchball" process — two-way negotiation between levels — to ensure genuine alignment rather than top-down mandate.

```
HOSHIN X-MATRIX

[NORTH] Strategic Objectives (3–5 years)
"Become #1 AI-native bank in Southeast Asia"

[WEST] Annual Priorities
"Launch AI credit in 3 markets"
"Achieve 60% digital loan acquisition"
"Build AI engineering team of 150"

[SOUTH] Improvement Priorities (what specifically to improve)
"Reduce loan decision time from 14 days to 2 hours"
"Increase digital channel NPS from 32 to 55"

[EAST] Measurable Targets (owners and metrics)
"Loan decision SLA: 2 hours / Jamal Khan / Q4 2027"
"Digital NPS: 55 / Sarah Lee / Q3 2027"

[CENTER] Relationships Matrix (shows which annual priorities
         contribute to which strategic objectives)
```

---

## Part 5 — Architecture and Design Frameworks

### 5.1 TOGAF (The Open Group Architecture Framework)

**TOGAF** is the most widely adopted enterprise architecture framework globally, providing a systematic approach to architecture development and governance.

**TOGAF Architecture Development Method (ADM):**

```
TOGAF ADM PHASES

         PRELIMINARY
         (Framework setup)
              │
    ┌─────────┼─────────┐
    │         │         │
  A: ARCH.   │         │
  VISION  ───┤         │
    │         │         │
  B: BIZ     │    H:   │
  ARCH.    ──┤ ARCH. ──┤
    │         │ CHANGE  │
  C: INFO     │ MGMT    │
  ARCH.    ──┤         │
    │         │         │
  D: TECH     │         │
  ARCH.    ───┘         │
    │                   │
  E: OPPS               │
  & SOLUTIONS           │
    │                   │
  F: MIGRATION          │
  PLANNING              │
    │                   │
  G: IMPL.              │
  GOVERNANCE ───────────┘

REQUIREMENTS MANAGEMENT (Throughout)
```

**TOGAF Architecture Domains:**

| Domain | Covers | Artifacts |
|--------|--------|---------|
| **Business Architecture** | Capabilities, value streams, processes, organization | Capability map, value stream map, business process model |
| **Data Architecture** | Data entities, relationships, governance | Data model, data flow, data dictionary |
| **Application Architecture** | Systems, integrations, APIs | Application portfolio, integration map, system context |
| **Technology Architecture** | Infrastructure, platforms, cloud | Technology stack, network topology, cloud architecture |

**TOGAF vs. Other Frameworks:**

| Framework | Strength | Weakness | Best For |
|-----------|---------|---------|---------|
| **TOGAF** | Comprehensive, globally recognized | Complex, bureaucratic | Large regulated enterprises |
| **Zachman** | Classification completeness | Not a process, just a taxonomy | Architecture documentation |
| **FEAF** | US federal government | Limited to US government | US federal agencies |
| **SAFe** | Agile at scale, delivery focus | Less architecture depth | Software delivery organizations |
| **BIZBOK** | Business architecture depth | No technology coverage | Business architecture practice |

### 5.2 Zachman Framework

The **Zachman Framework** (John Zachman, 1987) is a classification schema — not a process — for organizing architecture artifacts by perspective and dimension.

```
ZACHMAN FRAMEWORK (Simplified)

           WHAT         HOW           WHERE        WHO          WHEN         WHY
           (Data)       (Function)    (Network)    (People)     (Time)       (Motivation)

PLANNER:   Semantic     Business      Business     Work         Master       Business
(Scope)    Model        Process Mdl   Geography    Breakdown    Plan         Strategy

OWNER:     Conceptual   Application   Distributed  Human Iface  Business     Business
(Concept)  Data Mdl     Architecture  Arch         Design       Event        Rule Model

DESIGNER:  Logical Data System        Network      Presentation Process      Business
(System)   Model        Design        Arch         Design       Design       Rule Design

BUILDER:   Physical     Program       Network      Interface    Control      Rule
(Tech)     Data Model   Design        Arch         Design       Flow         Definition

IMPL:      Data         Code          Network      Interface    Timing       Rule
(Product)  Definition                 Components   Definition   Definition   Specification
```

---

## Part 6 — Industry Strategy Playbooks

### 6.1 Banking & Financial Services

**Industry Context 2026:**
- Embedded finance disrupting traditional banking
- BaaS (Banking as a Service) creating new revenue streams
- Central Bank Digital Currencies (CBDC) on horizon
- Agentic AI in wealth management and credit
- PSD3/Open Finance mandating API openness
- AI credit scoring under regulatory scrutiny (explainability)

**Banking Strategy Playbook:**

```
BANKING STRATEGY 2026 PLAYBOOK

DEFEND (Protect existing revenue)
├── Retention: AI-powered churn prediction
├── Cost: Process automation (RPA → AI)
└── Risk: AI-enhanced fraud/AML

GROW (Expand within market)
├── Digital: Mobile-first, no-branch experience
├── SMB: Embedded financial services for business
└── Wealth: AI-powered accessible wealth management

TRANSFORM (Build future)
├── BaaS: API banking for third-party embedding
├── AI-native credit: Explainable AI underwriting
└── Platform: Financial ecosystem orchestration
```

**Banking Capability Priorities:**

| Capability | Current Maturity | Target Maturity | Strategic Importance |
|-----------|-----------------|-----------------|---------------------|
| Digital Onboarding | L2 | L5 | Critical |
| AI Credit Scoring | L1 | L4 | Critical |
| Real-time Payments | L3 | L5 | High |
| Open Banking API | L2 | L4 | High |
| AI Fraud Detection | L3 | L5 | Critical |
| Customer 360 Analytics | L2 | L4 | High |

### 6.2 Healthcare

**Industry Context 2026:**
- Payer-provider convergence (UnitedHealth/Optum model)
- GLP-1 drugs transforming obesity/diabetes care
- AI-assisted diagnostics (FDA-approved AI medical devices)
- Ambient AI for clinical documentation (DAX, Nuance)
- Value-based care replacing fee-for-service
- Staffing shortage driving AI augmentation
- HIPAA + EU GDPR + AI Act compliance complexity

**Healthcare Strategy Playbook:**

```
HEALTHCARE STRATEGY 2026 PLAYBOOK

DEFEND
├── Quality: AI-powered clinical decision support
├── Safety: Predictive early warning systems
└── Compliance: AI governance for clinical AI

GROW
├── Virtual Care: Hybrid care model (in-person + telehealth)
├── Preventive: Chronic disease management programs
└── Partnerships: Payer integration, value-based contracts

TRANSFORM
├── AI-augmented Care: Ambient AI, diagnostic AI
├── Integrated Platform: Unified patient journey
└── Data Monetization: Anonymized research datasets
```

**Healthcare AI Use Cases by ROI:**

| Use Case | Difficulty | ROI | Timeline |
|----------|-----------|-----|---------|
| AI clinical documentation | Low | High | 0–6 months |
| Predictive readmission | Medium | High | 6–12 months |
| AI medical imaging | High | Very High | 12–24 months |
| Drug interaction detection | Medium | High | 6–12 months |
| Claims automation | Low | Medium | 3–6 months |
| Patient scheduling optimization | Low | Medium | 3–6 months |

### 6.3 Retail

**Industry Context 2026:**
- Unified commerce (seamless physical+digital)
- Social commerce (TikTok Shop, Instagram)
- Quick commerce (q-commerce, 15-minute delivery)
- AI personalization at the product level
- Retail media networks (competing with advertising)
- Sustainability mandate (circular economy)
- Returns crisis (AI-powered returns reduction)

**Retail Capability Map (AI-Era):**

| Capability | Traditional | AI-Transformed |
|-----------|------------|----------------|
| Demand Forecasting | Historical averages | AI + real-time signals |
| Pricing | Manual schedule | AI dynamic pricing |
| Inventory Management | Safety stock buffers | AI-optimized lean inventory |
| Personalization | Segment-based | Individual-level AI |
| Customer Service | Call center | AI agent + human hybrid |
| Supply Chain | Reactive | AI predictive and autonomous |

### 6.4 Manufacturing

**Industry Context 2026:**
- Industry 5.0: Human + robot collaboration
- Digital twin maturation
- Reshoring and nearshoring
- Green manufacturing mandates
- Skilled labor shortage → AI + robotics
- Predictive maintenance ROI proven at scale
- Carbon accounting as operational requirement

**Manufacturing Strategy Playbook:**

```
SMART FACTORY CAPABILITY ROADMAP

YEAR 1: CONNECT
├── IoT sensors on all critical equipment
├── Data lake for operational data
└── Basic monitoring dashboards

YEAR 2: ANALYZE
├── Predictive maintenance AI
├── Quality vision AI
└── OEE (Overall Equipment Effectiveness) optimization

YEAR 3: AUTOMATE
├── AI-driven production scheduling
├── Autonomous quality control
└── Digital twin for process simulation

YEAR 4: OPTIMIZE
├── Supply chain AI integration
├── Energy optimization AI
└── Autonomous material handling
```

### 6.5 Telecommunications

**Industry Context 2026:**
- 5G monetization under pressure (B2C is slow)
- B2B/enterprise private 5G opportunity
- Open RAN transforming network economics
- AI in network operations (SON, AIOps)
- OTT competition commoditizing voice/data
- Satellite competition (SpaceX Starlink, Amazon Kuiper)
- Infrastructure sharing and tower monetization

**Telecom AI Operating Model:**

| Function | AI Use Case | Value |
|----------|------------|-------|
| Network Ops | AI-powered self-optimizing networks | 30–40% OPEX reduction |
| Customer Service | AI agent for 80% of routine queries | 40% cost reduction |
| Revenue Assurance | AI fraud detection | 2–5% revenue leakage recovered |
| Network Planning | AI capacity forecasting | 15% CapEx reduction |
| Field Operations | AI-dispatched field engineers | 20% efficiency gain |

### 6.6 Government and Public Sector

**Industry Context 2026:**
- Digital-first citizen services mandate
- AI adoption with democratic accountability
- Legacy system modernization backlog
- Cyber threat escalation (nation-state)
- Budget constraints + efficiency demands
- Data sovereignty requirements
- Trust deficit with AI systems

**Government AI Governance Principles:**

```
GOVERNMENT AI PRINCIPLES (2026 Best Practice)

1. EXPLAINABILITY FIRST
   All citizen-impacting AI decisions must be explainable
   and subject to human review on request.

2. HUMAN-IN-THE-LOOP FOR HIGH-STAKES
   Benefits decisions, criminal justice, immigration:
   AI assists; human decides; human accountable.

3. OPEN BY DEFAULT
   Government AI models and training data to be open
   where no security or privacy concern exists.

4. PRIVACY BY DESIGN
   AI systems processing citizen data follow
   data minimization and purpose limitation.

5. INCLUSIVE BY DESIGN
   AI services tested for accessibility and
   equitable outcomes across all population groups.

6. ACCOUNTABLE AI
   Audit trail for all AI-assisted decisions.
   Appeals process for citizens affected by AI.
```

### 6.7 Energy & Utilities

**Industry Context 2026:**
- Energy transition (renewable integration)
- Grid modernization (smart grid, microgrids)
- Electrification (EVs, heat pumps)
- Energy storage at scale
- Carbon markets and carbon accounting
- Demand response and flexibility
- AI for grid balancing and optimization

**Energy AI Use Cases:**

| Use Case | Value | Maturity |
|----------|-------|---------|
| Renewable generation forecasting | Grid stability | Proven |
| Predictive asset maintenance | Reduced downtime | Proven |
| Smart grid optimization | Demand response | Scaling |
| Energy theft detection | Revenue protection | Proven |
| Customer energy advisory | Engagement + retention | Early |
| Carbon accounting automation | Compliance | Developing |

### 6.8 Life Sciences & Pharma

**Industry Context 2026:**
- AI-accelerated drug discovery
- GLP-1 blockbusters reshaping portfolios
- FDA AI/ML guidance for medical devices
- Clinical trial optimization with AI
- Real-world evidence requirements
- Manufacturing quality (AI + digitization)

**Drug Development AI Value Chain:**

```
DRUG DEVELOPMENT LIFECYCLE — AI OPPORTUNITIES

DISCOVERY (10–12 years → AI compresses to 3–5)
├── AI target identification
├── AI molecule generation and screening
└── AI biomarker identification

PRECLINICAL
├── AI toxicity prediction
└── AI animal trial optimization

CLINICAL TRIALS
├── AI patient matching and recruitment
├── AI trial site selection
└── AI adverse event detection

REGULATORY
├── AI documentation generation
└── AI FDA submission analysis

POST-MARKET
├── AI pharmacovigilance
└── Real-world evidence AI analysis
```

### 6.9 Defense and Intelligence

**Industry Context 2026:**
- Autonomous systems (UAV, autonomous vehicles)
- AI-enabled intelligence analysis
- Multi-domain operations (land, sea, air, space, cyber)
- AI supply chain assurance
- AI in logistics and predictive maintenance
- Responsible AI / AI ethics in lethal systems

**Defense Architecture Frameworks:**

| Framework | Purpose | Users |
|-----------|---------|-------|
| **DoDAF** | US Department of Defense Architecture Framework | US DoD programs |
| **MODAF** | UK MoD Architecture Framework | UK defense |
| **NAF** | NATO Architecture Framework | NATO member nations |
| **NGAF** | Next Generation Architecture Framework (emerging) | Allied nations AI programs |

---

## Part 7 — Framework Selection Decision Tree

### 7.1 Choosing the Right Framework

```
FRAMEWORK SELECTION DECISION TREE

START: What problem are you solving?
│
├── "We don't know what's happening in our environment"
│       → PESTLE (macro scan) + Five Forces (industry)
│
├── "We need to choose a strategic direction"
│       → Ansoff Matrix (growth choices) + SWOT/TOWS (options)
│
├── "We need to allocate resources across business units"
│       → BCG Growth-Share Matrix + Portfolio Management
│
├── "We need to understand our competitive advantage"
│       → VRIO + Porter's Generic Strategies
│
├── "We're designing our organization"
│       → McKinsey 7S + Operating Model Design
│
├── "We're tracking strategy execution"
│       → OKR + Balanced Scorecard
│
├── "We're designing our technology architecture"
│       → TOGAF ADM + BIZBOK
│
├── "We're planning a platform or ecosystem business"
│       → Platform Strategy + Business Model Canvas
│
├── "We're assessing AI strategic positioning"
│       → VRIO (for AI capabilities) + Wardley Map
│
└── "We're planning innovation/disruption response"
        → Three Horizons + Wardley Mapping + Blue Ocean
```

### 7.2 Framework Comparison Matrix

| Framework | Complexity | Speed | Depth | Best At |
|-----------|-----------|-------|-------|---------|
| SWOT | Low | Fast | Shallow | Situation summary |
| Porter's Five Forces | Medium | Medium | Good | Industry attractiveness |
| PESTLE | Low | Fast | Medium | Environment scan |
| Ansoff | Low | Fast | Shallow | Growth direction |
| BCG Matrix | Low | Fast | Shallow | Portfolio allocation |
| McKinsey 7S | Medium | Medium | Good | Org alignment diagnosis |
| OKR | Medium | Fast | Good | Strategy execution |
| Balanced Scorecard | High | Slow | Deep | Strategy measurement |
| TOGAF | Very High | Very Slow | Very Deep | Enterprise architecture |
| Wardley Map | High | Slow | Deep | Strategic positioning |

---

## Part 8 — Consulting Terminology Glossary

| Term | Firm / Origin | Definition |
|------|--------------|-----------|
| **MECE** | McKinsey | Mutually Exclusive, Collectively Exhaustive — structure with no overlaps, no gaps |
| **Issue Tree** | McKinsey/BCG | Hierarchical decomposition of a business problem |
| **Hypothesis-Driven** | McKinsey | Start with answer hypothesis, gather evidence to test |
| **Pyramid Principle** | Barbara Minto / McKinsey | Communication: lead with conclusion, then supporting argument |
| **So What?** | All consulting firms | Test whether an insight is actionable: "So what should the client do?" |
| **Top-Down Communication** | McKinsey | Lead with recommendation, then evidence (executives are time-constrained) |
| **Value Driver Tree** | BCG | Decompose business value into measurable components |
| **Experience Curve** | BCG | Costs fall by 20–30% with each doubling of cumulative volume |
| **Growth Share Matrix** | BCG | Stars, Cash Cows, Question Marks, Dogs portfolio tool |
| **Net Promoter Score** | Bain (Reichheld) | Likelihood to recommend; defines promoters, passives, detractors |
| **Value Creation** | Private equity / BCG | The mechanism by which an investment increases in value |
| **EBITDA** | Finance | Earnings Before Interest, Tax, Depreciation, and Amortization |
| **Run Rate** | All | Annualized projection of current revenue or cost |
| **Synergy** | M&A strategy | Value created by combining two organizations beyond their standalone value |
| **Core Competence** | Hamel & Prahalad | A deep competence that provides competitive advantage across many markets |
| **Burning Platform** | Change management | A crisis so severe it forces action — named after Piper Alpha oil rig disaster |
| **Quick Win** | Program management | Early, visible improvement that builds momentum for larger transformation |
| **Low-Hanging Fruit** | All | Easy improvements available without significant investment |
| **Boiling the Ocean** | All | Trying to solve everything at once — a failure mode to avoid |
| **Proof of Concept (PoC)** | Technology / Innovation | Limited test to prove a concept before full investment |
| **Pilot** | All | Limited-scope deployment to validate an approach before scaling |

---

*→ Continue to [Vol 5 — AI Strategy, Transformation & Glossary](./vol5-ai-strategy-transformation-glossary)*

*← Return to [Handbook Index](./index)*
