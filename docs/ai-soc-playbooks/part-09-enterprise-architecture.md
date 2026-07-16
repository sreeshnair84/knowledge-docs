---
title: "Part 09 — Enterprise Architecture Integration"
date: 2026-07-16
tags: ["togaf", "enterprise-architecture", "zero-trust", "capability-map", "cloud-landing-zone"]
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: pdf-converted
source_file: ""
---

# Part 09 — Enterprise Architecture Integration for AI SOC

**Audience:** Enterprise Architect, Cloud Architect, Security Architect
**Related:** [Part 03 — Agentic SOC](part-03-agentic-soc.md) | [Part 05 — SOAR Platforms](part-05-soar-platforms.md)

---

## 1. TOGAF Alignment for AI SOC

### Business Architecture

```
SOC Mission:
  "Protect enterprise assets through rapid detection, investigation,
   and response to cyber threats, with AI augmentation enabling
   comprehensive coverage at scale."

Value Streams:
  VS1: Threat Detection
    Input: Raw telemetry → AI triage → Actionable alerts
    Value metric: Reduce attacker dwell time

  VS2: Incident Response
    Input: Confirmed incident → AI investigation → Contained threat
    Value metric: Reduce breach impact

  VS3: Threat Intelligence
    Input: TI feeds → AI extraction + correlation → Detection rules
    Value metric: Proactive threat prevention

  VS4: Compliance Assurance
    Input: Controls framework → AI audit assistance → Evidence packages
    Value metric: Regulatory confidence

Stakeholder Map:
  CISO     ← SOC effectiveness, AI ROI, risk reduction
  CRO      ← Risk posture, breach probability reduction
  CFO      ← AI SOC cost vs traditional model ROI
  CTO      ← Platform architecture, AI infrastructure costs
  Legal    ← Evidence handling, AI-assisted incidents, GDPR
  Board    ← Cyber risk materiality, AI governance
  Regulators ← DORA, NIS2, SOC 2, EU AI Act compliance
```

### Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SOC APPLICATION LANDSCAPE                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                DETECTION LAYER                            │   │
│  │  SIEM        EDR         NDR          CSPM        UEBA   │   │
│  │  (Sentinel)  (Defender)  (Darktrace)  (Wiz)   (Sentinel) │   │
│  └────────────────────────────┬─────────────────────────────┘   │
│                               │ Alert streams                    │
│  ┌────────────────────────────▼─────────────────────────────┐   │
│  │                AI PROCESSING LAYER                        │   │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────┐  │   │
│  │  │ LLM Engine │  │ AI Agents    │  │ Knowledge Base  │  │   │
│  │  │ (Claude/   │  │ (Triage,     │  │ (RAG, Playbooks,│  │   │
│  │  │  GPT-4o)   │  │  Invest.,    │  │  Threat Intel)  │  │   │
│  │  │            │  │  Response)   │  │                 │  │   │
│  │  └────────────┘  └──────────────┘  └─────────────────┘  │   │
│  └────────────────────────────┬─────────────────────────────┘   │
│                               │ Orchestration                    │
│  ┌────────────────────────────▼─────────────────────────────┐   │
│  │                ORCHESTRATION LAYER                        │   │
│  │  SOAR (Sentinel Logic Apps / Splunk SOAR)                 │   │
│  │  Agent Framework (LangGraph / AutoGen / Strands)          │   │
│  │  Human Approval Gateway                                   │   │
│  └────────────────────────────┬─────────────────────────────┘   │
│                               │ Actions                          │
│  ┌────────────────────────────▼─────────────────────────────┐   │
│  │                RESPONSE LAYER                             │   │
│  │  EDR (isolate, kill process)   IAM (disable account)     │   │
│  │  Firewall (block IP)           DNS (sinkhole domain)      │   │
│  │  Cloud (quarantine resource)   Email (quarantine mail)    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  CROSS-CUTTING:                                                  │
│  Observability (Langfuse + Grafana)   Governance (OPA)          │
│  Identity (Entra ID + MID)            Secrets (Key Vault)        │
└─────────────────────────────────────────────────────────────────┘
```

### Data Architecture

```
Data Classification:
  TELEMETRY (high volume, 90 days hot / 1 year cold)
  └── Logs, network flows, process events, auth events
  └── Storage: SIEM/Log Analytics / OpenSearch

  EVIDENCE (medium volume, 3 years)
  └── Alert details, investigation notes, IOCs, artifacts
  └── Storage: Case management DB + S3/Blob

  KNOWLEDGE (low volume, permanent + versioned)
  └── Playbooks, threat intel, MITRE mappings, analyst notes
  └── Storage: Vector DB (Qdrant) + Knowledge graph (Neo4j)

  AI ARTIFACTS (medium volume, 2 years for audit)
  └── Prompts, completions, agent traces, tool calls
  └── Storage: Langfuse (self-hosted) + S3 backup

Data Flow:
  Source Systems → Streaming Ingest (Kafka/EventHub)
    → SIEM/Lake → AI Processing Pipeline
    → Evidence Store → Knowledge Base → Reporting

Data Governance:
  - PII redaction before AI processing
  - Evidence chain of custody via immutable store
  - Data residency enforcement per regulatory jurisdiction
  - Model training data provenance tracking
```

---

## 2. Capability Map

```
DETECTION CAPABILITY
  Telemetry Collection: endpoint · network · identity · cloud · application
  Detection Engineering: SIGMA · YARA · ML models · AI-assisted rule gen · purple team
  Alert Correlation: real-time alerts · multi-stage fusion · AI enrichment · dedup

INVESTIGATION CAPABILITY
  Alert Triage: AI severity scoring · IOC enrichment · asset context · UEBA risk
  Incident Investigation: attack chain · lateral movement · data exfil · malware analysis
  Threat Hunting: AI hypothesis gen · proactive IOC hunting · TTP-based hunting

RESPONSE CAPABILITY
  Containment: IP blocking · host isolation · account suspension · cloud quarantine
  Eradication: malware removal · persistence removal · credential reset
  Recovery: system restoration · service validation · AI recovery procedures
  Post-Incident: AI incident reports · lessons learned · detection improvements

THREAT INTELLIGENCE CAPABILITY
  Ingestion: MISP/STIX · commercial feeds · OSINT · AI TI extraction from reports
  Analysis: IOC correlation · threat actor profiling · campaign detection
  Operationalization: TI-to-detection rules · IOC dissemination · ISAC sharing

GOVERNANCE AND COMPLIANCE CAPABILITY
  AI Governance: model lifecycle · bias monitoring · audit trail · risk assessment
  Compliance: NIST CSF 2.0 mapping · ISO 27001/42001 evidence · regulatory reporting
  Performance: SOC KPIs · AI accuracy evaluation · analyst productivity analytics
```

---

## 3. Zero Trust Integration

### Zero Trust Principles Applied to AI SOC

| Principle | Traditional SOC | AI SOC Implementation |
|-----------|----------------|----------------------|
| Verify Explicitly | Trust network location | Verify agent identity + context + posture per action |
| Least Privilege | Admin credentials for SOC tools | Granular per-agent permissions (triage=read-only) |
| Assume Breach | Protect perimeter | Monitor all agent actions; kill switch always armed |

### Zero Trust Agent Identity

```python
class ZeroTrustAgentIdentity:
    """Each agent has its own managed identity with scoped permissions."""

    AGENT_PERMISSIONS = {
        "triage_agent":       ["logs.read", "threat_intel.read"],
        "investigation_agent": ["logs.read", "edr.read", "tickets.write"],
        "ir_agent":           ["logs.read", "edr.read", "edr.isolate", "firewall.block"]
    }

    def __init__(self, agent_type: str):
        self.agent_type = agent_type
        self.allowed_actions = self.AGENT_PERMISSIONS.get(agent_type, [])
        # Azure Managed Identity (no stored secrets)
        self.credential = ManagedIdentityCredential(
            client_id=os.environ[f"AGENT_CLIENT_ID_{agent_type.upper()}"]
        )

    def can_perform(self, action: str) -> bool:
        return action in self.allowed_actions

    def get_token(self, resource: str) -> str:
        """Short-lived tokens (15-min TTL) — re-authenticated every call."""
        return self.credential.get_token(resource).token
```

### Terraform: Agent Identity Infrastructure

```hcl
# Zero Trust identities for SOC AI agents
resource "azurerm_user_assigned_identity" "soc_agents" {
  for_each            = toset(["triage", "investigation", "ir", "orchestrator"])
  name                = "soc-agent-${each.key}-prod"
  resource_group_name = var.resource_group_name
  location            = var.location
}

# Triage agent — read-only to Sentinel
resource "azurerm_role_assignment" "triage_sentinel_reader" {
  scope                = azurerm_log_analytics_workspace.soc.id
  role_definition_name = "Log Analytics Reader"
  principal_id         = azurerm_user_assigned_identity.soc_agents["triage"].principal_id
}

# Custom role for IR agent — only specific containment actions
resource "azurerm_role_definition" "soc_ir_agent" {
  name        = "SOC IR Agent"
  scope       = "/subscriptions/${var.subscription_id}"
  description = "SOC IR agent containment actions — no delete/modify permissions"

  permissions {
    actions = [
      "Microsoft.Security/assessments/read",
      "Microsoft.Compute/virtualMachines/read"
    ]
    not_actions = [
      "Microsoft.Compute/virtualMachines/write",
      "Microsoft.Compute/virtualMachines/delete"
    ]
  }
}
```

---

## 4. Cloud Landing Zone Integration

### AWS Integration

```hcl
# GuardDuty → EventBridge → Step Functions → AI SOC
resource "aws_guardduty_detector" "main" {
  enable = true
  datasources {
    s3_logs          { enable = true }
    kubernetes { audit_logs { enable = true } }
    malware_protection {
      scan_ec2_instance_with_findings { ebs_volumes { enable = true } }
    }
  }
  finding_publishing_frequency = "FIFTEEN_MINUTES"
}

resource "aws_cloudwatch_event_rule" "guardduty_to_ai_soc" {
  name          = "guardduty-findings-to-ai-soc"
  event_pattern = jsonencode({
    source      = ["aws.guardduty"]
    detail-type = ["GuardDuty Finding"]
    detail      = { severity = [{ numeric = [">=", 7.0] }] }
  })
}

resource "aws_cloudwatch_event_target" "ai_soc_step_function" {
  rule     = aws_cloudwatch_event_rule.guardduty_to_ai_soc.name
  arn      = aws_sfn_state_machine.ai_soc_investigation.arn
  role_arn = aws_iam_role.event_bridge_sfn.arn
}

# Least-privilege IAM for triage agent
resource "aws_iam_policy" "soc_triage_read_only" {
  name = "soc-triage-read-only"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "guardduty:GetFinding", "guardduty:ListFindings",
          "securityhub:GetFindings", "cloudtrail:LookupEvents"
        ]
        Resource = "*"
      },
      {
        Effect   = "Deny"
        Action   = ["ec2:*", "iam:*", "s3:DeleteObject"]
        Resource = "*"
      }
    ]
  })
}
```

### Azure Integration (Sentinel)

```hcl
resource "azurerm_log_analytics_workspace" "sentinel" {
  name                = "soc-sentinel-prod"
  sku                 = "PerGB2018"
  retention_in_days   = 90
  cmk_for_query_forced = true  # Customer-managed key for GDPR
}

resource "azurerm_sentinel_automation_rule" "ai_triage" {
  name                       = "AI-Triage-High-Critical"
  log_analytics_workspace_id = azurerm_log_analytics_workspace.sentinel.id
  display_name               = "Route HIGH+ alerts to AI triage"
  order                      = 1

  condition_json = jsonencode([{
    conditionType = "PropertyCondition"
    conditionProperties = {
      propertyName   = "IncidentSeverity"
      operator       = "In"
      propertyValues = ["High", "Critical"]
    }
  }])

  action_playbook {
    logic_app_id = azurerm_logic_app_workflow.ai_triage.id
    tenant_id    = var.tenant_id
    order        = 1
  }
}
```

---

## 5. Event-Driven Alert Architecture

```python
class SOCAlertStreamProcessor:
    """Kafka-based alert routing to AI agents."""

    KAFKA_CONFIG = {
        'bootstrap.servers': 'kafka.soc.internal:9092',
        'security.protocol': 'SASL_SSL',
        'group.id': 'soc-ai-processor',
        'enable.auto.commit': False
    }

    TOPICS = ['soc.alerts.critical', 'soc.alerts.high', 'soc.alerts.medium']

    async def process(self, alert: dict) -> None:
        severity = alert['severity']

        if severity in ['CRITICAL', 'HIGH']:
            await self.triage_agent.analyze(alert)
        elif alert['type'] in ['MALWARE', 'RANSOMWARE']:
            await self.malware_agent.analyze(alert)
        else:
            await self.standard_pipeline.process(alert)
```

### Event Sourcing for Immutable Audit Trail

```python
class SOCEventStore:
    """Immutable event store — complete investigation reconstructable from events."""

    def append_event(self, investigation_id: str, event_type: str,
                     event_data: dict, actor: str) -> dict:
        event = {
            "investigation_id": investigation_id,
            "event_id": str(uuid.uuid4()),
            "event_type": event_type,
            "event_data": event_data,
            "actor": actor,
            "timestamp": datetime.utcnow().isoformat()
        }
        # HMAC signature for tamper evidence
        event_bytes = json.dumps(event, sort_keys=True).encode()
        event['signature'] = hmac.new(
            self.signing_key, event_bytes, hashlib.sha256
        ).hexdigest()

        self.table.put_item(Item=event)
        return event
```

---

## 6. Detection-as-Code Pipeline

```yaml
# GitHub Actions: Detection Rule CI/CD
name: SOC Detection CI/CD
on:
  push:
    paths: ['detections/**/*.yml', 'detections/**/*.sigma']
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Validate SIGMA rules
        run: sigma check detections/sigma/*.yml
      - name: Convert SIGMA to KQL
        run: |
          sigma convert --target microsoft-sentinel \
            --pipeline sysmon detections/sigma/*.yml \
            > detections/kql/generated_rules.json
      - name: Test against sample data
        run: |
          python tools/test_detection_rules.py \
            --rules detections/kql/ --samples tests/sample_data/
      - name: AI-assisted rule review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: python tools/ai_rule_reviewer.py --changed-files "${{ steps.changed-files.outputs.all_changed_files }}"
  deploy-production:
    needs: validate
    if: github.ref == 'refs/heads/main'
    environment: production
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production Sentinel
        run: |
          az sentinel alert-rule create \
            --workspace-name $PROD_WORKSPACE \
            --resource-group $RG \
            --rule-file detections/kql/generated_rules.json
```

---

## 7. Reference Architecture Summary

```
AI SOC ENTERPRISE REFERENCE ARCHITECTURE (2026)
══════════════════════════════════════════════════════════════

┌──────────────────────────────────────────────────────────┐
│             BUSINESS / GOVERNANCE LAYER                  │
│  CISO Dashboard · Risk Register · AI Ethics · Compliance │
└──────────────────────────┬───────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────┐
│             ANALYST EXPERIENCE LAYER                     │
│  SOC Portal · Copilot Chat · Approval Workflows          │
└──────────────────────────┬───────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────┐
│             AI ORCHESTRATION LAYER                       │
│  Triage Agent · Investigation Agent · Response Agent     │
│  LLM Router: Claude / GPT-4o / Gemini by task type       │
└──────────────────────────┬───────────────────────────────┘
                           │
┌──────────────────────────▼───────────────────────────────┐
│             DETECTION / SIEM LAYER                       │
│  Sentinel · Chronicle · Splunk · EDR · NDR · UEBA        │
└──────────────────────────┬───────────────────────────────┘
                           │ Telemetry
┌──────────────────────────▼───────────────────────────────┐
│             DATA SOURCES                                 │
│  Endpoints · Network · Identity · Cloud · Email          │
└──────────────────────────────────────────────────────────┘

CROSS-CUTTING (all layers):
  Observability: Langfuse + Grafana + OpenTelemetry
  Identity: Entra ID / AWS IAM + Managed Identities
  Secrets: Key Vault / AWS Secrets Manager
  Policy: OPA + Guardrails for AI behavior governance
  Audit: Immutable event store with cryptographic signing
```

---

*Next: [Part 10 — Standards & Regulatory Compliance →](part-10-standards-compliance)*
