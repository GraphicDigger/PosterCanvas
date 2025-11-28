import { createSlice } from '@reduxjs/toolkit';
import { initialStackBlitz, actionsInitialStackBlitz } from './initialStackBlitz';
import { initialFocusObject, actionsInitialFocusObject } from './focusObject';


const initialState = {
  ...initialStackBlitz,
  ...initialFocusObject,
};

export const stackBlitzSlice = createSlice({
  name: 'stackBlitz',
  initialState,
  reducers: {
    ...actionsInitialStackBlitz,
    ...actionsInitialFocusObject,
  },
});

export const {
  // StackBlitz
  setVM,
  setIsReady,
  setError,
  clearError,
  setProjectId,
  resetStackBlitzState,

  // FocusObject
  setFocusObject,
  setObjectMetrics,
  setIsSelecting,
  setErrorFocusObject,
  resetFocusObject,

} = stackBlitzSlice.actions;

export default stackBlitzSlice.reducer;
