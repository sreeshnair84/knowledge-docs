---
title: "Ecosystem, Enterprise Patterns & Hands-On Labs"
date_created: 2026-07-10
status: current
source_type: converted-pdf
source_file: "Part18_Ecosystem_Patterns_Labs.pdf"
doc_type: guide
tags: ["coding-tools"]
last_reviewed: 2026-07-10
covers_version: "N/A"
---

**PART 18–21  •  ADVANCED PATTERNS & LABS** 

# **Ecosystem, Enterprise Patterns & Hands-On Labs** 

##### **TOPICS COVERED** 

- **›  Copilot & Copilot Workspace** 

- **›  Projects & Issues** 

- **›  Monorepo vs Polyrepo Architecture** 

- **›  Golden Paths & Internal Developer Portals** 

- **›  Enterprise Branch Strategies** 

**›  Release Trains & InnerSource** 

- **›  Repository Rulesets & Merge Queue** 

- **›  OIDC Federation (Passwordless)** 

- **›  Lab 1: Multi-Stage CI Pipeline** 

- **›  Lab 3: ARC Ephemeral Runners** 

- **›  Lab 5: Enterprise CI/CD Platform** 

**›  GitHub Models** 

**›  Dev Containers & Codespaces** 

**›  Platform Engineering** 

**›  Backstage Integration** 

**›  Git Flow vs GitHub Flow vs TBD** 

**›  Hidden GitHub Features** 

**›  Dynamic Matrices** 

**›  Artifact Attestations** 

- **›  Lab 2: K8s Deployment with OIDC** 

- **›  Lab 4: Supply Chain Security (SLSA+Cosign)** 

**›  Interview Q&A Master List** 

**GitHub & Modern CI/CD** 

**Principal Platform Engineer Reference Series  •  Enterprise Edition** 

## **PART 18 — GitHub Ecosystem** 

## **18.1 GitHub Copilot** 

GitHub Copilot is an AI pair programmer powered by OpenAI Codex (and later GPT-4 class models). It provides inline code suggestions in IDEs, a chat interface, CLI assistance, PR summaries, and code review comments. 

### **Copilot Product Tiers** 

|**Tier**|**Users**|**Key capabilities**|
|---|---|---|
|Copilot Individual|Individual devs|IDE suggestions, Copilot Chat, CLI|
|Copilot Business|Teams/orgs|+ Policy management, audit logs, content exclusions|
|Copilot Enterprise|Enterprise|+ Copilot Chat in GitHub.com, PR summaries, Copilot Workspace|

### **Copilot in CI/CD — Autofix** 

Copilot Autofix (part of GHAS) automatically generates fixes for CodeQL security alerts. When a security vulnerability is detected, Copilot proposes a code change with an explanation — developers can accept, modify, or reject it. 

- `# Copilot Autofix is triggered automatically when: # 1. A CodeQL scan finds a vulnerability # 2. GitHub creates a code scanning alert # 3. Copilot analyzes the context and proposes a fix` 

- `# 4. A PR comment appears with the suggested fix` 

- `# No workflow changes needed — enabled via:` 

- `# Settings > Advanced Security > Copilot Autofix for code scanning: Enable` 

## **18.2 GitHub Models** 

GitHub Models (github.com/marketplace/models) is a playground and production endpoint for AI models directly within GitHub. It provides access to models from OpenAI, Meta, Mistral, and others via a unified API compatible with the OpenAI SDK. 

```
# Use GitHub Models in Actions workflows:
- name: AI-powered PR review
    python3 << 'EOF'
    from openai import OpenAI
    client = OpenAI(
        base_url="https://models.inference.ai.azure.com",
        api_key="${{ secrets.GITHUB_TOKEN }}"   # GITHUB_TOKEN works!
    )
    # Summarize PR changes:
    diff = open("pr_diff.txt").read()
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a code reviewer."},
            {"role": "user", "content": f"Review this diff:\n{diff}"}
```

**Page 2** 

```
        ]
    )
    print(response.choices[0].message.content)
    EOF
```

## **18.3 Dev Containers** 

Dev Containers (devcontainers.json) is an open standard for reproducible development environments. Supported by VS Code, GitHub Codespaces, GitHub Codespaces prebuilds, and JetBrains IDEs. 

- `# .devcontainer/devcontainer.json — Full-stack example:` 

```
{
```

```
  "name": "Full Stack Development",
```

```
  "dockerComposeFile": "docker-compose.yml",
```

```
  "service": "app",
```

```
  "workspaceFolder": "/workspaces/${localWorkspaceFolderBasename}",
  "features": {
```

```
    "ghcr.io/devcontainers/features/github-cli:1": {},
```

```
    "ghcr.io/devcontainers/features/kubectl-helm-minikube:1": {
      "version": "latest",
      "helm": "latest"
    },
    "ghcr.io/devcontainers/features/terraform:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-python.python",
        "ms-azuretools.vscode-docker",
        "github.copilot",
        "github.copilot-chat",
        "hashicorp.terraform"
      ],
      "settings": {
        "python.defaultInterpreterPath": "/usr/local/bin/python",
        "editor.formatOnSave": true
      }
    }
  },
  "postCreateCommand": "make dev-setup",
  "postStartCommand": "make dev-services-up",
  "remoteUser": "vscode",
  "forwardPorts": [3000, 5432, 6379, 9090],
  "portsAttributes": {
    "3000": {"label": "Application", "onAutoForward": "openBrowser"},
    "9090": {"label": "Prometheus", "onAutoForward": "notify"}
  }
}
```

**Page 3** 

## **PART 19 — Large Enterprise Patterns** 

## **19.1 Monorepo vs Polyrepo** 

### **Monorepo** 

A monorepo stores all services, libraries, and tools in a single repository. Google's monorepo (Piper) stores billions of files. Microsoft uses it for the Windows OS codebase. 

- **Benefits** : Atomic cross-service changes, single CI system, shared tooling, easy dependency management, single 

- PR for multi-service changes 

- **Challenges** : Clone time (requires sparse checkout), CI must be service-aware (affected service detection), 

- permission granularity limited to branch level 

- **Tools** : Nx, Turborepo, Bazel, Buck, Pants — for incremental builds and affected-service detection 

### **Polyrepo** 

A polyrepo uses separate repositories per service or team. Netflix, Shopify, and Stripe use variants of polyrepo. Easier to get started; scales better for very independent teams. 

- **Benefits** : Independent versioning and deployment, clear ownership, smaller clone sizes, fine-grained GitHub 

- permissions 

- **Challenges** : Cross-repo changes require multiple PRs, dependency management is harder, shared tooling 

- requires distribution 

|**Factor**|**Monorepo**|**Polyrepo**|
|---|---|---|
|Team size|Best for large, coordinated teams|Best for independent teams|
|Service dependencies|Atomic cross-service changes|Version pinning required|
|CI complexity|High (need affected detection)|Lower per-repo, high aggregate|
|Git performance|Requires GVFS/Scalar/sparse|Standard Git|
|Permission model|Coarser (CODEOWNERS-based)|Per-repo RBAC|
|Tooling investment|High (Bazel, Nx, etc.)|Lower|
|Enterprise examples|Google, Meta, Microsoft, Twitter|Netflix, Shopify, Airbnb|

## **19.2 Branch Strategies** 

### **Git Flow** 

`# Git Flow branch model: main` → `Production code only develop` → `Integration branch feature/*` → `New features (off develop) release/*` → `Release preparation (off develop) hotfix/*` → `Emergency fixes (off main) # Workflow:` 

**Page 4** 

```
git flow init
git flow feature start oidc-authentication
# ... work ...
git flow feature finish oidc-authentication  # merges to develop
git flow release start 2.1.0                 # off develop
# ... QA, bug fixes on release branch ...
git flow release finish 2.1.0                # merges to main AND develop, tags main
git flow hotfix start 2.0.1                  # off main
git flow hotfix finish 2.0.1                 # merges to main AND develop
```

### **GitHub Flow** 

GitHub Flow is simpler: main is always deployable, feature branches are short-lived, PRs are the primary review mechanism, and merging to main triggers deployment. 

`# GitHub Flow: main` → `Always production-ready; protected feature/ticket-123-oidc-auth` → `Short-lived feature branches` 

`# Workflow: git checkout -b feature/ticket-123-oidc-auth # ... work, commit frequently ... git push origin feature/ticket-123-oidc-auth # Create PR` → `CI runs` → `Review` → `Merge` → `Auto-deploy` 

### **Trunk-Based Development (TBD)** 

TBD is the approach practiced by Google, Meta, and Netflix at scale. Developers commit directly to trunk (main) or via very short-lived feature branches (1-2 days max). Feature flags gate incomplete features. 

```
# TBD key principles:
# 1. Short-lived branches (< 2 days) OR direct commits to trunk
# 2. Feature flags for incomplete features
# 3. Branch by abstraction for large changes
# 4. Every commit to trunk must pass all tests
```

```
# 5. Release from trunk (not from release branches)
```

```
# Feature flag implementation:
class FeatureFlags:
    OIDC_AUTH = os.getenv("FF_OIDC_AUTH", "false") == "true"
    NEW_PRICING = os.getenv("FF_NEW_PRICING", "false") == "true"
```

```
# In code:
if FeatureFlags.OIDC_AUTH:
    return authenticate_with_oidc(user)
else:
    return authenticate_with_saml(user)
```

```
# Roll out gradually:
```

|`# FF_OIDC_AUTH=true`<br>|`for 5% of users`→`25%`→`100%`→<br>|`remove flag`<br>||
|---|---|---|---|
|**Strategy**|**Best for**|**Release cadence**|**Complexity**|
|Git Flow|Scheduled release software (mobile|apps, firmware)<br>Scheduled sprints|High|
|GitHub Flow|SaaS with continuous deployment|Continuous|Low|
|Trunk-Based Dev|Large eng orgs, high-velocity teams|Continuous or release tra|ins Medium|
|Release branches|Open-source projects with LTS|LTS + patch releases|Medium|

## **19.3 Platform Engineering and Golden Paths** 

Platform Engineering is the discipline of building and maintaining internal developer platforms (IDPs) that reduce cognitive load on product teams. The 'golden path' is an opinionated, supported set of tools, workflows, and 

**Page 5** 

patterns that make the right thing easy. 

```
# Golden path components for GitHub:
```

```
# 1. Repository templates (cookiecutter / copier)
#    - Pre-configured .github/workflows/
#    - CODEOWNERS, dependabot.yml, security scanning
#    - Pre-commit hooks, linting configs
```

```
# 2. Reusable workflows library (platform-team/workflows repo)
```

```
#    .github/workflows/
```

```
#      ci.yml          - Standard CI (lint, test, coverage)
#      build-image.yml - Docker build + GHCR push + signing
#      deploy-ecs.yml  - ECS deployment with OIDC
#      deploy-k8s.yml  - K8s deployment with ArgoCD
#      release.yml     - Semantic release + SBOM + signing
```

- `# 3. Composite actions library (platform-team/actions repo) #    setup-python/, setup-node/, deploy-to-k8s/, etc.` 

- `# 4. Self-service via GitHub CLI extension or backstage plugin: #    gh new-service api-service --template python-fastapi #    # Creates repo with: golden-path config, OIDC setup, #    # team permissions, initial deploy to staging` 

```
# 5. Backstage for discovery and documentation:
#    - Software catalog (all services, owners, docs)
#    - TechDocs from repo markdown
#    - Scaffolder templates (create new services)
#    - GitHub Actions plugin (live pipeline status)
```

## **19.4 InnerSource** 

InnerSource applies open-source collaboration practices within a company. Internal repositories are visible to all engineers, contributions via PRs are welcome from outside the core team, and CONTRIBUTING.md guides external contributors. 

- Use **internal** repository visibility (GHEC/GHES) for all InnerSource repos 

- CODEOWNERS controls who must review PRs from external contributors 

- CONTRIBUTING.md documents how to contribute, run tests, and get reviews 

- Issues are used for feature requests and bug reports from other teams 

- GitHub Discussions for longer-form conversations and decision records 

**Page 6** 

## **PART 20 — Hidden GitHub Gems** 

### **1. Issue Forms** 

Issue Forms (YAML-based) replace free-text issue templates with structured forms, enabling consistent, machine-readable bug reports and feature requests. 

```
# .github/ISSUE_TEMPLATE/bug_report.yml
name: Bug Report
description: Report a bug
title: "[Bug]: "
labels: ["bug", "triage"]
assignees: ["platform-team"]
body:
  - type: markdown
      value: "Thanks for taking the time to fill this out!"
  - type: input
    id: version
      label: Version
      placeholder: "e.g., 2.1.0"
    validations:
  - type: textarea
    id: reproduction
      label: Steps to Reproduce
      value: |
        1. Go to '...'
        2. Click on '...'
    validations:
  - type: dropdown
    id: severity
      label: Severity
      options: [Critical, High, Medium, Low]
    validations:
  - type: checkboxes
    id: terms
      label: Checklist
      options:
        - label: I have searched for existing issues
```

### **2. Saved Replies** 

GitHub Saved Replies (github.com/settings/replies) are pre-written comment templates for common review responses — reduce repetition in code review. 

- 'LGTM - Approve' for standard approvals 

- 'Needs tests' for missing test coverage 

- 'Please rebase on main' for outdated branches 

- 'Security review needed' for sensitive changes 

### **3. GitHub Search Power Features** 

```
# Advanced search syntax:
is:pr is:open review:required org:myorg        # All PRs awaiting review
is:issue is:open label:bug created:>2024-01-01 # Recent bugs
is:pr merged:>2024-01-01 author:@me            # Your recent merges
repo:myorg/api is:pr is:merged "squash"        # Squash-merged PRs
```

**Page 7** 

```
path:.github/workflows language:YAML           # Find workflow files
filename:CODEOWNERS                            # Find CODEOWNERS files
is:secret-scanning-alert state:open            # Open secret alerts
# Code search (for GHEC/GitHub.com):
org:myorg language:python "import boto3"        # Find boto3 usage
org:myorg "GITHUB_TOKEN" path:.github           # Token usage in workflows
org:myorg extension:tf "azurerm"                # Terraform Azure files
```

### **4. Dependency Review Action** 

```
# Block PRs that introduce vulnerable dependencies:
name: Dependency Review
on:
  pull_request:
    branches: [main]
jobs:
  dependency-review:
      - uses: actions/checkout@v4
      - uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: moderate
          deny-licenses: GPL-3.0, AGPL-3.0  # Block copyleft licenses
          allow-ghsas: GHSA-xxxx-xxxx-xxxx  # Allowlist known FPs
          comment-summary-in-pr: true
```

### **5. Actions Artifact Attestations** 

```
# Generate cryptographic attestation for build artifacts:
name: Build with Attestation
on:
  push:
    tags: ['v*']
jobs:
  build:
      id-token: write      # For OIDC signing
      contents: write
      attestations: write  # For artifact attestation
      - uses: actions/checkout@v4
      - name: Build container image
        id: build
          docker build -t ghcr.io/myorg/app:${{ github.sha }} .
          docker push ghcr.io/myorg/app:${{ github.sha }}
          DIGEST=$(docker inspect ghcr.io/myorg/app:${{ github.sha }} \
            --format '{{index .RepoDigests 0}}' | cut -d@ -f2)
          echo "digest=$DIGEST" >> $GITHUB_OUTPUT
      - name: Attest container image
        uses: actions/attest-build-provenance@v1
        with:
          subject-name: ghcr.io/myorg/app
          subject-digest: ${{ steps.build.outputs.digest }}
          push-to-registry: true
# Verify attestation:
# gh attestation verify ghcr.io/myorg/app:latest \
#   --owner myorg
```

### **6. GitHub Search Syntax for Analytics (GraphQL)** 

```
# Get comprehensive PR metrics via GraphQL:
query PRMetrics($owner: String!, $repo: String!, $since: DateTime!) {
```

**Page 8** 

```
  repository(owner: $owner, name: $repo) {
    pullRequests(
      first: 100,
      states: [MERGED],
      orderBy: {field: UPDATED_AT, direction: DESC}
    ) {
      nodes {
        number
        title
        createdAt
        mergedAt
        author { login }
        additions
        deletions
        changedFiles
        reviewDecision
        timelineItems(first: 50, itemTypes: [REVIEW_REQUESTED_EVENT, PULL_REQUEST_REVIEW]) {
          nodes {
            ... on PullRequestReview {
              submittedAt
              state
              author { login }
            }
          }
        }
      }
    }
  }
}
```

```
# Calculate lead time, cycle time, review time from this data
```

**Page 9** 

## **PART 21 — Hands-On Labs** 

## **Lab 1: Multi-Stage CI Pipeline** 

Build a production-grade CI pipeline with parallel jobs, matrix testing, coverage reporting, and artifact promotion. 

```
# Lab 1: Multi-Stage CI Pipeline
# Complete workflow implementing all best practices
name: Multi-Stage CI
on:
  push:
    branches: [main, 'release/**']
  pull_request:
    branches: [main]
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: ${{ github.ref != 'refs/heads/main' }}
jobs:
  # Stage 1: Fast feedback (parallel)
  lint:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: "3.11", cache: pip}
      - run: pip install ruff mypy
      - run: ruff check . && mypy src/
  # Stage 2: Test matrix
  test:
    needs: lint
    strategy:
      fail-fast: false
      matrix:
        python: ["3.10", "3.11", "3.12"]
        os: [ubuntu-latest, windows-latest]
    runs-on: ${{ matrix.os }}
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: ${{ matrix.python }}
          cache: pip
      - run: pip install -r requirements.txt -r requirements-dev.txt
      - name: Run tests with coverage
        run: pytest tests/unit/ -n auto --cov=src --cov-report=xml
      - uses: codecov/codecov-action@v4
        if: matrix.python == '3.11' && matrix.os == 'ubuntu-latest'
  # Stage 3: Security
  security:
    needs: lint
      security-events: write
      contents: read
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with: {languages: python, queries: security-extended}
      - uses: github/codeql-action/autobuild@v3
      - uses: github/codeql-action/analyze@v3
  # Stage 4: Build (only on main/release)
  build:
    if: github.ref == 'refs/heads/main' || startsWith(github.ref, 'refs/heads/release/')
    needs: [test, security]
```

**Page 10** 

```
      contents: read
      packages: write
      id-token: write
      attestations: write
    outputs:
      digest: ${{ steps.push.outputs.digest }}
      - uses: actions/checkout@v4
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        id: push
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
      - uses: actions/attest-build-provenance@v1
        with:
          subject-name: ghcr.io/${{ github.repository }}
          subject-digest: ${{ steps.push.outputs.digest }}
          push-to-registry: true
```

## **Lab 2: Kubernetes Deployment with OIDC Auth** 

`# Lab 2: Deploy to EKS with OIDC (no stored secrets) deploy-staging: needs: build runs-on: ubuntu-latest environment: name: staging url: https://staging.api.example.com permissions: id-token: write contents: read steps: - uses: actions/checkout@v4 # OIDC` → `AWS credentials (no stored secrets!) - uses: aws-actions/configure-aws-credentials@v4 with: role-to-assume: arn:aws:iam::123456789:role/github-staging-deploy aws-region: us-east-1 # Update kubeconfig for EKS - run: aws eks update-kubeconfig --name staging-cluster --region us-east-1 # Deploy with Helm - name: Deploy with Helm run: | helm upgrade --install api-service ./charts/api-service \ --namespace staging \ --set image.repository=ghcr.io/${{ github.repository }} \ --set image.tag=${{ github.sha }} \ --set image.digest=${{ needs.build.outputs.digest }} \ --wait \ --timeout 5m \ --atomic  # Rollback on failure # Smoke test - name: Smoke test run: | kubectl rollout status deployment/api-service -n staging --timeout=120s curl -f https://staging.api.example.com/health | jq . deploy-production: needs: deploy-staging runs-on: ubuntu-latest` 

**Page 11** 

```
    environment:
      name: production  # Has required reviewers + 10min wait timer
      id-token: write
      contents: read
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789:role/github-prod-deploy
          aws-region: us-east-1
      - run: aws eks update-kubeconfig --name prod-cluster --region us-east-1
      - run: |
          helm upgrade api-service ./charts/api-service \
            --namespace production \
            --set image.tag=${{ github.sha }} \
            --wait --atomic
```

## **Lab 3: ARC Ephemeral Runners on Kubernetes** 

```
# Lab 3: Complete ARC setup
```

```
# Step 1: Install cert-manager (ARC dependency):
kubectl apply -f \
  https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml
```

```
# Step 2: Install ARC:
helm install arc \
  --namespace arc-systems \
  --create-namespace \
  oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set-controller
```

```
# Step 3: Create GitHub App credentials secret:
kubectl create secret generic controller-manager \
  --namespace arc-systems \
  --from-literal=github_app_id=$APP_ID \
  --from-literal=github_app_installation_id=$INSTALL_ID \
  --from-literal=github_app_private_key="$(cat private-key.pem)"
# Step 4: Deploy RunnerScaleSet:
helm install arc-runner-set \
  --namespace arc-runners \
  --create-namespace \
  oci://ghcr.io/actions/actions-runner-controller-charts/gha-runner-scale-set \
  --set githubConfigUrl="https://github.com/myorg" \
  --set githubConfigSecret=controller-manager \
  --set minRunners=0 \
  --set maxRunners=20 \
  --set runnerScaleSetName=arc-runner-set
```

```
# Step 5: Use in workflow:
# runs-on: arc-runner-set
```

## **Lab 4: Complete Supply Chain Security** 

```
# Lab 4: SLSA + Cosign + SBOM + Attestation
```

```
name: Secure Release Pipeline
on:
  push:
    tags: ['v*.*.*']
jobs:
  build-and-sign:
      contents: write
      packages: write
      id-token: write
      attestations: write
    outputs:
```

**Page 12** 

```
      digest: ${{ steps.build.outputs.digest }}
      version: ${{ steps.version.outputs.version }}
```

```
```

```
      - uses: actions/checkout@v4
        with: {fetch-depth: 0}
```

```
      - name: Get version
```

```
        id: version
```

```
        run: echo "version=${GITHUB_REF_NAME#v}" >> $GITHUB_OUTPUT
```

```
      # Install signing tools
      - uses: sigstore/cosign-installer@v3
      - uses: anchore/sbom-action/download-syft@v0
```

```
      # Build multi-arch image
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        id: build
        with:
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:${{ github.ref_name }}
            ghcr.io/${{ github.repository }}:latest
```

```
      # Sign the image with Sigstore (keyless)
      - name: Sign image
          cosign sign --yes \
            ghcr.io/${{ github.repository }}@${{ steps.build.outputs.digest }}
      # Generate SBOM
      - name: Generate SBOM
        uses: anchore/sbom-action@v0
        with:
          image: ghcr.io/${{ github.repository }}@${{ steps.build.outputs.digest }}
          artifact-name: sbom.spdx.json
          output-file: /tmp/sbom.spdx.json
      # Attach SBOM to image
      - name: Attest SBOM
          cosign attest --yes \
            --predicate /tmp/sbom.spdx.json \
            --type spdxjson \
            ghcr.io/${{ github.repository }}@${{ steps.build.outputs.digest }}
      # GitHub attestation (SLSA provenance)
      - uses: actions/attest-build-provenance@v1
        with:
          subject-name: ghcr.io/${{ github.repository }}
          subject-digest: ${{ steps.build.outputs.digest }}
          push-to-registry: true
      # Create GitHub Release with SBOM
      - uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true
          files: /tmp/sbom.spdx.json
```

## **Lab 5: Enterprise CI/CD Platform Design** 

This lab synthesizes all concepts into an enterprise-grade platform design supporting 500+ repositories, thousands of developers, governance, security, and operational excellence. 

```
# Enterprise CI/CD Platform — Architecture Overview
```

**Page 13** 

`# Repository structure: # github.com/myenterprise/ #   platform-workflows/` → `Reusable workflow library #   platform-actions/` → `Composite action library #   platform-policies/` → `Policy-as-code (OPA/Rego) #   backstage/` → `Internal developer portal #   k8s-platform/` → `GitOps: cluster configuration #   arc-configuration/` → `ARC runner configuration # Platform team's reusable workflow library: # .github/workflows/ #   ci-python.yml          - Python CI golden path #   ci-node.yml            - Node.js CI golden path #   ci-java.yml            - Java/Maven CI golden path #   build-container.yml    - Docker build + GHCR + signing #   deploy-ecs.yml         - ECS deployment (OIDC, blue-green) #   deploy-eks.yml         - EKS deployment (OIDC, Helm, ArgoCD) #   release.yml            - Semantic release + SBOM + SLSA #   security-scan.yml      - Full security battery # Product team workflow (3 lines to production-grade CI/CD): name: API Service CI/CD on: push: {branches: [main]} pull_request: {branches: [main]} jobs: ci: uses: myenterprise/platform-workflows/.github/workflows/ci-python.yml@v2 secrets: inherit build: needs: ci uses: myenterprise/platform-workflows/.github/workflows/build-container.yml@v2 with: registry: ghcr.io image-name: myenterprise/api-service secrets: inherit deploy: needs: build uses: myenterprise/platform-workflows/.github/workflows/deploy-eks.yml@v2 with: environment: production cluster: prod-us-east-1 image-digest: ${{ needs.build.outputs.digest }} secrets: inherit` 

The platform team owns the golden-path workflows. Product teams consume them with minimal configuration. Policy enforcement, security scanning, signing, and observability are baked in — product teams cannot skip them. 

```
# Governance via Organization Rulesets:
# - All repos: require PR reviews, block force push to main
```

```
# - All repos: require status checks (ci/test, security/codeql)
# - All repos: require signed commits (enterprise setting)
# - Pattern 'release/*': require 2 reviews + security team review
```

`# Observability: # - Audit log` → `Splunk (SIEM integration)` 

`# - Actions metrics` → `Datadog (workflow duration, failure rate) # - Runner utilization` → `Grafana` 

`# - DORA metrics from GitHub GraphQL` → `custom dashboard` 

```
# Cost controls:
```

```
# - Self-hosted ARC runners on spot/preemptible VMs (80% savings)
# - Concurrency cancel on PRs (save superseded run minutes)
# - Cache everything (Docker layers, dependencies, build outputs)
# - Larger runners for compilations (faster wall clock = same cost, better UX)
```

```
# Security controls:
# - OIDC for all cloud authentication (zero stored cloud credentials)
# - Fine-grained PATs for all automation (no classic PATs)
# - GitHub Apps for all bots (not machine users)
# - GHAS enabled org-wide: CodeQL, secret scanning, push protection
# - Dependency review on all PRs
# - Artifact signing + SBOM on all releases
# - OpenSSF Scorecard weekly for all repos
```

**Page 14** 

## **Master Interview Q&A; — Principal Engineer Level** 

#### **Q: Design a GitHub Actions CI/CD system for 500 microservices. What are the key architectural decisions?** 

A: Key decisions: (1) Reusable workflows library — product teams consume, platform team owns. (2) Self-hosted ARC runners on Kubernetes spot instances for cost (80%+ savings). (3) OIDC for all cloud auth — zero stored credentials. (4) Repository Rulesets for org-wide policy without per-repo config. (5) GHAS org-wide — CodeQL, secret scanning, push protection. (6) GitHub Packages / GHCR as the artifact registry — same auth model. (7) Merge Queue for high-traffic repos to prevent the 'pending head' problem. (8) Audit log streaming to SIEM for compliance. 

#### **Q: How would you implement a secure, auditable deployment pipeline for a regulated industry?** 

A: Requirements: (1) Immutable artifacts — build once, sign, promote same binary through environments. (2) SLSA Level 3 provenance — GitHub hosted runners provide this. (3) Artifact signing with Cosign + Sigstore transparency log. (4) Environment gates — required reviewers, minimum soak time. (5) Audit log to immutable storage (S3 with Object Lock). (6) OIDC for all cloud access — no long-lived credentials. (7) SBOM attached to every release. (8) Dependency review blocking vulnerable or GPL-licensed deps. (9) Two-person approval for production (environment required reviewers). (10) Rollback SOP tested regularly. 

#### **Q: A developer accidentally committed an AWS secret key to a public GitHub repository. What is your incident response?** 

A: Immediate (first 5 minutes): (1) Assume the secret is compromised — it has been indexed by bots within seconds. (2) Rotate/invalidate the secret in AWS IAM immediately. (3) Check CloudTrail for any use of the leaked credentials. Then remediate: (4) Use 'git filter-repo' to remove from history and force-push (doesn't help — already distributed). (5) Contact GitHub Support to report the leak. (6) Enable push protection to prevent recurrence. Then improve: (7) Deploy OIDC to eliminate all stored cloud credentials. (8) Enable org-wide secret scanning + push protection. (9) Run a secret scan on all repos (truffleHog, gitleaks). 

#### **Q: Explain how you would implement zero-trust security for GitHub Actions workflows.** 

A: Zero-trust principles applied: (1) Identity: OIDC for all cloud auth — short-lived, identity-verified tokens. (2) Least privilege: every job has minimal permissions block; GITHUB_TOKEN read-only by default. (3) Verified builds: SLSA provenance, Cosign signing, attestations — consumer verifies before deploying. (4) No persistent credentials: ephemeral runners, OIDC-only cloud access, rotation for remaining secrets. (5) Policy enforcement: Organization Rulesets, allowed actions list, Dependabot + CodeQL mandatory. (6) Auditability: all workflow runs logged, audit log streamed to immutable SIEM. (7) Network: VPC-connected runners, no public internet access for sensitive builds. 

#### **Q: How does GitHub's merge queue solve the 'pending head problem' and what are its tradeoffs?** 

A: The pending head problem: PR A and PR B are both approved and tested against main at commit X. If both merge independently, the combined state (X + A + B) is never tested — one may break the other. Merge queue 

**Page 15** 

tests the combined state: it creates a synthetic branch merging current main + PR, runs CI, and only merges if CI passes. Tradebacks: (1) Increased CI load — every merge queued PR runs CI again. (2) Queue contention — if CI is slow, the queue backs up. (3) Added latency — developers wait longer for merge. Mitigations: fast CI (< 5 min), larger runners, test parallelization, selective merge queue for high-risk branches only. 

**Page 16** 

## **Reference — Key Resources** 

### **Official Documentation** 

- GitHub Docs: docs.github.com — comprehensive reference for all features 

- GitHub Actions: docs.github.com/en/actions — complete workflow reference 

- GitHub REST API: docs.github.com/en/rest — all REST endpoints 

- GitHub GraphQL API: docs.github.com/en/graphql — schema explorer 

- GitHub Enterprise: docs.github.com/en/enterprise-cloud@latest 

### **Security & Supply Chain** 

- SLSA Framework: slsa.dev 

- Sigstore: sigstore.dev — keyless signing infrastructure 

- OpenSSF Scorecards: github.com/ossf/scorecard 

- CISA Secure Software Development: cisa.gov/sse 

### **Key Open Source Projects** 

- ARC: github.com/actions/actions-runner-controller 

- Cosign: github.com/sigstore/cosign 

- Argo Rollouts: argoproj.github.io/argo-rollouts 

- Flux: fluxcd.io — GitOps for Kubernetes 

- ArgoCD: argo-cd.readthedocs.io 

- Backstage: backstage.io — Internal developer portal 

- Syft: github.com/anchore/syft — SBOM generation 

### **Learning Resources** 

- GitHub Skills: skills.github.com — interactive learning labs 

- GitHub Blog: github.blog — engineering posts from GitHub 

- GitHub Engineering: githubengineering.com 

**Page 17**
