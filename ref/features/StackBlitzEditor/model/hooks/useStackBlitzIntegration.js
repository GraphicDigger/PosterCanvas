import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { convertToStructure } from '../../lib/utils/structureConverters';
import { extractPropBindingsFromElement, normalizeProps } from '../../lib/utils/propsSync';

/**
 * Hook to integrate StackBlitz with the UI rendering system
 * Provides necessary utilities for component rendering and prop binding
 */
export const useStackBlitzIntegration = (component, componentCode, componentProps) => {
  const [structure, setStructure] = useState(null);
  const [usedProps, setUsedProps] = useState({});
  const [normalizedProps, setNormalizedProps] = useState({});
  const [error, setError] = useState(null);

  // Parse component code to structure whenever it changes
  useEffect(() => {
    if (!componentCode || !componentProps) {return;}

    try {
      const parsed = convertToStructure('jsx', componentCode, { allProps: componentProps });
      if (parsed && parsed[0]) {
        setStructure(parsed);
        setError(null);

        // Extract prop bindings
        const bindings = extractPropBindingsFromElement(parsed[0], componentProps);
        setUsedProps(bindings);

        // Normalize props
        const normalized = normalizeProps(componentProps);
        const flattened = {};

        Object.values(normalized.byId).forEach(prop => {
          if (prop && prop.name) {
            flattened[prop.name] = prop.defaultValue;
          }
        });

        setNormalizedProps(flattened);
      }
    } catch (err) {
      console.error('Failed to parse component code:', err);
      setError(`Error parsing component: ${err.message}`);
    }
  }, [componentCode, componentProps]);

  return {
    structure,
    usedProps,
    normalizedProps,
    error,
    // Check if a prop is actively used in the component
    isActiveProp: (propName) => !!usedProps[propName],
    // Get a flat object with all props in name:value format
    getFlatProps: () => normalizedProps,
  };
};

export default useStackBlitzIntegration;
