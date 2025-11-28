import { GOALS_MODES } from '../../constants/workspaceModes';

export const initialGoalsModes = {
  goalsModes: {
    [GOALS_MODES.LIST]: true,
    [GOALS_MODES.PROGRESS]: false,
    [GOALS_MODES.KPI]: false,
    [GOALS_MODES.DETAIL]: false,
  },
};

export const actionsGoalsMode = {
  // Установка одного режима (выключает все остальные основные режимы)
  setWSGoalsMode: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.goalsModes[GOALS_MODES.LIST] = false;
    state.goalsModes[GOALS_MODES.PROGRESS] = false;
    state.goalsModes[GOALS_MODES.KPI] = false;

    // Включаем выбранный режим
    state.goalsModes[action.payload] = true;
    console.log(`🏢 Goals Mode —> ${action.payload}`);
  },

  // Установка нескольких режимов одновременно
  setWSGoalsModes: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.goalsModes[GOALS_MODES.LIST] = false;
    state.goalsModes[GOALS_MODES.PROGRESS] = false;
    state.goalsModes[GOALS_MODES.KPI] = false;

    // Включаем выбранные режимы
    action.payload.forEach(mode => {
      state.goalsModes[mode] = true;
    });
    console.log('🏢 Goals Modes Set');
  },

  // Выключение конкретного режима
  resetWSGoalsMode: (state, action) => {
    state.goalsModes[action.payload] = false;
    console.log(`🏢 Goals Mode Reset —> ${action.payload}`);

    // Если все основные режимы выключены, включаем режим по умолчанию
    const hasMainMode =
            state.goalsModes[GOALS_MODES.LIST] ||
            state.goalsModes[GOALS_MODES.PROGRESS] ||
            state.goalsModes[GOALS_MODES.KPI];

    if (!hasMainMode) {
      state.goalsModes[GOALS_MODES.LIST] = true;
    }
  },

  // Сброс всех режимов к начальным значениям
  resetWSGoalsModes: (state) => {
    state.goalsModes = { ...initialGoalsModes };
    console.log('🏢 All Goals Modes Reset');
  },

  // Установка дополнительного режима (не влияет на основные режимы)
  setWSDetailMode: (state) => {
    state.goalsModes[GOALS_MODES.DETAIL] = true;
    console.log('🏢 Detail Mode —> ON');
  },

  // Переключение режимов

  // Переключение между списком и прогрессом
  toggleWSGoalsListProgress: (state) => {
    if (state.goalsModes[GOALS_MODES.LIST]) {
      state.goalsModes[GOALS_MODES.LIST] = false;
      state.goalsModes[GOALS_MODES.PROGRESS] = true;
    } else {
      state.goalsModes[GOALS_MODES.LIST] = true;
      state.goalsModes[GOALS_MODES.PROGRESS] = false;
    }
    console.log('🏢 Toggle List/Progress');
  },

  // Переключение между обычным и детальным видом
  toggleWSGoalsDetail: (state) => {
    state.goalsModes[GOALS_MODES.DETAIL] = !state.goalsModes[GOALS_MODES.DETAIL];
    console.log(`🏢 Toggle Detail —> ${state.goalsModes[GOALS_MODES.DETAIL] ? 'ON' : 'OFF'}`);
  },

  // Переключение между списком и KPI
  toggleWSListKPI: (state) => {
    if (state.goalsModes[GOALS_MODES.LIST]) {
      state.goalsModes[GOALS_MODES.LIST] = false;
      state.goalsModes[GOALS_MODES.KPI] = true;
    } else {
      state.goalsModes[GOALS_MODES.LIST] = true;
      state.goalsModes[GOALS_MODES.KPI] = false;
    }
    console.log('🏢 Toggle List/KPI');
  },
};
