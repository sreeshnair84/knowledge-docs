---
title: "Part 3 — Security Domains"
date_created: 2026-07-09
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cybersec-architect"]
doc_type: multi-part-series
series_name: Cybersecurity Architect
series_part: 3
series_total: 15
series_index: index.md
---

# Part 3 — Security Domains

**Audience:** Security architects, enterprise architects, and security programme managers responsible for designing and governing the full security capability stack.

**Related:**
[Overview](index.md) |
[Enterprise Security Architecture](02-enterprise-security-architecture.md) |
[Identity Architecture](06-identity-architecture.md) |
[Cloud Security](07-cloud-security.md)

> **Current as of July 2026.** Reference guide to all major enterprise security domains — technology, tools, and architecture patterns for each.

---

## 1. Identity Domain

Identity is the primary control plane for modern enterprise security. Every access decision starts with answering: **Who is this? What are they allowed to do? In what context?**

### 1.1 IAM (Identity & Access Management)

| Capability | Description | Leading Tools (2026) |
|---|---|---|
| **Directory Services** | Canonical identity store | Entra ID, Okta, Google Workspace, AD DS |
| **Authentication** | Verify identity claims | FIDO2/passkeys, MFA, SSO |
| **Authorization** | Enforce access policies | RBAC, ABAC, ReBAC (Google Zanzibar model) |
| **Identity Governance** | Lifecycle management, access reviews | SailPoint, Saviynt, Microsoft IGA |
| **Federation** | Cross-domain identity trust | SAML 2.0, OIDC, WS-Federation |

### 1.2 PAM (Privileged Access Management)

Privileged accounts — admin, root, service accounts — are the primary targets of attackers who have gained initial access.

**Core PAM capabilities:**
- **Credential vaulting**: Secrets checked out per session, never stored on endpoints
- **Session recording**: Full keylog and video recording of privileged sessions
- **Just-in-Time (JIT) access**: Privileges granted only when needed and for the minimum duration
- **Just Enough Access (JEA)**: Role constrained to specific commands/operations, not full admin
- **Privileged access workstations (PAW)**: Hardened, dedicated devices for admin tasks

**AI extension:** AI agents that require administrative access must use PAM-integrated credential vaulting — never hardcoded keys in agent prompts or environment variables.

### 1.3 Federation Protocols

| Protocol | Use Case | Key Flows |
|---|---|---|
| **SAML 2.0** | Web SSO, enterprise applications | SP-initiated, IdP-initiated |
| **OAuth 2.1** | API authorization, agent delegation | Auth Code + PKCE, Client Credentials |
| **OIDC** | Identity layer on OAuth | ID Token, UserInfo endpoint |
| **SPIFFE/SPIRE** | Workload identity in k8s/service mesh | SVIDs via X.509 or JWT |

### 1.4 Workload Identity & Machine Identity

As of 2026, machine identities outnumber human identities 10:1 in the average enterprise. Management requires:

- **Certificate lifecycle automation**: ACME protocol, Venafi, cert-manager
- **Secrets manager**: HashiCorp Vault, AWS Secrets Manager, Azure Key Vault
- **Dynamic secrets**: Short-lived credentials generated per workload, never stored
- **Workload federation**: Cloud IAM roles for service accounts via OIDC (Workload Identity Federation)
- **Agent identity**: IETF AIMS, Entra Agent ID, AWS AgentCore identity (see [Part 6](06-identity-architecture.md))

---

## 2. Cloud Security Domain

### 2.1 CSPM (Cloud Security Posture Management)

CSPM continuously assesses cloud configurations against security benchmarks and regulatory requirements.

**Key capabilities:**
- Multi-cloud visibility (AWS, Azure, GCP, OCI)
- Misconfiguration detection (public S3 buckets, overly permissive IAM, unencrypted storage)
- Compliance posture against CIS Benchmarks, NIST, PCI DSS, HIPAA
- Drift detection and remediation automation
- Risk prioritisation based on business context

**Leading tools:** Wiz, Orca, Prisma Cloud, Microsoft Defender for Cloud, Lacework

### 2.2 CWPP (Cloud Workload Protection Platform)

CWPP protects cloud workloads — VMs, containers, serverless — at runtime.

**Capabilities:**
- Vulnerability assessment of running workloads
- Runtime threat detection (process anomalies, network connections, file system changes)
- Container image scanning and policy enforcement
- Serverless function security monitoring
- Memory protection and exploit prevention

### 2.3 CIEM (Cloud Infrastructure Entitlement Management)

CIEM addresses the identity permission explosion in cloud environments.

**Problem statement:** The average cloud environment has 10,000+ identities with excessive permissions. Attackers exploit over-permissioned roles to escalate privileges.

**CIEM capabilities:**
- Discovery of all cloud identities (human + machine + service)
- Permission baselining (what permissions are actually used vs. what is granted)
- Over-permission detection and right-sizing recommendations
- Cross-cloud entitlement visibility

### 2.4 CNAPP (Cloud-Native Application Protection Platform)

CNAPP consolidates CSPM + CWPP + CIEM + infrastructure-as-code scanning into a single platform.

**Why CNAPP:** Point solutions produce disconnected alerts. CNAPP correlates misconfigurations, running vulnerabilities, and excessive permissions into prioritised attack paths — dramatically reducing alert fatigue.

**Leading tools:** Wiz (market leader 2026), Orca, Prisma Cloud, Defender for Cloud

---

## 3. Network Security Domain

### 3.1 Network Segmentation

| Approach | Description | Use Case |
|---|---|---|
| **VLAN segmentation** | L2 isolation | Legacy on-prem environments |
| **Firewall zones** | L3/L4 policy enforcement | DMZ, production/dev isolation |
| **Microsegmentation** | L7 workload-to-workload policies | Zero Trust for data centres and cloud |
| **Private connectivity** | VPC peering, Private Link, Direct Connect | Cloud-to-on-prem, inter-cloud |

### 3.2 Zero Trust Network Access (ZTNA)

ZTNA replaces VPN with identity-aware, application-specific access:

```
User Device (verified posture)
       ↓
  ZTNA Client
       ↓ (Identity + device signal)
  ZTNA Cloud Service
       ↓ (Policy evaluation)
  Application Connector (inside network)
       ↓
  Target Application
```

**Advantages over VPN:**
- No network-level access — only application-level
- Device posture enforced at access time
- Identity-aware; works for unmanaged devices
- No lateral movement risk (user never gets network access)

### 3.3 SASE (Secure Access Service Edge)

SASE converges networking and security into a cloud-delivered service:

```
SASE = SD-WAN + SSE

SSE = CASB + SWG + ZTNA + (optionally FWaaS, DLP, RBI)
```

| Component | Function |
|---|---|
| **SD-WAN** | Optimised, policy-driven network routing |
| **CASB** | Control over SaaS app usage and data |
| **SWG** | Web traffic filtering and threat protection |
| **ZTNA** | Identity-aware application access |
| **FWaaS** | Cloud-hosted next-generation firewall |
| **DLP** | Data loss prevention inline |

**Leading platforms:** Zscaler, Palo Alto Prisma, Netskope, Cato Networks, Cisco+

---

## 4. Endpoint Security Domain

### 4.1 EDR (Endpoint Detection and Response)

EDR provides continuous monitoring and recording of endpoint activity for threat detection and investigation.

**Core capabilities:**
- Process, network, file system, registry event collection
- Behavioural detection (anomaly + threat intelligence + ML)
- Automated response (process kill, network isolation, file quarantine)
- Threat hunting interface (query historical telemetry)
- Forensic investigation support

**Leading tools:** CrowdStrike Falcon, Microsoft Defender for Endpoint, SentinelOne, Carbon Black

### 4.2 XDR (Extended Detection and Response)

XDR extends EDR across multiple telemetry sources:

```
XDR = EDR + Network Detection + Cloud Security + Identity + Email Security
                    unified into a single detection platform
```

**Value:** Cross-source correlation enables detection of attacks that span endpoints, network, and cloud — invisible to point solutions.

**Leading tools:** Microsoft Sentinel + Defender XDR, CrowdStrike Falcon Complete, Palo Alto Cortex XDR

### 4.3 MDR (Managed Detection and Response)

MDR is a managed service that provides 24/7 threat monitoring, detection, and response:

- Vendor operates SOC on customer's behalf
- Uses customer's EDR/XDR telemetry
- Provides alert triage, investigation, and guided response
- Escalation to customer team for containment decisions

**When to use MDR:** Organizations without 24/7 SOC staff or that want to augment an existing team.

### 4.4 MDM (Mobile Device Management)

MDM enforces device policies and controls for mobile endpoints:

- **Device enrollment**: Corporate vs. BYOD policies
- **Configuration enforcement**: VPN, certificates, email profiles
- **App management**: Deploy, configure, and wipe corporate apps
- **Compliance monitoring**: Device health checks for Zero Trust integration
- **Remote wipe**: On device loss or departure

**Leading tools:** Microsoft Intune, Jamf, VMware Workspace ONE

---

## 5. Application Security Domain

### 5.1 SAST (Static Application Security Testing)

Analyses source code at build time without executing the application:

- **Detection:** Injection flaws, hardcoded secrets, insecure dependencies, logic errors
- **Integration point:** IDE plugins (real-time) + CI pipeline gate (blocking on high/critical)
- **Leading tools:** Semgrep, Checkmarx, Veracode, Fortify, GitHub Advanced Security

### 5.2 DAST (Dynamic Application Security Testing)

Tests running applications by simulating attacks:

- **Detection:** Authentication flaws, injection vulnerabilities, CORS misconfigurations, API exposure
- **Integration point:** Pre-production environment; blocking gate before release
- **Leading tools:** Burp Suite Enterprise, OWASP ZAP, Invicti, StackHawk

### 5.3 IAST (Interactive Application Security Testing)

Instruments the running application from the inside during testing:

- Combines speed of SAST with accuracy of DAST
- Runs during functional QA testing — no separate security test phase
- Low false-positive rate

### 5.4 RASP (Runtime Application Self-Protection)

Embedded within the application runtime to detect and block attacks in production:

- Inspects function calls, database queries, and file operations in real time
- Blocks exploits without requiring a patch or WAF rule update
- **Use case:** Legacy applications that cannot be patched quickly

### 5.5 API Security

See [Part 2 — API Security](02-enterprise-security-architecture.md#42-api-security) for the full control framework.

**Key addition — AI agent API surface:** Every MCP server and every agentic tool endpoint is an API. Apply the same controls (authentication, authorization, rate limiting, input validation, logging) that you apply to customer-facing APIs.

---

## 6. Data Security Domain

### 6.1 DSPM (Data Security Posture Management)

DSPM discovers, classifies, and monitors data across cloud environments:

- Discovers sensitive data (PII, PCI, PHI) across structured and unstructured stores
- Maps data flows to identify unexpected access or movement
- Identifies misconfigurations (public buckets, unencrypted sensitive data)
- Generates data risk inventory for compliance and privacy programmes

**Leading tools:** Cyera, Varonis, BigID, Securiti, Microsoft Purview

### 6.2 DLP (Data Loss Prevention)

DLP prevents sensitive data from leaving the organization through unauthorized channels:

| Channel | DLP Control |
|---|---|
| Email | Scan outbound email attachments and body |
| Web browser | Block upload of classified data to personal sites |
| Removable media | Block or encrypt data copied to USB |
| Cloud storage | CASB integration to monitor personal cloud sync |
| Generative AI | Block sensitive data submission to public LLMs |
| Agent outputs | Filter agent responses before delivery to users |

**AI-specific DLP challenge:** Users pasting sensitive documents into ChatGPT or Claude.ai is the dominant DLP incident in enterprises as of 2026. Controls: CASB policy blocking submission of classified data to AI services; corporate AI gateway as the only approved AI access point.

### 6.3 Encryption

| State | Technology | Key Management |
|---|---|---|
| **At rest** | AES-256 (database, file system, object storage) | Cloud KMS (AWS KMS, Azure Key Vault, GCP Cloud KMS) |
| **In transit** | TLS 1.3 (all communications) | Certificate lifecycle automation |
| **In use** | Confidential Computing (Intel TDX, AMD SEV) | Hardware-backed TEE |
| **Field-level** | AES-256 or format-preserving encryption | Application-layer KMS integration |

### 6.4 Tokenization

Tokenization replaces sensitive values (card numbers, SSNs) with random tokens that have no mathematical relationship to the original value:

- **Format-preserving tokenization (FPT)**: Token has the same format as the original (useful for legacy systems)
- **Vaultless tokenization**: No central database — token is derived via keyed cryptographic function
- **Use case:** PCI DSS scope reduction — systems processing only tokens are out of PCI scope

### 6.5 Data Masking

Masking creates realistic but fictitious data for non-production use:

- **Static masking**: Pre-production copy with masked values
- **Dynamic masking**: Real-time masking at query time based on user role
- **AI training data masking**: Remove PII before including data in training datasets

---

## 7. Infrastructure Security Domain

### 7.1 CSPM

Covered in Section 2.1 above.

### 7.2 CWPP

Covered in Section 2.2 above.

### 7.3 CIEM

Covered in Section 2.3 above.

### 7.4 CNAPP Consolidated View

CNAPP integrates all infrastructure security signals:

```
Code → Build → Deploy → Runtime
  ↑        ↑        ↑        ↑
 SAST    IaC      CSPM    CWPP
 SCA     Scan     CIEM    EDR
Secret   Image    Config  Runtime
Scan     Scan     Drift   Threat
                          Detection
```

**CNAPP risk correlation example:**
- CSPM finds: S3 bucket with public read policy
- CIEM finds: Lambda function has s3:GetObject on that bucket with over-broad role
- CWPP finds: Lambda has known CVE in its runtime library
- CNAPP correlates these three signals into an **attack path**: external attacker → public bucket → Lambda exploit → data exfiltration — and prioritises it as critical.

---

## 8. Security Operations Domain

### 8.1 SIEM (Security Information and Event Management)

SIEM aggregates and correlates security events across the enterprise:

- **Log ingestion**: Endpoints, firewalls, identity providers, cloud services, applications
- **Normalisation**: Convert diverse log formats to a common schema (e.g., ECS, OCSF)
- **Correlation**: Rule-based and ML detection of attack patterns
- **Alerting**: Prioritised alerts routed to analyst queues or SOAR
- **Retention**: Long-term log storage for forensics and compliance

**Leading tools:** Microsoft Sentinel, Splunk, IBM QRadar, Google Chronicle, Elastic SIEM

**AI enhancement:** LLM-assisted alert triage, natural language queries over security telemetry, automated alert summary generation.

### 8.2 SOAR (Security Orchestration, Automation and Response)

SOAR automates repetitive security operations tasks:

- **Playbooks**: Structured workflows for common incident types (phishing, malware, compromised account)
- **Integrations**: API connectors to 200+ security tools
- **Case management**: Investigation tracking, evidence collection, stakeholder communication
- **Metrics**: MTTD, MTTR, analyst capacity

**Leading tools:** Palo Alto XSOAR, Splunk SOAR, Microsoft Sentinel Automation, Torq, Tines

### 8.3 Threat Intelligence

**Intelligence types:**

| Type | TTL | Example | Consumer |
|---|---|---|---|
| **Strategic** | Months–Years | Nation-state targeting of sector | CISO, Board |
| **Operational** | Weeks–Months | Campaign targeting financial firms with spearphish | SOC Manager |
| **Tactical** | Days–Weeks | Specific malware family TTPs | SOC Analyst |
| **Technical** | Hours–Days | IoCs: IPs, domains, hashes | SIEM/SOAR |

**Sources:** MITRE ATT&CK, ISAC feeds, commercial threat intel (Recorded Future, Mandiant, CrowdStrike Intel), open-source (AlienVault OTX, MISP)

**AI threat intelligence:** MITRE ATLAS tracks AI-specific adversarial TTPs. Subscribe to ATLAS updates as the primary source for AI threat intelligence. See [Part 8](08-ai-governance.md) for the full framework mapping.

### 8.4 Security Analytics

Security analytics applies statistical and machine learning techniques to security data:

- **User and Entity Behaviour Analytics (UEBA)**: Baseline normal behaviour; alert on anomalies
- **Network Traffic Analysis (NTA)**: Detect C2 communications, data exfiltration, lateral movement in network flows
- **Threat hunting**: Analyst-driven proactive search for threats not caught by detection rules
- **Attack simulation analytics**: Continuous testing of detection coverage using breach simulation (BAS)

**Domain summary table:**

| Domain | Primary Concern | Key Metrics | Investment Priority (2026) |
|---|---|---|---|
| Identity | Credential theft, privilege abuse | Time-to-provision, MFA adoption, identity risk score | Very High |
| Cloud | Misconfiguration, exposed data | Cloud security score, critical misconfigs/week | Very High |
| Network | Lateral movement, exfiltration | Detection coverage, ZTNA adoption % | High |
| Endpoint | Malware, ransomware | EDR coverage %, MTTD for endpoint threats | High |
| Application | Injection, API abuse | SAST/DAST coverage, open critical vulns | High |
| Data | Exfiltration, privacy breach | Data classified %, DLP incidents | High |
| Infrastructure | Misconfiguration, supply chain | CNAPP risk score, patching velocity | High |
| Operations | Alert fatigue, slow response | MTTD, MTTR, false positive rate | Medium-High |
