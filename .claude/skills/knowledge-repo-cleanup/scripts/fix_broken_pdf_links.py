"""Fix broken PDF iframe references in section index pages after Phase 3 archival."""


def link_block(summary, href, label="Read the full guide"):
    return f"<details>\n<summary>{summary}</summary>\n\n→ **[{label}]({href})**\n\n</details>"


fixes = {
    "docs/ai-protocols/auth/index.md": [
        (
            '<details>\n<summary>EntraID 3LO Agent Auth Research</summary>\n<iframe src="EntraID_3LO_Agent_Auth_Research.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="EntraID_3LO_Agent_Auth_Research.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block(
                "Entra ID 3LO Agent Auth — Standards &amp; Architecture (Vol. 1)",
                "./entra-3lo-agent-auth-standards-architecture",
            ),
        ),
        (
            '<details>\n<summary>EntraID 3LO Agent Auth — Volume 2</summary>\n<iframe src="EntraID_3LO_Agent_Auth_Volume2.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="EntraID_3LO_Agent_Auth_Volume2.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block(
                "Entra ID 3LO Agent Auth — Implementation Guide (Vol. 2)", "./entra-3lo-agent-auth-implementation"
            ),
        ),
        (
            '<details>\n<summary>EntraID 3LO Agent Auth — Volume 3</summary>\n<iframe src="EntraID_3LO_Agent_Auth_Volume3.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="EntraID_3LO_Agent_Auth_Volume3.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block(
                "Entra ID 3LO Agent Auth — Multi-Agent Compliance (Vol. 3)",
                "./entra-3lo-agent-auth-multiagent-compliance",
            ),
        ),
        (
            '<details>\n<summary>EntraID 3LO Agent Auth — Volume 4</summary>\n<iframe src="EntraID_3LO_Agent_Auth_Volume4.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="EntraID_3LO_Agent_Auth_Volume4.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block("Entra ID 3LO Agent Auth — Security Review (Vol. 4)", "./entra-3lo-agent-auth-security-review"),
        ),
        (
            '<details>\n<summary>Part 2 — Tool Authentication</summary>\n<iframe src="Part2_Tool_Authentication.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="Part2_Tool_Authentication.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block("Tool Authentication &amp; Connectors", "./tool-authentication-connectors"),
        ),
    ],
    "docs/ai-protocols/mcp/index.md": [
        (
            '<details>\n<summary>MCP Deep Research 2026</summary>\n<iframe src="MCP_Deep_Research_2026.md.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="MCP_Deep_Research_2026.md.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block("MCP Deep Research 2026", "./MCP_Deep_Research_2026"),
        ),
    ],
    "docs/ai-usecases/index.md": [
        (
            '<details>\n<summary>EU Bank AI Copilot Research</summary>\n<iframe src="eu-bank-ai-copilot-research.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="eu-bank-ai-copilot-research.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block("EU Bank AI Copilot Platform (full guide)", "./eu-bank-ai-copilot-complete"),
        ),
        (
            '<details>\n<summary>TOGAF 10 APEX AI Platform — NexaBank</summary>\n<iframe src="../enterprise-architecture/framework/TOGAF10_APEX_AI_Platform_NexaBank.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="../enterprise-architecture/framework/TOGAF10_APEX_AI_Platform_NexaBank.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block(
                "APEX: AI Platform of Platforms — Combined Case Studies (NexaBank + GlobalCorp + v4)",
                "../enterprise-architecture/specialization/APEX_EA_Final",
                "Read the combined APEX guide",
            ),
        ),
        (
            '<details>\n<summary>TOGAF 10 APEX Cloud Native — GlobalCorp</summary>\n<iframe src="../enterprise-architecture/framework/TOGAF10_APEX_CloudNative_GlobalCorp.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="../enterprise-architecture/framework/TOGAF10_APEX_CloudNative_GlobalCorp.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            "<!-- GlobalCorp scenario merged into APEX_EA_Final.md — see combined guide above -->",
        ),
    ],
    "docs/enterprise-architecture/framework/index.md": [
        (
            '<details>\n<summary>TOGAF 10 APEX AI Platform — NexaBank</summary>\n<iframe src="TOGAF10_APEX_AI_Platform_NexaBank.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="TOGAF10_APEX_AI_Platform_NexaBank.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block(
                "APEX: AI Platform of Platforms — NexaBank + GlobalCorp + v4 scenarios",
                "../specialization/APEX_EA_Final",
                "Read the combined APEX guide",
            ),
        ),
        (
            '<details>\n<summary>TOGAF 10 APEX Cloud Native — GlobalCorp</summary>\n<iframe src="TOGAF10_APEX_CloudNative_GlobalCorp.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="TOGAF10_APEX_CloudNative_GlobalCorp.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            "<!-- GlobalCorp scenario merged into APEX_EA_Final.md — see combined guide above -->",
        ),
        (
            '<details>\n<summary>TOGAF 10 APEX v4 Peer Reviewed</summary>\n<iframe src="TOGAF10_APEX_v4_PeerReviewed.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="TOGAF10_APEX_v4_PeerReviewed.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            "<!-- v4 Peer Reviewed merged into APEX_EA_Final.md — see combined guide above -->",
        ),
    ],
    "docs/coding-tools/claude/index.md": [
        (
            '<details>\n<summary>Module 2 — Claude API &amp; SDK</summary>\n<iframe src="Module_2_Claude_API_SDK.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="Module_2_Claude_API_SDK.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block(
                "Module 2 — Claude API &amp; SDK",
                "./claude-api-mastery",
                "Claude API Mastery Guide (replaces PDF module)",
            ),
        ),
    ],
    "docs/interview-prep/index.md": [
        (
            '<details>\n<summary>EY AI Architect Interview Guide</summary>\n<iframe src="EY_AI_Architect_Interview_Guide.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="EY_AI_Architect_Interview_Guide.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block(
                "EY AI Architect &amp; Consultant — Interview &amp; ECC AI-First Guide",
                "./EY_AI_Architect_Interview_Guide_1",
            ),
        ),
    ],
    "docs/ai-development/testing/index.md": [
        (
            '<details>\n<summary>AI Agent Evaluation Framework — AWS Bedrock AgentCore \xb7 Strands \xb7 Arize Phoenix</summary>\n<iframe src="AI%20Agent%20Evaluation%20Framework%20%E2%80%94%20AWS%20Bedrock%20AgentCore%20%C2%B7%20Strands%20%C2%B7%20Arize%20Phoenix.pdf" width="100%" height="800px" frameborder="0"></iframe>\n<p><a href="AI%20Agent%20Evaluation%20Framework%20%E2%80%94%20AWS%20Bedrock%20AgentCore%20%C2%B7%20Strands%20%C2%B7%20Arize%20Phoenix.pdf" target="_blank">Open in new tab ↗</a></p>\n</details>',
            link_block(
                "AI Agent Evaluation Framework — AWS Bedrock AgentCore \xb7 Strands \xb7 Arize Phoenix",
                "./AI_Agent_Evaluation_Framework_Guide",
            ),
        ),
    ],
}

for fpath, replacements in fixes.items():
    with open(fpath, encoding="utf-8", errors="replace") as f:
        raw = f.read()
    content = raw.replace("\r\n", "\n")
    changed = False
    for old, new in replacements:
        old_n = old.replace("\r\n", "\n")
        if old_n in content:
            content = content.replace(old_n, new)
            print(f"  fixed: {old[:55]!r}...")
            changed = True
        else:
            print(f"  MISS : {old[:55]!r}...")
    if changed:
        with open(fpath, "w", encoding="utf-8", newline="\n") as f:
            f.write(content)
        print(f"  => saved {fpath}\n")
    else:
        print(f"  => no changes {fpath}\n")

print("Done.")
