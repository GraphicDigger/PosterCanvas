import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="arrow-with-leg-up-icon-xs">
      <path d="M12 7.00005L7.99996 3.00001L3.99998 7.00002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M7.99994 12L7.99994 4.00005" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </React.Fragment>,
  ],
};

export const ArrowWithLegUpIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
