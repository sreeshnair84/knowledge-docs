// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';
import path from 'path';
import fs from 'fs';
import {fileURLToPath} from 'url';
import {createRequire} from 'module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// Recursively copies all non-markdown assets from docs/ into the build output
// so that PDF/HTML iframes resolve correctly at runtime.
// Skips hidden directories (e.g. .claude) to avoid leaking dev config.
function copyDocsAssetsPlugin() {
  return {
    name: 'copy-docs-assets',
    async postBuild({siteDir, outDir}) {
      const docsDir = path.join(siteDir, 'docs');
      const SKIP_EXT = /\.(md|mdx)$/i;

      function copyDir(src, dest) {
        const entries = fs.readdirSync(src, {withFileTypes: true});
        for (const entry of entries) {
          if (entry.name.startsWith('.')) continue; // skip hidden dirs/files
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

  plugins: [
    copyDocsAssetsPlugin,
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          {tagName: 'link', rel: 'icon', href: '/knowledge-docs/img/favicon.ico'},
          {tagName: 'link', rel: 'manifest', href: '/knowledge-docs/manifest.json'},
          {tagName: 'meta', name: 'theme-color', content: '#0ea5e9'},
          {tagName: 'meta', name: 'mobile-web-app-capable', content: 'yes'},
          {tagName: 'meta', name: 'apple-mobile-web-app-capable', content: 'yes'},
          {tagName: 'meta', name: 'apple-mobile-web-app-status-bar-style', content: 'default'},
          {tagName: 'meta', name: 'apple-mobile-web-app-title', content: 'Knowledge Docs'},
        ],
      },
    ],
  ],

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        indexBlog: false,
        docsRouteBasePath: '/',
      }),
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
