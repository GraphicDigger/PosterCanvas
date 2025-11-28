import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="visible-icon-xs">
      <circle cx="8" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 7.99996C5 4.00001 11 4 14 7.99996" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const VisibleIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
