import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addDataModel, updateModel, removeModel } from '../store/slice';
import { useDataModelStates } from './useDataModelStates';
import type { DataModel, CreateDataModelRequest, UpdateDataModelRequest } from '../../types';

export const useDataModelMutation = () => {
  const dispatch = useDispatch();
  const { handleSelectModel } = useDataModelStates();

  const handleAddDataModel = useCallback((modelData: CreateDataModelRequest | string) => {
    if (typeof modelData === 'string') {
      // Legacy support for string ID
      dispatch(addDataModel(modelData));
    } else {
      // New TypeScript interface
      dispatch(addDataModel(modelData));
    }
  }, [dispatch]);

  const handleUpdateDataModel = useCallback((modelData: UpdateDataModelRequest) => {
    dispatch(updateModel(modelData));
  }, [dispatch]);

  const handleRemoveDataModel = useCallback((id: string) => {
    dispatch(removeModel(id));
  }, [dispatch]);

  const handleCreateAndSelectModel = useCallback((modelData: CreateDataModelRequest) => {
    const id = modelData.id || uuidv4();
    dispatch(addDataModel({ ...modelData, id }));
    handleSelectModel(id);
  }, [dispatch, handleSelectModel]);

  return {
    addDataModel: handleAddDataModel,
    updateDataModel: handleUpdateDataModel,
    removeDataModel: handleRemoveDataModel,
    createAndSelectModel: handleCreateAndSelectModel,
  };
};
