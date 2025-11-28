import { useCallback, useMemo } from 'react';
import { useTable } from '../context/TableContext';

export const useTableSorting = () => {
  const { state, dispatch, config, data } = useTable();

  // Сортировка по колонке
  const sortBy = useCallback((columnKey) => {
    if (!config.sortable) {return;}

    const currentSorting = state.sorting;
    let direction = 'asc';

    // Если кликнули по той же колонке, меняем направление
    if (currentSorting.column === columnKey && currentSorting.direction === 'asc') {
      direction = 'desc';
    } else if (currentSorting.column === columnKey && currentSorting.direction === 'desc') {
      // Третий клик - убираем сортировку
      direction = null;
    }

    const newSorting = direction ? { column: columnKey, direction } : { column: null, direction: 'asc' };

    dispatch({ type: 'SET_SORTING', payload: newSorting });

    if (config.onSort) {
      config.onSort(newSorting);
    }
  }, [state.sorting, config, dispatch]);

  // Установка сортировки программно
  const setSorting = useCallback((column, direction) => {
    if (!config.sortable) {return;}

    const newSorting = { column, direction };
    dispatch({ type: 'SET_SORTING', payload: newSorting });

    if (config.onSort) {
      config.onSort(newSorting);
    }
  }, [config, dispatch]);

  // Очистка сортировки
  const clearSorting = useCallback(() => {
    if (!config.sortable) {return;}

    const newSorting = { column: null, direction: 'asc' };
    dispatch({ type: 'SET_SORTING', payload: newSorting });

    if (config.onSort) {
      config.onSort(newSorting);
    }
  }, [config, dispatch]);

  // Отсортированные данные
  const sortedData = useMemo(() => {
    if (!config.sortable || !state.sorting.column) {
      return data;
    }

    const { column, direction } = state.sorting;

    return [...data].sort((a, b) => {
      let aVal = a[column];
      let bVal = b[column];

      // Обработка разных типов данных
      if (typeof aVal === 'string') {aVal = aVal.toLowerCase();}
      if (typeof bVal === 'string') {bVal = bVal.toLowerCase();}

      if (aVal < bVal) {return direction === 'asc' ? -1 : 1;}
      if (aVal > bVal) {return direction === 'asc' ? 1 : -1;}
      return 0;
    });
  }, [data, state.sorting, config.sortable]);

  // Проверка сортировки по колонке
  const isSortedBy = useCallback((columnKey) => {
    return state.sorting.column === columnKey;
  }, [state.sorting.column]);

  // Получение направления сортировки для колонки
  const getSortDirection = useCallback((columnKey) => {
    return state.sorting.column === columnKey ? state.sorting.direction : null;
  }, [state.sorting]);

  return {
    // Состояние
    sorting: state.sorting,
    isSorted: !!state.sorting.column,
    sortedData,

    // Методы
    sortBy,
    setSorting,
    clearSorting,
    isSortedBy,
    getSortDirection,
  };
};
