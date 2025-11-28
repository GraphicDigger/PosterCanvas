import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { userApi } from '../../api/user.api';
import { setUsers, setSelectedUserId } from '../store';

export const useUserQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(undefined);

  const fetchUsers = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const users = await userApi.getUsers();
      dispatch(setUsers(users || []));
      dispatch(setSelectedUserId(users[0]));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchUsers,
  };
};
