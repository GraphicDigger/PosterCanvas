import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="component-instance-icon-xs">
      <path d="M8 13.9247L3.76807 8.00001L8 2.07529L12.2319 8.00001L8 13.9247Z" stroke="currentColor" strokeWidth="1.25" />
    </React.Fragment>,
  ],
};

export const ComponentInstanceIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
