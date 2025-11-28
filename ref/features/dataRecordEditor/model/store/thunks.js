import { createAsyncThunk } from '@reduxjs/toolkit';
// Убедимся, что selectDataRecordById возвращает "сырую" запись
import { updateRecord, selectDataRecordById } from '../../../../entities/dataRecord';
import { selectAllDataModelFields } from '../../../../entities/dataModelField';
import { clearDraft } from './slice';

//Thunk для сохранения изменений черновика записи.
export const saveDraftRecordThunk = createAsyncThunk(
  'dbRecordEditor/saveDraftRecord',
  async (_, { getState, dispatch }) => {
    const state = getState();
    const draft = state.dbRecordEditor.draft;

    if (!draft || !draft.recordId) {
      throw new Error('Активный черновик или ID записи не найден');
    }

    const recordId = draft.recordId;
    const changes = draft.changes; // changes содержит { fieldId: newValue, ... }

    // Получаем запись (предполагаем, что она уже с fieldId ключами благодаря селекторам)
    const record = selectDataRecordById(state, recordId);
    if (!record) {
      throw new Error(`Запись с ID ${recordId} не найдена`);
    }

    // Получаем поля для маппинга ID -> Name (для удаления старых ключей-имен)
    const allModelFields = selectAllDataModelFields(state);
    const fieldIdToNameMap = allModelFields.reduce((acc, field) => {
      acc[field.id] = field.name;
      return acc;
    }, {});

    const updatedRecord = { ...record }; // Оставляем для логов, но не используем для финального результата
    const finalRecordWithNames = {}; // Итоговый объект с ключами-именами

    // Обрабатываем все поля модели, чтобы гарантировать наличие всех полей с name-ключами
    allModelFields.forEach(field => {
      const fieldId = field.id;
      const fieldName = field.name;

      if (!fieldName) {
        // console.warn(`[saveDraftRecordThunk] Field name missing for field ID: ${fieldId}. Skipping.`);
        return; // Пропускаем поле без имени
      }

      // 1. Проверяем, было ли поле изменено в черновике
      if (Object.hasOwnProperty.call(changes, fieldId)) {
        finalRecordWithNames[fieldName] = changes[fieldId];
        // console.log(`[saveDraftRecordThunk] Applied change for ${fieldName} (from draft)`);
      }
      // 2. Если не изменено, берем значение из исходной записи (проверяем оба ключа)
      else {
        let originalValue = undefined;
        let foundByKey = null;

        if (record.hasOwnProperty(fieldId)) {
          originalValue = record[fieldId];
          foundByKey = 'ID';
        } else if (record.hasOwnProperty(fieldName)) {
          // Используем значение по имени, только если по ID не найдено
          originalValue = record[fieldName];
          foundByKey = 'Name';
        }

        if (originalValue !== undefined) {
          finalRecordWithNames[fieldName] = originalValue;
          // console.log(`[saveDraftRecordThunk] Kept original value for ${fieldName} (found by ${foundByKey})`);
        } else {
          // console.log(`[saveDraftRecordThunk] No original value found for ${fieldName} (ID: ${fieldId})`);
          // Можно решить, нужно ли здесь добавлять null/undefined или пропускать
        }
      }
    });

    // Добавляем системные поля, если они есть в record и не являются полями модели
    // (например, id, kind, modelId - они не должны быть в allModelFields)
    for (const key in record) {
      if (Object.hasOwnProperty.call(record, key)) {
        // Проверяем, является ли ключ ID поля модели
        const isModelFieldId = allModelFields.some(f => f.id === key);
        // Проверяем, является ли ключ именем поля модели
        const isModelFieldName = allModelFields.some(f => f.name === key);

        // Если ключ не относится к полям модели (ни ID, ни имя), копируем его как есть
        if (!isModelFieldId && !isModelFieldName) {
          finalRecordWithNames[key] = record[key];
          // console.log(`[saveDraftRecordThunk] Copied non-model field: ${key}`);
        }
      }
    }

    // console.log('[saveDraftRecordThunk] changes', changes);
    // console.log('[saveDraftRecordThunk] record (original)', record);
    // console.log('[saveDraftRecordThunk] finalRecordWithNames (Name keys, before dispatch)', finalRecordWithNames);

    // Диспатчим обновление записи (сохраняем с Name ключами)
    dispatch(updateRecord({ id: recordId, changes: finalRecordWithNames })); // Используем новый объект
    dispatch(clearDraft());

    return finalRecordWithNames; // Возвращаем запись с Name-ключами
  },
);
