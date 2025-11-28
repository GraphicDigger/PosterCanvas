import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { elementApi } from '../../api/elements.api';
import { setElements } from '../store/slice';

export const useElementsQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchElements = useCallback(async () => {
    try {
      setLoading(true);
      const elements = await elementApi.getElements();
      dispatch(setElements(elements));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchElements();
  }, [fetchElements]);

  return {
    loading,
    error,
    fetchElements,
  };
};
