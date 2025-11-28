import { createSlice } from '@reduxjs/toolkit';
import { actionsQuery, initialQuery } from './actionsQuery';
import { initialStates, actionsStates } from './actionsStates';
import { actionsMutation } from './actionsMutation';

const initialState = {
  ...initialQuery,
  ...initialStates,

};

const presetEntitySlice = createSlice({
  name: 'presetEntity',
  initialState,
  reducers: {
    ...actionsQuery,
    ...actionsStates,
    ...actionsMutation,

  },
});

export const {
  setPresets,

  setHoveredPresetId,
  setFocusedPresetId,
  setSelectedPresetId,

  addPreset,
  updatePreset,
  removePreset,
  removePresetsFromCollection,

  // movePresetToCollection,

} = presetEntitySlice.actions;

export default presetEntitySlice.reducer;
