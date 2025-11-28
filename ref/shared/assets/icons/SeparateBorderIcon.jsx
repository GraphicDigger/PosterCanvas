import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="plus-icon-xs">
      <path d="M5 2.75H11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 13.25H11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.75 11L2.75 5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.25 11L13.25 5" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const SeparateBorderIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
