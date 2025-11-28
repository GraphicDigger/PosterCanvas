import { createContext, useContext } from 'react';

const ChatContext = createContext(null);

export const ChatProvider = ({ value, children }: { value: any, children: React.ReactNode }) => (
  <ChatContext.Provider value={value}>
    {children}
  </ChatContext.Provider>
);

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {throw new Error('useChatContext must be used inside <ChatProvider>');}
  return ctx;
};
