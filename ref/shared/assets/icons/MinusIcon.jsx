import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {

  xs: [
    <React.Fragment key="minus-icon-xs">
      <path d="M2.75 7.75L12.75 7.75" stroke="#6E6F70" />
    </React.Fragment>,
  ],

};

export const MinusIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
