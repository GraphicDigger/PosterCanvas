import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { variableApi } from '../../api/variable.api';
import { setVariables } from '../store/slice';

export const useVariableQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVariables = useCallback(async () => {
    try {
      setLoading(true);
      const variables = await variableApi.getVariables();
      dispatch(setVariables(variables));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchVariables();
  }, [fetchVariables]);

  return { loading, error, fetchVariables };
};
