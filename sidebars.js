// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Home',
    },
    {
      type: 'category',
      label: 'AI Foundations',
      items: [
        'ai-foundations/index',
        {
          type: 'category',
          label: 'Agentic AI Landing Zone (Complete Platform)',
          items: [
            'ai-foundations/agentic_ai_landing_zone_architecture',
            'ai-foundations/agentic_ai_landing_zone_business_layer',
            'ai-foundations/agentic_ai_landing_zone_eu_ai_act',
            'ai-foundations/agentic_ai_landing_zone_playbooks',
            'ai-foundations/agentic_ai_landing_zone_platform_layer',
            'ai-foundations/agentic_ai_landing_zone_context_engineering',
            'ai-foundations/agentic_ai_landing_zone_evaluation',
            'ai-foundations/agentic_ai_landing_zone_multiagent',
            'ai-foundations/agentic_ai_landing_zone_visual_guide',
            'ai-foundations/agentic_ai_landing_zone_memory_architecture',
            'ai-foundations/agentic_ai_landing_zone_tier3_complete',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Agentic AI',
      items: [
        'agentic-systems/index',
        {
          type: 'category',
          label: 'Platform',
          items: ['agentic-systems/platform/index'],
        },
        {
          type: 'category',
          label: 'Memory',
          items: ['agentic-systems/memory/index'],
        },
        {
          type: 'category',
          label: 'Agent Skills',
          items: ['agentic-systems/skill/index'],
        },
        {
          type: 'category',
          label: 'Configuration',
          items: ['agentic-systems/config/index'],
        },
        {
          type: 'category',
          label: 'Harness',
          items: ['agentic-systems/harness/index'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'ai-security-governance/index',
        {
          type: 'category',
          label: 'AI Security',
          items: ['ai-security-governance/security/index'],
        },
        {
          type: 'category',
          label: 'DeepMind Control',
          items: ['ai-security-governance/deep-mind/index'],
        },
        {
          type: 'category',
          label: 'Policy & Authorization',
          items: ['ai-security-governance/policy/index'],
        },
      ],
    },
    {
      type: 'category',
      label: 'Coding Tools',
      items: [
        'coding-tools/index',
        {
          type: 'category',
          label: 'Claude',
          items: [
            'coding-tools/claude/index',
            'coding-tools/claude/claude-models-2026',
            'coding-tools/claude/claude-api-mastery',
            'coding-tools/claude/claude-code-complete-2026',
            'coding-tools/claude/claude-agent-sdk-production',
            'coding-tools/claude/prompt-engineering-claude-4',
            'coding-tools/claude/claude-enterprise-2026',
            'coding-tools/claude/constitutional-ai-safety-2026',
            'coding-tools/claude/mcp-deep-guide',
            'coding-tools/claude/ccaf-exam-prep-complete',
            'coding-tools/claude/ruflo-agentic-ai-guide',
          ],
        },
        {
          type: 'category',
          label: 'GitHub Copilot',
          items: [
            'coding-tools/github-copilot/index',
            'coding-tools/github-copilot/github-copilot-zero-to-hero',
            'coding-tools/github-copilot/git-github-platform-engineering-handbook',
          ],
        },
        {
          type: 'category',
          label: 'Code Review',
          items: ['coding-tools/code-review/index'],
        },
        {
          type: 'category',
          label: 'Enterprise AI Architect',
          items: [
            'coding-tools/enterprise-ai-architect/index',
            'coding-tools/enterprise-ai-architect/enterprise-ai-architect-foundations',
            'coding-tools/enterprise-ai-architect/enterprise-ai-architecture-patterns',
            'coding-tools/enterprise-ai-architect/enterprise-ai-governance-compliance',
            'coding-tools/enterprise-ai-architect/enterprise-ai-skills-assessment',
            'coding-tools/enterprise-ai-architect/agentic-ai-security-identity',
            'coding-tools/enterprise-ai-architect/agent-interoperability-orchestration',
            'coding-tools/enterprise-ai-architect/machine-readable-ea',
            'coding-tools/enterprise-ai-architect/agentic-ai-security-guardrails',
            'coding-tools/enterprise-ai-architect/agentic-ai-reliability-observability-governance',
            'coding-tools/enterprise-ai-architect/ai-harness-architecture-orchestration',
            'coding-tools/enterprise-ai-architect/mcp-a2a-protocol-deep-dive',
            'coding-tools/enterprise-ai-architect/agent-memory-planning-architecture',
            'coding-tools/enterprise-ai-architect/agent-communication-identity-gateway',
            'coding-tools/enterprise-ai-architect/enterprise-agent-reference-architectures',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'AI Protocols',
      items: [
        'ai-protocols/index',
        {
          type: 'category',
          label: 'Auth & Identity',
          items: [
            'ai-protocols/auth/index',
            'ai-protocols/auth/entra-3lo-agent-auth-standards-architecture',
            'ai-protocols/auth/entra-3lo-agent-auth-implementation',
            'ai-protocols/auth/entra-3lo-agent-auth-security-review',
            'ai-protocols/auth/entra-3lo-agent-auth-multiagent-compliance',
            'ai-protocols/auth/tool-authentication-connectors',
            'ai-protocols/auth/agent-identity-entra-vs-awsagentcore',
          ],
        },
        {
          type: 'category',
          label: 'Protocol Standards',
          items: ['ai-protocols/protocol/index'],
        },
        {
          type: 'category',
          label: 'MCP',
          items: [
            'ai-protocols/mcp/index',
            'ai-protocols/mcp/MCP_Deep_Research_2026',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Cloud Platforms',
      items: [
        'cloud-platforms/index',
        {
          type: 'category',
          label: 'AWS AgentCore',
          items: [
            'cloud-platforms/aws/index',
            'cloud-platforms/aws/bedrock-agentcore-code-interpreter-architecture',
          ],
        },
        {
          type: 'category',
          label: 'Azure',
          items: ['cloud-platforms/azure/index'],
        },
        {
          type: 'category',
          label: 'AI Gateway',
          items: [
            'cloud-platforms/ai-gateway/index',
            'cloud-platforms/ai-gateway/kong-ai-gateway-guide',
            'cloud-platforms/ai-gateway/kong-ai-gateway-auth-guide',
            'cloud-platforms/ai-gateway/kong-entra-id-integration',
          ],
        },
        {
          type: 'category',
          label: 'Kubernetes',
          items: ['cloud-platforms/kubernetes/index'],
        },
        {
          type: 'category',
          label: 'Infrastructure as Code',
          items: [
            'cloud-platforms/iac/index',
            {
              type: 'category',
              label: 'Terraform',
              items: [
                'cloud-platforms/iac/terraform/index',
                'cloud-platforms/iac/terraform/terraform-mastery-guide',
                'cloud-platforms/iac/terraform/ai-assisted-iac-mastery',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Knowledge',
      items: [
        'knowledge-engineering/index',
        {
          type: 'category',
          label: 'Data Architecture',
          items: ['knowledge-engineering/data/index'],
        },
        {
          type: 'category',
          label: 'Knowledge & RAG',
          items: ['knowledge-engineering/knowledge/index'],
        },
        {
          type: 'category',
          label: 'Industry Knowledge Systems',
          items: [
            'knowledge-engineering/industry-practices/index',
            'knowledge-engineering/industry-practices/tech-companies',
            'knowledge-engineering/industry-practices/consulting-firms',
            'knowledge-engineering/industry-practices/governance-rai',
            'knowledge-engineering/industry-practices/grounding',
            'knowledge-engineering/industry-practices/evaluation',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Enterprise Architecture',
      items: [
        'enterprise-architecture/index',
        {
          type: 'category',
          label: 'Strategy',
          items: ['enterprise-architecture/strategy/index'],
        },
        {
          type: 'category',
          label: 'Frameworks',
          items: ['enterprise-architecture/framework/index'],
        },
        {
          type: 'category',
          label: 'Processes',
          items: [
            'enterprise-architecture/process/index',
            'enterprise-architecture/process/ai-solution-lifecycle-deliverables',
          ],
        },
        {
          type: 'category',
          label: 'Best Practices',
          items: ['enterprise-architecture/best-practices/index'],
        },
        {
          type: 'category',
          label: 'ARB',
          items: ['enterprise-architecture/arb/index'],
        },
        {
          type: 'category',
          label: 'Specialization',
          items: ['enterprise-architecture/specialization/index'],
        },
      ],
    },
    {
      type: 'category',
      label: 'AI Development',
      items: [
        'ai-development/index',
        {
          type: 'category',
          label: 'AIDLC',
          items: ['ai-development/aidlc/index'],
        },
        {
          type: 'category',
          label: 'Testing & Evaluation',
          items: [
            'ai-development/testing/index',
            'ai-development/testing/AI_Agent_Evaluation_Framework_Guide',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'AI Economics',
      items: [
        'ai-economics/index',
        'ai-economics/ai-value-creators-synthesis',
        'ai-economics/ai-coding-agents-2026',
      ],
    },
    {
      type: 'category',
      label: 'Use Cases',
      items: [
        'ai-usecases/index',
        'ai-usecases/EU_Banking_AI_Evaluation_Compliance_Guide',
      ],
    },
    {
      type: 'category',
      label: 'AI-First Enterprise',
      items: [
        'ai-first-enterprise/index',
        'ai-first-enterprise/ai-first-to-ai-native',
      ],
    },
    {
      type: 'category',
      label: 'Sovereign & Constitutional AI',
      items: [
        'sovereign-constitutional-ai/index',
        'sovereign-constitutional-ai/sovereign-ai-foundations',
        'sovereign-constitutional-ai/constitutional-ai-engineering',
        'sovereign-constitutional-ai/rai-operating-model',
        'sovereign-constitutional-ai/ai-alignment-control',
        'sovereign-constitutional-ai/ai-governance-operating-model',
        'sovereign-constitutional-ai/ai-risk-taxonomy',
        'sovereign-constitutional-ai/ai-safety-framework',
        'sovereign-constitutional-ai/ai-assurance-audit-architecture',
        'sovereign-constitutional-ai/constitutional-agent-architecture',
        'sovereign-constitutional-ai/policy-as-code-framework',
        'sovereign-constitutional-ai/democratic-ai-public-interest',
        'sovereign-constitutional-ai/sovereign-ai-roadmap-maturity',
      ],
    },
    {
      type: 'category',
      label: 'Agentic UI & Applications',
      items: [
        'agentic-ui/index',
        'agentic-ui/evolution-human-ai-interfaces',
        'agentic-ui/agui-standards-landscape',
        'agentic-ui/enterprise-reference-architecture',
        'agentic-ui/application-lifecycle',
        'agentic-ui/reliability-engineering',
        'agentic-ui/scalability-engineering',
        'agentic-ui/performance-engineering',
        'agentic-ui/security-architecture',
        'agentic-ui/context-engineering',
        'agentic-ui/agent-ux-patterns',
        'agentic-ui/governance',
        'agentic-ui/responsible-ai',
        'agentic-ui/evaluation-framework',
        'agentic-ui/observability',
        'agentic-ui/devsecops',
        'agentic-ui/anti-patterns',
        'agentic-ui/industry-reference-architectures',
        'agentic-ui/decision-frameworks',
        'agentic-ui/future-outlook',
        'agentic-ui/identity-auth-architecture',
      ],
    },
    {
      type: 'category',
      label: 'Interview Prep',
      items: [
        'interview-prep/index',
        {
          type: 'category',
          label: 'EA Interviews',
          items: ['interview-prep/ea/index'],
        },
        'interview-prep/Enterprise_Architect_in_the_Age_of_AI',
        'interview-prep/ea-ai-artifacts-and-metrics',
        'interview-prep/EA_Soft_Skills_and_Behaviors',
        'interview-prep/EA_Senior_Interview_Questions',
        'interview-prep/EA_Quality_Resilience_Testing_Interview_Questions',
        'interview-prep/EA_HITL_HOTL_HOOL_Interview_Questions',
      ],
    },
    {
      type: 'category',
      label: 'Cyber Security Architecture',
      items: [
        'cybersec-architect/index',
        'cybersec-architect/evolution',
        'cybersec-architect/enterprise-security-architecture',
        'cybersec-architect/security-domains',
        'cybersec-architect/ai-security',
        'cybersec-architect/agentic-ai-security',
        'cybersec-architect/identity-architecture',
        'cybersec-architect/cloud-security',
        'cybersec-architect/ai-governance',
        'cybersec-architect/security-operations',
        'cybersec-architect/technology-investment',
        'cybersec-architect/ai-investment',
        'cybersec-architect/ea-deliverables',
        'cybersec-architect/security-patterns',
        'cybersec-architect/case-studies',
        'cybersec-architect/emerging-trends',
        'cybersec-architect/usecase-transcript',
      ],
    },
    {
      type: 'category',
      label: 'EA Masterclass',
      items: [
        'ea-masterclass/index',
        'ea-masterclass/module-01-ea-foundations/index',
        'ea-masterclass/module-02-business-acumen/index',
        'ea-masterclass/module-03-proposal-lifecycle/index',
        'ea-masterclass/module-04-technology-investment/index',
        'ea-masterclass/module-05-ai-investment-strategy/index',
        'ea-masterclass/module-06-business-case/index',
        'ea-masterclass/module-07-proposal-writing/index',
        'ea-masterclass/module-08-financial-literacy/index',
        'ea-masterclass/module-09-enterprise-ai-architecture/index',
        'ea-masterclass/module-10-governance/index',
        'ea-masterclass/module-11-executive-communication/index',
        'ea-masterclass/module-12-ai-consulting/index',
        'ea-masterclass/module-13-case-studies/index',
        'ea-masterclass/module-14-mentoring/index',
        'ea-masterclass/module-15-distinguished-architect/index',
      ],
    },
    {
      type: 'doc',
      id: 'soft-skills/index',
      label: 'Soft Skills',
    },
    {
      type: 'category',
      label: 'Workflow Orchestration',
      items: [
        'workflow-orchestration/index',
        {
          type: 'category',
          label: 'Foundations',
          items: [
            'workflow-orchestration/01-executive-summary',
            'workflow-orchestration/02-evolution-timeline',
            'workflow-orchestration/03-workflow-vs-agent-architecture',
          ],
        },
        {
          type: 'category',
          label: 'Platform Deep Dives',
          items: [
            'workflow-orchestration/04-temporal-deep-dive',
            'workflow-orchestration/05-camunda-deep-dive',
          ],
        },
        {
          type: 'category',
          label: 'AI & Agents',
          items: [
            'workflow-orchestration/07-ai-coding-orchestrators',
          ],
        },
        {
          type: 'category',
          label: 'Enterprise Architecture',
          items: [
            'workflow-orchestration/19-reference-architectures',
            'workflow-orchestration/20-decision-matrix',
          ],
        },
        {
          type: 'category',
          label: 'Future',
          items: [
            'workflow-orchestration/21-future-predictions',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Quantum AI',
      link: {type: 'doc', id: 'quantum/index'},
      items: [
        {type: 'doc', id: 'quantum/zero-to-mastery', label: 'Zero to Mastery'},
      ],
    },
    {
      type: 'doc',
      id: 'about',
      label: 'About',
    },
  ],
};

module.exports = sidebars;
