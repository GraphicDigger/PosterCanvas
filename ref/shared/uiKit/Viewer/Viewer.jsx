/** @jsxImportSource @emotion/react */
import React, { forwardRef, useState, useMemo } from 'react';
import styled from '@emotion/styled';
import { Backdrop } from '@/shared/uiKit/Backdrop';
import { useViewer } from './model';
import { useKeyboard } from '@/shared/lib';
import { useTheme } from '@emotion/react';
import { ViewerWindow } from './ViewerWindow';
import { ViewerPanelHeader } from './ViewerPanelHeader';

// Счетчик для генерации уникальных ID групп
const groupIdCounter = 0;

export const Viewer = forwardRef(({
  children,
  groupId = 'default',
  backdrop = true,
  position = 'left',
  onClose,
  canClose = true,
  ...props
}, ref) => {
  const theme = useTheme();
  const { isAnyViewerOpen, closeAllStepInGroup } = useViewer();

  const handleClose = () => {
    closeAllStepInGroup(groupId);
    onClose && onClose();
  };

  useKeyboard({
    onEscape: handleClose,
  });

  // Рекурсивно передаем groupId всем ViewerWindow компонентам
  const childrenWithGroupId = useMemo(() => {
    const cloneChildren = (children) => {
      return React.Children.map(children, child => {
        if (!React.isValidElement(child)) {return child;}

        if (child.type === ViewerWindow) {
          return React.cloneElement(child, { groupId });
        }

        // Рекурсивно обрабатываем дочерние элементы
        if (child.props.children) {
          return React.cloneElement(child, {
            ...child.props,
            children: cloneChildren(child.props.children),
          });
        }

        return child;
      });
    };

    return cloneChildren(children);
  }, [children, groupId]);

  const isOpen = isAnyViewerOpen(groupId);

  if (!isOpen) {return null;}

  return (
    <>
      <StyledCustomPosition
        ref={ref}
        position={position}
        backdrop={backdrop}
        theme={theme}
        {...props}
      >
        {childrenWithGroupId}
      </StyledCustomPosition>
      {backdrop &&
        <Backdrop
          onClick={handleClose}
          zIndex={theme.ref.zIndex.layers.overlay}
          {...props}
        />
      }
    </>
  );
});

const StyledCustomPosition = styled.div`
    position: absolute;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    top: 0;
    bottom: 0;
    left: ${({ position }) => position === 'left' ? 0 : undefined};
    right: ${({ position }) => position === 'right' ? 0 : undefined};
    min-width: max-content;
    max-width: 100%;
    display: 'flex';
    z-index: ${({ theme }) => theme.ref.zIndex.layers.modal};
  `;
