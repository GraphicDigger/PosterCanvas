import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="variable-string-icon-xs">
      <path d="M1 6.75L15 6.75" stroke="currentColor" strokeWidth="1.75" />
      <path d="M1 9.75H9" stroke="currentColor" strokeWidth="1.75" />
    </React.Fragment>,
  ],
};

export const VariableStringIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
