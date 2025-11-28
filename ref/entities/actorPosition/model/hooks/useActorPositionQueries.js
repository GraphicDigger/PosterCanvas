import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { actorPositionApi } from '../../api/actorPosition.api';
import { setActorPositions } from '../store';

export const useActorPositionQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActorPositions = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const actorPositions = await actorPositionApi.getActorPositions();
      dispatch(setActorPositions(actorPositions || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchActorPositions();
  }, [fetchActorPositions]);

  return {
    loading,
    error,
    fetchActorPositions,
  };
};
