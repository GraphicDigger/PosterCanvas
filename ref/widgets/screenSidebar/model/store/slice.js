import { createSlice } from '@reduxjs/toolkit';
import { TABS } from '../constants/tabs';

const initialState = {
  selectedTab: TABS.STYLE,
};

export const screenSidebarSlice = createSlice({
  name: 'screenSidebar',
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = screenSidebarSlice.actions;
export default screenSidebarSlice.reducer;
