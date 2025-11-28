import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { userspaceApi } from '../../api/userspace.api';
import { setUserspaces, setSelectedUserspaceId } from '../store';

export const useUserspaceQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserspaces = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const userspaces = await userspaceApi.getUserspaces();
      dispatch(setUserspaces(userspaces || []));
      dispatch(setSelectedUserspaceId(userspaces[0].id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchUserspaces();
  }, [fetchUserspaces]);

  return {
    loading,
    error,
    fetchUserspaces,
  };
};
