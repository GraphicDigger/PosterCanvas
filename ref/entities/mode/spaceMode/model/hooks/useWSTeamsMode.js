import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { TEAMS_MODES } from '../constants/workspaceModes';
import {
  setWSTeamsMode,
  setWSTeamsModes,
  resetWSTeamsMode,
  resetWSTeamsModes,
  setWSDetailMode,
  toggleWSTeamsListStats,
  toggleWSTeamsDetail,
  selectIsWSTeamsListMode,
  selectIsWSTeamsStatsMode,
  selectIsWSTeamsDetailMode,
} from '../store';

export const useWSTeamsMode = () => {
  const dispatch = useDispatch();

  // Селекторы состояний
  const isWSTeamsListMode = useSelector(selectIsWSTeamsListMode);
  const isWSTeamsStatsMode = useSelector(selectIsWSTeamsStatsMode);
  const isWSTeamsDetailMode = useSelector(selectIsWSTeamsDetailMode);

  // Установка нескольких режимов одновременно
  const setMultipleWSTeamsModes = useCallback((modes) => {
    dispatch(setWSTeamsModes(modes));
  }, [dispatch]);

  // Сброс всех режимов к начальным значениям
  const resetAllWSTeamsModes = useCallback(() => {
    dispatch(resetWSTeamsModes());
  }, [dispatch]);

  // Установка основных режимов (только один активен)
  const setWSTeamsListMode = useCallback(() => {
    dispatch(setWSTeamsMode(TEAMS_MODES.LIST));
  }, [dispatch]);

  const setWSTeamsStructureMode = useCallback(() => {
    dispatch(setWSTeamsMode(TEAMS_MODES.STRUCTURE));
  }, [dispatch]);

  const setWSTeamsStatsMode = useCallback(() => {
    dispatch(setWSTeamsMode(TEAMS_MODES.STATS));
  }, [dispatch]);

  const setWSTeamsRolesMode = useCallback(() => {
    dispatch(setWSTeamsMode(TEAMS_MODES.ROLES));
  }, [dispatch]);

  const setWSTeamsProjectsMode = useCallback(() => {
    dispatch(setWSTeamsMode(TEAMS_MODES.PROJECTS));
  }, [dispatch]);

  // Установка дополнительного режима (может быть активен вместе с основными)
  const setWSTeamsDetailMode = useCallback(() => {
    dispatch(setWSDetailMode());
  }, [dispatch]);

  // Сброс конкретных режимов
  const resetWSTeamsListMode = useCallback(() => {
    dispatch(resetWSTeamsMode(TEAMS_MODES.LIST));
  }, [dispatch]);

  const resetWSTeamsStructureMode = useCallback(() => {
    dispatch(resetWSTeamsMode(TEAMS_MODES.STRUCTURE));
  }, [dispatch]);

  const resetWSTeamsStatsMode = useCallback(() => {
    dispatch(resetWSTeamsMode(TEAMS_MODES.STATS));
  }, [dispatch]);

  const resetWSTeamsRolesMode = useCallback(() => {
    dispatch(resetWSTeamsMode(TEAMS_MODES.ROLES));
  }, [dispatch]);

  const resetWSTeamsProjectsMode = useCallback(() => {
    dispatch(resetWSTeamsMode(TEAMS_MODES.PROJECTS));
  }, [dispatch]);

  const resetWSTeamsDetailMode = useCallback(() => {
    dispatch(resetWSTeamsMode(TEAMS_MODES.DETAIL));
  }, [dispatch]);

  // Переключение режимов
  const toggleWSTeamsListStructure = useCallback(() => {
    dispatch(toggleWSTeamsListStructure());
  }, [dispatch]);

  const toggleWSTeamsListStats = useCallback(() => {
    dispatch(toggleWSTeamsListStats());
  }, [dispatch]);

  const toggleWSTeamsListRoles = useCallback(() => {
    dispatch(toggleWSTeamsListRoles());
  }, [dispatch]);

  const toggleWSTeamsListProjects = useCallback(() => {
    dispatch(toggleWSTeamsListProjects());
  }, [dispatch]);

  const toggleWSTeamsDetailMode = useCallback(() => {
    dispatch(toggleWSTeamsDetail());
  }, [dispatch]);

  return {
    // Состояния
    isWSTeamsListMode,
    isWSTeamsStatsMode,
    isWSTeamsDetailMode,

    // Установка нескольких режимов
    setMultipleWSTeamsModes,

    // Установка основных режимов
    setWSTeamsListMode,
    setWSTeamsStructureMode,
    setWSTeamsStatsMode,
    setWSTeamsRolesMode,
    setWSTeamsProjectsMode,

    // Установка дополнительного режима
    setWSTeamsDetailMode,

    // Сброс режимов
    resetAllWSTeamsModes,
    resetWSTeamsListMode,
    resetWSTeamsStructureMode,
    resetWSTeamsStatsMode,
    resetWSTeamsRolesMode,
    resetWSTeamsProjectsMode,
    resetWSTeamsDetailMode,

    // Переключение режимов
    toggleWSTeamsListStructure,
    toggleWSTeamsListStats,
    toggleWSTeamsListRoles,
    toggleWSTeamsListProjects,
    toggleWSTeamsDetailMode,
  };
};
