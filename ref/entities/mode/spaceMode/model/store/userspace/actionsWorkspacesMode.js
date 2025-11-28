import { WORKSPACES_MODES } from '../../constants/userspaceMode';

export const initialWorkspacesModes = {
  workspacesModes: {
    [WORKSPACES_MODES.PROJECTS]: true,
    [WORKSPACES_MODES.TEAMS]: false,
    [WORKSPACES_MODES.MEMBERS]: false,
  },
};

export const actionsWorkspacesMode = {
  // Установка одного режима (выключает все остальные основные режимы)
  setUSWorkspacesMode: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.workspacesModes[WORKSPACES_MODES.PROJECTS] = false;
    state.workspacesModes[WORKSPACES_MODES.TEAMS] = false;
    state.workspacesModes[WORKSPACES_MODES.MEMBERS] = false;

    // Включаем выбранный режим
    state.workspacesModes[action.payload] = true;
    console.log(`📂 Workspaces Mode —> ${action.payload}`);
  },

  // Установка нескольких режимов одновременно
  setUSWorkspacesModes: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.workspacesModes[WORKSPACES_MODES.PROJECTS] = false;
    state.workspacesModes[WORKSPACES_MODES.TEAMS] = false;
    state.workspacesModes[WORKSPACES_MODES.MEMBERS] = false;

    // Включаем выбранные режимы
    action.payload.forEach(mode => {
      state.workspacesModes[mode] = true;
    });
    console.log('📂 Workspaces Modes Set');
  },

  // Выключение конкретного режима
  resetUSWorkspacesMode: (state, action) => {
    state.workspacesModes[action.payload] = false;
    console.log(`📂 Workspaces Mode Reset —> ${action.payload}`);

    // Если все основные режимы выключены, включаем режим по умолчанию
    const hasMainMode =
            state.workspacesModes[WORKSPACES_MODES.PROJECTS] ||
            state.workspacesModes[WORKSPACES_MODES.TEAMS] ||
            state.workspacesModes[WORKSPACES_MODES.MEMBERS];

    if (!hasMainMode) {
      state.workspacesModes[WORKSPACES_MODES.PROJECTS] = true;
    }
  },

  // Сброс всех режимов к начальным значениям
  resetUSWorkspacesModes: (state) => {
    state.workspacesModes = { ...initialWorkspacesModes.workspacesModes };
    console.log('📂 All Workspaces Modes Reset');
  },

  // Переключение между Projects и Teams
  toggleUSProjectsTeams: (state) => {
    if (state.workspacesModes[WORKSPACES_MODES.PROJECTS]) {
      state.workspacesModes[WORKSPACES_MODES.PROJECTS] = false;
      state.workspacesModes[WORKSPACES_MODES.TEAMS] = true;
    } else {
      state.workspacesModes[WORKSPACES_MODES.PROJECTS] = true;
      state.workspacesModes[WORKSPACES_MODES.TEAMS] = false;
    }
    console.log('📂 Toggle Projects/Teams');
  },

  // Переключение между Teams и Members
  toggleUSTeamsMembers: (state) => {
    if (state.workspacesModes[WORKSPACES_MODES.TEAMS]) {
      state.workspacesModes[WORKSPACES_MODES.TEAMS] = false;
      state.workspacesModes[WORKSPACES_MODES.MEMBERS] = true;
    } else {
      state.workspacesModes[WORKSPACES_MODES.TEAMS] = true;
      state.workspacesModes[WORKSPACES_MODES.MEMBERS] = false;
    }
    console.log('📂 Toggle Teams/Members');
  },

  // Переключение между Projects и Members
  toggleUSProjectsMembers: (state) => {
    if (state.workspacesModes[WORKSPACES_MODES.PROJECTS]) {
      state.workspacesModes[WORKSPACES_MODES.PROJECTS] = false;
      state.workspacesModes[WORKSPACES_MODES.MEMBERS] = true;
    } else {
      state.workspacesModes[WORKSPACES_MODES.PROJECTS] = true;
      state.workspacesModes[WORKSPACES_MODES.MEMBERS] = false;
    }
    console.log('📂 Toggle Projects/Members');
  },
};
