import { USERSPACE_MODES, PROFILE_MODES, WORKSPACES_MODES } from '../../constants/userspaceMode';

// Селекторы основных режимов userspace
export const selectUserspaceMode = (state) => state.spaceModes.userspaceMode;
export const selectIsUSProfileMode = (state) => state.spaceModes.userspaceMode === USERSPACE_MODES.PROFILE;
export const selectIsUSWorkspacesMode = (state) => state.spaceModes.userspaceMode === USERSPACE_MODES.WORKSPACES;

// Селекторы подрежимов profile
export const selectUSProfileModes = (state) => state.spaceModes.profileModes;
export const selectIsUSProfileExperienceMode = (state) => state.spaceModes.profileModes?.[PROFILE_MODES.EXPERIENCE];
export const selectIsUSProfileSkillsMode = (state) => state.spaceModes.profileModes?.[PROFILE_MODES.SKILLS];

// Селекторы подрежимов workspaces
export const selectUSWorkspacesModes = (state) => state.spaceModes.workspacesModes;
export const selectIsUSWorkspacesProjectsMode = (state) => state.spaceModes.workspacesModes?.[WORKSPACES_MODES.PROJECTS];
export const selectIsUSWorkspacesTeamsMode = (state) => state.spaceModes.workspacesModes?.[WORKSPACES_MODES.TEAMS];
export const selectIsUSWorkspacesMembersMode = (state) => state.spaceModes.workspacesModes?.[WORKSPACES_MODES.MEMBERS];
