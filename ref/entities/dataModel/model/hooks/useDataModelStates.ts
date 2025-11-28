import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataModelCheckStates, selectDataModelStates } from '../store';
import {
  setSelectedModelId,
  setHoveredModelId,
  setFocusedModelId,
  setLoading,
  setError,
} from '../store/slice';

export const useDataModelStates = (modelId?: string) => {
  const dispatch = useDispatch();

  const {
    isHovered: isModelHovered,
    isFocused: isModelFocused,
    isSelected: isModelSelected,
  } = useSelector((state: any) => selectDataModelCheckStates(state, modelId || ''));

  const states = useSelector((state: any) => selectDataModelStates(state));

  const handleSelectModel = useCallback((id: string | null) => {
    dispatch(setSelectedModelId(id));
  }, [dispatch]);

  const handleHoverModel = useCallback((id: string | null) => {
    dispatch(setHoveredModelId(id));
  }, [dispatch]);

  const handleFocusModel = useCallback((id: string | null) => {
    dispatch(setFocusedModelId(id));
  }, [dispatch]);

  const handleSetLoading = useCallback((loading: boolean) => {
    dispatch(setLoading(loading));
  }, [dispatch]);

  const handleSetError = useCallback((error: string | null) => {
    dispatch(setError(error));
  }, [dispatch]);

  return {
    handleSelectModel,
    handleHoverModel,
    handleFocusModel,
    handleSetLoading,
    handleSetError,
    isModelHovered,
    isModelFocused,
    isModelSelected,
    ...states,
  };
};
