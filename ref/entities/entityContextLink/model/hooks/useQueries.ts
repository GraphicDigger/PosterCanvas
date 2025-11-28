import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { contextLinkApi } from '../../api/contextLink.api';
import { setContextLinks } from '../store';

export const useContextLinkQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(undefined);

  const fetchContextLinks = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const contextLinks = await contextLinkApi.getContextLinks();
      dispatch(setContextLinks(contextLinks || []));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchContextLinks,
  };
};
