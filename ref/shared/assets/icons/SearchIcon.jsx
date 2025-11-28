import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="search-icon-xs">
      <circle cx="10" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 10L2.00002 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const SearchIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
