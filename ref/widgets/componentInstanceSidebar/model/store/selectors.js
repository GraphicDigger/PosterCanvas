import { createSelector } from '@reduxjs/toolkit';
import { TABS } from '../constants/tabs';

export const selectSelectedTab = (state) => state?.instanceSidebar?.selectedTab;

export const selectorInstanceSidebar = createSelector(
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
