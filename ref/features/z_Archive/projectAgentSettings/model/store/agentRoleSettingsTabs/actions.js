import { AGENT_ROLE_SETTINGS_SECTIONS } from '../../constants';

export const initialAgentRoleSettingsTabsState = {
  agentRoleSettingsTabs: {
    selectedTab: AGENT_ROLE_SETTINGS_SECTIONS.PROMPT,
    tabs: AGENT_ROLE_SETTINGS_SECTIONS,
  },
};

export const actionsAgentRoleSettingsTabs = {
  setSelectedAgentRoleSettingsTab: (state, action) => {
    state.agentRoleSettingsTabs.selectedTab = action.payload;
  },
  resetAgentRoleSettingsTab: (state) => {
    state.agentRoleSettingsTabs.selectedTab = initialAgentRoleSettingsTabsState.selectedTab;
  },
};
