import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="element-box-icon-xs">
      <rect x="2.75" y="13.25" width="10.5" height="10.5" transform="rotate(-90 2.75 13.25)" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const ElementBoxIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
