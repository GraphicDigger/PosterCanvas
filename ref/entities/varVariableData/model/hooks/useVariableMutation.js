import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addVariable, updateVariable, removeVariable } from '../store';
import { useScreens } from '@/entities/uiScreen';
import { useComponents } from '@/entities/uiComponent';
import { useDesignMode } from '@/entities/mode/editorMode';
import { ENTITY_KINDS, VARIABLE_TYPES } from '@/shared/constants';

export const useVariableMutation = () => {
  const dispatch = useDispatch();
  const { selectedScreenId } = useScreens();
  const { selectedComponentId } = useComponents();
  const { isScreenCanvasInDesignMode } = useDesignMode();

  const handleAddVariable = (type) => {
    if (!type) {return null;}

    const defaultValues = {
      [VARIABLE_TYPES.STRING]: '',
      [VARIABLE_TYPES.NUMBER]: 0,
      [VARIABLE_TYPES.BOOLEAN]: false,
      [VARIABLE_TYPES.COLOR]: '#000000',
      [VARIABLE_TYPES.IMAGE]: '',
      [VARIABLE_TYPES.VIDEO]: '',
      [VARIABLE_TYPES.DATA]: { modelId: 'model0' },
      [VARIABLE_TYPES.DATE]: new Date().toISOString(),
      [VARIABLE_TYPES.JSON]: '{}',
    };

    // Определяем ownership в зависимости от режима
    const ownership = isScreenCanvasInDesignMode
      ? {
        id: selectedScreenId,
        type: ENTITY_KINDS.SCREEN,
      }
      : {
        id: selectedComponentId,
        type: ENTITY_KINDS.COMPONENT,
      };

    if (!ownership.id) {return null;}

    const newVariable = {
      id: uuidv4(),
      name: 'New Variable',
      kind: ENTITY_KINDS.DATA_VARIABLE,
      type,
      value: defaultValues[type] ?? '',
      ownership,
    };

    dispatch(addVariable(newVariable));
    return newVariable;
  };

  const handleUpdateVariable = (variableId, updates) => {
    dispatch(updateVariable({ id: variableId, ...updates }));
  };

  const handleRemoveVariable = (variableId) => {
    dispatch(removeVariable(variableId));
  };

  return {
    addVariable: handleAddVariable,
    updateVariable: handleUpdateVariable,
    removeVariable: handleRemoveVariable,
  };
};
