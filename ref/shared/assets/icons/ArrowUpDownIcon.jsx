import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="arrow-up-down-icon-xs">
      <path d="M5 6L8 3L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 10L8 13L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const ArrowUpDownIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
