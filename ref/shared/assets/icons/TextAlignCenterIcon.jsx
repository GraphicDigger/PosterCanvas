import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="text-align-center-icon-xs">
      <path d="M2 3.75H14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 7.75H11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 11.75H13" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const TextAlignCenterIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
