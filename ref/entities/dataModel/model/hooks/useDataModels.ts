import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedModel,
  selectAllDataModels,
  selectDataModelById,
  selectDataModelCount,
  selectActiveDataModels,
  selectDataModelsByTag,
  selectDataModelsBySearch,
} from '../store/selectors';
import { addDataModel, updateModel, removeModel } from '../store/slice';
import { useDataModelStates } from './useDataModelStates';
import type { DataModel, CreateDataModelRequest, UpdateDataModelRequest } from '../../types';

export const useDataModels = () => {
  const allModels = useSelector(selectAllDataModels);
  const selectedModel = useSelector(selectSelectedModel);
  const selectedModelName = selectedModel?.name;
  const modelCount = useSelector(selectDataModelCount);
  const activeModels = useSelector(selectActiveDataModels);

  return {
    allModels,
    selectedModel,
    selectedModelName,
    modelCount,
    activeModels,
  };
};

export const useDataModel = (id: string) => {
  const model = useSelector((state: any) => selectDataModelById(state, id));

  return {
    model,
    exists: !!model,
  };
};

export const useDataModelByTag = (tag: string) => {
  const models = useSelector((state: any) => selectDataModelsByTag(state, tag));

  return {
    models,
    count: models.length,
  };
};

export const useDataModelSearch = (searchTerm: string) => {
  const models = useSelector((state: any) => selectDataModelsBySearch(state, searchTerm));

  return {
    models,
    count: models.length,
  };
};

export const useDataModelMutation = () => {
  const dispatch = useDispatch();
  const states = useDataModelStates();

  const createModel = (modelData: CreateDataModelRequest) => {
    dispatch(addDataModel(modelData));
  };

  const updateModelData = (id: string, updates: Partial<DataModel>) => {
    dispatch(updateModel({ id, ...updates }));
  };

  const deleteModel = (id: string) => {
    dispatch(removeModel(id));
  };

  return {
    createModel,
    updateModelData,
    deleteModel,
    ...states,
  };
};
