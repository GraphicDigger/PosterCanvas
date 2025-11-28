import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  selectSelectedModel,
  selectAllDataModels,
  selectDataModelById,
} from '../store/selectors';
import { addDataModel, updateModel } from '../store/slice';
import { MODEL_FIELD_TYPES, useDataModelFieldMutation } from '../../../dataModelField';
import { useDataModelStates } from './useDataModelStates';


export const useDataModels = () => {

  const allModels = useSelector(selectAllDataModels);
  const selectedModel = useSelector(selectSelectedModel);
  const selectedModelName = selectedModel?.label;

  return {
    allModels,
    selectedModel,
    selectedModelName,
  };
};

export const useDataModel = (id) => {
  const model = useSelector((state) => selectDataModelById(state, id));
  const modelById = useSelector(selectDataModelByIdFn);
  return {
    model,
    modelById,
  };
};


const selectDataModelByIdFn = createSelector(
  [(state) => state],
  (state) => (modelId) => selectDataModelById(state, modelId),
);

