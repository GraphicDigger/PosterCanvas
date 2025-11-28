import { MEMBER_ROLE_SETTINGS_SECTIONS } from '../../constants';

export const initialMemberRoleSettingsTabsState = {
  memberRoleSettingsTabs: {
    selectedTab: MEMBER_ROLE_SETTINGS_SECTIONS.GENERAL,
    tabs: MEMBER_ROLE_SETTINGS_SECTIONS,
  },
};

export const actionsMemberRoleSettingsTabs = {
  setSelectedMemberRoleSettingsTab: (state, action) => {
    state.memberRoleSettingsTabs.selectedTab = action.payload;
  },
  resetMemberRoleSettingsTab: (state) => {
    state.memberRoleSettingsTabs.selectedTab = initialMemberRoleSettingsTabsState.selectedTab;
  },

};
