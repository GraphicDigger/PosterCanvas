import { useCallback } from 'react';
import { useTable } from '../context/TableContext';

export const useTableEditing = () => {
  const { state, dispatch, config } = useTable();


  const startEditing = useCallback((cellId, rowId, columnKey) => {
    console.log('🚀 startEditing called:',  { cellId, rowId, columnKey });
    if (!config.editable) {return;}

    const cellData = { cellId, rowId, columnKey };
    dispatch({ type: 'SET_EDITING_CELL', payload: cellData });
  }, [config.editable, dispatch]);


  const stopEditing = useCallback((save = false, newValue = null) => {
    const editingCell = state.editingCell;
    console.log('🛑 stopEditing called:', { save, newValue, editingCell, hasOnEdit: !!config.onEdit });
    if (!editingCell) {return;}

    if (save && config.onEdit && newValue !== null) {
      console.log('📤 Calling onEdit:', { ...editingCell, newValue });
      config.onEdit({
        ...editingCell,
        newValue,
      });
    }

    dispatch({ type: 'SET_EDITING_CELL', payload: null });
  }, [state.editingCell, config.onEdit, dispatch]);


  const cancelEditing = useCallback(() => {
    dispatch({ type: 'SET_EDITING_CELL', payload: null });
  }, [dispatch]);


  // Проверка редактируется ли ячейка
  const isEditing = useCallback((cellId) => {
    return state.editingCell?.cellId === cellId;
  }, [state.editingCell]);


  // Проверка редактируется ли строка
  const isRowEditing = useCallback((rowId) => {
    return state.editingCell?.rowId === rowId;
  }, [state.editingCell]);


  // Установка фокуса на ячейку
  const focusCell = useCallback((cellId, rowId, columnKey) => {
    const cellData = { cellId, rowId, columnKey };
    dispatch({ type: 'SET_FOCUSED_CELL', payload: cellData });
  }, [dispatch]);


  // Снятие фокуса
  const blurCell = useCallback(() => {
    dispatch({ type: 'SET_FOCUSED_CELL', payload: null });
  }, [dispatch]);


  // Проверка сфокусирована ли ячейка
  const isCellFocused = useCallback((cellId) => {
    return state.focusedCell?.cellId === cellId;
  }, [state.focusedCell]);


  // Навигация между ячейками
  const navigateToCell = useCallback((direction, currentCellId) => {
    // Простая реализация навигации
    // В реальном приложении здесь может быть более сложная логика
    console.log(`Navigate ${direction} from ${currentCellId}`);
  }, []);

  return {
    // Состояние
    editingCell: state.editingCell,
    focusedCell: state.focusedCell,
    isEditMode: !!state.editingCell,

    // Методы редактирования
    startEditing,
    stopEditing,
    cancelEditing,
    isEditing,
    isRowEditing,

    // Методы фокуса
    focusCell,
    blurCell,
    isCellFocused,
    navigateToCell,
  };
};
