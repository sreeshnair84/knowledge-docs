---
title: "Cloud Platforms"
date_created: 2026-06-29
last_reviewed: 2026-07-10
status: current
supersedes: ""
source_type: native-md
source_file: ""
tags: ["cloud-platforms"]
doc_type: guide
covers_version: \"as of 2026-07-10\"
---

# Cloud Platforms

Architecture guides and deep-research for AWS, Azure, GCP, and cloud-native infrastructure.

---

## Cross-Platform Comparison

- [Enterprise AI Agent Runtime Internals: AWS, Azure & GCP (2026)](./enterprise-agent-runtime-internals-2026.md) — Internal architecture whitepaper comparing AWS Bedrock AgentCore, Azure AI Foundry Agent Service, and Google Vertex AI Agent Engine across 21 dimensions: compute isolation (Firecracker/gVisor/Hyper-V), runtime lifecycle, session management, MCP integration, sidecars/service mesh, request pipeline, auth (SigV4/Entra MI/GCP WIF), authorization (Cedar/RBAC/IAM Conditions), zero trust, guardrails, policy engines, networking, observability, multi-tenancy. Every conclusion labelled [DOCUMENTED / EVIDENCE / INFERRED / SPECULATIVE].

---

## Platform Guides

- **AWS AgentCore** — Runtime, Gateway, Policy, Memory, Identity, Code Interpreter deep dives
- **Azure AI Foundry** — Agent Service overview and integration patterns
- **AI Gateway** — Kong, Envoy, and enterprise AI gateway comparisons
- **Kubernetes** — 16-part K8s handbook for AI infrastructure
- **Infrastructure as Code** — Terraform mastery and AI-assisted IaC
