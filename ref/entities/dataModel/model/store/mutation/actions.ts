import { v4 as uuidv4 } from 'uuid';
import { PayloadAction } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '../../../../../shared/constants';
import type { DataModel, DataModelState, CreateDataModelRequest, UpdateDataModelRequest } from '../../../types';

export const actionsMutation = {
  addDataModel: (state: DataModelState, action: PayloadAction<CreateDataModelRequest | string>) => {
    const modelData = action.payload;
    const newId = uuidv4();

    let newModel: DataModel;

    if (typeof modelData === 'string') {
      // Legacy support for string ID
      newModel = {
        id: modelData || newId,
        name: 'newModel',
        description: 'New Collection',
        fields: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'user',
        updatedBy: 'user',
        isActive: true,
        version: 1,
        tags: [],
        metadata: {
          kind: ENTITY_KINDS.DATA_MODEL,
          label: 'New Collection',
        },
      };
    } else {
      // New TypeScript interface - use the provided data
      newModel = {
        id: newId,
        name: modelData.name || 'New Model',
        description: modelData.description || 'New Description',
        fields: (modelData.fields || []).map(field => ({
          ...field,
          id: uuidv4(), // Generate ID for each field
        })),
        tags: modelData.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'user',
        updatedBy: 'user',
        isActive: true,
        version: 1,
        metadata: {
          kind: ENTITY_KINDS.DATA_MODEL,
          label: modelData.name || 'New Model',
        },
      };
    }

    state.entities[newModel.id] = newModel;
    state.ids.push(newModel.id);
  },

  updateModel: (state: DataModelState, action: PayloadAction<UpdateDataModelRequest>) => {
    const { id, ...updates } = action.payload;
    if (!id || !state.entities[id]) {return;}

    state.entities[id] = {
      ...state.entities[id],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
  },

  removeModel: (state: DataModelState, action: PayloadAction<string>) => {
    const id = action.payload;
    if (!id || !state.entities[id]) {return;}

    delete state.entities[id];
    state.ids = state.ids.filter(modelId => modelId !== id);
  },
};
