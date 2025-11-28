import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="action-icon-xs">
      <path d="M3 8H8.44444L10 1L3 8Z" fill="currentColor" />
      <path d="M13 8L7.55555 8L6 15L13 8Z" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const ActionIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
