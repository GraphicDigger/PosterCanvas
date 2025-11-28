import { createSlice } from '@reduxjs/toolkit';
import { initialMemberRoleSettingsTabsState, actionsMemberRoleSettingsTabs } from './memberRoleSettingsTabs/actions';
import { initialAgentRoleSettingsTabsState, actionsAgentRoleSettingsTabs } from './agentRoleSettingsTabs/actions';

const initialState = {
  ... initialMemberRoleSettingsTabsState,
  ... initialAgentRoleSettingsTabsState,
};

export const projectRoleSettingsSlice = createSlice({
  name: 'projectRoleSettings',
  initialState,
  reducers: {
    ...actionsMemberRoleSettingsTabs,
    ...actionsAgentRoleSettingsTabs,
  },
});

export const {

  setSelectedMemberRoleSettingsTab,
  resetMemberRoleSettingsTab,

  setSelectedAgentRoleSettingsTab,
  resetAgentRoleSettingsTab,

} = projectRoleSettingsSlice.actions;

export default projectRoleSettingsSlice.reducer;
