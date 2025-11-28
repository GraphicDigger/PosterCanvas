import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { instanceApi } from '../../api/instance.api';
import { setInstances } from '../store/slice';

export const useInstanceQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInstances = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const instances = await instanceApi.getInstances();
      dispatch(setInstances(instances || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchInstances();
  }, [fetchInstances]);

  return {
    loading,
    error,
    fetchInstances,
  };
};
