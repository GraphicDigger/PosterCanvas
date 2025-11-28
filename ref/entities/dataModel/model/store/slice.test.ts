import { describe, it, expect, beforeEach } from 'vitest';
import dataModelReducer, {
  setModels,
  addDataModel,
  updateModel,
  removeModel,
  setSelectedModelId,
  setFocusedModelId,
  setHoveredModelId,
} from './slice';
import type { DataModel, DataModelState } from '../../types';

describe('DataModel Redux Slice', () => {
  let initialState: DataModelState;

  beforeEach(() => {
    initialState = dataModelReducer(undefined, { type: '@@INIT' });
  });

  it('should handle initial state', () => {
    expect(dataModelReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle setModels action', () => {
    const models: DataModel[] = [
      {
        id: 'model-1',
        name: 'Test Model',
        description: 'Test Description',
        fields: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        createdBy: 'user',
        updatedBy: 'user',
        isActive: true,
        version: 1,
        tags: ['test'],
      },
    ];

    const newState = dataModelReducer(initialState, setModels(models));

    expect(newState.ids).toEqual(['model-1']);
    expect(newState.entities['model-1']).toEqual(models[0]);
  });

  it('should handle addDataModel action', () => {
    const modelData = {
      name: 'New Model',
      description: 'New Description',
      fields: [],
      tags: ['new'],
    };

    const newState = dataModelReducer(initialState, addDataModel(modelData));

    expect(newState.ids).toHaveLength(1);
    expect(newState.entities[newState.ids[0]]).toMatchObject({
      name: 'New Model',
      description: 'New Description',
      tags: ['new'],
    });
  });

  it('should handle updateModel action', () => {
    const stateWithModel: DataModelState = {
      ...initialState,
      entities: {
        'model-1': {
          id: 'model-1',
          name: 'Original Model',
          description: 'Original Description',
          fields: [],
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          createdBy: 'user',
          updatedBy: 'user',
          isActive: true,
          version: 1,
          tags: ['original'],
        },
      },
      ids: ['model-1'],
    };

    const updates = {
      id: 'model-1',
      name: 'Updated Model',
      description: 'Updated Description',
    };

    const newState = dataModelReducer(stateWithModel, updateModel(updates));

    expect(newState.entities['model-1'].name).toBe('Updated Model');
    expect(newState.entities['model-1'].description).toBe('Updated Description');
    expect(newState.entities['model-1'].updatedAt).not.toBe('2024-01-01T00:00:00Z');
  });

  it('should handle removeModel action', () => {
    const stateWithModel: DataModelState = {
      ...initialState,
      entities: {
        'model-1': {
          id: 'model-1',
          name: 'Test Model',
          description: 'Test Description',
          fields: [],
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          createdBy: 'user',
          updatedBy: 'user',
          isActive: true,
          version: 1,
          tags: ['test'],
        },
      },
      ids: ['model-1'],
    };

    const newState = dataModelReducer(stateWithModel, removeModel('model-1'));

    expect(newState.entities).not.toHaveProperty('model-1');
    expect(newState.ids).not.toContain('model-1');
  });

  it('should handle setSelectedModelId action', () => {
    const newState = dataModelReducer(initialState, setSelectedModelId('model-1'));

    expect(newState.ui.selectedModelId).toBe('model-1');
  });

  it('should handle setFocusedModelId action', () => {
    const newState = dataModelReducer(initialState, setFocusedModelId('model-1'));

    expect(newState.ui.focusedModelId).toBe('model-1');
  });

  it('should handle setHoveredModelId action', () => {
    const newState = dataModelReducer(initialState, setHoveredModelId('model-1'));

    expect(newState.ui.hoveredModelId).toBe('model-1');
  });
});
