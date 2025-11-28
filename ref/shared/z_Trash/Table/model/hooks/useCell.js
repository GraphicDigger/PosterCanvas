import { useCellEdit } from '../context/CellEditContext';
import { useMemo, useCallback } from 'react';


export const useCell = (cellId) => {
  const { editingCellId, startEditing, stopEditing } = useCellEdit();
  const isEditing = useMemo(() => editingCellId === cellId, [editingCellId, cellId]);

  const handleDoubleClick = useCallback(() => {
    startEditing(cellId);
  }, [cellId, startEditing]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter') {
      // Здесь можно добавить логику сохранения значения
      stopEditing();
    } else if (event.key === 'Escape') {
      stopEditing();
    }
  }, [stopEditing]);

  const handleBlur = useCallback(() => {
    // Здесь также можно добавить логику сохранения значения, если нужно
    stopEditing();
  }, [stopEditing]);

  return {
    tableCellProps: {
      onDoubleClick: handleDoubleClick,
      focused: isEditing,
    },
    tableTextProps: {
      editable: isEditing,
      onKeyDown: handleKeyDown,
      onBlur: handleBlur,
    },
  };
};
