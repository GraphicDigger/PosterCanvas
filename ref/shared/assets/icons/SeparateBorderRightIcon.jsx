import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="separate-border-right-icon-xs">
      <path d="M10.25 2V14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 10.5L7 8L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const SeparateBorderRightIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
