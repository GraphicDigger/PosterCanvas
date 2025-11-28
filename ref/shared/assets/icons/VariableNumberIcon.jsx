import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="variable-number-icon-xs">
      <path d="M6.79996 2.40002L4.39996 13.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.8 2.40002L8.40002 13.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.79999 5.80005H14" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 9.79993H13.2" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const VariableNumberIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
