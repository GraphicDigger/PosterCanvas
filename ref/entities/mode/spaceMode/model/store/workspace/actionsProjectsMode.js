import { PROJECTS_MODES } from '../../constants/workspaceModes';

export const initialProjectsModes = {
  projectsModes: {
    [PROJECTS_MODES.LIST]: true,
    [PROJECTS_MODES.ROADMAP]: false,
    [PROJECTS_MODES.PROGRESS]: false,
    [PROJECTS_MODES.DETAIL]: false,
  },
};

export const actionsProjectsMode = {
  // Установка одного режима (выключает все остальные основные режимы)
  setWSProjectsMode: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.projectsModes[PROJECTS_MODES.LIST] = false;
    state.projectsModes[PROJECTS_MODES.ROADMAP] = false;
    state.projectsModes[PROJECTS_MODES.PROGRESS] = false;

    // Включаем выбранный режим
    state.projectsModes[action.payload] = true;
    console.log(`🏢 Projects Mode —> ${action.payload}`);
  },

  // Установка нескольких режимов одновременно
  setWSProjectsModes: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.projectsModes[PROJECTS_MODES.LIST] = false;
    state.projectsModes[PROJECTS_MODES.ROADMAP] = false;
    state.projectsModes[PROJECTS_MODES.PROGRESS] = false;

    // Включаем выбранные режимы
    action.payload.forEach(mode => {
      state.projectsModes[mode] = true;
    });
    console.log('🏢 Projects Modes Set');
  },

  // Выключение конкретного режима
  resetWSProjectsMode: (state, action) => {
    state.projectsModes[action.payload] = false;
    console.log(`🏢 Projects Mode Reset —> ${action.payload}`);

    // Если все основные режимы выключены, включаем режим по умолчанию
    const hasMainMode =
            state.projectsModes[PROJECTS_MODES.LIST] ||
            state.projectsModes[PROJECTS_MODES.ROADMAP] ||
            state.projectsModes[PROJECTS_MODES.PROGRESS];

    if (!hasMainMode) {
      state.projectsModes[PROJECTS_MODES.LIST] = true;
    }
  },

  // Сброс всех режимов к начальным значениям
  resetWSProjectsModes: (state) => {
    state.projectsModes = { ...initialProjectsModes };
    console.log('🏢 All Projects Modes Reset');
  },

  // Установка дополнительных режимов (не влияют на основные режимы)
  setWSDetailMode: (state) => {
    state.projectsModes[PROJECTS_MODES.DETAIL] = true;
    console.log('🏢 Detail Mode —> ON');
  },

  // Переключение режимов

  // Переключение между списком и дорожной картой
  toggleWSListRoadmap: (state) => {
    if (state.projectsModes[PROJECTS_MODES.LIST]) {
      state.projectsModes[PROJECTS_MODES.LIST] = false;
      state.projectsModes[PROJECTS_MODES.ROADMAP] = true;
    } else {
      state.projectsModes[PROJECTS_MODES.LIST] = true;
      state.projectsModes[PROJECTS_MODES.ROADMAP] = false;
    }
    console.log('🏢 Toggle List/Roadmap');
  },

  // Переключение между обычным и детальным видом
  toggleWSProjectDetail: (state) => {
    state.projectsModes[PROJECTS_MODES.DETAIL] = !state.projectsModes[PROJECTS_MODES.DETAIL];
    console.log(`🏢 Toggle Detail —> ${state.projectsModes[PROJECTS_MODES.DETAIL] ? 'ON' : 'OFF'}`);
  },

  // Переключение между списком и прогрессом
  toggleWSListProgress: (state) => {
    if (state.projectsModes[PROJECTS_MODES.LIST]) {
      state.projectsModes[PROJECTS_MODES.LIST] = false;
      state.projectsModes[PROJECTS_MODES.PROGRESS] = true;
    } else {
      state.projectsModes[PROJECTS_MODES.LIST] = true;
      state.projectsModes[PROJECTS_MODES.PROGRESS] = false;
    }
    console.log('🏢 Toggle List/Progress');
  },
};
