import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { taskApi } from '../../api/task.api';
import { setTasks } from '../store';

export const useTaskQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(undefined);

  const fetchTasks = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const tasks = await taskApi.getTasks();
      dispatch(setTasks(tasks || []));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchTasks,
  };
};
