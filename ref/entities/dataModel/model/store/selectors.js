import { createSelector } from '@reduxjs/toolkit';
import { EXCLUDE_FIELDS } from '../../../dataModelField/model/constants/exclideFields';
import { selectSelectedModelFieldId } from '../../../dataModelField';

// Базовые селекторы с защитой от некорректного состояния
export const selectState = (state) => state?.dataModelEntity || {};
export const selectEntities = (state) => selectState(state)?.entities || {};
export const selectIds = (state) => selectState(state)?.ids || [];
export const selectUI = (state) => selectState(state)?.ui || {};


// all models
export const selectAllDataModels = createSelector(
  [selectEntities, selectIds],
  (entities, ids) => ids.map(id => entities[id]),
);

// model by id
export const selectDataModelById = createSelector(
  [selectEntities, (_, modelId) => modelId],
  (entities, modelId) => entities[modelId],
);

// Selected model
export const selectSelectedModel = createSelector(
  [selectUI, selectEntities],
  (ui, entities) => {
    const modelId = ui?.selectedModelId;
    return modelId ? entities[modelId] : undefined;
  },
);

