import React from 'react';
import PropTypes from 'prop-types';
import { ApiCategoryListItem } from './listItem';

export const EApiCategory = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <ApiCategoryListItem {...props} />;
  default:
    return null;
  }
};
