import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="data-schema-icon-xs">
      <path d="M9 3C6.66667 3 6.59999 3 4.99999 3C2.00002 3 2 8 4.99996 8C7.49996 8 9.5 8 11 8C14 8 14 13 11 13C9 13 9.16666 13 7 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      <circle cx="4.5" cy="13" r="1.5" fill="currentColor" />
      <circle cx="11.5" cy="3" r="1.5" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const DataSchemaIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
