import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="screen-size-tablet-vertical-icon-xs">
      <rect x="3.75" y="13.25" width="10.5" height="8.5" rx="1" transform="rotate(-90 3.75 13.25)" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const ScreenSizeTabletVerticalIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

