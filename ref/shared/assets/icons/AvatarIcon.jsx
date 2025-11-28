import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="avatar-icon-xs"    >
      <path d="M9.8 5.40391C9.8 6.27196 9.55425 7.02755 9.19301 7.54716C8.83001 8.06931 8.39705 8.3 8 8.3C7.60295 8.3 7.16999 8.06931 6.80699 7.54716C6.44575 7.02755 6.2 6.27196 6.2 5.40391C6.2 3.39029 7.25568 2.7 8 2.7C8.74432 2.7 9.8 3.39029 9.8 5.40391Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 12.9998C5.5 9.5 10.5 9.50006 13 12.9999" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </React.Fragment>,
  ],
  s: [
    <React.Fragment key="avatar-icon-s">
      <path d="M12.52 6.56552C12.52 7.78079 12.1759 8.83862 11.6702 9.56607C11.162 10.2971 10.5559 10.62 10 10.62C9.44413 10.62 8.83798 10.2971 8.32978 9.56607C7.82406 8.83862 7.48 7.78079 7.48 6.56552C7.48 3.74646 8.95795 2.78005 10 2.78005C11.0421 2.78005 12.52 3.74646 12.52 6.56552Z" stroke="currentColor" strokeWidth="1.96" />
      <path d="M3 17.1998C6.5 12.3001 13.5 12.3002 17 17.2" stroke="currentColor" strokeWidth="1.96" strokeLinecap="round" />
    </React.Fragment>,
  ],
};

export const AvatarIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

