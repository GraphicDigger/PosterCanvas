import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { dataModelApi } from '../../api/dataModels.api';
import { setModels, setSelectedModelId } from '../store/slice';

export const useDataModelsQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchModels = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const models = await dataModelApi.getModels();
      dispatch(setModels(models || []));
      if (models.length > 0) {
        dispatch(setSelectedModelId(models[0].id));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return {
    loading,
    error,
    fetchModels,
  };
};
