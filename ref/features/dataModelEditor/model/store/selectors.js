import { createSelector } from '@reduxjs/toolkit';
import {
  selectSelectedModel,
  // selectModelFields,
  selectDataModelById,
} from '../../../../entities/dataModel';

import {
  selectSelectedModelFieldId as selectedModelFieldId,
  selectSelectedModelField as selectedModelField,
  selectFilteredModelFieldsInModelMode,
  selectModelFieldsByModelId,
} from '../../../../entities/dataModelField';

// при добавлении нового поля в модель, он попадает в черновик. После сохранения попадает в базу

// Базовые селекторы
export const selectDbModelEditorState = (state) => state.dbModelEditor;
export const selectDraft = (state) => selectDbModelEditorState(state).draft;
export const selectDraftModels = (state) => selectDraft(state).models || {};

// Селекторы для конкретной модели
export const selectDraftModelData = (state, modelId) => {
  const models = selectDraftModels(state);
  return models[modelId] || { fields: {}, newFields: [] };
};

export const selectDraftFields = (state, modelId) => {
  return selectDraftModelData(state, modelId).fields;
};

export const selectDraftNewFields = (state, modelId) => {
  return selectDraftModelData(state, modelId).newFields;
};

// Проверка наличия изменений в черновике для конкретной модели
export const selectHasDraftChangesByModelId = (state, modelId) => {
  const modelData = selectDraftModelData(state, modelId);
  return modelData.newFields.length > 0 || Object.keys(modelData.fields).length > 0;
};

// Получение данных черновика для конкретного поля
export const selectDraftModelField = createSelector(
  [
    (state, fieldId, modelId) => selectDraftFields(state, modelId),
    (_, fieldId) => fieldId,
    (_, __, modelId) => modelId,
  ], (
    fields,
    fieldId,
    modelId,
  ) => {
    if (!fields || !fieldId || !modelId) {return null;}
    return fields[fieldId] || null;
  },
);

// Селектор для получения всех полей ВЫБРАННОЙ модели, включая новые поля из черновика
export const selectModelFieldsWithDraft = createSelector(
  [
    selectSelectedModel,
    selectFilteredModelFieldsInModelMode,
    (state) => state,
  ], (
    model,
    modelFields,
    state,
  ) => {
    if (!model) {return [];}
    // Получаем существующие поля модели
    const existingFields = modelFields.filter(field => field.modelId === model.id) || [];
    // Получаем новые поля из черновика для этой модели
    const draftNewFields = selectDraftNewFields(state, model.id);
    // Объединяем существующие и новые поля
    return [...existingFields, ...draftNewFields];
  },
);


// Селектор для получения всех полей КОНКРЕТНОЙ модели по ID, включая новые поля из черновика
export const selectModelFieldsWithDraftByModelId = createSelector(
  [
    (state, modelId) => selectModelFieldsByModelId(state, modelId),
    (state, modelId) => selectDraftNewFields(state, modelId),
    (_, modelId) => modelId,
  ],
  (modelFields, draftNewFields, modelId) => {
    if (!modelId) {return [];}
    if (!modelFields) {
      console.warn(`Модель с ID "${modelId}" не найдена`);
      return [];
    }
    const existingFields = modelFields || [];
    const newFields = draftNewFields || [];
    return [...existingFields, ...newFields];
  },
);


// Селектор для получения выбранного поля из базы или черновика
export const selectSelectedModelField = createSelector(
  [
    selectedModelField,
    selectedModelFieldId,
    selectSelectedModel,
    (state) => state,
  ], (
    modelField,
    modelFieldId,
    model,
    state,
  ) => {
    // Если нашли в базовых полях, возвращаем
    if (modelField) {return modelField;}
    // Иначе, если модель существует, ищем в новых полях черновика для этой модели
    if (model && modelFieldId) {
      const draftNewFields = selectDraftNewFields(state, model.id);
      return draftNewFields.find(field => field.id === modelFieldId) || null;
    }
    return null;
  },
);
