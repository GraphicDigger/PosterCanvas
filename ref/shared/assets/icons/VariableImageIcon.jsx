import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="variable-image-icon-xs">
      <rect x="1.75" y="1.75" width="12.5" height="12.5" rx="3.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="6" r="1" fill="currentColor" />
      <path d="M7.29289 7.70711L4.70711 10.2929C4.07714 10.9229 4.52331 12 5.41421 12H10.5858C11.4767 12 11.9229 10.9229 11.2929 10.2929L8.70711 7.70711C8.31658 7.31658 7.68342 7.31658 7.29289 7.70711Z" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const VariableImageIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
