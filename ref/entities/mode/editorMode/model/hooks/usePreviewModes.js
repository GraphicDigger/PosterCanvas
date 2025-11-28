import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  setPreviewModes,
  setPreviewMode,
  toggleModeComments,
} from '../store/slice';
import {
  selectIsCommentsPreviewMode,
} from '../store/selectors';

export const usePreviewModes = () => {
  const dispatch = useDispatch();

  const isCommentsInPreviewMode = useSelector(selectIsCommentsPreviewMode);

  const setMode = useCallback((mode) => {
    dispatch(setPreviewMode(mode));
  }, [dispatch]);

  const setModes = useCallback((...modes) => {
    dispatch(setPreviewModes(modes));
  }, [dispatch]);

  const toggleCommentsMode = useCallback(() => {
    dispatch(toggleModeComments());
  }, [dispatch]);

  return {
    setMode,
    setModes,
    toggleCommentsMode,
    isCommentsInPreviewMode,
  };
};
