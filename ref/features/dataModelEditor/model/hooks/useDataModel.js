import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { MODEL_FIELD_TYPES } from '../../../../entities/dataModel';
import { toCamelCase } from '../../../../shared/lib';
import { addFieldToDraft } from '../store';
import { useDataModelMutation, useDataModelStates } from '../../../../entities/dataModel';
import { useDataModelFieldMutation } from '../../../../entities/dataModelField';

export const useAddModelField = () => {
  const dispatch = useDispatch();

  const { addDataModel } = useDataModelMutation();
  const { handleSelectModel } = useDataModelStates();
  const { handleAddDataModelField } = useDataModelFieldMutation();

  const handleAddModelWithDefaultFields = () => {
    const modelId = uuidv4();
    const name = {
      id: `name-${modelId}`,
      modelId: modelId,
      label: 'Name',
      name: 'name',
      type: MODEL_FIELD_TYPES.TEXT,
      default: true,
      isRequired: true,
      helpText: '',
    };
    const slug = {
      id: `slug-${modelId}`,
      modelId: modelId,
      label: 'Slug',
      name: 'slug',
      type: MODEL_FIELD_TYPES.TEXT,
      default: true,
      isRequired: true,
      helpText: '',
    };
    addDataModel(modelId);
    handleSelectModel(modelId);
    handleAddDataModelField(name);
    handleAddDataModelField(slug);
  };

  // Создание базового поля
  const createBaseField = useCallback((fieldId, modelId, fieldType, fieldLabel) => {
    return {
      id: fieldId || uuidv4(),
      modelId: modelId,
      label: fieldLabel,
      name: toCamelCase(fieldLabel),
      type: fieldType,
      default: false,
      isRequired: false,
      helpText: '',
    };
  }, []);

  // Добавление специфичных настроек для типа поля
  const addTypeSpecificSettings = useCallback((baseField, fieldType) => {
    let newField = { ...baseField };

    switch (fieldType) {
    case MODEL_FIELD_TYPES.TEXT:
      newField = {
        ...newField,
        minLength: 0,
        maxLength: 0, // 0 означает без ограничений
      };
      break;

    case MODEL_FIELD_TYPES.MULTISTYLE_TEXT:
      newField = {
        ...newField,
        minLength: 0,
        maxLength: 0, // 0 означает без ограничений,
      };
      break;

    case MODEL_FIELD_TYPES.NUMBER:
      // Числовое поле может иметь минимальное и максимальное значение
      newField = {
        ...newField,
        minValue: null,
        maxValue: null,
        defaultValue: null,
      };
      break;

    case MODEL_FIELD_TYPES.BOOLEAN:
      // Булево поле может иметь значение по умолчанию
      newField = {
        ...newField,
        defaultValue: false,
      };
      break;

    case MODEL_FIELD_TYPES.IMAGE:
    case MODEL_FIELD_TYPES.IMAGES_GALLERY:
      // Поля изображений могут иметь ограничения по размеру
      newField = {
        ...newField,
        allowedFormats: ['jpg', 'png', 'gif', 'webp'],
        minSize: 0,
        maxSize: 0,
        defaultImage: null,
        maxWidth: 0,
      };
      break;

    case MODEL_FIELD_TYPES.VIDEO:
      // Поле видео
      newField = {
        ...newField,
        maxFileSize: 20, // в МБ
        allowedFormats: ['mp4', 'webm', 'ogg'],
      };
      break;

    case MODEL_FIELD_TYPES.COLOR:
      // Поле цвета
      newField = {
        ...newField,
        defaultValue: '#000000',
        allowOpacity: true,
      };
      break;

    case MODEL_FIELD_TYPES.OPTION:
      // Поле с выбором из списка опций
      newField = {
        ...newField,
        options: [],
        allowMultiple: false,
      };
      break;

    case MODEL_FIELD_TYPES.FILE:
      // Поле файла
      newField = {
        ...newField,
        maxFileSize: 10, // в МБ
        allowedFormats: [],
      };
      break;

    case MODEL_FIELD_TYPES.REFERENCE:
    case MODEL_FIELD_TYPES.MULTI_REFERENCE:
      // Поля ссылок на другие записи
      newField = {
        ...newField,
        refModelId: null,
        refDisplayField: null,
      };
      break;

    case MODEL_FIELD_TYPES.JSON:
      // JSON поле
      newField = {
        ...newField,
        defaultValue: '{}',
      };
      break;

    case MODEL_FIELD_TYPES.DATE_TIME:
      // Поле даты/времени
      newField = {
        ...newField,
        includeTime: true,
        defaultValue: null,
      };
      break;

    default:
      break;
    }

    return newField;
  }, []);

  // Создание полного поля с настройками
  const createField = useCallback((modelId, fieldType, fieldLabel, fieldId = null) => {
    // Создаем базовое поле
    const baseField = createBaseField(fieldId, modelId, fieldType, fieldLabel);
    // Добавляем специфичные настройки для типа
    const completedField = addTypeSpecificSettings(baseField, fieldType);
    return completedField;
  }, [createBaseField, addTypeSpecificSettings]);

  // Добавление поля в черновик модели
  const addFieldToDraftAction = useCallback((modelId, fieldType, fieldLabel, fieldId = null) => {
    if (!modelId || !fieldType || !fieldLabel) {
      return null;
    }

    // Создаем готовое поле
    const newField = createField(modelId, fieldType, fieldLabel, fieldId);

    // Диспатчим экшен с готовым полем - избегаем рекурсии в имени
    dispatch(addFieldToDraft({
      modelId,
      field: newField,
    }));

    return newField;
  }, [createField, dispatch]);

  // Получение настроек по умолчанию для типа поля
  const getDefaultFieldSettings = useCallback((fieldType) => {
    const dummyField = { type: fieldType };
    return addTypeSpecificSettings(dummyField, fieldType);
  }, [addTypeSpecificSettings]);

  return {
    addModelWithDefaultFields: handleAddModelWithDefaultFields,
    addFieldToDraft: addFieldToDraftAction,
    getDefaultFieldSettings,
  };
};
