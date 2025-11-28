import React, { createContext, useContext, useReducer, useMemo } from 'react';

const TableContext = createContext(null);

// Reducer для управления состоянием таблицы
const tableReducer = (state, action) => {
  switch (action.type) {
  case 'SET_CHECKED_ROWS':
    return { ...state, checkedRows: action.payload };

  case 'TOGGLE_ROW_CHECKED':
    const newCheckedRows = new Set(state.checkedRows);
    if (newCheckedRows.has(action.payload)) {
      newCheckedRows.delete(action.payload);
    } else {
      newCheckedRows.add(action.payload);
    }
    return { ...state, checkedRows: newCheckedRows };

  case 'CHECK_ALL_ROWS':
    return {
      ...state,
      checkedRows: new Set(action.payload),
    };

  case 'CLEAR_CHECKED_ROWS':
    return { ...state, checkedRows: new Set() };

  case 'SET_EDITING_CELL':
    return { ...state, editingCell: action.payload };

  case 'SET_SORTING':
    return { ...state, sorting: action.payload };

  case 'SET_HOVERED_ROW':
    return { ...state, hoveredRow: action.payload };

  case 'SET_FOCUSED_ROW':
    return { ...state, focusedRow: action.payload };

  case 'SET_FOCUSED_CELL':
    return { ...state, focusedCell: action.payload };

  default:
    return state;
  }
};

// Начальное состояние
const initialState = {
  sorting: { column: null, direction: 'asc' },
  //Row state
  hoveredRow: null,
  focusedRow: null,
  checkedRows: new Set(),
  //Cell state
  focusedCell: null,
  editingCell: null,
};

export const TableProvider = ({ children, config, data, columns }) => {
  const [state, dispatch] = useReducer(tableReducer, initialState);

  const normalizedColumns = useMemo(() => {
    if (!config?.checkable) {return columns;}
    return [
      {
        key: '__select',
        title: '',
        type: 'selection',
        width: 48,
      },
      ...columns,
    ];
  }, [columns, config]);

  const value = useMemo(() => ({
    state,
    dispatch,
    config,
    data,
    columns: normalizedColumns,
    // Вычисляемые свойства
    hasChecked: state.checkedRows.size > 0,
    checkedCount: state.checkedRows.size,
    isAllChecked: data.length > 0 && state.checkedRows.size === data.length,

    isSorted: !!state.sorting.column,
  }), [state, config, data, normalizedColumns]);

  return (
    <TableContext.Provider value={value}>
      {children}
    </TableContext.Provider>
  );
};

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within TableProvider');
  }
  return context;
};
