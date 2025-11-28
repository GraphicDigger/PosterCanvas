import { createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllDataRecords,
  selectSelectedDataRecord,
  selectDataRecordsByIds,
  selectRawDataRecordsByModelId,
  selectDataRecordById,
  selectDataRecordFieldValueByModelFieldId,
  selectDataRecordsByModelId,
  selectRawDataRecordFieldValueById,
  selectRecordDisplayValue,

} from '../store/selectors';
import { useDataRecordQueries } from './useDataRecordQueries';
import { addDataRecord } from '../store';
import { useDataModels } from '../../../dataModel';


export const useDataRecords = () => {
  const allDataRecords = useSelector(selectAllDataRecords);
  const selectedDataRecord = useSelector(selectSelectedDataRecord);
  const getRecordFieldValue = useSelector(selectRawDataRecordFieldValueByIdFn);
  const getRecordDisplayValue = useSelector(selectRecordDisplayValueFn);
  const getRecordsByModelId = useSelector(selectRawDataRecordsByModelIdFn);

  return {
    allDataRecords,
    selectedDataRecord,
    getRecordFieldValue,
    getRecordDisplayValue,
    getRecordsByModelId,
  };
};


export const useRecordsByModelId = (id) => {
  const rawRecords = useSelector(state => selectRawDataRecordsByModelId(state, id));
  const records = useSelector(state => selectDataRecordsByModelId(state, id));
  return {
    rawRecords,
    records,

  };
};

export const useRecordsBySelectedModel = () => {
  const { selectedModel } = useDataModels();
  const rawRecords = useSelector(state => selectRawDataRecordsByModelId(state, selectedModel?.id));
  const records = useRecordsByModelId(selectedModel?.id || []);
  return {
    rawRecords,
    records: records.records,
  };
};


export const useRecordsByIds = (ids) => {
  const records = useSelector(state => selectDataRecordsByIds(state, ids));
  return { records };
};


export const useRecordById = (id) => {
  const record = useSelector(state => selectDataRecordById(state, id));
  return { record };
};


export const useRecordFieldValueByModelFieldId = (modelFieldId) => {
  const recordFieldValue = useSelector(state => selectDataRecordFieldValueByModelFieldId(state, modelFieldId));
  return { recordFieldValue };
};


export const useDataRecordMutation = () => {
  const dispatch = useDispatch();

  const handleAddDataRecord = (recordId, modelId) => {
    dispatch(addDataRecord(recordId, modelId));
  };

  return {
    addDataRecord: handleAddDataRecord,
  };
};


export const selectRawDataRecordsByModelIdFn = createSelector(
  [(state) => state],
  (state) => (recordId) => selectRawDataRecordsByModelId(state, recordId),
);

export const selectRawDataRecordFieldValueByIdFn = createSelector(
  [(state) => state],
  (state) => (recordId, fieldId) => selectRawDataRecordFieldValueById(state, recordId, fieldId),
);

export const selectRecordDisplayValueFn = createSelector(
  [(state) => state],
  (state) => (recordId) => selectRecordDisplayValue(state, recordId),
);

