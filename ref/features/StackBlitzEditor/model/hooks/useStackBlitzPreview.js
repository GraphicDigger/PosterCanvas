import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFocusObject,
  setObjectMetrics,
  setIsSelecting,
  setErrorFocusObject,
  resetFocusObject,
} from '../store/slice';

export const useStackBlitzPreview = () => {
  const dispatch = useDispatch();

  // Селекторы
  const focusedObject = useSelector(state => state.stackBlitz?.focusObject);
  const objectMetrics = useSelector(state => state.stackBlitz?.objectMetrics);
  const isSelecting = useSelector(state => state.stackBlitz?.isSelecting);
  const error = useSelector(state => state.stackBlitz?.error);

  // Получение метрик элемента с учетом iframe
  const getElementMetrics = useCallback((element, iframe) => {
    if (!element || !iframe) {return null;}

    try {
      const rect = element.getBoundingClientRect();
      const iframeRect = iframe.getBoundingClientRect();

      // Корректируем координаты с учетом позиции iframe
      const metrics = {
        size: {
          width: rect.width,
          height: rect.height,
        },
        position: {
          top: rect.top + iframeRect.top,
          left: rect.left + iframeRect.left,
          bottom: rect.bottom + iframeRect.top,
          right: rect.right + iframeRect.left,
        },
        styles: {
          padding: window.getComputedStyle(element).padding,
          margin: window.getComputedStyle(element).margin,
          border: window.getComputedStyle(element).border,
        },
      };

      return metrics;
    } catch (error) {
      console.error('Ошибка при получении метрик:', error);
      return null;
    }
  }, []);

  // Actions
  const setElement = useCallback((element, iframe) => {
    if (!element) {return;}

    dispatch(setFocusObject(element));
    const metrics = getElementMetrics(element, iframe);
    if (metrics) {
      dispatch(setObjectMetrics(metrics));
    }
  }, [dispatch, getElementMetrics]);

  const toggleSelecting = useCallback((value) => {
    dispatch(setIsSelecting(value));
  }, [dispatch]);

  const handleError = useCallback((error) => {
    dispatch(setErrorFocusObject(error));
  }, [dispatch]);

  const reset = useCallback(() => {
    dispatch(resetFocusObject());
  }, [dispatch]);

  return {
    focusedObject,
    objectMetrics,
    isSelecting,
    error,
    setElement,
    toggleSelecting,
    handleError,
    reset,
    getElementMetrics,
  };
};
