import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { commentApi } from '../../api/comment.api';
import { setComments } from '../store';

export const useCommentQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const comments = await commentApi.getComments();
      dispatch(setComments(comments || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchComments,
  };
};
