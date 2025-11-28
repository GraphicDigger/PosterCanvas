import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="screens-preview-icon-xs">
      <circle cx="4.875" cy="4.875" r="1.875" fill="currentColor" />
      <circle cx="11.125" cy="4.875" r="1.875" fill="currentColor" />
      <circle cx="11.25" cy="11.25" r="1.875" fill="currentColor" />
      <circle cx="4.875" cy="11.125" r="1.875" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const ScreensPreviewIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

