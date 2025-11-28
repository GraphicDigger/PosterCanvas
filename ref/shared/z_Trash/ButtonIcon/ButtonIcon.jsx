/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { buttonIconStyles } from './ButtonIconStyles';
import { PlusIcon } from '../../../shared/assets/icons';

export const ButtonIcon = ({
  children,
  color = 'default',
  variant = 'blank',
  size = 'small',
  focused = false,
  disable = false,
  onClick,
}) => {
  const theme  = useTheme();

  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setIsFocused(focused);
  }, [focused]);

  return (
    <StyledButton
      onMouseEnter={() => !focused && setIsHovered(true)}
      onMouseLeave={() => !focused && setIsHovered(false)}
      onFocus={() => focused && setIsFocused(true)}
      onBlur={() => { setIsFocused(false); setIsHovered(false); }}
      disabled={disable}
      onClick={onClick}
      size={size}
      theme={theme}
      color={color}
      variant={variant}
    >
      {children || <PlusIcon />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ size, theme }) => theme.ref.control.height[size]};
    height: ${({ size, theme }) => theme.ref.control.height[size]};
    border-radius: 8px;
    background-color: ${({ theme, color, variant }) => theme.comp.button[color][variant].default.background || 'transparent'};
    cursor: ${({ disable }) => disable ? 'not-allowed' : 'pointer'};
    position: relative;

    & [fill]:not([fill="none"]) {
        fill: ${({ theme, color, variant }) => theme.comp.button[color][variant].default.icon || 'inherit'};
        stroke: none;
    }

    & [stroke]:not([stroke="none"]) {
        stroke: ${({ theme, color, variant }) => theme.comp.button[color][variant].default.icon || 'inherit'};
        fill: none;
    }

    & [fill][stroke]:not([fill="none"]):not([stroke="none"]) {
        fill: ${({ theme, color, variant }) => theme.comp.button[color][variant].default.icon || 'inherit'};
        stroke: ${({ theme, color, variant }) => theme.comp.button[color][variant].default.icon || 'inherit'};
    }

`;


ButtonIcon.propTypes = {
  variant: PropTypes.oneOf(['blank', 'lite', 'filled']),
  color: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  iconName: PropTypes.string.isRequired,
  disable: PropTypes.bool,
  onClick: PropTypes.func,
  focused: PropTypes.bool,
  lite: PropTypes.bool,
};
