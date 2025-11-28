/** @jsxImportSource @emotion/react */
import React, { useState, forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

export const ListItemButton = forwardRef(({
  filled = true,
  children,
  padding,
  size,

  isHovered: isHoveredExternal,
  onMouseEnter,
  onMouseLeave,

  isFocused: isFocusedExternal,
  onFocus,
  onBlur,

  isSelected,
  onClick,
}, ref) => {
  const theme = useTheme();

  const [isHoveredInternal, setIsHoveredInternal] = useState(false);
  const [isFocusedInternal, setIsFocusedInternal] = useState(false);

  const isHovered = isHoveredExternal !== undefined ? isHoveredExternal : isHoveredInternal;
  const isFocused = isFocusedExternal !== undefined ? isFocusedExternal : isFocusedInternal;

  const updatedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...child.props,
        size,
      });
    }
    return child;
  });

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
    if (onClick) {onClick(e);}
  };

  return (
    <StyledButton
      ref={ref}
      className="list-item-button"
      filled={filled}
      theme={theme}
      tabIndex={0}
      padding={padding}
      size={size}

      isHovered={isHovered}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

      isFocused={isFocused}
      onFocus={handleFocus}
      onBlur={handleBlur}

      isSelected={isSelected}
      onClick={handleClick}

    >
      {updatedChildren}
    </StyledButton>
  );
});

const StyledButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${({ filled, theme, isSelected, isHovered, isFocused }) => {
    if (isHovered && !isSelected)
    {return filled
      ? theme.comp.listItem.default.filled.background
      : theme.comp.listItem.hovered.blank.background;}
    if (isFocused && !isSelected)
    {return filled
      ? theme.comp.listItem.selected.filled.background
      : theme.comp.listItem.selected.blank.background;}
    if (isSelected)
    {return theme.comp.listItem.selected.filled.background;}
    return filled
      ? theme.comp.listItem.default.filled.background
      : theme.comp.listItem.default.blank.background;
  }};
    border-radius: 8px;
    padding:  ${({ padding, size }) => padding ? `${padding}px` : size === 'small' ? '0 0 0 8px' : size === 'medium' ? '0 0 0 12px' : '0 0 0 12px'};
    cursor: pointer;
    user-select: none;
`;

ListItemButton.propTypes = {
  filled: PropTypes.bool,
  children: PropTypes.node,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  isHovered: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  isFocused: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};
