// Основной хук, который объединяет все остальные хуки
import { useTable as useTableContext } from '../context/TableContext';
import { useCheckedRows } from './useCheckedRows';
import { useTableSorting } from './useTableSorting';
import { useTableEditing } from './useTableEditing';
import { useRowState } from './useRowState';

export const useTable = () => {
  const context = useTableContext();
  const checkedRows = useCheckedRows();
  const sorting = useTableSorting();
  const editing = useTableEditing();
  const rowState = useRowState();

  return {
    // Базовый контекст
    ...context,

    // Функциональность выбора
    checkedRows,

    // Функциональность сортировки
    sorting,

    // Функциональность редактирования
    editing,

    // Функциональность состояния строки
    rowState,
  };
};

// Переэкспорт для удобства
export { useCheckedRows, useTableSorting, useTableEditing, useRowState };
