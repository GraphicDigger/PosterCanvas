import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { taskAssigneeApi } from '../../api/taskAssignee.api';
import { setTaskAssignees } from '../store';

export const useTaskAssigneeQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(undefined);

  const fetchTaskAssignees = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const taskAssignees = await taskAssigneeApi.getTaskAssignees();
      dispatch(setTaskAssignees(taskAssignees || []));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchTaskAssignees,
  };
};
