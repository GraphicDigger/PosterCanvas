import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="separate-border-radius-icon-xs">
      <path d="M13.25 9V10.25C13.25 11.9069 11.9068 13.25 10.25 13.25H9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.25 7V5.75C13.25 4.09315 11.9068 2.75 10.25 2.75H9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.75001 9V10.25C2.75001 11.9069 4.09315 13.25 5.75001 13.25H7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.75001 7V5.75C2.75001 4.09315 4.09315 2.75 5.75001 2.75H7" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const SeparateBorderRadiusIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
