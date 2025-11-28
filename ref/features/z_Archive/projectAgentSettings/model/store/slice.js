import { createSlice } from '@reduxjs/toolkit';
import { initialAgentRoleSettingsTabsState, actionsAgentRoleSettingsTabs } from './agentRoleSettingsTabs/actions';

const initialState = {
  ... initialAgentRoleSettingsTabsState,
};

export const projectAgentSettingsSlice = createSlice({
  name: 'projectAgentSettings',
  initialState,
  reducers: {
    ...actionsAgentRoleSettingsTabs,
  },
});

export const {

  setSelectedAgentRoleSettingsTab,
  resetAgentRoleSettingsTab,

} = projectAgentSettingsSlice.actions;

export default projectAgentSettingsSlice.reducer;
