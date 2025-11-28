import { v4 as uuidv4 } from 'uuid';
import { MODEL_FIELD_TYPES } from '../../../../../entities/dataModel';
import { ENTITY_KINDS } from '../../../../../shared/constants';

export const actionsMutation = {

  addDataModel: (state, action) => {
    const modelData = action.payload;
    const newId = uuidv4();

    let newModel;

    if (modelData === undefined || modelData === null) {
      // No payload - generate new model with default values
      newModel = {
        id: newId,
        kind: ENTITY_KINDS.DATA_MODEL,
        name: 'newModel',
        label: 'New Collection',
        description: 'New Collection',
        fields: [],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'user',
        updatedBy: 'user',
        isActive: true,
        version: 1,
      };
    } else if (typeof modelData === 'string') {
      // Legacy support for string ID
      newModel = {
        id: modelData !== undefined ? modelData : newId,
        kind: ENTITY_KINDS.DATA_MODEL,
        label: 'New Collection',
        name: 'newModel',
        description: 'New Collection',
        fields: [],
        tags: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'user',
        updatedBy: 'user',
        isActive: true,
        version: 1,
      };
    } else {
      // New object-based payload
      newModel = {
        id: newId,
        kind: ENTITY_KINDS.DATA_MODEL,
        name: modelData.name || 'New Model',
        label: modelData.name || 'New Model',
        description: modelData.description || 'New Description',
        fields: (modelData.fields || []).map(field => ({
          ...field,
          id: uuidv4(),
        })),
        tags: modelData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'user',
        updatedBy: 'user',
        isActive: true,
        version: 1,
      };
    }

    state.entities[newModel.id] = newModel;
    state.ids.push(newModel.id);
  },

  updateModel: (state, action) => {
    const model = action.payload;
    if (!model || !model.id) {return;}

    state.entities[model.id] = model;
  },

  removeModel: (state, action) => {
    const id = action.payload;
    if (!id || !state.entities[id]) {return;}

    delete state.entities[id];
    state.ids = state.ids.filter(modelId => modelId !== id);
  },

};
