/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Surface } from '../../../shared/uiKit/Surface';
import { useCodeEditor } from '../../../features/codeEditor';
import { baseCode } from '../model';
import { useStackBlitzPreview } from '../model';
import { loadCSSFiles } from '../lib/utils/cssLoader';
import stackblitz from '@stackblitz/sdk';
import { updateElement } from '../../../entities/uiElement/model/store/slice';
import { convertToStructure } from '../lib/utils/structureConverters';
import {
  generatePropsFileContent,
  updatePropsInStackBlitz,
  extractPropBindingsFromElement,
  debugPropReferences,
  detectPropChanges,
  normalizeProps,
  updatePropsFromElementChanges,
  updatePropsFromAllChanges,
  debugPropState,
  syncLiteralValuesToControlPanel,
  debugElementStyleState,
} from '../lib/utils/propsSync';
import { selectElementById } from '../../../entities/uiElement/model/store';
import { store } from '../../../app/store';

if (typeof window !== 'undefined' && !window.process) {
  window.process = { env: { NODE_ENV: 'development' }, browser: true };
}

const StackBlitzContainer = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
`;

function dispatchElementsRecursively(element, dispatch) {
  if (!element || !element.id) {return;}
  dispatch(updateElement({ ...element }));
  if (Array.isArray(element.children)) {
    element.children.forEach(child => dispatchElementsRecursively(child, dispatch));
  }
}

export const StackBlitzProject = ({ externalCode, componentProps }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const background = theme.sys.color.surface;
  const { activeCode } = useCodeEditor();
  const [vmReady, setVmReady] = useState(false);
  const isProgrammaticUpdateRef = useRef(false);
  const isEditorUpdateRef = useRef(false);
  const lastFileContentRef = useRef(null);
  const timeoutRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const { setElement, handleError } = useStackBlitzPreview();
  const iframeContainerRef = useRef(null);
  const vmRef = useRef(null);
  const lastParsedStructureRef = useRef(null);
  const lastComponentPropsRef = useRef(null);
  const [usedProps, setUsedProps] = useState({});
  const lastElementStateRef = useRef({});
  const lastInstanceStateRef = useRef({});
  const lastPropValueStateRef = useRef({});

  // Get all elements from Redux store to monitor changes
  const allElements = useSelector(state => {
    const elements = {};
    if (state.elementEntity && state.elementEntity.entities) {
      Object.values(state.elementEntity.entities).forEach(element => {
        if (element && element.id) {
          elements[element.id] = element;
        }
      });
    }
    return elements;
  });

  // Get all instances from Redux store to monitor changes
  const allInstances = useSelector(state => {
    const instances = {};
    if (state.instanceEntity && state.instanceEntity.entities) {
      Object.values(state.instanceEntity.entities).forEach(instance => {
        if (instance && instance.id) {
          instances[instance.id] = instance;
        }
      });
    }
    return instances;
  });

  // Get all prop values from Redux store to monitor changes
  const allPropValues = useSelector(state => {
    const propValues = {};
    if (state.propValueEntity && state.propValueEntity.entities) {
      Object.values(state.propValueEntity.entities).forEach(propValue => {
        if (propValue && propValue.id) {
          propValues[propValue.id] = propValue;
        }
      });
    }
    return propValues;
  });

  // Debug componentProps format
  useEffect(() => {
    if (componentProps) {
      const isArray = Array.isArray(componentProps);
      console.log(`ComponentProps is ${isArray ? 'an array' : 'an object'} with ${isArray ? componentProps.length : Object.keys(componentProps).length} props`);

      if (isArray && componentProps.length > 0) {
        const firstProp = componentProps[0];
        console.log('Sample prop structure:', { id: firstProp.id, name: firstProp.name, type: firstProp.type });

        // Log the formatted props that will be used in the component
        const formattedProps = {};
        componentProps.forEach(prop => {
          if (prop && prop.name) {
            formattedProps[prop.name] = prop.defaultValue;
          }
        });
        console.log('Formatted props for component:', formattedProps);
      }
    }
  }, [componentProps]);

  // Debug instance and prop value changes
  // useEffect(() => {
  //   if (Object.keys(allInstances).length > 0) {
  //     console.log('📊 Monitoring instances:', Object.keys(allInstances).length);
  //     Object.values(allInstances).forEach(instance => {
  //       if (instance.override?.props && Object.keys(instance.override.props).length > 0) {
  //         console.log(`🔧 Instance ${instance.id} has overrides:`, instance.override.props);
  //       }
  //     });
  //   }
  // }, [allInstances]);

  // useEffect(() => {
  //   if (Object.keys(allPropValues).length > 0) {
  //     console.log('📊 Monitoring prop values:', Object.keys(allPropValues).length);
  //     Object.values(allPropValues).forEach(propValue => {
  //       // console.log(`🎨 Prop value ${propValue.id}: ${propValue.name} = ${propValue.value}`);
  //     });
  //   }
  // }, [allPropValues]);

  const setIsProgrammaticUpdateSafe = val => {
    isProgrammaticUpdateRef.current = val;
  };
  const setIsEditorUpdateSafe = val => {
    isEditorUpdateRef.current = val;
  };

  const normalizeContent = (content) => (content || '').trim().replace(/\s+/g, ' ');

  // Check if props have changed deeply
  const havePropsChanged = (prevProps, nextProps) => {
    if (!prevProps || !nextProps) {return true;}
    return JSON.stringify(prevProps) !== JSON.stringify(nextProps);
  };

  // Check if elements, instances, or prop values have changed and update props accordingly
  const checkElementChangesAndUpdateProps = useCallback(() => {
    if (!vmReady || !vmRef.current || !componentProps || !lastParsedStructureRef.current) {return;}

    const currentElementState = JSON.stringify(allElements);
    const currentInstanceState = JSON.stringify(allInstances);
    const currentPropValueState = JSON.stringify(allPropValues);

    const lastElementState = lastElementStateRef.current;
    const lastInstanceState = lastInstanceStateRef.current;
    const lastPropValueState = lastPropValueStateRef.current;

    // Check if any relevant state has changed
    const hasElementChanges = currentElementState !== lastElementState;
    const hasInstanceChanges = currentInstanceState !== lastInstanceState;
    const hasPropValueChanges = currentPropValueState !== lastPropValueState;

    if (hasElementChanges || hasInstanceChanges || hasPropValueChanges) {
      console.log('🔄 State changed, checking for prop updates...', {
        elements: hasElementChanges,
        instances: hasInstanceChanges,
        propValues: hasPropValueChanges,
      });

      // Get all prop bindings from current structure
      const currentUsedProps = extractPropBindingsFromElement(lastParsedStructureRef.current[0], componentProps);

      // Debug the current state
      debugPropState(componentProps, allInstances, allPropValues, currentUsedProps);

      // Use the utility function to update props based on all changes
      const { updatedProps, hasChanges } = updatePropsFromAllChanges(
        allElements,
        allInstances,
        allPropValues,
        currentUsedProps,
        componentProps,
      );

      // Update props file if changes detected
      if (hasChanges) {
        console.log('📝 Updating props file with state changes');
        updatePropsInStackBlitz(vmRef.current, updatedProps)
          .then(() => {
            console.log('✅ Props file updated with state changes');
            // Update the last component props reference
            lastComponentPropsRef.current = updatedProps;
          })
          .catch(error => {
            console.error('❌ Failed to update props file:', error);
          });
      }

      // Update last state references
      lastElementStateRef.current = currentElementState;
      lastInstanceStateRef.current = currentInstanceState;
      lastPropValueStateRef.current = currentPropValueState;
    }
  }, [vmReady, componentProps, allElements, allInstances, allPropValues]);

  // Monitor all changes and update props
  useEffect(() => {
    if (!vmReady || !componentProps) {return;}

    console.log('🔄 Starting comprehensive change monitoring...');

    const interval = setInterval(() => {
      try {
        checkElementChangesAndUpdateProps();
      } catch (error) {
        console.error('❌ Error in change monitoring:', error);
      }
    }, 500); // Check every 500ms for more responsive updates

    return () => {
      console.log('🛑 Stopping comprehensive change monitoring...');
      clearInterval(interval);
    };
  }, [vmReady, componentProps, checkElementChangesAndUpdateProps]);

  // Monitor for changes in the component props
  useEffect(() => {
    if (!lastComponentPropsRef.current || !componentProps) {return;}

    if (!havePropsChanged(lastComponentPropsRef.current, componentProps)) {
      return;
    }

    // Detect which props changed
    const changes = detectPropChanges(lastComponentPropsRef.current, componentProps);
    const changedPropsCount = Object.keys(changes).length;

    if (changedPropsCount > 0) {
      console.group('📝 Props changed');
      console.log(`${changedPropsCount} prop(s) changed`);

      Object.entries(changes).forEach(([propId, change]) => {
        // Find prop in normalized props
        const normalizedProps = normalizeProps(componentProps);
        const prop = normalizedProps.byId[propId];
        if (!prop) {return;}

        if (change.status === 'changed') {
          console.log(
            `🔄 ${prop.name}: ${JSON.stringify(change.oldValue?.defaultValue)} → ${JSON.stringify(prop.defaultValue)}`,
          );
        } else if (change.status === 'added') {
          console.log(`➕ ${prop.name}: ${JSON.stringify(prop.defaultValue)}`);
        } else if (change.status === 'removed') {
          console.log(`➖ ${prop.name} removed`);
        }

        // Check if this prop is used in the component
        if (usedProps[prop.name]) {
          console.log(`✅ Prop is used in: ${usedProps[prop.name].usedIn.join(', ')}`);
        } else {
          console.log('❌ Prop is not used in this component');
        }
      });

      console.groupEnd();
    }
  }, [componentProps, usedProps]);

  // Update props file when componentProps change or when used props change
  useEffect(() => {
    if (!vmReady || !vmRef.current || !componentProps) {return;}

    // Deep comparison for props changes
    if (havePropsChanged(lastComponentPropsRef.current, componentProps)) {
      console.log('Updating props file with new props');
      updatePropsInStackBlitz(vmRef.current, componentProps)
        .then(() => {
          // Clone the props properly based on type
          lastComponentPropsRef.current = Array.isArray(componentProps)
            ? [...componentProps]
            : { ...componentProps };
          console.log('Props file updated successfully');
        });
    }
  }, [componentProps, vmReady]);

  // Extract and track which props are used in the current structure
  useEffect(() => {
    if (!lastParsedStructureRef.current || !componentProps) {return;}

    // Find all props used in the current structure
    const newUsedProps = extractPropBindingsFromElement(
      lastParsedStructureRef.current[0],
      componentProps,
    );

    if (JSON.stringify(newUsedProps) !== JSON.stringify(usedProps)) {
      setUsedProps(newUsedProps);
      console.log('Used props updated:', newUsedProps);
    }
  }, [lastParsedStructureRef.current, componentProps]);

  const updateStackBlitzFile = async () => {
    console.log('updateStackBlitzFile called', {
      isEditorUpdate: isEditorUpdateRef.current,
      vmReady,
      externalCodeExists: !!externalCode,
      activeCodeName: activeCode?.name,
    });

    if (isEditorUpdateRef.current) {
      console.log('Skipping update due to isEditorUpdateRef');
      isEditorUpdateRef.current = false;
      return;
    }

    if (!vmReady || !vmRef.current) {
      console.log('Skipping update: VM not ready');
      return;
    }

    setIsProgrammaticUpdateSafe(true);
    try {
      const fileName = `src/${activeCode.name}.tsx`;
      const snapshot = await vmRef.current.getFsSnapshot();
      const currentContent = snapshot[fileName] || '';
      const normalizedCurrent = normalizeContent(currentContent);
      const normalizedExternal = normalizeContent(externalCode);

      console.log('Content comparison', {
        currentContent: normalizedCurrent,
        externalCode: normalizedExternal,
        areEqual: normalizedCurrent === normalizedExternal,
      });

      if (normalizedCurrent !== normalizedExternal) {
        console.log('Updating StackBlitz file with new content');

        // Parse the new content to find prop bindings
        try {
          const structure = convertToStructure('jsx', externalCode, { allProps: componentProps, allPropValues });
          if (structure && structure[0]) {
            lastParsedStructureRef.current = structure;

            // Debug prop references in the new structure
            debugPropReferences(structure[0], componentProps);

            const newUsedProps = extractPropBindingsFromElement(structure[0], componentProps);
            setUsedProps(newUsedProps);
            console.log('Props used in new code:', newUsedProps);
          }
        } catch (err) {
          console.error('Failed to extract prop bindings from new code:', err);
        }

        await vmRef.current.applyFsDiff({
          create: {
            [fileName]: externalCode,
            'src/props.js': generatePropsFileContent(componentProps, allInstances, allPropValues),
          },
          destroy: [],
        });
        setElement({ ...activeCode, content: externalCode });
        lastFileContentRef.current = externalCode;
        console.log('Update applied successfully');
      } else {
        console.log('No update needed, content unchanged');
      }
    } catch (error) {
      console.error('Failed to update StackBlitz file:', error);
      handleError(`Failed to update StackBlitz file: ${error.message}`);
    } finally {
      setIsProgrammaticUpdateSafe(false);
    }
  };

  useEffect(() => {
    if (timeoutRef.current) {clearTimeout(timeoutRef.current);}
    timeoutRef.current = setTimeout(() => {
      console.log('useEffect triggered', {
        externalCodeExists: !!externalCode,
        vmReady,
        activeCodeExists: !!activeCode,
        isProgrammatic: isProgrammaticUpdateRef.current,
      });

      if (!externalCode || !vmRef.current || !activeCode || !vmReady || isProgrammaticUpdateRef.current) {
        console.log('Skipping updateStackBlitzFile due to conditions');
        return;
      }

      console.log('Proceeding with updateStackBlitzFile');
      updateStackBlitzFile();
    }, 1000);

    return () => {
      if (timeoutRef.current) {clearTimeout(timeoutRef.current);}
    };
  }, [externalCode, activeCode, setElement, vmReady]);

  const initStackBlitzEditor = async () => {
    console.log('initStackBlitzEditor called', {
      iframeExists: !!iframeContainerRef.current,
      externalCodeExists: !!externalCode,
      activeCodeName: activeCode?.name,
    });

    if (!iframeContainerRef.current || !externalCode || !activeCode?.name) {
      console.log('Skipping StackBlitz initialization - missing required data');
      return;
    }

    if (typeof externalCode !== 'string' || externalCode.trim() === '') {
      console.error('Skipping StackBlitz initialization - externalCode is empty or invalid');
      handleError('Generated code is empty or invalid. Cannot load the editor.');
      return;
    }

    try {
      const initialContent =
        externalCode || activeCode?.content || `import React from 'react';\n\nexport const ${activeCode.name} = () => <div />;`;

      if (!initialContent || typeof initialContent !== 'string') {
        throw new Error('Invalid initial content');
      }

      // Parse the initial content to extract prop bindings
      try {
        const structure = convertToStructure('jsx', initialContent, { allProps: componentProps, allPropValues });
        if (structure && structure[0]) {
          lastParsedStructureRef.current = structure;

          // Debug initial prop references
          console.log('Initial prop references:');
          debugPropReferences(structure[0], componentProps);

          const newUsedProps = extractPropBindingsFromElement(structure[0], componentProps);
          setUsedProps(newUsedProps);
        }
      } catch (err) {
        console.error('Failed to extract prop bindings from initial code:', err);
      }

      const cssFiles = await loadCSSFiles();
      const files = {
        ...baseCode(activeCode.name),
        [`src/${activeCode.name}.tsx`]: initialContent,
        'src/props.js': generatePropsFileContent(componentProps, allInstances, allPropValues),
        'src/index.tsx': `import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { ${activeCode.name} } from './${activeCode.name}';
import { componentProps, componentPropsObject } from './props';

// Use transformed object props when available (for array format), or fall back to direct props
const propsToUse = componentPropsObject || componentProps;
console.log('🎨 Using props with default values:', propsToUse);
console.log('🎨 Background color should be:', propsToUse.backgroundColor);

ReactDOM.render(<${activeCode.name} {...propsToUse} />, document.getElementById('root'))`,
        ...cssFiles,
      };

      iframeContainerRef.current.innerHTML = '';

      console.log('Initializing StackBlitz project');
      stackblitz.embedProject(
        iframeContainerRef.current,
        {
          title: 'Editor',
          template: 'create-react-app',
          files,
          settings: { compile: { clearConsole: false } },
        },
        {
          openFile: `src/${activeCode.name}.tsx`,
          height: '100%',
          hideDevTools: false,
          showSidebar: false,
        },
      )
        .then(vm => {
          console.log('StackBlitz VM initialized');
          vmRef.current = vm;
          setVmReady(true);
          // Clone the props properly based on type
          lastComponentPropsRef.current = Array.isArray(componentProps)
            ? [...componentProps]
            : { ...componentProps };
          vm.getFsSnapshot().then(snapshot => {
            lastFileContentRef.current = snapshot[`src/${activeCode.name}.tsx`] || initialContent;
            console.log('Initial snapshot loaded', { lastFileContent: lastFileContentRef.current });
          });
        })
        .catch(error => {
          console.error('StackBlitz initialization error:', error);
          handleError(`Error initializing StackBlitz: ${error.message}`);
          setVmReady(false);
        });
    } catch (error) {
      console.error('Error in initStackBlitzEditor:', error);
      handleError(`Failed to initialize editor: ${error.message}`);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Initializing StackBlitz editor');
      initStackBlitzEditor();
    }, 100);
    return () => clearTimeout(timeoutId);
  }, [externalCode, activeCode?.name]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!vmRef.current || !activeCode) {return;}
      vmRef.current.getFsSnapshot().then(snapshot => {
        const currentContent = snapshot[`src/${activeCode.name}.tsx`] || '';
        if (
          currentContent &&
          normalizeContent(currentContent) !== normalizeContent(lastFileContentRef.current) &&
          !isProgrammaticUpdateRef.current
        ) {
          if (debounceTimeoutRef.current) {clearTimeout(debounceTimeoutRef.current);}
          debounceTimeoutRef.current = setTimeout(() => {
            try {
              setIsEditorUpdateSafe(true);
              const structured = convertToStructure('jsx', currentContent, { allProps: componentProps, allPropValues });
              console.log('Structured data from editor', structured);
              if (JSON.stringify(structured) !== JSON.stringify(lastParsedStructureRef.current)) {
                lastParsedStructureRef.current = structured;

                if (structured && structured[0]) {
                  // Extract prop bindings from the updated structure
                  console.log('Updated prop references from editor:');
                  debugPropReferences(structured[0], componentProps);

                  const newUsedProps = extractPropBindingsFromElement(structured[0], componentProps);
                  setUsedProps(newUsedProps);

                  // Sync literal value changes back to control panel
                  try {
                    console.log('🔄 About to call syncLiteralValuesToControlPanel...');
                    console.log('🔄 Structure being passed:', structured[0]);
                    console.log('🔄 Component props being passed:', componentProps);
                    console.log('🔄 All prop values being passed:', allPropValues);
                    // Get current state from Redux store
                    const currentState = store.getState();
                    console.log('🔄 Current Redux state element:', currentState?.elementEntity?.entities?.[structured[0]?.id]);

                    // Debug the current element state
                    const currentElement = currentState?.elementEntity?.entities?.[structured[0]?.id];
                    if (currentElement) {
                      console.log('🔄 Debugging current element state:');
                      debugElementStyleState(currentElement);

                      // Specific debugging for height property
                      const currentHeight = currentElement?.properties?.style?.height;
                      const currentHeightBinding = currentElement?.properties?.style?.binding?.height;
                      const newHeight = structured[0]?.properties?.style?.height;
                      const newHeightBinding = structured[0]?.properties?.style?.binding?.height;

                      console.log('🔍 Height property debugging:', {
                        currentHeight,
                        currentHeightBinding,
                        newHeight,
                        newHeightBinding,
                        hasHeightChanged: currentHeight !== newHeight,
                        hasHeightBindingChanged: JSON.stringify(currentHeightBinding) !== JSON.stringify(newHeightBinding),
                      });
                    }

                    // Debug the new structure state
                    console.log('🔄 Debugging new structure state:');
                    debugElementStyleState(structured[0]);

                    // Check for any binding changes in the current Redux state vs new structure
                    const currentStyleBindings = currentElement?.properties?.style?.binding || {};
                    const newStyleBindings = structured[0]?.properties?.style?.binding || {};

                    // Check if any binding properties have changed
                    const allBindingKeys = new Set([
                      ...Object.keys(currentStyleBindings),
                      ...Object.keys(newStyleBindings),
                    ]);

                    let hasBindingChanges = false;
                    for (const bindingKey of allBindingKeys) {
                      const currentBinding = currentStyleBindings[bindingKey];
                      const newBinding = newStyleBindings[bindingKey];

                      // Check if binding was added, removed, or changed
                      if (currentBinding && !newBinding) {
                        console.log(`🔄 Binding removed for property: ${bindingKey}`);
                        hasBindingChanges = true;
                      } else if (!currentBinding && newBinding) {
                        console.log(`🔄 Binding added for property: ${bindingKey}`);
                        hasBindingChanges = true;
                      } else if (currentBinding && newBinding &&
                               JSON.stringify(currentBinding) !== JSON.stringify(newBinding)) {
                        console.log(`🔄 Binding changed for property: ${bindingKey}`);
                        hasBindingChanges = true;
                      }
                    }

                    if (hasBindingChanges) {
                      console.log('🔄 Binding changes detected, syncing to control panel...');
                    }

                    syncLiteralValuesToControlPanel(structured[0], componentProps, allPropValues, dispatch, currentState);
                    console.log('✅ syncLiteralValuesToControlPanel completed');
                  } catch (error) {
                    console.error('❌ Error in syncLiteralValuesToControlPanel:', error);
                  }

                  dispatchElementsRecursively(structured[0], dispatch);
                }
              }
              lastFileContentRef.current = currentContent;
            } catch (err) {
              console.error('[StackBlitz] Structure parse failed:', err);
            }
          }, 500);
        }
      }).catch(console.error);
    }, 3000);
    return () => {
      clearInterval(interval);
      if (debounceTimeoutRef.current) {clearTimeout(debounceTimeoutRef.current);}
    };
  }, [activeCode, dispatch, componentProps]);

  return <Surface background={background}><StackBlitzContainer ref={iframeContainerRef} /></Surface>;
};
