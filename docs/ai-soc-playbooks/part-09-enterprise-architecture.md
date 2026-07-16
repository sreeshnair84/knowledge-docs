---
title: "Part 09 — Enterprise Architecture Integration"
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["togaf", "enterprise-architecture", "zero-trust", "capability-map", "cloud-landing-zone"]
---

# Part 09 — Enterprise Architecture Integration for AI SOC

Integrating an AI-powered SOC into enterprise architecture requires alignment across business, application, technology, and data architecture layers. This guide maps the AI SOC to TOGAF, develops a full capability model, addresses zero-trust integration, and covers cloud landing zone security patterns.

---

## 1. TOGAF Alignment for AI SOC

### 1.1 Business Architecture

The AI SOC's business architecture must articulate clear value propositions to the enterprise:

```
BUSINESS ARCHITECTURE DOMAINS
═══════════════════════════════════════════════════════════════

SOC Mission:
  "Protect enterprise assets through rapid detection, investigation,
   and response to cyber threats, with AI augmentation enabling
   comprehensive coverage at scale."

Value Streams:
  ┌─────────────────────────────────────────────────────────┐
  │ VS1: Threat Detection Value Stream                       │
  │  Input: Raw telemetry → Process: AI triage → Output: Alerts│
  │  Value: Reduce attacker dwell time                       │
  │                                                          │
  │ VS2: Incident Response Value Stream                      │
  │  Input: Confirmed incident → Process: AI investigation   │
  │  Output: Contained, remediated threat                    │
  │  Value: Reduce breach impact                             │
  │                                                          │
  │ VS3: Threat Intelligence Value Stream                    │
  │  Input: TI feeds → Process: AI extraction + correlation  │
  │  Output: Actionable intelligence + detection rules       │
  │  Value: Proactive threat prevention                      │
  │                                                          │
  │ VS4: Compliance Assurance Value Stream                   │
  │  Input: Controls framework → Process: AI audit assistance│
  │  Output: Compliance reports, evidence packages          │
  │  Value: Regulatory confidence                            │
  └─────────────────────────────────────────────────────────┘

Stakeholder Map:
  CISO ←── SOC effectiveness, AI ROI, risk reduction
  CRO ←── Risk posture, breach probability reduction
  CFO ←── AI SOC cost vs traditional model ROI
  CTO ←── Platform architecture, AI infrastructure costs
  Legal ←── Evidence handling, AI-assisted incidents, GDPR
  Board ←── Cyber risk materiality, AI governance
  Business Units ←── Service availability, incident impact
  Regulators ←── DORA, NIS2, SOC 2, AI Act compliance
```

### 1.2 Application Architecture

```
AI SOC APPLICATION ARCHITECTURE (TOGAF Notation)
═══════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────┐
│                    SOC APPLICATION LANDSCAPE                     │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                DETECTION LAYER                            │   │
│  │  SIEM        EDR          NDR         CSPM        UEBA   │   │
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
│  CROSS-CUTTING                                                   │
│  Observability (Langfuse + Grafana)   Governance (OPA)          │
│  Identity (Entra ID + MID)            Secrets (Key Vault)        │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 Data Architecture

```
AI SOC DATA ARCHITECTURE
═══════════════════════════════════════════════════════════

Data Classification:
  TELEMETRY (HIGH VOLUME, SHORT RETENTION)
  └── Logs, network flows, process events, auth events
  └── Retention: 90 days hot, 1 year cold
  └── Storage: SIEM/Log Analytics / OpenSearch
  
  EVIDENCE (MEDIUM VOLUME, LONG RETENTION)
  └── Alert details, investigation notes, IOCs, artifacts
  └── Retention: 3 years (regulatory requirement)
  └── Storage: Case management DB + S3/Blob
  
  KNOWLEDGE (LOW VOLUME, PERSISTENT)
  └── Playbooks, threat intel, MITRE mappings, analyst notes
  └── Retention: Permanent with versioning
  └── Storage: Vector DB (Qdrant) + Knowledge graph (Neo4j)
  
  AI ARTIFACTS (MEDIUM VOLUME, AUDIT RETENTION)
  └── Prompts, completions, agent traces, tool calls
  └── Retention: 2 years for audit
  └── Storage: Langfuse (self-hosted) + S3 backup

Data Flow:
  Source Systems → Streaming Ingest (Kafka/EventHub) 
    → SIEM/Lake → AI Processing Pipeline 
    → Evidence Store → Knowledge Base → Reporting

Data Governance:
  - PII redaction before AI processing
  - Evidence chain of custody via blockchain/immutable store
  - Data residency enforcement per regulatory jurisdiction
  - Model training data provenance tracking
```

---

## 2. Capability Map for AI SOC

### 3-Level Capability Decomposition

```
LEVEL 1: DETECTION CAPABILITY
  LEVEL 2: Telemetry Collection
    LEVEL 3: Endpoint telemetry collection
    LEVEL 3: Network telemetry collection
    LEVEL 3: Identity telemetry collection
    LEVEL 3: Cloud telemetry collection
    LEVEL 3: Application telemetry collection
  LEVEL 2: Detection Engineering
    LEVEL 3: SIGMA rule development
    LEVEL 3: YARA rule development
    LEVEL 3: ML model development for anomaly detection
    LEVEL 3: AI-assisted detection rule generation
    LEVEL 3: Detection rule testing (purple team)
    LEVEL 3: Detection coverage gap analysis
  LEVEL 2: Alert Generation and Correlation
    LEVEL 3: Real-time alert generation
    LEVEL 3: Multi-stage incident correlation (Fusion)
    LEVEL 3: AI-powered alert enrichment
    LEVEL 3: Alert deduplication and suppression
    LEVEL 3: False positive management

LEVEL 1: INVESTIGATION CAPABILITY
  LEVEL 2: Alert Triage
    LEVEL 3: AI-driven severity scoring
    LEVEL 3: IOC enrichment via threat intelligence
    LEVEL 3: Asset context enrichment
    LEVEL 3: User/entity risk scoring
    LEVEL 3: Alert queue prioritization
  LEVEL 2: Incident Investigation
    LEVEL 3: Attack chain reconstruction
    LEVEL 3: Lateral movement tracing
    LEVEL 3: Data exfiltration analysis
    LEVEL 3: Malware analysis and classification
    LEVEL 3: Log forensics and timeline reconstruction
    LEVEL 3: AI-generated investigation narratives
  LEVEL 2: Threat Hunting
    LEVEL 3: Hypothesis generation (AI-assisted)
    LEVEL 3: Proactive IOC hunting
    LEVEL 3: Behavioral anomaly hunting
    LEVEL 3: TTP-based hunting
    LEVEL 3: Dark web monitoring

LEVEL 1: RESPONSE CAPABILITY
  LEVEL 2: Containment
    LEVEL 3: Automated IP blocking
    LEVEL 3: Host isolation (EDR)
    LEVEL 3: Account suspension
    LEVEL 3: Network segmentation
    LEVEL 3: Cloud resource quarantine
  LEVEL 2: Eradication
    LEVEL 3: Malware removal
    LEVEL 3: Persistence removal
    LEVEL 3: Credential reset at scale
    LEVEL 3: Patch deployment orchestration
  LEVEL 2: Recovery
    LEVEL 3: Clean system restoration
    LEVEL 3: Service restoration validation
    LEVEL 3: AI-generated recovery procedures
  LEVEL 2: Post-Incident Activities
    LEVEL 3: AI-generated incident reports
    LEVEL 3: Lessons learned extraction
    LEVEL 3: Detection improvement recommendations
    LEVEL 3: Playbook update automation

LEVEL 1: THREAT INTELLIGENCE CAPABILITY
  LEVEL 2: TI Ingestion and Processing
    LEVEL 3: MISP/STIX ingestion
    LEVEL 3: Commercial TI feed ingestion
    LEVEL 3: OSINT collection
    LEVEL 3: AI-powered TI extraction from reports
  LEVEL 2: TI Analysis and Fusion
    LEVEL 3: IOC correlation across sources
    LEVEL 3: Threat actor profiling
    LEVEL 3: Campaign detection
    LEVEL 3: AI-generated threat briefings
  LEVEL 2: TI Operationalization
    LEVEL 3: TI-to-detection rule generation
    LEVEL 3: IOC dissemination to security controls
    LEVEL 3: Threat intel sharing (ISACs)

LEVEL 1: KNOWLEDGE MANAGEMENT CAPABILITY
  LEVEL 2: Playbook Management
    LEVEL 3: Playbook authoring and testing
    LEVEL 3: Playbook version control (GitOps)
    LEVEL 3: AI-assisted playbook generation
    LEVEL 3: Playbook effectiveness measurement
  LEVEL 2: Institutional Knowledge
    LEVEL 3: Incident knowledge base maintenance
    LEVEL 3: SOC wiki and runbook management
    LEVEL 3: AI-powered knowledge retrieval (RAG)
  LEVEL 2: Skills and Training
    LEVEL 3: Analyst certification management
    LEVEL 3: AI-assisted training (simulation)
    LEVEL 3: Skill gap analysis

LEVEL 1: GOVERNANCE AND COMPLIANCE CAPABILITY
  LEVEL 2: AI Governance
    LEVEL 3: AI model lifecycle management
    LEVEL 3: AI bias and fairness monitoring
    LEVEL 3: AI audit trail management
    LEVEL 3: AI risk assessment
  LEVEL 2: Compliance Management
    LEVEL 3: NIST CSF 2.0 control mapping
    LEVEL 3: ISO 27001/42001 evidence collection
    LEVEL 3: Regulatory reporting automation
    LEVEL 3: AI-assisted compliance gap analysis
  LEVEL 2: Performance Management
    LEVEL 3: SOC KPI measurement and reporting
    LEVEL 3: AI performance evaluation
    LEVEL 3: Analyst productivity analytics
    LEVEL 3: ROI measurement
```

---

## 3. Zero Trust Integration with AI SOC

### 3.1 Zero Trust Principles Applied to AI SOC

```
ZERO TRUST AI SOC ARCHITECTURE
═══════════════════════════════════════════════════════════

PRINCIPLE 1: VERIFY EXPLICITLY
  Traditional: Trust network location
  ZT AI SOC: Verify identity + context + posture for every AI action

  Implementation:
  ┌─────────────────────────────────────────────────────┐
  │ AI Agent Identity Verification                       │
  │  - Workload Identity Federation (Entra ID/AWS IAM)  │
  │  - Short-lived tokens (15-minute TTL)               │
  │  - Mutual TLS for service-to-service communication  │
  │  - Attestation: agent binary hash verification      │
  └─────────────────────────────────────────────────────┘

PRINCIPLE 2: USE LEAST PRIVILEGE ACCESS
  Traditional: Admin credentials for SOC tools
  ZT AI SOC: Granular permissions per agent, per task, per time window

  Implementation:
  ┌─────────────────────────────────────────────────────┐
  │ Per-Agent Permission Model                          │
  │  Triage Agent:   READ logs, READ TI                 │
  │  Enrich Agent:   READ logs, CALL TI APIs            │
  │  Response Agent: WRITE firewall, WRITE EDR (approved│
  │                  actions only, rate-limited)         │
  │  Report Agent:   READ investigation, WRITE tickets  │
  └─────────────────────────────────────────────────────┘

PRINCIPLE 3: ASSUME BREACH
  Traditional: Protect perimeter
  ZT AI SOC: Assume AI agents can be compromised; monitor all actions

  Implementation:
  ┌─────────────────────────────────────────────────────┐
  │ Continuous AI Agent Monitoring                       │
  │  - All tool calls logged to immutable audit store   │
  │  - Anomaly detection on agent behavior patterns     │
  │  - Kill switch for immediate agent termination      │
  │  - Blast radius limiting per agent                  │
  └─────────────────────────────────────────────────────┘
```

### 3.2 AI Agent Identity Architecture (Zero Trust)

```python
# Zero Trust identity for AI agents using Workload Identity Federation
# Azure implementation

from azure.identity import WorkloadIdentityCredential, ManagedIdentityCredential
from azure.keyvault.secrets import SecretClient
from azure.mgmt.authorization import AuthorizationManagementClient

class ZeroTrustAgentIdentity:
    """
    Implements Zero Trust identity model for SOC AI agents.
    Each agent has its own managed identity with scoped permissions.
    """
    
    def __init__(self, agent_type: str, environment: str):
        self.agent_type = agent_type
        self.environment = environment
        
        # Use Managed Identity (no stored secrets)
        self.credential = ManagedIdentityCredential(
            client_id=self._get_agent_client_id(agent_type)
        )
    
    def get_siem_token(self) -> str:
        """Get scoped token for SIEM access"""
        token = self.credential.get_token(
            "https://management.azure.com/.default",
            tenant_id=self.tenant_id
        )
        return token.token
    
    def get_edr_token(self) -> str:
        """
        Get token for EDR access.
        Response agents only — not available to triage agents.
        """
        if self.agent_type not in ['response_agent', 'orchestrator_agent']:
            raise PermissionError(
                f"Agent type {self.agent_type} does not have EDR access"
            )
        return self.credential.get_token("https://api.securitycenter.microsoft.com/.default").token
    
    def _get_agent_client_id(self, agent_type: str) -> str:
        """Map agent type to its managed identity client ID"""
        agent_identity_map = {
            "triage_agent": "agt-triage-prod-001",
            "enrichment_agent": "agt-enrich-prod-001",
            "investigation_agent": "agt-invest-prod-001",
            "response_agent": "agt-response-prod-001",
            "orchestrator_agent": "agt-orch-prod-001"
        }
        return os.environ.get(
            f"AGENT_CLIENT_ID_{agent_type.upper()}",
            agent_identity_map.get(agent_type)
        )

# Terraform for Zero Trust agent identities
ZT_AGENT_TERRAFORM = """
# Zero Trust identities for SOC AI agents
resource "azurerm_user_assigned_identity" "soc_agents" {
  for_each            = toset(["triage", "enrichment", "investigation", "response", "orchestrator"])
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

# Response agent — write to Defender for Endpoint
resource "azurerm_role_assignment" "response_defender" {
  scope                = "/subscriptions/${var.subscription_id}"
  role_definition_name = "Security Reader"  # Base
  principal_id         = azurerm_user_assigned_identity.soc_agents["response"].principal_id
}

# Custom role for response agent — only specific EDR actions
resource "azurerm_role_definition" "soc_response_agent" {
  name        = "SOC Response Agent"
  scope       = "/subscriptions/${var.subscription_id}"
  description = "Allows SOC response agent to take containment actions"
  
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
"""
```

### 3.3 Continuous Authorization for Long-Running Investigations

```python
class ContinuousAuthorizationManager:
    """
    Implements continuous authorization for AI agents during
    long-running investigations (Zero Trust principle).
    Tokens expire and must be re-validated.
    """
    
    TOKEN_TTL_SECONDS = 900  # 15-minute tokens
    
    def __init__(self, agent_identity: ZeroTrustAgentIdentity):
        self.identity = agent_identity
        self.token_cache = {}
        self.token_expiry = {}
    
    def get_authorized_token(self, resource: str) -> str:
        """Get valid token, refreshing if expired"""
        
        if self._is_token_valid(resource):
            return self.token_cache[resource]
        
        # Token expired or not present — re-authenticate
        new_token = self._authenticate_for_resource(resource)
        self.token_cache[resource] = new_token
        self.token_expiry[resource] = time.time() + self.TOKEN_TTL_SECONDS
        
        # Audit the re-authentication event
        self.audit_log.record(
            event_type="agent_token_refresh",
            agent_id=self.identity.agent_type,
            resource=resource,
            timestamp=datetime.utcnow().isoformat()
        )
        
        return new_token
    
    def _is_token_valid(self, resource: str) -> bool:
        if resource not in self.token_cache:
            return False
        if time.time() > self.token_expiry.get(resource, 0) - 60:  # 60-second buffer
            return False
        # Also verify agent is still authorized via policy engine
        return self.policy_engine.is_agent_authorized(
            agent_id=self.identity.agent_type,
            resource=resource
        )
```

---

## 4. Cloud Landing Zone Security Integration

### 4.1 AWS Security Landing Zone + AI SOC

```
AWS AI SOC INTEGRATION ARCHITECTURE
════════════════════════════════════════════════════════════════

Data Sources → Security Lake
  ┌─────────────────────────────────────────────────────────┐
  │ GuardDuty findings                                       │
  │ CloudTrail logs (API calls, console actions)             │
  │ VPC Flow Logs                                           │
  │ S3 Access Logs                                          │
  │ AWS Config compliance findings                          │
  │ AWS Inspector vulnerability findings                     │
  │ Macie data classification findings                      │
  │ SecurityHub aggregated findings                         │
  └──────────────────────────┬──────────────────────────────┘
                             │ OCSF normalized
  ┌──────────────────────────▼──────────────────────────────┐
  │ Amazon Security Lake (S3 + Glue + Athena)                │
  │ OCSF Schema, partitioned by account/region/day           │
  └──────────────────────────┬──────────────────────────────┘
                             │
  ┌──────────────────────────▼──────────────────────────────┐
  │ AI SOC Processing Layer                                  │
  │  Amazon Bedrock (Claude/Titan) for LLM                  │
  │  AWS AgentCore for agent hosting                        │
  │  Step Functions for playbook orchestration              │
  │  Lambda for custom enrichment functions                 │
  │  EventBridge for alert routing                          │
  └──────────────────────────┬──────────────────────────────┘
                             │ Containment actions
  ┌──────────────────────────▼──────────────────────────────┐
  │ AWS Response Actions                                     │
  │  Systems Manager: isolate EC2 instance                  │
  │  IAM: disable access keys, detach policies              │
  │  WAF: block IPs, add rules                              │
  │  Security Groups: modify inbound rules                  │
  │  GuardDuty: mark findings, archive                      │
  └─────────────────────────────────────────────────────────┘
```

**Terraform for AWS AI SOC Foundation**:

```hcl
# AWS AI SOC Foundation Infrastructure
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Security Lake for centralized telemetry
resource "aws_securitylake_data_lake" "soc" {
  meta_store_manager_role_arn = aws_iam_role.security_lake_meta.arn
  
  configuration {
    region = var.primary_region
    
    lifecycle_configuration {
      transitions {
        days          = 90
        storage_class = "ONEZONE_IA"
      }
      transitions {
        days          = 365
        storage_class = "GLACIER"
      }
      expiration {
        days = 2555  # 7 years
      }
    }
    
    replication_configuration {
      role_arn = aws_iam_role.security_lake_replication.arn
      regions  = var.replication_regions
    }
  }
}

# GuardDuty as primary detection engine
resource "aws_guardduty_detector" "main" {
  enable = true
  
  datasources {
    s3_logs {
      enable = true
    }
    kubernetes {
      audit_logs { enable = true }
    }
    malware_protection {
      scan_ec2_instance_with_findings {
        ebs_volumes { enable = true }
      }
    }
  }
  
  finding_publishing_frequency = "FIFTEEN_MINUTES"
}

# EventBridge rule to route findings to AI SOC
resource "aws_cloudwatch_event_rule" "guardduty_to_ai_soc" {
  name        = "guardduty-findings-to-ai-soc"
  description = "Route GuardDuty HIGH/CRITICAL findings to AI SOC agent"
  
  event_pattern = jsonencode({
    source      = ["aws.guardduty"]
    detail-type = ["GuardDuty Finding"]
    detail = {
      severity = [{ numeric = [">=", 7.0] }]  # HIGH and CRITICAL only
    }
  })
}

resource "aws_cloudwatch_event_target" "ai_soc_step_function" {
  rule      = aws_cloudwatch_event_rule.guardduty_to_ai_soc.name
  target_id = "ai-soc-investigation"
  arn       = aws_sfn_state_machine.ai_soc_investigation.arn
  role_arn  = aws_iam_role.event_bridge_sfn.arn
}

# Step Functions for AI SOC playbook orchestration
resource "aws_sfn_state_machine" "ai_soc_investigation" {
  name     = "ai-soc-investigation-playbook"
  role_arn = aws_iam_role.step_functions_role.arn
  
  definition = jsonencode({
    Comment = "AI SOC automated investigation playbook"
    StartAt = "TriageAlert"
    States = {
      TriageAlert = {
        Type     = "Task"
        Resource = "arn:aws:states:::bedrock:invokeModel"
        Parameters = {
          ModelId = "anthropic.claude-3-5-sonnet-20241022-v2:0"
          Body = {
            "anthropic_version" = "bedrock-2023-05-31"
            "max_tokens"        = 2048
            "messages" = [{
              "role"    = "user"
              "content.$" = "States.Format('Triage this GuardDuty finding: {}', States.JsonToString($.detail))"
            }]
          }
        }
        Next = "CheckSeverity"
      }
      CheckSeverity = {
        Type = "Choice"
        Choices = [
          {
            Variable     = "$.triage_result.severity"
            StringEquals = "CRITICAL"
            Next         = "EscalateToHuman"
          },
          {
            Variable     = "$.triage_result.severity"
            StringEquals = "HIGH"
            Next         = "AutoContainment"
          }
        ]
        Default = "EnrichAndClose"
      }
      AutoContainment = {
        Type     = "Task"
        Resource = "arn:aws:states:::lambda:invoke"
        Parameters = {
          FunctionName = aws_lambda_function.soc_containment.arn
          "Payload.$"  = "$"
        }
        Next = "NotifySOCTeam"
      }
      EscalateToHuman = {
        Type     = "Task"
        Resource = "arn:aws:states:::sns:publish"
        Parameters = {
          TopicArn = aws_sns_topic.soc_escalations.arn
          "Message.$" = "$.triage_result.summary"
        }
        End = true
      }
    }
  })
}

# IAM role for SOC AI agents — least privilege
resource "aws_iam_role" "soc_triage_agent" {
  name = "soc-triage-agent-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "bedrock.amazonaws.com" }
      Action    = "sts:AssumeRole"
      Condition = {
        StringEquals = {
          "aws:SourceAccount" = var.account_id
        }
      }
    }]
  })
}

resource "aws_iam_policy" "soc_triage_read_only" {
  name = "soc-triage-read-only"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "guardduty:GetFinding",
          "guardduty:ListFindings",
          "securityhub:GetFindings",
          "cloudtrail:LookupEvents"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject"
        ]
        Resource = "${aws_s3_bucket.security_lake.arn}/aws/AMAZON_GUARDDUTY/*"
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

### 4.2 Azure Sentinel Landing Zone

```hcl
# Azure AI SOC Foundation
resource "azurerm_log_analytics_workspace" "sentinel" {
  name                = "soc-sentinel-prod"
  location            = var.location
  resource_group_name = var.resource_group_name
  sku                 = "PerGB2018"
  retention_in_days   = 90
  
  # Customer-managed key for GDPR compliance
  cmk_for_query_forced = true
}

resource "azurerm_sentinel_log_analytics_workspace_onboarding" "main" {
  workspace_id = azurerm_log_analytics_workspace.sentinel.id
}

# Automation rule for AI triage
resource "azurerm_sentinel_automation_rule" "ai_triage" {
  name                       = "AI Triage — High and Critical Alerts"
  log_analytics_workspace_id = azurerm_log_analytics_workspace.sentinel.id
  display_name               = "Route HIGH+ alerts to AI triage playbook"
  order                      = 1
  enabled                    = true
  
  condition_json = jsonencode([{
    conditionType = "PropertyCondition"
    conditionProperties = {
      propertyName = "IncidentSeverity"
      operator     = "In"
      propertyValues = ["High", "Critical"]
    }
  }])
  
  action_playbook {
    logic_app_id = azurerm_logic_app_workflow.ai_triage.id
    tenant_id    = var.tenant_id
    order        = 1
  }
}

# Azure AI Foundry for SOC agent hosting
resource "azurerm_ai_foundry_hub" "soc" {
  name                = "soc-ai-hub-prod"
  location            = var.location
  resource_group_name = var.resource_group_name
  
  identity {
    type = "SystemAssigned"
  }
  
  sku = "Basic"
}

resource "azurerm_ai_foundry_project" "soc_agents" {
  name         = "soc-agents-prod"
  ai_hub_id    = azurerm_ai_foundry_hub.soc.id
  location     = var.location
  display_name = "SOC AI Agents"
}
```

### 4.3 GCP SecOps Landing Zone

```python
# Google Cloud AI SOC integration
# Pub/Sub → Cloud Run Agent → Chronicle SOAR

from google.cloud import pubsub_v1
from google.cloud import run_v2
import google.cloud.logging

def configure_scc_to_pubsub():
    """Configure Security Command Center to export findings to Pub/Sub"""
    
    # This is equivalent to:
    # gcloud scc notifications create soc-ai-notifications \
    #   --organization=ORG_ID \
    #   --pubsub-topic=projects/PROJECT_ID/topics/scc-findings \
    #   --filter="severity=\"HIGH\" OR severity=\"CRITICAL\""
    
    from google.cloud import securitycenter_v1
    
    client = securitycenter_v1.SecurityCenterClient()
    
    notification_config = {
        "description": "Route HIGH/CRITICAL findings to AI SOC",
        "pubsub_topic": f"projects/{PROJECT_ID}/topics/scc-findings",
        "streaming_config": {
            "filter": 'severity="HIGH" OR severity="CRITICAL"'
        }
    }
    
    client.create_notification_config(
        parent=f"organizations/{ORG_ID}",
        config_id="soc-ai-notifications",
        notification_config=notification_config
    )

# Cloud Run service for AI SOC agent
CLOUD_RUN_AGENT_CONFIG = """
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: soc-triage-agent
  annotations:
    run.googleapis.com/ingress: internal
spec:
  template:
    metadata:
      annotations:
        run.googleapis.com/execution-environment: gen2
        run.googleapis.com/cpu-throttling: 'false'
    spec:
      serviceAccountName: soc-triage-agent@PROJECT_ID.iam.gserviceaccount.com
      containers:
        - image: gcr.io/PROJECT_ID/soc-triage-agent:latest
          resources:
            limits:
              cpu: '4'
              memory: 8Gi
          env:
            - name: GOOGLE_CLOUD_PROJECT
              value: PROJECT_ID
            - name: GEMINI_MODEL
              value: gemini-1.5-pro
            - name: CHRONICLE_CUSTOMER_ID
              valueFrom:
                secretKeyRef:
                  name: chronicle-config
                  key: customer_id
"""
```

---

## 5. Event-Driven Architecture for SOC

### 5.1 Alert Streaming Architecture

```python
# Kafka-based alert streaming for AI SOC
from confluent_kafka import Consumer, Producer, KafkaError
import json

class SOCAlertStreamProcessor:
    """
    Consumes alerts from Kafka and routes to appropriate AI agents.
    Implements event sourcing pattern — all alerts are immutable events.
    """
    
    KAFKA_CONFIG = {
        'bootstrap.servers': 'kafka.soc.internal:9092',
        'security.protocol': 'SASL_SSL',
        'sasl.mechanism': 'PLAIN',
        'sasl.username': os.environ['KAFKA_USERNAME'],
        'sasl.password': os.environ['KAFKA_PASSWORD'],
        'group.id': 'soc-ai-processor',
        'auto.offset.reset': 'earliest',
        'enable.auto.commit': False
    }
    
    ALERT_TOPICS = [
        'soc.alerts.critical',
        'soc.alerts.high',
        'soc.alerts.medium',
        'soc.alerts.low'
    ]
    
    def __init__(self):
        self.consumer = Consumer(self.KAFKA_CONFIG)
        self.consumer.subscribe(self.ALERT_TOPICS)
        
        self.producer = Producer({
            'bootstrap.servers': 'kafka.soc.internal:9092',
            'security.protocol': 'SASL_SSL',
            'sasl.mechanism': 'PLAIN',
            'sasl.username': os.environ['KAFKA_USERNAME'],
            'sasl.password': os.environ['KAFKA_PASSWORD'],
        })
    
    def process_alerts(self):
        """Main alert processing loop"""
        
        while True:
            msg = self.consumer.poll(timeout=1.0)
            
            if msg is None:
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                raise KafkaError(msg.error())
            
            alert = json.loads(msg.value().decode('utf-8'))
            
            # Route to appropriate agent based on alert type
            if alert['severity'] in ['CRITICAL', 'HIGH']:
                self._route_to_triage_agent(alert)
            elif alert['type'] in ['MALWARE', 'RANSOMWARE']:
                self._route_to_malware_agent(alert)
            else:
                self._route_to_standard_pipeline(alert)
            
            # Commit offset after successful processing
            self.consumer.commit(asynchronous=False)
    
    def _route_to_triage_agent(self, alert: dict):
        """Route high-priority alerts to AI triage agent"""
        self.producer.produce(
            topic='soc.agents.triage.input',
            key=alert['id'].encode('utf-8'),
            value=json.dumps({
                "alert": alert,
                "priority": "high",
                "timestamp": datetime.utcnow().isoformat(),
                "routing_reason": f"Severity={alert['severity']}"
            }).encode('utf-8'),
            callback=self._delivery_callback
        )
        self.producer.flush()
```

### 5.2 Event Sourcing for Investigation Audit Trail

```python
from typing import Union
from enum import Enum

class SOCEventType(Enum):
    ALERT_RECEIVED = "alert.received"
    TRIAGE_COMPLETED = "triage.completed"
    ENRICHMENT_COMPLETED = "enrichment.completed"
    TOOL_CALLED = "tool.called"
    HUMAN_REVIEW_REQUESTED = "human_review.requested"
    HUMAN_APPROVED = "human.approved"
    HUMAN_REJECTED = "human.rejected"
    ACTION_EXECUTED = "action.executed"
    INCIDENT_CLOSED = "incident.closed"

class SOCEventStore:
    """
    Immutable event store for complete investigation audit trail.
    Implements event sourcing — the full investigation can be
    reconstructed from the event log.
    """
    
    def __init__(self, dynamodb_table_name: str):
        self.table = boto3.resource('dynamodb').Table(dynamodb_table_name)
    
    def append_event(
        self,
        investigation_id: str,
        event_type: SOCEventType,
        event_data: dict,
        actor: str,
        actor_type: str  # "ai_agent", "human_analyst", "automation"
    ) -> dict:
        """Append event to immutable investigation log"""
        
        event = {
            "investigation_id": investigation_id,
            "event_id": str(uuid.uuid4()),
            "event_type": event_type.value,
            "event_data": event_data,
            "actor": actor,
            "actor_type": actor_type,
            "timestamp": datetime.utcnow().isoformat(),
            "sequence_number": self._get_next_sequence(investigation_id)
        }
        
        # HMAC signature for tamper evidence
        event_bytes = json.dumps(
            {k: v for k, v in event.items() if k != 'signature'},
            sort_keys=True
        ).encode()
        event['signature'] = hmac.new(
            self.signing_key, event_bytes, hashlib.sha256
        ).hexdigest()
        
        # DynamoDB conditional write — prevents duplicate sequence numbers
        self.table.put_item(
            Item=event,
            ConditionExpression="attribute_not_exists(sequence_number)"
        )
        
        return event
    
    def reconstruct_investigation(self, investigation_id: str) -> dict:
        """Replay all events to reconstruct complete investigation state"""
        
        response = self.table.query(
            KeyConditionExpression="investigation_id = :id",
            ExpressionAttributeValues={":id": investigation_id},
            ScanIndexForward=True  # Chronological order
        )
        
        events = response['Items']
        
        # Verify integrity of all events
        for event in events:
            if not self._verify_event_signature(event):
                raise IntegrityError(f"Tampered event detected: {event['event_id']}")
        
        # Reconstruct state by replaying events
        state = {
            "investigation_id": investigation_id,
            "status": "unknown",
            "timeline": [],
            "decisions": [],
            "actions_taken": []
        }
        
        for event in events:
            self._apply_event(state, event)
        
        return state
```

---

## 6. Platform Engineering for AI SOC

### 6.1 Internal Developer Platform for SOC Engineers

```
SOC PLATFORM ENGINEERING ARCHITECTURE
════════════════════════════════════════════════════════════

                    SOC Engineering Portal
                    (Internal Developer Platform)
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
   │ Detection   │  │ Playbook    │  │ Agent       │
   │ Engineering │  │ Engineering │  │ Engineering │
   │ Pipeline    │  │ Pipeline    │  │ Pipeline    │
   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
          │                │                │
   ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐
   │ SIGMA rules │  │ Python/JSON │  │ Agent code  │
   │ YARA rules  │  │ playbooks   │  │ Prompt tmpl │
   │ KQL queries │  │             │  │ Tool defs   │
   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
          │                │                │
          └────────────────┼────────────────┘
                           │
                    ┌──────▼──────┐
                    │  Git Repo   │
                    │  (GitHub)   │
                    └──────┬──────┘
                           │ PR + CI/CD
                    ┌──────▼──────┐
                    │  Test in    │
                    │  Staging    │
                    │  SOC Env    │
                    └──────┬──────┘
                           │ Approved
                    ┌──────▼──────┐
                    │  Production │
                    │  Deployment │
                    └─────────────┘
```

### 6.2 Detection-as-Code Pipeline

```yaml
# GitHub Actions: Detection-as-Code CI/CD pipeline
name: SOC Detection Rule CI/CD

on:
  push:
    paths:
      - 'detections/**/*.yml'
      - 'detections/**/*.sigma'
  pull_request:
    paths:
      - 'detections/**/*.yml'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Validate SIGMA rules
        run: |
          pip install sigma-cli
          sigma check detections/sigma/*.yml
      
      - name: Convert SIGMA to KQL
        run: |
          sigma convert \
            --target microsoft-sentinel \
            --pipeline sysmon \
            detections/sigma/*.yml \
            > detections/kql/generated_rules.json
      
      - name: Test detection rules against sample data
        run: |
          python tools/test_detection_rules.py \
            --rules detections/kql/ \
            --samples tests/sample_data/ \
            --expected tests/expected_outcomes/
      
      - name: AI-assisted rule review
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          python tools/ai_rule_reviewer.py \
            --changed-files "${{ steps.changed-files.outputs.all_changed_files }}"
      
      - name: Check MITRE ATT&CK coverage delta
        run: |
          python tools/coverage_checker.py \
            --before main \
            --after HEAD \
            --output coverage_report.json
      
      - name: Comment PR with coverage impact
        uses: actions/github-script@v7
        with:
          script: |
            const report = require('./coverage_report.json')
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              body: `## Detection Coverage Impact\n\n${report.summary}`
            })
  
  deploy-staging:
    needs: validate
    if: github.ref != 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging Sentinel workspace
        run: |
          az sentinel alert-rule create \
            --workspace-name $STAGING_WORKSPACE \
            --resource-group $RG \
            --rule-file detections/kql/generated_rules.json
  
  deploy-production:
    needs: validate
    if: github.ref == 'refs/heads/main'
    environment: production
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production Sentinel workspace
        run: |
          az sentinel alert-rule create \
            --workspace-name $PROD_WORKSPACE \
            --resource-group $RG \
            --rule-file detections/kql/generated_rules.json
```

### 6.3 Playbook-as-Code GitOps

```yaml
# SOC Playbook GitOps — auto-deploy to SOAR platforms
name: SOC Playbook GitOps

on:
  push:
    branches: [main]
    paths:
      - 'playbooks/**'

jobs:
  deploy-playbooks:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        target: [sentinel, splunk-soar, tines]
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Validate playbook syntax
        run: |
          python tools/validate_playbooks.py \
            --target ${{ matrix.target }} \
            --dir playbooks/
      
      - name: Deploy to Sentinel Logic Apps
        if: matrix.target == 'sentinel'
        run: |
          az deployment group create \
            --resource-group ${{ secrets.SENTINEL_RG }} \
            --template-file playbooks/sentinel/arm_template.json \
            --parameters workspace=${{ secrets.SENTINEL_WORKSPACE }}
      
      - name: Deploy to Splunk SOAR
        if: matrix.target == 'splunk-soar'
        run: |
          python tools/deploy_splunk_soar.py \
            --playbook-dir playbooks/splunk/ \
            --url ${{ secrets.SPLUNK_SOAR_URL }} \
            --token ${{ secrets.SPLUNK_SOAR_TOKEN }}
      
      - name: Deploy to Tines
        if: matrix.target == 'tines'
        run: |
          python tools/deploy_tines.py \
            --stories-dir playbooks/tines/ \
            --api-key ${{ secrets.TINES_API_KEY }}
```

---

## 7. Reference Architecture Summary

```
AI SOC ENTERPRISE REFERENCE ARCHITECTURE (2026)
═══════════════════════════════════════════════════════════════════════

  ┌──────────────────────────────────────────────────────────────────┐
  │                    BUSINESS / GOVERNANCE LAYER                   │
  │  CISO Dashboard | Risk Register | Compliance Reports | AI Ethics │
  └──────────────────────────────┬───────────────────────────────────┘
                                 │
  ┌──────────────────────────────▼───────────────────────────────────┐
  │                    ANALYST EXPERIENCE LAYER                      │
  │  SOC Portal | Copilot Chat | Approval Workflows | Mobile App     │
  └──────────────────────────────┬───────────────────────────────────┘
                                 │
  ┌──────────────────────────────▼───────────────────────────────────┐
  │                    AI ORCHESTRATION LAYER                        │
  │  ┌──────────┐ ┌──────────┐ ┌──────────────┐ ┌───────────────┐  │
  │  │ Triage   │ │ Invest-  │ │ Threat Hunt  │ │ Response      │  │
  │  │ Agent    │ │ igator   │ │ Agent        │ │ Agent         │  │
  │  │          │ │ Agent    │ │              │ │               │  │
  │  └──────────┘ └──────────┘ └──────────────┘ └───────────────┘  │
  │                         │                                        │
  │  ┌──────────────────────▼──────────────────────────────────┐    │
  │  │ LLM Router: Claude 3.5/GPT-4o/Gemini (by task type)     │    │
  │  └──────────────────────────────────────────────────────────┘    │
  └──────────────────────────────┬───────────────────────────────────┘
                                 │
  ┌──────────────────────────────▼───────────────────────────────────┐
  │                    DETECTION / SIEM LAYER                        │
  │  Sentinel/Chronicle/Splunk | EDR | NDR | UEBA | CSPM | CASB     │
  └──────────────────────────────┬───────────────────────────────────┘
                                 │ Telemetry
  ┌──────────────────────────────▼───────────────────────────────────┐
  │                    DATA SOURCES                                   │
  │  Endpoints | Network | Identity | Cloud | Applications | Email   │
  └──────────────────────────────────────────────────────────────────┘

  CROSS-CUTTING (all layers):
  ┌────────────────────────────────────────────────────────────────┐
  │ Observability: Langfuse + Grafana + OTel                       │
  │ Identity: Entra ID / IAM + Managed Identities for agents       │
  │ Secrets: Key Vault / AWS Secrets Manager                       │
  │ Policy: OPA + Guardrails for AI behavior governance            │
  │ Audit: Immutable event store with cryptographic signing        │
  └────────────────────────────────────────────────────────────────┘
```
