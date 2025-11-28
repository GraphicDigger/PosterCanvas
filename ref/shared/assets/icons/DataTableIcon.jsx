import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="data-table-icon-xs">
      <rect x="1.75" y="1.75" width="12.5" height="12.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.75 2V14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8.25H14.5" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const DataTableIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
