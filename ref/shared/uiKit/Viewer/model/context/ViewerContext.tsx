import { createContext, useContext, useState, ReactNode } from 'react';

type NavigationMode = 'single' | 'sequential';

interface ViewerState {
    isOpen: boolean;
    data: any | null;
}

interface State {
    viewers: Record<string, Record<number, ViewerState>>; // groupId -> step -> ViewerState
    mode: NavigationMode;
    history: Record<string, number[]>; // groupId -> step[]
}

interface ContextProps {
    openViewerStep: (step: number, data: any, fromStep?: number, groupId?: string) => void;
    closeViewerStep: (step: number, groupId?: string) => void;
    closeViewerSubSteps: (step: number, groupId?: string) => void;
    toggleViewerStep: (step: number, data?: any, groupId?: string) => void;
    isViewerOpen: (step: number, groupId?: string) => boolean;
    isAnyViewerOpen: (groupId?: string) => boolean;
    getViewerData: (step: number, groupId?: string) => any | null;
    closeAllViewers: () => void;
    closeAllStepInGroup: (groupId: string) => void;
    goBack: (groupId?: string) => void;
    getMode: () => NavigationMode;
    getCurrentStep: (groupId?: string) => number | null;
    hasAnyViewerOpen: (groupId?: string) => boolean;
    getTotalSteps: (groupId?: string) => number;
    getLastStep: (groupId?: string) => number | null;
}

const ViewerContext = createContext<ContextProps | null>(null);

interface ViewerProviderProps {
    children: ReactNode;
    mode?: NavigationMode;
}

export const ViewerProvider = ({ children, mode = 'sequential' }: ViewerProviderProps) => {

  const [state, setState] = useState<State>({
    viewers: {},
    mode,
    history: {},
  });

  const openViewerStep = (
    step: number,
    data: any,
    fromStep?: number,
    groupId: string = 'default',
  ) => {
    setState(prev => {
      // Сохраняем состояние ТЕКУЩЕЙ группы, если оно было
      const currentGroupViewers = prev.viewers[groupId] || {};
      const currentGroupHistory = prev.history[groupId] || [];

      // Создаем новый state, который содержит ТОЛЬКО текущую группу,
      // эффективно удаляя все остальные.
      const newViewers = { [groupId]: { ...currentGroupViewers } };
      const newHistory = { [groupId]: [...currentGroupHistory] };

      // Дальше логика открытия/закрытия шагов остается прежней,
      // но она будет работать с очищенным состоянием.
      const groupViewers = newViewers[groupId];
      const viewerSteps = Object.keys(groupViewers).map(Number).sort((a, b) => a - b);

      // Открываем указанный шаг
      groupViewers[step] = { isOpen: true, data };

      // Определяем родительский шаг
      const parentStep = fromStep !== undefined ? fromStep :
        (() => {
          const openSteps = Object.keys(groupViewers)
            .map(Number)
            .filter(stepNum => groupViewers[stepNum]?.isOpen)
            .sort((a, b) => a - b);
          return openSteps.length > 0 ? Math.max(...openSteps) : 0;
        })();

      // Закрываем все шаги с большими номерами, чем целевой
      viewerSteps.forEach((stepNum: number) => {
        if (stepNum > step) {
          groupViewers[stepNum] = { isOpen: false, data: null };
        }
      });

      // Проверяем, есть ли промежуточные шаги между родительским и целевым
      if (parentStep && parentStep < step) {
        const hasIntermediateSteps = viewerSteps.some(stepNum =>
          stepNum > parentStep && stepNum < step,
        );

        if (hasIntermediateSteps) {
          viewerSteps.forEach((stepNum: number) => {
            if (stepNum > parentStep && stepNum < step) {
              groupViewers[stepNum] = { isOpen: false, data: null };
            }
          });
        }
      }

      // Добавляем в историю группы
      newHistory[groupId].push(step);

      return { ...prev, viewers: newViewers, history: newHistory };
    });
  };

  const closeViewerStep = (step: number, groupId: string = 'default') => {
    // В режиме single закрываем всю группу
    if (state.mode === 'single') {
      setState(prev => {
        const newViewers = { ...prev.viewers };
        const newHistory = { ...prev.history };

        if (newViewers[groupId]) {
          Object.keys(newViewers[groupId]).forEach((stepStr: string) => {
            const stepNum = parseInt(stepStr);
            newViewers[groupId][stepNum] = { isOpen: false, data: null };
          });
        }
        newHistory[groupId] = [];

        return { ...prev, viewers: newViewers, history: newHistory };
      });
      return;
    }

    // В режиме sequential закрываем только текущий шаг и последующие
    setState(prev => {
      const newViewers = { ...prev.viewers };
      const newHistory = { ...prev.history };
      if (!newViewers[groupId]) {return prev;}

      const groupViewers = newViewers[groupId];
      const viewerSteps = Object.keys(groupViewers).map(Number).sort((a, b) => a - b);
      const currentIndex = viewerSteps.indexOf(step);

      if (groupViewers[step]) {
        groupViewers[step] = { isOpen: false, data: null };
      }

      if (currentIndex !== -1) {
        viewerSteps.slice(currentIndex + 1).forEach((stepNum: number) => {
          groupViewers[stepNum] = { isOpen: false, data: null };
        });
      }

      // Обновляем историю: удаляем закрытый шаг и все последующие шаги
      const groupHistory = newHistory[groupId] || [];
      const stepIndexInHistory = groupHistory.indexOf(step);
      if (stepIndexInHistory !== -1) {
        newHistory[groupId] = groupHistory.slice(0, stepIndexInHistory);
      }

      return { ...prev, viewers: newViewers, history: newHistory };
    });
  };

  const closeViewerSubSteps = (step: number, groupId: string = 'default') => {
    setState(prev => {
      const newViewers = { ...prev.viewers };
      if (!newViewers[groupId]) {return prev;}

      const groupViewers = newViewers[groupId];
      const viewerSteps = Object.keys(groupViewers).map(Number).sort((a, b) => a - b);
      const currentIndex = viewerSteps.indexOf(step);

      if (currentIndex !== -1) {
        viewerSteps.slice(currentIndex + 1).forEach((stepNum: number) => {
          groupViewers[stepNum] = { isOpen: false, data: null };
        });
      }

      return { ...prev, viewers: newViewers };
    });
  };

  const toggleViewerStep = (step: number, data?: any, groupId: string = 'default') => {
    const currentViewer = state.viewers[groupId]?.[step];
    if (currentViewer?.isOpen) {
      closeViewerStep(step, groupId);
    } else {
      openViewerStep(step, data || currentViewer?.data, undefined, groupId);
    }
  };

  const isViewerOpen = (step: number, groupId: string = 'default') => {
    return state.viewers[groupId]?.[step]?.isOpen || false;
  };

  const isAnyViewerOpen = (groupId?: string) => {
    if (groupId) {
      // Проверяем конкретную группу
      const groupViewers = state.viewers[groupId] || {};
      return Object.values(groupViewers).some(viewer => viewer.isOpen);
    } else {
      // Проверяем все группы
      return Object.values(state.viewers).some(group =>
        Object.values(group).some(viewer => viewer.isOpen),
      );
    }
  };

  const getViewerData = (step: number, groupId: string = 'default') => {
    return state.viewers[groupId]?.[step]?.data || null;
  };
  // Закрывает все шаги во ВСЕХ группах
  const closeAllViewers = () => {
    setState(prev => {
      const newViewers = { ...prev.viewers };
      const newHistory = { ...prev.history };

      Object.keys(newViewers).forEach((gId: string) => {
        Object.keys(newViewers[gId]).forEach((stepStr: string) => {
          const step = parseInt(stepStr);
          newViewers[gId][step] = { isOpen: false, data: null };
        });
      });
      Object.keys(newHistory).forEach((gId: string) => {
        newHistory[gId] = [];
      });

      return { ...prev, viewers: newViewers, history: newHistory };
    });
  };

  // Закрывает все шаги в конкретной группе
  const closeAllStepInGroup = (groupId: string) => {
    setState(prev => {
      const newViewers = { ...prev.viewers };
      const newHistory = { ...prev.history };

      if (newViewers[groupId]) {
        Object.keys(newViewers[groupId]).forEach((stepStr: string) => {
          const step = parseInt(stepStr);
          newViewers[groupId][step] = { isOpen: false, data: null };
        });
      }
      newHistory[groupId] = [];

      return { ...prev, viewers: newViewers, history: newHistory };
    });
  };

  const goBack = (groupId: string = 'default') => {
    setState(prev => {
      const groupHistory = prev.history[groupId];
      if (!groupHistory || groupHistory.length <= 1) {return prev;}

      const newHistory = { ...prev.history };
      newHistory[groupId] = groupHistory.slice(0, -1);

      const currentStep = groupHistory[groupHistory.length - 1];
      const newViewers = { ...prev.viewers };
      if (currentStep !== undefined && newViewers[groupId]) {
        newViewers[groupId][currentStep] = { isOpen: false, data: null };
      }

      return { ...prev, viewers: newViewers, history: newHistory };
    });
  };

  const getMode = () => state.mode;

  const getCurrentStep = (groupId: string = 'default') => {
    const groupHistory = state.history[groupId];
    if (!groupHistory || groupHistory.length === 0) {return null;}
    return groupHistory[groupHistory.length - 1];
  };

  const hasAnyViewerOpen = (groupId?: string) => {
    if (groupId) {
      return Object.values(state.viewers[groupId] || {}).some(viewer => viewer.isOpen);
    }
    return Object.values(state.viewers).some(group =>
      Object.values(group).some(viewer => viewer.isOpen),
    );
  };

  const getTotalSteps = (groupId: string = 'default') => {
    return Object.keys(state.viewers[groupId] || {}).length;
  };

  const getLastStep = (groupId: string = 'default') => {
    const steps = Object.keys(state.viewers[groupId] || {}).map(Number).sort((a, b) => a - b);
    return steps.length > 0 ? steps[steps.length - 1] : null;
  };

  return (
    <ViewerContext.Provider
      value={{
        openViewerStep,
        closeViewerStep,
        toggleViewerStep,
        closeViewerSubSteps,
        isViewerOpen,
        isAnyViewerOpen,
        getViewerData,
        closeAllViewers,
        closeAllStepInGroup,
        goBack,
        getMode,
        getCurrentStep,
        hasAnyViewerOpen,
        getTotalSteps,
        getLastStep,
      }}>
      {children}
    </ViewerContext.Provider>
  );
};

export const useViewer = () => {
  const ctx = useContext(ViewerContext);
  if (!ctx) {throw new Error('useViewer must be used within <ViewerProvider>');}
  return ctx;
};
