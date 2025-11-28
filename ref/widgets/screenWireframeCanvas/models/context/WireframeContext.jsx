import { createContext, useContext } from 'react';

const WireframeContext = createContext(null);

export const WireframeProvider = ({ value, children }) => (
  <WireframeContext.Provider value={value}>
    {children}
  </WireframeContext.Provider>
);

export const useWireframeContext = () => {
  const ctx = useContext(WireframeContext);
  if (!ctx) {throw new Error('useWireframeContext must be used inside <WireframeProvider>');}
  return ctx;
};
