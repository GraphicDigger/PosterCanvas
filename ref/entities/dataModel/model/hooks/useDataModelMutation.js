import { v4 as uuidv4 } from 'uuid';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addDataModel, updateModel } from '../store/slice';
import { useDataModelStates } from './useDataModelStates';
import { useDataModelFieldMutation } from '../../../dataModelField';

export const useDataModelMutation = () => {

  const dispatch = useDispatch();
  const { handleSelectModel } = useDataModelStates();
  const { handleAddDataModelField } = useDataModelFieldMutation();

  const handleAddDataModel =  useCallback((modelId) => {
    const id = modelId || uuidv4();
    dispatch(addDataModel(id));
  }, [dispatch]);

  const handleUpdateDataModel = useCallback((model) => {
    dispatch(updateModel(model));
  }, [dispatch]);

  return {
    addDataModel: handleAddDataModel,
    updateDataModel: handleUpdateDataModel,
  };
};
