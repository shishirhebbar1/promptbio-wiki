import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const STORAGE_KEY = 'promptbio-wiki-edit-mode';

type EditModeContextValue = {
  editMode: boolean;
  setEditMode: (value: boolean) => void;
};

const EditModeContext = createContext<EditModeContextValue | undefined>(
  undefined,
);

export function EditModeProvider({children}: {children: React.ReactNode}) {
  const [editMode, setEditModeState] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) setEditModeState(stored === 'true');
    } catch {
      // ignore
    }
  }, []);

  const setEditMode = useCallback((value: boolean) => {
    setEditModeState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, []);

  return (
    <EditModeContext.Provider value={{editMode, setEditMode}}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode(): EditModeContextValue {
  const ctx = useContext(EditModeContext);
  if (ctx === undefined) {
    throw new Error('useEditMode must be used within EditModeProvider');
  }
  return ctx;
}
