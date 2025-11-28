import React from 'react';
import PropTypes from 'prop-types';
import { ApiCallListItem } from './listItem';

export const EApiCall = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <ApiCallListItem {...props} />;
  default:
    return null;
  }
};
