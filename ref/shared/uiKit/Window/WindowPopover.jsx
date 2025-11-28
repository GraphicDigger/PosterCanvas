/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../Popover';
import { WindowTrigger } from './WindowTrigger';
import { Window } from './Window';

export const WindowPopover = (props) => {
  return (
    <Popover {...props}
      triggerComponent={WindowTrigger}
      contentComponent={Window}
    />
  );
};
