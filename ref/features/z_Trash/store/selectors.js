import { createSelector } from '@reduxjs/toolkit';

export const selectEntityManagePanelState = (state) => state.entityManagePanel;

export const selectorStateEntityManagePanel = createSelector(
  [selectEntityManagePanelState],
  (stateEntityManagePanel) => {
    return {
      isOpenEntityManagePanel: stateEntityManagePanel.isOpenEntityManagePanel,
    };
  },
);

