/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { ENTITY_KINDS } from '../../../shared/constants';
import { Surface } from '../../../shared/uiKit/Surface';
import { useTheme } from '@emotion/react';
import { normalizeProps } from '../lib/utils/propsSync';

const PreviewContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ComponentContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  overflow: auto;
`;

const PropsPanel = styled.div`
  padding: 10px;
  background-color: ${props => props.background};
  border-top: 1px solid ${props => props.borderColor};
  font-size: 12px;
  max-height: 30%;
  overflow: auto;
`;

const PropItem = styled.div`
  margin-bottom: 4px;
  display: flex;
  
  &:hover {
    background-color: rgba(0,0,0,0.05);
  }
`;

const PropName = styled.span`
  font-weight: bold;
  margin-right: 8px;
  flex: 0 0 120px;
`;

const PropValue = styled.span`
  color: ${props => props.isUsed ? '#007700' : '#777777'};
  font-style: ${props => props.isUsed ? 'normal' : 'italic'};
`;

/**
 * A component preview wrapper that shows component with props
 * and highlights which props are actively used
 */
export const ComponentPreview = ({
  component,
  componentProps = [],
  usedProps = {},
  children,
}) => {
  const theme = useTheme();
  const [activeProps, setActiveProps] = useState({});

  // Normalize the props for display and usage
  useEffect(() => {
    const normalized = normalizeProps(componentProps);
    const flattened = {};

    Object.values(normalized.byId).forEach(prop => {
      if (prop && prop.name) {
        flattened[prop.name] = prop.defaultValue;
      }
    });

    setActiveProps(flattened);
  }, [componentProps]);

  if (!component) {return null;}

  return (
    <Surface background={theme.sys.color.surface}>
      <PreviewContainer>
        <ComponentContainer>
          {children}
        </ComponentContainer>

        <PropsPanel background={theme.sys.color.surfaceContainer.low} borderColor={theme.sys.color.outline.default}>
          <h4>Component Props</h4>
          {Object.keys(activeProps).map(propName => (
            <PropItem key={propName}>
              <PropName>{propName}:</PropName>
              <PropValue isUsed={!!usedProps[propName]}>
                {typeof activeProps[propName] === 'object'
                  ? JSON.stringify(activeProps[propName])
                  : String(activeProps[propName])}
                {usedProps[propName] ? ' ✓' : ' (unused)'}
              </PropValue>
            </PropItem>
          ))}
        </PropsPanel>
      </PreviewContainer>
    </Surface>
  );
};
