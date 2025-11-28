import { createSelector } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHoveredRecordId,
  setFocusedRecordId,
  setSelectedRecordId,
} from '../store/slice';
import {
  selectDataRecordCheckStates,
  selectSelectedRecordId,
  selectFocusedRecordId,
  selectHoveredRecordId,
  selectIsFocused,
  selectIsHovered,
  selectIsSelected,
  resetSelectedRecord,
} from '../store';
import { useRecordsBySelectedModel } from './useDataRecords';


export const useDataRecordStates = (recordId) => {
  const dispatch = useDispatch();

  const {
    isSelected,
    isFocused,
    isHovered,
  } = useSelector(state => selectDataRecordCheckStates(state, recordId));

  const { records } = useRecordsBySelectedModel();

  const handleHover = (id) => {
    dispatch(setHoveredRecordId(id));
  };

  const handleFocus = (id) => {
    dispatch(setFocusedRecordId(id));
  };

  const handleSelect = (id) => {
    dispatch(setSelectedRecordId(id));
  };

  const handleSelectFirstRecord = () => {
    dispatch(setSelectedRecordId(records[0]?.id));
  };

  const handleDeselectRecord = () => {
    dispatch(resetSelectedRecord());
  };

  const getIsSelected = useSelector(selectIsSelectedFn);
  const getIsFocused = useSelector(selectIsFocusedFn);
  const getIsHovered = useSelector(selectIsHoveredFn);

  return {
    isSelected,
    isFocused,
    isHovered,
    handleHover,
    handleFocus,
    handleSelect,
    handleSelectFirstRecord,
    handleDeselectRecord,

    getIsSelected,
    getIsFocused,
    getIsHovered,
  };
};

const selectIsSelectedFn = createSelector(
  [(state) => state],
  (state) => (id) => selectIsSelected(state, id),
);

const selectIsFocusedFn = createSelector(
  [(state) => state],
  (state) => (id) => selectIsFocused(state, id),
);

const selectIsHoveredFn = createSelector(
  [(state) => state],
  (state) => (id) => selectIsHovered(state, id),
);
