import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xxs: [
    <React.Fragment key="arrow-down-icon-xxs">
      <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const ArrowDownIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
