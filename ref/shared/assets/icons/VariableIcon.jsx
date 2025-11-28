import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="fill-token-icon-xs">
      <circle cx="8" cy="8" r="2" fill="currentColor" />
      <rect x="1.75" y="1.75" width="12.5" height="12.5" rx="3.25" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const VariableIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
