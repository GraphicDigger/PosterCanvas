import { DESIGN_MODES } from '../constants/designModes';
import { GLOBAL_MODES } from '../constants/globalModes';

export const initialDesignModes = {

  [DESIGN_MODES.SCREEN_CANVAS]: true,
  [DESIGN_MODES.COMPONENT_CANVAS]: false,
  [DESIGN_MODES.ACTION_CANVAS]: false,
  [DESIGN_MODES.TOKEN_MANAGER]: false,
  [DESIGN_MODES.PRESET_MANAGER]: false,
  [DESIGN_MODES.CODE]: false,
  [DESIGN_MODES.COMMENTS]: false,
};

export const actionsDesignMode = {

  // set design mode
  setDesignMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.DESIGN) {
      Object.keys(state.designModes).forEach(mode => {
        state.designModes[mode] = false;
      });
      state.designModes[action.payload] = true;
      console.log('🕹️ Set Design Mode —>', action.payload);
    }
  },
  // reset design mode
  resetDesignMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.DESIGN) {
      state.designModes[action.payload] = false;
      // Если все режимы выключены, возвращаем состояние по умолчанию
      const hasActiveMode = Object.values(state.designModes).some(mode => mode);
      if (!hasActiveMode) {
        state.designModes = { ...initialDesignModes };
        console.log('🕹️ Reset Design Mode —>', action.payload);
      }
    }
  },

  // set multiple design modes
  setDesignModes: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.DESIGN) {
      const modes = action.payload;
      Object.keys(state.designModes).forEach(mode => {
        state.designModes[mode] = false;
      });
      modes.forEach(mode => {
        state.designModes[mode] = true;
      });
      console.log('🕹️ Set Design Modes —>', modes);
    }
  },
  // reset all design modes
  resetDesignModes: (state) => {
    state.designModes = { ...initialDesignModes };
    // console.log('🕹️ Design Mode —>', DESIGN_MODES.SCREEN_CANVAS);
  },

  togglePresetManager: (state) => {
    if (state.globalMode !== GLOBAL_MODES.DESIGN) {return;}
    const isEnabled = state.designModes[DESIGN_MODES.PRESET_MANAGER];
    if (isEnabled) {
      state.designModes = { ...initialDesignModes };
    } else {
      Object.keys(state.designModes).forEach(mode => {
        state.designModes[mode] = mode === DESIGN_MODES.PRESET_MANAGER;
      });
    }
  },

  toggleTokenManager: (state) => {
    if (state.globalMode !== GLOBAL_MODES.DESIGN) {return;}
    const isEnabled = state.designModes[DESIGN_MODES.TOKEN_MANAGER];
    if (isEnabled) {
      state.designModes = { ...initialDesignModes };
    } else {
      Object.keys(state.designModes).forEach(mode => {
        state.designModes[mode] = mode === DESIGN_MODES.TOKEN_MANAGER;
      });
    }
  },

  // action <—> action
  toggleAction: (state) => {
    if (state.globalMode === GLOBAL_MODES.DESIGN) {
      state.designModes[DESIGN_MODES.ACTION_CANVAS] = !state.designModes[DESIGN_MODES.ACTION_CANVAS];
      console.log('🕹️ Toggle Action —>', state.designModes[DESIGN_MODES.ACTION_CANVAS] ? 'ON' : 'OFF');
    }
  },

  // code <—> code
  toggleModeCode: (state) => {
    if (state.globalMode === GLOBAL_MODES.DESIGN) {
      state.designModes[DESIGN_MODES.CODE] = !state.designModes[DESIGN_MODES.CODE];
      console.log('🕹️ Toggle Code —>', state.designModes[DESIGN_MODES.CODE] ? 'ON' : 'OFF');
    }
  },

  toggleCommentsInDesignMode: (state) => {
    if (state.globalMode === GLOBAL_MODES.DESIGN) {
      state.designModes[DESIGN_MODES.COMMENTS] = !state.designModes[DESIGN_MODES.COMMENTS];
      console.log('🕹️ Toggle Comments —>', state.designModes[DESIGN_MODES.COMMENTS] ? 'ON' : 'OFF');
    }
  },

};
