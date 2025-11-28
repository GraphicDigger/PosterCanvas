import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { dataModelApi } from '../../api/dataModels.api';
import { setModels, setSelectedModelId } from '../store/slice';
import type { DataModel, DataModelQuery } from '../../types';

export const useDataModelsQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchModels = useCallback(async (query?: DataModelQuery) => {
    if (loading) {return;}
    try {
      setLoading(true);
      setError(null);
      const models = await dataModelApi.getModels(query);
      dispatch(setModels(models || []));
      if (models.length > 0) {
        dispatch(setSelectedModelId(models[0].id));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  const fetchModelById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const model = await dataModelApi.getModelById(id);
      return model;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const createModel = useCallback(async (modelData: Omit<DataModel, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      const newModel = await dataModelApi.createModel(modelData);
      return newModel;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateModel = useCallback(async (id: string, updates: Partial<DataModel>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedModel = await dataModelApi.updateModel(id, updates);
      return updatedModel;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteModel = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await dataModelApi.deleteModel(id);
      return success;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return {
    loading,
    error,
    fetchModels,
    fetchModelById,
    createModel,
    updateModel,
    deleteModel,
  };
};
