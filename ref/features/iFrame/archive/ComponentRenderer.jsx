import React from 'react';
import styled from '@emotion/styled';
import { UIRender } from '../ui/archive/UIRender';
import { useUILibraryComponents } from '../../../shared/uiMui';

export const ComponentRenderer = ({ elements, component }) => {

  const { muiComponents } = useUILibraryComponents();


  // Если есть элементы для рендеринга, рендерим стандартный компонент
  if (elements && elements.length > 0) {
    return (
      <>
        {elements.map(element => (
          <UIRender
            key={element.id}
            element={element}
          />
        ))}
      </>
    );
  }

  // Если передан компонент и это импортированный компонент
  if (component && component.metadata && component.metadata.source === 'importer') {
    // Находим оригинальный MUI компонент
    const originalMuiComponent = component.metadata.originalId
      ? muiComponents.find(comp => comp.id === component.metadata.originalId)
      : null;

    if (originalMuiComponent) {
      return (
        <ImportedComponentWrapper>
          {originalMuiComponent.renderPreview ?
            originalMuiComponent.renderPreview() :
            React.createElement(originalMuiComponent.component, {})}
        </ImportedComponentWrapper>
      );
    }
  }

  // Если ничего из вышеперечисленного не подходит
  return null;
};

const ImportedComponentWrapper = styled.div`
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 4px;
    min-width: 200px;
    min-height: 100px;
`;

