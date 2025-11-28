import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDataRecordStates } from '../../../../entities/dataRecord';
import { useDataRecordMutation } from '../../../../entities/dataRecord';
import { useDataModels } from '../../../../entities/dataModel';
import { useDatabaseMode, useGlobalModes } from '../../../../entities/mode/editorMode';
import { useRecordsBySelectedModel } from '../../../../entities/dataRecord';
import { useDataModelMutation, useDataModelStates } from '../../../../entities/dataModel';
import { useDataModelFields, useDataModelFieldStates } from '../../../../entities/dataModelField';

export const useDataManager = () => {
  const recordId = uuidv4();

  const { selectedModel, allModels } = useDataModels();
  const { handleSelectModel: selectModel } = useDataModelStates();
  const { filteredModelFieldsInTableMode } = useDataModelFields();
  const { handleDeselect: deselectModelField } = useDataModelFieldStates();

  const { rawRecords, records } = useRecordsBySelectedModel();
  const { addDataRecord } = useDataRecordMutation();

  const { setGlobalDesignMode, isDatabaseModeGlobal } = useGlobalModes();

  const {
    isSchemaInDatabaseMode,
    isTableInDatabaseMode,
    isRecordInDatabaseMode,
    isCodeInDatabaseMode,
    toggleModesRecordTable,
    toggleModesSchemaTable,
    toggleModeCode,
    setTableMode,
  } = useDatabaseMode();

  const handleToggleModesSchemaTable = useCallback(() => {
    toggleModesSchemaTable();
  }, [toggleModesSchemaTable]);

  const handleToggleModesRecordTable = useCallback(() => {
    toggleModesRecordTable();
  }, [toggleModesRecordTable]);

  const handleToggleModeCode = useCallback(() => {
    toggleModeCode();
  }, [toggleModeCode]);

  const handleSetGlobalDesignMode = useCallback(() => {
    setGlobalDesignMode();
  }, [setGlobalDesignMode]);

  const handleSelectModel = useCallback((modelId) => {
    deselectModelField();
    selectModel(modelId);
    setTableMode();
  }, [selectModel, deselectModelField, setTableMode]);

  const handleSetTableMode = useCallback(() => {
    setTableMode();
  }, [setTableMode]);


  return {
    allModels,
    selectedModel,
    filteredModelFieldsInTableMode,
    selectModel: handleSelectModel,

    rawRecords,
    records,

    toggleModesSchemaTable: handleToggleModesSchemaTable,
    toggleModesRecordTable: handleToggleModesRecordTable,
    toggleModeCode: handleToggleModeCode,
    setGlobalDesignMode: handleSetGlobalDesignMode,

    isSchemaInDatabaseMode,
    isDatabaseModeGlobal,
    isTableInDatabaseMode,
    isRecordInDatabaseMode,
    isCodeInDatabaseMode,

  };
};
