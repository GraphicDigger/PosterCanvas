import { createSelector } from '@reduxjs/toolkit';
import { TABS } from '../constants/tabs';

export const selectSelectedTab = (state) => state?.screenSidebar?.selectedTab;

export const selectorScreenSidebar = createSelector(
  [
    selectSelectedTab,
  ],
  (selectedTab) => {
    return {
      selectedTab: selectedTab,
      tabs: Object.values(TABS),
    };
  },
);
