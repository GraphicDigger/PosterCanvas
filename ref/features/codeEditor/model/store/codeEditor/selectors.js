import { createSelector } from '@reduxjs/toolkit';

const selectCodeEditorState = state => state.codeEditor;

export const selectCodeTabs = state => selectCodeEditorState(state).codeTabs;
export const selectActiveCodeId = state => selectCodeEditorState(state).activeCodeId;

export const selectActiveCode = createSelector(
  [selectCodeTabs, selectActiveCodeId],
  (codeTabs, activeCodeId) => codeTabs.find(code => code.id === activeCodeId),
);
