import React from 'react';
import PropTypes from 'prop-types';
import { EventListItem } from './listItem';

export const EEvent = ({ uiView = 'listItem', ...props }) => {
  switch (uiView) {
  case 'listItem':
    return <EventListItem {...props} />;
  default:
    return null;
  }
};
