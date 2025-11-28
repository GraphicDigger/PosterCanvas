import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="text-preset-icon-xs">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.93935 3.18195C6.52513 2.59617 7.47488 2.59617 8.06066 3.18195L11.818 6.93931C12.1109 7.23221 12.2574 7.61611 12.2574 8H1.74261C1.74261 7.6161 1.88906 7.23221 2.18196 6.9393L5.93935 3.18195ZM4.87869 2.12128C6.05027 0.949722 7.94975 0.949725 9.12132 2.12129L12.8787 5.87865C14.0503 7.05022 14.0503 8.94972 12.8787 10.1213L9.12131 13.8787C7.94973 15.0503 6.05023 15.0503 4.87866 13.8787L1.12129 10.1213C-0.0502816 8.94971 -0.0502762 7.05021 1.1213 5.87864L4.87869 2.12128Z" fill="#6E6F70" />
      <circle cx="13.5" cy="13.5" r="1.5" fill="#6E6F70" />
    </React.Fragment>,
  ],
};

export const VarPresetIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
