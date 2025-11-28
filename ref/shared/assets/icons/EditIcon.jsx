import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  xs: [
    <React.Fragment key="edit-icon-xs"  >
      <path fill-rule="evenodd" clipRule="evenodd" d="M15 1C15.5523 1.55228 15.5523 2.44771 15 3L9 9L6 10L7 7L13 1C13.5523 0.447715 14.4477 0.447715 15 1Z" fill="currentColor" />
      <path d="M8 1.75H6.52C4.86814 1.75 4.04221 1.75 3.40906 2.06637C2.82792 2.35675 2.35675 2.82792 2.06637 3.40906C1.75 4.04221 1.75 4.86814 1.75 6.52V8.98C1.75 10.6319 1.75 11.4578 2.06637 12.0909C2.35675 12.6721 2.82792 13.1433 3.40906 13.4336C4.04221 13.75 4.86814 13.75 6.52 13.75H8.98C10.6319 13.75 11.4578 13.75 12.0909 13.4336C12.6721 13.1433 13.1433 12.6721 13.4336 12.0909C13.75 11.4578 13.75 10.6319 13.75 8.98V8" stroke="currentColor" stroke-width="1.5" />
    </React.Fragment>,
  ],
};

export const EditIcon = ({ size = 'xs', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.xs}</Icon>;
};

