---
title: "Part 04 — AI Automation Playbooks"
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["playbooks", "soar", "incident-response", "automation", "mitre-attack", "phishing", "ransomware"]
---

# Part 04 — AI Automation Playbooks

**Audience:** SOAR Engineers, Incident Responders, Detection Engineers, SOC Managers
**Related:** [Part 03 — Agentic SOC](./part-03-agentic-soc.md) | [Part 05 — SOAR Platforms](./part-05-soar-platforms.md)

> Every playbook in this section follows the complete AI Playbook Standard: Trigger → Inputs → AI Reasoning → Tools → Workflow → Decision Tree → Confidence Scoring → MITRE Mapping → Automation → Approval Gates → Rollback → Evidence → Reporting → KPIs → Failure Scenarios.

---

## Playbook Standard

All playbooks in this guide use the following standard structure:

```
┌─ TRIGGER: What fires this playbook
├─ INPUTS: Data fields required
├─ AI REASONING: What the AI agent evaluates
├─ TOOLS: Specific integrations required
├─ WORKFLOW: Step-by-step numbered process
├─ DECISION TREE: Branching logic
├─ CONFIDENCE SCORING: 0-100 scale and thresholds
├─ RISK SCORING: Business impact calculation
├─ MITRE ATT&CK: Specific technique IDs
├─ MITRE D3FEND: Defensive technique mappings
├─ AUTOMATION STEPS: API calls and tool actions
├─ APPROVAL GATES: Human authorization required
├─ ROLLBACK: How to undo automated actions
├─ EVIDENCE: What to collect and preserve
├─ REPORTING: Ticket and executive communication
├─ LESSONS LEARNED: Post-incident review
├─ KPIs: Metrics to track
└─ FAILURE SCENARIOS: What can go wrong
```

---

## PB-001: Phishing Email Detection and Response

### Trigger
- Email security gateway alert: phishing confidence score >70%
- User report: "Report Phishing" button click
- SIEM rule: multiple recipients of same suspicious email

### Inputs Required
- Email metadata: sender, recipients, subject, timestamp, message-id
- Email body (HTML and plain text)
- Attachments: filename, hash, type
- Links: URLs extracted
- Email headers: SPF, DKIM, DMARC results
- Sender domain WHOIS and reputation

### AI Reasoning
The AI agent evaluates:
1. Sender legitimacy: is SPF/DKIM/DMARC aligned? Is sender domain new/lookalike?
2. Link analysis: are URLs redirecting? Do they lead to login pages? New domain?
3. Attachment risk: is the hash known-malicious? Is the file type executable?
4. Content analysis: urgency language, impersonation, credential harvesting request
5. Target analysis: is the recipient a privileged user? Executive? Finance team?
6. Campaign correlation: are other employees receiving similar emails right now?

### Tools Required
| Tool | Purpose | API |
|------|---------|-----|
| Email Security Gateway | Retrieve full email | Proofpoint/Mimecast API |
| VirusTotal | Hash and URL reputation | VT REST API v3 |
| URLScan.io | URL detonation and screenshot | URLScan API |
| WHOIS + passive DNS | Sender domain age/history | WhoisXML API |
| LDAP/Azure AD | Recipient privilege level | MS Graph API |
| SIEM | Check if others received same email | KQL/SPL query |
| Sandboxing | Detonate attachment | Any.Run / Cuckoo API |

### Investigation Workflow
```
Step 1: INGESTION (Automated, 0-30 seconds)
  ├── Extract all email artifacts
  ├── Parse headers for authentication results
  └── Queue for AI analysis

Step 2: AI ENRICHMENT (Automated, 30-90 seconds)
  ├── Parallel enrichment: URL rep, hash rep, sender domain, WHOIS
  ├── Identify all recipients across organization
  └── Check for similar emails in past 24 hours

Step 3: AI VERDICT (Automated, 90-120 seconds)
  ├── Confidence ≥ 85%: Definitive verdict
  ├── Confidence 70-84%: Probable verdict with caveat
  └── Confidence < 70%: Escalate to analyst

Step 4: CONTAINMENT (Based on verdict + mode)
  ├── If HITL: Present to analyst for approval
  ├── If HOTL: Execute containment, notify analyst
  └── If mass campaign (>10 recipients): Always HITL

Step 5: RESPONSE
  ├── Block sender domain/IP at email gateway
  ├── Quarantine all copies of email in organization
  ├── Delete from user inboxes (if executive authorized)
  ├── Block URLs at web proxy
  └── Reset credentials if clicked (evidence only at this stage)

Step 6: USER NOTIFICATION
  ├── Alert user who reported: "Thank you, confirmed phishing"
  ├── Alert other recipients: "You received a phishing email - do not click"
  └── Brief security awareness note included

Step 7: INTELLIGENCE HARVEST
  ├── Extract all IOCs (URLs, IPs, hashes, domains)
  ├── Submit to MISP/threat intel platform
  └── Update email gateway threat feeds
```

### Decision Tree
```
Email Alert Received
        │
        ▼
SPF/DKIM/DMARC: FAIL?
   YES → +30 confidence pts
   NO  → +0 pts (may still be phishing)
        │
        ▼
Sender domain < 30 days old?
   YES → +25 pts
   NO  → +5 pts if lookalike domain
        │
        ▼
URL reputation: MALICIOUS in any TI feed?
   YES → AUTO-BLOCK (skip further checks) → Confidence 95+
   NO  → Continue
        │
        ▼
Attachment hash: MALICIOUS in VirusTotal?
   YES → AUTO-BLOCK + SANDBOX → Confidence 95+
   NO  → Continue
        │
        ▼
Content analysis: Credential harvest / urgency language?
   YES → +20 pts
   NO  → +0 pts
        │
        ▼
Total confidence score ≥ 85?
   YES → TP: Execute containment (per operating mode)
   NO if 70-84 → Probable TP: Analyst review
   NO if <70  → Suspicious: Low-priority analyst queue
```

### Confidence Scoring
| Score Range | Interpretation | Action |
|-------------|---------------|--------|
| 90–100 | Near-certain phishing | HOTL: auto-contain, notify analyst |
| 75–89 | High probability phishing | HITL: analyst approval required |
| 50–74 | Suspicious | Analyst review (low priority) |
| <50 | Likely benign | Close with logging |

### Risk Scoring
```
Risk Score = Base_Threat_Score × Recipient_Multiplier × Business_Context

Base Threat Score: 
  Definite phishing: 80 | Probable: 60 | Suspicious: 30

Recipient Multiplier:
  C-Suite: 2.0 | Finance team: 1.8 | IT admin: 1.5 | General staff: 1.0

Business Context:
  Active merger/acquisition period: +15 pts
  Tax/audit season: +10 pts
  Recent high-profile news about company: +10 pts

Final Risk Score >80 = P1 (immediate) | 60-80 = P2 | 40-60 = P3 | <40 = P4
```

### MITRE ATT&CK Mapping
| Technique | ID | Relevance |
|-----------|-----|-----------|
| Phishing | T1566 | Primary technique |
| Spearphishing Attachment | T1566.001 | If attachment present |
| Spearphishing Link | T1566.002 | If URL-only phishing |
| User Execution: Malicious File | T1204.002 | If user opened attachment |
| User Execution: Malicious Link | T1204.001 | If user clicked link |

### MITRE D3FEND Mapping
| D3FEND Technique | ID | Control |
|-----------------|-----|---------|
| Email Filtering | D3-EF | Gateway blocking |
| URL Analysis | D3-UA | Detonation sandbox |
| File Analysis | D3-FA | Attachment sandbox |
| Message Authentication | D3-MA | SPF/DKIM/DMARC enforcement |

### Automation Steps
```python
# Step 1: Get email details
email = await mcp.email_gateway.get_message(message_id=alert.message_id)

# Step 2: Parallel enrichment
async with asyncio.TaskGroup() as tg:
    url_results = tg.create_task(
        mcp.virustotal.check_urls(urls=email.extracted_urls))
    hash_results = tg.create_task(
        mcp.virustotal.check_hashes(hashes=email.attachment_hashes))
    domain_results = tg.create_task(
        mcp.whois.lookup(domain=email.sender_domain))
    recipient_info = tg.create_task(
        mcp.active_directory.get_user_risk_profiles(users=email.recipients))
    similar_emails = tg.create_task(
        mcp.siem.search(f"EmailMessage | where SenderAddress == '{email.sender}' | take 20"))

# Step 3: AI verdict
verdict = await ai_agent.analyze_phishing(
    email=email,
    enrichment={
        "urls": url_results.result(),
        "hashes": hash_results.result(),
        "sender_domain": domain_results.result(),
        "recipients": recipient_info.result(),
        "similar_emails": similar_emails.result()
    }
)

# Step 4: Containment (HOTL example)
if verdict.confidence >= 90:
    await mcp.email_gateway.quarantine_message(
        message_id=alert.message_id,
        organization_wide=True,
        reason=verdict.reasoning
    )
    await mcp.web_proxy.block_urls(
        urls=email.extracted_urls,
        category="phishing",
        duration_hours=24
    )
```

### Approval Gates
| Action | Mode | Approver |
|--------|------|---------|
| Quarantine single email | HOOL | No approval |
| Block sender domain | HOTL | Analyst notification |
| Organization-wide inbox sweep | HITL | Analyst approval |
| Block entire TLD | HITL | SOC Manager approval |
| Delete from all inboxes | HITL | CISO + Legal approval |

### Rollback
```
If quarantine was incorrect:
  1. Release email from quarantine: email_gateway.release(message_id)
  2. Notify recipient: "Email released - false positive"
  3. Remove IOCs from threat intel feeds
  4. Update ML model with false positive label
  5. Document in ticket

If domain block was incorrect:
  1. Remove domain from blocklist: web_proxy.unblock(domain)
  2. Log false positive for model improvement
  3. ETA: <5 minutes from rollback decision
```

### Evidence Preservation
```
Required artifacts:
  □ Original email in .eml format (RFC 5322)
  □ Email headers (complete, unmodified)
  □ Attachment file with hash chain
  □ URL screenshots from URLScan.io
  □ VT scan results (JSON export)
  □ AI analysis report
  □ Timeline of actions taken
  □ Human decisions with rationale

Retention: 90 days (PCI DSS) | 1 year (general) | 7 years (legal hold)
Storage: Legal-hold-enabled S3/Azure Blob with WORM policy
```

### KPIs
| Metric | Target |
|--------|--------|
| Time from alert to verdict | <2 minutes |
| Time from verdict to containment | <5 minutes |
| False positive rate | <5% |
| Email scope identified (% of recipients found) | >99% |
| User notification SLA | <30 minutes |

### Failure Scenarios
| Scenario | Detection | Fallback |
|----------|-----------|---------|
| Email gateway API timeout | HTTP 504 after 30s | Retry ×3, then manual |
| VT API rate limit | HTTP 429 | Use cached results + alternative TI feed |
| LDAP unavailable | Connection timeout | Treat as high-value recipient (safe default) |
| AI model unavailable | API error | Fall back to rule-based scoring |
| Email already deleted | 404 on retrieval | Work from SIEM telemetry |

---

## PB-002: Business Email Compromise (BEC)

### Trigger
- Behavioral analytics alert: executive email account sending unusual requests
- Financial system alert: unusual wire transfer request from executive email
- User report: suspicious email claiming to be CEO/CFO

### Inputs Required
- Sender email address and display name
- Email authentication results
- Sender account login history (last 30 days)
- Recipient: finance team, legal, HR
- Email content: financial request, urgency, wire details
- Sender account location and device data

### AI Reasoning
BEC requires understanding social context, not just technical indicators:
1. **Identity verification**: Is this account actually compromised or spoofed?
2. **Request analysis**: Is this a financial transfer request? HR data request? Gift card?
3. **Behavioral baseline**: Does this match the executive's normal communication style?
4. **Authentication verification**: Did SPF/DKIM pass? Is the display name different from the sending address?
5. **Process verification**: Did the process skip normal approval steps?
6. **Urgency indicators**: Is the request using deadline pressure to bypass verification?

### Decision Tree
```
BEC Alert
    │
    ▼
Is the SENDING ADDRESS the executive's real account?
   NO (spoofed) → T1566.002 Phishing | High confidence BEC
   YES (account send) → Account compromise suspected
        │
        ▼
Account compromise check:
   Recent login from new country? → YES: Very likely compromise
   Recent password change? → YES: Possible account takeover
   New device registered? → YES: Investigate
        │
        ▼
Does email request: wire transfer / gift cards / W2 data?
   YES → P1 escalation + Financial team alert
   NO  → Medium priority investigation
        │
        ▼
Contact executive through VERIFIED OUT-OF-BAND CHANNEL
   (Phone call using directory number — NOT reply to email)
   Legitimate: Close ticket + document
   Fraudulent: Initiate full IR
```

### MITRE ATT&CK Mapping
- T1566.002 Spearphishing Link
- T1534 Internal Spearphishing (if account compromised)
- T1078 Valid Accounts (if credentials stolen)
- T1110 Brute Force (if account initially compromised via spray)

### Critical Control: Out-of-Band Verification
```
MANDATORY for any BEC:
  AI generates pre-drafted phone script for analyst to use
  when calling executive to verify request legitimacy.
  
  "Hi [Name], this is [Analyst] from the Security team.
   We received an email from your account requesting [X].
   Can you confirm you sent this? [Wait for response]"
  
  DO NOT:
  × Reply to the suspicious email
  × Use phone number provided in the suspicious email
  × Chat via Teams/Slack thread created by the suspicious party
  
  DO:
  ✓ Use phone number from company directory
  ✓ Call personal mobile on file with HR
  ✓ Walk to their office if co-located
```

---

## PB-003: Malware Execution on Endpoint

### Trigger
- EDR alert: malicious process detected (confidence >85%)
- SIEM: process execution matching malware signature
- Network alert: C2 beaconing pattern from endpoint

### Inputs Required
- Hostname, IP, OS version, patch level
- Process name, path, hash, parent process, command line arguments
- Process creation time, user context
- Network connections from process
- File operations (created, modified, deleted)
- Registry changes
- Network traffic (DNS, HTTP, HTTPS)

### Workflow
```
Step 1: RAPID CONTEXT GATHERING (0-45 seconds)
  ├── Query EDR: full process tree, timeline, network connections
  ├── Hash lookup: VT, EDR cloud, internal threat intel
  ├── Asset lookup: criticality, owner, data classification
  └── User lookup: privilege level, HR status

Step 2: AI ANALYSIS (45-90 seconds)
  ├── Malware family identification
  ├── Behavioral classification (RAT, ransomware, infostealer, dropper, etc.)
  ├── C2 infrastructure identification
  └── Infection vector hypothesis

Step 3: CONTAINMENT DECISION
  ├── Critical server: HITL (risk of business disruption)
  ├── Standard workstation, confidence >90%: HOTL (isolate)
  └── Test/dev environment: HOOL (auto-isolate and sandbox)

Step 4: CONTAINMENT EXECUTION (if approved)
  ├── EDR: Isolate endpoint from network
  ├── EDR: Kill malicious process tree
  ├── EDR: Quarantine malicious files
  ├── Firewall: Block C2 IPs and domains
  └── SIEM: Create watchlist for IOCs

Step 5: FORENSIC PRESERVATION
  ├── Capture memory (RAM dump via agent)
  ├── Collect forensic artifacts (KAPE triage collection)
  ├── Preserve EDR telemetry (prevent overwrite)
  └── Timeline construction begins

Step 6: HUNT FOR SIBLINGS
  ├── Search for same hash/IOC across all endpoints
  ├── Search for same process name/path pattern
  ├── Search for same C2 connections
  └── Identify infected siblings for containment
```

### MITRE ATT&CK Mapping
| Phase | Technique | ID |
|-------|-----------|-----|
| Execution | PowerShell | T1059.001 |
| Execution | Windows Command Shell | T1059.003 |
| Persistence | Registry Run Keys | T1547.001 |
| Persistence | Scheduled Task | T1053.005 |
| Defense Evasion | Process Injection | T1055 |
| Defense Evasion | Masquerading | T1036 |
| C2 | Application Layer Protocol | T1071 |
| C2 | Ingress Tool Transfer | T1105 |

### Confidence Scoring
| Score | Basis | Action |
|-------|-------|--------|
| 95–100 | Hash in threat intel, signed malware signature | Isolate immediately (HOTL on workstation) |
| 85–94 | Behavioral match, behavioral sandbox | Isolate (HITL on server, HOTL on workstation) |
| 70–84 | Heuristic match, process anomaly | Quarantine process, analyst review |
| 50–69 | Low-confidence anomaly | Monitor + alert analyst |

---

## PB-004: Ransomware Active Encryption Detection

### Trigger
⚠️ **TIME-CRITICAL — P1 — HOOL Authorized**

- EDR: mass file modification (>100 files/minute with encryption entropy)
- EDR: shadow copy deletion (vssadmin.exe or wmic.exe)
- Endpoint: new extensions appearing on files (.locked, .encrypted, ransom-specific)
- Network: mass internal SMB connections (lateral spread)
- Backup system: backup deletion or tampering

### Inputs Required
- Endpoint details (host, IP, OS)
- Process responsible for encryption
- File modification rate and affected paths
- Shadow copy status
- Network connections (internal SMB/RDP attempts)
- User running the process

### ⚠️ SPEED IS THE ONLY PRIORITY

Ransomware spreads exponentially. Every second of delay means more encrypted files. This playbook uses **HOOL (full autonomy)** for immediate containment because:
1. The damage of false containment (temporary isolation) is far less than encryption of terabytes of data
2. Actions are reversible (remove network isolation)
3. This pattern has <1% false positive rate when all trigger conditions are met simultaneously

### Automated Response (HOOL — No Human Approval Required)
```
IMMEDIATE (within 30 seconds of trigger):
  T+0:   Alert SOC team (PagerDuty P1)
  T+5s:  EDR: ISOLATE infected endpoint from ALL network
  T+10s: Firewall: Block IP of infected endpoint
  T+15s: AD: Disable user account running ransomware process
  T+20s: EDR: Kill ransomware process tree
  T+25s: Backup system: Trigger emergency backup snapshot of unaffected shares
  T+30s: SIEM: Search for siblings (same process on other hosts)

PARALLEL (T+0 to T+60s):
  - Search for ransomware lateral spread to other endpoints
  - Identify if backup storage is reachable from infected host
  - Identify C2 infrastructure and block at perimeter
  - Preserve forensic evidence (memory, file system state)

HUMAN NOTIFICATION (T+0 — simultaneous with containment):
  - PagerDuty P1: SOC on-call engineer
  - Slack #incident-critical: Automated brief
  - SMS: SOC Manager, CISO
  - Email: Incident Response distribution list
```

### Decision Tree
```
Ransomware Trigger
       │
       ▼
Are ALL 3 signals present?
  □ Mass file modification (>100/min)
  □ Shadow copy deletion attempt
  □ Encryption-strength entropy in file changes
       │
ALL YES → HOOL: Auto-contain immediately
PARTIAL → HITL: Analyst must confirm within 2 minutes
       │
       ▼ (after containment)
Check for lateral spread:
  Other hosts with same process? → Isolate those too
  Backup system affected?        → Invoke DR plan
  Network shares encrypted?      → Volume assessment
```

### MITRE ATT&CK Mapping
| Technique | ID | Description |
|-----------|-----|-------------|
| Data Encrypted for Impact | T1486 | Core ransomware action |
| Inhibit System Recovery | T1490 | Shadow copy deletion |
| File and Directory Discovery | T1083 | Enumerating files to encrypt |
| Network Share Discovery | T1135 | Finding shared drives |
| Lateral Tool Transfer | T1570 | Spreading to other hosts |
| Windows Management Instrumentation | T1047 | Using WMI for propagation |

### Evidence Preservation (Critical)
```
BEFORE any remediation:
  □ Memory dump of infected system (volatile evidence first)
  □ Screenshot of screen (may show ransom note)
  □ Running process list at time of containment
  □ Network connection list at time of containment
  □ File system snapshot (last known good + current state)
  □ Registry hives (SYSTEM, SOFTWARE, SAM)
  □ Event logs (Security, System, Application - ALL)
  □ Browser history (infection vector investigation)
  □ EDR timeline export
  □ Ransom note copy (DO NOT PAY without legal/CISO approval)

WHY THIS MATTERS:
  Law enforcement and cyber insurance both require this.
  Evidence collected after cleanup is inadmissible.
  Chain of custody must be documented.
```

---

## PB-005: Credential Theft / Password Spray

### Trigger
- Identity protection: multiple failed authentications across accounts (>50 fails in 5 min)
- SIEM: same source IP attempting authentication to >10 unique accounts
- AD: numerous lockouts in short period
- Azure AD: identity protection risk detection

### Inputs Required
- Source IP(s) of authentication attempts
- List of targeted accounts and outcomes
- Authentication timestamps (pattern analysis)
- User-agent strings
- Target service (VPN, OWA, O365, Citrix)
- Geolocation of source IPs

### AI Analysis
```
The AI agent determines:

1. SPRAY vs BRUTE FORCE distinction:
   Spray: Many accounts, few attempts per account (evades lockout)
   Brute: Single account, many attempts (locked out quickly)
   → Different risk profiles and responses

2. SUCCESS INDICATOR:
   Any successful authentication from spray source?
   → YES: Immediate account disable + session revocation
   → NO: Continue monitoring, increase sensitivity

3. INTELLIGENCE ASSESSMENT:
   Is this a known password spray IP?
   Is this an automated tool (timing pattern, user-agent)?
   Is this targeting specific high-value accounts?

4. SCOPE ASSESSMENT:
   How many accounts were successfully compromised?
   Which services are at risk?
   Is this an ongoing or completed attack?
```

### Workflow
```
Step 1: SOURCE CHARACTERIZATION
  ├── IP reputation (known spray infrastructure?)
  ├── ASN analysis (VPN/proxy/datacenter?)
  ├── Geolocation (consistent with attacker profile?)
  └── Timing pattern (automated tool fingerprint?)

Step 2: SUCCESS CHECK (Priority)
  ├── Query IdP: any successful logins from spray source IPs?
  ├── If YES → IMMEDIATE account investigation
  └── If NO → Continue assessment

Step 3: TARGETED ACCOUNT ANALYSIS
  ├── Which accounts were targeted? (privileged, executive, finance?)
  ├── What services? (VPN gives network access, OWA gives email)
  └── Were any accounts successfully authenticated?

Step 4: RESPONSE
  ├── Block source IPs at perimeter (automatic if confidence >85%)
  ├── Force MFA step-up for targeted accounts
  ├── Notify targeted users
  └── If compromise confirmed: full account investigation
```

### MITRE ATT&CK
- T1110.003 Password Spraying
- T1110.001 Password Guessing (brute force variant)
- T1078 Valid Accounts (if successful)
- T1110.004 Credential Stuffing (if using leaked password list)

---

## PB-006: OAuth Abuse / Consent Phishing

### Trigger
- Azure AD: unusual OAuth application consent granted
- SIEM: user granted permissions to third-party app with high-risk scopes
- Email gateway: phishing email with OAuth consent link
- Identity protection: impossible travel after OAuth app consent

### What OAuth Abuse Looks Like
```
Attack Flow:
  1. Attacker registers malicious OAuth app
  2. Phishing email with OAuth consent link sent to victim
  3. Victim clicks link → authenticates to legitimate IdP
  4. Victim unknowingly grants app: Mail.Read, Files.ReadWrite, User.Read.All
  5. Attacker receives OAuth access token (valid credentials!)
  6. Attacker accesses mailbox, files, contacts — indefinitely
  
  The attacker never steals the password.
  MFA does not prevent this if victim consents.
  The access token persists until revoked.
```

### AI Reasoning
```
For each OAuth consent event, AI evaluates:
1. Application legitimacy:
   - Is app registered in known-good app catalog?
   - Publisher verified by Microsoft/Google?
   - App registered recently (high risk)?
   
2. Permission scope risk:
   - Mail.Read/Send → HIGH (email access)
   - Files.ReadWrite.All → HIGH (all file access)
   - User.Read.All → HIGH (all user data)
   - User.Read → LOW (just this user's profile)
   
3. Consent context:
   - Did a phishing email precede this consent?
   - Time between email receipt and consent?
   - User behavioral anomaly before/after?
```

### Automated Response
```
High-risk app + suspicious context → HITL approval:
  1. Disable OAuth application in tenant
  2. Revoke all OAuth tokens for this app
  3. Notify all users who consented to this app
  4. Search for data accessed via this app in last 90 days
  5. Block app registration at perimeter if possible
```

### MITRE ATT&CK
- T1528 Steal Application Access Token
- T1550.001 Use Alternate Authentication Material: Application Access Token
- T1566.002 Spearphishing Link (if phishing used to deliver consent URL)

---

## PB-007: Impossible Travel Alert

### Trigger
- Identity protection alert: same account authenticated from two geographically distant locations with insufficient travel time between them

### AI Reasoning
```
Impossible travel calculation:
  Login 1: New York, USA at 09:00 UTC
  Login 2: Moscow, Russia at 09:47 UTC
  Distance: 7,500 km
  Time difference: 47 minutes
  Required travel speed: 9,574 km/h
  Conclusion: IMPOSSIBLE (fastest commercial flight: 900 km/h)
  
AI considers:
  - VPN usage (could explain geography gap)
  - IPv6 geolocation inaccuracy (known issue)
  - User's travel history (did they fly yesterday?)
  - Cloud workload IP vs. user IP confusion
  - Known false positive patterns for this user
```

### Workflow
```
1. Validate impossibility:
   - Get both login IPs and geolocate
   - Calculate minimum travel time
   - Check if either IP is VPN/proxy
   
2. Context enrichment:
   - Is user known to use VPN? (check profile)
   - Did user recently travel? (check if they're on travel approval)
   - Are both IPs corporate VPN endpoints?
   
3. Determine confidence:
   - Both IPs are residential → HIGH confidence compromise
   - One IP is VPN server → LOWER confidence → investigate user VPN usage
   - Second IP from cloud service → False positive investigation
   
4. Response:
   - High confidence: Revoke sessions + Force MFA re-auth
   - Medium confidence: Notify user + Force MFA
   - Low confidence: Log + passive monitoring
```

---

## PB-008: MFA Fatigue / Push Bombing

### Trigger
- Identity protection: >5 MFA push notifications sent to same user in 30 minutes
- User reports: "I'm getting repeated MFA prompts I didn't request"
- SIEM: repeated authentication attempts with valid credentials (password correct, MFA pending)

### What MFA Fatigue Looks Like
```
Attacker has: Valid username + password (from credential spray/stuffing/darkweb)
Attacker sends: Repeated MFA push notifications to victim's phone
Victim thinks: "My phone is malfunctioning" → accepts push to make it stop
Attacker gets: Authenticated session

This is Lapsus$ Group's primary initial access technique (2022-2026).
```

### AI Response
```
Step 1: IMMEDIATE SESSION LOCK (HOOL)
  - Revoke current authentication attempt in progress
  - Rate-limit authentication to 1 attempt per 10 minutes
  
Step 2: USER NOTIFICATION (simultaneous)
  - SMS to user's registered phone: 
    "SECURITY ALERT: Someone is trying to access your account. 
     DO NOT approve any authentication requests. Call IT Security: [number]"
  
Step 3: CREDENTIAL ASSESSMENT
  - The fact that MFA push is firing = password is compromised
  - Begin credential reset process (HITL for execution)
  
Step 4: INVESTIGATION
  - Where did the login attempts originate?
  - What service was being targeted?
  - Is this user's password in breach databases?
  
Step 5: RESPONSE (after HITL approval)
  - Force password reset
  - Re-enroll MFA (using phishing-resistant FIDO2 if available)
  - Check for damage if any pushes were accepted
```

### MITRE ATT&CK
- T1621 Multi-Factor Authentication Request Generation
- T1078 Valid Accounts (password already known)
- T1110.004 Credential Stuffing (likely initial vector)

---

## PB-009: Insider Threat — Data Exfiltration

### Trigger
- DLP alert: large upload to personal cloud storage
- UEBA: anomalous data access volume (10× baseline)
- HR flag: employee on performance improvement plan or resignation notice
- Email DLP: mass email of sensitive files to personal address
- USB DLP: large file copy to removable media

### AI Reasoning
```
Insider threat requires careful handling:

1. SCOPE ASSESSMENT:
   - How much data? (size × sensitivity × destination)
   - What data? (IP, customer PII, financial, strategic)
   - Where did it go? (personal email, USB, cloud, competitor domain?)
   
2. INTENT DETERMINATION (harder):
   - Legitimate business reason? (working from home, authorized remote access)
   - Recent HR changes? (termination notice, promotion denied)
   - Behavioral anomalies? (unusual hours, after-hours access)
   
3. CONTEXT:
   - Does HR have any flags on this employee?
   - Has the employee accessed data relevant to competitors?
   - Is there a pattern over days/weeks or single event?

IMPORTANT: Insider threat investigations require LEGAL and HR involvement.
AI should NEVER autonomously take action against employees.
All findings go to Human Investigator + Legal Counsel + HR immediately.
```

### Escalation Path (Always HITL + Cross-functional)
```
SIEM Alert Fires
       ↓
AI produces initial assessment (no autonomous action)
       ↓
Immediate escalation to:
  - SOC Manager
  - HR Business Partner  
  - Legal Counsel
  - CISO (for high-value data)
       ↓
Human-led investigation begins:
  - AI provides investigation support only
  - All actions approved by Legal + HR
  - Chain of custody rigorously maintained
```

### Legal Considerations
- Disable employee access → Legal must confirm this is appropriate in jurisdiction
- Evidence collection → follows legal hold procedures
- Data preservation → not deletion (even if exfiltrated — need evidence)
- Law enforcement → CISO + Legal decision, not SOC autonomous action

---

## PB-010: Cloud Storage Bucket Public Exposure

### Trigger
- CSPM alert: S3 bucket / Azure Blob / GCS bucket changed to public
- Wiz / Prisma / Defender: public storage discovery
- SIEM: PutBucketAcl with "AllUsers" principal

### AI Assessment
```
Severity determination:
  1. WHAT IS IN THE BUCKET?
     - AI samples bucket content (first 100 objects)
     - Classifies: customer PII, credentials, code, backups, public-safe content
     
  2. HOW LONG WAS IT PUBLIC?
     - Check audit logs for when exposure started
     - Check access logs: was it accessed from external IPs?
     
  3. WAS DATA ACCESSED?
     - S3 Server Access Logs: external IP access to objects
     - Azure Audit Logs: anonymous blob reads
     - Risk: even brief exposure can be indexed by breach intelligence firms
     
  4. IS THIS INTENTIONAL?
     - Check if bucket was intentionally public (website hosting, public assets)
     - Who made the change? Was it approved?
     - Is there a change management ticket?
```

### Response Workflow
```
Step 1: IMMEDIATE REMEDIATION (HOTL if PII/credentials detected)
  - Restrict bucket to private (remove public ACL)
  - Remove any public read/write IAM policies
  - Enable bucket versioning (if not already enabled)
  - Enable access logging

Step 2: EXPOSURE ASSESSMENT
  - What data was in bucket at time of exposure?
  - Were credentials (API keys, passwords) exposed?
  - Was customer PII exposed? → Regulatory notification process begins
  - Duration of exposure?

Step 3: ACCESS LOG ANALYSIS
  - Who accessed the bucket while public?
  - Download logs and search for non-corporate IP access
  - Check for systematic enumeration (scraper pattern)

Step 4: NOTIFICATION (Legal-driven)
  - PII exposed → Data Protection Officer notified immediately
  - EU residents → GDPR Article 33: 72-hour notification clock starts
  - US state laws: California, New York breach notification requirements
  - Cyber insurance: notify per policy terms
```

### MITRE ATT&CK
- T1530 Data from Cloud Storage (if accessed)
- T1078.004 Valid Accounts: Cloud Accounts (if credentials in bucket)

---

## PB-011: Kubernetes Container Escape

### Trigger
- Falco alert: container attempting to read host filesystem
- Kubernetes audit log: exec into pod with privileged securityContext
- Network policy violation: pod communicating with node metadata service (169.254.169.254)
- SIEM: nsenter or chroot commands from container context

### Container Escape Techniques and Detection
| Escape Technique | Detection Signal | AI Correlation |
|-----------------|-----------------|----------------|
| Privileged container | Pod spec: privileged: true | Pod creation audit log |
| hostPath mount | Volume mount of / or /etc | PodSecurityPolicy violation |
| Docker socket mount | /var/run/docker.sock in container | Volume analysis |
| Kernel exploit | Abnormal syscall pattern | Falco rule: unexpected syscall |
| nsenter to host | nsenter command in container | Falco + process audit |
| Metadata API abuse | HTTP to 169.254.169.254 from pod | Network flow analysis |

### MITRE ATT&CK (Containers)
- T1611 Escape to Host
- T1613 Container and Resource Discovery
- T1552.005 Unsecured Credentials: Cloud Instance Metadata API
- T1610 Deploy Container

---

## PB-012: Windows Privilege Escalation

### Trigger
- EDR: process running with SYSTEM/Administrator tokens it shouldn't have
- SIEM: token impersonation events (SeImpersonatePrivilege usage)
- SIEM: scheduled task created by non-admin user with SYSTEM execution context
- EDR: DLL side-loading into privileged process

### AI Analysis
```
AI evaluates:
1. Escalation technique identification:
   - Token impersonation (PrintSpoofer, RoguePotato variants)
   - Service misconfiguration exploitation
   - Unquoted service paths
   - DLL hijacking
   - UAC bypass techniques
   
2. Severity assessment:
   - Achieved privilege level (SYSTEM vs. local admin vs. network admin)
   - Process tree: what ran after escalation?
   - Network activity post-escalation
   
3. Next step prediction:
   - Privilege escalation is rarely the end goal
   - What comes next: lateral movement? Persistence? Data access?
   - AI looks for follow-on activity already occurring
```

### MITRE ATT&CK
| Technique | ID |
|-----------|-----|
| Abuse Elevation Control Mechanism | T1548 |
| Token Impersonation/Theft | T1134 |
| Access Token Manipulation | T1134.001 |
| Scheduled Task/Job | T1053.005 |
| DLL Search Order Hijacking | T1574.001 |
| Unquoted Service Path | T1574.009 |

---

## PB-013: Suspicious PowerShell / LOLBins

### Trigger
- EDR: PowerShell with -EncodedCommand flag from unusual parent process
- EDR: PowerShell with -ExecutionPolicy Bypass
- SIEM: PowerShell downloading from internet (IEX(New-Object Net.WebClient).DownloadString)
- EDR: LOLBAS activity (mshta.exe, regsvr32.exe, certutil.exe, wscript.exe)

### Common LOLBins and Detection Patterns
```
PowerShell Living-off-the-Land:
  Invoke-Expression (IEX) + DownloadString → download + exec
  [Convert]::FromBase64String → decode + execute
  Start-Process -WindowStyle Hidden → stealth execution

LOLBins (Living off the Land Binaries):
  mshta.exe + URL → execute remote HTA file
  certutil.exe -decode → decode base64 payload  
  regsvr32.exe /s /n /u /i:URL → execute remote script
  wscript.exe/cscript.exe → execute JS/VBS payloads
  msiexec.exe /quiet /q → silent MSI installation
  rundll32.exe → execute DLL exports
  odbcconf.exe → REGSVR action abuse
```

### AI Command Analysis
```python
SUSPICIOUS_PATTERNS = [
    r'(?i)iex\s*\(.*downloadstring',     # Download + execute
    r'(?i)-encodedcommand\s+[A-Za-z0-9+/=]{50,}',  # Encoded payload
    r'(?i)-executionpolicy\s+(bypass|unrestricted)',  # Policy bypass
    r'(?i)\[convert\]::fromb64string',   # Base64 decode
    r'(?i)invoke-mimikatz',              # Credential dumping
    r'(?i)net\.webclient',               # Web download
    r'(?i)system\.reflection\.assembly::load', # Reflective load
]

async def analyze_powershell_command(command: str) -> PSAnalysis:
    """AI analysis of PowerShell command for maliciousness."""
    
    # First: regex pre-filter
    for pattern in SUSPICIOUS_PATTERNS:
        if re.search(pattern, command):
            return await ai_deep_analysis(command)
    
    # Otherwise: heuristic scoring
    return await ai_heuristic_analysis(command)
```

### MITRE ATT&CK
- T1059.001 Command and Scripting Interpreter: PowerShell
- T1027 Obfuscated Files or Information
- T1140 Deobfuscate/Decode Files
- T1218 System Binary Proxy Execution (LOLBins)

---

## PB-014: Command and Control (C2) Beaconing

### Trigger
- Network detection: regular periodic connections to external host (beaconing pattern)
- Firewall: connections to high-entropy domain names (DGA)
- DNS: high volume of NX domains from single host
- Network: encrypted traffic with unusual jitter patterns

### Beaconing Pattern Analysis
```
AI analyzes network flows for:

1. PERIODICITY: Regular intervals suggest automated C2 check-in
   - Exact regular (1200 seconds exactly): Low sophistication C2
   - Jittered (1200 ± random 120s): More advanced (Cobalt Strike default)
   - Irregular with pattern: Custom C2 or beacon randomization
   
2. DESTINATION CHARACTERISTICS:
   - Domain age (new domain = suspicious)
   - Domain entropy (high entropy = possible DGA)
   - IP geolocation (unexpected country)
   - IP reputation
   - Hosting provider (bulletproof hoster?)
   
3. TRAFFIC CHARACTERISTICS:
   - Small packet size (C2 check-in) with occasional large response (tasking)
   - TLS certificate characteristics (self-signed, unusual cert)
   - HTTP User-Agent anomaly (default Cobalt Strike User-Agent)
   - DNS query pattern (A record for C2 IP)

Cobalt Strike Default Profile Signatures:
  - Default User-Agent: "Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; BOIE9; ENUS)"
  - Default sleep: 60 seconds (jitter 0)
  - Default C2 path: /submit.php
  - Default HTTP header patterns
```

### MITRE ATT&CK
- T1071.001 Application Layer Protocol: Web Protocols (HTTP/S C2)
- T1071.004 Application Layer Protocol: DNS (DNS C2/tunneling)
- T1568 Dynamic Resolution (DGA domains)
- T1573 Encrypted Channel

---

## PB-015: Lateral Movement — Pass-the-Hash / Pass-the-Ticket

### Trigger
- SIEM: NTLM authentication without prior Kerberos TGT request (potential PtH)
- Sysmon: Event ID 4624 with Logon Type 3 (network) and Logon Process NTLM from unexpected source
- EDR: mimikatz or similar credential dumping tool detected
- Kerberos: Kerberos TGT presented from different source IP than where ticket was issued

### Pass-the-Hash Indicators
```
SIEM Detection (KQL — Microsoft Sentinel):
SecurityEvent
| where EventID == 4624
| where LogonType == 3  // Network logon
| where AuthenticationPackageName == "NTLM"
| where IpAddress !in (known_authorized_hosts)
| where TargetUserName !has "$"  // Not machine account
| where Computer !in (domain_controllers)  // Not from DC
| project TimeGenerated, Computer, TargetUserName, IpAddress, WorkstationName

Pass-the-Ticket Indicators:
  - Kerberos TGT used from different IP than where TGT was issued
  - Golden Ticket: TGT with abnormally long validity (>10 hours)
  - Overpass-the-Hash: NTLM hash converted to Kerberos ticket
```

### MITRE ATT&CK
- T1550.002 Pass the Hash
- T1550.003 Pass the Ticket
- T1558 Steal or Forge Kerberos Tickets
- T1558.001 Golden Ticket
- T1558.002 Silver Ticket

---

## PB-016: DNS Tunneling

### Trigger
- Network: abnormally long DNS query names (>50 chars in subdomain)
- DNS: unusually high DNS query volume from single host (>100 queries/min)
- DNS: queries for many unique subdomains of the same domain
- DNS: TXT or CNAME record types used excessively

### DNS Tunneling Detection
```
DNS Tunneling Characteristics:
  - High query rate: legitimate host queries DNS <10 times/minute
  - Long subdomain labels: legitimate rarely exceeds 30 chars
  - High entropy in subdomain: base64/hex encoded data
  - NXDOMAIN ratio: tunneling tools query many unique nonexistent names
  - TXT record abuse: TXT records used to exfiltrate data
  
AI Detection Query (Splunk SPL):
index=dns 
| eval domain_label_length=len(query)
| eval subdomain_entropy=entropy(mvindex(split(query,"."),0))
| where domain_label_length > 60 AND subdomain_entropy > 3.5
| stats count by src_ip, parent_domain
| where count > 50

Tools that use DNS tunneling:
  - iodine: IPv4 over DNS
  - DNScat2: C2 over DNS
  - dnsgrep/dnscat: data exfiltration
```

### MITRE ATT&CK
- T1071.004 Application Layer Protocol: DNS
- T1048.001 Exfiltration Over Alternative Protocol: Exfiltration Over Symmetric Encrypted Non-C2 Protocol
- T1132 Data Encoding (if encoding used in DNS payload)

---

## PB-017: Supply Chain Attack Detection

### Trigger
- Dependency check: known-malicious package version detected in build
- SIEM: unusual behavior from trusted software after update
- SBOM scan: new unknown dependency introduced
- Update server: software update from unexpected server

### What Supply Chain Attacks Look Like
```
SolarWinds Pattern (2020, still relevant):
  Trusted software (SolarWinds Orion) → auto-updated
  Update contained backdoor (SUNBURST)
  Backdoor activated 14 days after install (to evade sandbox)
  C2 communications mimicked legitimate SolarWinds traffic
  
3CX Pattern (2023):
  Legitimate VoIP software trojanized
  Malicious DLL loaded via DLL side-loading
  Payload phoned home to C2
  
PyPI/NPM Package Typosquatting:
  requests → requestss (typo package)
  Contains credential stealer
  Runs on pip install (setup.py)
```

### Detection Strategy
```
1. Build-time Controls:
   - Dependency pinning with hash verification
   - SBOM generation and comparison to trusted baseline
   - Package signature verification
   - Build provenance (SLSA framework compliance)
   
2. Runtime Controls:
   - Behavioral baselines for software behavior
   - Network connections from software processes (allowed destinations)
   - File system access patterns (software shouldn't touch /etc/passwd)
   - Child process creation (npm shouldn't spawn PowerShell)
   
3. Update Controls:
   - Update source verification (certificate pinning)
   - Update timing anomaly (update at 3 AM outside maintenance window)
   - Update size anomaly (3× larger than previous update)
```

### MITRE ATT&CK
- T1195 Supply Chain Compromise
- T1195.001 Compromise Software Dependencies and Development Tools
- T1195.002 Compromise Software Supply Chain
- T1072 Software Deployment Tools (update mechanism abuse)

---

## Playbook KPI Summary

| Playbook | MTTD Target | MTTR Target | Auto Rate | FP Rate |
|----------|------------|------------|----------|---------|
| Phishing | <2 min | <15 min | 85% | <5% |
| BEC | <5 min | <30 min | 30% | <8% |
| Malware | <3 min | <20 min | 70% | <3% |
| Ransomware | <60 sec | <5 min | 95% | <1% |
| Password Spray | <2 min | <15 min | 80% | <5% |
| OAuth Abuse | <5 min | <30 min | 60% | <8% |
| Impossible Travel | <2 min | <20 min | 65% | <10% |
| MFA Fatigue | <60 sec | <10 min | 85% | <2% |
| Insider Threat | <10 min | Human-led | 0% | N/A |
| Cloud Exposure | <5 min | <15 min | 80% | <3% |
| Container Escape | <2 min | <20 min | 75% | <5% |
| Privilege Escalation | <3 min | <20 min | 70% | <5% |
| LOLBins | <2 min | <15 min | 65% | <8% |
| C2 Beaconing | <10 min | <30 min | 75% | <5% |
| Lateral Movement | <5 min | <30 min | 70% | <5% |
| DNS Tunneling | <10 min | <30 min | 60% | <10% |
| Supply Chain | <15 min | Human-led | 20% | <5% |

---

*Next: [Part 05 — SOAR Platform Comparison →](./part-05-soar-platforms.md)*
