import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { htmlAttrApi } from '../../api/htmlAttr.api';
import { setHtmlAttrs } from '../store';

export const useHtmlAttrQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHtmlAttrs = useCallback(async () => {
    if (loading) {return;}
    try {
      setLoading(true);
      const htmlAttrs = await htmlAttrApi.getHtmlAttrs();
      dispatch(setHtmlAttrs(htmlAttrs || []));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]);

  return {
    loading,
    error,
    fetchHtmlAttrs,
  };
};
