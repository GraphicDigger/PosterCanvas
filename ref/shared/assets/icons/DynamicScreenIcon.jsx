import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="dynamic-screen-icon-xs">
      <path d="M0 4.5C0 3.67157 0.671573 3 1.5 3V13C0.671573 13 0 12.3284 0 11.5V4.5Z" fill="currentColor" />
      <path d="M16 4.5C16 3.67157 15.3284 3 14.5 3V13C15.3284 13 16 12.3284 16 11.5V4.5Z" fill="currentColor" />
      <rect x="3.75" y="13.25" width="10.5" height="8.5" rx="1" transform="rotate(-90 3.75 13.25)" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
  xxs: [
    <React.Fragment key="dynamic-screen-icon-xxs">
      <path d="M0.5 4C0.5 3.17157 1.17157 2.5 2 2.5V9.5C1.17157 9.5 0.5 8.82843 0.5 8V4Z" fill="currentColor" />
      <path d="M11.5 4C11.5 3.17157 10.8284 2.5 10 2.5V9.5C10.8284 9.5 11.5 8.82843 11.5 8V4Z" fill="currentColor" />
      <rect x="3.75" y="9.25" width="6.5" height="4.5" rx="1" transform="rotate(-90 3.75 9.25)" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const DynamicScreenIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
