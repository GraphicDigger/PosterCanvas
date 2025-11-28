import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {

  xxs: [
    <React.Fragment key="check-icon-xxs">
      <path d="M2.5 6.5L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
  xs: [
    <React.Fragment key="check-icon-xs">
      <path d="M3 9L6 11.5L12.5 5" stroke='currentColor' strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const CheckIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
