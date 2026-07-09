---
title: "Part 14 — Industry Case Studies"
date_created: 2026-07-09
last_reviewed: 2026-07-09
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cybersec-architect"]
---

# Part 14 — Industry Case Studies

**Audience:** Enterprise architects, CISOs, and consultants advising organisations in regulated and critical-infrastructure industries on AI security strategy.

**Related:**
[Overview](index.md) |
[AI Governance](08-ai-governance.md) |
[Technology Investment](10-technology-investment.md) |
[Use Case Transcript](usecase-transcript.md)

> **Current as of July 2026.** Ten industry profiles covering security priorities, regulatory drivers, AI adoption patterns, attack scenarios, and recommended architecture patterns.

---

## 1. Financial Services

### Security Priorities
- Fraud detection and prevention
- Regulatory compliance (PCI DSS, DORA, MiFID II, GDPR, local banking regulations)
- Third-party and supply chain risk
- Insider threat prevention
- Operational resilience (24/7 availability)

### Regulatory Drivers
- **DORA (Digital Operational Resilience Act)**: Mandatory for EU financial entities since Jan 2025. Requires ICT risk management, incident reporting, and digital resilience testing. AI systems in critical/important functions subject to DORA oversight.
- **PCI DSS v4.0**: Any AI system processing payment card data is in PCI scope.
- **ECB/EBA guidance**: AI in credit decisioning subject to explainability requirements.
- **GDPR**: Customer data in AI training and inference requires legal basis and data subject rights fulfilment.

### AI Adoption Patterns
- AI-powered fraud detection (real-time transaction scoring)
- AI customer service agents (loan queries, account support)
- AI-assisted compliance monitoring (AML, sanctions screening)
- AI code generation for internal development teams
- AI-powered risk modelling and credit scoring

### Common Attack Scenarios
| Scenario | Threat | Impact |
|---|---|---|
| Deepfake CEO fraud | Synthetic voice/video impersonation | Wire transfer fraud; executive reputation |
| AI-assisted phishing | LLM-generated personalised phishing at scale | Credential theft; account takeover |
| Fraud model poisoning | Corrupt training data to reduce fraud detection accuracy | Increased fraud losses |
| API abuse via AI | Automated extraction of sensitive customer data | Regulatory breach; data exfiltration |
| Ransomware on AI infrastructure | Encrypt AI model and data stores | Operational disruption; recovery costs |

### Recommended Architecture Patterns
- Private AI deployment (sensitive customer data; regulatory data residency)
- AI gateway with PII masking (before any data reaches LLM)
- AI-generated content disclosure (EU AI Act Article 50 — AI-generated content must be labelled)
- Secure MCP server for internal tool integration (no agent credential storage)
- DORA-compliant AI resilience testing (quarterly AI system failure simulation)

### KPIs
- Fraud detection rate maintained or improved post-AI adoption
- AI model explainability score for credit decisions (auditor requirement)
- Time to detect AI-assisted fraud attack: < 15 minutes
- DORA incident reporting SLA: < 4 hours for significant ICT incidents

---

## 2. Healthcare

### Security Priorities
- Patient data protection (PHI/PII)
- Medical device security
- Ransomware resilience (hospitals are top ransomware targets)
- Clinical AI explainability and safety
- Third-party medical software risk

### Regulatory Drivers
- **HIPAA (US)**: PHI in AI training/inference requires BAA with AI vendors; patient rights for AI-generated decisions
- **EU MDR (Medical Device Regulation)**: AI in medical decision support classified as medical device; CE marking required
- **FDA AI/ML Action Plan**: Clinical AI subject to FDA oversight and continuous monitoring requirements
- **NIS2**: Healthcare as essential service; cybersecurity requirements and incident reporting

### AI Adoption Patterns
- AI-assisted clinical decision support (diagnosis, treatment recommendation)
- AI radiology (imaging analysis)
- AI patient communication (appointment scheduling, symptom triage)
- AI revenue cycle management
- AI drug discovery and clinical trial optimisation

### Common Attack Scenarios
| Scenario | Threat | Impact |
|---|---|---|
| Ransomware on EHR | Encrypt patient records | Clinical operations disruption; patient safety risk |
| AI diagnostic poisoning | Corrupt training data → misdiagnosis | Patient harm; regulatory sanctions |
| PHI exfiltration via AI | Patient data submitted to public AI → breach | HIPAA violation; regulatory fines |
| Medical device hijack | AI-controlled infusion pump or dosing device exploited | Direct patient harm |
| Third-party AI compromise | Clinical AI vendor breached | Supply chain exposure of patient data |

### Recommended Architecture Patterns
- HIPAA-compliant private AI deployment (PHI never leaves organisation's environment)
- Clinical AI governance board (physician and ethics review before AI clinical deployment)
- AI model validation framework (clinical validation alongside security testing)
- Human oversight for all AI-assisted clinical decisions (AI as assistant, not autonomous decision-maker)
- Ransomware-resilient architecture (isolated backups; immutable storage; rapid recovery)

### KPIs
- PHI exposure incidents via AI: target zero
- Clinical AI model accuracy maintained within approved thresholds
- Ransomware recovery time objective: < 4 hours for critical clinical systems
- AI clinical decision explainability: 100% of high-risk decisions with logged rationale

---

## 3. Government

### Security Priorities
- National security data protection
- Citizen data privacy
- Supply chain security for AI and technology
- AI in public service delivery (fairness, transparency, accountability)
- Critical infrastructure protection

### Regulatory Drivers
- **US Executive Orders on AI**: Mandatory risk assessments and human oversight for high-impact AI in federal use
- **EU AI Act**: Government AI in law enforcement, public services, and benefits systems classified high-risk
- **FedRAMP (US)**: Cloud services for federal use require FedRAMP authorization; AI services included
- **FISMA**: Federal information systems (including AI) subject to NIST SP 800-53 controls
- **UK Government AI Framework**: Transparency, accountability, and fairness requirements for public sector AI

### AI Adoption Patterns
- AI-powered citizen service chatbots (benefits, permits, queries)
- AI-assisted regulatory review and document processing
- AI fraud detection for government benefit programmes
- AI-assisted intelligence analysis
- AI-powered predictive maintenance for public infrastructure

### Common Attack Scenarios
| Scenario | Threat | Impact |
|---|---|---|
| Nation-state AI model poisoning | Corrupt government AI training data | Policy manipulation; misinformation |
| AI-generated disinformation | Synthetic content to undermine public trust | Democratic process manipulation |
| Adversarial attack on benefit AI | Manipulate benefit eligibility decisions | Financial harm to citizens; legal liability |
| AI system bias exploitation | Discriminatory AI outcome as attack vector | Legal challenge; reputational damage |
| Classified data in AI training | Sensitive government data in AI training inadvertently exposed | National security breach |

### Recommended Architecture Patterns
- Classified/unclassified separation: AI systems strictly segregated by classification level
- Explainable AI for citizen-facing decisions (audit trail; right to explanation)
- Bias and fairness testing before deployment for any citizen-affecting AI
- Supply chain attestation: AI models used by government must have verified provenance
- Air-gapped AI for classified workloads

### KPIs
- Bias testing pass rate: 100% before deployment
- Explainability documentation: 100% of citizen-impact AI decisions
- Supply chain verification: 100% of AI models with AIBOM
- Security clearance for AI operators: appropriate level matched to data sensitivity

---

## 4. Defence

### Security Priorities
- Classified information protection at all clearance levels
- AI in weapons systems governance (lethal autonomous weapons)
- Adversarial AI robustness (AI systems resistant to nation-state adversaries)
- Supply chain integrity for defence AI
- Allied information sharing with appropriate access controls

### Regulatory Drivers
- **DoD AI Ethics Principles (US)**: Responsible, equitable, traceable, reliable, governable
- **NATO AI Principles**: Human control; responsible use; accountability
- **UK MoD AI Ethics Framework**: Human oversight for AI in lethal applications
- **ITAR/EAR (US)**: Export control implications for AI systems with defence applications
- **CMMC (Cybersecurity Maturity Model Certification)**: Required for US defence contractors; AI systems in scope

### AI Adoption Patterns
- AI-assisted intelligence analysis (ISR)
- AI-assisted cyber operations (automated threat hunting, faster attribution)
- AI in logistics and supply chain optimisation
- AI-powered autonomous systems (drones, unmanned vehicles) — with human oversight requirements
- AI training and simulation for personnel

### Common Attack Scenarios
| Scenario | Threat | Impact |
|---|---|---|
| AI model inversion | Reconstruct classified training data from AI model | Intelligence breach |
| Adversarial inputs to AI vision | Fool AI object recognition to misidentify targets | Mission failure; civilian casualties |
| AI C2 disruption | Attack AI decision-support systems during operations | Operational paralysis |
| Trusted insider AI abuse | Security-cleared insider uses AI to exfiltrate intelligence | Classified data leak |
| Supply chain AI backdoor | Defence contractor AI tools with nation-state backdoors | Persistent compromise |

### Recommended Architecture Patterns
- Air-gapped AI: no internet connectivity for classified AI workloads
- Hardware-verified model integrity: TPM attestation for model weights on classified systems
- Human control for autonomous weapons systems: AI as decision support only; human pulls trigger
- Cross-domain solutions: validated data transfer between classification levels
- Red team at classification level: AI red team with appropriate clearance

### KPIs
- Adversarial robustness score: AI systems tested against ATLAS TTPs
- Human oversight coverage: 100% for lethal or irreversible decisions
- Classification boundary violations: zero tolerance
- CMMC Level 3 compliance: all AI systems in defence contractor environments

---

## 5. Retail & E-Commerce

### Security Priorities
- Payment card data protection (PCI DSS)
- Customer data privacy (GDPR, CCPA)
- Fraud prevention (account takeover, payment fraud)
- Bot attack mitigation
- Supply chain security for retail AI platforms

### Regulatory Drivers
- **PCI DSS v4.0**: All AI systems in payment processing scope
- **GDPR/CCPA**: Customer data used for AI personalisation requires appropriate legal basis
- **EU AI Act**: AI product recommendation and pricing systems may require transparency obligations

### AI Adoption Patterns
- AI personalisation and recommendation engines
- AI-powered customer service (chatbots, returns, queries)
- AI pricing and inventory optimisation
- AI fraud detection at checkout
- AI-powered marketing (content generation, audience targeting)

### Common Attack Scenarios
| Scenario | Threat | Impact |
|---|---|---|
| AI-assisted account takeover | LLM generates personalised credential stuffing attacks | Customer account compromise; fraud |
| Bot abuse of AI chat | Bots abuse AI customer service for fraud or competitive intelligence | Revenue loss; competitive harm |
| Personalisation model poisoning | Corrupt recommendation model to promote specific products | Revenue manipulation |
| AI-generated fake reviews | Synthetic reviews to manipulate product rankings | Regulatory action; brand damage |
| PCI scope expansion via AI | AI system inadvertently processes cardholder data → expanded PCI scope | Compliance cost; audit finding |

### Recommended Architecture Patterns
- AI gateway with PCI scope isolation (AI systems outside PCI scope by design)
- Bot detection at AI interaction layer
- AI content authenticity (labelling AI-generated reviews, product descriptions)
- Fraud model continuous monitoring and drift detection

---

## 6. Manufacturing

### Security Priorities
- Operational Technology (OT) / ICS security
- AI in industrial control systems safety
- Intellectual property protection (design files, process data)
- Supply chain security

### Regulatory Drivers
- **IEC 62443**: OT security standard for industrial automation
- **NIS2**: Manufacturers classified as important entities in EU
- **NIST CSF**: Framework applied to manufacturing OT environments
- **EU Cyber Resilience Act**: Connected product security requirements

### AI Adoption Patterns
- AI predictive maintenance (equipment failure prediction)
- AI quality inspection (vision-based defect detection)
- AI production optimisation
- AI-assisted design and engineering
- Autonomous robotics with AI decision-making

### Common Attack Scenarios
| Scenario | Threat | Impact |
|---|---|---|
| OT ransomware | Encrypt industrial control systems | Production shutdown; safety incident |
| AI quality inspection poisoning | Defeat vision inspection → defective products ship | Product recall; safety liability |
| IP theft via AI | Use AI tools to exfiltrate design files | Competitive harm; trade secret loss |
| Robot hijacking | AI-controlled robot reprogrammed for harm | Worker safety incident |

### Recommended Architecture Patterns
- IT/OT network separation (AI systems for OT must not bridge to IT network without controls)
- Secure AI for quality inspection (model integrity verification; anomaly detection on vision model outputs)
- IP data governance for AI tools (CAD/design files classified as restricted; DLP controls)

---

## 7. Telecommunications

### Security Priorities
- Network infrastructure protection
- Subscriber data privacy
- 5G network security (including AI in 5G RAN and core)
- Lawful interception compliance
- DDoS resilience

### Regulatory Drivers
- **NIS2**: Telcos are essential entities; stringent requirements
- **GDPR**: Subscriber CDR (call detail records) and location data are personal data
- **ETSI/3GPP 5G Security**: AI in 5G networks must meet 3GPP security standards
- **Lawful interception**: AI-powered communications analysis subject to lawful intercept compliance

### AI Adoption Patterns
- AI network optimisation (traffic routing, capacity planning)
- AI in 5G RAN (AI-driven beam management, interference mitigation)
- AI fraud detection (toll fraud, SIM swap, subscription fraud)
- AI customer experience (churn prediction, personalised offers)
- AI-powered NOC (network operations centre) automation

### Common Attack Scenarios
| Scenario | Threat | Impact |
|---|---|---|
| AI network management compromise | Compromise AI that manages core network | Service disruption at scale |
| SS7/Diameter attacks enhanced by AI | AI-assisted protocol exploitation for subscriber tracking | Privacy breach; national security |
| AI-assisted telecom fraud | LLM-powered scam calls and SMS fraud at scale | Subscriber harm; brand damage |
| CDR exfiltration via AI | AI accesses subscriber records without authorisation | GDPR breach; regulatory fine |

---

## 8. Energy & Utilities

### Security Priorities
- Critical national infrastructure (CNI) protection
- OT/SCADA security for power grid, pipelines, water
- AI safety in automated control systems
- Insider threat prevention

### Regulatory Drivers
- **NERC CIP**: North American power grid cybersecurity standards
- **NIS2**: Energy sector as essential entity
- **EU Cybersecurity Act**: Critical infrastructure requirements
- **IEC 62351**: Security for power system communications

### AI Adoption Patterns
- AI grid optimisation and load balancing
- AI predictive maintenance for turbines, transformers, pipelines
- AI-powered smart meter analytics
- AI demand forecasting
- AI in autonomous substations

### Common Attack Scenarios
| Scenario | Threat | Impact |
|---|---|---|
| AI grid management attack | Compromise AI controlling power distribution | Regional power outage |
| AI sensor spoofing | Feed false readings to AI monitoring pipeline health | Undetected infrastructure failure |
| Ransomware on AI control systems | Encrypt OT AI platforms | Grid instability; operational shutdown |
| Deepfake in crisis communication | Fake executive communication during outage | Panic; stock manipulation |

---

## 9. Pharmaceuticals

### Security Priorities
- Clinical trial data integrity
- Drug development IP protection
- Regulatory submission security (FDA, EMA)
- Manufacturing quality system integrity

### Regulatory Drivers
- **FDA 21 CFR Part 11**: Electronic records and signatures in regulated environments
- **ICH E9 (R1)**: Statistical principles for clinical trials (AI in analysis must meet)
- **EMA AI in Clinical Trials guidance** (2025): Requirements for AI-assisted clinical analysis
- **GDPR/HIPAA**: Patient data in clinical trials

### AI Adoption Patterns
- AI drug discovery (molecular generation, protein structure prediction)
- AI clinical trial design and patient selection
- AI-assisted clinical data analysis
- AI adverse event detection and pharmacovigilance
- AI manufacturing quality control

---

## 10. Aviation

### Security Priorities
- Safety-critical systems integrity (DO-178C, DO-254)
- ATC (Air Traffic Control) system protection
- Passenger data protection
- Supply chain integrity (avionics software)

### Regulatory Drivers
- **EASA AI Roadmap 2.0**: Framework for AI in aviation; safety assurance requirements
- **FAA AI Certification**: Emerging guidance for AI in type-certified aircraft systems
- **ICAO Cybersecurity**: Global aviation cybersecurity framework
- **GDPR**: Passenger PII in airline AI systems

### AI Adoption Patterns
- AI in flight operations (fuel optimisation, route planning, weather routing)
- AI-assisted ATC (traffic flow management, conflict detection)
- AI predictive maintenance (aircraft health monitoring)
- AI passenger experience (personalisation, disruption management)
- AI safety analysis (hazard identification in safety assessments)

### Common Attack Scenarios
| Scenario | Threat | Impact |
|---|---|---|
| AI ATC manipulation | Compromise AI supporting ATC decisions | Aviation safety incident |
| AI maintenance system poisoning | False maintenance predictions → undetected fault | Safety incident; operational disruption |
| Passenger data AI breach | AI reservation system exposes PII at scale | GDPR breach; passenger harm |
| AI in avionics supply chain compromise | Malicious AI component in aircraft software | Safety-critical system compromise |

### Recommended Architecture Patterns
- DO-178C/DO-254 safety assurance extended to AI components in airborne systems
- Air-gapped AI for ATC and safety-critical systems
- AI model determinism requirements for certified applications (some AI approaches incompatible with airworthiness standards)
- Separate safety-critical and operational AI systems architecturally
