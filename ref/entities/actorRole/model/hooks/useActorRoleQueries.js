import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actorRoleApi } from '../../api/actorRole.api';
import { setActorRoles } from '../store';

export const useActorRoleQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActorRoles = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const actorRoles = await actorRoleApi.getActorRoles();
      dispatch(setActorRoles(actorRoles || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchActorRoles();
  }, [fetchActorRoles]);

  return {
    loading,
    error,
    fetchActorRoles,
  };
};
