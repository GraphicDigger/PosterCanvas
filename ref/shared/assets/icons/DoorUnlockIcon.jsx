import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="door-unlock-icon-xs">
      <rect x="4" y="8" width="8" height="5" rx="1.5" fill="currentColor" />
      <path d="M11 6C11 2 4.75 2 4.75 6V10" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const DoorUnlockIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
