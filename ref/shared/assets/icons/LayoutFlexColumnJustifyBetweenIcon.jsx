import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layout-flex-column-justify-between-icon-xs">
      <path d="M2 13.75L14 13.75" stroke="currentColor" />
      <path d="M2 2.25L14 2.25" stroke="currentColor" />
      <path d="M10 12.5L6 12.5" stroke="currentColor" strokeWidth="3" />
      <path d="M10 3.5L6 3.5" stroke="currentColor" strokeWidth="3" />
    </React.Fragment>,
  ],
};

export const LayoutFlexColumnJustifyBetweenIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

