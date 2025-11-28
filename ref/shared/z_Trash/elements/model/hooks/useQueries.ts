import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { defaultElementsApi } from '../../api/defaultElements.api';
import { setDefaultElements } from '../store';

export const useDefaultElementsQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(undefined);

  const fetchDefaultElements = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const defaultElements = await defaultElementsApi.getDefaultElements();
      dispatch(setDefaultElements(defaultElements));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchDefaultElements,
  };
};
