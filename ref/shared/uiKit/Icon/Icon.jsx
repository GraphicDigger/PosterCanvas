/** @jsxImportSource @emotion/react */
import React from 'react';
import { iconColors } from '../../../shared/styles';
import { useTheme } from '@emotion/react';

const SIZE_MAP = {
  xxs: 12,
  xs: 16,
  s: 20,
  m: 24,
  l: 28,
  xl: 32,
};

export const Icon = ({ size = 'xs', children, color, fill = 'none' }) => {
  const theme = useTheme();

  const sizeValue = SIZE_MAP[size] || SIZE_MAP.xs;
  const viewBox = `0 0 ${sizeValue} ${sizeValue}`;
  const iconColor = color || theme.sys?.color?.onSurfaceVariant;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill={fill}
      width={sizeValue}
      height={sizeValue}
      style={{
        color:iconColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {children}
    </svg>
  );
};
