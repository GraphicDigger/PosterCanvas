import { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
);

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {throw new Error('useUserContext must be used inside <UserProvider>');}
  return ctx;
};
