import { useState, useMemo } from 'react';
import { ENTITY_KINDS } from '@/shared/constants';
import { useDesignMode } from '@/entities/mode/editorMode';
import { useVariables } from '@/entities/varVariableData';
import { useProps } from '@/entities/varProp';
import { DATA_PICKER_TABS } from '../constants/dataPickerTabs';

export const useDataPicker = () => {

  const [pickerType, setPickerType] = useState(DATA_PICKER_TABS.DATA_VARIABLES);
  const {
    selectedScreenVariables: screenVariables,
    selectedComponentVariables: componentVariables,
  } = useVariables();
  const { selectedComponentProps: props } = useProps();

  const { isScreenCanvasInDesignMode, isComponentCanvasInDesignMode } = useDesignMode();
  const isScreenCanvas = isScreenCanvasInDesignMode;
  const isComponentCanvas = isComponentCanvasInDesignMode;

  const variables = useMemo(() => {
    if (isScreenCanvas) {
      return screenVariables.dataTypeVariables;
    }
    if (isComponentCanvas) {
      return componentVariables.dataTypeVariables;
    }
    return [];
  }, [isScreenCanvas, isComponentCanvas, screenVariables, componentVariables]);

  return {
    pickerType,
    setPickerType,
    isScreenCanvas,
    isComponentCanvas,
    variables,
    props,
  };
};

export const useVariablePicker = (propertyValue) => {

  const { isScreenCanvasInDesignMode, isComponentCanvasInDesignMode } = useDesignMode();
  const { selectedScreenVariables, selectedComponentVariables } = useVariables();

  const isProp = propertyValue?.type === ENTITY_KINDS.PROP;
  const isToken = propertyValue?.type === ENTITY_KINDS.TOKEN;
  const isDataModelField = propertyValue?.type === ENTITY_KINDS.DATA_MODEL_FIELD;
  const isDataVariable = propertyValue?.type === ENTITY_KINDS.DATA_VARIABLE;

  const variables = useMemo(() => {
    if (isScreenCanvasInDesignMode) {return selectedScreenVariables.allVariables;}
    if (isComponentCanvasInDesignMode) {return selectedComponentVariables.allVariables;}
    return [];
  }, [isScreenCanvasInDesignMode, isComponentCanvasInDesignMode, selectedScreenVariables, selectedComponentVariables]);

  return {
    variables,
    isProp,
    isToken,
    isDataModelField,
    isDataVariable,
  };
};
