/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Divider } from '../Divider';

export const TableRow = React.forwardRef(({
  children,
  size = 'medium',
  divider = true,

  isHovered: isHoveredExternal,
  onMouseEnter,
  onMouseLeave,

  isFocused: isFocusedExternal,
  onFocus,
  onBlur,

  isSelected,
  onClick,

}, ref) => {

  const [isHoveredInternal, setIsHoveredInternal] = useState(false);
  const [isFocusedInternal, setIsFocusedInternal] = useState(false);

  const isHovered = isHoveredExternal !== undefined ? isHoveredExternal : isHoveredInternal;
  const isFocused = isFocusedExternal !== undefined ? isFocusedExternal : isFocusedInternal;

  const handleMouseEnter = (e) => {
    setIsHoveredInternal(true);
    if (onMouseEnter) {onMouseEnter(e);}
  };

  const handleMouseLeave = (e) => {
    setIsHoveredInternal(false);
    if (onMouseLeave) {onMouseLeave(e);}
  };

  const handleFocus = (e) => {
    setIsFocusedInternal(true);
    if (onFocus) {onFocus(e);}
  };

  const handleBlur = (e) => {
    setIsFocusedInternal(false);
    if (onBlur) {onBlur(e);}
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick) {onClick();}
  };

  return (
    <StyledTableRow
      ref={ref}
      className='table-row'
      size={size}

      onClick={handleClick}

      isHovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}

      selected={isSelected}
    >
      {children}
      {divider && <Divider bottom />}
    </StyledTableRow>
  );
});

const StyledTableRow = styled.tr`
    display: flex;
    width: 100%;
    position: relative;
    height: 40px;
    background-color: red;
`;

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};
