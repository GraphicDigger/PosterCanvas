import { v4 as uuidv4 } from 'uuid';
import { ENTITY_KINDS } from '../../../../shared/constants';

export const actionsMutation = {

  addPresetCollection: (state, action) => {
    const collection = action.payload;
    const newCollection = {
      ...collection,
      id: collection.id || 'preset-collection-' + uuidv4(),
      kind: ENTITY_KINDS.PRESET_COLLECTION,
      name: 'New Collection',
      variableModeIds: collection.variableModeIds || [],
    };
    if (!state.entities[newCollection.id]) {
      state.ids.push(newCollection.id);
    }
    state.entities[newCollection.id] = newCollection;
  },

  removePresetCollection: (state, action) => {
    const collectionId = action.payload;
    delete state.entities[collectionId];
    state.ids = state.ids.filter(id => id !== collectionId);
  },

  updatePresetCollection: (state, action) => {
    const { id, updates } = action.payload;
    const collection = state.entities[id];

    if (!collection) {return;}

    state.entities[id] = {
      ...collection,
      ...updates,
    };

    // Обновляем variableModeIds с учётом уникальности
    if ('variableModeIds' in updates) {
      if (!updates.rewrite && updates.variableModeIds.length > 0) {
        const combined = [
          ...updates.variableModeIds,
        ];
        // Удаление дубликатов (оставляем только уникальные значения)
        state.entities[id].variableModeIds = Array.from(new Set(combined));
      } else {
        state.entities[id].variableModeIds = [];
      }
    }
  },
};
