import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedModelFieldId } from '../store/uiStates/selectors';
import { selectSelectedModelId } from '../../../dataModel/model/store/uiStates/selectors';
import { EXCLUDE_FIELDS } from '../constants/exclideFields';

export const selectState = (state) => state.dataModelFieldEntity;
export const selectEntities = (state) => selectState(state).entities;
export const selectIds = (state) => selectState(state).ids;
export const selectUI = (state) => selectState(state).ui;


// all models fields
export const selectAllDataModelFields = createSelector(
  [selectEntities, selectIds],
  (entities, ids) => ids.map(id => entities[id]),
);


// selected model field
export const selectSelectedModelField = createSelector(
  [selectEntities, selectSelectedModelFieldId],
  (entities, id) => id ? entities[id] : null, // Добавим проверку на null/undefined id
);

export const selectModelFieldById = createSelector(
  [selectAllDataModelFields, (_, id) => id],
  (fields, id) => fields.find(field => field.id === id),
);

// Все поля для текущей выбранной модели
export const selectFieldsForSelectedModel = createSelector(
  [selectAllDataModelFields, selectSelectedModelId],
  (allFields, selectedModelId) => {
    if (!selectedModelId) {
      return [];
    }
    return allFields.filter(field => field.modelId === selectedModelId);
  },
);

// Все поля по id модели
export const selectModelFieldsByModelId = createSelector(
  [selectAllDataModelFields, (_, modelId) => modelId],
  (allFields, modelId) => {
    return allFields.filter(field => field.modelId === modelId);
  },
);

// Селектор для полей выбранной модели с фильтрацией для контекста 'model'
export const selectFilteredModelFieldsInModelMode = createSelector(
  [selectFieldsForSelectedModel],
  (fields) => {
    return fields.filter(field => !EXCLUDE_FIELDS.model.includes(field.name));
  },
);

// Селектор для полей выбранной модели с фильтрацией для контекста 'table'
export const selectFilteredModelFieldsInTableMode = createSelector(
  [selectFieldsForSelectedModel],
  (fields) => fields.filter(field => !EXCLUDE_FIELDS.table.includes(field.name)),
);

// Селектор для полей выбранной модели с фильтрацией для контекста 'record'
export const selectFilteredModelFieldsInRecordMode = createSelector(
  [selectFieldsForSelectedModel],
  (fields) => fields.filter(field => !EXCLUDE_FIELDS.record.includes(field.name)),
);

