import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="separate-border-left-icon-xs">
      <path d="M5.75 2V14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11.5 10.5L9 8L11.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const SeparateBorderLeftIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
