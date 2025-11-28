import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="fill-radial-gradient-icon-xs">
      <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeLinecap="round" strokeDasharray="3 3" />
      <path d="M5 8.25H11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 4.25H11" stroke="currentColor" />
      <path d="M5 11.75H11" stroke="currentColor" strokeWidth="2.5" />
    </React.Fragment>,
  ],
};

export const FillRadialGradientIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
