import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { useDataModels } from '../../../dataModel';
import { EXCLUDE_FIELDS } from '../constants/exclideFields';
import {
  selectAllDataModelFields,
  selectSelectedModelField,
  selectFilteredModelFieldsInTableMode,
  selectFilteredModelFieldsInRecordMode,
  selectFieldsForSelectedModel,
  selectModelFieldsByModelId,
  selectModelFieldById,
} from '../store/selectors';
import { addDataModelField } from '../store/slice';


export const useDataModelFields = (options) => {

  const allModelFields = useSelector(selectAllDataModelFields);

  const filteredModelFieldsInTableMode = useSelector(selectFilteredModelFieldsInTableMode);
  const filteredModelFieldsInRecordMode = useSelector(selectFilteredModelFieldsInRecordMode);

  const fieldsSelectedModel = useSelector(selectFieldsForSelectedModel);
  const selectedModelField = useSelector(selectSelectedModelField);

  const modelFieldsByModelId = useSelector(selectModelFieldsByModelIdFn);
  const modelFieldById = useSelector(selectModelFieldByIdFn);

  return {
    allModelFields,
    fieldsSelectedModel,
    filteredModelFieldsInTableMode,
    filteredModelFieldsInRecordMode,
    selectedModelField,
    modelFieldsByModelId,
    modelFieldById,
  };
};

export const useDataModelFieldMutation = () => {

  const dispatch = useDispatch();

  const handleAddDataModelField = (field) => {
    dispatch(addDataModelField(field));
  };

  return {
    handleAddDataModelField,
  };
};

const selectModelFieldByIdFn = createSelector(
  [(state) => state],
  (state) => (modelId) => selectModelFieldById(state, modelId),
);

const selectModelFieldsByModelIdFn = createSelector(
  [(state) => state],
  (state) => (modelId) => selectModelFieldsByModelId(state, modelId),
);
