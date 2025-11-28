import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="layout-gap-column-icon-xs">
      <path d="M8 10V6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.25 3L4.25 13" stroke="currentColor" />
      <path d="M11.75 3L11.75 13" stroke="currentColor" />
    </React.Fragment>,
  ],
};

export const LayoutGapColumnIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
