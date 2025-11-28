import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xxs: [
    <React.Fragment key="arrow-down-filled-icon-xxs">
      <path d="M4.5 4.25C4.32671 4.25 4.16578 4.33973 4.07467 4.48713C3.98357 4.63454 3.97529 4.81861 4.05279 4.97361L5.55279 7.97361C5.63748 8.143 5.81061 8.25 6 8.25C6.18939 8.25 6.36252 8.143 6.44721 7.97361L7.94721 4.97361C8.02471 4.81861 8.01643 4.63454 7.92533 4.48713C7.83422 4.33973 7.67329 4.25 7.5 4.25H4.5Z" fill="currentColor" stroke="currentColor" stroke-linejoin="round" />
    </React.Fragment>,
  ],
};

export const ArrowDownFilledIcon = ({ size = 'xxs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
