import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { notificationApi } from '../../api/notification.api';
import { setNotifications } from '../store';

export const useNotificationQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotifications = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const notifications = await notificationApi.getNotifications();
      dispatch(setNotifications(notifications || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    loading,
    error,
    fetchNotifications,
  };
};
