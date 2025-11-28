import { createContext, useContext } from 'react';

// Создаем контекст, который будет хранить одну запись из коллекции
export const DataRecordContext = createContext(null);

// Создаем кастомный хук для удобного доступа к данным из контекста
export const useCurrentDataRecord = () => {
  return useContext(DataRecordContext);
};
