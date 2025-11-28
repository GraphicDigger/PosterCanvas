import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layout-free-icon-xs">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeLinecap="round" strokeDasharray="3 3" />
      <circle cx="8" cy="8" r="3" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const LayoutFreeIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
