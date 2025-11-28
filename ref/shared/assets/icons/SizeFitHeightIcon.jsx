import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {

  xs: [
    <React.Fragment key="plus-icon-xs">
      <path d="M5.5 3.5L8 6L10.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 6L8 1" stroke="currentColor" strokeLinecap="round" />
      <path d="M5.5 12.5L8 10L10.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 10L8 15" stroke="currentColor" strokeLinecap="round" />
    </React.Fragment>,
  ],

};

export const SizeFitHeightIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
