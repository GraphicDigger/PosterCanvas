import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="settings-icon-xs">
      <path d="M9 4.75L14 4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 4.75H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="6.25" cy="4.75" r="1.625" stroke="currentColor" strokeWidth="1.25" />
      <path d="M13 11.25L14 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 11.25L7 11.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9.75" cy="11.25" r="1.625" stroke="currentColor" strokeWidth="1.25" />
    </React.Fragment>,
  ],
};

export const SettingsIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
