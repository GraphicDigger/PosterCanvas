import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { GLOBAL_MODES } from '../..';
import {
  setGlobalMode,
  toggleDesignCodebase,
  resetGlobalMode,
} from '../store/slice';
import {
  selectIsDesignMode,
  selectIsPreviewMode,
  selectIsCodebaseMode,
  selectIsDatabaseMode,
  selectIsGlobalSearchMode,
  selectIsWireframeMode,
} from '../store/selectors';

export const useGlobalModes = () => {
  const dispatch = useDispatch();

  // state selectors
  const isDesignModeGlobal = useSelector(selectIsDesignMode);
  const isPreviewModeGlobal = useSelector(selectIsPreviewMode);
  const isCodebaseModeGlobal = useSelector(selectIsCodebaseMode);
  const isDatabaseModeGlobal = useSelector(selectIsDatabaseMode);
  const isGlobalSearchMode = useSelector(selectIsGlobalSearchMode);
  const isWireframeModeGlobal = useSelector(selectIsWireframeMode);
  //Global modes
  const setGlobalDesignMode = useCallback(() => {
    dispatch(setGlobalMode(GLOBAL_MODES.DESIGN));
  }, [dispatch]);

  const setGlobalPreviewMode = useCallback(() => {
    dispatch(setGlobalMode(GLOBAL_MODES.PREVIEW));
  }, [dispatch]);

  const setGlobalCodebaseMode = useCallback(() => {
    dispatch(setGlobalMode(GLOBAL_MODES.CODEBASE));
  }, [dispatch]);

  const setGlobalDatabaseMode = useCallback(() => {
    dispatch(setGlobalMode(GLOBAL_MODES.DATABASE));
  }, [dispatch]);

  const setGlobalSearchMode = useCallback(() => {
    dispatch(setGlobalMode(GLOBAL_MODES.GLOBAL_SEARCH));
  }, [dispatch]);

  const setGlobalWireframeMode = useCallback(() => {
    dispatch(setGlobalMode(GLOBAL_MODES.WIREFRAME));
  }, [dispatch]);

  const toggleModesDesignCodebase = useCallback(() => {
    dispatch(toggleDesignCodebase());
  }, [dispatch]);

  const handleResetGlobalMode = useCallback(() => {
    dispatch(resetGlobalMode());
  }, [dispatch]);


  return {
    isDesignModeGlobal,
    isPreviewModeGlobal,
    isCodebaseModeGlobal,
    isDatabaseModeGlobal,
    isGlobalSearchMode,
    isWireframeModeGlobal,
    setGlobalDesignMode,
    setGlobalPreviewMode,
    setGlobalCodebaseMode,
    setGlobalDatabaseMode,
    setGlobalSearchMode,
    setGlobalWireframeMode,
    toggleModesDesignCodebase,
    resetGlobalMode: handleResetGlobalMode,

  };
};
