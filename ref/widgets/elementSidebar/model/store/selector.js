import { createSelector } from '@reduxjs/toolkit';
import { TABS } from '../constants/tabs';

export const selectSelectedTab = (state) => state?.elementSidebar?.selectedTab;

const tabsArray = Object.values(TABS);

export const selectorElementSidebar = createSelector(
  [
    selectSelectedTab,
  ],
  (selectedTab) => {
    return {
      selectedTab: selectedTab,
      tabs: tabsArray,
    };
  },
);
