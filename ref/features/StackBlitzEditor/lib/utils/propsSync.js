/**
 * Utilities for managing props synchronization with StackBlitz
 */

// Import necessary Redux actions
import { updateElement } from '../../../../entities/uiElement/model/store/slice';
import { updatePropValue } from '../../../../entities/varPropValue/model/store/slice';

/**
 * Generates a props file content string with the provided props
 * @param {Object|Array} props - The component props to stringify
 * @param {Object} allInstances - All instances from Redux store (for overrides)
 * @param {Object} allPropValues - All prop values from Redux store
 * @returns {string} - The content for the props.js file
 */
export const generatePropsFileContent = (props = {}, allInstances = {}, allPropValues = {}) => {
  // Clean and normalize props to avoid circular references and extract actual values
  const cleanProps = (propsToClean) => {
    if (Array.isArray(propsToClean)) {
      return propsToClean.map(prop => {
        const cleanedProp = { ...prop };

        // Handle color props that might have style objects as defaultValue
        if (prop.type === 'color' && typeof prop.defaultValue === 'object' && prop.defaultValue !== null) {
          // Extract the actual color value from the style object
          // Check for common color properties in order of preference
          const colorValue = prop.defaultValue.backgroundColor ||
                           prop.defaultValue.color ||
                           prop.defaultValue.value ||
                           prop.defaultValue;

          if (typeof colorValue === 'string') {
            cleanedProp.defaultValue = colorValue;
          } else {
            // Fallback to a default color
            cleanedProp.defaultValue = '#007AFF';
          }
        }

        // Remove any binding references from defaultValue to avoid circular references
        if (typeof cleanedProp.defaultValue === 'object' && cleanedProp.defaultValue !== null) {
          const { binding, ...cleanValue } = cleanedProp.defaultValue;
          if (Object.keys(cleanValue).length > 0) {
            cleanedProp.defaultValue = cleanValue;
          }
        }

        return cleanedProp;
      });
    } else {
      const cleaned = {};
      Object.entries(propsToClean).forEach(([key, prop]) => {
        cleaned[key] = { ...prop };

        // Handle color props that might have style objects as defaultValue
        if (prop.type === 'color' && typeof prop.defaultValue === 'object' && prop.defaultValue !== null) {
          // Extract the actual color value from the style object
          // Check for common color properties in order of preference
          const colorValue = prop.defaultValue.backgroundColor ||
                           prop.defaultValue.color ||
                           prop.defaultValue.value ||
                           prop.defaultValue;

          if (typeof colorValue === 'string') {
            cleaned[key].defaultValue = colorValue;
          } else {
            // Fallback to a default color
            cleaned[key].defaultValue = '#007AFF';
          }
        }

        // Remove any binding references from defaultValue to avoid circular references
        if (typeof cleaned[key].defaultValue === 'object' && cleaned[key].defaultValue !== null) {
          const { binding, ...cleanValue } = cleaned[key].defaultValue;
          if (Object.keys(cleanValue).length > 0) {
            cleaned[key].defaultValue = cleanValue;
          }
        }
      });
      return cleaned;
    }
  };

  const cleanedProps = cleanProps(props);

  // If props is an array, also include a transformed object version
  if (Array.isArray(cleanedProps)) {
    const propsObject = {};
    cleanedProps.forEach(prop => {
      if (prop && prop.name) {
        let finalValue = prop.defaultValue;

        // Check for instance overrides first
        const instanceOverride = Object.values(allInstances).find(instance =>
          instance.override?.props?.[prop.id],
        );

        if (instanceOverride?.override?.props?.[prop.id]) {
          const override = instanceOverride.override.props[prop.id];
          if (override.value) {
            // Direct value override
            finalValue = override.value;
            console.log(`🎨 Using instance override for ${prop.name}: ${override.value}`);
          } else if (override.propValueId) {
            // Prop value reference override
            const propValue = allPropValues[override.propValueId];
            if (propValue) {
              finalValue = propValue.value;
              console.log(`🎨 Using instance prop value override for ${prop.name}: ${propValue.name} = ${propValue.value}`);
            }
          }
        } else if (prop.values && prop.values.length > 0) {
          // Use the default prop value if available, otherwise use defaultValue
          const defaultPropValue = prop.values.find(v => v.isDefault);
          if (defaultPropValue) {
            finalValue = defaultPropValue.value;
            console.log(`🎨 Using default prop value for ${prop.name}: ${defaultPropValue.name} = ${defaultPropValue.value}`);
          } else {
            finalValue = prop.defaultValue;
            console.log(`🎨 No default prop value for ${prop.name}, using defaultValue: ${prop.defaultValue}`);
          }
        } else {
          finalValue = prop.defaultValue;
          console.log(`🎨 No prop values for ${prop.name}, using defaultValue: ${prop.defaultValue}`);
        }

        propsObject[prop.name] = finalValue;
      }
    });

    return `// Auto-generated props - updated at ${new Date().toISOString()}
// Original props array
export const componentProps = ${JSON.stringify(cleanedProps, null, 2)};

// Transformed props object for direct component use
// Uses default prop values (isDefault: true) when available
export const componentPropsObject = ${JSON.stringify(propsObject, null, 2)};
`;
  }

  // Default case for object props
  return `// Auto-generated props - updated at ${new Date().toISOString()}
export const componentProps = ${JSON.stringify(cleanedProps, null, 2)};
`;
};

/**
 * Updates props file in StackBlitz VM
 * @param {Object} vm - The StackBlitz VM instance
 * @param {Object|Array} props - The props to update
 * @returns {Promise} - A promise that resolves when the update is complete
 */
export const updatePropsInStackBlitz = async (vm, props) => {
  if (!vm) {
    console.error('VM not available for props update');
    return false;
  }

  try {
    await vm.applyFsDiff({
      create: { 'src/props.js': generatePropsFileContent(props) },
      destroy: [],
    });
    console.log('Props updated successfully in StackBlitz');
    return true;
  } catch (error) {
    console.error('Failed to update props in StackBlitz:', error);
    return false;
  }
};

/**
 * Normalizes props to a consistent format for processing
 * @param {Object|Array} props - Props in either array or object format
 * @returns {Object} - An object with byId and byName lookups
 */
export const normalizeProps = (props) => {
  const result = {
    byId: {},
    byName: {},
    isArray: Array.isArray(props),
  };

  if (Array.isArray(props)) {
    props.forEach(prop => {
      if (prop && prop.id) {
        result.byId[prop.id] = prop;
        if (prop.name) {
          result.byName[prop.name] = prop;
        }
      }
    });
  } else {
    Object.values(props).forEach(prop => {
      if (prop && prop.id) {
        result.byId[prop.id] = prop;
        if (prop.name) {
          result.byName[prop.name] = prop;
        }
      }
    });
  }

  return result;
};

/**
 * Extracts all prop bindings from an element structure
 * @param {Object} element - The element structure to analyze
 * @param {Object|Array} allProps - The props dictionary (array or object)
 * @returns {Object} - Object containing all used props and their paths
 */
export const extractPropBindingsFromElement = (element, allProps = {}) => {
  const usedProps = {};
  const normalizedProps = normalizeProps(allProps);

  // Helper function to process a single element
  const processElement = (el) => {
    if (!el || !el.properties) {return;}

    // Check content binding
    const contentBinding = el.properties.content?.binding;
    if (contentBinding && contentBinding.type === 'prop' && contentBinding.id) {
      const prop = normalizedProps.byId[contentBinding.id];
      if (prop) {
        usedProps[prop.name] = {
          id: prop.id,
          path: `props.${prop.name}`,
          usedIn: [...(usedProps[prop.name]?.usedIn || []), `${el.tag || 'element'}.content`],
        };
      }
    }

    // Check style bindings
    const styleBindings = el.properties.style?.binding || {};
    Object.entries(styleBindings).forEach(([styleProp, binding]) => {
      if (binding.type === 'prop' && binding.id) {
        const prop = normalizedProps.byId[binding.id];
        if (prop) {
          usedProps[prop.name] = {
            id: prop.id,
            path: `props.${prop.name}`,
            usedIn: [...(usedProps[prop.name]?.usedIn || []), `${el.tag || 'element'}.style.${styleProp}`],
          };
        }
      }
    });

    // Process children recursively
    if (Array.isArray(el.children)) {
      el.children.forEach(processElement);
    }
  };

  // Start processing with the root element
  processElement(element);

  return usedProps;
};

/**
 * Extracts current prop values from element properties in Redux store
 * @param {Object} element - The element from Redux store
 * @param {string} propertyPath - The property path (e.g., 'content', 'style.backgroundColor')
 * @returns {any} - The current value of the property
 */
export const extractPropertyValueFromElement = (element, propertyPath) => {
  if (!element || !element.properties) {return undefined;}

  const pathParts = propertyPath.split('.');
  let current = element.properties;

  for (const part of pathParts) {
    if (current && typeof current === 'object') {
      current = current[part];
    } else {
      return undefined;
    }
  }

  // Handle different property types
  if (propertyPath === 'content') {
    return current?.text || current?.value || current;
  } else if (propertyPath.startsWith('style.')) {
    return current;
  }

  return current;
};

/**
 * Updates prop values based on element changes in Redux store
 * @param {Object} allElements - All elements from Redux store
 * @param {Object} usedProps - Currently used props mapping
 * @param {Object|Array} componentProps - Original component props
 * @returns {Object|Array} - Updated props with new values from elements
 */
export const updatePropsFromElementChanges = (allElements, usedProps, componentProps) => {
  const updatedProps = Array.isArray(componentProps) ? [...componentProps] : { ...componentProps };
  let hasChanges = false;

  Object.entries(usedProps).forEach(([propName, propInfo]) => {
    const prop = Array.isArray(componentProps)
      ? componentProps.find(p => p.id === propInfo.id)
      : componentProps[propInfo.id];

    if (!prop) {return;}

    // Check each usage path for this prop
    propInfo.usedIn.forEach(usagePath => {
      const [elementPath, propertyPath] = usagePath.split('.');

      // Find the element in the Redux store
      const element = Object.values(allElements).find(el =>
        el.tag === elementPath || el.id === elementPath,
      );

      if (!element) {return;}

      // Extract the current value from the element
      const currentValue = extractPropertyValueFromElement(element, propertyPath);

      // Update prop if value changed
      if (currentValue !== undefined && currentValue !== prop.defaultValue) {
        console.log(`🔄 Updating prop ${propName}: ${prop.defaultValue} → ${currentValue}`);

        if (Array.isArray(updatedProps)) {
          const propIndex = updatedProps.findIndex(p => p.id === propInfo.id);
          if (propIndex !== -1) {
            updatedProps[propIndex] = { ...updatedProps[propIndex], defaultValue: currentValue };
            hasChanges = true;
          }
        } else {
          updatedProps[propInfo.id] = { ...updatedProps[propInfo.id], defaultValue: currentValue };
          hasChanges = true;
        }
      }
    });
  });

  return { updatedProps, hasChanges };
};

/**
 * Updates prop values based on all changes (elements, instances, prop values) in Redux store
 * @param {Object} allElements - All elements from Redux store
 * @param {Object} allInstances - All instances from Redux store
 * @param {Object} allPropValues - All prop values from Redux store
 * @param {Object} usedProps - Currently used props mapping
 * @param {Object|Array} componentProps - Original component props
 * @returns {Object|Array} - Updated props with new values from all sources
 */
export const updatePropsFromAllChanges = (allElements, allInstances, allPropValues, usedProps, componentProps) => {
  const updatedProps = Array.isArray(componentProps) ? [...componentProps] : { ...componentProps };
  let hasChanges = false;

  Object.entries(usedProps).forEach(([propName, propInfo]) => {
    const prop = Array.isArray(componentProps)
      ? componentProps.find(p => p.id === propInfo.id)
      : componentProps[propInfo.id];

    if (!prop) {return;}

    // Check each usage path for this prop
    propInfo.usedIn.forEach(usagePath => {
      const [elementPath, propertyPath] = usagePath.split('.');

      // Find the element in the Redux store
      const element = Object.values(allElements).find(el =>
        el.tag === elementPath || el.id === elementPath,
      );

      if (!element) {return;}

      // First, check if there's an instance override for this element
      let currentValue = null;

      // Find if this element has an associated instance
      const associatedInstance = Object.values(allInstances).find(instance =>
        instance.ownership?.type === 'element' && instance.ownership?.id === element.id,
      );

      if (associatedInstance && associatedInstance.override?.props) {
        // Check if this prop has an override in the instance
        const propOverride = associatedInstance.override.props[propInfo.id];

        if (propOverride) {
          if (propOverride.value) {
            // Direct value override
            currentValue = propOverride.value;
          } else if (propOverride.propValueId) {
            // Prop value reference override
            const propValue = allPropValues[propOverride.propValueId];
            if (propValue) {
              currentValue = propValue.value;
              //  console.log(`🎨 Found prop value override: ${propValue.name} = ${propValue.value}`);
            }
          }
        }
      }

      // If no instance override, check if there's a default prop value
      if (currentValue === null && prop.values && prop.values.length > 0) {
        const defaultPropValue = prop.values.find(v => v.isDefault);
        if (defaultPropValue) {
          currentValue = defaultPropValue.value;
          //  console.log(`🎨 Using default prop value: ${defaultPropValue.name} = ${defaultPropValue.value}`);
        } else {
          // If no default is set, use the first available value
          currentValue = prop.values[0].value;
          //  console.log(`🎨 Using first available prop value: ${prop.values[0].name} = ${prop.values[0].value}`);
        }
      }

      // If no instance override, fall back to element property
      if (currentValue === null) {
        currentValue = extractPropertyValueFromElement(element, propertyPath);
      }

      // Update prop if value changed
      if (currentValue !== undefined && currentValue !== prop.defaultValue) {
        console.log(`🔄 Updating prop ${propName}: ${prop.defaultValue} → ${currentValue} (from ${associatedInstance ? 'instance override' : 'element property'})`);

        if (Array.isArray(updatedProps)) {
          const propIndex = updatedProps.findIndex(p => p.id === propInfo.id);
          if (propIndex !== -1) {
            updatedProps[propIndex] = { ...updatedProps[propIndex], defaultValue: currentValue };
            hasChanges = true;
          }
        } else {
          updatedProps[propInfo.id] = { ...updatedProps[propInfo.id], defaultValue: currentValue };
          hasChanges = true;
        }
      }
    });
  });

  return { updatedProps, hasChanges };
};

/**
 * Logs all prop references in a component to the console
 * @param {Object} structure - The component structure to analyze
 * @param {Object|Array} allProps - All available props
 */
export const debugPropReferences = (structure, allProps) => {
  if (!structure || !allProps) {
    console.error('Cannot debug prop references: missing structure or props');
    return;
  }

  const normalizedProps = normalizeProps(allProps);
  const usedProps = extractPropBindingsFromElement(structure, allProps);

  console.group('Component Prop References');
  console.log('Used props:', Object.keys(usedProps).length);

  Object.entries(usedProps).forEach(([propName, info]) => {
    console.group(`🔗 ${propName}`);
    console.log('ID:', info.id);
    console.log('Path:', info.path);
    const propData = normalizedProps.byId[info.id];
    console.log('Current value:', propData?.defaultValue);
    console.log('Used in:', info.usedIn.join(', '));
    console.groupEnd();
  });

  // Also log props that aren't used
  const unusedProps = Object.values(normalizedProps.byId).filter(
    prop => !usedProps[prop.name],
  );

  console.group('Unused props');
  unusedProps.forEach(prop => {
    console.log(`${prop.name} (${prop.id}): ${prop.defaultValue}`);
  });
  console.groupEnd();
  console.groupEnd();

  return usedProps;
};

/**
 * Monitors prop changes between state updates
 * @param {Object|Array} prevProps - Previous props object
 * @param {Object|Array} currentProps - Current props object
 * @returns {Object} - Changed props with old and new values
 */
export const detectPropChanges = (prevProps, currentProps) => {
  if (!prevProps || !currentProps) {return {};}

  const prevNormalized = normalizeProps(prevProps);
  const currentNormalized = normalizeProps(currentProps);

  const changes = {};
  const allPropIds = new Set([
    ...Object.keys(prevNormalized.byId),
    ...Object.keys(currentNormalized.byId),
  ]);

  allPropIds.forEach(id => {
    const prev = prevNormalized.byId[id];
    const current = currentNormalized.byId[id];

    // Handle added or removed props
    if (!prev && current) {
      changes[id] = { status: 'added', newValue: current };
    } else if (prev && !current) {
      changes[id] = { status: 'removed', oldValue: prev };
    }
    // Handle changed props
    else if (prev && current && JSON.stringify(prev) !== JSON.stringify(current)) {
      changes[id] = {
        status: 'changed',
        oldValue: prev,
        newValue: current,
        changedFields: getChangedFields(prev, current),
      };
    }
  });

  return changes;
};

/**
 * Helper to identify which fields changed between two objects
 * @param {Object} oldObj - Old object
 * @param {Object} newObj - New object
 * @returns {Object} - Fields that changed with old and new values
 */
function getChangedFields(oldObj, newObj) {
  const changes = {};

  // Combine all keys
  const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);

  allKeys.forEach(key => {
    if (oldObj[key] !== newObj[key]) {
      changes[key] = {
        old: oldObj[key],
        new: newObj[key],
      };
    }
  });

  return changes;
}

/**
 * Debug function to log the current state of props and their values
 * @param {Object|Array} componentProps - The component props
 * @param {Object} allInstances - All instances from Redux store
 * @param {Object} allPropValues - All prop values from Redux store
 * @param {Object} usedProps - Currently used props mapping
 */
export const debugPropState = (componentProps, allInstances, allPropValues, usedProps) => {
  console.group('🔍 Debug Prop State');

  console.log('Component Props:', componentProps);
  console.log('Used Props:', usedProps);
  console.log('Instances:', allInstances);
  console.log('Prop Values:', allPropValues);

  // Check each used prop
  Object.entries(usedProps).forEach(([propName, propInfo]) => {
    console.group(`🔍 Prop: ${propName}`);

    const prop = Array.isArray(componentProps)
      ? componentProps.find(p => p.id === propInfo.id)
      : componentProps[propInfo.id];

    console.log('Prop definition:', prop);
    console.log('Current defaultValue:', prop?.defaultValue);
    console.log('Available values:', prop?.values);

    // Check for instance overrides
    Object.values(allInstances).forEach(instance => {
      if (instance.override?.props?.[propInfo.id]) {
        console.log(`Instance ${instance.id} override:`, instance.override.props[propInfo.id]);
      }
    });

    console.groupEnd();
  });

  console.groupEnd();
};

/**
 * Debug function to log the current state of element style bindings vs literal values
 * @param {Object} element - The element to debug
 */
export const debugElementStyleState = (element) => {
  if (!element || !element.properties?.style) {
    console.log('🔍 No element or style to debug');
    return;
  }

  const style = element.properties.style;
  const literalValues = {};
  const bindings = {};

  // Extract literal values
  Object.entries(style).forEach(([key, value]) => {
    if (key !== 'binding' && value !== undefined) {
      literalValues[key] = value;
    }
  });

  // Extract bindings
  if (style.binding) {
    Object.entries(style.binding).forEach(([key, binding]) => {
      bindings[key] = binding;
    });
  }

  console.group('🔍 Element Style State Debug');
  console.log('Element ID:', element.id);
  console.log('Element Tag:', element.tag);
  console.log('Literal Values:', literalValues);
  console.log('Bindings:', bindings);

  // Check for conflicts
  const conflictingProperties = Object.keys(literalValues).filter(key => bindings[key]);
  if (conflictingProperties.length > 0) {
    console.warn('⚠️ CONFLICT: Properties with both literal values and bindings:', conflictingProperties);
  }

  console.groupEnd();
};

/**
 * Ensures that for each style property, only one of a literal value or a binding exists (never both).
 * If a binding exists for a property, removes the literal. If a literal exists, removes the binding for that property.
 */
function cleanStyleBindings(style) {
  if (!style) {return style;}
  const cleaned = { ...style };

  // If there are literal values, remove any bindings for the same properties
  if (cleaned.binding) {
    for (const key in cleaned) {
      if (key !== 'binding' && cleaned[key] !== undefined && cleaned.binding[key]) {
        // If we have a literal value for this property, remove the binding
        console.log(`🧹 Removing binding for ${key} because literal value exists: ${cleaned[key]}`);
        delete cleaned.binding[key];
      }
    }
    // Remove empty binding object
    if (Object.keys(cleaned.binding).length === 0) {
      console.log('🧹 Removing empty binding object');
      delete cleaned.binding;
    }
  }

  // If there are bindings, remove any literal values for the same properties
  if (cleaned.binding) {
    for (const key in cleaned.binding) {
      if (cleaned[key] !== undefined) {
        // If we have a binding for this property, remove the literal
        console.log(`🧹 Removing literal value for ${key} because binding exists`);
        delete cleaned[key];
      }
    }
  }

  console.log('🧹 Cleaned style object:', cleaned);
  return cleaned;
}

/**
 * Syncs literal value changes from editor back to control panel
 * @param {Object} element - The parsed structure from the editor
 * @param {Array} componentProps - The current component props
 * @param {Object} allPropValues - All prop values from Redux store
 * @param {Function} dispatch - Redux dispatch function
 * @param {Object} currentState - Current Redux state
 */
export const syncLiteralValuesToControlPanel = (element, componentProps, allPropValues, dispatch, currentState) => {
  console.log('🔄 Starting sync of literal values to control panel...');
  console.log('🔄 Element passed to sync:', element);
  if (!element || !componentProps) {
    console.log('❌ No element or props to sync');
    return;
  }

  // Normalize props for easier lookup
  const normalizedProps = normalizeProps(componentProps);
  console.log('🔄 Normalized props for sync:', normalizedProps);

  // Function to process element and update literal values
  const processElement = (elem) => {
    if (!elem || !elem.properties) {return;}

    console.log('🔍 Processing element:', elem.id, elem.tag);
    console.log('🔍 Element properties:', elem.properties);

    // Debug the current state before processing
    debugElementStyleState(elem);

    const style = elem.properties.style || {};
    const content = elem.properties.content || {};
    let hasChanges = false;

    // Get current element from Redux store
    const currentElement = currentState?.elementEntity?.entities?.[elem.id];
    if (!currentElement) {
      console.error(`❌ Element ${elem.id} not found in Redux store`);
      return;
    }

    console.log('🔍 Current element before update:', currentElement);

    // Check if the element structure has changed (including binding removal)
    const currentStyle = currentElement.properties?.style || {};
    const currentContent = currentElement.properties?.content || {};

    // Check if style properties or bindings have changed
    const styleChanged = JSON.stringify(style) !== JSON.stringify(currentStyle);
    const contentChanged = JSON.stringify(content) !== JSON.stringify(currentContent);

    // Also check for specific binding changes - now dynamic for all properties
    const currentStyleBindings = currentStyle.binding || {};
    const newStyleBindings = style.binding || {};
    const allBindingKeys = new Set([
      ...Object.keys(currentStyleBindings),
      ...Object.keys(newStyleBindings),
    ]);

    let hasBindingRemoved = false;
    let hasBindingAdded = false;
    let hasBindingChanged = false;

    // Check for binding changes for any property
    for (const bindingKey of allBindingKeys) {
      const currentBinding = currentStyleBindings[bindingKey];
      const newBinding = newStyleBindings[bindingKey];

      if (currentBinding && !newBinding) {
        hasBindingRemoved = true;
        console.log(`🔄 Binding removed for property: ${bindingKey}`);
      } else if (!currentBinding && newBinding) {
        hasBindingAdded = true;
        console.log(`🔄 Binding added for property: ${bindingKey}`);
      } else if (currentBinding && newBinding &&
                 JSON.stringify(currentBinding) !== JSON.stringify(newBinding)) {
        hasBindingChanged = true;
        console.log(`🔄 Binding changed for property: ${bindingKey}`);
      }
    }

    // Check for literal value changes for any property
    let hasLiteralValueChanged = Object.keys(style).some(key =>
      key !== 'binding' && style[key] !== currentStyle[key],
    );

    // Additional check: if we have a literal value for a property that had a binding,
    // we need to ensure the binding is removed
    const literalValuesThatOverrideBindings = Object.keys(style).filter(key =>
      key !== 'binding' &&
      style[key] !== undefined &&
      currentStyleBindings[key],
    );

    if (literalValuesThatOverrideBindings.length > 0) {
      console.log('🔄 Literal values that should override bindings:', literalValuesThatOverrideBindings);
      hasBindingRemoved = true;
    }

    // SUPER IMPORTANT: Check if any property has a literal value but the Redux state still has a binding
    // This catches cases where the binding wasn't properly removed
    const propertiesWithLiteralValues = Object.keys(style).filter(key =>
      key !== 'binding' && style[key] !== undefined,
    );

    const propertiesWithBindingsInRedux = Object.keys(currentStyleBindings);
    const conflictingProperties = propertiesWithLiteralValues.filter(property =>
      propertiesWithBindingsInRedux.includes(property),
    );

    if (conflictingProperties.length > 0) {
      console.log('⚠️ CONFLICT DETECTED: Properties with both literal values and bindings:', conflictingProperties);
      console.log('🔄 This will force a binding removal for:', conflictingProperties);
      hasBindingRemoved = true;
      hasLiteralValueChanged = true;
    }

    console.log('🔍 Change detection:', {
      styleChanged,
      contentChanged,
      hasBindingRemoved,
      hasBindingAdded,
      hasBindingChanged,
      hasLiteralValueChanged,
      literalValuesThatOverrideBindings,
      conflictingProperties,
      propertiesWithLiteralValues,
      propertiesWithBindingsInRedux,
      currentStyle: currentStyle,
      newStyle: style,
      currentBinding: currentStyle.binding,
      newBinding: style.binding,
      allBindingKeys: Array.from(allBindingKeys),
    });

    if (styleChanged || contentChanged || hasBindingRemoved || hasBindingAdded || hasBindingChanged || hasLiteralValueChanged) {
      console.log('🔄 Element structure changed, updating Redux state');
      hasChanges = true;
    }

    // SUPER AGGRESSIVE: If we have any conflicts, force an update
    if (conflictingProperties.length > 0) {
      console.log('🔄 CONFLICT DETECTED - Forcing update to resolve binding/literal conflicts');
      hasChanges = true;
    }

    // If we have changes, update the element in Redux state
    if (hasChanges) {
      // Clean style bindings before updating
      const cleanedStyle = cleanStyleBindings(style);
      console.log('🔧 Cleaned style:', cleanedStyle);

      const updatedElement = {
        ...currentElement,
        properties: {
          ...currentElement.properties,
          style: cleanedStyle,
          content: { ...content },
        },
      };

      console.log('🔍 Updated element after changes:', updatedElement);

      // Dispatch the update
      dispatch(updateElement(updatedElement));
      console.log(`✅ Updated element ${elem.id} with new structure`);
    } else {
      console.log('🔍 No changes detected for element:', elem.id);
    }

    // Process children recursively
    if (elem.children && Array.isArray(elem.children)) {
      elem.children.forEach(child => processElement(child));
    }
  };

  // Process the root element
  processElement(element);

  console.log('✅ Literal value sync completed');
};
