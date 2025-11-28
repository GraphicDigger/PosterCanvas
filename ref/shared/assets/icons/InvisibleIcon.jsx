import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="invisible-icon-xs">
      <path d="M2 6.99999C4.82635 11.5 11.1736 11.5 14 7" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const InvisibleIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
