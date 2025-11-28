import { USERSPACE_MODES } from '../../constants/userspaceMode';
import { actionsProfileMode, initialProfileModes } from './actionsProfileMode';
import { actionsWorkspacesMode, initialWorkspacesModes } from './actionsWorkspacesMode';

export const initialUserspaceMode = {
  userspaceMode: USERSPACE_MODES.PROFILE,
};

export const actionsUserspaceMode = {
  // set userspace mode
  setUserspaceMode: (state, action) => {
    const prevMode = state.userspaceMode;
    state.userspaceMode = action.payload;
    console.log('👤 Userspace Mode —>', action.payload);

    // Сбрасываем режимы предыдущего пространства
    if (prevMode === USERSPACE_MODES.PROFILE) {
      Object.keys(state.profileModes).forEach(mode => {
        state.profileModes[mode] = false;
      });
    } else if (prevMode === USERSPACE_MODES.WORKSPACES) {
      Object.keys(state.workspacesModes).forEach(mode => {
        state.workspacesModes[mode] = false;
      });
    }

    // Устанавливаем дефолтные режимы для нового пространства
    if (action.payload === USERSPACE_MODES.PROFILE) {
      actionsProfileMode.resetUSProfileModes(state);
    } else if (action.payload === USERSPACE_MODES.WORKSPACES) {
      actionsWorkspacesMode.resetUSWorkspacesModes(state);
    }
  },

  resetUserspaceMode: (state) => {
    state.userspaceMode = initialUserspaceMode.userspaceMode;
    state.profileModes = initialProfileModes;
    state.workspacesModes = initialWorkspacesModes;
  },

  // profile -> workspaces
  toggleUSProfileWorkspaces: (state) => {
    if (state.userspaceMode === USERSPACE_MODES.PROFILE) {
      state.userspaceMode = USERSPACE_MODES.WORKSPACES;
      Object.keys(state.profileModes).forEach(mode => {
        state.profileModes[mode] = false;
      });
      actionsWorkspacesMode.resetUSWorkspacesModes(state);
    } else if (state.userspaceMode === USERSPACE_MODES.WORKSPACES) {
      state.userspaceMode = USERSPACE_MODES.PROFILE;
      Object.keys(state.workspacesModes).forEach(mode => {
        state.workspacesModes[mode] = false;
      });
      actionsProfileMode.resetUSProfileModes(state);
    }
  },
};
