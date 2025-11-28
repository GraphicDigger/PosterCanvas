import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="separate-border-left-icon-xs">
      <path d="M2 5.75H14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 11.5L8 9L10.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const SeparateBorderTopIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
