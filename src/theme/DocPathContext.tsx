import React, {createContext, useContext} from 'react';

type DocPathContextValue = {
  docPath: string;
};

const DocPathContext = createContext<DocPathContextValue | undefined>(undefined);

export const DocPathProvider = DocPathContext.Provider;

export function useDocPath(): DocPathContextValue | undefined {
  return useContext(DocPathContext);
}

