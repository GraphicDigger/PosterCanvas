import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tokenApi } from '../../api/token.api';
import { setTokens } from '../store/slice';
import { useAllTokens } from './useTokens';


// Хук для работы с токенами
export const useTokenQuery = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { allTokens } = useAllTokens();
  // Мемоизируем fetchTokens чтобы избежать лишних ререндеров
  const fetchTokens = useCallback(() => {
    if (loading) {return;} // Предотвращаем повторные вызовы во время загрузки

    try {
      setLoading(true);
      const tokens = tokenApi.getTokens();
      dispatch(setTokens(tokens || []));
    } catch (error) {
      setError(error);
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, loading]); // Зависимости для useCallback

  // Загружаем токены только при монтировании
  useEffect(() => {
    if (!allTokens.length) { // Загружаем только если токенов еще нет
      fetchTokens();
    }
  }, [fetchTokens]); // fetchTokens мемоизирован, поэтому безопасно использовать как зависимость

  return {
    loading,
    error,
    fetchTokens, // Оставляем для ручного обновления при необходимости
  };
};

