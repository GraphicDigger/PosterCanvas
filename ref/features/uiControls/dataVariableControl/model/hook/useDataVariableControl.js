import { useMemo } from 'react';
import { useDesignMode } from '@/entities/mode/editorMode';
import { useVariables } from '@/entities/varVariableData';

export const useDataVariableControl = () => {

  const { isScreenCanvasInDesignMode } = useDesignMode();

  const { selectedScreenVariables, selectedComponentVariables } = useVariables();

  const variables = useMemo(() => {
    if (isScreenCanvasInDesignMode) {
      return selectedScreenVariables.allVariables;
    }
    return selectedComponentVariables.allVariables;
  }, [isScreenCanvasInDesignMode, selectedScreenVariables, selectedComponentVariables]);

  return {
    variables,
  };
};
