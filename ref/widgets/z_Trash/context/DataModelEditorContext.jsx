import React, { createContext, useContext, useState } from 'react';

const DataModelEditorContext = createContext();

export const DataModelEditorProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const value = {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
  };

  return (
    <DataModelEditorContext.Provider value={value}>
      {children}
    </DataModelEditorContext.Provider>
  );
};

export const useDataModelEditorContext = () => {
  const context = useContext(DataModelEditorContext);
  if (!context) {
    throw new Error('useDataModelEditorContext must be used within DataModelEditorProvider');
  }
  return context;
};
