import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="text-align-left-icon-xs">
      <path d="M1 3.75L13 3.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 7.75H7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 11.75H10" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const TextAlignLeftIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
