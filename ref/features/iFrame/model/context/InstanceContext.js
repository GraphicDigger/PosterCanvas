import { createContext, useContext } from 'react';

// Создаем контекст для инстанса
export const InstanceContext = createContext(null);

// Хук для получения текущего инстанса
export const useCurrentInstance = () => {
  return useContext(InstanceContext);
};
