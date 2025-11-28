import { createSlice } from '@reduxjs/toolkit';
import { initialUIState, actionsUIState } from './actionsStates';
import { initialEntities, actionsQueries } from './actionsQueries';
import { actionsMutation } from './actionsMutation';

const initialState = {
  ...initialEntities,
  ...initialUIState,
};

const presetModeValueEntitySlice = createSlice({
  name: 'presetModeValueEntity',
  initialState,
  reducers: {
    ...actionsUIState,
    ...actionsQueries,
    ...actionsMutation,
  },
});

export const {

  setPresetModeValues,

  setHoveredPresetModeValueId,
  setFocusedPresetModeValueId,
  setSelectedPresetModeValueId,

  addPresetModeValue,
  updatePresetModeValue,
  removePresetModeValue,
  removePresetModeValues,
  removePresetModeValuesByVariableModeId,

} = presetModeValueEntitySlice.actions;

export default presetModeValueEntitySlice.reducer;
