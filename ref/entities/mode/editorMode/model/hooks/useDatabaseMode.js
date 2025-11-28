import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { DATABASE_MODES } from '../constants/databaseModes';
import {
  toggleSchemaTable,
  toggleRecordTable,
  setDatabaseMode,
  setDatabaseModes,
  toggleCode,
} from '../store/slice';
import {
  selectIsSchemaMode,
  selectIsTableMode,
  selectIsCodeDatabaseMode,
  selectIsRecordDatabaseMode,
} from '../store/selectors';

export const useDatabaseMode = () => {
  const dispatch = useDispatch();

  const isSchemaInDatabaseMode = useSelector(selectIsSchemaMode);
  const isTableInDatabaseMode = useSelector(selectIsTableMode);
  const isCodeInDatabaseMode = useSelector(selectIsCodeDatabaseMode);
  const isRecordInDatabaseMode = useSelector(selectIsRecordDatabaseMode);

  const toggleModesSchemaTable = useCallback(() => {
    dispatch(toggleSchemaTable());
  }, [dispatch]);

  const toggleModesRecordTable = useCallback(() => {
    dispatch(toggleRecordTable());
  }, [dispatch]);

  const setModesDatabase = useCallback((...modes) => {
    dispatch(setDatabaseModes(modes));
  }, [dispatch]);

  const toggleModeCode = useCallback(() => {
    dispatch(toggleCode());
  }, [dispatch]);

  const setTableMode = useCallback(() => {
    dispatch(setDatabaseMode(DATABASE_MODES.TABLE));
  }, [dispatch]);

  return {
    toggleModesSchemaTable,
    toggleModesRecordTable,
    setModesDatabase,
    toggleModeCode,
    setTableMode,
    isSchemaInDatabaseMode,
    isTableInDatabaseMode,
    isCodeInDatabaseMode,
    isRecordInDatabaseMode,
  };
};
