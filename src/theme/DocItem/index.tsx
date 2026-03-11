import React from 'react';
import DocItem from '@theme-original/DocItem';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import {DocPathProvider} from '../DocPathContext';

export default function DocItemWrapper(props: any) {
  const {metadata} = useDoc();
  // source can be e.g. '@site/docs/intro.md' or 'docs/intro.md'
  const rawSource = metadata.source ?? '';
  const sourcePath = rawSource.replace(/^@site\/?/, '') || 'docs/intro.md';

  return (
    <DocPathProvider value={{docPath: sourcePath}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '0.5rem',
        }}>
        <a
          href={`/admin?path=${encodeURIComponent(sourcePath)}`}
          style={{
            fontSize: '0.8rem',
            padding: '0.25rem 0.6rem',
            borderRadius: 4,
            border: '1px solid #ccc',
            textDecoration: 'none',
          }}>
          Edit this page
        </a>
      </div>
      <DocItem {...props} />
    </DocPathProvider>
  );
}

