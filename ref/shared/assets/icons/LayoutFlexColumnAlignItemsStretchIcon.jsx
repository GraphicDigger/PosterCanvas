import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layout-flex-column-align-items-stretch-icon-xs">
      <path d="M8 13V3" stroke="currentColor" strokeWidth="3" />
      <path d="M3 13.75L13 13.75" stroke="currentColor" />
      <path d="M3 2.25L13 2.25" stroke="currentColor" />
    </React.Fragment>,
  ],
};

export const LayoutFlexColumnAlignItemsStretchIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

