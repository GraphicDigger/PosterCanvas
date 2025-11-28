import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="full-screen-icon-xs">
      <rect x="2" y="2" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.25" />
      <path d="M10.25 6.25L6.25 6.25L6.25002 10.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12.5 12.5L6.55559 6.55559" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const FullScreenIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
