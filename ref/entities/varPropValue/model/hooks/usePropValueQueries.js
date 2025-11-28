import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { propValueApi } from '../../api/propValue.api';
import { setPropValues } from '../store/slice';
import { addPropValue, updatePropValue, deletePropValue } from '../store/slice';
import { addValueToProp } from '../../@x/prop';


export const usePropValueQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchPropValues = useCallback(async () => {
    try {
      setLoading(true);
      const propValues = await propValueApi.getPropValues();
      // console.log('prop values from hook usePropValues:', propValues);
      dispatch(setPropValues(propValues));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchPropValues();
  }, []);

  return {
    loading,
    error,
    fetchPropValues,
  };
};
