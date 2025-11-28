import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="duplicate-icon-xs">
      <rect x="2.25" y="1.5" width="7" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.25 12V13C6.25 13.8284 6.92157 14.5 7.75 14.5H11.75C12.5784 14.5 13.25 13.8284 13.25 13V7C13.25 6.17157 12.5784 5.5 11.75 5.5H11" stroke="currentColor" stroke-width="1.5" />
    </React.Fragment>,
  ],
};

export const DuplicateIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
