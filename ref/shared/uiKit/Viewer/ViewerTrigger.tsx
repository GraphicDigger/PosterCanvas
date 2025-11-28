import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useViewer, useViewerStep } from './model';

interface ViewerTriggerProps {
    step?: number | number[];
    data?: any | any[];
    groupId?: string;
    children: ReactNode;
    onClick?: () => void;
    closeAllGroupSteps?: boolean; // Закрыть все viewer при клике
    closeAllGroups?: boolean; // Закрыть все viewer при клике
}

// trigger to open the entity viewer
export const ViewerTrigger = ({
  step = 1,
  groupId = 'default',
  data,
  children,
  onClick,
  closeAllGroupSteps = false,
  closeAllGroups = false,
}: ViewerTriggerProps) => {

  const { openViewerStep, closeAllStepInGroup, closeAllViewers } = useViewer();
  const currentStep = useViewerStep(); // Нужен для определения текущего шага

  const handleClick = () => {

    if (closeAllGroupSteps) {
      closeAllStepInGroup(groupId);
      if (onClick) {onClick();}
      return;
    }

    if (closeAllGroups) {
      closeAllViewers();
      if (onClick) {onClick();}
      return;
    }

    if (!step) {return;}

    const isStepArray = Array.isArray(step);
    const isDataArray = Array.isArray(data);

    if (isStepArray) {

      // Валидация: если data - массив, он должен соответствовать длине step
      if (isDataArray && data.length !== step.length) {
        console.warn('ViewerTrigger: data массив должен иметь ту же длину, что и step массив');
      }

      step.forEach((stepNumber, index) => {
        // Определяем данные для текущего шага
        let stepData = null;
        if (isDataArray && data[index] !== undefined) {
          stepData = data[index]; // Используем данные из массива
        } else if (!isDataArray) {
          stepData = data; // Используем общие данные
        }

        // Для первого шага используем currentStep, для остальных - предыдущий шаг
        const stepFromStep = index === 0 ? currentStep : step[index - 1];
        const sourceStep = stepFromStep !== undefined ? stepFromStep : currentStep;

        openViewerStep(stepNumber, stepData, sourceStep || undefined, groupId);
      });
    } else {
      // Если step - одно значение, открываем одно окно
      const sourceStep = currentStep !== undefined && currentStep !== null ? currentStep : undefined;
      openViewerStep(step, data || null, sourceStep, groupId);
    }

    if (onClick) {onClick();}

  };

  return (
    <StyledTrigger onClick={handleClick}>
      {children}
    </StyledTrigger>
  );
};

const StyledTrigger = styled.div`
   display: contents;
`;

