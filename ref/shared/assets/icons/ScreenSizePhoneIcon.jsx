import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="screen-size-phone-icon-xs">
      <rect x="5.75" y="2.75" width="5.5" height="10.5" rx="1" stroke="#6E6F70" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const ScreenSizePhoneIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

