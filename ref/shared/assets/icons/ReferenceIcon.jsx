import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="reference-icon-xs">
      <path d="M9 5L12 5C16 5 16 11 12 11L9 11" stroke="#6E6F70" strokeWidth="1.5" />
      <path d="M4 8H12" stroke="#6E6F70" strokeWidth="1.5" />
      <path d="M7 11L4 11C0 11 -2.62268e-07 5 4 5L7 5" stroke="#6E6F70" strokeWidth="1.5" />
    </React.Fragment>,
  ],
  s: [
    <React.Fragment key="reference-icon-s">
      <path d="M11 6L15 6C20.3333 6 20.3333 14 15 14L11 14" stroke="#6E6F70" strokeWidth="1.5" />
      <path d="M5 10H15" stroke="#6E6F70" strokeWidth="1.5" />
      <path d="M9 14L5 14C-0.333333 14 -0.333334 6 5 6L9 6" stroke="#6E6F70" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const ReferenceIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
