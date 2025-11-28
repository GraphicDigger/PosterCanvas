import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { wireframeBlockApi } from '../../api/wireframeBlock.api';
import { setWireframeBlocks } from '../store/slice';

export const useWireframeBlockQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWireframeBlocks = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const wireframeBlocks = await wireframeBlockApi.getWireframeBlocks();
      dispatch(setWireframeBlocks(wireframeBlocks || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchWireframeBlocks();
  }, [fetchWireframeBlocks]);

  return {
    loading,
    error,
    fetchWireframeBlocks,
  };
};
