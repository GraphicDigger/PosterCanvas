import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layers-icon-xs">
      <path d="M2 10L8 14L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13.7097 7L8.00001 11.0783L2.29035 7L8.00001 2.92168L13.7097 7Z" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const LayersIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
