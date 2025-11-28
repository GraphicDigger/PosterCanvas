import { createSelector } from '@reduxjs/toolkit';
import { MEMBER_ROLE_SETTINGS_SECTIONS } from '../../constants';

export const selectSelectedMemberRoleSettingsTab = (state) => state.projectRoleSettings.memberRoleSettingsTabs.selectedTab;

export const selectMemberRoleSettingsTabs = createSelector([selectSelectedMemberRoleSettingsTab], (selectedTab) => {
  return {
    selectedTab: selectedTab,
    tabs: Object.values(MEMBER_ROLE_SETTINGS_SECTIONS),
  };
},
);
