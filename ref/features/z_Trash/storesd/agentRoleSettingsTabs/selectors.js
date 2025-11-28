import { createSelector } from '@reduxjs/toolkit';
import { AGENT_ROLE_SETTINGS_SECTIONS } from '../../constants';

export const selectSelectedAgentRoleSettingsTab = (state) => state.projectRoleSettings.agentRoleSettingsTabs.selectedTab;

export const selectAgentRoleSettingsTabs = createSelector([selectSelectedAgentRoleSettingsTab], (selectedTab) => {
  return {
    selectedTab: selectedTab,
    tabs: Object.values(AGENT_ROLE_SETTINGS_SECTIONS),
  };
},
);
