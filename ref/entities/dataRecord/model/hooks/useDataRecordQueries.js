import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { dataRecordApi } from '../../api/dataRecords.api';
import { setRecords } from '../store/slice';

export const useDataRecordQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecords = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const records = await dataRecordApi.getRecords();
      dispatch(setRecords(records || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  return {
    loading,
    error,
    fetchRecords,
  };
};
