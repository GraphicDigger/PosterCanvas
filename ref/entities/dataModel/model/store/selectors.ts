import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedModelId } from '../store/uiStates/selectors';
import type { DataModel, DataModelState } from '../../../types';

// Base selectors
export const selectState = (state: { dataModelEntity: DataModelState }) => state.dataModelEntity;
export const selectEntities = (state: { dataModelEntity: DataModelState }) => selectState(state).entities;
export const selectIds = (state: { dataModelEntity: DataModelState }) => selectState(state).ids;
export const selectUI = (state: { dataModelEntity: DataModelState }) => selectState(state).ui;

// All models
export const selectAllDataModels = createSelector(
  [selectEntities, selectIds],
  (entities, ids): DataModel[] => ids.map(id => entities[id]).filter(Boolean),
);

// Model by ID
export const selectDataModelById = createSelector(
  [selectEntities, (state: { dataModelEntity: DataModelState }, modelId: string) => modelId],
  (entities, modelId): DataModel | undefined => entities[modelId],
);

// Selected model
export const selectSelectedModel = createSelector(
  [selectSelectedModelId, selectEntities],
  (modelId, entities): DataModel | undefined => {
    if (!modelId) {return undefined;}
    return entities[modelId];
  },
);

// UI state selectors
export const selectSelectedModelId = (state: { dataModelEntity: DataModelState }) =>
  selectState(state).ui.selectedModelId;

export const selectFocusedModelId = (state: { dataModelEntity: DataModelState }) =>
  selectState(state).ui.focusedModelId;

export const selectHoveredModelId = (state: { dataModelEntity: DataModelState }) =>
  selectState(state).ui.hoveredModelId;

export const selectIsLoading = (state: { dataModelEntity: DataModelState }) =>
  selectState(state).ui.isLoading;

export const selectError = (state: { dataModelEntity: DataModelState }) =>
  selectState(state).ui.error;

// Computed selectors
export const selectDataModelCount = createSelector(
  [selectIds],
  (ids): number => ids.length,
);

export const selectActiveDataModels = createSelector(
  [selectAllDataModels],
  (models): DataModel[] => models.filter(model => model.isActive),
);

export const selectDataModelsByTag = createSelector(
  [selectAllDataModels, (state: { dataModelEntity: DataModelState }, tag: string) => tag],
  (models, tag): DataModel[] => models.filter(model => model.tags?.includes(tag)),
);

export const selectDataModelsBySearch = createSelector(
  [selectAllDataModels, (state: { dataModelEntity: DataModelState }, searchTerm: string) => searchTerm],
  (models, searchTerm): DataModel[] => {
    if (!searchTerm) {return models;}
    const term = searchTerm.toLowerCase();
    return models.filter(model =>
      model.name.toLowerCase().includes(term) ||
      model.description?.toLowerCase().includes(term),
    );
  },
);
