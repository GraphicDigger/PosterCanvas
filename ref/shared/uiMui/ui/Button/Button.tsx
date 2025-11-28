import React from 'react';
import Button from '@mui/material/Button/Button';
import { buttonSchema, ButtonProps, buttonPropsMetadata } from './Button.types';

export const MuiButton: React.FC<ButtonProps> = (props) => {
  const validProps = buttonSchema.parse(props);

  return (
    <Button
      variant={validProps.variant}
      color={validProps.color}
      size={validProps.size}
      disabled={validProps.disabled}
      fullWidth={validProps.fullWidth}
      startIcon={validProps.startIcon}
      endIcon={validProps.endIcon}
      onClick={validProps.onClick}
      className={validProps.className}
      sx={{
        boxShadow: 'none',
        ...validProps.sx,
      }}
    >
      {validProps.children}
    </Button>
  );
};

export { buttonPropsMetadata };

export default MuiButton;
