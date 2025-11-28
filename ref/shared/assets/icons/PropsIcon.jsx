import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="fill-token-icon-xs">
      <circle cx="8" cy="3" r="2" fill="currentColor" />
      <path d="M4.5 10.5L7.99998 14L11.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 7.5L8 12.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const PropsIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
