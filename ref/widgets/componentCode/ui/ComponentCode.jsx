/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { StackBlitzProject } from '../../../features/StackBlitzEditor';
import { useCodeEditor } from '../../../features/codeEditor';
import { convertStructureTo } from '../../../features/StackBlitzEditor/lib/utils/structureConverters';
import { useComponents } from '../../../entities/uiComponent';
import { ENTITY_KINDS } from '../../../shared/constants';
import { useProps } from '../../../entities/varProp';
import { useUITree } from '../../../entities/uiTree';
// import { selectCompositeEntitiesByOwnership } from '../../../entities/entities';

export const ComponentCode = () => {
  const { activeCode } = useCodeEditor();
  const [componentCode, setComponentCode] = useState('');
  const { selectedComponent } = useComponents();
  const { selectedComponentProps } = useProps();
  const { componentUITree: uiTree } = useUITree();

  // // Get UI tree directly using useSelector
  // const uiTree = useSelector(state =>
  //   selectedComponent
  //     ? selectCompositeEntitiesByOwnership(state, ENTITY_KINDS.COMPONENT, selectedComponent.id)
  //     : []
  // );

  useEffect(() => {
    if (!selectedComponent?.name || !activeCode?.name) {
      setComponentCode('');
      return;
    }
    console.log('selectedComponent', selectedComponent);
    console.log('uiTree', uiTree);
    try {
      if (uiTree && uiTree.length > 0) {
        // Deep clone the tree to avoid mutating Redux state, which can cause errors.
        const processedTree = JSON.parse(JSON.stringify(uiTree));

        // Convert the props array to a dictionary for easier lookup.
        const propsDict = selectedComponentProps.reduce((acc, prop) => {
          acc[prop.id] = prop;
          return acc;
        }, {});

        // Generate JSX for each element with proper indentation
        const jsxCode = processedTree
          .map((element) => {
            try {
              const elementJsx = convertStructureTo('jsx', element, { allProps: propsDict });
              // Add proper indentation (6 spaces for alignment)
              return elementJsx.split('\n').map(line => `      ${line}`).join('\n');
            } catch (error) {
              console.error('[ComponentCode] Error converting element to JSX:', error);
              return '';
            }
          })
          .filter(Boolean) // Remove empty strings
          .join('\n');

        const fullCode = `import React from 'react';

export const ${activeCode.name} = (props) => {
  return (
${jsxCode}
  );
};`;

        setComponentCode(fullCode);
      } else {
        // Generate placeholder component if no elements exist
        const placeholderCode = `import React from 'react';

export const ${activeCode.name} = () => {
  return (
    <div 
      data-id="placeholder" 
      data-kind="${ENTITY_KINDS.ELEMENT}" 
      data-ownership-type="${ENTITY_KINDS.COMPONENT}"
      data-component-id="${selectedComponent.id}"
    >
      <p>Component: ${selectedComponent.name}</p>
      <p>No elements defined yet. Add elements to see the generated code.</p>
    </div>
  );
};`;
        setComponentCode(placeholderCode);
      }
    } catch (error) {
      console.error('[ComponentCode] Error generating code:', error);
    }
  }, [selectedComponent, activeCode, uiTree, selectedComponentProps]);

  return (
    <StackBlitzProject
      externalCode={componentCode}
      componentProps={selectedComponentProps}
    />
  );
};
