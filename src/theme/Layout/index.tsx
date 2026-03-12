import React from 'react';
import Layout from '@theme-original/Layout';
import {EditModeProvider} from '../EditModeContext';

export default function LayoutWrapper(props: any) {
  return (
    <EditModeProvider>
      <Layout {...props} />
    </EditModeProvider>
  );
}
