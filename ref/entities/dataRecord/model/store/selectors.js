import { createSelector } from '@reduxjs/toolkit';
import { selectSelectedRecordId } from './uiStates/selectors';
import { selectAllDataModelFields, selectModelFieldsByModelId } from '../../../dataModelField/model/store/selectors'; // Импортируем поля
import { selectSelectedModelId } from '../../../dataModel';
import { selectModelFieldById } from '../../../dataModelField';
import { MODEL_FIELD_TYPES } from '../../../dataModelField/model/constants/modelFieldTypes';

// Базовые селекторы на "сырые" данные
export const selectDataRecordState = (state) => state.dataRecordEntity;
export const selectRawDataRecordEntities = (state) => selectDataRecordState(state).entities; // Переименовали
export const selectDataRecordIds = (state) => selectDataRecordState(state).ids;
export const selectDataRecordUI = (state) => selectDataRecordState(state).ui;

export const selectRawDataRecordById = (state, id) => selectRawDataRecordEntities(state)[id];
export const selectAllRawDataRecords = (state) => selectDataRecordIds(state).map(id => selectRawDataRecordById(state, id));

export const selectRawDataRecordsByModelId = createSelector(
  [selectRawDataRecordEntities, (_, modelId) => modelId],
  (entities, modelId) => {
    if (!modelId || !entities) {return [];}
    const records = Object.values(entities).filter(record => record.modelId === modelId);
    return records;
  },
);

// selector for getting field value by record id and field id
export const selectRawDataRecordFieldValueById = createSelector(
  [
    selectRawDataRecordEntities,
    (state, recordId, fieldId) => selectModelFieldById(state, fieldId),
    (state, recordId, fieldId) => recordId,
  ],
  (entities, field, recordId) => {
    const record = entities[recordId];
    if (!record || !field) {return null;}

    // get value from record by field name
    const value = record[field.name];

    if (!value) {return null;}

    // if field type is REFERENCE, search for related record
    if (field.type === MODEL_FIELD_TYPES.REFERENCE) {
      const referencedRecord = entities[value];
      if (referencedRecord) {
        return referencedRecord.name || referencedRecord.id;
      }
      return value; // return id if related record is not found
    }

    if (field.type === MODEL_FIELD_TYPES.MULTI_REFERENCE) {
      if (Array.isArray(value)) {
        return value.map(id => {
          const referencedRecord = entities[id];
          return referencedRecord ? (referencedRecord.name || referencedRecord.id) : id;
        }).join(', ');
      }
      return value;
    }
    return value;
  },
);

// Селектор для получения отображаемого значения записи (автоматически определяет поле для показа)
export const selectRecordDisplayValue = createSelector(
  [
    selectRawDataRecordEntities,
    (state, recordId) => {
      const entities = selectRawDataRecordEntities(state);
      const record = entities[recordId];
      return selectModelFieldsByModelId(state, record?.modelId);
    },
    (state, recordId) => recordId,
  ],
  (entities, fields, recordId) => {
    const record = entities[recordId];
    if (!record) {return 'Unknown';}

    // If no fields available, fallback to record ID
    if (!fields || fields.length === 0) {
      return record.id || 'Unknown';
    }

    // Priority order for display fields
    const priorityFields = ['name', 'firstName', 'title', 'label', 'text'];

    // Find the first available field in priority order
    for (const fieldName of priorityFields) {
      if (record[fieldName] && typeof record[fieldName] === 'string' && record[fieldName].trim() !== '') {
        return record[fieldName];
      }
    }

    // If no priority field found, look for any text field
    for (const [key, value] of Object.entries(record)) {
      if (key !== 'id' && key !== 'modelId' && key !== 'kind' &&
                typeof value === 'string' && value.trim() !== '') {
        return value;
      }
    }

    // Fallback to record ID
    return record.id || 'Unknown';
  },
);

// --- Трансформирование записи (изменение навазния полей на их ID) ---

// rawRecord = {
//      id: "record-1",
//      firstName: "John",
//      lastName: "Doe",
//      email: "john@doe.com"
// }
const transformRecord = (rawRecord, fieldsMapByName) => {
  if (!rawRecord) {return null;}
  const newRecord = { id: rawRecord.id, modelId: rawRecord.modelId, kind: rawRecord.kind };
  for (const key in rawRecord) {
    if (key !== 'id' && key !== 'modelId' && key !== 'kind') {
      const fieldKey = `${rawRecord.modelId}-${key}`;
      const fieldId = fieldsMapByName[fieldKey];
      if (fieldId) {
        newRecord[fieldId] = rawRecord[key];
      } else {
        // console.warn(`Field with name "${key}" for modelId "${rawRecord.modelId}" not found. Skipping.`);
      }
    }
  }
  return newRecord;
};

// --- Селектор для карты полей (ID по имени) ---

// Карта полей (связка field name → field ID):
// fieldsMapByName = {
//     "model1-firstName": "fieldId-model1-firstName",
//     "model1-lastName": "fieldId-model1-lastName",
//     "model1-email": "fieldId-model1-email"
//   }
export const selectModelFieldsMapByName = createSelector(
  [selectAllDataModelFields],
  (allModelFields) => {
    return allModelFields.reduce((acc, field) => {
      const key = `${field.modelId}-${field.name}`;
      acc[key] = field.id;
      return acc;
    }, {});
  },
);

// --- Трансформированные селекторы ---

// Трансформированные entities (все записи с ID-ключами)

//  transformedRecord = {
//     id: "record-1",
//     "fieldId-model1-firstName": "John",
//     "fieldId-model1-lastName": "Doe",
//     "fieldId-model1-email": "john@doe.com"
//   }
export const selectDataRecordEntities = createSelector(
  [selectRawDataRecordEntities, selectModelFieldsMapByName],
  (rawEntities, fieldsMap) => {
    const transformedEntities = {};
    for (const recordId in rawEntities) {
      transformedEntities[recordId] = transformRecord(rawEntities[recordId], fieldsMap);
    }
    return transformedEntities;
  },
);

// Получение одной трансформированной записи по ID
export const selectDataRecordById = createSelector(
  [selectDataRecordEntities, (_, recordId) => recordId],
  (transformedEntities, recordId) => transformedEntities[recordId] || null,
);

// Все трансформированные записи (массив)
export const selectAllDataRecords = createSelector(
  [selectDataRecordIds, selectDataRecordEntities],
  (ids, transformedEntities) => ids.map(id => transformedEntities[id]),
);

// Выбранная трансформированная запись
export const selectSelectedDataRecord = createSelector(
  [selectSelectedRecordId, selectDataRecordEntities],
  (selectedId, transformedEntities) => {
    if (!selectedId || !transformedEntities) {return null;}
    return transformedEntities[selectedId] || null;
  },
);

// Получение трансформированных записей по IDs
export const selectDataRecordsByIds = createSelector(
  [selectDataRecordEntities, (_, ids) => ids],
  (transformedEntities, ids) => {
    if (!ids || !transformedEntities) {return [];}
    return ids.map(id => transformedEntities[id]).filter(Boolean);
  },
);

// Получение трансформированных записей по ID модели
export const selectDataRecordsByModelId = createSelector(
  [selectAllDataRecords, // Используем уже трансформированные записи
    (_, modelId) => modelId,
  ],
  (allTransformedRecords, modelId) => {
    if (!modelId) {return [];}
    return allTransformedRecords.filter(record => record.modelId === modelId);
  },
);

// === Селектор значения поля (остается без изменений, т.к. работает с уже трансформированной записью) ===
export const selectDataRecordFieldValueByModelFieldId = createSelector(
  [selectSelectedDataRecord, (_, modelFieldId) => modelFieldId],
  (record, modelFieldId) => {
    if (!record) {return null;}
    const value = record[modelFieldId] || null;
    return value;
  },
);
