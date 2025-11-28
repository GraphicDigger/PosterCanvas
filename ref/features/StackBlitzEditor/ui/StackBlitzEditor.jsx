/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { StackBlitzProject } from './StackBlitzProject';
import { ComponentPreview } from './ComponentPreview';
import { useStackBlitzPreview } from '../model';
import { extractPropBindingsFromElement } from '../lib/utils/propsSync';
import { convertToStructure } from '../lib/utils/structureConverters';

/**
 * Integrated StackBlitz Editor component
 * Provides both the code editor and a live preview with prop binding visualization
 */
export const StackBlitzEditor = ({ externalCode, activeComponent, componentProps }) => {
  const [usedProps, setUsedProps] = useState({});
  const { element, error } = useStackBlitzPreview();

  // Parse the structure to find prop bindings whenever the code or props change
  useEffect(() => {
    if (!externalCode || !componentProps) {return;}

    try {
      const structure = convertToStructure('jsx', externalCode, { allProps: componentProps });
      if (structure && structure[0]) {
        const newUsedProps = extractPropBindingsFromElement(structure[0], componentProps);
        setUsedProps(newUsedProps);
      }
    } catch (err) {
      console.error('Failed to extract prop bindings:', err);
    }
  }, [externalCode, componentProps]);

  return (
    <div css={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {/* Stack Blitz Code Editor */}
      <div css={{ flex: 2, minHeight: '60%', position: 'relative' }}>
        <StackBlitzProject
          externalCode={externalCode}
          componentProps={componentProps}
        />
      </div>

      {/* Component Preview with Props Panel */}
      <div css={{ flex: 1, minHeight: '40%', position: 'relative' }}>
        <ComponentPreview
          component={activeComponent}
          componentProps={componentProps}
          usedProps={usedProps}
        >
          {error ? (
            <div css={{ color: 'red', padding: '20px' }}>
              {error}
            </div>
          ) : (
            <div css={{
              padding: '20px',
              border: '1px dashed #ccc',
              borderRadius: '4px',
              backgroundColor: '#f9f9f9',
            }}>
              {/* This would be where the live preview renders */}
              <div css={{ fontSize: '12px', marginBottom: '10px', color: '#777' }}>
                Component Preview
              </div>
              {/* You could render the component directly here if needed */}
            </div>
          )}
        </ComponentPreview>
      </div>
    </div>
  );
};
