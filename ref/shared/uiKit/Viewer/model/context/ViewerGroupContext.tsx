import { createContext, useContext, ReactNode, useState } from 'react';

// Контекст для группы Viewer
const ViewerGroupContext = createContext<string>('default');

// Счетчик для автоматической генерации уникальных ID
let groupIdCounter = 0;

// Хук для получения ID группы
export const useViewerGroupId = () => {
  const groupId = useContext(ViewerGroupContext);
  console.log(`[useViewerGroupId] Returning groupId: ${groupId}`);
  return groupId;
};

// Провайдер для группы Viewer
export const ViewerGroupProvider = ({ children }: { children: ReactNode }) => {
  // Генерируем уникальный ID при создании провайдера
  const [groupId] = useState(() => {
    groupIdCounter += 1;
    const id = `viewer-group-${groupIdCounter}`;
    console.log(`[ViewerGroupProvider] Creating new group: ${id}`);
    return id;
  });

  console.log(`[ViewerGroupProvider] Rendering with groupId: ${groupId}`);

  return (
    <ViewerGroupContext.Provider value={groupId}>
      {children}
    </ViewerGroupContext.Provider>
  );
};

