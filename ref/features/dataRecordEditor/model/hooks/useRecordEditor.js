import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { saveDraftRecordThunk } from '../store/thunks';
import { useDatabaseMode } from '../../../../entities/mode/editorMode';
import { useDataModelFields } from '../../../../entities/dataModelField';
import { useDataModelFieldStates } from '../../../../entities/dataModelField';
import {
  selectDraft,
  selectHasDraftChanges,
  updateDraftField,
  clearDraft,
} from '../store';
import { useDataModels } from '../../../../entities/dataModel';
import { useRecordsBySelectedModel, useDataRecordMutation, useDataRecords, useDataRecordStates } from '../../../../entities/dataRecord';


export const useRecordEditor = (recordId) => {

  const dispatch = useDispatch();
  const { toggleModesRecordTable, isRecordInDatabaseMode } = useDatabaseMode();

  const { records, rawRecords } = useRecordsBySelectedModel();
  const { selectedDataRecord } = useDataRecords();
  const { getRecordFieldValue } = useDataRecords();
  const { handleSelect: selectRecord, getIsSelected, getIsFocused, getIsHovered } = useDataRecordStates();
  const { addDataRecord } = useDataRecordMutation();
  const draft = useSelector(state => selectDraft(state, recordId)); // { recordId, changes }
  const hasDraftChanges = useSelector(selectHasDraftChanges);
  const { selectedModel } = useDataModels();
  const { filteredModelFieldsInRecordMode, filteredModelFieldsInTableMode, selectedModelField } = useDataModelFields();
  const { handleSelectField: selectField, handleDeselect: deselectField } = useDataModelFieldStates();

  const handleAddDataRecord = useCallback(() => {
    const recordId = uuidv4();
    if (!isRecordInDatabaseMode) {
      toggleModesRecordTable();
    }
    addDataRecord({ recordId, modelId: selectedModel?.id });
    selectRecord(recordId);
  }, [addDataRecord, selectedModel, toggleModesRecordTable, selectRecord, isRecordInDatabaseMode]);

  const handleSelectRecord = useCallback((recordId) => {
    selectRecord(recordId);
    toggleModesRecordTable();
  }, [selectRecord, toggleModesRecordTable]);

  const handleSelectField = (modelFieldId) => selectField(modelFieldId);
  const handleDeselectField = () => deselectField();

  const updateField = (recordId, modelFieldId, value) => {
    dispatch(updateDraftField({ recordId, modelFieldId, value }));
  };

  const getFieldValue = useCallback((modelFieldId, record) => {
    return draft?.changes?.[modelFieldId] !== undefined
      ? draft.changes[modelFieldId]
      : record?.[modelFieldId] ?? '';
  }, [draft]);

  const saveDraftRecord = async () => {
    try {
      await dispatch(saveDraftRecordThunk()).unwrap();
    } catch (error) {
      console.error('Failed to save model:', error);
    }
  };

  const discardChanges = () => dispatch(clearDraft());

  return {
    draft,
    hasDraftChanges,
    updateField,
    getFieldValue,
    discardChanges,
    saveDraftRecord,

    records,
    rawRecords,
    addDataRecord: handleAddDataRecord,
    selectedDataRecord,
    selectRecord: handleSelectRecord,
    toggleModesRecordTable,

    getRecordFieldValue,

    selectedModel,
    filteredModelFieldsInRecordMode,
    filteredModelFieldsInTableMode,
    selectedModelField,
    handleSelectField,
    handleDeselectField,
  };
};
