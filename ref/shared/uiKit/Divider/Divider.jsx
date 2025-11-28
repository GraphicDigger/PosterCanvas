/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

export const Divider = ({
  orientation = 'horizontal',
  color,
  margin = '0',
  top,
  bottom,
  left,
  right,
  zIndex,
}) => {
  const theme = useTheme();

  return (
    <StyledDivider
      className='divider'
      orientation={orientation}
      color={color}
      margin={margin}
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      theme={theme}
      zIndex={zIndex}
    />
  );
};

const StyledDivider = styled.div`
    display: flex;
    background-color: ${({ color, theme }) => color || theme.sys.color.outline.default};
    height: ${({ orientation }) => orientation === 'horizontal' ? '1px' : '100%'};
    width: ${({ orientation }) => orientation === 'horizontal' ? '100%' : '1px'};
    margin: ${({ margin }) => margin};
    z-index: ${({ zIndex, theme }) =>  zIndex && typeof zIndex === 'number' ? zIndex : theme.ref.zIndex.layers.base};
    position: ${({ top, bottom, left, right }) => top || bottom || left || right ? 'absolute' : 'none'};
    
    ${({ top }) => top && `
        top: ${typeof top === 'number' ? `${top}px` : 0 };
    `}
    ${({ bottom }) => bottom && `
        bottom: ${typeof bottom === 'number' ? `${bottom}px` : 0};
    `}
    ${({ left }) => left && `
        left: ${typeof left === 'number' ? `${left}px` : 0};
    `}
    ${({ right }) => right && `
        right: ${typeof right === 'number' ? `${right}px` : 0};
    `}
`;
