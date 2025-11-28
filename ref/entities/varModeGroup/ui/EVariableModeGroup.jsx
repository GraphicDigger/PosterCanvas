import React from 'react';
import PropTypes from 'prop-types';
import { VariableModeGroupListItem } from './listItem';

export const EVariableModeGroup = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <VariableModeGroupListItem {...props} />;
  default:
    return null;
  }
};
