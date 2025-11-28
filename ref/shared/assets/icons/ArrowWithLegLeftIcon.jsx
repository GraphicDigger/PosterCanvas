import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="arrow-with-leg-left-icon-xs">
      <path d="M8 12L4 8L8 4.00001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 8L5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const ArrowWithLegLeftIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
