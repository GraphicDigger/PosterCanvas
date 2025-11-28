import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="preview-icon-xs">
      <path d="M3.75 13.6958V2.30425C3.75 2.10789 3.96599 1.98818 4.1325 2.09225L13.2457 7.788C13.4024 7.88592 13.4024 8.11408 13.2457 8.212L4.1325 13.9078C3.96599 14.0118 3.75 13.8921 3.75 13.6958Z" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const PreviewIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

