import { useCallback } from 'react';
import { useTable } from '../context/TableContext';

export const useRowState = () => {

  const {
    state,
    dispatch,
    config,
  } = useTable();

  const isRowHovered = useCallback((rowId) => {
    if (config.isRowHovered) {
      return config.isRowHovered(rowId);
    }
    return state.hoveredRow === rowId;
  }, [state.hoveredRow, config.isRowHovered]);

  const isRowFocused = useCallback((rowId) => {
    if (config.isRowFocused) {
      return config.isRowFocused(rowId);
    }
    return state.focusedRow === rowId;
  }, [state.focusedRow, config.isRowFocused]);

  const isRowSelected = useCallback((rowId) => {
    if (config.isRowSelected) {
      return config.isRowSelected(rowId);
    }
  }, [config.isRowSelected]);

  const setRowHovered = useCallback((rowId) => {
    dispatch({ type: 'SET_HOVERED_ROW', payload: rowId });

    if (config.onRowHover) {
      config.onRowHover(rowId);
    }
  }, [dispatch, config.onRowHover]);

  const setRowFocused = useCallback((rowId) => {
    dispatch({ type: 'SET_FOCUSED_ROW', payload: rowId });

    if (config.onRowFocus) {
      config.onRowFocus(rowId);
    }
  }, [dispatch, config.onRowFocus]);

  return {
    isRowHovered,
    isRowFocused,
    isRowSelected,
    setRowHovered,
    setRowFocused,
  };
};
