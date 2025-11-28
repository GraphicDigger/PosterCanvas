import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layout-flex-column-justify-around-icon-xs">
      <path d="M10 10.5L6 10.5" stroke="currentColor" strokeWidth="3" />
      <path d="M10 5.5L6 5.5" stroke="currentColor" strokeWidth="3" />
      <path d="M2 13.75L14 13.75" stroke="currentColor" />
      <path d="M2 2.25L14 2.25" stroke="currentColor" />
    </React.Fragment>,
  ],
};

export const LayoutFlexColumnJustifyAroundIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
