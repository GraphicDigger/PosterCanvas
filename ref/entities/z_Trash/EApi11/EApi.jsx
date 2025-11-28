import React from 'react';
import PropTypes from 'prop-types';
import { ApiListItem } from './listItem';

export const EApi = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <ApiListItem {...props} />;
  default:
    return null;
  }
};
