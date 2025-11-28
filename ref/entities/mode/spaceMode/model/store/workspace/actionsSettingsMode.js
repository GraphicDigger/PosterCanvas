import { SETTINGS_MODES } from '../../constants/workspaceModes';

export const initialSettingsModes = {
  settingsModes: {
    [SETTINGS_MODES.GENERAL]: true,
    [SETTINGS_MODES.POSITION]: false,
    [SETTINGS_MODES.ROLES]: false,
    [SETTINGS_MODES.DETAIL]: false,
  },
};

export const actionsSettingsMode = {
  // Установка одного режима (выключает все остальные основные режимы)
  setWSSettingsMode: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.settingsModes[SETTINGS_MODES.GENERAL] = false;
    state.settingsModes[SETTINGS_MODES.POSITION] = false;
    state.settingsModes[SETTINGS_MODES.ROLES] = false;
    state.settingsModes[SETTINGS_MODES.DETAIL] = false;

    // Включаем выбранный режим
    state.settingsModes[action.payload] = true;
    console.log(`🏢 Settings Mode —> ${action.payload}`);
  },

  // Установка нескольких режимов одновременно
  setWSSettingsModes: (state, action) => {
    // Сначала выключаем все взаимоисключающие режимы
    state.settingsModes[SETTINGS_MODES.GENERAL] = false;
    state.settingsModes[SETTINGS_MODES.POSITION] = false;
    state.settingsModes[SETTINGS_MODES.ROLES] = false;
    state.settingsModes[SETTINGS_MODES.DETAIL] = false;

    // Включаем выбранные режимы
    action.payload.forEach(mode => {
      state.settingsModes[mode] = true;
    });
    console.log('🏢 Settings Modes Set');
  },

  // Выключение конкретного режима
  resetWSSettingsMode: (state, action) => {
    state.settingsModes[action.payload] = false;
    console.log(`🏢 Settings Mode Reset —> ${action.payload}`);

    // Если все основные режимы выключены, включаем режим по умолчанию
    const hasMainMode =
            state.settingsModes[SETTINGS_MODES.GENERAL] ||
            state.settingsModes[SETTINGS_MODES.POSITION] ||
            state.settingsModes[SETTINGS_MODES.ROLES] ||
            state.settingsModes[SETTINGS_MODES.DETAIL];

    if (!hasMainMode) {
      state.settingsModes[SETTINGS_MODES.GENERAL] = true;
    }
  },

  // Сброс всех режимов к начальным значениям
  resetWSSettingsModes: (state) => {
    state.settingsModes = { ...initialSettingsModes.settingsModes };
    console.log('🏢 All Settings Modes Reset');
  },

  // Переключение между режимами настроек
  toggleWSSettingsGeneralPosition: (state) => {
    if (state.settingsModes[SETTINGS_MODES.GENERAL]) {
      state.settingsModes[SETTINGS_MODES.GENERAL] = false;
      state.settingsModes[SETTINGS_MODES.POSITION] = true;
    } else {
      state.settingsModes[SETTINGS_MODES.GENERAL] = true;
      state.settingsModes[SETTINGS_MODES.POSITION] = false;
    }
    console.log('🏢 Toggle General/Position');
  },

  toggleWSSettingsPositionRoles: (state) => {
    if (state.settingsModes[SETTINGS_MODES.POSITION]) {
      state.settingsModes[SETTINGS_MODES.POSITION] = false;
      state.settingsModes[SETTINGS_MODES.ROLES] = true;
    } else {
      state.settingsModes[SETTINGS_MODES.POSITION] = true;
      state.settingsModes[SETTINGS_MODES.ROLES] = false;
    }
    console.log('🏢 Toggle Position/Roles');
  },

  toggleWSSettingsRolesGeneral: (state) => {
    if (state.settingsModes[SETTINGS_MODES.ROLES]) {
      state.settingsModes[SETTINGS_MODES.ROLES] = false;
      state.settingsModes[SETTINGS_MODES.GENERAL] = true;
    } else {
      state.settingsModes[SETTINGS_MODES.ROLES] = true;
      state.settingsModes[SETTINGS_MODES.GENERAL] = false;
    }
    console.log('🏢 Toggle Roles/General');
  },

  // Установка режима DETAIL (может быть активен вместе с другими)
  setWSSettingsDetailMode: (state) => {
    state.settingsModes[SETTINGS_MODES.DETAIL] = true;
    console.log('🏢 Settings Detail Mode —> ON');
  },
  // Сброс режима DETAIL
  resetWSSettingsDetailMode: (state) => {
    state.settingsModes[SETTINGS_MODES.DETAIL] = false;
    console.log('🏢 Settings Detail Mode —> OFF');
  },
  // Переключение режима DETAIL
  toggleWSSettingsDetailMode: (state) => {
    state.settingsModes[SETTINGS_MODES.DETAIL] = !state.settingsModes[SETTINGS_MODES.DETAIL];
    console.log(`🏢 Toggle Settings Detail —> ${state.settingsModes[SETTINGS_MODES.DETAIL] ? 'ON' : 'OFF'}`);
  },
};
