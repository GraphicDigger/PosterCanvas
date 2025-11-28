import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="font-icon-xs">
      <path d="M13 2.5C10.5 2.5 9.125 3 8.5 5.5C8.19893 6.70427 7.31597 9.73611 7 11C6.625 12.5 5 13 3 13" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 6.75H12.5" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const FontIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
