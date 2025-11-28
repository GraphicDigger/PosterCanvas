import { TEAMS_MODES } from '../../constants/workspaceModes';

export const initialTeamsModes = {
  teamsModes: {
    [TEAMS_MODES.LIST]: true,
    [TEAMS_MODES.STATS]: false,
    [TEAMS_MODES.DETAIL]: false,
  },
};

export const actionsTeamsMode = {
  // Установка одного режима (выключает все остальные основные режимы)
  setWSTeamsMode: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.teamsModes[TEAMS_MODES.LIST] = false;
    state.teamsModes[TEAMS_MODES.STATS] = false;

    // Включаем выбранный режим
    state.teamsModes[action.payload] = true;
    console.log(`🏢 Teams Mode —> ${action.payload}`);
  },

  // Установка нескольких режимов одновременно
  setWSTeamsModes: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.teamsModes[TEAMS_MODES.LIST] = false;
    state.teamsModes[TEAMS_MODES.STATS] = false;

    // Включаем выбранные режимы
    action.payload.forEach(mode => {
      state.teamsModes[mode] = true;
    });
    console.log('🏢 Teams Modes Set');
  },

  // Выключение конкретного режима
  resetWSTeamsMode: (state, action) => {
    state.teamsModes[action.payload] = false;
    console.log(`🏢 Teams Mode Reset —> ${action.payload}`);

    // Если все основные режимы выключены, включаем режим по умолчанию
    const hasMainMode =
            state.teamsModes[TEAMS_MODES.LIST] ||
            state.teamsModes[TEAMS_MODES.STATS];

    if (!hasMainMode) {
      state.teamsModes[TEAMS_MODES.LIST] = true;
    }
  },

  // Сброс всех режимов к начальным значениям
  resetWSTeamsModes: (state) => {
    state.teamsModes = { ...initialTeamsModes };
    console.log('🏢 All Teams Modes Reset');
  },

  // Установка дополнительного режима (не влияет на основные режимы)
  setWSDetailMode: (state) => {
    state.teamsModes[TEAMS_MODES.DETAIL] = true;
    console.log('🏢 Detail Mode —> ON');
  },

  // Переключение режимов

  // Переключение между списком и статистикой
  toggleWSTeamsListStats: (state) => {
    if (state.teamsModes[TEAMS_MODES.LIST]) {
      state.teamsModes[TEAMS_MODES.LIST] = false;
      state.teamsModes[TEAMS_MODES.STATS] = true;
    } else {
      state.teamsModes[TEAMS_MODES.LIST] = true;
      state.teamsModes[TEAMS_MODES.STATS] = false;
    }
    console.log('🏢 Toggle List/Stats');
  },

  // Переключение между обычным и детальным видом
  toggleWSTeamsDetail: (state) => {
    state.teamsModes[TEAMS_MODES.DETAIL] = !state.teamsModes[TEAMS_MODES.DETAIL];
    console.log(`🏢 Toggle Detail —> ${state.teamsModes[TEAMS_MODES.DETAIL] ? 'ON' : 'OFF'}`);
  },
};
