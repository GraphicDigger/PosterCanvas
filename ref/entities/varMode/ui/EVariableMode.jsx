import React from 'react';
import PropTypes from 'prop-types';
import { VariableModeListItem } from './listItem';
import { VariableModeList } from './list/VariableModeList';

export const EVariableMode = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <VariableModeListItem {...props} />;
  case 'list':
    return <VariableModeList {...props} />;
  default:
    return null;
  }
};
