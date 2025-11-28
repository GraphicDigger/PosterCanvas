import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { componentApi } from '../../api/components.api';
import { setComponents } from '..';


export const useComponentQueries = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComponents = useCallback(async () => {
    try {
      setLoading(true);
      const components = componentApi.getComponents();
      dispatch(setComponents(components));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  return { fetchComponents, loading, error };
};
