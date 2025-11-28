import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { eventApi } from '../../api/event.api';
import { setEvents } from '../store';

export const useEventQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const events = await eventApi.getEvents();
      dispatch(setEvents(events || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    loading,
    error,
    fetchEvents,
  };
};
