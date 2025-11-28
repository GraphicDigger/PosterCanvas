import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="data-add-collection-icon-xs">
      <ellipse cx="7" cy="4.25" rx="5" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 10.5356C4.23858 10.5356 2 9.1925 2 7.53564V4.53564" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 14.0356C4.23858 14.0356 2 12.6925 2 11.0356V7.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.5 8V15" stroke="currentColor" stroke-width="1.5" />
      <path d="M8 11.5L15 11.5" stroke="currentColor" stroke-width="1.5" />
    </React.Fragment>,
  ],
};

export const DataAddCollectionIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
