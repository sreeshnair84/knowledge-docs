---
title: Claude Enterprise Deployment 2026
---

# Claude Enterprise Deployment 2026

Deploying Claude at scale across AWS Bedrock, Google Cloud Vertex AI, and Microsoft Azure AI Foundry — plus MCP Enterprise, multi-tenant patterns, compliance, and cost governance.

---

## Cloud Platform Overview

Claude is the only frontier AI model available on all three major cloud platforms (AWS, GCP, Azure). This gives enterprises flexibility to deploy where their data already lives.

| Platform | Claude Models Available | Key Enterprise Features |
|----------|------------------------|------------------------|
| AWS Bedrock | Opus 4.6, Sonnet 4.6, Haiku 4.5 | VPC isolation, IAM, CloudTrail, PrivateLink |
| Google Cloud Vertex AI | Sonnet 4.6, Haiku 4.5 | VPC-SC, CMEK, DLP integration |
| Azure AI Foundry | Sonnet 4.6 (Claude Desktop Enterprise Beta) | Azure AD, Private Endpoints, Purview |

---

## AWS Bedrock

### Setup

```python
import boto3
import json

bedrock = boto3.client(
    service_name="bedrock-runtime",
    region_name="us-east-1"
)

response = bedrock.invoke_model(
    modelId="anthropic.claude-sonnet-4-6-20261001-v1:0",
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 4096,
        "messages": [
            {"role": "user", "content": "Analyse this architecture for scalability issues."}
        ]
    })
)
result = json.loads(response["body"].read())
print(result["content"][0]["text"])
```

### Using the Anthropic SDK with Bedrock

```python
import anthropic

client = anthropic.AnthropicBedrock(
    aws_access_key="...",
    aws_secret_key="...",
    aws_region="us-east-1"
)

response = client.messages.create(
    model="anthropic.claude-sonnet-4-6-20261001-v1:0",
    max_tokens=4096,
    messages=[{"role": "user", "content": "..."}]
)
```

### IAM Permissions

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:InvokeModelWithResponseStream"
      ],
      "Resource": [
        "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-*"
      ]
    }
  ]
}
```

### VPC Isolation via PrivateLink

```hcl
# Terraform: Bedrock VPC Endpoint
resource "aws_vpc_endpoint" "bedrock" {
  vpc_id            = var.vpc_id
  service_name      = "com.amazonaws.us-east-1.bedrock-runtime"
  vpc_endpoint_type = "Interface"
  subnet_ids        = var.private_subnet_ids
  security_group_ids = [aws_security_group.bedrock_endpoint.id]
  private_dns_enabled = true
}
```

### Key Bedrock Enterprise Features

- **CloudTrail logging**: Every model invocation is logged automatically
- **AWS Guardrails**: Content filtering, topic blocking, grounding checks
- **Cross-region inference**: Automatically route to available regions during high load
- **Model evaluation**: A/B test model versions in Bedrock Playground
- **Fine-tuning**: Submit custom training jobs through Bedrock console

---

## Google Cloud Vertex AI

### Setup

```python
import anthropic

client = anthropic.AnthropicVertex(
    project_id="my-gcp-project",
    region="us-east5"
)

response = client.messages.create(
    model="claude-sonnet-4-6@20261001",
    max_tokens=4096,
    messages=[{"role": "user", "content": "..."}]
)
```

### Application Default Credentials

```bash
# Authenticate
gcloud auth application-default login

# Set project
gcloud config set project my-gcp-project
```

### VPC Service Controls

```yaml
# VPC-SC perimeter — restrict Vertex AI to within perimeter
access_policy:
  name: enterprises/123/accessPolicies/456
  scopes:
    - projects/my-gcp-project
  restricted_services:
    - aiplatform.googleapis.com
```

### Customer-Managed Encryption Keys (CMEK)

```python
from google.cloud import aiplatform

aiplatform.init(
    project="my-gcp-project",
    location="us-east5",
    encryption_spec_key_name="projects/my-project/locations/global/keyRings/my-ring/cryptoKeys/my-key"
)
```

### Vertex AI Enterprise Features

- **DLP integration**: Automatically scan inputs/outputs for sensitive data
- **Audit logs**: Stackdriver Logging captures all API calls
- **Model Garden**: Browse and deploy Claude alongside other models
- **Quotas**: Per-project quota management via Cloud Console
- **Organization policies**: Restrict model access to approved regions

---

## Microsoft Azure AI Foundry

### Claude Desktop Enterprise Beta (2026)

Azure AI Foundry now hosts Claude with native Azure AD integration. Key features:
- **Single sign-on**: Users authenticate with their Microsoft 365 credentials
- **Conditional Access Policies**: Apply MFA, device compliance, location-based access
- **Data residency**: EU data processed in EU Azure regions
- **Azure OpenAI Service parity**: Same governance tools (Purview, Sentinel integration)

### Setup (API)

```python
import anthropic
import os

client = anthropic.Anthropic(
    base_url=f"https://{os.environ['AZURE_ENDPOINT']}/openai/deployments/claude-sonnet-4-6",
    api_key=os.environ["AZURE_API_KEY"],
    default_headers={"api-version": "2026-01-01-preview"}
)
```

### Private Endpoints

```hcl
resource "azurerm_private_endpoint" "claude" {
  name                = "claude-private-endpoint"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  subnet_id           = azurerm_subnet.private.id

  private_service_connection {
    name                           = "claude-connection"
    private_connection_resource_id = azurerm_cognitive_account.claude.id
    subresource_names              = ["account"]
    is_manual_connection           = false
  }
}
```

---

## MCP Enterprise (Okta Integration, June 2026+)

Enterprise MCP eliminates per-user OAuth flows — instead, org-level provisioning via Okta pushes approved MCP servers to all users.

### Architecture

```
Okta (IdP)
  └── MCP Provisioning App
        ├── Assigns MCP server configs to user groups
        ├── Enforces SCIM lifecycle (provision on hire, revoke on offboard)
        └── Logs access in Okta Syslog
```

### Admin Configuration

```json
{
  "mcp_enterprise": {
    "provider": "okta",
    "org_url": "https://company.okta.com",
    "client_id": "...",
    "servers": {
      "github": {
        "enabled_groups": ["engineering", "devops"],
        "scopes": ["repo:read", "pr:write"]
      },
      "salesforce": {
        "enabled_groups": ["sales", "revops"],
        "scopes": ["opportunities:read"]
      }
    }
  }
}
```

### What Users Experience

1. User logs into Claude Code / Claude Desktop with SSO
2. Approved MCP servers appear automatically — no OAuth popup required
3. Access follows group membership — engineers see GitHub, sales sees Salesforce
4. Offboarding: Okta SCIM revokes access; MCP tokens invalidated within 60 seconds

---

## Multi-Tenant SaaS Patterns

### Tenant Isolation Architecture

```python
class TenantAwareAgent:
    def __init__(self, tenant: Tenant):
        self.tenant = tenant
        self.client = anthropic.Anthropic(api_key=ANTHROPIC_KEY)

    def build_system_prompt(self) -> str:
        return (
            f"You are an assistant for {self.tenant.display_name}. "
            f"You have access ONLY to data belonging to tenant ID: {self.tenant.id}. "
            f"Never reference or expose data from other tenants. "
            f"If a query requires data you don't have access to, say so explicitly."
        )

    async def run(self, user_message: str, user_id: str) -> str:
        # Rate limit at tenant level
        await self.check_rate_limit(self.tenant.id)

        response = self.client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            system=self.build_system_prompt(),
            messages=[{"role": "user", "content": user_message}],
            metadata={"user_id": f"{self.tenant.id}:{user_id}"}
        )
        return response.content[0].text
```

### Per-Tenant Rate Limiting

```python
TENANT_RATE_LIMITS = {
    "enterprise": {"rpm": 1000, "tpd": 10_000_000},
    "professional": {"rpm": 200, "tpd": 2_000_000},
    "starter": {"rpm": 60, "tpd": 500_000}
}

async def check_rate_limit(tenant_id: str):
    plan = await get_tenant_plan(tenant_id)
    limits = TENANT_RATE_LIMITS[plan]
    rpm_key = f"rl:rpm:{tenant_id}"
    tpd_key = f"rl:tpd:{tenant_id}"

    current_rpm = await redis.incr(rpm_key)
    await redis.expire(rpm_key, 60)

    if current_rpm > limits["rpm"]:
        raise RateLimitError(f"Tenant {tenant_id} rate limit exceeded")
```

---

## Claude for Work (Team & Enterprise Plans)

### Data Privacy Guarantees

| Feature | Team Plan | Enterprise Plan |
|---------|-----------|-----------------|
| No training on your data | ✓ | ✓ |
| Data retention control | 30 days | Custom (0–180 days) |
| Audit logs | Basic | Full (per-user, per-message) |
| SSO (SAML/OIDC) | ✓ | ✓ |
| Domain verification | - | ✓ |
| Custom system prompts | - | ✓ |
| Usage dashboards | - | ✓ |
| Invoice billing | - | ✓ |

### Admin Controls (Enterprise)

- **Approved domains**: Restrict Claude.ai access to company email domains
- **Custom prompts**: Set organisation-wide system prompts that all users inherit
- **Feature flags**: Enable/disable tools (web search, code execution, file uploads) per team
- **Audit export**: Export full conversation logs to SIEM (Splunk, Sentinel)

---

## Compliance Considerations

### SOC 2 Type II

Anthropic maintains SOC 2 Type II certification. For enterprise customers:
- Request the Anthropic SOC 2 report via your account team
- Include Claude API endpoints in your own SOC 2 audit scope
- Document data flows: what user data enters the API, what is returned

### HIPAA

- Claude API can be used in HIPAA-compliant architectures with a Business Associate Agreement (BAA)
- Contact Anthropic sales for BAA — available on Enterprise plans
- Do not send PHI through the API without a BAA in place
- Use Claude on AWS Bedrock (within your HIPAA-eligible AWS account) for additional compliance controls

### Data Residency

| Requirement | Solution |
|-------------|---------|
| EU data stays in EU | Deploy via Vertex AI EU region (`europe-west1`) |
| UK data stays in UK | Azure AI Foundry UK South |
| US GovCloud | AWS Bedrock in `us-gov-west-1` (check availability) |
| On-premises | Claude is not available on-premises — use VPC isolation + PrivateLink |

### GDPR / Data Minimisation

```python
# Strip PII before sending to the API
import presidio_analyzer
from presidio_anonymizer import AnonymizerEngine

def anonymize_prompt(text: str) -> str:
    analyzer = AnalyzerEngine()
    results = analyzer.analyze(text=text, language="en")
    return AnonymizerEngine().anonymize(text=text, analyzer_results=results).text

# Usage
safe_prompt = anonymize_prompt(user_message)
response = client.messages.create(..., messages=[{"role": "user", "content": safe_prompt}])
```

---

## Cost Governance

### Budget Caps per Team / Project

```python
from anthropic import Anthropic

class BudgetedClient:
    def __init__(self, team_id: str, monthly_budget_usd: float):
        self.team_id = team_id
        self.budget = monthly_budget_usd
        self.client = Anthropic()

    async def create_message(self, **kwargs):
        spent = await get_monthly_spend(self.team_id)
        if spent >= self.budget:
            raise BudgetExceededError(f"Team {self.team_id} has reached ${self.budget:.2f} monthly limit")

        response = self.client.messages.create(**kwargs)
        cost = calculate_cost(response.usage, kwargs.get("model"))
        await record_spend(self.team_id, cost)
        return response
```

### Usage Dashboards (Enterprise)

Access at `console.anthropic.com` → Usage:
- Requests per day / hour
- Tokens in / out breakdown
- Cost by model
- Per-user breakdowns (Enterprise plan)
- Export CSV for chargeback

### Chargeback Model

```python
# Tag all API calls with cost centre
client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=4096,
    metadata={
        "user_id": user.id,
        "team_id": team.id,
        "cost_centre": team.cost_centre_code,
        "project_id": project.id
    },
    messages=[...]
)
```

Use `metadata` fields to attribute costs in your BI tooling. Anthropic passes these through in usage logs.

---

## Deployment Checklist

### Cloud Procurement

- [ ] Negotiate enterprise pricing agreement (contact sales for > $50k/year)
- [ ] Confirm which cloud platform hosts your data (for compliance)
- [ ] Set up PrivateLink / VPC-SC / Private Endpoints — no public internet for API calls
- [ ] Configure CloudTrail / Stackdriver / Azure Monitor for API audit logging

### Security

- [ ] Store API keys in Vault / AWS Secrets Manager / Azure Key Vault
- [ ] Rotate keys on 90-day cycle
- [ ] Enable AWS Bedrock Guardrails / Vertex AI DLP for content filtering
- [ ] Implement PII stripping for user-facing applications

### Cost Control

- [ ] Set per-team budget caps with alerting at 80% and 100%
- [ ] Enable model routing: Haiku for simple tasks, Sonnet for standard, Opus for complex
- [ ] Enable prompt caching on shared system prompts (> 1024 tokens)
- [ ] Use Batch API for non-time-sensitive workloads (50% saving)

### Compliance

- [ ] Sign BAA with Anthropic if processing PHI
- [ ] Confirm data residency requirements and deploy to appropriate region
- [ ] Include API in SOC 2 audit scope
- [ ] Enable usage log export to SIEM
