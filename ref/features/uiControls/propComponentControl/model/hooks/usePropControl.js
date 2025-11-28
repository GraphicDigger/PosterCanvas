import { useCallback } from 'react';
import { useComponents } from '../../../../../entities/uiComponent';
import { usePropMutation } from '../../../../../entities/varProp';
import { usePropValueMutation } from '../../../../../entities/varPropValue';

export const usePropControl = () => {
  const { updateProp, deleteProp } = usePropMutation();
  const { updatePropValue, addPropValue } = usePropValueMutation();
  const { selectedComponent } = useComponents();

  console.log(JSON.stringify(selectedComponent, null, 2));

  const handleUpdatePropName = useCallback((id, value) => {
    updateProp(id, { name: value });
  }, [updateProp]);

  const handleUpdatePropType = useCallback((id, value) => {
    updateProp(id, { type: value });
  }, [updateProp]);

  const handleUpdatePropDefaultValue = useCallback((id, value) => {
    updateProp(id, { defaultValue: value });
  }, [updateProp]);

  const handleUpdatePropValueName = useCallback((id, propId, value) => {
    updatePropValue(id, propId, { name: value });
  }, [updatePropValue]);

  const handleUpdatePropValue = useCallback((id, propId, value) => {
    updatePropValue(id, propId, { value: value });
  }, [updatePropValue]);

  const handleDeleteProp = useCallback((id) => {
    deleteProp(id);
  }, [deleteProp]);

  const handleAddPropValue = useCallback((propId, type, e) => {
    e.preventDefault();
    e.stopPropagation();
    addPropValue(propId, type);
  }, [addPropValue]);

  return {
    // Данные
    selectedComponent,

    // Обработчики
    updatePropName: handleUpdatePropName,
    updatePropType: handleUpdatePropType,
    updatePropDefaultValue: handleUpdatePropDefaultValue,
    updatePropValueName: handleUpdatePropValueName,
    updatePropValue: handleUpdatePropValue,
    deleteProp: handleDeleteProp,
    addPropValue: handleAddPropValue,
  };
};
