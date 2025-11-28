import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { tokenValueApi } from '../../api/tokenValue.api';
import { setTokenValues } from '../store';

export const useTokenValueQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTokenValues = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const tokenValues = await tokenValueApi.getTokenValues();
      dispatch(setTokenValues(tokenValues || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchTokenValues();
  }, [fetchTokenValues]);

  return {
    loading,
    error,
    fetchTokenValues,
  };
};
