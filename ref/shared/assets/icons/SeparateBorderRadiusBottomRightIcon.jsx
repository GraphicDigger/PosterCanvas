import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="separate-border-radius-bottom-right-icon-xs">
      <path d="M12 4V8C12 10.2091 10.2091 12 8 12H4" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const SeparateBorderRadiusBottomRightIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
