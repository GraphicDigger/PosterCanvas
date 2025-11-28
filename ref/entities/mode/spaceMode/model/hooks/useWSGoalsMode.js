import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { GOALS_MODES } from '../constants/workspaceModes';
import {
  setWSGoalsMode,
  setWSGoalsModes,
  resetWSGoalsMode,
  resetWSGoalsModes,
  setWSDetailMode,
  toggleWSListProgress,
  toggleWSProjectDetail,
  toggleWSListKPI,
  selectIsWSGoalsListMode,
  selectIsWSGoalsProgressMode,
  selectIsWSGoalsKPIMode,
  selectIsWSGoalsDetailMode,
} from '../store';


export const useWSGoalsMode = () => {
  const dispatch = useDispatch();

  // Селекторы состояний
  const isWSGoalsListMode = useSelector(selectIsWSGoalsListMode);
  const isWSGoalsProgressMode = useSelector(selectIsWSGoalsProgressMode);
  const isWSGoalsKPIMode = useSelector(selectIsWSGoalsKPIMode);
  const isWSGoalsDetailMode = useSelector(selectIsWSGoalsDetailMode);

  // Установка нескольких режимов одновременно
  const setMultipleWSGoalsModes = useCallback((modes) => {
    dispatch(setWSGoalsModes(modes));
  }, [dispatch]);

  // Сброс всех режимов к начальным значениям
  const resetAllWSGoalsModes = useCallback(() => {
    dispatch(resetWSGoalsModes());
  }, [dispatch]);

  // Установка основных режимов (только один активен)
  const setWSGoalsListMode = useCallback(() => {
    dispatch(setWSGoalsMode(GOALS_MODES.LIST));
  }, [dispatch]);

  const setWSGoalsProgressMode = useCallback(() => {
    dispatch(setWSGoalsMode(GOALS_MODES.PROGRESS));
  }, [dispatch]);

  const setWSGoalsKPIMode = useCallback(() => {
    dispatch(setWSGoalsMode(GOALS_MODES.KPI));
  }, [dispatch]);

  // Установка дополнительного режима (может быть активен вместе с основными)
  const setWSGoalsDetailMode = useCallback(() => {
    dispatch(setWSDetailMode());
  }, [dispatch]);

  // Сброс конкретных режимов
  const resetWSGoalsListMode = useCallback(() => {
    dispatch(resetWSGoalsMode(GOALS_MODES.LIST));
  }, [dispatch]);

  const resetWSGoalsProgressMode = useCallback(() => {
    dispatch(resetWSGoalsMode(GOALS_MODES.PROGRESS));
  }, [dispatch]);

  const resetWSGoalsKPIMode = useCallback(() => {
    dispatch(resetWSGoalsMode(GOALS_MODES.KPI));
  }, [dispatch]);

  const resetWSGoalsDetailMode = useCallback(() => {
    dispatch(resetWSGoalsMode(GOALS_MODES.DETAIL));
  }, [dispatch]);

  // Переключение режимов
  const toggleWSGoalsListProgress = useCallback(() => {
    dispatch(toggleWSListProgress());
  }, [dispatch]);

  const toggleWSGoalsDetailMode = useCallback(() => {
    dispatch(toggleWSProjectDetail());
  }, [dispatch]);

  const toggleWSGoalsListKPI = useCallback(() => {
    dispatch(toggleWSListKPI());
  }, [dispatch]);

  return {
    // Состояния
    isWSGoalsListMode,
    isWSGoalsProgressMode,
    isWSGoalsKPIMode,
    isWSGoalsDetailMode,

    // Установка нескольких режимов
    setMultipleWSGoalsModes,

    // Установка основных режимов
    setWSGoalsListMode,
    setWSGoalsProgressMode,
    setWSGoalsKPIMode,

    // Установка дополнительного режима
    setWSGoalsDetailMode,

    // Сброс режимов
    resetAllWSGoalsModes,
    resetWSGoalsListMode,
    resetWSGoalsProgressMode,
    resetWSGoalsKPIMode,
    resetWSGoalsDetailMode,

    // Переключение режимов
    toggleWSGoalsListProgress,
    toggleWSGoalsDetailMode,
    toggleWSGoalsListKPI,
  };
};
