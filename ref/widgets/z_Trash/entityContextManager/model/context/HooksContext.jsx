import { createContext, useContext } from 'react';

const EntityContextManagerContext = createContext(null);

export const EntityContextManagerProvider = ({ value, children }) => (
  <EntityContextManagerContext.Provider value={value}>
    {children}
  </EntityContextManagerContext.Provider>
);

export const useEntityContextManagerContext = () => {
  const ctx = useContext(EntityContextManagerContext);
  if (!ctx) {throw new Error('useEntityContextManagerContext must be used inside <EntityContextManagerProvider>');}
  return ctx;
};
