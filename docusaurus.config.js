// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Recursively copies all non-markdown assets from docs/ into the build output
// so that PDF/HTML iframes resolve correctly at runtime.
function copyDocsAssetsPlugin() {
  return {
    name: 'copy-docs-assets',
    async postBuild({siteDir, outDir}) {
      const docsDir = path.join(siteDir, 'docs');
      const SKIP_EXT = /\.(md|mdx)$/i;

      function copyDir(src, dest) {
        const entries = fs.readdirSync(src, {withFileTypes: true});
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          if (entry.isDirectory()) {
            fs.mkdirSync(destPath, {recursive: true});
            copyDir(srcPath, destPath);
          } else if (!SKIP_EXT.test(entry.name)) {
            fs.mkdirSync(dest, {recursive: true});
            fs.copyFileSync(srcPath, destPath);
          }
        }
      }

      copyDir(docsDir, outDir);
    },
  };
}

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

  plugins: [copyDocsAssetsPlugin],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexBlog: false,
      },
    ],
  ],

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
