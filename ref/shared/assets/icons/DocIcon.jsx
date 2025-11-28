import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  s: [
    <React.Fragment key="doc-icon-s">
      <path d="M16 0C17.1046 0 18 0.895431 18 2V18C18 19.1046 17.1046 20 16 20H4C2.89543 20 2 19.1046 2 18V2C2 0.895431 2.89543 4.832e-08 4 0H16ZM5 9V10.5H11V9H5ZM5 6V7.5H15V6H5Z" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const DocIcon = ({ size = 's', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.s}</Icon>;
};
