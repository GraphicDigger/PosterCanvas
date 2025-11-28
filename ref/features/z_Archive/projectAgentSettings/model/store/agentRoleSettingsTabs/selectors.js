import { createSelector } from '@reduxjs/toolkit';
import { AGENT_ROLE_SETTINGS_SECTIONS } from '../../constants';

export const selectSelectedAgentRoleSettingsTab = (state) => state.projectAgentSettings.agentRoleSettingsTabs.selectedTab;

export const selectAgentRoleSettingsTabs = createSelector([selectSelectedAgentRoleSettingsTab], (selectedTab) => {
  return {
    selectedTab: selectedTab,
    tabs: Object.values(AGENT_ROLE_SETTINGS_SECTIONS).filter((tab) => tab !== AGENT_ROLE_SETTINGS_SECTIONS.GENERAL),
  };
},
);
