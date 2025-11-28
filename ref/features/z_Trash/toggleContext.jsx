import React, { createContext, useContext, useState } from 'react';

const ToggleContext = createContext();

export const ToggleRepliesProvider = ({ children }) => {

  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const toggleReplies = () => setIsRepliesOpen(prev => !prev);
  const openReplies = () => setIsRepliesOpen(true);
  const closeReplies = () => setIsRepliesOpen(false);

  return (
    <ToggleContext.Provider
      value={{
        isRepliesOpen,
        toggleReplies,
        openReplies,
        closeReplies,
      }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggleReplies = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};
