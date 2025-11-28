import { createSlice } from '@reduxjs/toolkit';
import { initialSidebarModeState, actionsSidebarMode } from './actionsSidebarMode';

const initialState = {
  ...initialSidebarModeState,
};

export const presetManagerSlice = createSlice({
  name: 'presetManager',
  initialState,
  reducers: {
    ...actionsSidebarMode,
  },
});

export const {
  setMode,
  resetMode,

} = presetManagerSlice.actions;

export default presetManagerSlice.reducer;
