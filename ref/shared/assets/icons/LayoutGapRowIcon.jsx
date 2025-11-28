import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layout-gap-row-icon-xs">
      <path d="M10 8L6 8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 11.75L13 11.75" stroke="currentColor" />
      <path d="M3 4.25L13 4.25" stroke="currentColor" />
    </React.Fragment>,
  ],
};

export const LayoutGapRowIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
