import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="variable-bool-icon-xs">
      <rect x="0.75" y="4.75" width="14.5" height="6.5" rx="3.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="1" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const VariableBoolIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
