import { useMemo } from 'react';
import { ELEMENT_REGISTRY } from '../config';

export const useElementLibrary = () => {
  // Можно добавить логику фильтрации или поиска здесь
  
  const groupedElements = useMemo(() => {
    return {
      layout: ELEMENT_REGISTRY.filter(e => e.category === 'layout'),
      forms: ELEMENT_REGISTRY.filter(e => e.category === 'forms'),
      typography: ELEMENT_REGISTRY.filter(e => e.category === 'typography'),
    };
  }, []);

  return {
    allElements: ELEMENT_REGISTRY,
    groupedElements
  };
};

