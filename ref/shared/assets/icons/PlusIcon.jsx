import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xxs: [
    <React.Fragment key="plus-icon-xxs">
      <path key="1" d="M5.75 1.75V9.75" stroke="currentColor" />,
      <path key="2" d="M1.75 5.75L9.75 5.75" stroke="currentColor" />
    </React.Fragment>,
  ],
  xs: [
    <React.Fragment key="plus-icon-xs">
      <path key="1" d="M7.75 2.75V12.75" stroke="currentColor" />,
      <path key="2" d="M2.75 7.75L12.75 7.75" stroke="currentColor" />
    </React.Fragment>,
  ],
  s: [
    <React.Fragment key="plus-icon-s">
      <path key="1" d="M7.75 1.5V14.5" stroke="currentColor" />,
      <path key="2" d="M1.5 7.75L14.5 7.75" stroke="currentColor" />
    </React.Fragment>,
  ],
};

export const PlusIcon = ({ size = 'xs', color = 'currentColor' }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
