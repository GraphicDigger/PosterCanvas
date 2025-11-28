import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { variableModeApi } from '../../api/variableMode.api';
import { setVariableModes } from '../store';

export const useVariableModeQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVariableModes = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const variableModes = await variableModeApi.getVariableModes();
      dispatch(setVariableModes(variableModes || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchVariableModes();
  }, [fetchVariableModes]);

  return {
    loading,
    error,
    fetchVariableModes,
  };
};
