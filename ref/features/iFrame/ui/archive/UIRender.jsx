import React, { memo, useMemo, useCallback } from 'react';
import styled from '@emotion/styled';
import { ENTITY_KINDS } from '../../../../shared/constants';
import { instances } from '../../../../entities/uiInstance';
import { TextContent, ELEMENT_RENDERERS_MAP } from './elements';
import { useRenderEvents } from '../../../../entities/uiFocus';
import { UIWrapper } from './UIWrapper';
import { useDesignMode } from '../../../../entities/mode/editorMode';
import { InstanceContext, useCurrentInstance } from '../../model';
import { useInstances } from '../../../../entities/uiInstance';

// Memoized child renderer to prevent unnecessary re-renders
const MemoizedUIRender = memo(({ ui, disableClick }) => {
  return <UIRender ui={ui} disableClick={disableClick} />;
});

// Main ui renderer: create the correct tag and handle child elements
export const UIRender = memo(({ ui, disableClick = false }) => {

  const { isComponentCanvasInDesignMode } = useDesignMode();
  const { instanceById } = useInstances();
  const contextInstance = useCurrentInstance();

  if (!ui || !ui.properties) {return null;}
  const { properties, children } = ui;

  // Memoize current instance calculation
  const currentInstance = useMemo(() => {
    return ui.kind === ENTITY_KINDS.INSTANCE
      ? instanceById(ui.id) || ui
      : contextInstance;
  }, [ui.kind, ui.id, instanceById, contextInstance]);

  const eventHandlers = useRenderEvents(ui, disableClick);

  if (ui.kind === ENTITY_KINDS.INSTANCE) {
    return (
      <UIWrapper key={ui.id} ui={currentInstance}>
        <InstanceContext.Provider value={currentInstance}>
          {children.length > 0 && children.map(child => (
            <MemoizedUIRender
              key={child.id}
              ui={child}
              disableClick={disableClick}
            />
          ))}
        </InstanceContext.Provider>
      </UIWrapper>
    );
  }

  const HTMLElementRenderer = ELEMENT_RENDERERS_MAP[ui.tag || ui.type];
  if (HTMLElementRenderer) {
    return <HTMLElementRenderer
      ui={ui}
      children={children}
      disableClick={disableClick}
    />;
  }

  const Tag = ui.tag || 'div';

  return (
    <Tag
      style={properties.style}
      {...properties.attributes}
      data-ui-id={ui.id}
      {...eventHandlers}
    >
      <TextContent ui={ui} />

      {children && children.length > 0 && (
        <>
          {children.map(child => {
            return (
              <MemoizedUIRender
                key={child.id}
                ui={child}
                disableClick={disableClick}
              />
            );
          })}
        </>
      )}
    </Tag>
  );
});
