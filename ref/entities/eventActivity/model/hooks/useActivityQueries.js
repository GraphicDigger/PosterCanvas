import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { activityApi } from '../../api/activity.api';
import { setActivities } from '../store';

export const useActivityQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchActivities = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const activities = await activityApi.getActivities();
      dispatch(setActivities(activities || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return {
    loading,
    error,
    fetchActivities,
  };
};
