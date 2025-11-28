import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="fill-color-icon-xs">
      <path d="M11.75 9C11.75 11.4557 10.2464 13.25 8 13.25C5.75356 13.25 4.25 11.4557 4.25 9C4.25 7.8606 4.88525 6.52125 5.79254 5.28267C6.51917 4.29072 7.35594 3.45045 8 2.9323C8.64406 3.45045 9.48083 4.29072 10.2075 5.28267C11.1147 6.52125 11.75 7.8606 11.75 9Z" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const FillColorIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
