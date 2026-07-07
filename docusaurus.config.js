// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Knowledge Docs',
  tagline: 'AI, Agentic AI & Enterprise Architecture Knowledge Base',
  favicon: 'img/favicon.ico',

  url: 'https://sreeshnair84.github.io',
  baseUrl: '/knowledge-docs/',

  organizationName: 'sreeshnair84',
  projectName: 'knowledge-docs',

  onBrokenLinks: 'warn',
  onBrokenAnchors: 'warn',

  markdown: {
    mermaid: true,
    format: 'md',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/sreeshnair84/knowledge-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Knowledge Docs',
      logo: {
        alt: 'Knowledge Docs',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/sreeshnair84/knowledge-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [{ label: 'Home', to: '/' }],
        },
        {
          title: 'Community',
          items: [{ label: 'GitHub', href: 'https://github.com/sreeshnair84/knowledge-docs' }],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Knowledge Docs. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
