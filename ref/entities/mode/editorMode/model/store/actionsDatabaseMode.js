import { DATABASE_MODES } from '../constants/databaseModes';
import { GLOBAL_MODES } from '../constants/globalModes';

export const initialDatabaseModes = {
  [DATABASE_MODES.TABLE]: true,
  [DATABASE_MODES.SCHEMA]: false,
  [DATABASE_MODES.RECORD]: false,
  [DATABASE_MODES.CODE]: false,
};

export const actionsDatabaseMode = {

  setDatabaseMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.DATABASE) {
      console.log('🕹️ Set Database Mode —>', action.payload);
      Object.keys(state.databaseModes).forEach(mode => {
        state.databaseModes[mode] = false;
      });
      state.databaseModes[action.payload] = true;
      console.log('🕹️ Set Database Mode —>', action.payload);
    }
  },

  // set multiple modes
  setDatabaseModes: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.DATABASE) {
      const modes = action.payload;
      Object.keys(state.databaseModes).forEach(mode => {
        state.databaseModes[mode] = false;
      });
      modes.forEach(mode => {
        state.databaseModes[mode] = true;
      });
    }
  },

  // reset all modes
  resetDatabaseModes: (state) => {
    state.databaseModes = { ...initialDatabaseModes };
  },

  // reset mode
  resetDatabaseMode: (state, action) => {
    if (state.globalMode === GLOBAL_MODES.DATABASE) {
      state.databaseModes[action.payload] = false;
      // Если все режимы выключены, возвращаем состояние по умолчанию
      const hasActiveMode = Object.values(state.databaseModes).some(mode => mode);
      if (!hasActiveMode) {
        state.databaseModes = { ...initialDatabaseModes };
      }
    }
  },

  // schema <—> table
  toggleSchemaTable: (state) => {
    if (state.globalMode === GLOBAL_MODES.DATABASE) {
      if (state.databaseModes[DATABASE_MODES.SCHEMA]) {
        Object.keys(state.databaseModes).forEach(mode => {
          state.databaseModes[mode] = false;
        });
        state.databaseModes[DATABASE_MODES.TABLE] = true;
      }
      else if (state.databaseModes[DATABASE_MODES.TABLE]) {
        Object.keys(state.databaseModes).forEach(mode => {
          state.databaseModes[mode] = false;
        });
        state.databaseModes[DATABASE_MODES.SCHEMA] = true;
      }
      else {
        state.databaseModes[DATABASE_MODES.TABLE] = true;
      }
    }
  },

  // record <—> table
  toggleRecordTable: (state) => {
    if (state.globalMode === GLOBAL_MODES.DATABASE) {
      if (state.databaseModes[DATABASE_MODES.RECORD]) {
        Object.keys(state.databaseModes).forEach(mode => {
          state.databaseModes[mode] = false;
        });
        state.databaseModes[DATABASE_MODES.TABLE] = true;
      }
      else if (state.databaseModes[DATABASE_MODES.TABLE]) {
        Object.keys(state.databaseModes).forEach(mode => {
          state.databaseModes[mode] = false;
        });
        state.databaseModes[DATABASE_MODES.RECORD] = true;
      }
      else {
        state.databaseModes[DATABASE_MODES.TABLE] = true;
      }
    }
  },

  // code <—> code
  toggleCode: (state) => {
    if (state.globalMode === GLOBAL_MODES.DATABASE) {
      state.databaseModes[DATABASE_MODES.SCHEMA] = true;
      if (state.databaseModes[DATABASE_MODES.CODE]) {
        state.databaseModes[DATABASE_MODES.CODE] = false;
      } else {
        state.databaseModes[DATABASE_MODES.CODE] = true;
      }
      console.log('databaseModes: CODE', state.databaseModes[DATABASE_MODES.CODE]);
      console.log('databaseModes: SCHEMA', state.databaseModes[DATABASE_MODES.SCHEMA]);
    }
  },

};

