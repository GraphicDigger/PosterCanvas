import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="comment-icon-xs">
      <path d="M8.5 1.75C11.6756 1.75 14.25 4.32436 14.25 7.5C14.25 10.6756 11.6756 13.25 8.5 13.25H2.75V7.5C2.75 4.32436 5.32436 1.75 8.5 1.75Z" stroke="currentColor" strokeWidth="1.5" />
    </React.Fragment>,
  ],
};

export const CommentIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};
