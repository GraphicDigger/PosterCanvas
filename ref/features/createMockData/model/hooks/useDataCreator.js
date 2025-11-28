import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { dataModels } from '../../../../entities/dataModel';
import { dataModelFields } from '../../../../entities/dataModelField';
import { dataRecords } from '../../../../entities/dataRecord';
import {
  setModels,
  setSelectedModelId,
} from '../../../../entities/dataModel';
import { setModelFields } from '../../../../entities/dataModelField';
import { setRecords } from '../../../../entities/dataRecord';


export const useDataCreator = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreated, setIsCreated] = useState(false);

  const createMockData = useCallback(async () => {
    if (loading || isCreated) {return;}

    try {
      setLoading(true);
      dispatch(setModels(dataModels));
      dispatch(setModelFields(dataModelFields));
      dispatch(setRecords(dataRecords));
      dispatch(setSelectedModelId(dataModels[0].id));

      setIsCreated(true);
    } catch (err) {
      setError(err);
      console.error('Error creating mock data:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading, isCreated]);

  return {
    createMockData,
    loading,
    error,
    isCreated,
  };
};
