/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export const RightSlot = memo(({
  children,
  padding,
  className = 'slotBarRight',
}) => (
  <StyledRightSlot padding={padding} className={className}>
    {children}
  </StyledRightSlot>
));

const StyledRightSlot = styled.div`
    display: flex;
    position:relative;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: ${({ padding }) => padding ? `0 ${padding * 4}px` : '0'};
    pointer-events: auto;
`;

RightSlot.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.number,
  className: PropTypes.string,
};

