import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { dataModelFieldsApi } from '../../api/dataModelFields.api';
import { setModelFields, setSelectedModelFieldId } from '../store/slice';

export const useDataModelsFieldsQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchModelsFields = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const modelsFields = await dataModelFieldsApi.getModelsFields();
      dispatch(setModelFields(modelsFields || []));

    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchModelsFields();
  }, [fetchModelsFields]);

  return {
    loading,
    error,
    fetchModelsFields,
  };
};
