import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layout-flex-v-icon-xs">
      <path d="M3.99994 8L7.99998 12L12 8.00002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 3L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const LayoutFlexVIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
