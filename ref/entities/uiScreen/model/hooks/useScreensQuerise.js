import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setScreens } from '../store/slice';
import { useScreenStates } from './useScreenStates';
import { screenApi } from '../../api/mock.api';

export const useScreensQueries = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { handleSelect: handleSelectScreen } = useScreenStates();

  const fetchScreens = useCallback(async () => {
    try {
      setLoading(true);
      const screens = await screenApi.getScreens();
      dispatch(setScreens(screens));
      if (screens.length > 0) {
        handleSelectScreen(screens[0].id);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, handleSelectScreen]);

  return { loading, error, fetchScreens };
};
