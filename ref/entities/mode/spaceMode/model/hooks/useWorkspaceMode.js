import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { WORKSPACE_MODES } from '../constants/workspaceModes';
import {
  setWorkspaceMode,
  toggleWSTasksProjects,
  toggleWSTeamsMembers,
  toggleWSTeamsGoals,
  toggleWSProjectsMembers,
  resetWorkspaceMode,
  selectIsWSTasksWorkspace,
  selectIsWSProjectsWorkspace,
  selectIsWSMembersWorkspace,
  selectIsWSGoalsWorkspace,
  selectIsWSReportsWorkspace,
  selectIsWSResourcesWorkspace,
  selectIsWSCalendarWorkspace,
  selectIsWSTeamsWorkspace,
  selectIsWSSettingsWorkspace,
  selectIsWSActivityWorkspace,
} from '../store';


export const useWorkspaceMode = () => {
  const dispatch = useDispatch();

  // Селекторы состояний
  const isWSTasks = useSelector(selectIsWSTasksWorkspace);
  const isWSProjects = useSelector(selectIsWSProjectsWorkspace);
  const isWSMembers = useSelector(selectIsWSMembersWorkspace);
  const isWSGoals = useSelector(selectIsWSGoalsWorkspace);
  const isWSReports = useSelector(selectIsWSReportsWorkspace);
  const isWSResources = useSelector(selectIsWSResourcesWorkspace);
  const isWSCalendar = useSelector(selectIsWSCalendarWorkspace);
  const isWSTeams = useSelector(selectIsWSTeamsWorkspace);
  const isWSSettings = useSelector(selectIsWSSettingsWorkspace);
  const isWSActivity = useSelector(selectIsWSActivityWorkspace);

  // Установка основных режимов рабочего пространства
  const setWSTasks = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.TASKS));
  }, [dispatch]);

  const setWSProjects = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.PROJECTS));
  }, [dispatch]);

  const setWSMembers = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.MEMBERS));
  }, [dispatch]);

  const setWSGoals = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.GOALS));
  }, [dispatch]);

  const setWSReports = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.REPORTS));
  }, [dispatch]);

  const setWSResources = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.RESOURCES));
  }, [dispatch]);

  const setWSCalendar = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.CALENDAR));
  }, [dispatch]);

  const setWSTeams = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.TEAMS));
  }, [dispatch]);

  const setWSSettings = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.SETTINGS));
  }, [dispatch]);

  const setWSActivity = useCallback(() => {
    dispatch(setWorkspaceMode(WORKSPACE_MODES.ACTIVITY));
  }, [dispatch]);

  // Функции переключения между режимами
  const handleToggleWSTasksProjects = useCallback(() => {
    dispatch(toggleWSTasksProjects());
  }, [dispatch]);

  const handleToggleWSProjectsMembers = useCallback(() => {
    dispatch(toggleWSProjectsMembers());
  }, [dispatch]);

  const handleToggleWSTeamsMembers = useCallback(() => {
    dispatch(toggleWSTeamsMembers());
  }, [dispatch]);

  const handleToggleWSTeamsGoals = useCallback(() => {
    dispatch(toggleWSTeamsGoals());
  }, [dispatch]);

  // Сброс к начальному состоянию
  const handleResetWorkspace = useCallback(() => {
    dispatch(resetWorkspaceMode());
  }, [dispatch]);

  return {
    // Состояния
    isWSTasks,
    isWSProjects,
    isWSMembers,
    isWSGoals,
    isWSReports,
    isWSResources,
    isWSCalendar,
    isWSTeams,
    isWSSettings,
    isWSActivity,
    // Установка режимов
    setWSTasks,
    setWSProjects,
    setWSMembers,
    setWSGoals,
    setWSReports,
    setWSResources,
    setWSCalendar,
    setWSTeams,
    setWSSettings,
    setWSActivity,
    // Переключение режимов
    toggleWSTasksProjects: handleToggleWSTasksProjects,
    toggleWSProjectsMembers: handleToggleWSProjectsMembers,
    toggleWSTeamsGoals: handleToggleWSTeamsGoals,

    // Сброс
    resetWorkspace: handleResetWorkspace,
  };
};
