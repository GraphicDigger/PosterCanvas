import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {

  xs: [
    <React.Fragment key="plus-icon-xs">
      <path d="M3.5 10.5L6 8L3.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 8L1 8" stroke="currentColor" strokeLinecap="round" />
      <path d="M12.5 10.5L10 8L12.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 8L15 8" stroke="currentColor" strokeLinecap="round" />
    </React.Fragment>,
  ],

};

export const SizeFitWidthIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
