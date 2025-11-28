// src/shared/uiKit/Dialog/DialogWindow.jsx
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Backdrop } from '../Backdrop';
import { Surface } from '../Surface';
import { useDialog } from './models/hooks/useDialog';
import { getPositionStyles } from './lib';
import { borderRadius } from '../../styles';
import { useTheme } from '@emotion/react';

export const DialogWindow = forwardRef(({
  width,
  height,
  position = 'center',
  children,
}, ref) => {
  const theme = useTheme();
  const { isOpen, close } = useDialog();

  if (!isOpen) { return null; }

  return (
    <StyledFullContainer position={position} theme={theme} ref={ref}>
      <StyledWindow
        width={width}
        height={height}
        onClick={e => e.stopPropagation()}
        theme={theme}
      >
        <Surface border={false}>
          {children}
        </Surface>
      </StyledWindow>
      <Backdrop onClick={() => close()} zIndex={-1} />
    </StyledFullContainer>
  );
});

const StyledFullContainer = styled.div`
    position: fixed;
    display: flex;
    inset: 0;
    z-index: ${({ theme }) => theme.ref.zIndex.layers.modal};
    justify-content: ${({ position }) => getPositionStyles(position).justify};
    align-items: ${({ position }) => getPositionStyles(position).align};
`;

const StyledWindow = styled.div`
    position: relative; 
    border-radius: ${({ theme }) => theme.ref.borderRadius.large};
    overflow: hidden;
    width: ${({ width }) => {
    if (typeof width === 'number') { return `${width}px`; }
    return width;
  }};
    height: ${({ height, position }) => {
    if (typeof height === 'number') { return `${height}px`; }
    return height;
  }};
`;

DialogWindow.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  fullScreen: PropTypes.bool,
};
