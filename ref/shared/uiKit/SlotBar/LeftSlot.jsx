/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export const LeftSlot = memo(({
  children,
  padding,
  height = 'fit',
  className = 'slotBarLeft',
}) => (
  <StyledLeftSlot
    padding={padding}
    height={height}
    className={className}
  >
    {children}
  </StyledLeftSlot>
));

const StyledLeftSlot = styled.div`
    display: flex;
    height: ${({ height }) => {
    if (typeof height === 'number') {return `${height}px`;}
    if (height === 'fill') {return '100%';}
    if (height === 'fit') {return 'max-content';}
    return height;
  }};   
    align-items: center;
    justify-content: flex-start;
    width: max-content;
    min-height: 16px;
    gap: 8px;
    padding: ${({ padding }) => padding ? `0 ${padding * 4}px` : '0'};
    pointer-events: auto;
`;

LeftSlot.propTypes = {
  children: PropTypes.node,
  space: PropTypes.number,
  className: PropTypes.string,
};
