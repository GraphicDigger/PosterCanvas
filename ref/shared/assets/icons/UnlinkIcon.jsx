import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="unlink-icon-xs">
      <path d="M4 11C2.62268e-07 11 0 5 4 5L7 5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 5C16 5 16 11 12 11L9 11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 2C7.87581 7.46734 5 14 5 14" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const UnlinkIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
