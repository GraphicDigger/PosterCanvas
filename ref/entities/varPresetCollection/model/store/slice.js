import { createSlice } from '@reduxjs/toolkit';
import { actionsQueries, initialQueries } from './actionsQueries';
import { actionsUIStates, initialUIStates } from './actionsStates';
import { actionsMutation } from './actionsMutation';


const initialState = {
  ...initialQueries,
  ...initialUIStates,
};

const presetCollectionEntitySlice = createSlice({
  name: 'presetCollectionEntity',
  initialState,
  reducers: {

    ...actionsQueries,
    ...actionsUIStates,
    ...actionsMutation,
  },
});

export const {
  setPresetCollections,

  setHoveredPresetCollectionId,
  setFocusedPresetCollectionId,
  setSelectedPresetCollectionId,

  addPresetCollection,
  removePresetCollection,
  updatePresetCollection,
  // movePreset,
  // setCollectionPresets,
  // addModeToCollection,
  // updateCollectionPresetMode

} = presetCollectionEntitySlice.actions;

export default presetCollectionEntitySlice.reducer;
