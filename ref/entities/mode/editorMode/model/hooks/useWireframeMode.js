import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { WIREFRAME_MODES } from '../constants/wireframeModes';
import {
  setWireframeMode,
  setWireframeModes,
  resetWireframeMode,
  resetWireframeModes,
  toggleBlockPreview,
  toggleBlockDetail,
} from '../store/slice';
import {
  selectIsBlocksWireframeMode,
  selectIsPreviewWireframeMode,
  selectIsBlockDetailWireframeMode,
} from '../store/selectors';

export const useWireframeMode = () => {
  const dispatch = useDispatch();

  const isBlocksMode = useSelector(selectIsBlocksWireframeMode);
  const isPreviewMode = useSelector(selectIsPreviewWireframeMode);
  const isBlockDetailMode = useSelector(selectIsBlockDetailWireframeMode);

  // set modes
  const setModesInWireframeModes = useCallback((...modes) => {
    dispatch(setWireframeModes(modes));
  }, [dispatch]);

  // set mode
  const setModeInWireframeModes = useCallback((mode) => {
    dispatch(setWireframeMode(mode));
  }, [dispatch]);

  // reset modes
  const resetWireframeModesToInitialState = useCallback(() => {
    dispatch(resetWireframeModes());
  }, [dispatch]);

  // reset mode
  const resetSpecificModeInWireframeModes = useCallback((mode) => {
    dispatch(resetWireframeMode(mode));
  }, [dispatch]);


  // set mode
  const setBlocksMode = useCallback(() => {
    dispatch(setWireframeMode(WIREFRAME_MODES.BLOCKS));
  }, [dispatch]);

  const setPreviewMode = useCallback(() => {
    dispatch(setWireframeMode(WIREFRAME_MODES.PREVIEW));
  }, [dispatch]);

  const setBlockDetailMode = useCallback(() => {
    dispatch(setWireframeModes([WIREFRAME_MODES.BLOCK_DETAIL]));
  }, [dispatch]);


  // toggle mode
  const toggleBlockAndPreviewMode = useCallback(() => {
    dispatch(toggleBlockPreview());
  }, [dispatch]);

  const toggleBlockDetailMode = useCallback(() => {
    dispatch(toggleBlockDetail());
  }, [dispatch]);


  // reset mode
  const resetBlockMode = useCallback(() => {
    dispatch(resetWireframeMode(WIREFRAME_MODES.BLOCKS));
  }, [dispatch]);

  const resetPreviewMode = useCallback(() => {
    dispatch(resetWireframeMode(WIREFRAME_MODES.PREVIEW));
  }, [dispatch]);

  const resetBlockDetailMode = useCallback(() => {
    dispatch(resetWireframeMode(WIREFRAME_MODES.BLOCK_DETAIL));
  }, [dispatch]);


  return {
    // Состояния режимов
    isBlocksMode,
    isPreviewMode,
    isBlockDetailMode,

    setModesInWireframeModes,

    setBlocksMode,
    resetBlockMode,

    setPreviewMode,
    resetPreviewMode,

    setBlockDetailMode,
    resetBlockDetailMode,

    toggleBlockAndPreviewMode,
    toggleBlockDetailMode,

    resetWireframeModesToInitialState,
    resetSpecificModeInWireframeModes,

  };
};
