import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WORKSPACES_MODES } from '../constants/userspaceMode';
import {
  setUSWorkspacesMode,
  setUSWorkspacesModes,
  resetUSWorkspacesMode,
  resetUSWorkspacesModes,
  toggleUSProjectsTeams,
  toggleUSTeamsMembers,
  toggleUSProjectsMembers,
  selectUSWorkspacesModes,
  selectIsUSWorkspacesProjectsMode,
  selectIsUSWorkspacesTeamsMode,
  selectIsUSWorkspacesMembersMode,
  selectIsWSSettingsWorkspace,
} from '../store';

export const useUSWorkspacesMode = () => {
  const dispatch = useDispatch();

  // Селекторы состояний
  const usWorkspacesModes = useSelector(selectUSWorkspacesModes);
  const isUSProjectsMode = useSelector(selectIsUSWorkspacesProjectsMode);
  const isUSTeamsMode = useSelector(selectIsUSWorkspacesTeamsMode);
  const isUSMembersMode = useSelector(selectIsUSWorkspacesMembersMode);
  const isWSSettings = useSelector(selectIsWSSettingsWorkspace);

  // Установка нескольких режимов одновременно
  const setMultipleUSWorkspacesModes = useCallback((modes) => {
    dispatch(setUSWorkspacesModes(modes));
  }, [dispatch]);

  // Сброс всех режимов к начальным значениям
  const resetAllUSWorkspacesModes = useCallback(() => {
    dispatch(resetUSWorkspacesModes());
  }, [dispatch]);

  // Установка основных режимов
  const setUSProjectsMode = useCallback(() => {
    dispatch(setUSWorkspacesMode(WORKSPACES_MODES.PROJECTS));
  }, [dispatch]);

  const setUSTeamsMode = useCallback(() => {
    dispatch(setUSWorkspacesMode(WORKSPACES_MODES.TEAMS));
  }, [dispatch]);

  const setUSMembersMode = useCallback(() => {
    dispatch(setUSWorkspacesMode(WORKSPACES_MODES.MEMBERS));
  }, [dispatch]);

  const setWSSettingsMode = useCallback(() => {
    dispatch(setUSWorkspacesMode(WORKSPACES_MODES.SETTINGS));
  }, [dispatch]);

  // Сброс конкретных режимов
  const resetUSProjectsMode = useCallback(() => {
    dispatch(resetUSWorkspacesMode(WORKSPACES_MODES.PROJECTS));
  }, [dispatch]);

  const resetUSTeamsMode = useCallback(() => {
    dispatch(resetUSWorkspacesMode(WORKSPACES_MODES.TEAMS));
  }, [dispatch]);

  const resetUSMembersMode = useCallback(() => {
    dispatch(resetUSWorkspacesMode(WORKSPACES_MODES.MEMBERS));
  }, [dispatch]);

  // Переключение режимов
  const toggleUSProjectsTeamsMode = useCallback(() => {
    dispatch(toggleUSProjectsTeams());
  }, [dispatch]);

  const toggleUSTeamsMembersMode = useCallback(() => {
    dispatch(toggleUSTeamsMembers());
  }, [dispatch]);

  const toggleUSProjectsMembersMode = useCallback(() => {
    dispatch(toggleUSProjectsMembers());
  }, [dispatch]);

  return {
    // Состояния
    usWorkspacesModes,
    isUSProjectsMode,
    isUSTeamsMode,
    isUSMembersMode,

    // Установка нескольких режимов
    setMultipleUSWorkspacesModes,

    // Установка основных режимов
    setUSProjectsMode,
    setUSTeamsMode,
    setUSMembersMode,

    // Сброс режимов
    resetAllUSWorkspacesModes,
    resetUSProjectsMode,
    resetUSTeamsMode,
    resetUSMembersMode,

    // Переключение режимов
    toggleUSProjectsTeamsMode,
    toggleUSTeamsMembersMode,
    toggleUSProjectsMembersMode,
  };
};
