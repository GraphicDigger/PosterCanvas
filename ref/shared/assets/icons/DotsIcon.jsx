import React from 'react';
import { Icon } from '../../uiKit/Icon';

export const DotsIcon = ({ size = 'xs', color }) => {

  const render = () => {
    switch (size) {
    case 'xs':
      return (
        <React.Fragment key="dots-icon-xs">
          <path d="M8 12C8.55229 12 9 12.4477 9 13C9 13.5523 8.55229 14 8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12Z" fill="currentColor" />
          <path d="M8 7C8.55228 7 9 7.44772 9 8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8C7 7.44772 7.44772 7 8 7Z" fill="currentColor" />
          <path d="M8 2C8.55229 2 9 2.44772 9 3C9 3.55228 8.55229 4 8 4C7.44772 4 7 3.55228 7 3C7 2.44772 7.44772 2 8 2Z" fill="currentColor" />
        </React.Fragment>
      );
    default:
      return (
        <React.Fragment key="dots-icon-xs">
          <path d="M8 12C8.55229 12 9 12.4477 9 13C9 13.5523 8.55229 14 8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12Z" fill="currentColor" />
          <path d="M8 7C8.55228 7 9 7.44772 9 8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8C7 7.44772 7.44772 7 8 7Z" fill="currentColor" />
          <path d="M8 2C8.55229 2 9 2.44772 9 3C9 3.55228 8.55229 4 8 4C7.44772 4 7 3.55228 7 3C7 2.44772 7.44772 2 8 2Z" fill="currentColor" />
        </React.Fragment>
      );
    }
  };

  return <Icon size={size} color={color}>{render()}</Icon>;
};
