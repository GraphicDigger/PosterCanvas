import { PREVIEW_MODES } from '../constants/previewModes';
import { GLOBAL_MODES } from '../constants/globalModes';

export const initialPreviewModes = {
  [PREVIEW_MODES.COMMENTS]: false,
};

export const actionsPreviewMode = {

  // set single mode
  setPreviewMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.PREVIEW) {
      Object.keys(state.previewModes).forEach(mode => {
        state.previewModes[mode] = false;
      });
      state.previewModes[action.payload] = true;
    }
  },

  // set multiple modes
  setPreviewModes: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.PREVIEW) {
      const modes = action.payload;
      Object.keys(state.previewModes).forEach(mode => {
        state.previewModes[mode] = false;
      });
      modes.forEach(mode => {
        state.previewModes[mode] = true;
      });
    }
  },

  // reset all modes
  resetPreviewModes: (state) => {
    state.previewModes = { ...initialPreviewModes };
  },

  // reset mode
  resetPreviewMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.PREVIEW) {
      state.previewModes[action.payload] = false;
      // Если все режимы выключены, возвращаем состояние по умолчанию
      const hasActiveMode = Object.values(state.previewModes).some(mode => mode);
      if (!hasActiveMode) {
        state.previewModes = { ...initialPreviewModes };
      }
    }
  },

  // toggle comments mode
  toggleModeComments: (state) => {
    if (state.globalMode === GLOBAL_MODES.PREVIEW) {
      if (state.previewModes[PREVIEW_MODES.COMMENTS]) {
        state.previewModes[PREVIEW_MODES.COMMENTS] = false;
      } else {
        state.previewModes = { ...initialPreviewModes };
        state.previewModes[PREVIEW_MODES.COMMENTS] = true;
      }
    }
  },

};

