import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

type SectionCard = {
  title: string;
  emoji: string;
  description: string;
  link: string;
  linkLabel: string;
};

const sections: SectionCard[] = [
  {
    title: 'General',
    emoji: '📖',
    description:
      'High-level guides for all PromptBio modules — getting started, managing data, running analyses, and more.',
    link: '/docs/general/Home/getting-started',
    linkLabel: 'Get Started',
  },
  {
    title: 'Technical',
    emoji: '⚙️',
    description:
      'In-depth technical documentation including REST API reference, SDK guide, and architecture overview for developers.',
    link: '/docs/technical',
    linkLabel: 'Read Docs',
  },
  {
    title: 'Workbook',
    emoji: '🧬',
    description:
      'Step-by-step tutorials using real biological datasets — from differential expression to multi-omics integration.',
    link: '/docs/workbook',
    linkLabel: 'Start Learning',
  },
];

type ModuleBadge = {
  name: string;
  status: 'Stable' | 'Beta' | 'In Progress';
  description: string;
  link: string;
};

const modules: ModuleBadge[] = [
  {name: 'MLGenie', status: 'Stable', description: 'ML classification & regression', link: '/docs/general/MLGenie/mlgenie-overview'},
  {name: 'MarkerGenie', status: 'Stable', description: 'Biomarker discovery', link: '/docs/general/MarkerGenie/markergenie-overview'},
  {name: 'NotebookGenie', status: 'Beta', description: 'Jupyter notebook generation', link: '/docs/general/NotebookGenie/notebookgenie-overview'},
  {name: 'Omics', status: 'Stable', description: 'Multi-omics integration', link: '/docs/general/Omics/omics-overview'},
  {name: 'Workflow', status: 'In Progress', description: 'Automated pipelines', link: '/docs/general/Workflow/workflow-overview'},
];

const statusColor: Record<string, string> = {
  Stable: 'var(--ifm-color-primary)',
  Beta: '#e8a838',
  'In Progress': '#9b59b6',
};

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/general/Home/getting-started">
            Get Started
          </Link>
          <Link className="button button--outline button--secondary button--lg" to="/docs/intro">
            Browse All Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

function SectionCards() {
  return (
    <section className={styles.sectionCards}>
      <div className="container">
        <div className="row">
          {sections.map((s) => (
            <div key={s.title} className="col col--4">
              <div className={styles.card}>
                <div className={styles.cardEmoji}>{s.emoji}</div>
                <Heading as="h3">{s.title}</Heading>
                <p>{s.description}</p>
                <Link className="button button--primary button--sm" to={s.link}>
                  {s.linkLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModuleStatus() {
  return (
    <section className={styles.moduleSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>Module Status</Heading>
        <div className={styles.moduleGrid}>
          {modules.map((m) => (
            <Link key={m.name} to={m.link} className={styles.moduleCard}>
              <div className={styles.moduleHeader}>
                <span className={styles.moduleName}>{m.name}</span>
                <span
                  className={styles.moduleBadge}
                  style={{backgroundColor: statusColor[m.status]}}
                >
                  {m.status}
                </span>
              </div>
              <p className={styles.moduleDesc}>{m.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="PromptBio Wiki — AI-powered biological data analysis platform documentation">
      <HomepageHeader />
      <main>
        <SectionCards />
        <ModuleStatus />
      </main>
    </Layout>
  );
}
