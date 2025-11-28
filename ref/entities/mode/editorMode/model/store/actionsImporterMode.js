import { IMPORTER_MODES } from '../constants/importerModes';
import { GLOBAL_MODES } from '../constants/globalModes';

export const initialImporterModes = {
  [IMPORTER_MODES.CODEBASE]: true,
  [IMPORTER_MODES.FIGMA]: false,
  [IMPORTER_MODES.WEB_SCAN]: false,
  [IMPORTER_MODES.URL]: false,
};

export const actionsImporterMode = {
  // Установка одного режима
  setImporterMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.IMPORTER) {
      // Сбрасываем все режимы
      Object.keys(state.importerModes).forEach(mode => {
        state.importerModes[mode] = false;
      });
      // Устанавливаем выбранный режим
      state.importerModes[action.payload] = true;
    }
  },

  // Установка нескольких режимов
  setImporterModes: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.IMPORTER) {
      const modes = action.payload;
      // Сбрасываем все режимы
      Object.keys(state.importerModes).forEach(mode => {
        state.importerModes[mode] = false;
      });
      // Устанавливаем выбранные режимы
      modes.forEach(mode => {
        state.importerModes[mode] = true;
      });
    }
  },

  // Сброс всех режимов к начальным значениям
  resetImporterModes: (state) => {
    state.importerModes = { ...initialImporterModes };
  },

  // Сброс одного режима
  resetImporterMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.IMPORTER) {
      state.importerModes[action.payload] = false;
      // Если все режимы выключены, возвращаем состояние по умолчанию
      const hasActiveMode = Object.values(state.importerModes).some(mode => mode);
      if (!hasActiveMode) {
        state.importerModes = { ...initialImporterModes };
      }
    }
  },
};
