import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="overflow-visible-icon-xs">
      <rect x="2.25" y="2.25" width="8.5" height="8.5" rx="1.2" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6.25" y="6.25" width="8.5" height="8.5" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.25 11.5V7.45C6.25 6.78726 6.78726 6.25 7.45 6.25H11.5" stroke="white" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const OverflowVisibleIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
