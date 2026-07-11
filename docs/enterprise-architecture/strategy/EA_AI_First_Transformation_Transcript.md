---
title: "ENTERPRISE ARCHITECTURE** **~~<u>AI-FIRST TRANSFORMATION</u> A Real-Life Transcript~~"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "EA_AI_First_Transformation_Transcript.pdf"
doc_type: workshop-transcript
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
session_type: "workshop"
related_pages: ["—"]
---
## Participants

## Scenario

## Audience

**Page 1** 

# **ENTERPRISE ARCHITECTURE** **~~<u>AI-FIRST TRANSFORMATION</u> A Real-Life Transcript~~** 

**From Zero AI to AI-First — An 18-Month Journey** 

— — <u>Following Marcus Webb Enterprise Architect at RetailCo as he guides a traditional retail company that has never built a single AI model through an 18-month transformation into an AI-first organisation. Every stakeholder</u> — <u>battle, every failed pilot, every hard data truth, every governance crisis, and every breakthrough moment grounded in lessons from McKinsey, BCG, Accenture, and the journeys of Netflix, Google, Amazon, and Spotify.</u> 

**~~Marcus Webb Diana Cole~~** 

**~~Dr. Amara Osei Sarah Chen James Owusu~~ Priya Nair** 

**Alan Brooks Karen Mills Raj Patel Viktor Hale** 

**Zara Okonkwo Lisa Park** 

**~~Cast of Characters~~** ~~Enterprise Architect — our protagonist Chief Digital Officer — executive sponsor Head of Data Science — newly hired from DeepMind Chief AI Officer (CAIO) — hired Month 3~~ Head of Engineering Head of Data Architecture CISO CFO 

Head of Retail Operations — the sceptic McKinsey QuantumBlack — AI Strategy Lead BCG X — AI Transformation Partner <u>Ex-Google AI PM, now fractional CAIO advisor</u> 

**~~<mark>AWAKENING ASSESSMENT</mark>~~** 

**~~<mark>FOUNDATION</mark>~~** 

**~~<mark>PILOT SCALE GOVERN CULTURE MEASURE</mark>~~** 

**Page 2** 

## **STAGE 1 — AWAKENING** 

#### The Moment It Becomes Unavoidable 

Month 1 | January 2025 

RetailCo's board has just returned from the NRF Retail Innovation Summit in New York. Three of the five keynotes were about AI. RetailCo's primary competitor — NovaMart — has just announced an AI-powered demand forecasting system that reduced their overstock by 31% in one year. The board chair sends an email to the CEO at 11pm from the flight home: 'We need to talk about AI. Monday.' By Tuesday, that conversation has reached Marcus's desk. 

I **09:15 | Tuesday 14 January 2025** I Diana Cole's office — Floor 12 

#### I **Emergency Strategy Session — AI Direction** 

Attendees: Diana (CDO), Marcus (EA) 

##### **Diana Cole — CDO** 

Marcus — the board wants an AI strategy by the end of Q1. I need to know where we stand. Honestly. No PowerPoint spin. 

##### **Marcus Webb — EA** 

Honestly? We have zero production AI. We have one data scientist in Priya's team who built a demand forecasting prototype in a Jupyter notebook eight months ago. It never went to production. Our data is in seven different systems with no unified model, as you know from the commerce programme. We are starting from zero. 

##### **Diana Cole — CDO** 

That can't be right. James's team has been using some ML tools— 

##### **Marcus Webb — EA** 

James's team uses ML tooling in the CI/CD pipeline for test optimisation. That's not an AI strategy. That's a DevOps feature. Diana, before we write a single slide, I want to bring in two external perspectives — one from a consultancy that has run AI transformations at this scale, and one from someone who has lived inside an AI-first company. Can you give me two weeks and a budget for that? 

##### **Diana Cole — CDO** 

Two weeks. Do it. 

I _Marcus (internal): The board panic is real but dangerous. When executives come back from conferences and demand 'AI strategy by Q1', companies make three classic mistakes: they buy tools before solving data problems, they launch pilots with no production path, and they hire data scientists into an infrastructure that can't support them. I have seen this playbook fail at every company I've advised. I need to slow this down without losing momentum._ 

Marcus arranges two conversations. The first is with Viktor Hale, a McKinsey QuantumBlack partner who has run AI transformations at three European retailers. The second is with Lisa Park, a former Google AI Product Manager who now advises mid-market companies on AI adoption. 

I **14:00 | Thursday 23 January 2025** I Video Call — McKinsey QuantumBlack 

I **Consultancy Advisory Session 1 — McKinsey QuantumBlack** Attendees: Marcus (EA), Viktor Hale (McKinsey) 

**Viktor Hale — McKinsey QuantumBlack — AI Strategy Lead** 

**Page 3** 

Marcus, I appreciate the directness. Let me give you the McKinsey framing — our Rewired methodology defines six dimensions: a value roadmap tied to real business outcomes, a skilled talent bench, an operating model that moves at pace, a distributed flexible technology foundation, data embedded throughout, and adoption that converts solutions into actual business gains. The single biggest mistake we see in retail AI transformations is starting at dimension three — technology — when you haven't solved dimension five: data. 

##### **Marcus Webb — EA** 

Our data is fragmented across seven systems. We just finished an 18-month programme unifying our commerce data. What's the realistic timeline for an organisation in our position? 

##### **Viktor Hale — McKinsey QuantumBlack** 

For a genuinely data-immature organisation going to production AI at scale? Eighteen months to thirty-six months if you are honest about it. BCG's research — their '10-20-70 rule' — says 10% of AI value comes from the algorithm, 20% from the data and technology, and 70% from the people, process, and adoption changes. Most companies invest in the 10% and wonder why they get no value. 

##### **Marcus Webb — EA** 

What's the single thing you'd tell our CDO to do first? 

##### **Viktor Hale — McKinsey QuantumBlack** 

Run an honest AI readiness assessment before you touch a single model. Not a PowerPoint exercise — a real audit of your data quality, your data governance, your infrastructure maturity, and your talent. Most companies discover their data is not AI-ready and have to go fix that first. That's not failure. That's honesty. The companies that skip this step spend two years wondering why their AI doesn't work. 

I **McKinsey Rewired** _BCG's 10-20-70 Rule: only 10% of AI value comes from the algorithm. 70% comes from_ **(2025)** _people, process, and adoption. Most companies invest in the 10% and get nothing._ 

I **10:00 | Monday 27 January 2025** 

I Video Call — Lisa Park, ex-Google 

#### I **Advisor Session 2 — Lisa Park (ex-Google AI PM)** 

###### Attendees: Marcus (EA), Lisa Park (Advisor) 

##### **Lisa Park — ex-Google AI PM / Fractional CAIO Advisor** 

Marcus, I'm going to be blunt in a way consultants often aren't. Google didn't become AI-first by running an AI strategy programme. We became AI-first because we had a decade of obsessive data infrastructure investment before we deployed ML at scale. Google Brain existed for years before most products used it in production. What you're about to do — board mandate, Q1 deadline, zero data foundation — is exactly how Pets.com thought about e-commerce in 2000. The technology is real. The timeline is fantasy. 

##### **Marcus Webb — EA** 

What would you tell a company in our position to actually do? Not what Google did — what a traditional company without Google's infrastructure should do? 

##### **Lisa Park — ex-Google AI PM** 

Three things. One: find your highest-value, lowest-data-complexity use case and build one thing properly. Spotify didn't start with a recommendation engine — they started with playlist radio. One thing. Done well. Two: build the data foundation in parallel — not before everything, but as a concurrent workstream. Three: hire a Chief AI Officer before you hire a team of data scientists. The CAIO sets the culture and the standards. Without them, your data scientists will build brilliant things nobody deploys. 

##### **Marcus Webb — EA** 

We have one data scientist today. What's the talent sequencing? 

##### **Lisa Park — ex-Google AI PM** 

**Page 4** 

CAIO first. Then MLOps engineer before more data scientists. I cannot stress this enough. Companies hire five data scientists and wonder why models sit in notebooks for eighteen months. It's because there's nobody to build the pipeline to take a model from a notebook to production. Netflix, Spotify, DoorDash — all of them invested in ML platform infrastructure before they scaled their data science teams. The platform comes first. 

I **Spotify / Netflix /** _Invest in ML platform infrastructure before scaling data science teams. Models that live in_ **DoorDash (ML Platform** _Jupyter notebooks are not AI — they are expensive research._ **Journey)** 

I **REAL-WORLD FAILURE PATTERN: Companies that hire data scientists without MLOps engineers produce models that never reach production. This is the single most common reason AI pilots fail to scale — confirmed across 50+ enterprise AI deployments (OpenAI / Google / Amazon research, 2025).** 

##### **Stage Outcomes** 

I Board mandate received — Q1 AI strategy deadline set 

I External advisory completed: McKinsey QuantumBlack + Lisa Park (ex-Google) 

I Key insight captured: data foundation must come before model development 

I EA recommendation to CDO: AI Readiness Assessment before any model or tooling investment 

I Talent sequencing agreed: CAIO → MLOps Engineer → Data Scientists 

**Page 5** 

## **STAGE 2 — ASSESSMENT** 

The Honest Audit Nobody Wants to Do Months 2–3 | February – March 2025 

Marcus runs the AI Readiness Assessment across four dimensions: Data Quality, Infrastructure Maturity, Talent, and Culture. He enlists Priya Nair for data, James Owusu for infrastructure, and conducts structured interviews with 22 people across the business. What he finds is worse than expected — and more honest than anyone has been in years. 

I **10:00 | Thursday 6 February 2025** I Architecture Studio, Floor 8 

I **AI Readiness Assessment — Data Quality Deep Dive** Attendees: Marcus (EA), Priya (Data Arch) 

##### **Priya Nair — Head of Data Architecture** 

Marcus, I have to be honest. The commerce programme gave us a clean inventory and order data model. But customer data is still a disaster. We have three customer master records. One in Salesforce CRM. One in our loyalty platform. One in the old Oracle system that nobody wants to decommission. A customer who shops in-store and online exists as three different people in our data estate. 

##### **Marcus Webb — EA** 

For AI purposes — what does that mean practically? 

##### **Priya Nair — Head of Data Architecture** 

It means any model that tries to predict customer behaviour will be working from fragments. A demand forecasting model might be okay — that's mostly product and sales data which is now clean in Platform-X. But anything personalisation-related, churn prediction, customer lifetime value — those are broken before we start because the entity they're predicting about doesn't coherently exist in our data. 

##### **Marcus Webb — EA** 

What's the fix timeline? 

##### **Priya Nair — Head of Data Architecture** 

A proper Customer Data Platform that resolves identity across the three systems? Six months minimum. But Marcus — I'd rather do it right as a foundation workstream than have data scientists discover it the hard way six months into a customer AI project. 

##### **Marcus Webb — EA** 

Agreed. That becomes a foundation workstream. What about data labelling? 

##### **Priya Nair — Head of Data Architecture** 

We have almost no labelled training data for supervised learning. Our historical sales data is clean but unstructured. Our customer service transcripts — there are 4.2 million of them from the last five years — are in a file share somewhere, un-tagged, un-processed. That's actually our most valuable raw AI asset and nobody knows it exists. 

##### **Marcus Webb — EA** 

Four million customer service transcripts. That's a training dataset for sentiment analysis, intent classification, and agent assist. Flag that — I'm putting that in the assessment. 

I _Marcus (internal): Three customer master records. This is the data equivalent of the StockMaster problem from the commerce programme — invisible fragmentation that looks fine until you try to build something on top of it. The assessment is confirming the McKinsey point: we cannot build meaningful AI until data is resolved. I need to frame this not as 'we're not ready' but as 'here is exactly what ready looks like and how long it takes'._ 

**Page 6** 

I **14:30 | Tuesday 18 February 2025** 

I Engineering Hub, Floor 3 

I **AI Readiness — Infrastructure & Talent Assessment** 

Attendees: Marcus (EA), James (Eng), Dr. Amara Osei (Data Science) 

##### **James Owusu — Head of Engineering** 

Infrastructure. We're on AWS. We have compute. We don't have a GPU cluster — we'd provision one on demand. We have no ML platform, no model registry, no feature store, no experiment tracking. The data scientists would be running everything on their laptops. 

##### **Dr. Amara Osei — Head of Data Science (new hire)** 

Which is exactly where I was at my last company for six months before I quit. Marcus — can I be blunt about what I see? 

##### **Marcus Webb — EA** 

That's why I hired you, Amara. Be blunt. 

##### **Dr. Amara Osei — Head of Data Science** 

I have seen this pattern at three companies. Hire data scientists, give them interesting problems, no infrastructure, no path to production. Models sit in notebooks. Data scientists get frustrated and leave. Company concludes 'AI doesn't work for us.' The bottleneck is never the algorithm — it is always the plumbing. Lisa Park is right: MLOps first. Give me one good MLOps engineer before you give me three more data scientists. 

##### **Marcus Webb — EA** 

What does 'minimum viable MLOps' look like for us? Not Netflix. For us. 

##### **Dr. Amara Osei — Head of Data Science** 

Four things. Experiment tracking — MLflow or Weights and Biases. Model registry — know what models exist and which version is in production. A feature store — so features built for one model can be reused by others. And a model serving layer — a way to deploy a model as an API that the rest of the business can call. Without these four, a data scientist is a very expensive person writing notebooks nobody reads. 

##### **James Owusu — Head of Engineering** 

I can build that on AWS SageMaker. Four to six weeks for a minimum viable ML platform. It won't be Netflix's Metaflow, but it will get models out of notebooks and into production. 

##### **Marcus Webb — EA** 

James, that becomes a foundation workstream. Amara — what's the highest-value use case we can run as a first pilot given our data constraints? 

##### **Dr. Amara Osei — Head of Data Science** 

With the data we have now — clean product and sales data from Platform-X — demand forecasting. Specifically, markdown optimisation: predicting which products will overstock and when to discount them, and by how much. NovaMart's system reduced overstock by 31%. Ours could do the same. The data is clean, the problem is well-defined, and the financial impact is quantifiable. That's the pilot. 

Marcus consolidates the findings into the AI Readiness Assessment. He presents it to Diana and the board three weeks later. It is not a comfortable presentation. 

I **ARTIFACT: AI Readiness Assessment — RetailCo** AIRA-2025-001 | March 2025 

```
OVERALL AI READINESS SCORE: 2.1 / 5.0 (Industry avg for mature retailers: 3.4)
```

```
DIMENSION 1: DATA QUALITY & GOVERNANCE
```

**AI-FIRST TRANSFORMATION TRANSCRIPT  |  RETAILCO  |  ZERO TO AI-FIRST Page 7** 

```
Score: 1.8/5 — THREE customer master records (Salesforce, Loyalty, Oracle)
```

```
4.2M unprocessed customer service transcripts (HIGH value, zero AI readiness)
Clean product/sales data (Platform-X) — ONLY AI-ready dataset
```

```
ACTION: Customer Data Platform (CDP) — 6-month foundation workstream
```

###### `DIMENSION 2: INFRASTRUCTURE MATURITY` 

```
Score: 1.5/5 — No ML platform, no model registry, no feature store
```

```
No experiment tracking. Data scientists working on local machines.
```

```
AWS infrastructure exists. GPU provisioning possible on demand.
```

```
ACTION: Minimum Viable ML Platform on SageMaker — 6 weeks, James Owusu owns
```

```
DIMENSION 3: TALENT
```

```
Score: 2.0/5 — 1 data scientist. 0 MLOps engineers. 0 AI product managers.
```

```
CAIO position: VACANT
```

```
ACTION: Hire CAIO (Month 3), 1 MLOps Engineer (Month 3), 2 Data Scientists (Month 6)
```

###### `DIMENSION 4: CULTURE & LEADERSHIP` 

```
Score: 3.2/5 — Board mandate exists. CDO sponsorship strong.
```

```
Middle management scepticism HIGH (retail ops team). 'AI will take our jobs' fear.
ACTION: AI literacy programme for all managers. No AI deployment without change mgmt.
```

```
RECOMMENDED PILOT: Demand Forecasting / Markdown Optimisation
```

```
Data readiness: HIGH | Business value: £2.4M annual overstock cost
```

```
Timeline: 4 months to first production model
```

```
WHAT WE ARE NOT DOING YET: Customer personalisation, generative AI, AI agents
```

```
Reason: Customer data not resolved. Foundation must come first.
STATUS: Pending Board approval of AI Transformation Roadmap
```

I **09:00 | Monday 10 March 2025** I Board Room A — Board Presentation 

##### **Diana Cole — CDO** 

Marcus, the board is expecting to hear about AI models we're building. This assessment says we're not ready for most of what they're imagining. 

##### **Marcus Webb — EA** 

Diana, with respect — that's exactly the right message to give the board. BCG's 2025 research found that only 5% of organisations are achieving AI value at scale. The majority of the other 95% rushed past this moment — the honest assessment — because they felt pressure to show something. They all ended up in the same place: expensive pilots that never scaled, data scientists who quit, and a CEO who lost faith in AI. I'd rather have this conversation with the board now than explain in eighteen months why we wasted £3 million. 

##### **Karen Mills — CFO** 

What does the roadmap actually cost? 

##### **Marcus Webb — EA** 

**Page 8** 

Year one: £1.8 million. CAIO hire, MLOps platform build, Customer Data Platform, the demand forecasting pilot, and the AI literacy programme. Year two: £2.4 million as we scale the models that work and build the AI platform layer. Year three: the AI capabilities start generating measurable ROI. The NovaMart benchmark — 31% overstock reduction — translates to approximately £2.4 million per year for us. We break even in year two on the pilot alone. 

##### **Board Chair (via Diana) — Board** 

What's our risk if we don't do this? 

##### **Marcus Webb — EA** 

NovaMart went live with AI demand forecasting eight months ago. If they hold that 31% overstock advantage for three years, their cost base is structurally lower than ours. That is not a technology risk. That is a competitive existential risk. 

##### **Stage Outcomes** 

|IAI Readiness Assessment (AIRA-2025-001) approved by board — honest score: 2.1/5<br>IAI Transformation Roadmap approved — £1.8M Year 1 investment|
|---|
|IPilot selected: Demand Forecasting / Markdown Optimisation|
|ICAIO hire authorised. MLOps Engineer hire authorised.|
|ICustomer Data Platform workstream funded as AI foundation|

**Page 9** 

## **STAGE 3 — FOUNDATION** 

Building What Nobody Sees but Everything Depends On Months 3–6 | April – June 2025 

Sarah Chen joins as Chief AI Officer in April, hired from a Series C fintech where she built their ML platform from scratch. She has strong opinions and immediately has a constructive collision with Marcus over the ML platform stack. It is the most productive argument RetailCo has seen in years. 

I **09:30 | Monday 7 April 2025** I Architecture Studio, Floor 8 Attendees: Marcus (EA), Sarah Chen (CAIO), James I **CAIO Onboarding — EA Architecture Review** (Eng), Dr. Amara (Data Science) 

##### **Sarah Chen — CAIO** 

Marcus, I've read the readiness assessment. It's one of the most honest documents I've ever seen from an internal team. Most companies would have written a 60-slide deck about their AI ambitions instead. Where's the disagreement? I know there's one. 

##### **Marcus Webb — EA** 

The ML platform. James's proposal is SageMaker — native AWS, familiar to the team, lower operational complexity. My concern is vendor lock-in. If we build our feature store, model registry, and serving layer all inside SageMaker, we are dependent on AWS for every future AI capability. 

##### **Sarah Chen — CAIO** 

I'd push back on that. I've seen companies spend six months building a 'cloud-agnostic' ML platform that was so complex nobody could use it. At my last company, we built on managed services first, proved value, then abstracted what mattered. The MLOps Engineer hire isn't here yet. Amara is one person. Lock-in risk is theoretical. Productivity risk is immediate. 

##### **Dr. Amara Osei — Head of Data Science** 

I agree with Sarah. I need to get the demand forecasting pilot into production in four months. SageMaker gets me there. A bespoke platform gets me there in eight months if I'm lucky. 

##### **Marcus Webb — EA** 

Sarah — on one condition. We define the abstraction boundary now. The model serving layer is exposed as internal APIs — business systems call the models through a standard contract, not through SageMaker directly. That way, if we ever need to move the model to a different serving layer, we change one thing, not everything. 

##### **Sarah Chen — CAIO** 

That's the right call. API-first for model serving. Agreed. Now — Raj Patel. I hear he's the sceptic. Tell me about him. 

##### **Marcus Webb — EA** 

Raj runs Retail Operations. Forty-seven stores, 2,200 people. He's been at RetailCo for nineteen years. He's seen three 'digital transformation' programmes come and go. He's not anti-technology — he's anti-hype. He has a point. What do we do with him? 

##### **Sarah Chen — CAIO** 

We don't convert him. We co-opt him. Raj is going to be our pilot's business sponsor — he just doesn't know it yet. His team feels the pain of overstock every week. I want him in the pilot design session. Not as a stakeholder who gets a presentation — as someone whose operational knowledge shapes what we build. 

**Page 10** 

I _Marcus (internal): Sarah is exactly what this programme needed. She understands the technology at depth and she understands people. The SageMaker debate was healthy — and she was right about the productivity argument. The API-first serving layer is the EA guardrail that protects us from making an irreversible bet on a vendor. That's the governance win._ 

Over twelve weeks, three parallel workstreams run. Marcus governs all three, ensuring they stay coordinated. 

###### I **ARTIFACT: AI Foundation Architecture — Three Parallel Workstreams** 

AI-ARCH-001 | April–June 2025 

```
WORKSTREAM 1: MINIMUM VIABLE ML PLATFORM (Owner: James Owusu + MLOps Engineer hire)
Week 1–2: Provision AWS SageMaker Studio environment
```

```
Week 3–4: Deploy MLflow for experiment tracking and model registry
Week 5–6: Build feature store on AWS Feature Store for product/sales features
Week 7–8: Build model serving layer as internal REST API (API Gateway + Lambda)
Week 9–10: Deploy monitoring: model drift detection, prediction quality alerts
Week 11–12: Stress test, security review (Alan Brooks), EA architecture sign-off
GUARDRAIL: All models exposed as APIs — no direct SageMaker calls from business systems
WORKSTREAM 2: CUSTOMER DATA PLATFORM (Owner: Priya Nair)
```

```
Month 1: Identity resolution design — map Salesforce + Loyalty + Oracle customer entities
Month 2–3: Build unified customer profile in AWS Customer Data Platform
Month 4–5: Data quality scoring per customer record (completeness, recency, accuracy)
Month 6: Launch — unified customer entity available for AI feature engineering
METRIC: % of customers with a unified profile (target: 85% by Month 6)
WORKSTREAM 3: AI DATA PIPELINE (Owner: Dr. Amara Osei + Priya Nair)
```

```
Task 1: Index and process 4.2M customer service transcripts (NLP preprocessing)
Task 2: Build clean product/sales training dataset from Platform-X
Task 3: Define feature engineering standards and data quality gates for model training
Task 4: Build automated data quality checks — no model trains on dirty data
ARCHITECTURE PRINCIPLE: No model goes to production without passing data quality gate
```

The MLOps Engineer hire, Wei Zhang, starts in Week 4. He immediately spots a critical gap. 

I **16:00 | Wednesday 30 April 2025** I Engineering Hub 

##### **Wei Zhang — MLOps Engineer (new hire)** 

Marcus, Sarah — I've reviewed the SageMaker setup. One issue. Model monitoring. We have drift detection for input features — good. We don't have outcome monitoring. If our demand forecast is wrong by 20% for three weeks, there's no automated alert. A human would have to notice the overstock building up before anyone looks at the model. 

##### **Sarah Chen — CAIO** 

What's the Google pattern for this? 

**Wei Zhang — MLOps Engineer** 

**Page 11** 

Google's ML paper on 'Hidden Technical Debt in ML Systems' calls it 'undeclared consumers' and feedback loops. Netflix's Runway platform tracks every deployed model's actual outcomes against its predictions and fires an alert if business metrics diverge from model predictions. We need outcome metrics wired to model performance. Not just technical metrics — business metrics. 

##### **Marcus Webb — EA** 

Amara — for demand forecasting, what's the business metric that tells us the model is degrading? 

##### **Dr. Amara Osei — Head of Data Science** 

Overstock rate. If the model is predicting demand correctly, overstock should decline. If overstock starts climbing while the model says everything is fine — the model has drifted. We need a weekly correlation check: model predictions vs. actual stock levels. 

##### **Marcus Webb — EA** 

Wei — build that. Make it a standard component of the platform, not just for this model. Every model we ever deploy should have a paired business metric that tracks real-world outcome, not just prediction accuracy on a test set. 

##### **Wei Zhang — MLOps Engineer** 

That's the right call. I'll build it. Two weeks. 

I **Google (Hidden** _Monitor business outcomes, not just model accuracy. A model can have 92% test accuracy_ **Technical Debt in ML** _and still be causing harm in production if the real-world outcome metric is not tracked._ **Systems)** 

##### **Stage Outcomes** 

I AWS SageMaker ML Platform live — experiment tracking, model registry, feature store, model serving APIs 

I MLOps Engineer (Wei Zhang) onboarded — outcome monitoring framework built 

I Customer Data Platform workstream underway — Priya Nair leads 

I 4.2M customer service transcripts indexed and pre-processed 

I AI Architecture Principle established: no model in production without business outcome monitoring 

**Page 12** 

## **STAGE 4 — PILOT** 

The First Real AI in Production Months 7–10 | 

July – October 2025 

Demand forecasting / markdown optimisation is the pilot. Sarah has made Raj Patel the operational co-owner. He is suspicious, engaged, and increasingly invested. The first design session is unlike any meeting Marcus has run before. 

I **10:00 | Tuesday 1 July 2025** I Retail Operations Hub, Wembley 

Attendees: Marcus (EA), Sarah (CAIO), Dr. Amara (DS), I **Pilot Design Workshop — Demand Forecasting** Raj (Ops), Wei (MLOps) 

##### **Raj Patel — Head of Retail Operations** 

I'll be honest. I've seen companies spend millions on demand forecasting AI that the buying team ignores because they don't trust it. The buyers have been doing this for twenty years. They know their categories. What makes this different? 

##### **Sarah Chen — CAIO** 

Raj — what makes a buyer trust a recommendation? 

##### **Raj Patel — Head of Retail Operations** 

When it's right consistently. When they can see why it made the recommendation. And when there's an easy way to override it without fighting the system. 

##### **Sarah Chen — CAIO** 

Then those are our three design principles. Accuracy — we publish the model's error rate, transparently, every week. Explainability — every markdown recommendation includes the three data points that drove it. Buyer override — one click, no friction, no judgment. Amara, can we build those? 

##### **Dr. Amara Osei — Head of Data Science** 

Accuracy: yes, we'll track MAPE — Mean Absolute Percentage Error — weekly. Explainability: I'll use SHAP values to surface the top three features per recommendation — that's one more week of work but it's the right call. Override: that's a UI decision, not a model decision. 

##### **Raj Patel — Head of Retail Operations** 

If the model says mark down Men's Coats by 30% and tells my buyer it's because of the three-week weather forecast, last year's sell-through rate, and current weeks-of-cover — that's actually useful. That's what a very good analyst would tell them, but faster. 

##### **Marcus Webb — EA** 

Raj — that's the design. The AI is not replacing the buyer's judgement. It's giving them better analysis faster. The buyer makes the final decision. Always. 

##### **Raj Patel — Head of Retail Operations** 

Then I'm in. What do you need from my team? 

##### **Marcus Webb — EA** 

Two things. Access to your store managers for ground-truth validation — we need to check model recommendations against their local knowledge before we go live. And a champion in your buying team who will use the system for real for eight weeks before we call it live. 

##### **Raj Patel — Head of Retail Operations** 

Done. 

**Page 13** 

I **Amazon (AI Product** _The three conditions for business users to trust AI: accuracy they can verify, reasoning they_ **Design)** _can understand, and the ability to override without friction. Design for trust, not for impressiveness._ 

The pilot runs for ten weeks. Week 6 surfaces a near-critical failure — caught early because of Wei's outcome monitoring system. 

I **08:30 | Monday 18 August 2025** I Slack — #ai-model-alerts channel 

Wei Zhang posts in the team Slack at 8:31am: 'ALERT: Demand forecast model drift detected. Overstock rate for Homewares category has increased 12% in 2 weeks while model confidence remains HIGH. Possible data issue — investigating.' 

##### **Wei Zhang — MLOps Engineer** 

Found it. The seasonal adjustment feature was pulling from a table that was updated two weeks ago as part of a Platform-X maintenance release. The feature values changed but the model was trained on the old feature distribution. Classic data pipeline drift. The model was confidently wrong. 

##### **Dr. Amara Osei — Head of Data Science** 

How long would it have taken to catch this without the outcome monitoring? 

##### **Wei Zhang — MLOps Engineer** 

If a buyer hadn't noticed the overstock building — probably six to eight weeks. By then we'd have a significant stock problem in Homewares and Raj would have blamed the model. And he'd have been right. 

##### **Sarah Chen — CAIO** 

This is why outcome monitoring is non-negotiable. Wei — document this as an architecture decision. Every model we deploy gets a business outcome monitor before go-live. No exceptions. 

##### **Marcus Webb — EA** 

Sarah, I want this formalised as an AI governance principle in the EA standards. A model without outcome monitoring is not a production model — it is a prototype. Whatever its accuracy score says. 

I **REAL-WORLD FAILURE PATTERN: 80% of AI projects fail — twice the rate of non-AI IT projects (RAND Research). The most common cause is not algorithm quality but feedback loop blindness: models degrade silently because nobody is monitoring real-world outcomes.** 

The model goes live in full production in October, across 31 stores. Eight weeks later, the first results come in. 

u **EMAIL To: Sarah Chen (CAIO), Marcus Webb (EA), Diana Cole From: Dr. Amara Osei (Head of Data Science) (CDO), Raj Patel (Ops) Subject: Demand Forecasting Pilot — 8-Week Results | OVERSTOCK -24% | £840K Annualised Savings** 

**Page 14** 

Team, 8 weeks of production results for the demand forecasting model: OVERSTOCK RATE: -24% vs. same period last year (target was -20%) BUYER ADOPTION: 78% of markdown recommendations actioned by buyers (no override) BUYER OVERRIDE RATE: 22% (within expected range — model is learning from overrides) MAPE (accuracy): 14.2% (industry benchmark for retail demand forecasting: 15-20%) ANNUALISED SAVING: £840K (full 47-store rollout projection: £2.1M) Notable moment: Raj Patel's buying lead, who was the most sceptical person in the design workshop, used the model to recommend a 40% markdown on Winter Bedding last week. It sold through in 5 days. She told Raj: 'I've been doing this job for 14 years and I've never had analysis that fast.' We have a working AI product. Recommend scaling to all 47 stores and beginning design of the second use case. Amara 

##### **Stage Outcomes** 

I Demand forecasting model live in 31 stores — 8-week results: overstock -24%, £840K annualised 

I Buyer adoption 78% — explainability + override design drove trust (Raj Patel confirmed) 

I Data pipeline drift incident caught in Week 6 by outcome monitoring — avoided 6-8 week silent failure 

I Outcome monitoring established as non-negotiable EA architecture standard for all AI 

I Raj Patel converts from sceptic to champion — the highest-value outcome of the pilot 

**Page 15** 

## **STAGE 5 — SCALE** 

From One Model to an AI Platform Months 11–14 | November 2025 – February 2026 

The demand forecasting result creates momentum — and with it, a flood of AI requests from every corner of the business. Marketing wants a personalisation engine. Operations wants automated workforce scheduling. Finance wants an AI fraud detection system. The CISO wants to know who is authorising all of this. Sarah convenes a prioritisation session that nearly becomes a war. 

I **14:00 | Tuesday 4 November 2025** I Board Room B — AI Use Case Prioritisation 

#### I **AI Use Case Prioritisation — Full Leadership Team** 

Attendees: Sarah (CAIO), Marcus (EA), Diana (CDO), Raj, Karen, Alan, James, Amara 

##### **Sarah Chen — CAIO** 

We have fourteen AI use case requests from eight different business units. We have one and a half data scientists, one MLOps engineer, and a platform that is six months old. We can do two things properly or fourteen things badly. I have scored every request on business value, data readiness, and technical complexity. The top two by my scoring are: full-scale demand forecasting to all 47 stores, and a customer churn prediction model using the unified customer profile that Priya's team completes next month. 

##### **Alan Brooks — CISO** 

Before we go further — nobody has talked to me about the AI models we're planning to deploy against customer data. The churn prediction model — what data does it train on, where does it store predictions, who has access to model outputs, and how do we handle the right of erasure under GDPR when a customer's data has been used in training? 

##### **Sarah Chen — CAIO** 

Alan, those are exactly the right questions and I don't have all the answers today. That's why I want to propose an AI Governance Framework before we deploy any model against customer PII. Marcus — can you and Alan co-own that? 

##### **Marcus Webb — EA** 

Yes. Two weeks to draft the framework. No customer AI in production until it's approved. That's a gate. 

##### **Karen Mills — CFO** 

The churn prediction model. What's the business case? 

##### **Dr. Amara Osei — Head of Data Science** 

Our customer churn rate is 18% annually. Average customer lifetime value is £340. If we can reduce churn by 4 percentage points — which is realistic for a well-tuned model with good intervention tooling — that's £14.8 million in retained revenue annually. 

##### **Karen Mills — CFO** 

Fourteen point eight million. Approve it, subject to the governance framework Marcus mentioned. 

##### **Raj Patel — Head of Retail Operations** 

What about workforce scheduling? My store managers spend four hours every week on the rota. 

##### **Sarah Chen — CAIO** 

Raj — it's on the list for Month 15. Not because it isn't valuable but because we need the churn model first and the platform team cannot run three model development cycles simultaneously without quality degrading. I know that's frustrating. The honest answer is: AI value compounds. Nail churn, prove the pattern, then workforce scheduling gets a platform that already works. 

**Page 16** 

I **BCG AI@Scale** _Scaling AI is a sequencing problem, not a capacity problem. Trying to run too many use_ **(Deploy-Reshape-Invent** _cases simultaneously is the most common reason AI programmes fail to scale. BCG's_ **Framework)** _research: organisations that focus on 2-3 use cases achieve 4x the value of those spreading across 10+._ 

Marcus and Alan spend two weeks building the AI Governance Framework — an artefact that will shape every AI decision RetailCo makes for the next three years. 

###### I **ARTIFACT: AI Governance Framework — RetailCo** 

AIGOV-001 | November 2025 | v1.0 

```
PRINCIPLE 1: AI TRANSPARENCY
```

```
Every AI decision affecting customers or employees must be explainable on request.
Models using SHAP or LIME explainability required for any customer-facing AI.
```

```
PRINCIPLE 2: DATA PRIVACY & GDPR COMPLIANCE
```

```
No model trains on customer PII without a documented DPIA (Data Protection Impact Assessment)
Right to erasure: customer data deletion must propagate to model training sets within 30 days
Predictions derived from individual customer data classified as personal data under GDPR
PRINCIPLE 3: HUMAN OVERSIGHT
No automated AI decision with material impact on an individual without human review
All AI recommendations include confidence score and top-3 explanatory features
Override mechanism required for every model — buyer, store manager, or customer service agent
PRINCIPLE 4: MODEL GOVERNANCE
All models registered in the model registry before any production deployment
Business outcome monitor required — alert threshold defined before go-live
Monthly model review: accuracy, drift, bias audit, business metric correlation
Model retirement date set at deployment — default 12 months, reviewed at 10 months
PRINCIPLE 5: FAIRNESS & BIAS
Demographic parity audit required for any model affecting pricing, promotions, or access
Bias report published internally quarterly
PRINCIPLE 6: AI RISK CLASSIFICATION
```

```
Risk Level A (High): AI affecting employment, credit, legal matters — board approval required
Risk Level B (Medium): AI affecting customers individually — CAIO + CISO approval required
Risk Level C (Low): AI affecting business operations (demand, stock, routing) — CAIO approval
APPROVED BY: Sarah Chen (CAIO), Alan Brooks (CISO), Marcus Webb (EA), Diana Cole (CDO)
```

The churn model development runs into a problem that tests the governance framework almost immediately. 

I **11:00 | Friday 16 January 2026** 

I Architecture Studio 

**Dr. Amara Osei — Head of Data Science** 

**Page 17** 

Sarah, Marcus — we have a bias issue in the churn model. When I run the fairness audit, the model is predicting churn at a significantly higher rate for customers in certain postal codes — which, in our geography, correlates with lower-income demographics. The model isn't being told the postcode — it's inferring it from purchase patterns. It's a proxy variable problem. 

##### **Sarah Chen — CAIO** 

What's the business impact of that? 

##### **Dr. Amara Osei — Head of Data Science** 

The intervention programme — where we send retention vouchers — will disproportionately go to higher-income customers because the model thinks they're more 'worth saving'. Lower-income customers who are equally valuable will get fewer interventions because the model has inadvertently learned to deprioritise them. 

##### **Marcus Webb — EA** 

That's not just a fairness problem. That's a regulatory exposure. Our customer charter says we treat all customers equally. If this ended up in the press— 

##### **Alan Brooks — CISO** 

That's also a potential Equality Act issue. Amara — can you fix this? 

##### **Dr. Amara Osei — Head of Data Science** 

Yes. I can remove the proxy variables and retrain. It costs 2 to 3 percentage points of model accuracy. The model becomes slightly less predictive but it becomes fair. 

##### **Sarah Chen — CAIO** 

Then we do it. We never ship an unfair model because it's more accurate. Write this up as an AI governance incident — the first one. It's a good story, not a bad one: we found the bias before deployment, we fixed it, we documented it. That's what a mature AI organisation does. 

##### **Marcus Webb — EA** 

Sarah — I want this in the quarterly AI governance report to the board. Not buried. Led with. 'We found a bias issue and here is how our process caught it.' That builds trust. Hiding it destroys it. 

I **Deloitte Trustworthy** _Bias in AI is most dangerous when it comes from proxy variables — characteristics the_ **AI Framework (2025)** _model was never given but infers from patterns. Fairness audits must run before deployment, not after._ 

##### **Stage Outcomes** 

I AI prioritisation completed — 2 use cases selected (demand scaling + churn prediction) I AI Governance Framework (AIGOV-001) published and ratified by CDO, CAIO, CISO, EA I Churn model bias detected pre-deployment via fairness audit — proxy variable removed I Bias incident documented as AI Governance Incident GI-001 — reported to board I Demand forecasting scaled to all 47 stores — overstock reduction confirmed at -26% 

**Page 18** 

## **STAGE 6 — GOVERN** 

When the Board Discovers Generative AI 

Month 15 | March 2026 

It was inevitable. A board member has seen a competitor's ChatGPT-powered customer service demo. He wants RetailCo to deploy 'a ChatGPT' in six weeks. Sarah and Marcus take the call together. 

I **16:00 | Thursday 5 March 2026** I Video Call — Board Member Direct Escalation 

##### **Board Member (via Diana) — Board** 

Diana, I've seen what NovaMart is doing with generative AI for customer service. Their demo showed a chatbot that handles 40% of contacts without a human agent. I want us to have this live by summer. Can we get ChatGPT integrated in six weeks? 

##### **Diana Cole — CDO** 

I'll connect you with our CAIO and EA. Sarah, Marcus — over to you. 

##### **Sarah Chen — CAIO** 

Thank you for bringing this directly. Generative AI in customer service is absolutely on our roadmap — and I want to explain why it isn't a six-week project, and why that's actually good news. 

##### **Board Member — Board** 

Go on. 

##### **Sarah Chen — CAIO** 

The NovaMart demo you saw — that is the front-end. Behind it is 18 months of work: training data from their customer service transcripts, an integration layer connecting the AI to their order management and returns systems, human-in-the-loop for sensitive cases, a regulatory review because customer service AI touches consumer protection law, and a bias and hallucination testing framework. Six weeks buys you a demo. Not a production system. 

##### **Marcus Webb — EA** 

The other risk is hallucination. A generative AI model that tells a customer they'll receive a refund in 3 days, when our policy is 5 days, has just created a contractual obligation that's wrong. We have 4.2 million customer service transcripts that we have already processed. That is our training data advantage. But deploying generative AI responsibly takes four to six months. 

##### **Board Member — Board** 

What can you show me in six weeks? 

##### **Sarah Chen — CAIO** 

A working prototype demonstrating the use case on synthetic data, with an honest accuracy and hallucination rate report. And a production roadmap with month-by-month milestones. You'll see the technology works and you'll see the realistic timeline to make it safe. 

##### **Board Member — Board** 

Fair. Send me the roadmap. 

I _Marcus (internal): The GenAI pressure was always coming. The discipline was to not say no — to say 'here's what responsible deployment looks like and here's what you get if you rush it.' Sarah handled that brilliantly. The demo offer was smart — give the board something real to hold in six weeks while we protect the production timeline._ 

**Page 19** 

I **Accenture Total** _Generative AI in customer-facing roles requires: RAG (retrieval-augmented generation) to_ **Enterprise Reinvention** _ground responses in real data, hallucination testing, human-in-the-loop for edge cases, and_ **(2025)** _regulatory review. The demo-to-production gap is 4-6 months minimum for responsible enterprise deployment._ 

###### I **ARTIFACT: Responsible GenAI Deployment Framework — Customer Service AI** 

###### GENAI-ARCH-001 | March 2026 

```
USE CASE: AI-Assisted Customer Service (not full automation — augmentation first)
```

```
ARCHITECTURE: RAG (Retrieval-Augmented Generation)
```

```
Knowledge base: RetailCo policies, order/returns data (real-time via Platform-X API)
```

```
Foundation model: Claude (Anthropic) via API — NOT fine-tuned on customer PII
```

```
Grounding: Model MUST cite source policy before stating any customer commitment
```

```
Hallucination guardrail: Response validator checks factual claims against knowledge base
```

```
Confidence threshold: Responses below 85% confidence escalated to human agent
```

```
HUMAN-IN-THE-LOOP (mandatory for all Phase 1 deployment):
```

`AI drafts response` → `human agent reviews` → `human sends (or edits and sends)` 

```
Phase 2 (Month 6 post-launch): AI sends directly for confidence > 95% on defined intents
```

###### `TESTING REQUIREMENTS BEFORE GO-LIVE:` 

```
Hallucination rate: < 2% on production test set (1000 synthetic conversations)
```

```
Accuracy on known intents (returns, delivery, sizing): > 92%
```

```
Bias audit: demographic parity across customer segments
```

```
Regulatory review: Consumer Protection Act compliance — Legal sign-off required
```

###### `WHAT THIS IS NOT:` 

```
NOT a six-week project. NOT a ChatGPT plugin. NOT a replacement for agents.
Phase 1 launch target: August 2026 (5 months from now)
```

```
APPROVED: Sarah Chen (CAIO), Marcus Webb (EA), Alan Brooks (CISO)
```

##### **Stage Outcomes** 

I GenAI board pressure managed — responsible deployment roadmap approved I RAG architecture selected for customer service AI — hallucination guardrails defined I Human-in-the-loop mandated for Phase 1 — no autonomous customer commitments I GenAI prototype committed for 6-week board demo on synthetic data I Production launch target: August 2026 with Legal sign-off requirement 

**Page 20** 

## **STAGE 7 — CULTURE** 

Making AI Everyone's Responsibility Months 16–17 | April – May 2026 

The BCG advisor, Zara Okonkwo, challenges Marcus in a quarterly review session on a dimension he has not fully addressed: culture. The technology is working. The governance framework is in place. But only a small team of people understand what AI is doing at RetailCo. That is a fragility, not a strength. 

I **11:00 | Wednesday 8 April 2026** I Video Call — Quarterly BCG Review 

Attendees: Marcus (EA), Sarah (CAIO), Zara Okonkwo I **BCG Advisory Session — AI Culture & Adoption** (BCG X) 

##### **Zara Okonkwo — BCG X — AI Transformation Partner** 

Sarah, Marcus — the technical programme is impressive. Genuinely. The governance framework is better than most companies twice your size. My challenge is the 70. BCG's 10-20-70 rule. You have invested heavily in the 10 — the algorithm — and the 20 — the data and technology. But who at RetailCo, outside of your AI team, can explain what these models do, why they make their recommendations, and how to challenge them? 

##### **Sarah Chen — CAIO** 

Raj Patel's buying team. And the three store managers who were in the pilot. 

##### **Zara Okonkwo — BCG X** 

That's twelve people out of 2,200. The highest-performing AI companies we research — Amazon, Spotify, Google — they embed AI literacy across the organisation. Amazon has its 'Working Backwards' discipline. Spotify has 'Bets' — every team owns its AI metrics. Google has 'AI Principles' that every employee knows. The AI doesn't just live in the data science team. It lives in every role. What happens when Raj retires? What happens when the buyer who learned to trust the model leaves? You need the culture to outlast the individuals. 

##### **Marcus Webb — EA** 

What does that look like practically for a retailer? 

##### **Zara Okonkwo — BCG X** 

Four things. An AI literacy baseline for every manager — not a two-day course, a sustained programme with real use cases. An 'AI champion' in every business unit — a person who understands the models, advocates for good AI practice, and flags issues before they become governance problems. AI metrics embedded in team OKRs — not just the data science team's OKRs. And a regular 'AI town hall' where Marcus or Sarah explains to the whole company what the AI is doing, what it got wrong, and what is next. Transparency builds the culture. 

##### **Sarah Chen — CAIO** 

Marcus — the AI champions programme. Can that sit inside the EA governance structure? 

##### **Marcus Webb — EA** 

Yes. I'll model it on the Solution Architect network we have for the technology programme. One AI champion per major business unit — nominated by the unit head, trained by Amara's team, given access to the model monitoring dashboards. They become the early warning system for model drift in the business context that the monitoring tool misses. 

I **BCG 10-20-70 Rule** _70% of AI value comes from people, culture, and adoption. The most common reason AI_ **(Closing the AI Impact** _programmes plateau after early wins: the capability lives in a small specialist team instead_ **Gap, 2025)** _of being embedded across the organisation._ 

**Page 21** 

Marcus drafts the AI Champions Programme. He presents it at an all-hands meeting the following week — the first time the full RetailCo team hears about the AI programme from a face they trust. 

I **10:00 | Friday 24 April 2026** I RetailCo All-Hands — 'AI at RetailCo' Town Hall 

##### **Marcus Webb — EA** 

Good morning everyone. I've been your Enterprise Architect for eleven years. You know me as the person who occasionally stops a technology project and makes everyone frustrated. Today I want to tell you what your company has been building with AI for the last sixteen months — what it is, what it isn't, what went wrong, and what is coming next. 

##### **Marcus Webb — EA** 

Sixteen months ago, we had zero production AI. Today we have a demand forecasting model running in every one of our 47 stores. It has reduced our overstock by 26%. That means we are buying less of what we can't sell and spending less money on markdowns. In the last quarter, it saved us £730,000. That money is real. It came from a machine learning model and from Raj Patel's buying team trusting it enough to use it. 

##### **Marcus Webb — EA** 

I want to be honest with you about what went wrong too. Six weeks into the pilot, our model quietly started making bad predictions because a data change in our systems changed the inputs it was trained on. Our monitoring system caught it. If it hadn't, we would have had an overstock problem for weeks before anyone noticed. That is not a failure. That is a system working as designed. 

##### **Marcus Webb — EA** 

The AI is not here to replace buyers or store managers or customer service agents. I want to say that plainly because I know some of you are worried about it. The model tells Raj's buyers what to discount and why. The buyer makes the decision. Always. The AI doesn't fire anyone — it frees people from spending four hours on a problem a computer can solve in four seconds so they can do the four hours of work that only a human can do. 

##### **Raj Patel — Head of Retail Operations** 

I'll say this directly. I was the biggest sceptic in this room sixteen months ago. I've been in retail for nineteen years. I've seen technology promises come and go. This one is different. Not because the technology is clever — because the people who built it listened to us first, built something we could understand and override, and showed us the results every week. That's why my team uses it. 

##### **Stage Outcomes** 

I AI Champions Programme launched — one AI champion per business unit (12 total) 

I AI literacy baseline programme: all managers to complete by Q3 2026 

I AI metrics added to business unit OKRs — not just data science team 

I First AI Town Hall: 340 employees attended, highest all-hands engagement in 3 years 

I Raj Patel formally named AI Champion for Retail Operations 

**Page 22** 

## **STAGE 8 — MEASURE** 

What AI-First Actually Looks Like at Month 18 Month 18 | June 2026 

Eighteen months. Marcus compiles the AI Transformation Review — the most important document he has written in his career. He presents it to the board with Sarah. Not a PowerPoint. A data report. 

###### I **ARTIFACT: AI Transformation Review — 18-Month Report** 

AIREV-2026-001 | June 2026 

###### `EXECUTIVE SUMMARY` 

```
RetailCo launched its AI transformation from a position of zero production AI in January 2025.
```

```
18 months later, the organisation operates three production AI systems, has a functioning
```

```
ML platform, a published AI Governance Framework, and a measurable cultural shift.
```

###### `AI READINESS SCORE: BEFORE vs NOW` 

```
January 2025: 2.1/5 | June 2026: 3.8/5 (Industry avg mature retailers: 3.4)
```

###### `PRODUCTION AI SYSTEMS` 

`1. Demand Forecasting / Markdown Optimisation (live October 2025)` 

```
Overstock reduction: -26% | Annual saving: £2.1M
Buyer adoption: 81% | Model accuracy (MAPE): 13.6%
```

`2. Customer Churn Prediction (live March 2026)` 

```
Churn rate reduction: -3.8pp (from 18% to 14.2%)
```

```
Retained customer revenue (annual): £12.2M
```

```
Bias incident: caught pre-deployment, documented, resolved — GI-001
```

`3. Customer Service AI — GenAI Prototype (demo complete, production Aug 2026)` 

```
Hallucination rate in testing: 1.4% (target < 2%) — approved for Phase 1
```

###### `INFRASTRUCTURE` 

```
ML Platform: SageMaker-based — 47 models registered (3 production, 44 experimental)
```

```
Feature Store: 312 reusable features across 8 domains
```

```
Model monitoring: 100% of production models with outcome monitors — 0 silent failures
```

`TALENT (January 2025` → `June 2026)` 

`Data Scientists: 1` → `4 | MLOps Engineers: 0` → `2 | CAIO: hired Month 3 AI Champions: 0` → `12 (one per business unit)` 

```
AI Literacy training completion: 68% of managers (target: 100% by Q3 2026)
```

###### `GOVERNANCE` 

```
AI Governance Framework: AIGOV-001 — published, ratified, operationally active
```

```
Governance incidents: 1 (GI-001 — bias, caught pre-deployment)
```

```
AI risk assessments completed: 14 | Rejected for deployment: 3
```

###### `FINANCIAL SUMMARY` 

```
Total 18-month investment: £3.1M
```

**Page 23** 

```
Measurable AI-attributed value: £14.3M (Year 1 annualised)
```

```
ROI: 361% | Payback period: 5 months
```

###### `WHAT WE LEARNED` 

`1. Data foundation before models — always. We spent 6 months on this. Worth it.` 

`2. MLOps before data scientists. The bottleneck is never the algorithm.` 

`3. The sceptic is your best ally. Raj Patel made the pilot credible.` 

`4. Outcome monitoring is not optional. Silent model failure is real.` 

`5. Bias is a proxy variable problem. Fairness audits must run before deployment.` 

`6. GenAI needs a RAG architecture and human-in-the-loop. Demo` ≠ `production.` 

`7. 70% of value is culture. Town halls, champions, and OKRs embed AI in the org.` 

###### `WHAT COMES NEXT` 

```
Month 19: Customer Service GenAI — Phase 1 live (Aug 2026)
```

```
Month 21: Workforce scheduling AI (Raj Patel's request — finally)
```

```
Month 24: AI-powered personalisation (Customer Data Platform now complete)
Year 3 target: AI Readiness Score 4.5/5 | 'AI Future-Built' by BCG definition
```

I **09:00 | Tuesday 2 June 2026** I Board Room A — 18-Month Review 

##### **Diana Cole — CDO** 

Marcus, eighteen months ago you told this board our AI readiness score was 2.1 out of 5. You told us it would take thirty-six months to be a mature AI organisation. You told us not to rush. The board was impatient. I was impatient. What would have happened if we had rushed? 

##### **Marcus Webb — EA** 

We would have hired five data scientists into an environment with no ML platform. Their models would have sat in notebooks for twelve months. Two of them would have left. We would have deployed a customer AI model that had a bias problem we didn't catch because we didn't have a governance framework. The £2.8 million demand forecasting result would have taken three years instead of ten months because we would have spent eighteen months untangling a data mess we built on top of. I have seen it happen at other organisations. The ones who rushed spent the same money for a fraction of the value. 

##### **Board Chair — Board** 

What's your honest view of where we are versus NovaMart? 

##### **Sarah Chen — CAIO** 

Fourteen months ago, NovaMart had a 31% overstock advantage over us. Today, our overstock reduction is 26% — we are within 5 percentage points of their lead model after ten months in production versus their eighteen. Our governance framework is stronger than theirs — they had a press incident in February about an AI pricing decision that appeared to discriminate by postcode. We caught the same problem before deployment. Our ML platform has 312 reusable features — that is a compounding asset. Every new model we build is faster to develop because the features are already there. We are not AI-first yet. But we are on the right trajectory. 

##### **Marcus Webb — EA** 

The final thing I'll say. NovaMart built their AI fast. We built ours right. Fast and right are not the same thing. The organisations I've seen build fast — without the data foundation, without the MLOps platform, without the governance — are now rebuilding. At twice the cost. We didn't do that. 

**Page 24** 

##### **Stage Outcomes** 

I 18-month AI Transformation ROI: 361% — £3.1M invested, £14.3M annualised value I AI Readiness Score: 2.1 → 3.8 (above industry average of 3.4) I 3 production AI systems — demand forecasting, churn prediction, GenAI prototype I AI Governance Framework operational — bias incident caught pre-deployment I Cultural shift confirmed: 12 AI Champions, 68% manager AI literacy, town hall programme 

**AI-FIRST TRANSFORMATION TRANSCRIPT  |  RETAILCO  |  ZERO TO AI-FIRST Page 25** 

### **EPILOGUE — WHAT THE JOURNEY ACTUALLY TEACHES** 

Marcus sits at his desk on a Thursday evening in June 2026. The Datadog dashboard is green. The demand forecast model has just correctly predicted that Women's Swimwear would outperform the buying team's estimate by 18% — the buyer acted on it, ordered 20% more stock, and sold out in a week. The first time that has ever happened. He opens a new document and writes the lessons he wishes he had known eighteen months ago. 

#### **The 10 Lessons — Distilled from Consultancy Research & Real Experience** 

|**McKinsey Rewired**|The six capabilities — roadmap, talent, operating model, technology, data, adoption<br>— are not sequential. They must be built in parallel. But data before models is the<br>one sequence that is truly non-negotiable.|
|---|---|
|**BCG 10-20-70 Rule**|Invest 70% of your energy in people, process, and adoption. The algorithm is the<br>easy part. Getting Raj Patel's buying team to trust the model was harder than<br>building it.|
|**Netflix / Spotify**|Build the ML platform before you scale the data science team. The Runway platform<br>at Netflix, Kubeflow at Spotify — infrastructure before scientists. Models in<br>notebooks are not AI.|
|**Google (Hidden Debt)**|Monitor business outcomes, not just model accuracy. A model can be 94% accurate<br>and silently causing harm. The overstock rate is the truth. The test set accuracy is<br>just a proxy.|
|**Amazon**|Design for trust, not impressiveness. Explainability, accuracy transparency, and a<br>frictionless override mechanism are worth more than 3 percentage points of model<br>accuracy.|
|**Accenture**|Generative AI needs a RAG architecture and human-in-the-loop for Phase 1. The<br>gap between the demo and production is 4-6 months of responsible engineering, not<br>a weekend.|
|**Deloitte Trustworthy AI**|Bias is a proxy variable problem. Run fairness audits before deployment, not after.<br>The reputational damage of deploying a biased model is not recoverable with a<br>press statement.|
|**BCG / McKinsey / All**|The sceptic in the room is your most valuable ally. Win Raj Patel and you win the<br>programme. Bypass him and you build something nobody uses.|
|**All consultancies + EA**<br>**practice**|The architecture job is to be the person who asks the uncomfortable question at the<br>right moment. Not to block — to protect the organisation from building fast on rotten<br>foundations.|
|**RetailCo's own journey**|PwC's 2026 survey: 56% of CEOs realised neither revenue nor cost benefits from<br>AI. The difference between them and RetailCo is not the technology. It is the<br>honesty of the assessment and the patience to build it right.|

**_"The companies that rushed AI got a demo. The companies that built it right got a business."_**
