/** @jsxImportSource @emotion/react */
import React, { forwardRef } from 'react';
import { useTheme } from '@emotion/react';
import { Text } from '../Text';

export const ListItemText = forwardRef(({
  editable = false,
  children,
  onChange,
  onBlur,
  onKeyDown,
  autoFocus = false,
  ...props
}, ref) => {

  const theme = useTheme();

  return (
    <Text
      editable={editable}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
      ref={ref}
      lineHeight={theme.ref.font.lineHeight100}
      {...props}
    >
      {children}
    </Text>

  );
});

