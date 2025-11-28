import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actionApi } from '../../api/action.api';
import { setActions } from '../store/slice';

export const useActionQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActions = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const actions = await actionApi.getActions();
      dispatch(setActions(actions || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchActions();
  }, [fetchActions]);

  return {
    loading,
    error,
    fetchActions,
  };
};
