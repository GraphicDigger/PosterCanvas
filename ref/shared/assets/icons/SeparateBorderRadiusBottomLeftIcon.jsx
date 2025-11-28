import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="separate-border-radius-bottom-left-icon-xs">
      <path d="M4 4V8C4 10.2091 5.79086 12 8 12H12" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const SeparateBorderRadiusBottomLeftIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
