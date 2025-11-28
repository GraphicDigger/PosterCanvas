import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { codeApi } from '../../api/code.api';
import { setCodes } from '../store/slice';


export const useCodesQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCodes = useCallback(async () => {
    if (loading) {return;}

    try {
      setLoading(true);
      const codes = codeApi.getCodes();
      dispatch(setCodes(codes || []));
    } catch (error) {
      setError(error);
      console.error('Error fetching codes:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  return {
    loading,
    error,
    fetchCodes,
  };
};
