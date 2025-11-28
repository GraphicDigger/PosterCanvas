import React from 'react';
import PropTypes from 'prop-types';
import { UserspaceListItem } from './listItem';
import { UserspaceSwitcher } from './switcher';

export const EUserspace = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <UserspaceListItem {...props} />;
  case 'switcher':
    return <UserspaceSwitcher {...props} />;
  default:
    return null;
  }
};
