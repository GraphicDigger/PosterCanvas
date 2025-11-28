import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="separate-border-radius-top-right-icon-xs">
      <path d="M12 12V8C12 5.79086 10.2091 4 8 4H4" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const SeparateBorderRadiusTopRightIcon = ({ size = 'xs', color }) => {

  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
