import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { propApi } from '../../api/prop.api';
import { setProps, addProp } from '../store/slice';

export const  usePropQueries = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProps = useCallback(async () => {
    try {
      setLoading(true);
      const props = await propApi.getProps();
      // console.log('props from hook useProps:', props);
      dispatch(setProps(props));
    } catch (error) {
      setError(error);
      // console.error('Error fetching props:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return {
    loading,
    error,
    fetchProps,
  };
};
