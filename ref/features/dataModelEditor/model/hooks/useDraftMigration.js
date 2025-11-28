import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { selectModelFieldsByModelId } from '../../../../entities/dataModelField';
import { clearModelDraft } from '../store/slice';
import { toCamelCase } from '../../../../shared/lib';
import { upsertDataModelFields } from '../../../../entities/dataModelField/model';
import { selectDraftModels, selectDraftModelData } from '../store/selectors';
import { selectRawDataRecordsByModelId, updateRecord } from '../../../../entities/dataRecord';

export const useDraftMigration = () => {
  const dispatch = useDispatch();
  const store = useStore();
  const draftModels = useSelector(selectDraftModels);

  // Сохранение черновика конкретной модели
  const saveModelDraft = useCallback(async (modelId) => {
    if (!modelId) {
      console.warn('Attempted to save draft without modelId');
      return null;
    }

    const state = store.getState();
    const modelDraft = selectDraftModelData(state, modelId);

    if (!modelDraft || (Object.keys(modelDraft.fields).length === 0 && modelDraft.newFields.length === 0)) {
      console.warn(`No draft changes found for model ${modelId}`);
      return null;
    }

    console.log('🔥[useSaveDraft] modelDraft', modelDraft);

    // Получаем существующие поля модели
    const modelFields = selectModelFieldsByModelId(state, modelId);
    if (!modelFields) {
      console.error(`Cannot save draft: model with id ${modelId} not found`);
      return null;
    }

    const draftUpdatedFields = modelDraft.fields || {};
    const draftNewFields = (modelDraft.newFields || []).map(field => ({
      ...field,
      name: toCamelCase(field.name),
    }));

    // Объединяем существующие поля с новыми
    let combinedFields = [...(modelFields || []), ...draftNewFields];
    console.log('🔥[useSaveDraft] исходные + новые поля', combinedFields);

    // Применяем изменения к существующим полям
    combinedFields = combinedFields.map(field => {
      if (draftUpdatedFields[field.id]) {
        const updatedFieldData = draftUpdatedFields[field.id];
        return {
          ...field,
          ...updatedFieldData,
          name: updatedFieldData.name ? toCamelCase(updatedFieldData.name) : field.name,
        };
      }
      return field;
    });

    console.log('🔥[useSaveDraft] итоговые поля', combinedFields);

    // MIGRATION OF DATA RECORDS WHEN FIELD NAMES CHANGE
    const fieldsWithNameChanges = [];
    combinedFields.forEach(field => {
      const originalField = modelFields.find(f => f.id === field.id);
      const draftChanges = draftUpdatedFields[field.id];

      // Check if the field name has changed / Проверяем, изменилось ли имя поля
      if (originalField && draftChanges && draftChanges.name &&
                originalField.name !== field.name) {
        fieldsWithNameChanges.push({
          fieldId: field.id,
          oldName: originalField.name,
          newName: field.name,
        });
      }
    });

    // If there are field name changes, migrate data records / Если есть изменения имён полей, мигрируем данные записей
    if (fieldsWithNameChanges.length > 0) {
      console.log('🔄[useSaveDraft] Мигрируем данные записей для полей:', fieldsWithNameChanges);

      const rawRecords = selectRawDataRecordsByModelId(state, modelId);

      rawRecords.forEach(record => {
        const recordChanges = {};
        let recordNeedsMigration = false;

        fieldsWithNameChanges.forEach(({ oldName, newName }) => {
          // If the record has a value with the old field name / Если в записи есть значение со старым именем поля
          if (record.hasOwnProperty(oldName)) {
            // Copy the value to the new name / Копируем значение на новое имя
            recordChanges[newName] = record[oldName];
            // Помечаем старое имя для удаления (undefined удалит свойство при merge)
            recordChanges[oldName] = undefined;
            recordNeedsMigration = true;

            console.log(`🔄[useSaveDraft] Migrate field "${oldName}" → "${newName}" in record ${record.id}`, record[oldName]);
          }
        });

        // Update the record if migration is required
        if (recordNeedsMigration) {
          // Создаем полный обновленный объект записи
          const updatedRecord = { ...record };
          Object.keys(recordChanges).forEach(key => {
            if (recordChanges[key] === undefined) {
              delete updatedRecord[key];
            } else {
              updatedRecord[key] = recordChanges[key];
            }
          });

          dispatch(updateRecord({ id: record.id, changes: updatedRecord }));
        }
      });
    }

    try {
      // Сохраняем поля в Redux store
      dispatch(upsertDataModelFields(combinedFields));

      // Очищаем черновик конкретной модели
      dispatch(clearModelDraft({ modelId }));

      console.log('🔥[useSaveDraft] Модель успешно сохранена', modelId);
      return combinedFields;
    } catch (error) {
      console.error('🔥[useSaveDraft] Ошибка при сохранении модели:', error);
      throw error;
    }
  }, [dispatch, store]);

  // Сохранение всех черновиков
  const saveAllDrafts = useCallback(async () => {
    const modelIds = Object.keys(draftModels);

    if (modelIds.length === 0) {
      console.warn('No draft models to save');
      return [];
    }

    console.log('🔥[useSaveDraft] Сохраняем все черновики:', modelIds);

    const results = [];

    for (const modelId of modelIds) {
      try {
        const result = await saveModelDraft(modelId);
        if (result) {
          results.push({ modelId, fields: result, success: true });
        }
      } catch (error) {
        console.error(`🔥[useSaveDraft] Ошибка при сохранении модели ${modelId}:`, error);
        results.push({ modelId, error, success: false });
      }
    }

    return results;
  }, [draftModels, saveModelDraft]);

  // Проверка наличия несохраненных изменений
  const hasDraftChanges = useMemo(() => {
    return Object.values(draftModels).some(modelDraft =>
      Object.keys(modelDraft.fields || {}).length > 0 ||
            (modelDraft.newFields || []).length > 0,
    );
  }, [draftModels]);


  return {
    saveModelDraft,
    saveAllDrafts,
    hasDraftChanges,
    draftModels,
  };
};
