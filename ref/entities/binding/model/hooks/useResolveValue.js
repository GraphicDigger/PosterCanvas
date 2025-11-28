import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { ENTITY_KINDS, VARIABLE_TYPES } from '@/shared/constants';
import { useCurrentDataRecord } from '@/features/iFrame/model/context/DataRecordContext';
import { useCurrentInstance } from '@/features/iFrame/model/context/InstanceContext';
import { useElement, STYLE_PROPERTIES, DISPLAY_PROPERTIES } from '../../../uiElement';
import { useDataModelFields } from '../../../dataModelField';
import { useDataModel } from '../../../dataModel';
import { usePreset, PRESET_TYPES } from '../../../varPreset';
import { usePresetModeValue } from '../../../varPresetModeValue';
import { usePropValue, selectPropValueById } from '../../../varPropValue';
import { useTokenCollection } from '../../../varTokenCollection';
import { useVariableModes } from '../../../varMode';
import { useInstances } from '../../../uiInstance';
import { useProp } from '../../../varProp';
import { useToken } from '../../../varToken';
import { useTokenValues } from '../../../varTokenValue';
import { useVariable } from '../../../varVariableData';
import { useDataRecords } from '../../../dataRecord';

// значение свойства для рендера: возвращает статическое значение или значение переменной (tokem, props, dataVariable)
export const useResolveValue = (uiId) => {

  const { propById } = useProp();
  const { tokenById } = useToken();
  const { tokenValueByTokenId } = useTokenValues();
  const { variableById, makeSelectVariableById } = useVariable();
  const { modelFieldById } = useDataModelFields();
  const { modelById } = useDataModel();
  const { presetById } = usePreset();
  const { presetModeValueById } = usePresetModeValue();
  const { propValueById } = usePropValue();
  const { getTokenCollectionById } = useTokenCollection();
  const { defaultVariableModeByIds } = useVariableModes();
  const { getTokenValueByTokenIdAndVariableModeId } = useTokenValues();
  const { instanceById } = useInstances();
  const { getRecordsByModelId } = useDataRecords();


  const { element } = useElement({ id: uiId });
  const instance = instanceById(uiId);

  const ui = element || instance;

  const currentRecord = useCurrentDataRecord();
  const currentInstance = useCurrentInstance();

  const getNormalizedValue = useCallback((propertyPath) => {
    if (!ui) {return null;}

    const [section, ...subPath] = propertyPath.split('.');

    if (section === 'content') {
      const content = ui.properties?.content;
      if (content?.text && !content?.binding) {
        return { value: content.text, type: 'text' };
      }
      if (content?.src && !content?.binding) {
        return { value: content.src, type: 'image' };
      }
      return normalized(content?.binding);
    }

    if (section === 'style') {
      const style = ui.properties?.style;
      const property = subPath.join('.');
      // console.log('🎨 getNormalizedPropertyValue - style section:', { property, styleValue: style?.[property], hasBinding: !!style?.binding?.[property] });

      // Original logic that was working for standard props
      if (style?.[property] && !style?.binding?.[property]) {
        const result = { value: style[property] };
        // console.log(`🎨 getNormalizedPropertyValue - returning literal value for ${property}:`, result);
        return result;
      }

      // Check for binding
      const bindingResult = normalized(style?.binding?.[property]);
      // console.log(`🎨 getNormalizedPropertyValue - returning binding value for ${property}:`, bindingResult);
      return bindingResult;
    }

    if (section === 'bindings') {
      const binding = ui.bindings?.find(binding => binding.kind === subPath.join('.'));
      // console.log('🎨 getNormalizedPropertyValue - binding:', binding)
      return normalized(binding);
    }

    // if (ui.kind === ENTITY_KINDS.INSTANCE && section === 'override') {
    //     const override = ui.override?.props?.[subPath.join('.')];
    //     console.log('🎨 getNormalizedPropertyValue - override:', override)
    //     return normalized(override);
    // }

    return null;

  }, [
    ui,
    propById,
    tokenById,
    variableById,
    modelFieldById,
    modelById,
    presetById,
    presetModeValueById,
  ]);


  const normalized = useCallback((binding) => {
    if (!binding) {return null;}

    if (binding.type === ENTITY_KINDS.PROP) {
      const propData = propById(binding.id);

      if (!propData) {return null;}

      const defaultPropValue = propData.values?.find(value => value.isDefault);
      const firstPropValue = propData.values?.[0];

      if (defaultPropValue) {
        return {
          id: propData.id,
          type: ENTITY_KINDS.PROP,
          propName: propData.name,
          propValue: defaultPropValue.value,
          propertyName: binding.propertyName, // css property name
        };
      } else if (firstPropValue) {
        return {
          id: propData.id,
          type: ENTITY_KINDS.PROP,
          propName: propData.name,
          propValue: firstPropValue.value,
          propertyName: binding.propertyName,
        };
      } else {
        return {
          id: propData.id,
          type: ENTITY_KINDS.PROP,
          propName: propData.name,
          propValue: propData.defaultValue,
          propertyName: binding.propertyName,
        };
      }
    }
    if (binding.type === ENTITY_KINDS.TOKEN) {
      const token = tokenById(binding.id);
      const collection = getTokenCollectionById(token?.collectionId);
      const defaultMode = defaultVariableModeByIds(collection?.variableModeIds);
      const tokenValue = getTokenValueByTokenIdAndVariableModeId(token?.id, defaultMode?.id);
      if (token) {
        return {
          id: token.id,
          type: ENTITY_KINDS.TOKEN,
          tokenName: token.name,
          tokenValue: tokenValue?.value,
        };
      }
    }
    if (binding.type === ENTITY_KINDS.DATA_MODEL_FIELD) {
      const field = modelFieldById(binding.id);
      if (!field) {return null;}
      const model = modelById(field.modelId);
      return {
        id: field.id,
        type: ENTITY_KINDS.DATA_MODEL_FIELD,
        fieldName: field.name,
        modelName: model.label,
      };
    }

    if (binding.type === ENTITY_KINDS.DATA_VARIABLE) {
      const variable = variableById(binding.id);
      if (!variable) {return null;}
      return {
        id: variable.id,
        kind: variable.kind,
        type: variable.type,
        name: variable.name,
        value: variable.value,
      };
    }

    if (binding.kind === ENTITY_KINDS.DATA_VARIABLE && binding.type === VARIABLE_TYPES.DATA) {
      const variable = variableById(binding.id);
      if (!variable) {return null;}
      const model = modelById(variable.value.id);
      const result = {
        id: variable.id,
        kind: variable.kind,
        type: variable.type,
        modelId: model.id,
        modelName: model.label,
      };
      // console.log('[usePropertyValue] result', result)
      return result;
    }

    if (binding.kind === ENTITY_KINDS.PROP && binding.type === VARIABLE_TYPES.DATA) {
      const prop = propById(binding.id);
      // console.log('[usePropertyValue] prop', prop)
      if (!prop) {return null;}
      const model = modelById(prop.defaultValue?.modelId);
      const result = {
        id: prop.id,
        kind: prop.kind,
        type: prop.type,
        modelId: model.id,
        modelName: model.label,
      };
      return result;
    }

    // PRESET

    if (binding.kind === ENTITY_KINDS.PRESET_MODE_VALUE && binding.presetType === PRESET_TYPES.TYPOGRAPHY) {
      // console.log('[usePropertyValue] binding', binding)
      const preset = presetById(binding.presetId);
      const pmv = presetModeValueById(binding.id);
      if (!preset) {return null;}
      return {
        id: preset.id,
        kind: preset.kind,
        presetName: preset.name,
        value: pmv.value,
      };
    }


    return null;
  }, [
    propById,
    tokenById,
    variableById,
    modelFieldById,
    modelById,
    presetById,
    presetModeValueById,
    currentInstance,
  ]);

  const getPreparedValue = useCallback((normalizedValue) => {
    if (!normalizedValue) {return undefined;}

    if (currentRecord && normalizedValue?.type === ENTITY_KINDS.DATA_MODEL_FIELD) {
      const fieldName = normalizedValue.fieldName;
      if (fieldName && fieldName in currentRecord) {
        return currentRecord[fieldName];
      }
      return undefined;
    }

    if (normalizedValue?.kind === ENTITY_KINDS.PROP && normalizedValue?.type === VARIABLE_TYPES.DATA) {
      const propId = normalizedValue.id;
      const overrideProp = currentInstance?.override?.props?.[propId];
      const isDataModel = overrideProp?.value?.type === ENTITY_KINDS.DATA_MODEL;
      const isDataVariable = overrideProp?.value?.type === ENTITY_KINDS.DATA_VARIABLE;

      if (isDataModel) {
        return getRecordsByModelId(overrideProp.value.id);
      }
      if (isDataVariable) {
        const variable = variableById(overrideProp.value.id);
        console.log('🎨 variable', variable);
        if (variable.filters?.length > 0) {
          return getRecordsByModelId(variable.value.id).filter(record => {
            return variable.filters.every(filter => {
              return record[filter.field] === filter.value;
            });
          });
        }
        return getRecordsByModelId(variable.value.id);
      }
      return getRecordsByModelId(normalizedValue?.modelId);
    }

    if (normalizedValue?.kind === ENTITY_KINDS.DATA_VARIABLE && normalizedValue?.type === VARIABLE_TYPES.DATA) {
      return getRecordsByModelId(normalizedValue.modelId);
    }

    switch (normalizedValue?.type) {

    case ENTITY_KINDS.PROP: {

      let value = null;
      const propId = normalizedValue.id;
      const overrideProp = currentInstance?.override?.props?.[propId];
      const isStatic = overrideProp && typeof overrideProp?.value !== 'object';
      const isOneOfValue = overrideProp && !isStatic && overrideProp?.value?.type === ENTITY_KINDS.PROP_VALUE;
      const isToken = overrideProp && !isStatic && overrideProp?.value?.type === ENTITY_KINDS.TOKEN;
      const isDataVariable = overrideProp && !isStatic && overrideProp?.value?.type === ENTITY_KINDS.DATA_VARIABLE;
      const isDataModelField = overrideProp && currentRecord && !isStatic && overrideProp?.value?.type === ENTITY_KINDS.DATA_MODEL_FIELD;

      if (isStatic) {value = overrideProp.value;}
      else if (isToken) {value = tokenValueByTokenId(overrideProp.value.id).value;}
      else if (isDataVariable) {value = variableById(overrideProp.value.id)?.value;}
      else if (isOneOfValue) {value = propValueById(overrideProp.value.id)?.value;}
      else if (isDataModelField) {
        const modelFieldName = overrideProp.value.name;
        value = currentRecord[modelFieldName];
      }
      else {value = normalizedValue?.propValue;}

      // specific prop values
      if (typeof value === 'boolean' && normalizedValue?.propertyName === STYLE_PROPERTIES.display) {
        const displayPropertyValue = value ? DISPLAY_PROPERTIES.flex : DISPLAY_PROPERTIES.none;
        return displayPropertyValue;
      }

      return value;
    }

    case ENTITY_KINDS.TOKEN: return normalizedValue?.tokenValue;

    case ENTITY_KINDS.DATA_VARIABLE: return normalizedValue?.value;

    case ENTITY_KINDS.PRESET_MODE_VALUE: return normalizedValue?.value;

    default: return normalizedValue?.value;

    }
  }, [currentRecord, propValueById, currentInstance]);

  return {
    getNormalizedValue,
    getPreparedValue,
  };
};
