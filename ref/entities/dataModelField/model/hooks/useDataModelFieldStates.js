import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDataModelFieldCheckStates } from '../store';
import {
  setSelectedModelFieldId,
  setHoveredModelFieldId,
  setFocusedModelFieldId,
} from '../store/slice';


export const useDataModelFieldStates = (fieldId) => {
  const dispatch = useDispatch();

  const {
    isHovered,
    isFocused,
    isSelected,
  } = useSelector(state => selectDataModelFieldCheckStates(state, fieldId));

  const handleHoverField = (id) => {
    dispatch(setHoveredModelFieldId(id));
  };

  const handleFocusField = (id) => {
    dispatch(setFocusedModelFieldId(id));
  };

  const handleSelectField = (id) => {
    dispatch(setSelectedModelFieldId(id));
  };

  const handleSelectFirstField = () => {
    dispatch(setSelectedModelFieldId(fields[0]?.id));
  };

  const handleDeselect = () => {
    dispatch(setSelectedModelFieldId(null));
  };

  return {
    handleSelectField,
    handleSelectFirstField,
    handleHoverField,
    handleFocusField,
    handleDeselect,
    isHovered,
    isFocused,
    isSelected,
  };
};
