// src/shared/uiKit/Chip/Chip.jsx
/** @jsxImportSource @emotion/react */
import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { ButtonTool } from '../ButtonTool';
import { CrossIcon } from '../../assets/icons';

export const Chip = memo(forwardRef(({
  label,
  variant = 'filled',
  color = 'default',
  size = 'medium',
  avatar,
  icon,
  deleteIcon,

  onClick,
  onDelete,
  disabled = false,
  clickable = false,
  deletable = false,

  children,
  className,
  ...props
}, ref) => {
  const theme = useTheme();

  // Определяем, является ли чип кликабельным
  const isClickable = clickable || !!onClick;
  // Определяем, является ли чип удаляемым
  const isDeletable = deletable || !!onDelete;

  const handleClick = (event) => {
    if (disabled) {return;}
    if (onClick) {
      onClick(event);
    }
  };

  const handleDelete = (event) => {
    if (disabled) {return;}
    event.stopPropagation();
    if (onDelete) {
      onDelete(event);
    }
  };

  const handleKeyDown = (event) => {
    if (disabled) {return;}

    // Обработка клавиш для удаления
    if ((event.key === 'Backspace' || event.key === 'Delete') && isDeletable) {
      event.preventDefault();
      handleDelete(event);
    }

    // Обработка Escape для снятия фокуса
    if (event.key === 'Escape') {
      event.currentTarget.blur();
    }
  };

  return (
    <StyledChip
      ref={ref}
      $variant={variant}
      $color={color}
      $size={size}
      $disabled={disabled}
      $clickable={isClickable}
      $deletable={isDeletable}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable || isDeletable ? 0 : -1}
      role={isClickable ? 'button' : isDeletable ? 'button' : undefined}
      className={className}
      theme={theme}
      {...props}
    >
      {avatar && avatar}

      {icon && !avatar && icon}

      <StyledLabel $size={size}>
        {label || children}
      </StyledLabel>

      {isDeletable &&
                <ButtonTool width={20} height={20} onClick={handleDelete}>
                  {deleteIcon || <CrossIcon />}
                </ButtonTool>
      }
    </StyledChip>
  );
}));

// Компонент иконки удаления по умолчанию
const DefaultDeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

// Стилизованные компоненты
const StyledChip = styled.div`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    gap: ${({ $size }) => $size === 'small' ? 4 : 6}px;
    height: ${({ $size, theme }) => {
    if (typeof $size === 'number') {return `${$size}px`;}
    return $size === 'small' ? '24px' : '32px';
  }};
    padding: 0 ${({ $size }) => $size === 'small' ? 8 : 12}px;
    border-radius: ${({ $size }) => $size === 'small' ? '12px' : '16px'};

    font-size: ${({ $size, theme }) => {
    if (typeof $size === 'number') {return '14px';}
    return $size === 'small' ? '12px' : '14px';
  }};
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    
    cursor: ${({ $clickable, $disabled }) => {
    if ($disabled) {return 'not-allowed';}
    return $clickable ? 'pointer' : 'default';
  }};
    user-select: none;
    transition: all 0.2s ease-in-out;
    outline: none;
    
    background-color: ${({ theme, $color, $variant }) => {
    if ($variant === 'outlined') {return 'transparent';}
    return theme.comp?.chip?.[$color]?.[$variant]?.background ||
            ($color === 'default' ? theme.sys.color.surfaceVariant : theme.sys.color.primary);
  }};
    
    color: ${({ theme, $color, $variant }) => {
    if ($variant === 'outlined') {
      return theme.comp?.chip?.[$color]?.[$variant]?.text ||
                ($color === 'default' ? theme.sys.color.onSurfaceVariant : theme.sys.color.primary);
    }
    return theme.comp?.chip?.[$color]?.[$variant]?.text ||
            ($color === 'default' ? theme.sys.color.onSurfaceVariant : theme.sys.color.onPrimary);
  }};
    
    border: ${({ $variant, theme, $color }) => {
    if ($variant === 'outlined') {
      return `1px solid ${theme.comp?.chip?.[$color]?.outlined?.border ||
                ($color === 'default' ? theme.sys.color.outline : theme.sys.color.primary)}`;
    }
    return 'none';
  }};
    
    &:hover:not(:disabled) {
        background-color: ${({ theme, $color, $variant, $clickable }) => {
    if (!$clickable) {return 'inherit';}
    return theme.comp?.chip?.[$color]?.[$variant]?.hover?.background ||
            ($variant === 'outlined' ? theme.sys.color.surfaceVariant : theme.sys.color.primaryContainer);
  }};
        
        color: ${({ theme, $color, $variant, $clickable }) => {
    if (!$clickable) {return 'inherit';}
    return theme.comp?.chip?.[$color]?.[$variant]?.hover?.text || 'inherit';
  }};
        
        border-color: ${({ $variant, theme, $color, $clickable }) => {
    if (!$clickable || $variant !== 'outlined') {return 'inherit';}
    return theme.comp?.chip?.[$color]?.outlined?.hover?.border || theme.sys.color.primary;
  }};
    }
    
    &:focus-visible {
        box-shadow: 0 0 0 2px ${({ theme }) => theme.sys.color.primary};
    }
    
    &:active:not(:disabled) {
        transform: ${({ $clickable }) => $clickable ? 'scale(0.98)' : 'none'};
    }
    
    opacity: ${({ $disabled }) => $disabled ? 0.6 : 1};
    
    & [fill]:not([fill="none"]) {
        fill: currentColor;
        stroke: none;
    }
    
    & [stroke]:not([stroke="none"]) {
        stroke: currentColor;
        fill: none;
    }
`;


const StyledLabel = styled.span`
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledDeleteIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({ $size }) => $size === 'small' ? '16px' : '18px'};
    height: ${({ $size }) => $size === 'small' ? '16px' : '18px'};
    border-radius: 50%;
    cursor: pointer;
    flex-shrink: 0;
    transition: background-color 0.2s ease-in-out;
    
    &:hover {
        background-color: ${({ theme }) => theme.sys.color.onSurfaceVariant + '20'};
    }
    
    svg {
        width: 100%;
        height: 100%;
    }
`;

Chip.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined']),
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
  size: PropTypes.oneOf(['small', 'medium']),
  avatar: PropTypes.node,
  icon: PropTypes.node,
  deleteIcon: PropTypes.node,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  disabled: PropTypes.bool,
  clickable: PropTypes.bool,
  deletable: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

Chip.displayName = 'Chip';
