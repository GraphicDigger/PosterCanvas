import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SPACE_MODES } from '../constants/spaceModes';
import {
  selectSpaceMode,
  selectIsWorkspaceMode,
  selectIsUserspaceMode,
  setSpaceMode,
  resetSpaceMode,
  toggleWorkspaceUserspace,
} from '../store';


export const useSpaceMode = () => {
  const dispatch = useDispatch();

  // Selectors
  const spaceMode = useSelector(selectSpaceMode);
  const isWorkspaceMode = useSelector(selectIsWorkspaceMode);
  const isUserspaceMode = useSelector(selectIsUserspaceMode);

  // Actions
  const setWorkspaceMode = useCallback(() => {
    dispatch(setSpaceMode(SPACE_MODES.WORKSPACE));
  }, [dispatch]);

  const setUserspaceMode = useCallback(() => {
    dispatch(setSpaceMode(SPACE_MODES.USERSPACE));
  }, [dispatch]);

  const toggleSpaceMode = useCallback(() => {
    dispatch(toggleWorkspaceUserspace());
  }, [dispatch]);

  const resetSpace = useCallback(() => {
    dispatch(resetSpaceMode());
  }, [dispatch]);

  return {
    // Current state
    spaceMode,
    isWorkspaceMode,
    isUserspaceMode,

    // Actions
    setWorkspaceMode,
    setUserspaceMode,
    toggleSpaceMode,
    resetSpace,
  };
};
