import { createContext, useContext } from 'react';

const DefaultElementsContext = createContext(null);

export const DefaultElementsProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <DefaultElementsContext.Provider value={value}>
    {children}
  </DefaultElementsContext.Provider>
);

export const useDefaultElementsContext = () => {
  const ctx = useContext(DefaultElementsContext);
  if (!ctx) {throw new Error('useDefaultElementsContext must be used inside <DefaultElementsProvider>');}
  return ctx;
};
