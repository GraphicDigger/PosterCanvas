import { useDispatch } from 'react-redux';
import {
  removeVariableModesFromCollection,
  addVariableMode,
  updateVariableMode,
  removeVariableMode,
} from '../store';

export const useVariableModeMutation = () => {
  const dispatch = useDispatch();

  const handleAddVariableMode = (mode) => {
    dispatch(addVariableMode(mode));
  };

  const handleUpdateVariableMode = (id, updates) => {
    dispatch(updateVariableMode({ id, updates }));
  };

  const handleRemoveVariableMode = (variableModeId) => {
    dispatch(removeVariableMode({ modeId: variableModeId }));
  };

  const handleRemoveVariableModesFromCollection = (collectionId) => {
    dispatch(removeVariableModesFromCollection(collectionId));
  };

  return {
    addVariableMode: handleAddVariableMode,
    updateVariableMode: handleUpdateVariableMode,
    removeVariableMode: handleRemoveVariableMode,
    removeVariableModesFromCollection: handleRemoveVariableModesFromCollection,
  };
};
