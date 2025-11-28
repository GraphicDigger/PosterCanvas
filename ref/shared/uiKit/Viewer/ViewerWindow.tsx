import React, { ReactNode } from 'react';
import { ViewerStepProvider, useViewer } from './model';


interface ViewerWindowProps {
    step: number;
    groupId: string;
    data?: any;
    children: ReactNode;
}

// Контейнер с поддержкой двух режимов
export const ViewerWindow = ({
  step,
  groupId = 'default',
  data,
  children,
}: ViewerWindowProps) => {
  const { isViewerOpen, getViewerData, getMode, getCurrentStep } = useViewer();
  const mode = getMode();

  // В режиме 'single' показываем только текущий активный шаг
  // В режиме 'sequential' показываем все открытые шаги
  if (mode === 'single') {
    const currentStep = getCurrentStep(groupId);
    // Показываем только если это текущий шаг
    if (step !== currentStep) {return null;}
  } else {
    // В sequential режиме показываем если шаг открыт
    if (!isViewerOpen(step, groupId)) {return null;}
  }

  // Получаем данные из контекста если не переданы
  const viewerData = data || getViewerData(step, groupId);

  const enhancedChildren = viewerData === undefined
    ? children
    : React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, { data: viewerData });
      }
      return child;
    });

  return (
    <ViewerStepProvider step={step} groupId={groupId}>
      {enhancedChildren}
    </ViewerStepProvider>
  );
};
