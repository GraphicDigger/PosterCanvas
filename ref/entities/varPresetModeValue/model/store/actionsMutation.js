import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';

export const actionsMutation = {

  addPresetModeValue: (state, action) => {
    const value = action.payload;
    const newValue = {
      ...value,
      id: value?.id || 'preset-mode-value-' + uuidv4(),
      kind: ENTITY_KINDS.PRESET_MODE_VALUE,
      variableModeId: value?.variableModeId,
      presetId: value?.presetId,
      value: value?.value || undefined,
    };
    if (!state.entities[newValue.id]) {
      state.ids.push(newValue.id);
    }
    state.entities[newValue.id] = newValue;
  },

  updatePresetModeValue: (state, action) => {
    const { id, updates } = action.payload;
    const modeValue = state.entities[id];
    if (modeValue) {
      state.entities[id] = {
        ...modeValue,
        value: {
          ...modeValue.value,
          ...updates,
        },
      };
    }
  },

  removePresetModeValue: (state, action) => {
    const { id } = action.payload;
    delete state.entities[id];
    state.ids = state.ids.filter(currentId => currentId !== id);
  },

  removePresetModeValues: (state, action) => {
    const ids = action.payload;
    ids.forEach(id => {
      delete state.entities[id];
    });
    state.ids = state.ids.filter(id => !ids.includes(id));
  },

  removePresetModeValuesByVariableModeId: (state, action) => {
    const { variableModeId } = action.payload;

    const filteredEntries = Object.entries(state.entities).filter(
      ([_, entity]) => entity.variableModeId !== variableModeId,
    );

    state.entities = Object.fromEntries(filteredEntries);
    state.ids = filteredEntries.map(([id]) => id);
  },
};
