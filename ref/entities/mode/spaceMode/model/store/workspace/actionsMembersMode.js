import { MEMBERS_MODES } from '../../constants/workspaceModes';

export const initialMembersModes = {
  membersModes: {
    [MEMBERS_MODES.LIST]: true,
    [MEMBERS_MODES.ACTIVITY]: false,
    [MEMBERS_MODES.DETAIL]: false,
  },
};

export const actionsMembersMode = {
  // Установка одного режима (выключает все остальные основные режимы)
  setWSMembersMode: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.membersModes[MEMBERS_MODES.LIST] = false;
    state.membersModes[MEMBERS_MODES.ACTIVITY] = false;

    // Включаем выбранный режим
    state.membersModes[action.payload] = true;
    console.log(`🏢 Members Mode —> ${action.payload}`);
  },

  // Установка нескольких режимов одновременно
  setWSMembersModes: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.membersModes[MEMBERS_MODES.LIST] = false;
    state.membersModes[MEMBERS_MODES.ACTIVITY] = false;

    // Включаем выбранные режимы
    action.payload.forEach(mode => {
      state.membersModes[mode] = true;
    });
    console.log('🏢 Members Modes Set');
  },

  // Выключение конкретного режима
  resetWSMembersMode: (state, action) => {
    state.membersModes[action.payload] = false;
    console.log(`🏢 Members Mode Reset —> ${action.payload}`);

    // Если все основные режимы выключены, включаем режим по умолчанию
    const hasMainMode =
            state.membersModes[MEMBERS_MODES.LIST] ||
            state.membersModes[MEMBERS_MODES.ACTIVITY];

    if (!hasMainMode) {
      state.membersModes[MEMBERS_MODES.LIST] = true;
    }
  },

  // Сброс всех режимов к начальным значениям
  resetWSMembersModes: (state) => {
    state.membersModes = { ...initialMembersModes };
    console.log('🏢 All Members Modes Reset');
  },

  // Установка дополнительного режима (не влияет на основные режимы)
  setWSMDetailMode: (state) => {
    state.membersModes[MEMBERS_MODES.DETAIL] = true;
    console.log('🏢 Detail Mode —> ON');
  },

  // Переключение между списком и активностью
  toggleWSListActivity: (state) => {
    if (state.membersModes[MEMBERS_MODES.LIST]) {
      state.membersModes[MEMBERS_MODES.LIST] = false;
      state.membersModes[MEMBERS_MODES.ACTIVITY] = true;
    } else {
      state.membersModes[MEMBERS_MODES.LIST] = true;
      state.membersModes[MEMBERS_MODES.ACTIVITY] = false;
    }
    console.log('🏢 Toggle List/Activity');
  },
};
