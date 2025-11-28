import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  codeTabs: [],
  activeCodeId: null,
};

export const codeEditorSlice = createSlice({
  name: 'codeEditor',
  initialState,
  reducers: {
    setCodeTabs: (state, action) => {
      state.codeTabs = action.payload;
      state.activeCodeId = action.payload[0]?.id || null;
    },
    setActiveCodeId: (state, action) => {
      state.activeCodeId = action.payload;
    },
  },
});

export const {
  setCodeTabs,
  setActiveCodeId,
} = codeEditorSlice.actions;
export default codeEditorSlice.reducer;
