import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="component-icon-xs">
      <path d="M3 8.00001L8 1L13 8.00001L8 15L3 8.00001Z" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const ComponentIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
