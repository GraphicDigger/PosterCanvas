import React from 'react';
import PropTypes from 'prop-types';
import { SpaceListItem } from './listItem';


export const ESpace = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <SpaceListItem {...props} />;
  default:
    return null;
  }
};
