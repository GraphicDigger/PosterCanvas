import { createContext, useContext } from 'react';

const DocumentContext = createContext(null);

export const DocumentProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <DocumentContext.Provider value={value}>
    {children}
  </DocumentContext.Provider>
);

export const useDocumentContext = () => {
  const ctx = useContext(DocumentContext);
  if (!ctx) {throw new Error('useDocumentContext must be used inside <DocumentProvider>');}
  return ctx;
};
