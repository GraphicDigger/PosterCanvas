import { useCallback } from 'react';
import { useTable } from '../context/TableContext';

export const useCheckedRows = () => {
  const { state, dispatch, config, data } = useTable();

  // Выбор одной строки
  const checkRow = useCallback((rowId) => {
    if (!config.checkable) {return;}

    dispatch({ type: 'TOGGLE_ROW_CHECKED', payload: rowId });

    if (config.onRowCheck) {
      const newCheckedRows = new Set(state.checkedRows);
      if (newCheckedRows.has(rowId)) {
        newCheckedRows.delete(rowId);
      } else {
        newCheckedRows.add(rowId);
      }
      config.onRowCheck(Array.from(newCheckedRows));
    }
  }, [config, state.checkedRows, dispatch]);

  // Выбор всех строк
  const checkAllRows = useCallback(() => {
    if (!config.checkable) {return;}

    const allRowIds = data.map(row => row.id).filter(Boolean);
    dispatch({ type: 'CHECK_ALL_ROWS', payload: allRowIds });

    if (config.onRowCheck) {
      config.onRowCheck(allRowIds);
    }
  }, [config, data, dispatch]);

  // Очистка выбора
  const clearCheckedRows = useCallback(() => {
    if (!config.checkable) {return;}

    dispatch({ type: 'CLEAR_CHECKED_ROWS' });

    if (config.onRowCheck) {
      config.onRowCheck([]);
    }
  }, [config, dispatch]);

  // Установка конкретного набора выбранных строк
  const setCheckedRows = useCallback((rowIds) => {
    if (!config.checkable) {return;}

    const checkedSet = new Set(rowIds);
    dispatch({ type: 'SET_CHECKED_ROWS', payload: checkedSet });

    if (config.onRowCheck) {
      config.onRowCheck(rowIds);
    }
  }, [config, dispatch]);

  // Проверка выбрана ли строка
  const isRowChecked = useCallback((rowId) => {
    return state.checkedRows.has(rowId);
  }, [state.checkedRows]);

  // Получение выбранных данных
  const getCheckedData = useCallback(() => {
    return data.filter(row => state.checkedRows.has(row.id));
  }, [data, state.checkedRows]);

  return {
    // Состояние
    checkedRow: state.checkedRow,
    checkedRows: Array.from(state.checkedRows),
    checkedCount: state.checkedRows.size,
    hasChecked: state.checkedRows.size > 0,
    isAllChecked: data.length > 0 && state.checkedRows.size === data.length,

    // Методы
    checkRow,
    checkAllRows,
    clearCheckedRows,
    setCheckedRows,
    isRowChecked,
    getCheckedData,
  };
};
