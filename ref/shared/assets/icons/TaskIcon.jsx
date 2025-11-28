import React from 'react';
import { Icon } from '../../uiKit/Icon';


const svg = {
  s: [
    <React.Fragment key="task-icon-s">
      <path d="M10 1C12.2222 1 14.2552 1.80678 15.8252 3.1416L8.78418 11.8936L6.51758 9.73047C6.21795 9.44448 5.74303 9.45526 5.45703 9.75488C5.17125 10.0545 5.18288 10.5295 5.48242 10.8154L8.33887 13.543C8.49072 13.6879 8.69677 13.7618 8.90625 13.748C9.11574 13.7343 9.30981 13.6333 9.44141 13.4697L16.8896 4.21094C18.206 5.77594 19 7.79495 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1Z" fill="currentColor" />
    </React.Fragment>,
  ],
};

export const TaskIcon = ({ size = 's', color }) => {
  return <Icon size={size} color={color}>{svg[size] || svg.s}</Icon>;
};
