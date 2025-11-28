import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="image-placeholder-icon-xs">
      <rect x="1.25" y="1.25" width="13.5" height="13.5" rx="3.25" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="5" r="1" fill="currentColor" />
      <path d="M7.29289 7.70711L3.70711 11.2929C3.07714 11.9229 3.52331 13 4.41421 13H11.5858C12.4767 13 12.9229 11.9229 12.2929 11.2929L8.70711 7.70711C8.31658 7.31658 7.68342 7.31658 7.29289 7.70711Z" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const ImagePlaceholderIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
