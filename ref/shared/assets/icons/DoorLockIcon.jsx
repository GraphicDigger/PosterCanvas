import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="door-lock-xs">
      <rect key='rect' x="4" y="8" width="8" height="5" rx="1.5" fill="currentColor" />
      <path key='path' d="M4.75 10.5833V6.25C4.75 1.91667 11.25 1.91667 11.25 6.25V10.0417" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const DoorLockIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
