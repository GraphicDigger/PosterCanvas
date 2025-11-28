import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layout-flex-row-align-items-stretch-icon-xs">
      <path d="M3 8H13" stroke="currentColor" strokeWidth="3" />
      <path d="M2.25 3L2.25 13" stroke="currentColor" />
      <path d="M13.75 3L13.75 13" stroke="currentColor" />
    </React.Fragment>,
  ],
};

export const LayoutFlexRowAlignItemsStretchIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
