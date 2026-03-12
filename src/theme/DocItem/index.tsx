import React from 'react';
import DocItem from '@theme-original/DocItem';
import {DocPathProvider} from '../DocPathContext';
import {useEditMode} from '../EditModeContext';
import InlineDocEditor from '../InlineDocEditor';

export default function DocItemWrapper(props: any) {
  const {editMode} = useEditMode();

  // Derive the source path from the DocItem props instead of useDoc()
  const rawSource: string =
    (props as any)?.content?.metadata?.source ??
    (props as any)?.metadata?.source ??
    '';

  const sourcePath =
    (rawSource && rawSource.replace(/^@site\/?/, '')) || 'docs/intro.md';

  return (
    <DocPathProvider value={{docPath: sourcePath}}>
      {editMode ? (
        <InlineDocEditor docPath={sourcePath} />
      ) : (
        <DocItem {...props} />
      )}
    </DocPathProvider>
  );
}

