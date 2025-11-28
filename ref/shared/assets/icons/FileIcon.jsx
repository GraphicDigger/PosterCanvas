import React from 'react';
import { Icon } from '../../uiKit/Icon';

const svg = {
  xs: [
    <React.Fragment key="file-icon-xs">
      <path d="M7.17451 10.6929L10.5033 4.9272C11.1162 3.86576 10.7525 2.50851 9.69105 1.89568C8.62961 1.28286 7.27236 1.64654 6.65953 2.70798L3.33069 8.47369C0.499999 13 7.5 16.7868 10.0574 12.3573C11.3889 10.0511 13.2013 6.91194 13.941 5.63067" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const FileIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
