import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actorAgentApi } from '../../api/actorAgent.api';
import { setActorAgents } from '../store';

export const useActorAgentQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActorAgents = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const actorAgents = await actorAgentApi.getActorAgents();
      dispatch(setActorAgents(actorAgents || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchActorAgents();
  }, [fetchActorAgents]);

  return {
    loading,
    error,
    fetchActorAgents,
  };
};
