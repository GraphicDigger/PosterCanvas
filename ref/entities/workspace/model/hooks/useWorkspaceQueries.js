import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { workspaceApi } from '../../api/workspace.api';
import { setWorkspaces, setSelectedWorkspaceId } from '../store';

export const useWorkspaceQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWorkspaces = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const workspaces = await workspaceApi.getWorkspaces();
      dispatch(setWorkspaces(workspaces || []));
      dispatch(setSelectedWorkspaceId(workspaces[0].id));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces]);

  return {
    loading,
    error,
    fetchWorkspaces,
  };
};
