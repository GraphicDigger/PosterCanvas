import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { projectApi } from '../../api/project.api';
import { setProjects, setSelectedProjectId } from '../store/slice';

export const useProjectQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const projects = await projectApi.getProjects();
      dispatch(setProjects(projects || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    loading,
    error,
    fetchProjects,
  };
};
