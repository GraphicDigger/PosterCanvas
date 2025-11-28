import { PROFILE_MODES } from '../../constants/userspaceMode';

export const initialProfileModes = {
  profileModes: {
    [PROFILE_MODES.EXPERIENCE]: true,
    [PROFILE_MODES.SKILLS]: false,
  },
};

export const actionsProfileMode = {
  // Установка одного режима (выключает все остальные основные режимы)
  setUSProfileMode: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.profileModes[PROFILE_MODES.EXPERIENCE] = false;
    state.profileModes[PROFILE_MODES.SKILLS] = false;

    // Включаем выбранный режим
    state.profileModes[action.payload] = true;
    console.log(`👨‍💼 Profile Mode —> ${action.payload}`);
  },

  // Установка нескольких режимов одновременно
  setUSProfileModes: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.profileModes[PROFILE_MODES.EXPERIENCE] = false;
    state.profileModes[PROFILE_MODES.SKILLS] = false;

    // Включаем выбранные режимы
    action.payload.forEach(mode => {
      state.profileModes[mode] = true;
    });
    console.log('👨‍💼 Profile Modes Set');
  },

  // Выключение конкретного режима
  resetUSProfileMode: (state, action) => {
    state.profileModes[action.payload] = false;
    console.log(`👨‍💼 Profile Mode Reset —> ${action.payload}`);

    // Если все основные режимы выключены, включаем режим по умолчанию
    const hasMainMode =
            state.profileModes[PROFILE_MODES.EXPERIENCE] ||
            state.profileModes[PROFILE_MODES.SKILLS];

    if (!hasMainMode) {
      state.profileModes[PROFILE_MODES.EXPERIENCE] = true;
    }
  },

  // Сброс всех режимов к начальным значениям
  resetUSProfileModes: (state) => {
    state.profileModes = { ...initialProfileModes.profileModes };
    console.log('👨‍💼 All Profile Modes Reset');
  },

  // Переключение между Experience и Skills
  toggleUSExperienceSkills: (state) => {
    if (state.profileModes[PROFILE_MODES.EXPERIENCE]) {
      state.profileModes[PROFILE_MODES.EXPERIENCE] = false;
      state.profileModes[PROFILE_MODES.SKILLS] = true;
    } else {
      state.profileModes[PROFILE_MODES.EXPERIENCE] = true;
      state.profileModes[PROFILE_MODES.SKILLS] = false;
    }
    console.log('👨‍💼 Toggle Experience/Skills');
  },
};
