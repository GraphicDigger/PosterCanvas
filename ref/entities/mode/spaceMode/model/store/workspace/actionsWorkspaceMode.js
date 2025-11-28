import { WORKSPACE_MODES } from '../../constants/workspaceModes';
import { actionsTasksMode, initialTasksModes } from './actionsTasksMode';
import { actionsProjectsMode, initialProjectsModes } from './actionsProjectsMode';
import { actionsMembersMode, initialMembersModes } from './actionsMembersMode';
import { actionsGoalsMode, initialGoalsModes } from './actionsGoalsMode';
import { actionsTeamsMode, initialTeamsModes } from './actionsTeamsMode';

export const initialWorkspaceMode = {
  workspaceMode: WORKSPACE_MODES.TASKS,
};

export const actionsWorkspaceMode = {
  // set workspace mode
  setWorkspaceMode: (state, action) => {
    const prevMode = state.workspaceMode;
    state.workspaceMode = action.payload;
    console.log('🏠 Workspace Mode —>', action.payload);
  },

  resetWorkspaceMode: (state) => {
    state.workspaceMode = initialWorkspaceMode.workspaceMode;
    state.tasksModes = initialTasksModes;
    state.projectsModes = initialProjectsModes;
    state.membersModes = initialMembersModes;
    state.goalsModes = initialGoalsModes;
    state.teamsModes = initialTeamsModes;
  },

  // tasks -> projects
  toggleWSTasksProjects: (state) => {
    if (state.workspaceMode === WORKSPACE_MODES.TASKS) {
      state.workspaceMode = WORKSPACE_MODES.PROJECTS;
      Object.keys(state.tasksModes).forEach(mode => {
        state.tasksModes[mode] = false;
      });
      actionsProjectsMode.resetWSProjectsModes(state);
    } else if (state.workspaceMode === WORKSPACE_MODES.PROJECTS) {
      state.workspaceMode = WORKSPACE_MODES.TASKS;
      Object.keys(state.projectsModes).forEach(mode => {
        state.projectsModes[mode] = false;
      });
      actionsTasksMode.resetWSTasksModes(state);
    }
  },

  // projects -> members
  toggleWSProjectsMembers: (state) => {
    if (state.workspaceMode === WORKSPACE_MODES.PROJECTS) {
      state.workspaceMode = WORKSPACE_MODES.MEMBERS;
      Object.keys(state.projectsModes).forEach(mode => {
        state.projectsModes[mode] = false;
      });
      actionsMembersMode.resetWSMembersModes(state);
    } else if (state.workspaceMode === WORKSPACE_MODES.MEMBERS) {
      state.workspaceMode = WORKSPACE_MODES.PROJECTS;
      Object.keys(state.membersModes).forEach(mode => {
        state.membersModes[mode] = false;
      });
      actionsProjectsMode.resetWSProjectsModes(state);
    }
  },

  // members -> teams
  toggleWSTeamsMembers: (state) => {
    if (state.workspaceMode === WORKSPACE_MODES.MEMBERS) {
      state.workspaceMode = WORKSPACE_MODES.TEAMS;
      Object.keys(state.membersModes).forEach(mode => {
        state.membersModes[mode] = false;
      });
      actionsTeamsMode.resetWSTeamsModes(state);
    } else if (state.workspaceMode === WORKSPACE_MODES.TEAMS) {
      state.workspaceMode = WORKSPACE_MODES.MEMBERS;
      Object.keys(state.teamsModes).forEach(mode => {
        state.teamsModes[mode] = false;
      });
      actionsMembersMode.resetWSMembersModes(state);
    }
  },

  // teams -> goals
  toggleWSTeamsGoals: (state) => {
    if (state.workspaceMode === WORKSPACE_MODES.TEAMS) {
      state.workspaceMode = WORKSPACE_MODES.GOALS;
      Object.keys(state.teamsModes).forEach(mode => {
        state.teamsModes[mode] = false;
      });
      actionsGoalsMode.resetWSGoalsModes(state);
    } else if (state.workspaceMode === WORKSPACE_MODES.GOALS) {
      state.workspaceMode = WORKSPACE_MODES.TEAMS;
      Object.keys(state.goalsModes).forEach(mode => {
        state.goalsModes[mode] = false;
      });
      actionsTeamsMode.resetWSTeamsModes(state);
    }
  },
};
