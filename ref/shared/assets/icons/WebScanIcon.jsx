import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="web-scan-icon-xs">
      <path d="M6 0.75H2.75C1.64543 0.75 0.75 1.64543 0.75 2.75V6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 0.75H13.25C14.3546 0.75 15.25 1.64543 15.25 2.75V6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 15.25H13.25C14.3546 15.25 15.25 14.3546 15.25 13.25V10.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 15.25H2.75C1.64543 15.25 0.75 14.3546 0.75 13.25V10.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8.25H13" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const WebScanIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
