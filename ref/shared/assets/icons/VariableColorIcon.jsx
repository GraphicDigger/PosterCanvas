import React from 'react';
import { Icon } from '../../uiKit/Icon';

const paths = {
  xxs: {
    d: 'M11.5 8.91667C11.5 11.1423 10.1413 12.75 8.125 12.75C6.10868 12.75 4.75 11.1423 4.75 8.91667C4.75 7.89233 5.32275 6.67797 6.15191 5.54605C6.80074 4.6603 7.54513 3.90816 8.125 3.43504C8.70487 3.90816 9.44926 4.6603 10.0981 5.54605C10.9272 6.67797 11.5 7.89233 11.5 8.91667Z',
    strokeWidth: '1.5',
  },
  xs: {
    d: 'M11.5 8.91667C11.5 11.1423 10.1413 12.75 8.125 12.75C6.10868 12.75 4.75 11.1423 4.75 8.91667C4.75 7.89233 5.32275 6.67797 6.15191 5.54605C6.80074 4.6603 7.54513 3.90816 8.125 3.43504C8.70487 3.90816 9.44926 4.6603 10.0981 5.54605C10.9272 6.67797 11.5 7.89233 11.5 8.91667Z',
    strokeWidth: '1.5',
  },
};

export const VariableColorIcon = ({ size = 'xs', color }) => {
  const pathConfig = paths[size] || paths.xs;

  return (
    <Icon size={size} color={color}>
      <path
        d={pathConfig.d}
        stroke="currentColor"
        strokeWidth={pathConfig.strokeWidth}
      />
    </Icon>
  );
};
