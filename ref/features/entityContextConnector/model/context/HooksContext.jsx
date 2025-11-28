import { createContext, useContext } from 'react';

const EntityContextConnectorContext = createContext(null);

export const EntityContextConnectorProvider = ({ value, children }) => (
  <EntityContextConnectorContext.Provider value={value}>
    {children}
  </EntityContextConnectorContext.Provider>
);

export const useEntityContextConnectorContext = () => {
  const ctx = useContext(EntityContextConnectorContext);
  if (!ctx) {throw new Error('useEntityContextConnectorContext must be used inside <EntityContextConnectorProvider>');}
  return ctx;
};
