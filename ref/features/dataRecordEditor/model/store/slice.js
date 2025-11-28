import { createSlice } from '@reduxjs/toolkit';
import { saveDraftRecordThunk } from './thunks';

const initialState = {
  draft: {
    recordId: null,
    changes: {},
  },
};

const dbRecordEditorSlice = createSlice({
  name: 'dbRecordEditor',
  initialState,
  reducers: {

    updateDraftField: (state, action) => {
      const { recordId, modelFieldId, value } = action.payload;

      if (state.draft.recordId === null && recordId) {
        state.draft.recordId = recordId;
      }
      if (state.draft.recordId === recordId) {
        state.draft.changes[modelFieldId] = value;
      }
    },

    clearDraft: (state) => {
      state.draft = initialState.draft;
    },

  },
});

export const {
  updateDraftField,
  clearDraft,
} = dbRecordEditorSlice.actions;

export { saveDraftRecordThunk };

export default dbRecordEditorSlice.reducer;
