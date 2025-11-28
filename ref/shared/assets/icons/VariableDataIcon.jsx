import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="variable-data-icon-xs">
      <ellipse cx="8" cy="4.25" rx="5" ry="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 4.53564V7.53564C3 9.1925 5.23858 10.5356 8 10.5356C10.7614 10.5356 13 9.1925 13 7.53564V4.53564" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 7.75V11.0356C3 12.6925 5.23858 14.0356 8 14.0356C10.7614 14.0356 13 12.6925 13 11.0356V7.75" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const VariableDataIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
