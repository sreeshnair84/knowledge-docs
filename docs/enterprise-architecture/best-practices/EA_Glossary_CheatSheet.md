---
title: "ENTERPRISE ARCHITECTURE Glossary & Cheat Sheet"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "EA_Glossary_CheatSheet.pdf"
doc_type: guide
tags: ["enterprise-architecture"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---
# **ENTERPRISE ARCHITECTURE Glossary & Cheat Sheet**

Distinguished Architect / CTO / Chief AI Architect Edition

300+ Terms · Regulation Quick Reference · PQC Migration Guide AI Security Threat Map · Identity Patterns · Interview Frameworks DORA Compliance Checklist · EU AI Act Tier Guide · Distinguished vs. Principal Signals

Companion to: Volume 1 (EA Foundations) · Volume 2 (Delta: Emerging Topics) · Volume 3 (CTO & AI) Targeting: Microsoft · Google · JPMorgan · Goldman Sachs · Barclays · HSBC · Visa · ServiceNow

#### **TABLE OF CONTENTS**

- G Glossary (A–Z)

- 300+ terms covering: AI, Security, Identity, Cloud, EA Frameworks, Regulations, Protocols

- G Cheat Sheet 1 — Regulatory Quick Reference

- DORA, EU AI Act, SR 11-7, GDPR, PCI-DSS, BCBS 239, NIS2, CSRD

- G Cheat Sheet 2 — Post-Quantum Cryptography Guide

- Current standards, vulnerable algorithms, migration targets, NIST FIPS status

- G Cheat Sheet 3 — DORA Compliance Checklist

  - All DORA requirements with architecture controls and evidence required

- G Cheat Sheet 4 — EU AI Act Tier Guide

  - Risk categories, key obligations, penalties, architecture implications

- G Cheat Sheet 5 — Cloud Architecture Patterns

  - 8 essential patterns with components and when-to-use guidance

- G Cheat Sheet 6 — AI Security Threat Map

  - 11 AI-specific threats with attack vectors, defences, and detection signals

- G Cheat Sheet 7 — Identity & Access Patterns

  - 8 identity patterns with standards, use cases, and token structures

- G Cheat Sheet 8 — Interview Frameworks

  - 9 essential frameworks with structure and common pitfalls

- G Cheat Sheet 9 — Distinguished Architect Signals

  - 10 behaviour dimensions: Principal vs. Distinguished comparison

### **GLOSSARY**

*Key terms used across all four volumes. Color coding: Security/Risk Architecture/Platform Identity/Protocol Governance/Framework Operations/SRE AI/ML Financial/Cloud*

|**A**<br>**ABAC**|Attribute-Based Access Control. Authorisation policy where access decisions are based<br>on attributes of the user, resource, and environment rather than predefined roles.|
|---|---|
|**ADR**|Architecture Decision Record. A short document capturing an architecture decision, its<br>context, the options considered, and the rationale for the choice made.|
|**AES-256**|Advanced Encryption Standard with 256-bit key. Symmetric block cipher —<br>quantum-resistant. Preferred encryption standard for data at rest.|
|**AIOps**|Artificial Intelligence for IT Operations. Using ML to automate IT operations tasks:<br>anomaly detection, root cause analysis, and autonomous remediation.|
|**API Economy**|Business model where APIs are treated as products that enable third-party<br>development, monetisation, and ecosystem creation.|
|**API Gateway**|Entry point for all API traffic that enforces: authentication, authorisation, rate limiting,<br>routing, transformation, and observability.|
|**ARB**|Architecture Review Board. Governance body that reviews and approves significant<br>architecture decisions and proposals.|
|**Async API**|AsyncAPI specification. Open standard for defining event-driven, message-based APIs<br>— the OpenAPI equivalent for asynchronous systems.|
|**B**||
|**BCBS 239**|Basel Committee Banking Supervision Principle 239. Regulation governing risk data<br>aggregation and risk reporting capabilities for systemically important banks.|
|**BIAN**|Banking Industry Architecture Network. Framework of standardised banking service<br>domains and service operations for financial services interoperability.|
|**Blast Radius**|The maximum scope of damage from a security incident or system failure. Architectural<br>goal: minimise blast radius through isolation, segmentation, and least privilege.|
|**BCP**|Business Continuity Plan. Plan ensuring critical business functions can continue during<br>and after a disaster.|
|**Build vs. Buy**|Architecture decision framework: should a capability be built in-house (differentiation,<br>control) or purchased (speed, commodity)?|
|**C**<br>**C2PA**|Coalition for Content Provenance and Authenticity. Standard for cryptographically<br>signing AI-generated content to verify its origin.|
|**CAIO**|Chief AI Officer. Executive responsible for enterprise AI strategy, governance, and<br>deployment.|
|**CIAM**|Customer Identity and Access Management. Identity platform managing external<br>customer identities, authentication, and consent.|

**Circuit Breaker**

**CloudEvents**

**CMDB Conway's Law CRQC CSRD CVE CycloneDX**

Design pattern that prevents cascading failures by stopping calls to a failing dependency after a failure threshold is exceeded.

CNCF specification standardising the structure of events generated by cloud services — enables portability across event brokers.

Configuration Management Database. Repository of all IT assets (hardware, software, services) and their relationships.

Observation by Melvin Conway: organisations design systems that mirror their own communication structure. Architectural implication: the org chart determines the architecture.

Cryptographically Relevant Quantum Computer. A quantum computer powerful enough to break current public-key cryptography (RSA, ECDSA). Estimated arrival: 2028-2031.

Corporate Sustainability Reporting Directive. EU directive mandating large companies report on environmental, social, and governance factors including technology carbon emissions (from 2025).

Common Vulnerabilities and Exposures. Standardised list of publicly known software vulnerabilities. CVSS score 0-10 quantifies severity.

OWASP SBOM standard. Machine-readable format for Software Bill of Materials — widely adopted alongside SPDX.

## **D**

**Data Mesh DAST DCR DORA (Software)**

**DORA (EU) DP-SGD**

**DTO**

Architectural pattern where data ownership and quality responsibility is distributed to domain teams, with a central data platform providing self-service infrastructure.

Dynamic Application Security Testing. Security testing method that tests a running application from outside, simulating real attacks.

Disaster Recovery. Processes and technologies for restoring IT systems and data after a major failure or disaster.

DORA (DevOps Research and Assessment). Research programme identifying four key metrics of software delivery performance: Deployment Frequency, Lead Time, MTTR, Change Failure Rate.

EU Digital Operational Resilience Act. Regulation mandating operational resilience for EU financial institutions: ICT risk management, third-party risk, incident reporting, resilience testing. In force 2025.

Differentially Private Stochastic Gradient Descent. Training algorithm that adds calibrated noise to gradients to prevent training data memorisation and limit data poisoning impact.

Digital Twin of the Organisation. A live, computable model of the enterprise — systems, capabilities, costs, risks, dependencies — enabling real-time scenario analysis.

## **E**

**ECDSA**

**EDA**

Elliptic Curve Digital Signature Algorithm. Current standard for digital signatures — quantum-vulnerable. To be replaced by ML-DSA (CRYSTALS-Dilithium) under NIST PQC standards.

Event-Driven Architecture. Architecture pattern where services communicate via events rather than direct calls — enables loose coupling and real-time processing.

**EU AI Act**

**Event Mesh**

EU Artificial Intelligence Act. World's first comprehensive AI regulation. Classifies AI by risk tier (unacceptable, high, limited, minimal). High-risk AI enforcement: August 2026.

Distributed event routing infrastructure connecting multiple event brokers across clouds and regions. Enables global event delivery.

## **F**

**FIDO2 FinOps Fitness Function**

Fast Identity Online 2. Authentication standard enabling passwordless login using public-key cryptography. Basis for passkeys.

Cloud Financial Operations. Practice of optimising cloud costs through engineering, finance, and business alignment. Extended to AI FinOps for LLM token cost governance.

Automated test that measures an architecture characteristic (e.g., coupling, latency, security posture). Used to govern architectural drift.

## **G**

|**GDPR**|General Data Protection Regulation. EU data protection law governing personal data<br>processing. Article 22: rights against solely automated decisions. Article 17: right to<br>erasure.|
|---|---|
|**GPAI**|General Purpose AI. EU AI Act category for AI models trained at large scale capable of<br>performing many tasks (e.g., GPT-4, Claude). Subject to specific transparency<br>obligations.|
|**GraphQL**|Query language for APIs that allows clients to request exactly the data they need.<br>Alternative to REST for complex data graphs.|
|**H**||
|**HITL**|Human-in-the-Loop. Governance pattern where human review or approval is required<br>at specified points in an AI decision process.|
|**HNDL**|Harvest Now Decrypt Later. Attack strategy where adversaries archive currently<br>encrypted data to decrypt later using a quantum computer. Creates urgency for PQC<br>migration for long-lived sensitive data.|
|**HSM**|Hardware Security Module. Dedicated hardware device for secure key generation,<br>storage, and cryptographic operations. Required for high-assurance key management.|
|**I**<br>**IaC**|Infrastructure as Code. Managing infrastructure through machine-readable<br>configuration files (Terraform, Pulumi, Bicep) rather than manual processes.|
|**IDP (Identity)**|Identity Provider. Service that authenticates users and issues tokens (Entra ID, Okta,<br>PingIdentity).|
|**IDP (Platform)**|Internal Developer Platform. Self-service portal enabling developers to provision,<br>deploy, and manage services without platform team tickets (Backstage, Port).|
|**ISO/IEC 27090**|International standard providing guidance on AI cybersecurity including prompt<br>injection, adversarial attacks, and privilege escalation through tool chains. Finalised<br>March 2026.|
|**ISO 20022**|International standard for financial messaging. XML-based successor to SWIFT MT<br>formats for payment and securities messaging.|

## **J**

**JWT JIT**

JSON Web Token. Compact, URL-safe token format for representing claims between parties. Used for API authentication and authorisation.

Just-in-Time. Access provisioning model where permissions are granted only when needed for a specific task and automatically revoked afterwards.

## **K**

**KMS KPIs L LLM LLM Gateway**

Key Management Service. Cloud service for creating, managing, and controlling cryptographic keys (AWS KMS, Azure Key Vault, Google Cloud KMS).

Key Performance Indicators. Measurable values used to track progress toward strategic objectives.

Large Language Model. AI model trained on vast text corpora capable of natural language understanding and generation (GPT-4, Claude, Gemini).

Centralised entry point for all LLM API calls that enforces: authentication, PII scrubbing, injection detection, model routing, caching, cost attribution, and audit logging.

|**M**<br>**MACH**|Microservices, API-first, Cloud-native, Headless. Architecture philosophy emphasising<br>composable, independently deployable technology components.|
|---|---|
|**mTLS**|Mutual TLS. TLS where both client and server present certificates — authenticates<br>both parties. Required for service mesh and zero trust network security.|
|**ML-DSA**|Module Lattice Digital Signature Algorithm (CRYSTALS-Dilithium). NIST-standardised<br>post-quantum signature algorithm replacing RSA and ECDSA.|
|**ML-KEM**|Module Lattice Key Encapsulation Mechanism (CRYSTALS-Kyber). NIST-standardised<br>post-quantum key exchange algorithm replacing ECDH and RSA-KEM.|
|**MTTR**|Mean Time to Recovery. Average time from a failure being detected to service being<br>restored. Key DORA/SRE metric.|
|**MVA**|Minimum Viable Architecture. The smallest architectural foundation that supports<br>current needs while enabling future evolution without requiring wholesale redesign.|
|**N**||
|**NHI**|Non-Human Identity. Identities for machines, services, AI agents, and automated<br>processes — as opposed to human user identities.|
|**NIST PQC**|NIST Post-Quantum Cryptography Standardisation. Programme that selected<br>ML-KEM, ML-DSA, and SLH-DSA as quantum-resistant cryptographic standards.<br>Algorithms published August 2024.|
|**NPV**|Net Present Value. Financial metric calculating the present value of future cash flows<br>minus the initial investment. Positive NPV = value-creating investment.|

## **O**

**OIDC OPA**

**OBO**

OpenID Connect. Authentication layer on top of OAuth 2.0. Standard protocol for federated identity — widely used for enterprise SSO.

Open Policy Agent. CNCF policy engine for unified policy enforcement across the stack (infrastructure, Kubernetes, APIs, application). Policy written in Rego language.

On-Behalf-Of. OAuth2 flow (RFC 8693) where a service exchanges a user's token for a new token to call downstream services while maintaining user identity.

## **P**

**PAM PBC PCI-DSS PII PKI PQC PSD2**

Privileged Access Management. Security controls for managing, monitoring, and controlling access to privileged accounts and sensitive systems (CyberArk, BeyondTrust).

Packaged Business Capability. Self-contained, independently deployable business capability exposed via APIs — building block of composable architecture.

Payment Card Industry Data Security Standard. Security standard mandating controls for organisations handling cardholder data.

Personally Identifiable Information. Any data that can identify a specific individual. Subject to GDPR and data protection regulations.

Public Key Infrastructure. Framework of policies, hardware, software, and procedures for managing digital certificates and public-key encryption.

Post-Quantum Cryptography. Cryptographic algorithms designed to be secure against both classical and quantum computers.

Payment Services Directive 2. EU directive mandating open banking, strong customer authentication, and third-party access to payment accounts.

## **R**

**RAG**

**RBAC RFC 8693 RTO RPO**

Retrieval-Augmented Generation. AI pattern combining LLM generation with retrieval from a knowledge base — grounds model responses in specific, current information.

Role-Based Access Control. Access control model where permissions are assigned to roles, and users are assigned to roles.

OAuth 2.0 Token Exchange. Standard protocol for exchanging one OAuth token for another — used for delegated access in multi-hop agent chains.

Recovery Time Objective. Maximum acceptable time a system can be unavailable after a failure.

Recovery Point Objective. Maximum acceptable amount of data loss measured in time — how far back can a system recover to?

## **S**

**SAML SAST SBB**

Security Assertion Markup Language. XML-based standard for exchanging authentication and authorisation data between identity providers and service providers.

Static Application Security Testing. Analysing source code for security vulnerabilities without executing the program.

Solution Building Block. TOGAF term for a specific product, tool, or technology used to implement an Architecture Building Block.

|**SBOM**|Software Bill of Materials. Machine-readable inventory of all software components and<br>dependencies in an application — required for supply chain security.|
|---|---|
|**SCA**|Software Composition Analysis. Automated scanning of open-source dependencies for<br>known vulnerabilities and licence compliance issues.|
|**SHAP**|SHapley Additive exPlanations. Model interpretability technique that assigns each<br>feature an importance value for a particular prediction — standard explainability<br>method for ML models.|
|**SLI**|Service Level Indicator. Specific metric used to measure service performance (e.g.,<br>request latency P99).|
|**SLO**|Service Level Objective. Target value for an SLI over a time window — the internal<br>agreement about acceptable service quality.|
|**SRE**|Site Reliability Engineering. Discipline applying software engineering to IT operations.<br>Key concepts: SLOs, error budgets, toil reduction, blameless post-mortems.|
|**SR 11-7**|US Federal Reserve Supervisory Guidance 11-7. Defines model risk management<br>requirements for US banking organisations — requires model validation, governance,<br>and ongoing monitoring.|
|**SVID**|SPIFFE Verifiable Identity Document. Cryptographic identity document issued by<br>SPIRE to workloads. Can be X.509 certificate or JWT.|
|**SWIFT**|Society for Worldwide Interbank Financial Telecommunication. Messaging network for<br>international financial transactions.|
|**SPIFFE**|Secure Production Identity Framework For Everyone. Open standard for workload<br>identity in distributed systems.|
|**SPIRE**|SPIFFE Runtime Environment. Reference implementation of the SPIFFE standard —<br>issues and manages SVIDs for workloads.|
|**T**||
|**TLPT**|Threat-Led Penetration Testing. DORA-mandated red team exercise where external<br>specialists simulate real-world cyber attacks against critical functions. Required every 3<br>years for significant EU financial institutions.|
|**TOGAF**|The Open Group Architecture Framework. Enterprise architecture methodology<br>covering: Architecture Development Method (ADM), content framework, and reference<br>models.|
|**TVP**|Thinnest Viable Platform. Platform engineering principle: only centralise capabilities<br>that are genuinely better centralised. Avoid empire-building.|
|**Team Topologies**|Organisational design framework by Matthew Skelton and Manuel Pais. Defines four<br>team types: Stream-aligned, Platform, Enabling, Complicated-subsystem.|
|**V**<br>**vLLM**|Open-source LLM inference engine optimised for high throughput and low latency<br>using PagedAttention. Common choice for self-hosted LLM serving.|
|**VMSS**|Virtual Machine Scale Set (Azure) / Auto Scaling Group (AWS). Cloud infrastructure<br>that automatically scales compute capacity based on demand.|

## **W**

**WAF**

**WORM W3C Trace Context**

Web Application Firewall. Security control filtering HTTP/HTTPS traffic to protect against common attacks (OWASP Top 10).

Write Once Read Many. Storage that prevents modification or deletion of data after writing — required for regulatory audit trail immutability.

W3C standard for distributed tracing — defines HTTP headers for passing trace context across service boundaries.

## **Z**

**Zero Trust Zachman Framework ZTA**

Security model: 'never trust, always verify.' No implicit trust based on network location. Every request authenticated, authorised, and encrypted. Reference: NIST SP 800-207.

Enterprise architecture framework organising architectural artefacts across two dimensions: stakeholder perspectives and abstraction levels.

Zero Trust Architecture. Implementation of Zero Trust principles through a combination of identity, device, network, and data controls.

###### **CHEAT SHEET 1**

### **REGULATORY QUICK REFERENCE**

|**Regulation**|**Jurisdiction**|**Scope**|**Key Architecture Obligations**|**Penalties**|
|---|---|---|---|---|
|DORA|EU/EEA|Financial<br>institutions: banks,<br>insurers, investment<br>firms|ICT risk mgmt, third-party risk register,<br>resilience testing (TLPT every 3yr), incident<br>reporting (4-hr initial), concentration risk|Supervisory measures,<br>capital add-ons|
|EU AI Act|EU/EEA|All AI systems used<br>or placed on market<br>in EU|High-risk AI: conformity assessment, Annex IV<br>technical docs, human oversight, GPAI<br>transparency, post-market monitoring|€30M or 6% global<br>turnover (higher)|
|SR 11-7|USA (Fed)|US banking<br>organisations<br>(Fed-regulated)|Model inventory, independent validation,<br>ongoing monitoring, board governance,<br>conceptual soundness documentation|Regulatory findings,<br>formal agreements,<br>capital implications|
|GDPR|EU/EEA|All processors of EU<br>personal data|Art.22: no solely automated decisions w/<br>significant effect without human review; Art.17:<br>right to erasure; Art.25: privacy by design|€20M or 4% global<br>turnover (higher)|
|PCI-DSS v4.0|Global (card<br>schemes)|Card payment<br>processors and<br>merchants|Network segmentation, encryption in transit<br>and at rest, access control, audit logging,<br>penetration testing annually|Fines, card processing<br>suspension|
|BCBS 239|Global (BCBS<br>members)|Global systemically<br>important banks|Risk data aggregation, accuracy,<br>completeness, timeliness, adaptability of risk<br>|Pillar 2 capital<br>requirements,<br>|
||||reporting|supervisory measures|
|NIS2|EU/EEA|Essential and<br>important entities<br>incl. financial|Cybersecurity risk management, incident<br>reporting, supply chain security, encryption|€10M or 2% global<br>turnover|
|CSRD|EU/EEA|Large EU<br>companies (phased<br>from 2025)|Technology carbon reporting (Scope 1/2/3),<br>sustainability due diligence, double materiality<br>assessment|Public reporting<br>obligation, auditor<br>sign-off|

###### **CHEAT SHEET 2**

### **POST-QUANTUM CRYPTOGRAPHY MIGRATION GUIDE**

*HNDL Risk: Adversaries are archiving encrypted data TODAY to decrypt when CRQCs arrive (est. 2028-2031). Long-lived sensitive data (10+ yr retention) must be protected* ***now*** *. NIST mandate: migrate to PQC standards by 2035; financial services regulators expect earlier.*

|**Algorithm**<br>**Type**|**Replaces**|**NIST Status**|**Use Case**|
|---|---|---|---|
|ML-KEM (Kyber)<br>Key<br>Encapsulation|ECDH, RSA-KE|M<br>FIPS 203 — Final|TLS key exchange, encrypted messaging|
|ML-DSA (Dilithium)<br>Digital<br>Signature|ECDSA, RSA|FIPS 204 — Final|JWT signing, certificate signing, code<br>signing|
|SLH-DSA<br>(SPHINCS+)<br>Digital<br>Signature|ECDSA, RSA|FIPS 205 — Final|Backup signature scheme (hash-based,<br>no lattice)|
|AES-256<br>Symmetric<br>Encryption|AES-128|Already<br>quantum-safe|Data at rest, data in transit (symmetric)|
|SHA-3<br>Hash Function|SHA-256|Already<br>quantum-safe|Hashing, HMAC, integrity checking|
|RSA-2048<br>Key Exchange /<br>Sig|—|QUANTUM-VULNE<br>RABLE — migrate|Legacy: TLS, certificate signing, JWT<br>RS256|
|ECDSA P-256<br>Digital<br>Signature|—|QUANTUM-VULNE<br>RABLE — migrate|Legacy: JWT ES256, TLS, SSH, code<br>signing|
|X25519 (ECDH)<br>Key Exchange|—|QUANTUM-VULNE<br>RABLE — migrate|Legacy: TLS 1.3 key exchange|
|**MIGRATION SEQUENCE (what to**<br>**Priority**<br>**Asset Type**|**migrate first**|**):**<br>**Migration Approach**||
|1st<br>TLS certificates for internet-faci|ng services|Hybrid ML-KEM + X25519 —|deploy in browsers/CDN first|
|2nd<br>JWT signing keys||Switch token service to ML-D|SA — update all resource servers to verify|
|3rd<br>PKI root and intermediate CAs||Re-issue on next planned re|newal cycle with hybrid certificates|
|4th<br>SWIFT/interbank messaging||Coordinate with counterparti|es — cannot migrate unilaterally|
|5th<br>HSMs and key material||Verify HSM vendor PQC sup|port — upgrade hardware if required|
|6th<br>SSH keys and code signing||Migrate DevOps infrastructur|e credentials|
|7th<br>Legacy data at rest (archival)||Re-encrypt high-value long-t|erm archives with AES-256 + new key|

###### **CHEAT SHEET 3**

### **DORA COMPLIANCE ARCHITECTURE CHECKLIST**

|**DORA Requirement**|**Article**|**Architecture Control**|**Evidence Required**|
|---|---|---|---|
|ICT Risk Management<br>Framework|Art. 6|IT risk register, risk appetite statement,<br>board-approved ICT risk policy|Risk register with annual review<br>evidence|
|Critical Function<br>Identification|Art. 6|CIF mapping to ICT systems, services, and<br>third parties|CIF register with dependency mapping|
|ICT Asset Register|Art. 8|CMDB or asset inventory linked to CIF<br>mapping|Current-day asset inventory|
|ICT Third-Party Risk<br>Register|Art. 28|Register of all ICT third-party providers,<br>tiered by criticality|Third-party register, contracts with<br>required clauses|
|Concentration Risk<br>Assessment|Art. 29|Identify providers where critical function<br>dependency >threshold|Concentration risk assessment,<br>mitigation plans|
|Incident Classification &<br>Reporting|Art.<br>18-19|Incident triage tool, reporting workflow, 4-hr<br>initial notification|Incident classification criteria, reporting<br>SLAs|
|Resilience Testing<br>Programme|Art.<br>24-25|Annual testing calendar, test results,<br>remediation tracker|Test plans, test results, remediation<br>closure evidence|
|TLPT (Threat-Led Pen<br>Testing)|Art. 26|3-year TLPT cycle with approved external<br>red team|TLPT report, regulator notification,<br>remediation plan|
|Exit Plans for Tier 1 Vendors|Art. 28|Documented, tested exit plan per Tier 1 ICT<br>vendor|Exit plan documents, annual test<br>records|

###### **CHEAT SHEET 4**

### **EU AI ACT — RISK TIER GUIDE**

|**Risk Category**|**Definition**|**Examples**|**Key Obligations**|
|---|---|---|---|
|Unacceptable<br>Risk|Prohibited AI practices|Social scoring, real-time<br>biometric in public spaces,<br>subliminal manipulation|BANNED — cannot deploy in EU|
|High Risk (Annex<br>|Significant impact on<br>|Credit assessment, fraud<br>|Conformity assessment, Annex IV<br>|
|III)|fundamental rights or safety|detection, HR screening,<br>biometric ID, critical infrastructure|technical docs, HITL, post-market<br>monitoring, EU DB registration|
|Limited Risk|Transparency obligations<br>|Chatbots, deepfakes,<br>|Disclose AI nature to users,<br>|
||only|AI-generated content|machine-readable labelling of AI content|
|Minimal Risk|No specific obligations|Spam filters, AI in games,<br>recommendation systems|Voluntary codes of practice encouraged|
|GPAI (General|Foundation models +|GPT-4, Claude, Gemini and apps|Transparency, copyright compliance,|
|Purpose)<br>**HIGH-RISK AI (**|derived systems<br>**Annex III) — Key Archite**|built on them<br>**cture Obligations:**|technical docs; systemic risk models:<br>adversarial testing, incident reporting|
|**Obligation**|**Article**|**Architecture Implementation**||
|Risk management|system<br>Art. 9|Risk register, risk assessment per|model version, ongoing monitoring|
|Data governance|Art. 10|Training data documentation, bias|assessment, data quality metrics|
|Technical documen|tation (Annex IV)<br>Art. 11|Model card: purpose, architecture|, training data, performance, limitations|
|Record-keeping|Art. 12|Immutable audit logs of all decisio|ns, model version linkage, 10-year retention|
|Transparency to us|ers<br>Art. 13|Disclosure that AI is being used, e|xplanation of AI logic on request|
|Human oversight|Art. 14|HITL capability, human override, r|eviewer training records|
|Accuracy, robustne|ss, cybersecurity<br>Art. 15|Adversarial testing, input validatio|n, injection defences|
|Conformity assess|ment<br>Art. 43|Self-assessment (most) or third-p|arty (biometrics, critical infra)|
|EU database regist|ration<br>Art. 51|Register high-risk AI systems in E|U AI systems database before deployment|

###### **CHEAT SHEET 5**

### **CLOUD ARCHITECTURE PATTERNS**

|**Pattern**|**Problem Solved**|**Key Components**<br>**When to Use**|
|---|---|---|
|Landing Zone|Governed multi-account|Management account, SCPs,<br>All enterprise cloud deployments|
||cloud foundation|logging accounts, network hub|
|Hub-and-Spoke Network|Centralised network|Transit Gateway/Hub VNet, spoke<br>Multi-account, shared egress,|
||services|VPCs, shared services<br>centralized inspection|
|Service Mesh|East-west traffic security &|Istio/Linkerd sidecars, mTLS, traffic<br>Microservices requiring mutual|
||observability|management<br>auth and observability|
|Cell-Based Architecture|Blast radius reduction at<br>scale|Independent cells with load<br>balancer, no shared state<br>High-scale systems requiring<br>predictable failure isolation|
|Strangler Fig|Incremental legacy<br>migration|API facade, route rules, parallel<br>systems<br>Migrating from monolith without<br>big bang rewrite|
|Sidecar|Cross-cutting concerns|Service + sidecar container, shared<br>Logging, mTLS, secret injection|
||without code changes|namespace<br>in containerised systems|
|CQRS|Read/write separation for<br>scale|Command model, query model,<br>event store<br>High-read workloads,<br>event-sourced systems|
|Saga|Distributed transactions|Choreography or orchestration,<br>compensating transactions<br>Multi-service transactions<br>requiring eventual consistency|

###### **CHEAT SHEET 6**

### **AI SECURITY THREAT MAP**

|**Threat**|**Attack Vector**|
|---|---|
|Prompt Injection|User input contains|
|(Direct)|instructions overriding system<br>prompt|
|Prompt Injection|Malicious content in|
|(Indirect)|processed documents/web<br>pages/emails|
|Data Poisoning|Corrupted training data alters<br>model behaviour|
|RAG Corpus|Malicious documents injected|
|Poisoning|into knowledge base|
|Model Extraction|Systematic API querying to<br>replicate model weights|
|Model Theft|Exfiltration of model weights<br>from storage|
|Agent Abuse|External attacker hijacks|
||agent to access enterprise<br>systems|
|Tool Exploitation|Agent manipulated to call<br>tools outside intended scope|
|Membership Inference|Querying model to determine<br>if specific data was in training<br>set|
|Supply Chain Attack|Compromised open-source<br>dependency or model weights|

**Architectural Defence** Instruction hierarchy, input classifier, privilege separation

Zero-trust treatment of external content, RAG chunk signing Provenance chain, canary records, differential privacy

Authenticated ingestion, corpus signing, source tiering Rate limiting, query pattern monitoring, output perturbation Encrypted registry, HSM key protection, DLP, access audit SPIFFE identity, tool permission model, sandbox, blast radius limits

Tool registry, JIT grants, OPA enforcement Differential privacy in training

SBOM, SCA scanning, model signing, container signing

###### **Detection Signal**

Output classifier detects instruction leakage

Agent attempts unexpected tool calls

Canary query wrong answers, fairness drift

Canary queries, consistency checks vs baseline

High query volume, systematic input patterns

Anomalous model registry access

Anomalous tool call patterns, scope violations

Tool call rejected by policy engine Statistical analysis of output confidence patterns

CVE alerts, integrity check failures

###### **CHEAT SHEET 7**

### **IDENTITY & ACCESS PATTERNS**

**Pattern Standard Use Case** Human AuthN — OIDC/SAML Workforce login to applications SSO Machine-to-Machine OAuth2 Client Service-to-service API calls Credentials Delegated User RFC 8693 Token Agent acting on behalf of user Context Exchange Workload Identity SPIFFE/SPIRE Agent and service authentication Just-in-Time Access PAM + Vault Privileged session access Federated Identity SAML/OIDC Cross-org or cross-cloud trust Federation Passkey/FIDO2 WebAuthn Passwordless user authentication Managed Identity Azure MI / AWS Cloud workload identity IAM Role

###### **Key Claims/Tokens**

id_token: sub, email, groups; access_token: scope access_token: client_id, scope, aud sub=user, act={sub=agent}, scope=narrowed X.509 SVID: spiffe://domain/agent/type/id Time-limited credential, session recording Assertion from trusted IdP, local token issued Credential ID, authenticator assertion

Cloud-native credential, auto-rotated

###### **CHEAT SHEET 8**

### **INTERVIEW ANSWER FRAMEWORKS**

|**Framework**|**When to Use**|**Structure**|
|---|---|---|
|TOGAF ADM|EA methodology|Preliminary→A (Vision)→B/C/D|
||questions|(Architecture)→E-H (Transition)→|
|||Requirements Mgmt|
|Zachman|Explaining EA to|Who/What/Where/When/Why/How ×|
|Framework|non-architects|Owner/Designer/Builder/Subcontractor|
|Team Topologies|Org design<br>|Stream-aligned, Platform, Enabling,<br>|
||questions|Complicated-subsystem teams +<br>interaction modes|
|Horizon Planning|Strategy/investme<br>nt questions|H1 (optimise core), H2 (expand), H3<br>(transform) with investment ratios|
|Risk Tiering|Governance/AI|Tier 1 (highest risk, most control)→Tier|
||questions|4 (lowest risk, self-service)|
|DORA Metrics|Engineering|Deployment Frequency, Lead Time,|
||performance<br>|MTTR, Change Failure Rate|
||questions||
|Crawl-Walk-Run|Transformation/ma|Crawl (foundation, quick wins), Walk|
||turity questions|(standardise), Run (optimise, automate)|
|C4 Model|Architecture<br>diagrams|Context→Container→Component→<br>Code diagrams|
|OKRs|Goal-setting/leader<br>ship questions|Objectives (qualitative) + Key Results<br>(measurable, time-bound)|

###### **Pitfall**

Getting lost in phases — focus on business value, not process

Too abstract — pair with concrete examples Implementing as naming convention only — must change how teams interact Underinvesting in H1 — core must be stable before transform Binary thinking — must be proportionate, not all-or-nothing Optimising metrics rather than the outcomes they represent Staying in Crawl — must have aggressive Walk/Run timeline Skipping Context — always start with business context, not technical components KRs that are activities not outcomes: 'run 3 workshops' vs '40% faster deployment'

###### **CHEAT SHEET 9**

### **DISTINGUISHED ARCHITECT SIGNALS**

*These are the behaviours that separate Distinguished from Principal in senior architecture interviews. Practice each one deliberately — they are learnable.*

**Interview Behaviour Principal** Answering questions Answers the question asked. Technically complete. Technical depth Deep in 2-3 areas. Surface-level elsewhere. Business connection Can explain business impact when asked. Ambiguity handling Asks clarifying questions before answering. Tradeoff articulation Describes tradeoffs when discussing options. Regulatory awareness Aware of relevant regulations. Mentions them. Organisational awareness Technical solution is technically sound. Whiteboard Draws accurate technical diagrams. Follow-up challenges Defends original answer. May concede under pressure.

Executive communication Can summarise in 5 minutes.

###### **Distinguished**

Reframes the question to surface underlying concern. Answers both. Deep across multiple domains. Explicitly acknowledges knowledge boundaries. Leads with business impact. Translates every technical decision to financial/strategic terms.

Makes assumptions explicit, answers with them, then asks if the assumption holds.

Articulates tradeoffs before being asked. Explains which tradeoff they would make and why.

Integrates regulatory requirements into architecture as first-class constraints. Knows specific articles/sections.

Anticipates organisational and political impediments. Designs for adoption, not just correctness.

Draws diagrams that tell a story. Labels for the audience in the room, not for themselves.

Updates view when presented with new information. Holds position when pushback is not evidence-based.

Has a 30-second version ready. Leads with the conclusion. Follows with evidence only if asked.

##### **QUICK-FIRE INTERVIEW TIPS**

|**Tip**|**Description**|
|---|---|
|Always reframe|Before answering, ask: 'What is the interviewer really testing?' Architecture questions test judgement,|
||not knowledge.|
|Lead with the conclusion|State your answer in the first sentence. Then justify. Never build to a conclusion — executives don't|
||wait.|
|Name the tradeoff before|Say 'The tradeoff here is...' before the interviewer has to prompt. Shows architectural thinking.|
|they ask||
|Use numbers|'A typical deployment takes 4-6 weeks' is better than 'it takes a while.' Numbers signal operational|
||experience.|
|Admit knowledge|'I haven't worked with X directly but my approach would be...' is stronger than bluffing. Distinguish|
|boundaries|certainty levels.|
|Connect to the business|Every technical choice must connect to a business outcome. If you can't articulate the connection,<br>reconsider the choice.|

**Tip** Whiteboard discipline

###### **Description**

Start with a title. Label all boxes. Show data flow direction. Write the key decision/question the diagram answers.

Follow-up challenge test

Executive summary habit Regulatory integration

When challenged, ask yourself: is this new information or just pressure? Update your view only for the former. End every answer with a one-sentence summary: 'In short: [conclusion in plain business terms].' In financial services: proactively mention the relevant regulation. Don't wait to be asked. It signals domain depth.

### **EA INTERVIEW HANDBOOK — COMPLETE SERIES**

|**Volume**|**Title**|**Contents**|
|---|---|---|
|Volume 1|EA Foundations|EA frameworks, security, identity, data, cloud, AI platform, banking scenarios (39|
|||questions)|
|Volume 2|Delta Edition|PQC, EU AI Act, AI FinOps, DORA, composable architecture, sustainable EA (26|
|||questions)|
|Volume 3|CTO & AI|CTO Round, AI Security, AI Identity, AI Governance, scorecards, whiteboards (21|
|||questions)|
|This Document|Glossary & Cheat Sheet|300+ terms, 9 cheat sheets, regulation guide, interview tips|

Targeting: Microsoft · Google · Amazon · JPMorgan · Goldman Sachs · Morgan Stanley · Barclays · HSBC · Visa · ServiceNow · SAP
