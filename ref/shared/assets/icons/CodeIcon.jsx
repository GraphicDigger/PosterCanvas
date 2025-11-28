import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="code-icon-xs">
      <path d="M3 11L6 8L3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 11.25H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const CodeIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

