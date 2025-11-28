import React from 'react';
import PropTypes from 'prop-types';
import { TokenValueListItem } from './listItem';

export const ETokenValue = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <TokenValueListItem {...props} />;
  default:
    return null;
  }
};
