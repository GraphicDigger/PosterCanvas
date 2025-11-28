import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="cross-icon-xs">
      <path d="M12.5002 3.5002L3.5 12.5" stroke="currentColor" strokeWidth="1.75"/>
      <path d="M3.50008 3.49995L12.5 12.5" stroke="currentColor" strokeWidth="1.75"/>
    </React.Fragment>,
  ],
};

export const CrossIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
