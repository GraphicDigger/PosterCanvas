import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="layout-flex-h-icon-xs">
      <path d="M8 12L12 8L8 4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 8L11 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const LayoutFlexHIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
