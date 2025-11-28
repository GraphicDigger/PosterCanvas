import { createSlice } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../../shared/constants';

export const initialFocusObject = {
  focusObject: null,
  kind: ENTITY_KINDS.SCREEN,
  parentId: null,
  childrenIds: [],
  objectMetrics: null,
  isSelecting: false,
  error: null,
};

export const actionsInitialFocusObject = {
  setFocusObject: (state, action) => {
    state.focusObject = action.payload;
    console.log('focusObject', state.focusObject);
  },
  setObjectMetrics: (state, action) => {
    state.objectMetrics = action.payload;
  },
  setIsSelecting: (state, action) => {
    state.isSelecting = action.payload;
  },
  setError: (state, action) => {
    state.error = action.payload;
  },
  setErrorFocusObject: (state, action) => {
    state.error = action.payload;
  },
  resetFocusObject: () => initialFocusObject,
};

