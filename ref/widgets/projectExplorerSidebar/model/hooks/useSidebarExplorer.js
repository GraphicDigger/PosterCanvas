/** @jsxImportSource @emotion/react */
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMode,
  selectGlobalSearchMode,
  selectSettingsMode,
  selectMainMode,
  selectorExplorerSidebar,
  setMode,
  resetMode,
  toggleSettings,
  toggleGlobalSearch,
  setSubMode,
} from '../store';


export const useSidebarExplorer = () => {

  const dispatch = useDispatch();

  const { mode, subMode, subModes } = useSelector(selectorExplorerSidebar);
  const isGlobalSearchMode = useSelector(selectGlobalSearchMode);
  const isSettingsMode = useSelector(selectSettingsMode);
  const isMainMode = useSelector(selectMainMode);

  const handleResetMode = useCallback(() => {
    dispatch(resetMode());
  }, [dispatch]);

  const handleToggleSettings = useCallback(() => {
    dispatch(toggleSettings());
  }, [dispatch]);

  const handleSetSubMode = useCallback((tab) => {
    dispatch(setSubMode(tab));
  }, [dispatch]);

  return {
    mode,
    isGlobalSearchMode,
    isSettingsMode,
    isMainMode,
    resetMode: handleResetMode,
    toggleSettings: handleToggleSettings,
    // toggleGlobalSearch: handleToggleGlobalSearch,

    subMode,
    subModes,
    setSubMode: handleSetSubMode,


  };
};
