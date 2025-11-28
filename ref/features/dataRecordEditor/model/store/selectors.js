import { createSelector } from '@reduxjs/toolkit';

export const selectDbRecordEditorState = (state) => state.dbRecordEditor;

export const selectDraft = createSelector(
  selectDbRecordEditorState,
  (dbRecordEditor) => dbRecordEditor.draft,
);

// Проверяет, есть ли изменения в текущем активном черновике
export const selectHasDraftChanges = createSelector(
  selectDraft,
  (draft) => draft && draft.changes && Object.keys(draft.changes).length > 0,
);
