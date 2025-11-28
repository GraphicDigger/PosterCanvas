import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {

  xs: [
    <React.Fragment key="plus-icon-xs">
      <path d="M10 10L12 8L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2.5 3V13" stroke="currentColor" strokeLinecap="round" />
      <path d="M13.5 3V13" stroke="currentColor" strokeLinecap="round" />
      <path d="M6 10L4 8L6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],

};

export const SizeFillWidthIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
