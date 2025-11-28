import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="burger-icon-xs">
      <path d="M3 3.75H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 7.75H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 11.75H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const BurgerIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
