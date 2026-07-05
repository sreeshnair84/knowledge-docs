---
title: "AI-Assisted Infrastructure as Code: From Zero to Mastery"
tags: [terraform, iac, infrastructure-as-code]
---

# AI-Assisted Infrastructure as Code: From Zero to Mastery

## Contents

**Part 1 — Foundations of AI-Assisted IaC**
  - What AI-Assisted IaC Actually Means
  - The Spectrum: Autocomplete to Autonomous Agents
  - Why Infrastructure Code is a Special Case for AI

**Part 2 — The AI-IaC Tooling Landscape**
  - Code-Completion Assistants (Copilot, Codeium)
  - Chat-Based Generators (Claude, ChatGPT, Gemini)
  - Agentic IaC Platforms & CLI Agents
  - Tool Comparison Matrix

**Part 3 — How LLMs Generate Infrastructure Code**
  - Training Data and HCL/YAML Familiarity
  - Context Windows and Repository Awareness
  - Hallucination Patterns Specific to IaC

**Part 4 — Prompt Engineering for Infrastructure Code**
  - Anatomy of a Good IaC Prompt
  - Context-Rich Prompting Patterns
  - Prompt Library: 30 Production Patterns

**Part 5 — The Human-in-the-Loop Architecture**
  - Why Full Autonomy is Premature for Infra
  - Review Gates and Approval Workflows
  - Plan-Review-Apply with AI in the Loop

**Part 6 — Validation & Guardrail Pipelines**
  - Static Analysis: tfsec, Checkov, tflint
  - Policy as Code: OPA, Sentinel, Conftest
  - Cost Estimation Gates: Infracost
  - Multi-Layer Guardrail Architecture

**Part 7 — Agentic Workflows for Infrastructure**
  - What Makes a Workflow 'Agentic'
  - Tool-Use Loops: Plan -> Validate -> Apply
  - MCP and Infrastructure Tool Servers
  - Agent Permission Boundaries

**Part 8 — AI-Assisted State & Drift Management**
  - AI-Powered Drift Explanation
  - Automated Drift Remediation PRs
  - Risk Scoring for Proposed Changes

**Part 9 — AI-Assisted Rollback & Incident Response**
  - AI-Generated Incident Postmortems
  - Automated Rollback PR Generation
  - On-Call Copilots for Infrastructure Incidents

**Part 10 — Security in AI-Generated Infrastructure**
  - Common Security Mistakes LLMs Make
  - Secrets Leakage Risks
  - IAM Over-Permissioning Patterns

**Part 11 — Testing AI-Generated IaC**
  - Terraform Test Framework + AI
  - Policy-Driven Test Generation
  - Regression Testing for AI Suggestions

**Part 12 — Enterprise Governance for AI-IaC**
  - Model Selection & Data Residency
  - Audit Trails for AI-Generated Changes
  - Approval Matrices by Risk Tier

**Part 13 — Anti-Pattern Catalog**
  - 18 Critical AI-IaC Anti-Patterns

**Part 14 — Building an Internal AI-IaC Platform**
  - Reference Architecture
  - RAG over Internal Module Libraries
  - Custom Agents with MCP Tooling

**Part 15 — Troubleshooting Playbook**
  - Diagnosing Hallucinated Resources
  - Fixing AI-Introduced Drift
  - Recovering from Bad Auto-Applies

**Part 16 — The Future of AI-Assisted IaC**
  - Self-Healing Infrastructure
  - Natural-Language Infrastructure Platforms
  - Where Human Judgment Remains Essential
  Appendices: Guardrail Configuration Reference • 125 Interview Questions • Production Readiness Checklist

## Part 1: Foundations of AI-Assisted IaC
*What It Means, The Autonomy Spectrum, Why Infrastructure Is Different*

### 1.1 What AI-Assisted IaC Actually Means

It is critical to separate three related but distinct capabilities that are often conflated under the single banner of
'AI for infrastructure':
- Generation: Producing new infrastructure code from a natural-language description or an existing pattern.
- Comprehension: Explaining, summarizing, or reasoning about existing infrastructure code, plans, or
state.
- Operation: Taking real actions against cloud APIs — running plan/apply, executing remediation, or
modifying live resources.
II Most of the value — and most of the risk — in AI-IaC today comes from blending these three capabilities into
a single workflow without clear boundaries. A model that is excellent at generation may be unreliable at
operation. Treat each capability with a distinct trust level.
Why This Matters Now
Three converging trends have made AI-assisted IaC a first-class concern for platform and infrastructure teams
rather than a novelty:
- Model capability: Modern LLMs have been trained on enormous corpora of public Terraform modules,
Kubernetes manifests, and cloud documentation, making them genuinely competent at HCL and YAML
syntax — a sharp departure from early-generation models that frequently hallucinated invalid resource
arguments.
- Tool-use maturity: Standardized protocols (such as MCP) now let models call real tools — running
terraform plan, querying cloud APIs, reading state — rather than operating purely on static text.
- Organizational pressure: Platform teams face a permanent shortage of engineers relative to the pace of
cloud adoption, pushing organizations toward AI-assisted self-service for infrastructure requests.

### 1.2 The Spectrum: Autocomplete to

Autonomous Agents
Not all 'AI-assisted IaC' is the same. Understanding where a given tool or workflow sits on the autonomy
spectrum is the single most important framework for evaluating risk and designing guardrails.
THE AI-IaC AUTONOMY SPECTRUM
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII LOW
AUTONOMY HIGH AUTONOMY
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII Level 0
Level 1 Level 2 Level 3 Level 4 Autocomplete Chat Plan-Review- Agentic Loop Autonomous
IIIIIIIIIII Generation Apply Copilot (Tool-Using) Operator Inline code Generates a
Generates code Reads repo, Plans, suggestions block from a AND runs runs plan, applies,
(Copilot-style) prompt in terraform plan, interprets monitors, chat shows diff to
results, asks remediates human clarifying without human questions review Human reviews
Human reviews Human reviews Human reviews Human reviews every line every block the PLAN
before AI's reasoning AFTER THE FACT apply + the plan (if at all) Risk: LOW Risk: HIGH
(today's standard practice) (emerging, requires strong guardrails)

### 1.3 Why Infrastructure Code Is a Special

Case for AI
Generating a Python function and generating a Terraform resource block carry fundamentally different risk
profiles, even though both are 'just code'. Understanding why is essential to designing appropriate guardrails.

| Level Description Example Tools Recommended Use                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 0 — Autocomplete Inline single-line/block suggestions as you type GitHub Copilot, Codeium, Tabnine Safe for all environments                    |
| 1 — Chat Generation Conversational generation of code blocks/files Claude, ChatGPT, Gemini in chat Safe with mandatory human                    |
| 2 — Plan-Review-Apply Copilot Generates code + runs plan, human approves apply Claude Code, Cursor agents, Cline Safe in dev/staging; prod w    |
| 3 — Agentic Loop Multi-step tool use: read repo, plan, interpret, iterate Claude Code (agentic), custom MCP agents Dev/staging by default; prod |
| 4 — Autonomous Operator Applies changes and remediates without per-change human review Emerging — not yet standard Not recommended for prod     |

| Property Application Code Infrastructure Code                                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------- |
| Blast radius Usually contained to the running process Can affect entire networks, data stores, productio                           |
| Reversibility Easy — redeploy previous version Often hard — destroyed data, deleted resources                                      |
| Side effects of mistakes Bug, crash, bad output Outage, data loss, security exposure, runaway c                                    |
| Cost of a bad apply Usually $0 direct cost Can be unbounded (e.g., auto-scaling misconfig                                          |
| Testability before execution Unit tests run in milliseconds, no side effects terraform plan helps, but full fidelity requires real |
| State coupling Stateless typically Tightly coupled to a stateful record (tfstate) that m                                           |

I A hallucinated function name in application code fails at compile/test time. A hallucinated or subtly wrong IAM
policy in infrastructure code can silently grant excessive access and pass terraform apply without any error —
the blast radius is invisible until it's exploited or audited.

## Part 2: The AI-IaC Tooling Landscape
*Code Completion, Chat Generation, Agentic Platforms*

### 2.1 Code-Completion Assistants

These tools operate at Level 0 of the autonomy spectrum — inline suggestions as an engineer types, with no
autonomous tool use. They integrate directly into IDEs and are the most mature, lowest-risk category of AI-IaC
tooling.
- Strengths: Fast, low-friction, the engineer retains full control and reviews every keystroke-level
suggestion.
- Limitations: Lacks broader repository or organizational context unless explicitly configured; cannot run
plan/apply or validate suggestions against real cloud state.
- Best for: Day-to-day authoring of resource blocks, variables, and boilerplate — not architectural
decisions.

### 2.2 Chat-Based Generators

Conversational interfaces where an engineer describes desired infrastructure in natural language and receives
a generated code block or file. This is Level 1 — generation only, no autonomous execution.
CHAT-BASED GENERATION WORKFLOW
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII Engineer: "Create an
S3 bucket with versioning, encryption, and a lifecycle policy that transitions to Glacier
after 90 days" I M LLM generates HCL block (pattern-matched from training data + any
provided context) I M Engineer reviews, edits, pastes into repo I M Engineer runs
terraform plan locally I M Engineer opens PR for human review KEY: The model never sees
real state or runs plan. All validation happens after generation, by the human.

### 2.3 Agentic IaC Platforms & CLI Agents

Agentic tools (Level 2-3) go beyond generation: they can read your actual repository, run terraform plan,
interpret the output, iterate on errors, and present a reviewed plan for human approval before any apply. This is
the fastest-growing category as of 2026.
AGENTIC IaC WORKFLOW
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII Engineer:
"Add a read replica to the prod Postgres DB" I M Agent reads existing
modules/aws-rds-postgres/*.tf I M Agent generates replica resource block matching
existing conventions (naming, tagging, lifecycle) I M Agent runs: terraform validate &&
terraform plan I M Agent encounters error → reads error → fixes code (e.g., missing
subnet group reference) I M Agent re-runs plan → succeeds I M Agent presents PLAN OUTPUT
+ DIFF to human I M I HUMAN APPROVAL GATE I ← Apply only after explicit approval I M
terraform apply (human-triggered or CI-triggered post-approval)
II The defining feature of a well-designed agentic IaC workflow is not the absence of human review — it's that
the human reviews a fully-validated PLAN rather than raw, unverified code. The agent does the toil; the human
makes the judgment call.

### 2.4 Tool Comparison Matrix

| Tool Category Examples Autonomy Level Runs terraform plan? Best Fit                                   |
| ----------------------------------------------------------------------------------------------------- |
| IDE Autocomplete GitHub Copilot, Codeium, Tabnine 0 No Daily authoring, all teams                     |
| Chat Generation Claude, ChatGPT, Gemini (web/app) 1 No Architecture exploration, l                    |
| Agentic CLI/IDE Claude Code, Cursor Agent, Cline 2-3 Yes Real PRs, iterative dev, v                   |
| IaC SaaS Platforms Spacelift AI, env0 AI, Pulumi AI2-3 Yes (managed) Enterprise governance wi         |
| Custom MCP Agents Org-built agents using MCP tool servers 2-4 Configurable Org-specific workflows, in |

## Part 3: How LLMs Generate Infrastructure
*Code*

### 3.1 Training Data and HCL/YAML

Familiarity
LLMs learn infrastructure code patterns from massive public corpora: the Terraform Registry, public GitHub
repositories, cloud provider documentation, and Stack Overflow. This gives models strong familiarity with
common, well-documented patterns (a standard VPC module, a basic EKS cluster) and weaker familiarity with
niche providers, recently-released resource arguments, or organization-specific conventions.
- Strong familiarity: AWS, Azure, GCP core services; popular community modules
(terraform-aws-modules); common Kubernetes manifests.
- Weaker familiarity: Niche or newly-released providers; very recent provider argument changes
(post-training-cutoff); proprietary internal modules the model has never seen.

### 3.2 Context Windows and Repository

Awareness
A critical factor in generation quality is how much of the surrounding codebase the model can actually see.
There is a major quality gap between context-free generation and context-rich generation.
II The single highest-leverage practice for improving AI-generated IaC quality is providing rich context: existing
modules, naming conventions, a style guide, and — for agentic tools — read access to the actual repository and
state.

### 3.3 Hallucination Patterns Specific to IaC

| Context Provided Generation Quality Common Failure Mode                                                              |
| -------------------------------------------------------------------------------------------------------------------- |
| None (cold prompt only) Generic, may not match org conventionsHardcoded values, wrong provider version, in           |
| Single file shown Better syntax match, still misses cross-file deps Missing variable references defined elsewhe      |
| Full module directory Strong consistency with existing patternsMay miss conventions in sibling modules               |
| Full repo + state list High fidelity, can avoid naming collisionsStill cannot know live cloud state without plan     |
| Repo + live terraform plan output Highest fidelity — grounded in actual diffRequires agentic tool-use, not just chat |

Hallucination in infrastructure code has distinct, recognizable patterns. Knowing them helps reviewers catch
issues quickly.
I The most dangerous hallucination category is silent over-permissioning — it produces syntactically valid,
applyable code that introduces a security risk no automated syntax check will catch. This is why policy-as-code
scanning (Part 6) is non-negotiable for AI-generated IaC.

| Pattern Example Why It Happens How to Catch It                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Invalid resource argumentUsing an argument that doesn't exist on that resource type in the current provider version Model blends syntax across provider versions or similar re terraform validate fails imm |
| Plausible but wrong resource type Suggesting an EKS node group resource when a Fargate profile was actually needed Pattern-matching to the most common solution, not the pre Human review of architectu     |
| Outdated syntax Using deprecated count-based patterns when for_each was requested Training data includes older code more heavily than newe terraform plan shows unexp                                       |
| Invented module outputsReferencing a module output by an assumed name rather than the actual defined name Model assumes common naming without reading actual m terraform validate / plan err                |
| Silent over-permissioningGenerating an IAM policy with a wildcard action 'for simplicity' Models often default to permissive examples seen in tutor Requires explicit human/po                              |
| Fabricated provider/resource Inventing a resource name that sounds plausible but doesn't exist Low-frequency or non-existent pattern in training data extr terraform init / validate fails                  |

## Part 4: Prompt Engineering for
*Infrastructure Code*

### 4.1 Anatomy of a Good IaC Prompt

Prompt quality is the single biggest lever an individual engineer has over AI-generated infrastructure code
quality. A well-structured prompt for IaC generation includes five components:
- 1. Intent: What infrastructure outcome is desired, in business/architecture terms, not just resource names.
- 2. Constraints: Cloud provider, region, naming conventions, existing modules to reuse, compliance
requirements.
- 3. Context: Relevant existing code (paste the actual module or point the agent at the repo).
- 4. Non-negotiables: Security requirements, cost limits, things that must NOT happen (e.g., 'do not create
public S3 buckets').
- 5. Output format: Whether you want a full file, a single resource block, or a moved/import block for a
refactor.
WEAK PROMPT vs STRONG PROMPT
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
WEAK: "Create an RDS database" Problems: No engine, no sizing, no network placement, no
encryption requirement, no naming convention, no module reuse. Model will guess defaults —
often wrong for your org. STRONG: "Add a new RDS PostgreSQL 16 instance to
modules/data/main.tf. Use the existing aws_db_subnet_group.private (already defined in
this file). Instance class db.r6g.large, 200GB gp3 storage, Multi-AZ enabled. Pull the
master password from data.aws_secretsmanager_secret_version.db_master (already defined).
Follow the existing tagging convention using local.common_tags. Add lifecycle {
prevent_destroy = true } since this is a production database. Do not hardcode any
credentials or CIDR blocks." Result: Generation grounded in real context, matching org
conventions, with explicit safety requirements stated upfront.

### 4.2 Context-Rich Prompting Patterns

For agentic tools with repository access, the prompting pattern shifts from 'describe everything' to 'point at the
right context and state the goal':
# Pattern: Point at context, state the goal, state the constraint
"Look at modules/networking/ to understand our VPC conventions.
Then add a new private subnet in us-east-1d following the same
pattern as the existing subnets. Run terraform plan when done
and show me the diff before applying anything."
# Pattern: Constrain the blast radius explicitly
"I want to rename aws_instance.web to aws_instance.frontend.
Use a moved block - do NOT let this destroy and recreate the
instance. Show me the plan output to confirm zero resource
changes before I approve."
# Pattern: Request explanation alongside generation
"Generate the IAM policy for the Lambda execution role, and
explain in a comment above each statement why that permission
is needed. Use least-privilege - no wildcard actions."

### 4.3 Prompt Library — 30 Production

Patterns
A curated library of reusable prompt patterns organized by task category.
Resource Generation
- "Generate a [resource type] in [file/module] following the conventions in [existing file]. Constraints: [list]. Do
not: [list]."
- "Add [resource] with the same tagging, naming, and lifecycle pattern as [existing similar resource]."
- "Create a reusable module for [pattern] with inputs for [list] and sensible secure defaults."
Refactoring
- "Convert this resource from count to for_each, and generate the moved blocks needed to avoid
destroy/recreate."
- "Extract this resource block into a new module called [name], update all references, and show the plan
diff."
- "Rename [resource A] to [resource B] using a moved block. Confirm via plan that zero resources will be
replaced."
Review & Explanation
- "Explain what this terraform plan output will actually do in plain English, and flag anything that looks risky."
- "Review this IAM policy for least-privilege violations and suggest a tighter version."
- "Explain why this resource is showing as 'forces replacement' in the plan."
Drift & Troubleshooting
- "Here is a terraform plan -refresh-only diff. Explain what changed outside of Terraform and whether it looks
intentional."
- "This terraform apply failed with [error]. Diagnose the root cause and propose a fix without expanding
scope."
- "Generate an import block for this existing cloud resource and the matching resource configuration."
Security & Compliance
- "Scan this module for hardcoded secrets, overly permissive security groups, and missing encryption
settings."
- "Generate this resource with HIPAA-compliant encryption-at-rest and audit logging enabled."
- "Check whether this S3 bucket configuration could become publicly accessible under any condition."
Decommissioning
- "Generate a plan -destroy review for [module], and list any prevent_destroy guards that need to be
removed first."
- "Identify all resources in this state file that reference [legacy service] for retirement planning."

## Part 5: The Human-in-the-Loop Architecture
*Why Full Autonomy Is Premature, Review Gates, Plan-Review-Apply*

### 5.1 Why Full Autonomy Is Premature for

Infrastructure
As of 2026, the consensus among platform engineering teams is that fully autonomous infrastructure operation
(Level 4 on the autonomy spectrum) is not appropriate for production environments. This is not a permanent
technical ceiling — it reflects the current maturity of validation tooling, the asymmetric cost of infrastructure
mistakes, and the absence of true transactional rollback in cloud APIs.
- Irreversibility: Many cloud operations (data deletion, DNS changes, certificate rotation) cannot be cleanly
undone even by another AI action.
- Incomplete observability: An agent's view of 'success' (terraform apply exited 0) does not capture
downstream effects like a brief production outage during a replacement.
- Accountability: Production changes typically require a named, accountable human approver for audit and
compliance purposes — a requirement that predates AI and remains in force.
I The mature pattern in 2026 is not 'AI vs human' — it is AI doing the toilsome 80% (drafting, validating,
explaining) while a human makes the final, accountable judgment call on the remaining 20% that actually carries
risk.

### 5.2 Review Gates and Approval

Workflows
A robust AI-IaC pipeline has multiple distinct review gates, each catching a different class of problem:

### 5.3 Plan-Review-Apply with AI in the Loop

| Gate What It Checks Who/What Performs It Blocks On                                                                 |
| ------------------------------------------------------------------------------------------------------------------ |
| Syntax Gate Valid HCL, provider schema compliance terraform validate, terraform fmt Any syntax/schema error        |
| Static Security Gate Hardcoded secrets, insecure defaultstfsec, Checkov, Trivy High/critical findings              |
| Policy Gate Org-specific compliance rules OPA/Conftest, Sentinel Policy violation                                  |
| Cost Gate Budget impact of the change Infracost Cost delta above threshold                                         |
| Plan Review Gate Actual diff vs intent — human judgment Human reviewer (PR approval) Lack of explicit approval     |
| Production Apply Gate Final go/no-go for prod changes Named human approver + change ticket Missing approval record |

This is the reference workflow pattern for safely incorporating AI generation and agentic tool-use into a
production-grade pipeline.
PLAN-REVIEW-APPLY WITH AI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 1.
Engineer describes intent to AI (chat or agentic tool)I
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 2. AI generates/modifies code with
full repo contextI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 3. AI runs terraform validate + fmt
locallyI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 4. AI runs terraform plan and reads
the outputI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 5. AI self-corrects on any plan
errors (agentic loop)I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 6. AI summarizes the plan in plain
English for the humanI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 7. Code + plan pushed as PR - CI runs
guardrail gatesI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 8. HUMAN REVIEWS: code diff + plan
diff + AI's explanationI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 9. Human approves PR (or requests
changes)I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 10. CI/CD applies AFTER merge - same
plan that was reviewedI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
II A critical safety property: the plan that gets applied must be the SAME plan that was reviewed (terraform
apply tfplan, not a fresh terraform apply). State can change between review and apply — always apply the saved
plan, never re-plan-and-apply blindly, whether the change came from a human or an AI agent.

## Part 6: Validation & Guardrail Pipelines
*Static Analysis, Policy as Code, Cost Gates*

### 6.1 Static Analysis: tfsec, Checkov, tflint

Static analysis tools scan IaC for known-bad patterns without needing to apply anything. They are the first line
of defense against AI-generated security mistakes and should run on every AI-generated change before a
human even looks at it.
# tfsec: security-focused static analysis
tfsec . --minimum-severity HIGH
# Checkov: broader policy + security + compliance scanning
checkov -d . --framework terraform \
--check CKV_AWS_20,CKV_AWS_21 \
--compact
# tflint: linting for correctness and best practices
tflint --recursive
# Trivy: combined IaC + container + dependency scanning
trivy config . --severity HIGH,CRITICAL
# Example CI step combining all three
jobs:
guardrails:
steps:
- run: terraform fmt -check -recursive
- run: terraform validate
- run: tflint --recursive
- run: tfsec . --minimum-severity HIGH
- run: checkov -d . --compact --quiet

### 6.2 Policy as Code: OPA, Sentinel,

Conftest
Policy-as-code engines enforce organization-specific rules that go beyond generic security best practices —
things like 'all production databases must have Multi-AZ enabled' or 'no resource may be created outside
approved regions'. This is the layer that catches AI-generated code that is syntactically perfect but violates
internal standards.
# OPA / Conftest policy example (Rego)
package terraform.security
deny[msg] {
resource := input.resource_changes[_]
resource.type == "aws_s3_bucket"
resource.change.after.acl == "public-read"
msg := sprintf(
"S3 bucket %v must not have public-read ACL",
[resource.address]
)
}
deny[msg] {
resource := input.resource_changes[_]
resource.type == "aws_db_instance"
resource.change.after.multi_az == false
contains(resource.address, "prod")
msg := sprintf(
"Production database %v must have Multi-AZ enabled",
[resource.address]
)
}
# Run against a plan JSON export:
terraform show -json tfplan > plan.json
conftest test plan.json -p policy/
II Policy-as-code is the single most important guardrail for AI-IaC specifically because it encodes
organizational knowledge that no public training corpus contains. An AI model cannot know your company
requires Multi-AZ on production databases unless that requirement is either in the prompt context or enforced
downstream by policy.

### 6.3 Cost Estimation Gates: Infracost

AI-generated infrastructure can introduce significant unintended cost — for example, defaulting to an oversized
instance class or forgetting to set lifecycle rules on storage. Cost gates catch this before apply.
# Generate a cost estimate from a plan
infracost breakdown --path . --format json --out-file infracost.json
# Compare against baseline (e.g., main branch) in CI
infracost diff --path . --compare-to infracost-base.json
# Fail the pipeline if monthly cost delta exceeds a threshold
infracost comment github --path infracost.json \
--repo my-org/infra --pull-request $PR_NUMBER \
--github-token $GITHUB_TOKEN

### 6.4 Multi-Layer Guardrail Architecture

Production-grade AI-IaC pipelines stack these guardrails in layers, with each layer catching a different failure
mode AI generation is prone to:
MULTI-LAYER GUARDRAIL ARCHITECTURE FOR AI-GENERATED IaC
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII AI
generates/modifies code I M IIIIIIIIIIIIIIIIIIIIIIIII I Layer 1: Syntax I
terraform validate, fmt IIIIIIIIIIIIIIIIIIIIIIIII M
IIIIIIIIIIIIIIIIIIIIIIIII I Layer 2: Security Scan I tfsec, Checkov, Trivy
IIIIIIIIIIIIIIIIIIIIIIIII M IIIIIIIIIIIIIIIIIIIIIIIII I Layer 3: Policy
Rules I OPA / Conftest / Sentinel IIIIIIIIIIIIIIIIIIIIIIIII M
IIIIIIIIIIIIIIIIIIIIIIIII I Layer 4: Cost Gate I Infracost threshold check
IIIIIIIIIIIIIIIIIIIIIIIII M IIIIIIIIIIIIIIIIIIIIIIIII I Layer 5: terraform
planI Real diff against live state IIIIIIIIIIIIIIIIIIIIIIIII M
IIIIIIIIIIIIIIIIIIIIIIIII I Layer 6: Human Review I PR approval, named approver
IIIIIIIIIIIIIIIIIIIIIIIII M terraform apply

## Part 7: Agentic Workflows for Infrastructure
*Tool-Use Loops, MCP, Permission Boundaries*

### 7.1 What Makes a Workflow 'Agentic'

An agentic IaC workflow is distinguished from simple chat generation by a loop: the AI takes an action (e.g.,
running a command), observes the result, and decides the next action — repeating until the task is complete or
it needs human input. This loop is what allows an agent to self-correct syntax errors, follow up on plan output,
and iterate toward a working result.
AGENTIC TOOL-USE LOOP IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
IIIIIIIIIIIIIIIIIIIIIIIIIII I Receive task/goal I
IIIIIIIIIIIIIIIIIIIIIIIIIIII M IIIIIIIIIIIIIIIIIIIIIIIIIII IIIIII Decide
next action I I IIIIIIIIIIIIIIIIIIIIIIIIIIII I M I
IIIIIIIIIIIIIIIIIIIIIIIIIII I I Execute tool call I I I (read file, run plan, I
I I query state, etc.) I I IIIIIIIIIIIIIIIIIIIIIIIIIIII I M I
IIIIIIIIIIIIIIIIIIIIIIIIIII I I Observe result I I
IIIIIIIIIIIIIIIIIIIIIIIIIIII I M I Task complete? I or needs human? IIIIIIII No
IIIIIIIIIIIII Yes III Present to human

### 7.2 MCP and Infrastructure Tool Servers

The Model Context Protocol (MCP) standardizes how AI agents discover and call external tools. For
infrastructure, this means an agent can be given scoped, auditable access to specific operations — reading
state, running plan, querying cloud cost APIs — rather than raw shell access.
I apply and destroy capability should never be granted directly to an autonomous agent's tool-calling loop in
production. The standard, safe pattern is: agent generates code and a validated plan → human approves PR →
CI/CD system (not the agent) performs the actual apply using its own scoped, audited credentials.

| Tool Server Capability Example Operation Risk Level Recommended Scope                                            |
| ---------------------------------------------------------------------------------------------------------------- |
| Read repository List/read .tf files in a given path Low All agents, all environments                             |
| Run terraform plan Execute plan, return diff Low (read-only against cloud) All agents, all environments          |
| Run terraform validate/fmt Syntax and style checks Low All agents, all environments                              |
| Read state terraform state list / show Low-Medium (may expose sensitive attrs) Scoped per-project; redact sensit |
| Query cloud cost APIs Get current spend for a resource group Low Read-only, broad access accepta                 |
| Run terraform apply Execute real infrastructure changes High Restricted to CI/CD identity, neve                  |
| Run terraform destroy Destroy resources Critical Never granted to autonomous ag                                  |

### 7.3 Agent Permission Boundaries

Designing the permission boundary for an infrastructure agent is an exercise in least-privilege, identical in spirit
to IAM design but applied to AI tool access.
- Environment scoping: An agent should default to dev/staging tool access; production tool access
requires explicit, separately-granted scope.
- Read vs write separation: Read operations (plan, state list, cost queries) can be broadly available; write
operations (apply, destroy, state mv/rm) should be gated or entirely excluded from agent tool access.
- Credential isolation: The agent's tool-calling identity should never share credentials with a human
operator's session — use separate, audited service identities.
- Action logging: Every tool call an agent makes against real infrastructure (even read-only) should be
logged with the originating request, for audit and incident response.

## Part 8: AI-Assisted State & Drift
*Management*

### 8.1 AI-Powered Drift Explanation

One of the highest-value, lowest-risk applications of AI in infrastructure operations is explaining drift in plain
English. Raw terraform plan -refresh-only output is dense; an AI model excels at translating it into a clear
narrative a human can quickly evaluate.
# Workflow: scheduled drift detection feeding an AI summarizer
$ terraform plan -refresh-only -out=drift.tfplan
$ terraform show -json drift.tfplan > drift.json
# Feed drift.json to the model with a prompt like:
"Summarize this Terraform refresh-only plan in plain English.
For each changed resource, state: what changed, whether it
looks like an intentional manual change or a potential problem,
and a recommended action (accept drift / investigate / revert)."
# Example AI output:
"aws_security_group.web: an inbound rule for port 22 (SSH) from
0.0.0.0/0 was added outside of Terraform. This is NOT present
in your code and looks like a manual change that widens access.
Recommended action: investigate immediately - this may be an
unauthorized change or an emergency fix that needs codifying."

### 8.2 Automated Drift Remediation PRs

A common production pattern: a scheduled job detects drift, an AI agent drafts a remediation PR (either
reconciling code to match reality, or proposing to revert the live resource to match code), and a human reviews
and merges.
DRIFT REMEDIATION PIPELINE IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 1.
Scheduled job: terraform plan -refresh-only (nightly)I
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 2. Drift detected - diff captured as
JSONI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 3. Agent analyzes diff, drafts
explanation + recommendationI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 4. Agent opens PR: either codify
drift OR plan to revert itI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 5. PR includes AI's reasoning + the
raw plan outputI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 6. Platform team reviews and decides:
accept or revertI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I 7. Merge triggers terraform apply
(codify) or revert applyI IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

### 8.3 Risk Scoring for Proposed Changes

AI models can be used to triage the risk level of a proposed infrastructure change, helping route low-risk
changes to fast-track approval and high-risk changes to deeper review — though the scoring itself should be
treated as advisory, not authoritative.
II AI-generated risk scores should never fully replace the plan-review gate — treat them as a triage aid that
helps humans prioritize attention, not as an approval mechanism in themselves.

| Risk Signal Example Suggested Routing                                                                       |
| ----------------------------------------------------------------------------------------------------------- |
| Resource replacement (destroy+create) forces replacement on a stateful resource Mandatory senior review     |
| IAM/security group changes New policy statement or ingress rule Mandatory security review                   |
| Production environment + Multi-AZ/HA resource Prod RDS, prod EKS node group Mandatory platform team review  |
| Cost delta above threshold +$5,000/month or more Mandatory budget owner review                              |
| Tag/metadata-only changes Adding a cost-center tag Fast-track / auto-approvable                             |
| Non-prod, additive-only changes New dev-environment resource, no deletionsFast-track with standard CI gates |

## Part 9: AI-Assisted Rollback & Incident
*Response*

### 9.1 AI-Generated Incident Postmortems

After an infrastructure incident, AI models are highly effective at drafting the first version of a postmortem from
raw artifacts — Terraform plan/apply logs, monitoring alerts, and incident channel transcripts — which a human
then refines and finalizes.
- Feed the model: the failed apply log, the relevant Git diff, monitoring data, and the incident timeline.
- Ask for: a structured draft covering timeline, root cause hypothesis, impact, and remediation steps already
taken.
- Always have a human owner validate the root cause - AI can mis-attribute causality from correlated
events.

### 9.2 Automated Rollback PR Generation

Following the Git-based rollback pattern from standard Terraform practice, an AI agent can accelerate the
recovery path by drafting the revert PR immediately upon detecting a failed deployment.
# Workflow: CI detects failed apply -> triggers AI rollback drafting
1. terraform apply fails or post-apply health check fails
2. CI captures: failing commit SHA, last-known-good SHA, apply log
3. Agent is given: "Generate a revert PR from <bad_sha> back to
<good_sha>. Run terraform plan against the reverted code and
confirm the plan only undoes the failed change - flag if it
would affect anything beyond the original change set."
4. Agent runs git revert, runs terraform plan, captures diff
5. Agent opens PR with: revert diff + plan output + plain-English
summary of what will be restored
6. On-call engineer reviews and approves - fast path to recovery
7. Merge triggers terraform apply via standard CI/CD pipeline
I This pattern keeps the human as the final approver while removing the slowest part of incident response under
pressure: correctly drafting and validating the revert itself. The agent does the mechanical work; the on-call
engineer makes the call.

### 9.3 On-Call Copilots for Infrastructure

Incidents
Chat-based AI assistants integrated into incident channels can accelerate triage by answering questions
against real infrastructure context (via MCP tool access) during an active incident.
- Useful queries during incidents: 'What changed in this module in the last 24 hours?', 'Show me the plan
diff for the last apply to this state file', 'What does this error message typically indicate?'
- Boundaries during incidents: The copilot should retain read-only access during live incidents - write
actions (rollback applies, scaling changes) should still go through a human-triggered path, even under time
pressure, given the elevated risk of errors compounding an active incident.

## Part 10: Security in AI-Generated
*Infrastructure*

### 10.1 Common Security Mistakes LLMs

Make
LLMs trained on public tutorials and documentation absorb the security posture of that training data - which
frequently favors simplicity for teaching purposes over production-grade security. Recognizing these patterns is
essential for reviewers.

### 10.2 Secrets Leakage Risks Specific to AI

Workflows
AI-assisted workflows introduce secret-handling risks beyond standard IaC concerns, because prompts, chat
history, and agent context can themselves become a leakage vector.
I Never paste real secrets, API keys, or credentials into a chat prompt - even to 'show the AI the current value'
for troubleshooting. Treat chat context with the same sensitivity as a logging system: assume it may be retained.
- Risk: An engineer pastes a real database password into a chat prompt to ask the AI why a connection is
failing.
- Risk: An agent with broad file-read access inadvertently includes a .tfvars file containing secrets in its
context when summarizing a module.
- Mitigation: Use .gitignore and explicit file-access scoping to exclude .tfvars, .env, and credential files from
any agent's readable context.
- Mitigation: Reference secrets only by their Secrets Manager/Vault path in prompts and code - never by
value.

| Mistake Pattern Why It Happens Correct Pattern                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------- |
| Wildcard IAM actions/resources Tutorials often use a wildcard action for simplicity Enumerate specific actions and ARNs explicitly    |
| Public S3 bucket defaults Older training examples predate default-private S3 changes Explicitly set block_public_access on every buc  |
| Hardcoded credentials in examplesCommon in quick-start documentation snippets Always source from Secrets Manager/Vault, ne            |
| Overly broad security group ingressOpen ingress is common in 'getting started' examples Scope ingress to specific CIDR ranges or secu |
| Missing encryption-at-rest Often omitted in minimal examples for brevity Explicitly enable encryption on all stateful reso            |
| Default/weak password generationSimplistic examples use static or weak defaults Use random_password resource with sufficient          |

### 10.3 IAM Over-Permissioning Patterns

Because least-privilege IAM design requires understanding the precise minimum permission set for a workload
- knowledge that often lives only in tribal/organizational context - AI-generated IAM policies should be treated as
a starting draft requiring tightening, not a final answer.
# Common AI-generated starting point (too broad) - NEEDS TIGHTENING
resource "aws_iam_role_policy" "lambda" {
role = aws_iam_role.lambda.id
policy = jsonencode({
Version = "2012-10-17"
Statement = [{
Effect   = "Allow"
Action   = "s3:*"
Resource = "*"
}]
})
}
# Tightened after review - least privilege
resource "aws_iam_role_policy" "lambda" {
role = aws_iam_role.lambda.id
policy = jsonencode({
Version = "2012-10-17"
Statement = [{
Effect = "Allow"
Action = [
"s3:GetObject",
"s3:PutObject"
]
Resource = "${aws_s3_bucket.uploads.arn}/*"
}]
})
}

## Part 11: Testing AI-Generated IaC
*Test Frameworks, Policy-Driven Generation, Regression Testing*

### 11.1 Terraform Test Framework + AI

The native terraform test framework (HCL-based, .tftest.hcl files) is well suited to AI-assisted generation, since
test assertions follow predictable patterns the model can replicate from existing test files.
# tests/vpc.tftest.hcl - AI-assisted test generation
run "vpc_has_correct_cidr" {
command = plan
assert {
condition     = aws_vpc.main.cidr_block == "10.0.0.0/16"
error_message = "VPC CIDR block does not match expected value"
}
}
run "subnet_count_matches_az_count" {
command = plan
assert {
condition     = length(aws_subnet.private) == length(var.azs)
error_message = "Number of private subnets must match number of AZs"
}
}
run "no_public_db_subnet" {
command = plan
assert {
condition     = aws_db_subnet_group.main.subnet_ids != aws_subnet.public[*].id
error_message = "Database subnet group must not use public subnets"
}
}
A useful agentic pattern: 'Generate a .tftest.hcl test file for this module that verifies the security-relevant
invariants - no public database subnets, encryption enabled, no wildcard IAM actions.' The AI drafts assertions;
a human verifies they capture the right invariants.

### 11.2 Policy-Driven Test Generation

Rather than asking an AI to invent test cases from scratch, the highest-quality results come from asking it to
generate tests that enforce your existing OPA/Conftest policies - turning prose policy into executable
assertions, and vice versa.

### 11.3 Regression Testing for AI

Suggestions
Organizations that rely heavily on AI-assisted IaC benefit from maintaining a regression suite of prompts and
expected-safe outputs - re-running representative prompts periodically (e.g., after a model upgrade) to confirm
generation quality and safety haven't regressed.
- Maintain a small library of 'known good' prompt -> expected pattern pairs (e.g., 'create an S3 bucket'
should always produce encryption + versioning + blocked public access by default in your org's templates).
- Re-run this library when switching models or model versions, and after major prompt template changes.
- Track drift in AI output quality the same way you'd track drift in infrastructure state.

## Part 12: Enterprise Governance for AI-IaC
*Model Selection, Audit Trails, Approval Matrices*

### 12.1 Model Selection & Data Residency

Considerations
Choosing which AI models and platforms are approved for infrastructure work is a governance decision, not just
a technical one. Key factors enterprises evaluate:
- Data handling policy: Does the vendor train on submitted code/prompts? Is there a zero-retention or
enterprise data-handling tier?
- Code/IP exposure: Internal module names, account IDs, and architecture patterns may be sensitive -
review what context is sent to a third-party model.
- Compliance certifications: SOC 2, ISO 27001, and relevant industry certifications (HIPAA, FedRAMP)
for the AI vendor, where applicable to your industry.
- Deployment model: Cloud-hosted API vs VPC-deployed/private model endpoints for highly sensitive
environments.
II Always check current vendor documentation for data-handling and compliance terms - these policies evolve
and the specifics should be verified directly with the vendor rather than assumed from general reputation.

### 12.2 Audit Trails for AI-Generated

Changes
Regulatory and internal audit requirements increasingly expect organizations to be able to answer: 'was this
infrastructure change AI-generated, and who approved it?' Building this traceability in from the start avoids
painful retrofitting.

### 12.3 Approval Matrices by Risk Tier

| Audit Element What to Capture Where to Store It                                                                 |
| --------------------------------------------------------------------------------------------------------------- |
| Generation provenance Was this PR AI-assisted? Which tool/model? PR metadata / commit trailer                   |
| Prompt/intent record What was the original request that led to this change? Linked ticket or PR description     |
| Validation results Which guardrail gates passed/failed and whenCI pipeline logs, retained per compliance policy |
| Human approver Named individual who approved the PR/applyPR approval record, change management ticke            |
| Apply execution record Who/what triggered the actual apply CI/CD execution logs with identity                   |

A practical governance tool: define explicit approval requirements by combining the change's risk tier (Part 8.3)
with whether it was AI-generated.

| Risk Tier Human-Authored AI-Assisted (Levels 1-2) AI-Agentic (Level 3)                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Low (non-prod, additive) 1 peer review 1 peer review 1 peer review + guardrail gate                                                            |
| Medium (prod, additive) 1 peer review 1 peer review + guardrail gates 1 peer review + guardrails + p                                           |
| High (prod, replacement/IAM/security) Senior review + guardrails Senior review + guardrails + AI-disclosure Senior review + guardrails + d     |
| Critical (prod data deletion, destroy) Two-person rule + change ticket Two-person rule + ticket + AI-disclosure Not permitted via agentic path |

## Part 13: Anti-Pattern Catalog
*18 Critical AI-IaC Anti-Patterns & Remediation*

### 13.0 The 18 Critical AI-IaC Anti-Patterns

|                                                                                                                                                                                                                                                                              |     |       |     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----- | --- |
| AIP-0 1 Blind Auto-Apply Problem: Configuring an agent to run terraform apply automatically after generation, with no human review of the plan. Fix: Always require a human-approved PR/plan gate before any apply, regardless of how the code was generated.                |     | AIP-0 |     |
|                                                                                                                                                                                                                                                                              |     | 1     |     |
|                                                                                                                                                                                                                                                                              |     |       |     |
| AIP-0 2 Pasting Secrets into Prompts Problem: Engineers pasting real passwords, API keys, or tokens into chat prompts for troubleshooting. Fix: Reference secrets only by their secret-manager path; redact before pasting logs/configs into any AI tool.                    |     | AIP-0 |     |
|                                                                                                                                                                                                                                                                              |     | 2     |     |
|                                                                                                                                                                                                                                                                              |     |       |     |
| AIP-0 3 Trusting Generated IAM Policies As-Is Problem: Applying AI-generated IAM policies without tightening overly broad default actions/resources. Fix: Always run least-privilege review on generated IAM policies; treat wildcards as a draft, not final.                |     | AIP-0 |     |
|                                                                                                                                                                                                                                                                              |     | 3     |     |
|                                                                                                                                                                                                                                                                              |     |       |     |
| AIP-0 4 No Context, Generic Prompts Problem: Asking for infrastructure code with no reference to existing modules or org conventions, producing inconsistent code. Fix: Always provide existing module context, naming conventions, and constraints in the prompt.           |     | AIP-0 |     |
|                                                                                                                                                                                                                                                                              |     | 4     |     |
|                                                                                                                                                                                                                                                                              |     |       |     |
| AIP-0 5 Granting Agents apply/destroy Tool Access in Prod Problem: Configuring an MCP/agent tool server with write capability directly against production state. Fix: Restrict apply/destroy to CI/CD-triggered execution post-human-approval; never direct agent execution. |     | AIP-0 |     |
|                                                                                                                                                                                                                                                                              |     | 5     |     |
|                                                                                                                                                                                                                                                                              |     |       |     |
| AIP-0 6 Treating AI Risk Scores as Approval Problem: Auto-approving changes because an AI-generated risk score labeled them 'low risk'. Fix: Use AI risk scoring only as triage; require human sign-off through the standard plan-review gate.                               |     | AIP-0 |     |
|                                                                                                                                                                                                                                                                              |     | 6     |     |
|                                                                                                                                                                                                                                                                              |     |       |     |
| AIP-0 7 No Guardrail Pipeline for AI-Generated Code Problem: Treating AI-generated PRs as exempt from, or held to lower standards than, normal CI guardrails. Fix: Apply identical (or stricter) static analysis, policy, and cost gates to AI-generated changes.            |     | AIP-0 |     |
|                                                                                                                                                                                                                                                                              |     | 7     |     |
|                                                                                                                                                                                                                                                                              |     |       |     |
| AIP-0 8 Re-Planning Before Apply Instead of Applying Saved Plan Problem: Agent or pipeline runs a fresh terraform apply instead of applying the exact reviewed plan file. Fix: Always apply the saved plan (terraform apply tfplan) that was actually reviewed and approved. |     | AIP-0 |     |
|                                                                                                                                                                                                                                                                              |     | 8     |     |

|                                                                                                                                                                                                                                                                                                                |     |       |     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ----- | --- |
| AIP-0 9 Assuming Model Knowledge Is Current Problem: Trusting AI-suggested provider arguments or resource types without checking against current provider docs. Fix: Run terraform validate immediately; verify against current provider documentation for recent changes.                                     |     | AIP-0 |     |
|                                                                                                                                                                                                                                                                                                                |     | 9     |     |
|                                                                                                                                                                                                                                                                                                                |     |       |     |
| AIP-1 0 No Audit Trail of AI Involvement Problem: PRs merged with no record of whether/how AI assisted, making later audits and incident analysis harder. Fix: Tag PRs/commits with AI-assistance provenance (tool, model, prompt reference).                                                                  |     | AIP-1 |     |
|                                                                                                                                                                                                                                                                                                                |     | 0     |     |
|                                                                                                                                                                                                                                                                                                                |     |       |     |
| AIP-1 1 Unscoped Agent File Access Problem: An agent with read access to the entire repo, including .tfvars and credential files containing secrets. Fix: Explicitly exclude secret-bearing files from agent-readable context via .gitignore/.aiignore equivalents.                                            |     | AIP-1 |     |
|                                                                                                                                                                                                                                                                                                                |     | 1     |     |
|                                                                                                                                                                                                                                                                                                                |     |       |     |
| AIP-1 2 Copy-Pasting Generated Code Without Running Plan Problem: Pasting AI-suggested code directly into production modules without running terraform plan locally first. Fix: Always run plan (and ideally appropriate dry checks) before opening a PR.                                                      |     | AIP-1 |     |
|                                                                                                                                                                                                                                                                                                                |     | 2     |     |
|                                                                                                                                                                                                                                                                                                                |     |       |     |
| AIP-1 3 Using Generic Public-Tutorial Patterns in Production Problem: Accepting AI suggestions that mirror simplified 'getting started' tutorial patterns rather than production-grade configs. Fix: Explicitly prompt for production-grade requirements: encryption, HA, least-privilege, in every request.   |     | AIP-1 |     |
|                                                                                                                                                                                                                                                                                                                |     | 3     |     |
|                                                                                                                                                                                                                                                                                                                |     |       |     |
| AIP-1 4 No Regression Testing of Model/Prompt Changes Problem: Switching AI tools or model versions without verifying generation quality/safety hasn't regressed. Fix: Maintain a prompt regression library; re-test after any model or tool version change.                                                   |     | AIP-1 |     |
|                                                                                                                                                                                                                                                                                                                |     | 4     |     |
|                                                                                                                                                                                                                                                                                                                |     |       |     |
| AIP-1 5 Letting AI Decide Architecture Without Human Design Review Problem: Using AI-generated infrastructure topology decisions (e.g., network design) without architectural review. Fix: Reserve architecture/design decisions for human architects; use AI for implementation, not architecture by default. |     | AIP-1 |     |
|                                                                                                                                                                                                                                                                                                                |     | 5     |     |
|                                                                                                                                                                                                                                                                                                                |     |       |     |
| AIP-1 6 Sending Proprietary Module Code to Unapproved External Tools Problem: Engineers using personal AI tool accounts to paste internal, proprietary module code for help. Fix: Restrict IaC-related AI assistance to enterprise-approved tools with appropriate data-handling agreements.                   |     | AIP-1 |     |
|                                                                                                                                                                                                                                                                                                                |     | 6     |     |

Problem: Production changes applied with no named, accountable human approver of record.
Fix: Every production apply must have a named human approver, AI-assisted or not - no exceptions.
Problem: Trusting an AI's confident, well-written explanation of a plan as proof the plan itself is correct.
Fix: Treat AI explanations as an aid to human review, not a substitute for reading the actual plan diff.

|     |       |     |
| --- | ----- | --- |
|     | AIP-1 |     |
|     | 7     |     |

|     |       |     |
| --- | ----- | --- |
|     | AIP-1 |     |
|     | 8     |     |

## Part 14: Building an Internal AI-IaC Platform
*Reference Architecture, RAG, Custom MCP Agents*

### 14.1 Reference Architecture

Platform teams building internal AI-assisted infrastructure tooling generally converge on a similar architecture: a
retrieval layer grounding the model in organization-specific context, a tool-use layer for safe execution, and a
governance layer enforcing approval workflows.
INTERNAL AI-IaC PLATFORM REFERENCE ARCHITECTURE
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I Engineer
Interface I I (Chat UI / IDE Plugin / Slack Bot / CLI) I
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I
Orchestration Layer I I Routes request -> selects model -> assembles context I
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII M M
IIIIIIIIIIIIIIIIIIII IIIIIIIIIIIIIIIIIIIIIIIIIIII I RAG Retrieval I I MCP
Tool Servers I I - Internal modulesI I - terraform plan/validateI I - Style guides I I -
state read (scoped) I I - Past PRs/ADRs I I - cost API I IIIIIIIIIIIIIIIIIIII
IIIIIIIIIIIIIIIIIIIIIIIIIIII I I IIIIIIIIIIIIIIIIIIIIIIIIIIIIIII M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I Guardrail &
Governance Layer I I Static analysis I Policy as Code I Cost gate I Audit I
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII M
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII I Human Review
(PR) -> CI/CD -> Cloud APIs I
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII

### 14.2 RAG over Internal Module Libraries

Retrieval-Augmented Generation (RAG) grounds the model in your organization's actual modules, conventions,
and past decisions rather than relying solely on public training data. This is the single highest-leverage
investment for improving AI-IaC output quality at scale.
- Index your internal Terraform module registry - descriptions, inputs/outputs, usage examples.
- Index architecture decision records (ADRs) so the model can explain or follow past design rationale.
- Index your style guide and naming conventions so generated code matches organizational standards
by default.
- Index past incident postmortems related to infrastructure changes, so the model can flag patterns
similar to historical incidents.

### 14.3 Custom Agents with MCP Tooling

Organizations building custom internal agents typically scope them narrowly around specific, well-bounded
workflows rather than a general-purpose 'do anything with infrastructure' agent - narrow scope makes
guardrails tractable and review more reliable.

| Agent Scope Example Tool Access Granted Why Narrow Scope Works                                                                |
| ----------------------------------------------------------------------------------------------------------------------------- |
| New environment provisioner Read templates, write to new env directory only, run plan Cannot touch existing prod resources by |
| Drift explainer Read state, run plan -refresh-only, no write access Pure read/analysis - very low risk profile                |
| Cost optimization advisor Read state + cost APIs, propose PRs (no auto-apply) Suggestions only; human decides on eve          |
| Module documentation generator Read module source, write README only Cannot affect infrastructure at all                      |

## Part 15: Troubleshooting Playbook
*Hallucinated Resources, AI-Introduced Drift, Bad Auto-Applies*

### 15.1 Diagnosing Hallucinated Resources

Quick reference for catching and correcting common AI-generation failure modes.
I terraform init / validate fails after AI generation
- Check for invented resource types or arguments not present in current provider schema
- Run terraform providers schema -json to confirm valid arguments for the resource type
- Ask the AI to regenerate using only documented arguments - paste the schema if needed
- Verify the provider version constraint matches what the AI assumed
I Plan shows unexpected resource replacement
- Check if the AI changed an attribute marked ForceNew in the provider (common in 'cleanup' suggestions)
- Compare AI-generated code against the prior version line-by-line for unintended attribute changes
- If renaming was the intent, verify a moved block was generated - AI sometimes omits this
I AI-generated module doesn't match org conventions
- Provide explicit existing-file context in the next prompt rather than a cold request
- Point an agentic tool directly at the module directory to read conventions before generating
- Add the deviation pattern to your prompt regression library to catch it earlier next time
I Generated IAM policy is broader than necessary
- Treat as expected default behavior, not a bug - always run a least-privilege tightening pass
- Use a policy-as-code rule (Part 6.2) to catch this category automatically in CI
- Ask the AI explicitly: 'tighten this to least-privilege, enumerate exact actions and resources'
I Agent loop fails to converge (repeated plan errors)
- Check if the error is outside the agent's context window (e.g., a cross-module dependency it can't see)
- Provide the missing file/module context explicitly and retry
- Cap agentic retry loops - if not resolved in N attempts, escalate to human rather than looping indefinitely

### 15.2 Recovering from Bad Auto-Applies

If a misconfigured pipeline allowed an AI-generated change to apply without adequate review and produced a
bad outcome, the recovery path follows standard Terraform rollback practice - the fact that AI generated the
original code does not change the recovery mechanics.
- Follow the standard Git-based rollback procedure: identify last-known-good commit, revert, plan, apply.
- Treat the incident as a guardrail failure first: identify which gate should have caught this and was missing
or misconfigured.
- Update the guardrail pipeline (policy rule, required review step) before re-enabling the workflow that
produced the bad apply.

## Part 16: The Future of AI-Assisted IaC
*Self-Healing Infrastructure, NL Platforms, Where Humans Remain Essential*

### 16.1 Self-Healing Infrastructure

An emerging pattern combines AI drift analysis with automated, guarded remediation: systems that detect drift,
propose a fix, run it through the full guardrail pipeline, and apply low-risk fixes automatically while escalating
higher-risk drift to humans.
EMERGING SELF-HEALING PATTERN (WITH GUARDRAILS)
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII Drift detected
--> AI classifies risk --> Risk tier? I
IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII M M LOW RISK HIGH RISK
(tag/metadata drift) (security/IAM/data) I I M M Auto-apply through Escalate to human
full guardrail pipeline with full context + audit log entry and AI's analysis
II Even in self-healing designs, the trend is toward tiered autonomy - automatic only for genuinely low-risk,
well-understood drift categories, with everything else routed to a human. Full autonomous remediation of
arbitrary drift remains an open risk area.

### 16.2 Natural-Language Infrastructure

Platforms
Platform teams are increasingly building internal self-service layers where engineers describe infrastructure
needs in natural language and receive a validated, governed Terraform change - abstracting away HCL syntax
for common, well-templated requests while routing novel or complex requests to human platform engineers.
- Works well for: Standardized, templated requests - 'give me a new dev environment', 'add a read replica',
'create a new microservice's baseline infra'.
- Still requires human platform engineering for: Novel architecture, cross-cutting changes, anything
touching shared/critical infrastructure.

### 16.3 Where Human Judgment Remains

Essential
Across every pattern in this guide, certain categories of decision remain firmly in human hands, and this is
expected to remain true for the foreseeable future:
- Architectural tradeoffs: Choosing between competing valid designs based on organizational priorities AI
cannot fully infer.
- Risk acceptance: Deciding that a given risk (cost, security, operational) is acceptable for a specific
business context.
- Accountability: Being the named, responsible party for a production change - a role that is organizational
and legal, not technical.
- Novel failure diagnosis: Root-causing genuinely new failure modes that don't match any pattern in
training data or prior incidents.
- Final policy judgment calls: Interpreting ambiguous compliance or business requirements that don't
reduce to a clean automated rule.
I The most effective AI-IaC practice in 2026 is neither AI-skeptic nor AI-maximalist. It treats AI as a powerful
accelerant for the mechanical, pattern-matchable 80% of infrastructure work, while preserving deliberate,
accountable human judgment for the 20% that actually determines whether a system is safe, cost-effective, and
trustworthy.
APPENDIX A — GUARDRAIL CONFIGURATION
QUICK REFERENCE
Example combined CI guardrail pipeline (GitHub Actions style):
name: AI-IaC Guardrails
on:
pull_request:
paths: ["environments/**", "modules/**"]
jobs:
guardrails:
runs-on: ubuntu-latest
steps:
- uses: actions/checkout@v4
- uses: hashicorp/setup-terraform@v3
- name: Format Check
run: terraform fmt -check -recursive
- name: Validate
run: terraform init -backend=false && terraform validate
- name: Lint
run: tflint --recursive
- name: Security Scan
run: tfsec . --minimum-severity HIGH

| Tool Purpose Typical CI Command Fails Build On                                                       |
| ---------------------------------------------------------------------------------------------------- |
| terraform fmt Canonical formatting terraform fmt -check -recursive Any unformatted file              |
| terraform validate Syntax/schema validity terraform validate Any syntax/schema error                 |
| tflint Linting / best practices tflint --recursive Configurable rule severity                        |
| tfsec Security static analysis tfsec . --minimum-severity HIGH HIGH/CRITICAL findings                |
| Checkov Security + compliance scanning checkov -d . --compact Configurable check failures            |
| Trivy Combined IaC/container/dep scan trivy config . --severity HIGH,CRITICAL HIGH/CRITICAL findings |
| Conftest/OPA Org-specific policy enforcement conftest test plan.json -p policy/ Any policy denial    |
| Infracost Cost delta estimation infracost diff --path . Cost delta above configured t                |
| terraform plan Real diff against live state terraform plan -out=tfplan Plan errors; human reviews d  |

- name: Policy Check
run: |
terraform plan -out=tfplan
terraform show -json tfplan > plan.json
conftest test plan.json -p policy/
- name: Cost Estimate
run: infracost diff --path . --compare-to infracost-base.json
- name: Tag PR with AI-Assistance Provenance
if: contains(github.event.pull_request.body, "Generated-by:")
run: echo "AI-assisted change detected - routing to required reviewers"
APPENDIX B — 125 INTERVIEW QUESTIONS
Beginner Questions (1-50)
B02. What are the three distinct capabilities (generation, comprehension, operation) in AI-IaC, and why separate them?
B03. Name three categories of AI-IaC tooling and give an example of each.
B04. What is the difference between a chat-based generator and an agentic IaC tool?
B05. Why is infrastructure code considered higher-risk for AI generation than typical application code?
B06. What is hallucination in the context of AI-generated infrastructure code?
B07. Give an example of a hallucination pattern specific to Terraform code generation.
B08. Why does terraform validate not catch all problems in AI-generated code?
B09. What does it mean for an AI workflow to be 'agentic'?
B10. What is the autonomy spectrum for AI-IaC tools, from Level 0 to Level 4?
B11. Why is full autonomous infrastructure operation considered premature in current practice?
B12. What are the five components of a well-structured IaC prompt?
B13. Why does providing existing module context improve AI-generated code quality?
B14. What is a static analysis tool? Name two commonly used for Terraform.
B15. What is policy as code, and how does it differ from static security scanning?
B16. What is Infracost used for in an AI-IaC pipeline?
B17. Why should you never paste real secrets into an AI chat prompt?
B18. What is a common IAM over-permissioning mistake LLMs make, and why does it happen?
B19. What is the Model Context Protocol (MCP) and how does it relate to infrastructure agents?
B20. Why should apply and destroy tool access generally not be granted directly to an autonomous agent in production?
B21. What is the plan-review-apply workflow, and why is it important for AI-generated changes?
B22. Why must you apply a saved plan rather than re-planning right before apply?
B23. What is drift, and how can AI help explain drift to engineers?
B24. What is a guardrail gate? Name three types used in AI-IaC pipelines.
B25. Why is an audit trail important for AI-generated infrastructure changes?
B26. What is RAG (Retrieval-Augmented Generation) and why is it useful for internal AI-IaC tooling?
B27. What is the difference between read and write tool access for an infrastructure agent?
B28. Why is it risky to trust an AI-generated risk score as the sole basis for approving a change?
B29. What is a rollback PR, and how can AI assist in generating one?
B30. What basic guardrail should run on every AI-generated Terraform PR before human review?
B31. What is the difference between terraform fmt and terraform validate?
B32. Why might an AI-generated S3 bucket configuration be insecure by default?
B33. What does 'least privilege' mean in the context of AI-generated IAM policies?
B34. What is a prompt regression library, and why would a team maintain one?
B35. What kind of context should be excluded from an agent's readable file scope, and why?
B36. What is the difference between Level 1 (chat generation) and Level 2 (plan-review-apply copilot) tools?
B37. Why is naming convention consistency a common failure point in AI-generated infrastructure code?
B38. What does an approval matrix by risk tier accomplish in AI-IaC governance?
B39. What is a 'two-person rule' and when might it apply to AI-assisted production changes?
B40. Why is human accountability still required for AI-assisted production changes?
B41. What is the role of terraform plan output in validating an AI-generated change?
B42. How can an AI-generated postmortem draft help during incident response?
B43. What is an on-call copilot, and what access boundaries should it have during a live incident?
B44. Why should an on-call AI copilot retain read-only access during an active incident?
B45. What is a 'moved' block, and why might an AI agent need to generate one during a refactor?
B46. What's a quick way to verify an AI-suggested provider argument is actually valid?
B47. What is the difference between static analysis and a terraform plan in terms of what each can catch?
B48. Why is cost estimation an important guardrail specifically for AI-generated infrastructure?
B49. What's a simple example of a policy-as-code rule that would catch a common AI mistake?
B50. Why might an organization restrict which AI tools are approved for use with proprietary module code?
Advanced Questions (51-100)
A01. Design a multi-layer guardrail pipeline for AI-generated infrastructure changes, explaining what each layer catches.
A02. How would you architect tool-access permission boundaries for an agentic IaC assistant operating across dev,
staging, and prod?
A03. Explain why 'apply the saved plan' is a critical safety property in AI-assisted pipelines specifically.
A04. How would you design a risk-scoring system for AI-IaC changes, and what are its limitations?
A05. Describe how you would build a RAG system over an internal Terraform module library to improve generation quality.
A06. How would you detect and prevent an agent from including secret-bearing files in its context window?
A07. Explain the tradeoffs between narrow-scope custom agents and a general-purpose infrastructure agent.
A08. How would you design an audit trail system that captures AI-assistance provenance for compliance purposes?
A09. What is the difference between using AI for drift explanation versus automated drift remediation, in terms of risk?
A10. How would you design a self-healing infrastructure system with appropriate guardrails for risk-tiered autonomy?
A11. Explain how policy-as-code (OPA/Conftest) catches issues that static security scanners (tfsec/Checkov) miss.
A12. How would you structure a prompt regression test suite, and what would trigger re-running it?
A13. Describe an architecture for routing AI-generated PRs to different reviewer tiers based on risk classification.
A14. How would you handle a scenario where an agentic tool's plan loop fails to converge after multiple iterations?
A15. What governance considerations apply when selecting a third-party AI model/vendor for infrastructure work?
A16. How would you design an MCP tool server that exposes terraform plan but not terraform apply to an agent?
A17. Explain the failure mode of 'silent over-permissioning' in AI-generated IAM policies and how to systematically prevent
it.
A18. How would you build an automated rollback PR generation workflow triggered by a failed deployment?
A19. Describe how you would validate that an AI-generated moved block actually prevents resource replacement.
A20. What's your approach to context-window management when an agent needs to reason about a large, multi-module
repository?
A21. How would you design approval matrices that differentiate human-authored, AI-assisted, and AI-agentic changes?
A22. Explain how you would test whether an AI-generated Terraform test file actually captures the right security invariants.
A23. How would you handle data residency and IP exposure concerns when adopting a cloud-hosted AI tool for
infrastructure work?
A24. Describe a workflow for AI-assisted import block generation when migrating legacy infrastructure into Terraform.
A25. How would you design cost-gate thresholds that differ by environment (dev vs prod) for AI-generated changes?
A26. What's your strategy for keeping an internal AI-IaC platform's RAG index current as modules evolve?
A27. How would you diagnose whether a bad production apply originated from a guardrail gap versus a reviewer error?
A28. Explain how you would scope an agent's file-read access to exclude .tfvars while still allowing useful context.
A29. How would you build a postmortem-drafting workflow that correctly attributes AI involvement without over- or
under-stating it?
A30. Describe the tradeoffs of giving an AI copilot read access to terraform state during a live production incident.
A31. How would you design a tiered routing system so low-risk AI-generated changes fast-track while high-risk changes get
deep review?
A32. What is your approach to versioning and regression-testing prompt templates used in a production AI-IaC pipeline?
A33. How would you architect a 'two-person rule' enforcement mechanism for AI-agentic destroy operations?
A34. Describe how you would integrate Infracost results into an automated PR comment workflow for AI-generated
changes.
A35. How would you handle a scenario where an AI model's training cutoff causes it to suggest a deprecated provider
argument?
A36. What's your approach to balancing agent autonomy against blast-radius containment in a multi-account AWS
environment?
A37. How would you design logging/observability for every tool call an agent makes against real cloud infrastructure?
A38. Explain how you'd build a feedback loop so guardrail failures on AI-generated PRs improve future prompt templates.
A39. How would you evaluate whether a given AI-IaC tool is appropriately positioned on the autonomy spectrum for your
org's risk tolerance?
A40. Describe your approach to validating an AI-drafted rollback PR doesn't expand scope beyond the original failed
change.
A41. How would you design guardrails specifically for AI-suggested lifecycle blocks (prevent_destroy, ignore_changes)?
A42. What's your strategy for handling AI-generated infrastructure changes that span multiple state files / cross-state
dependencies?
A43. How would you build a 'known good' baseline library to detect regression in AI-suggested security defaults?
A44. Describe how you'd architect human-in-the-loop checkpoints for a long-running agentic refactor across dozens of
modules.
A45. How would you handle conflicting outputs from multiple guardrail layers (e.g., policy passes but cost gate fails)?
A46. What's your approach to AI-assisted decommissioning - how do you ensure agents don't expand the blast radius of a
planned teardown?
A47. How would you design a system to detect when an AI's confident explanation of a plan doesn't match the actual plan
diff?
A48. Describe your strategy for onboarding a new AI-IaC tool into an existing enterprise governance framework.
A49. How would you measure the ROI and risk profile of AI-assisted IaC adoption across a platform engineering org?
A50. What controls would you put in place before allowing any AI-agentic workflow to touch production state directly?
Architect-Level Questions (101-125)
AR01. Design a complete enterprise AI-IaC platform for a Fortune 500 company spanning 50+ teams, covering generation,
validation, governance, and audit - including model selection criteria.
AR02. How would you architect a phased rollout of agentic infrastructure tooling across an organization, starting from Level
1 chat generation through to Level 3 agentic workflows?
AR03. Design a governance framework that satisfies SOC 2 / HIPAA audit requirements for AI-assisted infrastructure
changes, including evidence retention.
AR04. How would you architect an internal natural-language infrastructure self-service platform, including the boundary
between templated requests and human-engineered custom requests?
AR05. Describe your strategy for evaluating and approving third-party AI-IaC vendors for a highly regulated industry
(financial services or healthcare).
AR06. Design a multi-cloud AI-IaC platform architecture where agents must respect different governance rules per cloud
provider and per business unit.
AR07. How would you architect a self-healing infrastructure system for a 24/7 global platform, including risk-tiered
autonomy and human escalation paths?
AR08. Describe your approach to building organization-wide prompt and policy libraries that scale across hundreds of
internal Terraform modules.
AR09. How would you design the RBAC/permission model for an internal MCP-based infrastructure agent platform serving
multiple business units with different risk tolerances?
AR10. Design an incident response and postmortem framework specifically accounting for AI-assisted and AI-agentic
infrastructure changes as a contributing factor category.
AR11. How would you architect cost governance for an organization where AI-assisted infrastructure requests could scale
request volume 10x?
AR12. Describe your strategy for managing AI model version upgrades across a fleet of internal agents without introducing
silent regressions in generated infrastructure quality.
AR13. How would you design a 'blast radius containment' architecture ensuring no single agentic workflow, however
misconfigured, can affect more than one bounded scope of infrastructure?
AR14. Design an enterprise approval matrix and routing system that scales from a 10-person startup to a 5,000-engineer
organization.
AR15. How would you architect the audit and compliance evidence trail for AI-generated infrastructure changes to satisfy a
regulatory examiner's request three years after the fact?
AR16. Describe your vision for how AI-IaC platforms will evolve over the next five years, and what governance models will
need to evolve alongside them.
AR17. How would you design a chargeback/cost-attribution model when infrastructure is increasingly self-served via
AI-assisted natural language requests?
AR18. Design a disaster recovery plan for an organization whose primary infrastructure-authoring workflow is now agentic
AI-assisted - what changes versus a traditional DR plan?
AR19. How would you architect cross-team knowledge sharing (RAG indexes, prompt libraries, policy rules) in a large
organization with semi-autonomous platform teams?
AR20. Describe how you would design and govern a 'two-key' approval system for critical infrastructure destroy operations
in an AI-agentic world.
AR21. How would you build organizational metrics to track AI-IaC adoption health - distinguishing genuine productivity gains
from hidden risk accumulation?
AR22. Design a security review process specifically for evaluating new categories of AI-IaC tool-use capability before
they're granted to agents.
AR23. How would you architect a platform that supports both highly regulated workloads (requiring strict human gates) and
experimental/dev workloads (allowing higher AI autonomy) under one governance umbrella?
AR24. Describe your approach to training and certifying engineers on safe AI-IaC practices as a prerequisite for elevated
agent permissions.
AR25. How would you design the long-term architecture for AI-IaC platforms to remain model-agnostic as the underlying AI
vendor landscape continues to shift?
APPENDIX C — PRODUCTION READINESS
CHECKLIST
AI Tool Governance
OK
Approved list of AI-IaC tools published, with data-handling policies reviewed
OK
Personal/unapproved AI accounts prohibited for proprietary module code
OK
Model selection criteria documented (data residency, retention, certifications)
OK
Autonomy level of each approved tool documented (Level 0-4)
Guardrail Pipeline
OK
terraform fmt -check and terraform validate run on every AI-generated PR
OK
Static security scanning (tfsec/Checkov/Trivy) required on every PR
OK
Policy-as-code (OPA/Conftest/Sentinel) enforces org-specific rules
OK
Cost estimation gate (Infracost) configured with environment-specific thresholds
OK
All guardrail gates apply equally to AI-generated and human-authored code
Agent Permission Boundaries
OK
No agent has direct terraform apply/destroy access to production
OK
Agent tool servers use scoped, audited service identities (not human credentials)
OK
Secret-bearing files (.tfvars, .env) excluded from agent-readable context
OK
Environment scoping enforced: dev/staging access is separate from prod access by default
OK
Every agent tool call against real infrastructure is logged
Human-in-the-Loop
OK
Plan-review-apply workflow enforced for all environments
OK
Saved plan applied exactly as reviewed (terraform apply tfplan)
OK
Named human approver required for every production apply
OK
Two-person rule defined for critical/destroy operations
OK
Approval matrix defined by risk tier and AI-involvement level
Audit & Compliance
OK
AI-assistance provenance captured in PR/commit metadata
OK
Guardrail gate results retained per compliance retention policy
OK
Prompt/intent record linked to each AI-assisted change
OK
Audit trail satisfies relevant regulatory framework (SOC 2/HIPAA/etc.)
Testing & Quality
OK
Prompt regression library maintained and re-run on model/tool changes
OK
terraform test suite covers security-relevant invariants
OK
Known-good baseline patterns documented for common resource types
OK
Incident postmortem process accounts for AI-assisted change category
This guide covers AI-assisted IaC from foundational concepts through enterprise-scale governance. The most
important principle to internalize: AI dramatically accelerates the mechanical, pattern-matchable work of
infrastructure authoring, but the accountable, judgment-driven core of infrastructure operations - risk
acceptance, architectural tradeoffs, and final approval - remains a human responsibility. The organizations
getting the most value from AI-IaC in 2026 are the ones that built strong guardrails first and expanded AI
autonomy deliberately, one validated layer at a time.
For further reading and current tooling documentation, see:
- https://developer.hashicorp.com/terraform/docs
- https://www.openpolicyagent.org/docs
- https://aquasecurity.github.io/tfsec/
- https://www.checkov.io/
- https://www.infracost.io/docs/
- https://modelcontextprotocol.io/
