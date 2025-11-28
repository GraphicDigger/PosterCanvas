import { createSlice } from '@reduxjs/toolkit';
import { initialModelFieldDraftState, actionsModelFieldDraft  } from './actionsModelFieldDraft';

const initialState = {
  ...initialModelFieldDraftState,
};

export const dbModelEditorSlice = createSlice({
  name: 'dbModelEditor',
  initialState,
  reducers: {
    ...actionsModelFieldDraft,
  },
});

export const {
  addFieldToDraft,
  updateDraftModelField,
  clearModelDraft,

} = dbModelEditorSlice.actions;


export default dbModelEditorSlice.reducer;
