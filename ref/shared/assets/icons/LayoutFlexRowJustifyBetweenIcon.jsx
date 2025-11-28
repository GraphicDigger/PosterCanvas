import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="layout-flex-row-justify-between-icon-xs">
      <path d="M2.25 2L2.25 14" stroke="currentColor" />
      <path d="M13.75 2L13.75 14" stroke="currentColor" />
      <path d="M3.5 10L3.5 6" stroke="currentColor" strokeWidth="3" />
      <path d="M12.5 10V6" stroke="currentColor" strokeWidth="3" />
    </React.Fragment>,
  ],
};

export const LayoutFlexRowJustifyBetweenIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
