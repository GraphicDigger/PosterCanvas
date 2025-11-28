import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="library-icon-xs">
      <path d="M1 12.5004V3.50043C3.00006 2.00018 6 2.00018 7.99994 3.50043V12.5004C6.5 11.5 3.00006 11.5 1 12.5004Z" stroke="#6E6F70" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 12.5004V3.50043C10.0001 2.00018 13 2.00018 14.9999 3.50043V12.5004C13.5 11.5 10.0001 11.5 8 12.5004Z" stroke="#6E6F70" strokeWidth="1.5" strokeLinejoin="round" />
    </React.Fragment>,
  ],
};

export const LibraryIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
