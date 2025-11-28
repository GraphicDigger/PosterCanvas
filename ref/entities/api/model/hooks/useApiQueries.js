import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { apiApi } from '../../api/api.api';
import { setApis } from '../store/slice';


export const useApiQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchApis = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      setError(null);
      const apis = await apiApi.getApis();
      dispatch(setApis(apis || []));
      return apis;
    } catch (error) {
      setError(error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);


  return {
    loading,
    error,
    fetchApis,
  };
};
