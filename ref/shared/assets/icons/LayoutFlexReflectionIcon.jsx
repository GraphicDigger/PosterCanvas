import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layout-flex-reflection-icon-xs">
      <path d="M5 9L8 6L5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 6L2 6" stroke="currentColor" strokeLinecap="round" />
      <path d="M11 13L8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 10L14 10" stroke="currentColor" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const LayoutFlexReflectionIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
