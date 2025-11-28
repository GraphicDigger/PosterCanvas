import { createSlice } from '@reduxjs/toolkit';
import { actionsSpaceMode, initialSpaceMode } from './spaces/actionsSpaceMode';
import { actionsWorkspaceMode, initialWorkspaceMode } from './workspace/actionsWorkspaceMode';
import { actionsTasksMode, initialTasksModes } from './workspace/actionsTasksMode';
import { actionsProjectsMode, initialProjectsModes } from './workspace/actionsProjectsMode';
import { actionsMembersMode, initialMembersModes } from './workspace/actionsMembersMode';
import { actionsGoalsMode, initialGoalsModes } from './workspace/actionsGoalsMode';
import { actionsTeamsMode, initialTeamsModes } from './workspace/actionsTeamsMode';
import { actionsUserspaceMode, initialUserspaceMode } from './userspace/actionsUserspaceMode';
import { actionsProfileMode, initialProfileModes } from './userspace/actionsProfileMode';
import { actionsWorkspacesMode, initialWorkspacesModes } from './userspace/actionsWorkspacesMode';
import { actionsSettingsMode, initialSettingsModes } from './workspace/actionsSettingsMode';
import { store } from '../../../../../app/store';

const initialState = {

  ...initialSpaceMode,
  ...initialWorkspaceMode,
  ...initialTasksModes,
  ...initialProjectsModes,
  ...initialMembersModes,
  ...initialGoalsModes,
  ...initialTeamsModes,
  ...initialSettingsModes,
  ...initialUserspaceMode,
  ...initialProfileModes,
  ...initialWorkspacesModes,
};

const spaceModesSlice = createSlice({
  name: 'spaceModes',
  initialState,
  reducers: {

    ...actionsSpaceMode,
    ...actionsWorkspaceMode,
    ...actionsTasksMode,
    ...actionsProjectsMode,
    ...actionsMembersMode,
    ...actionsGoalsMode,
    ...actionsTeamsMode,
    ...actionsSettingsMode,
    ...actionsUserspaceMode,
    ...actionsProfileMode,
    ...actionsWorkspacesMode,

  },
});

export const {
  // Space Mode Actions
  setSpaceMode,
  resetSpaceMode,
  toggleWorkspaceUserspace,

  // Userspace Mode Actions
  setUserspaceMode,
  resetUserspaceMode,
  toggleUSProfileWorkspaces,
  // Profile Mode Actions
  setUSProfileMode,
  setUSProfileModes,
  resetUSProfileMode,
  resetUSProfileModes,
  toggleUSExperienceSkills,
  // Workspaces Mode Actions
  setUSWorkspacesMode,
  setUSWorkspacesModes,
  resetUSWorkspacesMode,
  resetUSWorkspacesModes,
  toggleUSProjectsTeams,
  toggleUSTeamsMembers,
  toggleUSProjectsMembers,

  // Workspace Mode Actions
  setWorkspaceMode,
  resetWorkspaceMode,
  toggleWSTasksProjects,
  toggleWSProjectsMembers,
  toggleWSTeamsMembers,
  toggleWSTeamsGoals,
  // Tasks Mode Actions
  setWSTasksMode,
  setWSTasksModes,
  resetWSTasksMode,
  resetWSTasksModes,
  toggleWSTasksListBoard,
  toggleWSTasksDetail,
  toggleWSTasksStatistics,
  toggleWSTasksCalendarGantt,
  setWSDetailMode,
  setWSStatisticsMode,
  // Projects Mode Actions
  setWSProjectsMode,
  setWSProjectsModes,
  resetWSProjectsMode,
  resetWSProjectsModes,
  toggleWSListRoadmap,
  toggleWSProjectDetail,
  toggleWSListProgress,
  // Members Mode Actions
  setWSMembersMode,
  setWSMembersModes,
  resetWSMembersMode,
  resetWSMembersModes,
  toggleWSListActivity,

  // Goals Mode Actions
  setWSGoalsMode,
  setWSGoalsModes,
  resetWSGoalsMode,
  resetWSGoalsModes,
  toggleWSGoalsListProgress,
  toggleWSGoalsDetail,
  toggleWSListKPI,
  // Teams Mode Actions
  setWSTeamsMode,
  setWSTeamsModes,
  resetWSTeamsMode,
  resetWSTeamsModes,
  toggleWSTeamsListStats,
  toggleWSTeamsDetail,

  // Settings Mode Actions
  setWSSettingsMode,
  setWSSettingsModes,
  resetWSSettingsMode,
  resetWSSettingsModes,
  toggleWSSettingsGeneralPosition,
  toggleWSSettingsPositionRoles,
  toggleWSSettingsRolesGeneral,
  setWSSettingsDetailMode,
  resetWSSettingsDetailMode,
  toggleWSSettingsDetailMode,
} = spaceModesSlice.actions;

export default spaceModesSlice.reducer;
