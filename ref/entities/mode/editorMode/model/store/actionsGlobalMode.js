import { GLOBAL_MODES } from '../constants/globalModes';
import { actionsDesignMode, initialDesignModes } from './actionsDesignMode';
import { actionsDatabaseMode, initialDatabaseModes } from './actionsDatabaseMode';


export const initialGlobalMode = {
  globalMode: GLOBAL_MODES.DESIGN,
  // globalMode: GLOBAL_MODES.WIREFRAME,
};

export const actionsGlobalMode = {

  // set global mode
  setGlobalMode: (state, action) => {
    const prevMode = state.globalMode;
    state.globalMode = action.payload;
    console.log('🕹️ Global Mode —>', action.payload);

    if (prevMode === GLOBAL_MODES.DESIGN) {
      Object.keys(state.designModes).forEach(mode => {
        state.designModes[mode] = false;
      });
    } else if (prevMode === GLOBAL_MODES.DATABASE) {
      Object.keys(state.databaseModes).forEach(mode => {
        state.databaseModes[mode] = false;
      });
    }
    if (action.payload === GLOBAL_MODES.DESIGN) {
      actionsDesignMode.resetDesignModes(state);
    } else if (action.payload === GLOBAL_MODES.DATABASE) {
      actionsDatabaseMode.resetDatabaseModes(state);
    }
  },

  resetGlobalMode: (state) => {
    state.globalMode = initialGlobalMode.globalMode;
    state.designModes = initialDesignModes;
    state.databaseModes = initialDatabaseModes;
  },

  // design -> codebase
  toggleDesignCodebase: (state) => {
    if (state.globalMode === GLOBAL_MODES.DESIGN) {
      state.globalMode = GLOBAL_MODES.CODEBASE;
      Object.keys(state.designModes).forEach(mode => {
        state.designModes[mode] = false;
      });
    } else if (state.globalMode === GLOBAL_MODES.CODEBASE) {
      state.globalMode = GLOBAL_MODES.DESIGN;
      actionsDesignMode.resetDesignModes(state);
    }
  },


  // design -> global search
  toggleDesignGlobalSearch: (state) => {
    if (state.globalMode === GLOBAL_MODES.DESIGN) {
      state.globalMode = GLOBAL_MODES.GLOBAL_SEARCH;
      Object.keys(state.designModes).forEach(mode => {
        state.designModes[mode] = false;
      });
    } else if (state.globalMode === GLOBAL_MODES.GLOBAL_SEARCH) {
      state.globalMode = GLOBAL_MODES.DESIGN;
      actionsDesignMode.resetDesignModes(state);
    }
  },
};
