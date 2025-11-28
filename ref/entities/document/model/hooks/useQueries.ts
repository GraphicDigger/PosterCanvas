import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { documentApi } from '../../api/document.api';
import { setDocuments } from '../store';

export const useDocumentQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | undefined>(undefined);

  const fetchDocuments = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const documents = await documentApi.getDocuments();
      dispatch(setDocuments(documents || []));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchDocuments,
  };
};
