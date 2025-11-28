import { createContext, useContext, ReactNode } from 'react';

// Интерфейс для контекста
interface ViewerStepContextValue {
    step: number;
    groupId: string;
}

// Контекст для хранения текущего шага и группы
const ViewerStepContext = createContext<ViewerStepContextValue | null>(null);

// Хук для получения текущего шага
export const useViewerStep = () => {
  const context = useContext(ViewerStepContext);
  return context?.step || null;
};

// Хук для получения ID группы
export const useViewerGroupId = () => {
  const context = useContext(ViewerStepContext);
  return context?.groupId || 'default';
};

// Провайдер для текущего шага и группы
export const ViewerStepProvider = ({ step, groupId, children }: { step: number; groupId: string; children: ReactNode }) => {
  return (
    <ViewerStepContext.Provider value={{ step, groupId }}>
      {children}
    </ViewerStepContext.Provider>
  );
};

