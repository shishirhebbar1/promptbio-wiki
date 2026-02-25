import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/promptbio-wiki/__docusaurus/debug',
    component: ComponentCreator('/promptbio-wiki/__docusaurus/debug', 'a62'),
    exact: true
  },
  {
    path: '/promptbio-wiki/__docusaurus/debug/config',
    component: ComponentCreator('/promptbio-wiki/__docusaurus/debug/config', '839'),
    exact: true
  },
  {
    path: '/promptbio-wiki/__docusaurus/debug/content',
    component: ComponentCreator('/promptbio-wiki/__docusaurus/debug/content', 'da1'),
    exact: true
  },
  {
    path: '/promptbio-wiki/__docusaurus/debug/globalData',
    component: ComponentCreator('/promptbio-wiki/__docusaurus/debug/globalData', '59b'),
    exact: true
  },
  {
    path: '/promptbio-wiki/__docusaurus/debug/metadata',
    component: ComponentCreator('/promptbio-wiki/__docusaurus/debug/metadata', 'af6'),
    exact: true
  },
  {
    path: '/promptbio-wiki/__docusaurus/debug/registry',
    component: ComponentCreator('/promptbio-wiki/__docusaurus/debug/registry', '3e7'),
    exact: true
  },
  {
    path: '/promptbio-wiki/__docusaurus/debug/routes',
    component: ComponentCreator('/promptbio-wiki/__docusaurus/debug/routes', 'bab'),
    exact: true
  },
  {
    path: '/promptbio-wiki/docs',
    component: ComponentCreator('/promptbio-wiki/docs', '5cc'),
    routes: [
      {
        path: '/promptbio-wiki/docs',
        component: ComponentCreator('/promptbio-wiki/docs', '46b'),
        routes: [
          {
            path: '/promptbio-wiki/docs',
            component: ComponentCreator('/promptbio-wiki/docs', 'f92'),
            routes: [
              {
                path: '/promptbio-wiki/docs/general',
                component: ComponentCreator('/promptbio-wiki/docs/general', '53c'),
                exact: true
              },
              {
                path: '/promptbio-wiki/docs/general/Analysis/comparative-analysis',
                component: ComponentCreator('/promptbio-wiki/docs/general/Analysis/comparative-analysis', '8cf'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/Analysis/differential-analysis',
                component: ComponentCreator('/promptbio-wiki/docs/general/Analysis/differential-analysis', 'e7d'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/Analysis/functional-enrichment',
                component: ComponentCreator('/promptbio-wiki/docs/general/Analysis/functional-enrichment', '98c'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/Analysis/multi-group-comparison',
                component: ComponentCreator('/promptbio-wiki/docs/general/Analysis/multi-group-comparison', '480'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/Analysis/single-cell-clustering',
                component: ComponentCreator('/promptbio-wiki/docs/general/Analysis/single-cell-clustering', '07b'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/Data/data-overview',
                component: ComponentCreator('/promptbio-wiki/docs/general/Data/data-overview', '2fd'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/Home/getting-started',
                component: ComponentCreator('/promptbio-wiki/docs/general/Home/getting-started', '2c1'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/MarkerGenie/markergenie-overview',
                component: ComponentCreator('/promptbio-wiki/docs/general/MarkerGenie/markergenie-overview', 'f08'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/MLGenie/mlgenie-overview',
                component: ComponentCreator('/promptbio-wiki/docs/general/MLGenie/mlgenie-overview', '931'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/NotebookGenie/notebookgenie-overview',
                component: ComponentCreator('/promptbio-wiki/docs/general/NotebookGenie/notebookgenie-overview', 'd02'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/Omics/omics-overview',
                component: ComponentCreator('/promptbio-wiki/docs/general/Omics/omics-overview', 'a44'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/Project/project-overview',
                component: ComponentCreator('/promptbio-wiki/docs/general/Project/project-overview', '4ec'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/general/Workflow/workflow-overview',
                component: ComponentCreator('/promptbio-wiki/docs/general/Workflow/workflow-overview', 'd42'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/intro',
                component: ComponentCreator('/promptbio-wiki/docs/intro', '388'),
                exact: true,
                sidebar: "generalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/technical',
                component: ComponentCreator('/promptbio-wiki/docs/technical', 'ea4'),
                exact: true,
                sidebar: "technicalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/technical/api-reference',
                component: ComponentCreator('/promptbio-wiki/docs/technical/api-reference', 'fe8'),
                exact: true,
                sidebar: "technicalSidebar"
              },
              {
                path: '/promptbio-wiki/docs/workbook',
                component: ComponentCreator('/promptbio-wiki/docs/workbook', '9da'),
                exact: true,
                sidebar: "workbookSidebar"
              },
              {
                path: '/promptbio-wiki/docs/workbook/tutorial-differential-analysis',
                component: ComponentCreator('/promptbio-wiki/docs/workbook/tutorial-differential-analysis', '119'),
                exact: true,
                sidebar: "workbookSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
