import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { memberApi } from '../../api/member.api';
import { setMembers } from '../store/slice';

export const useMemberQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMembers = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const members = await memberApi.getMembers();
      dispatch(setMembers(members || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return {
    loading,
    error,
    fetchMembers,
  };
};
