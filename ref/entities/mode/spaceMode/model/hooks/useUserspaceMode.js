import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { USERSPACE_MODES } from '../constants/userspaceMode';
import {
  selectUserspaceMode,
  selectIsUSProfileMode,
  selectIsUSWorkspacesMode,
  setUserspaceMode,
  resetUserspaceMode,
  toggleUSProfileWorkspaces,
} from '../store';


export const useUserspaceMode = () => {
  const dispatch = useDispatch();

  const isUSProfileMode = useSelector(selectIsUSProfileMode);
  const isUSWorkspacesMode = useSelector(selectIsUSWorkspacesMode);

  const setUSProfileMode = useCallback(() => {
    dispatch(setUserspaceMode(USERSPACE_MODES.PROFILE));
  }, [dispatch]);

  const setUSWorkspacesMode = useCallback(() => {
    dispatch(setUserspaceMode(USERSPACE_MODES.WORKSPACES));
  }, [dispatch]);

  const toggleUSProfileWorkspacesModes = useCallback(() => {
    dispatch(toggleUSProfileWorkspaces());
  }, [dispatch]);

  const resetUserspaceMode = useCallback(() => {
    dispatch(resetUserspaceMode());
  }, [dispatch]);

  return {
    // Current state
    isUSProfileMode,
    isUSWorkspacesMode,

    // Actions
    setUSProfileMode,
    setUSWorkspacesMode,
    toggleUSProfileWorkspacesModes,
    resetUserspaceMode,
  };
};
