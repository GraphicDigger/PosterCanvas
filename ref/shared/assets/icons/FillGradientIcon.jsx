import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="fill-gradient-icon-xs">
      <path d="M2 8.25H14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 4.25H14" stroke="currentColor" />
      <path d="M2 11.75H14" stroke="currentColor" strokeWidth="2.5" />
    </React.Fragment>,
  ],
};

export const FillGradientIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
