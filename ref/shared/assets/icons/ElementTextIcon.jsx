import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="element-text-icon-xs">
      <path d="M2 3.75H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 4.5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const ElementTextIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
