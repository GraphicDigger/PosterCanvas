import React, { createContext, useState, useContext, useCallback } from 'react';

const CellEditContext = createContext(null);


export const useCellEdit = () => {
  const context = useContext(CellEditContext);
  if (!context) {
    throw new Error('useCellEdit must be used within a CellEditProvider');
  }
  return context;
};


export const CellEditProvider = ({ children }) => {
  const [editingCellId, setEditingCellId] = useState(null);

  const startEditing = useCallback((cellId) => {
    setEditingCellId(cellId);
    // console.log(' [CellEditProvider] startEditing', cellId);
  }, []);

  const stopEditing = useCallback(() => {
    setEditingCellId(null);
  }, []);

  const value = {
    editingCellId,
    startEditing,
    stopEditing,
  };

  return (
    <CellEditContext.Provider value={value}>
      {children}
    </CellEditContext.Provider>
  );
};
