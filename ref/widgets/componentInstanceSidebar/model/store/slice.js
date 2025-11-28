import { createSlice } from '@reduxjs/toolkit';
import { TABS } from '../constants/tabs';

const initialState = {
  selectedTab: TABS.PROPS,
};

export const instanceSidebarSlice = createSlice({
  name: 'instanceSidebar',
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = instanceSidebarSlice.actions;
export default instanceSidebarSlice.reducer;
