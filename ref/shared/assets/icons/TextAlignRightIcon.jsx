import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="text-align-right-icon-xs">
      <path d="M2 3.75H14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7.75H14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 11.75H14" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const TextAlignRightIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
