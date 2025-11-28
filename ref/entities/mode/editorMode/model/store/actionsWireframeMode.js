import { WIREFRAME_MODES } from '../constants/wireframeModes';
import { GLOBAL_MODES } from '../constants/globalModes';

// Начальные значения для режимов Wireframe
export const initialWireframeModes = {
  [WIREFRAME_MODES.BLOCKS]: true,
  [WIREFRAME_MODES.BLOCK_DETAIL]: false,
  [WIREFRAME_MODES.PREVIEW]: false,
};

export const actionsWireframeMode = {
  // Установка одного режима
  setWireframeMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.WIREFRAME) {
      // Сбрасываем все режимы
      Object.keys(state.wireframeModes).forEach(mode => {
        state.wireframeModes[mode] = false;
      });
      // Устанавливаем выбранный режим
      state.wireframeModes[action.payload] = true;
    }
  },

  // Установка нескольких режимов
  setWireframeModes: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.WIREFRAME) {
      const modes = action.payload;
      // Сбрасываем все режимы
      Object.keys(state.wireframeModes).forEach(mode => {
        state.wireframeModes[mode] = false;
      });
      // Устанавливаем выбранные режимы
      modes.forEach(mode => {
        state.wireframeModes[mode] = true;
      });
    }
  },

  // Сброс всех режимов к начальным значениям
  resetWireframeModes: (state) => {
    state.wireframeModes = { ...initialWireframeModes };
  },

  // Сброс одного режима
  resetWireframeMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.WIREFRAME) {
      state.wireframeModes[action.payload] = false;
      // Если все режимы выключены, возвращаем состояние по умолчанию
      const hasActiveMode = Object.values(state.wireframeModes).some(mode => mode);
      if (!hasActiveMode) {
        state.wireframeModes = { ...initialWireframeModes };
      }
    }
  },

  // Переключение между режимами BLOCKS и PREVIEW
  toggleBlockPreview: (state) => {
    if (state.globalMode === GLOBAL_MODES.WIREFRAME) {
      if (state.wireframeModes[WIREFRAME_MODES.BLOCKS]) {
        // Если активен BLOCKS, переключаемся на PREVIEW
        Object.keys(state.wireframeModes).forEach(mode => {
          state.wireframeModes[mode] = false;
        });
        state.wireframeModes[WIREFRAME_MODES.PREVIEW] = true;
      }
      else if (state.wireframeModes[WIREFRAME_MODES.PREVIEW]) {
        // Если активен PREVIEW, переключаемся на BLOCKS
        Object.keys(state.wireframeModes).forEach(mode => {
          state.wireframeModes[mode] = false;
        });
        state.wireframeModes[WIREFRAME_MODES.BLOCKS] = true;
      }
      else {
        // Если ни один не активен, устанавливаем BLOCKS
        state.wireframeModes[WIREFRAME_MODES.BLOCKS] = true;
      }
    }
  },

  // block detail <—> block detail
  toggleBlockDetail: (state) => {
    if (state.globalMode === GLOBAL_MODES.WIREFRAME) {
      const currentValue = state.wireframeModes[WIREFRAME_MODES.BLOCK_DETAIL];
      state.wireframeModes[WIREFRAME_MODES.BLOCK_DETAIL] = !currentValue;
      console.log('wireframeModes: BLOCK_DETAIL', state.wireframeModes[WIREFRAME_MODES.BLOCK_DETAIL]);
    }
  },

};
