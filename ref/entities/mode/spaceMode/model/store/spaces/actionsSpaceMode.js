import { SPACE_MODES } from '../../constants/spaceModes';
import { actionsWorkspaceMode, initialWorkspaceMode } from '../workspace/actionsWorkspaceMode';
import { actionsUserspaceMode, initialUserspaceMode } from '../userspace/actionsUserspaceMode';

export const initialSpaceMode = {
  spaceMode: SPACE_MODES.WORKSPACE,
};

export const actionsSpaceMode = {
  // set space mode
  setSpaceMode: (state, action) => {
    const prevMode = state.spaceMode;
    state.spaceMode = action.payload;
    console.log('🌐 Space Mode —>', action.payload);

    // Сбрасываем режимы предыдущего пространства
    if (prevMode === SPACE_MODES.WORKSPACE) {
      // Сбрасываем все режимы workspace
      actionsWorkspaceMode.resetWorkspaceMode(state);
    } else if (prevMode === SPACE_MODES.USERSPACE) {
      // Сбрасываем все режимы userspace
      actionsUserspaceMode.resetUserspaceMode(state);
    }

    // Устанавливаем дефолтные режимы для нового пространства
    if (action.payload === SPACE_MODES.WORKSPACE) {
      // Инициализируем режимы workspace
      state.workspaceMode = initialWorkspaceMode.workspaceMode;
      actionsWorkspaceMode.resetWorkspaceMode(state);
    } else if (action.payload === SPACE_MODES.USERSPACE) {
      // Инициализируем режимы userspace
      state.userspaceMode = initialUserspaceMode.userspaceMode;
      actionsUserspaceMode.resetUserspaceMode(state);
    }
  },

  resetSpaceMode: (state) => {
    state.spaceMode = initialSpaceMode.spaceMode;
    // Сбрасываем все режимы
    actionsWorkspaceMode.resetWorkspaceMode(state);
    actionsUserspaceMode.resetUserspaceMode(state);
  },

  // workspace -> userspace
  toggleWorkspaceUserspace: (state) => {
    if (state.spaceMode === SPACE_MODES.WORKSPACE) {
      state.spaceMode = SPACE_MODES.USERSPACE;
      // Сбрасываем режимы workspace
      actionsWorkspaceMode.resetWorkspaceMode(state);
      // Инициализируем режимы userspace
      state.userspaceMode = initialUserspaceMode.userspaceMode;
      actionsUserspaceMode.resetUserspaceMode(state);
    } else if (state.spaceMode === SPACE_MODES.USERSPACE) {
      state.spaceMode = SPACE_MODES.WORKSPACE;
      // Сбрасываем режимы userspace
      actionsUserspaceMode.resetUserspaceMode(state);
      // Инициализируем режимы workspace
      state.workspaceMode = initialWorkspaceMode.workspaceMode;
      actionsWorkspaceMode.resetWorkspaceMode(state);
    }
  },
};
