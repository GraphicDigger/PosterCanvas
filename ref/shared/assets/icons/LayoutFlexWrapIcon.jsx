import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="layout-flex-wrap-icon-xs">
      <path d="M7 12L3 7.99998L7 3.99999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3V8C8 8 4 8 4 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const LayoutFlexWrapIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
