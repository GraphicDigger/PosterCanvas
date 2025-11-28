import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="screen-size-desktop-icon-xs">
      <rect x="2.75" y="2.75" width="10.5" height="7.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M0 13.1H16" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const ScreenSizeDesktopIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

