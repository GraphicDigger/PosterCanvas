import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="storyboard-icon-xs">
      <path d="M0 4.5C0 3.67157 0.671573 3 1.5 3V13C0.671573 13 0 12.3284 0 11.5V4.5Z" fill="currentColor" />
      <path d="M16 4.5C16 3.67157 15.3284 3 14.5 3V13C15.3284 13 16 12.3284 16 11.5V4.5Z" fill="currentColor" />
      <rect x="3.75" y="13.25" width="10.5" height="8.5" rx="1" transform="rotate(-90 3.75 13.25)" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const StoryboardIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
