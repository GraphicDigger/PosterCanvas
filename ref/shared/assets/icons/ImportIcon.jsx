import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="import-icon-xs">
      <path d="M4.00006 6L8.00002 10.0001L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 2L8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12.75H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const ImportIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
