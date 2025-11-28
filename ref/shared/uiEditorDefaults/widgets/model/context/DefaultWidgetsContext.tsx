import { createContext, useContext } from 'react';

export const DefaultWidgetsContext = createContext(null);

export const DefaultWidgetsProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <DefaultWidgetsContext.Provider value={value}>
    {children}
  </DefaultWidgetsContext.Provider>
);

export const useDefaultWidgetsContext = () => {
  const ctx = useContext(DefaultWidgetsContext);
  if (!ctx) {throw new Error('useDefaultWidgetsContext must be used inside <DefaultWidgetsProvider>');}
  return ctx;
};
