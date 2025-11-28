import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="variable-video-icon-xs">
      <rect x="1.75" y="1.75" width="12.5" height="12.5" rx="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.05791 5.09212L11.3 8.15002L6.05791 11.208L6.05791 5.09212Z" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const VariableVideoIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
