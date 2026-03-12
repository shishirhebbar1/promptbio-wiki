import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'PromptBio Wiki',
  tagline: 'AI-powered biological data analysis platform',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://shishirhebbar1.github.io',
  baseUrl: '/',
  organizationName: 'shishirhebbar1',
  projectName: 'promptbio-wiki',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'PromptBio Wiki',
      logo: {
        alt: 'PromptBio Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'custom-editMode',
          position: 'right',
        },
        {
          type: 'custom-adminLink',
          to: '/admin',
          label: 'Admin',
          position: 'right',
        },
        {
          type: 'docSidebar',
          sidebarId: 'generalSidebar',
          position: 'left',
          label: 'General',
        },
        {
          type: 'docSidebar',
          sidebarId: 'technicalSidebar',
          position: 'left',
          label: 'Technical',
        },
        {
          type: 'docSidebar',
          sidebarId: 'workbookSidebar',
          position: 'left',
          label: 'Workbook',
        },
        {
          href: 'https://app.promptbio.com',
          label: 'Launch App',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {label: 'Getting Started', to: '/docs/general/Home/getting-started'},
            {label: 'API Reference', to: '/docs/technical/api-reference'},
            {label: 'Tutorials', to: '/docs/workbook'},
          ],
        },
        {
          title: 'Modules',
          items: [
            {label: 'MLGenie', to: '/docs/general/MLGenie/mlgenie-overview'},
            {label: 'MarkerGenie', to: '/docs/general/MarkerGenie/markergenie-overview'},
            {label: 'NotebookGenie', to: '/docs/general/NotebookGenie/notebookgenie-overview'},
            {label: 'Omics', to: '/docs/general/Omics/omics-overview'},
          ],
        },
        {
          title: 'PromptBio',
          items: [
            {label: 'Launch App', href: 'https://app.promptbio.com'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} PromptBio. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
