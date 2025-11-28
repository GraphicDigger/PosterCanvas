import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataModelCheckStates } from '../store';
import {
  setSelectedModelId,
  setHoveredModelId,
  setFocusedModelId,
} from '../store/slice';


export const useDataModelStates = (modelId) => {
  const dispatch = useDispatch();
  const {
    isHovered: isModelHovered,
    isFocused: isModelFocused,
    isSelected: isModelSelected,
  } = useSelector(state => selectDataModelCheckStates(state, modelId));

  const handleSelectModel = (id) => {
    dispatch(setSelectedModelId(id));
  };

  const handleHoverModel = (id) => {
    dispatch(setHoveredModelId(id));
  };

  const handleFocusModel = (id) => {
    dispatch(setFocusedModelId(id));
  };

  return {
    handleSelectModel,
    handleHoverModel,
    handleFocusModel,
    isModelHovered,
    isModelFocused,
    isModelSelected,
  };
};
