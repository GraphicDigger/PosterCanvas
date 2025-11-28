import React from 'react';
import Button from '@mui/material/Button';
import { IButtonProps } from './CleanButton.types';


export const CleanButton: React.FC<IButtonProps> = (props) => {

  const {
    variant = 'contained',
    color = 'primary',
    size = 'medium',
    disabled = false,
    fullWidth = false,
    children = 'Click Me',
    startIcon,
    endIcon,
    onClick,
    className,
    sx,
  } = props;

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      className={className}
      sx={{
        boxShadow: 'none',
        ...sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CleanButton;
