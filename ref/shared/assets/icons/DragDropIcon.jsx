import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xxs: [
    <React.Fragment key="drag-drop-icon-xxs">
      <path d="M3 1.75H9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 5.75H9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9.75H9" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const DragDropIcon = ({ size = 'xxs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
