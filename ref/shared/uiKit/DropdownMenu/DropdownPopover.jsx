/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '../Popover';
import { DropdownTrigger } from './DropdownTrigger';
import { Dropdown } from './Dropdown';


export const DropdownPopover = ({ triggerComponent, contentComponent, ...props }) => {
  return (
    <Popover
      {...props}
      triggerComponent={triggerComponent || DropdownTrigger}
      contentComponent={contentComponent || Dropdown}
    />
  );
};

DropdownPopover.propTypes = {
  ...Popover.propTypes,
  triggerComponent: PropTypes.elementType,
  contentComponent: PropTypes.elementType,
};
