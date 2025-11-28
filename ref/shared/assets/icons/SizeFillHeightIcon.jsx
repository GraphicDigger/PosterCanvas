import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {

  xs: [
    <React.Fragment key="plus-icon-xs">
      <path d="M10 6L8 4L6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 13.5L13 13.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M3 2.5L13 2.5" stroke="currentColor" strokeLinecap="round" />
      <path d="M10 10L8 12L6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],

};

export const SizeFillHeightIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
