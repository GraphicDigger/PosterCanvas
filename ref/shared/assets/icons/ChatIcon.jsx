import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  s: [
    <React.Fragment key="chat-icon-s">
      <path d="M2.70703 18.293C2.07709 18.9228 1.00012 18.4767 1 17.5859V4C1 2.34315 2.34315 1 4 1H16C17.6569 1 19 2.34315 19 4V11C19 12.6569 17.6569 14 16 14H7L2.70703 18.293Z" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const ChatIcon = ({ size = 's', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.s}</Icon>;
};
