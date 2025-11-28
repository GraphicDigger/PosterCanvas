import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { presetApi } from '../../api/preset.api';
import { setPresets } from '../store/slice';


// Хук для работы с токенами
export const usePresetQuery = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPresets = useCallback(() => {
    if (loading) {return;} // Предотвращаем повторные вызовы во время загрузки

    try {
      setLoading(true);
      const presets = presetApi.getPresets();
      dispatch(setPresets(presets || []));
    } catch (error) {
      console.error('Error fetching presets:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]); // Зависимости для useCallback


  useEffect(() => {
    fetchPresets();
  }, [dispatch]);

  return {
    loading,
    error,
    fetchPresets,
  };
};

