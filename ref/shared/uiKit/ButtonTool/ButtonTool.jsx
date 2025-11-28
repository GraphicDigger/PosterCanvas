/** @jsxImportSource @emotion/react */
import React, { useState, forwardRef, memo, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { PlusIcon } from '../../../shared/assets/icons';

export const ButtonTool = memo(forwardRef(({
  variant = 'blank',
  color = 'default',
  size = 'small',
  rounded = 'all',
  width,
  height,
  isFocused: externalFocused,
  isHovered: externalHovered,
  isSelected,
  disabled = false,
  focus = false,
  onClick,
  children,
  customBgColor,
  customIconColor,
  'data-testid': dataTestId,

}, ref) => {
  const theme = useTheme();

  const [internalHovered, setInternalHovered] = useState(false);
  const [internalFocused, setInternalFocused] = useState(false);

  const isHovered = externalHovered !== undefined ? externalHovered : internalHovered;
  const isFocused = externalFocused !== undefined ? externalFocused : internalFocused;

  const buttonTheme = useMemo(() =>
    theme?.comp?.button?.[color]?.[variant],
  [theme, color, variant],
  );

  const backgroundColor = useMemo(() => {
    if (!buttonTheme) {return 'transparent';}
    if (disabled && buttonTheme.disabled?.background) {return buttonTheme.disabled.background;}
    if (isSelected && buttonTheme.selected?.background) {return buttonTheme.selected.background;}
    if (isFocused && buttonTheme.selected?.background) {return buttonTheme.selected.background;}
    if (isHovered && buttonTheme.hover?.background) {return buttonTheme.hover.background;}
    return buttonTheme.default?.background || 'transparent';
  }, [buttonTheme, isHovered, isFocused, isSelected, disabled]);

  const iconColor = useMemo(() => {
    if (!buttonTheme) {return 'inherit';}
    if (disabled && buttonTheme.disabled?.icon) {return buttonTheme.disabled.icon;}
    if (isSelected && buttonTheme.selected?.icon) {return buttonTheme.selected.icon;}
    if (isFocused && buttonTheme.selected?.icon) {return buttonTheme.selected.icon;}
    if (isHovered && buttonTheme.hover?.icon) {return buttonTheme.hover.icon;}
    return buttonTheme.default?.icon || 'inherit';
  }, [buttonTheme, isHovered, isFocused, isSelected, disabled]);

  const handleClick = useCallback((e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  }, [disabled, onClick]);

  // Объединенные обработчики для упрощения
  const handleMouseEnter = useCallback(() => {
    if (!disabled && externalHovered === undefined) {
      setInternalHovered(true);
    }
  }, [disabled, externalHovered]);

  const handleMouseLeave = useCallback(() => {
    if (!disabled && externalHovered === undefined) {
      setInternalHovered(false);
    }
  }, [disabled, externalHovered]);

  const handleFocus = useCallback((e) => {
    if (!disabled && externalFocused === undefined && focus) {
      setInternalFocused(true);
      e.stopPropagation();
    }
  }, [disabled, externalFocused, focus]);

  const handleBlur = useCallback((e) => {
    if (!disabled && externalFocused === undefined && focus) {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setInternalFocused(false);
      }
      e.stopPropagation();
    }
  }, [disabled, externalFocused, focus]);

  return (
    <StyledButton
      ref={ref}
      size={size}
      width={width}
      height={height}
      rounded={rounded}
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
      isHovered={isHovered}
      isFocused={isFocused}
      isSelected={isSelected}
      variant={variant}
      theme={theme}
      color={color}
      backgroundColor={backgroundColor}
      iconColor={iconColor}
      data-testid={dataTestId}
    >
      {children || <PlusIcon />}
    </StyledButton>
  );
}));

const StyledButton = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: ${({ width }) => width ? '1' : '0'};
    height: ${({ height, size, theme }) => {
    if (height) { return typeof height === 'number' ? `${height}px` : height; }
    return theme.ref.control.height[size];
  }};
    width: ${({ width, size, theme }) => {
    if (width) { return typeof width === 'number' ? `${width}px` : width; }
    return theme.ref.control.height[size];
  }};
    border-radius: ${({ rounded, theme }) => {
    switch (rounded) {
    case 'none': return '0';
    case 'left': return `${theme.ref.borderRadius.medium} 0 0 ${theme.ref.borderRadius.medium}`;
    case 'right': return `0 ${theme.ref.borderRadius.medium} ${theme.ref.borderRadius.medium} 0`;
    default: return theme.ref.borderRadius.medium;
    }
  }};
    background-color: ${({ backgroundColor }) => backgroundColor};

    & [fill]:not([fill="none"]) {
        fill: ${({ iconColor }) => iconColor};
        stroke: none;
    }
    & [stroke]:not([stroke="none"]) {
        stroke: ${({ iconColor }) => iconColor};
        fill: none;
    }
    & [fill][stroke]:not([fill="none"]):not([stroke="none"]) {
        fill: ${({ iconColor }) => iconColor};
        stroke: ${({ iconColor }) => iconColor};
    }
        
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    outline: none;
`;

ButtonTool.propTypes = {
  color: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  variant: PropTypes.oneOf(['blank', 'lite', 'filled']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  rounded: PropTypes.oneOf(['none', 'all', 'left', 'right']),
  width: PropTypes.string,
  isSelected: PropTypes.bool,
  isFocused: PropTypes.bool,
  isHovered: PropTypes.bool,
  focus: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  customBgColor: PropTypes.string,
  customIconColor: PropTypes.string,
};

