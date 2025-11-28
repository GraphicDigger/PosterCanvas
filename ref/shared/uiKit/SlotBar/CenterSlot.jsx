/** @jsxImportSource @emotion/react */
import React, { memo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export const CenterSlot = memo(({
  children,
  padding = 4,
  className = 'slotBarCenter',
}) => (
  <StyledCenterSlot padding={padding} className={className}>
    {children}
  </StyledCenterSlot>
));

const StyledCenterSlot = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: ${({ padding }) => padding ? `0 ${padding * 4}px` : '0'};
    position: relative;
    width: max-content;
    pointer-events: auto;
`;

CenterSlot.propTypes = {
  children: PropTypes.node,
  padding: PropTypes.number,
  className: PropTypes.string,
};
