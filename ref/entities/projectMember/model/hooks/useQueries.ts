import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { projectMemberApi } from '../../api/projectMember.api';
import { setProjectMembers } from '../store';

export const useProjectMemberQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(undefined);

  const fetchProjectMembers = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const projectMembers = await projectMemberApi.getProjectMembers();
      dispatch(setProjectMembers(projectMembers || []));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchProjectMembers,
  };
};
