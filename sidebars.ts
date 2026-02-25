import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  generalSidebar: [
    {
      type: 'doc',
      id: 'intro',
      label: 'Welcome',
    },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'general/Home/getting-started',
        'general/Project/project-overview',
        'general/Data/data-overview',
      ],
    },
    {
      type: 'category',
      label: 'Analysis',
      collapsed: false,
      items: [
        'general/Analysis/differential-analysis',
        'general/Analysis/comparative-analysis',
        'general/Analysis/functional-enrichment',
        'general/Analysis/multi-group-comparison',
        'general/Analysis/single-cell-clustering',
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      collapsed: false,
      items: [
        'general/MLGenie/mlgenie-overview',
        'general/MarkerGenie/markergenie-overview',
        'general/NotebookGenie/notebookgenie-overview',
        'general/Omics/omics-overview',
        'general/Workflow/workflow-overview',
      ],
    },
  ],

  technicalSidebar: [
    {
      type: 'doc',
      id: 'technical/technical-overview',
      label: 'Technical Overview',
    },
    'technical/api-reference',
  ],

  workbookSidebar: [
    {
      type: 'doc',
      id: 'workbook/workbook-overview',
      label: 'Tutorials Overview',
    },
    {
      type: 'category',
      label: 'Beginner',
      collapsed: false,
      items: [
        'workbook/tutorial-differential-analysis',
      ],
    },
  ],
};

export default sidebars;
