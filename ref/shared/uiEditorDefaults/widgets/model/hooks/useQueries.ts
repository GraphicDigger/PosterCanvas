import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setDefaultWidgets } from '../store';
import { defaultWidgetsApi } from '../../api/widgets.api';

export const useDefaultWidgetsQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(undefined);

  const fetchDefaultWidgets = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const defaultWidgets = await defaultWidgetsApi.getDefaultWidgets();
      dispatch(setDefaultWidgets(defaultWidgets as DefaultWidget[]));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchDefaultWidgets,
  };
};
