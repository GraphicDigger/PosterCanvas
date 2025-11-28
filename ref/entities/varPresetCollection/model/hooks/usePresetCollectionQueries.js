import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { presetCollectionsApi } from '../../api/presetCollections.api';
import { setPresetCollections } from '../store/slice';
import { selectAllPresetCollections } from '../store/selectors';

export const usePresetCollectionQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPresetCollections = useCallback(async () => {
    if (loading) {return;}

    try {
      setLoading(true);
      const data = await presetCollectionsApi.getPresetCollections();
      dispatch(setPresetCollections(data));
    } catch (err) {
      setError(err);
      console.error('Error fetching preset collections:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchPresetCollections();
  }, [dispatch]);

  return {
    loading,
    error,
    refetch: fetchPresetCollections,
  };
};
