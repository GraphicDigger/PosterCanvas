import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { presetModeValueApi } from '../../api/presetModeValue.api';
import { setPresetModeValues } from '../store';

export const usePresetModeValueQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPresetModeValues = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const presetModeValues = await presetModeValueApi.getPresetModeValues();
      dispatch(setPresetModeValues(presetModeValues || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchPresetModeValues();
  }, [fetchPresetModeValues]);

  return {
    loading,
    error,
    fetchPresetModeValues,
  };
};
