import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { PROJECTS_MODES } from '../constants/workspaceModes';
import {
  setWSProjectsMode,
  setWSProjectsModes,
  resetWSProjectsMode,
  resetWSProjectsModes,
  setWSDetailMode,
  toggleWSListRoadmap,
  toggleWSProjectDetail,
  toggleWSListProgress,
  selectIsWSProjectsListMode,
  selectIsWSProjectsRoadmapMode,
  selectIsWSProjectsProgressMode,
  selectIsWSProjectsDetailMode,
} from '../store';

export const useWSProjectsMode = () => {
  const dispatch = useDispatch();

  // Селекторы состояний
  const isWSProjectsListMode = useSelector(selectIsWSProjectsListMode);
  const isWSProjectsRoadmapMode = useSelector(selectIsWSProjectsRoadmapMode);
  const isWSProjectsProgressMode = useSelector(selectIsWSProjectsProgressMode);
  const isWSProjectsDetailMode = useSelector(selectIsWSProjectsDetailMode);

  // Установка нескольких режимов одновременно
  const setMultipleWSProjectsModes = useCallback((modes) => {
    dispatch(setWSProjectsModes(modes));
  }, [dispatch]);

  // Сброс всех режимов к начальным значениям
  const resetAllWSProjectsModes = useCallback(() => {
    dispatch(resetWSProjectsModes());
  }, [dispatch]);

  // Установка основных режимов (только один активен)
  const setWSProjectsListMode = useCallback(() => {
    dispatch(setWSProjectsMode(PROJECTS_MODES.LIST));
  }, [dispatch]);

  const setWSProjectsRoadmapMode = useCallback(() => {
    dispatch(setWSProjectsMode(PROJECTS_MODES.ROADMAP));
  }, [dispatch]);

  const setWSProjectsProgressMode = useCallback(() => {
    dispatch(setWSProjectsMode(PROJECTS_MODES.PROGRESS));
  }, [dispatch]);

  // Установка дополнительных режимов (могут быть активны вместе с основными)
  const setWSProjectsTeamsMode = useCallback(() => {
    dispatch(setWSDetailMode());
  }, [dispatch]);

  const setWSProjectsDetailMode = useCallback(() => {
    dispatch(setWSDetailMode());
  }, [dispatch]);

  // Сброс конкретных режимов
  const resetWSProjectsListMode = useCallback(() => {
    dispatch(resetWSProjectsMode(PROJECTS_MODES.LIST));
  }, [dispatch]);

  const resetWSProjectsRoadmapMode = useCallback(() => {
    dispatch(resetWSProjectsMode(PROJECTS_MODES.ROADMAP));
  }, [dispatch]);

  const resetWSProjectsProgressMode = useCallback(() => {
    dispatch(resetWSProjectsMode(PROJECTS_MODES.PROGRESS));
  }, [dispatch]);

  const resetWSProjectsTeamsMode = useCallback(() => {
    dispatch(resetWSProjectsMode(PROJECTS_MODES.TEAMS));
  }, [dispatch]);

  const resetWSProjectsDetailMode = useCallback(() => {
    dispatch(resetWSProjectsMode(PROJECTS_MODES.DETAIL));
  }, [dispatch]);

  // Переключение режимов
  const toggleWSProjectsListRoadmap = useCallback(() => {
    dispatch(toggleWSListRoadmap());
  }, [dispatch]);

  const toggleWSProjectsDetailMode = useCallback(() => {
    dispatch(toggleWSProjectDetail());
  }, [dispatch]);

  const toggleWSProjectsListProgress = useCallback(() => {
    dispatch(toggleWSListProgress());
  }, [dispatch]);

  return {
    // Состояния
    isWSProjectsListMode,
    isWSProjectsRoadmapMode,
    isWSProjectsProgressMode,
    isWSProjectsDetailMode,

    // Установка нескольких режимов
    setMultipleWSProjectsModes,

    // Установка основных режимов
    setWSProjectsListMode,
    setWSProjectsRoadmapMode,
    setWSProjectsProgressMode,

    // Установка дополнительных режимов
    setWSProjectsTeamsMode,
    setWSProjectsDetailMode,

    // Сброс режимов
    resetAllWSProjectsModes,
    resetWSProjectsListMode,
    resetWSProjectsRoadmapMode,
    resetWSProjectsProgressMode,
    resetWSProjectsTeamsMode,
    resetWSProjectsDetailMode,

    // Переключение режимов
    toggleWSProjectsListRoadmap,
    toggleWSProjectsDetailMode,
    toggleWSProjectsListProgress,
  };
};
