import { createContext, useContext } from 'react';

const EntityManagePanelContext = createContext(null);

export const EntityManagePanelProvider = ({ value, children }) => (
  <EntityManagePanelContext.Provider value={value}>
    {children}
  </EntityManagePanelContext.Provider>
);

export const useEntityManagePanelContext = () => {
  const ctx = useContext(EntityManagePanelContext);
  if (!ctx) {throw new Error('useEntityManagePanelContext must be used inside <EntityManagePanelProvider>');}
  return ctx;
};
