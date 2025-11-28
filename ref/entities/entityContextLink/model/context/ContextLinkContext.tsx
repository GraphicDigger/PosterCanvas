import { createContext, useContext } from 'react';

const ContextLinkContext = createContext(null);

export const ContextLinkProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <ContextLinkContext.Provider value={value}>
    {children}
  </ContextLinkContext.Provider>
);

export const useContextLinkContext = () => {
  const ctx = useContext(ContextLinkContext);
  if (!ctx) {throw new Error('useContextLinkContext must be used inside <ContextLinkProvider>');}
  return ctx;
};
