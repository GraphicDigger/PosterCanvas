import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tokenCollectionsApi } from '../../api/tokenCollections.api';
import { setTokenCollections, setSelectedTokenCollectionId } from '../store/slice';
import { selectAllTokenCollections } from '../store/selectors';

export const useTokenCollectionQueries = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTokenCollections = async () => {
    try {
      setLoading(true);
      const tokenCollections = await tokenCollectionsApi.getTokenCollections();
      dispatch(setTokenCollections(tokenCollections));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchTokenCollections,
  };
};
