---
title: "Part 02 — AI Use Cases in Security Operations"
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["ai-triage", "ueba", "threat-intel", "dfir", "detection-engineering", "malware-analysis"]
---

# Part 02 — AI Use Cases in Security Operations

**Audience:** Detection Engineers, SOC Analysts (L2/L3), Threat Hunters, Incident Responders
**Related:** [Part 01 — Operating Model](part-01-soc-operating-model.md) | [Part 03 — Agentic SOC](part-03-agentic-soc.md) | [Part 04 — Playbooks](part-04-automation-playbooks.md)

> This part catalogs every meaningful AI use case in a modern SOC with implementation depth. For each use case: the AI technique, the data requirements, the tool integrations, and the measurable business impact.

---

## 1. Alert Operations

### 1.1 Alert Triage

**What it does:** An LLM agent reads the raw alert, queries enrichment sources, evaluates severity, and produces a structured verdict with reasoning — replacing the first 15–20 minutes of manual analyst work.

**AI Technique:** Zero-shot classification + tool calling + structured JSON output

**Data Inputs Required:**
- Raw alert fields (event type, source IP, destination IP, user, process, timestamp)
- Asset inventory (is this a critical server? PCI-in-scope?)
- User directory (is this a privileged account? HR-flagged as leaving?)
- Threat intel (is the IP/hash/domain in known-bad feeds?)
- Historical context (has this alert fired before for this entity?)

**Tool Integrations:**
- SIEM API (Sentinel, Splunk, Chronicle) for alert retrieval
- VirusTotal, AlienVault OTX, Shodan for indicator enrichment
- Active Directory / LDAP for user/device context
- CMDB / ServiceNow for asset criticality
- Previous ticket database for historical patterns

**Prompt Pattern (ReAct):**
```
System: You are a senior SOC analyst. Analyze this alert and determine if it is a true positive.
Use available tools to gather context before deciding. Think step by step.

Available tools:
- enrich_ip(ip): returns threat intel for IP address
- get_user_profile(username): returns AD profile, risk score, recent activity
- get_asset_info(hostname): returns asset criticality, owner, patch status
- search_similar_alerts(alert_hash): returns similar historical alerts and outcomes
- get_process_reputation(hash): returns file reputation and behavior info

Alert: {alert_json}

Reason through each enrichment step, then produce a verdict.
```

**Expected Output (Structured JSON):**
```json
{
  "verdict": "TRUE_POSITIVE",
  "confidence": 87,
  "severity": "HIGH",
  "reasoning": "The PowerShell command downloads a payload from a domain registered 48 hours ago with no reputation. The source process (Word.exe) is an unusual parent for PowerShell. The destination IP resolves to a known Cobalt Strike C2 infrastructure.",
  "evidence": ["threat_intel_match", "unusual_process_ancestry", "new_domain"],
  "recommended_action": "QUARANTINE_ENDPOINT",
  "mitre_techniques": ["T1059.001", "T1566.001"],
  "escalate_to": "TIER_2"
}
```

**Performance Benchmarks (2026 Production):**
- Time savings: 15–20 min → 30–60 sec
- Accuracy: 88–94% agreement with analyst verdict
- False positive reduction: 40–60% fewer FP escalations
- Throughput: 200–300 alerts/analyst/shift (up from 60–80)

### 1.2 Alert Prioritization

**What it does:** Risk-scores each alert by combining AI severity assessment with business context (asset criticality, user privilege level, threat actor targeting patterns) to produce an ordered work queue.

**AI Technique:** Multi-factor scoring model combining LLM context analysis + rule-based business weighting

**Risk Score Formula:**
```
Risk Score = (AI Threat Severity × 0.4)
           + (Asset Criticality Score × 0.25)
           + (User Privilege Score × 0.20)
           + (Threat Actor Targeting Match × 0.15)

Where each component is 0–100.
Final score 0–100: <30 Low, 30–60 Medium, 60–80 High, 80–100 Critical
```

**Business Context Weighting Examples:**
- Same alert on CEO laptop → +30 points vs. test environment → -20 points
- Alert during active ransomware campaign targeting your sector → +15 points
- Alert on PCI-in-scope system → +20 points
- Alert on system already isolated from network → -30 points

### 1.3 Alert Deduplication

**What it does:** Identifies duplicate or near-duplicate alerts from different tools or time windows, collapses them into a single investigation unit.

**AI Technique:** Embedding-based semantic similarity + temporal clustering

**Implementation:**
```python
from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('all-MiniLM-L6-v2')  # Or security-fine-tuned model

def deduplicate_alerts(alerts, threshold=0.92, time_window_minutes=60):
    """
    Group similar alerts within a time window.
    Returns: list of alert clusters
    """
    embeddings = model.encode([alert.description for alert in alerts])
    similarity_matrix = cosine_similarity(embeddings)
    
    clusters = []
    visited = set()
    
    for i, alert in enumerate(alerts):
        if i in visited:
            continue
        cluster = [alert]
        visited.add(i)
        for j in range(i+1, len(alerts)):
            if j not in visited:
                time_diff = abs((alerts[j].timestamp - alert.timestamp).minutes)
                if similarity_matrix[i][j] > threshold and time_diff < time_window_minutes:
                    cluster.append(alerts[j])
                    visited.add(j)
        clusters.append(cluster)
    
    return clusters
```

**Expected Impact:** 25–40% reduction in actionable alert queue through deduplication.

### 1.4 Alert Clustering

**What it does:** Groups alerts from the same attack session into a unified incident view, revealing the kill chain across multiple data sources.

**AI Technique:** Graph-based clustering + LLM narrative synthesis

**Clustering Dimensions:**
- Temporal: alerts within the same time window
- Entity: same host, user, or IP across alerts
- Behavioral: MITRE ATT&CK technique commonality
- Causal: process ancestry relationships

**Example Cluster Output:**
```
INCIDENT CLUSTER: Spear Phishing → Malware → Lateral Movement
Timeline: 14:23 → 14:47 → 15:12 (49 minutes total)

Alert 1 [14:23]: Phishing email delivered to finance@company.com (T1566.001)
Alert 2 [14:31]: Word.exe spawns PowerShell (T1059.001)
Alert 3 [14:33]: PowerShell downloads binary from 45.67.89.10 (T1105)
Alert 4 [14:47]: New process: svchost.exe with unusual parent (T1055)
Alert 5 [15:12]: SMB connection attempt to 3 internal hosts (T1021.002)

AI Assessment: Active compromise. Attacker progressing from initial access
to lateral movement. Immediate containment recommended.
```

---

## 2. Threat Intelligence Operations

### 2.1 Threat Intelligence Summarization

**What it does:** Ingests unstructured threat intelligence reports (PDFs, blog posts, ISAC feeds) and extracts structured intelligence: IOCs, TTPs, threat actors, targets, and defensive recommendations.

**AI Technique:** NLP extraction + structured output + entity recognition

**Intelligence Extraction Schema:**
```json
{
  "report_metadata": {
    "source": "Mandiant Threat Intelligence",
    "publication_date": "2026-07-15",
    "confidence": "HIGH"
  },
  "threat_actor": {
    "name": "APT41",
    "aliases": ["Double Dragon", "BARIUM"],
    "motivation": "Espionage + Financial",
    "targeting": ["Healthcare", "Technology", "Telecom"]
  },
  "iocs": {
    "ip_addresses": ["45.67.89.10", "102.34.56.78"],
    "domains": ["update-svc.com", "cdn-check.net"],
    "file_hashes": {
      "md5": ["a1b2c3..."],
      "sha256": ["deadbeef..."]
    }
  },
  "ttps": [
    {"technique": "T1190", "description": "Exploit public-facing Citrix"},
    {"technique": "T1059.003", "description": "PowerShell for persistence"}
  ],
  "defensive_recommendations": [
    "Block IOCs at perimeter",
    "Patch CVE-2026-XXXX on Citrix ADC",
    "Enable PowerShell ScriptBlock logging"
  ]
}
```

**Implementation Pattern:**
```python
async def extract_threat_intel(report_text: str, llm_client) -> ThreatReport:
    response = await llm_client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        system="""You are a threat intelligence analyst. Extract all structured 
        intelligence from this report. Return valid JSON matching the schema provided.""",
        messages=[{
            "role": "user", 
            "content": f"Extract intelligence from:\n\n{report_text}\n\nSchema: {THREAT_SCHEMA}"
        }]
    )
    return ThreatReport.model_validate_json(response.content[0].text)
```

### 2.2 IOC Extraction and Enrichment

**What it does:** Automatically extracts indicators from alert data, emails, files, and web content; enriches with threat intelligence; and distributes to blocking systems.

**IOC Extraction Sources:**
| Source Type | IOC Types | Extraction Method |
|------------|-----------|------------------|
| Email headers | IP, domain, URL | Regex + NLP |
| Email body | URL, hash, phone | NLP + regex |
| Malware report (PDF) | Hash, C2 IP, domain | PDF parser + LLM |
| Web page (phishing) | URL, form action, redirect | Browser automation + NLP |
| SIEM alert fields | IP, hash, domain | Structured field mapping |
| Sandbox report | Hash, mutex, registry key | JSON parsing + NLP |

**Enrichment Pipeline:**
```
Raw IOC
   ↓
Type Classification (IP / Domain / Hash / URL)
   ↓
Multi-source enrichment (parallel):
   ├── VirusTotal API
   ├── AlienVault OTX
   ├── Shodan (for IPs)
   ├── WHOIS + passive DNS
   ├── Internal threat intel platform (MISP)
   └── Historical alert database
   ↓
Confidence scoring and deconfliction
   ↓
Action recommendation:
   BLOCK_HIGH (score >80) | MONITOR (60-80) | WHITELIST (<30) | REVIEW (30-60)
   ↓
Distribution to:
   ├── Firewall/proxy blocklist
   ├── EDR block policy
   ├── Email gateway
   └── SIEM watchlist
```

### 2.3 MITRE ATT&CK Mapping

**What it does:** Automatically maps alert data, incident findings, and threat reports to MITRE ATT&CK technique IDs, enabling coverage gap analysis and detection improvement.

**Mapping Approaches:**

*Approach 1: Alert-to-Technique Mapping*
```
Alert: "PowerShell.exe executed with -EncodedCommand parameter, spawned by Word.exe"
↓
AI identifies: Parent-child process anomaly + encoded payload
↓
Mapped techniques:
  T1059.001 (Command and Scripting Interpreter: PowerShell)
  T1204.002 (User Execution: Malicious File)
  T1140 (Deobfuscate/Decode Files or Information)
```

*Approach 2: Coverage Heat Map Generation*
```python
# Generate ATT&CK coverage heat map from detection inventory
def generate_coverage_map(detections: list[Detection]) -> CoverageMap:
    technique_coverage = {}
    for detection in detections:
        for technique in detection.mitre_techniques:
            if technique not in technique_coverage:
                technique_coverage[technique] = {"status": "covered", "detections": []}
            technique_coverage[technique]["detections"].append(detection.id)
    
    # Identify gaps
    all_techniques = load_mitre_attack_techniques()
    gaps = [t for t in all_techniques if t.id not in technique_coverage]
    
    return CoverageMap(covered=technique_coverage, gaps=gaps)
```

---

## 3. Incident Operations

### 3.1 Incident Summarization

**What it does:** Generates a structured incident narrative from raw telemetry, alert data, and investigation findings for Tier 2/3 handoff or executive briefing.

**Multi-Source Narrative Generation:**
```
Inputs:
  - 47 correlated alerts (SIEM)
  - 3 endpoint process trees (EDR)
  - 12 network flow records
  - 2 malware sandbox reports
  - 1 threat actor intelligence report

Output: 3-paragraph incident summary with timeline, impact assessment, and recommended next steps
```

**Summarization Prompt Pattern:**
```
Given the following incident artifacts:
{artifacts_json}

Generate an incident summary that includes:
1. Timeline: What happened, in what order (be precise about timestamps)
2. Attack Pattern: Which MITRE ATT&CK techniques were observed
3. Impact: What systems/data/users were affected or at risk
4. Threat Actor: If attributable, who is responsible and their known TTPs
5. Current Status: What has been contained and what remains open
6. Recommended Actions: Top 3 immediate priorities

Write for a Tier 2 analyst who needs to take over this investigation.
Be factual. Reference specific evidence. Flag uncertainties clearly.
```

### 3.2 Executive Summaries

**What it does:** Generates executive-level incident briefings for CISO, CEO, or Board communication — translating technical findings into business impact language.

**Executive Summary Template:**
```
SECURITY INCIDENT EXECUTIVE BRIEF
Date: [Date] | Incident ID: [ID] | Status: [ACTIVE/CONTAINED/CLOSED]

WHAT HAPPENED (2 sentences, no technical jargon):
A sophisticated attacker gained access to our corporate email system through a
targeted phishing email sent to 3 executives. The attacker accessed email 
for approximately 4 hours before being detected and blocked.

BUSINESS IMPACT:
- Affected: 3 executive mailboxes (CEO, CFO, General Counsel)
- Data at risk: Strategic planning documents, M&A materials
- Financial exposure: Under assessment; legal counsel engaged
- Customer impact: None at this time

WHAT WE'VE DONE:
✓ Blocked attacker access (14:47 UTC)
✓ Preserved forensic evidence
✓ Notified legal counsel
✓ Initiated breach assessment

WHAT WE'RE DOING NOW:
→ Forensic investigation of accessed emails (ETA: 24 hours)
→ Notification assessment under [applicable regulation]
→ Enhanced monitoring on executive accounts

NEXT UPDATE: [Date/Time] or sooner if situation changes
```

### 3.3 Root Cause Analysis

**What it does:** Traces an incident backward from detection to origin — identifying the initial attack vector, vulnerabilities exploited, and control failures.

**AI-Assisted RCA Process:**
```
Step 1: CHRONOLOGICAL RECONSTRUCTION
  - Sort all evidence by timestamp
  - Identify first observed indicator (patient zero)
  - Map causal chain from first indicator to detected impact

Step 2: CONTROL FAILURE ANALYSIS
  - For each attack step: what control should have prevented it?
  - Why did that control fail? (misconfiguration / missing / bypassed / evaded)

Step 3: ROOT CAUSE IDENTIFICATION
  Categories: 
    VULNERABILITY: unpatched software, misconfiguration
    PROCESS: inadequate detection rule, missing playbook
    HUMAN: phishing victim, policy violation
    TOOL: EDR gap, logging failure

Step 4: CAUSAL CHAIN DIAGRAM
  Initial Access → Execution → Persistence → Lateral Movement → Exfiltration
  [CVE-2026-XXXX] → [PowerShell] → [Scheduled Task] → [SMB] → [S3 Upload]
  ↕ control failure: missing patch → ↕ EDR blocked but user overrode
```

---

## 4. Behavioral Analytics and UEBA

### 4.1 User Entity Behavior Analytics (UEBA)

**What it does:** Establishes behavioral baselines for users, devices, and applications; detects statistically anomalous behavior that may indicate compromise or insider threat.

**Baseline Components:**
| Entity Type | Behavioral Dimensions Baselined |
|------------|--------------------------------|
| User | Login hours, locations, access patterns, data volume, application usage |
| Device | Process execution patterns, network connections, USB usage, patch status |
| Service Account | API call patterns, resource access, time of day activity |
| Application | Query patterns, response sizes, error rates, geographic access |
| Cloud Resource | API call volume, configuration change frequency, network egress |

**Anomaly Scoring Model:**
```python
def compute_anomaly_score(entity: Entity, event: Event, 
                           baseline: Baseline) -> float:
    """
    Combines multiple anomaly signals into a single risk score.
    Returns: 0.0 (normal) to 1.0 (highly anomalous)
    """
    scores = {
        "time_anomaly": temporal_deviation(event.timestamp, baseline.typical_hours),
        "location_anomaly": geo_distance_score(event.ip, baseline.known_locations),
        "volume_anomaly": statistical_deviation(event.data_volume, baseline.daily_avg),
        "access_anomaly": access_pattern_deviation(event.resource, baseline.known_resources),
        "velocity_anomaly": velocity_score(event, baseline.historical_events)
    }
    
    # Weighted combination
    weights = {"time": 0.15, "location": 0.30, "volume": 0.20, "access": 0.25, "velocity": 0.10}
    return sum(scores[k] * weights[k.split("_")[0]] for k in scores)
```

### 4.2 Anomaly Detection Models

**Statistical Methods:**
- Z-score: for normally distributed metrics (login time, data volume)
- MAD (Median Absolute Deviation): robust to outliers, better for skewed distributions
- Isolation Forest: multi-dimensional anomaly in high-dimensional feature spaces
- LSTM Autoencoder: sequential anomaly detection for time-series behavior

**ML Methods:**
| Model | Best For | Training Data Need | Interpretability |
|-------|---------|-------------------|-----------------|
| Isolation Forest | Multi-dimensional outlier | Moderate (30 days) | Medium |
| One-class SVM | Known-normal classification | High (60+ days) | Low |
| LSTM Autoencoder | Sequential behavior | High (90+ days) | Low |
| Random Forest | Labeled anomaly classification | Labeled data | High |
| LLM-based | Contextual reasoning anomaly | Examples only | Very High |

### 4.3 Lateral Movement Detection

**Behavioral Signals for Lateral Movement:**
1. New SMB connections to hosts not previously accessed
2. Pass-the-Hash: NTLM authentication without prior Kerberos TGT request
3. Pass-the-Ticket: Kerberos TGT used from new IP different from ticket issuance IP
4. Admin share access (C$, ADMIN$) from non-administrative workstations
5. WMI remote execution events from unexpected sources
6. SSH from Windows host (abnormal behavior pattern)
7. RDP from server-to-server (usually user-to-server pattern)

**Graph-Based Detection:**
```
Model enterprise network as graph:
  Nodes: Hosts, Users, Service Accounts
  Edges: Communication relationships with frequency/recency weights

Detect:
  1. New edges (never-before-seen connections)
  2. Graph traversal patterns matching known lateral movement paths
  3. Shortest path from compromised node to crown jewel assets
  4. Betweenness centrality spikes (new hub in attack path)
```

### 4.4 Insider Threat Detection

**AI-Powered Insider Threat Indicators:**

| Category | Signal | AI Analysis |
|----------|--------|------------|
| Data Access | Accessing sensitive data outside normal pattern | Volume + type anomaly vs. baseline |
| Communication | Emailing competitors, personal webmail | Recipient analysis + content classification |
| Behavioral | Late-night logins, remote access spikes | Temporal anomaly |
| HR Correlation | Notice period, performance issues, grievances | Cross-system correlation |
| Activity Spike | Mass download before resignation | Pre-departure exfiltration pattern |

**Multi-Signal Fusion:**
```
Insider Risk Score = 
  Data_Exfiltration_Score (0-40 pts)
  + Communication_Anomaly_Score (0-25 pts)
  + Behavioral_Deviation_Score (0-20 pts)
  + HR_Indicators_Score (0-15 pts)

>60: Alert SOC + HR
>80: Immediate investigation
>90: Escalate to Legal + CISO
```

---

## 5. Cloud and Infrastructure Attack Detection

### 5.1 Cloud Attack Detection

**AWS CloudTrail Anomalies — AI Detection Patterns:**
```
High-value CloudTrail events to monitor:
  CreateUser / AttachUserPolicy (IAM privilege escalation)
  CreateAccessKey (credential creation for persistence)
  PutBucketAcl / PutBucketPolicy (storage exposure)
  CreateVpc / CreateInternetGateway (infrastructure creation for C2)
  GetSecretValue (credential access)
  DisableCloudTrailLogging (defense evasion — critical)
  ModifyDBInstance / CreateDBSnapshot (data access)
  StartInstances (large scale — possible cryptomining)

AI anomaly detection:
  - Volume anomaly: 10× normal API call rate
  - Geographic anomaly: API call from unexpected region
  - Time anomaly: administrative activity at unusual hours
  - New principal: first-time API caller from this account
  - Privilege escalation chain: GetPolicy → AttachPolicy → CreateUser
```

**Azure Activity Log Anomalies:**
```
Key Azure events for AI monitoring:
  microsoft.authorization/roleassignments/write (privilege escalation)
  microsoft.keyvault/vaults/secrets/read (credential access)
  microsoft.network/networksecuritygroups/write (perimeter change)
  microsoft.storage/storageaccounts/blobServices/containers/write (storage change)
  microsoft.compute/virtualmachines/extensions/write (persistence)
  Microsoft.AAD/signIns/* (identity anomalies)
```

### 5.2 Kubernetes Attack Detection

**Kubernetes Audit Log — AI Detection Targets:**
```
Critical events:
  exec into pod (kubectl exec) — especially privileged pods
  create serviceaccount with cluster-admin clusterrolebinding
  access secrets in kube-system namespace
  create hostPath volume mount
  set privileged: true in securityContext
  disable PodSecurityPolicy/NetworkPolicy
  access to node/metrics or node/stats endpoints
  create DaemonSet with host network access

Container escape indicators:
  Mount of / (root filesystem) into container
  CAP_SYS_ADMIN capability usage
  Namespace breakout via /proc/1/ns/
  Docker socket mount in container
```

**AI Kubernetes Security Posture:**
```python
async def analyze_k8s_audit_event(event: K8sAuditEvent) -> SecurityAssessment:
    """Analyze a Kubernetes audit event for security significance."""
    
    # High-risk verbs and resources
    if event.verb in ["exec", "create", "patch"] and \
       event.resource in ["pods/exec", "clusterrolebindings", "secrets"]:
        
        context = await gather_k8s_context(
            namespace=event.namespace,
            user=event.user,
            resource=event.resource
        )
        
        return await llm.assess_security(
            event=event,
            context=context,
            framework="MITRE ATT&CK Containers"
        )
```

---

## 6. Malware and Forensics

### 6.1 AI-Powered Malware Analysis

**Static Analysis AI Enhancement:**
- Disassembly interpretation: AI explains assembly code behavior in natural language
- String deobfuscation: AI decodes base64, XOR, ROT13, custom encodings
- Import analysis: AI explains DLL import table behavior patterns
- YARA rule generation: AI creates YARA rules from sample characteristics
- Similarity analysis: AI compares to known malware families via code embedding

**Dynamic Analysis AI Enhancement:**
- Behavior summarization: AI reads sandbox JSON report → narrative summary
- C2 protocol identification: AI identifies beaconing patterns from network traffic
- Evasion detection: AI identifies anti-analysis techniques (sleep, VM detection, sandbox evasion)
- Persistence mechanism identification: registry, scheduled tasks, WMI subscriptions

**Sample AI Malware Analysis Prompt:**
```
You are a malware analyst. I have a sandbox report for a suspicious file.

File hash: {sha256}
Sandbox report: {report_json}

Analyze this sample and provide:
1. MALWARE FAMILY: Best guess based on behavior (or "Unknown")
2. CAPABILITIES: List what this malware can do (keylog, screenshot, lateral movement, etc.)
3. C2 INFRASTRUCTURE: Identified C2 addresses and protocols
4. EVASION TECHNIQUES: How it tries to avoid detection
5. PERSISTENCE: How it maintains presence on the system
6. IOCs: All indicators of compromise
7. THREAT LEVEL: Critical/High/Medium/Low with justification
8. YARA RULE: A basic YARA detection rule

Be specific and cite evidence from the sandbox report.
```

### 6.2 AI-Assisted Digital Forensics and Incident Response (DFIR)

**Automated Evidence Collection:**
```
DFIR Collection Playbook (Automated):

1. ENDPOINT TRIAGE (5 minutes):
   □ Memory capture (RAM dump via agent)
   □ Running processes list with parent-child relationships
   □ Network connections (active + recent)
   □ Loaded DLLs and unsigned modules
   □ Scheduled tasks and services
   □ Recently modified/created files (7 days)
   □ Browser history and cached credentials
   □ Windows Event Logs (Security, System, Application, PowerShell)
   □ Prefetch files (execution history)
   □ Amcache.hve (program execution)

2. IDENTITY EVIDENCE:
   □ Login history (successful + failed)
   □ Token usage audit
   □ MFA logs
   □ Privileged access events

3. NETWORK EVIDENCE:
   □ DNS query logs (7 days)
   □ Proxy logs for suspect IPs/domains
   □ Email logs (sent/received)
   □ DLP events

4. CLOUD EVIDENCE (if applicable):
   □ CloudTrail/Activity Log (30 days)
   □ Cloud storage access logs
   □ Identity and access management changes
   □ Resource modification history
```

**AI Timeline Reconstruction:**
```
AI receives: 847 raw evidence artifacts from multiple sources
AI outputs:
  - Unified timeline sorted by UTC timestamp
  - Causal chain with confidence scoring
  - Evidence gaps (what's missing that would clarify the picture)
  - Attribution indicators (TTPs matching known actors)
  - Recommendation: what to collect next

Timeline sample output:
[2026-07-15 09:23:14] Email received: phishing@badactor.com → ceo@company.com (HIGH CONFIDENCE)
[2026-07-15 09:47:02] Word.exe opens attachment: Q2_Report.docm (HIGH CONFIDENCE)
[2026-07-15 09:47:18] Word.exe spawns PowerShell.exe -EncodedCommand ... (HIGH CONFIDENCE)
[2026-07-15 09:47:22] PowerShell downloads: hxxp://45.67.89[.]10/payload.exe (HIGH CONFIDENCE)
[2026-07-15 09:47:35] payload.exe creates scheduled task: "WindowsUpdate" (HIGH CONFIDENCE)
[2026-07-15 09:48:11] EVIDENCE GAP: No DNS logs for this period (collection failure)
[2026-07-15 10:12:44] SMB connection: WORKSTATION-01 → SERVER-FINANCE-02 (MEDIUM CONFIDENCE)
```

### 6.3 Memory Forensics AI

**AI-Enhanced Memory Analysis:**
- Process injection detection: AI identifies unusual memory regions (shellcode signatures)
- Process hollowing detection: PE header in non-standard memory location
- Rootkit indicators: DKOM (Direct Kernel Object Manipulation) artifacts
- Credential extraction artifacts: LSASS access patterns, Mimikatz indicators

**Volatility 3 + AI Integration:**
```python
import volatility3
from anthropic import Anthropic

async def ai_memory_analysis(memory_image_path: str) -> MemoryAnalysisReport:
    client = Anthropic()
    
    # Run Volatility plugins
    pslist = run_volatility_plugin("windows.pslist", memory_image_path)
    netscan = run_volatility_plugin("windows.netscan", memory_image_path)
    malfind = run_volatility_plugin("windows.malfind", memory_image_path)
    
    # AI analysis of results
    analysis = await client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        messages=[{
            "role": "user",
            "content": f"""Analyze these memory forensics results for signs of compromise:
            
            Process List: {pslist}
            Network Connections: {netscan}
            Suspicious Memory Regions: {malfind}
            
            Identify: injected processes, suspicious network activity, shellcode regions,
            potential credential access, and persistence mechanisms."""
        }]
    )
    
    return MemoryAnalysisReport.from_ai_response(analysis.content[0].text)
```

---

## 7. AI Detection Engineering

### 7.1 AI-Assisted Detection Rule Creation

**SIGMA Rule Generation from Threat Intel:**
```
Workflow:
  1. New threat intel report ingested
  2. AI extracts TTPs and behavioral patterns
  3. AI generates SIGMA rule
  4. Automated testing against historical data (false positive assessment)
  5. Human engineer reviews and approves
  6. Deployment to SIEM via Detection-as-Code pipeline

Example AI-generated SIGMA rule:
title: Cobalt Strike Named Pipe Patterns
status: experimental  
description: Detects Cobalt Strike default named pipe patterns
references:
  - https://attack.mitre.org/techniques/T1572/
tags:
  - attack.command_and_control
  - attack.t1572
logsource:
  category: pipe_created
  product: windows
detection:
  selection:
    PipeName|startswith:
      - '\postex_'
      - '\status_'
      - '\msagent_'
      - '\MSSE-'
  condition: selection
falsepositives:
  - Unlikely
level: high
```

### 7.2 AI Purple Teaming

**Autonomous Purple Team Cycle:**
```
1. AI Attack Generator:
   - Selects uncovered ATT&CK technique
   - Generates atomic test case
   - Executes in isolated test environment

2. Detection Validator:
   - Checks if SIEM triggered on atomic test
   - Checks if EDR detected the technique
   - Records: DETECTED / MISSED / PARTIAL

3. AI Detection Fixer:
   - For MISSED: generates new detection rule
   - For PARTIAL: improves existing rule
   - For DETECTED: validates false positive rate

4. Coverage Report:
   - Updated ATT&CK heat map
   - New rules in review queue
   - Trend: coverage improvement week-over-week
```

---

*Next: [Part 03 — Agentic SOC Architecture →](part-03-agentic-soc)*
