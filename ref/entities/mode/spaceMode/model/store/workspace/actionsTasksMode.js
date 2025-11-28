import { TASKS_MODES } from '../../constants/workspaceModes';

export const initialTasksModes = {
  tasksModes: {
    [TASKS_MODES.LIST]: true,
    [TASKS_MODES.BOARD]: false,
    [TASKS_MODES.CALENDAR]: false,
    [TASKS_MODES.GANTT]: false,
    [TASKS_MODES.STATISTICS]: false,
    [TASKS_MODES.DETAIL]: false,
  },
};

export const actionsTasksMode = {
  // Установка одного режима (выключает все остальные основные режимы)
  setWSTasksMode: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.tasksModes[TASKS_MODES.LIST] = false;
    state.tasksModes[TASKS_MODES.BOARD] = false;
    state.tasksModes[TASKS_MODES.CALENDAR] = false;
    state.tasksModes[TASKS_MODES.GANTT] = false;

    // Включаем выбранный режим
    state.tasksModes[action.payload] = true;
    console.log(`🏢 Tasks Mode —> ${action.payload}`);
  },

  // Установка нескольких режимов одновременно
  setWSTasksModes: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.tasksModes[TASKS_MODES.LIST] = false;
    state.tasksModes[TASKS_MODES.BOARD] = false;
    state.tasksModes[TASKS_MODES.CALENDAR] = false;
    state.tasksModes[TASKS_MODES.GANTT] = false;

    // Включаем выбранные режимы
    action.payload.forEach(mode => {
      state.tasksModes[mode] = true;
    });
    console.log('🏢 Tasks Modes Set');
  },

  // Выключение конкретного режима
  resetWSTasksMode: (state, action) => {
    state.tasksModes[action.payload] = false;
    console.log(`🏢 Tasks Mode Reset —> ${action.payload}`);

    // Если все основные режимы выключены, включаем режим по умолчанию
    const hasMainMode =
            state.tasksModes[TASKS_MODES.LIST] ||
            state.tasksModes[TASKS_MODES.BOARD] ||
            state.tasksModes[TASKS_MODES.CALENDAR] ||
            state.tasksModes[TASKS_MODES.GANTT];

    if (!hasMainMode) {
      state.tasksModes[TASKS_MODES.LIST] = true;
    }
  },

  // Сброс всех режимов к начальным значениям
  resetWSTasksModes: (state) => {
    state.tasksModes = { ...initialTasksModes };
    console.log('🏢 All Tasks Modes Reset');
  },

  // Установка дополнительного режима (не влияет на основные режимы)
  setWSDetailMode: (state) => {
    state.tasksModes[TASKS_MODES.DETAIL] = true;
    console.log('🏢 Detail Mode —> ON');
  },

  // Установка режима статистики (не влияет на основные режимы)
  setWSStatisticsMode: (state) => {
    state.tasksModes[TASKS_MODES.STATISTICS] = true;
    console.log('🏢 Statistics Mode —> ON');
  },

  // Переключение режимов

  // Переключение между списком и доской
  toggleWSTasksListBoard: (state) => {
    if (state.tasksModes[TASKS_MODES.LIST]) {
      state.tasksModes[TASKS_MODES.LIST] = false;
      state.tasksModes[TASKS_MODES.BOARD] = true;
    } else {
      state.tasksModes[TASKS_MODES.LIST] = true;
      state.tasksModes[TASKS_MODES.BOARD] = false;
    }
    console.log('🏢 Toggle List/Board');
  },

  // Переключение между обычным и детальным видом
  toggleWSTasksDetail: (state) => {
    state.tasksModes[TASKS_MODES.DETAIL] = !state.tasksModes[TASKS_MODES.DETAIL];
    console.log(`🏢 Toggle Detail —> ${state.tasksModes[TASKS_MODES.DETAIL] ? 'ON' : 'OFF'}`);
  },

  // Переключение режима статистики
  toggleWSTasksStatistics: (state) => {
    state.tasksModes[TASKS_MODES.STATISTICS] = !state.tasksModes[TASKS_MODES.STATISTICS];
    console.log(`🏢 Toggle Statistics —> ${state.tasksModes[TASKS_MODES.STATISTICS] ? 'ON' : 'OFF'}`);
  },

  // Переключение между календарем и диаграммой Ганта
  toggleWSTasksCalendarGantt: (state) => {
    if (state.tasksModes[TASKS_MODES.CALENDAR]) {
      state.tasksModes[TASKS_MODES.CALENDAR] = false;
      state.tasksModes[TASKS_MODES.GANTT] = true;
    } else {
      state.tasksModes[TASKS_MODES.CALENDAR] = true;
      state.tasksModes[TASKS_MODES.GANTT] = false;
    }
    console.log('🏢 Toggle Calendar/Gantt');
  },
};
