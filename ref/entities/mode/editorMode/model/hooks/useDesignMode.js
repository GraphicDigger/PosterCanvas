import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { DESIGN_MODES } from '../..';
import {
  setDesignMode,
  setDesignModes,
  resetDesignMode,
  resetDesignModes,
  toggleAction,
  toggleModeCode,
  togglePresetManager,
  toggleTokenManager,
  toggleCommentsInDesignMode,
} from '../store/slice';
import {
  selectIsScreenCanvasMode,
  selectIsComponentCanvasMode,
  selectIsCodeMode,
  selectIsTokenManagerMode,
  selectIsPresetManagerMode,
  selectIsActionCanvasMode,
  selectIsCommentsMode,
} from '../store/selectors';

export const useDesignMode = () => {

  const dispatch = useDispatch();
  const isScreenCanvasInDesignMode = useSelector(selectIsScreenCanvasMode);
  const isComponentCanvasInDesignMode = useSelector(selectIsComponentCanvasMode);
  const isActionCanvasInDesignMode = useSelector(selectIsActionCanvasMode);
  const isCodeInDesignMode = useSelector(selectIsCodeMode);
  const isTokenManagerInDesignMode = useSelector(selectIsTokenManagerMode);
  const isPresetManagerInDesignMode = useSelector(selectIsPresetManagerMode);
  const isCommentsInDesignMode = useSelector(selectIsCommentsMode);

  //modes
  const setModesInDesignModes = useCallback((...modes) => {
    dispatch(setDesignModes(modes));
  }, [dispatch]);

  // reset
  const resetDesignModesToInitialState = useCallback(() => {
    dispatch(resetDesignModes());
  }, [dispatch]);


  // mode
  // canvas
  const setScreenCanvasInDesignMode = useCallback(() => {
    dispatch(setDesignMode(DESIGN_MODES.SCREEN_CANVAS));
  }, [dispatch]);

  const setComponentCanvasInDesignMode = useCallback(() => {
    dispatch(setDesignMode(DESIGN_MODES.COMPONENT_CANVAS));
  }, [dispatch]);

  const setActionCanvasInDesignMode = useCallback(() => {
    dispatch(setDesignMode(DESIGN_MODES.ACTION_CANVAS));
  }, [dispatch]);

  const toggleActionInDesignMode = useCallback(() => {
    dispatch(toggleAction());
  }, [dispatch]);

  // managers
  const setTokenManagerInDesignMode = useCallback(() => {
    dispatch(setDesignMode(DESIGN_MODES.TOKEN_MANAGER));
  }, [dispatch]);

  const setPresetManagerInDesignMode = useCallback(() => {
    dispatch(setDesignMode(DESIGN_MODES.PRESET_MANAGER));
  }, [dispatch]);

  const togglePresetManagerInDesignMode = useCallback(() => {
    dispatch(togglePresetManager());
  }, [dispatch]);

  const toggleTokenManagerInDesignMode = useCallback(() => {
    dispatch(toggleTokenManager());
  }, [dispatch]);

  // code
  const setCodeInDesignMode = useCallback(() => {
    dispatch(setDesignMode(DESIGN_MODES.CODE));
  }, [dispatch]);

  const toggleCodeInDesignMode = useCallback(() => {
    dispatch(toggleModeCode());
  }, [dispatch]);

  // reset
  const resetSpecificModeInDesignModes = useCallback((mode) => {
    dispatch(resetDesignMode(mode));
  }, [dispatch]);

  // comments
  const setCommentsInDesignMode = useCallback(() => {
    dispatch(setDesignMode(DESIGN_MODES.COMMENTS));
  }, [dispatch]);

  const handleToggleCommentsInDesignMode = useCallback(() => {
    dispatch(toggleCommentsInDesignMode());
  }, [dispatch]);

  return {
    isScreenCanvasInDesignMode,
    isComponentCanvasInDesignMode,
    isCodeInDesignMode,
    isTokenManagerInDesignMode,
    isPresetManagerInDesignMode,
    isActionCanvasInDesignMode,
    isCommentsInDesignMode,

    setModesInDesignModes,

    setScreenCanvasInDesignMode,
    setComponentCanvasInDesignMode,
    setActionCanvasInDesignMode,
    toggleActionInDesignMode,

    setCodeInDesignMode,
    toggleCodeInDesignMode,
    setTokenManagerInDesignMode,
    toggleTokenManagerInDesignMode,
    setPresetManagerInDesignMode,
    togglePresetManagerInDesignMode,

    resetDesignModesToInitialState,
    resetSpecificModeInDesignModes,

    setCommentsInDesignMode,
    toggleCommentsInDesignMode: handleToggleCommentsInDesignMode,
  };
};
