import { createSlice } from '@reduxjs/toolkit';
import { initialModeState, actionsMode } from './actions';

const initialState = {
  ...initialModeState,
};

export const explorerSidebarSlice = createSlice({
  name: 'explorerSidebar',
  initialState,
  reducers: {
    ...actionsMode,
  },
});

export const {
  setSubMode,
  resetSubMode,
  setMode,
  resetMode,
  toggleSettings,
  toggleGlobalSearch,
} = explorerSidebarSlice.actions;

export default explorerSidebarSlice.reducer;
