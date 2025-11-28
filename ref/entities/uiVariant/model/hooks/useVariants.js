import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { variantApi } from '../../api/variant.api';
import { setVariants } from '../store/slice';

export const useVariants = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchVariants = async () => {
    try {
      setLoading(true);
      const data = await variantApi.getVariants();
      dispatch(setVariants(data));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, [dispatch]);

  return {
    loading,
    error,
    refetchVariants: fetchVariants,
  };
};
