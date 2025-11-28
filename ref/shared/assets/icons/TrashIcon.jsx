import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="trash-icon-xs">
      <path d="M4 3.5L11.5 1" stroke="#6E6F70" stroke-width="1.5" stroke-linecap="round" />
      <path d="M5.16113 5.75H11.8389C11.9917 5.75003 12.1086 5.88598 12.0859 6.03711L10.8857 14.0371C10.8674 14.1595 10.7624 14.25 10.6387 14.25H6.36133C6.2376 14.25 6.13264 14.1595 6.11426 14.0371L4.91406 6.03711C4.89139 5.88598 5.00832 5.75003 5.16113 5.75Z" stroke="#6E6F70" stroke-width="1.5" />
    </React.Fragment>,
  ],

};

export const TrashIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
