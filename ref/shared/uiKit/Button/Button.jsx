// src/shared/uiKit/Button/Button.jsx
/** @jsxImportSource @emotion/react */
import React, { memo, forwardRef, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

export const Button = memo(forwardRef(({
  variant = 'filled',
  color = 'primary',
  size = 'small',
  stretch = false,
  startIcon,
  endIcon,
  children,
  onClick,
  disabled = false,
  className,
  'data-testid': dataTestId,
  isFocused: externalFocused,
  isHovered: externalHovered,
  isSelected,
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

  const textColor = useMemo(() => {
    if (!buttonTheme) {return 'inherit';}
    if (disabled && buttonTheme.disabled?.text) {return buttonTheme.disabled.text;}
    if (isSelected && buttonTheme.selected?.text) {return buttonTheme.selected.text;}
    if (isFocused && buttonTheme.selected?.text) {return buttonTheme.selected.text;}
    if (isHovered && buttonTheme.hover?.text) {return buttonTheme.hover.text;}
    return buttonTheme.default?.text || 'inherit';
  }, [buttonTheme, isHovered, isFocused, isSelected, disabled]);

  const iconColor = useMemo(() => {
    if (!buttonTheme) {return 'inherit';}
    if (disabled && buttonTheme.disabled?.icon) {return buttonTheme.disabled.icon;}
    if (isSelected && buttonTheme.selected?.icon) {return buttonTheme.selected.icon;}
    if (isFocused && buttonTheme.selected?.icon) {return buttonTheme.selected.icon;}
    if (isHovered && buttonTheme.hover?.icon) {return buttonTheme.hover.icon;}
    return buttonTheme.default?.icon || 'inherit';
  }, [buttonTheme, isHovered, isFocused, isSelected, disabled]);

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
    if (!disabled && externalFocused === undefined) {
      setInternalFocused(true);
      e.stopPropagation();
    }
  }, [disabled, externalFocused]);

  const handleBlur = useCallback((e) => {
    if (!disabled && externalFocused === undefined) {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setInternalFocused(false);
      }
      e.stopPropagation();
    }
  }, [disabled, externalFocused]);

  return (
    <StyledButton
      ref={ref}
      $size={size}
      $stretch={stretch}
      $disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      theme={theme}
      color={color}
      variant={variant}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
      $iconColor={iconColor}
      data-testid={dataTestId}
    >
      {startIcon && <StyledIcon $colors={iconColor}>{startIcon}</StyledIcon>}
      {children && <StyledText>{children}</StyledText>}
      {endIcon && <StyledIcon $colors={iconColor}>{endIcon}</StyledIcon>}
    </StyledButton>
  );
}));

// Стилизованные компоненты
const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ $size }) => $size === 'large' ? 8 : 6}px;
    width: ${({ $stretch }) => $stretch ? '100%' : 'max-content'};
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    color: ${({ $textColor }) => $textColor};
    height: ${({ $size, theme }) => {
    if (typeof $size === 'number') { return `${$size}px`; }
    return theme.ref.control.height[$size];
  }};
    font-size: ${({ $size, theme }) => {
    switch ($size) {
    case 'small':
      return theme.sys.typography.body.xsmall.fontSize;
    case 'medium':
      return theme.sys.typography.body.small.fontSize;
    case 'large':
      return theme.sys.typography.body.medium.fontSize;
    default:
      return theme.sys.typography.body.xsmall.fontSize;
    }
  }};
    border-radius: 8px;
    flex-shrink: 0;
    cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
    max-width: 100%;
    padding: 0 8px;
    outline: none;
    
    opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};

    & [fill]:not([fill="none"]) {
        fill: ${({ $iconColor }) => $iconColor};
        stroke: none;
    }

    & [stroke]:not([stroke="none"]) {
        stroke: ${({ $iconColor }) => $iconColor};
        fill: none;
    }

    & [fill][stroke]:not([fill="none"]):not([stroke="none"]) {
        fill: ${({ $iconColor }) => $iconColor};
        stroke: ${({ $iconColor }) => $iconColor};
    }
        
`;

const StyledIcon = styled.div`
    display: contents;
`;

const StyledText = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

Button.propTypes = {
  variant: PropTypes.oneOf(['filled', 'lite', 'blank']),
  color: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  stretch: PropTypes.bool,
  isSelected: PropTypes.bool,
  isFocused: PropTypes.bool,
  isHovered: PropTypes.bool,
};

Button.displayName = 'Button';
