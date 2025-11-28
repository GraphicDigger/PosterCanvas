import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { variableModeGroupApi } from '../../api/variableModeGroup.api';
import { setVariableModeGroups } from '../store';

export const useVariableModeGroupQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVariableModeGroups = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const variableModeGroups = await variableModeGroupApi.getVariableModeGroups();
      dispatch(setVariableModeGroups(variableModeGroups || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchVariableModeGroups();
  }, [fetchVariableModeGroups]);

  return {
    loading,
    error,
    fetchVariableModeGroups,
  };
};
