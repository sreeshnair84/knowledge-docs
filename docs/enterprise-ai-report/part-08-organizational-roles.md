---
title: "Part 8 — Organizational Roles, RACI & Career Paths"
date_created: 2026-07-14
last_reviewed: 2026-07-14
status: current
source_type: native-md
source_file: ""
tags: ["organizational-roles", "raci", "chief-ai-officer", "ai-engineer", "mlops", "agentops", "career-path"]
doc_type: research-report
covers_version: "as of 2026-07-14"
---

# Part 8 — Organizational Roles, RACI & Career Paths

> **Report Context:** Part 8 of the [Enterprise AI Research Report](./index). Covers all AI organizational roles — responsibilities, RACI, skills, career paths, KPIs, and certifications — for every role from Chief AI Officer to AI Auditor.

---

## The AI Talent Landscape (2026)

The AI talent landscape has fragmented dramatically from the single "Data Scientist" archetype of 2018. By 2026, a mature enterprise AI function spans 20+ distinct roles across strategy, engineering, operations, governance, and business.

**Key trends (Gartner, 2025; LinkedIn Workforce Report, 2025):**
- Demand for LLMOps and AgentOps engineers grew 340% year-on-year in 2025
- Prompt Engineer demand peaked in 2024 and is stabilising as the skill embeds into adjacent roles
- Context Engineer and Knowledge Engineer are emerging as distinct professions
- Responsible AI Officer is now a Board-level appointment in 35% of Fortune 500 companies
- AI Product Manager commands a 25–40% salary premium over traditional PM roles

---

## Role Definitions

### Chief AI Officer (CAIO)

**Level:** C-Suite  
**Reports to:** CEO (most common), CTO, or Board  
**Team size:** 5–15 direct reports; owns indirect team of 50–500+

#### Responsibilities
- Define and own the enterprise AI strategy and roadmap
- Build and operate the AI operating model (see [Part 2](./part-02-operating-models))
- Represent AI at Board and executive level; manage AI risk at enterprise level
- Own the responsible AI programme and ethics framework
- Govern AI investment portfolio; secure funding and headcount
- Drive AI culture change across the enterprise
- Manage relationships with major AI vendors (OpenAI, Anthropic, AWS, Azure, Google)
- Report on AI value delivered and risk managed to Board

#### Skills Required
| Skill Category | Examples |
|----------------|----------|
| Strategic | AI strategy, portfolio management, business case development |
| Technical | Deep understanding of ML, GenAI, Agentic AI architectures |
| Leadership | Executive presence, board communication, organisational change |
| Governance | AI ethics, EU AI Act, NIST AI RMF, responsible AI |
| Financial | AI ROI, FinOps, budget management, chargeback models |
| Commercial | Vendor management, partnership negotiation |

#### KPIs
- Enterprise AI ROI ($ value attributed to AI)
- AI use cases in production (growth rate)
- AI talent headcount and retention rate
- Responsible AI incidents (target: zero high-severity)
- AI maturity level progression (annual assessment)
- Board confidence score in AI strategy

#### Career Path
Senior AI Architect / VP AI → SVP / Head of AI → CAIO

#### Certifications
- No single certification; combination: MBA or equivalent + deep technical AI background
- Emerging: AI Leadership (MIT, Stanford Executive Education)
- Board-relevant: IIA AI Risk Governance Certificate

---

### AI Product Manager

**Level:** Senior Individual Contributor / Manager  
**Reports to:** Head of AI Products, Chief Product Officer, or CAIO  
**Team size:** Leads a cross-functional pod of 5–12

#### Responsibilities
- Own the AI product roadmap: prioritise features, define success metrics
- Translate business needs into AI product specifications
- Define evaluation criteria and acceptance thresholds for AI outputs
- Manage product lifecycle from discovery through retirement
- Conduct user research to understand AI adoption barriers
- Work with AI architects to assess technical feasibility
- Manage AI product budget and track ROI
- Own product-level responsible AI review

#### Skills Required
- Product management fundamentals (roadmap, OKRs, user stories)
- AI literacy: understand LLMs, RAG, agents, evaluation, limitations
- Data analysis: interpret model metrics, usage analytics, cost data
- Stakeholder management: bridge business, engineering, and governance
- UX intuition: design AI interactions that build user trust

#### KPIs
- Product adoption rate (% target users active monthly)
- Feature NPS / user satisfaction with AI features
- Time-to-market for AI features
- AI feature ROI (measured value delivered vs. cost)
- Evaluation score (pass rate of AI outputs against defined quality thresholds)

#### Career Path
PM → Senior PM → Principal PM (AI) → Head of AI Products → CPO

#### Certifications
- Certified Product Manager (AIPMM)
- Product School AI Product Manager course
- Anthropic Partner Certification (for Claude-based products)

---

### AI Architect

**Level:** Senior / Principal / Distinguished  
**Reports to:** Chief Architect, CAIO, or CTO  
**Team size:** Technical lead (no direct reports at IC level) or leads architecture guild

#### Responsibilities
- Design end-to-end AI system architectures: from data ingestion to inference to monitoring
- Define AI reference architectures and patterns for the enterprise
- Evaluate AI platforms, frameworks, and vendors against enterprise requirements
- Lead architecture reviews for AI solutions (ARB representation)
- Design multi-agent orchestration architectures (MCP, A2A)
- Own non-functional requirements: scalability, resilience, security, cost
- Mentor AI architects across the enterprise
- Bridge technical AI capability and enterprise architecture frameworks (TOGAF, Zachman)

#### Architecture Domains
| Domain | Key Focus Areas |
|--------|----------------|
| Application Architecture | Agent systems, RAG pipelines, LLM integrations |
| Data Architecture | Knowledge engineering, vector stores, data lineage |
| Security Architecture | Zero trust for AI, agent identity, MCP security |
| Integration Architecture | MCP, A2A, REST/gRPC, event streaming |
| Infrastructure Architecture | GPU platforms, inference serving, autoscaling |
| Governance Architecture | Policy engines, audit trails, observability |

#### Skills Required
- Deep ML/GenAI/Agentic AI technical knowledge
- Enterprise architecture frameworks (TOGAF, BIAN for banking)
- System design: distributed systems, scalability patterns
- Security architecture (zero trust, identity, encryption)
- Cloud platforms: AWS, Azure, GCP AI services
- Soft skills: ARB presentation, stakeholder communication

#### KPIs
- Architecture review throughput (designs reviewed per quarter)
- Technical debt introduced by approved designs (low target)
- Reuse rate of reference architectures
- Architecture risk incidents (designs that caused production issues)

#### Career Path
Senior Engineer → Solutions Architect → AI Architect → Principal AI Architect → Distinguished Architect / Fellow

#### Certifications
- AWS Certified Machine Learning Specialty
- Google Professional ML Engineer
- Azure AI Engineer Associate
- TOGAF 10 (enterprise architecture foundation)
- Anthropic Partner Certification

---

### AI Platform Engineer

**Level:** Mid / Senior / Staff  
**Reports to:** Head of AI Platform Engineering  
**Team size:** Works in platform team of 10–50+

#### Responsibilities
- Build and operate internal AI platform components (inference, embedding, evaluation, observability)
- Design and implement AI service APIs (developer experience)
- Implement AI gateway, routing, and load balancing
- Build cost metering and chargeback infrastructure
- Automate model onboarding and deployment pipelines
- Implement platform security controls (PII detection, content moderation, access control)
- Manage GPU cluster provisioning and scheduling
- Define and enforce SLAs for platform services

#### Skills Required
- Cloud platforms (AWS Bedrock, Azure AI Foundry, GCP Vertex AI)
- Container orchestration (Kubernetes, EKS, AKS, GKE)
- AI serving frameworks (Triton, TorchServe, vLLM, SGLang)
- API design and developer experience
- Observability (OpenTelemetry, Prometheus, Grafana)
- Cost management (AI FinOps tooling)
- Security (SPIFFE/SPIRE, OPA, secrets management)

#### KPIs
- Platform availability (target: 99.9%+)
- p95 inference latency
- Cost per 1K tokens (optimisation trend)
- Developer adoption rate (teams using the platform)
- Mean time to onboard new model

#### Career Path
Backend Engineer → Platform Engineer → AI Platform Engineer → Staff Platform Engineer → Principal Platform Engineer

---

### AI Engineer

**Level:** Mid / Senior  
**Reports to:** AI Tech Lead, AI Architect, or AI Product Manager  
**Team size:** Member of a product/feature pod

#### Responsibilities
- Implement AI features: RAG pipelines, LLM integrations, agent workflows
- Prompt engineering and prompt optimisation
- Build evaluation pipelines to test AI output quality
- Implement guardrails and safety controls at the feature level
- Integrate AI capabilities with existing application code
- Monitor AI feature performance in production
- Debug AI failures (hallucinations, retrieval failures, tool errors)

#### Skills Required
- Python (primary), TypeScript/JavaScript
- LLM APIs (Anthropic, OpenAI, Google, Bedrock)
- RAG frameworks (LlamaIndex, LangChain, Haystack)
- Agent frameworks (LangGraph, CrewAI, Claude Agent SDK)
- Evaluation tools (RAGAS, TruLens, DeepEval)
- SQL and data manipulation
- Vector databases (Pinecone, Weaviate, pgvector)

#### KPIs
- AI feature quality score (eval pass rate)
- Time-to-production for AI features
- Hallucination rate (target: <1% for production features)
- Retrieval precision and recall metrics

#### Career Path
Software Engineer → AI Engineer → Senior AI Engineer → Staff AI Engineer / AI Architect

---

### Prompt Engineer

**Level:** Mid / Senior  
**Reports to:** AI Tech Lead, AI Product Manager, or Context Engineer  
**Team size:** Often embedded in product team; sometimes in central AI CoE

#### Responsibilities
- Design, write, and iterate system prompts for AI features
- Conduct structured prompt evaluations (A/B testing, regression testing)
- Manage prompt library: versioning, approval, retirement
- Document prompt design rationale and constraints
- Collaborate with AI Product Managers on specification
- Train domain experts to write effective prompts
- Monitor prompt performance in production (drift, degradation)

#### Note on Role Evolution
The standalone Prompt Engineer role is evolving. By 2026, prompt engineering skill is increasingly embedded in AI Engineer and Context Engineer roles. Some enterprises retain specialist Prompt Engineers for complex, high-stakes systems (legal, medical, financial).

#### Skills Required
- Deep understanding of LLM behaviour, tokenisation, context windows
- Writing clarity and precision
- Structured evaluation methodology
- Python for evaluation scripting
- Familiarity with multiple model families (GPT, Claude, Gemini)

#### Career Path
Technical Writer / Copywriter / BA → Prompt Engineer → Senior Prompt Engineer → Context Engineer / AI Engineer

---

### Context Engineer

**Level:** Senior / Staff  
**Reports to:** AI Architect or Head of Knowledge Engineering  
**Team size:** Specialist role; often 1–3 per large AI programme

#### Responsibilities
- Design the context architecture for AI systems (what information the model sees, in what format, in what order)
- Optimise chunking strategies, context window utilisation, and token budgets
- Design retrieval strategies: dense retrieval, sparse retrieval, hybrid, re-ranking
- Implement context compression, summarisation, and dynamic context selection
- Define metadata schemas for filterable, high-precision retrieval
- Measure and improve retrieval quality (hit rate, MRR, NDCG)
- Design conversation history management and context persistence

#### Skills Required
- Information retrieval theory (BM25, dense retrieval, re-ranking)
- Embedding models and semantic similarity
- Context window management and token optimisation
- Knowledge graph fundamentals
- Vector database internals (HNSW, IVF, quantisation)
- Evaluation metrics for retrieval systems

#### Career Path
ML Engineer / Software Engineer → Context Engineer → Senior Context Engineer → Principal Context Engineer / AI Architect

---

### Knowledge Engineer

**Level:** Mid / Senior  
**Reports to:** Head of Knowledge Engineering or AI Architect  
**Team size:** Part of knowledge engineering team (3–15 people)

#### Responsibilities
- Design and build enterprise knowledge bases and document pipelines
- Define ontologies, taxonomies, and knowledge graphs
- Manage document lifecycle: ingest, process, version, expire, retire
- Implement document processing pipelines (OCR, parsing, metadata extraction)
- Curate knowledge quality: identify gaps, duplicates, outdated content
- Govern knowledge access: RBAC on knowledge sources
- Maintain knowledge freshness: automated refresh pipelines
- Monitor knowledge coverage and identify retrieval blind spots

#### Skills Required
- Knowledge representation: ontology languages (OWL, RDF), knowledge graphs (Neo4j)
- Document processing: OCR (Tesseract, Azure Form Recogniser), PDF/DOCX parsing
- NLP: entity extraction, coreference resolution, document classification
- Data engineering: Airflow, Spark, streaming pipelines
- Search systems: Elasticsearch, OpenSearch

#### Career Path
Data Engineer / Information Architect → Knowledge Engineer → Senior Knowledge Engineer → Principal Knowledge Engineer

---

### ML Engineer

**Level:** Mid / Senior  
**Reports to:** ML Tech Lead or Data Science Manager  
**Team size:** Part of ML team (5–20+)

#### Responsibilities
- Implement end-to-end ML pipelines from data to production model
- Feature engineering: design, implement, and maintain feature stores
- Model training: distributed training, hyperparameter optimisation
- Model packaging and serving: containerisation, API endpoints
- Performance optimisation: inference latency, throughput, cost
- Model versioning and registry management
- Collaborate with data scientists on experiment operationalisation

#### Skills Required
- Python, PyTorch/TensorFlow
- Feature stores (Feast, Tecton, Databricks Feature Store)
- ML platforms (SageMaker, Vertex AI, Azure ML, Kubeflow)
- Distributed computing (Spark, Dask, Ray)
- Containerisation (Docker, Kubernetes)
- Model serving (Triton, TorchServe, FastAPI)

---

### MLOps Engineer

**Level:** Mid / Senior  
**Reports to:** MLOps Lead or Platform Engineering Manager  
**Team size:** Part of MLOps / AI Platform team

#### Responsibilities
- Build and maintain CI/CD pipelines for ML models
- Implement automated training triggers (schedule, drift detection, data freshness)
- Manage model registry (MLflow, SageMaker Model Registry)
- Implement model monitoring: data drift, concept drift, performance degradation
- Automate model rollback and canary deployment procedures
- Manage experiment tracking infrastructure
- Implement data versioning (DVC, Delta Lake)

#### Skills Required
- DevOps fundamentals (Git, CI/CD, Docker, Kubernetes)
- ML platforms (MLflow, Kubeflow, SageMaker Pipelines)
- Monitoring (Evidently AI, WhyLabs, Arize)
- Programming (Python, Bash)
- IaC (Terraform, CDK)

---

### LLMOps Engineer

**Level:** Mid / Senior  
**Reports to:** AI Platform Lead or LLMOps Manager  
**Team size:** Emerging specialisation; typically 2–8 per large enterprise

#### Responsibilities
- Manage LLM deployment pipelines: model versioning, blue/green deployments
- Implement prompt versioning and A/B testing infrastructure
- Build cost tracking and optimisation tooling (token counting, model routing, caching)
- Manage LLM observability: tracing, latency, quality metrics
- Implement rate limiting, fallback routing, and resilience patterns
- Manage fine-tuning pipelines (PEFT, LoRA, QLoRA)
- LLM security: prompt injection detection, PII filtering, content moderation

#### Skills Required
- LLM ecosystem: OpenAI, Anthropic, Bedrock, Azure OpenAI
- Observability: LangFuse, Helicone, LangSmith, Arize
- Cost management: token budgeting, model routing (LiteLLM, OpenRouter)
- Caching: semantic caching (GPTCache), Redis
- Fine-tuning: PEFT, LoRA, QLoRA frameworks

---

### AgentOps Engineer

**Level:** Mid / Senior / Staff  
**Reports to:** Agent Platform Lead or AI Platform Manager  
**Team size:** Newest specialisation; 1–5 in most enterprises

#### Responsibilities
- Deploy and operate production AI agents
- Implement agent health monitoring: task completion rate, tool failure rate, loop detection
- Manage agent fleet: versioning, scaling, rollback, emergency shutdown
- Build agent simulation environments for pre-production testing
- Implement HITL (Human-in-the-Loop) workflows: escalation triggers, approval queues
- Manage agent identity and authorisation (SPIFFE, OAuth, Entra ID)
- Incident response for agent failures, runaway loops, unintended actions
- Maintain agent lifecycle documentation

#### Skills Required
- Agent frameworks (LangGraph, CrewAI, Claude Agent SDK, AWS Strands)
- MCP and A2A protocols
- Distributed systems and fault tolerance
- Identity and authorisation (SPIFFE/SPIRE, OAuth 2.0)
- Observability (OpenTelemetry, agent-specific tracing)
- On-call incident response experience

---

### AI Security Engineer

**Level:** Senior / Staff  
**Reports to:** CISO, AI Security Lead, or AI Platform Security Lead  
**Team size:** Dedicated AI security team (2–10) or embedded in security team

#### Responsibilities
- Threat model AI systems (MITRE ATLAS, OWASP LLM Top 10)
- Conduct AI red-teaming exercises: adversarial prompt testing, jailbreak testing
- Implement AI security controls: input validation, output filtering, PII detection
- Secure the AI supply chain: model provenance, SBOM for AI
- Design and enforce agent authorisation policies
- Monitor for AI-specific security incidents (prompt injection, data exfiltration)
- Conduct AI vendor security assessments
- Define and enforce AI security standards and policies

#### Skills Required
- AI/ML security fundamentals (adversarial ML, prompt injection)
- Application security (OWASP, penetration testing)
- Identity and access management (OAuth, OIDC, SPIFFE)
- Threat modelling (STRIDE, MITRE ATT&CK, MITRE ATLAS)
- Cloud security (AWS, Azure, GCP security services)
- AI red-teaming tools and methodologies

---

### AI Governance Officer

**Level:** Senior / Manager  
**Reports to:** Chief Compliance Officer, General Counsel, or CAIO  
**Team size:** Part of governance team (2–10)

#### Responsibilities
- Implement and maintain the AI governance framework
- Run AI governance forums, review boards, and approval workflows
- Manage AI use case registration and risk classification
- Coordinate regulatory compliance: EU AI Act, NIST AI RMF, ISO 42001
- Develop and maintain AI policies, standards, and guidelines
- Train employees on AI governance requirements
- Track and report governance KPIs to leadership and board
- Maintain AI governance audit trail

#### Skills Required
- Regulatory knowledge: EU AI Act, GDPR, NIST AI RMF, ISO 42001
- Risk management frameworks (COSO, ISO 31000)
- Policy writing and process design
- Stakeholder management (legal, compliance, business, technology)
- AI literacy: sufficient to assess AI use cases for risk classification

---

### Responsible AI Officer

**Level:** Director / VP  
**Reports to:** CAIO, Chief Ethics Officer, or Board Committee  
**Team size:** Leads Responsible AI team (3–15)

#### Responsibilities
- Own the enterprise Responsible AI strategy and programme
- Define fairness, bias, transparency, and explainability standards
- Lead AI ethics reviews for high-risk deployments
- Represent the organisation externally on AI ethics and safety
- Design and run AI red-teaming and adversarial testing programmes
- Engage with regulators on responsible AI matters
- Develop responsible AI training and awareness programme
- Report responsible AI status to Board

#### Skills Required
- AI ethics: fairness, accountability, transparency, explainability
- Policy and regulatory expertise (EU AI Act, IEEE Ethics Guidelines)
- Research skills (quantitative and qualitative)
- Stakeholder engagement: board, regulators, media, civil society
- Technical AI literacy: sufficient to evaluate algorithmic fairness claims

---

### AI Auditor

**Level:** Senior / Manager  
**Reports to:** Head of Internal Audit or Chief Compliance Officer  
**Team size:** Part of internal audit team (1–5 AI auditors)

#### Responsibilities
- Conduct independent audits of AI systems against governance standards
- Assess model risk: accuracy, bias, robustness, explainability
- Review AI governance processes: documentation, approval workflows, monitoring
- Evaluate AI security controls: access management, data protection
- Issue audit findings and track remediation
- Coordinate with external AI auditors (ISO 42001, regulatory)
- Maintain AI audit methodology and tools

---

### AI Risk Officer

**Level:** Senior / Director  
**Reports to:** Chief Risk Officer  
**Team size:** Part of enterprise risk team (1–5 AI risk specialists)

#### Responsibilities
- Identify, assess, and monitor AI-specific risks (model risk, operational risk, conduct risk)
- Maintain AI risk register and risk appetite statements
- Develop AI risk quantification frameworks (model risk ratings, agent risk scores)
- Escalate material AI risks to CRO and Board
- Coordinate with AI Governance Officer on control frameworks
- Assess AI risks in third-party and vendor relationships

---

### AI Business Analyst

**Level:** Mid / Senior  
**Reports to:** AI Product Manager, Business Programme Manager, or AI Delivery Lead  
**Team size:** Embedded in delivery teams

#### Responsibilities
- Elicit and document AI use case requirements from business stakeholders
- Facilitate opportunity identification workshops
- Document current-state process flows; identify AI automation opportunities
- Define acceptance criteria and evaluation benchmarks for AI solutions
- Bridge between business stakeholders and technical AI teams
- Support business change and adoption of AI solutions
- Measure and report business value realised from AI deployments

---

### AI Consultant

**Level:** Senior / Manager / Principal (consulting context)  
**Reports to:** Engagement Manager or Consulting Director  
**Team size:** Part of client engagement team (3–20)

#### Responsibilities
- Lead AI strategy and operating model engagements for clients
- Diagnose client AI maturity; design target operating model
- Develop business cases for AI investment
- Design and facilitate AI opportunity identification workshops
- Deliver AI governance framework design
- Support AI vendor selection and contract negotiation
- Guide AI programme delivery and change management
- Thought leadership: publications, conference presentations, client education

---

## Master RACI Matrix

### AI Delivery RACI (by Phase and Role)

| Phase | CAIO | AI PM | AI Architect | AI Engineer | ML Engineer | LLMOps | AgentOps | Context Eng | Knowledge Eng | RAI Officer | AI Gov Officer | Security Eng |
|-------|------|-------|-------------|-------------|-------------|---------|----------|-------------|---------------|-------------|----------------|-------------|
| **Strategy** | A | C | C | I | I | I | I | I | I | C | C | I |
| **Opportunity ID** | A | R | C | I | I | I | I | I | I | C | C | I |
| **Business Case** | A/R | R | C | I | I | I | I | I | I | C | C | I |
| **Prioritisation** | A | R | C | I | I | I | I | I | I | C | C | I |
| **Discovery** | I | A | R | C | C | I | I | C | C | C | C | C |
| **Data Assessment** | I | A | R | C | R | I | I | C | R | C | C | C |
| **Architecture** | I | C | R/A | C | C | C | C | C | C | C | C | C |
| **RAI Review** | I | C | C | I | I | I | I | I | I | R/A | R | C |
| **Security Review** | I | I | C | I | I | I | I | I | I | C | C | R/A |
| **Model Selection** | I | A | R | C | R | C | I | C | I | C | C | I |
| **Prompt Design** | I | A | C | R | I | C | I | C | I | C | I | I |
| **Context Eng** | I | I | C | C | I | I | I | R/A | C | I | I | I |
| **Knowledge Eng** | I | I | C | C | I | I | I | C | R/A | C | I | I |
| **Agent Design** | I | A | R | C | I | I | C | C | C | C | C | C |
| **Tool Design** | I | C | R | R | I | I | C | I | I | C | C | C |
| **Evaluation** | I | A | C | R | R | R | R | C | C | C | C | C |
| **Pilot** | I | A | C | R | R | R | R | C | C | C | C | C |
| **Production** | I | A | C | C | C | R | R | I | C | C | C | C |
| **Continuous Learning** | I | A | C | R | R | R | R | C | C | C | C | I |
| **Retirement** | I | A | C | R | C | R | R | I | C | C | R | C |

**Key:** R = Responsible, A = Accountable, C = Consulted, I = Informed

---

## Governance RACI

| Decision | CAIO | AI Gov Officer | RAI Officer | AI Risk Officer | AI Auditor | Business Owner | Legal/Compliance |
|----------|------|----------------|-------------|-----------------|------------|----------------|-----------------|
| **AI Strategy Approval** | R | C | C | C | I | C | I |
| **Use Case Risk Classification** | I | R/A | C | C | I | C | C |
| **High-Risk AI Approval** | A | R | R | R | I | C | R |
| **Model Onboarding** | I | R/A | C | C | I | I | I |
| **Prompt Approval** | I | R/A | C | I | I | C | I |
| **Agent Approval** | A | R | R | R | I | C | C |
| **Emergency Shutdown** | A | C | C | C | I | R | I |
| **Vendor Approval** | A | C | C | C | I | C | R |
| **Audit Response** | A | R | C | C | C | C | C |
| **Incident Response** | A | R | C | R | C | I | C |
| **Policy Update** | A | R | C | C | I | I | R |

---

## Career Pathways

```
Foundation Track (Individual Contributor → Technical Leadership)
─────────────────────────────────────────────────────────────
Junior AI Engineer → AI Engineer → Senior AI Engineer
    → Staff AI Engineer → Principal AI Engineer → Distinguished Engineer/Fellow

Specialisation Branches:
    AI Engineer → Prompt Engineer → Context Engineer
    AI Engineer → Knowledge Engineer
    ML Engineer → MLOps Engineer → LLMOps Engineer → AgentOps Engineer
    Software Engineer → AI Platform Engineer → Staff Platform Engineer
    Solutions Architect → AI Architect → Principal AI Architect

Product Track
─────────────────────────────────────────────────────────────
PM → AI Product Manager → Senior AI PM → Principal AI PM → Head of AI Products → CPO

Strategy / Consulting Track
─────────────────────────────────────────────────────────────
BA → AI Business Analyst → AI Consultant → Senior AI Consultant
    → AI Strategy Lead → Head of AI Strategy → CAIO

Governance Track
─────────────────────────────────────────────────────────────
Compliance Analyst → AI Governance Analyst → AI Governance Officer
    → Responsible AI Officer → Chief Responsible AI Officer

Risk Track
─────────────────────────────────────────────────────────────
Risk Analyst → AI Risk Analyst → AI Risk Officer → CRO (AI-specialised)

Security Track
─────────────────────────────────────────────────────────────
Security Engineer → AI Security Engineer → Principal AI Security Engineer → CISO (AI-fluent)
```

---

## Skills by Maturity Level

| Role | Level 1–2 Needs | Level 3–4 Needs | Level 5–6 Needs |
|------|----------------|-----------------|-----------------|
| CAIO | AI vision, buy-in | Portfolio management, ROI | Constitutional AI, sovereign AI |
| AI Architect | RAG, LLM integration | Agent design, multi-agent | Autonomous enterprise patterns |
| AI Engineer | Prompt eng, RAG | Agents, MCP | ADLC mastery |
| MLOps/LLMOps | CI/CD for models | LLM deployment, cost | AgentOps, fleet management |
| AI Gov Officer | Policy writing | Risk classification, RAI review | Constitutional governance |
| RAI Officer | Bias basics, EU AI Act | Red-teaming, fairness at scale | Constitutional AI, democratic AI |

---

## Certifications Reference

| Certification | Provider | Relevant Roles |
|--------------|----------|---------------|
| AWS Certified Machine Learning Specialty | AWS | ML Engineer, AI Architect |
| AWS Certified AI Practitioner | AWS | All roles |
| Google Professional ML Engineer | Google | ML Engineer, AI Architect |
| Google Professional Cloud Architect | Google | AI Architect, Platform Engineer |
| Azure AI Engineer Associate (AI-102) | Microsoft | AI Engineer, AI Architect |
| Azure AI Fundamentals (AI-900) | Microsoft | All roles |
| Anthropic Partner Certification (CCAF) | Anthropic | AI Engineer, AI Architect, AI PM |
| TOGAF 10 | Open Group | AI Architect, Enterprise Architect |
| CIPP/E (GDPR) | IAPP | AI Gov Officer, RAI Officer |
| CDMP (Data Management) | DAMA | Knowledge Engineer |
| IBM AI Ethics Fundamentals | IBM | RAI Officer, AI Gov Officer |
| DeepLearning.AI Specialisations | Coursera | All technical roles |
| ISO 42001 Lead Implementer | Various | AI Gov Officer, RAI Officer |
| NIST AI RMF Practitioner | NIST/ISACA | AI Risk Officer, AI Gov Officer |

---

## Salary Benchmarks (Global Enterprise, 2026)

| Role | Junior | Mid | Senior | Principal/Director |
|------|--------|-----|--------|--------------------|
| AI Engineer | $100–130K | $130–170K | $170–220K | $220–300K |
| ML Engineer | $110–140K | $140–180K | $180–240K | $240–320K |
| LLMOps Engineer | $120–150K | $150–190K | $190–250K | $250–320K |
| AgentOps Engineer | $130–160K | $160–200K | $200–260K | $260–340K |
| AI Architect | $150–180K | $180–230K | $230–290K | $290–400K |
| AI Product Manager | $120–150K | $150–190K | $190–250K | $250–340K |
| CAIO | — | — | — | $350K–$1M+ |
| RAI Officer | $100–130K | $130–170K | $170–230K | $230–320K |
| AI Platform Engineer | $110–140K | $140–180K | $180–230K | $230–300K |

*Ranges vary significantly by geography, industry, and company size. US tech company premiums apply.*

---

## Related Resources

- [Part 2 — Enterprise AI Operating Models](./part-02-operating-models) — Operating model context for each role
- [EA OKR KPI Research](../enterprise-architecture/specialization/EA_OKR_KPI_Research) — KPI frameworks for EA and AI roles
- [AI Engineer Question Bank](../interview-prep/AI_Engineer_Question_Bank) — Interview questions per role
- [Enterprise AI Skills Assessment](../enterprise-architecture/ai-architecture/enterprise-ai-skills-assessment) — Skills gap analysis tool
- [EA Masterclass](../ea-masterclass/index) — Development programme for AI architects and leaders
