import { createSlice } from '@reduxjs/toolkit';
import { TABS } from '../constants/tabs';

const initialState = {
  selectedTab: TABS.STYLE,
};

export const elementSidebarSlice = createSlice({
  name: 'elementSidebar',
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = elementSidebarSlice.actions;
export default elementSidebarSlice.reducer;
