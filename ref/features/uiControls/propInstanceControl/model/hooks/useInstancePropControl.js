import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { ENTITY_KINDS } from '@/shared/constants';
import { useInstances } from '@/entities/uiInstance';
import { useDataModels } from '@/entities/dataModel';
import { useUITree } from '@/entities/uiTree';
import { selectPropById, useProp } from '@/entities/varProp';
import { selectPropValueById, usePropValue } from '@/entities/varPropValue';
import { selectCompositeInstanceById } from '@/entities/uiInstance';
import { selectDataModelById, useDataModel } from '@/entities/dataModel';
import { useVariables } from '@/entities/varVariableData';

export const useInstancePropControl = () => {

  const { focusedInstance: instance, instanceById } = useInstances();
  const { propById } = useProp();
  const { propValueById } = usePropValue();
  const { modelById } = useDataModel();
  const { allInstancesFromTree } = useUITree();
  const instanceProps = instance?.component?.props || [];
  const nestedInstances = allInstancesFromTree(ENTITY_KINDS.COMPONENT, instance.componentId);

  const { allModels } = useDataModels();
  const { selectedScreenVariables: { dataTypeVariables } } = useVariables();

  const getVariablesTypeDataByPropTypeData = useCallback((propId) => {
    const prop = propById(propId);
    if (!prop) {return [];}
    return dataTypeVariables.filter(v => v.value.id === prop.defaultValue?.modelId);
  }, [dataTypeVariables, propById]);

  // method to get the value of the prop of the instance
  const getCurrentPropValue = useCallback((propId, instanceId) => {
    const instance = instanceById(instanceId);
    const prop = propById(propId);
    if (!prop || !instance) {return null;}

    const overrideProp = instance?.override?.props?.[propId];
    const isStatic = overrideProp && typeof overrideProp.value !== 'object';
    const isOneOfValue = overrideProp && !isStatic && overrideProp.value?.type === ENTITY_KINDS.PROP_VALUE;
    const isDataModel = overrideProp && !isStatic && overrideProp.value?.type === ENTITY_KINDS.DATA_MODEL;

    if (overrideProp) {
      if (isStatic) {
        return overrideProp.value;
      }
      if (isOneOfValue) {
        const propValue = propValueById(overrideProp.value.id);
        return propValue?.name;
      }
      if (isDataModel) {
        const model = modelById(overrideProp.value.id);
        return model?.id;
      }
    }

    if (!overrideProp && prop.values?.length > 0) {
      const defaultPropValue = prop.values.find(v => v.isDefault);
      return defaultPropValue?.name || defaultPropValue?.value;
    }

    // Для DATA типа пропа, defaultValue может быть объектом с modelId
    if (prop.type === 'data' && prop.defaultValue && typeof prop.defaultValue === 'object') {
      return prop.defaultValue.modelId || '';
    }

    return prop.defaultValue || '';
  }, [instance, instanceProps, allModels]);

  return {
    allModels,
    getVariablesTypeDataByPropTypeData,
    instance,
    nestedInstances,
    getCurrentPropValue,
    instanceProps,
  };
};
