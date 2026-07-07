---
title: Kong + Entra ID Integration
parent: AI Gateway
nav_order: 3
---

# Kong AI Gateway — Microsoft Entra ID Integration
## Complete End-to-End Guide

---

## Table of Contents

1. [Overview & Architecture](#1-overview-architecture)
2. [Entra ID App Registration](#2-entra-id-app-registration)
3. [OAuth 2.0 Client Credentials Flow (M2M)](#3-oauth-20-client-credentials-flow-m2m)
4. [Authorization Code Flow (User Login / SSO)](#4-authorization-code-flow-user-login-sso)
5. [JWT / Bearer Token Validation](#5-jwt-bearer-token-validation)
6. [OIDC Plugin Full Configuration](#6-oidc-plugin-full-configuration)
7. [Group & Role Mapping to Kong ACL](#7-group-role-mapping-to-kong-acl)
8. [Per-Consumer Auto-Provisioning from Entra ID](#8-per-consumer-auto-provisioning-from-entra-id)
9. [Conditional Access & MFA Enforcement](#9-conditional-access-mfa-enforcement)
10. [Multi-Tenant Entra ID Setup](#10-multi-tenant-entra-id-setup)
11. [Token Introspection & Revocation](#11-token-introspection-revocation)
12. [Managed Identity for Kong on Azure](#12-managed-identity-for-kong-on-azure)
13. [Troubleshooting Entra ID Auth Issues](#13-troubleshooting-entra-id-auth-issues)
14. [Complete Working Reference Config](#14-complete-working-reference-config)

---

## 1. Overview & Architecture

Microsoft Entra ID (formerly Azure Active Directory) becomes the **single source of truth** for identity. Kong AI Gateway enforces authentication and authorization using tokens issued by Entra, then injects the LLM master credential upstream — clients never touch the raw OpenAI/Anthropic key.

```
┌──────────────────────────────────────────────────────────────────────┐
│                     FLOW: M2M (Service-to-Service)                   │
│                                                                      │
│  App/Service ──[client_id + secret]──► Entra ID Token Endpoint       │
│                                              │                       │
│                                    Returns access_token (JWT)        │
│                                              │                       │
│  App/Service ──[Bearer JWT]──────────────────► Kong AI Gateway       │
│                                              │                       │
│                                   Validate JWT signature             │
│                                   (from Entra JWKS endpoint)         │
│                                   Check roles/groups/scopes          │
│                                              │                       │
│                                   Inject LLM Master Key              │
│                                              │                       │
│                                              └──────────► OpenAI API │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                     FLOW: User SSO (Browser / CLI)                   │
│                                                                      │
│  Browser ──[GET /ai/chat]──► Kong ──[302 Redirect]──► Entra Login    │
│                                                            │         │
│                                               User logs in with      │
│                                               corporate credentials  │
│                                                            │         │
│  Browser ◄──[auth code]────────────────────────────────────┘        │
│      │                                                               │
│      └──[code]──► Kong ──[exchange for tokens]──► Entra             │
│                       │                                              │
│                   Set session cookie                                 │
│                   Map user → Kong consumer                           │
│                   Enforce group membership                           │
│                       │                                              │
│                       └──────────────────────────────► OpenAI API   │
└──────────────────────────────────────────────────────────────────────┘
```

### Key Entra ID Concepts Used

| Concept | Role in Kong Integration |
|---|---|
| **App Registration** | Represents Kong in Entra ID; defines scopes and roles |
| **Client Credentials** | M2M auth — services authenticate as the app itself |
| **Authorization Code** | User SSO — humans log in with corporate accounts |
| **App Roles** | Map to Kong ACL groups (e.g., `AI.Premium`, `AI.Free`) |
| **Groups** | Entra security groups → Kong consumer groups |
| **JWKS URI** | Kong validates token signatures without calling Entra on every request |
| **Managed Identity** | Azure-hosted Kong authenticates to Entra without any stored secret |

---

## 2. Entra ID App Registration

Every integration starts with registering Kong AI Gateway as an application in Entra ID.

### Step 1: Create the App Registration

Via Azure Portal:

```
Azure Portal → Microsoft Entra ID → App registrations → New registration

Name:           Kong AI Gateway
Supported types: Accounts in this organizational directory only (Single tenant)
Redirect URI:   Web → https://your-kong-domain.com/ai/callback
```

Via Azure CLI:

```bash
# Login to Azure
az login

# Create the app registration
az ad app create \
  --display-name "Kong AI Gateway" \
  --sign-in-audience "AzureADMyOrg" \
  --web-redirect-uris "https://kong.company.com/ai/callback" \
  --identifier-uris "api://kong-ai-gateway"

# Capture the IDs
APP_ID=$(az ad app list --display-name "Kong AI Gateway" --query "[0].appId" -o tsv)
TENANT_ID=$(az account show --query tenantId -o tsv)

echo "App (Client) ID: $APP_ID"
echo "Tenant ID:       $TENANT_ID"
```

### Step 2: Create a Client Secret

```bash
# Create a client secret (valid for 2 years)
CLIENT_SECRET=$(az ad app credential reset \
  --id $APP_ID \
  --years 2 \
  --query password -o tsv)

echo "Client Secret: $CLIENT_SECRET"
# Store this in your vault — it won't be shown again
```

### Step 3: Define App Roles (Maps to Kong ACL Groups)

```bash
# Add App Roles via Azure CLI
az ad app update --id $APP_ID --app-roles '
[
  {
    "allowedMemberTypes": ["Application", "User"],
    "description": "Access to all AI models including GPT-4o and Claude",
    "displayName": "AI Premium",
    "id": "11111111-1111-1111-1111-111111111111",
    "isEnabled": true,
    "value": "AI.Premium"
  },
  {
    "allowedMemberTypes": ["Application", "User"],
    "description": "Access to standard AI models (GPT-4o-mini)",
    "displayName": "AI Standard",
    "id": "22222222-2222-2222-2222-222222222222",
    "isEnabled": true,
    "value": "AI.Standard"
  },
  {
    "allowedMemberTypes": ["Application", "User"],
    "description": "Read-only access to AI chat",
    "displayName": "AI Free",
    "id": "33333333-3333-3333-3333-333333333333",
    "isEnabled": true,
    "value": "AI.Free"
  },
  {
    "allowedMemberTypes": ["Application", "User"],
    "description": "Full administrative access to Kong AI Gateway",
    "displayName": "AI Admin",
    "id": "44444444-4444-4444-4444-444444444444",
    "isEnabled": true,
    "value": "AI.Admin"
  }
]'
```

### Step 4: Define API Scopes (OAuth 2.0 Delegated Permissions)

```
Azure Portal →
  App Registration (Kong AI Gateway) →
  Expose an API →
  Add a scope

Scope name:       ai.chat
Admin consent:    Required
Display name:     Access AI Chat
Description:      Allows calling AI chat completions through Kong gateway

Scope name:       ai.embeddings
Admin consent:    Required
Display name:     Access AI Embeddings
Description:      Allows calling AI embedding models through Kong gateway
```

### Step 5: Grant Admin Consent

```bash
# Grant admin consent for the app's own permissions
az ad app permission admin-consent --id $APP_ID
```

### Key Endpoints (Save These)

```bash
TENANT_ID="your-tenant-id"

# OpenID Connect discovery document (Kong reads this automatically)
DISCOVERY_URL="https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration"

# Token endpoint (for client credentials flow)
TOKEN_ENDPOINT="https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token"

# Authorization endpoint (for user login flow)
AUTH_ENDPOINT="https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize"

# JWKS URI (Kong uses this to validate token signatures)
JWKS_URI="https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys"

# Issuer (must match iss claim in tokens)
ISSUER="https://login.microsoftonline.com/${TENANT_ID}/v2.0"
```

---

## 3. OAuth 2.0 Client Credentials Flow (M2M)

Used when **services** (not humans) call the Kong AI Gateway. No user interaction required.

### How a Client Service Gets a Token

```bash
# A backend service requests an access token from Entra ID
TOKEN_RESPONSE=$(curl -s -X POST \
  "https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=${APP_ID}" \
  -d "client_secret=${CLIENT_SECRET}" \
  -d "scope=api://kong-ai-gateway/.default")

ACCESS_TOKEN=$(echo $TOKEN_RESPONSE | jq -r .access_token)

echo "Token: $ACCESS_TOKEN"
echo "Expires in: $(echo $TOKEN_RESPONSE | jq -r .expires_in) seconds"

# Decode and inspect the token claims
echo $ACCESS_TOKEN | cut -d. -f2 | base64 -d 2>/dev/null | jq .
```

**Decoded JWT payload looks like:**

```json
{
  "aud": "api://kong-ai-gateway",
  "iss": "https://login.microsoftonline.com/{tenant-id}/v2.0",
  "iat": 1737000000,
  "exp": 1737003600,
  "aio": "...",
  "appid": "{client-app-id}",
  "appidacr": "1",
  "idp": "https://sts.windows.net/{tenant-id}/",
  "oid": "{object-id}",
  "roles": ["AI.Premium"],
  "sub": "{subject}",
  "tid": "{tenant-id}",
  "ver": "2.0"
}
```

### Call Kong with the Entra Token

```bash
# Service calls Kong AI Gateway with the Entra access token
curl -X POST https://kong.company.com/ai/v1/chat/completions \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  -H "Content-Type: application/json" \
  --json '{
    "messages": [
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user",   "content": "Summarize today'\''s sales report."}
    ]
  }'
```

### Configure Kong to Validate Client Credentials Tokens

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json "{
    \"name\": \"openid-connect\",
    \"config\": {
      \"issuer\": \"https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration\",

      \"client_id\": [\"${APP_ID}\"],
      \"client_secret\": [\"${CLIENT_SECRET}\"],

      \"auth_methods\": [\"bearer\"],

      \"bearer_token_param_type\": [\"header\"],

      \"audience_required\": [\"api://kong-ai-gateway\"],

      \"verify_claims\": true,
      \"verify_signature\": true,
      \"verify_expiry\": true,

      \"hide_credentials\": true,

      \"consumer_claim\": \"appid\",
      \"consumer_by\": [\"custom_id\"],

      \"scopes_required\": [],

      \"cache_jwks\": true,
      \"cache_jwks_ttl\": 300
    }
  }"
```

---

## 4. Authorization Code Flow (User Login / SSO)

Used when **humans** authenticate with their corporate Entra ID credentials through a browser.

### Configure Kong OIDC for User SSO

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json "{
    \"name\": \"openid-connect\",
    \"config\": {
      \"issuer\": \"https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration\",

      \"client_id\": [\"${APP_ID}\"],
      \"client_secret\": [\"${CLIENT_SECRET}\"],

      \"auth_methods\": [\"authorization_code\"],

      \"redirect_uri\": \"https://kong.company.com/ai/callback\",

      \"scopes\": [
        \"openid\",
        \"profile\",
        \"email\",
        \"api://kong-ai-gateway/ai.chat\"
      ],

      \"response_type\": \"code\",
      \"response_mode\": \"form_post\",

      \"consumer_claim\": \"email\",
      \"consumer_by\": [\"username\"],

      \"groups_claim\": \"groups\",

      \"hide_credentials\": true,

      \"session_secret\": \"CHANGE-THIS-TO-32-RANDOM-CHARS:::\",
      \"session_cookie_name\": \"kong_entra_session\",
      \"session_cookie_secure\": true,
      \"session_cookie_http_only\": true,
      \"session_cookie_same_site\": \"Lax\",
      \"session_rolling_timeout\": 3600,
      \"session_absolute_timeout\": 28800,

      \"login_action\": \"redirect\",
      \"login_redirect_uri\": [\"https://kong.company.com/ai/chat\"],
      \"logout_uri\": \"/logout\",
      \"logout_redirect_uri\": [\"https://kong.company.com/\"],
      \"logout_methods\": [\"GET\", \"POST\"],
      \"logout_revoke\": true,

      \"forbidden_redirect_uri\": [\"https://kong.company.com/access-denied\"],
      \"unauthorized_redirect_uri\": [\"https://kong.company.com/login\"]
    }
  }"
```

### Handle the Callback Route

Create a dedicated route for Entra's redirect callback:

```bash
# Kong handles the /ai/callback path automatically when using the OIDC plugin
# But you need a route that matches it
curl -X POST http://localhost:8001/routes \
  --json '{
    "name": "entra-callback",
    "paths": ["/ai/callback"],
    "methods": ["GET", "POST"],
    "service": {"name": "openai-service"}
  }'
```

### Supporting Both SSO and M2M on the Same Route

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json "{
    \"name\": \"openid-connect\",
    \"config\": {
      \"issuer\": \"https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration\",
      \"client_id\": [\"${APP_ID}\"],
      \"client_secret\": [\"${CLIENT_SECRET}\"],

      \"auth_methods\": [
        \"bearer\",
        \"authorization_code\",
        \"session\"
      ],

      \"scopes\": [\"openid\", \"profile\", \"email\"],
      \"audience_required\": [\"api://kong-ai-gateway\"],

      \"consumer_claim\": \"email\",
      \"consumer_by\": [\"username\", \"custom_id\"],

      \"hide_credentials\": true,
      \"session_cookie_name\": \"kong_entra_session\",
      \"session_secret\": \"32-char-random-secret-here::::::\"
    }
  }"
```

Kong automatically tries each `auth_method` in order:
1. Checks for a session cookie → if valid, use it
2. Checks for a `Bearer` token in the `Authorization` header → validate JWT
3. Falls back to authorization code redirect → browser SSO

---

## 5. JWT / Bearer Token Validation

Kong validates Entra-issued JWTs **locally** using the JWKS endpoint — no round-trip to Entra on every request.

### How JWT Validation Works

```
Client sends:  Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGci...
                                          │
Kong performs: 1. Decode header → get kid (Key ID)
               2. Fetch JWKS from Entra (cached 300s):
                  https://login.microsoftonline.com/{tenant}/discovery/v2.0/keys
               3. Find matching public key by kid
               4. Verify RS256 signature
               5. Validate claims:
                  - iss == "https://login.microsoftonline.com/{tenant}/v2.0"
                  - aud == "api://kong-ai-gateway"
                  - exp > now
                  - nbf <= now
               6. Extract roles, groups, email
               7. Map to Kong consumer
```

### Using the JWT Plugin (Alternative — Manual JWKS)

If you prefer the lightweight `jwt` plugin over the full OIDC plugin:

```bash
# Step 1: Fetch Entra's public signing keys
curl -s "https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys" | jq .

# Step 2: For each key in the JWKS response, create a JWT credential in Kong
# (You'd automate this — keys rotate periodically)

# Create a consumer for Entra-authenticated services
curl -X POST http://localhost:8001/consumers \
  --json '{"username": "entra-validated", "custom_id": "entra-validated"}'

# Register the Entra public key (RS256)
curl -X POST http://localhost:8001/consumers/entra-validated/jwt \
  --json "{
    \"algorithm\": \"RS256\",
    \"key\": \"https://login.microsoftonline.com/${TENANT_ID}/v2.0\",
    \"rsa_public_key\": \"-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----\"
  }"

# Enable JWT plugin — validate iss claim matches Entra
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json '{
    "name": "jwt",
    "config": {
      "header_names": ["Authorization"],
      "claims_to_verify": ["exp", "nbf"],
      "key_claim_name": "iss",
      "hide_credentials": true
    }
  }'
```

> **Recommendation:** Use the `openid-connect` plugin rather than the bare `jwt` plugin. The OIDC plugin handles JWKS auto-refresh, key rotation, token revocation checking, and session management automatically.

### Validating Token Claims with Pre-Function

Add custom claim validation beyond what the OIDC plugin supports out of the box:

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json '{
    "name": "pre-function",
    "config": {
      "access": [
        "-- Get the validated Entra token claims from OIDC plugin context",
        "local claims = kong.ctx.shared.authenticated_credential",
        "",
        "if not claims then",
        "  return kong.response.exit(401, {error = \"No authenticated credential\"})",
        "end",
        "",
        "-- Enforce that the token is from our specific tenant",
        "local expected_tenant = os.getenv(\"ENTRA_TENANT_ID\")",
        "if claims.tid ~= expected_tenant then",
        "  return kong.response.exit(403, {error = \"Token from unauthorized tenant\"})",
        "end",
        "",
        "-- Enforce token version is v2.0",
        "if claims.ver ~= \"2.0\" then",
        "  return kong.response.exit(403, {error = \"Token version not supported\"})",
        "end"
      ]
    }
  }'
```

---

## 6. OIDC Plugin Full Configuration

Complete reference for the `openid-connect` plugin configured for Entra ID.

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json "{
    \"name\": \"openid-connect\",
    \"config\": {

      /* ── Identity Provider ─────────────────────────────────── */
      \"issuer\": \"https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration\",

      /* ── App Registration ──────────────────────────────────── */
      \"client_id\": [\"${APP_ID}\"],
      \"client_secret\": [\"{vault://aws/kong/entra/client-secret}\"],
      \"client_auth\": [\"client_secret_post\"],

      /* ── Auth Methods (order = priority) ───────────────────── */
      \"auth_methods\": [
        \"session\",
        \"bearer\",
        \"client_credentials\",
        \"authorization_code\"
      ],

      /* ── Scopes & Audience ─────────────────────────────────── */
      \"scopes\": [\"openid\", \"profile\", \"email\", \"api://kong-ai-gateway/ai.chat\"],
      \"audience_required\": [\"api://kong-ai-gateway\"],
      \"scopes_required\": [\"api://kong-ai-gateway/ai.chat\"],

      /* ── Token Validation ──────────────────────────────────── */
      \"verify_claims\": true,
      \"verify_signature\": true,
      \"verify_expiry\": true,
      \"verify_nonce\": true,
      \"verify_parameters\": true,
      \"leeway\": 60,

      /* ── Consumer Mapping ──────────────────────────────────── */
      \"consumer_claim\": \"email\",
      \"consumer_by\": [\"username\", \"custom_id\"],
      \"consumer_optional\": false,

      /* ── Groups & Roles Extraction ─────────────────────────── */
      \"groups_claim\": \"roles\",

      /* ── JWKS Caching ──────────────────────────────────────── */
      \"cache_jwks\": true,
      \"cache_jwks_ttl\": 300,
      \"cache_tokens\": true,
      \"cache_tokens_salt\": \"random-salt-string-here\",

      /* ── Token Introspection ───────────────────────────────── */
      \"introspect_jwt_tokens\": false,

      /* ── Hide Credentials from Upstream ───────────────────── */
      \"hide_credentials\": true,

      /* ── Upstream Headers (injected after auth) ────────────── */
      \"upstream_headers_claims\": [\"email\", \"oid\", \"roles\", \"tid\", \"name\"],
      \"upstream_headers_names\": [
        \"X-User-Email\",
        \"X-User-OID\",
        \"X-User-Roles\",
        \"X-Tenant-ID\",
        \"X-User-Name\"
      ],

      /* ── Session (for browser SSO) ─────────────────────────── */
      \"session_secret\": \"{vault://aws/kong/entra/session-secret}\",
      \"session_cookie_name\": \"kong_entra_session\",
      \"session_cookie_secure\": true,
      \"session_cookie_http_only\": true,
      \"session_cookie_same_site\": \"Lax\",
      \"session_rolling_timeout\": 3600,
      \"session_absolute_timeout\": 28800,
      \"session_memcache_prefix\": \"oidc_sessions\",

      /* ── Login / Logout ────────────────────────────────────── */
      \"redirect_uri\": \"https://kong.company.com/ai/callback\",
      \"login_action\": \"redirect\",
      \"login_redirect_uri\": [\"https://kong.company.com/ai/chat\"],
      \"logout_uri\": \"/logout\",
      \"logout_redirect_uri\": [\"https://kong.company.com/\"],
      \"logout_methods\": [\"GET\", \"POST\"],
      \"logout_revoke\": true,
      \"logout_revoke_access_token\": true,
      \"logout_revoke_refresh_token\": true,

      /* ── Error Handling ────────────────────────────────────── */
      \"forbidden_redirect_uri\": [\"https://kong.company.com/access-denied\"],
      \"unauthorized_redirect_uri\": [\"https://kong.company.com/login\"],
      \"forbidden_error_message\": \"You do not have permission to access AI Gateway\",

      /* ── TLS ───────────────────────────────────────────────── */
      \"ssl_verify\": true,
      \"timeout\": 10000,
      \"keepalive\": true
    }
  }"
```

---

## 7. Group & Role Mapping to Kong ACL

Entra ID App Roles and Security Groups map directly to Kong ACL groups to control which AI models each user/service can access.

### Option A: Map App Roles → Kong ACL (Recommended)

App Roles appear in the `roles` claim of the token. Configure Entra to include them:

```
Azure Portal →
  App Registration (Kong AI Gateway) →
  Token configuration →
  Add optional claim →
  Token type: Access →
  Claim: roles ✓
```

Kong OIDC plugin extracts roles and creates the consumer in the correct group:

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json '{
    "name": "openid-connect",
    "config": {
      "groups_claim": "roles",
      "groups_required": ["AI.Free", "AI.Standard", "AI.Premium", "AI.Admin"]
    }
  }'
```

Then use Kong ACL plugin alongside to enforce per-route access:

```bash
# Premium route — only AI.Premium and AI.Admin roles
curl -X POST http://localhost:8001/routes/premium-ai/plugins \
  --json '{
    "name": "acl",
    "config": {
      "allow": ["AI.Premium", "AI.Admin"],
      "hide_groups_header": true
    }
  }'

# Standard route — AI.Standard and above
curl -X POST http://localhost:8001/routes/standard-ai/plugins \
  --json '{
    "name": "acl",
    "config": {
      "allow": ["AI.Standard", "AI.Premium", "AI.Admin"],
      "hide_groups_header": true
    }
  }'
```

### Option B: Map Entra Security Groups → Kong ACL

Include group object IDs in the token:

```
Azure Portal →
  App Registration →
  Token configuration →
  Add groups claim →
  Select: Security groups
  Customize token properties by type:
    Access token: Group ID ✓
```

This adds the group object IDs to the `groups` claim:

```json
{
  "groups": [
    "a1b2c3d4-0000-0000-0000-111111111111",
    "e5f6g7h8-0000-0000-0000-222222222222"
  ]
}
```

Map group GUIDs to Kong ACL groups using a pre-function plugin:

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json '{
    "name": "pre-function",
    "config": {
      "access": [
        "-- Entra Group ID → Kong ACL Group mapping",
        "local GROUP_MAP = {",
        "  [\"a1b2c3d4-0000-0000-0000-111111111111\"] = \"AI.Premium\",",
        "  [\"e5f6g7h8-0000-0000-0000-222222222222\"] = \"AI.Standard\",",
        "  [\"i9j0k1l2-0000-0000-0000-333333333333\"] = \"AI.Free\",",
        "}",
        "",
        "local groups_header = kong.request.get_header(\"X-User-Groups\") or \"\"",
        "local mapped_groups = {}",
        "",
        "for group_id in groups_header:gmatch(\"[^,]+\") do",
        "  local mapped = GROUP_MAP[group_id:match(\"^%s*(.-)%s*$\")]",
        "  if mapped then",
        "    table.insert(mapped_groups, mapped)",
        "  end",
        "end",
        "",
        "if #mapped_groups == 0 then",
        "  return kong.response.exit(403, {error = \"No AI access role assigned in Entra ID\"})",
        "end",
        "",
        "kong.request.set_header(\"X-Kong-Groups\", table.concat(mapped_groups, \",\"))"
      ]
    }
  }'
```

### Assign App Roles to Users and Service Principals

```bash
# Get the service principal ID for the app
SP_ID=$(az ad sp show --id $APP_ID --query id -o tsv)

# Assign AI.Premium role to a user
USER_OID=$(az ad user show --id alice@company.com --query id -o tsv)

az rest --method POST \
  --uri "https://graph.microsoft.com/v1.0/servicePrincipals/${SP_ID}/appRoleAssignments" \
  --body "{
    \"principalId\": \"${USER_OID}\",
    \"resourceId\": \"${SP_ID}\",
    \"appRoleId\": \"11111111-1111-1111-1111-111111111111\"
  }"

# Assign AI.Standard role to a service principal (M2M client app)
CLIENT_SP_ID=$(az ad sp show --id $CLIENT_APP_ID --query id -o tsv)

az rest --method POST \
  --uri "https://graph.microsoft.com/v1.0/servicePrincipals/${SP_ID}/appRoleAssignments" \
  --body "{
    \"principalId\": \"${CLIENT_SP_ID}\",
    \"resourceId\": \"${SP_ID}\",
    \"appRoleId\": \"22222222-2222-2222-2222-222222222222\"
  }"
```

---

## 8. Per-Consumer Auto-Provisioning from Entra ID

When a new Entra ID user or service authenticates for the first time, Kong can automatically create a consumer and assign the correct ACL group — no manual onboarding needed.

### OIDC Auto-Provisioning Config

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json '{
    "name": "openid-connect",
    "config": {
      "consumer_claim": "email",
      "consumer_by": ["username"],
      "consumer_optional": false,

      "groups_claim": "roles",

      "login_action": "redirect",
      "login_redirect_uri": ["https://kong.company.com/ai/chat"],

      "forbidden_redirect_uri": ["https://kong.company.com/no-access"]
    }
  }'
```

When `consumer_optional: false`, Kong will:
1. Extract the `email` claim from the Entra token
2. Search for a Kong consumer with that username
3. If not found → create the consumer automatically
4. Assign groups from the `roles` claim

### Post-Provisioning Hook via post-function

After auto-provisioning, apply additional setup:

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json '{
    "name": "post-function",
    "config": {
      "access": [
        "local consumer = kong.client.get_consumer()",
        "if not consumer then return end",
        "",
        "-- Log new consumer provisioning event",
        "kong.log.info(\"[Entra Auto-Provision] Consumer: \" .. consumer.username)",
        "",
        "-- Inject consumer metadata as upstream headers",
        "kong.service.request.set_header(\"X-Consumer-Username\", consumer.username)",
        "kong.service.request.set_header(\"X-Consumer-ID\", consumer.id)",
        "",
        "-- Remove sensitive headers before reaching OpenAI",
        "kong.service.request.clear_header(\"Cookie\")",
        "kong.service.request.clear_header(\"Authorization\")"
      ]
    }
  }'
```

---

## 9. Conditional Access & MFA Enforcement

Entra Conditional Access policies can enforce MFA before tokens are issued. Kong enforces that the resulting token carries the required authentication method claim.

### Configure Conditional Access in Entra

```
Azure Portal →
  Microsoft Entra ID →
  Security →
  Conditional Access →
  New policy

Name: Require MFA for Kong AI Gateway

Assignments:
  Users: All users (or specific groups)
  Target resources: Kong AI Gateway (your app registration)

Access controls → Grant:
  ☑ Require multifactor authentication
  ☑ Require compliant device (optional, for corporate devices)

Session:
  Sign-in frequency: 1 hour (for sensitive AI access)

Enable policy: On
```

### Validate MFA Claim in Kong

Entra tokens include an `amr` (Authentication Methods References) claim after MFA:

```json
{
  "amr": ["pwd", "mfa", "rsa"],
  "acr": "1"
}
```

Enforce MFA via pre-function:

```bash
curl -X POST http://localhost:8001/routes/enterprise-ai/plugins \
  --json '{
    "name": "pre-function",
    "config": {
      "access": [
        "-- Read the amr header injected by OIDC plugin",
        "local amr = kong.request.get_header(\"X-Auth-Methods\") or \"\"",
        "",
        "-- Require MFA for premium and enterprise routes",
        "local has_mfa = amr:find(\"mfa\") or amr:find(\"rsa\") or amr:find(\"otp\")",
        "",
        "if not has_mfa then",
        "  return kong.response.exit(403, {",
        "    error = \"MFA required\",",
        "    message = \"Multi-factor authentication is required to access this AI endpoint.\",",
        "    mfa_required = true",
        "  })",
        "end"
      ]
    }
  }'
```

Configure OIDC plugin to include `amr` as an upstream header:

```bash
# Add amr to upstream headers in OIDC config
curl -X PATCH http://localhost:8001/plugins/<oidc-plugin-id> \
  --json '{
    "config": {
      "upstream_headers_claims": ["email", "oid", "roles", "amr"],
      "upstream_headers_names": ["X-User-Email", "X-User-OID", "X-User-Roles", "X-Auth-Methods"]
    }
  }'
```

---

## 10. Multi-Tenant Entra ID Setup

For SaaS products serving multiple organizations, each with their own Entra ID tenant.

### Option A: Common Endpoint (Any Tenant)

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json '{
    "name": "openid-connect",
    "config": {
      "issuer": "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
      "client_id": ["your-multitenant-app-id"],
      "client_secret": ["your-client-secret"],

      "auth_methods": ["bearer", "authorization_code"],

      "verify_claims": true,
      "verify_signature": true,
      "issuers_allowed": [
        "https://login.microsoftonline.com/TENANT-A-ID/v2.0",
        "https://login.microsoftonline.com/TENANT-B-ID/v2.0",
        "https://login.microsoftonline.com/TENANT-C-ID/v2.0"
      ],

      "consumer_claim": "oid",
      "consumer_by": ["custom_id"]
    }
  }'
```

### Option B: Per-Tenant Routes (Strict Isolation)

Create a separate Kong route per tenant, each with its own OIDC plugin pointing to that tenant's issuer:

```bash
# Tenant A route
curl -X POST http://localhost:8001/routes \
  --json '{
    "name": "tenant-a-ai",
    "paths": ["/tenant-a/ai"],
    "headers": {"X-Tenant-ID": ["tenant-a"]},
    "service": {"name": "openai-service"}
  }'

curl -X POST http://localhost:8001/routes/tenant-a-ai/plugins \
  --json '{
    "name": "openid-connect",
    "config": {
      "issuer": "https://login.microsoftonline.com/TENANT-A-ID/v2.0/.well-known/openid-configuration",
      "client_id": ["app-id-for-tenant-a"],
      "client_secret": ["{vault://aws/kong/tenant-a/client-secret}"],
      "audience_required": ["api://kong-ai-gateway-tenant-a"]
    }
  }'

# Tenant B route
curl -X POST http://localhost:8001/routes \
  --json '{
    "name": "tenant-b-ai",
    "paths": ["/tenant-b/ai"],
    "headers": {"X-Tenant-ID": ["tenant-b"]},
    "service": {"name": "openai-service"}
  }'

curl -X POST http://localhost:8001/routes/tenant-b-ai/plugins \
  --json '{
    "name": "openid-connect",
    "config": {
      "issuer": "https://login.microsoftonline.com/TENANT-B-ID/v2.0/.well-known/openid-configuration",
      "client_id": ["app-id-for-tenant-b"],
      "client_secret": ["{vault://aws/kong/tenant-b/client-secret}"],
      "audience_required": ["api://kong-ai-gateway-tenant-b"]
    }
  }'
```

### Enforce Tenant Isolation

Prevent cross-tenant token usage:

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json '{
    "name": "pre-function",
    "config": {
      "access": [
        "local tenant_id_from_token = kong.request.get_header(\"X-Tenant-ID\")",
        "local expected_tenant = kong.router.get_route().name:match(\"^tenant%-(.-)%-\")",
        "",
        "if tenant_id_from_token ~= expected_tenant then",
        "  return kong.response.exit(403, {",
        "    error = \"Tenant mismatch\",",
        "    message = \"Token tenant does not match the requested route tenant\"",
        "  })",
        "end"
      ]
    }
  }'
```

---

## 11. Token Introspection & Revocation

For high-security scenarios, validate tokens against Entra's introspection endpoint on every request (at the cost of latency).

### Enable Token Introspection

```bash
curl -X POST http://localhost:8001/services/openai-service/plugins \
  --json "{
    \"name\": \"openid-connect\",
    \"config\": {
      \"issuer\": \"https://login.microsoftonline.com/${TENANT_ID}/v2.0/.well-known/openid-configuration\",
      \"client_id\": [\"${APP_ID}\"],
      \"client_secret\": [\"${CLIENT_SECRET}\"],

      \"introspect_jwt_tokens\": true,

      \"introspection_endpoint\": \"https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/introspect\",
      \"introspection_endpoint_auth_method\": \"client_secret_post\",

      \"introspection_hint\": \"access_token\",

      \"introspection_check_active\": true,

      \"cache_introspection\": true,
      \"cache_introspection_ttl\": 30
    }
  }"
```

### Handle Revoked Tokens Immediately

When a user is offboarded (e.g., leaves the company), their Entra account is disabled — tokens issued before that point may still be valid until they expire. Introspection catches this within the cache TTL.

```bash
# Reduce cache TTL for sensitive routes (trade latency for security)
curl -X PATCH http://localhost:8001/plugins/<oidc-plugin-id> \
  --json '{
    "config": {
      "cache_introspection": true,
      "cache_introspection_ttl": 10
    }
  }'
```

### Force Token Revocation on Logout

```bash
curl -X PATCH http://localhost:8001/plugins/<oidc-plugin-id> \
  --json '{
    "config": {
      "logout_revoke": true,
      "logout_revoke_access_token": true,
      "logout_revoke_refresh_token": true
    }
  }'
```

---

## 12. Managed Identity for Kong on Azure

When Kong runs on Azure (AKS, VM, Container Apps), use **Managed Identity** so Kong itself authenticates to Entra without storing any client secret.

### Enable Managed Identity on AKS

```bash
# Create AKS cluster with managed identity
az aks create \
  --resource-group kong-rg \
  --name kong-aks \
  --enable-managed-identity \
  --node-count 3

# Get the managed identity principal ID
IDENTITY_ID=$(az aks show \
  --resource-group kong-rg \
  --name kong-aks \
  --query "identityProfile.kubeletidentity.objectId" -o tsv)

echo "Managed Identity Object ID: $IDENTITY_ID"
```

### Grant Managed Identity Access to Key Vault (for secrets)

```bash
# Allow the AKS managed identity to read secrets
az keyvault set-policy \
  --name kong-keyvault \
  --object-id $IDENTITY_ID \
  --secret-permissions get list

# Or with RBAC (preferred)
az role assignment create \
  --role "Key Vault Secrets User" \
  --assignee $IDENTITY_ID \
  --scope "/subscriptions/{sub-id}/resourceGroups/kong-rg/providers/Microsoft.KeyVault/vaults/kong-keyvault"
```

### Configure Kong Vault to Use Managed Identity

```bash
curl -X POST http://localhost:8001/vaults \
  --json '{
    "name": "azure",
    "prefix": "azure",
    "description": "Azure Key Vault via Managed Identity",
    "config": {
      "vault_uri": "https://kong-keyvault.vault.azure.net",
      "auth_method": "managed_identity",
      "ttl": 300,
      "neg_ttl": 0
    }
  }'

# Reference secrets using the vault
# {vault://azure/openai-api-key}
# {vault://azure/entra-client-secret}
```

### Use Workload Identity (Recommended for AKS)

```bash
# Create a user-assigned managed identity
az identity create \
  --name kong-workload-identity \
  --resource-group kong-rg

UAMI_CLIENT_ID=$(az identity show \
  --name kong-workload-identity \
  --resource-group kong-rg \
  --query clientId -o tsv)

UAMI_OBJECT_ID=$(az identity show \
  --name kong-workload-identity \
  --resource-group kong-rg \
  --query principalId -o tsv)

# Enable OIDC issuer on AKS
az aks update \
  --resource-group kong-rg \
  --name kong-aks \
  --enable-oidc-issuer \
  --enable-workload-identity

# Create federated credential for Kong's service account
AKS_OIDC_ISSUER=$(az aks show \
  --resource-group kong-rg \
  --name kong-aks \
  --query "oidcIssuerProfile.issuerUrl" -o tsv)

az identity federated-credential create \
  --name kong-federated-cred \
  --identity-name kong-workload-identity \
  --resource-group kong-rg \
  --issuer $AKS_OIDC_ISSUER \
  --subject "system:serviceaccount:kong:kong" \
  --audiences "api://AzureADTokenExchange"
```

```yaml
# kong-serviceaccount.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: kong
  namespace: kong
  annotations:
    azure.workload.identity/client-id: "<uami-client-id>"
    azure.workload.identity/tenant-id: "<tenant-id>"
```

```yaml
# kong-deployment.yaml (add workload identity label)
spec:
  template:
    metadata:
      labels:
        azure.workload.identity/use: "true"
```

---

## 13. Troubleshooting Entra ID Auth Issues

### Common Error: `401 Unauthorized` — Invalid Token

```bash
# Decode and inspect the token manually
TOKEN="eyJ0eXAiOiJKV1QiLCJhbGci..."
echo $TOKEN | cut -d. -f2 | base64 -d 2>/dev/null | jq '{iss, aud, exp, roles, tid, ver}'

# Common causes:
# 1. aud claim doesn't match Kong's audience_required config
#    Token aud: "https://graph.microsoft.com"
#    Expected:  "api://kong-ai-gateway"
#    Fix: request token with scope "api://kong-ai-gateway/.default"

# 2. Token issued for wrong tenant
#    Check tid claim matches your TENANT_ID

# 3. Token expired (exp < now)
#    Refresh the token and retry

# Check Kong OIDC plugin logs
docker logs kong 2>&1 | grep -i "oidc\|openid\|entra\|401\|403"
```

### Common Error: `403 Forbidden` — Missing Role

```bash
# Check if the user has the app role assigned
az rest --method GET \
  --uri "https://graph.microsoft.com/v1.0/users/alice@company.com/appRoleAssignments" \
  | jq '.value[] | {appRoleId, principalDisplayName}'

# Check role is included in token (v2.0 tokens include roles in access token by default)
# But you must request the right scope: "api://kong-ai-gateway/.default"
# NOT just "openid profile email" — those don't include app roles

# Force include roles in token via optional claims
# Azure Portal → App Registration → Token configuration → Add optional claim → roles
```

### Common Error: `JWKS fetch failed`

```bash
# Test JWKS endpoint reachability from Kong's network
docker exec kong curl -s \
  "https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys" | jq .keys[0].kid

# If blocked, check Kong's outbound network policy allows:
# login.microsoftonline.com:443
# graph.microsoft.com:443 (for introspection)

# Increase JWKS cache TTL to reduce fetch frequency
curl -X PATCH http://localhost:8001/plugins/<oidc-plugin-id> \
  --json '{"config": {"cache_jwks_ttl": 600}}'
```

### Common Error: Session Not Persisting

```bash
# Check session secret is consistent across all Kong nodes
# (All replicas must use the SAME session_secret)
curl http://localhost:8001/plugins/<oidc-plugin-id> | jq .config.session_secret

# Verify session cookie is being set
curl -v https://kong.company.com/ai/chat 2>&1 | grep -i "set-cookie"

# Check session backend — for multi-node Kong, use Redis-backed sessions
curl -X PATCH http://localhost:8001/plugins/<oidc-plugin-id> \
  --json '{
    "config": {
      "session_storage": "redis",
      "session_redis_host": "redis",
      "session_redis_port": 6379,
      "session_redis_prefix": "kong_oidc"
    }
  }'
```

### Debug Mode

```bash
# Enable OIDC debug logging
curl -X PATCH http://localhost:8001/plugins/<oidc-plugin-id> \
  --json '{"config": {"resolve_distributed_claims": true}}'

# Set Kong log level to debug
curl -X PATCH http://localhost:8001/config \
  --json '{"log_level": "debug"}'

# Watch for OIDC events
docker logs -f kong 2>&1 | grep -E "oidc|openid|Bearer|jwt|claim"

# Reset log level when done
curl -X PATCH http://localhost:8001/config \
  --json '{"log_level": "warn"}'
```

---

## 14. Complete Working Reference Config

Full declarative config (`deck sync`) for Entra ID integration:

```yaml
# entra-kong-ai.yaml
_format_version: "3.0"
_transform: true

vaults:
  - name: azure
    prefix: azure
    description: "Azure Key Vault via Managed Identity"
    config:
      vault_uri: "https://kong-keyvault.vault.azure.net"
      auth_method: "managed_identity"
      ttl: 300

services:
  - name: openai-service
    url: https://api.openai.com
    read_timeout: 120000
    connect_timeout: 10000
    tls_verify: true

    routes:
      - name: ai-chat
        paths: ["/ai/v1/chat/completions"]
        methods: ["POST"]
        strip_path: false

      - name: ai-embeddings
        paths: ["/ai/v1/embeddings"]
        methods: ["POST"]
        strip_path: false

      - name: entra-callback
        paths: ["/ai/callback"]
        methods: ["GET", "POST"]
        strip_path: false

    plugins:

      # ── 1. OIDC: Entra ID Authentication ────────────────────────
      - name: openid-connect
        config:
          issuer: "https://login.microsoftonline.com/YOUR-TENANT-ID/v2.0/.well-known/openid-configuration"
          client_id:
            - "YOUR-APP-CLIENT-ID"
          client_secret:
            - "{vault://azure/kong-entra-client-secret}"
          auth_methods:
            - session
            - bearer
            - client_credentials
            - authorization_code
          scopes:
            - openid
            - profile
            - email
            - "api://kong-ai-gateway/ai.chat"
          audience_required:
            - "api://kong-ai-gateway"
          consumer_claim: email
          consumer_by:
            - username
            - custom_id
          groups_claim: roles
          hide_credentials: true
          upstream_headers_claims:
            - email
            - oid
            - roles
            - name
            - tid
          upstream_headers_names:
            - X-User-Email
            - X-User-OID
            - X-User-Roles
            - X-User-Name
            - X-Tenant-ID
          session_secret: "{vault://azure/kong-session-secret}"
          session_cookie_name: kong_entra_session
          session_cookie_secure: true
          session_cookie_http_only: true
          session_cookie_same_site: Lax
          session_rolling_timeout: 3600
          session_absolute_timeout: 28800
          session_storage: redis
          session_redis_host: redis
          session_redis_port: 6379
          session_redis_prefix: kong_oidc
          redirect_uri: "https://kong.company.com/ai/callback"
          login_action: redirect
          login_redirect_uri:
            - "https://kong.company.com/ai/chat"
          logout_uri: "/logout"
          logout_redirect_uri:
            - "https://kong.company.com/"
          logout_revoke: true
          forbidden_redirect_uri:
            - "https://kong.company.com/access-denied"
          unauthorized_redirect_uri:
            - "https://kong.company.com/login"
          verify_claims: true
          verify_signature: true
          verify_expiry: true
          cache_jwks: true
          cache_jwks_ttl: 300
          ssl_verify: true

      # ── 2. ACL: Entra Role-based Access ─────────────────────────
      - name: acl
        config:
          allow:
            - AI.Free
            - AI.Standard
            - AI.Premium
            - AI.Admin
          hide_groups_header: true

      # ── 3. Rate Limiting: Token-based per consumer ───────────────
      - name: ai-rate-limiting-advanced
        config:
          limit: [500000]
          window_size: [3600]
          tokens_count_strategy: total_tokens
          strategy: redis
          redis:
            host: redis
            port: 6379

      # ── 4. Guardrails: Block prompt injection ────────────────────
      - name: ai-prompt-guard
        config:
          deny_patterns:
            - "(?i)(ignore.previous.instructions|jailbreak)"
            - "(?i)(reveal.*system.prompt|you.are.now)"

      # ── 5. Strip all client headers, inject request ID ───────────
      - name: request-transformer
        config:
          remove:
            headers:
              - Authorization
              - Cookie
              - x-api-key
              - x-forwarded-for
              - x-real-ip
          add:
            headers:
              - "X-Gateway-Request-ID:$(request.id)"

      # ── 6. AI Proxy: Inject LLM master key ──────────────────────
      - name: ai-proxy
        config:
          route_type: "llm/v1/chat"
          auth:
            header_name: Authorization
            header_value: "{vault://azure/openai-master-api-key}"
          model:
            provider: openai
            name: gpt-4o
            options:
              max_tokens: 2048
              input_cost: 0.0000025
              output_cost: 0.00001
          logging:
            log_statistics: true
            log_payloads: false

      # ── 7. Audit log all AI events ───────────────────────────────
      - name: http-log
        config:
          http_endpoint: "http://audit-service:9000/ai-events"
          flush_timeout: 2
          retry_count: 3
```

```bash
# Apply the full config
deck sync --state entra-kong-ai.yaml

# Verify
curl http://localhost:8001/services/openai-service/plugins | jq '[.data[].name]'
# → ["openid-connect", "acl", "ai-rate-limiting-advanced", "ai-prompt-guard",
#    "request-transformer", "ai-proxy", "http-log"]
```

---

## Quick Reference: Entra ID Endpoints

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ENTRA ID ENDPOINTS FOR KONG CONFIGURATION                              │
├─────────────────────────────────┬───────────────────────────────────────┤
│ ENDPOINT                        │ URL PATTERN                           │
├─────────────────────────────────┼───────────────────────────────────────┤
│ OIDC Discovery (use as issuer)  │ https://login.microsoftonline.com/    │
│                                 │ {tenant}/v2.0/.well-known/            │
│                                 │ openid-configuration                  │
├─────────────────────────────────┼───────────────────────────────────────┤
│ JWKS (signature verification)   │ https://login.microsoftonline.com/    │
│                                 │ {tenant}/discovery/v2.0/keys          │
├─────────────────────────────────┼───────────────────────────────────────┤
│ Token Endpoint                  │ https://login.microsoftonline.com/    │
│                                 │ {tenant}/oauth2/v2.0/token            │
├─────────────────────────────────┼───────────────────────────────────────┤
│ Authorization Endpoint          │ https://login.microsoftonline.com/    │
│                                 │ {tenant}/oauth2/v2.0/authorize        │
├─────────────────────────────────┼───────────────────────────────────────┤
│ Logout Endpoint                 │ https://login.microsoftonline.com/    │
│                                 │ {tenant}/oauth2/v2.0/logout           │
├─────────────────────────────────┼───────────────────────────────────────┤
│ Multi-Tenant (common)           │ Replace {tenant} with: common         │
│ Any Microsoft Account           │ Replace {tenant} with: consumers      │
│ Any Org Account                 │ Replace {tenant} with: organizations  │
└─────────────────────────────────┴───────────────────────────────────────┘
```

*Guide covers Kong Gateway 3.7 with the openid-connect plugin (Enterprise) and Microsoft Entra ID (Azure AD v2.0 endpoints). Refer to [docs.konghq.com/hub/kong-inc/openid-connect](https://docs.konghq.com/hub/kong-inc/openid-connect/) for the latest plugin schema.*
