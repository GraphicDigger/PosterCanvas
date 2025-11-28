import {
  WORKSPACE_MODES,
  TASKS_MODES,
  PROJECTS_MODES,
  MEMBERS_MODES,
  GOALS_MODES,
  TEAMS_MODES,
  SETTINGS_MODES,
} from '../../constants/workspaceModes';

// Основные селекторы рабочего пространства
export const selectWorkspaceMode = (state) => state.spaceModes.workspaceMode;

// Селекторы для рабочего пространства
export const selectIsWSTasksWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.TASKS;
export const selectIsWSProjectsWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.PROJECTS;
export const selectIsWSMembersWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.MEMBERS;
export const selectIsWSGoalsWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.GOALS;
export const selectIsWSReportsWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.REPORTS;
export const selectIsWSResourcesWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.RESOURCES;
export const selectIsWSCalendarWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.CALENDAR;
export const selectIsWSTeamsWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.TEAMS;
export const selectIsWSSettingsWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.SETTINGS;
export const selectIsWSActivityWorkspace = (state) => state.spaceModes.workspaceMode === WORKSPACE_MODES.ACTIVITY;
// Селекторы режимов задач
export const selectIsWSTasksListMode = (state) => state.spaceModes.tasksModes[TASKS_MODES.LIST];
export const selectIsWSTasksBoardMode = (state) => state.spaceModes.tasksModes[TASKS_MODES.BOARD];
export const selectIsWSTasksCalendarMode = (state) => state.spaceModes.tasksModes[TASKS_MODES.CALENDAR];
export const selectIsWSTasksGanttMode = (state) => state.spaceModes.tasksModes[TASKS_MODES.GANTT];
export const selectIsWSTasksStatisticsMode = (state) => state.spaceModes.tasksModes[TASKS_MODES.STATISTICS];
export const selectIsWSTasksDetailMode = (state) => state.spaceModes.tasksModes[TASKS_MODES.DETAIL];

// Селекторы режимов проектов
export const selectIsWSProjectsListMode = (state) => state.spaceModes.projectsModes[PROJECTS_MODES.LIST];
export const selectIsWSProjectsRoadmapMode = (state) => state.spaceModes.projectsModes[PROJECTS_MODES.ROADMAP];
export const selectIsWSProjectsProgressMode = (state) => state.spaceModes.projectsModes[PROJECTS_MODES.PROGRESS];
export const selectIsWSProjectsDetailMode = (state) => state.spaceModes.projectsModes[PROJECTS_MODES.DETAIL];

// Селекторы режимов участников
export const selectIsWSMembersListMode = (state) => state.spaceModes.membersModes[MEMBERS_MODES.LIST];
export const selectIsWSMembersActivityMode = (state) => state.spaceModes.membersModes[MEMBERS_MODES.ACTIVITY];
export const selectIsWSMembersDetailMode = (state) => state.spaceModes.membersModes[MEMBERS_MODES.DETAIL];

// Селекторы режимов целей
export const selectIsWSGoalsListMode = (state) => state.spaceModes.goalsModes[GOALS_MODES.LIST];
export const selectIsWSGoalsProgressMode = (state) => state.spaceModes.goalsModes[GOALS_MODES.PROGRESS];
export const selectIsWSGoalsKPIMode = (state) => state.spaceModes.goalsModes[GOALS_MODES.KPI];
export const selectIsWSGoalsDetailMode = (state) => state.spaceModes.goalsModes[GOALS_MODES.DETAIL];

// Селекторы режимов команд
export const selectIsWSTeamsListMode = (state) => state.spaceModes.teamsModes[TEAMS_MODES.LIST];
export const selectIsWSTeamsStatsMode = (state) => state.spaceModes.teamsModes[TEAMS_MODES.STATS];
export const selectIsWSTeamsDetailMode = (state) => state.spaceModes.teamsModes[TEAMS_MODES.DETAIL];

// Селекторы режимов настроек
export const selectIsWSSettingsGeneralMode = (state) => state.spaceModes.settingsModes[SETTINGS_MODES.GENERAL];
export const selectIsWSSettingsPositionMode = (state) => state.spaceModes.settingsModes[SETTINGS_MODES.POSITION];
export const selectIsWSSettingsRolesMode = (state) => state.spaceModes.settingsModes[SETTINGS_MODES.ROLES];
export const selectIsWSSettingsDetailMode = (state) => state.spaceModes.settingsModes[SETTINGS_MODES.DETAIL];
