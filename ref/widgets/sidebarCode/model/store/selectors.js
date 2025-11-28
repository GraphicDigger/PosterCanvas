// src/widgets/customCodeSidebar/model/store/selectors.js
import { createSelector } from '@reduxjs/toolkit';

export const selectSelectedTab = (state) => state?.codeSidebar?.selectedTab;
export const selectCodeType = (state) => state?.codeSidebar?.codeType;
export const selectAvailableTabs = (state) => state?.codeSidebar?.availableTabs;

export const selectCodeSidebar = createSelector(
  [selectSelectedTab, selectAvailableTabs],
  (selectedTab, availableTabs) => ({
    selectedTab,
    tabs: availableTabs,
  }),
);
