---
title: "EU Bank AI Copilot Platform"
date_created: 2026-06-29
last_reviewed: 2026-07-17
status: current
supersedes: "docs/ai-usecases/eu-bank-ai-copilot-research.pdf; archive/coding-tools/github-copilot/copilotkit-server-map-call-flow.md"
source_type: converted-pdf
source_file: "eu-bank-ai-copilot-complete.pdf"
tags: ["ai-usecases", "copilotkit", "strands-agents", "agentcore"]
doc_type: guide
covers_version: "as of 2026-07-10"
---

# EU Bank AI Copilot Platform

**Classification:** Internal Confidential — April 2026 — Version 1.0
**Stack:** CopilotKit · Strands Agents SDK · AWS AgentCore EU · MCP Streamable-HTTP · AG-UI · Entra ID OIDC/PKCE
**Compliance:** OWASP · DORA · GDPR · EU AI Act
**Tech:** Python 3.13 · TypeScript · Next.js · FastAPI · DynamoDB · Aurora · Bedrock · Redis · Terraform · EKS

---

## Executive Summary

This document presents the complete end-to-end architecture, implementation reference, and security analysis for the EU Bank AI Copilot Platform. The platform enables authorised bank staff to query accounts, initiate payments, assess risk, and perform KYC operations through a conversational AI interface, while maintaining full compliance with GDPR, DORA, EBA ICT Guidelines, and the EU AI Act.

The architecture centres on three pillars: (1) AWS AgentCore Runtime hosting Strands agent workers and MCP tool servers in isolated EU-region containers; (2) a CopilotKit React frontend communicating exclusively through a hardened BFF layer; and (3) a dynamic Tool Registry enabling domain teams to register new capabilities without redeploying the core platform.

> **Critical Design Constraint**
> AgentCore Gateway is not an approved service. All traffic from the BFF to AgentCore Runtime uses private VPC endpoints and SigV4-signed requests only. No direct browser-to-AgentCore communication is permitted under any circumstance.

## Series Structure

This document is split into four parts. Each part is self-contained code/reference material — read them in order for the full picture, or jump to the part that covers what you need.

| Part | Title | What's unique to this part |
| --- | --- | --- |
| 1 | [Architecture & Design Decisions](./eu-bank-ai-copilot-part1-architecture.md) | The five security zones, the technology stack and component map, the MCP Tools-vs-MCP Apps design decision (with the banking use-case assignment table), the server topology and network call matrix, and the five Architecture Decision Records (ADRs) explaining *why* the platform is built this way |
| 2 | [Sequence Diagrams & Application Code](./eu-bank-ai-copilot-part2-sequence-diagrams-and-code.md) | Step-by-step traces of all six core sequence flows (auth, MCP Tools query, MCP Apps iframe, payment approval, dynamic tool registration, full-stack multi-tool query), plus the frontend (CopilotKit/MSAL) and BFF (CopilotRuntime/session validation/security headers) code references and the complete Approval Service implementation |
| 3 | [Agent Runtime, MCP Servers & Security](./eu-bank-ai-copilot-part3-agent-mcp-security.md) | The AgentCore + Strands agent code reference, the Core Banking and Payment Rail MCP server code, the Tool Registry API implementation, the OWASP Top 10 / LLM Top 10 control mappings, the full testing strategy (including the prompt-injection evaluation suite), and the STRIDE threat model with attack trees |
| 4 | [Compliance, Infrastructure & Observability](./eu-bank-ai-copilot-part4-compliance-infra-observability.md) | GDPR/DORA/EU AI Act control mappings, the IAM least-privilege matrix and CI/CD security gate pipeline, the operational runbook (incident response, blue-green deploys, disaster recovery), the OpenTelemetry observability instrumentation and dashboards, and a glossary of every term/acronym used across the series |

**New to the platform?** Start with Part 1 for the architecture and the reasoning behind it. **Implementing a specific layer?** Jump straight to Part 2 (frontend/BFF), Part 3 (agent/MCP servers), or Part 4 (infra/ops) as needed. **Reviewing for security or compliance sign-off?** Part 3 has the OWASP controls and threat model; Part 4 has the regulatory mappings and the CI/CD security gates.

See also the companion page [EU Bank Sequence Diagrams](./eu-bank-sequence-diagrams.md) for the high-resolution rendered diagrams referenced throughout Part 2.

