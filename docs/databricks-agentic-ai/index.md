---
title: Databricks Agentic AI — Enterprise Architect Reference
date: 2026-07-16
date_created: 2026-07-16
last_reviewed: 2026-07-16
status: current
source_type: native-md
source_file: ""
tags: ["databricks", "agentic-ai", "lakehouse", "mosaic-ai", "unity-catalog", "iceberg"]
---

# Databricks Agentic AI — Enterprise Architect Reference

> **Audience:** Principal AI Architects, Enterprise AI Strategy Consultants, Data Platform Engineers  
> **Coverage:** Platform Vision · Agentic Services · Agent Lake · Lakehouse AI · Mosaic AI · Unity Catalog · Apache Iceberg · Competitive Landscape  
> **As of:** July 2026 (post Data + AI Summit 2026, June 15–18, San Francisco)

---

## Executive Summary

Databricks has executed a fundamental repositioning in 2025–2026: the Lakehouse is no longer primarily a place to **store and query data** — it is now the **governed operating layer where AI agents do the work of the business**. This shift has concrete architectural expression across five converging dimensions:

| Dimension | Before (2023–2024) | Now (2026) |
|-----------|-------------------|------------|
| **Platform Identity** | Unified data + ML platform | Agentic AI operating layer |
| **Agent Tooling** | RAG apps via MLflow | Agent Bricks, Omnigent, Genie One, Supervisor Agent |
| **Data Format** | Delta Lake first | Iceberg v3 native + Delta UniForm (write-once, read anywhere) |
| **Governance** | Catalog-level (who can see data) | Runtime-level (what agents can DO per interaction) |
| **Operational DB** | Separate operational systems | Lakebase (serverless Postgres on open storage) + LTAP |

### Key 2026 Announcements (Data + AI Summit, June 2026)

- **Agent Bricks** expanded to full developer agent platform (100,000+ agents built, 1+ quadrillion tokens/year)
- **Omnigent** open-sourced (Apache 2.0) — meta-harness for multi-agent governance
- **Genie One** + **Genie Ontology** — agentic coworker + self-improving context layer
- **Unity AI Gateway** — runtime governance for agent interactions (Beta)
- **Lakebase** GA — serverless Postgres, 12M database launches/day
- **LTAP** — Lake Transactional/Analytical Processing, unifying OLTP + OLAP
- **Lakehouse RT** — sub-100ms analytics on Delta/Iceberg via Reyden engine
- **Lakeflow** — unified agentic data engineering (ingestion + transformation + orchestration)
- **Apache Iceberg v3** GA with Deletion Vectors, Row Lineage, VARIANT type
- **Catalog Federation** expanded to Google Cloud Lakehouse and Palantir
- **ABAC** (row filters, column masking) for Unity Catalog — GA

---

## Platform Architecture Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    DATABRICKS DATA INTELLIGENCE PLATFORM                      │
├─────────────────────────────────────────────────────────────────────────────┤
│  EXPERIENCE LAYER                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  ┌───────────────┐    │
│  │  Genie One   │  │  Agent Bricks│  │  Lakeflow   │  │   Notebooks   │    │
│  │ (AI Coworker)│  │ (Dev Platform)│  │  Designer   │  │   & IDEs      │    │
│  └──────────────┘  └──────────────┘  └─────────────┘  └───────────────┘    │
├─────────────────────────────────────────────────────────────────────────────┤
│  AGENTIC INTELLIGENCE LAYER                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  ┌───────────────┐    │
│  │  Mosaic AI   │  │   Omnigent   │  │  Genie      │  │   MLflow 3    │    │
│  │ Agent Fwk    │  │ (Meta-Harness)│  │  Ontology   │  │  (GenAI Eval) │    │
│  └──────────────┘  └──────────────┘  └─────────────┘  └───────────────┘    │
├─────────────────────────────────────────────────────────────────────────────┤
│  GOVERNANCE & CONTROL PLANE                                                   │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │           Unity Catalog  +  Unity AI Gateway                          │   │
│  │  Data · Models · Prompts · Agents · MCP Services · Skills · Tools    │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────────┤
│  DATA & COMPUTE LAYER                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  ┌───────────────┐    │
│  │  Delta Lake  │  │Apache Iceberg│  │  Lakebase   │  │  Lakehouse RT │    │
│  │  + UniForm   │  │  v3 Native   │  │  (Postgres) │  │  (Reyden <100ms)│  │
│  └──────────────┘  └──────────────┘  └─────────────┘  └───────────────┘    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        LTAP Architecture                               │   │
│  │          Transactional + Analytical + Streaming — single storage      │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────────┤
│  STORAGE LAYER                                                                │
│  AWS S3 · Azure ADLS Gen2 · Google Cloud Storage  (open object storage)     │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Document Structure

| Part | Topic | Key Concepts |
|------|-------|-------------|
| [Part 1 — Platform Vision & Agentic Services](./part-01-platform-vision-agentic-services) | Strategic shift, service catalog, Agent Bricks | Lakehouse AI, Agentic Enterprise, Data Intelligence Platform |
| [Part 2 — Agent Lake, Agent Architecture & Orchestration](./part-02-agent-lake-architecture) | Agent Lake concept, multi-agent orchestration, Omnigent | Planner/Worker/Supervisor, Genie One, State machines |
| [Part 3 — Mosaic AI & MLflow 3](./part-03-mosaic-ai-mlflow) | Full Mosaic AI stack, MLflow 3 GenAI lifecycle | Vector Search, Model Serving, Prompt Registry, Evaluation |
| [Part 4 — Unity Catalog AI Governance](./part-04-unity-catalog-governance) | Unity Catalog for AI, Unity AI Gateway, ABAC | Agent Registry, Runtime policies, Lineage, Auditing |
| [Part 5 — Lakehouse Architecture: Lakebase, LTAP & RT](./part-05-lakehouse-data-infrastructure) | New data infrastructure, LTAP, Lakebase, Lakeflow | Transactional-Analytical convergence, real-time agents |
| [Part 6 — Apache Iceberg & Open Table Formats](./part-06-iceberg-open-formats) | Iceberg v3, Delta UniForm, Catalog Federation | Open lakehouse, vendor-neutral, interoperability |
| [Part 7 — Security Architecture](./part-07-security-architecture) | RBAC, ABAC, Zero Trust, encryption, agent identity | Row/column security, credential passthrough, network isolation |
| [Part 8 — Observability, FinOps & Integration](./part-08-observability-finops-integration) | MLflow Tracing, cost optimization, ecosystem integrations | OpenTelemetry, LangChain, MCP, Kafka, dbt |
| [Part 9 — Competitive Comparison & Reference Architectures](./part-09-competitive-reference-architectures) | Platform comparison, industry reference architectures | AWS vs Azure vs GCP vs Snowflake vs Databricks |

---

## Capability Maturity Status (July 2026)

| Capability | Status |
|-----------|--------|
| Agent Bricks (core framework) | **GA** |
| Mosaic AI Vector Search | **GA** |
| Hybrid Search | **GA** |
| Model Serving / AI Gateway | **GA** |
| MLflow 3 with GenAI eval | **GA** |
| Agent Evaluation (MLflow 3 integration) | **GA** (May 2026) |
| Unity Catalog ABAC (row/column) | **GA** |
| Lakebase (serverless Postgres) | **GA** |
| Apache Iceberg v3 | **GA** |
| Delta UniForm | **GA** |
| Catalog Federation (Glue, Snowflake, Hive) | **GA** |
| Genie One + Genie Agents + Genie Code | **GA** |
| Supervisor Agent | **GA** |
| LTAP architecture | **GA (announced)** |
| Lakehouse RT (Reyden engine) | **GA (announced)** |
| Lakeflow (unified data engineering) | **GA** |
| Unity AI Gateway | **Beta** |
| Contextual Service Policies | **Beta** |
| ABAC cross-engine via Iceberg REST | **Beta** |
| Omnigent (open-source meta-harness) | **GA (Open Source)** |
| Genie Ontology | **GA** |
| Catalog Federation (Google, Palantir) | **Preview** |
| Lakebase Search (hybrid vector + FTS) | **Beta** |
| Genie App Builder | **Private Preview** |
| Genie ZeroOps | **Private Preview** |

---

## Glossary Quick Reference

| Term | Definition |
|------|-----------|
| **Agent Bricks** | Databricks' auto-optimizing agent construction and deployment platform |
| **Omnigent** | Open-source meta-harness for multi-agent governance; sits above individual agent harnesses |
| **Genie One** | Agentic AI coworker for business users (web, iOS, Android) connecting to 50+ apps |
| **Genie Ontology** | Self-improving context layer extracting business knowledge from data, docs, and apps |
| **LTAP** | Lake Transactional/Analytical Processing — unified architecture eliminating ETL between OLTP/OLAP |
| **Lakebase** | Serverless Postgres database storing data in Delta/Iceberg format on open object storage |
| **Lakehouse RT** | Real-time analytics product (Reyden engine) delivering <100ms latency on Delta/Iceberg |
| **Lakeflow** | Unified data engineering platform: ingestion + transformation + orchestration under Unity Catalog |
| **Unity AI Gateway** | Runtime governance layer for agent interactions — enforces policies per-call, not just per-access |
| **UniForm** | Delta Lake feature generating Iceberg metadata automatically, enabling cross-engine reads |
| **Contextual Service Policies** | Runtime policies defining WHAT an agent can do in a given interaction context |
| **Model Units** | Databricks' abstraction for multi-tenant LLM inference — reported 80% GPU cost reduction |
| **Genie ZeroOps** | Background AI agent for autonomous pipeline monitoring, failure detection, and root-cause analysis |
| **Lakewatch** | Lakehouse-native SIEM for analyzing unified agent traces from Unity AI Gateway |
| **Reyden** | Databricks' new compute engine powering Lakehouse RT with sub-100ms query latency |
| **Zerobus Ingest** | High-volume event streaming ingestion within Lakeflow |

---

*See individual parts for deep dives. This index page is updated to reflect GA/Preview status as of July 2026.*
