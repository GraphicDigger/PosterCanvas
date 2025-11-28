import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { TASKS_MODES } from '../constants/workspaceModes';
import {
  setWSTasksMode,
  setWSTasksModes,
  resetWSTasksMode,
  resetWSTasksModes,
  setWSDetailMode,
  setWSStatisticsMode,
  toggleWSTasksListBoard,
  toggleWSTasksDetail,
  toggleWSTasksStatistics,
  toggleWSTasksCalendarGantt,
  selectIsWSTasksListMode,
  selectIsWSTasksBoardMode,
  selectIsWSTasksCalendarMode,
  selectIsWSTasksGanttMode,
  selectIsWSTasksStatisticsMode,
  selectIsWSTasksDetailMode,
} from '../store';


export const useWSTasksMode = () => {
  const dispatch = useDispatch();

  // Селекторы состояний
  const isWSTasksListMode = useSelector(selectIsWSTasksListMode);
  const isWSTasksBoardMode = useSelector(selectIsWSTasksBoardMode);
  const isWSTasksCalendarMode = useSelector(selectIsWSTasksCalendarMode);
  const isWSTasksGanttMode = useSelector(selectIsWSTasksGanttMode);
  const isWSTasksStatisticsMode = useSelector(selectIsWSTasksStatisticsMode);
  const isWSTasksDetailMode = useSelector(selectIsWSTasksDetailMode);

  // Установка нескольких режимов одновременно
  const setMultipleWSTasksModes = useCallback((modes) => {
    dispatch(setWSTasksModes(modes));
  }, [dispatch]);

  // Сброс всех режимов к начальным значениям
  const resetAllWSTasksModes = useCallback(() => {
    dispatch(resetWSTasksModes());
  }, [dispatch]);

  // Установка основных режимов (только один активен)
  const setWSTasksListMode = useCallback(() => {
    dispatch(setWSTasksMode(TASKS_MODES.LIST));
  }, [dispatch]);

  const setWSTasksBoardMode = useCallback(() => {
    dispatch(setWSTasksMode(TASKS_MODES.BOARD));
  }, [dispatch]);

  const setWSTasksCalendarMode = useCallback(() => {
    dispatch(setWSTasksMode(TASKS_MODES.CALENDAR));
  }, [dispatch]);

  const setWSTasksGanttMode = useCallback(() => {
    dispatch(setWSTasksMode(TASKS_MODES.GANTT));
  }, [dispatch]);

  // Установка дополнительных режимов (могут быть активны вместе с основными)
  const setWSTasksDetailMode = useCallback(() => {
    dispatch(setWSDetailMode());
  }, [dispatch]);

  const setWSTasksStatisticsMode = useCallback(() => {
    dispatch(setWSStatisticsMode());
  }, [dispatch]);

  // Сброс конкретных режимов
  const resetWSTasksListMode = useCallback(() => {
    dispatch(resetWSTasksMode(TASKS_MODES.LIST));
  }, [dispatch]);

  const resetWSTasksBoardMode = useCallback(() => {
    dispatch(resetWSTasksMode(TASKS_MODES.BOARD));
  }, [dispatch]);

  const resetWSTasksCalendarMode = useCallback(() => {
    dispatch(resetWSTasksMode(TASKS_MODES.CALENDAR));
  }, [dispatch]);

  const resetWSTasksGanttMode = useCallback(() => {
    dispatch(resetWSTasksMode(TASKS_MODES.GANTT));
  }, [dispatch]);

  const resetWSTasksDetailMode = useCallback(() => {
    dispatch(resetWSTasksMode(TASKS_MODES.DETAIL));
  }, [dispatch]);

  const resetWSTasksStatisticsMode = useCallback(() => {
    dispatch(resetWSTasksMode(TASKS_MODES.STATISTICS));
  }, [dispatch]);

  // Переключение режимов
  const toggleWSTasksListBoardMode = useCallback(() => {
    dispatch(toggleWSTasksListBoard());
  }, [dispatch]);

  const toggleWSTasksDetailMode = useCallback(() => {
    dispatch(toggleWSTasksDetail());
  }, [dispatch]);

  const toggleWSTasksStatisticsMode = useCallback(() => {
    dispatch(toggleWSTasksStatistics());
  }, [dispatch]);

  const toggleWSTasksCalendarGanttMode = useCallback(() => {
    dispatch(toggleWSTasksCalendarGantt());
  }, [dispatch]);

  return {
    // Состояния
    isWSTasksListMode,
    isWSTasksBoardMode,
    isWSTasksCalendarMode,
    isWSTasksGanttMode,
    isWSTasksStatisticsMode,
    isWSTasksDetailMode,

    // Установка нескольких режимов
    setMultipleWSTasksModes,

    // Установка основных режимов
    setWSTasksListMode,
    setWSTasksBoardMode,
    setWSTasksCalendarMode,
    setWSTasksGanttMode,

    // Установка дополнительных режимов
    setWSTasksDetailMode,
    setWSTasksStatisticsMode,

    // Сброс режимов
    resetAllWSTasksModes,
    resetWSTasksListMode,
    resetWSTasksBoardMode,
    resetWSTasksCalendarMode,
    resetWSTasksGanttMode,
    resetWSTasksDetailMode,
    resetWSTasksStatisticsMode,

    // Переключение режимов
    toggleWSTasksListBoardMode,
    toggleWSTasksDetailMode,
    toggleWSTasksStatisticsMode,
    toggleWSTasksCalendarGanttMode,
  };
};
