import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';

export const actionsMutation = {

  addVariableMode: (state, action) => {
    const mode = action.payload;
    const newVariableMode = {
      ...mode,
      id: mode.id || 'variable-mode-' + uuidv4(),
      kind: ENTITY_KINDS.VARIABLE_MODE,
      name: 'Mode',
      isDefault: mode?.isDefault || false,
    };
    console.log(' [addVariableMode] newVariableMode', newVariableMode);
    state.entities[newVariableMode.id] = newVariableMode;
    state.ids.push(newVariableMode.id);
  },

  updateVariableMode: (state, action) => {
    const { id, updates } = action.payload;
    const prewState = state.entities[id];
    if (prewState) {
      state.entities[id] = {
        ...prewState,
        ...updates,
        meta: {
          ...prewState.meta,
          ...updates.meta,
        },
      };
    }
  },

  removeVariableMode: (state, action) => {
    const { modeId } = action.payload;
    if (state.entities[modeId]) {
      delete state.entities[modeId];
    }
    state.ids = state.ids.filter(id => id !== modeId);
  },

  removeVariableModesFromCollection: (state, action) => {
    const collectionId = action.payload;
    state.ids = state.ids.filter(modeId => state.entities[modeId].collectionId !== collectionId);
    state.entities = Object.fromEntries(
      Object.entries(state.entities).filter(([_, mode]) => mode.collectionId !== collectionId),
    );
    // console.log('[removeVariableModesFromCollection] state.entities', JSON.stringify(state.entities, null, 2))
  },


};
