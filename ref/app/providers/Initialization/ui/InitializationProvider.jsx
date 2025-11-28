import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ProjectInitContext } from '../model';
import { useInitializeData } from '../model';

export const InitializationProvider = ({ children }) => {

  const {
    initializeData,
    isInitialized,
    isLoading,
    error: dataError,
  } = useInitializeData();

  // Флаг для отслеживания первого запуска инициализации
  const initStartedRef = useRef(false);

  // Комбинируем ошибки
  const error = dataError;

  useEffect(() => {
    // Этот эффект сработает ОДИН РАЗ при монтировании
    if (!initStartedRef.current) {
      initStartedRef.current = true; // Устанавливаем флаг
      console.log('[InitializationProvider] Запуск первичной инициализации данных...');

      initializeData();
    }
  }, []);

  if (isLoading) {
    return <div data-testid="loading-screen">Loading application data...</div>;
  }

  if (error && (isInitialized || dataError)) {
    return <div>Error loading application data: {error.message || String(error)}</div>;
  }

  if (!isInitialized && !isLoading && !error) {
    return <div>Initialization failed silently or pending...</div>;
  }

  return (
    <ProjectInitContext.Provider
      value={{
        isLoading,
        error,
        isInitialized: isInitialized, // && isStackBlitzInitialized,
      }}
    >
      {children}
    </ProjectInitContext.Provider>
  );
};

InitializationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
